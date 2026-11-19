/**
 * Pure rules for the product source (content/products/*.json): types, validation, reference checks
 * and replacement resolution. NO imports on purpose: scripts/build-content.mjs loads this file
 * directly with plain node (type stripping, Node 22.18 or newer), and the site imports it through
 * src/data/catalog.ts. Keep it free of enums, decorators and path aliases.
 *
 * Deliberately NOT stored: prices, ratings, review counts, discounts, stock levels. Amazon's
 * listing is the source of truth for those.
 */

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

/**
 * How a product reaches a reader.
 * - amazon-affiliate-ready: an exact Amazon listing. We store ONLY the ASIN and the ordinary
 *   https://www.amazon.com/dp/ASIN address. The tracking ID is added centrally at render time
 *   (src/config/affiliate.ts) and is never stored in a product or article file.
 * - editorial-pick: recommended on merit although it is not (or not best) on Amazon. Links to the
 *   maker's or retailer's own https page, unmonetised, with no Amazon fields needed.
 */
export type LinkType = "amazon-affiliate-ready" | "editorial-pick";
export const LINK_TYPES: LinkType[] = ["amazon-affiliate-ready", "editorial-pick"];

export type KitSlotRef = { kit: string; slot: string };

export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  /** One neutral factual sentence about what it is. */
  description: string;
  /** Amazon product number. Empty for an editorial pick that is not sold on Amazon. */
  asin: string;
  /** Ordinary link: exactly https://www.amazon.com/dp/<ASIN>. No tracking params, ever. */
  amazonUrl: string;
  /** Defaults to amazon-affiliate-ready when absent. */
  linkType?: LinkType;
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

  // How the reader is sent to the product (see LinkType)
  const linkType = r["linkType"] ?? "amazon-affiliate-ready";
  if (!LINK_TYPES.includes(linkType as LinkType))
    bad(`linkType must be one of ${LINK_TYPES.join(", ")}`);
  if (linkType === "editorial-pick") {
    const dest = [r["altRetailerUrl"], r["manufacturerUrl"]].find((u) => str(u));
    if (!dest)
      bad(
        "an editorial pick needs a maker or retailer web address (altRetailerUrl or manufacturerUrl)",
      );
    else if (
      /(^|\.)(amazon\.[a-z.]+|amzn\.to|a\.co)(\/|$)/i.test(new URL(String(dest)).hostname + "/")
    )
      bad(
        "an editorial pick must link to a non-Amazon page; use amazon-affiliate-ready for Amazon",
      );
    if (str(r["asin"]) && !isValidAsin(r["asin"])) bad(`invalid ASIN "${String(r["asin"])}"`);
  } else {
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
  }

  // The affiliate tag is never stored: links are built centrally from the ASIN plus the one site-wide tracking ID.
  if (r["affiliateUrl"] !== undefined && r["affiliateUrl"] !== "")
    bad(
      "affiliateUrl is not allowed. Never store an affiliate link: the site builds it from the ASIN and the one tracking ID in the site settings",
    );
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
    if (p.asin) {
      const prev = asins.get(p.asin);
      if (prev) out.push(`${p.id}: same ASIN as ${prev}`);
      asins.set(p.asin, p.id);
    }
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

// ---------------------------------------------------------------------------------------------
// The product SOURCE: one JSON file per product in content/products/, edited in Pages CMS.
// ---------------------------------------------------------------------------------------------

/**
 * What the owner chooses in the CMS.
 * - candidate: researched but not yet approved. Never shown.
 * - verified: approved and shown ("live").
 * - held: approved but deliberately not shown right now (statusReason says why).
 * - discontinued: no longer sold or no longer recommended (statusReason says why; replacedBy says what to show instead).
 */
export type ProductStatus = "candidate" | "verified" | "held" | "discontinued";
export const PRODUCT_STATUSES: ProductStatus[] = ["candidate", "verified", "held", "discontinued"];

/** A product file as stored in content/products. Same facts as CatalogProduct; lifecycle is one field plus a reason. */
export type ProductSource = Omit<CatalogProduct, "status" | "hold" | "asin" | "amazonUrl"> & {
  asin?: string;
  amazonUrl?: string;
  status: ProductStatus;
  /** Plain-English reason for held / discontinued. Internal: written for the owner, never shipped to the site. */
  statusReason?: string;
  /** Stable id of the product that takes over from this one. Every reference to this id then shows the successor. */
  replacedBy?: string;
  /** Display order, lower first. Decides ties (which product leads a kit slot) and card order. Optional. */
  order?: number;
};

/** The runtime record the site uses (status verified/candidate + hold + availability), built from a source file. */
export function toCatalogProduct(s: ProductSource): CatalogProduct {
  const { statusReason, replacedBy, order, status, ...rest } = s;
  void replacedBy;
  void order;
  const base = {
    ...rest,
    asin: rest.asin ?? "",
    amazonUrl: rest.amazonUrl ?? "",
  } as Omit<CatalogProduct, "status" | "hold">;
  if (status === "held") return { ...base, status: "verified", hold: statusReason ?? "held" };
  if (status === "discontinued")
    return { ...base, status: "verified", availability: "unavailable" };
  return { ...base, status };
}

/** Is this product shown on the site? */
export const isLiveSource = (s: ProductSource, now: Date = new Date()) =>
  filterVerified([toCatalogProduct(s)], now).length === 1;

