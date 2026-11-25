"use strict";
/* 英語ジャッジ:ショップ(テーマ・フォント・タブのアイコン・正解の演出)
 * 品物はすべて S.owned { id: 買った時刻 } に入る(テーマは "floss" のような id,それ以外は "font:maru" のように種類を前に付ける).
 * 使っている品物は端末ごとの設定:S.prefs.theme / font / icons / fx.
 * コインの数え方は js/theme.js(coinParts).使った分は買った品物の値段の合計.
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- フォント(画面の日本語の文字) ----------------
 * 標準以外は Google Fonts から読み込む(選んだときと,ショップのフォントのタブを開いたときだけ). */
const FONTS = [
  { id: "font:std", name: "標準", desc: "読みやすい角ゴシック", family: "Zen Kaku Gothic New", price: 0 },
  { id: "font:maru", name: "丸ゴシック", desc: "角の丸いやわらかい文字", family: "Zen Maru Gothic", q: "Zen+Maru+Gothic:wght@400;500;700", price: 80 },
  { id: "font:rounded", name: "まるもじ", desc: "ころんとした明るい文字", family: "M PLUS Rounded 1c", q: "M+PLUS+Rounded+1c:wght@400;500;700", price: 100 },
  { id: "font:mincho", name: "明朝", desc: "本のような落ち着いた文字", family: "Zen Old Mincho", q: "Zen+Old+Mincho:wght@400;700", price: 120 },
  { id: "font:hand", name: "手書き風", desc: "ペンで書いたような文字", family: "Klee One", q: "Klee+One:wght@400;600", price: 150 },
  { id: "font:dot", name: "ドット", desc: "昔のゲームのような文字", family: "DotGothic16", q: "DotGothic16", price: 200 }
];
/* ---------------- タブのアイコン ----------------
 * line / bold / duo は線の太さと塗りを CSS で変える.emoji は絵文字,pixel は 8×8 のドット絵に描きかえる. */
const ICONSETS = [
  { id: "icon:line", name: "標準", desc: "細い線のアイコン", price: 0 },
  { id: "icon:bold", name: "太線", desc: "くっきり太い線", price: 60 },
  { id: "icon:duo", name: "2色", desc: "うすく色を塗ったアイコン", price: 80 },
  { id: "icon:emoji", name: "絵文字", desc: "にぎやかな絵文字", price: 100 },
  { id: "icon:pixel", name: "ドット絵", desc: "8×8 のドット絵", price: 150 }
];
const NAV_EMOJI = { home: "🏠", list: "📝", contest: "⏱️", record: "📈", defs: "📖" };
// ドット絵:8行の文字列(# が塗る点)
const NAV_PIXEL = {
  home: ["...##...", "..####..", ".######.", "########", ".##..##.", ".##..##.", ".##..##.", ".######."],
  list: ["##.#####", "##......", "........", "##.#####", "##......", "........", "##.#####", "##......"],
  contest: ["..####..", "...##...", ".######.", "##..#.##", "##..#.##", "##.###.#", ".#.....#", "..#####."],
  record: ["#.......", "#.....##", "#....##.", "#.#.##..", "#.###...", "#..#....", "#.......", "########"],
  defs: [".######.", ".#....##", ".#.##..#", ".#....##", ".#.##..#", ".#....##", ".#......", ".#######"]
};
const pixelSVG = rows => `<svg viewBox="0 0 8 8" aria-hidden="true" class="pix"><path d="${rows.flatMap((r, y) => [...r].map((c, x) => (c === "#" ? `M${x} ${y}h1v1h-1z` : ""))).join("")}"/></svg>`;
/* ---------------- 正解したときの演出(練習モードの AC) ---------------- */
const FXS = [
  { id: "fx:none", name: "なし", desc: "演出なし", price: 0 },
  { id: "fx:sound", name: "正解の音", desc: "「ピンポン」と鳴る", price: 60 },
  { id: "fx:maru", name: "花丸", desc: "大きな花丸が出る", price: 80 },
  { id: "fx:stars", name: "星", desc: "星がはじける", price: 100 },
  { id: "fx:confetti", name: "紙吹雪", desc: "紙吹雪が舞う", price: 120 }
];
const SHOP_TABS = { theme: "テーマ", font: "フォント", icon: "アイコン", fx: "演出" };
const ITEMS = { theme: THEMES, font: FONTS, icon: ICONSETS, fx: FXS };
const ITEM_BY = new Map([...THEMES, ...FONTS, ...ICONSETS, ...FXS].map(x => [x.id, x]));
const PREF_KEY = { theme: "theme", font: "font", icon: "icons", fx: "fx" };
const DEFAULT_ITEM = { theme: "auto", font: "font:std", icon: "icon:line", fx: "fx:none" };
let shopTab = "theme";

