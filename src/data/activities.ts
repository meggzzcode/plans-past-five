import type { Cost } from "./hobbies";

export type Vibe =
  "cozy" | "relaxing" | "creative" | "active" | "outdoorsy" | "social" | "adventurous";
export type ActivityEnergy = "low" | "medium" | "high";
/** Where the activity physically happens. "either" works indoors or out. */
export type ActivitySetting = "indoor" | "outdoor" | "either";
export type Who = "alone" | "friend" | "partner" | "group";
export type Part = "morning" | "afternoon" | "evening";

export type Activity = {
  id: string;
  text: string;
  vibes: Vibe[];
  who: Who[];
  cost: Cost;
  parts: Part[];
  minutes: number;
  lowCost?: string;
  hobby?: string;
  /** A catch-all idea (no specific activity named). The planner prefers a specific idea that fits. */
  generic?: boolean;
  /** Short title used as the itinerary heading. */
  name: string;
  energy: ActivityEnergy;
  setting: ActivitySetting;
  /** True when it can be done without leaving the house. */
  home: boolean;
  /**
   * True when it needs signing up or booking ahead (a volunteer shift). Same-day, tonight and
   * single-day plans leave these out, because nobody can do them on the fly.
   */
  advance?: boolean;
  /**
   * Activity family (cooking, walking, painting ...). The planner never puts two ideas of the same
   * family in one itinerary, so a plan does not bake and then cook.
   */
  family: string;
  /** Approximate cost range in whole dollars. Always labeled approximate in the UI. */
  costMin: number;
  costMax: number;
  prep: string;
  supplies: string[];
  /**
   * When the activity may START, as clock windows in minutes after midnight. Derived from `parts`
   * unless overridden in `startWindows` (golden hour is evening, breakfast is morning, and so on).
   * The planner only ever places an activity at a start time inside one of these windows.
   */
  at: [number, number][];
};

type Base = Omit<
  Activity,
  | "name"
  | "energy"
  | "setting"
  | "home"
  | "advance"
  | "family"
  | "costMin"
  | "costMax"
  | "prep"
  | "supplies"
  | "at"
>;

const A = (
  id: string,
  text: string,
  vibes: Vibe[],
  who: Who[],
  cost: Cost,
  parts: Part[],
  minutes: number,
  extra: Partial<Base> = {},
): Base => ({ id, text, vibes, who, cost, parts, minutes, ...extra });

const all: Who[] = ["alone", "friend", "partner", "group"];
const duo: Who[] = ["friend", "partner"];

