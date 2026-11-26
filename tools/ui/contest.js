// 画面のテスト:本番モード.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open } = require("./helpers");

module.exports = T => {
  T.test("本番:5種類(ミニ模試を含む)とも採点でき,レートが付く", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      const out = {};
      for (const k of Object.keys(CONTESTS)) {
        go("contest"); startContest(k);
        cState.items.forEach((it, i) => { cState.sts[i].sel = 0; });
        finishContest(); out[k] = cState.done; cState = null;
      }
      return { out, n: S.contests.length, all: ratingOf("all"), word: ratingOf("word") };
    });
    assert.deepStrictEqual(Object.values(r.out), [true, true, true, true, true]);
    assert.strictEqual(r.n, 5);
    assert.ok(r.all != null && r.word != null, "レートが付かない");
    await p.done();
  });

  T.test("本番:途中で再読み込みしても続きから再開できる", async () => {
    const p = await open();
    const sel = await p.evaluate(() => { go("contest"); startContest("all"); cState.sts[0].sel = 1; persistContest(); return cState.items.map(it => it.q.id).join(","); });
    await p.reload();
    const r = await p.evaluate(() => ({ view, running: contestRunning(), ids: cState.items.map(it => it.q.id).join(","), sel: cState.sts[0].sel }));
    assert.strictEqual(r.view, "contest"); assert.ok(r.running); assert.strictEqual(r.ids, sel); assert.strictEqual(r.sel, 1);
    await p.done();
  });

  T.test("ミニ模試:Part 5→6→7 の順に約50問,38分.終わると Part ごとの結果が出て,文法と長文のレートが付く(総合レートは動かない)", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      go("contest"); startContest("mock");
      const parts = cState.items.map(partOf), sorted = parts.every((x, i) => !i || parts[i - 1] <= x);
      const n = { 5: parts.filter(x => x === 5).length, 6: parts.filter(x => x === 6).length, 7: parts.filter(x => x === 7).length };
      const sec = Math.round((cState.end - Date.now()) / 1000);
      cState.sts.forEach(s => { s.sel = 0; }); finishContest(); renderContest();
      return { sorted, n, sec, sum: !!document.querySelector(".mocksum"), all: ratingOf("all"), g: ratingOf("grammar"), rd: ratingOf("reading"), perf: S.contests[0].perf.mock };
    });
    assert.ok(r.sorted, "Part の順に並んでいない");
    assert.deepStrictEqual([r.n[5], r.n[6]], [15, 8]);
    assert.ok(r.n[7] >= 27 && r.n[7] <= 29, `Part 7 の設問数が ${r.n[7]}`);
    assert.ok(r.sec > 2270 && r.sec <= 2280, "制限時間が38分でない");
    assert.ok(r.sum, "Part ごとの結果が出ない");
    assert.strictEqual(r.all, null, "総合レートが動いた");
    assert.ok(r.g != null && r.rd != null && r.perf != null);
    await p.done();
  });
};
