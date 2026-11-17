"use strict";
/* 英語ジャッジ 本体
 * 問題データは data/*.js が window に置く(WORDS, AFFIX, ROOT, THM, GRAM, READING).
 * レート計算は js/rating.js(window.Rating).
 * 進捗はこの端末の localStorage に保存する.
 */

const DOMAINS = { word: "単語", grammar: "文法", reading: "長文" };
const SERIES = { all: "総合", word: "単語", grammar: "文法", reading: "長文" };
// 本番の種類.all は総合(全分野).分野別の本番はその分野のレートだけが動く
const CONTESTS = {
  all: { name: "総合", word: 4, grammar: 4, reading: 1, sec: 720, desc: "単語4問・文法4問・長文1題(3〜4問).12分" },
  word: { name: "単語", word: 12, sec: 300, desc: "単語12問.5分" },
  grammar: { name: "文法", grammar: 10, sec: 480, desc: "文法10問.8分" },
  reading: { name: "長文", reading: 2, sec: 900, desc: "長文2題(6〜8問).15分" }
};
const DAY = 86400000;
const GOAL = 20;        // 1日の目安の問題数
const TOEIC_GOAL_DEFAULT = 550; // 目標の TOEIC スコア(「記録」画面で変えられる.S.goal)
const toeicGoal = () => (S.goal && S.goal.v) || TOEIC_GOAL_DEFAULT;
const IDK = -1;         // 「わからない」を選んだときの sel(WA として扱う)
const { tierOf, TIERS } = Rating;

/* ---------------- 状態と保存 ---------------- */
// v2: res[id] = { ac, wa, last: "AC" | "WA", t }(表示する状態は最後の結果)
//     contests = [{ t, items: [{ id, dom, d, ok }], perf: { all, word, grammar, reading } }]
//     レートは contests から毎回計算する(保存しない)
const LS_KEY = "eigo-judge-v1";
function freshState() {
  // live: 解答中の本番(再読み込みやタブが閉じられても続きから再開・採点するため)
  // wipe: 削除した時刻 { contests, results, all }.del.scores: 消した点数の時刻.goal: 目標の点数 { v, t }(端末間の同期で使う.js/merge.js)
  return { ver: 2, res: {}, srs: {}, contests: [], readTimes: {}, days: {}, badges: {}, prefs: {}, scores: [], att: [], dayAc: {}, live: null, legacy: null, updatedAt: 0, wipe: {}, del: {}, goal: null };
}
function migrate(o) {
  const s = freshState();
  if (!o || typeof o !== "object") return s;
  for (const k of Object.keys(s)) if (o[k] != null && k !== "ver") s[k] = o[k];
  if (!o.ver) { // v1(Elo 方式)からの移行.問題ごとの成績は引き継ぎ,旧レートは記録として残す
    for (const [id, st] of Object.entries(o.stats || {})) {
      if (st && (st.ac || st.wa)) s.res[id] = { ac: st.ac || 0, wa: st.wa || 0, last: st.ac ? "AC" : "WA", t: o.updatedAt || 0 };
    }
    if (o.history && o.history.length) s.legacy = { ratings: o.ratings || {}, history: o.history };
  }
  // 解答の履歴(att)がない古いデータ:1回だけ解いた問題はその結果を最初の解答とみなし,AC した日も最後の結果から近似する
  if (!o.att) {
    for (const [id, r] of Object.entries(s.res)) {
      if (r.ac + r.wa === 1 && r.t) s.att.push([id, r.t, r.last === "AC" ? 1 : 0]);
      if (r.last === "AC" && r.t) { const k = dateKey(r.t); s.dayAc[k] = (s.dayAc[k] || 0) + 1; }
    }
    s.att.sort((a, b) => a[1] - b[1]);
  }
  return s;
}
let S = freshState();
try { const raw = localStorage.getItem(LS_KEY); if (raw) S = migrate(JSON.parse(raw)); } catch (e) { /* 保存領域が使えない環境では毎回初期状態 */ }
function save(fromSync) {
  S.updatedAt = Date.now();
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* noop */ }
  if (!fromSync && window.Sync) Sync.dirty();
}

/* ---------------- 共通 ---------------- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fmtSec(s) { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
function signed(d) { return d >= 0 ? `<span class="up">+${d}</span>` : `<span class="down">${d}</span>`; }
function dateKey(t) { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function fmtDate(t) { const d = new Date(t); return `${d.getMonth() + 1}/${d.getDate()}`; }
const rc = r => `--rc:var(${tierOf(r).color})`;
const rateSpan = r => (r == null ? `<span class="muted">-</span>` : `<b class="rate" style="${rc(r)}">${r}</b>`);
const avg = a => a.reduce((x, y) => x + y, 0) / a.length;

const WORD_BY = new Map(WORDS.map(w => [w.id, w]));
const WORD_BY_M = new Map(WORDS.map(w => [w.m, w])); // 意味 → 単語(意味は全単語で重ならない)
const GRAM_BY = new Map(GRAM.map(g => [g.id, g]));
const PASS_BY = new Map(READING.map(p => [p.id, p]));
const passageD = p => Math.round(avg(p.qs.map(q => q.d)));
const Q_PASSAGE = new Map(READING.flatMap(p => p.qs.map(q => [q.id, p])));

/* ---------------- 難易度の推定 ----------------
 * 問題の難易度 d は作った人の見積もり(d0).自分の解答から推定し直す(AtCoder Problems と同じ考え方).
 * 1. 各問題の「最初の解答」だけを使う(解説を見た後の解き直しは正解しやすく,難易度を低く見積もってしまうため).
 * 2. その時点の実力 θ:分野ごとに解答を時刻順に BLOCK 件ずつ区切り,その区切りの中の d0 と正誤からパフォーマンスと同じ式で求める.
 * 3. グループのずれ δ:同じ定理の文法問題・同じ長文の設問は,見積もりが同じ方向にずれやすい.
 *    グループ内の観測をまとめて,d0 + δ の δ を推定する(事前分布の標準偏差 GROUP_SD).
 * 4. 各問題の推定値:d0 + δ を中心とした事前分布(標準偏差 PRIOR_SD)と,観測 (θ, 正誤) の尤度をかけて,最も確からしい d を求める.
 *    1問の観測は1件だけなので,1問ごとの動きは小さい.グループのずれと,色帯ごとの正答率の比較の方があてになる. */
