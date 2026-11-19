import { getHobby, type Hobby } from "@/data/hobbies";
import { getCollection } from "@/data/products";
import { collectionSearchTerms, type SearchTerm } from "@/data/search-terms";
import { kitHobbies, kits } from "@/data/kits";
import { articles, type Article } from "@/content";

export type CollectionGuide = {
  /** Generic search terms for the collection (kinds of product, not named picks). */
  products: SearchTerm[];
  hobbies: Hobby[];
  /** What you need to start, from the supported hobbies' own supply lists. */
  essentials: string[];
  /** Nice-to-have upgrades, from the same hobbies. */
  upgrades: string[];
  articles: Article[];
  kitIds: string[];
  whoFor: string;
};

const uniq = (xs: string[]) => [...new Set(xs.map((x) => x.trim()).filter(Boolean))];
const list = (xs: string[]) =>
  xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

/** Everything on a collection page beyond its own copy, generated from existing records only. */
export function collectionGuide(slug: string): CollectionGuide {
  const products = collectionSearchTerms(slug, getCollection(slug)?.extraSearchTermIds ?? []);
  const count = new Map<string, number>();
  for (const p of products)
    for (const s of p.hobbies) if (getHobby(s)) count.set(s, (count.get(s) ?? 0) + 1);
  const hobbySlugs = [...count.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s);
  const hobbies = hobbySlugs.slice(0, 6).map((s) => getHobby(s)!);
  const top = hobbies.slice(0, 4);
  const sliceSet = new Set(hobbySlugs);
  const names = top.map((h) => h.name.toLowerCase());
  return {
    products,
    hobbies,
    essentials: uniq(top.flatMap((h) => h.supplies)).slice(0, 8),
    upgrades: uniq(top.flatMap((h) => h.optional)).slice(0, 8),
    articles: articles.filter((a) => a.hobbies.some((h) => sliceSet.has(h))).slice(0, 3),
    kitIds: kits
      .filter((k) => kitHobbies(k).some((h) => sliceSet.has(h)))
      .map((k) => k.id)
      .slice(0, 2),
    whoFor: names.length
      ? `Anyone curious about ${list(names)} who wants to start small. No experience is assumed, and being good at it is optional.`
      : "Anyone who wants to start a new hobby small, with no experience assumed.",
  };
}
