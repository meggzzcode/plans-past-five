# Article fixes from REVIEW-2 (published articles only)

Scope: the 27 published `src/content/article-*.ts` files. Drafts (air-dry-clay, crocheting, embroidery, watercolor, affordable-hobbies-under-25), index.ts, types.ts, src/data and the catalog were not changed. Slugs, status, sources and verifiedAt are unchanged. `bunx tsc --noEmit` and `bunx vitest run` (270 tests) pass.

Note: the review's counts (e.g. "7 of 9 open with Imagine/Picture") were from 9 articles; across all 27 it was 19.

## 1. Raw markdown showing as text

Renderer facts (read from `src/components/editorial/ArticleBody.tsx`): blocks that pass text through `<Inline>` and DO render `**bold**` and `[links](/path)`: `p`, `list` items, `item.note`. Blocks that do NOT: `h2`, `h3`, `quote`, `saveSplurge` (save, splurge), `tryThisWeekend`, `girlsNight`, `noSpend`, `first30` steps, `makePlan`, `whatYoullNeed` (essentials, optional), `item` title, first, time, cost, company. A scan of all 27 articles found raw markup in 6 places, all in these non-inline types; no `**` was found in a non-inline block.

| Article                                       | Block        | Before                                                                                                      | After                                                                                  |
| --------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| junk-journaling-supplies-for-beginners        | makePlan     | "Put a journal evening on the calendar in [Make Some Plans](/make-plans). ..."                              | "Put a journal evening on the calendar. ..."                                           |
| creative-hobby-starter-kits-worth-considering | makePlan     | "...Try the [Hobby Finder](/hobby-finder), then book your first session in [Make Some Plans](/make-plans)." | "Still undecided? Try the hobby finder, then book your first session on the calendar." |
| flower-arranging-as-a-hobby                   | makePlan     | "...standing Friday habit in [Make Some Plans](/make-plans), and..."                                        | link text removed                                                                      |
| how-to-host-a-paint-night-at-home             | makePlan     | "Book the evening in [Make Some Plans](/make-plans) and..."                                                 | "Book the evening and..."                                                              |
| how-to-start-a-reading-journal                | makePlan     | "Schedule a monthly ... catch-up in [Make Some Plans](/make-plans), ..."                                    | link text removed                                                                      |
| how-to-plan-a-solo-saturday                   | first30 step | "...hobby finder quiz or browse [Make Some Plans](/make-plans)"                                             | block converted to a list (see 4), where inline links render                           |

The makePlan block already shows "Find Your Thing" and "Let's Make Plans" buttons, so nothing is lost. The lead may still want `Inline` on these block types so authors can link; until then, no raw markup shows.

## 2. Unsourced product-performance and absolute claims

- "Keeps water cold for the whole match or trail" is NOT in any article file. It is catalog/product-type copy (water bottle card, shared by picnic and pickleball) in `src/data`. Not mine to edit; the lead should reword or drop it (suggest: "An insulated bottle is easier to carry than a pile of cans").
- Reworded in articles:
  - 35 hobbies: "knitting groups are famously welcoming" to "a knitting group can add company later if you want it"; "Golden-hour rallies ... are the best kind of exercise" to "...a lovely way to move"; "Adult skate nights at rinks are the best way in" to "Look for an adult skate night to ease in"; "Free apps can identify birds by song, so..." to "All you need is a bench and thirty minutes, plus a bird-ID app if you like."
  - active-hobbies: "...their bodies can't tell the difference" to "...is movement too, even if it never felt like exercise"; "swimming is low-impact and very good for the head" to "...and a lovely change of scene" (low-impact is sourced; "good for the head" was not); "by what burns the most" now in the intro.
  - at-home-creative-weekend: "Copying is how most people start" to "Copying is a perfectly good way to start."
  - weekend: "Park services advise against hiking alone, so bring a friend if you can" (duplicated word for word in solo-date-ideas) to "Going with a friend is the safer choice when you can."
- Grep for keeps/lasts/guaranteed/best/will not/never/always/proven found the rest to be safety rules already backed by VERIFIED checks, opinion ("the best part") or non-claims; left alone.
- Left deliberately: the picnic food-safety paragraph and cozy candle line (backed by verified checks).

## 3. Editor-speak in reader text

Searched all published article bodies for confirm / verify / TODO / check with / before publishing / Cowork / before recommending. Every hit is correct reader advice ("confirm which version before you sign up", "check with the class first", "check with a bike shop or a doctor"). No note-to-self text was found in any article body. The mahjong "confirm when the next card is released before recommending a purchase" line is catalog data (League card "Worth knowing"), not in the article. The lead should rewrite it in `src/data`.

