"use strict";
/* 英語ジャッジ:テーマとショップ
 * テーマは色の組(CSS 変数)を切り替える.「自動」は端末のライト/ダークに合わせ(style.css の既定),それ以外は <html> に直接設定する.
 * コインは保存せず,記録から毎回数える(端末間で食い違わないように).保存するのは買ったテーマ S.owned { id: 買った時刻 } だけ.
 * 使っているテーマは S.prefs.theme(端末ごと).
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- テーマ ----------------
 * c: 色.bg 背景,surface カード,sunk くぼみ,ink 文字,muted 薄い文字,line 線,accent 強調,on 強調の上の文字,
 *    ac / wa 正解・不正解,acBg / waBg その背景,hl 根拠の文の色.deco は背景の模様(グラデーション.省略可).
 * tone: light / dark(レートの色やフォームの色をそれに合わせる). */
const THEMES = [
  { id: "auto", name: "自動", desc: "端末の設定に合わせてライトとダークを切り替える", price: 0 },
  { id: "light", name: "ライト", desc: "いつもの明るい画面", price: 0, tone: "light",
    c: { bg: "#F3F4EF", surface: "#FFFFFF", sunk: "#E9EBE4", ink: "#1B2330", muted: "#5D6776", line: "#D6D9D0", accent: "#2C4895", on: "#FFFFFF", ac: "#23804F", wa: "#B86B0A", acBg: "#DCEFE2", waBg: "#F6E6CF", hl: "#FFF1B8" } },
  { id: "dark", name: "ダーク", desc: "暗い場所で目にやさしい", price: 0, tone: "dark",
    c: { bg: "#13171D", surface: "#1B2028", sunk: "#232A34", ink: "#E6E9ED", muted: "#9AA3AF", line: "#2E3641", accent: "#8EA6EE", on: "#10131A", ac: "#5AC489", wa: "#E6A24B", acBg: "#1E3A2A", waBg: "#40301A", hl: "#4A4220" } },
  { id: "floss", name: "わたあめ", desc: "ピンクと水色のパステル(fairy floss)", price: 120, tone: "light",
    c: { bg: "#FBF3FA", surface: "#FFFFFF", sunk: "#F3E6F4", ink: "#3A2C46", muted: "#7E6E8C", line: "#EBD8EE", accent: "#C2549A", on: "#FFFFFF", ac: "#2E8C78", wa: "#C86A2E", acBg: "#DDF3EE", waBg: "#FBE6DA", hl: "#FFF0C9",
      deco: "linear-gradient(160deg, #FDE7F3 0%, #F3EEFF 45%, #E2F4FF 100%)" } },
  { id: "mint", name: "ミント", desc: "すっきりした薄い緑", price: 80, tone: "light",
    c: { bg: "#EFF7F3", surface: "#FFFFFF", sunk: "#E0EFE8", ink: "#16302A", muted: "#57716A", line: "#CFE3DA", accent: "#14806A", on: "#FFFFFF", ac: "#1E7F4A", wa: "#B5651D", acBg: "#D7F0E1", waBg: "#F6E5D2", hl: "#FFF3B5" } },
  { id: "ocean", name: "海", desc: "青い海と白い砂浜", price: 100, tone: "light",
    c: { bg: "#EEF5FA", surface: "#FFFFFF", sunk: "#DFEBF4", ink: "#12283A", muted: "#56697A", line: "#CBDCE8", accent: "#1567A8", on: "#FFFFFF", ac: "#1D7F5C", wa: "#BE6A12", acBg: "#D8F0E5", waBg: "#F7E6D0", hl: "#FFF2B8",
      deco: "linear-gradient(180deg, #E4F1FB 0%, #F4F8FA 60%, #FAF6EC 100%)" } },
  { id: "forest", name: "森", desc: "落ち着いた深い緑", price: 100, tone: "light",
    c: { bg: "#F1F3EA", surface: "#FBFCF7", sunk: "#E3E8D7", ink: "#1E2A1C", muted: "#5E6B57", line: "#D2D9C3", accent: "#3E6B2E", on: "#FFFFFF", ac: "#2D7A3A", wa: "#A8621A", acBg: "#DCEBD4", waBg: "#F2E3CC", hl: "#F6EDB0" } },
  { id: "coffee", name: "珈琲", desc: "カフェのような茶色", price: 120, tone: "light",
    c: { bg: "#F5EFE6", surface: "#FFFBF5", sunk: "#EADFCF", ink: "#2E2118", muted: "#76665A", line: "#DFD1BE", accent: "#7A4A2A", on: "#FFFFFF", ac: "#3C7A43", wa: "#B5561E", acBg: "#DFEBD8", waBg: "#F5DFCF", hl: "#F9EAB4" } },
  { id: "washi", name: "和紙", desc: "生成りの紙に藍と朱", price: 150, tone: "light",
    c: { bg: "#F4EFE3", surface: "#FBF8F0", sunk: "#E9E2D2", ink: "#22252E", muted: "#6B6A66", line: "#DCD3C0", accent: "#28407A", on: "#FFFFFF", ac: "#3B7A57", wa: "#C2412D", acBg: "#DDEBDF", waBg: "#F6DCD5", hl: "#F7E9A8" } },
  { id: "sunset", name: "夕焼け", desc: "オレンジから紫へのグラデーション", price: 150, tone: "light",
    c: { bg: "#FFF3EA", surface: "#FFFFFF", sunk: "#FBE4D4", ink: "#3A2318", muted: "#86685A", line: "#F2D5C2", accent: "#D1572B", on: "#FFFFFF", ac: "#2F8559", wa: "#B9451E", acBg: "#DDF0E3", waBg: "#FADBD0", hl: "#FFEFB0",
      deco: "linear-gradient(170deg, #FFE3CC 0%, #FFF3EA 45%, #F5E6F4 100%)" } },
  { id: "sakura", name: "夜桜", desc: "夜空に浮かぶ桜色", price: 180, tone: "dark",
    c: { bg: "#1D1621", surface: "#271E2C", sunk: "#32283A", ink: "#F3E8EF", muted: "#B6A4B5", line: "#3E3346", accent: "#F29CC2", on: "#2A1424", ac: "#6CCB97", wa: "#F0A55A", acBg: "#203B2D", waBg: "#45301E", hl: "#4D3A24",
      deco: "radial-gradient(120% 60% at 80% 0%, #3A2440 0%, #1D1621 60%)" } },
  { id: "midnight", name: "深夜", desc: "濃い紺に金色", price: 200, tone: "dark",
    c: { bg: "#0E1424", surface: "#161E33", sunk: "#1D2740", ink: "#E8ECF6", muted: "#97A2BD", line: "#28334F", accent: "#E5C068", on: "#1B1608", ac: "#5CC68F", wa: "#F09A4A", acBg: "#183428", waBg: "#3E2B17", hl: "#463A17" } },
  { id: "terminal", name: "ターミナル", desc: "黒い画面に緑の文字", price: 250, tone: "dark",
    c: { bg: "#0B0F0B", surface: "#111811", sunk: "#172117", ink: "#C8F7C5", muted: "#7FAE7B", line: "#22331F", accent: "#39D353", on: "#04140A", ac: "#39D353", wa: "#F0B429", acBg: "#123018", waBg: "#33280C", hl: "#2E3A12" } }
];
const THEME_BY = new Map(THEMES.map(t => [t.id, t]));
const VARS = { bg: "--bg", surface: "--surface", sunk: "--sunk", ink: "--ink", muted: "--muted", line: "--line", accent: "--accent", on: "--on-accent", ac: "--ac", wa: "--wa", acBg: "--ac-bg", waBg: "--wa-bg", hl: "--hl", deco: "--bg-deco" };
let previewTheme = null; // ショップで「試す」中のテーマ(画面を離れると元に戻す)

