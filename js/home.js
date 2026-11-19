"use strict";
/* 英語ジャッジ:ホームと更新履歴
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- ホーム ---------------- */
function ratingCells() {
  return Object.keys(DOMAINS).map(k => {
    const r = ratingOf(k);
    return `<div class="rt" style="${rc(r || 0)}"><div class="lab">${DOMAINS[k]}</div><div class="val">${r == null ? "-" : r}</div>
      <div class="sub">${r == null ? "本番未参加" : `${tierOf(r).name}色 · ${tierOf(r).title}`}</div></div>`;
  }).join("");
}
function heroHTML() {
  const r = ratingOf("all");
  if (r == null) return `<button class="hero0" data-go="contest"><b>総合レートはまだありません</b><span class="small muted">本番を1回解くと,レートと推定 TOEIC スコアがつきます →</span></button>`;
  const t = tierOf(r), next = TIERS.find(x => x.min > r);
  const pct = next ? Math.round(100 * (r - t.min) / (next.min - t.min)) : 100;
  return `<div class="hero" style="${rc(r)}">
    <div class="lab">総合レート · <b style="color:var(--rc)">${t.name}色 ${t.title}</b></div>
    <div class="big">${r}</div>
    ${next ? `<div class="nextbar"><span style="width:${pct}%"></span></div><div class="small muted">${next.name}色まであと ${next.min - r}</div>` : ""}
  </div>`;
}
// 推定 TOEIC スコア(総合のパフォーマンスから.参加回数が少ないうちは幅が広い)
// 実際の TOEIC の点数(S.scores)が記録されていれば,その時点の推定との差の平均で補正する(新しいものほど重く)
const allPerfs = until => S.contests.filter(c => c.perf.all != null && (until == null || c.t <= until)).map(c => c.perf.all);
function toeicOffset() {
  let num = 0, den = 0;
  (S.scores || []).slice().sort((a, b) => a.t - b.t).reverse().forEach((x, i) => {
    const e = Rating.toeicEstimate(allPerfs(x.t + DAY));
    if (!e) return;
    const w = Math.pow(0.7, i);
    num += (x.score - e.score) * w; den += w;
  });
  return den ? Math.max(-250, Math.min(250, Math.round(num / den / 5) * 5)) : 0;
}
function toeicEst() {
  const e = Rating.toeicEstimate(allPerfs());
  if (!e) return null;
  const off = toeicOffset(), cl = v => Math.max(10, Math.min(990, v + off));
  return { score: cl(e.score), lo: cl(e.lo), hi: cl(e.hi), off, raw: e.score };
}
function toeicHTML() {
  const e = toeicEst(), goalPos = (100 * toeicGoal() / 990).toFixed(1);
  if (!e) return `<div class="toeic"><div class="lab">推定 TOEIC スコア</div><div class="tv muted">-</div><div class="small muted">本番を1回解くと表示されます.</div></div>`;
  return `<div class="toeic">
    <div class="lab">推定 TOEIC スコア(目安)</div>
    <div class="tv">約 <b>${e.score}</b> 点 <span class="small muted">${e.lo}〜${e.hi} 点の範囲</span></div>
    <div class="tbar" role="img" aria-label="推定 ${e.score} 点.目標 ${toeicGoal()} 点"><span class="range" style="left:${(100 * e.lo / 990).toFixed(1)}%;width:${(100 * (e.hi - e.lo) / 990).toFixed(1)}%"></span><span class="now" style="left:${(100 * e.score / 990).toFixed(1)}%"></span><span class="goal" style="left:${goalPos}%"></span></div>
    <div class="tscale"><span>10</span><span style="left:${goalPos}%">目標 ${toeicGoal()}</span><span>990</span></div>
    <div class="small muted">${e.score >= toeicGoal() ? `目標の ${toeicGoal()} 点に届く出来です.` : `目標の ${toeicGoal()} 点まで,あと約 ${toeicGoal() - e.score} 点.`}総合の本番 ${allPerfs().length} 回の出来からの換算です.${e.off ? `実際の点数の記録で ${e.off > 0 ? "+" : ""}${e.off} 点補正しています(補正前 ${e.raw} 点).` : "リスニングは測っていないので,「記録」画面で実際の点数を入れると補正されます."}</div>
  </div>`;
}
function homeHTML() {
  const due = dueWords().length, sk = streaks(), wa = waQueue().length, weak = weakWords().length;
  const unseen = WORDS.filter(w => !S.srs[w.id]).length;
  const gLeft = GRAM.filter(q => statusOf(q.id) !== "AC").length, rLeft = READING.filter(p => passageStatus(p) !== "AC").length;
  const tile = (attrs, title, sub, cls = "") => `<button class="tile ${cls}" ${attrs}><b>${title}</b><span>${sub}</span></button>`;
  const rated = ratingOf("all") != null || Object.keys(DOMAINS).some(k => ratingOf(k) != null);
  return `
  ${heroHTML()}
  ${rated ? toeicHTML() + `<div class="ratings">${ratingCells()}</div>` : ""}
  <div class="today">
    <div class="trow"><span><b>今日 ${sk.today}</b> / ${GOAL} 問</span><span class="small muted">${sk.cur} 日連続 · 学習 ${sk.total} 日</span></div>
    <div class="pbar"><span style="width:${Math.min(100, 100 * sk.today / GOAL).toFixed(0)}%"></span></div>
  </div>
  <h2>今日のメニュー</h2>
  <div class="tiles">
    ${tile('data-go="contest"', "本番に挑戦する", "総合または分野別.レートが動く", "main")}
    ${tile('data-go="auto" data-dom="word"', "単語", due ? `復習 ${due} 語がたまっています` : unseen ? `新しい単語(残り ${unseen} 語)` : "おまかせで復習")}
    ${tile('data-go="auto" data-dom="grammar"', "文法", gLeft ? `おまかせ(未 AC ${gLeft} 問)` : "全問 AC.おまかせで復習")}
    ${tile('data-go="auto" data-dom="reading"', "長文", rLeft ? `おまかせ(未 AC ${rLeft} 題)` : "全題 AC.おまかせで復習")}
    ${wa ? tile('data-go="wa"', "WA を解き直す", `${wa} 問(古いものから${wa > 20 ? " 20 問" : ""})`, "warn") : ""}
    ${weak ? tile('data-go="weak"', "苦手な単語", `${weak} 語.取り違えやすい語と一緒に`, "warn") : ""}
  </div>
  <p class="small muted">練習ではレートは動きません.本番を解くとレートと推定スコアが変動します.</p>
  <h2>進捗(今 AC の問題)</h2>
  ${progressHTML()}
  ${newsHTML()}`;
}

