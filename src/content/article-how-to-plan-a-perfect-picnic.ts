import type { Article } from "./types";

export const articleHowToPlanAPerfectPicnic: Article = {
  slug: "how-to-plan-a-perfect-picnic",
  title: "How to Plan the Perfect Aesthetic Picnic",
  titleItalic: "Aesthetic Picnic",
  dek: "A picnic that looks as good as it tastes: a simple timeline, a spot, a menu that survives the trip, what to pack, and a couple of things to do once you've sat down.",
  category: "weekends",
  status: "published",
  publishedAt: "2026-11-19",
  verifiedAt: "2026-11-18",
  hero: "picnic",
  searchIntent: "how to plan a picnic / aesthetic picnic ideas / what to bring on a picnic",
  angle:
    "A picnic as a tiny event: choose a spot, a food plan that survives travel, a packing checklist and two or three things to do on the blanket",
  hobbies: ["picnicking", "reading", "outdoor-sketching", "birdwatching", "film-photography"],
  productIds: ["picnic-blankets", "market-totes", "water-bottles", "pocket-notebooks"],
  related: ["things-to-do-on-the-weekend", "cheap-weekend-adventures", "at-home-creative-weekend"],
  sources: [
    {
      title: "FDA: handling food safely while eating outdoors",
      url: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-food-safely-while-eating-outdoors",
      note: "Two hours, or one hour above 90 F; cold food at or below 40 F; separate drinks cooler",
    },
    {
      title: "CDC: food safety prevention",
      url: "https://www.cdc.gov/food-safety/prevention/index.html",
      note: "Perishable foods and time limits",
    },
    {
      title: "USDA FSIS: food safety while hiking and camping",
      url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-safety-while-hiking-camping",
      note: "Shaded, closed cooler with plenty of ice; do not reuse raw-meat platters and utensils; sanitizer only without soap and water",
    },
    {
      title: "USDA FSIS: leftovers and food safety",
      url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety",
      note: "Throw away perishables left out over 2 hours (1 hour over 90 F)",
    },
    {
      title: "USDA FSIS: grilling food safely",
      url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/grilling-food-safely",
      note: "Cooler in the shade, closed; drinks in a separate cooler",
    },
    {
      title: "CDC: hand sanitizer",
      url: "https://www.cdc.gov/clean-hands/about/hand-sanitizer.html",
      note: "Soap and water is best; sanitizer at least 60% alcohol when unavailable",
    },
    {
      title: "Food Allergy Research & Education: cleaning methods",
      url: "https://www.foodallergy.org/resources/cleaning-methods",
      note: "Soap and water; hand sanitizers do not remove food allergens",
    },
    {
      title: "Food Allergy Research & Education: tips for staying safe with food allergies",
      url: "https://www.foodallergy.org/resources/tips-staying-safe-food-allergies",
      note: "Ask what food will be served and alert the host",
    },
  ],
  coworkChecks: [
    "VERIFIED 2026-11-18: perishables out no more than 2 hours, 1 hour above 90 F (32 C); discard anything left out longer - fda.gov, cdc.gov, fsis.usda.gov",
    "VERIFIED 2026-11-18: cold food at or below 40 F (4 C) with ice or gel packs; cooler shaded, closed, plenty of ice; drinks in a separate cooler - fda.gov, fsis.usda.gov",
    "VERIFIED 2026-11-18: raw meat kept separate; platters and utensils that held raw meat not reused for cooked food - fsis.usda.gov",
    "VERIFIED 2026-11-18: meat, dairy, cut fruit and cooked dishes are perishables covered by the same time limits - cdc.gov, fsis.usda.gov",
    "VERIFIED 2026-11-18: soap and water is best; sanitizer (at least 60% alcohol) only when soap and water are unavailable and it does not remove food allergens; wipes no longer presented as a sanitizer substitute - cdc.gov, fsis.usda.gov, foodallergy.org",
    "VERIFIED 2026-11-18: ask guests about allergies - foodallergy.org",
    "VERIFIED 2026-11-18: park rules (alcohol, flames, glass, barbecues, pets) stay 'varies by location, check local rules'; glass mention now carries the check - reworded, no claim remains",
    "VERIFIED 2026-11-18: no prices or brands stated; citronella candle line removed (no insect-repellent claim) - reworded, no claim remains",
  ],
  body: [
    {
      type: "p",
      text: "Imagine the picture you have in your head: a big soft blanket, a wicker-ish basket, a little spread of things in pretty containers, golden-hour light. Now imagine the real version: a damp sandwich, a blanket that's too small, no way to open the bottle, and a patch of grass picked in a panic.",
    },
    {
      type: "p",
      text: "The gap between the two is mostly planning, and not very much of it. Here's a timeline, how to choose a spot, a menu that holds up in a bag, a packing list, and ways to make it look as good as you hoped.",
    },
    { type: "h2", text: "A timeline that fits real life", id: "timeline" },
    {
      type: "list",
      items: [
        "**Three days out:** choose the day, the spot and the guests. Peek at the forecast.",
        "**The day before:** settle the menu, shop, and make whatever can be made ahead.",
        "**That morning:** pack the cooler and the bag, chill the drinks, check the weather again.",
        "**An hour before:** load up, grab the ice packs, leave a margin for wrong turns.",
      ],
    },
    { type: "h2", text: "Choose the spot like a location scout", id: "spot" },
    {
      type: "list",
      items: [
        "**Shade beats a view.** Some tree cover keeps food and people cooler, and it photographs more softly anyway.",
        "**Flat ground,** not a slope. Your drinks will stay put.",
        "**Near a toilet** if you're staying longer than an hour or two.",
        "**Quieter is nicer.** Go early, or on a weekday evening.",
        "**Check the local rules.** Parks differ on alcohol, barbecues, glass and pets, so look before you pack.",
      ],
    },
    { type: "h2", text: "A menu that travels well", id: "food" },
    {
      type: "p",
      text: "Aim for things that are cold or room temperature, easy to hold, and unbothered by a bumpy walk. One main, two sides, something fresh and something sweet is plenty.",
    },
    {
      type: "list",
      items: [
        "**Mains:** sandwiches or wraps on sturdy bread, a pasta or grain salad, a frittata cut into squares.",
        "**Sides:** crudités and dip, a bean salad, crackers and cheese, olives, pickles.",
        "**Fresh:** grapes, berries, cucumber, sliced fruit kept in a lidded box.",
        "**Sweet:** brownies, cookies, flapjacks, or fruit with a little chocolate.",
        "**Drinks:** water first, then iced tea, lemonade or a thermos of something hot on a cool day.",
      ],
    },
    { type: "h3", text: "The unglamorous bit" },
    {
      type: "p",
      text: "Food safety isn't pretty, but it matters. As a general guide, keep cold food at or below 40 °F (4 °C) with ice packs or plenty of ice in an insulated cooler, and keep the cooler in the shade and closed as much as you can; a separate cooler for drinks means the food cooler gets opened less. Don't leave perishables, such as meat, dairy, cut fruit and cooked dishes, out for more than two hours, or one hour when it's above 90 °F (32 °C). Keep raw meat separate from everything else, and don't reuse a platter or utensils that held raw meat for cooked food. Bin anything that's been out too long rather than gambling. Your local food-safety agency has guidance specific to your region.",
    },
    {
      type: "p",
      text: "Ask guests about allergies and dietary needs before you plan the menu. It's far easier than finding out at the blanket that half the spread is off limits. Wash hands with soap and water where you can. Hand sanitizer with at least 60% alcohol is a backup for when soap and water aren't available, and it doesn't remove food allergens.",
    },
    { type: "h2", text: "Making it look the part", id: "aesthetic" },
    {
      type: "p",
      text: "An aesthetic picnic is mostly a few decisions made on purpose. Pick two or three colors and let the blanket, napkins and food echo them. Decant food into small containers or jars (check whether your park allows glass) so it looks arranged rather than dumped. Cloth napkins and reusable plates photograph better than disposables, and they're gentler on the park.",
    },
    {
      type: "p",
      text: "Add one thing with height or softness: a small bunch of flowers in a jar (our [flower arranging guide](/journal/flower-arranging-as-a-hobby) shows how), a cushion, a tall bottle. Then put your phone away after the first photo. The point of a pretty picnic is that you're actually in it.",
    },
    { type: "h2", text: "The packing list", id: "packing" },
    {
      type: "whatYoullNeed",
      essentials: [
        "A big blanket, ideally with a waterproof backing",
        "A cooler or insulated bag with ice packs",
        "Plates, cutlery, napkins and a sharp knife in a sleeve",
        "Water, other drinks, and a bottle opener or corkscrew if needed",
        "A rubbish bag for everything you take, and wet wipes for sticky fingers",
        "Sun protection and a layer for when the shade moves",
      ],
      optional: [
        "A basket or sturdy tote that looks nice on the grass",
        "A small cushion or two",
        "Reusable tableware and cloth napkins",
        "A game, a book or a sketchbook",
      ],
    },
    {
      type: "list",
      items: [
        "**Probably already own:** a blanket or large throw, a tote, plates and cutlery, jars and lidded containers, napkins, a bottle opener.",
        "**Worth buying if you picnic more than once:** a waterproof-backed blanket and an insulated bag, since they make the practical bits easier.",
        "**Later upgrade:** a proper picnic basket with fitted tableware, if the habit sticks.",
      ],
    },
    { type: "h2", text: "What to do once you're sitting down", id: "activities" },
    {
      type: "p",
      text: "A loose agenda keeps you off your phone. Pick two.",
    },
    {
      type: "list",
      items: [
        "**Read in company.** Everyone brings a book and reads in companionable quiet for half an hour.",
        "**Sketch the view** or each other. [Outdoor sketching](/hobbies/outdoor-sketching) needs only a pencil and a notebook.",
        "**Play something wind-proof,** like cards or a pocket game.",
        "**Take a photo walk** after eating, with a theme.",
        "**Watch for birds** from the blanket. [Birdwatching](/hobbies/birdwatching) works even on a small lawn.",
        "**Pass round conversation prompts** written on little cards.",
      ],
    },
    {
      type: "first30",
      steps: [
        "Lay the blanket and weigh each corner with something heavy.",
        "Open the drinks first. Everyone settles faster with one in hand.",
        "Set the food out in small containers so people can graze.",
        "Take ten quiet minutes before anyone suggests the next thing.",
      ],
    },
    {
      type: "p",
      text: "Leave the spot as you found it. Take everything you brought, scraps and napkins included, and carry a spare bag so you're never tempted to cram rubbish into an already overflowing bin.",
    },
    { type: "h2", text: "When it goes a bit wrong", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**Rain threatens:** a living-room-floor picnic still counts, and the food is already made.",
        "**Wind:** weigh down napkins and use lidded containers.",
        "**Insects:** choose a breezier spot and keep food covered.",
        "**Too hot:** go in the evening or earlier in the morning, with the cooler in shade.",
        "**Forgot something:** keep an always-packed pouch with wipes, napkins, a bag and an opener.",
      ],
    },
    {
      type: "saveSplurge",
      save: "A blanket you already own, containers from the cupboard and food you made yourself.",
      splurge:
        "A properly insulated bag and a roomy waterproof-backed blanket. They'll last for years of picnics.",
    },
    {
      type: "shopHobby",
      title: "Picnic essentials",
      dek: "Optional extras. Start with what you have.",
      productIds: ["picnic-blankets", "market-totes", "water-bottles", "pocket-notebooks"],
    },
    {
      type: "p",
      text: "Looking for more to do with the rest of the weekend? See [things to do on the weekend](/journal/things-to-do-on-the-weekend), or [cheap weekend adventures](/journal/cheap-weekend-adventures) for plans that cost little.",
    },
    {
      type: "tryThisWeekend",
      text: "Keep it tiny: one friend, two sandwiches and a thermos, ninety minutes. See how it feels before you plan the grand version.",
    },
    {
      type: "makePlan",
      text: "Ready to make it real? Use Make Some Plans to pick the day, the mood and the company.",
    },
    { type: "ifYouLoved", hobbies: ["picnicking", "outdoor-sketching", "birdwatching"] },
  ],
};
