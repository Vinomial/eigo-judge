"use strict";
/* 英語ジャッジ:本番モード
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 本番モード ---------------- */
function startContest(kind = "all") {
  const K = CONTESTS[kind];
  // 最近3回の本番に出た問題と,今 AC の問題を避ける
  const recent = new Set(S.contests.slice(-3).flatMap(c => c.items.map(x => x.id)));
  const pen = id => (recent.has(id) ? 400 : 0) + (statusOf(id) === "AC" ? 150 : 0);
  const passages = READING.map(p => ({ id: p.id, d: passageD(p) }));
  const pps = K.reading ? pickNear(passages, estimate("reading"), K.reading, u => (p => (p.qs.some(q => recent.has(q.id)) ? 400 : 0) + (passageStatus(p) === "AC" ? 150 : 0))(PASS_BY.get(u.id))) : [];
  const items = [
    ...(K.word ? pickNear(WORDS, estimate("word"), K.word, q => pen(q.id)).map(q => ({ dom: "word", q })) : []),
    ...(K.grammar ? pickNear(GRAM, estimate("grammar"), K.grammar, q => pen(q.id)).map(q => ({ dom: "grammar", q })) : []),
    ...pps.flatMap(u => { const p = PASS_BY.get(u.id); return p.qs.map(q => ({ dom: "reading", q, p })); })
  ];
  cState = { kind, items, sts: items.map(it => newSt(it, true)), i: 0, end: Date.now() + K.sec * 1000, done: false, confirming: false };
  stopTimer(); timerId = setInterval(contestTick, 1000);
  persistContest();
  renderContest();
}
function persistContest() {
  S.live = contestRunning() ? {
    items: cState.items.map(it => ({ dom: it.dom, id: it.q.id })),
    sts: cState.sts.map(s => ({ sel: s.sel, choices: s.choices, rev: s.rev, order: s.order })),
    i: cState.i, end: cState.end, kind: cState.kind
  } : null;
  save();
}
// 起動時:途中の本番があれば再開する.時間切れなら採点する
function restoreContest() {
  const L = S.live;
  if (!L) return;
  try {
    const items = L.items.map(({ dom, id }) => {
      if (dom === "word") return { dom, q: WORD_BY.get(id) };
      if (dom === "grammar") return { dom, q: GRAM_BY.get(id) };
      const p = Q_PASSAGE.get(id);
      return { dom, q: p.qs.find(q => q.id === id), p };
    });
    if (items.some(it => !it.q)) throw new Error("missing");
    cState = { kind: L.kind || "all", items, sts: L.sts.map(s => ({ sel: s.sel, choices: s.choices, rev: s.rev, order: s.order })), i: L.i || 0, end: L.end, done: false, confirming: false };
    view = "contest";
    if (Date.now() >= L.end) { finishContest(); setTimeout(() => toast("前回の本番は時間切れだったので採点しました."), 300); }
    else timerId = setInterval(contestTick, 1000);
  } catch (e) { cState = null; S.live = null; save(); }
}
function contestTick() {
  if (!contestRunning()) { stopTimer(); return; }
  const left = (cState.end - Date.now()) / 1000;
  const el = $("#timer");
  if (el) { el.textContent = `残り ${fmtSec(left)}`; el.classList.toggle("low", left <= 60); }
  if (left <= 0) { finishContest(); if (view === "contest") renderContest(); }
}
function finishContest() {
  if (!contestRunning()) return;
  stopTimer();
  cState.done = true;
  const t = Date.now();
  const items = cState.items.map((it, i) => ({ id: it.q.id, dom: it.dom, d: it.q.d, ok: isCorrect(it, cState.sts[i]) ? 1 : 0 }));
  const before = {};
  Object.keys(SERIES).forEach(k => before[k] = ratingOf(k));
  // 総合の本番だけが総合レートを動かす.分野別の本番はその分野のパフォーマンスだけを持つ
  const perf = { all: cState.kind === "all" ? Rating.performance(items) : null };
  Object.keys(DOMAINS).forEach(k => perf[k] = Rating.performance(items.filter(x => x.dom === k)));
  items.forEach(x => { record(x.id, !!x.ok, t); if (x.dom === "word") updateSrs(x.id, !!x.ok); });
  S.contests.push({ t, kind: cState.kind, items, perf });
  const after = {};
  Object.keys(SERIES).forEach(k => after[k] = ratingOf(k));
  cState.res = items.map(x => !!x.ok);
  cState.sum = { before, after, perf };
  S.live = null;
  save();
  renderHeader();
  checkBadges();
}
const unanswered = () => cState.sts.filter(s => s.sel == null).length;

