import type { ImageKey } from "./images";

export type CategorySlug =
  "after-hours" | "weekends" | "solo-dates" | "better-together" | "creative-corner" | "movement";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  kicker: string;
  intro: string;
  image: ImageKey;
  tone: "butter" | "strawberry" | "matcha" | "sunday" | "cream";
  hobbyTags: string[];
  /** Search title and description for the section page. */
  metaTitle: string;
  metaDescription: string;
  /** Hand-picked hobby slugs shown first, in this order, so sections do not repeat each other. */
  featured: string[];
};

export const categories: Category[] = [
  {
    slug: "after-hours",
    name: "After Hours",
    short: "Weeknight hobbies & plans",
    kicker: "5:01 p.m. and beyond",
    intro: "Small, doable ideas for after you close the laptop. No car, no full Saturday.",
    image: "watercolor",
    tone: "butter",
    hobbyTags: ["after-work", "low-energy"],
    metaTitle: "After-Work Hobbies You Can Start Tonight",
    metaDescription:
      "Weeknight hobbies and plans for after you close the laptop. No car, no full Saturday, and you can be started within the hour.",
    featured: [
      "junk-journaling",
      "watercolor-painting",
      "reading",
      "jigsaw-puzzles",
      "baking",
      "yoga-for-beginners",
    ],
  },
  {
    slug: "weekends",
    name: "The Weekend Edit",
    short: "Saturday & Sunday inspiration",
    kicker: "Let's give Saturday a storyline",
    intro: "Weekend plans that aren't just brunch. Markets, picnics, workshops and slow mornings.",
    image: "picnic",
    tone: "strawberry",
    hobbyTags: ["weekend"],
    metaTitle: "Weekend Plans That Aren't Just Brunch",
    metaDescription: "Markets, picnics, workshops and slow mornings. Give Saturday a storyline.",
    featured: [
      "picnicking",
      "thrifting",
      "hiking",
      "museum-exploring",
      "flower-arranging",
      "pottery-painting",
    ],
  },
  {
    slug: "solo-dates",
    name: "Table for One",
    short: "Solo dates you'll look forward to",
    kicker: "Make plans with yourself",
    intro: "Solo, not lonely. Plans for enjoying your own company.",
    image: "soloCafe",
    tone: "cream",
    hobbyTags: ["solo"],
    metaTitle: "Solo Date Ideas You'll Actually Look Forward To",
    metaDescription: "Cafe dates, creative nights and slow Saturdays for one. Solo, not lonely.",
    featured: [
      "reading",
      "film-photography",
      "museum-exploring",
      "creative-writing",
      "birdwatching",
      "outdoor-sketching",
    ],
  },
  {
    slug: "better-together",
    name: "Better Together",
    short: "Friendship & social plans",
    kicker: "Text the group chat",
    intro: "Hobbies that come with people built in. Pick one, text the group chat, set a date.",
    image: "girlsNight",
    tone: "strawberry",
    hobbyTags: ["social"],
    metaTitle: "Hobbies to Do With Friends",
    metaDescription:
      "Craft nights, mahjong, book clubs and new friends. Text the group chat and pick a date.",
    featured: [
      "mahjong",
      "craft-nights",
      "book-clubs",
      "pickleball",
      "board-games",
      "cooking-classes",
    ],
  },
  {
    slug: "creative-corner",
    name: "Creative Corner",
    short: "Arts, crafts & making things",
    kicker: "Being good at it is optional",
    intro: "Paint, clay, paper and thread. End the night with something you made.",
    image: "junkJournal",
    tone: "butter",
    hobbyTags: ["creative"],
    metaTitle: "Creative Hobbies for Beginners",
    metaDescription:
      "Paint, clay, paper and thread. End the night with something you made. Being good at it is optional.",
    featured: [
      "watercolor-painting",
      "air-dry-clay",
      "crochet",
      "junk-journaling",
      "embroidery",
      "calligraphy",
    ],
  },
  {
    slug: "movement",
    name: "A Little Movement",
    short: "Outdoor & recreational hobbies",
    kicker: "Fresh air counts",
    intro: "Movement for fun, not for a tracker. Tennis, hiking, skating and slow wanders.",
    image: "tennis",
    tone: "matcha",
    hobbyTags: ["active", "outdoors"],
    metaTitle: "Fun Ways to Move That Aren't the Gym",
    metaDescription:
      "Tennis, pickleball, hiking and slow wanders. Movement for fun, not for a tracker.",
    featured: ["tennis", "pickleball", "hiking", "roller-skating", "yoga-for-beginners", "running"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
