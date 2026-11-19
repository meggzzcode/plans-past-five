/**
 * Premium digital product kits: PREPARED, NOT FOR SALE.
 *
 * This file only describes the kits for the owner and for a future storefront listing.
 * It is deliberately NOT imported by any public route (src/test/printables.test.ts enforces that),
 * the kit PDFs/zips live in design/kits/<id>/dist (not in public/), and there is no checkout,
 * payment link or chosen payment provider. See docs/buyer/DIGITAL-PRODUCTS.md.
 */
export type KitFile = { file: string; title: string; pages: number };

export type DigitalProduct = {
  id: "hobby-era-kit" | "weekend-edit-kit";
  name: string;
  tagline: string;
  description: string[];
  status: "prepared-not-for-sale";
  files: KitFile[];
  /** Zip to upload to a storefront (never to public/). */
  packagePath: string;
  /** Marketing images; copies of cover/previews are in public/downloads/kit-previews. */
  coverImage: string;
  previewImages: string[];
  termsPath: string;
  /** Needs owner/lawyer review before any sale. */
  termsStatus: "needs-owner-review";
  /** A RECOMMENDATION only. Not a live price; verify fees and comparables first (Cowork). */
  priceRecommendation: {
    isLivePrice: false;
    currency: "USD";
    introLow: number;
    introHigh: number;
    regularLow: number;
    regularHigh: number;
    reasoning: string;
    verifyBeforeUse: string[];
  };
};

const verify = [
  "Current comparable listings for printable bundles of similar size (Cowork research)",
  "Fees of the chosen storefront: percentage, fixed per-order, payout and tax handling (Cowork must verify; not assumed here)",
  "Whether the storefront acts as merchant of record for sales tax / VAT (owner and tax advisor)",
];

export const digitalProducts: DigitalProduct[] = [
  {
    id: "hobby-era-kit",
    name: "The Plans Past Five Hobby Era Kit",
    tagline: "Find your hobby, test it cheaply, budget for it and make it a habit.",
    description: [
      "A 75-page printable kit in nine PDFs for women who want a hobby but aren't sure which one.",
      "Start with the discovery workbook and interest worksheets, test hobbies with a budget planner and a 30-day challenge journal, then keep the habit going with a monthly calendar, creative project planner, reflection journal, 24 activity cards and starter supply checklists for twelve hobbies.",
      "Instant PDF download, US Letter, print as often as you like for yourself. No account, no subscription, no brands or affiliate links inside.",
    ],
    status: "prepared-not-for-sale",
    files: [
      { file: "01-hobby-discovery-workbook.pdf", title: "Hobby Discovery Workbook", pages: 10 },
      { file: "02-interest-worksheets.pdf", title: "Interest Worksheets", pages: 7 },
      { file: "03-hobby-budget-planner.pdf", title: "Hobby Budget Planner", pages: 6 },
      { file: "04-30-day-challenge-journal.pdf", title: "30-Day Challenge Journal", pages: 6 },
      { file: "05-monthly-hobby-calendar.pdf", title: "Monthly Hobby Calendar", pages: 14 },
      { file: "06-creative-project-planner.pdf", title: "Creative Project Planner", pages: 7 },
      { file: "07-reflection-journal.pdf", title: "Reflection Journal", pages: 14 },
      { file: "08-printable-activity-cards.pdf", title: "Printable Activity Cards", pages: 5 },
      { file: "09-starter-supply-checklists.pdf", title: "Starter Supply Checklists", pages: 6 },
    ],
    packagePath: "design/kits/hobby-era-kit/dist/plans-past-five-hobby-era-kit.zip",
    coverImage: "design/kits/hobby-era-kit/previews/cover.png",
    previewImages: [1, 2, 3, 4].map((n) => `design/kits/hobby-era-kit/previews/preview-${n}.png`),
    termsPath: "design/kits/hobby-era-kit/USAGE-TERMS.md",
    termsStatus: "needs-owner-review",
    priceRecommendation: {
      isLivePrice: false,
      currency: "USD",
      introLow: 12,
      introHigh: 19,
      regularLow: 19,
      regularHigh: 27,
      reasoning:
        "Largest bundle (75 pages, nine tools) and the flagship. A low intro price lowers risk for a brand with no reviews yet, while the regular range leaves room once there is proof. Low prices are heavily affected by fixed per-order fees, so avoid going below the point where fees take a large share.",
      verifyBeforeUse: verify,
    },
  },
  {
    id: "weekend-edit-kit",
    name: "The Weekend Edit & Girls' Night Kit",
    tagline: "Plan better weekends, solo dates and nights in with friends.",
    description: [
      "A 55-page printable kit in nine PDFs for planning weekends, solo dates and nights with friends.",
      "Includes an eight-spread weekend planner, 24 solo date cards, 24 girls' night activity cards, a craft night planner, book club planner, hosting checklists, activity budget sheets, seasonal bucket lists and printable planning templates.",
      "Instant PDF download, US Letter, print as often as you like for yourself. No account, no subscription, no brands or affiliate links inside.",
    ],
    status: "prepared-not-for-sale",
    files: [
      { file: "01-weekend-planner.pdf", title: "Weekend Planner", pages: 10 },
      { file: "02-solo-date-cards.pdf", title: "Solo Date Cards", pages: 5 },
      { file: "03-girls-night-activity-cards.pdf", title: "Girls' Night Activity Cards", pages: 5 },
      { file: "04-craft-night-planner.pdf", title: "Craft Night Planner", pages: 5 },
      { file: "05-book-club-planner.pdf", title: "Book Club Planner", pages: 7 },
      { file: "06-hosting-checklists.pdf", title: "Hosting Checklists", pages: 6 },
      { file: "07-activity-budget-sheets.pdf", title: "Activity Budget Sheets", pages: 5 },
      { file: "08-seasonal-bucket-lists.pdf", title: "Seasonal Bucket Lists", pages: 5 },
      { file: "09-planning-templates.pdf", title: "Planning Templates", pages: 7 },
    ],
    packagePath:
      "design/kits/weekend-edit-kit/dist/plans-past-five-weekend-edit-girls-night-kit.zip",
    coverImage: "design/kits/weekend-edit-kit/previews/cover.png",
    previewImages: [1, 2, 3, 4].map(
      (n) => `design/kits/weekend-edit-kit/previews/preview-${n}.png`,
    ),
    termsPath: "design/kits/weekend-edit-kit/USAGE-TERMS.md",
    termsStatus: "needs-owner-review",
    priceRecommendation: {
      isLivePrice: false,
      currency: "USD",
      introLow: 9,
      introHigh: 15,
      regularLow: 15,
      regularHigh: 22,
      reasoning:
        "Smaller (55 pages) and more giftable and seasonal, so a lower intro range than the flagship. A bundle of both kits could be offered at a modest discount once each has sold on its own.",
      verifyBeforeUse: verify,
    },
  },
];
