// 問題データの検査.使い方: node tools/check.js
// 問題を追加・修正したら実行し,エラーが 0 件であることを確かめる.
//   node tools/check.js --vocab   長文に出てくるのに単語データにない語を一覧する
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["words.js", "vocab.js", "grammar.js", "reading.js"]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "data", f), "utf8"), ctx, { filename: f });
}
const { AFFIX, ROOT, WORDS, THM, GRAM, READING, IRREG } = ctx.window;

const errors = [];
const err = (id, msg) => errors.push(`${id}: ${msg}`);
const dRange = (id, d) => { if (!(typeof d === "number" && d >= 100 && d <= 2000)) err(id, `難易度 d が不正 (${d})`); };
const ids = new Set();
const uniqueId = (id, re) => {
  if (!re.test(id)) err(id, `id の形式が不正 (${re})`);
  if (ids.has(id)) err(id, "id が重複");
  ids.add(id);
};
const choices4 = (id, c, a) => {
  if (!Array.isArray(c) || c.length !== 4) err(id, "選択肢は4つにする");
  else if (new Set(c).size !== 4) err(id, "選択肢が重複");
  if (!(Number.isInteger(a) && a >= 0 && a < (c || []).length)) err(id, `正解の添字 a が範囲外 (${a})`);
};
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// 単語(words.js: 語根から導く単語 w1…,vocab.js: 語根のない単語 v_…)
const meanings = new Map(), spellings = new Map();
for (const w of WORDS) {
  const plain = !w.p.length;
  uniqueId(w.id, plain ? /^v_[a-z_]+$/ : /^w\d+$/);
  dRange(w.id, w.d);
  for (const k of plain ? ["w", "m", "ex", "ja", "pos"] : ["w", "m", "n", "ex", "ja"]) if (!w[k]) err(w.id, `${k} がない`);
  if (plain) {
    if (!"vnadpx".includes(w.pos)) err(w.id, `品詞 pos が不正 (${w.pos})`);
  } else {
    if (w.p.map(p => p[0]).join("") !== w.w) err(w.id, `部品をつなげても ${w.w} にならない (${w.p.map(p => p[0]).join("+")})`);
    if (w.p.filter(p => p[1] === "r").length !== 1) err(w.id, "語根はちょうど1つにする");
    for (const p of w.p) {
      const key = p[2] || p[0];
      if (p[1] === "r" && !ROOT[key]) err(w.id, `語根 ${key} が ROOT にない`);
      else if (p[1] === "a" && !AFFIX[key]) err(w.id, `接辞 ${key} が AFFIX にない`);
      else if (p[1] !== "r" && p[1] !== "a") err(w.id, `部品の種類 ${p[1]} が不正`);
    }
  }
  if (spellings.has(w.w.toLowerCase())) err(w.id, `つづりが ${spellings.get(w.w.toLowerCase())} と同じ`);
  spellings.set(w.w.toLowerCase(), w.id);
  if (meanings.has(w.m)) err(w.id, `意味 m が ${meanings.get(w.m)} と同じ(判定できない)`);
  meanings.set(w.m, w.id);
  // 例文で太字になる語(app.js と同じ規則)
  const m = (w.ex || "").match(new RegExp("\\b(" + reEsc(w.w.slice(0, -1)) + "\\w*)", "i"));
  if (!m) err(w.id, "例文に単語が含まれていない");
  else if (!m[1].toLowerCase().startsWith(w.w.slice(0, Math.min(w.w.length, 4)).toLowerCase())) err(w.id, `例文で太字になる語が違う (${m[1]})`);
}
const used = { r: new Set(), a: new Set() };
WORDS.forEach(w => w.p.forEach(p => used[p[1]] && used[p[1]].add(p[2] || p[0])));
Object.keys(ROOT).forEach(k => { if (!used.r.has(k)) err(`ROOT.${k}`, "どの単語にも使われていない"); });
Object.keys(AFFIX).forEach(k => { if (!used.a.has(k)) err(`AFFIX.${k}`, "どの単語にも使われていない"); });