const INTERNAL_NOTE =
  /\b(?:manufacturer|maker) page (?:not yet checked|not found|was not|could not)|\bread (?:in browser|20\d\d)|\bcowork\b|\bTODO\b|\bto confirm\b/i;
const FALLBACK_LIMITATION = "Check the listing for the current version and details before you buy.";

/** What ships to the browser: internal process notes are dropped; consumer-relevant limitations stay. */
export function publicProduct(p: CatalogProduct): CatalogProduct {
  const kept = p.limitations.filter((l) => !INTERNAL_NOTE.test(l));
  return { ...p, limitations: kept.length ? kept : [FALLBACK_LIMITATION] };
}

const idOk = (v: unknown): v is string => typeof v === "string" && ID_RE.test(v);

/** Plain-English problems with one product file. `file` is the path shown to the owner. */
export function productFileProblems(file: string, raw: unknown, now: Date = new Date()): string[] {
  if (!raw || typeof raw !== "object")
    return [`${file}: the file is empty or not a product record`];
  const r = raw as Record<string, unknown>;
  const out: string[] = [];
  const stem = file.replace(/^.*\//, "").replace(/\.json$/, "");
  if (r["id"] !== stem)
    out.push(
      `${file}, field "id": must be exactly "${stem}", the same as the file name. A product's id never changes; to replace a product, add a new product and set "Replaced by" on the old one.`,
    );
  if (!PRODUCT_STATUSES.includes(r["status"] as ProductStatus))
    out.push(`${file}, field "status": must be one of ${PRODUCT_STATUSES.join(", ")}`);
  const status = r["status"] as ProductStatus;
  if ((status === "held" || status === "discontinued") && !str(r["statusReason"]))
    out.push(`${file}, field "statusReason": say in one sentence why this product is ${status}`);
  if (r["order"] !== undefined && !(Number.isInteger(r["order"]) && (r["order"] as number) >= 0))
    out.push(`${file}, field "order": must be a whole number, 0 or more`);
  if (r["replacedBy"] !== undefined) {
    if (!idOk(r["replacedBy"]))
      out.push(
        `${file}, field "replacedBy": must be the id of another product (lowercase words joined by hyphens)`,
      );
    else if (r["replacedBy"] === r["id"])
      out.push(`${file}, field "replacedBy": a product cannot replace itself`);
    if (status === "verified" || status === "candidate")
      out.push(
        `${file}, field "replacedBy": only held or discontinued products can be replaced. Change "status" first, or clear "replacedBy".`,
      );
  }
  if (PRODUCT_STATUSES.includes(status)) {
    // The runtime shape must be valid whatever the status, so a held product can be restored safely.
    for (const m of validateCatalogProduct(toCatalogProduct(r as unknown as ProductSource), now))
      out.push(`${file}: ${m.replace(/^[^:]*: /, "")}`);
  }
  return out;
}

export type Resolution = { ok: true; id: string; via: string[] } | { ok: false; problem: string };

/**
 * Follow `replacedBy` from `id` until a live product. Fails (never guesses) on an unknown id, a cycle,
 * or a chain that ends at a product that is not shown.
 */
export function resolveProductId(
  id: string,
  sources: ReadonlyMap<string, ProductSource>,
  now: Date = new Date(),
): Resolution {
  const path: string[] = [];
  let cur = id;
  for (;;) {
    const s = sources.get(cur);
    if (!s)
      return {
        ok: false,
        problem:
          path.length === 0
            ? `there is no product with the id "${id}"`
            : `"${path[path.length - 1]}" is replaced by "${cur}", but there is no product with that id`,
      };
    if (path.includes(cur))
      return {
        ok: false,
        problem: `the replacements go in a circle (${[...path, cur].join(" -> ")})`,
      };
    path.push(cur);
    if (isLiveSource(s, now)) return { ok: true, id: cur, via: path.slice(0, -1) };
    if (!s.replacedBy)
      return {
        ok: false,
        problem: `"${cur}" is ${s.status === "candidate" ? "only a candidate" : s.status} and has no replacement (set "Replaced by" on it, or remove the reference)`,
      };
    cur = s.replacedBy;
  }
}

/** Problems across the whole product set: duplicates, broken or circular replacements, bad cross references. */
export function productSetProblems(
  sources: ProductSource[],
  known?: KnownRefs,
  now: Date = new Date(),
): string[] {
  const out: string[] = [];
  const byId = new Map<string, ProductSource>();
  for (const s of sources) {
    if (byId.has(s.id)) out.push(`the product id "${s.id}" is used by more than one product file`);
    byId.set(s.id, s);
  }
  for (const s of sources) {
    if (s.replacedBy) {
      const r = resolveProductId(s.id, byId, now);
      if (!r.ok) out.push(`content/products/${s.id}.json, field "replacedBy": ${r.problem}`);
    }
  }
  const list = sources.map(toCatalogProduct);
  const refs = catalogReferenceProblems(list, known ?? { hobbies: [], collections: [], kits: {} });
  for (const m of refs) {
    if (/duplicate id/.test(m)) continue; // reported above, once
    if (!known && /unknown (hobby|collection|kit)|has no slot/.test(m)) continue;
    const id = m.split(":")[0];
    out.push(`content/products/${id}.json: ${m.slice(String(id).length + 1).trim()}`);
  }
  return out;
}
