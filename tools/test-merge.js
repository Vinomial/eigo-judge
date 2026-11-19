// 端末間の同期(js/merge.js)のテスト.使い方: node tools/test-merge.js
"use strict";
const assert = require("assert");
const { merge, shareable } = require("../js/merge.js");

const DAY = 86400000, T0 = Date.UTC(2026, 10, 1, 3); // 2026-11-01 12:00 JST
const S = o => Object.assign({ ver: 2, res: {}, srs: {}, contests: [], readTimes: {}, days: {}, badges: {}, prefs: {}, scores: [], att: [], dayAc: {}, live: null, legacy: null, updatedAt: 0, wipe: {}, del: {}, goal: null }, o);
// 解答を記録した状態を作る(js/core.js の record と同じ数え方)
function play(s, list) {
  s = JSON.parse(JSON.stringify(s));
  for (const [id, t, ok] of list) {
    const r = s.res[id] || (s.res[id] = { ac: 0, wa: 0 });
    ok ? r.ac++ : r.wa++; r.last = ok ? "AC" : "WA"; r.t = t;
    const { dateKey } = require("../js/merge.js"); const k = dateKey(t);
    s.days[k] = (s.days[k] || 0) + 1; if (ok) s.dayAc[k] = (s.dayAc[k] || 0) + 1;
    s.att.push([id, t, ok ? 1 : 0]);
    s.updatedAt = Math.max(s.updatedAt, t);
  }
  return s;
}
const same = (x, y, msg) => assert.deepStrictEqual(JSON.parse(JSON.stringify(x)), JSON.parse(JSON.stringify(y)), msg);
// 手元だけの項目(prefs, live)を除いた比較用
const core = s => { const o = shareable(s); delete o.updatedAt; return o; };
let n = 0;
const test = (name, f) => { f(); n++; console.log("ok  " + name); };

test("別々の端末で解いた記録が両方残る", () => {
  const phone = play(S(), [["w1", T0, 1], ["g1", T0 + 1000, 0]]);
  const pc = play(S(), [["w2", T0 + 5000, 1], ["g1", T0 + 9000, 1]]);
  const m = merge(phone, pc);
  assert.strictEqual(m.att.length, 4);
  assert.deepStrictEqual(Object.keys(m.res).sort(), ["g1", "w1", "w2"]);
  assert.strictEqual(m.res.g1.last, "AC", "g1 は PC の方が新しい");
  assert.strictEqual(m.res.g1.ac, 1); assert.strictEqual(m.res.g1.wa, 1);
  assert.strictEqual(m.days["2026-11-01"], 2, "日ごとの数は大きい方(両方2)");
});

test("冪等:何度合わせても同じ", () => {
  const a = play(S(), [["w1", T0, 1], ["w1", T0 + DAY, 0]]);
  const b = play(S(), [["w1", T0, 1], ["w3", T0 + 2 * DAY, 1]]);
  const m1 = merge(a, b), m2 = merge(m1, b), m3 = merge(m1, m1), m4 = merge(merge(m1, a), b);
  same(m2, m1); same(m3, m1); same(m4, m1);
});

test("向きを入れ替えても,共有する項目は同じ", () => {
  const a = play(S({ prefs: { wdir: "ej" } }), [["w1", T0, 1], ["g2", T0 + 3, 0]]);
  const b = play(S({ prefs: { wdir: "je" } }), [["g2", T0 + 7, 1], ["r1q1", T0 + 9, 1]]);
  same(core(merge(a, b)), core(merge(b, a)));
  assert.strictEqual(merge(a, b).prefs.wdir, "ej", "設定は手元を優先");
});

test("同じ解答(同じ時刻)は重複しない", () => {
  const a = play(S(), [["w1", T0, 1]]);
  const m = merge(a, JSON.parse(JSON.stringify(a)));
  assert.strictEqual(m.att.length, 1); assert.strictEqual(m.res.w1.ac, 1); assert.strictEqual(m.days["2026-11-01"], 1);
});

test("本番は時刻で和集合", () => {
  const c1 = { t: T0, kind: "all", items: [], perf: { all: 800 } }, c2 = { t: T0 + DAY, kind: "word", items: [], perf: { word: 700 } };
  const m = merge(S({ contests: [c1] }), S({ contests: [c1, c2] }));
  assert.deepStrictEqual(m.contests.map(c => c.t), [T0, T0 + DAY]);
});

test("単語の復習は最後に解いた時刻の新しい方", () => {
  const a = S({ srs: { w1: { box: 3, due: T0 + 8 * DAY, t: T0 } } });
  const b = S({ srs: { w1: { box: 0, due: T0 + DAY + 600000, t: T0 + DAY } } });
  assert.strictEqual(merge(a, b).srs.w1.box, 0); assert.strictEqual(merge(b, a).srs.w1.box, 0);
});

test("「問題の結果」の削除は,削除を知らない端末から復活しない", () => {
  const before = play(S(), [["w1", T0, 1], ["w2", T0 + 10, 1]]);
  // 端末 A で削除(その後 w3 を解く).端末 B は削除を知らずに w4 を解く
  const A = play(S({ wipe: { results: T0 + DAY } }), [["w3", T0 + 2 * DAY, 1]]);
  const B = play(before, [["w4", T0 + 3 * DAY, 0]]);
  B.srs = { w1: { box: 2, due: 0, t: T0 }, w4: { box: 0, due: 0, t: T0 + 3 * DAY } };
  for (const m of [merge(A, B), merge(B, A)]) {
    assert.deepStrictEqual(Object.keys(m.res).sort(), ["w3", "w4"], "削除前の w1, w2 は消えたまま");
    assert.deepStrictEqual(m.att.map(x => x[0]).sort(), ["w3", "w4"]);
    assert.deepStrictEqual(Object.keys(m.srs), ["w4"]);
    assert.strictEqual(m.days["2026-11-01"], undefined, "削除前の日の数も消える");
    assert.strictEqual(m.wipe.results, T0 + DAY);
  }
});