/** Generic, location-independent activities. Never names a real business, event, price or opening hour. */
const base: Base[] = [
  A(
    "market",
    "Wander a farmers market and bring home a small bunch of flowers.",
    ["outdoorsy", "adventurous", "cozy"],
    all,
    "under25",
    ["morning"],
    90,
    { lowCost: "Browse and buy just one piece of fruit for the walk home." },
  ),
  A(
    "slow-breakfast",
    "Make a slow breakfast at home: good coffee, eggs, a real plate, no phone.",
    ["cozy"],
    all,
    "free",
    ["morning"],
    60,
  ),
  A(
    "trail",
    "Walk a short, well-marked local trail and pack a snack for the best view.",
    ["outdoorsy", "adventurous"],
    all,
    "free",
    ["morning", "afternoon"],
    150,
    { hobby: "hiking" },
  ),
  A(
    "park-walk",
    "Take a golden-hour walk through the nearest park with no destination.",
    ["outdoorsy", "cozy"],
    all,
    "free",
    ["evening", "afternoon"],
    45,
  ),
  A(
    "birds",
    "Sit on a park bench and log every bird you can hear with a free ID app.",
    ["outdoorsy", "cozy"],
    ["alone", "friend", "partner"],
    "free",
    ["morning"],
    60,
    { hobby: "birdwatching" },
  ),
  A(
    "photo-walk",
    "Do a themed photo walk: twenty photos of one color.",
    ["outdoorsy", "creative", "adventurous"],
    all,
    "free",
    ["morning", "afternoon", "evening"],
    60,
    { hobby: "nature-photography" },
  ),
  A(
    "picnic",
    "Pack bread, fruit and cheese and have a picnic on a blanket.",
    ["outdoorsy", "cozy", "social"],
    all,
    "under25",
    ["afternoon"],
    120,
    { hobby: "picnicking", lowCost: "Use what's in the fridge and a bedsheet as your blanket." },
  ),
  A(
    "thrift",
    "Go thrifting with a small spending limit and a challenge: one piece of tableware you love.",
    ["adventurous", "creative", "social"],
    all,
    "under25",
    ["morning", "afternoon"],
    120,
    { hobby: "thrifting", lowCost: "Window-shop only and make a wishlist." },
  ),
  A(
    "museum",
    "Visit a museum or gallery and spend ten minutes with just one piece.",
    ["adventurous", "cozy"],
    all,
    "flexible",
    ["afternoon"],
    120,
    { hobby: "museum-exploring", lowCost: "Check for a free-entry day or a free local gallery." },
  ),
  A(
    "bookstore",
    "Take yourself on a bookstore date and read the first page of five books.",
    ["cozy", "adventurous"],
    ["alone", "partner", "friend"],
    "under25",
    ["afternoon", "evening"],
    60,
    { hobby: "reading", lowCost: "Go to the library instead and borrow two." },
  ),
  A(
    "cafe-sketch",
    "Sit in a café window and sketch what you see for fifteen minutes.",
    ["creative", "cozy"],
    ["alone", "friend"],
    "under25",
    ["morning", "afternoon"],
    60,
    {
      hobby: "outdoor-sketching",
      lowCost: "Sketch on a park bench with a takeaway tea from home.",
    },
  ),
  A(
    "watercolor",
    "Paint whatever is on your counter in watercolor, three colors only.",
    ["creative", "cozy"],
    ["alone", "friend", "partner"],
    "under25",
    ["afternoon", "evening"],
    45,
    { hobby: "watercolor-painting" },
  ),
  A(
    "clay",
    "Make an air-dry clay ring dish and let it dry (see your clay's label for timing).",
    ["creative", "cozy"],
    all,
    "under25",
    ["afternoon", "evening"],
    60,
    { hobby: "air-dry-clay" },
  ),
  A(
    "collage",
    "Make a collage from old magazines about everything you want more of.",
    ["creative", "cozy"],
    all,
    "free",
    ["afternoon", "evening"],
    45,
    { hobby: "collage-art" },
  ),
  A(
    "journal",
    "Make a junk journal page about this week using receipts and tickets.",
    ["creative", "cozy"],
    ["alone", "friend"],
    "free",
    ["evening", "afternoon"],
    40,
    { hobby: "junk-journaling" },
  ),
  A(
    "bracelets",
    "Host a friendship bracelet hour with snacks and a bead kit.",
    ["creative", "social", "cozy"],
    ["friend", "group"],
    "under25",
    ["evening", "afternoon"],
    90,
    { hobby: "friendship-bracelets" },
  ),
  A(
    "pottery-studio",
    "Paint a mug or plate at a paint-your-own-pottery studio.",
    ["creative", "social"],
    all,
    "flexible",
    ["afternoon"],
    120,
    {
      hobby: "pottery-painting",
      lowCost: "Paint a plain thrifted mug at home with porcelain paint.",
    },
  ),
  A(
    "bake",
    "Bake one batch of cookies and give half away.",
    ["cozy", "creative", "social"],
    all,
    "under25",
    ["afternoon", "evening"],
    75,
    { hobby: "baking" },
  ),
  A(
    "puzzle",
    "Start a puzzle with an album playing and the phone in another room.",
    ["cozy"],
    all,
    "under25",
    ["evening"],
    60,
    { hobby: "jigsaw-puzzles", lowCost: "Borrow one from a friend or the library." },
  ),
  A(
    "read-bath",
    "Read a novel somewhere that isn't your bed: bath, balcony or floor cushion.",
    ["cozy"],
    ["alone"],
    "free",
    ["evening"],
    45,
    { hobby: "reading" },
  ),
  A(
    "dinner-for-one",
    "Make a nice dinner for one: candle, good plate, eat at the table.",
    ["cozy"],
    ["alone"],
    "free",
    ["evening"],
    60,
  ),
  A(
    "cook-together",
    "Cook a new recipe together, then wash up with music on.",
    ["cozy", "social"],
    ["friend", "partner", "group"],
    "under25",
    ["evening"],
    120,
  ),
  A(
    "tennis",
    "Head to a public court (often free) and rally for 45 minutes.",
    ["outdoorsy", "social", "adventurous"],
    ["friend", "partner", "group"],
    "free",
    ["morning", "evening"],
    60,
    { hobby: "tennis" },
  ),
  A(
    "pickleball",
    "Show up to open play pickleball at a public court.",
    ["outdoorsy", "social"],
    all,
    "free",
    ["morning", "evening"],
    75,
    { hobby: "pickleball" },
  ),
  A(
    "skate",
    "Go to an adults' skate night and wobble together.",
    ["adventurous", "social"],
    ["friend", "partner", "group"],
    "under25",
    ["evening"],
    90,
    { hobby: "roller-skating" },
  ),
  A(
    "game-night",
    "Host a game night: mahjong, cards or a cooperative board game.",
    ["social", "cozy"],
    ["group", "friend", "partner"],
    "free",
    ["evening"],
    150,
    { hobby: "mahjong" },
  ),
  A(
    "book-club",
    "Start a two-person book club: same short novel, one café, two weeks.",
    ["social", "cozy"],
    ["friend", "group"],
    "free",
    ["afternoon", "evening"],
    90,
    { hobby: "book-clubs" },
  ),
  A(
    "call-walk",
    "Go for a walk and call a friend you keep meaning to catch up with.",
    ["social", "outdoorsy"],
    ["alone"],
    "free",
    ["evening", "afternoon"],
    40,
  ),
  A(
    "letter",
    "Write an actual letter to a friend and post it.",
    ["cozy", "creative"],
    ["alone"],
    "free",
    ["evening", "morning"],
    30,
  ),
  A(
    "flowers",
    "Split a supermarket bunch of flowers into three small jars around your home.",
    ["creative", "cozy"],
    all,
    "under25",
    ["morning", "afternoon"],
    30,
    { hobby: "flower-arranging" },
  ),
  A(
    "film-roll",
    "Shoot a whole roll of film on one walk around a neighborhood you rarely visit.",
    ["adventurous", "creative", "outdoorsy"],
    all,
    "flexible",
    ["afternoon", "morning"],
    120,
    { hobby: "film-photography", lowCost: "Use your phone with a single filter all day." },
  ),
  A(
    "new-neighborhood",
    "Take public transit to a neighborhood you've never explored and find one café.",
    ["adventurous"],
    all,
    "under25",
    ["morning", "afternoon"],
    180,
  ),
  A(
    "sunset",
    "Find the best nearby spot for sunset and bring something warm to drink.",
    ["outdoorsy", "cozy", "social"],
    all,
    "free",
    ["evening"],
    60,
  ),
  A(
    "volunteer",
    "Sign up for a single one-off volunteering shift.",
    ["social", "adventurous"],
    all,
    "free",
    ["morning", "afternoon"],
    180,
    { hobby: "volunteering" },
  ),
  A(
    "vinyl",
    "Listen to one full album start to finish, no skipping, no phone.",
    ["cozy"],
    ["alone", "partner", "friend"],
    "free",
    ["evening"],
    45,
    { hobby: "vinyl-collecting" },
  ),
  A(
    "embroidery",
    "Stitch your initial on a tote bag or a pair of jeans.",
    ["creative", "cozy"],
    ["alone", "friend"],
    "under25",
    ["evening"],
    60,
    { hobby: "embroidery" },
  ),
  A(
    "drop-in",
    "Try a single drop-in class: pottery, drawing, dance or yoga.",
    ["adventurous", "creative", "social"],
    all,
    "flexible",
    ["morning", "evening", "afternoon"],
    90,
    { generic: true, lowCost: "Follow a free beginner video at home instead." },
  ),
  A(
    "plan-weekend",
    "Plan next weekend on paper: one fun thing for Saturday, one for Sunday.",
    ["cozy"],
    all,
    "free",
    ["evening"],
    20,
  ),
  A(
    "home-yoga",
    "Follow a free beginner yoga video on a towel or mat.",
    ["active", "relaxing"],
    all,
    "free",
    ["morning", "evening"],
    30,
  ),
  A(
    "bike-ride",
    "Ride a bike along a flat, quiet route and stop wherever looks nice.",
    ["active", "outdoorsy", "adventurous"],
    all,
    "free",
    ["morning", "afternoon"],
    90,
  ),
  A(
    "frisbee",
    "Toss a frisbee or any ball around a park with snacks on the side.",
    ["active", "social", "outdoorsy"],
    ["friend", "partner", "group"],
    "free",
    ["afternoon"],
    60,
  ),
  A(
    "kitchen-dance",
    "Put on a playlist and learn one dance routine from a free video.",
    ["active", "social", "creative"],
    all,
    "free",
    ["evening"],
    30,
  ),
  A(
    "movie-night",
    "Pick a film from your watchlist, make popcorn and put the phones away.",
    ["cozy", "relaxing", "social"],
    all,
    "under25",
    ["evening"],
    120,
  ),
  A(
    "face-mask",
    "Have a low-key self-care hour: face mask, tea and a good playlist.",
    ["cozy", "relaxing"],
    ["alone", "friend"],
    "under25",
    ["evening"],
    45,
  ),
  A(
    "reset-morning",
    "Do a gentle reset: open the windows, tidy one corner and queue a playlist.",
    ["cozy", "relaxing"],
    ["alone", "partner"],
    "free",
    ["morning"],
    60,
  ),
  A(
    "paint-night",
    "Host a paint night with cheap canvases or paper and one reference image.",
    ["creative", "social"],
    ["friend", "group"],
    "under25",
    ["evening", "afternoon"],
    120,
    { hobby: "craft-nights" },
  ),
  A(
    "zine",
    "Fold a single sheet of paper into a one-page zine about your week.",
    ["creative", "relaxing"],
    all,
    "free",
    ["afternoon", "evening", "morning"],
    45,
    { hobby: "creative-writing" },
  ),
  A(
    "plant-care",
    "Repot or propagate a houseplant and give it a little corner of its own.",
    ["cozy", "relaxing", "creative"],
    ["alone", "friend", "partner"],
    "under25",
    ["morning", "afternoon"],
    45,
    { hobby: "indoor-gardening" },
  ),
  A(
    "stargaze",
    "Take a blanket outside after dark and find the brightest stars with a free sky-map app.",
    ["outdoorsy", "relaxing", "social"],
    all,
    "free",
    ["evening"],
    45,
  ),
  A(
    "thermos-walk",
    "Take a thermos walk before the day starts and notice three things you never saw before.",
    ["outdoorsy", "relaxing", "active"],
    all,
    "free",
    ["morning"],
    40,
  ),
  A(
    "crossword-cafe",
    "Work a crossword or puzzle book in a café with a pencil and a slow drink.",
    ["cozy", "relaxing"],
    ["alone", "friend"],
    "under25",
    ["morning", "afternoon"],
    60,
    { hobby: "crossword-puzzles", lowCost: "Do the same puzzle at your kitchen table." },
  ),
  A(
    "meal-prep",
    "Cook one big pot of something good and portion it into lunches for the week.",
    ["cozy", "creative", "relaxing"],
    ["alone", "partner", "friend"],
    "under25",
    ["morning", "afternoon"],
    90,
    { hobby: "baking" },
  ),
];