const ownsTheme = id => { const t = THEME_BY.get(id); return !!t && (t.price === 0 || !!(S.owned && S.owned[id])); };
const currentTheme = () => (ownsTheme(S.prefs.theme) ? S.prefs.theme : "auto");
// テーマを画面に当てる(保存はしない)
function applyTheme(id) {
  const t = THEME_BY.get(id) || THEME_BY.get("auto"), root = document.documentElement;
  Object.values(VARS).forEach(v => root.style.removeProperty(v));
  if (t.c) {
    Object.entries(VARS).forEach(([k, v]) => { if (t.c[k]) root.style.setProperty(v, t.c[k]); });
    root.dataset.tone = t.tone;
  } else delete root.dataset.tone;
  root.dataset.theme = t.id;
  // ブラウザの上の帯の色も合わせる(自動のときは index.html の既定に戻す)
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => {
    if (t.c) { m.dataset.def = m.dataset.def || m.content; m.content = t.c.bg; } else if (m.dataset.def) m.content = m.dataset.def;
  });
}
function setTheme(id) { if (!ownsTheme(id)) return false; S.prefs.theme = id; previewTheme = null; save(); applyTheme(id); return true; }

/* ---------------- コイン ----------------
 * 記録から数える:問題ごとにその日初めての AC で1枚,本番1回で10枚,1日に GOAL 問以上解いた日に10枚,実績1つで20枚.
 * 使ったコイン = 買ったテーマの値段の合計.残りが負になったら(記録を消したときなど)0 と表示し,買えない. */
