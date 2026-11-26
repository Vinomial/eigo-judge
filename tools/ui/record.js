// 画面のテスト:記録.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open } = require("./helpers");

module.exports = T => {
  T.test("記録:日ごとの記録の棒グラフが描けて,切り替えられる", async () => {
    const p = await open();
    await p.evaluate(() => { const now = Date.now(); for (let d = 0; d < 10; d++) for (let i = 0; i <= d; i++) record(ALLQ[(d * 11 + i) % ALLQ.length][1].id, i % 2 === 0, now - d * DAY + i); save(); recTab = "study"; go("record"); });
    assert.strictEqual(await p.evaluate(() => document.querySelectorAll("#daily path").length), 10);
    await p.click('[data-dly="metric:first"]'); await p.click('[data-dly="dom:word"]'); await p.click('[data-dly="span:14"]');
    assert.match(await p.textContent("#daily-sum"), /直近14日/);
    await p.done();
  });

  T.test("記録:5つのタブがすべて描け,横にはみ出さず,タブを押すと切り替わる", async () => {
    const p = await open({ width: 375 });
    await p.evaluate(() => { const now = Date.now(); for (let i = 0; i < 40; i++) record(ALLQ[i][1].id, i % 3 > 0, now - (i % 9) * DAY); startContest("all"); cState.sts.forEach(s => { s.sel = 0; }); finishContest(); cState = null; save(); go("record"); });
    for (const [k, sel] of [["score", "#chart"], ["study", "#daily"], ["badge", ".badge"], ["est", ".estsw"], ["data", "#sync-box"]]) {
      await p.click(`[data-rtab="${k}"]`);
      assert.ok(await p.isVisible(sel), `${k} のタブに ${sel} がない`);
      const w = await p.evaluate(() => { const sc = document.getElementById("scroller"); return [sc.scrollWidth, sc.clientWidth]; });
      assert.ok(w[0] <= w[1], `${k} のタブが横にはみ出す(${w[0]}px)`);
    }
    await p.done();
  });

  T.test("実績:すべて進み具合を返し,id が重ならず,条件を満たすと解除される(解除済みの id は昔のまま)", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      const c = badgeCtx(), bad = BADGES.filter(b => { const v = b.p(c); return !(Array.isArray(v) && v.length === 2 && isFinite(v[0]) && v[1] > 0); }).map(b => b.id);
      const ids = BADGES.map(b => b.id);
      const now = Date.now(); for (let d = 0; d < 3; d++) for (let i = 0; i < 25; i++) record(ALLQ[d * 25 + i][1].id, true, now - d * DAY + i);
      checkBadges();
      return { bad, dup: ids.length - new Set(ids).size, n: BADGES.length, got: Object.keys(S.badges).sort(), old: ["c1", "c10", "c30", "perfect", "perf1000", "brown", "green", "cyan", "s3", "s7", "s30", "ac50", "ac200", "root1", "w100", "gall", "rall"].filter(id => !ids.includes(id)) };
    });
    assert.deepStrictEqual(r.bad, [], "進み具合を返さない実績がある");
    assert.strictEqual(r.dup, 0, "実績の id が重なっている");
    assert.deepStrictEqual(r.old, [], "前からある実績の id が消えた(解除の記録が失われる)");
    assert.ok(r.n >= 60, "実績の数が少ない");
    for (const id of ["s3", "goal1", "ac50"]) assert.ok(r.got.includes(id), `${id} が解除されない`);
    await p.done();
  });
};
