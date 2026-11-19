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

## C5 Affiliate program register
Fill the research fields for every entry in src/data/affiliate-programs.ts into docs/commerce/affiliate-research.md, using only official program pages: Amazon Associates, Awin, Impact, CJ, Rakuten Advertising, Ascend, AvantLink, Etsy, Walmart, Target, Michaels, Blick, Cricut, Skillshare, Udemy, Domestika, ClassBento, Viator, GetYourGuide. For each: program URL, network, application requirements, commission structure, cookie duration, payment requirements, product categories, promotional restrictions, approval requirements, multi-website account policy, account transfer restriction, which of our pages fit, recommended timing, buyer activation steps, and source URL plus date. Do not apply. Do not name commission figures to third parties if a program's terms make them confidential.

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
