"use strict";
/* 英語ジャッジ:いろいろな練習(画面 modes).今日の問題・早解き・語根の問題・つづり入力.どれも練習モードで,レートは動かない.
 *   - 今日の問題:日付から決まる5題(単語2・文法2・短い長文1).全員同じ問題になる.解き終えた日は S.daily に残る
 *   - 早解き:時間内に何点取れるか(AC で +1,WA で -1,「わからない」は0点).解答の履歴(att)には入れず,S.speed に残す
 *   - 語根の問題:語根・接辞の意味を問う(id は root_spect,affix_pre).練習モードの dom "root"(js/solve.js)
 *   - つづり入力:意味を見て英単語を打ち込む(id は sp_ + 単語の id).練習モードの dom "spell"
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

const MODE_N = 20; // 語根・つづりの1回の問題数

/* ---------------- 今日の問題 ---------------- */
// 日付の文字列から決まる乱数(全員が同じ問題になるように)
function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h = (h + 0x6D2B79F5) | 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
// 難易度は作った人の見積もり(d0)で選ぶ(推定した難易度は人によって違うため)
function dailySet(k = dateKey(Date.now())) {
  const rnd = seeded("eigo-judge:" + k), one = list => list[Math.floor(rnd() * list.length)];
  const band = (list, lo, hi) => list.filter(q => q.d0 >= lo && q.d0 < hi);
  const short = READING.filter(p => !p.part6 && p.qs.length === 3 && p.s.length <= 9 && avg(p.qs.map(q => q.d0)) < 1100);
  return [
    { dom: "word", id: one(band(WORDS, 300, 800)).id }, { dom: "word", id: one(band(WORDS, 800, 1400)).id },
    { dom: "grammar", id: one(band(GRAM, 300, 900)).id }, { dom: "grammar", id: one(band(GRAM, 900, 1500)).id },
    { dom: "reading", id: one(short.length ? short : READING).id }
  ];
}
// 採点する設問の id(長文は設問ごと)
const dailyIds = set => set.flatMap(x => (x.dom === "reading" ? PASS_BY.get(x.id).qs.map(q => q.id) : [x.id]));
// 今日の問題を続けて解いた日数(今日まだなら昨日まで)
function dailyStreak() {
  const has = k => !!(S.daily || {})[k];
  let d = Date.now(), n = 0;
  if (!has(dateKey(d))) d -= DAY;
  while (has(dateKey(d))) { n++; d -= DAY; }
  return n;
}
function dailyMaxStreak() {
  let max = 0, run = 0, prev = null;
  for (const k of Object.keys(S.daily || {}).sort()) {
    const t = new Date(k + "T12:00:00").getTime();
    run = prev != null && Math.round((t - prev) / DAY) === 1 ? run + 1 : 1;
    prev = t; max = Math.max(max, run);
  }
  return max;
}
function startDaily(from = "home") {
  const k = dateKey(Date.now()), set = dailySet(k);
  startQueue(set, set[0].dom, set[0].id, `今日の問題(${fmtDate(Date.now())})`, from);
  pState.daily = { k, need: dailyIds(set), got: {} };
}
// 練習モードで1問(長文は設問ごと)判定したときに js/solve.js から呼ぶ.全部解き終えたら記録する
function dailyTick(id, ok) {
  const z = pState && pState.daily;
  if (!z || !z.need.includes(id)) return;
  z.got[id] = ok ? 1 : 0;
  if (Object.keys(z.got).length < z.need.length || (S.daily || {})[z.k]) return;
  const ac = Object.values(z.got).reduce((a, x) => a + x, 0);
  S.daily = Object.assign({}, S.daily, { [z.k]: { t: Date.now(), n: z.need.length, ac } });
  save();
  toast(`<b>今日の問題を解き終えました</b><br><span class="small">${z.need.length} 問中 ${ac} 問 AC · ${dailyStreak()} 日連続</span>`);
}
function dailyCardHTML() {
  const k = dateKey(Date.now()), r = (S.daily || {})[k], sk = dailyStreak();
  const sub = r ? `解き終えました(${r.n} 問中 ${r.ac} 問 AC)· ${sk} 日連続` : `単語2・文法2・長文1 の5題 · 全員同じ問題${sk ? ` · ${sk} 日連続中` : ""}`;
  return `<button class="tile daily${r ? " done" : ""}" data-go="daily"><b>${r ? "✓ " : ""}今日の問題</b><span>${sub}</span></button>`;
}

