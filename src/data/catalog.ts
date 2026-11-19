/**
 * The researched product catalog: specific, verified products.
 *
 * The ONE source is content/products/*.json (one file per product, edited in Pages CMS).
 * `node scripts/build-content.mjs` validates it and writes src/data/catalog.generated.ts, which holds
 * ONLY the products that are shown (verified, not held, not discontinued) plus the replacement map.
 * Candidates, held products and internal notes are never shipped to the browser.
 * The rules live in ./catalog-rules (no imports, so the build script can load them with plain node).
 */
import { generatedCatalog, productRedirects } from "./catalog.generated";
import {
  PRODUCT_ROLES,
  filterVerified,
  type CatalogProduct,
  type KitSlotRef,
  type ProductRole,
} from "./catalog-rules";

export * from "./catalog-rules";

/** Retired product id -> the id that replaces it (followed, so old references and saved lists keep working). */
export const redirects: Record<string, string> = { ...productRedirects };

/** Follow replacements from an id to a live product id. Undefined if it dead-ends or loops. */
export function resolveLiveId(
  id: string,
  list: CatalogProduct[] = verifiedCatalog,
  map: Record<string, string> = redirects,
): string | undefined {
  const seen = new Set<string>();
  let cur: string | undefined = id;
  while (cur && !seen.has(cur)) {
    if (list.some((p) => p.id === cur)) return cur;
    seen.add(cur);
    cur = map[cur];
  }
  return undefined;
}

/** Every record the site ships. Already limited to shown products (see header). */
export const catalog: CatalogProduct[] = [...generatedCatalog];

/** The ONLY list public pages may use. */
export const verifiedCatalog: CatalogProduct[] = filterVerified(catalog);

export const getCatalogProduct = (
  id: string,
  list: CatalogProduct[] = verifiedCatalog,
  map: Record<string, string> = redirects,
) => {
  const direct = list.find((p) => p.id === id);
  if (direct) return direct;
  const live = resolveLiveId(id, list, map);
  return live ? list.find((p) => p.id === live) : undefined;
};

export type ProductContext = {
  hobby?: string;
  hobbies?: string[];
  article?: string;
  collection?: string;
};

export type Selection = {
  /** Essentials, with one primary product per kit slot. */
  essentials: CatalogProduct[];
  /** Non-essential products that are not alternatives for another product's slot. */
  optional: CatalogProduct[];
  /** Products that fill a kit slot another product in the selection already fills as the primary (at most MAX_ALTERNATIVES per slot). */
  alternatives: CatalogProduct[];
  /** primary product id -> its (at most two) alternatives, in display order. */
  alternativesOf: Record<string, CatalogProduct[]>;
  /** "If you only buy one thing": one essential (or complete kit) for the whole selection, if any. */
  pick: CatalogProduct | undefined;
  /** Everything that is displayed (essentials, optional and the capped alternatives). */
  all: CatalogProduct[];
};

/** Alternatives shown per slot. More than this is a decision handed back to a tired reader. */
export const MAX_ALTERNATIVES = 2;

const roleRank = (r: ProductRole) => PRODUCT_ROLES.indexOf(r);

const slotKey = (s: KitSlotRef) => `${s.kit}:${s.slot}`;

/**
 * The primary among products that fill one slot: a `lead` product, else the "researched-pick", else
 * the first in list order. A slot that has an essential filler keeps an essential as its primary, so
 * a nice-to-have is never promoted over an essential.
 */
export function choosePrimary(ps: CatalogProduct[], list: CatalogProduct[]): CatalogProduct {
  const order = (p: CatalogProduct) => list.findIndex((x) => x.id === p.id);
  const sorted = [...ps].sort((a, b) => order(a) - order(b));
  const pool = sorted.some((p) => p.isEssential) ? sorted.filter((p) => p.isEssential) : sorted;
  return pool.find((p) => p.lead) ?? pool.find((p) => p.role === "researched-pick") ?? pool[0]!;
}

/**
 * Where several products fill the same kit slot (three mahjong sets, two card sizes), one is the
 * primary for that slot (see `choosePrimary`). A product is an alternative when it has kit slots and
 * is not the primary of any of them. Products with no kit slot are never alternatives.
 */
