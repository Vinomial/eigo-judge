"use strict";
/* 英語ジャッジ:出題:間隔反復・おまかせ・単語の誤答の選択肢・解答の状態
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 出題 ---------------- */
const INTERVAL = [0, 1, 2, 4, 8, 16, 32]; // 間隔反復の日数
function updateSrs(id, ok) {
  const s = S.srs[id] || { box: 0, due: 0 };
  if (ok) { s.box = Math.min(s.box + 1, INTERVAL.length - 1); s.due = Date.now() + INTERVAL[s.box] * DAY; }
  else { s.box = 0; s.due = Date.now() + 10 * 60000; }
  s.t = Date.now(); // 最後に解いた時刻(端末間で合わせるとき,新しい方を採る)
  S.srs[id] = s;
}
const dueWords = () => WORDS.filter(w => S.srs[w.id] && S.srs[w.id].due <= Date.now());
function pickNear(pool, T, k, penalty) {
  return pool.map(q => ({ q, s: Math.abs(q.d - T) + Math.random() * 200 + (penalty ? penalty(q) : 0) }))
    .sort((a, b) => a.s - b.s).slice(0, k).map(x => x.q);
}
// おまかせ(練習)
function autoPick(dom, avoid) {
  if (dom === "word") {
    const due = dueWords().sort((a, b) => S.srs[a.id].due - S.srs[b.id].due);
    if (due.length) return due[0].id;
    const unseen = WORDS.filter(w => !S.srs[w.id]);
    if (unseen.length) return pickNear(unseen, estimate("word"), 1)[0].id;
    return shuffle(WORDS.filter(w => w.id !== avoid))[0].id;
  }
  if (dom === "grammar") {
    const due = GRAM.filter(q => S.srs[q.id] && S.srs[q.id].due <= Date.now() && q.id !== avoid).sort((a, b) => S.srs[a.id].due - S.srs[b.id].due);
    if (due.length) return due[0].id;
    const notAC = GRAM.filter(q => statusOf(q.id) !== "AC" && q.id !== avoid);
    return pickNear(notAC.length ? notAC : GRAM.filter(q => q.id !== avoid), estimate("grammar"), 1)[0].id;
  }
  const notAC = READING.filter(p => passageStatus(p) !== "AC" && p.id !== avoid);
  const pool = (notAC.length ? notAC : READING.filter(p => p.id !== avoid)).map(p => ({ id: p.id, d: passageD(p) }));
  return pickNear(pool.length ? pool : READING.map(p => ({ id: p.id, d: passageD(p) })), estimate("reading"), 1)[0].id;
}

/* 1問を表す共通の形: {dom, q, p?}  p は長文のときの本文 */
// 意味に同じ漢字を含む語は紛らわしい(含む/含める,延期する/先送りする)ので選択肢に並べない
const KANJI = /[一-鿿]/g;
// 意味の語句:かっこ書きを除き「・」で区切ったもの(「すぐに」「めったに〜ない」など,かなだけの意味の重なりを見つけるため)
const mTokens = m => m.replace(/[(\uFF08][^)\uFF09]*[)\uFF09]/g, "").split("・").map(x => x.trim()).filter(Boolean);
// 2つの意味が紛らわしいか:同じ漢字を含む,または同じ語句がある
function overlaps(a, b) {
  const s = new Set(a.match(KANJI) || []);
  if ((b.match(KANJI) || []).some(c => s.has(c))) return true;
  const t = new Set(mTokens(a));
  return mTokens(b).some(x => t.has(x));
}
// つづりの近さ(文字の2つ組の重なり.0〜1)
const bigrams = w => { const t = w.toLowerCase(), b = new Set(); for (let i = 0; i < t.length - 1; i++) b.add(t.slice(i, i + 2)); return b; };
const BIG = new Map(WORDS.map(w => [w.id, bigrams(w.w)]));
function spellSim(a, b) {
  const x = BIG.get(a.id), y = BIG.get(b.id);
  let n = 0; x.forEach(g => { if (y.has(g)) n++; });
  return x.size + y.size ? 2 * n / (x.size + y.size) : 0;
}
// 取り違えやすい語の組(data/vocab.js の CONFUSE).つづりで引く
const BY_SPELL = new Map(WORDS.map(w => [w.w.toLowerCase(), w]));
const CONF = new Map();
(window.CONFUSE || []).forEach(g => {
  const ws = g.map(x => BY_SPELL.get(x)).filter(Boolean);
  ws.forEach(w => CONF.set(w.id, [...(CONF.get(w.id) || []), ...ws.filter(v => v !== w)]));
});
const confusables = w => CONF.get(w.id) || [];
/* 誤答の選択肢を選ぶ.毎回ランダムに,次の中から混ぜる
 *  1. 取り違えやすい語の組   2. つづりの近い語   3. 同じ語根の語(接辞で見分ける)   4. 品詞が同じで難易度の近い語
 * 品詞だけで消去できないよう,できるだけ同じ品詞でそろえる.意味に同じ漢字を含む語は並べない(紛らわしすぎる) */
