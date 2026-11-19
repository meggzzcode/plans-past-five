/**
 * The researched product catalog: specific, verified products (as opposed to the
 * product-TYPE recommendations in `products.ts`).
 *
 * Ships EMPTY. Rows arrive from researched CSV via `bun run import:products`
 * (see docs/commerce/SHOPPABLE-ARTICLE-SYSTEM.md). Nothing here renders publicly unless
 * `status === "verified"` AND the record passes `validateCatalogProduct`.
 *
 * Deliberately NOT stored: prices, ratings, review counts, discounts, stock levels. Amazon's
 * listing is the source of truth for those. This file has no imports so scripts can load it.
 */
import { generatedCatalog } from "./catalog.generated";

export type ProductRole =
  | "essential"
  | "researched-pick"
  | "affordable"
  | "complete-kit"
  | "aesthetic-upgrade"
  | "nice-to-have"
  | "later-upgrade";

export const PRODUCT_ROLES: ProductRole[] = [
  "essential",
  "complete-kit",
  "researched-pick",
  "affordable",
  "aesthetic-upgrade",
  "nice-to-have",
  "later-upgrade",
];

export type Availability = "available" | "check-listing" | "unavailable";
export type AffiliateStatus = "not-activated" | "pending" | "active";
export type CatalogStatus = "candidate" | "verified";
export type CatalogImageRights = "none" | "owned" | "licensed" | "retailer-permission";

export type KitSlotRef = { kit: string; slot: string };

export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  /** One neutral factual sentence about what it is. */
  description: string;
  asin: string;
  /** Ordinary link: exactly https://www.amazon.com/dp/<ASIN>. No tracking params, ever. */
  amazonUrl: string;
  /** Reserved. Must stay unset while affiliateStatus is "not-activated" (tags are added by src/config/affiliate.ts). */
  affiliateUrl?: string;
  manufacturerUrl?: string;
  altRetailerUrl?: string;
  specs: { label: string; value: string }[];
  /** Hobby slugs from src/data/hobbies.ts. */
  hobbies: string[];
  /** Article slugs. */
  articles: string[];
  /** /shop collection slugs from src/data/products.ts. */
  collections: string[];
  /** Starter-kit slots this product fills (see src/data/kits.ts). */
  kitSlots: KitSlotRef[];
  role: ProductRole;
  isEssential: boolean;
  audience: string;
  /** Honest, specific reason it was picked. */
  whySelected: string;
  /** Honest downsides. Required to be thought about; may be a short list. */
  limitations: string[];
  /**
   * Short display title for cards ("Mr. Pen floral washi, 21 rolls"). `name` stays the exact listing
   * title so the Amazon page can be matched.
   */
  shortName?: string;
  /** One plain, practical benefit line shown on the card. No prices, ratings or unsupported claims. */
  benefit?: string;
  /** For a product that is an alternative to another pick: one line saying how it differs. */
  compare?: string;
  /** Preferred pick for its kit slot, ahead of the default order. */
  lead?: boolean;
  /** The "If you only buy one thing" pick for its kit / hobby / collection. */
  onlyOne?: boolean;
  /**
   * Editorial hold: facts were verified but the product is not shown (audience fit, redundancy).
   * The text says why. Never a substitute for `status`.
   */
  hold?: string;
  /** Photo. Shown ONLY when imageRights is owned, licensed or retailer-permission and imageCredit is set. */
  imageUrl?: string;
  /** Required with imageUrl: who to credit, e.g. "Photo: Brand press kit". */
  imageCredit?: string;
  imageSource?: string;
  imageRights?: CatalogImageRights;
  /** https pages the facts were checked against. At least one. */
  researchSources: string[];
  /** YYYY-MM-DD the facts and the listing were last checked. */
  lastVerified: string;
  availability: Availability;
  affiliateNetwork?: string;
  affiliateStatus: AffiliateStatus;
  status: CatalogStatus;
};

