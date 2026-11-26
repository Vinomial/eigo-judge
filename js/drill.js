"use strict";
/* 英語ジャッジ:解き直し・復習・未挑戦(練習モードの入口)
 *   - 間違えた問題(最後の結果が WA):総合(全分野を古い順に混ぜる)か,分野ごとに解き直す
 *   - 復習の時期が来た問題:単語と文法の間隔反復(S.srs)で,復習の日が来たもの
 *   - 未挑戦の問題:まだ一度も解いていない問題を,今の実力に近い難易度から
 *   - 苦手な単語:取り違えやすい語と一緒に(solve.js の startWeakWords)
 * どれも1回 DRILL_N 問(長文は DRILL_P 題)まで.
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

const DRILL_N = 20, DRILL_P = 5;
const DRILL_DOMS = { all: "総合", word: "単語", grammar: "文法", reading: "長文" };
const lastT = id => (S.res[id] && S.res[id].t) || 0;

// 間違えた問題(古い順).dom が all なら全分野を混ぜる
function waQueue(dom = "all") {
  const out = [];
  if (dom === "all" || dom === "word") out.push(...WORDS.filter(w => statusOf(w.id) === "WA").map(w => ({ dom: "word", id: w.id, t: lastT(w.id) })));
  if (dom === "all" || dom === "grammar") out.push(...GRAM.filter(q => statusOf(q.id) === "WA").map(q => ({ dom: "grammar", id: q.id, t: lastT(q.id) })));
  if (dom === "all" || dom === "reading") out.push(...READING.filter(p => passageStatus(p) === "WA").map(p => ({ dom: "reading", id: p.id, t: Math.max(...p.qs.map(q => lastT(q.id))) })));
  return out.sort((a, b) => a.t - b.t);
}
// 復習の時期が来た問題(単語と文法.復習の日の早い順)
function dueQueue(dom = "all") {
  const now = Date.now(), out = [];
  const add = (d, list) => list.forEach(q => { const s = S.srs[q.id]; if (s && s.due <= now) out.push({ dom: d, id: q.id, t: s.due }); });
  if (dom === "all" || dom === "word") add("word", WORDS);
  if (dom === "all" || dom === "grammar") add("grammar", GRAM);
  return out.sort((a, b) => a.t - b.t);
}
// 未挑戦の問題(今の実力に近い難易度から).総合は単語・文法・長文を交互に並べる
function unseenQueue(dom = "all") {
  const near = (list, key) => list.map(q => ({ q, s: Math.abs(q.d - estimate(key)) + Math.random() * 150 })).sort((a, b) => a.s - b.s).map(x => x.q);
  const w = () => near(WORDS.filter(q => !S.res[q.id]), "word").map(q => ({ dom: "word", id: q.id }));
  const g = () => near(GRAM.filter(q => !S.res[q.id]), "grammar").map(q => ({ dom: "grammar", id: q.id }));
  const r = () => near(READING.filter(p => !passageStatus(p)).map(p => ({ id: p.id, d: passageD(p) })), "reading").map(p => ({ dom: "reading", id: p.id }));
  if (dom === "word") return w();
  if (dom === "grammar") return g();
  if (dom === "reading") return r();
  // 総合:単語2・文法2・長文1 の割合で混ぜる
  const W = w(), G = g(), R = r(), out = [];
  while (W.length || G.length || R.length) {
    out.push(...W.splice(0, 2), ...G.splice(0, 2), ...R.splice(0, 1));
  }
  return out;
}
const unseenCount = dom => dom === "word" ? WORDS.filter(q => !S.res[q.id]).length : dom === "grammar" ? GRAM.filter(q => !S.res[q.id]).length
  : dom === "reading" ? READING.filter(p => !passageStatus(p)).length : unseenCount("word") + unseenCount("grammar") + unseenCount("reading");

const DRILLS = {
  wa: { name: "間違えた問題", q: waQueue, empty: "間違えた問題はありません." },
  due: { name: "復習の時期", q: dueQueue, empty: "復習の時期が来た問題はありません." },
  new: { name: "未挑戦", q: unseenQueue, empty: "未挑戦の問題はありません." }
};
// 1回分(問題は DRILL_N まで,長文は DRILL_P 題まで)を作って解き始める
function startDrill(kind, dom = "all", from = "drill") {
  const D = DRILLS[kind], all = D.q(dom), q = [];
  let p = 0;
  for (const x of all) {
    if (q.length >= DRILL_N) break;
    if (x.dom === "reading") { if (p >= DRILL_P) continue; p++; }
    q.push({ dom: x.dom, id: x.id });
  }
  if (!q.length) { toast(D.empty); return; }
  startQueue(q, q[0].dom, q[0].id, `${D.name}(${DRILL_DOMS[dom]})`, from);
}
// 互換:前のホームの「WA を解き直す」
function startWaReview(dom = "all") { startDrill("wa", dom, "home"); }

/* ---------------- 難易度を選んでランダム ----------------
 * 難易度の幅 [lo, hi] と対象(未 AC / 未挑戦 / すべて)から,ランダムに1回分を出す.問題一覧の色帯の「ランダム」もこれを使う. */
