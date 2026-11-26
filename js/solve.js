"use strict";
/* 英語ジャッジ:練習モード(1問を解く)と,問題・解説の描画(本番でも使う)
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 練習モード(1問を解く) ---------------- */
// ids があれば一覧の並びで次へ進む.なければおまかせで次を選ぶ
// label: 何を解いているかの表示(定理名など).from: 「戻る」で戻る画面
function startSolve(dom, id, ids, label, from) {
  startQueue(ids ? ids.map(x => ({ dom, id: x })) : null, dom, id || (ids ? ids[0] : autoPick(dom)), label, from);
}
// queue: [{dom, id}] の順に解く(分野が混ざっていてもよい).null ならおまかせ
function startQueue(queue, dom, id, label, from) {
  stopTimer();
  pState = { queue, dom, id, label: label || "", from: from || "list", sess: { n: 0, ac: 0 } };
  setupItem();
  view = "list"; pendingNav = null; render(); toTop();
}
// 苦手な単語:最後が WA か,WA の回数が AC 以上(2回以上)の単語.WA の多い順
function weakWords() {
  return WORDS.filter(w => { const r = S.res[w.id]; return r && (r.last === "WA" || (r.wa >= 2 && r.wa >= r.ac)); })
    .sort((a, b) => (S.res[b.id].wa - S.res[b.id].ac) - (S.res[a.id].wa - S.res[a.id].ac) || S.res[a.id].t - S.res[b.id].t);
}
// 苦手な単語を最大15語.取り違えやすい語があれば,すぐ後に並べて見比べられるようにする
function startWeakWords() {
  const q = [], seen = new Set();
  const add = w => { if (!seen.has(w.id) && q.length < 20) { seen.add(w.id); q.push({ dom: "word", id: w.id }); } };
  weakWords().slice(0, 15).forEach(w => { add(w); confusables(w).forEach(add); });
  if (!q.length) { toast("苦手な単語はありません."); return; }
  startQueue(q, "word", q[0].id, "苦手な単語", view === "drill" ? "drill" : "home");
}
// 1つの定理の問題を続けて解く(未 AC を先に,易しい順)
function startTheorem(k, from) {
  const qs = GRAM.filter(q => q.t === k).sort((a, b) => (statusOf(a.id) === "AC") - (statusOf(b.id) === "AC") || a.d - b.d);
  startSolve("grammar", qs[0].id, qs.map(q => q.id), THM[k].name, from);
}
function setupItem() {
  const { dom, id } = pState;
  S.prefs.notes = (S.prefs.notes || 0) + 1;
  pState.prev = dom === "spell" ? statusOf(SPELL(id)) : unitStatus(dom, id); // 開いた時点の結果(解いた後も「前回」として表示する)
  if (dom === "root") { const q = ROOTQ_BY.get(id); pState.item = { dom, q }; pState.st = rootSt(q); pState.done = false; return; }
  if (dom === "spell") { pState.item = { dom, q: WORD_BY.get(id) }; pState.st = { sel: null, ans: "", idk: false, done: false }; pState.done = false; return; }
  if (dom === "reading") {
    const p = PASS_BY.get(id);
    Object.assign(pState, { passage: p, sts: p.qs.map(q => newSt({ dom, q })), start: Date.now(), done: false, st: null, item: { dom, p } });
  } else {
    const q = dom === "word" ? WORD_BY.get(id) : GRAM_BY.get(id);
    pState.item = { dom, q }; pState.st = newSt(pState.item); pState.done = false;
  }
}
let autoT = null; // 「AC なら自動で次へ」のタイマー
function nextSolve() {
  stopTimer(); clearTimeout(autoT);
  const { dom, queue, id } = pState;
  if (queue) {
    const i = queuePos();
    if (i < 0 || i + 1 >= queue.length) { backToList(true); return; }
    pState.dom = queue[i + 1].dom; pState.id = queue[i + 1].id;
  } else pState.id = autoPick(dom, id);
  setupItem(); render(); toTop();
}
const queuePos = () => pState.queue.findIndex(x => x.dom === pState.dom && x.id === pState.id);
// やめるとき(最後まで解いたときも),今回の成績を知らせる
function backToList(finished) {
  stopTimer(); clearTimeout(autoT);
  const to = pState ? pState.from : "list", z = pState && pState.sess;
  pState = null; go(to);
  if (z && z.n) toast(`${finished === true ? "最後まで解きました." : ""}今回は ${z.n} 問中 <b>${z.ac} 問 AC</b>(${Math.round(100 * z.ac / z.n)}%)でした.`);
  else if (finished === true) toast("最後まで解きました.");
}
// 今回(続けて解いている間)の成績
function sessText() {
  const z = pState.sess;
  if (!z.n) return "練習モード";
  return `今回 ${z.n} 問 · <b class="up">AC ${z.ac}</b>${z.n - z.ac ? ` · <span class="down">WA ${z.n - z.ac}</span>` : ""}`;
}
function solveTop() {
  const { dom, queue, label } = pState;
  const pos = queue ? `${queuePos() + 1} / ${queue.length}` : "おまかせ";
  const s = pState.prev;
  const bar = queue ? `<div class="qprog"><span style="width:${(100 * (queuePos() + (pState.done || (pState.st && pState.st.done) ? 1 : 0)) / queue.length).toFixed(1)}%"></span></div>` : "";
  return `<div class="row" style="justify-content:space-between;margin-bottom:${queue ? 6 : 12}px">
    <button class="btn ghost sm" id="back-btn">← ${pState.from === "list" ? "一覧" : "戻る"}</button>
    <span class="small muted">${label ? `${esc(label)} · ` : `${DOMAINS[dom]} · `}${pos}${s ? ` · 前回 <span class="verdict ${s.toLowerCase()} xs">${s}</span>` : ""}</span>
  </div>${bar}`;
}
function renderSolve() {
  const m = $("#main");
  // 説明は最初の数問だけ詳しく出し,慣れたら1行にする(問題を画面の上の方に出すため)
  const long = (S.prefs.notes || 0) < 5;
  const note = long
    ? `練習モード:${pState.dom === "reading" ? "全問に答えて提出すると判定します" : "1問ごとにすぐ判定します"}.分からないときは「わからない」を選ぶと,当てずっぽうの AC を防げます.レートは動きません.`
    : "";
  // 単語・文法は「AC なら自動で次へ」を選べる(テンポよく解くため.WA のときは解説を読めるよう止まる)
  const auto = pState.dom !== "reading" ? `<label class="autonext"><input type="checkbox" id="auto-next"${S.prefs.autoNext ? " checked" : ""}> AC なら自動で次へ</label>` : "";
  m.innerHTML = solveTop() + `<div class="notebar">${note ? `<p class="mode-note">${note}</p>` : `<span class="small muted" id="sess">${sessText()}</span>`}${auto}</div><div class="card" id="qcard"></div>`;
  const an = $("#auto-next");
  if (an) an.onchange = () => { S.prefs.autoNext = an.checked; save(); };
  $("#back-btn").onclick = backToList;
  if (pState.dom === "reading") renderSolveReading(); else renderSolveSingle();
}
// 1問を判定して記録する(単語・文法・語根・つづり).単語・文法・語根・つづりは間隔反復も進める
function judgeSingle(item, st) {
  st.done = true;
  const ok = isCorrect(item, st), id = itemId(item);
  const q0 = Q_BY.get(id), before = q0 ? q0.q.d : null;
  pState.sess.n++; if (ok) pState.sess.ac++;
  record(id, ok);
  updateSrs(id, ok);
  dailyTick(id, ok);
  save(); checkBadges();
  const se = $("#sess"); if (se) se.innerHTML = sessText();
  // 難易度の推定は,判定を出したあとに裏で行う(show の中.解答が多いと数十ミリ秒かかるため,押してすぐ判定を出す)
  st.dBefore = before; st.dId = id;
  return ok;
}
// 判定を出したあとに難易度を推定し直し,変わったら知らせる(最初の解答だけが推定に使われるので,変わるのは初めて解いた問題だけ)
function afterJudgeEst(st) {
  if (st.dBefore == null) return;
  setTimeout(() => {
    refreshEst();
    const q = Q_BY.get(st.dId);
    if (!q || q.q.d === st.dBefore) return;
    st.dMove = [st.dBefore, q.q.d];
    const r = $("#result");
    const v = r && r.querySelector("#verdict");
    if (v && pState && pState.st === st && !r.querySelector(".dmove")) v.insertAdjacentHTML("afterend", dMoveHTML(st));
    // 解説の下の「難易度の推移」も,今の変化を入れて書き直す
    if (r && pState && pState.st === st) { const h = r.querySelector(".dhist"); if (h) h.remove(); r.insertAdjacentHTML("beforeend", dHistHTML(st.dId)); }
  }, 30);
}
// 判定のあとに出す「難易度の推定」の変化
function dMoveHTML(st) {
  if (!st.dMove) return "";
  const [a, b] = st.dMove, up = b > a;
  return `<p class="small dmove">難易度 <span style="${rc(a)}" class="rate">${a}</span> → <b style="${rc(b)}" class="rate">${b}</b> <span class="${up ? "down" : "up"}">${up ? "↑" : "↓"}${Math.abs(b - a)}</span> <span class="muted">あなたの解答で推定し直しました(${up ? "WA なので難しめに" : "AC なので易しめに"})</span></p>`;
}
function renderSolveSingle() {
  const item = pState.item, st = pState.st, card = $("#qcard");
  card.innerHTML = itemHTML(item, st) + `<div id="result"></div><div class="row actions" id="actions"></div>`;
  const show = fresh => {
    const ok = isCorrect(item, st);
    const idk = st.sel === IDK || st.idk;
    $("#result").innerHTML = `<p style="margin-top:16px" id="verdict"><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span>${idk ? ` <span class="small muted">「わからない」を選びました.解説で確認しましょう.</span>` : ""}</p>` + editorialHTML(item, st);
    if (st.dMove) $("#verdict").insertAdjacentHTML("afterend", dMoveHTML(st));
    if (item.dom === "spell") markSpell(card, item, st); else markChoices(card, item, st);
    // 次へ進むボタンは,解説を読んでいる間も画面の下に残す
    const a = $("#actions");
    a.classList.add("stick");
    a.innerHTML = `<button class="btn grow" id="next-btn">次の問題</button><button class="btn ghost" id="list-btn">やめる</button>`;
    $("#next-btn").onclick = nextSolve;
    $("#list-btn").onclick = backToList;
    $("#next-btn").focus({ preventScroll: true });
    const bar = $(".qprog > span");
    if (bar && pState.queue) bar.style.width = (100 * (queuePos() + 1) / pState.queue.length).toFixed(1) + "%";
    if (fresh) $("#verdict").scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (fresh && ok) playFx(); // ショップで買った正解の演出(js/shop.js)
    if (fresh) afterJudgeEst(st);
    if (fresh && ok && S.prefs.autoNext) {
      const me = pState;
      clearTimeout(autoT);
      autoT = setTimeout(() => { if (pState === me && pState.st === st && view === "list") nextSolve(); }, 900);
    }
  };
  if (st.done) { show(false); return; }
  if (item.dom === "spell") { bindSpell(card, st, () => { judgeSingle(item, st); show(true); }); return; }
  bindChoices(card, st, () => { judgeSingle(item, st); show(true); });
}
// つづり入力:Enter か「答える」で判定.空のままでは答えられない
function bindSpell(card, st, onDone) {
  const inp = card.querySelector("#sp-in");
  inp.focus({ preventScroll: true });
  card.querySelector("#sp-form").onsubmit = e => {
    e.preventDefault();
    if (!normSpell(inp.value)) { inp.focus(); return; }
    st.ans = inp.value; onDone();
  };
  card.querySelector("#sp-idk").onclick = () => { st.idk = true; st.ans = inp.value; onDone(); };
}
function markSpell(card, item, st) {
  card.querySelectorAll("input, button").forEach(b => { if (!b.closest("#result")) b.disabled = true; });
  const inp = card.querySelector("#sp-in"), ok = isCorrect(item, st);
  if (inp) inp.classList.add(ok ? "right" : "wrong");
}
function renderSolveReading() {
  const p = pState.passage, sts = pState.sts, card = $("#qcard");
  const done = pState.done;
  const evs = done ? p.qs.flatMap(q => q.ev) : [];
  card.innerHTML = `
    <div class="timebar"><span class="muted">${esc(p.kind)} · 目標 ${fmtSec(p.target)}</span><span class="timer" id="ptimer"></span></div>
    ${passageHTML(p, evs, { fill: done, box: !done })}
    ${p.qs.map((q, k) => `<div class="rq" data-k="${k}">${metaHTML("reading", q.d)}<p class="qtext en">${qLabel(p, k)}</p>${choicesHTML(q.c, sts[k], true)}<div class="rres"></div></div>`).join("")}
    <div id="rsum"></div>
    <div class="row actions" id="actions"></div>`;
  const blocks = card.querySelectorAll(".rq");
  if (done) {
    const sec = pState.elapsed;
    $("#ptimer").textContent = fmtSec(sec);
    let score = 0;
    blocks.forEach((el, k) => {
      const item = { dom: "reading", p, q: p.qs[k] }, ok = isCorrect(item, sts[k]);
      if (ok) score++;
      markChoices(el, item, sts[k]);
      el.querySelector(".rres").innerHTML = `<p style="margin-top:12px"><span class="verdict ${ok ? "ac" : "wa"}">${ok ? "AC" : "WA"}</span></p>` + editorialHTML(item);
    });
    const diff = sec - p.target;
    $("#rsum").innerHTML = `<div class="editorial"><h3>結果</h3><p>${score} / ${p.qs.length} 問正解 · 所要時間 ${fmtSec(sec)}(目標より ${diff <= 0 ? `<span class="up">${fmtSec(-diff)} 速い</span>` : `<span class="down">${fmtSec(diff)} 遅い</span>`})</p>
      <h3>本文の訳</h3><p>${p.ja}</p></div>${passageVocabHTML(p)}`;
    $("#actions").classList.add("stick");
    $("#actions").innerHTML = `<button class="btn grow" id="next-btn">${pState.queue ? "次の問題" : "次の長文"}</button><button class="btn ghost" id="list-btn">やめる</button>`;
    $("#next-btn").onclick = nextSolve;
    $("#list-btn").onclick = backToList;
    return;
  }
  bindPbox(card);
  blocks.forEach((el, k) => bindChoices(el, sts[k], refresh));
  $("#actions").innerHTML = `<button class="btn" id="submit-btn">提出する</button><span class="small muted" id="left"></span>`;
  function refresh() {
    const left = sts.filter(s => s.sel == null).length;
    $("#submit-btn").disabled = left > 0;
    $("#left").textContent = left ? `あと ${left} 問` : "";
  }
  refresh();
  $("#submit-btn").onclick = () => {
    stopTimer();
    pState.elapsed = (Date.now() - pState.start) / 1000;
    pState.done = true;
    p.qs.forEach((q, k) => { const ok = isCorrect({ dom: "reading", q }, sts[k]); pState.sess.n++; if (ok) pState.sess.ac++; record(q.id, ok); dailyTick(q.id, ok); });
    (S.readTimes[p.id] = S.readTimes[p.id] || []).push(Math.round(pState.elapsed));
    save(); renderSolve(); checkBadges();
    const sum = $("#rsum"); if (sum) sum.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };
  const tick = () => { const el = $("#ptimer"); if (el) el.textContent = fmtSec((Date.now() - pState.start) / 1000); };
  tick(); stopTimer(); timerId = setInterval(tick, 1000);
}
function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

