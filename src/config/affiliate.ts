/**
 * Central affiliate registry. THE ONLY place affiliate/retailer links are built.
 *
 * Everything is empty and unmonetized by default: no tracking ids, no approvals,
 * nothing active. A buyer monetizes by editing the entries below (see
 * docs/buyer/AFFILIATE-ACTIVATION.md). No affiliate URL is ever invented: a link
 * only becomes an affiliate link when an entry is active, approved and has a tracking id.
 *
 * Resolution order for any product link (see `resolveProductLink`):
 *   1. active + approved affiliate entry with a tracking id that matches the destination
 *   2. ordinary retailer URL (`retailerUrl` / `exactUrl`, only if the product record has one)
 *   3. plain Amazon search link built from `amazonQuery`
 * (If no verified retailer URL exists, an active Amazon entry tags the search link.)
 */

export type ApprovalStatus = "not-applied" | "applied" | "approved" | "declined";

export type AffiliateEntry = {
  /** Stable key, e.g. "amazon". */
  id: string;
  network: string;
  retailer: string;
  /** The advertiser/merchant name as shown in the network dashboard. */
  advertiser: string;
  /** Hostnames (no scheme) this entry applies to, e.g. ["amazon.com", "www.amazon.com"]. */
  retailerHosts: string[];
  /** The buyer's own tracking id for THIS website. Empty by default. */
  websiteTrackingId: string;
  /**
   * Deep-link template from the buyer's own network dashboard, or null.
   * Placeholders: {tag} tracking id, {url} destination, {urlEncoded} URL-encoded destination.
   * Must start with https://. Amazon does not use a template (it uses the `tag` parameter).
   */
  affiliateUrlTemplate: string | null;
  /** Ordinary (non-affiliate) base URL of the retailer. */
  ordinaryRetailerUrl: string;
  approvalStatus: ApprovalStatus;
  /** Master switch. Even with an id, an inactive entry is ignored. */
  active: boolean;
  /** ISO date (YYYY-MM-DD) the owner last confirmed the account/approval, or null. */
  lastVerified: string | null;
  /** Promotion methods the program approved for this site (e.g. "website content"), as listed by the program. */
  approvedPromotionMethods: string[];
  /** Whose account this is. Accounts are never transferred with the site. */
  accountOwnershipNote: string;
};

const NOT_TRANSFERABLE =
  "Not included with the site. The buyer must apply with their own account and get their own approval.";

const blank = (
  id: string,
  network: string,
  retailer: string,
  hosts: string[],
  ordinaryRetailerUrl: string,
): AffiliateEntry => ({
  id,
  network,
  retailer,
  advertiser: retailer,
  retailerHosts: hosts,
  websiteTrackingId: "",
  affiliateUrlTemplate: null,
  ordinaryRetailerUrl,
  approvalStatus: "not-applied",
  active: false,
  lastVerified: null,
  approvedPromotionMethods: [],
  accountOwnershipNote: NOT_TRANSFERABLE,
});

/**
 * Registry. Add entries for other networks by copying the Amazon entry shape.
 * Only `amazon` ships; add others after approval (do not pre-fill templates).
 */
export const affiliateRegistry: Record<string, AffiliateEntry> = {
  amazon: blank(
    "amazon",
    "Amazon Associates",
    "Amazon",
    ["amazon.com", "www.amazon.com"],
    "https://www.amazon.com",
  ),
};

/**
 * Required Amazon Associates identification sentence, shown whenever the Amazon entry is live.
 * Verified wording: Associates Program Operating Agreement, section 5 "Identifying Yourself as an
 * Associate", https://affiliate-program.amazon.com/help/operating/agreement (read 2026-11-18,
 * recorded in docs/commerce/AMAZON-DISCLOSURE.md). First person singular, as Amazon states it.
 * Re-check against the current Agreement before going live.
 */
export const AMAZON_ASSOCIATE_STATEMENT =
  "As an Amazon Associate I earn from qualifying purchases.";

/**
 * Longer program-participation sentence used on the disclosure page.
 * NOT prescribed by Amazon in the pages Cowork read (docs/commerce/AMAZON-DISCLOSURE.md, 2026-11-18),
 * so it stays unverified wording: keep it consistent and do not claim approval until Amazon has given
 * final acceptance. Used only when the Amazon entry is live.
 */
