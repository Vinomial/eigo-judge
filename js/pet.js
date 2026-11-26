"use strict";
/* 英語ジャッジ:マスコットとステッカー帳
 * マスコット:ホームにいる小さな相棒.学習した日数(streaks().total)で育ち,今日の解いた数で表情が変わり,練習で AC すると顔を出す.
 *   選んでいる相棒は S.prefs.pet,着ている物は S.prefs.wear { head, neck, face }(どちらも端末ごと).
 *   相棒と着せ替えの品は,ほかの品物と同じく S.owned に入る("pet:rabbit","wear:crown").
 * ステッカー帳:学習の節目でもらえるステッカー(記録から数えるので保存しない)と,ショップで買うステッカー("stk:cake").
 * 絵はすべてこのファイルの SVG(外の画像は使わない).座標は 100×100 で,頭の中心 (50,44)・半径 24,目は (41,44) と (59,44).
 * js/ のファイルは index.html の順に読み込み,同じ大域の名前を共有する(ビルドなし).
 * 読み込んだ時点で動くのは宣言だけにし,起動の処理は main.js に置く. */

/* ---------------- 相棒 ---------------- */
const PETS = [
  { id: "pet:none", name: "なし", desc: "マスコットを出さない", price: 0 },
  { id: "pet:cat", name: "ねこ", desc: "気まぐれだけど,毎日来るとよろこぶ", price: 0 },
  { id: "pet:penguin", name: "ペンギン", desc: "まじめにコツコツ", price: 0 },
  { id: "pet:owl", name: "ふくろう", desc: "物知りで夜ふかし", price: 0 },
  { id: "pet:rabbit", name: "うさぎ", desc: "長い耳でよく聞く", price: 150 },
  { id: "pet:hamster", name: "ハムスター", desc: "ほおぶくろに単語をためる", price: 150 }
];
const PET_STAGES = [{ min: 0, name: "ちび" }, { min: 7, name: "こども" }, { min: 30, name: "おとな" }, { min: 100, name: "名人" }];
const PET_SCALE = [0.74, 0.85, 0.94, 1];

