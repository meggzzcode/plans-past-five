# Turnkey readiness score

Status: RECOMMENDED method, scored 2026-11-19 by a documentation worker from the repo state at that time. Re-score at listing time (other work was still in progress: security headers, docs, code edits).

This score measures how ready the site is to be handed to a buyer. It is separate from any traffic or revenue score. The site is pre-revenue with no traffic history, so there is no business-performance score to give and none is implied.

## Method

- Each category has a fixed weight (from the owner's plan). Each category has objective completion criteria. A criterion scores 1 (done and evidenced), 0.5 (partly done, reason given) or 0 (not done or not evidenced). The published-articles criterion is scored proportionally (4 of 30) and the pins-on-published-content criterion proportionally (30 of 95).
- Category percentage = points / criteria. Weighted points = percentage x weight. Total = sum of weighted points out of 100.
- Conservative rules applied: drafts awaiting source verification do not count as published; unverified products do not count; no domain, host, analytics or affiliate account means those criteria score 0; something this worker did not run itself and could not see evidence for scores 0 or 0.5.
- This is a checklist tally, not an arbitrary score. Change a criterion and the arithmetic changes with it.

Evidence used: commits (`git log --oneline`): 062f8a7 (brand asset library, 95 pins, CSV, schedule, brand and pinterest buyer docs), caed574 (turnkey build-out: planner and quiz rewrite, tools, affiliate registry, shoppable components, trust pages, CI, 28 article drafts, printables and kits, buyer docs), 3bc8274 (turnkey plan, resume file), 99dd329 (lint, saved-items hardening), d488ac8 (README), 379a296 (site build). Tests: `bunx vitest run` gave 9 test files, 206 tests passed. `bunx tsc --noEmit` gave no errors. The working tree had uncommitted edits by another worker (docs/buyer/SECURITY-AND-BACKUPS.md, docs/buyer/SEO-GUIDE.md, src/routes/__root.tsx, src/server.ts, new src/lib/security-headers.ts), so these results may shift.

## Score summary

| Category | Weight | Criteria met | Category % | Weighted points |
|---|---|---|---|---|
| Branding and presentation | 10% | 4 of 6 | 66.7% | 6.67 of 10 |
| Website functionality and UX | 15% | 4.5 of 7 | 64.3% | 9.64 of 15 |
| Editorial content and research | 15% | 3.13333 of 6 | 52.2% | 7.83 of 15 |
| Monetization infrastructure | 15% | 4 of 8 | 50.0% | 7.50 of 15 |
| SEO and performance | 10% | 4 of 8 | 50.0% | 5.00 of 10 |
| Original tools and digital assets | 10% | 7 of 9 | 77.8% | 7.78 of 10 |
| Marketing package | 10% | 4.31579 of 8 | 53.9% | 5.39 of 10 |
| Security and maintenance | 5% | 4.5 of 8 | 56.2% | 2.81 of 5 |
| Documentation and transferability | 10% | 5.5 of 8 | 68.8% | 6.88 of 10 |
| **Total** | 100% | | | **59.50 of 100** |

**Computed readiness total: 59.5 out of 100 (rounded).** That is a tally of work done against objective criteria. It does not mean the site is 60 percent ready to sell: the mandatory sale gates below are pass or fail and are not averaged into this number.

## Criteria and evidence by category

### Branding and presentation (10%): 6.67 of 10

| Criterion | Score |
|---|---|
| Logo set (12 logo SVG exports) in design/brand/logos | 1 |
| Palette and type tokens (design/brand/palette, fonts with OFL licences) | 1 |
| Favicon, OG image, social and board-cover exports (design/brand/exports) | 1 |
| Brand guide and voice docs (docs/BRAND-GUIDE.md, design/brand/*.md) | 1 |
| Domain, social handles and contact email set (site.ts fields empty) | 0 |
| Legal owner name and jurisdiction set (site.ts legal fields empty) | 0 |

### Website functionality and UX (15%): 9.64 of 15

| Criterion | Score |
|---|---|
| All routes implemented (about 30 route files in src/routes) | 1 |
| Automated tests pass (206 passing, 11 files, run 2026-11-19) | 1 |
| Typecheck clean (bunx tsc --noEmit, no errors, 2026-11-19) | 1 |
| CI workflow defined (.github/workflows/ci.yml: tests, tsc, build); no CI run result seen by this worker | 0.5 |
| Production build confirmed successful (local build passed 2026-11-19; hosted build not run) | 0.5 |
| Current desktop and mobile browser QA (earlier Playwright pass was on an older build per CLAUDE-HANDOFF.md; C9 pending) | 0.5 |
| Live production site functioning | 0 |

### Editorial content and research (15%): 7.83 of 15

| Criterion | Score |
|---|---|
| Roadmap and 28 research briefs exist (docs/content) | 1 |
| Published articles versus the 30 target (4 of 30) | 0.13 |
| Drafts verified against sources (0 of 28; C4 pending) | 0 |
| Editorial process docs (quality checklist, SOPs, corrections policy) | 1 |
| Trust pages built (editorial policy, methodology, corrections) | 1 |
| Cowork keyword and competitor research completed (C1, C2 pending) | 0 |

### Monetization infrastructure (15%): 7.50 of 15

| Criterion | Score |
|---|---|
| Central affiliate registry and link resolver built and unit-tested | 1 |
| Ordinary fallback links (retailer URL then Amazon search link) working in code and tests | 1 |
| Affiliate disclosure page and note components | 1 |
| Shoppable article and kit system built (renders nothing until verified products exist) | 1 |
| Verified product catalog loaded (0 products; catalog empty) | 0 |
| Approved and tested affiliate account (none exists) | 0 |
| Affiliate program and Amazon rules research (C5, C6 pending) | 0 |
| Storefront for premium kits (none; kits are prepared, not for sale) | 0 |

### SEO and performance (10%): 5.00 of 10

| Criterion | Score |
|---|---|
| Sitemap route and robots.txt present | 1 |
| Per-page metadata and canonical URLs (repo-stated, covered by seo-trust tests) | 1 |
| Structured data on articles (repo-stated) | 1 |
| Thin hobby pages noindexed unless a published article covers them (repo-stated) | 1 |
| Keyword and demand evidence (C1 pending) | 0 |
| Search Console and Bing set up (no domain or host) | 0 |
| Lighthouse or PageSpeed lab run on production (C9 pending) | 0 |
| Domain connected and site.url real | 0 |

### Original tools and digital assets (10%): 7.78 of 10

| Criterion | Score |
|---|---|
| Hobby finder quiz | 1 |
| Make Some Plans planner | 1 |
| Hobby budget tool | 1 |
| Tonight tool | 1 |
| Six free printable PDFs with previews (public/downloads) | 1 |
| Two premium kits prepared (18 PDFs plus two zips in design/kits/*/dist) | 1 |
| Font and artwork licence records (docs/IMAGE-LICENSES.md) | 1 |
| Kit usage terms reviewed by owner or lawyer (marked needs-owner-review) | 0 |
| Kits actually listed for sale | 0 |

### Marketing package (10%): 5.39 of 10

| Criterion | Score |
|---|---|
| 95 pin images rendered (public/pins) | 1 |
| Pins CSV (docs/pinterest-pins.csv, 95 rows) | 1 |
| 90-day Pinterest schedule (docs/PINTEREST-90-DAY-SCHEDULE.md) | 1 |
| Pinterest and distribution strategy docs | 1 |
| Pins pointing at published content (30 of 95; 65 are hold-until-published) | 0.32 |
| Pinterest account created and website claimed (none) | 0 |
| Buyer presentation (not started per RESUME.md) | 0 |
| CSV verify_before_posting items cleared | 0 |

### Security and maintenance (5%): 2.81 of 5

| Criterion | Score |
|---|---|
| CI workflow file present | 1 |
| Dependabot configured | 1 |
| Site-health and monthly-digest workflows present | 1 |
| Static security headers file (public/_headers); code-level headers work IN PROGRESS by another worker; host not chosen | 0.5 |
| Secrets scan of repo and history run for this package (not run) | 0 |
| Dependency audit run (not run) | 0 |
| HTTPS and host configured (no host) | 0 |
| Security and backup docs | 1 |

### Documentation and transferability (10%): 6.88 of 10

| Criterion | Score |
|---|---|
| Buyer doc set (26 files in docs/buyer) | 1 |
| 20-step transfer checklist | 1 |
| Account dependency doc | 1 |
| Operating-cost doc that keeps unknowns UNCONFIRMED | 1 |
| Image and licence records | 1 |
| Marketplace package (this folder; drafts, C7 figures pending) | 0.5 |
| Buyer presentation (not started) | 0 |
| Legal pages reviewed by a professional (starter text only) | 0 |

## Mandatory sale gates

Every gate must be PASS before a listing is recommended. A high weighted total does not override a failed gate.

Status words: PASS (evidenced), FAIL (evidence shows it is not met), BLOCKED (cannot be met or checked until an outside dependency exists, such as a domain, host or Cowork result), NEEDS OWNER (requires an owner decision or action).

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | Public production site functions correctly | BLOCKED | No host or domain chosen (docs/buyer/BUSINESS-OVERVIEW.md; docs/RESUME.md). Cowork task C9 needs a deployed URL. |
| 2 | No broken critical journeys | BLOCKED | Unit and route tests pass (206), but journeys have not been exercised on production (C9). Earlier local Playwright pass was on an older build (CLAUDE-HANDOFF.md). |
| 3 | Professional desktop and mobile experience | BLOCKED | Needs current browser QA on a deployed build; only the older local check exists. |
| 4 | No unfinished public pages | FAIL | CLAUDE-HANDOFF.md known issues: hobby profile pages are short, contact email, socials and legal owner name are empty in src/config/site.ts, Privacy and Terms are starter text. Owner may decide some are acceptable. |
| 5 | No placeholder articles | NEEDS OWNER | Drafts are kept out of routes, lists, search and sitemap (src/test/rules.test.ts checks drafts). Only 4 articles are published. Owner must confirm those 4 were source-checked; the C4 verification process was written for the drafts. The 28 new draft files are now registered in src/content/index.ts (`all` array) and are tested to stay hidden (checked 2026-11-19 after wiring). |
| 6 | No fabricated claims | BLOCKED | Policy forbids invented prices, ratings, experts and traffic, but the full claim audit (C4, 0 of 28 drafts verified) and listing-text audit are not done. |
| 7 | No known critical security issues | BLOCKED | None found, but no secrets scan or dependency audit was run for this package, security-header code is in progress by another worker, and no host exists. |
| 8 | No unauthorized included assets | BLOCKED | docs/IMAGE-LICENSES.md says images were generated with Lovable's AI image tool and may be transferred; confirming the tool terms allow transfer is PENDING COWORK (C10). Fonts are SIL OFL. |
| 9 | Important SEO infrastructure operational | BLOCKED | Sitemap, robots, metadata exist in the repo, but nothing is live, no Search Console or Bing property, no domain. |
| 10 | Affiliate configuration tested | BLOCKED | Registry is unit-tested in code. No approved account exists, so a real tracked link has never been tested. Buyer creates their own account. |
| 11 | Ordinary fallback links functional | PASS (code level) | src/config/affiliate.ts resolution order and tests (src/test/affiliate.test.ts, shop.test.tsx). Live-site check still due (C9). |
| 12 | Original digital products completed | PASS | Six free PDFs in public/downloads; two premium kits (9 PDFs and a zip each) in design/kits/*/dist. Kit usage terms still need owner review; the kits are not for sale. |
| 13 | Buyer documentation completed | FAIL | 26 buyer docs exist, but the buyer presentation is not started (docs/RESUME.md) and the marketplace documents here depend on C7. |
| 14 | Operating costs documented | NEEDS OWNER | docs/buyer/OPERATING-COSTS.md documents every line as UNCONFIRMED. Owner must confirm any real cash spent before costs are stated. |
| 15 | Business dependencies documented | PASS | docs/buyer/ACCOUNT-DEPENDENCIES.md exists. |
| 16 | Technical tests passed | PASS | 206 of 206 tests, 11 files; tsc clean (2026-11-19). Re-run at listing time. |
| 17 | Production build successful | PASS (local) | `bunx vite build` succeeded locally on 2026-11-19 after the final wiring (Nitro output built). A hosted deploy build has not run because no host is connected; re-check at deploy. |
| 18 | Transfer procedures documented | PASS | docs/buyer/TRANSFER-CHECKLIST.md (20 steps); docs/marketplace/HANDOVER-TERMS-SUGGESTION.md. |
| 19 | Personal credentials excluded | NEEDS OWNER | No credentials are expected in the repo, but the scan in TRANSFER-CHECKLIST step 4 has not been run and git history has not been scanned. |
| 20 | Listing description accurate | BLOCKED | The draft listing is accurate to the repo today, but depends on facts (published articles, domain, host, verified products) that change; see LISTING-CHECKLIST.md. |
| 21 | Pre-revenue status disclosed | PASS | Stated in LISTING-DRAFT.md, BUYER-FAQ.md and docs/buyer/BUSINESS-OVERVIEW.md. Draft only until the owner approves a listing. |
| 22 | Buyer monetization activation requirements disclosed | PASS | docs/buyer/AFFILIATE-ACTIVATION.md and LISTING-DRAFT.md. |

Count: PASS 8 (gates 11, 12, 15, 16, 17 local, 18, 21, 22), FAIL 2 (4, 13), BLOCKED 9 (1, 2, 3, 6, 7, 8, 9, 10, 20), NEEDS OWNER 3 (5, 14, 19). Total 22.

## Conclusion

**Listing is not recommended now.** 15 of 22 mandatory gates are not PASS. Nothing should be published, listed or offered without the owner's explicit approval in any case.

Outstanding, in dependency order:
1. NEEDS OWNER: choose and connect a domain and a host (confirm domain ownership), then deploy. This unblocks gates 1, 2, 3, 9 and the C8 and C9 Cowork tasks.
2. Run the production build and the site-health check; record results (gate 17, 16 re-run).
3. Cowork C4: verify draft article claims, then Claude Code flips verified drafts to published (gates 5, 6). Cowork C3: verify products and load the catalog.
4. Cowork C10 and C7: confirm image-tool transfer terms, marketplace fees, revenue-claim rules and comparable completed sales (gate 8 and pricing).
5. Owner: fill site.ts contact email, legal owner name, socials as appropriate; get legal pages reviewed; decide on unfinished or short pages (gate 4).
6. Run a secrets scan including git history (gate 19); confirm real costs (gate 14).
7. Finish the buyer presentation (gate 13).
8. Re-score this file and re-read every claim in LISTING-DRAFT.md against the repo (gate 20).

## Status legend used across the marketplace package

VERIFIED (checked against a source or by a command, with date), COMPLETED (built and in the repo), RECOMMENDED (a suggestion, not done), IN PROGRESS (being worked on), BLOCKED (waiting on something outside this repo), NEEDS OWNER (owner decision or action), READY TO DEPLOY (built, awaiting only a host and domain).
