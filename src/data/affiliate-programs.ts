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
const learn = ["/hobby-finder", "/journal"];
const outings = ["/make-plans", "/solo-dates"];

export const affiliatePrograms: AffiliateProgram[] = [
  c("amazon-associates", "Amazon Associates", shop),
  c("awin", "Awin", shop),
  c("impact", "Impact", shop),
  c("cj", "CJ Affiliate", shop),
  c("rakuten", "Rakuten Advertising", shop),
  c("ascend", "Ascend (Partnerize)", shop),
  c("avantlink", "AvantLink", ["/shop/sporty-girl"]),
  c("etsy", "Etsy", shop),
  c("walmart", "Walmart", shop),
  c("target", "Target", shop),
  c("michaels", "Michaels", ["/shop/pottery-era", "/shop/creative-girl"]),
  c("blick", "Blick Art Materials", ["/shop/creative-girl"]),
  c("cricut", "Cricut", ["/shop/creative-girl"]),
  c("skillshare", "Skillshare", learn),
  c("udemy", "Udemy", learn),
  c("domestika", "Domestika", learn),
  c("classbento", "ClassBento", [...learn, ...outings]),
  c("viator", "Viator", outings),
  c("getyourguide", "GetYourGuide", outings),
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
