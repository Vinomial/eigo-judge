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
/* ---------------- 背景の柄(テーマの強調色をうすく敷く.形は style.css の --pat) ---------------- */
const BGS = [
  { id: "bg:none", name: "なし", desc: "柄のない背景", price: 0 },
  { id: "bg:dots", name: "水玉", desc: "ころころした水玉", price: 40 },
  { id: "bg:stripe", name: "ストライプ", desc: "ななめのしま模様", price: 40 },
  { id: "bg:grid", name: "方眼ノート", desc: "ノートのような方眼", price: 50 },
  { id: "bg:check", name: "ギンガム", desc: "やさしいチェック柄", price: 60 },
  { id: "bg:heart", name: "ハート", desc: "小さなハートがいっぱい", price: 80 },
  { id: "bg:paw", name: "肉球", desc: "ねこの足あと", price: 80 },
  { id: "bg:cloud", name: "雲", desc: "ふわふわの雲", price: 80 },
  { id: "bg:star", name: "星", desc: "きらきらの星", price: 80 },
  { id: "bg:ume", name: "梅", desc: "お正月の梅の花", price: 100, season: "newyear" },
  { id: "bg:petal", name: "花びら", desc: "春の桜の花びら", price: 100, season: "spring" },
  { id: "bg:wave", name: "波", desc: "夏の青い波", price: 100, season: "summer" },
  { id: "bg:bat", name: "こうもり", desc: "ハロウィンの夜", price: 100, season: "halloween" },
  { id: "bg:snow", name: "雪の結晶", desc: "冬の結晶", price: 100, season: "winter" }
];
/* ---------------- 動く背景(カードの後ろでゆっくり動く.動きを減らす設定の端末では止める) ---------------- */
const MOTIONS = [
  { id: "motion:none", name: "なし", desc: "動かない背景", price: 0 },
  { id: "motion:sakura", name: "桜吹雪", desc: "桜の花びらが舞う", price: 200, n: 16, dir: "fall", g: "" },
  { id: "motion:snow", name: "雪", desc: "雪がしんしんと降る", price: 200, n: 22, dir: "fall", g: "" },
  { id: "motion:bubble", name: "シャボン玉", desc: "シャボン玉がのぼっていく", price: 220, n: 12, dir: "rise", g: "" },
  { id: "motion:twinkle", name: "星のまたたき", desc: "星がちかちか光る", price: 220, n: 18, dir: "stay", g: "✦" },
  { id: "motion:heart", name: "ふわふわハート", desc: "ハートがふわりと浮かぶ", price: 250, n: 12, dir: "rise", g: "♥" },
  { id: "motion:gold", name: "金の紙吹雪", desc: "新年を祝う金色", price: 250, n: 20, dir: "fall", g: "", season: "newyear" },
  { id: "motion:firefly", name: "ほたる", desc: "夏の夜のほたる", price: 250, n: 14, dir: "stay", g: "", season: "summer" },
  { id: "motion:ghost", name: "おばけ", desc: "ハロウィンのおばけがふわり", price: 250, n: 8, dir: "rise", g: "👻", season: "halloween" }
];
/* ---------------- カードの形(--radius・--shadow と枠を変える) ---------------- */
const CARDS = [
  { id: "card:std", name: "標準", desc: "角の丸い,薄い影のカード", price: 0 },
  { id: "card:puffy", name: "ぷっくり", desc: "大きく丸めた,ふんわり浮くカード", price: 80 },
  { id: "card:note", name: "手帳", desc: "点線のステッチ", price: 100 },
  { id: "card:sticky", name: "付せん", desc: "上に色の帯,紙の影", price: 100 },
  { id: "card:pop", name: "ポップ", desc: "太い線とくっきりした影", price: 120 }
];
/* ---------------- 草のマスの形(記録の草) ---------------- */
const GRASSES = [
  { id: "grass:square", name: "四角", desc: "いつもの草", price: 0 },
  { id: "grass:round", name: "まる", desc: "丸いマス", price: 40 },
  { id: "grass:heart", name: "ハート", desc: "ハートで育てる", price: 80 },
  { id: "grass:star", name: "星", desc: "星で育てる", price: 80 },
  { id: "grass:flower", name: "花", desc: "花で育てる", price: 80 }
];
/* ---------------- 正解スタンプ(練習で AC したとき,判定の横に押す) ---------------- */
const STAMPS = [
  { id: "stamp:none", name: "なし", desc: "スタンプなし", price: 0 },
  { id: "stamp:good", name: "よくできました", desc: "先生のはんこ", price: 60, txt: "よくできました" },
  { id: "stamp:excellent", name: "Excellent!", desc: "英語のごほうびスタンプ", price: 60, txt: "Excellent!" },
  { id: "stamp:hanamaru", name: "たいへんよくできました", desc: "花丸つき", price: 100, txt: "たいへんよく<br>できました" },
  { id: "stamp:paw", name: "肉球", desc: "ぺたっと肉球", price: 80, txt: "🐾" },
  { id: "stamp:daikichi", name: "大吉", desc: "お正月だけのおみくじ", price: 100, txt: "大吉", season: "newyear" },
  { id: "stamp:sakura", name: "サクラサク", desc: "春だけの合格スタンプ", price: 100, txt: "サクラサク", season: "spring" }
];