## 4. first30 mislabelled ("Your first 30 minutes")

`first30` has no `title` field in `types.ts` and the renderer hard-codes "Your first 30 minutes". Converted the 11 blocks that are not 30-minute activities into `h3` plus `list` (same steps, bulleted):

| Article                                        | New h3                            |
| ---------------------------------------------- | --------------------------------- |
| active-hobbies-for-women-who-dont-love-the-gym | Plan your first try               |
| cheap-weekend-adventures                       | Plan your first adventure         |
| girls-night-ideas-that-arent-drinks            | Get it into the group chat        |
| how-to-find-a-hobby-as-an-adult                | Your one-week experiment          |
| how-to-host-a-craft-night                      | The evening at a glance           |
| how-to-host-a-mahjong-night                    | Your countdown to the first night |
| how-to-host-a-paint-night-at-home              | The evening, step by step         |
| how-to-plan-a-solo-saturday                    | Your Thursday checklist           |
| how-to-start-a-book-club                       | Running the night, in order       |
| solo-date-ideas                                | Turn one idea into a plan         |
| things-to-do-on-the-weekend                    | Shape the weekend on Thursday     |

Kept as first30 (these really are a first session of about 30 minutes): after-work, junk-journaling, at-home-creative-weekend (clay), cozy-solo-dates, flower-arranging, cycling, picnic, reading-journal, tennis, coffee-shop, junk-journaling-supplies, low-energy, pickleball. Borderline: reading-journal and supplies say "first evening" under an h2 of the same name; fine to keep.

REQUEST FOR LEAD: add an optional `title?: string` to the `first30` Block type and render `b.title ?? "Your first 30 minutes"`. Then the converted blocks could go back to numbered steps. Numbered steps are lost in the conversion (the list renders bullets).

## 5. Voice habits

Openers (first paragraph). Before: 19 of 27 began with Imagine/Picture (+ "Say..." in two). After: 3, all praised in the review (picnic, pickleball, low-energy).

| Article                     | New opening                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| at-home-creative-weekend    | "Saturdays at home tend to go one of two ways."                                                      |
| cozy-solo-dates-at-home     | "Friday, pouring rain, social battery somewhere around four percent."                                |
| creative-hobby-starter-kits | "It's 11 p.m. and the online cart holds a tiny embroidery hoop, ..."                                 |
| flower-arranging            | "Friday evening: the week is finished, and so is the milk, so you make a quick run..."               |
| girls-night-ideas           | "Someone types 'we should do something' into the group chat, ..."                                    |
| how-to-find-a-hobby         | "What do you do for fun? If you hear yourself say, 'Oh, you know. Watch things,' it's not a crisis." |
| host-a-craft-night          | "A table covered in paper, a heap of supplies and six friends who all swear they're not creative."   |
| host-a-mahjong-night        | "The group chat has been circling 'we should do something' for two weeks, ..."                       |
| host-a-paint-night          | "A long table in your living room, a row of small canvases ..."                                      |
| plan-a-solo-saturday        | "Saturday arrives with nothing on the calendar, and by 2 p.m. ..."                                   |
| start-a-book-club           | "The group chat has been quietly saying 'we should start a book club' since spring."                 |
| tennis                      | "On a bright Sunday, a friend texts a photo of a tennis court ..."                                   |
| coffee-shop-date            | "Going to a coffee shop alone feels bigger than it is."                                              |
| junk-journaling-supplies    | "Forty minutes in a craft aisle can end with a full basket and no idea what any of it is for."       |
| solo-date-ideas             | "A free Thursday evening and nobody to fill it with?"                                                |
| things-to-do-on-the-weekend | "Sunday at seven is when it lands."                                                                  |

Repeated brand phrases:

