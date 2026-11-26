// 画面のテスト(ヘッドレスの Chromium で実際に操作する).使い方: npm run test:ui(または node tools/test-ui.js)
//   node tools/test-ui.js 単語 ショップ   … 名前にどれかの語を含むテストだけを動かす
// テストは tools/ui/ に画面ごとに置く(ファイルを足せば自動で読み込む).共通の道具は tools/ui/helpers.js.
// 画面や操作を変えたら必ず通す.新しい機能を足したら,ここにもテストを足す.不具合を直したら,それを見つけられるテストを足す.
"use strict";
const fs = require("fs");
const path = require("path");
const { serve, launch, suite } = require("./browser");
const { setCtx } = require("./ui/helpers");

const words = process.argv.slice(2);
const T = suite("画面のテスト" + (words.length ? `(${words.join(" / ")} を含むもの)` : ""));
const only = { test: (name, fn) => { if (!words.length || words.some(w => name.includes(w))) T.test(name, fn); } };
const dir = path.join(__dirname, "ui");
for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js") && f !== "helpers.js").sort()) require(path.join(dir, f))(only);

(async () => {
  const srv = await serve();
  const browser = await launch();
  setCtx({ browser, url: srv.url });
  const ng = await T.run();
  await browser.close(); srv.close();
  process.exit(ng ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
