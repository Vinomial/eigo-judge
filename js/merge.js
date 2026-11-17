"use strict";
/* 端末間で進捗を合わせる(同期と「読み込む」で使う).node でも require できる.
 *
 * 方針:記録は「足し合わせる(和集合)」.上書きしないので,どちらの端末で解いた記録も消えない.
 *   - att(解答の履歴 [id, 時刻, 正誤])は (id, 時刻) で重複を除いて合わせる.
 *   - contests(本番)は時刻で重複を除いて合わせる.
 *   - res(問題ごとの最後の結果)は時刻の新しい方.回数は大きい方と,合わせた att から数えた値の大きい方.
 *   - srs(単語の復習)は最後に解いた時刻 t の新しい方.
 *   - days / dayAc(日ごとの数)は日ごとに大きい方.
 *   - badges は和集合(早い方の時刻),scores は時刻で和集合,goal は新しい方.
 *   - prefs と live(解答中の本番)はその端末だけのもの(手元を残す.seenLog だけは大きい方).
 * 削除:wipe = { contests, results, all }(削除した時刻)と del.scores(消した点数の時刻)を持つ.
 *   相手の削除を知らない側(wipe が古い側)の記録は,削除の時刻より前のものを捨てる.
 *   時刻を持たない項目(日ごとの数,所要時間,実績)は,その側の att から作り直すか捨てる.
 * 性質:merge(a, b) は何度くり返しても同じ結果になる(冪等).a と b を入れ替えても,手元だけの項目以外は同じ. */
