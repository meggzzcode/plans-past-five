# Digital products: free downloads and premium kits

Status labels: COMPLETED = built and tested here. RECOMMENDED = a suggestion for the owner. NEEDS OWNER = owner decision or review. NEEDS COWORK = must be verified live in a browser.

## 1. What exists (COMPLETED)

### Six free downloads (public, no email gate, no data collection)
Real PDFs rendered with Chromium from editable HTML. Served from `public/downloads/`, offered at `/printables` and `/printables/<slug>` with Download PDF, Open print view and page previews.

| Slug | Title | Pages |
|---|---|---|
| hobby-era-tracker | Find Your Hobby Workbook | 8 |
| out-of-office-bucket-list | 30-Day Hobby Challenge (includes the 50-item bucket list) | 6 |
| weekend-edit-planner | Weekend Adventure Planner | 5 |
| solo-date-idea-cards | Solo Date Idea Cards | 6 |
| creative-hobby-starter-checklist | Creative Hobby Starter Checklist | 5 |
| girls-night-hosting-planner | Girls' Night Hosting Planner | 6 |

The first three slugs were kept from the original web printables so existing article links keep working; the titles of two changed because the products grew (articles still call them "My Hobby Era Tracker" and "The Out-of-Office Bucket List"; update that link text when convenient).

### Two premium kits (prepared, NOT for sale, NOT linked anywhere public)
| Kit | PDFs | Pages | Package |
|---|---|---|---|
| The Plans Past Five Hobby Era Kit | 9 | 75 | `design/kits/hobby-era-kit/dist/plans-past-five-hobby-era-kit.zip` |
| The Weekend Edit & Girls' Night Kit | 9 | 55 | `design/kits/weekend-edit-kit/dist/plans-past-five-weekend-edit-girls-night-kit.zip` |

Each kit folder holds: `src/*.html` (editable sources), `dist/` (PDFs and the zip), `previews/` (cover mockup and four sample pages), `PRODUCT.md` (description, contents, checklist) and `USAGE-TERMS.md`. The zip also contains `START-HERE.txt` and `USAGE-TERMS.txt`. The typed description lives in `src/data/digital-products.ts`, which no public route may import.

Guard rails: `src/test/printables.test.ts` fails if any premium file is inside `public/`, or if any file under `src/` references the kits, their zips or `digital-products`. Only marketing preview PNGs are copied to `public/downloads/kit-previews/`.

## 2. How to edit and rebuild
- Run `node scripts/build-printables.mjs` (needs Playwright with Chromium, and the `zip` CLI for kits). Options: `--free`, `--kits`, `--only=<slug or kit id>`.
- Default run regenerates the HTML sources from the content files in `design/printables/_generator/` and `design/kits/_generator/`, then renders PDFs and previews. To hand-edit an HTML source instead, edit it and run with `--no-generate` (a normal run will overwrite hand edits).
- Shared look: `design/printables/brand.css`. Fonts are local OFL files in `design/printables/fonts/` so rendering works offline. Brand name, tagline and domain are read from `src/config/site.ts`.
- After a rebuild run `bunx vitest run`; the page counts in `src/data/printables.ts` and `src/data/digital-products.ts` must match the PDFs.

## 3. Pricing (RECOMMENDED, not a live price)
| Kit | Suggested introductory range | Later range |
|---|---|---|
| Hobby Era Kit | $12 to $19 | $19 to $27 |
| Weekend Edit & Girls' Night Kit | $9 to $15 | $15 to $22 |
| Both together | roughly 15 to 20 percent off the two intro prices (only once each has sold alone) | |

Reasoning:
- The brand has no audience, reviews or sales history, so a low introductory price reduces the buyer's risk and helps earn the first reviews.
- Page count and depth justify the flagship costing more than the weekend kit (75 vs 55 pages, nine tools each).
- Printable bundles are generally priced in single digits to low double digits, but this is an assumption, not a verified market figure.
- Low prices make fixed per-order fees a large share of revenue, so do not go lower until fees are known.
- Not tested with real customers. Treat any number as a starting hypothesis and revisit after the first sales.

NEEDS COWORK before pricing is used: (1) current comparable listings for printable bundles (check size, price and review counts); (2) the exact fees of the chosen storefront (percentage, fixed per-order fee, payout and refund handling). No fees are assumed in this repo. NEEDS OWNER: sales tax or VAT handling (some storefronts act as merchant of record, some do not; ask a tax professional).

## 4. Storefront options (generic evaluation; nothing chosen)
Criteria that matter for a two-product digital shop: fees (verify), who handles tax, instant file delivery, refund tools, ability to keep the site frontend-only (this repo has no backend), brand control, buyer email ownership, and effort to set up.

| Option type | How it works | Fits this site because | Watch out for |
|---|---|---|---|
| Hosted checkout / payment link tool the buyer connects later | Owner creates a product, uploads the zip, gets a hosted page or link; the site links out | No backend needed; keeps the site portable; smallest code change (one link) | Check delivery email wording, tax handling and fees; links are owner accounts, not repo code |
| Creator storefront platform with built-in delivery | A hosted shop page with checkout and download delivery included | Fast to launch; handles file delivery and often receipts | Platform fees and branding limits; check who owns the customer list |
| Digital-download marketplace | A third-party marketplace lists the kits | Built-in discovery traffic | Heavier competition, less brand control, marketplace rules and fees |
| Own checkout on this site | Build payments and delivery in code | Total control | Conflicts with the project rule "frontend-only, no paid backend"; adds security, tax and support burden. Not recommended |

RECOMMENDED path: hosted checkout or creator storefront, linked from a plain "Get the kit" button once terms, price and fees are settled. Cowork verifies fees; the owner opens the account and enters tax and payout details.

## 5. Buyer activation (what the owner or Cowork does)
1. NEEDS OWNER: decide storefront type and open the account (Cowork cannot enter tax or payment details).
2. NEEDS OWNER: review `USAGE-TERMS.md` with a qualified professional; add business name, contact email and a refund and support policy. Do not sell on the draft text.
3. NEEDS COWORK: verify fees and comparable listings, then choose the price within the recommended range.
4. Create each listing: paste the description from `PRODUCT.md`, upload `previews/cover.png` and the preview images, upload the zip from `dist/`.
5. Test-buy as a customer. Open the zip, open every PDF, print one normal page and one card page.
6. Add a "Get the kit" link in the site only after steps 1 to 5, and update `src/test/printables.test.ts` deliberately (it currently blocks any public reference to kit files).
7. Update the Privacy and Terms pages if the storefront collects customer data, and the Affiliate Disclosure if links change.

## 6. Limitations (honest)
- The PDFs were checked in Chromium-rendered images and with `pdfinfo`/`pdftotext`; they were not test-printed on a physical printer, and not opened in every PDF viewer. Colors on paper will differ from screen.
- Uppercase letter-spaced labels extract from the PDF with gaps between letters (cosmetic, text is still real and selectable).
- Prompts and ideas are original but unreviewed by a subject expert; there are no medical, financial or mental-health claims.
- The terms are a draft and not legal advice.
- No customer testing, no sales data, no verified prices.
