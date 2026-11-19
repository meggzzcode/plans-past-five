# Internal linking report

Date: 2026-11-19. Scope: the 27 published articles. Rules followed: `docs/content/INTERNAL-LINKING-STRATEGY.md`; no published article links to a draft (`src/test/links.test.ts` passes).

## Important finding: `related` is not rendered

`Article.related` is read only by `src/test/links.test.ts`. `relatedArticles()` in `src/content/index.ts` ignores it, and the article route shows only the computed list (shared hobbies x2 + same category). The strategy doc says `related` adds hand-picked extras; in code it does not. So only inline links are real links for readers. Counts below separate the two. The "before" figure combines inline and `related` (the old test metric), so compare it with the inline-only "after" figure carefully.

## Link counts per article

Before = outbound / inbound, inline plus `related` combined. After = inline outbound / inline inbound, then `related` outbound / `related` inbound.

| Article                                               | Before (out / in, combined) | After inline (out / in) | After related (out / in) |
| ----------------------------------------------------- | --------------------------- | ----------------------- | ------------------------ |
| hobbies-to-try-when-life-feels-like-work-sleep-repeat | 2 / 6                       | 5 / 2                   | 0 / 6                    |
| things-to-do-after-work-instead-of-scrolling          | 0 / 17                      | 5 / 3                   | 0 / 11                   |
| creative-hobbies-you-can-start-at-home                | 1 / 9                       | 4 / 2                   | 0 / 7                    |
| how-to-start-junk-journaling                          | 0 / 10                      | 2 / 9                   | 0 / 6                    |
| active-hobbies-for-women-who-dont-love-the-gym        | 3 / 3                       | 3 / 3                   | 3 / 3                    |
| at-home-creative-weekend                              | 3 / 2                       | 3 / 2                   | 3 / 3                    |
| cheap-weekend-adventures                              | 3 / 3                       | 3 / 3                   | 3 / 3                    |
| cozy-solo-dates-at-home                               | 3 / 4                       | 5 / 2                   | 3 / 4                    |
| creative-hobby-starter-kits-worth-considering         | 3 / 2                       | 2 / 3                   | 3 / 2                    |
| flower-arranging-as-a-hobby                           | 3 / 0                       | 2 / 4                   | 3 / 0                    |
| girls-night-ideas-that-arent-drinks                   | 3 / 4                       | 5 / 4                   | 3 / 4                    |
| how-to-find-a-hobby-as-an-adult                       | 3 / 1                       | 2 / 2                   | 3 / 1                    |
| how-to-get-into-recreational-cycling-as-an-adult      | 3 / 1                       | 2 / 2                   | 3 / 1                    |
| how-to-host-a-craft-night                             | 3 / 4                       | 5 / 5                   | 3 / 4                    |
| how-to-host-a-mahjong-night                           | 2 / 1                       | 3 / 4                   | 3 / 1                    |
| how-to-host-a-paint-night-at-home                     | 3 / 0                       | 2 / 2                   | 3 / 2                    |
| how-to-plan-a-perfect-picnic                          | 3 / 2                       | 3 / 2                   | 3 / 3                    |
| how-to-plan-a-solo-saturday                           | 4 / 2                       | 6 / 3                   | 4 / 2                    |
| how-to-start-a-book-club                              | 4 / 1                       | 5 / 4                   | 4 / 2                    |
| how-to-start-a-reading-journal                        | 4 / 0                       | 2 / 4                   | 4 / 1                    |
| how-to-start-playing-tennis-as-an-adult               | 3 / 1                       | 2 / 3                   | 3 / 1                    |
| how-to-take-yourself-on-a-solo-coffee-shop-date       | 4 / 3                       | 4 / 2                   | 4 / 3                    |
| junk-journaling-supplies-for-beginners                | 3 / 0                       | 2 / 3                   | 3 / 0                    |
| low-energy-hobbies                                    | 4 / 0                       | 3 / 4                   | 3 / 0                    |
| pickleball-for-beginners                              | 3 / 1                       | 2 / 3                   | 3 / 1                    |
| solo-date-ideas                                       | 4 / 2                       | 2 / 3                   | 4 / 2                    |
| things-to-do-on-the-weekend                           | 5 / 0                       | 3 / 4                   | 4 / 2                    |

Orphans: none. Before, six articles had no inbound link of any kind (flower-arranging, paint night, reading journal, junk journaling supplies, low-energy hobbies, things to do on the weekend). Every published article now has at least 2 inline inbound links from relevant published articles. Inline outbound is 2 to 6 per article (listicle hubs and solo Saturday reach 5 to 6, each link sits at a sentence that raises the question).

## What was added (inline unless noted)

