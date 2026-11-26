"use strict";
/* 進捗(S)の項目の一覧.項目を足すときはここに1行足す(node でも require できる).
 *
 * 各項目に決めること:
 *   def   既定の値を作る関数(freshState と,古いデータに足りない項目を補うのに使う)
 *   sync  端末間で合わせるか.false の項目はその端末だけのもので,サーバーに送らない(Merge.shareable)
 *   clear どの削除で消すか("contests" 本番の記録 / "results" 問題の結果).「すべてのデータ」はすべて消す
 *   desc  中身の説明
 * sync が true の項目は,js/merge.js の HANDLED にも合わせ方を書く(tools/test-merge.js が両方を突き合わせる).
 * clear は js/data.js の DELETE がそのまま使う.同期で他の端末に削除を伝えるのは js/merge.js の clean. */
(function (root) {
  const FIELDS = {
    ver: { def: () => 2, sync: true, clear: [], desc: "保存形式の版" },
    res: { def: () => ({}), sync: true, clear: ["results"], desc: "問題ごとの最後の結果 { ac, wa, last: \"AC\" | \"WA\", t }" },
    srs: { def: () => ({}), sync: true, clear: ["results"], desc: "間隔反復 { box, due, t }(単語・文法.つづり入力は sp_ を付けた id)" },
    contests: { def: () => [], sync: true, clear: ["contests"], desc: "本番の記録 [{ t, kind, items, perf }].レートはここから毎回計算する" },
    readTimes: { def: () => ({}), sync: true, clear: ["results"], desc: "長文の所要時間(秒)の一覧" },
    days: { def: () => ({}), sync: true, clear: [], desc: "日ごとの解いた数(学習日数.問題の結果を消しても残す)" },
    dayAc: { def: () => ({}), sync: true, clear: ["results"], desc: "日ごとの AC 数" },
    att: { def: () => [], sync: true, clear: ["results"], desc: "解答の履歴 [id, 時刻, 正解なら1]" },
    badges: { def: () => ({}), sync: true, clear: [], desc: "実績 { id: 解除した時刻 }(削除のあとは残った記録から付け直す)" },
    scores: { def: () => [], sync: true, clear: [], desc: "実際の TOEIC の点数 [{ t, score }]" },
    goal: { def: () => null, sync: true, clear: [], desc: "目標の点数 { v, t }" },
    owned: { def: () => ({}), sync: true, clear: [], desc: "ショップで買った品物 { id: 買った時刻 }" },
    daily: { def: () => ({}), sync: true, clear: ["results"], desc: "今日の問題 { 日付: { t, n, ac } }(解き終えた日)" },
    speed: { def: () => [], sync: true, clear: ["results"], desc: "早解きの記録 [{ t, dom, sec, ac, wa }]" },
    legacy: { def: () => null, sync: true, clear: ["contests"], desc: "v1(Elo 方式)の旧レート" },
    wipe: { def: () => ({}), sync: true, clear: [], desc: "削除した時刻 { contests, results, all }(同期で他の端末に削除を伝える)" },
    del: { def: () => ({}), sync: true, clear: [], desc: "個別に消したもの { scores: [時刻] }" },
    prefs: { def: () => ({}), sync: false, clear: [], desc: "その端末の設定" },
    live: { def: () => null, sync: false, clear: ["contests"], desc: "解答中の本番(再読み込みしても続きから再開するため)" },
    updatedAt: { def: () => 0, sync: false, clear: [], desc: "最後に保存した時刻" }
  };
  const fresh = () => Object.fromEntries(Object.entries(FIELDS).map(([k, f]) => [k, f.def()]));
  const LOCAL = Object.keys(FIELDS).filter(k => !FIELDS[k].sync);
  const clearedBy = kind => Object.keys(FIELDS).filter(k => FIELDS[k].clear.includes(kind));

  const api = { FIELDS, fresh, LOCAL, clearedBy };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Schema = api;
})(typeof window !== "undefined" ? window : this);
