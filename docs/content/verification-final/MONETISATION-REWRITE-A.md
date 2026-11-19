# Monetisation rewrite A (first 16 published articles)

Date: 2026-11-19. Scope: the first 16 published articles alphabetically. Followed `docs/commerce/MONETISATION-PLAN.md` section 2 and the per-article plans. Edited only through `articleToJson`, then `node scripts/build-content.mjs`. Slugs, sources, `verifiedAt`, `status` and all existing `coworkChecks` are unchanged; each article gained one `NOTE 2026-11-19` line in `coworkChecks` describing what moved. Nothing was committed.

Conventions used everywhere: gear lines read "What makes it easier / Worth bringing / Nice to have: ..." (one benefit-first sentence, never mandatory); verified catalog products are linked inline only with `{{product:id|text}}` (renders as a link only because they are verified); everything else is a type-level card (`shopHobby`) using existing type ids. No prices, ratings, brands, alcohol, sunscreen, medical items or non-Amazon links. No new factual or safety claims: every safety line is the original text, still covered by the article's own `sources`. `noSpend` blocks were removed from every article that had one (no "Free way in" chip now). Where a free or venue idea stayed, it sits in one short closing section (about 5 to 19 percent of the body by words; the highest is active-hobbies at about 19) headed "Free ways to start" or "Out and about", and still carries a gear line where one honestly fits.

## Per article

### active-hobbies-for-women-who-dont-love-the-gym
- Title: "15 Active Hobbies for Women Who Don't Love the Gym: What to Wear, Bring and Try" (count 15 real). Dek, searchIntent, angle rewritten. "Pick by what burns" framing replaced.
- Moved: racquets and paddles first, then outdoors, then wheels; walking club, kitchen disco, thrifting on foot and gardening in "Free ways to start"; group class, dance and swimming in "Out and about". Items renumbered 1 to 15.
- Gear lines on 11 of 15 items (paddle set, racket and balls, court shoes, walking shoes, trekking socks, daypack, water bottle, phone armband, binoculars, skate protective gear, flask, speaker, tote). 
- Shop blocks: "For your first rally" after racquets; "For your first trail morning" after outdoors and wheels; "By the door, ready to go" before the closing.
- Became secondary: 7 items. Old "Borrow a racket for round one" block dek removed (borrowing is a clause in `whatYoullNeed`).
- productIds: 16 types.

### affordable-hobbies-under-25
- Title: "15 Hobbies to Start This Month, With the First Thing to Buy for Each" (italic "First Thing to Buy"). Dek, searchIntent and angle rewritten; no dollar figures.
- Moved: make-something hobbies first (watercolor, junk journal, clay, paint by numbers, embroidery, bracelets, outdoor sketching), "A note on prices" directly after the first block, cozy-at-home, then "Free ways to start" (reading, birdwatching, hiking, thrifting, each still with a gear line). "Start small, then upgrade" now leads with the kit and only then says to check the home.
- Gear lines on 14 of 15 (baking has none). Verified examples linked inline: hapikalor watercolor pad, stationery-island journal, crayola clay, apple-barrel paints, bradove embroidery kit, sakura Micron pens.
- Shop blocks: after make-something, after cozy, after free ways.
- `noSpend` removed.

### at-home-creative-weekend
- Dek tightened ("one supply list you can order in a single evening"). Title kept.
- Moved: shop block now directly after the Friday supply list, headed "Start with this" (not "everything"); second short block for Sunday's journal spread. Lunch and Saturday-evening prose trimmed (candle line dropped).
- Gear lines per make with verified products inline: crayola clay, hapikalor pad, artecho set, apple-barrel paints, mod-podge sealer (used as directed on the can), stationery-island journal, scotch glue stick, mr-pen washi tape.
- Paint-label (ACMI) and sealing text untouched.

### cheap-weekend-adventures
- Title: "15 Weekend Adventures, Packed: Easy Outings and the Small Gear That Makes Each Nicer" (cut from 25 to 15, count real; italic "Packed"). Dek per plan, opening is the packed daypack at the door.
- Moved: three gear-led sections (Trail and park days, Look-closer outings, Market and picnic days), each with a gear line per item and a block; "Four rules" became "Four things to pack" plus a "Before you leave" paragraph (spending-cap rule dropped; tell-someone, weather, daylight, well-lit text kept, sources unchanged: NPS hiking safety, DOJ guide).
- Became secondary: library, museum free day, gallery, community event, volunteering, class, botanical garden, quiet public building (etiquette line kept), neighborhood, scavenger hunt, merged into one short bulleted "Free ways to start" list. `noSpend` removed.
- Shop blocks: three (trail kit, closer-looking kit, market and picnic kit). Inline verified: sakura Micron pens.

