// Premium kit 1: The Plans Past Five Hobby Era Kit. Original content only.
import {
  D,
  floaty,
  box,
  lines,
  dots,
  ck,
  fill,
  rate,
  sec,
  checklist,
  bullets,
  steps,
  note,
  page,
  cover,
  cardPages,
  monthGrid,
} from "../../printables/_generator/lib.mjs";
import { menu, days, starters, starterCard } from "../../printables/_generator/free.mjs";

const KIT = "Hobby Era Kit";
const doodles = (a = "flower") =>
  `${floaty[a]("right:0.8in;top:1.05in;width:1in;color:#b83f43;transform:rotate(12deg)")}${floaty.sparkle("right:1.9in;top:2.1in;width:0.4in;color:#b83f43")}${floaty.star("right:0.7in;top:2.55in;width:0.3in;color:#394d3c")}`;
const kc = (n, title, dek, inside, tone = "t-butter", a = "flower") =>
  cover({
    kicker: `${KIT} · file ${n}`,
    title,
    dek,
    badge: "Hobby Era Kit",
    tone,
    doodles: doodles(a),
    hand: "being good at it is completely optional",
    footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">${inside}</p>`,
  });
const tones = ["t-butter-s", "t-strawberry-s", "t-matcha-s", "t-sunday-s"];

