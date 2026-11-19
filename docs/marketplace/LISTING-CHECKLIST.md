# Listing checklist

Status: RECOMMENDED process, 2026-11-19. **Nothing is published, listed or offered without the owner's explicit approval.** The lead does not list on their own initiative. Flippa rules and fees were researched by Cowork on 2026-11-18 (FLIPPA-RESEARCH.md); several of its pages are old and conflict, so re-read the live pages before listing.

## A. Before anything else
- [ ] Owner has said in writing to proceed with a listing.
- [ ] TURNKEY-READINESS.md re-scored; every mandatory gate is PASS (per TURNKEY-READINESS.md on 2026-11-19: score 72.42/100, listing not recommended, 14 of 21 applicable gates not PASS).
- [ ] Flippa research re-read against the live pages at listing time: fees (sources conflict), pre-revenue price ceiling (cap versus Projects & Concepts conflict), required listing fields and handover rules (NOT READ), and any verified completed comparable sales (none found so far). LISTING-DRAFT.md and PRICING-STRATEGY.md updated from it, not guessed.

## B. Claim accuracy against the repo (re-run each, record date and result)
- [ ] Published article count: `grep -H 'status:' src/content/article-*.ts src/content/drafts.ts` and read the `articles` export in `src/content/index.ts`. Expected on 2026-11-19: 27 published, 5 drafts (published files in `src/content/index.ts`, drafts in `src/content/draft-registry.ts`). State that the 4 original articles are not yet source-checked unless C4 has been done for them; "published" never means deployed.
- [ ] Hobbies 36: `src/test/hobbies.test.ts`; products 36 types and 8 collections: `src/data/products.ts`; verified catalog count in `src/data/catalog.generated.ts` (37 verified, 7 candidate on 2026-11-19).
- [ ] Tools 4, pins 88 (`ls public/pins | wc -l`; CSV: 72 published-article, 16 hold-until-published), brand assets (`ls design/brand/exports/*`), docs count (`find docs -name '*.md' | wc -l`).
- [ ] Tests and typecheck: `bunx vitest run`, `bunx tsc --noEmit`; production build `bunx vite build`. Record counts and dates; do not copy an old number.
- [ ] Domain: seller confirms ownership and registrar; if unconfirmed, remove every domain claim.
- [ ] Host and live site: only claim "live" if deployed and C9 QA is done.
- [ ] Affiliate: text says Amazon Associates only, not activated, nothing applied for, approval not guaranteed, account not transferable (buyer applies in their own name), master accounts excluded. `src/config/affiliate.ts` has no tag, no active entry.
- [ ] Text describes only what exists in the repo (site, tools, content, brand and pin assets, Amazon-only shopping links).
- [ ] Costs: any figure confirmed from a receipt; otherwise UNCONFIRMED stays.

## C. Content of the listing
- [ ] Title and descriptions contain no earnings, traffic, ranking or revenue-multiple claims. Flippa rule (Cowork's summary, https://support.flippa.com/hc/en-us/articles/360000217435-Making-potential-revenue-claims-on-sites-without-revenue, read 2026-11-18, page about 3,097 days old): revenue or traffic claims must be supported by evidence; potential-revenue or potential-traffic claims must be clearly marked as potential with robust workings and assumptions; specific potential revenue or traffic numbers are forbidden in listing titles. Prohibited Content also bars unverified performance or financial claims, promises or guarantees (https://support.flippa.com/hc/en-us/articles/360000298675-Prohibited-Content).
- [ ] Asking or reserve price is within Flippa's rule for sites without revenue (maximum $9,999 per the Listing sale pricing page; conflicting page noted in PRICING-STRATEGY.md).
- [ ] Pre-revenue, no traffic history, no guarantee of earnings, forecasts hypothetical: all stated.
- [ ] Reason for selling is exactly: "We develop independent digital brands as part of a website development and acquisition portfolio. Plans Past Five has been developed as a turnkey starter business for a new owner to operate and grow."
- [ ] Every AVAILABLE AT LISTING ONLY IF COMPLETE box is either ticked with evidence or its claim deleted.
- [ ] AI use and image rights disclosed; legal pages described as starter text.
- [ ] No competitor names; no invented comparables.

## D. Package hygiene
- [ ] Secrets scan of repo and git history (TRANSFER-CHECKLIST step 4); no `.env`, tokens, IDs, personal data; `.output` not shipped.
- [ ] No seller affiliate IDs, analytics IDs or emails in repo or live site.
- [ ] Image-tool transfer terms confirmed (C10).
- [ ] Draft handover terms reviewed by the owner and a lawyer.

## E. Approval
- [ ] Owner reviews the final text and screenshots and approves in writing.
- [ ] Only then is the listing created, by the owner or with the owner's explicit go-ahead.
