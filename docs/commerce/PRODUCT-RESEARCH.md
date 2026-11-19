# Product research: process and fields

Purpose: turn "a beginner watercolor set" (a product TYPE in `src/data/products.ts`) into a verified specific product in the researched catalog (`src/data/catalog.ts`) only when the facts have been checked. As of 2026-11-19 the catalog ships empty (`src/data/catalog.generated.ts` exports `generatedCatalog: CatalogProduct[] = []`). No product has been researched live yet.

Who does what (from `docs/TURNKEY-PLAN.md`): Cowork (browser agent with the owner's logins) reads retailer and manufacturer pages and fills the research template. Claude Code imports and validates. The owner approves. Nobody enters prices, ratings or review counts.

## Process

1. **Choose the slot.** Start from a kit slot (`src/data/kits.ts`) or an article's essentials list. Decide the role wanted (see `docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md`).
2. **Search broadly.** Collect a few candidate listings per slot. Record the search terms and date used.
3. **Open the listing and the manufacturer page.** Copy only facts that are visible: name, brand, what is in the box, sizes, materials, stated suitability. Record each URL.
4. **Check the ASIN and URL.** The ASIN is the 10-character code in the product URL (`/dp/<ASIN>`). The ordinary link is exactly `https://www.amazon.com/dp/<ASIN>`: no tag, no `ref=`, no `utm_*`, no `psc` or other tracking parameters. The importer rejects anything else.
5. **Check availability.** `available`, `check-listing` (variants or sellers vary), or `unavailable` (the record is then hidden by `filterVerified`).
6. **Write honest notes.** Why selected, who it suits, and at least one real limitation.
7. **Score internally** using the methodology weights. Keep the sheet; do not publish it.
8. **Map it.** Which hobbies, collections (`/shop/<slug>` collection slugs), articles and kit slots does it fill?
9. **Image rights.** Default `imageRights: "none"` (photo-less cards). Never copy retailer images without written permission; record any permission in `docs/IMAGE-LICENSES.md`.
10. **Set status.** `candidate` until a second person or the lead has re-checked; `verified` only after.
11. **Import and test.** Add the row to `docs/commerce/product-research.csv` (the one canonical file; blank template and column guide: `PRODUCT-RESEARCH-TEMPLATE.csv` / `.md`), then `bun run import:products docs/commerce/product-research.csv --check` and, if clean, the same command without `--check`. Then `bunx vitest run` and `bunx tsc --noEmit`.

## Fields (from `CatalogProduct` in `src/data/catalog.ts`)

| Field | Notes |
|---|---|
| `id` | kebab-case; ids starting `example-` are template rows and are rejected |
| `name`, `brand`, `category` | As shown on the source page |
| `description` | One neutral factual sentence |
| `asin`, `amazonUrl` | Real ASIN only; URL exactly `https://www.amazon.com/dp/<ASIN>`; placeholder ASINs are rejected |
| `affiliateUrl` | Reserved. Must stay empty while `affiliateStatus` is `not-activated`. Tags are added centrally by `src/config/affiliate.ts`, never written into records |
| `manufacturerUrl`, `altRetailerUrl` | Optional, https, no tracking parameters |
| `specs` | `{label, value}` pairs copied from the source; no price-like text |
| `hobbies`, `articles`, `collections` | Slugs; cross-checked by `catalogReferenceProblems` |
| `kitSlots` | `{kit, slot}` pairs that exist in `src/data/kits.ts` |
| `role`, `isEssential` | See methodology; non-essential roles cannot be essential |
| `audience`, `whySelected`, `limitations[]` | Required; at least one honest limitation |
| `imageSource`, `imageRights` | Photo-less by default |
| `researchSources[]` | At least one https page, no tracking parameters |
| `lastVerified` | Real date, YYYY-MM-DD, not in the future |
| `availability`, `affiliateNetwork`, `affiliateStatus` | `affiliateStatus`: `not-activated` (default), `pending`, `active` |
| `status` | `candidate` or `verified` |

Forbidden anywhere in a record (enforced): any field named like price, rating, review, stars, discount, coupon, deal, countdown, stock, sale or scarcity; text that mentions a dollar amount, percent off, "limited time", "only N left" or "lowest price". Do not store the numbers anywhere else in the repo either.

## Freshness

- Re-verify each product on a schedule the owner chooses. A reasonable starting rule (a recommendation, not a requirement): re-check before each article update and at least every few months. The weekly and monthly routines live in `docs/buyer/WEEKLY-MAINTENANCE.md` and `docs/buyer/MONTHLY-MAINTENANCE.md`.
- If a listing disappears or changes materially, set `availability` to `unavailable` (the record then hides) and update the article copy that named it.

## PENDING COWORK (questions to answer per category)

1. For each kit slot in `docs/commerce/STARTER-KITS.md`, which 1 to 3 specific listings are plausible? Provide ASIN, listing URL, manufacturer URL and what the page states about contents and sizing.
2. Which categories have meaningful safety or suitability guidance from an official source that should shape selection (for example, materials intended for use with food, equipment sizing)? Cite the page.
3. Which products are sold by third-party sellers where authenticity or availability varies (`check-listing`)?

The register of what has actually been verified is `docs/commerce/AMAZON-PRODUCT-CATALOG.md`.
