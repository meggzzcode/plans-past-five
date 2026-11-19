import type { ImageKey } from "./images";

export type CollectionSlug =
  | "pottery-era"
  | "creative-girl"
  | "sporty-girl"
  | "girls-night-in"
  | "bookish-girl"
  | "little-adventures"
  | "journaling-era"
  | "cozy-after-hours";

export type Collection = {
  slug: CollectionSlug;
  name: string;
  dek: string;
  intro: string;
  image: ImageKey;
  tone: "butter" | "strawberry" | "matcha" | "sunday" | "cream";
  /**
   * Existing product types (by id) from OTHER collections that also belong here. Each product keeps
   * exactly one home collection (`Product.collection`); this only cross-references, it never
   * creates or duplicates a product.
   */
  extraProductIds?: string[];
  /**
   * Starter kits (src/data/kits.ts) that belong on this collection's page, hobby-appropriate only.
   * A collection never borrows another collection's kit under its own heading. A kit's "home"
   * collection is the first one that lists it.
   */
  kitIds?: string[];
};

/**
 * A product TYPE recommendation, not a specific listing.
 * - amazonQuery drives an ordinary Amazon search link (see src/config/affiliate.ts).
 * - Set exactUrl only after verifying an exact listing; the button label changes to "View on Amazon".
 * No prices, ratings, brands or ASINs are stored on purpose.
 */
export type Product = {
  id: string;
  name: string;
  collection: CollectionSlug;
  blurb: string;
  lookFor: string;
  noSpend?: string | undefined;
  amazonQuery: string;
  exactUrl?: string;
  hobbySlugs: string[];
  /**
   * OPTIONAL verified-research fields. Leave all unset unless verified from a source.
   * If brand, manufacturer, specs, retailerUrl or exactUrl are set, `sourceUrl` and
   * `lastVerified` are required (enforced by validateProduct and tests).
   */
  brand?: string;
  manufacturer?: string;
  /** Official page (manufacturer or retailer listing) the facts were checked against. */
  sourceUrl?: string;
  /** Ordinary retailer listing URL (any retailer). Verified only. */
  retailerUrl?: string;
  /** Photo rights; photo-less cards remain the default. */
  imageRights?: ImageRights;
  /** ISO date YYYY-MM-DD the facts above were last checked. */
  lastVerified?: string;
  audience?: string;
  advantages?: string[];
  limitations?: string[];
  specs?: ProductSpec[];
};