function wordDistractors(q, rev) {
  const picked = [], pos = posOf(q), root = rootOf(q);
  // 取り違えやすい語の組は,意味に同じ漢字を含んでいても出す(見分けることが練習になるため)
  const ok = (w, conf) => w.id !== q.id && !picked.includes(w) && [q, ...picked].every(x => (conf || !overlaps(x.m, w.m)) && x.w.toLowerCase() !== w.w.toLowerCase());
  const take = (pool, n, conf) => { for (const w of shuffle(pool)) if (picked.length < n && ok(w, conf)) picked.push(w); };
  take(confusables(q), 1, true);
  const similar = WORDS.filter(w => w !== q).map(w => ({ w, s: spellSim(q, w) + Math.random() * 0.15 })).filter(x => x.s > 0.42).sort((a, b) => b.s - a.s).slice(0, 6).map(x => x.w);
  if (Math.random() < (rev ? 0.9 : 0.6)) take(similar.filter(w => posOf(w) === pos || rev), picked.length + 1);
  if (root && Math.random() < 0.7) take(WORDS.filter(w => rootOf(w) === root), picked.length + 1);
  take(WORDS.filter(w => posOf(w) === pos && Math.abs(w.d - q.d) <= 250), 3);
  take(WORDS.filter(w => posOf(w) === pos && Math.abs(w.d - q.d) <= 600), 3);
  take(WORDS.filter(w => posOf(w) === pos), 3);
  take(WORDS, 3);
  return picked.slice(0, 3);
}
// 単語の出題の向き.ej: 英語→意味,je: 意味→英語,mix: 混ぜる(一度見た単語は 4 割ほど逆向き)
function wordDir(q, contest) {
  const d = contest ? "mix" : (S.prefs.wdir || "mix");
  if (d !== "mix") return d === "je";
  return Math.random() < (contest ? 0.5 : S.srs[q.id] ? 0.4 : 0.15);
}
// st.choices: 英→日 は意味の文字列,日→英 は単語の id.どちらも表示順に並べる
function newSt(item, contest) {
  if (item.dom === "word") {
    const rev = wordDir(item.q, contest), ds = wordDistractors(item.q, rev);
    return { sel: null, rev, choices: shuffle([item.q, ...ds]).map(w => (rev ? w.id : w.m)) };
  }
  // 文法・長文は選択肢の並び順を毎回変える(sel は元の添字のまま)
  return { sel: null, order: shuffle([0, 1, 2, 3]) };
}
const wordRight = (item, st, i) => (st.rev ? st.choices[i] === item.q.id : st.choices[i] === item.q.m);
function isCorrect(item, st) {
  if (st.sel == null || st.sel < 0) return false; // 未解答・「わからない」は WA
  if (item.dom === "word") return wordRight(item, st, st.sel);
  return st.sel === item.q.a;
}
