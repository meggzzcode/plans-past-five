# Cowork final pack: Plans Past Five (single consolidated handover)

Replaces the earlier pieces (COWORK-MASTER-PROMPT-PATH-TO-8.md, the F1-F19 addenda and the Netlify prompt) with one document. Older files stay in the repo as history; this file is the one to follow. Written 2026-11-19 by Claude Code.

**Run this only after Claude Code reports "CODE COMPLETE: READY FOR COWORK" and names the release commit.** Until then Claude Code is still editing the repo and your pushes would collide.

---

## 0. Ground rules (apply to every task)

1. **Do NOT:** purchase anything, enter payment or tax details, accept an agreement or terms of service on the owner's behalf, submit an affiliate application, activate real affiliate tracking, buy or transfer a domain, change account ownership, publish a marketplace listing, accept an offer, send an email or message to a third party, publish or schedule real Pinterest pins, or change repository visibility, unless the owner explicitly says yes to that exact step in chat.
2. **Stop and ask the owner** at any login, CAPTCHA, two-factor prompt or payment screen. Say in one line exactly what you need.
3. **Never invent** an ASIN, price, rating, review count, licence, source, sale, fee, traffic number or approval. Write NOT FOUND (and why) instead. Date every fact (YYYY-MM-DD) and record the URL it came from. Separate verified facts, inaccessible information and assumptions.
4. **Never put** passwords, tokens, codes, tax data or personal account details in any file, screenshot or message.
5. **Do not scrape** Amazon or any site that forbids it. Read pages the way a person would in the owner's browser. Do not save, screenshot into the repo, or hotlink Amazon product images. Do not use manufacturer photos without written permission.
6. **No shared-code edits.** Do not edit site source code. If you find a defect, send Claude Code a defect packet (section 6) instead. Data-only hand-backs go in the files listed in section 5.
7. **Branches:** work on branches named `cowork/<task>` (for example `cowork/product-verification`). Never push to `main` or to `claude/vibrant-dirac-amdf7r`. Tell the owner which branch you pushed.
8. **Scope is frozen.** No newsletter, no calendar integration, no printables, no premium digital products, no customer accounts, no databases, no paid advertising, no new tools, no redesign, no Amazon cart integration, no real affiliate tracking. Do not treat these as missing deliverables. The master affiliate accounts are NOT part of the sale.
9. **Do not reveal** earlier reviewer scores to new reviewers (workstream K).
10. **Report per workstream:** done / partly done / not done / blocked, files written, branch name, and anything the owner must decide.

## 1. Facts you can rely on (check them against the repo before trusting)

- Site: women's lifestyle publication. **32 published articles, 2 outline drafts**, 43 hobbies, 8 shop collections, 8 kit configurations (only junk journaling and air-dry clay are complete kits today), 10 interactive features, 88 Pinterest assets with a CSV, 12 logos and 11 fonts.
- Products: `docs/commerce/product-research.csv` is the ONE canonical product file (about 64 records: 37 verified listings, about 27 candidates; 29 products are shown publicly). "Verified" means the Amazon listing was checked against brand and product. It does NOT mean quality was researched or that the listing is live today.
- Amazon links are ordinary `https://www.amazon.com/dp/<ASIN>` links. Affiliate tracking is OFF and must stay off. Copied, printed and exported shopping lists contain no Amazon URLs by design.
- Hosting: Netlify project `plans-past-five` (created earlier by Cowork; see `docs/cowork/NETLIFY-FIRST-DEPLOY-LOG.md`). The site is private. `netlify.toml` builds only when the latest commit message carries the release marker (the word deploy in square brackets); otherwise builds are skipped to save credits (free plan: 300 credits a month, about 15 per production deploy).
- Content editing: articles and images are data files edited by Pages CMS (`.pages.yml`, `content/`). A CMS save is "Saved" only; publishing is a separate, deliberate step (see workstream G). Not yet tested with a real login.
- Domain and email: **outstanding owner actions**. The plan is in `docs/launch/DOMAIN-EMAIL-SETUP.md` (planspastfive.com, hello@ mailbox). Nothing is bought.
- No named publisher details will be supplied. The "Published by" line stays empty by design and the buyer sets their own.
- The release commit, branch and test results are recorded in `docs/marketplace/final-inspection/RELEASE-HANDOVER.md` (Claude Code fills this at freeze). Re-verify nothing there; just use that commit.

## 2. Order of work and what can run in parallel

