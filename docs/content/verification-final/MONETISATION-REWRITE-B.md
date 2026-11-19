# Monetisation rewrite B (last 16 published articles)

Date: 2026-11-19. Scope: the last 16 published articles alphabetically. Edited only through `articleToJson` (canonical format). Facts, sources, verifiedAt, coworkChecks and status are unchanged. No new articles or block types. Slugs unchanged. No prices, ratings, alcohol, sunscreen or medical items. Only Amazon type cards and verified catalog ids are used.

Pattern used everywhere: gear-led sections first, first shop block right after the first main section, gear lines written as "**What makes it easier:** / **Worth bringing:** / **Nice to have:** / **For the second visit:**" (one benefit-first sentence), and one short secondary section headed "Free ways to start" (plus an "Out and about" sub-heading where venues exist) at the end.

Technical note on rendering: a `shopHobby`/`starterKit` block shows the verified catalog products tagged to the article slug when there are any, and the type cards otherwise. A `shopTheArticle` block already on the page claims those tagged products, so a second type-level block on the same page falls back to type cards. That is how the two-block pages below avoid showing the same product twice.

## Per article

**how-to-plan-a-solo-saturday.** Title now "...: Three Ways to Pack It"; dek, angle, searchIntent and productIds updated. Moved: the three sample days (Free / Mid-range / Treat-yourself) became three kits (wander, park, make-something) directly after the four-part frame, each with a gear line and a type-card block (walking-shoes, trekking-socks, daypacks, water-bottles, phone-armband, film-cameras; picnic-blankets, market-totes, thermos-flasks; portable-watercolor, sketch-pads, pocket-notebooks). Thursday set-up, hour by hour and fallbacks follow. Secondary: museum, drop-in class, counter lunch and library in one "Out and about" list. Removed the old budget paragraph and the single end block. Solo-safety wording and its DOJ source untouched.

**how-to-start-a-book-club.** Title "...: The Kit and the Plan"; dek, angle, productIds updated. "Wine" opener changed to "Tea". New "The table kit" block (conversation-cards, tea-sets, cozy-night-in) after Step 3; the existing block (reading-journals, book-lights, magnetic-bookmarks) stays after Step 6. Gear lines in Steps 1, 4, 5 and 6. Library and method steps unchanged. Needs: "book club picks" card still awaits the owner decision (no titles invented).

**how-to-start-a-reading-journal.** Title/dek per plan. Shop block moved to right after "Pick a layout" and gained magnetic-bookmarks. A gear line appended to each of the three layouts, plus one under "Pages worth adding later". The library-holds idea stays as a short bullet (sourced).

**how-to-start-air-dry-clay.** `shopTheArticle` moved to directly after "What you need"; dek and angle now name the supplies. Gear lines: craft mat, sculpting tools, cookie cutters, fine brush and acrylic set, optional water-based sealer "as its label directs". No new safety claim; the Crayola/Mont Marte sourced text is untouched.

**how-to-start-crocheting.** Title per plan (hook, yarn, three stitches). productIds were empty; now `crochet-hooks`, `yarn`. `shopTheArticle` (verified yarn) moved after "What you need"; new `shopHobby` of crochet-hooks after the first square. Gear lines: comfortable-handle hook, stitch markers, project pouch. Dek no longer says "almost everything".

**how-to-start-embroidery.** Dek/angle updated. `shopHobby` converted to `shopTheArticle` (verified kits and scissors) and placed after "Kit or loose supplies?". Gear lines for scissors and needle minder, the hoop, and a pouch.

**how-to-start-junk-journaling.** Dek/angle updated (keeps "how to begin" for the consistency test). `shopHobby` replaced by a `starterKit` block right after "What you need", titled "The small set that makes page one prettier" (it renders as the tagged verified products). Gear lines after the first page, the techniques and the page ideas. Because the catalog tags the same verified products to both junk-journal articles, the two shop blocks show the same set (see needs).

**how-to-start-playing-tennis-as-an-adult.** Title "...: A Four-Week Plan, Gear Included". "Before you buy: try a racket for free" is now "Your first racket and what goes with it"; the borrow/free-court/lesson advice moved to a closing "Free ways to start". Shop block 1 (racket, balls, bottle, tote) right after "What you'll need"; block 2 (tennis-shoes, bottle, tote) for the second month. Gear lines in Weeks 1 to 4. The lower-compression-ball line uses the USTA source already listed ("bounce lower and slower").

**how-to-take-yourself-on-a-solo-coffee-shop-date.** Title "...: What to Pack and What to Do". "Pack for the date" is now Step 1 with its shop block under it; place, order and seat steps trimmed to shorter notes. Each of the "six things" has a gear line except "do nothing". A second block (portable-watercolor, sketch-pads, letter-writing-sets) follows the six things. No cafe is named.