- "Being good at it is completely optional": was in 6 published articles (35 hobbies, junk-journaling quote, active, craft night, find-a-hobby, mahjong). Now only in 35 hobbies. Replacements: junk-journaling pull-quote now "A page only has to be yours, not good."; mahjong "Being a beginner is fine; not knowing which version you're playing is the part to sort out first."; the other three simply dropped the sentence or reworded. (The same phrase is in the draft clay and embroidery files; left, but should be changed before they publish.)
- "Let's give Saturday a storyline": was in solo-saturday (dek + body), weekend (pull-quote + "two small storylines"), cozy, flower. Now only solo-saturday. Weekend quote is now "Give each weekend day one anchor."; cozy ends "Book it like a plan, even if the plan is a blanket."; flower "Do the flowers first and let everything else come after."
- "Sorry, I have plans past five": was in after-work (quote), girls-night and pickleball. Now only pickleball. after-work quote is "Make the better option almost as easy as the scroll."
- "That's the whole appeal": junk-journaling and low-energy; both removed.
- "Start-up effort is ..." template sentence: replaced in flower, paint night, reading journal, supplies (published). Still in the drafts clay, embroidery, watercolor.
- Two items shared copy between 35 hobbies and creative-hobbies-at-home ("You don't need an art studio...", "Pottery without a wheel or kiln"); creative-home versions reworded.
- Britishisms in picnic and cycling fixed: rubbish bag to trash bag, flapjacks to granola bars, car park to parking lot; "charity-shop crawl" to "thrift-store crawl" title in cheap-weekend-adventures.

solo-date-ideas duplicate cards: the `it()` helper now takes an optional `first`. Items 8, 11, 16, 38, 41 (reading), 30 (museum), 40 (picnic), 39 (tennis), 43 (baking) no longer inherit the generic hobby card (the "A library card or one book" supplies line and "Read the reading guide" link now appear once, on item 1; museum once on item 7; picnic once on item 14). Each has its own `first try` line, e.g. item 43 now "Read the whole recipe the day before, and chop everything before you turn on the heat." instead of "Bake one batch of cookies". Item 39 (practice wall) now says "tap the ball gently against the wall and count how many returns in a row you manage" and no longer suggests rallying with a friend.

NOT DONE: item cards across different articles still share data-driven text because `You'll need:` and the default `first try` come from `src/data/hobbies.ts` (for example the same paint-by-numbers, junk-journaling, air-dry-clay, reading and baking cards appear in 5 to 9 articles each). I did not write ~100 overrides. Options for the lead: give each hobby a second `first` variant in data, or hide the supplies/first lines when the same hobby already appeared in a previous article (renderer rule), or only show them on the 35-hobbies page. "Pocket notebook: For lists, sketches, bird logs..." and the insulated-bottle line are catalog copy in `src/data`; also not mine.

## 6. Pickleball

Article text does not present tennis gear as pickleball gear (it says "not a stringed racket"; the tennis mentions are comparison and cross-link). Edits: removed `tennis-rackets` from the article `productIds` and from its shopHobby block (kept pickleball-sets, water-bottles, sports-totes); "Want to try the other racket sport?" to "Curious about the game pickleball borrows from?" (pickleball is not a racket sport). Remaining for the lead: the hero image shows a tennis racket and balls; the catalog's "Beginner tennis racket" product, if shown in verified shop blocks, is wrong for this article and the pickleball `hobbies` list still includes `tennis` (used for ifYouLoved and related; I left it as it is intentional cross-sell).

## 7. Overlap

- 35 hobbies vs low-energy-hobbies: 35 hobbies dek is now "A wide menu of thirty-five hobbies, from couch-friendly to out-of-the-house, sorted by how much energy you've actually got left."; low-energy dek adds "built for the nights you have almost nothing left." Cross-links added both ways: in low-energy's intro ("If you'd rather browse a wider menu, including hobbies that get you out of the house, the thirty-five hobbies list goes further; this one is only for the tired evenings.") and in 35 hobbies' low-energy section ("If tonight is a very tired night, the shorter, gentler low-energy hobbies list is the one to open."). Content not deleted; the real overlap (puzzles, paint-by-numbers, crosswords, plants, junk journal, collage) remains and is a candidate for trimming below.
- Junk-journaling pair: how-to-start-junk-journaling dek is now "The how-to: what junk journaling is, the no-rules mindset and a first page you can make tonight with what is already in the house." and its intro ends "This guide is the how-to; the supplies guide is the shopping list." The supplies guide dek is "The shopping side of junk journaling: a free-first supply list, a sensible first basket and the pretty things that can wait. Looking for the how-to? Start with the beginner's guide." and its intro says "This guide is the supplies list ... The how-to, with your first page step by step, is in How to Start Junk Journaling." (Both are inline paragraphs, so the links render.) The duplicated first-page steps and the essentials list remain in both; trim list below.
- Pre-existing contradiction not fixed (needs catalog decision): the supplies article says "These are product types, not specific products" while its shop block shows named products.

## 8. Length honesty

Real word counts (all block text via `blockText` in index.ts; shop blocks count as 0; hobby-card supplies/first lines pulled from data are not counted, so real page length is a bit higher on list articles). The "min read" column is what `readingMinutes` returns today; "At 230 wpm" is my check.