### cozy-solo-dates-at-home
- Title: "20 Cozy Solo Dates at Home, and the Small Things That Make Them Feel Planned" (count 20 kept real). Dek per plan.
- Moved: the night-in kit block sits right after "Set the scene" (with a gear line on throw, flameless candles and book light); then low-energy, creative, kitchen, productive; three blocks total. Free dates (playlist, breakfast for dinner, dream board, shelf, plan an outing) are items 16 to 20 under "Free ways to start".
- Alcohol dropped: "Cocktail or mocktail lab" is now "Mocktail and tea lab" with a tea-set line and no barware. Candle safety text (12 inches, never unattended) unchanged.
- Photo-album night moved up into the creative section.
- Verified inline: crayola clay, stationery-island journal, mr-pen washi tape, scotch glue stick. `noSpend` removed.

### creative-hobbies-you-can-start-at-home
- Title: "21 Creative Hobbies You Can Start at Your Kitchen Table, With the First Thing to Pick Up". Dek per plan.
- Moved: creative writing is the last item (21) under a short "Free ways to start" section; items renumbered. Short block per material (paper, paint, thread and yarn, living and edible); existing kit block retitled "Clay: where to start". `noSpend` paper block folded into the free paragraph.
- Gear line on 18 of 21 items (jewelry, punch needle, sewing tote have none). Verified inline: journal, glue stick, washi, hapikalor pad, apple-barrel paints, crayola clay, bradove kit, Red Heart yarn.
- Replaced "free pattern" and "Buy (or borrow)" wording.

### creative-hobby-starter-kits-worth-considering
- Title kept. Dek extended ("so your first purchase gets you to a finished thing"); opener hook added.
- Per-hobby gear lines with verified examples (bradove, inscraft, artecho, hapikalor, uhapeer kit, crayola, apple-barrel, stationery-island, scotch). A `shopTheArticle` block (embroidery, air-dry-clay) after "Kit or loose, hobby by hobby".
- "Doesn't rank named kits" replaced: verified examples are linked where available. "Test the waters" moved to one short "Free ways to start". No kit called complete. Red-flag checklist kept.

### flower-arranging-as-a-hobby
- Title kept; dek per plan; productIds now set (snips, vases, frogs, totes, plant basics).
- Added: shop block after "What you need" (snips, vases, frogs) and a second block after the weekly ritual (tote, jars); gear lines on the recipe, the flopping-stems fix, the ritual and the wide-vase mistake. "Why it is worth trying" folded into the intro. Pet-toxicity, daffodil and care text unchanged; no toxic flowers promoted.

### girls-night-ideas-that-arent-drinks
- Title: "25 Girls' Night Ideas That Aren't Drinks: What to Set Out for Each" (25 real). Dek kept (plan wording already there).
- Moved: kit-led ideas first (craft, cookies, games, bracelets, mahjong, movie night, puzzle, cards, vision board, letters, tea, book club night), then a first shop block and a verified mahjong `shopTheArticle` block (American mahjong caveat in its dek); then "Out and about, with a bag packed" (picnic, hike, court, skating, thrift) with its own block; "Getting the group chat to commit" moved up mid-article.
- Became secondary (about 15 percent of body words): pottery studio, drop-in class, museum, bookstore swap, walk-and-talk, volunteering, potluck, spa night, one short sentence each. No alcohol items. Hiking and skating safety text unchanged.
- Not added: the optional pottery-paint-night `starterKit` (the existing paint-night guide carries it).

### hobbies-to-try-when-life-feels-like-work-sleep-repeat
- Title kept (35 real); dek per plan.
- Every hobby has a gear line (verified inline: bradove kit, stationery-island journal, hapikalor pad, crayola clay, Red Heart yarn, sakura pens). One short block after each category (4 blocks). Crosswords, volunteering, thrifting and museum exploring moved to "Free ways to start" as items 32 to 35 (kept numbered so the title count and the meta-title override stay true). `noSpend` removed; "$15" thrift figure replaced with "a small cap". Library-card line kept (ALA source).

### how-to-find-a-hobby-as-an-adult
- Title kept; dek says "three small trial kits".
- "Three trial kits" block (notebook, mini paint set or clay, daypack) now sits directly after "Pick three and try the smallest version"; each craving row gets a gear line; "Buy the mini version" leads the trial options, borrow-first stays as one bullet. Audit and method untouched.

