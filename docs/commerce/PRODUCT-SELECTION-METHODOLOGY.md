# Product selection methodology

How an editor decides which specific product earns a place in the catalog and which role label it gets. This is an INTERNAL editorial framework. The weights and scores are never shown to readers as ratings, stars or rankings, and no product is described as "tested" unless somebody genuinely tested it.

Related: `docs/commerce/PRODUCT-RESEARCH.md` (fields and process), `docs/commerce/AMAZON-PRODUCT-CATALOG.md` (the register), `docs/buyer/PRODUCT-CATALOG.md` (the existing product-type records in `src/data/products.ts`), `src/data/catalog.ts` (the verified catalog types and validation).

## Criteria and weights (total 100)

| Criterion | Weight | What the editor asks |
|---|---|---|
| Audience relevance | 25 | Would a woman starting this hobby after work actually want this? Does it fit the specific article and kit slot? |
| Beginner friendliness | 20 | Can a first-timer use it without extra gear, skills or a long learning curve? Is it forgiving? |
| Practical usefulness | 20 | Does it do the job the slot asks for? Will it still be used after the first week? |
| Specs and quality evidence | 15 | Do the manufacturer page and listing support its claims? Is there verifiable material, size and contents information? Evidence means checked sources, not vibes. |
| Affordability and value | 10 | Is it reasonable for what it is, relative to alternatives in the same slot? (No price is stored or quoted; judge against the live listing at verification time.) |
| Visual appeal and brand fit | 10 | Does it suit the Plans Past Five look without becoming the reason to choose it? |

How to use it:
- Score each candidate 0 to 5 on each criterion, multiply by weight / 5, sum to 100. Keep the scoring sheet in the research file for the article or kit. It is an editor's aid for comparing candidates, not a published number.
- A candidate scoring very low on beginner friendliness or practical usefulness is rejected whatever its total.
- Ties go to the cheaper, simpler, easier-to-return option.
- Never publish a score, a star rating, "top-rated", "best-selling" or a ranking number. Amazon ratings and review counts are not stored (`validateCatalogProduct` in `src/data/catalog.ts` rejects price, rating, review, discount and stock fields).
- Re-score when the listing changes materially or `lastVerified` is stale (see the freshness rule in `docs/commerce/PRODUCT-RESEARCH.md`).

## Role labels

Each verified product gets exactly one role. The reader-facing label and the code value in `ProductRole` (`src/data/catalog.ts`):

| Reader-facing label | Code value | Use when |
|---|---|---|
| The essentials | `essential` | Without it, the hobby cannot start. Pair with `isEssential: true`. |
| Researched beginner pick | `researched-pick` | One considered recommendation among several options for a slot, backed by checked sources. Do not call it "tested". |
| The affordable option | `affordable` | A sensible, lower-cost route for the slot. |
| The complete starter kit | `complete-kit` | A single listing that contains what a beginner needs. We describe it as a third-party kit; we do not sell bundles. |
| The aesthetic upgrade | `aesthetic-upgrade` | Prettier, not necessary. Never `isEssential`. |
| The nice-to-have extra | `nice-to-have` | Makes the hobby nicer but is not needed to begin. Never `isEssential`. |
| The upgrade for later | `later-upgrade` | Worth buying after the person has stuck with the hobby. Never `isEssential`. |

The test `isEssential` cannot be true for `aesthetic-upgrade`, `nice-to-have` or `later-upgrade` is enforced in `validateCatalogProduct`.

Role rules:
- One role per product per catalog record. If the same item plays different roles in different articles, say so in the article, not by duplicating the record.
- Use "the essentials" sparingly and honestly. If the reader likely owns it already, the kit slot should be `probably-own` (`src/data/kits.ts`), not an essential purchase.
- A role label is a description of function, not endorsement strength.

## Evidence standard

A product may appear only when its record meets `docs/commerce/PRODUCT-RESEARCH.md`: a real ASIN, an ordinary `https://www.amazon.com/dp/<ASIN>` link, at least one https research source, a `lastVerified` date, honest `limitations`, and `status: "verified"`. Candidates stay invisible. If the evidence is thin, the product waits; the article says "look for" and shows an Amazon search ("Browse options") instead.

## What we do not do

- No invented testing, expert quotes, awards or "editor's pick" claims beyond what the process above actually supports.
- No comparisons that imply head-to-head testing.
- No claims about prices, discounts, stock, shipping or reviews.
- No choosing a product because of commission rate. Affiliate status is recorded separately (`affiliateStatus`) and never affects role or ranking within an article. Commission information is PENDING COWORK and must not be used to rank anything.
- No recommending a purchase the reader does not need. If the honest answer is "use what you have", that is the answer.

## PENDING COWORK

1. Which quality sources are acceptable per category (manufacturer spec pages, official safety or standards pages, governing bodies for sports gear)? List them per hobby.
2. For gear with safety or sizing implications (racquets, paddles, sharp tools, materials), which official guidance should be cited? Give URLs and dates.
