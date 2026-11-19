export type Printable = {
  slug: string;
  name: string;
  dek: string;
  description: string;
  /** Human label, e.g. "8 pages · US Letter". */
  pages: string;
  pageCount: number;
  tone: "butter" | "strawberry" | "matcha" | "sunday";
  /** Public path of the real PDF (rendered by scripts/build-printables.mjs). */
  pdf: string;
  /** Public paths of preview PNGs (first is the cover). */
  previews: string[];
  includes: string[];
  howToUse: string[];
};

const dl = (slug: string) => ({
  pdf: `/downloads/${slug}.pdf`,
  previews: [
    `/downloads/${slug}-preview.png`,
    `/downloads/${slug}-preview-2.png`,
    `/downloads/${slug}-preview-3.png`,
  ],
});

/**
 * The six free downloads. Every entry must have a PDF and previews in public/downloads
 * (enforced by src/test/printables.test.ts). Sources: design/printables/*.html.
 * Slugs of the first three are kept from the original web printables so existing links still work.
 */
export const printables: Printable[] = [
  {
    slug: "hobby-era-tracker",
    name: "Find Your Hobby Workbook",
    dek: "From “I should have a hobby” to “this is my thing”",
    description:
      "An eight-page workbook that walks you from free-time reality check to a shortlist of hobbies to try, with the original Hobby Era Tracker and a decision page at the end.",
    pages: "8 pages · US Letter",
    pageCount: 8,
    tone: "matcha",
    ...dl("hobby-era-tracker"),
    includes: [
      "Free-time reality check",
      "What you're craving",
      "A 36-idea hobby menu",
      "Shortlist of three trials",
      "The Hobby Era Tracker",
      "Decision day",
    ],
    howToUse: [
      "Print all eight pages",
      "Do one page a night, or all in an afternoon",
      "Write in pencil and rate how it felt, not how good you were",
    ],
  },
  {
    slug: "out-of-office-bucket-list",
    name: "30-Day Hobby Challenge",
    dek: "Thirty small prompts, fifteen minutes at a time",
    description:
      "A month of daily prompts to start something new and see if it sticks, with rest days built in, a finish-line page and the 50-item Out-of-Office Bucket List as a bonus.",
    pages: "6 pages · US Letter",
    pageCount: 6,
    tone: "strawberry",
    ...dl("out-of-office-bucket-list"),
    includes: [
      "How it works",
      "30 daily prompts across four weeks",
      "Finish-line reflection",
      "The Out-of-Office Bucket List (50 ideas)",
    ],
    howToUse: [
      "Pick one hobby or a sampler",
      "Set a 15-minute daily slot",
      "Tick each day off; missing one is fine",
    ],
  },
  {
    slug: "weekend-edit-planner",
    name: "Weekend Adventure Planner",
    dek: "Give Saturday (and Sunday) a storyline",
    description:
      "A one-page weekend plan, an adventure picker sorted by time and energy, a details and packing page with a mini budget, and a memory page.",
    pages: "5 pages · US Letter",
    pageCount: 5,
    tone: "butter",
    ...dl("weekend-edit-planner"),
    includes: [
      "The weekend plan",
      "Adventure picker",
      "Details, packing and budget",
      "Memory page and four-weekend tracker",
    ],
    howToUse: [
      "Spend ten minutes on Thursday evening",
      "Pick one anchor plan per day",
      "Fill in the memory page on Sunday night",
    ],
  },
  {
    slug: "solo-date-idea-cards",
    name: "Solo Date Idea Cards",
    dek: "Eighteen dates with yourself, cut out and shuffled",
    description:
      "Eighteen cut-out cards across table-for-one, creative, after-hours and weekend dates, plus a page of blank cards for your own ideas.",
    pages: "6 pages · US Letter",
    pageCount: 6,
    tone: "strawberry",
    ...dl("solo-date-idea-cards"),
    includes: ["How to use the cards", "18 date cards", "6 blank cards"],
    howToUse: [
      "Print pages 3 to 6",
      "Cut along the dashed lines",
      "Pull one from a jar and put it in the calendar",
    ],
  },
  {
    slug: "creative-hobby-starter-checklist",
    name: "Creative Hobby Starter Checklist",
    dek: "What you actually need to begin, and what can wait",
    description:
      "Starter lists for eight creative hobbies split into what you probably own, what to start with and what to buy later, plus before-you-buy rules and a spend tracker.",
    pages: "5 pages · US Letter",
    pageCount: 5,
    tone: "butter",
    ...dl("creative-hobby-starter-checklist"),
    includes: ["Before-you-buy rules", "Eight starter lists", "Your own list and spend tracker"],
    howToUse: [
      "Tick what you already have",
      "Buy only the start-with list",
      "Wait a week before anything on the wishlist",
    ],
  },
  {
    slug: "girls-night-hosting-planner",
    name: "Girls' Night Hosting Planner",
    dek: "Host a night you get to enjoy too",
    description:
      "Plan on a page, a guest list with RSVPs, menu and budget, a run of show and twelve easy theme ideas.",
    pages: "6 pages · US Letter",
    pageCount: 6,
    tone: "sunday",
    ...dl("girls-night-hosting-planner"),
    includes: [
      "The night on a page",
      "Guest list and RSVPs",
      "Menu, supplies and budget",
      "Run of show",
      "Twelve easy themes",
    ],
    howToUse: [
      "Fill in page 2 first",
      "Work through the timeline the week before",
      "Do one thing really well and keep the rest simple",
    ],
  },
];

export const getPrintable = (slug: string) => printables.find((p) => p.slug === slug);