### how-to-get-into-recreational-cycling-as-an-adult
- Title kept; dek per plan. Highest-risk article: all safety steps (helmet fit, lights, shared-path etiquette, replacement guidance, check local rules) are verbatim and within the CDC, CPSC, NSC, BHSI, NHTSA, NPS and REI sources already listed.
- Added: helmet, lights/bell and repair-kit gear lines (convenience only, each defers to the label, the maker's guidance or local rules); block "Helmet, lights, bell" directly after Step 3; second block after Step 6 (repair kit, daypack, bottle, tote). No claims about MIPS, standards or protection. No product for a bike itself.

### how-to-host-a-craft-night
- Title kept; dek says "what to set out for each".
- A "What to set out" line after each of the five menus (verified inline: apple-barrel paints, benicci brushes, crayola clay, scotch glue sticks), kit block moved to after project 2, a second block (glue gun, speaker, acrylics) at the end, speaker line in the run of show, optional list extended. Glue-gun line sits beside the existing CPSC low-temperature advice. Allergen and paint-label text unchanged.

### how-to-host-a-mahjong-night
- Title and dek kept. The verified `shopTheArticle` block (with its American-set and version caveat, unchanged) now sits directly after "What to have on the table". Tea-set line and a second block (tea sets, board games, conversation cards) after "Turning it into a tradition". "Find your teacher" condensed into one paragraph under "Free ways to start: find a teacher" near the end, all facts kept. "Does the listing name your version" paragraph verbatim.

### how-to-host-a-paint-night-at-home
- Title kept; dek per plan. The type-card block became a verified `shopTheArticle` block (canvases, brushes, paints) after "Choose one easy painting"; speaker and conversation-card line plus a short second block after the timeline. ACMI, ventilation, allergy and paint-water lines unchanged.

### how-to-plan-a-perfect-picnic
- Title kept; dek per plan; angle updated.
- Moved: packing list and "Making it look the part" now come first (intro updated), then timeline, spot, menu, food safety (unchanged, FDA/CDC/USDA/FARE sources), activities. Gear list (blanket, cooler bag, flask, tote) plus a "Picnic: where to start" `starterKit` (the picnic kit is incomplete, so no "everything" wording) and a type-card block after the list; a second block after "Once you're sitting down" (book sleeve, sketch pad, watercolor, notebook, cards). "Cheap" link text replaced.

## Cross-cutting notes
- Link text changed in these 16 files: "15 affordable hobbies" is now "15 hobbies to start this month"; "cheap weekend adventures" is now "weekend adventures, packed". Grep found no remaining references to the old text in `content/` or `src/`.
- `src/lib/seo.ts` `ARTICLE_META_TITLES` still has "15 Affordable Hobbies on a Small Budget" for affordable-hobbies-under-25 (the on-page title is now buyer-led). cheap-weekend-adventures has no override and its on-page title is long (about 80 characters), so a short meta title is worth adding. I did not touch `src`.
- Not changed because outside scope: hobby and catalog data, hero images, other agent's articles.

## New product needs for Cowork (all currently type-level cards; no verified record)
Types used in these 16 articles with no verified product, in rough priority:
1. Walking and trail: walking-shoes, trekking-socks, phone-armband, daypacks, water-bottles, thermos-flasks, binoculars, pocket-notebooks (cheap-weekend, active-hobbies, affordable, find-a-hobby, hobbies-to-try).
2. Cycling (safety listings, label-based wording only): bike-helmets, bike-lights, bike-bells, bike-repair-kits.
3. Picnic and carrying: picnic-blankets, cooler-bags, market-totes, book-sleeves (candidates already in the catalog: zaze blanket, maelstrom cooler).
4. Racquet and wheels: pickleball-sets, tennis-rackets, tennis-balls, tennis-shoes, pickleball-shoes, skate-protective-gear.
5. Cozy and gentle making: cozy-night-in (throw, flameless candles, tea sampler), tea-sets, book-lights, reading-journals, jigsaw-puzzles, paint-by-number-kits, photo-albums, letter-writing-sets, brush-pens, sketch-pads, portable-watercolor, indoor-plant-basics, portable-speakers.
6. Yarn crafts and flowers: crochet-hooks, knitting-needles, yarn (Red Heart and Caron are verified but tagged only to the crochet article), flower-snips, vases, flower-frogs.
7. Hosting: glue-guns (low-temperature, label wording), cookie-decorating-kits, ceramic-painting-kits, group-painting-kits, conversation-cards, friendship-bracelet-kits, board-games, mahjong-sets (verified examples exist for mahjong).
Also wanted but with no type yet: scissors (candidate ibayam-8in-heavy-duty-scissors-3-pack), flower food, baking basics (a bowl and tray), picnic tableware, a jewelry-making kit (beads, wire, pliers), sewing kit.
Tagging suggestion: if Cowork tags the existing verified products (stationery-island journal, scotch glue stick, mr-pen washi, crayola clay, apple-barrel paints, hapikalor pad, bradove kit, sakura pens) with these article slugs or hobbies, the new inline links can become `shopTheArticle` blocks without further copy changes.

## Checks run
`node scripts/build-content.mjs` OK (32 published, 2 draft), `bunx eslint . --quiet` clean, `bunx tsc --noEmit` clean, `bunx vitest run` 754 of 754 passing.