function renderContest() {
  const m = $("#main");
  if (!cState) {
    m.innerHTML = `
      <p style="margin-top:0"><b>本番モード</b>:今の実力に近い難易度から出題します.種類を選んでください.</p>
      <div class="kinds">${Object.entries(CONTESTS).map(([k, K]) => {
        const r = ratingOf(k);
        return `<button class="kind${k === "all" ? " main" : ""}" data-kind="${k}"><b>${K.name}</b><span>${K.desc}</span><span class="small">${SERIES[k]}レート ${r == null ? "-" : r}</span></button>`;
      }).join("")}</div>
      <p class="small muted">総合の本番は総合レートと各分野のレート,分野別の本番はその分野のレートだけが動きます.推定 TOEIC スコアは総合の本番から計算します.</p>
      <p class="small muted">解答中は正誤を表示しません.「わからない」を選ぶと WA になりますが,当てずっぽうより正確に実力を測れます.時間切れになるとその時点で採点します.</p>`;
    m.querySelectorAll("[data-kind]").forEach(b => b.onclick = () => startContest(b.dataset.kind));
    return;
  }
  if (cState.done) {
    m.innerHTML = contestResultHTML();
    $("#again-btn").onclick = () => { const k = cState.kind; cState = null; startContest(k); };
    $("#kinds-btn").onclick = () => { cState = null; renderContest(); };
    $$("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
    return;
  }
  const i = cState.i, item = cState.items[i], st = cState.sts[i], n = cState.items.length;
  const left = unanswered();
  let banner = "";
  if (pendingNav) {
    banner = `<div class="banner"><p style="margin:0 0 10px">本番の途中です.ここで終了すると,未解答の問題は WA として採点されます.</p>
      <div class="row"><button class="btn warn" id="leave-yes">終了して採点する</button><button class="btn ghost" id="leave-no">本番を続ける</button></div></div>`;
  } else if (cState.confirming) {
    banner = `<div class="banner"><p style="margin:0 0 10px">未解答が ${left} 問あります.このまま提出すると,未解答の問題は WA になります.</p>
      <div class="row"><button class="btn warn" id="conf-yes">提出して採点する</button><button class="btn ghost" id="conf-no">解答に戻る</button></div></div>`;
  }
  m.innerHTML = `${banner}
    <div class="ctop">
      <span><span class="small muted">${CONTESTS[cState.kind || "all"].name} · </span>${i + 1} / ${n}問目 <span class="small muted" id="left-count">(未解答 ${left})</span></span>
      <span class="timer" id="timer"></span>
    </div>
    <div class="dots">${cState.items.map((_, k) => `<button class="qdot${k === i ? " cur" : ""}${cState.sts[k].sel != null ? " done" : ""}" data-j="${k}" aria-label="${k + 1}問目">${k + 1}</button>`).join("")}</div>
    <div class="card" id="qcard">${itemHTML(item, st)}
      <div class="row" style="margin-top:18px">
        <button class="btn ghost" id="prev-btn" ${i === 0 ? "disabled" : ""}>前へ</button>
        ${i < n - 1 ? `<button class="btn" id="next-btn">次へ</button>` : ""}
        <button class="btn${i < n - 1 ? " ghost" : ""}" id="submit-btn" style="margin-left:auto">提出</button>
      </div>
    </div>`;
  contestTick();
  const moveTo = j => { cState.i = j; cState.confirming = false; persistContest(); renderContest(); };
  bindPbox($("#qcard"));
  bindChoices($("#qcard"), st, () => {
    persistContest();
    $("#left-count").textContent = `(未解答 ${unanswered()})`;
    m.querySelector(`.qdot[data-j="${i}"]`).classList.add("done");
  });
  m.querySelectorAll(".qdot").forEach(b => b.onclick = () => moveTo(+b.dataset.j));
  $("#prev-btn").onclick = () => moveTo(i - 1);
  if (i < n - 1) $("#next-btn").onclick = () => moveTo(i + 1);
  $("#submit-btn").onclick = () => {
    if (unanswered() && !cState.confirming) { cState.confirming = true; renderContest(); window.scrollTo(0, 0); return; }
    finishContest(); renderContest(); window.scrollTo(0, 0);
  };
  if (pendingNav) {
    $("#leave-yes").onclick = () => { const to = pendingNav; finishContest(); go(to); };
    $("#leave-no").onclick = () => { pendingNav = null; render(); };
  }
  if (cState.confirming && !pendingNav) {
    $("#conf-yes").onclick = () => { finishContest(); renderContest(); window.scrollTo(0, 0); };
    $("#conf-no").onclick = () => { cState.confirming = false; renderContest(); };
  }
}
function contestResultHTML() {
  const c = cState, score = c.res.filter(Boolean).length, { before, after, perf } = c.sum;
  const keys = Object.keys(SERIES).filter(k => perf[k] != null);
  const promos = keys.filter(k => after[k] != null && tierOf(after[k]).min > tierOf(before[k] || 0).min);
  const promoHTML = promos.map(k => { const t = tierOf(after[k]); return `<div class="promo" style="${rc(after[k])}"><b>昇格!</b> ${SERIES[k]}が<b>${t.name}色(${t.title})</b>になりました</div>`; }).join("");
  const rows = keys.map(k => {
    const b = before[k], a = after[k];
    return `<tr${k === "all" ? ' class="strong"' : ""}><td>${SERIES[k]}</td><td>${rateSpan(perf[k])}</td><td>${b == null ? `<span class="muted small">初参加</span>` : rateSpan(b)} → ${rateSpan(a)}</td><td>${b == null ? "" : signed(a - b)}</td></tr>`;
  }).join("");
  const shown = new Set();
  const det = c.items.map((item, i) => {
    const st = c.sts[i], ok = c.res[i], q = item.q;
    let title, yours, ans, extra = "";
    if (item.dom === "word") {
      title = `<span class="en">${q.w}</span>`;
      const pickW = st.sel == null || st.sel < 0 ? null : st.rev ? WORD_BY.get(st.choices[st.sel]) : WORD_BY_M.get(st.choices[st.sel]);
      yours = st.sel == null ? "未解答" : st.sel < 0 ? "わからない" : pickW ? `<span class="en">${esc(pickW.w)}</span>(${esc(pickW.m)})` : "";
      ans = `<span class="en">${esc(q.w)}</span>(${esc(q.m)})`;
      extra = `<p class="small muted" style="margin:8px 0 0">選択肢の単語</p>` + choiceWordsHTML(item, st);
    } else {
      title = item.dom === "reading" && item.p.part6 ? `<span class="en">${esc(item.p.title)}</span> の空所 (${item.p.qs.indexOf(q) + 1})` : `<span class="en">${esc(q.q)}</span>`;
      yours = st.sel == null ? "未解答" : st.sel < 0 ? "わからない" : `<span class="en">${esc(q.c[st.sel])}</span>`;
      ans = `<span class="en">${esc(q.c[q.a])}</span>`;
      if (item.dom === "reading" && !shown.has(item.p.id)) {
        shown.add(item.p.id);
        extra = passageHTML(item.p, item.p.qs.flatMap(x => x.ev), { fill: true }) + `<p class="small muted">本文の訳:${item.p.ja}</p>` + passageVocabHTML(item.p);
      }
    }
    return `<details><summary><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span> ${i + 1}. ${DOMAINS[item.dom]}:${title}</summary>
      ${extra}<p class="small">あなたの解答:${yours}<br>正解:${ans}</p>${editorialHTML(item)}</details>`;
  }).join("");
  return `${promoHTML}
    <p style="margin-top:0"><b>結果:${score} / ${c.items.length} 問正解</b></p>
    <div style="overflow-x:auto"><table class="rtable"><thead><tr><th></th><th>パフォーマンス</th><th>レート</th><th>変動</th></tr></thead><tbody>${rows}</tbody></table></div>
    ${perf.all != null ? `<p class="small">今回のパフォーマンス ${perf.all} は,TOEIC に換算すると <b>約 ${Math.max(10, Math.min(990, Rating.toeic(perf.all) + toeicOffset()))} 点</b>の出来です(目安).</p>` : `<p class="small muted">分野別の本番なので,${SERIES[c.kind]}レートだけが変動しました.</p>`}
    <p class="small muted">パフォーマンスは「今回の出来をレートに換算した値」です.レートはパフォーマンスの平均に近づいていきます(参加回数が少ないうちは低めに出ます).</p>
    <h2>各問題の解説</h2>${det}
    <div class="row" style="margin-top:20px"><button class="btn" id="again-btn">同じ種類でもう一度</button><button class="btn ghost" id="kinds-btn">種類を選ぶ</button><button class="btn ghost" data-go="record">記録を見る</button></div>`;
}