export const AMAZON_PROGRAM_STATEMENT =
  "is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.";

/**
 * Back-compat settings object. `associatesTag` reads/writes the Amazon entry's
 * `websiteTrackingId`. Setting the tag alone does NOT monetize: the entry must also be
 * `approved` and `active` (see the activation guide).
 */
export const affiliate = {
  get associatesTag() {
    return affiliateRegistry["amazon"]?.websiteTrackingId ?? "";
  },
  set associatesTag(v: string) {
    const e = affiliateRegistry["amazon"];
    if (e) e.websiteTrackingId = v;
  },
  marketplace: "https://www.amazon.com",
};

/** True when an entry may be used to build affiliate links. */
export function isEntryLive(e: AffiliateEntry | undefined): e is AffiliateEntry {
  if (!e) return false;
  if (!e.active || e.approvalStatus !== "approved") return false;
  if (e.websiteTrackingId.trim().length === 0) return false;
  if (e.id === "amazon") return true;
  return (
    typeof e.affiliateUrlTemplate === "string" && e.affiliateUrlTemplate.startsWith("https://")
  );
}

export const liveEntries = (): AffiliateEntry[] =>
  Object.values(affiliateRegistry).filter(isEntryLive);

const amazonLive = () => isEntryLive(affiliateRegistry["amazon"]);

/** True if any affiliate entry is live (drives rel=sponsored and disclosure wording). */
export const isMonetized = () => liveEntries().length > 0;

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
};

const entryForHost = (host: string): AffiliateEntry | undefined =>
  Object.values(affiliateRegistry).find((e) =>
    e.retailerHosts.some((h) => host === h || host.endsWith(`.${h}`)),
  );

/** Plain Amazon search link; tagged only when the Amazon entry is live. */
export function amazonSearchUrl(query: string) {
  const u = new URL("/s", affiliate.marketplace);
  u.searchParams.set("k", query);
  if (amazonLive()) u.searchParams.set("tag", affiliate.associatesTag.trim());
  return u.toString();
}

function applyTemplate(e: AffiliateEntry, url: string): string | null {
  const t = e.affiliateUrlTemplate;
  if (!t) return null;
  return t
    .split("{tag}")
    .join(e.websiteTrackingId.trim())
    .split("{urlEncoded}")
    .join(encodeURIComponent(url))
    .split("{url}")
    .join(url);
}

export type LinkKind = "affiliate" | "retailer" | "search";

export type ResolvedLink = {
  href: string;
  kind: LinkKind;
  /** Retailer display name for button text, e.g. "Amazon". */
  retailer: string;
  /** True only for affiliate links (rel="sponsored"). */
  sponsored: boolean;
  /** True when href is an exact product/listing URL rather than a search page. */
  exact: boolean;
};

export type LinkableProduct = {
  amazonQuery: string;
  exactUrl?: string | undefined;
  retailerUrl?: string | undefined;
};

/** Resolve the one destination for a product, following the order documented above. */
export function resolveProductLink(p: LinkableProduct): ResolvedLink {
  const candidate = p.retailerUrl ?? p.exactUrl;
  const host = candidate ? hostOf(candidate) : null;
  if (candidate && host) {
    const entry = entryForHost(host);
    const retailer = entry?.retailer ?? host.replace(/^www\./, "");
    if (isEntryLive(entry)) {
      if (entry.id === "amazon") {
        const u = new URL(candidate);
        u.searchParams.set("tag", entry.websiteTrackingId.trim());
        return { href: u.toString(), kind: "affiliate", retailer, sponsored: true, exact: true };
      }
      const href = applyTemplate(entry, candidate);
      if (href) return { href, kind: "affiliate", retailer, sponsored: true, exact: true };
    }
    return { href: candidate, kind: "retailer", retailer, sponsored: false, exact: true };
  }
  const href = amazonSearchUrl(p.amazonQuery);
  const live = amazonLive();
  return {
    href,
    kind: live ? "affiliate" : "search",
    retailer: "Amazon",
    sponsored: live,
    exact: false,
  };
}

