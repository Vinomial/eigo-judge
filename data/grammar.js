// 文法データ
// THM: 文法の「定理」.s: 定理の内容, def: 前提になる定義
// GRAM: 問題.q の ____ が空所, c: 選択肢, a: 正解の添字, t: 使う定理, d: 難易度
window.THM = {
  T1: { name: "名詞の前の空所", s: "「冠詞・所有格 + ___ + 名詞」の空所には形容詞が入る.", def: "形容詞:名詞を修飾する語." },
  T2: { name: "動詞を修飾する位置", s: "動詞・過去分詞を修飾する位置(be + ___ + 過去分詞,動詞 + ___ など)には副詞が入る.", def: "副詞:動詞・形容詞・文など,名詞以外を修飾する語." },
  T3: { name: "名詞が入る位置", s: "冠詞・所有格・前置詞の直後で,後ろに名詞が続かない空所には名詞が入る.", def: "名詞:主語・目的語になる語." },
  T4: { name: "現在完了の目印", s: "「since + 過去の時点」「for / over the past + 期間」があれば,動詞は現在完了形(have + 過去分詞).", def: "現在完了:過去から現在までつながる継続・経験・完了." },
  T5: { name: "時・条件の副詞節", s: "when, if, before, as soon as などの時・条件を表す副詞節の中では,未来のことも現在形で表す.", def: "副詞節:文全体に時・条件などの情報を足す節." },
  T6: { name: "受動態", s: "主語が動作を受ける側なら受動態(be + 過去分詞).完了形と組むと have been + 過去分詞.", def: "受動態:「〜される」を表す形." },
  T7: { name: "前置詞 to の後ろ", s: "look forward to の to は前置詞.前置詞の後ろは名詞か動名詞(-ing)が入る.", def: "動名詞:動詞に -ing を付けて名詞として使う形." },
  T8: { name: "関係代名詞の選択", s: "先行詞が人なら who,物なら which.カンマの後(非制限用法)では that は使えない.", def: "関係代名詞:前の名詞(先行詞)を後ろから説明する節をつくる語." },
  T9: { name: "前置詞と接続詞", s: "前置詞の後ろは名詞句,接続詞の後ろは節(主語 + 動詞).despite, during, because of は前置詞,although, while, because は接続詞.", def: "節:主語と動詞を含むまとまり." },
  T10: { name: "主語と動詞の一致", s: "動詞の数は主語の中心の名詞で決める.of 以下や前置詞句の名詞につられない.each of + 複数名詞 は単数扱い.", def: "一致:主語の数(単数・複数)に動詞の形を合わせること." },
  T11: { name: "比較の形", s: "than があれば比較級(-er / more).as ___ as の間は原級.the + 最上級(-est / most)は「〜の中でいちばん」.", def: "原級:比べない元の形.比較級:2つを比べる形.最上級:3つ以上の中で一番を表す形." },
  T12: { name: "分詞の形容詞用法", s: "修飾される名詞(または主語)が「〜させる・〜する」側なら現在分詞(-ing),「〜させられる・〜される」側なら過去分詞(-ed).", def: "分詞:動詞を形容詞のように使う形.現在分詞(-ing)は能動,過去分詞(-ed)は受け身の意味をもつ." },
  T13: { name: "代名詞の格", s: "名詞の前は所有格(his, their),動詞・前置詞の目的語は目的格(him, them).主語と同じ人を指す目的語や by ___(自分で)は再帰代名詞(himself, themselves).", def: "格:文の中での役割(主語・所有・目的語)に応じた代名詞の形." },
  T14: { name: "ペアで使う接続詞", s: "both A and B / either A or B / neither A nor B / not only A but (also) B は組み合わせが決まっている.後ろの語から前の語を決める.", def: "相関接続詞:2語1組で A と B をつなぐ接続詞." },
  T15: { name: "to do をとる動詞・-ing をとる動詞", s: "decide, plan, hope, agree, expect, want は目的語に to do をとる.avoid, consider, finish, enjoy, suggest は -ing をとる.", def: "不定詞:to + 動詞の原形.これからのことを表しやすい." },
  T16: { name: "要求・提案の that 節", s: "request, recommend, suggest, require, insist などに続く that 節(It is recommended that ... も同じ)では,主語に関係なく動詞は原形.", def: "原形:-s や -ed の付かない,動詞の元の形." },
  T17: { name: "数量を表す語", s: "many / few + 数えられる名詞の複数形,much / little + 数えられない名詞.every + 単数形(単数扱い).a number of + 複数名詞 は複数扱い,the number of + 複数名詞 は単数扱い.", def: "可算名詞:1つ,2つと数えられる名詞.不可算名詞:time, information など数えられない名詞." },
  T18: { name: "by と until", s: "by は期限(その時までに1回済ませる),until は継続(その時までずっと続く).", def: "期限:それまでに終える時点.継続:ある状態が続くこと." },
  T19: { name: "whose と what", s: "空所の後ろが「冠詞のない名詞 + 動詞」で,先行詞の持ち物・属性を表すなら whose.先行詞がなく「〜すること・もの」を表すなら what.", def: "先行詞:関係詞の節が説明する,前にある名詞." },
  T20: { name: "補語になる形容詞", s: "be, become, remain, seem, stay などの後ろ(補語の位置)には形容詞が入る.副詞は補語になれない.", def: "補語:主語の状態を説明する語." },
  T21: { name: "if を省いた倒置", s: "if を省くと主語と助動詞の順が入れ替わる.Should + 主語 + 原形(万一〜なら),Had + 主語 + 過去分詞(もし〜だったら),Were + 主語(もし〜なら).", def: "倒置:主語と(助)動詞の順番が入れ替わること." },
  T22: { name: "仮定法", s: "今の事実と違う仮定は「If + 過去形, would + 原形」.過去の事実と違う仮定は「If + had + 過去分詞, would have + 過去分詞」.", def: "仮定法:事実と違うことを仮定する形.時制を1つ過去にずらす." },
  T23: { name: "分詞構文", s: "カンマの前の分詞のまとまりは,主節の主語が意味上の主語.主語が「〜する」側なら -ing,「〜される」側なら過去分詞.", def: "分詞構文:分詞で始まるまとまりが「接続詞 + 主語 + 動詞」の代わりをする形." },
  T24: { name: "so と such", s: "「とても〜なので…」は so + 形容詞・副詞 + that,such + (a) + 形容詞 + 名詞 + that.名詞があれば such.", def: "結果の that:前の程度の結果を表す節." },
  T25: { name: "接続副詞は節をつながない", s: "however, therefore, nevertheless, moreover は副詞.ピリオドやセミコロンの後に置き,カンマだけで2つの節をつなぐことはできない.カンマで節をつなぐのは but, so, and など.", def: "接続副詞:意味の上で前の文とつなぐが,文法上は副詞の語." },
  T26: { name: "条件の接続詞", s: "unless は「〜しない限り(= if not)」.as long as / provided (that) は「〜という条件で」.in case は「〜する場合に備えて」.", def: "接続詞:節と節をつなぐ語." },
  T27: { name: "決まった前置詞", s: "組み合わせで覚える.be responsible for, be eligible for, comply with, be aware of, in charge of, depend on, be committed to(-ing).", def: "前置詞:名詞の前に置いて関係を示す語." },
  T28: { name: "未来完了と過去完了", s: "「by + 未来の時点」までに完了することは未来完了(will have + 過去分詞).過去のある時点より前に済んだことは過去完了(had + 過去分詞).", def: "完了形:ある時点までに完了・継続していることを表す形." },
  T29: { name: "使役動詞", s: "have / make / let + 人 + 動詞の原形.have + 物 + 過去分詞 は「(物を)〜してもらう」.", def: "使役動詞:人や物に何かをさせることを表す動詞." },
  T30: { name: "関係副詞 where と which", s: "空所の後ろが完全な文(主語も目的語もそろっている)なら関係副詞 where.主語や目的語が欠けていれば関係代名詞 which.", def: "関係副詞:先行詞(場所・時など)を説明し,節の中で副詞の働きをする語." }
};