const ALLQ = [...WORDS.map(q => ["word", q]), ...GRAM.map(q => ["grammar", q]), ...READING.flatMap(p => p.qs.map(q => ["reading", q]))];
ALLQ.forEach(([, q]) => { q.d0 = q.d; });
const Q_BY = new Map(ALLQ.map(([dom, q]) => [q.id, { dom, q }]));
const BLOCK = 60, PRIOR_SD = 200, GROUP_SD = 250, MIN_ATT = 30;
const groupOf = (dom, q) => (dom === "grammar" ? q.t : dom === "reading" ? Q_PASSAGE.get(q.id).id : null);
// 尤度 Π p^ok (1-p)^(1-ok) と,中心 c・標準偏差 sd の事前分布をかけたものを最大にするずれ x を二分法で求める.
// obs: [{th, d, ok}](d に x を足したものが難易度).導関数 K Σ(p - ok) - (x - c) / sd² は x について単調減少.
function mapShift(obs, c, sd) {
  const K = Math.LN10 / 400;
  let lo = c - 1500, hi = c + 1500;
  for (let k = 0; k < 50; k++) {
    const mid = (lo + hi) / 2;
    const g = K * obs.reduce((a, o) => a + Rating.p(o.th, o.d + mid) - o.ok, 0) - (mid - c) / (sd * sd);
    if (g > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
let D_EST = null;
function estimateD() {
  if (D_EST) return D_EST;
  const first = new Map();
  for (const [id, t, ok] of S.att) if (Q_BY.has(id) && !first.has(id)) first.set(id, { id, t, ok, ...Q_BY.get(id) });
  const out = { items: new Map(), dom: {} };
  for (const dom of Object.keys(DOMAINS)) {
    const xs = [...first.values()].filter(x => x.dom === dom).sort((a, b) => a.t - b.t);
    out.dom[dom] = { n: xs.length, ok: xs.length >= MIN_ATT, bands: [] };
    if (xs.length < MIN_ATT) continue;
    for (let i = 0; i < xs.length; i += BLOCK) {
      let blk = xs.slice(i, i + BLOCK);
      if (blk.length < BLOCK / 2 && i) blk = xs.slice(Math.max(0, xs.length - BLOCK)); // 最後の短い区切りは前とまとめる
      const th = Rating.rawPerformance(blk.map(x => ({ d: x.q.d0, ok: x.ok })));
      xs.slice(i, i + BLOCK).forEach(x => { x.th = th; });
    }
    // グループのずれ
    const groups = new Map();
    xs.forEach(x => { const g = groupOf(dom, x.q); if (g) (groups.get(g) || groups.set(g, []).get(g)).push(x); });
    const shift = new Map();
    groups.forEach((g, k) => shift.set(k, mapShift(g.map(x => ({ th: x.th, d: x.q.d0, ok: x.ok })), 0, GROUP_SD)));
    out.dom[dom].groups = [...groups].map(([k, g]) => ({ k, n: g.length, shift: Math.round(shift.get(k) / 10) * 10 }));
    for (const x of xs) {
      const c = shift.get(groupOf(dom, x.q)) || 0;
      const sh = mapShift([{ th: x.th, d: x.q.d0, ok: x.ok }], c, PRIOR_SD);
      out.items.set(x.id, { dom, d0: x.q.d0, est: Math.round((x.q.d0 + sh) / 10) * 10, ok: x.ok, th: x.th });
    }
    // 色帯ごとの比較:予想正答率(その時点の実力と d0 から)と実際の正答率
    out.dom[dom].bands = TIERS.map((t, i) => {
      const hi = TIERS[i + 1] ? TIERS[i + 1].min : Infinity, b = xs.filter(x => x.q.d0 >= t.min && x.q.d0 < hi);
      return { t, n: b.length, exp: b.length ? avg(b.map(x => Rating.p(x.th, x.q.d0))) : 0, act: b.length ? avg(b.map(x => x.ok)) : 0 };
    }).filter(b => b.n);
  }
  return (D_EST = out);
}
// 「推定した難易度を使う」が有効なら,推定のある問題の d を推定値に置き換える(色・問題一覧・出題・パフォーマンスに反映)
function applyEstD() {
  const on = !!S.prefs.estD, E = on ? estimateD() : null;
  const gs = {};
  if (E) Object.keys(DOMAINS).forEach(dom => (E.dom[dom].groups || []).forEach(g => { gs[dom + g.k] = g.shift; }));
  ALLQ.forEach(([dom, q]) => {
    if (!E || !E.dom[dom].ok) { q.d = q.d0; return; }
    const e = E.items.get(q.id);
    q.d = e ? e.est : Math.round((q.d0 + (gs[dom + groupOf(dom, q)] || 0)) / 10) * 10; // 未挑戦の問題は,同じグループのずれだけを足す
  });
}

/* 問題ごとの状態(最後の結果) */
// att: 解答の履歴 [id, 時刻, 正解なら1].難易度の推定に使う
function record(id, ok, t = Date.now()) {
  const r = S.res[id] || (S.res[id] = { ac: 0, wa: 0 });
  ok ? r.ac++ : r.wa++;
  r.last = ok ? "AC" : "WA"; r.t = t;
  const k = dateKey(t); S.days[k] = (S.days[k] || 0) + 1;
  if (ok) S.dayAc[k] = (S.dayAc[k] || 0) + 1;
  S.att.push([id, t, ok ? 1 : 0]);
  D_EST = null;
}
const statusOf = id => (S.res[id] && S.res[id].last) || null;
function passageStatus(p) {
  const st = p.qs.map(q => statusOf(q.id));
  if (st.every(x => x === "AC")) return "AC";
  return st.some(Boolean) ? "WA" : null;
}
const unitStatus = (dom, id) => (dom === "reading" ? passageStatus(PASS_BY.get(id)) : statusOf(id));
const isLearned = w => !!(S.srs[w.id] && S.srs[w.id].box >= 2);

/* 単語の部品 [表記, "r"|"a", 元の形?] */
const partKey = p => p[2] || p[0];
const partDef = p => (p[1] === "r" ? ROOT : AFFIX)[partKey(p)];
// 語根のない単語(data/vocab.js)は p が空で,rootOf は null
const rootOf = w => { const r = w.p.find(p => p[1] === "r"); return r ? partKey(r) : null; };
// 品詞.vocab.js の単語は pos を持つ.語根から導く単語は意味の語尾から推測する(誤答の選択肢をそろえるためだけに使う)
const POS = { v: "動詞", n: "名詞", a: "形容詞", d: "副詞", p: "前置詞・接続詞", x: "熟語" };
const posCache = new Map();
function posOf(w) {
  if (w.pos) return w.pos;
  if (!posCache.has(w.id)) {
    const m = w.m.replace(/[(\uFF08][^)\uFF09]*[)\uFF09]/g, "").split("・")[0];
    posCache.set(w.id, /(な|の|い|た|できる|ある|べる)$/.test(m) ? "a" : /(する|[えけげせてねべめれ]る|[うくぐすつぬぶむ])$/.test(m) ? "v" : /に$/.test(m) ? "d" : "n");
  }
  return posCache.get(w.id);
}

/* 長文の本文 s の要素は,文(文字列)か次のブロック
 *   { t: "table", cap, head: [..], rows: [[..], ..] }  表
 *   { t: "bar", cap, unit, items: [[ラベル, 値], ..] }  棒グラフ
 *   { t: "doc", title }                                2つ目以降の文書の見出し
 * 設問の根拠 ev は s の添字.表の行・グラフの棒を指すときは [添字, 行] と書く. */
const evKey = e => (Array.isArray(e) ? e[0] : e);
function evMap(evs) {
  const m = new Map();
  (evs || []).forEach(e => { const i = evKey(e); if (!m.has(i)) m.set(i, new Set()); if (Array.isArray(e)) m.get(i).add(e[1]); });
  return m;
}
// rows: 強調する行の Set(空なら全体を強調).undefined なら強調しない
function blockHTML(b, rows) {
  const hl = rows !== undefined, all = hl && !rows.size;
  if (typeof b === "string") return `<p${hl ? ' class="ev"' : ""}>${esc(b)}</p>`;
  if (b.t === "doc") return `<div class="pdoc">${esc(b.title)}</div>`;
  const cap = b.cap ? `<div class="fcap">${esc(b.cap)}</div>` : "";
  if (b.t === "table") {
    return `<div class="fig${all ? " ev" : ""}">${cap}<div class="tscroll"><table>${b.head ? `<thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>` : ""}
      <tbody>${b.rows.map((r, k) => `<tr${hl && rows.has(k) ? ' class="ev"' : ""}>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
  }
  if (b.t === "bar") {
    const max = Math.max(...b.items.map(x => x[1]));
    return `<div class="fig${all ? " ev" : ""}">${cap}<div class="bars">${b.items.map(([l, v], k) => `<div class="bar${hl && rows.has(k) ? " ev" : ""}"><span class="bl">${esc(l)}</span><span class="bt"><span style="width:${(100 * v / max).toFixed(1)}%"></span></span><span class="bv">${esc(v)}${esc(b.unit || "")}</span></div>`).join("")}</div></div>`;
  }
  return "";
}
const blockText = b => (typeof b === "string" ? b : b.t === "doc" ? "" : [b.cap || "", ...(b.head || []), ...(b.rows || b.items || []).flat()].join(" "));

/* 長文に出てくる単語(単語データにあるもの)を拾う.語形変化は規則変化と IRREG(不規則変化)で対応する */
const FORM = new Map(), PHRASES = [];
WORDS.forEach(w => { const b = w.w.toLowerCase(); if (/^[a-z-]+$/.test(b)) FORM.set(b, w); else PHRASES.push(w); });
WORDS.forEach(w => {
  const b = w.w.toLowerCase();
  if (!/^[a-z-]+$/.test(b)) { (w.f || []).forEach(x => { if (!FORM.has(x)) FORM.set(x, w); }); return; }
  const fs = [b + "s", b + "es", b + "d", b + "ed", b + "ing", b + "ly", ...(w.f || []).flatMap(x => [x, x + "s"])];
  if (b.endsWith("e")) fs.push(b.slice(0, -1) + "ing");
  if (/[^aeiou]y$/.test(b)) fs.push(b.slice(0, -1) + "ies", b.slice(0, -1) + "ied");
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(b)) fs.push(b + b.slice(-1) + "ed", b + b.slice(-1) + "ing");
  fs.forEach(f => { if (!FORM.has(f)) FORM.set(f, w); });
});
const passWordCache = new Map();
function passageWords(p) {
  if (!passWordCache.has(p.id)) {
    const text = [p.title, ...p.s.map(blockText), ...p.qs.flatMap(q => [q.q, ...q.c])].join(" ").toLowerCase();
    const irr = window.IRREG || {}, out = new Map();
    (text.match(/[a-z]+(?:-[a-z]+)*/g) || []).forEach(t => { const w = FORM.get(t) || FORM.get(irr[t]); if (w) out.set(w.id, w); });
    PHRASES.forEach(w => { if (text.includes(w.w.toLowerCase())) out.set(w.id, w); });
    passWordCache.set(p.id, [...out.values()].sort((a, b) => b.d - a.d));
  }
  return passWordCache.get(p.id);
}
function passageVocabHTML(p) {
  const ws = passageWords(p);
  if (!ws.length) return "";
  return `<details class="pvocab"><summary>この長文の単語(${ws.length}語)</summary><div class="vlist">${ws.map(w => {
    const s = statusOf(w.id);
    return `<div class="vrow${s ? " st-" + s.toLowerCase() : ""}"><span class="dot" style="${rc(w.d)}"></span><b class="en">${esc(w.w)}</b><span>${esc(w.m)}</span></div>`;
  }).join("")}</div></details>`;
}
function partHTML(p) {
  const alias = p[2] ? `<span class="en">${p[2]}</span> の変化形,` : "";
  return `<b class="en">${p[0]}</b>(${alias}${partDef(p)})`;
}

/* ---------------- レート ---------------- */
function history(key) {
  const perfs = [], out = [];
  for (const c of S.contests) {
    const p = c.perf[key];
    if (p == null) continue;
    perfs.push(p);
    out.push({ t: c.t, perf: p, rating: Rating.rating(perfs), prev: out.length ? out[out.length - 1].rating : null });
  }
  return out;
}
const ratingOf = key => { const h = history(key); return h.length ? h[h.length - 1].rating : null; };
const maxRating = key => Math.max(0, ...history(key).map(x => x.rating));
// 本番の出題に使う推定値(補正なしの平均).表示レートは参加回数が少ないうちは低く出るため,こちらで難易度を合わせる
function estimate(key) {
  const ps = S.contests.map(c => c.perf[key]).filter(x => x != null);
  return ps.length ? Rating.aperf(ps) : 600;
}

/* ---------------- 学習日数 ---------------- */
function streaks() {
  const days = new Set(Object.keys(S.days));
  let cur = 0, d = new Date(); d.setHours(12, 0, 0, 0);
  if (!days.has(dateKey(d))) d = new Date(d.getTime() - DAY); // 今日まだなら昨日から数える
  while (days.has(dateKey(d))) { cur++; d = new Date(d.getTime() - DAY); }
  let max = 0, run = 0, prev = null;
  for (const k of [...days].sort()) {
    const t = new Date(k + "T12:00:00").getTime();
    run = prev != null && Math.round((t - prev) / DAY) === 1 ? run + 1 : 1;
    prev = t; max = Math.max(max, run);
  }
  return { cur, max, total: days.size, today: S.days[dateKey(Date.now())] || 0 };
}

/* ---------------- 実績 ---------------- */
function badgeCtx() {
  const rq = READING.flatMap(p => p.qs);
  const roots = Object.keys(ROOT).map(r => WORDS.filter(w => rootOf(w) === r));
  return {
    contests: S.contests.length,
    perfect: S.contests.some(c => c.items.every(x => x.ok)),
    maxPerf: Math.max(0, ...S.contests.map(c => c.perf.all || 0)),
    maxAll: maxRating("all"),
    streak: streaks().max,
    learned: WORDS.filter(isLearned).length,
    acTotal: [...WORDS, ...GRAM, ...rq].filter(q => statusOf(q.id) === "AC").length,
    gramAll: GRAM.every(q => statusOf(q.id) === "AC"),
    readAll: rq.every(q => statusOf(q.id) === "AC"),
    rootDone: roots.filter(ws => ws.length && ws.every(isLearned)).length
  };
}
const BADGES = [
  { id: "c1", name: "初参加", desc: "本番を1回解く", ok: c => c.contests >= 1 },
  { id: "c10", name: "常連", desc: "本番を10回解く", ok: c => c.contests >= 10 },
  { id: "c30", name: "皆勤", desc: "本番を30回解く", ok: c => c.contests >= 30 },
  { id: "perfect", name: "全完", desc: "本番で全問正解する", ok: c => c.perfect },
  { id: "perf1000", name: "好パフォーマンス", desc: "パフォーマンス1000以上を出す", ok: c => c.maxPerf >= 1000 },
  { id: "brown", name: "茶色", desc: "総合レート400に到達する", ok: c => c.maxAll >= 400 },
  { id: "green", name: "緑色", desc: "総合レート800に到達する(TOEIC 550点の目安)", ok: c => c.maxAll >= 800 },
  { id: "cyan", name: "水色", desc: "総合レート1200に到達する", ok: c => c.maxAll >= 1200 },
  { id: "s3", name: "三日坊主卒業", desc: "3日続けて学習する", ok: c => c.streak >= 3 },
  { id: "s7", name: "1週間", desc: "7日続けて学習する", ok: c => c.streak >= 7 },
  { id: "s30", name: "習慣化", desc: "30日続けて学習する", ok: c => c.streak >= 30 },
  { id: "ac50", name: "AC 50", desc: "50問を AC の状態にする", ok: c => c.acTotal >= 50 },
  { id: "ac200", name: "AC 200", desc: "200問を AC の状態にする", ok: c => c.acTotal >= 200 },
  { id: "root1", name: "語根制覇", desc: "1つの語根の単語をすべて習得する", ok: c => c.rootDone >= 1 },
  { id: "w100", name: "100語", desc: "単語を100語習得する", ok: c => c.learned >= 100 },
  { id: "gall", name: "文法全 AC", desc: "文法の全問題を AC の状態にする", ok: c => c.gramAll },
  { id: "rall", name: "長文全 AC", desc: "長文の全設問を AC の状態にする", ok: c => c.readAll }
];
function checkBadges() {
  const c = badgeCtx(), fresh = BADGES.filter(b => !S.badges[b.id] && b.ok(c));
  if (!fresh.length) return;
  fresh.forEach(b => { S.badges[b.id] = Date.now(); toast(`<b>実績解除</b> ${esc(b.name)}<br><span class="small">${esc(b.desc)}</span>`); });
  save();
}
function toast(html) {
  const el = document.createElement("div");
  el.className = "toast"; el.innerHTML = html;
  $("#toasts").append(el);
  setTimeout(() => el.classList.add("out"), 3800);
  setTimeout(() => el.remove(), 4300);
}

/* ---------------- 出題 ---------------- */
const INTERVAL = [0, 1, 2, 4, 8, 16, 32]; // 間隔反復の日数
function updateSrs(id, ok) {
  const s = S.srs[id] || { box: 0, due: 0 };
  if (ok) { s.box = Math.min(s.box + 1, INTERVAL.length - 1); s.due = Date.now() + INTERVAL[s.box] * DAY; }
  else { s.box = 0; s.due = Date.now() + 10 * 60000; }
  s.t = Date.now(); // 最後に解いた時刻(端末間で合わせるとき,新しい方を採る)
  S.srs[id] = s;
}
const dueWords = () => WORDS.filter(w => S.srs[w.id] && S.srs[w.id].due <= Date.now());
function pickNear(pool, T, k, penalty) {
  return pool.map(q => ({ q, s: Math.abs(q.d - T) + Math.random() * 200 + (penalty ? penalty(q) : 0) }))
    .sort((a, b) => a.s - b.s).slice(0, k).map(x => x.q);
}
// おまかせ(練習)
function autoPick(dom, avoid) {
  if (dom === "word") {
    const due = dueWords().sort((a, b) => S.srs[a.id].due - S.srs[b.id].due);
    if (due.length) return due[0].id;
    const unseen = WORDS.filter(w => !S.srs[w.id]);
    if (unseen.length) return pickNear(unseen, estimate("word"), 1)[0].id;
    return shuffle(WORDS.filter(w => w.id !== avoid))[0].id;
  }
  if (dom === "grammar") {
    const notAC = GRAM.filter(q => statusOf(q.id) !== "AC" && q.id !== avoid);
    return pickNear(notAC.length ? notAC : GRAM.filter(q => q.id !== avoid), estimate("grammar"), 1)[0].id;
  }
  const notAC = READING.filter(p => passageStatus(p) !== "AC" && p.id !== avoid);
  const pool = (notAC.length ? notAC : READING.filter(p => p.id !== avoid)).map(p => ({ id: p.id, d: passageD(p) }));
  return pickNear(pool.length ? pool : READING.map(p => ({ id: p.id, d: passageD(p) })), estimate("reading"), 1)[0].id;
}

/* 1問を表す共通の形: {dom, q, p?}  p は長文のときの本文 */
// 意味に同じ漢字を含む語は紛らわしい(含む/含める,延期する/先送りする)ので選択肢に並べない
const KANJI = /[一-鿿]/g;
function overlaps(a, b) { const s = new Set(a.match(KANJI) || []); return (b.match(KANJI) || []).some(c => s.has(c)); }
// つづりの近さ(文字の2つ組の重なり.0〜1)
const bigrams = w => { const t = w.toLowerCase(), b = new Set(); for (let i = 0; i < t.length - 1; i++) b.add(t.slice(i, i + 2)); return b; };
const BIG = new Map(WORDS.map(w => [w.id, bigrams(w.w)]));
function spellSim(a, b) {
  const x = BIG.get(a.id), y = BIG.get(b.id);
  let n = 0; x.forEach(g => { if (y.has(g)) n++; });
  return x.size + y.size ? 2 * n / (x.size + y.size) : 0;
}
// 取り違えやすい語の組(data/vocab.js の CONFUSE).つづりで引く
const BY_SPELL = new Map(WORDS.map(w => [w.w.toLowerCase(), w]));
const CONF = new Map();
(window.CONFUSE || []).forEach(g => {
  const ws = g.map(x => BY_SPELL.get(x)).filter(Boolean);
  ws.forEach(w => CONF.set(w.id, [...(CONF.get(w.id) || []), ...ws.filter(v => v !== w)]));
});
const confusables = w => CONF.get(w.id) || [];
/* 誤答の選択肢を選ぶ.毎回ランダムに,次の中から混ぜる
 *  1. 取り違えやすい語の組   2. つづりの近い語   3. 同じ語根の語(接辞で見分ける)   4. 品詞が同じで難易度の近い語
 * 品詞だけで消去できないよう,できるだけ同じ品詞でそろえる.意味に同じ漢字を含む語は並べない(紛らわしすぎる) */
function wordDistractors(q, rev) {
  const picked = [], pos = posOf(q), root = rootOf(q);
  // 取り違えやすい語の組は,意味に同じ漢字を含んでいても出す(見分けることが練習になるため)
  const ok = (w, conf) => w.id !== q.id && !picked.includes(w) && [q, ...picked].every(x => (conf || !overlaps(x.m, w.m)) && x.w.toLowerCase() !== w.w.toLowerCase());
  const take = (pool, n, conf) => { for (const w of shuffle(pool)) if (picked.length < n && ok(w, conf)) picked.push(w); };
  take(confusables(q), 1, true);
  const similar = WORDS.filter(w => w !== q).map(w => ({ w, s: spellSim(q, w) + Math.random() * 0.15 })).filter(x => x.s > 0.42).sort((a, b) => b.s - a.s).slice(0, 6).map(x => x.w);
  if (Math.random() < (rev ? 0.9 : 0.6)) take(similar.filter(w => posOf(w) === pos || rev), picked.length + 1);
  if (root && Math.random() < 0.7) take(WORDS.filter(w => rootOf(w) === root), picked.length + 1);
  take(WORDS.filter(w => posOf(w) === pos && Math.abs(w.d - q.d) <= 250), 3);
  take(WORDS.filter(w => posOf(w) === pos && Math.abs(w.d - q.d) <= 600), 3);
  take(WORDS.filter(w => posOf(w) === pos), 3);
  take(WORDS, 3);
  return picked.slice(0, 3);
}
// 単語の出題の向き.ej: 英語→意味,je: 意味→英語,mix: 混ぜる(一度見た単語は 4 割ほど逆向き)
function wordDir(q, contest) {
  const d = contest ? "mix" : (S.prefs.wdir || "mix");
  if (d !== "mix") return d === "je";
  return Math.random() < (contest ? 0.5 : S.srs[q.id] ? 0.4 : 0.15);
}
// st.choices: 英→日 は意味の文字列,日→英 は単語の id.どちらも表示順に並べる
function newSt(item, contest) {
  if (item.dom === "word") {
    const rev = wordDir(item.q, contest), ds = wordDistractors(item.q, rev);
    return { sel: null, rev, choices: shuffle([item.q, ...ds]).map(w => (rev ? w.id : w.m)) };
  }
  // 文法・長文は選択肢の並び順を毎回変える(sel は元の添字のまま)
  return { sel: null, order: shuffle([0, 1, 2, 3]) };
}
const wordRight = (item, st, i) => (st.rev ? st.choices[i] === item.q.id : st.choices[i] === item.q.m);
function isCorrect(item, st) {
  if (st.sel == null || st.sel < 0) return false; // 未解答・「わからない」は WA
  if (item.dom === "word") return wordRight(item, st, st.sel);
  return st.sel === item.q.a;
}

/* ---------------- 画面の切り替え ---------------- */
let view = "home", pState = null, cState = null, timerId = null, pendingNav = null;
const LIST = Object.assign({ dom: "word", filter: "all", group: "d" }, S.prefs.list || {});
let contestKind = "all";
function contestRunning() { return cState && !cState.done; }

$("#nav").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  const to = b.dataset.v;
  if (contestRunning() && to !== "contest") { pendingNav = to; view = "contest"; render(); return; }
  if (to === "list" && view === "list" && pState) { stopTimer(); pState = null; } // 一覧タブをもう一度押すと一覧に戻る
  go(to);
});
function renderHeader() {
  const r = ratingOf("all");
  $("#hdr-rate").innerHTML = r == null ? "" : `<span class="pill" style="${rc(r)}">総合 ${r}</span>`;
}
function go(to) { view = to; pendingNav = null; render(); window.scrollTo(0, 0); }
function render() {
  $$("#nav button").forEach(b => b.setAttribute("aria-current", b.dataset.v === view ? "page" : "false"));
  renderHeader();
  if (view === "home") $("#main").innerHTML = homeHTML();
  else if (view === "list") renderList();
  else if (view === "contest") renderContest();
  else if (view === "record") renderRecord();
  else if (view === "log") renderLog();
  else $("#main").innerHTML = defsHTML();
  bindGo();
}
// data-go: 画面の移動."auto" はおまかせ,"wa" は WA の解き直し,"thm" は定理の練習
function bindGo() {
  const from = view === "list" ? "list" : view;
  $$("[data-go]").forEach(b => b.onclick = () => {
    const to = b.dataset.go;
    if (to === "auto") startSolve(b.dataset.dom || LIST.dom, null, null, "", from);
    else if (to === "wa") startWaReview();
    else if (to === "weak") startWeakWords();
    else if (to === "thm") startTheorem(b.dataset.thm, from);
    else go(to);
  });
}
// 発音を聞く(端末の読み上げ機能)
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-say]");
  if (!b || !SPEAK) return;
  e.preventDefault();
  const u = new SpeechSynthesisUtterance(b.dataset.say);
  u.lang = "en-US"; u.rate = 0.9;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
});

