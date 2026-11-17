"use strict";
/* レート計算(AtCoder のアルゴリズムに準拠)
 *
 * 1. 問題の難易度 d:「レート d の人が 50% の確率で正解する」難しさ.
 *    レート X の人が難易度 d の問題に正解する確率は p(X, d) = 1 / (1 + 10^((d - X) / 400)).
 * 2. パフォーマンス:本番1回の出来.Σ p(X, d_i) = 正解数 となる X.
 *    全問正解・全問不正解では X が発散するので,正解数を [0.5, n - 0.5] に丸める.
 * 3. レート:過去のパフォーマンスを新しいものほど重く(0.9^i)平均し,参加回数が少ないうちは下げる補正をかける.
 *    回数を重ねると補正が消えて,レートはパフォーマンスの平均に近づく(AtCoder と同じ).
 * 4. 400 未満は 400 / e^((400 - R) / 400) で正の値に写す(AtCoder と同じ).
 */
(function (root) {
  const p = (X, d) => 1 / (1 + Math.pow(10, (d - X) / 400));
  const lowMap = r => (r >= 400 ? r : 400 / Math.exp((400 - r) / 400));

  // items: [{ d, ok }]  →  生のパフォーマンス(写像前)
  function rawPerformance(items) {
    const n = items.length;
    if (!n) return null;
    const score = Math.min(Math.max(items.filter(x => x.ok).length, 0.5), n - 0.5);
    if (n === 1) return items[0].d;
    let lo = -2000, hi = 5000;
    for (let k = 0; k < 60; k++) {
      const mid = (lo + hi) / 2;
      const e = items.reduce((a, x) => a + p(mid, x.d), 0);
      if (e < score) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }
  function performance(items) {
    const r = rawPerformance(items);
    return r == null ? null : Math.round(lowMap(r));
  }

  // 参加回数による補正 f(n).f(1) = 1200,n → ∞ で 0.
  const F = n => { let a = 0, b = 0; for (let i = 1; i <= n; i++) { a += Math.pow(0.81, i); b += Math.pow(0.9, i); } return Math.sqrt(a) / b; };
  const F_INF = Math.sqrt(0.81 / 0.19) / 9;
  const correction = n => (F(n) - F_INF) / (F(1) - F_INF) * 1200;

  // perfs: 古い順のパフォーマンス列
  function aperf(perfs) { // 補正なしの重み付き平均(出題の難易度合わせに使う)
    let num = 0, den = 0;
    perfs.slice().reverse().forEach((x, i) => { const w = Math.pow(0.9, i + 1); num += Math.pow(2, x / 800) * w; den += w; });
    return den ? 800 * Math.log2(num / den) : null;
  }
  function rating(perfs) {
    if (!perfs.length) return null;
    return Math.round(lowMap(aperf(perfs) - correction(perfs.length)));
  }

  const TIERS = [
    { min: 0, color: "--r-gray", name: "灰", title: "入門" },
    { min: 400, color: "--r-brown", name: "茶", title: "初級" },
    { min: 800, color: "--r-green", name: "緑", title: "中級" },
    { min: 1200, color: "--r-cyan", name: "水", title: "上級" },
    { min: 1600, color: "--r-blue", name: "青", title: "熟練" },
    { min: 2000, color: "--r-yellow", name: "黄", title: "達人" },
    { min: 2400, color: "--r-orange", name: "橙", title: "名人" },
    { min: 2800, color: "--r-red", name: "赤", title: "伝説" }
  ];
  const tierOf = r => { let t = TIERS[0]; for (const x of TIERS) if (r >= x.min) t = x; return t; };

  // 推定 TOEIC スコア(目安).レートの色の境目を TOEIC の点数に対応させ,間は直線でつなぐ.
  // 緑(800)= 550点 を基準にしている.実測で合わせた式ではないので,あくまで目安.
  const TOEIC_MAP = [[0, 250], [400, 400], [800, 550], [1200, 700], [1600, 850], [2000, 950], [2400, 990]];
  function toeic(r) {
    r = Math.max(0, r);
    for (let i = 1; i < TOEIC_MAP.length; i++) {
      const [r0, s0] = TOEIC_MAP[i - 1], [r1, s1] = TOEIC_MAP[i];
      if (r <= r1) return Math.round((s0 + (s1 - s0) * (r - r0) / (r1 - r0)) / 5) * 5;
    }
    return 990;
  }
  // perfs: 古い順のパフォーマンス列 → { score, lo, hi }.参加回数が少ないうちは幅を広くとる
  function toeicEstimate(perfs) {
    if (!perfs.length) return null;
    const x = aperf(perfs); // perfs は 400 未満を写した後の値なので,そのまま使う
    const w = 40 + 120 / Math.sqrt(perfs.length);
    const clamp = s => Math.min(990, Math.max(10, Math.round(s / 5) * 5));
    const score = toeic(x);
    return { score, lo: clamp(score - w), hi: clamp(score + w) };
  }

  const api = { p, performance, rawPerformance, correction, aperf, rating, TIERS, tierOf, toeic, toeicEstimate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Rating = api;
})(typeof window !== "undefined" ? window : this);
