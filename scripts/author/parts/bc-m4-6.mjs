import { bars, def, example, flow, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 4 */
export const M4 = module_({
  slug: "email-and-messages", title: "Email and online communication", hours: 2, level: "Core skills",
  summary: "Set up and use email, write messages that get answered, share files safely, and behave well online.",
  outcome: "You can send a clear, polite email with an attachment, manage your inbox, and communicate respectfully on any platform.",
  intro: "Email is still the main way schools, employers and offices contact you, and your email address is also the key to most of your online accounts. A clear message gets a quick reply. This module teaches the structure of a good email, the safe way to share files, and the manners that make online communication work.",
  topics: [
    topic({
      title: "Anatomy of an email", slug: "anatomy-of-an-email",
      blocks: [
        p("An email has a few standard parts. Knowing what each is for prevents the two commonest mistakes: sending to the wrong people and being ignored."),
        table("The parts of an email", ["Part", "What it is for", "Note"], [["To", "The people who must act or reply", "Check the spelling of every address"], ["Cc", "People who should know, but need not reply", "Everyone sees who is in Cc"], ["Bcc", "People copied privately", "Others cannot see Bcc addresses: use it for large lists"], ["Subject", "A short, specific summary", "The subject decides whether it is opened"], ["Body", "Your message", "Short paragraphs, one request"], ["Attachment", "A file sent with the message", "Check it is the right file and not too large"]]),
        example("A clear email", "You want an extra day for a project.", ["Subject: Request for one extra day for the science project.", "Greeting: Dear Mr Rao,", "Reason in one or two sentences, then exactly what you are asking for.", "Thank you, and your full name with your class."], "Subject, greeting, reason, request, thanks and a sign-off: six pieces make a message people can answer in one line."),
        list("Habits of people whose emails get answered", ["One topic and one clear request per email.", "A **specific subject line**, not Hello or Urgent.", "**Short paragraphs** and plain words.", "A polite greeting and closing.", "Read it aloud once before you send it."]),
        warn("**Reply all** sends your reply to everyone on the original message. Check who is in the list before you press it. Use plain Reply unless everyone really needs your answer."),
        mistakes(["Writing in capital letters, which looks like shouting.", "Sending an attachment you forgot to attach: mention the attachment in the body and check before sending.", "Putting every recipient in To or Cc when addresses should be private: use Bcc."]),
      ],
      points: ["To is who must act, Cc is who should know, Bcc is hidden.", "A specific subject and a clear request get answers.", "Check recipients before Reply all."],
      check: [["Which field hides the other recipients' addresses?", ["To", "Cc", "Bcc", "Subject"], 2, "Bcc recipients are not shown to others."], ["Which subject line is best?", ["Hello", "Urgent!!!", "Request for one extra day for the science project", "Question"], 2, "A specific subject says what the email is about."]],
    }),
    topic({
      title: "Attachments, links and your inbox", slug: "attachments-and-inbox",
      blocks: [
        p("Sending a file is simple, but there are choices that make it safe and easy for the person receiving it."),
        table("Attach or link?", ["Choose", "When", "Why"], [["Attach the file", "It is small (a few MB) and the person only needs to read it", "They have it straight away"], ["Share a link to a cloud file", "It is large, or several people will work on it", "One shared copy; you control who can open it"], ["Use a compressed (zip) file", "You are sending many files together", "They arrive as one"], ["Send a PDF", "You want it to look the same everywhere", "A PDF cannot be edited by accident"]]),
        list("Keep your inbox under control", ["**Read, reply, file or delete** each message; do not just let them pile up.", "Use **folders or labels** such as School and Bills.", "**Star** messages that need action.", "**Unsubscribe** from newsletters you no longer read.", "Check the **spam** folder now and then for real messages that landed there."]),
        warn("Never open an attachment you did not expect, even from someone you know, without checking with them first: their account may have been taken over. Be most careful with files ending in .exe, .zip or .scr, and with documents that ask you to 'enable content'."),
        example("Send a project safely", "You must send a 12 MB report and a 25 MB video to a teacher.", ["The report is small enough to attach, but turn it into a PDF first.", "The video is too large for most email; upload it to a cloud drive and send a link.", "Set the link so that only the teacher can open it."], "Attach what is small, link what is large."),
        tip("Mention an attachment in the body (*I have attached my report as a PDF*) and re-read before you press Send."),
      ],
      points: ["Attach small files; link large ones.", "Use folders and unsubscribe to keep the inbox manageable.", "Never open unexpected attachments."],
      check: [["A 25 MB video is best sent by:", ["Attaching it", "Uploading it and sending a link", "Printing it", "Splitting it into letters"], 1, "Large files are shared as links."], ["A friend's account sends you an unexpected zip file. You should:", ["Open it quickly", "Check with your friend another way first", "Forward it to everyone", "Delete the antivirus"], 1, "Their account may have been taken over."]],
    }),
    topic({
      title: "Online manners and messaging", slug: "online-manners",
      blocks: [
        p("Online messages lack the tone of voice and the face that make speaking friendly. A message that seems fine to you can read as cold or rude to someone else. A few habits help."),
        table("Say it better online", ["Instead of", "Try"], [["WHY DIDN'T YOU REPLY", "Hi, I wanted to check whether you had seen my last message."], ["Fine.", "That works for me, thank you."], ["No.", "I am not able to do that, but I could do this instead."]]),
        list("Good habits in chats and groups", ["**Reread** before you send, especially when you are angry.", "**Never forward** a message that was sent privately.", "**Ask permission** before sharing someone's photo.", "**Do not reply to rude or unknown messages**; block and report them.", "**Keep group chats on topic** and avoid late-night messages to teachers."]),
        warn("What you post can last. Messages and photos can be copied and shared by others even if you delete them. Pause before you post anything you would not want a future employer, teacher or relative to see."),
        example("Respond to an unkind message", "A classmate posts a rude comment about you in a group chat.", ["Do not reply in anger.", "Take a screenshot.", "Tell a trusted adult and use the report or block options.", "If it continues, tell your teacher or a parent."], "You do not have to put up with bullying, and keeping evidence helps people to act."),
        def("Digital footprint", "The trail of everything you post, like, search and share online. Some of it is visible to others and some is kept by the services you use."),
      ],
      points: ["Reread before sending; tone is easy to misread.", "Block and report rude or unknown messages and tell a trusted adult.", "What you post can last: think before you share."],
      check: [["A message makes you angry. What should you do before replying?", ["Reply at once", "Pause and reread, or wait until you are calmer", "Send it to everyone", "Delete your account"], 1, "A calm reply is better than one you regret."], ["What is a digital footprint?", ["A kind of virus", "The trail of what you post and do online", "A file type", "A website"], 1, "It is the record your activity leaves."]],
    }),
  ],
  terms: [["To, Cc, Bcc", "Who must act, who should know, who is copied privately"], ["Subject line", "A short summary of the email"], ["Attachment", "A file sent with an email"], ["Spam", "Unwanted or junk messages"], ["Reply all", "Reply to everyone on the message"], ["Digital footprint", "The trail you leave online"]],
  practical: { title: "Practical: a real email", intro: "Write and send an email that matters.", steps: ["Choose someone you need to ask for something small.", "Write a specific subject line, a greeting, a short reason, a clear request and a closing.", "Attach one file as a PDF, or share a link to it.", "Read it aloud before sending."] },
  quiz: [
    ["Which field should you use for a large mailing list so addresses stay private?", ["To", "Cc", "Bcc", "Subject"], 2, "Bcc hides the other recipients."],
    ["What makes a good subject line?", ["Hello", "Urgent!!!", "A specific summary of the message", "Nothing"], 2, "A specific subject decides whether it is opened."],
    ["A 30 MB file should be:", ["Attached", "Shared as a link from a cloud drive", "Typed out", "Ignored"], 1, "Large files are shared by link."],
    ["Why check before pressing Reply all?", ["It is rude", "Everyone on the list will see your reply", "It costs more", "It deletes the original"], 1, "Reply all sends to everyone."],
    ["What should you do with an unexpected attachment from a friend?", ["Open it", "Check with them another way first", "Forward it", "Print it"], 1, "Their account may have been compromised."],
    ["Why reread a message when you are angry?", ["To correct spelling only", "To avoid saying something you regret", "To make it longer", "It is not needed"], 1, "Tone is easy to misread and hard to take back."],
    ["What should you do with rude messages from unknown people?", ["Reply angrily", "Block and report, and tell a trusted adult", "Share them", "Delete your phone"], 1, "Do not engage; report and tell someone."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 5 */
export const M5 = module_({
  slug: "safety-and-privacy", title: "Safety and privacy", hours: 2.5, level: "Core skills",
  summary: "Build strong passwords, spot scams and malware, protect your privacy, and keep your files safe with updates and backups.",
  outcome: "You can protect your accounts and money from the commonest online attacks, and recover from a lost device or a mistake.",
  intro: "Almost every online problem people suffer comes from a small set of causes: weak or reused passwords, tricks that get people to hand over their details, and missing updates or backups. None needs technical skill to prevent. This module teaches the habits, and the reasons behind them, so they stick.",
  topics: [
    topic({
      title: "Passwords and two-step verification", slug: "passwords",
      blocks: [
        p("A password is the key to an account. Two things make a password strong: **length** and **being unique** to that one account."),
        table("Strong and weak passwords", ["Password", "Why"], [["riverlamp-planet-bicycle-orange", "Long: four unrelated words are easy for you to remember and very hard to guess"], ["Anaya2010", "Weak: a name and a birth year are easy to guess"], ["Pass@123", "Weak: one of the first things attackers try"], ["The same password on every site", "Risky: one leak opens everything"]]),
        list("What to do", ["Use a **long passphrase** of several unrelated words for important accounts.", "Use a **different password for every account**; a **password manager** remembers them for you.", "Turn on **2-step verification**: after the password the account asks for a second proof, such as a code or a prompt on your phone.", "**Never share** a password, an OTP or a PIN, even with someone who says they work for the bank or the company."]),
        example("Why two steps help", "A scammer steals the password of your email.", ["Without 2-step verification the scammer signs in at once.", "With it, they still need the code on your phone, which they do not have.", "They are stopped, and you receive an alert about the attempt."], "Two-step verification protects you even when the password leaks."),
        warn("A bank, a government office or a company will **never** ask for your OTP, PIN or password by phone, text or email. If someone does, hang up; it is a scam."),
        tip("Write your recovery options (a phone number and a second email) into your account settings now, while you can still sign in."),
      ],
      points: ["Length and uniqueness make a password strong.", "Use a password manager and 2-step verification.", "Never share an OTP, PIN or password with anyone."],
      check: [["Which password is strongest?", ["Anaya2010", "riverlamp-planet-bicycle-orange", "password123", "12345678"], 1, "A long passphrase of unrelated words is the strongest."], ["Who may ask you for your OTP?", ["Your bank on the phone", "A delivery person", "Nobody legitimate", "A teacher"], 2, "No legitimate organisation needs your OTP."]],
    }),
    topic({
      title: "Scams, phishing and malware", slug: "scams-and-malware",
      blocks: [
        p("**Phishing** means a message that pretends to be from a trusted source to get you to click a link, hand over details or pay. **Malware** is harmful software, often installed by a click on the wrong link or file. Both rely on **tricking people**, not on clever hacking."),
        table("Common scams and the tell-tale sign", ["Scam", "What happens", "The sign"], [["Fake bank call or text", "Someone asks for your OTP, PIN or card number", "A real bank never asks"], ["Prize or lottery message", "You must pay a fee to claim a prize", "A real prize does not charge you"], ["Account will close", "A link asks you to sign in right now", "Urgency and a link"], ["QR code to receive money", "You are asked to scan or enter a PIN to receive money", "You never need a PIN to receive money"], ["Fake job offer", "You must pay for training or a laptop first", "A real employer does not charge to hire you"], ["Virus warning pop-up", "A number to call or a program to install", "Real warnings do not tell you to call"]]),
        list("Pause with the STOP rule", ["**S**top: do not act on the first impulse.", "**T**hink: does this ask for money, a code or a login?", "**O**bserve: look at the sender and the link; something is usually slightly off.", "**P**rove it: contact the organisation using a number or site you already trust."]),
        example("A text about your parcel", "A text says your parcel could not be delivered and you must pay 25 rupees at a link.", ["Stop: nothing is that urgent.", "Think: it asks for a payment through a link.", "Observe: you were not expecting a parcel, and the link is odd.", "Prove: ignore the text; check the courier's real app or site if you are expecting something."], "Real couriers do not ask for card details through a random link."),
        warn("If you have clicked or paid by mistake, act fast: tell a trusted adult, change the password, call your bank on the number printed on your card, and report it. Do not feel embarrassed; many careful people are caught."),
      ],
      points: ["Scams trick people; they rarely need clever hacking.", "Urgency, a link and a request for money or codes are the warning signs.", "Pause, then check through a number or site you already trust."],
      check: [["Someone asks you to enter a PIN to receive money. This is:", ["Normal", "A scam sign", "Required by banks", "A bank offer"], 1, "You never need a PIN to receive money."], ["What is the best response to an urgent message with a sign-in link?", ["Click quickly", "Pause and check through a trusted route", "Forward it", "Reply with details"], 1, "Urgency is the scammer's tool."]],
    }),
    topic({
      title: "Privacy, updates and backups", slug: "privacy-updates-backups",
      blocks: [
        p("Three more habits finish the job: control what you share, keep software current, and keep a second copy of what matters."),
        table("Habits and why they matter", ["Habit", "Why"], [["Check privacy settings on social media and apps", "Decide who sees your posts, photos and location"], ["Share the minimum", "Do not post your address, phone number, school timetable or travel plans"], ["Install updates", "Updates fix security holes that attackers use"], ["Only install apps from the official store", "Others may carry malware"], ["Back up what matters", "A lost, stolen or broken device does not lose your work"]]),
        flow("The 3-2-1 backup rule", ["Keep 3 copies of important files", "On 2 different kinds of storage", "With 1 copy somewhere else, such as the cloud"]),
        list("App permissions: ask why", ["Does a torch app really need your contacts?", "Does a game need your microphone?", "Allow location **only while using** the app if it needs it at all.", "Review permissions now and then and remove what you no longer use."]),
        example("Check one account", "Do a ten-minute privacy check.", ["Open the privacy settings of your most used app.", "Set posts to friends only and check who can see your photos.", "Turn off location sharing you do not need.", "Check which devices and apps are logged in and remove the ones you do not know."], "A small regular check beats a big clean-up after a problem."),
        warn("A backup you have never tested may not work. Once, open a backed-up file on another device to check it."),
      ],
      points: ["Share the minimum and check privacy settings.", "Updates fix security holes.", "Keep three copies, on two kinds of storage, with one somewhere else."],
      check: [["What does the 3-2-1 rule say?", ["3 passwords, 2 phones, 1 laptop", "3 copies, on 2 kinds of storage, 1 somewhere else", "3 apps, 2 folders, 1 file", "3 emails a day"], 1, "It protects against any single loss."], ["Why install updates?", ["To change the colour", "They fix security holes", "To use more storage", "To delete files"], 1, "Attackers use known holes that updates close."]],
    }),
  ],
  terms: [["Passphrase", "A long password of several unrelated words"], ["2-step verification", "A second proof when signing in"], ["Phishing", "A fake message that tries to steal details"], ["Malware", "Harmful software"], ["Backup", "A second copy of your files"], ["Permission", "What an app is allowed to access"]],
  practical: { title: "Practical: a security check-up", intro: "Check your own digital safety.", steps: ["Turn on 2-step verification for your main email account.", "Change the password of one account that shared a password with another.", "Check the permissions of three apps and remove one you do not need.", "Copy your most important files to a second place and open one to test it."] },
  quiz: [
    ["Which makes the strongest password?", ["A birth date", "A long phrase of unrelated words", "password1", "The same as your email"], 1, "Length and uniqueness matter most."],
    ["What does 2-step verification do?", ["Makes login faster", "Needs a second proof as well as the password", "Deletes old passwords", "Locks the phone"], 1, "It protects you if the password leaks."],
    ["A message says your account will close in an hour unless you click. This is:", ["Normal", "A phishing sign", "A bank service", "A prize"], 1, "Urgency plus a link is a classic trick."],
    ["Who may ask for your OTP?", ["Your bank", "A delivery person", "Nobody legitimate", "Your teacher"], 2, "No legitimate organisation asks for it."],
    ["Why install updates?", ["To use more space", "They fix security holes", "To change themes", "To log out"], 1, "Updates close the holes attackers use."],
    ["The 3-2-1 backup rule means:", ["3 copies, 2 kinds of storage, 1 off-site", "3 folders, 2 files", "1 copy only", "3 weekly backups"], 0, "It protects against any one failure."],
    ["Why review app permissions?", ["To make the app faster", "To stop apps accessing more than they need", "To save battery only", "To change language"], 1, "Apps should only have the access they need."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 6 */
export const M6 = module_({
  slug: "everyday-digital-skills", title: "Everyday digital skills", hours: 1.5, level: "Applied skills",
  summary: "Use online services, pay safely, fill in forms, fix common problems, and know where to find help.",
  outcome: "You can handle the online tasks of daily life, from booking and banking to troubleshooting, without fear and without taking risks.",
  intro: "Today, applying for a place, paying a fee, booking a ticket or finding a government service often happens online. The skills are the ones you already have: reading carefully, checking before you act and keeping your details safe. This module puts them together, and ends with a simple method for fixing common problems.",
  topics: [
    topic({
      title: "Using online services safely", slug: "online-services",
      blocks: [
        p("Online services (a school portal, a bank app, a government service, a shop) all ask for details and often for money. A short routine keeps you safe."),
        flow("Before you give any details", ["Is this the real site or app?", "Is the connection secure (https)?", "Do they need this detail?", "Is there a safer way to pay or sign in?"]),
        table("Paying safely online", ["Do", "Do not"], [["Use the official app or type the address yourself", "Click a payment link from an unexpected message"], ["Check the amount and the name of who you are paying", "Approve a request you did not start"], ["Use a payment method with a limit, or a virtual card, if available", "Save card details on every site"], ["Keep the receipt or confirmation", "Pay an unknown person to claim a prize or a job"]]),
        example("Pay a school fee", "The school sends a link to pay the fee.", ["Check that the message comes from the school's usual number or email.", "Better still, open the school's website from a bookmark and find the payment page there.", "Check the amount and the school's name before you approve.", "Keep the receipt."], "Going to the site yourself is safer than clicking a link."),
        warn("When you receive a payment request through UPI or another app that you did not start, decline it. You never have to approve a request in order to **receive** money."),
        list("Forms and personal details", ["Fill in only what is needed; ask why if a form wants more.", "Use your real name where an official service requires it, and keep nicknames for social media.", "Check what you typed before you submit.", "Never send photos of cards, ID documents or OTPs in a chat."]),
      ],
      points: ["Check the site, the connection and why a detail is needed.", "Go to the official site yourself rather than clicking a link.", "You never approve a request to receive money."],
      check: [["You get a link to pay a fee. The safest route is:", ["Click it", "Open the official site yourself and pay there", "Reply with your card number", "Ignore the fee"], 1, "Going to the site yourself avoids fake links."], ["A payment request you did not start appears in your app. You should:", ["Approve it", "Decline it", "Ignore the phone", "Call the sender back"], 1, "You never approve a request to receive money."]],
    }),
    topic({
      title: "Fixing common problems", slug: "fixing-problems",
      blocks: [
        p("Most problems are small and fixed by one of a few steps. Good troubleshooters follow a simple order and change one thing at a time."),
        flow("A troubleshooting routine", ["What exactly is wrong? Write it down", "Try the cheapest step first (restart)", "Change one thing and test", "Search the exact message, or ask for help"]),
        table("Problem and first step", ["Problem", "First step"], [["A program is frozen", "Close and reopen it; if not, restart the device"], ["A page will not load", "Check the connection with another site; restart the router"], ["Storage is full", "Delete what you do not need or move photos to the cloud"], ["The device is slow", "Close apps, restart, check free storage and updates"], ["A battery drains quickly", "Check which apps use it; lower screen brightness; update"], ["You cannot sign in", "Check caps lock and the address; use Forgot password"]]),
        example("The device that will not charge", "A phone does not charge.", ["Check the cable and the plug with another device.", "Clean the charging port gently.", "Restart the phone and try another charger.", "If it still fails, a repair may be needed; ask someone you trust."], "Change one thing at a time, so you know what fixed it."),
        warn("Do not call a phone number from a pop-up or an advert for 'support'. Genuine help comes from the maker's official website or app, or a shop you know."),
        tip("Take a screenshot of an error message, or write it down exactly. The wording is what lets a helper, or a search, find the cause."),
      ],
      points: ["Restart first, change one thing at a time.", "Write down the exact error message.", "Use official support, never a number from a pop-up."],
      check: [["What should you try first for a frozen program?", ["Buy a new device", "Close and reopen it, or restart", "Delete all files", "Call a number from a pop-up"], 1, "Restarting fixes most freezes."], ["Why change only one thing at a time?", ["It is faster", "You can tell what fixed the problem", "It saves power", "It is the rule"], 1, "Otherwise you cannot tell which step worked."]],
    }),
    topic({
      title: "Learning to keep learning", slug: "keep-learning",
      blocks: [
        p("Technology changes. Nobody can learn every tool, but anybody can learn **how to learn** one when they need it."),
        list("A method for learning a new app", ["**Decide what you want to do**, such as make a poster or track expenses.", "**Look for a short beginner guide** from the maker or a trusted site.", "**Try it on something small and real**, not just watching.", "**Learn three shortcuts or features** that save the most time.", "**Keep notes** of steps you will forget."], true),
        table("Where to get reliable help", ["Source", "Good for"], [["The app's Help menu or the maker's website", "Official, accurate steps"], ["A teacher or a confident friend", "Personal guidance"], ["Short video tutorials from known channels", "Seeing the steps"], ["Library or community digital classes", "Learning with others"]]),
        bars("How people say they learn new tools best (an illustrative guide)", [["Trying it on a real task", 70], ["Following a short guide", 20], ["Watching only", 10]]),
        example("Learn to make a simple poster", "You need a poster for a school event.", ["Choose a free design tool the school recommends.", "Open a beginner guide and follow the first steps.", "Make your poster with the event name, the date and a picture.", "Ask a friend to check it and note what you learned for next time."], "Doing it for a real reason makes it stick."),
        tip("Do not be afraid to click around. Most actions can be undone with Ctrl+Z, and nothing you do on a practice file can break the computer."),
      ],
      points: ["Learn a new app by using it on a real task.", "Use official guides and trusted sources.", "Keep notes of what you learn."],
      check: [["What is the best way to learn a new app?", ["Watch only", "Use it on a small real task with a short guide", "Memorise the menus", "Avoid it"], 1, "Doing is how learning sticks."], ["Where is a good first place to find help?", ["A pop-up", "The app's Help menu or the maker's website", "A stranger's message", "An advert"], 1, "Official help is accurate and safe."]],
    }),
  ],
  terms: [["Official site", "The real website of an organisation"], ["Receipt", "Proof of a payment"], ["Troubleshooting", "Finding and fixing a problem step by step"], ["Screenshot", "A picture of what is on the screen"], ["Help menu", "Built-in guidance in an app"], ["Cloud storage", "Files kept on other people's computers"]],
  practical: { title: "Practical: solve a real problem", intro: "Use the routine on a real problem you have.", steps: ["Choose a small digital problem you have, such as a full phone or a slow laptop.", "Write down exactly what is wrong and what you tried.", "Follow the routine, changing one thing at a time.", "Write down what worked so you remember it."] },
  quiz: [
    ["What is the safest way to pay a fee when you get a payment link in a message?", ["Click the link", "Open the official site yourself", "Send your card number", "Ignore the message"], 1, "Go to the official site yourself."],
    ["You never need to do which of these to receive money?", ["Share your account number", "Enter your PIN or approve a request", "Tell the person your name", "Check the amount"], 1, "Receiving money never needs a PIN."],
    ["What is the best first step for most problems?", ["Buy a new device", "Restart", "Delete files", "Call a number from a pop-up"], 1, "Restarting is cheap and fixes many problems."],
    ["Why change only one thing at a time when troubleshooting?", ["It is quicker", "You can tell what fixed it", "It uses less battery", "It is a rule"], 1, "Otherwise you cannot tell which step worked."],
    ["A pop-up gives a support number to call. What should you do?", ["Call it", "Ignore it and use official support", "Share it", "Install what it offers"], 1, "Genuine support comes from official sources."],
    ["How should you learn a new app?", ["Memorise every menu", "Try it on a small real task with a short guide", "Never click", "Watch without trying"], 1, "Doing is the best way to learn."],
    ["Why write down an exact error message?", ["To keep a diary", "The wording helps find the cause", "It prints better", "It is required"], 1, "The exact words let you or a helper find the answer."],
  ],
});