/* ---------------- ホーム ---------------- */
function ratingCells() {
  return Object.keys(DOMAINS).map(k => {
    const r = ratingOf(k);
    return `<div class="rt" style="${rc(r || 0)}"><div class="lab">${DOMAINS[k]}</div><div class="val">${r == null ? "-" : r}</div>
      <div class="sub">${r == null ? "本番未参加" : `${tierOf(r).name}色 · ${tierOf(r).title}`}</div></div>`;
  }).join("");
}
function heroHTML() {
  const r = ratingOf("all");
  if (r == null) return `<button class="hero0" data-go="contest"><b>総合レートはまだありません</b><span class="small muted">本番を1回解くと,レートと推定 TOEIC スコアがつきます →</span></button>`;
  const t = tierOf(r), next = TIERS.find(x => x.min > r);
  const pct = next ? Math.round(100 * (r - t.min) / (next.min - t.min)) : 100;
  return `<div class="hero" style="${rc(r)}">
    <div class="lab">総合レート · <b style="color:var(--rc)">${t.name}色 ${t.title}</b></div>
    <div class="big">${r}</div>
    ${next ? `<div class="nextbar"><span style="width:${pct}%"></span></div><div class="small muted">${next.name}色まであと ${next.min - r}</div>` : ""}
  </div>`;
}
// 推定 TOEIC スコア(総合のパフォーマンスから.参加回数が少ないうちは幅が広い)
// 実際の TOEIC の点数(S.scores)が記録されていれば,その時点の推定との差の平均で補正する(新しいものほど重く)
const allPerfs = until => S.contests.filter(c => c.perf.all != null && (until == null || c.t <= until)).map(c => c.perf.all);
function toeicOffset() {
  let num = 0, den = 0;
  (S.scores || []).slice().sort((a, b) => a.t - b.t).reverse().forEach((x, i) => {
    const e = Rating.toeicEstimate(allPerfs(x.t + DAY));
    if (!e) return;
    const w = Math.pow(0.7, i);
    num += (x.score - e.score) * w; den += w;
  });
  return den ? Math.max(-250, Math.min(250, Math.round(num / den / 5) * 5)) : 0;
}
function toeicEst() {
  const e = Rating.toeicEstimate(allPerfs());
  if (!e) return null;
  const off = toeicOffset(), cl = v => Math.max(10, Math.min(990, v + off));
  return { score: cl(e.score), lo: cl(e.lo), hi: cl(e.hi), off, raw: e.score };
}
function toeicHTML() {
  const e = toeicEst(), goalPos = (100 * toeicGoal() / 990).toFixed(1);
  if (!e) return `<div class="toeic"><div class="lab">推定 TOEIC スコア</div><div class="tv muted">-</div><div class="small muted">本番を1回解くと表示されます.</div></div>`;
  return `<div class="toeic">
    <div class="lab">推定 TOEIC スコア(目安)</div>
    <div class="tv">約 <b>${e.score}</b> 点 <span class="small muted">${e.lo}〜${e.hi} 点の範囲</span></div>
    <div class="tbar" role="img" aria-label="推定 ${e.score} 点.目標 ${toeicGoal()} 点"><span class="range" style="left:${(100 * e.lo / 990).toFixed(1)}%;width:${(100 * (e.hi - e.lo) / 990).toFixed(1)}%"></span><span class="now" style="left:${(100 * e.score / 990).toFixed(1)}%"></span><span class="goal" style="left:${goalPos}%"></span></div>
    <div class="tscale"><span>10</span><span style="left:${goalPos}%">目標 ${toeicGoal()}</span><span>990</span></div>
    <div class="small muted">${e.score >= toeicGoal() ? `目標の ${toeicGoal()} 点に届く出来です.` : `目標の ${toeicGoal()} 点まで,あと約 ${toeicGoal() - e.score} 点.`}総合の本番 ${allPerfs().length} 回の出来からの換算です.${e.off ? `実際の点数の記録で ${e.off > 0 ? "+" : ""}${e.off} 点補正しています(補正前 ${e.raw} 点).` : "リスニングは測っていないので,「記録」画面で実際の点数を入れると補正されます."}</div>
  </div>`;
}
function homeHTML() {
  const due = dueWords().length, sk = streaks(), wa = waQueue().length, weak = weakWords().length;
  const unseen = WORDS.filter(w => !S.srs[w.id]).length;
  const gLeft = GRAM.filter(q => statusOf(q.id) !== "AC").length, rLeft = READING.filter(p => passageStatus(p) !== "AC").length;
  const tile = (attrs, title, sub, cls = "") => `<button class="tile ${cls}" ${attrs}><b>${title}</b><span>${sub}</span></button>`;
  const rated = ratingOf("all") != null || Object.keys(DOMAINS).some(k => ratingOf(k) != null);
  return `
  ${heroHTML()}
  ${rated ? toeicHTML() + `<div class="ratings">${ratingCells()}</div>` : ""}
  <div class="today">
    <div class="trow"><span><b>今日 ${sk.today}</b> / ${GOAL} 問</span><span class="small muted">${sk.cur} 日連続 · 学習 ${sk.total} 日</span></div>
    <div class="pbar"><span style="width:${Math.min(100, 100 * sk.today / GOAL).toFixed(0)}%"></span></div>
  </div>
  <h2>今日のメニュー</h2>
  <div class="tiles">
    ${tile('data-go="contest"', "本番に挑戦する", "総合または分野別.レートが動く", "main")}
    ${tile('data-go="auto" data-dom="word"', "単語", due ? `復習 ${due} 語がたまっています` : unseen ? `新しい単語(残り ${unseen} 語)` : "おまかせで復習")}
    ${tile('data-go="auto" data-dom="grammar"', "文法", gLeft ? `おまかせ(未 AC ${gLeft} 問)` : "全問 AC.おまかせで復習")}
    ${tile('data-go="auto" data-dom="reading"', "長文", rLeft ? `おまかせ(未 AC ${rLeft} 題)` : "全題 AC.おまかせで復習")}
    ${wa ? tile('data-go="wa"', "WA を解き直す", `${wa} 問(古いものから${wa > 20 ? " 20 問" : ""})`, "warn") : ""}
    ${weak ? tile('data-go="weak"', "苦手な単語", `${weak} 語.取り違えやすい語と一緒に`, "warn") : ""}
  </div>
  <p class="small muted">練習ではレートは動きません.本番を解くとレートと推定スコアが変動します.</p>
  <h2>進捗(今 AC の問題)</h2>
  ${progressHTML()}
  ${newsHTML()}`;
}

