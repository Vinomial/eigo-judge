// 画面のテスト:練習モード.tools/test-ui.js から読み込む
"use strict";
const assert = require("assert");
const { open } = require("./helpers");

module.exports = T => {
  T.test("単語の選択肢:全単語・両方向で4つそろい,同じ意味の語が並ばない(取り違えやすい語の組は除く)", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      let bad = 0, amb = [];
      for (const w of WORDS) for (const dir of ["ej", "je"]) {
        S.prefs.wdir = dir;
        const st = newSt({ dom: "word", q: w });
        if (!st.choices || st.choices.length !== 4 || new Set(st.choices).size !== 4) bad++;
        const ws = st.choices.map(c => (st.rev ? WORD_BY.get(c) : WORD_BY_M.get(c)));
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
          if (!overlaps(ws[i].m, ws[j].m)) continue;
          if (confusables(ws[i]).some(x => x.id === ws[j].id) || confusables(ws[j]).some(x => x.id === ws[i].id)) continue;
          amb.push(`${ws[i].w}/${ws[j].w}`);
        }
      }
      return { bad, amb };
    });
    assert.strictEqual(r.bad, 0, "選択肢が4つそろわない単語がある");
    assert.deepStrictEqual(r.amb, [], "同じ意味の語が並んだ");
    await p.done();
  });

  T.test("練習:正解に「正解」,間違えた選択肢に「あなたの解答」.誤答の単語に過去の AC は付かない", async () => {
    const p = await open();
    await p.evaluate(() => { WORDS.forEach(w => record(w.id, true)); save(); S.prefs.wdir = "ej"; startSolve("word", WORDS[10].id, null); });
    await p.evaluate(() => { const st = pState.st, it = pState.item; [...document.querySelectorAll("#qcard .choice")].find(b => +b.dataset.i >= 0 && !wordRight(it, st, +b.dataset.i)).click(); });
    const marks = await p.evaluate(() => [...document.querySelectorAll("#qcard .cmark")].map(m => m.textContent).sort());
    assert.deepStrictEqual(marks, ["あなたの解答", "正解"]);
    assert.strictEqual(await p.evaluate(() => document.querySelectorAll("#qcard .choice .verdict").length), 0, "選択肢に AC / WA が付いている");
    assert.strictEqual(await p.textContent("#verdict .verdict"), "WA");
    await p.done();
  });

  T.test("練習:今回の成績,「AC なら自動で次へ」(WA では止まる),やめるときの結果", async () => {
    const p = await open();
    const pick = ok => p.evaluate(ok => { const it = pState.item; [...document.querySelectorAll("#qcard .choice")].find(b => +b.dataset.i >= 0 && (ok ? +b.dataset.i === it.q.a : +b.dataset.i !== it.q.a)).click(); }, ok);
    await p.evaluate(() => { S.prefs.notes = 99; startSolve("grammar", null, null, "", "home"); });
    await pick(true); await p.click("#next-btn");
    await pick(false);
    assert.match(await p.textContent("#sess"), /今回 2 問.*AC 1.*WA 1/);
    await p.click("#next-btn");
    await p.check("#auto-next");
    const a = await p.evaluate(() => pState.id);
    await pick(true); await p.waitForTimeout(1300);
    assert.notStrictEqual(await p.evaluate(() => pState.id), a, "AC なのに自動で次へ進まない");
    const b = await p.evaluate(() => pState.id);
    await pick(false); await p.waitForTimeout(1300);
    assert.strictEqual(await p.evaluate(() => pState.id), b, "WA なのに自動で進んだ");
    await p.click("#list-btn");
    assert.match(await p.evaluate(() => [...document.querySelectorAll(".toast")].map(t => t.textContent).join(" ")), /今回は 4 問中 2 問 AC/);
    await p.done();
  });

  T.test("長文:長い本文は枠に入り「本文を広げる」が出る.短い本文では出ない.提出すると判定される", async () => {
    const p = await open();
    const long = await p.evaluate(() => { startSolve("reading", READING.slice().sort((a, b) => b.s.length - a.s.length)[0].id, null); return !document.querySelector(".pmore").hidden; });
    assert.ok(long, "長い本文で「本文を広げる」が出ない");
    await p.click(".pmore");
    assert.ok(await p.evaluate(() => document.querySelector(".pbox").classList.contains("open")));
    const short = await p.evaluate(() => { startSolve("reading", READING.filter(r => !r.s.some(b => typeof b !== "string")).sort((a, b) => a.s.join("").length - b.s.join("").length)[0].id, null); return document.querySelector(".pmore").hidden; });
    assert.ok(short, "短い本文なのに「本文を広げる」が出ている");
    await p.evaluate(() => document.querySelectorAll(".rq").forEach(el => el.querySelector(".choice").click()));
    await p.click("#submit-btn");
    assert.ok(await p.isVisible("#rsum"), "提出しても結果が出ない");
    await p.done();
  });

  T.test("解き直し・未挑戦:間違えた問題を総合・分野別に,未挑戦は解いた問題を除いて出す.文法も復習の時期が来ると出る", async () => {
    const p = await open();
    const r = await p.evaluate(() => {
      const now = Date.now();
      record(WORDS[0].id, false, now - 3000); record(GRAM[0].id, false, now - 2000); READING[0].qs.forEach((q, i) => record(q.id, i > 0, now - 1000));
      updateSrs(GRAM[1].id, false); S.srs[GRAM[1].id].due = now - 1; save();
      go("drill");
      const btn = d => document.querySelector(`[data-drill="${d}"]`);
      const counts = { all: waQueue("all").length, word: waQueue("word").length, grammar: waQueue("grammar").length, reading: waQueue("reading").length, gdue: dueQueue("grammar").length };
      const unseen = unseenQueue("all").slice(0, 30), seenIn = unseen.some(x => x.id === WORDS[0].id || x.id === GRAM[0].id || x.id === READING[0].id);
      const doms = new Set(unseen.map(x => x.dom));
      btn("wa:grammar").click();
      const q = pState.queue.map(x => x.dom);
      return { counts, seenIn, doms: [...doms].sort(), q, disabled: btn ? null : 0, auto: autoPick("grammar") };
    });
    assert.deepStrictEqual([r.counts.all, r.counts.word, r.counts.grammar, r.counts.reading], [3, 1, 1, 1]);
    assert.strictEqual(r.counts.gdue, 1, "文法の復習の時期が出ない");
    assert.ok(!r.seenIn, "未挑戦に解いた問題が入っている");
    assert.deepStrictEqual(r.doms, ["grammar", "reading", "word"], "未挑戦(総合)が全分野を混ぜていない");
    assert.deepStrictEqual(r.q, ["grammar"], "文法の解き直しに別の分野が入っている");
    assert.strictEqual(r.auto, await p.evaluate(() => GRAM[1].id), "おまかせの文法で復習の時期の問題が先に出ない");
    await p.done();
  });
};