const RND_TGT = { notac: "未 AC", new: "未挑戦", all: "すべて" };
function rangeUnits(dom, lo, hi, tgt) {
  const inR = d => d >= lo && d <= hi;
  const okS = s => tgt === "all" || (tgt === "notac" && s !== "AC") || (tgt === "new" && !s);
  const out = [];
  if (dom === "all" || dom === "word") out.push(...WORDS.filter(q => inR(q.d) && okS(statusOf(q.id))).map(q => ({ dom: "word", id: q.id })));
  if (dom === "all" || dom === "grammar") out.push(...GRAM.filter(q => inR(q.d) && okS(statusOf(q.id))).map(q => ({ dom: "grammar", id: q.id })));
  if (dom === "all" || dom === "reading") out.push(...READING.filter(p => inR(passageD(p)) && okS(passageStatus(p))).map(p => ({ dom: "reading", id: p.id })));
  return out;
}
function startRandom(dom, lo, hi, tgt, from = "drill", label = "") {
  let list = shuffle(rangeUnits(dom, lo, hi, tgt));
  if (dom === "all") { // 総合は単語2・文法2・長文1 の割合で混ぜる(長文ばかりにならないように)
    const by = d => list.filter(x => x.dom === d), W = by("word"), G = by("grammar"), R = by("reading");
    list = [];
    while (W.length || G.length || R.length) list.push(...W.splice(0, 2), ...G.splice(0, 2), ...R.splice(0, 1));
  }
  const q = []; let p = 0;
  for (const x of list) {
    if (q.length >= DRILL_N) break;
    if (x.dom === "reading") { if (p >= DRILL_P) continue; p++; }
    q.push(x);
  }
  if (!q.length) { toast("この範囲に当てはまる問題はありません."); return; }
  startQueue(q, q[0].dom, q[0].id, label || `ランダム ${lo}〜${hi}(${RND_TGT[tgt]})`, from);
}
// 選んだ幅と対象は端末ごとに覚える.初めは今の実力の前後
function rndPref() {
  const e = Math.round(estimate("all") / 100) * 100;
  return Object.assign({ dom: "all", lo: Math.max(0, e - 200), hi: e + 200, tgt: "notac" }, S.prefs.rnd || {});
}
function rndHTML() {
  const r = rndPref(), n = rangeUnits(r.dom, r.lo, r.hi, r.tgt).length;
  const opts = v => Array.from({ length: 33 }, (_, i) => i * 100).map(x => `<option value="${x}"${x === v ? " selected" : ""}>${x}</option>`).join("");
  const seg = (k, list) => `<div class="seg sm" role="group">${list.map(([v, t]) => `<button data-rd="${k}:${v}" aria-pressed="${r[k] === v}">${t}</button>`).join("")}</div>`;
  return `<section class="rsec drill" id="rnd"><h2>難易度を選んでランダム</h2>
    <p class="small muted rnote">難易度の幅と対象を選ぶと,その中からランダムに出します(1回 ${DRILL_N} 問まで,長文は ${DRILL_P} 題まで).色を押すと,その色の幅になります.</p>
    ${seg("dom", Object.entries(DRILL_DOMS))}
    <div class="rndtiers">${TIERS.map((t, i) => { const hi = TIERS[i + 1] ? TIERS[i + 1].min - 1 : 3200; return `<button class="rtier${r.lo === t.min && r.hi === hi ? " on" : ""}" data-rt="${t.min}:${hi}"><span class="dot" style="--rc:var(${t.color})"></span>${t.name}</button>`; }).join("")}</div>
    <div class="row rndrange"><label class="small muted" for="rnd-lo">難易度</label><select id="rnd-lo" aria-label="下限">${opts(r.lo)}</select><span>〜</span><select id="rnd-hi" aria-label="上限">${opts(r.hi)}</select></div>
    ${seg("tgt", Object.entries(RND_TGT))}
    <div class="row" style="margin-top:8px"><button class="btn grow" id="rnd-go"${n ? "" : " disabled"}>ランダムに解く</button><span class="small muted" id="rnd-n">対象 ${n} 問</span></div>
  </section>`;
}
function bindRnd() {
  const box = $("#rnd"); if (!box) return;
  const set = o => {
    const r = Object.assign(rndPref(), o);
    if (r.lo > r.hi) [r.lo, r.hi] = [r.hi, r.lo];
    S.prefs.rnd = r; save();
    box.outerHTML = rndHTML(); bindRnd();
  };
  box.querySelectorAll("[data-rd]").forEach(b => b.onclick = () => { const [k, v] = b.dataset.rd.split(":"); set({ [k]: v }); });
  box.querySelectorAll("[data-rt]").forEach(b => b.onclick = () => { const [lo, hi] = b.dataset.rt.split(":").map(Number); set({ lo, hi }); });
  $("#rnd-lo").onchange = e => set({ lo: +e.target.value });
  $("#rnd-hi").onchange = e => set({ hi: +e.target.value });
  $("#rnd-go").onclick = () => { const r = rndPref(); startRandom(r.dom, r.lo, r.hi, r.tgt, "drill"); };
}