/* ---------------- 早解き ---------------- */
const SPEED = { word: { name: "単語", sec: 60 }, grammar: { name: "文法", sec: 180 } };
let spState = null;
const speedScore = x => x.ac - x.wa;
const speedBest = dom => Math.max(-Infinity, ...(S.speed || []).filter(x => x.dom === dom).map(speedScore));
function speedNext() {
  const z = spState, est = estimate(z.dom);
  const list = z.dom === "word" ? WORDS : GRAM, near = list.filter(q => Math.abs(q.d - est) <= 400 && !z.seen.has(q.id));
  const pool = near.length >= 5 ? near : list.filter(q => !z.seen.has(q.id));
  const q = pool[Math.floor(Math.random() * pool.length)];
  z.seen.add(q.id);
  z.item = { dom: z.dom, q }; z.st = newSt(z.item); z.lock = false;
}
function startSpeed(dom) {
  stopSpeed();
  spState = { dom, sec: SPEED[dom].sec, start: Date.now(), ac: 0, wa: 0, idk: 0, log: [], res: [], seen: new Set(), done: false };
  speedNext();
  view = "speed"; pendingNav = null; render(); toTop();
  spState.timer = setInterval(speedTick, 200);
}
function stopSpeed() { if (spState && spState.timer) { clearInterval(spState.timer); spState.timer = null; } }
const speedLeft = () => Math.max(0, spState.sec - (Date.now() - spState.start) / 1000);
function speedTick() {
  if (!spState || spState.done) return;
  const left = speedLeft(), el = $("#sp-left"), bar = $("#sp-bar");
  if (el) el.textContent = fmtSec(left);
  if (bar) bar.style.width = (100 * left / spState.sec).toFixed(1) + "%";
  if (left <= 0) finishSpeed();
}
function finishSpeed() {
  const z = spState; stopSpeed(); z.done = true;
  const best = speedBest(z.dom), score = speedScore(z);
  S.speed = [...(S.speed || []), { t: Date.now(), dom: z.dom, sec: z.sec, ac: z.ac, wa: z.wa }];
  // 解いた問題の AC / WA を問題一覧などに反映する(「わからない」は WA).解答の履歴には入れない(recordQuick)
  z.res.forEach(([id, ok, t]) => recordQuick(id, !!ok, t));
  save(); render(); checkBadges();
  if (score > best && best > -Infinity) toast(`<b>自己ベスト更新</b> ${SPEED[z.dom].name}の早解きで ${score} 点(前は ${best} 点)`);
}
function renderSpeed() {
  const z = spState, m = $("#main");
  if (!z) { go("modes"); return; }
  if (z.done) {
    const score = speedScore(z), best = speedBest(z.dom);
    const wrong = z.log.filter(x => !x.ok);
    m.innerHTML = `<div class="shophead"><div><div class="lab">早解き · ${SPEED[z.dom].name}</div><b class="dtitle">結果</b></div><button class="btn ghost sm" data-go="modes">← もどる</button></div>
      <div class="card spres"><div class="spscore">${score} <span>点</span></div>
        <p class="small">AC ${z.ac} · WA ${z.wa} · わからない ${z.idk}(${fmtSec(z.sec)})· 自己ベスト ${best} 点</p>
        <p class="small muted">解いた ${z.res.length} 問の AC / WA は問題一覧に反映しました(「わからない」は WA.難易度の推定とコインには使いません).</p>
        <div class="row"><button class="btn grow" id="sp-again">もう一度</button></div></div>
      ${wrong.length ? `<section class="rsec"><h2>間違えた問題</h2><div class="cwlist">${wrong.map(x => `<div class="cwrow"><b class="en">${esc(x.w)}</b><span>${esc(x.m)}</span></div>`).join("")}</div></section>` : ""}`;
    $("#sp-again").onclick = () => startSpeed(z.dom);
    return;
  }
  m.innerHTML = `<div class="sptop"><span class="small muted">早解き · ${SPEED[z.dom].name}</span><span class="sptime" id="sp-left">${fmtSec(speedLeft())}</span><span class="small"><b>${speedScore(z)}</b> 点 · AC ${z.ac} · WA ${z.wa}</span></div>
    <div class="qprog"><span id="sp-bar" style="width:${(100 * speedLeft() / z.sec).toFixed(1)}%"></span></div>
    <div class="card" id="qcard">${itemHTML(z.item, z.st)}</div>
    <div class="row"><button class="btn ghost sm" id="sp-quit">やめる(記録しない)</button></div>`;
  $("#sp-quit").onclick = () => { stopSpeed(); spState = null; go("modes"); };
  const card = $("#qcard");
  bindChoices(card, z.st, () => {
    if (z.lock || z.done) return;
    z.lock = true;
    const ok = isCorrect(z.item, z.st), idk = z.st.sel === IDK;
    if (ok) z.ac++; else if (idk) z.idk++; else z.wa++;
    z.res.push([z.item.q.id, ok ? 1 : 0, Date.now()]);
    const q = z.item.q;
    if (!ok) z.log.push({ ok, w: z.dom === "word" ? q.w : q.q.replace("____", q.c[q.a].toUpperCase()), m: z.dom === "word" ? q.m : q.ja });
    markChoices(card, z.item, z.st);
    setTimeout(() => { if (spState !== z || z.done) return; speedNext(); renderSpeed(); }, ok ? 250 : 900);
  });
}