export type ImageRights = "none" | "owned" | "licensed" | "retailer-permission";
export type ProductSpec = { label: string; value: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isHttps = (u: string) => {
  try {
    return new URL(u).protocol === "https:";
  } catch {
    return false;
  }
};

/** Returns a list of problems; empty means the record is valid. */
export function validateProduct(p: Product): string[] {
  const out: string[] = [];
  const claims: string[] = [];
  if (p.brand) claims.push("brand");
  if (p.manufacturer) claims.push("manufacturer");
  if (p.specs && p.specs.length > 0) claims.push("specs");
  if (p.retailerUrl) claims.push("retailerUrl");
  if (p.exactUrl) claims.push("exactUrl");
  if (claims.length > 0) {
    if (!p.sourceUrl) out.push(`${p.id}: ${claims.join(", ")} set without sourceUrl`);
    if (!p.lastVerified) out.push(`${p.id}: ${claims.join(", ")} set without lastVerified`);
  }
  if (p.sourceUrl && !isHttps(p.sourceUrl)) out.push(`${p.id}: sourceUrl must be https`);
  if (p.retailerUrl && !isHttps(p.retailerUrl)) out.push(`${p.id}: retailerUrl must be https`);
  if (p.exactUrl && !isHttps(p.exactUrl)) out.push(`${p.id}: exactUrl must be https`);
  if (p.lastVerified && !ISO_DATE.test(p.lastVerified))
    out.push(`${p.id}: lastVerified must be YYYY-MM-DD`);
  return out;
}

/** True when the record carries verified research that may be displayed. */
export const hasVerifiedResearch = (p: Product) =>
  validateProduct(p).length === 0 && Boolean(p.sourceUrl && p.lastVerified);

export const collections: Collection[] = [
  {
    slug: "pottery-era",
    name: "The Pottery Era",
    dek: "Clay, paint and very lovable lumpy bowls",
    image: "shopPottery",
    tone: "butter",
    intro:
      "Pottery-class energy at your kitchen table. No kiln, no wheel, just clay, paint and a few hours of lovably lumpy.",
    kitIds: ["air-dry-clay"],
  },
  {
    slug: "creative-girl",
    name: "The Creative Girl",
    dek: "Paper, paint and thread for quiet evenings",
    image: "watercolor",
    tone: "strawberry",
    intro:
      "Watercolor, a journal, a hoop and thread: starter supplies small enough to put away after.",
    kitIds: ["watercolor", "junk-journaling"],
  },
  {
    slug: "sporty-girl",
    name: "The Sporty Girl",
    dek: "For golden-hour rallies and Saturday trails",
    image: "shopSporty",
    tone: "matcha",
    intro:
      "Gear for your first rally, game or trail. You don't need the pro version, and you can often borrow or rent first.",
    kitIds: ["racquet-sports"],
  },
  {
    slug: "girls-night-in",
    name: "Girls' Night In",
    dek: "Host a night everyone talks about after",
    image: "shopGirlsNight",
    tone: "strawberry",
    intro:
      "Turn 'we should hang out' into a date in the group chat: a mahjong night or a paint night at home, with what to grab to make it easy.",
    kitIds: ["mahjong-night", "pottery-paint-night"],
  },
  {
    slug: "bookish-girl",
    name: "The Bookish Girl",
    dek: "For one-more-chapter people",
    image: "hobbyReading",
    tone: "sunday",
    intro:
      "Little upgrades that make reading feel like an event: in bed, on the train or at your favorite café.",
    kitIds: ["reading-book-club"],
  },
  {
    slug: "little-adventures",
    name: "Little Adventures",
    dek: "Pack for a picnic, a market or a wander",
    image: "shopAdventures",
    tone: "butter",
    intro: "Small, portable things that make it easier to say yes to a spontaneous afternoon out.",
    kitIds: ["picnic"],
  },
  {
    slug: "journaling-era",
    name: "The Journaling Era",
    dek: "Pages, tape and a pen that makes you want to write",
    image: "junkJournal",
    tone: "sunday",
    intro:
      "A journal that can take glue, tape you'll love and the scraps already in your bag. Start with one notebook.",
    extraProductIds: [
      "junk-journals",
      "washi-tape",
      "sticker-sets",
      "reading-journals",
      "pocket-notebooks",
    ],
    kitIds: ["junk-journaling"],
  },
  {
    slug: "cozy-after-hours",
    name: "Cozy After Hours",
    dek: "Low-effort comforts for the evening you actually have",
    image: "cozyCorner",
    tone: "cream",
    intro:
      "Small things that turn a weeknight at home into a plan: better light, a game on the table, something quiet to make.",
    extraProductIds: [
      "book-lights",
      "reading-stands",
      "book-nook-kits",
      "board-games",
      "conversation-cards",
    ],
    kitIds: [],
  },
];

const p = (
  id: string,
  collection: CollectionSlug,
  name: string,
  blurb: string,
  lookFor: string,
  amazonQuery: string,
  hobbySlugs: string[],
  noSpend?: string,
): Product => ({ id, collection, name, blurb, lookFor, amazonQuery, hobbySlugs, noSpend });

export const products: Product[] = [
  // The Pottery Era
  p(
    "air-dry-clay",
    "pottery-era",
    "Air-dry clay",
    "The no-kiln way into pottery. Shape trinket dishes and ring holders, let them dry, then paint them (check your clay's label for drying time).",
    "A white or terracotta block of at least 2 lb so you can make mistakes freely.",
    "air dry clay white",
    ["air-dry-clay", "craft-nights"],
  ),
  p(
    "clay-tools",
    "pottery-era",
    "Clay sculpting tools",
    "Loop, ribbon and wooden tools help you carve, smooth and add details your fingers can't.",
    "A small mixed set with wooden handles; you'll use three tools constantly.",
    "clay sculpting tools set beginner",
    ["air-dry-clay"],
    "A butter knife, toothpick and old credit card do most of the same jobs.",
  ),
  p(
    "acrylic-paints",
    "pottery-era",
    "Acrylic paint set",
    "For painting dried clay, canvases and thrifted frames. A small set covers most projects.",
    "Tubes in a dozen colors including a true white; matte or satin both work.",
    "acrylic paint set 12 colors",
    ["air-dry-clay", "craft-nights", "paint-by-numbers"],
  ),
  p(
    "detail-brushes",
    "pottery-era",
    "Detail paintbrushes",
    "Fine-tipped brushes for cherries, tiny stripes, polka dots and initials.",
    "A pack with a few very fine rounds and one flat brush.",
    "fine detail paint brush set",
    ["air-dry-clay", "pottery-painting", "paint-by-numbers"],
  ),
  p(
    "ceramic-painting-kits",
    "pottery-era",
    "Ceramic painting kit",
    "Blank mugs or plates with paints, so you can recreate a pottery-painting studio at home.",
    "Kits with clear instructions and a stated glaze or paint type. Treat painted pieces as display-only unless the kit says they are food safe.",
    "paint your own ceramic mug kit",
    ["pottery-painting", "craft-nights"],
  ),
  p(
    "clay-mats",
    "pottery-era",
    "Clay craft work mat",
    "Protects your table, stops clay sticking, and makes clean-up a two-minute job.",
    "A large silicone or canvas mat that wipes clean.",
    "silicone craft mat large",
    ["air-dry-clay"],
    "A cut-open paper bag or old canvas tote taped to the table.",
  ),
  // The Creative Girl
  p(
    "watercolor-sets",
    "creative-girl",
    "Watercolor starter set",
    "A pan set with a dozen or two colors is all you need to start painting loose florals.",
    "Student-grade pans in a compact case, ideally with a mixing lid.",
    "watercolor paint set beginner pans",
    ["watercolor-painting", "outdoor-sketching"],
  ),
  p(
    "watercolor-sketchbooks",
    "creative-girl",
    "Watercolor sketchbook",
    "Thick paper that won't buckle when wet, bound so your practice pages stay together.",
    "Paper marked 300 gsm (140 lb) or cold-press; A5 is a friendly size.",
    "watercolor sketchbook 300gsm",
    ["watercolor-painting", "outdoor-sketching"],
  ),
  p(
    "junk-journals",
    "creative-girl",
    "Junk journal or blank notebook",
    "A sturdy notebook to glue, tape and layer things into. Thick pages handle the glue.",
    "Kraft or mixed-paper pages and a lay-flat binding.",
    "junk journal blank notebook kraft",
    ["junk-journaling", "scrapbooking"],
    "An old hardback book from a thrift store makes a charming base.",
  ),
  p(
    "washi-tape",
    "creative-girl",
    "Washi tape collection",
    "Decorative paper tape that sticks, peels and repositions. The easiest way to make a page look intentional.",
    "A mixed set with a few solid colors alongside the patterns.",
    "washi tape set",
    ["junk-journaling", "scrapbooking", "collage-art"],
  ),
  p(
    "sticker-sets",
    "creative-girl",
    "Decorative sticker sets",
    "Florals, labels and little icons for journals, planners and letters to friends.",
    "Matte stickers in a style you'd actually use more than once.",
    "vintage journal sticker set",
    ["junk-journaling", "scrapbooking"],
  ),
  p(
    "embroidery-kits",
    "creative-girl",
    "Embroidery starter kit",
    "A hoop, pre-printed fabric, floss and needles, with instructions for the basic stitches.",
    "A small floral design with a stitch guide; 6-inch hoops are easiest.",
    "embroidery kit beginner floral",
    ["embroidery"],
  ),
  // The Sporty Girl
  p(
    "tennis-rackets",
    "sporty-girl",
    "Beginner tennis racket",
    "A lighter, larger-head racket forgives off-center hits while you learn.",
    "Labeled 'beginner' or 'recreational', pre-strung, with a larger head size.",
    "beginner tennis racket adult",
    ["tennis"],
  ),
  p(
    "tennis-balls",
    "sporty-girl",
    "Tennis balls",
    "Fresh balls bounce predictably, which makes learning easier.",
    "A multi-can pack of all-court balls.",
    "tennis balls all court",
    ["tennis"],
  ),
  p(
    "pickleball-sets",
    "sporty-girl",
    "Pickleball paddle set",
    "Two or four paddles plus balls, so you can bring a friend along.",
    "A set with balls and a carry bag.",
    "pickleball paddle set of 2",
    ["pickleball"],
  ),
  p(
    "water-bottles",
    "sporty-girl",
    "Insulated water bottle",
    "Keeps water cold through a match, a trail or an afternoon in the park.",
    "A leak-proof lid that fits your bag's side pocket.",
    "insulated water bottle 24 oz",
    ["tennis", "pickleball", "hiking", "picnicking"],
    "Any bottle you already own works fine.",
  ),
  p(
    "sports-totes",
    "sporty-girl",
    "Sports tote bag",
    "Fits your paddle or racket, a change of shoes and a book for after.",
    "A canvas tote with an outer pocket or a sleeve for your paddle or racket.",
    "tennis tote bag women canvas",
    ["tennis", "pickleball"],
  ),
  p(
    "daypacks",
    "sporty-girl",
    "Outdoor activity daypack",
    "A light backpack for water, snacks and a layer on hikes and long walks.",
    "Around 15–20 liters, padded straps and a bottle pocket.",
    "lightweight hiking daypack 20l",
    ["hiking"],
  ),
  // Girls' Night In
  p(
    "mahjong-sets",
    "girls-night-in",
    "Mahjong starter set",
    "The tiles, racks and scoring card for a standing weekly game night.",
    "A set that matches the style you'll play (e.g. American with jokers) and includes a rules card.",
    "american mahjong set",
    ["mahjong"],
  ),
  p(
    "friendship-bracelet-kits",
    "girls-night-in",
    "Friendship bracelet kit",
    "Letter beads, seed beads and stretchy cord for an instant group activity.",
    "A divided case with plenty of letter beads (vowels go fast).",
    "friendship bracelet bead kit letter beads",
    ["friendship-bracelets", "jewelry-making", "craft-nights"],
  ),
  p(
    "conversation-cards",
    "girls-night-in",
    "Conversation card game",
    "Question decks that skip the small talk and get everyone laughing.",
    "Decks designed for friends, not just couples.",
    "conversation cards for friends",
    ["craft-nights", "book-clubs"],
  ),
  p(
    "group-painting-kits",
    "girls-night-in",
    "Group painting kit",
    "Mini canvases, easels and paints for a sip-and-paint night at home.",
    "Kits with enough canvases for your whole group.",
    "paint party kit canvas adults",
    ["craft-nights", "paint-by-numbers"],
  ),
  p(
    "cookie-decorating-kits",
    "girls-night-in",
    "Cookie decorating kit",
    "Piping bags, tips and cutters for an edible craft night.",
    "Reusable piping bags and a few simple cutters.",
    "cookie decorating kit piping bags",
    ["baking", "craft-nights"],
  ),
  p(
    "board-games",
    "girls-night-in",
    "Board games & puzzles",
    "Cooperative games and puzzles for a low-key evening with friends.",
    "Games playable in under an hour, or a 500-piece puzzle.",
    "board games for adults party",
    ["jigsaw-puzzles", "craft-nights"],
  ),
  // The Bookish Girl
  p(
    "reading-journals",
    "bookish-girl",
    "Reading journal",
    "Log books, quotes and ratings, and finally remember what you read last spring.",
    "Prompted pages plus some blank space for doodles.",
    "reading journal book log",
    ["reading", "book-clubs"],
  ),
  p(
    "book-lights",
    "bookish-girl",
    "Rechargeable book light",
    "Read in bed without the overhead light, or the phone screen.",
    "USB-rechargeable with warm-light settings.",
    "rechargeable book light warm",
    ["reading"],
  ),
  p(
    "magnetic-bookmarks",
    "bookish-girl",
    "Magnetic bookmarks",
    "Clip over the page so they never fall out on the train.",
    "A small mixed set in a design you love.",
    "magnetic bookmarks set",
    ["reading"],
    "A train ticket or receipt works just as well.",
  ),
  p(
    "book-sleeves",
    "bookish-girl",
    "Book sleeve",
    "A padded fabric sleeve to protect paperbacks in your tote bag.",
    "Soft padding and a closure; floral prints are optional but encouraged.",
    "book sleeve padded floral",
    ["reading"],
  ),
  p(
    "book-nook-kits",
    "bookish-girl",
    "Miniature book nook kit",
    "A tiny diorama that slots between your books. A long, absorbing build.",
    "Kits marked with build time and difficulty; start with an easier one.",
    "book nook kit diy",
    ["reading"],
  ),
  p(
    "reading-stands",
    "bookish-girl",
    "Reading stand",
    "Holds books (or cookbooks) open, hands-free, at a comfortable angle.",
    "Adjustable angle and page clips.",
    "book stand for reading adjustable",
    ["reading"],
  ),
  // Little Adventures
  p(
    "picnic-blankets",
    "little-adventures",
    "Picnic blanket",
    "A waterproof-backed blanket that folds small and makes any park a plan.",
    "Water-resistant backing and a carry strap.",
    "picnic blanket waterproof gingham",
    ["picnicking"],
  ),
  p(
    "film-cameras",
    "little-adventures",
    "Reusable film camera",
    "A simple point-and-shoot 35mm camera that makes everyday walks feel like memories.",
    "Reusable 35mm point-and-shoots for beginners; film is sold separately.",
    "reusable 35mm film camera",
    ["film-photography", "nature-photography"],
  ),
  p(
    "pocket-notebooks",
    "little-adventures",
    "Pocket notebook",
    "For lists, sketches, bird logs and lines you want to remember.",
    "Small enough for a jacket pocket, with sturdy covers.",
    "pocket notebook pack",
    [
      "creative-writing",
      "birdwatching",
      "outdoor-sketching",
      "museum-exploring",
      "film-photography",
    ],
  ),
  p(
    "market-totes",
    "little-adventures",
    "Reusable market tote",
    "Strong enough for flowers, produce and the thrift find you didn't plan on.",
    "Canvas or string bags with long handles.",
    "canvas market tote bag",
    ["picnicking", "thrifting"],
  ),
  p(
    "portable-watercolor",
    "little-adventures",
    "Portable watercolor set",
    "A pocket-sized palette with a water brush for painting on the go.",
    "A small tin with a built-in mixing area and a water brush.",
    "pocket watercolor set travel water brush",
    ["watercolor-painting", "outdoor-sketching"],
  ),
  p(
    "binoculars",
    "little-adventures",
    "Compact binoculars",
    "Light enough for a daypack, ideal for birds, views and people-watching from a hill.",
    "Compact 8x magnification is a good starting point.",
    "compact binoculars 8x",
    ["birdwatching", "hiking"],
  ),
];

/**
 * ARTICLE-ONLY product types. These are type-level Amazon search cards that articles and hobby
 * pages reference by id (`productIds`, `shopHobby` blocks). They are NOT listed on collection pages,
 * in site search, or counted in `products`; `collection` is only the shop page a saved card links to.
 * Same rules as above: no brands, prices, ratings or ASINs. Safety-relevant types (helmets, lights,
 * skate protective gear, glue guns) use manufacturer- and label-based wording only.
 */
export const articleProducts: Product[] = [
  p(
    "walking-shoes",
    "sporty-girl",
    "Walking shoes",
    "Comfortable shoes you can wear for a long park loop or an easy trail day.",
    "A snug heel, room for your toes and a grippy sole; try them on with the socks you will wear.",
    "walking shoes women comfortable",
    ["hiking", "birdwatching", "nature-photography"],
  ),
  p(
    "trekking-socks",
    "sporty-girl",
    "Trekking-style socks",
    "Cushioned socks that stay put on longer walks.",
    "A cushioned sole and a seamless or flat toe, in a fabric that suits the weather.",
    "hiking socks cushioned",
    ["hiking"],
  ),
  p(
    "phone-armband",
    "sporty-girl",
    "Phone armband",
    "Keeps your phone handy for music or a map, hands free.",
    "An adjustable strap and a pocket sized for your phone, with a cutout for headphones.",
    "phone armband for walking",
    ["running", "hiking"],
  ),
  p(
    "sketch-pads",
    "creative-girl",
    "Sketch pad",
    "A pad you can tuck in a tote and draw in anywhere.",
    "A spiral or stitched binding and a sturdy cover; heavier paper handles pens and light washes.",
    "sketchbook pad 9x12",
    ["outdoor-sketching", "creative-writing"],
  ),
  p(
    "crochet-hooks",
    "creative-girl",
    "Crochet hooks",
    "A few hooks in common sizes so you can match the yarn label.",
    "A set with an ergonomic handle and the sizes your yarn label suggests.",
    "crochet hook set ergonomic beginner",
    ["crochet"],
  ),
  p(
    "yarn",
    "creative-girl",
    "Beginner yarn",
    "Smooth, light-colored yarn makes each stitch easier to see.",
    "Medium-weight (worsted) smooth yarn in a light color; avoid fuzzy or very dark yarn at first.",
    "worsted weight yarn beginner smooth",
    ["crochet", "knitting"],
  ),
  p(
    "knitting-needles",
    "creative-girl",
    "Knitting needles",
    "A starter pair for a first scarf or dishcloth.",
    "A pair of US size 8 needles (5 mm) in bamboo or wood, which grip the yarn gently.",
    "knitting needles size 8 bamboo beginner",
    ["knitting"],
  ),
  p(
    "flower-snips",
    "creative-girl",
    "Flower snips",
    "Clean cuts make stems easier to trim and arrange.",
    "Sharp blades, a comfortable grip and a safety lock; keep them for flowers only.",
    "floral snips flower scissors",
    ["flower-arranging"],
  ),
  p(
    "vases",
    "creative-girl",
    "Vases",
    "A few small vases turn one bunch into several arrangements.",
    "A mix of bud vases and one wider vase, in glass or ceramic with a stable base.",
    "glass bud vases set",
    ["flower-arranging"],
  ),
  p(
    "flower-frogs",
    "creative-girl",
    "Flower frogs",
    "A holder in the bottom of a vase that keeps stems where you put them.",
    "A weighted metal pin (kenzan) or a glass frog sized to fit your vase.",
    "flower frog kenzan",
    ["flower-arranging"],
  ),
  p(
    "jigsaw-puzzles",
    "cozy-after-hours",
    "Jigsaw puzzles",
    "A quiet, screen-free project you can leave on the table and come back to.",
    "A 500-piece puzzle to start; check that the box shows a clear picture to match against.",
    "jigsaw puzzle 500 pieces adults",
    ["jigsaw-puzzles", "board-games"],
  ),
  p(
    "paint-by-number-kits",
    "creative-girl",
    "Paint-by-number kit",
    "A guided canvas with numbered areas, so there is no blank-page pressure.",
    "A complete kit with numbered canvas, brushes and paints; larger numbered areas are easier for a first try.",
    "paint by numbers kit for adults",
    ["paint-by-numbers", "craft-nights"],
  ),
  p(
    "cozy-night-in",
    "cozy-after-hours",
    "Cozy night-in basics",
    "A throw blanket, flameless candles and a tea sampler make a weeknight feel like a plan.",
    "A soft machine-washable throw, battery-powered flameless candles and a tea sampler with a few flavors.",
    "cozy night in gift set blanket flameless candles tea",
    ["reading", "board-games"],
  ),
  p(
    "bike-helmets",
    "sporty-girl",
    "Bike helmet",
    "A helmet you will actually wear for easy rides.",
    "A CPSC-compliant label inside the helmet, an adjustable fit system and the manufacturer's sizing chart.",
    "bike helmet adult",
    [],
  ),
  p(
    "bike-lights",
    "sporty-girl",
    "Bike lights",
    "A front and rear set makes evening rides easier to plan.",
    "A rechargeable set with a front and rear light and a quick-release mount; follow your local rules and the manufacturer's instructions.",
    "bike light set front and rear rechargeable",
    [],
  ),
  p(
    "bike-repair-kits",
    "sporty-girl",
    "Bike repair kit",
    "A small kit for flat tires so a ride does not end early.",
    "A compact kit with tire levers, a patch kit and a mini pump or inflator that fits your valve type.",
    "bike flat tire repair kit with mini pump",
    [],
  ),
  p(
    "bike-bells",
    "sporty-girl",
    "Bike bell",
    "A friendly ding for shared paths.",
    "A clear tone and a clamp that fits your handlebar diameter.",
    "bike bell handlebar",
    [],
  ),
  p(
    "skate-protective-gear",
    "sporty-girl",
    "Skate protective gear",
    "Optional wrist, elbow and knee pads for first rink or park sessions.",
    "A set sold for skating, with sizing from the manufacturer and any standards label stated on the packaging.",
    "roller skate pads set adult wrist elbow knee",
    ["roller-skating"],
  ),
  p(
    "thermos-flasks",
    "little-adventures",
    "Insulated flask",
    "Keeps tea or coffee warm for a morning outside.",
    "A leak-resistant lid, a size you will carry (about 16 to 20 oz) and a wide mouth for easy cleaning.",
    "insulated thermos flask 16 oz",
    ["picnicking", "hiking", "birdwatching"],
  ),
  p(
    "cooler-bags",
    "little-adventures",
    "Cooler bag",
    "Keeps picnic snacks and drinks cold on the way.",
    "An insulated lining that wipes clean, a zip closure and a shoulder strap.",
    "insulated cooler bag picnic",
    ["picnicking"],
  ),
  p(
    "portable-speakers",
    "girls-night-in",
    "Portable speaker",
    "Easy music for a park afternoon or a craft night.",
    "Bluetooth, a battery life that covers your evening and a USB-C charging port.",
    "portable bluetooth speaker",
    ["craft-nights", "picnicking"],
  ),
  p(
    "glue-guns",
    "creative-girl",
    "Mini glue gun",
    "Fast, sturdy hold for craft projects and decorations.",
    "A stand and an on/off switch, and follow the manufacturer's instructions for heat and supervision.",
    "mini hot glue gun with stand",
    ["craft-nights", "collage-art"],
  ),
  p(
    "tea-sets",
    "cozy-after-hours",
    "Tea set",
    "A teapot and cups that make a cup of tea feel like an occasion.",
    "A small teapot with a removable infuser and cups that suit the number of people you host.",
    "tea set teapot with infuser and cups",
    ["book-clubs", "reading"],
  ),
  p(
    "brush-pens",
    "journaling-era",
    "Brush pens",
    "Soft tips for lettering, headings and journal pages.",
    "A small mixed set with a flexible tip; test one on the paper you plan to use.",
    "brush pens set lettering beginner",
    ["calligraphy", "junk-journaling"],
  ),
  p(
    "photo-albums",
    "journaling-era",
    "Photo album",
    "A home for printed photos and tickets from your outings.",
    "Pages labeled acid-free or archival and a size that matches the prints you make.",
    "photo album 4x6 acid free",
    ["scrapbooking", "film-photography"],
  ),
  p(
    "letter-writing-sets",
    "journaling-era",
    "Letter-writing set",
    "Paper, envelopes and a pen in one box makes a note easy to send.",
    "Matching paper and envelopes that take ink without bleeding through.",
    "letter writing set stationery paper envelopes",
    ["creative-writing", "calligraphy"],
  ),
  p(
    "indoor-plant-basics",
    "cozy-after-hours",
    "Indoor plant basics",
    "Pots, a small watering can and propagation jars for a windowsill start.",
    "Pots with drainage holes and saucers, a narrow-spout watering can and a few clear glass jars.",
    "indoor plant starter set pots watering can propagation jars",
    ["indoor-gardening"],
  ),
  p(
    "tennis-shoes",
    "sporty-girl",
    "Tennis shoes",
    "Court shoes made for side-to-side movement.",
    "A shoe labeled for tennis or court use, with a supportive upper and a non-marking sole.",
    "tennis shoes women court",
    ["tennis"],
  ),
  p(
    "pickleball-shoes",
    "sporty-girl",
    "Pickleball shoes",
    "Court shoes that grip an indoor or outdoor court.",
    "A shoe labeled for pickleball or court sports, with a non-marking sole and a secure fit.",
    "pickleball shoes women",
    ["pickleball"],
  ),
  p(
    "yoga-mats",
    "sporty-girl",
    "Yoga mat",
    "A cushioned, non-slip surface for floor practice at home.",
    "A non-slip surface and about 4 to 6 mm thickness; check the product's material description if you have sensitivities.",
    "yoga mat non slip",
    ["yoga-for-beginners"],
  ),
];

/** Every product type id (collection and article-only), for validating `productIds`. */
export const allProductTypes: Product[] = [...products, ...articleProducts];
export const productTypeIds: string[] = allProductTypes.map((x) => x.id);

/** Product types in a collection: its own, plus cross-referenced ones (`extraProductIds`). */
export function collectionProducts(slug: string): Product[] {
  const c = collections.find((x) => x.slug === slug);
  const own = products.filter((x) => x.collection === slug);
  const extra = productsFor(c?.extraProductIds ?? []).filter((x) => x.collection !== slug);
  return [...own, ...extra];
}

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const getProduct = (id: string) => allProductTypes.find((x) => x.id === id);
export const productsFor = (ids: string[]) => ids.map(getProduct).filter((x): x is Product => !!x);

/** Kits shown on a collection page: only the ones listed for it, never another collection's. */
export const collectionKitIds = (slug: string): string[] => getCollection(slug)?.kitIds ?? [];

/** The collection a kit belongs to: the first one that lists it. Used for "More in ..." links. */
export const kitHomeCollection = (kitId: string): Collection | undefined =>
  collections.find((c) => c.kitIds?.includes(kitId));