**Wave 1: start immediately, all in parallel, no owner needed** (they produce separate files):
- A. Live Amazon verification of every shown product
- B. Kit completion and buy-plan verification (sentiment and listings)
- C. Article source verification
- D. Licensing and visual-asset rights
- E. External business facts (hosting, costs, services, fees)
- F-pre. Domain and mailbox price and DNS preparation (no purchases)
- I. Pinterest asset verification (no posting)
- J. Marketplace research (comparable sales)
- Trademark screening (part of F)

**Wave 2: needs the owner for logins or approvals:**
- G. Netlify settings and the real CMS test (owner present for GitHub and Netlify logins)
- F. Domain registration and mailbox (owner pays; you do the setup steps they authorise)
- N. Repository visibility change (owner approval, after the sanitized buyer package is final)

**Wave 3: consolidate and apply data-only updates (Claude Code does the import; you validate):**
- Hand A, B and C results to Claude Code as validated files (section 5). Claude Code imports products, updates article text, re-runs tests and freezes a new release candidate.

**Wave 4: needs the final deployed site (after ONE release deploy, which the owner approves):**
- H. Live SEO and production verification
- K. Blind customer and buyer re-reviews on the live URL
- L. Screenshots, walkthrough video and the marketplace package
- M. Tracker update (can also be done earlier with a pending packet)

Do not do a production deploy until Wave 3 changes are integrated. Do not do multiple production deploys: the credit budget is about 8 a month.

## 3. What the owner has to do (everything else is yours or Claude Code's)

1. Buy the domain (about $12) and the mailbox plan following `docs/launch/DOMAIN-EMAIL-SETUP.md`, or tell Cowork to stop at that step.
2. Be present for logins and two-factor prompts when Cowork sets up Netlify, Pages CMS (GitHub), Search Console and Pinterest.
3. Approve, in chat, each action in the "Do NOT" list above before Cowork performs it (for example making the repo private).
4. Decide whether to text the usability script to 3 to 5 friends (workstream K2).
5. Answer pricing and support questions when the marketplace package is ready.

## 4. Workstreams

### A. Live Amazon product verification (priority 1)

**Input:** `docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv` (29 shown products, plus 17 kit candidates with blank ASINs) and `docs/commerce/product-research.csv`.
**For each shown product:** open `https://www.amazon.com/dp/<ASIN>`, confirm it is the same brand, product and variant as our row, confirm it is available (record "in stock / unavailable / not determinable"), confirm the ASIN as displayed, the clean URL, relevant specifications, and find the manufacturer page if one exists. Record the date and the URLs you read.
**Check first:** the two National Mah Jongg League card listings (the "four-pack" claim is unconfirmed; the card is year-specific), the two mahjong sets, and the Scotch glue stick (its "photo-safe" claim is disputed in our own notes).
**Outcomes per row:** OK / CHANGED (say what) / UNAVAILABLE / MISMATCH / REPLACE (suggest a legitimate replacement with ASIN and why). If a claim cannot be supported, say so and give corrected wording. Do not buy anything.
**Output:** `docs/commerce/FINAL-LISTING-VERIFICATION.csv` with columns: productId, asin, amazonUrl, manufacturerUrl, productMatches (yes/no), variant, availability, outcome, correctedClaim, supportingUrls, dateVerified, notes. No prices, ratings, review counts or deal wording anywhere.
**Done when:** every shown product has a dated outcome and every REPLACE has a proposed alternative.

### B. Kit completion and buy-plan verification (priority 1)