/* 01 ------------------------------------------------------------------ */
const discovery = {
  file: "01-hobby-discovery-workbook.html",
  title: "Hobby Discovery Workbook",
  pages: [
    kc(
      "01",
      "Hobby<br>Discovery<br>Workbook",
      "A ten-page guided process for finding the hobby that fits your real life, then testing it cheaply before you commit.",
      "Free-time audit · Energy map · Cravings · The Hobby Menu · Experiment plans · Scorecards · Your hobby era plan",
    ),
    page(
      "How to use this workbook",
      "Work through it in order over a week or two, or jump to the page you need. Print once, write in pencil, reprint freely for personal use.",
      `
      <div class="grid g2" style="gap:0.3in"><div>${steps(["<b>Audit your life.</b> Time, energy, money and space, honestly.", "<b>Map your cravings.</b> What do you want a hobby to give you?", "<b>Browse and rate the menu.</b> Thirty-six ideas, one score each.", "<b>Design experiments.</b> Six small trials with a plan, a cap and a date.", "<b>Score what happened</b> and decide: keep, pause or swap.", "<b>Write your hobby era plan.</b> A season-long plan you'll actually follow."])}</div>
      <div class="stack">${note("<b>Pencil tip:</b> rate things quickly. First instincts are more useful than careful ones.")}${box("Why I picked up this kit", { n: 4, tone: "t-strawberry-s" })}${box("By the end I'd love to have&hellip;", { n: 4 })}</div></div>
      <p class="hand" style="font-size:20pt;text-align:center;margin-top:0.3in">fewer meetings. more hobbies.</p>`,
      { hand: "start here" },
    ),
    page(
      "Free-time audit",
      "Where does your week really go, and where could a hobby live? Shade the hours that are genuinely free.",
      `
      <table class="tbl tall"><thead><tr><th></th>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => `<th>${d}</th>`).join("")}</tr></thead><tbody>
      ${["Early morning", "Lunch", "After work", "Evening", "Late"].map((r) => `<tr><td><b>${r}</b></td>${"<td></td>".repeat(7)}</tr>`).join("")}</tbody></table>
      <div class="grid g3 mt2" style="gap:0.16in">${box("Total free hours I can honestly use", { n: 1 })}${box("My best time of day", { n: 1 })}${box("Time that is always busy", { n: 1 })}</div>
      <div class="grid g2 mt2" style="gap:0.2in">
        <div class="box t-butter-s"><span class="lbl">Money</span>${checklist(["Almost free", "A coffee-sized budget", "A modest monthly budget", "Happy to invest in the right thing"], { cls: "tight" })}<p class="mt1">Monthly cap: ${fill("s")}</p></div>
        <div class="box t-matcha-s"><span class="lbl">Space</span>${checklist(["Kitchen table", "A dedicated corner", "Outside", "Only out of the house"], { cls: "tight" })}</div>
      </div>${box("What I'd give up (or move) to make room", { n: 3, cls: "mt2" })}`,
      { hand: "be honest" },
    ),
    page(
      "Energy map",
      "Different hobbies need different energy. Rate your usual energy at each time and match hobbies to it.",
      `
      <table class="tbl tall"><thead><tr><th style="width:22%">Time</th><th>Wiped out</th><th>Low</th><th>Fine</th><th>Great</th><th style="width:24%">Hobby type that suits</th></tr></thead><tbody>
      ${["Weekday morning", "After work", "Weekday evening", "Saturday morning", "Saturday afternoon", "Sunday"].map((r) => `<tr><td><b>${r}</b></td><td>${ck(true)}</td><td>${ck(true)}</td><td>${ck(true)}</td><td>${ck(true)}</td><td></td></tr>`).join("")}</tbody></table>
      <div class="grid g3 mt2" style="gap:0.16in">
        <div class="t-sunday-s" style="padding:0.14in;border-radius:3px"><h3 class="sec">Low energy</h3><p class="small">Puzzles, coloring, listening, simple crochet, tending plants, journaling.</p></div>
        <div class="t-butter-s" style="padding:0.14in;border-radius:3px"><h3 class="sec">Medium energy</h3><p class="small">Painting, baking, collage, sketching, walking, board games.</p></div>
        <div class="t-matcha-s" style="padding:0.14in;border-radius:3px"><h3 class="sec">High energy</h3><p class="small">Racquet sports, skating, hiking, dance, classes with new people.</p></div></div>
      ${box("My energy pattern in one sentence", { n: 2, cls: "mt2", tall: true })}${box("Hobbies that fit it", { n: 3, cls: "mt2 t-strawberry-s" })}`,
      { hand: "match the hobby to the mood" },
    ),
    page(
      "Cravings and values",
      "Underneath every hobby is a feeling you're after. Rank these from 1 (most wanted) to 8.",
      `
      <div class="grid g4" style="gap:0.1in">${["Calm", "Making something", "Moving", "Company", "Learning", "Fresh air", "Silliness", "Solitude"].map((l, i) => `<div class="${["t-sunday", "t-butter", "t-matcha", "t-strawberry"][i % 4]}" style="padding:0.2in 0.08in 0.12in;border-radius:3px;text-align:center;font-family:var(--display);font-style:italic;font-weight:600;font-size:12pt;color:var(--ink)">${l}<div style="margin:0.1in auto 0;width:0.4in;border-bottom:1pt solid var(--cherry);height:0.25in"></div></div>`).join("")}</div>
      <div class="grid g2 mt3" style="gap:0.2in">${box("Three moments I felt most like myself", { n: 4 })}${box("What I envy when I see other people's hobbies", { n: 4 })}${box("A hobby I was told I wasn't good enough for", { n: 4 })}${box("What would feel like a win in six months", { n: 4, tone: "t-butter-s" })}</div>
      ${box("My three cravings, in my own words", { n: 3, cls: "mt2 t-strawberry-s", tall: true })}`,
      { hand: "feelings first" },
    ),
    page(
      "The Hobby Menu",
      "Rate every idea: 0 = no thanks, 1 = maybe, 2 = curious, 3 = yes please. Add up each section to see where your interest lives.",
      `
      <div class="grid g2" style="gap:0.14in 0.2in">${menu.map(([n, items], i) => `<div class="${tones[i % 4]}" style="padding:0.09in 0.14in;border-radius:3px"><h3 class="sec">${D.star()}${n}</h3>${items.map((it) => `<div style="display:flex;justify-content:space-between;padding:0.03in 0;border-bottom:0.5pt solid rgba(72,54,46,0.15);font-size:9.5pt"><span>${it}</span><span style="letter-spacing:0.15em;color:var(--cherry)">0 1 2 3</span></div>`).join("")}<p class="small mt1" style="text-align:right"><b>Section total:</b> ${fill("s")}</p></div>`).join("")}</div>
      <div class="box mt2"><span class="lbl">My top five by score</span>${lines(2)}</div>`,
      { hand: "score fast" },
    ),
    page(
      "Experiment plan: trials 1 to 3",
      "Each experiment is small, cheap and has an end date. Write it down so it actually happens.",
      `${[1, 2, 3].map((n) => `<div class="box ${tones[n - 1]}" style="margin-bottom:0.13in"><span class="lbl">Experiment ${n}</span><div class="grid g2" style="gap:0.05in 0.3in;margin-top:0.07in"><p>Hobby: ${fill("l")}</p><p>Date and time: ${fill()}</p><p>The question I'm testing: ${fill("l")}</p><p>Spending cap: ${fill("s")}</p><p>First tiny step: ${fill("l")}</p><p>With whom: ${fill()}</p><p>I'll use what I own: ${fill("l")}</p><p>Backup if I flake: ${fill()}</p></div></div>`).join("")}${note("A fair test is <b>two sessions</b>. The first one is usually clumsy, the second one tells you the truth.")}`,
      { hand: "three small tests" },
    ),
    page(
      "Experiment plan: trials 4 to 6",
      "Another round, or the same hobbies at a different time or with different company.",
      `${[4, 5, 6].map((n) => `<div class="box ${tones[n % 4]}" style="margin-bottom:0.13in"><span class="lbl">Experiment ${n}</span><div class="grid g2" style="gap:0.05in 0.3in;margin-top:0.07in"><p>Hobby: ${fill("l")}</p><p>Date and time: ${fill()}</p><p>The question I'm testing: ${fill("l")}</p><p>Spending cap: ${fill("s")}</p><p>First tiny step: ${fill("l")}</p><p>With whom: ${fill()}</p><p>I'll use what I own: ${fill("l")}</p><p>Backup if I flake: ${fill()}</p></div></div>`).join("")}${box("What I'd do differently from the first round", { n: 3 })}`,
      { hand: "round two" },
    ),
    page(
      "Trial scorecard",
      "Score every trial straight after you finish, while it's still fresh. Rate 1 (nope) to 5 (loved it).",
      `
      <table class="tbl tall"><thead><tr><th style="width:24%">Hobby</th><th>Looked forward</th><th>Enjoyed it</th><th>Easy to start</th><th>Fits budget</th><th>Fits my week</th><th>Total</th></tr></thead><tbody>${Array.from(
        { length: 8 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`)
        .join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">${box("The surprise winner", { n: 3, tone: "t-butter-s" })}${box("The one I was sure I'd love, but didn't", { n: 3 })}</div>`,
      { hand: "scores don't lie" },
    ),
    page(
      "Your hobby era plan",
      "Pick your keepers, then turn them into a season plan with real days and a small budget.",
      `
      <div class="grid g3" style="gap:0.14in">${[
        ["Keep", "t-matcha-s"],
        ["Pause", "t-butter-s"],
        ["Swap", "t-strawberry-s"],
      ]
        .map(([t, c]) => `<div class="box ${c}"><span class="lbl">${t}</span>${lines(4)}</div>`)
        .join("")}</div>
      <div class="box mt2 t-butter-s"><span class="lbl">My hobby era statement</span><p class="ital" style="font-size:15pt;margin-top:0.1in;color:var(--ink)">This season I'm into ${fill("l")}</p></div>
      <table class="tbl tall mt2"><thead><tr><th style="width:26%">Hobby</th><th>Day and time</th><th>Where</th><th style="width:18%">Monthly cap</th></tr></thead><tbody>${[1, 2, 3].map(() => `<tr><td></td><td></td><td></td><td></td></tr>`).join("")}</tbody></table>
      ${box("My review date (put it in the calendar)", { n: 1, cls: "mt2" })}`,
      { hand: "this is your era" },
    ),
  ],
};