window.GRAM = [
  { id: "g1", q: "The company offers a ____ training program for new employees.", c: ["comprehensive", "comprehend", "comprehensively", "comprehension"], a: 0, t: "T1", d: 300, why: "空所は冠詞 a と名詞 training program の間.名詞を修飾できるのは形容詞なので comprehensive.", ja: "その会社は新入社員向けに包括的な研修プログラムを提供している." },
  { id: "g2", q: "The report was ____ reviewed by the manager.", c: ["careful", "caring", "care", "carefully"], a: 3, t: "T2", d: 400, why: "was reviewed(受動態)の間にあり,過去分詞 reviewed を修飾するので副詞 carefully.", ja: "報告書は部長によって注意深く確認された." },
  { id: "g3", q: "We need your ____ before we place the order.", c: ["approval", "approve", "approved", "approving"], a: 0, t: "T3", d: 500, why: "所有格 your の後ろで,さらに後ろに名詞がない.名詞 approval が入る.", ja: "発注する前にあなたの承認が必要だ." },
  { id: "g4", q: "Ms. Kato ____ at the firm since 2019.", c: ["works", "worked", "has worked", "will work"], a: 2, t: "T4", d: 500, why: "since 2019 は「2019年から今まで」.継続を表す現在完了 has worked.", ja: "加藤さんは2019年からその会社で働いている." },
  { id: "g5", q: "Please call me when the package ____.", c: ["arrives", "will arrive", "arrived", "arriving"], a: 0, t: "T5", d: 600, why: "when 〜 は時を表す副詞節.未来のことでも現在形 arrives を使う.", ja: "荷物が届いたら電話してください." },
  { id: "g6", q: "The meeting ____ until next Monday.", c: ["postponed", "has postponed", "has been postponed", "is postponing"], a: 2, t: "T6", d: 600, why: "会議は「延期される」側なので受動態.完了形と組んで has been postponed.", ja: "会議は来週月曜日まで延期された." },
  { id: "g7", q: "We look forward to ____ you at the conference.", c: ["see", "be seen", "seen", "seeing"], a: 3, t: "T7", d: 700, why: "look forward to の to は前置詞.後ろは動名詞 seeing.", ja: "会議でお会いできるのを楽しみにしています." },
  { id: "g8", q: "The employee ____ won the sales award will give a speech.", c: ["who", "which", "whose", "whom"], a: 0, t: "T8", d: 600, why: "先行詞 employee は人で,空所の後ろに動詞 won があるので主格.who.", ja: "営業賞を受賞した社員がスピーチをする." },
  { id: "g9", q: "____ the heavy rain, the outdoor event was held as planned.", c: ["Although", "Despite", "Because", "Even"], a: 1, t: "T9", d: 700, why: "後ろは the heavy rain という名詞句で,動詞がない.前置詞 Despite.", ja: "大雨にもかかわらず,屋外イベントは予定通り開催された." },
  { id: "g10", q: "Each of the applicants ____ required to submit a résumé.", c: ["are", "were", "have", "is"], a: 3, t: "T10", d: 800, why: "主語は Each(単数扱い).applicants につられず is.", ja: "応募者はそれぞれ履歴書を提出する必要がある." },
  { id: "g11", q: "If the shipment ____ late, we will contact you.", c: ["is", "will be", "was", "being"], a: 0, t: "T5", d: 500, why: "if 〜 は条件の副詞節.未来のことでも現在形 is.", ja: "出荷が遅れる場合はご連絡します." },
  { id: "g12", q: "The new policy, ____ was announced last week, takes effect in April.", c: ["which", "who", "what", "that"], a: 0, t: "T8", d: 800, why: "先行詞 policy は物.カンマの後なので that は使えず which.", ja: "先週発表された新方針は4月に施行される." },
  { id: "g13", q: "All visitors must wear a badge ____ they are in the building.", c: ["during", "despite", "since", "while"], a: 3, t: "T9", d: 600, why: "後ろは they are という節(主語 + 動詞).接続詞 while が入る.during は前置詞なので節を取れない.", ja: "来訪者は建物内にいる間,バッジを着用しなければならない." },
  { id: "g14", q: "The ____ of the new software took longer than expected.", c: ["install", "installation", "installed", "installs"], a: 1, t: "T3", d: 400, why: "冠詞 The の後ろで,直後は前置詞 of.名詞 installation が入る.", ja: "新しいソフトウェアの導入は予想より時間がかかった." },

  // 比較
  { id: "g15", q: "The new laptop is much ____ than the previous model.", c: ["light", "lighter", "lightest", "lightly"], a: 1, t: "T11", d: 400, why: "後ろに than があるので比較級 lighter.much は比較級を強める語.", ja: "新しいノートパソコンは前のモデルよりずっと軽い." },
  { id: "g16", q: "This year's profits were not as ____ as we had hoped.", c: ["higher", "highest", "high", "highly"], a: 2, t: "T11", d: 600, why: "as ___ as の間は原級.さらに were の補語なので副詞 highly ではなく形容詞 high.", ja: "今年の利益は期待したほど高くなかった." },
  { id: "g17", q: "Ms. Lopez is the ____ experienced designer on our team.", c: ["more", "much", "very", "most"], a: 3, t: "T11", d: 700, why: "the があり,on our team(チームの中で)という範囲もある.最上級 the most experienced.", ja: "ロペスさんは私たちのチームで最も経験豊富なデザイナーだ." },

  // 分詞
  { id: "g18", q: "The results of the customer survey were ____.", c: ["disappointing", "disappointed", "disappoint", "disappointment"], a: 0, t: "T12", d: 700, why: "主語 results は人を「がっかりさせる」側.現在分詞 disappointing.人が主語なら disappointed になる.", ja: "顧客調査の結果は残念なものだった." },
  { id: "g19", q: "Please review the ____ document before the meeting.", c: ["attach", "attached", "attaching", "attachment"], a: 1, t: "T12", d: 600, why: "document は「添付される」側なので過去分詞 attached.「冠詞 + ___ + 名詞」なので形容詞の働きをする語が入る(T1).", ja: "会議の前に添付の資料を確認してください." },
  { id: "g20", q: "The client was very ____ with the quality of our work.", c: ["satisfying", "satisfied", "satisfaction", "satisfy"], a: 1, t: "T12", d: 600, why: "client(人)は「満足させられる」側なので過去分詞 satisfied.be satisfied with 〜 で「〜に満足している」.", ja: "顧客は私たちの仕事の質にとても満足していた." },

  // 代名詞
  { id: "g21", q: "Mr. Park sent the revised contract to ____ client yesterday.", c: ["he", "his", "him", "himself"], a: 1, t: "T13", d: 400, why: "後ろに名詞 client があるので所有格 his.", ja: "パークさんは昨日,修正した契約書を自分の顧客に送った." },
  { id: "g22", q: "The volunteers prepared all the food for the festival by ____.", c: ["they", "their", "them", "themselves"], a: 3, t: "T13", d: 700, why: "by ___ で「自分たちだけで」.主語 volunteers と同じ人を指すので再帰代名詞 themselves.", ja: "ボランティアたちは祭りの料理をすべて自分たちで用意した." },
  { id: "g23", q: "If you have any questions about the schedule, please contact ____ directly.", c: ["I", "my", "me", "mine"], a: 2, t: "T13", d: 400, why: "動詞 contact の目的語なので目的格 me.", ja: "日程について質問があれば,直接私に連絡してください." },

  // 相関接続詞
  { id: "g24", q: "Applicants must have ____ a degree in marketing and three years of experience.", c: ["either", "not only", "neither", "both"], a: 3, t: "T14", d: 600, why: "後ろの and と組むのは both.both A and B で「A と B の両方」.", ja: "応募者はマーケティングの学位と3年の経験の両方が必要だ." },
  { id: "g25", q: "You can pay ____ by credit card or by bank transfer.", c: ["both", "neither", "either", "whether"], a: 2, t: "T14", d: 600, why: "後ろの or と組むのは either.either A or B で「A か B のどちらか」.", ja: "クレジットカードか銀行振込のどちらかで支払える." },
  { id: "g26", q: "The workshop was ____ informative but also enjoyable.", c: ["not only", "both", "either", "as well"], a: 0, t: "T14", d: 800, why: "後ろの but also と組むのは not only.not only A but also B で「A だけでなく B も」.", ja: "その研修会はためになるだけでなく楽しくもあった." },

  // to do / -ing
  { id: "g27", q: "The company has decided ____ a new branch in Osaka.", c: ["open", "to open", "opening", "opened"], a: 1, t: "T15", d: 500, why: "decide は目的語に to do をとる.decided to open.", ja: "その会社は大阪に新しい支店を開くことに決めた." },
  { id: "g28", q: "Please avoid ____ personal calls during working hours.", c: ["make", "to make", "made", "making"], a: 3, t: "T15", d: 700, why: "avoid は目的語に -ing をとる.avoid making.", ja: "勤務時間中は私用の電話を避けてください." },
  { id: "g29", q: "We are considering ____ our office to a larger building.", c: ["moving", "to move", "move", "moved"], a: 0, t: "T15", d: 800, why: "consider は目的語に -ing をとる.considering moving.", ja: "私たちは事務所をもっと大きな建物に移すことを検討している." },

  // 要求・提案の that 節
  { id: "g30", q: "The manager requested that every employee ____ the safety training.", c: ["attend", "attends", "attended", "attending"], a: 0, t: "T16", d: 1000, why: "request に続く that 節なので,主語 every employee が単数でも動詞は原形 attend.", ja: "部長は全社員が安全研修に出席するよう求めた." },
  { id: "g31", q: "It is recommended that guests ____ their tickets in advance.", c: ["purchased", "purchasing", "purchases", "purchase"], a: 3, t: "T16", d: 1100, why: "It is recommended that ... も提案の that 節.動詞は原形 purchase.", ja: "お客様は前もってチケットを購入することをおすすめします." },

  // 数量
  { id: "g32", q: "There is not ____ time left before the deadline.", c: ["many", "much", "few", "a number of"], a: 1, t: "T17", d: 500, why: "time は数えられない名詞なので much.many / few / a number of は数えられる名詞の複数形と使う.", ja: "締め切りまであまり時間が残っていない." },
  { id: "g33", q: "Every ____ on the site must wear a safety helmet.", c: ["workers", "worked", "working", "worker"], a: 3, t: "T17", d: 500, why: "every の後ろは単数形.Every worker.", ja: "現場の作業員は全員安全ヘルメットを着用しなければならない." },
  { id: "g34", q: "A number of customers ____ complained about the late delivery.", c: ["has", "is", "have", "was"], a: 2, t: "T17", d: 900, why: "a number of 〜 は「多くの〜」で複数扱い.have complained.the number of なら単数扱いになる.", ja: "多くの客が配達の遅れについて苦情を言っている." },

  // by / until
  { id: "g35", q: "Please submit your expense report ____ Friday.", c: ["until", "by", "since", "during"], a: 1, t: "T18", d: 600, why: "提出は1回済ませる行為で,金曜日が期限.by Friday.until は「ずっと続く」ことに使う.", ja: "金曜日までに経費報告書を提出してください." },
  { id: "g36", q: "The store will be closed for renovations ____ the end of the month.", c: ["by", "until", "within", "since"], a: 1, t: "T18", d: 700, why: "閉店している状態が月末までずっと続く.継続なので until.", ja: "その店は改装のため月末まで休業する." },

  // whose / what
  { id: "g37", q: "We hired a designer ____ work has won several international awards.", c: ["who", "whose", "which", "what"], a: 1, t: "T19", d: 800, why: "後ろは冠詞のない名詞 work + 動詞 has won.「デザイナーの作品」と持ち物を表すので whose.", ja: "私たちは,作品が国際的な賞をいくつも受賞しているデザイナーを雇った." },
  { id: "g38", q: "____ our customers want most is faster delivery.", c: ["That", "Which", "It", "What"], a: 3, t: "T19", d: 900, why: "空所の前に先行詞がなく,「客が最も望んでいること」という名詞のまとまりをつくる.What.", ja: "顧客が最も望んでいるのは,より速い配送だ." },

  // 補語
  { id: "g39", q: "The current prices will remain ____ until the end of June.", c: ["effect", "effectively", "effective", "effectiveness"], a: 2, t: "T20", d: 800, why: "remain の後ろは補語の位置なので形容詞 effective(有効な).", ja: "現在の価格は6月末まで有効だ." },
  { id: "g40", q: "Customer feedback on the new menu has been very ____.", c: ["positively", "positive", "positivity", "positiveness"], a: 1, t: "T20", d: 600, why: "has been の後ろは補語の位置.very に修飾されて補語になるのは形容詞 positive.", ja: "新しいメニューへの客の反応はとても好意的だ." },

  // 既存の定理の追加問題
  { id: "g41", q: "Sales have increased ____ since the advertising campaign started.", c: ["significant", "significance", "significantly", "signify"], a: 2, t: "T2", d: 500, why: "have increased という動詞を修飾する位置なので副詞 significantly.", ja: "広告キャンペーンが始まってから,売上は大幅に増えた." },
  { id: "g42", q: "Mr. Ito gave a ____ presentation on the new strategy.", c: ["persuade", "persuasion", "persuasively", "persuasive"], a: 3, t: "T1", d: 500, why: "冠詞 a と名詞 presentation の間なので形容詞 persuasive.", ja: "伊藤さんは新戦略について説得力のあるプレゼンをした." },
  { id: "g43", q: "Prices of raw materials ____ steadily over the past three years.", c: ["rose", "have risen", "rise", "will rise"], a: 1, t: "T4", d: 700, why: "over the past three years(この3年間)は過去から今までの期間.現在完了 have risen.主語の中心は Prices で複数.", ja: "原材料の価格はこの3年間着実に上がってきた." },
  { id: "g44", q: "We will begin the meeting as soon as Mr. Lee ____.", c: ["arrives", "will arrive", "arrived", "arrive"], a: 0, t: "T5", d: 600, why: "as soon as 〜 は時を表す副詞節.未来のことでも現在形.主語 Mr. Lee は単数なので arrives.", ja: "リーさんが着いたらすぐに会議を始めます." },
  { id: "g45", q: "The list of new participants ____ been sent to all department heads.", c: ["have", "are", "has", "were"], a: 2, t: "T10", d: 900, why: "主語の中心は The list(単数).of new participants につられず has.", ja: "新しい参加者の名簿は全部門長に送られた." },

  // 倒置・仮定法
  { id: "g46", q: "____ you have any questions, please do not hesitate to contact us.", c: ["Should", "Would", "Could", "Had"], a: 0, t: "T21", d: 1200, why: "If you should have ... の if を省いた倒置.Should + 主語 + 原形で「万一〜なら」.ビジネスメールの決まり文句.", ja: "ご質問がありましたら,お気軽にお問い合わせください." },
  { id: "g47", q: "____ we known about the traffic, we would have left earlier.", c: ["If", "Have", "Had", "Were"], a: 2, t: "T21", d: 1400, why: "後半が would have left なので過去の事実と違う仮定.If we had known の if を省いた倒置で Had we known.If なら If we had known となり known だけでは足りない.", ja: "渋滞のことを知っていたら,もっと早く出発していただろう." },
  { id: "g48", q: "If the store had opened on time, we ____ the sale.", c: ["will not miss", "have not missed", "did not miss", "would not have missed"], a: 3, t: "T22", d: 1200, why: "if 節が had opened(過去完了)なので,過去の事実と違う仮定.主節は would have + 過去分詞.", ja: "店が時間どおりに開いていたら,セールを逃さなかっただろう." },
  { id: "g49", q: "If I ____ more time, I would join the workshop.", c: ["have", "will have", "had", "having"], a: 2, t: "T22", d: 900, why: "主節が would join なので,今の事実と違う仮定.if 節は過去形 had.", ja: "もっと時間があれば,研修会に参加するのだが." },
  // 分詞構文
  { id: "g50", q: "____ in 1990, the company now has offices in ten countries.", c: ["Founding", "Founds", "To found", "Founded"], a: 3, t: "T23", d: 1100, why: "意味上の主語は the company.会社は「設立される」側なので過去分詞 Founded.", ja: "1990年に設立されたその会社は,今では10か国に事務所がある." },
  { id: "g51", q: "____ the report, Ms. Gomez found several errors.", c: ["Reviewed", "Reviews", "Review", "Reviewing"], a: 3, t: "T23", d: 1000, why: "意味上の主語は Ms. Gomez.ゴメスさんが報告書を「確認する」側なので -ing.後ろに目的語 the report があることも手がかり.", ja: "報告書を確認していて,ゴメスさんはいくつか誤りを見つけた." },
  { id: "g52", q: "____ carefully, the instructions are easy to follow.", c: ["Reading", "Read", "Reads", "To reading"], a: 1, t: "T23", d: 1200, why: "意味上の主語は the instructions.説明書は「読まれる」側なので過去分詞 Read.(If they are read carefully の短縮)", ja: "注意して読めば,その説明書は分かりやすい." },
  // so / such
  { id: "g53", q: "Demand was ____ high that the store ran out of stock.", c: ["such", "very", "too", "so"], a: 3, t: "T24", d: 700, why: "後ろが形容詞 high だけで名詞がない.so + 形容詞 + that.too や very は that と組まない.", ja: "需要がとても高かったので,店は在庫切れになった." },
  { id: "g54", q: "It was ____ a popular event that tickets sold out in an hour.", c: ["so", "too", "such", "very"], a: 2, t: "T24", d: 900, why: "後ろが a popular event(冠詞 + 形容詞 + 名詞).such + a + 形容詞 + 名詞 + that.", ja: "とても人気のある催しだったので,チケットは1時間で売り切れた." },
  // 接続副詞
  { id: "g55", q: "The product is expensive. ____, many customers buy it for its quality.", c: ["Although", "Because", "Despite", "However"], a: 3, t: "T25", d: 800, why: "ピリオドの後で,カンマが続く.前の文と逆の内容をつなぐ副詞 However.Although は節を2つ必要とし,Despite は名詞が必要.", ja: "その製品は高価だ.しかし,多くの客が品質を理由に買っている." },
  { id: "g56", q: "Sales fell last quarter; ____, the company plans to hire more staff.", c: ["nevertheless", "although", "despite", "even though"], a: 0, t: "T25", d: 1100, why: "セミコロンの後,カンマの前に置けるのは接続副詞.nevertheless(それにもかかわらず).although / even though は接続詞,despite は前置詞.", ja: "前四半期は売上が落ちた.それでも会社は人員を増やす予定だ." },
  { id: "g57", q: "The shipment was delayed, ____ we offered the customer a discount.", c: ["therefore", "so", "however", "consequently"], a: 1, t: "T25", d: 1000, why: "カンマだけで2つの節をつないでいる.節をつなげるのは接続詞 so.therefore と consequently は意味は合うが副詞なので,カンマだけではつなげない.", ja: "出荷が遅れたので,客に割引を提供した." },
  // 条件
  { id: "g58", q: "You will not receive a refund ____ you return the item within 30 days.", c: ["if", "because", "so that", "unless"], a: 3, t: "T26", d: 800, why: "「30日以内に返品しない限り返金されない」.unless = if not.if では「返品すると返金されない」と意味が逆になる.", ja: "30日以内に返品しない限り,返金は受けられません." },
  { id: "g59", q: "You may use the meeting room ____ you clean it afterward.", c: ["as long as", "as well as", "as soon as", "as far as"], a: 0, t: "T26", d: 900, why: "「後で掃除するという条件で使ってよい」.条件を表す as long as.as well as は「〜と同様に」で節をつながない.", ja: "後で掃除するなら,会議室を使ってかまいません." },
  { id: "g60", q: "Please bring an umbrella ____ it rains during the tour.", c: ["in case", "unless", "although", "so that"], a: 0, t: "T26", d: 900, why: "「雨が降る場合に備えて傘を持ってくる」.in case.", ja: "ツアー中に雨が降った場合に備えて,傘をお持ちください." },
  // 前置詞
  { id: "g61", q: "Mr. Kim is responsible ____ training new staff.", c: ["to", "with", "of", "for"], a: 3, t: "T27", d: 600, why: "be responsible for 〜 で「〜を担当している・〜に責任がある」.", ja: "キムさんは新人の研修を担当している." },
  { id: "g62", q: "All employees must comply ____ the new security policy.", c: ["to", "for", "with", "on"], a: 2, t: "T27", d: 800, why: "comply with 〜 で「〜に従う」.", ja: "全社員が新しいセキュリティ方針に従わなければならない." },
  { id: "g63", q: "Ms. Rossi is in charge ____ the marketing department.", c: ["for", "to", "of", "at"], a: 2, t: "T27", d: 700, why: "in charge of 〜 で「〜を担当・統括している」.", ja: "ロッシさんがマーケティング部を統括している." },
  { id: "g64", q: "Guests should be aware ____ the change in check-out time.", c: ["of", "for", "to", "with"], a: 0, t: "T27", d: 700, why: "be aware of 〜 で「〜に気づいている・〜を承知している」.", ja: "宿泊客はチェックアウト時刻の変更を承知しておく必要がある." },
  // 完了形
  { id: "g65", q: "By the end of next year, we ____ over 50 stores nationwide.", c: ["open", "opened", "will have opened", "have opened"], a: 2, t: "T28", d: 1100, why: "By the end of next year(未来の時点)までに完了していること.未来完了 will have opened.", ja: "来年末までに,全国で50店以上を開店しているだろう." },
  { id: "g66", q: "When I arrived at the station, the train ____ already left.", c: ["has", "was", "have", "had"], a: 3, t: "T28", d: 900, why: "駅に着いた(過去)時点より前に電車は出ていた.過去完了 had left.", ja: "駅に着いたとき,電車はもう出てしまっていた." },
  { id: "g67", q: "The client ____ the contract before the price was changed.", c: ["signs", "had signed", "has signed", "will sign"], a: 1, t: "T28", d: 1000, why: "価格が変わった(過去)より前に署名していた.過去完了 had signed.現在完了は過去の時点を表す語と一緒に使えない.", ja: "価格が変わる前に,顧客は契約に署名していた." },
  // 使役
  { id: "g68", q: "The manager had her assistant ____ the documents.", c: ["copy", "copied", "copying", "to copy"], a: 0, t: "T29", d: 1000, why: "have + 人 + 動詞の原形で「人に〜させる」.助手が「コピーする」側なので原形 copy.", ja: "部長は助手に書類をコピーさせた." },
  { id: "g69", q: "I need to have my car ____ before the trip.", c: ["repair", "repairing", "repaired", "to repair"], a: 2, t: "T29", d: 1000, why: "have + 物 + 過去分詞で「(物を)〜してもらう」.車は「修理される」側なので repaired.", ja: "旅行の前に車を修理してもらう必要がある." },
  { id: "g70", q: "Please let us ____ if you need any help.", c: ["know", "to know", "knowing", "known"], a: 0, t: "T29", d: 600, why: "let + 人 + 動詞の原形.let us know で「知らせてください」.", ja: "お手伝いが必要ならお知らせください." },
  // 関係副詞
  { id: "g71", q: "This is the hotel ____ the conference will be held.", c: ["which", "where", "what", "who"], a: 1, t: "T30", d: 900, why: "後ろの the conference will be held は欠けのない文.場所の先行詞 hotel を説明する関係副詞 where.which なら in which が必要.", ja: "ここが会議の開かれるホテルだ." },
  { id: "g72", q: "We visited the factory ____ produces our main components.", c: ["where", "what", "when", "which"], a: 3, t: "T30", d: 1000, why: "後ろの produces ... には主語がない(欠けがある).主語になれる関係代名詞 which.先行詞が場所でも where にはならない.", ja: "当社の主要部品を作っている工場を訪問した." },

  // 既存の定理の追加問題
  { id: "g73", q: "Please send me a ____ summary of the meeting.", c: ["brief", "briefly", "briefness", "briefed"], a: 0, t: "T1", d: 400, why: "冠詞 a と名詞 summary の間なので形容詞 brief(短い・簡潔な).", ja: "会議の簡単な要約を送ってください." },
  { id: "g74", q: "The store is ____ located near the station.", c: ["convenient", "conveniently", "convenience", "more convenient"], a: 1, t: "T2", d: 500, why: "is located(受動態)の間で過去分詞 located を修飾するので副詞 conveniently.", ja: "その店は駅の近くの便利な場所にある." },
  { id: "g75", q: "The company received many ____ for the position.", c: ["apply", "applied", "applications", "applicable"], a: 2, t: "T3", d: 400, why: "many の後ろで,後ろに名詞がない.名詞の複数形 applications(応募).", ja: "その会社はその職に多くの応募を受けた." },
  { id: "g76", q: "Thank you for your ____ to this matter.", c: ["attend", "attention", "attentive", "attentively"], a: 1, t: "T3", d: 500, why: "所有格 your の後ろで,後ろは前置詞 to.名詞 attention.", ja: "本件にご配慮いただきありがとうございます." },
  { id: "g77", q: "The new software ____ by most employees last month.", c: ["installed", "was installed", "has installed", "installing"], a: 1, t: "T6", d: 500, why: "ソフトは「インストールされる」側で,by 〜 もある.last month なので過去の受動態 was installed.", ja: "新しいソフトは先月ほとんどの社員がインストールした." },
  { id: "g78", q: "Your order ____ as soon as payment is confirmed.", c: ["will process", "will be processed", "processes", "processing"], a: 1, t: "T6", d: 700, why: "注文は「処理される」側なので受動態.主節は未来のことなので will be processed(as soon as 節の中だけ現在形).", ja: "お支払いが確認されしだい,ご注文を処理します." },
  { id: "g79", q: "Ms. Tanaka is committed to ____ the best service to customers.", c: ["provide", "provides", "provided", "providing"], a: 3, t: "T7", d: 900, why: "be committed to の to は前置詞.後ろは動名詞 providing.", ja: "田中さんは顧客に最高のサービスを提供することに力を尽くしている." },
  { id: "g80", q: "Applicants ____ have experience in sales are preferred.", c: ["who", "which", "whose", "whom"], a: 0, t: "T8", d: 600, why: "先行詞 Applicants は人で,後ろに動詞 have があるので主格 who.", ja: "営業経験のある応募者を優遇します." },
  { id: "g81", q: "The flight was canceled ____ the bad weather.", c: ["because", "although", "because of", "since"], a: 2, t: "T9", d: 500, why: "後ろは the bad weather(名詞句).前置詞 because of.because と although は接続詞,since は名詞の前では「〜以来」.", ja: "悪天候のため,その便は欠航になった." },
  { id: "g82", q: "____ she was new to the job, she handled the problem well.", c: ["Despite", "Although", "In spite of", "Due to"], a: 1, t: "T9", d: 700, why: "後ろは she was new という節.接続詞 Although.Despite / In spite of / Due to は前置詞.", ja: "仕事に就いたばかりだったが,彼女はその問題をうまく処理した." },
  { id: "g83", q: "The number of visitors to the museum ____ increased this year.", c: ["have", "has", "are", "were"], a: 1, t: "T17", d: 900, why: "the number of 〜(〜の数)は単数扱い.has increased.a number of(多くの)なら複数扱い.", ja: "今年,美術館の来館者数が増えた." },
  { id: "g84", q: "This is the ____ hotel in the city.", c: ["larger", "largest", "more large", "most large"], a: 1, t: "T11", d: 500, why: "the があり,in the city(市内で)という範囲がある.最上級 largest.large の最上級は most large ではなく largest.", ja: "ここは市内で最も大きなホテルだ." },
  { id: "g85", q: "There are several ____ positions in our sales department.", c: ["remain", "remaining", "remained", "remainder"], a: 1, t: "T12", d: 800, why: "positions は「残っている」側(自分で残る)なので現在分詞 remaining.remain は自動詞で「残される」という受け身にならない.", ja: "当社の営業部にはまだいくつか空きのある職がある." },
  { id: "g86", q: "Ms. Diaz and ____ will attend the meeting.", c: ["I", "me", "my", "mine"], a: 0, t: "T13", d: 600, why: "Ms. Diaz and ___ が主語なので主格 I.", ja: "ディアスさんと私が会議に出席します." },
  { id: "g87", q: "____ the manager nor her assistant was available.", c: ["Either", "Neither", "Both", "Not only"], a: 1, t: "T14", d: 700, why: "後ろの nor と組むのは neither.neither A nor B で「A も B も〜ない」.", ja: "部長も助手も手が空いていなかった." },
  { id: "g88", q: "The team finished ____ the report on time.", c: ["write", "to write", "writing", "wrote"], a: 2, t: "T15", d: 700, why: "finish は目的語に -ing をとる.finished writing.", ja: "チームは期限どおりに報告書を書き終えた." },
  { id: "g89", q: "The client insisted that the meeting ____ held in person.", c: ["is", "be", "was", "being"], a: 1, t: "T16", d: 1300, why: "insist に続く that 節(要求)では動詞は原形.受動態なので be held.", ja: "顧客は,会議を対面で開くよう強く求めた." },
  { id: "g90", q: "This special offer is valid ____ March 31.", c: ["by", "until", "within", "since"], a: 1, t: "T18", d: 800, why: "有効な状態が3月31日までずっと続く.継続なので until.", ja: "この特別価格は3月31日まで有効だ." }
];
