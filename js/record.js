"use strict";
/* 英語ジャッジ:記録(レートの推移・日ごとの記録・草・難易度の推定)
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 記録 ----------------
 * 項目が多いので,上のタブで分ける(成績・学習・実績・分析・データ).選んだタブは recTab. */
let chartKey = "all", recTab = "score";
const REC_TABS = { score: "成績", study: "学習", badge: "実績", est: "分析", data: "データ" };
// 本番の履歴:1回を1行のカードに(表は幅が足りず読みにくいため)
function contestListHTML(H) {
  if (!S.contests.length) return `<p class="muted small">まだありません.まずは1回本番に挑戦して,今の位置を測りましょう.</p>`;
  return `<div class="clist">${S.contests.slice().reverse().slice(0, 30).map(c => {
    const k = c.kind || "all", e = H[k] && H[k].find(x => x.t === c.t), ok = c.items.filter(x => x.ok).length;
    return `<div class="crow"><div class="cl1"><span class="kindtag">${CONTESTS[k].name}</span><span class="small muted">${new Date(c.t).toLocaleDateString("ja-JP")}</span></div>
      <div class="cl2"><span><b>${ok}</b><span class="small muted">/${c.items.length} 問</span></span><span class="small muted">パフォーマンス</span>${rateSpan(c.perf[k])}
      <span class="crate"><span class="small muted">レート</span> ${e ? rateSpan(e.rating) : ""} ${e && e.prev != null ? signed(e.rating - e.prev) : ""}</span></div></div>`;
  }).join("")}</div>`;
}
// 実績:分類ごとに,進み具合(今の数 / 目標)と解除した日を出す
function badgesHTML() {
  const c = badgeCtx(), got = b => !!S.badges[b.id] || b.ok(c);
  const total = BADGES.filter(got).length, pct = Math.round(100 * total / BADGES.length);
  const fmt = v => (typeof v === "number" && v >= 10000 ? Math.round(v / 1000) + "k" : v);
  return `<section class="rsec bsum"><div class="bsum-n"><b>${total}</b><span>/ ${BADGES.length}</span></div><div class="bsum-r"><div class="small muted">解除した実績(1つにつきコイン ${COIN.badge} 枚)</div><div class="pbar"><span style="width:${pct}%"></span></div></div></section>
    ${BADGE_CATS.map(cat => {
      const bs = BADGES.filter(b => b.cat === cat), done = bs.filter(got).length;
      return `<section class="rsec"><h2>${cat} <span class="small muted">${done}/${bs.length}</span></h2><div class="badges">${bs.map(b => {
        const g = got(b), [x, goal] = b.p(c), r = Math.max(0, Math.min(1, x / goal));
        const when = S.badges[b.id] ? fmtDate(S.badges[b.id]) + " 解除" : "解除";
        return `<div class="badge${g ? " got" : ""}"><b>${g ? "✓ " : ""}${esc(b.name)}</b><span>${esc(b.desc)}</span>
          ${g ? `<span class="bwhen">${when}</span>` : goal > 1 ? `<span class="bprog"><span class="pbar"><span style="width:${(100 * r).toFixed(0)}%"></span></span><span class="bnum">${fmt(Math.min(x, goal))}/${fmt(goal)}</span></span>` : `<span class="bwhen muted">未解除</span>`}</div>`;
      }).join("")}</div></section>`;
    }).join("")}`;
}
function renderRecord() {
  const m = $("#main"), sk = streaks();
  const H = {}; Object.keys(SERIES).forEach(k => H[k] = history(k));
  const scores = (S.scores || []).slice().sort((a, b) => b.t - a.t);
  const scoreRows = scores.map(x => { const e = Rating.toeicEstimate(allPerfs(x.t + DAY)); return `<tr><td>${new Date(x.t).toLocaleDateString("ja-JP")}</td><td><b>${x.score}</b></td><td>${e ? e.score : "-"}</td><td>${e ? signed(x.score - e.score) : ""}</td><td><button class="btn ghost sm danger" data-sdel="${x.t}">削除</button></td></tr>`; }).join("");
  // 苦手な定理:解いた回数が3回以上で,正答率の低い順
  const weak = Object.keys(THM).map(k => {
    let ac = 0, wa = 0;
    GRAM.forEach(q => { const r = q.t === k && S.res[q.id]; if (r) { ac += r.ac; wa += r.wa; } });
    return { k, n: ac + wa, rate: ac + wa ? ac / (ac + wa) : 1 };
  }).filter(x => x.n >= 3 && x.rate < 0.8).sort((a, b) => a.rate - b.rate || b.n - a.n).slice(0, 5);
  const weakHTML = weak.length ? `<div class="weak">${weak.map(x => `<div class="wrow"><span class="wn">${esc(THM[x.k].name)}</span><span class="small muted">正答率 ${Math.round(100 * x.rate)}%(${x.n}回)</span><button class="btn ghost sm" data-go="thm" data-thm="${x.k}">練習</button></div>`).join("")}</div>`
    : `<p class="muted small">文法を解いていくと,正答率の低い定理がここに出ます(3回以上解いた定理が対象).</p>`;
  const sec = (title, body, note) => `<section class="rsec"><h2>${title}</h2>${note ? `<p class="small muted rnote">${note}</p>` : ""}${body}</section>`;
  const tabs = `<div class="seg rtabs" role="tablist" aria-label="記録の種類">${Object.entries(REC_TABS).map(([k, v]) => `<button role="tab" data-rtab="${k}" aria-pressed="${recTab === k}" aria-selected="${recTab === k}">${v}</button>`).join("")}</div>`;
  let body = "";
  if (recTab === "score") body = `
    ${heroHTML()}
    ${toeicHTML()}
    <div class="ratings">${ratingCells()}</div>
    ${sec("レートの推移", `<div class="seg sm" role="group" aria-label="系列">${Object.keys(SERIES).map(k => `<button data-k="${k}" aria-pressed="${chartKey === k}">${SERIES[k]}</button>`).join("")}</div><div class="chart" id="chart"></div>`)}
    ${sec("本番の履歴", contestListHTML(H), S.contests.length > 30 ? "新しい30回を表示しています." : "")}
    ${sec("目標の点数", `<div class="row sform"><input type="number" id="goal-v" class="search" min="10" max="990" step="5" value="${toeicGoal()}" inputmode="numeric" aria-label="目標の点数"><button class="btn ghost" id="goal-set">変更する</button></div>`)}
    ${sec("実際の TOEIC の点数", `<div class="row sform"><input type="number" id="sc-score" class="search" min="10" max="990" step="5" placeholder="点数(10〜990)" inputmode="numeric" aria-label="点数"><input type="date" id="sc-date" class="search" value="${dateKey(Date.now())}" aria-label="受けた日"><button class="btn" id="sc-add">記録する</button></div>
      ${scoreRows ? `<div class="tscroll"><table><thead><tr><th>日付</th><th>実際</th><th>その時の推定</th><th>差</th><th></th></tr></thead><tbody>${scoreRows}</tbody></table></div>` : ""}`, "公式問題集や本番の点数を入れると,その日までの本番の出来と比べて,推定スコアを補正します(新しい記録ほど重く).")}
    ${S.legacy ? `<p class="small muted">旧方式(Elo)の本番 ${S.legacy.history.length} 回分の記録は,レート計算方式の変更により新しいレートには含めていません.</p>` : ""}`;
  else if (recTab === "study") body = `
    <div class="streak"><div><b>${sk.cur}</b><span>日連続</span></div><div><b>${sk.max}</b><span>最長連続</span></div><div><b>${sk.total}</b><span>学習日数</span></div></div>
    ${sec("草", `<div class="seg sm" role="group" aria-label="数える対象">${[["ac", "AC した数"], ["all", "解いた数"]].map(([k, v]) => `<button data-hm="${k}" aria-pressed="${hmKey === k}">${v}</button>`).join("")}</div>${heatmapHTML()}`)}
    ${sec("日ごとの記録", `${dailyControlsHTML()}<div class="chart" id="daily"></div><p class="small muted" id="daily-sum"></p>`)}
    ${sec("進捗(今 AC の問題)", progressHTML())}
    ${sec("苦手な定理", weakHTML)}`;
  else if (recTab === "badge") body = badgesHTML();
  else if (recTab === "est") body = sec("難易度の推定", estHTML());
  else body = `
    ${sec("端末間の同期", `<div id="sync-box">${syncHTML()}</div>`)}
    ${sec("データの引き継ぎ", `<div class="row"><button class="btn ghost" id="exp-btn">書き出す</button><label class="btn ghost" for="imp-file">読み込む</label><input type="file" id="imp-file" accept="application/json,.json" hidden></div>`, "進捗はこの端末のブラウザに保存されます.ログインしない場合は,書き出したファイルを別の端末で読み込むと,その端末の記録と合わせられます.")}
    ${sec("データの削除", `<div class="dels">${Object.entries(DELETE).map(([k, d]) => `<div class="del"><div><b>${d.name}</b><span class="small muted">${d.desc}</span></div><button class="btn ghost sm danger" data-del="${k}">削除</button></div>`).join("")}</div>`, "消したデータは元に戻せません.念のため,先に「書き出す」でバックアップを取っておくと安心です.")}`;
  m.innerHTML = tabs + body;
  m.querySelectorAll("[data-rtab]").forEach(b => b.onclick = () => { recTab = b.dataset.rtab; renderRecord(); toTop(); });
  m.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { chartKey = b.dataset.k; renderRecord(); });
  const on = (sel, f) => { const el = $(sel); if (el) el.onclick = f; };
  on("#exp-btn", exportData);
  m.querySelectorAll("[data-del]").forEach(b => b.onclick = () => deleteData(b.dataset.del));
  m.querySelectorAll("[data-hm]").forEach(b => b.onclick = () => { hmKey = b.dataset.hm; renderRecord(); });
  m.querySelectorAll("[data-dly]").forEach(b => b.onclick = () => {
    const [k, v] = b.dataset.dly.split(":"); DAILY[k] = k === "span" ? +v : v;
    b.parentNode.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    drawDaily($("#daily"));
  });
  m.querySelectorAll(".hm i[data-day]").forEach(c => c.onclick = () => { const el = $("#hm-info"); if (el) el.textContent = c.getAttribute("aria-label"); });
  const est = $("#est-toggle");
  const sh = $("#share-toggle");
  if (sh) sh.onchange = () => { S.prefs.share = sh.checked; save(); if (window.Sync) Sync.stats(true); toast(sh.checked ? "最初の解答をみんなの推定に使ってもらいます." : "最初の解答を送るのをやめ,送った分も消しました."); };
  if (est) est.onchange = () => { S.prefs.estD = est.checked; save(); applyEstD(); renderRecord(); toast(est.checked ? "推定した難易度を使います." : "元の難易度に戻しました."); };
  m.querySelectorAll("[data-estq]").forEach(b => b.onclick = () => { const x = Q_BY.get(b.dataset.estq); startSolve(x.dom, x.dom === "reading" ? Q_PASSAGE.get(x.q.id).id : x.q.id, null, "", "record"); });
  on("#sc-add", () => {
    const v = Math.round(+$("#sc-score").value / 5) * 5, d = $("#sc-date").value;
    if (!(v >= 10 && v <= 990) || !d) { toast("点数(10〜990)と日付を入れてください."); return; }
    S.scores = (S.scores || []).concat({ t: new Date(d + "T12:00:00").getTime(), score: v }); save(); renderRecord();
    toast(`${v} 点を記録しました.`);
  });
  m.querySelectorAll("[data-sdel]").forEach(b => b.onclick = () => {
    if (!confirm("この点数の記録を削除しますか?")) return;
    S.scores = S.scores.filter(x => String(x.t) !== b.dataset.sdel);
    S.del = Object.assign({}, S.del, { scores: [...((S.del && S.del.scores) || []), +b.dataset.sdel] }); // 他の端末から復活させない
    save(); renderRecord();
  });
  const imp = $("#imp-file"); if (imp) imp.onchange = e => { const f = e.target.files[0]; if (f) importData(f); };
  on("#goal-set", () => {
    const v = Math.round(+$("#goal-v").value / 5) * 5;
    if (!(v >= 10 && v <= 990)) { toast("10〜990 の点数を入れてください."); return; }
    S.goal = { v, t: Date.now() }; save(); renderRecord(); toast(`目標を ${v} 点にしました.`);
  });
  bindSync();
  bindGo();
  const box = $("#chart");
  if (box) { box.dataset.w = box.clientWidth; drawChart(box, chartKey); if (chartRO) chartRO.observe(box); }
  const dbox = $("#daily");
  if (dbox) { dbox.dataset.w = dbox.clientWidth; drawDaily(dbox); if (chartRO) chartRO.observe(dbox); }
}
/* 日ごとの記録:日ごとの解いた数・AC 数・新しく AC した数(初めて正解できた問題の数)を棒で並べる.分野で絞れる */
const DAILY = { span: 30, dom: "all", metric: "n" };
const DAILY_M = { n: "解いた数", ac: "AC 数", first: "新しく AC" };
function dailyControlsHTML() {
  const seg = (k, opts, label) => `<div class="seg sm" role="group" aria-label="${label}">${opts.map(([v, t]) => `<button data-dly="${k}:${v}" aria-pressed="${String(DAILY[k]) === String(v)}">${t}</button>`).join("")}</div>`;
  return `<div class="dctl">
    ${seg("metric", Object.entries(DAILY_M), "数える対象")}
    ${seg("dom", [["all", "すべて"], ...Object.entries(DOMAINS)], "分野")}
    ${seg("span", [[14, "2週"], [30, "30日"], [90, "90日"]], "期間")}
  </div>`;
}
function dailyData() {
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const keys = [];
  for (let i = DAILY.span - 1; i >= 0; i--) keys.push(dateKey(today.getTime() - i * DAY));
  const idx = new Map(keys.map((k, i) => [k, i])), v = keys.map(() => 0), firstAC = new Set();
  for (const [id, t, ok] of S.att) {
    const x = Q_BY.get(id); if (!x) continue;
    const first = ok && !firstAC.has(id); // 初めて AC した解答か(分野で絞る前に,全体の順で判定する)
    if (ok) firstAC.add(id);
    if (DAILY.dom !== "all" && x.dom !== DAILY.dom) continue;
    const i = idx.get(dateKey(t)); if (i == null) continue;
    if (DAILY.metric === "n" || (DAILY.metric === "ac" && ok) || (DAILY.metric === "first" && first)) v[i]++;
  }
  // 「すべて」の解いた数・AC 数は,解答の履歴がない古い記録も含む日ごとの数(days / dayAc)が大きければそちらを使う
  if (DAILY.dom === "all" && DAILY.metric !== "first") {
    const src = DAILY.metric === "n" ? S.days : S.dayAc;
    keys.forEach((k, i) => { v[i] = Math.max(v[i], src[k] || 0); });
  }
  return keys.map((k, i) => ({ k, t: new Date(k + "T12:00:00").getTime(), v: v[i] }));
}
function drawDaily(box) {
  if (!box) return;
  const data = dailyData(), NS = "http://www.w3.org/2000/svg";
  const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.append(e); return e; };
  box.innerHTML = "";
  const W = Math.max(280, box.clientWidth), H = 190, M = { l: 30, r: 4, t: 12, b: 22 };
  const max = Math.max(0, ...data.map(d => d.v));
  const top = [5, 10, 20, 30, 50, 100, 150, 200, 300, 500, 1000].find(x => x >= max) || Math.ceil(max / 500) * 500;
  const step = (W - M.l - M.r) / data.length, bw = Math.max(2, step - 2); // 棒どうしに 2px のすき間
  const y = v => M.t + (1 - v / top) * (H - M.t - M.b), base = y(0);
  const label = `${DAILY_M[DAILY.metric]}(${DAILY.dom === "all" ? "すべて" : DOMAINS[DAILY.dom]})`;
  const svg = el("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", tabindex: "0", "aria-label": `日ごとの${label}.直近${DAILY.span}日` }, box);
  [0, top / 2, top].forEach(v => {
    el("line", { x1: M.l, x2: W - M.r, y1: y(v), y2: y(v), stroke: "var(--line)", "stroke-width": 1 }, svg);
    el("text", { x: M.l - 6, y: y(v) + 4, "text-anchor": "end", class: "ax" }, svg).textContent = v;
  });
  // 日付の目盛り:今日から数えて一定の間隔で
  const every = DAILY.span <= 14 ? 2 : DAILY.span <= 30 ? 7 : 14;
  data.forEach((d, i) => {
    if ((data.length - 1 - i) % every) return;
    el("text", { x: M.l + step * i + step / 2, y: H - 6, "text-anchor": i === data.length - 1 ? "end" : "middle", class: "ax" }, svg).textContent = fmtDate(d.t);
  });
  // 棒:上だけ角を丸め(4px),下は基準線にそろえる
  const bars = data.map((d, i) => {
    if (!d.v) return null;
    const x0 = M.l + step * i + (step - bw) / 2, y0 = y(d.v), h = base - y0, r = Math.min(4, bw / 2, h);
    return el("path", { d: `M${x0},${base}V${y0 + r}Q${x0},${y0} ${x0 + r},${y0}H${x0 + bw - r}Q${x0 + bw},${y0} ${x0 + bw},${y0 + r}V${base}Z`, fill: "var(--accent)", "fill-opacity": i === data.length - 1 ? 1 : 0.85 }, svg);
  });
  const tip = document.createElement("div"); tip.className = "tip"; tip.hidden = true; box.append(tip);
  let cur = -1;
  const show = i => {
    cur = i; const d = data[i];
    bars.forEach((b, j) => b && b.setAttribute("fill-opacity", j === i ? 1 : 0.55));
    tip.replaceChildren();
    const v = document.createElement("div"); v.className = "tv"; v.textContent = d.v;
    const s1 = document.createElement("div"); s1.className = "small muted"; s1.textContent = `${fmtDate(d.t)}(${"日月火水木金土"[new Date(d.t).getDay()]}) · ${label}`;
    tip.append(v, s1); tip.hidden = false;
    const cx = M.l + step * i + step / 2, tw = tip.offsetWidth;
    tip.style.left = Math.min(Math.max(cx - tw / 2, 0), W - tw) + "px";
    tip.style.top = Math.max(0, y(d.v) - tip.offsetHeight - 10) + "px";
  };
  const hide = () => { cur = -1; bars.forEach((b, j) => b && b.setAttribute("fill-opacity", j === data.length - 1 ? 1 : 0.85)); tip.hidden = true; };
  // 棒が細くても押しやすいよう,列の幅全体で反応させる
  const pick = ev => { const r = svg.getBoundingClientRect(); return Math.min(data.length - 1, Math.max(0, Math.floor((ev.clientX - r.left - M.l) / step))); };
  svg.addEventListener("pointermove", ev => show(pick(ev)));
  svg.addEventListener("pointerdown", ev => show(pick(ev)));
  svg.addEventListener("pointerleave", hide);
  svg.addEventListener("focus", () => show(data.length - 1));
  svg.addEventListener("blur", hide);
  svg.addEventListener("keydown", ev => {
    if (ev.key === "ArrowLeft" && cur > 0) { show(cur - 1); ev.preventDefault(); }
    if (ev.key === "ArrowRight" && cur < data.length - 1) { show(cur + 1); ev.preventDefault(); }
  });
  // 数字でも読めるように(グラフを見なくても分かる要約)
  const sum = data.reduce((a, d) => a + d.v, 0), active = data.filter(d => d.v).length, best = data.reduce((a, d) => (d.v > a.v ? d : a), data[0]);
  const unit = DAILY.metric === "first" && DAILY.dom === "word" ? "語" : "問";
  $("#daily-sum").textContent = sum
    ? `直近${DAILY.span}日:合計 ${sum} ${unit} · 学習した日 ${active} 日 · 1日平均 ${(sum / DAILY.span).toFixed(1)} ${unit} · 最多 ${best.v} ${unit}(${fmtDate(best.t)}).${DAILY.metric === "first" ? "「新しく AC」は,その日に初めて正解できた問題の数です." : ""}`
    : `直近${DAILY.span}日の記録はまだありません.`;
}

