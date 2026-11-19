import type { Article } from "./types";

export const articlePickleballForBeginners: Article = {
  slug: "pickleball-for-beginners",
  title: "Everything You Need for Your Pickleball Era",
  titleItalic: "Pickleball Era",
  dek: "What to bring, the few rules worth knowing before your first game, and how to join in when you don't know a soul.",
  category: "movement",
  status: "draft",
  publishedAt: "",
  hero: "tennis",
  searchIntent: "pickleball for beginners / how to start playing pickleball / pickleball equipment",
  angle:
    "A no-jargon starter guide: what you really need, the handful of rules that matter on day one, and how to join open play without feeling like the new kid",
  hobbies: ["pickleball", "tennis"],
  productIds: ["pickleball-sets", "water-bottles", "sports-totes", "tennis-rackets"],
  related: [
    "how-to-start-playing-tennis-as-an-adult",
    "active-hobbies-for-women-who-dont-love-the-gym",
    "things-to-do-after-work-instead-of-scrolling",
  ],
  sources: [
    {
      title: "USA Pickleball Official Rulebook",
      url: "https://usapickleball.org/docs/rules/USAP-Official-Rulebook.pdf",
      note: "Approved balls acceptable indoors or outdoors (Cowork C4, 2026-11-19)",
    },
  ],
  coworkChecks: [
    "Confirm that most casual play is doubles and that open play or paddle-stacking systems are common at public courts (varies by location); name no venues.",
    "Confirm that borrowing paddles at community beginner sessions is common; availability varies by location.",
    "Confirm that court shoes (lateral support) are commonly recommended over running shoes for pickleball by a coaching or governing-body source.",
    "Confirm the 'hold the paddle like a handshake' grip tip against a coaching source, or soften.",
    "Confirm that mixed-level open play is the norm and that rotation etiquette (waiting for a break in play before crossing behind a court, returning stray balls) matches governing-body etiquette guidance.",
    "Confirm that 'typically a modest spend' for a paddle and ball set is expressed as an approximate range, with no price stated as fact.",
    "Equipment: confirm that pickleball uses a solid paddle (not a stringed racket) and a perforated plastic ball, per the official rulebook (USA Pickleball or the relevant national body).",
    "Equipment: RESOLVED by Cowork C4 (2026-11-19): the indoor-versus-outdoor ball difference was removed; the USA Pickleball official rulebook says approved balls are acceptable indoors or outdoors. Recheck the rulebook wording at publish time.",
    "Court: confirm that the court is the same size as a doubles badminton court, 20 feet by 44 feet, with a non-volley zone ('kitchen') extending 7 feet from the net on each side, and a net 36 inches at the sidelines and 34 inches at the center.",
    "Rules: confirm that the serve is underhand, must clear the non-volley zone and land in the diagonal service court, and that the ball must bounce once on each side before volleys are allowed (the two-bounce rule).",
    "Rules: confirm that scoring is typically to 11, win by 2, and that only the serving side scores in traditional scoring; also confirm the caller convention (server score, receiver score, server number).",
    "Rules: confirm that players may not volley (hit the ball out of the air) while standing in the non-volley zone.",
    "Cost: confirm that a beginner paddle and ball set typically fits a modest budget and that public courts are often free; both vary by region.",
  ],
  body: [
    {
      type: "p",
      text: "Imagine a friend sends a message on a Thursday: 'Four of us are playing pickleball Saturday. You're coming.' It isn't a question. You've heard the name a hundred times and still couldn't say whether the ball is hit with a racket, a paddle or a very small tennis shoe.",
    },
    {
      type: "p",
      text: "Good news. This is one of the more forgiving things you can walk into as a beginner. The court is small, the pace is manageable, and a first-timer can usually be rallying within the hour. Here's what to bring, what to know, and how to turn up without feeling like the new kid.",
    },
    {
      type: "p",
      text: "There's also a social side that explains a lot of its popularity. Games are short, partners rotate, and the court is close enough that you can talk to the people on the other side of the net. It's an easy sport to be bad at in good company, which is a fine place to start.",
    },
    { type: "h2", text: "What it actually is", id: "what" },
    {
      type: "p",
      text: "Pickleball is a paddle sport played over a low net on a small court, most often as doubles. It borrows from tennis, badminton and table tennis. You hit a light, perforated plastic ball with a solid paddle, not a stringed racket. Because the court is compact, there's more rallying and less sprinting, which is a big part of why such a wide mix of ages and abilities end up on the same court.",
    },
    { type: "h2", text: "What to bring, and what to skip", id: "gear" },
    {
      type: "whatYoullNeed",
      essentials: [
        "A paddle, which you can often borrow for a first session",
        "A few pickleballs; per the official rulebook, approved balls are fine indoors or outdoors, so one kind covers you",
        "Court shoes or trainers with good side-to-side grip",
        "Water and sun protection",
      ],
      optional: [
        "A starter set that bundles paddles and balls, handy if you're playing with a friend",
        "A visor or hat",
        "A small tote for balls, water and a spare layer",
        "Later upgrade: a better paddle once you've played enough to know what you like",
      ],
    },
    {
      type: "p",
      text: "You probably own more of this than you think: the shoes, the water bottle and a bag to carry it all. Community centers and beginner sessions often lend paddles, and anyone who already plays tends to have a spare. A paddle and ball set is typically a modest spend, though that depends on where and when you shop.",
    },
    {
      type: "p",
      text: "Official equipment lists exist, and organized tournaments follow them. For casual play nobody is checking your paddle, but if you ever plan to compete, look at your national governing body's guidance first.",
    },
    { type: "h2", text: "The court, in plain English", id: "court" },
    {
      type: "p",
      text: "Think of a small court with a low net, similar in scale to a badminton court. Close to the net on each side is a marked zone nicknamed 'the kitchen'. It's the part that trips up almost every beginner, because in general you aren't allowed to hit the ball out of the air while you're standing in it. You can step in to play a ball that has already bounced. Ask whoever you're playing with to point out the lines on your first day.",
    },
    { type: "h2", text: "Four rules worth knowing", id: "rules" },
    {
      type: "list",
      items: [
        "**Serve underhand,** diagonally across the court and past the kitchen. Ask a friendly player to show you the box.",
        "**Let it bounce twice.** After the serve, the ball typically has to bounce once on each side before anyone can volley. It keeps rallies alive.",
        "**Mind the kitchen** when volleying, as above.",
        "**Say the score out loud.** Games are commonly played to eleven, winning by two, and the server calls the score before each serve. The order of the numbers takes one game to learn.",
      ],
    },
    {
      type: "p",
      text: "That's enough to play. If a rule confuses you, ask. People who love this game are usually delighted to explain it.",
    },
    { type: "h2", text: "A first session that doesn't ask much", id: "first-session" },
    {
      type: "first30",
      steps: [
        "Walk, loosen your shoulders and swing your arms a little.",
        "Rally softly with a partner from just behind the kitchen line, counting how many hits you can string together.",
        "Practice ten underhand serves into the correct diagonal.",
        "Play a relaxed game with the double-bounce rule and forget the score.",
        "Cool down, drink water and stop if anything hurts.",
      ],
    },
    { type: "h2", text: "Finding your people", id: "people" },
    {
      type: "p",
      text: "The easiest route is a friend, plus a second friend to make four. Failing that, look at your local recreation department or community board for beginner clinics and drop-in times. Many public courts run open play with a sign-in or paddle-stacking system. If you're nervous, arrive early and watch for ten minutes to see how people rotate, then say, 'Hi, I'm new. Can I join the next game?' It works more often than you'd expect.",
    },
    {
      type: "p",
      text: "Open play usually mixes levels, which is the fastest way to improve. Call the score clearly, return stray balls politely and wait for a break in play before walking behind a court. That covers most of the etiquette.",
    },
    { type: "h2", text: "Beginner habits to retire early", id: "mistakes" },
    {
      type: "p",
      text: "Swinging too hard is the classic; the game rewards placement and patience over power. Standing in the kitchen to volley is next. Forgetting the double bounce comes third, and a quiet reminder before each serve fixes it. Wearing running shoes can also leave you slipping sideways, so choose grip when you can. If your shoulder or wrist aches, rest, loosen your grip (think handshake, not hammer) and see a doctor if it lingers.",
    },
    {
      type: "saveSplurge",
      save: "Borrow a paddle or buy a simple set, and play on free public courts.",
      splurge:
        "A better paddle after ten or so games, once you know whether you like a lighter feel or something with more punch.",
    },
    {
      type: "shopHobby",
      title: "Pickleball essentials",
      dek: "Optional. Play first, buy later.",
      productIds: ["pickleball-sets", "water-bottles", "sports-totes", "tennis-rackets"],
    },
    {
      type: "makePlan",
      text: "Sorry, I have plans past five. Pick a day, ask a friend and book your first game with Make Some Plans.",
    },
    { type: "ifYouLoved", hobbies: ["pickleball", "tennis", "roller-skating"] },
  ],
};