// 目(ふつう・にっこり・ねむい)
function petEyes(mood, x1 = 41, x2 = 59, y = 44, r = 3.2) {
  const ink = "#2B2622";
  if (mood === "happy") return [x1, x2].map(x => `<path d="M${x - 4} ${y + 1}q4 -5.5 8 0" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>`).join("");
  if (mood === "sleepy") return [x1, x2].map(x => `<path d="M${x - 4} ${y + 1}h8" fill="none" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`).join("");
  return [x1, x2].map(x => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ink}"/><circle cx="${x + 1}" cy="${y - 1.2}" r="${r * 0.32}" fill="#fff"/>`).join("");
}
const petCheeks = (y = 52) => `<ellipse cx="33" cy="${y}" rx="4.5" ry="3" fill="#F28C9B" opacity=".55"/><ellipse cx="67" cy="${y}" rx="4.5" ry="3" fill="#F28C9B" opacity=".55"/>`;
function petMouth(mood, y = 54) {
  if (mood === "happy") return `<path d="M45 ${y - 1}q5 7 10 0z" fill="#C8505A"/>`;
  if (mood === "sleepy") return `<circle cx="50" cy="${y}" r="1.6" fill="#7A4B4B"/>`;
  return `<path d="M46 ${y}q2 2.2 4 0q2 2.2 4 0" fill="none" stroke="#5A3A32" stroke-width="1.4" stroke-linecap="round"/>`;
}
// 相棒ごとの絵.face(mood) は顔の部品
const PET_ART = {
  cat: {
    body: `<path d="M70 85q22 -2 16 -24" fill="none" stroke="#E39B3F" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="50" cy="78" rx="23" ry="18" fill="#F4B860"/><ellipse cx="50" cy="82" rx="13" ry="11" fill="#FCE6C4"/>
      <path d="M27 34L29 13L45 24ZM73 34L71 13L55 24Z" fill="#F4B860"/><path d="M31 29L32 18L41 25ZM69 29L68 18L59 25Z" fill="#F7A1A8"/>
      <circle cx="50" cy="44" r="24" fill="#F4B860"/><path d="M50 21v7M44 22l1 6M56 22l-1 6" stroke="#E39B3F" stroke-width="2.5" stroke-linecap="round"/>`,
    face: m => `${petEyes(m)}${petCheeks()}<path d="M48 49h4l-2 2.5z" fill="#E0707A"/>${petMouth(m)}
      <path d="M30 50h-9M30 54l-8 2M70 50h9M70 54l8 2" stroke="#B9844A" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="41" cy="93" rx="6" ry="4" fill="#FCE6C4"/><ellipse cx="59" cy="93" rx="6" ry="4" fill="#FCE6C4"/>`
  },
  penguin: {
    body: `<ellipse cx="25" cy="74" rx="6" ry="12" transform="rotate(20 25 74)" fill="#33415A"/><ellipse cx="75" cy="74" rx="6" ry="12" transform="rotate(-20 75 74)" fill="#33415A"/>
      <ellipse cx="50" cy="76" rx="25" ry="20" fill="#3B4A66"/><ellipse cx="50" cy="79" rx="16" ry="15" fill="#fff"/>
      <circle cx="50" cy="44" r="24" fill="#3B4A66"/><ellipse cx="50" cy="49" rx="18" ry="14" fill="#fff"/>`,
    face: m => `${petEyes(m, 42, 58, 46)}${petCheeks(54)}<path d="M45 51h10l-5 5z" fill="#F5A623"/>
      <ellipse cx="41" cy="95" rx="7" ry="3.5" fill="#F5A623"/><ellipse cx="59" cy="95" rx="7" ry="3.5" fill="#F5A623"/>`
  },
  owl: {
    body: `<path d="M28 30L26 14L40 24ZM72 30L74 14L60 24Z" fill="#9C6B4E"/>
      <ellipse cx="50" cy="76" rx="25" ry="20" fill="#9C6B4E"/><ellipse cx="27" cy="76" rx="6" ry="13" fill="#85593F"/><ellipse cx="73" cy="76" rx="6" ry="13" fill="#85593F"/>
      <ellipse cx="50" cy="80" rx="15" ry="13" fill="#EBD7BA"/><path d="M44 76l2 2l2 -2M52 76l2 2l2 -2M48 83l2 2l2 -2" fill="none" stroke="#B48A66" stroke-width="1.4"/>
      <circle cx="50" cy="44" r="24" fill="#9C6B4E"/><circle cx="40" cy="44" r="9.5" fill="#FFF6E6"/><circle cx="60" cy="44" r="9.5" fill="#FFF6E6"/>`,
    face: m => `${petEyes(m, 40, 60, 44, 4)}<path d="M47 51h6l-3 6z" fill="#F0A13A"/>
      <path d="M41 95l3 -4l3 4M53 95l3 -4l3 4" fill="none" stroke="#F0A13A" stroke-width="2" stroke-linecap="round"/>`
  },
  rabbit: {
    body: `<ellipse cx="40" cy="17" rx="6.5" ry="16" transform="rotate(-8 40 17)" fill="#F4EFEA" stroke="#D9D0C7" stroke-width="1.5"/><ellipse cx="60" cy="17" rx="6.5" ry="16" transform="rotate(8 60 17)" fill="#F4EFEA" stroke="#D9D0C7" stroke-width="1.5"/>
      <ellipse cx="40" cy="18" rx="3" ry="11" transform="rotate(-8 40 18)" fill="#F7B3BE"/><ellipse cx="60" cy="18" rx="3" ry="11" transform="rotate(8 60 18)" fill="#F7B3BE"/>
      <circle cx="73" cy="86" r="6" fill="#fff" stroke="#D9D0C7" stroke-width="1.5"/>
      <ellipse cx="50" cy="78" rx="23" ry="18" fill="#F4EFEA" stroke="#D9D0C7" stroke-width="1.5"/>
      <circle cx="50" cy="44" r="24" fill="#F4EFEA" stroke="#D9D0C7" stroke-width="1.5"/>`,
    face: m => `${petEyes(m)}${petCheeks()}<path d="M48 49h4l-2 2.5z" fill="#E0707A"/>${petMouth(m)}
      <ellipse cx="41" cy="93" rx="6" ry="4" fill="#fff" stroke="#D9D0C7" stroke-width="1.2"/><ellipse cx="59" cy="93" rx="6" ry="4" fill="#fff" stroke="#D9D0C7" stroke-width="1.2"/>`
  },
  hamster: {
    body: `<circle cx="31" cy="25" r="7.5" fill="#E9B97A"/><circle cx="69" cy="25" r="7.5" fill="#E9B97A"/><circle cx="31" cy="25" r="4" fill="#F7B3BE"/><circle cx="69" cy="25" r="4" fill="#F7B3BE"/>
      <ellipse cx="50" cy="78" rx="24" ry="18" fill="#E9B97A"/><ellipse cx="50" cy="82" rx="15" ry="12" fill="#FFF5E6"/>
      <circle cx="50" cy="45" r="24" fill="#E9B97A"/><ellipse cx="50" cy="53" rx="17" ry="12" fill="#FFF5E6"/>`,
    face: m => `${petEyes(m, 41, 59, 45)}<ellipse cx="32" cy="53" rx="6" ry="4.5" fill="#F28C9B" opacity=".5"/><ellipse cx="68" cy="53" rx="6" ry="4.5" fill="#F28C9B" opacity=".5"/>
      <path d="M48 50h4l-2 2.5z" fill="#E0707A"/>${petMouth(m, 55)}
      <ellipse cx="44" cy="66" rx="4" ry="3" fill="#FFF5E6"/><ellipse cx="56" cy="66" rx="4" ry="3" fill="#FFF5E6"/>`
  }
};

