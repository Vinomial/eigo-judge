// 長文読解データ(Part 7 形式)
// 本文は文ごとに配列 s に入れる.各設問の ev は根拠になる文の添字(複数可).
// target: 目標時間(秒).TOEIC本番のペースの目安.
// 設問の d は難易度(レートと同じ尺度).
window.READING = [
  {
    id: "r1",
    kind: "メール",
    title: "From: Laura Chen / To: All staff / Subject: Office move",
    target: 120,
    s: [
      "Dear all,",
      "As you know, our team will move to the fifth floor next month.",
      "The move is scheduled for Saturday, May 18, so that regular work is not interrupted.",
      "Please pack your personal items in the boxes provided by Friday afternoon.",
      "Boxes will be delivered to each desk on Wednesday.",
      "The IT department will disconnect and reinstall all computers, so you do not need to do anything with your equipment.",
      "If you have any questions, please contact me at extension 214.",
      "Best regards,",
      "Laura Chen, Office Manager"
    ],
    ja: "全社員へ:来月チームは5階へ移転する.業務を妨げないよう移転は5月18日(土)に予定されている.金曜午後までに,配布される箱に私物を詰めること.箱は水曜日に各机に届く.パソコンはIT部門が取り外しと再設置を行うので,機器について何もする必要はない.質問は内線214まで.",
    qs: [
      { id: "r1q1", q: "What is the purpose of the e-mail?", c: ["To announce a new office manager", "To report a problem with computers", "To ask staff to work on Saturday", "To give instructions about an office move"], a: 3, ev: [1, 3], d: 400, why: "冒頭で移転を伝え,その後に私物の梱包など指示が続く.目的は「移転についての指示」.", x: ["新しい事務長の紹介ではない.ラウラ・チェンは送り主として名前があるだけ.", "パソコンの不具合の報告ではない(IT 部門が付け外しをするという案内).", "土曜日は移転の日で,社員に土曜出勤を頼んではいない.", ""] },
      { id: "r1q2", q: "When will boxes be delivered?", c: ["On Wednesday", "On Friday", "On Saturday", "Next month"], a: 0, ev: [4], d: 300, why: "Boxes will be delivered to each desk on Wednesday. とある.Friday は梱包の締め切りなので引っかけ.", x: ["", "金曜日は私物を箱に詰める締め切りで,箱が届く日ではない.", "土曜日は移転の日.", "来月は移転の時期で,箱が届く日ではない."] },
      { id: "r1q3", q: "What are employees told about their computers?", c: ["They should pack them in boxes.", "They should take them home.", "They will be handled by another department.", "They will be replaced with new ones."], a: 2, ev: [5], d: 600, why: "The IT department will disconnect and reinstall all computers とあり,社員は何もしなくてよい.IT department を another department と言い換えている.", x: ["パソコンは IT 部門が扱うので,社員が箱に詰める必要はない.", "家に持ち帰るようには書かれていない.", "", "新しいものに替えるとは書かれていない(付け外しして設置し直す)."] }
    ]
  },
  {
    id: "r2",
    kind: "お知らせ",
    title: "Greenfield Public Library — Notice",
    target: 100,
    s: [
      "Greenfield Public Library will be closed from July 1 to July 14 for renovations.",
      "During this period, the new reading room and an additional computer area will be built.",
      "Books that are due during the closure may be returned after the library reopens without any late fees.",
      "Online services, including e-book lending, will remain available.",
      "We apologize for any inconvenience and thank you for your patience."
    ],
    ja: "グリーンフィールド公立図書館は改装のため7月1日から14日まで休館する.期間中に新しい閲覧室とパソコンコーナーを増設する.休館中に返却期限が来る本は,再開後に返却すれば延滞料はかからない.電子書籍の貸出を含むオンラインサービスは引き続き利用できる.",
    qs: [
      { id: "r2q1", q: "Why will the library be closed?", c: ["Because of a holiday", "Because the building is being improved", "Because of a shortage of staff", "Because it is moving to a new location"], a: 1, ev: [0, 1], d: 300, why: "closed ... for renovations とある.renovations を「建物が改良される」と言い換えている.", x: ["休日のための休館ではない(改装のため).", "", "人手不足の話は出てこない.", "移転するとは書かれていない.同じ建物を改装する."] },
      { id: "r2q2", q: "What is indicated about books due during the closure?", c: ["They must be returned before July 1.", "They can be returned at another library.", "They will be renewed automatically online.", "They can be returned later without a fee."], a: 3, ev: [2], d: 500, why: "may be returned after the library reopens without any late fees とある.後で返しても料金がかからない.", x: ["7月1日より前に返す必要はない.再開後に返せばよい.", "ほかの図書館で返せるとは書かれていない.", "オンラインで自動延長されるとは書かれていない.", ""] },
      { id: "r2q3", q: "What will NOT be available during the closure?", c: ["E-book lending", "Online services", "The reading room", "The library website"], a: 2, ev: [1, 3], d: 700, why: "オンラインサービスと電子書籍は利用できる.閲覧室は新しく建設中なので使えない.NOT 問題は,本文にある選択肢を消していく.", x: ["電子書籍の貸出は使える(will remain available).", "オンラインサービスは使える.", "", "Web サイトも含めオンラインのものは使える."] }
    ]
  },
  {
    id: "r3",
    kind: "広告",
    title: "Bright Clean — Office Cleaning Service",
    target: 100,
    s: [
      "Is your office too busy to stay clean?",
      "Bright Clean offers professional cleaning for offices of all sizes.",
      "Our staff can visit daily, weekly, or monthly, depending on your needs.",
      "All of our cleaning products are environmentally friendly.",
      "New customers who sign up before the end of March will receive 20 percent off their first month.",
      "Call 555-0187 or visit our Web site to request a free estimate."
    ],
    ja: "オフィスが忙しくて掃除が行き届かないなら.ブライト・クリーンはあらゆる規模のオフィスを清掃する.必要に応じて毎日・毎週・毎月の訪問が選べる.洗剤はすべて環境にやさしい.3月末までに申し込んだ新規客は初月20%引き.見積もりは無料.",
    qs: [
      { id: "r3q1", q: "What is being advertised?", c: ["A cleaning service", "A cleaning product", "Office furniture", "An office space for rent"], a: 0, ev: [1], d: 300, why: "Bright Clean offers professional cleaning for offices とある.製品ではなくサービス.", x: ["", "洗剤などの製品を売る広告ではない(掃除のサービス).", "事務用家具の広告ではない.", "貸事務所の広告ではない."] },
      { id: "r3q2", q: "How can new customers receive a discount?", c: ["By signing up before a deadline", "By using the service every day", "By visiting the Web site", "By buying cleaning products"], a: 0, ev: [4], d: 500, why: "sign up before the end of March で20%引き.「期限までに申し込む」と言い換えている.", x: ["", "毎日使うと割引になるとは書かれていない.", "Web サイトを見ると割引になるとは書かれていない.", "掃除用品を買う話は出てこない."] },
      { id: "r3q3", q: "What is suggested about Bright Clean?", c: ["It only serves large offices.", "It charges for estimates.", "It lets customers choose how often it visits.", "It has just opened."], a: 2, ev: [2], d: 600, why: "daily, weekly, or monthly, depending on your needs とあり,訪問の頻度を選べる.all sizes なので大企業だけではなく,見積もりは free.", x: ["all sizes(あらゆる大きさ)とあり,大きな事務所だけではない.", "見積もりは無料(free).", "", "開業したばかりとは書かれていない."] }
    ]
  },
  {
    id: "r4",
    kind: "求人広告",
    title: "Riverside Furniture — Sales Assistant Wanted",
    target: 110,
    s: [
      "Riverside Furniture is looking for a full-time sales assistant for its downtown store.",
      "The successful candidate will help customers choose products, process payments, and arrange deliveries.",
      "Applicants should have at least one year of experience in retail.",
      "Knowledge of interior design is helpful but not required.",
      "The position includes some weekend shifts, and all employees receive a 15 percent discount on our products.",
      "To apply, please send a résumé and a cover letter to hr@riversidefurniture.com by June 30.",
      "Interviews will be held during the first week of July."
    ],
    ja: "リバーサイド家具は中心街の店舗で働く常勤の販売アシスタントを募集している.採用者は客の商品選び,支払い処理,配送の手配を担当する.応募者には1年以上の小売経験が求められる.インテリアデザインの知識はあると役立つが必須ではない.週末勤務があり,社員は全員商品が15%引きになる.応募は6月30日までに履歴書と添え状をメールで送ること.面接は7月の第1週に行う.",
    qs: [
      { id: "r4q1", q: "What is one responsibility of the position?", c: ["Designing furniture", "Training new employees", "Arranging deliveries", "Managing the online store"], a: 2, ev: [1], d: 400, why: "仕事内容は help customers choose products, process payments, and arrange deliveries.その1つが配送の手配.", x: ["家具をデザインする仕事ではない(客の商品選びを手伝う).", "新人の研修は仕事内容に入っていない.", "", "オンラインストアの管理は仕事内容に入っていない."] },
      { id: "r4q2", q: "What is NOT required for the position?", c: ["Experience in retail", "Knowledge of interior design", "Working on some weekends", "Sending a résumé"], a: 1, ev: [2, 3, 4, 5], d: 600, why: "インテリアデザインの知識は helpful but not required(あると良いが必須ではない).小売経験・週末勤務・履歴書はどれも求められている.NOT 問題は本文にある選択肢を消していく.", x: ["小売の経験は求められている.", "", "週末の勤務は求められている.", "履歴書の提出は求められている."] },
      { id: "r4q3", q: "What is indicated about employees of Riverside Furniture?", c: ["They work only on weekdays.", "They must live downtown.", "They are interviewed in June.", "They can buy products at a lower price."], a: 3, ev: [4], d: 500, why: "all employees receive a 15 percent discount とある.「割引」を「安い値段で買える」と言い換えている.週末勤務があるので weekdays only は誤り.", x: ["週末の勤務があるので,平日だけではない.", "中心街に住む必要があるとは書かれていない.", "6月に面接するとは書かれていない.", ""] }
    ]
  },
  {
    id: "r5",
    kind: "記事",
    title: "Westbridge Daily — Business News",
    target: 110,
    s: [
      "WESTBRIDGE (May 3) — Sunny Bean, a coffee chain based in Portland, will open its first store in Westbridge next month.",
      "The new café will be located on Main Street, in the building that formerly housed Allen's Bookshop.",
      "According to company spokesperson Mark Diaz, Westbridge was chosen because of its growing number of young professionals.",
      "The café will feature a large seating area and free wireless Internet, making it a convenient place for remote work.",
      "Sunny Bean plans to hire about 20 local residents.",
      "The company also intends to open two more stores in the region within the next three years."
    ],
    ja: "ポートランドに本社を置くコーヒーチェーンのサニー・ビーンが,来月ウェストブリッジに初出店する.新しいカフェはメイン通りの,以前アレン書店が入っていた建物にできる.広報担当のマーク・ディアス氏によると,ウェストブリッジを選んだのは若い社会人が増えているからだ.店には広い客席と無料の無線インターネットがあり,リモートワークに便利な場所になる.地元住民を約20人雇う予定で,今後3年以内に地域内でさらに2店を開く計画もある.",
    qs: [
      { id: "r5q1", q: "What is the article mainly about?", c: ["The closing of a bookshop", "The opening of a new café", "A new job training program", "A change in company leadership"], a: 1, ev: [0], d: 300, why: "記事の主題は1文目にある.will open its first store in Westbridge.書店は建物の以前の入居者として出てくるだけ.", x: ["書店の閉店は,建物の前の入居者として出てくるだけ.", "", "研修制度の記事ではない.", "経営者の交代の話ではない."] },
      { id: "r5q2", q: "Why did Sunny Bean choose Westbridge?", c: ["Rent there is low.", "A bookshop invited the company.", "The company's founder lives there.", "Its number of young workers is increasing."], a: 3, ev: [2], d: 600, why: "because of its growing number of young professionals.young professionals を young workers,growing を increasing と言い換えている.", x: ["家賃が安いとは書かれていない.", "書店が招いたわけではない.", "創業者がそこに住んでいるとは書かれていない.", ""] },
      { id: "r5q3", q: "What is suggested about Sunny Bean?", c: ["It plans to expand further in the region.", "It is closing its Portland stores.", "It will sell books at its cafés.", "It will hire workers from Portland."], a: 0, ev: [5], d: 700, why: "intends to open two more stores in the region から,地域でさらに店を増やす(expand)つもりだと分かる.雇うのは local residents なので Portland の人ではない.", x: ["", "ポートランドの店を閉めるとは書かれていない.", "カフェで本を売るとは書かれていない.", "雇うのは地元の住民で,ポートランドの人ではない."] }
    ]
  },
  {
    id: "r6",
    kind: "チャット",
    title: "Text message chain — Kenji Mori and Amy Walsh",
    target: 100,
    s: [
      "Kenji Mori [10:12 A.M.]: Hi Amy. The projector in Meeting Room B isn't working, and my client presentation starts at 11:00.",
      "Amy Walsh [10:13 A.M.]: Have you tried restarting it?",
      "Kenji Mori [10:14 A.M.]: Yes, twice. The screen stays dark.",
      "Amy Walsh [10:15 A.M.]: Room C is free all morning, and its equipment was checked yesterday.",
      "Kenji Mori [10:16 A.M.]: That would work. Could you let the reception desk know so they can send my client there?",
      "Amy Walsh [10:17 A.M.]: I'm on it. I'll also ask a technician to look at the projector in Room B this afternoon."
    ],
    ja: "森:会議室 B のプロジェクターが動かない.顧客へのプレゼンが11時からなのに.ウォルシュ:再起動してみた?森:2回やった.画面が暗いまま.ウォルシュ:C 室は午前中ずっと空いていて,機器は昨日点検済み.森:それで行こう.顧客をそちらに案内してもらえるよう受付に伝えてくれる?ウォルシュ:任せて.午後に技術者に B 室のプロジェクターを見てもらうよう頼んでおく.",
    qs: [
      { id: "r6q1", q: "What problem does Mr. Mori mention?", c: ["His client is late.", "A meeting room is too small.", "Some equipment is not working.", "His presentation file is missing."], a: 2, ev: [0, 2], d: 300, why: "The projector in Meeting Room B isn't working.projector を equipment(機器)と言い換えている.", x: ["顧客が遅れているとは書かれていない.", "部屋が狭すぎるという話ではない(プロジェクターが動かない).", "", "発表のファイルがなくなったという話ではない."] },
      { id: "r6q2", q: "What does Ms. Walsh imply about Room C?", c: ["It is being repaired.", "It can be used for the presentation.", "It is reserved for the afternoon.", "It is next to the reception desk."], a: 1, ev: [3], d: 600, why: "空いていて機器も点検済みだと伝えている.つまり C 室をプレゼンに使えるということ.森さんも That would work と応じている.", x: ["修理中なのは B 室のプロジェクター.C 室ではない.", "", "C 室が午後に予約されているとは書かれていない(空いている).", "受付の隣かどうかは書かれていない."] },
      { id: "r6q3", q: "At 10:17 A.M., what does Ms. Walsh most likely mean when she writes, \"I'm on it\"?", c: ["She is in Room C now.", "She will contact the reception desk.", "She will give the presentation herself.", "She is checking the projector now."], a: 1, ev: [4, 5], d: 800, why: "意図問題は直前の発言を見る.森さんの「受付に伝えてくれる?」への返事なので「(受付への連絡を)引き受ける」.プロジェクターは午後に技術者が見るので,今調べているわけではない.", x: ["C 室に今いるという意味ではない.", "", "自分で発表するという意味ではない.", "プロジェクターは午後に技術者が見るので,今調べているわけではない."] }
    ]
  },
  {
    id: "r7",
    kind: "社内メモ",
    title: "MEMO — To: All employees / From: Accounting Department / Re: New expense reporting system",
    target: 120,
    s: [
      "Starting October 1, all travel expenses must be reported through our new online system, ExpensePro.",
      "Paper forms will no longer be accepted after that date.",
      "To submit a report, simply upload photos of your receipts and select the related project.",
      "Reports must be submitted within 14 days of the end of each trip.",
      "Your supervisor will receive an automatic notice and approve the report online.",
      "Training sessions on how to use ExpensePro will be held on September 24 and 26 in the main conference room.",
      "Employees who cannot attend either session may watch a recorded version on the company intranet."
    ],
    ja: "10月1日から,出張費はすべて新しいオンラインシステム ExpensePro で報告すること.その日以降,紙の用紙は受け付けない.報告は領収書の写真をアップロードし,関連する案件を選ぶだけでよい.報告は出張終了から14日以内に提出すること.上司に自動で通知が届き,オンラインで承認される.使い方の研修を9月24日と26日に大会議室で行う.どちらにも出られない社員は社内サイトで録画を見てよい.",
    qs: [
      { id: "r7q1", q: "What is the purpose of the memo?", c: ["To introduce a new accounting manager", "To request receipts for a past trip", "To explain a new travel policy for managers", "To announce a change in a procedure"], a: 3, ev: [0, 1], d: 400, why: "経費報告を紙からオンラインシステムに切り替える,という手続きの変更を知らせている.", x: ["新しい経理部長の紹介ではない.", "過去の出張の領収書を求めるメモではない.", "管理職向けの出張の規則の説明ではない.", ""] },
      { id: "r7q2", q: "According to the memo, what must employees do within 14 days of a trip?", c: ["Submit an expense report", "Attend a training session", "Get a supervisor's signature on paper", "Return unused travel funds"], a: 0, ev: [3], d: 400, why: "Reports must be submitted within 14 days of the end of each trip.設問の within 14 days が本文を探す手がかりになる.", x: ["", "研修は出張の後14日以内に受けるものではない.", "紙の書類に上司の署名をもらう方法は,今回やめる手続き.", "使わなかった出張費を返す話は出てこない."] },
      { id: "r7q3", q: "What is indicated about the training sessions?", c: ["They are only for supervisors.", "They will be held online.", "A recording will be available for those who miss them.", "They will take place after October 1."], a: 2, ev: [5, 6], d: 700, why: "出られない人は recorded version を見てよい.研修自体は大会議室で,日付は9月なので October 1 より前.", x: ["研修は上司だけでなく全社員向け.", "研修は大会議室で行い,オンラインではない(録画は見られる).", "", "研修は9月で,10月1日より前に行う."] }
    ]
  },
  {
    id: "r8",
    kind: "レビュー",
    title: "Customer Review — Harbor View Hotel ★★★★☆",
    target: 110,
    s: [
      "I stayed at the Harbor View Hotel for three nights during a business trip in March.",
      "The location was excellent, just a five-minute walk from the convention center.",
      "My room was clean and quiet, and the staff at the front desk were very helpful.",
      "However, the fitness center was closed for repairs during my entire stay, which was disappointing because it was one of the reasons I chose this hotel.",
      "When I mentioned this at checkout, the manager apologized and offered me a voucher for a free breakfast on my next visit.",
      "I would definitely stay here again.",
      "— Daniel Ortiz"
    ],
    ja: "3月の出張でハーバービュー・ホテルに3泊した.立地は最高で,会議場まで歩いて5分.部屋は清潔で静かで,フロントの人もとても親切だった.ただ,滞在中ずっとジムが修理で閉まっていたのは残念だった.このホテルを選んだ理由の1つだったからだ.チェックアウト時にそれを伝えると,支配人が謝り,次回の無料朝食券をくれた.ぜひまた泊まりたい.",
    qs: [
      { id: "r8q1", q: "Why was Mr. Ortiz in the city?", c: ["For work", "For a vacation", "To visit family", "To attend a sports event"], a: 0, ev: [0], d: 300, why: "during a business trip とある.business trip を for work と言い換えている.", x: ["", "休暇ではなく出張(business trip).", "家族を訪ねたとは書かれていない.", "スポーツの催しに行ったとは書かれていない."] },
      { id: "r8q2", q: "What did Mr. Ortiz dislike about the hotel?", c: ["A facility was not available.", "His room was noisy.", "It was far from the convention center.", "The front desk staff were unfriendly."], a: 0, ev: [3], d: 500, why: "However の後が不満点.fitness center が閉まっていた.fitness center を facility(施設)と言い換えている.部屋は quiet で,フロントは helpful.", x: ["", "部屋は静か(quiet)だったと書いている.", "会議場から遠いとは書かれていない.", "フロントの人は親切(helpful)だったと書いている."] },
      { id: "r8q3", q: "What did the manager give Mr. Ortiz?", c: ["A refund for one night", "A room upgrade", "A coupon for a meal", "A free fitness class"], a: 2, ev: [4], d: 600, why: "a voucher for a free breakfast.voucher を coupon,breakfast を meal と言い換えている.", x: ["1泊分の返金ではない.", "部屋の格上げではない.", "", "無料の運動の講座ではない(朝食の券)."] }
    ]
  },
  {
    id: "r9",
    kind: "手紙",
    title: "Letter — Greenway Office Supplies",
    target: 130,
    s: [
      "Dear Ms. Tanaka,",
      "Thank you for being a valued customer of Greenway Office Supplies for the past five years.",
      "We are writing to inform you that your current supply contract will expire on December 31.",
      "To continue receiving deliveries without interruption, please sign and return the enclosed renewal form by December 1.",
      "Please note that, due to rising transportation costs, delivery fees will increase by 5 percent starting next year.",
      "However, customers who renew for two years instead of one will not be affected by this increase.",
      "If you have any questions about the new terms, please contact your account manager, Brian Hughes, at 555-0142.",
      "Sincerely,",
      "Olivia Grant, Customer Relations"
    ],
    ja: "田中様.5年間グリーンウェイ事務用品をご利用いただきありがとうございます.現在の供給契約は12月31日で満了します.配達を途切れなく続けるには,同封の更新用紙に署名して12月1日までにご返送ください.なお,輸送費の上昇により,来年から配送料が5%上がります.ただし,1年ではなく2年で更新されるお客様は値上げの対象になりません.新しい条件についてのご質問は担当のブライアン・ヒューズ(555-0142)までどうぞ.",
    qs: [
      { id: "r9q1", q: "Why was the letter sent to Ms. Tanaka?", c: ["To thank her for a recent large order", "To introduce a new account manager", "To remind her that a contract is ending", "To apologize for a late delivery"], a: 2, ev: [2, 3], d: 500, why: "your current supply contract will expire(契約が満了する)と知らせ,更新を求めている.1文目のお礼はあいさつで,目的ではない.", x: ["1文目の注文へのお礼はあいさつで,手紙の目的ではない.", "新しい担当者の紹介ではない.", "", "配達が遅れたことのおわびではない."] },
      { id: "r9q2", q: "What is suggested about delivery fees?", c: ["They will be reduced next year.", "They were raised five years ago.", "They are included in product prices.", "They will not change for some customers."], a: 3, ev: [4, 5], d: 900, why: "来年から5%上がるが,2年で更新する客は影響を受けない.つまり「一部の客にとっては変わらない」.2文を組み合わせて答える問題.", x: ["来年は下がるのではなく5%上がる.", "5年前に上がったとは書かれていない.", "製品の値段に含まれているとは書かれていない.", ""] },
      { id: "r9q3", q: "What is Ms. Tanaka asked to do by December 1?", c: ["Call Mr. Hughes", "Pay an overdue fee", "Send back a document", "Place a new order"], a: 2, ev: [3], d: 600, why: "sign and return the enclosed renewal form by December 1.return the form を send back a document と言い換えている.電話は質問があるときだけ.", x: ["電話するのは質問があるときだけで,12月1日までの依頼ではない.", "延滞料を払う話は出てこない.", "", "新しい注文を出すようには求められていない(契約の更新)."] }
    ]
  },
  {
    id: "r10",
    kind: "メール",
    title: "From: IT Support / To: All staff / Subject: Scheduled maintenance",
    target: 100,
    s: [
      "Please be advised that our e-mail system will be unavailable on Sunday, June 9, from 1:00 A.M. to 5:00 A.M.",
      "During this time, our technicians will install security updates on the main server.",
      "Messages sent to you during the maintenance period will be delivered once the system is back online.",
      "We recommend that you save any open documents and log out of your computer before leaving the office on Friday.",
      "If you experience any problems after the maintenance, please submit a request through the IT help page rather than calling the help desk directly.",
      "Thank you for your cooperation."
    ],
    ja: "6月9日(日)午前1時から5時まで,メールシステムが使えなくなる.この間,技術者がメインサーバーにセキュリティ更新を入れる.作業中に届いたメッセージは,システムの復旧後に配信される.金曜日の退社前に,開いている書類を保存してログアウトしておくこと.作業後に問題があれば,ヘルプデスクに電話せず IT ヘルプページから依頼を出すこと.",
    qs: [
      { id: "r10q1", q: "What is the purpose of the e-mail?", c: ["To announce a new e-mail address", "To introduce new technicians", "To request feedback on a server", "To notify staff of a temporary service interruption"], a: 3, ev: [0], d: 400, why: "冒頭で,メールシステムが一時的に使えなくなることを知らせている.unavailable ... from 1:00 A.M. to 5:00 A.M. を temporary service interruption と言い換えている.", x: ["新しいメールアドレスの知らせではない.", "新しい技術者の紹介ではない.", "サーバーについて意見を求めるメールではない.", ""] },
      { id: "r10q2", q: "What will happen to messages sent during the maintenance?", c: ["They will be deleted.", "They will be returned to the sender.", "They will arrive after the work is finished.", "They will be checked by technicians."], a: 2, ev: [2], d: 500, why: "will be delivered once the system is back online(復旧したら配信される).「作業が終わった後に届く」と言い換えている.", x: ["消えるとは書かれていない(復旧後に届く).", "送り主に戻るとは書かれていない.", "", "技術者が中身を確認するとは書かれていない."] },
      { id: "r10q3", q: "What are employees asked to do if they have problems?", c: ["Call the help desk", "Use an online request form", "Restart their computers", "Contact their managers"], a: 1, ev: [4], d: 600, why: "submit a request through the IT help page rather than calling the help desk.電話ではなく Web ページから依頼する.Call the help desk は本文で否定されている引っかけ.", x: ["ヘルプデスクには電話せず(rather than calling),Web から依頼するよう求めている.", "", "パソコンを再起動するようには書かれていない.", "上司に連絡するようには書かれていない."] }
    ]
  },
  {
    id: "r11",
    kind: "記事",
    title: "Business Today — Harlow Foods to Merge with Pine Valley Farms",
    target: 140,
    s: [
      "Harlow Foods, a leading producer of frozen meals, announced on Tuesday that it will merge with Pine Valley Farms, a regional supplier of organic vegetables.",
      "The merger, expected to be completed by the end of the year, will allow Harlow to use fresh ingredients grown on Pine Valley's farms.",
      "Harlow's CEO, Rachel Moore, said that customers have been asking for healthier options in recent years.",
      "\"Combining our strengths will help us meet that demand,\" she explained.",
      "Pine Valley's founder, Tom Becker, will join Harlow's board of directors.",
      "However, Pine Valley products will continue to be sold under their own brand name.",
      "Industry analysts expect the combined company to become one of the largest food producers in the region."
    ],
    ja: "冷凍食品大手のハーロウ・フーズは火曜日,地域の有機野菜業者パインバレー・ファームズと合併すると発表した.年末までに完了する見込みの合併により,ハーロウはパインバレーの農場で育った新鮮な食材を使えるようになる.ハーロウのムーア CEO は,ここ数年,客からより健康的な商品を求める声があると述べ,「互いの強みを合わせれば,その需要に応えられる」と説明した.パインバレー創業者のベッカー氏はハーロウの取締役に加わる.ただし,パインバレーの商品は引き続き自社ブランド名で販売される.業界の専門家は,合併後の会社が地域最大級の食品メーカーになると見ている.",
    qs: [
      { id: "r11q1", q: "What does Harlow Foods mainly produce?", c: ["Organic vegetables", "Kitchen equipment", "Restaurant menus", "Frozen meals"], a: 3, ev: [0], d: 400, why: "a leading producer of frozen meals とある.有機野菜はパインバレーの方なので引っかけ.", x: ["有機野菜を作るのは合併相手のパインバレーの方.", "台所用品を作るとは書かれていない.", "飲食店のメニューを作るとは書かれていない.", ""] },
      { id: "r11q2", q: "Why most likely is Harlow Foods merging with Pine Valley Farms?", c: ["To respond to customer interest in healthier food", "To reduce the number of employees", "To sell its products under a new name", "To move its headquarters to a farm"], a: 0, ev: [1, 2, 3], d: 900, why: "客が健康的な商品を求めている → 合わせた強みでその需要に応える,という流れ.複数の文をつないで目的を推測する.", x: ["", "社員を減らすためとは書かれていない.", "新しい名前で売るのではない(パインバレーの商品は自社ブランド名のまま).", "本社を農場に移すとは書かれていない."] },
      { id: "r11q3", q: "What is indicated about Pine Valley Farms?", c: ["It will stop selling vegetables.", "Its founder will leave the company.", "Its brand name will remain in use.", "It is the largest food producer in the region."], a: 2, ev: [4, 5], d: 800, why: "will continue to be sold under their own brand name.ブランド名は使われ続ける.創業者は取締役に加わるので,去るわけではない.", x: ["野菜の販売をやめるとは書かれていない.", "創業者はハーロウの取締役に加わるので,去るわけではない.", "", "地域最大級になると見込まれているのは合併後の会社."] }
    ]
  },
  {
    id: "r12",
    kind: "チラシ",
    title: "Lakeside Community Center — Spring Workshops",
    target: 110,
    s: [
      "Lakeside Community Center is pleased to offer three workshops this spring.",
      "Introduction to Photography meets on Mondays from 6:00 to 8:00 P.M. and costs $40.",
      "Basic Spanish meets on Wednesdays from 7:00 to 8:30 P.M. and costs $35.",
      "Healthy Cooking meets on Saturdays from 10:00 A.M. to noon and costs $50, including all ingredients.",
      "Each workshop runs for six weeks, beginning the week of April 7.",
      "Community center members receive a 10 percent discount on all fees.",
      "Space is limited, so please register early at the front desk or on our Web site."
    ],
    ja: "レイクサイド・コミュニティセンターでは,この春3つの講座を開く.写真入門は月曜午後6〜8時で40ドル.スペイン語基礎は水曜午後7〜8時半で35ドル.健康料理は土曜午前10時〜正午で50ドル(材料費込み).どの講座も4月7日の週から6週間.センター会員は受講料が10%引き.定員があるので,受付か Web サイトで早めに申し込むこと.",
    qs: [
      { id: "r12q1", q: "Which workshop is held on the weekend?", c: ["Introduction to Photography", "Basic Spanish", "A computer course", "Healthy Cooking"], a: 3, ev: [3], d: 300, why: "Healthy Cooking meets on Saturdays.土曜日は週末.", x: ["写真入門は月曜(平日).", "スペイン語基礎は水曜(平日).", "パソコンの講座は案内されていない.", ""] },
      { id: "r12q2", q: "What is included in the fee for the cooking workshop?", c: ["A cookbook", "Ingredients", "A membership", "Lunch with the instructor"], a: 1, ev: [3], d: 500, why: "costs $50, including all ingredients.材料費が含まれている.", x: ["料理の本が含まれるとは書かれていない.", "", "会員資格は含まれない(会員は割引になるだけ).", "講師との昼食は書かれていない."] },
      { id: "r12q3", q: "What is suggested about the workshops?", c: ["They may fill up quickly.", "They are free for members.", "They are taught online.", "They last for three months."], a: 0, ev: [6], d: 600, why: "Space is limited, so please register early から,すぐ満員になるかもしれないと分かる.会員は無料ではなく10%引き,期間は6週間.", x: ["", "会員は無料ではなく10%引き.", "講座は教室で行い,オンラインではない.", "期間は6週間で,3か月ではない."] }
    ]
  },
  {
    id: "r13",
    kind: "チャット",
    title: "Online chat — Office party planning",
    target: 110,
    s: [
      "Sara Lin [2:01 P.M.]: The caterer just called. They can't deliver the food for Friday's party until 7:00.",
      "Greg Holt [2:02 P.M.]: But the party starts at 6:00. That's too late.",
      "Nina Patel [2:03 P.M.]: What about Bella's Kitchen? They delivered our lunch for the client meeting last month.",
      "Sara Lin [2:04 P.M.]: Good idea. Their food was excellent, and they were right on time.",
      "Greg Holt [2:05 P.M.]: Their prices are a bit higher, though. Is that OK with our budget?",
      "Nina Patel [2:06 P.M.]: We have some money left over from the spring event, so it should be fine.",
      "Sara Lin [2:07 P.M.]: Great. I'll cancel the first order and call Bella's Kitchen now."
    ],
    ja: "リン:仕出し業者から電話があって,金曜のパーティーの料理は7時まで届けられないって.ホルト:でもパーティーは6時開始だ.遅すぎる.パテル:ベラズ・キッチンはどう?先月の顧客との会議の昼食を届けてくれた.リン:いいね.料理はおいしかったし時間ぴったりだった.ホルト:でも少し高いよ.予算は大丈夫?パテル:春の催しのお金が少し残っているから,大丈夫なはず.リン:よかった.最初の注文を取り消して,今ベラズ・キッチンに電話する.",
    qs: [
      { id: "r13q1", q: "What problem does Ms. Lin report?", c: ["A party has been canceled.", "The office is not available on Friday.", "A delivery will arrive too late.", "A client meeting was moved."], a: 2, ev: [0, 1], d: 300, why: "料理が7時まで届かないが,パーティーは6時開始.配達が遅すぎるのが問題.", x: ["パーティーが中止になったわけではない.", "金曜日に事務所が使えないという話ではない.", "", "顧客との会議が動いた話ではない."] },
      { id: "r13q2", q: "What is suggested about Bella's Kitchen?", c: ["It has worked with the company before.", "It is cheaper than the first caterer.", "It is located near the office.", "It is closed on Fridays."], a: 0, ev: [2, 3, 4], d: 600, why: "先月の会議の昼食を届けてくれた,とあるので以前に取引がある.値段は a bit higher なので安くはない.", x: ["", "値段は少し高い(a bit higher)と書かれている.", "事務所の近くにあるとは書かれていない.", "金曜日が休みとは書かれていない(届けられる)."] },
      { id: "r13q3", q: "At 2:06 P.M., what does Ms. Patel imply when she writes, \"it should be fine\"?", c: ["The party can start later.", "The food will be delivered on time.", "The higher cost can be covered.", "The first caterer will lower its price."], a: 2, ev: [4, 5], d: 800, why: "直前のホルトさんの「高いけど予算は大丈夫?」への返事.残っているお金があるので,高い分も払える,という意味.", x: ["パーティーを遅らせる話ではない.", "最初の業者の配達は間に合わないままで,時間どおりに届くという意味ではない.", "", "最初の業者が値下げするという話ではない."] }
    ]
  },
  {
    id: "r14",
    kind: "Web ページ",
    title: "Nordic Home — Return Policy",
    target: 120,
    s: [
      "Items purchased from Nordic Home may be returned within 60 days of delivery for a full refund.",
      "Products must be unused and in their original packaging.",
      "Furniture that has been assembled cannot be returned unless it arrived damaged.",
      "To start a return, log in to your account and select the item from your order history.",
      "We will e-mail you a prepaid shipping label within two business days.",
      "Refunds are issued to the original payment method once the item reaches our warehouse.",
      "Please note that customized items, such as made-to-order curtains, are not eligible for return."
    ],
    ja: "ノルディック・ホームで買った商品は,配達から60日以内なら全額返金で返品できる.商品は未使用で元の梱包のままであること.組み立てた家具は,届いた時点で破損していた場合を除き返品できない.返品はアカウントにログインし,注文履歴から商品を選んで始める.2営業日以内に送料支払済みの配送ラベルをメールで送る.返金は商品が倉庫に届いた時点で,元の支払方法に対して行う.なお,オーダーカーテンなどの特注品は返品できない.",
    qs: [
      { id: "r14q1", q: "How long do customers have to return an item?", c: ["Two business days", "14 days", "30 days", "60 days"], a: 3, ev: [0], d: 300, why: "within 60 days of delivery.2営業日は配送ラベルが届くまでの日数なので引っかけ.", x: ["2営業日は,返品用のラベルが届くまでの日数.", "14日という期限は書かれていない.", "30日という期限は書かれていない.", ""] },
      { id: "r14q2", q: "Which item can most likely be returned?", c: ["A bookshelf that was damaged when it arrived", "Curtains made to a customer's measurements", "A lamp that has been used for a month", "A table without its original box"], a: 0, ev: [1, 2, 6], d: 900, why: "組み立てた家具でも「届いたときに破損していた」なら返品できる(unless it arrived damaged).特注カーテン・使用済み・箱なしはどれも条件に合わない.", x: ["", "客の寸法に合わせた特注のカーテンは返品できない.", "1か月使ったものは未使用の条件に合わない.", "元の箱がないものは条件に合わない."] },
      { id: "r14q3", q: "According to the Web page, when will a refund be given?", c: ["When the customer calls the store", "When the shipping label is printed", "Two days after the order", "After the returned item arrives at the warehouse"], a: 3, ev: [5], d: 600, why: "Refunds are issued ... once the item reaches our warehouse.倉庫に届いてから返金される.", x: ["店に電話したときではない.", "配送のラベルを印刷したときではない.", "注文の2日後ではない.", ""] }
    ]
  },
  {
    id: "r15",
    kind: "メール",
    title: "From: Diane Cole / To: Marcus Reed / Subject: Interview",
    target: 100,
    s: [
      "Dear Mr. Reed,",
      "Thank you for applying for the position of graphic designer at Brightline Media.",
      "We were impressed by your portfolio and would like to invite you for an interview at our office.",
      "Would you be available on Thursday, October 3, at 10:00 A.M.?",
      "The interview will last about an hour and will include a short design test, so please bring your own laptop.",
      "If this time is not convenient, please suggest two or three other times next week.",
      "I look forward to hearing from you.",
      "Diane Cole, Human Resources Manager"
    ],
    ja: "リード様.ブライトライン・メディアのグラフィックデザイナー職へのご応募ありがとうございます.作品集に感銘を受けたので,当社での面接にお招きしたいと思います.10月3日(木)午前10時はご都合いかがでしょうか.面接は約1時間で,短いデザインの試験があるので,ご自分のノートパソコンをお持ちください.この時間のご都合が悪ければ,来週の別の時間を2〜3つご提案ください.",
    qs: [
      { id: "r15q1", q: "Why did Ms. Cole write to Mr. Reed?", c: ["To offer him a job", "To ask for his portfolio", "To schedule an interview", "To cancel a meeting"], a: 2, ev: [2, 3], d: 300, why: "面接に招き,日時の都合を尋ねている.採用(job offer)はまだ決まっていない.", x: ["採用を申し出る手紙ではない(まだ面接の段階).", "作品集はすでに見てもらっているので,求めてはいない.", "", "会議を取り消す手紙ではない."] },
      { id: "r15q2", q: "What is Mr. Reed asked to bring?", c: ["A computer", "A printed résumé", "Letters of reference", "His portfolio"], a: 0, ev: [4], d: 400, why: "please bring your own laptop.laptop を computer と言い換えている.作品集はすでに見てもらっている.", x: ["", "印刷した履歴書を持ってくるようには書かれていない.", "推薦状を持ってくるようには書かれていない.", "作品集はすでに見てもらっている."] },
      { id: "r15q3", q: "What is Mr. Reed asked to do if he cannot come on October 3?", c: ["Call Ms. Cole's assistant", "Send his design test by e-mail", "Apply for a different position", "Propose alternative times"], a: 3, ev: [5], d: 500, why: "please suggest two or three other times.suggest other times を propose alternative times と言い換えている.", x: ["助手に電話するようには書かれていない.", "デザインの試験をメールで送るようには書かれていない.", "別の職に応募するようには書かれていない.", ""] }
    ]
  },
  {
    id: "r16",
    kind: "お知らせ",
    title: "City of Fairview — Notice to Residents",
    target: 100,
    s: [
      "Beginning Monday, August 5, Elm Street between First Avenue and Third Avenue will be closed for road repairs.",
      "The work is expected to last three weeks.",
      "During this period, drivers should use Oak Street as a detour.",
      "Bus Route 12 will also be changed temporarily, and the stops on Elm Street will not be in service.",
      "Residents who live on the closed section of Elm Street will still be able to reach their homes by car.",
      "The city apologizes for any inconvenience and thanks residents for their patience.",
      "Updates will be posted on the city's Web site."
    ],
    ja: "8月5日(月)から,エルム通りの1番街〜3番街の区間が道路補修のため通行止めになる.工事は3週間の予定.この間,車はオーク通りへ迂回すること.12番のバスも一時的に経路が変わり,エルム通りの停留所は使えない.通行止め区間に住む住民は,引き続き車で自宅まで行ける.最新情報は市の Web サイトに載せる.",
    qs: [
      { id: "r16q1", q: "What is the notice mainly about?", c: ["A new bus route", "A change in parking fees", "A community event", "A street closure"], a: 3, ev: [0], d: 300, why: "1文目が主題.Elm Street ... will be closed for road repairs.バスの経路変更は通行止めに伴う一部の話.", x: ["バスの経路の変更は,通行止めに伴う一部の話.", "駐車料金の変更の話ではない.", "地域の催しの知らせではない.", ""] },
      { id: "r16q2", q: "What are drivers advised to do?", c: ["Use a different street", "Park on First Avenue", "Take Bus Route 12", "Drive only at night"], a: 0, ev: [2], d: 400, why: "drivers should use Oak Street as a detour.Oak Street を a different street と言い換えている.", x: ["", "First Avenue に駐車するようには書かれていない.", "12番のバスに乗るようには書かれていない.", "夜だけ運転するようには書かれていない."] },
      { id: "r16q3", q: "What is indicated about residents of Elm Street?", c: ["They must move out temporarily.", "They will receive bus passes.", "They can still drive to their homes.", "They should contact the city by phone."], a: 2, ev: [4], d: 600, why: "will still be able to reach their homes by car.通行止め区間の住民も車で家まで行ける.", x: ["一時的に引っ越す必要はない.", "バスの定期券がもらえるとは書かれていない.", "", "電話で市に連絡するようには書かれていない."] }
    ]
  },
  {
    id: "r17",
    kind: "記事",
    title: "Regional News — Kessler Electronics Expands",
    target: 130,
    s: [
      "Kessler Electronics announced last week that it will expand its manufacturing plant in Dalton.",
      "The project, which will cost an estimated $30 million, will add a new production line for electric vehicle batteries.",
      "Company officials said the expansion will create about 150 jobs over the next two years.",
      "Most of the new positions will be for technicians, and Kessler plans to cover the cost of training for workers without previous experience.",
      "The company chose to expand in Dalton rather than build a new factory overseas, citing the area's skilled workforce and its close relationship with local colleges.",
      "Construction is scheduled to begin in March, pending approval from the city council."
    ],
    ja: "ケスラー電子は先週,ダルトンの製造工場を拡張すると発表した.費用は推定3,000万ドルで,電気自動車用電池の生産ラインを新設する.会社によると,拡張で今後2年間に約150人の雇用が生まれる.新しい職の多くは技術者で,経験のない人の研修費は会社が負担する予定だ.海外に新工場を建てるのではなくダルトンで拡張する理由として,地域の熟練した労働力と地元大学との密接な関係を挙げた.工事は市議会の承認を待って3月に始まる予定だ.",
    qs: [
      { id: "r17q1", q: "What will the new production line make?", c: ["Batteries", "Electric vehicles", "Computer parts", "Training equipment"], a: 0, ev: [1], d: 500, why: "a new production line for electric vehicle batteries.作るのは電気自動車そのものではなく電池.", x: ["", "作るのは電気自動車そのものではなく,その電池.", "コンピュータの部品ではない.", "研修の機器ではない."] },
      { id: "r17q2", q: "The word \"cover\" in the fourth sentence is closest in meaning to", c: ["protect", "report on", "pay for", "hide"], a: 2, ev: [3], d: 1100, why: "cover the cost of training で「研修の費用を負担する」.cost と組むので pay for.語彙問題は,その文の中で置き換えて意味が通るものを選ぶ.", x: ["protect(守る)では「研修の費用を守る」になり,意味が通らない.", "report on(報道する)では意味が通らない.", "", "hide(隠す)では意味が通らない."] },
      { id: "r17q3", q: "What is suggested about the expansion?", c: ["It has already been completed.", "It will take place overseas.", "It will reduce the number of jobs.", "It still needs official permission."], a: 3, ev: [5], d: 1000, why: "pending approval from the city council(市議会の承認待ち)から,まだ正式な許可が必要だと分かる.pending の意味が鍵.", x: ["まだ完了していない(承認待ち).", "海外で行うとは書かれていない.", "仕事が減るのではなく,雇用が増える.", ""] }
    ]
  },
  {
    id: "r18",
    kind: "メール",
    title: "From: Paul Ingram / To: Customer Service / Subject: Invoice #4471",
    target: 130,
    s: [
      "Dear Customer Service,",
      "I am writing about invoice #4471, which I received yesterday for my order of office chairs.",
      "I ordered twelve chairs at $85 each, but the invoice lists fifteen chairs.",
      "Only twelve chairs were delivered, and I have confirmed this with our receiving department.",
      "In addition, the 10 percent discount for orders over $1,000 was not applied.",
      "Could you please send me a corrected invoice?",
      "I would like to pay the full amount before the end of the month.",
      "Sincerely, Paul Ingram, Office Manager, Wexford Accounting"
    ],
    ja: "昨日受け取った事務用椅子の請求書 #4471 についてご連絡します.1脚85ドルの椅子を12脚注文しましたが,請求書には15脚と書かれています.届いたのは12脚だけで,受け取り部署にも確認しました.また,1,000ドルを超える注文に適用される10%割引が反映されていません.訂正した請求書を送っていただけますか.月末までに全額を支払いたいと思います.",
    qs: [
      { id: "r18q1", q: "Why did Mr. Ingram write the e-mail?", c: ["To order more chairs", "To complain about a late delivery", "To report errors on a bill", "To cancel an order"], a: 2, ev: [1, 2, 4], d: 400, why: "脚数の誤りと割引の未反映,という請求書(bill)の誤りを伝えている.invoice を bill と言い換えている.", x: ["いすを追加で注文するメールではない.", "配達の遅れへの苦情ではない.", "", "注文を取り消すメールではない."] },
      { id: "r18q2", q: "How many chairs did Wexford Accounting receive?", c: ["10", "12", "15", "85"], a: 1, ev: [3], d: 500, why: "Only twelve chairs were delivered.15は請求書の誤った数,85は1脚の値段.", x: ["10脚という数は出てこない.", "", "15は請求書に書かれた誤った数.", "85は1脚の値段."] },
      { id: "r18q3", q: "What can be inferred about the order?", c: ["Its total was more than $1,000.", "It was delivered to the wrong office.", "It included desks as well as chairs.", "It was paid for in advance."], a: 0, ev: [2, 4], d: 1100, why: "85ドル × 12脚 = 1,020ドルで1,000ドルを超えるので,割引の対象になる.だからイングラムさんは割引がないことを指摘している.数字を組み合わせて推論する問題.", x: ["", "違う事務所に届いたとは書かれていない.", "机も含まれていたとは書かれていない.", "前払いしたとは書かれていない."] }
    ]
  },

  // ---- ここから図表つきの長文(表は { t: "table" },グラフは { t: "bar" }.根拠 ev で行を指すときは [添字, 行]) ----
  {
    id: "r19",
    kind: "予定表",
    title: "Pacific Marketing Forum — Day 1 Schedule",
    target: 120,
    s: [
      "Welcome to the Pacific Marketing Forum.",
      "Please check the schedule below and arrive at each room at least five minutes before the session begins.",
      { t: "table", head: ["Time", "Session", "Room", "Speaker"], rows: [
        ["9:00 A.M.", "Opening remarks", "Main Hall", "Helen Ortiz"],
        ["10:00 A.M.", "Social media advertising", "Room A", "David Chen"],
        ["11:30 A.M.", "Understanding customer data", "Room B", "Priya Nair"],
        ["1:30 P.M.", "Building a brand on a small budget", "Room A", "Marco Bell"],
        ["3:00 P.M.", "Panel discussion", "Main Hall", "All speakers"]
      ] },
      "Lunch will be served in the lobby from 12:30 to 1:30 P.M. and is included in the registration fee.",
      "Please note that the 11:30 session has been moved from Room C because of a problem with the projector.",
      "Slides from all sessions will be available on our Web site after the event."
    ],
    ja: "パシフィック・マーケティング・フォーラムへようこそ.下の予定表を確認し,各セッションの開始5分前までに部屋へ.[表:9時 開会のあいさつ(メインホール),10時 SNS広告(A室),11時半 顧客データの理解(B室),1時半 少ない予算でのブランド作り(A室),3時 パネル討論(メインホール)] 昼食は12時半〜1時半にロビーで出され,参加費に含まれる.11時半のセッションはプロジェクターの不具合のため C 室から変更になった.全セッションのスライドは終了後に Web サイトで見られる.",
    qs: [
      { id: "r19q1", q: "Who will speak about advertising on social media?", c: ["Helen Ortiz", "David Chen", "Priya Nair", "Marco Bell"], a: 1, ev: [[2, 1]], d: 300, why: "表の Session の列から Social media advertising の行を探し,同じ行の Speaker を読む.表の問題は「行を見つけて横に読む」.", x: ["オルティス氏は開会のあいさつ.", "", "ナイア氏は顧客データのセッション.", "ベル氏は少ない予算でのブランド作りのセッション."] },
      { id: "r19q2", q: "Where will the session on customer data be held?", c: ["Main Hall", "Room A", "Room B", "Room C"], a: 2, ev: [[2, 2], 4], d: 500, why: "表では Room B.本文の has been moved from Room C は「C 室から移った」なので,Room C は元の部屋で引っかけ.", x: ["メインホールは開会のあいさつとパネル討論の会場.", "A 室は SNS 広告とブランド作りのセッションの会場.", "", "C 室は元の部屋で,プロジェクターの不具合で B 室に移った."] },
      { id: "r19q3", q: "What is indicated about lunch?", c: ["It costs extra.", "It will be served in Room A.", "It begins at noon.", "Attendees do not have to pay for it separately."], a: 3, ev: [3], d: 700, why: "is included in the registration fee(参加費に含まれる)を「別に払わなくてよい」と言い換えている.開始は12時半で noon(正午)ではない.", x: ["参加費に含まれるので,追加料金はかからない.", "昼食はロビーで出される.", "始まるのは12時半で,正午ではない.", ""] }
    ]
  },
  {
    id: "r20",
    kind: "請求書",
    title: "Invoice — Maple Office Supplies",
    target: 130,
    s: [
      "Invoice No. 2087 / Date: March 3",
      "Bill to: Dalton Design Studio, 45 Pine Street",
      { t: "table", head: ["Item", "Quantity", "Unit price", "Total"], rows: [
        ["Copy paper (box)", "10", "$25.00", "$250.00"],
        ["Ink cartridge (black)", "4", "$30.00", "$120.00"],
        ["Desk lamp", "2", "$40.00", "$80.00"],
        ["Delivery charge", "-", "-", "$0.00"],
        ["Amount due", "", "", "$450.00"]
      ] },
      "Delivery is free for orders over $300.",
      "Payment is due within 30 days of the invoice date.",
      "A late fee of 5 percent will be added to payments received after the due date.",
      "If you find an error on this invoice, please call our accounting team at 555-0142."
    ],
    ja: "請求書番号2087,日付3月3日.請求先:ダルトン・デザイン・スタジオ.[表:コピー用紙10箱 250ドル,黒インク4個 120ドル,デスクライト2台 80ドル,配送料 0ドル,請求額 450ドル] 300ドルを超える注文は配送無料.支払期限は請求日から30日以内.期限を過ぎた支払いには5%の延滞料が加算される.請求書に誤りがあれば経理(555-0142)まで.",
    qs: [
      { id: "r20q1", q: "How many ink cartridges were ordered?", c: ["2", "4", "10", "30"], a: 1, ev: [[2, 1]], d: 300, why: "Ink cartridge の行の Quantity(数量)は 4.30 は単価(Unit price)の数字なので引っかけ.", x: ["2はデスクライトの数量.", "", "10はコピー用紙の数量.", "30はインクの単価."] },
      { id: "r20q2", q: "Why was Dalton Design Studio not charged for delivery?", c: ["It picked up the items at the store.", "It is a new customer.", "It paid in advance.", "Its order was large enough."], a: 3, ev: [[2, 4], 3], d: 700, why: "Delivery is free for orders over $300 とあり,請求額は 450 ドル.表の数字と本文の条件を組み合わせて答える.", x: ["店で受け取ったとは書かれていない.", "新しい客だとは書かれていない.", "前払いしたとは書かれていない.", ""] },
      { id: "r20q3", q: "What will happen if payment is made in May?", c: ["An additional charge will apply.", "The order will be canceled.", "A discount will be given.", "The items must be returned."], a: 0, ev: [0, 4, 5], d: 900, why: "請求日は3月3日で,期限は30日以内(4月初め).5月の支払いは期限後なので,5% の late fee(延滞料)= additional charge がかかる.", x: ["", "注文が取り消されるとは書かれていない.", "期限後の支払いで割引にはならない.", "商品を返す必要はない."] }
    ]
  },
  {
    id: "r21",
    kind: "料金表とメール",
    title: "Harbor Business Center — Meeting Room Rates",
    target: 170,
    s: [
      "Harbor Business Center offers four meeting rooms for rent.",
      { t: "table", cap: "Meeting Room Rates", head: ["Room", "Capacity", "Rate per hour", "Equipment"], rows: [
        ["Coral", "6 people", "$30", "Whiteboard"],
        ["Pearl", "12 people", "$50", "Projector"],
        ["Lagoon", "20 people", "$80", "Projector, video conferencing"],
        ["Ocean", "40 people", "$120", "Projector, microphone"]
      ] },
      "Reservations of four hours or more receive a 10 percent discount.",
      "Cancellations must be made at least 48 hours in advance to receive a full refund.",
      { t: "doc", title: "E-mail — From: Nina Patel / To: Harbor Business Center / Subject: Room reservation" },
      "Hello,",
      "I would like to reserve a room for a training session on Thursday, June 12, from 1:00 to 4:00 P.M.",
      "Fifteen people will attend, and we need to hold a video call with our London office during the session.",
      "Could you also tell me whether parking is available for our guests?",
      "Thank you,",
      "Nina Patel, Brightway Consulting"
    ],
    ja: "ハーバー・ビジネスセンターは4つの会議室を貸し出している.[表:コーラル 6人 30ドル/時 ホワイトボード,パール 12人 50ドル プロジェクター,ラグーン 20人 80ドル プロジェクターとビデオ会議,オーシャン 40人 120ドル プロジェクターとマイク] 4時間以上の予約は10%引き.全額返金には48時間前までの取り消しが必要.[メール] 6月12日(木)午後1時〜4時に研修用の部屋を予約したい.15人が出席し,途中でロンドン支社とビデオ通話をする必要がある.来客用の駐車場があるかも教えてほしい.",
    qs: [
      { id: "r21q1", q: "What is the purpose of the e-mail?", c: ["To cancel a reservation", "To book a meeting space", "To ask for a refund", "To apply for a job"], a: 1, ev: [6], d: 400, why: "I would like to reserve a room とある.reserve a room を book a meeting space と言い換えている.", x: ["予約を取り消すメールではない.", "", "返金を求めるメールではない.", "仕事に応募するメールではない."] },
      { id: "r21q2", q: "Which room will Ms. Patel most likely reserve?", c: ["Coral", "Pearl", "Lagoon", "Ocean"], a: 2, ev: [7, [1, 2]], d: 900, why: "条件は「15人」と「ビデオ通話」.12人までの Pearl は入れず,ビデオ会議の設備があるのは Lagoon だけ.メールの条件を表に当てはめる(2つの文書を見比べる問題).", x: ["コーラルは6人までで,ビデオ会議の設備もない.", "パールは12人までで15人が入れない.", "", "オーシャンは40人入れるが,ビデオ会議の設備がない."] },
      { id: "r21q3", q: "How much will Ms. Patel most likely pay?", c: ["$240", "$216", "$150", "$360"], a: 0, ev: [6, [1, 2], 2], d: 1200, why: "1時〜4時は3時間.Lagoon は1時間 80 ドルなので 240 ドル.10% 引きは「4時間以上」が条件なので当てはまらない($216 は割引した場合の引っかけ).", x: ["", "216ドルは10%引きの額.割引は4時間以上の予約だけ.", "150ドルは料金表にない額.", "360ドルはオーシャンの3時間分.選ぶのはラグーン."] }
    ]
  },
  {
    id: "r22",
    kind: "社内メモとグラフ",
    title: "MEMO — Customer Survey Results: Sunrise Café",
    target: 140,
    s: [
      "To: All store managers",
      "From: Karen Brooks, Customer Experience Team",
      "Last month, 400 customers answered our survey about what we should improve first.",
      { t: "bar", cap: "What should we improve first? (number of answers)", items: [["Waiting time", 160], ["Seating", 100], ["Menu variety", 80], ["Prices", 40], ["Cleanliness", 20]] },
      "As the results show, waiting time is by far the biggest concern.",
      "Starting in October, we will therefore add one more staff member at the counter between 8:00 and 10:00 A.M., our busiest hours.",
      "We are also planning to replace the chairs in our older stores next year.",
      "Since few customers are unhappy with our prices, we will not change them for now.",
      "Please share these results with your staff at your next meeting."
    ],
    ja: "全店長へ.先月,400人の客が「まず何を改善すべきか」のアンケートに答えた.[グラフ:待ち時間160,座席100,メニューの種類80,価格40,清潔さ20] 結果のとおり,待ち時間が飛び抜けて大きな不満だ.そこで10月から,最も混む午前8〜10時にカウンターの人員を1人増やす.来年には古い店舗のいすの交換も計画している.価格に不満な客は少ないので,当面は変えない.次の会議でスタッフに結果を共有してほしい.",
    qs: [
      { id: "r22q1", q: "How many customers took part in the survey?", c: ["160", "200", "400", "800"], a: 2, ev: [2], d: 300, why: "400 customers answered our survey とある.160 は「待ち時間」と答えた人数で,グラフの数字の引っかけ.", x: ["160は「待ち時間」と答えた人数.", "200という数は出てこない.", "", "800という数は出てこない."] },
      { id: "r22q2", q: "According to the chart, what was the second most common answer?", c: ["Waiting time", "Seating", "Menu variety", "Prices"], a: 1, ev: [[3, 1]], d: 500, why: "グラフで2番目に長い棒は Seating(100).the second most common で「2番目に多い」.", x: ["待ち時間は最も多い答え(1番目).", "", "メニューの種類は3番目.", "価格は4番目."] },
      { id: "r22q3", q: "What does the company plan to do in October?", c: ["Lower its prices", "Buy new chairs", "Hire cleaning staff", "Increase staffing in the morning"], a: 3, ev: [5], d: 800, why: "Starting in October ... add one more staff member ... between 8:00 and 10:00 A.M. とある.いすの交換は next year(来年)なので時期が違う.", x: ["価格は当面変えない.", "いすの交換は来年.", "清掃のスタッフを雇う話ではない.", ""] }
    ]
  },
  {
    id: "r23",
    kind: "旅程表",
    title: "Travel Itinerary — Mr. Alan Reyes",
    target: 150,
    s: [
      "Dear Mr. Reyes,",
      "Here is the itinerary for your trip to Singapore next week.",
      { t: "table", head: ["Date", "Time", "Details"], rows: [
        ["Mon., Sept. 8", "9:40 A.M.", "Depart Tokyo (Flight SA 302)"],
        ["Mon., Sept. 8", "4:00 P.M.", "Arrive Singapore; check in at the Marina Park Hotel"],
        ["Tue., Sept. 9", "10:00 A.M.", "Meeting with Orchid Trading at their office"],
        ["Wed., Sept. 10", "2:00 P.M.", "Factory tour in Jurong"],
        ["Thu., Sept. 11", "11:15 A.M.", "Depart Singapore (Flight SA 305)"]
      ] },
      "A driver from the hotel will meet you at the airport, so you do not need to take a taxi.",
      "Breakfast is included in your room rate, but other meals are not.",
      "Ms. Tan of Orchid Trading has asked you to bring product samples to the meeting.",
      "Please keep all receipts so that you can be reimbursed after you return.",
      "Have a safe trip. — Yuki Sato, Travel Desk"
    ],
    ja: "レイエス様.来週のシンガポール出張の旅程です.[表:9月8日(月)9時40分 東京発,午後4時 シンガポール着・マリーナパークホテルにチェックイン,9日(火)10時 オーキッド商事のオフィスで会議,10日(水)午後2時 ジュロンで工場見学,11日(木)11時15分 シンガポール発] ホテルの運転手が空港で出迎えるので,タクシーは不要.朝食は宿泊料金に含まれるが,ほかの食事は含まれない.オーキッド商事のタンさんから,会議に製品サンプルを持ってくるよう頼まれている.帰国後に精算できるよう,領収書はすべて保管すること.",
    qs: [
      { id: "r23q1", q: "On what day will Mr. Reyes visit a factory?", c: ["Monday", "Tuesday", "Wednesday", "Thursday"], a: 2, ev: [[2, 3]], d: 400, why: "表の Factory tour の行は Wed., Sept. 10.Wed. は Wednesday の略.", x: ["月曜は出発と到着の日.", "火曜はオーキッド商事との会議.", "", "木曜はシンガポールを出発する日."] },
      { id: "r23q2", q: "How will Mr. Reyes most likely travel from the airport to the hotel?", c: ["By hotel car", "By taxi", "By train", "By rental car"], a: 0, ev: [3], d: 600, why: "A driver from the hotel will meet you at the airport とある.タクシーは「乗る必要がない」と否定されている.", x: ["", "タクシーは「乗る必要がない」と書かれている.", "電車の話は出てこない.", "レンタカーの話は出てこない."] },
      { id: "r23q3", q: "What should Mr. Reyes take to his meeting on September 9?", c: ["His receipts", "A hotel voucher", "A factory map", "Examples of products"], a: 3, ev: [[2, 2], 5], d: 800, why: "9月9日の会議の相手は Orchid Trading.その Ms. Tan が product samples を持ってくるよう頼んでいる.samples を examples of products と言い換えている.", x: ["領収書は帰国後の精算のために保管するもので,会議に持っていくものではない.", "ホテルの券の話は出てこない.", "工場の地図は書かれていない.", ""] }
    ]
  },
  {
    id: "r24",
    kind: "報告書とグラフ",
    title: "Verde Outdoor Gear — Third-Quarter Sales Summary",
    target: 160,
    s: [
      "Total sales for the third quarter reached $9 million, an increase of 12 percent over the same period last year.",
      { t: "bar", cap: "Third-quarter sales by region (millions of dollars)", items: [["North", 3.2], ["East", 2.5], ["South", 1.4], ["West", 1.9]] },
      "The North region remained our strongest market, largely because of the new store that opened in Greyfield in July.",
      "Sales in the East were flat compared with last year, while the West grew by 20 percent thanks to strong online orders.",
      "The South was the only region where sales declined, mainly because of unusually heavy rain during the camping season.",
      "To address this, we will launch a line of waterproof tents and jackets in the South next spring.",
      "We expect fourth-quarter sales to be even higher, as demand for winter clothing typically peaks in December."
    ],
    ja: "第3四半期の売上は合計900万ドルで,前年同期より12%増えた.[グラフ:北部320万,東部250万,南部140万,西部190万ドル] 北部は,7月にグレイフィールドに開いた新店舗のおかげで引き続き最も強い市場だった.東部は前年並み,西部は好調なオンライン注文により20%伸びた.売上が減ったのは南部だけで,主な原因はキャンプの季節の異常な大雨だ.対策として,来春,南部で防水のテントと上着を発売する.冬物衣料の需要は例年12月に最も高まるので,第4四半期の売上はさらに伸びる見込みだ.",
    qs: [
      { id: "r24q1", q: "Which region had the lowest sales in the third quarter?", c: ["North", "East", "South", "West"], a: 2, ev: [[1, 2]], d: 500, why: "グラフでいちばん短い棒は South(1.4).lowest は「最も低い」.", x: ["北部は最も売上が多い.", "東部は2番目.", "", "西部は南部より多い."] },
      { id: "r24q2", q: "What is suggested about the West region?", c: ["Many of its customers shop on the Internet.", "A new store opened there in July.", "Its sales were the same as last year.", "It was affected by bad weather."], a: 0, ev: [3], d: 1000, why: "the West grew by 20 percent thanks to strong online orders から,ネットで買う客が多いと分かる.新店舗は北部,前年並みは東部,悪天候は南部の話(地域を入れ替えた引っかけ).", x: ["", "7月に新店舗が開いたのは北部.", "前年並みだったのは東部.", "悪天候の影響を受けたのは南部."] },
      { id: "r24q3", q: "Why will the company introduce new products in the South?", c: ["To compete with a new store", "To respond to a drop in sales caused by weather", "To prepare for the winter season", "To increase online orders"], a: 1, ev: [4, 5], d: 1100, why: "南部は大雨で売上が減った.To address this(これに対処するため)防水の商品を出す,という流れ.this が指す内容を前の文から読み取る.", x: ["新しい店と競うためではない.", "", "冬に備えるためではない(冬物は第4四半期の話).", "オンライン注文を増やすためではない."] }
    ]
  },
  {
    id: "r25",
    kind: "注文確認",
    title: "Order Confirmation — Luma Lighting",
    target: 150,
    s: [
      "Thank you for your order, Ms. Grant.",
      "Order number: LL-58213 / Order date: Tuesday, November 4",
      { t: "table", head: ["Item", "Quantity", "Price"], rows: [
        ["Floor lamp (white)", "1", "$89.00"],
        ["LED bulbs (pack of 4)", "2", "$24.00"],
        ["Shipping (Standard)", "", "$6.00"],
        ["Total", "", "$119.00"]
      ] },
      { t: "table", cap: "Shipping options", head: ["Option", "Delivery time", "Cost"], rows: [
        ["Standard", "5–7 business days", "$6.00"],
        ["Express", "2–3 business days", "$15.00"],
        ["Next-day", "1 business day", "$28.00"]
      ] },
      "You may change your shipping option at no extra handling charge until your order leaves our warehouse.",
      "The floor lamp is currently out of stock and is expected to ship on November 12; the bulbs will be sent separately today.",
      "Items may be returned within 30 days of delivery if they are unused and in their original packaging."
    ],
    ja: "グラント様,ご注文ありがとうございます.注文番号 LL-58213,注文日11月4日(火).[表:フロアランプ(白)1台 89ドル,LED 電球(4個入り)2パック 24ドル,送料(通常)6ドル,合計119ドル] [配送方法:通常 5〜7営業日 6ドル,速達 2〜3営業日 15ドル,翌日 1営業日 28ドル] 注文品が倉庫を出るまでは,手数料なしで配送方法を変更できる.フロアランプは現在在庫切れで,11月12日に発送の見込み.電球は別便で本日発送する.未使用で元の箱に入っていれば,配達から30日以内は返品できる.",
    qs: [
      { id: "r25q1", q: "How much did Ms. Grant pay for shipping?", c: ["$6.00", "$15.00", "$24.00", "$28.00"], a: 0, ev: [[2, 2]], d: 400, why: "注文の表の Shipping (Standard) の行は $6.00.下の配送方法の表には選ばなかった方法の料金も載っているので,どの表を見るかに注意.", x: ["", "15ドルは速達の料金で,選んでいない.", "24ドルは電球の代金.", "28ドルは翌日配達の料金で,選んでいない."] },
      { id: "r25q2", q: "What is indicated about Ms. Grant's order?", c: ["It will be delivered the next day.", "It was placed on a weekend.", "It will arrive in more than one package.", "It includes a free gift."], a: 2, ev: [5], d: 900, why: "ランプは12日発送,電球は sent separately(別に送る).つまり荷物は2つに分かれて届く.注文日は Tuesday なので週末ではない.", x: ["翌日に届くとは書かれていない(ランプは12日発送).", "注文日は火曜日で,週末ではない.", "", "無料の贈り物は書かれていない."] },
      { id: "r25q3", q: "According to the confirmation, under what condition can an item be returned?", c: ["It must be damaged on arrival.", "It must not have been used.", "It must be returned within one week.", "It must be exchanged for another item."], a: 1, ev: [6], d: 700, why: "if they are unused and in their original packaging とある.unused(未使用)= must not have been used.期間は30日で1週間ではない.", x: ["傷んでいることが条件ではない(未使用で元の箱があること).", "", "期間は配達から30日で,1週間ではない.", "別の品と交換しなければならないとは書かれていない."] }
    ]
  },
  {
    id: "r26",
    kind: "比較表とメール",
    title: "Tessa Office Printers — Product Comparison",
    target: 180,
    s: [
      "Compare our three most popular office printers.",
      { t: "table", head: ["Model", "Price", "Pages per minute", "Color", "Warranty"], rows: [
        ["T-100", "$180", "20", "No", "1 year"],
        ["T-300", "$320", "35", "Yes", "2 years"],
        ["T-500", "$540", "50", "Yes", "3 years"]
      ] },
      "All models can print on both sides of the paper automatically.",
      "Customers who purchase an extended service plan receive free replacement parts for five years.",
      { t: "doc", title: "E-mail — From: Omar Haddad / To: Tessa Sales Team / Subject: Printer for our office" },
      "Hello,",
      "Our accounting office prints about 3,000 pages a month, almost all of them black-and-white reports.",
      "We do not need color, and our budget is limited to $200.",
      "However, our current printer broke down twice last year, so reliability matters to us more than speed.",
      "Could you recommend a model and tell me more about your service plan?",
      "Regards, Omar Haddad"
    ],
    ja: "人気のオフィス用プリンター3機種の比較.[表:T-100 180ドル 毎分20枚 カラーなし 保証1年,T-300 320ドル 毎分35枚 カラーあり 保証2年,T-500 540ドル 毎分50枚 カラーあり 保証3年] 全機種が自動で両面印刷できる.延長サービスプランを購入すると,5年間,交換部品が無料になる.[メール] 当会計事務所は月に約3000ページを印刷し,ほぼすべて白黒の報告書だ.カラーは不要で,予算は200ドルまで.ただ,今のプリンターは昨年2回故障したので,速さよりも信頼性が大事だ.機種を薦めてほしい.サービスプランについても詳しく教えてほしい.",
    qs: [
      { id: "r26q1", q: "What feature do all three printers have?", c: ["Color printing", "A three-year warranty", "Two-sided printing", "Wireless connection"], a: 2, ev: [2], d: 600, why: "All models can print on both sides of the paper とある.on both sides を two-sided と言い換えている.カラーと3年保証は一部の機種だけ.", x: ["カラー印刷ができるのは T-300 と T-500 だけ.", "3年保証は T-500 だけ.", "", "無線の接続は書かれていない."] },
      { id: "r26q2", q: "Which model best fits Mr. Haddad's needs?", c: ["T-100", "T-300", "T-500", "None of the models"], a: 0, ev: [7, [1, 0]], d: 900, why: "条件は「カラー不要」「予算200ドルまで」.200ドル以下は T-100(180ドル)だけ.", x: ["", "T-300 は320ドルで予算(200ドル)を超え,カラーも不要.", "T-500 は540ドルで予算を超える.", "T-100 が条件に合うので,どれも合わないわけではない."] },
      { id: "r26q3", q: "Why most likely does Mr. Haddad ask about the service plan?", c: ["He wants to print in color later.", "He is worried about repair problems.", "He needs a faster printer.", "He wants to pay in monthly installments."], a: 1, ev: [8, 3], d: 1200, why: "今のプリンターが2回故障し,reliability(信頼性)が大事だと書いている.サービスプランは交換部品が無料になるものなので,故障への備えとして尋ねていると推測できる.", x: ["カラーは不要だと書いている.", "", "速さより信頼性が大事だと書いている.", "月払いの話は出てこない."] }
    ]
  },

  // ---- 難しめの文章(1000 以上の設問を含む) ----
  {
    id: "r27",
    kind: "記事",
    title: "Business Weekly — Small Retailers Turn to Local Suppliers",
    target: 170,
    s: [
      "Rising shipping costs are changing the way small retailers do business.",
      "According to a survey released this week by the National Retail Association, nearly 60 percent of small store owners have switched at least one overseas supplier to a domestic one in the past two years.",
      "The primary reason cited was not price but reliability: goods from distant factories often arrived weeks behind schedule.",
      "\"We were losing customers because our shelves were empty,\" said Janet Cole, who runs a kitchenware shop in Dover.",
      "Ms. Cole now buys most of her products from manufacturers within 200 kilometers of her store.",
      "Although she pays about 15 percent more per item, she says the higher cost is offset by fewer lost sales.",
      "Not everyone is convinced, however.",
      "Economist Raj Mehta warns that domestic suppliers may raise their prices once demand grows, leaving retailers with thinner profit margins.",
      "For now, though, most store owners surveyed said they have no plans to return to their former suppliers."
    ],
    ja: "輸送費の上昇が,小さな小売店の商売のやり方を変えている.全国小売業協会が今週発表した調査によると,小規模店の店主の6割近くが,過去2年間に海外の仕入先を少なくとも1社,国内の業者に切り替えた.挙げられた主な理由は価格ではなく確実さで,遠くの工場からの商品は予定より何週間も遅れることが多かった.ドーバーで台所用品店を営むコールさんは「棚が空で客を失っていた」と話す.今は商品の大半を店から200キロ以内のメーカーから仕入れている.1品あたり約15%高くつくが,売り逃しが減ることで埋め合わされているという.ただし,皆が納得しているわけではない.経済学者のメータ氏は,需要が増えれば国内の業者が値上げし,小売店の利幅が薄くなるかもしれないと警告する.それでも今のところ,調査に答えた店主の大半は,元の仕入先に戻る予定はないと答えた.",
    qs: [
      { id: "r27q1", q: "What is the article mainly about?", c: ["A change in where small stores buy their goods", "A new law on overseas shipping", "The opening of a kitchenware shop", "A decline in the number of small retailers"], a: 0, ev: [0, 1], d: 900, why: "最初の2文が主題:小売店が仕入先を海外から国内へ切り替えている.記事の主題は第1段落(冒頭)に書かれる.", x: ["", "海外輸送の新しい法律の記事ではない.", "台所用品店は例として出てくるだけ.", "小さな小売店の数が減っているという記事ではない."] },
      { id: "r27q2", q: "According to the survey, why did many store owners change suppliers?", c: ["Domestic goods were cheaper.", "Overseas factories closed.", "Deliveries were frequently late.", "Customers asked for local products."], a: 2, ev: [2], d: 1000, why: "not price but reliability(価格ではなく確実さ),often arrived weeks behind schedule(予定より遅れて届いた)とある.国内品はむしろ15%高いので A は逆.", x: ["国内の商品はむしろ約15%高い.", "海外の工場が閉まったとは書かれていない.", "", "客が地元の商品を求めたとは書かれていない."] },
      { id: "r27q3", q: "The word \"offset\" in the article is closest in meaning to", c: ["increased", "delayed", "explained", "balanced"], a: 3, ev: [5], d: 1400, why: "「15%高くつくが,売り逃しが減ることで offset される」.Although(〜だが)があるので,高い費用の悪い面が打ち消されるという意味になる.offset = 相殺する = balance.知らない単語は,文の論理(逆接)から意味を導く.", x: ["increased(増やした)では,費用の悪い面が打ち消される意味にならない.", "delayed(遅らせた)では意味が通らない.", "explained(説明した)では意味が通らない.", ""] }
    ]
  },
  {
    id: "r28",
    kind: "お知らせ",
    title: "Notice — Changes to Your CloudBox Storage Plan",
    target: 170,
    s: [
      "Dear CloudBox customer,",
      "We are writing to inform you of changes to our service terms, effective September 1.",
      "First, the monthly fee for the Standard plan will rise from $8 to $10; the fee for the Basic plan will remain unchanged.",
      "Second, storage for Standard plan users will double from 100 to 200 gigabytes at no additional cost beyond the new fee.",
      "Third, accounts that have not been accessed for 24 consecutive months will be deleted after two written warnings.",
      "Customers who paid for a full year in advance will not be charged the new rate until their current term expires.",
      "If you do not wish to accept these changes, you may cancel your plan before September 1 and receive a refund for any unused months.",
      "Continued use of the service after that date will be regarded as acceptance of the revised terms.",
      "Sincerely, The CloudBox Team"
    ],
    ja: "クラウドボックスをご利用の皆様へ.9月1日から有効となる利用規約の変更をお知らせします.第1に,スタンダードプランの月額料金が8ドルから10ドルに上がる.ベーシックプランの料金は変わらない.第2に,スタンダードプランの保存容量が100ギガから200ギガへ倍になる(新料金のほかに追加費用はない).第3に,24か月続けて利用のないアカウントは,書面による2回の警告の後に削除される.1年分を前払いした客には,現在の契約期間が切れるまで新料金は適用されない.変更を受け入れたくない場合は,9月1日より前に解約すれば,未使用の月の分が返金される.その日以降も利用を続けた場合は,改定後の規約に同意したものとみなされる.",
    qs: [
      { id: "r28q1", q: "What is one change being announced?", c: ["The Basic plan will be discontinued.", "The price of one plan will increase.", "Storage space will be reduced.", "A new payment method will be introduced."], a: 1, ev: [2], d: 800, why: "the monthly fee for the Standard plan will rise from $8 to $10.値上がりするのはスタンダードプランだけ.容量は減るのではなく倍になる.", x: ["ベーシックプランは料金が変わらないだけで,なくなるわけではない.", "", "容量は減るのではなく,100から200ギガに倍になる.", "新しい支払い方法の話は出てこない."] },
      { id: "r28q2", q: "Who will NOT be affected immediately by the new fee?", c: ["Customers who joined this year", "Customers who use more than 100 gigabytes", "Customers who received two warnings", "Customers who have already paid for twelve months"], a: 3, ev: [5], d: 1200, why: "Customers who paid for a full year in advance will not be charged the new rate until their current term expires.a full year in advance を have already paid for twelve months と言い換えている.", x: ["今年入った客という条件は書かれていない.", "100ギガ以上使う客という条件は書かれていない.", "2回の警告は利用のないアカウントを消す話.", ""] },
      { id: "r28q3", q: "What is implied about customers who keep using the service after September 1?", c: ["They are considered to have agreed to the changes.", "They must sign a new contract.", "They will receive a refund.", "They will be moved to the Basic plan."], a: 0, ev: [7], d: 1300, why: "Continued use ... will be regarded as acceptance of the revised terms.be regarded as 〜(〜とみなされる)= be considered,acceptance(受け入れ)= have agreed.硬い名詞の表現を動詞に直して読む.", x: ["", "新しい契約に署名する必要があるとは書かれていない.", "返金されるのは9月1日より前に解約した場合.", "ベーシックプランに移されるとは書かれていない."] }
    ]
  },
  {
    id: "r29",
    kind: "プレスリリース",
    title: "Press Release — Aldergate Hotels",
    target: 170,
    s: [
      "FOR IMMEDIATE RELEASE",
      "Aldergate Hotels announced today that it will eliminate single-use plastic items from all 42 of its properties by the end of next year.",
      "Small plastic bottles of shampoo and soap will be replaced with refillable containers, and plastic water bottles will give way to glass ones.",
      "The company estimates that the initiative will keep roughly 30 tons of plastic out of landfills annually.",
      "\"Our guests have told us repeatedly that they prefer to stay with companies that take the environment seriously,\" said Chief Operating Officer Lena Fischer.",
      "The program was tested at three hotels in Vancouver last year, where guest satisfaction scores rose slightly and supply costs fell by 8 percent.",
      "Encouraged by these results, the board approved the company-wide expansion in March.",
      "Aldergate also plans to install solar panels at ten locations, although no timeline for that project has been set."
    ],
    ja: "即日発表.オルダーゲート・ホテルズは本日,来年末までに全42施設から使い捨てのプラスチック製品をなくすと発表した.シャンプーやせっけんの小さなプラスチック容器は詰め替え式の容器に,ペットボトルの水はガラス瓶に替わる.同社は,この取り組みで年間およそ30トンのプラスチックが埋め立て地に行かずに済むと見積もっている.最高執行責任者のフィッシャー氏は「お客様から,環境に真剣に取り組む会社に泊まりたいと繰り返し言われてきた」と述べた.この計画は昨年バンクーバーの3つのホテルで試され,客の満足度はわずかに上がり,備品の費用は8%下がった.この結果に後押しされ,取締役会は3月に全社への拡大を承認した.同社は10か所に太陽光パネルを設置する計画もあるが,その日程は決まっていない.",
    qs: [
      { id: "r29q1", q: "What does Aldergate Hotels plan to do?", c: ["Open 42 new hotels", "Raise its room rates", "Stop using disposable plastic products", "Move its headquarters to Vancouver"], a: 2, ev: [1], d: 800, why: "eliminate single-use plastic items(使い捨てプラスチック製品をなくす).eliminate = stop using,single-use = disposable.42 は今ある施設の数で,新しく開くわけではない.", x: ["42は今ある施設の数で,新しく開くわけではない.", "部屋の料金を上げる話は出てこない.", "", "本社をバンクーバーに移す話ではない(バンクーバーは試した場所)."] },
      { id: "r29q2", q: "What was a result of the trial in Vancouver?", c: ["Guests complained about the changes.", "Spending on supplies decreased.", "Three hotels were closed.", "Solar panels were installed."], a: 1, ev: [5], d: 1100, why: "supply costs fell by 8 percent(備品の費用が8%下がった)= Spending on supplies decreased.満足度は上がったので A は逆.", x: ["客の満足度はわずかに上がった.", "", "3つのホテルは試した場所で,閉鎖されてはいない.", "太陽光パネルは,これから10か所に付ける計画."] },
      { id: "r29q3", q: "What is indicated about the solar panel project?", c: ["It was completed in March.", "It will cost less than expected.", "It was rejected by the board.", "Its schedule has not been decided."], a: 3, ev: [7], d: 1200, why: "no timeline for that project has been set(その計画の日程は決まっていない).timeline = schedule,set = decided.3月に承認されたのはプラスチック削減の方.", x: ["3月に承認されたのはプラスチックを減らす計画.", "費用についての話は出てこない.", "取締役会が却下したとは書かれていない.", ""] }
    ]
  },
  {
    id: "r30",
    kind: "メール2通",
    title: "E-mails — Delayed furniture delivery",
    target: 180,
    s: [
      "From: Gloria Kim / To: Hartwell Furniture Customer Care / Date: May 6",
      "I ordered a dining table and four chairs from your Web site on April 20 and was promised delivery within ten days.",
      "The chairs arrived on April 28, but the table still has not come.",
      "I have guests visiting on May 17, so I need the table before then.",
      "If it cannot be delivered in time, I would like to cancel that part of the order.",
      { t: "doc", title: "From: Daniel Ross / To: Gloria Kim / Date: May 7" },
      "Dear Ms. Kim,",
      "Please accept our sincere apologies for the delay.",
      "The table you ordered was damaged at our warehouse, and a replacement had to be requested from the manufacturer.",
      "It is now scheduled to reach you on May 14.",
      "To make up for the inconvenience, we have refunded the $40 delivery fee to your credit card.",
      "Should the table fail to arrive by that date, we will of course cancel it and return your payment in full."
    ],
    ja: "[1通目:5月6日 キムさんから] 4月20日に Web サイトで食卓といす4脚を注文し,10日以内に届けると約束された.いすは4月28日に届いたが,食卓はまだ来ない.5月17日に来客があるので,それまでに食卓が必要だ.間に合わないなら,その分の注文を取り消したい.[2通目:5月7日 ロスさんから] 遅れを心からおわびします.ご注文の食卓は当社の倉庫で破損し,メーカーに代わりの品を頼まなければならなかった.5月14日に届く予定だ.おわびとして,配送料40ドルをクレジットカードに返金した.万一その日までに届かなければ,もちろん注文を取り消し,代金を全額返金する.",
    qs: [
      { id: "r30q1", q: "Why did Ms. Kim write to Hartwell Furniture?", c: ["Some chairs were damaged.", "She was charged twice.", "Part of her order had not arrived.", "She wanted to order more chairs."], a: 2, ev: [2], d: 600, why: "the table still has not come.いすは届いたが食卓が届かない = 注文の一部が届いていない.", x: ["いすは届いたが,傷んでいたとは書かれていない.", "2回請求されたとは書かれていない.", "", "いすを追加で注文したいとは書かれていない."] },
      { id: "r30q2", q: "What caused the delay?", c: ["The table was damaged before shipping.", "The manufacturer went out of business.", "The address was incorrect.", "The payment was not confirmed."], a: 0, ev: [8], d: 900, why: "The table ... was damaged at our warehouse(倉庫で破損した).倉庫にある = まだ発送前.原因は2通目(返信)に書かれている.", x: ["", "メーカーが倒産したとは書かれていない(代わりの品を頼んだ).", "住所の誤りの話は出てこない.", "支払いの確認の話は出てこない."] },
      { id: "r30q3", q: "What will most likely happen if the table arrives on May 14?", c: ["Ms. Kim will receive a full refund.", "Ms. Kim will pay another delivery fee.", "Ms. Kim will have to return the chairs.", "Ms. Kim will be able to use it when her guests visit."], a: 3, ev: [3, 9], d: 1100, why: "来客は5月17日(1通目),到着予定は5月14日(2通目).14日に届けば来客に間に合う.全額返金は「届かなかった場合」の話.2通の日付をつないで答える.", x: ["全額の返金は,14日までに届かなかった場合の話.", "追加の配送料はかからない(配送料はむしろ返金された).", "いすを返す必要はない.", ""] }
    ]
  },
  {
    id: "r31",
    kind: "社内メモ",
    title: "MEMO — To: All staff / From: Human Resources / Re: Revised remote work policy",
    target: 170,
    s: [
      "Beginning April 1, the company will adopt a revised policy on working from home.",
      "Full-time employees who have completed their six-month probation period may work remotely up to two days per week.",
      "Requests must be approved by your department head, and remote days may not fall on Mondays, when team meetings are held.",
      "Employees working from home are expected to be reachable by phone and e-mail during core hours, from 10:00 A.M. to 3:00 P.M.",
      "The company will lend each remote worker a laptop but will not cover home Internet or electricity costs.",
      "Managers may withdraw approval if an employee's performance declines.",
      "The policy will be reviewed after one year, at which point the number of remote days may be increased.",
      "Questions should be directed to Hana Mori in Human Resources."
    ],
    ja: "4月1日から,会社は在宅勤務についての改定した方針を採用する.6か月の試用期間を終えた正社員は,週に2日まで在宅で働ける.申請には部長の承認が必要で,チーム会議のある月曜日は在宅勤務の日にできない.在宅で働く社員は,コアタイム(午前10時〜午後3時)に電話とメールで連絡がつくようにすること.会社は在宅勤務者にノートパソコンを貸すが,自宅のインターネット代や電気代は負担しない.社員の業績が下がった場合,管理職は承認を取り消すことができる.方針は1年後に見直し,その時点で在宅勤務の日数を増やす可能性がある.質問は人事部の森まで.",
    qs: [
      { id: "r31q1", q: "Who is eligible to work remotely under the new policy?", c: ["All employees from their first day", "Full-time staff who have finished their trial period", "Part-time staff only", "Department heads only"], a: 1, ev: [1], d: 900, why: "Full-time employees who have completed their six-month probation period.probation period(試用期間)= trial period,completed = finished.", x: ["入社初日からではなく,試用期間を終えた人だけ.", "", "パートタイムの社員だけではない(正社員が対象).", "部長だけではない."] },
      { id: "r31q2", q: "What is NOT stated as a condition of working from home?", c: ["Getting a manager's approval", "Being available during certain hours", "Avoiding a particular day of the week", "Submitting a weekly report"], a: 3, ev: [2, 3], d: 1200, why: "承認(approved by your department head),連絡がつく時間(core hours),月曜を避ける(may not fall on Mondays)は本文にある.週報の提出はどこにもない.NOT 問題は,本文にある3つを消す.", x: ["部長の承認は条件として書かれている.", "コアタイムに連絡がつくことは条件として書かれている.", "月曜日を避けることは条件として書かれている.", ""] },
      { id: "r31q3", q: "What will the company provide to remote workers?", c: ["A computer", "Internet service", "Money for electricity", "A mobile phone"], a: 0, ev: [4], d: 800, why: "will lend each remote worker a laptop.laptop を computer と言い換えている.インターネット代と電気代は will not cover(負担しない).", x: ["", "インターネット代は負担しない.", "電気代は負担しない.", "携帯電話を貸すとは書かれていない."] }
    ]
  },
  {
    id: "r32",
    kind: "求人広告とメール",
    title: "Northgate Museum of Science — Events Coordinator",
    target: 190,
    s: [
      "Northgate Museum of Science is seeking an Events Coordinator to plan and manage its public programs.",
      "The successful candidate will organize lectures, school visits, and seasonal exhibitions, and will supervise a team of ten volunteers.",
      "Applicants must have at least three years of experience in event planning and be available to work on weekends.",
      "Fluency in a second language is preferred but not required.",
      "To apply, send a résumé and two letters of reference to jobs@northgatemuseum.example by October 15.",
      "Interviews will be held during the last week of October.",
      { t: "doc", title: "E-mail — From: Elena Vasquez / To: jobs@northgatemuseum.example / Date: October 9" },
      "Dear Hiring Manager,",
      "I am writing to apply for the Events Coordinator position.",
      "For the past five years I have planned conferences and weddings at the Regent Hotel, where I also trained new staff.",
      "I speak Spanish and English, and I am free to work any day of the week.",
      "My résumé is attached; my former supervisor will send a letter of reference to you directly.",
      "I look forward to hearing from you."
    ],
    ja: "ノースゲート科学博物館は,一般向けの催しを企画・運営するイベント担当者を募集している.採用された人は,講演,学校の見学,季節の展示を企画し,10人のボランティアを監督する.応募者には,イベント企画の経験が3年以上あり,週末に働けることが必要だ.第二言語が流ちょうであることが望ましいが,必須ではない.応募するには,10月15日までに履歴書と推薦状2通を送ること.面接は10月の最終週に行う.[メール:10月9日 バスケスさんから] イベント担当者の職に応募します.過去5年間,リージェントホテルで会議や結婚式を企画し,新人の研修も担当した.スペイン語と英語を話し,週のどの日でも働ける.履歴書を添付した.以前の上司が推薦状を直接そちらに送る.ご連絡をお待ちしています.",
    qs: [
      { id: "r32q1", q: "What is one duty of the Events Coordinator?", c: ["Selling tickets", "Repairing exhibits", "Managing volunteers", "Teaching science classes"], a: 2, ev: [1], d: 700, why: "will supervise a team of ten volunteers.supervise(監督する)= manage.", x: ["切符を売る仕事は書かれていない.", "展示品を修理する仕事は書かれていない.", "", "科学の授業を教える仕事は書かれていない."] },
      { id: "r32q2", q: "What is suggested about Ms. Vasquez?", c: ["She has worked at a museum before.", "She meets the experience requirement.", "She cannot work on weekends.", "She has already been interviewed."], a: 1, ev: [2, 9], d: 1100, why: "求人の条件は「イベント企画の経験3年以上」.メールには「5年間,会議や結婚式を企画した」とある.条件(求人)と事実(メール)を照らし合わせる.職場はホテルで博物館ではない.", x: ["働いていたのはホテルで,博物館ではない.", "", "週のどの日でも働けると書いている.", "面接は10月の最終週で,まだ受けていない."] },
      { id: "r32q3", q: "What does Ms. Vasquez's application appear to be missing?", c: ["A résumé", "A cover letter", "Language skills", "One of the required reference letters"], a: 3, ev: [4, 11], d: 1400, why: "求人は two letters of reference(推薦状2通)を求めているが,メールで触れているのは a letter of reference(1通)だけ.数の食い違いに気づく問題.履歴書は添付してある.", x: ["履歴書は添付してある.", "送り状(カバーレター)は求められていない.", "言語は求人で「望ましい」だけで,彼女は2か国語を話す.", ""] }
    ]
  },
  {
    id: "r33",
    kind: "営業時間の表",
    title: "Riverton Fitness Club — New Opening Hours from January 5",
    target: 90,
    s: [
      { t: "table", head: ["Day", "Gym", "Pool"], rows: [
        ["Monday–Friday", "6:00 A.M.–10:00 P.M.", "7:00 A.M.–9:00 P.M."],
        ["Saturday", "8:00 A.M.–8:00 P.M.", "9:00 A.M.–6:00 P.M."],
        ["Sunday", "8:00 A.M.–6:00 P.M.", "Closed"]
      ] },
      "The pool is closed on Sundays for cleaning.",
      "Members may bring one guest for free on Saturdays.",
      "Towels can be rented at the front desk for $2."
    ],
    ja: "リバートン・フィットネスクラブ:1月5日からの新しい営業時間.[表:月〜金 ジム 6時〜22時・プール 7時〜21時,土曜 ジム 8時〜20時・プール 9時〜18時,日曜 ジム 8時〜18時・プール 休み] プールは清掃のため日曜は休み.会員は土曜に限り,同伴者を1人無料で連れてこられる.タオルは受付で2ドルで借りられる.",
    qs: [
      { id: "r33q1", q: "What time does the gym open on Saturday?", c: ["6:00 A.M.", "7:00 A.M.", "8:00 A.M.", "9:00 A.M."], a: 2, ev: [[0, 1]], d: 300, why: "Saturday の行の Gym の列は 8:00 A.M.–8:00 P.M.9:00 は Pool の列なので,列を間違えないこと.", x: ["6時は平日のジムの開始時刻.", "7時は平日のプールの開始時刻.", "", "9時は土曜のプールの開始時刻."] },
      { id: "r33q2", q: "When is the pool NOT available?", c: ["On Monday", "On Friday", "On Saturday", "On Sunday"], a: 3, ev: [[0, 2], 1], d: 300, why: "Sunday の行の Pool は Closed.本文にも closed on Sundays とある.", x: ["月曜はプールが開いている.", "金曜もプールが開いている.", "土曜もプールが開いている(9時〜18時).", ""] },
      { id: "r33q3", q: "What can members do on Saturdays?", c: ["Bring a visitor at no cost", "Rent towels for free", "Use the pool until 9:00 P.M.", "Take a swimming lesson"], a: 0, ev: [2], d: 500, why: "Members may bring one guest for free on Saturdays.guest = visitor,for free = at no cost.タオルは2ドルかかる.", x: ["", "タオルは2ドルで借りる.無料ではない.", "土曜のプールは午後6時まで.", "水泳の講習の話は出てこない."] }
    ]
  },
  {
    id: "r34",
    kind: "記事",
    title: "Millbrook Journal — Downtown Plaza Plan Draws Mixed Reactions",
    target: 180,
    s: [
      "The Millbrook City Council voted 5 to 2 on Monday to convert two downtown parking lots into a public plaza.",
      "Supporters argue that the plaza will draw more pedestrians to the area and, in turn, boost sales at nearby shops.",
      "Opponents, including several restaurant owners, counter that the loss of 180 parking spaces will discourage customers who drive in from the suburbs.",
      "In response to these concerns, the council amended the original proposal to include a free shuttle bus from the Elm Street garage, which is rarely more than half full.",
      "Council member Dana Whitfield, who cast one of the two dissenting votes, said the shuttle was \"a step in the right direction\" but insufficient on its own.",
      "Construction is slated to begin in June, provided that the state approves a grant covering roughly a third of the $2.4 million cost.",
      "Should the grant be denied, the council would have to either scale back the design or postpone the project."
    ],
    ja: "ミルブルック市議会は月曜日,中心街の2つの駐車場を公共の広場に作り変える案を5対2で可決した.賛成派は,広場が歩行者を呼び込み,その結果,近くの店の売上を伸ばすと主張する.数人の飲食店主を含む反対派は,駐車スペースが180台分なくなれば,郊外から車で来る客の足が遠のくと反論する.こうした懸念を受けて,議会は元の案を修正し,エルム通りの立体駐車場からの無料シャトルバスを加えた.この駐車場は半分以上埋まることがめったにない.反対票を投じた2人のうちの1人,ホイットフィールド議員は,シャトルは「正しい方向への一歩」だが,それだけでは不十分だと述べた.工事は6月に始まる予定だが,それは240万ドルの費用のおよそ3分の1をまかなう補助金を州が承認することが条件だ.補助金が認められなければ,議会は設計を縮小するか,計画を延期しなければならない.",
    qs: [
      { id: "r34q1", q: "What did the city council decide to do?", c: ["Build a new parking garage", "Turn parking areas into a public space", "Close several restaurants", "Raise parking fees downtown"], a: 1, ev: [0], d: 1000, why: "convert two downtown parking lots into a public plaza.convert A into B(A を B に作り変える)= turn A into B,plaza = public space.", x: ["新しい駐車場ビルを建てるのではない(駐車場を広場にする).", "", "飲食店を閉める決定ではない.", "駐車料金を上げる話は出てこない."] },
      { id: "r34q2", q: "What is suggested about the Elm Street garage?", c: ["It will be torn down in June.", "It is owned by restaurant owners.", "It charges high fees.", "It usually has many empty spaces."], a: 3, ev: [3], d: 1300, why: "which is rarely more than half full(半分以上埋まることはめったにない)= たいてい空きが多い.rarely(めったに〜ない)という否定の語に注意して読み替える.", x: ["6月に取り壊されるとは書かれていない(6月は工事の開始予定).", "飲食店の店主が持っているとは書かれていない.", "料金が高いとは書かれていない(シャトルは無料).", ""] },
      { id: "r34q3", q: "What is true about the start of construction?", c: ["It depends on funding from the state.", "It has been postponed until next year.", "It was opposed by all council members.", "It will cost the state $2.4 million."], a: 0, ev: [5, 6], d: 1500, why: "provided that the state approves a grant(州が補助金を承認するという条件で).provided that 〜 = 〜という条件で,なので工事の開始は州の資金次第.240万ドルは費用の全体で,州が出すのはその3分の1.", x: ["", "来年まで延期されたとは書かれていない(補助金が認められなければ延期もありうる).", "議員全員が反対したのではなく,5対2で可決された.", "240万ドルは費用の全体で,州が出すのはその約3分の1."] }
    ]
  },

  // ---- 長文の追加(r35〜) ----
  {
    id: "r35",
    kind: "チャット",
    title: "Text message chain — Ryan Ford and Mei Tanaka",
    target: 90,
    s: [
      "Ryan Ford [9:12 A.M.]: Mei, are you already at the convention center?",
      "Mei Tanaka [9:14 A.M.]: Yes, I'm setting up our booth now. Where are you?",
      "Ryan Ford [9:15 A.M.]: My train is stopped because of a signal problem. I'll probably be about 40 minutes late.",
      "Mei Tanaka [9:16 A.M.]: No problem. The doors don't open to visitors until ten.",
      "Ryan Ford [9:17 A.M.]: Great. Did the brochures arrive?",
      "Mei Tanaka [9:18 A.M.]: They did, but we only got half of the boxes. I'll call the printer.",
      "Ryan Ford [9:19 A.M.]: Thanks. I can pick up the rest on my way if they're ready."
    ],
    ja: "フォード [9:12]:メイ,もう会議場にいる? 田中 [9:14]:ええ,今ブースを準備中.どこにいるの? フォード [9:15]:信号の故障で電車が止まっている.たぶん40分ほど遅れる. 田中 [9:16]:大丈夫.来場者の入場は10時から. フォード [9:17]:よかった.パンフレットは届いた? 田中 [9:18]:届いたけど,箱が半分しか来ていない.印刷所に電話する. フォード [9:19]:ありがとう.できていれば,途中で残りを受け取れるよ.",
    qs: [
      { id: "r35q1", q: "Why will Mr. Ford be late?", c: ["He missed his train.", "His train has been delayed.", "He went to the wrong place.", "He is picking up boxes."], a: 1, ev: [2], d: 300, why: "My train is stopped because of a signal problem.電車が止まっている = 遅れている.乗り遅れた(missed)わけではない.", x: ["乗り遅れたのではなく,電車が止まっている.", "", "行く場所を間違えたとは書かれていない.", "箱を受け取りに行くのは,これから途中でできればという話."] },
      { id: "r35q2", q: "At 9:16 A.M., what does Ms. Tanaka mean when she writes, \"No problem\"?", c: ["She can set up the booth by herself.", "She has already called the printer.", "The event has been postponed.", "Mr. Ford will arrive before visitors come in."], a: 3, ev: [2, 3], d: 700, why: "フォードさんは約40分遅れ(9:55ごろ着).来場者が入るのは10時からなので,それより前に着く.だから「問題ない」.発言の意図は,前後の発言とつないで考える.", x: ["1人でブースを準備できるという意味ではない.", "印刷所にはまだ電話していない(これから電話する).", "催しが延期されたとは書かれていない.", ""] },
      { id: "r35q3", q: "What problem does Ms. Tanaka mention?", c: ["Some materials have not been delivered.", "The booth is too small.", "The brochures contain errors.", "The doors opened late."], a: 0, ev: [5], d: 500, why: "we only got half of the boxes.パンフレットの箱が半分しか届いていない = 一部の資料が届いていない.", x: ["", "ブースが狭いという話ではない.", "パンフレットの誤りの話ではない.", "入場の時刻は10時で,遅れて開いたわけではない."] }
    ]
  },
  {
    id: "r36",
    kind: "お知らせ",
    title: "Notice — Elevator Maintenance at Crestview Tower",
    target: 100,
    s: [
      "To all tenants of Crestview Tower:",
      "Elevators A and B will be out of service on Saturday, October 4, from 8:00 A.M. to 5:00 P.M. for annual safety inspections.",
      "Elevator C, located near the loading dock, will remain in operation during this time.",
      "Tenants expecting deliveries that day are advised to inform their suppliers in advance.",
      "We also ask that you avoid moving large furniture in the building on that date.",
      "We appreciate your understanding. — Building Management Office"
    ],
    ja: "クレストビュー・タワーの入居者の皆様へ.エレベーター A と B は,年1回の安全点検のため,10月4日(土)午前8時から午後5時まで運転を停止する.荷物の搬入口の近くにあるエレベーター C は,この間も運転する.その日に配達がある入居者は,前もって仕入先に知らせておくこと.その日は,建物内で大きな家具を運ぶのも避けてほしい.ご理解に感謝する.ビル管理事務所.",
    qs: [
      { id: "r36q1", q: "What is the purpose of the notice?", c: ["To announce a new elevator", "To inform tenants of a temporary service interruption", "To ask tenants to move out", "To introduce a new delivery company"], a: 1, ev: [1], d: 500, why: "エレベーターが点検のため一時的に止まることを知らせている.out of service(運転停止)= service interruption.", x: ["新しいエレベーターの知らせではない.", "", "入居者に出ていくよう頼んではいない.", "新しい配送業者の紹介ではない."] },
      { id: "r36q2", q: "What is indicated about Elevator C?", c: ["It will be inspected first.", "It is used only by managers.", "It is out of order.", "It can be used on October 4."], a: 3, ev: [2], d: 400, why: "will remain in operation during this time.点検の日も動いているので使える.", x: ["最初に点検されるとは書かれていない(点検されるのは A と B).", "管理者だけが使うとは書かれていない.", "故障しているわけではない(動き続ける).", ""] },
      { id: "r36q3", q: "What are tenants asked to do?", c: ["Let suppliers know about the situation", "Use the stairs only", "Leave the building by 5:00 P.M.", "Report any problems with the elevators"], a: 0, ev: [3], d: 700, why: "are advised to inform their suppliers in advance.inform = let 〜 know.be advised to do は「〜するよう勧められる」= 依頼の言い方.", x: ["", "階段だけを使うようには書かれていない(C は使える).", "午後5時までに建物を出るようには書かれていない.", "エレベーターの不具合を報告するようには書かれていない."] }
    ]
  },
  {
    id: "r37",
    kind: "広告",
    title: "Swift Wash — Professional Laundry for Busy People",
    target: 110,
    s: [
      "Too busy to do your laundry? Let Swift Wash take care of it.",
      "Simply leave your clothes in one of our bags at your front door by 9:00 A.M.",
      "We will pick them up, wash and fold them, and return them the next day.",
      "Our standard rate is $2 per kilogram, with a minimum charge of $10.",
      "Dry cleaning for suits and dresses is also available for an additional fee.",
      "First-time customers receive their first bag free when they sign up through our mobile app.",
      "Service is currently available only in the Eastside and Riverbank areas."
    ],
    ja: "忙しくて洗濯ができない? スウィフトウォッシュにお任せを.午前9時までに,当社の袋に衣類を入れて玄関前に置くだけ.回収し,洗ってたたみ,翌日お返しする.通常料金は1キロ2ドル,最低料金は10ドル.スーツやドレスのドライクリーニングも追加料金で受け付ける.初めての客は,スマホのアプリから申し込むと最初の1袋が無料.サービスは今のところイーストサイドとリバーバンク地区だけ.",
    qs: [
      { id: "r37q1", q: "What kind of business is Swift Wash?", c: ["A clothing store", "A laundry service", "A delivery company", "A dressmaker"], a: 1, ev: [0, 2], d: 300, why: "laundry(洗濯物)を回収して洗う.洗濯のサービス.", x: ["服を売る店ではない.", "", "配達の会社ではない(洗濯物を回収するのはサービスの一部).", "服を仕立てる店ではない."] },
      { id: "r37q2", q: "How much would a customer pay for 3 kilograms of clothes?", c: ["$2", "$10", "$6", "$13"], a: 1, ev: [3], d: 900, why: "3キロ × 2ドル = 6ドルだが,最低料金(minimum charge)が10ドルなので10ドル.計算した後に条件を確かめる.", x: ["2ドルは1キロの料金.", "", "6ドルは3キロ × 2ドルだが,最低料金10ドルより安いので10ドルになる.", "13ドルという計算は本文から出てこない."] },
      { id: "r37q3", q: "How can new customers get a free service?", c: ["By registering with an app", "By living in the Eastside area", "By ordering dry cleaning", "By leaving a bag before 9:00 A.M."], a: 0, ev: [5], d: 600, why: "when they sign up through our mobile app.sign up = register.アプリで申し込むと最初の1袋が無料.", x: ["", "イーストサイドに住んでいることは,サービスを使える条件で,無料の条件ではない.", "ドライクリーニングは追加料金.", "午前9時までに袋を出すのは,いつもの使い方."] }
    ]
  },
  {
    id: "r38",
    kind: "メール",
    title: "From: Olivia Grant / To: Sales Team / Subject: Quarterly targets",
    target: 140,
    s: [
      "Hi team,",
      "I'm pleased to report that we exceeded our sales target for the second quarter by 8 percent.",
      "This success was largely due to the new corporate accounts that Tom and Aisha brought in.",
      "For the third quarter, management has raised our target by 15 percent.",
      "To help us reach it, the company has approved two additional positions for our team, and interviews will begin next week.",
      "I would also like each of you to send me a list of three potential clients by Friday.",
      "We will discuss these lists at our meeting on Monday morning.",
      "Thank you all for your hard work.",
      "Olivia"
    ],
    ja: "チームの皆さん.第2四半期の売上目標を8%上回ったことを報告でき,うれしく思います.この成功は,主にトムとアイシャが獲得した新しい法人の取引先によるものです.第3四半期について,経営陣は目標を15%引き上げました.達成を助けるため,会社はチームの人員を2人増やすことを承認し,来週から面接が始まります.また,金曜日までに,見込みのある顧客を3社ずつリストにして送ってください.月曜の朝の会議でそのリストについて話し合います.皆さんの努力に感謝します.",
    qs: [
      { id: "r38q1", q: "What is the main purpose of the e-mail?", c: ["To announce a new manager", "To report results and explain the next goal", "To introduce new clients to the team", "To cancel a meeting"], a: 1, ev: [1, 3], d: 600, why: "前半で第2四半期の結果(目標を上回った),後半で第3四半期の目標と対策を伝えている.", x: ["新しい部長の紹介ではない.", "", "新しい顧客をチームに紹介するメールではない.", "会議を取り消すメールではない(月曜に会議がある)."] },
      { id: "r38q2", q: "According to the e-mail, why did the team do well?", c: ["Prices were lowered.", "The team grew larger.", "The market for the product expanded.", "Two members gained new business clients."], a: 3, ev: [2], d: 800, why: "due to the new corporate accounts that Tom and Aisha brought in.corporate account(法人の取引先)= business client.人員増はこれからのことで,原因ではない.", x: ["値下げした話は出てこない.", "人員が増えるのはこれからで,好調の原因ではない.", "市場が広がったとは書かれていない.", ""] },
      { id: "r38q3", q: "What are team members asked to do by Friday?", c: ["Interview job candidates", "Prepare for a client visit", "Report their sales figures", "Submit names of possible customers"], a: 3, ev: [5], d: 700, why: "send me a list of three potential clients by Friday.potential client(見込み客)= possible customer.面接は会社が来週始めるもの.", x: ["面接は会社が来週から行うもので,メンバーへの依頼ではない.", "顧客の訪問の準備は頼まれていない.", "売上の数字を報告するよう頼まれてはいない.", ""] }
    ]
  },
  {
    id: "r39",
    kind: "記事",
    title: "Greenport Times — New Bike-Sharing Program Launches",
    target: 150,
    s: [
      "Greenport residents now have a new way to get around the city.",
      "Last Monday, the city launched a bike-sharing program with 300 bicycles at 25 stations downtown.",
      "Users can unlock a bike with a smartphone app and return it to any station.",
      "The first 30 minutes of each ride are free, after which a fee of $1 is charged for every additional 15 minutes.",
      "City officials hope the program will reduce traffic and encourage healthier habits.",
      "According to Deputy Mayor Clara Ruiz, more than 2,000 people registered during the first week, far more than the city had anticipated.",
      "Because of this strong demand, the city plans to add 15 stations in residential neighborhoods by next summer."
    ],
    ja: "グリーンポートの住民に,市内を移動する新しい手段ができた.先週の月曜日,市は中心街の25か所の駐輪場に300台の自転車を置く自転車シェアの仕組みを始めた.利用者はスマホのアプリで自転車のかぎを開け,どの駐輪場に返してもよい.1回の利用の最初の30分は無料で,その後は15分ごとに1ドルかかる.市の職員は,この仕組みが渋滞を減らし,健康的な習慣を促すことを期待している.ルイス副市長によると,最初の1週間で2000人を超える人が登録し,市の予想をはるかに上回った.この強い需要を受け,市は来年の夏までに住宅地に15か所の駐輪場を加える計画だ.",
    qs: [
      { id: "r39q1", q: "How much would a 60-minute ride cost?", c: ["Nothing", "$2", "$1", "$4"], a: 1, ev: [3], d: 1000, why: "最初の30分は無料.残り30分は15分ごとに1ドルなので2ドル.60分すべてに料金がかかるわけではない.", x: ["無料なのは最初の30分だけ.", "", "1ドルは15分ぶんの料金.残り30分は2ドル.", "4ドルは60分すべてに料金がかかると考えた額."] },
      { id: "r39q2", q: "What is suggested about the number of registrations?", c: ["It was lower than expected.", "It was higher than the city predicted.", "It included only downtown workers.", "It will be limited to 2,000."], a: 1, ev: [5], d: 900, why: "far more than the city had anticipated(市の予想をはるかに上回った).anticipate = predict.", x: ["予想より少なかったのではなく,はるかに多かった.", "", "中心街で働く人だけとは書かれていない.", "2000人までに制限するとは書かれていない."] },
      { id: "r39q3", q: "What will the city most likely do next?", c: ["Raise the fees", "Remove some bicycles", "Close downtown stations", "Expand the program to more areas"], a: 3, ev: [6], d: 700, why: "plans to add 15 stations in residential neighborhoods.住宅地に駐輪場を加える = 対象地域を広げる.", x: ["料金を上げるとは書かれていない.", "自転車を減らすとは書かれていない.", "中心街の駐輪場を閉めるとは書かれていない.", ""] }
    ]
  },
  {
    id: "r40",
    kind: "求人広告",
    title: "Harper & Lane Publishing — Part-Time Editorial Assistant",
    target: 120,
    s: [
      "Harper & Lane Publishing is looking for a part-time editorial assistant to join our children's books department.",
      "Duties include checking manuscripts for errors, communicating with authors, and updating our online catalog.",
      "The position requires 20 hours per week, and hours are flexible.",
      "Candidates should have excellent writing skills and strong attention to detail.",
      "Previous experience in publishing is helpful but not essential.",
      "This position may lead to a full-time role after six months.",
      "Please submit a cover letter and a short writing sample through our Web site by May 30."
    ],
    ja: "ハーパー&レーン出版は,児童書部門で働くパートタイムの編集助手を募集している.仕事は原稿の誤りの確認,著者との連絡,オンラインの目録の更新など.週20時間で,勤務時間は融通がきく.応募者には,優れた文章力と細部への注意力が求められる.出版の経験はあれば役立つが,必須ではない.6か月後に正社員になれる可能性がある.5月30日までに,Web サイトから送り状と短い文章の見本を提出すること.",
    qs: [
      { id: "r40q1", q: "What is one responsibility of the position?", c: ["Writing children's books", "Designing book covers", "Selling books to stores", "Reviewing texts for mistakes"], a: 3, ev: [1], d: 600, why: "checking manuscripts for errors.manuscript(原稿)= text,error = mistake.", x: ["児童書を書く仕事ではない(原稿を確認する).", "表紙をデザインする仕事は書かれていない.", "店に本を売る仕事は書かれていない.", ""] },
      { id: "r40q2", q: "What is NOT a requirement for the job?", c: ["Writing ability", "Experience in publishing", "Careful attention to detail", "Availability for 20 hours a week"], a: 1, ev: [3, 4, 2], d: 800, why: "Previous experience in publishing is helpful but not essential.経験は必須ではない.文章力・細部への注意・週20時間は求められている.", x: ["文章力は求められている.", "", "細部への注意力は求められている.", "週20時間の勤務は求められている."] },
      { id: "r40q3", q: "What is mentioned about the position?", c: ["It could become a full-time job.", "It is located overseas.", "It starts on May 30.", "It requires working on weekends."], a: 0, ev: [5], d: 700, why: "may lead to a full-time role after six months.full-time role = full-time job.5月30日は応募の締め切り.", x: ["", "海外の職場だとは書かれていない.", "5月30日は応募の締め切りで,働き始める日ではない.", "週末の勤務が必要とは書かれていない(時間は融通がきく)."] }
    ]
  },
  {
    id: "r41",
    kind: "レビュー",
    title: "Customer Review — Taste of Lima Restaurant ★★★☆☆",
    target: 120,
    s: [
      "I visited Taste of Lima last Friday with three colleagues to celebrate a project's completion.",
      "The food was outstanding; the grilled fish in particular was the best I have had in years.",
      "However, the service did not match the quality of the food.",
      "We had a reservation for 7:00 P.M., but we were not seated until 7:40.",
      "Our server was friendly but seemed to have too many tables to manage.",
      "When I mentioned the wait to the manager, she apologized and offered us a free dessert.",
      "I would return for the food, but I would probably avoid busy weekend evenings.",
      "— Daniel Wu"
    ],
    ja: "先週の金曜日,事業の完了を祝うため,同僚3人とテイスト・オブ・リマを訪れた.料理はすばらしく,特に焼き魚はここ数年で最高だった.しかし,サービスは料理の質に見合っていなかった.午後7時に予約していたのに,席に着けたのは7時40分だった.担当の給仕係は感じが良かったが,受け持つテーブルが多すぎるようだった.支配人に待ち時間のことを伝えると,彼女は謝り,無料のデザートを出してくれた.料理のためにまた行くつもりだが,混む週末の夜はたぶん避けるだろう.",
    qs: [
      { id: "r41q1", q: "Why did Mr. Wu go to the restaurant?", c: ["To meet a client", "To celebrate with coworkers", "To write a review for a magazine", "To attend a cooking event"], a: 1, ev: [0], d: 500, why: "with three colleagues to celebrate a project's completion.colleague = coworker.", x: ["顧客と会うためではない(同僚との祝い).", "", "雑誌に批評を書くためではない.", "料理の催しに出るためではない."] },
      { id: "r41q2", q: "What did Mr. Wu complain about?", c: ["The price of the food", "The taste of the fish", "The attitude of the manager", "The length of time he waited"], a: 3, ev: [3], d: 500, why: "7時の予約で7時40分まで席に着けなかった = 待ち時間の長さ.給仕係も支配人も対応は良かったと書いている.", x: ["料理の値段への不満は書かれていない.", "魚はむしろ最高だったとほめている.", "支配人は謝って無料のデザートを出してくれた.", ""] },
      { id: "r41q3", q: "What does Mr. Wu suggest about the restaurant?", c: ["It should hire more staff.", "It is too expensive.", "It will close on weekends.", "It has a limited menu."], a: 0, ev: [4, 6], d: 1200, why: "給仕係が「受け持つテーブルが多すぎる」ように見えた → 人手が足りない.はっきり書いていないことを推測させる問題.メニューの種類や値段については書かれていない.", x: ["", "値段が高すぎるとは書かれていない.", "週末に閉まるとは書かれていない(週末は混む).", "メニューの種類については書かれていない."] }
    ]
  },
  {
    id: "r42",
    kind: "料金表",
    title: "Clearview Internet — Home Plans",
    target: 120,
    s: [
      { t: "table", head: ["Plan", "Speed", "Monthly fee", "Contract"], rows: [
        ["Lite", "100 Mbps", "$25", "None"],
        ["Standard", "300 Mbps", "$40", "1 year"],
        ["Premium", "1 Gbps", "$60", "2 years"]
      ] },
      "All plans include unlimited data and free installation.",
      "Customers who choose a plan with a contract receive a free wireless router.",
      "Customers on the Lite plan may rent a router for $5 per month.",
      "If you cancel a contract early, a fee of $100 will be charged."
    ],
    ja: "[表:ライト 100Mbps 月25ドル 契約期間なし,スタンダード 300Mbps 月40ドル 1年,プレミアム 1Gbps 月60ドル 2年] すべてのプランはデータ無制限で,設置は無料.契約期間のあるプランを選んだ客には,無線ルーターを無料で渡す.ライトプランの客は,月5ドルでルーターを借りられる.契約を途中で解約すると100ドルの料金がかかる.",
    qs: [
      { id: "r42q1", q: "Which plan does not require a contract?", c: ["Lite", "Standard", "Premium", "All of them"], a: 0, ev: [[0, 0]], d: 300, why: "表の Contract の列で None(なし)になっているのは Lite.", x: ["", "スタンダードは1年の契約.", "プレミアムは2年の契約.", "契約のないプランは Lite だけで,全部ではない."] },
      { id: "r42q2", q: "How much would a Lite customer pay each month including a router?", c: ["$25", "$30", "$40", "$45"], a: 1, ev: [[0, 0], 3], d: 800, why: "Lite は月25ドル.ルーターは契約のないプランでは無料にならず,月5ドルで借りる.25 + 5 = 30ドル.", x: ["25ドルは月額だけで,ルーターの5ドルが入っていない.", "", "40ドルはスタンダードの月額.", "45ドルという計算は本文から出てこない."] },
      { id: "r42q3", q: "What is true about all three plans?", c: ["They come with a free router.", "They have the same speed.", "They can be canceled without a fee.", "They do not charge for setup."], a: 3, ev: [1], d: 700, why: "All plans include ... free installation.installation(設置)= setup.無料ルーターは契約のあるプランだけ.", x: ["無料のルーターは契約のあるプランだけ.", "速さはプランごとに違う.", "途中で解約すると100ドルかかる.", ""] }
    ]
  },
  {
    id: "r43",
    kind: "グラフつき記事",
    title: "Coastal Tourism Report — Visitor Numbers",
    target: 150,
    s: [
      "The Bayfield Tourism Board released its annual report on Thursday.",
      { t: "bar", cap: "Visitors to Bayfield by season (thousands)", unit: "", items: [["Spring", 45], ["Summer", 120], ["Fall", 60], ["Winter", 15]] },
      "As in previous years, summer was by far the busiest season, driven by the town's beaches and outdoor festivals.",
      "Fall numbers rose by 25 percent from last year, which the board attributes to a new food and wine festival held in October.",
      "Winter, however, continues to attract few visitors, and several hotels close entirely from December to February.",
      "To change this, the board will promote indoor attractions such as the maritime museum and local hot springs in a winter advertising campaign."
    ],
    ja: "ベイフィールド観光局は木曜日に年次報告書を発表した.[グラフ:季節ごとの訪問者数(千人):春45,夏120,秋60,冬15] 例年どおり,浜辺と屋外の祭りによって,夏が飛び抜けて忙しい季節だった.秋の訪問者は前年から25%増え,観光局はこれを10月に開いた新しい食とワインの祭りのおかげだとしている.しかし,冬は相変わらず訪問者が少なく,12月から2月まで完全に休業するホテルもある.これを変えるため,観光局は冬の広告で海洋博物館や地元の温泉など屋内の名所を宣伝する.",
    qs: [
      { id: "r43q1", q: "How many people visited Bayfield in the fall?", c: ["15,000", "60,000", "45,000", "120,000"], a: 1, ev: [[1, 2]], d: 400, why: "グラフの Fall は 60.単位は thousands(千人)なので60,000人.", x: ["15,000人は冬.", "", "45,000人は春.", "120,000人は夏."] },
      { id: "r43q2", q: "According to the report, what caused the increase in fall visitors?", c: ["Lower hotel prices", "A new event", "Better weather", "A new museum"], a: 1, ev: [3], d: 900, why: "attributes to a new food and wine festival.attribute A to B は「A を B のおかげ・せいだと考える」.festival = event.", x: ["ホテルの値下げの話は出てこない.", "", "天気が良かったとは書かれていない.", "新しい博物館の話は出てこない(海洋博物館は冬の宣伝の例)."] },
      { id: "r43q3", q: "What does the tourism board plan to do?", c: ["Hold a festival in winter", "Build new hotels", "Advertise activities that can be enjoyed indoors", "Close the beaches in winter"], a: 2, ev: [5], d: 1000, why: "will promote indoor attractions ... in a winter advertising campaign.冬の祭りを開くとは書いていない(祭りは10月の話).", x: ["冬に祭りを開くとは書かれていない(祭りは10月).", "新しいホテルを建てるとは書かれていない.", "", "冬に浜辺を閉めるとは書かれていない."] }
    ]
  },
  {
    id: "r44",
    kind: "メール2通",
    title: "E-mails — Conference speaker",
    target: 180,
    s: [
      "From: Linda Park / To: Dr. Samuel Osei / Date: February 2",
      "Dear Dr. Osei,",
      "On behalf of the National Nursing Association, I would like to invite you to give the opening speech at our annual conference in Denver on April 18.",
      "The theme this year is \"Technology in Patient Care,\" and your recent research on digital health records would be of great interest to our members.",
      "We will cover your travel and two nights of accommodation, and we can offer a speaker's fee of $1,500.",
      "Could you let me know by February 15 whether you are available?",
      { t: "doc", title: "From: Samuel Osei / To: Linda Park / Date: February 9" },
      "Dear Ms. Park,",
      "Thank you for your kind invitation.",
      "Unfortunately, I will be attending a workshop in Toronto on April 18 and will not be able to give the opening speech.",
      "However, I could speak on the morning of April 19 if that would work for your schedule.",
      "Alternatively, my colleague Dr. Hannah Lee, who worked with me on the research, would be an excellent speaker on the topic."
    ],
    ja: "[1通目:2月2日 パークさんから] 全国看護協会を代表して,4月18日にデンバーで開く年次大会の基調講演をお願いしたい.今年のテーマは「患者の看護における技術」で,あなたの電子カルテについての最近の研究は会員にとって大変興味深いはずだ.交通費と2泊分の宿泊費は協会が負担し,講演料は1500ドルを出せる.2月15日までに都合を知らせてほしい.[2通目:2月9日 オセイ博士から] ご招待に感謝する.残念ながら,4月18日はトロントの講習会に出席するため,基調講演はできない.ただ,そちらの予定に合うなら4月19日の午前に話すことはできる.あるいは,研究を一緒に行った同僚のハンナ・リー博士なら,このテーマのすばらしい講演者になるだろう.",
    qs: [
      { id: "r44q1", q: "Why did Ms. Park contact Dr. Osei?", c: ["To ask him to give a talk", "To invite him to join the association", "To request a copy of his research", "To arrange a workshop in Toronto"], a: 0, ev: [2], d: 500, why: "invite you to give the opening speech.give a speech = give a talk.", x: ["", "協会に入るよう誘ってはいない.", "研究の写しを求めてはいない.", "トロントの講習会は,博士が出席する別の予定."] },
      { id: "r44q2", q: "What is NOT offered to Dr. Osei?", c: ["Payment for speaking", "Hotel accommodation", "Travel expenses", "A conference membership"], a: 3, ev: [4], d: 900, why: "交通費(travel),2泊の宿泊(accommodation),講演料(speaker's fee)は書かれている.会員資格はどこにもない.", x: ["講演料(speaker's fee)は書かれている.", "2泊の宿泊は書かれている.", "交通費は書かれている.", ""] },
      { id: "r44q3", q: "What does Dr. Osei suggest?", c: ["Moving the conference to Toronto", "Changing the theme of the conference", "Having another researcher speak", "Reducing the speaker's fee"], a: 2, ev: [11], d: 1100, why: "Alternatively(あるいは),同僚のリー博士を講演者として推している = 別の研究者に話してもらう.もう1つの提案(19日の午前)は選択肢にない.", x: ["大会をトロントに移すことは提案していない.", "大会のテーマを変えることは提案していない.", "", "講演料を下げることは提案していない."] }
    ]
  },
  {
    id: "r45",
    kind: "社内メモ",
    title: "MEMO — To: All staff / From: Facilities / Re: Office recycling program",
    target: 140,
    s: [
      "Starting next Monday, we will introduce a new recycling program on every floor.",
      "Each kitchen area will have three separate bins: blue for paper, green for bottles and cans, and black for general waste.",
      "Please rinse bottles and cans before placing them in the green bin.",
      "Confidential documents should not be placed in the blue bins; instead, put them in the locked shredding boxes next to the printers.",
      "The bins will be emptied every evening by our cleaning contractor.",
      "Last year, our office sent nearly eight tons of waste to landfills, and we aim to cut that amount in half.",
      "If you have suggestions for reducing waste, please send them to facilities@coremark.example."
    ],
    ja: "来週の月曜日から,すべての階で新しいリサイクルの仕組みを導入する.各給湯室に3つの分別ごみ箱を置く.青は紙,緑は瓶と缶,黒は一般ごみ.瓶と缶は,ゆすいでから緑の箱に入れること.機密書類は青い箱に入れず,プリンターの横にある鍵付きの裁断用ボックスに入れること.ごみ箱は毎晩,清掃業者が空にする.昨年,当社の事務所はおよそ8トンのごみを埋め立て地に送った.この量を半分にすることを目指す.ごみを減らす提案があれば,施設管理部まで送ってほしい.",
    qs: [
      { id: "r45q1", q: "Where should employees put an empty juice bottle?", c: ["In the blue bin", "In the green bin", "In the black bin", "In a shredding box"], a: 1, ev: [1, 2], d: 400, why: "green for bottles and cans.ゆすいでから緑の箱へ.", x: ["青い箱は紙用.", "", "黒い箱は一般ごみ用.", "裁断用ボックスは機密書類用."] },
      { id: "r45q2", q: "What should be done with confidential papers?", c: ["They should be recycled in the blue bins.", "They should be returned to their owners.", "They should be placed in secure boxes.", "They should be taken home."], a: 2, ev: [3], d: 800, why: "locked shredding boxes(鍵付きの裁断用ボックス)に入れる.locked = secure.紙でも機密書類は青い箱ではない.", x: ["機密書類は青い箱に入れない.", "持ち主に返すとは書かれていない.", "", "家に持ち帰るとは書かれていない."] },
      { id: "r45q3", q: "What is the goal of the program?", c: ["To reduce landfill waste by 50 percent", "To save eight tons of paper", "To hire a new cleaning company", "To lower the cost of printing"], a: 0, ev: [5], d: 900, why: "8トンを埋め立て地に送った → cut that amount in half(半分に減らす)= 50% 減らす.8トンを節約するのではない.", x: ["", "8トンは埋め立て地に送ったごみの量で,紙を節約する量ではない.", "新しい清掃業者を雇う話ではない.", "印刷の費用を下げる話ではない."] }
    ]
  },
  {
    id: "r46",
    kind: "予定表とメール",
    title: "Lindon Library — Free Computer Classes (November)",
    target: 170,
    s: [
      { t: "table", head: ["Class", "Day", "Time", "Level"], rows: [
        ["E-mail basics", "Mon., Nov. 3", "10:00–11:30 A.M.", "Beginner"],
        ["Making spreadsheets", "Wed., Nov. 5", "6:00–8:00 P.M.", "Intermediate"],
        ["Online safety", "Sat., Nov. 8", "1:00–2:30 P.M.", "Beginner"],
        ["Building a Web site", "Wed., Nov. 12", "6:00–8:00 P.M.", "Advanced"]
      ] },
      "Classes are free, but registration is required because each class is limited to 12 people.",
      "Participants may bring their own laptops; otherwise, library computers will be provided.",
      { t: "doc", title: "E-mail — From: George Adams / To: Lindon Library / Date: October 28" },
      "Hello,",
      "I am retired and just bought my first computer, so I would like to learn how to send messages to my family.",
      "I volunteer at a hospital on weekday mornings, so I am only free in the afternoons, evenings, and on weekends.",
      "Is there a class that would suit me?"
    ],
    ja: "[表:リンドン図書館の無料パソコン教室(11月):メールの基本 11月3日(月)午前10時〜11時半 初級,表計算の作成 5日(水)午後6〜8時 中級,ネットの安全 8日(土)午後1時〜2時半 初級,Web サイトの作成 12日(水)午後6〜8時 上級] 教室は無料だが,各回12人までなので登録が必要.自分のノートパソコンを持ってきてもよい.なければ図書館のパソコンを用意する.[メール:10月28日 アダムズさんから] 退職して初めてパソコンを買ったので,家族にメッセージを送る方法を学びたい.平日の午前は病院でボランティアをしているので,空いているのは午後と夜と週末だけ.自分に合う教室はあるか.",
    qs: [
      { id: "r46q1", q: "Why is registration necessary?", c: ["Classes have a fee.", "The number of participants is limited.", "Laptops must be reserved.", "Classes are held online."], a: 1, ev: [1], d: 500, why: "registration is required because each class is limited to 12 people.人数に限りがあるから.無料なので費用のためではない.", x: ["教室は無料.", "", "ノートパソコンを予約する必要はない(持参か図書館のもの).", "教室はオンラインではない."] },
      { id: "r46q2", q: "Which class matches Mr. Adams's interest?", c: ["E-mail basics", "Making spreadsheets", "Online safety", "Building a Web site"], a: 0, ev: [5, [0, 0]], d: 600, why: "家族にメッセージを送る方法を学びたい → E-mail basics(メールの基本).", x: ["", "表計算は家族にメッセージを送ることと関係がない.", "ネットの安全は目的に合わない.", "Web サイトの作成は上級で,目的にも合わない."] },
      { id: "r46q3", q: "What problem will Mr. Adams most likely have with that class?", c: ["It is too advanced for him.", "It is full.", "He has to bring his own computer.", "It is scheduled when he is busy."], a: 3, ev: [[0, 0], 6], d: 1300, why: "メールの基本は月曜の午前10時.アダムズさんは平日の午前はボランティアで空いていない.表とメールの都合を合わせると,時間が合わないと分かる.", x: ["メールの基本は初級なので,難しすぎることはない.", "満員とは書かれていない.", "図書館のパソコンを使えるので,持参する必要はない.", ""] }
    ]
  },
  {
    id: "r47",
    kind: "記事",
    title: "Tech Business Review — Startup Secures Funding",
    target: 170,
    s: [
      "Farmlink, a startup that connects small farms directly with restaurants, has raised $12 million from a group of investors led by Northstar Capital.",
      "Founded three years ago by former chef Marta Silva, the company operates an online marketplace where restaurants can order produce that is harvested the same morning.",
      "Ms. Silva said she started the company after struggling to find fresh, reasonably priced vegetables for her own restaurant.",
      "Farmlink currently works with about 400 farms and 1,500 restaurants in three states.",
      "The new funds will be used primarily to build refrigerated warehouses, which will allow the company to serve customers farther from the farms.",
      "Some analysts, however, question whether the company can remain profitable while expanding so quickly, noting that delivery costs have risen sharply this year.",
      "Ms. Silva responded that the warehouses would actually lower costs by reducing the number of trips its trucks need to make."
    ],
    ja: "小規模農家とレストランを直接結ぶ新興企業ファームリンクは,ノーススター・キャピタルが率いる投資家グループから1200万ドルを調達した.元料理人のシルバ氏が3年前に創業した同社は,その日の朝に収穫された農産物をレストランが注文できるネット上の市場を運営している.シルバ氏は,自分の店のために新鮮で手ごろな野菜を探すのに苦労したことから会社を始めたという.ファームリンクは現在,3つの州で約400の農家と1500のレストランと取引している.新しい資金は主に冷蔵倉庫の建設に使われ,これによって農場から遠い客にもサービスを届けられるようになる.しかし一部の専門家は,今年は配送費が急上昇していることを挙げ,これほど急に拡大しながら利益を出し続けられるのか疑問視している.シルバ氏は,倉庫によってトラックの運行回数が減り,むしろ費用は下がると答えた.",
    qs: [
      { id: "r47q1", q: "What does Farmlink do?", c: ["It runs several restaurants.", "It operates farms in three states.", "It helps restaurants buy produce from farms.", "It trains chefs to cook vegetables."], a: 2, ev: [0, 1], d: 700, why: "connects small farms directly with restaurants / an online marketplace where restaurants can order produce.農家とレストランを結ぶ仲介.自分で農場やレストランを運営しているのではない.", x: ["自分でレストランを運営しているのではない.", "農場を運営しているのではない(農家と取引している).", "", "料理人を育てる会社ではない."] },
      { id: "r47q2", q: "Why did Ms. Silva start the company?", c: ["She wanted to leave the restaurant business.", "She had difficulty getting good ingredients.", "She was asked by investors.", "She owned a large farm."], a: 1, ev: [2], d: 900, why: "struggling to find fresh, reasonably priced vegetables(新鮮で手ごろな野菜を探すのに苦労した)= 良い材料を手に入れるのが難しかった.", x: ["レストランの仕事をやめたかったとは書かれていない.", "", "投資家に頼まれて始めたのではない.", "大きな農場を持っていたとは書かれていない(元料理人)."] },
      { id: "r47q3", q: "What concern do some analysts have?", c: ["That the company is growing too slowly", "That restaurants will stop using the service", "That rising expenses may affect profits", "That the warehouses will be too small"], a: 2, ev: [5], d: 1300, why: "question whether the company can remain profitable ... noting that delivery costs have risen sharply.費用の上昇が利益に響くかもしれない,という懸念.growing too slowly は逆(expanding so quickly).", x: ["成長が遅すぎるのではなく,急に広げすぎることを心配している.", "レストランが使うのをやめるとは書かれていない.", "", "倉庫が小さすぎるとは書かれていない."] }
    ]
  },
  {
    id: "r48",
    kind: "メール",
    title: "From: Brightwater Hotel / To: Ms. Chloe Martin / Subject: Your upcoming stay",
    target: 150,
    s: [
      "Dear Ms. Martin,",
      "Thank you for choosing the Brightwater Hotel for your stay from June 3 to June 6.",
      "We regret to inform you that our swimming pool will be closed for repairs during your visit.",
      "As a gesture of apology, we have upgraded your reservation from a standard room to a suite with an ocean view at no additional charge.",
      "In addition, guests may use the pool at our sister property, the Brightwater Resort, which is a ten-minute drive away.",
      "A complimentary shuttle leaves from our main entrance every hour between 9:00 A.M. and 6:00 P.M.",
      "If you would prefer to change your reservation dates, please reply to this e-mail, and we will waive the usual change fee.",
      "We look forward to welcoming you."
    ],
    ja: "マーティン様.6月3日から6日までのご宿泊にブライトウォーター・ホテルをお選びいただきありがとうございます.残念ながら,ご滞在中はプールが修理のため閉鎖されます.おわびの気持ちとして,追加料金なしで,ご予約を通常の部屋から海の見えるスイートに格上げいたしました.また,車で10分の系列施設ブライトウォーター・リゾートのプールをお使いいただけます.午前9時から午後6時まで,1時間ごとに正面玄関から無料のシャトルが出ます.ご予約の日程を変更されたい場合はこのメールにご返信ください.通常の変更手数料はいただきません.お待ちしております.",
    qs: [
      { id: "r48q1", q: "Why did the hotel write to Ms. Martin?", c: ["To confirm a payment", "To inform her about a facility closure", "To offer her a job", "To ask her to write a review"], a: 1, ev: [2], d: 500, why: "our swimming pool will be closed for repairs.施設(プール)の閉鎖を知らせるメール.", x: ["支払いの確認のメールではない.", "", "仕事の申し出ではない.", "批評を書くよう頼んではいない."] },
      { id: "r48q2", q: "What has the hotel done for Ms. Martin?", c: ["Given her a better room", "Refunded her deposit", "Changed her dates", "Reserved a table at a restaurant"], a: 0, ev: [3], d: 600, why: "upgraded your reservation ... to a suite with an ocean view.より良い部屋に替えた.日程の変更は「希望すれば」の話.", x: ["", "手付金の返金は書かれていない.", "日程の変更は「希望すれば手数料なしでできる」という話で,まだ変えていない.", "レストランの席を予約したとは書かれていない."] },
      { id: "r48q3", q: "What is indicated about the Brightwater Resort?", c: ["It is next to the hotel.", "It charges for pool use.", "It can be reached by a free bus.", "It is closed in June."], a: 2, ev: [4, 5], d: 1100, why: "A complimentary shuttle leaves ... every hour.complimentary(無料の)= free,shuttle = bus.リゾートは車で10分で,隣ではない.", x: ["リゾートは車で10分の所にあり,隣ではない.", "プールの料金は書かれていない(使ってよいと案内している).", "", "6月に閉まるのはホテルのプール."] }
    ]
  },
  {
    id: "r49",
    kind: "比較表",
    title: "Office Chair Comparison — Purchasing Department",
    target: 160,
    s: [
      "The purchasing department compared four office chairs before placing a large order for the new branch.",
      { t: "table", head: ["Chair", "Price", "Adjustable arms", "Warranty", "Rating"], rows: [
        ["Basic 10", "$90", "No", "1 year", "3.2"],
        ["Comfort Plus", "$150", "Yes", "3 years", "4.5"],
        ["ErgoMax", "$240", "Yes", "5 years", "4.7"],
        ["Studio", "$130", "No", "2 years", "4.1"]
      ] },
      "The rating is the average score given by our employees who tested each chair for one week.",
      "Our budget allows a maximum of $160 per chair, and adjustable arms were requested by most testers.",
      "Based on these factors, the department recommends ordering 80 units of the chair that meets both conditions."
    ],
    ja: "購買部は,新しい支店向けに大量に注文する前に4種類の事務いすを比較した.[表:ベーシック10 90ドル 肘掛け調節なし 保証1年 評価3.2,コンフォートプラス 150ドル あり 3年 4.5,エルゴマックス 240ドル あり 5年 4.7,スタジオ 130ドル なし 2年 4.1] 評価は,各いすを1週間試した社員がつけた点数の平均.予算は1脚160ドルまでで,試した人の多くが肘掛けの調節を求めた.これらの要素から,購買部は両方の条件を満たすいすを80脚注文することを勧める.",
    qs: [
      { id: "r49q1", q: "How were the ratings determined?", c: ["By a consumer magazine", "By the manufacturers", "By employees who used the chairs", "By the purchasing manager alone"], a: 2, ev: [2], d: 600, why: "the average score given by our employees who tested each chair.社員が試してつけた点数.", x: ["消費者向けの雑誌ではない.", "メーカーがつけた点数ではない.", "", "購買部長1人がつけた点数ではない."] },
      { id: "r49q2", q: "Which chair has the longest warranty?", c: ["Basic 10", "Comfort Plus", "ErgoMax", "Studio"], a: 2, ev: [[1, 2]], d: 400, why: "Warranty の列で最も長いのは ErgoMax の5年.", x: ["ベーシック10は1年.", "コンフォートプラスは3年.", "", "スタジオは2年."] },
      { id: "r49q3", q: "How much will the recommended order cost in total?", c: ["$7,200", "$10,400", "$12,000", "$19,200"], a: 2, ev: [3, 4, [1, 1]], d: 1400, why: "条件は「1脚160ドル以下」と「肘掛けの調節あり」.両方を満たすのは Comfort Plus(150ドル)だけ.150 × 80 = 12,000ドル.条件で絞ってから計算する.", x: ["7,200ドルはベーシック10(90ドル)× 80脚.肘掛けの調節がない.", "10,400ドルはスタジオ(130ドル)× 80脚.肘掛けの調節がない.", "", "19,200ドルはエルゴマックス(240ドル)× 80脚.予算を超える."] }
    ]
  },
  {
    id: "r50",
    kind: "記事",
    title: "Regional Economy — Port Expansion Raises Hopes and Questions",
    target: 190,
    s: [
      "After years of debate, construction has finally begun on a $300 million expansion of the Port of Westhaven.",
      "Once completed in roughly four years, the project will double the number of container ships the port can handle at one time.",
      "Supporters predict that the expansion will create about 1,200 permanent jobs and attract logistics companies that currently ship through larger ports to the north.",
      "Not everyone shares this optimism.",
      "Residents of the nearby Harborview district worry that increased truck traffic will worsen congestion and air quality in their neighborhood.",
      "In an effort to address these concerns, the port authority has committed to building a dedicated road that will route trucks away from residential streets.",
      "It has also promised to replace older cargo-handling equipment with electric models, which it says will cut emissions at the port by 40 percent.",
      "Critics note, however, that the dedicated road has not yet been funded and may not be finished until two years after the port expansion opens."
    ],
    ja: "長年の議論の末,ウェストヘイブン港の3億ドルの拡張工事がついに始まった.およそ4年後に完成すれば,港が一度に受け入れられるコンテナ船の数は2倍になる.賛成派は,この拡張で約1200人の常勤の雇用が生まれ,今は北の大きな港を使っている物流会社を呼び込めると予測する.だれもがこの楽観を共有しているわけではない.近くのハーバービュー地区の住民は,トラックの交通量が増えて,地区の渋滞と空気の質が悪化することを心配している.こうした懸念に応えるため,港湾局は,トラックを住宅街から遠ざける専用道路の建設を約束した.また,古い荷役機器を電動のものに替えると約束し,これで港の排出ガスが40%減るとしている.しかし批判的な人々は,専用道路にはまだ予算がついておらず,港の拡張部分が開業してから2年後まで完成しないかもしれないと指摘する.",
    qs: [
      { id: "r50q1", q: "What will the expansion allow the port to do?", c: ["Build electric ships", "Handle more ships at once", "Move to a new location", "Reduce its number of employees"], a: 1, ev: [1], d: 900, why: "double the number of container ships the port can handle at one time.一度に扱える船の数が2倍 = より多くの船を同時に扱える.", x: ["電気の船を造るとは書かれていない(電気になるのは荷役の機器).", "", "港を移すとは書かれていない.", "従業員を減らすのではなく,雇用が増える見込み."] },
      { id: "r50q2", q: "Why are some Harborview residents worried?", c: ["They expect more trucks near their homes.", "They will lose their jobs.", "Their homes will be torn down.", "Ship traffic will block their views."], a: 0, ev: [4], d: 1000, why: "increased truck traffic will worsen congestion and air quality in their neighborhood.近所でトラックが増えることを心配している.", x: ["", "仕事を失う心配は書かれていない.", "家が取り壊される話は出てこない.", "船で景色がさえぎられる話は出てこない."] },
      { id: "r50q3", q: "What problem do critics point out?", c: ["The electric equipment is too expensive.", "The port expansion will take longer than four years.", "The new road may not be ready when it is needed.", "The road will pass through residential streets."], a: 2, ev: [5, 7], d: 1600, why: "専用道路はまだ予算がなく,港の拡張部分の開業から2年後まで完成しないかもしれない.トラックが増える時点で道路が間に合わない,ということ.「住宅街を通る」は逆で,道路は住宅街を避けるためのもの.", x: ["電動の機器が高すぎるという指摘ではない.", "港の拡張が4年より長くかかるとは書かれていない.", "", "道路は住宅街を避けるためのもので,通るのではない."] }
    ]
  },

  // ---- Part 6(長文の穴埋め).本文の [1]〜[4] が空所.part6: true ----
  {
    id: "r51", part6: true,
    kind: "Part 6 メール",
    title: "To: All employees / Subject: New parking system",
    target: 150,
    s: [
      "Starting on March 1, employees will need a new electronic pass to enter the company parking lot.",
      "Passes will be [1] at the security office on the first floor from February 20 to 28.",
      "To receive your pass, please bring your employee ID card.",
      "[2]",
      "Employees who do not have a pass by March 1 will [3] to park on the street until they receive one.",
      "[4], visitors will continue to use the guest parking area near the main entrance.",
      "Thank you for your cooperation."
    ],
    ja: "3月1日から,社員は会社の駐車場に入るために新しい電子パスが必要になる.パスは2月20日から28日まで,1階の警備室で配布される.受け取るには社員証を持ってくること.[パスは1人1枚で,ほかの人に貸してはならない.] 3月1日までにパスを持っていない社員は,受け取るまで路上に駐車しなければならない.なお,来客は引き続き正面玄関近くの来客用駐車場を使う.ご協力に感謝する.",
    qs: [
      { id: "r51q1", q: "(1)", c: ["distribute", "distributing", "distributed", "distribution"], a: 2, ev: [1], d: 600, why: "Passes will be ___ で,パスは「配られる」側なので受動態.will be + 過去分詞 distributed.", x: ["原形は be の後ろに置けない(受動態にならない).", "will be distributing は「配っている最中だ」で,主語 Passes(物)が配る側になってしまう.", "", "名詞.Passes will be distribution(パスは配布である)では意味が通らない."] },
      { id: "r51q2", q: "(2)", c: ["Each pass may be used by one person only.", "The parking lot was built last year.", "Please return your ID card after the meeting.", "Visitors must also apply for a pass."], a: 0, ev: [2, 3, 4], d: 1000, why: "前の文はパスの受け取り方,後ろの文はパスがない場合の話.その間に入るのは,パスの使い方についての補足.文を入れる問題は,前後の話題をつなぐ文を選ぶ.", x: ["", "駐車場がいつできたかは,パスの話の流れと関係がない.", "社員証は受け取るときに見せるもので,返す話は出てこない.", "後ろの文で「来客は引き続き来客用駐車場を使う」とあり,来客もパスが必要という内容と矛盾する."] },
      { id: "r51q3", q: "(3)", c: ["require", "be required", "requiring", "have required"], a: 1, ev: [4], d: 800, why: "社員は「求められる」側.be required to do で「〜しなければならない」.will の後ろなので be required.", x: ["will require to park では「社員が(何かを)要求する」になり,目的語もない.", "", "will の後ろに -ing は置けない(will be requiring なら可だが意味が合わない).", "will have required は未来完了で「求めてしまっているだろう」.主語が求める側になり意味が合わない."] },
      { id: "r51q4", q: "(4)", c: ["Therefore", "In addition", "For example", "However"], a: 1, ev: [5], d: 900, why: "社員の駐車の話に,来客の駐車についての情報を付け加えている.情報の追加は In addition(さらに).", x: ["Therefore(したがって)は前の文が原因で後ろが結果のとき.社員が路上に止めることは,来客が来客用駐車場を使う理由にならない.", "", "For example(例えば)は前の文の具体例を挙げるとき.来客の話は社員の話の例ではない.", "However(しかし)は逆の内容が続くとき.来客の駐車は前の文と対立していない."] }
    ]
  },
  {
    id: "r52", part6: true,
    kind: "Part 6 お知らせ",
    title: "Westfield Community Pool — Summer Hours",
    target: 140,
    s: [
      "The Westfield Community Pool will open for the summer season on June 1.",
      "This year, the pool will stay open until 9:00 P.M. on weekdays, two hours [1] than last year.",
      "The change was made in response to requests from residents who work during the day.",
      "[2]",
      "Swimming lessons for children will be offered every Saturday morning, and [3] is now open on our Web site.",
      "Because space is limited, we recommend signing up [4]."
    ],
    ja: "ウェストフィールド市民プールは6月1日に夏の営業を始める.今年は平日の午後9時まで開いており,昨年より2時間遅くまで営業する.この変更は,日中に働く住民の要望に応えたものだ.[週末の営業時間は昨年と同じ.] 子ども向けの水泳教室は毎週土曜の午前に開かれ,Web サイトで申し込みの受付が始まっている.定員があるので,早めの申し込みを勧める.",
    qs: [
      { id: "r52q1", q: "(1)", c: ["late", "later", "latest", "lately"], a: 1, ev: [1], d: 600, why: "than があるので比較級 later.「昨年より2時間遅く」.", x: ["原級は than と組めない.", "", "最上級は than と組めない(the latest のように the と使う).", "lately は「最近」という別の意味の副詞."] },
      { id: "r52q2", q: "(2)", c: ["The pool was closed for repairs last month.", "Weekend hours will remain the same as last year.", "Many residents work at night.", "The lessons are free for adults."], a: 1, ev: [1, 3], d: 1100, why: "前の文までは平日の営業時間が変わる話.それに続けて「週末は変わらない」と営業時間の話を補うのが自然.", x: ["修理の話は前後の営業時間の話とつながらない.", "", "前の文で「日中に働く住民」とあり,夜に働く人の話は出てこない.", "後ろの文は子ども向けの教室の話で,大人の料金は出てこない.話題が飛ぶ."] },
      { id: "r52q3", q: "(3)", c: ["register", "registered", "registration", "registers"], a: 2, ev: [4], d: 700, why: "and の後ろで,is now open の主語になる位置なので名詞 registration(申し込みの受付).", x: ["動詞の原形は主語になれない.", "過去分詞は主語になれない.", "", "3人称単数の動詞で,主語になれない."] },
      { id: "r52q4", q: "(4)", c: ["early", "lately", "rarely", "nearly"], a: 0, ev: [5], d: 800, why: "定員があるので「早めに」申し込むことを勧める.early.", x: ["", "lately(最近)は現在完了と使う語で,勧める内容に合わない.", "rarely(めったに〜ない)では「めったに申し込まないことを勧める」になり意味が逆.", "nearly(ほとんど)は数量や程度を修飾する語で,signing up を修飾しない."] }
    ]
  },
  {
    id: "r53", part6: true,
    kind: "Part 6 手紙",
    title: "Letter — Halden Insurance",
    target: 150,
    s: [
      "Dear Mr. Ortega,",
      "Thank you for being a Halden Insurance customer for the past five years.",
      "We are writing to let you know that your car insurance policy [1] on April 30.",
      "To continue your coverage without interruption, please renew it before that date.",
      "[2], you can renew online in just a few minutes.",
      "As a loyal customer, you are [3] for a 10 percent discount on your next policy.",
      "[4]",
      "Sincerely, Halden Insurance Customer Service"
    ],
    ja: "オルテガ様.5年間ハルデン保険をご利用いただきありがとうございます.お客様の自動車保険の契約は4月30日で切れることをお知らせします.補償を途切れさせずに続けるには,その日までに更新してください.便利なことに,オンラインなら数分で更新できます.長年のお客様として,次の契約は10%引きの対象になります.[ご質問は,平日の午前9時から午後6時まで 555-0190 にお電話ください.]",
    qs: [
      { id: "r53q1", q: "(1)", c: ["expired", "has expired", "will expire", "expiring"], a: 2, ev: [2, 3], d: 700, why: "次の文で「その日までに更新して」とあるので,4月30日はこれからの日付.未来の will expire.", x: ["過去形だと,もう切れたことになり,次の文の「その日までに更新して」と合わない.", "現在完了も「すでに切れた」ことになり,これからの更新の話と合わない.", "", "that 節の中に動詞が必要.-ing だけでは文にならない."] },
      { id: "r53q2", q: "(2)", c: ["Otherwise", "Conveniently", "Instead", "Previously"], a: 1, ev: [4], d: 1000, why: "数分でオンライン更新できるという「便利な」情報を前置きする副詞 Conveniently.", x: ["Otherwise(さもなければ)は「更新しないと」の意味になり,後ろの便利な情報とつながらない.", "", "Instead(代わりに)は,前の内容を否定して別の方法を言うとき.前の文の「更新して」を否定していない.", "Previously(以前は)だと,昔はオンラインで更新できた(今はできない)という意味になってしまう."] },
      { id: "r53q3", q: "(3)", c: ["eligible", "available", "responsible", "capable"], a: 0, ev: [5], d: 900, why: "be eligible for 〜 で「〜の対象になる・資格がある」.割引を受ける資格がある.", x: ["", "be available for は「〜に応じられる・都合がつく」.人が割引の対象であることは表せない.", "be responsible for は「〜に責任がある」.割引に責任があることになる.", "capable は capable of 〜 の形で使い,for とは組まない."] },
      { id: "r53q4", q: "(4)", c: ["Your policy was canceled last year.", "If you have any questions, please call us at 555-0190.", "We have opened a new office in Madrid.", "Please pay the late fee immediately."], a: 1, ev: [6, 7], d: 900, why: "手紙の結び(Sincerely)の直前なので,問い合わせ先を案内する文が自然.", x: ["5年間の顧客で,これから更新する話なので,昨年取り消されたという内容と矛盾する.", "", "新しい事務所の話は,更新の案内と関係がない.", "まだ期限前なので,延滞料の話は合わない."] }
    ]
  },
  {
    id: "r54", part6: true,
    kind: "Part 6 記事",
    title: "Lakeview Herald — Local Bakery Wins National Award",
    target: 150,
    s: [
      "Sunrise Bakery, a small family business on Elm Street, has won first prize in the National Bread Competition.",
      "The bakery's whole-wheat loaf was [1] from more than 400 entries.",
      "Owner Lisa Park, [2] opened the bakery in 2015, said she was surprised by the news.",
      "\"We simply bake the way my grandmother taught me,\" she said.",
      "[3]",
      "Since the announcement, the bakery has been so busy [4] it now opens an hour earlier to meet demand."
    ],
    ja: "エルム通りの小さな家族経営の店サンライズ・ベーカリーが,全国パンコンテストで1位を獲得した.同店の全粒粉パンが,400を超える応募作の中から選ばれた.2015年に店を開いた店主のパークさんは,知らせに驚いたと話した.「祖母に教わったとおりに焼いているだけです」.[パンは今も毎朝,手でこねて作られている.] 発表以来,店はとても忙しくなり,需要に応えるため1時間早く開店している.",
    qs: [
      { id: "r54q1", q: "(1)", c: ["chose", "chosen", "choosing", "choice"], a: 1, ev: [1], d: 600, why: "パンは「選ばれる」側.was + 過去分詞 で受動態 chosen.", x: ["過去形 chose は be 動詞の後ろに置けない.", "", "was choosing だと,パンが(何かを)選んでいたことになる.", "名詞 choice では「パンは選択だった」になり,from 以下とつながらない."] },
      { id: "r54q2", q: "(2)", c: ["which", "who", "whose", "what"], a: 1, ev: [2], d: 700, why: "先行詞は人(Owner Lisa Park)で,opened の主語が欠けているので who.カンマの後なので that は使えない.", x: ["which は先行詞が物のとき.", "", "whose の後ろには名詞が必要(whose bakery opened ...).", "what は先行詞がないときに使う."] },
      { id: "r54q3", q: "(3)", c: ["Her grandmother still works at a bank.", "Every loaf is still made by hand each morning.", "The competition will be held again next year in Paris.", "The bakery plans to close next month."], a: 1, ev: [3, 4], d: 1000, why: "前の文は「祖母に教わったとおりに焼く」.それに続けて作り方を説明する文が自然.", x: ["祖母が今どこで働いているかは,パン作りの話とつながらない.", "", "次のコンテストの開催地は,この店の話の流れから外れる.", "後ろの文で「忙しくて早く開店している」とあり,閉店の予定と矛盾する."] },
      { id: "r54q4", q: "(4)", c: ["that", "which", "what", "so"], a: 0, ev: [5], d: 900, why: "so busy that ... で「とても忙しいので…」.so + 形容詞 + that の that.", x: ["", "which は関係代名詞で,so ... that の形をつくれない.", "what は先行詞のない関係代名詞で,この位置には入らない.", "so はすでに busy の前にあり,もう1つ入れると文にならない."] }
    ]
  },
  {
    id: "r55", part6: true,
    kind: "Part 6 社内メモ",
    title: "MEMO — Re: Annual performance reviews",
    target: 150,
    s: [
      "Annual performance reviews will take place during the first two weeks of December.",
      "Each employee will meet with his or her supervisor for about 30 minutes.",
      "Before the meeting, please complete the self-evaluation form [1] to you by e-mail last week.",
      "Forms should be returned to Human Resources no later than November 25.",
      "[2]",
      "During the review, you and your supervisor will discuss your goals for next year.",
      "This is also a good opportunity to talk about any training you would like to [3].",
      "We hope these meetings will be [4] for everyone."
    ],
    ja: "年1回の人事評価は12月の最初の2週間に行う.各社員は上司と30分ほど面談する.面談の前に,先週メールで送った自己評価の用紙に記入すること.用紙は11月25日までに人事部へ返すこと.[期限を過ぎて届いた用紙は受け付けられない場合がある.] 面談では,上司と来年の目標について話し合う.受けたい研修について話すのにも良い機会だ.面談が全員にとって有益なものになることを願う.",
    qs: [
      { id: "r55q1", q: "(1)", c: ["send", "sent", "sending", "to send"], a: 1, ev: [2], d: 800, why: "文の動詞は complete.空所は form を後ろから修飾する.用紙は「送られた」側で,last week(過去)もあるので過去分詞 sent.", x: ["原形は名詞を後ろから修飾できない.", "", "sending だと用紙が(何かを)送ることになる.", "to send だと「これから送る用紙」になり,last week(先週)と合わない."] },
      { id: "r55q2", q: "(2)", c: ["Forms received after this date may not be accepted.", "Human Resources is located on the fifth floor.", "Reviews were canceled last year.", "Supervisors will receive a bonus."], a: 0, ev: [3, 4], d: 1000, why: "前の文は用紙の提出期限.期限を過ぎた場合どうなるかを続けるのが自然.", x: ["", "人事部の場所は,期限の話の続きとしては唐突.", "昨年の評価が中止された話は,今年の評価の案内の流れに合わない.", "上司の賞与は,社員向けの評価の案内と関係がない."] },
      { id: "r55q3", q: "(3)", c: ["receive", "be received", "receiving", "received"], a: 0, ev: [6], d: 700, why: "would like to + 動詞の原形.社員が研修を「受ける」側なので能動の receive.", x: ["", "be received だと,社員が「受け取られる」ことになる.", "would like to の後ろは原形で,-ing は置けない.", "would like to の後ろに過去分詞は置けない."] },
      { id: "r55q4", q: "(4)", c: ["benefit", "beneficial", "beneficially", "benefits"], a: 1, ev: [7], d: 800, why: "will be の後ろ(補語の位置)なので形容詞 beneficial(有益な).", x: ["名詞 benefit だと「面談が利益である」になり,for everyone とのつながりも不自然.", "", "副詞は補語になれない.", "複数名詞 benefits も「面談が利益たちである」になり,不自然."] }
    ]
  },
  {
    id: "r56", part6: true,
    kind: "Part 6 広告",
    title: "Greenleaf Garden Center — Spring Sale",
    target: 140,
    s: [
      "Get your garden ready for spring at Greenleaf Garden Center!",
      "From April 5 to April 12, all flowering plants will be 20 percent off.",
      "In addition, customers who spend more than $100 will receive a free bag of soil, [1] $15.",
      "Our [2] staff will be happy to help you choose the right plants for your garden.",
      "[3]",
      "We are open daily from 8:00 A.M. to 7:00 P.M., [4] Easter Sunday."
    ],
    ja: "グリーンリーフ園芸センターで春の庭の準備を! 4月5日から12日まで,花の咲く植物はすべて20%引き.さらに,100ドルを超えて買い物をした客には,15ドル相当の土を1袋無料で差し上げる.知識豊富なスタッフが,庭に合う植物選びを喜んで手伝う.[無料の園芸講座も毎週土曜の午前10時に開いている.] 営業は毎日午前8時から午後7時まで.ただし復活祭の日曜日は休み.",
    qs: [
      { id: "r56q1", q: "(1)", c: ["value", "valued at", "valuing", "values"], a: 1, ev: [2], d: 1100, why: "a free bag of soil を後ろから説明する分詞.土は「評価される」側なので過去分詞 valued at $15(15ドル相当の).", x: ["名詞 value を直接置くと,a bag of soil, value $15 で文法的につながらない.", "", "valuing だと,土が(何かを)評価することになる.", "values は動詞なので,カンマの後ろで名詞を説明できない(主語もない)."] },
      { id: "r56q2", q: "(2)", c: ["knowledge", "knowledgeable", "knowingly", "know"], a: 1, ev: [3], d: 900, why: "所有格 Our と名詞 staff の間なので形容詞 knowledgeable(知識豊富な).", x: ["名詞 knowledge を置くと knowledge staff となり,意味の通らない名詞の並びになる.", "", "副詞は名詞を修飾できない.", "動詞の原形は名詞の前に置けない."] },
      { id: "r56q3", q: "(3)", c: ["Free gardening workshops are also held every Saturday at 10:00 A.M.", "The sale ended last week.", "Our staff will be on vacation in April.", "Soil is not sold at our store."], a: 0, ev: [3, 4, 5], d: 1000, why: "前の文はスタッフが手伝ってくれるという客向けのサービス.さらにサービスを紹介する文が自然.", x: ["", "セールは4月5日から12日なので,先週終わったという内容と矛盾する.", "前の文でスタッフが手伝うと言っているので,休暇中という内容と矛盾する.", "前の文で土を無料で渡すとあり,土を売っていないのは不自然."] },
      { id: "r56q4", q: "(4)", c: ["except", "without", "unless", "besides"], a: 0, ev: [5], d: 900, why: "「毎日営業.ただし復活祭の日曜日を除く」.後ろが名詞なので前置詞 except.", x: ["", "without(〜なしで)では「復活祭の日曜日なしで営業」になり,意味が通らない.", "unless は接続詞なので,後ろに節(主語 + 動詞)が必要.", "besides(〜に加えて)だと,復活祭の日曜日にも営業することになり,意味が逆."] }
    ]
  },
  {
    id: "r57", part6: true,
    kind: "Part 6 メール",
    title: "From: Ken Watanabe / To: Sarah Cole / Subject: Delivery date",
    target: 150,
    s: [
      "Dear Ms. Cole,",
      "Thank you for your order of 200 printed T-shirts for your company's charity run.",
      "Unfortunately, our printing machine broke down yesterday, and the repair will take several days.",
      "[1], we will not be able to deliver the shirts by May 10 as promised.",
      "We now expect to ship them on May 14, [2] means they should reach you by May 16.",
      "We understand that your event is on May 18. [3]",
      "As an apology, we will [4] the shipping charge for this order.",
      "Sincerely, Ken Watanabe"
    ],
    ja: "コール様.御社のチャリティー・ランのための印刷 T シャツ200枚のご注文ありがとうございます.残念ながら,昨日印刷機が故障し,修理に数日かかります.そのため,お約束の5月10日までにシャツをお届けできません.5月14日に発送する見込みで,16日までにお手元に届くはずです.催しは5月18日と承知しています.[催しには間に合いますが,ご心配をおかけし申し訳ありません.] おわびとして,このご注文の送料はいただきません.",
    qs: [
      { id: "r57q1", q: "(1)", c: ["However", "As a result", "Instead", "Meanwhile"], a: 1, ev: [2, 3], d: 800, why: "印刷機の故障(原因)→ 期限に間に合わない(結果).As a result(その結果).", x: ["However(しかし)は逆の内容が続くとき.故障したので遅れるのは,予想どおりの流れ.", "", "Instead(代わりに)は前の内容の代わりを言うとき.代わりのものは出てこない.", "Meanwhile(その間に)は同時に起きている別のことを言うとき.原因と結果の関係を表せない."] },
      { id: "r57q2", q: "(2)", c: ["that", "what", "which", "it"], a: 2, ev: [4], d: 1100, why: "カンマの後で,前の内容全体(5月14日に発送すること)を受けて説明する非制限用法の which.", x: ["that はカンマの後(非制限用法)では使えない.", "what は先行詞がないときに使い,前の文を受けられない.", "", "it は代名詞で,節と節をつなげない(カンマだけで2つの文をつなぐことになる)."] },
      { id: "r57q3", q: "(3)", c: ["The shirts will arrive in time, but we apologize for the worry.", "Please cancel the event.", "The charity run was very successful.", "We have not received your payment."], a: 0, ev: [4, 5], d: 1200, why: "16日までに届き,催しは18日なので間に合う.そのうえで謝る文が自然.日付を比べて判断する.", x: ["", "シャツは間に合うので,催しの中止を頼む理由がない.", "催しはまだ先(5月18日)なので,成功したという過去の内容は合わない.", "支払いの話は,遅れのおわびの流れに合わない."] },
      { id: "r57q4", q: "(4)", c: ["waive", "wave", "waiver", "waiving"], a: 0, ev: [6], d: 1300, why: "will の後ろなので動詞の原形.waive(料金を免除する).", x: ["", "wave(手を振る)はつづりが似ているが意味が違う.", "waiver は名詞(権利放棄の書類).will の後ろに名詞は置けない.", "will の後ろに -ing は置けない."] }
    ]
  },
  {
    id: "r58", part6: true,
    kind: "Part 6 Web ページ",
    title: "Brightline Electronics — Product Registration",
    target: 140,
    s: [
      "Thank you for purchasing a Brightline product.",
      "By registering your product, you can receive important updates and faster customer support.",
      "Registration takes only a few minutes and can be completed [1] on our Web site.",
      "You will need the serial number, which is printed on a label on the back of the device.",
      "[2]",
      "Once your product is registered, your warranty will be [3] extended by six months at no cost.",
      "Please note that products purchased from unauthorized sellers are not [4] for this offer."
    ],
    ja: "ブライトラインの製品をお買い上げいただきありがとうございます.製品を登録すると,重要な更新情報やより早いサポートを受けられる.登録は数分で済み,Web サイトですべて完了できる.機器の裏のラベルに印刷されている製造番号が必要.[購入日を確かめるため,領収書もお手元にご用意ください.] 製品を登録すると,保証は無料で自動的に6か月延長される.なお,正規でない販売店で買った製品は,この特典の対象外.",
    qs: [
      { id: "r58q1", q: "(1)", c: ["entire", "entirely", "entirety", "entireness"], a: 1, ev: [2], d: 800, why: "can be completed を修飾するので副詞 entirely(すべて).", x: ["形容詞 entire は名詞の前に置く語で,動詞を修飾できない.", "", "名詞 entirety は in its entirety の形で使い,単独では動詞を修飾できない.", "entireness はふつう使わない名詞で,動詞を修飾できない."] },
      { id: "r58q2", q: "(2)", c: ["You should also have your receipt ready to confirm the purchase date.", "The device is not waterproof.", "Our store is closed on Sundays.", "The serial number has been removed."], a: 0, ev: [3, 4], d: 1100, why: "前の文は登録に必要なもの(製造番号).さらに必要なもの(領収書)を加える文が自然.also がつながりの手がかり.", x: ["", "防水かどうかは,登録の手順の話とつながらない.", "店の休みは Web での登録の話と関係がない.", "前の文で製造番号はラベルに印刷されているとあり,取り除かれたという内容と矛盾する."] },
      { id: "r58q3", q: "(3)", c: ["automatic", "automatically", "automation", "automate"], a: 1, ev: [5], d: 700, why: "be と過去分詞 extended の間なので副詞 automatically.", x: ["形容詞は be と過去分詞の間に置けない.", "", "名詞は be と過去分詞の間に置けない.", "動詞の原形は be の後ろに置けない."] },
      { id: "r58q4", q: "(4)", c: ["eligible", "possible", "able", "valuable"], a: 0, ev: [6], d: 1000, why: "be eligible for 〜 で「〜の対象となる」.正規でない店で買った製品は特典の対象外.", x: ["", "possible は人や物を主語にして「〜の対象だ」とは言えない.", "able は be able to do の形で使い,for とは組まない.", "valuable(価値がある)だと「特典にとって価値がない」になり,意味が通らない."] }
    ]
  },

  // ---- 長文の追加(r59〜).x は誤答の選択肢ごとの説明 ----
  {
    id: "r59",
    kind: "お知らせ",
    title: "Notice — Riverside Apartments Water Shutoff",
    target: 100,
    s: [
      "To all residents of Riverside Apartments:",
      "The water supply to Buildings A and B will be shut off on Tuesday, July 8, from 9:00 A.M. to 1:00 P.M.",
      "During this time, workers will replace old pipes in the basement.",
      "Residents of Building C will not be affected.",
      "We recommend storing some water in advance for drinking and cooking.",
      "We apologize for the inconvenience. — Property Management"
    ],
    ja: "リバーサイド・アパートの住民の皆様へ.7月8日(火)午前9時から午後1時まで,A 棟と B 棟の水道を止める.この間,作業員が地下の古い配管を交換する.C 棟の住民には影響はない.飲み水や料理用の水を前もってためておくことを勧める.ご不便をおかけして申し訳ない.管理会社.",
    qs: [
      { id: "r59q1", q: "Why will the water be shut off?", c: ["To test the water quality", "To build a new building", "To clean the basement", "To replace pipes"], a: 3, ev: [2], d: 400, why: "workers will replace old pipes in the basement.配管の交換のため.", x: ["水質検査の話は書かれていない.", "新しい建物を建てる話は出てこない.", "地下(basement)は作業の場所で,掃除するとは書かれていない.", ""] },
      { id: "r59q2", q: "Who will NOT be affected by the shutoff?", c: ["Residents of Building A", "Residents of Building B", "Residents of Building C", "Property managers"], a: 2, ev: [1, 3], d: 400, why: "Residents of Building C will not be affected.水が止まるのは A 棟と B 棟.", x: ["A 棟は水が止まる.", "B 棟も水が止まる.", "", "管理会社が影響を受けるかどうかは書かれていない."] },
      { id: "r59q3", q: "What are residents advised to do?", c: ["Leave the building by 9:00 A.M.", "Call the management office", "Turn off their heaters", "Save water before the work begins"], a: 3, ev: [4], d: 600, why: "storing some water in advance(前もって水をためておく)= save water before the work begins.", x: ["建物を出るようには言われていない.", "管理会社に電話するようには言われていない.", "暖房の話は出てこない.", ""] }
    ]
  },
  {
    id: "r60",
    kind: "チャット",
    title: "Online chat — Marketing team",
    target: 120,
    s: [
      "Jenna Ross [10:02 A.M.]: Has anyone heard from the printer about the new catalogs?",
      "Paul Diaz [10:04 A.M.]: Yes, they called this morning. The catalogs will be ready on Thursday instead of Tuesday.",
      "Jenna Ross [10:05 A.M.]: That's a problem. The trade show starts on Wednesday.",
      "Mia Chen [10:06 A.M.]: Could we bring printed copies of the online version for the first day?",
      "Jenna Ross [10:07 A.M.]: Good idea. Paul, can you print 200 copies here at the office?",
      "Paul Diaz [10:08 A.M.]: Sure. I'll start right after lunch.",
      "Mia Chen [10:09 A.M.]: And I can pick up the real catalogs on Thursday morning and bring them to the show."
    ],
    ja: "ロス [10:02]:新しいカタログについて印刷所から連絡はあった? ディアス [10:04]:今朝電話があった.カタログは火曜日ではなく木曜日にできあがる. ロス [10:05]:それは困る.見本市は水曜日から. チェン [10:06]:初日はオンライン版を印刷したものを持っていけないかな. ロス [10:07]:いい考え.ポール,事務所で200部印刷できる? ディアス [10:08]:もちろん.昼食の後すぐ始めるよ. チェン [10:09]:それから,木曜の朝に本物のカタログを受け取って見本市に持っていくね.",
    qs: [
      { id: "r60q1", q: "What problem does Ms. Ross mention?", c: ["The catalogs contain errors.", "The catalogs will not be ready for the start of an event.", "The trade show has been canceled.", "The printer has closed."], a: 1, ev: [1, 2], d: 600, why: "カタログは木曜日にできるが,見本市は水曜日から.初日に間に合わない.", x: ["カタログの誤りの話は出てこない.", "", "見本市が中止になったとは書かれていない.", "印刷所は今朝電話してきており,閉店していない."] },
      { id: "r60q2", q: "At 10:07 A.M., what does Ms. Ross mean when she writes, \"Good idea\"?", c: ["She agrees to make copies at the office.", "She wants to cancel the order.", "She will call the printer again.", "She prefers to wait until Thursday."], a: 0, ev: [3, 4], d: 900, why: "直前のチェンさんの提案(オンライン版を印刷して持っていく)に賛成し,すぐに事務所で200部印刷するよう頼んでいる.", x: ["", "注文を取り消すとは言っていない(本物のカタログも木曜に受け取る).", "印刷所に再び電話するとは言っていない.", "木曜まで待つのではなく,初日の分を事務所で印刷する."] },
      { id: "r60q3", q: "What will Ms. Chen most likely do on Thursday?", c: ["Print copies at the office", "Call the printer", "Return to the office", "Bring catalogs to the trade show"], a: 3, ev: [6], d: 700, why: "I can pick up the real catalogs on Thursday morning and bring them to the show.", x: ["事務所で印刷するのはディアスさんで,今日の午後.", "印刷所に電話するとは言っていない.", "事務所に戻るとは書かれていない.", ""] }
    ]
  },
  {
    id: "r61",
    kind: "記事",
    title: "City Business Journal — Office Furniture Maker Goes Green",
    target: 160,
    s: [
      "Norwood Furniture, which has made office desks and chairs in Clayton for more than 60 years, announced on Monday that all of its products will be made from recycled or sustainably harvested materials by 2028.",
      "The company currently uses recycled steel in about half of its products.",
      "According to CEO Daniel Price, the change was driven largely by demand from corporate customers, many of whom now require suppliers to meet environmental standards.",
      "\"Five years ago, our clients asked mainly about price,\" Mr. Price said. \"Today, the first question is often where our materials come from.\"",
      "The transition will require new equipment at the company's main factory, and production may slow down temporarily while the machines are installed.",
      "Norwood expects its prices to rise by about 5 percent, though Mr. Price said the company hopes to reduce that figure as it finds more efficient methods."
    ],
    ja: "クレイトンで60年以上事務用の机といすを作ってきたノーウッド家具は月曜日,2028年までに全製品を再生素材か持続可能な方法で収穫された素材で作ると発表した.同社は現在,製品の約半分に再生鋼を使っている.プライス CEO によると,この変更の大きな理由は法人客からの需要で,その多くが今では仕入先に環境の基準を満たすよう求めている.「5年前,顧客の質問は主に価格についてだった.今は最初に,素材がどこから来るのかをよく聞かれる」とプライス氏は話した.切り替えには本工場に新しい設備が必要で,機械を設置する間,生産が一時的に遅くなる可能性がある.ノーウッドは価格が約5%上がると見込んでいるが,プライス氏は,より効率的な方法を見つけてこの数字を下げたいとしている.",
    qs: [
      { id: "r61q1", q: "What is the article mainly about?", c: ["A company's plan to change its materials", "The opening of a new furniture store", "A decline in demand for office furniture", "The retirement of a company's CEO"], a: 0, ev: [0], d: 800, why: "第1文が主題:2028年までに全製品を再生素材などで作る.素材を変える計画.", x: ["", "新しい店の開店の話は出てこない.", "需要が減っているとは書かれていない(むしろ環境への要望が増えている).", "CEO の引退の話は出てこない."] },
      { id: "r61q2", q: "According to Mr. Price, what has changed in recent years?", c: ["The cost of steel has fallen.", "Fewer companies buy office desks.", "The company has moved its factory.", "Clients are more interested in where materials come from."], a: 3, ev: [3], d: 1000, why: "5年前は価格の質問が中心だったが,今は素材の出どころをまず聞かれる.", x: ["鋼の価格が下がったとは書かれていない.", "机を買う会社が減ったとは書かれていない.", "工場を移したとは書かれていない(新しい設備を入れる).", ""] },
      { id: "r61q3", q: "What is indicated about the new equipment?", c: ["It has already been installed.", "It will lower prices immediately.", "Its installation may affect production for a time.", "It will be used only for chairs."], a: 2, ev: [4], d: 1200, why: "production may slow down temporarily while the machines are installed.設置の間,生産が一時的に遅くなるかもしれない.", x: ["これから設置するもので,まだ入っていない.", "価格はむしろ約5%上がる見込み.", "", "いすだけに使うとは書かれていない."] }
    ]
  },
  {
    id: "r62",
    kind: "広告とメールと予定表",
    title: "Summit Language School — Business English Courses",
    target: 210,
    s: [
      "Summit Language School offers business English courses for working professionals.",
      { t: "table", head: ["Course", "Days", "Time", "Fee"], rows: [
        ["Presentations", "Mon. & Wed.", "7:00–8:30 P.M.", "$320"],
        ["E-mail Writing", "Tue. & Thu.", "7:00–8:30 P.M.", "$280"],
        ["Negotiation", "Saturday", "10:00 A.M.–1:00 P.M.", "$350"]
      ] },
      "All courses last eight weeks. Students who sign up for two courses receive 15 percent off the total fee.",
      { t: "doc", title: "E-mail — From: Kenji Abe / To: Summit Language School / Date: August 20" },
      "Hello,",
      "I work in sales and often have to write to overseas clients and give presentations in English.",
      "I would like to take courses that will help with both.",
      "I travel for work on Wednesdays every other week, so I would like to know whether I could make up any classes I miss.",
      { t: "doc", title: "E-mail — From: Summit Language School / To: Kenji Abe / Date: August 21" },
      "Dear Mr. Abe,",
      "Thank you for your interest. Students may make up a missed class by joining a recorded online session within one week.",
      "Please note that make-up sessions are limited to three per course."
    ],
    ja: "サミット語学学校は社会人向けのビジネス英語の講座を開いている.[表:プレゼンテーション 月・水 午後7時〜8時半 320ドル,メールの書き方 火・木 午後7時〜8時半 280ドル,交渉 土曜 午前10時〜午後1時 350ドル] どの講座も8週間.2つの講座を申し込むと合計が15%引き.[メール1:阿部さんから] 営業の仕事で,海外の顧客にメールを書いたり,英語で発表したりすることが多い.その両方に役立つ講座を受けたい.隔週の水曜日に出張があるので,休んだ授業を補えるか知りたい.[メール2:学校から] 休んだ授業は,1週間以内に録画のオンライン授業に参加すれば補える.補講は1講座につき3回まで.",
    qs: [
      { id: "r62q1", q: "Which courses will Mr. Abe most likely take?", c: ["Presentations and Negotiation", "E-mail Writing and Negotiation", "Negotiation only", "Presentations and E-mail Writing"], a: 3, ev: [5, 6, [1, 0], [1, 1]], d: 800, why: "海外の顧客へのメールと英語の発表,両方に役立つ講座 → Presentations と E-mail Writing.", x: ["交渉の講座は,メールと発表の両方という希望に合わない.", "発表の講座が入っていない.", "メールと発表のどちらにも当たらない.", ""] },
      { id: "r62q2", q: "How much will Mr. Abe pay if he takes those two courses?", c: ["$510", "$600", "$540", "$85"], a: 0, ev: [[1, 0], [1, 1], 2], d: 1300, why: "320 + 280 = 600ドル.2つの講座を申し込むと15%引きなので,600 × 0.85 = 510ドル.", x: ["", "割引前の合計.2講座で15%引きになる条件を見落としている.", "10%引きで計算した数字.割引は15%.", "割引の額(600 × 0.15).支払う額ではない."] },
      { id: "r62q3", q: "What problem might Mr. Abe have with the Presentations course?", c: ["It is too expensive.", "It meets on a day when he sometimes travels.", "It is only offered online.", "It is held on weekends."], a: 1, ev: [7, [1, 0]], d: 1400, why: "Presentations は月曜と水曜.阿部さんは隔週の水曜日に出張がある.8週間で約4回休むことになり,補講の上限(3回)を超えるおそれもある.3つの文書をつないで答える.", x: ["値段について阿部さんは何も言っていない.", "", "授業は教室で行われ,オンラインは補講だけ.", "Presentations は平日(月・水)の夜."] }
    ]
  },
  {
    id: "r63",
    kind: "レビュー",
    title: "Product Review — TrailPro Hiking Backpack ★★★★★",
    target: 110,
    s: [
      "I bought the TrailPro backpack for a two-week hiking trip and was very impressed.",
      "Despite its large size, it is surprisingly light, and the padded straps kept my shoulders comfortable even after long days on the trail.",
      "The side pockets are big enough for water bottles, and the built-in rain cover kept everything dry during two days of heavy rain.",
      "My only complaint is that the color options are limited; I would have preferred something brighter than dark green.",
      "At $150, it is not cheap, but I think it is worth the price. — Rachel Kim"
    ],
    ja: "2週間の山歩きの旅のためにトレイルプロのリュックを買い,とても感心した.大きいのに驚くほど軽く,クッションの入った肩ひものおかげで,山道を長く歩いた日も肩が楽だった.横のポケットは水筒が入る大きさで,付属の雨よけカバーのおかげで2日間の大雨でも中身がぬれなかった.唯一の不満は色の選択肢が少ないことで,濃い緑より明るい色がよかった.150ドルと安くはないが,値段だけの価値はあると思う.",
    qs: [
      { id: "r63q1", q: "What does Ms. Kim say about the backpack's weight?", c: ["It is lighter than she expected.", "It is too heavy for long trips.", "It is heavier than other models.", "It becomes heavy when wet."], a: 0, ev: [1], d: 600, why: "surprisingly light(驚くほど軽い)= 思ったより軽い.", x: ["", "長い旅でも肩が楽だったと書いており,重すぎるとは言っていない.", "ほかの機種との比較はしていない.", "大雨でも中身がぬれなかったとあり,ぬれて重くなる話はない."] },
      { id: "r63q2", q: "What feature protected her belongings from the weather?", c: ["The padded straps", "The side pockets", "The rain cover", "The dark green color"], a: 2, ev: [2], d: 500, why: "the built-in rain cover kept everything dry.雨よけカバーが中身を守った.", x: ["肩ひもは肩を楽にするためのもの.", "横のポケットは水筒を入れるためのもの.", "", "色は天気から守るものではない."] },
      { id: "r63q3", q: "What does Ms. Kim dislike about the backpack?", c: ["Its price", "Its size", "The quality of the straps", "The choice of colors"], a: 3, ev: [3], d: 600, why: "My only complaint is that the color options are limited.不満は色の選択肢の少なさだけ.", x: ["安くはないが値段の価値はあると書いており,不満ではない.", "大きさは長所として書いている(大きいのに軽い).", "肩ひもはほめている.", ""] }
    ]
  },
  {
    id: "r64",
    kind: "記事",
    title: "Global Trade Weekly — Shipping Delays Ease",
    target: 190,
    s: [
      "After nearly two years of severe disruption, international shipping times are finally returning to normal, according to a report released Tuesday by the Maritime Logistics Council.",
      "The average time for a container to travel from Asia to Europe fell to 38 days in the last quarter, compared with a peak of 61 days the previous year.",
      "The report credits the improvement to the opening of two new terminals in Rotterdam and to fewer labor shortages at major ports.",
      "However, it cautions that freight rates remain about 30 percent higher than before the disruption, largely because fuel costs have not come down.",
      "Retailers that stocked up heavily during the delays now face a different problem: excess inventory.",
      "Several large chains have announced discounts of up to 40 percent to clear warehouse space before the holiday season.",
      "Analysts warn that such discounts could squeeze profit margins, even as transport becomes more reliable."
    ],
    ja: "海事物流協議会が火曜日に発表した報告書によると,2年近く続いた深刻な混乱の後,国際輸送の日数はようやく通常に戻りつつある.コンテナがアジアからヨーロッパへ運ばれる平均日数は,前年の最長61日に対し,直近の四半期は38日に下がった.報告書は,改善の理由をロッテルダムの2つの新しいターミナルの開業と,主要な港での人手不足の緩和に求めている.ただし,燃料費が下がっていないため,運賃は混乱前より約30%高いままだと注意を促している.遅れの間に大量に在庫を抱えた小売業者は,今は別の問題,つまり在庫の過剰に直面している.いくつかの大手チェーンは,休暇の時期の前に倉庫を空けるため,最大40%の値引きを発表した.専門家は,輸送の信頼性が高まる一方で,こうした値引きが利幅を圧迫しかねないと警告している.",
    qs: [
      { id: "r64q1", q: "According to the report, what helped reduce shipping times?", c: ["Lower fuel costs", "New port facilities", "Higher freight rates", "Fewer containers"], a: 1, ev: [2], d: 1000, why: "the opening of two new terminals in Rotterdam(新しいターミナル)= new port facilities.人手不足の緩和も理由だが,選択肢にあるのは新しい施設.", x: ["燃料費は下がっていない(運賃が高い理由).", "", "運賃が高いことは,日数が短くなった理由ではない.", "コンテナの数が減ったとは書かれていない."] },
      { id: "r64q2", q: "Why are freight rates still high?", c: ["Ports are still too crowded.", "Retailers are ordering more goods.", "There are too few ships.", "Fuel remains expensive."], a: 3, ev: [3], d: 1100, why: "largely because fuel costs have not come down.燃料費が下がっていないのが主な理由.", x: ["港の混雑はむしろ解消に向かっている.", "小売業者はむしろ在庫が余っている.", "船の数の話は出てこない.", ""] },
      { id: "r64q3", q: "What is suggested about some retailers?", c: ["They may earn less profit on each sale.", "They are building new warehouses.", "They are waiting for shipping to improve.", "They have stopped importing from Asia."], a: 0, ev: [5, 6], d: 1500, why: "在庫を減らすための大幅な値引き → could squeeze profit margins(利幅を圧迫する)= 1つ売るごとの利益が減るかもしれない.squeeze は「締めつける」.", x: ["", "倉庫を建てるのではなく,値引きで倉庫を空けようとしている.", "輸送はすでに改善しつつあり,待っているわけではない.", "アジアからの輸入をやめたとは書かれていない."] }
    ]
  },

  // ---- 長文の追加(r65〜r76).x は誤答の選択肢ごとの説明 ----
  {
    id: "r65",
    kind: "メール",
    title: "From: Hiroshi Mori / To: All department heads / Subject: Budget requests",
    target: 130,
    s: [
      "Dear department heads,",
      "As we begin planning for next year, I would like each of you to submit your budget request by October 15.",
      "Please use the new template, which is available on the company intranet.",
      "Requests should include a brief explanation for any item that exceeds last year's amount by more than 10 percent.",
      "Because of rising costs, the total budget is expected to remain at this year's level; hence, not all increases can be approved.",
      "I will meet with each department head individually during the last week of October to discuss the requests.",
      "Regards,",
      "Hiroshi Mori, Finance Director"
    ],
    ja: "部長各位.来年の計画を始めるにあたり,10月15日までに予算の要望を提出してほしい.社内のイントラネットにある新しい書式を使うこと.昨年の額を10%より多く上回る項目には,短い説明を付けること.費用の上昇のため,予算の総額は今年と同じ水準にとどまる見込みで,それゆえ,すべての増額は認められない.10月の最終週に,各部長と個別に会って要望について話し合う.財務部長 森.",
    qs: [
      { id: "r65q1", q: "What are department heads asked to do?", c: ["Reduce their spending immediately", "Attend a group meeting on October 15", "Hire additional staff", "Submit a budget request using a new form"], a: 3, ev: [1, 2], d: 500, why: "submit your budget request ... Please use the new template.template(書式)= form.", x: ["すぐに支出を減らすようには言っていない.", "10月15日は提出の締め切りで,会議は10月の最終週に個別に行う.", "人を雇う話は出てこない.", ""] },
      { id: "r65q2", q: "When is an explanation required?", c: ["For every item in the request", "Only for new departments", "When the request is submitted late", "When an item is more than 10 percent higher than last year"], a: 3, ev: [3], d: 800, why: "any item that exceeds last year's amount by more than 10 percent.昨年より10%を超えて増える項目.", x: ["説明が必要なのは一部の項目だけ.", "新しい部署の話は出てこない.", "提出が遅れた場合の話は出てこない.", ""] },
      { id: "r65q3", q: "What does Mr. Mori suggest about the overall budget?", c: ["It will increase by 10 percent.", "It will be cut in half.", "It will not grow next year.", "It has already been approved."], a: 2, ev: [4], d: 1000, why: "the total budget is expected to remain at this year's level.今年と同じ水準 = 増えない.hence(それゆえ)の後は結果:すべての増額は認められない.", x: ["10% は説明が必要になる基準で,予算の増加率ではない.", "半分に減るとは書かれていない.", "", "これから要望を集めて話し合う段階で,まだ承認されていない."] }
    ]
  },
  {
    id: "r66",
    kind: "チャット",
    title: "Text message chain — Lucas Brown and Nora Hill",
    target: 100,
    s: [
      "Lucas Brown [3:40 P.M.]: Nora, the client from Lyon just arrived at reception. Are you ready for the meeting?",
      "Nora Hill [3:41 P.M.]: I thought it was at 4:30!",
      "Lucas Brown [3:42 P.M.]: It was moved to 3:45. Didn't you get Amy's e-mail this morning?",
      "Nora Hill [3:43 P.M.]: I've been at the warehouse all day without my laptop. I'm about ten minutes away.",
      "Lucas Brown [3:44 P.M.]: OK. I'll show them the new samples first and give them a tour of the showroom.",
      "Nora Hill [3:45 P.M.]: Thanks. That should give me enough time. Could you also ask Amy to print the price list?"
    ],
    ja: "ブラウン [3:40]:ノラ,リヨンの顧客が受付に着いたよ.会議の準備はできてる? ヒル [3:41]:4時半だと思ってた! ブラウン [3:42]:3時45分に変わったんだ.今朝のエイミーのメールは届かなかった? ヒル [3:43]:一日中ノートパソコンなしで倉庫にいたの.あと10分くらいで着く. ブラウン [3:44]:わかった.先に新しい見本を見せて,ショールームを案内するよ. ヒル [3:45]:ありがとう.それなら間に合うはず.エイミーに価格表を印刷するよう頼んでくれる?",
    qs: [
      { id: "r66q1", q: "Why did Ms. Hill not know about the change?", c: ["She was on vacation.", "The client did not inform anyone.", "Mr. Brown forgot to tell her.", "She had not seen an e-mail."], a: 3, ev: [2, 3], d: 700, why: "変更はエイミーのメールで知らされたが,ヒルさんはノートパソコンなしで倉庫にいたので読んでいない.", x: ["休暇ではなく倉庫で仕事をしていた.", "変更を知らせたのは社内のエイミー.", "連絡したのはエイミーのメール.ブラウンさんが伝え忘れたのではない.", ""] },
      { id: "r66q2", q: "At 3:45 P.M., what does Ms. Hill mean when she writes, \"That should give me enough time\"?", c: ["She can finish her work at the warehouse.", "She can print the price list herself.", "She will have time to eat lunch.", "She will arrive before Mr. Brown finishes showing the samples and showroom."], a: 3, ev: [3, 4], d: 1000, why: "ブラウンさんが見本とショールームを案内している間(約10分)に,ヒルさんは到着できる,という意味.", x: ["倉庫の仕事の話はしていない.今から向かっている.", "価格表はエイミーに頼んでいる.", "昼食の話は出てこない.", ""] },
      { id: "r66q3", q: "What will Mr. Brown most likely do next?", c: ["Cancel the meeting", "Drive to the warehouse", "Show the visitors some products", "Send an e-mail to the client"], a: 2, ev: [4], d: 500, why: "I'll show them the new samples first.見本 = products.", x: ["会議を取り消すとは言っていない.", "倉庫に行くのはヒルさんの方(倉庫から戻ってくる).", "", "顧客にメールを送るとは言っていない."] }
    ]
  },
  {
    id: "r67",
    kind: "表とメール",
    title: "Metro Tech Conference — Registration Fees",
    target: 170,
    s: [
      { t: "table", head: ["Type", "By March 1", "After March 1"], rows: [
        ["Full pass (3 days)", "$450", "$550"],
        ["One-day pass", "$200", "$240"],
        ["Student pass (3 days)", "$150", "$150"]
      ] },
      "Groups of five or more people from the same organization receive a 10 percent discount on full passes.",
      "All passes include lunch and access to the exhibition hall.",
      { t: "doc", title: "E-mail — From: Grace Liu / To: Metro Tech Conference / Date: March 4" },
      "Hello,",
      "I would like to register six members of my team for all three days of the conference.",
      "Could you confirm the total amount and let me know how we should pay?",
      "Also, one of my colleagues uses a wheelchair, so please verify that the venue is fully accessible.",
      "Thank you, Grace Liu, Orion Software"
    ],
    ja: "[表:全日券(3日)3月1日まで450ドル・以降550ドル,1日券 200ドル・240ドル,学生券(3日)150ドル・150ドル] 同じ組織から5人以上の団体は,全日券が10%引き.どの券にも昼食と展示会場への入場が含まれる.[メール:3月4日 リウさんから] チームの6人を3日間すべてに登録したい.合計の額と支払い方法を確認してほしい.また,同僚の1人が車いすを使うので,会場がすべて車いすで使えるか確かめてほしい.",
    qs: [
      { id: "r67q1", q: "What is included in every pass?", c: ["Hotel accommodation", "Transportation", "A conference T-shirt", "Lunch"], a: 3, ev: [2], d: 400, why: "All passes include lunch and access to the exhibition hall.", x: ["宿泊は含まれていない.", "交通の話は出てこない.", "T シャツの話は出てこない.", ""] },
      { id: "r67q2", q: "How much will Ms. Liu's team most likely pay in total?", c: ["$2,430", "$2,700", "$2,970", "$3,300"], a: 2, ev: [3, [0, 0], 5, 1], d: 1400, why: "メールは3月4日なので3月1日より後:全日券は550ドル.6人なので 550 × 6 = 3,300ドル.5人以上の団体は10%引きなので 3,300 × 0.9 = 2,970ドル.日付・人数・割引の3つを組み合わせる.", x: ["450ドル(3月1日まで)で割り引いた額.メールは3月4日なので早期の料金は使えない.", "450ドル × 6 の割引前の額.日付も割引も見落としている.", "", "550ドル × 6 の割引前の額.5人以上の団体割引を見落としている."] },
      { id: "r67q3", q: "What does Ms. Liu ask the organizers to do?", c: ["Change the date of the conference", "Reserve a hotel for her team", "Send student passes", "Check that the venue can be used by a wheelchair user"], a: 3, ev: [7], d: 700, why: "please verify that the venue is fully accessible.verify(確かめる)= check,accessible は車いすでも使えること.", x: ["日程の変更は頼んでいない.", "ホテルの予約は頼んでいない.", "全員3日間の券で,学生券ではない.", ""] }
    ]
  },
  {
    id: "r68",
    kind: "記事",
    title: "Business Daily — Remote Work Changes Office Market",
    target: 180,
    s: [
      "Demand for traditional office space in downtown Brenton has fallen sharply over the past three years, according to a report by property consultant Hale & Moss.",
      "Nearly 20 percent of office space in the city center is now vacant, compared with 8 percent before many companies adopted flexible working arrangements.",
      "At the same time, demand for smaller, shared offices in suburban areas has grown considerably.",
      "\"Employees want to work closer to home a few days a week,\" said Hale & Moss analyst Victor Chang. \"Companies are responding by leasing less space downtown and more in the suburbs.\"",
      "Some building owners are converting empty offices into apartments, although Mr. Chang noted that such conversions are expensive and can take years to complete.",
      "The city council is considering tax incentives to encourage these conversions, arguing that more residents downtown would help local restaurants and shops recover."
    ],
    ja: "不動産コンサルタントのヘイル&モスの報告によると,ブレントン中心街の従来型の事務所の需要は,この3年で急激に減った.多くの会社が柔軟な働き方を取り入れる前は空室率8%だったが,今は都心の事務所の約20%が空いている.同時に,郊外の小さな共用事務所の需要はかなり伸びた.「社員は週に数日,自宅の近くで働きたいと考えている.会社は都心の賃借を減らし,郊外を増やして応えている」と同社の分析者チャン氏は話した.空いた事務所を住宅に改装する所有者もいるが,チャン氏は,そうした改装は費用がかかり,完成まで何年もかかることがあると指摘した.市議会は,都心の住民が増えれば地元の飲食店や店の回復を助けるとして,改装を促す税の優遇を検討している.",
    qs: [
      { id: "r68q1", q: "What is the article mainly about?", c: ["A new shopping center", "The opening of a consulting firm", "A rise in apartment prices", "Changes in where companies rent offices"], a: 3, ev: [0, 2, 3], d: 800, why: "都心の事務所の需要が減り,郊外の共用事務所の需要が増えている.会社が事務所を借りる場所の変化が主題.", x: ["ショッピングセンターの話は出てこない.", "コンサルタント会社は報告を出した側で,開業の話ではない.", "住宅の価格の話は出てこない(事務所を住宅に改装する話はある).", ""] },
      { id: "r68q2", q: "According to Mr. Chang, why are companies leasing space in the suburbs?", c: ["Rent is cheaper there.", "The city requires it.", "Downtown buildings are being torn down.", "Employees prefer to work near where they live."], a: 3, ev: [3], d: 900, why: "Employees want to work closer to home.社員が家の近くで働きたいから.", x: ["郊外の家賃が安いとは言っていない.", "市が求めているとは書かれていない.", "都心の建物が取り壊されているとは書かれていない(改装の話).", ""] },
      { id: "r68q3", q: "What is the city council considering?", c: ["Building new offices downtown", "Moving city offices to the suburbs", "Raising taxes on empty buildings", "Offering financial benefits for turning offices into homes"], a: 3, ev: [4, 5], d: 1300, why: "tax incentives to encourage these conversions.these conversions は前の文の「空いた事務所を住宅に変えること」.税の優遇 = financial benefits.", x: ["新しい事務所を建てる話ではない(むしろ事務所は余っている).", "市の事務所を移す話は出てこない.", "空きビルへの増税ではなく,改装を促す優遇.", ""] }
    ]
  },
  {
    id: "r69",
    kind: "グラフつき社内メモ",
    title: "MEMO — Customer Service Response Times",
    target: 150,
    s: [
      "To: Customer Service Team / From: Ana Lopez, Manager",
      "The chart below shows our average response time to customer e-mails over the past four months.",
      { t: "bar", cap: "Average response time (hours)", items: [["June", 6], ["July", 9], ["August", 14], ["September", 7]] },
      "The sharp increase in August was caused by the launch of our new product line, which more than doubled the number of inquiries.",
      "Thanks to the two temporary staff members who joined in late August, response times improved significantly in September.",
      "Our goal for the fourth quarter is to answer all e-mails within five hours.",
      "To achieve this, we will introduce a set of ready-made replies for the most common questions starting October 1."
    ],
    ja: "顧客サービスチームへ.下のグラフは,この4か月の客のメールへの平均返信時間を示している.[グラフ:6月6時間,7月9時間,8月14時間,9月7時間] 8月の急増は新しい製品群の発売が原因で,問い合わせの数が2倍以上になった.8月末に加わった2人の臨時スタッフのおかげで,9月は返信時間が大きく改善した.第4四半期の目標は,すべてのメールに5時間以内に返信すること.そのため,10月1日から,よくある質問への返信の定型文を導入する.",
    qs: [
      { id: "r69q1", q: "In which month was the response time the longest?", c: ["June", "July", "August", "September"], a: 2, ev: [[2, 2]], d: 300, why: "グラフで最も長い棒は August(14時間).", x: ["6月は6時間で,いちばん短い.", "7月は9時間.", "", "9月は7時間."] },
      { id: "r69q2", q: "What caused the change in August?", c: ["Staff went on vacation.", "A computer system failed.", "New products led to more questions.", "The e-mail address was changed."], a: 2, ev: [3], d: 800, why: "the launch of our new product line, which more than doubled the number of inquiries.新製品で問い合わせが増えた.", x: ["休暇の話は出てこない.", "システムの故障の話は出てこない.", "", "メールアドレスの変更の話は出てこない."] },
      { id: "r69q3", q: "By how many hours must the September average improve to meet the new goal?", c: ["1 hour", "9 hours", "5 hours", "2 hours"], a: 3, ev: [[2, 3], 5], d: 1100, why: "9月は7時間,目標は5時間以内.7 − 5 = 2時間短くする必要がある.", x: ["6時間(6月)から計算した数.今の値は9月の7時間.", "8月の14時間から目標を引いた数.今の値は9月.", "5時間は目標の値で,縮める時間ではない.", ""] }
    ]
  },
  {
    id: "r70",
    kind: "手紙",
    title: "Letter — Westbury Museum of Art",
    target: 150,
    s: [
      "Dear Ms. Kapoor,",
      "On behalf of the Westbury Museum of Art, I would like to thank you for your generous donation of three paintings by your late grandfather, the artist Raj Kapoor.",
      "Our curators have examined the works and are delighted to include them in our permanent collection.",
      "The paintings will first be shown in a special exhibition, \"Colors of the Coast,\" which opens on May 12.",
      "As a token of our appreciation, we would like to invite you and a guest to a private reception the evening before the opening.",
      "You will also receive a lifetime membership, which provides free admission and discounts at the museum shop.",
      "Please let us know by April 20 whether you will be able to attend the reception.",
      "With sincere thanks,",
      "Helen Grant, Director"
    ],
    ja: "カプール様.ウェストベリー美術館を代表し,亡くなったおじい様である画家ラジ・カプールの絵3点を寛大にもご寄贈いただいたことに感謝します.学芸員が作品を調べ,常設の所蔵品に加えられることを大変喜んでいます.絵はまず,5月12日に始まる特別展「海辺の色」で展示されます.感謝のしるしとして,開幕の前夜の招待客だけのレセプションに,あなたと同伴者1人をご招待したいと思います.また,入館無料と美術館の店での割引が受けられる終身会員の資格もお送りします.レセプションに出席できるかどうか,4月20日までにお知らせください.館長 グラント.",
    qs: [
      { id: "r70q1", q: "Why did the museum write to Ms. Kapoor?", c: ["To ask her to sell some paintings", "To announce that the museum will close", "To offer her a job as a curator", "To thank her for a gift"], a: 3, ev: [1], d: 500, why: "thank you for your generous donation.寄贈(donation)= gift へのお礼.", x: ["絵を売るよう頼んではいない(すでに寄贈された).", "閉館の話は出てこない.", "学芸員は美術館の職員で,職の提示はしていない.", ""] },
      { id: "r70q2", q: "When will the reception be held?", c: ["On April 20", "On May 13", "On May 12", "On May 11"], a: 3, ev: [3, 4], d: 1000, why: "レセプションは the evening before the opening(開幕の前夜).開幕は5月12日なので,5月11日.", x: ["4月20日は出欠の返事の締め切り.", "開幕の翌日ではない.", "5月12日は特別展の開幕日.レセプションはその前夜.", ""] },
      { id: "r70q3", q: "What is NOT mentioned as something Ms. Kapoor will receive?", c: ["Free entry to the museum", "A discount at the museum shop", "An invitation to an event", "A copy of an exhibition catalog"], a: 3, ev: [4, 5], d: 900, why: "入館無料・店の割引(会員資格),レセプションへの招待は書かれている.展示の目録は出てこない.", x: ["free admission(入館無料)として書かれている.", "discounts at the museum shop として書かれている.", "private reception への招待として書かれている.", ""] }
    ]
  },
  {
    id: "r71",
    kind: "Web ページとレビュー",
    title: "Quickfix Phone Repair — Services",
    target: 170,
    s: [
      "Quickfix repairs most smartphone problems in under an hour.",
      { t: "table", head: ["Service", "Price", "Time"], rows: [
        ["Screen replacement", "$120", "45 min."],
        ["Battery replacement", "$60", "30 min."],
        ["Water damage check", "$30", "1–2 days"]
      ] },
      "All repairs come with a 90-day warranty. The fee for the water damage check is deducted from the cost of any repair that follows.",
      { t: "doc", title: "Customer Review — ★★★★☆ — Posted by Sam Ortiz" },
      "I dropped my phone in a lake, so I took it to Quickfix for a check.",
      "They told me the next day that the battery had been damaged and needed to be replaced.",
      "The repair itself was quick, and the staff explained everything clearly.",
      "I took off one star only because I had to come back to the shop a second time."
    ],
    ja: "クイックフィックスは,スマホの不具合の大半を1時間以内に直す.[表:画面の交換 120ドル 45分,電池の交換 60ドル 30分,水ぬれの点検 30ドル 1〜2日] すべての修理に90日の保証が付く.水ぬれの点検の料金は,その後の修理の代金から差し引かれる.[レビュー:オルティスさん] 湖に電話を落としたので,点検のためクイックフィックスに持っていった.翌日,電池が傷んでいて交換が必要だと言われた.修理自体は速く,スタッフはすべてわかりやすく説明してくれた.星を1つ減らしたのは,2回目に店に来なければならなかったからだけだ.",
    qs: [
      { id: "r71q1", q: "What is indicated about all repairs?", c: ["They take less than 30 minutes.", "They are free for new customers.", "They must be paid for in advance.", "They are guaranteed for 90 days."], a: 3, ev: [2], d: 500, why: "All repairs come with a 90-day warranty.warranty(保証)= guaranteed.", x: ["画面の交換は45分,点検は1〜2日かかる.", "新規客が無料という話は出てこない.", "前払いの話は出てこない.", ""] },
      { id: "r71q2", q: "How much did Mr. Ortiz most likely pay in total?", c: ["$30", "$120", "$90", "$60"], a: 3, ev: [[1, 2], [1, 1], 2, 5], d: 1400, why: "点検 30ドル + 電池の交換 60ドル.ただし点検の料金はその後の修理代から差し引かれるので,合計は60ドル.表・注意書き・レビューの3か所をつなぐ.", x: ["点検の料金だけ.その後に電池を交換している.", "画面の交換の料金.交換したのは電池.", "点検と交換を単純に足した額.点検料が差し引かれることを見落としている.", ""] },
      { id: "r71q3", q: "Why did Mr. Ortiz give the shop four stars instead of five?", c: ["The repair was expensive.", "The staff were rude.", "He had to visit the shop twice.", "The phone broke again."], a: 2, ev: [7], d: 700, why: "I had to come back to the shop a second time.2回来なければならなかったから.", x: ["値段についての不満は書かれていない.", "スタッフはわかりやすく説明してくれたとほめている.", "", "また壊れたとは書かれていない."] }
    ]
  },
  {
    id: "r72",
    kind: "記事",
    title: "Science & Industry Review — Factory Robots and Jobs",
    target: 200,
    s: [
      "When Calder Manufacturing installed 40 robots on its assembly line two years ago, many workers feared they would lose their jobs.",
      "The opposite happened: the company now employs 15 percent more people than it did before the robots arrived.",
      "According to plant manager Diane Wells, the robots took over repetitive tasks such as lifting heavy parts, while human workers moved into roles that require judgment, such as quality control and machine maintenance.",
      "The shift was not automatic, however.",
      "Calder spent nearly $2 million on a training program that taught employees to program and repair the new machines.",
      "Ms. Wells admits that not every employee adapted easily; about a dozen chose early retirement rather than learn the new skills.",
      "Labor experts caution that Calder's experience may not be typical.",
      "Smaller firms, they argue, rarely have the resources to retrain their workforce on such a scale, and thus may be more likely to reduce staff when they automate."
    ],
    ja: "2年前,カルダー製造が組立ラインに40台のロボットを入れたとき,多くの作業員は職を失うことを心配した.実際は逆で,会社は今,ロボットが来る前より15%多く人を雇っている.工場長のウェルズ氏によると,ロボットは重い部品を持ち上げるなどの繰り返しの作業を引き受け,人の作業員は品質管理や機械の保守など,判断が必要な役割に移った.ただし,この移行は自然に起きたわけではない.カルダーは,社員に新しい機械の設定と修理を教える研修に約200万ドルを使った.ウェルズ氏は,全員がすんなり適応したわけではないと認める.十数人は,新しい技能を学ぶより早期退職を選んだ.労働の専門家は,カルダーの例は典型的ではないかもしれないと注意を促す.小さな会社は,これほどの規模で社員を再教育する資金がめったになく,したがって自動化するときに人員を減らす可能性が高いという.",
    qs: [
      { id: "r72q1", q: "What happened after Calder installed robots?", c: ["Many workers lost their jobs.", "Production slowed down.", "The factory was closed.", "The number of employees increased."], a: 3, ev: [1], d: 800, why: "the company now employs 15 percent more people.従業員が15%増えた.予想(職を失う)とは逆の結果.", x: ["多くの人が職を失うと心配したが,実際は逆だった.", "生産が遅くなった話は出てこない.", "工場が閉鎖された話は出てこない.", ""] },
      { id: "r72q2", q: "The word \"shift\" in the sentence beginning \"The shift was not automatic\" is closest in meaning to", c: ["work period", "keyboard key", "movement of goods", "change"], a: 3, ev: [3, 2], d: 1200, why: "前の文で,人の作業員が新しい役割に移ったことを述べている.The shift はその「変化」を指す.shift には「交替勤務」の意味もあるが,ここでは合わない.", x: ["shift には「交替勤務(の時間)」の意味もあるが,ここでは役割の移り変わりを指す.", "キーボードの Shift キーの意味ではない.", "物の移動ではなく,仕事の内容の変化.", ""] },
      { id: "r72q3", q: "Why do labor experts think smaller firms might act differently?", c: ["They do not use robots.", "Their workers are more skilled.", "They often lack money to retrain workers.", "They have more employees than Calder."], a: 2, ev: [7], d: 1500, why: "rarely have the resources to retrain their workforce(再教育の資金がめったにない).thus 以下がその結果:人員を減らす可能性が高い.", x: ["ロボットを使わないとは言っていない(自動化するときの話).", "小さな会社の作業員が熟練しているとは書かれていない.", "", "小さな会社の方が人が多いという内容は,small と矛盾する."] }
    ]
  },

  // ---- Part 6 の追加(r73〜r76) ----
  {
    id: "r73", part6: true,
    kind: "Part 6 お知らせ",
    title: "Notice — Office Kitchen Renovation",
    target: 140,
    s: [
      "The kitchen on the third floor will be closed for renovation from June 2 to June 13.",
      "During this period, employees may use the kitchen on the fifth floor, [1] has been equipped with extra microwaves.",
      "[2]",
      "Please be aware that the fifth-floor kitchen may be [3] busier than usual at lunchtime.",
      "We appreciate your patience. When the work is complete, the third-floor kitchen will have a larger refrigerator and a new coffee machine, [4] staff requested in last year's survey."
    ],
    ja: "3階の給湯室は,6月2日から13日まで改装のため閉鎖される.この間,社員は5階の給湯室を使える.5階には電子レンジを追加で置いた.[冷蔵庫に入れた食品には,名前と日付を書くこと.] 昼食の時間は,5階の給湯室がいつもよりかなり混むかもしれないことに注意してほしい.ご辛抱に感謝する.工事が終わると,3階の給湯室には,昨年のアンケートでスタッフが求めていた,より大きな冷蔵庫と新しいコーヒーメーカーが入る.",
    qs: [
      { id: "r73q1", q: "(1)", c: ["where", "who", "which", "what"], a: 2, ev: [1], d: 800, why: "先行詞は the kitchen(物)で,カンマの後.has been equipped の主語が欠けているので関係代名詞 which.", x: ["where は後ろが完全な文のとき.ここは主語が欠けている.", "who は先行詞が人のとき.", "", "what は先行詞がないときに使う."] },
      { id: "r73q2", q: "(2)", c: ["Please label any food you store in the refrigerator with your name and the date.", "The renovation was completed last month.", "The fifth floor is closed to all staff.", "Microwaves are not allowed in the office."], a: 0, ev: [1, 2, 3], d: 1000, why: "前後は5階の給湯室の使い方の話.冷蔵庫の使い方の注意が自然につながる.", x: ["", "改装は6月2日からで,これから行われる.", "前の文で5階の給湯室を使えるとあり,矛盾する.", "前の文で電子レンジを追加したとあり,矛盾する."] },
      { id: "r73q3", q: "(3)", c: ["very", "most", "much", "many"], a: 2, ev: [3], d: 900, why: "比較級 busier を強めるのは much(はるかに).very は比較級を強められない.", x: ["very は原級を強める語で,比較級 busier の前には置けない.", "most は最上級をつくる語で,比較級と並べられない.", "", "many は数えられる名詞の前に置く語."] },
      { id: "r73q4", q: "(4)", c: ["that", "what", "both of which", "whose"], a: 2, ev: [4], d: 1300, why: "カンマの後で,前の2つ(冷蔵庫とコーヒーメーカー)を受け,requested の目的語になる.非制限用法で2つを受けるので both of which.", x: ["that はカンマの後(非制限用法)では使えない.", "what は先行詞がないときに使う.前に名詞がある.", "", "whose の後ろには名詞が必要."] }
    ]
  },
  {
    id: "r74", part6: true,
    kind: "Part 6 メール",
    title: "From: Daniel Reyes / To: Priya Shah / Subject: Thank you",
    target: 140,
    s: [
      "Dear Ms. Shah,",
      "Thank you for meeting with me yesterday to discuss the marketing position at Bluebird Media.",
      "I [1] enjoyed learning about your team's recent projects, especially the campaign for the city zoo.",
      "Our conversation confirmed my interest in the role. [2]",
      "As we discussed, I have attached two samples of my work [3] you can share them with the other members of the hiring committee.",
      "Please let me know if you need any [4] information.",
      "Sincerely, Daniel Reyes"
    ],
    ja: "シャー様.昨日はブルーバード・メディアの販売戦略の職についてお会いいただきありがとうございました.チームの最近の仕事,特に市立動物園のキャンペーンについて伺えて本当に楽しかったです.お話しして,この職への関心がいっそう強くなりました.[特に,若い利用者向けの SNS の企画に携わってみたいと思います.] お話ししたとおり,採用委員会のほかの方々にも見ていただけるよう,私の仕事の見本を2つ添付しました.ほかに必要な情報があればお知らせください.",
    qs: [
      { id: "r74q1", q: "(1)", c: ["real", "reality", "really", "realize"], a: 2, ev: [2], d: 600, why: "主語 I と動詞 enjoyed の間で,動詞を修飾するので副詞 really.", x: ["形容詞は動詞を修飾できない.", "名詞は主語と動詞の間に置けない.", "", "動詞の原形を2つ並べることはできない."] },
      { id: "r74q2", q: "(2)", c: ["I would especially like to work on social media projects for young audiences.", "I have decided to accept another offer.", "The zoo will close next month.", "Please send me the address of your office."], a: 0, ev: [3, 4], d: 1100, why: "前の文で「職への関心が強まった」とある.その具体的な内容を続けるのが自然.", x: ["", "関心が強まったと言った直後に,ほかの内定を受けるのは矛盾する.", "動物園が閉鎖される話は,自分の関心の話とつながらない.", "昨日会っているので,事務所の住所を尋ねるのは不自然."] },
      { id: "r74q3", q: "(3)", c: ["because of", "so that", "in order to", "such as"], a: 1, ev: [4], d: 900, why: "後ろが節(you can share them)で,「共有できるように」という目的を表すので so that.", x: ["because of は前置詞で,後ろに節を置けない.", "", "in order to の後ろは動詞の原形.ここは主語 you がある.", "such as は例を挙げる語で,後ろに節は置けない."] },
      { id: "r74q4", q: "(4)", c: ["addition", "additive", "additional", "additionally"], a: 2, ev: [5], d: 700, why: "any と名詞 information の間なので形容詞 additional(追加の).", x: ["名詞 addition を並べると addition information となり,意味が通らない.", "additive は「添加物(の)」で,情報には使わない.", "", "副詞は名詞を修飾できない."] }
    ]
  },
  {
    id: "r75", part6: true,
    kind: "Part 6 記事",
    title: "Hillside Gazette — Library Extends Weekend Hours",
    target: 150,
    s: [
      "The Hillside Public Library will extend its weekend hours starting next month.",
      "The library will open at 9:00 A.M. on Saturdays and Sundays, an hour earlier than it [1] now.",
      "The change follows a survey in which many residents said they could only visit on weekends.",
      "[2]",
      "To cover the additional hours, the library will hire two part-time assistants and rely on volunteers, [3] are trained by the library staff.",
      "Library director Mark Evans said the extended hours are being funded by a grant from the city, [4] the library's own budget remains unchanged."
    ],
    ja: "ヒルサイド公立図書館は来月から週末の開館時間を延ばす.土曜と日曜は午前9時に開き,今より1時間早くなる.この変更は,週末にしか来られないと多くの住民が答えたアンケートを受けたものだ.[平日の開館時間は変わらない.] 増える時間を補うため,図書館は2人のパートの助手を雇い,図書館の職員が研修したボランティアにも頼る.エバンス館長によると,延長は市の補助金でまかなわれるので,図書館自体の予算は変わらない.",
    qs: [
      { id: "r75q1", q: "(1)", c: ["opening", "does", "did", "has"], a: 1, ev: [1], d: 1000, why: "than it ___ now で,前の動詞 open(開く)の繰り返しを避ける代動詞.now(今)なので現在形 does.", x: ["-ing だけでは than の後ろの節の動詞にならない.", "", "now(今)とあるので過去形 did は合わない.", "has では「今持っている」の意味になり,前の動詞 open の代わりにならない."] },
      { id: "r75q2", q: "(2)", c: ["Weekday hours will not change.", "The library closed last year.", "Residents prefer to read at home.", "The survey was conducted by a private company."], a: 0, ev: [1, 2, 3], d: 900, why: "週末の時間が変わる話の後に,平日は変わらないと補うのが自然.", x: ["", "来月から開館時間を延ばす図書館が,昨年閉館したというのは矛盾する.", "週末に来たいという住民の声と合わない.", "誰が調査したかは,前後の話の流れと関係がない."] },
      { id: "r75q3", q: "(3)", c: ["which", "whose", "who", "them"], a: 2, ev: [4], d: 800, why: "先行詞は volunteers(人).are trained の主語が欠けているので who.", x: ["which は先行詞が物のとき.", "whose の後ろには名詞が必要.", "", "them は代名詞で,カンマだけで節をつなげない."] },
      { id: "r75q4", q: "(4)", c: ["so", "although", "unless", "despite"], a: 0, ev: [5], d: 900, why: "補助金でまかなわれる(原因)→ 図書館の予算は変わらない(結果).カンマの後で結果を表す接続詞 so.", x: ["", "although(〜だけれども)だと逆の関係になる.", "unless(〜しない限り)では意味が通らない.", "despite は前置詞で,後ろに節を置けない."] }
    ]
  },
  {
    id: "r76", part6: true,
    kind: "Part 6 広告",
    title: "Brightway Cleaning Supplies — Bulk Discounts",
    target: 140,
    s: [
      "Brightway Cleaning Supplies is the [1] choice for offices, hotels, and restaurants across the region.",
      "We offer more than 500 products, from floor cleaners to paper towels, all at wholesale prices.",
      "[2], customers who place orders of $500 or more receive free next-day delivery.",
      "[3]",
      "Our account managers will help you choose the right products and set up automatic monthly deliveries, so you never run out of supplies.",
      "Visit our Web site today to [4] a free catalog."
    ],
    ja: "ブライトウェイ清掃用品は,地域中の事務所・ホテル・飲食店に好まれている.床用洗剤から紙タオルまで500を超える製品を,すべて卸値で提供している.さらに,500ドル以上の注文には翌日の配達が無料になる.[初めて注文する客には,最初の注文が15%引きになる.] 担当者が,適した製品を選んだり,毎月の自動配送を設定したりするのを手伝うので,備品が切れることはない.今すぐ Web サイトで無料のカタログをお申し込みください.",
    qs: [
      { id: "r76q1", q: "(1)", c: ["prefer", "preferred", "preference", "preferring"], a: 1, ev: [0], d: 800, why: "the と名詞 choice の間で,choice は「好まれる」側なので過去分詞 preferred(好まれている).", x: ["動詞の原形は名詞の前に置けない.", "", "名詞を並べると preference choice となり,意味が通らない.", "preferring だと choice が(何かを)好むことになる."] },
      { id: "r76q2", q: "(2)", c: ["However", "In addition", "For instance", "Instead"], a: 1, ev: [1, 2], d: 800, why: "卸値で提供する話に,無料配達という良い点を加えている.In addition(さらに).", x: ["However(しかし)は逆の内容が続くとき.良い点が続いている.", "", "For instance(例えば)は前の文の具体例のとき.配達は卸値の例ではない.", "Instead(代わりに)は前の内容を否定するとき."] },
      { id: "r76q3", q: "(3)", c: ["First-time customers also receive 15 percent off their first order.", "Delivery is not available on weekends.", "Our prices will increase next month.", "We have closed our showroom."], a: 0, ev: [2, 3], d: 1000, why: "前の文から特典(無料配達)の話が続いている.さらに特典を加える文が自然.also がつながりの手がかり.", x: ["", "週末の配達の話は,特典の流れの中で唐突で,否定的な内容になる.", "広告の中で値上げを告げるのは,前後の宣伝の流れに合わない.", "ショールームの話は出てこず,前後とつながらない."] },
      { id: "r76q4", q: "(4)", c: ["request", "requests", "requested", "requesting"], a: 0, ev: [5], d: 600, why: "to + 動詞の原形.request(申し込む).", x: ["", "to の後ろに3人称単数の形は置けない.", "to の後ろに過去分詞は置けない.", "to の後ろに -ing は置けない(この to は不定詞の to)."] }
    ]
  },

  // ---- 難しい長文(1500〜2900) ----
  {
    id: "r77",
    kind: "記事",
    title: "Industry Review — The Hidden Cost of Fast Shipping",
    target: 150,
    s: [
      "Over the past decade, retailers have competed fiercely to offer ever faster delivery, with some promising orders within hours.",
      "Yet a growing body of research suggests that the race for speed carries costs that rarely appear on a company's balance sheet.",
      "Because express orders are often shipped in partially filled vans, fuel use per package can be more than double that of standard delivery.",
      "Warehouse staff, meanwhile, report that tight deadlines leave little room for error, contributing to higher turnover.",
      "Several firms have begun to offer modest discounts to customers who choose slower shipping, and early results indicate that many shoppers are willing to wait when given a reason to do so.",
      "Analysts caution, however, that such programs will succeed only if retailers are transparent about why the slower option exists."
    ],
    ja: "この10年,小売業者はより速い配送を競い,数時間で届けると約束する会社もある.しかし,速さの競争には決算書にはほとんど表れない費用があることが,研究で分かってきた.急ぎの注文は荷台が半分しか埋まっていない車で送られることが多く,荷物1つあたりの燃料は通常配送の2倍を超えることもある.倉庫の職員も,厳しい期限のために失敗の余地がなく,離職率の上昇につながっていると話す.遅い配送を選んだ客に少し割引をする会社も出てきており,理由が示されれば待ってもよいという客が多いことが初期の結果から分かっている.ただし専門家は,遅い配送の選択肢がある理由を小売業者が率直に示さなければ,うまくいかないと注意している.",
    qs: [
      { id: "r77q1", q: "What is the main point of the article?", c: ["Customers are unwilling to wait for their orders.", "Retailers should stop offering express delivery.", "Faster delivery has costs that are not always obvious.", "Warehouse staff prefer working under tight deadlines."], a: 2, ev: [1], d: 1700, why: "2文目の Yet 以下が主張.速さには決算書に表れない(not always obvious)費用がある.具体例(燃料・離職)は主張を支える部分.", x: ["本文では,理由があれば待つ客が多いとされている.", "記事は急ぎの配送をやめるべきだとまでは言っていない.", "", "職員は厳しい期限が負担だと話している."] },
      { id: "r77q2", q: "According to the article, why does express delivery use more fuel per package?", c: ["Vans are often not fully loaded.", "Vans travel longer distances.", "Express packages are heavier.", "Drivers make more return trips."], a: 0, ev: [2], d: 1900, why: "shipped in partially filled vans(荷台が一部しか埋まっていない車で送られる)を not fully loaded と言い換えている.", x: ["", "距離については書かれていない.", "荷物の重さについては書かれていない.", "往復の回数については書かれていない."] },
      { id: "r77q3", q: "What do analysts suggest is necessary for slower-shipping programs to succeed?", c: ["Government regulation of delivery times", "Larger discounts than currently offered", "Faster warehouse operations", "Clear explanations from retailers"], a: 3, ev: [5], d: 2400, why: "succeed only if retailers are transparent about why ...(理由を率直に示す場合に限り成功する).transparent を clear explanations と言い換えている.", x: ["政府の規制については書かれていない.", "割引額を増やすべきだとは書かれていない.", "倉庫の作業の速さは条件として挙げられていない.", ""] }
    ]
  },
  {
    id: "r78",
    kind: "お知らせ",
    title: "Notice of Revised Terms — Clearwater Cloud Storage",
    target: 150,
    s: [
      "Effective March 1, the following changes to our Terms of Service will apply to all accounts.",
      "Accounts that have been inactive for 24 consecutive months will be deemed dormant, and files stored in such accounts may be deleted after a 60-day notice period.",
      "Previously, this period of inactivity was 36 months.",
      "Business subscribers who pay annually are exempt from this provision, provided that their payment information remains current.",
      "Users who do not consent to the revised terms may close their accounts at any time before March 1 and will receive a prorated refund of any prepaid fees.",
      "Continued use of the service after that date will constitute acceptance of the new terms."
    ],
    ja: "3月1日から,利用規約の次の変更をすべてのアカウントに適用する.24か月続けて使われていないアカウントは休眠とみなし,60日前の通知の後,保存されたファイルを削除することがある.これまでは36か月だった.年払いの法人契約者は,支払い情報が最新である限り,この規定の対象外.改定に同意しない利用者は3月1日より前ならいつでも解約でき,前払いの料金は日割りで返金される.その日以降も使い続けると,新しい規約に同意したことになる.",
    qs: [
      { id: "r78q1", q: "What change is being announced?", c: ["Storage fees will increase.", "The time before an inactive account is considered dormant will be shortened.", "Business accounts will be closed.", "Files will be deleted without notice."], a: 1, ev: [1,  2], d: 1800, why: "休眠とみなすまでの期間が36か月から24か月に変わる.2文を見比べて「短くなる」と分かる.", x: ["料金の値上げは書かれていない.", "", "法人アカウントの閉鎖は書かれていない.", "削除の前に60日前の通知がある."] },
      { id: "r78q2", q: "Which user is exempt from the new provision?", c: ["A user who pays monthly", "A personal user who logs in once a year", "A business subscriber whose credit card has expired", "A business subscriber who pays every year and keeps payment details up to date"], a: 3, ev: [3], d: 2300, why: "exempt は「(規定の)対象外の」.条件は2つ:年払いの法人契約者であること,支払い情報が最新(current)であること(provided that は「〜という条件で」).", x: ["対象外になるのは年払い(annually)の法人契約者.", "個人利用者は対象外になっていない.", "支払い情報が最新(current)であることが条件なので,期限切れのカードでは対象外にならない.", ""] },
      { id: "r78q3", q: "The word \"constitute\" in the last sentence is closest in meaning to", c: ["replace", "establish", "amount to", "delay"], a: 2, ev: [5], d: 2600, why: "Continued use ... will constitute acceptance で「使い続けることは同意に当たる」.constitute を amount to(〜に等しい・〜に当たる)に置き換えると意味が通る.", x: ["「取り替える」では意味が通らない.", "「設立する」の意味もあるが,この文では合わない.", "", "「遅らせる」では意味が通らない."] }
    ]
  },
  {
    id: "r79",
    kind: "記事",
    title: "Opinion — Why Small Towns Should Rethink Tourism",
    target: 150,
    s: [
      "For years, towns across the region have measured the success of tourism by a single figure: the number of visitors.",
      "That figure has grown steadily, yet many residents insist that their quality of life has declined.",
      "Narrow streets are congested on weekends, and rents have risen as homes are converted into short-term rentals.",
      "The problem is not tourism itself but a strategy that treats every additional visitor as a gain.",
      "Towns would be better served by tracking how much visitors spend locally and how long they stay, figures that reveal whether tourism actually sustains local businesses.",
      "A smaller number of visitors who stay longer may bring more benefit, and far less disruption, than crowds of day-trippers."
    ],
    ja: "長年,地域の町は観光の成功を「来訪者数」という1つの数字で測ってきた.その数は着実に増えたが,生活の質は下がったと多くの住民が訴える.週末には狭い道が混雑し,住宅が短期の貸し部屋に変わるにつれて家賃も上がった.問題は観光そのものではなく,来訪者が1人増えるごとに得だとみなす戦略だ.町は,来訪者が地元でいくら使い,どれくらい滞在するかを追った方がよい.それで観光が本当に地元の店を支えているかが分かる.長く滞在する少ない来訪者の方が,日帰り客の群れより,恩恵が大きく混乱もはるかに少ないかもしれない.",
    qs: [
      { id: "r79q1", q: "What is the writer's main argument?", c: ["Towns should measure tourism's success differently.", "Tourism should be banned in small towns.", "Short-term rentals should be encouraged.", "Visitor numbers are falling too quickly."], a: 0, ev: [3,  4], d: 1800, why: "人数だけで測るのをやめ,地元での消費額や滞在期間で測るべきだ,というのが主張.problem is not tourism itself but a strategy ... が手がかり.", x: ["", "問題は観光そのものではない,と書かれている.", "短期の貸し部屋は家賃上昇の原因として挙げられている.", "来訪者数は着実に増えている."] },
      { id: "r79q2", q: "What does the writer imply about day-trippers?", c: ["They spend more money than longer-stay visitors.", "They may cause more disruption relative to their benefit.", "They are the main source of local rent increases.", "They prefer to stay in short-term rentals."], a: 1, ev: [5], d: 2500, why: "長く滞在する客の方が more benefit, and far less disruption.裏返すと,日帰り客は恩恵の割に混乱が大きい.比較の文から言外の意味を読み取る問題.", x: ["長期滞在の客の方が恩恵が大きいかもしれない,と書かれている.", "", "家賃の上昇は短期の貸し部屋と結びつけられている.", "日帰り客は泊まらない(day-trip)."] },
      { id: "r79q3", q: "According to the article, what has contributed to higher rents?", c: ["An increase in local business taxes", "The conversion of homes into short-term rentals", "The construction of new hotels", "A decline in the number of residents"], a: 1, ev: [2], d: 1600, why: "rents have risen as homes are converted into short-term rentals.converted を conversion と名詞にして言い換えている.", x: ["税については書かれていない.", "", "ホテルの建設については書かれていない.", "住民の数の減少については書かれていない."] }
    ]
  },
  {
    id: "r80",
    kind: "社内メモと表",
    title: "MEMO — Packaging supplier",
    target: 160,
    s: [
      "To: Purchasing Team / From: Elena Ruiz / Re: Packaging supplier",
      "As discussed, our current supplier will discontinue the boxes we use for our premium product line at the end of June.",
      "We need a replacement that can deliver within five business days, because our storage space does not allow us to hold large amounts of stock.",
      "For the same reason, the minimum order should not exceed 2,000 units.",
      "Among the suppliers that meet these conditions, please select the one with the lowest unit price.",
      {t:  "table", cap:  "Supplier comparison", head:  ["Supplier", "Unit price", "Delivery", "Minimum order"], rows:  [["Apex Pack", "$0.42", "3 days", "5,000"], ["BoxLine", "$0.48", "4 days", "1,000"], ["CraftCase", "$0.45", "7 days", "1,500"], ["Duro Boxes", "$0.51", "2 days", "500"]]}
    ],
    ja: "購買チームへ.話したとおり,今の仕入れ先が6月末で高級品の箱の製造をやめる.保管場所が狭く在庫を多く持てないので,5営業日以内に届けられる代わりの仕入れ先が必要だ.同じ理由で,最低注文数は2,000個を超えないこと.条件を満たす仕入れ先のうち,単価が最も安いところを選んでほしい.[表:Apex Pack 0.42ドル・3日・5,000個/BoxLine 0.48ドル・4日・1,000個/CraftCase 0.45ドル・7日・1,500個/Duro Boxes 0.51ドル・2日・500個]",
    qs: [
      { id: "r80q1", q: "Why does the company need a new supplier?", c: ["The current supplier's deliveries are often late.", "The current supplier raised its prices.", "The company is launching a new product line.", "A product the company uses will no longer be available."], a: 3, ev: [1], d: 1500, why: "our current supplier will discontinue the boxes(今の仕入れ先がその箱の製造をやめる).discontinue を will no longer be available と言い換えている.", x: ["配達の遅れについては書かれていない.", "値上げについては書かれていない.", "新しい製品群の発売は書かれていない.", ""] },
      { id: "r80q2", q: "Why is the minimum order an important condition?", c: ["Larger orders require approval from managers.", "The company wants to test the boxes first.", "The company has limited storage space.", "The budget for June is small."], a: 2, ev: [2,  3], d: 1900, why: "For the same reason は前の文の理由(保管場所が足りない)を指す.前の文とつなげて読む.", x: ["承認については書かれていない.", "試しに使いたいとは書かれていない.", "", "予算については書かれていない."] },
      { id: "r80q3", q: "Which supplier should the team most likely choose?", c: ["BoxLine", "Apex Pack", "CraftCase", "Duro Boxes"], a: 0, ev: [2,  3,  4,  [5,  0],  [5,  1],  [5,  2],  [5,  3]], d: 2500, why: "条件は「5営業日以内」「最低注文数2,000個以下」.Apex(5,000個)と CraftCase(7日)が外れ,残る BoxLine(0.48ドル)と Duro(0.51ドル)のうち安い BoxLine.表と本文の条件を組み合わせて絞り込む問題.", x: ["", "最も安いが,最低注文数が5,000個で2,000個を超える.", "配達に7日かかり,5営業日以内という条件を満たさない.", "条件は満たすが,BoxLine より単価が高い."] }
    ]
  },
  {
    id: "r81",
    kind: "手紙",
    title: "Letter — Response to a Proposal",
    target: 140,
    s: [
      "Dear Mr. Okafor,",
      "Thank you for your detailed proposal to redesign our company's Web site.",
      "Your team's ideas for simplifying the ordering process were particularly well received by our sales department.",
      "However, after reviewing our budget for the coming year, we have concluded that a full redesign is not feasible at this time.",
      "We would instead like to discuss a smaller project focused solely on the ordering pages, which could be completed before our busy holiday season.",
      "If this interests you, please send a revised estimate by October 15 so that we can present it to our board at its next meeting.",
      "Sincerely, Grace Lindqvist, Director of Operations"
    ],
    ja: "オカフォー様.当社の Web サイトの全面改修について,詳しいご提案をありがとうございました.注文手続きを簡単にする案は,特に営業部に好評でした.しかし来年度の予算を検討した結果,今は全面改修はできないと判断しました.代わりに,注文ページだけに絞った小さな計画について相談したいと思います.それなら繁忙期の年末商戦の前に終えられそうです.ご関心があれば,次の取締役会で示せるよう,10月15日までに修正した見積もりをお送りください.",
    qs: [
      { id: "r81q1", q: "What is the purpose of the letter?", c: ["To propose a reduced version of a project", "To accept a proposal without changes", "To reject a proposal and end the relationship", "To complain about the quality of a Web site"], a: 0, ev: [3,  4], d: 1700, why: "全面改修は無理だが,注文ページだけの小さな計画を相談したい.reduced version(縮小版)と言い換えている.", x: ["", "全面改修はできないと書かれている.", "断るだけでなく,小さな計画を提案している.", "サイトの質への苦情ではない."] },
      { id: "r81q2", q: "What is implied about the company's board?", c: ["It has already approved the full redesign.", "It must review the revised estimate.", "It meets only once a year.", "It disliked Mr. Okafor's ideas."], a: 1, ev: [5], d: 2000, why: "so that we can present it to our board(取締役会に示せるように)から,見積もりは取締役会の確認を経ると分かる.", x: ["全面改修はできないと判断している.", "", "会議の頻度は書かれていない.", "取締役会の評価は書かれておらず,営業部には好評だった."] },
      { id: "r81q3", q: "Why most likely does Ms. Lindqvist want the work finished before the holiday season?", c: ["The budget expires at the end of the year.", "Her staff will be on vacation then.", "Mr. Okafor's team will be unavailable later.", "Her company expects many orders during that period."], a: 3, ev: [4], d: 2800, why: "改修するのは注文ページで,年末は busy holiday season(繁忙期).忙しい時期に注文が増えるので,その前に注文の仕組みを良くしておきたい,と推測できる.本文に直接は書かれていない理由を,2つの情報を結びつけて推し量る問題.", x: ["予算の期限については書かれていない.", "休暇とは書かれておらず,busy(忙しい)時期だとある.", "オカフォー氏側の都合は書かれていない.", ""] }
    ]
  },
  {
    id: "r82",
    kind: "記事",
    title: "Science & Business — Lab-Grown Materials Enter the Market",
    target: 150,
    s: [
      "Materials grown from fungi, once confined to university laboratories, are beginning to appear in commercial products, from packaging to furniture.",
      "Proponents note that such materials can be produced with a fraction of the energy required for plastics and decompose within weeks once discarded.",
      "Skeptics counter that production remains difficult to scale and that costs, though falling, are still well above those of conventional alternatives.",
      "Both camps agree, however, that the materials' future hinges less on technology than on regulation.",
      "If governments impose stricter limits on single-use plastics, as several have signaled they will, demand could rise quickly enough to justify the investment needed to expand production."
    ],
    ja: "かつて大学の研究室に限られていた,菌類から育てる素材が,包装材から家具まで商品に使われ始めている.支持する人々は,この素材はプラスチックのごく一部のエネルギーで作れ,捨てれば数週間で分解されると指摘する.懐疑的な人々は,生産の規模を広げるのは今も難しく,費用は下がってきたものの従来の素材よりまだかなり高いと反論する.ただし両者とも,この素材の将来は技術よりも規制にかかっているという点では一致している.いくつかの政府が示しているように使い捨てプラスチックの規制が厳しくなれば,需要は生産拡大の投資に見合うほど速く伸びるかもしれない.",
    qs: [
      { id: "r82q1", q: "What do skeptics say about the new materials?", c: ["They break down too slowly.", "They are harmful to the environment.", "They are still costly and hard to produce in large quantities.", "They require more energy than plastics."], a: 2, ev: [2], d: 2000, why: "difficult to scale(規模を広げにくい)と costs ... still well above(費用はまだかなり高い)の2点.scale を produce in large quantities と言い換えている.", x: ["数週間で分解されると書かれている.", "環境への害については書かれていない.", "", "プラスチックよりずっと少ないエネルギーで作れる."] },
      { id: "r82q2", q: "The phrase \"hinges ... on\" in the fourth sentence is closest in meaning to", c: ["comments on", "focuses on", "insists on", "depends on"], a: 3, ev: [3], d: 2600, why: "hinge は「ちょうつがい」.hinge on 〜 で「〜にかかっている・〜次第だ」.future hinges on regulation =「将来は規制次第」.", x: ["「〜について述べる」では意味が合わない.", "「〜に集中する」では意味が合わない.", "「〜を主張する」では意味が合わない.", ""] },
      { id: "r82q3", q: "What can be inferred about some governments?", c: ["They have indicated plans to restrict single-use plastics.", "They have already banned all plastics.", "They directly fund research on fungi.", "They oppose the use of the new materials."], a: 0, ev: [4], d: 2900, why: "as several have signaled they will(いくつかの政府はそうすると示している)の they will は impose stricter limits を指す.省略された部分を補って読む必要がある.", x: ["", "すべてのプラスチックを禁止したとは書かれていない.規制が厳しくなる可能性の話.", "研究への資金提供は書かれていない.", "新しい素材への反対は書かれていない."] }
    ]
  },

  // ---- 易しい長文(灰・茶) ----
  {
    id: "r83",
    kind: "お知らせ",
    title: "Notice — Sunny Café",
    target: 60,
    s: [
      "Sunny Café will be closed on Monday, May 6, for cleaning.",
      "We will open again on Tuesday at 8:00 A.M.",
      "Our hours on weekdays are 8:00 A.M. to 6:00 P.M.",
      "On weekends, we are open from 9:00 A.M. to 4:00 P.M.",
      "Thank you!"
    ],
    ja: "サニーカフェは5月6日(月)は清掃のため休業します.火曜日の午前8時に再開します.平日の営業時間は午前8時から午後6時,週末は午前9時から午後4時です.",
    qs: [
      { id: "r83q1", q: "Why will the café be closed on May 6?", c: ["For a holiday", "For cleaning", "For a party", "For new staff"], a: 1, ev: [0], d: 200, why: "for cleaning(清掃のため)とある.", x: ["休日のためとは書かれていない.", "", "パーティーのためとは書かれていない.", "新しい職員のためとは書かれていない."] },
      { id: "r83q2", q: "What time will the café open on Tuesday?", c: ["6:00 P.M.", "9:00 A.M.", "4:00 P.M.", "8:00 A.M."], a: 3, ev: [1], d: 150, why: "We will open again on Tuesday at 8:00 A.M. とある.", x: ["6時は平日の閉店時刻.", "9時は週末の開店時刻.", "4時は週末の閉店時刻.", ""] },
      { id: "r83q3", q: "When does the café close on Saturdays?", c: ["At 4:00 P.M.", "At 6:00 P.M.", "At 8:00 A.M.", "At 9:00 A.M."], a: 0, ev: [3], d: 300, why: "土曜日は週末(weekend).週末は from 9:00 A.M. to 4:00 P.M. なので4時に閉まる.Saturday を weekend と結びつける.", x: ["", "6時は平日の閉店時刻.", "8時は平日の開店時刻.", "9時は週末の開店時刻."] }
    ]
  },
  {
    id: "r84",
    kind: "チャット",
    title: "Text message chain — Ken Ito and Mia Ross",
    target: 60,
    s: [
      "Ken Ito [9:05 A.M.]: Hi Mia. My train is late. I will be at the office at about 9:40.",
      "Mia Ross [9:06 A.M.]: OK. The meeting with the client starts at 10:00, so you have time.",
      "Ken Ito [9:07 A.M.]: Great. Can you print the slides for me?",
      "Mia Ross [9:08 A.M.]: Sure. I'll put them on your desk."
    ],
    ja: "伊藤:おはよう,ミア.電車が遅れていて,事務所には9時40分ごろに着きます.ロス:分かりました.顧客との会議は10時からなので間に合いますね.伊藤:よかった.スライドを印刷してもらえますか.ロス:もちろん.机に置いておきます.",
    qs: [
      { id: "r84q1", q: "Why will Mr. Ito be late?", c: ["He is sick.", "He forgot the slides.", "His train is late.", "The meeting was moved."], a: 2, ev: [0], d: 150, why: "My train is late. とある.", x: ["病気だとは書かれていない.", "スライドを忘れたとは書かれていない.", "", "会議の時間は変わっていない."] },
      { id: "r84q2", q: "What time does the meeting start?", c: ["At 9:40", "At 9:05", "At 10:00", "At 9:08"], a: 2, ev: [1], d: 200, why: "The meeting with the client starts at 10:00 とある.メッセージの時刻と混同しない.", x: ["9時40分は伊藤さんが事務所に着く時刻.", "9時5分は最初のメッセージの時刻.", "", "9時8分は最後のメッセージの時刻."] },
      { id: "r84q3", q: "What will Ms. Ross most likely do next?", c: ["Print some slides", "Call the client", "Change the meeting time", "Meet Mr. Ito at the station"], a: 0, ev: [2,  3], d: 300, why: "伊藤さんの「スライドを印刷してもらえますか」に Sure.(もちろん)と答えている.", x: ["", "顧客に電話するとは書かれていない.", "会議の時間を変えるとは書かれていない.", "駅で会うとは書かれていない."] }
    ]
  },
  {
    id: "r85",
    kind: "社内メール",
    title: "From: Lisa Grant / To: All staff / Subject: New water machine",
    target: 70,
    s: [
      "Hello everyone,",
      "A new water machine has been put in the kitchen on the second floor.",
      "It gives both hot and cold water.",
      "Please do not put cups in the sink; there is a box for used cups next to the machine.",
      "If the machine stops working, please call Tom in the office at extension 25.",
      "Thanks, Lisa"
    ],
    ja: "皆さんへ.2階の給湯室に新しい給水機を置きました.お湯も冷水も出ます.使ったカップは流しに置かず,給水機の横の箱に入れてください.給水機が動かなくなったら,事務所のトム(内線25)に電話してください.",
    qs: [
      { id: "r85q1", q: "Where is the new machine?", c: ["Next to the elevator", "In the lobby", "In Tom's office", "In the kitchen on the second floor"], a: 3, ev: [1], d: 200, why: "in the kitchen on the second floor とある.", x: ["エレベーターの横とは書かれていない.", "ロビーとは書かれていない.", "トムは連絡先で,置き場所ではない.", ""] },
      { id: "r85q2", q: "What should staff do with used cups?", c: ["Wash them in the sink", "Put them in a box", "Take them home", "Give them to Lisa"], a: 1, ev: [3], d: 400, why: "there is a box for used cups next to the machine.流しではなく箱に入れる.", x: ["流しに置かないよう書かれている.", "", "持ち帰るとは書かれていない.", "リサに渡すとは書かれていない."] },
      { id: "r85q3", q: "Why would staff call Tom?", c: ["If the machine is not working", "To order more cups", "To get hot water", "To clean the kitchen"], a: 0, ev: [4], d: 400, why: "If the machine stops working, please call Tom.stops working を is not working と言い換えている.", x: ["", "カップの注文については書かれていない.", "お湯は機械から出る.", "掃除については書かれていない."] }
    ]
  },
  {
    id: "r86",
    kind: "料金表",
    title: "City Bike Rental — Prices",
    target: 80,
    s: [
      "City Bike Rental is open every day from 7:00 A.M. to 8:00 P.M.",
      {t:  "table", cap:  "Prices", head:  ["Time", "Adult", "Child"], rows:  [["1 hour", "$5", "$3"], ["3 hours", "$12", "$7"], ["1 day", "$20", "$12"]]},
      "Helmets are free.",
      "Please bring a photo ID when you rent a bike."
    ],
    ja: "シティ自転車レンタルは毎日午前7時から午後8時まで営業.[表:1時間 大人5ドル・子ども3ドル/3時間 大人12ドル・子ども7ドル/1日 大人20ドル・子ども12ドル]ヘルメットは無料.自転車を借りるときは写真付きの身分証明書を持ってきてください.",
    qs: [
      { id: "r86q1", q: "How much does it cost for one adult to rent a bike for three hours?", c: ["$5", "$12", "$7", "$20"], a: 1, ev: [[1,  1]], d: 300, why: "表の 3 hours の行と Adult の列が交わる所.$12.", x: ["5ドルは大人1時間の料金.", "", "7ドルは子ども3時間の料金.", "20ドルは大人1日の料金."] },
      { id: "r86q2", q: "What is free?", c: ["Water", "Maps", "Helmets", "Locks"], a: 2, ev: [2], d: 200, why: "Helmets are free. とある.", x: ["水は書かれていない.", "地図は書かれていない.", "", "鍵は書かれていない."] },
      { id: "r86q3", q: "What must customers bring?", c: ["A credit card", "A helmet", "A map", "A photo ID"], a: 3, ev: [3], d: 300, why: "Please bring a photo ID とある.", x: ["クレジットカードは書かれていない.", "ヘルメットは無料で借りられる.", "地図は書かれていない.", ""] }
    ]
  },
  {
    id: "r87",
    kind: "求人広告",
    title: "Help Wanted — Green Leaf Restaurant",
    target: 70,
    s: [
      "Green Leaf Restaurant is looking for a part-time server.",
      "The job is on Friday and Saturday evenings from 5:00 to 10:00 P.M.",
      "No experience is needed; we will train you.",
      "Staff get a free dinner on each work day.",
      "Please visit the restaurant and talk to the manager, Ms. Park."
    ],
    ja: "グリーンリーフ・レストランはパートの接客係を募集しています.勤務は金曜と土曜の夜,午後5時から10時.経験は不要で,研修があります.勤務日は夕食が無料.応募はレストランに来て,店長のパクさんに話してください.",
    qs: [
      { id: "r87q1", q: "What job is being advertised?", c: ["A driver", "A cook", "A manager", "A server"], a: 3, ev: [0], d: 200, why: "looking for a part-time server とある.", x: ["運転手とは書かれていない.", "料理人とは書かれていない.", "店長(パクさん)は応募の相手.", ""] },
      { id: "r87q2", q: "What is true about the job?", c: ["It is on weekday mornings.", "It is a full-time job.", "Experience is not needed.", "Staff must pay for dinner."], a: 2, ev: [2], d: 400, why: "No experience is needed とある.NOT ではなく本文と合うものを選ぶ問題は,選択肢を1つずつ本文と照らし合わせる.", x: ["金曜と土曜の夜の仕事.", "part-time(パート)とある.", "", "勤務日の夕食は無料."] },
      { id: "r87q3", q: "How should people apply for the job?", c: ["By sending an e-mail", "By going to the restaurant", "By calling Ms. Park", "By filling out a form online"], a: 1, ev: [4], d: 500, why: "Please visit the restaurant and talk to the manager.visit を going to と言い換えている.", x: ["メールとは書かれていない.", "", "電話ではなく,店に来て話す.", "ネットの用紙とは書かれていない."] }
    ]
  },
  {
    id: "r88",
    kind: "お知らせ",
    title: "Notice — Elevator Repair",
    target: 60,
    s: [
      "The elevator in Building B will be repaired on Thursday, June 12.",
      "The work will start at 9:00 A.M. and finish at about 3:00 P.M.",
      "During this time, please use the stairs or the elevator in Building A.",
      "We are sorry for the trouble."
    ],
    ja: "B 棟のエレベーターは6月12日(木)に修理します.作業は午前9時から午後3時ごろまで.その間は階段か A 棟のエレベーターを使ってください.ご迷惑をおかけします.",
    qs: [
      { id: "r88q1", q: "What will happen on June 12?", c: ["An elevator will be repaired.", "A new building will open.", "The stairs will be closed.", "Building A will be cleaned."], a: 0, ev: [0], d: 200, why: "The elevator in Building B will be repaired on Thursday, June 12. とある.", x: ["", "新しい建物については書かれていない.", "階段は使える.", "A 棟の清掃については書かれていない."] },
      { id: "r88q2", q: "How long will the work take?", c: ["About three hours", "About two hours", "About six hours", "All day"], a: 2, ev: [1], d: 400, why: "9:00 A.M. から 3:00 P.M. まで.時刻の差を計算すると約6時間.", x: ["3時は終わる時刻で,かかる時間ではない.", "午前9時から午後3時までなので約6時間.", "", "午後3時ごろに終わる."] },
      { id: "r88q3", q: "What are people asked to do?", c: ["Stay in Building B", "Use the stairs or another elevator", "Call the office", "Come back on Friday"], a: 1, ev: [2], d: 300, why: "please use the stairs or the elevator in Building A.A 棟のエレベーターを another elevator と言い換えている.", x: ["B 棟にいるようにとは書かれていない.", "", "事務所に電話するとは書かれていない.", "金曜日に来るようにとは書かれていない."] }
    ]
  },

  // ---- 中くらいの長文(緑〜水.記事,予定表とメール,Part 6,お知らせ) ----
  {
    id: "r89",
    kind: "記事",
    title: "Brightfield News — Employees Give Back",
    target: 140,
    s: [
      "Every year, employees at Lane Software are given two paid days off to volunteer in the community.",
      "Last year, more than 80 percent of the staff took part, helping at food banks, schools, and parks.",
      "The program began in 2019 after several employees suggested it during a company meeting.",
      "According to human resources manager Paula Kim, the program has also improved teamwork.",
      "\"People who volunteer together come back to the office with new energy,\" she said.",
      "This year, the company plans to let employees choose their own volunteer activities instead of selecting from a fixed list."
    ],
    ja: "レーン・ソフトウェアの社員は毎年,地域でボランティアをするための有給休暇を2日もらえる.昨年は8割以上の社員が参加し,フードバンクや学校,公園で手伝った.この制度は2019年,社内の会議で何人かの社員が提案して始まった.人事部長のポーラ・キム氏によると,チームワークもよくなったという.「一緒にボランティアをした人は,新しい活力を持って職場に戻ってくる」.今年は,決められた一覧から選ぶのではなく,社員が自分で活動を選べるようにする予定だ.",
    qs: [
      { id: "r89q1", q: "What is the article mainly about?", c: ["A change in working hours", "A new software product", "A company program that lets staff volunteer", "A charity that needs donations"], a: 2, ev: [0], d: 800, why: "1文目が主題.社員がボランティアをするための休暇の制度.", x: ["勤務時間の変更は書かれていない.", "会社はソフトウェア会社だが,記事は製品の話ではない.", "", "寄付を求める慈善団体の話ではない."] },
      { id: "r89q2", q: "How did the program start?", c: ["Employees proposed it.", "A charity asked for help.", "The government required it.", "A manager read about it in the news."], a: 0, ev: [2], d: 1000, why: "after several employees suggested it.suggested を proposed と言い換えている.", x: ["", "慈善団体からの依頼とは書かれていない.", "政府の義務とは書かれていない.", "ニュースで知ったとは書かれていない."] },
      { id: "r89q3", q: "What will change this year?", c: ["Only managers will be able to join.", "Staff will get more days off.", "The program will end.", "Employees will be able to pick their own activities."], a: 3, ev: [5], d: 1200, why: "let employees choose their own volunteer activities.choose を pick と言い換えている.", x: ["管理職だけになるとは書かれていない.", "休暇の日数が増えるとは書かれていない.", "制度が終わるとは書かれていない.", ""] }
    ]
  },
  {
    id: "r90",
    kind: "予定表とメール",
    title: "Training Schedule / E-mail",
    target: 160,
    s: [
      "The following training sessions will be held at the Main Office in June.",
      {t:  "table", cap:  "June sessions", head:  ["Date", "Topic", "Room"], rows:  [["June 3", "Handling complaints", "201"], ["June 10", "Phone skills", "305"], ["June 17", "Writing e-mails", "201"], ["June 24", "Product knowledge", "Hall A"]]},
      {t:  "doc", title:  "E-mail — From: Ken Mori / To: Lisa Grant"},
      "Hi Lisa, I'm sorry, but I can't attend the session on phone skills because I will be on a business trip that week.",
      "Could I join the same session next month instead?",
      "Also, I would like to suggest a topic for a future session: using the new customer database.",
      "Thanks, Ken"
    ],
    ja: "6月に本社で次の研修を行う.[表:6月3日 苦情への対応・201号室/6月10日 電話の応対・305号室/6月17日 メールの書き方・201号室/6月24日 製品知識・Aホール]森さんのメール:申し訳ないのですが,その週は出張なので電話の応対の研修には出られません.代わりに来月の同じ研修に出られますか.それから,今後の研修のテーマとして,新しい顧客データベースの使い方を提案したいです.",
    qs: [
      { id: "r90q1", q: "On what date is the session that Mr. Mori will miss?", c: ["June 3", "June 10", "June 17", "June 24"], a: 1, ev: [[1,  1],  3], d: 1300, why: "メールで出られないのは phone skills の研修.表で Phone skills の行を見ると June 10.2つの文書を見比べる問題.", x: ["6月3日は苦情への対応の研修.", "", "6月17日はメールの書き方の研修.", "6月24日は製品知識の研修."] },
      { id: "r90q2", q: "Where will the session on writing e-mails be held?", c: ["Room 305", "Room 201", "Hall A", "At Mr. Mori's office"], a: 1, ev: [[1,  2]], d: 900, why: "表の Writing e-mails の行の Room は 201.", x: ["305号室は電話の応対の研修.", "", "Aホールは製品知識の研修.", "研修はすべて本社で行われる."] },
      { id: "r90q3", q: "What does Mr. Mori suggest?", c: ["Holding the sessions online", "Moving all sessions to Hall A", "Canceling the June sessions", "A session on using a database"], a: 3, ev: [5], d: 1100, why: "suggest a topic ...: using the new customer database.今後のテーマとして,データベースの使い方を提案している.", x: ["ネットでの研修は提案していない.", "会場の変更は提案していない.", "研修の中止は提案していない.", ""] }
    ]
  },
  {
    id: "r91", part6: true,
    kind: "Part 6 メール",
    title: "E-mail — Your order of office chairs",
    target: 150,
    s: [
      "Dear Ms. Patel,",
      "Thank you for your order of 20 office chairs.",
      "Unfortunately, the color you selected is [1] out of stock.",
      "We expect to receive new stock [2] two weeks.",
      "[3]",
      "If you would prefer a different color, please let us know, and we will ship your order [4].",
      "Sincerely, Mark Lee, Customer Service"
    ],
    ja: "パテル様.事務用椅子20脚のご注文ありがとうございます.あいにく,お選びの色は現在在庫切れです.2週間以内に入荷する見込みです.(椅子が届きしだいご連絡します.)別の色がよろしければお知らせください.すぐに発送いたします.",
    qs: [
      { id: "r91q1", q: "(1)", c: ["currently", "current", "currency", "currents"], a: 0, ev: [2], d: 900, why: "is と out of stock(在庫切れで)の間で,状態がいつのことかを表す副詞 currently(現在).", x: ["", "is と out of stock の間には,形容詞ではなく副詞が入る.", "currency は「通貨」という名詞.", "currents は名詞の複数形."] },
      { id: "r91q2", q: "(2)", c: ["since", "during", "within", "until"], a: 2, ev: [3], d: 1000, why: "within + 期間 で「〜以内に」.2週間以内に入荷する見込み.", x: ["since は「〜以来」で,未来の見込みと合わない.", "during は「〜の間ずっと」で,「2週間以内に入荷する」という意味にならない.", "", "until は「〜までずっと」で,入荷する時点を表せない."] },
      { id: "r91q3", q: "(3)", c: ["Our store is closed on weekends.", "The chairs were delivered last Monday.", "Thank you for paying in cash.", "We will contact you as soon as the chairs arrive."], a: 3, ev: [3,  4,  5], d: 1300, why: "前の文は「2週間以内に入荷する見込み」,後ろの文は「別の色ならすぐ送る」.入荷したら連絡する,という文が自然につながる.", x: ["営業日の話は前後とつながらない.", "在庫切れで届いていないので矛盾する.", "支払い方法の話は前後とつながらない.", ""] },
      { id: "r91q4", q: "(4)", c: ["immediacy", "immediate", "immediately", "more immediate"], a: 2, ev: [5], d: 800, why: "we will ship your order ___ の空所は動詞 ship を修飾する位置.副詞 immediately(すぐに).", x: ["immediacy は名詞.", "動詞 ship を修飾するので,形容詞ではなく副詞.", "", "形容詞の比較級で,動詞を修飾できない."] }
    ]
  },
  {
    id: "r92",
    kind: "お知らせ",
    title: "Notice — Employee Parking Policy",
    target: 150,
    s: [
      "Starting July 1, employees who wish to park in the company garage must apply for a parking permit.",
      "Permits will be issued based on the distance between an employee's home and the office.",
      "Those who live within two kilometers of the office will not be eligible, as they can walk or bicycle to work.",
      "However, employees who carpool with at least two coworkers will receive priority, regardless of distance.",
      "Applications are due by June 15 and can be submitted through the HR portal.",
      "Questions should be directed to the facilities office."
    ],
    ja: "7月1日から,会社の駐車場を使いたい社員は駐車許可を申請しなければならない.許可は自宅と会社の距離に基づいて出す.会社から2キロ以内に住む人は,歩きか自転車で通えるので対象外.ただし,2人以上の同僚と相乗りする社員は,距離にかかわらず優先される.申請は6月15日までに人事のサイトから出すこと.質問は施設管理の担当へ.",
    qs: [
      { id: "r92q1", q: "Why was the notice written?", c: ["To announce the opening of a new garage", "To explain a new rule for using the garage", "To encourage staff to buy cars", "To introduce a new HR manager"], a: 1, ev: [0], d: 1000, why: "駐車場を使うには許可の申請が必要になる,という新しい決まりを知らせている.", x: ["新しい駐車場の開設ではない.", "", "車の購入を勧めてはいない.", "人事の担当者の紹介ではない."] },
      { id: "r92q2", q: "Which employee will most likely NOT be able to get a permit?", c: ["One who lives one kilometer away and drives alone", "One who lives ten kilometers away", "One who shares rides with three coworkers", "One who applies on June 10"], a: 0, ev: [2,  3], d: 1600, why: "2キロ以内に住む人は対象外.ただし相乗りなら優先される.1キロで1人で通う人は,どちらの条件でも許可が出ない.条件を組み合わせて考える問題.", x: ["", "2キロより遠いので対象になる.", "2人以上と相乗りすれば,距離にかかわらず優先される.", "締め切りの6月15日より前なので問題ない."] },
      { id: "r92q3", q: "What is indicated about employees who share rides to work?", c: ["They will be given preference for permits.", "They must live within two kilometers.", "They do not need to apply.", "They must park outside the garage."], a: 0, ev: [3], d: 1500, why: "carpool ... will receive priority.priority を preference と言い換えている.", x: ["", "距離の条件はない(regardless of distance).", "申請が不要とは書かれていない.", "駐車場の外に止めるとは書かれていない."] }
    ]
  },

  // ---- 長文の追加(r93〜r100) ----
  {
    id: "r93",
    kind: "お知らせ",
    title: "Notice — Parkview Apartments Gym Rules",
    target: 90,
    s: [
      "The residents' gym on the ground floor is open from 6:00 A.M. to 10:00 P.M. every day.",
      "Please wipe down all machines after use.",
      "Children under 16 must be accompanied by an adult.",
      "Guests are welcome, but each resident may bring no more than one guest at a time.",
      "If a machine is broken, please report it to the front desk rather than trying to fix it yourself."
    ],
    ja: "1階の住民用ジムは毎日午前6時から午後10時まで開いている.使った後はすべての器具をふくこと.16歳未満は大人の付き添いが必要.来客も利用できるが,住民1人につき同時に1人まで.器具が壊れていたら,自分で直そうとせず受付に知らせること.",
    qs: [
      { id: "r93q1", q: "What are users asked to do after using a machine?", c: ["Turn it off", "Clean it", "Report it to the front desk", "Write their name on a list"], a: 1, ev: [1], d: 300, why: "wipe down all machines after use.ふく = 掃除する(clean).", x: ["電源を切るようには書かれていない.", "", "受付に知らせるのは,器具が壊れていたとき.", "名前を書く話は出てこない."] },
      { id: "r93q2", q: "Who must come with an adult?", c: ["All guests", "Residents over 16", "Children under 16", "New residents"], a: 2, ev: [2], d: 300, why: "Children under 16 must be accompanied by an adult.", x: ["来客は住民1人につき1人まで.大人の付き添いの話ではない.", "16歳以上は付き添い不要.", "", "新しい住民の話は出てこない."] },
      { id: "r93q3", q: "What is indicated about guests?", c: ["They must pay a fee.", "They cannot use the gym.", "A resident can bring only one at a time.", "They must arrive before 6:00 A.M."], a: 2, ev: [3], d: 500, why: "no more than one guest at a time(同時に1人まで).", x: ["料金の話は出てこない.", "Guests are welcome(歓迎)とあり,使える.", "", "午前6時は開く時刻で,来客の条件ではない."] }
    ]
  },
  {
    id: "r94",
    kind: "チャット",
    title: "Online chat — Lena Park, Omar Said, Kate Lin",
    target: 120,
    s: [
      "Lena Park [11:02 A.M.]: The printer on our floor is jammed again. Has anyone called maintenance?",
      "Omar Said [11:04 A.M.]: I did, about an hour ago. They said someone would come after lunch.",
      "Kate Lin [11:05 A.M.]: I need to print 40 copies of the training handout for 1:00. That won't work.",
      "Omar Said [11:06 A.M.]: You could use the printer on the fourth floor. It's working fine.",
      "Kate Lin [11:07 A.M.]: Good idea, but I don't have access to that floor.",
      "Lena Park [11:08 A.M.]: I do. Send me the file, and I'll print them for you right now."
    ],
    ja: "パーク [11:02]:この階のプリンターがまた詰まった.だれか保守に電話した? サイード [11:04]:1時間ほど前にしたよ.昼食の後に来るって. リン [11:05]:1時までに研修の配布資料を40部印刷しないといけないの.それじゃ間に合わない. サイード [11:06]:4階のプリンターを使えば? ちゃんと動いてるよ. リン [11:07]:いい考えだけど,その階に入る権限がないの. パーク [11:08]:私はある.ファイルを送って.今すぐ印刷してあげる.",
    qs: [
      { id: "r94q1", q: "What problem do the writers discuss?", c: ["A printer is not working.", "A training session was canceled.", "The fourth floor is closed.", "A file was deleted."], a: 0, ev: [0], d: 300, why: "The printer on our floor is jammed again.プリンターが詰まって使えない.", x: ["", "研修が中止になったとは書かれていない(1時の研修の資料を作っている).", "4階のプリンターは動いており,階が閉鎖されたわけではない.", "ファイルが消えた話は出てこない."] },
      { id: "r94q2", q: "At 11:05 A.M., what does Ms. Lin mean when she writes, \"That won't work\"?", c: ["The repair will be too expensive.", "The maintenance staff will arrive too late for her.", "The printer cannot print 40 copies.", "She does not know how to use the printer."], a: 1, ev: [1, 2], d: 900, why: "保守の人は昼食の後に来るが,リンさんは1時までに印刷が必要.だから間に合わない,という意味.", x: ["費用の話はしていない.", "", "部数が多すぎるという話ではない(4階のプリンターでなら印刷できる).", "使い方が分からないとは言っていない."] },
      { id: "r94q3", q: "What will Ms. Park most likely do next?", c: ["Call maintenance again", "Give Ms. Lin a key", "Print the handouts on the fourth floor", "Cancel the training"], a: 2, ev: [3, 5], d: 700, why: "パークさんは4階に入れる.Send me the file, and I'll print them for you.4階のプリンターで印刷する.", x: ["保守にはすでにサイードさんが電話している.", "鍵を渡すとは言っていない.自分で印刷すると言っている.", "", "研修を取り消すとは言っていない."] }
    ]
  },
  {
    id: "r95",
    kind: "メール",
    title: "From: Greenline Bus Company / To: Monthly pass holders / Subject: Fare changes",
    target: 140,
    s: [
      "Dear passengers,",
      "From April 1, the price of a monthly bus pass will rise from $60 to $66.",
      "This is the first increase in five years and is necessary to cover higher fuel and maintenance costs.",
      "Passes purchased before April 1 will remain valid until their expiration dates at the old price.",
      "Students and riders over 65 will continue to receive a 50 percent discount.",
      "In addition, we are adding ten new electric buses to the Route 4 line this spring, which will reduce waiting times during rush hour.",
      "Thank you for riding with Greenline."
    ],
    ja: "乗客の皆様.4月1日から,バスの1か月定期券の値段が60ドルから66ドルに上がります.5年ぶりの値上げで,燃料費と整備費の上昇をまかなうために必要です.4月1日より前に買った定期券は,有効期限まで旧価格のまま使えます.学生と65歳以上の方は,引き続き50%引きです.また,この春,4号線に新しい電気バスを10台加え,混雑する時間の待ち時間を短くします.",
    qs: [
      { id: "r95q1", q: "Why is the price of the monthly pass increasing?", c: ["To pay for new bus stops", "Because of rising operating costs", "To reduce the number of passengers", "Because of a new tax"], a: 1, ev: [2], d: 600, why: "to cover higher fuel and maintenance costs.燃料費と整備費 = 運行の費用(operating costs)の上昇.", x: ["バス停を作る話は出てこない.", "", "乗客を減らすためではない.", "税金の話は出てこない."] },
      { id: "r95q2", q: "How much will a student pay for a monthly pass after April 1?", c: ["$30", "$33", "$60", "$66"], a: 1, ev: [1, 4], d: 900, why: "4月1日からの値段は66ドル.学生は50%引きなので 66 ÷ 2 = 33ドル.", x: ["旧価格60ドルの半額.4月1日以降は新価格で計算する.", "", "割引前の旧価格.", "割引前の新価格.学生は50%引きになる."] },
      { id: "r95q3", q: "What is suggested about Route 4?", c: ["It will be closed in spring.", "It is crowded at certain times.", "Its buses will run less often.", "It is the oldest route."], a: 1, ev: [5], d: 1000, why: "電気バスを加えて「混雑する時間(rush hour)の待ち時間を短くする」とあるので,その時間は混んでいると読み取れる.", x: ["閉鎖ではなく,バスを増やす.", "", "バスを増やすので,本数はむしろ増える.", "いちばん古い路線だとは書かれていない."] }
    ]
  },
  {
    id: "r96",
    kind: "表とメール",
    title: "Sunnyside Catering — Lunch Menu Packages",
    target: 170,
    s: [
      { t: "table", head: ["Package", "Price per person", "Includes", "Minimum order"], rows: [
        ["Basic", "$12", "Sandwich, drink", "10 people"],
        ["Standard", "$18", "Sandwich, salad, drink", "10 people"],
        ["Deluxe", "$25", "Hot meal, salad, dessert, drink", "20 people"]
      ] },
      "Vegetarian options are available for every package at no extra cost.",
      "Orders must be placed at least three business days in advance.",
      { t: "doc", title: "E-mail — From: Paul Grant / To: Sunnyside Catering / Date: Monday, June 2" },
      "Hello,",
      "We are holding a training day for 15 new employees on Friday, June 6, and would like to order lunch.",
      "We would like to offer our staff a salad with their meal, and three of them do not eat meat.",
      "Our budget is $20 per person. Please let me know if this is possible."
    ],
    ja: "[表:ベーシック 1人12ドル サンドイッチ・飲み物 最少10人,スタンダード 18ドル サンドイッチ・サラダ・飲み物 10人,デラックス 25ドル 温かい料理・サラダ・デザート・飲み物 20人] どのパッケージでも,追加料金なしで菜食の料理を選べる.注文は3営業日前までに.[メール:6月2日(月) グラントさんから] 6月6日(金)に新入社員15人の研修日があり,昼食を注文したい.食事にサラダを付けたい.3人は肉を食べない.予算は1人20ドル.可能か知らせてほしい.",
    qs: [
      { id: "r96q1", q: "Which package will Mr. Grant most likely order?", c: ["Basic", "Standard", "Deluxe", "None of them"], a: 1, ev: [6, 7, [0, 1]], d: 900, why: "条件はサラダ付き・1人20ドル以内・15人.Standard(18ドル,サラダ付き,最少10人)がすべて満たす.Deluxe は25ドルで予算を超え,最少20人にも足りない.", x: ["Basic にはサラダが付いていない.", "", "Deluxe は1人25ドルで予算(20ドル)を超え,最少人数20人にも届かない.", "Standard が条件を満たすので,どれも合わないわけではない."] },
      { id: "r96q2", q: "What is indicated about the employees who do not eat meat?", c: ["They must pay extra.", "They can get a vegetarian meal at no additional charge.", "They need to bring their own lunch.", "They must order the Deluxe package."], a: 1, ev: [1, 6], d: 700, why: "Vegetarian options are available for every package at no extra cost.どのパッケージでも追加料金なしで菜食を選べる.", x: ["追加料金はかからない.", "", "自分で昼食を持ってくる必要はない.", "どのパッケージでも菜食を選べる."] },
      { id: "r96q3", q: "Can Mr. Grant's order be accepted?", c: ["No, because it is too late to order", "Yes, because it was sent at least three business days early", "No, because the group is too small", "Yes, but only for the Basic package"], a: 1, ev: [2, 3, 5], d: 1200, why: "注文は3営業日前まで.メールは6月2日(月)で,研修は6月6日(金).火・水・木の3営業日があるので間に合う.", x: ["月曜に頼めば金曜には間に合う(3営業日前の条件を満たす).", "", "15人は Standard の最少10人を満たしている.", "Standard も頼める."] }
    ]
  },
  {
    id: "r97",
    kind: "記事",
    title: "Regional Business News — Bookstore Finds New Life as Community Hub",
    target: 180,
    s: [
      "When online sales threatened to close Harbor Books in 2022, owner Rita Gomez decided to change her approach rather than give up.",
      "She turned half of the shop into a café and began hosting free events, including author talks, children's reading hours, and a monthly book club.",
      "Within a year, the number of visitors had doubled, and book sales had risen by 30 percent.",
      "\"People don't just come to buy books anymore,\" Ms. Gomez said. \"They come to meet each other.\"",
      "The café now accounts for about 40 percent of the store's income.",
      "Ms. Gomez admits that running a café was harder than she expected, especially finding staff who could make good coffee.",
      "She is now considering opening a second location in the neighboring town of Westfield, where the only bookstore closed last year."
    ],
    ja: "2022年,ネット販売のせいでハーバー書店が閉店しそうになったとき,店主のゴメス氏はあきらめず,やり方を変えることにした.店の半分をカフェにし,著者の講演,子ども向けの読み聞かせ,月1回の読書会などの無料の催しを始めた.1年のうちに来店者は2倍になり,本の売上は30%増えた.「今はもう本を買うためだけに来るのではない.人と会うために来る」とゴメス氏は話す.カフェは今,店の収入の約40%を占める.ゴメス氏は,カフェの運営は思ったより大変で,特においしいコーヒーをいれられる人を見つけるのが難しかったと認める.今は,昨年唯一の書店が閉店した隣町ウェストフィールドに2号店を開くことを考えている.",
    qs: [
      { id: "r97q1", q: "Why did Ms. Gomez change her business?", c: ["She wanted to retire.", "Her store was losing customers to online sellers.", "She bought a café.", "The building was sold."], a: 1, ev: [0], d: 700, why: "online sales threatened to close Harbor Books.ネット販売に客を取られ,閉店しそうだった.", x: ["引退したかったとは書かれていない(むしろ続けた).", "", "カフェを買ったのではなく,店の半分をカフェにした.", "建物が売られた話は出てこない."] },
      { id: "r97q2", q: "What does Ms. Gomez say was difficult?", c: ["Finding authors for events", "Hiring skilled café workers", "Paying the rent", "Selling children's books"], a: 1, ev: [5], d: 900, why: "finding staff who could make good coffee.おいしいコーヒーをいれられる人 = 腕のいいカフェの店員を見つけること.", x: ["著者を探すのが大変だったとは書かれていない.", "", "家賃の話は出てこない.", "子どもの本の売れ行きの話は出てこない."] },
      { id: "r97q3", q: "Why might Westfield be a good place for a second store?", c: ["It has many cafés.", "Ms. Gomez lives there.", "It currently has no bookstore.", "Rent is cheaper there."], a: 2, ev: [6], d: 1200, why: "where the only bookstore closed last year.唯一の書店が閉店したので,今は書店がない(競合がいない).理由ははっきり書かれていないので,事実から推測する.", x: ["カフェが多いとは書かれていない.", "ゴメス氏がそこに住んでいるとは書かれていない.", "", "家賃の話は出てこない."] }
    ]
  },
  {
    id: "r98",
    kind: "グラフつき報告",
    title: "Lakeside Hotel — Guest Survey Results (Third Quarter)",
    target: 160,
    s: [
      "We asked 500 guests to rate our services on a scale of 1 to 5.",
      { t: "bar", cap: "Average rating (1–5)", items: [["Room cleanliness", 4.6], ["Front desk", 4.4], ["Breakfast", 3.1], ["Wi-Fi", 2.7], ["Location", 4.8]] },
      "Guests were very satisfied with the location and the cleanliness of the rooms.",
      "However, the Wi-Fi received the lowest score, with many guests reporting that the connection was slow in the evenings.",
      "To address this, a faster Internet service will be installed throughout the hotel in October.",
      "Breakfast also received mixed reviews; several guests mentioned that the menu offered few choices.",
      "The kitchen team is currently testing a new menu, which will be introduced next month."
    ],
    ja: "500人の宿泊客に,サービスを1〜5で評価してもらった.[グラフ:平均の評価 部屋の清潔さ4.6,受付4.4,朝食3.1,Wi-Fi 2.7,立地4.8] 客は立地と部屋の清潔さにとても満足していた.しかし Wi-Fi は最も低い評価で,夜に接続が遅いという声が多かった.対策として,10月にホテル全体により速いインターネットを入れる.朝食も評価が分かれ,数人の客がメニューの選択肢が少ないと述べた.調理チームは今,新しいメニューを試しており,来月から出す.",
    qs: [
      { id: "r98q1", q: "Which service received the highest rating?", c: ["Room cleanliness", "Front desk", "Breakfast", "Location"], a: 3, ev: [[1, 4]], d: 400, why: "グラフで最も長い棒は Location(4.8).", x: ["部屋の清潔さは4.6で2番目.", "受付は4.4.", "朝食は3.1で低い方.", ""] },
      { id: "r98q2", q: "What did many guests say about the Wi-Fi?", c: ["It was too expensive.", "It was not available in rooms.", "It was slow at certain times.", "It required a password."], a: 2, ev: [3], d: 600, why: "the connection was slow in the evenings.夜(ある時間帯)に遅かった.", x: ["料金の話は出てこない.", "部屋で使えないとは書かれていない.", "", "パスワードの話は出てこない."] },
      { id: "r98q3", q: "What will the hotel do next month?", c: ["Install faster Internet", "Introduce a new breakfast menu", "Renovate the rooms", "Survey more guests"], a: 1, ev: [6], d: 900, why: "新しいメニューは will be introduced next month(来月から出す).インターネットは10月の予定で,来月とは書かれていない.", x: ["インターネットは「10月に」入れる.来月の予定として書かれているのは朝食のメニュー.", "", "部屋の改装の話は出てこない.", "追加の調査の話は出てこない."] }
    ]
  },
  {
    id: "r99", part6: true,
    kind: "Part 6 お知らせ",
    title: "Notice — Change in Office Supply Ordering",
    target: 140,
    s: [
      "Starting May 1, all orders for office supplies must be [1] through the new online system.",
      "Paper order forms will no longer be accepted.",
      "[2]",
      "Each department has been given a monthly budget, and the system will not allow orders that [3] that amount.",
      "If you need more supplies than your budget allows, please ask your manager to contact Purchasing.",
      "Training sessions on the new system will be held next week. Please sign up [4] as space is limited."
    ],
    ja: "5月1日から,事務用品の注文はすべて新しいオンラインの仕組みで出さなければならない.紙の注文用紙は受け付けなくなる.[ログインには,いつもの社員番号とパスワードを使う.] 各部署には毎月の予算があり,その額を超える注文はできないようになっている.予算より多くの備品が必要なら,部長から購買部に連絡してもらうこと.新しい仕組みの研修を来週開く.定員があるので早めに申し込むこと.",
    qs: [
      { id: "r99q1", q: "(1)", c: ["submit", "submitted", "submitting", "submission"], a: 1, ev: [0], d: 700, why: "注文は「出される」側.must be + 過去分詞 で受動態.", x: ["be の後ろに原形は置けない.", "", "be submitting だと注文が(何かを)出すことになる.", "名詞を置くと「注文は提出である」になり,through 以下とつながらない."] },
      { id: "r99q2", q: "(2)", c: ["To log in, use your usual employee number and password.", "The old system worked very well.", "Office supplies will be free next month.", "Purchasing is located on the second floor."], a: 0, ev: [0, 1, 2], d: 1000, why: "前の文は新しいオンラインの仕組みの話.その使い方(ログイン方法)を続けるのが自然.", x: ["", "古い仕組みをほめる文は,変更を知らせる流れに合わない.", "無料になる話は,後ろの予算の話と矛盾する.", "購買部の場所は,前後の注文方法の話とつながらない."] },
      { id: "r99q3", q: "(3)", c: ["exceed", "exceeds", "excess", "exceeding"], a: 0, ev: [3], d: 900, why: "先行詞 orders(複数)を受ける関係代名詞 that の後ろなので,複数に合わせた動詞 exceed.", x: ["", "先行詞 orders は複数なので -s は付けない.", "excess は名詞・形容詞で,動詞の位置に置けない.", "that の後ろには動詞が必要.-ing だけでは動詞にならない."] },
      { id: "r99q4", q: "(4)", c: ["early", "lately", "earlier than", "soon after"], a: 0, ev: [5], d: 800, why: "定員があるので「早めに」申し込む.early.", x: ["", "lately は「最近」で,勧める内容に合わない.", "earlier than の後ろに比較の相手がない.", "soon after の後ろには基準になる出来事が必要."] }
    ]
  },
  {
    id: "r100", part6: true,
    kind: "Part 6 メール",
    title: "From: Mia Torres / To: Alan Chen / Subject: Conference room booking",
    target: 140,
    s: [
      "Dear Mr. Chen,",
      "I am writing to confirm your booking of Conference Room B for Thursday, March 14, from 2:00 to 5:00 P.M.",
      "The room can [1] up to 25 people and is equipped with a projector and a video conferencing system.",
      "[2], we would like to remind you that food and drinks are not allowed in the room.",
      "Light refreshments can be served in the lounge next door [3] you request them in advance.",
      "[4]",
      "Best regards, Mia Torres, Facilities Coordinator"
    ],
    ja: "チェン様.3月14日(木)午後2時から5時までの会議室 B のご予約を確認します.部屋は25人まで入れ,プロジェクターとビデオ会議の設備があります.なお,部屋の中での飲食はできないことをお知らせします.前もってご依頼いただければ,隣のラウンジで軽食をお出しできます.[予約の変更や取り消しは,前日の正午までにご連絡ください.] 施設担当 トーレス.",
    qs: [
      { id: "r100q1", q: "(1)", c: ["accommodate", "accommodation", "accommodating", "accommodated"], a: 0, ev: [2], d: 900, why: "can の後ろは動詞の原形.accommodate(収容する).", x: ["", "名詞は can の後ろに置けない.", "can の後ろに -ing は置けない.", "can の後ろに過去分詞は置けない."] },
      { id: "r100q2", q: "(2)", c: ["Therefore", "However", "As a result", "For example"], a: 1, ev: [2, 3], d: 1000, why: "設備がそろっているという良い情報の後に,飲食できないという制限を伝える.逆の内容をつなぐ However.", x: ["Therefore(したがって)だと,設備があるから飲食禁止という因果になり,意味が通らない.", "", "As a result(その結果)も因果を表し,合わない.", "For example(例えば)は前の文の具体例のとき.飲食禁止は設備の例ではない."] },
      { id: "r100q3", q: "(3)", c: ["unless", "if", "although", "despite"], a: 1, ev: [4], d: 800, why: "「前もって頼めば出せる」という条件なので if.", x: ["unless(〜しない限り)だと「頼まなければ出せる」になり,意味が逆.", "", "although(〜だけれども)では条件を表せない.", "despite は前置詞で,後ろに節を置けない."] },
      { id: "r100q4", q: "(4)", c: ["Please let us know by noon the day before if you need to change or cancel your booking.", "The projector was broken last month.", "We hope you enjoyed the meal.", "Conference Room B is no longer available."], a: 0, ev: [5, 6], d: 1000, why: "予約の確認のメールの結び.変更・取り消しの連絡方法を伝える文が自然.", x: ["", "プロジェクターが壊れていた話は,設備がそろっているという前の内容と合わない.", "まだ会議の前なので,食事を楽しんだかを尋ねるのは不自然.", "予約を確認したばかりなので,使えないという内容と矛盾する."] }
    ]
  },

  // ---- 長文の追加(r101〜r106):3つの文書を読み比べる問題(設問5問)と,長めの文章 ----
  {
    id: "r101",
    kind: "3文書:お知らせ・メール・予定表",
    title: "Brookfield Business Association — Annual Networking Event",
    target: 330,
    s: [
      { t: "doc", title: "Notice — Brookfield Business Association" },
      "The Brookfield Business Association will hold its annual networking event on Thursday, October 9, at the Riverside Hotel.",
      "The evening will begin with a keynote speech by Nora Whitman, founder of the online retailer Greenbasket.",
      "After the speech, members will have the opportunity to meet representatives from more than 40 local companies.",
      "Tickets cost $45 for members and $70 for non-members, and they include dinner.",
      "Members who register before September 25 will receive a 20 percent discount.",
      { t: "doc", title: "E-mail — From: Daniel Ito / To: Brookfield Business Association / Date: September 22" },
      "Hello,",
      "I would like to register three people from my company, Ito Design, for the networking event.",
      "Two of us are members, and one is a new employee who has not joined the association yet.",
      "Could you also tell me whether the event will end early enough for us to catch the 9:30 P.M. train?",
      "Best regards, Daniel Ito",
      { t: "table", cap: "Event Schedule — October 9", head: ["Time", "Program"], rows: [
        ["6:00 P.M.", "Registration and welcome drinks"],
        ["6:30 P.M.", "Keynote speech"],
        ["7:15 P.M.", "Dinner and networking"],
        ["9:00 P.M.", "Closing remarks"]
      ] }
    ],
    ja: "[お知らせ] ブルックフィールド商工会は10月9日(木)にリバーサイド・ホテルで年1回の交流会を開く.最初に,ネット通販グリーンバスケットの創業者ホイットマン氏の基調講演がある.講演の後,会員は地元の40を超える会社の担当者と会える.参加費は会員45ドル,非会員70ドルで,夕食付き.9月25日より前に申し込んだ会員は20%引き.[メール:9月22日 伊藤さんから] 自社イトウ・デザインから3人を交流会に申し込みたい.2人は会員で,1人はまだ会に入っていない新入社員.午後9時30分の電車に間に合う時刻に終わるかも教えてほしい.[予定表:午後6時 受付・歓迎の飲み物,6時30分 基調講演,7時15分 夕食と交流,9時 閉会のあいさつ]",
    qs: [
      { id: "r101q1", q: "What is the main purpose of the notice?", c: ["To announce a new member of the association", "To ask members to give a speech", "To advertise a hotel's dinner menu", "To give details about an upcoming event"], a: 3, ev: [1, 4], d: 500, why: "交流会の日時・場所・内容・参加費を知らせている.upcoming event(近く行われる催し)の詳細.", x: ["新しい会員を知らせるお知らせではない.", "講演するのはホイットマン氏で,会員に頼んではいない.", "ホテルの夕食の宣伝ではない(夕食は参加費に含まれる一部).", ""] },
      { id: "r101q2", q: "Who is Ms. Whitman?", c: ["A hotel manager", "An association member", "A business owner", "A train company employee"], a: 2, ev: [2], d: 600, why: "founder of the online retailer Greenbasket(ネット通販の創業者)= 事業を持つ人(business owner).", x: ["会場はホテルだが,彼女はホテルの支配人ではない.", "会員かどうかは書かれていない.", "", "電車の話はメールに出てくるだけで,彼女とは関係がない."] },
      { id: "r101q3", q: "How much will Mr. Ito's company most likely pay for the tickets?", c: ["$142", "$135", "$160", "$185"], a: 0, ev: [4, 5, 9], d: 1400, why: "メールは9月22日なので,9月25日より前の申し込み:会員は20%引きで 45 × 0.8 = 36ドル.会員2人で72ドル,非会員1人は70ドル(割引なし).72 + 70 = 142ドル.", x: ["", "会員3人分(45 × 3)で計算している.1人は非会員.", "会員2人を割引なし(45 × 2)にした額.9月25日より前なので20%引きになる.", "非会員2人・会員1人で計算している.会員は2人."] },
      { id: "r101q4", q: "What does Mr. Ito ask about?", c: ["The location of the hotel", "The price of dinner", "The time the event ends", "The number of companies attending"], a: 2, ev: [10], d: 700, why: "whether the event will end early enough to catch the 9:30 P.M. train.終わる時刻を尋ねている.", x: ["会場の場所は尋ねていない.", "夕食の値段は尋ねていない.", "", "参加する会社の数は尋ねていない."] },
      { id: "r101q5", q: "Will Mr. Ito's group be able to catch the 9:30 P.M. train if they stay until the end?", c: ["No, because the event ends at 9:30 P.M.", "Yes, because the event ends at 6:30 P.M.", "No, because dinner starts at 9:00 P.M.", "Yes, because the closing remarks begin at 9:00 P.M."], a: 3, ev: [10, [12, 3]], d: 1100, why: "予定表で閉会のあいさつは午後9時.9時30分の電車に間に合う見込み.メールの質問と予定表を合わせて答える.", x: ["9時30分に終わるとはどこにも書かれていない.", "6時30分は基調講演が始まる時刻.", "夕食は7時15分からで,9時は閉会のあいさつ.", ""] }
    ]
  },
  {
    id: "r102",
    kind: "3文書:広告・注文書・メール",
    title: "Pinewood Office Furniture — Spring Sale",
    target: 340,
    s: [
      { t: "doc", title: "Advertisement — Pinewood Office Furniture" },
      "Our spring sale runs from April 1 to April 15.",
      "All desks and chairs are 25 percent off, and filing cabinets are 10 percent off.",
      "Orders over $1,000 (after discounts) qualify for free delivery and assembly.",
      "Please note that sale items cannot be returned unless they arrive damaged.",
      { t: "table", cap: "Order Form — Lakeview Accounting (submitted April 3)", head: ["Item", "Qty", "Regular price", "Total"], rows: [
        ["Standing desk", "3", "$400", "$1,200"],
        ["Office chair", "3", "$160", "$480"],
        ["Filing cabinet", "2", "$150", "$300"]
      ] },
      { t: "doc", title: "E-mail — From: Grace Lee, Lakeview Accounting / To: Pinewood Office Furniture / Date: April 12" },
      "Dear Sir or Madam,",
      "The furniture we ordered arrived yesterday, and the delivery staff assembled everything quickly.",
      "However, one of the standing desks does not rise properly; the motor makes a loud noise and stops halfway.",
      "I understand that sale items usually cannot be returned, but I believe this case is an exception.",
      "Could you send a technician or arrange a replacement as soon as possible?",
      "Sincerely, Grace Lee"
    ],
    ja: "[広告] 春のセールは4月1日から15日まで.机といすはすべて25%引き,書類棚は10%引き.割引後で1000ドルを超える注文は,配達と組み立てが無料.セール品は,届いたときに傷んでいた場合を除き返品できない.[注文書:レイクビュー会計事務所(4月3日提出) 立ったまま使える机 3台 定価400ドル 計1200ドル,事務いす 3脚 160ドル 計480ドル,書類棚 2台 150ドル 計300ドル] [メール:4月12日 リーさんから] 注文した家具が昨日届き,配達の人がすぐに組み立ててくれた.しかし,立ったまま使える机の1台が正しく上がらない.モーターが大きな音を立て,途中で止まる.セール品はふつう返品できないことは分かっているが,今回は例外だと思う.できるだけ早く技術者を送るか,交換の手配をしてほしい.",
    qs: [
      { id: "r102q1", q: "What is indicated about the spring sale?", c: ["It lasts for one month.", "All items are 25 percent off.", "Chairs are discounted more than filing cabinets.", "Sale items can always be returned."], a: 2, ev: [2], d: 600, why: "机といすは25%引き,書類棚は10%引き.いすの方が割引が大きい.", x: ["4月1日から15日までで,1か月ではない.", "書類棚は10%引きで,すべてが25%引きではない.", "", "届いたときに傷んでいた場合を除き,返品できない."] },
      { id: "r102q2", q: "What is the total cost of Lakeview Accounting's order after the sale discounts?", c: ["$1,530", "$1,980", "$1,485", "$1,260"], a: 0, ev: [2, [5, 0], [5, 1], [5, 2]], d: 1400, why: "机 1200 と いす 480 は25%引き:(1200 + 480) × 0.75 = 1260.書類棚 300 は10%引き:270.合計 1260 + 270 = 1530ドル.", x: ["", "定価の合計.割引を引いていない.", "書類棚も25%引きにした額.書類棚は10%引き.", "机といすだけの割引後の額.書類棚を足していない."] },
      { id: "r102q3", q: "Why most likely did Lakeview Accounting not pay for delivery?", c: ["It picked up the furniture itself.", "It is a regular customer.", "It ordered before April 1.", "Its order was over $1,000 after discounts."], a: 3, ev: [3, 8], d: 1100, why: "割引後の合計は1530ドルで,1000ドルを超えるので配達と組み立てが無料.メールでも配達の人が組み立てたとある.", x: ["配達の人が届けて組み立てたので,自分で取りに行ってはいない.", "常連客かどうかは書かれていない.", "注文は4月3日で,セール期間中.4月1日より前ではない.", ""] },
      { id: "r102q4", q: "What problem does Ms. Lee report?", c: ["A chair was missing.", "The delivery was late.", "A desk does not work correctly.", "The bill was incorrect."], a: 2, ev: [9], d: 600, why: "one of the standing desks does not rise properly(机の1台が正しく上がらない).", x: ["いすが足りないとは書かれていない.", "家具は届いて,すぐ組み立ててもらえた.", "", "請求の誤りの話は出てこない."] },
      { id: "r102q5", q: "Why does Ms. Lee believe her case is an exception to the return policy?", c: ["Because the item was damaged when it arrived", "Because she ordered more than $1,000", "Because the sale ended on April 15", "Because she is a new customer"], a: 0, ev: [4, 9, 10], d: 1300, why: "広告では「届いたときに傷んでいた場合を除き」返品できない.届いた机が最初から正しく動かないので,その例外に当たると考えている.2つの文書の条件をつなぐ.", x: ["", "1000ドルを超える注文の特典は配達と組み立てで,返品とは関係がない.", "セールの終わる日は返品の例外の理由にならない.", "新しい客かどうかは書かれていない."] }
    ]
  },
  {
    id: "r103",
    kind: "3文書:求人・メール・メール",
    title: "Harborview Hotel — Front Desk Supervisor",
    target: 330,
    s: [
      { t: "doc", title: "Job Posting — Harborview Hotel" },
      "Harborview Hotel is seeking a front desk supervisor to lead a team of eight receptionists.",
      "Candidates must have at least two years of experience in hotel reception and be able to work night shifts twice a week.",
      "Knowledge of a second language is an advantage.",
      "Applications should be sent to Ms. Rina Cole, Human Resources Manager, by May 20.",
      { t: "doc", title: "E-mail — From: Ken Saito / To: Rina Cole / Date: May 14" },
      "Dear Ms. Cole,",
      "I am applying for the front desk supervisor position.",
      "I have worked at the reception desk of the Bayside Inn for three years, and for the past year I have trained new staff members.",
      "I speak Japanese, English, and some Korean.",
      "I am happy to work at night, although I would prefer not to work on Sundays because I attend a weekend course.",
      { t: "doc", title: "E-mail — From: Rina Cole / To: Ken Saito / Date: May 23" },
      "Dear Mr. Saito,",
      "Thank you for your application. We would like to invite you to an interview on May 29 at 10:00 A.M.",
      "Please bring a copy of a recent reference letter.",
      "Regarding your schedule, night shifts are on Tuesdays and Fridays, so your weekend course should not be a problem."
    ],
    ja: "[求人] ハーバービュー・ホテルは,8人の受付係をまとめるフロントの責任者を募集している.ホテルの受付の経験が2年以上あり,週2回夜勤ができること.第二言語ができれば有利.応募は5月20日までに人事部長コール氏へ.[メール:5月14日 斎藤さんから] フロントの責任者の職に応募します.ベイサイド・インの受付で3年働き,この1年は新人の研修も担当した.日本語・英語と,少し韓国語を話す.夜勤はかまわないが,週末の講座に通っているので,日曜は働かない方がありがたい.[メール:5月23日 コールさんから] 応募ありがとうございます.5月29日午前10時の面接にお越しください.最近の推薦状の写しを持ってきてください.勤務については,夜勤は火曜と金曜なので,週末の講座は問題ないはずです.",
    qs: [
      { id: "r103q1", q: "What is one requirement of the position?", c: ["Speaking three languages", "Working every weekend", "A university degree", "Experience at a hotel reception desk"], a: 3, ev: [2], d: 500, why: "at least two years of experience in hotel reception(ホテルの受付の経験2年以上)が必須.", x: ["第二言語は有利になるだけで,3か国語は求められていない.", "求められているのは週2回の夜勤で,毎週末ではない.", "学位の話は出てこない.", ""] },
      { id: "r103q2", q: "What is suggested about Mr. Saito?", c: ["He has managed a large team.", "He cannot work at night.", "He meets the experience requirement.", "He works at Harborview Hotel now."], a: 2, ev: [2, 8], d: 900, why: "求人は経験2年以上,斎藤さんは受付で3年働いた.条件(求人)と事実(メール)を照らし合わせる.", x: ["新人の研修はしたが,大きなチームをまとめたとは書かれていない.", "夜勤はかまわないと書いている.", "", "今働いているのはベイサイド・イン."] },
      { id: "r103q3", q: "What does Mr. Saito mention about his schedule?", c: ["He prefers not to work on Sundays.", "He can only work in the mornings.", "He will move to a new city.", "He is available only on weekdays after May 29."], a: 0, ev: [10], d: 600, why: "I would prefer not to work on Sundays because I attend a weekend course.", x: ["", "夜勤もかまわないと言っており,朝だけではない.", "引っ越しの話は出てこない.", "5月29日は面接の日で,勤務の条件ではない."] },
      { id: "r103q4", q: "What is Mr. Saito asked to bring to the interview?", c: ["His passport", "A list of languages", "A reference letter", "A work schedule"], a: 2, ev: [14], d: 500, why: "Please bring a copy of a recent reference letter.推薦状の写し.", x: ["パスポートは求められていない.", "話せる言語の一覧は求められていない.", "", "勤務表は求められていない."] },
      { id: "r103q5", q: "Why does Ms. Cole say that Mr. Saito's course should not be a problem?", c: ["Because night shifts do not fall on Sundays", "Because the course is held online", "Because supervisors do not work on weekends", "Because the interview is on a weekday"], a: 0, ev: [10, 15], d: 1200, why: "夜勤は火曜と金曜で,日曜ではない.斎藤さんが避けたいのは日曜なので,講座とぶつからない.2通のメールをつないで答える.", x: ["", "講座がオンラインとは書かれていない.", "責任者が週末に働かないとは書かれていない(問題がないのは夜勤の曜日の話).", "面接の曜日は講座の問題とは関係がない."] }
    ]
  },
  {
    id: "r104",
    kind: "記事(長文)",
    title: "City Economy Weekly — Small Farms Turn to Subscription Boxes",
    target: 210,
    s: [
      "For years, small vegetable farms around Millford sold most of their produce to wholesalers, who paid low and unpredictable prices.",
      "Now a growing number of them are selling directly to households through weekly subscription boxes.",
      "Customers pay a fixed amount each month and receive a box of seasonal vegetables every Friday.",
      "Because the money arrives in advance, farmers can plan which crops to grow and how many workers to hire.",
      "Ben Ortega, who runs a 12-acre farm north of the city, began offering boxes two years ago with just 30 subscribers.",
      "He now has more than 400, and he says his income has become far more stable.",
      "\"In the past, one bad week at the market could ruin a month,\" he explained.",
      "\"Now I know in March how much I will earn in June.\"",
      "The model is not without difficulties, however.",
      "Customers cannot choose what goes into their boxes, and some cancel when they receive too many vegetables they do not like.",
      "To reduce cancellations, Mr. Ortega now includes recipe cards and allows subscribers to skip up to two weeks per season.",
      "Several farms have also joined together to share a delivery van, which has lowered their transportation costs by about a third.",
      "Local officials hope the trend will help keep farmland around the city from being sold to developers."
    ],
    ja: "長年,ミルフォード周辺の小さな野菜農家は,作物の大半を卸売業者に売ってきたが,値段は安く,予測できなかった.今,週ごとの定期便の箱で家庭に直接売る農家が増えている.客は毎月決まった額を払い,毎週金曜に季節の野菜の箱を受け取る.お金が前もって入るので,農家はどの作物を育て,何人雇うかを計画できる.市の北で12エーカーの農場を営むオルテガ氏は,2年前にたった30人の会員で箱を始めた.今は400人を超え,収入がはるかに安定したという.「昔は市場で1週間うまくいかないだけで1か月がだめになった.今は3月の時点で6月の稼ぎが分かる」.ただし,この方法にも難しさはある.客は箱の中身を選べず,好きでない野菜が多すぎると解約する人もいる.解約を減らすため,オルテガ氏は今,料理のレシピのカードを入れ,1つの季節に2週まで休めるようにしている.また,いくつかの農家が配達用のバンを共同で使い,輸送費をおよそ3分の1下げた.地元の役所は,この流れが市の周りの農地が開発業者に売られるのを防ぐ助けになると期待している.",
    qs: [
      { id: "r104q1", q: "According to the article, why do subscription boxes help farmers?", c: ["They allow farmers to raise prices every week.", "They let customers choose their vegetables.", "They remove the need to hire workers.", "They give farmers money before the vegetables are delivered."], a: 3, ev: [3], d: 900, why: "Because the money arrives in advance(お金が前もって入る)ので計画を立てられる.", x: ["毎週値上げできるとは書かれていない(額は決まっている).", "客は中身を選べない,と書かれている.", "何人雇うかを計画できるという話で,雇わなくてよいのではない.", ""] },
      { id: "r104q2", q: "What does Mr. Ortega mean when he says, \"Now I know in March how much I will earn in June\"?", c: ["He sells most of his crops in June.", "He plans to stop farming in June.", "His income has become predictable.", "He works only from March to June."], a: 2, ev: [5, 6, 7], d: 1100, why: "前の文で「1週間の不調で1か月がだめになった」と昔の不安定さを述べ,今は先の収入が分かる = 収入が予測できる(安定した),という意味.", x: ["6月に作物の大半を売るという意味ではない.", "6月に農業をやめる話ではない.", "", "3月から6月だけ働くという意味ではない."] },
      { id: "r104q3", q: "What is NOT mentioned as a way the farms have dealt with problems?", c: ["Providing recipe cards", "Letting customers skip some weeks", "Sharing a delivery vehicle", "Offering larger boxes"], a: 3, ev: [10, 11], d: 1300, why: "レシピのカード,2週まで休める仕組み,配達用のバンの共同利用は書かれている.箱を大きくする話はない.NOT 問題は本文にある3つを消す.", x: ["recipe cards として書かれている.", "skip up to two weeks per season として書かれている.", "share a delivery van として書かれている.", ""] }
    ]
  },
  {
    id: "r105",
    kind: "社内報(長文)",
    title: "Kestrel Logistics Newsletter — A Year of Flexible Hours",
    target: 210,
    s: [
      "One year ago, Kestrel Logistics replaced its fixed nine-to-five schedule with flexible working hours for office staff.",
      "Employees may now start work at any time between 7:00 and 10:00 A.M., as long as they are present during the core hours of 10:00 A.M. to 3:00 P.M.",
      "The company introduced the system after a survey showed that long commutes were the most common reason employees gave for leaving.",
      "Since then, the number of employees who quit within their first two years has fallen from 18 percent to 11 percent.",
      "Managers were initially concerned that meetings would be harder to schedule.",
      "To avoid this problem, all regular meetings are now held during core hours, and calendars are shared online.",
      "Not every department has benefited equally.",
      "The customer service team, which must answer calls from 8:00 A.M. to 6:00 P.M., found that too many staff members chose to start late.",
      "As a result, the team now uses a rotating schedule in which each member covers the early shift one week per month.",
      "Next spring, the company plans to test a four-day workweek in the accounting department.",
      "If the trial succeeds, it may be offered to other departments as well."
    ],
    ja: "1年前,ケストレル物流は事務職の固定の9時〜5時の勤務を,柔軟な勤務時間に変えた.社員は,午前10時〜午後3時のコアタイムにいれば,午前7時から10時の間のいつ働き始めてもよい.この仕組みは,社員が辞める理由で最も多いのが長い通勤だと調査で分かったことを受けて導入された.それ以来,入社2年以内に辞める社員の割合は18%から11%に下がった.管理職は初め,会議の日程が組みにくくなることを心配した.これを避けるため,定例の会議はすべてコアタイムに開き,予定表はオンラインで共有している.ただし,すべての部署が同じように恩恵を受けたわけではない.午前8時から午後6時まで電話に出なければならない顧客サービス部では,遅く始める人が多すぎた.そのため,今は交代制にし,各自が月に1週,早番を受け持つ.来春,会社は経理部で週4日勤務を試す予定だ.うまくいけば,ほかの部署にも広げるかもしれない.",
    qs: [
      { id: "r105q1", q: "Why did Kestrel Logistics introduce flexible hours?", c: ["To reduce office rent", "To respond to a common reason employees left", "To increase the number of meetings", "To open the office earlier"], a: 1, ev: [2], d: 900, why: "調査で,辞める理由で最も多いのが長い通勤だと分かったため.社員が辞める理由への対応.", x: ["家賃の話は出てこない.", "", "会議を増やすためではない(むしろ組みにくさを心配した).", "事務所を早く開けるためではない."] },
      { id: "r105q2", q: "What problem did the customer service team have?", c: ["Too few calls in the morning", "Not enough staff early in the day", "Meetings held outside core hours", "Long commutes for new employees"], a: 1, ev: [7, 8], d: 1100, why: "8時から電話に出る必要があるのに,遅く始める人が多すぎた = 朝早い時間に人が足りない.だから早番の交代制にした.", x: ["朝の電話が少ないという話ではない.", "", "会議はコアタイムに開いている.", "新人の通勤の話は,顧客サービス部の問題としては出てこない."] },
      { id: "r105q3", q: "What will the company most likely do next spring?", c: ["End flexible hours", "Hire more customer service staff", "Test a shorter workweek in one department", "Move its headquarters"], a: 2, ev: [9], d: 800, why: "test a four-day workweek in the accounting department.経理部で週4日勤務を試す = 1つの部署で短い週の勤務を試す.", x: ["柔軟な勤務時間をやめる話ではない.", "顧客サービス部の人を増やす話は出てこない.", "", "本社の移転の話は出てこない."] }
    ]
  },
  {
    id: "r106",
    kind: "記事(長文)",
    title: "Tech & Trade Review — Repair Instead of Replace",
    target: 220,
    s: [
      "When a phone screen cracks or a laptop battery weakens, many consumers simply buy a new device.",
      "A growing number of manufacturers, however, are now making it easier to repair products instead.",
      "Last month, Valtron Electronics began selling replacement parts directly to customers and publishing free repair guides on its Web site.",
      "The company says the program has two goals: reducing electronic waste and building customer loyalty.",
      "Early results are encouraging. In the first four weeks, the company sold more than 20,000 battery kits, far more than it had forecast.",
      "Independent repair shops have also welcomed the change, since they can now obtain genuine parts at reasonable prices.",
      "Not everyone is enthusiastic, though.",
      "Some retailers worry that repairs will reduce sales of new devices, which account for most of their profits.",
      "Valtron's chief executive, Mira Lund, disagrees.",
      "\"Customers who repair a device they love are likely to buy their next one from us,\" she said.",
      "Industry analysts note that new rules in several countries will soon require manufacturers to provide spare parts for at least seven years, so other companies may have little choice but to follow."
    ],
    ja: "電話の画面が割れたり,ノートパソコンの電池が弱ったりすると,多くの消費者はただ新しい機器を買う.しかし,製品を直しやすくする製造業者が増えている.先月,ヴァルトロン電子は交換部品を客に直接売り始め,Web サイトに無料の修理の手引きを載せた.会社によると,この取り組みの目的は2つ,電子ごみを減らすことと,客の愛着を育てることだ.出だしは順調で,最初の4週で電池の交換キットが2万個以上売れ,予測をはるかに上回った.独立した修理店もこの変化を歓迎している.正規の部品を手ごろな値段で手に入れられるようになったからだ.ただし,だれもが乗り気なわけではない.修理が増えると利益の大半を占める新しい機器の売上が減ると心配する小売店もある.ヴァルトロンのルンド CEO は反対の意見だ.「気に入った機器を直した客は,次の機器も当社から買う可能性が高い」.業界の専門家は,いくつかの国で,製造業者に少なくとも7年間部品を用意するよう求める新しい規則がまもなくできるので,ほかの会社も従うしかないかもしれないと指摘する.",
    qs: [
      { id: "r106q1", q: "What did Valtron Electronics start doing last month?", c: ["Selling new phones at lower prices", "Offering parts and repair instructions to customers", "Opening its own repair shops", "Buying back old devices"], a: 1, ev: [2], d: 800, why: "selling replacement parts directly to customers and publishing free repair guides.部品と修理の手引きを客に提供.", x: ["新しい電話の値下げの話ではない.", "", "自社の修理店を開いたとは書かれていない(独立した修理店が歓迎している).", "古い機器の買い取りの話は出てこない."] },
      { id: "r106q2", q: "Why are some retailers worried?", c: ["Repair parts are too expensive.", "Repair guides contain errors.", "Fewer new devices may be sold.", "Repair shops may close."], a: 2, ev: [7], d: 900, why: "repairs will reduce sales of new devices(修理で新しい機器の売上が減る)と心配している.", x: ["部品は手ごろな値段だと書かれている.", "手引きの誤りの話は出てこない.", "", "修理店はむしろ歓迎している."] },
      { id: "r106q3", q: "According to the analysts, why may other manufacturers follow Valtron?", c: ["Because customers prefer cheaper devices", "Because new regulations will require spare parts", "Because Valtron's sales have fallen", "Because repair shops have asked them to"], a: 1, ev: [10], d: 1300, why: "new rules ... will soon require manufacturers to provide spare parts(部品の提供を求める新しい規則).rules = regulations.have little choice but to follow(従うしかない).", x: ["安い機器を好むという話ではない.", "", "ヴァルトロンの売上はむしろ予測を上回った.", "修理店が頼んだとは書かれていない."] }
    ]
  },
  {
    id: "r107",
    part6: true,
    kind: "Part 6 お知らせ",
    title: "Westfield Public Library — Temporary Closure",
    target: 150,
    s: [
      "The Westfield Public Library will be closed from June 3 to June 14 while the main reading room is [1].",
      "During this period, books may be returned to the drop box next to the parking lot.",
      "Online services, including e-book loans, will remain available.",
      "[2]",
      "When the library reopens, visitors will find new study tables, brighter lighting, and a meeting room [3] for group work.",
      "[4], the children's section will be moved to the second floor to make more space.",
      "We apologize for any inconvenience and look forward to welcoming you back."
    ],
    ja: "ウェストフィールド公立図書館は,大閲覧室の改装中,6月3日から14日まで閉館する.この間,本は駐車場の隣の返却箱に返せる.電子書籍の貸し出しを含むネットのサービスは引き続き使える.[閉館中に返却が遅れた資料の延滞料はかからない.] 再開後は,新しい学習机,明るい照明,グループ学習用に作られた会議室がある.加えて,児童書のコーナーは広さを確保するため2階に移る.ご不便をおわびし,またのお越しをお待ちしている.",
    qs: [
      { id: "r107q1", q: "(1)", c: ["renovation", "renovate", "renovating", "being renovated"], a: 3, ev: [0], d: 900, why: "閲覧室は「改装される」側で,閉館中に作業が進んでいる.is being + 過去分詞(進行形の受け身).", x: ["名詞.閲覧室が「改装」である,では意味が通らない.", "is の後ろに原形は置けない.", "is renovating だと閲覧室が(何かを)改装する側になってしまう.", ""] },
      { id: "r107q2", q: "(2)", c: ["The parking lot will also be repaved next year.", "The library was built more than 80 years ago.", "Please bring your library card to the reopening party.", "Late fees will not be charged for items returned during the closure."], a: 3, ev: [1,2,3], d: 1100, why: "前の2文は閉館中の返却とネットのサービス,つまり「閉館中の利用者への案内」.その続きとして,閉館中の延滞料の扱いが自然.", x: ["駐車場の来年の工事は,閉館中の案内の流れと関係がない.", "建物の古さは,閉館中の案内の流れと関係がない.", "再開のパーティーの話はどこにも出てこない.", ""] },
      { id: "r107q3", q: "(3)", c: ["designs", "designer", "designing", "designed"], a: 3, ev: [4], d: 800, why: "会議室はグループ学習のために「設計された」側.名詞の後ろに置く過去分詞.", x: ["designs は動詞だが,主語がないので文の中で使えない.", "名詞 designer(設計者)は,a meeting room の後ろに続けられない.", "designing だと会議室が(何かを)設計する側になってしまう.", ""] },
      { id: "r107q4", q: "(4)", c: ["For instance", "Instead", "Otherwise", "In addition"], a: 3, ev: [4,5], d: 900, why: "再開後の変更点(机・照明・会議室)に,児童書コーナーの移動を付け加えている.", x: ["For instance は「例えば」.児童書コーナーの移動は前の文の例ではない.", "Instead は「その代わりに」で,前の変更をやめる意味になる.", "Otherwise は「さもなければ」で,意味が通らない.", ""] }
    ]
  },
  {
    id: "r108",
    part6: true,
    kind: "Part 6 メール",
    title: "To: Laura Chen / From: Brightline Office Supply / Subject: Your order #4482",
    target: 150,
    s: [
      "Dear Ms. Chen,",
      "Thank you for your recent order of 20 ergonomic office chairs.",
      "Unfortunately, the model you selected is temporarily out of stock [1] unusually high demand.",
      "We expect to receive a new shipment from the manufacturer by May 12.",
      "[2]",
      "If you would prefer not to wait, we can [3] your chairs with a similar model at no additional cost.",
      "Please let us know which option you prefer by replying to this e-mail.",
      "We [4] regret any inconvenience this may cause.",
      "Sincerely, Brightline Customer Service"
    ],
    ja: "チェン様.先日はオフィスチェア20脚のご注文をありがとうございます.あいにく,お選びの型は注文が異常に多いため一時的に在庫切れです.5月12日までにメーカーから入荷する見込みです.[入荷から2日以内に発送します.] お待ちになりたくない場合は,追加の費用なしで似た型に替えることができます.どちらがよいか,このメールへの返信でお知らせください.ご不便をおかけし,心よりおわびします.",
    qs: [
      { id: "r108q1", q: "(1)", c: ["because", "since", "although", "due to"], a: 3, ev: [2], d: 800, why: "後ろが unusually high demand という名詞のまとまりなので,前置詞のまとまり due to(〜のため).", x: ["because は接続詞で,後ろに「主語 + 動詞」が必要(because of なら可).", "since は理由の接続詞なら後ろに「主語 + 動詞」が必要.前置詞の since は「〜以来」で意味が合わない.", "although は接続詞で,後ろに「主語 + 動詞」が必要.意味も逆.", ""] },
      { id: "r108q2", q: "(2)", c: ["The chairs you ordered were delivered last week.", "Our store will be closed for the holiday on May 1.", "Your chairs will be shipped within two days of their arrival.", "We are pleased to offer you a job interview."], a: 2, ev: [3,4,5], d: 1000, why: "前の文は入荷の見込み.その後の発送の予定を続けると,次の「待ちたくなければ」につながる.", x: ["在庫切れで届いていないので,先週届いたという内容と矛盾する.", "店の休みは,入荷と発送の話と関係がない.", "", "面接の話は注文のメールと関係がない."] },
      { id: "r108q3", q: "(3)", c: ["return", "repair", "remove", "replace"], a: 3, ev: [5], d: 1100, why: "replace A with B で「A を B に取り替える」.在庫切れの型を似た型に替える提案.", x: ["return は「返す」で,with a similar model と組んで「取り替える」意味にならない.", "repair は「修理する」で,まだ届いていない椅子には合わない.", "remove は「取り除く」で,似た型を届ける提案にならない.", ""] },
      { id: "r108q4", q: "(4)", c: ["sincere", "sincerity", "sincerely", "sincerest"], a: 2, ev: [7], d: 800, why: "動詞 regret を修飾するので副詞 sincerely.", x: ["形容詞は動詞を修飾できない.", "名詞は主語と動詞の間に置けない.", "", "最上級の形容詞も動詞を修飾できない."] }
    ]
  },
  {
    id: "r109",
    part6: true,
    kind: "Part 6 記事",
    title: "Harbor Town Gazette — Local Bakery to Open Second Shop",
    target: 150,
    s: [
      "Sunrise Bakery, a family-owned shop on Elm Street, will open a second location downtown next month.",
      "The new store will be [1] larger than the original, with seating for 40 customers.",
      "Owner Maria Lopez said the decision was driven by customer requests.",
      "\"For years, people have told us they wanted a place to sit and enjoy our bread with coffee,\" she explained.",
      "[2]",
      "The bakery is now hiring bakers and counter staff, and applicants with no experience are [3] to apply.",
      "Training will be provided to all new employees.",
      "Ms. Lopez added that prices at both locations will remain the same, [4] the higher rent downtown."
    ],
    ja: "エルム通りの家族経営の店サンライズ・ベーカリーは,来月中心街に2号店を開く.新しい店は元の店よりずっと広く,40人分の席がある.店主ロペスさんによると,客の要望を受けての決定だ.「何年も前から,座ってパンとコーヒーを楽しめる場所が欲しいと言われてきた」と彼女は説明した.[中心街の店ではコーヒーと軽い昼食も出す.] 店はパン職人と店頭係を募集中で,未経験者の応募も歓迎だ.新しい従業員には全員研修がある.ロペスさんは,中心街の家賃は高いが,両店の価格は同じに保つと付け加えた.",
    qs: [
      { id: "r109q1", q: "(1)", c: ["most", "more", "very", "much"], a: 3, ev: [1], d: 900, why: "比較級 larger を強めるのは much(far, even も可).", x: ["most は最上級をつくる語で,larger の前に置けない.", "more larger は比較級を重ねていて誤り.", "very は比較級を強められない.", ""] },
      { id: "r109q2", q: "(2)", c: ["The downtown shop will also offer coffee and light lunches.", "The original shop closed in 2010.", "Bread prices have doubled since last year.", "Ms. Lopez plans to retire next month."], a: 0, ev: [3,4], d: 1100, why: "前の文は「座ってパンとコーヒーを楽しみたい」という客の声.新しい店でそれに応えることを続けるのが自然.", x: ["", "最後の文に both locations とあり,元の店は営業している.", "最後の文で価格は同じに保つとあり,値上がりの話と合わない.", "ロペスさんは店主として新店の計画を語っており,引退の話は出てこない."] },
      { id: "r109q3", q: "(3)", c: ["encourage", "encouraged", "encouraging", "encouragement"], a: 1, ev: [5], d: 900, why: "応募者は「勧められる」側.be encouraged to do で「〜するよう勧められる(歓迎される)」.", x: ["are の後ろに原形は置けない.", "", "are encouraging だと応募者が(だれかを)励ます側になる.", "名詞.応募者が「励まし」である,では意味が通らない."] },
      { id: "r109q4", q: "(4)", c: ["although", "because of", "despite", "even if"], a: 2, ev: [7], d: 1100, why: "後ろが the higher rent downtown という名詞のまとまりで,「家賃が高いにもかかわらず」の意味なので前置詞 despite.", x: ["although は接続詞で,後ろに「主語 + 動詞」が必要.", "because of は「〜のため」で,家賃が高いから価格を据え置く,では意味が逆.", "", "even if は接続詞で,後ろに「主語 + 動詞」が必要."] }
    ]
  },
  {
    id: "r110",
    part6: true,
    kind: "Part 6 社内メモ",
    title: "To: All staff / From: Finance Department / Subject: New expense reporting system",
    target: 150,
    s: [
      "Beginning October 1, all expense reports must be submitted through ExpensePro, our new online system.",
      "Paper forms will no longer be [1].",
      "The new system allows you to upload photos of receipts directly from your phone.",
      "[2]",
      "To help you get started, the Finance Department will hold training sessions on September 15 and 22.",
      "Each session lasts about 30 minutes, and [3] the same material.",
      "Please register through the company intranet.",
      "[4] you have any questions, please contact Ken Ito in Finance at extension 214."
    ],
    ja: "10月1日から,経費の報告はすべて新しいネットの仕組み ExpensePro で出すこと.紙の用紙は受け付けなくなる.新しい仕組みでは,領収書の写真を携帯電話から直接上げられる.[その結果,経費の払い戻しが早く処理される.] 使い始めの助けとして,経理部が9月15日と22日に研修を開く.どちらも約30分で,内容は同じだ.社内のネットから申し込むこと.質問があれば,経理部の伊藤(内線214)へ.",
    qs: [
      { id: "r110q1", q: "(1)", c: ["acceptance", "acceptable", "accepting", "accepted"], a: 3, ev: [1], d: 800, why: "紙の用紙は「受け付けられる」側.will no longer be + 過去分詞.", x: ["名詞.用紙が「受け入れ」である,では意味が通らない.", "acceptable は「許容できる」で,用紙がもう許容できない,では方針の伝え方として不自然.", "accepting だと用紙が(何かを)受け付ける側になる.", ""] },
      { id: "r110q2", q: "(2)", c: ["As a result, reimbursements will be processed more quickly.", "The cafeteria will be closed on Friday.", "Please keep paper forms in a safe place.", "The finance team moved to the third floor last year."], a: 0, ev: [2,3], d: 1100, why: "前の文は新しい仕組みの便利な点.その結果として払い戻しが早くなる,と利点を続けるのが自然.", x: ["", "食堂の休みは,経費の仕組みの話と関係がない.", "紙の用紙はもう受け付けないので,保管を求めるのは矛盾する.", "経理部の移転は,新しい仕組みの説明と関係がない."] },
      { id: "r110q3", q: "(3)", c: ["both covers", "both cover", "neither cover", "each cover"], a: 1, ev: [4,5], d: 1100, why: "研修は2回で,どちらも同じ内容.both は複数扱いなので cover.", x: ["both は複数扱いなので,三人称単数の covers は使えない.", "", "neither だと「どちらも同じ内容を扱わない」となり意味が逆.また単数扱いで covers になる.", "each は単数扱いなので covers が必要."] },
      { id: "r110q4", q: "(4)", c: ["Unless", "Whether", "If", "Although"], a: 2, ev: [7], d: 700, why: "「質問があれば」という条件なので If.", x: ["Unless は「〜でない限り」で,質問がなければ連絡,と意味が逆になる.", "Whether は「〜かどうか」で,文の頭に置いて条件を表せない(or not と組む譲歩なら意味が合わない).", "", "Although は「〜だけれども」で,意味が通らない."] }
    ]
  },
  {
    id: "r111",
    part6: true,
    kind: "Part 6 広告",
    title: "Grand Opening at Peak Fitness!",
    target: 150,
    s: [
      "Peak Fitness is opening its newest gym at 250 Lake Avenue on April 5.",
      "Our facility features modern equipment, a heated pool, and more than 30 group classes [1] by certified instructors.",
      "To celebrate the opening, we are offering a special membership rate of $29 per month.",
      "This offer is available only to those who sign up [2] April 30.",
      "[3]",
      "Members can also bring a guest for free on weekends, [4] makes it easy to share the experience with friends.",
      "Visit our Web site or stop by the front desk to learn more."
    ],
    ja: "ピーク・フィットネスは4月5日,レイク通り250番地に最新のジムを開く.最新の器具,温水プール,資格を持つ指導者による30以上のグループ教室がある.開業を祝い,月29ドルの特別会費を用意した.この特典は4月30日までに申し込んだ人だけが対象.[その後は通常の月49ドルになる.] 会員は週末に1人を無料で連れて来られるので,友人と一緒に楽しみやすい.詳しくは Web サイトか受付で.",
    qs: [
      { id: "r111q1", q: "(1)", c: ["leads", "leading", "lead", "led"], a: 3, ev: [1], d: 900, why: "教室は指導者に「指導される」側.名詞の後ろに過去分詞を置き,by で指導者を示す.", x: ["leads は動詞だが,文にはすでに features という動詞がある.", "leading だと教室が(何かを)率いる側になり,by certified instructors と合わない.", "原形は名詞の後ろに続けられない.", ""] },
      { id: "r111q2", q: "(2)", c: ["by", "until", "since", "during"], a: 0, ev: [3], d: 1000, why: "申し込みは1回で済む動作.その期限を示すのは by(〜までに).until は状態が続くときに使う.", x: ["", "until は「〜までずっと」で,1回の動作の期限には使わない.", "since は「〜以来」で,期限を示せない.", "during は後ろに期間を表す名詞が必要.April 30 は1日だけで,期限の意味にもならない."] },
      { id: "r111q3", q: "(3)", c: ["The pool will be closed for repairs all year.", "After that, the regular rate of $49 per month will apply.", "Group classes are not included in any membership.", "The gym on Lake Avenue closed last month."], a: 1, ev: [2,3,4], d: 1100, why: "前の2文は特別料金と申し込みの期限.期限の後どうなるかを続けるのが自然.", x: ["温水プールは施設の目玉として紹介されており,1年中休みでは矛盾する.", "", "グループ教室は施設の特長として紹介されており,会員に含まれないのは不自然.", "レイク通りのジムはこれから開くので,先月閉店したのは矛盾する."] },
      { id: "r111q4", q: "(4)", c: ["that", "what", "which", "it"], a: 2, ev: [5], d: 1300, why: "カンマの後ろで,前の文の内容(週末に無料で連れて来られること)を受ける関係代名詞 which.", x: ["that はカンマの後ろ(非制限用法)では使えない.", "what は先行詞を含むので,前の文を受けて説明を続けられない.", "", "it だとカンマで2つの文をつなぐことになり,接続詞がない."] }
    ]
  },
  {
    id: "r112",
    part6: true,
    kind: "Part 6 手紙",
    title: "Greenfield Business Association — Letter to a speaker",
    target: 150,
    s: [
      "Dear Dr. Patel,",
      "On behalf of the Greenfield Business Association, I would like to thank you for speaking at our annual conference last Thursday.",
      "Your presentation on sustainable packaging was [1] informative and entertaining.",
      "Many attendees told us it was the highlight of the event.",
      "[2]",
      "We have also received several requests for a copy of your slides.",
      "If you are willing to share them, we would be happy to [3] them to our members by e-mail.",
      "We hope to have the [4] of working with you again in the future.",
      "Sincerely, Rachel Kim, Event Coordinator"
    ],
    ja: "パテル博士.グリーンフィールド商工会を代表し,先週木曜日の年次会議でのご講演にお礼を申し上げる.持続可能な包装についてのご発表は,有益で,しかも楽しいものだった.多くの参加者が,催しのいちばんの見どころだったと言っていた.[実際,私たちのアンケートでも最も高い評価を受けた.] また,スライドの写しが欲しいという要望もいくつか届いている.共有していただけるなら,会員にメールで配りたい.今後もまたご一緒できれば幸いだ.催し担当 レイチェル・キム",
    qs: [
      { id: "r112q1", q: "(1)", c: ["either", "so", "neither", "both"], a: 3, ev: [2], d: 900, why: "後ろの and と組んで both A and B(A でも B でもある).", x: ["either は or と組む(either A or B).", "so informative and entertaining では「とても」の意味になり,後ろに that 節もなく,and と組む形にならない.", "neither は nor と組む(neither A nor B).", ""] },
      { id: "r112q2", q: "(2)", c: ["In fact, it received the highest rating in our survey.", "Unfortunately, the conference was canceled.", "Your next presentation will be in Room 4.", "We apologize for the poor sound quality."], a: 0, ev: [3,4], d: 1100, why: "前の文「いちばんの見どころだった」を,アンケートの結果で裏付けている.In fact は「実際に」.", x: ["", "会議は先週開かれ,講演も行われたので矛盾する.", "次の講演の部屋の話は,お礼の手紙の流れに合わない.", "前後は講演をほめる内容で,音の悪さのおわびは流れに合わない."] },
      { id: "r112q3", q: "(3)", c: ["contribute", "distribute", "attribute", "substitute"], a: 1, ev: [6], d: 1200, why: "スライドを会員に「配る」.distribute A to B.", x: ["contribute は「寄付する・貢献する」で,スライドを会員に配る意味にならない.", "", "attribute A to B は「A を B のせいにする」で,意味が合わない.", "substitute は「代わりに使う」で,意味が合わない."] },
      { id: "r112q4", q: "(4)", c: ["pleased", "pleasant", "pleasure", "please"], a: 2, ev: [7], d: 800, why: "the の後ろなので名詞.have the pleasure of -ing で「〜する喜びを得る」.", x: ["過去分詞(形容詞)は the の後ろに単独で置けない.", "形容詞 pleasant は the の後ろに名詞なしで置けない.", "", "please は動詞・副詞で,the の後ろに置けない."] }
    ]
  },
  {
    id: "r113",
    part6: true,
    kind: "Part 6 Web ページ",
    title: "QuickShip — Frequently Asked Questions",
    target: 150,
    s: [
      "How can I track my package?",
      "Once your order has [1], you will receive an e-mail with a tracking number.",
      "Enter this number on our Web site to see where your package is at any time.",
      "What if I am not home when my package arrives?",
      "Our drivers will leave the package in a safe place, [2] behind a gate or inside a porch.",
      "If no safe place is available, the package will be taken to the nearest QuickShip service point.",
      "[3]",
      "Packages that are not picked up within seven days will be [4] to the sender."
    ],
    ja: "荷物の追跡方法は? 注文が発送されると,追跡番号つきのメールが届く.その番号を Web サイトに入れると,いつでも荷物の場所が分かる.荷物が届くときに家にいなかったら? 運転手が,門の内側や玄関の中など安全な場所に置いていく.安全な場所がなければ,荷物は最寄りの QuickShip の窓口に運ばれる.[どこで受け取れるかは携帯電話のメッセージで知らせる.] 7日以内に受け取られなかった荷物は,差出人に返送される.",
    qs: [
      { id: "r113q1", q: "(1)", c: ["ships", "been shipping", "shipping", "been shipped"], a: 3, ev: [1], d: 1000, why: "注文の品は「発送される」側.has been + 過去分詞(現在完了の受け身).", x: ["has の後ろに三人称単数の形は置けない.", "has been shipping だと注文が(何かを)発送し続けている,となる.", "has の後ろに -ing だけは置けない.", ""] },
      { id: "r113q2", q: "(2)", c: ["such as", "as such", "so that", "such that"], a: 0, ev: [4], d: 1100, why: "安全な場所の例(門の内側・玄関の中)を挙げているので such as(例えば〜のような).", x: ["", "as such は「それ自体として・そういうものとして」で,例を挙げられない.", "so that は「〜するために」で,後ろに「主語 + 動詞」が必要.", "such that は「〜するような」で,後ろに「主語 + 動詞」が必要."] },
      { id: "r113q3", q: "(3)", c: ["Drivers are not allowed to use the elevator.", "You will be notified by text message where you can collect it.", "Tracking numbers are not available for international orders.", "Our drivers work only on weekends."], a: 1, ev: [5,6,7], d: 1100, why: "前の文は窓口に運ばれる場合.どこで受け取れるかの知らせを続けると,次の「受け取られなかった荷物」につながる.", x: ["エレベーターの話は,不在時の荷物の扱いの流れと関係がない.", "", "追跡番号の話は前半の質問のもので,不在時の答えの途中に置くと流れが切れる.", "運転手の勤務日は,不在時の荷物の扱いと関係がない."] },
      { id: "r113q4", q: "(4)", c: ["refunded", "replaced", "returned", "reduced"], a: 2, ev: [7], d: 900, why: "受け取られなかった荷物は差出人に「返送される」.return A to B.", x: ["refund は「返金する」で,荷物そのものには使わない.", "replace は「取り替える」で,to the sender と組まない.", "", "reduce は「減らす」で,意味が合わない."] }
    ]
  },
  {
    id: "r114",
    part6: true,
    kind: "Part 6 プレスリリース",
    title: "FOR IMMEDIATE RELEASE — Norland Foods Names New Chief Executive",
    target: 160,
    s: [
      "Norland Foods announced today that Elena Ruiz will become its next chief executive officer, [1] March 1.",
      "Ms. Ruiz has worked at Norland for 15 years, most recently as head of international sales.",
      "Under her leadership, the company's sales in Asia more than tripled.",
      "[2]",
      "She will replace Thomas Grant, who is retiring after leading the company for over a decade.",
      "Mr. Grant will remain on the board of directors to ensure a smooth [3].",
      "\"Elena understands our customers and our people,\" Mr. Grant said. \"I am confident that the company will continue to grow [4] her direction.\""
    ],
    ja: "ノーランド・フーズは本日,エレナ・ルイス氏が3月1日付で次の最高経営責任者になると発表した.ルイス氏は同社に15年勤め,直近は国際営業の責任者だった.その指揮のもとで,アジアでの売上は3倍を超えた.[ベトナムとタイに同社初の事務所も開いた.] 10年以上会社を率いて退任するトーマス・グラント氏の後を継ぐ.グラント氏は円滑な引き継ぎのため取締役に残る.「エレナは客と社員をよく理解している.彼女の指揮のもとで会社は成長を続けると確信している」とグラント氏は述べた.",
    qs: [
      { id: "r114q1", q: "(1)", c: ["effect", "effectiveness", "effectively", "effective"], a: 3, ev: [0], d: 1200, why: "effective + 日付 で「〜付けで(〜から有効で)」.人事の発表でよく使う.", x: ["名詞 effect は日付の前に置いて「〜付け」の意味にならない(in effect なら可).", "名詞 effectiveness は「有効性」で,意味が合わない.", "副詞 effectively は「効果的に」で,日付の前に置けない.", ""] },
      { id: "r114q2", q: "(2)", c: ["She also opened the company's first offices in Vietnam and Thailand.", "Norland Foods was founded by her grandfather.", "She plans to leave the company next year.", "Sales in Asia fell sharply last year."], a: 0, ev: [2,3], d: 1200, why: "前の文はアジアでの実績.その実績をもう1つ付け加えるのが自然(also).", x: ["", "創業者の話はどこにも出てこず,実績を述べる流れに合わない.", "次の最高経営責任者になる人が来年辞めるのは矛盾する.", "前の文で売上が3倍を超えたとあり,矛盾する."] },
      { id: "r114q3", q: "(3)", c: ["transaction", "transition", "transmission", "translation"], a: 1, ev: [4,5], d: 1300, why: "前の経営者から新しい経営者への「引き継ぎ・移行」.a smooth transition で「円滑な引き継ぎ」.", x: ["transaction は「取引」で,経営者の交代には使わない.", "", "transmission は「送信・伝達」で,意味が合わない.", "translation は「翻訳」で,意味が合わない."] },
      { id: "r114q4", q: "(4)", c: ["below", "over", "under", "beneath"], a: 2, ev: [6], d: 1100, why: "under one's direction で「〜の指揮のもとで」.前の Under her leadership と同じ形.", x: ["below は位置や数値が下であることを表し,指揮のもとの意味にならない.", "over her direction では「指揮を越えて」となり,意味が通らない.", "", "beneath は「真下に・(身分が)下の」で,意味が合わない."] }
    ]
  },
  {
    id: "r115",
    kind: "記事(長文)",
    title: "Workplace Weekly — Is the Four-Day Week Here to Stay?",
    target: 260,
    s: [
      "When Calder Analytics announced last spring that its 400 employees would work four days a week for the same pay, many competitors predicted that productivity would collapse.",
      "A year later, the company's own figures tell a different story.",
      "Output per employee rose by 6 percent, and the number of staff who left the company fell by nearly half.",
      "Chief operating officer Priya Nair attributes the results less to the extra day off than to the changes the company made to prepare for it.",
      "\"We had to eliminate meetings that existed only out of habit,\" she said. \"Once people protected their time, they found they could finish in four days what used to take five.\"",
      "Not every firm has been so fortunate.",
      "A regional call center that adopted a similar schedule abandoned it after six months, because customers expected someone to answer the phone five days a week.",
      "Analysts note that the model tends to succeed where work is measured by results rather than by hours spent at a desk.",
      "Even supporters concede that a shorter week is not a universal remedy.",
      "\"It amplifies whatever is already there,\" said labor economist Daniel Okafor. \"A well-managed team becomes more focused; a poorly managed one simply has less time to fix its problems.\"",
      "For now, Calder plans to keep the schedule, although it will review the arrangement again next year."
    ],
    ja: "カルダー・アナリティクスが昨春,400人の社員が同じ給料で週4日働くと発表したとき,多くの競合は生産性が崩れると予想した.1年後,同社の数字は違う結果を示している.社員1人あたりの生産量は6%増え,辞めた社員の数はほぼ半分に減った.最高執行責任者のナイル氏は,この結果は休みが1日増えたことよりも,それに備えて会社が行った変更によるものだと考えている.「習慣だけで続いていた会議をなくさなければならなかった.時間を守るようになると,5日かかっていたことが4日で終わると分かった」.どの会社もこれほどうまくいったわけではない.同じような勤務を取り入れたある地方のコールセンターは,客が週5日電話に出てもらえると期待していたため,6か月でやめた.専門家は,この方式は机に向かった時間ではなく成果で仕事を測る職場で成功しやすいと指摘する.支持する人でさえ,短い週が万能薬ではないと認める.「もともとあるものを増幅する.よく管理されたチームはより集中するが,管理の悪いチームは問題を直す時間が減るだけだ」と労働経済学者のオカフォー氏は言う.カルダーは今のところこの勤務を続けるが,来年もう一度見直す.",
    qs: [
      { id: "r115q1", q: "According to Ms. Nair, what mainly caused the improvement at Calder Analytics?", c: ["Hiring additional employees", "Giving staff an extra day off", "Raising employees' salaries", "Changing how work time was used"], a: 3, ev: [3,4], d: 1500, why: "ナイル氏は休みが増えたこと「よりも」,備えて行った変更(習慣だけの会議をなくし,時間を守ったこと)によると言っている.less A than B は「A よりむしろ B」.", x: ["人を増やした話は出てこない.", "less to the extra day off とあり,休みの日が主な理由ではないと言っている.", "給料は同じ(for the same pay)で,上げていない.", ""] },
      { id: "r115q2", q: "Why did the call center stop using the four-day schedule?", c: ["It could not meet customers' expectations.", "Its employees disliked the longer workdays.", "Its productivity fell by 6 percent.", "Its managers were poorly trained."], a: 0, ev: [6], d: 1400, why: "客が週5日電話に出てもらえると期待していたので,やめた.", x: ["", "勤務時間が長くなったことへの不満は書かれていない.", "6%は Calder の生産量が「増えた」数字で,コールセンターの話ではない.", "管理職の研修については書かれていない."] },
      { id: "r115q3", q: "What does Mr. Okafor suggest about the four-day week?", c: ["It should be required by law.", "It makes existing strengths and weaknesses more visible.", "It works best for small companies.", "It will soon be adopted by most employers."], a: 1, ev: [9], d: 2000, why: "「もともとあるものを増幅する」.良いチームはより集中し,悪いチームは問題を直す時間が減る,つまり長所も短所も大きくなる.amplify(増幅する)を言いかえた選択肢.", x: ["法律で義務づけるべきだとは言っていない.", "", "会社の大きさについては言っていない.", "多くの会社がすぐ取り入れるとは言っておらず,むしろ万能ではないという立場."] }
    ]
  },
  {
    id: "r116",
    kind: "記事(長文)",
    title: "Global Trade Review — Closer to Home",
    target: 250,
    s: [
      "For three decades, manufacturers chased the lowest possible labor costs, often moving production to factories thousands of kilometers from their customers.",
      "That strategy is now being reconsidered.",
      "Repeated disruptions to shipping have shown how fragile long supply chains can be: a single delay at a port can leave store shelves empty for weeks.",
      "In response, a growing number of firms are pursuing what is known as nearshoring, relocating production to countries closer to their main markets.",
      "Labor in these locations is usually more expensive, but executives argue that the savings in freight and inventory more than offset the difference.",
      "Shorter shipping routes also allow companies to respond quickly when consumer tastes change, reducing the risk of being left with unsold goods.",
      "The shift is not without obstacles.",
      "Many of the newer manufacturing regions lack experienced suppliers, and building that network can take years.",
      "Some firms have therefore adopted a hybrid approach, keeping the production of standard parts overseas while assembling finished products nearby.",
      "Economists caution that nearshoring will not reverse globalization so much as reshape it, with trade increasingly organized around regional hubs."
    ],
    ja: "30年間,製造業者はできるだけ安い人件費を追い求め,客から何千キロも離れた工場へ生産を移すことが多かった.その戦略が今,見直されている.輸送の混乱が繰り返され,長い供給網がいかにもろいかが明らかになった.港での1回の遅れで,店の棚が何週間も空になることがある.これを受け,主な市場に近い国へ生産を移す,いわゆるニアショアリングを進める会社が増えている.こうした場所の人件費はふつう高いが,経営者たちは運賃と在庫の節約がその差を上回ると主張する.輸送の道のりが短いと,消費者の好みが変わったときにすぐ対応でき,売れ残りを抱える危険も減る.この変化に障害がないわけではない.新しい製造地域の多くには経験のある部品業者が少なく,その網を作るには何年もかかる.そのため,標準的な部品の生産は海外に残し,完成品の組み立ては近くで行う折衷のやり方をとる会社もある.経済学者は,ニアショアリングはグローバル化を逆戻りさせるというより作り変えるもので,貿易はますます地域の拠点を中心に組み立てられると注意を促している.",
    qs: [
      { id: "r116q1", q: "What is the article mainly about?", c: ["A rise in the cost of labor overseas", "The construction of new ports", "A change in where companies locate production", "Consumer complaints about empty shelves"], a: 2, ev: [1,3], d: 1300, why: "長年の海外生産の戦略が見直され,市場に近い国へ生産を移す動き(nearshoring)が記事の中心.", x: ["海外の人件費が上がった話ではない.むしろ近くの国の方が高いとある.", "港を新しく作る話は出てこない.", "", "空の棚は供給網のもろさの例で,記事の主題ではない."] },
      { id: "r116q2", q: "According to the article, why do executives accept higher labor costs?", c: ["Government programs pay part of their wages.", "Customers are willing to pay higher prices.", "Workers near their markets are more experienced.", "Lower transportation and inventory costs make up for them."], a: 3, ev: [4], d: 1500, why: "運賃と在庫の節約が人件費の差を上回る(more than offset)と主張している.offset を make up for(埋め合わせる)と言いかえた選択肢.", x: ["政府の補助については書かれていない.", "客が高い値段を払う気があるとは書かれていない.", "新しい地域には経験のある部品業者が少ないとあり,むしろ逆.", ""] },
      { id: "r116q3", q: "The word \"offset\" in the article is closest in meaning to", c: ["compensate for", "set aside", "point out", "cause"], a: 0, ev: [4], d: 1700, why: "節約が人件費の差を「埋め合わせる」の意味.compensate for と同じ.", x: ["", "set aside は「取っておく・脇に置く」で,意味が違う.", "point out は「指摘する」で,意味が違う.", "cause は「引き起こす」で,差を生む意味になってしまう."] }
    ]
  },
  {
    id: "r117",
    kind: "3文書:求人・メール・予定表",
    title: "Harrow & Bell Architects — Hiring a Project Coordinator",
    target: 340,
    s: [
      { t: "doc", "title":"Job Posting — Harrow & Bell Architects" },
      "Harrow & Bell, an award-winning architecture firm, is seeking a project coordinator for its Glasgow office.",
      "The successful candidate will manage schedules for several building projects at once and serve as the main contact between our designers and clients.",
      "Applicants must have at least three years of experience in project coordination and be fluent in English.",
      "Knowledge of building regulations is preferred but not required.",
      "To apply, send a résumé and a cover letter to hiring@harrowbell.com by March 20. Shortlisted candidates will be invited to a two-stage interview.",
      { t: "doc", "title":"E-mail — From: Sofia Marsh / To: hiring@harrowbell.com / Date: March 18" },
      "Dear Hiring Manager,",
      "I am writing to apply for the project coordinator position.",
      "For the past four years, I have coordinated renovation projects for a property management company in Edinburgh, where I oversaw budgets of up to £2 million.",
      "Although I have not worked at an architecture firm, I completed a certificate course in building regulations last year.",
      "I will be traveling for work from March 30 to April 3, but I am available for interviews at any other time.",
      "Sincerely, Sofia Marsh",
      { t: "table", "cap":"Interview Schedule — Project Coordinator", "head":["Date", "Stage", "Interviewer"], rows: [["March 27", "First interview (video)", "Leo Grant, HR"], ["April 1", "Second interview (in person)", "Anna Bell, Partner"], ["April 8", "Second interview (in person)", "Anna Bell, Partner"]] }
    ],
    ja: "[求人] 受賞歴のある建築事務所ハロー&ベルが,グラスゴー事務所のプロジェクト調整役を募集する.採用者は複数の建築案件の予定を同時に管理し,設計者と顧客の主な窓口になる.調整業務の経験3年以上と,流ちょうな英語が必要.建築規制の知識はあれば望ましいが,必須ではない.履歴書と添え状を3月20日までに hiring@harrowbell.com へ.書類選考を通った人は2段階の面接に呼ぶ.[メール:3月18日 ソフィア・マーシュから] 調整役に応募したい.この4年,エディンバラの不動産管理会社で改装案件を調整し,最大200万ポンドの予算を管理してきた.建築事務所での勤務経験はないが,昨年建築規制の修了証の講座を終えた.3月30日から4月3日まで出張だが,それ以外ならいつでも面接に応じられる.[面接予定表] 3月27日 1次面接(ビデオ)人事 グラント / 4月1日 2次面接(対面)パートナー ベル / 4月8日 2次面接(対面)パートナー ベル",
    qs: [
      { id: "r117q1", q: "What is one responsibility of the advertised position?", c: ["Designing buildings for clients", "Communicating between designers and clients", "Training new architects", "Inspecting construction sites for safety"], a: 1, ev: [2], d: 1200, why: "設計者と顧客の間の主な窓口(main contact)になる,とある.", x: ["設計するのは設計者で,調整役の仕事ではない.", "", "新人の建築家の育成は書かれていない.", "安全の点検は書かれていない."] },
      { id: "r117q2", q: "What is suggested about Ms. Marsh?", c: ["She has never managed a budget.", "She currently works at an architecture firm.", "She meets the experience requirement for the position.", "She missed the application deadline."], a: 2, ev: [3,9], d: 1500, why: "必要なのは調整業務の経験3年以上.マーシュさんは4年間調整してきたので条件を満たす(2つの文書を見比べる).", x: ["最大200万ポンドの予算を管理した,とある.", "建築事務所で働いたことはない,と自分で書いている.", "", "締め切りは3月20日で,メールは3月18日なので間に合っている."] },
      { id: "r117q3", q: "What preferred qualification does Ms. Marsh mention?", c: ["Fluency in several languages", "Experience at an architecture firm", "A degree in engineering", "Knowledge of building regulations"], a: 3, ev: [4,10], d: 1400, why: "求人で「望ましい」とあるのは建築規制の知識.マーシュさんは建築規制の講座を修了したと書いている.", x: ["複数の言語については書いていない.", "建築事務所での経験はないと書いている.", "工学の学位については書いていない.", ""] },
      { id: "r117q4", q: "On which date will Ms. Marsh most likely have her second interview?", c: ["April 8", "March 30", "April 1", "March 27"], a: 0, ev: [11,[13,1], [13,2]], d: 1700, why: "2次面接は4月1日か8日.マーシュさんは3月30日から4月3日まで出張なので,4月1日は無理で,4月8日になる(予定表とメールを見比べる).", x: ["", "3月30日は面接の予定がなく,出張の初日.", "4月1日は出張中なので受けられない.", "3月27日は1次面接の日."] },
      { id: "r117q5", q: "Who will Ms. Marsh most likely meet in person?", c: ["Leo Grant", "Anna Bell", "Sofia Marsh's manager", "A building inspector"], a: 1, ev: [[13,1], [13,2]], d: 1300, why: "対面の面接は2次面接で,担当はパートナーのアンナ・ベル.1次面接はビデオ.", x: ["グラントは1次面接(ビデオ)の担当で,対面ではない.", "", "マーシュさんの上司と会う話はない.", "建物の検査員と会う話はない."] }
    ]
  },
  {
    id: "r118",
    kind: "3文書:お知らせ・比較表・メール",
    title: "Lakeside Medical Center — Cafeteria Renovation",
    target: 340,
    s: [
      { t: "doc", "title":"Notice — Lakeside Medical Center Facilities Office" },
      "Lakeside Medical Center is inviting proposals from contractors to renovate the staff cafeteria on the ground floor.",
      "The work must be completed within eight weeks so that the cafeteria can reopen before the start of the new fiscal year on July 1.",
      "Because the hospital operates around the clock, noisy work may be carried out only between 9 A.M. and 5 P.M.",
      "The total budget for the project is $180,000.",
      { t: "doc", "title":"Comparison of Proposals" },
      { t: "table", "cap":"Proposals received by April 10", "head":["Contractor", "Cost", "Time needed", "Notes"], rows: [["Arden Builders", "$165,000", "9 weeks", "Night work available"], ["Coastline Interiors", "$172,000", "7 weeks", "Day work only"], ["Mercer & Sons", "$195,000", "6 weeks", "Day work only"]] },
      { t: "doc", "title":"E-mail — From: Grace Tanaka, Facilities Manager / To: Board of Directors / Date: April 15" },
      "I have reviewed the three proposals we received.",
      "Although one bid is the least expensive, it cannot meet our deadline, and the contractor's offer of night work would disturb patients in the wards above the cafeteria.",
      "Another contractor could finish fastest, but its price exceeds our budget.",
      "I therefore recommend that we accept the remaining proposal, and I would like the board's approval by April 20 so that work can begin on May 1.",
      "Grace Tanaka"
    ],
    ja: "[お知らせ] レイクサイド医療センターは,1階の職員食堂を改装する業者の提案を募る.新年度が始まる7月1日より前に再開できるよう,工事は8週間以内に終えなければならない.病院は24時間動いているので,音の出る作業は午前9時から午後5時までに限る.予算の総額は18万ドル.[提案の比較(4月10日までに届いたもの)] アーデン建設 16万5千ドル・9週間・夜間作業可 / コーストライン内装 17万2千ドル・7週間・日中のみ / マーサー&サンズ 19万5千ドル・6週間・日中のみ [メール:4月15日 施設管理 田中さんから取締役会へ] 届いた3つの提案を検討した.1つは最も安いが期限に間に合わず,その業者が申し出た夜間作業は食堂の上の病棟の患者の迷惑になる.別の業者はいちばん早く終えられるが,価格が予算を超える.そこで残る提案を受け入れることを勧める.5月1日に着工できるよう,4月20日までに取締役会の承認がほしい.",
    qs: [
      { id: "r118q1", q: "Why must the work be completed within eight weeks?", c: ["The contractor's equipment is only available for that period.", "The hospital is planning to move to a new building.", "The cafeteria needs to reopen before a new fiscal year begins.", "The budget will expire at the end of May."], a: 2, ev: [2], d: 1200, why: "7月1日の新年度の始まりより前に食堂を再開するため,とある.", x: ["業者の機材の都合は書かれていない.", "病院の移転は書かれていない.", "", "予算が5月末で切れるとは書かれていない."] },
      { id: "r118q2", q: "What does the notice indicate about noisy work?", c: ["It is not allowed at any time.", "It must be done at night.", "It requires special permission from patients.", "It is limited to daytime hours."], a: 3, ev: [3], d: 1100, why: "音の出る作業は午前9時から午後5時の間だけ,とある.", x: ["時間を限って許されている.", "夜ではなく日中に限られる.", "患者の許可が必要とは書かれていない.", ""] },
      { id: "r118q3", q: "Which contractor does Ms. Tanaka recommend?", c: ["Coastline Interiors", "Arden Builders", "Mercer & Sons", "None of the contractors"], a: 0, ev: [4,[6,0], [6,1], [6,2],9,10,11], d: 1800, why: "最も安いアーデン(9週間で期限に間に合わず,夜間作業)と,最も早いマーサー(19万5千ドルで予算18万ドルを超える)を除くと,残るのはコーストライン.表とメールを見比べる.", x: ["", "9週間かかり,8週間の期限に間に合わない.夜間作業も患者の迷惑になる.", "いちばん早いが,19万5千ドルで予算の18万ドルを超える.", "残る提案を受け入れるよう勧めている."] },
      { id: "r118q4", q: "In the e-mail, what problem does Ms. Tanaka mention about night work?", c: ["It would increase the cost.", "It would disturb patients.", "It would require extra security staff.", "It is not allowed by the city."], a: 1, ev: [9], d: 1300, why: "夜間作業は食堂の上の病棟の患者の迷惑になる(disturb patients)と書いている.", x: ["費用が増えるとは書いていない.", "", "警備員が余分に必要とは書いていない.", "市の規則については書いていない."] },
      { id: "r118q5", q: "What does Ms. Tanaka ask the board to do?", c: ["Increase the project budget", "Contact the contractors directly", "Approve her recommendation by a certain date", "Postpone the renovation until July"], a: 2, ev: [11], d: 1300, why: "5月1日に着工できるよう,4月20日までに承認がほしいと頼んでいる.", x: ["予算を増やすようには頼んでいない.", "業者に直接連絡するようには頼んでいない.", "", "延期ではなく,5月1日の着工を目指している."] }
    ]
  },
  {
    id: "r119",
    kind: "報告書とグラフ",
    title: "Customer Experience Report — Kestrel Hotels",
    target: 250,
    s: [
      "Kestrel Hotels surveyed 2,400 guests last quarter to identify what most influences whether they return.",
      "Guests were asked to name the single factor that mattered most in choosing a hotel for their next stay.",
      { t: "bar", "cap":"Most important factor for a return visit (percent of guests)", "unit":"%", "items":[["Cleanliness",34], ["Staff friendliness",27], ["Price",18], ["Location",13], ["Breakfast",8]] },
      "Although price is often assumed to drive decisions, fewer than one in five guests chose it.",
      "Cleanliness ranked first, which is consistent with the complaints received by our call center, where room cleanliness accounted for the largest share of issues.",
      "Staff friendliness followed closely, a finding that supports the expansion of the guest service training introduced last year.",
      "By contrast, breakfast, on which the company spent heavily in the past two years, was named by the smallest share of guests.",
      "We therefore recommend shifting part of next year's breakfast budget to housekeeping staff and equipment."
    ],
    ja: "ケストレル・ホテルは先四半期,2,400人の宿泊客を調べ,再び泊まるかどうかに最も影響するものを探った.次の宿泊先を選ぶときに最も大事な要素を1つ挙げてもらった.[グラフ:再訪で最も大事な要素(客の割合)清潔さ34%,従業員の親しみやすさ27%,価格18%,立地13%,朝食8%] 価格が決め手だと思われがちだが,選んだのは5人に1人に満たない.清潔さが1位で,これはコールセンターに届いた苦情で部屋の清潔さが最も多かったことと合う.従業員の親しみやすさがそれに迫り,昨年始めた接客研修を広げることを裏付ける.対照的に,会社がこの2年で大きくお金をかけた朝食は,挙げた客が最も少なかった.そこで,来年の朝食の予算の一部を客室清掃の人員と機材に回すことを勧める.",
    qs: [
      { id: "r119q1", q: "What percentage of guests chose the factor that Kestrel Hotels has invested heavily in?", c: ["34 percent", "13 percent", "18 percent", "8 percent"], a: 3, ev: [6,[2,4]], d: 1600, why: "会社がこの2年で大きくお金をかけたのは朝食.グラフで朝食は8%.本文とグラフを見比べる.", x: ["34%は清潔さ.", "13%は立地.", "18%は価格.", ""] },
      { id: "r119q2", q: "What does the report suggest about guest complaints?", c: ["They support the survey's main finding.", "Most were about prices.", "They have decreased since last year.", "They were mostly about breakfast."], a: 0, ev: [4], d: 1500, why: "清潔さが1位という結果は,苦情で部屋の清潔さが最も多かったことと「一致する(consistent with)」.", x: ["", "苦情で最も多かったのは部屋の清潔さ.", "去年より減ったとは書かれていない.", "朝食についての苦情は書かれていない."] },
      { id: "r119q3", q: "What is recommended in the report?", c: ["Lowering room prices", "Moving funds from breakfast to housekeeping", "Ending the guest service training", "Opening hotels in better locations"], a: 1, ev: [7], d: 1300, why: "来年の朝食の予算の一部を客室清掃の人員と機材に回すよう勧めている.", x: ["値下げは勧めていない.価格を挙げた客は少ない.", "", "接客研修はむしろ広げる方向.", "立地を変える提案はしていない."] }
    ]
  },
  {
    id: "r120",
    kind: "書評(長文)",
    title: "Business Bookshelf — Review of \"The Patient Company\"",
    target: 240,
    s: [
      "In The Patient Company, management consultant Helen Ward sets out to challenge one of the most persistent assumptions in business: that rapid growth is always a sign of success.",
      "Drawing on case studies of 30 firms over two decades, Ward argues that companies which expanded cautiously were more likely to survive economic downturns than those that grew aggressively.",
      "Her most compelling chapter describes a furniture maker that turned down a lucrative contract with a national retailer because accepting it would have meant relying on a single customer for most of its revenue.",
      "When the retailer later went bankrupt, several of the furniture maker's competitors collapsed with it.",
      "Ward is careful not to dismiss ambition altogether.",
      "Instead, she distinguishes between growth that a company can sustain with its existing resources and growth that depends on borrowing heavily or hiring faster than managers can train new staff.",
      "The book is not without flaws.",
      "Readers looking for practical tools may be disappointed, since Ward devotes far more pages to stories than to step-by-step advice.",
      "Nevertheless, it offers a timely corrective to an industry that often celebrates speed above everything else."
    ],
    ja: "『忍耐強い会社』で,経営コンサルタントのウォードは,ビジネスで最も根強い思い込みの1つ「急成長は常に成功のしるし」に異を唱える.20年にわたる30社の事例をもとに,慎重に拡大した会社の方が,攻撃的に成長した会社より不況を生き延びやすかったと論じる.最も説得力のある章は,全国展開の小売業者との利益の大きい契約を断った家具メーカーの話だ.受ければ売上の大半を1社に頼ることになったからだ.その小売業者が後に倒産すると,家具メーカーの競合のいくつかが道連れに倒れた.ウォードは野心そのものを退けないよう気を配っている.代わりに,今ある資源で支えられる成長と,多額の借り入れや,管理職が新人を育てるより速く人を雇うことに頼る成長を区別する.この本に欠点がないわけではない.実用的な道具を求める読者はがっかりするかもしれない.手順を追った助言より,物語にはるかに多くのページを割いているからだ.それでも,何より速さをたたえがちな業界に,時宜を得た修正を示している.",
    qs: [
      { id: "r120q1", q: "What is the main argument of the book?", c: ["Companies should borrow money to grow quickly.", "Furniture makers face more risk than other firms.", "Careful growth helps companies survive difficult times.", "Consultants are rarely useful to small businesses."], a: 2, ev: [0,1], d: 1400, why: "慎重に拡大した会社の方が不況を生き延びやすかった,と論じている.", x: ["多額の借り入れに頼る成長はむしろ警戒している.", "家具メーカーは事例の1つで,業界全体の危険を論じてはいない.", "", "コンサルタントの有用性は論じていない."] },
      { id: "r120q2", q: "Why did the furniture maker reject the contract?", c: ["The retailer offered too low a price.", "The retailer had already gone bankrupt.", "It lacked the staff to complete the order.", "It wanted to avoid depending on one customer."], a: 3, ev: [2], d: 1600, why: "受ければ売上の大半を1社に頼ることになるから断った.", x: ["契約は「利益の大きい(lucrative)」もので,価格が低かったのではない.", "小売業者が倒産したのは「後に(later)」で,断ったときではない.", "人手が足りなかったとは書かれていない.", ""] },
      { id: "r120q3", q: "What criticism does the reviewer make of the book?", c: ["It offers little practical guidance.", "It overstates the benefits of speed.", "It contains too few examples.", "It is too short to be useful."], a: 0, ev: [7], d: 1500, why: "実用的な道具を求める読者はがっかりするかもしれない,手順を追った助言より物語が多い,と批判している.", x: ["", "速さの利点を誇張しているのは業界の方で,本ではない.", "30社の事例があり,むしろ物語(例)が多いと言っている.", "本の長さについての批判はない."] }
    ]
  },
  {
    id: "r121",
    kind: "手紙(長文)",
    title: "Letter — Renewal of Lease, Unit 4B, Riverside Business Park",
    target: 230,
    s: [
      "Dear Mr. Lindqvist,",
      "Your lease for Unit 4B at Riverside Business Park expires on August 31, and we would be pleased to offer you a renewal for a further three years.",
      "As you may be aware, property taxes in the area rose considerably this year.",
      "Consequently, the monthly rent for a new three-year term will be $3,450, an increase of 4 percent over your current rate.",
      "However, in recognition of your seven years as a tenant, we are prepared to waive the increase for the first six months of the new lease, provided that you return the signed agreement by June 30.",
      "Should you prefer a shorter commitment, a one-year renewal is also available at $3,600 per month, though this option does not include the discount described above.",
      "We would also like to inform you that the parking lot will be resurfaced in September.",
      "During the work, which is expected to take two weeks, tenants may use the lot at the neighboring community center free of charge.",
      "If you have any questions about the renewal terms, please do not hesitate to contact me.",
      "Sincerely, Nora Ellis, Leasing Manager"
    ],
    ja: "リンドクビスト様.リバーサイド・ビジネスパーク 4B 区画の賃貸契約は8月31日に満了するので,さらに3年間の更新をご提案したい.ご存じかもしれないが,この地域の固定資産税は今年大きく上がった.そのため,3年の新しい契約の月額賃料は3,450ドルとなり,現在より4%の値上がりになる.ただし,7年間入居していただいたことに感謝し,6月30日までに署名した契約書を返送いただければ,新しい契約の最初の6か月は値上げ分を免除する.短い契約がよければ,月3,600ドルで1年の更新もできるが,この場合は上の割引はない.また,駐車場は9月に舗装し直す.約2週間の工事の間,入居者は隣の公民館の駐車場を無料で使える.更新の条件について質問があれば,遠慮なくご連絡を.賃貸担当 ノーラ・エリス",
    qs: [
      { id: "r121q1", q: "Why is the rent increasing?", c: ["The building has been renovated.", "Property taxes have gone up.", "Mr. Lindqvist is renting more space.", "The parking lot is being expanded."], a: 1, ev: [2,3], d: 1300, why: "地域の固定資産税が大きく上がったので(Consequently),賃料が上がる.", x: ["建物を改装したとは書かれていない.", "", "借りる広さを増やすとは書かれていない.", "駐車場は舗装し直すだけで,広げるのではない."] },
      { id: "r121q2", q: "What must Mr. Lindqvist do to avoid the rent increase for six months?", c: ["Choose the one-year renewal", "Pay six months' rent in advance", "Sign and return the three-year agreement by June 30", "Move to a smaller unit"], a: 2, ev: [4,5], d: 1700, why: "6月30日までに署名した契約書を返送すれば(provided that),3年契約の最初の6か月は値上げ分が免除される.1年契約には割引がない.", x: ["1年の更新には割引が含まれない,とある.", "前払いの話はない.", "", "狭い区画に移る話はない."] },
      { id: "r121q3", q: "What will tenants be able to do in September?", c: ["Attend a meeting at the community center", "Receive a discount on their rent", "Use a new parking lot behind the building", "Park at a nearby facility at no cost"], a: 3, ev: [6,7], d: 1400, why: "9月の駐車場の工事の間,隣の公民館の駐車場を無料で使える.free of charge を at no cost と言いかえた選択肢.", x: ["公民館での会合の話はない.", "賃料の割引は契約更新の話で,9月の工事とは関係がない.", "新しい駐車場ができるのではなく,今の駐車場を舗装し直す.", ""] }
    ]
  },
  {
    id: "r122",
    kind: "記事と投書",
    title: "Millbrook Herald — Downtown Parking Plan / Letter to the Editor",
    target: 280,
    s: [
      { t: "doc", "title":"Article — Millbrook Herald, May 4" },
      "The Millbrook City Council voted on Tuesday to replace 200 free parking spaces on Main Street with metered spaces, charging $2 per hour.",
      "Council members said the revenue, estimated at $400,000 a year, would fund wider sidewalks and new bicycle lanes.",
      "They also argued that charging for parking would encourage drivers to leave sooner, making it easier for shoppers to find a space.",
      "The change will take effect on July 1.",
      { t: "doc", "title":"Letter to the Editor — Millbrook Herald, May 11" },
      "I read with concern your article about the new parking fees.",
      "As the owner of a small bookstore on Main Street, I understand the council's wish to improve the area, and I support the bicycle lanes.",
      "However, many of my customers are elderly residents who cannot walk long distances, and they already tell me they will shop at the mall outside town, where parking is free.",
      "I would urge the council to consider a compromise: charging only during the busiest hours, from 11 A.M. to 3 P.M., and allowing the first 30 minutes free.",
      "Such a plan would still raise money while giving short visits a chance.",
      "Martin Hale"
    ],
    ja: "[記事 5月4日] ミルブルック市議会は火曜日,メイン通りの無料駐車場200台分を,1時間2ドルの有料にすると決めた.議員たちは,年40万ドルと見込まれる収入で歩道を広げ,自転車道を作ると述べた.また,有料にすれば運転者が早く車を出すので,買い物客が場所を見つけやすくなるとも主張した.変更は7月1日から.[投書 5月11日] 新しい駐車料金の記事を心配しながら読んだ.メイン通りで小さな書店を営む者として,地域を良くしたいという議会の思いは分かるし,自転車道には賛成だ.しかし,客の多くは長く歩けない高齢の住民で,駐車が無料の町の外のショッピングモールで買い物をすると,もう言われている.議会には妥協案を考えてほしい.最も混む午前11時から午後3時だけ料金を取り,最初の30分は無料にする.それでも収入は得られ,短い用事の客にも機会を残せる.マーティン・ヘイル",
    qs: [
      { id: "r122q1", q: "According to the article, what is one reason the council supports parking fees?", c: ["To make parking spaces available more often", "To reduce traffic accidents", "To pay for a new shopping mall", "To discourage people from riding bicycles"], a: 0, ev: [3], d: 1300, why: "有料にすれば運転者が早く車を出すので,買い物客が場所を見つけやすくなる,と主張している.", x: ["", "事故を減らすとは書かれていない.", "収入の使い道は歩道と自転車道で,モールではない.", "むしろ自転車道を作る計画で,逆."] },
      { id: "r122q2", q: "What part of the council's plan does Mr. Hale support?", c: ["The $2 hourly fee", "The new bicycle lanes", "The July 1 start date", "Removing parking spaces"], a: 1, ev: [7], d: 1300, why: "地域を良くしたい思いは分かり,自転車道には賛成だと書いている.", x: ["料金には反対で,妥協案を求めている.", "", "始まる日については何も言っていない.", "駐車場を減らすことに賛成とは書いていない."] },
      { id: "r122q3", q: "What would Mr. Hale's proposal most likely result in?", c: ["Free parking at all times on Main Street", "Higher fees during the busiest hours", "Lower revenue than the council estimated", "A new parking lot near the mall"], a: 2, ev: [2,9,10], d: 2000, why: "混む時間だけ料金を取り,最初の30分は無料にすると,年40万ドルという議会の見込みより収入は減る.ヘイル氏も「それでも収入は得られる(still raise money)」と言うだけで,同じ額とは言っていない.2つの文書を見比べる推測問題.", x: ["11時から3時までは料金を取る案なので,いつでも無料ではない.", "料金を上げる案ではない.", "", "モールの近くに駐車場を作る話はない."] }
    ]
  },
  {
    id: "r123",
    part6: true,
    kind: "Part 6 メール",
    title: "To: Marketing Team / From: Olivia Grant / Subject: Room change for Thursday's meeting",
    target: 150,
    s: [
      "Hi everyone,",
      "Thursday's planning meeting will no longer take place in Conference Room A, which is [1] new carpet that day.",
      "We will meet in the training room on the fourth floor instead.",
      "The start time of 10 A.M. has not changed.",
      "[2]",
      "Because the training room does not have a projector, please bring a laptop if you [3] to show any slides.",
      "I will bring a portable screen.",
      "Thank you for your flexibility, and I look forward to [4] you there.",
      "Olivia"
    ],
    ja: "皆さん.木曜日の企画会議は,新しいじゅうたんを敷く日なので A 会議室では行わない.代わりに4階の研修室で集まる.開始の午前10時は変わらない.[研修室は A 会議室より狭いので,出席者は12人までにしてほしい.] 研修室にはプロジェクターがないので,スライドを見せる予定なら自分のノートパソコンを持ってくること.携帯用のスクリーンは私が持っていく.柔軟な対応に感謝する.そこで会えるのを楽しみにしている.オリビア",
    qs: [
      { id: "r123q1", q: "(1)", c: ["receipt", "receives", "received", "receiving"], a: 3, ev: [1], d: 1000, why: "会議室はその日「(じゅうたんを)受け取る」予定.be + -ing で近い未来の予定.which is receiving new carpet that day.", x: ["名詞 receipt(領収書)は意味が合わない.", "is receives は be 動詞と一般動詞を重ねていて誤り.", "is received だと会議室が受け取られる側になり,new carpet が余る.", ""] },
      { id: "r123q2", q: "(2)", c: ["Since the training room is smaller than Room A, please limit attendance to 12 people.", "The planning meeting has been canceled.", "Room A will be painted next month.", "Please send your slides to the IT department by Monday."], a: 0, ev: [2,3,4], d: 1100, why: "前の2文は新しい場所と時間.その部屋についての注意(狭さ)を続けると,次の「プロジェクターがない」という部屋の説明につながる.", x: ["", "会議は場所を変えて行われるので矛盾する.", "A 会議室の来月の塗装は,今回の変更の話と関係がない.", "スライドは自分のパソコンで見せる話で,IT 部門に送る必要は出てこない."] },
      { id: "r123q3", q: "(3)", c: ["planned", "plan", "planning", "will plan"], a: 1, ev: [5], d: 1100, why: "if 節は未来のことでも現在形.主語 you なので plan.", x: ["planned は過去形で,これからの会議の話に合わない.", "", "you planning では動詞がない.", "条件を表す if 節では未来のことでも will を使わない."] },
      { id: "r123q4", q: "(4)", c: ["seen", "see", "seeing", "be seen"], a: 2, ev: [7], d: 900, why: "look forward to の to は前置詞なので,後ろは動名詞 seeing.", x: ["過去分詞は前置詞の後ろに置けない.", "前置詞 to の後ろに原形は置けない.", "", "to be seen では「見られるのを楽しみにする」となり,形も意味も合わない."] }
    ]
  },
  {
    id: "r124",
    part6: true,
    kind: "Part 6 お知らせ",
    title: "Notice to Tenants — Elevator Maintenance",
    target: 150,
    s: [
      "Please be advised that the east elevator in the Carlton Building will be out of service on Saturday, October 12, for scheduled maintenance.",
      "The work is expected to last from 8 A.M. to 4 P.M.",
      "[1] this time, tenants and visitors should use the west elevator or the stairs.",
      "[2]",
      "Deliveries that require the freight elevator should be [3] for another day.",
      "We will post a notice in the lobby as soon as the work is [4].",
      "We appreciate your patience."
    ],
    ja: "カールトン・ビルの東エレベーターは,定期点検のため10月12日(土)に使えなくなる.作業は午前8時から午後4時までの見込み.この間,入居者と来客は西エレベーターか階段を使うこと.[貨物用エレベーターも東エレベーターと同じ機械を使うため止まる.] 貨物用エレベーターが必要な配達は,別の日に予定を組むこと.作業が終わったらすぐロビーに掲示する.ご理解に感謝する.",
    qs: [
      { id: "r124q1", q: "(1)", c: ["Since", "While", "Within", "During"], a: 3, ev: [1,2], d: 900, why: "後ろが this time という名詞なので,前置詞 During(〜の間).", x: ["Since this time は「このとき以来」で,意味が合わない.", "While は接続詞で,後ろに「主語 + 動詞」が必要.", "Within this time は「この時間以内に」で,その間ずっと別のエレベーターを使う意味にならない.", ""] },
      { id: "r124q2", q: "(2)", c: ["The freight elevator will also be unavailable because it shares equipment with the east elevator.", "The west elevator was replaced last year.", "Visitors must show identification at the front desk.", "The stairs will be painted on Sunday."], a: 0, ev: [2,3,4], d: 1200, why: "次の文で「貨物用エレベーターが必要な配達は別の日に」とある.その理由(貨物用も止まる)を先に述べる文が入る.", x: ["", "西エレベーターの交換の話では,次の文の配達を別の日にする理由にならない.", "受付での身分証の話は,点検の案内の流れと関係がない.", "日曜日の階段の塗装は,土曜日の点検の案内の流れと関係がない."] },
      { id: "r124q3", q: "(3)", c: ["schedule", "scheduled", "scheduling", "schedules"], a: 1, ev: [4], d: 900, why: "配達は「予定を組まれる」側.should be + 過去分詞.", x: ["be の後ろに原形は置けない.", "", "should be scheduling だと配達が(何かの)予定を組む側になる.", "be の後ろに三人称単数の形は置けない."] },
      { id: "r124q4", q: "(4)", c: ["completely", "completion", "complete", "completing"], a: 2, ev: [5], d: 1000, why: "is の後ろの補語で「作業が終わっている」.形容詞 complete.", x: ["副詞は補語になれない.", "名詞 completion は「完成」で,the work is completion では意味が通らない.", "", "is completing だと作業が(何かを)仕上げる側になる."] }
    ]
  },
  {
    id: "r125",
    part6: true,
    kind: "Part 6 記事",
    title: "Ridgeway Daily — Bike-Share Program Expands",
    target: 150,
    s: [
      "Ridgeway's bike-share program will add 30 new stations this summer, the city announced on Monday.",
      "Since the program began two years ago, riders have taken more than 400,000 trips, far [1] than officials had predicted.",
      "Most of the new stations will be located near train stations and university buildings.",
      "[2]",
      "Users pay $1 to unlock a bike and 10 cents for each minute of riding.",
      "Students and seniors [3] for a 50 percent discount on annual memberships.",
      "City officials hope the expansion will reduce traffic [4] in the downtown area."
    ],
    ja: "リッジウェイ市は月曜日,自転車の共有の仕組みに今夏30か所の乗り場を加えると発表した.2年前に始まって以来,利用者の移動は40万回を超え,担当者の予想をはるかに上回った.新しい乗り場のほとんどは駅と大学の建物の近くに置かれる.[通勤や通学の人がより使いやすくなるためだ.] 利用者は自転車の鍵を開けるのに1ドル,乗るのに1分10セントを払う.学生と高齢者は年会費が半額になる資格がある.市の担当者は,拡大によって中心街の交通渋滞が減ることを期待している.",
    qs: [
      { id: "r125q1", q: "(1)", c: ["many", "most", "much", "more"], a: 3, ev: [1], d: 900, why: "後ろに than があるので比較級 more.far は比較級を強める語.", x: ["many は比較級ではないので than と組まない.", "最上級は than と組まない.", "much は比較級ではないので than と組まない.", ""] },
      { id: "r125q2", q: "(2)", c: ["This should make the service more convenient for commuters and students.", "The program will end next year.", "Bikes are not allowed on trains.", "The university has closed its main campus."], a: 0, ev: [2,3], d: 1100, why: "前の文は乗り場を駅と大学の近くに置くこと.その目的・効果(通勤・通学の人が使いやすくなる)を続けるのが自然.", x: ["", "乗り場を増やす記事で,来年終わるのは矛盾する.", "電車への持ち込みの話は,乗り場の場所の説明と関係がない.", "大学の建物の近くに乗り場を置くとあり,閉鎖は矛盾する."] },
      { id: "r125q3", q: "(3)", c: ["qualified", "qualify", "qualification", "qualifying"], a: 1, ev: [5], d: 1000, why: "主語 Students and seniors の動詞.qualify for 〜 で「〜の資格がある」.", x: ["qualified は形容詞として使うなら are qualified for が必要.", "", "名詞は動詞の位置に置けない.", "-ing だけでは文の動詞にならない."] },
      { id: "r125q4", q: "(4)", c: ["congest", "congested", "congestion", "congesting"], a: 2, ev: [6], d: 1100, why: "reduce の目的語の名詞 traffic congestion(交通渋滞).", x: ["動詞の原形は名詞の位置に置けない.", "congested は形容詞で,名詞の位置に置けない.", "", "-ing では traffic congesting(交通が詰まらせている)となり意味が合わない."] }
    ]
  },
  {
    id: "r126",
    part6: true,
    kind: "Part 6 社内メモ",
    title: "To: All employees / From: Facilities / Subject: New recycling bins",
    target: 150,
    s: [
      "Starting next Monday, every floor will have three separate bins for paper, plastic, and general waste.",
      "The bins will be placed next to the kitchen on each floor, and the old bins under employees' desks will be [1].",
      "We ask that you sort your waste [2] before placing it in the bins.",
      "Plastic items should be empty and rinsed if possible.",
      "[3]",
      "Our goal is to cut the amount of waste sent to landfills by half [4] the end of the year.",
      "Thank you for helping to make our office greener."
    ],
    ja: "来週の月曜日から,各階に紙・プラスチック・一般ごみの3つの箱を置く.箱は各階の台所の隣に置き,社員の机の下の古いごみ箱は撤去する.ごみは箱に入れる前に正しく分けてほしい.プラスチックはできれば空にしてすすぐこと.[どの箱に入れるか分からないものは,一般ごみに入れてほしい.] 年末までに埋め立てに回るごみを半分にするのが目標だ.職場をより環境に優しくする協力に感謝する.",
    qs: [
      { id: "r126q1", q: "(1)", c: ["removal", "remove", "removing", "removed"], a: 3, ev: [1], d: 800, why: "古いごみ箱は「撤去される」側.will be + 過去分詞.", x: ["名詞 removal は「撤去」で,ごみ箱が撤去である,では意味が通らない.", "be の後ろに原形は置けない.", "will be removing だとごみ箱が(何かを)取り除く側になる.", ""] },
      { id: "r126q2", q: "(2)", c: ["correctly", "correct", "correction", "corrected"], a: 0, ev: [2], d: 900, why: "動詞 sort(分ける)を修飾するので副詞 correctly.", x: ["", "形容詞は動詞を修飾できない(your waste を修飾するなら名詞の前に置く).", "名詞は動詞を修飾できない.", "過去分詞 corrected では「訂正されたごみ」となり意味が合わない."] },
      { id: "r126q3", q: "(3)", c: ["The kitchen will be closed for cleaning on Friday.", "If you are not sure which bin to use, please put the item in general waste.", "New desks will be delivered next month.", "Employees may now park in the visitor lot."], a: 1, ev: [2,3,4], d: 1100, why: "前の2文はごみの分け方の指示.迷ったときの扱いを続けるのが自然.", x: ["台所の掃除の休みは,ごみの分け方の流れと関係がない.", "", "新しい机の配達は,ごみの分け方と関係がない.", "駐車場の話は,ごみの分け方と関係がない."] },
      { id: "r126q4", q: "(4)", c: ["since", "until", "by", "for"], a: 2, ev: [5], d: 1000, why: "「年末までに」半分にする,という期限なので by.", x: ["since は「〜以来」で,意味が合わない.", "until は「〜までずっと」で,ある時点までの達成の期限には使わない.", "", "for the end of the year では期限の意味にならない."] }
    ]
  },
  {
    id: "r127",
    part6: true,
    kind: "Part 6 広告",
    title: "Learn to Cook with Chef Marco",
    target: 150,
    s: [
      "Have you always wanted to cook like a professional?",
      "Join Chef Marco Rossi for a six-week Italian cooking course at the Riverside Community Kitchen.",
      "Classes meet every Wednesday evening from 6 to 8 P.M., and all ingredients are [1] in the course fee.",
      "Each week, participants will prepare a complete meal, from fresh pasta to classic desserts.",
      "[2]",
      "Space is limited to twelve students per class, so early registration is [3] recommended.",
      "To sign up, visit our Web site or call 555-0148. [4] who register before May 1 will receive a free apron."
    ],
    ja: "プロのように料理したいと思ったことはないか.リバーサイド公民館の調理室で,マルコ・ロッシ料理長の6週間のイタリア料理講座に参加しよう.授業は毎週水曜日の午後6時から8時で,材料はすべて受講料に含まれる.毎週,生パスタから定番のデザートまで,1食分の料理を作る.[作った料理は,その後みんなで一緒に食べる.] 1クラス12人までなので,早めの申し込みを強く勧める.申し込みは Web サイトか 555-0148 へ.5月1日より前に申し込んだ人には,エプロンを無料で贈る.",
    qs: [
      { id: "r127q1", q: "(1)", c: ["include", "including", "inclusive", "included"], a: 3, ev: [2], d: 900, why: "材料は受講料に「含まれる」側.be included in 〜.", x: ["be の後ろに原形は置けない.", "are including だと材料が(何かを)含む側になる.", "inclusive は of と組む(inclusive of 〜)ので,in the course fee とは合わない.", ""] },
      { id: "r127q2", q: "(2)", c: ["Afterward, everyone sits down together to enjoy the food they have made.", "The kitchen is closed on Wednesdays.", "Chef Rossi will retire at the end of the year.", "No cooking experience is allowed in this course."], a: 0, ev: [3,4], d: 1100, why: "前の文は毎週1食分を作ること.作った後どうするかを続けるのが自然.", x: ["", "授業は毎週水曜日に調理室で行われるので矛盾する.", "料理長の引退の話は講座の宣伝に合わない.", "「経験は許されない」は意味が通らず,プロのように料理したい人を誘う流れにも合わない."] },
      { id: "r127q3", q: "(3)", c: ["strong", "strongly", "strength", "stronger"], a: 1, ev: [5], d: 900, why: "過去分詞 recommended を修飾するので副詞 strongly.", x: ["形容詞は過去分詞(動詞の形)を修飾できない.", "", "名詞は過去分詞を修飾できない.", "比較級の形容詞も過去分詞を修飾できない."] },
      { id: "r127q4", q: "(4)", c: ["They", "These", "Those", "Them"], a: 2, ev: [6], d: 1300, why: "Those who 〜 で「〜する人々」.", x: ["They who は古い言い方で,現代の広告では使わない.", "These who という形はない.", "", "Them は目的格で,主語の位置に置けない."] }
    ]
  },
  {
    id: "r128",
    part6: true,
    kind: "Part 6 手紙",
    title: "Letter — Clearwater Energy Customer Service",
    target: 150,
    s: [
      "Dear Mr. Okoye,",
      "Thank you for contacting us about your electricity bill for August.",
      "After reviewing your account, we found that your meter reading had been entered [1].",
      "As a result, you were charged for 900 kilowatt-hours instead of the 190 you actually used.",
      "[2]",
      "In addition, as an apology for the inconvenience, we have [3] a $25 credit to your account.",
      "We have also changed our procedures to prevent similar errors in the future.",
      "Please do not hesitate to contact us if you have any [4] questions.",
      "Sincerely, Hannah Brooks, Customer Service Manager"
    ],
    ja: "オコイエ様.8月の電気料金についてご連絡いただきありがとうございます.お客様の口座を調べたところ,メーターの数値が誤って入力されていた.その結果,実際に使った190キロワット時ではなく,900キロワット時分を請求していた.[差額は来月の請求書から差し引く.] 加えて,ご迷惑のおわびとして,口座に25ドル分を加えた.同じ誤りが起きないよう,手順も変えた.ほかにご質問があれば,遠慮なくご連絡ください.顧客サービス責任者 ハンナ・ブルックス",
    qs: [
      { id: "r128q1", q: "(1)", c: ["correct", "incorrect", "incorrectness", "incorrectly"], a: 3, ev: [2,3], d: 900, why: "過去分詞 entered を修飾するので副詞 incorrectly(誤って).", x: ["correct は形容詞で,意味も「正しく」と逆になる.", "形容詞は過去分詞(動詞の形)を修飾できない.", "名詞は過去分詞を修飾できない.", ""] },
      { id: "r128q2", q: "(2)", c: ["The difference will be deducted from your next bill.", "Your service will be disconnected next week.", "Our office will move to a new location in August.", "We are raising our rates by 5 percent."], a: 0, ev: [3,4,5], d: 1200, why: "前の文は払いすぎの説明.その直し方(差額を差し引く)を述べ,次の In addition(さらに)の25ドルにつなぐ.", x: ["", "誤りを謝る手紙で,電気を止めると伝えるのは矛盾する.", "事務所の移転は請求の誤りの話と関係がない.", "値上げの知らせは,おわびの手紙の流れに合わない."] },
      { id: "r128q3", q: "(3)", c: ["apply", "applied", "applying", "application"], a: 1, ev: [5], d: 1100, why: "have + 過去分詞の現在完了.apply A to B で「A を B に充てる・反映する」.", x: ["have の後ろに原形を置くと現在完了にならない.", "", "have applying という形はない.", "名詞は have の後ろの動詞の位置に置けない."] },
      { id: "r128q4", q: "(4)", c: ["far", "farther", "further", "furthest"], a: 2, ev: [7], d: 1100, why: "「それ以上の・さらなる」質問は further questions.", x: ["far questions という言い方はない.", "farther は距離が「より遠い」ときに使う.", "", "furthest は最上級で,「いちばん遠い質問」となり意味が合わない."] }
    ]
  },
  {
    id: "r129",
    part6: true,
    kind: "Part 6 Web ページ",
    title: "Harbor Museum of Art — Become a Member",
    target: 150,
    s: [
      "Become a member of the Harbor Museum of Art and enjoy a full year of benefits.",
      "Members receive unlimited free admission, a 10 percent discount at the museum shop, and early access to tickets for special [1].",
      "Family memberships cover two adults and up to four children [2] the age of 18.",
      "[3]",
      "Membership fees help us care for our collection and offer free programs to local schools.",
      "You can join online, by phone, or at the front desk, and your membership card will be sent to you [4] five business days."
    ],
    ja: "ハーバー美術館の会員になって,1年中特典を楽しもう.会員は何度でも無料で入館でき,美術館の売店で10%引きになり,特別展の券を早く買える.家族会員は大人2人と18歳未満の子ども4人までが対象.[会員の家族が一緒なら,来館者も1人まで半額で入れる.] 会費は収蔵品の管理と,地元の学校への無料の教室に使われる.入会はネット,電話,受付ででき,会員証は5営業日以内に届く.",
    qs: [
      { id: "r129q1", q: "(1)", c: ["exhibiting", "exhibit", "exhibited", "exhibitions"], a: 3, ev: [1], d: 900, why: "special の後ろなので名詞.特別展はいくつもあるので複数形 exhibitions.", x: ["-ing は名詞の位置に置いても「展示すること」となり,特別展の意味にならない.", "exhibit は名詞にもなるが,数えられる名詞の単数で冠詞がなく,ここでは複数形が必要.", "過去分詞は形容詞の後ろに名詞として置けない.", ""] },
      { id: "r129q2", q: "(2)", c: ["under", "over", "less", "within"], a: 0, ev: [2], d: 1100, why: "under the age of 18 で「18歳未満の」.", x: ["", "over the age of 18 は「18歳を超える」で,子どもの範囲と逆になる.", "less は比較級で,前置詞として年齢の前に置けない.", "within the age of という言い方はない."] },
      { id: "r129q3", q: "(3)", c: ["The museum will close permanently next year.", "Members may also bring one guest at half price on each visit.", "Children are not allowed in the museum.", "Photography is the museum's main collection."], a: 1, ev: [1,2,3], d: 1100, why: "前の2文は会員の特典の説明.特典をもう1つ付け加えるのが自然.", x: ["1年分の特典を勧めるページで,来年閉館するのは矛盾する.", "", "家族会員に子どもが含まれるので矛盾する.", "収蔵品の種類の話は,特典の説明の流れに合わない."] },
      { id: "r129q4", q: "(4)", c: ["by", "during", "within", "since"], a: 2, ev: [5], d: 1000, why: "within + 期間 で「〜以内に」.", x: ["by の後ろには期限の時点(日付など)を置く.期間の長さは置かない.", "during five business days は「5営業日の間ずっと」で,届く期限にならない.", "", "since は「〜以来」で,意味が合わない."] }
    ]
  },
  {
    id: "r130",
    kind: "記事(長文)",
    title: "Logistics Today — Robots in the Warehouse",
    target: 250,
    s: [
      "Five years ago, workers at Brennan Logistics walked up to 20 kilometers a day collecting items from shelves.",
      "Today, small robots carry entire shelving units to stationary workers, who pick the items and pack them.",
      "The change has roughly doubled the number of orders the company can process per hour.",
      "Contrary to early fears, the company has not reduced its workforce.",
      "Instead, it has retrained many employees to maintain the robots and to handle tasks that machines still struggle with, such as packing fragile or oddly shaped goods.",
      "\"The robots took over the walking, not the thinking,\" said operations director Lena Fischer.",
      "Industry observers point out, however, that Brennan expanded rapidly during the same period.",
      "In a slower market, they argue, the same technology might well have led to job losses.",
      "Smaller firms face a different challenge: the systems require a large initial investment, and the savings appear only after several years.",
      "Some vendors now rent robots by the month, an arrangement that allows companies to test the technology before committing to a purchase."
    ],
    ja: "5年前,ブレナン・ロジスティクスの作業員は棚から品物を集めるのに1日最大20キロ歩いていた.今は小さなロボットが棚ごと,その場にいる作業員のところへ運び,作業員が品物を取って梱包する.この変化で,1時間に処理できる注文の数はおよそ2倍になった.初めの心配とは逆に,会社は人を減らしていない.代わりに,多くの社員をロボットの保守や,壊れやすい品や形の変わった品の梱包など,機械がまだ苦手な作業に向けて再教育した.「ロボットが引き受けたのは歩くことで,考えることではない」と業務責任者のフィッシャー氏は言う.ただし業界の見方では,ブレナンは同じ時期に急成長していた.成長の遅い市場なら,同じ技術で仕事が失われていたかもしれないという.小さな会社には別の難しさがある.仕組みには大きな初期投資が要り,節約の効果は数年たたないと出ない.今では月単位でロボットを貸す業者もあり,買うと決める前に技術を試せる.",
    qs: [
      { id: "r130q1", q: "What is the main change described at Brennan Logistics?", c: ["Customers can now pick up orders at the warehouse.", "All packing is now done by machines.", "The company has moved to a smaller warehouse.", "Workers no longer have to walk long distances to collect items."], a: 3, ev: [0,1], d: 1300, why: "以前は1日最大20キロ歩いていたが,今はロボットが棚を作業員のところへ運ぶ.", x: ["客が倉庫で受け取る話はない.", "梱包は作業員が行い,壊れやすい品などは機械が苦手とある.", "倉庫を移った話はない.", ""] },
      { id: "r130q2", q: "Why do industry observers question Brennan's experience?", c: ["The company grew quickly at the same time.", "The robots were very expensive to repair.", "The company hired too many new managers.", "Orders actually decreased after the change."], a: 0, ev: [6,7], d: 1800, why: "ブレナンは同じ時期に急成長していたので,人が減らなかったのは成長のおかげかもしれない.成長の遅い市場なら仕事が失われたかもしれない,と見ている.", x: ["", "修理の費用については書かれていない.", "管理職を雇いすぎた話はない.", "処理できる注文はおよそ2倍になったとある."] },
      { id: "r130q3", q: "According to the article, how can smaller companies reduce their risk?", c: ["By sharing warehouses with competitors", "By renting robots before buying them", "By hiring workers from Brennan Logistics", "By waiting for robot prices to fall"], a: 1, ev: [8,9], d: 1500, why: "月単位でロボットを借りれば,買うと決める前に試せる.", x: ["倉庫を共有する話はない.", "", "ブレナンの社員を雇う話はない.", "値下がりを待つ話はない."] }
    ]
  },
  {
    id: "r131",
    kind: "3文書:案内・申込書・メール",
    title: "Northern Retail Summit — Registration",
    target: 340,
    s: [
      { t: "doc", "title":"Announcement — Northern Retail Summit" },
      "The Northern Retail Summit will take place on June 18 and 19 at the Halden Convention Center.",
      "Day one features talks by industry leaders, while day two offers hands-on workshops limited to 30 participants each.",
      "Early registration, available until May 15, costs $280 for both days.",
      "After that date, the price rises to $340.",
      "Groups of four or more from the same company receive an additional 10 percent off.",
      { t: "doc", "title":"Registration Form — submitted May 20" },
      { t: "table", "cap":"Participants from Ostrava Home Goods", "head":["Name", "Days", "Workshop"], rows: [["Petra Novak", "Both", "Store Layout"], ["Tomas Berg", "Both", "Online Sales"], ["Ida Larsen", "Day 1 only", "-"], ["Jonas Pike", "Both", "Store Layout"]] },
      { t: "doc", "title":"E-mail — From: Summit Registration / To: Petra Novak / Date: May 22" },
      "Dear Ms. Novak,",
      "Thank you for registering your team.",
      "Unfortunately, the Store Layout workshop is now full, and only one place remained when your form arrived; we have assigned it to the first name listed.",
      "The other participant who requested this workshop has been placed on the waiting list and may choose Supplier Negotiation instead, which still has space.",
      "Your invoice reflects the group discount.",
      "Best regards, Summit Registration Team"
    ],
    ja: "[案内] 北部小売サミットは6月18・19日にハルデン会議場で開かれる.1日目は業界の指導者の講演,2日目は各30人までの実践の講座.5月15日までの早期申し込みは2日間で280ドル.それ以降は340ドル.同じ会社から4人以上の団体はさらに10%引き.[申込書 5月20日提出:オストラヴァ・ホームグッズの参加者] ノヴァク 2日間・店舗レイアウト / ベルグ 2日間・ネット販売 / ラーセン 1日目のみ / パイク 2日間・店舗レイアウト [メール 5月22日] ノヴァク様.チームのお申し込みに感謝する.あいにく店舗レイアウトの講座は満員になり,申込書が届いたときには1席しか残っていなかったので,一覧の最初の人に割り当てた.この講座を希望したもう1人は空き待ちとし,まだ空きのある仕入れ交渉の講座を選ぶこともできる.請求書には団体割引を反映している.",
    qs: [
      { id: "r131q1", q: "What is indicated about the workshops?", c: ["They are led by the speakers from day one.", "They are free for early registrants.", "They take place on the second day.", "They last for two days."], a: 2, ev: [2], d: 1200, why: "2日目は各30人までの実践の講座(workshops)とある.", x: ["講座の担当者については書かれていない.", "早期申し込みで無料になるとは書かれていない.", "", "講座は2日目だけで,2日間続くのではない."] },
      { id: "r131q2", q: "What price per person most likely applies to Ms. Novak's group for both days, before the group discount?", c: ["$280", "$252", "$306", "$340"], a: 3, ev: [3,4,6], d: 1700, why: "申込書の提出は5月20日で,早期申し込み(5月15日まで)を過ぎているので,割引前は340ドル.", x: ["280ドルは5月15日までの早期申し込みの値段.", "252ドルは280ドルから10%引いた値段で,早期申し込みの割引後.", "306ドルは340ドルから10%引いた値段で,割引後.設問は割引前.", ""] },
      { id: "r131q3", q: "Why does Ostrava Home Goods receive a discount?", c: ["It sent four people from the same company.", "It registered before the deadline.", "Its employees attend only one day.", "It is a member of the summit's organizing group."], a: 0, ev: [5,7], d: 1500, why: "同じ会社から4人以上の団体は10%引き.申込書には4人の名前がある.", x: ["", "早期申し込みの期限(5月15日)は過ぎている.", "1日だけ参加するのはラーセンさん1人で,割引の理由ではない.", "主催団体の一員だとは書かれていない."] },
      { id: "r131q4", q: "Who has been placed on the waiting list?", c: ["Petra Novak", "Jonas Pike", "Ida Larsen", "Tomas Berg"], a: 1, ev: [[7,0], [7,3],11,12], d: 1800, why: "店舗レイアウトを希望したのはノヴァクとパイク.1席は一覧の最初のノヴァクに割り当てたので,空き待ちはパイク.表とメールを見比べる.", x: ["ノヴァクは一覧の最初の名前なので,席を割り当てられた.", "", "ラーセンは1日目だけの参加で,講座を申し込んでいない.", "ベルグはネット販売の講座を希望していて,店舗レイアウトではない."] },
      { id: "r131q5", q: "What option is offered in the e-mail?", c: ["A refund for the second day", "A later date for the workshop", "A different workshop", "A free ticket to next year's summit"], a: 2, ev: [12], d: 1300, why: "空き待ちの人は,まだ空きのある仕入れ交渉の講座を選べる.", x: ["返金の話はない.", "講座を別の日に開く話はない.", "", "来年の無料券の話はない."] }
    ]
  },
  {
    id: "r132",
    kind: "比較表とメール",
    title: "Project Software Plans / E-mail from Jae-won Park",
    target: 260,
    s: [
      { t: "table", "cap":"TaskBridge — Plans (price per user per month)", "head":["Plan", "Price", "Storage", "Support"], rows: [["Basic", "$8", "10 GB", "E-mail"], ["Team", "$14", "100 GB", "E-mail and chat"], ["Business", "$22", "1 TB", "24-hour phone"]] },
      { t: "doc", "title":"E-mail — From: Jae-won Park / To: Office Managers / Date: March 3" },
      "We currently use the Basic plan for our 25 employees, but our designers regularly run out of storage when sharing large files.",
      "I have looked at the options, and I believe the Team plan would solve this problem at a reasonable cost.",
      "Moving everyone to the Business plan would cost $200 more per month than the Team plan, and we rarely need help outside office hours.",
      "However, the Team plan allows only one shared workspace per company, so I would also like to hear whether any department needs a separate workspace.",
      "Please send me your comments by Friday."
    ],
    ja: "[表:タスクブリッジのプラン(1人あたり月額)] ベーシック 8ドル・10GB・メール / チーム 14ドル・100GB・メールとチャット / ビジネス 22ドル・1TB・24時間電話 [メール 3月3日 パクさんから各事務所の責任者へ] 今は25人の社員でベーシックを使っているが,デザイナーが大きなファイルを共有するとき容量が足りなくなる.選択肢を調べ,チームのプランなら手ごろな費用でこの問題を解決できると思う.全員をビジネスにすると,チームより月200ドル高くなり,勤務時間外の手助けはめったに必要ない.ただ,チームのプランは1社につき共有の作業場が1つだけなので,別の作業場が必要な部署があるかも聞きたい.金曜日までに意見を送ってほしい.",
    qs: [
      { id: "r132q1", q: "What problem does Mr. Park mention?", c: ["Employees cannot work outside the office.", "Support is not available by e-mail.", "The software is too difficult to use.", "The company does not have enough storage."], a: 3, ev: [2], d: 1200, why: "デザイナーが大きなファイルを共有するとき容量が足りなくなる,とある.", x: ["社外での作業については書いていない.", "ベーシックでもメールの手助けはある.", "使いにくさについては書いていない.", ""] },
      { id: "r132q2", q: "Based on the table, how was the figure of $200 most likely calculated?", c: ["$8 difference for 25 employees", "$14 for 25 employees", "$22 for 10 employees", "$8 for each of the 25 employees per year"], a: 0, ev: [[0,1], [0,2],4], d: 2000, why: "ビジネス22ドルとチーム14ドルの差は1人8ドル.25人で月200ドル.表とメールを見比べる計算問題.", x: ["", "14ドル×25人は350ドルで,チームの総額.差額ではない.", "22ドル×10人は220ドルで,人数も違う.", "メールは「月に(per month)」200ドル高いと言っており,年の話ではない."] },
      { id: "r132q3", q: "What does Mr. Park want to find out?", c: ["Which employees work after office hours", "Whether any department needs its own workspace", "How much storage each designer uses", "When the current contract ends"], a: 1, ev: [5,6], d: 1400, why: "チームのプランは共有の作業場が1つだけなので,別の作業場が必要な部署があるかを聞きたい,とある.", x: ["勤務時間外の手助けはめったに要らないと自分で書いており,だれが働いているかは聞いていない.", "", "容量の使用量は聞いていない.", "契約の終わりについては聞いていない."] }
    ]
  },
  {
    id: "r133",
    kind: "記事(長文)",
    title: "City Living — Farms in the Sky",
    target: 240,
    s: [
      "On the roof of a former printing plant in downtown Belmont, rows of lettuce and herbs grow under glass.",
      "The greenhouse, operated by the start-up Skyline Greens, supplies twelve restaurants and two supermarkets within five kilometers.",
      "Because the produce travels such a short distance, it reaches customers within hours of being harvested.",
      "Founder Amara Osei says chefs value the freshness so highly that they are willing to pay about 20 percent more than they would for conventional produce.",
      "Rooftop farms face real limitations, however.",
      "Heavy soil can strain older buildings, so Skyline grows its plants in water rather than in earth.",
      "Leafy vegetables do well in such systems, but crops like potatoes and wheat are impractical.",
      "Critics also note that the energy needed to heat and light greenhouses in winter can cancel out the environmental benefit of shorter deliveries.",
      "Osei acknowledges the point and says the company recently installed solar panels to cover most of its electricity use.",
      "She does not expect rooftop farms to replace traditional agriculture, but rather to complement it in densely populated areas."
    ],
    ja: "ベルモント中心街の元印刷工場の屋上で,ガラスの下にレタスやハーブが並んで育っている.新興企業スカイライン・グリーンズが運営するこの温室は,5キロ以内の12のレストランと2つのスーパーに供給している.運ぶ距離がとても短いので,野菜は収穫から数時間で客に届く.創業者のオセイ氏によると,料理長たちは新鮮さを高く評価し,ふつうの野菜より約20%高く払ってもよいと考えている.ただし屋上の農場には現実の限界もある.重い土は古い建物に負担をかけるので,スカイラインは土ではなく水で育てている.葉物野菜はこの方法でよく育つが,ジャガイモや小麦のような作物には向かない.批判する人は,冬に温室を暖め照らすエネルギーが,配送が短い環境上の利点を打ち消しかねないとも指摘する.オセイ氏はその点を認め,最近太陽電池板を付けて電気の大半をまかなうようにしたと言う.屋上の農場が従来の農業に取って代わるとは考えておらず,人口の密集した地域でそれを補うものだと見ている.",
    qs: [
      { id: "r133q1", q: "Why are restaurants willing to pay more for Skyline Greens' produce?", c: ["It includes rare vegetables.", "It is grown without water.", "It is extremely fresh.", "It is delivered free of charge."], a: 2, ev: [2,3], d: 1300, why: "収穫から数時間で届き,料理長はその新鮮さを高く評価して約20%高く払ってもよいと考えている.", x: ["珍しい野菜だとは書かれていない.", "土ではなく水で育てている.水を使わないのではない.", "", "配送が無料だとは書かれていない."] },
      { id: "r133q2", q: "Why does Skyline Greens grow plants in water?", c: ["Restaurants requested it.", "Water is cheaper than soil.", "Potatoes grow better in water.", "Soil would be too heavy for the building."], a: 3, ev: [5], d: 1400, why: "重い土は古い建物に負担をかけるので,水で育てている.", x: ["レストランの要望ではない.", "費用の比較は書かれていない.", "ジャガイモはこの方法に向かないとある.", ""] },
      { id: "r133q3", q: "The word \"complement\" in the last sentence is closest in meaning to", c: ["add to", "praise", "compete with", "finish"], a: 0, ev: [9], d: 1800, why: "取って代わるのではなく「補う」.add to(付け加える・足す)が最も近い.つづりの似た compliment(ほめる)と取り違えない.", x: ["", "praise は compliment(ほめる)の意味で,complement とは違う.", "compete with は「競う」で,取って代わる考えに近く,文の流れと逆.", "finish は「終える」で,意味が違う."] }
    ]
  },
  {
    id: "r134",
    kind: "社内報(長文)",
    title: "Inside Valemont — Employee Spotlight: Kenji Mori",
    target: 230,
    s: [
      "When Kenji Mori joined Valemont's accounting department eight years ago, he had never written a line of computer code.",
      "Today he leads a small team that builds tools to automate routine financial reports.",
      "The transition began almost by accident.",
      "Frustrated by the hours he spent copying figures between spreadsheets each month, Kenji took an online programming course in his spare time.",
      "Within a few months, he had written a simple program that completed the task in minutes.",
      "His manager noticed the results and asked him to share the program with colleagues.",
      "Since then, the tools developed by his team have saved the department an estimated 3,000 hours a year.",
      "Kenji credits Valemont's learning budget, which reimburses employees for job-related courses, for making the change possible.",
      "\"I would not have paid for the course myself at the time,\" he admits.",
      "Outside work, Kenji volunteers at a community center, where he teaches basic computer skills to retirees."
    ],
    ja: "モリ・ケンジさんが8年前にヴェイルモントの経理部に入ったとき,コンピューターのコードを1行も書いたことがなかった.今では,決まった財務報告を自動化する道具を作る小さなチームを率いている.転身はほとんど偶然から始まった.毎月表計算の間で数字を写すのに何時間もかかることに不満を感じ,空き時間にネットのプログラミング講座を受けた.数か月のうちに,その作業を数分で終える簡単なプログラムを書いた.上司が結果に気づき,同僚と共有するよう頼んだ.それ以来,チームの作った道具で,部は年に推定3,000時間を節約している.ケンジさんは,仕事に関係する講座の費用を払い戻すヴェイルモントの学習予算のおかげだと言う.「当時は自分でお金を払ってまで講座は受けなかっただろう」と認める.仕事の外では公民館でボランティアをし,退職した人たちにコンピューターの基本を教えている.",
    qs: [
      { id: "r134q1", q: "What is the article mainly about?", c: ["A new accounting policy at Valemont", "How an employee developed a new career path within the company", "The results of an online programming contest", "A community center's computer classes"], a: 1, ev: [0,1], d: 1300, why: "経理部に入りコードを書いたことのなかった社員が,今は自動化の道具を作るチームを率いている,という社員紹介.", x: ["経理の新しい方針の話ではない.", "", "プログラミングの大会の話はない.", "公民館の教室は最後に触れているだけで,中心ではない."] },
      { id: "r134q2", q: "What first motivated Mr. Mori to learn programming?", c: ["A request from his manager", "A requirement for promotion", "A repetitive task that took a long time", "A course offered at the community center"], a: 2, ev: [3], d: 1400, why: "毎月表計算の間で数字を写すのに何時間もかかることに不満を感じたのがきっかけ.", x: ["上司が頼んだのは,プログラムができた後に同僚と共有すること.", "昇進の条件だったとは書かれていない.", "", "受けたのはネットの講座で,公民館では彼が教える側."] },
      { id: "r134q3", q: "What does Mr. Mori suggest about Valemont's learning budget?", c: ["It should be increased.", "It is rarely used by accountants.", "It covers only courses taken during work hours.", "He might not have taken the course without it."], a: 3, ev: [7,8], d: 1700, why: "学習予算のおかげで転身できたと言い,「当時は自分で払ってまで講座は受けなかっただろう」と認めている.", x: ["増やすべきだとは言っていない.", "経理部の人がめったに使わないとは書かれていない.", "講座は空き時間に受けており,勤務時間中だけが対象とは書かれていない.", ""] }
    ]
  },
  {
    id: "r135",
    kind: "3文書:お知らせ・メール・メール",
    title: "Brightwell Appliances — Product Recall",
    target: 340,
    s: [
      { t: "doc", "title":"Recall Notice — Brightwell Appliances" },
      "Brightwell Appliances is voluntarily recalling its Model K-200 electric kettles sold between January and April of this year.",
      "In rare cases, the handle may become loose and detach while the kettle is full of hot water.",
      "Customers should stop using the kettle immediately and contact Brightwell for a free replacement or a full refund.",
      "Kettles with a serial number beginning with \"KB\" are not affected.",
      { t: "doc", "title":"E-mail — From: Daniel Shaw / To: Brightwell Customer Care / Date: May 6" },
      "I bought a K-200 kettle in March and just read your recall notice.",
      "The serial number on my kettle is KA-50917.",
      "I would prefer a replacement rather than a refund, since I like the design.",
      "Could you also tell me whether I need to send the old kettle back, and if so, who pays for the shipping?",
      { t: "doc", "title":"E-mail — From: Brightwell Customer Care / To: Daniel Shaw / Date: May 7" },
      "Dear Mr. Shaw,",
      "Thank you for contacting us, and we apologize for the inconvenience.",
      "Your kettle is included in the recall, and a replacement will be shipped to you within ten days.",
      "Please return the old kettle using the prepaid label that will be included in the box with your new one.",
      "Brightwell Customer Care"
    ],
    ja: "[リコールのお知らせ] ブライトウェル家電は,今年の1月から4月に販売した電気ケトル K-200 を自主回収する.まれに,湯がいっぱいのときに取っ手がゆるんで外れることがある.使うのをすぐやめ,無料の交換か全額返金のためにブライトウェルへ連絡してほしい.製造番号が「KB」で始まるものは対象外.[メール 5月6日 ショーさんから] 3月に K-200 を買い,リコールのお知らせを読んだ.製造番号は KA-50917.デザインが気に入っているので,返金より交換がいい.古いケトルを送り返す必要があるか,あるならだれが送料を払うのかも教えてほしい.[メール 5月7日] ショー様.ご連絡に感謝し,ご不便をおわびする.お客様のケトルは回収の対象で,10日以内に交換品を送る.新しいケトルの箱に入っている料金前払いの伝票で,古いケトルを返送してほしい.",
    qs: [
      { id: "r135q1", q: "What is the problem with the Model K-200?", c: ["Its handle may come off.", "It heats water too slowly.", "Its lid does not close properly.", "Its power cord is too short."], a: 0, ev: [2], d: 1200, why: "取っ手がゆるんで外れることがある(detach)とある.come off は「外れる」.", x: ["", "湯をわかす速さについては書かれていない.", "ふたについては書かれていない.", "電源コードについては書かれていない."] },
      { id: "r135q2", q: "How does Mr. Shaw know his kettle is affected by the recall?", c: ["It was bought in May.", "It was bought in March and its serial number does not begin with \"KB.\"", "Its handle has already broken.", "A store employee told him."], a: 1, ev: [1,4,6,7], d: 1700, why: "対象は1〜4月の販売で,製造番号が KB で始まるものは対象外.ショーさんは3月に買い,番号は KA で始まる.2つの文書を見比べる.", x: ["買ったのは3月で,メールを書いたのが5月.", "", "取っ手が壊れたとは書いていない.", "店員から聞いたとは書いていない.お知らせを読んだ."] },
      { id: "r135q3", q: "What does Mr. Shaw request?", c: ["A refund", "A different model", "A new kettle", "A repair"], a: 2, ev: [8], d: 1100, why: "デザインが気に入っているので,返金より交換(replacement)がいいと書いている.", x: ["返金ではなく交換を望んでいる.", "別の型を求めてはいない.デザインが気に入っている.", "", "修理は求めていない."] },
      { id: "r135q4", q: "What is suggested about the cost of returning the old kettle?", c: ["Mr. Shaw must pay for it.", "It will be deducted from a refund.", "It depends on the serial number.", "It will be paid by Brightwell."], a: 3, ev: [9,14], d: 1600, why: "ショーさんは送料をだれが払うか聞いた.返事では料金前払い(prepaid)の伝票を使うよう言っているので,会社が払う.", x: ["前払いの伝票が入っているので,ショーさんが払うのではない.", "ショーさんは返金ではなく交換を受けるので,差し引く話にならない.", "製造番号は回収の対象かどうかに関わるもので,送料とは関係がない.", ""] },
      { id: "r135q5", q: "When will Mr. Shaw most likely send back the old kettle?", c: ["After he receives the new kettle", "Before May 7", "Before the new kettle is shipped", "Within ten days of buying it"], a: 0, ev: [13,14], d: 1500, why: "古いケトルは,新しいケトルの箱に入っている伝票で返送する.つまり新しいケトルが届いた後.", x: ["", "5月7日は返事の日で,まだ伝票は届いていない.", "伝票は新しいケトルの箱に入っているので,届く前には返送できない.", "10日は交換品を送るまでの期間で,買ってからの期間ではない."] }
    ]
  },
  {
    id: "r136",
    kind: "記事(長文)",
    title: "Retail Insight — The Real Cost of Free Shipping",
    target: 250,
    s: [
      "For online shoppers, few words are more appealing than \"free shipping.\"",
      "Surveys consistently show that unexpected delivery fees are the leading reason customers abandon their carts before paying.",
      "Yet shipping is never truly free; the cost is simply moved elsewhere.",
      "Large retailers can absorb it because their enormous volumes allow them to negotiate lower rates with carriers.",
      "Smaller sellers, by contrast, often raise their product prices to compensate, which can make them look less competitive on comparison sites.",
      "A growing number of merchants are therefore experimenting with minimum order thresholds, offering free delivery only on purchases above a set amount.",
      "This approach has a useful side effect: customers frequently add an extra item to qualify, increasing the average order size.",
      "Nevertheless, thresholds must be set carefully.",
      "If the minimum is too high, shoppers may feel tricked and take their business elsewhere; if it is too low, the seller gains little.",
      "Some analysts recommend setting the threshold at roughly 30 percent above the store's current average order value."
    ],
    ja: "ネットで買い物をする人にとって,「送料無料」ほど魅力的な言葉は少ない.調査では,思いがけない配送料が,支払いの前にカートを放棄する最大の理由だと繰り返し示されている.しかし送料が本当に無料になることはない.費用はただ別の所へ移されるだけだ.大きな小売業者は,膨大な取扱量で運送業者と安い料金を交渉できるので,それを吸収できる.対照的に小さな売り手は,埋め合わせに商品の値段を上げることが多く,比較サイトで競争力がないように見えかねない.そこで,一定の額を超える買い物だけ配送を無料にする「最低注文額」を試す商店が増えている.この方法には便利な副作用がある.客が条件を満たすためにもう1品加えることが多く,1回の注文額の平均が増える.それでも,基準額は慎重に決めなければならない.高すぎると客はだまされたと感じてよそへ行き,低すぎると売り手の得は少ない.今の平均注文額のおよそ30%上に基準を置くよう勧める専門家もいる.",
    qs: [
      { id: "r136q1", q: "What is mentioned as the main reason shoppers leave without buying?", c: ["Slow delivery times", "Unexpected delivery charges", "Limited product choices", "Complicated payment forms"], a: 1, ev: [1], d: 1300, why: "思いがけない配送料が,カートを放棄する最大の理由だとある.", x: ["配送の遅さは書かれていない.", "", "品ぞろえの少なさは書かれていない.", "支払いの手続きの複雑さは書かれていない."] },
      { id: "r136q2", q: "According to the article, why can large retailers offer free shipping more easily?", c: ["They own their own delivery trucks.", "They charge higher product prices.", "They ship large volumes and get lower rates.", "They sell mainly through comparison sites."], a: 2, ev: [3], d: 1500, why: "膨大な取扱量で運送業者と安い料金を交渉できるので,費用を吸収できる.", x: ["自社のトラックを持っているとは書かれていない.", "商品の値段を上げるのは小さな売り手の方.", "", "比較サイトで不利になるのは小さな売り手の話."] },
      { id: "r136q3", q: "If a store's average order is $50, what threshold would some analysts most likely recommend?", c: ["About $35", "About $50", "About $80", "About $65"], a: 3, ev: [9], d: 2100, why: "今の平均注文額のおよそ30%上.50ドルの30%は15ドルなので,約65ドル.", x: ["35ドルは平均より下で,逆.", "平均と同じ額で,30%上ではない.", "80ドルは60%上で,高すぎる.", ""] }
    ]
  },
  {
    id: "r137",
    kind: "社内メモとメール",
    title: "Proposal: Flexible Start Times / Reply from Human Resources",
    target: 270,
    s: [
      { t: "doc", "title":"Memo — From: Carla Diaz, Customer Support Manager / To: Human Resources / Date: September 9" },
      "I would like to propose allowing customer support staff to choose a start time between 7 A.M. and 10 A.M.",
      "Many of our calls now come from customers in other time zones, and the current fixed schedule of 9 A.M. to 5 P.M. leaves early-morning and evening calls unanswered.",
      "Under the proposal, each employee would still work eight hours, and at least four staff members would be on duty at all times between 8 A.M. and 6 P.M.",
      "Several employees have also said that a later start would help them avoid rush-hour traffic.",
      { t: "doc", "title":"E-mail — From: Victor Hale, Human Resources / To: Carla Diaz / Date: September 12" },
      "Thank you for your well-prepared proposal.",
      "I discussed it with the director, and we agree that it addresses a real business need.",
      "Before the change becomes permanent, we would like to run it as a three-month trial starting in October.",
      "Please keep a record of the number of calls answered outside the current hours so that we can evaluate the results.",
      "If the trial is successful, other departments may adopt a similar system."
    ],
    ja: "[メモ 9月9日 顧客サポート部長ディアスから人事部へ] 顧客サポートの社員が午前7時から10時の間で始業時刻を選べるようにすることを提案したい.今は電話の多くがほかの時間帯の地域の客からで,9時から5時の固定の勤務では,早朝と夕方の電話に出られない.提案では,社員はそれぞれ8時間働き,午前8時から午後6時までは常に4人以上が勤務する.遅く始めればラッシュアワーを避けられるという社員もいる.[メール 9月12日 人事部ヘイルから] よく準備された提案に感謝する.所長と話し,実際の業務上の必要に応えるものだという点で一致した.正式に変える前に,10月から3か月の試行として行いたい.結果を評価できるよう,今の勤務時間外に出た電話の数を記録してほしい.試行がうまくいけば,ほかの部署も同じような仕組みを取り入れるかもしれない.",
    qs: [
      { id: "r137q1", q: "What is the main reason for Ms. Diaz's proposal?", c: ["To answer calls outside the current working hours", "To reduce the number of support staff", "To shorten the working day", "To move the office to another time zone"], a: 0, ev: [2], d: 1300, why: "今の固定の勤務では早朝と夕方の電話に出られないため.", x: ["", "人を減らす話ではない.常に4人以上が勤務する.", "社員はそれぞれ8時間働くので,勤務時間は短くならない.", "事務所を移す話はない."] },
      { id: "r137q2", q: "Under the proposal, what is the latest time a support employee could finish work?", c: ["5 P.M.", "6 P.M.", "7 P.M.", "6 A.M."], a: 1, ev: [1,3], d: 1700, why: "始業は最も遅くて午前10時.社員はそれぞれ8時間働くので,最も遅い終業は午後6時.2つの条件を組み合わせて求める.", x: ["午後5時は今の固定の勤務の終わり.", "", "午後7時に終えるには午前11時に始める必要があり,選べる範囲(7〜10時)を超える.", "午前6時は終業の時刻にならない."] },
      { id: "r137q3", q: "What does Mr. Hale ask Ms. Diaz to do?", c: ["Hire additional staff in October", "Present the proposal to other departments", "Track calls handled outside the usual hours", "Make the change permanent immediately"], a: 2, ev: [9], d: 1300, why: "結果を評価できるよう,今の勤務時間外に出た電話の数を記録するよう頼んでいる.", x: ["人を増やすようには頼んでいない.", "ほかの部署は試行がうまくいけば取り入れるかもしれない,と言っているだけ.", "", "正式に変える前に3か月の試行をすると言っている."] }
    ]
  }
];
