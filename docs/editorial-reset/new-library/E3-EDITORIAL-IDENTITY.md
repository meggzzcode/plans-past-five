# E3. Editorial identity: voice, formats, art direction, creative concepts

Status: proposal for owner approval, 2026-11-19. Nothing here is implemented. Written fresh from the brand brief; no old article copy was used as a foundation.

Inputs read: PLAN.md (00, 0, 2b), `src/styles.css` tokens, `src/components/brand/*`, `src/components/editorial/*` (AffiliateNote, Section, Inline), `docs/IMAGE-LICENSES.md`, `docs/commerce/image-rights-notes.md`, `docs/commerce/AMAZON-DISCLOSURE.md`, `docs/content/CANVA-LICENCE-TERMS.md`, `src/assets` list.

Open item for the owner: the brief names **The Little Adventures Edit**; PLAN 2b names **The Weekend Edit**. This document uses the brief's name. Also, the brief's 12 experiences (adds craft and paint nights and picnicking; drops puzzles and scrapbooking) differ from PLAN 2b's provisional 12. This document follows the brief; scrapbooking and puzzles remain light-discovery hobbies and fold into The Paper Edit and The Cozy Edit.

---

## 1. Voice and editorial standard (one page)

**The voice in one line:** a friend with excellent taste who already has something planned for Saturday, and tells you plainly what it is, what it costs and what to skip.

### Principles
1. **Specific beats enthusiastic.** Name the thing: "a 250 g tub of air-dry clay, a rolling pin, a butter knife" not "all the supplies you need." One concrete detail per paragraph (a time, a price band, a texture, a mistake).
2. **Warm, not gushing.** Dry humour allowed, exclamation marks rationed (at most one per article). She is an adult with a job; never talk down, never perform "girlboss" energy.
3. **Permission, not prescription.** We invite ("Try this on a Tuesday") and never scold ("You should be making time").
4. **Honest about effort and cost.** Say what is fiddly, what takes two attempts, what the realistic total is. Beginners trust us because we tell them the first result will be lopsided.
5. **Make a life, not a productivity project.** The hobby is the point; we never frame it as self-optimisation or a side hustle.

### Sentence rhythm
- Mix: one short sentence (3 to 8 words) for every two or three medium ones. Land paragraphs on the concrete detail, not a moral.
- Paragraphs 2 to 4 sentences. One idea each. Lists only for things she will actually tick off (supplies, steps, timings).
- Second person ("you") with first-person plural sparingly ("we"), only for editorial opinion we can stand behind. Never "I" except in a bylined personal essay.
- Verbs over adjectives. Cut "really," "just," "so," "very," "amazing," "perfect."

### Opening articles
Open with one of: a **scene** (the specific Thursday at 5:40 pm), a **concrete problem** ("Your first embroidery stitch will look like a hair"), a **small surprising fact**, or a **direct promise with a number** ("Four hours, one tote bag, no sunburn"). The first sentence must say what the page is about within 25 words so search intent is met.
Never open with: a dictionary definition, "In today's fast-paced world," "Have you ever wondered," "Are you looking for," "Whether you're a beginner or a pro," a history-of-the-hobby preamble, or a restatement of the headline.

### Closing articles
End on **one of**: the next smallest action ("Buy the clay Friday, make the bowl Sunday"); a single honest caveat; a good detail she can carry out the door. Maximum three sentences. Do not summarise what was just said, and do not use a formulaic "Conclusion", "Final thoughts" or "Ready to get started?" heading. Each article's ending must differ in form from the previous five published.

### Product recommendations
- Introduce the product by the **job it does in the plan**, then why we chose it over the obvious alternative, then one honest limit. ("Fine-tip pens are the one place not to economise; the budget set skips on the nib and it shows.")
- **No implied testing.** Banned unless a named editor really did it and the page says so: "we tested," "we tried," "I've used," "after weeks of use," "our favourite after testing," "hands-on," "tried and true," star ratings, scores, "best" without a stated criterion. Use verifiable language instead: "chosen for," "reads well for beginners because (spec/feature)," "what the maker says it includes," "reviewers commonly mention (cite only if verified)." Internal product scores are never shown.
- State criteria in plain words (size, material, price band, what is in the box). Say who it is not for.
- Price bands, not live prices ("under $25"), unless auto-verified.
- No health, safety or "non-toxic" claims beyond sourced, verified statements; link the sourced safety note instead.
- Each product block: name, one-line job, one-line reason, one-line limit. Three to five products in a block, rarely more.

