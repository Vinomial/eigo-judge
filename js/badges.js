"use strict";
/* 英語ジャッジ:実績
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 実績 ---------------- */
// 実績の判定に使う数.checkBadges のたびに作る(記録から数えるだけで,保存はしない)
const GRAM_BY_THM = (() => { const m = new Map(); GRAM.forEach(q => (m.get(q.t) || m.set(q.t, []).get(q.t)).push(q)); return m; })();
function badgeCtx() {
  const rq = READING.flatMap(p => p.qs), ac = id => statusOf(id) === "AC";
  const roots = Object.keys(ROOT).map(r => WORDS.filter(w => rootOf(w) === r));
  const passAC = READING.filter(p => p.qs.every(q => ac(q.id)));
  const hours = new Set(S.att.map(x => new Date(x[1]).getHours()));
  const dayVals = Object.values(S.days);
  const domRate = Object.keys(DOMAINS).map(k => maxRating(k));
  return {
    contests: S.contests.length,
    kinds: new Set(S.contests.map(c => c.kind || "all")).size,
    perfect: S.contests.some(c => c.items.length && c.items.every(x => x.ok)),
    near: S.contests.some(c => (c.kind || "all") === "all" && c.items.filter(x => x.ok).length >= c.items.length - 1),
    maxPerf: Math.max(0, ...S.contests.map(c => c.perf.all || 0)),
    maxDomPerf: Math.max(0, ...S.contests.flatMap(c => Object.keys(DOMAINS).map(k => c.perf[k] || 0))),
    maxAll: maxRating("all"),
    minDomRate: Math.min(...domRate),
    streak: streaks().max,
    days: Object.keys(S.days).length,
    goalDays: dayVals.filter(n => n >= GOAL).length,
    maxDay: Math.max(0, ...dayVals),
    solved: Math.max(S.att.length, dayVals.reduce((a, n) => a + n, 0)),
    learned: WORDS.filter(isLearned).length,
    wordAC: WORDS.filter(w => ac(w.id)).length,
    acTotal: [...WORDS, ...GRAM, ...rq].filter(q => ac(q.id)).length,
    gramAC: GRAM.filter(q => ac(q.id)).length,
    gramAll: GRAM.every(q => ac(q.id)),
    thmDone: [...GRAM_BY_THM.values()].filter(qs => qs.every(q => ac(q.id))).length,
    passDone: passAC.length,
    readAll: rq.every(q => ac(q.id)),
    p6Done: passAC.filter(p => p.part6).length,
    figDone: passAC.filter(p => p.s.some(b => typeof b !== "string" && b.t !== "doc")).length,
    hardAC: [...WORDS, ...GRAM, ...rq].filter(q => q.d0 >= 1600 && ac(q.id)).length,
    rootDone: roots.filter(ws => ws.length && ws.every(isLearned)).length,
    owned: Object.keys(S.owned || {}).length,
    earned: typeof coinsEarned === "function" ? coinsEarned() : 0,
    scores: (S.scores || []).length,
    night: [0, 1, 2, 3].some(h => hours.has(h)),
    morning: [5, 6].some(h => hours.has(h))
  };
}
/* 実績.id は保存に使うので変えない(解除した時刻は S.badges[id]).
 * p: c => [今の数, 目標](進み具合の表示と判定に使う).分類 cat ごとに記録の画面に並べる. */