/* ---------------- 問題と解説の描画 ---------------- */
function metaHTML(dom, d) {
  return `<div class="qmeta"><span>${DOMAINS[dom]}</span><span><span class="dot" style="${rc(d)}"></span>難易度 ${d}</span></div>`;
}
// list は元の並び.st.order があればその順に表示する(data-i は元の添字なので,判定はそのまま)
function choicesHTML(list, st, en) {
  const order = st.order || list.map((_, i) => i);
  // 最後の「わからない」は,当てずっぽうで AC にしないための選択肢(WA になる)
  return `<div class="choices">${order.map((i, k) => `<button class="choice${en ? " en" : ""}" data-i="${i}" aria-pressed="${st.sel === i}"><span class="key">${"ABCD"[k]}</span><span class="ct">${esc(list[i])}</span></button>`).join("")}
    <button class="choice idk" data-i="${IDK}" aria-pressed="${st.sel === IDK}"><span class="key">?</span>わからない</button></div>`;
}
// opt.cur: 今の設問の空所(Part 6),opt.fill: 空所に正解を入れて表示する
function passageHTML(p, evs, opt = {}) {
  const ev = evMap(evs);
  let html = p.s.map((b, i) => blockHTML(b, ev.get(i))).join("");
  html = p6Blanks(html, p, opt);
  const body = `<div class="passage en${opt.box ? " pbox" : ""}"><div class="ptitle">${esc(p.kind)}:${esc(p.title)}</div>${html}</div>`;
  return opt.box ? `<div class="pwrap">${body}<button class="pmore" type="button" hidden>本文を広げる ▼</button></div>` : body;
}
// 本文の枠:はみ出すときだけ「本文を広げる」を出す
function bindPbox(root) {
  (root || document).querySelectorAll(".pwrap").forEach(w => {
    const box = w.querySelector(".pbox"), btn = w.querySelector(".pmore");
    if (!box || !btn) return;
    if (box.scrollHeight > box.clientHeight + 4) btn.hidden = false;
    btn.onclick = () => { const open = box.classList.toggle("open"); btn.textContent = open ? "本文をたたむ ▲" : "本文を広げる ▼"; };
  });
}
// Part 6 の空所 [n] を描く(fill なら正解を入れる)
function p6Blanks(html, p, opt) {
  if (!p.part6) return html;
  return html.replace(/\[(\d)\]/g, (_, n) => {
    const q = p.qs[n - 1];
    return opt.fill && q ? `<span class="p6b done">${esc(q.c[q.a])}</span>` : `<span class="p6b${+n === opt.cur ? " cur" : ""}">(${n})</span>`;
  });
}
const qLabel = (p, k) => (p.part6 ? `(${k + 1}) に入る最も適切なものは?` : `${k + 1}. ${esc(p.qs[k].q)}`);
const SPEAK = typeof window.speechSynthesis !== "undefined";
const speakBtn = text => (SPEAK ? `<button class="speak" data-say="${esc(text)}" aria-label="発音を聞く"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/></svg></button>` : "");
function itemHTML(item, st) {
  const q = item.q;
  if (item.dom === "root") return rootItemHTML(item, st);
  if (item.dom === "spell") return spellItemHTML(item, st);
  if (item.dom === "word") {
    const ex = esc(q.ex).replace(new RegExp("\\b(" + q.w.slice(0, -1) + "\\w*)", "i"), "<b>$1</b>");
    if (st.rev) { // 意味 → 英単語.例文の単語は空所にする
      const blank = esc(q.ex).replace(new RegExp("\\b(" + q.w.slice(0, -1) + "\\w*)", "i"), '<span class="blank">&nbsp;</span>');
      return metaHTML("word", q.d) + `<p class="small muted" style="margin:0">意味から英単語を選ぶ</p><p class="word jm">${esc(q.m)}</p><p class="sentence en">${blank}</p><p class="small muted">この意味の英単語は?</p>` + choicesHTML(st.choices.map(id => WORD_BY.get(id).w), st, true);
    }
    return metaHTML("word", q.d) + `<p class="word en">${esc(q.w)}${speakBtn(q.w)}</p><p class="sentence en">${ex}</p><p class="small muted">この単語の意味は?</p>` + choicesHTML(st.choices, st, false);
  }
  if (item.dom === "grammar") {
    return metaHTML("grammar", q.d) + `<p class="sentence en">${esc(q.q).replace("____", '<span class="blank">&nbsp;</span>')}</p>` + choicesHTML(q.c, st, true);
  }
  const k = item.p.qs.indexOf(q);
  return metaHTML("reading", q.d) + passageHTML(item.p, null, { cur: k + 1, box: true }) + `<p class="qtext en"><b>${qLabel(item.p, k)}</b></p>` + choicesHTML(q.c, st, true);
}
// 解説(問題ごとの難易度の推移を最後に付ける)
function editorialHTML(item, st) { return editorialMain(item, st) + dHistHTML(itemId(item)); }
function editorialMain(item, st) {
  if (item.dom === "root") return rootEditorialHTML(item);
  if (item.dom === "spell") {
    const q = item.q, mine = st && normSpell(st.ans) && !spellRight(item, st) ? `<p class="small">あなたの解答:<span class="en down">${esc(st.ans)}</span></p>` : "";
    return `<div class="editorial"><h3>正しいつづり</h3><p class="word en">${esc(q.w)}${speakBtn(q.w)}</p>${mine}</div>` + editorialBody({ dom: "word", q });
  }
  return editorialBody(item).replace(/<\/div>$/, commHTML(item.q.id) + "</div>");
}
function editorialBody(item) {
  const q = item.q;
  if (item.dom === "word") {
    const root = rootOf(q);
    if (!root) { // 語根から導けない単語:意味と覚え方のメモを示す
      return `<div class="editorial"><h3>意味</h3><p class="derive"><b class="en">${esc(q.w)}</b>${speakBtn(q.w)} <b>${esc(q.m)}</b> <span class="small muted">${POS[posOf(q)] || ""}</span></p>${q.n ? `<p>${q.n}</p>` : ""}
        <h3>例文の訳</h3><p>${q.ja}</p>${confHTML(q)}</div>`;
    }
    const chain = q.p.map(partHTML).join(" + ");
    const sib = WORDS.filter(w => w.id !== q.id && rootOf(w) === root).map(w => `${w.w}(${w.m})`).join(", ");
    return `<div class="editorial"><h3>導出</h3><p class="derive">${chain} → <b>${q.m}</b></p><p>${q.n}</p>
      <h3>例文の訳</h3><p>${q.ja}</p>${confHTML(q)}${sib ? `<h3>同じ語根から導ける単語</h3><p class="en">${esc(sib)}</p>` : ""}</div>`;
  }
  if (item.dom === "grammar") {
    const t = THM[q.t];
    return `<div class="editorial"><h3>使う定理:${t.name}</h3><div class="thm">${t.s}</div>
      <p class="small muted">前提の定義:${t.def}</p><h3>この問題では</h3><p>${q.why}</p>${xHTML(q)}<h3>訳</h3><p>${q.ja}</p></div>`;
  }
  const evText = q.ev.map(e => {
    const b = item.p.s[evKey(e)];
    if (typeof b === "string") return `<p class="en"><span class="ev" style="background:var(--hl)">${p6Blanks(esc(b), item.p, { fill: true })}</span></p>`;
    // 図表が根拠のとき:行の指定があればその行だけを抜き出して示す
    const sub = !Array.isArray(e) ? b : Object.assign({}, b, b.t === "table" ? { rows: [b.rows[e[1]]] } : { items: [b.items[e[1]]] });
    return `<div class="en evfig">${blockHTML(sub)}</div>`;
  }).join("");
  return `<div class="editorial"><h3>根拠</h3>${evText}<h3>解き方</h3><p>${q.why}</p>${xHTML(q)}</div>`;
}
function confHTML(q) {
  const cs = confusables(q);
  return cs.length ? `<h3>取り違えやすい語</h3><div class="cwlist">${cs.map(w => `<div class="cwrow"><b class="en">${esc(w.w)}</b><span>${esc(w.m)}</span></div>`).join("")}</div>` : "";
}
// 誤答の選択肢ごとの説明(q.x は選択肢と同じ並び.正解の位置は空でよい)
function xHTML(q) {
  if (!q.x) return "";
  return `<h3>ほかの選択肢</h3><div class="xlist">${q.c.map((c, i) => (i === q.a || !q.x[i] ? "" : `<div class="xrow"><b class="en">${esc(c)}</b><span>${q.x[i]}</span></div>`)).join("")}</div>`;
}
function markChoices(root, item, st) {
  root.querySelectorAll(".choice").forEach(b => {
    const i = +b.dataset.i;
    b.disabled = true;
    const right = i >= 0 && (item.dom === "word" ? wordRight(item, st, i) : item.dom === "root" ? rootRight(item, st, i) : i === item.q.a);
    if (right) b.classList.add("right"); else if (i === st.sel) b.classList.add("wrong");
    // 単語:判定後,各選択肢がどの単語か(逆向きならその意味)を示す.誤答の選択肢もついでに覚えられる
    const w = item.dom === "word" && i >= 0 && (st.rev ? WORD_BY.get(st.choices[i]) : WORD_BY_M.get(st.choices[i]));
    if (w && !b.querySelector(".cw")) b.insertAdjacentHTML("beforeend", choiceWordHTML(w, st.rev));
    // 正解と自分の解答を文字でも示す(色だけに頼らない)
    if (!b.querySelector(".cmark") && (right || i === st.sel)) {
      b.insertAdjacentHTML("beforeend", `<span class="cmark ${right ? "ok" : "ng"}">${right ? "正解" : "あなたの解答"}</span>`);
    }
  });
}
// 誤答の選択肢には,その単語の過去の状態(AC / WA)を付けない.今回の正誤と紛らわしいため
function choiceWordHTML(w, rev) {
  return `<span class="cw">${rev ? `<span class="jm">${esc(w.m)}</span>` : `<b class="en">${esc(w.w)}</b>`}</span>`;
}
// 本番の結果など,選択肢を表示しない画面で使う一覧
function choiceWordsHTML(item, st) {
  return `<div class="cwlist">${st.choices.map((c, i) => {
    const w = st.rev ? WORD_BY.get(c) : WORD_BY_M.get(c), cls = wordRight(item, st, i) ? " right" : i === st.sel ? " wrong" : "";
    return `<div class="cwrow${cls}"><b class="en">${esc(w ? w.w : "")}</b><span>${esc(w ? w.m : c)}</span></div>`;
  }).join("")}</div>`;
}
function bindChoices(root, st, onPick) {
  root.querySelectorAll(".choice").forEach(b => b.onclick = () => {
    st.sel = +b.dataset.i;
    root.querySelectorAll(".choice").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    if (onPick) onPick();
  });
}
