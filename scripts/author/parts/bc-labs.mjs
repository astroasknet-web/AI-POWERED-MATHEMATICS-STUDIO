import { ck, classifyLab, S, sheetLab, W, wordLab } from "../kit.mjs";

export const SK = "digital-basics";

/** Every lab runs in GrowQR's own practice tools. Each model answer is replayed by the course tests, so a lab can always be finished. */
export const labs = [
  /* ------------------------------------------------------------------ module 1: meet the computer */
  classifyLab({
    id: "c1-parts", module: "meet-the-computer", title: "Input, output, storage or processing?", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Sort common parts of a computer by the job they do.",
    scenario: "Every computer follows the same cycle: you put something in, it works on it, it keeps it, and it shows you the result. Each part does one of those jobs.",
    steps: ["Read each part.", "Choose Input, Processing, Storage or Output.", "Press Check my work."],
    categories: [["input", "Input (sends information in)"], ["processing", "Processing and memory (does the work)"], ["storage", "Storage (keeps files)"], ["output", "Output (shows or plays the result)"]],
    items: [
      ["Keyboard", "input", "You type on it, so it sends information into the computer."],
      ["Microphone", "input", "It sends your voice in."],
      ["Monitor (screen)", "output", "It shows you the result."],
      ["Speakers", "output", "They play sound out."],
      ["CPU (the processor)", "processing", "The CPU does the calculations and follows instructions."],
      ["RAM (memory)", "processing", "RAM is the working space for what is open right now; it empties when the power goes off."],
      ["Hard disk or SSD", "storage", "It keeps your files even when the power is off."],
      ["Pen drive (USB flash drive)", "storage", "It stores files you can carry around."],
    ],
  }),
  sheetLab({
    id: "c2-storage-maths", module: "meet-the-computer", title: "How many photos fit on a phone?", level: "beginner", minutes: 10, xp: 40, skills: [SK], required: true,
    objective: "Use storage units (MB and GB) and a formula to estimate how much will fit.",
    scenario: "A phone has 64 GB of storage. One photo takes about 4 MB, one minute of video takes about 100 MB, and the system and apps already use 20 GB. How many photos could you still store?",
    steps: ["In B4 work out the free storage in GB: total minus used.", "In B5 change the free storage into MB (1 GB is 1,024 MB).", "In B6 find how many photos fit: free MB divided by the size of one photo.", "In B7 find how many minutes of video would fit in the same space."],
    cells: { A1: "Phone storage (GB)", B1: "64", A2: "Used by system and apps (GB)", B2: "20", A3: "One photo (MB)", B3: "4", C3: "One video minute (MB)", D3: "100", A4: "Free (GB)", A5: "Free (MB)", A6: "Photos that fit", A7: "Video minutes that fit" }, view: { cols: 5, rows: 9 },
    checks: [
      ck("free", "B4 is 44 GB free", "=B1-B2", "Free space is what is left after the used part.", S.formula("B4", { equals: 44 })),
      ck("mb", "B5 is 45,056 MB", "=B4*1024", "1 GB is 1,024 MB, so multiply by 1,024.", S.formula("B5", { equals: 45056 })),
      ck("photos", "B6 is 11,264 photos", "=B5/B3", "Free MB divided by the MB one photo takes.", S.formula("B6", { equals: 11264 })),
      ck("video", "B7 is about 450 minutes of video", "=B5/D3", "Use the video minute size in D3: 45,056 divided by 100, about 450 minutes.", S.formula("B7", { equals: 450.56 })),
      ck("ok", "No error messages", "Check that every formula points at the right cell.", "A clean sheet has no error codes.", S.noerrors()),
    ],
    solution: { cells: { B4: "=B1-B2", B5: "=B4*1024", B6: "=B5/B3", B7: "=B5/D3" } },
  }),

  /* ------------------------------------------------------------------ module 2: desktop and files */
  classifyLab({
    id: "c3-where-does-it-go", module: "files-and-the-desktop", title: "Which folder does it belong in?", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Decide where common files belong so you can find them again.",
    scenario: "A tidy computer has a few clear places. Choose the best home for each file.",
    steps: ["Read each file.", "Choose Documents, Pictures, Music, Downloads or Delete/Trash.", "Press Check my work."],
    categories: [["docs", "Documents"], ["pics", "Pictures"], ["music", "Music"], ["dl", "Downloads (sort later)"], ["trash", "Delete (Trash)"]],
    items: [
      ["Your science project report (report.docx)", "docs", "Text documents belong in Documents."],
      ["A photo of the school trip (trip.jpg)", "pics", "Photos belong in Pictures."],
      ["A song you bought (song.mp3)", "music", "Audio belongs in Music."],
      ["A file you just downloaded and have not looked at yet (setup.exe)", "dl", "New downloads land in Downloads until you decide what to do with them."],
      ["An old installer you already used and no longer need", "trash", "Delete things you no longer need, after checking they are not needed."],
      ["Your CV (cv.pdf)", "docs", "A CV is a document."],
    ],
  }),
  wordLab({
    id: "c4-folder-plan", module: "files-and-the-desktop", title: "Plan your folders", level: "beginner", minutes: 12, xp: 40, skills: [SK], required: true,
    objective: "Write a short plan for how you will name and organise your files.",
    scenario: "Write a one-page plan for organising the files on your computer: a title, one paragraph on naming rules and a list of your main folders.",
    steps: ["Write a title and make it a heading.", "Write a paragraph of at least 20 words on how you will name files.", "Make a list of at least four folders you will create.", "Bold the most important rule."],
    checks: [
      ck("head", "A title as a heading", "Apply a heading style to the title.", "A clear title says what the page is.", W.heading(1)),
      ck("para", "A paragraph of at least 20 words on naming", "Explain how you will name files, for example with the date first.", "Good names make files easy to find later.", W.paragraphs(1, 20)),
      ck("list", "A list of at least four folders", "Use the bullet-list button.", "A list shows the structure at a glance.", W.list(4)),
      ck("bold", "The most important rule is bold", "Select it and press B.", "Bold makes the key rule stand out.", W.format("bold")),
    ],
    solution: "<h1>My folder plan</h1><p>I will name every file so that it says what it is and when I made it, starting with the date, so that files sort in order and I never have to open one to find out what is inside.</p><ul><li>School</li><li>Photos</li><li>Music</li><li><b>Downloads (sorted every Friday)</b></li></ul>",
  }),

  /* ------------------------------------------------------------------ module 3: internet and web */
  classifyLab({
    id: "c5-url-parts", module: "internet-and-the-web", title: "Read a web address", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Tell the parts of a web address apart: the protocol, the domain name and the page path.",
    scenario: "A web address such as https://www.example.org/news/today tells you three things: how to connect, which site, and which page.",
    steps: ["Read each piece.", "Choose Protocol, Domain or Path.", "Press Check my work."],
    categories: [["protocol", "Protocol (how to connect)"], ["domain", "Domain (which site)"], ["path", "Path (which page)"]],
    items: [
      ["https://", "protocol", "https is the secure way to connect to a site."],
      ["www.example.org", "domain", "The domain names the website."],
      ["/news/today", "path", "The path points at a particular page inside the site."],
      ["http://", "protocol", "http is the older, unencrypted way to connect."],
      ["school.edu", "domain", "A domain name identifies a site."],
      ["/library/books.html", "path", "A path starts with a slash and names a page."],
    ],
  }),
  wordLab({
    id: "c6-search-skills", module: "internet-and-the-web", title: "Write better searches", level: "intermediate", minutes: 12, xp: 45, skills: [SK], required: true,
    objective: "Turn vague searches into specific ones and record why each is better.",
    scenario: "A good search uses the words a good page would contain. Rewrite four vague searches so they are more likely to find what you want, and list them.",
    steps: ["Write a title as a heading.", "Make a numbered list of at least four rewritten searches.", "After the list, write a paragraph of at least 25 words saying what you changed and why.", "Put at least one search inside quotation marks."],
    checks: [
      ck("head", "A title as a heading", "Apply a heading style.", "A title says what the page is for.", W.heading(1)),
      ck("list", "A numbered list of at least four searches", "Use the numbered-list button.", "A list keeps each search separate.", W.list(4, "ol")),
      ck("quote", "At least one search in quotation marks", "Put an exact phrase in quotes, such as \"photosynthesis diagram\".", "Quotes ask for that exact phrase.", W.pattern("[\"“].+[\"”]", "an exact phrase in quotation marks")),
      ck("why", "A paragraph of at least 25 words explaining the changes", "Explain what you added or removed.", "Knowing why a search is better helps you do it again.", W.paragraphs(1, 25)),
    ],
    solution: "<h1>Better searches</h1><ol><li>\"photosynthesis diagram\" for class 8</li><li>how to charge a phone battery faster</li><li>weather in Pune tomorrow</li><li>\"simple interest formula\" worked example</li></ol><p>I replaced one-word searches with the words a useful page would contain, added the class or place so the results fit me, and used quotation marks when I wanted an exact phrase to appear in the page, which removes many results that only mention the words separately.</p>",
  }),

  /* ------------------------------------------------------------------ module 4: email and communication */
  wordLab({
    id: "c7-write-email", module: "email-and-messages", title: "Write a clear, polite email", level: "beginner", minutes: 14, xp: 50, skills: [SK], required: true,
    objective: "Write an email with a subject line, a greeting, a short body, a clear request and a closing.",
    scenario: "You need to ask your teacher, Mr Rao, for an extra day to hand in a project because you were ill. Write the email.",
    steps: ["Write a subject line starting with the word Subject: and make it specific.", "Greet Mr Rao by name.", "Write a short body (at least 30 words) that explains the reason and says exactly what you are asking for.", "Thank him and sign off with your name."],
    checks: [
      ck("subject", "A subject line", "Start a line with Subject: and say what the email is about.", "A specific subject gets the email opened.", W.pattern("subject\\s*:", "a subject line beginning with Subject:")),
      ck("greet", "A greeting that names Mr Rao", "Begin with Dear Mr Rao, or Hello Mr Rao,.", "A greeting is polite and shows who the email is for.", W.pattern("(dear|hello|hi)\\s+mr\\.?\\s*rao", "a greeting to Mr Rao")),
      ck("body", "A body of at least 30 words", "Explain the reason and the request in a few sentences.", "A clear email says why you are writing and what you want.", W.words(45)),
      ck("ask", "A clear request that mentions the extra day or the deadline", "Say exactly what you are asking for.", "People respond faster to a specific request.", W.pattern("extra day|extension|deadline|one more day|another day", "a clear request")),
      ck("thanks", "A thank-you and a closing", "End with Thank you and your name.", "A polite closing finishes the email well.", W.pattern("thank", "a thank-you")),
    ],
    solution: "<p>Subject: Request for one extra day for the science project</p><p>Dear Mr Rao,</p><p>I was ill with a fever on Tuesday and Wednesday, so I could not finish the last part of my science project before the deadline. I have completed everything except the conclusion and I can send it complete to you by Friday morning.</p><p>Could you please allow me one extra day to hand it in? I understand if this is not possible and I am happy to lose the marks for lateness if needed.</p><p>Thank you for your understanding.</p><p>Yours sincerely,</p><p>Anaya Sharma, Class 8B</p>",
  }),

  /* ------------------------------------------------------------------ module 5: safety */
  classifyLab({
    id: "c8-passwords", module: "safety-and-privacy", title: "Strong or weak password habit?", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Tell good password habits from weak ones.",
    scenario: "Your passwords are the keys to your email, your money and your photos. Sort these habits.",
    steps: ["Read each habit.", "Choose Strong habit or Weak habit.", "Press Check my work."],
    categories: [["strong", "Strong habit"], ["weak", "Weak habit"]],
    items: [
      ["A long password made of four unrelated words", "strong", "Length matters most, and a few unrelated words is long and easy to remember."],
      ["Using your date of birth as a password", "weak", "Dates of birth are easy to guess."],
      ["A different password for every important account", "strong", "A leak at one site cannot open the others."],
      ["Using the same password everywhere so you do not forget it", "weak", "One leak then opens everything."],
      ["Turning on 2-step verification", "strong", "A second proof stops someone who only has your password."],
      ["Telling a friend your password so they can help", "weak", "A password is for you alone."],
      ["Saving passwords in a password manager", "strong", "A manager remembers long unique passwords for you."],
    ],
  }),
  classifyLab({
    id: "c9-scam-or-safe", module: "safety-and-privacy", title: "Scam or genuine?", level: "intermediate", minutes: 10, xp: 40, skills: [SK], required: true,
    objective: "Spot the signs of a scam message and the signs of a genuine one.",
    scenario: "Scammers use phone calls, texts and emails that look official. Real organisations behave differently. Decide which of these are scam signs and which are normal.",
    steps: ["Read each message or request.", "Choose Scam sign or Looks genuine.", "Press Check my work."],
    categories: [["scam", "Scam sign"], ["genuine", "Looks genuine"]],
    items: [
      ["A caller from your 'bank' asks for the OTP that was just sent to your phone", "scam", "Nobody from a real bank ever needs your OTP, PIN or password."],
      ["A text says you won a prize but must pay a small fee to claim it", "scam", "A real prize never asks you to pay first."],
      ["A message says your account closes in one hour unless you click a link", "scam", "Urgency and a link are classic scam tricks."],
      ["A shop sends an order confirmation for something you ordered yourself", "genuine", "It matches something you did and asks for nothing."],
      ["Someone asks you to scan a QR code to receive money into your account", "scam", "You never need to scan a code or enter a PIN to receive money."],
      ["Your school emails the timetable from its usual address with no link to sign in", "genuine", "It is expected, from a known sender, and asks for nothing secret."],
    ],
  }),

  /* ------------------------------------------------------------------ module 6: everyday skills */
  classifyLab({
    id: "c10-first-fix", module: "everyday-digital-skills", title: "What should you try first?", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Choose the simplest sensible first step for a common computer problem.",
    scenario: "Most problems are fixed by a simple step. Good troubleshooters try the cheap steps first.",
    steps: ["Read each problem.", "Choose the best first step.", "Press Check my work."],
    categories: [["restart", "Restart the device or app"], ["connection", "Check the internet connection"], ["storage", "Free up storage"], ["update", "Install updates"], ["ask", "Ask someone you trust before doing anything"]],
    items: [
      ["A program has frozen and will not respond", "restart", "Closing and reopening the program, or restarting, fixes most freezes."],
      ["A web page will not load but other apps work", "connection", "First check whether the internet connection is working."],
      ["A phone says Storage almost full and cannot save photos", "storage", "Delete things you do not need or move photos to the cloud."],
      ["An app keeps crashing and you have not updated it for months", "update", "An update often fixes known bugs."],
      ["A pop-up says your computer has a virus and you must call a number", "ask", "That is a scam. Do not call; close the page and ask a trusted person."],
    ],
  }),
  wordLab({
    id: "cap-safety-card", module: "capstone", title: "Capstone: a digital safety card for your family", level: "intermediate", minutes: 25, xp: 120, skills: [SK], required: true,
    objective: "Combine what you have learned into one clear, usable card.",
    scenario: "Make a one-page card you could give your family, with simple rules for staying safe online.",
    steps: ["A title as a heading and a short introduction of at least 25 words.", "A heading called Passwords with a bulleted list of at least three rules.", "A heading called Scams with a bulleted list of at least three warning signs.", "A heading called If something goes wrong with a numbered list of at least three steps.", "Bold the single most important rule."],
    checks: [
      ck("title", "A title heading", "Apply a heading style to the title.", "The title says what the card is.", W.heading(1)),
      ck("intro", "An introduction of at least 25 words", "Say who the card is for and why it matters.", "A short introduction gives the reason to read.", W.paragraphs(1, 25)),
      ck("heads", "At least four headings", "Use headings for Passwords, Scams and If something goes wrong, plus the title.", "Headings make the card quick to use.", W.heading(4)),
      ck("lists", "A bulleted list", "Use bullet lists for the rules and warning signs.", "Lists are quick to scan.", W.list(3, "ul")),
      ck("steps", "A numbered list of steps", "Use a numbered list for what to do when something goes wrong.", "Order matters when you are worried.", W.list(3, "ol")),
      ck("otp", "It mentions never sharing an OTP or PIN", "Include a rule about never sharing an OTP, PIN or password.", "This is the rule scammers most want people to break.", W.pattern("otp|pin|password", "a rule about not sharing an OTP, PIN or password")),
      ck("bold", "The most important rule is bold", "Select it and press B.", "Bold shows what matters most.", W.format("bold")),
    ],
    solution: "<h1>Our family digital safety card</h1><p>This card is for everyone at home who uses a phone or a computer. It lists a few simple rules that stop most online problems, so please keep it on the fridge and read it together once a month.</p><h2>Passwords</h2><ul><li>Use a long password made of four unrelated words</li><li>Use a different password for each important account</li><li><b>Never share your OTP, PIN or password with anyone, even someone who says they are from the bank</b></li></ul><h2>Scams</h2><ul><li>A message that creates urgency</li><li>A prize you must pay to claim</li><li>A request to scan a code to receive money</li></ul><h2>If something goes wrong</h2><ol><li>Stop and do not click anything else</li><li>Tell a trusted adult straight away</li><li>Change the password and tell the bank or the service</li></ol>",
  }),
];