// 文法
const stems = new Map();
for (const g of GRAM) {
  uniqueId(g.id, /^g\d+$/);
  dRange(g.id, g.d);
  if ((g.q.match(/____/g) || []).length !== 1) err(g.id, "空所 ____ はちょうど1つにする");
  if (!THM[g.t]) err(g.id, `定理 ${g.t} が THM にない`);
  choices4(g.id, g.c, g.a);
  if (!g.why || !g.ja) err(g.id, "why / ja がない");
  if (stems.has(g.q)) err(g.id, `問題文が ${stems.get(g.q)} と同じ`);
  stems.set(g.q, g.id);
}
Object.keys(THM).forEach(k => { if (!GRAM.some(g => g.t === k)) err(`THM.${k}`, "どの問題にも使われていない"); });

// 長文(本文 s の要素は文か,表・グラフ・文書の見出しのブロック)
for (const r of READING) {
  uniqueId(r.id, /^r\d+$/);
  if (!(r.target > 0)) err(r.id, "target がない");
  if (!r.ja) err(r.id, "ja がない");
  r.s.forEach((b, i) => {
    if (typeof b === "string") return;
    if (b.t === "table") {
      if (!Array.isArray(b.rows) || !b.rows.length) err(r.id, `s[${i}] 表に rows がない`);
      else if (new Set([...(b.head ? [b.head] : []), ...b.rows].map(x => x.length)).size !== 1) err(r.id, `s[${i}] 表の列数がそろっていない`);
    } else if (b.t === "bar") {
      if (!Array.isArray(b.items) || b.items.some(x => typeof x[1] !== "number")) err(r.id, `s[${i}] グラフの items が不正`);
    } else if (b.t === "doc") {
      if (!b.title) err(r.id, `s[${i}] 文書の見出しに title がない`);
    } else err(r.id, `s[${i}] ブロックの種類 ${b.t} が不正`);
  });
  if (r.qs.length !== 3) err(r.id, "設問は3問にする(本番は長文1題3問)");
  r.qs.forEach((q, k) => {
    uniqueId(q.id, new RegExp(`^${r.id}q${k + 1}$`));
    dRange(q.id, q.d);
    choices4(q.id, q.c, q.a);
    if (!Array.isArray(q.ev) || !q.ev.length) err(q.id, "根拠 ev がない");
    else q.ev.forEach(e => {
      const [i, row] = Array.isArray(e) ? e : [e];
      const b = r.s[i];
      if (!Number.isInteger(i) || b == null) err(q.id, `根拠 ev の添字が不正 (${JSON.stringify(e)})`);
      else if (row != null && (typeof b === "string" || !(b.rows || b.items) || !(b.rows || b.items)[row])) err(q.id, `根拠 ev の行が不正 (${JSON.stringify(e)})`);
    });
    if (!q.why) err(q.id, "why がない");
  });
}