/* ---------------- 更新履歴(data/changelog.js) ---------------- */
const LOG = window.CHANGELOG || [];
const unreadLog = () => LOG.length && (S.prefs.seenLog || 0) < LOG[0].id;
function fmtYmd(s) { const [y, m, d] = s.split("-").map(Number); return `${y}/${m}/${d}`; }
function newsHTML() {
  if (!LOG.length) return "";
  const e = LOG[0];
  return `<h2>お知らせ</h2>
  <button class="news" data-go="log">
    <span class="small muted">${fmtYmd(e.date)}${unreadLog() ? ` <span class="newbadge">NEW</span>` : ""}</span>
    <b>${esc(e.title)}</b>
    <span class="small" style="color:var(--accent)">更新履歴を見る →</span>
  </button>`;
}
function renderLog() {
  $("#main").innerHTML = `
    <div class="row" style="margin-bottom:12px"><button class="btn ghost sm" data-go="home">← ホーム</button></div>
    <h2 style="margin-top:0">更新履歴</h2>
    ${LOG.map(e => `<section class="logent">
      <div class="small muted">${fmtYmd(e.date)}${(S.prefs.seenLog || 0) < e.id ? ` <span class="newbadge">NEW</span>` : ""}</div>
      <h3>${esc(e.title)}</h3>
      <ul>${e.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>`).join("")}`;
  // 開いた時点で既読にする(NEW は次に開いたときに消える)
  if (unreadLog()) { S.prefs.seenLog = LOG[0].id; save(); }
}
function progressHTML() {
  const rq = READING.flatMap(p => p.qs);
  const rows = [
    ["単語", WORDS.filter(q => statusOf(q.id) === "AC").length, WORDS.length, `習得 ${WORDS.filter(isLearned).length}語`],
    ["文法", GRAM.filter(q => statusOf(q.id) === "AC").length, GRAM.length, ""],
    ["長文", rq.filter(q => statusOf(q.id) === "AC").length, rq.length, "設問"]
  ];
  return `<div class="prog">${rows.map(([lab, n, all, note]) => `
    <div class="prow"><span>${lab}</span><span class="pbar"><span style="width:${all ? (100 * n / all).toFixed(1) : 0}%"></span></span><span class="small muted">${n}/${all}${note ? ` · ${note}` : ""}</span></div>`).join("")}</div>`;
}

/* ---------------- 問題一覧 ---------------- */
function units(dom) {
  if (dom === "word") return WORDS.map(q => ({ id: q.id, d: q.d, label: `<span class="en">${q.w}</span>` }));
  if (dom === "grammar") return GRAM.map(q => ({ id: q.id, d: q.d, label: `<span class="pid">G${q.id.slice(1)}</span>${esc(THM[q.t].name)}` }));
  return READING.map(p => ({ id: p.id, d: passageD(p), label: `<span class="pid">R${p.id.slice(1)}</span>${esc(p.kind)}` }));
}
function filteredUnits() {
  const f = LIST.filter;
  return units(LIST.dom).filter(u => {
    const s = unitStatus(LIST.dom, u.id);
    return f === "all" || (f === "notac" && s !== "AC") || (f === "wa" && s === "WA");
  }).sort((a, b) => a.d - b.d || a.id.localeCompare(b.id, "en", { numeric: true }));
}
function renderList() {
  if (pState) { renderSolve(); return; }
  const m = $("#main"), dom = LIST.dom, all = units(dom);
  const byThm = dom === "grammar" && LIST.group === "thm";
  const cnt = s => all.filter(u => unitStatus(dom, u.id) === s).length;
  const shown = filteredUnits();
  const chip = (u, label, grp) => {
    const s = unitStatus(dom, u.id);
    return `<button class="chip${s ? " st-" + s.toLowerCase() : ""}" data-pid="${u.id}"${grp ? ` data-grp="${grp}"` : ""}><span class="dot" style="${rc(u.d)}"></span><span class="cl">${label}</span><span class="cd">${u.d}</span></button>`;
  };
  const section = (head, sub, inAll, us, label, grp, open) => {
    const ac = inAll.filter(u => unitStatus(dom, u.id) === "AC").length;
    return `<details class="band"${open ? " open" : ""}>
      <summary>${head}<span class="small muted bcount">AC ${ac}/${inAll.length}</span></summary>${sub}
      ${us.length ? `<div class="chips">${us.map(u => chip(u, label(u), grp)).join("")}</div>` : `<p class="small muted">該当なし</p>`}
    </details>`;
  };
  let body;
  if (byThm) {
    // 定理別:1つの定理を続けて解ける.ラベルは問題文(定理名は見出しにあるので)
    body = Object.keys(THM).map(k => {
      const inAll = all.filter(u => GRAM_BY.get(u.id).t === k), us = shown.filter(u => GRAM_BY.get(u.id).t === k);
      const sub = `<p class="small muted thm-s">${THM[k].s}</p>`;
      return section(`<span class="bname">${esc(THM[k].name)}</span>`, sub, inAll, us, u => `<span class="en">${esc(GRAM_BY.get(u.id).q.replace("____", "＿"))}</span>`, k, us.length > 0 && LIST.filter !== "all");
    }).join("");
  } else {
    body = TIERS.map((t, i) => {
      const hi = TIERS[i + 1] ? TIERS[i + 1].min : Infinity;
      const inAll = all.filter(u => u.d >= t.min && u.d < hi), us = shown.filter(u => u.d >= t.min && u.d < hi);
      if (!inAll.length) return "";
      return section(`<span class="dot" style="--rc:var(${t.color})"></span><span class="bname">${t.name}</span> <span class="muted small">${t.min}〜${hi === Infinity ? "" : hi - 1}</span>`, "", inAll, us, u => u.label, "", true);
    }).join("");
  }
  m.innerHTML = `
    <div class="seg" role="group" aria-label="分野">${Object.keys(DOMAINS).map(k => `<button data-dom="${k}" aria-pressed="${dom === k}">${DOMAINS[k]}</button>`).join("")}</div>
    <div class="row" style="justify-content:space-between;margin-bottom:6px">
      <div class="seg sm" role="group" aria-label="絞り込み">${[["all", "すべて"], ["notac", "未 AC"], ["wa", "WA"]].map(([k, v]) => `<button data-f="${k}" aria-pressed="${LIST.filter === k}">${v}</button>`).join("")}</div>
      <button class="btn" data-go="auto">おまかせ</button>
    </div>
    ${dom === "grammar" ? `<div class="seg sm" role="group" aria-label="並べ方" style="margin:6px 0">${[["d", "難易度順"], ["thm", "定理別"]].map(([k, v]) => `<button data-g="${k}" aria-pressed="${(LIST.group || "d") === k}">${v}</button>`).join("")}</div>` : ""}
    ${dom === "word" ? `<div class="seg sm" role="group" aria-label="出題の向き" style="margin:6px 0">${[["mix", "混ぜる"], ["ej", "英語→意味"], ["je", "意味→英語"]].map(([k, v]) => `<button data-wd="${k}" aria-pressed="${(S.prefs.wdir || "mix") === k}">${v}</button>`).join("")}</div>` : ""}
    ${dom === "word" ? `<input type="search" id="wsearch" class="search en" placeholder="単語を検索(つづり)" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="単語を検索">` : ""}
    <p class="mode-note">AC ${cnt("AC")} · WA ${cnt("WA")} · 未挑戦 ${all.length - cnt("AC") - cnt("WA")}(全 ${all.length}${dom === "reading" ? "題" : "問"}).最後に解いた結果を表示します.問題を押すと練習モードで解けます.${byThm ? "定理名を押すと,その定理の問題が開きます." : ""}</p>
    ${body}`;
  const savePref = () => { S.prefs.list = { dom: LIST.dom, filter: LIST.filter, group: LIST.group }; save(); };
  m.querySelectorAll("[data-dom]").forEach(b => b.onclick = () => { LIST.dom = b.dataset.dom; savePref(); renderList(); });
  m.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { LIST.filter = b.dataset.f; savePref(); renderList(); });
  m.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { LIST.group = b.dataset.g; savePref(); renderList(); });
  m.querySelectorAll("[data-wd]").forEach(b => b.onclick = () => { S.prefs.wdir = b.dataset.wd; save(); renderList(); });
  m.querySelectorAll("[data-pid]").forEach(b => b.onclick = () => {
    const grp = b.dataset.grp; // 定理別のときは,その定理の中だけを順に解く
    const ids = filteredUnits().filter(u => !grp || GRAM_BY.get(u.id).t === grp).map(u => u.id);
    startSolve(dom, b.dataset.pid, ids, grp ? THM[grp].name : "");
  });
  const search = $("#wsearch");
  if (search) search.oninput = () => {
    const q = search.value.trim().toLowerCase();
    m.querySelectorAll(".chip").forEach(c => { c.hidden = !!q && !c.querySelector(".cl").textContent.toLowerCase().includes(q); });
  };
  bindGo();
}

/* ---------------- 練習モード(1問を解く) ---------------- */
// ids があれば一覧の並びで次へ進む.なければおまかせで次を選ぶ
// label: 何を解いているかの表示(定理名など).from: 「戻る」で戻る画面
function startSolve(dom, id, ids, label, from) {
  startQueue(ids ? ids.map(x => ({ dom, id: x })) : null, dom, id || (ids ? ids[0] : autoPick(dom)), label, from);
}
// queue: [{dom, id}] の順に解く(分野が混ざっていてもよい).null ならおまかせ
function startQueue(queue, dom, id, label, from) {
  stopTimer();
  pState = { queue, dom, id, label: label || "", from: from || "list", sess: { n: 0, ac: 0 } };
  setupItem();
  view = "list"; pendingNav = null; render(); window.scrollTo(0, 0);
}
// WA の問題を,古いものから解き直す
function waQueue() {
  const t = id => (S.res[id] && S.res[id].t) || 0;
  return [
    ...WORDS.filter(w => statusOf(w.id) === "WA").map(w => ({ dom: "word", id: w.id, t: t(w.id) })),
    ...GRAM.filter(q => statusOf(q.id) === "WA").map(q => ({ dom: "grammar", id: q.id, t: t(q.id) })),
    ...READING.filter(p => passageStatus(p) === "WA").map(p => ({ dom: "reading", id: p.id, t: Math.max(...p.qs.map(q => t(q.id))) }))
  ].sort((a, b) => a.t - b.t);
}
function startWaReview() {
  const q = waQueue().slice(0, 20);
  if (!q.length) { toast("WA の問題はありません."); return; }
  startQueue(q, q[0].dom, q[0].id, "WA の解き直し", "home");
}
// 苦手な単語:最後が WA か,WA の回数が AC 以上(2回以上)の単語.WA の多い順
function weakWords() {
  return WORDS.filter(w => { const r = S.res[w.id]; return r && (r.last === "WA" || (r.wa >= 2 && r.wa >= r.ac)); })
    .sort((a, b) => (S.res[b.id].wa - S.res[b.id].ac) - (S.res[a.id].wa - S.res[a.id].ac) || S.res[a.id].t - S.res[b.id].t);
}
// 苦手な単語を最大15語.取り違えやすい語があれば,すぐ後に並べて見比べられるようにする
function startWeakWords() {
  const q = [], seen = new Set();
  const add = w => { if (!seen.has(w.id) && q.length < 20) { seen.add(w.id); q.push({ dom: "word", id: w.id }); } };
  weakWords().slice(0, 15).forEach(w => { add(w); confusables(w).forEach(add); });
  if (!q.length) { toast("苦手な単語はありません."); return; }
  startQueue(q, "word", q[0].id, "苦手な単語", "home");
}
// 1つの定理の問題を続けて解く(未 AC を先に,易しい順)
function startTheorem(k, from) {
  const qs = GRAM.filter(q => q.t === k).sort((a, b) => (statusOf(a.id) === "AC") - (statusOf(b.id) === "AC") || a.d - b.d);
  startSolve("grammar", qs[0].id, qs.map(q => q.id), THM[k].name, from);
}
function setupItem() {
  const { dom, id } = pState;
  S.prefs.notes = (S.prefs.notes || 0) + 1;
  pState.prev = unitStatus(dom, id); // 開いた時点の結果(解いた後も「前回」として表示する)
  if (dom === "reading") {
    const p = PASS_BY.get(id);
    Object.assign(pState, { passage: p, sts: p.qs.map(q => newSt({ dom, q })), start: Date.now(), done: false, st: null, item: { dom, p } });
  } else {
    const q = dom === "word" ? WORD_BY.get(id) : GRAM_BY.get(id);
    pState.item = { dom, q }; pState.st = newSt(pState.item); pState.done = false;
  }
}
let autoT = null; // 「AC なら自動で次へ」のタイマー
function nextSolve() {
  stopTimer(); clearTimeout(autoT);
  const { dom, queue, id } = pState;
  if (queue) {
    const i = queuePos();
    if (i < 0 || i + 1 >= queue.length) { backToList(true); return; }
    pState.dom = queue[i + 1].dom; pState.id = queue[i + 1].id;
  } else pState.id = autoPick(dom, id);
  setupItem(); render(); window.scrollTo(0, 0);
}
const queuePos = () => pState.queue.findIndex(x => x.dom === pState.dom && x.id === pState.id);
// やめるとき(最後まで解いたときも),今回の成績を知らせる
function backToList(finished) {
  stopTimer(); clearTimeout(autoT);
  const to = pState ? pState.from : "list", z = pState && pState.sess;
  pState = null; go(to);
  if (z && z.n) toast(`${finished === true ? "最後まで解きました." : ""}今回は ${z.n} 問中 <b>${z.ac} 問 AC</b>(${Math.round(100 * z.ac / z.n)}%)でした.`);
  else if (finished === true) toast("最後まで解きました.");
}
// 今回(続けて解いている間)の成績
function sessText() {
  const z = pState.sess;
  if (!z.n) return "練習モード";
  return `今回 ${z.n} 問 · <b class="up">AC ${z.ac}</b>${z.n - z.ac ? ` · <span class="down">WA ${z.n - z.ac}</span>` : ""}`;
}
function solveTop() {
  const { dom, queue, label } = pState;
  const pos = queue ? `${queuePos() + 1} / ${queue.length}` : "おまかせ";
  const s = pState.prev;
  const bar = queue ? `<div class="qprog"><span style="width:${(100 * (queuePos() + (pState.done || (pState.st && pState.st.done) ? 1 : 0)) / queue.length).toFixed(1)}%"></span></div>` : "";
  return `<div class="row" style="justify-content:space-between;margin-bottom:${queue ? 6 : 12}px">
    <button class="btn ghost sm" id="back-btn">← ${pState.from === "list" ? "一覧" : "戻る"}</button>
    <span class="small muted">${label ? `${esc(label)} · ` : `${DOMAINS[dom]} · `}${pos}${s ? ` · 前回 <span class="verdict ${s.toLowerCase()} xs">${s}</span>` : ""}</span>
  </div>${bar}`;
}
function renderSolve() {
  const m = $("#main");
  // 説明は最初の数問だけ詳しく出し,慣れたら1行にする(問題を画面の上の方に出すため)
  const long = (S.prefs.notes || 0) < 5;
  const note = long
    ? `練習モード:${pState.dom === "reading" ? "全問に答えて提出すると判定します" : "1問ごとにすぐ判定します"}.分からないときは「わからない」を選ぶと,当てずっぽうの AC を防げます.レートは動きません.`
    : "";
  // 単語・文法は「AC なら自動で次へ」を選べる(テンポよく解くため.WA のときは解説を読めるよう止まる)
  const auto = pState.dom !== "reading" ? `<label class="autonext"><input type="checkbox" id="auto-next"${S.prefs.autoNext ? " checked" : ""}> AC なら自動で次へ</label>` : "";
  m.innerHTML = solveTop() + `<div class="notebar">${note ? `<p class="mode-note">${note}</p>` : `<span class="small muted" id="sess">${sessText()}</span>`}${auto}</div><div class="card" id="qcard"></div>`;
  const an = $("#auto-next");
  if (an) an.onchange = () => { S.prefs.autoNext = an.checked; save(); };
  $("#back-btn").onclick = backToList;
  if (pState.dom === "reading") renderSolveReading(); else renderSolveSingle();
}
function renderSolveSingle() {
  const item = pState.item, st = pState.st, card = $("#qcard");
  card.innerHTML = itemHTML(item, st) + `<div id="result"></div><div class="row actions" id="actions"></div>`;
  const show = fresh => {
    const ok = isCorrect(item, st);
    $("#result").innerHTML = `<p style="margin-top:16px" id="verdict"><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span>${st.sel === IDK ? ` <span class="small muted">「わからない」を選びました.解説で確認しましょう.</span>` : ""}</p>` + editorialHTML(item);
    markChoices(card, item, st);
    // 次へ進むボタンは,解説を読んでいる間も画面の下に残す
    const a = $("#actions");
    a.classList.add("stick");
    a.innerHTML = `<button class="btn grow" id="next-btn">次の問題</button><button class="btn ghost" id="list-btn">やめる</button>`;
    $("#next-btn").onclick = nextSolve;
    $("#list-btn").onclick = backToList;
    $("#next-btn").focus({ preventScroll: true });
    const bar = $(".qprog > span");
    if (bar && pState.queue) bar.style.width = (100 * (queuePos() + 1) / pState.queue.length).toFixed(1) + "%";
    if (fresh) $("#verdict").scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (fresh && ok && S.prefs.autoNext) {
      const me = pState;
      clearTimeout(autoT);
      autoT = setTimeout(() => { if (pState === me && pState.st === st && view === "list") nextSolve(); }, 900);
    }
  };
  if (st.done) { show(false); return; }
  bindChoices(card, st, () => {
    st.done = true;
    const ok = isCorrect(item, st);
    pState.sess.n++; if (ok) pState.sess.ac++;
    record(item.q.id, ok);
    if (item.dom === "word") updateSrs(item.q.id, ok);
    save(); show(true); checkBadges();
    const se = $("#sess"); if (se) se.innerHTML = sessText();
  });
}
function renderSolveReading() {
  const p = pState.passage, sts = pState.sts, card = $("#qcard");
  const done = pState.done;
  const evs = done ? p.qs.flatMap(q => q.ev) : [];
  card.innerHTML = `
    <div class="timebar"><span class="muted">${esc(p.kind)} · 目標 ${fmtSec(p.target)}</span><span class="timer" id="ptimer"></span></div>
    ${passageHTML(p, evs, { fill: done, box: !done })}
    ${p.qs.map((q, k) => `<div class="rq" data-k="${k}">${metaHTML("reading", q.d)}<p class="qtext en">${qLabel(p, k)}</p>${choicesHTML(q.c, sts[k], true)}<div class="rres"></div></div>`).join("")}
    <div id="rsum"></div>
    <div class="row actions" id="actions"></div>`;
  const blocks = card.querySelectorAll(".rq");
  if (done) {
    const sec = pState.elapsed;
    $("#ptimer").textContent = fmtSec(sec);
    let score = 0;
    blocks.forEach((el, k) => {
      const item = { dom: "reading", p, q: p.qs[k] }, ok = isCorrect(item, sts[k]);
      if (ok) score++;
      markChoices(el, item, sts[k]);
      el.querySelector(".rres").innerHTML = `<p style="margin-top:12px"><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span></p>` + editorialHTML(item);
    });
    const diff = sec - p.target;
    $("#rsum").innerHTML = `<div class="editorial"><h3>結果</h3><p>${score} / ${p.qs.length} 問正解 · 所要時間 ${fmtSec(sec)}(目標より ${diff <= 0 ? `<span class="up">${fmtSec(-diff)} 速い</span>` : `<span class="down">${fmtSec(diff)} 遅い</span>`})</p>
      <h3>本文の訳</h3><p>${p.ja}</p></div>${passageVocabHTML(p)}`;
    $("#actions").classList.add("stick");
    $("#actions").innerHTML = `<button class="btn grow" id="next-btn">${pState.queue ? "次の問題" : "次の長文"}</button><button class="btn ghost" id="list-btn">やめる</button>`;
    $("#next-btn").onclick = nextSolve;
    $("#list-btn").onclick = backToList;
    return;
  }
  bindPbox(card);
  blocks.forEach((el, k) => bindChoices(el, sts[k], refresh));
  $("#actions").innerHTML = `<button class="btn" id="submit-btn">提出する</button><span class="small muted" id="left"></span>`;
  function refresh() {
    const left = sts.filter(s => s.sel == null).length;
    $("#submit-btn").disabled = left > 0;
    $("#left").textContent = left ? `あと ${left} 問` : "";
  }
  refresh();
  $("#submit-btn").onclick = () => {
    stopTimer();
    pState.elapsed = (Date.now() - pState.start) / 1000;
    pState.done = true;
    p.qs.forEach((q, k) => { const ok = isCorrect({ dom: "reading", q }, sts[k]); pState.sess.n++; if (ok) pState.sess.ac++; record(q.id, ok); });
    (S.readTimes[p.id] = S.readTimes[p.id] || []).push(Math.round(pState.elapsed));
    save(); renderSolve(); checkBadges();
    const sum = $("#rsum"); if (sum) sum.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };
  const tick = () => { const el = $("#ptimer"); if (el) el.textContent = fmtSec((Date.now() - pState.start) / 1000); };
  tick(); stopTimer(); timerId = setInterval(tick, 1000);
}
function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

