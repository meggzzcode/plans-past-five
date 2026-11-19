# Product types

Type-level Amazon search cards in `src/data/products.ts`. A product TYPE is a plain name, an Amazon search phrase, a one-sentence "look for" and a benefit line. No brands, ASINs, prices, ratings or review counts are stored.

## How a card renders

- Link: `amazonQuery` becomes an ordinary `https://www.amazon.com/s?k=...` link through the resolver in `src/config/affiliate.ts` (`resolveProductLink`). A tag is added only when the affiliate state is active; the sponsored attribute and disclosure follow the same state.
- Fields: `name` (title), `blurb` (benefit line), `lookFor` ("look for" line), optional `noSpend` (a "no-spend swap" line), `hobbySlugs` (hobby pages and shop-hobby grouping), `collection` (the shop page a saved card links to).
- Cards appear in `shopHobby` and `starterKit` blocks (via `productsFor(productIds)`), on hobby pages (`hobby.productIds`) and, for the original 36, on collection pages.
- Verified catalog products (`catalog.generated.ts`) are a separate system and take precedence in `shopTheArticle`.

## Two lists

1. `products` (36): collection types. Six collections own six each; `extraProductIds` cross-reference. Counted by `src/test/rules.test.ts`, listed on collection pages and in search.
2. `articleProducts` (30): article-only types, added so article rewrites can attach gear. NOT in `products`, collection pages, search or the collection counts. They resolve through `getProduct` / `productsFor`, so `productIds` in articles and hobbies can use them. `allProductTypes` and `productTypeIds` export every id (66 total).

Validation: `scripts/content-lib.mjs` only checks that `productIds` is a list of strings; it does not read `products.ts`, so no validator list needs updating. `src/test/rules.test.ts` guards that every `shopHobby` id in `content/articles` resolves to a type.

## Collection types (36)

- `air-dry-clay`: Air-dry clay (pottery-era)
- `clay-tools`: Clay sculpting tools (pottery-era)
- `acrylic-paints`: Acrylic paint set (pottery-era)
- `detail-brushes`: Detail paintbrushes (pottery-era)
- `ceramic-painting-kits`: Ceramic painting kit (pottery-era)
- `clay-mats`: Clay craft work mat (pottery-era)
- `watercolor-sets`: Watercolor starter set (creative-girl)
- `watercolor-sketchbooks`: Watercolor sketchbook (creative-girl)
- `junk-journals`: Junk journal or blank notebook (creative-girl)
- `washi-tape`: Washi tape collection (creative-girl)
- `sticker-sets`: Decorative sticker sets (creative-girl)
- `embroidery-kits`: Embroidery starter kit (creative-girl)
- `tennis-rackets`: Beginner tennis racket (sporty-girl)
- `tennis-balls`: Tennis balls (sporty-girl)
- `pickleball-sets`: Pickleball paddle set (sporty-girl)
- `water-bottles`: Insulated water bottle (sporty-girl)
- `sports-totes`: Sports tote bag (sporty-girl)
- `daypacks`: Outdoor activity daypack (sporty-girl)
- `mahjong-sets`: Mahjong starter set (girls-night-in)
- `friendship-bracelet-kits`: Friendship bracelet kit (girls-night-in)
- `conversation-cards`: Conversation card game (girls-night-in)
- `group-painting-kits`: Group painting kit (girls-night-in)
- `cookie-decorating-kits`: Cookie decorating kit (girls-night-in)
- `board-games`: Board games & puzzles (girls-night-in)
- `reading-journals`: Reading journal (bookish-girl)
- `book-lights`: Rechargeable book light (bookish-girl)
- `magnetic-bookmarks`: Magnetic bookmarks (bookish-girl)
- `book-sleeves`: Book sleeve (bookish-girl)
- `book-nook-kits`: Miniature book nook kit (bookish-girl)
- `reading-stands`: Reading stand (bookish-girl)
- `picnic-blankets`: Picnic blanket (little-adventures)
- `film-cameras`: Reusable film camera (little-adventures)
- `pocket-notebooks`: Pocket notebook (little-adventures)
- `market-totes`: Reusable market tote (little-adventures)
- `portable-watercolor`: Portable watercolor set (little-adventures)
- `binoculars`: Compact binoculars (little-adventures)

