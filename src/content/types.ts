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
  | {
      type: "item";
      n?: number;
      title: string;
      hobby?: string | undefined;
      note: string;
      time?: string | undefined;
      cost?: string | undefined;
      company?: string | undefined;
      first?: string | undefined;
    }
  | { type: "whatYoullNeed"; essentials: string[]; optional?: string[] }
  | { type: "starterKit"; hobbies: string[]; title?: string }
  | { type: "shopHobby"; hobbies: string[]; title?: string; dek?: string }
  /** Verified catalog products for this article/hobbies/collection. Renders nothing until the catalog has verified products. */
  | {
      type: "shopTheArticle";
      articleSlug?: string;
      hobbies?: string[];
      collection?: string;
      title?: string;
      dek?: string;
    }
  /** Reusable shopping checklist for one hobby (verified catalog only). */
  | { type: "shopMyHobby"; hobby: string; title?: string; dek?: string }
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
  /** Sources a reader or editor can check. Filled when claims are verified. */
  sources?: { title: string; url: string; note?: string }[];
  /** Date (YYYY-MM-DD) all coworkChecks were verified against sources. Publish only after this is set. */
  verifiedAt?: string;
  /** Specific factual claims that still need a source check (costs, rules, safety, availability). */
  coworkChecks?: string[];
  /** Related articles by slug, in addition to computed related reading. */
  related?: string[];
  body: Block[];
};