- Junk journaling pair: how-to to supplies guide (supply section); starter kits, 21 creative hobbies to supplies guide.
- 35 hobbies: low-energy link now points to the low-energy article (was the `/after-hours` hub), flower arranging item, find-a-hobby in "how to pick".
- 21 creative hobbies: flower arranging, supplies guide, "is a kit worth it" starter kits.
- After work: pickleball and tennis guides, craft night, mahjong night, low-energy hobbies.
- Better Together: girls night to book club and paint night; craft night to paint night, mahjong night, book club; book club to mahjong night and reading journal; mahjong night to book club.
- Reading journal inbound: junk journaling how-to, cozy solo dates, coffee shop date, book club (existing).
- Solo cluster: cozy solo dates to low-energy, solo date ideas, solo Saturday; solo Saturday to flowers, weekend ideas, picnic.
- Weekend cluster: cheap weekend adventures, picnic, at-home creative weekend, things to do on the weekend link to each other where it helps; picnic and solo Saturday to flower arranging.
- Movement: active hobbies to pickleball and tennis guides; tennis and pickleball to each other and to active hobbies; cycling to active hobbies and cheap adventures; cheap adventures to cycling.
- Find a hobby to low-energy and 35 hobbies; low-energy to find a hobby and after work; flower arranging to at-home creative weekend.
- `related` arrays rebalanced: the after-work article was in about 17 lists, now 11; paint night, mahjong, book club and reading journal entries restored.
- Not linked (drafts): air-dry clay, crochet, embroidery, watercolor, affordable hobbies. Add their inbound links when each is published (clay: starter kits, at-home creative weekend, 21 creative hobbies, craft night; watercolor and embroidery: starter kits, 21 creative hobbies).

## Shop blocks

Catalog: 27 rows, 24 verified (3 candidates hidden: two generic scrapbook papers, one card sleeve).

| Page                                   | Block                                                     | What rendered                                                                                                                          |
| -------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| junk-journaling-supplies-for-beginners | one `shopTheArticle` (article slug), replaces `shopHobby` | 3 essentials (journal, glue stick, 21-roll washi) then 8 optional; 11 products, 0 duplicates                                           |
| how-to-host-a-mahjong-night            | one `shopTheArticle`, replaces `shopHobby`                | 5 "Essential" (2 NMJL cards, 3 sets) then 2 optional (table cover, mat); 7 products, 0 duplicates                                      |
| how-to-start-air-dry-clay (draft)      | `shopTheArticle` wired                                    | selection checked in code only (draft has no route): 3 essentials (Crayola bucket, kit, acrylic paint), 3 optional, no duplicate ASINs |

Seen at 390 and 1280: exactly one shop block per page; essentials before optionals; every Amazon link is `https://www.amazon.com/dp/<ASIN>` with `rel="noopener"`; no price, rating or discount text; disclosure reads "Links go to ordinary Amazon product pages. We don't currently earn from them, and Amazon sets the price and availability." with a Disclosure link; "I need this", "I already own this" and "Save for later" work, and an "own" tick dims the card and persists after reload; no horizontal overflow.

Article-level fixes: the mahjong dek said "A search is not a recommendation of a specific product", which is false now; it says pick one set and check the listing. The supplies dek said "Only once you have made a page", which clashed with the essentials; reworded. The junk journaling how-to dek (same products appear there via the legacy block) reworded likewise.

## Component defects (not edited)

1. `ProductCard` header says "Sold by Amazon" for every product, including those with availability "check-listing" (third-party sellers: 3 mahjong sets, mat, cover, uhapeer clay kit, clay tools). The card does not show "check the listing"; only the limitation text says "Sold by a third-party seller". The header is misleading.
2. Mahjong shows 5 cards labelled "Essential" that are alternatives (2 card sizes, 3 full sets). A reader may think they need all. The component needs a "choose one" grouping or only one essential set.
3. `selectProducts` is by article, hobby and collection, so legacy `shopHobby` blocks on other pages pull in catalog products by hobby: 35 hobbies shows 17 products under "A few creative starter pieces"; things-to-do-on-the-weekend and after-work show air-dry clay products; creative-home shows two shop blocks (15 products, no duplicates).
4. Legacy product-type blocks on the other pages still link to Amazon search URLs, not `/dp/` pages (expected, no catalog rows for those hobbies).
5. `Article.related` is dead data (see above); `relatedArticles()` should merge it.

## Hero images (390px, all load, no overflow)

Match the topic: 35 hobbies, 21 creative hobbies, after work, junk journaling (3 pages), at-home creative weekend (clay), cheap adventures, cozy solo dates, starter kits, girls night, craft night, paint night (pottery painting, close enough), mahjong, picnic, weekend, tennis, pickleball, book club, reading journal, solo date pages, coffee shop date.

Weak or mismatched:

- how-to-get-into-recreational-cycling-as-an-adult: hiking woman with binoculars, no bike. Mismatch.
- flower-arranging-as-a-hobby: little-adventures flat-lay (picnic blanket, camera, binoculars; tote with flowers). Mismatch.
- low-energy-hobbies: junk journal flat-lay represents one of about ten hobbies. Weak.
- how-to-find-a-hobby-as-an-adult: woman reading alone at a cafe. Weak.
- active-hobbies-for-women-who-dont-love-the-gym: hiking image; acceptable but narrow.
- how-to-plan-a-solo-saturday: little-adventures flat-lay; acceptable.
  Alt text is accurate for each image shown.