/* ---------------- 語根の問題 ---------------- */
// 接辞が単語の中で語根より前か後ろか(接頭辞・接尾辞の表示に使う)
const affixSide = k => {
  let pre = 0, suf = 0;
  WORDS.forEach(w => { const r = w.p.findIndex(p => p[1] === "r"); w.p.forEach((p, i) => { if (p[1] === "a" && partKey(p) === k) (i < r ? pre++ : suf++); }); });
  return pre >= suf ? "接頭辞" : "接尾辞";
};
const ROOTQ = [
  ...Object.keys(ROOT).map(k => ({ id: "root_" + k, kind: "r", key: k, m: ROOT[k], label: "語根" })),
  ...Object.keys(AFFIX).map(k => ({ id: "affix_" + k, kind: "a", key: k, m: AFFIX[k], label: affixSide(k) }))
].map(x => Object.assign(x, { ws: WORDS.filter(w => w.p.some(p => p[1] === x.kind && partKey(p) === x.key)).sort((a, b) => a.d - b.d) }));
const ROOTQ_BY = new Map(ROOTQ.map(x => [x.id, x]));
// 語根・接辞の選択肢:同じ種類(語根なら語根,接頭辞なら接頭辞)から,意味の紛らわしくないもの
function rootSt(q) {
  const picked = [];
  const take = pool => { for (const x of shuffle(pool)) if (picked.length < 3 && x !== q && [q, ...picked].every(y => !overlaps(y.m, x.m))) picked.push(x); };
  take(ROOTQ.filter(x => x.kind === q.kind && x.label === q.label)); // 足りなければ,ほかの種類からも
  take(ROOTQ.filter(x => x.kind === q.kind));
  take(ROOTQ);
  // 一度解いた語根は,ときどき逆向き(意味 → 語根)で出す
  const rev = !!S.srs[q.id] && Math.random() < 0.4;
  return { sel: null, rev, choices: shuffle([q, ...picked]).map(x => x.id) };
}
function rootQueue(kind) {
  const list = ROOTQ.filter(x => kind === "all" || x.kind === kind), now = Date.now();
  const due = list.filter(x => S.srs[x.id] && S.srs[x.id].due <= now);
  const rest = shuffle(list.filter(x => !due.includes(x))).sort((a, b) => (statusOf(a.id) === "AC") - (statusOf(b.id) === "AC"));
  return [...due, ...rest].slice(0, MODE_N).map(x => ({ dom: "root", id: x.id }));
}
function startRoots(kind = "all", from = "modes") {
  const q = rootQueue(kind);
  startQueue(q, "root", q[0].id, `語根の問題(${kind === "r" ? "語根" : kind === "a" ? "接辞" : "語根と接辞"})`, from);
}
function rootItemHTML(item, st) {
  const q = item.q, ex = q.ws.slice(0, 3).map(w => w.w).join(" / ");
  if (st.rev) {
    return `<div class="qmeta"><span>${q.label}</span></div><p class="small muted" style="margin:0">意味から${q.label}を選ぶ</p><p class="word jm">${esc(q.m)}</p>
      <p class="small muted">この意味の${q.label}は?</p>` + choicesHTML(st.choices.map(id => ROOTQ_BY.get(id).key), st, true);
  }
  return `<div class="qmeta"><span>${q.label}</span></div><p class="word en">${esc(q.key)}</p><p class="sentence en small">例:${esc(ex)}</p>
    <p class="small muted">この${q.label}の意味は?</p>` + choicesHTML(st.choices.map(id => ROOTQ_BY.get(id).m), st, false);
}
function rootEditorialHTML(item) {
  const q = item.q, w = q.ws[0];
  return `<div class="editorial"><h3>定義</h3><p class="derive"><b class="en">${esc(q.key)}</b>(${q.label})= <b>${esc(q.m)}</b></p>
    ${w ? `<h3>導出の例</h3><p class="derive">${w.p.map(partHTML).join(" + ")} → <b class="en">${esc(w.w)}</b> <b>${esc(w.m)}</b></p>` : ""}
    <h3>この${q.label}を含む単語(${q.ws.length}語)</h3><div class="cwlist">${q.ws.map(x => `<div class="cwrow"><b class="en">${esc(x.w)}</b><span>${esc(x.m)}</span></div>`).join("")}</div></div>`;
}
const rootRight = (item, st, i) => st.choices[i] === item.q.id;