// 長文に出てくる語が単語データにあるか(参考.基本語と固有名詞は除く)
const basicFile = path.join(__dirname, "basic-words.txt");
const basic = new Set(fs.existsSync(basicFile) ? fs.readFileSync(basicFile, "utf8").split(/\s+/).filter(Boolean) : []);
const forms = new Set();
for (const w of WORDS) {
  const b = w.w.toLowerCase();
  (w.f || []).forEach(x => { forms.add(x); forms.add(x + "s"); });
  if (!/^[a-z-]+$/.test(b)) { b.split(/[^a-z]+/).forEach(x => forms.add(x)); continue; }
  [b, b + "s", b + "es", b + "d", b + "ed", b + "ing", b + "ly"].forEach(f => forms.add(f));
  if (b.endsWith("e")) forms.add(b.slice(0, -1) + "ing");
  if (/[^aeiou]y$/.test(b)) [b.slice(0, -1) + "ies", b.slice(0, -1) + "ied", b.slice(0, -1) + "ily"].forEach(f => forms.add(f));
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(b)) [b + b.slice(-1) + "ed", b + b.slice(-1) + "ing"].forEach(f => forms.add(f));
}
const baseOf = t => { // 基本語の変化形を元の形に戻す
  if (basic.has(t)) return t;
  for (const [re, to] of [[/ies$/, "y"], [/ied$/, "y"], [/ier$/, "y"], [/iest$/, "y"], [/ily$/, "y"], [/es$/, ""], [/s$/, ""], [/ed$/, ""], [/ed$/, "e"], [/d$/, ""], [/ing$/, ""], [/ing$/, "e"], [/er$/, ""], [/er$/, "e"], [/est$/, ""], [/est$/, "e"], [/ly$/, ""], [/(.)\1ed$/, "$1"], [/(.)\1ing$/, "$1"], [/(.)\1er$/, "$1"], [/(.)\1est$/, "$1"]]) {
    if (re.test(t) && basic.has(t.replace(re, to))) return t.replace(re, to);
  }
  return null;
};
const known = t => forms.has(t) || forms.has((IRREG || {})[t]) || baseOf(t) != null || basic.has((IRREG || {})[t]);
const missing = new Map();
for (const r of READING) {
  const texts = [];
  r.s.forEach(b => { if (typeof b === "string") texts.push(b); else if (b.t !== "doc") texts.push(...[b.cap || "", ...(b.head || []), ...(b.rows || b.items || []).flat()].map(String)); });
  r.qs.forEach(q => texts.push(q.q, ...q.c));
  for (const text of texts) {
    // 文頭以外で大文字から始まる語は固有名詞とみなす.文頭の語は小文字にして調べる
    const toks = text.match(/[A-Za-z]+(?:[-'’][A-Za-z]+)*/g) || [];
    toks.forEach((tok, i) => {
      tok = tok.replace(/n['’]t$/i, "").replace(/['’]\w+$/, ""); // don't → do,company's → company
      const cap = /^[A-Z]/.test(tok), t = tok.toLowerCase();
      if (t.length < 3 || (cap && i > 0) || /^[A-Z]+$/.test(tok)) return;
      const parts = t.includes("-") && !known(t) ? t.split("-") : [t];
      parts.forEach(x => { if (x.length >= 3 && !known(x)) missing.set(x, (missing.get(x) || new Set()).add(r.id)); });
    });
  }
}

// 集計(参考)
const pos = [0, 0, 0, 0];
GRAM.forEach(g => pos[g.a]++);
READING.forEach(r => r.qs.forEach(q => pos[q.a]++));
const bands = a => [0, 400, 800, 1200, 1600].map(m => a.filter(d => d >= m && d < m + 400).length).join(" / ");
const perThm = Object.keys(THM).map(k => GRAM.filter(g => g.t === k).length);
const plainN = WORDS.filter(w => !w.p.length).length;

console.log(`単語 ${WORDS.length} 語(語根から導く ${WORDS.length - plainN},語根なし ${plainN}.語根 ${Object.keys(ROOT).length},接辞 ${Object.keys(AFFIX).length}) / 文法 ${GRAM.length} 問(定理 ${Object.keys(THM).length}) / 長文 ${READING.length} 題 ${READING.reduce((a, r) => a + r.qs.length, 0)} 問(図表つき ${READING.filter(r => r.s.some(b => typeof b !== "string" && b.t !== "doc")).length} 題)`);
console.log(`難易度の分布(灰 / 茶 / 緑 / 水 / 青): 単語 ${bands(WORDS.map(w => w.d))} ・ 文法 ${bands(GRAM.map(g => g.d))} ・ 長文の設問 ${bands(READING.flatMap(r => r.qs.map(q => q.d)))}`);
console.log(`定理ごとの問題数: 最少 ${Math.min(...perThm)} / 最多 ${Math.max(...perThm)}`);
console.log(`文法・長文の正解位置: A ${pos[0]} / B ${pos[1]} / C ${pos[2]} / D ${pos[3]}`);
console.log(`長文に出てくるが単語データにない語: ${missing.size} 語${missing.size && !process.argv.includes("--vocab") ? "(--vocab で一覧)" : ""}`);
if (process.argv.includes("--vocab")) console.log([...missing].sort().map(([w, s]) => `${w}(${[...s].join(",")})`).join(" "));
if (errors.length) { console.log(`\nエラー ${errors.length} 件`); errors.forEach(e => console.log("  " + e)); process.exit(1); }
console.log("エラーなし");
