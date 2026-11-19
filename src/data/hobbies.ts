import type { ImageKey } from "./images";

export type Cost = "free" | "under25" | "under50" | "flexible";
export type Energy = "low" | "medium" | "high";
export type Setting = "home" | "outdoors" | "out"; // out = somewhere new (studio, café, venue)
export type Company = "solo" | "social";
export type Craving = "creativity" | "relaxation" | "adventure" | "friendship" | "movement" | "different";

export type Hobby = {
  id: string;
  slug: string;
  name: string;
  description: string;
  whyYoullLoveIt: string;
  category: "creative" | "cozy" | "social" | "active" | "outdoors" | "bookish";
  settings: Setting[];
  company: Company[];
  minutes: number; // a realistic first session
  timeLabel: string;
  cost: Cost; // approximate beginner spend
  costLabel: string;
  energy: Energy;
  beginner: 1 | 2 | 3; // 1 = start tonight, 3 = needs a lesson or two
  cravings: Craving[];
  supplies: string[];
  optional: string[];
  firstActivity: string;
  tags: string[]; // at-home, outdoors, after-work, weekend, solo, social, creative, active, low-energy, low-cost
  image?: ImageKey;
  productIds: string[];
};

type Seed = Omit<Hobby, "id" | "slug" | "timeLabel" | "costLabel" | "tags"> & { extraTags?: string[] };

const costLabels: Record<Cost, string> = {
  free: "Free",
  under25: "Under $25 to start",
  under50: "About $25–$50 to start",
  flexible: "Varies — can start small",
};

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function make(s: Seed): Hobby {
  const slug = slugify(s.name);
  const tags = new Set<string>(s.extraTags ?? []);
  if (s.settings.includes("home")) tags.add("at-home");
  if (s.settings.includes("outdoors")) tags.add("outdoors");
  if (s.minutes <= 90) tags.add("after-work");
  if (s.minutes >= 90 || s.settings.includes("outdoors") || s.settings.includes("out")) tags.add("weekend");
  s.company.forEach((c) => tags.add(c));
  if (s.category === "creative") tags.add("creative");
  if (s.energy === "high" || s.category === "active") tags.add("active");
  if (s.energy === "low") tags.add("low-energy");
  if (s.cost === "free" || s.cost === "under25") tags.add("low-cost");
  const { extraTags: _e, ...rest } = s;
  return {
    ...rest, id: slug, slug,
    timeLabel: s.minutes < 60 ? `${s.minutes} minutes` : s.minutes === 60 ? "About an hour" : `${Math.round(s.minutes / 30) / 2} hours`,
    costLabel: costLabels[s.cost],
    tags: [...tags],
  };
}

