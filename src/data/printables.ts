export type Printable = {
  slug: string;
  name: string;
  dek: string;
  description: string;
  pages: string;
  tone: "butter" | "strawberry" | "matcha" | "sunday";
};

export const printables: Printable[] = [
  { slug: "out-of-office-bucket-list", name: "The Out-of-Office Bucket List", dek: "Fifty achievable things to do outside work",
    description: "Fifty realistic ideas across creative hobbies, solo dates, friend plans, weeknights and weekend adventures. Stick it on the fridge and tick one off a week.",
    pages: "1 page · US Letter", tone: "butter" },
  { slug: "weekend-edit-planner", name: "The Weekend Edit Planner", dek: "Give Saturday (and Sunday) a storyline",
    description: "A flexible weekend worksheet with room for plans, people to see, a creative project, something new, rest time and the little things you want to remember.",
    pages: "1 page · US Letter", tone: "strawberry" },
  { slug: "hobby-era-tracker", name: "My Hobby Era Tracker", dek: "Try it, rate it, find your thing",
    description: "A playful tracker for trying new hobbies: what you tried, how it felt, what it cost and whether you'd do it again, plus a wishlist of what's next.",
    pages: "1 page · US Letter", tone: "matcha" },
];

export const getPrintable = (slug: string) => printables.find((p) => p.slug === slug);

export const bucketList: { section: string; items: string[] }[] = [
  { section: "Creative", items: ["Paint a mug at a pottery studio", "Make an air-dry clay dish", "Fill one junk journal page", "Paint the flowers on your table", "Stitch your initial on a tote", "Make a magazine collage", "Learn a calligraphy alphabet", "Bake something to give away", "Try a paint-by-number", "Make a pair of earrings"] },
  { section: "Table for one", items: ["Have dinner out alone", "Take a bookstore date", "Visit one museum room", "Sketch in a café window", "See a film by yourself", "Read in a park for an hour", "Walk a new neighborhood", "Shoot a roll of film", "Take a solo picnic", "Write yourself a letter"] },
  { section: "Better together", items: ["Host a bracelet night", "Start a two-person book club", "Play a round of mahjong", "Cook a new recipe with a friend", "Go to an adult skate night", "Have a picnic with the group chat", "Try a drop-in class with a friend", "Host a game night", "Volunteer for one shift together", "Send a real letter"] },
  { section: "After hours", items: ["Do a jigsaw instead of scrolling", "Take a golden-hour walk", "Listen to an album start to finish", "Make a nice dinner for one", "Water and repot a plant", "Read before your phone", "Call a friend on a walk", "Try a crossword", "Plan your weekend on paper", "Rally on a public tennis court"] },
  { section: "Weekend adventures", items: ["Visit a farmers market", "Hike a short local trail", "Go thrifting with $15", "Find the best sunset spot", "Try pickleball open play", "Explore a new neighborhood", "Go birdwatching in a park", "Take a day trip by train", "Pack a picnic and stay all afternoon", "Say yes to something new"] },
];