/* ---------------- 問題と解説の描画 ---------------- */
function metaHTML(dom, d) {
  return `<div class="qmeta"><span>${DOMAINS[dom]}</span><span><span class="dot" style="${rc(d)}"></span>難易度 ${d}</span></div>`;
}
// list は元の並び.st.order があればその順に表示する(data-i は元の添字なので,判定はそのまま)
function choicesHTML(list, st, en) {
  const order = st.order || list.map((_, i) => i);
  // 最後の「わからない」は,当てずっぽうで AC にしないための選択肢(WA になる)
  return `<div class="choices">${order.map((i, k) => `<button class="choice${en ? " en" : ""}" data-i="${i}" aria-pressed="${st.sel === i}"><span class="key">${"ABCD"[k]}</span><span class="ct">${esc(list[i])}</span></button>`).join("")}
    <button class="choice idk" data-i="${IDK}" aria-pressed="${st.sel === IDK}"><span class="key">?</span>わからない</button></div>`;
}
// opt.cur: 今の設問の空所(Part 6),opt.fill: 空所に正解を入れて表示する
function passageHTML(p, evs, opt = {}) {
  const ev = evMap(evs);
  let html = p.s.map((b, i) => blockHTML(b, ev.get(i))).join("");
  html = p6Blanks(html, p, opt);
  const body = `<div class="passage en${opt.box ? " pbox" : ""}"><div class="ptitle">${esc(p.kind)}:${esc(p.title)}</div>${html}</div>`;
  return opt.box ? `<div class="pwrap">${body}<button class="pmore" type="button" hidden>本文を広げる ▼</button></div>` : body;
}
// 本文の枠:はみ出すときだけ「本文を広げる」を出す
function bindPbox(root) {
  (root || document).querySelectorAll(".pwrap").forEach(w => {
    const box = w.querySelector(".pbox"), btn = w.querySelector(".pmore");
    if (!box || !btn) return;
    if (box.scrollHeight > box.clientHeight + 4) btn.hidden = false;
    btn.onclick = () => { const open = box.classList.toggle("open"); btn.textContent = open ? "本文をたたむ ▲" : "本文を広げる ▼"; };
  });
}
// Part 6 の空所 [n] を描く(fill なら正解を入れる)
function p6Blanks(html, p, opt) {
  if (!p.part6) return html;
  return html.replace(/\[(\d)\]/g, (_, n) => {
    const q = p.qs[n - 1];
    return opt.fill && q ? `<span class="p6b done">${esc(q.c[q.a])}</span>` : `<span class="p6b${+n === opt.cur ? " cur" : ""}">(${n})</span>`;
  });
}
const qLabel = (p, k) => (p.part6 ? `(${k + 1}) に入る最も適切なものは?` : `${k + 1}. ${esc(p.qs[k].q)}`);
const SPEAK = typeof window.speechSynthesis !== "undefined";
const speakBtn = text => (SPEAK ? `<button class="speak" data-say="${esc(text)}" aria-label="発音を聞く"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/></svg></button>` : "");
function itemHTML(item, st) {
  const q = item.q;
  if (item.dom === "word") {
    const ex = esc(q.ex).replace(new RegExp("\\b(" + q.w.slice(0, -1) + "\\w*)", "i"), "<b>$1</b>");
    if (st.rev) { // 意味 → 英単語.例文の単語は空所にする
      const blank = esc(q.ex).replace(new RegExp("\\b(" + q.w.slice(0, -1) + "\\w*)", "i"), '<span class="blank">&nbsp;</span>');
      return metaHTML("word", q.d) + `<p class="small muted" style="margin:0">意味から英単語を選ぶ</p><p class="word jm">${esc(q.m)}</p><p class="sentence en">${blank}</p><p class="small muted">この意味の英単語は?</p>` + choicesHTML(st.choices.map(id => WORD_BY.get(id).w), st, true);
    }
    return metaHTML("word", q.d) + `<p class="word en">${esc(q.w)}${speakBtn(q.w)}</p><p class="sentence en">${ex}</p><p class="small muted">この単語の意味は?</p>` + choicesHTML(st.choices, st, false);
  }
  if (item.dom === "grammar") {
    return metaHTML("grammar", q.d) + `<p class="sentence en">${esc(q.q).replace("____", '<span class="blank">&nbsp;</span>')}</p>` + choicesHTML(q.c, st, true);
  }
  const k = item.p.qs.indexOf(q);
  return metaHTML("reading", q.d) + passageHTML(item.p, null, { cur: k + 1, box: true }) + `<p class="qtext en"><b>${qLabel(item.p, k)}</b></p>` + choicesHTML(q.c, st, true);
}
function editorialHTML(item) {
  const q = item.q;
  if (item.dom === "word") {
    const root = rootOf(q);
    if (!root) { // 語根から導けない単語:意味と覚え方のメモを示す
      return `<div class="editorial"><h3>意味</h3><p class="derive"><b class="en">${esc(q.w)}</b>${speakBtn(q.w)} <b>${esc(q.m)}</b> <span class="small muted">${POS[posOf(q)] || ""}</span></p>${q.n ? `<p>${q.n}</p>` : ""}
        <h3>例文の訳</h3><p>${q.ja}</p>${confHTML(q)}</div>`;
    }
    const chain = q.p.map(partHTML).join(" + ");
    const sib = WORDS.filter(w => w.id !== q.id && rootOf(w) === root).map(w => `${w.w}(${w.m})`).join(", ");
    return `<div class="editorial"><h3>導出</h3><p class="derive">${chain} → <b>${q.m}</b></p><p>${q.n}</p>
      <h3>例文の訳</h3><p>${q.ja}</p>${confHTML(q)}${sib ? `<h3>同じ語根から導ける単語</h3><p class="en">${esc(sib)}</p>` : ""}</div>`;
  }
  if (item.dom === "grammar") {
    const t = THM[q.t];
    return `<div class="editorial"><h3>使う定理:${t.name}</h3><div class="thm">${t.s}</div>
      <p class="small muted">前提の定義:${t.def}</p><h3>この問題では</h3><p>${q.why}</p>${xHTML(q)}<h3>訳</h3><p>${q.ja}</p></div>`;
  }
  const evText = q.ev.map(e => {
    const b = item.p.s[evKey(e)];
    if (typeof b === "string") return `<p class="en"><span class="ev" style="background:var(--hl)">${p6Blanks(esc(b), item.p, { fill: true })}</span></p>`;
    // 図表が根拠のとき:行の指定があればその行だけを抜き出して示す
    const sub = !Array.isArray(e) ? b : Object.assign({}, b, b.t === "table" ? { rows: [b.rows[e[1]]] } : { items: [b.items[e[1]]] });
    return `<div class="en evfig">${blockHTML(sub)}</div>`;
  }).join("");
  return `<div class="editorial"><h3>根拠</h3>${evText}<h3>解き方</h3><p>${q.why}</p>${xHTML(q)}</div>`;
}
function confHTML(q) {
  const cs = confusables(q);
  return cs.length ? `<h3>取り違えやすい語</h3><div class="cwlist">${cs.map(w => `<div class="cwrow"><b class="en">${esc(w.w)}</b><span>${esc(w.m)}</span></div>`).join("")}</div>` : "";
}
// 誤答の選択肢ごとの説明(q.x は選択肢と同じ並び.正解の位置は空でよい)
function xHTML(q) {
  if (!q.x) return "";
  return `<h3>ほかの選択肢</h3><div class="xlist">${q.c.map((c, i) => (i === q.a || !q.x[i] ? "" : `<div class="xrow"><b class="en">${esc(c)}</b><span>${q.x[i]}</span></div>`)).join("")}</div>`;
}
function markChoices(root, item, st) {
  root.querySelectorAll(".choice").forEach(b => {
    const i = +b.dataset.i;
    b.disabled = true;
    const right = i >= 0 && (item.dom === "word" ? wordRight(item, st, i) : i === item.q.a);
    if (right) b.classList.add("right"); else if (i === st.sel) b.classList.add("wrong");
    // 単語:判定後,各選択肢がどの単語か(逆向きならその意味)を示す.誤答の選択肢もついでに覚えられる
    const w = item.dom === "word" && i >= 0 && (st.rev ? WORD_BY.get(st.choices[i]) : WORD_BY_M.get(st.choices[i]));
    if (w && !b.querySelector(".cw")) b.insertAdjacentHTML("beforeend", choiceWordHTML(w, st.rev));
    // 正解と自分の解答を文字でも示す(色だけに頼らない)
    if (!b.querySelector(".cmark") && (right || i === st.sel)) {
      b.insertAdjacentHTML("beforeend", `<span class="cmark ${right ? "ok" : "ng"}">${right ? "正解" : "あなたの解答"}</span>`);
    }
  });
}
// 誤答の選択肢には,その単語の過去の状態(AC / WA)を付けない.今回の正誤と紛らわしいため
function choiceWordHTML(w, rev) {
  return `<span class="cw">${rev ? `<span class="jm">${esc(w.m)}</span>` : `<b class="en">${esc(w.w)}</b>`}</span>`;
}
// 本番の結果など,選択肢を表示しない画面で使う一覧
function choiceWordsHTML(item, st) {
  return `<div class="cwlist">${st.choices.map((c, i) => {
    const w = st.rev ? WORD_BY.get(c) : WORD_BY_M.get(c), cls = wordRight(item, st, i) ? " right" : i === st.sel ? " wrong" : "";
    return `<div class="cwrow${cls}"><b class="en">${esc(w ? w.w : "")}</b><span>${esc(w ? w.m : c)}</span></div>`;
  }).join("")}</div>`;
}
function bindChoices(root, st, onPick) {
  root.querySelectorAll(".choice").forEach(b => b.onclick = () => {
    st.sel = +b.dataset.i;
    root.querySelectorAll(".choice").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    if (onPick) onPick();
  });
}

