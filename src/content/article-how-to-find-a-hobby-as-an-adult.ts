import type { Article } from "./types";

export const articleHowToFindAHobbyAsAnAdult: Article = {
  slug: "how-to-find-a-hobby-as-an-adult",
  title: "How to Find a Hobby as an Adult When You Don't Know Where to Start",
  titleItalic: "Don't Know Where to Start",
  dek: "For the person who says 'I don't really have any interests': a small, low-stakes way to find out what you'd happily do again, with a one-week experiment at the end.",
  category: "after-hours",
  status: "published",
  publishedAt: "2026-11-19",
  verifiedAt: "2026-11-18",
  hero: "soloCafe",
  searchIntent: "how to find a hobby as an adult / I don't have any hobbies",
  angle:
    "Treat finding a hobby as a small experiment, not a personality test: audit, pick a craving, try cheap, review, repeat",
  hobbies: [
    "watercolor-painting",
    "air-dry-clay",
    "hiking",
    "pickleball",
    "reading",
    "thrifting",
    "book-clubs",
    "craft-nights",
  ],
  productIds: ["watercolor-sets", "air-dry-clay", "pocket-notebooks", "daypacks"],
  related: [
    "hobbies-to-try-when-life-feels-like-work-sleep-repeat",
    "things-to-do-after-work-instead-of-scrolling",
    "creative-hobbies-you-can-start-at-home",
  ],
  sources: [
    {
      title: "National Park Service: hiking safety",
      url: "https://www.nps.gov/articles/hiking-safety.htm",
      note: "Tell someone your route, check weather, carry water; hiking alone not recommended",
    },
    {
      title: "NPS Mount Rainier: hiking safety",
      url: "https://www.nps.gov/mora/planyourvisit/hiking-safety.htm",
      note: "The ten essentials",
    },
  ],
  coworkChecks: [
    "VERIFIED 2026-11-18: hiking appears only as a hobby suggestion with no safety instructions; NPS advises telling someone your route, checking weather and carrying water, and not hiking alone - nps.gov",
    "VERIFIED 2026-11-18: library, community-center, studio and court drop-in sessions described as 'many' with 'check locally'; no price claim - reworded, no claim remains",
    "VERIFIED 2026-11-18: no cost ranges appear in the article ('typically under $25' items not present) - reworded, no claim remains",
    "VERIFIED 2026-11-18: /hobby-finder quiz description updated to match the live tool (seven questions about time, budget, energy and company; no sign-up) - src/routes/hobby-finder.tsx",
    "VERIFIED 2026-11-18: no habit-formation timeline appears in the article - nothing to cite",
    "VERIFIED 2026-11-18: cross-links - related list trimmed to published articles (low-energy-hobbies and affordable-hobbies-under-25 removed) - reworded",
  ],
  body: [
    {
      type: "p",
      text: "What do you do for fun? If you hear yourself say, 'Oh, you know. Watch things,' it's not a crisis. It's just a little flat, and you know you used to have a longer answer.",
    },
    {
      type: "p",
      text: "Here's the reassuring part: nobody discovers a passion by waiting for a lightning bolt. Hobbies tend to turn up the other way round. You try small things, notice which ones you'd happily repeat, and keep those. That's the whole method, and the steps below just make it tidy.",
    },
    { type: "h2", text: "Start with a nosy little audit", id: "audit" },
    {
      type: "p",
      text: "Get a notebook and answer four questions quickly. The first answer is usually the honest one.",
    },
    {
      type: "list",
      items: [
        "**What did you love at ten?** Drawing, building forts, inventing a language with a friend. The form may have changed but the itch hasn't.",
        "**What eats an afternoon without you noticing?** Even if it's reorganizing the spice rack or reading about lighthouses. That's useful data.",
        "**What do you keep watching and never try?** Pottery videos, trail photos, someone's sourdough. Curiosity you've been politely ignoring.",
        "**Whose weekend do you quietly envy?** The friend with the tennis racket, the colleague with the gorgeous notebooks. Envy is a signpost, not a flaw.",
      ],
    },
    { type: "h2", text: "Work out what you're hungry for", id: "craving" },
    {
      type: "p",
      text: "Different hobbies do different jobs, so it helps to decide what you want from this one right now. Roughly:",
    },
    {
      type: "list",
      items: [
        "**Making something:** [watercolor](/hobbies/watercolor-painting) or [air-dry clay](/hobbies/air-dry-clay).",
        "**Slowing down:** [reading](/hobbies/reading), puzzles, anything repetitive and gentle. For tired evenings, see [low-energy hobbies](/journal/low-energy-hobbies).",
        "**Moving without a gym:** [hiking](/hobbies/hiking) or [pickleball](/hobbies/pickleball).",
        "**Company:** a [book club](/hobbies/book-clubs) or a [craft night](/hobbies/craft-nights).",
        "**A change of scenery:** [thrifting](/hobbies/thrifting) in a neighborhood you never visit.",
      ],
    },
    {
      type: "p",
      text: "Can't pick? The [Hobby Finder quiz](/hobby-finder) asks seven quick questions about your time, budget, energy and company and hands back a short list. No sign-up required. Prefer to browse? [Thirty-five hobbies to try](/journal/hobbies-to-try-when-life-feels-like-work-sleep-repeat) sorts them by how much energy you have.",
    },
    { type: "h2", text: "Pick three and try the smallest version", id: "pick" },
    {
      type: "p",
      text: "Choose three things that sound even faintly interesting. Not the best three, just three. Then give each a cheap trial: no full kit, no class bundle, no pro gear.",
    },
    {
      type: "list",
      items: [
        "**Borrow first.** Library books, a friend's racket, a community taster session.",
        "**Buy the mini version.** One small paint set, not a studio.",
        "**Raid your own home.** A notebook, an old tote, a pen that works.",
        "**Drop in.** Many studios and courts sell single sessions, which can be a lighter commitment than a block. Check locally.",
      ],
    },
    {
      type: "whatYoullNeed",
      essentials: [
        "A notebook for jotting how each try felt",
        "Three hobbies you're curious about",
        "A free evening or weekend slot for each",
        "One rule: starter versions only",
      ],
      optional: ["A friend to join one of them", "A tiny set of supplies for one hobby"],
    },
    {
      type: "p",
      text: "That's the honest shopping list for this whole article. Everything else is a nice extra, and you can ignore it until something has earned a place in your week.",
    },
    { type: "h2", text: "Run a one-week experiment", id: "experiment" },
    {
      type: "p",
      text: "Seven days, three short sessions, thirty to sixty minutes each. Afterwards, jot down how you felt before, how you felt after, and whether you'd go again. Skill doesn't matter. The after-feeling does: lighter, curious, a bit pleased with yourself.",
    },
    { type: "h3", text: "Your one-week experiment" },
    {
      type: "list",
      items: [
        "Monday: thirty minutes with your first pick. Aim for nothing good.",
        "Wednesday: the second pick, ideally somewhere different (outside, or with a friend).",
        "Saturday: the third, or a return visit to whichever felt best.",
        "Sunday: read your notes and underline the one you'd happily repeat.",
      ],
    },
    {
      type: "p",
      text: "Try not to run this in your most frazzled week. Pick a merely ordinary one. Three modest tries will beat one heroic plan that collapses by Tuesday.",
    },
    { type: "h2", text: "Keep one, park one, drop one", id: "decide" },
    {
      type: "list",
      items: [
        "**Keep** the one you'd do again, and put it in next week's calendar.",
        "**Park** the one that was fine but not right now. It goes on a list for another season.",
        "**Drop** the one that felt like homework. That's the system working, not you failing.",
      ],
    },
    {
      type: "p",
      text: "Keep a 'maybe' list in your phone notes while you're at it. A class poster, a friend's project, a video you watched twice: add it. When you run the experiment again, you'll have candidates waiting, and you'll see which ideas keep coming back.",
    },
    { type: "h2", text: "When it doesn't go smoothly", id: "troubleshooting" },
    { type: "h3", text: "'I'm not good at anything.'" },
    {
      type: "p",
      text: "Wonderful, because you aren't auditioning. You're collecting evenings you like.",
    },
    { type: "h3", text: "'Nothing sticks.'" },
    {
      type: "p",
      text: "Change the format before you change the hobby. A solo pursuit can feel lonely and a group one can feel like a second job. Swap one variable and try again.",
    },
    { type: "h3", text: "'I don't have time.'" },
    {
      type: "p",
      text: "Try fifteen minutes, twice a week. If it deserves more, it'll tell you. If not, you've lost almost nothing.",
    },
    { type: "h3", text: "'I felt ridiculous.'" },
    {
      type: "p",
      text: "Very common, and mostly a first-session problem. The second visit is noticeably easier.",
    },
    {
      type: "saveSplurge",
      save: "Borrow, rent or book a single beginner session before buying anything.",
      splurge:
        "After you've tried something three times and still want more, buy one good thing that makes it nicer.",
    },
    {
      type: "shopHobby",
      title: "Starter kits for the experiment",
      dek: "Only if you want them. A notebook and what's already at home is enough.",
      productIds: ["watercolor-sets", "air-dry-clay", "pocket-notebooks", "daypacks"],
    },
    {
      type: "tryThisWeekend",
      text: "Do the audit on Friday evening with something warm to drink. By Saturday morning you'll have three hobbies to try.",
    },
    {
      type: "makePlan",
      text: "Want help turning a hobby into an actual plan? Make Some Plans picks a time, a mood and a setting with you.",
    },
    { type: "ifYouLoved", hobbies: ["watercolor-painting", "hiking", "craft-nights"] },
  ],
};