Owner direction: every article and activity should have a recommended buy (an "event elevator" or a "hobby helper"), picks must be genuinely good (well reviewed, positive sentiment), reasonably priced for beginners (budget or mid tier, never premium or expert gear), with a START option and, where sensible, a beginner STEP-UP.
**Inputs:** `docs/commerce/KIT-COMPLETION-PLAN.md`, `docs/commerce/kit-candidates-for-cowork.csv` (17 rows), `docs/commerce/buy-plan/BUY-PLAN-1.md, -2.md, -3.md` and `candidates-1.csv, -2.csv, -3.csv` (about 200 rows with duplicates across articles; de-duplicate by brand and product name), and the kit slot names in `src/data/kits.ts` (read only).
**Priority order:**
1. racquet sports (pickleball paddle and balls, tennis racquet and balls)
2. crochet hook (Clover Amour starter, Susan Bates alternative)
3. mahjong card sleeve and any missing mahjong equipment for the American version
4. watercolor (one more slot) and paint night (acrylic paint plus one more pick)
5. the rest of the buy-plan candidates, starting with the ten strongest commercial articles: junk-journaling supplies, mahjong night, how to start junk journaling, paint night, creative hobbies at home, at-home creative weekend, craft night, creative starter kits, pickleball for beginners, girls' night ideas.
Do NOT work on the reading/book-club and picnic kits unless better evidence exists (they stay "Where to start" cards).
**For each candidate:** open the live Amazon.com listing and identify the exact product; record ASIN as shown, clean `/dp/` URL, manufacturer URL, availability. READ the customer reviews and Q&A and write a QUALITATIVE sentiment summary in `sentimentSummary` (what buyers consistently praise, common complaints, whether it suits a beginner, counterfeit or knock-off warnings, safety complaints) plus a price tier (budget / mid / premium) judged against the alternatives you saw. Keep **listing verification** separate from **quality research**: record quality sources (independent buying guides, manufacturer pages) with URLs. REJECT or REPLACE any pick with consistently poor sentiment, quality or safety problems, or that looks overpriced for what it is, and say why. Read the manufacturer's safety page for anything involving heat, cutting, paint or clay, helmets, glue guns, batteries or hot liquids, and record the safety statement.
**Never write** star ratings, review counts, prices, discounts or deal wording in any field (the importer rejects them and the site never shows them).
**Output:** `docs/commerce/buy-plan/VERIFIED-QUEUE.csv` using the exact columns of `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv` (read `PRODUCT-RESEARCH-TEMPLATE.md` for every allowed value) plus these extra columns at the end: sentimentSummary, qualitySources, decision (keep / replace / drop), articleSlug, tier (start / step-up). Validate with `bun scripts/import-products.mjs <your file> --check` (it never writes with `--check`). Do not invent your own spreadsheet format and do not edit the importer. The `role` column must be exactly one of: essential, complete-kit, researched-pick, affordable, aesthetic-upgrade, nice-to-have, later-upgrade (an earlier Cowork push used `alternative`, which the importer rejects; use `affordable` or `researched-pick` for alternatives).
**Done when:** each priority kit has a verified START pick and a sensible alternative, every drop or replace has a reason, and the file passes `--check`.

### C. Article source verification

**Input:** `docs/content/verification-final/OPEN-CLAIMS-FOR-COWORK.md` (every unresolved claim: the four originally published articles and the weaker claims in the five newly published ones), plus `ORIGINALS-CHECKED.md` and `DRAFTS-RESOLVED.md` for what has already been sourced.
**For each claim:** find a reliable source (manufacturer or official page, standards body, recognised publication), record the URL and the date, and write SUPPORTED, CORRECT AS (give the exact corrected wording) or UNSUPPORTED (remove or soften). Safety statements first: clay and food contact, flame and heat, art-material safety, needles and hooks, helmets, and the mahjong version statements.
**Output:** `docs/content/verification-final/COWORK-SOURCE-RESULTS.md` as a table: slug | claim | source URL | date checked | status | corrected wording | publish OK? Do not edit the article files. Claude Code applies the edits, sets dates and rebuilds.
**Rule:** do not recommend keeping an article published with an unresolved material factual or safety claim.

### D. Visual assets and licensing

**Input:** `docs/marketplace/final-inspection/RIGHTS-AND-TRANSFERABILITY.md`, `docs/content/IMAGE-LICENCE-LEDGER.md`, `docs/content/CANVA-ASSETS.md`, `docs/IMAGE-LICENSES.md`.
**Read, live, the current official terms** for: Lovable (ownership and transfer of generated output; the Terms assignability clause), Canva (AI-generated images, commercial use, transfer and design-file rules), stock sites if any were used, Google Fonts / SIL OFL for Fraunces, DM Sans and Caveat, and Pinterest's policy on labelling AI-generated images. Record the exact wording, URL, date and plan or tier in force; say 403/NOT FOUND where unreachable. Do not give legal conclusions.
**Output:** `docs/cowork/ASSET-RIGHTS-REGISTER.md`: one row per asset group (18 site images: 14 Lovable, 4 Canva plus the 21 hobby card images; 88 pins; logos; fonts; templates; editable design files) with source, evidence, commercial-use status, transferability status, what the buyer must obtain independently, and a replacement recommendation if needed. Do not claim exclusive copyright over AI-generated material. Draft (do not send) product photo permission emails to 6 to 10 brands in `docs/commerce/photo-permission-emails.md`, with each brand's press or media page URL and its stated usage terms.

