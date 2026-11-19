// 単語を足す前に,候補が収録済みかを調べる.
// 使い方: node tools/find-words.js 語 語 ...   (複数語の熟語は look_forward_to のように _ でつなぐ)
//   未収録 … 足してよい語
//   派生形 … 別の単語の派生形・語形として登録済み(IRREG や V の派生形).足すと重複するので足さない
//   基本語 … tools/basic-words.txt にある語(中学程度・カタカナ語).単語の問題にはしない
"use strict";
const vm = require("vm"), fs = require("fs"), path = require("path");
const R = path.join(__dirname, "..");
const c = { window: {} }; vm.createContext(c);
for (const f of ["words", "vocab"]) vm.runInContext(fs.readFileSync(path.join(R, "data", f + ".js"), "utf8"), c);
const { WORDS, IRREG } = c.window;
const sp = new Set(WORDS.map(w => w.w.toLowerCase()));
const forms = new Map();
WORDS.forEach(w => (w.f || []).forEach(f => forms.set(f.toLowerCase(), w.w)));
Object.entries(IRREG || {}).forEach(([k, v]) => forms.set(k, v));
const basic = new Set(fs.readFileSync(path.join(__dirname, "basic-words.txt"), "utf8").split(/\s+/));
const miss = [], form = [], bas = [], have = [];
for (const raw of process.argv.slice(2)) {
  const w = raw.replace(/_/g, " ").toLowerCase();
  if (sp.has(w)) have.push(w);
  else if (forms.has(w)) form.push(`${w}→${forms.get(w)}`);
  else if (basic.has(w)) bas.push(w);
  else miss.push(w);
}
console.log(`未収録 ${miss.length}: ${miss.join(", ")}`);
console.log(`収録済み ${have.length}: ${have.join(", ")}`);
console.log(`派生形 ${form.length}: ${form.join(", ")}`);
console.log(`基本語 ${bas.length}: ${bas.join(", ")}`);