const BADGE_CATS = ["本番", "レート", "継続", "問題数", "単語", "文法", "長文", "その他"];
const mkBadge = (id, cat, name, desc, p) => ({ id, cat, name, desc, p, ok: c => { const [x, n] = p(c); return x >= n; } });
const badgeN = (k, goal) => c => [c[k], goal];
const badgeYes = k => c => [c[k] ? 1 : 0, 1];
const BADGES = [
  mkBadge("c1", "本番", "初参加", "本番を1回解く", badgeN("contests", 1)),
  mkBadge("c3", "本番", "腕試し", "本番を3回解く", badgeN("contests", 3)),
  mkBadge("c10", "本番", "常連", "本番を10回解く", badgeN("contests", 10)),
  mkBadge("c30", "本番", "皆勤", "本番を30回解く", badgeN("contests", 30)),
  mkBadge("c50", "本番", "歴戦", "本番を50回解く", badgeN("contests", 50)),
  mkBadge("c100", "本番", "百戦錬磨", "本番を100回解く", badgeN("contests", 100)),
  mkBadge("kinds", "本番", "オールラウンダー", "4種類の本番(総合・単語・文法・長文)をすべて解く", badgeN("kinds", 4)),
  mkBadge("near", "本番", "あと一歩", "総合の本番で,間違いを1問以内にする", badgeYes("near")),
  mkBadge("perfect", "本番", "全完", "本番で全問正解する", badgeYes("perfect")),
  mkBadge("perf1000", "本番", "好パフォーマンス", "総合のパフォーマンス1000以上を出す", badgeN("maxPerf", 1000)),
  mkBadge("perf1500", "本番", "快進撃", "総合のパフォーマンス1500以上を出す", badgeN("maxPerf", 1500)),
  mkBadge("perf2000", "本番", "会心の出来", "総合のパフォーマンス2000以上を出す", badgeN("maxPerf", 2000)),
  mkBadge("dperf1600", "本番", "得意分野", "どれかの分野でパフォーマンス1600以上を出す", badgeN("maxDomPerf", 1600)),

  mkBadge("brown", "レート", "茶色", "総合レート400に到達する", badgeN("maxAll", 400)),
  mkBadge("green", "レート", "緑色", "総合レート800に到達する(TOEIC 550点の目安)", badgeN("maxAll", 800)),
  mkBadge("cyan", "レート", "水色", "総合レート1200に到達する", badgeN("maxAll", 1200)),
  mkBadge("blue", "レート", "青色", "総合レート1600に到達する", badgeN("maxAll", 1600)),
  mkBadge("yellow", "レート", "黄色", "総合レート2000に到達する", badgeN("maxAll", 2000)),
  mkBadge("orange", "レート", "橙色", "総合レート2400に到達する", badgeN("maxAll", 2400)),
  mkBadge("allbrown", "レート", "まんべんなく", "単語・文法・長文のレートをすべて400以上にする", badgeN("minDomRate", 400)),
  mkBadge("allgreen", "レート", "穴のない実力", "単語・文法・長文のレートをすべて800以上にする", badgeN("minDomRate", 800)),

  mkBadge("s3", "継続", "三日坊主卒業", "3日続けて学習する", badgeN("streak", 3)),
  mkBadge("s7", "継続", "1週間", "7日続けて学習する", badgeN("streak", 7)),
  mkBadge("s14", "継続", "2週間", "14日続けて学習する", badgeN("streak", 14)),
  mkBadge("s30", "継続", "習慣化", "30日続けて学習する", badgeN("streak", 30)),
  mkBadge("s60", "継続", "2か月", "60日続けて学習する", badgeN("streak", 60)),
  mkBadge("s100", "継続", "百日修行", "100日続けて学習する", badgeN("streak", 100)),
  mkBadge("d30", "継続", "学習30日", "学習した日が合計30日になる", badgeN("days", 30)),
  mkBadge("d100", "継続", "学習100日", "学習した日が合計100日になる", badgeN("days", 100)),
  mkBadge("goal1", "継続", "今日のノルマ", `1日に ${GOAL} 問以上解く`, badgeN("goalDays", 1)),
  mkBadge("goal10", "継続", "ノルマ10日", `${GOAL} 問以上解いた日が10日になる`, badgeN("goalDays", 10)),
  mkBadge("goal50", "継続", "ノルマ50日", `${GOAL} 問以上解いた日が50日になる`, badgeN("goalDays", 50)),
  mkBadge("day100", "継続", "猛特訓", "1日に100問以上解く", badgeN("maxDay", 100)),

  mkBadge("ac50", "問題数", "AC 50", "50問を AC の状態にする", badgeN("acTotal", 50)),
  mkBadge("ac200", "問題数", "AC 200", "200問を AC の状態にする", badgeN("acTotal", 200)),
  mkBadge("ac500", "問題数", "AC 500", "500問を AC の状態にする", badgeN("acTotal", 500)),
  mkBadge("ac1000", "問題数", "AC 1000", "1000問を AC の状態にする", badgeN("acTotal", 1000)),
  mkBadge("ac2000", "問題数", "AC 2000", "2000問を AC の状態にする", badgeN("acTotal", 2000)),
  mkBadge("n1000", "問題数", "千本ノック", "解いた問題が合計1000問になる(解き直しも数える)", badgeN("solved", 1000)),
  mkBadge("n5000", "問題数", "五千本ノック", "解いた問題が合計5000問になる", badgeN("solved", 5000)),
  mkBadge("hard10", "問題数", "難問に挑む", "難易度1600以上の問題を10問 AC にする", badgeN("hardAC", 10)),

  mkBadge("w100", "単語", "100語", "単語を100語習得する(2回以上続けて正解)", badgeN("learned", 100)),
  mkBadge("w300", "単語", "300語", "単語を300語習得する", badgeN("learned", 300)),
  mkBadge("w1000", "単語", "1000語", "単語を1000語習得する", badgeN("learned", 1000)),
  mkBadge("wac500", "単語", "語彙の土台", "単語を500語 AC の状態にする", badgeN("wordAC", 500)),
  mkBadge("root1", "単語", "語根制覇", "1つの語根の単語をすべて習得する", badgeN("rootDone", 1)),
  mkBadge("root10", "単語", "語根マスター", "10の語根の単語をすべて習得する", badgeN("rootDone", 10)),

  mkBadge("thm1", "文法", "定理を証明", "1つの定理の10問をすべて AC にする", badgeN("thmDone", 1)),
  mkBadge("thm10", "文法", "定理10個", "10の定理で,10問すべてを AC にする", badgeN("thmDone", 10)),
  mkBadge("thm30", "文法", "定理30個", "30の定理で,10問すべてを AC にする", badgeN("thmDone", 30)),
  mkBadge("g300", "文法", "文法300問", "文法を300問 AC の状態にする", badgeN("gramAC", 300)),
  mkBadge("gall", "文法", "文法全 AC", "文法の全問題を AC の状態にする", badgeYes("gramAll")),

  mkBadge("p1", "長文", "読み切った", "長文を1題,全問 AC にする", badgeN("passDone", 1)),
  mkBadge("p10", "長文", "長文10題", "長文を10題,全問 AC にする", badgeN("passDone", 10)),
  mkBadge("p50", "長文", "長文50題", "長文を50題,全問 AC にする", badgeN("passDone", 50)),
  mkBadge("part6", "長文", "穴埋め上手", "Part 6(長文の穴埋め)を1題,全問 AC にする", badgeN("p6Done", 1)),
  mkBadge("fig", "長文", "図表を読む", "表やグラフのある長文を3題,全問 AC にする", badgeN("figDone", 3)),
  mkBadge("rall", "長文", "長文全 AC", "長文の全設問を AC の状態にする", badgeYes("readAll")),

  mkBadge("shop1", "その他", "おしゃれ", "ショップで品物を1つ買う(テーマ・フォント・アイコン・演出)", badgeN("owned", 1)),
  mkBadge("shop5", "その他", "コレクター", "ショップで品物を5つ買う", badgeN("owned", 5)),
  mkBadge("shop10", "その他", "大コレクター", "ショップで品物を10個買う", badgeN("owned", 10)),
  mkBadge("coin500", "その他", "コイン長者", "コインを合計500枚ためる(使った分も数える)", badgeN("earned", 500)),
  mkBadge("score1", "その他", "答え合わせ", "実際の TOEIC の点数を記録する", badgeN("scores", 1)),
  mkBadge("night", "その他", "夜ふかし", "夜中(0時〜4時)に問題を解く", badgeYes("night")),
  mkBadge("morning", "その他", "早起き", "朝早く(5時〜7時)に問題を解く", badgeYes("morning"))
];
function checkBadges() {
  const c = badgeCtx(), fresh = BADGES.filter(b => !S.badges[b.id] && b.ok(c));
  if (!fresh.length) return;
  fresh.forEach(b => { S.badges[b.id] = Date.now(); });
  // 同時にいくつも解除したときは1枚の通知にまとめる(重なって画面を覆わないように)
  toast(fresh.length === 1 ? `<b>実績解除</b> ${esc(fresh[0].name)}<br><span class="small">${esc(fresh[0].desc)}</span>`
    : `<b>実績を ${fresh.length} 個解除</b><br><span class="small">${fresh.map(b => esc(b.name)).join(" · ")}</span>`);
  save();
}
