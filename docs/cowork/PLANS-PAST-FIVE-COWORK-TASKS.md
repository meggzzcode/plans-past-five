# Cowork task pack: Plans Past Five

Written 2026-11-19 by Claude Code. Cowork works in a real browser with the owner's logins. Claude Code cannot do live web research, log in, or read pages that block bots, so these tasks are yours.

## Ground rules (apply to every task)

- Do NOT purchase anything, submit any application, enter payment or tax details, accept any agreement, change account ownership, or publish a listing. Stop and tell the owner if a step needs one of those.
- Stop at any login, CAPTCHA or two-factor prompt and ask the owner. Do not bypass platform restrictions. Do not scrape Amazon or any site that forbids it; read pages the way a person would.
- Never invent a keyword volume, difficulty score, ASIN, price, rating, commission or source. Write NOT FOUND instead. Separate quantitative data from qualitative signals, and say which tool each number came from and the date.
- Never put passwords, codes or tax details in any file. Write the date read next to every fact.
- Work on branch claude/vibrant-dirac-amdf7r only. Write results into the files named below. Do not change site code.
- Return a short report per task: what you did, what you could not do, and every file you wrote.

## Priority order

1. C3 products for the three flagship articles (junk journaling, air-dry clay, mahjong). Everything shoppable waits on this.
2. C4 source checks for those three articles, then the rest.
3. C1 and C2 research briefs.
4. C5, C6, C7 research.
5. C8 and C9 after the owner has a domain and host.

## C1 Audience and keyword research

Files: docs/content/briefs/<slug>.md, one per article in docs/content/ARTICLE-ROADMAP.md (30), plus docs/content/AUDIENCE-RESEARCH.md.
For each article record: primary keyword candidate, related keywords, Google autocomplete suggestions, related searches, People Also Ask questions, Pinterest search suggestions, Google Trends direction if available (note the date range), seasonal pattern, consumer questions from communities (name the community and link), product-related searches, keyword cannibalization risk against our other articles, and the intended traffic source. If a quantitative tool is unavailable, write that and give qualitative evidence only.
Then, for the 50-topic buyer roadmap in docs/buyer/CONTENT-ROADMAP.md, fill the demand-evidence and competition columns the same way and drop weak topics.

## C2 Competitor reading

For each article, read the top competing pages a person can open. Record URL, what they cover well, what they miss, and what we can do better (beginner steps, budgets, supply lists, comparisons). Do not copy wording, photos or proprietary data. Put it in the same brief file as C1.

## C3 Product research and ordinary Amazon links (most important)

Output: docs/commerce/product-research.csv using docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv (the importer is `bun run import:products`). One row per product. Start with the flagship kits: junk journaling (about 10 products), air-dry clay (about 8), mahjong night (about 8). Then the remaining kits and collections until about 60 products in total.
For each product: open the real Amazon.com detail page and the manufacturer page. Confirm the listing matches the brand, product, size, model and variant. Record the ASIN exactly as shown, the clean URL https://www.amazon.com/dp/ASIN (no tracking parameters), manufacturer URL, alternative retailer URL, specs, intended audience, why we chose it, limitations, research sources, date verified, availability. Use the selection weights in docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md and role labels (essentials, researched beginner pick, affordable option, complete starter kit, aesthetic upgrade, nice-to-have, later upgrade).
Rules: no prices, discounts, ratings or review counts in the file. No product images unless the manufacturer or press kit states the usage terms; record imageSource and imageRights or leave blank. If a listing cannot be validated, skip it and note why. Choose attractive and useful over a plain generic option when quality and safety are equal. Check compatibility inside each kit (for example mahjong tiles with the racks and card type for the variant discussed; clay with paints and sealers; adhesive with the paper type).
Safety: for clay, art materials, cycling and sports gear, record the manufacturer's safety statements and do not claim anything beyond them.

## C4 Source verification of article claims

Every draft in src/content/article-*.ts has a coworkChecks list. For each claim, find a reliable source (official or manufacturer page, standards body, recognised publication), record the URL and date, and write one of: SUPPORTED, CORRECT AS (new wording), UNSUPPORTED (remove). Output docs/content/verification/<slug>.md. Do not change the article file. Claude Code applies the edits and sets verifiedAt and sources. Safety statements (clay, art pigments, flowers and pets, cycling, picnic food safety) and the mahjong variant statements need an extra careful read.

Also run C4 on the four articles that are already published (hobbies-to-try-when-life-feels-like-work-sleep-repeat, things-to-do-after-work-instead-of-scrolling, creative-hobbies-you-can-start-at-home, how-to-start-junk-journaling). They have no verifiedAt or sources yet, and sale gate 5 (no placeholder or unverified articles) needs them checked. List every factual claim in each, then verify it as above.

## C5 Amazon-only (affiliate scope narrowed 2026-11-19)