/* ショップのタブ.PREF_KEY がある種類は「1つを選んで使う」.wear は部位ごとに1つ,sticker は買うだけ(ステッカー帳に貼る) */
const SHOP_TABS = { theme: "テーマ", bg: "背景の柄", motion: "動く背景", card: "カード", grass: "草", font: "フォント", icon: "アイコン", fx: "演出", stamp: "スタンプ", pet: "マスコット", wear: "着せ替え", sticker: "ステッカー" };
const ITEMS = { theme: THEMES, bg: BGS, motion: MOTIONS, card: CARDS, grass: GRASSES, font: FONTS, icon: ICONSETS, fx: FXS, stamp: STAMPS, pet: PETS, wear: WEARS, sticker: STICKERS };
const ITEM_BY = new Map(Object.values(ITEMS).flat().map(x => [x.id, x]));
const PREF_KEY = { theme: "theme", bg: "bg", motion: "motion", card: "card", grass: "grass", font: "font", icon: "icons", fx: "fx", stamp: "stamp", pet: "pet" };
const DEFAULT_ITEM = { theme: "auto", bg: "bg:none", motion: "motion:none", card: "card:std", grass: "grass:square", font: "font:std", icon: "icon:line", fx: "fx:none", stamp: "stamp:none", pet: "pet:none" };
let shopTab = "theme";

const ownsItem = id => { const x = ITEM_BY.get(id); return !!x && (x.price === 0 || !!(S.owned && S.owned[id])); };
const kindOf = id => Object.keys(ITEMS).find(k => ITEMS[k].some(x => x.id === id));
// 季節の限定品は,その季節か,持っているときだけ並ぶ
const onSale = x => !x.season || inSeason(x.season) || ownsItem(x.id);
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
// 動く背景:.app の一番後ろに粒を並べる(位置・速さ・大きさはばらばら)
function applyMotion(id) {
  const app = document.querySelector(".app"); if (!app) return;
  const m = ITEM_BY.get(id), old = app.querySelector(".motion");
  if (!m || !m.n) { if (old) old.remove(); return; }
  if (old && old.dataset.m === m.id) return;
  const box = document.createElement("div"); box.className = "motion"; box.dataset.m = m.id; box.dataset.k = m.id.slice(7); box.setAttribute("aria-hidden", "true");
  const R = (a, b) => (a + Math.random() * (b - a)).toFixed(2);
  box.innerHTML = Array.from({ length: m.n }, (_, i) => `<i class="${m.dir}" style="--x:${((i + Math.random()) * 100 / m.n).toFixed(1)}%;--y:${R(4, 92)}%;--d:${R(m.dir === "stay" ? 2.5 : 9, m.dir === "stay" ? 5 : 18)}s;--dl:-${R(0, 18)}s;--s:${R(0.6, 1.25)};--dx:${R(-60, 60)}px;--r:${R(180, 720)}deg">${m.g}</i>`).join("");
  if (old) old.remove();
  app.prepend(box);
}
function applyLook() {
  applyTheme(currentTheme()); applyFont(currentItem("font")); applyIcons(currentItem("icon"));
  const root = document.documentElement;
  root.dataset.bg = currentItem("bg").slice(3);
  root.dataset.card = currentItem("card").slice(5);
  root.dataset.grass = currentItem("grass").slice(6);
  applyMotion(currentItem("motion"));
}
function useItem(kind, id) {
  if (!ownsItem(id)) return;
  if (kind === "wear") { // 着せ替えは部位ごとに1つ.着ている物をもう一度選ぶと外す
    const w = Object.assign({}, S.prefs.wear), s = WEAR_BY.get(id).slot;
    if (w[s] === id) delete w[s]; else w[s] = id;
    S.prefs.wear = w; save(); return;
  }
  if (!PREF_KEY[kind]) return; // ステッカーは貼るだけ
  S.prefs[PREF_KEY[kind]] = id; save();
  if (kind === "theme") setTheme(id);
  applyLook();
}