### E. External business facts

Verify from official pages, with URL and date, and record in `docs/marketplace/final-inspection/COWORK-READ-LIVE.md`:
- Netlify: free-plan credits, cost per production deploy, bandwidth credits, what happens at the cap (this is currently only supported by forum reports), commercial-use terms, deploy previews and branch deploys settings, whether a skipped build costs credits, and whether "Trigger deploy" runs a build even when the commit message has no release marker.
- Registrars and renewals: Namecheap, Cloudflare Registrar, Porkbun (first-year and renewal for a .com).
- Email: Cloudflare Email Routing (receive and forward only, free limits), Namecheap Private Email (receive AND send, alias limits), Zoho Mail, Google Workspace: which options support both receiving and sending.
- Pages CMS availability, free limits and requirements; GA4, Search Console, Bing Webmaster Tools, Pinterest business tools; Amazon Associates program policies (offline and printed-material restrictions, content "within 60 days" rule, 3 qualifying sales within 180 days to remain approved, the Creators API sales threshold, image rules).
- Other affiliate opportunities worth listing in the buyer roadmap (programs and their official terms; do not apply).
Mark each fact: VERIFIED / INACCESSIBLE / ASSUMPTION.

### F. Domain, business email and trademark screening

**Input:** `docs/launch/DOMAIN-EMAIL-SETUP.md`.
1. **Now (no purchase):** confirm current domain and mailbox prices and renewal prices, what the mailbox plan allows (receiving and sending, aliases), the DNS records Netlify will ask for, and whether a lower-cost setup supports both receiving and sending.
2. **Trademark and name screening** for "Plans Past Five": USPTO search, state searches, domain and social handle availability. Save as `docs/marketplace/TRADEMARK-KNOCKOUT.md` labelled "screening only, not legal clearance".
3. **After the owner buys:** add the domain in Netlify, list the exact DNS records for the owner (enter them only if the owner is logged in at the registrar and says so), confirm HTTPS and the www/apex redirect. Create `hello@planspastfive.com`. Send and receive a test message both ways and run the corrections-contact workflow (a message to hello@ arrives and a reply goes out). Only then tell Claude Code to set the contact address (`site.contactEmail`); the address must not be published before it works.

### G. Hosting and the real CMS test