The owner decided Plans Past Five uses Amazon Associates ONLY. Skip every other network and program. C5 is now merged into C6: fill the single `amazon-associates` entry in src/data/affiliate-programs.ts via docs/commerce/affiliate-research.md (program URL, application requirements, commission structure by category, cookie duration, payment requirements, promotional restrictions, approval requirements, multi-website account policy, account transfer restriction, recommended timing, buyer activation steps), from official Amazon pages only, with source URL and date. Do not apply.

## C6 Amazon Associates and cart research

Read https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM and https://affiliate-program.amazon.com/help/operating/policies. Record: current qualifying-sales rule and window, the exact required Associates identification wording, rules for tracking IDs and multiple sites under one account, rules for links and price display, what happens to the account on a sale. Then research whether Amazon officially supports an affiliate-compatible add-to-cart or multi-product cart mechanism today (Associates documentation, Creators API, any current official method). Do not rely on old tutorials. Write findings in docs/commerce/AMAZON-CART-RESEARCH.md and the disclosure wording in docs/commerce/AMAZON-DISCLOSURE.md. Claude Code will replace the TODO-VERIFY constants in src/config/affiliate.ts only from these notes.

## C7 Resale market research

Output docs/marketplace/FLIPPA-RESEARCH.md (and notes on other marketplaces). Read the official Flippa pages on listing and sale pricing and on potential revenue claims for sites without revenue (the two URLs in the owner's plan). Record fees, listing requirements and revenue-claim rules with dates. Find completed sales of comparable lifestyle, hobby, affiliate-ready or pre-revenue sites. Separate asking prices, auction bids, unsold listings and verified completed sales. Never present asking prices as sales. Do not list or contact anyone.

## C8 Account setup in the owner's logins (after domain and host exist)

Search Console domain property, sitemap submission, Bing import, GA4 property with custom dimensions and key events (event names are in src/lib/track.ts), Pinterest Business account and website claim. Follow docs/buyer/ANALYTICS-SETUP.md and docs/buyer/PINTEREST-SETUP.md. Record IDs in src/config/site.ts only by telling Claude Code. Blocked until the owner chooses a host and connects the domain.

## C9 Production QA after deployment

On the live URL: open every page on desktop and a real phone-width browser, run the user journeys (quiz, planner, tools, shop list), run PageSpeed Insights or Lighthouse (label them lab data, not real-user data), capture screenshots for the buyer presentation, and record a short walkthrough video if the tool supports it. Report defects as a list; do not edit code.

## C10 Image and asset rights

List any image or product photo you propose to use and the exact terms that allow us to publish and transfer it. Default is photo-less product cards. Record in docs/IMAGE-LICENSES.md style table in docs/commerce/image-rights-notes.md.

## C11 Source and download images

Source the images listed in docs/content/IMAGE-SOURCING-BRIEF.md (the 7 weak matches first, then the rest). Use Unsplash, Pexels or Pixabay in the owner's browser, or generate with the owner's Canva or Lovable when quota allows (the crochet hero is an existing Canva AI image: download https://www.canva.com/M/MAHbXvOeP98 in full resolution). Save each file (at least 1600 px wide, the largest or original size offered) in docs/content/incoming-images/ and fill docs/content/new-images.csv from docs/content/new-images.template.csv, one row per image.
For every image: read the site's licence page yourself and record the licence name, the licence URL, the image page URL as sourceUrl, the creator's name and the date you sourced it. Never invent a licence. Label AI-generated images as such (source "Canva AI" or "Lovable AI" and licenseName that says "AI-generated"). Do not claim the licence is transferable to a buyer; record the licence terms only.
Skip anything with visible brands, logos, text or watermarks, copyrighted product photos, or identifiable minors. Match the topic exactly. Prefer images that visually match our existing 14 (warm, film-like, gingham, cherry red, butter yellow, strawberry pink, garden green). Each image is the hero of at most one article; a photo may appear on at most two pins.
Do not edit code or articles and do not run the ingest script. Report what you could not find (slug and reason) so Claude Code can run `node scripts/ingest-images.mjs --check` and then ingest.

---

# Refinement phase (added 2026-11-19): customer experience and commercial desirability

Same ground rules as above. Never purchase, apply, enter payment or tax details, accept agreements or publish listings.

## C12 Product desirability and authorised photography
For every product in docs/commerce/product-research.csv and src/data/catalog.ts: (1) re-open the Amazon.com page and manufacturer page and confirm the listing still matches; (2) say in one line whether our audience (women 22-40, after-work hobbies, aesthetic-minded, budget-aware) would actually want it, and suggest a better, prettier or better-value alternative when one exists (give ASIN, clean URL, manufacturer URL, why); (3) find the manufacturer's official press/media kit or brand-asset page and record whether product photos may be used by a publisher, with the exact terms and URL. Do NOT download or hotlink Amazon product images (Associates terms restrict them) and do not use AI images in place of a real product. Output docs/commerce/PRODUCT-DESIRABILITY-REVIEW.csv (columns: productId, asin, keep_replace_drop, audience_fit_note, alternative_asin, alternative_url, manufacturerImageTerms, manufacturerImageTermsUrl, dateChecked) and docs/commerce/product-photo-permissions.md.

## C13 Download Canva originals and ingest list
Open each link in docs/content/CANVA-ASSETS.md, download the largest original, save into docs/content/incoming-images/ with the slug names the log gives, and fill docs/content/new-images.csv (source "Canva AI", licenseName "AI-generated"). Read Canva's current content licence terms and record whether AI-generated images may be used commercially and transferred with a sold site (exact wording, URL, date; no legal conclusions).

## C14 Real-human usability test
Prepare (do not run on real people without the owner): use docs/marketplace/USABILITY-TEST-SCRIPT.md. If the owner approves, run it with 3-5 real women and record results without names.

## C15 Contact email and corrections inbox (owner action, Cowork helps)
The owner creates hello@ on the chosen domain; Cowork sends and receives a test message both ways in the owner's mailbox and reports. Claude Code publishes the address only after that passes.

## C16 Source check of the 4 original published articles and the 5 drafts
Finish C4 for hobbies-to-try-when-life-feels-like-work-sleep-repeat, things-to-do-after-work-instead-of-scrolling, creative-hobbies-you-can-start-at-home, how-to-start-junk-journaling, and the 5 drafts. Output docs/content/verification/<slug>.md as before.

## C12 priority list (from the commerce refinement, 2026-11-19)
Eight kits currently show no products because their items are only candidates. Verify these first so the shop is not empty: reading journal, craft night, book club, picnic, flower arranging, pickleball, tennis, cozy night in. Also see docs/commerce/DESIRABILITY-AUDIT.md (12 items needing live research: unknown brands, the crochet kit, the tennis racket candidate). 25 products are candidates and 6 verified products are held for audience fit (kid-marketed clay, kids' clay tools, Apple Barrel paint, three washi options): suggest better-looking replacements.

## C17 Pages CMS first live test (owner's GitHub login)

Goal: prove the browser editor configured in `.pages.yml` works on the real repository. Do NOT change production content.
1. In the owner's browser open https://pagescms.org and sign in with the owner's GitHub account (the owner approves any GitHub prompt; never type or store their password).
2. Add the Plans Past Five repository and pick the branch for the test: preferably create a scratch branch (for example `cms-test`) in GitHub first; if a scratch branch is not possible, use the main branch ONLY for a throwaway draft article (Status Draft, slug `cms-test-delete-me`) and delete it afterwards.
3. Confirm the left menu shows Articles and Images, and that each article opens without a configuration error. Note any field that renders oddly (Top picture drop-down, Related articles, the block list for the body).
4. Test edit: in the throwaway draft (create it with all required fields, Status Draft), add one block of each of at least five types, save, and check the commit that appears in GitHub is a single small JSON change under `content/articles/`. Add one test image with a description under Images (a small free image, scratch branch only).
5. Check the Netlify deploy preview or deploy log for that branch: the content check should pass. Then deliberately save a second throwaway edit with a source address missing `https://` and confirm the build fails with a plain-English message and that the previous production deploy is untouched.
6. Delete the throwaway article and image (or leave them on the scratch branch). Do not merge the scratch branch.
Report: what worked, screenshots or the exact text of any error, whether Pages CMS rewrote the JSON in a different key order or format than the files in the repo, whether blank fields were written as empty strings, and anything in `.pages.yml` that needs changing. Do not edit code or `.pages.yml` yourself.


## C18 Netlify credit check (added 2026-11-19)
On the plans-past-five Netlify project: read the Usage page and report credits used so far this cycle and per deploy; confirm whether builds skipped by the `ignore` command in netlify.toml (it skips unless the commit message contains the deploy marker) consume any credits; confirm whether auto publishing is on and whether the production branch is still claude/vibrant-dirac-amdf7r; after Claude Code merges to main, change the production branch to main. Report only; change no plan or billing setting.


## C19 Publisher filing rules (added 2026-11-19; run ONLY after the owner names their state)
Do not start until the owner has told you which state (or country) they will publish from and which option from docs/buyer/PUBLISHER-SETUP.md they are considering. Never guess the state.
1. Using only official pages (the state's Secretary of State or business-registration site, and the county or city page if the state delegates DBA filing), read the CURRENT rules for (a) registering an assumed name / DBA as a sole proprietor and (b) forming an LLC.
2. For each, record: what must be filed and where, the filing fee, any renewal period and fee, any publication requirement, whether a registered agent is required, and whether a PO box or mail-forwarding address is accepted as the public address. Quote the exact wording that matters.
3. Give every fact the official URL and the date you read it. Mark anything you could not find as NOT FOUND. Do not give legal or tax advice, do not pick an option for the owner, and do not file, pay, apply or enter any personal details.
Output: docs/buyer/PUBLISHER-FILING-RULES-<state>.md. Do not edit code.
