/**
 * Register of CANDIDATE affiliate programs. Nothing here is verified.
 * Every factual field starts as null (or the "UNVERIFIED" marker) and status "candidate".
 * Cowork fills fields ONLY from the program's official pages, setting `source` (the page URL)
 * and `verifiedAt` (YYYY-MM-DD) alongside. Do not fill from memory.
 * This file is documentation/research data: it is never used to build links
 * (links come only from src/config/affiliate.ts).
 */
export const UNVERIFIED = "UNVERIFIED" as const;
type Unv = typeof UNVERIFIED;

export type ProgramStatus = "candidate" | "verified" | "rejected" | "applied" | "approved";

export type AffiliateProgram = {
  id: string;
  name: string;
  /** Official program/sign-up page. */
  programUrl: string | null;
  network: string | null;
  applicationRequirements: string | Unv;
  /** Commission as published by the program, with category detail. */
  commission: string | null;
  cookieDays: number | null;
  paymentRequirements: string | Unv;
  categories: string[] | null;
  promotionalRestrictions: string | Unv;
  /** Can one account cover several websites? */
  multiWebsitePolicy: string | Unv;
  /** Can the account/site be transferred to a buyer? */
  transferPolicy: string | Unv;
  /** Site pages where this program could apply (our own paths). */
  relevantPages: string[];
  applyTiming: string | Unv;
  /** What a buyer must do to activate their own account. */
  buyerActivation: string | Unv;
  status: ProgramStatus;
  /** ISO date YYYY-MM-DD the facts were checked. */
  verifiedAt: string | null;
  /** Official page URL the facts came from. */
  source: string | null;
};

const c = (id: string, name: string, relevantPages: string[]): AffiliateProgram => ({
  id,
  name,
  programUrl: null,
  network: null,
  applicationRequirements: UNVERIFIED,
  commission: null,
  cookieDays: null,
  paymentRequirements: UNVERIFIED,
  categories: null,
  promotionalRestrictions: UNVERIFIED,
  multiWebsitePolicy: UNVERIFIED,
  transferPolicy: UNVERIFIED,
  relevantPages,
  applyTiming: UNVERIFIED,
  buyerActivation: UNVERIFIED,
  status: "candidate",
  verifiedAt: null,
  source: null,
});

const shop = ["/shop"];

/**
 * Owner decision 2026-11-19: Plans Past Five uses Amazon Associates ONLY for affiliate links.
 * The earlier candidate list (Awin, Impact, CJ, Rakuten, Ascend, AvantLink, Etsy, Walmart, Target,
 * Michaels, Blick, Cricut, course and experience providers) was removed on purpose. A buyer who wants
 * another program adds an entry here with c(...) and a matching entry in src/config/affiliate.ts.
 */
export const affiliatePrograms: AffiliateProgram[] = [
  {
    ...c("amazon-associates", "Amazon Associates", shop),
    programUrl: "https://affiliate-program.amazon.com",
    network: "Amazon Associates (own network)",
    applicationRequirements:
      "The account must drive at least three qualified sales within 180 days (personal orders excluded). The site needs robust original content (guideline: at least 10 posts) and must be publicly available.",
    // Rate card is in the owner's signed-in Associates account and was NOT READ. Amazon also forbids
    // public communication about the Agreement beyond the disclosure (Operating Agreement, s.5), so no
    // commission figure belongs on any public page; keep rates in private notes only.
    commission: null,
    // Attribution: 24-hour session; items added to cart count if ordered within 89 days of the click.
    cookieDays: 1,
    paymentRequirements:
      "Associates Central requires a tax interview and a payment method (details not read).",
    promotionalRestrictions:
      "Use the exact disclosure sentence. No price display unless Amazon-served or API data. No redirecting links. Do not encourage visitors to bookmark Special Links. Associates links only on the approved Site.",
    multiWebsitePolicy:
      "NOT FOUND in the text read. Confirm in Account Settings / Manage Your Tracking IDs.",
    transferPolicy:
      "The Agreement cannot be assigned without Amazon's express prior written approval. Treat the account as non-transferable.",
    applyTiming:
      "Apply once the site is live with content; three qualified sales are needed within 180 days. Nothing has been applied for.",
    buyerActivation:
      "Buyer applies for their own Associates account, adds their site, and sets their own tracking ID in src/config/affiliate.ts.",
    verifiedAt: "2026-11-18",
    source: "https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM",
  },
];

/** Problems: a commission or cookie claim needs a source URL and a verifiedAt date. */
export function validatePrograms(list: AffiliateProgram[] = affiliatePrograms): string[] {
  const out: string[] = [];
  for (const p of list) {
    const claims = [p.commission, p.cookieDays, p.programUrl].some((v) => v !== null);
    if (claims && (!p.source || !p.verifiedAt))
      out.push(`${p.id}: factual claim without source and verifiedAt`);
    if (p.status !== "candidate" && !p.verifiedAt) out.push(`${p.id}: status without verifiedAt`);
  }
  return out;
}
