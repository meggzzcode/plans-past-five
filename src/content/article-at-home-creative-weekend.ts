import type { Article } from "./types";

export const articleAtHomeCreativeWeekend: Article = {
  slug: "at-home-creative-weekend",
  title: "A Complete Guide to Planning an At-Home Creative Weekend",
  titleItalic: "At-Home Creative Weekend",
  dek: "A two-day plan with a supply list, a loose schedule and enough built-in rest that you finish Sunday feeling restored, not behind.",
  category: "weekends",
  status: "published",
  publishedAt: "2026-11-19",
  verifiedAt: "2026-11-18",
  hero: "shopPottery",
  searchIntent: "at home creative weekend / staycation craft weekend / weekend at home ideas",
  angle:
    "A full two-day itinerary that treats home like a retreat: prep on Friday, a main project each day, and a Sunday-evening wrap-up",
  hobbies: [
    "air-dry-clay",
    "pottery-painting",
    "watercolor-painting",
    "junk-journaling",
    "baking",
    "reading",
    "craft-nights",
  ],
  productIds: ["air-dry-clay", "acrylic-paints", "watercolor-sets", "junk-journals", "washi-tape"],
  related: [
    "creative-hobbies-you-can-start-at-home",
    "how-to-start-junk-journaling",
    "things-to-do-after-work-instead-of-scrolling",
  ],
  sources: [
    {
      title: "CPSC: art materials safety",
      url: "https://www.cpsc.gov/s3fs-public/5015.pdf",
      note: "Read labels; avoid lead, cadmium and other heavy metals in art paints",
    },
    {
      title: "Art & Creative Materials Institute: materials safety",
      url: "https://www.acmiart.org/materials-safety",
      note: "AP and CL seals on art materials",
    },
    {
      title: "Air-dry clay maker FAQ: can air-dry clay pieces be sealed",
      url: "https://www.crayola.com/products/brands/scribble-scrubbie/faqs/can-air-dry-clay-pieces-be-sealed-faq",
      note: "Sealing will not waterproof the piece; display indoors",
    },
  ],
  coworkChecks: [
    "VERIFIED 2026-11-18: art and craft paints - read labels, avoid lead, cadmium and other heavy metals, look for ACMI AP or CL seals; no paint called 'safe to eat' or 'non-toxic' - cpsc.gov, acmiart.org",
    "VERIFIED 2026-11-18: air-dry clay drying time reworded to 'about 2 to 3 days, longer for thick pieces or humidity', per the clay maker's guidance (schedule note added for an undried Sunday) - crayola.com FAQ, clay verification file",
    "VERIFIED 2026-11-18: acrylic over dried clay and water-based sealer where the maker recommends it; sealing does not make it waterproof or food safe; spray sealer follows the can's ventilation and protective-gear directions - crayola.com FAQ",
    "VERIFIED 2026-11-18: no hair dryer or oven unless the maker says it is fine; cracking linked to drying too fast or unevenly - crayola.com FAQ, clay verification file",
    "VERIFIED 2026-11-18: 'under $50' total removed; supply list makes no price claim - reworded, no claim remains",
    "VERIFIED 2026-11-18: watercolor paper buckling reworded as a conditional tip ('if your paper wrinkles') - reworded, no claim remains",
    "VERIFIED 2026-11-18: 'probably already own' split phrased as 'you may already own' - reworded, no claim remains",
  ],
  body: [
    {
      type: "p",
      text: "Picture a Saturday at home that goes one of two ways. You clean until you resent the cleaning, or you sink into the sofa and the hours leak away. There's a third version, where you stay in, make a few small things with your hands, and finish Sunday with a shelf of evidence.",
    },
    {
      type: "p",
      text: "This plan is built for an ordinary apartment and an ordinary budget. It assumes you want a mix of making and resting, a loose structure, and no studio or spotless table.",
    },
    { type: "h2", text: "The shape of the weekend", id: "shape" },
    {
      type: "list",
      items: [
        "**Friday evening:** set up, gather supplies, pick a playlist. Fifteen to thirty minutes.",
        "**Saturday:** clay in the morning, a proper lunch away from the mess, watercolor in the afternoon.",
        "**Sunday:** paint the clay if it has dried, make a journal spread, then a small wrap-up to look at what you made.",
      ],
    },
    {
      type: "p",
      text: "You don't have to do all of it. With one free day, do Saturday. With a friend visiting, scale up the supplies and call it a craft night.",
    },
    { type: "h2", text: "Friday: make a spot", id: "friday" },
    {
      type: "p",
      text: "Clear a table, even a small one, and cover it with newspaper or a wipeable cloth. Keep supplies in a tray or basket so you can pack away between sessions without feeling trapped by the mess.",
    },
    {
      type: "whatYoullNeed",
      essentials: [
        "Air-dry clay (a small block) and a rolling pin or smooth bottle",
        "Acrylic paints in three or four colors, plus a couple of brushes",
        "A small watercolor set and watercolor paper or a sketchbook",
        "A notebook, glue stick, scissors and paper scraps for journaling",
        "Newspaper or a wipeable cloth, a jar of water, paper towels",
      ],
      optional: ["Washi tape and stickers", "A craft apron", "A sealer for finished clay"],
    },
    {
      type: "p",
      text: "Before you shop, check the cupboards. You may already own a notebook, scissors, a glue stick, a jar and some paper towels. What's left is mainly clay, paints and paper, and buying small sizes keeps the shopping list modest; prices vary by store and region. Read the labels on any paints you buy, look for the ACMI AP or CL seal, and avoid products containing lead, cadmium or other heavy metals. Don't treat any paint as safe to eat unless its label says so.",
    },
    {
      type: "list",
      items: [
        "**Essentials:** clay, a few acrylics, a small watercolor set, paper.",
        "**Probably already own:** notebook, scissors, glue, jar, paper towels, newspaper, a rolling pin.",
        "**Optional:** washi tape, an apron, a sealer.",
        "**Later upgrade:** heavier watercolor paper, better brushes, a nicer notebook to keep.",
      ],
    },
    {
      type: "p",
      text: "Also on Friday: queue a playlist, plan two easy meals, and decide where your phone lives. A drawer or another room works well.",
    },
    { type: "h2", text: "Saturday morning: clay", id: "saturday-am" },
    {
      type: "p",
      text: "Clay goes first because it needs time to dry. Roll out a slab of even thickness, cut a circle with a glass, press up the edges, and that's a trinket dish. It's decorative only, so don't use it for food or drink, even if you seal it. Make three. Pinch a small pot for number four and press a pattern into it.",
    },
    {
      type: "first30",
      steps: [
        "Knead the clay for a minute until it's smooth and warm.",
        "Roll it out on a mat or baking paper.",
        "Cut shapes with a glass, a cookie cutter or a blunt knife.",
        "Smooth rough edges with a damp finger.",
        "Leave everything to dry somewhere safe, away from direct heat.",
      ],
    },
    {
      type: "p",
      text: "Air-dry clay usually takes about 2 to 3 days to dry, longer for thick pieces or a humid room. Follow the packet, and resist the hair dryer or oven unless the maker says it's fine.",
    },
    { type: "h2", text: "Lunch, and a proper break", id: "lunch" },
    {
      type: "p",
      text: "Leave the table. Eat somewhere that isn't the craft zone, then walk around the block or lie down with a book for twenty minutes. This isn't lost time; it's what keeps the afternoon fun.",
    },
    { type: "h2", text: "Saturday afternoon: small watercolors", id: "saturday-pm" },
    {
      type: "p",
      text: "Paint small and fast. Set a ten-minute timer and paint one thing on the table: a flower, a mug, a lemon. Do five. They won't all be good, which is rather the point, because the practice is in getting loose.",
    },
    {
      type: "list",
      items: [
        "Lots of water for soft backgrounds, less for details.",
        "Let layers dry a little before adding the next, or let colors bleed on purpose.",
        "If your paper wrinkles when it's very wet, tape the edges down or try heavier paper.",
        "Make a swatch page, a small grid of every color you own, so you know what each does.",
      ],
    },
    { type: "h2", text: "Saturday evening", id: "saturday-evening" },
    {
      type: "p",
      text: "Cook something easy, light a candle, put something on. Leave your supplies where they are. You're coming back tomorrow.",
    },
    { type: "h2", text: "Sunday morning: paint the clay", id: "sunday-am" },
    {
      type: "p",
      text: "Check the clay. If it's dry and hard, paint it with acrylics: a base coat first, then dots, stripes or tiny flowers. Give each coat time to dry. If it isn't dry yet, leave it, do the journal spread first and paint it later in the week. If your clay maker recommends a sealer, add it once the paint is dry, following the product's directions, including any ventilation and protective-gear instructions on a spray can. A sealer won't make the piece waterproof or food safe, so keep it indoors and for display.",
    },
    { type: "h2", text: "Sunday afternoon: a journal spread", id: "sunday-pm" },
    {
      type: "p",
      text: "Collect the weekend's evidence: the swatch page, a paint-stained paper towel, a recipe scrap, a ticket. Glue it into a notebook and write a few lines about what you made. [The beginner's guide](/journal/how-to-start-junk-journaling) has more ideas.",
    },
    { type: "h2", text: "Sunday evening: a small ceremony", id: "sunday-evening" },
    {
      type: "p",
      text: "Put the finished pieces on a shelf. Take a photo if you want one. Note what you enjoyed most and what you'd skip next time, then pack the supplies somewhere findable. Your free time doesn't need a performance review, but a two-line note to self is nice.",
    },
    {
      type: "tryThisWeekend",
      text: "Short on time? Do clay on Saturday morning and the journal spread on Sunday evening. Two sessions are enough.",
    },
    { type: "h2", text: "If something goes sideways", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**Clay cracks while drying:** cracks usually come from drying too fast or unevenly, so dry it slowly, away from heat.",
        "**Paint looks streaky:** add a second coat once the first is dry.",
        "**You're bored by Saturday afternoon:** swap the project. Bake, read, rearrange a shelf.",
        "**You don't feel creative:** copy something. Trace, follow a tutorial, paint a photograph. Copying is how most people start.",
      ],
    },
    {
      type: "saveSplurge",
      save: "A single small set of paints, a basic brush set and inexpensive paper. They go further than you'd expect.",
      splurge:
        "Better watercolor paper or a lovely notebook, so the things you make feel worth keeping.",
    },
    {
      type: "shopHobby",
      title: "Stock your creative weekend",
      dek: "Optional. Start with what you have.",
      productIds: [
        "air-dry-clay",
        "acrylic-paints",
        "watercolor-sets",
        "junk-journals",
        "washi-tape",
      ],
    },
    {
      type: "p",
      text: "Not sure what to buy? [Creative hobby starter kits worth considering](/journal/creative-hobby-starter-kits-worth-considering) weighs up the bundles. For a different kind of weekend, see [things to do on the weekend](/journal/things-to-do-on-the-weekend).",
    },
    {
      type: "makePlan",
      text: "Want a different mood for the weekend? Make Some Plans can build one around your time and energy.",
    },
    { type: "ifYouLoved", hobbies: ["air-dry-clay", "watercolor-painting", "craft-nights"] },
  ],
};