### Free and low-cost options
Free options are **a short secondary note inside the plan, not the headline.** Format: "Already have it? A saucer and a tea-towel stand in for X." One line per item, placed after the paid pick. Never use "free" in headlines or as a hook. Never sneer at paying; never use "you don't need to buy anything" as a lead-in to shopping.

### Affiliate disclosure placement
- **Top of any article that contains shopping links**, directly under the byline/intro and before the first link, using the `AffiliateNote` component so the wording stays in `src/config/affiliate.ts`.
- Repeat the short `AffiliateNote` at the head of each shopping block. Plain language: we may earn a commission, it does not change the price or our picks.
- Amazon wording must match the Associates Agreement sentence on the page ("As an Amazon Associate I earn from qualifying purchases."); see `docs/commerce/AMAZON-DISCLOSURE.md` (code currently says "we": open mismatch, not ours to edit here).
- Pinterest pins that link to shopping pages: say "Affiliate links" in the pin description. No commission rates or earnings figures anywhere.

### Banned phrases (and their replacements)
"your next era" / "[hobby] era," "game-changer," "must-have," "obsessed," "life-changing," "elevate your [anything]," "hack," "secret weapon," "holy grail," "ultimate guide," "perfect for everyone," "you deserve," "treat yourself" (as a hard sell), "self-care Sunday" clichés, "unleash your inner [anything]," "dive into / delve," "in today's fast-paced world," "whether you're a beginner or," "look no further," "it's no secret," "when it comes to," "at the end of the day," "the best" (without a criterion), "tried and tested," "we love" (as the only reason), "can't go wrong," "take it to the next level." Also no em-dash chains and no triplet-adjective openers ("cozy, creative, and calming"). Note: the existing shop collection "pottery-era" slug is legacy; do not carry "era" into new copy.

### Headline rules (keep search intent clear)
1. **Lead with the searchable noun phrase**, the voice goes after: "Air-Dry Clay for Beginners: What to Buy and Your First Bowl" not "Clay Dreams."
2. One primary keyword per article, matching a single intent (how-to, list, comparison, plan, buying). Never two intents in one title.
3. Include the audience qualifier or the outcome when it is real ("for Beginners," "in One Afternoon," "Under $50").
4. Numbers only when true and countable; no inflated lists.
5. 50 to 65 characters for the title; a separate warmer **display headline** is allowed on-page only if the H1 or subtitle still carries the keyword.
6. No clickbait withholding ("You won't believe"), no brand names in headlines unless the article is genuinely about that product.
7. Pinterest title (separate field) may be more evocative but must describe the real content of the page.

---

## 2. Editorial formats (8)

Each article uses one primary format, so pages differ in rhythm, structure and photography. Length is body words; photo counts exclude product cards. All shopping sits under the disclosure rule above.

