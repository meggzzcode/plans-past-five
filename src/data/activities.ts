import type { Cost } from "./hobbies";

export type Vibe = "cozy" | "creative" | "outdoorsy" | "social" | "adventurous";
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
};

const A = (id: string, text: string, vibes: Vibe[], who: Who[], cost: Cost, parts: Part[], minutes: number, extra: Partial<Activity> = {}): Activity =>
  ({ id, text, vibes, who, cost, parts, minutes, ...extra });

const all: Who[] = ["alone", "friend", "partner", "group"];
const duo: Who[] = ["friend", "partner"];

/** Generic, location-independent activities. Never names a real business, event, price or opening hour. */
export const activities: Activity[] = [
  A("market", "Wander a farmers market and bring home a small bunch of flowers.", ["outdoorsy", "adventurous", "cozy"], all, "under25", ["morning"], 90, { lowCost: "Browse and buy just one piece of fruit for the walk home." }),
  A("slow-breakfast", "Make a slow breakfast at home: good coffee, eggs, a real plate, no phone.", ["cozy"], all, "free", ["morning"], 60),
  A("trail", "Walk a short, well-marked local trail and pack a snack for the best view.", ["outdoorsy", "adventurous"], all, "free", ["morning", "afternoon"], 150, { hobby: "hiking" }),
  A("park-walk", "Take a golden-hour walk through the nearest park with no destination.", ["outdoorsy", "cozy"], all, "free", ["evening", "afternoon"], 45),
  A("birds", "Sit on a park bench and log every bird you can hear with a free ID app.", ["outdoorsy", "cozy"], ["alone", "friend", "partner"], "free", ["morning"], 60, { hobby: "birdwatching" }),
  A("photo-walk", "Do a themed photo walk: twenty photos of one color.", ["outdoorsy", "creative", "adventurous"], all, "free", ["morning", "afternoon", "evening"], 60, { hobby: "nature-photography" }),
  A("picnic", "Pack bread, fruit and cheese and have a picnic on a blanket.", ["outdoorsy", "cozy", "social"], all, "under25", ["afternoon"], 120, { hobby: "picnicking", lowCost: "Use what's in the fridge and a bedsheet as your blanket." }),
  A("thrift", "Go thrifting with a $15 budget and a challenge: one piece of tableware you love.", ["adventurous", "creative", "social"], all, "under25", ["morning", "afternoon"], 120, { hobby: "thrifting", lowCost: "Window-shop only and make a wishlist." }),
  A("museum", "Visit a museum or gallery and spend ten minutes with just one piece.", ["adventurous", "cozy"], all, "flexible", ["afternoon"], 120, { hobby: "museum-exploring", lowCost: "Check for a free-entry day or a free local gallery." }),
  A("bookstore", "Take yourself on a bookstore date and read the first page of five books.", ["cozy", "adventurous"], ["alone", "partner", "friend"], "under25", ["afternoon", "evening"], 60, { hobby: "reading", lowCost: "Go to the library instead and borrow two." }),
  A("cafe-sketch", "Sit in a café window and sketch what you see for fifteen minutes.", ["creative", "cozy"], ["alone", "friend"], "under25", ["morning", "afternoon"], 60, { hobby: "outdoor-sketching", lowCost: "Sketch on a park bench with a takeaway tea from home." }),
  A("watercolor", "Paint whatever is on your counter in watercolor, three colors only.", ["creative", "cozy"], ["alone", "friend", "partner"], "under25", ["afternoon", "evening"], 45, { hobby: "watercolor-painting" }),
  A("clay", "Make an air-dry clay ring dish and leave it to dry overnight.", ["creative", "cozy"], all, "under25", ["afternoon", "evening"], 60, { hobby: "air-dry-clay" }),
  A("collage", "Make a collage from old magazines about everything you want more of.", ["creative", "cozy"], all, "free", ["afternoon", "evening"], 45, { hobby: "collage-art" }),
  A("journal", "Make a junk journal page about this week using receipts and tickets.", ["creative", "cozy"], ["alone", "friend"], "free", ["evening", "afternoon"], 40, { hobby: "junk-journaling" }),
  A("bracelets", "Host a friendship bracelet hour with snacks and a bead kit.", ["creative", "social", "cozy"], ["friend", "group"], "under25", ["evening", "afternoon"], 90, { hobby: "friendship-bracelets" }),
  A("pottery-studio", "Paint a mug or plate at a paint-your-own-pottery studio.", ["creative", "social"], all, "flexible", ["afternoon"], 120, { hobby: "pottery-painting", lowCost: "Paint a plain thrifted mug at home with porcelain paint." }),
  A("bake", "Bake one batch of cookies and give half away.", ["cozy", "creative", "social"], all, "under25", ["afternoon", "evening"], 75, { hobby: "baking" }),
  A("puzzle", "Start a puzzle with an album playing and the phone in another room.", ["cozy"], all, "under25", ["evening"], 60, { hobby: "jigsaw-puzzles", lowCost: "Borrow one from a friend or the library." }),
  A("read-bath", "Read a novel somewhere that isn't your bed: bath, balcony or floor cushion.", ["cozy"], ["alone"], "free", ["evening"], 45, { hobby: "reading" }),
  A("dinner-for-one", "Make a nice dinner for one: candle, good plate, eat at the table.", ["cozy"], ["alone"], "free", ["evening"], 60),
  A("cook-together", "Cook a new recipe together, then wash up with music on.", ["cozy", "social"], ["friend", "partner", "group"], "under25", ["evening"], 120),
  A("tennis", "Book a free public court and rally for 45 minutes.", ["outdoorsy", "social", "adventurous"], ["friend", "partner", "group"], "free", ["morning", "evening"], 60, { hobby: "tennis" }),
  A("pickleball", "Show up to open play pickleball at a public court.", ["outdoorsy", "social"], all, "free", ["morning", "evening"], 75, { hobby: "pickleball" }),
  A("skate", "Go to an adults' skate night and wobble together.", ["adventurous", "social"], ["friend", "partner", "group"], "under25", ["evening"], 90, { hobby: "roller-skating" }),
  A("game-night", "Host a game night: mahjong, cards or a cooperative board game.", ["social", "cozy"], ["group", "friend", "partner"], "free", ["evening"], 150, { hobby: "mahjong" }),
  A("book-club", "Start a two-person book club: same short novel, one café, two weeks.", ["social", "cozy"], ["friend", "group"], "free", ["afternoon", "evening"], 90, { hobby: "book-clubs" }),
  A("call-walk", "Go for a walk and call a friend you keep meaning to catch up with.", ["social", "outdoorsy"], ["alone"], "free", ["evening", "afternoon"], 40),
  A("letter", "Write an actual letter to a friend and post it.", ["cozy", "creative"], ["alone"], "free", ["evening", "morning"], 30),
  A("flowers", "Split a supermarket bunch of flowers into three small jars around your home.", ["creative", "cozy"], all, "under25", ["morning", "afternoon"], 30, { hobby: "flower-arranging" }),
  A("film-roll", "Shoot a whole roll of film on one walk around a neighborhood you rarely visit.", ["adventurous", "creative", "outdoorsy"], all, "flexible", ["afternoon", "morning"], 120, { hobby: "film-photography", lowCost: "Use your phone with a single filter all day." }),
  A("new-neighborhood", "Take public transit to a neighborhood you've never explored and find one café.", ["adventurous"], all, "under25", ["morning", "afternoon"], 180),
  A("sunset", "Find the best nearby spot for sunset and bring something warm to drink.", ["outdoorsy", "cozy", "social"], all, "free", ["evening"], 60),
  A("volunteer", "Sign up for a single one-off volunteering shift.", ["social", "adventurous"], all, "free", ["morning", "afternoon"], 180, { hobby: "volunteering" }),
  A("vinyl", "Listen to one full album start to finish, no skipping, no phone.", ["cozy"], ["alone", "partner", "friend"], "free", ["evening"], 45, { hobby: "vinyl-collecting" }),
  A("embroidery", "Stitch your initial on a tote bag or a pair of jeans.", ["creative", "cozy"], ["alone", "friend"], "under25", ["evening"], 60, { hobby: "embroidery" }),
  A("drop-in", "Try a single drop-in class: pottery, drawing, dance or yoga.", ["adventurous", "creative", "social"], all, "flexible", ["morning", "evening", "afternoon"], 90, { lowCost: "Follow a free beginner video at home instead." }),
  A("plan-weekend", "Plan next weekend on paper: one fun thing for Saturday, one for Sunday.", ["cozy"], all, "free", ["evening"], 20),
];
