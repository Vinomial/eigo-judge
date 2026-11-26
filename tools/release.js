// 公開の準備(npm run release).コミットと push は自分で行う.
//   1. index.html の ?v= の番号を,公開中(origin/main)より1つ上げる(もう上げてあればそのまま)
//   2. 更新履歴(data/changelog.js)に,公開中より新しい1件があるかを確かめる
//   3. 検査とテスト(npm test.lint を含む)を通す
// --no-test を付けると 3 を飛ばす.
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execSync, spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const HTML = path.join(ROOT, "index.html");
const fail = msg => { console.error("× " + msg); process.exit(1); };
const git = cmd => { try { return execSync("git " + cmd, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); } catch (e) { return null; } };

const verOf = html => { const m = html.match(/\?v=(\d+)/); return m ? +m[1] : 0; };
const logOf = src => { const c = { window: {} }; vm.runInNewContext(src, c); return c.window.CHANGELOG || []; };

git("fetch -q origin main");
const pubHtml = git("show origin/main:index.html"), pubLog = git("show origin/main:data/changelog.js");
if (pubHtml == null || pubLog == null) fail("公開中の版(origin/main)を読めません.git の設定を確かめてください.");

// 1. 番号
let html = fs.readFileSync(HTML, "utf8");
const pub = verOf(pubHtml), cur = verOf(html);
if (cur <= pub) {
  html = html.replace(/\?v=\d+/g, `?v=${pub + 1}`);
  fs.writeFileSync(HTML, html);
  console.log(`✓ ?v= を ${cur} から ${pub + 1} に上げました`);
} else console.log(`✓ ?v= は ${cur}(公開中は ${pub})`);

// 2. 更新履歴
const log = logOf(fs.readFileSync(path.join(ROOT, "data/changelog.js"), "utf8")), plog = logOf(pubLog);
const top = log[0], ptop = plog[0] || { id: 0 };
if (!top || top.id <= ptop.id) fail(`data/changelog.js に新しい1件を足してください(公開中の最新は id ${ptop.id}).利用者から見て変わったことを書きます.`);
if (log.some((e, i) => i && e.id >= log[i - 1].id)) fail("data/changelog.js の id が新しい順の連番になっていません.");
const today = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; })();
console.log(`✓ 更新履歴 id ${top.id}「${top.title}」${top.date === today ? "" : `(日付が ${top.date} です.今日は ${today})`}`);

// 3. 検査とテスト
if (!process.argv.includes("--no-test")) {
  for (const s of ["test"]) {
    console.log(`… npm run ${s}`);
    const r = spawnSync("npm", ["run", "-s", s], { cwd: ROOT, stdio: "inherit" });
    if (r.status !== 0) fail(`npm run ${s} が通りません.`);
  }
  console.log("✓ 検査とテストに合格");
}
console.log("\n公開の準備ができました.git commit して git push origin main すると,GitHub Actions のテストに通ったあと GitHub Pages に反映されます(4分ほど.gh run watch で見られます).");
console.log("同期・保存形式・規則を変えたときは npm run test:sync と npm run test:rules も通してください.");