## Article-only types (30, NEW)

- `walking-shoes`: Walking shoes (links to /shop/sporty-girl) NEW
- `trekking-socks`: Trekking-style socks (links to /shop/sporty-girl) NEW
- `phone-armband`: Phone armband (links to /shop/sporty-girl) NEW
- `sketch-pads`: Sketch pad (links to /shop/creative-girl) NEW
- `crochet-hooks`: Crochet hooks (links to /shop/creative-girl) NEW
- `yarn`: Beginner yarn (links to /shop/creative-girl) NEW
- `knitting-needles`: Knitting needles (links to /shop/creative-girl) NEW
- `flower-snips`: Flower snips (links to /shop/creative-girl) NEW
- `vases`: Vases (links to /shop/creative-girl) NEW
- `flower-frogs`: Flower frogs (links to /shop/creative-girl) NEW
- `jigsaw-puzzles`: Jigsaw puzzles (links to /shop/cozy-after-hours) NEW
- `paint-by-number-kits`: Paint-by-number kit (links to /shop/creative-girl) NEW
- `cozy-night-in`: Cozy night-in basics (links to /shop/cozy-after-hours) NEW
- `bike-helmets`: Bike helmet (links to /shop/sporty-girl) NEW
- `bike-lights`: Bike lights (links to /shop/sporty-girl) NEW
- `bike-repair-kits`: Bike repair kit (links to /shop/sporty-girl) NEW
- `bike-bells`: Bike bell (links to /shop/sporty-girl) NEW
- `skate-protective-gear`: Skate protective gear (links to /shop/sporty-girl) NEW
- `thermos-flasks`: Insulated flask (links to /shop/little-adventures) NEW
- `cooler-bags`: Cooler bag (links to /shop/little-adventures) NEW
- `portable-speakers`: Portable speaker (links to /shop/girls-night-in) NEW
- `glue-guns`: Mini glue gun (links to /shop/creative-girl) NEW
- `tea-sets`: Tea set (links to /shop/cozy-after-hours) NEW
- `brush-pens`: Brush pens (links to /shop/journaling-era) NEW
- `photo-albums`: Photo album (links to /shop/journaling-era) NEW
- `letter-writing-sets`: Letter-writing set (links to /shop/journaling-era) NEW
- `indoor-plant-basics`: Indoor plant basics (links to /shop/cozy-after-hours) NEW
- `tennis-shoes`: Tennis shoes (links to /shop/sporty-girl) NEW
- `pickleball-shoes`: Pickleball shoes (links to /shop/sporty-girl) NEW
- `yoga-mats`: Yoga mat (links to /shop/sporty-girl) NEW

## Wording rules

- No prices, ratings, review counts, brands or ASINs; no alcohol, sunscreen or medical items; no "must-have" or mandatory-gear wording.
- Safety-relevant types (`bike-helmets`, `bike-lights`, `skate-protective-gear`, `glue-guns`) use manufacturer- and label-based wording only (for example, check for a CPSC-compliant label) and make no health or injury-prevention claims. Exact listings must be verified in the catalog before any claim about them.

## Adding a type

1. Add a `p(id, collection, name, blurb, lookFor, amazonQuery, hobbySlugs)` entry to `articleProducts` (or `products` plus a collection if it belongs on a shop page; then update the counts in `src/test/rules.test.ts`).
2. Use a kebab-case id, a lowercase `amazonQuery` with no brand, and hobby slugs that exist in `src/data/hobbies.ts`.
3. Update the id list and total in `src/test/rules.test.ts`, then run `bunx prettier --write src`, `bunx eslint . --quiet`, `bunx tsc --noEmit`, `bunx vitest run` and `node scripts/build-content.mjs`.
4. Reference it from an article block (`productIds`) or a hobby (`productIds`).