const ownsItem = id => { const x = ITEM_BY.get(id); return !!x && (x.price === 0 || !!(S.owned && S.owned[id])); };
const currentItem = kind => (ownsItem(S.prefs[PREF_KEY[kind]]) ? S.prefs[PREF_KEY[kind]] : DEFAULT_ITEM[kind]);

// フォント:Google Fonts の CSS を1度だけ読み込み,画面の文字の変数を変える
const fontLoaded = new Set();
function loadFont(f) {
  if (!f.q || fontLoaded.has(f.id)) return;
  fontLoaded.add(f.id);
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = `https://fonts.googleapis.com/css2?family=${f.q}&display=swap`;
  document.head.append(l);
}
function applyFont(id) {
  const f = ITEM_BY.get(id) || FONTS[0], root = document.documentElement;
  if (f.id === "font:std") root.style.removeProperty("--font-ja");
  else { loadFont(f); root.style.setProperty("--font-ja", `"${f.family}"`); }
  root.dataset.font = f.id.slice(5);
}
// タブのアイコン
const NAV_SVG = new Map(); // 標準の SVG(描きかえる前のもの)
function applyIcons(id) {
  const set = (ITEM_BY.get(id) || ICONSETS[0]).id.slice(5), nav = $("#nav");
  if (!nav) return;
  nav.dataset.icons = set;
  nav.querySelectorAll("button").forEach(b => {
    const v = b.dataset.v, old = b.querySelector("svg, .emo");
    if (!NAV_SVG.has(v) && old && old.tagName.toLowerCase() === "svg" && !old.classList.contains("pix")) NAV_SVG.set(v, old.outerHTML);
    const html = set === "emoji" ? `<span class="emo" aria-hidden="true">${NAV_EMOJI[v]}</span>` : set === "pixel" ? pixelSVG(NAV_PIXEL[v]) : NAV_SVG.get(v);
    if (old && html) old.outerHTML = html;
  });
}
function applyLook() { applyTheme(currentTheme()); applyFont(currentItem("font")); applyIcons(currentItem("icon")); }
function useItem(kind, id) {
  if (!ownsItem(id)) return;
  S.prefs[PREF_KEY[kind]] = id; save();
  if (kind === "theme") setTheme(id);
  applyLook();
}

/* ---------------- 正解の演出 ---------------- */
let audioCtx = null;
function playFx(id = currentItem("fx")) {
  if (id === "fx:none") return;
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "fx:sound") {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      [[880, 0], [1320, 0.12]].forEach(([f, t]) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t0 = audioCtx.currentTime + t;
        o.frequency.value = f; o.type = "sine"; g.gain.setValueAtTime(0.18, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.25);
        o.connect(g).connect(audioCtx.destination); o.start(t0); o.stop(t0 + 0.26);
      });
    } catch (e) { /* 音が出せない環境では何もしない */ }
    return;
  }
  if (reduce) return; // 動きを減らす設定の端末では出さない
  const box = document.createElement("div"); box.className = "fx fx-" + id.slice(3); box.setAttribute("aria-hidden", "true");
  if (id === "fx:maru") box.innerHTML = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38"/><circle cx="50" cy="50" r="26"/><path d="M50 4l6 14 15-4-4 15 14 6-14 6 4 15-15-4-6 14-6-14-15 4 4-15-14-6 14-6-4-15 15 4z" class="petal"/></svg>`;
  else {
    const n = id === "fx:confetti" ? 36 : 14, colors = ["#F2545B", "#F7B32B", "#2EC4B6", "#5C7AEA", "#C77DFF", "#43AA8B"];
    box.innerHTML = Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.4, r = 90 + Math.random() * 110;
      const s = `--x:${Math.round(Math.cos(a) * r)}px;--y:${Math.round(Math.sin(a) * r - (id === "fx:confetti" ? 60 : 0))}px;--c:${colors[i % colors.length]};--r:${Math.round(Math.random() * 360)}deg;animation-delay:${(Math.random() * 0.12).toFixed(2)}s`;
      return `<i style="${s}">${id === "fx:stars" ? "★" : ""}</i>`;
    }).join("");
  }
  document.body.append(box);
  setTimeout(() => box.remove(), 1400);
}

/* ---------------- 買う ---------------- */
function buyItem(id) {
  const x = ITEM_BY.get(id);
  if (!x || ownsItem(id)) return;
  if (coins() < x.price) { toast(`コインが ${x.price - Math.max(0, coins())} 枚足りません.`); return; }
  if (!confirm(`「${x.name}」を ${x.price} コインで買いますか?`)) return;
  S.owned = Object.assign({}, S.owned, { [id]: Date.now() });
  const kind = Object.keys(ITEMS).find(k => ITEMS[k].includes(x));
  useItem(kind, id);
  toast(`<b>「${esc(x.name)}」を買いました</b><br><span class="small">さっそく使っています.</span>`);
  checkBadges();
  render();
}
// 互換:前のテーマだけのショップの関数名
const buyTheme = buyItem;

