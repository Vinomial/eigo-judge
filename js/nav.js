"use strict";
/* 英語ジャッジ:画面の切り替えとヘッダー
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 画面の切り替え ---------------- */
let view = "home", pState = null, cState = null, timerId = null, pendingNav = null;
const LIST = Object.assign({ dom: "word", filter: "all", group: "d" }, S.prefs.list || {});
let contestKind = "all";
function contestRunning() { return cState && !cState.done; }

$("#nav").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  const to = b.dataset.v;
  if (contestRunning() && to !== "contest") { pendingNav = to; view = "contest"; render(); return; }
  if (to === "list" && view === "list" && pState) { stopTimer(); pState = null; } // 一覧タブをもう一度押すと一覧に戻る
  go(to);
});
function renderHeader() {
  const r = ratingOf("all");
  $("#hdr-rate").innerHTML = r == null ? "" : `<span class="pill" style="${rc(r)}">総合 ${r}</span>`;
}
function go(to) { view = to; pendingNav = null; render(); toTop(); }
function render() {
  $$("#nav button").forEach(b => b.setAttribute("aria-current", b.dataset.v === view ? "page" : "false"));
  endPreview();
  renderHeader();
  renderCoin();
  if (view === "home") $("#main").innerHTML = homeHTML();
  else if (view === "list") renderList();
  else if (view === "contest") renderContest();
  else if (view === "record") renderRecord();
  else if (view === "log") renderLog();
  else if (view === "shop") renderShop();
  else $("#main").innerHTML = defsHTML();
  bindGo();
}
// data-go: 画面の移動."auto" はおまかせ,"wa" は WA の解き直し,"thm" は定理の練習
function bindGo() {
  const from = view === "list" ? "list" : view;
  $$("[data-go]").forEach(b => b.onclick = () => {
    const to = b.dataset.go;
    if (to === "auto") startSolve(b.dataset.dom || LIST.dom, null, null, "", from);
    else if (to === "wa") startWaReview();
    else if (to === "weak") startWeakWords();
    else if (to === "thm") startTheorem(b.dataset.thm, from);
    else go(to);
  });
}
// 発音を聞く(端末の読み上げ機能)
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-say]");
  if (!b || !SPEAK) return;
  e.preventDefault();
  const u = new SpeechSynthesisUtterance(b.dataset.say);
  u.lang = "en-US"; u.rate = 0.9;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
});
