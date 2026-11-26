"use strict";
/* 英語ジャッジ:難易度の推定(自分の最初の解答と,みんなの解答から)
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 難易度の推定 ----------------
 * 問題の難易度 d は作った人の見積もり(d0).自分の解答から推定し直す(AtCoder Problems と同じ考え方).
 * 1. 各問題の「最初の解答」だけを使う(解説を見た後の解き直しは正解しやすく,難易度を低く見積もってしまうため).
 * 2. その時点の実力 θ:分野ごとに解答を時刻順に BLOCK 件ずつ区切り,その区切りの中の d0 と正誤からパフォーマンスと同じ式で求める.
 * 3. グループのずれ δ:同じ定理の文法問題・同じ長文の設問は,見積もりが同じ方向にずれやすい.
 *    グループ内の観測をまとめて,d0 + δ の δ を推定する(事前分布の標準偏差 GROUP_SD).
 * 4. 各問題の推定値:d0 + δ を中心とした事前分布(標準偏差 PRIOR_SD)と,観測 (θ, 正誤) の尤度をかけて,最も確からしい d を求める.
 *    1問の観測は1件だけなので,1問ごとの動きは小さい.グループのずれと,色帯ごとの正答率の比較の方があてになる. */
const ALLQ = [...WORDS.map(q => ["word", q]), ...GRAM.map(q => ["grammar", q]), ...READING.flatMap(p => p.qs.map(q => ["reading", q]))];
ALLQ.forEach(([, q]) => { q.d0 = q.d; });
const Q_BY = new Map(ALLQ.map(([dom, q]) => [q.id, { dom, q }]));
const BLOCK = 60, PRIOR_SD = 200, GROUP_SD = 250, MIN_ATT = 30;
const groupOf = (dom, q) => (dom === "grammar" ? q.t : dom === "reading" ? Q_PASSAGE.get(q.id).id : null);
// 尤度 Π p^ok (1-p)^(1-ok) と,中心 c・標準偏差 sd の事前分布をかけたものを最大にするずれ x を二分法で求める.
// obs: [{th, d, ok}](d に x を足したものが難易度).導関数 K Σ(p - ok) - (x - c) / sd² は x について単調減少.
function mapShift(obs, c, sd) {
  const K = Math.LN10 / 400;
  let lo = c - 1500, hi = c + 1500;
  for (let k = 0; k < 50; k++) {
    const mid = (lo + hi) / 2;
    const g = K * obs.reduce((a, o) => a + Rating.p(o.th, o.d + mid) - o.ok, 0) - (mid - c) / (sd * sd);
    if (g > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
let D_EST = null;
/* みんなの解答(ログインした人どうしで共有する.js/sync.js が Firestore の stats から取ってきて localStorage に置く)
 * POOL_KEY: { t: 取ってきた時刻, mine: 自分の uid, users: { uid: "id:正誤:実力,..." } }.進捗(S)とは別で,同期しない. */
const POOL_KEY = "eigo-judge-pool";
function poolObs() {
  let p = null;
  try { p = JSON.parse(localStorage.getItem(POOL_KEY) || "null"); } catch (e) { p = null; }
  const obs = new Map(); let users = 0;
  if (p && p.users) for (const [uid, a] of Object.entries(p.users)) {
    if (uid === p.mine || typeof a !== "string") continue; // 自分の分は手元の記録を使う
    users++;
    for (const e of a.split(",")) {
      const [id, ok, th] = e.split(":");
      if (!Q_BY.has(id) || !isFinite(+th)) continue;
      (obs.get(id) || obs.set(id, []).get(id)).push({ th: +th, ok: ok === "1" ? 1 : 0 });
    }
  }
  return { obs, users };
}
// 難易度の推定:自分の最初の解答に,みんなの最初の解答を足して推定する(人数が増えるほど細かく正確に動く)
function estimateD() {
  if (D_EST) return D_EST;
  const first = new Map();
  for (const [id, t, ok] of S.att) if (Q_BY.has(id) && !first.has(id)) first.set(id, { id, t, ok, ...Q_BY.get(id) });
  const pool = poolObs();
  const out = { items: new Map(), dom: {}, mine: [], users: pool.users };
  for (const dom of Object.keys(DOMAINS)) {
    const xs = [...first.values()].filter(x => x.dom === dom).sort((a, b) => a.t - b.t);
    const own = xs.length >= MIN_ATT;
    // 自分の実力:時刻順に BLOCK 件ずつ区切り,その中の d0 と正誤から求める
    if (own) for (let i = 0; i < xs.length; i += BLOCK) {
      let blk = xs.slice(i, i + BLOCK);
      if (blk.length < BLOCK / 2 && i) blk = xs.slice(Math.max(0, xs.length - BLOCK)); // 最後の短い区切りは前とまとめる
      const th = Rating.rawPerformance(blk.map(x => ({ d: x.q.d0, ok: x.ok })));
      xs.slice(i, i + BLOCK).forEach(x => { x.th = th; });
    }
    // 問題ごとの観測(実力, 正誤):自分の分(実力が出せるときだけ)+ みんなの分
    const obs = new Map();
    if (own) xs.forEach(x => { obs.set(x.id, [{ th: x.th, ok: x.ok, me: 1 }]); out.mine.push(`${x.id}:${x.ok}:${Math.round(x.th)}`); });
    for (const [id, list] of pool.obs) if (Q_BY.get(id).dom === dom) (obs.get(id) || obs.set(id, []).get(id)).push(...list);
    const nObs = [...obs.values()].reduce((a, l) => a + l.length, 0);
    out.dom[dom] = { n: xs.length, own, pool: nObs - (own ? xs.length : 0), ok: nObs >= MIN_ATT, bands: [] };
    if (!out.dom[dom].ok) continue;
    // グループのずれ(同じ定理・同じ長文はまとめて見積もりがずれやすい)
    const groups = new Map();
    for (const [id, l] of obs) { const g = groupOf(dom, Q_BY.get(id).q); if (g) (groups.get(g) || groups.set(g, []).get(g)).push(...l.map(o => ({ th: o.th, d: Q_BY.get(id).q.d0, ok: o.ok }))); }
    const shift = new Map();
    groups.forEach((g, k) => shift.set(k, mapShift(g, 0, GROUP_SD)));
    out.dom[dom].groups = [...groups].map(([k, g]) => ({ k, n: g.length, shift: Math.round(shift.get(k)) }));
    for (const [id, l] of obs) {
      const q = Q_BY.get(id).q, c = shift.get(groupOf(dom, q)) || 0;
      const sh = mapShift(l.map(o => ({ th: o.th, d: q.d0, ok: o.ok })), c, PRIOR_SD);
      const me = l.find(o => o.me);
      out.items.set(id, { dom, d0: q.d0, est: Math.round(q.d0 + sh), n: l.length, ac: l.filter(o => o.ok).length, ok: me ? me.ok : null, th: me ? me.th : null });
    }
    // 色帯ごとの比較(自分の分だけ):予想正答率(その時点の実力と d0 から)と実際の正答率
    if (own) out.dom[dom].bands = TIERS.map((t, i) => {
      const hi = TIERS[i + 1] ? TIERS[i + 1].min : Infinity, b = xs.filter(x => x.q.d0 >= t.min && x.q.d0 < hi);
      return { t, n: b.length, exp: b.length ? avg(b.map(x => Rating.p(x.th, x.q.d0))) : 0, act: b.length ? avg(b.map(x => x.ok)) : 0 };
    }).filter(b => b.n);
  }
  return (D_EST = out);
}
// 共有する自分の最初の解答("id:正誤:実力,...").実力が出せる分野の分だけ
const statsPayload = () => estimateD().mine.join(",");
// みんなの解答が届いたら推定し直す(js/sync.js から呼ぶ)
function onPoolChange() { D_EST = null; applyEstD(); if (typeof render === "function" && !contestRunning()) render(); }
// 「推定した難易度を使う」:未設定なら,みんなの解答が2人分以上あるとき自動で使う
const useEstD = () => (S.prefs.estD != null ? !!S.prefs.estD : poolObs().users >= 2);
// 推定のある問題の d を推定値に置き換える(色・問題一覧・出題・パフォーマンスに反映).推定値は 1 刻み
function applyEstD() {
  const on = useEstD(), E = on ? estimateD() : null;
  const gs = {};
  if (E) Object.keys(DOMAINS).forEach(dom => (E.dom[dom].groups || []).forEach(g => { gs[dom + g.k] = g.shift; }));
  ALLQ.forEach(([dom, q]) => {
    if (!E || !E.dom[dom].ok) { q.d = q.d0; return; }
    const e = E.items.get(q.id);
    q.d = e ? e.est : Math.round(q.d0 + (gs[dom + groupOf(dom, q)] || 0)); // 誰も解いていない問題は,同じグループのずれだけを足す
  });
}
// みんなの最初の解答の正答率(3件以上のとき)
function commHTML(id) {
  const e = estimateD().items.get(id);
  if (!e || e.n < 3) return "";
  return `<p class="small muted comm">みんなの最初の解答:${e.n} 件中 ${e.ac} 件 AC(${Math.round(100 * e.ac / e.n)}%)· 推定の難易度 ${e.est}</p>`;
}
