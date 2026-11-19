// 画面のテスト(ヘッドレスの Chromium で実際に操作する).使い方: npm run test:ui(または node tools/test-ui.js)
// 画面や操作を変えたら必ず通す.新しい機能を足したら,ここにもテストを足す.
"use strict";
const assert = require("assert");
const { serve, launch, suite } = require("./browser");

const T = suite("画面のテスト");
let ctx;

// 新しい端末(保存データなし)で開く.ページのエラーと Firebase への通信を集める
async function open(opt = {}) {
  const c = await ctx.browser.newContext({ viewport: { width: opt.width || 390, height: 844 }, colorScheme: opt.dark ? "dark" : "light" });
  const p = await c.newPage();
  p.errs = []; p.fb = [];
  p.on("pageerror", e => p.errs.push(e.message));
  p.on("dialog", d => d.accept());
  p.on("request", r => { if (/gstatic\.com\/firebasejs|firestore\.googleapis|identitytoolkit/.test(r.url())) p.fb.push(r.url()); });
  await p.goto(ctx.url + "index.html");
  p.done = async () => { assert.deepStrictEqual(p.errs, [], "ページでエラーが起きた"); await c.close(); };
  return p;
}
const visibleChips = p => p.evaluate(() => [...document.querySelectorAll(".chip")].filter(c => c.offsetParent).length);

T.test("全画面が描けて,エラーが出ず,ログインしなければ Firebase に通信しない", async () => {
  const p = await open();
  for (const v of ["home", "list", "contest", "record", "defs", "log"]) {
    await p.evaluate(v => go(v), v);
    assert.ok((await p.textContent("#main")).length > 50, `${v} の画面が空`);
  }
  assert.strictEqual(p.fb.length, 0, "ログインしていないのに Firebase に通信した");
  await p.done();
});

T.test("幅 375px で横スクロールが出ない", async () => {
  const p = await open({ width: 375 });
  await p.evaluate(() => { WORDS.slice(0, 30).forEach((w, i) => record(w.id, i % 2 === 0)); save(); });
  for (const v of ["home", "list", "contest", "record", "defs", "log"]) {
    const w = await p.evaluate(v => { go(v); return document.documentElement.scrollWidth; }, v);
    assert.ok(w <= 375, `${v} の画面の幅が ${w}px`);
  }
  await p.done();
});

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
  const short = await p.evaluate(() => { startSolve("reading", READING.find(r => r.s.length <= 4 && !r.s.some(b => typeof b !== "string")).id, null); return document.querySelector(".pmore").hidden; });
  assert.ok(short, "短い本文なのに「本文を広げる」が出ている");
  await p.evaluate(() => document.querySelectorAll(".rq").forEach(el => el.querySelector(".choice").click()));
  await p.click("#submit-btn");
  assert.ok(await p.isVisible("#rsum"), "提出しても結果が出ない");
  await p.done();
});

T.test("本番:4種類とも採点でき,レートが付く", async () => {
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
  assert.deepStrictEqual(Object.values(r.out), [true, true, true, true]);
  assert.strictEqual(r.n, 4);
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

T.test("記録:日ごとの記録の棒グラフが描けて,切り替えられる", async () => {
  const p = await open();
  await p.evaluate(() => { const now = Date.now(); for (let d = 0; d < 10; d++) for (let i = 0; i <= d; i++) record(ALLQ[(d * 11 + i) % ALLQ.length][1].id, i % 2 === 0, now - d * DAY + i); save(); go("record"); });
  assert.strictEqual(await p.evaluate(() => document.querySelectorAll("#daily path").length), 10);
  await p.click('[data-dly="metric:first"]'); await p.click('[data-dly="dom:word"]'); await p.click('[data-dly="span:14"]');
  assert.match(await p.textContent("#daily-sum"), /直近14日/);
  await p.done();
});

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

T.test("更新履歴:最新は NEW,開くと既読になる", async () => {
  const p = await open();
  assert.ok(await p.isVisible(".news .newbadge"));
  await p.click(".news");
  await p.evaluate(() => go("home"));
  assert.strictEqual(await p.isVisible(".news .newbadge"), false);
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

(async () => {
  const srv = await serve();
  const browser = await launch();
  ctx = { browser, url: srv.url };
  const ng = await T.run(ctx);
  await browser.close(); srv.close();
  process.exit(ng ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