const seeds: Seed[] = [
  { name: "Junk Journaling", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 45, cost: "under25", energy: "low", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "A scrapbook-meets-diary hobby where you glue, tape and layer receipts, tickets, magazine clippings and notes into a notebook. There's no right way to do a page.",
    whyYoullLoveIt: "It turns the small evidence of your week, a coffee sleeve, a train ticket, into something pretty. Perfect for screen-tired eyes.",
    supplies: ["A notebook or old book", "Glue stick", "Scissors", "Paper scraps you already have"], optional: ["Washi tape", "Stickers", "Fineliner pens"],
    firstActivity: "Empty your bag and wallet, pick three bits of paper from this week, and make one page about it.", image: "junkJournal",
    productIds: ["junk-journals", "washi-tape", "sticker-sets"] },
  { name: "Scrapbooking", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 60, cost: "under50", energy: "low", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Building themed pages around printed photos and memorabilia: a trip, a friendship, a year. More structured than junk journaling, just as calming.",
    whyYoullLoveIt: "Your camera roll finally gets to live somewhere other than your phone.",
    supplies: ["Scrapbook album", "Printed photos", "Adhesive", "Scissors"], optional: ["Patterned paper", "Stickers", "Corner punch"],
    firstActivity: "Print ten photos from one memorable weekend and fill a two-page spread.", productIds: ["junk-journals", "sticker-sets", "washi-tape"] },
  { name: "Watercolor Painting", category: "creative", settings: ["home", "outdoors"], company: ["solo", "social"], minutes: 30, cost: "under25", energy: "low", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Translucent paint, a little water, and paper that does half the work for you. Loose florals and imperfect landscapes are the whole charm.",
    whyYoullLoveIt: "Twenty minutes at the kitchen table is enough to make something you'd happily stick on the fridge.",
    supplies: ["Student watercolor pan set", "Watercolor paper or sketchbook", "Two brushes (round)", "A jar of water"], optional: ["Masking tape", "Travel palette", "White gel pen"],
    firstActivity: "Paint whatever's on your counter, a mug, a lemon, the flowers, in three colors only.", image: "watercolor",
    productIds: ["watercolor-sets", "watercolor-sketchbooks", "portable-watercolor"] },
  { name: "Embroidery", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 45, cost: "under25", energy: "low", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Decorative stitching on fabric with a hoop and embroidery floss. Start with a kit, then stitch tiny flowers onto jeans and tote bags.",
    whyYoullLoveIt: "It's quiet, portable and very satisfying to watch a design fill in stitch by stitch.",
    supplies: ["Beginner embroidery kit (hoop, fabric, floss, needle)"], optional: ["Water-soluble pen", "Small sharp scissors"],
    firstActivity: "Learn the backstitch and French knot, then stitch your initial.", productIds: ["embroidery-kits"] },
  { name: "Crochet", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 45, cost: "under25", energy: "low", beginner: 2, cravings: ["creativity", "relaxation"],
    description: "Making fabric with a single hook and yarn: granny squares, little bags, bucket hats. The first hour is fiddly; the tenth is meditative.",
    whyYoullLoveIt: "Something to do with your hands during a show, and yes, you can wear what you make.",
    supplies: ["A 5mm hook", "One skein of medium-weight yarn", "Scissors"], optional: ["Stitch markers", "Beginner kit with video lessons"],
    firstActivity: "Follow a beginner video and crochet one granny square. It doesn't need to be square.", productIds: [] },
  { name: "Knitting", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 45, cost: "under25", energy: "low", beginner: 2, cravings: ["creativity", "relaxation"],
    description: "Two needles, one ball of yarn and a lot of rhythm. Scarves first, then hats, then you'll suddenly have opinions about wool.",
    whyYoullLoveIt: "Very repetitive in the best way, and knitting groups are famously welcoming.",
    supplies: ["Medium needles (US 8)", "Chunky or medium yarn"], optional: ["Row counter", "Darning needle"],
    firstActivity: "Cast on twenty stitches and knit a coaster-sized square.", productIds: [] },
  { name: "Jewelry Making", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 60, cost: "under50", energy: "low", beginner: 1, cravings: ["creativity", "friendship"],
    description: "Beaded necklaces, charm earrings and simple wire rings. A starter kit gives you everything for a dozen pieces.",
    whyYoullLoveIt: "You'll make gifts, matching sets for friends, and the exact earrings you couldn't find in stores.",
    supplies: ["Beading kit with wire, clasps and beads", "Flat-nose pliers"], optional: ["Bead tray", "Charms"],
    firstActivity: "Make a simple beaded bracelet for yourself and one for a friend.", productIds: ["friendship-bracelet-kits"] },
  { name: "Friendship Bracelets", category: "creative", settings: ["home", "out"], company: ["social", "solo"], minutes: 30, cost: "under25", energy: "low", beginner: 1, cravings: ["creativity", "friendship"],
    description: "Letter beads, seed beads and embroidery-thread knots. Nostalgic, quick and ideal for a group around a coffee table.",
    whyYoullLoveIt: "Instant results, zero skill needed, and an excuse to get everyone together.",
    supplies: ["Bead kit with elastic cord"], optional: ["Embroidery floss for knotted styles", "Bead mat"],
    firstActivity: "Spell an inside joke on a bracelet and give it away.", productIds: ["friendship-bracelet-kits"] },
  { name: "Air-Dry Clay", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 60, cost: "under25", energy: "medium", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Clay that hardens on its own, no kiln needed. Trinket dishes, incense holders and wobbly little vases, painted once dry.",
    whyYoullLoveIt: "Pottery-class energy at your kitchen table for the price of a sandwich.",
    supplies: ["Air-dry clay", "A rolling pin or glass", "Acrylic paint"], optional: ["Sculpting tools", "Clay work mat", "Gloss varnish"],
    firstActivity: "Roll a ball, press your thumb in, and shape a ring dish. Paint it tomorrow.", image: "shopPottery",
    productIds: ["air-dry-clay", "clay-tools", "acrylic-paints", "clay-mats"] },
  { name: "Pottery Painting", category: "creative", settings: ["out", "home"], company: ["social", "solo"], minutes: 120, cost: "under50", energy: "low", beginner: 1, cravings: ["creativity", "friendship"],
    description: "Choosing a blank ceramic piece and painting it with glazes at a studio, or with a ceramic kit at home.",
    whyYoullLoveIt: "A no-skill, very cute plan, and you get a mug out of it.",
    supplies: ["A studio visit, or a ceramic painting kit"], optional: ["Reference images saved on your phone"],
    firstActivity: "Look up a paint-your-own pottery studio near you, or paint a plain mug at home with porcelain paint.", image: "potteryNight",
    productIds: ["ceramic-painting-kits", "detail-brushes"] },
  { name: "Paint by Numbers", category: "creative", settings: ["home"], company: ["solo"], minutes: 30, cost: "under25", energy: "low", beginner: 1, cravings: ["relaxation", "creativity"],
    description: "A pre-printed canvas with numbered sections and matching paints. All of the satisfaction, none of the blank-page fear.",
    whyYoullLoveIt: "Zero decisions after a day of making nothing but decisions.",
    supplies: ["Paint-by-number kit"], optional: ["Small detail brush", "Desk lamp"],
    firstActivity: "Paint every section numbered 1 tonight. Just that.", productIds: ["group-painting-kits"] },
  { name: "Flower Arranging", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 30, cost: "under25", energy: "low", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Turning grocery-store or market flowers into arrangements you actually like. Learn a few rules, then break them.",
    whyYoullLoveIt: "It makes your home feel special for a week.",
    supplies: ["A bunch of flowers", "Scissors", "Any vase or jar"], optional: ["Floral frog", "Flower snips"],
    firstActivity: "Buy one bunch of supermarket flowers and split it into three small jars.", productIds: [] },
  { name: "Collage Art", category: "creative", settings: ["home"], company: ["solo", "social"], minutes: 45, cost: "free", energy: "low", beginner: 1, cravings: ["creativity", "different"],
    description: "Cutting and layering images from old magazines into something new. Moodboards, postcards, framed wall art.",
    whyYoullLoveIt: "It costs nothing, and it's surprisingly revealing about what you like.",
    supplies: ["Old magazines", "Glue stick", "Scissors", "Card or paper"], optional: ["Washi tape", "Frame"],
    firstActivity: "Make a postcard-sized collage of everything you want more of this year.", productIds: ["washi-tape"] },
  { name: "Calligraphy", category: "creative", settings: ["home"], company: ["solo"], minutes: 30, cost: "under25", energy: "low", beginner: 2, cravings: ["creativity", "relaxation"],
    description: "Decorative lettering with brush pens or a dip pen. Practice drills are oddly soothing.",
    whyYoullLoveIt: "Birthday cards and place cards will never look the same.",
    supplies: ["Brush pens", "Practice pad or smooth paper"], optional: ["Printable practice sheets", "Dip pen and ink"],
    firstActivity: "Practice upstrokes and downstrokes for ten minutes, then write your name.", productIds: [] },
  { name: "Film Photography", category: "outdoors", settings: ["outdoors", "out"], company: ["solo", "social"], minutes: 90, cost: "flexible", energy: "medium", beginner: 1, cravings: ["creativity", "adventure"],
    description: "Shooting on 35mm or a reusable film camera, then waiting for the developed scans. Each frame counts.",
    whyYoullLoveIt: "It makes you notice light and slow down, and the photos feel like memories.",
    supplies: ["Reusable film camera", "A roll of 35mm film", "A local lab or mail-in developer"], optional: ["Camera strap", "Small notebook to log shots"],
    firstActivity: "Shoot a whole roll on a single walk around your neighborhood.", productIds: ["film-cameras", "pocket-notebooks"] },
  { name: "Reading", category: "bookish", settings: ["home", "out", "outdoors"], company: ["solo"], minutes: 30, cost: "free", energy: "low", beginner: 1, cravings: ["relaxation"],
    description: "Yes, it counts. Especially fiction, especially off a screen, especially with a library card.",
    whyYoullLoveIt: "The easiest hobby to restart, and the cheapest with a library card.",
    supplies: ["A library card or one book"], optional: ["Book light", "Reading journal", "Book sleeve"],
    firstActivity: "Pick up a short novel and read before your phone gets a chance.",
    productIds: ["book-lights", "reading-journals", "book-sleeves", "reading-stands"] },
  { name: "Jigsaw Puzzles", category: "cozy", settings: ["home"], company: ["solo", "social"], minutes: 45, cost: "under25", energy: "low", beginner: 1, cravings: ["relaxation"],
    description: "A 500-piece puzzle on the coffee table that you chip away at all week.",
    whyYoullLoveIt: "A gentle, screen-free focus that you can share with whoever wanders by.",
    supplies: ["A 500 or 1000-piece puzzle"], optional: ["Puzzle mat", "Sorting trays"],
    firstActivity: "Do the edges tonight. Leave the sky for the weekend.", productIds: ["board-games"] },
  { name: "Crossword Puzzles", category: "cozy", settings: ["home", "out"], company: ["solo", "social"], minutes: 20, cost: "free", energy: "low", beginner: 1, cravings: ["relaxation", "different"],
    description: "Mini or full crosswords, in a newspaper, book or app. Monday puzzles are the friendliest.",
    whyYoullLoveIt: "Small daily wins, and an excellent café companion.",
    supplies: ["A pencil and a printed crossword"], optional: ["A crossword book"],
    firstActivity: "Solve a Monday-level crossword with a friend over coffee.", productIds: [] },
  { name: "Baking", category: "cozy", settings: ["home"], company: ["solo", "social"], minutes: 90, cost: "under25", energy: "medium", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Cookies, banana bread, galettes. A hobby where the reward is edible and easy to share.",
    whyYoullLoveIt: "Your kitchen smells amazing and you get to bring something to people.",
    supplies: ["Basic pantry ingredients", "A baking sheet", "A mixing bowl"], optional: ["Kitchen scale", "Cookie decorating kit"],
    firstActivity: "Bake one batch of cookies and give half away.", productIds: ["cookie-decorating-kits"] },
  { name: "Indoor Gardening", category: "cozy", settings: ["home"], company: ["solo"], minutes: 20, cost: "under25", energy: "low", beginner: 1, cravings: ["relaxation", "different"],
    description: "Herbs on a windowsill, a pothos that trails across the bookshelf, propagation jars on every sill.",
    whyYoullLoveIt: "Something alive to look after that won't text you back.",
    supplies: ["One easy plant (pothos or basil)", "A pot with drainage"], optional: ["Propagation jars", "Watering can"],
    firstActivity: "Take a cutting from a friend's pothos and root it in a glass of water.", productIds: [] },
  { name: "Mahjong", category: "social", settings: ["home", "out"], company: ["social"], minutes: 120, cost: "flexible", energy: "low", beginner: 2, cravings: ["friendship", "different"],
    description: "A tile game for four with a long history and a big modern revival among women's social clubs.",
    whyYoullLoveIt: "A reason to see the same friends every week, plus snacks.",
    supplies: ["A mahjong set (or a borrowed one)", "Three friends", "A rules card"], optional: ["Scoring card", "Tile racks"],
    firstActivity: "Watch one beginner tutorial together and play a practice round with open tiles.", image: "girlsNight", productIds: ["mahjong-sets"] },
  { name: "Vinyl Collecting", category: "cozy", settings: ["home", "out"], company: ["solo", "social"], minutes: 60, cost: "flexible", energy: "low", beginner: 1, cravings: ["relaxation", "different"],
    description: "Digging through record store crates and listening to full albums, start to finish.",
    whyYoullLoveIt: "It makes music an activity again, not background noise.",
    supplies: ["A turntable (secondhand is fine)", "One record"], optional: ["Record storage crate"],
    firstActivity: "Visit a local record store and buy one album based only on the cover.", productIds: [] },
  { name: "Creative Writing", category: "creative", settings: ["home", "out"], company: ["solo"], minutes: 30, cost: "free", energy: "low", beginner: 1, cravings: ["creativity", "relaxation"],
    description: "Short stories, poems, flash fiction or just morning pages. Not for publishing. For you.",
    whyYoullLoveIt: "You spend all day writing emails. This is the opposite.",
    supplies: ["A notebook and pen"], optional: ["Writing prompt deck", "A café window seat"],
    firstActivity: "Write a 300-word story that starts with the last thing someone said to you.", productIds: ["pocket-notebooks"] },
  { name: "Tennis", category: "active", settings: ["outdoors"], company: ["social"], minutes: 60, cost: "under50", energy: "high", beginner: 2, cravings: ["movement", "friendship"],
    description: "Hitting a ball back and forth on a public court. You don't need to keep score for months.",
    whyYoullLoveIt: "Golden-hour rallies with a friend are the best kind of exercise.",
    supplies: ["A beginner racket", "A can of balls", "Sneakers", "Water"], optional: ["Sports tote", "Beginner group lesson"],
    firstActivity: "Book a free public court and just rally with a friend for 30 minutes.", image: "tennis",
    productIds: ["tennis-rackets", "tennis-balls", "water-bottles", "sports-totes"] },
  { name: "Pickleball", category: "active", settings: ["outdoors", "out"], company: ["social"], minutes: 60, cost: "under50", energy: "medium", beginner: 1, cravings: ["movement", "friendship"],
    description: "A smaller-court paddle sport that's very easy to pick up and very social.",
    whyYoullLoveIt: "You'll be playing proper points within the first hour.",
    supplies: ["A paddle set (often comes with balls)", "Sneakers"], optional: ["Water bottle", "Tote bag"],
    firstActivity: "Find a public court with open play and show up with a friend.", productIds: ["pickleball-sets", "water-bottles"] },
  { name: "Hiking", category: "outdoors", settings: ["outdoors"], company: ["solo", "social"], minutes: 180, cost: "free", energy: "high", beginner: 1, cravings: ["adventure", "movement"],
    description: "Walking marked trails, from flat nature paths to proper climbs with a view.",
    whyYoullLoveIt: "Fresh air, real tiredness, and a snack that tastes better on a summit.",
    supplies: ["Comfortable shoes", "Water", "A snack", "A trail map or app"], optional: ["Daypack", "Binoculars"],
    firstActivity: "Pick a short, well-marked trail under three miles and go on a Saturday morning.", image: "hiking",
    productIds: ["daypacks", "water-bottles", "binoculars"] },
  { name: "Roller Skating", category: "active", settings: ["outdoors", "out"], company: ["solo", "social"], minutes: 60, cost: "flexible", energy: "high", beginner: 2, cravings: ["movement", "adventure"],
    description: "Quad skates at a rink or a smooth park path. Expect wobbling. Expect laughing.",
    whyYoullLoveIt: "It's pure play and the music is always good.",
    supplies: ["Rental skates at a rink"], optional: ["Wrist guards and knee pads", "Your own skates"],
    firstActivity: "Go to a rink's adult skate night and rent skates.", productIds: [] },
  { name: "Birdwatching", category: "outdoors", settings: ["outdoors"], company: ["solo", "social"], minutes: 60, cost: "free", energy: "low", beginner: 1, cravings: ["adventure", "relaxation"],
    description: "Noticing and identifying birds in your local park. Free apps can identify birds by song.",
    whyYoullLoveIt: "Once you start noticing, you'll never walk through a park the same way.",
    supplies: ["A free bird ID app", "Your local park"], optional: ["Compact binoculars", "Pocket notebook"],
    firstActivity: "Sit on one park bench for 30 minutes and log every bird you hear.", productIds: ["binoculars", "pocket-notebooks"] },
  { name: "Nature Photography", category: "outdoors", settings: ["outdoors"], company: ["solo"], minutes: 60, cost: "free", energy: "medium", beginner: 1, cravings: ["creativity", "adventure"],
    description: "Photographing flowers, light, leaves and landscapes, with your phone or a camera.",
    whyYoullLoveIt: "A walk becomes a treasure hunt.",
    supplies: ["Your phone camera"], optional: ["A film camera", "Clip-on macro lens"],
    firstActivity: "Take 20 photos of one color on one walk.", productIds: ["film-cameras"] },
  { name: "Outdoor Sketching", category: "creative", settings: ["outdoors"], company: ["solo", "social"], minutes: 45, cost: "under25", energy: "low", beginner: 1, cravings: ["creativity", "adventure"],
    description: "Drawing what's in front of you in a park, plaza or café terrace, often with a quick wash of watercolor.",
    whyYoullLoveIt: "You'll remember places you sketched far better than places you photographed.",
    supplies: ["A small sketchbook", "A pen"], optional: ["Portable watercolor set", "Water brush"],
    firstActivity: "Sketch a café exterior in 15 minutes. Don't erase.", image: "watercolor",
    productIds: ["portable-watercolor", "watercolor-sketchbooks", "pocket-notebooks"] },
  { name: "Book Clubs", category: "bookish", settings: ["home", "out"], company: ["social"], minutes: 120, cost: "free", energy: "low", beginner: 1, cravings: ["friendship", "relaxation"],
    description: "Reading the same book as a group, then meeting to talk about it (and everything else).",
    whyYoullLoveIt: "A recurring plan with built-in conversation. Libraries and bookstores often host them.",
    supplies: ["A book", "A group or a library listing"], optional: ["Conversation cards", "Reading journal"],
    firstActivity: "Ask two friends to read the same short novel this month, then pick a café.", image: "soloCafe",
    productIds: ["reading-journals", "conversation-cards"] },
  { name: "Craft Nights", category: "social", settings: ["home"], company: ["social"], minutes: 150, cost: "under25", energy: "low", beginner: 1, cravings: ["friendship", "creativity"],
    description: "Friends, snacks and one easy craft: bracelets, painting, clay or collage.",
    whyYoullLoveIt: "Easier to host than a dinner party, and everyone leaves with something.",
    supplies: ["One group-friendly craft", "Snacks", "A table"], optional: ["Group painting kit", "Bead kit"],
    firstActivity: "Invite three friends for a bracelet night this week.", image: "girlsNight",
    productIds: ["friendship-bracelet-kits", "group-painting-kits", "conversation-cards", "cookie-decorating-kits"] },
  { name: "Volunteering", category: "social", settings: ["out", "outdoors"], company: ["social", "solo"], minutes: 180, cost: "free", energy: "medium", beginner: 1, cravings: ["friendship", "different"],
    description: "Giving a few hours to an animal shelter, community garden, food bank or literacy program.",
    whyYoullLoveIt: "You meet people who care about the same things, without awkward small talk.",
    supplies: ["A local listing", "A few free hours"], optional: [],
    firstActivity: "Sign up for a single one-off shift before committing to anything.", productIds: [] },
  { name: "Thrifting", category: "outdoors", settings: ["out"], company: ["solo", "social"], minutes: 120, cost: "flexible", energy: "medium", beginner: 1, cravings: ["adventure", "different"],
    description: "Treasure-hunting secondhand stores, flea markets and charity shops.",
    whyYoullLoveIt: "Every trip is a little gamble, and the stories behind finds are half the fun.",
    supplies: ["A tote bag", "A small budget"], optional: ["A wishlist on your phone"],
    firstActivity: "Give yourself $15 and one challenge: find a piece of tableware you love.", productIds: ["market-totes"] },
  { name: "Museum Exploring", category: "outdoors", settings: ["out"], company: ["solo", "social"], minutes: 120, cost: "flexible", energy: "low", beginner: 1, cravings: ["different", "adventure"],
    description: "Wandering galleries and small museums. Many have free days or pay-what-you-wish hours.",
    whyYoullLoveIt: "A perfect solo date and a reliable rainy-day plan.",
    supplies: ["A ticket or a free entry day"], optional: ["Pocket sketchbook"],
    firstActivity: "Visit just one room of a museum and stay with your favorite piece for ten minutes.", productIds: ["pocket-notebooks"] },
  { name: "Picnicking", category: "outdoors", settings: ["outdoors"], company: ["solo", "social"], minutes: 120, cost: "under25", energy: "low", beginner: 1, cravings: ["relaxation", "friendship"],
    description: "A blanket, a few good snacks and a park. Elevated by a book, a game or market flowers.",
    whyYoullLoveIt: "Low effort, very romantic, works alone or with a group.",
    supplies: ["A blanket", "Snacks", "A park"], optional: ["Picnic blanket with waterproof backing", "Market tote"],
    firstActivity: "Pack bread, fruit and cheese and claim a patch of grass on Saturday.", image: "picnic",
    productIds: ["picnic-blankets", "market-totes"] },
];

export const hobbies: Hobby[] = seeds.map(make);
export const getHobby = (slug: string) => hobbies.find((h) => h.slug === slug);

export const hobbyFilters = [
  { tag: "at-home", label: "At home" },
  { tag: "outdoors", label: "Outdoors" },
  { tag: "after-work", label: "After work" },
  { tag: "weekend", label: "Weekend" },
  { tag: "solo", label: "Solo" },
  { tag: "social", label: "Social" },
  { tag: "creative", label: "Creative" },
  { tag: "active", label: "Active" },
  { tag: "low-energy", label: "Low energy" },
  { tag: "low-cost", label: "Free or low cost" },
] as const;
