// 画面のテスト:ショップとテーマ.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open } = require("./helpers");

module.exports = T => {
  T.test("ショップ:フォント・アイコン・演出を買って使え,ほかの端末用に S.owned に入る", async () => {
    const p = await open();
    const r = await p.evaluate(async () => {
      const now = Date.now(); for (let i = 0; i < 600; i++) record(ALLQ[i][1].id, true, now - i); save();
      shopTab = "icon"; go("shop");
      document.querySelector('[data-buy="icon:emoji"]').click();
      shopTab = "font"; renderShop(); document.querySelector('[data-buy="font:maru"]').click();
      shopTab = "fx"; renderShop(); document.querySelector('[data-buy="fx:stars"]').click();
      go("home");
      return { emo: document.querySelectorAll("#nav .emo").length, font: getComputedStyle(document.documentElement).getPropertyValue("--font-ja").trim(), fx: currentItem("fx"), owned: Object.keys(S.owned).sort(), spent: coinsSpent() };
    });
    assert.strictEqual(r.emo, 5, "タブのアイコンが絵文字にならない");
    assert.match(r.font, /Zen Maru Gothic/);
    assert.strictEqual(r.fx, "fx:stars");
    assert.deepStrictEqual(r.owned, ["font:maru", "fx:stars", "icon:emoji"]);
    assert.strictEqual(r.spent, 80 + 100 + 100);
    await p.evaluate(() => { useItem("icon", "icon:pixel"); });
    assert.strictEqual(await p.evaluate(() => document.querySelectorAll("#nav .emo").length), 5, "持っていないアイコンに変わった");
    await p.evaluate(() => { useItem("icon", "icon:line"); });
    assert.strictEqual(await p.evaluate(() => document.querySelectorAll("#nav svg:not(.pix)").length), 5, "標準のアイコンに戻らない");
    await p.done();
  });

  T.test("ショップ:コインは記録から数え,足りなければ買えず,買うとテーマが変わり,再読み込みしても残る.試したテーマは画面を移ると戻る", async () => {
    const p = await open();
    assert.strictEqual(await p.evaluate(() => coins()), 0);
    await p.evaluate(() => go("shop"));
    assert.ok(await p.isDisabled('[data-buy="floss"]'), "コインがないのに買える");
    await p.click('[data-try="floss"]');
    assert.strictEqual(await p.evaluate(() => document.documentElement.dataset.theme), "floss", "試せない");
    await p.evaluate(() => go("home"));
    assert.strictEqual(await p.evaluate(() => document.documentElement.dataset.theme), "auto", "試したテーマが戻らない");
    const earned = await p.evaluate(() => {
      const now = Date.now();
      for (let i = 0; i < 130; i++) record(ALLQ[i][1].id, true, now - i);
      record(ALLQ[0][1].id, true, now + 5); // 同じ問題・同じ日の2回目の AC は数えない
      save(); return coinsEarned();
    });
    assert.strictEqual(earned, 130 + 10, "コインの数え方が違う(AC 130 + 1日20問以上の日 10)");
    await p.evaluate(() => go("shop"));
    await p.click('[data-buy="floss"]');
    const r = await p.evaluate(() => ({ theme: document.documentElement.dataset.theme, owned: !!S.owned.floss, left: coins() - (coinsEarned() - 120), bg: getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() }));
    assert.deepStrictEqual([r.theme, r.owned, r.left, r.bg.toUpperCase()], ["floss", true, 0, "#FBF3FA"]);
    await p.reload();
    assert.strictEqual(await p.evaluate(() => document.documentElement.dataset.theme), "floss", "再読み込みでテーマが戻った");
    await p.evaluate(() => { go("shop"); });
    await p.click('[data-use="dark"]');
    assert.strictEqual(await p.evaluate(() => document.documentElement.dataset.tone), "dark");
    await p.done();
  });

  T.test("全テーマで全画面が描け,横にはみ出さない", async () => {
    const p = await open({ width: 375 });
    const bad = await p.evaluate(() => {
      const out = []; S.owned = Object.fromEntries(THEMES.map(t => [t.id, 1]));
      for (const t of THEMES) {
        setTheme(t.id);
        for (const v of ["home", "list", "contest", "record", "defs", "shop", "modes"]) { go(v); const sc = document.getElementById("scroller"); if (sc.scrollWidth > sc.clientWidth) out.push(t.id + ":" + v); }
      }
      return out;
    });
    assert.deepStrictEqual(bad, []);
    await p.done();
  });
};
