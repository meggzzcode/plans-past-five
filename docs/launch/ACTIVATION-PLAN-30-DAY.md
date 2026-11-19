# Optional 30-day activation plan (NOT ACTIVE)

Status 2026-11-19: **this is a plan only. Nothing is activated, published, connected or scheduled.** Nothing in it happens without the owner's explicit written authorisation for that step (see `OWNER-AUTHORISATION-CHECKLIST.md`). No real affiliate ID, no marketing post and no scheduled pin may exist before then.

Scope is frozen: no new features, no newsletter, no paid advertising. Budget: about **6 owner hours** and **$0 new cash** over 30 days. Day 0 = the date the owner authorises step 1, in writing.

Facts this plan rests on (from the repo, 2026-11-19): domain planspastfive.com registered at Namecheap (DNS at Namecheap BasicDNS) with Private Email; hosting is a private Netlify site; the owner holds a master Amazon Associates account that she reports is in its 180-day review window and needs qualifying sales; the site is pre-revenue and earns nothing; `analytics.ga4MeasurementId`, `searchConsoleVerification`, `pinterestVerification` and the Amazon registry entry are all empty or inactive.

Who: **Owner** (types passwords, pays, clicks "approve", signs in), **Cowork** (works in the owner's signed-in browser, read-only on dashboards unless a step says otherwise), **Claude Code** (edits this repo, runs tests, deploys only when told).

## Dependency order at a glance

1 Go-live -> 2 Amazon tracking ID (only if eligible) -> 3 Disclosures check -> 4 GA4 + Search Console -> 5 Pinterest verification and pins -> 6 Measure -> 7 Weekly reports -> 8 Marketplace update -> 9 Hours and stop rule. Steps 2 and 4 each need step 1; step 5 pins need step 1 and the page to be public.

---

## 1. Go-live prerequisites

| # | Step | Who | Hours (owner) | Cost | Prerequisite | Done when |
|---|---|---|---|---|---|---|
| 1.1 | Written authorisation to go public (checklist item A) | Owner | 0.1 | $0 | none | Owner message says yes, with date |
| 1.2 | Add Netlify DNS records for planspastfive.com at Namecheap (keep BasicDNS, do not move nameservers; follow `docs/launch/DOMAIN-EMAIL-SETUP.md` and `docs/cowork/COWORK-PROMPT-NETLIFY-SETUP.md`) | Cowork, owner signs in and approves | 0.4 | $0 | 1.1 | Netlify shows the domain as verified |
| 1.3 | HTTPS certificate issued; `http://` redirects to `https://`; apex and `www` both resolve | Cowork checks | 0 | $0 (Netlify certificate is free, re-read live) | 1.2 | Browser shows a valid padlock on both names |
| 1.4 | Mailbox test: send to and from hello@planspastfive.com, reply received, alias subscriptions@ delivers (or forwarding set) | Owner | 0.25 | $0 (Private Email already paid) | 1.2 | Both test messages arrive and a reply goes out; screenshot saved |
| 1.5 | One release deploy: Claude Code builds, runs the full test suite, and deploys one release to the production domain (only after "go" from owner) | Claude Code | 0 | $0 | 1.1-1.3 | Tests green; the live home page and `/sitemap.xml` load from planspastfive.com |
| 1.6 | Make the site public (remove Netlify access protection) | Owner clicks, Cowork guides | 0.2 | $0 | 1.5 and the separate yes (checklist item B) | A logged-out private window can open the site |
| 1.7 | Verify headers: Claude Code runs `curl -sI https://planspastfive.com/` and compares to `public/_headers` (nosniff, Referrer-Policy, Permissions-Policy). HSTS is deliberately not set yet: add it only after HTTPS is confirmed on the final domain, as a separate yes | Claude Code | 0 | $0 | 1.6 | Headers match; result written to the log |
| 1.8 | Spot-check 10 pages, `robots.txt` (points to the sitemap), `/sitemap.xml`, no console errors | Claude Code | 0 | $0 | 1.6 | List of 10 URLs recorded as passing |

Owner time in step 1: about 0.95 h, rounded to 1.25 h in the budget for waiting and retries.

## 2. Website-specific Amazon tracking ID (SUBJECT TO ELIGIBILITY)

Do not start until the owner has read the official pages below and written down the answers. If any answer is "no" or unclear, **stop, leave `affiliate.ts` untouched**, and the site stays "we don't currently earn from these links".

**What the owner reads (official Associates pages only; note the date read):**
- Operating Agreement, https://affiliate-program.amazon.com/help/operating/agreement: section on **assignment / non-assignment** (previous reading, 2026-11-18, found the account cannot be assigned without Amazon's written approval; re-read live), the **Identifying Yourself as an Associate** section, and anything on **which sites** an account may be used on.
- Application Review page, https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM: the **180-day / 3 qualifying sales** rule: what happens at day 180 if fewer than three qualifying sales occur, and what links may be used during the window.
- Associates Central help on **adding a website to the account** (Account Settings > Manage Your Websites and Mobile Apps, re-read live for the current name) and **creating a tracking ID** (Account Settings > Manage Tracking IDs, re-read live).
- Program Policies, https://affiliate-program.amazon.com/help/operating/policies.

**Questions to answer in writing before going on** (record the page and date for each):
1. Can the site URL be added to the existing master account while it is in the 180-day window?
2. May an account be used on a website that is **listed for sale**? Is there anything in the Agreement about selling or transferring a site that carries Associates links?
3. Does the non-assignment clause mean the buyer cannot take over the account or tracking ID? (Expected: yes; the buyer applies for their own.)
4. Does Amazon's dashboard show the account as usable for links now, or only after acceptance? (This decides whether `approvalStatus` may say `approved`. Never claim to be an Associate before Amazon accepts: `docs/buyer/AMAZON-ASSOCIATES-PATH.md`.)

| # | Step | Who | Hours (owner) | Cost | Prerequisite | Done when |
|---|---|---|---|---|---|---|
| 2.1 | Read the pages above and answer the four questions | Owner (Cowork can fetch and summarise; owner decides) | 0.25 | $0 | Step 1 done; site public | Four answers written with page and date |
| 2.2 | Decision and written yes (checklist item D); if any answer is no, stop here | Owner | 0 | $0 | 2.1 | Written yes, or written "not eligible, stop" |
| 2.3 | Add the website and create a tracking ID for it inside the existing master account | Owner (Cowork may guide, owner types and confirms) | 0.25 | $0 | 2.2 | The ID appears in Manage Tracking IDs, named for this site |
| 2.4 | Owner gives Claude Code the ID. Claude Code changes **one entry only**: `affiliateRegistry.amazon` in `src/config/affiliate.ts` (`websiteTrackingId` = the new ID, `approvalStatus`, `active: true`, `lastVerified` = today, `approvedPromotionMethods` as the dashboard lists). No other file takes the ID | Claude Code | 0 | $0 | 2.3 | `validateRegistry()` returns no problems |
| 2.5 | Update the tests that assert the "don't currently earn" wording (`src/test/shop.test.tsx`, `src/test/round3-fixes.test.tsx`) to the live wording; do not delete assertions | Claude Code | 0 | $0 | 2.4 | Full suite green |
| 2.6 | Run the affiliate activation test in `docs/marketplace/final-inspection/AFFILIATE-ACTIVATION-TEST.md` (written separately; follow it exactly, including checking rel attributes, tagged links, and the disclosure text) against a deploy preview or local build first | Claude Code | 0 | $0 | 2.5 | Test doc's pass criteria all met, result recorded |
| 2.7 | Release deploy of the monetised build (separate yes, checklist item E) | Claude Code | 0 | $0 | 2.6 and the yes | Live product links carry the tag; the disclosure shows |

**Disclosure that then appears** (generated by `src/config/affiliate.ts`, wording from `docs/commerce/AMAZON-DISCLOSURE.md`): the required sentence "As an Amazon Associate I earn from qualifying purchases." (Operating Agreement s.5; confirm live) beside shopping links, plus the commission statement ("We may earn a commission on qualifying purchases at no extra cost to you.") on Terms, Privacy and the Affiliate Disclosure page. The "We don't currently earn from these links" lines disappear. Checked 2026-11-19: `AMAZON_ASSOCIATE_STATEMENT` already uses "I".

**The tracking ID belongs to the seller (the owner).** It is **removed or replaced before transfer**: Claude Code resets `affiliateRegistry.amazon` to the blank state (empty ID, `not-applied`, `active: false`, `lastVerified: null`), re-runs the tests and redeploys; the buyer applies for their own account and ID (`docs/buyer/AFFILIATE-ACTIVATION.md`). The buyer is never given the owner's ID, login or earnings history. See the transfer checklist (`docs/buyer/TRANSFER-CHECKLIST.md`).

## 3. Affiliate disclosures

Where disclosure must appear once step 2 is live (all driven by the registry, so check output rather than hand-editing):
- Beside every block of shopping links (shop cards, "Shop the article", starter kits, `/shop` pages): the Associates sentence plus the facts line.
- On `/affiliate-disclosure`, `/editorial-policy`, `/terms`, `/privacy` and the footer link to the disclosure.
- Every outbound buy link carries `rel="sponsored noopener noreferrer"` (`OUTBOUND_BUY_REL`); only live affiliate links count as affiliate, plain retailer links stay untagged.
- **No tagged links in exported lists** (printable or shared shopping lists, per `docs/commerce/EXPORT-LINK-POLICY.md` and `docs/process/AFFILIATE-EXPORT-RULE.md`): exports use plain, untagged links.
- Pinterest pin copy and descriptions must not claim earnings or Associate status beyond the required sentence; no earnings or rates anywhere (Agreement s.5 restricts public statements).
- Do not use shortened or redirecting links.

| Step | Who | Hours | Cost | Done when |
|---|---|---|---|---|
| 3.1 Check disclosure text and `rel` on 5 shop pages, 3 articles and an exported list | Claude Code | 0 | $0 | Checklist in the activation test is ticked |
| 3.2 Read the Affiliate Disclosure page as a visitor | Owner | 0.1 (inside 2.1 budget) | $0 | Owner says it reads clearly |

## 4. GA4 and Search Console (see `docs/buyer/ANALYTICS-SETUP.md`)

Consent first: analytics may need a consent mechanism in some regions. Owner decides (legal advice recommended). If consent logic is needed it is a scope change, so GA4 stays off and Search Console plus Pinterest/Amazon dashboards are used instead.

| # | Step | Who | Hours (owner) | Cost | Prerequisite | Done when |
|---|---|---|---|---|---|---|
| 4.1 | Written yes for GA4 and Search Console, including the consent decision (item F) | Owner | 0.1 | $0 | Step 1 | Written yes |
| 4.2 | Create the GA4 property and a web data stream for https://planspastfive.com (re-read live for current steps) | Owner with Cowork | 0.25 | $0 | 4.1 | Measurement ID (G-XXXXXXXXXX) visible |
| 4.3 | Claude Code sets the one setting `analytics.ga4MeasurementId` in `src/config/site.ts` (`integrations.googleAnalyticsId` follows it), updates the Privacy page sentence and the two default-asserting tests, deploys | Claude Code | 0 | $0 | 4.2, deploy yes | Tests green; deploy live |
| 4.4 | Realtime check: Owner opens the live site on a phone not on the owner's usual account; Cowork confirms the hit in GA4 Realtime. This visit is excluded from reporting (note date and time) | Cowork + owner | 0.1 | $0 | 4.3 | Realtime shows 1 active user; `product_click` visible only via a test click on a **non-affiliate staging build**, never a live tagged link |
| 4.5 | Search Console: add domain property verified by **DNS TXT** at Namecheap (no code), or the meta-tag route into `searchConsoleVerification` | Owner with Cowork | 0.2 | $0 | Step 1 | Property shows "Ownership verified" |
| 4.6 | Submit `https://planspastfive.com/sitemap.xml` | Cowork | 0.05 | $0 | 4.5 | Sitemap status "Success" |
| 4.7 | URL Inspection > Request indexing for the home page and the ten strongest commercial articles (below). Search Console limits the daily quota (re-read live): do a few per day | Cowork | 0.1 | $0 | 4.6 and the article being live | All eleven requests submitted; dates logged |

**Ten strongest commercial articles** (from `docs/cowork/COWORK-FINAL-PACK.md`; slugs from `src/content/generated/published.json`; confirm each is live before requesting):
1. junk-journaling-supplies-for-beginners
2. how-to-host-a-mahjong-night (pin slug `how-to-host-a-mahjong-night`)
3. how-to-start-junk-journaling
4. how-to-host-a-paint-night-at-home
5. creative-hobbies-you-can-start-at-home
6. at-home-creative-weekend
7. how-to-host-a-craft-night
8. creative-hobby-starter-kits-worth-considering
9. pickleball-for-beginners
10. girls-night-ideas-that-arent-drinks

(Pattern: `https://planspastfive.com/journal/<slug>`.) Note: `docs/pinterest-pins.csv` has no pin whose destination is the paint-night article (checked 2026-11-19); the other nine have 2-3 pins each, 24 in total.

Indexing is Google's decision. A request is not a promise to index.

## 5. Pinterest verification and pin protocol (no paid promotion)

| # | Step | Who | Hours (owner) | Cost | Prerequisite | Done when |
|---|---|---|---|---|---|---|
| 5.1 | Written yes for Pinterest (item G) | Owner | 0.05 | $0 | Step 1 | Written yes |
| 5.2 | Owner signs in to a (free) Pinterest business account; Cowork gets the domain-claim meta tag token | Owner + Cowork | 0.2 | $0 | 5.1 | Token shown (`p:domain_verify` content value) |
| 5.3 | Claude Code puts the token in `integrations.pinterestVerification` in `src/config/site.ts`, updates the default-asserting tests, deploys (can share the release with 4.3) | Claude Code | 0 | $0 | 5.2 | Meta tag appears in the live page head |
| 5.4 | Owner clicks Claim; Cowork confirms | Owner | 0.1 | $0 | 5.3 | Pinterest shows the domain as claimed |
| 5.5 | Pin scheduling protocol below, per batch | Cowork prepares; owner approves | 0.25 per batch (weekly) | $0 | 5.4 | See protocol |

**Protocol** for the 88 existing assets (`docs/pinterest-pins.csv`, images in `public/pins/`; 75 point to articles, 7 to tools, 6 to shop pages; no new designs):
1. **Pace: at most 3 pins per day**, never more. The CSV's own dates (starting 2027-01-04) are a template and are not used; the plan sets new dates at approval time.
2. **Only pins whose destination page is published and returns 200 on the live domain.** Cowork checks each destination URL immediately before scheduling. A pin whose page is not live is skipped and logged.
3. **Order:** batch 1 = the 24 pins for nine of the ten strongest articles (8 days at 3 per day), then remaining article pins, then tools and shop pages last.
4. **Owner approval per batch** (a batch = up to 7 days of pins, at most 21): Cowork lists file, title, board, destination, date; the owner replies "approved" for that batch only. Cowork schedules only what was approved.
5. Use the CSV `tracked_url` (with its utm parameters) after replacing `{SITE_URL}` with `https://planspastfive.com`. Confirm the pin copy still matches the page (the CSV's `verify_before_posting` column).
6. No paid promotion, no boosting, no group-board spamming, no automation tools beyond Pinterest's own scheduler.
7. If Pinterest warns or restricts the account, stop scheduling and tell the owner.

## 6. Measuring genuine traffic and commercial engagement

**Metrics that count** (read from the source dashboards, with the date range and a screenshot):
| Metric | Source |
|---|---|
| Users, sessions, page views, top pages | GA4 (excluding the owner's test visits) |
| Outbound product-link clicks | GA4 events `product_click`, `retailer_outbound_click`, `affiliate_outbound_click` (from `src/lib/track.ts`); also `shoplist_save`, `kit_interaction` |
| Impressions, clicks, indexed pages, queries | Search Console (Performance and Pages reports) |
| Pin impressions, outbound clicks, saves | Pinterest Analytics |
| Associates clicks, ordered items, qualifying orders | Associates Central reports, **read-only**, as shown. Qualifying sales are what Amazon reports, not what we infer |

**What does NOT count:**
- Estimates, extrapolations, "likely" numbers or projections.
- Bots, crawler and scanner hits; Search Console and GA4 filters apply, but do not claim more than the tool shows.
- **Self-clicks:** the owner must not click her own product links, buy through them, or ask family to. Own orders are excluded by Amazon and would breach the Agreement. Test clicks are done only on a non-affiliate staging build and excluded.
- Traffic from the owner's devices, Claude Code tests or Cowork browsing (record the dates and exclude them).
- Third-party tool guesses (rank trackers, "estimated traffic" sites).

If a number cannot be read from a dashboard, record "no data".

## 7. Weekly performance reporting

Four reports (end of weeks 1 to 4, plus a closing note), one page each, using `docs/launch/WEEKLY-REPORT-TEMPLATE.md`. Cowork reads the dashboards (read-only) and takes screenshots; Claude Code checks the repo-side facts (deploy, tests); the owner reads and signs off (0.25 h). Reports go into `docs/launch/GROWTH-EXPERIMENT-LOG.md` as that week's entry, with the screenshots stored beside it (private; Associates screenshots are not published, see step 8).

## 8. Updating the marketplace package: verified performance only

Applies only if a listing exists (`docs/marketplace/LISTING-DRAFT.md`, `docs/marketplace/final-inspection/LISTING-DRAFT-FINAL.md`).
- Add only figures read from a dashboard, each with the **source, date range and a dated screenshot** (Search Console, GA4, Pinterest).
- If a dashboard has no data or the period is short, **say "no data yet" or "N days of data"**. No projections, no "could earn", no promises of earnings, no conversion or commission figures (Amazon restricts public statements about the program; do not publish Associates reports or rates).
- The listing keeps saying **pre-revenue** unless and until a real, evidenced revenue figure exists and the owner approves the wording. A tracking ID existing is not revenue.
- State plainly that the site was operated for N days, by whom, and what was done (the tallies in the log, kept separate).
- The affiliate account, tracking ID and any earnings history are **not** included in the sale (`docs/marketplace/final-inspection/RIGHTS-AND-TRANSFERABILITY.md`).
- Owner approves the revised listing text (item J) before it is posted anywhere.

| Step | Who | Hours | Cost | Done when |
|---|---|---|---|---|
| 8.1 Draft the changes: figures, screenshots, dates | Claude Code (text), Cowork (screenshots) | 0 owner | $0 | Draft lists each figure with source and date |
| 8.2 Owner review and approval | Owner | 0.5 | $0 | Written yes |

## 9. The six-hour owner budget and stop rule

| Task | Week 1 | Week 2 | Week 3 | Week 4 | Total |
|---|---|---|---|---|---|
| 1 Go-live (domain, mailbox test, make public) | 1.25 | | | | 1.25 |
| 2 Amazon eligibility, reading, tracking ID, test sign-off (only if eligible) | 0.5 | | | | 0.5 |
| 4 GA4 and Search Console | 0.75 | | | | 0.75 |
| 5 Pinterest verification and claim | 0.5 | | | | 0.5 |
| 5 Pin batch approvals (0.25 per batch) | 0.25 | 0.25 | 0.25 | 0.25 | 1.0 |
| 7 Read and sign off weekly report | 0.25 | 0.25 | 0.25 | 0.25 | 1.0 |
| 8 Marketplace update review | | | | 0.5 | 0.5 |
| Buffer (fixes, retries, platform delays) | | 0.5 | | | 0.5 |
| **Total owner hours** | **3.5** | **1.0** | **0.5** | **1.0** | **6.0** |

If the owner is not eligible for step 2 or declines it, its 0.5 h returns to the buffer; do not spend it elsewhere without a new yes. If the budget runs out, work stops; it is not extended without the owner saying so.

**Stop rule:** if by **day 30** there is no indexing or traffic signal (no pages indexed in Search Console, no impressions, and no meaningful GA4 or Pinterest visits excluding the owner), **stop spending time**. Record the result, unschedule nothing further, and keep the site as it is. An earlier stop is also fine at the end of week 2 if Search Console still shows nothing at all and the owner wants her hours back. Stopping needs no justification and is not a failure to be reported as one.

## 10. Three separate tallies (never combined)

Kept in `docs/launch/GROWTH-EXPERIMENT-LOG.md`, as three columns that are never added together or converted into money:
1. **Owner personal working hours:** the owner's own estimate in 0.25 h steps, noted when the work is done. Budget 6.0.
2. **Automated/agent execution hours:** Cowork and Claude Code sessions. **Method:** wall-clock time from the first to last tool action of each session, from session timestamps, rounded to 0.1 h and recorded per session; waiting for the owner or a platform is excluded where noted. This is an estimate, not a bill and not "owner time".
3. **Actual cash expenses:** only from receipts. Currently **$27.16 paid** (domain $12.28 + Private Email $14.88). Planned new cash: $0. Any new charge needs the owner's yes first (item K) and a receipt filed.

The tracker holds the official copies: **Expenses tab for cash, Portfolio Financials for time**. The log points to them and does not replace them.

## 11. Risks and honest limits

- 30 days is too short for organic search traction. New domains typically take much longer to be indexed and ranked; a "no signal by day 30" outcome is normal, not proof the site is weak.
- **Listing while operating changes what can be claimed.** Any figure in the listing must be dated, sourced and current; a stale or rounded-up number can be a misrepresentation. Starting to operate may also change the buyer's view of the account, the domain history and the right price. The owner decides whether the listing is paused, updated or left.
- **The Associates account stays with the seller.** Using it on a site being sold may be restricted by the Agreement; the owner must settle the four questions in step 2 before any tagged link goes live. Failing the 180-day requirement can close the account, which would affect her other sites that use the same master account.
- A **no-sale outcome is possible**, whether or not the site is operated.
- No result is guaranteed: not indexing, traffic, pin reach, clicks, Associates qualification, earnings or a sale.
- Owner exposure: public site means a public contact address, a privacy policy that must match what is on, and analytics consent obligations.
- Frozen scope: no new features, no newsletter, no paid ads. A need for any of them means stop and ask.
- Operating the site costs the owner hours that are not recoverable; the stop rule exists for that reason.