/* 02 ------------------------------------------------------------------ */
const worksheets = {
  file: "02-interest-worksheets.html",
  title: "Interest Worksheets",
  pages: [
    kc(
      "02",
      "Interest<br>Worksheets",
      "Six one-page tools for digging into what you like: profiles, session logs, comparisons and a curiosity map. Print as many copies as you need.",
      "Hobby profile · Try-it log · Curiosity map · Stick-with-it scorecard · Compare two hobbies · Skill ladder",
      "t-strawberry",
      "bow",
    ),
    page(
      "Hobby profile",
      "One page per hobby you're seriously considering. Print a fresh one for each.",
      `
      <div class="box t-butter-s"><p>Hobby: ${fill("l")} &nbsp; Date: ${fill("s")}</p></div>
      <div class="grid g2 mt2" style="gap:0.18in">${box("What draws me to it", { n: 3 })}${box("What I already know about it", { n: 3 })}${box("What I'd need (the minimum)", { n: 3, tone: "t-matcha-s" })}${box("What worries me", { n: 3, tone: "t-strawberry-s" })}${box("Who could teach me or join me", { n: 3 })}${box("Where I'd do it", { n: 3 })}</div>
      <div class="box mt2"><span class="lbl">Fit check</span><div class="grid g3 mt1" style="gap:0.1in">${["Time", "Money", "Energy", "Space", "Company", "Joy"].map((x) => `<p>${x} ${rate()}</p>`).join("")}</div></div>
      ${box("My first tiny step", { n: 2, cls: "mt2 t-butter-s", tall: true })}`,
      { hand: "know before you go" },
    ),
    page(
      "Try-it log",
      "Fill this in right after a session. Five minutes. Print a stack.",
      `
      <div class="box t-strawberry-s"><p>Hobby: ${fill("l")} &nbsp; Date: ${fill("s")} &nbsp; Minutes: ${fill("s")} &nbsp; Spent: ${fill("s")}</p></div>
      <div class="grid g2 mt2" style="gap:0.18in"><div class="box"><span class="lbl">How I felt before</span>${checklist(["Tired", "Restless", "Okay", "Excited"], { cls: "tight" })}</div><div class="box"><span class="lbl">How I felt after</span>${checklist(["Tired", "Calm", "Proud", "Energized"], { cls: "tight" })}</div></div>
      <div class="grid g2 mt2" style="gap:0.18in">${box("The best five minutes", { n: 3, tone: "t-butter-s" })}${box("The most frustrating bit", { n: 3 })}${box("What I learned", { n: 3 })}${box("What I'd try next time", { n: 3, tone: "t-matcha-s" })}</div>
      <div class="box mt2"><span class="lbl">Overall</span><p class="mt1">Enjoyment ${rate()} &nbsp;&nbsp; Ease ${rate()} &nbsp;&nbsp; Do it again? ${ck(true)} Yes ${ck(true)} Maybe ${ck(true)} No</p></div>
      <div class="box mt2"><span class="lbl">A photo or a scrap from today</span><div class="dots" style="--n:5"></div></div>`,
      { hand: "log it while it's fresh" },
    ),
    page(
      "Curiosity map",
      "Write what you're curious about in the middle, then branch out. No filtering, no judging.",
      `
      <div style="position:relative;height:6.6in;border:0.9pt dashed rgba(184,63,67,0.4);border-radius:3px">
        <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1.9in;height:1.9in;border-radius:50%;background:#f8e5a3;display:grid;place-items:center;text-align:center;font-family:var(--display);font-style:italic;font-weight:600;font-size:14pt;color:var(--cherry)">I'm curious about&hellip;</div>
        ${[
          [8, 8],
          [38, 3],
          [68, 8],
          [3, 40],
          [73, 40],
          [8, 74],
          [38, 80],
          [68, 74],
        ]
          .map(
            ([x, y], i) =>
              `<div style="position:absolute;left:${x}%;top:${y}%;width:24%;height:0.95in;border:0.9pt solid rgba(184,63,67,0.45);border-radius:20px;background:${["#fff8ef", "#f4d4d7", "#c9ddec", "#b5c19c"].map((c) => c)[i % 4]}66"></div>`,
          )
          .join("")}
      </div>
      <div class="grid g2 mt2" style="gap:0.18in">${box("The theme I notice", { n: 2 })}${box("The branch I'll explore first", { n: 2, tone: "t-butter-s" })}</div>`,
      { hand: "follow the threads" },
    ),
    page(
      "Will I stick with it?",
      "Run each hobby through ten quick questions after your second try. Seven or more yeses is a keeper.",
      `
      <table class="tbl tall"><thead><tr><th>Question</th><th style="width:15%">Hobby A</th><th style="width:15%">Hobby B</th><th style="width:15%">Hobby C</th></tr></thead><tbody>
      ${["Did I look forward to it?", "Would I do it on a tired Tuesday?", "Did time go by faster than usual?", "Did I think about it afterwards?", "Is the setup easy?", "Can I afford to keep doing it?", "Does it fit my regular week?", "Do I like the people around it?", "Do I feel better afterwards?", "Do I want to get better at it?"].map((q) => `<tr><td>${q}</td><td>${ck()}</td><td>${ck()}</td><td>${ck()}</td></tr>`).join("")}
      <tr><td><b>Total yeses</b></td><td></td><td></td><td></td></tr></tbody></table>
      ${box("What the scores say, and what my gut says", { n: 3, cls: "mt2 t-strawberry-s" })}`,
      { hand: "seven or more is a keeper" },
    ),
    page(
      "Compare two hobbies",
      "Torn between two? Put them side by side and score the things that matter.",
      `
      <table class="tbl tall"><thead><tr><th style="width:30%">Question</th><th>Hobby 1: ${fill("s")}</th><th>Hobby 2: ${fill("s")}</th></tr></thead><tbody>
      ${["Cost to start", "Cost to keep going", "Time per session", "Setup effort", "Mess level", "Social or solo", "Feels like play", "Room to improve", "Weather or season limits"].map((q) => `<tr><td><b>${q}</b></td><td></td><td></td></tr>`).join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.18in">${box("Winner, for now", { n: 2, tone: "t-butter-s" })}${box("When I'll revisit the other", { n: 2 })}</div>`,
      { hand: "two enter, one stays (for now)" },
    ),
    page(
      "Skill ladder",
      "Break a hobby into small, satisfying steps so progress is visible. Climb from the bottom.",
      `
      <div class="box t-butter-s"><p>Hobby: ${fill("l")}</p></div>
      <div style="margin-top:0.2in">${[
        ["Rung 5", "Share or teach something"],
        ["Rung 4", "Make something for someone"],
        ["Rung 3", "Try a technique that scares me"],
        ["Rung 2", "Finish a small project"],
        ["Rung 1", "Show up and make the first mark"],
      ]
        .map(
          ([r, t], i) =>
            `<div style="display:grid;grid-template-columns:1in 1fr 0.22in;gap:0.14in;align-items:center;margin:0.1in 0 0.1in ${i * 0.0}in;padding:0.12in 0.18in;border-radius:3px;background:${["#c9ddec", "#f4d4d7", "#f8e5a3", "#b5c19c", "#f4d4d7"][i]}66"><span class="kicker">${r}</span><div><b>${t}</b>${lines(1)}</div>${ck()}</div>`,
        )
        .join("")}</div>
      ${box("The step I'm on right now", { n: 2, cls: "mt2" })}`,
      { hand: "one rung at a time" },
    ),
  ],
};

/* 03 ------------------------------------------------------------------ */
const budget = {
  file: "03-hobby-budget-planner.html",
  title: "Hobby Budget Planner",
  pages: [
    kc(
      "03",
      "Hobby<br>Budget<br>Planner",
      "Keep hobbies joyful and affordable. Set a monthly cap, track every purchase and work out what each hobby actually costs per use.",
      "Monthly planner · Purchase tracker · Cost per use · Wishlist with wait rule · Year at a glance",
      "t-matcha",
      "flower",
    ),
    page(
      "Monthly hobby budget",
      "Decide the number first, then spend inside it. A cap protects the joy.",
      `
      <div class="grid g3" style="gap:0.14in"><div class="box t-butter-s"><span class="lbl">Month</span>${lines(1)}</div><div class="box t-strawberry-s"><span class="lbl">My cap</span>${lines(1)}</div><div class="box t-matcha-s"><span class="lbl">Left at the end</span>${lines(1)}</div></div>
      <table class="tbl tall mt2"><thead><tr><th>Category</th><th style="width:20%">Planned</th><th style="width:20%">Actual</th><th style="width:20%">Difference</th></tr></thead><tbody>${["Supplies and materials", "Classes or workshops", "Entry fees and tickets", "Snacks and drinks", "Gifts and shared costs", "Storage and tools", "Other"].map((c) => `<tr><td>${c}</td><td></td><td></td><td></td></tr>`).join("")}<tr><td><b>Total</b></td><td></td><td></td><td></td></tr></tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">${box("Where I saved this month", { n: 3, tone: "t-matcha-s" })}${box("One thing I'll adjust next month", { n: 3 })}</div>`,
      { hand: "cap first, spend second" },
    ),
    page(
      "Supplies and purchase tracker",
      "Write it down at the moment you buy it. Mark whether you actually used it within a month.",
      `
      <table class="tbl tall"><thead><tr><th>Date</th><th style="width:30%">What I bought</th><th>For</th><th>Where</th><th>Cost</th><th>Used it?</th></tr></thead><tbody>${Array.from(
        { length: 12 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td></td><td></td><td>${ck()}</td></tr>`)
        .join("")}</tbody></table>
      ${box("Purchases I regret, and what they taught me", { n: 2, cls: "mt2 t-strawberry-s" })}`,
      { hand: "write it down" },
    ),
    page(
      "Cost per use",
      "A rough sum that stops impulse buys: total spent on a hobby divided by the number of sessions. Lower is better.",
      `
      <table class="tbl tall"><thead><tr><th style="width:26%">Hobby</th><th>Total spent</th><th>Sessions</th><th>Cost per session</th><th>Worth it?</th></tr></thead><tbody>${Array.from(
        { length: 8 },
      )
        .map(
          () => `<tr><td></td><td></td><td></td><td></td><td>${ck(true)} Y ${ck(true)} N</td></tr>`,
        )
        .join("")}</tbody></table>
      ${note("<b>How to do the sum:</b> total spent &divide; sessions = cost per session. A pricey hobby you do weekly can cost less per use than a cheap one you did once.")}
      ${box("What my numbers tell me", { n: 3, cls: "mt2" })}`,
      { hand: "the math of joy" },
    ),
    page(
      "Wishlist with a wait rule",
      "Everything goes here first. If you still want it after seven days, and you've used what you have, buy it.",
      `
      <table class="tbl tall"><thead><tr><th style="width:28%">Item</th><th>Added</th><th>Buy on</th><th>Why I want it</th><th style="width:12%">Own something similar?</th><th>Bought</th></tr></thead><tbody>${Array.from(
        { length: 10 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td></td><td></td><td>${ck()}</td></tr>`)
        .join("")}</tbody></table>
      <div class="note mt2"><b>Thrift test:</b> can I borrow it, buy it used or make do with something I own first?</div>`,
      { hand: "wait seven days" },
    ),
    page(
      "The year at a glance",
      "Total the monthly spend and look for patterns across the year.",
      `
      <table class="tbl tall"><thead><tr><th>Month</th><th>Cap</th><th>Spent</th><th style="width:40%">Notes</th></tr></thead><tbody>${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => `<tr><td><b>${m}</b></td><td></td><td></td><td></td></tr>`).join("")}<tr><td><b>Year</b></td><td></td><td></td><td></td></tr></tbody></table>`,
      { hand: "zoom out" },
    ),
  ],
};

