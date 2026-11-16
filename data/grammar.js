// 文法データ
// THM: 文法の「定理」.s: 定理の内容, def: 前提になる定義
// GRAM: 問題.q の ____ が空所, c: 選択肢, a: 正解の添字, t: 使う定理, d: 難易度
window.THM = {
  T1: { name: "名詞の前の空所", s: "「冠詞・所有格 + ___ + 名詞」の空所には形容詞が入る.", def: "形容詞:名詞を修飾する語." },
  T2: { name: "動詞を修飾する位置", s: "動詞・過去分詞を修飾する位置(be + ___ + 過去分詞,動詞 + ___ など)には副詞が入る.", def: "副詞:動詞・形容詞・文など,名詞以外を修飾する語." },
  T3: { name: "名詞が入る位置", s: "冠詞・所有格・前置詞の直後で,後ろに名詞が続かない空所には名詞が入る.他動詞の目的語の位置も名詞.名詞が2つ選べるときは,人か物かを意味で決める.", def: "名詞:主語・目的語になる語." },
  T4: { name: "現在完了の目印", s: "「since + 過去の時点」「for / over the past + 期間」「so far」があれば,動詞は現在完了形(have + 過去分詞).もう終わっていて今につながらない期間なら過去形.", def: "現在完了:過去から現在までつながる継続・経験・完了." },
  T5: { name: "時・条件の副詞節", s: "when, if, before, after, until, once, as soon as, by the time などの時・条件を表す副詞節の中では,未来のことも現在形(完了は現在完了形)で表す.", def: "副詞節:文全体に時・条件などの情報を足す節." },
  T6: { name: "受動態", s: "主語が動作を受ける側なら受動態(be + 過去分詞).完了形と組むと have been + 過去分詞,進行形と組むと be being + 過去分詞.occur, happen, arrive など目的語をとらない自動詞は受動態にしない.", def: "受動態:「〜される」を表す形." },
  T7: { name: "前置詞 to の後ろ", s: "look forward to, be used to, be committed / dedicated to, in addition to, prior to, object to, contribute to の to は前置詞.前置詞の後ろは名詞か動名詞(-ing)が入る.be のない used to + 原形(以前は〜した)は別の表現.", def: "動名詞:動詞に -ing を付けて名詞として使う形." },
  T8: { name: "関係代名詞の選択", s: "先行詞が人なら who(節の中で目的語なら whom),物なら which.カンマの後(非制限用法)では that は使えない.先行詞があるときに what は使えない.", def: "関係代名詞:前の名詞(先行詞)を後ろから説明する節をつくる語." },
  T9: { name: "前置詞と接続詞", s: "前置詞の後ろは名詞句,接続詞の後ろは節(主語 + 動詞).despite, during, because of, due to は前置詞,although, while, because は接続詞.while / when + -ing は主語と be 動詞を省いた形で,接続詞のまま使える.", def: "節:主語と動詞を含むまとまり." },
  T10: { name: "主語と動詞の一致", s: "動詞の数は主語の中心の名詞で決める.of 以下や前置詞句,関係詞節の中の名詞につられない.each of + 複数名詞,everyone,数えられない名詞は単数扱い.along with, as well as が付いても主語は増えない.There is / are は後ろの名詞に合わせる.", def: "一致:主語の数(単数・複数)に動詞の形を合わせること." },
  T11: { name: "比較の形", s: "than があれば比較級(-er / more).as ___ as の間は原級.the + 最上級(-est / most)は「〜の中でいちばん」.比較級を強めるのは much / far(very は不可).the + 比較級, the + 比較級 は「〜すればするほど…」.", def: "原級:比べない元の形.比較級:2つを比べる形.最上級:3つ以上の中で一番を表す形." },
  T12: { name: "分詞の形容詞用法", s: "修飾される名詞(または主語)が「〜させる・〜する」側なら現在分詞(-ing),「〜させられる・〜される」側なら過去分詞(-ed).", def: "分詞:動詞を形容詞のように使う形.現在分詞(-ing)は能動,過去分詞(-ed)は受け身の意味をもつ." },
  T13: { name: "代名詞の格", s: "名詞の前は所有格(his, their),動詞・前置詞の目的語は目的格(him, them).主語と同じ人を指す目的語や by ___(自分で)は再帰代名詞(himself, themselves).「〜のもの」は所有代名詞(mine, ours, theirs)で,後ろに名詞を置かない.", def: "格:文の中での役割(主語・所有・目的語)に応じた代名詞の形." },
  T14: { name: "ペアで使う接続詞", s: "both A and B / either A or B / neither A nor B / not only A but (also) B は組み合わせが決まっている.後ろの語から前の語を決める.either A or B / neither A nor B が主語のとき,動詞は B に合わせる.", def: "相関接続詞:2語1組で A と B をつなぐ接続詞." },
  T15: { name: "to do をとる動詞・-ing をとる動詞", s: "decide, plan, hope, agree, expect, want, afford は目的語に to do をとる.avoid, consider, finish, enjoy, suggest, mind は -ing をとる.remember は to do(これから忘れずにする)と -ing(したことを覚えている)で意味が変わる.", def: "不定詞:to + 動詞の原形.これからのことを表しやすい." },
  T16: { name: "要求・提案の that 節", s: "request, recommend, suggest, propose, require, demand, insist, advise などに続く that 節(It is recommended / essential / important that ... も同じ)では,主語に関係なく動詞は原形.否定は not + 原形.", def: "原形:-s や -ed の付かない,動詞の元の形." },
  T17: { name: "数量を表す語", s: "many / few + 数えられる名詞の複数形,much / little + 数えられない名詞(information, equipment, advice など).every / each + 単数形(単数扱い).all the + 複数名詞.a number of + 複数名詞 は複数扱い,the number of + 複数名詞 は単数扱い.", def: "可算名詞:1つ,2つと数えられる名詞.不可算名詞:time, information など数えられない名詞." },
  T18: { name: "by と until", s: "by は期限(その時までに1回済ませる),until は継続(その時までずっと続く).by the time + 節 は「〜するときまでには」.", def: "期限:それまでに終える時点.継続:ある状態が続くこと." },
  T19: { name: "whose と what", s: "空所の後ろが「冠詞のない名詞 + 動詞」で,先行詞の持ち物・属性を表すなら whose.先行詞がなく「〜すること・もの」を表すなら what.", def: "先行詞:関係詞の節が説明する,前にある名詞." },
  T20: { name: "補語になる形容詞", s: "be, become, remain, seem, stay, look, sound などの後ろ(補語の位置)には形容詞が入る.副詞は補語になれない.keep / make / find + 目的語 + 形容詞 の形でも,目的語の状態を説明するのは形容詞.", def: "補語:主語の状態を説明する語." },
  T21: { name: "if を省いた倒置", s: "if を省くと主語と助動詞の順が入れ替わる.Should + 主語 + 原形(万一〜なら),Had + 主語 + 過去分詞(もし〜だったら),Were + 主語(もし〜なら),Were + 主語 + to do(仮に〜するとしたら).", def: "倒置:主語と(助)動詞の順番が入れ替わること." },
  T22: { name: "仮定法", s: "今の事実と違う仮定は「If + 過去形, would + 原形」.過去の事実と違う仮定は「If + had + 過去分詞, would have + 過去分詞」.I wish + 過去形 は「〜ならいいのに」.主節が will なら仮定法ではなく,ふつうの条件(現在形).", def: "仮定法:事実と違うことを仮定する形.時制を1つ過去にずらす." },
  T23: { name: "分詞構文", s: "カンマの前の分詞のまとまりは,主節の主語が意味上の主語.主語が「〜する」側なら -ing,「〜される」側なら過去分詞.Having + 過去分詞 は主節より前に済んだこと.文の後ろや接続詞(when, while)の後ろにも置ける.", def: "分詞構文:分詞で始まるまとまりが「接続詞 + 主語 + 動詞」の代わりをする形." },
  T24: { name: "so と such", s: "「とても〜なので…」は so + 形容詞・副詞 + that,such + (a) + 形容詞 + 名詞 + that.名詞があれば such.ただし many / much / few / little が付く名詞は so(so many orders).such that は「それほどのものなので」.", def: "結果の that:前の程度の結果を表す節." },
  T25: { name: "接続副詞は節をつながない", s: "however, therefore, nevertheless, moreover, otherwise は副詞.ピリオドやセミコロンの後に置き,カンマだけで2つの節をつなぐことはできない.カンマで節をつなぐのは but, so, and や although などの接続詞.", def: "接続副詞:意味の上で前の文とつなぐが,文法上は副詞の語." },
  T26: { name: "条件の接続詞", s: "unless は「〜しない限り(= if not)」.as long as / provided (that) は「〜という条件で」.in case は「〜する場合に備えて」.", def: "接続詞:節と節をつなぐ語." },
  T27: { name: "決まった前置詞", s: "組み合わせで覚える.be responsible for, be eligible for, comply with, be aware of, in charge of, depend on, be committed to(-ing), be subject to, specialize in, refrain from, be equipped with.", def: "前置詞:名詞の前に置いて関係を示す語." },
  T28: { name: "未来完了と過去完了", s: "「by + 未来の時点」までに完了することは未来完了(will have + 過去分詞).過去のある時点より前に済んだことは過去完了(had + 過去分詞).", def: "完了形:ある時点までに完了・継続していることを表す形." },
  T29: { name: "使役動詞", s: "have / make / let + 人 + 動詞の原形.have + 物 + 過去分詞 は「(物を)〜してもらう」.get + 人 + to do(to が必要),help + 人 + (to) 原形.", def: "使役動詞:人や物に何かをさせることを表す動詞." },
  T30: { name: "関係副詞 where と which", s: "空所の後ろが完全な文(主語も目的語もそろっている)なら関係副詞 where(先行詞が時なら when).主語や目的語が欠けていれば関係代名詞 which.前置詞 + which = where(in which).", def: "関係副詞:先行詞(場所・時など)を説明し,節の中で副詞の働きをする語." }
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
  { id: "g90", q: "This special offer is valid ____ March 31.", c: ["by", "until", "within", "since"], a: 1, t: "T18", d: 800, why: "有効な状態が3月31日までずっと続く.継続なので until.", ja: "この特別価格は3月31日まで有効だ." },

  // ---- 各定理が10問になるように追加した問題(g91〜) ----
  // T1
  { id: "g91", q: "The hotel is known for its ____ service.", c: ["exceptional", "exception", "exceptionally", "except"], a: 0, t: "T1", d: 500, why: "所有格 its と名詞 service の間なので形容詞 exceptional(並外れた).", ja: "そのホテルは並外れたサービスで知られている." },
  { id: "g92", q: "We are looking for a ____ candidate to fill the position.", c: ["qualify", "qualification", "qualified", "qualifies"], a: 2, t: "T1", d: 600, why: "冠詞 a と名詞 candidate の間なので形容詞.qualified は「資格のある」という形容詞として使う.", ja: "その職を埋める,資格のある候補者を探している." },
  { id: "g93", q: "The new manager made several ____ changes to the schedule.", c: ["signify", "significantly", "significance", "significant"], a: 3, t: "T1", d: 600, why: "several と名詞 changes の間で,名詞を修飾する形容詞 significant(大きな・重要な).", ja: "新しい部長は予定にいくつか大きな変更を加えた." },
  { id: "g94", q: "Customers appreciate our ____ prices.", c: ["affordable", "afford", "affordably", "affordability"], a: 0, t: "T1", d: 500, why: "所有格 our と名詞 prices の間なので形容詞.-able で終わる語は形容詞.", ja: "客は当店の手ごろな価格を評価している." },
  { id: "g95", q: "The report contains ____ information about our competitors.", c: ["value", "valuably", "valuing", "valuable"], a: 3, t: "T1", d: 400, why: "名詞 information を修飾する形容詞 valuable(価値のある).冠詞がなくても,名詞の直前は形容詞の位置.", ja: "その報告書には競合他社についての貴重な情報が含まれている." },
  { id: "g96", q: "Ms. Hall is a highly ____ lawyer with twenty years of experience.", c: ["succeed", "success", "successfully", "successful"], a: 3, t: "T1", d: 800, why: "a + 副詞 highly + ___ + 名詞 lawyer.副詞 highly が修飾し,名詞 lawyer を修飾するのは形容詞 successful.副詞が間に入っても「冠詞 + ___ + 名詞」の形は同じ.", ja: "ホールさんは20年の経験をもつ,大きな成功を収めた弁護士だ." },
  { id: "g97", q: "The committee reached a ____ decision after two hours of discussion.", c: ["unanimity", "unanimous", "unanimously", "unanimities"], a: 1, t: "T1", d: 1300, why: "冠詞 a と名詞 decision の間なので形容詞.-ous は形容詞の語尾(unanimous:全員一致の).知らない単語でも語尾から品詞を判定できる.", ja: "委員会は2時間の議論の末,全員一致の決定に達した." },

  // T2
  { id: "g98", q: "Please read the instructions ____ before using the machine.", c: ["carefully", "careful", "care", "caring"], a: 0, t: "T2", d: 400, why: "動詞 read を修飾するので副詞 carefully.「動詞 + 目的語 + ___」の位置.", ja: "機械を使う前に説明書を注意深く読んでください." },
  { id: "g99", q: "The two companies have ____ agreed to work together.", c: ["final", "finally", "finals", "finalize"], a: 1, t: "T2", d: 500, why: "have と過去分詞 agreed の間は副詞の位置.finally(ついに).", ja: "両社はついに協力することで合意した." },
  { id: "g100", q: "Our staff will respond ____ to all customer inquiries.", c: ["prompt", "promptness", "prompted", "promptly"], a: 3, t: "T2", d: 700, why: "動詞 respond を修飾する副詞 promptly(迅速に).respond は自動詞なので,後ろに名詞は置けない.", ja: "当社のスタッフはすべての問い合わせに迅速に対応する." },
  { id: "g101", q: "The price of fuel has risen ____ over the last six months.", c: ["sharply", "sharp", "sharpen", "sharpness"], a: 0, t: "T2", d: 700, why: "動詞 has risen を修飾する副詞 sharply(急激に).rise は自動詞なので目的語(名詞)はとらない.", ja: "燃料の価格はこの6か月で急激に上がった." },
  { id: "g102", q: "The software is ____ updated to protect users' data.", c: ["regular", "regulate", "regularity", "regularly"], a: 3, t: "T2", d: 600, why: "be 動詞と過去分詞 updated の間は副詞の位置.regularly(定期的に).", ja: "そのソフトは利用者のデータを守るため,定期的に更新される." },
  { id: "g103", q: "Ms. Abe speaks English ____ enough to negotiate with overseas clients.", c: ["fluent", "fluency", "fluently", "more fluent"], a: 2, t: "T2", d: 900, why: "動詞 speaks を修飾する副詞 fluently.「副詞 + enough to do」で「〜できるほど…に」.English は目的語なので,その後ろは名詞ではなく副詞.", ja: "阿部さんは海外の顧客と交渉できるほど流ちょうに英語を話す." },
  { id: "g104", q: "The figures in the report were ____ accurate, with only one minor error.", c: ["largely", "large", "larger", "enlarge"], a: 0, t: "T2", d: 1000, why: "形容詞 accurate を修飾するのは副詞.largely(大部分は).副詞は動詞だけでなく形容詞も修飾する.", ja: "報告書の数字はおおむね正確で,小さな誤りが1つあるだけだった." },

  // T3
  { id: "g105", q: "The manager praised the team for its ____.", c: ["perform", "performed", "performance", "performing"], a: 2, t: "T3", d: 500, why: "所有格 its の後ろで,文が終わっているので名詞 performance(成績・働きぶり).", ja: "部長はチームの働きぶりをほめた." },
  { id: "g106", q: "Please confirm your ____ at the meeting by Friday.", c: ["attend", "attentive", "attended", "attendance"], a: 3, t: "T3", d: 600, why: "所有格 your の直後で,後ろに名詞が続かないので名詞 attendance(出席).", ja: "金曜日までに会議への出席を確認してください." },
  { id: "g107", q: "The company is seeking an experienced ____ to manage its finances.", c: ["account", "accounting", "accountant", "accountable"], a: 2, t: "T3", d: 1000, why: "an + 形容詞 experienced + ___ なので名詞.財務を管理するのは「人」なので accountant(会計士).名詞が複数ある選択肢では,人か物かを意味で選ぶ.", ja: "その会社は財務を管理する,経験豊富な会計士を探している." },
  { id: "g108", q: "There has been a sharp ____ in the number of tourists.", c: ["decline", "declined", "declining", "declines"], a: 0, t: "T3", d: 700, why: "a + 形容詞 sharp + ___ で名詞が入る.冠詞 a があるので単数形 decline(減少).", ja: "観光客の数が急激に減少している." },
  { id: "g109", q: "All employees must follow the safety ____ at all times.", c: ["regulations", "regulate", "regulatory", "regulated"], a: 0, t: "T3", d: 700, why: "the safety ___ で1つの名詞句(安全規則)を作る.動詞 follow の目的語の中心になる名詞 regulations.", ja: "全従業員は常に安全規則に従わなければならない." },
  { id: "g110", q: "Mr. Sato is seeking ____ on how to reduce costs.", c: ["advise", "advisable", "advisory", "advice"], a: 3, t: "T3", d: 900, why: "他動詞 seek の目的語なので名詞 advice(助言).advise(つづりが s)は動詞.", ja: "佐藤さんは経費を減らす方法について助言を求めている." },

  // T4
  { id: "g111", q: "The company ____ its products online since last April.", c: ["sells", "sold", "has sold", "is selling"], a: 2, t: "T4", d: 500, why: "since last April(昨年4月から)があるので現在完了 has sold.", ja: "その会社は昨年の4月から製品をオンラインで販売している." },
  { id: "g112", q: "Mr. Brown ____ as our accountant for the past ten years.", c: ["serves", "will serve", "is serving", "has served"], a: 3, t: "T4", d: 600, why: "for the past ten years(過去10年間)は現在まで続く期間.現在完了 has served.", ja: "ブラウンさんは過去10年間,当社の会計士を務めてきた." },
  { id: "g113", q: "We ____ any complaints since we changed the packaging.", c: ["did not receive", "do not receive", "have not received", "had not received"], a: 2, t: "T4", d: 800, why: "since + 過去の節(包装を変えて以来)があるので現在完了.否定は have not received.", ja: "包装を変えて以来,苦情は1件も受けていない." },
  { id: "g114", q: "Over the last decade, the city ____ three new subway lines.", c: ["has built", "builds", "is building", "will build"], a: 0, t: "T4", d: 700, why: "Over the last decade(この10年間で)は現在までの期間.現在完了 has built.", ja: "この10年で,市は地下鉄の新路線を3本建設した." },
  { id: "g115", q: "Ms. Ono ____ in Paris for five years, but she now works in Tokyo.", c: ["works", "has worked", "worked", "is working"], a: 2, t: "T4", d: 1200, why: "but she now works in Tokyo から,パリで働いたのはもう終わったことだと分かる.今につながらない期間は過去形 worked.for + 期間だけでは現在完了と決まらない(the past が付くか,今も続いているかを確かめる).", ja: "小野さんは5年間パリで働いたが,今は東京で働いている." },
  { id: "g116", q: "The number of online orders ____ steadily since the Web site was redesigned.", c: ["has grown", "grows", "grew", "will grow"], a: 0, t: "T4", d: 700, why: "since + 過去の節(サイトが作り直されて以来)があるので現在完了 has grown.", ja: "サイトが作り直されて以来,オンライン注文の数は着実に増えている." },
  { id: "g117", q: "Since joining the company in 2015, Mr. Diaz ____ three sales awards.", c: ["wins", "will win", "was winning", "has won"], a: 3, t: "T4", d: 900, why: "Since joining ... in 2015(2015年に入社して以来)も「since + 過去の時点」と同じ.現在完了 has won.", ja: "2015年の入社以来,ディアスさんは営業賞を3回受賞している." },
  { id: "g118", q: "So far this year, we ____ more than 200 new clients.", c: ["gain", "are gaining", "had gained", "have gained"], a: 3, t: "T4", d: 1000, why: "so far(これまでのところ)は「今まで」の期間を表すので現在完了 have gained.since / for the past と同じ働きをする目印.", ja: "今年はこれまでに200社を超える新しい顧客を獲得した." },

  // T5
  { id: "g119", q: "We will send you the invoice after the work ____ complete.", c: ["will be", "is", "was", "be"], a: 1, t: "T5", d: 500, why: "after 以下は時の副詞節.未来のことでも現在形 is.", ja: "作業が完了したら請求書をお送りします." },
  { id: "g120", q: "Before you ____ the building, please turn off all the lights.", c: ["leave", "will leave", "left", "are left"], a: 0, t: "T5", d: 400, why: "before 以下は時の副詞節なので,これからのことでも現在形 leave.", ja: "建物を出る前に,すべての照明を消してください." },
  { id: "g121", q: "The manager will make a decision once she ____ all the proposals.", c: ["has reviewed", "reviewed", "will review", "will have reviewed"], a: 0, t: "T5", d: 1000, why: "once(いったん〜したら)も時の副詞節をつくる.節の中では will を使わない.「検討し終えたら」という完了は現在完了 has reviewed で表す(未来完了の代わり).", ja: "部長はすべての提案を検討し終えたら決定を下す." },
  { id: "g122", q: "The discount will apply only if payment ____ within ten days.", c: ["will be made", "is made", "was made", "made"], a: 1, t: "T5", d: 900, why: "if 以下は条件の副詞節なので現在形.payment は「支払われる」側なので受動態 is made.", ja: "割引は,10日以内に支払いが行われた場合にだけ適用される." },
  { id: "g123", q: "Please do not start the machine until the supervisor ____ you permission.", c: ["gives", "will give", "gave", "giving"], a: 0, t: "T5", d: 600, why: "until 以下は時の副詞節.未来のことでも現在形 gives.", ja: "監督者が許可を出すまで,機械を動かさないでください." },
  { id: "g124", q: "By the time the guests ____, the room will be ready.", c: ["will arrive", "arrived", "arriving", "arrive"], a: 3, t: "T5", d: 800, why: "by the time(〜するときまでに)も時の副詞節.主節が未来(will be)なので,節の中は現在形 arrive.", ja: "客が到着するまでには,部屋の準備ができているだろう." },
  { id: "g125", q: "I will let you know as soon as I ____ from the supplier.", c: ["will hear", "heard", "am heard", "hear"], a: 3, t: "T5", d: 700, why: "as soon as 以下は時の副詞節なので現在形 hear.", ja: "仕入先から連絡があり次第,お知らせします." },

  // T6
  { id: "g126", q: "All visitors ____ to sign in at the front desk.", c: ["require", "are required", "requiring", "have required"], a: 1, t: "T6", d: 500, why: "visitors は「求められる」側なので受動態 are required.be required to do で「〜するよう求められる」.", ja: "来訪者は全員,受付で署名するよう求められる." },
  { id: "g127", q: "The annual report ____ to shareholders next week.", c: ["will be sent", "will send", "has sent", "is sending"], a: 0, t: "T6", d: 600, why: "report は「送られる」側.空所の後ろに目的語がないことも受動態の目印.未来なので will be sent.", ja: "年次報告書は来週,株主に送られる." },
  { id: "g128", q: "The conference room is currently ____.", c: ["being cleaned", "cleaned", "cleaning", "been cleaned"], a: 0, t: "T6", d: 900, why: "部屋は「掃除される」側で,currently(今ちょうど)なので進行形の受動態 be + being + 過去分詞.", ja: "会議室は今,清掃中だ." },
  { id: "g129", q: "The winner of the design contest ____ yesterday.", c: ["announced", "was announced", "has announced", "was announcing"], a: 1, t: "T6", d: 600, why: "winner は「発表される」側.後ろに目的語がなく,yesterday があるので過去の受動態 was announced.", ja: "デザインコンテストの優勝者は昨日発表された." },
  { id: "g130", q: "Employees ____ a bonus at the end of each year.", c: ["give", "are giving", "have given", "are given"], a: 3, t: "T6", d: 800, why: "従業員は賞与を「与えられる」側.give 人 物 の受動態は「人 + be given + 物」で,後ろに名詞 a bonus が残る.後ろに名詞があっても能動態とは限らない.", ja: "従業員は毎年末に賞与を支給される." },
  { id: "g131", q: "The package should ____ by a manager before it is shipped.", c: ["check", "be checking", "have checked", "be checked"], a: 3, t: "T6", d: 700, why: "package は「確認される」側.by a manager(部長によって)も受動態の目印.助動詞 should の後ろは be + 過去分詞.", ja: "荷物は発送前に部長の確認を受けなければならない." },
  { id: "g132", q: "The accident ____ at the intersection last night.", c: ["was occurred", "has been occurred", "occurred", "occurring"], a: 2, t: "T6", d: 1300, why: "occur(起こる)は目的語をとらない自動詞なので,受動態にできない.「〜される」と訳せそうでも,happen, occur, arrive, rise などは能動態のまま使う.", ja: "その事故は昨夜,交差点で起きた." },

  // T7
  { id: "g133", q: "We are looking forward to ____ with you again.", c: ["working", "work", "worked", "be working"], a: 0, t: "T7", d: 600, why: "look forward to の to は前置詞.後ろは動名詞 working.", ja: "またご一緒に仕事ができることを楽しみにしています." },
  { id: "g134", q: "In addition to ____ the store, Mr. Yamada trains new staff.", c: ["manage", "manages", "managing", "managed"], a: 2, t: "T7", d: 900, why: "in addition to(〜に加えて)の to は前置詞.後ろは動名詞 managing.", ja: "山田さんは店の運営に加えて,新人の研修も行う." },
  { id: "g135", q: "Ms. Green is used to ____ long hours.", c: ["work", "worked", "works", "working"], a: 3, t: "T7", d: 1000, why: "be used to 〜(〜に慣れている)の to は前置詞.後ろは動名詞 working.", ja: "グリーンさんは長時間働くことに慣れている." },
  { id: "g136", q: "The team is dedicated to ____ customer satisfaction.", c: ["improve", "improves", "improved", "improving"], a: 3, t: "T7", d: 900, why: "be dedicated to(〜に打ち込んでいる)の to は前置詞.後ろは動名詞 improving.", ja: "そのチームは顧客満足度の向上に力を注いでいる." },
  { id: "g137", q: "Many residents objected to ____ a factory near the school.", c: ["build", "built", "building", "be built"], a: 2, t: "T7", d: 1100, why: "object to(〜に反対する)の to は前置詞.後ろは動名詞 building.", ja: "多くの住民が学校の近くに工場を建てることに反対した." },
  { id: "g138", q: "Prior to ____ the company, Ms. Lee worked for a bank.", c: ["join", "joined", "joins", "joining"], a: 3, t: "T7", d: 1000, why: "prior to(〜より前に)の to は前置詞.before と同じ意味で,後ろは動名詞 joining.", ja: "入社する前,リーさんは銀行に勤めていた." },
  { id: "g139", q: "The new system will contribute to ____ waste.", c: ["reducing", "reduce", "reduced", "reduces"], a: 0, t: "T7", d: 1000, why: "contribute to(〜に貢献する)の to は前置詞.後ろは動名詞 reducing.", ja: "新しい仕組みはごみの削減に役立つだろう." },
  { id: "g140", q: "Mr. Ito used to ____ in the Osaka branch.", c: ["work", "working", "worked", "works"], a: 0, t: "T7", d: 1200, why: "be 動詞がない used to は「以前は〜していた」という助動詞のような表現で,後ろは原形 work.be used to + -ing(〜に慣れている)と区別する.be があるかどうかで決まる.", ja: "伊藤さんは以前,大阪支店で働いていた." },

  // T8
  { id: "g141", q: "The woman ____ called this morning left a message for you.", c: ["who", "which", "whose", "whom"], a: 0, t: "T8", d: 400, why: "先行詞 woman は人で,空所は called の主語なので who.", ja: "今朝電話をかけてきた女性が,あなたに伝言を残した." },
  { id: "g142", q: "The printer ____ we bought last month is already broken.", c: ["which", "whom", "who", "what"], a: 0, t: "T8", d: 500, why: "先行詞 printer は物なので which.what は先行詞があるときには使えない.", ja: "先月買ったプリンターがもう壊れている." },
  { id: "g143", q: "Mr. Tanaka, ____ joined us in May, has been promoted.", c: ["that", "which", "who", "whose"], a: 2, t: "T8", d: 800, why: "先行詞は人(Mr. Tanaka)で,カンマの後なので that は使えない.who が入る.", ja: "5月に入社した田中さんが昇進した." },
  { id: "g144", q: "The software, ____ costs $200, is easy to use.", c: ["that", "what", "who", "which"], a: 3, t: "T8", d: 700, why: "先行詞 software は物.カンマの後(非制限用法)では that は使えないので which.", ja: "そのソフトは200ドルで,使いやすい." },
  { id: "g145", q: "The clients ____ we met in Seoul have placed a large order.", c: ["which", "what", "whose", "whom"], a: 3, t: "T8", d: 900, why: "先行詞 clients は人.空所は met の目的語(we met them)なので目的格 whom.", ja: "ソウルで会った顧客が大口の注文をしてくれた." },
  { id: "g146", q: "Anyone ____ wishes to attend should register by Friday.", c: ["who", "which", "whom", "whose"], a: 0, t: "T8", d: 700, why: "先行詞 anyone は人.空所は wishes の主語なので who(whom は目的語のとき).", ja: "出席を希望する人は金曜日までに登録してください." },
  { id: "g147", q: "This is the only model ____ is still in stock.", c: ["who", "what", "that", "whom"], a: 2, t: "T8", d: 1000, why: "先行詞 model は物なので who / whom は不可.what は先行詞があるので不可.the only や最上級が付く先行詞には that がよく使われる.", ja: "在庫が残っているのはこの機種だけだ." },

  // T9
  { id: "g148", q: "____ the meeting, please turn off your mobile phones.", c: ["During", "While", "When", "As"], a: 0, t: "T9", d: 500, why: "後ろは名詞句 the meeting だけなので前置詞 during.while / when / as は後ろに節が必要.", ja: "会議中は携帯電話の電源を切ってください." },
  { id: "g149", q: "The game was postponed ____ it was raining heavily.", c: ["because of", "due to", "because", "despite"], a: 2, t: "T9", d: 500, why: "後ろは節(it was raining)なので接続詞 because.because of / due to / despite は前置詞.", ja: "大雨が降っていたので試合は延期された." },
  { id: "g150", q: "____ his lack of experience, Mr. Hill was offered the job.", c: ["Despite", "Although", "Even though", "However"], a: 0, t: "T9", d: 800, why: "後ろは名詞句 his lack of experience なので前置詞 despite(〜にもかかわらず).although / even though は接続詞.", ja: "経験不足にもかかわらず,ヒルさんはその仕事を提示された." },
  { id: "g151", q: "The office will be closed ____ the national holiday.", c: ["because", "although", "while", "due to"], a: 3, t: "T9", d: 700, why: "後ろは名詞句 the national holiday なので前置詞 due to(〜のため).", ja: "祝日のため事務所は休みになる." },
  { id: "g152", q: "____ sales were lower than expected, the company still made a profit.", c: ["Despite", "In spite of", "Because of", "Even though"], a: 3, t: "T9", d: 900, why: "後ろは節(sales were lower)なので接続詞 even though(〜だけれども).despite / in spite of は意味は同じでも前置詞.", ja: "売上は予想より低かったが,それでも会社は利益を出した." },
  { id: "g153", q: "Employees may not use their phones ____ working on the factory floor.", c: ["during", "while", "for", "among"], a: 1, t: "T9", d: 1200, why: "working は「they are working」の主語と be 動詞を省いた形で,節の扱い.while + -ing で「〜している間」.during の後ろには名詞(their work など)が必要で,-ing は置けない.", ja: "従業員は工場の現場で作業している間,電話を使ってはならない." },

  // T10
  { id: "g154", q: "The documents on the desk ____ to Ms. Park.", c: ["belong", "belonging", "belongs", "is belonging"], a: 0, t: "T10", d: 600, why: "主語の中心は複数の documents(on the desk は修飾語).動詞は複数に合わせて belong.", ja: "机の上の書類はパークさんのものだ." },
  { id: "g155", q: "One of our best customers ____ moved overseas.", c: ["have", "has", "are", "were"], a: 1, t: "T10", d: 700, why: "主語の中心は One(1人).of 以下の customers につられない.単数なので has.", ja: "当社の最良の顧客の1人が海外に引っ越した." },
  { id: "g156", q: "Everyone in the sales and marketing departments ____ invited to the party.", c: ["are", "were", "have been", "is"], a: 3, t: "T10", d: 900, why: "主語 Everyone は単数扱い.直前の departments(複数)につられない.", ja: "営業部とマーケティング部の全員がパーティーに招待されている." },
  { id: "g157", q: "The results of the survey ____ that customers prefer online payment.", c: ["shows", "show", "showing", "is shown"], a: 1, t: "T10", d: 800, why: "主語の中心は複数の results.直前の survey(単数)につられない.", ja: "調査の結果は,客がオンライン決済を好むことを示している." },
  { id: "g158", q: "The information in these reports ____ confidential.", c: ["is", "are", "were", "have been"], a: 0, t: "T10", d: 800, why: "主語の中心 information は数えられない名詞で単数扱い.直前の reports につられない.", ja: "これらの報告書の情報は機密だ." },
  { id: "g159", q: "Mr. Cho, along with his two assistants, ____ arriving tomorrow.", c: ["are", "were", "is", "have been"], a: 2, t: "T10", d: 1300, why: "along with 〜(〜と一緒に)は前置詞のまとまりで,主語を複数にしない(and とは違う).主語は Mr. Cho 1人なので is.as well as, together with も同じ.", ja: "チョさんは2人の助手と一緒に明日到着する." },
  { id: "g160", q: "There ____ several reasons for the delay.", c: ["is", "was", "are", "has been"], a: 2, t: "T10", d: 600, why: "There is / are の文では,動詞は後ろの名詞に合わせる.reasons は複数なので are.", ja: "遅れにはいくつかの理由がある." },
  { id: "g161", q: "The staff members who work at the front desk ____ very helpful.", c: ["is", "was", "has been", "are"], a: 3, t: "T10", d: 900, why: "主語の中心は複数の members.who ... desk は members を説明する節で,直前の desk(単数)は主語ではない.", ja: "受付で働くスタッフはとても親切だ." },

  // T11
  { id: "g162", q: "This quarter's sales were ____ than we expected.", c: ["high", "higher", "highest", "more high"], a: 1, t: "T11", d: 400, why: "than があるので比較級 higher.短い語は -er を付ける(more high とは言わない).", ja: "今四半期の売上は予想より高かった." },
  { id: "g163", q: "Of the three plans, the second is the ____ expensive.", c: ["less", "lesser", "little", "least"], a: 3, t: "T11", d: 800, why: "Of the three(3つの中で)とあり,前に the があるので最上級.the least + 形容詞 で「最も〜でない」.", ja: "3つの案の中で,2番目が最も安い." },
  { id: "g164", q: "Please reply as ____ as possible.", c: ["soon", "sooner", "soonest", "more soon"], a: 0, t: "T11", d: 400, why: "as ___ as の間は原級 soon.as soon as possible で「できるだけ早く」.", ja: "できるだけ早く返信してください." },
  { id: "g165", q: "The new model is ____ more efficient than the old one.", c: ["very", "much", "many", "more"], a: 1, t: "T11", d: 900, why: "比較級 more efficient を強めるのは much(はるかに).very は原級しか強められない.", ja: "新しい機種は古い機種よりはるかに効率的だ." },
  { id: "g166", q: "Mr. Ono works ____ than anyone else in the department.", c: ["hardly", "hard", "hardest", "harder"], a: 3, t: "T11", d: 600, why: "than があるので比較級 harder.hardly は「ほとんど〜ない」という別の語.", ja: "小野さんは部署のだれよりも熱心に働く." },
  { id: "g167", q: "The ____ you order, the lower the price per unit.", c: ["many", "most", "more", "much"], a: 2, t: "T11", d: 1300, why: "「the + 比較級, the + 比較級」で「〜すればするほど…」.後半が the lower なので,前半も比較級 more.", ja: "注文が多ければ多いほど,1個あたりの価格は下がる." },

  // T12
  { id: "g168", q: "The ____ schedule will be posted on the Web site.", c: ["update", "updating", "updated", "updates"], a: 2, t: "T12", d: 600, why: "schedule は「更新される」側なので過去分詞 updated.", ja: "更新された予定表は Web サイトに掲載される." },
  { id: "g169", q: "The seminar was so ____ that several people left early.", c: ["boring", "bored", "bore", "boredom"], a: 0, t: "T12", d: 600, why: "主語 seminar は人を「退屈させる」側なので現在分詞 boring.人が主語なら bored.", ja: "そのセミナーはとても退屈で,数人が早く帰った." },
  { id: "g170", q: "Customers ____ in the survey will receive a coupon.", c: ["participating", "participated", "participate", "participation"], a: 0, t: "T12", d: 1000, why: "文の動詞は will receive.空所は customers を後ろから修飾する分詞.customers は「参加する」側で,participate は自動詞(受け身にならない)なので現在分詞 participating.", ja: "調査に参加する客はクーポンを受け取れる." },
  { id: "g171", q: "The items ____ in this catalog are available online.", c: ["list", "listing", "to list", "listed"], a: 3, t: "T12", d: 900, why: "文の動詞は are.items は「掲載される」側なので過去分詞 listed が後ろから修飾する(which are listed の省略).", ja: "このカタログに載っている商品はオンラインで買える." },
  { id: "g172", q: "We were ____ to hear that the event had been canceled.", c: ["surprised", "surprise", "surprising", "surprisingly"], a: 0, t: "T12", d: 500, why: "主語 We(人)は「驚かされる」側なので過去分詞 surprised.", ja: "催しが中止になったと聞いて私たちは驚いた." },
  { id: "g173", q: "Please return the ____ contract by mail.", c: ["sign", "signing", "signed", "signs"], a: 2, t: "T12", d: 700, why: "contract は「署名される」側なので過去分詞 signed.the と名詞の間で形容詞の働きをする(T1).", ja: "署名済みの契約書を郵送で返送してください." },

  // T13
  { id: "g174", q: "Ms. Chen asked ____ to send the files by noon.", c: ["we", "our", "us", "ourselves"], a: 2, t: "T13", d: 400, why: "動詞 asked の目的語なので目的格 us.ask 人 to do で「人に〜するよう頼む」.", ja: "チェンさんは私たちに,正午までにファイルを送るよう頼んだ." },
  { id: "g175", q: "The directors will announce ____ decision tomorrow.", c: ["their", "they", "them", "theirs"], a: 0, t: "T13", d: 400, why: "後ろに名詞 decision があるので所有格 their.theirs は「彼らのもの」で,後ろに名詞を置けない.", ja: "取締役たちは明日,決定を発表する." },
  { id: "g176", q: "The new employees introduced ____ at the morning meeting.", c: ["they", "their", "them", "themselves"], a: 3, t: "T13", d: 800, why: "introduce の目的語が主語(the new employees)と同じ人なので再帰代名詞 themselves.introduce oneself で「自己紹介する」.", ja: "新入社員たちは朝礼で自己紹介をした." },
  { id: "g177", q: "This desk is Ms. Wada's, and the one by the window is ____.", c: ["my", "me", "mine", "myself"], a: 2, t: "T13", d: 700, why: "「私のもの(= my desk)」を1語で表す所有代名詞 mine.my は後ろに名詞が必要.", ja: "この机は和田さんので,窓際のが私のだ." },
  { id: "g178", q: "Please keep this copy and return the other one to ____.", c: ["we", "us", "our", "ours"], a: 1, t: "T13", d: 500, why: "前置詞 to の目的語なので目的格 us.", ja: "この控えは保管し,もう1枚は私たちに返送してください." },
  { id: "g179", q: "A friend of ____ recommended this restaurant.", c: ["mine", "me", "my", "myself"], a: 0, t: "T13", d: 1100, why: "a friend of mine で「私の友人の1人」.a と my は並べられない(a my friend は不可)ので,of + 所有代名詞 の形にする.", ja: "友人の1人がこのレストランを薦めてくれた." },

  // T14
  { id: "g180", q: "The seminar is open to ____ members and non-members.", c: ["either", "not only", "neither", "both"], a: 3, t: "T14", d: 500, why: "後ろの and と組むのは both.", ja: "そのセミナーは会員と非会員の両方が参加できる." },
  { id: "g181", q: "Neither the red model ____ the blue one is in stock.", c: ["or", "and", "nor", "but"], a: 2, t: "T14", d: 600, why: "neither と組むのは nor.", ja: "赤い機種も青い機種も在庫がない." },
  { id: "g182", q: "You may contact us either by phone ____ by e-mail.", c: ["and", "nor", "but", "or"], a: 3, t: "T14", d: 500, why: "either と組むのは or.", ja: "電話かメールのどちらかでご連絡ください." },
  { id: "g183", q: "The new system is not only faster ____ also easier to use.", c: ["and", "but", "or", "so"], a: 1, t: "T14", d: 600, why: "not only と組むのは but (also).", ja: "新しいシステムは速いだけでなく,使いやすくもある." },
  { id: "g184", q: "____ the manager and the staff were pleased with the results.", c: ["Both", "Either", "Neither", "Whether"], a: 0, t: "T14", d: 700, why: "後ろの and と組むのは both.both A and B が主語のときは複数扱い(were).", ja: "部長もスタッフも結果に満足していた." },
  { id: "g185", q: "Either the manager or her assistants ____ going to attend the ceremony.", c: ["is", "are", "was", "has"], a: 1, t: "T14", d: 1300, why: "either A or B / neither A nor B が主語のとき,動詞は近い方(B)に合わせる.B は assistants(複数)なので are.", ja: "部長か,その助手たちのどちらかが式典に出席する予定だ." },

  // T15
  { id: "g186", q: "We hope ____ you at the opening ceremony.", c: ["see", "to see", "seeing", "seen"], a: 1, t: "T15", d: 400, why: "hope は目的語に to do をとる.", ja: "開会式でお会いできることを願っています." },
  { id: "g187", q: "Would you mind ____ the window?", c: ["open", "to open", "opening", "opened"], a: 2, t: "T15", d: 600, why: "mind は目的語に -ing をとる.Would you mind -ing? で「〜していただけますか」.", ja: "窓を開けていただけますか." },
  { id: "g188", q: "The supplier agreed ____ the price by 5 percent.", c: ["lower", "lowering", "lowered", "to lower"], a: 3, t: "T15", d: 600, why: "agree は目的語に to do をとる.", ja: "仕入先は価格を5%下げることに同意した." },
  { id: "g189", q: "Ms. Mori suggested ____ the meeting until next week.", c: ["postponing", "postpone", "to postpone", "postponed"], a: 0, t: "T15", d: 900, why: "suggest は目的語に -ing をとる(to do は不可).", ja: "森さんは会議を来週まで延期することを提案した." },
  { id: "g190", q: "The company cannot afford ____ another mistake.", c: ["make", "to make", "making", "made"], a: 1, t: "T15", d: 900, why: "afford(〜する余裕がある)は目的語に to do をとる.", ja: "その会社には,これ以上ミスをする余裕はない." },
  { id: "g191", q: "Please remember ____ the door when you leave tonight.", c: ["lock", "locking", "to lock", "locked"], a: 2, t: "T15", d: 1200, why: "remember to do は「(これから)忘れずに〜する」,remember -ing は「(過去に)〜したことを覚えている」.今夜これからのことなので to lock.to do はこれからのこと,-ing はすでにしたこと.", ja: "今夜帰るとき,忘れずにドアに鍵をかけてください." },

  // T16
  { id: "g192", q: "The doctor recommended that Mr. Ito ____ more rest.", c: ["gets", "get", "got", "getting"], a: 1, t: "T16", d: 1000, why: "recommend に続く that 節では,主語が3人称単数でも動詞は原形 get.", ja: "医師は伊藤さんに,もっと休養をとるよう勧めた." },
  { id: "g193", q: "It is essential that every visitor ____ a helmet.", c: ["wears", "wore", "wear", "wearing"], a: 2, t: "T16", d: 1100, why: "It is essential / important / necessary that ...(〜することが必要だ)も要求を表すので,動詞は原形 wear.", ja: "すべての来訪者がヘルメットを着用することが不可欠だ." },
  { id: "g194", q: "The board proposed that the budget ____ increased.", c: ["be", "is", "was", "being"], a: 0, t: "T16", d: 1200, why: "propose に続く that 節では動詞は原形.受動態なので be increased.", ja: "取締役会は予算を増やすことを提案した." },
  { id: "g195", q: "The manager suggested that Ms. Ota ____ the launch date.", c: ["changed", "changes", "will change", "change"], a: 3, t: "T16", d: 1000, why: "suggest に続く that 節では,主語や時制に関係なく動詞は原形 change.", ja: "部長は太田さんに,発売日を変更するよう提案した." },
  { id: "g196", q: "The lawyer advised that the company not ____ the contract yet.", c: ["signs", "sign", "signed", "signing"], a: 1, t: "T16", d: 1300, why: "要求・提案の that 節の否定は「not + 原形」(does not は使わない).", ja: "弁護士は,会社がまだ契約に署名しないよう助言した." },
  { id: "g197", q: "The city requires that all restaurants ____ inspected once a year.", c: ["been", "are", "were", "be"], a: 3, t: "T16", d: 1200, why: "require に続く that 節では動詞は原形.受動態なので be inspected.", ja: "市は,すべての飲食店が年に1回検査を受けることを義務づけている." },
  { id: "g198", q: "The client demanded that the error ____ immediately.", c: ["corrects", "be corrected", "is correcting", "corrected"], a: 1, t: "T16", d: 1300, why: "demand に続く that 節では動詞は原形.error は「直される」側なので受動態 be corrected.", ja: "顧客は誤りをただちに直すよう要求した." },

  // T17
  { id: "g199", q: "We have received ____ applications for the position so far.", c: ["much", "a little", "many", "every"], a: 2, t: "T17", d: 400, why: "applications は数えられる名詞の複数形なので many.every の後ろは単数形.", ja: "その職にはこれまでに多くの応募があった." },
  { id: "g200", q: "There is very ____ information available about the new product.", c: ["few", "little", "many", "several"], a: 1, t: "T17", d: 600, why: "information は数えられない名詞なので little(ほとんどない).", ja: "新製品について手に入る情報はほとんどない." },
  { id: "g201", q: "____ employee is given a locker.", c: ["All", "Each", "Many", "Several"], a: 1, t: "T17", d: 500, why: "後ろが単数形 employee で動詞も is なので each.all / many / several の後ろは複数形.", ja: "各従業員にロッカーが与えられる." },
  { id: "g202", q: "Only a ____ seats are still available for tonight's show.", c: ["few", "little", "much", "less"], a: 0, t: "T17", d: 600, why: "seats は数えられる名詞の複数形なので a few(少しの).", ja: "今夜の公演の席は,あとわずかしか残っていない." },
  { id: "g203", q: "____ of the equipment in the lab needs to be replaced.", c: ["Many", "Few", "Several", "Much"], a: 3, t: "T17", d: 1000, why: "equipment は数えられない名詞なので much.動詞が needs(単数)であることも手がかり.equipment, furniture, luggage, advice は数えられない.", ja: "研究室の機器の多くは交換する必要がある." },
  { id: "g204", q: "____ the rooms on this floor have been reserved.", c: ["Every", "Each", "Almost", "All"], a: 3, t: "T17", d: 1100, why: "the + 複数名詞の前に直接置けるのは all(all the rooms).every / each の後ろは冠詞なしの単数形.almost は副詞なので almost all the rooms とする.", ja: "この階の部屋はすべて予約済みだ." },

  // T18
  { id: "g205", q: "The library is open ____ 8:00 P.M. on weekdays.", c: ["by", "until", "within", "among"], a: 1, t: "T18", d: 500, why: "開いている状態が午後8時までずっと続く.継続なので until.", ja: "図書館は平日,午後8時まで開いている." },
  { id: "g206", q: "Please return the signed form ____ the end of the week.", c: ["by", "until", "since", "while"], a: 0, t: "T18", d: 500, why: "返送は期限までに1回済ませる動作なので by.", ja: "署名した用紙を週末までに返送してください." },
  { id: "g207", q: "The repairs must be finished ____ noon tomorrow.", c: ["until", "during", "by", "since"], a: 2, t: "T18", d: 600, why: "finish(終える)は期限までに1回済ませる動作なので by.", ja: "修理は明日の正午までに終えなければならない." },
  { id: "g208", q: "Mr. Sato will be away on business ____ next Thursday.", c: ["within", "by", "at", "until"], a: 3, t: "T18", d: 700, why: "不在の状態が来週の木曜日まで続く.継続なので until.", ja: "佐藤さんは来週の木曜日まで出張で不在だ." },
  { id: "g209", q: "You can keep the rental car ____ Sunday evening.", c: ["by", "until", "since", "among"], a: 1, t: "T18", d: 700, why: "keep(持ち続ける)は続く状態.日曜の夕方までずっと,なので until.", ja: "レンタカーは日曜の夕方まで借りていられる." },
  { id: "g210", q: "____ the time we arrived, the presentation had already begun.", c: ["Until", "By", "Since", "During"], a: 1, t: "T18", d: 1000, why: "by the time + 節 で「〜するときまでには(すでに)」.期限の by.主節の完了形(had begun)と組むことが多い.", ja: "私たちが着いたときには,発表はすでに始まっていた." },
  { id: "g211", q: "Please stay in your seats ____ the plane has come to a complete stop.", c: ["by", "during", "until", "within"], a: 2, t: "T18", d: 800, why: "stay(とどまる)は続く状態.後ろに節が来る接続詞としても使える until.during は前置詞で,節は続かない.", ja: "飛行機が完全に止まるまで,席に着いたままでいてください." },

  // T19
  { id: "g212", q: "The author ____ book became a bestseller will speak tonight.", c: ["who", "whose", "which", "what"], a: 1, t: "T19", d: 700, why: "空所の後ろが「冠詞のない名詞 book + 動詞 became」.author の(持ち物の)本なので whose.", ja: "著書がベストセラーになった作家が今夜講演する." },
  { id: "g213", q: "____ we need now is more time.", c: ["That", "Which", "What", "Whose"], a: 2, t: "T19", d: 800, why: "先行詞がなく,「私たちが今必要としているもの」を表すので what.", ja: "今私たちに必要なのは,もっと多くの時間だ." },
  { id: "g214", q: "Please tell me ____ you would like for lunch.", c: ["what", "that", "whose", "it"], a: 0, t: "T19", d: 500, why: "先行詞がなく,would like の目的語が欠けている.「昼食に欲しいもの」なので what.", ja: "昼食に何がよいか教えてください." },
  { id: "g215", q: "Companies ____ employees are satisfied tend to be more productive.", c: ["who", "which", "whose", "what"], a: 2, t: "T19", d: 1000, why: "空所の後ろが「冠詞のない名詞 employees + 動詞 are」.companies の従業員なので whose(物が先行詞でも使える).", ja: "従業員が満足している会社は,生産性が高い傾向がある." },
  { id: "g216", q: "The manager explained ____ had caused the delay.", c: ["that", "what", "whose", "where"], a: 1, t: "T19", d: 1000, why: "explained の後ろに先行詞がなく,had caused の主語が欠けている.「遅れを引き起こしたもの」なので what.that は後ろが完全な文のときに使う.", ja: "部長は何が遅れを引き起こしたのかを説明した." },
  { id: "g217", q: "We stayed at a hotel ____ rooms overlook the ocean.", c: ["which", "that", "what", "whose"], a: 3, t: "T19", d: 900, why: "空所の後ろが「冠詞のない名詞 rooms + 動詞 overlook」.hotel の部屋なので whose.", ja: "私たちは,部屋から海が見渡せるホテルに泊まった." },
  { id: "g218", q: "____ impressed the clients most was the quality of the presentation.", c: ["What", "That", "Whose", "Which"], a: 0, t: "T19", d: 1100, why: "先行詞がなく,「顧客を最も感心させたもの」という主語のまとまりをつくるので what.", ja: "顧客を最も感心させたのは,発表の質だった." },
  { id: "g219", q: "The results were quite different from ____ we had expected.", c: ["which", "that", "what", "whose"], a: 2, t: "T19", d: 1200, why: "前置詞 from の後ろで先行詞がなく,expected の目的語が欠けている.「私たちが予想していたもの」なので what.", ja: "結果は私たちが予想していたものとかなり違っていた." },

  // T20
  { id: "g220", q: "The new procedure seems ____.", c: ["complicate", "complication", "complicated", "complicatedly"], a: 2, t: "T20", d: 700, why: "seem の後ろ(補語の位置)なので形容詞 complicated(複雑な).", ja: "新しい手続きは複雑そうだ." },
  { id: "g221", q: "Please remain ____ until the bus has stopped.", c: ["seat", "seated", "seating", "seats"], a: 1, t: "T20", d: 800, why: "remain の後ろは補語で形容詞.人は「座らされている」側なので seated(座った状態の).", ja: "バスが止まるまで座ったままでいてください." },
  { id: "g222", q: "The instructions were not ____ to the new staff.", c: ["clearly", "clear", "clarity", "clears"], a: 1, t: "T20", d: 500, why: "be 動詞の後ろの補語なので形容詞 clear.副詞 clearly は補語になれない.", ja: "その指示は新しいスタッフには分かりにくかった." },
  { id: "g223", q: "It is ____ to arrive at the airport two hours early.", c: ["advise", "advice", "advisably", "advisable"], a: 3, t: "T20", d: 900, why: "It is ___ to do の空所は補語で形容詞 advisable(望ましい).-able は形容詞の語尾.", ja: "空港には2時間前に着くのが望ましい." },
  { id: "g224", q: "The manager became ____ when the shipment did not arrive.", c: ["anxious", "anxiously", "anxiety", "anxiousness"], a: 0, t: "T20", d: 700, why: "become の後ろは補語で形容詞 anxious(心配な).", ja: "荷物が届かず,部長は心配になった." },
  { id: "g225", q: "The plan sounds ____ to me.", c: ["reasonably", "reason", "reasoning", "reasonable"], a: 3, t: "T20", d: 800, why: "sound(〜に聞こえる)の後ろは補語で形容詞 reasonable(妥当な).look, sound, feel, taste の後ろも形容詞.", ja: "その計画は私には妥当に思える." },
  { id: "g226", q: "Please keep the storage area ____ at all times.", c: ["neat", "neatly", "neatness", "neaten"], a: 0, t: "T20", d: 1200, why: "keep + 目的語 + 形容詞 で「〜を…の状態に保つ」.空所は目的語 the storage area の状態を説明する補語なので形容詞 neat.副詞 neatly にしないこと.", ja: "保管場所は常に整頓しておいてください." },
  { id: "g227", q: "The CEO remained ____ about the company's future.", c: ["optimism", "optimist", "optimistically", "optimistic"], a: 3, t: "T20", d: 1000, why: "remain の後ろは補語で形容詞 optimistic(楽観的な).-ic は形容詞の語尾.", ja: "CEO は会社の将来について楽観的なままだった." },

  // T21
  { id: "g228", q: "____ the item arrive damaged, we will replace it free of charge.", c: ["Had", "Should", "Were", "Did"], a: 1, t: "T21", d: 1300, why: "主語 the item の後ろが原形 arrive.「Should + 主語 + 原形」で「万一〜なら」(If the item should arrive の if を省いた形).", ja: "万一商品が破損して届いた場合は,無料で交換します." },
  { id: "g229", q: "____ I known about the meeting, I would have attended.", c: ["Have", "Did", "Had", "Were"], a: 2, t: "T21", d: 1200, why: "主語 I の後ろが過去分詞 known で,主節が would have + 過去分詞.「Had + 主語 + 過去分詞」(If I had known の if を省いた形).", ja: "会議のことを知っていたら,出席したのに." },
  { id: "g230", q: "____ I in your position, I would accept the offer.", c: ["Were", "Had", "Should", "If"], a: 0, t: "T21", d: 1300, why: "主節が would + 原形で,今の事実と違う仮定.「Were + 主語」(If I were in your position の if を省いた形).If を入れると動詞がなくなる.", ja: "私があなたの立場なら,その申し出を受ける." },
  { id: "g231", q: "Had the team ____ more time, the report would have been more detailed.", c: ["has", "have", "had", "having"], a: 2, t: "T21", d: 1400, why: "文頭の Had は「Had + 主語 + 過去分詞」の助動詞.空所には have(持つ)の過去分詞 had が入る(If the team had had more time).", ja: "チームにもっと時間があったら,報告書はもっと詳しくなっていただろう." },
  { id: "g232", q: "Should you ____ to cancel your order, please let us know within 24 hours.", c: ["wish", "wished", "wishing", "to wish"], a: 0, t: "T21", d: 1200, why: "「Should + 主語 + 原形」なので原形 wish.", ja: "万一ご注文の取り消しをご希望の場合は,24時間以内にお知らせください." },
  { id: "g233", q: "____ it not been for your help, we could not have finished on time.", c: ["Should", "Were", "Has", "Had"], a: 3, t: "T21", d: 1500, why: "後ろが過去分詞 been で,主節が could not have + 過去分詞(過去の事実と違う仮定).Had it not been for 〜 で「〜がなかったら」(If it had not been for の倒置).", ja: "あなたの助けがなかったら,期限どおりに終えられなかっただろう." },
  { id: "g234", q: "____ the weather be bad, the event will be moved indoors.", c: ["Would", "If", "Should", "Had"], a: 2, t: "T21", d: 1300, why: "主語 the weather の後ろが原形 be.「Should + 主語 + 原形」で「万一〜なら」.If なら the weather is bad になるはず.", ja: "万一天気が悪ければ,催しは屋内に移される." },
  { id: "g235", q: "Were the company ____ its prices, it would lose many customers.", c: ["raise", "raised", "raising", "to raise"], a: 3, t: "T21", d: 1600, why: "「Were + 主語 + to do」で「仮に〜するとしたら」(If the company were to raise の if を省いた形).実現しそうにない未来の仮定を表す.", ja: "仮にその会社が値上げをしたら,多くの客を失うだろう." },

  // T22
  { id: "g236", q: "If we had a larger budget, we ____ more staff.", c: ["hire", "will hire", "would hire", "had hired"], a: 2, t: "T22", d: 900, why: "If + 過去形(had)は今の事実と違う仮定.主節は would + 原形.", ja: "予算がもっと多ければ,もっとスタッフを雇うのに." },
  { id: "g237", q: "If I ____ you, I would talk to the manager first.", c: ["am", "were", "be", "have been"], a: 1, t: "T22", d: 800, why: "今の事実と違う仮定は過去形.仮定法では be 動詞は主語に関係なく were.If I were you で「私があなたなら」.", ja: "私があなたなら,まず部長に相談する." },
  { id: "g238", q: "If the train had not been delayed, we ____ on time.", c: ["arrived", "would arrive", "will arrive", "would have arrived"], a: 3, t: "T22", d: 1100, why: "If + had + 過去分詞 は過去の事実と違う仮定.主節は would have + 過去分詞.", ja: "電車が遅れなかったら,時間どおりに着いていたのに." },
  { id: "g239", q: "If Mr. Abe ____ the e-mail earlier, he could have replied before the deadline.", c: ["had read", "reads", "has read", "would read"], a: 0, t: "T22", d: 1200, why: "主節が could have + 過去分詞(過去の事実と違う仮定)なので,if 節は had + 過去分詞.would の代わりに could, might も使える.", ja: "阿部さんがもっと早くメールを読んでいたら,期限前に返信できたのに." },
  { id: "g240", q: "We ____ the order if the price were lower.", c: ["will place", "place", "would place", "placed"], a: 2, t: "T22", d: 1000, why: "if 節が過去形 were(今の事実と違う仮定)なので,主節は would + 原形.if 節が後ろにあっても同じ.", ja: "価格がもっと低ければ,注文するのだが." },
  { id: "g241", q: "I wish I ____ more time to prepare for the presentation.", c: ["have", "had", "will have", "having"], a: 1, t: "T22", d: 1100, why: "I wish(〜ならいいのに)の後ろも今の事実と違う仮定なので,過去形 had.", ja: "発表の準備にもっと時間があればいいのに." },
  { id: "g242", q: "If it ____ sunny tomorrow, we will hold the event outside.", c: ["is", "were", "will be", "had been"], a: 0, t: "T22", d: 900, why: "主節が will + 原形なので,実際に起こりうる条件.仮定法ではなく,条件の副詞節の現在形(T5).主節が will か would かで見分ける.", ja: "明日晴れたら,催しは屋外で行う." },
  { id: "g243", q: "If the company had invested in new equipment last year, it ____ more competitive now.", c: ["is", "will be", "would be", "would have been"], a: 2, t: "T22", d: 1500, why: "if 節は過去の事実と違う仮定(had invested)だが,主節には now がある.「今〜だろうに」は would + 原形.時を表す語(last year / now)でそれぞれの形を決める.", ja: "昨年,新しい設備に投資していたら,その会社は今もっと競争力があるだろうに." },

  // T23
  { id: "g244", q: "____ in the center of the city, the hotel is popular with tourists.", c: ["Locate", "Locating", "Located", "Location"], a: 2, t: "T23", d: 1000, why: "主節の主語 the hotel は「位置づけられる」側(be located)なので過去分詞 Located.", ja: "市の中心にあるので,そのホテルは観光客に人気がある." },
  { id: "g245", q: "____ the instructions carefully, Mr. Hill assembled the shelf in an hour.", c: ["Follow", "Following", "Followed", "Follows"], a: 1, t: "T23", d: 1000, why: "主節の主語 Mr. Hill は説明書に「従う」側.後ろに目的語 the instructions もあるので現在分詞 Following.", ja: "説明書に注意深く従って,ヒルさんは1時間で棚を組み立てた." },
  { id: "g246", q: "____ from above, the lake looks like a heart.", c: ["Seeing", "See", "Seen", "To see"], a: 2, t: "T23", d: 1200, why: "主節の主語 the lake は「見られる」側なので過去分詞 Seen.訳は「見ると」でも,主語が何かで決める.", ja: "上から見ると,その湖はハートの形に見える." },
  { id: "g247", q: "____ finished the report, Ms. Ito went home.", c: ["Having", "Have", "Had", "Has"], a: 0, t: "T23", d: 1200, why: "Having + 過去分詞 は,主節より前に済んだことを表す分詞構文(報告書を終えてから帰った).主語 Ms. Ito は「終える」側なので -ing.", ja: "報告書を仕上げてから,伊藤さんは帰宅した." },
  { id: "g248", q: "The president entered the room, ____ by two assistants.", c: ["follow", "follows", "following", "followed"], a: 3, t: "T23", d: 1300, why: "分詞構文は文の後ろにも置ける.主語 the president は2人の助手に「続かれる」側で,by もあるので過去分詞 followed.", ja: "社長は2人の助手を従えて部屋に入った." },
  { id: "g249", q: "When ____ for a refund, please include the original receipt.", c: ["ask", "asked", "asking", "to ask"], a: 2, t: "T23", d: 1200, why: "接続詞 when の後ろで主語と be 動詞を省いた形(When you are asking).命令文の主語 you は「求める」側なので現在分詞 asking.", ja: "返金を求めるときは,領収書の原本を同封してください." },
  { id: "g250", q: "____ with last year, sales have increased by 10 percent.", c: ["Comparing", "Compare", "Compares", "Compared"], a: 3, t: "T23", d: 1300, why: "主節の主語 sales は昨年と「比べられる」側なので過去分詞 Compared.Compared with 〜 で「〜と比べると」.", ja: "昨年と比べると,売上は10%増えた." },

  // T24
  { id: "g251", q: "The room was ____ small that we could not hold the meeting there.", c: ["such", "so", "very", "too"], a: 1, t: "T24", d: 600, why: "後ろが形容詞 small だけで,that 節が続くので so.very は that 節と組めない.", ja: "部屋がとても狭くて,そこでは会議を開けなかった." },
  { id: "g252", q: "It was ____ a difficult question that nobody could answer it.", c: ["so", "very", "such", "too"], a: 2, t: "T24", d: 700, why: "後ろが「a + 形容詞 + 名詞」なので such.", ja: "とても難しい質問だったので,だれも答えられなかった." },
  { id: "g253", q: "The speaker talked ____ quickly that few people understood him.", c: ["so", "such", "much", "too"], a: 0, t: "T24", d: 700, why: "後ろが副詞 quickly だけなので so.", ja: "講演者はとても早口で,理解できた人はほとんどいなかった." },
  { id: "g254", q: "We received ____ many orders that we had to hire temporary staff.", c: ["such", "too", "very", "so"], a: 3, t: "T24", d: 1000, why: "名詞 orders があるが,many / much / few / little が付くときは so を使う(so many orders).数量の語は so と組む.", ja: "とても多くの注文を受けたので,臨時のスタッフを雇わなければならなかった." },
  { id: "g255", q: "They are ____ reliable suppliers that we have never looked for others.", c: ["so", "such", "too", "very"], a: 1, t: "T24", d: 900, why: "後ろが「形容詞 + 複数名詞」.名詞があるので such(複数形なので a は付かない).", ja: "とても信頼できる仕入先なので,ほかを探したことがない." },
  { id: "g256", q: "Ms. Ono gave ____ useful advice that we finished early.", c: ["so", "very", "such", "much"], a: 2, t: "T24", d: 1000, why: "後ろが「形容詞 + 名詞 advice」.名詞があるので such(advice は数えられないので a は付かない).", ja: "小野さんがとても役立つ助言をくれたので,早く終わった." },
  { id: "g257", q: "There was ____ little time left that we had to cancel the tour.", c: ["such", "so", "too", "very"], a: 1, t: "T24", d: 1200, why: "名詞 time があるが,量を表す little が付いているので so(so little time).many / much / few / little は so と組む.", ja: "時間がほとんど残っていなかったので,見学を中止しなければならなかった." },
  { id: "g258", q: "The delay was ____ that many passengers missed their connections.", c: ["such", "so", "too", "very"], a: 0, t: "T24", d: 1400, why: "空所の後ろに形容詞も副詞もなく,すぐ that 節が続く.such that で「(程度が)それほどのものだったので」.so は後ろに形容詞・副詞が必要.", ja: "遅れはひどく,多くの乗客が乗り継ぎに間に合わなかった." },

  // T25
  { id: "g259", q: "The hotel was fully booked; ____, we had to stay at another one.", c: ["because", "therefore", "although", "so that"], a: 1, t: "T25", d: 900, why: "セミコロンの後ろでカンマが続くので,接続副詞 therefore(したがって).because / although は接続詞で,後ろにカンマを置かない.", ja: "ホテルは満室だった.そのため,別のホテルに泊まらなければならなかった." },
  { id: "g260", q: "Mr. Lee has little experience. ____, he is a fast learner.", c: ["Although", "Despite", "Because", "However"], a: 3, t: "T25", d: 800, why: "ピリオドの後ろでカンマが続くので,接続副詞 however(しかし).although は節を2つつなぐ接続詞で,1つの文だけでは使えない.", ja: "リーさんは経験がほとんどない.しかし,飲み込みが早い." },
  { id: "g261", q: "The restaurant is small, ____ it is always crowded.", c: ["however", "therefore", "but", "nevertheless"], a: 2, t: "T25", d: 900, why: "カンマだけで2つの節をつなげるのは接続詞 but.however / nevertheless は副詞なので,カンマで節をつなげない.", ja: "そのレストランは小さいが,いつも混んでいる." },
  { id: "g262", q: "Our costs have risen. ____, we must raise our prices.", c: ["Therefore", "Although", "Because", "Despite"], a: 0, t: "T25", d: 700, why: "ピリオドの後ろでカンマが続く接続副詞.前の文が原因,後ろが結果なので therefore.", ja: "経費が上がった.したがって,値上げをしなければならない." },
  { id: "g263", q: "The new printer is faster. ____, it uses less ink.", c: ["Although", "Moreover", "Because", "Whereas"], a: 1, t: "T25", d: 1000, why: "ピリオドの後ろでカンマが続く接続副詞.良い点を付け足しているので moreover(そのうえ).", ja: "新しいプリンターは速い.そのうえ,インクの消費も少ない." },
  { id: "g264", q: "Please arrive early; ____, you may not find a seat.", c: ["otherwise", "although", "unless", "because"], a: 0, t: "T25", d: 1200, why: "セミコロンの後ろでカンマが続くので接続副詞.otherwise(そうしないと)が入る.unless は意味が近いが接続詞で,この位置には置けない.", ja: "早めに来てください.そうしないと,席が見つからないかもしれません." },
  { id: "g265", q: "____ the product is expensive, many customers buy it.", c: ["However", "Nevertheless", "Although", "Despite"], a: 2, t: "T25", d: 1000, why: "カンマで2つの節をつないでいるので接続詞が必要.although(〜だけれども).however / nevertheless は副詞,despite は前置詞.", ja: "その製品は高価だが,多くの客が買っている." },

  // T26
  { id: "g266", q: "The picnic will be held on Saturday ____ it rains.", c: ["if", "unless", "because", "so"], a: 1, t: "T26", d: 700, why: "「雨が降らない限り,行われる」.unless = if not.", ja: "雨が降らない限り,ピクニックは土曜日に行われる." },
  { id: "g267", q: "____ you have a membership card, you cannot enter the gym.", c: ["Unless", "If", "As long as", "In case"], a: 0, t: "T26", d: 800, why: "「会員証を持っていない限り,入れない」.unless = if not.If や As long as では意味が逆になる.", ja: "会員証を持っていない限り,ジムには入れない." },
  { id: "g268", q: "You can borrow my laptop ____ you return it by five.", c: ["unless", "as long as", "in case", "whether"], a: 1, t: "T26", d: 800, why: "「5時までに返すという条件で」なので as long as.", ja: "5時までに返してくれるなら,私のノートパソコンを借りてよい." },
  { id: "g269", q: "Take a spare battery ____ the first one runs out.", c: ["unless", "as long as", "in case", "so that"], a: 2, t: "T26", d: 900, why: "「1つ目が切れる場合に備えて」なので in case.", ja: "1つ目が切れる場合に備えて,予備の電池を持っていきなさい." },
  { id: "g270", q: "Employees may work from home ____ their manager approves.", c: ["unless", "in case", "although", "provided that"], a: 3, t: "T26", d: 1100, why: "「上司が承認するという条件で」なので provided that(= if / as long as).", ja: "従業員は,上司が承認すれば在宅で働ける." },
  { id: "g271", q: "____ we receive your payment by Friday, your order will be shipped on Monday.", c: ["Provided", "Unless", "In case", "Whereas"], a: 0, t: "T26", d: 1300, why: "「金曜日までに支払いを受け取るという条件で」.provided (that) の that は省略できる.文頭の Provided を過去分詞と見まちがえないこと.", ja: "金曜日までにお支払いを受け取れば,ご注文は月曜日に発送します." },
  { id: "g272", q: "We will not process your application ____ all the documents are submitted.", c: ["in case", "provided that", "unless", "as if"], a: 2, t: "T26", d: 1000, why: "「すべての書類が提出されない限り,処理しない」.主節が否定で「〜しない限り」なので unless.", ja: "すべての書類が提出されない限り,申請は処理しない." },

  // T27
  { id: "g273", q: "The fee is subject ____ change without notice.", c: ["for", "with", "to", "of"], a: 2, t: "T27", d: 1000, why: "be subject to 〜 で「〜されることがある・〜の対象となる」.この to は前置詞で,後ろは名詞(change).", ja: "料金は予告なく変更されることがある." },
  { id: "g274", q: "Ms. Hara specializes ____ tax law.", c: ["on", "in", "at", "for"], a: 1, t: "T27", d: 800, why: "specialize in 〜 で「〜を専門にする」.", ja: "原さんは税法を専門にしている." },
  { id: "g275", q: "Full-time employees are eligible ____ paid vacation.", c: ["to", "of", "with", "for"], a: 3, t: "T27", d: 900, why: "be eligible for 〜 で「〜を受ける資格がある」.", ja: "正社員は有給休暇を取る資格がある." },
  { id: "g276", q: "The success of the event depends ____ the weather.", c: ["on", "to", "for", "with"], a: 0, t: "T27", d: 500, why: "depend on 〜 で「〜次第である・〜に頼る」.", ja: "催しの成功は天気次第だ." },
  { id: "g277", q: "Please refrain ____ using mobile phones in the theater.", c: ["of", "from", "to", "at"], a: 1, t: "T27", d: 1100, why: "refrain from -ing で「〜するのを控える」.掲示や案内でよく使われる.", ja: "劇場内では携帯電話の使用をお控えください." },
  { id: "g278", q: "Our new office is equipped ____ the latest technology.", c: ["by", "in", "with", "to"], a: 2, t: "T27", d: 900, why: "be equipped with 〜 で「〜を備えている」.", ja: "新しい事務所は最新の技術を備えている." },

  // T28
  { id: "g279", q: "By next March, Ms. Ito ____ here for twenty years.", c: ["works", "worked", "will have worked", "has worked"], a: 2, t: "T28", d: 1100, why: "By next March(来年3月には)は未来の時点.その時点までの継続なので未来完了 will have worked.", ja: "来年3月で,伊藤さんはここで20年働いたことになる." },
  { id: "g280", q: "The meeting ____ by the time I got to the office.", c: ["had already started", "starts", "has already started", "will have started"], a: 0, t: "T28", d: 900, why: "事務所に着いた(過去)時点より前に始まっていたので過去完了 had started.", ja: "事務所に着いたときには,会議はもう始まっていた." },
  { id: "g281", q: "By the time you receive this letter, I ____ the country.", c: ["left", "had left", "leaving", "will have left"], a: 3, t: "T28", d: 1200, why: "by the time 節が現在形 receive(時の副詞節で未来を表す)なので,基準は未来の時点.その時までに完了していることは未来完了 will have left.", ja: "あなたがこの手紙を受け取るころには,私は国を出ているだろう." },
  { id: "g282", q: "Mr. Cho realized that he ____ his passport at home.", c: ["leaves", "has left", "had left", "will leave"], a: 2, t: "T28", d: 900, why: "気づいた(過去)時点より前に置き忘れていたので過去完了 had left.", ja: "チョさんはパスポートを家に置き忘れたことに気づいた." },
  { id: "g283", q: "The store ____ out of the item before the sale even began.", c: ["sells", "has sold", "will have sold", "had sold"], a: 3, t: "T28", d: 1100, why: "セールが始まった(過去)時点より前に売り切れていたので過去完了 had sold.", ja: "その店では,セールが始まる前にその商品が売り切れていた." },
  { id: "g284", q: "By the end of this month, the team ____ the first phase of the project.", c: ["completed", "will have completed", "had completed", "completing"], a: 1, t: "T28", d: 1100, why: "By the end of this month(今月末までに)は未来の期限.それまでに完了することは未来完了 will have completed.", ja: "今月末までに,チームは計画の第1段階を終えているだろう." },
  { id: "g285", q: "Before joining our firm, Mr. Park ____ for a bank for ten years.", c: ["works", "has worked", "had worked", "will have worked"], a: 2, t: "T28", d: 1000, why: "当社に入った(過去)時点より前の10年間のことなので過去完了 had worked.今につながっていないので現在完了は使えない.", ja: "当社に入る前,パークさんは10年間銀行に勤めていた." },

  // T29
  { id: "g286", q: "The manager made the staff ____ the report again.", c: ["to write", "write", "writing", "written"], a: 1, t: "T29", d: 900, why: "make + 人 + 動詞の原形 で「人に(強制的に)〜させる」.to は付けない.", ja: "部長はスタッフに報告書をもう一度書かせた." },
  { id: "g287", q: "We had the office ____ last weekend.", c: ["paint", "painting", "to paint", "painted"], a: 3, t: "T29", d: 1000, why: "have + 物 + 過去分詞 で「物を〜してもらう」.office は「塗られる」側なので painted.", ja: "先週末,事務所を塗装してもらった." },
  { id: "g288", q: "Please have the technician ____ the printer.", c: ["check", "to check", "checked", "checking"], a: 0, t: "T29", d: 1000, why: "have + 人 + 動詞の原形 で「人に〜してもらう」.technician は「点検する」側なので原形 check.", ja: "技術者にプリンターを点検してもらってください." },
  { id: "g289", q: "Ms. Lee let her assistant ____ early on Friday.", c: ["leaves", "to leave", "leave", "leaving"], a: 2, t: "T29", d: 700, why: "let + 人 + 動詞の原形 で「人が〜するのを許す」.", ja: "リーさんは金曜日,助手を早く帰らせてあげた." },
  { id: "g290", q: "I will get my assistant ____ you the file.", c: ["send", "to send", "sent", "sending"], a: 1, t: "T29", d: 1300, why: "get は have と同じ「〜してもらう」の意味だが,get + 人 + to do と to が必要.have / make / let は原形,get は to do.", ja: "助手にそのファイルをあなたへ送らせます." },
  { id: "g291", q: "Mr. Ono had his passport ____ before the trip.", c: ["renew", "to renew", "renewing", "renewed"], a: 3, t: "T29", d: 1100, why: "have + 物 + 過去分詞.passport は「更新される」側なので renewed.", ja: "小野さんは出張の前にパスポートを更新してもらった." },
  { id: "g292", q: "The new software helps employees ____ their time more effectively.", c: ["managing", "managed", "manage", "management"], a: 2, t: "T29", d: 900, why: "help + 人 + (to) 動詞の原形 で「人が〜するのを助ける」.to はあってもなくてもよい.", ja: "新しいソフトは,従業員が時間をより効果的に管理するのに役立つ." },

  // T30
  { id: "g293", q: "The city ____ I was born has changed a lot.", c: ["which", "where", "what", "who"], a: 1, t: "T30", d: 800, why: "空所の後ろ I was born は完全な文(欠けている要素がない).場所を表す関係副詞 where.", ja: "私が生まれた街は大きく変わった." },
  { id: "g294", q: "The restaurant ____ we visited last night was excellent.", c: ["where", "which", "what", "when"], a: 1, t: "T30", d: 1000, why: "visit は他動詞で,後ろの目的語が欠けている.先行詞が場所でも,欠けた目的語を補うのは関係代名詞 which.先行詞ではなく,後ろの文が完全かどうかで決める.", ja: "昨夜訪れたレストランはすばらしかった." },
  { id: "g295", q: "This is the room ____ we keep the old files.", c: ["which", "what", "where", "whose"], a: 2, t: "T30", d: 900, why: "空所の後ろ we keep the old files は主語も目的語もそろった完全な文.場所を表す関係副詞 where.", ja: "ここが古いファイルを保管している部屋だ." },
  { id: "g296", q: "The building ____ was built in 1920 is now a museum.", c: ["which", "where", "what", "when"], a: 0, t: "T30", d: 800, why: "空所の後ろ was built は主語が欠けている.欠けた主語を補う関係代名詞 which.", ja: "1920年に建てられたその建物は,今は博物館になっている." },
  { id: "g297", q: "We toured the factory in ____ the engines are assembled.", c: ["where", "that", "which", "what"], a: 2, t: "T30", d: 1300, why: "前置詞 in の直後に置けるのは which だけ.in which = where.where には前置詞の意味が含まれているので,in where とは言わない.", ja: "私たちは,エンジンが組み立てられている工場を見学した." },
  { id: "g298", q: "The day ____ we signed the contract was a Friday.", c: ["which", "where", "what", "when"], a: 3, t: "T30", d: 1000, why: "空所の後ろ we signed the contract は完全な文.先行詞が時(the day)なので関係副詞 when.場所なら where,時なら when.", ja: "契約に署名した日は金曜日だった." },
  { id: "g299", q: "The office ____ Mr. Kim works in is on the third floor.", c: ["where", "which", "when", "what"], a: 1, t: "T30", d: 1400, why: "後ろの文は works in で終わり,前置詞 in の目的語が欠けている.欠けた名詞を補うのは関係代名詞 which.where を入れると in が余る.", ja: "キムさんが働いている事務所は3階にある." },
  { id: "g300", q: "There are several situations ____ this rule does not apply.", c: ["which", "what", "where", "who"], a: 2, t: "T30", d: 1400, why: "空所の後ろ this rule does not apply は完全な文.situation, case, point など,実際の場所でない「場面・状況」にも where を使う.", ja: "この規則が当てはまらない状況がいくつかある." }
];
