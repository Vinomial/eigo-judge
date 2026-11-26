// 端末間の同期のテスト(2台の端末を,Firebase のエミュレーター相手に実際のブラウザで動かす).
// 使い方: npm run test:sync   (Java が必要.エミュレーターは firebase.json の設定で起動する)
// 本番の Firebase には通信しない(アプリに window.EIGO_EMULATOR を入れてエミュレーターにつなぐ).
"use strict";
const assert = require("assert");
const { serve, launch, suite } = require("./browser");

const T = suite("同期のテスト(エミュレーター)");
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ctx, A, B;

async function device() {
  const c = await ctx.browser.newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(() => { window.EIGO_EMULATOR = true; });
  const p = await c.newPage();
  p.errs = [];
  p.on("pageerror", e => p.errs.push(e.message));
  p.on("dialog", d => d.accept());
  await p.goto(ctx.url + "index.html");
  return p;
}
async function synced(p, since) {
  for (let i = 0; i < 100; i++) {
    const z = await p.evaluate(() => Sync.state());
    if (z.user && !z.busy && z.last > since) return z;
    await sleep(150);
  }
  throw new Error("同期が終わらない: " + JSON.stringify(await p.evaluate(() => Sync.state())));
}
async function syncNow(p) { const t = Date.now(); await p.evaluate(() => Sync.syncNow("test")); return synced(p, t); }
const solve = (p, list) => p.evaluate(list => { const t0 = Date.now(); list.forEach(([id, ok], i) => record(id, !!ok, t0 + i)); save(); }, list);
const ids = p => p.evaluate(() => S.att.map(x => x[0]).sort().join(","));
const EMAIL = `tester${Date.now()}@example.com`, PW = "secret123";

T.test("スマホで登録すると,手元の記録がサーバーに送られる", async () => {
  await solve(A, [["w1", 1], ["g1", 0]]);
  const t = Date.now();
  await A.evaluate(([e, p]) => Sync.signUp(e, p), [EMAIL, PW]);
  await synced(A, t);
  assert.strictEqual(await ids(A), "g1,w1");
});

T.test("PC でログインすると,両方の記録がそろう(設定した目標も届く)", async () => {
  await solve(B, [["w2", 1], ["g2", 1]]);
  await B.evaluate(() => { S.goal = { v: 650, t: Date.now() }; save(); });
  const t = Date.now();
  await B.evaluate(([e, p]) => Sync.signIn(e, p), [EMAIL, PW]);
  await synced(B, t);
  assert.strictEqual(await ids(B), "g1,g2,w1,w2");
  await syncNow(A);
  assert.strictEqual(await ids(A), "g1,g2,w1,w2");
  assert.strictEqual(await A.evaluate(() => toeicGoal()), 650);
});

T.test("片方で解いた問題が,もう片方に届く", async () => {
  await solve(A, [["w3", 1]]);
  await syncNow(A); await syncNow(B);
  assert.match(await ids(B), /w3/);
});

T.test("削除(問題の結果)は,もう片方の端末から復活しない", async () => {
  await B.evaluate(() => deleteData("results"));
  await solve(B, [["w9", 1]]);
  await syncNow(B); await syncNow(A);
  assert.strictEqual(await ids(A), "w9");
  assert.strictEqual(await ids(B), "w9");
});

T.test("再読み込みしてもログインと同期が続く", async () => {
  await A.reload();
  const z = await synced(A, 0);
  assert.ok(z.user);
  assert.strictEqual(await ids(A), "w9");
});

T.test("ログアウトしても端末の記録は残り,間違ったパスワードは日本語で知らせる", async () => {
  await A.evaluate(() => Sync.signOut()); await sleep(800);
  assert.strictEqual(await A.evaluate(() => !!Sync.state().user), false);
  assert.strictEqual(await ids(A), "w9");
  await A.evaluate(e => Sync.signIn(e, "wrongpass"), EMAIL); await sleep(1500);
  assert.match(await A.evaluate(() => Sync.state().msg), /パスワードが違います/);
});

