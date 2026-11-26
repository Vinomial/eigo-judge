"use strict";
/* 英語ジャッジ:問題一覧
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 問題一覧 ---------------- */
function units(dom) {
  if (dom === "word") return WORDS.map(q => ({ id: q.id, d: q.d, label: `<span class="en">${q.w}</span>` }));
  if (dom === "grammar") return GRAM.map(q => ({ id: q.id, d: q.d, label: `<span class="pid">G${q.id.slice(1)}</span>${esc(THM[q.t].name)}` }));
  return READING.map(p => ({ id: p.id, d: passageD(p), label: `<span class="pid">R${p.id.slice(1)}</span>${esc(p.kind)}` }));
}
function filteredUnits() {
  const f = LIST.filter;
  return units(LIST.dom).filter(u => {
    const s = unitStatus(LIST.dom, u.id);
    return f === "all" || (f === "notac" && s !== "AC") || (f === "wa" && s === "WA");
  }).sort((a, b) => a.d - b.d || a.id.localeCompare(b.id, "en", { numeric: true }));
}
function renderList() {
  if (pState) { renderSolve(); return; }
  const m = $("#main"), dom = LIST.dom, all = units(dom);
  const byThm = dom === "grammar" && LIST.group === "thm";
  const cnt = s => all.filter(u => unitStatus(dom, u.id) === s).length;
  const shown = filteredUnits();
  const chip = (u, label, grp) => {
    const s = unitStatus(dom, u.id);
    return `<button class="chip${s ? " st-" + s.toLowerCase() : ""}" data-pid="${u.id}"${grp ? ` data-grp="${grp}"` : ""}><span class="dot" style="${rc(u.d)}"></span><span class="cl">${label}</span><span class="cd">${u.d}</span></button>`;
  };
  const section = (head, sub, inAll, us, label, grp, open) => {
    const ac = inAll.filter(u => unitStatus(dom, u.id) === "AC").length;
    return `<details class="band"${open ? " open" : ""}>
      <summary>${head}<span class="small muted bcount">AC ${ac}/${inAll.length}</span></summary>${sub}
      ${us.length ? `<div class="chips">${us.map(u => chip(u, label(u), grp)).join("")}</div>` : `<p class="small muted">該当なし</p>`}
    </details>`;
  };
  let body;
  if (byThm) {
    // 定理別:1つの定理を続けて解ける.ラベルは問題文(定理名は見出しにあるので)
    body = Object.keys(THM).map(k => {
      const inAll = all.filter(u => GRAM_BY.get(u.id).t === k), us = shown.filter(u => GRAM_BY.get(u.id).t === k);
      const sub = `<p class="small muted thm-s">${THM[k].s}</p>`;
      return section(`<span class="bname">${esc(THM[k].name)}</span>`, sub, inAll, us, u => `<span class="en">${esc(GRAM_BY.get(u.id).q.replace("____", "＿"))}</span>`, k, us.length > 0 && LIST.filter !== "all");
    }).join("");
  } else {
    body = TIERS.map((t, i) => {
      const hi = TIERS[i + 1] ? TIERS[i + 1].min : Infinity;
      const inAll = all.filter(u => u.d >= t.min && u.d < hi), us = shown.filter(u => u.d >= t.min && u.d < hi);
      if (!inAll.length) return "";
      // その色の未 AC からランダムに解く(押しても色帯は開閉しない)
      const left = inAll.filter(u => unitStatus(dom, u.id) !== "AC").length;
      const rnd = left ? `<button class="bt-rnd" data-rnd="${t.min}:${hi === Infinity ? 3200 : hi - 1}:${t.name}" title="この色の未 AC からランダムに解く">ランダム</button>` : "";
      return section(`<span class="dot" style="--rc:var(${t.color})"></span><span class="bname">${t.name}</span> <span class="muted small">${t.min}〜${hi === Infinity ? "" : hi - 1}</span>${rnd}`, "", inAll, us, u => u.label, "", true);
    }).join("");
  }
  m.innerHTML = `
    <div class="seg" role="group" aria-label="分野">${Object.keys(DOMAINS).map(k => `<button data-dom="${k}" aria-pressed="${dom === k}">${DOMAINS[k]}</button>`).join("")}</div>
    <div class="row" style="justify-content:space-between;margin-bottom:6px">
      <div class="seg sm" role="group" aria-label="絞り込み">${[["all", "すべて"], ["notac", "未 AC"], ["wa", "WA"]].map(([k, v]) => `<button data-f="${k}" aria-pressed="${LIST.filter === k}">${v}</button>`).join("")}</div>
      <button class="btn" data-go="auto">おまかせ</button>
    </div>
    ${dom === "grammar" ? `<div class="seg sm" role="group" aria-label="並べ方" style="margin:6px 0">${[["d", "難易度順"], ["thm", "定理別"]].map(([k, v]) => `<button data-g="${k}" aria-pressed="${(LIST.group || "d") === k}">${v}</button>`).join("")}</div>` : ""}
    ${dom === "word" ? `<div class="seg sm" role="group" aria-label="出題の向き" style="margin:6px 0">${[["mix", "混ぜる"], ["ej", "英語→意味"], ["je", "意味→英語"]].map(([k, v]) => `<button data-wd="${k}" aria-pressed="${(S.prefs.wdir || "mix") === k}">${v}</button>`).join("")}</div>` : ""}
    ${dom === "word" ? `<input type="search" id="wsearch" class="search" placeholder="単語を検索(つづり・意味)" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="単語を検索"><p id="wnone" class="small muted" hidden>見つかりませんでした.「すべて」に切り替えると,AC 済みの単語も探せます.</p>` : ""}
    <p class="mode-note">AC ${cnt("AC")} · WA ${cnt("WA")} · 未挑戦 ${all.length - cnt("AC") - cnt("WA")}(全 ${all.length}${dom === "reading" ? "題" : "問"}).最後に解いた結果を表示します.問題を押すと練習モードで解けます.${byThm ? "定理名を押すと,その定理の問題が開きます." : ""}</p>
    ${body}`;
  const savePref = () => { S.prefs.list = { dom: LIST.dom, filter: LIST.filter, group: LIST.group }; save(); };
  m.querySelectorAll("[data-dom]").forEach(b => b.onclick = () => { LIST.dom = b.dataset.dom; savePref(); renderList(); });
  m.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { LIST.filter = b.dataset.f; savePref(); renderList(); });
  m.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { LIST.group = b.dataset.g; savePref(); renderList(); });
  m.querySelectorAll("[data-wd]").forEach(b => b.onclick = () => { S.prefs.wdir = b.dataset.wd; save(); renderList(); });
  m.querySelectorAll("[data-rnd]").forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const [lo, hi, name] = b.dataset.rnd.split(":");
    startRandom(dom, +lo, +hi, "notac", "list", `${name}の未 AC からランダム`);
  });
  m.querySelectorAll("[data-pid]").forEach(b => b.onclick = () => {
    const grp = b.dataset.grp; // 定理別のときは,その定理の中だけを順に解く
    const ids = filteredUnits().filter(u => !grp || GRAM_BY.get(u.id).t === grp).map(u => u.id);
    startSolve(dom, b.dataset.pid, ids, grp ? THM[grp].name : "");
  });
  // 単語の検索:つづり(前方・部分一致)と意味で探す.当てはまる語のない帯は隠し,ある帯は開く
  const search = $("#wsearch");
  if (search) {
    const run = () => {
      const q = search.value.trim().toLowerCase();
      LIST.q = search.value;
      let hit = 0;
      m.querySelectorAll(".band").forEach(sec => {
        let n = 0;
        sec.querySelectorAll(".chip").forEach(c => {
          const w = WORD_BY.get(c.dataset.pid);
          const ok = !q || (w && (w.w.toLowerCase().includes(q) || w.m.includes(q)));
          c.hidden = !ok; if (ok) n++;
        });
        sec.hidden = !!q && n === 0;
        if (q && n) sec.open = true;
        hit += n;
      });
      $("#wnone").hidden = !q || hit > 0;
    };
    search.oninput = run;
    if (LIST.q) { search.value = LIST.q; run(); }
  }
  bindGo();
}