/* 04 ------------------------------------------------------------------ */
const dayLog = (from, to) =>
  days
    .slice(from, to)
    .map(
      ([t, p], i) =>
        `<div class="dayrow" style="grid-template-columns:0.45in 1fr 1.3in;padding:0.06in 0"><span class="n">${from + i + 1}</span><div class="p"><b>${t}</b><span>${p}</span><div style="border-bottom:0.6pt solid var(--rule);height:0.2in"></div></div><div class="small">mins ${fill("s")}<br>mood ${rate()}</div></div>`,
    )
    .join("");
const challenge = {
  file: "04-30-day-challenge-journal.html",
  title: "30-Day Challenge Journal",
  pages: [
    kc(
      "04",
      "30-Day<br>Challenge<br>Journal",
      "The deluxe version of the free challenge: a prompt for every day with space for minutes, mood and a note, plus weekly check-ins and a wrap-up.",
      "Set-up · Days 1 to 10 · Days 11 to 20 · Days 21 to 30 · Weekly check-ins · The wrap-up",
      "t-strawberry",
      "bow",
    ),
    page(
      "Set up your 30 days",
      "Choose your hobby, your slot and your support, so day one is easy.",
      `
      <div class="grid g2" style="gap:0.25in"><div class="stack">${box("My hobby for the month", { n: 2, tone: "t-butter-s", tall: true })}<div class="box"><p>Start: ${fill()}</p><p class="mt1">End: ${fill()}</p><p class="mt1">Daily slot: ${fill()}</p><p class="mt1">Minimum session: ${fill("s")} minutes</p></div>${box("My why", { n: 3 })}</div>
      <div class="stack">${steps(["Pick a slot you can protect, even if it's only 15 minutes.", "Put out supplies the night before.", "Follow the prompt for the day. Swap any that don't fit.", "Log minutes and mood. Notice the pattern."])}${box("My reward at day 30", { n: 2, tone: "t-strawberry-s" })}${box("Who I'll tell", { n: 1 })}</div></div>
      <div class="grid g3 mt2" style="gap:0.16in"><p><b>Week 1: Show up.</b> Make it easy and small.</p><p><b>Week 2: Play.</b> Experiment and be silly.</p><p><b>Weeks 3 and 4: Stretch and own it.</b> Go a little deeper.</p></div>`,
      { hand: "day one is the hardest" },
    ),
    page(
      "Days 1 to 10",
      "Show up and play.",
      `<div>${dayLog(0, 10)}</div>${box("Week 1 check-in: what's working?", { n: 2, cls: "mt1 t-butter-s" })}`,
      { hand: "keep it tiny" },
    ),
    page(
      "Days 11 to 20",
      "Play and stretch.",
      `<div>${dayLog(10, 20)}</div>${box("Week 2 check-in: what do I want more of?", { n: 2, cls: "mt1 t-strawberry-s" })}`,
      { hand: "halfway there" },
    ),
    page(
      "Days 21 to 30",
      "Stretch and own it.",
      `<div>${dayLog(20, 30)}</div>${box("Week 4 check-in: what am I proud of?", { n: 2, cls: "mt1 t-matcha-s" })}`,
      { hand: "nearly done" },
    ),
    page(
      "The wrap-up",
      "Look back across the thirty days and decide what comes next.",
      `
      <div class="box"><span class="lbl">My 30 days</span><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:0.07in;margin-top:0.1in">${Array.from(
        { length: 30 },
      )
        .map(
          (_, i) =>
            `<div style="aspect-ratio:1;border:1pt solid var(--cherry);border-radius:50%;display:grid;place-items:center;font-size:8.5pt;color:var(--cherry);font-weight:700">${i + 1}</div>`,
        )
        .join(
          "",
        )}</div><p class="small mt1">Sessions done: ${fill("s")} &nbsp; Total minutes: ${fill("s")} &nbsp; Best day: ${fill("s")}</p></div>
      <div class="grid g2 mt2" style="gap:0.2in">${box("The best session was&hellip;", { n: 3, tone: "t-butter-s" })}${box("The hardest part was&hellip;", { n: 3 })}${box("What I'd keep doing", { n: 3, tone: "t-matcha-s" })}${box("What I'd drop", { n: 3 })}</div>
      ${box("My plan for next month", { n: 3, cls: "mt2 t-strawberry-s" })}`,
      { hand: "look what you did" },
    ),
  ],
};