/* ---------------- 着せ替え(slot ごとに1つ) ---------------- */
const WEAR_SLOTS = { head: "頭", neck: "首", face: "顔" };
const WEARS = [
  { id: "wear:ribbon", slot: "head", name: "リボン", desc: "頭にピンクのリボン", price: 60,
    art: `<g transform="translate(66 23) rotate(15)"><path d="M0 0L-11 -7L-11 7ZM0 0L11 -7L11 7Z" fill="#F06292"/><circle r="3.2" fill="#D94A7A"/></g>` },
  { id: "wear:beret", slot: "head", name: "ベレー帽", desc: "画家のような赤い帽子", price: 80,
    art: `<g transform="rotate(-10 50 20)"><ellipse cx="50" cy="22" rx="22" ry="8.5" fill="#C0392B"/><rect x="48.5" y="10" width="3" height="5" rx="1.5" fill="#8E2A20"/></g>` },
  { id: "wear:hachimaki", slot: "head", name: "はちまき", desc: "本番前の気合い", price: 80,
    art: `<path d="M30 31q20 -7 40 0v6q-20 -7 -40 0z" fill="#fff" stroke="#D33A3A" stroke-width="1.2"/><circle cx="50" cy="31" r="3" fill="#D33A3A"/><path d="M70 34l10 -5M70 35l9 5" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M70 34l10 -5M70 35l9 5" stroke="#D33A3A" stroke-width=".8" stroke-linecap="round"/>` },
  { id: "wear:crown", slot: "head", name: "王冠", desc: "金色にかがやく王冠", price: 300,
    art: `<path d="M35 24L37 8L44 17L50 5L56 17L63 8L65 24Z" fill="#F2C94C" stroke="#C99A1E" stroke-width="1.2" stroke-linejoin="round"/><circle cx="50" cy="18" r="2.2" fill="#E5484D"/>` },
  { id: "wear:flower", slot: "head", name: "花かんむり", desc: "春の花をあんだかんむり", price: 120, season: "spring",
    art: [[31, 30, "#F7A1C4"], [38, 24, "#FFE07A"], [46, 21, "#fff"], [54, 21, "#F7A1C4"], [62, 24, "#FFE07A"], [69, 30, "#fff"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="${c}" stroke="#E79AB4" stroke-width=".8"/><circle cx="${x}" cy="${y}" r="1.5" fill="#F2A33A"/>`).join("") },
  { id: "wear:straw", slot: "head", name: "麦わら帽子", desc: "夏の日ざしに", price: 120, season: "summer",
    art: `<ellipse cx="50" cy="25" rx="32" ry="7" fill="#E8C872"/><path d="M33 25q0 -17 17 -17q17 0 17 17z" fill="#E8C872"/><path d="M33.6 19h32.8v4.5h-32.8z" fill="#D9534F"/>` },
  { id: "wear:witch", slot: "head", name: "魔女の帽子", desc: "ハロウィンのとんがり帽子", price: 150, season: "halloween",
    art: `<ellipse cx="50" cy="25" rx="28" ry="6" fill="#4B2E6F"/><path d="M37 25L55 2L64 25Z" fill="#5B3A85"/><path d="M38.5 20h24.5v4.5h-24.5z" fill="#FF8A2A"/>` },
  { id: "wear:santa", slot: "head", name: "サンタの帽子", desc: "冬だけのふわふわ帽子", price: 150, season: "winter",
    art: `<path d="M30 27Q50 2 74 14L67 27Z" fill="#D62C2C"/><rect x="28" y="23" width="44" height="7" rx="3.5" fill="#fff"/><circle cx="75" cy="14" r="4.5" fill="#fff"/>` },
  { id: "wear:shishi", slot: "head", name: "獅子舞の頭", desc: "お正月の縁起物", price: 150, season: "newyear",
    art: `<path d="M28 28q22 -26 44 0z" fill="#C62828"/><path d="M30 26q20 -8 40 0" fill="none" stroke="#2E7D32" stroke-width="3"/><circle cx="41" cy="16" r="2.6" fill="#fff"/><circle cx="59" cy="16" r="2.6" fill="#fff"/><circle cx="41" cy="16" r="1.2" fill="#222"/><circle cx="59" cy="16" r="1.2" fill="#222"/><path d="M44 23h12" stroke="#F2C94C" stroke-width="2.5" stroke-linecap="round"/>` },
  { id: "wear:scarf", slot: "neck", name: "マフラー", desc: "あたたかい赤のしま模様", price: 80,
    art: `<path d="M30 64q20 9 40 0v7q-20 9 -40 0z" fill="#E5484D"/><path d="M59 69l3 15l7 -1l-3 -15z" fill="#E5484D"/><path d="M36 67.5v6M44 69.5v6M52 70v6M60.5 77l6.5 -1" stroke="#fff" stroke-width="1.6" opacity=".8"/>` },
  { id: "wear:bowtie", slot: "neck", name: "蝶ネクタイ", desc: "きちんとした青い蝶ネクタイ", price: 60,
    art: `<path d="M50 68L41 63L41 73ZM50 68L59 63L59 73Z" fill="#2C4895"/><circle cx="50" cy="68" r="2.6" fill="#1E3170"/>` },
  { id: "wear:bell", slot: "neck", name: "鈴", desc: "歩くとちりんと鳴る(気がする)", price: 70,
    art: `<path d="M32 65q18 8 36 0" fill="none" stroke="#E5484D" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="71" r="4.5" fill="#F2C94C" stroke="#C99A1E"/><path d="M48 72.5h4" stroke="#8A6A10" stroke-width="1"/>` },
  { id: "wear:glasses", slot: "face", name: "丸めがね", desc: "かしこそうに見える", price: 80,
    art: `<g fill="none" stroke="#3A2F28" stroke-width="1.8"><circle cx="41" cy="44" r="7.5"/><circle cx="59" cy="44" r="7.5"/><path d="M48.5 44h3"/></g>` },
  { id: "wear:shades", slot: "face", name: "サングラス", desc: "ちょっとワル", price: 100,
    art: `<path d="M32 40h16v5q-8 7 -16 0zM52 40h16v5q-8 7 -16 0z" fill="#222"/><path d="M48 41h4" stroke="#222" stroke-width="2"/>` }
];
const WEAR_BY = new Map(WEARS.map(w => [w.id, w]));
const SPARKLE = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6L1.6 -1.6L6 0L1.6 1.6L0 6L-1.6 1.6L-6 0L-1.6 -1.6Z" fill="#F2C94C"/>`;

// 相棒の絵.stage は育ち具合(0〜3),mood は normal / happy / sleepy,wear は { head, neck, face }
function petSVG(pet, { stage = 2, mood = "normal", wear = {}, cls = "" } = {}) {
  const a = PET_ART[String(pet).replace(/^pet:/, "")];
  if (!a) return "";
  const sc = PET_SCALE[stage] || 1;
  const on = ["neck", "face", "head"].map(s => (WEAR_BY.get(wear[s]) || {}).art || "").join("");
  return `<svg class="pet ${cls}" viewBox="0 0 100 100" aria-hidden="true"><g transform="translate(50 97) scale(${sc}) translate(-50 -97)">${a.body}${a.face(mood)}${on}</g>${stage >= 3 ? SPARKLE(12, 30) + SPARKLE(88, 22, 0.8) + SPARKLE(90, 66, 0.6) : ""}${mood === "sleepy" ? `<text x="78" y="${stage ? 30 : 44}" font-size="11" fill="#8A93A6" font-weight="700">z</text><text x="86" y="${stage ? 22 : 36}" font-size="8" fill="#8A93A6" font-weight="700">z</text>` : ""}</svg>`;
}

/* ---------------- 今の相棒 ---------------- */
const petChosen = () => S.prefs.pet !== undefined;
const currentPet = () => (typeof currentItem === "function" ? currentItem("pet") : "pet:none");
const petOn = () => currentPet() !== "pet:none";
function currentWear() {
  const w = S.prefs.wear || {}, out = {};
  for (const s of Object.keys(WEAR_SLOTS)) if (w[s] && typeof ownsItem === "function" && ownsItem(w[s])) out[s] = w[s];
  return out;
}
function petStage(days = streaks().total) { let i = 0; PET_STAGES.forEach((s, k) => { if (days >= s.min) i = k; }); return i; }
function petMood(sk = streaks()) { return sk.today >= GOAL ? "happy" : sk.today > 0 ? "normal" : "sleepy"; }
function petLine(sk, mood) {
  const name = (ITEM_BY.get(currentPet()) || {}).name || "";
  if (mood === "happy") return sk.cur >= 3 ? `${sk.cur} 日連続で目標達成!すごい!` : `今日の目標 ${GOAL} 問を達成!えらい!`;
  if (mood === "normal") return `あと ${GOAL - sk.today} 問で今日の目標だよ.いっしょにがんばろう`;
  return sk.cur ? `zzz…(${name}は ${sk.cur} 日連続を守ってほしいみたい)` : "zzz…1問解いて起こしてね";
}
// ホームのマスコットのカード.まだ選んでいなければ,迎える案内を出す
function petCardHTML() {
  if (!petChosen()) return `<button class="petinv" data-go="shop" data-stab="pet">${petSVG("pet:cat", { stage: 0, mood: "happy" })}<span><b>マスコットを迎えよう(無料)</b><span class="small muted">学習した日数で育ち,コインで着せ替えられます →</span></span></button>`;
  if (!petOn()) return "";
  const sk = streaks(), st = petStage(sk.total), mood = petMood(sk), next = PET_STAGES[st + 1];
  const x = ITEM_BY.get(currentPet());
  return `<div class="petcard">
    <button class="petbox" data-go="shop" data-stab="wear" aria-label="着せ替え">${petSVG(currentPet(), { stage: st, mood, wear: currentWear() })}</button>
    <div class="petinfo"><span class="bubble">${esc(petLine(sk, mood))}</span>
      <span class="small muted"><b>${esc(x.name)}</b> · ${PET_STAGES[st].name} · 学習 ${sk.total} 日${next ? `(${next.name}まであと ${next.min - sk.total} 日)` : ""}</span>
      <button class="linkbtn small" data-go="shop" data-stab="wear">着せ替え →</button></div>
  </div>`;
}
// 練習で AC したとき,相棒が画面の隅から顔を出す
function petPop() {
  if (!petOn() || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  document.querySelectorAll(".petpop").forEach(e => e.remove());
  const el = document.createElement("div");
  el.className = "petpop"; el.setAttribute("aria-hidden", "true");
  el.innerHTML = petSVG(currentPet(), { stage: petStage(), mood: "happy", wear: currentWear() }) + `<span class="note">♪</span>`;
  document.body.append(el);
  setTimeout(() => el.remove(), 1600);
}

/* ---------------- ステッカー帳 ----------------
 * 節目のステッカー(記録から数える.p(c, sk) は [今の数, 目標])と,ショップで買うステッカー. */
const STICKERS_EARN = [
  { id: "e_day1", e: "🌱", name: "はじめの一歩", desc: "学習1日", p: (c, sk) => [sk.total, 1] },
  { id: "e_day7", e: "🌿", name: "1週間", desc: "学習7日", p: (c, sk) => [sk.total, 7] },
  { id: "e_day30", e: "🌳", name: "1か月", desc: "学習30日", p: (c, sk) => [sk.total, 30] },
  { id: "e_day100", e: "🏔️", name: "100日", desc: "学習100日", p: (c, sk) => [sk.total, 100] },
  { id: "e_streak3", e: "🔥", name: "3日連続", desc: "3日続けて学習", p: (c, sk) => [sk.max, 3] },
  { id: "e_streak7", e: "⚡", name: "7日連続", desc: "7日続けて学習", p: (c, sk) => [sk.max, 7] },
  { id: "e_streak30", e: "🌟", name: "30日連続", desc: "30日続けて学習", p: (c, sk) => [sk.max, 30] },
  { id: "e_ac100", e: "🍀", name: "100問", desc: "100問を AC", p: c => [c.acTotal, 100] },
  { id: "e_ac500", e: "🌻", name: "500問", desc: "500問を AC", p: c => [c.acTotal, 500] },
  { id: "e_ac1000", e: "👑", name: "1000問", desc: "1000問を AC", p: c => [c.acTotal, 1000] },
  { id: "e_contest1", e: "🎯", name: "本番デビュー", desc: "本番を1回", p: () => [S.contests.length, 1] },
  { id: "e_contest10", e: "🏅", name: "本番10回", desc: "本番を10回", p: () => [S.contests.length, 10] },
  { id: "e_daily7", e: "📅", name: "今日の問題", desc: "今日の問題を7日", p: c => [c.dailyDays, 7] },
  { id: "e_badge10", e: "🎖️", name: "実績10個", desc: "実績を10個", p: () => [Object.keys(S.badges).length, 10] },
  { id: "e_speed", e: "💨", name: "早解き", desc: "早解きを1回", p: c => [c.speedRuns, 1] },
  { id: "e_spell", e: "✏️", name: "つづり名人", desc: "つづり入力で50語 AC", p: c => [c.spellAC, 50] }
];
const STICKERS = [
  { id: "stk:cake", e: "🍰", name: "ケーキ", desc: "がんばったごほうび", price: 30 },
  { id: "stk:cat", e: "🐱", name: "ねこ", desc: "にゃー", price: 30 },
  { id: "stk:dog", e: "🐶", name: "いぬ", desc: "わん", price: 30 },
  { id: "stk:bear", e: "🧸", name: "くま", desc: "ぬいぐるみ", price: 30 },
  { id: "stk:rainbow", e: "🌈", name: "にじ", desc: "雨のあとに", price: 40 },
  { id: "stk:rocket", e: "🚀", name: "ロケット", desc: "レートが急上昇", price: 40 },
  { id: "stk:unicorn", e: "🦄", name: "ユニコーン", desc: "めったに会えない", price: 60 },
  { id: "stk:gem", e: "💎", name: "宝石", desc: "きらきら", price: 80 },
  { id: "stk:kadomatsu", e: "🎍", name: "門松", desc: "お正月だけ", price: 40, season: "newyear" },
  { id: "stk:sakura", e: "🌸", name: "桜", desc: "春だけ", price: 40, season: "spring" },
  { id: "stk:suika", e: "🍉", name: "すいか", desc: "夏だけ", price: 40, season: "summer" },
  { id: "stk:pumpkin", e: "🎃", name: "かぼちゃ", desc: "ハロウィンだけ", price: 40, season: "halloween" },
  { id: "stk:snowman", e: "⛄", name: "雪だるま", desc: "冬だけ", price: 40, season: "winter" },
  { id: "stk:tree", e: "🎄", name: "ツリー", desc: "冬だけ", price: 40, season: "winter" }
];
function stickerBookHTML() {
  const c = badgeCtx(), sk = streaks();
  const earn = STICKERS_EARN.map(s => { const [x, n] = s.p(c, sk); return { s, got: x >= n, x: Math.min(x, n), n }; });
  // 買うステッカーは,持っているもの・いつでも買えるもの・今の季節のものを並べる(季節外で持っていないものは出さない)
  const shop = STICKERS.filter(s => ownsItem(s.id) || !s.season || inSeason(s.season)).map(s => ({ s, got: ownsItem(s.id) }));
  const all = earn.concat(shop), n = all.filter(x => x.got).length;
  const cell = ({ s, got, x, n }) => `<div class="stk${got ? " got" : ""}" title="${esc(s.name)}:${esc(s.desc)}">
    <span class="se" aria-hidden="true">${got ? s.e : "?"}</span><span class="sn">${esc(s.name)}</span>
    ${got ? "" : n ? `<span class="sp">${x}/${n}</span>` : `<span class="sp">ショップ</span>`}</div>`;
  return `<section class="rsec"><h2>ステッカー帳 <span class="small muted">${n}/${all.length}</span></h2>
    <p class="small muted rnote">学習の節目でもらえるステッカーと,ショップで買えるステッカーを貼っておく台紙です.</p>
    <div class="stkbook">${all.map(cell).join("")}</div>
    <div class="row" style="margin-top:10px"><button class="btn ghost sm" data-go="shop" data-stab="sticker">ショップでステッカーを見る</button></div></section>`;
}
