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
  const MAX_LEN = 900000; // 文書の上限(1MB)より少し小さく(圧縮した後の長さで比べる)
  /* 送るときは圧縮する(gzip → base64 の前に "z1:" を付ける).記録はおよそ 5〜7 倍小さくなる.
   * 圧縮のない古い文書(JSON そのまま)も読める.古い版のアプリが圧縮された文書を読むと JSON.parse で失敗して同期をやめるので,記録は消えない.
   * CompressionStream が使えない環境では,今まで通り JSON のまま送る. */
  const ZIP = "z1:";
  const canZip = () => typeof CompressionStream === "function" && typeof DecompressionStream === "function";
  async function pipe(bytes, stream) { return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer()); }
  function toB64(u8) { let s = ""; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
  function fromB64(b) { const s = atob(b), u8 = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i); return u8; }
  /* 解答の履歴 att は,圧縮する前に「問題の番号の表」と「前の解答との時刻の差」に置き換える(時刻の数字が毎回違うと gzip が縮めにくいため).
   * att: { z: 1, ids: [問題 id], c: "番号*2+正誤(36進),...", d: "前との差ミリ秒(36進),..." }.ミリ秒まで元に戻る(同期の重複判定に使うため). */
  function attPack(att) {
    const ids = [], ix = new Map(); let prev = 0; const c = [], d = [];
    for (const [id, t, ok] of att) {
      if (!ix.has(id)) { ix.set(id, ids.length); ids.push(id); }
      c.push((ix.get(id) * 2 + (ok ? 1 : 0)).toString(36)); d.push((t - prev).toString(36)); prev = t;
    }
    return { z: 1, ids, c: c.join(","), d: d.join(",") };
  }
  function attUnpack(p) {
    if (!p.c) return [];
    const c = p.c.split(","), d = p.d.split(","); let t = 0;
    return c.map((x, i) => { const k = parseInt(x, 36); t += parseInt(d[i], 36); return [p.ids[k >> 1], t, k & 1]; });
  }
  async function pack(json) {
    if (!canZip()) return json;
    const o = JSON.parse(json);
    if (Array.isArray(o.att)) o.att = attPack(o.att); // キーの順番は変えない(取ってきた側で同じ JSON に戻すため)
    return ZIP + toB64(await pipe(new TextEncoder().encode(JSON.stringify(o)), new CompressionStream("gzip")));
  }
  async function unpack(text) {
    if (!text.startsWith(ZIP)) return text;
    const o = JSON.parse(new TextDecoder().decode(await pipe(fromB64(text.slice(ZIP.length)), new DecompressionStream("gzip"))));
    if (o.att && o.att.z === 1) o.att = attUnpack(o.att);
    return JSON.stringify(o);
  }
  const DEBOUNCE = 15000; // 解答してから送るまでの待ち時間(まとめて送る)
  const POOL_KEY = "eigo-judge-pool";      // みんなの最初の解答(js/core.js の poolObs が読む)
  const POOL_EVERY = 6 * 3600 * 1000;      // みんなの解答を取ってくる間隔(読み取りの回数を抑える)
  const STATS_MAX = 200000;                // stats の文字列の上限(firestore.rules と同じ)

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
    // 送っている記録の大きさ(圧縮後・圧縮前の文字数).テストと画面の表示に使う
    size: () => ({ packed: st.size || 0, raw: st.raw || 0, max: MAX_LEN }),
    _pack: pack, _unpack: unpack,
    // サーバーの自分のデータを消す(この端末の記録は残る).みんなの推定に送った分も消す
    async deleteRemote() {
      if (!st.user) return;
      const { db, F } = st.fb;
      await F.deleteDoc(F.doc(db, "users", st.user.uid));
      await F.deleteDoc(F.doc(db, "stats", st.user.uid)).catch(() => {});
    },
    stats
  };

  /* みんなの解答:Firestore の stats/{uid} に { a: "id:正誤:実力,...", n, updatedAt, v } を置き,全員分を読んで難易度の推定に使う.
   * 送るのは問題ごとの最初の正誤と,そのときの実力の推定値だけ(名前・メールアドレス・時刻は送らない).
   * 「送らない」を選んだら(S.prefs.share === false)自分の文書を消す.取ってくるのは POOL_EVERY ごと(force で今すぐ). */
  async function stats(force) {
    if (!st.fb || !st.user || !App.statsPayload) return;
    const { db, F } = st.fb, uid = st.user.uid, ref = F.doc(db, "stats", uid);
    try {
      if (App.shareStats()) {
        const a = App.statsPayload();
        if (a && a.length <= STATS_MAX && (force || a !== mem().statsSent)) {
          await F.setDoc(ref, { a, n: a.split(",").length, updatedAt: Date.now(), v: 1 });
          remember({ statsSent: a });
        }
      } else if (mem().statsSent != null) {
        await F.deleteDoc(ref); remember({ statsSent: null });
      }
      let pool = null; try { pool = JSON.parse(localStorage.getItem(POOL_KEY) || "null"); } catch (e) { pool = null; }
      if (!force && pool && pool.mine === uid && Date.now() - pool.t < POOL_EVERY) return;
      const snap = await F.getDocs(F.collection(db, "stats"));
      const users = {};
      snap.forEach(d => { const x = d.data(); if (x && typeof x.a === "string") users[d.id] = x.a; });
      localStorage.setItem(POOL_KEY, JSON.stringify({ t: Date.now(), mine: uid, users }));
      App.onPool();
    } catch (e) { /* みんなの解答は無くても動く(規則がまだ公開されていないときなど) */ }
  }

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
        const remoteJson = remoteText ? await unpack(remoteText) : null;
        const remote = remoteJson ? JSON.parse(remoteJson) : null;
        merged = remote ? Merge.merge(App.getState(), remote) : App.getState();
        const text = JSON.stringify(Merge.shareable(merged));
        // 中身が変わったときだけ,圧縮して送る(比べるのは圧縮する前の JSON)
        if (text !== remoteJson) {
          const packed = await pack(text);
          if (packed.length > MAX_LEN) throw Object.assign(new Error("too-large"), { code: "too-large" });
          tx.set(ref, { data: packed, updatedAt: Date.now(), ver: 2 });
          st.size = packed.length; st.raw = text.length;
        }
      });
      App.applyState(merged, reason);
      st.last = Date.now(); remember({ last: st.last });
      stats(false); // みんなの解答(失敗しても同期には影響しない)
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
