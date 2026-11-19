# Listing checklist

Status: RECOMMENDED process, 2026-11-19. **Nothing is published, listed or offered without the owner's explicit approval.** The lead does not list on their own initiative. Marketplace rules and fees are PENDING COWORK (C7).

## A. Before anything else
- [ ] Owner has said in writing to proceed with a listing.
- [ ] TURNKEY-READINESS.md re-scored; every mandatory gate is PASS (today: not recommended, 15 of 22 gates not PASS).
- [ ] C7 research complete (fees, listing requirements, revenue-claim rules for sites without revenue, verified completed comparables). Wording and fee rules in LISTING-DRAFT.md and PRICING-STRATEGY.md updated from it, not guessed.

## B. Claim accuracy against the repo (re-run each, record date and result)
- [ ] Published article count: `grep -H 'status:' src/content/article-*.ts src/content/drafts.ts` and read the `articles` export in `src/content/index.ts`. The 28 new draft files are registered in the `all` array and stay hidden while `status` is draft (fixed 2026-11-19).
- [ ] Hobbies 36: `src/test/hobbies.test.ts`; products 36 types and 8 collections: `src/data/products.ts`; verified catalog count: `src/data/catalog.ts`.
- [ ] Tools 4, printables 6 (`ls public/downloads/*.pdf`), kits 2 (`ls design/kits/*/dist`), pins 95 (`ls public/pins | wc -l`), brand assets (`ls design/brand/exports/*`), docs count (`find docs -name '*.md' | wc -l`).
- [ ] Tests and typecheck: `bunx vitest run`, `bunx tsc --noEmit`; production build `bunx vite build`. Record counts and dates; do not copy an old number.
- [ ] Domain: seller confirms ownership and registrar; if unconfirmed, remove every domain claim.
- [ ] Host and live site: only claim "live" if deployed and C9 QA is done.
- [ ] Affiliate: text says not activated, approval not guaranteed, master accounts excluded. `src/config/affiliate.ts` has no tag, no active entry.
- [ ] Kits: text says prepared, not for sale; terms status needs-owner-review.
- [ ] Costs: any figure confirmed from a receipt; otherwise UNCONFIRMED stays.

## C. Content of the listing
- [ ] Title and descriptions contain no earnings, traffic, ranking or revenue-multiple claims.
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
