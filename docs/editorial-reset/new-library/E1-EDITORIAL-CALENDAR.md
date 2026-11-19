# E1. Editorial calendar: what I would commission if Plans Past Five launched today

Prepared 2026-11-19 by the founding editor-in-chief. Proposal for owner approval. Nothing here is implemented, committed or published. Written fresh from the brief, the audits and live search; no old article body, outline, headline, product pick or format was used as a foundation. Companion file: `E1-ARTICLE-INVENTORY.csv` (the same 30 articles, one row each, with all 11 scores).

---

## 0. Decision in one page

**Commission 30 articles in three tiers, and stop there until Search Console exists.**

| Tier | Count | When | What it proves |
|---|---|---|---|
| **1. Launch library** | 12 | first, after the four pilots are approved | the brand (after five, a life not a living), three shippable collections, the mahjong and paint-night hosting story, the quiz and planner funnel, one gift guide |
| **2. Growth** | 10 | roughly weeks 6 to 14 | Sporty and Little Adventures once their products are verified; the remaining signature experiences (embroidery, crochet, flowers, picnic, pickleball) |
| **3. Later** | 8 | after launch data is in | tennis, puzzles, letters, the reading journal, craft night, and the discovery pillars that are weak on search and should earn their place |

Why 30 and not 28 or 12: every one of the twelve signature experiences needs at least one anchor piece (12); every one of the six collections needs a flagship and a route to its products (already satisfied by the same pieces); the site needs five or six discovery pillars to feed the quiz and Make Plans; and a few specialist pieces fill known gaps. I tried to cut to 28 and could not cut a piece without leaving an experience or a collection uncovered. 30 is the smallest set that covers everything; 12 is the smallest set that makes a coherent launch. **If the owner wants less, ship Tier 1 only and treat everything else as optional.** Do not go past 30 without data.

Roles: **18 commercial flagships** (anchors for the 12 experiences plus collection-level shopping edits, a gift guide and a decision guide), **6 traffic or discovery pillars**, **6 supporting specialists**. (Counts in section 3.)

**Original topics:** most survive, because the twelve signature experiences are the strongest brand-fit topics regardless of who wrote them first, and many old titles matched real query phrases. But they come back in new formats, and 15 of the 34 old slugs go away (14 redirect, 1 unpublished draft is retired); 19 old slugs survive but every body is rebuilt (section 10). I list explicitly the old topics I would not keep and why (section 12).

