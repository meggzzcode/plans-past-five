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
};

export const categories: Category[] = [
  {
    slug: "after-hours",
    name: "After Hours",
    short: "Weeknight hobbies & plans",
    kicker: "5:01 p.m. and beyond",
    intro:
      "Small, doable things for the hours between closing your laptop and going to bed. Nothing that needs a full Saturday, a car or a second wind you don't have.",
    image: "watercolor",
    tone: "butter",
    hobbyTags: ["after-work", "low-energy"],
  },
  {
    slug: "weekends",
    name: "The Weekend Edit",
    short: "Saturday & Sunday inspiration",
    kicker: "Let's give Saturday a storyline",
    intro:
      "Weekend plans that aren't just brunch and errands. Markets, picnics, workshops, long walks and slow mornings with something to show for them.",
    image: "picnic",
    tone: "strawberry",
    hobbyTags: ["weekend"],
  },
  {
    slug: "solo-dates",
    name: "Table for One",
    short: "Solo dates you'll look forward to",
    kicker: "Make plans with yourself",
    intro:
      "Solo, not lonely. Ideas for enjoying your own company, from bookstore wanders to a sketchbook and a café window seat.",
    image: "soloCafe",
    tone: "cream",
    hobbyTags: ["solo"],
  },
  {
    slug: "better-together",
    name: "Better Together",
    short: "Friendship & social plans",
    kicker: "Text the group chat",
    intro:
      "Hobbies that come with people. Craft nights, book clubs, a standing tennis date, and gentle ways to meet new friends as an adult.",
    image: "girlsNight",
    tone: "strawberry",
    hobbyTags: ["social"],
  },
  {
    slug: "creative-corner",
    name: "Creative Corner",
    short: "Arts, crafts & making things",
    kicker: "Being good at it is optional",
    intro:
      "Paint, clay, paper, thread and beads. Hobbies where you end the evening with something you made with your own two hands.",
    image: "junkJournal",
    tone: "butter",
    hobbyTags: ["creative"],
  },
  {
    slug: "movement",
    name: "A Little Movement",
    short: "Outdoor & recreational hobbies",
    kicker: "Fresh air counts",
    intro:
      "Movement for fun, not for a fitness tracker. Tennis, pickleball, hiking, skating and slow outdoor wanders.",
    image: "tennis",
    tone: "matcha",
    hobbyTags: ["active", "outdoors"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