/* 草:日ごとの AC 数(または解いた数)を色の濃さで並べる.列が週,行が曜日(日〜土).直近26週 */
let hmKey = "ac";
const HM_WEEKS = 26, HM_LV = [1, 5, 10, 20]; // 色の段階の境目(AtCoder Problems の草に近い区切り)
function heatmapHTML() {
  const src = hmKey === "ac" ? S.dayAc : S.days;
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const start = new Date(today.getTime() - ((HM_WEEKS - 1) * 7 + today.getDay()) * DAY);
  const cells = [], months = [];
  let total = 0, active = 0, best = 0;
  for (let w = 0; w < HM_WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const t = start.getTime() + (w * 7 + d) * DAY, k = dateKey(t), n = src[k] || 0;
      if (t > today.getTime()) { cells.push(`<i class="out"></i>`); continue; }
      total += n; if (n) active++; best = Math.max(best, n);
      const lv = HM_LV.filter(x => n >= x).length;
      const label = `${fmtDate(t)}(${"日月火水木金土"[d]}):${hmKey === "ac" ? "AC" : "解いた数"} ${n}${hmKey === "ac" ? "" : ` · AC ${S.dayAc[k] || 0}`}`;
      cells.push(`<i class="l${lv}" data-day="${k}" aria-label="${label}" title="${label}"></i>`);
      if (d === 0 && new Date(t).getDate() <= 7) months.push(`<span style="grid-column:${w + 1}">${new Date(t).getMonth() + 1}月</span>`);
    }
  }
  return `<div class="hmwrap"><div class="hmm" style="grid-template-columns:repeat(${HM_WEEKS},1fr)">${months.join("")}</div>
    <div class="hm" style="grid-template-columns:repeat(${HM_WEEKS},1fr)">${cells.join("")}</div>
    <div class="hmleg"><span class="small muted" id="hm-info">マスを押すと,その日の数が出ます.</span><span class="small muted">少 <i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> 多</span></div></div>
    <p class="small muted">直近${HM_WEEKS}週で ${total} ${hmKey === "ac" ? "AC" : "問"} · ${active} 日 · 1日の最高 ${best}.${hmKey === "ac" ? "色の濃さは 1 / 5 / 10 / 20 問以上." : ""}</p>`;
}
function estHTML() {
  const E = estimateD(), rows = [];
  for (const dom of Object.keys(DOMAINS)) {
    const x = E.dom[dom];
    const cnt = `自分の最初の解答 ${x.n} 件${x.pool ? ` · みんなの解答 ${x.pool} 件` : ""}`;
    if (!x.ok) { rows.push(`<p class="small muted">${DOMAINS[dom]}:${cnt}(合わせて ${MIN_ATT} 件たまると推定します).</p>`); continue; }
    if (!x.bands.length) { rows.push(`<h3 class="esth">${DOMAINS[dom]} <span class="small muted">${cnt}</span></h3><p class="small muted">みんなの解答から推定しています(色帯ごとの比較は,自分の最初の解答が ${MIN_ATT} 件たまると出ます).</p>`); continue; }
    rows.push(`<h3 class="esth">${DOMAINS[dom]} <span class="small muted">${cnt}</span></h3>
      <div style="overflow-x:auto"><table class="estt"><thead><tr><th>色帯</th><th>問題</th><th>予想の正答率</th><th>実際</th><th></th></tr></thead><tbody>${x.bands.map(b => {
        const diff = b.act - b.exp, note = b.n < 10 ? `<span class="muted">少ない</span>` : diff <= -0.15 ? `<span class="down">見積もりより難しい</span>` : diff >= 0.15 ? `<span class="up">見積もりより易しい</span>` : "おおむね妥当";
        return `<tr><td><span class="dot" style="--rc:var(${b.t.color})"></span>${b.t.name}</td><td>${b.n}</td><td>${Math.round(100 * b.exp)}%</td><td>${Math.round(100 * b.act)}%</td><td class="small">${note}</td></tr>`;
      }).join("")}</tbody></table></div>`);
  }
  const G = E.dom.grammar.ok ? E.dom.grammar.groups.filter(g => Math.abs(g.shift) >= 50).sort((a, b) => Math.abs(b.shift) - Math.abs(a.shift)).slice(0, 8) : [];
  const thmList = G.length ? `<h3 class="esth">見積もりがずれている定理</h3><div class="weak">${G.map(g => `<div class="wrow"><span class="wn">${esc(THM[g.k].name)}</span><span class="small ${g.shift > 0 ? "down" : "up"}">${g.shift > 0 ? "+" : ""}${g.shift}(${g.shift > 0 ? "難しい" : "易しい"})</span><button class="btn ghost sm" data-go="thm" data-thm="${g.k}">練習</button></div>`).join("")}</div>` : "";
  const big = [...E.items].filter(([, e]) => E.dom[e.dom].ok && Math.abs(e.est - e.d0) >= 100).sort((a, b) => Math.abs(b[1].est - b[1].d0) - Math.abs(a[1].est - a[1].d0)).slice(0, 15);
  const name = id => { const { dom, q } = Q_BY.get(id); return dom === "word" ? `<span class="en">${esc(q.w)}</span>` : dom === "grammar" ? `G${id.slice(1)} ${esc(THM[q.t].name)}` : `${id.toUpperCase().replace("Q", " 問")}`; };
  const list = big.length ? `<h3 class="esth">見積もりと大きく違う問題</h3><div class="estlist">${big.map(([id, e]) => `<button class="chip" data-estq="${id}"><span class="dot" style="${rc(e.est)}"></span><span class="cl">${name(id)}</span><span class="cd">${e.d0} → <b>${e.est}</b> ${e.n > 1 ? `${e.n}件` : e.ok ? "AC" : "WA"}</span></button>`).join("")}</div>` : "";
  const share = window.Sync && Sync.state().user ? `<label class="estsw"><input type="checkbox" id="share-toggle" ${S.prefs.share !== false ? "checked" : ""}> 自分の最初の解答をみんなの推定に使ってもらう <span class="small muted">(名前やメールアドレスは送りません.送るのは問題ごとの最初の正誤と,そのときの実力の推定値だけです)</span></label>` : `<p class="small muted">ログインすると,ログインしている人どうしで最初の解答を持ち寄り,人数が増えるほど細かく正確に難易度を推定します(名前やメールアドレスは送りません).</p>`;
  return `<p class="small muted">各問題の最初の解答と,その時点の実力から,問題の難易度を推定し直します(AtCoder Problems の difficulty と同じ考え方).自分の分に,ログインしている人たちの分(${E.users} 人)を足して推定します.人数が少ないうちは,1問ごとの推定は元の値から少ししか動きません.</p>
    ${rows.join("")}${thmList}${list}
    <label class="estsw"><input type="checkbox" id="est-toggle" ${useEstD() ? "checked" : ""}> 推定した難易度を使う <span class="small muted">(問題一覧の色・おまかせ・本番の出題とパフォーマンスに反映.いつでも戻せます.設定していなければ,みんなの解答が2人分以上集まったときに自動で使います)</span></label>
    ${share}`;
}
/* レートの推移グラフ(1系列.背景は色の帯,点はその時点の色) */
function drawChart(box, key) {
  const h = history(key);
  box.innerHTML = "";
  if (!h.length) { box.innerHTML = `<p class="muted small">本番を1回解くと,ここに日付ごとのレートが表示されます.</p>`; return; }
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.append(e); return e; };
  const W = Math.max(280, box.clientWidth), H = 240, M = { l: 40, r: 14, t: 10, b: 26 };
  const top = Math.max(800, Math.ceil((Math.max(...h.map(x => x.rating)) + 100) / 400) * 400);
  let t0 = h[0].t, t1 = h[h.length - 1].t;
  if (t1 - t0 < DAY) { t0 -= DAY / 2; t1 += DAY / 2; }
  const x = t => M.l + (t - t0) / (t1 - t0) * (W - M.l - M.r);
  const y = r => M.t + (1 - r / top) * (H - M.t - M.b);
  const svg = el("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: "img", tabindex: "0",
    "aria-label": `${SERIES[key]}レートの推移.最新 ${h[h.length - 1].rating}.表は本番の履歴を参照` }, box);
  TIERS.forEach((t, i) => {
    const hi = Math.min(TIERS[i + 1] ? TIERS[i + 1].min : top, top);
    if (t.min >= top) return;
    el("rect", { x: M.l, y: y(hi), width: W - M.l - M.r, height: y(t.min) - y(hi), fill: `var(${t.color})`, "fill-opacity": 0.12 }, svg);
  });
  for (let r = 0; r <= top; r += 400) {
    el("line", { x1: M.l, x2: W - M.r, y1: y(r), y2: y(r), stroke: "var(--line)", "stroke-width": 1 }, svg);
    el("text", { x: M.l - 6, y: y(r) + 4, "text-anchor": "end", class: "ax" }, svg).textContent = r;
  }
  if (key === "all") { // 目標の目安(緑 = TOEIC 550点)
    el("line", { x1: M.l, x2: W - M.r, y1: y(800), y2: y(800), stroke: "var(--r-green)", "stroke-width": 1.5, "stroke-dasharray": "5 4" }, svg);
    el("text", { x: W - M.r - 4, y: y(800) - 5, "text-anchor": "end", class: "ax" }, svg).textContent = `TOEIC 550 の目安`;
  }
  const nt = Math.min(4, h.length);
  for (let i = 0; i < nt; i++) {
    const t = nt === 1 ? h[0].t : t0 + (t1 - t0) * i / (nt - 1);
    el("text", { x: x(t), y: H - 6, "text-anchor": i === 0 && nt > 1 ? "start" : i === nt - 1 && nt > 1 ? "end" : "middle", class: "ax" }, svg).textContent = fmtDate(t);
  }
  el("path", { d: h.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.rating).toFixed(1)}`).join(""), fill: "none", stroke: "var(--ink)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-opacity": 0.75 }, svg);
  const cross = el("line", { y1: M.t, y2: H - M.b, stroke: "var(--muted)", "stroke-width": 1, visibility: "hidden" }, svg);
  const dots = h.map(p => el("circle", { cx: x(p.t), cy: y(p.rating), r: 4.5, fill: `var(${tierOf(p.rating).color})`, stroke: "var(--surface)", "stroke-width": 2 }, svg));
  const tip = document.createElement("div"); tip.className = "tip"; tip.hidden = true; box.append(tip);
  let cur = -1;
  const show = i => {
    cur = i; const p = h[i], px = x(p.t);
    cross.setAttribute("x1", px); cross.setAttribute("x2", px); cross.setAttribute("visibility", "visible");
    dots.forEach((d, j) => d.setAttribute("r", j === i ? 6 : 4.5));
    tip.replaceChildren();
    const v = document.createElement("div"); v.className = "tv"; v.textContent = p.rating;
    const s1 = document.createElement("div"); s1.className = "small muted"; s1.textContent = `${new Date(p.t).toLocaleDateString("ja-JP")} · ${SERIES[key]}`;
    const s2 = document.createElement("div"); s2.className = "small"; s2.textContent = `パフォーマンス ${p.perf}` + (p.prev != null ? ` · ${p.rating - p.prev >= 0 ? "+" : ""}${p.rating - p.prev}` : "");
    tip.append(v, s1, s2); tip.hidden = false;
    const tw = tip.offsetWidth;
    tip.style.left = Math.min(Math.max(px - tw / 2, 0), W - tw) + "px";
    tip.style.top = Math.max(0, y(p.rating) - tip.offsetHeight - 12) + "px";
  };
  const hide = () => { cur = -1; cross.setAttribute("visibility", "hidden"); dots.forEach(d => d.setAttribute("r", 4.5)); tip.hidden = true; };
  const nearest = ev => {
    const r = svg.getBoundingClientRect(), mx = ev.clientX - r.left;
    let best = 0; h.forEach((p, i) => { if (Math.abs(x(p.t) - mx) < Math.abs(x(h[best].t) - mx)) best = i; });
    return best;
  };
  svg.addEventListener("pointermove", ev => show(nearest(ev)));
  svg.addEventListener("pointerdown", ev => show(nearest(ev)));
  svg.addEventListener("pointerleave", hide);
  svg.addEventListener("focus", () => show(h.length - 1));
  svg.addEventListener("blur", hide);
  svg.addEventListener("keydown", ev => {
    if (ev.key === "ArrowLeft" && cur > 0) { show(cur - 1); ev.preventDefault(); }
    if (ev.key === "ArrowRight" && cur < h.length - 1) { show(cur + 1); ev.preventDefault(); }
  });
}
// 幅が変わったら描き直す(端末の回転など)
const chartRO = typeof ResizeObserver === "function" ? new ResizeObserver(entries => {
  for (const e of entries) {
    const w = Math.round(e.contentRect.width);
    if (e.target.isConnected && w && w !== +e.target.dataset.w) { e.target.dataset.w = w; e.target.id === "daily" ? drawDaily(e.target) : drawChart(e.target, chartKey); }
  }
}) : null;