/* ---------------- ショップの画面 ---------------- */
function previewHTML(kind, x) {
  if (kind === "theme") return swatchHTML(x);
  if (kind === "font") return `<span class="sw fontsw" style="font-family:'${x.family}'"><b>英語ジャッジ</b><span>今日も1問</span></span>`;
  if (kind === "icon") {
    const set = x.id.slice(5);
    return `<span class="sw iconsw" data-icons="${set}">${Object.keys(NAV_EMOJI).map(v => set === "emoji" ? `<span class="emo">${NAV_EMOJI[v]}</span>` : set === "pixel" ? pixelSVG(NAV_PIXEL[v]) : (NAV_SVG.get(v) || "")).join("")}</span>`;
  }
  return `<span class="sw fxsw"><span>${{ "fx:none": "—", "fx:sound": "♪", "fx:maru": "◎", "fx:stars": "★", "fx:confetti": "✦" }[x.id]}</span></span>`;
}
function renderShop() {
  const m = $("#main"), have = Math.max(0, coins());
  if (shopTab === "font") FONTS.forEach(loadFont); // 見本を正しい文字で出すため
  const cur = currentItem(shopTab), shownTheme = previewTheme || currentTheme();
  const list = ITEMS[shopTab].map(x => {
    const own = ownsItem(x.id), using = x.id === cur;
    const tryBtn = shopTab === "theme" ? `<button class="btn ghost sm" data-try="${x.id}">試す</button>` : shopTab === "fx" && x.id !== "fx:none" ? `<button class="btn ghost sm" data-fx="${x.id}">試す</button>` : "";
    const act = using ? `<span class="tag on">使用中</span>${shopTab === "fx" && x.id !== "fx:none" ? tryBtn : ""}`
      : own ? `${tryBtn}<button class="btn sm" data-use="${x.id}">使う</button>`
      : `${tryBtn}<button class="btn sm" data-buy="${x.id}" ${have < x.price ? "disabled" : ""}>${COIN_SVG}${x.price}</button>`;
    const sel = shopTab === "theme" ? x.id === shownTheme : using;
    return `<div class="theme${sel ? " sel" : ""}">${previewHTML(shopTab, x)}
      <div class="tinfo"><b>${esc(x.name)}</b><span>${esc(x.desc)}</span><span class="small muted">${x.price ? (own ? "購入済み" : `${x.price} コイン`) : "無料"}</span></div>
      <div class="tact">${act}</div></div>`;
  }).join("");
  const ownedN = Object.keys(S.owned || {}).filter(id => ITEM_BY.has(id)).length;
  m.innerHTML = `
    <div class="shophead">
      <div><div class="lab">持っているコイン</div><div class="coinbig">${COIN_SVG}<b>${have}</b></div></div>
      <button class="btn ghost sm" data-go="home">← ホーム</button>
    </div>
    <div class="seg rtabs" role="tablist" aria-label="品物の種類">${Object.entries(SHOP_TABS).map(([k, v]) => `<button role="tab" data-stab="${k}" aria-pressed="${shopTab === k}" aria-selected="${shopTab === k}">${v}</button>`).join("")}</div>
    ${previewTheme ? `<div class="banner">「${esc(THEME_BY.get(previewTheme).name)}」を試しています.ほかの画面に移ると元に戻ります.</div>` : ""}
    <div class="themes">${list}</div>
    <section class="rsec"><h2>コインのため方 <span class="small muted">買った品物 ${ownedN} 個</span></h2>
    <table class="coint"><tbody>${coinParts().map(x => `<tr><td>${x.name}</td><td>${x.each} 枚 × ${x.n}</td><td><b>${x.each * x.n}</b></td></tr>`).join("")}
      <tr><td>買い物に使った分</td><td></td><td><b>−${coinsSpent()}</b></td></tr></tbody></table>
    <p class="small muted">コインは記録から数えます.同じ問題で何度 AC しても,もらえるのは1日1枚までです.「問題の結果」を削除すると,その分のコインも減ります(買った品物はそのまま使えます).買った品物はログインした端末どうしで共有され,どれを使うかは端末ごとに選べます.</p></section>`;
  m.querySelectorAll("[data-stab]").forEach(b => b.onclick = () => { shopTab = b.dataset.stab; if (previewTheme) { previewTheme = null; applyTheme(currentTheme()); } renderShop(); });
  m.querySelectorAll("[data-use]").forEach(b => b.onclick = () => { useItem(shopTab, b.dataset.use); render(); });
  m.querySelectorAll("[data-try]").forEach(b => b.onclick = () => { previewTheme = b.dataset.try; applyTheme(previewTheme); renderShop(); });
  m.querySelectorAll("[data-fx]").forEach(b => b.onclick = () => playFx(b.dataset.fx));
  m.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => buyItem(b.dataset.buy));
  bindGo();
}
