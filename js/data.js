"use strict";
/* 英語ジャッジ:データ:端末間の同期の画面・書き出し・読み込み・削除
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 端末間の同期(js/sync.js,js/merge.js) ---------------- */
// js/sync.js から呼ばれる.同期の結果を反映するときも,もう一度手元と合わせる(通信中に解いた記録を消さないため)
window.App = {
  getState: () => S,
  applyState(m) {
    const next = Merge.merge(S, m);
    const txt = x => JSON.stringify(Merge.shareable(x));
    const forServer = txt(next) !== txt(m), forView = txt(next) !== txt(S);
    S = next; save(true);
    if (forServer && window.Sync) Sync.dirty(); // 通信中に増えた記録は,あとで送る
    if (forView) {
      D_EST = null; applyEstD(); checkBadges();
      if (!pState && !contestRunning()) render(); else renderHeader();
    }
  }
};
function syncHTML() {
  if (!window.Sync) return `<p class="small muted">同期の機能を読み込めませんでした.</p>`;
  const z = Sync.state();
  const msg = z.msg ? `<p class="small ${z.err ? "down" : "muted"}" role="status">${esc(z.msg)}</p>` : "";
  if (z.user) return `
    <p class="small" style="margin:0">ログイン中:<b>${esc(z.email || "(メールアドレスなし)")}</b></p>
    <p class="small muted" style="margin:2px 0 8px">${z.busy ? "同期しています…" : z.last ? `最後の同期:${new Date(z.last).toLocaleString("ja-JP")}` : "まだ同期していません."}</p>
    ${msg}
    <div class="row"><button class="btn" id="sync-now"${z.busy ? " disabled" : ""}>今すぐ同期</button><button class="btn ghost" id="sync-out">ログアウト</button></div>
    <details class="small" style="margin-top:10px"><summary>サーバーの記録を削除する</summary>
      <p class="muted">サーバーに保存した記録を消して,ログアウトします.この端末の記録は残ります.ほかの端末でログインしたままだと,その端末の記録がまた保存されます.</p>
      <button class="btn ghost sm danger" id="sync-del">サーバーの記録を削除してログアウト</button></details>`;
  return `
    <p class="small muted" style="margin-top:0">ログインすると,スマホと PC など複数の端末で記録を自動でそろえます.どちらの端末で解いた記録も消えません.ログインしなくても,今まで通りこの端末だけで使えます.</p>
    ${msg}
    <div class="row"><button class="btn" id="sync-google">Google でログイン</button></div>
    <div class="syncform">
      <input type="email" id="sync-email" class="search" placeholder="メールアドレス" autocomplete="email" value="${esc(z.email)}">
      <input type="password" id="sync-pw" class="search" placeholder="パスワード(6文字以上)" autocomplete="current-password">
      <div class="row"><button class="btn ghost" id="sync-in">ログイン</button><button class="btn ghost" id="sync-up">新規登録</button><button class="btn ghost sm" id="sync-reset">パスワードを忘れた</button></div>
    </div>
    <p class="small muted">ホーム画面に追加したアプリで Google のログインがうまくいかないときは,メールアドレスで登録してください.</p>
    <details class="small"><summary>保存するもの・しないもの</summary>
      <p class="muted">保存するのは,解いた問題と正誤,本番の記録,実績,目標と実際の点数です.名前やメールアドレスは記録に入れません(メールアドレスはログインだけに使います).記録はあなたしか読み書きできませんが,アプリの管理者(作者)はサーバーの管理画面から見ることができます.</p></details>`;
}
function bindSync() {
  const box = $("#sync-box"); if (!box || !window.Sync) return;
  const on = (id, f) => { const b = box.querySelector("#" + id); if (b) b.onclick = f; };
  const cred = () => [($("#sync-email") || {}).value || "", ($("#sync-pw") || {}).value || ""];
  on("sync-google", () => Sync.google());
  on("sync-in", () => { const [e, p] = cred(); Sync.signIn(e.trim(), p); });
  on("sync-up", () => { const [e, p] = cred(); if (confirm(`${e.trim()} で新しく登録します.よろしいですか?`)) Sync.signUp(e.trim(), p); });
  on("sync-reset", () => { const [e] = cred(); if (!e.trim()) { toast("メールアドレスを入れてから押してください."); return; } Sync.reset(e.trim()); });
  on("sync-now", async () => { if (await Sync.syncNow("button")) toast("同期しました."); });
  on("sync-out", () => { if (confirm("ログアウトしますか?この端末の記録はそのまま残ります.")) Sync.signOut(); });
  on("sync-del", async () => {
    if (!confirm("サーバーに保存した記録を削除して,ログアウトします.この端末の記録は残ります.よろしいですか?")) return;
    try { await Sync.deleteRemote(); await Sync.signOut(); toast("サーバーの記録を削除しました."); } catch (e) { toast("削除できませんでした.通信できる所でもう一度試してください."); }
  });
}
// 同期の状態が変わったら,記録画面の同期の欄だけ描き直す(入力中のメールアドレスは残す)
function onSyncChange() {
  const box = $("#sync-box"); if (!box) return;
  const email = ($("#sync-email") || {}).value, pw = ($("#sync-pw") || {}).value;
  box.innerHTML = syncHTML(); bindSync();
  if (email != null && $("#sync-email")) $("#sync-email").value = email;
  if (pw != null && $("#sync-pw")) $("#sync-pw").value = pw;
}

