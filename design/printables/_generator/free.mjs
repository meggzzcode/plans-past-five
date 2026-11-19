// Content for the six free downloads. Run `node scripts/build-printables.mjs` to regenerate HTML + PDFs.
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
  rawPage,
  cover,
  cardPages,
  monthGrid,
  esc,
} from "./lib.mjs";

const bigFlower = floaty.flower("right:0.7in;top:0.85in;width:0.95in;color:#b83f43");
const coverDoodles = (a = "flower") =>
  `${floaty[a]("right:0.8in;top:1.05in;width:1in;color:#b83f43;transform:rotate(12deg)")}${floaty.sparkle("right:1.9in;top:2.1in;width:0.4in;color:#b83f43")}${floaty.star("right:0.7in;top:2.55in;width:0.3in;color:#394d3c")}`;

/* =====================  1. FIND YOUR HOBBY WORKBOOK  ===================== */
export const menu = [
  [
    "Creative Corner",
    ["Watercolor", "Junk journaling", "Air-dry clay", "Embroidery", "Collage", "Bracelet making"],
  ],
  [
    "After Hours",
    [
      "Jigsaw puzzles",
      "Crochet",
      "Baking bread",
      "Houseplant care",
      "Journaling",
      "Album listening",
    ],
  ],
  [
    "Table for One",
    [
      "Café sketching",
      "Bookstore dates",
      "Museum wandering",
      "Solo picnics",
      "Film nights out",
      "Letter writing",
    ],
  ],
  [
    "Better Together",
    ["Book club", "Mahjong", "Game night", "Cooking swap", "Pottery class", "Volunteering"],
  ],
  [
    "A Little Movement",
    ["Pickleball", "Tennis rally", "Short hikes", "Roller skating", "Yoga at home", "Walking club"],
  ],
  [
    "The Weekend Edit",
    [
      "Farmers markets",
      "Thrifting",
      "Birdwatching",
      "Train day trips",
      "Photo walks",
      "Picnic planning",
    ],
  ],
];
const menuTones = [
  "t-butter-s",
  "t-strawberry-s",
  "t-sunday-s",
  "t-matcha-s",
  "t-butter-s",
  "t-strawberry-s",
];

