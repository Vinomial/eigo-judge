// Firestore のアクセス規則(firestore.rules)のテスト.エミュレーターで動かす.
// 使い方: npm run test:rules   (Java が必要.初回は npm install)
// エミュレーターは firebase.json の設定で起動する.
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const { initializeTestEnvironment, assertSucceeds, assertFails } = require("@firebase/rules-unit-testing");
const { doc, getDoc, setDoc, deleteDoc, collection, getDocs } = require("firebase/firestore");

(async () => {
  const env = await initializeTestEnvironment({
    projectId: "demo-eigo",
    firestore: { rules: fs.readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8"), host: "127.0.0.1", port: 8080 }
  });
  const alice = env.authenticatedContext("alice").firestore();
  const bob = env.authenticatedContext("bob").firestore();
  const anon = env.unauthenticatedContext().firestore();
  const ok = { data: JSON.stringify({ att: [] }), updatedAt: Date.now(), ver: 2 };
  let n = 0;
  const t = async (name, p) => { await p; n++; console.log("ok  " + name); };

  await t("本人は自分の文書を作れる", assertSucceeds(setDoc(doc(alice, "users/alice"), ok)));
  await t("本人は自分の文書を読める", assertSucceeds(getDoc(doc(alice, "users/alice"))));
  await t("本人は自分の文書を更新できる", assertSucceeds(setDoc(doc(alice, "users/alice"), { ...ok, updatedAt: Date.now() + 1 })));
  await t("他人の文書は読めない", assertFails(getDoc(doc(bob, "users/alice"))));
  await t("他人の文書は書けない", assertFails(setDoc(doc(bob, "users/alice"), ok)));
  await t("他人の文書は消せない", assertFails(deleteDoc(doc(bob, "users/alice"))));
  await t("ログインしていない人は読めない", assertFails(getDoc(doc(anon, "users/alice"))));
  await t("ログインしていない人は書けない", assertFails(setDoc(doc(anon, "users/anon"), ok)));
  await t("一覧の取得(全員の文書を読む)はできない", assertFails(getDocs(collection(alice, "users"))));
  await t("決まった項目以外は書けない", assertFails(setDoc(doc(alice, "users/alice"), { ...ok, admin: true })));
  await t("data が文字列でなければ書けない", assertFails(setDoc(doc(alice, "users/alice"), { ...ok, data: { att: [] } })));
  await t("data が大きすぎれば書けない", assertFails(setDoc(doc(alice, "users/alice"), { ...ok, data: "x".repeat(900001) })));
  await t("data がちょうど上限なら書ける", assertSucceeds(setDoc(doc(alice, "users/alice"), { ...ok, data: "x".repeat(900000) })));
  await t("users 以外の場所には書けない", assertFails(setDoc(doc(alice, "other/x"), ok)));
  await t("users の下の別の場所には書けない", assertFails(setDoc(doc(alice, "users/alice/sub/x"), ok)));
  await t("本人は自分の文書を消せる", assertSucceeds(deleteDoc(doc(alice, "users/alice"))));
  await env.cleanup();
  console.log(`\n${n} 件のテストに合格しました`);
  process.exit(0);
})().catch(e => { console.error("失敗:", e.message || e); process.exit(1); });
