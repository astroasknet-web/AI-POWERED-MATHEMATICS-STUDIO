import { capstone, course } from "../kit.mjs";
import { labs, SK } from "../parts/bc-labs.mjs";
import { M1, M2, M3 } from "../parts/bc-m1-3.mjs";
import { M4, M5, M6 } from "../parts/bc-m4-6.mjs";

export default course({
  slug: "basic-computer-internet-literacy", title: "Basic Computer & Internet Literacy", tagline: "From the parts of a computer to safe, confident everyday use, with practice in every module", level: "Beginner", hours: 12,
  summary: "Start from zero. Learn what a computer is and how storage works, manage files and folders, use a browser and search well, write clear emails, keep your accounts and money safe from scams, and fix common problems. Every module has practice labs that check your work and explain what is missing.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: a digital safety card", summary: "Write a one-page safety card for your family, and pass the final assessment.",
    intro: "You can now use a computer with understanding, manage files, search and judge what you find, write good emails and spot scams. In this final step you write a digital safety card for your family in the document lab: a title and introduction, rules for passwords, warning signs of scams, and steps to take if something goes wrong. Then take the final assessment, which covers the whole course.",
    steps: ["Work through the **Digital safety card** lab: a title, an introduction, three headed sections with lists, and one bold rule.", "Read it as if you were a family member: would it help someone worried about a scam?", "Take the final assessment below."], projectTitle: "Write a family digital safety card",
    quiz: [
      ["Which is hardware?", ["Android", "A game", "The keyboard", "A website"], 2, "A keyboard is a physical part."],
      ["Which part keeps files when the power is off?", ["RAM", "Storage", "CPU", "A speaker"], 1, "Storage keeps files permanently."],
      ["How many MB are in 1 GB?", ["100", "1,000", "1,024", "10,000"], 2, "Each unit is 1,024 times the one below."],
      ["Which shortcut undoes the last action?", ["Ctrl+Z", "Ctrl+Q", "Ctrl+B", "Ctrl+P"], 0, "Ctrl+Z is undo."],
      ["Which file name is clearest?", ["Final", "2026-03-14 History project v1", "asdf", "New file"], 1, "A date, a topic and a version."],
      ["In https://school.edu/library, which part is the domain?", ["https", "school.edu", "/library", "edu/library"], 1, "The domain names the site."],
      ["What does a padlock in the address bar mean?", ["The site is honest", "The connection is private", "The page is free", "The page is new"], 1, "It protects the connection, not the site's intentions."],
      ["Which is the better search?", ["weather", "weather in Pune tomorrow", "rain", "pune"], 1, "It says where and when."],
      ["Which field hides other recipients' addresses?", ["To", "Cc", "Bcc", "Subject"], 2, "Bcc is private."],
      ["A 30 MB video should be:", ["Attached", "Shared as a link from a cloud drive", "Printed", "Ignored"], 1, "Large files are shared by link."],
      ["Which password is strongest?", ["Anaya2010", "riverlamp-planet-bicycle-orange", "password123", "12345678"], 1, "Long and unique is strongest."],
      ["Who may ask for your OTP?", ["Your bank on the phone", "A delivery person", "Nobody legitimate", "A teacher"], 2, "No legitimate organisation asks for it."],
      ["Someone asks you to enter a PIN to receive money. This is:", ["Normal", "A scam sign", "Required", "A bank offer"], 1, "You never need a PIN to receive money."],
      ["The 3-2-1 backup rule is:", ["3 copies, on 2 kinds of storage, 1 off-site", "3 apps, 2 files, 1 folder", "1 copy only", "3 emails daily"], 0, "It protects against any single loss."],
      ["What is the best first step for most problems?", ["Buy a new device", "Restart", "Delete files", "Call a number from a pop-up"], 1, "Restarting is cheap and fixes many problems."],
      ["How should you learn a new app?", ["Memorise every menu", "Use it on a small real task with a short guide", "Never click", "Only watch"], 1, "Doing is the best way to learn."],
    ],
  }),
  labs,
  skills: [{ id: SK, label: "Digital basics" }],
  badges: [
    { id: "know-your-computer", title: "Know your computer", description: "Sorted the parts of a computer and worked out storage.", when: { all: ["c1-parts", "c2-storage-maths"] } },
    { id: "file-organiser", title: "File organiser", description: "Planned and sorted files and folders.", when: { all: ["c3-where-does-it-go", "c4-folder-plan"] } },
    { id: "web-searcher", title: "Web searcher", description: "Read a web address and wrote better searches.", when: { all: ["c5-url-parts", "c6-search-skills"] } },
    { id: "email-writer", title: "Email writer", description: "Wrote a clear, polite email.", when: { all: ["c7-write-email"] } },
    { id: "scam-spotter", title: "Scam spotter", description: "Spotted weak passwords and scam signs.", when: { all: ["c8-passwords", "c9-scam-or-safe"] } },
    { id: "safe-family", title: "Safe at home", description: "Wrote a digital safety card for the family.", when: { all: ["cap-safety-card"] } },
  ],
  landing: {
    hero: { eyebrow: "Digital skills from zero · Nothing to install", title: "Basic Computer & Internet Literacy", subtitle: "Learn how computers and the internet work, manage files, search, email, and stay safe from scams and weak passwords, with practice labs that check your work.", level: "Beginner", outcomeLine: "After this course you can use a computer and the internet confidently, and protect yourself and your family." },
    outcomes: [
      { icon: "computer", title: "Know your device", text: "Parts of a computer, software, storage and what slows a device down." },
      { icon: "sheet", title: "Manage files", text: "Folders, file names, copy, cut, paste and the shortcuts that save time." },
      { icon: "web", title: "Use the web well", text: "Browsers, web addresses, searching and judging what you find." },
      { icon: "doc", title: "Communicate clearly", text: "Write good emails, share files safely and behave well online." },
      { icon: "ai", title: "Stay safe", text: "Strong passwords, 2-step verification, scams, updates and backups." },
      { icon: "slides", title: "Handle daily tasks", text: "Pay and fill in forms safely, fix problems and keep learning." },
    ],
    projects: [
      { title: "A phone storage estimate", text: "Use units and formulas to see how many photos fit.", module: "meet-the-computer" },
      { title: "A folder plan", text: "Name and organise your files.", module: "files-and-the-desktop" },
      { title: "Better searches", text: "Turn vague searches into precise ones.", module: "internet-and-the-web" },
      { title: "A polite email", text: "Subject, greeting, request and closing.", module: "email-and-messages" },
      { title: "Scam or genuine?", text: "Spot the warning signs.", module: "safety-and-privacy" },
      { title: "A family safety card", text: "A one-page card of rules for home.", module: "capstone" },
    ],
    tools: [{ icon: "sort", title: "Sort and decide", text: "Short activities to sort parts, files, passwords and scams." }, { icon: "doc", title: "Document lab", text: "A real editor with headings, lists and formatting." }, { icon: "sheet", title: "Spreadsheet lab", text: "A grid with formulas for storage sums." }],
    assessment: ["Finish the required labs in each module: they are checked automatically and explained when something is missing.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Complete the final project and the final assessment to finish the course."],
    faq: [
      { q: "Do I need any experience?", a: "No. The course starts from the very beginning and explains every word it uses." },
      { q: "Does it matter whether I use Windows, a Mac or a phone?", a: "The ideas are the same everywhere. Where a shortcut differs, the lesson shows the Windows and Mac versions." },
      { q: "How long does it take?", a: "About twelve hours, in short sessions. Each module takes around two hours." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~12 hrs", weeks: "~3 weeks", pace: "4 hrs/wk", badge: "Digital Basics",
    brief: "Computers, files, the web, email and staying safe online, with a practice lab in every module.",
    learn: ["The parts of a computer, software and how storage is measured", "Files, folders, naming and the shortcuts that save time", "How the internet works, using a browser and searching well", "Writing clear emails and sharing files safely", "Strong passwords, 2-step verification, scams, updates and backups", "Safe online services, fixing common problems and learning new tools"],
    handsOn: "Write a one-page digital safety card for your family with rules, warning signs and steps to take.",
    outcome: "Use a computer and the internet with confidence, and keep yourself and your money safe.",
  },
});