export const workbook = {
  slug: "hobby-era-tracker",
  file: "find-your-hobby-workbook.html",
  title: "Find Your Hobby Workbook",
  footerLabel: "Find Your Hobby Workbook",
  pages: [
    cover({
      kicker: "A free workbook · 8 pages",
      title: "Find Your<br>Hobby<br>Workbook",
      dek: "Figure out what you actually want to do with your evenings and weekends, try a few things for cheap, and keep what you love. No performance review required.",
      badge: "Free printable",
      hand: "being good at it is completely optional",
      doodles: coverDoodles("flower"),
      footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">Free-time check · What you're craving · The Hobby Menu · Your shortlist · The Hobby Era Tracker · Decision day</p>`,
    }),
    page(
      "How this workbook works",
      "Six small steps from “I should have a hobby” to “this is my thing”. Do one a night, or all in a Sunday afternoon.",
      `
      <div class="grid g2" style="gap:0.3in;align-items:start">
        <div>${steps([
          "<b>Check your real life.</b> How much time, energy and money do you really have? (Page 3)",
          "<b>Name the craving.</b> Calm? Company? Making something with your hands? (Page 4)",
          "<b>Browse the menu.</b> Circle what makes you curious, no overthinking. (Page 5)",
          "<b>Shortlist three.</b> Plan one tiny, cheap first try for each. (Page 6)",
          "<b>Track what you try.</b> Rate how it felt, not how it looked. (Page 7)",
          "<b>Decide.</b> Keep it, pause it or swap it for something else. (Page 8)",
        ])}</div>
        <div class="stack">
          ${note("<b>The only rules:</b> try each hobby at least twice before you decide, keep the first session under two hours, and spend as close to nothing as you can.")}
          ${box("Today I'm starting because&hellip;", { n: 4, tone: "t-strawberry-s" })}
          ${box("What I'd love my free time to feel like", { n: 4, hint: "Use three words if that's all you've got." })}
        </div>
      </div>
      <div class="mt3 t-butter-s" style="padding:0.2in 0.25in;border-radius:3px">
        ${sec("A hobby is worth keeping if&hellip;")}
        <div class="grid g3" style="gap:0.25in">
          <p>you look forward to it, even a little, even on a Tuesday</p>
          <p>time goes soft and strange while you're doing it</p>
          <p>you'd be happy to do it again, badly, with no audience</p>
        </div>
      </div>
      <p class="hand" style="font-size:19pt;text-align:center;margin-top:0.35in">your calendar deserves more than meetings</p>
    `,
      { hand: "no experience needed" },
    ),
    page(
      "Your free-time reality check",
      "Be honest, not aspirational. A hobby that fits your real life beats one that fits your dream life.",
      `
      <div class="grid g2" style="gap:0.22in">
        <div class="box"><span class="lbl">When I actually have time</span><span class="hint">Tick every slot that's realistic most weeks.</span>
          <table class="tbl" style="margin-top:0.08in"><thead><tr><th></th><th>30 min</th><th>1 hr</th><th>2+ hrs</th></tr></thead><tbody>
          ${["Weeknights", "Saturday", "Sunday", "Lunch break", "Early mornings"].map((r) => `<tr><td><b>${r}</b></td><td>${ck()}</td><td>${ck()}</td><td>${ck()}</td></tr>`).join("")}
          </tbody></table></div>
        <div class="stack">
          <div class="box"><span class="lbl">Energy after work</span><span class="hint">Circle one.</span><p class="ital" style="font-size:12pt;margin-top:0.08in;color:var(--cherry)">running on fumes &nbsp;·&nbsp; fine &nbsp;·&nbsp; buzzing</p></div>
          <div class="box"><span class="lbl">Monthly budget for fun</span><span class="hint">Circle one. No wrong answer.</span><p class="ital" style="font-size:12pt;margin-top:0.08in;color:var(--cherry)">basically free &nbsp;·&nbsp; a little &nbsp;·&nbsp; a treat</p>
          <p class="small mt1">My number: ${fill("s")}</p></div>
          <div class="box"><span class="lbl">Where I have space</span>${checklist(["A kitchen table", "A corner of a room", "A balcony or yard", "Nothing at home, I'll go out"], { cls: "tight" })}</div>
        </div>
      </div>
      <div class="grid g2 mt2" style="gap:0.22in">
        <div class="box t-matcha-s"><span class="lbl">Who I want around</span>${checklist(["Just me, thank you", "One friend", "A small group", "Friendly strangers (a class, a club)"], { cls: "tight" })}</div>
        <div class="box t-sunday-s"><span class="lbl">What I'd rather skip</span>${checklist(["Anything with lots of supplies", "Anything loud or crowded", "Anything that needs a car", "Anything I'd have to be good at", "Anything on a screen"], { cls: "tight" })}</div>
      </div>
      ${box("What's already in my house that could become a hobby?", { n: 3, cls: "mt2", hint: "Old yarn, a guitar, a camera roll, a bike, a drawer of craft supplies&hellip;" })}
    `,
      { hand: "start from what's real" },
    ),
    page(
      "What are you craving?",
      "Hobbies are a way to feel a certain way. Pick the feelings first and the activities get easier to choose.",
      `
      ${sec("Circle up to three")}
      <div class="grid g4" style="gap:0.12in">
        ${[
          ["Calm", "t-sunday"],
          ["Making something", "t-butter"],
          ["Moving my body", "t-matcha"],
          ["Company", "t-strawberry"],
          ["Learning", "t-butter"],
          ["Fresh air", "t-matcha"],
          ["Silliness", "t-strawberry"],
          ["Quiet alone time", "t-sunday"],
        ]
          .map(
            ([l, t]) =>
              `<div class="${t}" style="padding:0.22in 0.1in;text-align:center;border-radius:3px;font-family:var(--display);font-style:italic;font-weight:600;font-size:12.5pt;color:var(--ink)">${l}</div>`,
          )
          .join("")}
      </div>
      <div class="grid g2 mt3" style="gap:0.22in">
        ${box("What I loved doing at ten years old", { n: 4, hint: "Drawing? Climbing things? Building worlds for toys?" })}
        ${box("Things that make me lose track of time", { n: 4 })}
        ${box("What I'm quietly curious about", { n: 4, hint: "The one you never say out loud." })}
        ${box("A hobby I abandoned, and why", { n: 4, hint: "Too pricey? Too much pressure? Wrong people?" })}
      </div>
      ${box("The hobby I'd start if I knew nobody would ever see it", { n: 2, cls: "mt2 t-butter-s", tall: true })}
    `,
      { hand: "feelings first" },
    ),
    page(
      "The Hobby Menu",
      "Thirty-six ideas. Put a dot next to anything that makes you curious and a star beside your top five. Nothing here needs talent.",
      `
      <div class="grid g2" style="gap:0.14in 0.22in">
      ${menu.map(([name, items], i) => `<div class="${menuTones[i]}" style="padding:0.1in 0.15in 0.08in;border-radius:3px"><h3 class="sec">${D.star()}${name}</h3>${checklist(items)}</div>`).join("")}
      </div>
      <div class="box mt2"><span class="lbl">Something not on the menu I'd like to try</span>${lines(1)}</div>
    `,
      { hand: "circle what sparks joy" },
    ),
    page(
      "Your shortlist",
      "Pick three to try. For each one, make the first step tiny enough that you'd do it on a tired Tuesday.",
      `
      ${[1, 2, 3]
        .map(
          (
            n,
          ) => `<div class="box ${["t-butter-s", "t-strawberry-s", "t-matcha-s"][n - 1]}" style="margin-bottom:0.14in">
        <span class="lbl">Trial ${n}</span>
        <div class="grid g2" style="gap:0.05in 0.3in;margin-top:0.07in">
          <p>Hobby: ${fill("l")}</p><p>I'll try it on: ${fill()}</p>
          <p>Why I'm curious: ${fill("l")}</p><p>Where: ${fill()}</p>
          <p>The tiny first step: ${fill("l")}</p><p>With: ${fill()}</p>
          <p>What I already own: ${fill("l")}</p><p>I'll spend up to: ${fill("s")}</p>
        </div></div>`,
        )
        .join("")}
      <div class="grid g2" style="gap:0.22in;margin-top:0.2in">
        <div class="note"><b>A fair trial</b> means two tries, a real start time on the calendar and no new gear until try number two.</div>
        <div class="note"><b>Make it easy:</b> set out supplies the night before, pick a time you're already free and tell one friend.</div>
      </div>
    `,
      { hand: "three tiny experiments" },
    ),
    page(
      "The Hobby Era Tracker",
      "Try it, rate it, keep what you love. Rate how it felt, not how good you were.",
      `
      <table class="tbl tall"><thead><tr><th style="width:30%">Hobby I tried</th><th style="width:13%">Date</th><th style="width:11%">Cost</th><th style="width:30%">How it felt</th><th>Again?</th></tr></thead><tbody>
      ${Array.from({ length: 9 })
        .map(
          () =>
            `<tr><td></td><td></td><td></td><td>${rate()}</td><td><span class="muted">Yes / No / Maybe</span></td></tr>`,
        )
        .join("")}
      </tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">
        ${box("Hobbies I want to try next", { n: 4, tone: "t-strawberry-s" })}
        ${box("Supplies wishlist (buy last)", { n: 4, hint: "Wait a week before buying anything on this list." })}
      </div>
      ${box("My favorite hobby moment so far", { n: 2, cls: "mt2 t-matcha-s" })}
    `,
      { hand: "no performance reviews" },
    ),
    page(
      "Decision day",
      "After two tries, look at the pattern. Your gut usually knows. Use this page to listen to it.",
      `
      <table class="tbl tall"><thead><tr><th style="width:28%">Hobby</th><th>Looked forward to it?</th><th>Would I do it tired?</th><th>Time disappeared?</th><th>Verdict</th></tr></thead><tbody>
      ${Array.from({ length: 5 })
        .map(
          () =>
            `<tr><td></td><td>${ck(true)} Yes &nbsp;${ck(true)} No</td><td>${ck(true)} Yes &nbsp;${ck(true)} No</td><td>${ck(true)} Yes &nbsp;${ck(true)} No</td><td class="small">Keep · Pause · Swap</td></tr>`,
        )
        .join("")}
      </tbody></table>
      <div class="grid g3 mt2" style="gap:0.16in">
        <div class="t-matcha-s" style="padding:0.12in 0.14in;border-radius:3px"><h3 class="sec">Keep</h3><p class="small">Put it on the calendar. Give it a regular slot and a small budget.</p></div>
        <div class="t-butter-s" style="padding:0.12in 0.14in;border-radius:3px"><h3 class="sec">Pause</h3><p class="small">Good idea, wrong season. Write down when you'll revisit.</p></div>
        <div class="t-strawberry-s" style="padding:0.12in 0.14in;border-radius:3px"><h3 class="sec">Swap</h3><p class="small">Not for you, and that's useful data. Pick the next one off the menu.</p></div>
      </div>
      <div class="box mt2 t-butter-s" style="padding-bottom:0.16in"><span class="lbl">My hobby era statement</span>
        <p class="ital" style="font-size:15pt;margin-top:0.12in;color:var(--ink)">This season I'm into ${fill("l")}</p>
        <p class="ital" style="font-size:15pt;margin-top:0.14in;color:var(--ink)">I'll make time for it on ${fill()} at ${fill("s")}</p></div>
      ${box("What I learned about what I like", { n: 3, cls: "mt2" })}
    `,
      { hand: "listen to your gut" },
    ),
  ],
};

