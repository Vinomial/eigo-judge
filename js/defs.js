"use strict";
/* 英語ジャッジ:定義集
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 定義集 ---------------- */
function defsHTML() {
  // 変化形: 元の形 → 単語中の表記の一覧
  const variants = {};
  WORDS.forEach(w => w.p.forEach(p => { if (p[2]) (variants[p[1] + p[2]] = variants[p[1] + p[2]] || new Set()).add(p[0]); }));
  const nameCell = (t, k) => `<td class="en"><b>${k}</b>${variants[t + k] ? `<br><span class="small muted">${[...variants[t + k]].join(", ")}</span>` : ""}</td>`;
  const roots = Object.keys(ROOT).map(r => {
    const ws = WORDS.filter(w => w.p.some(p => p[1] === "r" && partKey(p) === r));
    const learned = ws.filter(isLearned).length;
    return `<tr>${nameCell("r", r)}<td>${ROOT[r]}</td><td class="en">${ws.map(w => w.w).join(", ")}</td><td>${learned}/${ws.length}</td></tr>`;
  }).join("");
  const affix = Object.keys(AFFIX).map(a => `<tr>${nameCell("a", a)}<td>${AFFIX[a]}</td></tr>`).join("");
  const thm = Object.keys(THM).map(k => {
    const qs = GRAM.filter(q => q.t === k), ac = qs.filter(q => statusOf(q.id) === "AC").length;
    return `<details><summary><b>${THM[k].name}</b> <span class="small muted">AC ${ac}/${qs.length}</span></summary><div class="thm">${THM[k].s}</div><div class="small muted">前提の定義:${THM[k].def}</div>
      <p style="margin:10px 0 0"><button class="btn ghost sm" data-go="thm" data-thm="${k}">この定理の問題を解く(${qs.length}問)</button></p></details>`;
  }).join("");
  return `
  <h2 style="margin-top:0">語根(単語を導く定義)</h2>
  <p class="mode-note">習得は,2回以上続けて正解した単語の数です.小さい字は単語の中での変化形です.</p>
  <div style="overflow-x:auto"><table><thead><tr><th>語根</th><th>意味</th><th>導出される単語</th><th>習得</th></tr></thead><tbody>${roots}</tbody></table></div>
  <h2>接頭辞・接尾辞</h2>
  <table><tbody>${affix}</tbody></table>
  <h2>文法の定理</h2>
  ${thm}`;
}
