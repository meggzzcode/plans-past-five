# Tracker update packet (for the existing Google Sheet; do not create another)

Sheet: https://docs.google.com/spreadsheets/d/1QOJUmpNAwb9KEJa1x98QHa31r2DUZrsko74dHz_IqGo/edit
Preserve existing formulas, formatting and data. Claude Code has already updated the sheet for everything up to the release candidate (site tab, Overview, Buyer Handoff, Checklist, Accounts, Expenses, Log, Reusable Systems). Use this packet for anything Claude Code could not write, and for new facts Cowork produces. If the sheet is not accessible, leave this as the pending update.

## A. Facts to record (already in the sheet unless marked NEW)
- Domain planspastfive.com registered 2026-11-19, Namecheap order 220011258, $12.28; Private Email $14.88; total paid $27.16; auto-renew OFF; not yet connected to hosting. (in sheet)
- Release candidate commit and test results: see `docs/marketplace/final-inspection/RELEASE-HANDOVER.md` (NEW: enter the commit, 50 test files / 735 tests, `bun audit` 0 findings, eslint 0 errors, tsc clean).
- Inventory (from `docs/buyer/INVENTORY.md`): 32 published articles, 2 outline drafts, 43 hobbies, 66 product records (37 verified, 29 candidates, 8 held, 29 shown), 8 kits (2 complete), 88 pins, 98 sitemap pages. (NEW)
- Scores (from `docs/marketplace/final-inspection/FINAL-SCORECARD.md`): standard business score (Traffic, Revenue, Content, Operational stability), turnkey readiness, customer experience, commercial desirability, buyer appeal, technical quality, transfer readiness. (NEW)
- Asking price recommendation and the unresolved $1,495 versus $2,950 question (`PRICING-SENSITIVITY.md`). (NEW)
- Affiliate readiness: architecture tested active and inactive with a fake ID; tracking OFF; master accounts excluded. (NEW)

## B. Lessons for the Website Flipping System (add to Reusable Systems and Log)
1. Define the buyer and exit before development; freeze scope early.
2. Research customer needs and products before writing commercial articles; use specific retailer links, centralise affiliate configuration.
3. Separate ordinary links from affiliate links in exported and printed materials; test with affiliate enabled and disabled.
4. Complete essential shopping lists; never show an incomplete kit as complete.
5. Source-check before publishing; commercial content should help shoppers decide.
6. Run customer and simulated buyer reviews BEFORE adding features; test the actual buyer publishing workflow and a clean takeover.
7. Test the actual CMS publishing workflow; reconcile documentation with implementation; generate counts by script.
8. Verify asset rights during development; keep sale-ready code private where appropriate.
9. Build safeguards into data importers (an importer once wiped the catalog); run parallel work with file ownership.
10. Track personal hours, automated execution hours and cash separately; stop development when more effort no longer justifies the likely sale value.

## C. Cowork results to enter when they exist
Verified products (workstream A/B), source results (C), asset rights register (D), read-live costs and fees (E), marketplace research (J), mailbox test result (F), CMS live test and deploy/rollback logs (G), live QA (H), blind review results (K), and the growth experiment weekly entries (O, only if authorised): record dates and URLs, never estimates.