const ASIN_RE = /^[A-Z0-9]{10}$/;
const PLACEHOLDER_ASIN =
  /^(EXAMPLE|PLACEHOLD|TESTASIN|FAKEASIN|XXXXXXXX|TODO|TBD|B0000000|0000000000)/;
const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const FORBIDDEN_KEY =
  /price|rating|review|stars?$|discount|coupon|deal|countdown|stock|sale|scarcity/i;
/** True for field/column names that would carry prices, ratings, review counts, discounts or stock claims. */
export const isForbiddenField = (name: string) => FORBIDDEN_KEY.test(name);
const TRACKING_PARAM =
  /^(utm_.*|tag|ref|ref_|linkcode|linkid|camp|creative|creativeasin|psc|smid|aff.*|affid|cmpid|gclid|fbclid|ascsubtag)$/i;
const PRICE_TEXT =
  /\$\s?\d|\d\s?%\s?off|limited[- ]time|only \d+ left|best[- ]seller badge|lowest price/i;

export const amazonProductUrl = (asin: string) => `https://www.amazon.com/dp/${asin}`;

export function isValidAsin(asin: unknown): asin is string {
  return typeof asin === "string" && ASIN_RE.test(asin) && !PLACEHOLDER_ASIN.test(asin);
}

const isHttps = (u: unknown): u is string => {
  if (typeof u !== "string") return false;
  try {
    return new URL(u).protocol === "https:";
  } catch {
    return false;
  }
};

const trackingParamsIn = (u: string): string[] => {
  try {
    const url = new URL(u);
    const found = [...url.searchParams.keys()].filter((k) => TRACKING_PARAM.test(k));
    if (/\/ref=/i.test(url.pathname)) found.push("ref");
    return found;
  } catch {
    return [];
  }
};

const str = (v: unknown) => typeof v === "string" && v.trim().length > 0;
const strArr = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