type Extra = {
  name: string;
  energy: ActivityEnergy;
  setting: ActivitySetting;
  cost: [number, number];
  prep: string;
  supplies: string[];
  home?: true;
  addVibes?: Vibe[];
};

/** Details layered on top of each base idea. Ranges are approximate whole dollars, never real prices. */
const extras: Record<string, Extra> = {
  market: {
    name: "Farmers market wander",
    energy: "low",
    setting: "outdoor",
    cost: [0, 15],
    prep: "Look up whether a market is on near you and bring a tote bag.",
    supplies: ["Tote bag", "A little cash or a card"],
    addVibes: ["relaxing"],
  },
  "slow-breakfast": {
    name: "Slow breakfast at home",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Shop for or check you have eggs, bread and coffee the night before.",
    supplies: ["Whatever breakfast food you already have", "A real plate"],
    addVibes: ["relaxing"],
  },
  trail: {
    name: "Short local trail walk",
    energy: "high",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Pick a short, well-marked trail, check the weather and tell someone where you are going.",
    supplies: ["Comfortable shoes", "Water bottle", "A snack"],
    addVibes: ["active"],
  },
  "park-walk": {
    name: "Golden-hour park walk",
    energy: "low",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Check sunset time so you catch the good light.",
    supplies: ["Comfortable shoes"],
    addVibes: ["relaxing", "active"],
  },
  birds: {
    name: "Bench bird log",
    energy: "low",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Download a free bird-ID app before you go.",
    supplies: ["Phone with a free ID app", "Small notebook (optional)"],
    addVibes: ["relaxing"],
  },
  "photo-walk": {
    name: "One-color photo walk",
    energy: "medium",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Choose your color and charge your phone.",
    supplies: ["Phone camera"],
    addVibes: ["active"],
  },
  picnic: {
    name: "Blanket picnic",
    energy: "low",
    setting: "outdoor",
    cost: [5, 20],
    prep: "Pick a spot, check the weather and pack food the night before.",
    supplies: ["Blanket or bedsheet", "Bread, fruit and cheese or similar", "Reusable bag"],
    addVibes: ["relaxing"],
  },
  thrift: {
    name: "Thrift challenge",
    energy: "medium",
    setting: "indoor",
    cost: [0, 15],
    prep: "Set your spending limit and measure the space you are shopping for.",
    supplies: ["Tote bag", "Small budget in cash or card"],
  },
  museum: {
    name: "One-piece museum visit",
    energy: "low",
    setting: "indoor",
    cost: [0, 30],
    prep: "Check opening hours and any free-entry days for a museum or gallery near you.",
    supplies: ["Small notebook (optional)"],
  },
  bookstore: {
    name: "Bookstore date",
    energy: "low",
    setting: "indoor",
    cost: [0, 15],
    prep: "Decide your one-book limit before you walk in.",
    supplies: ["Tote bag"],
    addVibes: ["relaxing"],
  },
  "cafe-sketch": {
    name: "Café window sketch",
    energy: "low",
    setting: "either",
    cost: [4, 12],
    prep: "Pack a pencil and small sketchbook.",
    supplies: ["Pencil", "Small sketchbook or notebook"],
    addVibes: ["relaxing"],
  },
  watercolor: {
    name: "Three-color watercolor",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 15],
    prep: "Set a table with paper, a jar of water and your paints.",
    supplies: ["Watercolor paints", "Paper", "Brush", "Jar of water"],
  },
  clay: {
    name: "Air-dry clay ring dish",
    energy: "medium",
    setting: "indoor",
    home: true,
    cost: [8, 20],
    prep: "Cover the table and have water and a rolling object ready.",
    supplies: ["Air-dry clay", "Rolling pin or bottle", "Paint (optional)"],
    addVibes: ["relaxing"],
  },
  collage: {
    name: "Magazine collage",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Gather old magazines, junk mail and a glue stick.",
    supplies: ["Old magazines", "Scissors", "Glue stick", "Paper or card"],
    addVibes: ["relaxing"],
  },
  journal: {
    name: "Junk journal page",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Empty your bag and wallet of tickets and receipts.",
    supplies: ["Notebook", "Glue stick", "Scissors", "Paper scraps"],
    addVibes: ["relaxing"],
  },
  bracelets: {
    name: "Friendship bracelet hour",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [8, 20],
    prep: "Order or pick up a bead or thread kit ahead and prepare snacks.",
    supplies: ["Bead or thread kit", "Scissors", "Snacks"],
  },
  "pottery-studio": {
    name: "Paint-your-own pottery",
    energy: "low",
    setting: "indoor",
    cost: [20, 50],
    prep: "Look up a paint-your-own pottery studio near you and check whether you need to book.",
    supplies: ["Nothing: the studio supplies it"],
  },
  bake: {
    name: "Cookie batch",
    energy: "medium",
    setting: "indoor",
    home: true,
    cost: [5, 15],
    prep: "Pick a recipe and check you have butter, flour and sugar.",
    supplies: ["Cookie ingredients", "Baking tray", "Containers to give some away"],
  },
  puzzle: {
    name: "Phone-free puzzle",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 20],
    prep: "Clear a table and queue an album.",
    supplies: ["Jigsaw puzzle (borrowed or bought)", "Music"],
    addVibes: ["relaxing"],
  },
  "read-bath": {
    name: "Novel somewhere new",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Choose your book and your spot, and silence your phone.",
    supplies: ["A novel", "Cushion or towel"],
    addVibes: ["relaxing"],
  },
  "dinner-for-one": {
    name: "Dinner for one",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Pick a recipe you like with ingredients you already have.",
    supplies: ["Ingredients from your kitchen", "A candle", "Your nicest plate"],
    addVibes: ["relaxing"],
  },
  "cook-together": {
    name: "Cook a new recipe together",
    energy: "medium",
    setting: "indoor",
    home: true,
    cost: [8, 25],
    prep: "Agree on a recipe and shop for ingredients beforehand.",
    supplies: ["Ingredients", "Music"],
  },
  tennis: {
    name: "Public court rally",
    energy: "high",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Find a public court (often free) and borrow rackets and balls if you can.",
    supplies: ["Rackets", "Tennis balls", "Water bottle"],
    addVibes: ["active"],
  },
  pickleball: {
    name: "Open-play pickleball",
    energy: "high",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Look up public open-play times near you and bring or borrow a paddle.",
    supplies: ["Paddle", "Water bottle"],
    addVibes: ["active"],
  },
  skate: {
    name: "Adults' skate night",
    energy: "high",
    setting: "either",
    cost: [5, 20],
    prep: "Find a skate session for adults near you and check what hire is available.",
    supplies: ["Comfortable clothes", "Socks"],
    addVibes: ["active"],
  },
  "game-night": {
    name: "Game night",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Pick two games and set out snacks.",
    supplies: ["Cards or a board game", "Snacks"],
  },
  "book-club": {
    name: "Two-person book club",
    energy: "low",
    setting: "indoor",
    cost: [0, 0],
    prep: "Choose a short novel together and set a date to talk.",
    supplies: ["The book (library copy works)"],
    addVibes: ["relaxing"],
  },
  "call-walk": {
    name: "Walk-and-call catch-up",
    energy: "medium",
    setting: "outdoor",

    cost: [0, 0],
    prep: "Text a friend to find a time that suits you both.",
    supplies: ["Phone", "Earbuds"],
    addVibes: ["active"],
  },
  letter: {
    name: "Handwritten letter",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Find paper, a pen and a stamp if you have one to post it.",
    supplies: ["Paper", "Pen", "Envelope and stamp"],
    addVibes: ["relaxing"],
  },
  flowers: {
    name: "Three-jar flowers",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [5, 15],
    prep: "Buy or pick one bunch and find three jars.",
    supplies: ["One bunch of flowers", "Three small jars", "Scissors"],
    addVibes: ["relaxing"],
  },
  "film-roll": {
    name: "One roll, one walk",
    energy: "medium",
    setting: "outdoor",
    cost: [15, 40],
    prep: "Load a roll of film in a camera or choose a phone filter, and pick your walking area.",
    supplies: ["Film camera and a roll, or phone", "Comfortable shoes"],
  },
  "new-neighborhood": {
    name: "New-neighborhood wander",
    energy: "medium",
    setting: "outdoor",
    cost: [3, 15],
    prep: "Choose an area and check your transit route.",
    supplies: ["Transit fare", "Comfortable shoes", "Phone map"],
    addVibes: ["active"],
  },
  sunset: {
    name: "Sunset spot",
    energy: "low",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Check sunset time and scout a spot with a view.",
    supplies: ["Warm drink in a flask", "A jacket"],
    addVibes: ["relaxing"],
  },
  volunteer: {
    name: "One-off volunteer shift",
    energy: "medium",
    setting: "either",
    cost: [0, 0],
    prep: "Search for one-off volunteering near you and sign up in advance.",
    supplies: ["Comfortable clothes", "Water bottle"],
  },
  vinyl: {
    name: "One album, no skipping",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Pick the album and put your phone in another room.",
    supplies: ["An album on vinyl, CD or streaming"],
    addVibes: ["relaxing"],
  },
  embroidery: {
    name: "Initial embroidery",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [5, 15],
    prep: "Sketch your letter lightly on fabric.",
    supplies: ["Embroidery thread", "Needle", "Tote bag or jeans", "Small hoop (optional)"],
    addVibes: ["relaxing"],
  },
  "drop-in": {
    name: "Drop-in class",
    energy: "medium",
    setting: "indoor",
    cost: [0, 30],
    prep: "Find a beginner drop-in class near you and check what to wear, or pick a free video.",
    supplies: ["Comfortable clothes", "Water bottle"],
  },
  "plan-weekend": {
    name: "Plan the next weekend",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Grab a pen and a calendar or this site's planner.",
    supplies: ["Pen", "Paper or planner"],
    addVibes: ["relaxing"],
  },
  "home-yoga": {
    name: "Beginner yoga at home",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Choose a free video and clear a floor space.",
    supplies: ["Mat or folded towel", "Phone or laptop"],
  },
  "bike-ride": {
    name: "Easy bike ride",
    energy: "medium",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Check your tires and brakes, and pick a flat, quiet route.",
    supplies: ["Bike", "Helmet", "Water bottle"],
  },
  frisbee: {
    name: "Park toss",
    energy: "medium",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Bring any frisbee or ball you own, and snacks.",
    supplies: ["Frisbee or ball", "Snacks"],
  },
  "kitchen-dance": {
    name: "Kitchen dance routine",
    energy: "medium",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Choose a free dance video and clear some floor.",
    supplies: ["Speaker or headphones", "Phone or laptop"],
  },
  "movie-night": {
    name: "Movie night in",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 10],
    prep: "Pick the film and stock up on popcorn.",
    supplies: ["Popcorn or snacks", "Blanket"],
  },
  "face-mask": {
    name: "Self-care hour",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [3, 15],
    prep: "Run a bath or set out your mask and tea.",
    supplies: ["Face mask", "Tea", "Playlist"],
  },
  "reset-morning": {
    name: "Gentle reset morning",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Choose one corner to tidy and queue a playlist.",
    supplies: ["Playlist", "A cloth or tidy-up bag"],
  },
  "paint-night": {
    name: "Paint night at home",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [8, 25],
    prep: "Pick one reference image and set up a table with newspaper.",
    supplies: ["Cheap canvases or paper", "Acrylic or poster paint", "Brushes", "Snacks"],
  },
  zine: {
    name: "One-page zine",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 0],
    prep: "Learn the one-sheet fold from a free tutorial.",
    supplies: ["One sheet of paper", "Pens", "Scissors"],
  },
  "plant-care": {
    name: "Plant care hour",
    energy: "low",
    setting: "indoor",
    home: true,
    cost: [0, 15],
    prep: "Pick the plant and find a pot or jar.",
    supplies: ["Houseplant", "Pot or jar", "Potting mix (optional)"],
  },
  stargaze: {
    name: "Backyard stargazing",
    energy: "low",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Check the sky forecast and download a free sky-map app.",
    supplies: ["Blanket", "Warm layer", "Phone with free sky-map app"],
  },
  "thermos-walk": {
    name: "Thermos morning walk",
    energy: "low",
    setting: "outdoor",
    cost: [0, 0],
    prep: "Fill a thermos the night before.",
    supplies: ["Thermos with a hot drink", "Comfortable shoes"],
  },
  "crossword-cafe": {
    name: "Café crossword",
    energy: "low",
    setting: "indoor",
    cost: [3, 10],
    prep: "Pack a pencil and a puzzle book or printed crossword.",
    supplies: ["Pencil", "Puzzle book or printout"],
  },
  "meal-prep": {
    name: "Big-pot meal prep",
    energy: "medium",
    setting: "indoor",
    home: true,
    cost: [10, 25],
    prep: "Choose one recipe and write the shopping list.",
    supplies: ["Ingredients", "Containers"],
  },
};