/* =====================  2. 30-DAY HOBBY CHALLENGE  ===================== */
export const days = [
  ["Show up", "Set a 15-minute timer and start. That's the whole task."],
  ["Make a spot", "Gather what you already own and set up one small corner."],
  ["Look once", "Watch or read one beginner thing, then stop and do something."],
  ["Bad on purpose", "Make something deliberately imperfect. Enjoy it."],
  ["Change the hour", "Do it at a different time of day from yesterday."],
  ["Add a soundtrack", "Choose a playlist, album or podcast just for this."],
  ["Rest and notice", "No session. Write one thing you've noticed so far."],
  ["Copy something", "Recreate something you admire, as best you can."],
  ["Two things only", "Limit yourself to two colors, tools or ingredients."],
  ["Try the hard bit", "Spend ten minutes on the part that looks tricky."],
  ["New location", "Take it to a porch, park bench, café or friend's table."],
  ["Make a tiny gift", "Make something small for someone you like."],
  ["Speed round", "Five minutes. Go fast. Don't fix anything."],
  ["Rest and notice", "No session. What's the most fun part so far?"],
  ["Learn one word", "Look up one technique or term and try it once."],
  ["Follow along", "Do one tutorial start to finish, no skipping ahead."],
  ["Invite someone", "Ask a friend to join for 20 minutes, or tell them about it."],
  ["Phone away", "One full session with the phone in another room."],
  ["Fix a niggle", "Solve the one thing that has been bugging you."],
  ["Make a keeper", "Make something you'd actually be glad to keep."],
  ["Rest and notice", "No session. Has your energy changed? Write it down."],
  ["Display it", "Put your best piece somewhere you'll see it daily."],
  ["Teach one thing", "Explain something you learned to a friend or the mirror."],
  ["Half an hour", "A longer session. See what happens after minute 20."],
  ["The avoided thing", "Do the part you've been quietly dodging."],
  ["Plan next month", "Pick a small project to start when the challenge ends."],
  ["Share (optional)", "Send one photo or note to a friend. Skipping is fine."],
  ["Inventory", "List what you used and what you never touched."],
  ["Favorite repeat", "Do your favorite session from the month again."],
  ["Celebrate", "Treat yourself and write your wrap-up on the next page."],
];
const dayRows = (from, to) =>
  days
    .slice(from, to)
    .map(
      ([t, p], i) =>
        `<div class="dayrow"><span class="n">${from + i + 1}</span><div class="p"><b>${t}</b><span>${p}</span></div>${ck()}</div>`,
    )
    .join("");

export const bucket = [
  [
    "Creative",
    [
      "Paint a mug at a pottery studio",
      "Make an air-dry clay dish",
      "Fill one junk journal page",
      "Paint the flowers on your table",
      "Stitch your initial on a tote",
      "Make a magazine collage",
      "Learn a calligraphy alphabet",
      "Bake something to give away",
      "Try a paint-by-number",
      "Make a pair of earrings",
    ],
  ],
  [
    "Table for one",
    [
      "Have dinner out alone",
      "Take a bookstore date",
      "Visit one museum room",
      "Sketch in a café window",
      "See a film by yourself",
      "Read in a park for an hour",
      "Walk a new neighborhood",
      "Shoot a roll of film",
      "Take a solo picnic",
      "Write yourself a letter",
    ],
  ],
  [
    "Better together",
    [
      "Host a bracelet night",
      "Start a two-person book club",
      "Play a round of mahjong",
      "Cook a new recipe with a friend",
      "Go to an adult skate night",
      "Have a picnic with the group chat",
      "Try a drop-in class with a friend",
      "Host a game night",
      "Volunteer for one shift together",
      "Send a real letter",
    ],
  ],
  [
    "After hours",
    [
      "Do a jigsaw instead of scrolling",
      "Take a golden-hour walk",
      "Listen to an album start to finish",
      "Make a nice dinner for one",
      "Water and repot a plant",
      "Read before your phone",
      "Call a friend on a walk",
      "Try a crossword",
      "Plan your weekend on paper",
      "Rally on a public tennis court",
    ],
  ],
  [
    "Weekend adventures",
    [
      "Visit a farmers market",
      "Hike a short local trail",
      "Go thrifting with a small budget",
      "Find the best sunset spot",
      "Try pickleball open play",
      "Explore a new neighborhood",
      "Go birdwatching in a park",
      "Take a day trip by train",
      "Pack a picnic and stay all afternoon",
      "Say yes to something new",
    ],
  ],
];

