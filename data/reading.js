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
      { id: "r1q1", q: "What is the purpose of the e-mail?", c: ["To announce a new office manager", "To report a problem with computers", "To ask staff to work on Saturday", "To give instructions about an office move"], a: 3, ev: [1, 3], d: 400, why: "冒頭で移転を伝え,その後に私物の梱包など指示が続く.目的は「移転についての指示」." },
      { id: "r1q2", q: "When will boxes be delivered?", c: ["On Wednesday", "On Friday", "On Saturday", "Next month"], a: 0, ev: [4], d: 300, why: "Boxes will be delivered to each desk on Wednesday. とある.Friday は梱包の締め切りなので引っかけ." },
      { id: "r1q3", q: "What are employees told about their computers?", c: ["They should pack them in boxes.", "They should take them home.", "They will be handled by another department.", "They will be replaced with new ones."], a: 2, ev: [5], d: 600, why: "The IT department will disconnect and reinstall all computers とあり,社員は何もしなくてよい.IT department を another department と言い換えている." }
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
      { id: "r2q1", q: "Why will the library be closed?", c: ["Because of a holiday", "Because the building is being improved", "Because of a shortage of staff", "Because it is moving to a new location"], a: 1, ev: [0, 1], d: 300, why: "closed ... for renovations とある.renovations を「建物が改良される」と言い換えている." },
      { id: "r2q2", q: "What is indicated about books due during the closure?", c: ["They must be returned before July 1.", "They can be returned at another library.", "They will be renewed automatically online.", "They can be returned later without a fee."], a: 3, ev: [2], d: 500, why: "may be returned after the library reopens without any late fees とある.後で返しても料金がかからない." },
      { id: "r2q3", q: "What will NOT be available during the closure?", c: ["E-book lending", "Online services", "The reading room", "The library website"], a: 2, ev: [1, 3], d: 700, why: "オンラインサービスと電子書籍は利用できる.閲覧室は新しく建設中なので使えない.NOT 問題は,本文にある選択肢を消していく." }
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
      { id: "r3q1", q: "What is being advertised?", c: ["A cleaning service", "A cleaning product", "Office furniture", "An office space for rent"], a: 0, ev: [1], d: 300, why: "Bright Clean offers professional cleaning for offices とある.製品ではなくサービス." },
      { id: "r3q2", q: "How can new customers receive a discount?", c: ["By signing up before a deadline", "By using the service every day", "By visiting the Web site", "By buying cleaning products"], a: 0, ev: [4], d: 500, why: "sign up before the end of March で20%引き.「期限までに申し込む」と言い換えている." },
      { id: "r3q3", q: "What is suggested about Bright Clean?", c: ["It only serves large offices.", "It charges for estimates.", "It lets customers choose how often it visits.", "It has just opened."], a: 2, ev: [2], d: 600, why: "daily, weekly, or monthly, depending on your needs とあり,訪問の頻度を選べる.all sizes なので大企業だけではなく,見積もりは free." }
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
      { id: "r4q1", q: "What is one responsibility of the position?", c: ["Designing furniture", "Training new employees", "Arranging deliveries", "Managing the online store"], a: 2, ev: [1], d: 400, why: "仕事内容は help customers choose products, process payments, and arrange deliveries.その1つが配送の手配." },
      { id: "r4q2", q: "What is NOT required for the position?", c: ["Experience in retail", "Knowledge of interior design", "Working on some weekends", "Sending a résumé"], a: 1, ev: [2, 3, 4, 5], d: 600, why: "インテリアデザインの知識は helpful but not required(あると良いが必須ではない).小売経験・週末勤務・履歴書はどれも求められている.NOT 問題は本文にある選択肢を消していく." },
      { id: "r4q3", q: "What is indicated about employees of Riverside Furniture?", c: ["They work only on weekdays.", "They must live downtown.", "They are interviewed in June.", "They can buy products at a lower price."], a: 3, ev: [4], d: 500, why: "all employees receive a 15 percent discount とある.「割引」を「安い値段で買える」と言い換えている.週末勤務があるので weekdays only は誤り." }
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
      { id: "r5q1", q: "What is the article mainly about?", c: ["The closing of a bookshop", "The opening of a new café", "A new job training program", "A change in company leadership"], a: 1, ev: [0], d: 300, why: "記事の主題は1文目にある.will open its first store in Westbridge.書店は建物の以前の入居者として出てくるだけ." },
      { id: "r5q2", q: "Why did Sunny Bean choose Westbridge?", c: ["Rent there is low.", "A bookshop invited the company.", "The company's founder lives there.", "Its number of young workers is increasing."], a: 3, ev: [2], d: 600, why: "because of its growing number of young professionals.young professionals を young workers,growing を increasing と言い換えている." },
      { id: "r5q3", q: "What is suggested about Sunny Bean?", c: ["It plans to expand further in the region.", "It is closing its Portland stores.", "It will sell books at its cafés.", "It will hire workers from Portland."], a: 0, ev: [5], d: 700, why: "intends to open two more stores in the region から,地域でさらに店を増やす(expand)つもりだと分かる.雇うのは local residents なので Portland の人ではない." }
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
      { id: "r6q1", q: "What problem does Mr. Mori mention?", c: ["His client is late.", "A meeting room is too small.", "Some equipment is not working.", "His presentation file is missing."], a: 2, ev: [0, 2], d: 300, why: "The projector in Meeting Room B isn't working.projector を equipment(機器)と言い換えている." },
      { id: "r6q2", q: "What does Ms. Walsh imply about Room C?", c: ["It is being repaired.", "It can be used for the presentation.", "It is reserved for the afternoon.", "It is next to the reception desk."], a: 1, ev: [3], d: 600, why: "空いていて機器も点検済みだと伝えている.つまり C 室をプレゼンに使えるということ.森さんも That would work と応じている." },
      { id: "r6q3", q: "At 10:17 A.M., what does Ms. Walsh most likely mean when she writes, \"I'm on it\"?", c: ["She is in Room C now.", "She will contact the reception desk.", "She will give the presentation herself.", "She is checking the projector now."], a: 1, ev: [4, 5], d: 800, why: "意図問題は直前の発言を見る.森さんの「受付に伝えてくれる?」への返事なので「(受付への連絡を)引き受ける」.プロジェクターは午後に技術者が見るので,今調べているわけではない." }
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
      { id: "r7q1", q: "What is the purpose of the memo?", c: ["To introduce a new accounting manager", "To request receipts for a past trip", "To explain a new travel policy for managers", "To announce a change in a procedure"], a: 3, ev: [0, 1], d: 400, why: "経費報告を紙からオンラインシステムに切り替える,という手続きの変更を知らせている." },
      { id: "r7q2", q: "According to the memo, what must employees do within 14 days of a trip?", c: ["Submit an expense report", "Attend a training session", "Get a supervisor's signature on paper", "Return unused travel funds"], a: 0, ev: [3], d: 400, why: "Reports must be submitted within 14 days of the end of each trip.設問の within 14 days が本文を探す手がかりになる." },
      { id: "r7q3", q: "What is indicated about the training sessions?", c: ["They are only for supervisors.", "They will be held online.", "A recording will be available for those who miss them.", "They will take place after October 1."], a: 2, ev: [5, 6], d: 700, why: "出られない人は recorded version を見てよい.研修自体は大会議室で,日付は9月なので October 1 より前." }
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
      { id: "r8q1", q: "Why was Mr. Ortiz in the city?", c: ["For work", "For a vacation", "To visit family", "To attend a sports event"], a: 0, ev: [0], d: 300, why: "during a business trip とある.business trip を for work と言い換えている." },
      { id: "r8q2", q: "What did Mr. Ortiz dislike about the hotel?", c: ["A facility was not available.", "His room was noisy.", "It was far from the convention center.", "The front desk staff were unfriendly."], a: 0, ev: [3], d: 500, why: "However の後が不満点.fitness center が閉まっていた.fitness center を facility(施設)と言い換えている.部屋は quiet で,フロントは helpful." },
      { id: "r8q3", q: "What did the manager give Mr. Ortiz?", c: ["A refund for one night", "A room upgrade", "A coupon for a meal", "A free fitness class"], a: 2, ev: [4], d: 600, why: "a voucher for a free breakfast.voucher を coupon,breakfast を meal と言い換えている." }
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
      { id: "r9q1", q: "Why was the letter sent to Ms. Tanaka?", c: ["To thank her for a recent large order", "To introduce a new account manager", "To remind her that a contract is ending", "To apologize for a late delivery"], a: 2, ev: [2, 3], d: 500, why: "your current supply contract will expire(契約が満了する)と知らせ,更新を求めている.1文目のお礼はあいさつで,目的ではない." },
      { id: "r9q2", q: "What is suggested about delivery fees?", c: ["They will be reduced next year.", "They were raised five years ago.", "They are included in product prices.", "They will not change for some customers."], a: 3, ev: [4, 5], d: 900, why: "来年から5%上がるが,2年で更新する客は影響を受けない.つまり「一部の客にとっては変わらない」.2文を組み合わせて答える問題." },
      { id: "r9q3", q: "What is Ms. Tanaka asked to do by December 1?", c: ["Call Mr. Hughes", "Pay an overdue fee", "Send back a document", "Place a new order"], a: 2, ev: [3], d: 600, why: "sign and return the enclosed renewal form by December 1.return the form を send back a document と言い換えている.電話は質問があるときだけ." }
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
      { id: "r10q1", q: "What is the purpose of the e-mail?", c: ["To announce a new e-mail address", "To introduce new technicians", "To request feedback on a server", "To notify staff of a temporary service interruption"], a: 3, ev: [0], d: 400, why: "冒頭で,メールシステムが一時的に使えなくなることを知らせている.unavailable ... from 1:00 A.M. to 5:00 A.M. を temporary service interruption と言い換えている." },
      { id: "r10q2", q: "What will happen to messages sent during the maintenance?", c: ["They will be deleted.", "They will be returned to the sender.", "They will arrive after the work is finished.", "They will be checked by technicians."], a: 2, ev: [2], d: 500, why: "will be delivered once the system is back online(復旧したら配信される).「作業が終わった後に届く」と言い換えている." },
      { id: "r10q3", q: "What are employees asked to do if they have problems?", c: ["Call the help desk", "Use an online request form", "Restart their computers", "Contact their managers"], a: 1, ev: [4], d: 600, why: "submit a request through the IT help page rather than calling the help desk.電話ではなく Web ページから依頼する.Call the help desk は本文で否定されている引っかけ." }
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
      { id: "r11q1", q: "What does Harlow Foods mainly produce?", c: ["Organic vegetables", "Kitchen equipment", "Restaurant menus", "Frozen meals"], a: 3, ev: [0], d: 400, why: "a leading producer of frozen meals とある.有機野菜はパインバレーの方なので引っかけ." },
      { id: "r11q2", q: "Why most likely is Harlow Foods merging with Pine Valley Farms?", c: ["To respond to customer interest in healthier food", "To reduce the number of employees", "To sell its products under a new name", "To move its headquarters to a farm"], a: 0, ev: [1, 2, 3], d: 900, why: "客が健康的な商品を求めている → 合わせた強みでその需要に応える,という流れ.複数の文をつないで目的を推測する." },
      { id: "r11q3", q: "What is indicated about Pine Valley Farms?", c: ["It will stop selling vegetables.", "Its founder will leave the company.", "Its brand name will remain in use.", "It is the largest food producer in the region."], a: 2, ev: [4, 5], d: 800, why: "will continue to be sold under their own brand name.ブランド名は使われ続ける.創業者は取締役に加わるので,去るわけではない." }
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
      { id: "r12q1", q: "Which workshop is held on the weekend?", c: ["Introduction to Photography", "Basic Spanish", "A computer course", "Healthy Cooking"], a: 3, ev: [3], d: 300, why: "Healthy Cooking meets on Saturdays.土曜日は週末." },
      { id: "r12q2", q: "What is included in the fee for the cooking workshop?", c: ["A cookbook", "Ingredients", "A membership", "Lunch with the instructor"], a: 1, ev: [3], d: 500, why: "costs $50, including all ingredients.材料費が含まれている." },
      { id: "r12q3", q: "What is suggested about the workshops?", c: ["They may fill up quickly.", "They are free for members.", "They are taught online.", "They last for three months."], a: 0, ev: [6], d: 600, why: "Space is limited, so please register early から,すぐ満員になるかもしれないと分かる.会員は無料ではなく10%引き,期間は6週間." }
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
      { id: "r13q1", q: "What problem does Ms. Lin report?", c: ["A party has been canceled.", "The office is not available on Friday.", "A delivery will arrive too late.", "A client meeting was moved."], a: 2, ev: [0, 1], d: 300, why: "料理が7時まで届かないが,パーティーは6時開始.配達が遅すぎるのが問題." },
      { id: "r13q2", q: "What is suggested about Bella's Kitchen?", c: ["It has worked with the company before.", "It is cheaper than the first caterer.", "It is located near the office.", "It is closed on Fridays."], a: 0, ev: [2, 3, 4], d: 600, why: "先月の会議の昼食を届けてくれた,とあるので以前に取引がある.値段は a bit higher なので安くはない." },
      { id: "r13q3", q: "At 2:06 P.M., what does Ms. Patel imply when she writes, \"it should be fine\"?", c: ["The party can start later.", "The food will be delivered on time.", "The higher cost can be covered.", "The first caterer will lower its price."], a: 2, ev: [4, 5], d: 800, why: "直前のホルトさんの「高いけど予算は大丈夫?」への返事.残っているお金があるので,高い分も払える,という意味." }
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
      { id: "r14q1", q: "How long do customers have to return an item?", c: ["Two business days", "14 days", "30 days", "60 days"], a: 3, ev: [0], d: 300, why: "within 60 days of delivery.2営業日は配送ラベルが届くまでの日数なので引っかけ." },
      { id: "r14q2", q: "Which item can most likely be returned?", c: ["A bookshelf that was damaged when it arrived", "Curtains made to a customer's measurements", "A lamp that has been used for a month", "A table without its original box"], a: 0, ev: [1, 2, 6], d: 900, why: "組み立てた家具でも「届いたときに破損していた」なら返品できる(unless it arrived damaged).特注カーテン・使用済み・箱なしはどれも条件に合わない." },
      { id: "r14q3", q: "According to the Web page, when will a refund be given?", c: ["When the customer calls the store", "When the shipping label is printed", "Two days after the order", "After the returned item arrives at the warehouse"], a: 3, ev: [5], d: 600, why: "Refunds are issued ... once the item reaches our warehouse.倉庫に届いてから返金される." }
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
      { id: "r15q1", q: "Why did Ms. Cole write to Mr. Reed?", c: ["To offer him a job", "To ask for his portfolio", "To schedule an interview", "To cancel a meeting"], a: 2, ev: [2, 3], d: 300, why: "面接に招き,日時の都合を尋ねている.採用(job offer)はまだ決まっていない." },
      { id: "r15q2", q: "What is Mr. Reed asked to bring?", c: ["A computer", "A printed résumé", "Letters of reference", "His portfolio"], a: 0, ev: [4], d: 400, why: "please bring your own laptop.laptop を computer と言い換えている.作品集はすでに見てもらっている." },
      { id: "r15q3", q: "What is Mr. Reed asked to do if he cannot come on October 3?", c: ["Call Ms. Cole's assistant", "Send his design test by e-mail", "Apply for a different position", "Propose alternative times"], a: 3, ev: [5], d: 500, why: "please suggest two or three other times.suggest other times を propose alternative times と言い換えている." }
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
      { id: "r16q1", q: "What is the notice mainly about?", c: ["A new bus route", "A change in parking fees", "A community event", "A street closure"], a: 3, ev: [0], d: 300, why: "1文目が主題.Elm Street ... will be closed for road repairs.バスの経路変更は通行止めに伴う一部の話." },
      { id: "r16q2", q: "What are drivers advised to do?", c: ["Use a different street", "Park on First Avenue", "Take Bus Route 12", "Drive only at night"], a: 0, ev: [2], d: 400, why: "drivers should use Oak Street as a detour.Oak Street を a different street と言い換えている." },
      { id: "r16q3", q: "What is indicated about residents of Elm Street?", c: ["They must move out temporarily.", "They will receive bus passes.", "They can still drive to their homes.", "They should contact the city by phone."], a: 2, ev: [4], d: 600, why: "will still be able to reach their homes by car.通行止め区間の住民も車で家まで行ける." }
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
      { id: "r17q1", q: "What will the new production line make?", c: ["Batteries", "Electric vehicles", "Computer parts", "Training equipment"], a: 0, ev: [1], d: 500, why: "a new production line for electric vehicle batteries.作るのは電気自動車そのものではなく電池." },
      { id: "r17q2", q: "The word \"cover\" in the fourth sentence is closest in meaning to", c: ["protect", "report on", "pay for", "hide"], a: 2, ev: [3], d: 1100, why: "cover the cost of training で「研修の費用を負担する」.cost と組むので pay for.語彙問題は,その文の中で置き換えて意味が通るものを選ぶ." },
      { id: "r17q3", q: "What is suggested about the expansion?", c: ["It has already been completed.", "It will take place overseas.", "It will reduce the number of jobs.", "It still needs official permission."], a: 3, ev: [5], d: 1000, why: "pending approval from the city council(市議会の承認待ち)から,まだ正式な許可が必要だと分かる.pending の意味が鍵." }
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
      { id: "r18q1", q: "Why did Mr. Ingram write the e-mail?", c: ["To order more chairs", "To complain about a late delivery", "To report errors on a bill", "To cancel an order"], a: 2, ev: [1, 2, 4], d: 400, why: "脚数の誤りと割引の未反映,という請求書(bill)の誤りを伝えている.invoice を bill と言い換えている." },
      { id: "r18q2", q: "How many chairs did Wexford Accounting receive?", c: ["10", "12", "15", "85"], a: 1, ev: [3], d: 500, why: "Only twelve chairs were delivered.15は請求書の誤った数,85は1脚の値段." },
      { id: "r18q3", q: "What can be inferred about the order?", c: ["Its total was more than $1,000.", "It was delivered to the wrong office.", "It included desks as well as chairs.", "It was paid for in advance."], a: 0, ev: [2, 4], d: 1100, why: "85ドル × 12脚 = 1,020ドルで1,000ドルを超えるので,割引の対象になる.だからイングラムさんは割引がないことを指摘している.数字を組み合わせて推論する問題." }
    ]
  }
];
