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
      { id: "r35q1", q: "Why will Mr. Ford be late?", c: ["He missed his train.", "His train has been delayed.", "He went to the wrong place.", "He is picking up boxes."], a: 1, ev: [2], d: 300, why: "My train is stopped because of a signal problem.電車が止まっている = 遅れている.乗り遅れた(missed)わけではない." },
      { id: "r35q2", q: "At 9:16 A.M., what does Ms. Tanaka mean when she writes, \"No problem\"?", c: ["She can set up the booth by herself.", "She has already called the printer.", "The event has been postponed.", "Mr. Ford will arrive before visitors come in."], a: 3, ev: [2, 3], d: 700, why: "フォードさんは約40分遅れ(9:55ごろ着).来場者が入るのは10時からなので,それより前に着く.だから「問題ない」.発言の意図は,前後の発言とつないで考える." },
      { id: "r35q3", q: "What problem does Ms. Tanaka mention?", c: ["Some materials have not been delivered.", "The booth is too small.", "The brochures contain errors.", "The doors opened late."], a: 0, ev: [5], d: 500, why: "we only got half of the boxes.パンフレットの箱が半分しか届いていない = 一部の資料が届いていない." }
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
      { id: "r36q1", q: "What is the purpose of the notice?", c: ["To announce a new elevator", "To inform tenants of a temporary service interruption", "To ask tenants to move out", "To introduce a new delivery company"], a: 1, ev: [1], d: 500, why: "エレベーターが点検のため一時的に止まることを知らせている.out of service(運転停止)= service interruption." },
      { id: "r36q2", q: "What is indicated about Elevator C?", c: ["It will be inspected first.", "It is used only by managers.", "It is out of order.", "It can be used on October 4."], a: 3, ev: [2], d: 400, why: "will remain in operation during this time.点検の日も動いているので使える." },
      { id: "r36q3", q: "What are tenants asked to do?", c: ["Let suppliers know about the situation", "Use the stairs only", "Leave the building by 5:00 P.M.", "Report any problems with the elevators"], a: 0, ev: [3], d: 700, why: "are advised to inform their suppliers in advance.inform = let 〜 know.be advised to do は「〜するよう勧められる」= 依頼の言い方." }
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
      { id: "r37q1", q: "What kind of business is Swift Wash?", c: ["A clothing store", "A laundry service", "A delivery company", "A dressmaker"], a: 1, ev: [0, 2], d: 300, why: "laundry(洗濯物)を回収して洗う.洗濯のサービス." },
      { id: "r37q2", q: "How much would a customer pay for 3 kilograms of clothes?", c: ["$2", "$10", "$6", "$13"], a: 1, ev: [3], d: 900, why: "3キロ × 2ドル = 6ドルだが,最低料金(minimum charge)が10ドルなので10ドル.計算した後に条件を確かめる." },
      { id: "r37q3", q: "How can new customers get a free service?", c: ["By registering with an app", "By living in the Eastside area", "By ordering dry cleaning", "By leaving a bag before 9:00 A.M."], a: 0, ev: [5], d: 600, why: "when they sign up through our mobile app.sign up = register.アプリで申し込むと最初の1袋が無料." }
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
      { id: "r38q1", q: "What is the main purpose of the e-mail?", c: ["To announce a new manager", "To report results and explain the next goal", "To introduce new clients to the team", "To cancel a meeting"], a: 1, ev: [1, 3], d: 600, why: "前半で第2四半期の結果(目標を上回った),後半で第3四半期の目標と対策を伝えている." },
      { id: "r38q2", q: "According to the e-mail, why did the team do well?", c: ["Prices were lowered.", "The team grew larger.", "The market for the product expanded.", "Two members gained new business clients."], a: 3, ev: [2], d: 800, why: "due to the new corporate accounts that Tom and Aisha brought in.corporate account(法人の取引先)= business client.人員増はこれからのことで,原因ではない." },
      { id: "r38q3", q: "What are team members asked to do by Friday?", c: ["Interview job candidates", "Prepare for a client visit", "Report their sales figures", "Submit names of possible customers"], a: 3, ev: [5], d: 700, why: "send me a list of three potential clients by Friday.potential client(見込み客)= possible customer.面接は会社が来週始めるもの." }
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
      { id: "r39q1", q: "How much would a 60-minute ride cost?", c: ["Nothing", "$2", "$1", "$4"], a: 1, ev: [3], d: 1000, why: "最初の30分は無料.残り30分は15分ごとに1ドルなので2ドル.60分すべてに料金がかかるわけではない." },
      { id: "r39q2", q: "What is suggested about the number of registrations?", c: ["It was lower than expected.", "It was higher than the city predicted.", "It included only downtown workers.", "It will be limited to 2,000."], a: 1, ev: [5], d: 900, why: "far more than the city had anticipated(市の予想をはるかに上回った).anticipate = predict." },
      { id: "r39q3", q: "What will the city most likely do next?", c: ["Raise the fees", "Remove some bicycles", "Close downtown stations", "Expand the program to more areas"], a: 3, ev: [6], d: 700, why: "plans to add 15 stations in residential neighborhoods.住宅地に駐輪場を加える = 対象地域を広げる." }
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
      { id: "r40q1", q: "What is one responsibility of the position?", c: ["Writing children's books", "Designing book covers", "Selling books to stores", "Reviewing texts for mistakes"], a: 3, ev: [1], d: 600, why: "checking manuscripts for errors.manuscript(原稿)= text,error = mistake." },
      { id: "r40q2", q: "What is NOT a requirement for the job?", c: ["Writing ability", "Experience in publishing", "Careful attention to detail", "Availability for 20 hours a week"], a: 1, ev: [3, 4, 2], d: 800, why: "Previous experience in publishing is helpful but not essential.経験は必須ではない.文章力・細部への注意・週20時間は求められている." },
      { id: "r40q3", q: "What is mentioned about the position?", c: ["It could become a full-time job.", "It is located overseas.", "It starts on May 30.", "It requires working on weekends."], a: 0, ev: [5], d: 700, why: "may lead to a full-time role after six months.full-time role = full-time job.5月30日は応募の締め切り." }
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
      { id: "r41q1", q: "Why did Mr. Wu go to the restaurant?", c: ["To meet a client", "To celebrate with coworkers", "To write a review for a magazine", "To attend a cooking event"], a: 1, ev: [0], d: 500, why: "with three colleagues to celebrate a project's completion.colleague = coworker." },
      { id: "r41q2", q: "What did Mr. Wu complain about?", c: ["The price of the food", "The taste of the fish", "The attitude of the manager", "The length of time he waited"], a: 3, ev: [3], d: 500, why: "7時の予約で7時40分まで席に着けなかった = 待ち時間の長さ.給仕係も支配人も対応は良かったと書いている." },
      { id: "r41q3", q: "What does Mr. Wu suggest about the restaurant?", c: ["It should hire more staff.", "It is too expensive.", "It will close on weekends.", "It has a limited menu."], a: 0, ev: [4, 6], d: 1200, why: "給仕係が「受け持つテーブルが多すぎる」ように見えた → 人手が足りない.はっきり書いていないことを推測させる問題.メニューの種類や値段については書かれていない." }
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
      { id: "r42q1", q: "Which plan does not require a contract?", c: ["Lite", "Standard", "Premium", "All of them"], a: 0, ev: [[0, 0]], d: 300, why: "表の Contract の列で None(なし)になっているのは Lite." },
      { id: "r42q2", q: "How much would a Lite customer pay each month including a router?", c: ["$25", "$30", "$40", "$45"], a: 1, ev: [[0, 0], 3], d: 800, why: "Lite は月25ドル.ルーターは契約のないプランでは無料にならず,月5ドルで借りる.25 + 5 = 30ドル." },
      { id: "r42q3", q: "What is true about all three plans?", c: ["They come with a free router.", "They have the same speed.", "They can be canceled without a fee.", "They do not charge for setup."], a: 3, ev: [1], d: 700, why: "All plans include ... free installation.installation(設置)= setup.無料ルーターは契約のあるプランだけ." }
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
      { id: "r43q1", q: "How many people visited Bayfield in the fall?", c: ["15,000", "60,000", "45,000", "120,000"], a: 1, ev: [[1, 2]], d: 400, why: "グラフの Fall は 60.単位は thousands(千人)なので60,000人." },
      { id: "r43q2", q: "According to the report, what caused the increase in fall visitors?", c: ["Lower hotel prices", "A new event", "Better weather", "A new museum"], a: 1, ev: [3], d: 900, why: "attributes to a new food and wine festival.attribute A to B は「A を B のおかげ・せいだと考える」.festival = event." },
      { id: "r43q3", q: "What does the tourism board plan to do?", c: ["Hold a festival in winter", "Build new hotels", "Advertise activities that can be enjoyed indoors", "Close the beaches in winter"], a: 2, ev: [5], d: 1000, why: "will promote indoor attractions ... in a winter advertising campaign.冬の祭りを開くとは書いていない(祭りは10月の話)." }
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
      { id: "r44q1", q: "Why did Ms. Park contact Dr. Osei?", c: ["To ask him to give a talk", "To invite him to join the association", "To request a copy of his research", "To arrange a workshop in Toronto"], a: 0, ev: [2], d: 500, why: "invite you to give the opening speech.give a speech = give a talk." },
      { id: "r44q2", q: "What is NOT offered to Dr. Osei?", c: ["Payment for speaking", "Hotel accommodation", "Travel expenses", "A conference membership"], a: 3, ev: [4], d: 900, why: "交通費(travel),2泊の宿泊(accommodation),講演料(speaker's fee)は書かれている.会員資格はどこにもない." },
      { id: "r44q3", q: "What does Dr. Osei suggest?", c: ["Moving the conference to Toronto", "Changing the theme of the conference", "Having another researcher speak", "Reducing the speaker's fee"], a: 2, ev: [11], d: 1100, why: "Alternatively(あるいは),同僚のリー博士を講演者として推している = 別の研究者に話してもらう.もう1つの提案(19日の午前)は選択肢にない." }
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
      { id: "r45q1", q: "Where should employees put an empty juice bottle?", c: ["In the blue bin", "In the green bin", "In the black bin", "In a shredding box"], a: 1, ev: [1, 2], d: 400, why: "green for bottles and cans.ゆすいでから緑の箱へ." },
      { id: "r45q2", q: "What should be done with confidential papers?", c: ["They should be recycled in the blue bins.", "They should be returned to their owners.", "They should be placed in secure boxes.", "They should be taken home."], a: 2, ev: [3], d: 800, why: "locked shredding boxes(鍵付きの裁断用ボックス)に入れる.locked = secure.紙でも機密書類は青い箱ではない." },
      { id: "r45q3", q: "What is the goal of the program?", c: ["To reduce landfill waste by 50 percent", "To save eight tons of paper", "To hire a new cleaning company", "To lower the cost of printing"], a: 0, ev: [5], d: 900, why: "8トンを埋め立て地に送った → cut that amount in half(半分に減らす)= 50% 減らす.8トンを節約するのではない." }
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
      { id: "r46q1", q: "Why is registration necessary?", c: ["Classes have a fee.", "The number of participants is limited.", "Laptops must be reserved.", "Classes are held online."], a: 1, ev: [1], d: 500, why: "registration is required because each class is limited to 12 people.人数に限りがあるから.無料なので費用のためではない." },
      { id: "r46q2", q: "Which class matches Mr. Adams's interest?", c: ["E-mail basics", "Making spreadsheets", "Online safety", "Building a Web site"], a: 0, ev: [5, [0, 0]], d: 600, why: "家族にメッセージを送る方法を学びたい → E-mail basics(メールの基本)." },
      { id: "r46q3", q: "What problem will Mr. Adams most likely have with that class?", c: ["It is too advanced for him.", "It is full.", "He has to bring his own computer.", "It is scheduled when he is busy."], a: 3, ev: [[0, 0], 6], d: 1300, why: "メールの基本は月曜の午前10時.アダムズさんは平日の午前はボランティアで空いていない.表とメールの都合を合わせると,時間が合わないと分かる." }
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
      { id: "r47q1", q: "What does Farmlink do?", c: ["It runs several restaurants.", "It operates farms in three states.", "It helps restaurants buy produce from farms.", "It trains chefs to cook vegetables."], a: 2, ev: [0, 1], d: 700, why: "connects small farms directly with restaurants / an online marketplace where restaurants can order produce.農家とレストランを結ぶ仲介.自分で農場やレストランを運営しているのではない." },
      { id: "r47q2", q: "Why did Ms. Silva start the company?", c: ["She wanted to leave the restaurant business.", "She had difficulty getting good ingredients.", "She was asked by investors.", "She owned a large farm."], a: 1, ev: [2], d: 900, why: "struggling to find fresh, reasonably priced vegetables(新鮮で手ごろな野菜を探すのに苦労した)= 良い材料を手に入れるのが難しかった." },
      { id: "r47q3", q: "What concern do some analysts have?", c: ["That the company is growing too slowly", "That restaurants will stop using the service", "That rising expenses may affect profits", "That the warehouses will be too small"], a: 2, ev: [5], d: 1300, why: "question whether the company can remain profitable ... noting that delivery costs have risen sharply.費用の上昇が利益に響くかもしれない,という懸念.growing too slowly は逆(expanding so quickly)." }
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
      { id: "r48q1", q: "Why did the hotel write to Ms. Martin?", c: ["To confirm a payment", "To inform her about a facility closure", "To offer her a job", "To ask her to write a review"], a: 1, ev: [2], d: 500, why: "our swimming pool will be closed for repairs.施設(プール)の閉鎖を知らせるメール." },
      { id: "r48q2", q: "What has the hotel done for Ms. Martin?", c: ["Given her a better room", "Refunded her deposit", "Changed her dates", "Reserved a table at a restaurant"], a: 0, ev: [3], d: 600, why: "upgraded your reservation ... to a suite with an ocean view.より良い部屋に替えた.日程の変更は「希望すれば」の話." },
      { id: "r48q3", q: "What is indicated about the Brightwater Resort?", c: ["It is next to the hotel.", "It charges for pool use.", "It can be reached by a free bus.", "It is closed in June."], a: 2, ev: [4, 5], d: 1100, why: "A complimentary shuttle leaves ... every hour.complimentary(無料の)= free,shuttle = bus.リゾートは車で10分で,隣ではない." }
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
      { id: "r49q1", q: "How were the ratings determined?", c: ["By a consumer magazine", "By the manufacturers", "By employees who used the chairs", "By the purchasing manager alone"], a: 2, ev: [2], d: 600, why: "the average score given by our employees who tested each chair.社員が試してつけた点数." },
      { id: "r49q2", q: "Which chair has the longest warranty?", c: ["Basic 10", "Comfort Plus", "ErgoMax", "Studio"], a: 2, ev: [[1, 2]], d: 400, why: "Warranty の列で最も長いのは ErgoMax の5年." },
      { id: "r49q3", q: "How much will the recommended order cost in total?", c: ["$7,200", "$10,400", "$12,000", "$19,200"], a: 2, ev: [3, 4, [1, 1]], d: 1400, why: "条件は「1脚160ドル以下」と「肘掛けの調節あり」.両方を満たすのは Comfort Plus(150ドル)だけ.150 × 80 = 12,000ドル.条件で絞ってから計算する." }
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
      { id: "r50q1", q: "What will the expansion allow the port to do?", c: ["Build electric ships", "Handle more ships at once", "Move to a new location", "Reduce its number of employees"], a: 1, ev: [1], d: 900, why: "double the number of container ships the port can handle at one time.一度に扱える船の数が2倍 = より多くの船を同時に扱える." },
      { id: "r50q2", q: "Why are some Harborview residents worried?", c: ["They expect more trucks near their homes.", "They will lose their jobs.", "Their homes will be torn down.", "Ship traffic will block their views."], a: 0, ev: [4], d: 1000, why: "increased truck traffic will worsen congestion and air quality in their neighborhood.近所でトラックが増えることを心配している." },
      { id: "r50q3", q: "What problem do critics point out?", c: ["The electric equipment is too expensive.", "The port expansion will take longer than four years.", "The new road may not be ready when it is needed.", "The road will pass through residential streets."], a: 2, ev: [5, 7], d: 1600, why: "専用道路はまだ予算がなく,港の拡張部分の開業から2年後まで完成しないかもしれない.トラックが増える時点で道路が間に合わない,ということ.「住宅街を通る」は逆で,道路は住宅街を避けるためのもの." }
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
  }
];