export const challenge = {
  slug: "out-of-office-bucket-list",
  file: "30-day-hobby-challenge.html",
  title: "30-Day Hobby Challenge",
  footerLabel: "30-Day Hobby Challenge",
  pages: [
    cover({
      kicker: "A free challenge · plus the 50-item bucket list",
      title: "The 30-Day<br>Hobby<br>Challenge",
      dek: "Thirty small prompts, fifteen minutes at a time, to start something new and see if it sticks. Rest days included.",
      badge: "Free printable",
      hand: "small and daily beats big and never",
      tone: "t-strawberry",
      doodles: coverDoodles("bow"),
      footerNote: `<p class="kicker">What you get</p><p style="margin-top:0.05in;font-size:10pt">How it works · 30 daily prompts · a finish-line page · The Out-of-Office Bucket List (50 ideas)</p>`,
    }),
    page(
      "How it works",
      "Pick one hobby (or a sampler) and do something tiny with it every day for a month. Fifteen minutes absolutely counts.",
      `
      <div class="grid g2" style="gap:0.3in">
        <div class="stack">
          ${steps(["<b>Pick your hobby.</b> One you're curious about, or &ldquo;a new thing each week&rdquo;.", "<b>Set your start date</b> and put a 15-minute slot in your calendar.", "<b>Follow the daily prompt</b> on the next pages. Tick the box. That's it.", "<b>Miss a day?</b> Carry on from where you are. No streak police here."])}
          ${note("<b>Seven-day rhythm:</b> Week 1 is Show up, week 2 is Play, week 3 is Stretch, week 4 is Own it. Every seventh day is a rest day for noticing.")}
        </div>
        <div class="stack">
          ${box("My hobby for the next 30 days", { n: 2, tone: "t-butter-s", tall: true })}
          <div class="box"><p>Start date: ${fill()}</p><p class="mt1">Finish date: ${fill()}</p><p class="mt1">My daily slot: ${fill()}</p></div>
          ${box("My why", { n: 3, hint: "In your own words. It doesn't need to be impressive." })}
          ${box("If it gets hard, I'll&hellip;", { n: 3, tone: "t-strawberry-s", hint: "Shrink the session. Don't quit." })}
        </div>
      </div>
      <div class="mt3">${sec("Easy-mode rules")}<div class="grid g3" style="gap:0.2in"><p><b>Five minutes beats zero.</b> If a day is rough, do the smallest version.</p><p><b>Swap freely.</b> Any prompt that doesn't fit your hobby can be swapped for one that does.</p><p><b>Spend almost nothing.</b> Use what you have for all thirty days.</p></div></div>
    `,
      { hand: "fifteen minutes counts" },
    ),
    page(
      "Days 1 to 15",
      "Show up, then play. The first week is about making this easy.",
      `<div>${dayRows(0, 15)}</div>`,
      { hand: "weeks 1 and 2" },
    ),
    page(
      "Days 16 to 30",
      "Stretch a little, then make it yours.",
      `<div>${dayRows(15, 30)}</div>`,
      { hand: "weeks 3 and 4" },
    ),
    page(
      "The finish line",
      "Thirty days later. Color in what you did and look at the pattern.",
      `
      <div class="box"><span class="lbl">My 30 days</span><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:0.07in;margin-top:0.1in">${Array.from(
        { length: 30 },
      )
        .map(
          (_, i) =>
            `<div style="aspect-ratio:1;border:1pt solid var(--cherry);border-radius:50%;display:grid;place-items:center;font-size:8.5pt;color:var(--cherry);font-weight:700">${i + 1}</div>`,
        )
        .join("")}</div></div>
      <div class="grid g2 mt2" style="gap:0.2in">
        ${box("The best session was&hellip;", { n: 3, tone: "t-butter-s" })}
        ${box("The hardest part was&hellip;", { n: 3 })}
        ${box("Something I made or learned", { n: 3, tone: "t-matcha-s" })}
        ${box("What surprised me", { n: 3 })}
      </div>
      <div class="mt2"><h3 class="sec">${D.star()}What happens next?</h3><div class="grid g3" style="gap:0.14in"><div class="box">${ck()} Keep going, as a weekly habit</div><div class="box">${ck()} Level up: pick a bigger project</div><div class="box">${ck()} Try a different hobby</div></div></div>
      ${box("My next small step", { n: 2, cls: "mt2 t-strawberry-s", tall: true })}
    `,
      { hand: "look what you did" },
    ),
    page(
      "The Out-of-Office Bucket List",
      "Fifty small things to do outside of work. Tick one off a week and you'll have a very good year.",
      `
      <div class="grid g2" style="gap:0.12in 0.3in">
        ${bucket.map(([s, items]) => `<div><h3 class="sec">${D.star()}${s}</h3>${checklist(items, { cls: "tight" })}</div>`).join("")}
        <div style="display:grid;place-items:center;text-align:center"><p class="hand" style="font-size:22pt">being good at it is<br>completely optional</p></div>
      </div>
    `,
      { hand: "tick one off a week" },
    ),
  ],
};

/* =====================  3. WEEKEND ADVENTURE PLANNER  ===================== */
const picker = [
  [
    "Under an hour",
    "t-butter-s",
    [
      "Walk a street you've never walked",
      "Coffee and a notebook somewhere new",
      "Bookstore browse, one book allowed",
      "Sunset spot, no phone",
      "Bake something small",
      "Sketch from a bench",
    ],
  ],
  [
    "Half a day",
    "t-strawberry-s",
    [
      "Farmers market and a picnic",
      "Thrift trip with a spending cap",
      "Short local trail, snacks packed",
      "Drop-in craft class",
      "Museum or gallery, one floor",
      "Brunch with a friend, then a walk",
    ],
  ],
  [
    "A whole day",
    "t-matcha-s",
    [
      "Day trip by train or bus",
      "Hike plus lunch somewhere good",
      "Garden or park all afternoon",
      "Host a craft or game night",
      "Neighborhood crawl: three small stops",
      "Beach, lake or river day",
    ],
  ],
  [
    "Rainy-day backups",
    "t-sunday-s",
    [
      "Jigsaw and a long playlist",
      "Cook something slow",
      "Junk journal afternoon",
      "Movie matinee for one",
      "Tidy one drawer, then reward yourself",
      "Letters and postcards",
    ],
  ],
];
export const weekend = {
  slug: "weekend-edit-planner",
  file: "weekend-adventure-planner.html",
  title: "Weekend Adventure Planner",
  footerLabel: "Weekend Adventure Planner",
  pages: [
    cover({
      kicker: "The Weekend Edit · a free planner",
      title: "Weekend<br>Adventure<br>Planner",
      dek: "Give Saturday a storyline. A one-page plan, an adventure picker, a packing and budget page and a place to remember it all.",
      badge: "Free printable",
      hand: "let's give saturday a storyline",
      tone: "t-matcha",
      doodles: coverDoodles("flower"),
      footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">Weekend plan · Adventure picker · Details, packing &amp; budget · Memory page and four-weekend tracker</p>`,
    }),
    page(
      "The weekend plan",
      "Ten minutes on Thursday evening. Pick one anchor plan per day and leave the rest loose on purpose.",
      `
      <p>Weekend of ${fill("l")} &nbsp;&nbsp; Mood: ${fill()}</p>
      <div class="grid g2 mt1" style="gap:0.16in">
        <div class="box t-butter-s"><span class="lbl">Saturday</span>
          <p class="small mt1"><b>Morning</b></p>${lines(2)}<p class="small"><b>Afternoon</b></p>${lines(2)}<p class="small"><b>Evening</b></p>${lines(2)}</div>
        <div class="box t-strawberry-s"><span class="lbl">Sunday</span>
          <p class="small mt1"><b>Morning</b></p>${lines(2)}<p class="small"><b>Afternoon</b></p>${lines(2)}<p class="small"><b>Evening</b></p>${lines(2)}</div>
        ${box("People to see", { n: 3 })}
        ${box("Something creative", { n: 3 })}
        ${box("Something new", { n: 3 })}
        ${box("Rest and do-nothing time", { n: 3, hint: "Schedule it. Seriously." })}
        ${box("Little things I'm looking forward to", { n: 2, cls: "span2" })}
      </div>
      <div class="box t-matcha-s mt1"><span class="lbl">One thing I want to remember</span>${lines(1)}</div>
    `,
      { hand: "a storyline, not a schedule" },
    ),
    page(
      "The adventure picker",
      "Stuck? Pick one from the column that matches your energy. Circle it, then move it onto the plan.",
      `
      <div class="grid g2" style="gap:0.14in 0.2in">
      ${picker.map(([t, tone, items]) => `<div class="${tone}" style="padding:0.1in 0.15in 0.1in;border-radius:3px"><h3 class="sec">${D.star()}${t}</h3>${checklist(items, { cls: "roomy" })}</div>`).join("")}
      </div>
      <div class="box mt2"><span class="lbl">My own adventure ideas</span>${lines(3)}</div>
      <p class="hand" style="font-size:16pt;margin-top:0.15in;text-align:center">pick one. tell a friend. put it in the calendar.</p>
    `,
      { hand: "choose your own" },
    ),
    page(
      "Adventure details",
      "Everything you'd otherwise be fumbling for at the door. Fill it in before you go.",
      `
      <div class="grid g2" style="gap:0.2in">
        <div class="stack">
          <div class="box t-butter-s"><span class="lbl">The adventure</span>
            <p class="mt1">What: ${fill("l")}</p><p class="mt1">Where: ${fill("l")}</p><p class="mt1">When: ${fill("l")}</p><p class="mt1">With: ${fill("l")}</p></div>
          ${box("Getting there", { n: 3, hint: "Route, leave-by time, parking or transit notes." })}
          ${box("Check before I go", { n: 3, hint: "Opening hours, weather, whether it needs a booking." })}
          ${box("Backup plan if it rains", { n: 2, tone: "t-sunday-s" })}
        </div>
        <div class="stack">
          <div class="box"><span class="lbl">Tote bag checklist</span>${checklist(["Water bottle", "Snack", "Phone charger", "Cash or card", "Sunscreen or umbrella", "Comfortable shoes", "Notebook and pen", "Tote or bag for finds", "Something to read"], { cls: "tight" })}${checklist(["", "", ""], { cls: "tight" })}</div>
          <div class="box t-matcha-s"><span class="lbl">Little budget</span>
            <table class="tbl" style="margin-top:0.06in"><thead><tr><th>What</th><th>Planned</th><th>Actual</th></tr></thead><tbody>
            ${["Getting there", "Food and drink", "Activity", "Treat", "Other"].map((r) => `<tr><td>${r}</td><td></td><td></td></tr>`).join("")}
            <tr><td><b>Total</b></td><td></td><td></td></tr></tbody></table></div>
        </div>
      </div>
    `,
      { hand: "future you says thanks" },
    ),
    page(
      "The memory page",
      "A few lines now save you from “what did we even do?” in March. Tape a ticket, a receipt or a leaf in the dotted box.",
      `
      <div class="grid g2" style="gap:0.2in">
        <div class="box"><span class="lbl">Stick something here</span><div class="dots" style="--n:9"></div></div>
        <div class="stack">
          ${box("The best moment", { n: 3, tone: "t-butter-s" })}
          ${box("What we ate and drank", { n: 2 })}
          ${box("What I'd do again", { n: 2, tone: "t-strawberry-s" })}
          ${box("What I'd change", { n: 2 })}
        </div>
      </div>
      <div class="mt3">${sec("Four weekends at a glance")}
      <table class="tbl tall"><thead><tr><th style="width:18%">Weekend of</th><th>The adventure</th><th style="width:25%">How it felt</th></tr></thead><tbody>
      ${[1, 2, 3, 4].map(() => `<tr><td></td><td></td><td>${rate()}</td></tr>`).join("")}</tbody></table></div>
    `,
      { hand: "keep the good ones" },
    ),
  ],
};