/* 05 ------------------------------------------------------------------ */
const months = [
  ["January", "Fresh starts and cozy beginnings"],
  ["February", "Make something for someone you love"],
  ["March", "Spring cleaning for your creativity"],
  ["April", "Get outside and notice things"],
  ["May", "Try something with friends"],
  ["June", "Long evenings, small adventures"],
  ["July", "Slow summer projects"],
  ["August", "Learn a new skill"],
  ["September", "A new school-year energy"],
  ["October", "Cozy crafts and candles"],
  ["November", "Gratitude, baking and gathering"],
  ["December", "Handmade gifts and quiet rest"],
];
const calendar = {
  file: "05-monthly-hobby-calendar.html",
  title: "Monthly Hobby Calendar",
  pages: [
    kc(
      "05",
      "Monthly<br>Hobby<br>Calendar",
      "A year of undated calendar pages. Write in the dates, theme each month and make sure hobby time makes it into your real life.",
      "Year at a glance · Twelve monthly pages with themes, habit trackers and goals",
      "t-sunday",
      "flower",
    ),
    page(
      "Year at a glance",
      "Plan one hobby per month, or one that carries through. Write the theme and the date you'll start.",
      `
      <table class="tbl tall"><thead><tr><th style="width:18%">Month</th><th>Hobby or theme</th><th style="width:30%">Big plan</th></tr></thead><tbody>${months.map(([m]) => `<tr><td><b>${m}</b></td><td></td><td></td></tr>`).join("")}</tbody></table>`,
      { hand: "twelve little eras" },
    ),
    ...months.map(([m, t], i) =>
      page(
        m,
        t + ".",
        `
      <div class="grid g3" style="gap:0.14in"><div class="box ${tones[i % 4]}"><span class="lbl">Hobby of the month</span>${lines(1)}</div><div class="box"><span class="lbl">Monthly goal</span>${lines(1)}</div><div class="box"><span class="lbl">Budget</span>${lines(1)}</div></div>
      <div class="mt2">${monthGrid(5)}</div>
      <div class="grid g2 mt2" style="gap:0.16in">${box("Plans and dates to remember", { n: 3 })}${box("What I want to try this month", { n: 3, tone: tones[(i + 1) % 4] })}</div>`,
        { hand: "make some plans" },
      ),
    ),
  ],
};