/* ---------------- つづり入力 ---------------- */
const SPELL = id => "sp_" + id; // 記録に使う id(単語の意味の問題とは別に数える)
const normSpell = s => String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
// ヒント:最初の文字と文字数(熟語は語ごと)
const spellHint = w => w.split(" ").map((x, i) => x.split("").map((c, j) => (i === 0 && j === 0) || /[^a-z]/i.test(c) ? c : "_").join(" ")).join("   ");
function spellQueue() {
  const now = Date.now(), est = estimate("word"), sp = w => S.srs[SPELL(w.id)];
  const due = WORDS.filter(w => sp(w) && sp(w).due <= now).sort((a, b) => sp(a).due - sp(b).due);
  // 意味を答えられる(AC の)単語を,つづりも書けるように.なければ実力に近い単語から
  const known = WORDS.filter(w => !sp(w) && statusOf(w.id) === "AC");
  const near = pickNear(WORDS.filter(w => !sp(w) && !known.includes(w)), est, MODE_N);
  return [...due, ...shuffle(known), ...near].slice(0, MODE_N).map(w => ({ dom: "spell", id: w.id }));
}
const spellDue = () => WORDS.filter(w => { const s = S.srs[SPELL(w.id)]; return s && s.due <= Date.now(); }).length;
function startSpell(from = "modes") {
  const q = spellQueue();
  startQueue(q, "spell", q[0].id, "つづり入力", from);
}
function spellItemHTML(item, st) {
  const q = item.q;
  const blank = esc(q.ex).replace(new RegExp("\\b(" + q.w.slice(0, -1) + "\\w*)", "i"), '<span class="blank">&nbsp;</span>');
  return metaHTML("word", q.d) + `<p class="small muted" style="margin:0">意味を見て英単語を打ち込む</p><p class="word jm">${esc(q.m)}</p>
    <p class="sentence en">${blank}</p><p class="en sphint" aria-label="ヒント">${esc(spellHint(q.w))} <span class="small muted">(${q.w.replace(/ /g, "").length} 文字)</span></p>
    <form class="spform" id="sp-form" autocomplete="off"><input id="sp-in" class="search en" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="英単語" value="${esc(st.ans || "")}"${st.done ? " disabled" : ""}>
    <button class="btn" id="sp-ok" type="submit"${st.done ? " disabled" : ""}>答える</button></form>
    <div class="choices"><button class="choice idk" type="button" id="sp-idk"${st.done ? " disabled" : ""}><span class="key">?</span>わからない</button></div>`;
}
const spellRight = (item, st) => !st.idk && normSpell(st.ans) === normSpell(item.q.w);