/* =====================  4. SOLO DATE IDEA CARDS  ===================== */
const soloCards = [
  {
    cat: "Table for one",
    title: "Dinner at the bar",
    body: "Take the good stool, order the thing you'd never split with anyone and make friends with the menu.",
    time: "1.5 hrs",
    cost: "Treat yourself",
    hand: "no phone on the table",
  },
  {
    cat: "Table for one",
    title: "The cover-only book",
    body: "Walk into a bookstore and choose a book purely by its cover. Read the first chapter right there with a drink.",
    time: "1.5 hrs",
    cost: "Low spend",
    bring: "tote bag",
  },
  {
    cat: "Table for one",
    title: "Matinee for one",
    body: "Catch a mid-afternoon film. Sit in the exact seat you want and eat the popcorn without sharing.",
    time: "2.5 hrs",
    cost: "Low spend",
  },
  {
    cat: "Table for one",
    title: "One museum room",
    body: "Pick one room and stay for forty minutes. Find the piece you'd put in your own house and work out why.",
    time: "1 hr",
    cost: "Free or low",
    bring: "small notebook",
  },
  {
    cat: "Table for one",
    title: "A real solo picnic",
    body: "Cloth napkin, proper snacks, a good view and a book. Treat yourself like a guest you're thrilled to host.",
    time: "2 hrs",
    cost: "Low spend",
    bring: "blanket",
  },
  {
    cat: "Table for one",
    title: "Café sketch hour",
    body: "Order something warm and draw the cup, the window or the person's hat across the room. Wobbly lines welcome.",
    time: "1 hr",
    cost: "Low spend",
    bring: "pen and pad",
  },
  {
    cat: "Creative",
    title: "Paint the view",
    body: "Set up at a window and paint what's outside in whatever medium you own. Stop at the timer, not at perfect.",
    time: "1 hr",
    cost: "Free",
    bring: "paints or pens",
  },
  {
    cat: "Creative",
    title: "Magazine collage",
    body: "Rip out thirty pages and glue together a page that feels like this month. Choose by color, not by meaning.",
    time: "1 hr",
    cost: "Free",
    bring: "glue, scissors",
  },
  {
    cat: "Creative",
    title: "One journal page",
    body: "Fill one junk journal page with tickets, stamps, a receipt and one honest sentence about this week.",
    time: "45 min",
    cost: "Free",
    bring: "journal, glue",
  },
  {
    cat: "Creative",
    title: "Pottery studio drop-in",
    body: "Paint a mug or plate at a local studio. Pick colors you'd never wear and decide what it's for later.",
    time: "2 hrs",
    cost: "Treat yourself",
  },
  {
    cat: "Creative",
    title: "Hand-lettered alphabet",
    body: "Learn one new lettering style from a beginner video, then write your favorite quote with it.",
    time: "1 hr",
    cost: "Free",
    bring: "pen, paper",
  },
  {
    cat: "Creative",
    title: "Postcard to future you",
    body: "Write yourself a postcard about what you're loving right now. Put it somewhere you'll find it in six months.",
    time: "30 min",
    cost: "Free",
  },
  {
    cat: "After hours",
    title: "Dinner party for one",
    body: "Cook something you'd serve to guests, set the table properly and light a candle. Eat slowly.",
    time: "2 hrs",
    cost: "Low spend",
    hand: "cloth napkins, always",
  },
  {
    cat: "After hours",
    title: "Album listening party",
    body: "Pick an album you've never heard all the way through. Lights low, no scrolling, headphones on.",
    time: "1 hr",
    cost: "Free",
  },
  {
    cat: "After hours",
    title: "Candle-and-book bath night",
    body: "Run the bath, find the book you've been saving and put your phone in another room. That's the whole date.",
    time: "1 hr",
    cost: "Free",
  },
  {
    cat: "Weekend",
    title: "Golden hour wander",
    body: "Walk with no destination an hour before sunset. Turn at every second corner. Take one photo.",
    time: "1 hr",
    cost: "Free",
    bring: "comfy shoes",
  },
  {
    cat: "Weekend",
    title: "Wishlist window-shopping",
    body: "Browse a favorite shop with a rule: write down five things you love and buy none of them today.",
    time: "1.5 hrs",
    cost: "Free",
    bring: "notes app",
  },
  {
    cat: "Weekend",
    title: "Farmers market lunch",
    body: "Wander the whole market once, then build a lunch from three different stalls and eat it on a bench.",
    time: "2 hrs",
    cost: "Low spend",
    bring: "tote bag",
  },
];
export const solo = {
  slug: "solo-date-idea-cards",
  file: "solo-date-idea-cards.html",
  title: "Solo Date Idea Cards",
  footerLabel: "Solo Date Idea Cards",
  pages: [
    cover({
      kicker: "Table for One · free cut-out cards",
      title: "Solo Date<br>Idea<br>Cards",
      dek: "Eighteen small dates with yourself to cut out, shuffle and pull from a jar. Free, easy, and no one else's schedule required.",
      badge: "Free printable",
      hand: "you're great company",
      tone: "t-strawberry",
      doodles: coverDoodles("bow"),
      footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">How to use the cards · 18 date cards (cut-and-shuffle) · 6 blank cards for your own ideas</p>`,
    }),
    page(
      "How to use these cards",
      "Cut them out, fold them or leave them flat, drop them in a jar and pull one when the weekend feels empty.",
      `
      <div class="grid g2" style="gap:0.3in">
        <div>${steps(["<b>Print</b> pages 3 to 6 on US Letter. Thicker paper makes them last, but plain works fine.", "<b>Cut</b> along the dashed lines. Each page makes six cards.", "<b>Shuffle</b> and pull one. Veto allowed once, then you're committed.", "<b>Put it in the calendar</b> before you get home. A date you don't schedule is just a nice idea.", "<b>Tick it off</b> on the card when you're done and keep the pile."])}</div>
        <div class="stack">
          ${note("<b>Make it feel like a date:</b> dress for the version of you you'd like to meet, put your phone on airplane mode and show up a few minutes early.")}
          <div class="box t-butter-s"><span class="lbl">Cost labels</span><p class="small mt1"><b>Free</b>: costs nothing or just a bus fare.</p><p class="small"><b>Low spend</b>: a coffee, a ticket, a snack.</p><p class="small"><b>Treat yourself</b>: a proper meal or class. Set your own cap.</p></div>
          <div class="box t-matcha-s"><span class="lbl">Solo-date sense</span>${bullets(["Tell a friend where you're going and when you'll be back.", "Choose daytime or busy places if you prefer.", "Leave when you're done. You don't owe anyone a full evening."])}</div>
        </div>
      </div>
      <div class="mt3 box t-strawberry-s"><span class="lbl">My solo date wishlist</span>${lines(4)}</div>
      <p class="hand" style="font-size:19pt;margin-top:0.2in;text-align:center">dates with yourself count. wear the good earrings.</p>
    `,
      { hand: "party of one" },
    ),
    ...cardPages(soloCards, "Solo Date Idea Cards"),
    ...cardPages(Array(6).fill(null), "Solo Date Idea Cards"),
  ],
};

