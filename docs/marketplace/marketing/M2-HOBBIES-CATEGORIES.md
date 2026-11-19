# M2 Marketing Review: Hobbies directory, hobby profiles, category pages

Scope: /hobbies (43 hobbies), 11 profiles read in full (Junk Journaling, Watercolor, Air-Dry Clay, Pottery Painting, Mahjong, Pickleball, Yoga for Beginners, Reading, Running, Baking, Crochet), the six category pages, HobbyCard, filters, imagery. Desktop 1280x800 and mobile 390x844 viewed. Source read in src/routes/hobbies.*.tsx, src/components/pages/CategoryPage.tsx, src/components/cards/Cards.tsx, src/data/hobbies.ts, src/data/categories.ts.

Note on naming: there is no "Pottery/clay" hobby called Pottery. The slugs are air-dry-clay and pottery-painting. Reviewed both.

## 1. Verdict

The structure is sound and the voice is warm, but the hobby layer reads as a well-organised reference library, not a store window. A profile is built as: title, description, three metadata chips, a data grid (Difficulty / Budget / Time / Where), then "Why you might love it" (often one flat sentence), then generic start steps, then the shop block pushed far down the page. Nothing makes her feel the first session before she is asked to read about it. The strongest assets (a great brand voice, a Caveat "first session" line, honest budget ranges) are underused: the first-session line is the best copy on the page and is buried at the middle. Only 11 of 43 hobbies have a photo; 32 cards are flat coloured tiles with a name and a tiny doodle, which in a grid of 12+ reads as empty. The money path is the weakest part: the "Shop your hobby" section appears twice in different shapes on the same page (a three-card strip, then a full kit list with grey placeholder boxes instead of product images), Yoga and Running have zero products and are noindex, and Pickleball, Baking, Crochet, Pottery Painting have only 1 to 2. The category pages are a stack of identical templates: same three-section layout, hobby lists that overlap (Table for One and Creative Corner show the same six hobbies), and the Movement page shows Watercolor Painting and Film Photography as "movement".

Sell-appeal scores (1-10, honest):
- /hobbies directory: 5
- Category pages (avg): 5 (Creative Corner 6, Movement 4, Table for One 4, After Hours 5, Weekend Edit 5, Better Together 5)
- Junk Journaling profile: 7 (photo, rich shop block, but long, doubled shop sections)
- Watercolor Painting: 7
- Mahjong: 7 (best social hook; duplicate shop sections, grey product boxes)
- Air-Dry Clay: 6.5
- Pottery Painting: 5.5 (cute hook, thin shop)
- Crochet: 5 (no photo, 2 products)
- Baking: 4.5 (no photo, 1 product, "cookie decorating kit" only)
- Reading: 5 (no photo, kit tilted to accessories)
- Pickleball: 4.5 (one-line "why you'll love it", 2 products)
- Yoga for Beginners: 3.5 (no products, noindex, title bug)
- Running: 3.5 (no products, noindex, hero is just instruction text)

## 2. Findings by revenue/engagement impact

