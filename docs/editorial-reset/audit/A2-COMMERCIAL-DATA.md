# A2: Commercial structure and the one-product-source test

Read-only audit, 2026-11-19. Nothing in the repo was edited except this report. Everything that ran, ran in a throwaway copy (`/tmp/a2-copy`, from `git archive HEAD`, `node_modules` symlinked). The importer was only ever run with `--check`. No prettier on article JSON. No commit or push.

Evidence labels used below: **MEASURED** (I ran it and saw the output), **CODE** (read from source, not executed), **REPO DOC** (a statement in the repo's own docs, not independently checked), **ESTIMATE** (my judgement, assumptions stated), **NOT VERIFIED** (could not be checked here). I did not open Amazon or any outside site, so no availability, price, rating or brand-quality claim below is independently verified.

---

## 0. Headline findings

1. **Replacing a product in the catalog updates almost everything, but only if the id stays the same.** MEASURED: a same-id swap changed all 11 pages that carried the old ASIN (1 hobby page, 8 articles, 2 shop pages) and left 0 pages on the old ASIN. 754/754 tests passed.
2. **Change the id (which is what a new product row naturally does) and 6 article pages silently lose a product link.** MEASURED: importer `--check` passed, 754/754 tests passed, build passed, and the inline `{{product:id|label}}` mentions on 6 articles fell back to plain text. Nothing in the importer, tests or CI catches it. 15 of the 62 inline mentions in the library already point at held products and are plain text today.
3. **There are 14 places a "thing to buy" is defined or referenced, and 5 of them are free text that can never update from the catalog** (hobby supplies, equipment, activity supplies, kit notes, product-type search cards). The catalog is the best-built part; it is not the only part.
4. **The repo's own buyer doc says a non-technical owner cannot manage products** (`docs/buyer/PRODUCT-MANAGEMENT.md`, first paragraph). Pages CMS covers articles and images only, and `.pages.yml` says it has never been opened in the live app.
5. **Only 3 of the 6 proposed collections can ship with named, verified products today.** Paper 7, Creative 14, Hosting 9 shown; Cozy, Sporty and Weekend have 0 shown (5, 4 and 2 candidates respectively). 4 of the 8 current collection pages are already empty of verified products.
6. **Product count, not code, is the dominant ongoing chore.** There is no automated check on Amazon pages (`site-health.mjs` skips amazon.com), so every availability check is by hand.

---

## 1. Commercial structure

### 1.1 What exists (MEASURED unless noted)

| Thing | Count |
|---|---|
| Article files | 34 (32 published, 2 draft). The plan targets ~28 |
| Hobbies | 43 (34 are indexable because at least one published article lists them; 9 are noindex) |
| Current shop collections | 8 (4 have zero verified products) |
| Catalog records | 66 = 37 `verified` + 29 `candidate`. 8 of the 37 are on `hold` => **29 shown** |
| Shown records by availability | 12 `available`, 17 `check-listing` |
| Product TYPE records (search-link cards, no ASIN) | 66 (36 collection + 30 article-only) |
| Kits | 8 (53 slots, 18 essential). Complete today: 2 (junk-journaling, air-dry-clay) |
| Article commerce blocks | 61 `shopHobby`, 3 `starterKit`, 9 `shopTheArticle`, 19 `whatYoullNeed` |
| Inline `{{product:id\|label}}` mentions | 62, in 14 articles, 17 distinct ids |
| Links on the 34 rendered article pages (baseline build) | 114 exact-ASIN links and 243 Amazon *search* links (63 distinct queries). 12 of 34 article pages carry no named product at all |
| Links on the 43 rendered hobby pages | 31 exact, 77 search. 35 hobby pages carry only search links, 7 carry exact links, 1 none |
| Products with a photo | 0 of 66 (`imageUrl` empty everywhere) |
| Affiliate state | all 66 `not-activated`; one central registry (`src/config/affiliate.ts`) |

The repo's own desirability review (`docs/commerce/PRODUCT-DESIRABILITY-REVIEW.csv`, REPO DOC, 62 rows, dated 2026-11-19, all marked "live listing checked: NO") flags 43 of 62 as unknown-brand and recommends: KEEP 10, KEEP-BUT-FIND-BRANDED-ALTERNATIVE 21, KEEP-AS-CANDIDATE 25, HOLD 6. So the shown 29 are a research starting point, not a curated set. The new scoring model (80/90 gates) has not yet been applied to anything.

### 1.2 Challenge to the 12 signature hobbies

Evidence per hobby from the current repo. "Shown" = verified, not held. "Cand" = candidate-only (never shown). Articles = published articles whose `hobbies` list includes it; "own" = an article whose subject it is.

| Owner's hobby | Own article | Articles listing it | Catalog (shown / verified / all) | Kit | Verdict |
|---|---|---|---|---|---|
| Junk journaling | 2 (guide + supplies) | 8 | 7 / 11 / 15 | complete | **Keep.** Deepest data, Pinterest pins already exist |
| Air-dry clay | 1 | 12 | 4 / 7 / 7 | complete, but one clay product (see 2.5) | **Keep.** Replace the only shown clay with an adult-oriented brand |
| Watercolor | 1 | 8 | 5 / 5 / 5 | 3 of 4 picks, not "full" | **Keep** |
| Embroidery | 1 | 7 | 3 / 3 / 4 | none | **Keep.** Add a kit definition |
| Crochet | 1 | 4 | 2 / 2 / 4 | none | **Keep, conditional.** Only yarn is verified: **no hook is verified** (both hook sets are candidates). Cowork's queue has a Clover hook that fixes this |
| Reading | 1 (reading journal) + book club | 13 (most connected hobby) | **0** / 0 / 6 | 0 filled | **Keep, top research priority.** Highest customer desirability, zero verified depth |
| Flower arranging | 1 | 2 | **0** / 0 / 3 | none | **Keep as editorial-led, commercially light.** The hobby's own supply list is "a bunch of flowers, scissors, any vase or jar": the flowers are not an Amazon item, so the basket is small (shears, vases, frog) |
| Mahjong | 1 (host a night) | 3 | 6 / 7 / 9 | 3 filled, not "full" | **Keep.** Highest-ticket items and the only recurring purchase (the league card changes every year per the kit note) |
| Puzzles (`jigsaw-puzzles`) | **none** | 4 | 0 / 0 / 1 | none (puzzle is an optional slot in the reading kit) | **Challenge: demote to a Cozy Edit product line.** No article, one candidate, and every puzzle is its own image so "which puzzle" is a taste decision that curation answers poorly |
| Pickleball | 1 | 9 | **0** / 0 / 2 | racquet-sports, 0 filled | **Keep.** Candidates exist; Cowork additions (Selkirk, Franklin balls) are in `docs/commerce/buy-plan/` but not in the catalog |
| Tennis | 1 | 4 | **0** / 0 / 2 | same kit | **Keep, conditional.** The repo's own audit says the only candidate racquet "looks like a beginner/junior toy" and suggests recommending rental first |
| Scrapbooking | **none** | 2 | 0 / 0 / 0 | none | **Challenge: fold into the Paper Edit and the junk-journaling pages.** Its three product types are the same three as junk journaling (`junk-journals`, `sticker-sets`, `washi-tape`). It adds a page, not a product |

**Gap in the owner's list: the Weekend Edit has no anchor hobby.** Picnicking has an article (the plan makes it a flagship), a kit and 2 candidates, and nothing in the 12 covers the Weekend collection. **Hosting has only mahjong**, while craft night / paint night is the most-referenced social subject (10 articles list craft nights, 3 dedicated articles, a kit, 6 hosting candidates).

**My independent 12 (replaces scrapbooking and puzzles):** junk journaling, air-dry clay, watercolor, embroidery, crochet, reading (absorbing book clubs and the reading journal), flower arranging, mahjong, **craft and paint night**, **picnicking**, pickleball, tennis. Reasoning: every proposed collection gets at least one anchor; each anchor has an existing article; scrapbooking and puzzles remain as discovery entries and as product lines inside Paper and Cozy. If keyword work (workstream A2 of the plan) shows real search demand for scrapbooking or puzzles, swap back: this is a judgement from repo data, not from search data.

Honest caveat on "12": only **5** of the 12 (owner's list) or **6** of mine have any shown product today (junk journaling, clay, watercolor, embroidery, crochet, mahjong; plus craft/paint night via 3 canvases/brushes). The other half are promises until research lands.

**Lighter discovery for the other 31 hobbies.** They already have `supplies` and `optional` text. What they do not need is a buy button: today 35 of 43 hobby pages show only Amazon search cards ("Find ... on Amazon" for a *type* such as "walking shoes"). That is the opposite of curation. Recommendation 6.4 below.

### 1.3 Six collections vs the present eight

Present: Pottery Era, Creative Girl, Sporty Girl, Girls' Night In, Bookish Girl, Little Adventures, Journaling Era, Cozy After Hours. They are already muddled (CODE): `journaling-era` and `cozy-after-hours` own zero product types and exist only through `extraProductIds` cross-references; every junk-journal catalog record is double-tagged `journaling-era` + `creative-girl`; every clay record is double-tagged `pottery-era` + `creative-girl`.

**The eight map cleanly into the owner's six**, so the change is a net simplification:

| Old | New |
|---|---|
| Pottery Era | Creative Edit |
| Creative Girl | splits: junk/washi/stickers go to Paper Edit, watercolor/embroidery/crochet go to Creative Edit |
| Journaling Era | Paper Edit |
| Bookish Girl + Cozy After Hours | Cozy Edit (merge) |
| Girls' Night In | Hosting Edit |
| Sporty Girl | Sporty Edit (rename) |
| Little Adventures | Weekend Edit (rename) |

**Verdict: Keep six. Two cautions.**

1. **Name collision.** "The Weekend Edit" is already the display name of the Journal section at `/weekends` (`src/data/categories.ts`) and a homepage row. Two different things with one name will confuse readers and search. Either rename the shop collection (e.g. "The Outing Edit", "The Little Adventures Edit") or make the shop collection the commerce face of that section deliberately. Likewise the quiz persona is already called "The Creative Girl" and the Journal has a "Creative Corner".
2. **Do not show a collection with fewer than 4 verified picks.** The repo already uses 4 as the kit minimum (`MIN_KIT_PICKS`). Hide the tile instead of the current "Where to start: guides and what to look for" fallback (4 of 8 current collection pages are exactly that).

Collection renames have a real blast radius (CODE + grep): old slugs appear in 9 source files plus 6 test files, the 66 type records, the catalog CSV (`collections` column; the importer rejects unknown slugs, which is a good guard), `equipment.ts` (59 items link to a collection), `finder.ts` (6 quiz personas), 6 Pinterest pins that promote `/shop/<old-slug>` (and images that carry the old names), the sitemap (9 shop URLs) and `rules.test.ts`, which asserts exactly 8 collections and 36 types. Plan 301s from old slugs.

### 1.4 Mapping of every existing thing to the six collections

**Hobbies (43), primary home** (cross-lists in brackets):

| Collection | Hobbies |
|---|---|
| Paper (5) | junk-journaling, scrapbooking, collage-art, calligraphy, creative-writing |
| Creative (10) | watercolor-painting, embroidery, crochet, knitting, air-dry-clay, pottery-painting, paint-by-numbers, jewelry-making, flower-arranging, outdoor-sketching |
| Cozy (6) | reading, jigsaw-puzzles, crossword-puzzles, indoor-gardening, baking, vinyl-collecting |
| Hosting (5) | mahjong, craft-nights, book-clubs, board-games, friendship-bracelets |
| Sporty (7) | tennis, pickleball, yoga-for-beginners, dance-classes, roller-skating, running, climbing |
| Weekend (8) | picnicking, hiking, thrifting, museum-exploring, birdwatching, nature-photography, film-photography, cooking-classes |
| No collection (2) | volunteering, language-learning (no product types, no catalog: discovery only) |

**Articles (34), primary home:**

| Collection | Articles |
|---|---|
| Paper (3) | how-to-start-junk-journaling, junk-journaling-supplies-for-beginners, how-to-start-a-reading-journal |
| Creative (7) | how-to-start-air-dry-clay, watercolor-painting-for-beginners, how-to-start-embroidery, how-to-start-crocheting, flower-arranging-as-a-hobby, creative-hobby-starter-kits-worth-considering, creative-hobbies-you-can-start-at-home |
| Cozy (2) | cozy-solo-dates-at-home, low-energy-hobbies |
| Hosting (6) | how-to-start-a-book-club, how-to-host-a-mahjong-night, how-to-host-a-craft-night, how-to-host-a-paint-night-at-home, girls-night-ideas-that-arent-drinks, make-friends-as-an-adult-through-hobbies (draft) |
| Sporty (4) | pickleball-for-beginners, how-to-start-playing-tennis-as-an-adult, active-hobbies-for-women-who-dont-love-the-gym, how-to-get-into-recreational-cycling-as-an-adult |
| Weekend (6) | how-to-plan-a-perfect-picnic, things-to-do-on-the-weekend, cheap-weekend-adventures, cute-weekend-plans-that-arent-brunch (draft), at-home-creative-weekend, how-to-plan-a-solo-saturday |
| Cross-collection / general (6) | solo-date-ideas, how-to-take-yourself-on-a-solo-coffee-shop-date, things-to-do-after-work-instead-of-scrolling, hobbies-to-try-when-life-feels-like-work-sleep-repeat, affordable-hobbies-under-25, how-to-find-a-hobby-as-an-adult |

Commerce duplication across articles (MEASURED from rendered pages, shared ASIN sets): `how-to-start-junk-journaling` and `junk-journaling-supplies-for-beginners` carry the **identical** 7 products (overlap 1.00). `how-to-host-a-mahjong-night` / `girls-night-ideas-that-arent-drinks` 0.75; `creative-hobby-starter-kits` / `creative-hobbies-you-can-start-at-home` 0.62. Two pages selling the same 7 products is a commercial reason (not only an SEO one) to consolidate or differentiate the junk-journal pair.

**Kits (8):** junk-journaling -> Paper. watercolor, air-dry-clay -> Creative. mahjong-night, pottery-paint-night -> Hosting. picnic -> Weekend. racquet-sports -> Sporty. **reading-book-club** is a single 11-slot kit that straddles three collections (journal/pens = Paper, light/throw/candle/tea/puzzle = Cozy, discussion cards/bowls = Hosting): split it into a Cozy reading kit and fold the book-club slots into Hosting, or reduce it. It is also the kit with the most padding (7 of 11 slots are optional or household).

**Product TYPES (66):** Creative 18, Sporty 17, Paper 9, Hosting 8, Cozy 8, Weekend 6. 8 of the 17 Sporty types are cycling and skating safety gear or yoga/tennis/pickleball shoes with no catalog backing at all.

**Catalog records (66) by proposed collection and state:**

| Collection | Shown | Held | Candidate | Gap vs 4 verified picks |
|---|---|---|---|---|
| Paper | 7 | 4 | 6 | OK (but only 5 distinct jobs: 2 washi, 2 journals, 2 adhesives, 1 pen) |
| Creative | 14 | 3 | 6 | OK. Mix is uneven: clay 1 shown, acrylic 1, sealer 1, watercolor 5, embroidery 3, crochet 2 (yarn only), flowers 0 |
| Cozy | **0** | 0 | 5 (light, throw, candles, tea, puzzle; reading journal and pens are counted under Paper) | **Gap: 4 more verified picks** |
| Hosting | 9 | 1 | 6 | OK. Mahjong 6, paint night 3, craft night 0, book club 0 |
| Sporty | **0** | 0 | 4 | **Gap: 4 verified picks**, and one is flagged as toy-like |
| Weekend | **0** | 0 | 2 | **Gap: 4 picks; 2 candidates only (blanket, cooler bag)** |

(One record, the Benicci brush set, serves both Creative and Hosting.)

**Surplus (decisions handed back to the reader).** The system allows a primary plus up to 2 alternatives per slot (`MAX_ALTERNATIVES = 2`). Currently shown as 2 choices for one job: washi tape x2, adhesive x2, journals x2, mahjong sets x2 plus cards in two sizes, watercolor brushes x2, watercolor pads x2, embroidery kits x2, canvases in two pack sizes of the same product. 4 further held records exist only because they added "a decision, not a different look" (`DESIRABILITY-AUDIT.md`). Under "luxury through curation" these should be one pick each.

**Recommended size.** Do not chase 48. Today's real constraint is quality and verification, not quantity. Minimum viable: 4 verified, desirable picks per collection (24). A comfortable launch is 5 to 8 per collection (roughly 30 to 45), and I would cap at about 48 because each product adds a recurring check (section 3). The research inputs already in the repo that fill gaps are not in the catalog: `buy-plan/VERIFIED-ADDITIONS.csv` (13 rows: pickleball paddle, watercolor sets, acrylic set, crochet hooks, DAS clay, two reading journals, TableTopics) and `VERIFIED-QUEUE*.csv` (Franklin balls, HEAD racquet, Penn balls, Clover hook). **They are a fifth and sixth product list outside the catalog** (see 2.1).

---

## 2. One authoritative product source

### 2.1 Every place a product or "thing to buy" is defined or referenced

| # | Where | What it holds | Derived from the catalog? |
|---|---|---|---|
| 1 | `docs/commerce/product-research.csv` | 66 rows x 36 columns, declared canonical | source |
| 2 | `src/data/catalog.generated.ts` | the same 66 rows as committed TypeScript, "do not hand-edit", rebuilt by the importer | copy of #1 (in sync today: 66 ids, ASINs identical) |
| 3 | `src/data/products.ts` | 66 product TYPES (name, blurb, `amazonQuery`, `hobbySlugs`, `collection`), plus collection `extraProductIds` and `kitIds` | **No.** Independent |
| 4 | `src/data/kits.ts` | 8 kits, 53 slots, notes with product facts ("166 tiles", "the 2026 card is current") | Slots are filled from the catalog by `kitSlots` tags on the product; labels and notes are static text |
| 5 | `src/data/equipment.ts` | 177 items with approximate `$low-$high`, 59 linked to a collection; "single source of truth" for hobby cost | **No.** Free text and numbers. Feeds hobby cost buckets, profile budget range and the Hobby Budget tool |
| 6 | `src/data/hobbies.ts` | per hobby: `supplies[]` (108 strings), `optional[]` (96), `productIds[]` (type ids), `startupBudget` | **No.** In 25 of 43 hobbies the `supplies` list does not match that hobby's essential equipment labels |
| 7 | `src/data/activities.ts` | 52 activities each with `supplies[]` (4 with `gear`, 11 with `lowCost`) used by planner/Tonight/plan text | **No.** Free text |
| 8 | Article JSON, block level | `shopHobby` (61) and `starterKit` (3) list **type** ids; `shopTheArticle` (9) and `shopMyHobby` use **tags** on catalog records; `whatYoullNeed` (19) is free text | mixed |
| 9 | Article JSON, inline prose | `{{product:catalog-id\|label}}`: 62 mentions, 14 articles. Resolved at render, **not validated at build or in tests** | by id |
| 10 | Article JSON, top-level `productIds` | present on every article and offered as a CMS field | **dead: nothing reads it** (grep: only the block-level field is consumed) |
| 11 | Product-side tags on each catalog row | `hobbies`, `articles`, `collections` (up to 3), `kitSlots`: drive hobby pages, collection pages, `shopTheArticle`, kits | the actual join mechanism |
| 12 | Quiz and planner | `finder.ts`: 6 personas each with a hard-coded old collection slug; Tonight/planner show `ShopMyHobby(hobby)` (catalog-driven) and `guidesFor` links to the collection of the hobby's first type | partly |
| 13 | Readers' browsers | `ppf:shop-list:v1` in localStorage, keyed by catalog product id | by id |
| 14 | Docs | 22 files under `docs/` contain ASINs (14 md, 8 csv), including `AMAZON-PRODUCT-CATALOG.md`, `FINAL-LISTING-VERIFICATION.csv`, `PRODUCT-DESIRABILITY-REVIEW.csv`, `buy-plan/*.csv`, `docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv`. `AMAZON-LINKS-INVENTORY.*` is script-generated; the rest are hand-kept | **No** |

Also: site search indexes the 36 collection TYPES, not catalog products (CODE, `src/lib/search.ts`). A search for a brand finds nothing.

### 2.2 Which rendering path runs (CODE, `ArticleBody.tsx`)

A `shopHobby` or `starterKit` block does not point at the catalog. A heuristic decides at render time: if products are tagged to this article slug, show those; else infer the hobby from the first type's `hobbySlugs[0]` and show catalog products if there are between 1 and 4 and none was already shown on the page; otherwise fall back to the type search cards. So **the same block can show a named verified product on one day and Amazon search cards the next, depending on how many catalog rows exist**. That is clever, and it is exactly the kind of invisible coupling a buyer cannot reason about.

### 2.3 The swap test (MEASURED)

Built the site (`bun run build`, 9 s), served the production worker locally, and fetched 100 pages (home, shop, 8 collections, 43 hobbies, 34 articles, planner, tools, sections). Test product: `scotch-glue-stick-photo-safe-4-pack`, an essential with the most placements (11 pages). The research CSV row was edited, `--check` was run on it (passed), and the equivalent edit was applied by hand to `catalog.generated.ts` in the copy (I did not run the importer's write path, per the rules).

| Scenario | Importer `--check` | Tests | Pages that changed to the new product | Pages that lost the link silently |
|---|---|---|---|---|
| **A.** Same id, new ASIN and name | pass | 754/754 pass | **11 of 11** (hobby page, 8 articles, 2 collection pages); 0 left on old ASIN | 0 |
| **B.** New id, same tags (what adding a replacement row does) | pass | 754/754 pass | 5 (hobby page, 2 junk-journal articles, 2 collection pages, all via tags) | **6 articles**: at-home-creative-weekend, cozy-solo-dates-at-home, creative-hobbies-you-can-start-at-home, creative-hobby-starter-kits-worth-considering, girls-night-ideas-that-arent-drinks, how-to-host-a-craft-night. Inline mentions render as plain text |
| **C.** Discontinue the only shown clay (`availability: unavailable`) | n/a | not run | n/a | The air-dry-clay kit drops from "full" to "awaiting essential: clay", and the "If you only buy one thing" pick for the clay guide **becomes a brush set** (Benicci), because the selection falls through to the next essential |

Why B is dangerous: a person replacing a discontinued product naturally adds a new row with a new name-based id (ids here are name-based, and 3 contain a year or a pack count: `nmjl-2026-...`, `...-21-rolls`, `...-4-pack`). The result passes every gate and ships.

Why C is dangerous: the kit and selection logic assumes at least one essential filler per slot. With a depth of one, losing a product changes what a guide recommends first. Today the only shown clay is one third-party seller's kit.

### 2.4 What does NOT update when one product is replaced

1. Inline `{{product:id|label}}` mentions if the id changes (proved, B). 6 of 6 affected articles; plus 15 of 62 mentions are already dead because they point at held products (Crayola clay x9, Apple Barrel paint x5, Jongyance set x1).
2. **Prose that states facts about the specific product.** Three articles give Crayola's drying times and varnish advice ("Crayola says its clay generally takes 24 hours ... about 72 hours"), and their `sources` list Crayola FAQs. Swap the clay and the prose is silently about a product you no longer recommend. The same applies to the mahjong kit note ("166 tiles", "the 2026 card"), `lookFor` text in types ("6-inch hoops") and hobby copy.
3. The 66 product TYPES and their search links, including the 243 search links on article pages and the 77 on hobby pages.
4. `hobby.supplies` and `optional` (204 strings), `equipment.ts` (177 items and all dollar ranges), `activities.supplies` (52), kit slot labels and notes, `whatYoullNeed` blocks (19).
5. Pinterest pins (static images; they name product *types* only, not brands, so a brand swap does not stale them).
6. Docs registers (22 files).
7. Reader shopping lists: ids saved in `localStorage` become orphans after an id change (CODE; the Saved page filters to ids that still exist, so they vanish, not crash).
8. Source citations and `researchSources` that name the old brand.

### 2.5 Other data-hygiene defects found while testing

- **The whole catalog ships in public client JavaScript.** MEASURED: `.output/public/assets/ProductCard-*.js` contains candidate rows (for example "Zicoto" reading journal, "never shown" in the docs) and internal research notes such as "RESOLVED by 3M's own pages ... retry" from `limitations` (4 records carry such notes). Not sensitive, but it is the research pipeline and unlisted candidates on view to anyone.
- **Hold reasons are not stored.** All 8 `hold` values are the literal string "held"; the reasons exist only in `DESIRABILITY-AUDIT.md`. A buyer cannot tell why a product is hidden.
- **Availability data contradicts itself.** `FINAL-LISTING-VERIFICATION.csv` records all 29 shown products "in stock (checked 2026-11-19)"; the catalog marks 17 of the same 29 `check-listing`.
- **`lead` is set on 21 of 66 records** and `onlyOne` on 7, so "lead" no longer means "preferred".
- **No hooks verified** for the crochet article; **no reading, pickleball, tennis, flower, picnic or cozy product verified** at all.
- **Article top-level `productIds`**: dead field, but editable in the CMS form, so a buyer will try to use it.
- Tests: no test asserts that inline product ids resolve to catalog records (`rules.test.ts` checks block `productIds` against TYPES only).

### 2.6 Proposed single-source model a non-technical owner can maintain

Principle: **one list of picks, one row per recommendation, every surface refers to a row by id, everything else is derived.**

**One place to edit, one row per pick.** About 12 columns instead of 36:

| Column | Purpose |
|---|---|
| `id` | stable, never changes, never contains a year or pack size (e.g. `junk-journal-glue`, `mahjong-card`). Locked in the form after creation |
| `status` | live / hold / retired |
| `replacedBy` | optional: id of the successor when retired, so old references keep working |
| `collection` | one of the six (dropdown) |
| `hobby` | one hobby (dropdown) |
| `kitSlot` | optional dropdown; its essential/optional role comes from the kit definition, not from the row |
| `startHere` | yes/no: the "if you only buy one thing" pick (one per hobby or collection; build fails on two) |
| `name`, `brand` | exact listing title and brand |
| `asin` | the only link input; the URL is derived |
| `why` | one sentence a reader sees |
| `caution` | optional one sentence (replaces `limitations`) |
| `lastChecked` | date |

Drop from the owner-facing row: `specs`, `compare`, `benefit`, `audience`, `affiliateNetwork`/`affiliateStatus` (global setting), `role`/`isEssential` (derive), `lead`/`onlyOne` (replace with row order and `startHere`), product-side `articles` and `hobbies` lists (articles list their own picks), `researchSources` (move to a seller-private research file, which the plan's A3 DB already is). Keep image fields only after the photography decision.

**Where the owner edits.** My ranking:
1. **A Pages CMS collection, one small JSON file per product** (`content/products/<id>.json`) with dropdowns for collection, hobby, kit slot and status. It matches how articles already work, so the buyer learns one tool. Caveat: Pages CMS has never been opened against this repo (`.pages.yml` header: "Cowork task C17 does that first test"), so this is NOT VERIFIED to work end to end.
2. **One CSV edited in the GitHub web editor** (what exists now, minus the importer). Works without a CMS but invites typos in slugs; build errors then appear in the host's build log, not on the form.
3. A Google Sheet exported to CSV and re-committed: needs a download-and-upload step on every change; I would not choose it.

**How it reaches the site.** Read the product files in the existing `prebuild` step (`scripts/build-content.mjs` already validates and generates articles), instead of a separate importer producing a committed `catalog.generated.ts`. Result: no import step, no generated file to hand-sync, no `--force` shrink guard to understand, one validator run on every build. If the build fails, the live site stays as it was (already how articles work, `.pages.yml` header).

**Derived, never typed:** the Amazon URL from the ASIN; kits (slots filled from `kitSlot`); the collection page and hobby page lists; the start-here pick; completeness ("4 or more verified picks"); article shop blocks.

**Build must fail loudly on:** an inline `{{product:id}}` that does not resolve to a live product (or follows `replacedBy`); two `startHere` in one scope; a collection with fewer than 4 live picks that is still linked from navigation; a `live` product whose `lastChecked` is older than a threshold (warn, do not fail); a held product with no hold reason.

**Free-text lists that should go or be linked:** retire product TYPES (66) entirely; replace hobby `supplies`/`optional` and `equipment.ts` with one per-hobby list in which an item may optionally carry a `pick` id, so a hobby page prints plain text for what you probably own and a pick card for what you should buy; delete the dead article `productIds` field; make `activities.supplies` display-only and never link to a shop. This removes duplication 3, 6 and 7 and half of 5.

---

## 3. Maintenance: what goes stale and the monthly chore

Minutes are **ESTIMATES** with assumptions stated; I measured the build (9 s), full test run (about 50 s) and importer check (under 1 s), but not a human doing the work.

| What goes stale | Why | Automated today? | Chore | Estimate |
|---|---|---|---|---|
| Amazon listing alive, same variant and pack, still shown as available | Third-party sellers churn; the repo's own audit says about half the shown products list a third-party seller; titles carry pack counts | **No.** `site-health.mjs` explicitly skips `amazon.com`; `lastVerified` is never displayed or alerted on (grep: not read by any component or script); a dead ASIN passes CI | open each live product link, confirm it loads, title and variant match, not "unavailable" | 1.5 min x N products. N=40 -> **60 min per full pass** |
| Replacing a retired product | per event | No | find a replacement (read listing, maker page), add the row, check six places | 30 to 45 min research + 10 to 20 min edit. Today the edit needs a command line, Bun and git, so it is **not doable by a non-technical owner** (REPO DOC, `PRODUCT-MANAGEMENT.md`) |
| NMJL mahjong card | The kit note says the league card changes every year; 2 records and the kit note say "2026"; ids contain `2026` | No | annual: swap 2 records, edit kit note, check the set listings | **20 to 30 min per year**, higher risk because the id carries the year (scenario B) |
| Hobby startup-cost ranges | `equipment.ts`: 177 approximate dollar figures, shown as "about $X to $Y" in profiles and the Budget tool | No | yearly sanity check of the 12 signature hobbies only | 30 to 45 min per year |
| Source URLs in `researchSources` and article `sources` | link rot | external links are checked report-only, Amazon skipped | read the weekly health issue | included in the existing 30 min/week |
| Prose facts tied to a product | Crayola drying times etc. | freshness check only flags article age (6 months) | re-read when swapping | 10 to 20 min per swap |
| Seasons | seasonal hobby rows are computed from tags (`src/lib/season.ts`), no product seasonality exists | **Yes**, no chore | none | 0 |
| Affiliate | tag lives in one registry; Amazon rule recorded in the repo: 3 qualified sales within 180 days of applying | n/a until the buyer applies | buyer-side | not a data chore |
| Photos | none exist; rights per product once decided | n/a | depends on the photography decision | unknown |

**Product-related monthly chore at today's design, about 40 live products:** a monthly full check (60 min) plus about 2 replacements a month (assumption: 1 in 20 products needs replacing a month) at 45 to 65 min each = **150 to 190 min per month**, i.e. 3 hours out of a 3 to 5 hour budget, before articles, marketing or the 30 min weekly health routine. **With the redesign** (rotate: top-10 most-placed products monthly at 15 min, full pass quarterly at 20 min a month averaged, one-sheet swap at 15 min edit): about 35 min of checking plus 60 to 90 min of replacement research per month = **about 1.5 to 2 hours**. The honest conclusion: **product count and per-product verification effort, not site code, set the maintenance load.** That is the argument for the 4 to 8 per collection range and against 48 by default.

---

## 4. Importer, catalog and CMS: too many systems?

**Moving parts a buyer must understand to change one product (today):** (1) the 36-column research CSV, (2) Bun, (3) the importer and its `--check` / `--force` / `--out` flags, (4) the committed generated file, (5) the catalog module and its validators, (6) product TYPES, (7) kits, (8) equipment, (9) hobby supplies, (10) the article block kinds and inline ids, (11) Pages CMS, which does not cover any of it, (12) 22 doc registers, (13) 754 tests that assert counts such as 8 collections and 36 types, (14) the affiliate registry. Fourteen touchpoints for "swap a product". That is too many for a buyer. The CSV importer itself is well made (atomic write, shrink guard, line-numbered errors; I confirmed it catches an unknown collection, a bad kit slot and a duplicate ASIN), but it is a seller's research tool being used as the owner's workflow.

**Simplest viable path:**

1. Keep the importer **only through launch** as the seller's bulk research tool (the plan's research phase uses it). Do not put it in the buyer package as the primary workflow.
2. Move to one product file set read at prebuild (2.6). Delete the committed generated file and the separate import step once the new path is tested. Effort **M**.
3. Retire product TYPES, the dead article `productIds`, and the hobby-supplies/equipment duplication (2.6). Effort **M**.
4. Add the build-time gates in 2.6, especially "every inline product id resolves". Effort **S** and the single highest-value change, because it closes scenario B on its own even if nothing else changes.
5. Pages CMS stays for articles and images; add products only after the first live test of the CMS config passes. If it does not, a single CSV in the GitHub editor is the fallback. Never both.
6. Delete or archive the duplicate product registers in `docs/` that are not generated (leave `AMAZON-LINKS-INVENTORY.*`, which a script regenerates).

---

## 5. Reusable product references across the whole site

**Design:** a product is referenced by id and nothing else. Every surface asks one function ("picks for": a collection, a hobby, an article's explicit list, a kit) and renders one component family.

| Surface | Reference | Notes |
|---|---|---|
| Collection page | `collection` field on the pick | Show only if 4 or more live picks |
| Hobby page (signature hobbies) | `hobby` field | Discovery hobbies show a plain "what you'll need" text list with no buy buttons |
| Article shop block | **the article lists its own pick ids** in one block (`{type:"picks", ids:[...]}`) instead of product-side `articles` tags and the type-id heuristic | Author-controlled, checkable at build, no guessing |
| Article prose | `{{product:id|label}}` | Resolves through `replacedBy`; unresolved = build error |
| Kit | `kitSlot` on the pick; kit definition says essential/optional | Already derived; keep |
| Quiz result | top hobby's picks plus the matching collection | Replace 6 hard-coded old slugs by the new six |
| Planner / Tonight | hobby's picks (already `ShopMyHobby`) | Remove `guidesFor`'s dependence on product types |
| Saved list | pick id (stable) | `replacedBy` keeps readers' saved lists working |
| Site search | search picks, not types | Currently finds neither brand nor product |
| Docs registers | generated from the picks, or deleted | One script already does this for the Amazon links inventory |

**The stable-id rule is the heart of it:** ids are semantic ("a glue stick for junk journaling"), not the listing title, and the listing (ASIN, name, brand) is the replaceable part. When a listing dies the owner edits one row's ASIN and name and the id, every reference, saved list and kit keep working. If a different product is needed, add a new row and set `replacedBy` on the old one.

---

## 6. Recommendations: remove, simplify, preserve, expand

Effort S = under a day, M = 1 to 3 days, L = a week or more. "CX" = customer experience; "Buyer load" = effect on the buyer's ongoing workload.

| # | Recommendation | Action | CX | Commercial | SEO | Buyer load | Effort |
|---|---|---|---|---|---|---|---|
| 1 | Build gate: every `{{product:id}}` and every article pick id must resolve; fail the build otherwise (closes scenario B; also exposes the 15 dead mentions today) | **Improve** | none visible; stops silent link loss | protects revenue links | none | lowers (errors found before publish) | S |
| 2 | One product source read at prebuild (JSON-per-product via Pages CMS, or single CSV); drop committed `catalog.generated.ts` and the buyer-facing importer | **Merge / Simplify** | none | enables the owner to swap without a developer | none | **large reduction** | M |
| 3 | Product ids stable and semantic; add `replacedBy` and a hold reason | **Improve** | saved lists survive | protects links | none | lowers | S |
| 4 | Retire the 66 product TYPES and their search-link cards; discovery hobbies show a plain "what you'll need" list with no buy buttons | **Remove / Hide** | calmer, more premium pages; no "Find ... on Amazon" lottery | gives up some search-link clicks (243 on articles, 77 on hobbies); aligns with curation | slight thin-content risk on 31 discovery hobby pages, mitigated by keeping the text lists | removes 66 records and their upkeep | M |
| 5 | Merge 8 collections into the owner's 6, with 301s from old slugs and new pins | **Merge** | clearer shop | each collection becomes shoppable only when 4 or more live picks | `/shop/*` URLs change: needs redirects; 9 URLs in sitemap | fewer pages | M |
| 6 | Rename or reconcile "Weekend Edit" (journal section name vs shop collection name) | **Improve** | avoids confusion | neutral | avoids two pages with one name | none | S |
| 7 | Hide any collection tile and "Where to start" fallback page with fewer than 4 live picks (today 4 of 8) | **Hide** | no empty shelves | avoids thin pages | avoids thin indexable pages | none | S |
| 8 | Signature set: replace scrapbooking and puzzles with craft/paint night and picnicking (my 12); keep both as discovery plus product lines | **Improve** | each collection has an anchor | Hosting and Weekend get a lead | picnic and craft-night guides already rank-eligible | none | S (decision) |
| 9 | Research priority order: reading, pickleball and tennis (1 verified brand racquet or "rent first"), picnic, Cozy items, crochet hook, flowers | **Improve** | fills empty shelves | the three empty collections | none | adds at launch, then steady | L |
| 10 | One pick per slot (cap alternatives at 0 or 1, delete the held duplicates); fewer, better | **Simplify** | fewer decisions | likely neutral to positive | none | **lowers recurring checks** | S |
| 11 | Reduce `catalog` row to about 12 owner columns; move research fields to the private research DB | **Simplify** | none | none | none | lowers | M (with #2) |
| 12 | Stop shipping candidates and internal notes in client JS (build emits live picks only) | **Improve** | none | protects pipeline | none | none | S |
| 13 | Replace hobby `supplies`/`optional`, `equipment.ts` and `activities.supplies` duplication with one list per hobby that can reference a pick; restrict dollar ranges to the 12 signature hobbies | **Merge / Simplify** | consistent numbers | none | none | removes 3 lists | M |
| 14 | Delete dead article `productIds` field and its CMS form entry | **Remove** | none | none | none | removes a trap | S |
| 15 | Consolidate or differentiate the junk-journal pair (identical 7 products on two pages) | **Merge** | less repetition | one stronger page | removes self-competition | fewer pages | M |
| 16 | Split the 11-slot reading and book-club kit (Cozy reading kit; book-club slots into Hosting) | **Simplify** | less padding | cleaner | none | none | S |
| 17 | Monthly routine: rotate checks (top-10 monthly, rest quarterly); display or alert on stale `lastChecked` | **Improve** | fresher links | fewer dead outbound clicks | none | about 35 min/month instead of 60 | S |
| 18 | Archive non-generated duplicate ASIN registers in `docs/` (22 files) | **Remove** | none | none | none | fewer places to go stale | S |
| 19 | Preserve: central affiliate registry, no-prices rule and validators, ordinary-link policy, kit-as-slots idea, importer's atomic safeguards (as dev tool), `hold` mechanism, Amazon-only link rule | **Keep** | trust | trust, compliance | none | none | none |
| 20 | Leave for buyer: per-product photography (decided separately by Cowork Q), seasonal gift guides, price or deal features (none, per constraints), more than 6 collections, a CMS form for hobbies | **Buyer expansion** | n/a | upside | n/a | n/a | n/a |

---

## 7. Method, limits and reproducibility

- Copy: `/tmp/a2-copy` (git archive of HEAD, `node_modules` symlinked, `bun run build`, served by `scripts/serve-built.mjs`, fetched with curl: baseline, swap A, swap B).
- Analysis scripts (not committed): `/tmp/a2-copy/a2/*.ts`. Page counts of links are occurrences of `amazon.com/dp/<ASIN>` and `amazon.com/s?k=` in server-rendered HTML, so a link repeated on a page counts each time.
- Tests: first full run 752/754 (timeouts in `wave-b-tools.test.tsx` under load); later runs, including both swap scenarios, were 754/754. Treat that as environment load, not product data.
- Not done: no live Amazon, Pages CMS or search-volume checks (NOT VERIFIED); no execution of the importer's write path; kit pick counts assume the current `isFullKit` rule; hobby-to-collection assignments (1.4) are my judgement and are the owner's to confirm; minute estimates in section 3 are assumptions, not timings.
- Existing sibling audits in this folder: `A1-CUSTOMER-NAV.md`, `A4-DOCS-HANDOVER-WORKLOAD.md`.

## Ranked summary (impact first)

| Rank | Action | Why first |
|---|---|---|
| 1 | Build gate on inline product ids (#1) | S effort, closes the one silent failure the swap test found |
| 2 | Single product source read at prebuild, stable ids with `replacedBy` (#2, #3, #11) | The only way a non-technical owner can swap a product; removes importer and generated file from their workflow |
| 3 | Retire product TYPES and hide search-link cards (#4, #13, #14) | Removes 66 records and 5 free-text lists; fits "curation, not quantity" |
| 4 | Six collections with a 4-pick floor, 301s, name fix (#5, #6, #7) | Clean merge of the current eight; stops empty shelves |
| 5 | Research the three empty collections first (#9) and cap at one pick per slot (#10) | Shop is only credible where products exist; fewer picks keep maintenance in budget |
