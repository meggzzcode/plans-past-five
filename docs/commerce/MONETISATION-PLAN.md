# Monetisation plan: per-article audit and rewrite rules

Prepared 2026-11-19. Analysis only: no article, data file or importer was changed or run. Companion queue for Cowork: `docs/commerce/MONETISATION-GAPS.csv`.

## 0. Owner direction and how to read this

We only promote what can be monetised through Amazon (ordinary Amazon links, tracking off for now, but every page is written as if it will be on). Pages are written with the intention to monetise. Free, venue-led or service-led things (free trails, library visits, free museum nights, local classes, "just go for a walk") may stay, but only as short secondary points. Free activities can still sell gear that genuinely makes them easier or nicer (shoes, daypack, bottle, socks, a phone armband, binoculars, a notebook). Voice rules in `docs/content/BRAND-VOICE.md` stay: warm, no pressure, no fake urgency, no "must-have", no invented facts, prices, ratings or first-person testing claims, no health claims, no alcohol or regulated items.

Scope: 34 article files; 32 are `published` (audited below, one section each), 2 are `draft` (`cute-weekend-plans-that-arent-brunch`, `make-friends-as-an-adult-through-hobbies`, both headings only, no body; short notes in section 5).

Balance counts are approximate and by item (list articles) or by section (guides). "Gear-led" means a product genuinely makes the activity easier, nicer or more convenient. "Free" means no purchase is the point (walks, library, free days, calling a friend). "Venue/service" means paid classes, studios, tickets, cafes, rinks and similar that we cannot monetise.

Classes: A = gear-led (60% or more gear-led), B = mixed (about 40 to 60%), C = mostly non-monetised (under about 40% gear-led, or method-only with little gear).

## 1. Headline findings

- Class A: 17 articles. Class B: 7. Class C ("mostly non-monetised"): 8 published articles (`cheap-weekend-adventures`, `solo-date-ideas`, `things-to-do-on-the-weekend`, `how-to-plan-a-solo-saturday`, `how-to-find-a-hobby-as-an-adult`, `how-to-take-yourself-on-a-solo-coffee-shop-date`, `low-energy-hobbies`, `how-to-start-a-book-club`). Both drafts are also venue/free-led.
- Several class A articles are monetisable in topic but not yet shopped: `flower-arranging-as-a-hobby` has no shop block and no productIds; `how-to-start-crocheting` has none of the product TYPES it needs (hooks, yarn); `how-to-get-into-recreational-cycling-as-an-adult` is gear-heavy but shops only a daypack, bottle and tote and not the helmet, lights or repair kit it spends sections on.
- Framing problems at the top of articles (not just in the body): "cost almost nothing" (`cheap-weekend-adventures`), "Before you buy: try a racket for free" as the first section (`how-to-start-playing-tennis-as-an-adult`), "Free" tags in hobby data, `noSpend` blocks that sit mid-article and a "Free way in / No-spend version included" chip generated from them (`src/components/editorial/article-summary.ts`).
- Verified catalog coverage is narrow: 37 verified and 29 candidate products. Verified exist only for junk journaling, air-dry clay, mahjong, watercolor, embroidery, crochet yarn and paint-night canvases/brushes/paint. Everything else (picnic, reading, flower, tennis, pickleball, cycling, cozy, craft night, hiking, solo-date gear) has candidates at best, so those articles must use type-level cards for now.
- Only 8 starter kits exist in `src/data/kits.ts` (docs say 15). Complete today (all essentials have a verified filler): junk-journaling, watercolor, air-dry-clay, mahjong-night, pottery-paint-night. Incomplete: picnic, reading-book-club, racquet-sports.

## 2. Cross-cutting rules for the rewrite agents

### 2.1 Ordering rule
1. Open on the reader's situation, then name the monetisable spine (the activities where gear helps) in the first screen. The article's first sections and first list items are the gear-led ones.
2. Sort every list and every category by monetisability: gear-led first, then mixed, then free/venue last. Do not interleave free items with gear-led ones.
3. Put free, venue and service items together in ONE closing secondary section (2.2). They never open a section, never form a numbered "chooser" row, and never appear in the title or dek as the main promise.
4. The first shop block goes right after the first spine section (for listicles: after the first gear-led category), not only at the end (2.5).
5. If the number in a title ("25 weekend adventures") changes after demoting or merging, change the title. Titles must match the real count. Keep slugs.

### 2.2 Secondary-section rule and standard heading style
- One secondary section per article, always last before the closing blocks (`ifYouLoved`), at most about 20% of the body and at most 3 to 5 short items or one short paragraph.
- Heading styles to use (pick one, consistent across the site): **"Free ways to start"** for no-purchase starting points; **"Out and about"** for venue or class items (a pottery studio, a drop-in class, a museum visit) with one line each. Avoid headings that frame the article as no-spend ("No-spend options", "On a budget", "Costs nothing").
- Each secondary item is one or two sentences. If a gear line fits honestly, add it (2.3). If none fits, leave it plain; do not force one.
- Do not use `noSpend` blocks as a headline element or above the first shop block. If kept, one `noSpend` per article, placed in or just under the secondary section, worded so it says what an optional purchase adds ("Borrow first if you like; your own X makes the second visit easier").
- Do not repeat "free" or "cheap" in the title, dek, H2s or card chips. Never write "you do not need to buy anything" as the closing line of a section.
- Borrow-first advice stays, but as a short sentence inside the secondary section or beside the product, never as the lead.

### 2.3 Gear-line pattern for list items and sections
Pattern (one sentence, 12 to 25 words, benefit first): `**What makes it easier:** <product type in plain words>, so <concrete convenience>.`
- Variants: `**Worth bringing:**` (outings), `**Nice to have:**` (upgrades, never essentials), `**For the second visit:**` (later purchases).
- Examples: "**What makes it easier:** a small daypack, so water, a snack and a rain layer ride on your back instead of in your hands." "**Nice to have:** compact binoculars, which bring a distant branch close enough to see the colours."
- Fit it to the product, not the reverse: walking, trails and long park days sell walking or trail shoes, trekking-style socks, a daypack, a water bottle, a phone armband (for music or a map), a notebook. Do not claim any of it prevents blisters, injury or strain; describe the convenience only, and let the listing's own description carry material claims.
- At most one gear line per item, at most 25% of items without one only if truly nothing helps (calling a friend, a nap, a library card). Never write that gear is mandatory ("you need", "you must", "don't leave home without").
- Gear lines name product TYPES (matching `products.ts` ids or the proposed new ids) or, inline, verified catalog products with `{{product:catalog-id|link text}}` (it links only when verified, otherwise plain text). Never name a brand, price, rating or "best" unless it comes from a verified catalog record.

### 2.4 Title and dek guidance (slugs stay the same)
- Lead with the thing the reader will do or buy-adjacent outcome: "X, packed", "X: what to bring and how to start". A would-be buyer should see a concrete activity and a reason gear matters, not an offer.
- Allowed: specific nouns ("walking shoes, a daypack"), warm verbs, honest counts. Not allowed: "best", "must-have", "game changer", "ultimate", "you need", "limited", "everything you need" (unless the kit really is complete), "cheap", "free", "under $X", urgency, scarcity, "viral/TikTok" claims, health benefits.
- Dek states the promise in one or two sentences and may say what is inside ("each with the one small thing worth packing"). Keep brand phrases to one per article.
- The `searchIntent` and `angle` fields should be updated along with title and dek so they do not contradict the new framing.

### 2.5 Shop block placement (existing block types)
- `shopTheArticle`: verified catalog products tagged with the article slug. Preferred wherever verified products exist. Renders nothing otherwise.
- `shopHobby`: type-level product cards from `products.ts` (allowed now for everything). Use it where no verified products exist.
- `starterKit`: kit slots from `kits.ts`; only fills slots from verified products. The heading must read as "Where to start", never "Everything you need" unless the kit is complete (see section 1).
- Placement: (a) block 1 after the first spine section; (b) block 2 at the end, before `ifYouLoved`, for the remaining types; (c) in long listicles one short block after each gear-led category (max 3 per article). One shop block per roughly four screens. Do not show the same product twice in one article; do not stack `shopHobby` and `shopTheArticle` for the same products (the system dedupes, but keep copy distinct).
- `whatYoullNeed` stays but must split `essentials` (the activity itself) from `optional` (gear that makes it nicer), and optional items map to the shop block types. `first30` and `tryThisWeekend` blocks should name the gear in the step where it is first used.
- Titles for shop blocks: describe the situation ("For your first trail morning"), not the offer ("Shop now"). No scarcity.
- Do not write an affiliate disclosure into prose; the card and site footer handle it (`docs/commerce/AMAZON-DISCLOSURE.md`). Write link text that names the thing ("compact binoculars") not "click here".