function exportData() {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" }));
  a.download = `eigo-judge-${dateKey(Date.now())}.json`;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
/* データの削除.レートは本番の記録から計算するので,本番の記録を消すとレートと推定スコアも消える */
const DELETE = {
  contests: { name: "本番の記録", desc: "本番の履歴を消します.レート・推定 TOEIC スコア・グラフも消えます.問題ごとの AC / WA と,実際の TOEIC の点数は残ります.",
    run: () => { S.contests = []; S.live = null; S.legacy = null; cState = null; S.wipe = Object.assign({}, S.wipe, { contests: Date.now() }); } },
  results: { name: "問題の結果", desc: "問題ごとの AC / WA,解答の履歴(草と難易度の推定に使う),単語の復習の予定,長文の所要時間を消します.すべて未挑戦に戻ります.レートと買ったテーマは残ります(コインはその分減ります).",
    run: () => { S.res = {}; S.srs = {}; S.readTimes = {}; S.att = []; S.dayAc = {}; D_EST = null; applyEstD(); S.wipe = Object.assign({}, S.wipe, { results: Date.now() }); } },
  all: { name: "すべてのデータ", desc: "本番の記録,問題の結果,学習日数,実績,買ったテーマ,設定をすべて消して,最初の状態に戻します.",
    run: () => { S = freshState(); S.wipe = { all: Date.now() }; cState = null; D_EST = null; applyEstD(); } }
};
function deleteData(k) {
  const d = DELETE[k];
  if (!confirm(`「${d.name}」を削除します.元に戻せません.よろしいですか?`)) return;
  if (k === "all" && !confirm("本当にすべてのデータを削除しますか?")) return;
  stopTimer(); pState = null;
  d.run();
  // 実績は今の状態から付け直す(消した記録で解除された実績が残らないように)
  if (k !== "all") { S.badges = {}; const c = badgeCtx(); BADGES.forEach(b => { if (b.ok(c)) S.badges[b.id] = Date.now(); }); }
  save(); render(); toTop();
  toast(`「${esc(d.name)}」を削除しました.`);
}
function importData(file) {
  file.text().then(txt => {
    const o = JSON.parse(txt);
    if (!o || typeof o !== "object" || !(o.res || o.stats)) throw new Error("bad");
    if (!confirm("読み込んだデータを,今の記録に合わせます(どちらの記録も残ります).よろしいですか?")) return;
    stopTimer(); pState = null;
    S = migrate(Merge.merge(S, migrate(o))); D_EST = null; applyEstD(); checkBadges(); save(); render(); toast("読み込んで,今の記録と合わせました.");
  }).catch(() => toast("このファイルは読み込めませんでした."));
}
