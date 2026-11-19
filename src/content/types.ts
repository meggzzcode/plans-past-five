import type { ImageKey } from "@/data/images";
import type { CategorySlug } from "@/data/categories";

/** Inline text supports **bold** and [links](/path). */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; image: ImageKey; caption?: string }
  /** A hobby/activity entry. hobby links to data for time/cost/supplies; note is article-specific copy. */
  | { type: "item"; n?: number; title: string; hobby?: string; note: string; time?: string; cost?: string; company?: string; first?: string }
  | { type: "whatYoullNeed"; essentials: string[]; optional?: string[] }
  | { type: "starterKit"; productIds: string[]; title?: string }
  | { type: "shopHobby"; productIds: string[]; title?: string; dek?: string }
  | { type: "saveSplurge"; save: string; splurge: string }
  | { type: "tryThisWeekend"; text: string }
  | { type: "girlsNight"; text: string }
  | { type: "first30"; steps: string[] }
  | { type: "noSpend"; text: string }
  | { type: "makePlan"; text: string }
  | { type: "ifYouLoved"; hobbies: string[] };

export type Article = {
  slug: string;
  title: string;
  titleItalic?: string; // a phrase within title rendered in italic
  dek: string;
  category: CategorySlug;
  status: "published" | "draft";
  publishedAt: string;
  updatedAt?: string;
  hero: ImageKey;
  searchIntent: string;
  angle: string;
  hobbies: string[];
  productIds: string[];
  printable?: string;
  body: Block[];
};