/* ---------------- 更新履歴(data/changelog.js) ---------------- */
const LOG = window.CHANGELOG || [];
const unreadLog = () => LOG.length && (S.prefs.seenLog || 0) < LOG[0].id;
function fmtYmd(s) { const [y, m, d] = s.split("-").map(Number); return `${y}/${m}/${d}`; }
function newsHTML() {
  if (!LOG.length) return "";
  const e = LOG[0];
  return `<h2>お知らせ</h2>
  <button class="news" data-go="log">
    <span class="small muted">${fmtYmd(e.date)}${unreadLog() ? ` <span class="newbadge">NEW</span>` : ""}</span>
    <b>${esc(e.title)}</b>
    <span class="small" style="color:var(--accent)">更新履歴を見る →</span>
  </button>`;
}
function renderLog() {
  $("#main").innerHTML = `
    <div class="row" style="margin-bottom:12px"><button class="btn ghost sm" data-go="home">← ホーム</button></div>
    <h2 style="margin-top:0">更新履歴</h2>
    ${LOG.map(e => `<section class="logent">
      <div class="small muted">${fmtYmd(e.date)}${(S.prefs.seenLog || 0) < e.id ? ` <span class="newbadge">NEW</span>` : ""}</div>
      <h3>${esc(e.title)}</h3>
      <ul>${e.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>`).join("")}`;
  // 開いた時点で既読にする(NEW は次に開いたときに消える)
  if (unreadLog()) { S.prefs.seenLog = LOG[0].id; save(); }
}
function progressHTML() {
  const rq = READING.flatMap(p => p.qs);
  const rows = [
    ["単語", WORDS.filter(q => statusOf(q.id) === "AC").length, WORDS.length, `習得 ${WORDS.filter(isLearned).length}語`],
    ["文法", GRAM.filter(q => statusOf(q.id) === "AC").length, GRAM.length, ""],
    ["長文", rq.filter(q => statusOf(q.id) === "AC").length, rq.length, "設問"]
  ];
  return `<div class="prog">${rows.map(([lab, n, all, note]) => `
    <div class="prow"><span>${lab}</span><span class="pbar"><span style="width:${all ? (100 * n / all).toFixed(1) : 0}%"></span></span><span class="small muted">${n}/${all}${note ? ` · ${note}` : ""}</span></div>`).join("")}</div>`;
}
