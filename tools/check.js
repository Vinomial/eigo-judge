// 問題データの検査.使い方: node tools/check.js
// 問題を追加・修正したら実行し,エラーが 0 件であることを確かめる.
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["words.js", "grammar.js", "reading.js"]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "data", f), "utf8"), ctx, { filename: f });
}
const { AFFIX, ROOT, WORDS, THM, GRAM, READING } = ctx.window;

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

// 単語
const meanings = new Map();
for (const w of WORDS) {
  uniqueId(w.id, /^w\d+$/);
  dRange(w.id, w.d);
  for (const k of ["w", "m", "n", "ex", "ja"]) if (!w[k]) err(w.id, `${k} がない`);
  if (w.p.map(p => p[0]).join("") !== w.w) err(w.id, `部品をつなげても ${w.w} にならない (${w.p.map(p => p[0]).join("+")})`);
  if (w.p.filter(p => p[1] === "r").length !== 1) err(w.id, "語根はちょうど1つにする");
  for (const p of w.p) {
    const key = p[2] || p[0];
    if (p[1] === "r" && !ROOT[key]) err(w.id, `語根 ${key} が ROOT にない`);
    else if (p[1] === "a" && !AFFIX[key]) err(w.id, `接辞 ${key} が AFFIX にない`);
    else if (p[1] !== "r" && p[1] !== "a") err(w.id, `部品の種類 ${p[1]} が不正`);
  }
  if (meanings.has(w.m)) err(w.id, `意味 m が ${meanings.get(w.m)} と同じ(判定できない)`);
  meanings.set(w.m, w.id);
  // 例文で太字になる語(app.js と同じ規則)
  const m = w.ex.match(new RegExp("\\b(" + w.w.slice(0, -1) + "\\w*)", "i"));
  if (!m) err(w.id, "例文に単語が含まれていない");
  else if (!m[1].toLowerCase().startsWith(w.w.slice(0, Math.min(w.w.length, 4)).toLowerCase())) err(w.id, `例文で太字になる語が違う (${m[1]})`);
}
const used = { r: new Set(), a: new Set() };
WORDS.forEach(w => w.p.forEach(p => used[p[1]] && used[p[1]].add(p[2] || p[0])));
Object.keys(ROOT).forEach(k => { if (!used.r.has(k)) err(`ROOT.${k}`, "どの単語にも使われていない"); });
Object.keys(AFFIX).forEach(k => { if (!used.a.has(k)) err(`AFFIX.${k}`, "どの単語にも使われていない"); });

// 文法
for (const g of GRAM) {
  uniqueId(g.id, /^g\d+$/);
  dRange(g.id, g.d);
  if ((g.q.match(/____/g) || []).length !== 1) err(g.id, "空所 ____ はちょうど1つにする");
  if (!THM[g.t]) err(g.id, `定理 ${g.t} が THM にない`);
  choices4(g.id, g.c, g.a);
  if (!g.why || !g.ja) err(g.id, "why / ja がない");
}
Object.keys(THM).forEach(k => { if (!GRAM.some(g => g.t === k)) err(`THM.${k}`, "どの問題にも使われていない"); });

// 長文
for (const r of READING) {
  uniqueId(r.id, /^r\d+$/);
  if (!(r.target > 0)) err(r.id, "target がない");
  if (!r.ja) err(r.id, "ja がない");
  r.qs.forEach((q, k) => {
    uniqueId(q.id, new RegExp(`^${r.id}q${k + 1}$`));
    dRange(q.id, q.d);
    choices4(q.id, q.c, q.a);
    if (!q.ev.length || q.ev.some(i => !(Number.isInteger(i) && i >= 0 && i < r.s.length))) err(q.id, "根拠 ev の添字が不正");
    if (!q.why) err(q.id, "why がない");
  });
}

// 正解位置の偏り(参考)
const pos = [0, 0, 0, 0];
GRAM.forEach(g => pos[g.a]++);
READING.forEach(r => r.qs.forEach(q => pos[q.a]++));

console.log(`単語 ${WORDS.length} 語(語根 ${Object.keys(ROOT).length},接辞 ${Object.keys(AFFIX).length}) / 文法 ${GRAM.length} 問(定理 ${Object.keys(THM).length}) / 長文 ${READING.length} 題 ${READING.reduce((a, r) => a + r.qs.length, 0)} 問`);
console.log(`文法・長文の正解位置: A ${pos[0]} / B ${pos[1]} / C ${pos[2]} / D ${pos[3]}`);
if (errors.length) { console.log(`\nエラー ${errors.length} 件`); errors.forEach(e => console.log("  " + e)); process.exit(1); }
console.log("エラーなし");