| # | Page | Finding | Impact |
|---|------|---------|--------|
| 1 | All profiles | Shop block is below "Where to learn", about 60% down the page. Hero has Save/Copy/Pin/Share but no "Get the kit" button. The one primary action (see supplies) is never offered at the top. | Very high |
| 2 | All profiles with supplies | Two overlapping shop sections: a plain "Shop your hobby" card strip, then "Shop your X kit" panel with its own "Shop your hobby" kicker, heading, disclosure, and "Read next". Reads as a bug and doubles the disclosure. Pick one. | Very high |
| 3 | Mahjong, Junk Journaling | In the kit panel, product images render as grey boxes with brand text ("TIASUSAN", "Scotch"). A buy panel with no pictures looks unfinished and unclickable. | Very high |
| 4 | Yoga, Running | 0 products, noindex. Highest-intent hobbies for the "I'll start Monday" reader dead-end in editorial. | High |
| 5 | Pickleball, Baking, Crochet, Pottery Painting | 1 to 2 products; Baking has one kit and no tools. Thin shelf = low revenue per visit. | High |
| 6 | Directory | 32 of 43 cards are image-less coloured tiles (some pink, blue, green by category with a doodle). In rows of 3, pages of tiles look like a UI placeholder; Crochet, Embroidery, Knitting are three identical yellow squares side by side. | High |
| 7 | Hobby descriptions | Hero line is generic ("A smaller-court paddle sport that's very easy to pick up and very social"). "Why you might love it" is often one flat sentence ("You'll be playing proper points within the first hour."). | High |
| 8 | Titles/meta | "Yoga for Beginners for Beginners: How to Start" (title bug). Every meta description ends with the same boilerplate "Time, cost, supplies and an easy first session." and the title formula is identical for 43 pages. | High (SEO and CTR) |
| 9 | Directory hero | Right half is empty butter yellow; no image, no visual proof. Headline is good. First cards only appear after scrolling past hero and filters on desktop. | Medium-high |
| 10 | Directory filters | 10 chips are a mix of dimensions (place, time, who, mood, cost) in one flat row; the hero promises filters by "how much energy" but only "Low energy" exists. No result sort, no "start tonight" or "under $25" quick path. Empty state is cute but has no clear button. | Medium |
| 11 | HobbyCard | Meta line mixes times ("About an hour"), costs ("Varies, can start small") and "medium energy" lower-case, wraps to two lines on some cards. Category kicker is a raw tag word ("creative", "active", "outdoors"). Film Photography is categorised "outdoors". Heart-save icon is the only action. | Medium |
| 12 | Category pages | Hero text is tiny against a large image; one H1 + one sentence. "Hobbies to try" is capped at first 6 in data order, so Table for One and Creative Corner show the same hobbies; Movement shows Watercolor Painting and Film Photography. | Medium-high |
| 13 | Movement | "Read this first" shows the same hiking photo twice then tennis; hobby row repeats tennis and hiking photos from the cards above. Imagery is repetitive, three red-cardigan/hiker crops. | Medium |
| 14 | Category CTA | "See all hobbies" and "Make a plan from these" are two small underlined text links, same weight. No primary button. "Supplies for this" collection cards have no verb. | Medium |
| 15 | Profile "Good to know" | Re-states data already shown (Where, Who with) and adds "Beginner-friendliness: a short tutorial helps". Filler. | Medium |
| 16 | Profile "A good first project" | Often repeats "Your first session" (Running: both are the same run-walk loop). | Medium |
| 17 | Profile "Guides that mention it" | Some guide cards show empty pink image blocks (Mahjong page: two of three). Looks broken. | Medium |
| 18 | Profile "if you like X, try..." | Good Caveat touch, but related cards on image-less hobbies are all tiles, so the page ends on blank squares. | Low-medium |
| 19 | Save/Share | "Save to My Plans" is the first button; her best save moment is after she sees the kit and the first session. Fine, but secondary to "See the kit". | Low |

## 3. Concrete rewrites

### 3.1 Directory (/hobbies)

Title (current): "Find a Hobby: 43 Hobbies to Try Outside Work"
Replace: "43 Hobbies to Try After Work and on Weekends | Plans Past Five"

Meta description (current): "A filterable directory of 43 beginner-friendly hobbies, sorted by time, cost, energy and whether you'd rather go solo or social."
Replace: "Watercolor, mahjong, pickleball, crochet and 39 more. Pick one for your evening, your budget and your mood, then see exactly what to buy and what to do first."

Kicker (current): "The hobby directory" -> "Pick your next thing"

Headline: keep "43 ways to be a beginner again." (strong).

Subhead (current): "Filter by where, when, who with and how much energy you've got. Every hobby has a realistic first session, so you can start tonight."
Replace: "Tap what sounds like you tonight. Every hobby comes with a first session you can do in under an hour and a short list of what to buy."

CTA (current): "Or let the quiz choose →" -> "Not sure? Let the quiz pick for you →"

