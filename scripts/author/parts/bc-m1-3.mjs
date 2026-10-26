import { bars, def, example, explorer, flow, formula, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 1 */
export const M1 = module_({
  slug: "meet-the-computer", title: "Meet the computer", hours: 2, level: "Getting started",
  summary: "Learn what a computer is, what its parts do, how software differs from hardware, and how storage is measured.",
  outcome: "You can name the main parts of a computer or phone, say what each does, and work out how much will fit in a given amount of storage.",
  intro: "A computer is a machine that follows instructions very fast. Phones, laptops, tablets and even smart TVs are all computers. You do not need to know how they are built to use them well, but a small picture of what is inside makes everything else easier to learn, from fixing a slow device to choosing what to buy.",
  topics: [
    topic({
      title: "Hardware and software", slug: "hardware-and-software",
      blocks: [
        p("Everything about a computer falls into two groups. **Hardware** is the physical parts you can touch: the screen, keyboard, battery, the chips inside. **Software** is the instructions that tell the hardware what to do: the apps, the games, the operating system. Hardware without software does nothing, and software without hardware has nowhere to run."),
        def("Operating system (OS)", "The main software that manages the hardware and lets you run other programs. Windows, macOS, Linux, Android and iOS are operating systems. It gives you the desktop or home screen, the files and the settings."),
        table("Hardware or software?", ["Item", "Which"], [["Touch screen", "Hardware"], ["Android", "Software (an operating system)"], ["A calculator app", "Software (an application)"], ["The battery", "Hardware"], ["A game you download", "Software"]]),
        flow("The cycle every computer follows", ["Input: you tap, type or speak", "Processing: the computer works on it", "Storage: it keeps what must be kept", "Output: it shows or plays the result"]),
        tip("When something goes wrong, ask: is this a hardware problem (a cracked screen, a dead battery) or a software problem (an app that crashes)? Software problems are usually fixed by restarting or updating; hardware problems usually need repair."),
        tryIt("Is WhatsApp hardware or software?", "Software. It is an application, a program, that runs on the hardware of your phone."),
      ],
      points: ["Hardware is the physical parts; software is the instructions.", "The operating system manages the hardware and runs your apps.", "Every computer follows input, processing, storage and output."],
      check: [["Which of these is software?", ["The screen", "The battery", "Android", "The charger"], 2, "Android is an operating system, which is software."], ["What does the operating system do?", ["Cools the computer", "Manages the hardware and runs other programs", "Charges the battery", "Makes the screen brighter"], 1, "It is the main software that everything else relies on."]],
    }),
    topic({
      title: "Inside the box: CPU, memory and storage", slug: "cpu-memory-storage",
      blocks: [
        p("Three parts explain most of what you will ever hear about speed and space."),
        table("The three that matter most", ["Part", "What it does", "Everyday picture", "What happens when it is full or slow"], [["CPU (processor)", "Does the calculations and follows instructions", "The brain", "Everything feels slow when it is overworked"], ["RAM (memory)", "Holds what is open and in use right now; it empties when power goes off", "Your desk", "Too many things open and the device slows down"], ["Storage (SSD or hard disk)", "Keeps files and apps permanently", "A cupboard", "You cannot save new files or install apps"]]),
        example("Why is my phone slow?", "A phone becomes slow and says Storage almost full.", ["Storage is the cupboard: if it is nearly full the phone struggles to save and swap data.", "RAM is the desk: if many apps are open at once the desk is crowded.", "First steps: close apps you are not using, delete files you do not need, restart the phone."], "Matching the symptom to the part tells you what to try."),
        list("Simple habits that keep a device quick", ["Close apps you are not using.", "Keep at least a fifth of your storage free.", "Restart now and then; it clears the desk.", "Install updates, which often include speed fixes."]),
        warn("Do not install 'cleaner' or 'booster' apps from adverts. Many are useless or carry adverts and unwanted software. The built-in storage settings do the same job safely."),
      ],
      points: ["CPU is the brain, RAM is the desk, storage is the cupboard.", "RAM empties when power goes off; storage keeps files.", "Match the symptom to the part to choose a fix."],
      check: [["Which part keeps your photos when the phone is switched off?", ["RAM", "CPU", "Storage", "Speaker"], 2, "Storage keeps files permanently."], ["Too many open apps mostly crowds:", ["Storage", "RAM", "The battery label", "The screen"], 1, "RAM is the working space for what is open now."]],
    }),
    topic({
      title: "Measuring storage: bytes, MB and GB", slug: "storage-units",
      blocks: [
        p("The smallest unit is the **bit** (a 0 or a 1). Eight bits make a **byte**, roughly one letter. Bigger amounts use prefixes you already know from kilometres and kilograms, but each step is about a thousand times bigger (1,024, to be exact)."),
        table("Storage units", ["Unit", "Short", "About how much"], [["Kilobyte", "KB", "A short email or a page of plain text"], ["Megabyte", "MB", "A photo, or a minute of music"], ["Gigabyte", "GB", "A film, or hundreds of photos"], ["Terabyte", "TB", "A large library of films, or a lot of photos and videos"]]),
        formula("Converting units", "1 GB = 1,024 MB", "To change GB into MB, multiply by 1,024. To change MB into GB, divide by 1,024."),
        example("How many photos fit?", "A phone has 64 GB. The system and apps use 20 GB. One photo takes about 4 MB.", ["Free space: 64 - 20 = 44 GB.", "In megabytes: 44 x 1,024 = 45,056 MB.", "Photos: 45,056 / 4 = 11,264 photos."], "Always change both numbers into the same unit before you divide."),
        explorer({ id: "storage-explorer", title: "How many fit?", intro: "Choose the storage and the size of one file.", inputs: [{ id: "gb", label: "Free space (GB)", min: 1, max: 512, step: 1, value: 44 }, { id: "mb", label: "Size of one file (MB)", min: 1, max: 200, step: 1, value: 4 }], outputs: [{ label: "How many files fit", expr: "floor(gb * 1024 / mb)", unit: "n" }, { label: "Free space in MB", expr: "gb * 1024", unit: "n" }] }),
        bars("About how big common files are (MB)", [["Photo", 4], ["Song", 5], ["Video minute", 100], ["PDF book", 15]]),
        mistakes(["Mixing MB and GB without converting.", "Forgetting that the 64 GB on the box is not all free: the system takes some.", "Thinking a megabit (Mb, used for internet speed) is the same as a megabyte (MB): a byte is eight bits."]),
      ],
      points: ["Eight bits make a byte; each unit up is about 1,024 times bigger.", "Convert to the same unit before you calculate.", "A phone's advertised storage is more than what you can use."],
      check: [["How many MB are in 1 GB?", ["10", "100", "1,024", "1,000,000"], 2, "Each step up is 1,024 times."], ["A photo takes 4 MB. About how many fit in 1 GB?", ["25", "256", "4,000", "1"], 1, "1,024 divided by 4 is 256."]],
    }),
  ],
  terms: [["Hardware", "The physical parts"], ["Software", "The instructions: apps and the operating system"], ["Operating system", "The main software that manages the device"], ["CPU", "The processor that does the work"], ["RAM", "Working memory for what is open now"], ["Storage", "Where files are kept"]],
  practical: { title: "Practical: what is in your device?", intro: "Look at a real phone or computer.", steps: ["Open Settings and find the storage page.", "Write down the total, used and free storage.", "List five apps that use the most space.", "Work out how many photos of 4 MB would fit in the free space."] },
  quiz: [
    ["Which is hardware?", ["The Android system", "A game", "The keyboard", "A website"], 2, "A keyboard is a physical part."],
    ["Which part keeps files when the power is off?", ["RAM", "Storage", "CPU", "Speaker"], 1, "Storage keeps files permanently."],
    ["What is the operating system?", ["A game", "The main software that manages the device", "A cable", "A website"], 1, "It manages the hardware and runs programs."],
    ["Too many apps open at once slows the device because it crowds:", ["Storage", "RAM", "The screen", "The speaker"], 1, "RAM is the working space for open programs."],
    ["How many MB are in 1 GB?", ["100", "1,000", "1,024", "10,000"], 2, "Each unit is 1,024 times the one below."],
    ["Eight bits make:", ["A kilobyte", "A byte", "A megabyte", "A pixel"], 1, "A byte is eight bits."],
    ["Why is a 64 GB phone not 64 GB free?", ["It is a trick", "The system and apps use some space", "GB is smaller than advertised", "Photos do not count"], 1, "The operating system and preinstalled apps take space."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 2 */
export const M2 = module_({
  slug: "files-and-the-desktop", title: "Files, folders and the desktop", hours: 2, level: "Getting started",
  summary: "Use windows and the desktop confidently, create and name files, organise them in folders, and use the shortcuts that save the most time.",
  outcome: "You can find any file you have saved, keep your files tidy and use the key shortcuts without thinking.",
  intro: "Most of everyday computing is **managing files**: saving a document, finding a photo, copying something to a pen drive. People who lose hours looking for files usually have no plan for where things go. This module gives you one, along with the shortcuts every confident user knows.",
  topics: [
    topic({
      title: "The desktop, windows and apps", slug: "desktop-and-windows",
      blocks: [
        p("The **desktop** is your main screen: a background, icons for your favourite apps and files, and a bar (the taskbar on Windows, the dock on a Mac) that shows what is open. Every program you open appears in its own **window** that you can move, resize, minimise and close."),
        table("Window controls", ["Control", "Does", "Tip"], [["Minimise (a dash)", "Hides the window but keeps the program running", "Click its icon in the taskbar to bring it back"], ["Maximise (a square)", "Makes the window fill the screen", "Double-click the title bar does the same"], ["Close (an X)", "Ends the program or closes the document", "Save first!"], ["Drag the title bar", "Moves the window", "Drag to the screen edge to snap it half the screen"]]),
        flow("Run a program", ["Open the Start menu or search", "Type the name of the app", "Press Enter to open it", "Use the window controls to arrange it"]),
        tip("**Alt+Tab** (Windows) or **Cmd+Tab** (Mac) switches between open programs without touching the mouse."),
        mistakes(["Closing a document without saving.", "Opening the same program ten times because the first one is hidden: look in the taskbar.", "Saving to the Desktop and ending up with a screen full of icons."]),
      ],
      points: ["The desktop holds icons and a bar of open programs.", "Each program runs in a window with minimise, maximise and close.", "Alt+Tab or Cmd+Tab switches programs quickly."],
      check: [["Which control hides a window but keeps the program running?", ["Close", "Minimise", "Maximise", "Save"], 1, "Minimise puts it in the taskbar."], ["What does Alt+Tab do?", ["Closes a window", "Switches between open programs", "Saves the file", "Shuts down"], 1, "It moves you to the next open program."]],
    }),
    topic({
      title: "Files, folders and file types", slug: "files-and-folders",
      blocks: [
        p("A **file** is one thing you saved: a document, a photo, a song. A **folder** is a container that holds files and other folders. Together they form a tree you can walk down: *Documents > School > Science > report.docx*."),
        table("Common file types", ["Ending", "What it is", "Opens with"], [[".docx", "A Word or Docs document", "A word processor"], [".pdf", "A page that looks the same on every device", "A PDF reader or a browser"], [".jpg or .png", "A picture", "A photo viewer"], [".mp3", "A song or audio", "A music player"], [".xlsx", "A spreadsheet", "A spreadsheet program"], [".zip", "A folder squashed into one file", "Right-click and Extract"]]),
        list("Good names for files", ["Say **what it is**: Science report, not Document1.", "Put the **date first** in year-month-day order: 2026-03-14 Science report.", "Use **v1, v2, v3** for versions; never Final.", "Avoid symbols such as / ? : * which many systems reject."]),
        example("Find a lost file", "You saved a photo yesterday but cannot see it.", ["Open the search box and type part of the name, or the file type such as .jpg.", "Look in Downloads and Pictures first: that is where most files land.", "Sort the folder by Date modified, newest first, to see what you touched recently."], "Search and sorting find a file faster than remembering where it is."),
        warn("Be careful with files ending in .exe, .bat or .scr that arrive by email or download. They are programs, and running an unknown one can harm your computer."),
        tip("To see the ending of a file name on Windows, open the View menu in File Explorer and tick **File name extensions**. It helps you spot a file pretending to be a picture that is really a program."),
      ],
      points: ["A folder holds files and other folders in a tree.", "The ending of a file name shows its type.", "Name files clearly, date first, and sort by date to find recent ones."],
      check: [["Which file ending is a picture?", [".mp3", ".jpg", ".docx", ".zip"], 1, ".jpg is a common picture format."], ["Which name is best?", ["Final", "2026-03-14 Science report v2", "Document1", "asdfgh"], 1, "A date, a topic and a version make it clear."]],
    }),
    topic({
      title: "Copy, move, delete and the shortcuts that save time", slug: "copy-move-shortcuts",
      blocks: [
        p("You will copy, move and delete files hundreds of times. A few shortcuts turn each of those from three steps into one."),
        table("Shortcuts everyone should know", ["Windows", "Mac", "Does"], [["Ctrl+C", "Cmd+C", "Copy what is selected"], ["Ctrl+X", "Cmd+X", "Cut (move) what is selected"], ["Ctrl+V", "Cmd+V", "Paste"], ["Ctrl+Z", "Cmd+Z", "Undo the last action"], ["Ctrl+S", "Cmd+S", "Save"], ["Ctrl+A", "Cmd+A", "Select everything"], ["Ctrl+F", "Cmd+F", "Find on the page"]]),
        example("Move a photo to the right folder", "A photo is in Downloads and belongs in Pictures.", ["Click the photo to select it.", "Press Ctrl+X to cut it.", "Open the Pictures folder.", "Press Ctrl+V to paste. The photo has moved."], "Copy leaves the original; cut moves it."),
        list("Deleting safely", ["**Delete** sends a file to the Recycle Bin (Trash), where you can restore it.", "**Emptying** the bin removes the files for good.", "Before you empty it, look through it once.", "If something important is gone, stop, check the bin, and then ask for help; do not install 'recovery' programs from adverts."]),
        tryIt("You pasted a file into the wrong folder. What is the fastest fix?", "Press Ctrl+Z to undo, or cut it again and paste it into the right folder."),
        tip("Ctrl+Z is the most useful key on the keyboard. If something goes wrong in almost any program, try it before anything else."),
      ],
      points: ["Ctrl+C copies, Ctrl+X cuts, Ctrl+V pastes, Ctrl+Z undoes.", "Cut moves; copy duplicates.", "Delete goes to the bin; emptying the bin is permanent."],
      check: [["Which shortcut undoes the last action?", ["Ctrl+Z", "Ctrl+S", "Ctrl+A", "Ctrl+F"], 0, "Ctrl+Z is undo (Cmd+Z on a Mac)."], ["What is the difference between copy and cut?", ["None", "Copy leaves the original; cut moves it", "Cut is faster", "Copy deletes"], 1, "Cut removes the original when you paste."]],
    }),
  ],
  terms: [["Desktop", "The main screen with icons and the taskbar"], ["Window", "The frame a program runs in"], ["File", "One saved item"], ["Folder", "A container for files"], ["Extension", "The ending of a file name that shows its type"], ["Recycle Bin", "Where deleted files wait"]],
  practical: { title: "Practical: tidy your files", intro: "Spend fifteen minutes tidying a real folder.", steps: ["Create three folders for your own use, such as School, Photos and Music.", "Rename five files so each has a clear name with the date first.", "Move at least ten files into the right folders using cut and paste.", "Empty the Recycle Bin after checking it."] },
  quiz: [
    ["What does minimise do?", ["Closes the program", "Hides the window but keeps the program running", "Deletes the file", "Restarts the device"], 1, "The program stays open in the taskbar."],
    ["Which key combination undoes your last action?", ["Ctrl+Z", "Ctrl+Q", "Ctrl+B", "Ctrl+P"], 0, "Ctrl+Z is undo."],
    ["What is a folder?", ["A program", "A container for files and other folders", "A kind of picture", "A website"], 1, "Folders organise files."],
    ["Which ending is usually a document?", [".jpg", ".docx", ".mp3", ".png"], 1, ".docx is a word-processor document."],
    ["Where does a deleted file go first?", ["Gone for good", "The Recycle Bin or Trash", "Pictures", "The cloud"], 1, "It waits in the bin until you empty it."],
    ["Why should you be careful with .exe files from unknown senders?", ["They are slow", "They are programs and could harm the computer", "They are large", "They cannot be deleted"], 1, "Running an unknown program is risky."],
    ["Which is the best file name?", ["New file", "2026-03-14 History project v1", "asdf", "Final FINAL"], 1, "It says what, when and which version."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 3 */
export const M3 = module_({
  slug: "internet-and-the-web", title: "The internet and the web", hours: 2, level: "Core skills",
  summary: "Understand how the internet and the web work, use a browser well, and search in ways that find reliable answers.",
  outcome: "You can read a web address, use browser features, search precisely and judge whether a page can be trusted.",
  intro: "The **internet** is the giant network of connected computers. The **web** is just one thing that runs on it: the pages you open in a browser. Email, video calls and apps use the internet too, without being 'the web'. Knowing the difference, and a few browser skills, helps you find what you need and avoid what you do not.",
  topics: [
    topic({
      title: "How the internet works, in plain words", slug: "how-the-internet-works",
      blocks: [
        p("When you open a page, your device asks another computer, called a **server**, to send it. That request travels through a chain of cables, wireless links and routers until it reaches the server, and the page comes back the same way, in a fraction of a second."),
        flow("What happens when you open a page", ["You type a web address", "Your device asks DNS, the internet's address book, for the server's number", "The request travels to the server", "The server sends the page back and your browser shows it"]),
        table("Words you will hear", ["Word", "Plain meaning"], [["Server", "A computer that stores pages and sends them when asked"], ["Router", "The box that connects your devices to the internet"], ["Wi-Fi", "A wireless link between your device and the router"], ["Mobile data", "Internet over the phone network"], ["Bandwidth", "How much data can flow at once (more is faster)"], ["Cloud", "Other people's computers that store your files or run your apps"]]),
        tip("If a page will not load, check whether other pages work. If none do, the problem is your connection (try restarting the router); if only one site fails, the problem is probably at that site."),
        warn("Free public Wi-Fi in cafes and stations can be watched by others. Do not log into your bank or enter card details on it; use mobile data instead."),
      ],
      points: ["The web is one thing that runs on the internet.", "A page is requested from a server and sent back.", "Avoid sensitive tasks on public Wi-Fi."],
      check: [["What is a server?", ["A person", "A computer that stores pages and sends them when asked", "A cable", "A game"], 1, "Servers store and send websites and other data."], ["Which is safer for online banking?", ["Public Wi-Fi", "Your mobile data or home connection", "An unknown hotspot", "Any network"], 1, "Public Wi-Fi can be watched."]],
    }),
    topic({
      title: "Using a browser well", slug: "using-a-browser",
      blocks: [
        p("A **browser** (Chrome, Edge, Firefox, Safari) is the app that opens web pages. A web address, or **URL**, has three parts."),
        table("Reading a web address: https://www.example.org/news/today", ["Part", "Example", "Meaning"], [["Protocol", "https://", "How to connect. https is the secure way; http is not encrypted"], ["Domain", "www.example.org", "Which website"], ["Path", "/news/today", "Which page inside the site"]]),
        list("Browser features worth using", ["**Tabs**: keep several pages open in one window.", "**Bookmarks**: save pages you will want again.", "**History**: find a page you visited earlier.", "**Downloads**: see what you saved and where it went.", "**Private window**: nothing is kept on this device afterwards, but the sites you visit and your internet provider can still see where you went."]),
        example("Check you are on the real site", "You want your school's website.", ["Look at the domain, the part just before the first single slash, such as school.edu.", "Check for https and the padlock, which show a secure connection but not that the site is honest.", "Be wary of small differences such as scho0l.edu or school-edu.com.", "Better still, use a bookmark you saved yourself."], "A padlock means the connection is private, not that the site is trustworthy."),
        warn("Pop-ups that say your device has a virus, or that you won a prize, are tricks. Close the tab and do not call numbers or install anything they offer."),
        tip("**Ctrl+T** opens a new tab, **Ctrl+W** closes one, **Ctrl+D** bookmarks the page, **Ctrl+L** selects the address bar."),
      ],
      points: ["A URL has a protocol, a domain and a path.", "https and the padlock mean a private connection, not an honest site.", "Use bookmarks for sites you rely on."],
      check: [["In https://www.example.org/news, which part is the domain?", ["https://", "www.example.org", "/news", "news"], 1, "The domain names the website."], ["What does a padlock in the address bar mean?", ["The site is honest", "The connection is private (encrypted)", "The page is free", "The page is old"], 1, "It protects the connection, not the intentions of the site."]],
    }),
    topic({
      title: "Searching and judging what you find", slug: "searching-and-judging",
      blocks: [
        p("A search engine looks for pages containing your words. The better your words, the better the answer. Then comes the harder part: **deciding whether you can trust what you find**."),
        table("Better searches", ["Instead of", "Try", "Why"], [["photosynthesis", "photosynthesis diagram class 8", "Adds what you need and who it is for"], ["weather", "weather in Pune tomorrow", "Adds the place and the day"], ["how to fix", "how to fix a phone that will not charge", "Says what is wrong"], ["python", "\"python for beginners\" free course", "Quotes ask for the exact phrase"]]),
        list("Search tools", ["Put an exact phrase in **\"quotation marks\"**.", "Put **-word** to leave a word out.", "Use **site:gov.in** to search only inside one kind of site.", "Use the **Tools** or **Filters** menu to limit by date."]),
        list("Can you trust this page? Ask four questions", ["**Who wrote it**, and are they an expert or an organisation you know?", "**When** was it written? Old pages can be wrong.", "**Why** was it written: to inform, to sell, or to persuade?", "**Does another reliable source say the same?**"], true),
        warn("The first results are sometimes adverts, marked with a label such as Sponsored or Ad. They are paid for, not picked as the best answer."),
        example("Check a surprising claim", "A post says a famous exam has been cancelled.", ["Do not share it yet.", "Search for the claim and look for the official board or a trusted news site.", "If only unknown pages say it, it is probably false."], "Pause and check before you share."),
      ],
      points: ["Specific words, quotes and filters give better results.", "Ask who, when, why and whether others agree.", "Adverts appear at the top of results; check the label."],
      check: [["What do quotation marks do in a search?", ["Nothing", "Ask for that exact phrase", "Make it faster", "Hide adverts"], 1, "They ask the engine to match the exact words."], ["Which question helps you judge a page?", ["What colour is it?", "Who wrote it and why?", "How long is it?", "Is it popular?"], 1, "Knowing the author and purpose tells you how far to trust it."]],
    }),
  ],
  terms: [["Server", "A computer that sends pages when asked"], ["Browser", "The app that opens web pages"], ["URL", "A web address"], ["Protocol", "How to connect: http or https"], ["Domain", "The name of a website"], ["Search engine", "A tool that finds pages containing your words"]],
  practical: { title: "Practical: search like a researcher", intro: "Find the answer to a real question and decide whether to trust it.", steps: ["Choose a question you do not know the answer to.", "Search using at least one exact phrase in quotes.", "Open two different results and answer the four trust questions for each.", "Write the answer and where you found it."] },
  quiz: [
    ["The web is:", ["The same as the internet", "One thing that runs on the internet", "A kind of cable", "An app"], 1, "Email and apps use the internet without being the web."],
    ["In https://www.example.org/news, what does https tell you?", ["The page is true", "The connection is encrypted", "The page is new", "The page is free"], 1, "https is the secure way to connect."],
    ["Which is the domain in https://school.edu/library?", ["https", "school.edu", "/library", "edu/library"], 1, "The domain is the website's name."],
    ["Why avoid online banking on public Wi-Fi?", ["It is slow", "Others may be able to watch the connection", "Banks block it", "It costs money"], 1, "Public networks can be watched."],
    ["What should you do with a pop-up saying you have a virus?", ["Call the number", "Close the tab and do not follow it", "Install the program it offers", "Share it"], 1, "It is a trick."],
    ["Which search is more precise?", ["weather", "weather in Pune tomorrow", "rain", "pune"], 1, "It says where and when."],
    ["Why can adverts appear at the top of search results?", ["They are the best answers", "They are paid placements", "They are random", "They are older pages"], 1, "Check for an Ad or Sponsored label."],
  ],
});
