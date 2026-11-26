// 画面のテスト:データ(削除・読み込み).tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open } = require("./helpers");

module.exports = T => {
  T.test("データの削除は時刻を残し(同期で他の端末に伝えるため),読み込みは今の記録と合わせる", async () => {
    const p = await open();
    const r = await p.evaluate(async () => {
      record("w1", true); save();
      deleteData("results");
      const wiped = !!S.wipe.results && !S.res.w1;
      record("w2", true); save();
      const other = Object.assign(freshState(), { res: { g1: { ac: 1, wa: 0, last: "AC", t: Date.now() } }, att: [["g1", Date.now(), 1]] });
      await importData(new File([JSON.stringify(other)], "x.json"));
      await new Promise(r => setTimeout(r, 200));
      return { wiped, w2: statusOf("w2"), g1: statusOf("g1") };
    });
    assert.ok(r.wiped, "削除しても時刻が残らない");
    assert.strictEqual(r.w2, "AC", "読み込みで今の記録が消えた");
    assert.strictEqual(r.g1, "AC", "読み込んだ記録が入らない");
    await p.done();
  });
};
