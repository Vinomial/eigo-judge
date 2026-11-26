"use strict";
/* 英語ジャッジ:共通:定数・小さな道具・問題の索引・問題ごとの状態・長文の描画・レート・学習日数・通知
 * 問題データは data/*.js が window に置く(WORDS, AFFIX, ROOT, THM, GRAM, READING).レート計算は js/rating.js.
 * 状態と保存は js/state.js,難易度の推定は js/estimate.js,実績は js/badges.js,出題は js/pick.js.
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

const DOMAINS = { word: "単語", grammar: "文法", reading: "長文" };
const SERIES = { all: "総合", word: "単語", grammar: "文法", reading: "長文" };
// 本番の種類.all は総合(全分野).分野別の本番はその分野のレートだけが動く
const CONTESTS = {
  all: { name: "総合", word: 4, grammar: 4, reading: 1, sec: 720, desc: "単語4問・文法4問・長文1題(3〜5問).12分" },
  word: { name: "単語", word: 12, sec: 300, desc: "単語12問.5分" },
  grammar: { name: "文法", grammar: 10, sec: 480, desc: "文法10問.8分" },
  reading: { name: "長文", reading: 2, sec: 900, desc: "長文2題(6〜10問).15分" },
  // ミニ模試:TOEIC のリーディング(Part 5 が30問・Part 6 が16問・Part 7 が54問・75分)の半分の配分
  mock: { name: "ミニ模試", p5: 15, p6: 2, p7: 27, sec: 2280, desc: "TOEIC と同じ配分の半分.Part 5 が15問・Part 6 が2題(8問)・Part 7 が27問.38分" }
};
// ミニ模試の中で,その問題がどの Part か(文法 = Part 5,長文の穴埋め = Part 6,それ以外の長文 = Part 7)
const partOf = it => (it.dom === "grammar" ? 5 : it.dom === "reading" ? (it.p.part6 ? 6 : 7) : 0);
const DAY = 86400000;
const GOAL = 20;        // 1日の目安の問題数
const TOEIC_GOAL_DEFAULT = 550; // 目標の TOEIC スコア(「記録」画面で変えられる.S.goal)
const toeicGoal = () => (S.goal && S.goal.v) || TOEIC_GOAL_DEFAULT;
const IDK = -1;         // 「わからない」を選んだときの sel(WA として扱う)
const { tierOf, TIERS } = Rating;
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
function rateHistory(key) {
  const perfs = [], out = [];
  for (const c of S.contests) {
    const p = c.perf[key];
    if (p == null) continue;
    perfs.push(p);
    out.push({ t: c.t, perf: p, rating: Rating.rating(perfs), prev: out.length ? out[out.length - 1].rating : null });
  }
  return out;
}
const ratingOf = key => { const h = rateHistory(key); return h.length ? h[h.length - 1].rating : null; };
const maxRating = key => Math.max(0, ...rateHistory(key).map(x => x.rating));
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