const hm = (h: number, m = 0) => h * 60 + m;

/** Default start windows for a time of day. */
const partWindow: Record<Part, [number, number]> = {
  morning: [hm(7, 30), hm(11, 30)],
  afternoon: [hm(12), hm(16, 30)],
  evening: [hm(17), hm(20, 30)],
};

/** Activities whose name or nature needs a tighter window than their time-of-day parts. */
const startWindows: Record<string, [number, number]> = {
  "park-walk": [hm(16), hm(19)], // golden hour
  sunset: [hm(16, 30), hm(19, 30)],
  stargaze: [hm(18), hm(21)], // after dark
  "slow-breakfast": [hm(7, 30), hm(10, 30)],
  "reset-morning": [hm(8), hm(11)],
  "thermos-walk": [hm(7), hm(9, 30)], // before the day starts
  birds: [hm(7), hm(11)],
  market: [hm(8), hm(12)],
  trail: [hm(8), hm(14)], // daylight, and it takes a while
  "new-neighborhood": [hm(9, 30), hm(14, 30)],
  "bike-ride": [hm(8), hm(16)],
  "film-roll": [hm(10), hm(15, 30)],
  "photo-walk": [hm(8), hm(16, 30)],
  frisbee: [hm(12), hm(16, 30)],
  picnic: [hm(11, 30), hm(15, 30)],
  museum: [hm(10), hm(15, 30)],
  thrift: [hm(9, 30), hm(15)],
  "pottery-studio": [hm(10), hm(16)],
  bookstore: [hm(11), hm(19)],
  "cafe-sketch": [hm(8, 30), hm(15, 30)],
  volunteer: [hm(9), hm(13)],
  "dinner-for-one": [hm(17, 30), hm(20, 30)],
  "cook-together": [hm(17), hm(20)], // dinner
  "movie-night": [hm(18), hm(21)],
  "game-night": [hm(18), hm(20, 30)],
  skate: [hm(18), hm(20, 30)],
  "read-bath": [hm(18), hm(21)],
  vinyl: [hm(18), hm(21)],
  "face-mask": [hm(18), hm(21)],
  "call-walk": [hm(17), hm(20)],
};