/**
 * rel attribute for every outbound shopping/buy link (Amazon or any retailer): always
 * "sponsored noopener noreferrer", so the markup is correct the moment an entry goes live.
 */
export const OUTBOUND_BUY_REL = "sponsored noopener noreferrer";

export function productHref(p: LinkableProduct) {
  return resolveProductLink(p).href;
}

/** Button text that names the real destination. */
export function productLinkLabel(link: ResolvedLink) {
  return link.exact ? `View on ${link.retailer}` : `Browse options on ${link.retailer}`;
}

/** Disclosure sentences for live programs. Empty when nothing is monetized. */
export function liveDisclosureSentences(): string[] {
  const out: string[] = [];
  for (const e of liveEntries()) {
    out.push(
      e.id === "amazon"
        ? AMAZON_ASSOCIATE_STATEMENT
        : `Some links go to ${e.retailer} through the ${e.network} affiliate program, and we may earn a commission on qualifying purchases.`,
    );
  }
  return out;
}

/**
 * ONE wording for what shopping links are, used by the shop cards, the /shop pages, the /methodology
 * page and /affiliate-disclosure. Edit here and every place changes. Keep it true to what the catalog
 * does: named products link to their ordinary Amazon page; where we only describe a type of product
 * the button opens an Amazon search and is labelled "Find ... on Amazon". No prices are ever shown.
 */
export const SHOP_LINK_FACTS = {
  /** One short line near the first ask (hero, kit). */
  short: "Ordinary Amazon links. We show no prices: Amazon or the seller sets them.",
  /** Beside blocks of named products. */
  product:
    "Each button opens that product's own Amazon page. We show no prices: Amazon or the seller sets price, shipping and returns.",
  /** Beside anything that may mix named products and type-level search links. */
  general:
    'Buttons that say "See it on Amazon" open a named product\'s own page; "Find ... on Amazon" opens an Amazon search for a type of product. We show no prices: Amazon or the seller sets price, shipping and returns.',
  /** When no affiliate entry is live. */
  notEarning: "We don't currently earn from these links.",
  /** When an entry is live (appended after the Associates statement). */
  neutral: "It never changes what we recommend.",
} as const;

/**
 * ONE commission statement for Terms, Privacy and Affiliate Disclosure. Until an Amazon (or other)
 * entry is live we do not earn anything from the links; once live, we "may earn a commission".
 * `short` is the clause for running text, `long` adds the no-extra-cost line.
 */
export function commissionStatement() {
  if (isMonetized()) {
    return {
      live: true,
      short: "may earn a commission on qualifying purchases",
      long: "We may earn a commission on qualifying purchases at no extra cost to you.",
    } as const;
  }
  return {
    live: false,
    short: "do not currently earn anything from them",
    long: "We don't currently earn from these links. If that changes, we may earn a commission, and this page and the note beside the links will be updated first.",
  } as const;
}

/**
 * The sentences shown beside shopping links, in order. Includes the Associates identification
 * statement ONLY when an Amazon entry is live; call this only where links actually appear.
 */
export function shopDisclosureSentences(
  kind: "product" | "general" | "short" = "product",
): string[] {
  const facts = SHOP_LINK_FACTS[kind];
  return isMonetized()
    ? [facts, ...liveDisclosureSentences(), SHOP_LINK_FACTS.neutral]
    : [facts, SHOP_LINK_FACTS.notEarning];
}

/** Problems that would make a registry misleading (used by tests). */
export function validateRegistry(
  reg: Record<string, AffiliateEntry> = affiliateRegistry,
): string[] {
  const problems: string[] = [];
  for (const [key, e] of Object.entries(reg)) {
    if (e.id !== key) problems.push(`${key}: id mismatch`);
    if (e.active && e.approvalStatus !== "approved")
      problems.push(`${key}: active but not approved`);
    if (e.active && !e.websiteTrackingId.trim())
      problems.push(`${key}: active without tracking id`);
    if (e.affiliateUrlTemplate && !e.affiliateUrlTemplate.startsWith("https://"))
      problems.push(`${key}: template must be https`);
    if (e.approvalStatus === "approved" && !e.lastVerified)
      problems.push(`${key}: approved without lastVerified`);
  }
  return problems;
}
