import type { Article } from "./types";

export const articleHowToStartPlayingTennisAsAnAdult: Article = {
  slug: "how-to-start-playing-tennis-as-an-adult",
  title: "How to Start Playing Tennis as an Adult Beginner",
  titleItalic: "Adult Beginner",
  dek: "A first-month plan with a gear list, a first-session script and what to do when the ball goes everywhere except over the net.",
  category: "movement",
  status: "published",
  publishedAt: "2026-11-19",
  verifiedAt: "2026-11-18",
  hero: "tennis",
  searchIntent: "how to start playing tennis as an adult / tennis for beginners",
  angle:
    "A four-week plan: borrow before you buy, learn two shots, play in short sessions, then add a lesson or a social format",
  hobbies: ["tennis", "pickleball"],
  productIds: ["tennis-rackets", "tennis-balls", "water-bottles", "sports-totes"],
  related: [
    "pickleball-for-beginners",
    "active-hobbies-for-women-who-dont-love-the-gym",
    "things-to-do-after-work-instead-of-scrolling",
  ],
  sources: [
    {
      title: "USTA: tennis scoring rules",
      url: "https://www.usta.com/en/home/improve/tips-and-instruction/national/tennis-scoring-rules.html",
      note: "Points 15, 30, 40, game; deuce; first to six games, win by two; 7-point tiebreak at 6-all",
    },
    {
      title: "USTA: wounded warrior curriculum (grips)",
      url: "https://www.usta.com/content/dam/usta/pdfs/20180302_WoundedWarriorCurricula.pdf",
      note: "Eastern forehand grip described as shaking hands with the racquet",
    },
    {
      title: "USTA: Public Parks resource guide 2026",
      url: "https://www.usta.com/content/dam/usta/2026-pdfs/usta-public-parks-resource-guide-26.pdf",
      note: "Adult Red Ball leagues for beginner adults use slower balls",
    },
    {
      title: "USTA: find the right tennis level for you",
      url: "https://www.usta.com/en/home/improve/gear-up/national/find-the-right-tennis-level-for-you.html",
      note: "Red/Orange/Green balls bounce lower and slower (framed for juniors)",
    },
  ],
  coworkChecks: [
    "VERIFIED 2026-11-18: scoring 15, 30, 40, game; deuce; set = first to six games win by two, tiebreak at 6-all - usta.com",
    "VERIFIED 2026-11-18: shake-hands (Eastern forehand) starting grip - usta.com",
    "VERIFIED 2026-11-18: lower-compression/slower balls can slow the game down; adult beginner leagues use them - usta.com",
    "RESOLVED 2026-11-19: underhand serve - kept only as a beginner tip ('check with whoever you're playing'); 'most people won't mind' removed; USTA treats underhand as a junior-curriculum allowance, not an adult rule",
    "RESOLVED 2026-11-19: 'most beginners hit too low', 'hardest shot to teach yourself', 'adults pick it up faster', 'still playing a year later', 'spare months of habits' - removed or reworded to plain suggestions (no source)",
    "RESOLVED 2026-11-19: ready-position details and the warm-up / stop-if-it-hurts / see a doctor lines - kept as hedged general-caution suggestions ('Try...'), no health claims, per verification note",
    "RESOLVED 2026-11-19: costs, lesson pace, venues, doubles/social formats, wall and public-court use - no prices; reworded to 'check what's nearby', 'if your area has one', 'check local rules'",
  ],
  body: [
    {
      type: "p",
      text: "Four weeks is enough to go from 'haven't held a racket since school' to keeping a short rally going and keeping score. This plan assumes minimal gear, no club and no audience. The courts will have people who've played since they were nine; they're not your benchmark.",
    },
    { type: "h2", text: "Before you start: borrow first", id: "borrow" },
    {
      type: "p",
      text: "Resist buying a racket on day one. Borrow one from a friend, a club or a rental scheme, and play a few times. If you keep wanting to go back, you'll also know what feels comfortable in your hand, which is more useful than any shop assistant's opinion. Free public courts, where your area has them, keep the first month cheap, and a few lessons later are the sensible place to spend.",
    },
    {
      type: "whatYoullNeed",
      essentials: [
        "A racket, borrowed or a beginner model",
        "A can of balls",
        "Sports shoes with some grip, which you probably own",
        "Water and sun protection",
        "A friend, a practice wall or a public court",
      ],
      optional: [
        "A small tote for balls and water",
        "A visor or sweatband",
        "A first group lesson",
        "Softer, slower balls designed for beginners, if you can find them",
      ],
    },
    {
      type: "p",
      text: "Costs depend heavily on where you live, so check public court, club and lesson options nearby before you spend. Arrive ten minutes early so the warm-up doesn't feel rushed. And expect small wins: the ball landing roughly where you meant it to, then doing it twice in a row. Those are the whole point of the first month.",
    },
    { type: "h2", text: "Week 1: meet the ball", id: "week1" },
    {
      type: "p",
      text: "Forget the net for now. You're learning how it feels to make contact.",
    },
    {
      type: "list",
      items: [
        "**The grip.** Shake hands with the handle. It's a forgiving place to begin, and a coach can adjust it later.",
        "**The ready position.** Try feet apart, knees soft, racket out in front, weight a little forward.",
        "**Drop and hit.** Let the ball bounce once and tap it toward a wall or across the net. Do about forty.",
        "**Small steps.** Shuffle your feet so your body gets sideways to the ball, rather than stretching with just your arm.",
      ],
    },
    {
      type: "p",
      text: "A session can be as simple as five minutes of walking and shoulder loosening, ten swings with no ball, forty drop-and-hits, then a gentle stretch. Stop if anything hurts.",
    },
    { type: "h2", text: "Week 2: rally small", id: "week2" },
    {
      type: "p",
      text: "Stand closer to the net than feels dignified and trade gentle shots with a friend. You aren't playing a match. You're counting how many hits you can string together, then trying to beat that number next time. Practice forehands first, backhands second, and if you can find them, ask a coach or club about lower-compression balls, which can slow the game down.",
    },
    { type: "h2", text: "Week 3: serve, then count", id: "week3" },
    {
      type: "p",
      text: "If an overhand serve feels like too much, start underhand while you find your feet, and check with whoever you're playing. A lesson is a good place to learn the overhand serve, where a coach can help you build good habits early.",
    },
    {
      type: "p",
      text: "Scoring runs 15, 30, 40, then game; at 40-all it's deuce, and you win by two points. A set goes to the first to six games, winning by two, with a tiebreak at six-all. If that sounds like a lot, ignore the score for another session or two. It makes more sense in person than on paper.",
    },
    { type: "h2", text: "Week 4: a real game, plus company", id: "week4" },
    {
      type: "p",
      text: "Play a short set with a friend. First to four games is plenty. Then widen the circle: look for a beginner clinic, a group lesson or a relaxed social session where nobody keeps a ranking, if your area has one. Pick a regular slot if you can. The same time each week is what turns a nice idea into a habit.",
    },
    {
      type: "p",
      text: "If once a week is all you have, that's fine. Hit a ball against a wall in between (check local rules on wall use), or shadow a swing in the kitchen while the kettle boils. Short, frequent repetition can help more than one long session.",
    },
    { type: "h2", text: "When it goes sideways", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**The ball won't clear the net.** Aim a little higher than feels right and finish your swing upward.",
        "**It goes everywhere.** Hit softer and think only about contact. Control comes before power.",
        "**Your arm aches.** Stop, shorten the session and check your grip. See a doctor or physiotherapist if it persists.",
        "**You feel silly.** Everyone on that court has sent a ball into the next one.",
      ],
    },
    {
      type: "shopHobby",
      title: "Starter gear",
      dek: "Optional. Play a few times first, then buy what you missed.",
      productIds: ["tennis-rackets", "tennis-balls", "water-bottles", "sports-totes"],
    },
    {
      type: "p",
      text: "Curious about the other racket sport? Read [pickleball for beginners](/journal/pickleball-for-beginners), or browse [active hobbies for women who don't love the gym](/journal/active-hobbies-for-women-who-dont-love-the-gym).",
    },
  ],
};