| Article                                               | Words | Min read now | At 230 wpm |
| ----------------------------------------------------- | ----- | ------------ | ---------- |
| solo-date-ideas                                       | 2055  | 10           | 9          |
| how-to-host-a-mahjong-night                           | 1569  | 8            | 7          |
| hobbies-to-try-when-life-feels-like-work-sleep-repeat | 1352  | 7            | 6          |
| things-to-do-on-the-weekend                           | 1314  | 7            | 6          |
| low-energy-hobbies                                    | 1263  | 6            | 5          |
| things-to-do-after-work-instead-of-scrolling          | 1178  | 6            | 5          |
| cheap-weekend-adventures                              | 1177  | 6            | 5          |
| girls-night-ideas-that-arent-drinks                   | 1171  | 6            | 5          |
| junk-journaling-supplies-for-beginners                | 1145  | 6            | 5          |
| how-to-plan-a-perfect-picnic                          | 1114  | 6            | 5          |
| at-home-creative-weekend                              | 1100  | 6            | 5          |
| active-hobbies-for-women-who-dont-love-the-gym        | 1092  | 6            | 5          |
| cozy-solo-dates-at-home                               | 1087  | 6            | 5          |
| how-to-get-into-recreational-cycling-as-an-adult      | 1060  | 5            | 5          |
| flower-arranging-as-a-hobby                           | 1024  | 5            | 4          |
| how-to-take-yourself-on-a-solo-coffee-shop-date       | 1008  | 5            | 4          |
| how-to-host-a-craft-night                             | 991   | 5            | 4          |
| how-to-host-a-paint-night-at-home                     | 974   | 5            | 4          |
| how-to-start-junk-journaling                          | 952   | 5            | 4          |
| how-to-start-playing-tennis-as-an-adult               | 934   | 5            | 4          |
| creative-hobby-starter-kits-worth-considering         | 924   | 5            | 4          |
| pickleball-for-beginners                              | 923   | 5            | 4          |
| creative-hobbies-you-can-start-at-home                | 922   | 5            | 4          |
| how-to-start-a-reading-journal                        | 879   | 4            | 4          |
| how-to-plan-a-solo-saturday                           | 857   | 4            | 4          |
| how-to-find-a-hobby-as-an-adult                       | 846   | 4            | 4          |
| how-to-start-a-book-club                              | 838   | 4            | 4          |

Total about 29,750 words. The current `readingMinutes` already looks honest for text; the review's "2,300 words = 4 min" came from before that fix and from page length that includes the repeated shop/catalog and hobby-card text, which the minute count does not include. The lead may want to add roughly 1 minute per 8 item cards or per shop block.

Recommended trims for the 5 longest (not applied):

1. solo-date-ideas (2055 words, 50 items): cut to 25. Keep one idea per mood; drop the duplicate-type ideas (the 5 reading ideas become 2; picnic x2 become 1; museum x2 become 1); add a "pick one for tonight" line at the top. Target about 1,200 words.
2. how-to-host-a-mahjong-night (1569): merge "Making it a recurring tradition" into the first-night section's last step, shorten "Playing with respect" to a short list, and trim the product-category section since the catalog block follows. Target about 1,150.
3. hobbies-to-try... (35 hobbies, 1352): cut the overlap with low-energy and creative-home (puzzles, crossword, paint-by-numbers, collage, junk journal, plants, embroidery, knit/crochet) down to one line each or link out; go to about 25 hobbies. Target about 950.
4. things-to-do-on-the-weekend (1314, 30 ideas): cut to 20; the overlap with cheap-weekend-adventures (hike, museum, thrift) and solo-date-ideas is large. Target about 950.
5. low-energy-hobbies (1263, 20 items): cut to 14, removing items that also sit in the 35 list (jigsaw, crossword, embroidery, crochet, knitting, collage). Target about 900.

## Things I could not do or that need the lead

- Renderer: `Inline` for makePlan/tryThisWeekend/girlsNight/noSpend/saveSplurge/quote/whatYoullNeed/first30 steps (not needed now; no raw markup remains).
- `first30` needs an optional `title`.
- Catalog/data copy: "Keeps water cold for the whole match or trail" (picnic and pickleball), the mahjong League card "confirm when the next card is released before recommending a purchase", repeated pocket-notebook copy, hobby-card supplies/first repetition, the pickleball hero image and any tennis-racket product shown for pickleball.
- Draft files (clay, crocheting, embroidery, watercolor) still contain "Imagine/Picture" openers, "Being good at it is completely optional" and "Start-up effort"; fix before publishing.
