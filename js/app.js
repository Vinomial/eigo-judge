"use strict";
/* 英語ジャッジ 本体
 * 問題データは data/*.js が window に置く(WORDS, AFFIX, ROOT, THM, GRAM, READING).
 * レート計算は js/rating.js(window.Rating).
 * 進捗はこの端末の localStorage に保存する.
 */

const DOMAINS = { word: "単語", grammar: "文法", reading: "長文" };
const SERIES = { all: "総合", word: "単語", grammar: "文法", reading: "長文" };
const CONTEST = { word: 4, grammar: 4, sec: 720 }; // 単語4問 + 文法4問 + 長文1題(3問),12分
const DAY = 86400000;
const GOAL = 20;        // 1日の目安の問題数
const TOEIC_GOAL = 550; // 目標の TOEIC スコア
const IDK = -1;         // 「わからない」を選んだときの sel(WA として扱う)
const { tierOf, TIERS } = Rating;

/* ---------------- 状態と保存 ---------------- */
// v2: res[id] = { ac, wa, last: "AC" | "WA", t }(表示する状態は最後の結果)
//     contests = [{ t, items: [{ id, dom, d, ok }], perf: { all, word, grammar, reading } }]
//     レートは contests から毎回計算する(保存しない)
const LS_KEY = "eigo-judge-v1";
function freshState() {
  // live: 解答中の本番(再読み込みやタブが閉じられても続きから再開・採点するため)
  return { ver: 2, res: {}, srs: {}, contests: [], readTimes: {}, days: {}, badges: {}, prefs: {}, live: null, legacy: null, updatedAt: 0 };
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
  return s;
}
let S = freshState();
try { const raw = localStorage.getItem(LS_KEY); if (raw) S = migrate(JSON.parse(raw)); } catch (e) { /* 保存領域が使えない環境では毎回初期状態 */ }
function save() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* noop */ }
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

