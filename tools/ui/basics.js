// 画面のテスト:全体(画面の骨組み・通知・更新履歴).tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open } = require("./helpers");

module.exports = T => {
  T.test("全画面が描けて,エラーが出ず,ログインしなければ Firebase に通信しない", async () => {
    const p = await open();
    for (const v of ["home", "list", "contest", "record", "defs", "log", "modes", "drill"]) {
      await p.evaluate(v => go(v), v);
      assert.ok((await p.textContent("#main")).length > 50, `${v} の画面が空`);
    }
    assert.strictEqual(p.fb.length, 0, "ログインしていないのに Firebase に通信した");
    await p.done();
  });

  T.test("幅 375px で横スクロールが出ない", async () => {
    const p = await open({ width: 375 });
    await p.evaluate(() => { WORDS.slice(0, 30).forEach((w, i) => record(w.id, i % 2 === 0)); save(); });
    for (const v of ["home", "list", "contest", "record", "defs", "log", "modes", "drill"]) {
      // 本文の枠は横にはみ出しても隠すだけなので,中身の幅(scrollWidth)が枠の幅を超えていないかを見る
      const w = await p.evaluate(v => { go(v); const sc = document.getElementById("scroller"); return [sc.scrollWidth, sc.clientWidth, document.documentElement.scrollWidth]; }, v);
      assert.ok(w[0] <= w[1] && w[2] <= 375, `${v} の画面の幅が ${w[0]}px(枠は ${w[1]}px)`);
    }
    await p.done();
  });

  T.test("更新履歴:最新は NEW,開くと既読になる", async () => {
    const p = await open();
    assert.ok(await p.isVisible(".news .newbadge"));
    await p.click(".news");
    await p.evaluate(() => go("home"));
    assert.strictEqual(await p.isVisible(".news .newbadge"), false);
    await p.done();
  });

  T.test("長い画面を下までスクロールしても,ページ全体は動かず,タブバーは画面の下に付いたまま(iPhone で途中に取り残された件)", async () => {
    const p = await open({ width: 375 });
    const r = await p.evaluate(async () => {
      const now = Date.now(); for (let i = 0; i < 60; i++) record(ALLQ[i][1].id, i % 2 === 0, now - (i % 20) * DAY);
      recTab = "badge"; go("record");
      const sc = document.getElementById("scroller");
      sc.scrollTop = 1e6; window.scrollTo(0, 1e6);
      await new Promise(r => setTimeout(r, 100));
      const nav = document.getElementById("nav").getBoundingClientRect();
      return { long: sc.scrollHeight > sc.clientHeight * 2, inner: sc.scrollTop, page: document.scrollingElement.scrollTop, navBottom: Math.round(nav.bottom), h: window.innerHeight };
    });
    assert.ok(r.long, "テストに使う画面が短い");
    assert.ok(r.inner > 0, "本文の枠がスクロールしない");
    assert.strictEqual(r.page, 0, "ページ全体がスクロールした");
    assert.strictEqual(r.navBottom, r.h, "タブバーが画面の下にない");
    await p.evaluate(() => go("home"));
    assert.strictEqual(await p.evaluate(() => document.getElementById("scroller").scrollTop), 0, "画面を移っても先頭に戻らない");
    await p.done();
  });

  T.test("通知:実績をまとめて解除しても1枚にまとまり,同時に出るのは2枚まで", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      const now = Date.now();
      for (let d = 0; d < 8; d++) for (let i = 0; i < 8; i++) record(ALLQ[d * 8 + i][1].id, true, now - d * DAY + i);
      checkBadges();
      const first = document.querySelectorAll(".toast:not(.out)").length;
      toast("a"); toast("b"); toast("c");
      return { first, after: document.querySelectorAll(".toast:not(.out)").length, text: document.querySelector(".toast").textContent };
    });
    assert.strictEqual(r.first, 1, "実績の通知が何枚も出た");
    assert.match(r.text, /実績を \d+ 個解除/);
    assert.strictEqual(r.after, 2, "通知が2枚より多く出ている");
    await p.done();
  });
};
