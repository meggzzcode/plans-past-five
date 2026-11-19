# M5 - Shop, collections, kits and product cards: marketing review

Scope: /shop, the 8 collection pages (/shop/$category), StarterKit and ShopMyHobby/ShopTheArticle blocks as seen on collection, hobby and article pages, product cards (named and type-level), saved shopping list, the "Shop your hobby" journey, disclosure placement.
Method: read src/routes/shop.index.tsx, shop.$category.tsx, saved.tsx, src/components/commerce/*, src/data/kits.ts, catalog.ts, catalog.generated.ts (31 verified products), products.ts, collection-guide.ts, config/affiliate.ts; screenshotted desktop 1280 and mobile 390 for /shop, all 8 collections, /saved, two hobby pages.
Process note: during review the live server returned 500 on every page because src/data/hobbies.ts line 500 had unescaped double quotes inside a string ("we should hang out"). It was fixed in the working tree while I worked (now single-quoted). I reviewed a scratch copy with the same one-character fix. Keep a `bun run typecheck` or build in the edit loop so this cannot reach a buyer's first look.

---

## 1. Verdict and sell-appeal scores

This is an unusually honest shop, and honesty is the brand's best asset, but right now it reads like a well-built reference catalog, not a place a woman wants to shop. Three things hold the revenue back. (1) The page asks for a click before it earns a feeling: the /shop headline is the label ("Shop your hobby") and the dek is a policy statement (how we checked, what we show) instead of a promise. (2) The product visuals are the weakest layer: of 31 named products, none has a photo, so every card is a flat tinted rectangle whose biggest text is a brand name ("Scotch", "Mr. Pen", "Stationery Island"), and several tiles render almost white and look broken. (3) Coverage is thin and the gaps are loud: 9 of 15 kits fill zero slots and render nothing, and 4 of 8 collections (Sporty Girl, Bookish Girl, Little Adventures, Cozy After Hours) have no named product at all, so they show a "We haven't picked named products for this collection yet" apology and six generic "Browse options" Amazon-search cards. The bones are right: one-pick-first framing, benefit lines that are specific and plain, a clear single button per card, and disclosure that is calm and near the ask. The fix is mostly copy and tile design, not structure.

Scores (1 to 10, honest):

| Page / block | Score | One-line reason |
|---|---|---|
| /shop (index) | 5 | Beautiful collection images, but a policy-first dek, no hook, no "start here", no sample of real picks, two repeated images, 6,000px mobile scroll of 8 same-size cards |
| Collection page with a filled kit (Journaling Era, Pottery Era, Creative Girl, Girls' Night In) | 6 | Strong one-pick framing and good benefit lines, buried under 3 generic info sections and a collapsed "browse by product type" before the products arrive |
| Collection page with NO named products (Sporty, Bookish, Little Adventures, Cozy) | 3 | Apologetic banner, six search-link cards, repeated "Browse options on Amazon"; no reason to pick one |
| StarterKit block | 6.5 | Right structure; dek and note copy is functional; blank-looking tiles; no "what you get / what it adds up to" line |
| Product card (named) | 6 | Benefit lines are the best copy on the site; tile is the weak spot; button is generic |
| Product card (type-level, "What to look for") | 4 | "look for ->" is useful, button "Browse options on Amazon" is a dead-end feel, tied-for-last in desire |
| ShopMyHobby list block (hobby pages) | 6 | Handy and honest, but opens with tool buttons ("Add all essentials / Copy / Print / Clear / 0 on your list") before desire |
| Saved shopping list (/saved) | 4 | Plain text list with no link to buy, no picture, no next step beyond "Back to Shop Your Hobby" |
| Disclosure placement | 8 | Right place, right tone, one wording. Slightly long and repeated three times on one collection page |
| Overall "is this somewhere she wants to shop" | 5.5 | Trustworthy, not yet tempting |

---

## 2. Findings by page, ranked by revenue and engagement impact

### /shop (index)

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | Hero is label + policy. "Starter picks for 8 kinds of after-work evening. Where we name a product, we checked its Amazon page and say why it made the list; everywhere else we tell you what to look for. And we'll always say when you don't need to buy anything." The emotional promise never appears. Honesty is the second sentence's job, not the first's. | High | Lead with the feeling and the first step; compress the honesty into one trust line (rewrites in section 3). |
| 2 | Headline duplicates the kicker ("SHOP YOUR HOBBY" then "Shop your hobby") and the nav. It names the shelf, not the reward. | High | Benefit headline (section 3). |
| 3 | No primary action. Eight equal tiles, nothing says "start here". She has to know her era. | High | Add a "Not sure which one? Find your thing" line above the grid and a "Start with these" row of 3 picks (see section 5). |
| 4 | Two collection images repeat: Journaling Era reuses the Creative Girl photo, Cozy After Hours reuses Bookish Girl. On a page about choosing, two pairs of identical tiles look like a bug and cheapen the "curated" feel. | High | Generate two new images (section 4). |
| 5 | Tile captions are one line of grey microcopy; the card does not say what is inside or how many named picks exist. No cue separates a collection with real picks (4 of 8) from one without. | Med-High | Add a quiet line under the dek: "6 picks", "A starter kit", or "A buying guide" (honest labels from data). |
| 6 | Footer-style small print under the grid carries the real shopping facts ("Named products link to their own Amazon page; 'what to look for' guidance across 36 product types opens an Amazon search instead"). Accurate but inside-baseball; "36 product types" is editor-speak. | Med | Shorten (section 3). |
| 7 | Meta description is a list of topics and ends with a hedge: "a few named products where we have checked the listing, plain guidance everywhere else." | Med (search/Pinterest CTR) | Replace (section 3). |
| 8 | Mobile: 8 full-width image cards = about 6,000px. | Med | Two-up grid with smaller crops on mobile, or a horizontal chip row of collection names above the grid. |

### Collection pages (general layout)

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | Order of sections is editorial, not commercial: hero, "Who this collection is for", "What these hobbies involve", "Essentials, upgrades and budget-friendly options" (three auto-generated lists), banner, then products. The first product appears around 2.5 screens down on desktop. On the Journaling page the actual kit starts about 1,500px down. | Highest | Move the starter kit (or the best-pick row) directly under the hero; keep "who it's for / what to know" below and shorten. One primary action per screen = "See the picks". |
| 2 | Hero repeats a disclosure paragraph in small type directly under the dek ("Buttons that say 'View on Amazon' open a named product's own page; 'Browse options' opens an Amazon search..."). It is the first thing after the intro and reads as legal fine print at the top of a sales page. It also repeats under the kit and again under the list. | High | One short line in the hero, full wording stays under the product block. |
| 3 | "Who this collection is for" body is a formula: "Anyone curious about tennis, pickleball, hiking and picnicking who wants to start small. No experience is assumed, and being good at it is optional." Template-like, same sentence on every page. Then the dek is pasted again as a second paragraph ("For golden-hour rallies and Saturday trails."), which is a stranded fragment with a period added. | Med-High | Per-collection two-line "she is..." copy (section 3), drop the repeated dek. |
| 4 | "Essentials, upgrades and budget-friendly options" lists are auto-merged from four hobbies and read as noise: Sporty Girl "Essentials" contains Sneakers AND Comfortable shoes, Water, A snack; "Optional upgrades" has Water bottle AND Tote bag AND Sports tote AND Market tote AND Picnic blanket. Journaling shows "Printed photos / Old magazines" as essentials. A reader cannot tell what to buy. | High | Hide on collections with a kit; on others, cap at 4 per list and dedupe. Better: delete this section and let the kit replace it. |
| 5 | "If you would rather not spend" column is the best honest hook on the page (it shows she can start free) but it is the third column of an auto-list, on the third screen. | Med | Promote to a short callout inside the kit: "Already have scraps? Skip the paper pack." Sell trust, not just products. |
| 6 | "Or browse by product type" is a closed `<details>` once named picks exist: the 36 type-level cards are hidden. Right call, but the summary reads as a chore. | Low-Med | Rename to "More ideas by product type". |
| 7 | "Illustrative styling, not specific products" handwritten on the polaroid is honest, and charming. Keep it. | Positive | Keep. |
| 8 | Bottom sections ("Hobby guides this collection supports", "Read before you buy", "More collections") are good cross-sell but the "Read before you buy" label sells against the shop: it tells her to leave. | Med | "Before you buy: the guides" is right in spirit; rename "Read first, then shop" and give each article a one-line "what's in it for your cart". |

### Empty collections (Sporty, Bookish, Little Adventures, Cozy After Hours)

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | The banner "We haven't picked named products for this collection yet." is a confession of an unfinished store on the page where she is about to decide. Honest, but you can be honest without apologising. | High | "These are shopping notes, not product picks yet: here is what to look for and where to compare." And lead with the strongest card. See section 3 rewrite. |
| 2 | Six "Browse options on Amazon" buttons with identical label. No differentiation; a search is a weaker promise than a product. | High | Label search buttons by what she is searching: "Find beginner rackets on Amazon". |
| 3 | The type cards do carry gold: "look for -> Labeled 'beginner' or 'recreational', pre-strung, with a larger head size." That checklist IS the product recommendation. It is styled as grey body text. | Med-High | Make "look for" the card's headline benefit; it is where the card earns trust. |
| 4 | Sporty Girl hero image shows a styled bag, racket, bottle: great, and the collection has zero named products to match it. Visual promise outruns inventory. | Med | Prioritise filling these four collections (see bigger moves). |

### Starter kit block

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | 9 of 15 kits fill nothing and render nothing (reading-journal, girls-craft-night, book-club, picnic-adventure, flower-arranging, pickleball, tennis, cozy-night-in; crochet shows only 1 of 5 slots, watercolor 3 of 6, embroidery 3 of 6). The gaps are silent in code but visible to her as "kit" with one yarn. Crochet "starter kit" with one skein of white yarn, no hook, is not a kit. | High | Hide kits below 3 filled slots including at least one essential, or retitle partial kits ("Where to start: crochet yarn"). Rule in code: fillKit count < 3 renders as a pick card, not a "kit". |
| 2 | Kit dek and note are functional, not wanted: "A journal, something sticky and a pile of paper scraps." (nice) vs "Two things make this list work: a journal with thick pages, and a glue you like. Everything else is a bonus, and scraps from your recycling bin work as well as bought paper." (good honesty, over-explained). Several kits have no note and a flat dek ("Small things that make the meeting easier."). | Med | Tighter, picture-first copy (section 3). |
| 2b | Dek spec mismatch: "Girls' craft night kit" dek "One easy project that suits a group." has no emotion, nothing to picture. | Med | See section 3. |
| 3 | The one-pick ("If you only buy one thing") is the strongest conversion device on the site and it is styled as a small italic cherry h4. It should be the loudest element in the kit. | High | Bigger, boxed, with a "Our one pick" sticker and a reason sentence (section 3, template). |
| 4 | Pick selection logic can contradict the story. On Junk Journaling the pick is the journal and "Start with these" shows glue; fine. On Mahjong (hobby page) the one-pick is the TIASUSAN set while the NMJL card is also a flagged essential; a set without the card is unplayable. | Med | For multi-essential kits, say so: "Your one pick: the set. You'll also need the card (below)." Honest and increases card sales. |
| 5 | Slot captions in handwritten cherry ("Glue stick or tape runner", "Washi tape") above each card are charming and useful. They are also the only place the kit speaks in her voice. | Positive | Keep; extend with a verb ("Something sticky: glue stick or tape runner"). |
| 6 | No "what this adds up to". She cannot see how many things, or the approximate spend, at the top of the kit. The site already owns an honest source: hobby `startupRange` / the Hobby Starter Budget tool ("START FOR ABOUT $0 to $70, Approximate, not a price"). Not used on kits. | High | Show "6 things, none essential beyond the first two" and, if the owner approves banded ranges on shop pages, "Most people start for about $X to $Y (approximate)" from equipment.ts. |
| 7 | KIT_DISCLAIMER "A shopping list we put together, not a bundle we sell. Each item links to its own Amazon page." is a clean honest line but sits under 12 other things and is followed by the Shop disclosure; two disclaimers stacked. | Low-Med | Merge into one line (section 3). |

### Product card (named)

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | Picture is a flat tinted tile (butter/strawberry/sunday/matcha/warm-white) with a hairline inset border, category kicker and a brand or short name in italics. Largest text: brand. Brand names mean nothing to a beginner ("Stationery Island", "Knaid"). The thing she wants (the mood, the result) is absent. Scotch glue sticks tile renders warm-white on cream and looks like an empty box. On the kit page 4 tiles are 400+px tall blank rectangles, which dominate the screen. | Highest | See visual direction: tile redesign (section 4). |
| 2 | Benefit lines are the best copy on the site (specific, plain, no hype): "Pastel floral rolls in three widths: enough variety to decorate a whole journal." Slightly feature-first on some ("Twenty 140 lb cold-press sheets for practice washes"). | Positive | Keep the register; shift 30% to result-first (template). |
| 3 | Name repeats brand: "TIASUSAN American mahjong set, blue tiles" with brand "TIASUSAN" on the line below and again as the tile headline. Three times. | Med | Hide the brand line when the name starts with it; make the tile show a benefit or the category in plain words. |
| 4 | Role label "ESSENTIAL" / "OPTIONAL EXTRA" is the only status cue. "Optional extra" is the lowest-desire two words in retail: it tells her not to buy. | High | "Nice later" / "Pretty extra" / "When you're hooked" (copy bank, section 3). Keep honesty (skippable) without the shrug. |
| 5 | Button: "View on Amazon" (named) or "Browse options on Amazon". Honest and clear but verb is passive ("view"). It is a black button, hover cherry; the cherry button is the brand colour and it is spent on "Find Your Thing" elsewhere. | Med-High | Test "See it on Amazon" or "Check it on Amazon" (leave "Amazon" in). Keep it visibly an external, ordinary Amazon link; do not use "Buy now". Also make primary kit button cherry (brand), keep secondary actions ink. |
| 6 | Save icon (list+) is 44px, aria-labelled but icon-only. No visible text "Add to my list"; first-time users will not know what it does. | Med | Visible label on the pick card ("Add to my list") and tooltip elsewhere. |
| 7 | "Also consider" alternatives show `compare` lines, which are excellent honest copy ("Tidier than a glue stick, but permanent: you can't lift it once placed."). The alternatives are small text links that look like footnotes; for a woman who wants a different colour or price tier, they are the real second sale. | Med | Name the choice: "Prefer neutral? Knaid 40-roll set." (template). |
| 8 | No gift angle anywhere: zero "gift" copy in shop components; four articles and hobby data mention gifts but the shop does not. | Med | Gift section, see section 5. |

### ShopMyHobby (hobby pages)

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | Block opens with "SHOP YOUR HOBBY / Shop your mahjong kit / Tap the list icon on anything you want, then copy or print the list. It stays in this browser." followed by four utility buttons and "0 on your list". The first 6 lines are tool instructions; the picks start after. Reads like software. | High | Lead with the result: "Everything for your first game night." Put "Add all essentials" as one cherry primary button; tuck Copy/Print into a "Take it with you" row appearing only after something is added. |
| 2 | "0 on your list" shown when empty is the saddest line on the page. | Med | Hide until >= 1, or "Nothing yet: tap + on anything". |
| 3 | Hobby page "YOUR STARTER KIT" checklist ("A mahjong set (or a borrowed one) / Three friends / A rules card") + "Shop the kit down arrow" link is good: educational first, shop second. | Positive | Keep. |

### Saved shopping list (/saved)

| # | Finding | Impact | Fix |
|---|---|---|---|
| 1 | Shopping list rows are product name + brand in plain text with no buy link, no benefit line, no tile. The user saved something because she wanted it, and the list does not let her buy it. This is the closest-to-purchase surface on the site and it has no button. | Highest | Each row: name, one benefit line, "See it on Amazon" button, "Got it" and "Later" toggles. |
| 2 | Empty state "Nothing on the calendar yet? Let's fix that." is on-brand and good, but its CTAs go only to the quiz and planner, never to shop. | Med | Add a third link: "Pick a starter kit". |
| 3 | "Back to Shop Your Hobby" is the only exit from the list. | Low-Med | Add "Copy list to the group chat" prominence (already there), and "Gift list?" for the gift angle. |
| 4 | Page title "My Plans" (nav name) vs hero "Penciled in." vs "Shopping list" vs "My shopping list" vs "Shop picks" vs "Hobby wishlist": five names for adjacent things. | Med | Pick "My list" for shopping everywhere. |

### Disclosure placement

Good: one wording from src/config/affiliate.ts, placed under blocks of products, never per card. Tone is calm: "Each button opens that product's own Amazon page. We show no prices: Amazon or the seller sets price, shipping and returns. We don't currently earn from these links." Concerns:
- Collection hero repeats the long `general` wording top of page, above the picks; and the kit repeats KIT_DISCLAIMER + product wording again. Three disclosures on one screen run-up. Keep one at the hero in a shortened form ("Ordinary Amazon links. We show no prices. Details") and the full text under the product block.
- "We don't currently earn from these links" is true today but will become the Associates statement when live; the page should read warmly in both states. Fine, keep, but make sure a revenue-state wording ("As an Amazon Associate I earn from qualifying purchases.") sits adjacent to the first button, not only at the foot.
- Do not move disclosure into a tooltip. Proximity is the trust cue.

---

## 3. Concrete rewrites (current to replacement)

Voice rule used: benefit-led, sensory, specific, no invented facts, no prices/ratings/urgency, first person plural, light "girls/bestie" only where it fits.

### 3.1 /shop

Current meta title: "Shop Your Hobby: Beginner Starter Picks | Plans Past Five"
New: "Shop Your Hobby: Starter Picks for Your Next Evening Plan | Plans Past Five"

Current meta description: "8 collections of starter picks for pottery, journaling, painting, tennis, reading, cozy nights in and little adventures: a few named products where we have checked the listing, plain guidance everywhere else."
New: "Starter picks for pottery, journaling, painting, tennis, mahjong and more. One good thing to buy first, why it made the list, and an honest note when you can skip it. Ordinary Amazon links, no prices shown."

Current kicker/H1: "SHOP YOUR HOBBY" / "Shop your hobby" (italic "hobby")
New H1: "Start the hobby. *Buy one thing.*" (italic "one thing")
Alternative if the owner wants to keep the name: kicker "Shop your hobby", H1 "Everything for your *first night in.*"

Current dek: "Starter picks for 8 kinds of after-work evening. Where we name a product, we checked its Amazon page and say why it made the list; everywhere else we tell you what to look for. And we'll always say when you don't need to buy anything."
New dek: "Pick the evening you want. We'll tell you the one thing to buy first, why it made the list, and what you can skip or borrow. Ordinary Amazon links, no prices, no pressure."

New trust line (hero, small, under dek): "We read each Amazon page ourselves before a product goes on a list. How we choose."

Current section head: "THE COLLECTIONS / Shop by your era"
New: kicker "Pick your evening", H2 "Which *era* are you in?"

New helper line above the grid: "Not sure? [Take the Find Your Thing quiz] and we'll point you to one."

Current footnote: "Named products link to their own Amazon page; "what to look for" guidance across 36 product types opens an Amazon search instead. We never show prices, ratings or review counts. How we choose is on the methodology page, and how links work is in the affiliate disclosure."
New: "Buttons that say "See it on Amazon" open that product's own page. Where we only describe what to look for, the button opens an Amazon search. We never show prices, ratings or review counts: Amazon sets those. [How we choose] / [How links work]"

Collection tile captions (add the honest count):
- The Pottery Era: "Clay, paint and very lovable lumpy bowls" -> keep + small tag "Starter kit inside"
- The Creative Girl: "Paper, paint and thread for quiet evenings" -> keep + "Three starter kits"
- The Sporty Girl: "For golden-hour rallies and Saturday trails" -> keep + "What to look for"
- Girls' Night In: "Host a night everyone talks about after" -> keep + "Mahjong + paint night kits"
- The Bookish Girl: "For one-more-chapter people" -> keep + "What to look for"
- Little Adventures: keep + "What to look for"
- The Journaling Era: keep + "Starter kit inside"
- Cozy After Hours: keep + "What to look for"
(Only show tags that data supports: derive from `hasKit`.)

### 3.2 Collection pages (shared shell)

Current kicker above H1: "SHOP YOUR HOBBY" -> change to the collection's emotional verb, e.g. "Your pottery evening" (see per-page below). Keep "Shop your hobby" in the breadcrumb only.

Current hero disclosure under dek (long): replace with: "Ordinary Amazon links, no prices shown. [Details]"

Current "Who this collection is for" copy (template): "Anyone curious about air-dry clay, craft nights, paint by numbers and pottery painting who wants to start small. No experience is assumed, and being good at it is optional."
New per collection (two lines, specific):
- Pottery Era: "For the girl who wants pottery-class energy on a Tuesday. You'll shape something lumpy, paint it, and keep it. Lumpy is the point."
- Creative Girl: "For quiet evenings with something in your hands: a page to fill, a brush to try, a few stitches while a podcast plays. Starter supplies, small enough to put away after."
- Sporty Girl: "For the girl who wants a standing Saturday rally, not a gym membership. Start with a borrowed racket if you can; buy once you know you're coming back."
- Girls' Night In: "For the group chat that keeps saying 'we should hang out'. Pick a game or a canvas, send one message, and it's on the calendar."
- Bookish Girl: "For one-more-chapter people who want reading to feel like an evening plan. Light, a notebook, a bookmark you love."
- Little Adventures: "For the afternoon you almost said no to. Pack small, carry light, go."
- Journaling Era: "For the girl who keeps every ticket stub. Glue, tape, layer, no wrong way."
- Cozy After Hours: "For the weeknight you actually have: tired, a little hungry, wanting something nice to do with your hands. Low effort, high candle."

Current section H2: "Essentials, upgrades and budget-friendly options" -> New: "What you actually need" (essentials only, max 4), "Pretty extras for later" (max 4), "Already own it? Skip it." Retitle the budget column from "If you would rather not spend" to "Already have it? Skip it."

Current: "Or browse by product type" -> "More ideas, by product type".

Current: "Read before you buy" -> "Read first, then shop".

Current empty banner: "We haven't picked named products for this collection yet. The cards below describe what to look for, and their buttons open an Amazon search so you can compare options yourself."
New: "No named picks here yet: we only name a product once we've read its Amazon page. Until then, here is exactly what to look for. Each button opens an Amazon search so you can compare for yourself."

### 3.3 Per-collection hero lines (current -> proposed)

- Pottery Era: "Everything you need to bring pottery-class energy to your kitchen table, no kiln or wheel required." -> "Pottery-class energy at your kitchen table. No kiln, no wheel, just clay, paint and a few hours of lovably lumpy."
- Creative Girl: "Starter supplies for watercolor, journaling and embroidery: small, affordable and very easy to put away after." -> "Watercolor, a journal, a hoop and thread: starter supplies small enough to put away after. ("Affordable" is a claim without a source; "small" is true.)"
- Sporty Girl: "Beginner-friendly gear for tennis, pickleball and getting outside. You do not need the pro version." -> "Gear for your first rally, game or trail. You don't need the pro version, and you can often borrow or rent first."
- Girls' Night In: "Group activities that turn 'we should hang out' into an actual plan on the calendar." -> "Turn 'we should hang out' into a date in the group chat: a mahjong night or a paint-and-sip table, with exactly what to buy."
- Bookish Girl: "Little upgrades that make reading feel like an event, whether that's in bed, on the train or at a café." -> fine; tighten: "Little upgrades that make reading feel like an event: in bed, on the train or at your favorite café."
- Little Adventures: "Small, portable things that make it easier to say yes to a spontaneous afternoon out." -> keep; it is good.
- Journaling Era: "Notebooks, tape and stickers for junk journals, reading logs and pocket notes. Start with one notebook and whatever scraps you already have." -> "A journal that can take glue, tape you'll love and the scraps already in your bag. Start with one notebook."
- Cozy After Hours: "Small things that make a weeknight at home feel like a plan: better light for reading, a game on the table and something quiet to make." -> "Small things that turn a weeknight at home into a plan: better light, a game on the table, something quiet to make."

Meta descriptions for collection pages currently reuse the intro; that is fine but add the shop job: append " One pick first, with the reason." where a kit exists.

### 3.4 One-pick framing

Current: h4 "If you only buy one thing" (small italic cherry) + the card with kicker "ESSENTIAL".
New: sticker kicker "OUR ONE PICK" (cherry label, rotated slightly like a gingham tag), h4 "If you only buy one thing, buy this", then a one-sentence reason line pulled from `whySelected`, truncated (first sentence), above the benefit line. Example for the journal: "Our one pick: the thick-paged journal, because everything else (glue, tape, scraps) only works on pages that don't buckle."
For kits with more than one essential: "Your one pick: [set]. You'll also need [card], below."

### 3.5 Kit deks and notes (current -> proposed)

| Kit | Current dek | Proposed dek |
|---|---|---|
| junk-journaling | "A journal, something sticky and a pile of paper scraps." | keep (it is good) |
| watercolor | "Paint, a brush or two and paper that won't buckle." | keep; note "Start with the paint, a round brush and heavy paper. The rest can wait." keep |
| air-dry-clay | "No kiln needed: clay, a few tools and paint." | "Shape it tonight, paint it tomorrow. No kiln." |
| embroidery | "Hoop, floss, needles and fabric to practice on." | "A hoop, some thread and a quiet hour. A boxed kit with a tutorial is the easiest start." |
| crochet | "A hook, easy yarn and something to finish." | "A hook, easy yarn and one thing to finish this week." |
| reading-journal | "A notebook and pens for the books that stuck with you." | keep; it is good |
| girls-craft-night | "One easy project that suits a group." | "One easy project, a table, and a group chat that finally has a date." |
| mahjong-night | "A set you can play on and something to play on top of." | "Everything for your first game night: a set, the card, and a mat that quiets the tiles." |
| book-club | "Small things that make the meeting easier." | "Little things that make the meeting feel like a ritual." |
| paint-night | "Canvas, paint and brushes for a table of beginners." | "A canvas each, a table of brushes, and nobody has to be good." |
| picnic-adventure | "A blanket, something to carry and something to sit on." | "A blanket, a bag and an afternoon." |
| flower-arranging | "Snips, a vase and the little things that make stems stay put." | keep |
| pickleball | "Paddles and balls. Rent or borrow first if you'd like to try it." | "Two paddles and a ball: that's the whole starter. Borrow first if you can." |
| tennis | "A racquet and balls. Many courts and clubs rent racquets." | "A racquet, a can of balls and a standing Saturday. Many courts rent racquets, so try one first." |
| cozy-night-in | "Candle-and-blanket energy, nothing you have to buy." | keep (it is the best kit dek) |

Kit disclaimer (current): "A shopping list we put together, not a bundle we sell. Each item links to its own Amazon page."
New (single line, also covers kit and cards): "This is a list we put together, not a bundle we sell. Each item links to its own Amazon page, with no prices shown. Disclosure"
(Removes the second stacked disclosure sentence when `ShopDisclosure` is directly below; merge them in the component.)

### 3.6 Product-card role labels and buttons

| Current | Proposed |
|---|---|
| ESSENTIAL | START WITH THIS |
| OPTIONAL EXTRA | NICE LATER (or PRETTY EXTRA for aesthetic roles, WHEN YOU'RE HOOKED for later-upgrade) |
| YOU MAY OWN IT | CHECK YOUR DRAWER |
| Also consider | Prefer something different? |
| View on Amazon | See it on Amazon |
| Browse options on Amazon | Find [beginner rackets] on Amazon |
| Add all essentials | Add the starters to my list |
| Copy list / Print list | Copy my list / Print my list |
| "0 on your list" | hidden until >= 1 |
| Start with these (h4) | Then add |
| Optional extras (h4) | Pretty extras for later |
| You may already own these (h4) | Check the drawer first |

Keep the ordinary-Amazon clarity: do not use "Buy now" or "Shop now" on any outbound button; "See it on Amazon" keeps the destination and the honesty.

### 3.7 Saved list (/saved)

Current section H2/rows: "Shopping list" / "To buy" / "Saved for later" / "Already own"
New: H2 "My shopping list", groups "To buy", "Maybe later", "Already have it". Each row: name, one-line benefit, [See it on Amazon] button, "Got it" / "Later" toggles.
Empty state add: "Not sure where to start? [Pick a starter kit] [Find your thing] [Make some plans]".

---

## 4. Visual direction

### 4.1 Typographic tiles: how to make them desirable without photos
The goal: make the tile the "label on the jar", not a missing photo. Rights rules stay: no Amazon images, no invented photos of specific products. Ideas that respect them:

1. Show the benefit, not the brand. Tile headline = what she gets ("Glue that holds a page"), brand small beneath. Today's headline ("Stationery Island") is a seller name.
2. Use a result glyph. A small hand-drawn doodle (the site already has Star, Bow in `brand/Doodles`) per category: washi roll, paint pan, hoop, mahjong tile, brush, journal, yarn ball, canvas. 12 simple line doodles, cherry or garden green on the tinted tile, replace the empty middle. One SVG sprite, no maintenance.
3. Per-product color from the product itself where truthful: the washi tile is gingham-pink, the mahjong blue set shows the word "blue tiles" over a blue wash, the blush journal gets blush. Derive from `shortName` colour words in data ("blue", "blush", "walnut", "gray", "white") mapped to the brand palette.
4. Cut the empty height: the 4:3 tile is 400px tall at kit width and mostly blank. Use a 3:2 or 16:9 strip on standard cards and keep 4:3 only for the one-pick. On mobile, shrink the tile to a 64px chip beside the name (image-left card), which removes about 250px of scroll per card.
5. Fix the near-white tile. warm-white on cream (Scotch/adhesive) looks like a bug; remove `bg-warm-white` from TINTS or give it a visible border and a doodle.
6. A ribbon label for the role: a small tag "Our pick" on the pick tile, gingham corner on the essentials, plain for extras. Gives hierarchy without photos.
7. Pair kits with ONE editorial photo (owned/generated, rights recorded) above the kit, as the collection heroes already do (those are excellent). The kit then reads as "this evening" and the tiles read as labels.
8. A numbered "in your kit" flat-lay strip: a row of the doodles from the filled slots, 4 to 6 icons with captions, directly under the kit title. It sells the idea of the kit in one glance.

### 4.2 Layout
- Collection page: hero, then kit/picks immediately, then "who it's for".
- Kit: sticky "Add the starters to my list" button on mobile (bottom bar) with count. One primary action per screen.
- /shop: show 3 featured picks (one per most-complete collection: junk journal, mahjong set, watercolor set, air-dry clay kit) as a "Start here" row above or below the grid, each with tile + benefit + button.
- Mobile /shop: 2-up grid for the collection cards, or a chip row. 6,000px of 8 full-width tiles is a lot of scrolling before a decision.

### 4.3 Images to change or add
- Journaling Era: needs its own hero (currently the Creative Girl photo). Show: an open junk journal on a gingham cloth with a glue stick, floral washi rolls, a cropped paper scrap pile, a Micron pen; warm top-light; butter/strawberry palette. Do not show a specific brand's packaging.
- Cozy After Hours: needs its own hero (currently Bookish Girl). Show: a soft throw, a lit candle, a mug, a half-done jigsaw on a coffee table in lamp light; green/cream palette.
- Optional: a "Gift" tile image: wrapped paper with a gingham ribbon, a small supply set tied in tissue (no brand marks).
- Doodle sprite: 12 category icons (see 4.1).
- Do NOT add: Amazon product photos, star ratings, "bestseller" badges.

---

## 5. Product-card copy template and 10 rewritten examples

### 5.1 Template (character limits match catalog validators: `shortName` 70, `benefit` 140, `compare` 140)

```
LABEL (kicker): START WITH THIS | NICE LATER | PRETTY EXTRA | WHEN YOU'RE HOOKED
NAME (shortName): plain product name, no brand repeated, <= 70 chars
BRAND LINE: shown only if the name does not already contain it
BENEFIT (benefit, <= 140): [what you get / the result] + [one concrete spec that makes it true]
   Formula: "[Result for her], with [specific thing that delivers it]."
   Rules: lead with what she'll do or feel; second clause is the fact; no price, rating, superlative.
WHY WE PICKED IT (whySelected, 1 sentence, optional shown on pick card): "Why: [honest reason]."
HONEST NOTE (one limitation, optional, from `limitations`): "Worth knowing: [limit]."
COMPARE (compare, <= 140): "Prefer [difference]? [Name]: [how it differs]."
BUTTON: See it on Amazon
SAVE: Add to my list (icon + label on pick card)
```
Never: prices, ratings, "best", "top-rated", "limited", "selling fast", "loved by", testimonials, "we tested" (unless a real test is logged).

### 5.2 Ten rewritten examples (benefit lines; only facts in the catalog are used)

1. mr-pen-washi-tape-21-rolls
- Name: "Floral washi tape, 21 rolls"
- Current benefit: "Pastel floral rolls in three widths: enough variety to decorate a whole journal."
- New: "Pastel floral rolls in three widths: enough to decorate a whole journal, and none of it needs scissors." (Washi tears by hand; confirm before using "none of it needs scissors", otherwise use: "...enough to dress every page of a first journal.")
- Label: NICE LATER

2. stationery-island-a5-blank-journal-180-pages (one pick)
- Name: "A5 hardcover journal, 120 gsm"
- Current: "Thick 120 gsm pages in a classic black hardcover, with 180 pages."
- New: "Thick 120 gsm pages that take glue and tape without buckling, in a black hardcover with 180 pages to fill."
- Why: "Why: every other supply on this list only works on pages that hold up."
- Label: START WITH THIS / OUR ONE PICK

3. scotch-glue-stick-photo-safe-4-pack
- Name: "Scotch glue sticks, 4-pack"
- Current: "A familiar stationery-aisle glue stick, four to a pack so there is always a spare."
- New: "A glue stick you'll recognise, four to a pack, so there's always one in the drawer when you're mid-page."
- Compare (tape runner): "Prefer no wait time? Scotch tape runners: rolls on dry tape, but permanent: you can't lift it once placed."

4. paperage-blank-journal-160-pages
- Name: "Blush blank journal, 160 pages"
- Current: "A blush-pink 5.6 x 8 in journal that slips into a bag, with 160 pages to fill."
- New: "A blush-pink journal that slips into a bag, with 160 pages for tickets, notes and half-finished ideas."
- Compare: "Prefer lighter? Smaller bag-size, 100 gsm paper, so glue-heavy pages warp sooner." (keep the honesty.)
- Label: PRETTY EXTRA

5. tiasusan-american-mahjong-set-blue-tiles (one pick, mahjong)
- Name: "American mahjong set, blue tiles" (drop repeated brand; brand line shows TIASUSAN)
- Current: "166 blue tiles with racks, a bag and extras such as dice and a wind indicator."
- New: "Everything for game one: 166 blue tiles, racks, a carry bag and the little extras like dice and a wind indicator."
- Why: "Why: a full American set so you can play tonight. (The 2026 NMJL card is below.)"
- Honest note: "For American mahjong only; other versions use a different tile count."

6. nmjl-2026-large-size-cards-four-pack
- Name: "2026 mahjong card, large print"
- Current: "The official card of hands that American mahjong is played from. This is the 2026 edition."
- New: "The official card of hands your whole table plays from, in large print so nobody squints. This is the 2026 edition."
- Label: START WITH THIS (you can't play without it)
- Maintenance note: the card changes every year; flag edition in the data so the copy can be updated.

7. gustaria-large-mahjong-mat-blue-31-5
- Name: "Mahjong mat with carry bag, 31.5 in"
- Current: "Softens tile clatter and protects the table, then rolls up into its bag."
- New: "Quiets the tile clatter, protects the table, then rolls up into its own bag. Game night with fewer complaints."
- Label: NICE LATER

8. artecho-48-color-watercolor-set-3-brushes (one pick, watercolor)
- Name: "48-color watercolor set"
- Current: "Pan colors, three brushes and a case in one box, ready to paint right away."
- New: "48 pan colors, three brushes and a case in one box. Open it, wet a brush, start."
- Why: "Why: you can paint the minute it arrives; no shopping list needed."
- Honest note: add one from `limitations` if present (e.g. brush quality is basic).

9. uhapeer-air-dry-clay-kit-3-lb (one pick, clay)
- Name: "Air-dry clay kit for adults, 3 lb"
- Current: "Clay, tools, paint and sealer in one box, so a first project needs nothing else."
- New: "Clay, tools, paint and sealer in one box. Shape a trinket dish tonight and paint it tomorrow."
- Honest note (from kit): "Painted pieces aren't food-safe: decor and trinkets only, not mugs."

10. esrich-8x10-stretched-canvas-10-pack (one pick, paint night)
- Name: "8 x 10 canvases, 10-pack"
- Current: "Ten primed canvases: one per guest and a few spare."
- New: "Ten primed canvases: one for every guest and a few spare for the 'let me try again'."
- Compare (5-pack): "Smaller table? The 5-pack: the same canvases for four guests or fewer."

Bonus (type-level card, e.g. Beginner tennis racket)
- Current: title "Beginner tennis racket"; blurb "A lighter, larger-head racket forgives off-center hits while you learn."; look for "Labeled 'beginner' or 'recreational', pre-strung, with a larger head size."; button "Browse options on Amazon".
- New: title "Your first tennis racket"; blurb "A lighter, larger-head racket forgives off-center hits while you're learning."; "Look for: 'beginner' or 'recreational' on the label, pre-strung, larger head."; extra honest line "Many courts and clubs rent rackets: try one before you buy."; button "Find beginner rackets on Amazon".

---

## 6. Price-less framing: ways to convey value honestly

The site has a rule against showing prices and must stay that way, but she still needs a sense of "how much commitment is this". Honest levers already available:

1. Role and sequence as value ("Start with this", "Nice later", "Check your drawer first"): tells her how much of the list she needs to buy this week.
2. Count of what's needed: "2 things to start, 4 extras for later." Derived from `slots` needs; no source problems.
3. Banded startup range from the site's own `equipment.ts` / Hobby Starter Budget (hobby page already shows "START FOR ABOUT $0 to $70, Approximate, not a price. Assumes a basic tile set. Used sets may cost less..."). Surfacing that band on kits ("Most people start for about $0 to $20 (our estimate)") is an honest source the site already owns. Flag to the owner: this puts numbers on shop pages; if the no-prices rule is meant strictly as "no product prices", a banded estimate with the assumptions note is consistent with the hobby page; if not, use labels only ("Under a cup of coffee a week" is invented: do not).
4. Value words that are checkable from specs: "4 to a pack", "21 rolls", "10 canvases, one per guest", "racks and bag included", "boxed kit includes a tutorial". These are quantity cues and replace price without implying it.
5. "Borrow, rent or already own" lines (kits already have them: "Many courts and clubs rent racquets"): honest and the best conversion-through-trust move.
6. "Goes with" cross-sell: "Pairs with: glue stick, washi tape" instead of a bundle price.
7. Complete-kit vs build-your-own contrast: "A boxed kit (everything in one) or build your own (more choice)". Do not claim one is cheaper.
Do NOT use "affordable", "budget" or "cheap" as unqualified claims on named products: catalog roles include "affordable" but there is no price source; the word `affordable` currently appears in kit slot metadata and could leak into copy. Replace with "starter-friendly" or a spec quantity.

---

## 7. Gift angle, cross-sell and the journey

### Gift
No gift framing exists on the shop. The data supports it honestly: kits with a boxed or complete role (air-dry clay kit, embroidery learning kit, watercolor set with case, mahjong sets with bag) are naturally giftable. Add:
- /shop gift row: "Give someone a first evening": "A kit she can open and start tonight: air-dry clay, embroidery, watercolor, mahjong night." Links to the pick card, not a new product type.
- Copy line on complete-kit cards: "Good for gifting: everything is in the box." (only where the catalog role is `complete-kit`.)
- Do not invent "perfect gift" claims for loose items; no urgency or holiday-countdown language.
- Seasonal: it is November 2026; the site already has a SeasonStrip on home, so a "gift a first evening" shop section is timely without any scarcity claims.

### Cross-sell
- After a one-pick, "Goes with this": link to the next slot ("Next: glue or tape").
- From the card to its hobby guide: "How to do your first session" (hobby page link already exists in collection, not in the card).
- From an article's StarterKit to its collection ("More in Journaling Era" exists in ShopTheArticle; StarterKit does not link back).
- Girls' Night In: pair mahjong night + paint night: "Same group, second night."
- Partial kits should ask for the next missing slot: crochet has only yarn, so say "Hook next: look for a 5 to 6 mm" (kit note already says this) and link to the type-level search.

### The journey ("Shop your hobby")
Today: article/hobby page -> "Shop the kit" -> block with pick -> Amazon. Good. Gaps:
1. From /shop, there is no path that starts from desire ("Find your thing" quiz -> kit). Add a quiz result CTA that lands on the matching kit, and link /shop to the quiz.
2. The list (save) has no "buy" step and no memory of what was bought beyond statuses; give the list its own buy buttons.
3. The word "Shop" appears in nav as "Shop Your Hobby" with a bag icon; the first-time visitor does not know that means "buy supplies" vs "shop for hobbies". The first screen should say "supplies for your first evening".
4. Primary action per page: /shop = pick a collection (or the quiz); collection = "See the picks"/"Add the starters"; list = "See it on Amazon".

---

## 8. Quick wins (under one hour each)

1. Change the 8 role labels and h4 headings per section 3.6 (copy only, in ProductCard.tsx, StarterKit.tsx, ShopSections.tsx, ShopMyHobby.tsx).
2. Change "View on Amazon" -> "See it on Amazon" and "Browse options on Amazon" -> "Find [type] on Amazon" (affiliate.ts `productLinkLabel`; add the product-type noun for type cards).
3. Replace /shop hero H1/dek/meta per 3.1.
4. Shorten the collection hero disclosure to one line (AffiliateNote variant) and keep the full text under the product block.
5. Remove the Scotch/warm-white tile tint and the empty-state banner wording (3.2).
6. Hide "0 on your list" until >= 1.
7. Hide the brand line when the name already begins with the brand (ProductCard).
8. Rewrite 8 kit deks (3.5 table).
9. Rewrite benefit lines for the 10 examples (data change in catalog source CSV; remember catalog.generated.ts is generated, edit the CSV and re-import).
10. Add Find Your Thing link and sub-line under the /shop collections heading.
11. Fix duplicate "Optional upgrades" noise: dedupe lists in collection-guide.ts and cap to 4.
12. Rename "Or browse by product type" and "Read before you buy" (3.2).
13. /saved: rename headings, add "See it on Amazon" button to saved shopping rows, add "Pick a starter kit" to empty state.

## 9. Bigger moves

1. Reorder collection pages: kit/picks directly under hero; drop the auto-generated "Essentials / Upgrades / Budget" trio for collections that have a kit. Biggest conversion lever.
2. Build the doodle sprite + redesigned tile (benefit headline, category doodle, brand small, ribbon label, shorter aspect, image-left on mobile).
3. Fill the four empty collections (Sporty, Bookish, Little Adventures, Cozy) and the eight empty or partial kits (pickleball, tennis, reading journal, picnic, book club, flower arranging, girls' craft night, cozy night in, crochet hook): until then, ship them as honest "what to look for" pages without the word kit. Product research follows the existing process in docs/commerce.
4. Two new collection hero images (Journaling Era, Cozy After Hours).
5. Gift row and "gift kit" flags driven by `complete-kit` role.
6. "Start here" row on /shop: the four most complete picks.
7. Surface honest cost bands on kits from `equipment.ts`.
8. Saved list as a shopping page: tile, benefit, button, status, Share-to-chat.
9. Quiz -> kit handoff (result card includes the kit).
10. A kit-completeness rule in code: minimum 3 filled slots including one essential, else render as "Where to start" pick.

---

## 10. Cross-page consistency issues

| Issue | Where | Fix |
|---|---|---|
| "Shop your hobby" is kicker, H1, nav label, block title ("Shop your mahjong kit") and button context | /shop, collection hero kicker, ShopMyHobby, ShopTheArticle ("SHOP YOUR HOBBY / Shop this guide") | Use it as the section name in nav and breadcrumbs only; give each block its own outcome headline |
| Three different block names for the same job: "Shop this guide", "Shop your [hobby] kit", "Starter kit" | Article / hobby / collection | One pattern: "[Hobby] starter kit" everywhere a kit exists, "Shop this guide" only where there is no kit |
| Role words: Essential / Optional extra / You may own it / Start with these / Optional extras | Card vs section headings | One vocabulary (3.6) |
| Button: "View on Amazon", "Browse options on Amazon", "Disclosure", plus "Shop the kit down arrow" on hobby page | Cards, hobby page | Single verb family: "See it on Amazon", "Find ... on Amazon" |
| Gendered brand names: "The Creative Girl", "The Sporty Girl", "The Bookish Girl" vs "Girls' Night In", "Girls' craft night kit" (kit) vs "Craft Nights" (hobby) | Collections vs kits | Fine in moderation per brand rules; make the kit name match the hobby name ("Craft night kit") and keep "girls'" for the collection |
| Mixed tense and person: collection intro "Anyone curious about...", dek "For golden-hour rallies...", hobby page "You'll love it", cards neutral | Collection pages | Second person, present tense, one voice |
| "No spend" language varies: "If you would rather not spend", "No-spend swap", "Borrow, swap or use what is already at home", "Check your drawer" | Collection, card, kit | "Already have it? Skip it." for the column; "No-spend swap" keep for the card (it is good) |
| Names of the saved list: My Plans, Penciled in., Shopping list, My shopping list, Shop picks | Nav, /saved, card tooltips | "My list" for shopping, "My Plans" for the page |
| Cost wording: "To start: Under $50 to start." (double "start") on collection hobby lists | Collection page ("To start: Under $50 to start.") | Fix the template: "To start: under $50." |
| Dek period handling: collection dek reused as a stranded sentence ("For golden-hour rallies and Saturday trails.") | Collection "Who this collection is for" | Remove the repeat |
| Disclosure repeated up to three times in one scroll | Collection page | One at hero (short), one under products (full) |
| Brand shown 2 to 3 times per card (tile, name, brand line) | ProductCard | Show once |
| "Photo: illustrative styling, not specific products" only on collection hero | Collection | Good; add the same line wherever a lifestyle image sits above a kit, to avoid implying a pictured product is the pick |
| Year-bound facts: kit note says "The league card changes every year, and the 2026 card is the current one." | Mahjong kit note, catalog | Put the edition in data and add to the annual freshness check (the card turns over each spring). |

---

## 11. Five-line summary: top 5 changes

1. Reorder collection pages so the starter kit and its "one pick" appear directly under the hero, and replace the auto-generated Essentials/Upgrades trio and the apologetic empty banner with confident, short copy.
2. Redesign the typographic tiles (benefit headline instead of brand name, category doodle, ribbon "Our one pick", shorter on mobile) and fix the near-white and repeated images; add two new heroes for Journaling Era and Cozy After Hours.
3. Rewrite /shop and the collection heroes to lead with the evening she wants and one first step (new H1/dek/meta in section 3.1), compress disclosure to one short line above and one full line under products.
4. Replace weak labels and buttons ("Optional extra", "View on Amazon", "Browse options") with desire-led, still-honest ones ("Nice later", "See it on Amazon", "Find beginner rackets on Amazon") and rewrite benefit lines to result-first (ten examples in section 5).
5. Make the saved shopping list and kits actually sell: buy buttons and benefit lines on /saved, hide or retitle kits with fewer than 3 filled slots, and add a gift row built from complete-kit products; fill the four empty collections next.