| # | Format | Opening | Structure | Where shopping goes | Photo needs | Length |
|---|---|---|---|---|---|---|
| 1 | **The Starter Guide** (beginner how-to) | A scene of the first attempt, or the honest first-result truth | What it is in two sentences; what you will make today; a simple supply list; numbered steps with times; three common mistakes; "next project" | One compact "What to buy" block after the steps, plus "Already own it?" notes | Hero (editorial), 1 tools flat lay, 3 to 5 process shots, 1 finished piece, Pinterest vertical | 1,200 to 1,800 |
| 2 | **The Edit** (curated shopping edit) | One-line point of view on the category ("Pens are where we spend, paper is where we save") | 8 to 12 picks grouped by job, each with a reason and a limit; a "how we chose" box; skip list | Whole article is shopping; every pick in a product card with job, reason, limit | Editorial hero, styled still lifes by group (clearly not product photos), no stock product shots | 800 to 1,300 |
| 3 | **The Plan** (a day or evening, hour by hour) | The time and place: "Saturday, 10:30, one tote bag" | Timeline with times, budget, what to bring, a rain plan, a "make it a date/friend/solo" toggle | Short "Pack this" list at the end, tied to the plan | Scene-led hero, 3 to 4 moments through the day, a map-like or schedule graphic | 900 to 1,400 |
| 4 | **The Host's Guide** | A table or room already set, guests about to arrive | Setup, guest list size, timing, what to buy vs borrow, a script for the first ten minutes, how it ends | "Hosting kit" block near the top (what makes it work) and "nice to have" at the end | Wide table scene, detail shots, a verticals series for Pinterest | 1,300 to 1,900 |
| 5 | **The Weekend Journal** (personal essay with a plan inside) | A bylined, first-person moment, true and small | 600 words of story, then a clearly separated "Do it yourself" panel with steps | One or two items woven in with disclosure, never more than three | One strong lifestyle hero, 2 supporting moments, no process shots | 900 to 1,400 |
| 6 | **The Comparison** (choosing between two or three options) | The decision stated plainly ("Watercolor pans or tubes? Pans, unless...") | Verdict first, a table (cost, space, mess, learning curve), who each suits, what to buy | Verdict-aligned picks under the table; each option gets one pick | Side-by-side editorial still life, one diagram, no product claims in image | 1,000 to 1,500 |
| 7 | **The Idea Board** (inspiration gallery) | One sentence naming the feeling and the count | 12 to 25 numbered ideas, each one image plus 2 to 3 lines; grouped by mood | Optional "Get the look" footer link to the relevant Edit; no per-idea affiliate links | The most image-heavy format: every idea gets a distinct, labelled illustrative image | 600 to 1,000 |
| 8 | **The Q and A Primer** (questions she actually asks) | The question she is embarrassed to ask, answered in a sentence | 6 to 10 questions as subheads, each answered directly then expanded; a short "if you only do one thing" | One shopping note per relevant answer; link to the full Starter Guide | Hero and 2 spot images; Pinterest vertical with the top question as text overlay | 1,000 to 1,600 |

Format-to-experience pairing: Starter Guide (clay, watercolor, embroidery, crochet, junk journaling, flower arranging, tennis, pickleball); Host's Guide (mahjong, craft and paint nights, picnicking); Plan (little adventures, picnicking, pickleball social); Comparison (supplies and equipment decisions); Idea Board (journaling spreads, table settings, picnic setups); Weekend Journal and Q and A (variety and trust, spread across experiences).
Rule: no more than two consecutive published pieces in the same format; each collection landing page links to at least three formats.

---

## 3. Art direction