/** Returns precise problems; empty means the record may be displayed (if also verified). */
export function validateCatalogProduct(input: unknown, now: Date = new Date()): string[] {
  const out: string[] = [];
  if (!input || typeof input !== "object") return ["record is not an object"];
  const r = input as Record<string, unknown>;
  const id = typeof r["id"] === "string" ? r["id"] : "(no id)";
  const bad = (m: string) => out.push(`${id}: ${m}`);

  if (typeof r["id"] !== "string" || !ID_RE.test(r["id"])) bad("id must be kebab-case");
  else if (r["id"].startsWith("example-"))
    bad("ids starting with example- are template rows, not products");

  for (const k of ["name", "brand", "category", "description", "audience", "whySelected"])
    if (!str(r[k])) bad(`${k} is required`);

  // ASIN + ordinary Amazon URL
  if (!isValidAsin(r["asin"]))
    bad(
      `invalid or placeholder ASIN "${String(r["asin"] ?? "")}" (need 10 uppercase letters/digits)`,
    );
  if (typeof r["amazonUrl"] !== "string" || !r["amazonUrl"]) bad("amazonUrl is required");
  else {
    const params = trackingParamsIn(r["amazonUrl"]);
    if (params.length)
      bad(`amazonUrl has tracking parameters (${params.join(", ")}); ordinary links only`);
    if (isValidAsin(r["asin"]) && r["amazonUrl"] !== amazonProductUrl(r["asin"]))
      bad(`amazonUrl must equal ${amazonProductUrl(r["asin"])}`);
  }

  if (r["affiliateUrl"] !== undefined && r["affiliateUrl"] !== "") {
    if ((r["affiliateStatus"] ?? "not-activated") === "not-activated")
      bad(
        "affiliateUrl must stay empty while affiliateStatus is not-activated (activate centrally in src/config/affiliate.ts)",
      );
    else if (!isHttps(r["affiliateUrl"])) bad("affiliateUrl must be https");
  }
  for (const k of ["manufacturerUrl", "altRetailerUrl"]) {
    const v = r[k];
    if (v === undefined || v === "") continue;
    if (!isHttps(v)) bad(`${k} must be https`);
    else if (trackingParamsIn(v).length) bad(`${k} has tracking parameters`);
  }

  // Research provenance
  if (!Array.isArray(r["researchSources"]) || r["researchSources"].length === 0)
    bad("researchSources needs at least one https url");
  else
    for (const s of r["researchSources"]) {
      if (!isHttps(s)) bad(`researchSources entry "${String(s)}" must be https`);
      else if (trackingParamsIn(s).length)
        bad(`researchSources entry "${s}" has tracking parameters`);
    }
  if (typeof r["lastVerified"] !== "string" || !r["lastVerified"]) bad("lastVerified is required");
  else if (
    !ISO_DATE.test(r["lastVerified"]) ||
    Number.isNaN(Date.parse(r["lastVerified"])) ||
    new Date(r["lastVerified"]).toISOString().slice(0, 10) !== r["lastVerified"]
  )
    bad("lastVerified must be a real YYYY-MM-DD date");
  else if (Date.parse(r["lastVerified"]) > now.getTime() + 24 * 3600 * 1000)
    bad("lastVerified is in the future");

  // Enumerations
  if (!PRODUCT_ROLES.includes(r["role"] as ProductRole))
    bad(`role must be one of ${PRODUCT_ROLES.join(", ")}`);
  if (!["candidate", "verified"].includes(r["status"] as string))
    bad("status must be candidate or verified");
  if (!["available", "check-listing", "unavailable"].includes(r["availability"] as string))
    bad("availability must be available, check-listing or unavailable");
  if (!["not-activated", "pending", "active"].includes(r["affiliateStatus"] as string))
    bad("affiliateStatus must be not-activated, pending or active");
  if (typeof r["isEssential"] !== "boolean") bad("isEssential must be true or false");
  else if (
    r["isEssential"] &&
    ["aesthetic-upgrade", "nice-to-have", "later-upgrade"].includes(r["role"] as string)
  )
    bad(`isEssential cannot be true for role ${String(r["role"])}`);

  // Arrays
  for (const k of ["hobbies", "articles", "collections", "limitations"])
    if (!strArr(r[k])) bad(`${k} must be a list of strings`);
  if (strArr(r["limitations"]) && r["limitations"].length === 0)
    bad("limitations needs at least one honest note");
  if (
    !Array.isArray(r["specs"]) ||
    !r["specs"].every(
      (s) =>
        s &&
        str((s as Record<string, unknown>)["label"]) &&
        str((s as Record<string, unknown>)["value"]),
    )
  )
    bad("specs must be a list of {label, value}");
  if (
    !Array.isArray(r["kitSlots"]) ||
    !r["kitSlots"].every(
      (s) =>
        s &&
        str((s as Record<string, unknown>)["kit"]) &&
        str((s as Record<string, unknown>)["slot"]),
    )
  )
    bad("kitSlots must be a list of {kit, slot}");

  // Images stay photo-less unless rights are documented
  if (
    r["imageRights"] !== undefined &&
    !["none", "owned", "licensed", "retailer-permission"].includes(r["imageRights"] as string)
  )
    bad("imageRights is not a recognised value");
  if (r["imageRights"] && r["imageRights"] !== "none" && !str(r["imageSource"]))
    bad("imageRights set without imageSource");
  if (r["imageUrl"] !== undefined && r["imageUrl"] !== "") {
    const u = r["imageUrl"];
    if (typeof u !== "string" || (!(u.startsWith("/") && !u.startsWith("//")) && !isHttps(u)))
      bad("imageUrl must be https or a site-relative path");
    else if (/amazon\.com|media-amazon|ssl-images-amazon/i.test(u))
      bad("imageUrl must not point at Amazon images (Associates terms restrict them)");
    if (!r["imageRights"] || r["imageRights"] === "none")
      bad("imageUrl needs documented imageRights (owned, licensed or retailer-permission)");
    if (!str(r["imageCredit"])) bad("imageUrl needs an imageCredit");
    if (!str(r["imageSource"]))
      bad("imageUrl needs an imageSource (where the permission is recorded)");
  } else if (str(r["imageCredit"]) && r["imageUrl"] === undefined) {
    // credit with no photo is harmless, but flag it so it is not forgotten
    bad("imageCredit set without imageUrl");
  }
  for (const k of ["lead", "onlyOne"])
    if (r[k] !== undefined && typeof r[k] !== "boolean") bad(`${k} must be true or false`);
  for (const [k, max] of [
    ["shortName", 70],
    ["benefit", 140],
    ["compare", 140],
  ] as const) {
    const v = r[k];
    if (v === undefined) continue;
    if (!str(v)) bad(`${k} cannot be empty (omit it instead)`);
    else if ((v as string).length > max) bad(`${k} is longer than ${max} characters`);
  }
  if (r["hold"] !== undefined && !str(r["hold"]))
    bad("hold needs a reason (omit it to show the product)");

  // No unsupported commerce claims
  for (const k of Object.keys(r))
    if (FORBIDDEN_KEY.test(k))
      bad(
        `field "${k}" is not allowed (no prices, ratings, review counts, discounts or stock claims)`,
      );
  const text = [
    r["description"],
    r["whySelected"],
    r["audience"],
    r["shortName"],
    r["benefit"],
    r["compare"],
    ...(Array.isArray(r["limitations"]) ? r["limitations"] : []),
    ...(Array.isArray(r["specs"])
      ? r["specs"].flatMap((s) => [(s as Record<string, unknown>)?.["value"]])
      : []),
  ];
  for (const t of text)
    if (typeof t === "string" && PRICE_TEXT.test(t))
      bad(`text mentions a price, discount or scarcity claim: "${t.slice(0, 60)}"`);

  return out;
}