### 2.6 What never to do
- Never state or imply a price, discount, rating, review count, stock level, "bestseller" or deal. Never invent an ASIN, brand, spec or "tested by us".
- Never promise a complete kit when the block is a "Where to start" card. Never call optional gear mandatory. Never use fake urgency ("before it sells out", "this weekend only").
- Never add alcohol (cocktail kits, wine, glassware framed around drinking), tobacco/vapes, supplements, medicines, sunscreen, first-aid or medical items, weapons or personal-safety devices. Mocktails, tea and coffee are fine as scene setting; link only non-regulated hardware.
- Never make a health, fitness or mental-health claim ("burns calories", "reduces stress", "prevents injury"). Movement is described as fun, not as treatment.
- Safety copy needs a source. Cycling helmets, lights and road rules, hiking safety, sun and heat, pet toxicity (lilies, daffodils), craft materials safety (paint seals, clay, glue) and solo-outing safety must either cite an entry already in the article's `sources` or have a new source added; do not add a statement without one. A product that carries a safety standard (helmets, paints with ACMI seals, children's materials) may be linked only from a verified listing and described without extra safety promises.
- Never rewrite or remove existing sourced facts to make space; move them.
- Never use first-person testing or invented anecdotes. No "I", "we tested", "my favourite".
- Never remove a hard constraint on the free path in the planner/tools (see 4.4).

## 3. Shop data audit

### 3.1 Product types in `src/data/products.ts` (36 types, search-link cards, no ASINs)
pottery-era: air-dry-clay, clay-tools, acrylic-paints, detail-brushes, ceramic-painting-kits, clay-mats. creative-girl: watercolor-sets, watercolor-sketchbooks, junk-journals, washi-tape, sticker-sets, embroidery-kits. sporty-girl: tennis-rackets, tennis-balls, pickleball-sets, water-bottles, sports-totes, daypacks. girls-night-in: mahjong-sets, friendship-bracelet-kits, conversation-cards, group-painting-kits, cookie-decorating-kits, board-games. bookish-girl: reading-journals, book-lights, magnetic-bookmarks, book-sleeves, book-nook-kits, reading-stands. little-adventures: picnic-blankets, film-cameras, pocket-notebooks, market-totes, portable-watercolor, binoculars.

