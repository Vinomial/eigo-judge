"use strict";
/* 端末間の同期(Firebase).ログインした人だけが使う.ログインしなければ SDK も読み込まない.
 * 保存先:Firestore の users/{uid}.中身は { data: 進捗の JSON 文字列, updatedAt, ver }.
 *   進捗は Merge.shareable(S)(解答中の本番と設定を除いたもの).1つの文書は 1MB までなので,文字列の長さを確かめてから送る.
 * 合わせ方は js/merge.js(上書きせず足し合わせる).送る前に必ず取ってきて合わせる(トランザクション).
 * アクセス規則は firestore.rules(本人の文書しか読み書きできない).
 * この端末でログインしているかは localStorage の eigo-judge-sync に覚える(進捗とは別.同期しない). */
(function () {
  const CONFIG = {
    apiKey: "AIzaSyC0mwYVVbqh8ekaUGRmDxHsPcOTcZVYc4c",
    authDomain: "eigo-judge.firebaseapp.com",
    projectId: "eigo-judge",
    storageBucket: "eigo-judge.firebasestorage.app",
    messagingSenderId: "231910269213",
    appId: "1:231910269213:web:9c70d7608e37386d8001f4"
  };
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  const KEY = "eigo-judge-sync";
  const MAX_LEN = 900000; // 文書の上限(1MB)より少し小さく
  const DEBOUNCE = 15000; // 解答してから送るまでの待ち時間(まとめて送る)

  const st = { fb: null, user: null, busy: false, last: 0, msg: "", err: false, timer: null, again: false, listeners: [] };
  const mem = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const remember = o => { try { localStorage.setItem(KEY, JSON.stringify(Object.assign(mem(), o))); } catch (e) { /* noop */ } };
  const notify = () => st.listeners.forEach(f => { try { f(); } catch (e) { /* noop */ } });
  const setMsg = (msg, err) => { st.msg = msg; st.err = !!err; notify(); };

  async function load() {
    if (st.fb) return st.fb;
    const [A, U, F] = await Promise.all([import(SDK + "firebase-app.js"), import(SDK + "firebase-auth.js"), import(SDK + "firebase-firestore.js")]);
    const app = A.initializeApp(CONFIG);
    const auth = U.getAuth(app);
    auth.languageCode = "ja";
    const db = F.getFirestore(app);
    if (window.EIGO_EMULATOR) { // テスト用:手元のエミュレーターにつなぐ(本番では使わない)
      U.connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      F.connectFirestoreEmulator(db, "127.0.0.1", 8080);
    }
    st.fb = { auth, db, U, F };
    U.onAuthStateChanged(auth, user => {
      st.user = user || null;
      remember({ on: !!user, email: user ? user.email || "" : "" });
      notify();
      if (user) syncNow("login");
    });
    return st.fb;
  }

  // ログインのエラーを日本語に
  function errText(e) {
    const c = (e && e.code) || "";
    const t = {
      "auth/invalid-email": "メールアドレスの形が正しくありません.",
      "auth/missing-password": "パスワードを入れてください.",
      "auth/weak-password": "パスワードは6文字以上にしてください.",
      "auth/email-already-in-use": "このメールアドレスはもう登録されています.「ログイン」を押してください.",
      "auth/invalid-credential": "メールアドレスかパスワードが違います.",
      "auth/wrong-password": "メールアドレスかパスワードが違います.",
      "auth/user-not-found": "このメールアドレスは登録されていません.",
      "auth/too-many-requests": "試行が多すぎます.しばらくしてからもう一度試してください.",
      "auth/popup-closed-by-user": "ログインの画面が閉じられました.",
      "auth/cancelled-popup-request": "ログインの画面が閉じられました.",
      "auth/popup-blocked": "ログインの画面を開けませんでした.メールアドレスでログインしてください.",
      "auth/operation-not-supported-in-this-environment": "この環境では Google でログインできません.メールアドレスでログインしてください.",
      "auth/unauthorized-domain": "このサイトからのログインが許可されていません(Firebase の承認済みドメインを確認してください).",
      "auth/network-request-failed": "通信できませんでした.電波のよい所でもう一度試してください.",
      "permission-denied": "サーバーに保存できませんでした(権限がありません).",
      "unavailable": "通信できませんでした.あとで自動で同期します."
    };
    return t[c] || `うまくいきませんでした(${c || (e && e.message) || "不明なエラー"}).`;
  }
  async function run(f) {
    try { setMsg("処理しています…"); await load(); await f(st.fb); setMsg(""); }
    catch (e) { setMsg(errText(e), true); }
  }

  const api = {
    // 起動時:この端末で前にログインしていたら,SDK を読み込んで同期する
    start() {
      if (mem().on) load().catch(e => setMsg(errText(e), true));
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && st.user) syncNow("hide"); });
      window.addEventListener("online", () => { if (st.user) syncNow("online"); });
    },
    on(f) { st.listeners.push(f); },
    state() { return { user: st.user, email: st.user ? st.user.email : mem().email || "", busy: st.busy, last: st.last || mem().last || 0, msg: st.msg, err: st.err, wanted: !!mem().on }; },
    google: () => run(async ({ auth, U }) => { await U.signInWithPopup(auth, new U.GoogleAuthProvider()); }),
    signIn: (email, pw) => run(async ({ auth, U }) => { await U.signInWithEmailAndPassword(auth, email, pw); }),
    signUp: (email, pw) => run(async ({ auth, U }) => { await U.createUserWithEmailAndPassword(auth, email, pw); }),
    reset: email => run(async ({ auth, U }) => { await U.sendPasswordResetEmail(auth, email); setTimeout(() => setMsg("パスワードを設定し直すメールを送りました."), 0); }),
    async signOut() {
      if (!st.fb) return;
      await syncNow("logout");
      await st.fb.U.signOut(st.fb.auth);
      remember({ on: false, email: "" });
      setMsg("ログアウトしました.この端末の記録はそのまま残ります.");
    },
    // 保存のたびに呼ぶ.少し待ってからまとめて送る
    dirty() {
      if (!st.user) return;
      clearTimeout(st.timer);
      st.timer = setTimeout(() => syncNow("save"), DEBOUNCE);
    },
    syncNow,
    // サーバーの自分のデータを消す(この端末の記録は残る)
    async deleteRemote() {
      if (!st.user) return;
      const { db, F } = st.fb;
      await F.deleteDoc(F.doc(db, "users", st.user.uid));
    }
  };

  // 取ってきて → 合わせて → 送る(トランザクションなので,他の端末と同時でも取りこぼさない)
  async function syncNow(reason) {
    if (!st.fb || !st.user) return false;
    if (st.busy) { st.again = true; return false; }
    if (!navigator.onLine) { setMsg("オフラインです.通信できるようになったら同期します."); return false; }
    clearTimeout(st.timer);
    st.busy = true; notify();
    const { db, F } = st.fb, ref = F.doc(db, "users", st.user.uid);
    try {
      let merged = null;
      await F.runTransaction(db, async tx => {
        const snap = await tx.get(ref);
        const remoteText = snap.exists() ? snap.data().data : null;
        const remote = remoteText ? JSON.parse(remoteText) : null;
        merged = remote ? Merge.merge(App.getState(), remote) : App.getState();
        const text = JSON.stringify(Merge.shareable(merged));
        if (text.length > MAX_LEN) throw Object.assign(new Error("too-large"), { code: "too-large" });
        if (text !== remoteText) tx.set(ref, { data: text, updatedAt: Date.now(), ver: 2 });
      });
      App.applyState(merged, reason);
      st.last = Date.now(); remember({ last: st.last });
      if (st.err) setMsg("");
      return true;
    } catch (e) {
      setMsg(e.code === "too-large" ? "記録が大きすぎて保存できません.作者に知らせてください." : errText(e), true);
      return false;
    } finally {
      st.busy = false; notify();
      if (st.again) { st.again = false; setTimeout(() => syncNow("again"), 1000); }
    }
  }

  window.Sync = api;
})();