export function alternativeIds(picked: CatalogProduct[], list: CatalogProduct[]): Set<string> {
  return new Set(Object.keys(alternativePrimaries(picked, list)));
}

/** alternative id -> primary id of the (first) slot it is an alternative for. */
function alternativePrimaries(
  picked: CatalogProduct[],
  list: CatalogProduct[],
): Record<string, string> {
  const groups = new Map<string, CatalogProduct[]>();
  for (const p of picked)
    for (const s of p.kitSlots) groups.set(slotKey(s), [...(groups.get(slotKey(s)) ?? []), p]);
  const primary = new Map<string, string>();
  for (const [k, ps] of groups) primary.set(k, choosePrimary(ps, list).id);
  const out: Record<string, string> = {};
  for (const p of picked) {
    if (p.kitSlots.length === 0 || p.kitSlots.some((s) => primary.get(slotKey(s)) === p.id))
      continue;
    out[p.id] = primary.get(slotKey(p.kitSlots[0]!))!;
  }
  return out;
}

/**
 * The single "If you only buy one thing" product: one flagged `onlyOne`, else the first essential
 * complete kit, else the first essential. Undefined when there is nothing essential to point at.
 */
export function onlyOnePick(essentials: CatalogProduct[]): CatalogProduct | undefined {
  return (
    essentials.find((p) => p.onlyOne) ??
    essentials.find((p) => p.role === "complete-kit") ??
    essentials[0]
  );
}

/**
 * Products for an article / hobby / collection. Priority: tagged for the article, then matching
 * hobbies, then in the collection. De-duplicated by id and by ASIN. Essentials and optional are separate.
 */
export function selectProducts(
  ctx: ProductContext,
  list: CatalogProduct[] = verifiedCatalog,
): Selection {
  const hobbies = [...(ctx.hobbies ?? []), ...(ctx.hobby ? [ctx.hobby] : [])];
  const picked: CatalogProduct[] = [];
  const ids = new Set<string>();
  const asins = new Set<string>();
  const add = (p: CatalogProduct) => {
    if (ids.has(p.id) || asins.has(p.asin)) return;
    ids.add(p.id);
    asins.add(p.asin);
    picked.push(p);
  };
  if (ctx.article) list.filter((p) => p.articles.includes(ctx.article!)).forEach(add);
  if (hobbies.length) list.filter((p) => p.hobbies.some((h) => hobbies.includes(h))).forEach(add);
  if (ctx.collection) list.filter((p) => p.collections.includes(ctx.collection!)).forEach(add);
  const sorted = [...picked].sort((a, b) => roleRank(a.role) - roleRank(b.role));
  const altOf = alternativePrimaries(picked, list);
  const shownAlt: CatalogProduct[] = [];
  const alternativesOf: Record<string, CatalogProduct[]> = {};
  for (const p of sorted) {
    const primary = altOf[p.id];
    if (!primary) continue;
    const mine = (alternativesOf[primary] ??= []);
    if (mine.length >= MAX_ALTERNATIVES) continue;
    mine.push(p);
    shownAlt.push(p);
  }
  const essentials = sorted.filter((p) => p.isEssential && !altOf[p.id]);
  const optional = sorted.filter((p) => !p.isEssential && !altOf[p.id]);
  return {
    essentials,
    optional,
    alternatives: shownAlt,
    alternativesOf,
    pick: onlyOnePick(essentials),
    all: [...essentials, ...optional, ...shownAlt],
  };
}

/** A photo is displayed only when rights are recorded, a credit is set and the record is valid. */
export function photoFor(
  p: Pick<CatalogProduct, "imageUrl" | "imageRights" | "imageCredit">,
): { src: string; credit: string } | null {
  if (!p.imageUrl || !p.imageCredit) return null;
  if (!p.imageRights || p.imageRights === "none") return null;
  return { src: p.imageUrl, credit: p.imageCredit };
}

/** The shape `resolveProductLink` expects. The exact URL is the ordinary ASIN page; the registry adds tags later. */
export const linkableFor = (p: CatalogProduct) => ({ amazonQuery: p.name, exactUrl: p.amazonUrl });