Product-type gaps that articles and hobbies need (all type-level, no ASINs; catalog verification needed before any exact link): walking-shoes, trekking-socks, phone-armband, sketch-pads (plus fineliner pens), crochet-hooks, yarn, knitting-needles, flower-snips, vases, flower-frogs, jigsaw-puzzles, paint-by-number-kits, cozy-night-in (throw blanket, flameless candles, tea sampler), bike-helmets, bike-lights, bike-repair-kits, bike-bells, skate-protective-gear, thermos-flasks, portable-speakers, glue-guns, tea-sets, brush-pens, photo-albums, letter-writing-sets, indoor-plant-basics (pots, watering can, propagation jars), baking-basics, yoga-mats (careful wording), and a book-lover type for paperbacks (owner decision: books are the most natural Amazon item for reading and book clubs, but we must not invent titles; a generic "book club picks" search card needs the owner's approval).

Cards currently carry a `noSpend` field ("No-spend swap") for five types (clay-tools, clay-mats, junk-journals, water-bottles, magnetic-bookmarks). Report: this puts free framing on a product card; ask engineering whether to keep it as a short "Borrow or substitute" line at lower prominence. Do not change in the rewrite pass.

### 3.2 Catalog (`src/data/catalog.generated.ts`)
- Verified (37, render today): washi tape (mr-pen-washi-tape-21-rolls, knaid-slim-washi-tape-40-rolls-minimalist, knaid-grid-washi-tape-14-rolls-15mm, mr-pen-washi-tape-10-rolls-four-seasons), journals (paperage-blank-journal-160-pages, stationery-island-a5-blank-journal-180-pages), adhesive (scotch-glue-stick-photo-safe-4-pack, scotch-6061-tape-runner-3-pack, secopad-glue-tape-runner-4-pack), ephemera (knaid-200-piece-vintage-ephemera-cottagecore), pens (sakura-pigma-micron-8-pack-black), clay (crayola-air-dry-clay-5-lb-bucket, uhapeer-air-dry-clay-kit-3-lb, linphcey-clay-tools-kids-8-plus), acrylic (shuttle-art-acrylic-paint-15-tubes, apple-barrel-16-acrylic-craft-paints-2oz), sealer (mod-podge-acrylic-sealer-spray-gloss-12-oz), brushes (benicci-12-piece-artist-paint-brush-set, transon-8-round-watercolor-brushes, fenorkey-12-round-watercolor-brushes), canvas (esrich-8x10-stretched-canvas-10-pack, esrich-8x10-stretched-canvas-5-pack), watercolor (artecho-48-color-watercolor-set-3-brushes, arches-watercolor-pad-140lb-cold-press-9x12, hapikalor-watercolor-pad-140lb-9x12), embroidery (bradove-classic-embroidery-kit, inscraft-304-piece-embroidery-starter-kit, aqueenly-stork-embroidery-scissors-2-pack), yarn (red-heart-super-saver-white-worsted, caron-simply-soft-feathered-gray-3-pack), mahjong (jongyance-american-mahjong-set-white-tiles, tiasusan-american-mahjong-set-blue-tiles, mutex-american-mahjong-set-166-walnut-racks, nmjl-2026-large-size-cards-four-pack, nmjl-2026-standard-size-cards-four-pack, gustaria-large-mahjong-mat-blue-31-5, plusvivo-felt-game-table-cover-36-blue).
- Candidate (29, do not render; verification queue): see `MONETISATION-GAPS.csv` `candidateRef` and `docs/commerce/buy-plan/candidates-1..3.csv`. Candidate rows already exist for picnic (zaze blanket, maelstrom cooler), flower (leize shears, der-rose vases, sprina flower frog), pickleball (niupipo set, cyclotron balls), tennis (hiraliy racquet, penn balls), reading (zicoto journal, gel pens, gritin light), book club (tabletopics cards, dowan bowls), cozy (bedsure throw, nimiko candles, celestial tea, prime-time puzzle), craft night (paxcoo bracelets, ibayam scissors) and crochet hooks (two). Many further rows live only in the buy-plan CSVs without catalog records (Cotman and Koi watercolor, Daylite daypack, Nature DX binoculars, Giro helmet, Lezyne lights, Topeak repair kit, Field Notes, Baggu tote, Stanley bottle, Soundcore speaker, FreeSip bottle, Sushi Go and Ticket to Ride games, Fudenosuke brush pens, M35 film camera, skating pads, HEAD racquets).
- No verified product yet for: any outdoor, walking, cycling or fitness gear; reading; picnic; flower; tennis; pickleball; cozy; craft-night extras; solo-date gear. Rewrite agents must still write the page as if links will exist (type-level cards now), and must not mark any of these as verified.

### 3.3 Kits (`src/data/kits.ts`)
8 kits: junk-journaling, watercolor, air-dry-clay, mahjong-night, picnic, reading-book-club, pottery-paint-night, racquet-sports. Needed additions (slots only; products via Cowork): crochet-starter, embroidery-starter, flower-arranging, cozy-night-in, craft-night (currently shared under pottery-paint-night), trail-day (daypack, bottle, walking shoes, socks, armband, notebook), sketching-outing, cycling-first-ride, paint-by-numbers.
Wording risks: headlines "Everything for your first junk journal" and "Everything for your first game night" are only true when every essential slot is filled; the racquet-sports kit dek ("Borrow first if you can") and note ("try one first") open with the non-monetised point; picnic, reading and racquet-sports kits are incomplete today so the block must read "Where to start".

## 4. Hobbies and planner (report only)

### 4.1 `src/data/hobbies.ts` (43 hobbies)
- Hobbies with no `productIds` although gear helps: Crochet, Knitting, Flower Arranging, Calligraphy, Indoor Gardening, Yoga for Beginners, Dance Classes, Roller Skating, Running, Climbing, Board Games, Cooking Classes, Language Learning, Vinyl Collecting, Crossword Puzzles. Mapping to new types in 3.1 would let hobby pages and article shop blocks use the same cards.
- `cost: "free"` hobbies (9: Collage Art, Reading, Crossword Puzzles, Creative Writing, Hiking, Birdwatching, Nature Photography, Book Clubs, Volunteering) read as free-led. Their `supplies` lists put the free route first: "A free bird ID app, Your local park", "Your phone camera", "A library book or one you already own", "A local listing, A few free hours". Gear sits only in `optional` ("Compact binoculars", "Book light", "Daypack"). Suggested wording direction (do not change hard data like `cost` buckets): lead descriptions with what the gear adds, list the first piece of gear as the first supply when one honestly helps (Hiking: comfortable shoes, a daypack, a water bottle; Birdwatching: compact binoculars, a pocket notebook; Nature Photography: a phone armband or small camera; Reading: a book light).
- Descriptions and `whyYoullLoveIt` that stress free or already-owned: Collage Art ("Old magazines"), Creative Writing ("A notebook and pen", "A café window seat"), Reading ("most libraries lend books free"), Birdwatching ("Free apps can identify birds by song"), Hiking, Running ("free interval-timer app"), Yoga ("a free video"), Language Learning ("free app, library course or podcast"), Museum Exploring ("free days or pay-what-you-wish"), the shared `vid = "Free beginner video tutorials"` constant. In `equipment.ts`, `learning` items priced 0 to 0 (free app, free trail map) are fine as data but should sit below any gear lines on hobby pages.
- Many `startupBudget.assumptions` strings begin with what you can skip ("Assumes magazines, packaging and paper you already have", "Used sets may cost less", "Binoculars are an optional upgrade"). Keep them honest, but reorder so the first clause names the gear that makes the hobby easier.

### 4.2 `src/data/activities.ts` (planner activities)
Free is intentionally prominent here: many `cost: "free"` entries and `lowCost` hints ("Follow a free beginner video", "Head to a public court (often free)", "Check for a free-entry day"), plus `prep` lines such as "Download a free bird-ID app", and `supplies` such as "Phone with a free ID app", "Small budget in cash or card". The `gear` field exists and the plan card says "borrow or own".
- Hard constraint (do not change): when a visitor chooses free, the planner and tools must stay free.
- Reporting only: for visitors who do not choose free, activities that have a gear angle (golden-hour walk, bird walk, picnic, sketching, stargazing, craft nights, pickleball) could show the same gear line pattern (2.3) after the plan as an optional "what makes it easier" row. That is an engineering change; not part of the article rewrite.

## 5. Per-article summary table

Counts: gear-led / free / venue-service (items for lists; sections for guides). Rewrite size: S = copy and block moves, M = reorder plus new gear lines and a new shop block, L = restructure and retitle.

| Slug | Counts G/F/V | Class | Rewrite | Notes |
| --- | --- | --- | --- | --- |
| active-hobbies-for-women-who-dont-love-the-gym | 8/4/3 | B | M | gear fits, add shoes/socks/armband, skate pads |
| affordable-hobbies-under-25 | 11/4/0 | A | M | topic is gear-led, framing is "cheap" |
| at-home-creative-weekend | 9/1/0 of 10 sections | A | S | already spine; reposition shop block |
| cheap-weekend-adventures | 6/13/6 | C | L | biggest rewrite |
| cozy-solo-dates-at-home | 13/7/0 | A | M | alcohol item to drop |
| creative-hobbies-you-can-start-at-home | 19/2/0 | A | S | add missing types (yarn, hooks, flowers) |
| creative-hobby-starter-kits-worth-considering | all gear | A | S | add verified products |
| flower-arranging-as-a-hobby | gear-led, 0 shop blocks | A | M | add shop block, new types |
| girls-night-ideas-that-arent-drinks | 12/6/7 | B | M | out-and-about demoted |
| hobbies-to-try-when-life-feels-like-work-sleep-repeat | 29/5/1 | A | M | many new type gaps |
| how-to-find-a-hobby-as-an-adult | method-led, gear 25% | C | L | trial-kit framing |
| how-to-get-into-recreational-cycling-as-an-adult | 4/3 of 7 sections | B | M | helmet/lights/repair, sourced safety |
| how-to-host-a-craft-night | 5 of 5 projects | A | S | add speaker, scissors, glue gun |
| how-to-host-a-mahjong-night | gear-heavy | A | S | verified products exist |
| how-to-host-a-paint-night-at-home | all gear | A | S | verified products exist |
| how-to-plan-a-perfect-picnic | about 50% gear | B | M | thermos, tote, blanket, cooler |
| how-to-plan-a-solo-saturday | 2/3/3 sections | C | L | restructure into "Saturday kits" |
| how-to-start-a-book-club | 2 of 6 steps | C | M | "table kit" |
| how-to-start-a-reading-journal | about 80% gear | A | S | candidate journal, pens, light |
| how-to-start-air-dry-clay | all gear | A | S | verified products exist |
| how-to-start-crocheting | all gear, unshopped | A | M | new types hooks and yarn |
| how-to-start-embroidery | all gear | A | S | verified products exist |
| how-to-start-junk-journaling | all gear | A | S | verified products exist |
| how-to-start-playing-tennis-as-an-adult | about 55% gear | B | M | demote "borrow first" |
| how-to-take-yourself-on-a-solo-coffee-shop-date | 2/1/3 sections | C | M | reframe "pack the date" |
| junk-journaling-supplies-for-beginners | all gear | A | S | cannibalisation with how-to-start |
| low-energy-hobbies | 5/7/0 | C | M | free-first opening; gear angles |
| pickleball-for-beginners | about 55% gear | B | S | demote "borrow a paddle" |
| solo-date-ideas | 11/12/7 | C | L | second biggest rewrite |
| things-to-do-after-work-instead-of-scrolling | 13/7/5 | B | M | |
| things-to-do-on-the-weekend | 8/8/4 | C | L | |
| watercolor-painting-for-beginners | all gear | A | S | verified products exist |

Drafts (not in the 32): `cute-weekend-plans-that-arent-brunch` (picnic, thrifting, hiking, pottery painting, museum; venue/free-led, class C; if published, order by gear: picnic, sketch, film camera, craft at home; products picnic-blankets, market-totes, film-cameras) and `make-friends-as-an-adult-through-hobbies` (class C, groups and venues; spine is host-your-own-group: conversation-cards, mahjong-sets, craft kits, board-games; Cowork items already queued: conversation cards and mahjong set). Both need a full body before they can be rewritten.

## 6. Per-article plans

Format per article: (1) balance, (2) spine and what to demote, (3) gear angle per activity (existing type id, verified product id, or NEW needing Cowork verification), (4) title and dek, (5) restructure, (6) risks. Candidate refs: c1/c2/c3 = `docs/commerce/buy-plan/candidates-N.csv` (slot name), kit = `docs/commerce/kit-candidates-for-cowork.csv`. Gaps are in `MONETISATION-GAPS.csv`.

### active-hobbies-for-women-who-dont-love-the-gym
1. 15 items: gear 8 (pickleball, tennis, badminton/table tennis, hiking, cycling, birdwatching, nature photography, roller skating), free 4 (walking club, kitchen disco, gardening or plot, thrifting on foot), venue 3 (group class, dance classes, pool). Class B.
2. Spine: racket sports, hiking and walking, cycling, roller skating, birdwatching. Demote: group class, dance classes, pool, kitchen disco, community plot, walking club into "Free ways to start" and "Out and about".
3. Gear: pickleball-sets (c1 pickleball-paddles), tennis-rackets, tennis-balls, daypacks (c1 daypack-hiking-walks), water-bottles, binoculars (c1 birdwatching-walks), sports-totes. NEW: walking-shoes, trekking-socks, phone-armband for the walks and hikes; skate-protective-gear (c1 roller-skating-protective-gear); bike-helmets, bike-lights (link out to the cycling article). Kitchen disco and walking club may carry a phone-armband or speaker line (portable-speakers, c2 playlist-speaker) only if it fits.
4. Title: "15 Active Hobbies for Women Who Don't Love the Gym: What to Wear, Bring and Try" . Dek: "Fifteen ways to move that feel more like a good Saturday than a workout, each with the one small piece of gear that makes the first go easier." Opening: the reader's "I hate the gym" scene, then straight into the racquet and trail picks.
5. Reorder: racquet sports, outdoors, music (roller skating) first; fold "with friends" non-gear items (club, group class) into the secondary section. Shop block 1 after racket sports; block 2 (daypack, bottle, shoes, socks, armband) after Outdoors. Existing block (pickleball-sets, tennis-rackets, water-bottles, sports-totes) is a good base. Do not write "borrow a racket for round one" as the dek of the block.
6. Risks: any statement about heat, hydration, sun, safety gear or injury needs a source; no "burns", "tones", "improves mood". Roller-skate pads: describe as optional, no protection claims beyond a source. Outdoor swimming: no safety claims, no product.

### affordable-hobbies-under-25
1. 15 hobbies: gear 11, free 4 (reading, birdwatching, hiking, thrifting). Class A in content, but framing is cost.
2. Spine: the 11 make-something and cozy hobbies each with a first purchase. Demote the free four to a short "Free ways to start" block and the `noSpend` block ("Several of these can start today with nothing new") to its tail.
3. Gear: watercolor-sets, air-dry-clay, embroidery-kits, pocket-notebooks, junk-journals, friendship-bracelet-kits, board-games (jigsaw), binoculars, portable-watercolor. Verified: crayola-air-dry-clay-5-lb-bucket, apple-barrel-16-acrylic-craft-paints-2oz, bradove-classic-embroidery-kit, hapikalor-watercolor-pad-140lb-9x12, stationery-island-a5-blank-journal-180-pages. Candidates: c1 paper (XL Series pad), sketch pad, Original Kraft notebooks, paint-by-number kit (NEW type paint-by-number-kits), paxcoo bracelets. NEW: jigsaw-puzzles, baking-basics, indoor-plant-basics, sketch-pads.
4. Title: "15 Hobbies to Start This Month, With the First Thing to Buy for Each". Dek: "Fifteen easy ways in: for each hobby, a small first purchase that makes the first evening nicer, plus a short list of free ways to try." (Replaces "Small Budget" and the "We've left out dollar figures" intro stays but moves under the spine.) Avoid "under $25" in prose.
5. Move "About costs" below the first category; each item's `first` field becomes the gear line ("What makes it easier: ..."). Shop block after "Make-something hobbies" (watercolor, clay, embroidery, notebook) and a second after "Cozy-at-home". Keep `ifYouLoved`.
6. Risks: no dollar figures or "cheapest" claims without sources; "cost" fields on items now say free/cheap; keep them out of the headline. Baking and gardening gear lines must avoid food-safety or growth promises.

### at-home-creative-weekend
1. About 9 of 10 sections gear-led (clay, acrylic, watercolor, junk journal), 1 meal break. Class A.
2. Spine: the supply list and the three makes. Demote nothing; trim the "Lunch, and a proper break" and "Saturday evening" prose to one line each.
3. Gear: air-dry-clay, acrylic-paints, watercolor-sets, watercolor-sketchbooks (paper), junk-journals, washi-tape, detail-brushes, clay-mats. Verified: crayola-air-dry-clay-5-lb-bucket, apple-barrel-16-acrylic-craft-paints-2oz, shuttle-art-acrylic-paint-15-tubes, hapikalor-watercolor-pad-140lb-9x12, artecho-48-color-watercolor-set-3-brushes, stationery-island-a5-blank-journal-180-pages, scotch-glue-stick-photo-safe-4-pack, mr-pen-washi-tape-21-rolls, mod-podge-acrylic-sealer-spray-gloss-12-oz. Candidates for step-ups: c1 acrylic liquitex-basics, Cotman pocket set.
4. Title: "Plan an At-Home Creative Weekend: Clay, Paint and a Journal Spread" is fine; dek could add "with one shopping list for all three" ("Two slow days at home: ... A schedule and one supply list you can order in a single evening"). Keep "no pressure".
5. Move the shop block up to directly after "The shape of the weekend" / `whatYoullNeed` (Friday), then leave a short "if you want everything in one list" repeat at the end. Add a `starterKit` for air-dry-clay and watercolor only if wording says "Where to start". Use "Everything for the weekend, one list" only if the list is complete; otherwise "Start with this".
6. Risks: paint-safety line (ACMI seal) already sourced; keep. Drying time and sealant instructions come from the product listing, not invention.

### cheap-weekend-adventures
1. 25 items: gear 6 (trail, birdwatching, thrift crawl, sketching afternoon, picnic or potluck, stargazing), free 13 (big park, river path, sunrise spot, historic street, quiet public building, farmers' or flea market, secondhand bookshop, new neighbourhood, scavenger hunt, tourist day, group walk, bike or bus ride, library branch), venue/service 6 (botanical garden, museum free day, free gallery, community event, free class, volunteering). Class C. Title promises "cost almost nothing".
2. Spine (after rewrite): outings where gear changes the day: a trail morning, birdwatching, a picnic or park potluck, a sketching afternoon, a stargazing night, a market-and-thrift crawl, a sunrise/sunset spot, a bike or bus ride (carry bag), a walk-and-photo day. Demote: library, free museum, gallery, community event, volunteering, free class, historic street, quiet building, neighbourhood and scavenger hunt (merge into one 5-item "Free ways to start" section of one sentence each).
3. Gear: daypacks (c1 trail-and-walks Daylite), water-bottles, binoculars (c1 Nature DX), picnic-blankets (verified none; candidates zaze 80x80), market-totes (c1 market-and-thrift), pocket-notebooks (c1 Original Kraft), portable-watercolor, film-cameras. NEW: walking-shoes, trekking-socks, phone-armband, thermos-flasks, sketch-pads (c1 400 Series Sketch Pad) plus sakura-pigma-micron-8-pack-black (verified), cooler bag (zaze/maelstrom candidates).
4. Title: "Weekend Adventures, Packed: 15 Easy Outings and the Small Gear That Makes Each Nicer". Dek: "Trails, markets, picnic spots and sketching benches, each with the one thing worth putting in the bag. Pick one for Saturday." Opening: the packed daypack at the door, not the savings.
5. Cut to about 15 items (title says 15). Structure: "Trail and park days" (daypack, bottle, shoes, socks, armband), "Look-closer outings" (binoculars, notebook, sketch pad), "Market and picnic days" (tote, blanket, thermos), then "Free ways to start" (library, free museum day, gallery, community events). Replace "Four rules before you head out" with "Four things to pack" (water and a snack, a bag, a notebook, a charged phone). Shop block 1 after Trail and park days; block 2 after Market and picnic. `noSpend` block deleted or reduced to a clause. Cross-link `things-to-do-on-the-weekend`.
6. Risks: trail safety (tell someone, weather, daylight) needs a source (NPS hiking safety is already used in sibling articles; reuse). No claims for shoes or socks beyond listing description. Stargazing: no product beyond blanket/binoculars; no telescope claims without a source.

### cozy-solo-dates-at-home
1. 20 items: gear 13 (bath and book, blanket-fort film, audiobook and puzzle, re-read, paint by numbers, clay ring dish, junk journal, letter, calligraphy, dinner for one, bake, plant corner, photo album), free 7 (playlist, breakfast-for-dinner, rearrange shelf, dream-board, plan outing, spa hour, cocktail/mocktail lab). Class A.
2. Spine: cozy-kit items. Demote: playlist, shelf, plan-your-outing to a short section. Drop the alcohol angle: "Cocktail or mocktail lab" becomes "Mocktail and tea lab" with no alcohol and no barware gear line.
3. Gear: book-lights, reading-journals, junk-journals, washi-tape, air-dry-clay, board-games (jigsaw), group-painting-kits? (no; use PBN). Candidates in catalog: bedsure-sherpa-fleece-throw-50x60, nimiko-flameless-led-candles-with-remote, celestial-seasonings-herbal-tea-sampler, prime-time-puzzles-1000-piece-mountain-cabin, gritin-19-led-rechargeable-book-light (all candidate status; c1 cozy rows). Verified: stationery-island-a5-blank-journal-180-pages, mr-pen-washi-tape-21-rolls, crayola-air-dry-clay-5-lb-bucket. NEW: cozy-night-in type; brush-pens (c1 Fudenosuke); paint-by-number-kits; photo-albums; letter-writing-sets; indoor-plant-basics.
4. Title: "20 Cozy Solo Dates at Home, and the Small Things That Make Them Feel Planned". Dek: "A throw, a light, a puzzle or a first page of clay: twenty at-home dates for rainy days and low batteries, with what makes each one nicer."
5. Move "The night-in kit" shop block up to right after "Set the scene in ten minutes", and a second block after the creative section. `noSpend` block ("Most of these need only what's already in the house") goes or becomes "Free ways to start" at the end (bath, letter, shelf, dinner).
6. Risks: no health claims for "bath", "spa hour" or relaxation; flameless candles only (no real candle burn promises or fire-safety advice without source); tea: no health benefits.

### creative-hobbies-you-can-start-at-home
1. 21 items: gear 19, free 2 (creative writing, collage with scraps). Class A.
2. Spine: the clay, paint, thread and paper hobbies. Demote: the `noSpend` paper-hobbies block to one line; creative writing last.
3. Gear: watercolor-sets, air-dry-clay, clay-tools, acrylic-paints, embroidery-kits, junk-journals, friendship-bracelet-kits, washi-tape, detail-brushes. Verified: bradove-classic-embroidery-kit, inscraft-304-piece-embroidery-starter-kit, red-heart-super-saver-white-worsted (crochet), caron-simply-soft-feathered-gray-3-pack. Candidates: c1 crochet hooks (Clover Amour), c1 brush lettering (Fudenosuke), paint-by-numbers, paxcoo bracelets. NEW: crochet-hooks, yarn, knitting-needles, flower-snips, vases, baking-basics, indoor-plant-basics, jigsaw/PBN, sewing-kit (tote; mark NEW, no candidate).
4. Title: "21 Creative Hobbies You Can Start at Your Kitchen Table, With the First Thing to Pick Up" . Dek: "Twenty-one things to make with your hands, sorted by mess level, each with an easy first project and the small starter set that goes with it."
5. Each item: add the gear line to `note`. Shop blocks: a short one per category (paper, paint, clay, thread). The existing `starterKit` block is under clay: keep, label "Where to start". Flower arranging, gardening and baking go to a short last category.
6. Risks: craft materials safety only with the existing ACMI-style source; no "no talent needed" overclaims; do not promise "everything in one box".

### creative-hobby-starter-kits-worth-considering
1. All content is purchase advice: 100% gear-led. Class A.
2. Spine: "when a kit makes sense", seven questions, hobby by hobby verdicts. Demote: the "test the waters first" paragraph stays as one line in "Free ways to start".
3. Gear: embroidery-kits, ceramic-painting-kits, air-dry-clay, watercolor-sets, junk-journals, group-painting-kits. Verified now: bradove-classic-embroidery-kit, inscraft-304-piece-embroidery-starter-kit, uhapeer-air-dry-clay-kit-3-lb (a verified kit), crayola-air-dry-clay-5-lb-bucket, artecho-48-color-watercolor-set-3-brushes, hapikalor-watercolor-pad-140lb-9x12, esrich canvases, benicci brushes, apple-barrel paints, stationery-island journal. c1 has rows for each hobby (embroidery-kit, watercolor-loose, air-dry-clay-kit, group-painting-kit).
4. Title: "Are Craft Starter Kits Worth It? What to Look For Before You Buy" is good; keep. Dek: "Seven questions to ask before you buy a craft kit, plus which hobbies suit a box and which are better bought loose." Add the opener's hook "a first purchase that gets you to a finished thing".
5. Replace "This page doesn't rank named kits" paragraph: say verified examples are linked where available. Add `shopTheArticle` after "Kit or loose, hobby by hobby" and per-hobby inline `{{product:id|text}}` links in that list. Keep the red-flag checklist (it builds trust that supports links).
6. Risks: never call any kit "complete" unless slots are filled; no "best kit" language; no safety or food-contact claims without a source.

### flower-arranging-as-a-hobby
1. Gear-led topic (tools, vases, flower food, flower frog) but zero shop blocks and no `productIds`. Flowers themselves are bought at a grocery store and are not monetised. Class A (unshopped).
2. Spine: "What you need" (vase, snips, tape grid, flower food), "A recipe you can reuse" (frog, bud vases for small stems), "Making it a weekly ritual" (a rotation of vases). Demote: nothing major; shorten "Why it is worth trying".
3. Gear: NEW types flower-snips, vases, flower-frogs (candidates in catalog: leize-floral-shears-flower-scissors, der-rose-12-glass-bud-vases, sprina-4-piece-flower-frog-kenzan-set; c1 snips, vases, flower-food, stem-holder). NEW: flower food (needs Cowork verification; note this is a plant-care product, no health claim). Existing: market-totes (to carry bunches home).
4. Title: "How to Arrange Grocery-Store Flowers So They Look Like a Florist Did It" is good. Dek: "One bunch, one vase and a three-layer recipe, plus the small tools that make stems behave. A twenty-minute weekly habit." 
5. Add `shopHobby` (flower-snips, vases, flower-frogs) after "What you need", and a final block after "Keeping them fresh" for the weekly-ritual items. Put a gear line on each of the three layers and on "Common mistakes" (flopping stems: frog). Add productIds to front matter.
6. Risks: pet-toxicity note (lilies, daffodils) already has ASPCA sources; keep the note and do not link toxic flower products. No claims about "kills bacteria" for flower food; cite extension sources already in the article.

### girls-night-ideas-that-arent-drinks
1. 25 items: gear 12 (craft night, cookie decorating, board games, bracelets, mahjong, themed movie marathon, puzzle and podcast, vision board, letter-writing, conversation-cards dinner, tea tasting, book club night), free 6 (walk-and-talk, potluck, volunteer, bookstore swap, thrift crawl, farmers market picnic), venue/service 7 (pottery studio, drop-in class, museum, roller rink, public court, beginner hike, spa night). Class B.
2. Spine: the "Cozy and at home" section plus mahjong, craft, paint night and games. Demote: "Out and about" items into one "Out and about" section of short lines, each with a gear line where honest (pickleball-sets, picnic-blankets, skate pads).
3. Gear: group-painting-kits, cookie-decorating-kits, board-games, conversation-cards, friendship-bracelet-kits, mahjong-sets. Verified: esrich canvas packs, benicci brushes, apple-barrel paints, tiasusan mahjong set, nmjl 2026 cards, gustaria mat. Candidates: paxcoo bracelets, ibayam scissors, dowan bowls, nimiko candles (c1 girls-night rows), Just One (NEW).
4. Title: "25 Girls' Night Ideas That Aren't Drinks" can stay, or "25 Girls' Night Ideas That Aren't Drinks: What to Set Out for Each". Dek: "Plans for the group chat that give everyone something to do and something to say, with the kit that gets each one started." Voice: "girls" is fine used naturally, not as a tic.
5. Shop block 1 (already after Cozy and at home) stays but gets mahjong and craft types. Add `starterKit` for pottery-paint-night (complete) after the craft items. Move "Getting the group chat to commit" up as a mid-article practical block. Tea tasting and "mocktail" lines: tea sampler, no alcohol items. Secondary section at end.
6. Risks: no alcohol gear; "spa night in" no health claims or product claims; inclusivity note stays.

### hobbies-to-try-when-life-feels-like-work-sleep-repeat
1. 35 items: gear 29, free 5 (crosswords, volunteering, museum, thrifting, nature photography), venue 1 (pottery painting studio, also at-home kit). Class A.
2. Spine: the creative, low-energy and outdoor hobbies. Demote: wildcard hobbies (thrifting, museum), volunteering, crosswords into a short secondary line.
3. Gear: watercolor-sets, embroidery-kits, junk-journals, air-dry-clay, tennis-rackets, pickleball-sets, board-games, friendship-bracelet-kits, mahjong-sets, binoculars, picnic-blankets, film-cameras, portable-watercolor, pocket-notebooks, daypacks, ceramic-painting-kits, group-painting-kits, conversation-cards. NEW: crochet-hooks, yarn, knitting-needles, brush-pens, paint-by-number-kits, jigsaw-puzzles, skate-protective-gear, vinyl (no type proposed; leave plain), baking-basics, flower-snips. Candidates all in c1 rows for this slug (PBN, jigsaw, embroidery, Cotman, XL pad, clay, junk, crochet hook and yarn, Fudenosuke, pickleball, tennis, picnic, binoculars, mahjong, bracelets).
4. Title: "35 Hobbies to Try When Your Life Feels Like Work, Sleep, Repeat" can stay; dek: "...thirty-five hobbies sorted by how much energy you have left, each with an easy first session and the one small thing that makes it easier to start."
5. One short shop block after each category (low-energy, creative, outdoor, social), 3 to 4 cards each; the existing single block under creative stays. Each item's note gets one gear line. `noSpend` block becomes the last lines of the closing section.
6. Risks: no mental-health framing (the article says "A hobby won't fix your job", keep); no claims for "recover" or "relax" benefits.

### how-to-find-a-hobby-as-an-adult
1. Guide: method-led (audit, three trials, one-week experiment, keep/park/drop, objections). Gear about 25% (notebook, three trial kits, daypack). Class C.
2. Spine: "Pick three and try the smallest version" and "Run a one-week experiment" is where gear belongs. Demote: the objections block ("I'm not good at anything", "Nothing sticks", ...) shorten; "Borrow first" advice kept as one bullet.
3. Gear: pocket-notebooks (c1 Original Kraft; c2 Field Notes), watercolor-sets / portable-watercolor (c1 Cotman; c2 Koi), air-dry-clay (c1 crayola verified; c2 DAS), daypacks (c1 Daylite), board-games, conversation-cards, pickleball-sets. Each of the "making / moving / people" categories in the list gets a "trial kit".
4. Title: "How to Find a Hobby as an Adult (When You Say 'I Don't Really Have Any Interests')" stays. Dek: "A nosy little audit, three small trial kits and a one-week experiment to find the thing you'd happily do again. No passion required."
5. Add a "Three trial kits" block directly after the "Pick three" section (notebook, a mini watercolor or clay set, a daypack for the outdoor trial) and make the first `shopHobby` ("Three easy first buys") the lead block; move the experiment content after it. Convert the list "Making something / ..." into rows with a gear line each. Keep the method; do not add gear to the audit.
6. Risks: stay honest that borrowing works; do not promise a hobby "will be found". No self-help or health claims.

### how-to-get-into-recreational-cycling-as-an-adult
1. 7 steps: gear-led steps 4 (helmet, being seen/lights, safety check/repair, first ride bag), free 3 (practice, build up, borrow a bike). Class B.
2. Spine: Step 2 (helmet), Step 3 (lights, bell), Step 4 (pump/repair), Step 6 (daypack, bottle, tote). Demote: "borrow a bike" stays at the start but one sentence. A bike itself: do not sell (no type proposed); the article may mention renting/borrowing.
3. Gear: daypacks, water-bottles, market-totes (existing). NEW: bike-helmets (c2 Giro Fixture MIPS II), bike-lights (c2 Lezyne KTV Drive Pro), bike-repair-kits (c2 Topeak Deluxe Accessory Kit), bike-bells (NEW, no candidate), phone-armband or phone mount (NEW, no candidate). 
4. Title: "How to Start Cycling Again as an Adult: A Gentle, No-Lycra Plan" good. Dek: "A well-fitted helmet, lights for dusk, a small repair kit and a bakery at the end. How to get back on a bike without feeling like an athlete."
5. Move the shop block from the end to right after Step 3, as "Helmet, lights, bell" (cards); second block after Step 6 (daypack, bottle, tote, repair kit). Keep every safety step in the article exactly as sourced (CDC, CPSC, NHTSA).
6. Risks: HIGH. Helmet and lights are safety products. Any claim about protection, standards or fit must come from the article's existing sources (CDC, CPSC, BHSI, NHTSA); do not state certification or MIPS benefits unless the verified listing states it. No claim that gear prevents injury. Lighting laws vary by place; keep "check local rules".

### how-to-host-a-craft-night
1. 5 projects, all gear (pottery painting pieces, bracelets and beads, air-dry clay, cookie decorating, collage); logistics sections non-gear. Class A.
2. Spine: the project menus. Demote: collage (magazines are free) to the last project; budget and invitations stay short.
3. Gear: ceramic-painting-kits, friendship-bracelet-kits, air-dry-clay, cookie-decorating-kits, group-painting-kits, acrylic-paints, portable-speakers (c2 Soundcore Select 4 Go), glue-guns (c2 AdTech Cool Tool), scissors (candidate ibayam-8in-heavy-duty-scissors-3-pack). Verified: crayola-air-dry-clay-5-lb-bucket, apple-barrel-16-acrylic-craft-paints-2oz, benicci-12-piece-artist-paint-brush-set, esrich canvas packs, uhapeer-air-dry-clay-kit-3-lb. Candidate: paxcoo-488pc-friendship-bracelet-kit.
4. Title: "How to Host a Craft Night: Five Easy Projects and a Plan". Dek: "Easier than a dinner party. A hosting checklist, five craft menus with what to set out for each, and a simple way to share the cost."
5. After each of the five menus, one inline gear line and `{{product:...}}` where verified. Keep the existing `shopHobby`, move it after project 2. Update the `whatYoullNeed` split. Add speaker line in "The evening, minute by minute".
6. Risks: food crafts (cookie decorating) allergen note needs a source or removal; no kids' claims.

### how-to-host-a-mahjong-night
1. Gear-heavy (set, mat, card, bowls, tea service); service content (find a teacher, lessons). Class A.
2. Spine: "If you do buy a set" and "What to have on the table". Demote: "Find your teacher" to a short secondary point inside "Free ways to start" (ask a friend, a library group), lesson mention stays one line.
3. Gear: mahjong-sets (verified: tiasusan-american-mahjong-set-blue-tiles, jongyance-american-mahjong-set-white-tiles, mutex-american-mahjong-set-166-walnut-racks), nmjl-2026-large-size-cards-four-pack / standard, gustaria-large-mahjong-mat-blue-31-5, plusvivo-felt-game-table-cover-36-blue (all verified). Candidates: protective card sleeve, dowan bowls, Hario teapot (c2 tea-service), celestial tea.
4. Title: "How to Start a Mahjong Night With Your Girls" stays (owner clarification on "girls"). Dek: "A standing Friday, a pot of tea and a game that keeps everyone talking. How to host a first night and pick a set that matches your version."
5. Already has `shopTheArticle`; move it up to right after "What to have on the table" (the set is the centerpiece) and add tea service and bowls in a short second block. Keep "does the listing name your version" caveat verbatim.
6. Risks: tile sets for American mahjong only; "Playing with respect" section stays; no claims about the 2026 card beyond what the verified listing states.

### how-to-host-a-paint-night-at-home
1. All sections gear-led (canvas, paint, brushes, easel). Class A.
2. Spine: whole article. Demote: nothing; shorten "Keeping the mood easy".
3. Gear: group-painting-kits, acrylic-paints, detail-brushes, conversation-cards. Verified: esrich-8x10-stretched-canvas-5-pack and 10-pack, benicci-12-piece-artist-paint-brush-set, apple-barrel-16-acrylic-craft-paints-2oz. Step-up: liquitex basics (c2), speaker (c2 playlist-speaker). Candidate: auhoahsil-12-round-acrylic-paint-brushes.
4. Title: keep. Dek: "One easy painting, one table and one shopping list, so even the friend who says she can't draw leaves with a canvas she's proud of."
5. Convert the front-loaded `shopHobby` to `shopTheArticle` (verified products exist) and place it after "Choose one easy painting". Keep the ACMI seal line.
6. Risks: ventilation and paint safety are sourced; do not add stronger claims.

### how-to-plan-a-perfect-picnic
1. About 9 sections: gear 5 (packing list, "making it look the part", "unglamorous bit", activities, spot items), menu 1 (food), free/method 3 (timeline, spot, when it goes wrong). Class B.
2. Spine: packing list and "making it look the part". Demote: location scouting and menu stay but trimmed; menu is not monetised.
3. Gear: picnic-blankets (candidate zaze-80x80-waterproof-picnic-blanket), market-totes (c2 Baggu), water-bottles, thermos-flasks (c2 Stanley), cooler bag (candidate maelstrom-24-30-60-can-soft-cooler-bag), plates/cutlery (NEW type picnic-tableware, no candidate), book-sleeves, pocket-notebooks, portable-watercolor for "once you're sitting down".
4. Title: "How to Plan a Dreamy Aesthetic Picnic" stays. Dek: "A picnic that looks as good as it tastes: the timeline, the spot, a menu that survives the trip and the packing list that makes it easy."
5. Shop block directly after "The packing list" and `starterKit` picnic (label "Where to start", incomplete today). Gear lines on each packing list line. Second block after "Once you're sitting down" (sketch, read).
6. Risks: food safety (cooler temperatures, "two hours") needs a source (USDA) if stated; insects/sun statements need sources; avoid health claims about hydration.

### how-to-plan-a-solo-saturday
1. 8 sections: gear 2 (sample day packs, "Pack the bag"), free 3 (free day, treat, Thursday set-up), venue/service 3 (museum, class, sit-down lunch). Class C.
2. Spine: turn each of the three sample Saturdays into a "kit": Wander kit (walking shoes, daypack, bottle, phone armband, notebook, film camera), Park kit (picnic-blankets, market-totes, thermos), Make-something kit (portable-watercolor, sketch pad, pocket notebook). Demote: museum, paid class, sit-down lunch into "Out and about".
3. Gear: picnic-blankets (c2 zaze), market-totes (c2 Baggu), pocket-notebooks (c2 Field Notes), portable-watercolor (c2 Koi, Cotman), film-cameras (c3 M35), water-bottles, daypacks. NEW: walking-shoes, trekking-socks, phone-armband, thermos-flasks, sketch-pads.
4. Title: "How to Plan a Solo Saturday You'll Actually Look Forward To: Three Ways to Pack It". Dek: "Give your Saturday a storyline: one anchor, one treat, a wander and a rest. Three sample days, each with the bag that goes with it."
5. Keep the four-part frame, then replace "Free / Mid-range / Treat-yourself" with three kits (spine). Shop block per kit (3 short blocks). "Out and about" list at the end. Link `how-to-take-yourself-on-a-solo-coffee-shop-date`.
6. Risks: solo safety (sharing location) needs the already-sourced DOJ/NPS entries; do not add safety gadgets. No price words in headings ("Free", "Mid-range").

### how-to-start-a-book-club
1. 6 steps: gear 2 (journal, conversation cards, light, snacks), method 4. Class C.
2. Spine: Step 5 (run the night: cards, snacks, tea) and "make it feel like a club". Demote: the invite and scheduling steps are essential method but short; "Library book club" ideas stay as secondary.
3. Gear: conversation-cards (candidate tabletopics-book-club-conversation-cards), reading-journals (candidate zicoto-hardcover-reading-journal), book-lights (candidate gritin-19-led-rechargeable-book-light; c2 Vekkia), magnetic-bookmarks, tea-sets (c2 Hario), snack bowls (candidate dowan-small-ceramic-bowls-set-of-4), candles (candidate nimiko-flameless-led-candles-with-remote). Owner decision: a "book club picks" card for paperbacks.
4. Title: "How to Start a Book Club Your Friends Will Actually Show Up To: The Kit and the Plan". Dek: "A simple structure that survives busy months, plus a small table kit for the night: the invite text, a book-picking system, conversation cards and what to do when nobody finished."
5. Add a "The table kit" block right after Step 3 and move the existing block (conversation cards, light, journal) to follow Step 5. Gear line in each step where it helps.
6. Risks: do not invent books or authors; no book list; no health claims for reading.

### how-to-start-a-reading-journal
1. About 80% gear (journal, pens, layouts). Class A.
2. Spine: "What makes a reading journal feel good" and layouts. Demote: nothing; shorten "Pages worth adding later".
3. Gear: reading-journals (candidate zicoto-hardcover-reading-journal; c2 Leuchtturm1917 step-up), pocket-notebooks (c2 Field Notes), book-lights (candidate gritin; c2 Vekkia), magnetic-bookmarks, sakura-pigma-micron-8-pack-black (verified), paper-mate-inkjoy-gel-pens-14-fine (candidate), washi-tape (verified).
4. Title: "How to Start a Reading Journal You Will Actually Keep: Notebook, Pen, Five Lines". Dek: "Start in five minutes with a notebook and five lines per book. Three layouts, and the small things that make the habit stick."
5. Move the shop block right after "Pick a layout"; `whatYoullNeed` becomes the spine. Add gear line per layout.
6. Risks: none beyond no "build a habit" health claims.

### how-to-start-air-dry-clay
1. All sections gear-led. Class A.
2. Spine: whole article. Demote: nothing.
3. Gear: air-dry-clay (verified crayola-air-dry-clay-5-lb-bucket, uhapeer-air-dry-clay-kit-3-lb), clay-tools (verified linphcey-clay-tools-kids-8-plus), clay-mats, acrylic-paints (verified apple-barrel, shuttle-art), detail-brushes (verified benicci), sealer (verified mod-podge-acrylic-sealer-spray-gloss-12-oz). Candidates: DAS clay (c2), generic clay tools (c2 tools).
4. Title: "Your Air-Dry Clay Era: A Beginner's Guide to Making Cute Little Things at Home". Dek: "Trinket dishes, jewelry holders and tiny figurines, no kiln required, plus the few supplies that make the first dish easier."
5. Move the `shopTheArticle` up to directly after "What you need"; keep "If something goes wrong". Mind sealer wording: use the listing's own text, no safety claims.
6. Risks: sealant and ventilation statements need the existing sources; do not add fumes or food-safety claims. Linphcey tools are "kids 8 plus"; describe only as the listing says.

### how-to-start-crocheting
1. All sections gear-led, no shop block except `shopTheArticle` with no verified hooks; no `productIds`. Class A (unshopped).
2. Spine: "What you need" (hook, yarn, scissors, needle), "Common mistakes" (stitch markers). Demote: nothing.
3. Gear: NEW types crochet-hooks, yarn, stitch-markers. Verified: red-heart-super-saver-white-worsted, caron-simply-soft-feathered-gray-3-pack, aqueenly-stork-embroidery-scissors-2-pack (small snips). Candidates: crochet-hooks-12-sizes-44-pcs-ergonomic-rp-tech, crochet-hooks-12-sizes-51-pack-ming-shun, c2 Clover Amour hook, c2 Pound of Love yarn step-up, kit Silvalume hook.
4. Title: "Crochet Your First Thing This Weekend: Hook, Yarn and Three Stitches". Dek: "The hook, the yarn and the three stitches that open the door to almost everything, plus a first square you can finish in a weekend."
5. Add `shopHobby` of new types (crochet-hooks, yarn) after "What you need" and `shopTheArticle` for verified yarn; add `crochet-starter` kit slot.
6. Risks: yarn weight and hook size must match the listing; no "relaxing" health claims.

### how-to-start-embroidery
1. All gear-led. Class A.
2. Spine: "Kit or loose supplies?" and "Six stitches worth learning". Demote: nothing.
3. Gear: embroidery-kits (verified bradove-classic-embroidery-kit, inscraft-304-piece-embroidery-starter-kit), aqueenly-stork-embroidery-scissors-2-pack (verified; candidate 3-swords-germany-stork-embroidery-scissors), hoops (NEW type embroidery-hoops).
4. Title: "Your First Embroidery Hoop, Finished in One Evening". Dek: "The supplies, the stitches worth learning first, and a small first hoop that is easy to finish in an evening."
5. Convert `shopHobby` to `shopTheArticle`; place after "Kit or loose supplies?" Gear line on each of the six stitches only where scissors or hoop matters.
6. Risks: needle safety only if sourced; otherwise skip.

### how-to-start-junk-journaling
1. All gear-led. Class A.
2. Spine: "What you need (and what's fun to add)" and "Four techniques". Demote: nothing; the `girlsNight` block stays.
3. Gear: junk-journals, washi-tape, sticker-sets, pocket-notebooks. Verified: stationery-island-a5-blank-journal-180-pages, paperage-blank-journal-160-pages, mr-pen-washi-tape-21-rolls, knaid washi packs, scotch-glue-stick-photo-safe-4-pack, scotch-6061-tape-runner-3-pack, secopad-glue-tape-runner-4-pack, knaid-200-piece-vintage-ephemera-cottagecore, sakura-pigma-micron-8-pack-black. Kit: `junk-journaling` (complete).
4. Title: keep. Dek: "How to begin: tickets, tags and receipts glued into a notebook. A first page you can make tonight, and the few supplies that make it prettier."
5. Move `shopHobby` to `starterKit` junk-journaling (complete kit: allowed to say "Everything for your first junk journal" only while essentials are filled) and place it right after "What you need". Keep the "start with what's in the house" sentence in the `whatYoullNeed` essentials.
6. Risks: overlap with `junk-journaling-supplies-for-beginners` (see below).

### how-to-start-playing-tennis-as-an-adult
1. 4 weekly stages plus the first section; gear about 55% (racket, balls, bottle, tote, shoes), free practice 45%. Class B.
2. Spine: "choose your first racket" and the four weeks with the gear named at the point of use. Demote: "Before you buy: try a racket for free" to the secondary "Free ways to start" at the end as a one-sentence option.
3. Gear: tennis-rackets (candidate hiraliy-27-inch-tennis-racket-with-ball-bag; c1 HEAD Ti.S6; c3 Ti.S6 strung), tennis-balls (candidate penn-championship-extra-duty-tennis-balls), water-bottles (c3 FreeSip), sports-totes, court shoes (NEW tennis-shoes, later upgrade). kit: racquet-sports (incomplete, "Where to start").
4. Title: "How to Start Playing Tennis as an Adult: A Four-Week Plan, Gear Included". Dek: "Four weeks from 'I haven't held a racket since school' to a short rally and a real game, with the racket, balls and bottle that make it easier."
5. Move "Before you buy" below Week 1; shop block 1 right after "What you'll need". Keep the "when it goes sideways" checklist.
6. Risks: sun protection and injury statements need a source (USTA entries are present); do not link sunscreen or any health product.

### how-to-take-yourself-on-a-solo-coffee-shop-date
1. 6 steps: gear 2 (pack the bag, six things to do), free/method 1 (first ten minutes), venue 3 (pick the place, order, seat). The cafe itself is a paid venue we cannot monetise. Class C.
2. Spine: "Pack for the date" (notebook, book sleeve, journal, portable watercolor). Demote: "pick the place", "order like you mean it" and "seat" to shorter notes.
3. Gear: pocket-notebooks (c3 Original Kraft), book-sleeves (c3 padded canvas sleeve with zipper), reading-journals (c3 zicoto candidate), portable-watercolor (c3 Koi), junk-journals (c3 paperage verified), sakura-pigma-micron-8-pack-black (verified), market-totes. NEW: headphones (needs Cowork verification; optional).
4. Title: "How to Take Yourself on a Solo Coffee Shop Date: What to Pack and What to Do". Dek: "Pick the place, pack the bag, order well and six things to do once you're settled: a notebook, a book, a pocket sketch set."
5. Move "Pack for the date" to Step 1 and put the shop block directly under it; add gear lines to the "Six things to do" list. Cafes remain neutral, no naming.
6. Risks: no health claims about solitude; solo-safety tips need the sourced references.

### junk-journaling-supplies-for-beginners
1. All gear-led. Class A.
2. Spine: whole article. Demote: nothing.
3. Gear: as above; `starterKit` junk-journaling complete. Candidate: scotch-tape-runner-extra-strength-055, staedtler-pigment-liner-8-pack-black, generic vintage scrapbook paper (two candidate rows).
4. Title: "Junk Journaling Supplies: The Small Shopping List That Gets You Started" keep. Dek: "What to buy first, what you probably own already and the pretty extras that can wait until page three."
5. Differentiate from `how-to-start-junk-journaling`: this one is the shopping-list page and should hold the longer set of verified products (washi, adhesive, ephemera, pens) with "three baskets" as `shopTheArticle` blocks; the how-to page holds only the minimal set. Cross-link both ways.
6. Risks: product claims only from verified listing text; no "residue-free" promises.

### low-energy-hobbies
1. 12 items: gear 5 (jigsaw, paint by numbers, knitting, embroidery, friendship bracelets), free 7 (one album, three lines, a slow stretch, audiobook and chore, cookbook, photo-album sort, plant care). Class C by count, but every free item has an honest gear angle.
2. Spine: "Hands busy, brain quiet" (the five make-and-puzzle hobbies) first. Demote: the seven no-setup items into the secondary section "Free ways to start" with short gear lines.
3. Gear: embroidery-kits (verified bradove-classic-embroidery-kit; scissors aqueenly verified), book-lights (c3 Amber; candidate gritin), blanket (candidate bedsure-sherpa-fleece-throw-50x60), friendship-bracelet-kits, board-games (puzzle), pocket-notebooks. NEW: jigsaw-puzzles (c3 500-piece), knitting-needles, paint-by-number-kits, photo-albums, indoor-plant-basics, yoga-mats (for "slow stretch": no health claims).
4. Title: "12 Low-Energy Hobbies for When You Have Nothing Left, Each With a Two-Minute Setup". Dek: "Twelve hobbies for evenings when you have nothing left, from a puzzle on a tray to a first row of stitches. Ten minutes counts."
5. Reorder: "Hands busy, brain quiet" first; "Battery nearly flat" second as "No setup at all" (short). Shop block directly after the first section (jigsaw, embroidery, blanket, light), second after the second. Delete the `shopHobby` single-card block ("Something gentle for your hands") and replace with the new blocks.
6. Risks: tone must stay gentle (no "fix your tiredness"); no health or sleep claims; stretching mention: no benefit claims.

### pickleball-for-beginners
1. About 55% gear (paddles, balls, bottle, shoes, bag), rules and courts free/method. Class B.
2. Spine: "What to bring, and what to skip" and "A first session". Demote: "borrow a paddle" to one sentence; "Finding your people" (venue) shortened.
3. Gear: pickleball-sets (candidate niupipo-pickleball-paddles-set-of-2-with-balls; c3 SLK NEO 2.0 set; c3 Z5 graphite step-up), balls (candidate cyclotron-6-pack-pickleball-balls; c3 X-40), water-bottles (c3 FreeSip), sports-totes, court shoes (NEW pickleball-shoes, later upgrade). Kit racquet-sports (incomplete).
4. Title: "Everything You Need for Your Pickleball Era" is a prohibited promise ("everything"); use "Pickleball for Beginners: The Rules, the Court and the Gear for Your First Game". Dek: "The court in plain English, four rules that get you playing, the starter paddle set and bottle worth bringing, and what to say when you walk up to a game."
5. Move the shop block to right after "What to bring, and what to skip". Keep rules and the court as sourced method content; they build trust.
6. Risks: the existing sourced rule claims stay; no "USAPA approved" claims unless the verified listing says so (the niupipo row notes the approval claim is unchecked: do not repeat it).

### solo-date-ideas
1. 30 items: gear 11 (pocket watercolor, sketch a cafe corner, film walk, junk journal, picnic for one, short hike, birdwatching bench, bike ride, roller skating, stargazing, a short story over lunch), free 12 (library, golden-hour walk, bench, sunrise spot, neighborhood crawl, free museum hour, bookstore browse, postcard, rainy walk, lakeside sit, museum reader's edition, thrift crawl), venue/service 7 (coffee shop, matinee, farmers' market, dessert dinner, flower stop, pottery walk-in, paddle rental). Class C.
2. Spine: "Make something, somewhere" (watercolor, sketch, film walk, junk journal, notebook story) and "Outdoors" with gear. Demote: "Free and wandering" and "Low-cost treats" venue items into one end section "Free ways to start" and "Out and about" with one line each (library, free museum hour, bookstore, matinee, dessert).
3. Gear: portable-watercolor (c3 Koi), pocket-notebooks (c3 Original Kraft), book-sleeves (c3), picnic-blankets (candidate zaze), film-cameras (c3 M35), junk-journals (verified stationery-island, paperage), washi-tape, daypacks, water-bottles, binoculars, skate-protective-gear. NEW: walking-shoes, trekking-socks, phone-armband, sketch-pads.
4. Title: "30 Solo Date Ideas You'll Actually Want to Take Yourself On" is fine if the count holds; or "25 Solo Date Ideas, and the Little Kit for Each". Dek: "Solo dates for every mood: a sketch outing, a film walk, a picnic for one, with the small thing worth bringing. Table for one, and a very good table at that."
5. Re-order categories: "Make something, somewhere" first, then "Outdoors", then "Low-cost treats" (trim to gear-friendly ones), then "Free ways to start". Replace the `chooser` list with gear-first quick picks. Add block 1 after "Make something" and block 2 after "Outdoors". Keep "A note on feeling safe" (sourced) and "How to eat alone".
6. Risks: solo-safety content needs its sources (DOJ and NPS entries are present); do not recommend personal safety devices; roller-skating/paddling safety needs sources if stated.

### things-to-do-after-work-instead-of-scrolling
1. 25 items: gear 13 (puzzle, PBN, nice dinner for one, paint, clay, junk journal, bake, letter, pickleball or tennis, craft hour, game night, sunset photo walk, book club), free 7 (read in another room, slow walk, rearrange shelf, call someone, cook with a friend, plan weekend, learn something tiny), venue 5 (drop-in class, skate night, museum late night, solo dinner out, library book club). Class B.
2. Spine: "If you want to make something" and "If you want people" (board games, craft hour); first "If you're exhausted" keeps puzzle, PBN, book light. Demote: free walks, calls, planning to "Free ways to start"; venue items to "Out and about".
3. Gear: junk-journals, air-dry-clay, group-painting-kits, board-games (c3 Sushi Go, Ticket to Ride), book-lights (c3 Amber), portable-watercolor (c3 Koi), friendship-bracelet-kits (candidate paxcoo), reading-journals. NEW: jigsaw-puzzles, paint-by-number-kits, photo-albums, letter-writing-sets, baking-basics.
4. Title: "25 Things to Do After Work Instead of Scrolling, With a Kit for Each Kind of Evening". Dek: "Twenty-five weeknight ideas sorted by how you feel, each one easy to start because the small thing it needs is already on the shelf."
5. Order sections: "make something" first, then "exhausted", "want people", "some energy", then "Free ways to start" (new heading replaces "If you want to feel like a new person"). Shop block after "exhausted" and after "want people". `first30` steps stay; `noSpend` merged into the secondary section.
6. Risks: no sleep, mental health or addiction claims about scrolling or phones; keep "tired is fine".

### things-to-do-on-the-weekend
1. 20 items: gear 8 (picnic, short hike, sunset spot with a blanket, clay, junk journal, craft night, board-game afternoon, bake), free 8 (walk somewhere new, nap, film in daylight, plan next week, invite someone on a walk, cook a big batch, book swap, tourist in own town), venue/service 4 (museum or gallery, secondhand shop, bookstore or library, farmers' or flea market). Class C.
2. Spine: "If you want to make something" (clay, junk journal), "If you want people" (craft night, board games) and "get outside" (picnic, hike). Demote: "explore" and "recover" sections into "Free ways to start" (a short last section).
3. Gear: picnic-blankets (candidate zaze; cooler maelstrom), daypacks (c3 Daylite), board-games (c3 Sushi Go, Ticket to Ride), air-dry-clay (verified crayola-air-dry-clay-5-lb-bucket), junk-journals, friendship-bracelet-kits (candidate paxcoo), water-bottles, market-totes. NEW: walking-shoes, thermos-flasks, phone-armband.
4. Title: "20 Weekend Plans for Every Mood (Pick One, Skip the Drift), With the Kit That Makes Each Easier". Alternative: "20 Weekend Plans for Every Mood, and the Small Things That Help Them Happen". Dek: "Twenty things to do this weekend, sorted by mood, plus a three-part plan so Saturday doesn't dissolve into errands and the sofa."
5. Order: "make something", "get outside", "want people", then secondary section. Keep the three-part plan (anchor, treat, rest). Block after "make something" and after "get outside". Merge `makePlan` block after the shop blocks. Cross-link `cheap-weekend-adventures` and `how-to-plan-a-solo-saturday`.
6. Risks: museum/market hours are place-specific; do not state; no hiking safety statements without a source.

### watercolor-painting-for-beginners
1. All gear-led. Class A.
2. Spine: whole article. Demote: nothing.
3. Gear: watercolor-sets (verified artecho-48-color-watercolor-set-3-brushes; Cotman candidate c3), brushes (verified transon-8-round-watercolor-brushes, fenorkey-12-round-watercolor-brushes; c3 Heritage 4050), paper (verified hapikalor-watercolor-pad-140lb-9x12, arches-watercolor-pad-140lb-cold-press-9x12; c3 XL and 400 Series), portable-watercolor (c3 Koi step-up), masking tape (NEW, household).
4. Title: "Watercolor for Beginners: Three Little Paintings You Can Finish Tonight". Dek: "A small supply list, a few techniques worth learning first and three projects that make practice feel like painting."
5. `shopTheArticle` after "What you need" (verified products: paints, brushes, paper) and `starterKit` watercolor (complete) after the techniques; the existing `shopHobby` type block moves to the end for the step-up (portable set, sketchbook).
6. Risks: paper weight and technique statements are the listing's, not tested by us; no pigment-safety claims.

## 7. Open owner decisions

1. Books for book club and reading articles: a type-level "book club picks" card is the most natural Amazon fit, but it needs a policy (no titles invented, no ratings).
2. Whether to rename the `noSpend` block's generated chip "Free way in / No-spend version included" (engineering; `src/components/editorial/article-summary.ts`) and whether to keep the `noSpend` field on five product cards.
3. Whether the planner should show optional "what makes it easier" gear rows for non-free plans (engineering; hard constraint on free stays).
4. Kits to add (section 3.3), and the "everything" wording in kit headlines.

## 8. How to read `MONETISATION-GAPS.csv`

- `existingProductTypeId`: an id from `src/data/products.ts`, or `NEW:<proposed-id>` for a type that does not exist yet (type-level card to add; the exact products still need Cowork verification).
- `existingProductId`: a catalog id. `needsVerifiedProduct` is `no` only when that id has status `verified` in `src/data/catalog.generated.ts`; ids with candidate status are marked `yes` and noted.
- `candidateRef`: `cand-N:<slot>` means `docs/commerce/buy-plan/candidates-N.csv` (slot, or `articleSlug:slot` where the slot name repeats); `kit:` means `docs/commerce/kit-candidates-for-cowork.csv`; `NONE` means nothing is queued yet and Cowork needs a fresh research row (never invent an ASIN).
- Rows are grouped per article, spine first; shared products (daypack, walking shoes, jigsaw, speaker, pocket notebook, picnic blanket) are researched once and reused across articles.
