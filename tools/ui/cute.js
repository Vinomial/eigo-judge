// 画面のテスト:背景の柄・動く背景・カード・草・スタンプ・マスコット・ステッカー帳・季節の限定品.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open, overflowX } = require("./helpers");

// コインをためる(問題ごとに AC 1枚.20問以上の日・実績のコインも付く)
const rich = p => p.evaluate(() => { const now = Date.now(); for (let i = 0; i < 1500; i++) record(ALLQ[i][1].id, true, now - i); save(); });

module.exports = T => {
  T.test("ショップ:背景の柄・動く背景・カード・草を買うと画面に反映され,再読み込みしても残る.動きを減らす設定では止まる", async () => {
    const p = await open();
    await rich(p);
    await p.evaluate(() => { shopTab = "bg"; go("shop"); });
    await p.click('[data-buy="bg:heart"]');
    await p.click('[data-stab="motion"]'); await p.click('[data-buy="motion:snow"]');
    await p.click('[data-stab="card"]'); await p.click('[data-buy="card:pop"]');
    await p.click('[data-stab="grass"]'); await p.click('[data-buy="grass:star"]');
    const look = () => p.evaluate(() => ({
      bg: document.documentElement.dataset.bg, card: document.documentElement.dataset.card, grass: document.documentElement.dataset.grass,
      pat: getComputedStyle(document.querySelector(".app"), "::before").display,
      motion: document.querySelectorAll(".app > .motion i").length,
      radius: getComputedStyle(document.documentElement).getPropertyValue("--shadow").trim()
    }));
    let r = await look();
    assert.deepStrictEqual([r.bg, r.card, r.grass, r.pat], ["heart", "pop", "star", "block"]);
    assert.ok(r.motion > 10, "動く背景の粒がない");
    assert.match(r.radius, /^3px 3px 0/, "カードの形の影がテーマの影に負けている");
    await p.reload();
    r = await look();
    assert.deepStrictEqual([r.bg, r.card, r.grass], ["heart", "pop", "star"], "再読み込みで見た目が戻った");
    assert.ok(r.motion > 10, "再読み込みで動く背景が消えた");
    // 草のマスが星の形(マスク)になる
    await p.evaluate(() => { recTab = "study"; go("record"); });
    assert.match(await p.evaluate(() => getComputedStyle(document.querySelector(".hm i")).maskImage || getComputedStyle(document.querySelector(".hm i")).webkitMaskImage), /svg/);
    // 動きを減らす設定の端末では出さない
    await p.emulateMedia({ reducedMotion: "reduce" });
    assert.strictEqual(await p.evaluate(() => getComputedStyle(document.querySelector(".motion")).display), "none");
    // 「なし」に戻せる
    await p.evaluate(() => { useItem("motion", "motion:none"); useItem("bg", "bg:none"); });
    assert.deepStrictEqual(await p.evaluate(() => [document.querySelectorAll(".motion").length, getComputedStyle(document.querySelector(".app"), "::before").display]), [0, "none"]);
    await p.done();
  });

  T.test("季節の限定品:その季節だけ並んで買え,季節が過ぎても買った物は使える", async () => {
    const p = await open();
    await rich(p);
    // 6月:冬の品は並ばず,買えない
    await p.evaluate(() => { SHOP_NOW = new Date(2026, 5, 10, 12).getTime(); shopTab = "wear"; go("shop"); });
    assert.strictEqual(await p.$('[data-item="wear:santa"]'), null, "季節外の限定品が並んでいる");
    assert.strictEqual(await p.$(".seasonnote"), null);
    await p.evaluate(() => buyItem("wear:santa"));
    assert.ok(!(await p.evaluate(() => !!S.owned["wear:santa"])), "季節外に買えた");
    // 12月:並んで買え,印が付く
    await p.evaluate(() => { SHOP_NOW = new Date(2026, 11, 3, 12).getTime(); go("shop"); });
    assert.match(await p.textContent('[data-item="wear:santa"]'), /冬の限定品 · 12\/25 まで/);
    assert.ok(await p.isVisible('[data-stab="wear"] .sdot'), "限定品があるタブに印がない");
    await p.click('[data-buy="wear:santa"]');
    // 年をまたぐ季節(お正月 12/26〜1/15)
    assert.deepStrictEqual(await p.evaluate(() => [inSeason("newyear", new Date(2027, 0, 3).getTime()), inSeason("newyear", new Date(2026, 11, 30).getTime()), inSeason("newyear", new Date(2027, 0, 20).getTime())]), [true, true, false]);
    // 6月に戻っても,買った物は並び,着られる
    await p.evaluate(() => { SHOP_NOW = new Date(2027, 5, 10, 12).getTime(); go("shop"); });
    assert.ok(await p.$('[data-item="wear:santa"]'), "買った限定品が季節外に消えた");
    assert.deepStrictEqual(await p.evaluate(() => currentWear()), { head: "wear:santa" });
    await p.done();
  });

  T.test("マスコット:迎えるとホームにいて,学習日数で育ち,今日の数で表情が変わる.着せ替えは部位ごとに1つ.AC で顔を出し,スタンプが押される", async () => {
    const p = await open({ width: 375 });
    // まだ選んでいなければ案内が出て,押すとショップのマスコットのタブが開く
    assert.ok(await p.isVisible(".petinv"), "マスコットを迎える案内がない");
    await p.click(".petinv");
    assert.deepStrictEqual(await p.evaluate(() => [view, shopTab]), ["shop", "pet"]);
    await p.click('[data-use="pet:penguin"]');
    await p.evaluate(() => go("home"));
    assert.ok(await p.isVisible(".petcard svg.pet"), "ホームにマスコットがいない");
    assert.match(await p.textContent(".petcard"), /ペンギン · ちび · 学習 0 日/);
    assert.match(await p.textContent(".petcard .bubble"), /zzz/, "まだ解いていないのに眠そうでない");
    // 30日学習して今日の目標を達成すると,おとなになってにっこり
    await p.evaluate(() => {
      for (let i = 1; i <= 30; i++) S.days[dateKey(Date.now() - i * DAY)] = 3;
      const now = Date.now(); for (let i = 0; i < GOAL + 80; i++) record(ALLQ[i][1].id, true, now - i); save(); go("home");
    });
    assert.match(await p.textContent(".petcard"), /おとな/);
    assert.match(await p.textContent(".petcard .bubble"), /達成/);
    assert.ok(!(await overflowX(p)), "幅 375px でホームがはみ出した");
    // 着せ替え:同じ部位は入れ替わり,もう一度押すと外す
    await p.evaluate(() => { shopTab = "wear"; go("shop"); });
    await p.click('[data-buy="wear:ribbon"]');
    await p.click('[data-buy="wear:glasses"]');
    await p.click('[data-buy="wear:beret"]');
    assert.deepStrictEqual(await p.evaluate(() => currentWear()), { head: "wear:beret", face: "wear:glasses" });
    await p.click('[data-use="wear:beret"]');
    assert.deepStrictEqual(await p.evaluate(() => currentWear()), { face: "wear:glasses" });
    assert.ok(!(await overflowX(p)), "幅 375px でショップがはみ出した");
    // 練習で AC すると,スタンプが押され,マスコットが顔を出す(WA では出ない)
    await p.evaluate(() => { shopTab = "stamp"; go("shop"); });
    await p.click('[data-buy="stamp:good"]');
    await p.evaluate(() => { S.prefs.wdir = "ej"; startSolve("word", WORDS[2000].id, null); const it = pState.item, st = pState.st; [...document.querySelectorAll("#qcard .choice")].find(b => +b.dataset.i >= 0 && !wordRight(it, st, +b.dataset.i)).click(); });
    assert.deepStrictEqual(await p.evaluate(() => [!!document.querySelector("#verdict .stamp"), !!document.querySelector(".petpop")]), [false, false], "WA でスタンプやマスコットが出た");
    await p.evaluate(() => { startSolve("word", WORDS[2001].id, null); const it = pState.item, st = pState.st; [...document.querySelectorAll("#qcard .choice")].find(b => +b.dataset.i >= 0 && wordRight(it, st, +b.dataset.i)).click(); });
    assert.match(await p.textContent("#verdict .stamp"), /よくできました/);
    assert.ok(await p.evaluate(() => !!document.querySelector(".petpop svg.pet")), "AC でマスコットが顔を出さない");
    // 「なし」を選ぶとホームから消え,案内も出ない
    await p.evaluate(() => { useItem("pet", "pet:none"); pState = null; go("home"); });
    assert.deepStrictEqual(await p.evaluate(() => [!!document.querySelector(".petcard"), !!document.querySelector(".petinv")]), [false, false]);
    await p.done();
  });

  T.test("ステッカー帳:学習の節目でもらえ,ショップで買ったものも貼られる", async () => {
    const p = await open();
    await p.evaluate(() => { recTab = "badge"; go("record"); });
    const n0 = await p.evaluate(() => document.querySelectorAll(".stk.got").length);
    assert.strictEqual(n0, 0);
    await rich(p);
    await p.evaluate(() => { shopTab = "sticker"; go("shop"); });
    await p.click('[data-buy="stk:cake"]');
    assert.match(await p.textContent('[data-item="stk:cake"]'), /帳に貼った/);
    await p.evaluate(() => { recTab = "badge"; go("record"); });
    const got = await p.evaluate(() => [...document.querySelectorAll(".stk.got .sn")].map(e => e.textContent));
    assert.ok(got.includes("はじめの一歩"), "学習1日のステッカーがない");
    assert.ok(got.includes("100問"), "100問 AC のステッカーがない");
    assert.ok(got.includes("ケーキ"), "買ったステッカーが貼られていない");
    assert.match(await p.textContent(".rsec h2"), /ステッカー帳 \d+\/\d+/);
    await p.done();
  });

  T.test("背景の柄・カード・草・動く背景のどの組み合わせでも,主な画面が横にはみ出さない", async () => {
    const p = await open({ width: 375 });
    const bad = await p.evaluate(() => {
      const out = []; S.owned = Object.fromEntries([...ITEM_BY.keys()].map(k => [k, 1])); S.prefs.pet = "pet:owl"; S.prefs.wear = { head: "wear:crown", neck: "wear:bell", face: "wear:shades" };
      const kinds = ["bg", "card", "grass", "motion"], n = Math.max(...kinds.map(k => ITEMS[k].length));
      for (let i = 0; i < n; i++) {
        kinds.forEach(k => { const xs = ITEMS[k]; useItem(k, xs[i % xs.length].id); });
        for (const v of ["home", "record", "shop"]) { go(v); const sc = document.getElementById("scroller"); if (sc.scrollWidth > sc.clientWidth) out.push(i + ":" + v); }
      }
      for (const t of Object.keys(SHOP_TABS)) { shopTab = t; go("shop"); const sc = document.getElementById("scroller"); if (sc.scrollWidth > sc.clientWidth) out.push("shop:" + t); }
      return out;
    });
    assert.deepStrictEqual(bad, []);
    await p.done();
  });
};