/* =====================  5. CREATIVE HOBBY STARTER CHECKLIST  ===================== */
export const starters = [
  [
    "Watercolor",
    "t-sunday-s",
    ["Any paper you own", "A mug of water, an old towel"],
    ["A small pan set", "One round brush"],
    ["Good paper, extra brushes, masking fluid"],
    "Paint a simple wash and three small shapes.",
  ],
  [
    "Junk journaling",
    "t-butter-s",
    ["Scrap paper, envelopes, receipts", "Glue stick, scissors"],
    ["A notebook that can handle glue", "Washi tape"],
    ["Stamps, stickers, fancy ephemera"],
    "Fill one page with whatever's in your recycling.",
  ],
  [
    "Air-dry clay",
    "t-strawberry-s",
    ["A smooth work surface", "A bowl of water, a butter knife"],
    ["One block of air-dry clay", "A rolling pin you own"],
    ["Paints, sealers, tools"],
    "Make a small trinket dish and let it dry overnight.",
  ],
  [
    "Embroidery",
    "t-matcha-s",
    ["A scrap of cotton fabric", "Sharp scissors"],
    ["A small hoop", "Six-strand floss in 3 colors", "Embroidery needles"],
    ["Patterns, more colors, fabric packs"],
    "Stitch your initial in simple backstitch.",
  ],
  [
    "Bracelet making",
    "t-butter-s",
    ["A flat table, tape", "Scissors"],
    ["A few bead colors", "Stretch cord or string"],
    ["Charms, clasps, a bead storage box"],
    "Make one bracelet for a friend.",
  ],
  [
    "Crochet",
    "t-strawberry-s",
    ["Scissors", "A blunt needle for ends"],
    ["One hook in a mid size", "One smooth cotton yarn"],
    ["Patterns, yarn bundles, stitch markers"],
    "Make a small flat square, any wonky size.",
  ],
  [
    "Collage",
    "t-sunday-s",
    ["Magazines, old books, junk mail", "Scissors, glue stick"],
    ["A pad of heavy paper"],
    ["Specialty papers, craft knife, gel medium"],
    "Cut thirty shapes and arrange them before gluing.",
  ],
  [
    "Hand lettering",
    "t-matcha-s",
    ["Any pencil, any paper"],
    ["A fine felt-tip pen", "A brush pen"],
    ["Guide sheets, ink, nibs"],
    "Write the alphabet three ways.",
  ],
];
export const starterCard = ([
  name,
  tone,
  have,
  start,
  later,
  first,
]) => `<div class="${tone}" style="padding:0.16in 0.18in;border-radius:3px">
  <h3 style="font-family:var(--display);font-style:italic;font-weight:600;font-size:15pt;color:var(--cherry);line-height:1.1">${name}</h3>
  <p class="kicker mt1" style="color:var(--garden)">Already at home</p>${checklist(have)}
  <p class="kicker mt1" style="color:var(--garden)">Start with</p>${checklist(start)}
  <p class="kicker mt1" style="color:var(--garden)">Buy later, only if you love it</p>${checklist(later)}
  <p class="mt1" style="font-size:10pt"><b>First session:</b> ${first}</p></div>`;