const COIN = { ac: 1, contest: 10, goalDay: 10, badge: 20 };
function coinParts() {
  const seen = new Set();
  for (const [id, t, ok] of S.att) if (ok) seen.add(id + "|" + dateKey(t));
  const goalDays = Object.values(S.days).filter(n => n >= GOAL).length;
  return [
    { name: "AC(問題ごとに1日1回)", n: seen.size, each: COIN.ac },
    { name: "本番", n: S.contests.length, each: COIN.contest },
    { name: `1日 ${GOAL} 問以上解いた日`, n: goalDays, each: COIN.goalDay },
    { name: "実績", n: Object.keys(S.badges).length, each: COIN.badge }
  ];
}
const coinsEarned = () => coinParts().reduce((a, x) => a + x.n * x.each, 0);
const coinsSpent = () => Object.keys(S.owned || {}).reduce((a, id) => a + ((THEME_BY.get(id) || {}).price || 0), 0);
const coins = () => coinsEarned() - coinsSpent();
const COIN_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/></svg>`;
function renderCoin() { const b = $("#hdr-coin"); if (b) b.innerHTML = `${COIN_SVG}<span>${Math.max(0, coins())}</span>`; }

function buyTheme(id) {
  const t = THEME_BY.get(id);
  if (!t || ownsTheme(id)) return;
  if (coins() < t.price) { toast(`コインが ${t.price - Math.max(0, coins())} 枚足りません.`); return; }
  if (!confirm(`「${t.name}」を ${t.price} コインで買いますか?`)) return;
  S.owned = Object.assign({}, S.owned, { [id]: Date.now() });
  setTheme(id);
  toast(`<b>「${esc(t.name)}」を買いました</b><br><span class="small">テーマを切り替えました.</span>`);
  render();
}

/* ---------------- ショップの画面 ---------------- */
function swatchHTML(t) {
  const c = t.c || THEME_BY.get("light").c, d = THEME_BY.get("dark").c;
  // 自動は左右でライトとダークを見せる
  const half = (c, clip) => `<span class="sw-half" style="background:${c.deco || c.bg};${clip}"><span class="sw-card" style="background:${c.surface};border-color:${c.line}"><i style="background:${c.ink}"></i><i style="background:${c.muted};width:60%"></i><span class="sw-btn" style="background:${c.accent}"></span><span class="sw-dots"><b style="background:${c.ac}"></b><b style="background:${c.wa}"></b></span></span></span>`;
  return `<span class="sw">${t.c ? half(c, "") : half(THEME_BY.get("light").c, "clip-path:inset(0 50% 0 0)") + half(d, "clip-path:inset(0 0 0 50%)")}</span>`;
}
function renderShop() {
  const m = $("#main"), have = Math.max(0, coins()), cur = currentTheme(), shown = previewTheme || cur;
  m.innerHTML = `
    <div class="shophead">
      <div><div class="lab">持っているコイン</div><div class="coinbig">${COIN_SVG}<b>${have}</b></div></div>
      <button class="btn ghost sm" data-go="home">← ホーム</button>
    </div>
    ${previewTheme ? `<div class="banner">「${esc(THEME_BY.get(previewTheme).name)}」を試しています.ほかの画面に移ると元に戻ります.</div>` : ""}
    <h2>テーマ</h2>
    <div class="themes">${THEMES.map(t => {
      const own = ownsTheme(t.id), using = t.id === cur;
      const act = using ? `<span class="tag on">使用中</span>`
        : own ? `<button class="btn sm" data-use="${t.id}">使う</button>`
        : `<button class="btn ghost sm" data-try="${t.id}">試す</button><button class="btn sm" data-buy="${t.id}" ${have < t.price ? "disabled" : ""}>${COIN_SVG}${t.price}</button>`;
      return `<div class="theme${t.id === shown ? " sel" : ""}">${swatchHTML(t)}
        <div class="tinfo"><b>${esc(t.name)}</b><span>${esc(t.desc)}</span><span class="small muted">${t.price ? (own ? "購入済み" : `${t.price} コイン`) : "無料"}</span></div>
        <div class="tact">${act}</div></div>`;
    }).join("")}</div>
    <h2>コインのため方</h2>
    <table class="coint"><tbody>${coinParts().map(x => `<tr><td>${x.name}</td><td>${x.each} 枚 × ${x.n}</td><td><b>${x.each * x.n}</b></td></tr>`).join("")}
      <tr><td>テーマに使った分</td><td></td><td><b>−${coinsSpent()}</b></td></tr></tbody></table>
    <p class="small muted">コインは記録から数えます.同じ問題で何度 AC しても,もらえるのは1日1枚までです.「問題の結果」を削除すると,その分のコインも減ります(買ったテーマはそのまま使えます).買ったテーマはログインした端末どうしで共有され,どのテーマを使うかは端末ごとに選べます.</p>`;
  m.querySelectorAll("[data-use]").forEach(b => b.onclick = () => { setTheme(b.dataset.use); render(); });
  m.querySelectorAll("[data-try]").forEach(b => b.onclick = () => { previewTheme = b.dataset.try; applyTheme(previewTheme); renderShop(); });
  m.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => buyTheme(b.dataset.buy));
}
// ほかの画面に移ったら,試していたテーマを元に戻す(nav.js の render から呼ぶ)
function endPreview() { if (previewTheme && view !== "shop") { previewTheme = null; applyTheme(currentTheme()); } }
