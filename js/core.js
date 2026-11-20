"use strict";
/* 英語ジャッジ:共通:定数・状態と保存・難易度の推定・レート・学習日数・実績・出題
 * 問題データは data/*.js が window に置く(WORDS, AFFIX, ROOT, THM, GRAM, READING).レート計算は js/rating.js.
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

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
  // owned: ショップで買ったテーマ { id: 買った時刻 }(js/theme.js.端末間で共有する)
  // wipe: 削除した時刻 { contests, results, all }.del.scores: 消した点数の時刻.goal: 目標の点数 { v, t }(端末間の同期で使う.js/merge.js)
  return { ver: 2, res: {}, srs: {}, contests: [], readTimes: {}, days: {}, badges: {}, prefs: {}, scores: [], att: [], dayAc: {}, live: null, legacy: null, updatedAt: 0, wipe: {}, del: {}, goal: null, owned: {} };
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
// 本文の枠(#scroller)の先頭に戻る.ページ全体はスクロールしない(index.html の .app を参照)
function toTop() { const el = document.getElementById("scroller"); if (el) el.scrollTop = 0; }
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
// 実績の判定に使う数.checkBadges のたびに作る(記録から数えるだけで,保存はしない)
const GRAM_BY_THM = (() => { const m = new Map(); GRAM.forEach(q => (m.get(q.t) || m.set(q.t, []).get(q.t)).push(q)); return m; })();
function badgeCtx() {
  const rq = READING.flatMap(p => p.qs), ac = id => statusOf(id) === "AC";
  const roots = Object.keys(ROOT).map(r => WORDS.filter(w => rootOf(w) === r));
  const passAC = READING.filter(p => p.qs.every(q => ac(q.id)));
  const hours = new Set(S.att.map(x => new Date(x[1]).getHours()));
  const dayVals = Object.values(S.days);
  const domRate = Object.keys(DOMAINS).map(k => maxRating(k));
  return {
    contests: S.contests.length,
    kinds: new Set(S.contests.map(c => c.kind || "all")).size,
    perfect: S.contests.some(c => c.items.length && c.items.every(x => x.ok)),
    near: S.contests.some(c => (c.kind || "all") === "all" && c.items.filter(x => x.ok).length >= c.items.length - 1),
    maxPerf: Math.max(0, ...S.contests.map(c => c.perf.all || 0)),
    maxDomPerf: Math.max(0, ...S.contests.flatMap(c => Object.keys(DOMAINS).map(k => c.perf[k] || 0))),
    maxAll: maxRating("all"),
    minDomRate: Math.min(...domRate),
    streak: streaks().max,
    days: Object.keys(S.days).length,
    goalDays: dayVals.filter(n => n >= GOAL).length,
    maxDay: Math.max(0, ...dayVals),
    solved: Math.max(S.att.length, dayVals.reduce((a, n) => a + n, 0)),
    learned: WORDS.filter(isLearned).length,
    wordAC: WORDS.filter(w => ac(w.id)).length,
    acTotal: [...WORDS, ...GRAM, ...rq].filter(q => ac(q.id)).length,
    gramAC: GRAM.filter(q => ac(q.id)).length,
    gramAll: GRAM.every(q => ac(q.id)),
    thmDone: [...GRAM_BY_THM.values()].filter(qs => qs.every(q => ac(q.id))).length,
    passDone: passAC.length,
    readAll: rq.every(q => ac(q.id)),
    p6Done: passAC.filter(p => p.part6).length,
    figDone: passAC.filter(p => p.s.some(b => typeof b !== "string" && b.t !== "doc")).length,
    hardAC: [...WORDS, ...GRAM, ...rq].filter(q => q.d0 >= 1600 && ac(q.id)).length,
    rootDone: roots.filter(ws => ws.length && ws.every(isLearned)).length,
    owned: Object.keys(S.owned || {}).length,
    earned: typeof coinsEarned === "function" ? coinsEarned() : 0,
    scores: (S.scores || []).length,
    night: [0, 1, 2, 3].some(h => hours.has(h)),
    morning: [5, 6].some(h => hours.has(h))
  };
}
/* 実績.id は保存に使うので変えない(解除した時刻は S.badges[id]).
 * p: c => [今の数, 目標](進み具合の表示と判定に使う).分類 cat ごとに記録の画面に並べる. */