export const starter = {
  slug: "creative-hobby-starter-checklist",
  file: "creative-hobby-starter-checklist.html",
  title: "Creative Hobby Starter Checklist",
  footerLabel: "Creative Hobby Starter Checklist",
  pages: [
    cover({
      kicker: "Creative Corner · a free checklist",
      title: "Creative<br>Hobby Starter<br>Checklist",
      dek: "What you actually need to begin eight creative hobbies, and what can wait. Start with what you have and buy the rest later, if at all.",
      badge: "Free printable",
      hand: "start small, buy last",
      tone: "t-butter",
      doodles: coverDoodles("flower"),
      footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">Before-you-buy rules · 8 starter lists · your own list and spend tracker</p>`,
    }),
    page(
      "Before you buy anything",
      "A tiny supply list is a kindness to your wallet and your future self. Run every purchase through these five questions.",
      `
      <div class="grid g2" style="gap:0.3in">
        <div>${steps(["<b>Do I already own something that works?</b> Pencils, scrap paper, old fabric and kitchen tools go a long way.", "<b>Can I borrow or buy it used?</b> Friends, community groups and secondhand shops are great for tools.", "<b>Have I tried it twice?</b> Wait for the second session before buying more than the basics.", "<b>Does it solve a problem I actually had?</b> Buy to fix a frustration, not to feel prepared.", "<b>Can I wait a week?</b> Put it on the wishlist. If you still want it, buy it."])}</div>
        <div class="stack">
          ${note("<b>This checklist names types of supplies, not brands.</b> Check shops near you for what's available and sensible. We don't list prices because they change.")}
          ${box("What I'm tempted to buy and haven't yet", { n: 4, tone: "t-strawberry-s" })}
          ${box("What I already have that could work", { n: 4, tone: "t-matcha-s" })}
        </div>
      </div>
      <div class="grid g2 mt3" style="gap:0.2in">${box("Where I can borrow or buy used", { n: 4, hint: "Friends, community groups, secondhand shops, craft swaps." })}${box("What I'll make with what I have", { n: 4, tone: "t-sunday-s" })}</div>
      <div class="t-butter-s mt2" style="padding:0.2in 0.25in;border-radius:3px"><h3 class="sec">The golden rule</h3><p class="ital" style="font-size:14pt;color:var(--ink)">Your first project should cost almost nothing. If you love it, then you've earned the nice paper.</p></div>
    `,
      { hand: "the wishlist can wait" },
    ),
    page(
      "Starter lists: part one",
      "Tick what you have. Circle what you'll start with. Cross out what can wait.",
      `<div class="grid g2" style="gap:0.14in">${starters.slice(0, 4).map(starterCard).join("")}</div>${box("Notes: which one am I trying first, and when?", { n: 3, cls: "mt2" })}`,
      { hand: "make, mess, repeat" },
    ),
    page(
      "Starter lists: part two",
      "Same rule: borrow, thrift, wait. Only the “start with” list is needed for session one.",
      `<div class="grid g2" style="gap:0.14in">${starters.slice(4).map(starterCard).join("")}</div>${box("Notes: what I already have that fits these", { n: 3, cls: "mt2" })}`,
      { hand: "tiny kits win" },
    ),
    page(
      "My own starter list",
      "Pick the hobby you're trying next, list the bare minimum, and track every dollar so there are no surprises.",
      `
      <div class="box t-butter-s"><p>Hobby: ${fill("l")} &nbsp;&nbsp; First session on: ${fill()}</p><p class="mt1">Spending cap for the first month: ${fill("s")}</p></div>
      <table class="tbl tall mt2"><thead><tr><th style="width:34%">Item</th><th>Own / borrow / thrift / buy</th><th style="width:15%">Planned</th><th style="width:15%">Actual</th><th style="width:9%">Got it</th></tr></thead><tbody>
      ${Array.from({ length: 10 })
        .map(() => `<tr><td></td><td></td><td></td><td></td><td>${ck()}</td></tr>`)
        .join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">
        ${box("Wishlist (wait one week)", { n: 4 })}
        ${box("After two sessions: what did I really use?", { n: 4, tone: "t-matcha-s" })}
      </div>
    `,
      { hand: "count every dollar" },
    ),
  ],
};