(function (root) {
  const dateKey = t => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const obj = x => (x && typeof x === "object" && !Array.isArray(x) ? x : {});
  const arr = x => (Array.isArray(x) ? x : []);
  const num = x => (typeof x === "number" && isFinite(x) ? x : 0);

  function cutsOf(a, b) {
    const wa = obj(a.wipe), wb = obj(b.wipe), w = {};
    for (const k of ["contests", "results", "all"]) w[k] = Math.max(num(wa[k]), num(wb[k]));
    return {
      wipe: w,
      contests: Math.max(w.contests, w.all), // これより前の本番は消えている
      results: Math.max(w.results, w.all),   // これより前の解答は消えている
      all: w.all
    };
  }
  // 片方の側を,削除の時刻で切りそろえる.知らない削除があるときだけ手を入れる
  function clean(s, cut) {
    const w = obj(s.wipe);
    const knowsR = Math.max(num(w.results), num(w.all)) >= cut.results;
    const knowsC = Math.max(num(w.contests), num(w.all)) >= cut.contests;
    const knowsA = num(w.all) >= cut.all;
    const att = arr(s.att).filter(x => Array.isArray(x) && num(x[1]) >= cut.results);
    let res = obj(s.res), srs = obj(s.srs), days = obj(s.days), dayAc = obj(s.dayAc), readTimes = obj(s.readTimes);
    if (!knowsR) {
      // 削除より後の解答だけで作り直す
      res = {}; days = {}; dayAc = {}; readTimes = {};
      for (const [id, t, ok] of att) {
        const r = res[id] || (res[id] = { ac: 0, wa: 0, last: null, t: 0 });
        ok ? r.ac++ : r.wa++;
        if (t >= r.t) { r.t = t; r.last = ok ? "AC" : "WA"; }
        const k = dateKey(t); days[k] = (days[k] || 0) + 1; if (ok) dayAc[k] = (dayAc[k] || 0) + 1;
      }
      srs = Object.fromEntries(Object.entries(srs).filter(([, v]) => v && num(v.t) >= cut.results));
    }
    if (!knowsA && knowsR) {
      // 「すべて」の削除を知らない側:日ごとの数は att から作り直す(結果の削除は知っているので res は使える)
      days = {}; dayAc = {};
      for (const [, t, ok] of att) { const k = dateKey(t); days[k] = (days[k] || 0) + 1; if (ok) dayAc[k] = (dayAc[k] || 0) + 1; }
    }
    const contests = arr(s.contests).filter(c => c && num(c.t) >= cut.contests);
    return {
      att, res, srs, days, dayAc, readTimes, contests,
      legacy: knowsC ? s.legacy || null : null,
      badges: knowsA ? obj(s.badges) : {},
      scores: knowsA ? arr(s.scores) : [],
      goal: knowsA ? s.goal || null : null,
      del: obj(s.del)
    };
  }

  function merge(local, remote) {
    local = obj(local); remote = obj(remote);
    const cut = cutsOf(local, remote);
    const a = clean(local, cut), b = clean(remote, cut);
    const out = {};
    // 手元だけの項目はそのまま(prefs は手元を優先し,読んだ更新履歴の位置だけ大きい方)
    for (const k of Object.keys(remote)) out[k] = remote[k]; // 新しい版で増えた項目も消さない
    for (const k of Object.keys(local)) out[k] = local[k];
    out.ver = Math.max(num(local.ver), num(remote.ver), 2);
    out.prefs = Object.assign({}, obj(remote.prefs), obj(local.prefs));
    out.prefs.seenLog = Math.max(num(obj(local.prefs).seenLog), num(obj(remote.prefs).seenLog)) || undefined;
    if (out.prefs.seenLog === undefined) delete out.prefs.seenLog;
    out.live = local.live || null;
    out.wipe = cut.wipe;

    // att:(id, 時刻)で重複を除いて合わせ,時刻順に
    // 同じ (id, 時刻) で正誤が食い違うことは実際には起きないが,起きたら AC を採る(順番によらず同じ結果にするため)
    const seen = new Map(), att = [];
    for (const x of [...a.att, ...b.att]) {
      const k = x[0] + "|" + x[1], ok = x[2] ? 1 : 0;
      if (!seen.has(k)) { const e = [x[0], x[1], ok]; seen.set(k, e); att.push(e); } else if (ok) seen.get(k)[2] = 1;
    }
    att.sort((p, q) => p[1] - q[1] || (p[0] < q[0] ? -1 : p[0] > q[0] ? 1 : 0));
    out.att = att;

    // res:最後の結果は時刻の新しい方.回数は両方と att から数えた値の大きい方
    const cnt = {};
    for (const [id, , ok] of att) { const c = cnt[id] || (cnt[id] = { ac: 0, wa: 0 }); ok ? c.ac++ : c.wa++; }
    const res = {};
    for (const id of new Set([...Object.keys(a.res), ...Object.keys(b.res)])) {
      const x = a.res[id], y = b.res[id];
      const newer = !x ? y : !y ? x : num(y.t) !== num(x.t) ? (num(y.t) > num(x.t) ? y : x) : y.last === "AC" ? y : x;
      const c = cnt[id] || { ac: 0, wa: 0 };
      res[id] = {
        ac: Math.max(num(x && x.ac), num(y && y.ac), c.ac),
        wa: Math.max(num(x && x.wa), num(y && y.wa), c.wa),
        last: newer.last, t: num(newer.t)
      };
    }
    out.res = res;

    // srs:最後に解いた時刻 t の新しい方(t がない古い記録は 0 とみなし,同じなら復習日の遅い方)
    const srs = {};
    for (const id of new Set([...Object.keys(a.srs), ...Object.keys(b.srs)])) {
      const x = a.srs[id], y = b.srs[id];
      srs[id] = !x ? y : !y ? x : num(y.t) > num(x.t) || (num(y.t) === num(x.t) && num(y.due) > num(x.due)) ? y : x;
    }
    out.srs = srs;

    const maxMap = (p, q) => { const o = Object.assign({}, p); for (const [k, v] of Object.entries(q)) o[k] = Math.max(num(o[k]), num(v)); return o; };
    out.days = maxMap(a.days, b.days);
    out.dayAc = maxMap(a.dayAc, b.dayAc);

    // 長文の所要時間:長文ごとに,記録の多い方
    const rt = Object.assign({}, b.readTimes);
    for (const [k, v] of Object.entries(a.readTimes)) if (!rt[k] || arr(v).length >= arr(rt[k]).length) rt[k] = v;
    out.readTimes = rt;

    // 本番:時刻で重複を除く
    const ct = new Map();
    for (const c of [...a.contests, ...b.contests]) if (!ct.has(c.t)) ct.set(c.t, c);
    out.contests = [...ct.values()].sort((p, q) => p.t - q.t);
    out.legacy = a.legacy || b.legacy || null;

    // 実績:和集合(解除した時刻は早い方)
    const bd = Object.assign({}, b.badges);
    for (const [k, v] of Object.entries(a.badges)) bd[k] = bd[k] ? Math.min(num(bd[k]), num(v)) : v;
    out.badges = bd;

    // 実際の TOEIC の点数:時刻で和集合.消した点数(del.scores)は除く
    const gone = new Set([...arr(a.del.scores), ...arr(b.del.scores)]);
    const sc = new Map();
    for (const x of [...a.scores, ...b.scores]) if (x && !gone.has(x.t) && !sc.has(x.t)) sc.set(x.t, x);
    out.scores = [...sc.values()].sort((p, q) => p.t - q.t);
    out.del = { scores: [...gone].sort((p, q) => p - q) };

    // 目標の点数:設定した時刻の新しい方
    out.goal = !a.goal ? b.goal : !b.goal ? a.goal : num(b.goal.t) > num(a.goal.t) ? b.goal : a.goal;
    if (!out.goal) out.goal = null;

    out.updatedAt = Math.max(num(local.updatedAt), num(remote.updatedAt));
    return out;
  }

  // 同期で送らない項目(その端末だけのもの)を除いたもの
  function shareable(s) {
    const o = Object.assign({}, s);
    delete o.live;
    delete o.prefs;
    delete o.updatedAt; // 保存のたびに変わるので送らない(中身が同じなら書き込まないため)
    return o;
  }

  const api = { merge, shareable, dateKey };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Merge = api;
})(typeof window !== "undefined" ? window : this);