/* 06 ------------------------------------------------------------------ */
const project = {
  file: "06-creative-project-planner.html",
  title: "Creative Project Planner",
  pages: [
    kc(
      "06",
      "Creative<br>Project<br>Planner",
      "Take a creative idea from messy notion to finished piece: brief, materials, steps, timeline, progress log and a show-and-tell page.",
      "Project brief · Materials and budget · Step plan · Timeline · Progress log · Finish line",
      "t-butter",
      "bow",
    ),
    page(
      "Project brief",
      "A single page that says what you're making, why, and what done looks like.",
      `
      <div class="box t-butter-s"><p>Project name: ${fill("l")}</p><p class="mt1">Start: ${fill("s")} &nbsp; Target finish: ${fill("s")} &nbsp; Time per week: ${fill("s")}</p></div>
      <div class="grid g2 mt2" style="gap:0.18in">${box("What I'm making", { n: 3 })}${box("Why I want to make it", { n: 3 })}${box("What done looks like", { n: 3, tone: "t-matcha-s" })}${box("Who it's for", { n: 3 })}${box("Inspiration (describe, don't copy)", { n: 3, tone: "t-strawberry-s" })}${box("What could go wrong", { n: 3 })}</div>
      <div class="box mt2"><span class="lbl">Rough sketch or layout</span><div class="dots" style="--n:5"></div></div>`,
      { hand: "an idea with a plan" },
    ),
    page(
      "Materials and budget",
      "List everything, mark what you own, and set a cap before buying.",
      `
      <table class="tbl tall"><thead><tr><th style="width:36%">Item</th><th>Have</th><th>Borrow</th><th>Need</th><th>Cost</th></tr></thead><tbody>${Array.from(
        { length: 11 },
      )
        .map(() => `<tr><td></td><td>${ck()}</td><td>${ck()}</td><td>${ck()}</td><td></td></tr>`)
        .join("")}<tr><td><b>Total</b></td><td></td><td></td><td></td><td></td></tr></tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">${box("Project budget cap", { n: 1, tone: "t-butter-s" })}${box("Where I'll shop or swap", { n: 3 })}</div>`,
      { hand: "use what you have first" },
    ),
    page(
      "Step plan",
      "Break it into steps you can finish in one sitting. Small steps are what get projects done.",
      `
      <div class="box"><span class="lbl">Steps</span>${checklist(
        Array.from({ length: 12 }).map(
          (_, i) =>
            `<span style="display:inline-block;width:0.2in;color:var(--cherry);font-weight:700">${i + 1}.</span>${fill("l")}${fill("s")}`,
        ),
        { cls: "roomy" },
      )}</div>
      ${box("The step I'm most nervous about, and my plan for it", { n: 3, cls: "mt2 t-strawberry-s" })}`,
      { hand: "step by step" },
    ),
    page(
      "Timeline",
      "Work backwards from your finish date. Add buffer for the unexpected.",
      `
      <table class="tbl tall"><thead><tr><th style="width:15%">Week</th><th>What I'll do</th><th style="width:15%">Done</th></tr></thead><tbody>${[1, 2, 3, 4, 5, 6, 7, 8].map((w) => `<tr><td><b>Week ${w}</b></td><td></td><td>${ck()}</td></tr>`).join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">${box("Buffer days I've built in", { n: 2 })}${box("If I fall behind, I'll&hellip;", { n: 2, tone: "t-butter-s" })}</div>`,
      { hand: "work backwards" },
    ),
    page(
      "Progress log",
      "A line after each session keeps momentum and shows how far you've come.",
      `
      <table class="tbl tall"><thead><tr><th>Date</th><th style="width:15%">Time</th><th style="width:50%">What I did</th><th>Feeling</th></tr></thead><tbody>${Array.from(
        { length: 11 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td>${rate()}</td></tr>`)
        .join("")}</tbody></table>`,
      { hand: "momentum counts" },
    ),
    page(
      "Finish line",
      "Celebrate, reflect and decide what happens to the finished thing.",
      `
      <div class="grid g2" style="gap:0.2in"><div class="box"><span class="lbl">Photo or sketch of the finished piece</span><div class="dots" style="--n:9"></div></div><div class="stack">${box("What I'm proudest of", { n: 3, tone: "t-butter-s" })}${box("What I'd change", { n: 3 })}${box("What I learned", { n: 3, tone: "t-matcha-s" })}</div></div>
      <div class="grid g2 mt2" style="gap:0.2in">${box("Where it will live or who gets it", { n: 2 })}${box("My next project idea", { n: 2, tone: "t-strawberry-s" })}</div>`,
      { hand: "ta-da" },
    ),
  ],
};

/* 07 ------------------------------------------------------------------ */
const journalThemes = [
  [
    "What I made",
    "Describe something you made this week, however small.",
    "What did it teach you?",
    "What would you make next?",
  ],
  [
    "What I noticed",
    "What did you notice today that you usually miss?",
    "Where did you feel most present?",
    "What small detail do you want to remember?",
  ],
  [
    "Joy audit",
    "What gave you a flicker of joy this week?",
    "What drained you?",
    "How could you do more of the first?",
  ],
  [
    "Making room",
    "What did you say no to?",
    "What did you say yes to?",
    "What would you like more space for?",
  ],
  [
    "The comparison trap",
    "When did you compare yourself to someone else?",
    "What were you really wanting?",
    "How can you pursue that for yourself?",
  ],
  [
    "Beginner's mind",
    "What are you a beginner at?",
    "How does it feel to not be good yet?",
    "What's the kindest thing you can tell yourself?",
  ],
  [
    "People",
    "Who did you enjoy time with this week?",
    "Who would you like to invite to something?",
    "What would you do together?",
  ],
  [
    "Rest",
    "What did real rest look like this week?",
    "What got in the way?",
    "What is one small rest you can protect?",
  ],
  [
    "Surprises",
    "What surprised you this month?",
    "What did you expect that didn't happen?",
    "What did you learn about what you like?",
  ],
  [
    "Little wins",
    "List five small wins, however minor.",
    "Which one are you proudest of?",
    "How could you celebrate it?",
  ],
  [
    "Gratitude",
    "What are you grateful for outside of work?",
    "Who helped you this season?",
    "How could you thank them?",
  ],
  [
    "The next chapter",
    "What do you want your next season to feel like?",
    "What's one hobby you'll carry forward?",
    "What's the first small step?",
  ],
];
const journal = {
  file: "07-reflection-journal.html",
  title: "Reflection Journal",
  pages: [
    kc(
      "07",
      "Reflection<br>Journal",
      "Twelve themed pages of gentle prompts to help you notice what you enjoy. Write weekly, monthly, or whenever you feel like it.",
      "How to use · Twelve prompt pages · Mood and energy tracker · Space to doodle",
      "t-strawberry",
      "flower",
    ),
    page(
      "How to use this journal",
      "No rules, no streaks and no wrong answers. It's a place to notice what you like.",
      `
      <div class="grid g2" style="gap:0.3in"><div>${steps(["Pick a page that matches how you feel.", "Write for ten minutes, or three lines.", "Date it and tick the mood dots.", "Flip back after a month and look for patterns."])}</div><div class="stack">${note("<b>Write badly.</b> This journal is not for sharing. Spelling, neatness and grammar are all optional.")}${box("My writing rituals", { n: 3, hint: "Tea, a candle, a favorite pen, a certain chair&hellip;" })}</div></div>
      <div class="box mt2 t-butter-s"><span class="lbl">If you get stuck, try one of these starters</span>${bullets(["Today I noticed&hellip;", "I'd like to try&hellip;", "Something that made me smile was&hellip;", "I'm proud that&hellip;", "Next week I want to&hellip;"])}</div>`,
      { hand: "write badly" },
    ),
    ...journalThemes.map(([t, a, b, c], i) =>
      page(
        t,
        "Date: ____________ &nbsp; Mood " + "&nbsp;",
        `
      <div class="grid g2" style="gap:0.16in"><div class="box t-butter-s"><span class="lbl">Today I feel</span><p class="mt1">${rate()}</p></div><div class="box t-matcha-s"><span class="lbl">Energy</span><p class="mt1">${rate()}</p></div></div>
      <div class="mt2"><p class="ital" style="font-size:12pt;color:var(--cherry)">${a}</p>${lines(4, "tall")}</div>
      <div class="mt2"><p class="ital" style="font-size:12pt;color:var(--cherry)">${b}</p>${lines(4, "tall")}</div>
      <div class="mt2"><p class="ital" style="font-size:12pt;color:var(--cherry)">${c}</p>${lines(3, "tall")}</div>`,
        {
          hand: [
            "be gentle",
            "look closer",
            "choose joy",
            "protect your time",
            "stay in your lane",
            "be new at it",
            "call a friend",
            "rest counts",
            "notice change",
            "count the wins",
            "say thanks",
            "keep going",
          ][i],
        },
      ),
    ),
  ],
};

/* 08 ------------------------------------------------------------------ */
const hobbyCards = [
  [
    "Creative",
    "Doodle a day",
    "Draw one small thing from your desk every day for a week. Collect them on one page.",
    "10 min",
    "Free",
    "pen, paper",
  ],
  [
    "Creative",
    "Color story",
    "Pick three colors and make a tiny painting or collage using only those.",
    "30 min",
    "Free",
    "any art supplies",
  ],
  [
    "Creative",
    "Found-paper collage",
    "Raid the recycling for ten interesting scraps and arrange them into a face, a house or a garden.",
    "45 min",
    "Free",
    "glue, scissors",
  ],
  [
    "Creative",
    "Tiny sculpture",
    "Make something pocket-sized out of clay, foil, wire or paper. Name it.",
    "40 min",
    "Low spend",
    "clay or foil",
  ],
  [
    "Creative",
    "Lettering practice",
    "Write your favorite word in five different styles. Keep your favorite.",
    "20 min",
    "Free",
    "pen",
  ],
  [
    "Creative",
    "Make a card",
    "Create a one-of-a-kind card for someone, using only what you have at home.",
    "30 min",
    "Free",
    "paper",
  ],
  [
    "After hours",
    "Jigsaw hour",
    "Put on a long playlist and do a puzzle until the playlist ends.",
    "1 hr",
    "Free",
  ],
  [
    "After hours",
    "Bake something new",
    "Pick a recipe you've never made. Share half of it with a neighbor or friend.",
    "1.5 hrs",
    "Low spend",
  ],
  [
    "After hours",
    "Plant care night",
    "Water, trim and repot your plants. Name one of them.",
    "45 min",
    "Low spend",
  ],
  [
    "After hours",
    "Slow stitch",
    "Practice one embroidery or crochet stitch while a show plays in the background.",
    "40 min",
    "Low spend",
    "needle, thread",
  ],
  [
    "After hours",
    "Phone-free read",
    "Read in a cozy spot with your phone in another room. Set a 30-minute timer.",
    "30 min",
    "Free",
  ],
  [
    "After hours",
    "Tidy a creative drawer",
    "Sort one drawer of supplies. Keep what sparks interest, rehome the rest.",
    "30 min",
    "Free",
  ],
  [
    "Weekend",
    "Neighborhood photo walk",
    "Take twenty photos of things you usually walk past. Pick your three favorites.",
    "1 hr",
    "Free",
    "phone",
  ],
  [
    "Weekend",
    "Library wander",
    "Visit the library and pick one book from three sections you never visit.",
    "1 hr",
    "Free",
    "library card",
  ],
  [
    "Weekend",
    "Thrift for materials",
    "Search a thrift store for one craft supply under a small cap you set.",
    "1.5 hrs",
    "Low spend",
  ],
  [
    "Weekend",
    "Local class sampler",
    "Look up a drop-in class nearby and book one session.",
    "2 hrs",
    "Treat yourself",
  ],
  [
    "Weekend",
    "Sketch a landmark",
    "Sit across from a local landmark and sketch it. No erasing allowed.",
    "1 hr",
    "Free",
    "sketchbook",
  ],
  [
    "Weekend",
    "Park picnic project",
    "Take a small craft to the park. Make something with a view.",
    "2 hrs",
    "Low spend",
    "blanket",
  ],
  [
    "Better together",
    "Skill swap",
    "Teach a friend something you know and let them teach you something back.",
    "2 hrs",
    "Free",
  ],
  [
    "Better together",
    "Two-person club",
    "Pick a hobby and agree to try it together every two weeks.",
    "1.5 hrs",
    "Low spend",
  ],
  [
    "Better together",
    "Craft-and-chat",
    "Invite one friend, set out snacks and each work on your own project.",
    "2 hrs",
    "Low spend",
  ],
  [
    "Better together",
    "Swap and share",
    "Everyone brings supplies they'll never use. Trade and take home something new.",
    "2 hrs",
    "Free",
  ],
  [
    "Better together",
    "Show and tell",
    "Each person shares a thing they made, however small. Clap enthusiastically.",
    "1 hr",
    "Free",
  ],
  [
    "Better together",
    "Letter exchange",
    "Write a real letter to a friend and ask them to write back.",
    "30 min",
    "Low spend",
    "stamps",
  ],
];
const cards = {
  file: "08-printable-activity-cards.html",
  title: "Printable Activity Cards",
  pages: [
    kc(
      "08",
      "Hobby<br>Activity<br>Cards",
      "Twenty-four cut-out cards to spark a hobby session: draw one from a jar when you're stuck and don't want to think.",
      "24 cut-out cards across Creative, After hours, Weekend and Better together · Cut along dashed lines · Print on card stock for best results",
      "t-matcha",
      "bow",
    ),
    ...cardPages(
      hobbyCards.map(([cat, title, body, time, cost, bring]) => ({
        cat,
        title,
        body,
        time,
        cost,
        bring,
      })),
      "Hobby Era Cards",
    ),
  ],
};

/* 09 ------------------------------------------------------------------ */
const moreStarters = [
  [
    "Pressed flowers",
    "t-matcha-s",
    ["Heavy books", "Plain paper or paper towel"],
    ["Blooms or leaves you've collected", "A pad of blotting paper"],
    ["A flower press, glass frames"],
    "Press three flowers and leave them for two weeks.",
  ],
  [
    "Sketching",
    "t-butter-s",
    ["A pencil", "Any paper"],
    ["A small sketchbook", "A soft pencil and an eraser"],
    ["Pens, charcoal, a sketching bag"],
    "Draw five objects on your desk.",
  ],
  [
    "Zine making",
    "t-strawberry-s",
    ["A sheet of printer paper", "A pen, scissors"],
    ["A stapler", "A glue stick"],
    ["A guillotine cutter, special paper"],
    "Fold one sheet into a tiny eight-page zine.",
  ],
  [
    "Macrame",
    "t-sunday-s",
    ["Scissors", "A dowel, branch or spoon to hang from"],
    ["Cotton cord", "A ring or a stick"],
    ["A rack, different cords, beads"],
    "Make a simple knotted keyring.",
  ],
];
const allStarters = [...starters, ...moreStarters];
const supply = {
  file: "09-starter-supply-checklists.html",
  title: "Starter Supply Checklists",
  pages: [
    kc(
      "09",
      "Starter<br>Supply<br>Checklists",
      "Twelve creative hobbies with a minimum-kit list for each: what you already own, what to start with, what can wait.",
      "How to shop · 12 hobby starter lists · Your own list and spend tracker",
      "t-butter",
      "flower",
    ),
    page(
      "How to shop for a new hobby",
      "A minimum kit makes it easy to begin. Everything else is a reward for sticking with it.",
      `
      <div class="grid g2" style="gap:0.3in"><div>${steps(["<b>Borrow or use what you own</b> before buying anything.", "<b>Buy the beginner basics.</b> Skip the sets with fifty items.", "<b>Do two sessions</b> before you upgrade.", "<b>Upgrade one thing at a time,</b> the thing that annoyed you most."])}</div><div class="stack">${note("Lists name <b>types of supplies, not brands or prices</b>. Check what's sensible where you live.")}${box("Shops, swaps and groups near me", { n: 4, tone: "t-matcha-s" })}</div></div>
      <div class="grid g3 mt2" style="gap:0.16in"><div class="t-butter-s" style="padding:0.14in;border-radius:3px"><h3 class="sec">Already at home</h3><p class="small">Kitchen and desk items, recycling, scraps.</p></div><div class="t-strawberry-s" style="padding:0.14in;border-radius:3px"><h3 class="sec">Start with</h3><p class="small">The few things you need for session one.</p></div><div class="t-sunday-s" style="padding:0.14in;border-radius:3px"><h3 class="sec">Buy later</h3><p class="small">Nice-to-haves. Wait until you love it.</p></div></div>`,
      { hand: "buy last" },
    ),
    ...[0, 4, 8].map((i) =>
      page(
        `Starter lists ${i / 4 + 1} of 3`,
        "Tick what you have. Circle your starting kit.",
        `<div class="grid g2" style="gap:0.14in">${allStarters
          .slice(i, i + 4)
          .map(starterCard)
          .join("")}</div>${box("Notes", { n: 3, cls: "mt2" })}`,
        { hand: "minimum kit" },
      ),
    ),
    page(
      "My own starter list",
      "Build a minimum kit for the hobby you chose.",
      `
      <div class="box t-butter-s"><p>Hobby: ${fill("l")} &nbsp; Cap: ${fill("s")}</p></div>
      <table class="tbl tall mt2"><thead><tr><th style="width:36%">Item</th><th>Own / borrow / thrift / buy</th><th>Planned</th><th>Actual</th><th>Got it</th></tr></thead><tbody>${Array.from(
        { length: 10 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td></td><td>${ck()}</td></tr>`)
        .join("")}</tbody></table>
      ${box("After two sessions: what I really used", { n: 3, cls: "mt2 t-matcha-s" })}`,
      { hand: "count it all" },
    ),
  ],
};

export const docs = [
  discovery,
  worksheets,
  budget,
  challenge,
  calendar,
  project,
  journal,
  cards,
  supply,
];
