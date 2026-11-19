# Article quality checklist (pre-publication gate)

An article stays `status: "draft"` until every box below is ticked. This extends `docs/SOP-publish-article.md`; do not weaken that SOP. Copy the list into the pull request or tracker row for the article.

## 1. Truth and sources
- [ ] Every item in `coworkChecks` is resolved; sources are recorded in `sources` with working https URLs.
- [ ] `verifiedAt` is set (YYYY-MM-DD) and `publishedAt` is set.
- [ ] No invented experience, testing, experts, testimonials, statistics, prices, ratings, ASINs, volumes or traffic.
- [ ] No first-person claims ("I", "we tested", "in my experience") unless the owner genuinely did it and says so; hypothetical scenes read as hypothetical (`docs/content/BRAND-VOICE.md`).
- [ ] No medical, mental-health or safety-outcome promises. Safety notes (tools, heat, sharp objects, physical effort) are sourced.
- [ ] No real businesses, venues, events or prices named unless verified and dated.

## 2. Reader value
- [ ] The first screen answers the search intent from the research brief.
- [ ] The article teaches a real first step or first project, not only a list.
- [ ] Spending nothing or very little is acknowledged where true (`noSpend` block or equivalent).
- [ ] Essentials vs optional vs probably-already-own are separated for any buying content.
- [ ] No padding or repeated advice; no generic-AI openers (see the avoid list in `docs/content/BRAND-VOICE.md`).

## 3. Products and affiliate
- [ ] Every product id referenced exists in `src/data/products.ts`.
- [ ] Buttons describe the real destination: search pages say "Browse options", verified listings say "View on ...". No cart or multi-item purchase buttons (`docs/commerce/AMAZON-CART-RESEARCH.md`).
- [ ] No affiliate URLs hard-coded in the article or product records; links come only from `src/config/affiliate.ts`.
- [ ] Role labels are used honestly (`docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md`); internal criteria and weights are not shown as ratings.
- [ ] Any product with brand, specs or a listing URL has `sourceUrl` and `lastVerified` (enforced by `src/test/affiliate.test.ts`).
- [ ] Affiliate disclosure appears near product links (automatic through `AffiliateNote`); wording matches current program terms (`docs/buyer/AFFILIATE-ACTIVATION.md`).

## 4. SEO and metadata
- [ ] Title and description are unique (checked by `src/test/seo-trust.test.ts`), the title leads with the primary keyword candidate naturally, the description reads like a human wrote it.
- [ ] One H1 (the page title), H2s with ids for the table of contents, no skipped heading levels.
- [ ] `searchIntent`, `angle`, `hobbies`, `productIds` fields are filled and accurate.
- [ ] Hero image exists in `src/data/images.ts` with real alt text and a license row in `docs/IMAGE-LICENSES.md`.
- [ ] Appears in `/sitemap.xml` after deploy; request indexing afterwards (`docs/buyer/SEO-GUIDE.md`).

## 5. Linking and tools
- [ ] At least one inbound link from a hub or related article, and only natural outbound links (`docs/content/INTERNAL-LINKING-STRATEGY.md`).
- [ ] All internal links resolve (run the link check in `docs/buyer/WEEKLY-MAINTENANCE.md`).
- [ ] Quiz, planner or budget-tool CTA only where it truly fits.

## 6. Distribution
- [ ] Three pin concepts written (search, aspirational, practical) and linked to the article, not to Amazon (`docs/marketing/PINTEREST-STRATEGY.md`).
- [ ] Share image and pin images respect `docs/IMAGE-LICENSES.md`.

## 7. Technical gate
- [ ] `bunx vitest run` passes.
- [ ] `bunx tsc --noEmit` passes.
- [ ] `bunx vite build` passes.
- [ ] The article renders at 1280px and 390px wide with no console errors; the draft URL returned 404 before publishing and returns 200 after.
- [ ] Reading time (computed by `readingMinutes` in `src/content/index.ts`) looks sensible.

## 8. Sign-off
- [ ] Lead editor reviewed. Owner reviewed (any legal, safety or brand-sensitive piece).
- [ ] Date, reviewer and what was verified recorded in the research brief.

After publishing, corrections follow `docs/SOP-corrections.md`.
