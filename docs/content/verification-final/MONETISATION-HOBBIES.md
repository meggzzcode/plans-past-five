# Monetisation pass: hobbies (src/data/hobbies.ts)

Scope: `productIds` plus copy (description, whyYoullLoveIt, supplies, optional, a few startupBudget assumptions and step strings). No `cost` field, equipment.ts, articles or catalog changed. Hobby `productIds` resolve only through `getProduct`/`productsFor` (type ids from `products` and `articleProducts`), not catalog.generated.ts, so all attachments are type ids; no ASINs.

## Gear blocks added (15 hobbies that had none)
- Crochet: crochet-hooks, yarn
- Knitting: knitting-needles, yarn
- Flower Arranging: flower-snips, vases, flower-frogs
- Calligraphy: brush-pens, letter-writing-sets
- Crossword Puzzles: pocket-notebooks, cozy-night-in
- Indoor Gardening: indoor-plant-basics
- Yoga for Beginners: yoga-mats, water-bottles (copy: "yoga mat", free video removed)
- Dance Classes: water-bottles, sports-totes (supplies now lead with shoes)
- Roller Skating: skate-protective-gear (supplies lead with skates plus wrist guards and knee pads; rental is the "to start" route)
- Running: phone-armband, water-bottles ("free interval-timer app" now "an interval-timer app")
- Climbing: sports-totes, water-bottles
- Board Games: board-games, conversation-cards
- Cooking Classes: pocket-notebooks
- Language Learning: pocket-notebooks (copy: "free app" removed; notebook leads supplies)
- Volunteering: daypacks, water-bottles
- Vinyl Collecting: still none (no fitting type; no invented product). Needs a record-storage or turntable-accessory type.

## Free-cost hobbies reframed (cost fields untouched)
- Collage Art: glue stick, sharp scissors, paper lead; magazines last. Products washi-tape, junk-journals, sticker-sets.
- Reading: book plus good light lead; library copy kept as one clause. Optional lists book light, journal, sleeve, stand. Existing products kept.
- Crossword Puzzles: puzzle book and pencil with a good eraser lead.
- Creative Writing: notebook you like and a pen that feels good; products pocket-notebooks, junk-journals.
- Hiking: shoes, daypack, water bottle lead; products walking-shoes, daypacks, water-bottles, trekking-socks, thermos-flasks, binoculars.
- Birdwatching: compact binoculars, pocket notebook, bird ID app or field guide ("A free bird ID app", "Your local park", "Free apps" removed).
- Nature Photography: phone or small film camera plus pocket notebook; products film-cameras, pocket-notebooks, daypacks.
- Book Clubs: book, conversation cards; products conversation-cards, reading-journals, book-lights, tea-sets.
- Volunteering: comfortable shoes, water bottle and bag lead; listing is the last item.

## Other copy
- Museum Exploring: description no longer leads with free days; sketchbook leads supplies.
- Shared `vid` constant and Language Learning podcast line: "Free" dropped.
- startupBudget assumptions for the free hobbies now name the helpful gear first, then the free route.

## Notes
- equipment.ts still has "A free app...", "A free trail map or app", "A free bird ID app" learning items priced 0 to 0; unchanged (out of ownership). They assert "free" for named apps and should be softened by the equipment owner if no source exists.
- Tests: hobbies, costs, rules, quiz, search and planner scenarios green. The only failing test in the suite (build-content.test.ts, on-disk article JSON out of sync with the clay-article markdown) comes from concurrent article edits, not this change.
