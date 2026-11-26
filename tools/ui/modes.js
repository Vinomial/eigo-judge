// 画面のテスト:いろいろな練習(今日の問題・早解き・語根の問題・つづり入力).tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open, overflowX } = require("./helpers");

// 練習モードの今の問題に,正解(ok)か不正解で答える(単語・文法・語根・長文の1問)
const answer = (p, ok) => p.evaluate(ok => {
  const it = pState.item, st = pState.st;
  const right = i => (it.dom === "word" ? wordRight(it, st, i) : it.dom === "root" ? rootRight(it, st, i) : i === it.q.a);
  [...document.querySelectorAll("#qcard .choice")].find(b => +b.dataset.i >= 0 && right(+b.dataset.i) === ok).click();
}, ok);

module.exports = T => {
  T.test("今日の問題:日付で決まる5題(全員同じ).解き終えると記録され,ホーム・草・連続日数に出る", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      const a = JSON.stringify(dailySet("2026-11-26")), b = JSON.stringify(dailySet("2026-11-26"));
      const days = Array.from({ length: 10 }, (_, i) => JSON.stringify(dailySet(`2026-12-${String(i + 1).padStart(2, "0")}`)));
      return { same: a === b, distinct: new Set(days).size, n: dailySet().length, doms: dailySet().map(x => x.dom).join(",") };
    });
    assert.ok(r.same, "同じ日付で問題が変わる");
    assert.ok(r.distinct >= 9, "日によって問題が変わらない");
    assert.strictEqual(r.doms, "word,word,grammar,grammar,reading");
    await p.click('.tile.daily');
    assert.match(await p.textContent("#main"), /今日の問題/);
    // 単語・文法の4問(1問は間違える)
    for (let i = 0; i < 4; i++) { await answer(p, i !== 1); await p.click("#next-btn"); }
    assert.strictEqual(await p.evaluate(() => Object.keys(S.daily).length), 0, "長文を解く前に記録された");
    // 長文:全問に答えて提出
    await p.evaluate(() => { document.querySelectorAll(".rq").forEach((el, k) => el.querySelector(`.choice[data-i="${pState.passage.qs[k].a}"]`).click()); });
    await p.click("#submit-btn");
    const d = await p.evaluate(() => S.daily[dateKey(Date.now())]);
    assert.ok(d && d.n === 7 && d.ac === 6, `今日の問題の記録が違う ${JSON.stringify(d)}`);
    assert.match(await p.evaluate(() => [...document.querySelectorAll(".toast")].map(t => t.textContent).join(" ")), /今日の問題を解き終えました/);
    await p.evaluate(() => go("home"));
    assert.ok(await p.isVisible(".tile.daily.done"), "ホームに済みの印が出ない");
    assert.strictEqual(await p.evaluate(() => dailyStreak()), 1);
    await p.evaluate(() => { go("record"); [...document.querySelectorAll("[data-rtab]")].find(b => /学習/.test(b.textContent)).click(); });
    assert.ok(await p.evaluate(() => !!document.querySelector(`.hm i.dly[data-day="${dateKey(Date.now())}"]`)), "草に今日の問題の印がない");
    assert.ok(await p.evaluate(() => !!S.badges.daily1), "実績「今日の一題」が付かない");
    await p.done();
  });

  T.test("早解き:AC で +1,WA で −1,わからないは0点.時間が来ると結果が出て記録され,AC / WA は問題一覧に反映されるが解答の履歴には入らない", async () => {
    const p = await open();
    await p.evaluate(() => go("modes"));
    await p.click('[data-speed="word"]');
    const pick = kind => p.evaluate(kind => {
      const it = spState.item, st = spState.st;
      const b = [...document.querySelectorAll("#qcard .choice")].find(b => (kind === "idk" ? +b.dataset.i === IDK : +b.dataset.i >= 0 && wordRight(it, st, +b.dataset.i) === (kind === "ac")));
      b.click();
    }, kind);
    const wait = () => p.waitForFunction(() => !spState.lock);
    await pick("ac"); await wait();
    await pick("ac"); await wait();
    await pick("wa"); await wait();
    await pick("idk"); await wait();
    await p.keyboard.press("5"); await wait(); // キーボードの 5 も「わからない」
    const z = await p.evaluate(() => ({ ac: spState.ac, wa: spState.wa, idk: spState.idk, att: S.att.length }));
    assert.deepStrictEqual(z, { ac: 2, wa: 1, idk: 2, att: 0 });
    await p.evaluate(() => { spState.start -= 61000; speedTick(); });
    assert.match(await p.textContent(".spscore"), /^1/);
    const rec = await p.evaluate(() => ({ speed: S.speed, att: S.att.length, res: Object.values(S.res).map(r => r.last).sort().join(","), today: S.days[dateKey(Date.now())] || 0 }));
    assert.strictEqual(rec.speed.length, 1); assert.strictEqual(rec.speed[0].ac - rec.speed[0].wa, 1);
    assert.strictEqual(rec.att, 0, "早解きが解答の履歴に入った(難易度の推定・コインが狂う)");
    assert.strictEqual(rec.res, "AC,AC,WA,WA,WA", "早解きの AC / WA が問題の状態に反映されない(わからないは WA)");
    assert.strictEqual(rec.today, 5, "早解きで解いた数が今日の数に入らない");
    assert.match(await p.textContent(".spres"), /問題一覧に反映しました/);
    // 途中で画面を移ると止まり,記録しない
    await p.click("#sp-again");
    await p.evaluate(() => go("home"));
    await p.waitForTimeout(300);
    assert.strictEqual(await p.evaluate(() => S.speed.length), 1, "途中でやめたのに記録された");
    assert.strictEqual(await p.evaluate(() => Object.keys(S.res).length), 5, "途中でやめた早解きの結果が問題の状態に入った");
    assert.strictEqual(await p.evaluate(() => spState.timer), null, "画面を移ってもタイマーが止まらない");
    await p.done();
  });

  T.test("語根の問題:全部の語根・接辞で4つの選択肢がそろい,意味が紛らわしくない.答えると root_ の id で記録される", async () => {
    const p = await open();
    const bad = await p.evaluate(() => {
      const out = [];
      for (const q of ROOTQ) for (let k = 0; k < 3; k++) {
        const st = rootSt(q), xs = st.choices.map(id => ROOTQ_BY.get(id));
        if (xs.length !== 4 || new Set(st.choices).size !== 4 || !st.choices.includes(q.id)) out.push(q.id + ":数");
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (overlaps(xs[i].m, xs[j].m)) out.push(`${xs[i].key}/${xs[j].key}`);
      }
      return out;
    });
    assert.deepStrictEqual(bad, []);
    await p.evaluate(() => { S.prefs.notes = 99; go("modes"); });
    await p.click('[data-roots="r"]');
    assert.strictEqual(await p.evaluate(() => pState.queue.length), 20);
    const id = await p.evaluate(() => pState.id);
    await answer(p, true);
    assert.strictEqual(await p.textContent("#verdict .verdict"), "AC");
    assert.match(await p.textContent("#result"), /この語根を含む単語/);
    await p.click("#next-btn");
    await answer(p, false);
    assert.strictEqual(await p.textContent("#verdict .verdict"), "WA");
    const st = await p.evaluate(id => [statusOf(id), !!S.srs[id], S.att.length], id);
    assert.deepStrictEqual(st, ["AC", true, 2]);
    // 一度解いた語根は逆向き(意味 → 語根)でも出せる
    const rev = await p.evaluate(id => { S.srs[id] = { box: 1, due: 0, t: 0 }; Math.random = () => 0.1; const st = rootSt(ROOTQ_BY.get(id)); return st.rev && isCorrect({ dom: "root", q: ROOTQ_BY.get(id) }, Object.assign(st, { sel: st.choices.indexOf(id) })); }, id);
    assert.ok(rev, "逆向きの問題が判定できない");
    await p.done();
  });

  T.test("つづり入力:打ち込んで判定(大文字小文字は問わない).わからないも選べ,文字を打っても選択肢のキーが効かない.単語の意味の結果とは別に記録", async () => {
    const p = await open();
    await p.evaluate(() => { S.prefs.notes = 99; WORDS.slice(0, 5).forEach(w => record(w.id, true)); save(); go("modes"); });
    await p.click('[data-spell="1"]');
    const w = await p.evaluate(() => pState.item.q.w);
    assert.ok(await p.evaluate(() => document.activeElement && document.activeElement.id === "sp-in"), "入力欄に入らない");
    await p.keyboard.type("a"); // 「a」は選択肢の A のキーだが,入力中は文字として入る
    assert.strictEqual(await p.inputValue("#sp-in"), "a");
    assert.strictEqual(await p.evaluate(() => pState.st.done), false, "入力中に選択肢のキーが効いた");
    await p.fill("#sp-in", "  " + w.toUpperCase() + " ");
    await p.press("#sp-in", "Enter");
    assert.strictEqual(await p.textContent("#verdict .verdict"), "AC");
    const r = await p.evaluate(() => { const id = pState.item.q.id; return [statusOf("sp_" + id), !!S.srs["sp_" + id], S.res[id] ? S.res[id].ac : 0]; });
    assert.strictEqual(r[0], "AC"); assert.ok(r[1], "つづりの復習の予定が入らない");
    await p.click("#next-btn");
    await p.fill("#sp-in", "zzzz");
    await p.click("#sp-ok");
    assert.strictEqual(await p.textContent("#verdict .verdict"), "WA");
    assert.match(await p.textContent("#result"), /あなたの解答.*zzzz/);
    await p.click("#next-btn");
    await p.click("#sp-idk");
    assert.strictEqual(await p.textContent("#verdict .verdict"), "WA");
    assert.match(await p.textContent("#result"), /わからない/);
    await p.done();
  });

  T.test("いろいろな練習の画面:幅 375px ではみ出さず,ホームから入れる", async () => {
    const p = await open({ width: 375 });
    await p.click('[data-go="modes"]');
    assert.match(await p.textContent("#main"), /早解き[\s\S]*語根の問題[\s\S]*つづり入力/);
    assert.ok(!(await overflowX(p)), "横にはみ出した");
    await p.evaluate(() => startSpeed("grammar"));
    assert.ok(!(await overflowX(p)), "早解き(文法)の画面がはみ出した");
    await p.evaluate(() => { stopSpeed(); startSpell("modes"); });
    assert.ok(!(await overflowX(p)), "つづり入力の画面がはみ出した");
    await p.done();
  });
};
