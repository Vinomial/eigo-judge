// 画面のテスト:問題一覧.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open, visibleChips } = require("./helpers");

module.exports = T => {
  T.test("単語の検索:つづり・意味で絞り込め,見つからなければ案内が出て,空にすると戻る", async () => {
    const p = await open();
    await p.evaluate(() => { LIST.dom = "word"; LIST.filter = "all"; go("list"); });
    const all = await visibleChips(p);
    assert.strictEqual(all, await p.evaluate(() => WORDS.length));
    await p.fill("#wsearch", "inspect");
    const n1 = await visibleChips(p);
    assert.ok(n1 >= 1 && n1 < 10, `つづりで絞り込めない(${n1} 件)`);
    await p.fill("#wsearch", "検査");
    assert.ok((await visibleChips(p)) >= 1, "意味で探せない");
    await p.fill("#wsearch", "zzzzqq");
    assert.strictEqual(await visibleChips(p), 0);
    assert.ok(await p.isVisible("#wnone"), "見つからないときの案内が出ない");
    await p.fill("#wsearch", "");
    assert.strictEqual(await visibleChips(p), all);
    await p.done();
  });

  T.test("問題一覧:文法の定理別が描け,定理の問題から解き始められる", async () => {
    const p = await open();
    await p.evaluate(() => { LIST.dom = "grammar"; LIST.group = "thm"; LIST.filter = "all"; go("list"); });
    assert.strictEqual(await p.evaluate(() => document.querySelectorAll(".band").length), await p.evaluate(() => Object.keys(THM).length));
    await p.evaluate(() => document.querySelector(".band").open = true);
    await p.click(".band .chip");
    assert.ok(await p.evaluate(() => pState && pState.dom === "grammar" && pState.queue.length === 10));
    await p.done();
  });
};