/* ---------------- 本番モード ---------------- */
function startContest(kind = "all") {
  const K = CONTESTS[kind];
  // 最近3回の本番に出た問題と,今 AC の問題を避ける
  const recent = new Set(S.contests.slice(-3).flatMap(c => c.items.map(x => x.id)));
  const pen = id => (recent.has(id) ? 400 : 0) + (statusOf(id) === "AC" ? 150 : 0);
  const passages = READING.map(p => ({ id: p.id, d: passageD(p) }));
  const pps = K.reading ? pickNear(passages, estimate("reading"), K.reading, u => (p => (p.qs.some(q => recent.has(q.id)) ? 400 : 0) + (passageStatus(p) === "AC" ? 150 : 0))(PASS_BY.get(u.id))) : [];
  const items = [
    ...(K.word ? pickNear(WORDS, estimate("word"), K.word, q => pen(q.id)).map(q => ({ dom: "word", q })) : []),
    ...(K.grammar ? pickNear(GRAM, estimate("grammar"), K.grammar, q => pen(q.id)).map(q => ({ dom: "grammar", q })) : []),
    ...pps.flatMap(u => { const p = PASS_BY.get(u.id); return p.qs.map(q => ({ dom: "reading", q, p })); })
  ];
  cState = { kind, items, sts: items.map(it => newSt(it, true)), i: 0, end: Date.now() + K.sec * 1000, done: false, confirming: false };
  stopTimer(); timerId = setInterval(contestTick, 1000);
  persistContest();
  renderContest();
}
function persistContest() {
  S.live = contestRunning() ? {
    items: cState.items.map(it => ({ dom: it.dom, id: it.q.id })),
    sts: cState.sts.map(s => ({ sel: s.sel, choices: s.choices, rev: s.rev, order: s.order })),
    i: cState.i, end: cState.end, kind: cState.kind
  } : null;
  save();
}
// 起動時:途中の本番があれば再開する.時間切れなら採点する
function restoreContest() {
  const L = S.live;
  if (!L) return;
  try {
    const items = L.items.map(({ dom, id }) => {
      if (dom === "word") return { dom, q: WORD_BY.get(id) };
      if (dom === "grammar") return { dom, q: GRAM_BY.get(id) };
      const p = Q_PASSAGE.get(id);
      return { dom, q: p.qs.find(q => q.id === id), p };
    });
    if (items.some(it => !it.q)) throw new Error("missing");
    cState = { kind: L.kind || "all", items, sts: L.sts.map(s => ({ sel: s.sel, choices: s.choices, rev: s.rev, order: s.order })), i: L.i || 0, end: L.end, done: false, confirming: false };
    view = "contest";
    if (Date.now() >= L.end) { finishContest(); setTimeout(() => toast("前回の本番は時間切れだったので採点しました."), 300); }
    else timerId = setInterval(contestTick, 1000);
  } catch (e) { cState = null; S.live = null; save(); }
}
function contestTick() {
  if (!contestRunning()) { stopTimer(); return; }
  const left = (cState.end - Date.now()) / 1000;
  const el = $("#timer");
  if (el) { el.textContent = `残り ${fmtSec(left)}`; el.classList.toggle("low", left <= 60); }
  if (left <= 0) { finishContest(); if (view === "contest") renderContest(); }
}
function finishContest() {
  if (!contestRunning()) return;
  stopTimer();
  cState.done = true;
  const t = Date.now();
  const items = cState.items.map((it, i) => ({ id: it.q.id, dom: it.dom, d: it.q.d, ok: isCorrect(it, cState.sts[i]) ? 1 : 0 }));
  const before = {};
  Object.keys(SERIES).forEach(k => before[k] = ratingOf(k));
  // 総合の本番だけが総合レートを動かす.分野別の本番はその分野のパフォーマンスだけを持つ
  const perf = { all: cState.kind === "all" ? Rating.performance(items) : null };
  Object.keys(DOMAINS).forEach(k => perf[k] = Rating.performance(items.filter(x => x.dom === k)));
  items.forEach(x => { record(x.id, !!x.ok, t); if (x.dom === "word") updateSrs(x.id, !!x.ok); });
  S.contests.push({ t, kind: cState.kind, items, perf });
  const after = {};
  Object.keys(SERIES).forEach(k => after[k] = ratingOf(k));
  cState.res = items.map(x => !!x.ok);
  cState.sum = { before, after, perf };
  S.live = null;
  save();
  renderHeader();
  checkBadges();
}
const unanswered = () => cState.sts.filter(s => s.sel == null).length;