T.test("みんなの解答:別の人の最初の解答が届いて推定に使われ,「送らない」にすると消える", async () => {
  const C = await device();
  const g40 = p => p.evaluate(() => { const t0 = Date.now(); GRAM.slice(0, 40).forEach((q, i) => record(q.id, i % 3 > 0, t0 + i)); save(); });
  await g40(B); await g40(C);
  const t = Date.now();
  await C.evaluate(e => Sync.signUp(e, "secret123"), "other" + EMAIL);
  await synced(C, t);
  await B.evaluate(() => Sync.stats(true)); await C.evaluate(() => Sync.stats(true));
  const r = await C.evaluate(() => { const E = estimateD(), e = E.items.get(GRAM[1].id); return { users: E.users, n: e && e.n, uid: Sync.state().user.uid }; });
  assert.strictEqual(r.users, 1, "ほかの人の解答が届かない");
  assert.strictEqual(r.n, 2, "自分とほかの人の解答が合わさっていない");
  await C.evaluate(() => { S.prefs.share = false; save(); return Sync.stats(true); });
  const left = await B.evaluate(async () => { await Sync.stats(true); return Object.keys(JSON.parse(localStorage.getItem("eigo-judge-pool")).users); });
  assert.ok(!left.includes(r.uid), "「送らない」にしても消えていない");
  assert.deepStrictEqual(C.errs, []);
  await C.context().close();
});

T.test("容量:サーバーには圧縮して送り,圧縮していない古い形の記録も読める.大量の解答でも上限に収まる", async () => {
  // 大量の解答(2万件)を作って同期し,圧縮後の大きさを確かめる.
  // 時刻は前のテストの「問題の結果」の削除より後にする(削除より前の解答は,同期で正しく捨てられるため)
  await A.evaluate(e => Sync.signIn(e, "secret123"), EMAIL); await synced(A, 0);
  await A.evaluate(() => { const t0 = Date.now() + 1000; for (let i = 0; i < 20000; i++) record(ALLQ[i % ALLQ.length][1].id, i % 3 > 0, t0 + i * 997); save(); });
  await syncNow(A);
  const sz = await A.evaluate(() => Sync.size());
  assert.ok(sz.packed > 0 && sz.packed < sz.max, `圧縮後 ${sz.packed} 文字(上限 ${sz.max})`);
  assert.ok(sz.raw / sz.packed > 5, `圧縮が効いていない(${sz.raw} → ${sz.packed})`);
  console.log(`       (2万件の解答:圧縮前 ${Math.round(sz.raw / 1000)} KB → 送る大きさ ${Math.round(sz.packed / 1000)} KB)`);
  // 古い形(JSON のまま)の文書を置いても,もう片方の端末で読めて合わせられる
  const n = await A.evaluate(async () => {
    const plain = JSON.stringify({ ver: 2, res: { g5: { ac: 1, wa: 0, last: "AC", t: Date.now() } }, att: [["g5", Date.now(), 1], ["w1", Date.now() + 5, 0], ["g5", Date.now() + 9, 0]], z: 1 });
    const all = JSON.stringify(Merge.shareable(S));
    return [await Sync._unpack(await Sync._pack(plain)) === plain, await Sync._unpack(await Sync._pack(all)) === all, await Sync._unpack(plain) === plain];
  });
  assert.deepStrictEqual(n, [true, true, true], "圧縮して戻すと元に戻らない(または古い形が読めない)");
  await syncNow(B);
  assert.ok(await B.evaluate(() => S.att.length >= 20000), "圧縮した記録をもう片方の端末で読めない");
});

T.test("どちらの端末でもページのエラーが出ていない", async () => {
  assert.deepStrictEqual(A.errs, []); assert.deepStrictEqual(B.errs, []);
});

(async () => {
  const srv = await serve();
  const browser = await launch();
  ctx = { browser, url: srv.url };
  A = await device(); B = await device();
  const ng = await T.run(ctx);
  await browser.close(); srv.close();
  process.exit(ng ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