/* 画面:解き直し・未挑戦 */
function drillHTML() {
  const row = (kind, title, note, doms, count) => `<section class="rsec drill"><h2>${title}</h2><p class="small muted rnote">${note}</p>
    <div class="dgrid">${doms.map(d => { const n = count(d); return `<button class="dbtn" data-drill="${kind}:${d}" ${n ? "" : "disabled"}><b>${DRILL_DOMS[d]}</b><span>${n} ${d === "reading" ? "題" : "問"}</span></button>`; }).join("")}</div></section>`;
  const weak = weakWords().length;
  return `<div class="shophead"><div><div class="lab">練習モード</div><b class="dtitle">解き直し・復習・未挑戦</b></div><button class="btn ghost sm" data-go="home">← ホーム</button></div>
    ${row("wa", "間違えた問題", `最後の結果が WA の問題を,古いものから解き直します(1回 ${DRILL_N} 問まで).総合は全分野を混ぜます.`, ["all", "word", "grammar", "reading"], d => waQueue(d).length)}
    ${row("due", "復習の時期が来た問題", "単語と文法は,間違えた問題を10分後,正解した問題を1・2・4・8・16・32日後にもう一度出します.", ["all", "word", "grammar"], d => dueQueue(d).length)}
    ${row("new", "未挑戦の問題", "まだ一度も解いていない問題を,今の実力に近い難易度から出します.総合は単語2・文法2・長文1の割合で混ぜます.", ["all", "word", "grammar", "reading"], unseenCount)}
    ${rndHTML()}
    <section class="rsec drill"><h2>苦手な単語</h2><p class="small muted rnote">何度も間違えている単語を,取り違えやすい語と並べて解き直します.</p>
      <div class="dgrid"><button class="dbtn" data-go="weak" ${weak ? "" : "disabled"}><b>苦手な単語</b><span>${weak} 語</span></button></div></section>`;
}
function bindDrill() {
  $$("[data-drill]").forEach(b => b.onclick = () => { const [k, d] = b.dataset.drill.split(":"); startDrill(k, d, "drill"); });
  bindRnd();
}