**Input:** `docs/buyer/CMS-SETUP.md`, `docs/buyer/CMS-TEST-PLAN.md` (a 16-row pass/fail table; follow it exactly), `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`, `netlify.toml`, `.pages.yml`, `RELEASES.md`.
1. **Netlify settings:** switch the production branch to `main` once Claude Code has merged the release to `main` (see RELEASE-HANDOVER.md); keep previews off, "deploy only the production branch" on, and the site private until the owner approves public. Check the environment settings are empty (the preset is set in `netlify.toml`). Read the Usage page and record credits used.
2. **CMS test with the owner's GitHub login**, on a throwaway draft article: create a draft; edit it; upload a test image with alt text; confirm the validator refuses a missing alt text; diff the saved JSON against the original to confirm existing fields are preserved; confirm the draft is NOT public; publish through the documented workflow; verify the result on the live or preview URL (page, sitemap, metadata); unpublish; remove all test content; verify the final production state matches the starting state.
3. **Answer these questions explicitly in the log:** Does Netlify's "Trigger deploy" build despite the missing release marker? Does a skipped build cost credits? Can the owner publish with one click as documented? If "Trigger deploy" shows Skipped, report it so Claude Code can make the `RELEASES.md` marker commit the primary method.
4. **Deployment and rollback:** perform ONE release deploy (with the owner's approval, after Wave 3 is integrated), then test rollback (Deploys, Publish deploy on an earlier deploy), and record credits before and after.
5. **Product management and affiliate configuration:** judge honestly whether a non-technical buyer can add a product (CSV import needs a command line) and replace affiliate IDs (config file) without new infrastructure, and say exactly which steps need a developer.
**Output:** `docs/cowork/CMS-LIVE-TEST-LOG.md` (fill the pass/fail table from the test plan, attach the recording if the tool supports it) and `docs/cowork/NETLIFY-LIVE-LOG.md`. If you find a code defect, send a defect packet; do not redesign anything. Do not claim the CMS is fully operational beyond what you actually tested.

### H. Live SEO and production verification (after the release deploy and the domain)

On the final site verify: HTTPS and certificate; canonical URLs; production metadata and Open Graph/Twitter tags; sitemap.xml (published pages only, no drafts); robots.txt; noindex rules; redirects (www/apex, trailing slash); broken links (crawl all internal links); security headers on server-rendered responses (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, plus anything in `public/_headers`); mobile rendering at 390 and 320; article, shop, hobby, quiz, planner and saved pages; the contact address. Run Lighthouse or PageSpeed on the home page and one article, repeat each at least 3 times, and label results "lab data, not field data" with the test environment. The desktop home page was slower than expected in local tests; record whether the live host shows the same. Set up Search Console (domain property), submit the sitemap, Bing import and Pinterest claim only with the owner present. Do not fabricate indexing or traffic data and do not wait for months of history.
**Output:** `docs/marketplace/final-inspection/LIVE-QA.md`.

### I. Pinterest marketing assets

Review the 88 pins (`public/pins`, `design/pins`, `docs/pinterest-pins.csv`): files exist, sizes (2:3), titles and descriptions, board assignments, destination URLs (must point to published pages, never to drafts or removed routes), tracking parameters, schedule CSV, variety, and image rights (see workstream D). After the domain exists, report which URLs must change. Two published articles still lack their own pin (paint-night and reading-journal): list them. Pinterest's AI-image labelling rule: record the current policy. Do not publish or schedule live pins.
**Output:** `docs/marketplace/final-inspection/PINTEREST-VERIFICATION.md`.

### J. Marketplace research

Find completed sales of starter, pre-revenue or new content/affiliate sites on Flippa and other marketplaces. Record separately: verified sold price, asking price, auction bid, unsold listing, self-reported sale, speculative valuation. Read the current Flippa pricing, listing fees, success fees, verification steps, and the cap for starter or non-revenue listings (these were not readable before; the owner's two URLs were never in the repo, so search Flippa's help centre). Read escrow fees (escrow.com: 2.6% with a $50 minimum was seen) and payment fees. Do not invent comparable sales. Recommend a realistic asking price and negotiation range with the evidence. Do NOT publish a listing or accept an offer.
**Output:** `docs/marketplace/final-inspection/COWORK-MARKETPLACE-RESEARCH.md`. Claude Code uses it for the pricing sensitivity table ($995, $1,495, $1,995, $2,495, $2,950).

### K. Final live customer and buyer inspection (after the release deploy)

K1. **Five blind customer reviews** on the live URL: tired nine-to-five professional (phone); woman seeking a creative hobby; woman planning with friends; budget-conscious woman planning a weekend; woman shopping for beginner supplies. Use the task lists in `docs/marketplace/final-inspection/REVIEWER-BRIEFS.md`. **Do not show reviewers earlier scores or the fix list.** Score first impression, aesthetic appeal, navigation, editorial authenticity, usefulness, trust, product desirability, willingness to purchase supplies, willingness to return, willingness to share, business credibility. Record reproducible problems and where interest drops.
K2. **Three buyer reviews:** first-time online buyer, affiliate investor, lifestyle creator. They read the buyer package and inspect the live site. Willingness to purchase is hypothetical.
K3. **Human usability packet:** turn `docs/marketplace/USABILITY-TEST-SCRIPT.md` into a one-page message the owner can text to 3 to 5 friends, plus an anonymous answer sheet, saved as `docs/marketplace/USABILITY-FRIEND-PACKET.md`.
Label all AI reviewer output "simulated sentiment, not customer research or marketplace demand". Report material blockers as defect packets.
**Output:** `docs/marketplace/reviews4/`.

### L. Marketplace asset package

Real screenshots (not mock-ups) at 1280 and 390 into `docs/marketplace/presentation/screenshots/`: home, a hobby profile, an article, the shop and a collection, product cards, the quiz and its result, the planner and its result, saved items, the CMS workflow. A 5 to 10 minute walkthrough video if the tool supports recording (home, quiz, planner, shop, saving, an article, a CMS edit and publish). No credentials, emails or personal data on screen. Then assemble with Claude Code's drafts (`LISTING-DRAFT-FINAL.md`, `POST-SALE-SUPPORT-PROPOSAL.md`, `OPERATING-COSTS-VERIFIED.md`, buyer FAQ, transfer checklist). Do NOT publish the listing.

### M. Portfolio tracker

Update the existing Google Sheet (https://docs.google.com/spreadsheets/d/1QOJUmpNAwb9KEJa1x98QHa31r2DUZrsko74dHz_IqGo/edit): never create another spreadsheet, preserve formulas, formatting and data. Use Claude Code's update packet (`docs/cowork/TRACKER-UPDATE-PACKET.md`, written at freeze) and record: website status, completed implementation, verified assets, actual expenses, outstanding items, domain and email information, affiliate readiness, final scores, asking price recommendation, lessons learned, reusable system improvements. If the sheet is not accessible, leave the packet as the pending update.

### N. Repository visibility (owner approval required)

The repository was public so an independent audit could read it. After the sanitized buyer package is final, and ONLY with the owner's explicit yes: report the current visibility, set the repo to private, confirm Netlify can still build from it, and report what changed. Do not imply this removes existing copies or forks. Do not add an open-source licence.

## 5. Hand-back files (so Claude Code can integrate without guessing)

| Workstream | Deliverable file | Who applies it |
|---|---|---|
| A | `docs/commerce/FINAL-LISTING-VERIFICATION.csv` | Claude Code updates product-research.csv, re-imports, re-tests |
| B | `docs/commerce/buy-plan/VERIFIED-QUEUE.csv` (passes importer `--check`) | Claude Code imports, adds picks to kits and shop blocks, keeps incomplete kits as "Where to start" |
| C | `docs/content/verification-final/COWORK-SOURCE-RESULTS.md` | Claude Code edits articles, sets verifiedAt |
| D | `docs/cowork/ASSET-RIGHTS-REGISTER.md`, `docs/commerce/photo-permission-emails.md` | Claude Code updates the rights docs; owner sends emails if wanted |
| E | `docs/marketplace/final-inspection/COWORK-READ-LIVE.md` | Claude Code updates costs and buyer docs |
| F | `docs/marketplace/TRADEMARK-KNOCKOUT.md`, mailbox test result | Claude Code sets contact config |
| G | `docs/cowork/CMS-LIVE-TEST-LOG.md`, `docs/cowork/NETLIFY-LIVE-LOG.md` | Claude Code adjusts docs or config |
| H | `docs/marketplace/final-inspection/LIVE-QA.md` | defect packets to Claude Code |
| I | `docs/marketplace/final-inspection/PINTEREST-VERIFICATION.md` | Claude Code updates pin destinations |
| J | `docs/marketplace/final-inspection/COWORK-MARKETPLACE-RESEARCH.md` | Claude Code updates pricing |
| K | `docs/marketplace/reviews4/`, `docs/marketplace/USABILITY-FRIEND-PACKET.md` | defect packets to Claude Code |
| L | `docs/marketplace/presentation/` | owner |
| M | the Google Sheet | owner |

## 6. Defect packet (use this when you find a code problem)

One file per batch, `docs/cowork/DEFECT-PACKET.md`, one entry each: title; page or tool and URL; exact steps to reproduce; expected vs actual; viewport or browser; severity (blocker / medium / low); screenshot name; whether it blocks listing. Claude Code fixes the narrow items, re-runs affected tests, and freezes a new release candidate. Do not reopen the whole project and do not redesign from subjective preference.

## 7. Done checklist for Cowork

- A: all shown products dated and classified; replacements proposed.
- B: priority kits have verified start picks; file passes `--check`.
- C: every open claim has a status and corrected wording.
- D: rights register complete with live terms and dates.
- E: read-live facts recorded.
- F: screening done; domain and mailbox done only if the owner authorised; test emails passed.
- G: real CMS test and ONE deploy and rollback logged; Trigger-deploy question answered.
- H, K, L: live QA, blind reviews and package done on the final site.
- I, J, M, N: pin verification, marketplace research, tracker update and (with approval) repo visibility done.

## 8. Ready-to-paste prompt for Cowork

> You are Cowork working in the owner's logged-in browser on the repo meggzzcode/plans-past-five. Read `docs/cowork/COWORK-FINAL-PACK.md` in the repo fully and follow it exactly. Work in `cowork/<task>` branches only. Start Wave 1 (workstreams A, B, C, D, E, F-pre, I, J) in parallel now; they need no owner time. Do not purchase, accept agreements, enter payment or tax details, apply for anything, send email, publish, schedule pins, change ownership or visibility, or edit site code. Stop at every login, CAPTCHA or two-factor prompt and ask the owner in one line. Never invent ASINs, prices, ratings, sources, licences, sales or traffic: write NOT FOUND. Write results only to the files named in section 5, date every fact, and report per workstream when done.
