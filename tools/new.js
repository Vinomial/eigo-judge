// 問題を足すときのひな形を出す(npm run new -- 種類 …).出てきたものを data/ のファイルに貼り,中身を書く.
//   npm run new -- grammar T12 [問題数]     文法.次の id と,正解の位置(A〜D の少ない方から)を決めて出す
//   npm run new -- reading [part6|multi]    長文.次の id と設問の id(Part 6 は4問,3つの文書は5問,ほかは3問)
//   npm run new -- word 語 語 …             単語(語根のない語).収録済み・派生形・基本語を除いて V(...) を出す
//   npm run new -- thm                      定理.次の定理の番号と,既存の定理の名前の一覧(重ならないか確かめるため)
// 貼ったあとは node tools/check.js でエラー0件を確かめる.
"use strict";
const vm = require("vm"), fs = require("fs"), path = require("path");
const R = path.join(__dirname, "..");
const c = { window: {} }; vm.createContext(c);
for (const f of ["words", "vocab", "grammar", "reading"]) vm.runInContext(fs.readFileSync(path.join(R, "data", f + ".js"), "utf8"), c);
const { WORDS, IRREG, GRAM, THM, READING } = c.window;

const [kind, ...args] = process.argv.slice(2);
const nextNum = (ids, re) => Math.max(0, ...ids.map(id => { const m = id.match(re); return m ? +m[1] : 0; })) + 1;
// 正解の位置:文法・長文を合わせて,今いちばん少ない位置から順に
function answerSlots(n) {
  const cnt = [0, 0, 0, 0];
  [...GRAM, ...READING.flatMap(p => p.qs)].forEach(q => cnt[q.a]++);
  const out = [];
  for (let i = 0; i < n; i++) { const a = cnt.indexOf(Math.min(...cnt)); out.push(a); cnt[a]++; }
  return out;
}
const q4 = '"", "", "", ""';

if (kind === "grammar") {
  const t = args[0], n = +(args[1] || 10);
  if (!t || !THM[t]) {
    console.error(`定理を指定してください(例:npm run new -- grammar T12).今ある定理:${Object.keys(THM).join(" ")}`);
    console.error("新しい定理なら,先に npm run new -- thm で番号を出して THM に足します.");
    process.exit(1);
  }
  const have = GRAM.filter(q => q.t === t).length;
  if (have + n > 10) console.error(`注意:${t} には今 ${have} 問あります.1つの定理は10問にそろえます.`);
  let id = nextNum(GRAM.map(q => q.id), /^g(\d+)$/);
  console.log(`  // ${t}:${THM[t].name}`);
  answerSlots(n).forEach(a => {
    console.log(`  { id: "g${id++}", q: "____", c: [${q4}], a: ${a}, t: "${t}", d: 1000, why: "", ja: "", x: [${q4}] },  // 正解は ${"ABCD"[a]}(c[${a}])`);
  });
} else if (kind === "reading") {
  const type = args[0] || "", nq = type === "part6" ? 4 : type === "multi" ? 5 : 3;
  const id = nextNum(READING.map(p => p.id), /^r(\d+)$/), slots = answerSlots(nq);
  console.log(`  {
    id: "r${id}",${type === "part6" ? "\n    part6: true," : ""}
    kind: "${type === "part6" ? "メール(穴埋め)" : type === "multi" ? "複数の文書" : "お知らせ"}",
    title: "",
    target: ${type === "multi" ? 300 : 150},
    s: [
      ""${type === "multi" ? ',\n      { t: "doc", title: "" },\n      "",\n      { t: "doc", title: "" },\n      ""' : ""}${type === "part6" ? ',\n      "… [1] …",\n      "[2]",\n      "… [3] …",\n      "… [4] …"' : ""}
    ],
    ja: "",
    qs: [
${slots.map((a, k) => `      { id: "r${id}q${k + 1}", q: "${type === "part6" ? `(${k + 1})` : ""}", c: [${q4}], a: ${a}, d: 1000, ev: [0], why: "", x: [${q4}] }`).join(",\n")}
    ]
  },`);
  console.log(`  // 正解の位置:${slots.map(a => "ABCD"[a]).join(" ")}.ev は根拠の文の添字(表の行は [添字, 行]).`);
} else if (kind === "word") {
  if (!args.length) { console.error("単語を並べてください(例:npm run new -- word stapler look_up)"); process.exit(1); }
  const sp = new Set(WORDS.map(w => w.w.toLowerCase())), forms = new Map();
  WORDS.forEach(w => (w.f || []).forEach(f => forms.set(f.toLowerCase(), w.w)));
  Object.entries(IRREG || {}).forEach(([k, v]) => forms.set(k, v));
  const basic = new Set(fs.readFileSync(path.join(__dirname, "basic-words.txt"), "utf8").split(/\s+/));
  for (const raw of args) {
    const w = raw.replace(/_/g, " "), lw = w.toLowerCase();
    if (sp.has(lw)) { console.log(`    // ${w}:収録済み`); continue; }
    if (forms.has(lw)) { console.log(`    // ${w}:${forms.get(lw)} の派生形として登録済み`); continue; }
    const pos = w.includes(" ") ? "x" : "n";
    console.log(`    V("${w}", "${pos}", "", 500, "", ""),${basic.has(lw) ? "  // 基本語(tools/basic-words.txt).入れるなら灰色(d 100〜300)" : ""}`);
  }
  console.log("    // 品詞 v n a d p x・意味(全単語で重ならない)・難易度・例文(見出しと同じ形で)・訳・メモ・派生形");
} else if (kind === "thm") {
  const n = nextNum(Object.keys(THM), /^T(\d+)$/);
  console.log("今ある定理(重ならないか確かめる):");
  Object.entries(THM).forEach(([k, t]) => console.log(`  ${k} ${t.name}`));
  console.log(`\n  T${n}: { name: "", s: "", def: "" },`);
} else {
  console.log(fs.readFileSync(__filename, "utf8").split("\n").filter(l => l.startsWith("//")).join("\n"));
  process.exit(kind ? 1 : 0);
}
