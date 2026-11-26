// 画面のテスト:難易度でランダムに出す(問題一覧の色帯・難易度を選んでランダム)と,難易度の推定のすぐの反映.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open, overflowX } = require("./helpers");

module.exports = T => {
  T.test("問題一覧:色帯の「ランダム」で,その色の未 AC だけをランダムに解ける(押しても色帯は閉じない)", async () => {
    const p = await open();
    await p.evaluate(() => {
      // 灰の単語の半分を AC にしておく
      WORDS.filter(w => w.d < 400).forEach((w, i) => { if (i % 2 === 0) record(w.id, true); });
      save(); LIST.dom = "word"; LIST.filter = "all"; LIST.group = "d"; go("list");
    });
    const band = await p.$(".band");
    await band.$eval(".bt-rnd", b => b.click());
    const r = await p.evaluate(() => ({
      list: pState && pState.dom === "word",
      n: pState.queue.length,
      inBand: pState.queue.every(x => WORD_BY.get(x.id).d < 400),
      notAC: pState.queue.every(x => statusOf(x.id) !== "AC"),
      label: pState.label
    }));
    assert.ok(r.list, "ランダムで解き始めない");
    assert.ok(r.n > 0 && r.n <= 20, `1回分の数がおかしい(${r.n})`);
    assert.ok(r.inBand, "ほかの色の問題が混ざった");
    assert.ok(r.notAC, "AC 済みの問題が混ざった");
    assert.match(r.label, /灰の未 AC からランダム/);
    // 2回目は並びが変わる(ランダム)
    const first = await p.evaluate(() => pState.queue.map(x => x.id).join());
    let changed = false;
    for (let i = 0; i < 5 && !changed; i++) {
      changed = await p.evaluate(f => { startRandom("word", 0, 399, "notac", "list"); return pState.queue.map(x => x.id).join() !== f; }, first);
    }
    assert.ok(changed, "何度出しても同じ並び(ランダムになっていない)");
    await p.done();
  });

  T.test("難易度を選んでランダム:分野・色(幅)・対象を選ぶと,その中からランダムに出す.下限と上限が逆でも直す", async () => {
    const p = await open({ width: 375 });
    await p.evaluate(() => { GRAM.filter(q => q.d >= 400 && q.d < 800).slice(0, 5).forEach(q => record(q.id, false)); save(); go("drill"); });
    assert.ok(await p.isVisible("#rnd"), "難易度を選んでランダムの欄がない");
    await p.click('#rnd [data-rd="dom:grammar"]');
    await p.click('#rnd [data-rt^="400:"]');
    await p.click('#rnd [data-rd="tgt:new"]');
    const want = await p.evaluate(() => GRAM.filter(q => q.d >= 400 && q.d <= 799 && !statusOf(q.id)).length);
    assert.match(await p.textContent("#rnd-n"), new RegExp(`対象 ${want} 問`));
    assert.ok(!(await overflowX(p)), "幅 375px で画面がはみ出した");
    await p.click("#rnd-go");
    const r = await p.evaluate(() => ({ dom: pState.queue.every(x => x.dom === "grammar"), d: pState.queue.every(x => GRAM_BY.get(x.id).d >= 400 && GRAM_BY.get(x.id).d <= 799), unseen: pState.queue.every(x => !statusOf(x.id)), n: pState.queue.length }));
    assert.deepStrictEqual(r, { dom: true, d: true, unseen: true, n: 20 });
    // 下限と上限を逆に選ぶと入れ替える.選んだ内容は覚えている
    await p.evaluate(() => go("drill"));
    await p.selectOption("#rnd-hi", "1200");
    await p.selectOption("#rnd-lo", "1500"); // 下限が上限より上になったら入れ替える
    assert.deepStrictEqual(await p.evaluate(() => [S.prefs.rnd.lo, S.prefs.rnd.hi, S.prefs.rnd.dom, S.prefs.rnd.tgt]), [1200, 1500, "grammar", "new"]);
    // 総合は単語・文法・長文を混ぜ,長文は5題まで
    await p.click('#rnd [data-rd="dom:all"]'); await p.click('#rnd [data-rt^="400:"]'); await p.click('#rnd [data-rd="tgt:all"]');
    await p.click("#rnd-go");
    const mix = await p.evaluate(() => { const c = {}; pState.queue.forEach(x => { c[x.dom] = (c[x.dom] || 0) + 1; }); return c; });
    assert.ok(mix.word && mix.grammar && mix.reading, "総合なのに分野が混ざらない");
    assert.ok(mix.reading <= 5, "長文が5題より多い");
    await p.done();
  });

  T.test("難易度の推定:解くとすぐ反映され(再読み込みしなくても),AC なら下がり WA なら上がる.判定のあとに変化を出す", async () => {
    const p = await open();
    // 推定を使う設定にし,単語の最初の解答を 40 件ためる(推定は分野ごとに 30 件から)
    await p.evaluate(() => {
      S.prefs.estD = true;
      const now = Date.now();
      WORDS.slice(0, 40).forEach((w, i) => record(w.id, i % 2 === 0, now - (40 - i) * 1000));
      save(); go("home");
    });
    const pick = () => p.evaluate(() => { const w = WORDS.find(x => !S.res[x.id] && x.d0 >= 600 && x.d0 <= 1000); return w.id; });
    // AC すると下がる
    const a = await pick();
    await p.evaluate(id => { S.prefs.wdir = "ej"; startSolve("word", id, null); }, a);
    const before = await p.evaluate(id => WORD_BY.get(id).d, a);
    await p.evaluate(() => { const it = pState.item, st = pState.st; [...document.querySelectorAll("#qcard .choice")].find(b => +b.dataset.i >= 0 && wordRight(it, st, +b.dataset.i)).click(); });
    await p.waitForSelector(".dmove"); // 推定は判定を出したあとに裏で行う
    const after = await p.evaluate(id => WORD_BY.get(id).d, a);
    assert.ok(after < before, `AC したのに難易度が下がらない(${before} → ${after})`);
    assert.match(await p.textContent(".dmove"), /↓/);
    // WA すると上がる
    const b = await pick();
    await p.evaluate(id => startSolve("word", id, null), b);
    const b0 = await p.evaluate(id => WORD_BY.get(id).d, b);
    await p.evaluate(() => { const it = pState.item, st = pState.st; [...document.querySelectorAll("#qcard .choice")].find(x => +x.dataset.i >= 0 && !wordRight(it, st, +x.dataset.i)).click(); });
    await p.waitForSelector(".dmove");
    const b1 = await p.evaluate(id => WORD_BY.get(id).d, b);
    assert.ok(b1 > b0, `WA なのに難易度が上がらない(${b0} → ${b1})`);
    assert.match(await p.textContent(".dmove"), /↑/);
    // 問題一覧にも,再読み込みせずに反映されている
    await p.evaluate(() => { pState = null; LIST.dom = "word"; LIST.filter = "all"; go("list"); });
    // (2問目を解くとその時点の実力の推定も変わるので,1問目の値は少し動くことがある.表示が今の推定と同じで,元より低いことを確かめる)
    const shown = await p.evaluate(id => [+document.querySelector(`.chip[data-pid="${id}"] .cd`).textContent, WORD_BY.get(id).d], a);
    assert.strictEqual(shown[0], shown[1], "問題一覧の難易度が今の推定と違う");
    assert.ok(shown[0] < before, "問題一覧で難易度が元に戻っている");
    // 履歴に残り,問題の解説(難易度の推移)と記録の画面(分析)で見られる
    const log = await p.evaluate(([a, b]) => dlogRead().filter(r => r[0] === a || r[0] === b).map(r => r[4]), [a, b]);
    assert.deepStrictEqual(log, ["ac", "wa"], "自分の解答で動いた難易度が履歴に残らない");
    await p.evaluate(id => startSolve("word", id, null), a);
    await p.evaluate(() => { const it = pState.item, st = pState.st; [...document.querySelectorAll("#qcard .choice")].find(x => +x.dataset.i >= 0 && wordRight(it, st, +x.dataset.i)).click(); });
    assert.match(await p.textContent(".dhist"), /難易度の推移[\s\S]*作成時[\s\S]*AC/);
    await p.evaluate(() => { pState = null; recTab = "est"; go("record"); });
    assert.match(await p.textContent("#main"), /難易度の変化の履歴/);
    assert.ok(await p.evaluate(id => !!document.querySelector(`.dlrow[data-estq="${id}"]`), a), "履歴の一覧に出ない");
    await p.click(`.dlrow[data-estq="${a}"]`);
    assert.ok(await p.evaluate(id => pState && pState.id === id, a), "履歴から問題を開けない");
    // 問題の結果を消すと履歴も消える
    await p.evaluate(() => { pState = null; deleteData("results"); });
    assert.strictEqual(await p.evaluate(() => dlogRead().length), 0, "結果を消しても履歴が残った");
    // 本番の途中は変えない(出題・パフォーマンスが変わらないように)
    const frozen = await p.evaluate(() => {
      go("contest"); startContest("word");
      const id = cState.items[0].q.id, d = cState.items[0].q.d;
      record(WORDS.find(x => !S.res[x.id]).id, true); render();
      return d === WORD_BY.get(id).d && EST_STALE === true;
    });
    assert.ok(frozen, "本番の途中で難易度が変わった");
    await p.done();
  });
};