**Honest weak points** (so the owner can overrule me):
1. Search demand is **UNMEASURED** everywhere. I had a web search tool, no keyword-volume tool and no Pinterest account. Every search and Pinterest judgement below is a reading of what ranks and a judgement about it, not a forecast.
2. Four pieces (A12 girls' night hub, A22 find a hobby, A28 weekend plans, A30 creative Saturday) are mostly Pinterest, hub and quiz pieces. They have weak search potential and I say so.
3. Cozy, Sporty and Little Adventures have **zero verified products today** (A2). Their flagships are gated on product verification. I would rather publish fewer than publish thin collections.
4. The photography burden is real. About half the pieces need styled original photography; section 3 lists which.

---

## 1. How I worked and what I could not measure

**Read in the repo:** `docs/editorial-reset/PLAN.md` (sections 00 and 0, 2b), audits A1 (customer/navigation) and A2 (commercial data), `src/routes` (make-plans, hobby-finder, hobbies directory), `src/data/categories.ts`, `kits.ts`, hobby seed data, the old URL map (`ORIGINAL-ARTICLE-URL-MAP.csv`), the `sources` arrays of the 34 live article JSON files (for which source domains exist; **not** the bodies), `docs/marketing/PINTEREST-STRATEGY.md`, `docs/content/EDITORIAL-STRATEGY.md`, `docs/BRAND-GUIDE.md`, the pilot clay intent brief. I also saw `E2` and `E3` in this folder; this calendar is consistent with their brief (formats must vary, E3's voice).

Note: the backup README says the original bodies were deleted by owner instruction (recoverable from git history only), which suits this task. The 34 article files in `content/articles/` still exist as live pages; I read only their `sources` metadata.

**Searches run (about 37, US-only web search, 2026-11-19, plus one page fetch of the Pinterest newsroom).** Queries covered: junk journaling, mahjong hosting and sets, watercolor, embroidery and kits, crochet, pickleball (gear, etiquette, paddles), tennis (gear, outfits), paint and sip, craft nights, girls' night in, flower arranging, picnics (ideas, blankets), cozy reading nook, reading habits, book clubs, jigsaw puzzles, gift guides for crafty women and for a new hobby, hobbies for women in their 30s, cozy nights in, after-work alternatives to scrolling, pen pals and letters, making friends through hobbies, cycling for adult beginners, weekend and solo day trips, rainy-day plans, air-dry clay projects, and Pinterest SEO and Pinterest Predicts 2026 (the last also fetched from the Pinterest newsroom).

**Limits you should know:**
- The search tool returns titles, URLs and a short generated summary. I did not open every page. Statements like "page one is mostly brand blogs" come from titles and snippets; they are judgements about SERP composition, not rank-tracked facts. The results are not personalised, geo-specific or time-stamped to a rank check.
- **No search volumes, trends, traffic, CTR or Pinterest metrics were available. All are UNMEASURED.** Where the CSV says "Volume: UNMEASURED" it means exactly that. Pinterest Predicts figures are Pinterest's own, from Sept 2024 to Aug 2025, and only one trend (Pen Pals) touches this site.
- Two things worth a manual check by Cowork before commissioning each Tier 1 piece: the actual page-one SERP for the primary phrase (with logged-out Google), and Pinterest search suggestions for the same phrase.

---

## 2. What the market showed

### 2.1 SERP read by cluster

| Cluster (queries) | Who appears (as seen) | Winning formats | Thin or weak spots | Implication |
|---|---|---|---|---|
| Junk journaling (supplies, how to start) | Stampin' Up and other craft-brand blogs, Book Riot, Apartment Therapy, Michaels class, Benable lists, 101planners, Salvaged Living | text supply lists, 'what is it' explainers | no single-pick-per-job visual edit; few give one finished spread | Two pieces: a supplies edit (commercial) and a first-spread tutorial (informational) |
| Air-dry clay (beginners, trinket dishes) | potclays, Skillshare, Art of Education, Bob Vila, Mont Marte, Crayola, First Day of Home, DIYJoy, Hometalk | technique primer plus 10 to 30 idea lists | few give three ordered projects with drying timing | Project tutorial |
| Watercolor supplies | Skillshare, Opus, Little Coffee Fox, Art Is Fun, Altenew, Artchive | one core list (paint, brush, paper, palette) | crowded; teaching brands own it | Compete on a smaller, portable kit and finished paintings |
| Embroidery | practicalembroidery.eu, LoveCrafts, Bob Vila, Gathered; kit roundups on rolling-date lookalike domains | stitch basics, 'finish a hoop' | kit lists are low-trust; one source noted kits arriving short of needles | Project tutorial with an honest kit check |
| Crochet | LoveCrafts, Gathered, Skillshare, Hobbycraft | single crochet, dishcloth or coaster, granny square | plenty of how-to; weak on restrained kit | Four-week ladder |
| Mahjong hosting and sets | Oh My Mahjong, Anders Ruff, Lucky Mahj, Cedar & Rush, Chatbooks (brand-owned); BestReviews and many rolling-date lookalike domains for 'best sets'; Apartment Therapy 'prettiest sets'; NBC regional stories on popularity | brand hosting guides (decor-heavy); affiliate roundups | little neutral host-first gameplay guidance; set roundups look low-trust; one source says the ruleset must be named first | Two pieces: hosting itinerary and a decision guide on sets |
| Paint and sip, craft night | Muse Paintbar, Painting with a Twist, Pott'd, Yahoo, Lulus, Stampin' Up, Sculpey, Officeworks, ThisMonth'sCraft | venue-brand promotion, generic lists | no honest run of show with allergy and safety notes | Hosting itinerary + project menu |
| Girls' night in | StyleCraze, SignUpGenius, Her Campus, SheKnows, Thortful, Cozymeal | generic 20 to 45 item lists | no complete evenings with shopping lists | Hub of six complete evenings |
| Picnics | The Knot, Cozymeal, Food Network, Homes & Gardens, Apartment Therapy, Zoe Report, Greenvelope; blanket reviews on BestReviews, Rolling Stone, HGTV | themes, aesthetics, blanket and basket lists | food-safety sourcing not central | Itinerary with a sourced safety layer (FDA, CDC, USDA FSIS, FARE) |
| Pickleball and tennis | TIME, Money, Livestrong, Pickleball Central, JustPaddles, Pickleheads; Nike, Vuori, Under Armour; USTA, Wilson, tennis.com, LTA | paddle shootouts, brand outfit guides | authority and testing; we cannot test | Beginner-experience framing and honesty about renting; no paddle rankings |
| Cozy reading and nights in | Wayfair, Joss & Main, Macy's, Raymour & Flanigan (furniture); Woman & Home, Pottery Barn, Her Campus, Bustle | furniture-led nook galleries; essentials lists | the 'small objects, no furniture' angle | Reading nook edit; cozy-evening itinerary |
| Puzzles | NBC Select, Ravensburger, Stylist, My Modern Met, AOL, Today, Uncommon Goods | editorial roundups with real publisher weight | puzzle-night setup | Tier 3; not a top search bet |
| Flower arranging | NPR, AOL, Domino, Food52, Hometalk, Happier Homemaker, Well+Good | one repeated method | saturated | Image-led recipe cards, small commerce |
| Hobbies for women, hobbies after work | Woman & Home, Mindbodygreen, Dear Media, StyleCraze, Greater Good, The Muse, The Every Girl | generic lists, habit advice | no organising logic (energy, money, company) | Decision-guide pillars |
| Gift guides | AOL, Cheapism, Brit+Co, Fox, Hobbycraft, BuzzFeed, Bob Vila | loose product lists | goods drift and go stale | Boxes by experience |
| Pen pals and letters | Archer & Olive, Wonder Pens, NPR, Stamps Forever, My Modern Met | how-to with kit | shop-blog led | A small experiment |
| Cycling for adult women | Le Col, Woman & Home, Cycling Weekly, Stylist, Rouvy, Livestrong | brand and magazine authority | helmet and kit authority is theirs | Do not publish standalone; fold into the movement pillar |
| Make friends through hobbies | Cleveland Clinic, Psychology Today, UHC, Calm, Bumble | health and psychology | health claims out of scope | Do not publish |

### 2.2 Patterns that matter

1. **Brand-owned content outranks neutral editorial in hosting and craft topics** (Oh My Mahjong, Muse Paintbar, Stampin' Up, Sculpey). A neutral, host-first, honest guide is a real differentiator, and the brand-owned guides themselves confirm what readers need (the tool-card, the run-of-show, the allergy note).
2. **Many 'best X' roundups sit on unfamiliar domains with rolling month-and-year titles** (for mahjong sets, embroidery kits, picnic blankets). I read this as a sign of low-trust competition: an honest, well-built decision guide can compete. It is not proof that they rank well.
3. **Big publishers and big retailers own the head terms** (hobbies for women, pickleball paddles, reading nooks, craft kits). We should plan to win long-tail, specific and experience-led queries first.
4. **What the winners share** (formats that recur on page one): step-by-step project pages with a finished object, one short ordered supply list, a timeline, an 'avoid this mistake' list, and a first-hand-looking photograph. **What is thin:** complete evenings with a run of show; single-pick-per-job visual edits; honest 'when not to buy a kit'; sourced safety (food, art materials, candles) inside beautiful layouts.
5. **Product-tied content is widely affiliate-supported** (the search summaries repeatedly note it). Trust is therefore a differentiator: one pick per job, no 'best' claims, honest 'skip this' lines, no pretend testing.

### 2.3 Pinterest: what I can and cannot say

- **I cannot measure Pinterest.** No Pinterest account is confirmed in the repo (`site.social.pinterest` is empty), I had no Pinterest Trends access, and the web search tool returned no Pinterest pages. Everything on Pinterest appeal in this document is **UNMEASURED judgement**.
- **What is documented:** Pinterest Predicts 2026 lists 21 trends; its own figures include Pen Pals (cute stamps up 105%, penpal ideas up 90%, snail mail gifts up 110%, handwritten letters up 45%; Sept 2024 to Aug 2025). It does not list crafts, hobbies, picnics, reading, clay, embroidery or crochet as trends. So the Pinterest case for the signature experiences rests on the format, not on a published trend.
- **Vendor guidance (Tailwind and similar; vendor claims, not Pinterest documentation):** pins one to two years old still collect the most saves; fresh pin images for existing URLs beat re-saving old ones; vertical 2:3 images; lists, checklists, tutorials, step-by-step visuals and aspirational imagery are the common save formats; seasonal content is advised 30 to 60 days ahead. I found no independent study comparing saves with blog traffic.
- **What kinds of assets I expect to travel on Pinterest in this space (assumption, UNMEASURED):** (a) flat lays with numbered contents ('what's in the bag', 'the corner in five objects'); (b) step-by-step process sequences (junk journal spread, clay dish); (c) 'recipe cards' (flowers, evening plans); (d) invitation or menu cards (girls' night, paint night); (e) comparison tables (sets, kits); (f) before/after (a corner, a bouquet). Every Tier 1 and 2 article below carries at least one of these on purpose.
- **Pinterest-first pieces** (high pin potential, weak search): A12, A13, A19, A21, A24, A30.

---

## 3. Editorial strategy

### 3.1 The three roles

| Role | Job | Count | IDs |
|---|---|---|---|
| **Commercial flagship** | the place a reader decides what to buy, tied to one of six collections and one or more of the twelve experiences | 18 | A01, A03, A04, A05, A06, A07, A08, A11, A13, A14, A15, A16, A17, A18, A19, A20, A21, A23 |
| **Traffic / discovery pillar** | feeds the quiz, Make Plans and the directory; routes into the flagships; few or no named products | 6 | A09, A10, A12, A22, A28, A29 |
| **Supporting specialist** | fills a known gap or deepens a flagship; light on commerce | 6 | A02, A24, A25, A26, A27, A30 |

(The role label in each card is the authority; where I mix roles, e.g. A11 gift guide, the card says so.)

### 3.2 Format variety (formats must vary)

| Format | Articles |
|---|---|
| Curated shopping edit (visual, one pick per job) | A01, A08, A13, A15, A26 |
| Project tutorial (process photography) | A02, A03, A17, A24 |
| Beginner guide or plan | A04, A14, A18, A23 |
| Complete experience itinerary (timeline) | A05, A07, A16, A21, A30 |
| Hosting hub / project menu | A12, A25 |
| Decision guide with comparison table | A06, A20 |
| Gift guide (build-a-box) | A11 |
| Visual recipe-card how-to | A19 |
| Discovery pillar / mood menu / decision matrix | A09, A10, A28, A29 |
| Lifestyle feature or method essay | A22, A27 |

Ten formats across 30 pieces, so no two neighbours in the Journal should look or read the same. Layout needs are in E2 (this calendar tells E2 which block types the commissioned formats need: step-with-photo, timeline, comparison table, product-with-reason, gallery).

### 3.3 Maintenance model (low maintenance by design)

- **Product slots per role:** flagship at most 7 named products; specialist at most 3 and only by reference to a flagship; pillars none inline. The entire inventory is built to need roughly **40 to 50 distinct catalogue products** (estimate; the plan's own ceiling is about 48), all in the single catalogue so a swap updates every page.
- **No price text, no deals, no year in a slug or title, no 'best' claims** (the plan forbids unsupported 'best'; we have not tested anything).
- **Highest upkeep (watch these):** A06 mahjong sets (stock and annual card), A11 gifts (annual refresh, about an hour in October), A15 apparel (churn), A14 paddle picks (churn). Everything else is low to medium.
- **Maintenance time is UNMEASURED.** The plan's 3 to 5 hours per month target should be tested by walking real workflows once Tier 1 exists.

### 3.4 Photography burden (be honest about it)

Product images from Amazon cannot be stored (plan constraint). The calendar therefore leans on **original editorial photography** and on Cowork's licensed-imagery report. Burden by piece (from the cards): **high** A02, A05, A06, A07, A11, A14, A16, A23, A24, A25; **medium** most others; **low** A22, A27 (low-medium). If the owner cannot shoot, the right Tier 1 cut is the lower-burden pieces first: A01, A03, A04, A08, A09, A10, A12.

### 3.5 Scoring method

Eleven criteria, 1 to 5: audience desirability, brand alignment, organic search opportunity, Pinterest marketability, commercial potential, product research feasibility, emotional appeal, visual storytelling, customer usefulness, evergreen value, low maintenance (legend in the appendix). Equal weights, because the weights that matter (desirability first) are already reflected by the number of desirability-adjacent criteria. These are **editorial judgements**; none is a measurement and none should ever be shown to readers or labelled as a rating. Tier assignment adds a **research-readiness** test (how many verified products exist today per collection, from A2) and a **funnel** test (does the piece feed the quiz, Make Plans or the directory?).

---

## 5. The inventory at a glance

Sorted by tier, then ID. Scores are my editorial judgement on a 1 to 5 scale per criterion (11 criteria, maximum 55). They are not measurements and must never be shown to readers. Full per-criterion scores are in the CSV and in each card.

| ID | Tier / pri | Working title | Role | Format | Collection | Experience | Score /55 |
|---|---|---|---|---|---|---|---|
| A01 | T1 P1 | Junk Journaling Supplies for Beginners: The Small, Pretty Starter Edit | Commercial flagship | Curated shopping edit | The Paper Edit | Junk Journaling | 47 |
| A02 | T1 P2 | How to Start Junk Journaling: Your First Spread, in One Evening | Supporting specialist (project tutorial) | Project tutorial | The Paper Edit | Junk Journaling | 45 |
| A03 | T1 P1 | Air-Dry Clay for Beginners: Three Little Things to Make This Week | Commercial flagship | Project tutorial | The Creative Edit | Air-Dry Clay | 47 |
| A04 | T1 P2 | Watercolor for Beginners: The Small Kit and Three Paintings to Start | Commercial flagship | Beginner guide with a pocket-kit shopping edit | The Creative Edit | Watercolor | 45 |
| A05 | T1 P1 | How to Host a Mahjong Night: The Table, the Snacks and the First Game | Commercial flagship | Complete experience itinerary | The Hosting Edit | Mahjong | 48 |
| A06 | T1 P1 | Mahjong Sets for Beginners: How to Choose One You'll Love Looking At | Commercial flagship (decision guide / buying edit) | Decision guide with a short curated edit and a comparison table | The Hosting Edit | Mahjong | 41 |
| A07 | T1 P1 | How to Host a Paint Night at Home (No Talent Required): The Whole Evening, Planned | Commercial flagship | Complete experience itinerary | The Hosting Edit | Craft and Paint Nights | 48 |
| A08 | T1 P1 | How to Make a Cozy Reading Nook Without Buying Furniture | Commercial flagship (Cozy Edit anchor) | Curated shopping edit with a lifestyle layout | The Cozy Edit | Reading | 47 |
| A09 | T1 P1 | Hobbies for Busy Women: Pick One by Your Energy, Your Budget and Your Evening | Traffic / discovery pillar | Discovery pillar built as a decision guide | All six | All twelve signature experiences | 41 |
| A10 | T1 P1 | Things to Do After Work Instead of Scrolling: By How Much Energy You Have | Traffic / discovery pillar (brand-defining) | Lifestyle feature + menu | Cozy / Creative / Paper | Reading, Junk Journaling, Watercolor, Crochet, Embroidery, Puzzles | 46 |
| A11 | T1 P2 | Gifts for Women Who Want a New Hobby: Ready-to-Wrap Boxes, by Experience | Commercial flagship (gift guide) | Gift guide built as 'build-a-box' recipes | All six | Cross-experience: junk journaling, clay, watercolor, mahjong, reading, picnicking and more | 46 |
| A12 | T1 P2 | Girls' Night In Ideas: Six Evenings, Each With a Plan and a Shopping List | Traffic / discovery pillar (Hosting hub) | Hosting hub: six short complete-evening menus | The Hosting Edit | Mahjong | 49 |
| A13 | T2 P1 | What to Pack for a Day Out: The Little Adventures Bag | Commercial flagship (Little Adventures anchor) | Curated shopping edit as a flat-lay lifestyle feature | The Little Adventures Edit | Picnicking (and every outing: market, museum, park, thrift) | 44 |
| A14 | T2 P1 | Pickleball for Beginners: Your First Game, What to Wear and What to Say | Commercial flagship | Beginner experience guide | The Sporty Edit | Pickleball | 41 |
| A15 | T2 P2 | What to Wear and Bring to Tennis or Pickleball: The Court Bag Edit | Commercial flagship (Sporty Edit style piece) | Curated shopping edit, style-led | The Sporty Edit | Pickleball | 40 |
| A16 | T2 P1 | How to Plan a Picnic: What to Pack, What to Eat Safely and How to Make It Look Like That | Commercial flagship | Complete experience itinerary | The Little Adventures Edit | Picnicking | 50 |
| A17 | T2 P2 | Embroidery for Beginners: Your First Hoop in One Evening | Commercial flagship | Project tutorial with a 'kit or build-your-own' decision box | The Creative Edit | Embroidery | 42 |
| A18 | T2 P2 | How to Crochet for Beginners: Hook, Yarn and a First Project You'll Finish | Commercial flagship | Beginner guide as a four-week starter path | The Creative Edit | Crochet | 42 |
| A19 | T2 P2 | Flower Arranging for Beginners: Make Grocery-Store Flowers Look Like a Florist's | Commercial flagship (visual how-to; low product dependency) | Visual how-to with 'recipe cards' | The Creative Edit | Flower Arranging | 46 |
| A20 | T2 P2 | Are Craft Kits Worth It? Which Hobbies to Buy as a Kit and Which to Build Yourself | Commercial flagship (Creative hub; decision guide) | Comparison / decision guide | The Creative Edit | Crochet | 38 |
| A21 | T2 P2 | A Cozy Solo Date at Home: One Evening, Planned | Commercial flagship (Cozy itinerary) | Complete experience itinerary | The Cozy Edit | Reading | 46 |
| A22 | T2 P2 | How to Find a Hobby as an Adult (When You Think You Have No Interests) | Traffic / discovery pillar | Lifestyle feature / method essay with a seven-day experiment, ending in the quiz | All six | All twelve | 40 |
| A23 | T3 P2 | How to Start Playing Tennis as an Adult: Your First Four Weeks | Commercial flagship (Tennis experience) | Beginner plan | The Sporty Edit | Tennis | 36 |
| A24 | T3 P2 | How to Start a Reading Journal: Spreads, Pages and Prompts You'll Keep Up | Supporting specialist (project tutorial) | Project tutorial / spread gallery | The Paper Edit | Reading | 44 |
| A25 | T3 P2 | How to Host a Craft Night: Six Projects That Work for Every Skill Level | Supporting specialist (hosting project menu) | Hosting project menu | The Hosting Edit | Craft and Paint Nights | 45 |
| A26 | T3 P2 | Jigsaw Puzzles for Adults: How to Choose One and Set Up a Puzzle Night | Supporting specialist (Cozy edit) | Curated shopping edit with a set-up how-to | The Cozy Edit | Reading/relaxing (puzzles are a discovery hobby, not a signature) | 42 |
| A27 | T3 P3 | How to Start Writing Letters: A Pen Pal Starter Kit | Supporting specialist (trend-adjacent experiment) | Lifestyle feature with a starter kit | The Paper Edit | Junk Journaling (adjacent) | 41 |
| A28 | T3 P2 | Weekend Plans That Aren't Brunch: Twenty-Four Ideas by Mood | Traffic / discovery pillar | Discovery pillar as a mood menu with a solo / friends toggle | The Little Adventures Edit | Picnicking | 39 |
| A29 | T3 P3 | Active Hobbies for Women Who Don't Love the Gym | Traffic / discovery pillar (Sporty hub) | Discovery pillar | The Sporty Edit | Pickleball | 39 |
| A30 | T3 P2 | An At-Home Creative Saturday: Clay, Paint and a Journal Spread, Hour by Hour | Supporting specialist (experience itinerary) | Complete experience itinerary | The Creative Edit | Air-Dry Clay | 44 |

### Ranking by score (judgement, not measurement)

| Rank | ID | Title | /55 | Note |
|---|---|---|---|---|
| 1 | A16 | How to Plan a Picnic: What to Pack, What to Eat Safely and How to Make It Look Like That | 50 |  |
| 2 | A12 | Girls' Night In Ideas: Six Evenings, Each With a Plan and a Shopping List | 49 |  |
| 3 | A05 | How to Host a Mahjong Night: The Table, the Snacks and the First Game | 48 |  |
| 4 | A07 | How to Host a Paint Night at Home (No Talent Required): The Whole Evening, Planned | 48 |  |
| 5 | A01 | Junk Journaling Supplies for Beginners: The Small, Pretty Starter Edit | 47 |  |
| 6 | A03 | Air-Dry Clay for Beginners: Three Little Things to Make This Week | 47 |  |
| 7 | A08 | How to Make a Cozy Reading Nook Without Buying Furniture | 47 |  |
| 8 | A10 | Things to Do After Work Instead of Scrolling: By How Much Energy You Have | 46 |  |
| 9 | A11 | Gifts for Women Who Want a New Hobby: Ready-to-Wrap Boxes, by Experience | 46 | high upkeep. |
| 10 | A19 | Flower Arranging for Beginners: Make Grocery-Store Flowers Look Like a Florist's | 46 | weak search; Pinterest/hub value. funnel piece, low direct commerce. |
| 11 | A21 | A Cozy Solo Date at Home: One Evening, Planned | 46 | weak search; Pinterest/hub value. |
| 12 | A02 | How to Start Junk Journaling: Your First Spread, in One Evening | 45 | funnel piece, low direct commerce. |
| 13 | A04 | Watercolor for Beginners: The Small Kit and Three Paintings to Start | 45 |  |
| 14 | A25 | How to Host a Craft Night: Six Projects That Work for Every Skill Level | 45 |  |
| 15 | A13 | What to Pack for a Day Out: The Little Adventures Bag | 44 | weak search; Pinterest/hub value. |
| 16 | A24 | How to Start a Reading Journal: Spreads, Pages and Prompts You'll Keep Up | 44 |  |
| 17 | A30 | An At-Home Creative Saturday: Clay, Paint and a Journal Spread, Hour by Hour | 44 | weak search; Pinterest/hub value. |
| 18 | A17 | Embroidery for Beginners: Your First Hoop in One Evening | 42 |  |
| 19 | A18 | How to Crochet for Beginners: Hook, Yarn and a First Project You'll Finish | 42 |  |
| 20 | A26 | Jigsaw Puzzles for Adults: How to Choose One and Set Up a Puzzle Night | 42 | weak search; Pinterest/hub value. |
| 21 | A06 | Mahjong Sets for Beginners: How to Choose One You'll Love Looking At | 41 | high upkeep. |
| 22 | A09 | Hobbies for Busy Women: Pick One by Your Energy, Your Budget and Your Evening | 41 | funnel piece, low direct commerce. |
| 23 | A14 | Pickleball for Beginners: Your First Game, What to Wear and What to Say | 41 |  |
| 24 | A27 | How to Start Writing Letters: A Pen Pal Starter Kit | 41 | weak search; Pinterest/hub value. |
| 25 | A15 | What to Wear and Bring to Tennis or Pickleball: The Court Bag Edit | 40 | weak search; Pinterest/hub value. high upkeep. |
| 26 | A22 | How to Find a Hobby as an Adult (When You Think You Have No Interests) | 40 | funnel piece, low direct commerce. |
| 27 | A28 | Weekend Plans That Aren't Brunch: Twenty-Four Ideas by Mood | 39 | weak search; Pinterest/hub value. funnel piece, low direct commerce. |
| 28 | A29 | Active Hobbies for Women Who Don't Love the Gym | 39 |  |
| 29 | A20 | Are Craft Kits Worth It? Which Hobbies to Buy as a Kit and Which to Build Yourself | 38 |  |
| 30 | A23 | How to Start Playing Tennis as an Adult: Your First Four Weeks | 36 |  |

Reading the ranking: the highest scorers are the visual, experience-led pieces that she would save and that can sell several everyday items (picnic, girls' night, mahjong night, paint night). The lowest are the technical or authority-dominated ones (tennis, craft kits, court-bag apparel). That is deliberate: the library is meant to be led by desirability. Tier assignment also uses **research readiness** (how many verified products exist today), not only score, which is why A06 (score 41) is in Tier 1 and A21 (score 46) is in Tier 2.

## 6. The article briefs (30)

Every card has the same fields as the CSV. 'Types only' means product categories, never ASINs or brands; the specific picks come from the scoring and verification pipeline (80 shortlist, 90 flagship). Where I say 'SERP read' I mean what the search tool returned for that query in this session (titles, snippets and the tool's summaries); I did not open every page, and ranking order was not verified.

### Tier 1: launch library (first 12)

#### A01. Junk Journaling Supplies for Beginners: The Small, Pretty Starter Edit

- **Slug:** `/journal/junk-journaling-supplies-for-beginners` (KEEP old slug (matches the commercial query; see old-URL table))
- **Old URLs involved:** junk-journaling-supplies-for-beginners (rebuilt from zero) ; how-to-start-junk-journaling is handled by A02
- **Role / tier / priority:** Commercial flagship / Tier 1 / P1
- **Editorial format:** Curated shopping edit (visual, product-led, with a 'what you already own' strip)
- **Collection / signature experience:** The Paper Edit / Junk Journaling
- **Experience inspired:** Sunday-night table covered in paper scraps, washi tape and a thick journal that is allowed to be messy.
- **Why she cares:** She has seen the pages on Pinterest and assumes it needs a craft-store trolley. She wants to know the six things worth buying, the ten things in her recycling bin that already count, and what a good version of each looks like.
- **What she learns or accomplishes:** Which items are essential (a journal with thick pages, an adhesive she likes), which are pretty extras, what to scavenge, what to leave in the shop. She ends with a basket she can order in one sitting.
- **What makes her save or share:** A 'flat-lay edit' she can screenshot as a shopping list; the 'free ephemera' checklist; the one-pick-per-job layout (no decision fatigue).
- **Products she would want (types only):** Journal with heavy pages; two adhesives (glue stick or tape runner, plus a liquid glue); washi tape; sticker/ephemera pack; small scissors or craft knife (safe-use note); a pen set; archival-quality guidance for adhesives and paper (sourced).
- **Photography:** Overhead flat lay on a table with natural window light; the same basket shown 'unpacked' and 'in use'; close-ups of paper textures; one honest 'first spread' result. PHOTO BURDEN: medium (one styled set, shot once).
- **Links to tools and hobby pages:** Quiz (/hobby-finder) result for 'paper and craft' answers; Make Plans 'solo, at home, an evening'; /shop Paper Edit; heart-save on hobby page. Hobby pages: /hobbies/junk-journaling ; /hobbies/scrapbooking and /hobbies/collage-art (scrapbooking is consolidated here, no separate article).
- **Why it beats competing content (evidence):** Page one of the junk-journal-supplies SERP I read is brand craft blogs (Stampin' Up, Salvaged Living), Benable/shop lists, and 101planners: text lists, some shop-owned, none a single-pick-per-job visual edit; one summary noted guides disagree little (journal, glue, scraps). Opportunity is design and honesty (what to skip), not new facts.
- **Search intent and keywords:** Commercial investigation + informational. Primary phrase: junk journal supplies for beginners. Secondary: what do you need for junk journaling; junk journal supplies list; junk journal starter kit. Volume: UNMEASURED.
- **Pinterest angle:** Search pin ('Junk journal supplies: what you actually need'), aspirational flat lay, practical checklist. Junk journaling is a long-running visual Pinterest category in my assumption (UNMEASURED; the repo already holds junk-journal pin assets from the old plan, which should be remade, not reused).
- **Maintenance risk:** Low-medium. 6 to 7 product slots; adhesives and tapes are stable catalogue items. Recheck links on the normal cycle.
- **Research status and gate:** Verified research exists (archival paper/adhesive sources: nedcc.org, gaylord.com, archivalmethods.com; glue facts lepage.ca). Product shortlist must be rebuilt under the scoring model; do not carry over old picks. Paper Edit has 7 shown records today (A2), so it can ship first.
- **Scores (1 to 5):** AD 4, BA 5, SO 3, PM 5, CP 4, PF 4, EA 4, VS 5, CU 4, EV 5, LM 4. **Total 47/55.**

#### A02. How to Start Junk Journaling: Your First Spread, in One Evening

- **Slug:** `/journal/how-to-start-junk-journaling` (KEEP old slug (head informational query))
- **Old URLs involved:** how-to-start-junk-journaling (rebuilt from zero; must NOT repeat A01's product set)
- **Role / tier / priority:** Supporting specialist (project tutorial) / Tier 1 / P2
- **Editorial format:** Project tutorial (step-led, process photography, one finished spread)
- **Collection / signature experience:** The Paper Edit / Junk Journaling
- **Experience inspired:** The first hour at the table: choosing scraps, a loose layout, glue, and the permission to leave it uneven.
- **Why she cares:** She is not sure what 'junk journaling' even is or whether she is 'creative enough'. She wants to be walked through one page so it feels doable.
- **What she learns or accomplishes:** What a junk journal is, how to build one spread (base, layers, tuck-ins, a pocket), how to fix common mistakes (wrinkled paper, bulky pages), and when to stop.
- **What makes her save or share:** A numbered, photographed 'one spread' she can pin and copy; three theme starters (a month, a trip, a quiet week) without a printable (no downloads are offered).
- **Products she would want (types only):** Only what A01 already defines, referenced by link (journal, adhesive, washi, scissors). Deliberately light on product blocks so A01 owns the commercial intent.
- **Photography:** Step-by-step process shots (6 to 8), one hero spread, hands in frame. PHOTO BURDEN: high (the highest among the Tier 1 pieces); budget real time for this.
- **Links to tools and hobby pages:** Make Plans (evening, solo, at home); quiz; links to A01 for supplies and to A24 for a reading-journal spread. Hobby pages: /hobbies/junk-journaling.
- **Why it beats competing content (evidence):** SERP read: Book Riot 'How to make a junk journal', Apartment Therapy, Michaels class, Bustle-type explainers, craft-brand blogs. They explain what it is; few give a single finished-spread path with realistic first-time mistakes.
- **Search intent and keywords:** Informational. Primary: how to start junk journaling. Secondary: junk journal ideas for beginners; what is a junk journal. Volume: UNMEASURED.
- **Pinterest angle:** Step-sequence pin, 'before/after' spread, theme-idea pins. Strongest pin yield expected from the process images (judgement, UNMEASURED).
- **Maintenance risk:** Low. No time-sensitive facts; products only by reference.
- **Research status and gate:** Verified research: adhesive/paper sources (see A01). No new product research needed.
- **Scores (1 to 5):** AD 4, BA 5, SO 3, PM 5, CP 2, PF 3, EA 5, VS 5, CU 4, EV 5, LM 4. **Total 45/55.**

#### A03. Air-Dry Clay for Beginners: Three Little Things to Make This Week

- **Slug:** `/journal/how-to-start-air-dry-clay` (KEEP old slug (already used by the pilot; reads naturally))
- **Old URLs involved:** how-to-start-air-dry-clay (rebuilt from zero; pilot brief exists in docs/editorial-reset/pilot/air-dry-clay)
- **Role / tier / priority:** Commercial flagship / Tier 1 / P1
- **Editorial format:** Project tutorial (three ordered projects, materials/drying/finishing per project)
- **Collection / signature experience:** The Creative Edit / Air-Dry Clay
- **Experience inspired:** A ring dish on the dresser that is unmistakably hers, made over two evenings and a few days of drying.
- **Why she cares:** Pottery looks like a studio and a kiln; this is the version you can do on the kitchen table. She wants something pretty and giftable and a promise it will not look like a school project.
- **What she learns or accomplishes:** Choose one clay, the three tools worth owning, make a trinket dish, a pinch pot and a small tray, dry without cracks (days not hours), finish and seal, and know what it cannot do (hold food or water; stay outdoors).
- **What makes her save or share:** The finished-objects trio; a realistic timeline strip ('Tonight, +24h, +72h'); the 'what it can and cannot be used for' honesty box.
- **Products she would want (types only):** One adult-oriented air-dry clay; rolling pin and craft knife (household where possible); sandpaper; acrylic paint set; brush; water-based sealer. Honest note: only one clay is in the data today and it needs an adult-oriented replacement (A2).
- **Photography:** Hands shaping clay on a linen table; finished dish on a dresser with a ring; three-up of the finished pieces; a 'drying day 1/2/3' sequence. PHOTO BURDEN: medium-high.
- **Links to tools and hobby pages:** Quiz 'make something with my hands'; Make Plans (evening, solo or with a friend, needs supplies); link to A20 (kits) and A07 (paint night). Hobby pages: /hobbies/air-dry-clay ; /hobbies/pottery-painting.
- **Why it beats competing content (evidence):** Live SERP read (same as the pilot brief): top results are generic technique primers (potclays.co.uk, Skillshare, Art of Education) and 10 to 30 idea lists (diyjoy, Hometalk, Mont Marte, First Day of Home, Crayola). Few appear to give a small, ordered set of three projects with drying and finishing timing in a design-led voice; trinket dishes recur as the first project everywhere.
- **Search intent and keywords:** Informational with commercial layer. Primary: air dry clay for beginners. Secondary: air dry clay projects; air dry clay trinket dish; what do you need for air dry clay; is air dry clay food safe. Volume: UNMEASURED.
- **Pinterest angle:** Search pin ('Air-dry clay for beginners'), aspirational shelf-of-ceramics, practical 'supplies + timeline' pin. Trinket dishes are among the most repeated beginner projects in what I read (UNMEASURED on Pinterest).
- **Maintenance risk:** Low-medium. Clay brands change; sealer claims must keep to maker guidance.
- **Research status and gate:** Verified research exists (crayola.com drying and sealing; montmarte.com food safety). Product shortlist already begun in pilot; clay brand needs scoring.
- **Scores (1 to 5):** AD 4, BA 5, SO 4, PM 5, CP 3, PF 3, EA 4, VS 5, CU 5, EV 5, LM 4. **Total 47/55.**

#### A04. Watercolor for Beginners: The Small Kit and Three Paintings to Start

- **Slug:** `/journal/watercolor-painting-for-beginners` (KEEP old slug (matches the head query))
- **Old URLs involved:** watercolor-painting-for-beginners (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship / Tier 1 / P2
- **Editorial format:** Beginner guide with a pocket-kit shopping edit (short lessons, three first paintings)
- **Collection / signature experience:** The Creative Edit / Watercolor
- **Experience inspired:** A small tin of paints and a pad on the sofa, or in the park on a Sunday.
- **Why she cares:** She wants to be able to paint something pretty without a class, and without buying an art-store's worth of supplies she does not understand.
- **What she learns or accomplishes:** Pan, tube or liquid paints; paper that can take water (a pad or block); a short brush set; first techniques (wash, gradient, wet-on-wet); three finishable paintings (a sky, leaves, a still life of one fruit).
- **What makes her save or share:** The 'pocket kit' flat lay; the three paintings as a series she can copy; 'what to skip first' box.
- **Products she would want (types only):** Starter pan or tube set; watercolor paper pad or block; round brush set; palette; water container; optional masking tape. Safety: look for non-toxic labelling (AP seal, per sources).
- **Photography:** Painted pages mid-process on a desk with a mug; the pocket tin open; three finished mini-paintings pinned to a wall. PHOTO BURDEN: medium (paintings are made by us; no licensed art).
- **Links to tools and hobby pages:** Quiz; Make Plans (evening, solo; also 'something portable'); links to A13 (day-out bag: pocket palette) and A30 (creative Saturday). Hobby pages: /hobbies/watercolor-painting ; /hobbies/outdoor-sketching.
- **Why it beats competing content (evidence):** Page one of the 'watercolor supplies for beginners' SERP: Skillshare, Opus Art Supplies, Little Coffee Fox, Art Is Fun, Altenew and an art-brand blog; the summaries converge on one core list (paint, round brushes, proper paper, palette, water). The category is crowded with teaching brands. Our edge is not a longer list: it is a smaller kit, a finished painting, and a portable framing none of those lead with.
- **Search intent and keywords:** Informational and commercial. Primary: watercolor painting for beginners. Secondary: watercolor supplies for beginners; best (not used in titles) watercolor set for beginners; easy watercolor paintings. Volume: UNMEASURED; SERP is crowded, expect to compete on the long tail first.
- **Pinterest angle:** Search pin, aspirational 'painted flowers + coffee' flat lay, practical supplies pin. Easy-painting idea pins are an established pin type (assumption, UNMEASURED).
- **Maintenance risk:** Low-medium. Art-material safety statements need to stay sourced.
- **Research status and gate:** Verified research exists (acmiart.org AP seal, cpsc.gov, winsornewton.com, artistsnetwork.com). 5 shown records today (A2), so it is shippable; rebuild shortlist under scoring.
- **Scores (1 to 5):** AD 4, BA 4, SO 3, PM 4, CP 4, PF 4, EA 4, VS 5, CU 4, EV 5, LM 4. **Total 45/55.**

#### A05. How to Host a Mahjong Night: The Table, the Snacks and the First Game

- **Slug:** `/journal/how-to-host-a-mahjong-night` (KEEP old slug (matches the query))
- **Old URLs involved:** how-to-host-a-mahjong-night (rebuilt from zero; pilot)
- **Role / tier / priority:** Commercial flagship / Tier 1 / P1
- **Editorial format:** Complete experience itinerary (hosting guide with a run of show)
- **Collection / signature experience:** The Hosting Edit / Mahjong
- **Experience inspired:** Four women at a card table with a lamp, tiles clicking, a plate of snacks that will not touch the tiles.
- **Why she cares:** She keeps being invited to 'mahjong night' or wants to start one. She wants to be the host who makes it feel effortless, even if she is learning too.
- **What she learns or accomplishes:** Pick a ruleset first (American card versus other variants), how many tables and people, a teaching plan for the first hour, snack and drink rules that protect tiles, and a calm host script.
- **What makes her save or share:** The 'table setup' diagram/photo; the host's run of show; a guest-friendly 'house rules' card in the article (no download).
- **Products she would want (types only):** Mahjong set (links to A06 for choosing); current-year card where the ruleset needs one; table/mat; card covers or racks for newcomers; snack/serve ware; low-profile lamp or tray. Highest-ticket items in the shop (A2).
- **Photography:** Overhead of a styled mahjong table (tiles, racks, card, snack plates); candid-looking hands mid-game; table setup before/after. PHOTO BURDEN: high (needs a set and a table; staged scene).
- **Links to tools and hobby pages:** Quiz 'friendship / something to do together'; Make Plans (evening, with friends, at home); links to A06 (set), A12 (girls' night hub). Hobby pages: /hobbies/mahjong ; /hobbies/board-games ; /hobbies/book-clubs.
- **Why it beats competing content (evidence):** SERP read: hosting pages on page one are mostly brand-owned (Oh My Mahjong, Anders Ruff, Lucky Mahj, Cedar & Rush, Chatbooks) plus AOL; the summaries note the tile and decor advice is heavier than the gameplay guidance, and that one ruleset must be agreed first. A neutral, host-first guide with a run of show and a teaching plan is open ground. Also, mainstream coverage (NBC regional stories) frames mahjong as a growing social, analog pastime, which fits the brand (qualitative; not a size estimate).
- **Search intent and keywords:** Informational with strong commercial adjacency. Primary: how to host a mahjong night. Secondary: mahjong party ideas; mahjong night for beginners; what you need for mahjong. Volume: UNMEASURED.
- **Pinterest angle:** Aspirational table scene, search pin ('How to host a mahjong night'), practical 'what you need' pin. Mahjong is visually distinctive on a pin (judgement, UNMEASURED).
- **Maintenance risk:** Medium. The American ruleset's card changes every year (per National Mah Jongg League source); keep article text ruleset-agnostic and reference the card generically.
- **Research status and gate:** Verified research exists (nationalmahjonggleague.org, ohmymahjong.com, themahjong.com and others; 6 sources). Catalogue: 6 shown mahjong records today (A2). Rebuild shortlist.
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 5, CP 4, PF 4, EA 5, VS 5, CU 4, EV 4, LM 4. **Total 48/55.**

#### A06. Mahjong Sets for Beginners: How to Choose One You'll Love Looking At

- **Slug:** `/journal/how-to-choose-a-mahjong-set` (NEW slug (old library had no equivalent). The word 'best' is avoided on purpose: no testing, and the plan forbids 'best' claims.)
- **Old URLs involved:** none (new topic)
- **Role / tier / priority:** Commercial flagship (decision guide / buying edit) / Tier 1 / P1
- **Editorial format:** Decision guide with a short curated edit and a comparison table (American set, standard set, travel set)
- **Collection / signature experience:** The Hosting Edit / Mahjong
- **Experience inspired:** Unwrapping a pretty set and knowing it is the right one for the game her friends actually play.
- **Why she cares:** It is the biggest purchase in the whole shop, the one where a wrong choice (wrong ruleset, missing tiles, no card) is genuinely expensive and embarrassing. She wants someone to say 'this is the one that matches the game you will play'.
- **What she learns or accomplishes:** Which game she is buying for, what must be in the box (tiles, jokers, racks, pushers, case, dice), what is a pretty extra (colour, a mat, a bag), how to check a listing before buying, budget tiers in words (no prices).
- **What makes her save or share:** The 'check the box contents' list she can forward to the friend who is choosing; the comparison table.
- **Products she would want (types only):** One or two sets in each of three bands (budget, mid, statement), a mat, card covers, a case or bag, the annual card where relevant. Types only here; ASIN checks are mandatory because 'American mahjong needs a matching layout' (a source warned a mismatched set is missing tiles).
- **Photography:** Three sets side by side on a neutral surface (tile close-ups, racks, case); a 'what's in the box' flat lay. PHOTO BURDEN: high unless manufacturer imagery is licensed (see Cowork workstream Q).
- **Links to tools and hobby pages:** Links back to A05; quiz; Make Plans. Hobby pages: /hobbies/mahjong.
- **Why it beats competing content (evidence):** SERP read for 'best mahjong sets': BestReviews and many lookalike sites with rolling month-and-year stamps on unfamiliar domains (acfc.org, ofzenandcomputing, vintagevinylnews, peccadille, boundbyflame): an observed pattern of low-trust roundups; Apartment Therapy's 'prettiest sets' is the editorial exception. Summaries say sets must match American rules and list a card and case. A careful, honest decision guide with a check-the-box list is a real gap; we do not need testing claims to be useful.
- **Search intent and keywords:** Commercial investigation. Primary: mahjong set for beginners / American mahjong set. Secondary: what comes in a mahjong set; where to buy a mahjong set; mahjong set with racks. Volume: UNMEASURED (the many near-duplicate affiliate roundups suggest the query is worth chasing; that is an inference, not a measurement).
- **Pinterest angle:** Comparison pin ('3 mahjong sets, 3 budgets'), 'what's in the box' pin, aspirational set-on-table pin.
- **Maintenance risk:** HIGH relative to the rest (sets go out of stock; annual card; listing contents change). Mitigation: three bands, one pick each, no price text, quarterly link check, a single catalogue row per product.
- **Research status and gate:** Verified research partly exists (NMJL card annual; set-contents guidance from old source lists). Product shortlist must be freshly scored; listing verification by Cowork is mandatory before publish.
- **Scores (1 to 5):** AD 4, BA 4, SO 4, PM 3, CP 5, PF 4, EA 3, VS 4, CU 5, EV 3, LM 2. **Total 41/55.**

#### A07. How to Host a Paint Night at Home (No Talent Required): The Whole Evening, Planned

- **Slug:** `/journal/how-to-host-a-paint-night-at-home` (KEEP old slug (matches the query))
- **Old URLs involved:** how-to-host-a-paint-night-at-home (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship / Tier 1 / P1
- **Editorial format:** Complete experience itinerary (timeline, set-up diagram, one guided painting)
- **Collection / signature experience:** The Hosting Edit (cross-lists The Creative Edit) / Craft and Paint Nights
- **Experience inspired:** Four friends at a table covered in kraft paper, small canvases drying along the wall, music on, snacks that cannot stain.
- **Why she cares:** She loves the idea of paint-and-sip evenings but not the cost of a venue; she wants to host one at home that feels like a night out.
- **What she learns or accomplishes:** How to choose a simple guided painting everyone can finish, set up a table that survives spills, time the evening, cater for allergies, and keep non-painters comfortable.
- **What makes her save or share:** The 'run of show' timeline; the set-up photo; a 'five beginner paintings to choose from' strip (original illustration, no copied art).
- **Products she would want (types only):** Small canvases or panels; a basic acrylic set; round and flat brushes; disposable palettes; aprons or old shirts; easels or table easels; kraft paper; non-toxic labelling (sourced). Food-allergy note, no alcohol-led products.
- **Photography:** Overhead of a set paint-night table; a finished row of canvases; hands mid-brushstroke; the 'set-up' stage before guests arrive. PHOTO BURDEN: high.
- **Links to tools and hobby pages:** Make Plans (evening, with friends, at home, needs supplies); quiz; links to A25 (craft night), A12 (girls' night hub), A04. Hobby pages: /hobbies/craft-nights ; /hobbies/watercolor-painting ; /hobbies/pottery-painting.
- **Why it beats competing content (evidence):** SERP read: results are dominated by paint-bar and class brands (Muse Paintbar, Painting with a Twist, Pott'd) and general lifestyle sites (Yahoo Lifestyle, Lulus, GigSalad, Kmart AU), with several keyword-stuffed 'coohom' style pages. The brand pages are promotional; the practical tips (spill-proof drinks, take-home palettes, fairy lights) recur. Our edge is a complete, honest run of show and a supplies list with allergy and safety notes.
- **Search intent and keywords:** Informational/hosting with commercial layer. Primary: paint and sip at home. Secondary: how to host a paint night; paint night supplies; paint party at home for adults. Volume: UNMEASURED.
- **Pinterest angle:** Aspirational table scene; search pin ('How to host a paint night at home'); practical supply-list pin.
- **Maintenance risk:** Low-medium.
- **Research status and gate:** Verified research exists (acmiart.org, cpsc.gov, foodallergy.org). 3 shown records (A2), enough to start; shortlist rebuilt.
- **Scores (1 to 5):** AD 4, BA 5, SO 3, PM 5, CP 4, PF 4, EA 5, VS 5, CU 4, EV 5, LM 4. **Total 48/55.**

#### A08. How to Make a Cozy Reading Nook Without Buying Furniture

- **Slug:** `/journal/cozy-reading-nook-without-furniture` (NEW slug)
- **Old URLs involved:** none (new topic). Related old page: how-to-start-a-book-club (see old-URL table)
- **Role / tier / priority:** Commercial flagship (Cozy Edit anchor) / Tier 1 / P1
- **Editorial format:** Curated shopping edit with a lifestyle layout (a 'room' shot, a light, a throw, a ritual)
- **Collection / signature experience:** The Cozy Edit / Reading
- **Experience inspired:** A corner with a good lamp, a throw and a mug where the phone is not invited.
- **Why she cares:** Reading is the most-connected hobby on the site and the one she most wants to do more of. She does not want a furniture project; she wants the corner to feel inviting tonight.
- **What she learns or accomplishes:** The five things that make a corner a reading corner (light, something soft, a place to put the mug, a bookmark system, a boundary for the phone); how to light it safely (including a sourced note on candles); a 20-minute set-up.
- **What makes her save or share:** 'The corner in five objects' flat lay; before/after of a plain corner; the phone-free ritual.
- **Products she would want (types only):** Clip-on or table reading light (warm, dimmable); throw blanket; cushion; a mug or tea pairing; page flags/bookmarks; optional reading journal and a basket. No furniture sold. Candle guidance is safety-only.
- **Photography:** A real corner (window, chair already owned) before and after; close-ups of textures; the 'five objects' flat lay. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Quiz 'unwind / relax'; Make Plans (evening, solo, home, low energy); links to A21 (cozy solo date), A24 (reading journal), A26 (puzzles). Hobby pages: /hobbies/reading ; /hobbies/book-clubs.
- **Why it beats competing content (evidence):** SERP read for 'cozy reading nook': page one is furniture and home retailers (Wayfair, Joss & Main, Macy's, Raymour & Flanigan, Chairish, Lovesac) with a few magazines (Restless, Book Riot). Their summaries centre on chair, side table, light, throw, storage: they sell furniture. The 'without furniture' angle serves the reader who has an armchair or a bed and wants the feel for the cost of small things.
- **Search intent and keywords:** Informational and commercial. Primary: reading nook ideas. Secondary: how to create a cozy reading corner; reading nook essentials; cozy reading night. Volume: UNMEASURED; competition is retailers with large domains, so expect long-tail wins first.
- **Pinterest angle:** Aspirational corner pin; 'reading nook essentials' list pin; practical 'phone-free reading ritual' pin. Cozy-interiors imagery is a familiar Pinterest staple (assumption, UNMEASURED).
- **Maintenance risk:** Medium. Lamp/throw listings change; keep types and one pick each.
- **Research status and gate:** Cozy Edit has ZERO shown verified products today (A2: 5 candidates). This article is gated on verification of at least 4 picks; research priority #1 for Cowork. Fallback: swap in A19 (flowers) if the gate is not met.
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 5, CP 4, PF 4, EA 5, VS 5, CU 4, EV 4, LM 3. **Total 47/55.**

#### A09. Hobbies for Busy Women: Pick One by Your Energy, Your Budget and Your Evening

- **Slug:** `/journal/hobbies-for-busy-women` (NEW short slug; old hobbies-to-try-when-life-feels-like-work-sleep-repeat 301s here (owner may prefer to keep the old, longer slug: see open questions))
- **Old URLs involved:** hobbies-to-try-when-life-feels-like-work-sleep-repeat ; affordable-hobbies-under-25 ; creative-hobbies-you-can-start-at-home (all rebuilt into one decision pillar, not a 35-item list)
- **Role / tier / priority:** Traffic / discovery pillar / Tier 1 / P1
- **Editorial format:** Discovery pillar built as a decision guide (matrix by energy, cost, solo/social, then 'start here' picks), with visual cards
- **Collection / signature experience:** All six (routes into each collection) / All twelve signature experiences
- **Experience inspired:** The moment she closes the laptop and thinks: I want something that is mine.
- **Why she cares:** The site's founding feeling: life is work, sleep, repeat. She needs a way to choose that is not a list of 35 things.
- **What she learns or accomplishes:** Her own shortlist of three, filtered by energy, money and company; one starter step for each; where to go next (hobby page, shop edit, plan).
- **What makes her save or share:** A mood-and-budget matrix screenshot she sends a friend ('which of these are you?'); a 'two-minute setup' badge system.
- **Products she would want (types only):** None named inline; routes to hobby pages and collections (the commercial value flows through the signature-experience articles). Keeps product count low.
- **Photography:** One strong hero, small consistent object-photos per hobby (a hoop, a hook, a racquet); a 'mood chips' graphic. PHOTO BURDEN: medium (many small images; reuse from other articles).
- **Links to tools and hobby pages:** PRIMARY entry to Quiz (/hobby-finder) and Make Plans (/make-plans); directory chips; heart-save. Hobby pages: /hobbies (directory) deep-links to about 12 hobby pages; every signature experience appears.
- **Why it beats competing content (evidence):** SERP read for 'best hobbies for women in their 30s': lists from Woman & Home, Mindbodygreen, Dear Media, StyleCraze, Silk & Sonder, Skill Scouter; summaries show a spread of yoga, travel, gardening, photography, puzzles with no consensus or organising logic. Head terms are owned by large publishers, so this is a long-tail and quiz-funnel bet ('hobbies for busy women', 'hobbies to try when you're burned out'), not a head-term win. Its job is brand and tool traffic.
- **Search intent and keywords:** Informational discovery. Primary: hobbies for busy women. Secondary: hobbies to try after work; hobbies for women in their 30s; easy hobbies to start at home. Volume: UNMEASURED; head terms are highly competitive.
- **Pinterest angle:** Aspirational mood-board pins; 'Pick a hobby by energy' infographic; search pin ('Hobbies for busy women').
- **Maintenance risk:** Low if it stays at about 12 curated hobbies (no 35-item list to re-check).
- **Research status and gate:** Verified research exists in part (ala.org, larl.org, extension sources). Health or wellbeing claims must stay out per brand voice.
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 4, CP 2, PF 2, EA 4, VS 4, CU 4, EV 5, LM 3. **Total 41/55.**

#### A10. Things to Do After Work Instead of Scrolling: By How Much Energy You Have

- **Slug:** `/journal/things-to-do-after-work-instead-of-scrolling` (KEEP old slug (exact-match phrase; also absorbs low-energy-hobbies via 301))
- **Old URLs involved:** things-to-do-after-work-instead-of-scrolling ; low-energy-hobbies (merged)
- **Role / tier / priority:** Traffic / discovery pillar (brand-defining) / Tier 1 / P1
- **Editorial format:** Lifestyle feature + menu (three energy levels, each a short menu with a 'two-minute setup')
- **Collection / signature experience:** Cozy / Creative / Paper (menu items route to each) / Reading, Junk Journaling, Watercolor, Crochet, Embroidery, Puzzles
- **Experience inspired:** 5:01 p.m. and the choice between the phone and something that feels like a plan.
- **Why she cares:** This is the site's name made literal. She has an hour, little energy, and a habit she would like to swap without a lecture.
- **What she learns or accomplishes:** Pick by energy: 'nothing left', 'a little', 'I could do something'; a two-minute set-up for each; a gentle 'make it easy next time' tip (a tray by the sofa). No health claims.
- **What makes her save or share:** The 'nothing left / a little / a lot' triptych as a pin and a screenshot; the 'tray by the sofa' idea.
- **Products she would want (types only):** Light touch: three or four low-effort kits (a pocket sketch set, a puzzle, a reading light, a crochet hook) referenced from Edits; no product wall.
- **Photography:** A cosy desk after work: shoes off, tray with a project; three scenes for three energy levels. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Make Plans (weeknight, evening, solo): the natural home of this article; Quiz. Hobby pages: /hobbies?energy=low (existing filter chips) ; /hobbies/reading ; /hobbies/jigsaw-puzzles ; /hobbies/junk-journaling.
- **Why it beats competing content (evidence):** SERP read: results are Greater Good (Berkeley), The Every Girl, The Muse, VegOut, Evie, Substack posts and phone-detox blogs: mostly generic lists plus habit advice; the summaries mention a short post-work ritual and finishable micro projects as the useful ideas. Our edge: organised by energy (not by hobby), tied to a planner that can actually build the evening, and written without wellness claims.
- **Search intent and keywords:** Informational. Primary: things to do after work instead of scrolling. Secondary: hobbies after work; low energy hobbies; what to do after work alone. Volume: UNMEASURED.
- **Pinterest angle:** Three-panel 'by energy' pin; aspirational desk scene; practical list pin.
- **Maintenance risk:** Low. Evergreen; no dated facts.
- **Research status and gate:** Verified research exists (nhs.uk, hort.extension.wisc.edu, ala.org, lacountylibrary.org). Wellbeing language must be conservative; nothing beyond the sources.
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 4, CP 3, PF 3, EA 5, VS 4, CU 5, EV 5, LM 4. **Total 46/55.**

#### A11. Gifts for Women Who Want a New Hobby: Ready-to-Wrap Boxes, by Experience

- **Slug:** `/journal/hobby-gifts-for-women` (NEW slug (undated on purpose))
- **Old URLs involved:** none (new). Old creative-hobby-starter-kits-worth-considering is handled by A20
- **Role / tier / priority:** Commercial flagship (gift guide) / Tier 1 / P2
- **Editorial format:** Gift guide built as 'build-a-box' recipes (an idea, three to five items, who it is for)
- **Collection / signature experience:** All six (one box each) / Cross-experience: junk journaling, clay, watercolor, mahjong, reading, picnicking and more
- **Experience inspired:** A gift she opens and immediately wants to start tonight.
- **Why she cares:** Gift guides sit closest to purchase intent and she is shopping for a friend who 'needs a hobby'. The fix to most gift lists is a coherent box, not 40 loose items.
- **What she learns or accomplishes:** Six to eight boxes (a Junk Journal Box, a Cozy Reading Box, a Paint Night Kit, a Little Adventures Picnic Set, a Mahjong Starter, a Clay Dish Kit and so on), each with a theme, who it suits, and a note on budget feel.
- **What makes her save or share:** One image per box (what's in it), easy to save and pin; 'who is this for' tags.
- **Products she would want (types only):** Per box: 3 to 5 items drawn from the Edits (same catalogue rows as the flagships, so no extra products to maintain). No price text; no 'deals'.
- **Photography:** Six styled box flat lays on one consistent surface; one hero of a wrapped box. PHOTO BURDEN: high but reusable across Pinterest (one shoot yields six pin sets).
- **Links to tools and hobby pages:** Quiz ('not sure what she'd like? find her thing') ; Make Plans ('plan the gift as an evening together'). Hobby pages: Links to the matching hobby page for each box.
- **Why it beats competing content (evidence):** SERP read for 'gifts for women who love crafts': AOL, Cheapism, Brit+Co, Fox, Hobbycraft, Tractor Supply and others; summaries show loose product lists (yarn minis, folding palettes, a paper trimmer, kits, magazine subscriptions) and mention that prices vary and listings go stale. Our edge is boxes-by-experience tied to a plan she can attach ('open it together on Saturday').
- **Search intent and keywords:** Commercial. Primary: gifts for women who want to start a hobby. Secondary: hobby starter kit gifts; creative gifts for women; gifts for a friend who needs a hobby. Volume: UNMEASURED; strongly seasonal peak in Q4 (general knowledge), yet gifting recurs (birthdays, hosting).
- **Pinterest angle:** Gift-box flat lays; 'Gifts for the friend who needs a hobby' search pin. Gift-guide pins are widely used (assumption, UNMEASURED). Vendor advice is to pin seasonal content 30 to 60 days before the season (Tailwind-type sources; vendor claim).
- **Maintenance risk:** HIGH if dated; keep it undated, one catalogue row per product, annual refresh task of about an hour in October.
- **Research status and gate:** Depends on A01 to A07 shortlists already being verified, so it adds no new product research. TIMING: today is 19 Nov; the main gifting window is nearly closed for Pinterest lead time. Ship in early December only if the shortlists are ready; otherwise move to the start of Tier 2 and plan for next October.
- **Scores (1 to 5):** AD 5, BA 4, SO 3, PM 5, CP 5, PF 4, EA 5, VS 5, CU 5, EV 3, LM 2. **Total 46/55.**

#### A12. Girls' Night In Ideas: Six Evenings, Each With a Plan and a Shopping List

- **Slug:** `/journal/girls-night-in-ideas` (NEW slug; old girls-night-ideas-that-arent-drinks 301s here)
- **Old URLs involved:** girls-night-ideas-that-arent-drinks ; how-to-start-a-book-club (book club night becomes one of the six)
- **Role / tier / priority:** Traffic / discovery pillar (Hosting hub) / Tier 1 / P2
- **Editorial format:** Hosting hub: six short complete-evening menus (mahjong, paint, craft, book club, puzzle, spa-and-film) with links to the deep guides
- **Collection / signature experience:** The Hosting Edit (hub) / Mahjong; Craft and Paint Nights; Reading (book club night)
- **Experience inspired:** Friday: the table is set, everyone is in socks, and nobody has to find a restaurant.
- **Why she cares:** She wants a reason to see her friends that is not dinner out; the invite is half the battle, so she needs six ready-made ideas and the exact things to put out.
- **What she learns or accomplishes:** Which evening suits her group (size, skill, budget); a mini run-of-show for each; the one purchase that elevates each night.
- **What makes her save or share:** Six invitation-style 'night cards' (title, vibe, what to set out) that she can pin or text; a themed palette per night.
- **Products she would want (types only):** Light: one hero product per night, pointing to the deep guides (A05/A06, A07, A25, A26, book-club kit).
- **Photography:** Six small scenes with a consistent look (a series, like postcards); reuse images from A05, A07, A25, A26. PHOTO BURDEN: medium (reuse).
- **Links to tools and hobby pages:** Make Plans (evening, with friends) is the primary link; quiz; directory 'social' chip. Hobby pages: /hobbies/mahjong ; /hobbies/craft-nights ; /hobbies/book-clubs ; /hobbies/jigsaw-puzzles ; /hobbies/board-games.
- **Why it beats competing content (evidence):** SERP read: stylecraze, SignUpGenius, Her Campus, SheKnows, Thortful, Cozymeal, Crosswalk; summaries show ordinary lists (game night, spa, karaoke, crafting, trivia) with 'pick a theme' tips. Heavily crowded and generic; the opportunity is six complete evenings with a shopping list, not 40 loose ideas. Honest expectation: head term is hard; it is mainly a Pinterest and hub piece.
- **Search intent and keywords:** Informational/inspirational. Primary: girls night in ideas. Secondary: at home girls night activities; friends night in ideas; book club night ideas. Volume: UNMEASURED; very competitive.
- **Pinterest angle:** Invitation-card style pins (strong for save/share), aspirational party table, 'six girls night in ideas' search pin.
- **Maintenance risk:** Low. Product-light.
- **Research status and gate:** Verified research exists (foodallergy.org, cpsc.gov, nps.gov, ojp.gov for the old pieces); reuse relevant sources only.
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 5, CP 4, PF 4, EA 5, VS 5, CU 4, EV 5, LM 4. **Total 49/55.**

### Tier 2: growth (next 10)

#### A13. What to Pack for a Day Out: The Little Adventures Bag

- **Slug:** `/journal/what-to-pack-for-a-day-out` (NEW slug)
- **Old URLs involved:** none (new). Absorbs the gear angle of cheap-weekend-adventures
- **Role / tier / priority:** Commercial flagship (Little Adventures anchor) / Tier 2 / P1
- **Editorial format:** Curated shopping edit as a flat-lay lifestyle feature ('eight small things that make a Saturday easier')
- **Collection / signature experience:** The Little Adventures Edit / Picnicking (and every outing: market, museum, park, thrift)
- **Experience inspired:** A tote by the front door that is always half packed for a good Saturday.
- **Why she cares:** The Little Adventures collection has no anchor and almost no verified products today; this gives it one that is not tied to the seasons. She wants to leave the house with fewer excuses.
- **What she learns or accomplishes:** What lives in the bag (refillable bottle or flask, snack container, pocket notebook, a compact layer, sun and rain basics, a portable charger), how to keep it ready, and how to choose a first outing from it.
- **What makes her save or share:** 'What's in the bag' flat lay with numbered items (people save these); a printable-free checklist in the article.
- **Products she would want (types only):** Tote or small backpack; insulated bottle or flask; snack/food containers; compact umbrella or packable layer; pocket notebook and pen; small sketch or watercolor set; portable charger. Basics, not gear-heavy.
- **Photography:** A tote with items laid out by a door; the bag in use at a market or a park; close-ups. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Make Plans (day, outdoors or somewhere new, solo or friends); quiz 'adventure'; links to A16 (picnic) and A28 (weekend plans). Hobby pages: /hobbies/picnicking ; /hobbies/hiking ; /hobbies/museum-exploring ; /hobbies/birdwatching ; /hobbies/nature-photography.
- **Why it beats competing content (evidence):** No single query dominates; related SERPs I read ('picnic date ideas', 'solo weekend getaway', 'rainy day things to do') are broad listicles from The Knot, Cozymeal, Food Network, travel blogs. A short, product-curated 'bag' is a different format from all of them. Honest flag: little direct search demand is evident, so this is mostly Pinterest and internal-link value.
- **Search intent and keywords:** Informational and commercial, low direct demand. Primary: what to pack for a day out. Secondary: day trip essentials; what to bring on a day out. Volume: UNMEASURED.
- **Pinterest angle:** Flat-lay 'what's in my day-out bag' style pin (a familiar pin pattern; UNMEASURED), checklist pin.
- **Maintenance risk:** Medium. Eight products; keep types simple.
- **Research status and gate:** Little Adventures has 0 shown verified records (A2; 2 candidates). Needs about 4 verified picks before launch. Safety claims (sun, water) kept to sources.
- **Scores (1 to 5):** AD 4, BA 5, SO 2, PM 5, CP 4, PF 3, EA 4, VS 5, CU 4, EV 5, LM 3. **Total 44/55.**

#### A14. Pickleball for Beginners: Your First Game, What to Wear and What to Say

- **Slug:** `/journal/pickleball-for-beginners` (KEEP old slug (matches the head query))
- **Old URLs involved:** pickleball-for-beginners (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship / Tier 2 / P1
- **Editorial format:** Beginner experience guide ('first game' walk-through: courts, open play, etiquette, a small gear edit)
- **Collection / signature experience:** The Sporty Edit / Pickleball
- **Experience inspired:** Walking up to a busy court, knowing the paddle rack rules and what to call.
- **Why she cares:** Women are being invited to pickleball constantly and are nervous about not knowing the rules or the unwritten etiquette.
- **What she learns or accomplishes:** The court and rules in plain words (sourced to USA Pickleball), what to expect at open play (paddle rack, rotation, calling the score), what to wear and bring, how to choose a first paddle by weight and grip (principles), how to join a group.
- **What makes her save or share:** 'First-game cheat sheet' graphic (original); the etiquette list; the outfit-and-bag flat lay.
- **Products she would want (types only):** Paddle (principles and two or three verified options), approved balls, court-appropriate shoes with good grip, a small bag, water bottle, sun/cap. Honest note: the paddle market churns, so recommendations are by feature.
- **Photography:** Court-side flat lay, a woman mid-rally shot from behind with no face focus if no model release, the gear on a bench. PHOTO BURDEN: high (needs a court and a player).
- **Links to tools and hobby pages:** Quiz ('movement + social'); Make Plans (evening, with a friend or solo, outdoors); links to A15 (court bag) and A23. Hobby pages: /hobbies/pickleball ; /hobbies/tennis ; /hobbies/running.
- **Why it beats competing content (evidence):** SERP read: paddle shootouts from TIME, Money, Livestrong, Pickleball Central, JustPaddles, Pickleheads, pickleball.com; apparel brands (Nike, Vuori, Under Armour) own 'what to wear'; etiquette from PlayPickleball, The Dink, Paddletek. These have real testers or sports-retail authority; we do not. Our edge is a beginner-experience framing for women who are about to join a game, with sourced rules and without paddle-test claims. Expect the head term to be hard; target 'first time' and 'what to wear' long tail.
- **Search intent and keywords:** Informational. Primary: pickleball for beginners. Secondary: what to wear to play pickleball; pickleball etiquette open play; how to choose a pickleball paddle. Volume: UNMEASURED.
- **Pinterest angle:** Outfit-and-bag pins; 'first-game cheat sheet'; aspirational court scene.
- **Maintenance risk:** Medium. Paddle picks decay; use features, not rankings.
- **Research status and gate:** Verified research exists (usapickleball.org rules, playpickleball.com open play). Sporty Edit has 0 shown records (A2): needs about 4 verified picks (research queue: paddle, balls, shoes, bag).
- **Scores (1 to 5):** AD 5, BA 4, SO 3, PM 3, CP 4, PF 3, EA 4, VS 3, CU 5, EV 4, LM 3. **Total 41/55.**

#### A15. What to Wear and Bring to Tennis or Pickleball: The Court Bag Edit

- **Slug:** `/journal/what-to-wear-to-play-tennis-or-pickleball` (NEW slug)
- **Old URLs involved:** none (new). Absorbs gear angles from old tennis and pickleball pieces
- **Role / tier / priority:** Commercial flagship (Sporty Edit style piece) / Tier 2 / P2
- **Editorial format:** Curated shopping edit, style-led (outfit formulas plus bag contents)
- **Collection / signature experience:** The Sporty Edit / Pickleball; Tennis
- **Experience inspired:** Looking the part: the tennis-court aesthetic she has pinned for years, made practical.
- **Why she cares:** Looking and feeling put-together is half of the motivation for a sport she is new to, and she wants clothes and a bag that work on a court.
- **What she learns or accomplishes:** Three outfit formulas (skirt/skort + top, dress, leggings + layer); what actually matters (shoes with support for side-to-side movement, sun, pockets for balls); the bag contents.
- **What makes her save or share:** Outfit-formula flat lays; 'three outfits, one bag'.
- **Products she would want (types only):** Court shoes; a tennis dress or skort with ball pockets; breathable top; visor or cap; sunscreen (basic, not claims); water bottle; compact racquet/paddle bag. Apparel sizing means returns risk: a note on checking the size chart.
- **Photography:** Outfit flat lays on a bench or neutral floor; a bag unpacked. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Links to A14 and A23; Make Plans; quiz. Hobby pages: /hobbies/pickleball ; /hobbies/tennis.
- **Why it beats competing content (evidence):** SERP read: 'what to wear to play pickleball' page one is apparel brands (Bohme, Nike, Vuori, Under Armour, Anita) plus NBC Select and Today shopping; tennis 'what to wear' is Asics, Nike, Whowhatwear, CNN Underscored. They sell their own goods; none is a brand-agnostic edit built for one woman who plays both. Honest flag: apparel varies by season and size; this is the highest-churn flagship.
- **Search intent and keywords:** Commercial. Primary: what to wear to play pickleball / tennis. Secondary: tennis outfits for women; pickleball outfit ideas. Volume: UNMEASURED.
- **Pinterest angle:** Outfit pins (apparel and 'sporty aesthetic' pins are a standard Pinterest category in my assumption, UNMEASURED).
- **Maintenance risk:** HIGH-MEDIUM. Apparel churns; limit to shoes, one dress/skort, one bag.
- **Research status and gate:** Needs verification of apparel and shoes; tennis needs usta.com-based guidance (already in sources). Consider holding until A14 data exists.
- **Scores (1 to 5):** AD 4, BA 4, SO 2, PM 5, CP 4, PF 4, EA 4, VS 5, CU 3, EV 3, LM 2. **Total 40/55.**

#### A16. How to Plan a Picnic: What to Pack, What to Eat Safely and How to Make It Look Like That

- **Slug:** `/journal/how-to-plan-a-perfect-picnic` (KEEP old slug (matches the query))
- **Old URLs involved:** how-to-plan-a-perfect-picnic (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship / Tier 2 / P1
- **Editorial format:** Complete experience itinerary (timeline, packing list, a safe menu, one styled setup)
- **Collection / signature experience:** The Little Adventures Edit / Picnicking
- **Experience inspired:** A gingham-free, magazine-pretty picnic where nothing spoils and nothing is forgotten.
- **Why she cares:** Picnics are the most photographed little adventure. She wants it to look like the pin and also to go smoothly (food held at safe temperatures, no missing forks).
- **What she learns or accomplishes:** Pick a spot and time, a menu that travels, the two-hour and cooler rules (sourced), how to carry it, styling in five objects, and what to do if it rains.
- **What makes her save or share:** The 'picnic in five objects' flat lay; a 'what to pack' strip; a menu card.
- **Products she would want (types only):** Waterproof-backed blanket; insulated cooler bag with ice packs; reusable plates, cups and cutlery; a basket or tote; a flask or bottle; wipes for non-food mess (with the sanitizer note per CDC); a small trash bag. Highest AOV spread across everyday items.
- **Photography:** A styled blanket scene (seasonal but not tied to a date), a food spread close-up, packing flat lay. PHOTO BURDEN: high; shoot on a mild day.
- **Links to tools and hobby pages:** Make Plans (afternoon or evening, outdoors, solo, friends or date); links to A13. Hobby pages: /hobbies/picnicking.
- **Why it beats competing content (evidence):** SERP read: The Knot, Cozymeal, Food Network, Homes & Gardens, Apartment Therapy, The Zoe Report, Greenvelope, Nordic Nest, BestReviews. They cover themes, basket, blanket and aesthetics; the summary noted several are affiliate-supported. A sourced food-safety layer (FDA, CDC, USDA FSIS, FARE: two-hour rule, cooler practice, allergen cleaning) inside a beautiful itinerary is rarely central in those results.
- **Search intent and keywords:** Informational with strong commercial intent. Primary: how to plan a picnic. Secondary: picnic essentials; what to bring to a picnic; aesthetic picnic ideas; picnic date ideas. Volume: UNMEASURED; seasonal (spring-summer) but evergreen annually.
- **Pinterest angle:** Aspirational styled picnic; 'what to pack' pin; 'picnic menu' pin. Seasonal pins should go out 30-60 days ahead per vendor guidance (vendor claim).
- **Maintenance risk:** Medium-low. Blanket/cooler listings; text stays evergreen.
- **Research status and gate:** Verified research exists (8 sources: fda.gov, cdc.gov, fsis.usda.gov, foodallergy.org). Little Adventures products needed (A13 shares picks).
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 5, CP 5, PF 5, EA 5, VS 5, CU 4, EV 4, LM 4. **Total 50/55.**

#### A17. Embroidery for Beginners: Your First Hoop in One Evening

- **Slug:** `/journal/how-to-start-embroidery` (KEEP old slug)
- **Old URLs involved:** how-to-start-embroidery (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship / Tier 2 / P2
- **Editorial format:** Project tutorial with a 'kit or build-your-own' decision box
- **Collection / signature experience:** The Creative Edit / Embroidery
- **Experience inspired:** A cream hoop with three stitches of florals, finished while a film plays.
- **Why she cares:** Embroidery is gentle, portable and giftable; she wants a first project she will finish and display.
- **What she learns or accomplishes:** Fabric, hoop size and floss basics, three first stitches (running, back, stem), how to start a thread, transferring a simple pattern, finishing a hoop for display.
- **What makes her save or share:** The stitch trio sampler; a finished-hoop gallery; a 'what's missing from cheap kits' tip.
- **Products she would want (types only):** A beginner kit with a pre-printed pattern and verified contents (needle, floss, hoop) or separate hoop, floss, needles, fabric. Sources note some kits arrive with missing needles: advise checking the contents.
- **Photography:** Close-up of stitches on linen; flat lay of the kit; a finished hoop on a wall. PHOTO BURDEN: medium (macro shots).
- **Links to tools and hobby pages:** Quiz; Make Plans (evening, solo, home); links to A20 (kit vs build) and A15. Hobby pages: /hobbies/embroidery.
- **Why it beats competing content (evidence):** SERP read: practicalembroidery.eu, LoveCrafts, Bob Vila, gathered.how, Treasurie, needlework sites (all how-to explainers with the same advice: hoop, floss, a few stitches, a small project). Kit roundups on rolling-date lookalike domains were visible. The opportunity is a finish-in-one-evening promise and an honest kit check, not new technique.
- **Search intent and keywords:** Informational with commercial layer. Primary: hand embroidery for beginners. Secondary: embroidery kit for beginners; embroidery stitches for beginners; embroidery supplies. Volume: UNMEASURED.
- **Pinterest angle:** Search pin; stitch sampler pin; hoop-on-wall aspirational pin.
- **Maintenance risk:** Low-medium.
- **Research status and gate:** Verified research exists (dmc.com, 4 sources). 3 shown embroidery records (A2); kit definition missing.
- **Scores (1 to 5):** AD 4, BA 4, SO 3, PM 4, CP 3, PF 3, EA 4, VS 4, CU 4, EV 5, LM 4. **Total 42/55.**

#### A18. How to Crochet for Beginners: Hook, Yarn and a First Project You'll Finish

- **Slug:** `/journal/how-to-start-crocheting` (KEEP old slug)
- **Old URLs involved:** how-to-start-crocheting (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship / Tier 2 / P2
- **Editorial format:** Beginner guide as a four-week starter path (coaster, dishcloth, granny square, scarf) with a yarn-and-hook edit
- **Collection / signature experience:** The Creative Edit / Crochet
- **Experience inspired:** A basket of soft yarn and the quiet rhythm of a row at the end of the day.
- **Why she cares:** Crochet is a quiet, portable craft she wants to learn; the barrier is choosing a hook and yarn that will not frustrate her.
- **What she learns or accomplishes:** Hook and yarn pairing (a forgiving weight; very fine yarn is hard for beginners), slip knot, single crochet, a first dishcloth or coaster; where to find free video support.
- **What makes her save or share:** The 'first four projects' ladder; yarn-and-hook flat lay.
- **Products she would want (types only):** Ergonomic hook set (sizes appropriate for the yarn), worsted-weight cotton or acrylic yarn, stitch markers, a tapestry needle, small scissors. NOTE: the current catalogue verifies yarn only; NO hook is verified (A2).
- **Photography:** Yarn textures, a finished coaster set, hands with a hook. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Quiz; Make Plans (evening, solo); links to A20 and A10. Hobby pages: /hobbies/crochet ; /hobbies/knitting.
- **Why it beats competing content (evidence):** SERP read: LoveCrafts, Gathered, Skillshare, Hobbycraft, Make and Do Crew, Woobles-style kit pages; summaries agree on single crochet, small projects (coasters, dishcloths, granny squares) and forgiving yarn. Plenty of how-to coverage; our edge is a four-week ladder and a restrained, verified kit.
- **Search intent and keywords:** Informational with commercial layer. Primary: crochet for beginners. Secondary: first crochet project; what you need to start crocheting; beginner crochet kit. Volume: UNMEASURED.
- **Pinterest angle:** Project-ladder pin; yarn flat lay; search pin.
- **Maintenance risk:** Low-medium.
- **Research status and gate:** Verified research exists (craftyarncouncil.com, lionbrand.com). Gate: at least one verified hook (a hook is in the Cowork queue per A2).
- **Scores (1 to 5):** AD 4, BA 4, SO 3, PM 4, CP 3, PF 3, EA 4, VS 4, CU 4, EV 5, LM 4. **Total 42/55.**

#### A19. Flower Arranging for Beginners: Make Grocery-Store Flowers Look Like a Florist's

- **Slug:** `/journal/flower-arranging-for-beginners` (NEW slug (head query); old flower-arranging-as-a-hobby 301s here)
- **Old URLs involved:** flower-arranging-as-a-hobby (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship (visual how-to; low product dependency) / Tier 2 / P2
- **Editorial format:** Visual how-to with 'recipe cards' (three arrangements, each with stems, vase and steps)
- **Collection / signature experience:** The Creative Edit (also Cozy) / Flower Arranging
- **Experience inspired:** A Friday bunch of supermarket flowers turned into something that makes the whole room feel considered.
- **Why she cares:** Flowers are a small weekly luxury. She wants to know the three moves that make cheap stems look expensive.
- **What she learns or accomplishes:** Choosing fresh stems, conditioning, a focal-filler-green formula, taping a grid or using a frog, three recipe arrangements, how to make them last, which flowers to keep away from pets.
- **What makes her save or share:** Three recipe cards as separate pins; a before/after of the plastic-wrapped bunch; the pet-safety note.
- **Products she would want (types only):** Floral shears or clippers, a vase with a wide neck, a flower frog or floral tape, flower food. Honest flag: the flowers themselves are not an Amazon product, so the basket is small (A2).
- **Photography:** Before/after flowers, hands trimming stems, three finished vases in daylight. PHOTO BURDEN: medium-high (flowers must be fresh; reshoots are costly).
- **Links to tools and hobby pages:** Quiz; Make Plans (a small solo ritual, low cost); links to A21 and A30. Hobby pages: /hobbies/flower-arranging ; /hobbies/indoor-gardening.
- **Why it beats competing content (evidence):** SERP read: NPR, AOL, Domino, Food52, Hometalk, The Happier Homemaker, Well+Good, ABC News/AP and others. Extremely saturated. The summaries repeat one method (trim, de-leaf, flower food, tape grid, focal/filler/greenery). We cannot win on information; the case for this piece is image-led recipe cards that fit Pinterest and the brand, plus verified pet-safety guidance. Commerce is deliberately small.
- **Search intent and keywords:** Informational. Primary: flower arranging for beginners. Secondary: how to arrange grocery store flowers; how to make a bouquet last longer. Volume: UNMEASURED; SERP is saturated.
- **Pinterest angle:** Recipe-card pins (three), before/after, search pin. Flowers are a standard visual Pinterest topic (assumption, UNMEASURED).
- **Maintenance risk:** Lowest of the set (almost no product reliance).
- **Research status and gate:** Verified research exists (10 sources: aspca.org, ucanr.edu, extension.umn.edu and others). Bench candidate to replace A08 in Tier 1 if the Cozy gate fails.
- **Scores (1 to 5):** AD 5, BA 5, SO 2, PM 5, CP 2, PF 3, EA 5, VS 5, CU 4, EV 5, LM 5. **Total 46/55.**

#### A20. Are Craft Kits Worth It? Which Hobbies to Buy as a Kit and Which to Build Yourself

- **Slug:** `/journal/are-craft-kits-worth-it` (NEW slug; old creative-hobby-starter-kits-worth-considering 301s here)
- **Old URLs involved:** creative-hobby-starter-kits-worth-considering (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship (Creative hub; decision guide) / Tier 2 / P2
- **Editorial format:** Comparison / decision guide (a table by hobby: kit, build-your-own, or either)
- **Collection / signature experience:** The Creative Edit (and Paper) / Crochet; Embroidery; Air-Dry Clay; Watercolor; Junk Journaling
- **Experience inspired:** Standing in front of three kit boxes and knowing which one to buy.
- **Why she cares:** Kits are the most common impulse purchase in this world and the most common disappointment. She wants a straight answer.
- **What she learns or accomplishes:** For each hobby: when a kit is the smart route (embroidery, crochet), when it overprices a short list (watercolor, clay), what to check (contents list, missing needles, instruction quality), and a 'five-question kit test'.
- **What makes her save or share:** The comparison table as a screenshot; the five-question test.
- **Products she would want (types only):** Five or six exemplar kits and the build-your-own equivalents, all drawn from the other flagships (no new product rows).
- **Photography:** Kit boxes unpacked vs the DIY equivalent flat lay; the table. PHOTO BURDEN: low-medium.
- **Links to tools and hobby pages:** Quiz; links to each hobby's flagship (A03, A04, A17, A18, A01). Hobby pages: /hobbies/embroidery ; /hobbies/crochet ; /hobbies/air-dry-clay ; /hobbies/watercolor-painting ; /hobbies/paint-by-numbers.
- **Why it beats competing content (evidence):** SERP read ('craft kits for adults', 'best embroidery kits'): Bob Vila, Sculpey's own blog, BuzzFeed, plus rolling-date roundups on lookalike domains; summaries list kits by popularity and note missing-contents risks. Few appear to give a cross-hobby 'kit or not' judgement; our credibility comes from saying when not to buy a kit.
- **Search intent and keywords:** Commercial investigation. Primary: are craft kits worth it. Secondary: best (not used) craft kits for adults; embroidery kit vs buying supplies. Volume: UNMEASURED.
- **Pinterest angle:** Table pin ('Kit or DIY?'); search pin.
- **Maintenance risk:** Medium. References other flagships' picks.
- **Research status and gate:** Verified research exists (acmiart.org, cpsc.gov, crayola.com); no new products.
- **Scores (1 to 5):** AD 4, BA 4, SO 3, PM 3, CP 4, PF 3, EA 2, VS 3, CU 5, EV 4, LM 3. **Total 38/55.**

#### A21. A Cozy Solo Date at Home: One Evening, Planned

- **Slug:** `/journal/cozy-solo-dates-at-home` (KEEP old slug (describes the query and the experience))
- **Old URLs involved:** cozy-solo-dates-at-home (rebuilt as a single complete evening, not a 20-item list)
- **Role / tier / priority:** Commercial flagship (Cozy itinerary) / Tier 2 / P2
- **Editorial format:** Complete experience itinerary (a timeline from 6 p.m. to bed, three optional paths)
- **Collection / signature experience:** The Cozy Edit / Reading; Puzzles; Flower Arranging; Junk Journaling
- **Experience inspired:** Taking herself out, at home: lamp on, phone away, an evening with a beginning, a middle and an end.
- **Why she cares:** 'Solo date at home' is the most on-brand idea we have: a plan, for one, with substance. She wants a script, not an idea list.
- **What she learns or accomplishes:** Three paths (a book and a bath, a puzzle and a candle, a paint-and-pour), timeline, what to set out, a safe-candle note, what to do if she feels restless.
- **What makes her save or share:** The hour-by-hour card; the 'set out' flat lay; the three paths.
- **Products she would want (types only):** A small cross-section from A08 (light, throw, tea) plus a puzzle, a pen and journal, a candle with the safety note. Mostly reuses Cozy Edit rows.
- **Photography:** A lit coffee table scene; a single hour-by-hour layout; hands with a mug. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Make Plans (evening, solo, home, low energy): near-identical result; Quiz. Hobby pages: /hobbies/reading ; /hobbies/jigsaw-puzzles ; /hobbies/baking ; /hobbies/junk-journaling.
- **Why it beats competing content (evidence):** SERP read: Woman & Home '32 essentials for a cosy night in', Pottery Barn, Her Campus, The Every Girl, Bustle 'Amazon finds', Camille Styles. Mostly product roundups and idea lists; few give a timeline for one evening. Honest expectation: moderate competition; best case is Pinterest and tool traffic.
- **Search intent and keywords:** Informational/inspirational. Primary: cozy night in for one. Secondary: solo date at home; self care night at home; cozy night in ideas. Volume: UNMEASURED.
- **Pinterest angle:** Aspirational lit-scene pin; timeline card pin; search pin.
- **Maintenance risk:** Medium-low.
- **Research status and gate:** Verified research exists (nfpa.org, usfa.fema.gov for candle safety; aspca.org for flowers/candles with pets).
- **Scores (1 to 5):** AD 5, BA 5, SO 2, PM 5, CP 4, PF 4, EA 5, VS 5, CU 4, EV 4, LM 3. **Total 46/55.**

#### A22. How to Find a Hobby as an Adult (When You Think You Have No Interests)

- **Slug:** `/journal/how-to-find-a-hobby-as-an-adult` (KEEP old slug)
- **Old URLs involved:** how-to-find-a-hobby-as-an-adult (rebuilt from zero)
- **Role / tier / priority:** Traffic / discovery pillar / Tier 2 / P2
- **Editorial format:** Lifestyle feature / method essay with a seven-day experiment, ending in the quiz
- **Collection / signature experience:** All six (routes via the quiz) / All twelve
- **Experience inspired:** A first honest 'I don't know what I like' and a gentle way to find out.
- **Why she cares:** Many women say 'I don't really have any interests'. They need a method that feels like permission, not homework.
- **What she learns or accomplishes:** The 'interest audit' (what she already does when no one is looking), the seven-day experiment (a different 20-minute thing each evening), how to notice what to keep, when to stop.
- **What makes her save or share:** 'Seven evenings, seven tries' graphic; an empathy-forward intro people forward.
- **Products she would want (types only):** Almost none (links out to hobbies and Edits). Commercially a funnel piece.
- **Photography:** A mostly typographic layout with a handful of object photos. PHOTO BURDEN: low.
- **Links to tools and hobby pages:** Quiz (/hobby-finder) is the explicit next step; Make Plans; directory. Hobby pages: /hobbies ; per-hobby pages.
- **Why it beats competing content (evidence):** SERP read ('how to make friends as an adult hobbies', 'best hobbies for women'): dominated by health and psychology brands (Cleveland Clinic, Psychology Today, UHC, Calm) and listicles; health claims there are out of scope for us. A warm, practical method essay and a quiz bridge are a differentiated, brand-led angle. Honest: low commerce, medium search, high funnel value.
- **Search intent and keywords:** Informational. Primary: how to find a hobby as an adult. Secondary: I don't have any hobbies; how to find hobbies you like. Volume: UNMEASURED.
- **Pinterest angle:** Quote-style/typographic pins and 'seven evenings' graphic. Lower pin appeal than craft pieces (judgement).
- **Maintenance risk:** Lowest; text-only.
- **Research status and gate:** Sources thin (nps.gov only): avoid behavioural-science claims; say 'try' not 'studies show'.
- **Scores (1 to 5):** AD 5, BA 5, SO 3, PM 3, CP 1, PF 1, EA 5, VS 3, CU 4, EV 5, LM 5. **Total 40/55.**

### Tier 3: later (final 8)

#### A23. How to Start Playing Tennis as an Adult: Your First Four Weeks

- **Slug:** `/journal/how-to-start-playing-tennis-as-an-adult` (KEEP old slug)
- **Old URLs involved:** how-to-start-playing-tennis-as-an-adult (rebuilt from zero)
- **Role / tier / priority:** Commercial flagship (Tennis experience) / Tier 3 / P2
- **Editorial format:** Beginner plan (four weeks: rent and lesson first, then buy)
- **Collection / signature experience:** The Sporty Edit / Tennis
- **Experience inspired:** Walking onto a public court with a racquet she borrowed and a plan.
- **Why she cares:** Tennis is classic and intimidating. She wants to know she can start without buying a bag of gear first.
- **What she learns or accomplishes:** Rent/demo before buying, find lessons and leagues, racquet basics (head size, weight; sourced to tennis authorities), a four-week learning plan, court etiquette.
- **What makes her save or share:** The four-week plan graphic.
- **Products she would want (types only):** Few: shoes, one forgiving racquet only after a trial, balls, a bag (shared with A15). Honest: the only candidate racquet looked like a junior toy (A2); recommending a rental first is the editorial position.
- **Photography:** A court at golden hour; a rented racquet on a bench; hands holding balls. PHOTO BURDEN: high.
- **Links to tools and hobby pages:** Quiz; Make Plans; links to A14, A15. Hobby pages: /hobbies/tennis ; /hobbies/pickleball.
- **Why it beats competing content (evidence):** SERP read: USTA (SoCal and national), Wilson, tennis.com, LTA, Reviewed, Greatist, Tennis Warehouse. Authority-heavy and sports-brand heavy; sources note beginners can start for under about $100 and should try before buying. We can only be a better beginner plan with honesty about renting; not a gear authority.
- **Search intent and keywords:** Informational. Primary: tennis for adult beginners. Secondary: how to start playing tennis; beginner tennis racquet; tennis lessons for adults. Volume: UNMEASURED.
- **Pinterest angle:** Four-week plan pin; court aesthetic pin.
- **Maintenance risk:** Medium-low.
- **Research status and gate:** Verified research exists (usta.com, 4 sources). Racquet pick unresolved: do not list one until a verified adult beginner racquet is found.
- **Scores (1 to 5):** AD 3, BA 4, SO 3, PM 3, CP 3, PF 2, EA 3, VS 3, CU 4, EV 5, LM 3. **Total 36/55.**

#### A24. How to Start a Reading Journal: Spreads, Pages and Prompts You'll Keep Up

- **Slug:** `/journal/how-to-start-a-reading-journal` (KEEP old slug)
- **Old URLs involved:** how-to-start-a-reading-journal (rebuilt from zero)
- **Role / tier / priority:** Supporting specialist (project tutorial) / Tier 3 / P2
- **Editorial format:** Project tutorial / spread gallery (five layouts, a minimal option, a tracker)
- **Collection / signature experience:** The Paper Edit (cross-lists Cozy) / Reading
- **Experience inspired:** A notebook of finished books, quotes and tiny doodles.
- **Why she cares:** Reading journals are a Pinterest favourite and the way many women make reading feel like a hobby, not a to-do.
- **What she learns or accomplishes:** Five layouts (a simple log, a 'books read' wall, a quote page, a series tracker, a review page), pen choice, how to keep it small enough to stick.
- **What makes her save or share:** Layout gallery she can pin; a 'five lines per book' minimal option.
- **Products she would want (types only):** A dot-grid or plain journal, fine-tip pens, page flags, a few stickers or washi. Reuses Paper Edit rows.
- **Photography:** Top-down spreads of five layouts (original). PHOTO BURDEN: high (every spread must be made).
- **Links to tools and hobby pages:** Make Plans; links to A08, A02. Hobby pages: /hobbies/reading ; /hobbies/creative-writing ; /hobbies/junk-journaling.
- **Why it beats competing content (evidence):** Not directly SERP-read in this session beyond the 'read more books' query (PRH, Book Riot, AOL, Yahoo; habit-advice results). The visual layout-gallery format is a standard Pinterest pattern (assumption). Mark as test.
- **Search intent and keywords:** Informational. Primary: reading journal ideas. Secondary: how to start a reading journal; book journal layouts. Volume: UNMEASURED; SERP not read in depth here.
- **Pinterest angle:** Spread-gallery pins (primary); minimal-option pin.
- **Maintenance risk:** Low.
- **Research status and gate:** Sources thin (lacountylibrary.org). Needs a quick SERP and Pinterest check before commissioning.
- **Scores (1 to 5):** AD 4, BA 4, SO 3, PM 5, CP 3, PF 3, EA 4, VS 5, CU 4, EV 5, LM 4. **Total 44/55.**

#### A25. How to Host a Craft Night: Six Projects That Work for Every Skill Level

- **Slug:** `/journal/how-to-host-a-craft-night` (KEEP old slug)
- **Old URLs involved:** how-to-host-a-craft-night (rebuilt from zero; distinct from A07 by being a project menu)
- **Role / tier / priority:** Supporting specialist (hosting project menu) / Tier 3 / P2
- **Editorial format:** Hosting project menu (six projects, each with supplies, time and a mess rating)
- **Collection / signature experience:** The Hosting Edit / Craft and Paint Nights
- **Experience inspired:** A table of small things being made, take-home projects by the door.
- **Why she cares:** She wants a night where everyone leaves with something made, and the project choice is the hard part.
- **What she learns or accomplishes:** How to pick a project for mixed skill levels, how to prep, how to time; six projects (embroidered hoops, clay dishes, simple jewellery, stamped cards, candle or soap alternatives only where verified).
- **What makes her save or share:** Project cards she can pin one by one.
- **Products she would want (types only):** A few kits or multipacks for a group (clay, embroidery hoops, cardmaking); group-size note. Avoid hazardous-process crafts unless sourced.
- **Photography:** Six project close-ups; a table scene. PHOTO BURDEN: high.
- **Links to tools and hobby pages:** Make Plans (with friends, home); links to A07, A12, A20. Hobby pages: /hobbies/craft-nights ; /hobbies/jewelry-making ; /hobbies/friendship-bracelets.
- **Why it beats competing content (evidence):** SERP read: Stampin' Up, Officeworks, Sculpey, ThisMonth'sCraft, Her Campus, CBC. Brand and craft-supplier blogs; summaries stress simple take-home projects and kits for mixed skill. Moderate competition; the specific edge is the mess/time/skill rating per project.
- **Search intent and keywords:** Informational/hosting. Primary: craft night ideas for adults. Secondary: how to host a craft night; craft party for adults. Volume: UNMEASURED.
- **Pinterest angle:** Project-card pins; table scene.
- **Maintenance risk:** Medium.
- **Research status and gate:** Verified research exists (acmiart.org, cpsc.gov, crayola.com, foodallergy.org).
- **Scores (1 to 5):** AD 4, BA 5, SO 3, PM 4, CP 4, PF 4, EA 4, VS 4, CU 4, EV 5, LM 4. **Total 45/55.**

#### A26. Jigsaw Puzzles for Adults: How to Choose One and Set Up a Puzzle Night

- **Slug:** `/journal/jigsaw-puzzles-for-adults` (NEW slug)
- **Old URLs involved:** none (new). Puzzles currently have no article.
- **Role / tier / priority:** Supporting specialist (Cozy edit) / Tier 3 / P2
- **Editorial format:** Curated shopping edit with a set-up how-to (the puzzle table, a mat, a sorting system)
- **Collection / signature experience:** The Cozy Edit / Reading/relaxing (puzzles are a discovery hobby, not a signature)
- **Experience inspired:** A half-finished puzzle on the coffee table and a mug within reach.
- **Why she cares:** Puzzles are the lowest-effort cosy hobby, a perfect after-work and friends' night in activity, and a very giftable object.
- **What she learns or accomplishes:** Piece count by experience level, how to avoid cheap cardboard, a puzzle mat or board, edges-first and sorting systems, how to host a puzzle night.
- **What makes her save or share:** A gallery of the 'grown-up' puzzle types; the table setup.
- **Products she would want (types only):** Three puzzle recommendations by taste (art, landscape, food); a puzzle mat or board; sorting trays. A2 notes each puzzle is a taste decision, so keep to a few.
- **Photography:** The puzzle table with a half-finished image; unboxed puzzles. PHOTO BURDEN: medium.
- **Links to tools and hobby pages:** Make Plans (evening, solo or friends, low energy); links to A21, A12. Hobby pages: /hobbies/jigsaw-puzzles ; /hobbies/crossword-puzzles.
- **Why it beats competing content (evidence):** SERP read: NBC Select, Ravensburger, Stylist, My Modern Met, AOL, Today, Uncommon Goods. Established editorial roundups exist with real publisher weight; summaries show picks tied to scene art and 300 to 1,000 pieces. We would not out-rank NBC; value is the puzzle-night setup and the cosy edit position.
- **Search intent and keywords:** Commercial. Primary: jigsaw puzzles for adults. Secondary: cozy puzzles; puzzle night; puzzle mat. Volume: UNMEASURED.
- **Pinterest angle:** Puzzle-table aspirational pin; 'puzzle night' pin.
- **Maintenance risk:** Medium (puzzles stay in print but vary).
- **Research status and gate:** No sources in repo; needs research and verification (puzzle is a candidate record only).
- **Scores (1 to 5):** AD 4, BA 4, SO 2, PM 4, CP 4, PF 4, EA 4, VS 5, CU 4, EV 4, LM 3. **Total 42/55.**

#### A27. How to Start Writing Letters: A Pen Pal Starter Kit

- **Slug:** `/journal/how-to-start-writing-letters` (NEW slug)
- **Old URLs involved:** none (new topic)
- **Role / tier / priority:** Supporting specialist (trend-adjacent experiment) / Tier 3 / P3
- **Editorial format:** Lifestyle feature with a starter kit (what to write, how to find a pen pal, the kit)
- **Collection / signature experience:** The Paper Edit / Junk Journaling (adjacent)
- **Experience inspired:** A handwritten letter that arrives on a Wednesday.
- **Why she cares:** Analog and tactile; she has a friend to write to. A trend-supported yet evergreen mail ritual.
- **What she learns or accomplishes:** What to write in a first letter, a letter-writing kit, how to find a pen pal safely, how to keep it up monthly (sourced from sites that say monthly is realistic), how to decorate a letter.
- **What makes her save or share:** 'Letter kit' flat lay; an opening-line starter list.
- **Products she would want (types only):** Stationery set with envelopes, a pen she likes, stamps or stickers (stamps are not an Amazon item; note this), a small address book, washi or seals. Reuses Paper Edit rows.
- **Photography:** A stationery flat lay; a letter with envelope and a stamp. PHOTO BURDEN: low-medium.
- **Links to tools and hobby pages:** Make Plans (evening, solo); links to A01, A02. Hobby pages: /hobbies/calligraphy ; /hobbies/creative-writing ; /hobbies/junk-journaling.
- **Why it beats competing content (evidence):** Pinterest Predicts 2026 includes 'Pen Pals' with stated search growth (e.g. cute stamps +105%, penpal ideas +90%, snail mail gifts +110%; period Sept 2024 to Aug 2025; read from the Pinterest newsroom). SERP read: Archer & Olive, Wonder Pens, NPR, Stamps Forever, My Modern Met sets. Sizeable but niche, shop-blog led. Flag: the trend data is a year old and is Pinterest's own claim.
- **Search intent and keywords:** Informational. Primary: how to start writing letters / pen pal. Secondary: pen pal starter kit; stationery set for letter writing. Volume: UNMEASURED; the only trend stats we have are Pinterest's own.
- **Pinterest angle:** Stationery flat lay; 'first letter' pin. A pin type with an explicit Pinterest trend signal.
- **Maintenance risk:** Low.
- **Research status and gate:** No independent sources in repo yet; pen-pal safety guidance (privacy with strangers) must be sourced before publishing.
- **Scores (1 to 5):** AD 3, BA 4, SO 2, PM 4, CP 3, PF 4, EA 5, VS 5, CU 3, EV 4, LM 4. **Total 41/55.**

#### A28. Weekend Plans That Aren't Brunch: Twenty-Four Ideas by Mood

- **Slug:** `/journal/cute-weekend-plans-that-arent-brunch` (KEEP the unpublished draft slug; old weekend slugs 301 here)
- **Old URLs involved:** things-to-do-on-the-weekend ; cheap-weekend-adventures ; how-to-plan-a-solo-saturday ; solo-date-ideas ; how-to-take-yourself-on-a-solo-coffee-shop-date (five old pieces folded into one pillar)
- **Role / tier / priority:** Traffic / discovery pillar / Tier 3 / P2
- **Editorial format:** Discovery pillar as a mood menu with a solo / friends toggle (visual cards, each linking to a plan)
- **Collection / signature experience:** The Little Adventures Edit (and routes to others) / Picnicking; Craft and Paint Nights; Flower Arranging; Pickleball
- **Experience inspired:** Saturday with a storyline.
- **Why she cares:** Saturday is the best chance to do something that is hers; the default (brunch, errands) leaves her flat.
- **What she learns or accomplishes:** Twenty-four ideas grouped by mood (slow, social, creative, outdoors, treat-yourself), solo versions of each, a 'low-planning' filter.
- **What makes her save or share:** Mood cards; the 'solo or with friends' toggle idea.
- **Products she would want (types only):** Light; a few small items (a day-out bag, a sketch kit); no product wall.
- **Photography:** Mood-card images, consistent series, reusable from other articles. PHOTO BURDEN: medium (reuse).
- **Links to tools and hobby pages:** Make Plans (weekend, day, solo or friends) is the engine; quiz. Hobby pages: /hobbies/picnicking ; /hobbies/thrifting ; /hobbies/museum-exploring ; /hobbies/hiking.
- **Why it beats competing content (evidence):** SERP read: for the 'solo weekend getaway' and 'solo date' queries, travel and lifestyle publishers (Points Guy, Marriott, HuffPost, Elite Daily, Lemon8) and local-intent results. 'Things to do this weekend' is local-intent and not winnable. Honest: this is the weakest search bet in the plan; it exists as a hub and a Pinterest piece.
- **Search intent and keywords:** Informational. Primary: weekend plans that aren't brunch / weekend ideas. Secondary: solo date ideas; cute weekend plans; things to do alone. Volume: UNMEASURED; local-intent queries are not targeted.
- **Pinterest angle:** Mood-card pins; 'Saturday with a storyline' aspirational pins.
- **Maintenance risk:** Low-medium (idea lists; no prices).
- **Research status and gate:** Sources exist (nps.gov, ojp.gov, mayoclinic.org, sleepfoundation.org) but safety-for-solo claims must be conservative.
- **Scores (1 to 5):** AD 5, BA 5, SO 2, PM 4, CP 2, PF 2, EA 4, VS 4, CU 4, EV 4, LM 3. **Total 39/55.**

#### A29. Active Hobbies for Women Who Don't Love the Gym

- **Slug:** `/journal/active-hobbies-for-women-who-dont-love-the-gym` (KEEP old slug (natural query; absorbs cycling))
- **Old URLs involved:** active-hobbies-for-women-who-dont-love-the-gym ; how-to-get-into-recreational-cycling-as-an-adult (cycling becomes one sourced section)
- **Role / tier / priority:** Traffic / discovery pillar (Sporty hub) / Tier 3 / P3
- **Editorial format:** Discovery pillar (movement menu: walking, dance, yoga, skating, pickleball, tennis, cycling) with 'what to wear' glimpses
- **Collection / signature experience:** The Sporty Edit / Pickleball; Tennis
- **Experience inspired:** Moving because it is fun, not because of a membership.
- **Why she cares:** She wants movement that feels like a plan with friends, not exercise.
- **What she learns or accomplishes:** Pick by energy and social need; one start step each; safety basics (helmet fit and visibility for cycling; footwear) kept to sources.
- **What makes her save or share:** 'Move with friends' cards.
- **Products she would want (types only):** Light and safety-first; shoes and a few essentials by reference only. NOTE: helmet and safety gear must be described conservatively and defer to maker and local rules.
- **Photography:** A series of small movement scenes with no identifiable bodies. PHOTO BURDEN: medium-high.
- **Links to tools and hobby pages:** Quiz; Make Plans; links to A14, A15, A23. Hobby pages: /hobbies/yoga-for-beginners ; /hobbies/dance-classes ; /hobbies/roller-skating ; /hobbies/running ; /hobbies/climbing ; /hobbies/pickleball ; /hobbies/tennis.
- **Why it beats competing content (evidence):** SERP read ('cycling for beginners adult women', 'fun active hobbies'): cycling brands and magazines (Le Col, Woman & Home, Cycling Weekly, Stylist, Rouvy) and health publishers dominate; they own helmet, kit and bike advice. Cycling should not be a standalone article for us: a sourced section is enough. The pillar's value is routing to Sporty hobbies.
- **Search intent and keywords:** Informational. Primary: active hobbies for women who don't like the gym. Secondary: fun ways to exercise; recreational cycling for adults. Volume: UNMEASURED.
- **Pinterest angle:** Movement mood pins; search pin.
- **Maintenance risk:** Low-medium. Safety sources need periodic re-check (one old source is about six years old per the old notes).
- **Research status and gate:** Verified research exists (cdc.gov, nhtsa.gov, nsc.org, nps.gov, odphp.health.gov, heart.org and more). Reuse the sourced safety guidance, not the text.
- **Scores (1 to 5):** AD 4, BA 4, SO 3, PM 3, CP 3, PF 3, EA 3, VS 3, CU 4, EV 5, LM 4. **Total 39/55.**

#### A30. An At-Home Creative Saturday: Clay, Paint and a Journal Spread, Hour by Hour

- **Slug:** `/journal/at-home-creative-weekend` (KEEP old slug)
- **Old URLs involved:** at-home-creative-weekend (rebuilt from zero as an hour-by-hour itinerary)
- **Role / tier / priority:** Supporting specialist (experience itinerary) / Tier 3 / P2
- **Editorial format:** Complete experience itinerary (a day, hour by hour, with three paths: solo, two friends, a family-free house)
- **Collection / signature experience:** The Creative Edit (also Paper) / Air-Dry Clay; Watercolor; Junk Journaling
- **Experience inspired:** A whole Saturday of making that finishes with three things to show for it.
- **Why she cares:** She wants one lovely, full-day plan that uses what she has learned from the three project guides.
- **What she learns or accomplishes:** How to sequence clay (needs drying), painting and a journal spread across one day, with set-up and clean-up.
- **What makes her save or share:** The hour-by-hour card; the three finished objects.
- **Products she would want (types only):** Draws on A01, A03, A04 rows (no new products).
- **Photography:** A single studio-like day scene; three-object still life. PHOTO BURDEN: medium (reuse).
- **Links to tools and hobby pages:** Make Plans (weekend, day, at home, needs supplies); links to A02, A03, A04. Hobby pages: /hobbies/air-dry-clay ; /hobbies/watercolor-painting ; /hobbies/junk-journaling.
- **Why it beats competing content (evidence):** No dedicated SERP; the format is a brand concept. Closest results ('craft night', 'rainy day at home') are generic lists. Honest: this is a Pinterest and tool-funnel piece, not a search piece.
- **Search intent and keywords:** Informational/inspirational. Primary: at home creative weekend. Secondary: creative day at home; things to make at home on a Saturday. Volume: UNMEASURED; probably low.
- **Pinterest angle:** Aspirational making-day scene; timeline card pin.
- **Maintenance risk:** Low (reuses).
- **Research status and gate:** Verified research exists (acmiart.org, cpsc.gov, crayola.com).
- **Scores (1 to 5):** AD 4, BA 5, SO 1, PM 5, CP 4, PF 4, EA 5, VS 5, CU 3, EV 5, LM 3. **Total 44/55.**

---

## 7. Coverage maps

### 7.1 The twelve signature experiences

| Experience | Anchor article(s) | Supporting | Hobby page (directory) | Tool path |
|---|---|---|---|---|
| Junk Journaling | A01 (supplies edit), A02 (first spread) | A24, A27, A30, A20 | `/hobbies/junk-journaling` | quiz, Make Plans (evening, solo), Paper Edit |
| Air-Dry Clay | A03 | A20, A30, A25 | `/hobbies/air-dry-clay` | quiz, Make Plans, Creative Edit |
| Watercolor | A04 | A30, A13, A20 | `/hobbies/watercolor-painting` | quiz, Make Plans, Creative Edit |
| Embroidery | A17 | A20, A25 | `/hobbies/embroidery` | quiz, Make Plans, Creative Edit |
| Crochet | A18 | A20, A10 | `/hobbies/crochet` | quiz, Make Plans, Creative Edit |
| Reading | A08 (nook), A24 (journal) | A21, A12, A10 | `/hobbies/reading` | quiz, Make Plans, Cozy Edit |
| Flower Arranging | A19 | A21, A30 | `/hobbies/flower-arranging` | quiz, Make Plans, Creative Edit |
| Mahjong | A05 (host), A06 (set) | A12 | `/hobbies/mahjong` | quiz, Make Plans (friends), Hosting Edit |
| Craft and Paint Nights | A07 (paint), A25 (craft) | A12, A20 | `/hobbies/craft-nights` | Make Plans (friends), Hosting Edit |
| Picnicking | A16 | A13, A28 | `/hobbies/picnicking` | Make Plans (outdoors), Little Adventures Edit |
| Pickleball | A14 | A15, A29 | `/hobbies/pickleball` | quiz, Make Plans, Sporty Edit |
| Tennis | A23 | A15, A29 | `/hobbies/tennis` | quiz, Make Plans, Sporty Edit |

### 7.2 The six collections

(The collection slugs below are proposed paths; the live collection routes still use the old eight names until Stage 3.)

| Collection | Flagship(s) | Other pieces | Shippable at launch? |
|---|---|---|---|
| The Paper Edit | A01 | A02, A24, A27, A20 | Yes: 7 shown records today (A2). |
| The Creative Edit | A03, A04, A17, A18, A19, A20 | A30 | Yes: 14 shown records, uneven (clay 1; no hook). |
| The Hosting Edit | A05, A06, A07 | A12, A25 | Yes: 9 shown records; craft night and book club have none. |
| The Cozy Edit | A08, A21 | A24, A26, A10 | **Gated:** 0 shown records, 5 candidates. Needs about 4 verified picks (research priority 1). |
| The Sporty Edit | A14, A15, A23 | A29 | **Gated:** 0 shown records, 4 candidates (one flagged toy-like). Tier 2 on purpose. |
| The Little Adventures Edit | A13, A16 | A28 | **Gated:** 0 shown records, 2 candidates (blanket, cooler bag). Tier 2 on purpose. |

Never publish a collection tile or flagship with fewer than about four verified picks (A2). If the Cozy gate is not met by the Tier 1 date, swap A19 (flowers; almost no product dependency) in for A08.

### 7.3 Path from article to tools

Every article has **one primary tool call to action** (not three), placed after the reader has something to act on:

| Article type | Primary CTA | Why |
|---|---|---|
| Experience flagship (A03, A04, A17, A18, A19, A14, A23, A16) | Make Plans pre-filled for that experience ('plan this evening') | turns reading into a dated plan she can heart-save |
| Hosting pieces (A05, A07, A12, A25) | Make Plans with 'with friends' set | the invite is the hard part |
| Shopping edits (A01, A08, A13, A15, A26) | The matching shop collection | the collection owns the picks |
| Pillars (A09, A10, A22, A28, A29) | The quiz (`/hobby-finder`) or Make Plans | pillars exist to feed the tools |
| Gift guide (A11) | The quiz ('not sure what she'd like?') | gifting is a recognition problem |

The hobby page is the **secondary** link everywhere ('See the hobby page for how it works') and lists its anchor article first. The planner's `relatedGuides` field only admits published articles, so each article's back-links are added **at publish time** of the article that earns them (a 'link back-fill' step in the publish SOP), never before.

---

## 8. Launch sequence

Today is 2026-11-19; nothing here can ship before the four pilots are approved and the product architecture is stable (PLAN section 0). The sequence is by **dependency and seasonality**, not by calendar date, with anchors where timing matters.

**Phase 0: pilots (per the plan).** I would keep the same four, now defined from this inventory: **A03 (clay, project tutorial)**, **A01 (junk journaling edit, shopping edit)**, **A05 (mahjong night, hosting itinerary)**, **A09 (hobbies for busy women, discovery pillar)**. They span four formats and four jobs. Optional swap: replace A09 with A08 to test the weakest collection and a lifestyle edit (higher risk, because Cozy has no verified products).

**Phase 1: Tier 1 (12)**
| Wave | Articles | Gate before publishing |
|---|---|---|
| 1 (pilots) | A03, A01, A05, A09 | approved pilots; Paper, Creative and Hosting collections each with 4+ verified picks |
| 2 | A07, A02, A04, A10 | photography for A02 and A07 complete (highest burden) |
| 3 | A06, A12, A08, A11 | A06 mahjong set listings verified by Cowork; A08 only if the Cozy gate clears; A11 only if A01 to A07 shortlists are verified (it adds no new products) |

**A11 gift guide timing:** the main gifting window is nearly over for Pinterest lead time. Ship by early December only if ready; otherwise open Tier 2 with it, then plan the evergreen angle (birthdays, thank-yous, hosting gifts) and an October refresh next year.

**Phase 2: Tier 2 (10), roughly weeks 6 to 14 after launch**
Order: **A16 picnic and A13 day-out bag** first (publish in January so they can be indexed and pinned from February for spring; vendor guidance is 30 to 60 days ahead), then **A14 and A15** (Sporty, after the paddle, balls, shoes and bag are verified), then **A19, A21, A17, A18** (winter indoor making and cosy, in season), then **A20, A22**.

**Phase 3: Tier 3 (8), after 60 to 90 days of data.** A23, A24, A25, A26, A27, A28, A29, A30. Promote a piece only if its cluster shows impressions in Search Console or saves/outbound clicks on Pinterest (UNMEASURED today; the owner sets thresholds). **Drop it from the calendar** if its cluster shows nothing after the first pins.

**Cadence:** at most two new articles a week; each article passes the pipeline (brief, verified research, shortlist 80+, Cowork listing check, photography, draft, QA) before it ships. **Do not ship an article whose products are unverified;** publish editorial-only variants only for pillars.

**Measurement hooks:** primary phrase impressions (Search Console, once live), Pinterest saves and outbound clicks per pin concept, Amazon outbound clicks per article (the site already tracks events). All UNMEASURED now; none is a promise.

---

## 9. Internal linking map

Rules: three 'read next' links at most; one primary tool CTA (section 7.3); each flagship links to its collection page and the collection links back; a specialist always links up to its flagship; pillars link down to flagships; no link to an unpublished piece (back-fill at publish).

| From | Read next (max 3) | Collection page | Hobby page(s) |
|---|---|---|---|
| A01 | A02, A24, A20 | Paper Edit | junk-journaling |
| A02 | A01, A24, A27 | Paper Edit | junk-journaling |
| A03 | A20, A07, A30 | Creative Edit | air-dry-clay |
| A04 | A13, A30, A20 | Creative Edit | watercolor-painting |
| A05 | A06, A12, A07 | Hosting Edit | mahjong |
| A06 | A05, A12 | Hosting Edit | mahjong |
| A07 | A25, A12, A04 | Hosting Edit | craft-nights |
| A08 | A21, A24, A26 | Cozy Edit | reading |
| A09 | A10, A22, A12 | all six (via quiz) | about 12 hobby pages |
| A10 | A09, A21, A08 | Cozy / Creative | reading, jigsaw-puzzles |
| A11 | A01, A03, A05 (and the box articles) | all six | matching hobby |
| A12 | A05, A07, A25 | Hosting Edit | mahjong, craft-nights, book-clubs |
| A13 | A16, A28, A04 | Little Adventures Edit | picnicking |
| A14 | A15, A23, A29 | Sporty Edit | pickleball |
| A15 | A14, A23 | Sporty Edit | pickleball, tennis |
| A16 | A13, A28, A21 | Little Adventures Edit | picnicking |
| A17 | A20, A18, A30 | Creative Edit | embroidery |
| A18 | A20, A10, A17 | Creative Edit | crochet |
| A19 | A21, A30, A11 | Creative Edit | flower-arranging |
| A20 | A03, A17, A18 | Creative Edit | five craft hobby pages |
| A21 | A08, A26, A19 | Cozy Edit | reading, jigsaw-puzzles |
| A22 | A09, A10 | quiz | directory |
| A23 | A14, A15, A29 | Sporty Edit | tennis |
| A24 | A08, A02, A01 | Paper Edit | reading |
| A25 | A07, A12, A20 | Hosting Edit | craft-nights |
| A26 | A21, A12, A08 | Cozy Edit | jigsaw-puzzles |
| A27 | A01, A02 | Paper Edit | calligraphy, creative-writing |
| A28 | A13, A16, A21 | Little Adventures Edit | picnicking, thrifting, museum-exploring |
| A29 | A14, A23, A09 | Sporty Edit | pickleball, tennis, yoga-for-beginners |
| A30 | A03, A04, A02 | Creative Edit | air-dry-clay, watercolor-painting, junk-journaling |

---

## 10. Old URLs and recommended treatment

Evidence note: the repo says the site is pre-revenue and not yet public, so I know of no external links or search equity for any old URL. 'Valuable' therefore means the slug already matches a real query phrase or is a clean description. No redirect should go live until its replacement is published and approved; until then **the old page stays**. Redirect destinations are only pages that genuinely answer the same need.

| # | Old slug (live path `/journal/<slug>`) | Treatment | New article |
|---|---|---|---|
| 1 | active-hobbies-for-women-who-dont-love-the-gym | KEEP slug for the replacement | A29 |
| 2 | affordable-hobbies-under-25 | 301 to A09 (budget filter lives there) | A09 |
| 3 | at-home-creative-weekend | KEEP slug | A30 |
| 4 | cheap-weekend-adventures | 301 to A28 | A28 |
| 5 | cozy-solo-dates-at-home | KEEP slug | A21 |
| 6 | creative-hobbies-you-can-start-at-home | 301 to A09 | A09 |
| 7 | creative-hobby-starter-kits-worth-considering | 301 to A20 | A20 |
| 8 | cute-weekend-plans-that-arent-brunch (draft, never live) | KEEP slug for the replacement; no redirect needed | A28 |
| 9 | flower-arranging-as-a-hobby | 301 to A19 | A19 |
| 10 | girls-night-ideas-that-arent-drinks | 301 to A12 | A12 |
| 11 | hobbies-to-try-when-life-feels-like-work-sleep-repeat | 301 to A09 (or keep this slug for A09: see open question 3) | A09 |
| 12 | how-to-find-a-hobby-as-an-adult | KEEP slug | A22 |
| 13 | how-to-get-into-recreational-cycling-as-an-adult | KEEP old page until approved; then 301 to A29 (cycling becomes one sourced section) | A29 |
| 14 | how-to-host-a-craft-night | KEEP slug | A25 |
| 15 | how-to-host-a-mahjong-night | KEEP slug | A05 |
| 16 | how-to-host-a-paint-night-at-home | KEEP slug | A07 |
| 17 | how-to-plan-a-perfect-picnic | KEEP slug | A16 |
| 18 | how-to-plan-a-solo-saturday | 301 to A28 | A28 |
| 19 | how-to-start-a-book-club | KEEP old page until replacement approved; then 301 to A12 only if A12's book-club-night section is substantial; otherwise retire without redirect | A12 |
| 20 | how-to-start-a-reading-journal | KEEP slug | A24 |
| 21 | how-to-start-air-dry-clay | KEEP slug | A03 |
| 22 | how-to-start-crocheting | KEEP slug | A18 |
| 23 | how-to-start-embroidery | KEEP slug | A17 |
| 24 | how-to-start-junk-journaling | KEEP slug | A02 |
| 25 | how-to-start-playing-tennis-as-an-adult | KEEP slug | A23 |
| 26 | how-to-take-yourself-on-a-solo-coffee-shop-date | 301 to A28 (solo outings section) | A28 |
| 27 | junk-journaling-supplies-for-beginners | KEEP slug | A01 |
| 28 | low-energy-hobbies | 301 to A10 (energy-level menu) | A10 |
| 29 | make-friends-as-an-adult-through-hobbies (draft, never live) | RETIRE the draft; no redirect, no replacement | none |
| 30 | pickleball-for-beginners | KEEP slug | A14 |
| 31 | solo-date-ideas | 301 to A28 | A28 |
| 32 | things-to-do-after-work-instead-of-scrolling | KEEP slug | A10 |
| 33 | things-to-do-on-the-weekend | 301 to A28 | A28 |
| 34 | watercolor-painting-for-beginners | KEEP slug | A04 |

Totals: 19 slugs kept (one is an unpublished draft), 14 redirects (12 straightforward; #13 cycling and #19 book club are conditional on approval), 1 draft retired. **New slugs:** A06, A08, A09, A11, A12, A13, A15, A19, A20, A26, A27 (11 new). 19 kept plus 11 new = 30.

---

## 11. Original topics: kept, merged, dropped

**Kept as strongest opportunities (and why):** the signature-experience topics that had an old article (clay, junk journaling, watercolor, embroidery, crochet, flowers, mahjong night, paint and craft night, picnic, pickleball, tennis) are kept because the owner designated them signature experiences (so each needs an anchor) **and** because the old titles matched exact query phrases I could see on the SERP ('how to host a mahjong night', 'paint and sip at home', 'pickleball for beginners', 'things to do after work instead of scrolling'). I am not keeping any of them out of obligation: A03 is new in format (three ordered projects), A01 and A02 are now two pieces with distinct jobs, and A05 and A07 are complete itineraries. **Also kept:** after-work (the brand's literal name), find a hobby (the quiz bridge), cozy solo date (the most on-brand evening), creative weekend (a brand concept), reading journal (strong visual format), active hobbies (a Sporty hub).

**Merged into pillars:** '35 hobbies', 'affordable hobbies', 'creative hobbies at home' into A09; five weekend and solo pieces into A28; 'low-energy hobbies' into A10; the book club into A12.

**Dropped:** see section 12.

---

## 12. Topics I rejected and why

| Topic | Why not |
|---|---|
| '35 hobbies' as a 35-item list | Generic list; head term owned by large publishers; high upkeep. Replaced by a decision guide (A09). |
| Standalone 'how to start a book club' | SERP led by NPR, Penguin Random House, Book Riot, SignUpGenius, AARP and libraries; low commercial value; book commission rates are an open question. Folded into A12 and A08. |
| 'How to make friends as an adult through hobbies' | Health and psychology brands own it (Cleveland Clinic, Psychology Today, UHC, Calm); no commerce; claims out of scope for the brand voice. |
| Standalone recreational cycling | Cycling brands and magazines dominate; helmet and safety gear are sensitive; not a signature experience. Kept only as a sourced section in A29. |
| Standalone 'solo date ideas' | Head term owned by large publishers; subsumed by A28 and A21 (can be split later if data supports it). |
| 'Things to do this weekend' | Local intent; not winnable by a national site. |
| Standalone scrapbooking article | Same three product types as junk journaling; adds a page, not a product (A2). Folded into A01. |
| Birdwatching, hiking, binoculars and trail gear guides | Authority-heavy competition (not SERP-read; rejected on fit and risk); safety-sensitive; not signature. Revisit only on data. |
| Friendship bracelets, other fad crafts | Trend-driven, short shelf life, poor evergreen fit. |
| Candle-making and soap-making project guides | Process-safety risk; unsourced; outside the signature set. |
| Cricut, sewing machines and other big machines | High ticket but outside the experiences, return-prone, quick obsolescence. |
| 'Best X of the year' roundups, 'under $N' lists, deals | No testing to back 'best'; price text and year slugs create constant upkeep; violates the plan's no-unsupported-'best' rule. |
| Alcohol-led content (wine accessories, cocktails) | Brand and platform risk; 'girls' night in' stays alcohol-agnostic. |
| Journal prompts, self-care or mental-health explainers | Health claims out of scope; weak commerce. |
| Printables, planners and downloadable templates | The plan bans printables and newsletters; no list-building path. |
| Holiday-dated crafts and seasonal gift roundups | Evergreen rule; A11 is the one controlled exception. |
| 'Side hustle from your hobby' | Contradicts the brand philosophy (a life, not a hustle). |
| Pottery wheel and kiln studio guides | Not an Amazon basket and not what air-dry clay readers want. |
| Language learning, volunteering | No Amazon products; stay as directory entries only. |
| A standalone puzzle article at launch | Real topic but publisher-owned SERP; moved to Tier 3 (A26). |
| A paddle shootout or racquet ranking | Cannot test; models churn; would require unsupported 'best' claims. |

---

## 13. Open questions for the owner

1. **Count:** approve 30 in three tiers, or Tier 1 only (12) for launch? (My recommendation: Tier 1 then data.)
2. **Do the tiers go to the pilot gate as written?** Pilots are A03, A01, A05 and A09; or swap A09 for A08?
3. **Slugs:** are you content to rename the '35 hobbies' slug to `hobbies-for-busy-women` (301)? The old slug is long and quirky; I find no URL equity. Also confirm no old URL has real inbound links or index history (the repo says not public).
4. **'Best' wording:** confirm no 'best' in titles or slugs (I used 'how to choose', 'edit', 'starter'), accepting we forgo some 'best X' phrase matching.
5. **Photography:** who produces the original photography, and how many styled shoots per month are realistic? It decides whether Tier 1 includes A02, A05, A06, A07, A11 (the high-burden ones).
6. **Pinterest:** is an account being created, and can someone check Pinterest search suggestions and Trends for the Tier 1 phrases before commissioning? (I could not.)
7. **Gift guide timing (A11):** ship in early December if ready, or hold for next October?
8. **Books and commission rates:** reading and the reading nook link to books. Please confirm Amazon's category rates and any restrictions before we feature books (I did not verify rates; UNVERIFIED).
9. **Alcohol:** confirm the Hosting Edit stays alcohol-agnostic (no wine or cocktail products).
10. **Sporty:** are you comfortable with the position that tennis recommends renting or borrowing first and names no racquet until a verified adult-beginner racquet exists?
11. **Cycling:** confirm folding it into A29 as a sourced section rather than a standalone article.
12. **Puzzles and scrapbooking:** confirm both stay folded (A26 in Tier 3; scrapbooking into A01) unless search data later says otherwise.
13. **Letters (A27):** is a Pen Pals experiment worth a Tier 3 slot given the only demand signal is Pinterest's own year-old claim?
14. **Collection names and slugs:** the collection routes are still the old eight; confirm Stage 3 will deliver the six before any article links to them.

---

## 14. Six-line summary

1. Commission **30 articles in three tiers (12 / 10 / 8)**; ship Tier 1 and stop for data; 18 flagships, 6 pillars, 6 specialists; 10 formats so nothing looks alike.
2. **Every one of the 12 experiences and 6 collections is covered**, with one primary tool call to action per article (Make Plans, quiz, or the collection).
3. **11 new slugs, 19 old slugs kept (every body rebuilt), 14 redirects, 1 draft retired**; no redirect goes live before its replacement is approved.
4. **Search, trends, traffic and Pinterest performance are all UNMEASURED** (no volume or Pinterest data available); the evidence is a live SERP read of about 37 queries and Pinterest Predicts 2026 (only 'Pen Pals' applies).
5. **Cozy, Sporty and Little Adventures have zero verified products today**; their flagships are gated on verification and the Cozy gate has a bench swap (A19).
6. **Weakest bets, stated plainly:** A12, A22, A28 and A30 are hub, funnel or Pinterest pieces with weak search; A06, A11, A14 and A15 carry the highest product upkeep.


## Appendix: scoring legend

| Key | Criterion | What a 5 means |
|---|---|---|
| AD | Audience desirability | She would actively want this on her phone this week |
| BA | Brand alignment | Unmistakably Plans Past Five (after five, making a life, hobbies, plans, shopping) |
| SO | Organic search opportunity | Visible gap or thin/low-trust results for the query, winnable by a new site |
| PM | Pinterest marketability | Strong, repeatable pin visuals and a save-worthy asset (UNMEASURED; judgement) |
| CP | Commercial potential | Several everyday or higher-ticket Amazon items a reader would genuinely buy |
| PF | Product research feasibility | Desirable products are known to exist on Amazon and can pass the 80/90 gates |
| EA | Emotional appeal | Evokes a feeling (calm, belonging, pride) rather than only information |
| VS | Visual storytelling | The story can be told in photographs, not only text |
| CU | Customer usefulness | She can complete something or make a decision by the end |
| EV | Evergreen value | No dates, trends or seasons that expire |
| LM | Low maintenance | Few product slots, no price text, no annual refresh |