const BADGE_CATS = ["本番", "レート", "継続", "問題数", "単語", "文法", "長文", "その他"];
const mkBadge = (id, cat, name, desc, p) => ({ id, cat, name, desc, p, ok: c => { const [x, n] = p(c); return x >= n; } });
const badgeN = (k, goal) => c => [c[k], goal];
const badgeYes = k => c => [c[k] ? 1 : 0, 1];
const BADGES = [
  mkBadge("c1", "本番", "初参加", "本番を1回解く", badgeN("contests", 1)),
  mkBadge("c3", "本番", "腕試し", "本番を3回解く", badgeN("contests", 3)),
  mkBadge("c10", "本番", "常連", "本番を10回解く", badgeN("contests", 10)),
  mkBadge("c30", "本番", "皆勤", "本番を30回解く", badgeN("contests", 30)),
  mkBadge("c50", "本番", "歴戦", "本番を50回解く", badgeN("contests", 50)),
  mkBadge("c100", "本番", "百戦錬磨", "本番を100回解く", badgeN("contests", 100)),
  mkBadge("kinds", "本番", "オールラウンダー", "4種類の本番(総合・単語・文法・長文)をすべて解く", badgeN("kinds", 4)),
  mkBadge("near", "本番", "あと一歩", "総合の本番で,間違いを1問以内にする", badgeYes("near")),
  mkBadge("perfect", "本番", "全完", "本番で全問正解する", badgeYes("perfect")),
  mkBadge("perf1000", "本番", "好パフォーマンス", "総合のパフォーマンス1000以上を出す", badgeN("maxPerf", 1000)),
  mkBadge("perf1500", "本番", "快進撃", "総合のパフォーマンス1500以上を出す", badgeN("maxPerf", 1500)),
  mkBadge("perf2000", "本番", "会心の出来", "総合のパフォーマンス2000以上を出す", badgeN("maxPerf", 2000)),
  mkBadge("dperf1600", "本番", "得意分野", "どれかの分野でパフォーマンス1600以上を出す", badgeN("maxDomPerf", 1600)),

  mkBadge("brown", "レート", "茶色", "総合レート400に到達する", badgeN("maxAll", 400)),
  mkBadge("green", "レート", "緑色", "総合レート800に到達する(TOEIC 550点の目安)", badgeN("maxAll", 800)),
  mkBadge("cyan", "レート", "水色", "総合レート1200に到達する", badgeN("maxAll", 1200)),
  mkBadge("blue", "レート", "青色", "総合レート1600に到達する", badgeN("maxAll", 1600)),
  mkBadge("yellow", "レート", "黄色", "総合レート2000に到達する", badgeN("maxAll", 2000)),
  mkBadge("orange", "レート", "橙色", "総合レート2400に到達する", badgeN("maxAll", 2400)),
  mkBadge("allbrown", "レート", "まんべんなく", "単語・文法・長文のレートをすべて400以上にする", badgeN("minDomRate", 400)),
  mkBadge("allgreen", "レート", "穴のない実力", "単語・文法・長文のレートをすべて800以上にする", badgeN("minDomRate", 800)),

  mkBadge("s3", "継続", "三日坊主卒業", "3日続けて学習する", badgeN("streak", 3)),
  mkBadge("s7", "継続", "1週間", "7日続けて学習する", badgeN("streak", 7)),
  mkBadge("s14", "継続", "2週間", "14日続けて学習する", badgeN("streak", 14)),
  mkBadge("s30", "継続", "習慣化", "30日続けて学習する", badgeN("streak", 30)),
  mkBadge("s60", "継続", "2か月", "60日続けて学習する", badgeN("streak", 60)),
  mkBadge("s100", "継続", "百日修行", "100日続けて学習する", badgeN("streak", 100)),
  mkBadge("d30", "継続", "学習30日", "学習した日が合計30日になる", badgeN("days", 30)),
  mkBadge("d100", "継続", "学習100日", "学習した日が合計100日になる", badgeN("days", 100)),
  mkBadge("goal1", "継続", "今日のノルマ", `1日に ${GOAL} 問以上解く`, badgeN("goalDays", 1)),
  mkBadge("goal10", "継続", "ノルマ10日", `${GOAL} 問以上解いた日が10日になる`, badgeN("goalDays", 10)),
  mkBadge("goal50", "継続", "ノルマ50日", `${GOAL} 問以上解いた日が50日になる`, badgeN("goalDays", 50)),
  mkBadge("day100", "継続", "猛特訓", "1日に100問以上解く", badgeN("maxDay", 100)),

  mkBadge("ac50", "問題数", "AC 50", "50問を AC の状態にする", badgeN("acTotal", 50)),
  mkBadge("ac200", "問題数", "AC 200", "200問を AC の状態にする", badgeN("acTotal", 200)),
  mkBadge("ac500", "問題数", "AC 500", "500問を AC の状態にする", badgeN("acTotal", 500)),
  mkBadge("ac1000", "問題数", "AC 1000", "1000問を AC の状態にする", badgeN("acTotal", 1000)),
  mkBadge("ac2000", "問題数", "AC 2000", "2000問を AC の状態にする", badgeN("acTotal", 2000)),
  mkBadge("n1000", "問題数", "千本ノック", "解いた問題が合計1000問になる(解き直しも数える)", badgeN("solved", 1000)),
  mkBadge("n5000", "問題数", "五千本ノック", "解いた問題が合計5000問になる", badgeN("solved", 5000)),
  mkBadge("hard10", "問題数", "難問に挑む", "難易度1600以上の問題を10問 AC にする", badgeN("hardAC", 10)),

  mkBadge("w100", "単語", "100語", "単語を100語習得する(2回以上続けて正解)", badgeN("learned", 100)),
  mkBadge("w300", "単語", "300語", "単語を300語習得する", badgeN("learned", 300)),
  mkBadge("w1000", "単語", "1000語", "単語を1000語習得する", badgeN("learned", 1000)),
  mkBadge("wac500", "単語", "語彙の土台", "単語を500語 AC の状態にする", badgeN("wordAC", 500)),
  mkBadge("root1", "単語", "語根制覇", "1つの語根の単語をすべて習得する", badgeN("rootDone", 1)),
  mkBadge("root10", "単語", "語根マスター", "10の語根の単語をすべて習得する", badgeN("rootDone", 10)),

  mkBadge("thm1", "文法", "定理を証明", "1つの定理の10問をすべて AC にする", badgeN("thmDone", 1)),
  mkBadge("thm10", "文法", "定理10個", "10の定理で,10問すべてを AC にする", badgeN("thmDone", 10)),
  mkBadge("thm30", "文法", "定理30個", "30の定理で,10問すべてを AC にする", badgeN("thmDone", 30)),
  mkBadge("g300", "文法", "文法300問", "文法を300問 AC の状態にする", badgeN("gramAC", 300)),
  mkBadge("gall", "文法", "文法全 AC", "文法の全問題を AC の状態にする", badgeYes("gramAll")),

  mkBadge("p1", "長文", "読み切った", "長文を1題,全問 AC にする", badgeN("passDone", 1)),
  mkBadge("p10", "長文", "長文10題", "長文を10題,全問 AC にする", badgeN("passDone", 10)),
  mkBadge("p50", "長文", "長文50題", "長文を50題,全問 AC にする", badgeN("passDone", 50)),
  mkBadge("part6", "長文", "穴埋め上手", "Part 6(長文の穴埋め)を1題,全問 AC にする", badgeN("p6Done", 1)),
  mkBadge("fig", "長文", "図表を読む", "表やグラフのある長文を3題,全問 AC にする", badgeN("figDone", 3)),
  mkBadge("rall", "長文", "長文全 AC", "長文の全設問を AC の状態にする", badgeYes("readAll")),

  mkBadge("shop1", "その他", "おしゃれ", "ショップでテーマを1つ買う", badgeN("owned", 1)),
  mkBadge("shop5", "その他", "コレクター", "ショップでテーマを5つ買う", badgeN("owned", 5)),
  mkBadge("coin500", "その他", "コイン長者", "コインを合計500枚ためる(使った分も数える)", badgeN("earned", 500)),
  mkBadge("score1", "その他", "答え合わせ", "実際の TOEIC の点数を記録する", badgeN("scores", 1)),
  mkBadge("night", "その他", "夜ふかし", "夜中(0時〜4時)に問題を解く", badgeYes("night")),
  mkBadge("morning", "その他", "早起き", "朝早く(5時〜7時)に問題を解く", badgeYes("morning"))
];
function checkBadges() {
  const c = badgeCtx(), fresh = BADGES.filter(b => !S.badges[b.id] && b.ok(c));
  if (!fresh.length) return;
  fresh.forEach(b => { S.badges[b.id] = Date.now(); });
  // 同時にいくつも解除したときは1枚の通知にまとめる(重なって画面を覆わないように)
  toast(fresh.length === 1 ? `<b>実績解除</b> ${esc(fresh[0].name)}<br><span class="small">${esc(fresh[0].desc)}</span>`
    : `<b>実績を ${fresh.length} 個解除</b><br><span class="small">${fresh.map(b => esc(b.name)).join(" · ")}</span>`);
  save();
}
// 通知は同時に2枚まで(古いものから消す).押すとすぐ消える
const TOAST_MAX = 2;
function toast(html) {
  const box = $("#toasts"), el = document.createElement("div");
  el.className = "toast"; el.innerHTML = html;
  const gone = () => { el.classList.add("out"); setTimeout(() => el.remove(), 400); };
  el.onclick = gone;
  box.append(el);
  const live = [...box.children].filter(x => !x.classList.contains("out"));
  live.slice(0, Math.max(0, live.length - TOAST_MAX)).forEach(x => x.click());
  setTimeout(gone, 3800);
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
// 意味の語句:かっこ書きを除き「・」で区切ったもの(「すぐに」「めったに〜ない」など,かなだけの意味の重なりを見つけるため)
const mTokens = m => m.replace(/[(\uFF08][^)\uFF09]*[)\uFF09]/g, "").split("・").map(x => x.trim()).filter(Boolean);
// 2つの意味が紛らわしいか:同じ漢字を含む,または同じ語句がある
function overlaps(a, b) {
  const s = new Set(a.match(KANJI) || []);
  if ((b.match(KANJI) || []).some(c => s.has(c))) return true;
  const t = new Set(mTokens(a));
  return mTokens(b).some(x => t.has(x));
}
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