/** Ideas that need signing up or booking ahead. Edit here. */
const ADVANCE_IDS: readonly string[] = ["volunteer"];

/** Ideas that are the same kind of thing. Anything not listed is its own family. Edit here. */
const FAMILIES: Record<string, string[]> = {
  cooking: ["bake", "cook-together", "meal-prep", "dinner-for-one", "slow-breakfast"],
  walking: [
    "park-walk",
    "thermos-walk",
    "call-walk",
    "photo-walk",
    "film-roll",
    "new-neighborhood",
    "trail",
    "sunset",
  ],
  painting: ["watercolor", "paint-night", "pottery-studio", "cafe-sketch"],
  "paper-craft": ["collage", "journal", "zine", "letter"],
  reading: ["read-bath", "book-club", "bookstore", "crossword-cafe", "puzzle"],
  "ball-sports": ["tennis", "pickleball", "frisbee"],
  wheels: ["skate", "bike-ride"],
  "self-care": ["face-mask", "reset-morning", "vinyl", "movie-night"],
};
const familyOf = (id: string) =>
  Object.entries(FAMILIES).find(([, ids]) => ids.includes(id))?.[0] ?? id;

export const activities: Activity[] = base.map((b) => {
  const e = extras[b.id];
  if (!e) throw new Error(`Activity "${b.id}" is missing details`);
  return {
    ...b,
    vibes: [...b.vibes, ...(e.addVibes ?? [])],
    name: e.name,
    energy: e.energy,
    setting: e.setting,
    home: e.home === true,
    ...(ADVANCE_IDS.includes(b.id) ? { advance: true } : {}),
    family: familyOf(b.id),
    costMin: e.cost[0],
    costMax: e.cost[1],
    prep: e.prep,
    supplies: e.supplies,
    at: startWindows[b.id]
      ? [startWindows[b.id]!]
      : [...b.parts]
          .sort()
          .map((p) => partWindow[p])
          .sort((x, y) => x[0] - y[0]),
  };
});

export const getActivity = (id: string) => activities.find((a) => a.id === id);