function renderContest() {
  const m = $("#main");
  if (!cState) {
    m.innerHTML = `
      <p style="margin-top:0"><b>本番モード</b>:今の実力に近い難易度から出題します.種類を選んでください.</p>
      <div class="kinds">${Object.entries(CONTESTS).map(([k, K]) => {
        const r = ratingOf(k);
        return `<button class="kind${k === "all" ? " main" : ""}" data-kind="${k}"><b>${K.name}</b><span>${K.desc}</span><span class="small">${SERIES[k]}レート ${r == null ? "-" : r}</span></button>`;
      }).join("")}</div>
      <p class="small muted">総合の本番は総合レートと各分野のレート,分野別の本番はその分野のレートだけが動きます.推定 TOEIC スコアは総合の本番から計算します.</p>
      <p class="small muted">解答中は正誤を表示しません.「わからない」を選ぶと WA になりますが,当てずっぽうより正確に実力を測れます.時間切れになるとその時点で採点します.</p>`;
    m.querySelectorAll("[data-kind]").forEach(b => b.onclick = () => startContest(b.dataset.kind));
    return;
  }
  if (cState.done) {
    m.innerHTML = contestResultHTML();
    $("#again-btn").onclick = () => { const k = cState.kind; cState = null; startContest(k); };
    $("#kinds-btn").onclick = () => { cState = null; renderContest(); };
    $$("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
    return;
  }
  const i = cState.i, item = cState.items[i], st = cState.sts[i], n = cState.items.length;
  const left = unanswered();
  let banner = "";
  if (pendingNav) {
    banner = `<div class="banner"><p style="margin:0 0 10px">本番の途中です.ここで終了すると,未解答の問題は WA として採点されます.</p>
      <div class="row"><button class="btn warn" id="leave-yes">終了して採点する</button><button class="btn ghost" id="leave-no">本番を続ける</button></div></div>`;
  } else if (cState.confirming) {
    banner = `<div class="banner"><p style="margin:0 0 10px">未解答が ${left} 問あります.このまま提出すると,未解答の問題は WA になります.</p>
      <div class="row"><button class="btn warn" id="conf-yes">提出して採点する</button><button class="btn ghost" id="conf-no">解答に戻る</button></div></div>`;
  }
  m.innerHTML = `${banner}
    <div class="ctop">
      <span><span class="small muted">${CONTESTS[cState.kind || "all"].name} · </span>${i + 1} / ${n}問目 <span class="small muted" id="left-count">(未解答 ${left})</span></span>
      <span class="timer" id="timer"></span>
    </div>
    <div class="dots">${cState.items.map((_, k) => `<button class="qdot${k === i ? " cur" : ""}${cState.sts[k].sel != null ? " done" : ""}" data-j="${k}" aria-label="${k + 1}問目">${k + 1}</button>`).join("")}</div>
    <div class="card" id="qcard">${itemHTML(item, st)}
      <div class="row" style="margin-top:18px">
        <button class="btn ghost" id="prev-btn" ${i === 0 ? "disabled" : ""}>前へ</button>
        ${i < n - 1 ? `<button class="btn" id="next-btn">次へ</button>` : ""}
        <button class="btn${i < n - 1 ? " ghost" : ""}" id="submit-btn" style="margin-left:auto">提出</button>
      </div>
    </div>`;
  contestTick();
  const moveTo = j => { cState.i = j; cState.confirming = false; persistContest(); renderContest(); };
  bindPbox($("#qcard"));
  bindChoices($("#qcard"), st, () => {
    persistContest();
    $("#left-count").textContent = `(未解答 ${unanswered()})`;
    m.querySelector(`.qdot[data-j="${i}"]`).classList.add("done");
  });
  m.querySelectorAll(".qdot").forEach(b => b.onclick = () => moveTo(+b.dataset.j));
  $("#prev-btn").onclick = () => moveTo(i - 1);
  if (i < n - 1) $("#next-btn").onclick = () => moveTo(i + 1);
  $("#submit-btn").onclick = () => {
    if (unanswered() && !cState.confirming) { cState.confirming = true; renderContest(); window.scrollTo(0, 0); return; }
    finishContest(); renderContest(); window.scrollTo(0, 0);
  };
  if (pendingNav) {
    $("#leave-yes").onclick = () => { const to = pendingNav; finishContest(); go(to); };
    $("#leave-no").onclick = () => { pendingNav = null; render(); };
  }
  if (cState.confirming && !pendingNav) {
    $("#conf-yes").onclick = () => { finishContest(); renderContest(); window.scrollTo(0, 0); };
    $("#conf-no").onclick = () => { cState.confirming = false; renderContest(); };
  }
}
function contestResultHTML() {
  const c = cState, score = c.res.filter(Boolean).length, { before, after, perf } = c.sum;
  const keys = Object.keys(SERIES).filter(k => perf[k] != null);
  const promos = keys.filter(k => after[k] != null && tierOf(after[k]).min > tierOf(before[k] || 0).min);
  const promoHTML = promos.map(k => { const t = tierOf(after[k]); return `<div class="promo" style="${rc(after[k])}"><b>昇格!</b> ${SERIES[k]}が<b>${t.name}色(${t.title})</b>になりました</div>`; }).join("");
  const rows = keys.map(k => {
    const b = before[k], a = after[k];
    return `<tr${k === "all" ? ' class="strong"' : ""}><td>${SERIES[k]}</td><td>${rateSpan(perf[k])}</td><td>${b == null ? `<span class="muted small">初参加</span>` : rateSpan(b)} → ${rateSpan(a)}</td><td>${b == null ? "" : signed(a - b)}</td></tr>`;
  }).join("");
  const shown = new Set();
  const det = c.items.map((item, i) => {
    const st = c.sts[i], ok = c.res[i], q = item.q;
    let title, yours, ans, extra = "";
    if (item.dom === "word") {
      title = `<span class="en">${q.w}</span>`;
      const pickW = st.sel == null || st.sel < 0 ? null : st.rev ? WORD_BY.get(st.choices[st.sel]) : WORD_BY_M.get(st.choices[st.sel]);
      yours = st.sel == null ? "未解答" : st.sel < 0 ? "わからない" : pickW ? `<span class="en">${esc(pickW.w)}</span>(${esc(pickW.m)})` : "";
      ans = `<span class="en">${esc(q.w)}</span>(${esc(q.m)})`;
      extra = `<p class="small muted" style="margin:8px 0 0">選択肢の単語</p>` + choiceWordsHTML(item, st);
    } else {
      title = item.dom === "reading" && item.p.part6 ? `<span class="en">${esc(item.p.title)}</span> の空所 (${item.p.qs.indexOf(q) + 1})` : `<span class="en">${esc(q.q)}</span>`;
      yours = st.sel == null ? "未解答" : st.sel < 0 ? "わからない" : `<span class="en">${esc(q.c[st.sel])}</span>`;
      ans = `<span class="en">${esc(q.c[q.a])}</span>`;
      if (item.dom === "reading" && !shown.has(item.p.id)) {
        shown.add(item.p.id);
        extra = passageHTML(item.p, item.p.qs.flatMap(x => x.ev), { fill: true }) + `<p class="small muted">本文の訳:${item.p.ja}</p>` + passageVocabHTML(item.p);
      }
    }
    return `<details><summary><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span> ${i + 1}. ${DOMAINS[item.dom]}:${title}</summary>
      ${extra}<p class="small">あなたの解答:${yours}<br>正解:${ans}</p>${editorialHTML(item)}</details>`;
  }).join("");
  return `${promoHTML}
    <p style="margin-top:0"><b>結果:${score} / ${c.items.length} 問正解</b></p>
    <div style="overflow-x:auto"><table class="rtable"><thead><tr><th></th><th>パフォーマンス</th><th>レート</th><th>変動</th></tr></thead><tbody>${rows}</tbody></table></div>
    ${perf.all != null ? `<p class="small">今回のパフォーマンス ${perf.all} は,TOEIC に換算すると <b>約 ${Math.max(10, Math.min(990, Rating.toeic(perf.all) + toeicOffset()))} 点</b>の出来です(目安).</p>` : `<p class="small muted">分野別の本番なので,${SERIES[c.kind]}レートだけが変動しました.</p>`}
    <p class="small muted">パフォーマンスは「今回の出来をレートに換算した値」です.レートはパフォーマンスの平均に近づいていきます(参加回数が少ないうちは低めに出ます).</p>
    <h2>各問題の解説</h2>${det}
    <div class="row" style="margin-top:20px"><button class="btn" id="again-btn">同じ種類でもう一度</button><button class="btn ghost" id="kinds-btn">種類を選ぶ</button><button class="btn ghost" data-go="record">記録を見る</button></div>`;
}

/* ---------------- 記録 ---------------- */
let chartKey = "all";
function renderRecord() {
  const m = $("#main"), sk = streaks();
  const H = {}; Object.keys(SERIES).forEach(k => H[k] = history(k));
  const rows = S.contests.slice().reverse().slice(0, 30).map(c => {
    const k = c.kind || "all", e = H[k].find(x => x.t === c.t);
    return `<tr><td>${new Date(c.t).toLocaleDateString("ja-JP")}</td><td>${CONTESTS[k].name}</td><td>${c.items.filter(x => x.ok).length}/${c.items.length}</td><td>${rateSpan(c.perf[k])}</td><td>${e ? rateSpan(e.rating) : ""}</td><td>${e && e.prev != null ? signed(e.rating - e.prev) : ""}</td></tr>`;
  }).join("");
  const scores = (S.scores || []).slice().sort((a, b) => b.t - a.t);
  const scoreRows = scores.map(x => { const e = Rating.toeicEstimate(allPerfs(x.t + DAY)); return `<tr><td>${new Date(x.t).toLocaleDateString("ja-JP")}</td><td><b>${x.score}</b></td><td>${e ? e.score : "-"}</td><td>${e ? signed(x.score - e.score) : ""}</td><td><button class="btn ghost sm danger" data-sdel="${x.t}">削除</button></td></tr>`; }).join("");
  const c = badgeCtx();
  const badges = BADGES.map(b => {
    const got = !!S.badges[b.id] || b.ok(c);
    return `<div class="badge${got ? " got" : ""}"><b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`;
  }).join("");
  // 苦手な定理:解いた回数が3回以上で,正答率の低い順
  const weak = Object.keys(THM).map(k => {
    let ac = 0, wa = 0;
    GRAM.forEach(q => { const r = q.t === k && S.res[q.id]; if (r) { ac += r.ac; wa += r.wa; } });
    return { k, n: ac + wa, rate: ac + wa ? ac / (ac + wa) : 1 };
  }).filter(x => x.n >= 3 && x.rate < 0.8).sort((a, b) => a.rate - b.rate || b.n - a.n).slice(0, 5);
  const weakHTML = weak.length ? `<div class="weak">${weak.map(x => `<div class="wrow"><span class="wn">${esc(THM[x.k].name)}</span><span class="small muted">正答率 ${Math.round(100 * x.rate)}%(${x.n}回)</span><button class="btn ghost sm" data-go="thm" data-thm="${x.k}">練習</button></div>`).join("")}</div>`
    : `<p class="muted small">文法を解いていくと,正答率の低い定理がここに出ます(3回以上解いた定理が対象).</p>`;
  m.innerHTML = `
    ${heroHTML()}
    ${toeicHTML()}
    <div class="ratings">${ratingCells()}</div>
    <div class="streak"><div><b>${sk.cur}</b><span>日連続</span></div><div><b>${sk.max}</b><span>最長連続</span></div><div><b>${sk.total}</b><span>学習日数</span></div></div>
    <h2>学習の記録(草)</h2>
    <div class="seg sm" role="group" aria-label="数える対象">${[["ac", "AC した数"], ["all", "解いた数"]].map(([k, v]) => `<button data-hm="${k}" aria-pressed="${hmKey === k}">${v}</button>`).join("")}</div>
    ${heatmapHTML()}
    <h2>難易度の推定</h2>
    ${estHTML()}
    <h2>目標の点数</h2>
    <div class="row sform"><input type="number" id="goal-v" class="search" min="10" max="990" step="5" value="${toeicGoal()}" inputmode="numeric"><button class="btn ghost" id="goal-set">変更する</button></div>
    <h2>実際の TOEIC の点数</h2>
    <p class="small muted">公式問題集や本番の点数を入れると,その日までの本番の出来と比べて,推定スコアを補正します(新しい記録ほど重く).</p>
    <div class="row sform"><input type="number" id="sc-score" class="search" min="10" max="990" step="5" placeholder="点数(10〜990)" inputmode="numeric"><input type="date" id="sc-date" class="search" value="${dateKey(Date.now())}"><button class="btn" id="sc-add">記録する</button></div>
    ${scoreRows ? `<div style="overflow-x:auto"><table><thead><tr><th>日付</th><th>実際</th><th>その時の推定</th><th>差</th><th></th></tr></thead><tbody>${scoreRows}</tbody></table></div>` : ""}
    <h2>苦手な定理</h2>
    ${weakHTML}
    <h2>レートの推移</h2>
    <div class="seg sm" role="group" aria-label="系列">${Object.keys(SERIES).map(k => `<button data-k="${k}" aria-pressed="${chartKey === k}">${SERIES[k]}</button>`).join("")}</div>
    <div class="chart" id="chart"></div>
    <h2>本番の履歴</h2>
    ${rows ? `<div style="overflow-x:auto"><table><thead><tr><th>日付</th><th>種類</th><th>正解</th><th>パフォーマンス</th><th>レート</th><th>変動</th></tr></thead><tbody>${rows}</tbody></table></div>`
           : `<p class="muted small">まだありません.まずは1回本番に挑戦して,今の位置を測りましょう.</p>`}
    <h2>実績 <span class="small muted">${BADGES.filter(b => S.badges[b.id] || b.ok(c)).length}/${BADGES.length}</span></h2>
    <div class="badges">${badges}</div>
    ${S.legacy ? `<p class="small muted" style="margin-top:16px">旧方式(Elo)の本番 ${S.legacy.history.length} 回分の記録は,レート計算方式の変更により新しいレートには含めていません.</p>` : ""}
    <h2>端末間の同期</h2>
    <div id="sync-box">${syncHTML()}</div>
    <h2>データの引き継ぎ</h2>
    <p class="small muted">進捗はこの端末のブラウザに保存されます.ログインしない場合は,書き出したファイルを別の端末で読み込むと,その端末の記録と合わせられます.</p>
    <div class="row"><button class="btn ghost" id="exp-btn">書き出す</button><label class="btn ghost" for="imp-file">読み込む</label><input type="file" id="imp-file" accept="application/json,.json" hidden></div>
    <h2>データの削除</h2>
    <p class="small muted">消したデータは元に戻せません.念のため,先に「書き出す」でバックアップを取っておくと安心です.</p>
    <div class="dels">${Object.entries(DELETE).map(([k, d]) => `<div class="del"><div><b>${d.name}</b><span class="small muted">${d.desc}</span></div><button class="btn ghost sm danger" data-del="${k}">削除</button></div>`).join("")}</div>`;
  m.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { chartKey = b.dataset.k; renderRecord(); });
  $("#exp-btn").onclick = exportData;
  m.querySelectorAll("[data-del]").forEach(b => b.onclick = () => deleteData(b.dataset.del));
  m.querySelectorAll("[data-hm]").forEach(b => b.onclick = () => { hmKey = b.dataset.hm; renderRecord(); });
  m.querySelectorAll(".hm i[data-day]").forEach(c => c.onclick = () => { const el = $("#hm-info"); if (el) el.textContent = c.getAttribute("aria-label"); });
  const est = $("#est-toggle");
  if (est) est.onchange = () => { S.prefs.estD = est.checked; save(); applyEstD(); renderRecord(); toast(est.checked ? "推定した難易度を使います." : "元の難易度に戻しました."); };
  m.querySelectorAll("[data-estq]").forEach(b => b.onclick = () => { const x = Q_BY.get(b.dataset.estq); startSolve(x.dom, x.dom === "reading" ? Q_PASSAGE.get(x.q.id).id : x.q.id, null, "", "record"); });
  $("#sc-add").onclick = () => {
    const v = Math.round(+$("#sc-score").value / 5) * 5, d = $("#sc-date").value;
    if (!(v >= 10 && v <= 990) || !d) { toast("点数(10〜990)と日付を入れてください."); return; }
    S.scores = (S.scores || []).concat({ t: new Date(d + "T12:00:00").getTime(), score: v }); save(); renderRecord();
    toast(`${v} 点を記録しました.`);
  };
  m.querySelectorAll("[data-sdel]").forEach(b => b.onclick = () => {
    if (!confirm("この点数の記録を削除しますか?")) return;
    S.scores = S.scores.filter(x => String(x.t) !== b.dataset.sdel);
    S.del = Object.assign({}, S.del, { scores: [...((S.del && S.del.scores) || []), +b.dataset.sdel] }); // 他の端末から復活させない
    save(); renderRecord();
  });
  $("#imp-file").onchange = e => { const f = e.target.files[0]; if (f) importData(f); };
  $("#goal-set").onclick = () => {
    const v = Math.round(+$("#goal-v").value / 5) * 5;
    if (!(v >= 10 && v <= 990)) { toast("10〜990 の点数を入れてください."); return; }
    S.goal = { v, t: Date.now() }; save(); renderRecord(); toast(`目標を ${v} 点にしました.`);
  };
  bindSync();
  bindGo();
  const box = $("#chart");
  box.dataset.w = box.clientWidth;
  drawChart(box, chartKey);
  if (chartRO) chartRO.observe(box);
}
/* 草:日ごとの AC 数(または解いた数)を色の濃さで並べる.列が週,行が曜日(日〜土).直近26週 */
let hmKey = "ac";
const HM_WEEKS = 26, HM_LV = [1, 5, 10, 20]; // 色の段階の境目(AtCoder Problems の草に近い区切り)
function heatmapHTML() {
  const src = hmKey === "ac" ? S.dayAc : S.days;
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const start = new Date(today.getTime() - ((HM_WEEKS - 1) * 7 + today.getDay()) * DAY);
  const cells = [], months = [];
  let total = 0, active = 0, best = 0;
  for (let w = 0; w < HM_WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const t = start.getTime() + (w * 7 + d) * DAY, k = dateKey(t), n = src[k] || 0;
      if (t > today.getTime()) { cells.push(`<i class="out"></i>`); continue; }
      total += n; if (n) active++; best = Math.max(best, n);
      const lv = HM_LV.filter(x => n >= x).length;
      const label = `${fmtDate(t)}(${"日月火水木金土"[d]}):${hmKey === "ac" ? "AC" : "解いた数"} ${n}${hmKey === "ac" ? "" : ` · AC ${S.dayAc[k] || 0}`}`;
      cells.push(`<i class="l${lv}" data-day="${k}" aria-label="${label}" title="${label}"></i>`);
      if (d === 0 && new Date(t).getDate() <= 7) months.push(`<span style="grid-column:${w + 1}">${new Date(t).getMonth() + 1}月</span>`);
    }
  }
  return `<div class="hmwrap"><div class="hmm" style="grid-template-columns:repeat(${HM_WEEKS},1fr)">${months.join("")}</div>
    <div class="hm" style="grid-template-columns:repeat(${HM_WEEKS},1fr)">${cells.join("")}</div>
    <div class="hmleg"><span class="small muted" id="hm-info">マスを押すと,その日の数が出ます.</span><span class="small muted">少 <i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> 多</span></div></div>
    <p class="small muted">直近${HM_WEEKS}週で ${total} ${hmKey === "ac" ? "AC" : "問"} · ${active} 日 · 1日の最高 ${best}.${hmKey === "ac" ? "色の濃さは 1 / 5 / 10 / 20 問以上." : ""}</p>`;
}
function estHTML() {
  const E = estimateD(), rows = [];
  for (const dom of Object.keys(DOMAINS)) {
    const x = E.dom[dom];
    if (!x.ok) { rows.push(`<p class="small muted">${DOMAINS[dom]}:最初の解答 ${x.n} 件(${MIN_ATT} 件たまると推定します).</p>`); continue; }
    rows.push(`<h3 class="esth">${DOMAINS[dom]} <span class="small muted">最初の解答 ${x.n} 件</span></h3>
      <div style="overflow-x:auto"><table class="estt"><thead><tr><th>色帯</th><th>問題</th><th>予想の正答率</th><th>実際</th><th></th></tr></thead><tbody>${x.bands.map(b => {
        const diff = b.act - b.exp, note = b.n < 10 ? `<span class="muted">少ない</span>` : diff <= -0.15 ? `<span class="down">見積もりより難しい</span>` : diff >= 0.15 ? `<span class="up">見積もりより易しい</span>` : "おおむね妥当";
        return `<tr><td><span class="dot" style="--rc:var(${b.t.color})"></span>${b.t.name}</td><td>${b.n}</td><td>${Math.round(100 * b.exp)}%</td><td>${Math.round(100 * b.act)}%</td><td class="small">${note}</td></tr>`;
      }).join("")}</tbody></table></div>`);
  }
  const G = E.dom.grammar.ok ? E.dom.grammar.groups.filter(g => Math.abs(g.shift) >= 50).sort((a, b) => Math.abs(b.shift) - Math.abs(a.shift)).slice(0, 8) : [];
  const thmList = G.length ? `<h3 class="esth">見積もりがずれている定理</h3><div class="weak">${G.map(g => `<div class="wrow"><span class="wn">${esc(THM[g.k].name)}</span><span class="small ${g.shift > 0 ? "down" : "up"}">${g.shift > 0 ? "+" : ""}${g.shift}(${g.shift > 0 ? "難しい" : "易しい"})</span><button class="btn ghost sm" data-go="thm" data-thm="${g.k}">練習</button></div>`).join("")}</div>` : "";
  const big = [...E.items].filter(([, e]) => E.dom[e.dom].ok && Math.abs(e.est - e.d0) >= 100).sort((a, b) => Math.abs(b[1].est - b[1].d0) - Math.abs(a[1].est - a[1].d0)).slice(0, 15);
  const name = id => { const { dom, q } = Q_BY.get(id); return dom === "word" ? `<span class="en">${esc(q.w)}</span>` : dom === "grammar" ? `G${id.slice(1)} ${esc(THM[q.t].name)}` : `${id.toUpperCase().replace("Q", " 問")}`; };
  const list = big.length ? `<h3 class="esth">見積もりと大きく違う問題</h3><div class="estlist">${big.map(([id, e]) => `<button class="chip" data-estq="${id}"><span class="dot" style="${rc(e.est)}"></span><span class="cl">${name(id)}</span><span class="cd">${e.d0} → <b>${e.est}</b> ${e.ok ? "AC" : "WA"}</span></button>`).join("")}</div>` : "";
  return `<p class="small muted">各問題の最初の解答と,その時点の実力から,問題の難易度を推定し直します(AtCoder Problems の difficulty と同じ考え方).1人分の解答なので,1問ごとの推定は d0 から少ししか動きません.色帯ごとの正答率の比較の方があてになります.</p>
    ${rows.join("")}${thmList}${list}
    <label class="estsw"><input type="checkbox" id="est-toggle" ${S.prefs.estD ? "checked" : ""}> 推定した難易度を使う <span class="small muted">(問題一覧の色・おまかせ・本番の出題とパフォーマンスに反映.いつでも戻せます)</span></label>`;
}
/* ---------------- 端末間の同期(js/sync.js,js/merge.js) ---------------- */
// js/sync.js から呼ばれる.同期の結果を反映するときも,もう一度手元と合わせる(通信中に解いた記録を消さないため)
window.App = {
  getState: () => S,
  applyState(m) {
    const next = Merge.merge(S, m);
    const txt = x => JSON.stringify(Merge.shareable(x));
    const forServer = txt(next) !== txt(m), forView = txt(next) !== txt(S);
    S = next; save(true);
    if (forServer && window.Sync) Sync.dirty(); // 通信中に増えた記録は,あとで送る
    if (forView) {
      D_EST = null; applyEstD(); checkBadges();
      if (!pState && !contestRunning()) render(); else renderHeader();
    }
  }
};
function syncHTML() {
  if (!window.Sync) return `<p class="small muted">同期の機能を読み込めませんでした.</p>`;
  const z = Sync.state();
  const msg = z.msg ? `<p class="small ${z.err ? "down" : "muted"}" role="status">${esc(z.msg)}</p>` : "";
  if (z.user) return `
    <p class="small" style="margin:0">ログイン中:<b>${esc(z.email || "(メールアドレスなし)")}</b></p>
    <p class="small muted" style="margin:2px 0 8px">${z.busy ? "同期しています…" : z.last ? `最後の同期:${new Date(z.last).toLocaleString("ja-JP")}` : "まだ同期していません."}</p>
    ${msg}
    <div class="row"><button class="btn" id="sync-now"${z.busy ? " disabled" : ""}>今すぐ同期</button><button class="btn ghost" id="sync-out">ログアウト</button></div>
    <details class="small" style="margin-top:10px"><summary>サーバーの記録を削除する</summary>
      <p class="muted">サーバーに保存した記録を消して,ログアウトします.この端末の記録は残ります.ほかの端末でログインしたままだと,その端末の記録がまた保存されます.</p>
      <button class="btn ghost sm danger" id="sync-del">サーバーの記録を削除してログアウト</button></details>`;
  return `
    <p class="small muted" style="margin-top:0">ログインすると,スマホと PC など複数の端末で記録を自動でそろえます.どちらの端末で解いた記録も消えません.ログインしなくても,今まで通りこの端末だけで使えます.</p>
    ${msg}
    <div class="row"><button class="btn" id="sync-google">Google でログイン</button></div>
    <div class="syncform">
      <input type="email" id="sync-email" class="search" placeholder="メールアドレス" autocomplete="email" value="${esc(z.email)}">
      <input type="password" id="sync-pw" class="search" placeholder="パスワード(6文字以上)" autocomplete="current-password">
      <div class="row"><button class="btn ghost" id="sync-in">ログイン</button><button class="btn ghost" id="sync-up">新規登録</button><button class="btn ghost sm" id="sync-reset">パスワードを忘れた</button></div>
    </div>
    <p class="small muted">ホーム画面に追加したアプリで Google のログインがうまくいかないときは,メールアドレスで登録してください.</p>
    <details class="small"><summary>保存するもの・しないもの</summary>
      <p class="muted">保存するのは,解いた問題と正誤,本番の記録,実績,目標と実際の点数です.名前やメールアドレスは記録に入れません(メールアドレスはログインだけに使います).記録はあなたしか読み書きできませんが,アプリの管理者(作者)はサーバーの管理画面から見ることができます.</p></details>`;
}
function bindSync() {
  const box = $("#sync-box"); if (!box || !window.Sync) return;
  const on = (id, f) => { const b = box.querySelector("#" + id); if (b) b.onclick = f; };
  const cred = () => [($("#sync-email") || {}).value || "", ($("#sync-pw") || {}).value || ""];
  on("sync-google", () => Sync.google());
  on("sync-in", () => { const [e, p] = cred(); Sync.signIn(e.trim(), p); });
  on("sync-up", () => { const [e, p] = cred(); if (confirm(`${e.trim()} で新しく登録します.よろしいですか?`)) Sync.signUp(e.trim(), p); });
  on("sync-reset", () => { const [e] = cred(); if (!e.trim()) { toast("メールアドレスを入れてから押してください."); return; } Sync.reset(e.trim()); });
  on("sync-now", async () => { if (await Sync.syncNow("button")) toast("同期しました."); });
  on("sync-out", () => { if (confirm("ログアウトしますか?この端末の記録はそのまま残ります.")) Sync.signOut(); });
  on("sync-del", async () => {
    if (!confirm("サーバーに保存した記録を削除して,ログアウトします.この端末の記録は残ります.よろしいですか?")) return;
    try { await Sync.deleteRemote(); await Sync.signOut(); toast("サーバーの記録を削除しました."); } catch (e) { toast("削除できませんでした.通信できる所でもう一度試してください."); }
  });
}
// 同期の状態が変わったら,記録画面の同期の欄だけ描き直す(入力中のメールアドレスは残す)
function onSyncChange() {
  const box = $("#sync-box"); if (!box) return;
  const email = ($("#sync-email") || {}).value, pw = ($("#sync-pw") || {}).value;
  box.innerHTML = syncHTML(); bindSync();
  if (email != null && $("#sync-email")) $("#sync-email").value = email;
  if (pw != null && $("#sync-pw")) $("#sync-pw").value = pw;
}

