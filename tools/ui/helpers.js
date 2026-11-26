// 画面のテストで共通に使うもの.ブラウザは tools/test-ui.js が起動して setCtx で渡す
"use strict";
const assert = require("assert");

let ctx = null;
const setCtx = c => { ctx = c; };

// 新しい端末(保存データなし)で開く.ページのエラーと Firebase への通信を集める
async function open(opt = {}) {
  const c = await ctx.browser.newContext({ viewport: { width: opt.width || 390, height: 844 }, colorScheme: opt.dark ? "dark" : "light" });
  const p = await c.newPage();
  p.errs = []; p.fb = [];
  p.on("pageerror", e => p.errs.push(e.message));
  p.on("dialog", d => d.accept());
  p.on("request", r => { if (/gstatic\.com\/firebasejs|firestore\.googleapis|identitytoolkit/.test(r.url())) p.fb.push(r.url()); });
  await p.goto(ctx.url + "index.html");
  p.done = async () => { assert.deepStrictEqual(p.errs, [], "ページでエラーが起きた"); await c.close(); };
  return p;
}
const visibleChips = p => p.evaluate(() => [...document.querySelectorAll(".chip")].filter(c => c.offsetParent).length);
// 画面の中身が横にはみ出していないか(本文の枠の中身の幅が枠の幅を超えないか)
const overflowX = p => p.evaluate(() => { const sc = document.getElementById("scroller"); return sc.scrollWidth > sc.clientWidth; });

module.exports = { open, visibleChips, overflowX, setCtx };
