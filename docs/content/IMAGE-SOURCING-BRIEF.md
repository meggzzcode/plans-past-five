# Image sourcing brief

Shot list for the images the site still needs, so that every article ends with a **unique hero** (32 articles, currently 14 images). Source with Cowork task C11 (docs/cowork/PLANS-PAST-FIVE-COWORK-TASKS.md), drop files in `docs/content/incoming-images/`, fill `docs/content/new-images.csv` (template: `docs/content/new-images.template.csv`), then run `node scripts/ingest-images.mjs --check` and the real run. Which sources and what the script checks: `docs/content/incoming-images/README.md`.

## Rules for every image

- Sources: Unsplash, Pexels, Pixabay (free licences; read each site's licence page and record its URL and the date), or Canva / Lovable AI generation. Never hotlink; download the original.
- Record source URL, creator, licence name, licence URL and date for each. AI-generated images are labelled as such. No copyrighted product photos. The image must match the article topic.
- Each image is the hero of **at most 1 article**; a photo appears on at most 2 pins.
- Avoid for all: identifiable minors, brand logos or visible brand names (including on bikes, paddles, cameras, shoes, packaging), readable text or watermarks, real-person likeness in AI prompts.
- Format: landscape about 4:3 or 3:2, at least 1600 px wide (the script rejects smaller). Keep faces non-central; hands, tables and scenes are safest.
- House style (for matching and for AI prompts): warm editorial film-like photography with gingham, cherry red, butter yellow, strawberry pink and garden green.
- Alt text: 20 to 160 characters, describes the picture, no brand names. Suggestions below; adjust to what the photo actually shows.

## Plan

19 articles need a new hero: the 7 weak matches first (1 to 7), then 12 that currently share an image. Keepers (existing image stays with one article): potteryNight (paint night), watercolor (watercolor article), junkJournal (junk journaling), soloCafe (solo coffee date), shopBookish (reading journal), picnic (perfect picnic), shopAdventures (cheap weekend adventures), girlsNight (girls' night ideas), shopGirlsNight (mahjong), shopPottery (air-dry clay), shopCreative (starter kits), tennis (tennis), hiking (active hobbies). shopSporty is freed for the shop collection once pickleball gets its own photo. Crochet is the only one already generated (Canva AI); the other 18 are to be sourced.

## 1. how-to-start-crocheting

- **Suggested key:** `crochetHands`
- **Current hero:** girlsNight (weak)
- **Must show:** A woman's hands crocheting a butter-yellow blanket with a wooden hook; red and pink yarn in a basket; sofa. USE THE EXISTING CANVA AI IMAGE (asset MAHbXvOeP98, 2336x1760, generated 2026-11-19): download full resolution from https://www.canva.com/M/MAHbXvOeP98, source Canva AI, licenseName must say AI-generated.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `hands crocheting yarn`; `crochet blanket sofa`; `crochet hook wool basket`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman's hands crocheting a butter-yellow blanket with a wooden hook, red and pink yarn in a basket on a cozy sofa, soft window light, gingham cushion, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks, a different crochet photo (use the existing Canva AI image).
- **Alt text suggestion:** A woman's hands crocheting a butter-yellow blanket with a wooden hook, red and pink yarn in a basket on a sofa
- **CSV:** `heroFor` = `how-to-start-crocheting`

## 2. flower-arranging-as-a-hobby

- **Suggested key:** `flowerArranging`
- **Current hero:** shopAdventures (weak)
- **Must show:** A woman (face optional, adult) trimming flower stems beside a vase on a kitchen table; loose seasonal flowers, scissors, a little greenery.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `woman arranging flowers vase`; `trimming flower stems kitchen table`; `florist hands bouquet table`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman trimming stems of pink and yellow flowers beside a glass vase on a gingham-covered kitchen table, garden greenery, soft morning light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman trimming pink and yellow flower stems beside a vase on a kitchen table
- **CSV:** `heroFor` = `flower-arranging-as-a-hobby`

## 3. how-to-get-into-recreational-cycling-as-an-adult

- **Suggested key:** `cyclingLane`
- **Current hero:** hiking (weak)
- **Must show:** An adult woman walking or riding a plain city bike with a helmet in a leafy lane or quiet street; bike must show no visible brand name.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `woman cycling city bike`; `woman walking bike leafy street`; `recreational cyclist helmet park path`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman in a cherry-red cardigan walking a plain city bike with a helmet and a basket along a leafy lane, golden light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman with a helmet walking a city bike along a leafy lane in golden light
- **CSV:** `heroFor` = `how-to-get-into-recreational-cycling-as-an-adult`

## 4. pickleball-for-beginners

- **Suggested key:** `pickleballRally`
- **Current hero:** shopSporty (weak: shop still life, not a court photo)
- **Must show:** An adult woman mid-rally on a pickleball court (paddle and perforated ball visible), golden hour; court lines visible.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `woman playing pickleball`; `pickleball paddle ball court`; `pickleball court sunset`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman mid-rally on a pickleball court at golden hour, plain paddle, green court, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman mid-rally on a pickleball court at golden hour holding a paddle
- **CSV:** `heroFor` = `pickleball-for-beginners`

## 5. how-to-find-a-hobby-as-an-adult

- **Suggested key:** `hobbyChoices`
- **Current hero:** soloCafe (weak)
- **Must show:** A table with small hobby items she is choosing between: paints, yarn, a book, a camera (unbranded, no visible logos), a hand reaching for one.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `hobby supplies flat lay table`; `paintbrushes yarn book camera table`; `choosing new hobby craft supplies`
- **AI prompt (house style):** Warm editorial film-like flat lay on gingham of small hobby items a woman is choosing between: watercolor pans, red yarn, a paperback, a film camera, soft light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A table of small hobby items, paints, yarn, a book and a camera, with a hand reaching for one
- **CSV:** `heroFor` = `how-to-find-a-hobby-as-an-adult`

## 6. low-energy-hobbies

- **Suggested key:** `cozyLamplight`
- **Current hero:** junkJournal (weak)
- **Must show:** A blanket, a cup of tea and a half-finished jigsaw puzzle in lamplight; evening living room.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `jigsaw puzzle blanket tea`; `cozy evening puzzle lamp`; `tea blanket couch cozy`
- **AI prompt (house style):** Warm editorial film-like photograph of a cozy evening: a knitted blanket, a cup of tea and a half-finished jigsaw puzzle on a coffee table in lamplight, butter-yellow glow, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A cup of tea, a blanket and a half-finished jigsaw puzzle on a coffee table in lamplight
- **CSV:** `heroFor` = `low-energy-hobbies`

## 7. affordable-hobbies-under-25

- **Suggested key:** `budgetDesk`
- **Current hero:** watercolor (weak)
- **Must show:** A few inexpensive supplies (pencils, a small notebook, a thrifted mug, a cheap paintbrush) on a tidy desk.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `pencils notebook mug desk`; `simple art supplies desk flat lay`; `thrifted mug notebook pencils`
- **AI prompt (house style):** Warm editorial film-like photograph of a few simple supplies on a tidy pink desk: pencils, a small notebook, a thrifted floral mug, a paintbrush, soft daylight, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** Pencils, a small notebook, a floral mug and a paintbrush on a tidy desk
- **CSV:** `heroFor` = `affordable-hobbies-under-25`

## 8. hobbies-to-try-when-life-feels-like-work-sleep-repeat

- **Suggested key:** `hobbiesMontage`
- **Current hero:** potteryNight (shared x3)
- **Must show:** A woman choosing among a few relaxed hobbies at home: sketchbook, plant, running shoes by the door, or similar variety. Unbranded.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `woman trying new hobby home`; `hobby variety flat lay`; `woman sketching sofa evening`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman on a sofa with a sketchbook, a small plant and a tote of yarn beside her, evening light, gingham cushion, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman relaxing on a sofa with a sketchbook, a small plant and a tote of yarn
- **CSV:** `heroFor` = `hobbies-to-try-when-life-feels-like-work-sleep-repeat`

## 9. creative-hobbies-you-can-start-at-home

- **Suggested key:** `creativeTable`
- **Current hero:** potteryNight (shared x3)
- **Must show:** A home table set with a few creative projects underway (watercolor, embroidery hoop, clay), no people required.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `creative hobbies table home`; `craft supplies kitchen table`; `art supplies desk morning`
- **AI prompt (house style):** Warm editorial film-like photograph of a kitchen table with a watercolor set, an embroidery hoop and a lump of air-dry clay, gingham cloth, morning light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A kitchen table with a watercolor set, an embroidery hoop and air-dry clay
- **CSV:** `heroFor` = `creative-hobbies-you-can-start-at-home`

## 10. things-to-do-after-work-instead-of-scrolling

- **Suggested key:** `afterWorkWindow`
- **Current hero:** watercolor (shared x3)
- **Must show:** A phone left face-down (no visible screen content or brand) beside a book and tea at a window in early evening; or a woman walking home through a park.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `after work evening relax book tea`; `woman walking park evening`; `phone face down book table`
- **AI prompt (house style):** Warm editorial film-like photograph of an early-evening window seat with a paperback, a cup of tea and a phone left face down, golden light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A paperback, a cup of tea and a phone left face down on a window seat in evening light
- **CSV:** `heroFor` = `things-to-do-after-work-instead-of-scrolling`

## 11. junk-journaling-supplies-for-beginners

- **Suggested key:** `junkJournalSupplies`
- **Current hero:** junkJournal (shared x2)
- **Must show:** Junk journal supplies laid out: washi tape, ephemera, scissors, glue stick, stamps; different composition from the existing flat lay.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `junk journal supplies washi tape`; `scrapbook supplies flat lay`; `ephemera washi tape scissors`
- **AI prompt (house style):** Warm editorial film-like flat lay of junk journal supplies: gingham washi tape, vintage paper ephemera, scissors, a glue stick on pink linen, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** Washi tape, paper ephemera, scissors and a glue stick laid out on pink linen
- **CSV:** `heroFor` = `junk-journaling-supplies-for-beginners`

## 12. solo-date-ideas

- **Suggested key:** `soloDateMuseum`
- **Current hero:** soloCafe (shared x3)
- **Must show:** A woman alone enjoying a solo outing other than a café: gallery, bookshop, or walking with ice cream. Not a close-up of a recognisable face.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `woman alone bookstore`; `woman museum solo visit`; `solo woman ice cream walk`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman browsing shelves alone in a small independent bookshop, cherry-red cardigan, strawberry-pink tote, soft light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman browsing shelves alone in a small independent bookshop
- **CSV:** `heroFor` = `solo-date-ideas`

## 13. how-to-start-a-book-club

- **Suggested key:** `bookClub`
- **Current hero:** shopBookish (shared x3)
- **Must show:** Friends (adults, faces not a focus) with paperbacks and snacks on a sofa or table, discussing.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `book club friends`; `women reading group discussion`; `friends books snacks living room`
- **AI prompt (house style):** Warm editorial film-like photograph of four friends around a living room table with paperbacks, tea and strawberries, gingham cloth, laughing, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** Friends gathered around a living room table with paperbacks, tea and strawberries
- **CSV:** `heroFor` = `how-to-start-a-book-club`

## 14. cozy-solo-dates-at-home

- **Suggested key:** `soloHomeDate`
- **Current hero:** shopBookish (shared x3)
- **Must show:** A woman at home on a solo date: candle, a nice meal for one, a film or book, a blanket.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `dinner for one at home`; `cozy evening home candle blanket`; `woman cozy night in`
- **AI prompt (house style):** Warm editorial film-like photograph of a dinner for one at a small table at home, candle, strawberries and a paperback, blanket on the chair, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A cozy dinner for one at a small table with a candle, strawberries and a paperback
- **CSV:** `heroFor` = `cozy-solo-dates-at-home`

## 15. things-to-do-on-the-weekend

- **Suggested key:** `weekendMarket`
- **Current hero:** picnic (shared x2)
- **Must show:** A weekend scene: farmers market, a walk, brunch, or friends with bikes; different from the picnic.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `farmers market flowers weekend`; `weekend brunch friends`; `woman market tote walk`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman at a sunny farmers market stall holding a tote of flowers and strawberries, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman at a sunny farmers market stall holding a tote of flowers and strawberries
- **CSV:** `heroFor` = `things-to-do-on-the-weekend`

## 16. how-to-plan-a-solo-saturday

- **Suggested key:** `soloSaturday`
- **Current hero:** shopAdventures (shared x3)
- **Must show:** A planned Saturday for one: a notebook planner, coffee, a tote, morning light; no readable text on the planner.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `saturday morning coffee notebook`; `planner coffee morning table`; `solo weekend morning`
- **AI prompt (house style):** Warm editorial film-like photograph of a Saturday morning for one: a blank notebook, a coffee, a tote bag and sunglasses on a pink table, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A blank notebook, coffee, tote bag and sunglasses on a pink table on a Saturday morning
- **CSV:** `heroFor` = `how-to-plan-a-solo-saturday`

## 17. how-to-host-a-craft-night

- **Suggested key:** `craftNight`
- **Current hero:** girlsNight (shared x3)
- **Must show:** A craft night table: friends or just the table, with a few different crafts under way, snacks.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `craft night friends`; `women crafting together table`; `craft supplies party table`
- **AI prompt (house style):** Warm editorial film-like photograph of a craft night table with painted tiles, beads, ribbon and strawberry cookies on gingham, hands reaching in, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A craft night table with painted tiles, beads, ribbon and strawberry cookies
- **CSV:** `heroFor` = `how-to-host-a-craft-night`

## 18. at-home-creative-weekend

- **Suggested key:** `creativeWeekend`
- **Current hero:** shopPottery (shared x2)
- **Must show:** A weekend project in progress at home: hands painting or sketching by a window, coffee nearby.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `woman painting at home weekend`; `sketching window morning`; `hands painting canvas home`
- **AI prompt (house style):** Warm editorial film-like photograph of a woman painting a small canvas by a sunny window on a weekend morning, coffee beside her, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A woman painting a small canvas by a sunny window with a coffee beside her
- **CSV:** `heroFor` = `at-home-creative-weekend`

## 19. how-to-start-embroidery

- **Suggested key:** `embroideryCloseup`
- **Current hero:** shopCreative (shared x2)
- **Must show:** A close-up of an embroidery hoop with a simple floral pattern in progress, needle and thread; no text stitched.
- **Composition:** landscape about 4:3 or 3:2, 1600+ px wide, subject clear at card size and when cropped to 4:3.
- **Stock search phrases:** `embroidery hoop close up`; `hand embroidery flowers needle`; `embroidery thread hoop table`
- **AI prompt (house style):** Warm editorial film-like close-up of a wooden embroidery hoop with a half-stitched cherry and leaf pattern in red and green thread, gingham fabric, soft light, no text, no logos.
- **Avoid:** identifiable minors, brand logos or names, text, watermarks.
- **Alt text suggestion:** A close-up of an embroidery hoop with a half-stitched cherry and leaf pattern
- **CSV:** `heroFor` = `how-to-start-embroidery`
