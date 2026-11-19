# Simplification and buyer-maintenance audit: synthesis (read-only; nothing implemented)

Date 2026-11-19. Branch `editorial-reset` (from the baseline of `claude/vibrant-dirac-amdf7r` at `b376648`). Source reports in `docs/editorial-reset/audit/`: A1 customer and navigation, A2 commercial and data, A3 code and dependencies, A4 docs/handover/workload, A5 buyer independence. Evidence labels (measured / code / estimate / not verified) are in those reports; workload hours are estimates, not tested logs. No deletions, no approvals assumed. The editorial reset has not started.

## Headline
The site is richer than a buyer needs and harder to own than it looks. The customer sees five overlapping ways to sort the same hobbies and a 14-item header. The buyer sees a product defined in 14 places, tests that fail after ordinary edits, and handover docs that contradict the code. Most fixes are small and several are proven safe.

## Ten highest-value simplification opportunities (ranked)
| # | Change | Effort | Customer | Commercial | SEO | Buyer workload |
|---|---|---|---|---|---|---|
| 1 | Build gate on inline product ids and on content integrity (a draft switch must not leave pins, meta titles, links dangling). Today a new-id product swap passes importer check, tests and build but silently turns 6 article links into plain text (A2, A3, measured) | S/M | Protects links | Protects revenue | None | Large cut |
| 2 | One product source (one file per product or one CSV) with stable ids and `replacedBy`; importer leaves the buyer workflow; retire the 66 product-type search cards and the dead `productIds` field (A2) | M | Cleaner shop | Fewer stale links | None | Large cut |
| 3 | Put site name, contact email, GA4 id, verification codes and the affiliate tag in one settings file with a CMS form; decouple tests from content values (settings edit failed 7 tests, adding a hobby 2, first CMS image 3: A5, measured) | M | None | Enables self-serve affiliate switch | None | Large cut |
| 4 | Remove dead code: `src/components/ui/` (4,361 lines), 39 unused dependencies, react-query plumbing, the Lovable error reporter. Proven in temp copies: tsc, build, 754/754 tests pass; client CSS 107 KB to 59 KB raw; install size down 95 MB (A3, measured). Backup first | S | Faster CSS | None | Slightly faster | Moderate cut |
| 5 | Four-destination navigation (Find a Hobby, Make Plans, The Shop, The Journal), heart for My Plans, search; Tonight merges into Make Plans; Start Here merges into Home. Header 14 to about 5, footer 25 links to a short set (A1) | M | Less decision fatigue | Clearer path to shop | About 13 of 98 URLs redirect | Fewer pages |
| 6 | Six collections with a four-pick floor (hide any with fewer than 4 live picks); rename the shop's "Weekend Edit" because `/weekends` already uses that name (A2) | M | Curated feel | Only credible collections shown | 301s from retired slugs | Fewer products to check |
| 7 | Run the real Pages CMS login and Netlify Trigger-deploy test, choose ONE publish path and ONE image path, add a domain-renewal page (A5, A4) | M | None | None | None | Proves the no-code claim |
| 8 | Rebuild the handover as 9 sections / 11 documents with a one-page Start Here and a Known Risks document; fix the cost and status contradictions; make the package script ship the cost/expiry and risk evidence it excludes today (A4) | M | None | Buyer trust | None | Large cut |
| 9 | Quiz result shows a product (9 taps to a product today, 6 after cutting the quiz to 4 questions); one affiliate/no-prices line per shopping page instead of 5 to 27 repeats (A1) | M | Clearer, shorter journey | More product views | None | None |
| 10 | Move the 17 MB of pin images out of the deployed site, archive 36 MB of docs images outside the repo with verified backups, fix the 5-second test-timeout flakes (A3, A4) | S/M | Faster | None | Faster | Calmer CI |

## What I would remove (with approval and backup)
- `src/components/ui/`, 39 dependencies, `tw-animate-css`, `components.json`, `use-mobile.tsx`, react-query wiring, `lovable-error-reporting.ts`.
- The Hobby Budget tool (linked only from the footer), the postcode box and near-me feature, the public changelog link, the My Plans export/import UI (A1, A3).
- The 66 product-type search cards and the dead article `productIds` field once the product source is unified (A2).
- Private QA scripts from the buyer package (click-audit, first-tap, screenshots, inventory, convert-articles, slice-sheet, embed-ai-metadata): archive, do not destroy (A3).

## What I would simplify
- Navigation, homepage (the phrase "Find your thing" appears 6 times), disclaimers (one line per page plus the Affiliate Disclosure page), the quiz (6 steps to 4), Make Plans and Tonight (two scheduling engines, about 1,700 lines plus about 2,100 lines of tests, to one), methodology / editorial policy / editorial standards (one page), the six mood pages (Journal topics, later), maintenance docs (one monthly checklist).

## What I would preserve at all costs
- Evergreen content as data files with the publish gate and build validation; Pages CMS as the editor; the central affiliate registry with tracking OFF by default and the disclosure logic; the Amazon-only link test; export lists with no Amazon URLs; security headers; the browser-only My Plans; the legal and trust pages (privacy, terms, affiliate disclosure, editorial standards); licence and provenance records; the baseline backup and tag.