/* ---------------- 画面:いろいろな練習 ---------------- */
function modesHTML() {
  const k = dateKey(Date.now()), r = (S.daily || {})[k];
  const last7 = Array.from({ length: 7 }, (_, i) => dateKey(Date.now() - (6 - i) * DAY));
  const rootAC = kind => ROOTQ.filter(x => x.kind === kind && statusOf(x.id) === "AC").length, rootN = kind => ROOTQ.filter(x => x.kind === kind).length;
  const spAC = WORDS.filter(w => statusOf(SPELL(w.id)) === "AC").length, due = spellDue();
  const best = d => { const b = speedBest(d); return b > -Infinity ? `自己ベスト ${b} 点` : "まだ記録なし"; };
  return `<div class="shophead"><div><div class="lab">練習モード</div><b class="dtitle">いろいろな練習</b></div><button class="btn ghost sm" data-go="home">← ホーム</button></div>
    <section class="rsec drill"><h2>今日の問題</h2><p class="small muted rnote">日付で決まる5題(単語2・文法2・長文1)を解きます.全員同じ問題です.解き終えた日は「記録」の草に印が付きます.</p>
      <div class="dlyweek" aria-label="直近7日">${last7.map(d => `<span class="${(S.daily || {})[d] ? "on" : ""}" title="${d}">${+d.slice(8)}</span>`).join("")}</div>
      <div class="dgrid"><button class="dbtn" data-go="daily"><b>${r ? "もう一度解く" : "解く"}</b><span>${r ? `済み · ${r.ac}/${r.n} AC` : "未完"} · ${dailyStreak()} 日連続</span></button></div></section>
    <section class="rsec drill"><h2>早解き</h2><p class="small muted rnote">時間内にできるだけ多く解きます.AC で +1 点,WA で −1 点,「わからない」は0点です.当てずっぽうは損になります.記録は解答の履歴に入りません.</p>
      <div class="dgrid">${Object.entries(SPEED).map(([d, x]) => `<button class="dbtn" data-speed="${d}"><b>${x.name}(${fmtSec(x.sec)})</b><span>${best(d)}</span></button>`).join("")}</div></section>
    <section class="rsec drill"><h2>語根の問題</h2><p class="small muted rnote">語根・接辞そのものの意味を答えます.単語を「導出」するための定義の確認です(1回 ${MODE_N} 問).</p>
      <div class="dgrid"><button class="dbtn" data-roots="r"><b>語根</b><span>AC ${rootAC("r")} / ${rootN("r")}</span></button><button class="dbtn" data-roots="a"><b>接辞</b><span>AC ${rootAC("a")} / ${rootN("a")}</span></button><button class="dbtn" data-roots="all"><b>混ぜる</b><span>語根と接辞</span></button></div></section>
    <section class="rsec drill"><h2>つづり入力</h2><p class="small muted rnote">意味を見て英単語を打ち込みます.選択肢がないので,当てずっぽうの AC になりません.最初の文字と文字数がヒントに出ます(1回 ${MODE_N} 語).</p>
      <div class="dgrid"><button class="dbtn" data-spell="1"><b>おまかせ</b><span>${due ? `復習 ${due} 語 · ` : ""}AC ${spAC} 語</span></button></div></section>`;
}
function bindModes() {
  $$("[data-speed]").forEach(b => b.onclick = () => startSpeed(b.dataset.speed));
  $$("[data-roots]").forEach(b => b.onclick = () => startRoots(b.dataset.roots, "modes"));
  $$("[data-spell]").forEach(b => b.onclick = () => startSpell("modes"));
}