function exportData() {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" }));
  a.download = `eigo-judge-${dateKey(Date.now())}.json`;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
/* データの削除.レートは本番の記録から計算するので,本番の記録を消すとレートと推定スコアも消える */
const DELETE = {
  contests: { name: "本番の記録", desc: "本番の履歴を消します.レート・推定 TOEIC スコア・グラフも消えます.問題ごとの AC / WA と,実際の TOEIC の点数は残ります.",
    run: () => { S.contests = []; S.live = null; S.legacy = null; cState = null; S.wipe = Object.assign({}, S.wipe, { contests: Date.now() }); } },
  results: { name: "問題の結果", desc: "問題ごとの AC / WA,解答の履歴(草と難易度の推定に使う),単語の復習の予定,長文の所要時間を消します.すべて未挑戦に戻ります.レートは残ります.",
    run: () => { S.res = {}; S.srs = {}; S.readTimes = {}; S.att = []; S.dayAc = {}; D_EST = null; applyEstD(); S.wipe = Object.assign({}, S.wipe, { results: Date.now() }); } },
  all: { name: "すべてのデータ", desc: "本番の記録,問題の結果,学習日数,実績,設定をすべて消して,最初の状態に戻します.",
    run: () => { S = freshState(); S.wipe = { all: Date.now() }; cState = null; D_EST = null; applyEstD(); } }
};
function deleteData(k) {
  const d = DELETE[k];
  if (!confirm(`「${d.name}」を削除します.元に戻せません.よろしいですか?`)) return;
  if (k === "all" && !confirm("本当にすべてのデータを削除しますか?")) return;
  stopTimer(); pState = null;
  d.run();
  // 実績は今の状態から付け直す(消した記録で解除された実績が残らないように)
  if (k !== "all") { S.badges = {}; const c = badgeCtx(); BADGES.forEach(b => { if (b.ok(c)) S.badges[b.id] = Date.now(); }); }
  save(); render(); window.scrollTo(0, 0);
  toast(`「${esc(d.name)}」を削除しました.`);
}
function importData(file) {
  file.text().then(txt => {
    const o = JSON.parse(txt);
    if (!o || typeof o !== "object" || !(o.res || o.stats)) throw new Error("bad");
    if (!confirm("読み込んだデータを,今の記録に合わせます(どちらの記録も残ります).よろしいですか?")) return;
    stopTimer(); pState = null;
    S = migrate(Merge.merge(S, migrate(o))); D_EST = null; applyEstD(); checkBadges(); save(); render(); toast("読み込んで,今の記録と合わせました.");
  }).catch(() => toast("このファイルは読み込めませんでした."));
}

/* レートの推移グラフ(1系列.背景は色の帯,点はその時点の色) */
function drawChart(box, key) {
  const h = history(key);
  box.innerHTML = "";
  if (!h.length) { box.innerHTML = `<p class="muted small">本番を1回解くと,ここに日付ごとのレートが表示されます.</p>`; return; }
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.append(e); return e; };
  const W = Math.max(280, box.clientWidth), H = 240, M = { l: 40, r: 14, t: 10, b: 26 };
  const top = Math.max(800, Math.ceil((Math.max(...h.map(x => x.rating)) + 100) / 400) * 400);
  let t0 = h[0].t, t1 = h[h.length - 1].t;
  if (t1 - t0 < DAY) { t0 -= DAY / 2; t1 += DAY / 2; }
  const x = t => M.l + (t - t0) / (t1 - t0) * (W - M.l - M.r);
  const y = r => M.t + (1 - r / top) * (H - M.t - M.b);
  const svg = el("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", tabindex: "0",
    "aria-label": `${SERIES[key]}レートの推移.最新 ${h[h.length - 1].rating}.表は本番の履歴を参照` }, box);
  TIERS.forEach((t, i) => {
    const hi = Math.min(TIERS[i + 1] ? TIERS[i + 1].min : top, top);
    if (t.min >= top) return;
    el("rect", { x: M.l, y: y(hi), width: W - M.l - M.r, height: y(t.min) - y(hi), fill: `var(${t.color})`, "fill-opacity": 0.12 }, svg);
  });
  for (let r = 0; r <= top; r += 400) {
    el("line", { x1: M.l, x2: W - M.r, y1: y(r), y2: y(r), stroke: "var(--line)", "stroke-width": 1 }, svg);
    el("text", { x: M.l - 6, y: y(r) + 4, "text-anchor": "end", class: "ax" }, svg).textContent = r;
  }
  if (key === "all") { // 目標の目安(緑 = TOEIC 550点)
    el("line", { x1: M.l, x2: W - M.r, y1: y(800), y2: y(800), stroke: "var(--r-green)", "stroke-width": 1.5, "stroke-dasharray": "5 4" }, svg);
    el("text", { x: W - M.r - 4, y: y(800) - 5, "text-anchor": "end", class: "ax" }, svg).textContent = `TOEIC 550 の目安`;
  }
  const nt = Math.min(4, h.length);
  for (let i = 0; i < nt; i++) {
    const t = nt === 1 ? h[0].t : t0 + (t1 - t0) * i / (nt - 1);
    el("text", { x: x(t), y: H - 6, "text-anchor": i === 0 && nt > 1 ? "start" : i === nt - 1 && nt > 1 ? "end" : "middle", class: "ax" }, svg).textContent = fmtDate(t);
  }
  el("path", { d: h.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.rating).toFixed(1)}`).join(""), fill: "none", stroke: "var(--ink)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-opacity": 0.75 }, svg);
  const cross = el("line", { y1: M.t, y2: H - M.b, stroke: "var(--muted)", "stroke-width": 1, visibility: "hidden" }, svg);
  const dots = h.map(p => el("circle", { cx: x(p.t), cy: y(p.rating), r: 4.5, fill: `var(${tierOf(p.rating).color})`, stroke: "var(--surface)", "stroke-width": 2 }, svg));
  const tip = document.createElement("div"); tip.className = "tip"; tip.hidden = true; box.append(tip);
  let cur = -1;
  const show = i => {
    cur = i; const p = h[i], px = x(p.t);
    cross.setAttribute("x1", px); cross.setAttribute("x2", px); cross.setAttribute("visibility", "visible");
    dots.forEach((d, j) => d.setAttribute("r", j === i ? 6 : 4.5));
    tip.replaceChildren();
    const v = document.createElement("div"); v.className = "tv"; v.textContent = p.rating;
    const s1 = document.createElement("div"); s1.className = "small muted"; s1.textContent = `${new Date(p.t).toLocaleDateString("ja-JP")} · ${SERIES[key]}`;
    const s2 = document.createElement("div"); s2.className = "small"; s2.textContent = `パフォーマンス ${p.perf}` + (p.prev != null ? ` · ${p.rating - p.prev >= 0 ? "+" : ""}${p.rating - p.prev}` : "");
    tip.append(v, s1, s2); tip.hidden = false;
    const tw = tip.offsetWidth;
    tip.style.left = Math.min(Math.max(px - tw / 2, 0), W - tw) + "px";
    tip.style.top = Math.max(0, y(p.rating) - tip.offsetHeight - 12) + "px";
  };
  const hide = () => { cur = -1; cross.setAttribute("visibility", "hidden"); dots.forEach(d => d.setAttribute("r", 4.5)); tip.hidden = true; };
  const nearest = ev => {
    const r = svg.getBoundingClientRect(), mx = ev.clientX - r.left;
    let best = 0; h.forEach((p, i) => { if (Math.abs(x(p.t) - mx) < Math.abs(x(h[best].t) - mx)) best = i; });
    return best;
  };
  svg.addEventListener("pointermove", ev => show(nearest(ev)));
  svg.addEventListener("pointerdown", ev => show(nearest(ev)));
  svg.addEventListener("pointerleave", hide);
  svg.addEventListener("focus", () => show(h.length - 1));
  svg.addEventListener("blur", hide);
  svg.addEventListener("keydown", ev => {
    if (ev.key === "ArrowLeft" && cur > 0) { show(cur - 1); ev.preventDefault(); }
    if (ev.key === "ArrowRight" && cur < h.length - 1) { show(cur + 1); ev.preventDefault(); }
  });
}
// 幅が変わったら描き直す(端末の回転など)
const chartRO = typeof ResizeObserver === "function" ? new ResizeObserver(entries => {
  for (const e of entries) {
    const w = Math.round(e.contentRect.width);
    if (e.target.isConnected && w && w !== +e.target.dataset.w) { e.target.dataset.w = w; drawChart(e.target, chartKey); }
  }
}) : null;

/* ---------------- 定義集 ---------------- */
function defsHTML() {
  // 変化形: 元の形 → 単語中の表記の一覧
  const variants = {};
  WORDS.forEach(w => w.p.forEach(p => { if (p[2]) (variants[p[1] + p[2]] = variants[p[1] + p[2]] || new Set()).add(p[0]); }));
  const nameCell = (t, k) => `<td class="en"><b>${k}</b>${variants[t + k] ? `<br><span class="small muted">${[...variants[t + k]].join(", ")}</span>` : ""}</td>`;
  const roots = Object.keys(ROOT).map(r => {
    const ws = WORDS.filter(w => w.p.some(p => p[1] === "r" && partKey(p) === r));
    const learned = ws.filter(isLearned).length;
    return `<tr>${nameCell("r", r)}<td>${ROOT[r]}</td><td class="en">${ws.map(w => w.w).join(", ")}</td><td>${learned}/${ws.length}</td></tr>`;
  }).join("");
  const affix = Object.keys(AFFIX).map(a => `<tr>${nameCell("a", a)}<td>${AFFIX[a]}</td></tr>`).join("");
  const thm = Object.keys(THM).map(k => {
    const qs = GRAM.filter(q => q.t === k), ac = qs.filter(q => statusOf(q.id) === "AC").length;
    return `<details><summary><b>${THM[k].name}</b> <span class="small muted">AC ${ac}/${qs.length}</span></summary><div class="thm">${THM[k].s}</div><div class="small muted">前提の定義:${THM[k].def}</div>
      <p style="margin:10px 0 0"><button class="btn ghost sm" data-go="thm" data-thm="${k}">この定理の問題を解く(${qs.length}問)</button></p></details>`;
  }).join("");
  return `
  <h2 style="margin-top:0">語根(単語を導く定義)</h2>
  <p class="mode-note">習得は,2回以上続けて正解した単語の数です.小さい字は単語の中での変化形です.</p>
  <div style="overflow-x:auto"><table><thead><tr><th>語根</th><th>意味</th><th>導出される単語</th><th>習得</th></tr></thead><tbody>${roots}</tbody></table></div>
  <h2>接頭辞・接尾辞</h2>
  <table><tbody>${affix}</tbody></table>
  <h2>文法の定理</h2>
  ${thm}`;
}

/* ---------------- キーボード操作 ---------------- */
// 1〜4(または A〜D): 選択肢を選ぶ.本番では ← → で前後の問題へ移る.
document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
  if (e.target.closest && e.target.closest("svg")) return;
  const card = $("#qcard"); if (!card) return;
  const single = (view === "list" && pState && pState.dom !== "reading") || (view === "contest" && contestRunning() && !pendingNav && !cState.confirming);
  if (!single) return;
  // 5(または 0)は「わからない」
  const k = e.key.toLowerCase(), idx = "12345".indexOf(k) >= 0 ? "12345".indexOf(k) : k === "0" ? 4 : "abcd".indexOf(k);
  if (idx >= 0) {
    const b = card.querySelectorAll(".choice")[idx];
    if (b && !b.disabled) { e.preventDefault(); b.click(); }
  } else if (view === "contest" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    const b = $(e.key === "ArrowRight" ? "#next-btn" : "#prev-btn");
    if (b && !b.disabled) { e.preventDefault(); b.click(); }
  }
});

// ブラウザに保存データを消されにくくする(対応している環境のみ)
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* noop */ }
applyEstD();
restoreContest();
render();
if (window.Sync) { Sync.on(onSyncChange); Sync.start(); }