### 3.1 Principle
Photography sells the *feeling of the weekend* and never pretends to be product evidence. Two image classes that never blur:
- **Editorial / inspirational images** (lifestyle scenes, styled still lifes, flat lays): sell the mood. May be AI-generated. Never used to show a specific branded product or imply what it looks like.
- **Product photography** (an actual product as sold): only with a licence we hold (maker press kit with written terms, our own photos of products we own, or API images under the Associate's own agreement). Today none is approved (see `docs/commerce/image-rights-notes.md`). Default stays: **photo-less product cards**. Product cards must never use an editorial image as a stand-in.

### 3.2 Light
Soft natural daylight: window light from the side, or low golden-hour light outdoors. Slight warmth (about 5000 to 5500 K feel), gentle shadows, no flash, no harsh studio strobing, no neon or cold blue grading. Indoor evening scenes use one warm lamp. Film-like, very slightly faded blacks (a nostalgic cast without muddy colour).

### 3.3 Colour palette (from `src/styles.css`)
- Grounds: Vanilla Cream `#FFF8EF`, Warm White `#FFFCF8`.
- Brand accent: Cherry `~#A93438` (small, deliberate: a mug, a cardigan, a ribbon, a pen).
- Supporting: Strawberry Milk `#F4D4D7`, Butter Yellow `#F8E5A3`, Matcha `#B5C19C`, Sunday Blue `#C9DDEC`, Garden Green `#394D3C` (depth, foliage), Espresso `#48362E` (wood, coffee, shadow).
- Rule: each image has a cream or natural-wood ground, **one cherry note, and at most two supporting tints**. Gingham (existing `--gingham` token) appears as a prop (cloth, napkin, ribbon), never as a full-frame pattern. No black, no chrome, no grey-cool minimalism.
- Typography on images (Pinterest/graphics): Fraunces (display, italic for emphasis, matching the wordmark), DM Sans (small caps labels), Caveat (one handwritten accent per graphic, max 4 words).

### 3.4 Props and styling
Recurring props make the magazine recognisable: linen and gingham cloth, enamel and ceramic mugs, wooden trays, paper bags, striped paper, a pencil in a jar, loose flowers (tulips, ranunculus, wildflowers), a worn paperback, a tote bag, a kitchen table with real crumbs. Imperfection is intended: a smudged palette, a half-finished stitch. Avoid: sleek tech, gym-bro gear, stock-photo office scenes, perfect marble, text-heavy packaging.
People: women of different ages, builds and skin tones; hands, backs, profiles and mid-activity candids preferred over camera-facing smiles; no recognisable real person, no celebrity likeness, no logos on clothing or equipment.

### 3.5 Composition and crops
- **Hero, site:** 4:3 (existing exports 2336x1760) with the subject off-centre and 25% breathing room for overlaid headline.
- **Article inline:** 4:3 and 3:2 landscape; 1:1 for detail; one full-bleed 16:9 per long article.
- **Pinterest primary:** 2:3 vertical (1000 x 1500 px). Subject in the middle 60%; top 20% left clear for title, bottom 15% for the site wordmark. Secondary 1:2.1 tall for guides. Never rely on text rendered by an image generator; add type in layout.
- **Square 1:1** for social/email cards; **4:5** for lifestyle crops.
- Camera angles: overhead flat lay (journal, flowers, clay), 45-degree table level (hosting), eye-level over-the-shoulder (activity), wide with horizon (outdoor).

### 3.6 Shot lists per format (minimum set per article)
1. **Starter Guide:** hero in action; overhead tools flat lay; step 1, mid, finish process shots (hands); finished piece on a styled surface; Pinterest vertical with the finished piece and space for title.
2. **The Edit:** one overhead styled still life per group (illustrative, labelled); one lifestyle "in use" scene; no product close-ups.
3. **The Plan:** morning scene, midday activity, golden-hour finish; one flat lay of the "pack this" tote; vertical schedule graphic.
4. **Host's Guide:** wide laid table, close detail (place setting), guests' hands mid-game or mid-craft, a "before guests arrive" empty-table shot, 3 verticals.
5. **Weekend Journal:** one intimate hero, one environment shot, one detail; nothing instructional.
6. **Comparison:** matched pair still life, one neutral diagram, one lifestyle scene per option.
7. **Idea Board:** 12 to 25 distinct images in one consistent grade; each labelled as illustrative if AI.
8. **Q and A:** hero, two spot images, one vertical with large overlay question.

### 3.7 AI-generated imagery rules
1. **Allowed:** mood scenes, styled still lifes, flat lays, settings, hands-in-action, abstract props. **Not allowed:** depicting a specific named product, brand, logo, packaging or a real person's likeness; implying a particular item's look, size, finish or colour; "result" images that claim what a product or technique achieves; before/after outcomes; medical or safety-relevant demonstrations (e.g. clay or paint safety, sport technique) presented as instruction.
2. **No implied testing:** never show a generated image captioned or placed so it reads as "our test," "our review," "we made this." Process shots for how-to steps must be real photos of a real person making the real thing, or be omitted; never generate step-by-step images as if documentation.
3. **Generic products only:** a generated "ceramic mug" is fine; a generated "Brand X watercolor set" is not. Brush tips, stitch structure, clay surfaces and rackets must be plausible; reject images with warped hands, impossible stitches, wrong tennis/pickleball court lines or balls (verify against the sport).
4. **Labelling (consistent with docs and Pinterest policy):** every AI image is recorded in `docs/IMAGE-LICENSES.md` and the licence ledger (tool, date, source link, terms) and carries alt text. On-site: a single standing disclosure on the Editorial Standards page plus, on pages where imagery could be mistaken for documentation, a caption "Illustrative image, AI-generated." Pinterest: use Pinterest's AI-modified/AI-generated content label or setting where it is offered for the pin, and keep pin descriptions honest; do not use an AI image as the pin for a specific branded product.
5. **Rights stay open:** Canva/Lovable commercial-use and transfer terms are recorded but exclusivity and transfer are unverified; do not claim exclusive or registrable images in any copy.
6. **Consistency:** one prompt "house style" paragraph (light, palette, grade, imperfection) is prefixed to every brief so batches match; reject any image with legible text, logos, extra fingers or "plastic" skin.
7. Real photography is preferred over AI wherever an editor can make it; swap AI for real images as the budget allows, logging each swap.

### 3.8 Image brief template

```
IMAGE BRIEF
Article / page:           (slug)
Format:                   (1 to 8)
Class:                    Editorial-inspirational | Real product photo (licence ref: ____) 
Source:                   AI (tool: ____) | Real photo (who: ____) | Licensed (ref: ____)
Purpose in layout:        hero / inline / process / pinterest / social
Crop + size:              4:3 2336x1760 | 2:3 1000x1500 | 1:1 | 4:5
Story in one sentence:    (what is happening, what the feeling is)
Subject:                  (hands / back / profile / still life; no face-to-camera unless needed)
Setting + time of day:    
Light:                    (window left, golden hour, one lamp)
Palette:                  ground ____; cherry note ____; max 2 tints ____
Props (3 to 5):           
Composition notes:        (angle, subject placement, space reserved for text: top 20%)
Must NOT show:            logos, brand names, specific products, text, faces of real people, unsafe technique
Accuracy checks:          (court lines, stitch structure, clay/paint technique)
AI disclosure needed:     yes/no  (caption wording: "Illustrative image, AI-generated.")
Alt text (draft):         (describe the scene, not the sale)
Pinterest variant:        title overlay text (max 8 words), description, "Affiliate links" if linked to shopping
Ledger row added:         yes/no  (docs/IMAGE-LICENSES.md)
```

---

## 4. Initial creative concepts

Each: **headline idea** (display headline; the SEO H1 follows rule 1.7), **emotional hook**, **signature visual**, **Pinterest saveability**. "Save" is driven by something she can use later: a checklist, a list of ideas, a plan, a recipe-like card.

### 4a. The 12 signature experiences

| Experience | Headline idea | Emotional hook | Signature visual | Why it gets saved |
|---|---|---|---|---|
| **Junk Journaling** | "Make a Junk Journal From the Stuff in Your Kitchen Drawer" (Starter Guide) | Your clutter becomes a keepsake; permission to be messy | Overhead flat lay of one open spread: ticket stubs, tea-stained paper, gingham tape, one cherry stamp | "12 spreads to copy" idea-board pin and a supply checklist |
| **Air-Dry Clay** | "Air-Dry Clay for Beginners: Your First Bowl in One Afternoon" | A tangible thing made by your own hands, no kiln | Hands pressing a thumb-pot, cream clay dust on a linen apron, finished trinket dishes in a row | Step-by-step vertical with "what to buy" card |
| **Watercolor** | "The Ten-Minute Watercolor Evening" | A small, quiet ritual after dinner, no talent required | A kitchen table at night, one lamp, a jar of cloudy water, three loose washes of Sunday Blue and Butter | "5 beginner washes to try" practice sheet pin |
| **Embroidery** | "Your First Stitch Will Look Like a Hair, and That's Fine" | Slow, cosy and totally portable; mistakes celebrated | Tight overhead of a hoop with matcha-green stem stitches and a visible loose thread | "6 stitches to learn first" visual stitch chart |
| **Crochet** | "A Blanket Starts With One Chain: Crochet Without the Tears" | Nostalgia for a grandmother's blanket, made by you | Butter-yellow granny squares spilling from a basket, hook in hand | "First granny square" pattern card with row diagram |
| **Reading** | "A Reading Date With Yourself" (Weekend Journal) | Permission to take a whole Sunday afternoon, guilt-free | Window seat, worn paperback, a pot of tea, strawberry-pink cushion | "Reading nook" idea board and a "book plus snack" pairing list |
| **Flower Arranging** | "Grocery-Store Flowers, Florist-Style: Three Arrangements" | Beauty you can make for $15 on a Thursday | Overhead of a cool-toned vase with tulips and eucalyptus, scissors and a ribbon beside it | Three-recipe vertical (flower counts, vase shapes) |
| **Mahjong** | "How to Host a Mahjong Night (Even if You're Still Learning)" (Host's Guide) | Being the friend who gathers people | A laid table: tiles, tea, a plate of lemon cookies, a handwritten score card | Printable "first night" run-sheet pin and snack list |
| **Craft and Paint Nights** | "The Craft Night Kit: One Table, Six Friends, No Pressure" | Girls' night with something to show for it | Wide shot of a long table with paper-covered surface, jars of brushes, cherry mugs | "Craft night plan, hour by hour" vertical and shopping list |
| **Picnicking** | "The Picnic Bag That Does Everything: What to Pack and How to Carry It" | Low-cost, high-romance weekend; summer in a bag | Gingham blanket from above, sandwiches in wax paper, a bottle of lemonade, strawberries | "Picnic menu plus packing checklist" card |
| **Pickleball** | "Pickleball for People Who Weren't Sporty" | Social, laughter first, the fitness is a side effect | Backs-turned friends in pastel skirts, a court at golden hour, a paddle on the fence | "First-time player cheat sheet" (rules, gear, etiquette) |
| **Tennis** | "Back to Tennis: The Adult Beginner's Comeback" | A glamorous, slightly nostalgic sport, now approachable | Woman in a red cardigan on a worn court at golden hour, racket under arm, backlit | "What to wear and bring" outfit/gear board |

### 4b. The 6 collections

| Collection | Headline idea | Emotional hook | Signature visual | Why it gets saved |
|---|---|---|---|---|
| **The Paper Edit** | "The Paper Edit: Pens, Papers and Tape Worth Hoarding" | Stationery nostalgia: the joy of a new notebook | Overhead stack of cream paper, striped washi, one cherry pen, a handwritten label in Caveat | Category "starter set" lists by budget band |
| **The Creative Edit** | "The Creative Edit: Everything for Making Things With Your Hands" | The happy mess of a table full of materials | Matte flat lay: clay, brushes, floss, yarn in Strawberry, Butter and Matcha | "Starter shelf" mood board with job-per-item notes |
| **The Cozy Edit** | "The Cozy Edit: For Staying In and Loving It" | A well-earned slow evening | Evening lamp, knit throw, mug, puzzle half-done on a tray | "Cozy evening bundle" ideas by mood |
| **The Hosting Edit** | "The Hosting Edit: Make It Easy to Say 'Come Over'" | You as the friend whose table people remember | Set table with candle, tiles/cards, a bowl of snacks | "Host-ready checklist" by event type |
| **The Sporty Edit** | "The Sporty Edit: Clothes and Gear for Moving for Fun" | Movement as joy, not punishment | Court-side flat lay: racket, sweatband, a cherry skirt, a water bottle on a bench | "Court-day bag" packing list |
| **The Little Adventures Edit** | "The Little Adventures Edit: Small Escapes, Big Mood" | A tote-bag trip within an hour of home | Tote bag on a bench, map, thermos, wildflower trail beyond | "Day-trip kit" by season |

---

## 5. What makes this magazine different (positioning statements)

1. **Plans, not just products.** Every article ends with something to do this weekend and a way to put it on the calendar; the shopping is the supporting character.
2. **Taste with a budget.** We pick a few things worth buying and say which to skip, with a price band you can see before you click.
3. **Honest about what we did.** We say what we chose and why; we do not claim we tested what we did not, and we do not hide the commission.
4. **Beginners welcomed.** Written for the first attempt, the lopsided bowl and the tangled yarn, not for experts.
5. **Her life outside work is the subject.** Not wellness, not productivity: the plans after five that make a week feel like a life.
6. **A magazine, not a database.** Eight article formats, a consistent photographic world, and an editor's point of view, rather than interchangeable lists.
7. **Tools that finish the thought.** Hobby finder, planner and shopping Edits connect inspiration to an actual plan.
8. **Clear about the pictures.** Imagery sets the mood; it is labelled when generated, and it never poses as a product shot.

---

## Constraints to carry into execution
- Disclosure, no-implied-testing and image-class rules are acceptance checks for every pilot.
- No product photos until a licence is on file; product cards stay photo-less.
- Pinterest AI labelling to be rechecked against Pinterest's current policy at upload time (not read in this pass).
