import { bars, def, example, explorer, flow, formula, list, mistakes, miniQuiz, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 1 */
export const M1 = module_({
  slug: "smarter-formulas", title: "Smarter formulas", hours: 2, level: "Building on the basics",
  summary: "Write formulas that survive being copied, make decisions with IFS and SWITCH, tame errors, and design a sheet so it is easy to check.",
  outcome: "You can build a calculation once and trust it everywhere: mixed references, readable decisions, handled errors and visible assumptions.",
  intro: "Basic Excel teaches you to write a formula. Advanced Excel is about writing formulas that are **correct when copied, easy to read a year later, and hard to break**. This module gives you the four habits behind every reliable spreadsheet: reference the right way, decide clearly, expect errors, and keep assumptions in plain sight.",
  topics: [
    topic({
      title: "Mixed references: lock one direction", slug: "mixed-references",
      blocks: [
        p("You already know that `B2` is **relative** (it moves when copied) and `$B$2` is **absolute** (it never moves). Real models often need something in between: lock the **column** but let the row move, or lock the **row** but let the column move. These are **mixed references**."),
        table("The four kinds of reference", ["Written", "Column", "Row", "Typical use"], [["B2", "moves", "moves", "A formula copied in any direction"], ["$B$2", "locked", "locked", "A single input such as a tax rate"], ["$B2", "locked", "moves", "Always read column B, whichever column the formula is in"], ["B$2", "moves", "locked", "Always read row 2, whichever row the formula is in"]]),
        example("A price grid in one formula", "Prices run down column A (5, 8, 12) and order sizes run across row 1 (10, 20, 50). Every cell in the grid should be price times size.", ["In B2 write `=$A2*B$1`.", "`$A2`: the column is locked, so the price always comes from column A; the row is free, so it follows the formula down.", "`B$1`: the row is locked, so the size always comes from row 1; the column is free, so it follows the formula across.", "Copy B2 across to D2 and down to row 4. Every cell finds its own price and its own size."], "One formula fills nine cells correctly. The mistake to avoid is typing nine different formulas by hand."),
        flow("Read a mixed reference", ["Ask: should this part move when I copy sideways?", "Ask: should it move when I copy down?", "Put $ in front of whatever must stay put", "Copy and check the corner cells"]),
        tip("Press **F4** repeatedly while the cursor is in a reference. It cycles through B2, $B$2, B$2 and $B2, so you never need to type a dollar sign."),
        warn("A formula that looks right in the first cell can be wrong everywhere else. Always check the **last** cell of a copied block as well as the first."),
        tryIt("What does =$A2*B$1 become when copied from B2 to D4?", "In D4 it becomes `=$A4*D$1`. The column of the first reference stays A and the row of the second stays 1; the other parts moved."),
      ],
      points: ["A dollar sign locks whatever comes right after it.", "$A2 locks the column; A$2 locks the row; $A$2 locks both.", "Check the last cell of a copied block, not just the first."],
      check: [["Which reference always reads from row 1 but lets the column move?", ["$A1", "A$1", "$A$1", "A1"], 1, "The dollar sign sits before the row number, so the row is locked and the column is free."], ["=$A2*B$1 is copied from B2 to C3. What does it become?", ["=$A3*C$1", "=$A2*C$1", "=$A3*B$1", "=$B3*C$1"], 0, "Copying one column right moves B to C in the unlocked column part; copying one row down moves 2 to 3 in the unlocked row part."]],
    }),
    topic({
      title: "Logic that reads well: IF, AND, OR, IFS and SWITCH", slug: "logic-that-reads-well",
      blocks: [
        p("A decision in a spreadsheet is a **test** and two or more **answers**. The classic tool is `IF(test, if_true, if_false)`. When there are several bands, people nest one IF inside another, and the formula quickly becomes a maze of brackets. Two newer functions fix that."),
        table("Choosing the right decision function", ["You have...", "Use", "Example"], [["One yes/no test", "IF", "=IF(B2>=40,\"Pass\",\"Fail\")"], ["Two or more conditions that must all be true or any be true", "IF with AND / OR", "=IF(AND(B2>=40,C2>=40),\"Pass\",\"Fail\")"], ["Several bands, checked in order", "IFS", "=IFS(B2>=90,\"A\",B2>=75,\"B\",TRUE,\"C\")"], ["One value compared with exact matches", "SWITCH", "=SWITCH(A2,1,\"Low\",2,\"Medium\",3,\"High\",\"Unknown\")"]]),
        example("Commission bands with IFS", "Sales of 100,000 or more earn 10%, from 60,000 earn 7%, from 30,000 earn 5%, anything lower earns 2%.", ["Write `=IFS(B2>=100000,0.1,B2>=60000,0.07,B2>=30000,0.05,TRUE,0.02)`.", "IFS checks each test from left to right and returns the answer beside the **first true test**.", "That is why the biggest band goes first: 120,000 passes the first test and stops there.", "The final `TRUE,0.02` is a catch-all, like *otherwise*: it is always true, so anything that missed the other bands gets 2%."], "A sale of 75,000 fails the 100,000 test, passes the 60,000 test, and earns 7%."),
        explorer({ id: "commission-explorer", title: "Try the bands", intro: "Move the sales figure and see which band applies.", inputs: [{ id: "s", label: "Sales (rupees)", min: 0, max: 150000, step: 5000, value: 75000 }], outputs: [{ label: "Commission rate", expr: "(2 + 3 * min(1, floor(s / 30000)) + 2 * min(1, floor(s / 60000)) + 3 * min(1, floor(s / 100000)))", unit: "pct" }, { label: "Commission", expr: "s * (2 + 3 * min(1, floor(s / 30000)) + 2 * min(1, floor(s / 60000)) + 3 * min(1, floor(s / 100000))) / 100", unit: "rs" }] }),
        list("When to prefer which", ["**Nested IF** only for two bands. Three or more levels is the signal to switch.", "**IFS** for ranges and conditions, tested in order.", "**SWITCH** for exact matches such as codes or numbers.", "A **lookup table** (next module) when the bands change often: change the table, not every formula."]),
        mistakes(["Putting the smallest band first in IFS. The first true test wins, so a small threshold swallows everything above it.", "Forgetting the catch-all `TRUE`. Without it IFS returns #N/A when nothing matches.", "Using `=` comparisons on decimals that come from calculations; round first with ROUND."]),
      ],
      points: ["IFS returns the answer for the first true test, so order matters.", "End IFS with TRUE and a fallback so it never returns #N/A.", "Use SWITCH for exact matches; use a lookup table when the bands change."],
      check: [["In =IFS(B2>=90,\"A\",B2>=75,\"B\",TRUE,\"C\"), what does 80 give?", ["A", "B", "C", "#N/A"], 1, "80 fails the first test and passes the second."], ["Why end an IFS with TRUE?", ["To make it faster", "To catch everything that matched no other test", "To turn on checking", "Excel requires it"], 1, "TRUE is always true, so it works as the 'otherwise' answer."]],
    }),
    topic({
      title: "Errors: expect them, explain them, handle them", slug: "handling-errors",
      blocks: [
        p("An error is not a failure; it is Excel saying *this cannot be worked out*. Advanced users do two things with errors: **read** them to find the cause, and **handle** the ones that are expected."),
        table("What each error is telling you", ["Error", "Meaning", "First thing to check"], [["#DIV/0!", "Dividing by zero or an empty cell", "The cell you divide by"], ["#VALUE!", "Maths on text, or the wrong kind of value", "Numbers stored as text; a heading inside a range"], ["#REF!", "A reference points at a cell that no longer exists", "Deleted rows or columns"], ["#NAME?", "Excel does not know a name", "Spelling of the function"], ["#N/A", "A lookup found nothing", "Whether the key really exists, spelling and spaces"]]),
        example("Cost per unit with a zero", "Cost is in B and units are in C. One item has zero units, so B/C would show #DIV/0! in the middle of a report.", ["Wrap the division: `=IFERROR(B3/C3,\"n/a\")`.", "IFERROR runs the first formula; only if it fails does it show the second value.", "Now a reader sees n/a for that row and real numbers for the others, and totals that skip text keep working."], "Handle the error you **expect**; do not hide errors you do not understand."),
        p("`IFERROR` catches every kind of error, which can hide a real mistake such as a misspelled function. When you only expect a missing lookup, use `IFNA`, which catches #N/A and lets every other error show."),
        list("A safer way to handle errors", ["Find out why the error happens before wrapping it.", "Use IFNA for lookups and IFERROR for divisions.", "Show a clear message such as \"missing\", not a blank cell or a zero that looks real.", "Keep one or two **check cells** that count errors, for example `=SUMPRODUCT(--ISERROR(D2:D100))`, so hidden problems are visible."]),
        warn("Never use IFERROR to make a total look right. If a lookup fails and you replace it with 0, the report adds a wrong number with full confidence."),
        tryIt("A lookup returns #N/A for a product that is not on the price list. Should you hide it with IFERROR(...,0)?", "No. A price of 0 looks real and silently understates the order. Show a clear marker such as \"not on price list\" with IFNA, so someone fixes the list."),
      ],
      points: ["Read the error first; handle only what you expect.", "IFNA is safer than IFERROR for lookups.", "A fake 0 is worse than a visible error."],
      check: [["Which function catches only #N/A?", ["IFERROR", "IFNA", "ISERROR", "IFS"], 1, "IFNA is narrower, so other errors still show."], ["#DIV/0! most often means:", ["A misspelled name", "A divide by zero or an empty cell", "A deleted cell", "A date problem"], 1, "Check the cell you divide by."]],
    }),
    topic({
      title: "Build for the next person: assumptions and checks", slug: "assumptions-and-checks",
      blocks: [
        p("Most spreadsheet disasters are not clever formulas gone wrong; they are **numbers buried inside formulas** that nobody remembers. A tax rate typed as `*0.18` in forty cells cannot be changed safely. Professional models follow a few small rules."),
        table("Habits of a reliable model", ["Habit", "Why it matters"], [["Put every input in its own labelled cell", "Change it once and everything updates"], ["Never type a number inside a formula that is really an assumption", "Hard-coded numbers hide and go stale"], ["Keep inputs, calculations and results visibly separate", "Readers know where to look and what to change"], ["Add a check cell", "A total that must equal another total will shout when it does not"], ["Use one formula per row or column, copied", "Inconsistent formulas are the commonest source of errors"]]),
        example("Move the rate out of the formula", "A sheet multiplies every price by 0.18 for tax. The rate changes next year.", ["Put the rate in its own cell, say B1, with the label *Tax rate*.", "Rewrite each formula as `=B4*$B$1`.", "Add a check cell: the total of the tax column should equal the total price times the rate, for example `=ROUND(SUM(C4:C20)-SUM(B4:B20)*B1,2)` and it should show 0."], "Now one change updates everything, and a nonzero check cell warns you when a formula was overwritten."),
        bars("How often each habit prevents a typical slip (illustrative scale)", [["Inputs in own cells", 9], ["No hard-coded numbers", 8], ["Check cells", 7], ["Consistent formulas", 9]]),
        tip("Use **Formulas > Show Formulas** (Ctrl and the backtick key) to look at the whole sheet as formulas. A formula that looks different from its neighbours is the one to inspect."),
        mistakes(["Typing over a formula with a number 'just this once'. Mark the cell so everyone can see it is a manual override.", "Mixing units (rupees and thousands) in one column.", "Leaving test numbers in the file you send."]),
      ],
      points: ["Inputs go in labelled cells, not inside formulas.", "A check cell turns a silent mistake into a visible one.", "One consistent formula per column is easier to trust."],
      check: [["Where should a tax rate that changes yearly live?", ["Inside every formula", "In its own labelled cell", "In a comment", "In the file name"], 1, "A separate cell lets you change it once."], ["What does a check cell do?", ["Hides errors", "Shows when two numbers that should agree do not", "Formats the sheet", "Locks the sheet"], 1, "It makes a hidden mistake visible."]],
    }),
  ],
  terms: [["Mixed reference", "A reference with a $ on only the column or only the row"], ["IFS", "Tests conditions in order and returns the answer for the first true one"], ["Catch-all", "A final TRUE test that handles everything left over"], ["IFERROR", "Shows a fallback value if a formula returns any error"], ["IFNA", "Shows a fallback only when the error is #N/A"], ["Check cell", "A cell that compares two numbers which should agree"]],
  practical: { title: "Practical: a safe commission sheet", intro: "Make a commission sheet you could hand to a colleague.", steps: ["List six salespeople with sales figures in a column.", "Put the commission bands in cells at the side, not inside the formulas.", "Write the rate formula once and copy it down.", "Add a check cell that recomputes the total commission a second way and shows the difference."] },
  quiz: [
    ["What does the dollar sign do in $A2?", ["Marks money", "Locks column A when the formula is copied", "Locks row 2", "Turns the cell into text"], 1, "The dollar sign locks the part it sits in front of; here that is column A."],
    ["Which tool is best for five commission bands tested in order?", ["Five nested IFs", "IFS", "SUMIF", "ROUND"], 1, "IFS reads in order and avoids a maze of brackets."],
    ["IFS returns #N/A. The likely cause is:", ["A dollar sign", "No test was true and there was no TRUE fallback", "A locked cell", "Too many rows"], 1, "Add TRUE and a fallback answer at the end."],
    ["You expect some lookups to find nothing. Which wrapper is safest?", ["IFERROR(...,0)", "IFNA(...,\"missing\")", "ISBLANK", "ROUND"], 1, "IFNA catches only the expected #N/A and a clear message avoids a fake zero."],
    ["Why is a hard-coded 0.18 inside forty formulas a problem?", ["It is too small", "It cannot be changed safely in one place", "It slows Excel down", "Excel rejects it"], 1, "A number that is really an assumption should live in one labelled cell."],
    ["What does a check cell do?", ["Colours errors", "Shows when numbers that should agree do not", "Protects the sheet", "Prints the sheet"], 1, "It turns a silent mistake into a visible one."],
    ["=$A2*B$1 is copied from B2 to D4. What does it become?", ["=$A2*D$1", "=$A4*D$1", "=$A4*B$1", "=$D4*D$1"], 1, "Rows move for the unlocked row part of the first reference; columns move for the unlocked column part of the second."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 2 */
export const M2 = module_({
  slug: "lookup-and-match", title: "Lookups and matching", hours: 2.5, level: "Core advanced skills",
  summary: "Find values in tables with VLOOKUP, XLOOKUP, INDEX and MATCH, use approximate matches for bands, and avoid the traps that return wrong answers.",
  outcome: "You can pull the right price, rate, name or band from a table for any row, and explain why each lookup works.",
  intro: "Almost every business sheet has a **table you look things up in**: a price list, a tax slab, a staff directory, a grade scale. Typing those values by hand is slow and error-prone. Lookups let one small table feed hundreds of rows, and changing the table changes every answer.",
  topics: [
    topic({
      title: "VLOOKUP: look down a table", slug: "vlookup",
      blocks: [
        p("`VLOOKUP(lookup_value, table, column_number, match_type)` finds a **key** in the **first column** of a table and returns the value from the column you name, in the same row."),
        table("The four parts of VLOOKUP", ["Part", "What to give it", "Example"], [["lookup_value", "The key you are searching for", "A2 (a product code)"], ["table", "The block of cells, with the key in its first column", "$G$2:$I$5"], ["column_number", "Which column of the table to return (1 is the first)", "3 for the price"], ["match_type", "FALSE for an exact match", "FALSE"]]),
        example("Price an order line", "The price list is in G2:I5 (Code, Item, Price). Cell A2 holds the code P3.", ["Item name: `=VLOOKUP(A2,$G$2:$I$5,2,FALSE)` returns Bag.", "Price: `=VLOOKUP(A2,$G$2:$I$5,3,FALSE)` returns 800.", "The table reference is locked with dollar signs so it stays put when you copy the formula down.", "Amount: `=B2*D2` multiplies quantity by the looked-up price."], "Change the price list once and every order line updates."),
        warn("VLOOKUP can only look **right** of the key column. If the key is in column C and the answer is in column A, VLOOKUP cannot do it. That is one reason XLOOKUP and INDEX with MATCH are preferred."),
        mistakes(["Leaving out FALSE. Without it VLOOKUP assumes a sorted table and can return the wrong row quietly.", "Forgetting to lock the table with $. The table slides down as you copy and rows start to return #N/A.", "Counting the column number from the sheet instead of from the table: it is the position **inside the table**.", "Keys with trailing spaces or numbers stored as text: the key looks identical but does not match."]),
        tryIt("Your table is B2:E9 and you need the value in column D. What column number do you give?", "3. Count inside the table: B is 1, C is 2, D is 3."),
      ],
      points: ["VLOOKUP searches the first column and returns from a column you name.", "Always give FALSE for an exact match, and lock the table.", "It cannot look to the left of the key column."],
      check: [["In VLOOKUP(A2,$G$2:$I$5,3,FALSE), what does 3 mean?", ["The third row", "The third column of the table", "Three matches", "Round to 3 places"], 1, "The column number counts inside the table."], ["Why add FALSE?", ["To find an exact match", "To sort the table", "To lock the table", "To hide errors"], 0, "FALSE asks for an exact match."]],
    }),
    topic({
      title: "Approximate match: finding the band", slug: "approximate-match",
      blocks: [
        p("Sometimes you do not want an exact match; you want to know **which band a number falls into**: a discount slab, a tax bracket, a letter grade, a commission tier. For this, use an **approximate match** with `TRUE` (or leave the last value out)."),
        table("A discount table, sorted from smallest to largest", ["Spend from", "Discount"], [["0", "0%"], ["1,000", "5%"], ["5,000", "10%"], ["10,000", "15%"]]),
        p("With TRUE, VLOOKUP looks for the **largest start that is not above** your value, and returns that band's answer. A spend of 2,500 returns 5% (the band starting at 1,000); a spend of exactly 5,000 returns 10%; 12,000 returns 15%."),
        example("Discount slabs", "The band table is in F2:G5, the spend is in B2.", ["Discount: `=VLOOKUP(B2,$F$2:$G$5,2,TRUE)`.", "Amount to pay: `=B2*(1-C2)`.", "Spend 800 returns 0% because the first band starts at 0; spend 12,000 returns 15%."], "Changing a band (say 5% from 1,500) means editing one cell, not every formula."),
        warn("The table **must be sorted ascending** by the first column, and it must start low enough to catch the smallest value. If the first band started at 1,000, a spend of 800 would give #N/A."),
        explorer({ id: "slab-explorer", title: "Where does the spend land?", intro: "Move the spend and watch the band and the amount to pay.", inputs: [{ id: "spend", label: "Spend (rupees)", min: 0, max: 15000, step: 250, value: 2500 }], outputs: [{ label: "Discount", expr: "(5 * min(1, floor(spend / 1000)) + 5 * min(1, floor(spend / 5000)) + 5 * min(1, floor(spend / 10000)))", unit: "pct" }, { label: "To pay", expr: "spend * (1 - (5 * min(1, floor(spend / 1000)) + 5 * min(1, floor(spend / 5000)) + 5 * min(1, floor(spend / 10000))) / 100)", unit: "rs" }] }),
      ],
      points: ["TRUE finds the largest start not above the value.", "The first column must be sorted ascending and start low enough.", "Edit the table, not the formulas, when bands change."],
      check: [["With bands starting at 0, 1000, 5000 and 10000, what band does 5000 fall in?", ["The 1000 band", "The 5000 band", "The 10000 band", "#N/A"], 1, "A value equal to a band start belongs to that band."], ["What breaks an approximate match?", ["A sorted table", "A table that is not sorted ascending", "A locked table", "A number key"], 1, "The method assumes ascending order."]],
    }),
    topic({
      title: "INDEX and MATCH: the flexible pair", slug: "index-match",
      blocks: [
        p("`MATCH(value, range, 0)` tells you the **position** of a value in a list. `INDEX(range, position)` returns the **item** at a position. Together they find anything, in any direction, without counting columns."),
        table("What each one does", ["Function", "Question it answers", "Example", "Result"], [["MATCH", "Where is it in the list?", "=MATCH(\"Bag\",B2:B5,0)", "3"], ["INDEX", "What is at this position?", "=INDEX(C2:C5,3)", "the third price"], ["Together", "What is the price of the Bag?", "=INDEX(C2:C5,MATCH(\"Bag\",B2:B5,0))", "800"]]),
        example("A two-way lookup", "Quarterly sales are in B2:E5. Regions are in A2:A5 and quarters in B1:E1. You want South in Q3.", ["Row: `MATCH(\"South\",A2:A5,0)` gives 2.", "Column: `MATCH(\"Q3\",B1:E1,0)` gives 3.", "Combine them: `=INDEX(B2:E5,MATCH(\"South\",A2:A5,0),MATCH(\"Q3\",B1:E1,0))`.", "INDEX goes to row 2, column 3 of B2:E5 and returns 110."], "Put the region and quarter in input cells and the same formula answers any question."),
        list("Why many experts prefer INDEX and MATCH to VLOOKUP", ["It can return a value to the **left** of the key.", "It does not break when someone inserts a column in the table.", "It can look up across rows and down columns at once.", "MATCH with 0 is always an exact match: there is no TRUE/FALSE to forget."]),
        tip("To find the **name** that goes with the biggest number: `=INDEX(A2:A5,MATCH(MAX(E2:E5),E2:E5,0))`. MAX finds the number, MATCH finds its position, INDEX returns the name."),
        mistakes(["Using ranges of different shapes: the range inside MATCH must line up with the range inside INDEX.", "Forgetting the 0 in MATCH. Without it MATCH guesses with an approximate match.", "Hard-typing the row or column number instead of using MATCH, which breaks when the table is re-sorted."]),
      ],
      points: ["MATCH returns a position; INDEX returns the item at a position.", "Use two MATCHes inside INDEX for a two-way lookup.", "Use MATCH(...,0) so it is always exact."],
      check: [["What does =MATCH(\"Bag\",B2:B5,0) return if Bag is the third item?", ["Bag", "3", "800", "#N/A"], 1, "MATCH returns a position."], ["Which pair finds the name that goes with the largest value?", ["SUM and COUNT", "INDEX and MATCH with MAX", "IF and AND", "LEFT and RIGHT"], 1, "MAX finds the value, MATCH its position, INDEX the name."]],
    }),
    topic({
      title: "XLOOKUP, and choosing the right lookup", slug: "xlookup-and-choosing",
      blocks: [
        p("`XLOOKUP(lookup_value, lookup_range, return_range, if_not_found)` is the modern lookup. It searches one range and returns from another, so the answer can be in **any column**, and it has a built-in answer for \"not found\"."),
        example("Price by item name", "Items are in B2:B5 and prices in C2:C5.", ["`=XLOOKUP(\"Book\",B2:B5,C2:C5)` returns 45.", "Add a fallback: `=XLOOKUP(\"Lamp\",B2:B5,C2:C5,\"not on price list\")` shows the message instead of #N/A.", "The lookup range and the return range can be any two columns, in any order."], "No column numbers to count, no TRUE or FALSE to remember."),
        table("Which lookup should you use?", ["Situation", "Best choice"], [["You have a current Excel with XLOOKUP, and a simple key and answer", "XLOOKUP"], ["You must support older Excel versions or Google Sheets style files", "INDEX and MATCH (or VLOOKUP for a quick job)"], ["The answer is to the left of the key", "XLOOKUP or INDEX and MATCH"], ["You want a band (a slab or grade)", "VLOOKUP with TRUE or MATCH with 1"], ["You need a value at the crossing of a row and a column", "INDEX with two MATCHes"]]),
        warn("The GrowQR practice sheet teaches the lookup ideas with VLOOKUP, INDEX and MATCH, which work in every version of Excel and in other spreadsheet tools. XLOOKUP is available in current Microsoft 365 and Excel 2021 or later; check your version before relying on it in a shared file."),
        list("Three checks before you trust any lookup", ["Does the key really exist in the table (spelling, spaces, numbers stored as text)?", "Is the lookup range exactly the same size as the return range?", "Did you test one row by hand?"]),
        tryIt("A report must run in an office that still uses an old Excel. Which lookup is safest?", "INDEX with MATCH, or VLOOKUP. XLOOKUP is not in older versions."),
      ],
      points: ["XLOOKUP returns from any column and has a not-found answer.", "INDEX with MATCH works everywhere and in any direction.", "Test one row by hand before copying a lookup down."],
      check: [["Which lookup has a built-in answer for 'not found'?", ["VLOOKUP", "XLOOKUP", "MATCH", "INDEX"], 1, "XLOOKUP's fourth value is what to show when nothing matches."], ["A band (like a discount slab) is best found with:", ["VLOOKUP with TRUE", "XLOOKUP with an exact match", "COUNT", "ROUND"], 0, "An approximate match returns the band a number falls into."]],
    }),
  ],
  terms: [["Lookup value", "The key you search for"], ["Table array", "The block of cells a lookup searches"], ["Exact match", "Only a key that is identical counts"], ["Approximate match", "Finds the largest start not above the value, for bands"], ["MATCH", "Returns the position of a value in a list"], ["INDEX", "Returns the item at a position"]],
  practical: { title: "Practical: a staff directory lookup", intro: "Build a small directory and look people up.", steps: ["Create a table of eight staff with an ID, name, department and phone number.", "Add an input cell where a user types an ID.", "Show the name, department and phone with one lookup each.", "Add a fallback message for an ID that does not exist, and test a wrong ID."] },
  quiz: [
    ["VLOOKUP searches:", ["Any column of the table", "The first column of the table", "The last column", "A row"], 1, "It finds the key in the first column and returns from a column you name."],
    ["What does the last value FALSE mean in a VLOOKUP?", ["Round down", "Exact match", "Sort the table", "Ignore errors"], 1, "FALSE asks for an exact match."],
    ["A table of discount bands must be:", ["Sorted descending", "Sorted ascending by the first column", "Sorted by the last column", "Left unsorted"], 1, "Approximate matching assumes ascending order."],
    ["MATCH(\"Bag\",B2:B5,0) returns 3 when Bag is the third item. What does INDEX(C2:C5,3) return?", ["Bag", "The third price", "3", "The first price"], 1, "INDEX returns the item at a position."],
    ["Which is the advantage of INDEX and MATCH over VLOOKUP?", ["It is shorter", "It can return a value to the left of the key", "It always sorts", "It never shows errors"], 1, "VLOOKUP can only return from columns to the right of the key."],
    ["You get #N/A from an exact lookup. What do you check first?", ["The font", "Whether the key exists, including spelling and spaces", "The print setup", "The chart"], 1, "A lookup returns #N/A when it finds no matching key."],
    ["Which function lets you choose a value to show when nothing is found, without wrapping it in another function?", ["VLOOKUP", "XLOOKUP", "MATCH", "SUM"], 1, "XLOOKUP's fourth value is the not-found answer."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 3 */
export const M3 = module_({
  slug: "conditional-analysis", title: "Conditional analysis", hours: 2.5, level: "Core advanced skills",
  summary: "Answer business questions with SUMIFS, COUNTIFS and AVERAGEIFS, rank and extract the top items, and weigh results with SUMPRODUCT.",
  outcome: "You can turn a long table into precise answers: totals, counts and averages for any combination of conditions, plus rankings and shares.",
  intro: "Managers ask questions with **conditions**: *What did the North sell in Pens? How many Book orders were over three units? Who are the top three?* Conditional functions answer them from the raw data, so you never have to sort, filter and add by hand.",
  topics: [
    topic({
      title: "SUMIFS, COUNTIFS and AVERAGEIFS", slug: "ifs-family",
      blocks: [
        p("You met SUMIF and COUNTIF in the basics: one condition. The **IFS family** handles several conditions at once, and every condition must be true for a row to count."),
        table("The IFS family", ["Function", "Answers", "Pattern"], [["SUMIFS", "Total of ... where ...", "=SUMIFS(sum_range, range1, cond1, range2, cond2)"], ["COUNTIFS", "How many rows where ...", "=COUNTIFS(range1, cond1, range2, cond2)"], ["AVERAGEIFS", "Average of ... where ...", "=AVERAGEIFS(avg_range, range1, cond1)"], ["MAXIFS / MINIFS", "Largest or smallest ... where ...", "=MAXIFS(max_range, range1, cond1)"]]),
        example("Five questions, five formulas", "Orders are in A2:D9 (Region, Product, Units, Revenue).", ["North revenue: `=SUMIFS(D2:D9,A2:A9,\"North\")`.", "Pen units sold in the South: `=SUMIFS(C2:C9,B2:B9,\"Pen\",A2:A9,\"South\")`.", "Book orders over 3 units: `=COUNTIFS(B2:B9,\"Book\",C2:C9,\">3\")`.", "Average Pen revenue: `=AVERAGEIFS(D2:D9,B2:B9,\"Pen\")`.", "Largest North order: `=MAXIFS(D2:D9,A2:A9,\"North\")`."], "Each answer is one formula pointing at the raw data, so it updates when the data changes."),
        table("Writing conditions", ["You want", "Write", "Example"], [["Equal to text", "\"North\"", "A2:A9,\"North\""], ["Equal to a cell", "the cell", "A2:A9,F2"], ["Greater than a number", "\">3\"", "C2:C9,\">3\""], ["At least a cell's value", "\">=\"&F2", "C2:C9,\">=\"&F2"], ["Not equal", "\"<>Book\"", "B2:B9,\"<>Book\""]]),
        mistakes(["Ranges of different sizes in one formula give #VALUE!.", "Putting the **sum range last** in SUMIFS: it comes **first** (unlike SUMIF).", "Typing a comparison without quotes, such as >3 instead of \">3\".", "Counting numbers stored as text: the condition silently fails to match."]),
        tryIt("Write a formula for the total revenue of Book orders in the East.", "`=SUMIFS(D2:D9,B2:B9,\"Book\",A2:A9,\"East\")`. The sum range goes first, then a pair for each condition."),
      ],
      points: ["Every condition in an IFS formula must be true for a row to count.", "In SUMIFS the range to add comes first; in COUNTIFS there is none.", "Put comparisons in quotes, and join a cell with &."],
      check: [["In SUMIFS, which argument comes first?", ["The first condition", "The range to add", "The criteria cell", "A sheet name"], 1, "SUMIFS starts with the range whose numbers are added."], ["What does COUNTIFS(B2:B9,\"Book\",C2:C9,\">3\") count?", ["Book rows or rows over 3", "Rows that are Book and over 3 units", "All rows", "Only text"], 1, "Every condition has to be true for the same row."]],
    }),
    topic({
      title: "Ranking and the top N", slug: "ranking",
      blocks: [
        p("Rankings answer *who is first?* and *who are the top three?* Three functions do the work, and INDEX with MATCH turns the answers into names."),
        table("Ranking tools", ["Function", "What it does", "Example"], [["RANK", "The position of a value in a list (1 is highest)", "=RANK(B2,$B$2:$B$8)"], ["LARGE", "The k-th biggest value", "=LARGE($B$2:$B$8,2)"], ["SMALL", "The k-th smallest value", "=SMALL($B$2:$B$8,1)"]]),
        example("The top three students", "Scores are in B2:B8.", ["Rank for each student: `=RANK(B2,$B$2:$B$8)`, with the range locked.", "The three highest scores: `=LARGE($B$2:$B$8,1)`, then 2, then 3.", "The name for the first score: `=INDEX($A$2:$A$8,MATCH(E2,$B$2:$B$8,0))`.", "Copy down to get all three names."], "A live leaderboard that updates when a score changes."),
        warn("If two people tie, RANK gives them the same rank and MATCH finds only the first match for the score. For a leaderboard where ties are possible, add a tiny tie-breaker (for example the row number divided by a million) to the scores in a helper column."),
        tip("Lock the range inside RANK (`$B$2:$B$8`). If it slides down, each row ranks against a different, shrinking list."),
      ],
      points: ["RANK shows a position; LARGE and SMALL show values.", "INDEX with MATCH turns a top value into a name.", "Lock the ranked range; ties need a tie-breaker."],
      check: [["Which function gives the second biggest value?", ["RANK", "LARGE with k=2", "SMALL with k=2", "MAX"], 1, "LARGE(range,2) is the second largest."], ["Why lock the range in RANK?", ["To colour it", "So every row ranks against the whole list", "To sort it", "To hide it"], 1, "Otherwise the range slides as you copy the formula down."]],
    }),
    topic({
      title: "Weights, shares and SUMPRODUCT", slug: "weights-and-shares",
      blocks: [
        p("`SUMPRODUCT(range1, range2)` multiplies matching cells and adds the results: perfect for **weighted averages**, totals of price times quantity, and conditional sums over several ranges."),
        example("A weighted grade", "Maths counts 40%, Science 30% and English 30%. The scores are 80, 70 and 90.", ["Weights in B2:B4, scores in C2:C4.", "`=SUMPRODUCT(B2:B4,C2:C4)` calculates 0.4*80 + 0.3*70 + 0.3*90.", "The result is 32 + 21 + 27 = 80."], "A simple average (80) happens to match here; change one weight and they differ."),
        formula("Share of a total", "share = value / SUM($B$9:$B$11)", "Lock the total with dollar signs so every row divides by the same number. Format the result as a percentage."),
        table("Units sold and each product's share", ["Product", "Units", "Share"], [["Pen", "40", "40%"], ["Book", "35", "35%"], ["Bag", "25", "25%"]]),
        explorer({ id: "weight-explorer", title: "Change the weights", intro: "Move the weights and see the weighted grade change.", inputs: [{ id: "w1", label: "Maths weight (%)", min: 0, max: 100, step: 5, value: 40 }, { id: "w2", label: "Science weight (%)", min: 0, max: 100, step: 5, value: 30 }], outputs: [{ label: "English weight (what is left)", expr: "100 - w1 - w2", unit: "pct" }, { label: "Weighted grade (scores 80, 70, 90)", expr: "(w1 * 80 + w2 * 70 + (100 - w1 - w2) * 90) / 100", unit: "n" }] }),
        mistakes(["Weights that do not add to 100%: always check with SUM.", "Ranges of different sizes in SUMPRODUCT.", "A share formula with an unlocked total, which gives a different denominator in every row."]),
      ],
      points: ["SUMPRODUCT multiplies matching cells and adds them.", "Weights should add to 100%.", "A share divides by a locked total and is formatted as a percentage."],
      check: [["What does SUMPRODUCT(B2:B4,C2:C4) do?", ["Adds B and C", "Multiplies matching cells and adds the products", "Counts cells", "Averages B"], 1, "It pairs the cells up, multiplies each pair and adds."], ["Weights of 40%, 30% and 20% add to:", ["100%", "90%", "110%", "70%"], 1, "They should add to 100%, so something is missing."]],
    }),
  ],
  terms: [["SUMIFS", "Adds numbers in rows where every condition is true"], ["COUNTIFS", "Counts rows where every condition is true"], ["Criteria", "The condition a row must meet, such as \">3\""], ["RANK", "Position of a value in a list"], ["LARGE", "The k-th largest value"], ["SUMPRODUCT", "Multiplies matching cells and adds the results"]],
  practical: { title: "Practical: a sales scorecard", intro: "Answer questions from a table of at least twelve orders.", steps: ["Create orders with region, product, units and revenue.", "Write five questions and answer each with the right IFS function.", "Add a rank for each region by total revenue.", "Add each region's share of the company total, formatted as a percentage."] },
  quiz: [
    ["Which function totals revenue where Region is North and Product is Pen?", ["SUMIF", "SUMIFS", "COUNTIFS", "RANK"], 1, "Two conditions need SUMIFS."],
    ["Where does the range to add go in SUMIFS?", ["Last", "First", "In the middle", "It is not needed"], 1, "SUMIFS puts the sum range first."],
    ["How do you write the condition 'more than 3'?", [">3", "\">3\"", "=3", "\"more\""], 1, "Comparisons are written in quotes: \">3\"."],
    ["=RANK(B2,$B$2:$B$8) is copied down. Why are the dollar signs there?", ["To format money", "So every row ranks against the same list", "To sort the list", "They are optional decoration"], 1, "Without them the list would slide as the formula is copied."],
    ["Which function gives the third largest value?", ["LARGE(range,3)", "SMALL(range,3)", "RANK", "MAX"], 0, "LARGE(range,k) returns the k-th largest."],
    ["SUMPRODUCT(B2:B4,C2:C4) with weights 0.4, 0.3, 0.3 and scores 80, 70, 90 gives:", ["80", "240", "0.3", "70"], 0, "32 + 21 + 27 = 80."],
    ["Why must the total be locked in a share formula?", ["To change the colour", "So each row divides by the same total", "To protect it", "To sort it"], 1, "An unlocked total slides and gives wrong shares."],
  ],
});
