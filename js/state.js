"use strict";
/* 英語ジャッジ:状態と保存(進捗 S).項目の一覧は js/schema.js
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 状態と保存 ---------------- */
// v2: res[id] = { ac, wa, last: "AC" | "WA", t }(表示する状態は最後の結果)
//     contests = [{ t, items: [{ id, dom, d, ok }], perf: { all, word, grammar, reading } }]
//     レートは contests から毎回計算する(保存しない)
const LS_KEY = "eigo-judge-v1";
// 項目の一覧と既定の値は js/schema.js(項目を足すときはそちらに書く)
const freshState = () => Schema.fresh();
function migrate(o) {
  const s = freshState();
  if (!o || typeof o !== "object") return s;
  for (const k of Object.keys(s)) if (o[k] != null && k !== "ver") s[k] = o[k];
  if (!o.ver) { // v1(Elo 方式)からの移行.問題ごとの成績は引き継ぎ,旧レートは記録として残す
    for (const [id, st] of Object.entries(o.stats || {})) {
      if (st && (st.ac || st.wa)) s.res[id] = { ac: st.ac || 0, wa: st.wa || 0, last: st.ac ? "AC" : "WA", t: o.updatedAt || 0 };
    }
    if (o.history && o.history.length) s.legacy = { ratings: o.ratings || {}, history: o.history };
  }
  // 解答の履歴(att)がない古いデータ:1回だけ解いた問題はその結果を最初の解答とみなし,AC した日も最後の結果から近似する
  if (!o.att) {
    for (const [id, r] of Object.entries(s.res)) {
      if (r.ac + r.wa === 1 && r.t) s.att.push([id, r.t, r.last === "AC" ? 1 : 0]);
      if (r.last === "AC" && r.t) { const k = dateKey(r.t); s.dayAc[k] = (s.dayAc[k] || 0) + 1; }
    }
    s.att.sort((a, b) => a[1] - b[1]);
  }
  return s;
}
let S = freshState();
try { const raw = localStorage.getItem(LS_KEY); if (raw) S = migrate(JSON.parse(raw)); } catch (e) { /* 保存領域が使えない環境では毎回初期状態 */ }
let saveWarned = false;
function save(fromSync) {
  S.updatedAt = Date.now();
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); }
  catch (e) {
    // 端末の保存領域がいっぱいなど.黙って失敗すると記録が消えるので,1回だけ知らせる
    if (!saveWarned && typeof toast === "function") { saveWarned = true; setTimeout(() => toast("<b>この端末に記録を保存できませんでした</b><br><span class=\"small\">保存領域がいっぱいかもしれません.ログインして同期するか,「記録」→「データ」で書き出してください.</span>"), 0); }
  }
  if (!fromSync && window.Sync) Sync.dirty();
}