## Left as future buyer expansion opportunities
Additional collections once each has 4 verified picks; more signature hobbies; Pinterest growth and the 88 pin assets; affiliate activation; analytics; the six mood pages as Journal topics; prerendering to a plain static host (credible but untested: A3 says only `sitemap.xml` needs a server).

## Proposed simplified sitemap (from A1; redirects only where the destination is genuinely relevant)
- **Home**
- **Find a Hobby** (directory, quiz, hobby pages; signature hobbies featured)
- **Make Plans** (weekend, solo and night-in planning; Tonight lives here; 301 `/tools/tonight` and `/start-here`)
- **The Shop** (up to six collections, each only with 4+ live picks; retired collection slugs 301 to the nearest live one)
- **The Journal** (flagship, discovery and supporting articles; mood pages become Journal topics in phase two)
- Secondary: search, heart (My Plans), About, Contact; footer: Privacy, Terms, Affiliate Disclosure, Editorial Standards, Sitemap.
- About 13 of 98 sitemap URLs redirect: 6 mood pages (could wait), Start Here, Tonight, Budget, Methodology, Corrections, Changelog and 2 retired shop collections.

## Proposed buyer handover inventory (from A4: 9 sections, 11 documents)
1 Start Here (one page); 2 CMS and Content Management; 3 Monetization and Affiliate Management; 4 Hosting, Costs and Analytics (real cost and expiry facts, sanitised); 5 Monthly Maintenance (one checklist including product availability); 6 Ownership Transfer plus a new Known Risks and Limitations document drawn from the private audits; 7 Brand Assets and Licensing; 8 Growth Opportunities; 9 Technical Reference; plus a `records/` folder of CSVs and verification records. Seller-private history goes to an archive outside the package and is not destroyed. The package must not omit material risks.

## Current versus proposed ownership workload (estimates)
| | Current | Proposed |
|---|---|---|
| Documented routine before writing content | about 3.2 to 4.2 h/month (A4) | about 2 h/month (A4) |
| Products (checks, swaps) at today's design | about 3 h/month (A2 estimate) | lower with fewer products, stable ids and a build gate; not yet measured |
| Accounts needed | up to 11; minimum 3 (GitHub, Netlify, registrar with mailbox) (A5) | minimum 3 |
| Per-article writing, per-product verification, Pinterest posting | UNKNOWN | UNKNOWN, measure in the pilot |
The owner's 3 to 5 hours per month target is realistic only after the changes above; today the documented routine alone uses 64 to 84% of it before writing anything.

## Where my independent recommendation differs from yours
1. **Signature hobbies:** replace scrapbooking and puzzles. Neither has an article, a kit or a verified product; scrapbooking reuses junk journaling's product types. Add craft/paint night and picnicking, which the 12 do not cover but the library already does (A2). Also reading, flower arranging, pickleball and tennis have 0 verified products today, so research them first.
2. **Collections:** keep six, but only three (Paper, Creative, Hosting) can ship with named products today; Cozy, Sporty and Weekend have 0 shown. Ship only those with 4+ picks; do not aim for 48 products before the research exists.
3. **Settings in the CMS:** reverse the earlier rule that settings are not editable in the CMS; a validated form is safer than a code edit (A5).
4. **"Saved is not Published":** reconsider, because it rests on unverified Netlify credit figures; test the real behaviour first (A5).
5. **Lovable:** stop recommending it as the buyer's assistant; remove it from the build later (A3, A5).
6. **Pages CMS:** it is configured but untested; the Netlify log says builds were "stopped", conflicting with the Trigger-deploy docs (A4). Do not tell a buyer the no-code path works until the test passes.
7. **Static prerender:** worth a spike later, not before sale.

## Defects found by the audit that deserve fixing regardless
Importer `--check` skips the shrink guard (a 39%-smaller CSV passed); a content-integrity gap in Netlify's build (it never runs vitest); all 66 catalog records incl. candidates ship in client JS; Amazon links skipped by link check; link check does not say which article holds a bad link; docs say the contact email is empty while `site.ts` has `hello@planspastfive.com`; three docs say about 9 tests fail with affiliate ON, measured 0; the package script excludes risk evidence while buyer docs say "no prices, domain unconfirmed" (real facts: $27.16 paid, expiry 2027-11-19, auto-renew OFF); counts differ across docs (hobbies 36/38/43; articles 27/32; catalog 61 to 66; tests 235 to 737).

## Proposed minimum viable sale-ready version
- Four destinations plus heart; Home; legal footer.
- About 28 articles per the reset plan (consolidations only where search intent supports them), 12 signature hobbies after validation, lighter entries for the rest.
- Up to six collections, each with 4 to 8 researched picks and visible product imagery per the pending photography decision; collections without 4 picks hidden.
- One product source with stable ids and a build gate; one settings form; one publish path, one image path, proven by a real Cowork test.
- Handover package of 11 documents with a Known Risks page; seller history archived.
- Measured owner routine of about 2 h/month plus content.

## Approval needed before anything is implemented
The ten items above, the redirect list, the signature-hobby and collection changes, and the removal/archive items (each needs a backup first). Recommended order: 1, 4 and 3 (safe, proven), then 7 (needs your logins), then 5, 6, 2 and 8 alongside Phase B; 9 and 10 after the pilot. The pilot articles (Phase B) can start in parallel with items 1 to 4 if you say so.
