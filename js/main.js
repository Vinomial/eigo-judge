"use strict";
/* 英語ジャッジ:キーボード操作と起動
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- キーボード操作 ---------------- */
// 1〜4(または A〜D): 選択肢を選ぶ.本番では ← → で前後の問題へ移る.
document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
  if (e.target.closest && e.target.closest("svg")) return;
  const card = $("#qcard"); if (!card) return;
  const single = (view === "list" && pState && pState.dom !== "reading") || (view === "contest" && contestRunning() && !pendingNav && !cState.confirming);
  if (!single) return;
  // 5(または 0)は「わからない」
  const k = e.key.toLowerCase(), idx = "12345".indexOf(k) >= 0 ? "12345".indexOf(k) : k === "0" ? 4 : "abcd".indexOf(k);
  if (idx >= 0) {
    const b = card.querySelectorAll(".choice")[idx];
    if (b && !b.disabled) { e.preventDefault(); b.click(); }
  } else if (view === "contest" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    const b = $(e.key === "ArrowRight" ? "#next-btn" : "#prev-btn");
    if (b && !b.disabled) { e.preventDefault(); b.click(); }
  }
});

// ブラウザに保存データを消されにくくする(対応している環境のみ)
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* noop */ }
applyLook(); // テーマ・フォント・タブのアイコン(js/shop.js)
applyEstD();
restoreContest();
render();
if (window.Sync) { Sync.on(onSyncChange); Sync.start(); }
