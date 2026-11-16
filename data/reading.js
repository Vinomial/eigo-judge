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
      { id: "r19q1", q: "Who will speak about advertising on social media?", c: ["Helen Ortiz", "David Chen", "Priya Nair", "Marco Bell"], a: 1, ev: [[2, 1]], d: 300, why: "表の Session の列から Social media advertising の行を探し,同じ行の Speaker を読む.表の問題は「行を見つけて横に読む」." },
      { id: "r19q2", q: "Where will the session on customer data be held?", c: ["Main Hall", "Room A", "Room B", "Room C"], a: 2, ev: [[2, 2], 4], d: 500, why: "表では Room B.本文の has been moved from Room C は「C 室から移った」なので,Room C は元の部屋で引っかけ." },
      { id: "r19q3", q: "What is indicated about lunch?", c: ["It costs extra.", "It will be served in Room A.", "It begins at noon.", "Attendees do not have to pay for it separately."], a: 3, ev: [3], d: 700, why: "is included in the registration fee(参加費に含まれる)を「別に払わなくてよい」と言い換えている.開始は12時半で noon(正午)ではない." }
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
      { id: "r20q1", q: "How many ink cartridges were ordered?", c: ["2", "4", "10", "30"], a: 1, ev: [[2, 1]], d: 300, why: "Ink cartridge の行の Quantity(数量)は 4.30 は単価(Unit price)の数字なので引っかけ." },
      { id: "r20q2", q: "Why was Dalton Design Studio not charged for delivery?", c: ["It picked up the items at the store.", "It is a new customer.", "It paid in advance.", "Its order was large enough."], a: 3, ev: [[2, 4], 3], d: 700, why: "Delivery is free for orders over $300 とあり,請求額は 450 ドル.表の数字と本文の条件を組み合わせて答える." },
      { id: "r20q3", q: "What will happen if payment is made in May?", c: ["An additional charge will apply.", "The order will be canceled.", "A discount will be given.", "The items must be returned."], a: 0, ev: [0, 4, 5], d: 900, why: "請求日は3月3日で,期限は30日以内(4月初め).5月の支払いは期限後なので,5% の late fee(延滞料)= additional charge がかかる." }
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
      { id: "r21q1", q: "What is the purpose of the e-mail?", c: ["To cancel a reservation", "To book a meeting space", "To ask for a refund", "To apply for a job"], a: 1, ev: [6], d: 400, why: "I would like to reserve a room とある.reserve a room を book a meeting space と言い換えている." },
      { id: "r21q2", q: "Which room will Ms. Patel most likely reserve?", c: ["Coral", "Pearl", "Lagoon", "Ocean"], a: 2, ev: [7, [1, 2]], d: 900, why: "条件は「15人」と「ビデオ通話」.12人までの Pearl は入れず,ビデオ会議の設備があるのは Lagoon だけ.メールの条件を表に当てはめる(2つの文書を見比べる問題)." },
      { id: "r21q3", q: "How much will Ms. Patel most likely pay?", c: ["$240", "$216", "$150", "$360"], a: 0, ev: [6, [1, 2], 2], d: 1200, why: "1時〜4時は3時間.Lagoon は1時間 80 ドルなので 240 ドル.10% 引きは「4時間以上」が条件なので当てはまらない($216 は割引した場合の引っかけ)." }
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
      { id: "r22q1", q: "How many customers took part in the survey?", c: ["160", "200", "400", "800"], a: 2, ev: [2], d: 300, why: "400 customers answered our survey とある.160 は「待ち時間」と答えた人数で,グラフの数字の引っかけ." },
      { id: "r22q2", q: "According to the chart, what was the second most common answer?", c: ["Waiting time", "Seating", "Menu variety", "Prices"], a: 1, ev: [[3, 1]], d: 500, why: "グラフで2番目に長い棒は Seating(100).the second most common で「2番目に多い」." },
      { id: "r22q3", q: "What does the company plan to do in October?", c: ["Lower its prices", "Buy new chairs", "Hire cleaning staff", "Increase staffing in the morning"], a: 3, ev: [5], d: 800, why: "Starting in October ... add one more staff member ... between 8:00 and 10:00 A.M. とある.いすの交換は next year(来年)なので時期が違う." }
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
      { id: "r23q1", q: "On what day will Mr. Reyes visit a factory?", c: ["Monday", "Tuesday", "Wednesday", "Thursday"], a: 2, ev: [[2, 3]], d: 400, why: "表の Factory tour の行は Wed., Sept. 10.Wed. は Wednesday の略." },
      { id: "r23q2", q: "How will Mr. Reyes most likely travel from the airport to the hotel?", c: ["By hotel car", "By taxi", "By train", "By rental car"], a: 0, ev: [3], d: 600, why: "A driver from the hotel will meet you at the airport とある.タクシーは「乗る必要がない」と否定されている." },
      { id: "r23q3", q: "What should Mr. Reyes take to his meeting on September 9?", c: ["His receipts", "A hotel voucher", "A factory map", "Examples of products"], a: 3, ev: [[2, 2], 5], d: 800, why: "9月9日の会議の相手は Orchid Trading.その Ms. Tan が product samples を持ってくるよう頼んでいる.samples を examples of products と言い換えている." }
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
      { id: "r24q1", q: "Which region had the lowest sales in the third quarter?", c: ["North", "East", "South", "West"], a: 2, ev: [[1, 2]], d: 500, why: "グラフでいちばん短い棒は South(1.4).lowest は「最も低い」." },
      { id: "r24q2", q: "What is suggested about the West region?", c: ["Many of its customers shop on the Internet.", "A new store opened there in July.", "Its sales were the same as last year.", "It was affected by bad weather."], a: 0, ev: [3], d: 1000, why: "the West grew by 20 percent thanks to strong online orders から,ネットで買う客が多いと分かる.新店舗は北部,前年並みは東部,悪天候は南部の話(地域を入れ替えた引っかけ)." },
      { id: "r24q3", q: "Why will the company introduce new products in the South?", c: ["To compete with a new store", "To respond to a drop in sales caused by weather", "To prepare for the winter season", "To increase online orders"], a: 1, ev: [4, 5], d: 1100, why: "南部は大雨で売上が減った.To address this(これに対処するため)防水の商品を出す,という流れ.this が指す内容を前の文から読み取る." }
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
      { id: "r25q1", q: "How much did Ms. Grant pay for shipping?", c: ["$6.00", "$15.00", "$24.00", "$28.00"], a: 0, ev: [[2, 2]], d: 400, why: "注文の表の Shipping (Standard) の行は $6.00.下の配送方法の表には選ばなかった方法の料金も載っているので,どの表を見るかに注意." },
      { id: "r25q2", q: "What is indicated about Ms. Grant's order?", c: ["It will be delivered the next day.", "It was placed on a weekend.", "It will arrive in more than one package.", "It includes a free gift."], a: 2, ev: [5], d: 900, why: "ランプは12日発送,電球は sent separately(別に送る).つまり荷物は2つに分かれて届く.注文日は Tuesday なので週末ではない." },
      { id: "r25q3", q: "According to the confirmation, under what condition can an item be returned?", c: ["It must be damaged on arrival.", "It must not have been used.", "It must be returned within one week.", "It must be exchanged for another item."], a: 1, ev: [6], d: 700, why: "if they are unused and in their original packaging とある.unused(未使用)= must not have been used.期間は30日で1週間ではない." }
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
      { id: "r26q1", q: "What feature do all three printers have?", c: ["Color printing", "A three-year warranty", "Two-sided printing", "Wireless connection"], a: 2, ev: [2], d: 600, why: "All models can print on both sides of the paper とある.on both sides を two-sided と言い換えている.カラーと3年保証は一部の機種だけ." },
      { id: "r26q2", q: "Which model best fits Mr. Haddad's needs?", c: ["T-100", "T-300", "T-500", "None of the models"], a: 0, ev: [7, [1, 0]], d: 900, why: "条件は「カラー不要」「予算200ドルまで」.200ドル以下は T-100(180ドル)だけ." },
      { id: "r26q3", q: "Why most likely does Mr. Haddad ask about the service plan?", c: ["He wants to print in color later.", "He is worried about repair problems.", "He needs a faster printer.", "He wants to pay in monthly installments."], a: 1, ev: [8, 3], d: 1200, why: "今のプリンターが2回故障し,reliability(信頼性)が大事だと書いている.サービスプランは交換部品が無料になるものなので,故障への備えとして尋ねていると推測できる." }
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
      { id: "r27q1", q: "What is the article mainly about?", c: ["A change in where small stores buy their goods", "A new law on overseas shipping", "The opening of a kitchenware shop", "A decline in the number of small retailers"], a: 0, ev: [0, 1], d: 900, why: "最初の2文が主題:小売店が仕入先を海外から国内へ切り替えている.記事の主題は第1段落(冒頭)に書かれる." },
      { id: "r27q2", q: "According to the survey, why did many store owners change suppliers?", c: ["Domestic goods were cheaper.", "Overseas factories closed.", "Deliveries were frequently late.", "Customers asked for local products."], a: 2, ev: [2], d: 1000, why: "not price but reliability(価格ではなく確実さ),often arrived weeks behind schedule(予定より遅れて届いた)とある.国内品はむしろ15%高いので A は逆." },
      { id: "r27q3", q: "The word \"offset\" in the article is closest in meaning to", c: ["increased", "delayed", "explained", "balanced"], a: 3, ev: [5], d: 1400, why: "「15%高くつくが,売り逃しが減ることで offset される」.Although(〜だが)があるので,高い費用の悪い面が打ち消されるという意味になる.offset = 相殺する = balance.知らない単語は,文の論理(逆接)から意味を導く." }
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
      { id: "r28q1", q: "What is one change being announced?", c: ["The Basic plan will be discontinued.", "The price of one plan will increase.", "Storage space will be reduced.", "A new payment method will be introduced."], a: 1, ev: [2], d: 800, why: "the monthly fee for the Standard plan will rise from $8 to $10.値上がりするのはスタンダードプランだけ.容量は減るのではなく倍になる." },
      { id: "r28q2", q: "Who will NOT be affected immediately by the new fee?", c: ["Customers who joined this year", "Customers who use more than 100 gigabytes", "Customers who received two warnings", "Customers who have already paid for twelve months"], a: 3, ev: [5], d: 1200, why: "Customers who paid for a full year in advance will not be charged the new rate until their current term expires.a full year in advance を have already paid for twelve months と言い換えている." },
      { id: "r28q3", q: "What is implied about customers who keep using the service after September 1?", c: ["They are considered to have agreed to the changes.", "They must sign a new contract.", "They will receive a refund.", "They will be moved to the Basic plan."], a: 0, ev: [7], d: 1300, why: "Continued use ... will be regarded as acceptance of the revised terms.be regarded as 〜(〜とみなされる)= be considered,acceptance(受け入れ)= have agreed.硬い名詞の表現を動詞に直して読む." }
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
      { id: "r29q1", q: "What does Aldergate Hotels plan to do?", c: ["Open 42 new hotels", "Raise its room rates", "Stop using disposable plastic products", "Move its headquarters to Vancouver"], a: 2, ev: [1], d: 800, why: "eliminate single-use plastic items(使い捨てプラスチック製品をなくす).eliminate = stop using,single-use = disposable.42 は今ある施設の数で,新しく開くわけではない." },
      { id: "r29q2", q: "What was a result of the trial in Vancouver?", c: ["Guests complained about the changes.", "Spending on supplies decreased.", "Three hotels were closed.", "Solar panels were installed."], a: 1, ev: [5], d: 1100, why: "supply costs fell by 8 percent(備品の費用が8%下がった)= Spending on supplies decreased.満足度は上がったので A は逆." },
      { id: "r29q3", q: "What is indicated about the solar panel project?", c: ["It was completed in March.", "It will cost less than expected.", "It was rejected by the board.", "Its schedule has not been decided."], a: 3, ev: [7], d: 1200, why: "no timeline for that project has been set(その計画の日程は決まっていない).timeline = schedule,set = decided.3月に承認されたのはプラスチック削減の方." }
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
      { id: "r30q1", q: "Why did Ms. Kim write to Hartwell Furniture?", c: ["Some chairs were damaged.", "She was charged twice.", "Part of her order had not arrived.", "She wanted to order more chairs."], a: 2, ev: [2], d: 600, why: "the table still has not come.いすは届いたが食卓が届かない = 注文の一部が届いていない." },
      { id: "r30q2", q: "What caused the delay?", c: ["The table was damaged before shipping.", "The manufacturer went out of business.", "The address was incorrect.", "The payment was not confirmed."], a: 0, ev: [8], d: 900, why: "The table ... was damaged at our warehouse(倉庫で破損した).倉庫にある = まだ発送前.原因は2通目(返信)に書かれている." },
      { id: "r30q3", q: "What will most likely happen if the table arrives on May 14?", c: ["Ms. Kim will receive a full refund.", "Ms. Kim will pay another delivery fee.", "Ms. Kim will have to return the chairs.", "Ms. Kim will be able to use it when her guests visit."], a: 3, ev: [3, 9], d: 1100, why: "来客は5月17日(1通目),到着予定は5月14日(2通目).14日に届けば来客に間に合う.全額返金は「届かなかった場合」の話.2通の日付をつないで答える." }
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
      { id: "r31q1", q: "Who is eligible to work remotely under the new policy?", c: ["All employees from their first day", "Full-time staff who have finished their trial period", "Part-time staff only", "Department heads only"], a: 1, ev: [1], d: 900, why: "Full-time employees who have completed their six-month probation period.probation period(試用期間)= trial period,completed = finished." },
      { id: "r31q2", q: "What is NOT stated as a condition of working from home?", c: ["Getting a manager's approval", "Being available during certain hours", "Avoiding a particular day of the week", "Submitting a weekly report"], a: 3, ev: [2, 3], d: 1200, why: "承認(approved by your department head),連絡がつく時間(core hours),月曜を避ける(may not fall on Mondays)は本文にある.週報の提出はどこにもない.NOT 問題は,本文にある3つを消す." },
      { id: "r31q3", q: "What will the company provide to remote workers?", c: ["A computer", "Internet service", "Money for electricity", "A mobile phone"], a: 0, ev: [4], d: 800, why: "will lend each remote worker a laptop.laptop を computer と言い換えている.インターネット代と電気代は will not cover(負担しない)." }
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
      { id: "r32q1", q: "What is one duty of the Events Coordinator?", c: ["Selling tickets", "Repairing exhibits", "Managing volunteers", "Teaching science classes"], a: 2, ev: [1], d: 700, why: "will supervise a team of ten volunteers.supervise(監督する)= manage." },
      { id: "r32q2", q: "What is suggested about Ms. Vasquez?", c: ["She has worked at a museum before.", "She meets the experience requirement.", "She cannot work on weekends.", "She has already been interviewed."], a: 1, ev: [2, 9], d: 1100, why: "求人の条件は「イベント企画の経験3年以上」.メールには「5年間,会議や結婚式を企画した」とある.条件(求人)と事実(メール)を照らし合わせる.職場はホテルで博物館ではない." },
      { id: "r32q3", q: "What does Ms. Vasquez's application appear to be missing?", c: ["A résumé", "A cover letter", "Language skills", "One of the required reference letters"], a: 3, ev: [4, 11], d: 1400, why: "求人は two letters of reference(推薦状2通)を求めているが,メールで触れているのは a letter of reference(1通)だけ.数の食い違いに気づく問題.履歴書は添付してある." }
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
      { id: "r33q1", q: "What time does the gym open on Saturday?", c: ["6:00 A.M.", "7:00 A.M.", "8:00 A.M.", "9:00 A.M."], a: 2, ev: [[0, 1]], d: 300, why: "Saturday の行の Gym の列は 8:00 A.M.–8:00 P.M.9:00 は Pool の列なので,列を間違えないこと." },
      { id: "r33q2", q: "When is the pool NOT available?", c: ["On Monday", "On Friday", "On Saturday", "On Sunday"], a: 3, ev: [[0, 2], 1], d: 300, why: "Sunday の行の Pool は Closed.本文にも closed on Sundays とある." },
      { id: "r33q3", q: "What can members do on Saturdays?", c: ["Bring a visitor at no cost", "Rent towels for free", "Use the pool until 9:00 P.M.", "Take a swimming lesson"], a: 0, ev: [2], d: 500, why: "Members may bring one guest for free on Saturdays.guest = visitor,for free = at no cost.タオルは2ドルかかる." }
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
      { id: "r34q1", q: "What did the city council decide to do?", c: ["Build a new parking garage", "Turn parking areas into a public space", "Close several restaurants", "Raise parking fees downtown"], a: 1, ev: [0], d: 1000, why: "convert two downtown parking lots into a public plaza.convert A into B(A を B に作り変える)= turn A into B,plaza = public space." },
      { id: "r34q2", q: "What is suggested about the Elm Street garage?", c: ["It will be torn down in June.", "It is owned by restaurant owners.", "It charges high fees.", "It usually has many empty spaces."], a: 3, ev: [3], d: 1300, why: "which is rarely more than half full(半分以上埋まることはめったにない)= たいてい空きが多い.rarely(めったに〜ない)という否定の語に注意して読み替える." },
      { id: "r34q3", q: "What is true about the start of construction?", c: ["It depends on funding from the state.", "It has been postponed until next year.", "It was opposed by all council members.", "It will cost the state $2.4 million."], a: 0, ev: [5, 6], d: 1500, why: "provided that the state approves a grant(州が補助金を承認するという条件で).provided that 〜 = 〜という条件で,なので工事の開始は州の資金次第.240万ドルは費用の全体で,州が出すのはその3分の1." }
    ]
  }
];