/* =====================  6. GIRLS' NIGHT HOSTING PLANNER  ===================== */
const themes = [
  [
    "Bracelet bar",
    "A bowl of beads, some cord and a playlist. Everyone leaves with one for themselves and one to give.",
  ],
  [
    "Mahjong and snacks",
    "Teach the basics, share a snack spread and keep the rules loose enough to laugh.",
  ],
  [
    "Paint-and-sip (tea optional)",
    "Pre-sketched canvases, an easy subject and a prize for the funniest result.",
  ],
  [
    "Junk journal swap",
    "Everyone brings scraps and glue. Trade, make a page and swap one at the end.",
  ],
  [
    "Cook-along",
    "One recipe, one table, everyone cooks a course. Pass the plates and eat at once.",
  ],
  [
    "Clothes swap",
    "Bring five things you're done with, take five you love. Mirror and music essential.",
  ],
  ["Book club dinner", "Cozy food, one question each and the freedom to ignore the book entirely."],
  ["Movie and manicure", "Cheesy film, nail polish and bowls of popcorn. Zero planning needed."],
  ["Game night", "Three games ranging from calm to chaos and a winner's tiny trophy."],
  ["Picnic in the park", "Blankets, a shared spread and a camera for golden hour."],
  [
    "Craft supply swap",
    "Everyone empties the craft closet, trades and ends up with something new.",
  ],
  ["Garden night", "Cuttings, small pots and a plant swap. Take home something alive."],
];
export const hosting = {
  slug: "girls-night-hosting-planner",
  file: "girls-night-hosting-planner.html",
  title: "Girls' Night Hosting Planner",
  footerLabel: "Girls' Night Hosting Planner",
  pages: [
    cover({
      kicker: "Better Together · a free planner",
      title: "Girls' Night<br>Hosting<br>Planner",
      dek: "Plan a night that feels effortless: theme, guests, menu, budget and a timeline so you get to enjoy your own party.",
      badge: "Free printable",
      hand: "good hosts sit down too",
      tone: "t-sunday",
      doodles: coverDoodles("bow"),
      footerNote: `<p class="kicker">Inside</p><p style="margin-top:0.05in;font-size:10pt">Plan on a page · Guest list &amp; RSVPs · Menu, supplies &amp; budget · Run of show · 12 theme ideas</p>`,
    }),
    page(
      "The night on a page",
      "Fill this in first. Everything else on the next pages grows from these decisions.",
      `
      <div class="grid g2" style="gap:0.16in">
        <div class="box t-butter-s"><span class="lbl">The basics</span><p class="mt1">Date: ${fill()}</p><p class="mt1">Start: ${fill("s")} &nbsp; End: ${fill("s")}</p><p class="mt1">Where: ${fill("l")}</p><p class="mt1">Guests (max): ${fill("s")}</p></div>
        <div class="box t-strawberry-s"><span class="lbl">The vibe</span><span class="hint">Circle a few.</span><p class="ital mt1" style="font-size:11.5pt;color:var(--cherry);line-height:1.5">cozy · chatty · silly · glam · creative · low-key · cheerful · pajamas</p></div>
        ${box("Theme", { n: 2, hint: "See page 6 for twelve easy ones." })}
        ${box("The main activity", { n: 2 })}
        ${box("Food and drink plan", { n: 3, hint: "One main thing, two snacks, one sweet, one non-alcohol option." })}
        ${box("Atmosphere", { n: 3, hint: "Lighting, music, decor, scent. Pick two, not all four." })}
        ${box("My budget", { n: 0, inner: `<p class="mt1">Total: ${fill("s")}</p><p class="mt1">Per guest: ${fill("s")}</p><p class="mt1">Splitting costs? ${ck()} Yes ${ck()} No</p>` })}
        ${box("One thing that would make this feel special", { n: 3, tone: "t-matcha-s" })}
      </div>
      <div class="note mt2"><b>Host's secret:</b> do one thing really well and keep the rest simple. A great playlist and one good snack beat a stressful buffet every time.</div>
    `,
      { hand: "keep it easy" },
    ),
    page(
      "Guest list and RSVPs",
      "Invite a few more than you need, then check in the week before. A small cozy group is better than a big awkward one.",
      `
      <table class="tbl tall"><thead><tr><th style="width:24%">Name</th><th style="width:15%">Invited</th><th style="width:15%">RSVP</th><th style="width:22%">Dietary / notes</th><th>Bringing</th></tr></thead><tbody>
      ${Array.from({ length: 10 })
        .map(
          () =>
            `<tr><td></td><td>${ck()}</td><td class="small muted">Y / N / ?</td><td></td><td></td></tr>`,
        )
        .join("")}</tbody></table>
      <div class="grid g2 mt2" style="gap:0.2in">
        <div class="box t-butter-s"><span class="lbl">Invite starter</span><p class="ital mt1" style="font-size:10pt;color:var(--ink)">&ldquo;I'm hosting a little ${fill("s")} night on ${fill("s")}. Snacks, a project and good company provided. Say yes by ${fill("s")} and tell me if you have any food needs. Pajamas encouraged.&rdquo;</p></div>
        ${box("Reminder message ideas", { n: 4, hint: "Day-before text: time, address, parking, what to bring." })}
      </div>
    `,
      { hand: "small and cozy wins" },
    ),
    page(
      "Menu, supplies and budget",
      "Plan food for the people who are coming, and write down every supply so the supermarket run is one trip.",
      `
      <div class="grid g2" style="gap:0.2in">
        <div class="stack">
          <div class="box"><span class="lbl">Menu</span><p class="small mt1"><b>Savory</b></p>${lines(2)}<p class="small"><b>Snacks</b></p>${lines(2)}<p class="small"><b>Sweet</b></p>${lines(1)}<p class="small"><b>Drinks (including something without alcohol)</b></p>${lines(2)}</div>
          ${box("Dietary needs to cover", { n: 3, tone: "t-strawberry-s" })}
        </div>
        <div class="stack">
          <div class="box"><span class="lbl">Shopping list</span>${checklist(
            Array.from({ length: 12 }).map(() => ""),
            { cls: "roomy" },
          )}</div>
          <div class="box t-matcha-s"><span class="lbl">Budget</span>
            <table class="tbl" style="margin-top:0.06in"><thead><tr><th>Item</th><th>Planned</th><th>Actual</th></tr></thead><tbody>
            ${["Food", "Drinks", "Supplies for the activity", "Decor", "Other"].map((r) => `<tr><td>${r}</td><td></td><td></td></tr>`).join("")}<tr><td><b>Total</b></td><td></td><td></td></tr></tbody></table></div>
        </div>
      </div>
    `,
      { hand: "one trip to the shop" },
    ),
    page(
      "Run of show",
      "A gentle timeline so nothing sneaks up on you. Tick it off as you go.",
      `
      <div class="grid g2" style="gap:0.16in">
        <div class="box t-butter-s"><span class="lbl">A few days before</span>${checklist(["Send invites and track replies", "Pick the playlist", "Check supplies and order what's missing", "Plan seating (floor cushions count)"], { cls: "tight" })}</div>
        <div class="box t-strawberry-s"><span class="lbl">The day before</span>${checklist(["Confirm numbers and send a reminder", "Shop for food and drink", "Prep anything that can be made ahead", "Wash glasses, plates and napkins"], { cls: "tight" })}</div>
        <div class="box t-matcha-s"><span class="lbl">Two hours before</span>${checklist(["Tidy the main room and a bathroom", "Set out the activity", "Light candles, start the playlist", "Food out of the fridge"], { cls: "tight" })}</div>
        <div class="box t-sunday-s"><span class="lbl">Thirty minutes before</span>${checklist(["Get dressed, get a drink", "Fill water jugs and ice", "Phone on silent", "Take a deep breath"], { cls: "tight" })}</div>
      </div>
      <div class="box mt2"><span class="lbl">During the night</span>
        <table class="tbl tall" style="margin-top:0.06in"><thead><tr><th style="width:18%">Time</th><th>What's happening</th></tr></thead><tbody>
        <tr><td></td><td class="small muted">Arrivals and drinks</td></tr><tr><td></td><td class="small muted">Food out</td></tr><tr><td></td><td class="small muted">The main activity</td></tr><tr><td></td><td class="small muted">Dessert and chat</td></tr><tr><td></td><td class="small muted">Wrap-up and goodbyes</td></tr></tbody></table></div>
      <div class="grid g2 mt2" style="gap:0.2in">${box("After: what worked", { n: 3 })}${box("After: what I'd change", { n: 3 })}</div>
    `,
      { hand: "enjoy your own party" },
    ),
    page(
      "Twelve easy themes",
      "Pick one, copy its idea and adapt freely. Each can be done on a small budget with things you mostly own.",
      `
      <div class="grid g2" style="gap:0.12in 0.22in">
      ${themes.map(([t, d], i) => `<div class="${["t-butter-s", "t-strawberry-s", "t-matcha-s", "t-sunday-s"][i % 4]}" style="padding:0.09in 0.14in;border-radius:3px"><p style="font-family:var(--display);font-style:italic;font-weight:600;font-size:12.5pt;color:var(--cherry)">${i + 1}. ${t}</p><p class="small mt1">${d}</p></div>`).join("")}
      </div>
      <div class="mt2 box"><span class="lbl">My own theme idea</span>${lines(2)}</div>
    `,
      { hand: "borrow any of these" },
    ),
  ],
};

export const freeDocs = [workbook, challenge, weekend, solo, starter, hosting];