export type KnownRefs = {
  hobbies: string[];
  collections: string[];
  kits: Record<string, string[]>;
  articles?: string[];
};

/** Cross-reference checks (slugs and kit slots exist). Kept separate so this file stays import-free. */
export function catalogReferenceProblems(list: CatalogProduct[], known: KnownRefs): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const asins = new Map<string, string>();
  for (const p of list) {
    if (seen.has(p.id)) out.push(`${p.id}: duplicate id`);
    seen.add(p.id);
    const prev = asins.get(p.asin);
    if (prev) out.push(`${p.id}: same ASIN as ${prev}`);
    asins.set(p.asin, p.id);
    for (const h of p.hobbies)
      if (!known.hobbies.includes(h)) out.push(`${p.id}: unknown hobby "${h}"`);
    for (const c of p.collections)
      if (!known.collections.includes(c)) out.push(`${p.id}: unknown collection "${c}"`);
    if (known.articles)
      for (const a of p.articles)
        if (!known.articles.includes(a)) out.push(`${p.id}: unknown article "${a}"`);
    for (const s of p.kitSlots) {
      const slots = known.kits[s.kit];
      if (!slots) out.push(`${p.id}: unknown kit "${s.kit}"`);
      else if (!slots.includes(s.slot)) out.push(`${p.id}: kit "${s.kit}" has no slot "${s.slot}"`);
    }
  }
  return out;
}

/** Only verified, valid, still-available records that are not on editorial hold. Everything else stays invisible. */
export function filterVerified(list: CatalogProduct[], now: Date = new Date()): CatalogProduct[] {
  return list.filter(
    (p) =>
      p.status === "verified" &&
      !p.hold &&
      p.availability !== "unavailable" &&
      validateCatalogProduct(p, now).length === 0,
  );
}

/** All records, including candidates. Never render these directly. */
export const catalog: CatalogProduct[] = [...generatedCatalog];

/** The ONLY list public pages may use. */
export const verifiedCatalog: CatalogProduct[] = filterVerified(catalog);

export const getCatalogProduct = (id: string, list: CatalogProduct[] = verifiedCatalog) =>
  list.find((p) => p.id === id);

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