test("「本番の記録」の削除は,削除を知らない端末から復活しない", () => {
  const old = { t: T0, kind: "all", items: [], perf: { all: 800 } }, neu = { t: T0 + 2 * DAY, kind: "all", items: [], perf: { all: 900 } };
  const A = S({ wipe: { contests: T0 + DAY }, contests: [] });
  const B = S({ contests: [old, neu], legacy: { history: [1] } });
  const m = merge(A, B);
  assert.deepStrictEqual(m.contests.map(c => c.t), [T0 + 2 * DAY]);
  assert.strictEqual(m.legacy, null);
});

test("「すべてのデータ」の削除:実績・点数・日ごとの数も消える.削除後の解答は残る", () => {
  const B = play(S({ badges: { c1: T0 }, scores: [{ t: T0, score: 500 }], goal: { v: 600, t: T0 } }), [["w1", T0, 1], ["w2", T0 + 3 * DAY, 1]]);
  const A = S({ wipe: { all: T0 + DAY } });
  const m = merge(A, B);
  assert.deepStrictEqual(Object.keys(m.res), ["w2"]);
  assert.deepStrictEqual(m.badges, {}); assert.deepStrictEqual(m.scores, []); assert.strictEqual(m.goal, null);
  assert.deepStrictEqual(Object.keys(m.days), ["2026-11-04"], "削除後に解いた日だけ残る");
});

test("消した点数は復活しない", () => {
  const sc = { t: T0, score: 500 };
  const A = S({ scores: [], del: { scores: [T0] } }), B = S({ scores: [sc, { t: T0 + DAY, score: 520 }] });
  const m = merge(A, B);
  assert.deepStrictEqual(m.scores.map(x => x.score), [520]);
  assert.deepStrictEqual(merge(m, B).scores.map(x => x.score), [520], "もう一度合わせても復活しない");
});

test("実績は和集合で,解除した時刻は早い方", () => {
  const m = merge(S({ badges: { c1: T0 + 5, s3: T0 } }), S({ badges: { c1: T0 } }));
  assert.deepStrictEqual(m.badges, { c1: T0, s3: T0 });
});

test("目標の点数は設定の新しい方", () => {
  const m = merge(S({ goal: { v: 600, t: T0 } }), S({ goal: { v: 700, t: T0 + 1 } }));
  assert.strictEqual(m.goal.v, 700);
});

test("解答中の本番と設定は手元のもの.共有用データには入らない", () => {
  const live = { items: [] };
  const m = merge(S({ live, prefs: { seenLog: 2 } }), S({ live: { items: [1] }, prefs: { seenLog: 4, wdir: "ej" } }));
  assert.strictEqual(m.live, live);
  assert.strictEqual(m.prefs.seenLog, 4); assert.strictEqual(m.prefs.wdir, "ej");
  const sh = shareable(m); assert.ok(!("live" in sh) && !("prefs" in sh));
});

test("知らない項目(新しい版で増えた項目)は消さない", () => {
  const m = merge(S(), S({ future: { x: 1 } }));
  assert.deepStrictEqual(m.future, { x: 1 });
});

test("古い形式(wipe, del, goal, srs.t がない)でも動く", () => {
  const old = { ver: 2, res: { w1: { ac: 2, wa: 0, last: "AC", t: T0 } }, srs: { w1: { box: 2, due: T0 } }, contests: [], att: [], days: { "2026-11-01": 2 }, badges: {}, prefs: {} };
  const m = merge(old, play(S(), [["w2", T0 + DAY, 1]]));
  assert.strictEqual(m.res.w1.ac, 2, "att にない古い回数も残る");
  assert.ok(m.srs.w1 && m.res.w2);
});

test("ランダムな記録で,和集合・冪等・対称を確かめる", () => {
  let seed = 1; const rnd = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
  for (let k = 0; k < 200; k++) {
    const ids = ["w1", "w2", "g1", "g2", "r1q1"], gen = () => Array.from({ length: Math.floor(rnd() * 8) }, () => [ids[Math.floor(rnd() * ids.length)], T0 + Math.floor(rnd() * 5) * DAY + Math.floor(rnd() * 3), rnd() < 0.6 ? 1 : 0]);
    const base = gen(), a = play(S(), [...base, ...gen()]), b = play(S(), [...base, ...gen()]);
    if (rnd() < 0.3) a.wipe = { results: T0 + Math.floor(rnd() * 5) * DAY };
    const m = merge(a, b);
    same(merge(m, b), m); same(merge(m, a), m); same(core(merge(b, a)), core(m));
    const cut = (m.wipe.results || 0);
    const want = new Set([...a.att, ...b.att].filter(x => x[1] >= cut).map(x => x[0] + "|" + x[1]));
    assert.strictEqual(m.att.length, want.size, "削除後の解答はすべて残り,重複しない");
  }
});

console.log(`\n${n} 件のテストに合格しました`);
