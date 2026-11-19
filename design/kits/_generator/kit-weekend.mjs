// Premium kit 2: The Weekend Edit & Girls' Night Kit. Original content only.
import {
  D,
  floaty,
  box,
  lines,
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

const KIT = "Weekend Edit & Girls' Night Kit";
const doodles = (a = "flower") =>
  `${floaty[a]("right:0.8in;top:1.05in;width:1in;color:#b83f43;transform:rotate(12deg)")}${floaty.sparkle("right:1.9in;top:2.1in;width:0.4in;color:#b83f43")}${floaty.star("right:0.7in;top:2.55in;width:0.3in;color:#394d3c")}`;
const kc = (n, title, dek, inside, tone = "t-butter", a = "flower") =>
  cover({
    kicker: `${KIT} · file ${n}`,
    title,
    dek,
    badge: "Weekend Edit Kit",
    tone,
    doodles: doodles(a),
    hand: "let's give saturday a storyline",
    footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">${inside}</p>`,
  });
const tones = ["t-butter-s", "t-strawberry-s", "t-matcha-s", "t-sunday-s"];

/* 01 weekend planner: 8 weekend spreads */
const weekendSpread = (n) =>
  page(
    `Weekend ${n}`,
    "Weekend of ____________________",
    `
  <div class="grid g3" style="gap:0.14in"><div class="box t-butter-s"><span class="lbl">Theme</span>${lines(1)}</div><div class="box t-strawberry-s"><span class="lbl">Budget</span>${lines(1)}</div><div class="box t-matcha-s"><span class="lbl">Mood</span><p class="mt1">${rate()}</p></div></div>
  <div class="grid g2 mt2" style="gap:0.16in"><div class="box"><span class="lbl">Saturday</span>${["Morning", "Afternoon", "Evening"].map((t) => `<p class="small mt1"><b>${t}</b></p>${lines(2)}`).join("")}</div><div class="box"><span class="lbl">Sunday</span>${["Morning", "Afternoon", "Evening"].map((t) => `<p class="small mt1"><b>${t}</b></p>${lines(2)}`).join("")}</div></div>
  <div class="grid g3 mt2" style="gap:0.14in">${box("People to see", { n: 3 })}${box("Something new", { n: 3, tone: "t-sunday-s" })}${box("Home reset (small)", { n: 3 })}</div>
  <div class="grid g2 mt2" style="gap:0.14in"><div class="box t-butter-s"><span class="lbl">Weekend must-dos</span>${checklist(["", "", ""], { cls: "tight" })}</div><div class="box t-matcha-s"><span class="lbl">Memory of the weekend</span>${lines(3)}</div></div>`,
    { hand: "give it a storyline" },
  );
const planner = {
  file: "01-weekend-planner.html",
  title: "Weekend Planner",
  pages: [
    kc(
      "01",
      "The Weekend<br>Planner",
      "Eight weekend spreads that give your Saturday a storyline, with room for people, plans, rest and a memory to keep.",
      "How to plan · Eight weekend spreads · Theme, budget, schedule, people and memory in one page",
    ),
    page(
      "How to plan a weekend",
      "Spend ten minutes on Thursday evening. Pick one anchor plan, one rest block and one thing to look forward to.",
      `
      <div class="grid g2" style="gap:0.3in"><div>${steps(["<b>Choose a theme.</b> Cozy, social, outdoorsy or creative.", "<b>Pick one anchor plan per day.</b> Everything else stays flexible.", "<b>Protect a rest block.</b> Put it in writing.", "<b>Check money and weather,</b> then pick a backup.", "<b>Tick it off</b> and write one memory."])}</div>
      <div class="stack">${note("<b>The anchor rule:</b> one planned thing per day is enough. More than two and a weekend becomes a to-do list.")}${box("Weekend themes I'd like to try", { n: 5, tone: "t-butter-s" })}</div></div>
      <div class="grid g3 mt2" style="gap:0.16in">${["Cozy", "Social", "Outdoorsy", "Creative", "Treat yourself", "Reset"].map((x, i) => `<div class="${tones[i % 4]}" style="padding:0.14in;border-radius:3px;text-align:center;font-family:var(--display);font-style:italic;font-weight:600;color:var(--cherry);font-size:13pt">${x}</div>`).join("")}</div>`,
      { hand: "ten minutes on thursday" },
    ),
    ...[1, 2, 3, 4, 5, 6, 7, 8].map(weekendSpread),
  ],
};

/* 02 solo date cards (new set of 24) */
const soloCards = [
  [
    "Table for one",
    "Sample the tasting menu",
    "Order the small plates and treat each one like a chapter. Write a one-line review of each.",
    "1.5 hrs",
    "Treat yourself",
    "notebook",
  ],
  [
    "Table for one",
    "Brunch with a paperback",
    "Pick a café with sun in the window and read until the plate is empty.",
    "1.5 hrs",
    "Low spend",
    "book",
  ],
  [
    "Table for one",
    "Bakery crawl",
    "Try a pastry from three bakeries. Rank them on a scorecard of your own design.",
    "2 hrs",
    "Low spend",
  ],
  [
    "Table for one",
    "Late-night tea shop",
    "Find a quiet place for tea and a notebook. Write the letter you'll never send.",
    "1 hr",
    "Low spend",
  ],
  [
    "Table for one",
    "Pick-a-poem lunch",
    "Eat lunch outside and read three poems from a library book. Underline one line.",
    "1 hr",
    "Free",
    "library book",
  ],
  [
    "Table for one",
    "Fancy hot chocolate",
    "Treat yourself to the fanciest cup in town. Sip it slowly and people-watch.",
    "45 min",
    "Low spend",
  ],
  [
    "Creative",
    "Watercolor the sky",
    "Paint three skies at different times of day this week. Hang them in a row.",
    "20 min",
    "Free",
    "paints",
  ],
  [
    "Creative",
    "Personal zine",
    "Fold a sheet of paper into a tiny zine about your favorite things this month.",
    "45 min",
    "Free",
    "paper, pen",
  ],
  [
    "Creative",
    "Collage your week",
    "Use ticket stubs, receipts and magazine cuttings to make a week-in-review page.",
    "1 hr",
    "Free",
    "glue",
  ],
  [
    "Creative",
    "Beginner's embroidery",
    "Stitch five simple stitches onto a scrap of fabric. Frame it in a hoop.",
    "1 hr",
    "Low spend",
    "hoop, thread",
  ],
  [
    "Creative",
    "Vision board, but fun",
    "Cut out images of things you want to do this season, not accomplish.",
    "1 hr",
    "Free",
    "magazines",
  ],
  [
    "Creative",
    "Silly self-portrait",
    "Draw yourself in the style of a children's book illustration. Give her a name.",
    "30 min",
    "Free",
  ],
  [
    "After hours",
    "Candlelit pasta night",
    "Cook a dish from scratch, plate it beautifully and eat by candlelight with music.",
    "2 hrs",
    "Low spend",
  ],
  [
    "After hours",
    "Old-movie night",
    "Pick a classic you've never seen. Make popcorn the stovetop way.",
    "2.5 hrs",
    "Free",
  ],
  [
    "After hours",
    "Home spa evening",
    "Face mask, foot soak, lamp light and a playlist you'd play at a spa.",
    "1.5 hrs",
    "Low spend",
  ],
  [
    "After hours",
    "Dance in the kitchen",
    "Make a ten-song playlist and dance through it. Weirdly effective.",
    "30 min",
    "Free",
  ],
  [
    "After hours",
    "Plan a trip you won't take",
    "Map out a dream weekend somewhere. Choose the hotel, the meals and one detour.",
    "1 hr",
    "Free",
  ],
  [
    "After hours",
    "Handwritten gratitude",
    "Write three thank-you notes to people who've made your year. Post at least one.",
    "45 min",
    "Low spend",
    "stamps",
  ],
  [
    "Weekend",
    "Sunrise or sunset spot",
    "Find a place with a view and arrive early. Bring a hot drink.",
    "1.5 hrs",
    "Free",
    "thermos",
  ],
  [
    "Weekend",
    "Bookshop and botanical garden",
    "Buy one book, then read it among the plants.",
    "3 hrs",
    "Low spend",
  ],
  [
    "Weekend",
    "Bike or bus to nowhere",
    "Pick a route you've never taken and get off at a stop that looks interesting.",
    "2 hrs",
    "Low spend",
  ],
  [
    "Weekend",
    "Visit a local landmark",
    "Be a tourist in your own town. Take the guided tour or just wander.",
    "2 hrs",
    "Free or low",
  ],
  [
    "Weekend",
    "Antique market browse",
    "Walk the aisles and pick the one thing you'd put in your fantasy living room.",
    "1.5 hrs",
    "Free",
  ],
  [
    "Weekend",
    "Pottery wheel experiment",
    "Book a beginner session. Aim for a wobbly bowl. Celebrate it.",
    "2 hrs",
    "Treat yourself",
  ],
];
const solo = {
  file: "02-solo-date-cards.html",
  title: "Solo Date Cards",
  pages: [
    kc(
      "02",
      "Solo Date<br>Cards",
      "Twenty-four cut-out dates with yourself. A fresh set, separate from the free deck, for when you want a little more adventure.",
      "24 cut-out cards: Table for one, Creative, After hours and Weekend · Cut along dashed lines",
      "t-strawberry",
      "bow",
    ),
    ...cardPages(
      soloCards.map(([cat, title, body, time, cost, bring]) => ({
        cat,
        title,
        body,
        time,
        cost,
        bring,
      })),
      "Solo Date Cards · Edit set",
    ),
  ],
};

/* 03 girls night cards */
const gnCards = [
  [
    "Hosting",
    "Bracelet bar",
    "Set out bowls of beads and cord. Everyone makes one for herself and one to trade.",
    "2 hrs",
    "Low spend",
    "beads, cord",
  ],
  [
    "Hosting",
    "Mocktail menu",
    "Create three signature non-alcoholic drinks with fancy names and garnishes.",
    "1.5 hrs",
    "Low spend",
  ],
  [
    "Hosting",
    "Snack board showdown",
    "Each guest brings one item. Build the biggest, prettiest board together.",
    "1 hr",
    "Low spend",
  ],
  [
    "Hosting",
    "Playlist swap",
    "Everyone adds three songs to a shared playlist before the night. Guess who chose which.",
    "1 hr",
    "Free",
  ],
  [
    "Craft",
    "Junk journal swap",
    "Trade scraps, make a page and pass the journal to your left for the next one.",
    "2 hrs",
    "Free",
    "glue, scraps",
  ],
  [
    "Craft",
    "Air-dry clay dishes",
    "Roll, shape and stamp little trinket dishes. Take them home once dry.",
    "2 hrs",
    "Low spend",
    "clay",
  ],
  [
    "Craft",
    "Tote bag stitch night",
    "Stitch or fabric-paint an initial or a doodle on plain totes.",
    "2 hrs",
    "Low spend",
    "totes",
  ],
  [
    "Craft",
    "Candle-label design",
    "Design a funny label for a jar candle. Vote on the best name.",
    "1 hr",
    "Low spend",
  ],
  [
    "Craft",
    "Collage cards",
    "Everyone makes three handmade cards from magazine scraps and swaps them.",
    "1.5 hrs",
    "Free",
    "scissors",
  ],
  [
    "Craft",
    "Friendship postcard",
    "Make a postcard for each guest with something you appreciate about her.",
    "1 hr",
    "Free",
  ],
  [
    "Games",
    "Mahjong for beginners",
    "Learn the basics together with a simple rule sheet and lots of laughing.",
    "2 hrs",
    "Free",
    "mahjong set",
  ],
  [
    "Games",
    "Trivia of our lives",
    "Each guest writes five questions about herself. Read them aloud and guess.",
    "1 hr",
    "Free",
  ],
  [
    "Games",
    "Pictionary, but terrible",
    "Draw with your non-dominant hand. The worst drawing wins a prize.",
    "1 hr",
    "Free",
    "paper",
  ],
  [
    "Games",
    "Would you rather: hobby edition",
    "Take turns answering silly questions about hobbies you'd try.",
    "45 min",
    "Free",
  ],
  [
    "Games",
    "Charades with a twist",
    "Act out your favorite movie scenes in under 30 seconds.",
    "1 hr",
    "Free",
  ],
  [
    "Cozy",
    "Movie and manicure",
    "Pick a rom-com and paint each other's nails in matching colors.",
    "2.5 hrs",
    "Low spend",
    "polish",
  ],
  [
    "Cozy",
    "Pajama potluck",
    "Everyone wears pajamas and brings one comfort dish to share.",
    "2 hrs",
    "Low spend",
  ],
  [
    "Cozy",
    "Face mask and gossip",
    "Masks on, magazines out and a no-phones rule for one hour.",
    "1 hr",
    "Low spend",
  ],
  [
    "Cozy",
    "Hot chocolate bar",
    "Set out toppings and let everyone create their dream cup.",
    "1.5 hrs",
    "Low spend",
  ],
  [
    "Cozy",
    "Blanket fort book club",
    "Everyone reads a short story aloud from under a pile of cushions.",
    "1.5 hrs",
    "Free",
    "cushions",
  ],
  [
    "Active",
    "Sunset walk and snacks",
    "Walk to a good spot, spread a blanket and eat dessert first.",
    "2 hrs",
    "Low spend",
    "blanket",
  ],
  [
    "Active",
    "Skate night",
    "Lace up and wobble around a rink. Cheer every fall.",
    "2 hrs",
    "Low spend",
  ],
  [
    "Active",
    "Picnic-and-croquet",
    "A lawn game, a shared basket and nowhere to be.",
    "2.5 hrs",
    "Low spend",
  ],
  [
    "Active",
    "Dance party at home",
    "Move the sofa, dim the lights and dance until someone laughs too hard.",
    "1 hr",
    "Free",
  ],
];
const gn = {
  file: "03-girls-night-activity-cards.html",
  title: "Girls' Night Activity Cards",
  pages: [
    kc(
      "03",
      "Girls' Night<br>Activity<br>Cards",
      "Twenty-four cut-out ideas for hosting, crafting, playing, cozying up and getting out. Pull one from a jar and call it plans.",
      "24 cut-out cards: Hosting, Craft, Games, Cozy and Active · Cut along dashed lines",
      "t-sunday",
      "flower",
    ),
    ...cardPages(
      gnCards.map(([cat, title, body, time, cost, bring]) => ({
        cat,
        title,
        body,
        time,
        cost,
        bring,
      })),
      "Girls' Night Cards",
    ),
  ],
};

/* 04 craft night planner */
const craft = {
  file: "04-craft-night-planner.html",
  title: "Craft Night Planner",
  pages: [
    kc(
      "04",
      "Craft Night<br>Planner",
      "Everything you need to host a relaxed craft night: project, supplies, stations, snacks, budget and a run of show.",
      "Plan on a page · Supplies and stations · Run of show · Project ideas",
      "t-butter",
      "bow",
    ),
    page(
      "Craft night on a page",
      "Pick one project, one snack and one playlist. Keep the rest simple.",
      `
      <div class="grid g2" style="gap:0.16in"><div class="box t-butter-s"><span class="lbl">The basics</span><p class="mt1">Date: ${fill()}</p><p class="mt1">Start / end: ${fill("s")} ${fill("s")}</p><p class="mt1">Where: ${fill("l")}</p><p class="mt1">Guests (max): ${fill("s")}</p></div>${box("The project", { n: 3, tone: "t-strawberry-s", hint: "Easy, forgiving and finishable in two hours." })}${box("Food and drink", { n: 4 })}${box("Atmosphere and music", { n: 4 })}${box("Budget", { n: 0, inner: `<p class="mt1">Total: ${fill("s")}</p><p class="mt1">Per guest: ${fill("s")}</p><p class="mt1">Guests contribute? ${ck()} Yes ${ck()} No</p>` })}${box("The wow detail", { n: 3, tone: "t-matcha-s" })}</div>
      ${note("<b>Test it first.</b> Make one sample the day before so you can explain the steps and fix surprises.")}`,
      { hand: "make it forgiving" },
    ),
    page(
      "Supplies and stations",
      "Group supplies at stations so guests can move around without asking where things are.",
      `
      <div class="grid g2" style="gap:0.2in"><div class="box"><span class="lbl">Supply list</span>${checklist(
        Array.from({ length: 12 }).map(() => ""),
        { cls: "roomy" },
      )}</div><div class="stack"><div class="box t-butter-s"><span class="lbl">Stations</span><p class="small mt1"><b>Cutting</b></p>${lines(1)}<p class="small"><b>Gluing or sewing</b></p>${lines(1)}<p class="small"><b>Decorating</b></p>${lines(1)}<p class="small"><b>Drying shelf</b></p>${lines(1)}</div><div class="box t-matcha-s"><span class="lbl">Budget</span><table class="tbl" style="margin-top:0.06in"><thead><tr><th>Item</th><th>Planned</th><th>Actual</th></tr></thead><tbody>${["Craft supplies", "Snacks", "Drinks", "Extras"].map((r) => `<tr><td>${r}</td><td></td><td></td></tr>`).join("")}<tr><td><b>Total</b></td><td></td><td></td></tr></tbody></table></div></div></div>
      ${box("Mess plan: covers, aprons, towels, wipes", { n: 2, cls: "mt2" })}`,
      { hand: "cover the table" },
    ),
    page(
      "Run of show",
      "A friendly timeline. Adjust it to the mood of the room.",
      `
      <table class="tbl tall"><thead><tr><th style="width:18%">Time</th><th>What's happening</th><th style="width:12%">Done</th></tr></thead><tbody>${["Set out supplies and snacks", "Guests arrive, drinks", "Demonstrate the project", "Craft time with music", "Snack break and chat", "Show and tell", "Wrap-up and thank-yous"].map((r) => `<tr><td></td><td class="small">${r}</td><td>${ck()}</td></tr>`).join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">${box("What worked", { n: 3, tone: "t-matcha-s" })}${box("What I'd change", { n: 3 })}</div>`,
      { hand: "gentle timeline" },
    ),
    page(
      "Twelve project ideas",
      "Beginner-friendly projects that look good even if you've never crafted before.",
      `
      <div class="grid g2" style="gap:0.12in 0.2in">${[
        ["Bracelets", "Beads and elastic. Quick and wearable."],
        ["Air-dry clay dishes", "Roll, stamp and cut. Dry overnight."],
        ["Painted tote bags", "Fabric paint and stencils from cardboard."],
        ["Junk journal pages", "Scraps, glue and washi tape."],
        ["Pressed-flower cards", "Press ahead of time, then glue on cards."],
        ["Candle labels", "Design labels for jars."],
        ["Embroidery hoops", "Simple stitches on a scrap of fabric."],
        ["Collage postcards", "Magazine cut-outs in themed palettes."],
        ["Friendship zines", "Fold, cut and fill with doodles."],
        ["Painted rocks", "Smooth stones and acrylic pens."],
        ["Paper flowers", "Tissue or crepe paper and wire."],
        ["Custom stationery", "Stamps, pens and plain cards."],
      ]
        .map(
          ([t, d], i) =>
            `<div class="${tones[i % 4]}" style="padding:0.1in 0.14in;border-radius:3px"><p style="font-family:var(--display);font-style:italic;font-weight:600;font-size:12pt;color:var(--cherry)">${i + 1}. ${t}</p><p class="small mt1">${d}</p></div>`,
        )
        .join("")}</div>
      ${box("My own idea", { n: 2, cls: "mt2" })}`,
      { hand: "something for everyone" },
    ),
  ],
};

/* 05 book club planner */
const book = {
  file: "05-book-club-planner.html",
  title: "Book Club Planner",
  pages: [
    kc(
      "05",
      "Book Club<br>Planner",
      "Start and run a book club that actually survives: members, rules, a season reading list, meeting notes, hosting and a ratings page.",
      "Club set-up · Season reading list · Meeting notes ×2 · Hosting page · Ratings",
      "t-strawberry",
      "flower",
    ),
    page(
      "Club set-up",
      "Agree on the basics once and avoid awkward negotiating later.",
      `
      <div class="grid g2" style="gap:0.2in"><div class="stack"><div class="box t-butter-s"><span class="lbl">Club name</span>${lines(1)}</div><div class="box"><span class="lbl">Rhythm</span>${checklist(["Weekly", "Every two weeks", "Monthly", "Every season"], { cls: "tight" })}<p class="mt1">Usual day and time: ${fill()}</p></div>${box("How we choose books", { n: 3, hint: "Rotating pick, voting, theme month&hellip;", tone: "t-strawberry-s" })}${box("Our rules", { n: 4, hint: "Spoilers? Skipping? Bringing guests?" })}</div>
      <div class="box"><span class="lbl">Members</span><table class="tbl tall" style="margin-top:0.06in"><thead><tr><th>Name</th><th>Contact</th><th>Hosts in</th></tr></thead><tbody>${Array.from(
        { length: 8 },
      )
        .map(() => `<tr><td></td><td></td><td></td></tr>`)
        .join("")}</tbody></table></div></div>`,
      { hand: "agree once" },
    ),
    page(
      "Season reading list",
      "Plan a season of reads. Mix lengths and genres, and keep one slot flexible.",
      `
      <table class="tbl tall"><thead><tr><th style="width:11%">Month</th><th>Book</th><th>Pages</th><th>Picked by</th><th style="width:20%">Host</th></tr></thead><tbody>${Array.from(
        { length: 12 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td></td><td></td></tr>`)
        .join("")}</tbody></table>`,
      { hand: "mix it up" },
    ),
    ...[1, 2].map((n) =>
      page(
        `Meeting notes ${n}`,
        "Capture the conversation, the best quotes and the next pick.",
        `
      <div class="box t-butter-s"><p>Book: ${fill("l")} &nbsp; Date: ${fill("s")} &nbsp; Host: ${fill("s")}</p></div>
      <div class="grid g2 mt2" style="gap:0.16in">${box("First impressions", { n: 3 })}${box("Characters or ideas that stayed with me", { n: 3 })}${box("Favorite quote or passage", { n: 3, tone: "t-strawberry-s" })}${box("Where we disagreed", { n: 3 })}</div>
      <div class="box mt2"><span class="lbl">Discussion starters</span>${bullets(["What did you expect from the first chapter, and was it right?", "Which scene would you rewrite?", "Who would you invite to dinner from this book?", "What did this book make you want to do or try?", "Would you recommend it, and to whom?"])}</div>
      <div class="grid g2 mt2" style="gap:0.16in">${box("Ratings", { n: 0, inner: `<p class="mt1">${rate()}</p><p class="small mt1">Average: ${fill("s")}</p>` })}${box("Next book and host", { n: 2, tone: "t-matcha-s" })}</div>`,
        { hand: "notes for later" },
      ),
    ),
    page(
      "Hosting the meeting",
      "Whoever hosts needs a snack plan, a seating plan and a way to keep the chat flowing.",
      `
      <div class="grid g2" style="gap:0.2in">${box("Snack and drink plan", { n: 4, tone: "t-butter-s" })}${box("Seating and setup", { n: 4 })}<div class="box"><span class="lbl">Host checklist</span>${checklist(["Confirm the date", "Remind everyone", "Pick questions", "Tidy and set out snacks", "Prepare a timer for chat vs catch-up"], { cls: "tight" })}</div>${box("Theme ideas for the evening", { n: 4, tone: "t-sunday-s", hint: "Match food, drinks or decor to the book." })}</div>
      ${note("<b>Keep it light:</b> spend the first twenty minutes catching up, then the book. No one needs to have finished it.")}`,
      { hand: "snacks first" },
    ),
    page(
      "Ratings and picks",
      "Keep a running list of every book you read and what the club thought.",
      `
      <table class="tbl tall"><thead><tr><th style="width:36%">Book</th><th>Author</th><th>Rating</th><th>Again?</th></tr></thead><tbody>${Array.from(
        { length: 11 },
      )
        .map(() => `<tr><td></td><td></td><td>${rate()}</td><td>${ck()}</td></tr>`)
        .join("")}</tbody></table>
      ${box("Books we'd love to read next", { n: 3, cls: "mt2 t-matcha-s" })}`,
      { hand: "keep the list" },
    ),
  ],
};

/* 06 hosting checklists */
const hostChecks = {
  file: "06-hosting-checklists.html",
  title: "Hosting Checklists",
  pages: [
    kc(
      "06",
      "Hosting<br>Checklists",
      "Tick-box checklists for every kind of gathering: countdown, day of, pantry basics, and the after-party reset.",
      "7-day countdown · Day-of timeline · Hosting basics · Cozy dinner · Game or movie night · After-party reset",
      "t-matcha",
      "bow",
    ),
    page(
      "The seven-day countdown",
      "Spread the work across the week so the day itself is calm.",
      `
      <div class="grid g2" style="gap:0.14in">${[
        [
          "7 days out",
          ["Pick the date and the theme", "Send invites", "Sketch the menu", "Check dietary needs"],
          "t-butter-s",
        ],
        [
          "5 days out",
          [
            "Plan the activity or game",
            "Order anything online",
            "Pick the playlist",
            "Borrow chairs and extra plates",
          ],
          "t-strawberry-s",
        ],
        [
          "3 days out",
          ["Confirm guest count", "Make a shopping list", "Clear the surfaces", "Plan the table"],
          "t-matcha-s",
        ],
        [
          "2 days out",
          [
            "Shop for food and drink",
            "Buy flowers or candles",
            "Prep a make-ahead dish",
            "Charge speakers",
          ],
          "t-sunday-s",
        ],
        [
          "1 day out",
          [
            "Clean main rooms and bathroom",
            "Chill drinks",
            "Set the table",
            "Send a reminder text",
          ],
          "t-butter-s",
        ],
        [
          "The day",
          [
            "Put food in the oven early",
            "Light candles at arrival time",
            "Start the music",
            "Sit down and enjoy",
          ],
          "t-strawberry-s",
        ],
      ]
        .map(
          ([t, items, tone]) =>
            `<div class="box ${tone}"><span class="lbl">${t}</span>${checklist(items, { cls: "roomy" })}</div>`,
        )
        .join("")}</div>`,
      { hand: "calm hosts plan early" },
    ),
    page(
      "Hosting basics",
      "A stash of these means you can host any night.",
      `
      <div class="grid g3" style="gap:0.14in">${[
        ["Drinks", ["Sparkling water", "A non-alcoholic option", "Ice", "Tea and coffee"]],
        ["Snacks", ["Crackers", "Dips", "Fruit", "Something sweet"]],
        ["Table", ["Napkins", "Extra plates", "Glasses", "Serving spoons"]],
        ["Comfort", ["Blankets", "Cushions", "Phone chargers", "Lighting"]],
        ["Cleanup", ["Bin bags", "Dish soap", "Cloths", "Stain remover"]],
        ["Little extras", ["Candles", "Matches", "Playlist", "Name cards"]],
      ]
        .map(
          ([t, items], i) =>
            `<div class="box ${tones[i % 4]}"><span class="lbl">${t}</span>${checklist(items, { cls: "tight" })}</div>`,
        )
        .join("")}</div>
      ${box("What I'll always keep in stock", { n: 3, cls: "mt2" })}`,
      { hand: "always have snacks" },
    ),
    page(
      "Cozy dinner for four to six",
      "A low-stress dinner party on a weeknight.",
      `
      <div class="grid g2" style="gap:0.16in"><div class="box"><span class="lbl">Menu</span><p class="small mt1"><b>Starter</b></p>${lines(1)}<p class="small"><b>Main</b></p>${lines(1)}<p class="small"><b>Side</b></p>${lines(1)}<p class="small"><b>Dessert</b></p>${lines(1)}<p class="small"><b>Drinks</b></p>${lines(1)}</div><div class="box t-butter-s"><span class="lbl">Timeline</span>${checklist(["Prep veg and sauces", "Set table", "Put main in to cook", "Welcome guests", "Serve starters", "Serve main", "Clear plates", "Dessert and coffee"], { cls: "tight" })}</div></div>
      <div class="grid g2 mt2" style="gap:0.16in">${box("Seating plan", { n: 4, tone: "t-sunday-s" })}${box("Conversation starters", { n: 4 })}</div>`,
      { hand: "one pot is plenty" },
    ),
    page(
      "Game or movie night",
      "Keep it cozy and flexible.",
      `
      <div class="grid g2" style="gap:0.16in"><div class="box t-strawberry-s"><span class="lbl">Game night</span>${checklist(["Pick three games: calm, medium, silly", "Print simple rules", "Pens and paper", "Snacks that don't make fingers sticky", "A tiny trophy for the winner"], { cls: "roomy" })}</div><div class="box t-sunday-s"><span class="lbl">Movie night</span>${checklist(["Pick the film (or a short list)", "Check the screen and sound", "Blankets and cushions", "Popcorn and sweet snacks", "Pause breaks planned"], { cls: "roomy" })}</div></div>
      <div class="grid g2 mt2" style="gap:0.16in">${box("Our list of favorites", { n: 4 })}${box("Next time", { n: 4, tone: "t-butter-s" })}</div>`,
      { hand: "pick three" },
    ),
    page(
      "After-party reset",
      "Ten minutes the next morning turns a messy home back into a calm one.",
      `
      <div class="box t-matcha-s"><span class="lbl">Reset checklist</span>${checklist(["Open the windows", "Collect glasses and plates", "Run the dishwasher or wash by hand", "Wipe counters and the table", "Take out bins", "Return borrowed items", "Put leftovers away", "Text a thank-you to the guests", "Write down what worked"], { cls: "roomy" })}</div>
      <div class="grid g2 mt2" style="gap:0.2in">${box("What we'd do again", { n: 4, tone: "t-butter-s" })}${box("What I'd skip next time", { n: 4 })}</div>`,
      { hand: "10 minutes tomorrow" },
    ),
  ],
};

/* 07 activity budget sheets */
const budgets = {
  file: "07-activity-budget-sheets.html",
  title: "Activity Budget Sheets",
  pages: [
    kc(
      "07",
      "Activity<br>Budget<br>Sheets",
      "Plan the fun without overspending. Monthly social budgets, per-event plans, a split-costs tracker and a year summary.",
      "Monthly social budget · Per-event planner · Split-costs tracker · Year summary",
      "t-butter",
      "flower",
    ),
    page(
      "Monthly fun budget",
      "Give your fun a number so you can enjoy it guilt-free.",
      `
      <div class="grid g3" style="gap:0.14in"><div class="box t-butter-s"><span class="lbl">Month</span>${lines(1)}</div><div class="box t-strawberry-s"><span class="lbl">Fun budget</span>${lines(1)}</div><div class="box t-matcha-s"><span class="lbl">Left</span>${lines(1)}</div></div>
      <table class="tbl tall mt2"><thead><tr><th>Category</th><th>Planned</th><th>Actual</th><th>Notes</th></tr></thead><tbody>${["Meals out", "Coffee and treats", "Tickets and classes", "Hosting at home", "Gifts and cards", "Transport", "Spontaneous"].map((c) => `<tr><td>${c}</td><td></td><td></td><td></td></tr>`).join("")}<tr><td><b>Total</b></td><td></td><td></td><td></td></tr></tbody></table>
      ${box("Best money-for-joy moment this month", { n: 3, cls: "mt2 t-butter-s" })}`,
      { hand: "enjoy it guilt-free" },
    ),
    page(
      "Per-event budget",
      "Estimate first, then record what really happened.",
      `
      ${[1, 2].map(() => `<div class="box mt1"><p>Event: ${fill("l")} &nbsp; Date: ${fill("s")}</p><table class="tbl" style="margin-top:0.06in"><thead><tr><th>Item</th><th>Planned</th><th>Actual</th></tr></thead><tbody>${["Food and drink", "Activity or ticket", "Transport", "Extras"].map((r) => `<tr><td>${r}</td><td></td><td></td></tr>`).join("")}<tr><td><b>Total</b></td><td></td><td></td></tr></tbody></table></div>`).join("")}
      ${box("Free alternatives to consider", { n: 3, cls: "mt2 t-matcha-s" })}`,
      { hand: "estimate first" },
    ),
    page(
      "Split-costs tracker",
      "Keep group costs fair and friendly. Write down who paid and who owes.",
      `
      <table class="tbl tall"><thead><tr><th>Date</th><th>What for</th><th>Paid by</th><th>Total</th><th>Each</th><th>Settled</th></tr></thead><tbody>${Array.from(
        { length: 11 },
      )
        .map(() => `<tr><td></td><td></td><td></td><td></td><td></td><td>${ck()}</td></tr>`)
        .join("")}</tbody></table>
      ${note("<b>Friendly rule:</b> agree on splitting before the bill arrives, and settle within a week.")}`,
      { hand: "fair and friendly" },
    ),
    page(
      "Year summary",
      "Total each month's fun spending and look at what gave you the most joy per dollar.",
      `
      <table class="tbl tall"><thead><tr><th>Month</th><th>Budget</th><th>Spent</th><th style="width:40%">Highlight</th></tr></thead><tbody>${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => `<tr><td><b>${m}</b></td><td></td><td></td><td></td></tr>`).join("")}</tbody></table>`,
      { hand: "zoom out" },
    ),
  ],
};

/* 08 seasonal bucket lists */
const seasons = [
  [
    "Spring",
    "t-matcha-s",
    [
      "Visit a plant nursery",
      "Have a picnic on the first warm day",
      "Try a new walking route",
      "Buy flowers from a market",
      "Open all the windows",
      "Plant something that grows",
      "Take a long bike ride",
      "Host a brunch",
      "Declutter one shelf",
      "Go to a spring festival",
      "Fly a kite",
      "Photograph blossoms",
      "Have a sunrise walk",
      "Repot a plant",
      "Wear a bright color",
    ],
  ],
  [
    "Summer",
    "t-butter-s",
    [
      "Watch a sunset with friends",
      "Have a backyard movie night",
      "Swim somewhere new",
      "Try a night market",
      "Eat something icy",
      "Go berry picking",
      "Read a book in a hammock",
      "Have a beach or lake day",
      "Make a summer playlist",
      "Host a bonfire evening",
      "Take a day trip",
      "Try a new outdoor sport",
      "Stay out until dark",
      "Make lemonade",
      "Stargaze",
    ],
  ],
  [
    "Autumn",
    "t-strawberry-s",
    [
      "Bake something spiced",
      "Walk through fallen leaves",
      "Visit a pumpkin patch or orchard",
      "Make a cozy playlist",
      "Host a soup night",
      "Try a new tea",
      "Decorate with seasonal finds",
      "Sew or stitch by lamplight",
      "Go to a harvest market",
      "Read a spooky story",
      "Make a scrapbook of leaves",
      "Have a bonfire evening",
      "Try a pottery class",
      "Wear your favorite sweater",
      "Plan a cozy weekend",
    ],
  ],
  [
    "Winter",
    "t-sunday-s",
    [
      "Have a hot chocolate tasting",
      "Make handmade gifts",
      "Try an ice-skating rink",
      "Host a cozy movie marathon",
      "Take a winter walk",
      "Write holiday cards",
      "Bake with a friend",
      "Visit a market or fair",
      "Start a jigsaw",
      "Have a candlelit dinner",
      "Learn to knit or crochet",
      "Make a year-in-review page",
      "Try a new soup",
      "Visit a museum on a cold day",
      "Plan next year's hobbies",
    ],
  ],
];
const seasonal = {
  file: "08-seasonal-bucket-lists.html",
  title: "Seasonal Bucket Lists",
  pages: [
    kc(
      "08",
      "Seasonal<br>Bucket<br>Lists",
      "Four seasons, sixty small things to look forward to. Tick them off and add your own.",
      "Spring · Summer · Autumn · Winter, with room to add your own ideas",
      "t-sunday",
      "bow",
    ),
    ...seasons.map(([s, tone, items], i) =>
      page(
        `${s} bucket list`,
        `Fifteen ideas for ${s.toLowerCase()}. Circle your top five and add your own at the bottom.`,
        `<div class="${tone}" style="padding:0.14in 0.22in;border-radius:3px"><div class="grid g2" style="gap:0 0.3in">${checklist(items, { cls: "roomy" })}</div></div><div class="box mt2"><span class="lbl">My own ${s.toLowerCase()} ideas</span>${checklist(["", "", ""], { cls: "roomy" })}</div>`,
        { hand: ["watch it bloom", "long light", "cozy season", "keep it warm"][i] },
      ),
    ),
  ],
};

/* 09 planning templates */
const templates = {
  file: "09-planning-templates.html",
  title: "Planning Templates",
  pages: [
    kc(
      "09",
      "Printable<br>Planning<br>Templates",
      "Six reusable layouts: weekly plan, to-do list, friends' availability, invitation, monthly social calendar and a dotted ideas page.",
      "Weekly plan · Priority to-do · Plan with friends · Invitation · Monthly calendar · Dotted notes",
      "t-strawberry",
      "flower",
    ),
    page(
      "Weekly plan",
      "Week of ____________________",
      `
      <div class="grid g2" style="gap:0.14in">${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d, i) => `<div class="box ${i > 4 ? tones[i - 5] : ""}"><span class="lbl">${d}</span>${lines(3)}</div>`).join("")}<div class="box t-matcha-s"><span class="lbl">This week's treat</span>${lines(3)}</div></div>`,
      { hand: "plan lightly" },
    ),
    page(
      "Priority to-do list",
      "Three things first, then the rest.",
      `
      <div class="grid g2" style="gap:0.2in"><div class="box t-butter-s"><span class="lbl">Top three</span>${checklist(["", "", ""], { cls: "roomy" })}</div><div class="box t-strawberry-s"><span class="lbl">Just for me</span>${checklist(["", "", ""], { cls: "roomy" })}</div></div>
      <div class="box mt2"><span class="lbl">Everything else</span>${checklist(
        Array.from({ length: 12 }).map(() => ""),
        { cls: "roomy" },
      )}</div>
      ${box("Notes", { n: 3, cls: "mt2" })}`,
      { hand: "three first" },
    ),
    page(
      "Plan with friends",
      "Find a date that works for everyone without a 100-message group chat.",
      `
      <div class="box t-butter-s"><p>What we're planning: ${fill("l")}</p></div>
      <table class="tbl tall mt2"><thead><tr><th style="width:22%">Name</th>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => `<th>${d}</th>`).join("")}</tr></thead><tbody>${Array.from(
        { length: 8 },
      )
        .map(() => `<tr><td></td>${"<td></td>".repeat(7)}</tr>`)
        .join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">${box("The day that wins", { n: 1, tone: "t-matcha-s" })}${box("Who's bringing what", { n: 3 })}</div>`,
      { hand: "decide by friday" },
    ),
    page(
      "Invitation template",
      "Fill in, cut out and hand it over, or use it as a guide for your own message.",
      `
      <div class="t-butter" style="padding:0.5in 0.5in;border-radius:4px;text-align:center;border:1.5pt solid var(--cherry)">
        <p class="kicker">You're invited</p>
        <p class="display" style="font-size:34pt;margin-top:0.2in">${fill("l")}</p>
        <p class="ital" style="font-size:14pt;margin-top:0.3in;color:var(--ink)">on ${fill()}</p>
        <p class="ital" style="font-size:14pt;margin-top:0.2in;color:var(--ink)">at ${fill("l")}</p>
        <p style="margin-top:0.3in">What to bring: ${fill("l")}</p>
        <p style="margin-top:0.14in">Please reply by ${fill()}</p>
        <p class="hand" style="font-size:20pt;margin-top:0.3in">pajamas encouraged</p></div>
      <div class="box mt2"><span class="lbl">Notes to self</span>${lines(4)}</div>`,
      { hand: "come as you are" },
    ),
    page(
      "Monthly social calendar",
      "Month: ____________________",
      `${monthGrid(5)}<div class="grid g2 mt2" style="gap:0.16in">${box("Birthdays and occasions", { n: 3, tone: "t-strawberry-s" })}${box("Plans I want to make", { n: 3, tone: "t-butter-s" })}</div>`,
      { hand: "fill it with fun" },
    ),
    page(
      "Dotted ideas page",
      "A blank dotted page for lists, sketches, seating plans and brain dumps.",
      `<div class="dots" style="--n:34"></div>`,
      { hand: "scribble freely" },
    ),
  ],
};

export const docs = [planner, solo, gn, craft, book, hostChecks, budgets, seasonal, templates];