**junk-journaling-supplies-for-beginners.** Dek/angle updated (keeps "what to buy"). `shopTheArticle` moved right after the four essentials and the needs list. "Start with a lap of the house" is now a short closing "Free ways to start". "Three baskets" reframed (first basket, second basket, already on the shelf) and the "prices vary" sentence reworded. Needs: longer set of paper and adhesive products shown only via the tagged catalog.

**low-energy-hobbies.** Title per plan ("...Each With a Two-Minute Setup"), dek per plan. Order: "Hands busy, brain quiet" (jigsaw, paint by numbers, knitting, embroidery, bracelets) with block 1, then "What makes a tired evening feel like a treat" with block 2, then "Free ways to start" holding the seven no-setup ideas, each with a gear line (portable speaker, pocket notebook, yoga mat, bookmarks, photo album, plant basics). Items renumbered 1 to 12; "Free"/"Low cost" chips removed. The old single embroidery block was deleted. Tone stays gentle; no health or sleep claims; the "see a doctor" line and its NHS source are untouched.

**pickleball-for-beginners.** Title now "Pickleball for Beginners: The Rules, the Court and the Gear for Your First Game" (removes "Everything You Need"). "What to bring" moved right after "What it actually is" with the shop block directly after it; court and rules follow unchanged. Borrowing a paddle is one sentence. A second block (pickleball-shoes, sports-totes) sits before the closing "Free ways to start" (finding a game, kept short, keeps the sourced open-play etiquette). No approval claim added for any paddle.

**solo-date-ideas.** Kept 30 ideas, so the "30" in the title and in `ARTICLE_META_TITLES` stays true; title now ends "and the Little Kit for Each". Order: Make something (6), Outdoors (8), Small treats (3, gear-friendly), then eating alone and the sourced safety note, then "Free ways to start" (8) and "Out and about" (5). Every gear-led idea has a gear line; roller-skating and paddle wording still rest on the CPSC and Coast Guard sources; bike ride gets only a daypack/bottle line (no cycling safety claim). Quick-pick chooser is gear-first. Three shop blocks.

**things-to-do-after-work-instead-of-scrolling.** Title per plan. Order: make something, exhausted, want people, some energy, "Making it stick", then "Free ways to start" (7) with one `noSpend` reworded to say what an optional purchase adds, then "Out and about" (5). Items renumbered 1 to 25; the old "If you want to feel like a new person" section is gone. Three shop blocks. "Free"/"Low cost" chips removed. No sleep or phone-addiction claims.

**things-to-do-on-the-weekend.** Title "...and the Small Things That Help Them Happen" (still 20). Order: make, outside, people; Thursday set-up, backup list and `makePlan` after the shop blocks; "Free ways to start" (9 items, all one sentence) last. The `cheap-weekend-adventures` link text is now "More weekend adventures".

**watercolor-painting-for-beginners.** `shopTheArticle` (verified paints, brushes, paper) added after "What you need" and the label-reading paragraph; the type block moved to the end as "For the second set" (portable set, sketchbook). Gear lines for brush and paper, masking tape and board, and a travel set. I did not add the `starterKit` block the plan suggested, because it would only repeat the tagged products the first block already claims.

## What became secondary
The secondary share is near the 20 percent guide on the guides and above it only on the three count-bound listicles (solo-date-ideas, after-work, weekend), where the title count (30, 25, 20) is fixed and every idea stays a numbered item. Those items were trimmed to one or two sentences.

## New product needs for Cowork
Type-level cards are used for everything below; none has a verified product yet (candidates noted where one is queued in `MONETISATION-GAPS.csv`).
- Outdoor kit shared by solo-saturday, solo-date-ideas, weekend and after-work: walking-shoes, trekking-socks, daypacks, water-bottles, phone-armband, binoculars (one researched pick each, reused).
- Picnic and flask: picnic-blankets (candidate zaze), thermos-flasks, market-totes.
- Make kits: portable-watercolor, sketch-pads, pocket-notebooks, letter-writing-sets, brush-pens, photo-albums, vases and flower-snips (candidates leize shears and der-rose vases exist).
- Cozy and puzzles: jigsaw-puzzles, paint-by-number-kits, cozy-night-in (candidate bedsure throw, nimiko candles), tea-sets, book-lights (candidate gritin), portable-speakers, yoga-mats, indoor-plant-basics, magnetic-bookmarks.
- Racquet and skate: tennis-shoes, pickleball-shoes, skate-protective-gear; tennis and pickleball sets have candidates only.
- Crochet: hooks have two candidates (ergonomic set, 12-size set) but none verified; knitting-needles has no candidate.
- Book club: conversation-cards (candidate tabletopics), snack bowls (candidate dowan), and the open owner decision on a "book club picks" card.
- Catalog tagging: the two junk-journal articles are tagged with the same verified products, so the how-to cannot show the "minimal set" the plan wanted. Tagging a subset to each would fix that (catalog change, not done here).
- Kit slots still missing for crochet-starter, embroidery-starter, trail-day and sketching-outing (`src/data/kits.ts`, not edited).