Filter label above chips (new): "What does your week have room for?"
Chip labels: "At home" -> "At home"; "Free or low cost" -> "Under $25"; "Low energy" -> "Low energy"; "After work" -> "After work (about an hour)". Group into three rows with small labels: "Where" (At home, Outdoors), "When" (After work, Weekend), "Who" (Solo, With friends), "Feel" (Creative, Active, Low energy), "Budget" (Under $25).
Result count (current): "43 hobbies" -> "Showing 43 hobbies you could start this week"
Empty state (current): "Nothing matches all of those at once." -> keep, add button "Clear filters" and: "Try dropping one filter. 'Outdoors' and 'at home' together is a tough ask."

### 3.2 Hobby card

Replace raw category kicker with a friendly label: creative -> "Make something", cozy -> "Cozy at home", social -> "With friends", active -> "Get moving", outdoors -> "Fresh air", bookish -> "Bookish".
Meta line: lead with cost and time, make energy a tag: "45 min first session . Under $25 . Low energy".
Add one-line hook under the title for image-less cards (title is in the tile; the body is description text only). Add a quiet text affordance at the bottom: "See what you need ->" (links to profile, honest and the action step).

### 3.3 Hobby profile template (applies to all 43)

Title formula (current): "Pickleball for Beginners: How to Start"
Replace by hook: "How to Start Pickleball: What to Buy and Your First Session". Fix Yoga: "How to Start Yoga at Home: First Session and Gear" (the name field "Yoga for Beginners" duplicates "for Beginners"; rename display name to "Yoga" or build title from a separate field).

Meta description: stop appending "Time, cost, supplies and an easy first session." to every one. Use per-hobby: "[hook sentence]. About [time], from $[low], and a first session you can do tonight."

Hero buttons (add above Save/Copy/Pin/Share): primary "See what you need" (anchor to kit), secondary "Save to My Plans". Move Copy link / Pin it / Send to group chat to a small "Share" row.