/* 問題ごとの状態(最後の結果) */
function record(id, ok, t = Date.now()) {
  const r = S.res[id] || (S.res[id] = { ac: 0, wa: 0 });
  ok ? r.ac++ : r.wa++;
  r.last = ok ? "AC" : "WA"; r.t = t;
  const k = dateKey(t); S.days[k] = (S.days[k] || 0) + 1;
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
function wordChoices(q) {
  const picked = [];
  const ok = w => w.id !== q.id && !picked.includes(w) && [q, ...picked].every(x => !overlaps(x.m, w.m));
  const take = (pool, n) => { for (const w of shuffle(pool)) if (picked.length < n && ok(w)) picked.push(w); };
  // 同じ語根の単語を優先する(接辞の意味で見分ける練習になる)
  const root = rootOf(q), pos = posOf(q);
  if (root) take(WORDS.filter(w => rootOf(w) === root), 2);
  // 残りは品詞が同じで難易度の近い語から(品詞だけで消去できないようにする)
  take(WORDS.filter(w => posOf(w) === pos && Math.abs(w.d - q.d) <= 300), 3);
  take(WORDS.filter(w => posOf(w) === pos), 3);
  take(WORDS, 3);
  return shuffle([q.m, ...picked.map(w => w.m)]);
}
function newSt(item) { return { sel: null, choices: item.dom === "word" ? wordChoices(item.q) : null }; }
function isCorrect(item, st) {
  if (st.sel == null || st.sel < 0) return false; // 未解答・「わからない」は WA
  if (item.dom === "word") return st.choices[st.sel] === item.q.m;
  return st.sel === item.q.a;
}

/* ---------------- 画面の切り替え ---------------- */
let view = "home", pState = null, cState = null, timerId = null, pendingNav = null;
const LIST = Object.assign({ dom: "word", filter: "all", group: "d" }, S.prefs.list || {});
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
  if (r == null) return `<div class="hero"><div class="lab">総合レート</div><div class="big muted">-</div><p class="small muted" style="margin:4px 0 0">本番を1回解くと,レートがつきます.</p></div>`;
  const t = tierOf(r), next = TIERS.find(x => x.min > r);
  const pct = next ? Math.round(100 * (r - t.min) / (next.min - t.min)) : 100;
  return `<div class="hero" style="${rc(r)}">
    <div class="lab">総合レート · <b style="color:var(--rc)">${t.name}色 ${t.title}</b></div>
    <div class="big">${r}</div>
    ${next ? `<div class="nextbar"><span style="width:${pct}%"></span></div><div class="small muted">${next.name}色まであと ${next.min - r}</div>` : ""}
  </div>`;
}
// 推定 TOEIC スコア(総合のパフォーマンスから.参加回数が少ないうちは幅が広い)
const toeicEst = () => Rating.toeicEstimate(S.contests.map(c => c.perf.all).filter(x => x != null));
function toeicHTML() {
  const e = toeicEst(), goalPos = (100 * TOEIC_GOAL / 990).toFixed(1);
  if (!e) return `<div class="toeic"><div class="lab">推定 TOEIC スコア</div><div class="tv muted">-</div><div class="small muted">本番を1回解くと表示されます.</div></div>`;
  return `<div class="toeic">
    <div class="lab">推定 TOEIC スコア(目安)</div>
    <div class="tv">約 <b>${e.score}</b> 点 <span class="small muted">${e.lo}〜${e.hi} 点の範囲</span></div>
    <div class="tbar" role="img" aria-label="推定 ${e.score} 点.目標 ${TOEIC_GOAL} 点"><span class="range" style="left:${(100 * e.lo / 990).toFixed(1)}%;width:${(100 * (e.hi - e.lo) / 990).toFixed(1)}%"></span><span class="now" style="left:${(100 * e.score / 990).toFixed(1)}%"></span><span class="goal" style="left:${goalPos}%"></span></div>
    <div class="tscale"><span>10</span><span style="left:${goalPos}%">目標 ${TOEIC_GOAL}</span><span>990</span></div>
    <div class="small muted">${e.score >= TOEIC_GOAL ? `目標の ${TOEIC_GOAL} 点に届く出来です.` : `目標の ${TOEIC_GOAL} 点まで,あと約 ${TOEIC_GOAL - e.score} 点.`}本番 ${S.contests.length} 回の出来(単語・文法・長文)からの換算で,リスニングは測っていません.回数を重ねると範囲が狭まります.</div>
  </div>`;
}
function homeHTML() {
  const due = dueWords().length, sk = streaks(), wa = waQueue().length;
  const unseen = WORDS.filter(w => !S.srs[w.id]).length;
  const gLeft = GRAM.filter(q => statusOf(q.id) !== "AC").length, rLeft = READING.filter(p => passageStatus(p) !== "AC").length;
  const tile = (attrs, title, sub, cls = "") => `<button class="tile ${cls}" ${attrs}><b>${title}</b><span>${sub}</span></button>`;
  return `
  ${heroHTML()}
  ${toeicHTML()}
  <div class="ratings">${ratingCells()}</div>
  <div class="today">
    <div class="trow"><span><b>今日 ${sk.today}</b> / ${GOAL} 問</span><span class="small muted">${sk.cur} 日連続 · 学習 ${sk.total} 日</span></div>
    <div class="pbar"><span style="width:${Math.min(100, 100 * sk.today / GOAL).toFixed(0)}%"></span></div>
  </div>
  <h2>今日のメニュー</h2>
  <div class="tiles">
    ${tile('data-go="contest"', "本番に挑戦する", "11問・12分.レートが動く", "main")}
    ${tile('data-go="auto" data-dom="word"', "単語", due ? `復習 ${due} 語がたまっています` : unseen ? `新しい単語(残り ${unseen} 語)` : "おまかせで復習")}
    ${tile('data-go="auto" data-dom="grammar"', "文法", gLeft ? `おまかせ(未 AC ${gLeft} 問)` : "全問 AC.おまかせで復習")}
    ${tile('data-go="auto" data-dom="reading"', "長文", rLeft ? `おまかせ(未 AC ${rLeft} 題)` : "全題 AC.おまかせで復習")}
    ${wa ? tile('data-go="wa"', "WA を解き直す", `${wa} 問(古いものから${wa > 20 ? " 20 問" : ""})`, "warn") : ""}
  </div>
  <p class="small muted">練習ではレートは動きません.本番を解くとレートと推定スコアが変動します.</p>
  <h2>進捗(今 AC の問題)</h2>
  ${progressHTML()}`;
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
    ${dom === "word" ? `<input type="search" id="wsearch" class="search en" placeholder="単語を検索(つづり)" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="単語を検索">` : ""}
    <p class="mode-note">AC ${cnt("AC")} · WA ${cnt("WA")} · 未挑戦 ${all.length - cnt("AC") - cnt("WA")}(全 ${all.length}${dom === "reading" ? "題" : "問"}).最後に解いた結果を表示します.問題を押すと練習モードで解けます.${byThm ? "定理名を押すと,その定理の問題が開きます." : ""}</p>
    ${body}`;
  const savePref = () => { S.prefs.list = { dom: LIST.dom, filter: LIST.filter, group: LIST.group }; save(); };
  m.querySelectorAll("[data-dom]").forEach(b => b.onclick = () => { LIST.dom = b.dataset.dom; savePref(); renderList(); });
  m.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { LIST.filter = b.dataset.f; savePref(); renderList(); });
  m.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { LIST.group = b.dataset.g; savePref(); renderList(); });
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
  pState = { queue, dom, id, label: label || "", from: from || "list" };
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
// 1つの定理の問題を続けて解く(未 AC を先に,易しい順)
function startTheorem(k, from) {
  const qs = GRAM.filter(q => q.t === k).sort((a, b) => (statusOf(a.id) === "AC") - (statusOf(b.id) === "AC") || a.d - b.d);
  startSolve("grammar", qs[0].id, qs.map(q => q.id), THM[k].name, from);
}
function setupItem() {
  const { dom, id } = pState;
  pState.prev = unitStatus(dom, id); // 開いた時点の結果(解いた後も「前回」として表示する)
  if (dom === "reading") {
    const p = PASS_BY.get(id);
    Object.assign(pState, { passage: p, sts: p.qs.map(() => ({ sel: null })), start: Date.now(), done: false, st: null, item: { dom, p } });
  } else {
    const q = dom === "word" ? WORD_BY.get(id) : GRAM_BY.get(id);
    pState.item = { dom, q }; pState.st = newSt(pState.item); pState.done = false;
  }
}
function nextSolve() {
  stopTimer();
  const { dom, queue, id } = pState;
  if (queue) {
    const i = queuePos();
    if (i < 0 || i + 1 >= queue.length) { toast("最後まで解きました."); backToList(); return; }
    pState.dom = queue[i + 1].dom; pState.id = queue[i + 1].id;
  } else pState.id = autoPick(dom, id);
  setupItem(); render(); window.scrollTo(0, 0);
}
const queuePos = () => pState.queue.findIndex(x => x.dom === pState.dom && x.id === pState.id);
function backToList() { stopTimer(); const to = pState ? pState.from : "list"; pState = null; go(to); }
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
  m.innerHTML = solveTop() + `<p class="mode-note">練習モード:${pState.dom === "reading" ? "全問に答えて提出すると判定します" : "1問ごとにすぐ判定します"}.分からないときは「わからない」を選ぶと,当てずっぽうの AC を防げます.レートは動きません.</p><div class="card" id="qcard"></div>`;
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
  };
  if (st.done) { show(false); return; }
  bindChoices(card, st, () => {
    st.done = true;
    const ok = isCorrect(item, st);
    record(item.q.id, ok);
    if (item.dom === "word") updateSrs(item.q.id, ok);
    save(); show(true); checkBadges();
  });
}
function renderSolveReading() {
  const p = pState.passage, sts = pState.sts, card = $("#qcard");
  const done = pState.done;
  const evs = done ? p.qs.flatMap(q => q.ev) : [];
  card.innerHTML = `
    <div class="timebar"><span class="muted">${esc(p.kind)} · 目標 ${fmtSec(p.target)}</span><span class="timer" id="ptimer"></span></div>
    ${passageHTML(p, evs)}
    ${p.qs.map((q, k) => `<div class="rq" data-k="${k}">${metaHTML("reading", q.d)}<p class="qtext en">${k + 1}. ${esc(q.q)}</p>${choicesHTML(q.c, sts[k], true)}<div class="rres"></div></div>`).join("")}
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
    p.qs.forEach((q, k) => record(q.id, isCorrect({ dom: "reading", q }, sts[k])));
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
function choicesHTML(list, st, en) {
  // 最後の「わからない」は,当てずっぽうで AC にしないための選択肢(WA になる)
  return `<div class="choices">${list.map((c, i) => `<button class="choice${en ? " en" : ""}" data-i="${i}" aria-pressed="${st.sel === i}"><span class="key">${"ABCD"[i]}</span><span class="ct">${esc(c)}</span></button>`).join("")}
    <button class="choice idk" data-i="${IDK}" aria-pressed="${st.sel === IDK}"><span class="key">?</span>わからない</button></div>`;
}
function passageHTML(p, evs) {
  const ev = evMap(evs);
  return `<div class="passage en"><div class="ptitle">${esc(p.kind)}:${esc(p.title)}</div>${p.s.map((b, i) => blockHTML(b, ev.get(i))).join("")}</div>`;
}
const SPEAK = typeof window.speechSynthesis !== "undefined";
const speakBtn = text => (SPEAK ? `<button class="speak" data-say="${esc(text)}" aria-label="発音を聞く"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/></svg></button>` : "");
function itemHTML(item, st) {
  const q = item.q;
  if (item.dom === "word") {
    const ex = esc(q.ex).replace(new RegExp("\\b(" + q.w.slice(0, -1) + "\\w*)", "i"), "<b>$1</b>");
    return metaHTML("word", q.d) + `<p class="word en">${esc(q.w)}${speakBtn(q.w)}</p><p class="sentence en">${ex}</p><p class="small muted">この単語の意味は?</p>` + choicesHTML(st.choices, st, false);
  }
  if (item.dom === "grammar") {
    return metaHTML("grammar", q.d) + `<p class="sentence en">${esc(q.q).replace("____", '<span class="blank">&nbsp;</span>')}</p>` + choicesHTML(q.c, st, true);
  }
  return metaHTML("reading", q.d) + passageHTML(item.p) + `<p class="qtext en"><b>${esc(q.q)}</b></p>` + choicesHTML(q.c, st, true);
}
function editorialHTML(item) {
  const q = item.q;
  if (item.dom === "word") {
    const root = rootOf(q);
    if (!root) { // 語根から導けない単語:意味と覚え方のメモを示す
      return `<div class="editorial"><h3>意味</h3><p class="derive"><b>${esc(q.m)}</b> <span class="small muted">${POS[posOf(q)] || ""}</span></p>${q.n ? `<p>${q.n}</p>` : ""}
        <h3>例文の訳</h3><p>${q.ja}</p></div>`;
    }
    const chain = q.p.map(partHTML).join(" + ");
    const sib = WORDS.filter(w => w.id !== q.id && rootOf(w) === root).map(w => `${w.w}(${w.m})`).join(", ");
    return `<div class="editorial"><h3>導出</h3><p class="derive">${chain} → <b>${q.m}</b></p><p>${q.n}</p>
      <h3>例文の訳</h3><p>${q.ja}</p>${sib ? `<h3>同じ語根から導ける単語</h3><p class="en">${esc(sib)}</p>` : ""}</div>`;
  }
  if (item.dom === "grammar") {
    const t = THM[q.t];
    return `<div class="editorial"><h3>使う定理:${t.name}</h3><div class="thm">${t.s}</div>
      <p class="small muted">前提の定義:${t.def}</p><h3>この問題では</h3><p>${q.why}</p><h3>訳</h3><p>${q.ja}</p></div>`;
  }
  const evText = q.ev.map(e => {
    const b = item.p.s[evKey(e)];
    if (typeof b === "string") return `<p class="en"><span class="ev" style="background:var(--hl)">${esc(b)}</span></p>`;
    // 図表が根拠のとき:行の指定があればその行だけを抜き出して示す
    const sub = !Array.isArray(e) ? b : Object.assign({}, b, b.t === "table" ? { rows: [b.rows[e[1]]] } : { items: [b.items[e[1]]] });
    return `<div class="en evfig">${blockHTML(sub)}</div>`;
  }).join("");
  return `<div class="editorial"><h3>根拠</h3>${evText}<h3>解き方</h3><p>${q.why}</p></div>`;
}
function markChoices(root, item, st) {
  root.querySelectorAll(".choice").forEach(b => {
    const i = +b.dataset.i;
    b.disabled = true;
    const right = i >= 0 && (item.dom === "word" ? st.choices[i] === item.q.m : i === item.q.a);
    if (right) b.classList.add("right"); else if (i === st.sel) b.classList.add("wrong");
    // 単語:判定後,各選択肢がどの単語の意味かを示す(誤答の選択肢もついでに覚えられる)
    const w = item.dom === "word" && i >= 0 && WORD_BY_M.get(st.choices[i]);
    if (w && !b.querySelector(".cw")) b.insertAdjacentHTML("beforeend", choiceWordHTML(w, w.id !== item.q.id));
  });
}
// badge: その単語の今の状態(AC / WA)を付けるか.今解いた単語には付けない
function choiceWordHTML(w, badge) {
  const s = badge && statusOf(w.id);
  return `<span class="cw"><b class="en">${esc(w.w)}</b>${s ? ` <span class="verdict ${s.toLowerCase()} xs">${s}</span>` : ""}</span>`;
}
// 本番の結果など,選択肢を表示しない画面で使う一覧
function choiceWordsHTML(item, st) {
  return `<div class="cwlist">${st.choices.map((m, i) => {
    const w = WORD_BY_M.get(m), cls = m === item.q.m ? " right" : i === st.sel ? " wrong" : "";
    return `<div class="cwrow${cls}"><b class="en">${esc(w ? w.w : "")}</b><span>${esc(m)}</span></div>`;
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
function startContest() {
  // 最近3回の本番に出た問題と,今 AC の問題を避ける
  const recent = new Set(S.contests.slice(-3).flatMap(c => c.items.map(x => x.id)));
  const pen = id => (recent.has(id) ? 400 : 0) + (statusOf(id) === "AC" ? 150 : 0);
  const passages = READING.map(p => ({ id: p.id, d: passageD(p) }));
  const pp = pickNear(passages, estimate("reading"), 1, u => (p => (p.qs.some(q => recent.has(q.id)) ? 400 : 0) + (passageStatus(p) === "AC" ? 150 : 0))(PASS_BY.get(u.id)))[0];
  const p = PASS_BY.get(pp.id);
  const items = [
    ...pickNear(WORDS, estimate("word"), CONTEST.word, q => pen(q.id)).map(q => ({ dom: "word", q })),
    ...pickNear(GRAM, estimate("grammar"), CONTEST.grammar, q => pen(q.id)).map(q => ({ dom: "grammar", q })),
    ...p.qs.map(q => ({ dom: "reading", q, p }))
  ];
  cState = { items, sts: items.map(newSt), i: 0, end: Date.now() + CONTEST.sec * 1000, done: false, confirming: false };
  stopTimer(); timerId = setInterval(contestTick, 1000);
  persistContest();
  renderContest();
}
function persistContest() {
  S.live = contestRunning() ? {
    items: cState.items.map(it => ({ dom: it.dom, id: it.q.id })),
    sts: cState.sts.map(s => ({ sel: s.sel, choices: s.choices })),
    i: cState.i, end: cState.end
  } : null;
  save();
}
// 起動時:途中の本番があれば再開する.時間切れなら採点する
const Q_PASSAGE = new Map(READING.flatMap(p => p.qs.map(q => [q.id, p])));
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
    cState = { items, sts: L.sts.map(s => ({ sel: s.sel, choices: s.choices })), i: L.i || 0, end: L.end, done: false, confirming: false };
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
  const perf = { all: Rating.performance(items) };
  Object.keys(DOMAINS).forEach(k => perf[k] = Rating.performance(items.filter(x => x.dom === k)));
  items.forEach(x => { record(x.id, !!x.ok, t); if (x.dom === "word") updateSrs(x.id, !!x.ok); });
  S.contests.push({ t, items, perf });
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
      <div class="card">
        <p style="margin-top:0"><b>本番モード</b>:11問・制限時間12分.単語4問,文法4問,長文1題(3問)を,今の実力に近い難易度から出題します.</p>
        <p class="small muted">解答中は正誤を表示しません.「わからない」を選ぶと WA になりますが,当てずっぽうより正確に実力を測れます.終了後にまとめて判定し,パフォーマンス(今回の出来)を計算してレートを更新します.時間切れになるとその時点で採点します.</p>
        <button class="btn" id="start-btn">開始する</button>
      </div>`;
    $("#start-btn").onclick = startContest;
    return;
  }
  if (cState.done) {
    m.innerHTML = contestResultHTML();
    $("#again-btn").onclick = () => { cState = null; renderContest(); };
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
      <span>${i + 1} / ${n}問目 <span class="small muted" id="left-count">(未解答 ${left})</span></span>
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
  const promos = Object.keys(SERIES).filter(k => after[k] != null && tierOf(after[k]).min > tierOf(before[k] || 0).min);
  const promoHTML = promos.map(k => { const t = tierOf(after[k]); return `<div class="promo" style="${rc(after[k])}"><b>昇格!</b> ${SERIES[k]}が<b>${t.name}色(${t.title})</b>になりました</div>`; }).join("");
  const rows = Object.keys(SERIES).map(k => {
    const b = before[k], a = after[k];
    return `<tr${k === "all" ? ' class="strong"' : ""}><td>${SERIES[k]}</td><td>${rateSpan(perf[k])}</td><td>${b == null ? `<span class="muted small">初参加</span>` : rateSpan(b)} → ${rateSpan(a)}</td><td>${b == null ? "" : signed(a - b)}</td></tr>`;
  }).join("");
  const shown = new Set();
  const det = c.items.map((item, i) => {
    const st = c.sts[i], ok = c.res[i], q = item.q;
    let title, yours, ans, extra = "";
    if (item.dom === "word") {
      title = `<span class="en">${q.w}</span>`;
      yours = st.sel == null ? "未解答" : st.sel < 0 ? "わからない" : esc(st.choices[st.sel]);
      ans = esc(q.m);
      extra = `<p class="small muted" style="margin:8px 0 0">選択肢の単語</p>` + choiceWordsHTML(item, st);
    } else {
      title = `<span class="en">${esc(q.q)}</span>`;
      yours = st.sel == null ? "未解答" : st.sel < 0 ? "わからない" : `<span class="en">${esc(q.c[st.sel])}</span>`;
      ans = `<span class="en">${esc(q.c[q.a])}</span>`;
      if (item.dom === "reading" && !shown.has(item.p.id)) {
        shown.add(item.p.id);
        extra = passageHTML(item.p, item.p.qs.flatMap(x => x.ev)) + `<p class="small muted">本文の訳:${item.p.ja}</p>` + passageVocabHTML(item.p);
      }
    }
    return `<details><summary><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span> ${i + 1}. ${DOMAINS[item.dom]}:${title}</summary>
      ${extra}<p class="small">あなたの解答:${yours}<br>正解:${ans}</p>${editorialHTML(item)}</details>`;
  }).join("");
  return `${promoHTML}
    <p style="margin-top:0"><b>結果:${score} / ${c.items.length} 問正解</b></p>
    <div style="overflow-x:auto"><table class="rtable"><thead><tr><th></th><th>パフォーマンス</th><th>レート</th><th>変動</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="small">今回のパフォーマンス ${perf.all} は,TOEIC に換算すると <b>約 ${Rating.toeic(perf.all)} 点</b>の出来です(目安).</p>
    <p class="small muted">パフォーマンスは「今回の出来をレートに換算した値」です.レートはパフォーマンスの平均に近づいていきます(参加回数が少ないうちは低めに出ます).</p>
    <h2>各問題の解説</h2>${det}
    <div class="row" style="margin-top:20px"><button class="btn" id="again-btn">もう一度挑戦する</button><button class="btn ghost" data-go="record">記録を見る</button></div>`;
}

/* ---------------- 記録 ---------------- */
let chartKey = "all";
function renderRecord() {
  const m = $("#main"), sk = streaks();
  const h = history("all");
  const rows = S.contests.map((c, i) => ({ c, i })).reverse().slice(0, 30).map(({ c }) => {
    const e = h.find(x => x.t === c.t);
    return `<tr><td>${new Date(c.t).toLocaleDateString("ja-JP")}</td><td>${c.items.filter(x => x.ok).length}/${c.items.length}</td><td>${rateSpan(c.perf.all)}</td><td>${e ? rateSpan(e.rating) : ""}</td><td>${e && e.prev != null ? signed(e.rating - e.prev) : ""}</td></tr>`;
  }).join("");
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
    <h2>苦手な定理</h2>
    ${weakHTML}
    <h2>レートの推移</h2>
    <div class="seg sm" role="group" aria-label="系列">${Object.keys(SERIES).map(k => `<button data-k="${k}" aria-pressed="${chartKey === k}">${SERIES[k]}</button>`).join("")}</div>
    <div class="chart" id="chart"></div>
    <h2>本番の履歴</h2>
    ${rows ? `<div style="overflow-x:auto"><table><thead><tr><th>日付</th><th>正解</th><th>パフォーマンス</th><th>総合レート</th><th>変動</th></tr></thead><tbody>${rows}</tbody></table></div>`
           : `<p class="muted small">まだありません.まずは1回本番に挑戦して,今の位置を測りましょう.</p>`}
    <h2>実績 <span class="small muted">${BADGES.filter(b => S.badges[b.id] || b.ok(c)).length}/${BADGES.length}</span></h2>
    <div class="badges">${badges}</div>
    ${S.legacy ? `<p class="small muted" style="margin-top:16px">旧方式(Elo)の本番 ${S.legacy.history.length} 回分の記録は,レート計算方式の変更により新しいレートには含めていません.</p>` : ""}
    <h2>データの引き継ぎ</h2>
    <p class="small muted">進捗はこの端末のブラウザに保存されます.別の端末に移すときは,書き出したファイルを移した先で読み込んでください.</p>
    <div class="row"><button class="btn ghost" id="exp-btn">書き出す</button><label class="btn ghost" for="imp-file">読み込む</label><input type="file" id="imp-file" accept="application/json,.json" hidden></div>
    <h2>データの削除</h2>
    <p class="small muted">消したデータは元に戻せません.念のため,先に「書き出す」でバックアップを取っておくと安心です.</p>
    <div class="dels">${Object.entries(DELETE).map(([k, d]) => `<div class="del"><div><b>${d.name}</b><span class="small muted">${d.desc}</span></div><button class="btn ghost sm danger" data-del="${k}">削除</button></div>`).join("")}</div>`;
  m.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { chartKey = b.dataset.k; renderRecord(); });
  $("#exp-btn").onclick = exportData;
  m.querySelectorAll("[data-del]").forEach(b => b.onclick = () => deleteData(b.dataset.del));
  $("#imp-file").onchange = e => { const f = e.target.files[0]; if (f) importData(f); };
  bindGo();
  const box = $("#chart");
  box.dataset.w = box.clientWidth;
  drawChart(box, chartKey);
  if (chartRO) chartRO.observe(box);
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
  contests: { name: "本番の記録", desc: "本番の履歴を消します.レート・推定 TOEIC スコア・グラフも消えます.問題ごとの AC / WA は残ります.",
    run: () => { S.contests = []; S.live = null; S.legacy = null; cState = null; } },
  results: { name: "問題の結果", desc: "問題ごとの AC / WA,単語の復習の予定,長文の所要時間を消します.すべて未挑戦に戻ります.レートは残ります.",
    run: () => { S.res = {}; S.srs = {}; S.readTimes = {}; } },
  all: { name: "すべてのデータ", desc: "本番の記録,問題の結果,学習日数,実績,設定をすべて消して,最初の状態に戻します.",
    run: () => { S = freshState(); cState = null; } }
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
    if (!confirm("今の進捗を,読み込んだデータで置き換えます.よろしいですか?")) return;
    stopTimer(); cState = null; pState = null;
    S = migrate(o); S.live = null; save(); render(); toast("読み込みました.");
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
    el("text", { x: W - M.r - 4, y: y(800) - 5, "text-anchor": "end", class: "ax" }, svg).textContent = `TOEIC ${TOEIC_GOAL} の目安`;
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
restoreContest();
render();