/* ---------------- 正解スタンプ ---------------- */
function stampHTML(id = currentItem("stamp")) {
  const x = ITEM_BY.get(id);
  return x && x.txt ? `<span class="stamp sp-${id.slice(6)}" aria-hidden="true">${x.txt}</span>` : "";
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
  if (!onSale(x)) { toast(`「${esc(x.name)}」は${SEASONS[x.season].name}だけ買えます.`); return; }
  if (coins() < x.price) { toast(`コインが ${x.price - Math.max(0, coins())} 枚足りません.`); return; }
  if (!confirm(`「${x.name}」を ${x.price} コインで買いますか?`)) return;
  S.owned = Object.assign({}, S.owned, { [id]: Date.now() });
  const kind = kindOf(id);
  if (kind === "wear" && !petOn()) S.prefs.pet = S.prefs.pet && S.prefs.pet !== "pet:none" ? S.prefs.pet : "pet:cat"; // 着せる相手がいなければねこを迎える
  useItem(kind, id);
  toast(`<b>「${esc(x.name)}」を買いました</b><br><span class="small">${kind === "sticker" ? "記録の「実績」のステッカー帳に貼りました." : kind === "wear" ? "さっそく着ています." : "さっそく使っています."}</span>`);
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
  if (kind === "fx") return `<span class="sw fxsw"><span>${{ "fx:none": "—", "fx:sound": "♪", "fx:maru": "◎", "fx:stars": "★", "fx:confetti": "✦" }[x.id]}</span></span>`;
  if (kind === "bg") return `<span class="sw bgsw" data-bgp="${x.id.slice(3)}"></span>`;
  if (kind === "motion") return `<span class="sw mosw" data-k="${x.id.slice(7)}">${x.n ? Array.from({ length: 5 }, (_, i) => `<i class="${x.dir}" style="--x:${8 + i * 19}%;--y:${[20, 62, 34, 75, 45][i]}%;--d:${x.dir === "stay" ? 3 : 5}s;--dl:-${i}s;--s:.8;--dx:10px;--r:200deg">${x.g}</i>`).join("") : "—"}</span>`;
  if (kind === "card") return `<span class="sw cardsw" data-cardp="${x.id.slice(5)}"><span class="cardsw-c"><i></i><i style="width:60%"></i></span></span>`;
  if (kind === "grass") return `<span class="sw grsw" data-grs="${x.id.slice(6)}">${[0, 2, 1, 4, 3, 1, 0, 3, 4, 2, 1, 2, 4, 0, 3].map(l => `<i class="l${l}"></i>`).join("")}</span>`;
  if (kind === "stamp") return `<span class="sw stsw">${x.txt ? stampHTML(x.id) : "—"}</span>`;
  if (kind === "pet") return `<span class="sw petsw">${x.id === "pet:none" ? "—" : petSVG(x.id, { stage: 2, mood: "happy" })}</span>`;
  if (kind === "wear") return `<span class="sw petsw">${petSVG(petOn() ? currentPet() : "pet:cat", { stage: 2, mood: "happy", wear: { [x.slot]: x.id } })}</span>`;
  if (kind === "sticker") return `<span class="sw stksw"><span>${x.e}</span></span>`;
  return "";
}
function shopAction(x, have) {
  const own = ownsItem(x.id), kind = shopTab;
  const buy = `<button class="btn sm" data-buy="${x.id}" ${have < x.price ? "disabled" : ""}>${COIN_SVG}${x.price}</button>`;
  if (kind === "sticker") return own ? `<span class="tag on">帳に貼った</span>` : buy;
  if (kind === "wear") return !own ? buy : currentWear()[x.slot] === x.id ? `<span class="tag on">着ている</span><button class="btn ghost sm" data-use="${x.id}">外す</button>` : `<button class="btn sm" data-use="${x.id}">着る</button>`;
  const using = x.id === currentItem(kind);
  const tryBtn = kind === "theme" ? `<button class="btn ghost sm" data-try="${x.id}">試す</button>` : (kind === "fx" && x.id !== "fx:none") ? `<button class="btn ghost sm" data-fx="${x.id}">試す</button>` : "";
  if (using) return `<span class="tag on">使用中</span>${kind === "fx" ? tryBtn : ""}`;
  return own ? `${tryBtn}<button class="btn sm" data-use="${x.id}">${kind === "pet" ? "えらぶ" : "使う"}</button>` : tryBtn + buy;
}
function renderShop() {
  const m = $("#main"), have = Math.max(0, coins());
  if (shopTab === "font") FONTS.forEach(loadFont); // 見本を正しい文字で出すため
  const cur = currentItem(PREF_KEY[shopTab] ? shopTab : "theme"), shownTheme = previewTheme || currentTheme();
  const items = ITEMS[shopTab].filter(onSale);
  const list = items.map(x => {
    const own = ownsItem(x.id);
    const sel = shopTab === "theme" ? x.id === shownTheme : shopTab === "wear" ? currentWear()[x.slot] === x.id : PREF_KEY[shopTab] ? x.id === cur : false;
    const sub = [shopTab === "wear" ? WEAR_SLOTS[x.slot] : "", x.price ? (own ? "購入済み" : `${x.price} コイン`) : "無料"].filter(Boolean).join(" · ");
    return `<div class="theme${sel ? " sel" : ""}" data-item="${x.id}">${previewHTML(shopTab, x)}
      <div class="tinfo"><b>${esc(x.name)}</b><span>${esc(x.desc)}</span>${x.season ? `<span class="seasontag">${seasonLabel(x.season)}</span>` : ""}<span class="small muted">${sub}</span></div>
      <div class="tact">${shopAction(x, have)}</div></div>`;
  }).join("");
  const now = Object.keys(SEASONS).filter(k => inSeason(k)).map(k => SEASONS[k].name);
  const note = {
    pet: "相棒はホームにいて,学習した日数で育ちます(ちび → こども 7日 → おとな 30日 → 名人 100日).その日の目標を達成するとにっこりします.",
    wear: "頭・首・顔に1つずつ着られます.着ている物をもう一度押すと外します.",
    sticker: "買ったステッカーは,記録の「実績」のステッカー帳に貼られます.学習の節目でもらえるステッカーもあります.",
    motion: "カードの後ろでゆっくり動きます.端末で「視差効果を減らす(動きを減らす)」を入れていると止まります.",
    grass: "記録の「学習」タブの草のマスの形が変わります.",
    stamp: "練習で AC したとき,判定の横に押されます."
  }[shopTab];
  const ownedN = Object.keys(S.owned || {}).filter(id => ITEM_BY.has(id)).length;
  m.innerHTML = `
    <div class="shophead">
      <div><div class="lab">持っているコイン</div><div class="coinbig">${COIN_SVG}<b>${have}</b></div></div>
      <button class="btn ghost sm" data-go="home">← ホーム</button>
    </div>
    <div class="shoptabs" role="tablist" aria-label="品物の種類">${Object.entries(SHOP_TABS).map(([k, v]) => `<button role="tab" data-stab="${k}" aria-pressed="${shopTab === k}" aria-selected="${shopTab === k}">${v}${ITEMS[k].some(x => x.season && inSeason(x.season) && !ownsItem(x.id)) ? `<span class="sdot" aria-label="限定品あり"></span>` : ""}</button>`).join("")}</div>
    ${now.length ? `<p class="small seasonnote">今は「${now.join("」「")}」の限定品が並んでいます.季節が過ぎると買えなくなります(買った品はずっと使えます).</p>` : ""}
    ${note ? `<p class="small muted">${note}</p>` : ""}
    ${previewTheme ? `<div class="banner">「${esc(THEME_BY.get(previewTheme).name)}」を試しています.ほかの画面に移ると元に戻ります.</div>` : ""}
    <div class="themes">${list}</div>
    <section class="rsec"><h2>コインのため方 <span class="small muted">買った品物 ${ownedN} 個</span></h2>
    <table class="coint"><tbody>${coinParts().map(x => `<tr><td>${x.name}</td><td>${x.each} 枚 × ${x.n}</td><td><b>${x.each * x.n}</b></td></tr>`).join("")}
      <tr><td>買い物に使った分</td><td></td><td><b>−${coinsSpent()}</b></td></tr></tbody></table>
    <p class="small muted">コインは記録から数えます.同じ問題で何度 AC しても,もらえるのは1日1枚までです.「問題の結果」を削除すると,その分のコインも減ります(買った品物はそのまま使えます).買った品物はログインした端末どうしで共有され,どれを使うかは端末ごとに選べます.</p></section>`;
  m.querySelectorAll("[data-stab]").forEach(b => b.onclick = () => { shopTab = b.dataset.stab; if (previewTheme) { previewTheme = null; applyTheme(currentTheme()); } renderShop(); });
  m.querySelectorAll("[data-use]").forEach(b => b.onclick = () => { useItem(shopTab, b.dataset.use); render(); });  m.querySelectorAll("[data-try]").forEach(b => b.onclick = () => { previewTheme = b.dataset.try; applyTheme(previewTheme); renderShop(); });
  m.querySelectorAll("[data-fx]").forEach(b => b.onclick = () => playFx(b.dataset.fx));
  m.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => buyItem(b.dataset.buy));
  bindGo();
}