Section headings (current -> new):
- "Why you might love it" -> "Why you'll love it" (drop the hedge "might")
- "How to get started" -> "Your first week"
- "Your first session" -> keep, make it the first block after the stats strip, tag "Tonight, 45 minutes" (use the hobby's own minutes)
- "A good first project" -> "What you'll have made" (only when it differs from first session; otherwise omit)
- "Good to know" -> delete; move the three facts into the stats strip
- "Where to learn" -> "Where to learn it free"
- "What you'll need" aside -> "Your starter kit" with button "Shop the kit" below the list
- "Shop your hobby" (divider, first block) -> remove; keep the single kit panel
- "Guides that mention it" -> "Read next"
- "if you like pickleball, try…" -> keep (best line on the page)

Stats strip: "Rough startup budget" -> "Start for about"; footnote "Approximate range, not a price. ..." stays (honest), shorten to "Approximate, not a price. Costs vary by place and what you already own."

### 3.4 Per-hobby copy rewrites (descriptions and "Why you'll love it")

Rules: one sensory detail, one emotional payoff, no invented stats or personal experience.

Junk Journaling
- Current hero: "A scrapbook-meets-diary hobby where you glue, tape and layer receipts, tickets, magazine clippings and notes into a notebook. There's no right way to do a page."
- Replace: "Turn this week's receipts, tickets and scraps into a page you'll want to keep. Glue, tape, layer. There's no wrong way to do it."
- Current why: "It turns the small evidence of your week, a coffee sleeve, a train ticket, into something pretty." -> "The coffee sleeve, the train ticket, the note you almost threw away: by Sunday night they're a page you made."

Watercolor Painting
- Current: "Translucent paint, a little water, and paper that does half the work for you. Loose florals and imperfect landscapes are the whole charm."
- Replace: "A little water, a little colour, and the paper does half the work. Loose florals and wobbly skies look lovely on purpose."

Air-Dry Clay
- Current: "Clay that hardens on its own, no kiln needed. Trinket dishes, incense holders and wobbly little vases, painted once dry."
- Replace: "Pottery-night energy at your kitchen table. No kiln: shape a trinket dish tonight, paint it tomorrow." (uses existing "Pottery-class energy at your kitchen table" line from the data)

Pottery Painting
- Current why: "A no-skill, very cute plan, and you get a mug out of it." Good. Hero current: "Choosing a blank ceramic piece and painting it with glazes at a studio, or with a ceramic kit at home."
- Replace: "Pick a blank mug, paint it however you like, and collect it when it's fired. A no-skill plan with something to show for it."

Mahjong
- Current why: "A reason to see the same friends every week, plus snacks." (good, keep). Hero current: "A tile game for four with a long history and a big modern revival among women's social clubs."
- Replace: "A tile game for four, a card on the table and a standing Friday night. The easiest way to turn 'we should hang out' into a weekly plan."

Pickleball
- Current: "A smaller-court paddle sport that's very easy to pick up and very social." / why "You'll be playing proper points within the first hour."
- Replace hero: "Small court, light paddle, lots of laughing. Easy enough to play real points in your first hour."
- Replace why: "You'll be playing real points in your first hour, you'll be laughing by the second, and everyone there is also a beginner at something."  (drop last clause if you want to avoid a claim: "and nobody expects you to be good yet.")

Yoga
- Current hero: "Slow stretching and breathing, done on a mat at home with a free video or in a beginner class. No flexibility needed; you go as far as feels okay."
- Replace: "Ten slow minutes on a mat at home with a free video. No flexibility needed; you go as far as feels okay."
- Add a why: "A quiet ten minutes that's only for you, and a reason to put the phone in another room."

Reading
- Current: "Yes, it counts. Especially fiction, especially off a screen, especially with a library card from most libraries."
- Replace: "Yes, it counts. A good book, a warm lamp and a library card are a whole evening plan."

Running
- Current: "Run-walk intervals around your own neighbourhood or a park, building up slowly. The goal is to finish feeling good, not to be fast."
- Replace: "Walk, jog a little, walk again. Twenty minutes around your own block, and you finish feeling good, not wrecked."
- Fix spelling: "neighbourhood" vs US "neighborhood" used elsewhere (site is US/Amazon). Also hero image is a text card quoting instructions; see section 4.

Baking
- Current: "Cookies, banana bread, galettes. A hobby where the reward is edible and easy to share." -> "Cookies, banana bread, a galette for Sunday. The only hobby where the result is warm, edible and easy to hand to someone you like."

Crochet
- Current: "Making fabric with a single hook and yarn: granny squares, little bags, bucket hats. The first hour is fiddly; the tenth is meditative." (strong, keep). Why: tie to payoff: "One hook, one ball of yarn, and by the end of the week a granny square you made yourself."

### 3.5 Shop block (single kit panel)

Current: "Shop your junk journaling kit" / "Tap the list icon on anything you want, then copy or print the list. It stays in this browser."
Replace headline: "Your junk journaling starter kit" ; dek: "Everything for your first page, picked so you're not guessing in the craft aisle. Add what you like, then copy or print your list."
Button labels: "Add all essentials" -> "Add the essentials"; "Copy list" -> "Copy my list"; product button "View on Amazon" -> "See it on Amazon" (honest, clear). Replace the lead-in "If you only buy one thing" with "Start with this" (keep honest picks); "Optional extras" -> "Make it prettier".
Remove duplicate kicker "Shop your hobby" above the h3 (it sits right under a divider with the same words).
For hobbies with no products (Yoga, Running): see quick wins.

### 3.6 Category pages

Meta: replace "A Little Movement: Outdoor & recreational hobbies" etc. (title = name + short, description = intro). Proposed:
- After Hours: title "After-Work Hobbies You Can Start Tonight"; description "Weeknight hobbies and plans for after you close the laptop. No car, no full Saturday, and you can be started within the hour."
- The Weekend Edit: title "Weekend Plans That Aren't Just Brunch"; description "Markets, picnics, workshops and slow mornings. Give Saturday a storyline."
- Table for One: title "Solo Date Ideas You'll Actually Look Forward To"; description "Cafe dates, creative nights and slow Saturdays for one. Solo, not lonely."
- Better Together: title "Hobbies to Do With Friends"; description "Craft nights, mahjong, book clubs and new friends. Text the group chat and pick a date."
- Creative Corner: title "Creative Hobbies for Beginners"; description "Paint, clay, paper and thread. End the night with something you made. Being good at it is optional."
- A Little Movement: title "Fun Ways to Move That Aren't the Gym"; description "Tennis, pickleball, hiking and slow wanders. Movement for fun, not for a tracker."

On-page:
- "Read this first" -> "Start with a read"
- "Hobbies to try" -> "Pick one to try"
- "Supplies for this" -> "Start shopping the vibe" (collections are curated lists, not suppliers; avoid "this" ambiguity) or "Shop the look"
- Links: "See all hobbies" -> "See all 43 hobbies" as secondary; "Make a plan from these →" -> "Build my plan →" as the primary button (cherry fill).
- Category intros, one-liners (keep brand voice): After Hours "Small, doable ideas for after you close the laptop. No car, no full Saturday." (good). Better Together "Hobbies that come with people. Craft nights, book clubs and new friends." -> "Hobbies that come with people built in. Pick one, text the group chat, set a date."

## 4. Visual direction

1. Photos: only 11 of 43 hobbies have images (Junk Journaling, Watercolor, Air-Dry Clay, Pottery Painting, Mahjong, Tennis, Hiking, Outdoor Sketching, Book Clubs, Craft Nights, Picnicking). Prioritise commissioning or generating consistent-style images (same warm film look as the existing ones) for the ten most-visited: Crochet (hands, yarn, a started granny square on a lap), Baking (cookies on a cooling rack, flour on a gingham towel), Reading (book, mug, lamp, blanket), Pickleball (paddle and ball on a court, women laughing), Yoga (mat at home by a window), Running (trainers by a door, a park path at golden hour), Knitting, Embroidery, Jigsaw Puzzles, Indoor Gardening. Each should show the object plus a hand or a lived-in table, not a stock studio.
2. Image-less cards: replace the flat tile with a "kit still-life" tile: a cream background with 2 to 3 line-drawn supplies in cherry ink (hook and yarn, whisk, paddle) plus the name. Stops three identical yellow squares side by side (Embroidery / Crochet / Knitting). If photos are not coming soon, vary doodles per hobby, not per category.
3. Directory hero: fill the empty right half with a rotated postcard collage of 3 existing images (junk journal, tennis, mahjong). Gives the page instant "things to try". Move the first card row up (reduce hero padding on desktop).
4. Profile hero (no-photo hobbies): the paper card with Caveat quote of the first-session instruction is a nice idea, but on Running the card is the same text as "Your first session" lower down. Make the card a "Tonight:" label with a shorter line, or a still-life illustration.
5. Profile order: hero -> stats strip -> first session (Caveat, big) -> "Your starter kit" with Shop button -> single kit panel with real product images -> first week steps -> guides -> related. This puts the emotion and the shop within one and a half screens.
6. Product images: replace grey placeholder boxes with real product thumbnails or, if images can't be sourced, a consistent branded tile with cream background and a line-drawn icon (not a grey block with brand text).
7. Mobile: stats strip should be 2x2 (it currently stacks four tall rows); the hero postcard card on mobile is huge and pushes meta and Save below the fold (Crochet mobile: description, chips, Save visible, then a large tilted card). Cap the card height or move it below the stats.
8. Category pages: reduce reuse. "Read this first" on Movement shows the same hiking image twice (articles share hero). Give each article a distinct hero or crop; use varied crops from the same shoots.
9. Guide cards with empty pink image blocks on profiles (Mahjong 2 of 3): hide cards with no hero, or fall back to the hobby image.
10. Filter chips: use filled butter chips with small icons; sticky on scroll for mobile so she can change filters while browsing.

## 5. Quick wins (under 1 hour each)

1. Fix "Yoga for Beginners for Beginners" title (display name or title template).
2. Replace boilerplate meta ending with a per-hobby line; drop "for Beginners" duplication.
3. Add a primary "See what you need" button in every profile hero (anchor to the kit panel).
4. Remove the first, duplicate "Shop your hobby" card strip, or the kit panel's duplicate kicker, so one kit module shows per page.
5. Rewrite the filter labels ("Free or low cost" -> "Under $25") and add a clear button to the empty state.
6. Rename "Good to know" away (delete), "Where to learn" -> "Where to learn it free".
7. Change category links: "Make a plan from these" becomes a filled cherry button.
8. Replace category kicker words on HobbyCard with friendly labels.
9. Rewrite the 10 hero descriptions and "Why you'll love it" lines above (copy only).
10. Hide guide cards that have no image or add fallback image.
11. Fix "neighbourhood" to "neighborhood" on Running.
12. Recategorise Film Photography (currently "outdoors", showing on Movement).

## 6. Bigger moves

1. Make 3 to 4 products per hobby the floor: Yoga (mat, strap, blocks), Running (belt/armband, socks, reflective vest only if verified), Pickleball (balls, bag, eye protection), Baking (sheet pan, whisk, spatula, parchment), Crochet (hook set, stitch markers, project bag), Reading (book light, bookmarks). Each must have a verified Amazon link in the existing catalog. Un-noindex Yoga and Running once they have them.
2. Photography programme for the 32 image-less hobbies (see section 4).
3. Redesign the profile layout around "first session + kit" (reorder, shorter prose, single kit module).
4. Category pages as curated, distinct experiences: each with its own order of hobbies (hand-picked, not first 6 by data order), a hand-picked featured hobby, and a primary action. Fix hobby selection logic so Table for One shows solo-specific picks (journaling, solo cafe, reading, jigsaw) and not the same six as Creative Corner.
5. Directory: add grouping filters, a "Start tonight" quick tag (beginner=1, minutes <= 45) and "Under $25" quick tag; consider a sticky filter bar and a count-with-sort. Remember: no accounts, so keep client-side only.
6. "Kit total" per hobby: a transparent "Starter kit, about $X to $Y" line derived from existing budget data, pointing to the kit panel, with the existing honest caveat (no invented prices).

## 7. Cross-page consistency

- Hobby name vs title: "Yoga for Beginners" vs "Watercolor Painting" vs "Pottery Painting": names mix a hobby and a modifier. Normalise names to the activity ("Yoga", "Watercolor"), then add "for Beginners" only in the title template.
- "Rough startup budget" (profile), "Under $25 to start" (card), "Varies, can start small" (card, Film Photography): three styles. Use one: "Start for about $X to $Y" on profile, "Under $X" on card.
- Hero CTAs: directory "Or let the quiz choose" vs nav "Find Your Thing" vs "Make a plan from these". Three names for related actions; use "Find Your Thing" for the quiz and "Build my plan" for the planner.
- Category name vs kicker: "A Little Movement" with kicker "Fresh air counts" (good), "Table for One" kicker "Make plans with yourself" (good); the card kicker is the raw tag ("creative", "active"), inconsistent with these.
- Tense: hero "You'll be playing" (future), "Why you might love it" (hedged), "Where: at home" (list). Pick confident present/future: "Why you'll love it".
- "Shop your hobby" is used as nav label, section divider, kit kicker and on the same page: collapse to the nav label and one on-page heading.
- Spelling: "neighbourhood" (Running) vs US spellings elsewhere.
- Disclosure: appears twice in the shop area on profiles; once per module near the first product button is enough.
- Sentence case vs title case on cards and headings is consistent; keep it.

## Top 5 changes

1. Put one primary "See what you need" button in every profile hero and use a single kit module (remove the duplicate shop strip, fix grey placeholder product boxes).
2. Move "Your first session" up as the emotional centre of each profile and rewrite hero lines and "Why you'll love it" with sensory payoff (rewrites above).
3. Fill thin or empty shelves: 3 to 4 verified products for Yoga, Running, Pickleball, Baking, Crochet; un-noindex Yoga/Running afterwards; fix the "Yoga for Beginners for Beginners" title.
4. Give the 32 image-less hobbies photos (top 10 first) or a distinct still-life tile; fill the empty directory hero with a collage so cards read as "things I could try".
5. Make category pages distinct: hand-picked hobbies per category (fix duplicates and mismatches like Watercolor/Film Photography under Movement), unique images, a filled "Build my plan" primary button, and benefit-led titles and meta descriptions.
