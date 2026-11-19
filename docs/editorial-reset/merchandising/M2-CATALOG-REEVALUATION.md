# M2. Catalog re-evaluation under Standard 000 (retail buyer pass)

Date 2026-11-19. Branch editorial-reset. Read-only buyer review. Companion file: `M2-CATALOG-REEVALUATION.csv` (80 rows, one per product, with every score, evidence phrase, alternatives and the eight desirability answers).
Scope: all 66 records in `docs/commerce/product-research.csv`, plus the distinct products from `buy-plan/VERIFIED-ADDITIONS.csv` (13 rows = 11 distinct new products, 1 duplicate of rec 48 TableTopics, 1 duplicate row of Clever Fox) and `buy-plan/VERIFIED-QUEUE*.csv` (4 rows = 3 new products; the Penn row duplicates rec 58 under a different ASIN). Total evaluated: 80 products.

## 1. Read this first: what the evidence does and does not support
- Nothing was approved because it was previously verified. Prior verification only checked that a listing exists and matches its title (FINAL-LISTING-VERIFICATION.csv). It did not test, handle or compare any product. No row here rests on hands-on testing, and none claims it.
- Scores are internal editorial judgements, not public ratings. Where the file or my searches held nothing on a dimension, the evidence phrase says INSUFFICIENT EVIDENCE or lists the gap and the score is conservative.
- Web research this session: about 24 WebSearch queries and 4 maker-page fetches across all priority categories (clay, watercolor, embroidery, crochet, mahjong, junk journaling, tennis, pickleball, picnic, puzzles, hosting, plus cozy items). Honest limits: the search tool returned mostly affiliate roundups ("tested picks" pages that publish no method) and retailer pages. Direct maker-page fetches succeeded only for selkirk.com; the National Mah Jongg League store, Winsor & Newton and Clover URLs I tried returned 404. So "maker verified" is rare in this file. Roundup consensus is treated as weak evidence, never as testing.
- Alternatives named with `[unverified]` come from general category knowledge and were not confirmed by any source this session. Treat them as research leads, not recommendations.
- No ASINs, prices, ratings or review text were invented. ASINs shown are exactly those already in the repo files. Where a price is quoted it is a price a named web source showed and is flagged as such; the Standard says no prices are shown to readers, so these are buyer context only.
- Price band (Entry / Mid / Premium) is my editorial positioning relative to the category, not a verified price.
- Affiliate status: Amazon Associates is "not-activated" for every row. An ASIN that was not in FINAL-LISTING-VERIFICATION is marked UNVERIFIED. Per Standard 000 a superior product without an affiliate route may still be recommended unmonetised; that is noted where relevant (Oh My Mahjong, Barefoot Dreams, mt).
- Imagery: no product photo right exists for any record (ASSET-RIGHTS-REGISTER: "Product photos: none used; no documented right"; permission emails in `docs/commerce/photo-permission-emails.md` are unsent). Route for all: written maker permission, or compliant affiliate imagery after Associates activation; otherwise text-only. Generated imagery must not stand in for any branded product.

## 2. Result: small and exceptional, not large
**No product clears 90, so no record is classified FLAGSHIP SELECTION on current evidence.** The highest score is 87 (NMJL card). Three records are named as flagship candidates (see 6) and become flagships only if the missing maker evidence is found.

| Classification | Count |
|---|---|
| FLAGSHIP SELECTION | 0 |
| APPROVED SUPPORTING PRODUCT | 8 |
| RESEARCH FURTHER | 13 |
| REPLACE | 23 |
| REJECT | 36 |
| **Total evaluated** | **80** |

Totals per collection (collection assigned by buyer; the CSV `collections` field in product-research.csv still uses old names such as journaling-era and girls-night-in, which do not map to the six editions):

| Collection | Flagship | Approved | Research further | Replace | Reject | Total |
|---|---|---|---|---|---|---|
| Paper | 0 | 0 | 5 | 3 | 11 | 19 |
| Creative | 0 | 3 | 4 | 10 | 13 | 30 |
| Cozy | 0 | 0 | 0 | 4 | 1 | 5 |
| Hosting | 0 | 2 | 2 | 3 | 8 | 15 |
| Sporty | 0 | 3 | 1 | 2 | 3 | 9 |
| Little Adventures | 0 | 0 | 1 | 1 | 0 | 2 |

Placement notes: mahjong and paint night live in Hosting; picnic and cooler in Little Adventures; puzzle, throw, candles, tea and book light in Cozy; reading journals and pens in Paper; clay, paint, watercolor, embroidery, crochet, flowers and bracelets in Creative. Flowers could equally sit in Cozy; no flower product survived anyway.

## 3. Data defects found in the source files (fix before any import)
- product-research.csv rec 66 (STAEDTLER) has manufacturerUrl pointing to Sakura: wrong brand.
- Rec 58 Penn Championship uses ASIN B0002JZEL4 while the queue verifies B000T21OJU for the same product; pack size unresolved.
- Rec A12 Clever Fox has two rows with the same id (second says "NOT FOUND (12-set)", different ASIN). Rec A10 TableTopics duplicates rec 48 (same ASIN B01M4NYEG9).
- Rec A11's row name embeds "(52 reviews, green)": review counts are not a quality claim and the Standard forbids unsupported rating content.
- Selkirk A1 is named "SLK Dauntless"; selkirk.com's beginner view lists SLK Valkyrie and SLK Geo and does not describe Dauntless. Confirm the model before anything is written.
- Of the 66 original records, 37 were "verified" and 29 "candidate". After re-evaluation, of the 37 verified only 2 are approved and 6 stay in research; 16 are rejected and 13 replaced. Verification is not endorsement.

## 4. Approved supporting products (8) with the eight desirability answers
Eight questions in order: 1 why she wants it; 2 better than alternatives; 3 recommend without commission; 4 easier/enjoyable/beautiful; 5 fair price; 6 comfortable recommending to a friend; 7 complements the collection; 8 strengthens credibility. "Fair price" is a judgement relative to category norms; no price was verified.

- **2026 Mahjong Large Size Cards, Four-Pack Bundle** (Hosting, Entry, score 87). Q1 she wants it: cannot play without it. Q2 only official source of the annual hands. Q3 yes: sold by the League. Q4 yes: it is the game. Q5 fair: League price. Q6 yes. Q7 anchors the Mahjong Night kit. Q8 official source adds credibility. Conditions: Year-specific (2026): replenishable each year; confirm 2027 card timing. American mahjong only. League store page not reachable by our fetch (404), so confirmed only via verification file and retailer pages
- **2026 Mahjong Standard Size Cards, Four-Pack Bundle** (Hosting, Entry, score 85). Q1 she needs it. Q2 official, only source. Q3 yes. Q4 yes: it is the game. Q5 fair. Q6 yes. Q7 anchors kit. Q8 official source. Conditions: Present as a size variant of rec 13, not a second recommendation; year-specific
- **Selkirk Sport SLK Dauntless Pickleball Paddle (widebody)** (Sporty, Mid, score 81). Q1 a recognised paddle brand gives confidence. Q2 USAPA-approved by the maker, sold direct. Q3 yes, brand-direct. Q4 yes: forgiving shape. Q5 mixed buyer view: verify at purchase. Q6 yes. Q7 anchors Sporty. Q8 maker-sold listing adds credibility. Conditions: Confirm Dauntless fits beginner range before use; mixed value-for-money buyer view
- **Winsor & Newton Galeria Acrylic Paint, 20 x 12 ml tubes** (Creative, Mid, score 80). Q1 reliable colours for paint nights. Q2 brand trust vs generic sets. Q3 yes. Q4 yes: better colour range. Q5 fair. Q6 yes. Q7 serves paint night and clay painting. Q8 brand-direct seller. Conditions: Small tubes for large canvases; maker page not read
- **Winsor & Newton Cotman Watercolor Paint Set, Sketchers' Pocket Set** (Creative, Mid, score 85). Q1 portable and giftable. Q2 trusted maker and roundup consensus. Q3 yes. Q4 yes: more beautiful starting palette. Q5 fair. Q6 yes. Q7 anchors watercolor kit. Q8 maker-sold. Conditions: Maker page 404 on our fetch, so set contents (brush? lightfastness?) NOT verified; some buyers report smaller than expected and cracked pans. FLAGSHIP CANDIDATE if W&N page confirms contents and certification
- **Franklin Sports X-40 Outdoor Pickleballs - USAP Approved** (Sporty, Entry, score 80). Q1 she needs balls. Q2 USAP-approved standard outdoor ball. Q3 yes. Q4 yes. Q5 fair. Q6 yes. Q7 pairs with paddle. Q8 recognised ball. Conditions: Buyers report cracking; seams; cold-weather brittleness; confirm approval on USA Pickleball list
- **HEAD Ti S6 Tennis Racket** (Sporty, Mid, score 80). Q1 first racquet that is easy. Q2 consensus beginner pick vs Babolat and Wilson. Q3 yes. Q4 yes. Q5 ok. Q6 yes. Q7 anchors tennis. Q8 consensus pick. Conditions: Head-heavy; mixed durability; many courts rent racquets, try first; grip size must be chosen
- **Clover 1047/H Deep Blue Amour Crochet Hook, Size H, 5.0mm** (Creative, Mid, score 80). Q1 comfort during long sessions. Q2 roundup consensus vs Boye/Furls. Q3 yes. Q4 yes: no cramping. Q5 fair. Q6 yes. Q7 anchors crochet kit. Q8 category benchmark. Conditions: Seller is third-party KIVOX STORE; confirm size labels H-8 / 5.0 mm

Conditions that apply to all eight: confirm the live listing and seller at the time of build; manufacturer page to be read where noted; no photography until permission exists.

## 5. Research further (13): what must be resolved before any approval

- **Glue Stick, Photo-Safe Adhesive, 1.41 oz, 4-Pack** (Paper, 74). Open question: Do not claim photo-safe; wrinkles thin paper; not for bulky 3D items. Exception to the below-80 rule: adhesive slot is essential and one question (maker claim) is cheap to resolve
- **Pigma Micron Fineliner Pens, Black, Assorted Points, 8 Pack** (Paper, 78). Open question: Authenticity risk via reseller; resolve by finding sold-by-Amazon or Sakura-authorised listing
- **A5 Hardcover Blank Notebook, 120gsm, 180 Pages, Black** (Paper, 74). Open question: Heavy glue/wet media may still warp (untested). Exception to the below-80 rule: the base journal is the Paper hero slot and has the heaviest stock in the file
- **Watercolor Paper Pad, 140 lb, Cold Press, 9 x 12 in** (Creative, 75). Open question: Third-party seller of a premium brand; not first-purchase. Exception: legitimate upgrade-tier anchor
- **Simply Soft Yarn, Feathered Gray, 3-Pack** (Creative, 76). Open question: Colour variant; pack size varies. Exception to below-80: yarn slot needed; maker page is a quick fix
- **Stretched Canvases for Painting, 8 x 10 in, 10 Pack** (Hosting, 74). Open question: Commodity; exception to below-80: simple to verify specs and seller (CLOYAN). Ten may exceed a small group
- **Book Club Conversation Cards for Adults** (Hosting, 78). Open question: Questions generic; card count not captured. Also appears as rec A10 (same ASIN B01M4NYEG9): one product
- **Extra Large Picnic Blanket, 80 x 80 in, Waterproof, Gingham** (Little Adventures, 77). Open question: Hero slot of the picnic kit; 'waterproof' and washable are listing claims. Exception to below-80: lead candidate needing verification
- **Scotch Tape Runner Extra Strength, 0.31 in x 11 yd** (Paper, 72). Open question: Permanent: cannot be lifted. Exception to below-80: adhesive slot essential
- **Babolat Boost Drive Strung Tennis Racquet (Blue, 4 3/8" grip)** (Sporty, 78). Open question: INSUFFICIENT EVIDENCE on reviews; limited stock; may serve as alternative to Q2
- **Sakura Koi Pocket Field Sketch Kit, 24 colors** (Creative, 77). Open question: Authenticity/seller risk
- **DAS Modeling Clay Air Hardening, White, 2.2 lb** (Creative, 80). Open question: Do not call food-safe; INSUFFICIENT EVIDENCE on maker/safety. Lead clay candidate
- **Kunitsa Co. The Reading Journal (52 reviews, green)** (Paper, 77). Open question: '52 reviews' in the row name is not a quality statement; INSUFFICIENT EVIDENCE on maker; stock/ASIN fine

Rule exception: some rows score 76 to 79 and are kept in research rather than dropped because the slot is essential (adhesive, base journal, yarn) and the open question is cheap to resolve. Each states this. If research does not resolve them, they drop.

## 6. Flagship candidates (not yet flagships)
- Winsor & Newton Cotman Sketchers' Pocket Set (85): needs W&N page for contents (brush, mixing, lightfastness) and the cracked-pan complaint checked.
- NMJL 2026 card (87, large and standard as one product): near-certain; needs League page read and 2027 card timing.
- A design-led American mahjong set (slot currently empty): the Hosting hero. Candidates are in section 8.

## 7. Replace (23) and Reject (36)
**Replace** means the slot is needed but this product is not the answer. **Reject** means the slot is filled, not needed, or the product is unfit (kid-marketed, unbranded volume pack, duplicate, hazard, no evidence).

| Ref | Product | Total | Class | Reason / replacement candidate |
|---|---|---|---|---|
| 1 | Washi Tape Set, 21 Rolls, Assorted Sizes, Floral | 69 | REPLACE | Mixed seasonal prints; unknown brand; INSUFFICIENT EVIDENCE on adhesive. Candidate: mt masking tape (verify US retailer, ASIN, tape width sets) |
| 2 | Slim Washi Tape Gift Box Set, 40 Rolls, 10 mm (Minimalist) | 76 | REPLACE | Single 10 mm width; variant selection risk; INSUFFICIENT EVIDENCE on maker. Candidate: mt masking tape neutral/slim sets (verify); may return as budget option if maker page verified |
| 3 | Blank Journal Notebook, 160 Pages, Medium 5.6 x 8 in (Blush) | 71 | REPLACE | 100 gsm will warp with glue-heavy pages (our own limitation note); superseded by rec 24 on paper weight. Candidate: Rec 24 (120 gsm) or a heavier mixed-media journal (verify) |
| 5 | 6061 Double Sided Adhesive Roller Tape Runner, 0.27 in x 26 ft, Pack of 3 | 57 | REJECT | Seller Product Movement third party; claim conflict; superseded by rec 65. Candidate: Rec 65 |
| 6 | 200 Piece Vintage Ephemera Bundle, Cottagecore (Pastel/Earthy Tones) | 51 | REJECT | Contradicts 'paper with a past' editorial advice; held as filler in the file; likely printed/reproduced imagery rights unclear. Candidate: Real vintage/ephemera sourced from independent sellers (research); no Amazon bundle |
| 8 | Air Dry Clay, 5 lb | 58 | REPLACE | Kid marketing; do not call finished pieces food-safe. Candidate: DAS (rec A9) |
| 9 | Acrylic Paint Set, 15 x 12 ml Tubes | 67 | REJECT | Slot filled by Galeria (rec A4). Candidate: Rec A4 |
| 10 | Spray Acrylic Sealer, 12 oz, Gloss | 60 | REPLACE | Ventilation/respirator advice conflicts with a calm at-home hosting tone; not food-safe. Candidate: A brush-on water-based varnish from a known maker (Mod Podge brush-on, Liquitex varnish) [verify] |
| 11 | American Mahjong Set with Blue Carrying Bag, 166 White Tiles, 4 All-in... | 64 | REJECT | Adds a decision, not a new option. Candidate: See rec 12 |
| 12 | American Mahjong Tile Set, 166 Blue Tiles, Bag and Accessories, 4 All-... | 72 | REPLACE | Only American 166-tile; third-party seller; INSUFFICIENT EVIDENCE on tile quality. This is the hero slot of the mahjong kit and deserves a design-led, verified choice. Candidate: Yellow Mountain Imports Little Birdie / Linda Li / Gustaria (verify) ; aspirational Oh My Mahjong unmonetised |
| 14 | Large Mahjong Mat with Black Carrying Bag (Blue, 31.5 in) | 69 | REPLACE | 31.5 in suits a small table only; may arrive creased. Candidate: Mat from the chosen set maker or specialist retailer [verify] |
| 15 | Air Dry Clay Kit for Adults, Pottery Set for Beginners | 72 | REPLACE | Do not call food-safe; no maker page. Candidate: A curated kit assembled from DAS + a branded paint set + tools, or a verified maker kit |
| 16 | Air Dry Clay Tools, Pottery Clay Tool Kit (Ages 8+) | 47 | REJECT | Audience mismatch. Candidate: None |
| 17 | Vibrant Spectrum Acrylic Craft Paint, 16 Assorted Matte Colors, 2 fl oz | 58 | REJECT | Duplicate. Candidate: Rec A4 |
| 18 | American Mahjong Set, 166 Tiles, 4 Walnut Wooden Racks, Blue Bag | 68 | REJECT | Duplicate decision; superseded by rec 12 research. Candidate: See rec 12 |
| 19 | Grid Washi Tape Set, 14 Rolls, 15 mm | 50 | REJECT | Adds a decision, not a look. Candidate: None |
| 20 | Washi Tape Set, 10 Rolls, 5.5 Yards/Roll, Four Seasons | 50 | REJECT | Duplicate. Candidate: None |
| 21 | Scrapbook Tape, Glue Tape for Crafts, 4 Pack, 0.3 in x 26 ft | 47 | REJECT | Duplicate. Candidate: None |
| 22 | 460 Sheets Vintage Scrapbook Paper Kit | 49 | REJECT | Reproduced imagery rights unclear; contradicts editorial advice to use real ephemera. Candidate: None |
| 23 | 200 Sheets Vintage Scrapbook Paper, Journaling Supplies | 49 | REJECT | Same rights concern. Candidate: None |
| 25 | Felt Game Table Cover, 36 x 36 in, Blue | 57 | REJECT | Duplicate slot with mat. Candidate: None |
| 26 | Protective Sleeve for 2025-2026 Mahjong Cards, Large Size, 4 Pack | 42 | REJECT | Unnecessary item; card replaced yearly. Candidate: None |
| 28 | 48 Colors Watercolor Paint Set, 3 Brushes | 59 | REJECT | Quantity over quality; INSUFFICIENT EVIDENCE. Candidate: Rec A5 |
| 29 | 8pc Round Watercolor Brush Set, Goat Hair | 66 | REPLACE | Round only, no flat. Candidate: A branded student watercolor brush set [verify] |
| 30 | 12pc Round Watercolor Brushes (Nylon) | 55 | REJECT | Duplicate. Candidate: None |
| 32 | Watercolor Paper Pad, 9 x 12 in, 140 lb/300 gsm, 20 Sheets | 59 | REPLACE | Variant issue. Candidate: Strathmore 300 Series [verify Amazon listing/ASIN] |
| 33 | Classic Embroidery Learning Kit for Adults and Kids | 74 | REPLACE | INSUFFICIENT EVIDENCE on kit quality; no stamped-pattern vs blank fabric detail. Candidate: DMC Mindful Making or Dimensions or Sublime Stitching starter [verify] |
| 34 | 304 Pack Embroidery Kit, 200 Colors, 5 Bamboo Hoops, 2 Aida Cloth | 51 | REJECT | Quantity over quality; fabric mismatch for embroidery. Candidate: None |
| 35 | Embroidery Scissors, Stork, 2 Pcs, 3.6 in, Gold | 63 | REPLACE | Sharp: keep from children. Candidate: Gingher / Fiskars stork scissors [verify] |
| 36 | Embroidery Scissors, Stork Scissors, with Synthetic Leather Case | 56 | REJECT | INSUFFICIENT EVIDENCE. Candidate: Gingher |
| 37 | Crochet Hooks 12 Sizes Set, 51 Pack, 2.0-8.0 mm | 44 | REJECT | Unbranded; quantity over quality. Candidate: Rec Q3 |
| 38 | Crochet Hooks Set, 12 Sizes, 44 Pcs, Ergonomic Rubber Handles | 44 | REJECT | Listing markets for arthritis (marketing, not medical). Candidate: Rec Q3 |
| 39 | Super Saver Yarn, White, Single Skein | 70 | REJECT | One skein small; superseded by rec 40 for softness and quantity. Candidate: Rec 40 |
| 41 | Professional Artist Paint Brush Set of 12, Acrylic and Watercolor | 69 | REPLACE | Oil mention untested. Candidate: Princeton/Royal Langnickel [verify] |
| 42 | Acrylic Paint Brushes Set, 12pcs Round-Pointed Tip | 52 | REJECT | Duplicate. Candidate: None |
| 44 | Stretched Canvas for Painting, 8 x 10 in, 5 Pack | 68 | REJECT | Pack-size variant of rec 43, not a separate product. Candidate: Rec 43 |
| 45 | Beautiful Reading Journal for Book Lovers, Hard Cover Tracker | 68 | REJECT | Superseded by rec A11 which has a sentiment summary. Candidate: Rec A11 |
| 46 | InkJoy Gel Pens, Fine Point 0.5 mm, Assorted Colors, 14 Count | 60 | REJECT | Not distinctive. Candidate: None |
| 47 | 19 LED Rechargeable Book Light for Reading in Bed | 64 | REJECT | Functional gadget, not an aspirational Cozy product; Glocusent has more amber-specific praise. Candidate: A design-led lamp (gap) |
| 49 | Small Ceramic Bowls Set of 4, White | 60 | REPLACE | Inconsistent listing data. Candidate: Design-led small dishes [to research] |
| 51 | 24/30/60 Can Soft Cooler Bag, Double Deck | 68 | REPLACE | Variant ambiguity; unremarkable. Candidate: Design-led soft cooler from a known maker (Yeti, Hydro Flask [unverified]) |
| 52 | Flower Scissors, Floral Shears, Stainless Steel Pruner | 61 | REPLACE | Cannot cut woody stems. Candidate: Floral snips from a known maker [verify] |
| 53 | 12pcs Glass Bud Vases, Clear, Vintage Pattern | 59 | REPLACE | Quantity over quality. Candidate: Design-led bud vase trio (research gap) |
| 54 | 4 Pcs Flower Frog Pin Holder Set, 1/2/3 in | 51 | REJECT | Sharp copper pins; unbranded. Candidate: None |
| 55 | Pickleball Paddles Set of 2, USAPA Approved Fiberglass, Balls and Bag | 65 | REPLACE | Do not repeat 'USAPA approved' unless checked on the USA Pickleball list. Candidate: Selkirk SLK paddle (rec A1) or Onix Z5 [verify] |
| 56 | 6-Pack Pickleball Balls, USAPA Approved, 40-Hole Outdoor/Indoor | 61 | REJECT | Superseded by rec Q1. Candidate: Rec Q1 |
| 57 | 27-Inch Tennis Racket for Adults with Ball and Carry Bag | 53 | REJECT | Aluminium frames for casual play; many courts rent racquets. Candidate: Rec Q2 |
| 58 | Championship Tennis Balls, Extra Duty Felt, 3 Balls (Pack of 4) | 71 | REPLACE | ASIN conflict: research row B0002JZEL4 vs queue B000T21OJU; pack-count wording ambiguous. Candidate: Wilson US Open extra duty [verify] |
| 59 | Soft Sherpa Blanket Fluffy Throw, 50 x 60 in | 71 | REPLACE | Not aspirational for the Cozy Edit. Candidate: Barefoot Dreams / Brooklinen / Parachute [verify Amazon vs maker] |
| 60 | Flameless Candles with Remote, Battery Operated, Timer 2/4/6/8H | 57 | REPLACE | Plastic look; INSUFFICIENT EVIDENCE on count. Candidate: Luminara [verify availability and a non-Disney-promo claim risk] |
| 61 | Herbal Tea Sampler Variety Pack, Caffeine Free, 18 Tea Bags | 71 | REPLACE | Allergy check; not distinctive enough for a premium edit. Candidate: Design-led tea gift (research) |
| 62 | Adult Jigsaw Puzzle 1000 Piece Mountain Cabin | 68 | REPLACE | INSUFFICIENT EVIDENCE. Candidate: Ravensburger or Galison [verify] |
| 63 | String Bracelet Making Kit, 488 Pcs, 50 Skeins Floss, 400 Beads, 37 Tools | 70 | REJECT | Small beads and sharp needles; 3 to 5 people (our estimate). Candidate: Reputable bracelet/bead maker [research] |
| 64 | 8" Heavy Duty Scissors All Purpose, 3-Pack | 51 | REJECT | Bulky. Candidate: None |
| 66 | Pigment Liner Fineliner Pens Set, Black, 8 pc Assorted Tip Sizes | 58 | REJECT | manufacturerUrl in the CSV points to Sakura, a data error. Candidate: Rec 7 |
| A2 | HEAD Gravity Tour 2025 Pickleball Paddle | 64 | REJECT | INSUFFICIENT EVIDENCE. Candidate: Rec A1 |
| A7 | Susan Bates Silvalume 5.5" Crochet Hook (US H, 5.0 mm) | 61 | REJECT | INSUFFICIENT EVIDENCE; held. Candidate: Rec Q3 |
| A8 | Mahjong Card Sleeve, fits NMJL large-size card, 4-pack (Beryl&Kai) | 44 | REJECT | Owner decision flagged 'kit slot does not exist'; unnecessary. Candidate: None |
| A12 |  | 72 | REJECT | Duplicate with rec A11; data defect. Candidate: Rec A11 |

Safety and compatibility concerns recorded: spray sealer needs respirator and eyewear (rec 10); sharp points on scissors, kenzan and needles (35, 36, 54, 64, 63); small beads (63); Aida cloth mismatch with embroidery (34); herbal tea allergens (61); "food-safe" must never be claimed for clay or sealer (8, 10, 15, A9); American-mahjong-only and year-specific card (13, 27); acrylic and "child-safe" claims are listing-only; USAPA claims on pickleball must be checked on the USA Pickleball list (55, 56, Q1).

## 8. Category research findings and alternatives considered
Sources are the URLs listed in section 12. "Roundup" means a multi-product affiliate list; treat as opinion.

**Junk journaling and paper (recs 1-7, 19-24, 65, 66, A11, A12).** Washi: mt (Kamoi Kakoshi) is the Japanese maker behind the category and the credible quality benchmark; the file's three washi sets are all unknown-brand private labels. Adhesive: sources conflict on glue sticks for photo/archival use (Florida state archives advises against them; Library of Congress prefers wheat-starch paste); we must not say photo-safe. Journal: the only evidence-based differentiator is paper weight (Stationery Island lists 120 gsm; Paperage 100 gsm; Leuchtturm1917 believed thin [unverified]). Alternatives per slot are in the CSV. Result: no washi, journal or adhesive is approved; mt and a heavier-paper journal are the research priorities.

**Air-dry clay (8, 15, 16, A9).** Roundups agree DAS is the adult-beginner pick (detail, crack resistance, paintable white), Jovi is the value pick, Crayola suits classrooms and bulk. Crayola's own FAQ pages note cracking from excess water, uneven drying, rigid armatures, and under 1/4 inch thickness; they say ACMI AP and ASTM D 4236 for its clay. No DAS maker page found. Result: DAS A9 is the lead candidate; Crayola replaced.

**Watercolor (28-32, A5, A6).** Roundups consistently name Cotman as the safest start, Koi as portable and cheaper. Paper: Strathmore 300 (12 sheets, beginner-priced), Canson XL (30 sheets), Canson Montval, Arches as the premium. Result: Cotman is a flagship candidate; Arches stays as upgrade-tier research; 48-colour sets rejected.

**Embroidery (33-36).** DMC Mindful Making, Dimensions, Sublime Stitching (one retailer lists its Ultimate kit at $48.00), Akacraft, Craftwiz. Gingher is the usual scissors recommendation. No embroidery record survives.

**Crochet (37-40, A7, Q3).** Clover Amour is the consensus hook (colour-coded, smooth glide); Boye is cheap with one misaligned-head report; Furls is wooden. Yarn: Caron Simply Soft kept for research; Lion Brand Wool-Ease has INSUFFICIENT EVIDENCE.

**Mahjong (11-14, 18, 25-27, A8).** Roundups name Gustaria (best value), Linda Li (editor's choice, wooden racks and primer book per roundups), Jongyance, Yellow Mountain Imports, ZGME, Metro. Oh My Mahjong's official site lists designer tiles at about $400 (retailer Belle & Blush $425 to $475); set contents unconfirmed. The League card is sold by the League and several retailers. League store page not reachable. Result: card approved; set slot open for a design-led choice.

**Pickleball (55, 56, A1, A2, Q1).** selkirk.com says all Selkirk and SLK paddles are USAPA-approved; roundups also name Onix Z5 (about $90), Franklin, Paddletek, Engage. Balls: Franklin X-40 (USAP-approved), CORE Outdoor (durable per one reviewer), Onix Fuse G2 (two-piece), conflicting Onix Pure 2 approval. Result: Selkirk paddle and Franklin ball approved; the rest replaced.

**Tennis (57, 58, A3, Q2).** HEAD Ti.S6 is the consensus value beginner racquet (8.1 oz, 115 sq in, head-heavy); Wilson Clash 108 is the comfort pick; Babolat Boost is recreational; Prince O3 Legacy 120 for comfort. Balls: Wilson US Open outperforms Penn Championship for durability per reviewers. Result: Ti.S6 approved with a "try first" condition.

**Picnic (50, 51).** Roundups vary widely and no premium design-led blanket was verified. ZAZE is a lead candidate only. Hosting items (49) and cozy items (59-62, 47) found design-led alternatives (Barefoot Dreams, Luminara, Ravensburger, Galison, Piecework, Glocusent amber) none verified for Amazon or monetisation.

## 9. Per-product score table (evidence per dimension is in the CSV)
D = desirability /25, U = usefulness /20, Q = quality and research /20, B = beginner /10, V = visual /10, Val = value /10, G = gift /5.

| Ref | Product | Collection | Band | D | U | Q | B | V | Val | G | Total | Class | Key evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Washi Tape Set, 21 Rolls, Assorted Sizes, Floral | Paper | Entry | 17 | 14 | 10 | 9 | 8 | 8 | 3 | 69 | REPLACE | D:pretty pastel florals but generic; Q:unknown brand, residue claim untested, no maker page |
| 2 | Slim Washi Tape Gift Box Set, 40 Rolls, 10 mm (Minimalist) | Paper | Entry | 20 | 15 | 11 | 9 | 9 | 8 | 4 | 76 | REPLACE | D:calm neutral palette fits her aesthetic; Q:private label, no maker page |
| 3 | Blank Journal Notebook, 160 Pages, Medium 5.6 x 8 in (Blush) | Paper | Entry | 18 | 14 | 11 | 8 | 8 | 8 | 4 | 71 | REPLACE | D:blush cover appealing; Q:listing only |
| 4 | Glue Stick, Photo-Safe Adhesive, 1.41 oz, 4-Pack | Paper | Entry | 18 | 19 | 12 | 10 | 4 | 9 | 2 | 74 | RESEARCH | D:a needed staple; Q:'photo safe' CONFLICT (3M attribute table says Photo Safe: No |
| 5 | 6061 Double Sided Adhesive Roller Tape Runner, 0.27 in x 26 ft, Pack of 3 | Paper | Entry | 14 | 15 | 8 | 9 | 3 | 7 | 1 | 57 | REJECT | D:no distinct appeal; Q:third-party seller, maker page not found, retailers conflict on claims |
| 6 | 200 Piece Vintage Ephemera Bundle, Cottagecore (Pastel/Earthy Tones) | Paper | Entry | 12 | 8 | 6 | 9 | 7 | 7 | 2 | 51 | REJECT | D:volume pitch, fixed cottagecore theme; Q:no maker page |
| 7 | Pigma Micron Fineliner Pens, Black, Assorted Points, 8 Pack | Paper | Mid | 21 | 17 | 15 | 9 | 6 | 7 | 3 | 78 | RESEARCH | D:category-trusted archival fineliner; Q:Sakura page confirms archival waterproof pigment ink, but 8-pack contents NOT on maker page and sold by third-party reseller (distributor says Sakura bars marketplace sales) |
| 8 | Air Dry Clay, 5 lb | Creative | Entry | 11 | 13 | 10 | 8 | 6 | 8 | 2 | 58 | REPLACE | D:kid-marketed bucket (ages 4+) is not what she wants; Q:Crayola snippet says ASTM D 4236 and ACMI AP when moist, listing cracks on thick pieces per one reviewer |
| 9 | Acrylic Paint Set, 15 x 12 ml Tubes | Creative | Entry | 15 | 15 | 10 | 9 | 6 | 9 | 3 | 67 | REJECT | D:generic; Q:no safety certification checked, no maker page |
| 10 | Spray Acrylic Sealer, 12 oz, Gloss | Creative | Entry | 13 | 14 | 13 | 6 | 4 | 8 | 2 | 60 | REPLACE | D:functional; Q:Plaid maker snippet read |
| 11 | American Mahjong Set with Blue Carrying Bag, 166 White Tiles, 4 All-in... | Hosting | Mid | 15 | 15 | 8 | 9 | 6 | 8 | 3 | 64 | REJECT | D:near-duplicate of rec 12 with white tiles; Q:private label, no maker page, third-party seller |
| 12 | American Mahjong Tile Set, 166 Blue Tiles, Bag and Accessories, 4 All-... | Hosting | Mid | 18 | 17 | 10 | 9 | 7 | 8 | 3 | 72 | REPLACE | D:complete 166-tile set is what a new group needs; Q:private label TIASUSAN, no maker page, sold by Game Trove |
| 13 | 2026 Mahjong Large Size Cards, Four-Pack Bundle | Hosting | Entry | 22 | 20 | 18 | 9 | 6 | 9 | 3 | 87 | APPROVED | D:the card is required to play American mahjong; Q:sold by the League itself (FINAL-LISTING-VERIFICATION), League is the authority |
| 14 | Large Mahjong Mat with Black Carrying Bag (Blue, 31.5 in) | Hosting | Entry | 16 | 16 | 10 | 9 | 7 | 8 | 3 | 69 | REPLACE | D:felt mat quietens tiles; Q:third-party KAREDA seller, no maker page |
| 15 | Air Dry Clay Kit for Adults, Pottery Set for Beginners | Creative | Entry | 18 | 17 | 9 | 10 | 6 | 8 | 4 | 72 | REPLACE | D:one-box beginner kit appeals; Q:third-party Ystep, no safety certification seen, drying claims untested |
| 16 | Air Dry Clay Tools, Pottery Clay Tool Kit (Ages 8+) | Creative | Entry | 10 | 10 | 6 | 8 | 4 | 7 | 2 | 47 | REJECT | D:marketed to kids 8+; Q:'child-safe' is listing-only |
| 17 | Vibrant Spectrum Acrylic Craft Paint, 16 Assorted Matte Colors, 2 fl oz | Creative | Entry | 12 | 13 | 9 | 9 | 5 | 8 | 2 | 58 | REJECT | D:plain craft-store paint; Q:exact set not on Plaid page, no safety check |
| 18 | American Mahjong Set, 166 Tiles, 4 Walnut Wooden Racks, Blue Bag | Hosting | Mid | 17 | 15 | 9 | 9 | 8 | 7 | 3 | 68 | REJECT | D:walnut racks attractive; Q:third-party seller, melamine quality unverified |
| 19 | Grid Washi Tape Set, 14 Rolls, 15 mm | Paper | Entry | 11 | 9 | 6 | 9 | 6 | 7 | 2 | 50 | REJECT | D:single pattern; Q:listing admits poor adhesion on some surfaces |
| 20 | Washi Tape Set, 10 Rolls, 5.5 Yards/Roll, Four Seasons | Paper | Entry | 11 | 9 | 6 | 9 | 6 | 7 | 2 | 50 | REJECT | D:smaller version of rec 1; Q:unknown |
| 21 | Scrapbook Tape, Glue Tape for Crafts, 4 Pack, 0.3 in x 26 ft | Paper | Entry | 11 | 10 | 6 | 9 | 3 | 7 | 1 | 47 | REJECT | D:third adhesive; Q:no maker page, cold affects stickiness |
| 22 | 460 Sheets Vintage Scrapbook Paper Kit | Paper | Entry | 11 | 9 | 4 | 9 | 7 | 7 | 2 | 49 | REJECT | D:460 sheets of vintage prints; Q:brand, weight and print quality not stated |
| 23 | 200 Sheets Vintage Scrapbook Paper, Journaling Supplies | Paper | Entry | 11 | 9 | 4 | 9 | 7 | 7 | 2 | 49 | REJECT | D:200 sheets six themes; Q:brand/material not verified |
| 24 | A5 Hardcover Blank Notebook, 120gsm, 180 Pages, Black | Paper | Entry | 17 | 17 | 11 | 9 | 8 | 8 | 4 | 74 | RESEARCH | D:thicker paper for a glue-heavy hobby; Q:listing claims on bleed-through untested, no maker page |
| 25 | Felt Game Table Cover, 36 x 36 in, Blue | Hosting | Entry | 13 | 12 | 8 | 8 | 6 | 8 | 2 | 57 | REJECT | D:fitted felt cover; Q:YuChii listing claims |
| 26 | Protective Sleeve for 2025-2026 Mahjong Cards, Large Size, 4 Pack | Hosting | Entry | 9 | 8 | 4 | 9 | 4 | 7 | 1 | 42 | REJECT | D:low; Q:unbranded, final sale |
| 27 | 2026 Mahjong Standard Size Cards, Four-Pack Bundle | Hosting | Entry | 21 | 19 | 18 | 9 | 6 | 9 | 3 | 85 | APPROVED | D:same official card, smaller size; Q:sold by League |
| 28 | 48 Colors Watercolor Paint Set, 3 Brushes | Creative | Entry | 14 | 12 | 8 | 6 | 8 | 8 | 3 | 59 | REJECT | D:48-colour case; Q:pigment quality, lightfastness, non-toxic status not stated |
| 29 | 8pc Round Watercolor Brush Set, Goat Hair | Creative | Entry | 16 | 16 | 10 | 8 | 6 | 8 | 2 | 66 | REPLACE | D:needed accessory; Q:'mimic sable' claims untested |
| 30 | 12pc Round Watercolor Brushes (Nylon) | Creative | Entry | 12 | 12 | 8 | 8 | 5 | 8 | 2 | 55 | REJECT | D:count over quality; Q:shedding claims untested |
| 31 | Watercolor Paper Pad, 140 lb, Cold Press, 9 x 12 in | Creative | Premium | 20 | 16 | 15 | 6 | 8 | 6 | 4 | 75 | RESEARCH | D:Arches is the benchmark cotton paper; Q:matches Arches pad but seller is third-party BestSource, sheet count not stated |
| 32 | Watercolor Paper Pad, 9 x 12 in, 140 lb/300 gsm, 20 Sheets | Creative | Entry | 13 | 15 | 8 | 8 | 5 | 8 | 2 | 59 | REPLACE | D:generic; Q:cotton not stated, cover colour variant |
| 33 | Classic Embroidery Learning Kit for Adults and Kids | Creative | Mid | 18 | 17 | 10 | 9 | 8 | 8 | 4 | 74 | REPLACE | D:complete kit with QR video tutorials; Q:contents counts unseen, tutorial quality unknown, no maker page |
| 34 | 304 Pack Embroidery Kit, 200 Colors, 5 Bamboo Hoops, 2 Aida Cloth | Creative | Entry | 11 | 12 | 6 | 6 | 6 | 8 | 2 | 51 | REJECT | D:304 accessories count; Q:no maker page |
| 35 | Embroidery Scissors, Stork, 2 Pcs, 3.6 in, Gold | Creative | Entry | 15 | 14 | 9 | 9 | 6 | 8 | 2 | 63 | REPLACE | D:stork scissors are a nice object; Q:sharpness/rust claims untested |
| 36 | Embroidery Scissors, Stork Scissors, with Synthetic Leather Case | Creative | Entry | 14 | 13 | 5 | 8 | 6 | 7 | 3 | 56 | REJECT | D:case included; Q:bullet text failed to load, country of manufacture unconfirmed |
| 37 | Crochet Hooks 12 Sizes Set, 51 Pack, 2.0-8.0 mm | Creative | Entry | 10 | 11 | 4 | 6 | 4 | 7 | 2 | 44 | REJECT | D:51-piece volume pack; Q:brand not stated |
| 38 | Crochet Hooks Set, 12 Sizes, 44 Pcs, Ergonomic Rubber Handles | Creative | Entry | 10 | 11 | 4 | 6 | 4 | 7 | 2 | 44 | REJECT | D:44-piece volume pack; Q:brand not stated |
| 39 | Super Saver Yarn, White, Single Skein | Creative | Entry | 15 | 17 | 12 | 10 | 5 | 9 | 2 | 70 | REJECT | D:utilitarian white skein; Q:sold by Amazon.com, listing claims |
| 40 | Simply Soft Yarn, Feathered Gray, 3-Pack | Creative | Entry | 18 | 17 | 13 | 10 | 7 | 8 | 3 | 76 | RESEARCH | D:softer, washable acrylic in muted shades; Q:sold by Amazon.com, maker page not read |
| 41 | Professional Artist Paint Brush Set of 12, Acrylic and Watercolor | Creative | Entry | 16 | 17 | 11 | 9 | 6 | 8 | 2 | 69 | REPLACE | D:spread of shapes; Q:'studio results' claims untested |
| 42 | Acrylic Paint Brushes Set, 12pcs Round-Pointed Tip | Hosting | Entry | 11 | 11 | 6 | 9 | 5 | 8 | 2 | 52 | REJECT | D:round only; Q:no maker page |
| 43 | Stretched Canvases for Painting, 8 x 10 in, 10 Pack | Hosting | Entry | 17 | 18 | 12 | 10 | 5 | 9 | 3 | 74 | RESEARCH | D:paint-night canvases for a group; Q:primed/acid-free wording is listing only |
| 44 | Stretched Canvas for Painting, 8 x 10 in, 5 Pack | Hosting | Entry | 15 | 16 | 11 | 10 | 5 | 9 | 2 | 68 | REJECT | D:same canvases, 5-pack; Q:same |
| 45 | Beautiful Reading Journal for Book Lovers, Hard Cover Tracker | Paper | Entry | 16 | 15 | 8 | 9 | 8 | 8 | 4 | 68 | REJECT | D:casebound reading journal; Q:no sentiment read, page count listing only |
| 46 | InkJoy Gel Pens, Fine Point 0.5 mm, Assorted Colors, 14 Count | Paper | Entry | 14 | 13 | 9 | 9 | 6 | 7 | 2 | 60 | REJECT | D:ordinary gel pens; Q:'3X faster' is maker claim |
| 47 | 19 LED Rechargeable Book Light for Reading in Bed | Cozy | Entry | 15 | 15 | 9 | 9 | 5 | 8 | 3 | 64 | REJECT | D:clip-on light; Q:'eye protection' claim |
| 48 | Book Club Conversation Cards for Adults | Hosting | Entry | 19 | 16 | 14 | 10 | 7 | 8 | 4 | 78 | RESEARCH | D:easy shared conversation for a book club; Q:TableTopics is a conversation-card specialist, sold by the brand |
| 49 | Small Ceramic Bowls Set of 4, White | Hosting | Entry | 13 | 14 | 7 | 9 | 6 | 8 | 3 | 60 | REPLACE | D:generic white bowls; Q:size inconsistent in listing (8.5 oz vs 10 oz) |
| 50 | Extra Large Picnic Blanket, 80 x 80 in, Waterproof, Gingham | Little Adventures | Mid | 18 | 18 | 11 | 9 | 8 | 9 | 4 | 77 | RESEARCH | D:80x80 blanket seats 4-8; Q:seller WD-2020, claims untested, folded size not captured, roundup mention weak |
| 51 | 24/30/60 Can Soft Cooler Bag, Double Deck | Little Adventures | Mid | 16 | 16 | 10 | 9 | 6 | 8 | 3 | 68 | REPLACE | D:double-deck soft cooler; Q:12-hour claim is maker's |
| 52 | Flower Scissors, Floral Shears, Stainless Steel Pruner | Creative | Entry | 15 | 14 | 8 | 8 | 6 | 8 | 2 | 61 | REPLACE | D:needed for flowers; Q:sharpness claim listing only |
| 53 | 12pcs Glass Bud Vases, Clear, Vintage Pattern | Creative | Entry | 14 | 12 | 7 | 9 | 7 | 7 | 3 | 59 | REPLACE | D:12 glass bud vases; Q:capacity not captured |
| 54 | 4 Pcs Flower Frog Pin Holder Set, 1/2/3 in | Creative | Entry | 12 | 11 | 6 | 7 | 6 | 7 | 2 | 51 | REJECT | D:kenzan niche; Q:material claims listing only |
| 55 | Pickleball Paddles Set of 2, USAPA Approved Fiberglass, Balls and Bag | Sporty | Entry | 16 | 15 | 8 | 9 | 6 | 8 | 3 | 65 | REPLACE | D:set of 2 paddles with balls; Q:USAPA claim unchecked, private label |
| 56 | 6-Pack Pickleball Balls, USAPA Approved, 40-Hole Outdoor/Indoor | Sporty | Entry | 13 | 16 | 8 | 9 | 5 | 8 | 2 | 61 | REJECT | D:unbranded balls; Q:approval claim listing only |
| 57 | 27-Inch Tennis Racket for Adults with Ball and Carry Bag | Sporty | Entry | 11 | 12 | 6 | 8 | 5 | 8 | 3 | 53 | REJECT | D:aluminium 27 in 'rackets'; Q:listing 'rackets' wording unclear |
| 58 | Championship Tennis Balls, Extra Duty Felt, 3 Balls (Pack of 4) | Sporty | Entry | 17 | 17 | 12 | 10 | 4 | 9 | 2 | 71 | REPLACE | D:familiar brand; Q:reviewers rate durability middling vs Wilson US Open, buyers report bounce loss |
| 59 | Soft Sherpa Blanket Fluffy Throw, 50 x 60 in | Cozy | Entry | 17 | 15 | 11 | 9 | 7 | 9 | 3 | 71 | REPLACE | D:mass-market sherpa; Q:maker claims untested |
| 60 | Flameless Candles with Remote, Battery Operated, Timer 2/4/6/8H | Cozy | Entry | 14 | 12 | 6 | 9 | 5 | 8 | 3 | 57 | REPLACE | D:flameless sets are practical; Q:batteries not confirmed, plastic |
| 61 | Herbal Tea Sampler Variety Pack, Caffeine Free, 18 Tea Bags | Cozy | Entry | 16 | 14 | 12 | 10 | 6 | 9 | 4 | 71 | REPLACE | D:Celestial Seasonings is a familiar entry; Q:maker page not read |
| 62 | Adult Jigsaw Puzzle 1000 Piece Mountain Cabin | Cozy | Entry | 16 | 16 | 9 | 8 | 8 | 8 | 3 | 68 | REPLACE | D:cabin scene; Q:brand not found in roundups, quality claims listing only |
| 63 | String Bracelet Making Kit, 488 Pcs, 50 Skeins Floss, 400 Beads, 37 Tools | Creative | Entry | 17 | 16 | 8 | 10 | 8 | 8 | 3 | 70 | REJECT | D:friendship bracelets trend; Q:store-brand, instructions untested |
| 64 | 8" Heavy Duty Scissors All Purpose, 3-Pack | Hosting | Entry | 10 | 13 | 8 | 8 | 3 | 8 | 1 | 51 | REJECT | D:plain 8 in scissors; Q:cut-life claims listing only |
| 65 | Scotch Tape Runner Extra Strength, 0.31 in x 11 yd | Paper | Entry | 17 | 18 | 12 | 10 | 4 | 9 | 2 | 72 | RESEARCH | D:refillable runner appeals; Q:photo-safe from Amazon bullets plus one reseller, 3M page not read |
| 66 | Pigment Liner Fineliner Pens Set, Black, 8 pc Assorted Tip Sizes | Paper | Entry | 13 | 14 | 8 | 9 | 5 | 7 | 2 | 58 | REJECT | D:alternative fineliner; Q:maker claims unverified, Amazon Resale may be open-box |
| A1 | Selkirk Sport SLK Dauntless Pickleball Paddle (widebody) | Sporty | Mid | 21 | 18 | 15 | 9 | 8 | 6 | 4 | 81 | APPROVED | D:a branded, well-reviewed beginner paddle; Q:sold by Selkirk Sport |
| A2 | HEAD Gravity Tour 2025 Pickleball Paddle | Sporty | Premium | 18 | 15 | 8 | 6 | 8 | 5 | 4 | 64 | REJECT | D:HEAD brand; Q:no Customers say summary, too few reviews, third-party RacquetGalaxy |
| A3 | Babolat Boost Drive Strung Tennis Racquet (Blue, 4 3/8" grip) | Sporty | Mid | 21 | 18 | 13 | 9 | 7 | 7 | 3 | 78 | RESEARCH | D:Babolat Boost is designed for recreational players (Tennis Express); Q:two visible reviews, no summary, limited stock, third-party Do It Tennis |
| A4 | Winsor & Newton Galeria Acrylic Paint, 20 x 12 ml tubes | Creative | Mid | 20 | 17 | 16 | 9 | 7 | 8 | 3 | 80 | APPROVED | D:Winsor & Newton is a known student-acrylic line; Q:sold by Amazon.com, buyers praise colour selection and starter value, roundups name Galeria |
| A5 | Winsor & Newton Cotman Watercolor Paint Set, Sketchers' Pocket Set | Creative | Mid | 22 | 18 | 16 | 9 | 8 | 8 | 4 | 85 | APPROVED | D:the most consistent beginner watercolor pick across roundups; Q:sold by Amazon.com, buyer sentiment praised pigment and portability |
| A6 | Sakura Koi Pocket Field Sketch Kit, 24 colors | Creative | Mid | 19 | 17 | 12 | 9 | 8 | 8 | 4 | 77 | RESEARCH | D:24-colour field kit; Q:buyers praise quality and portability, but sold by third-party Pattern Professional (same reseller as the Pigma authenticity flag) |
| A7 | Susan Bates Silvalume 5.5" Crochet Hook (US H, 5.0 mm) | Creative | Entry | 16 | 17 | 5 | 9 | 5 | 7 | 2 | 61 | REJECT | D:classic aluminum hook; Q:no summary read at check time |
| A8 | Mahjong Card Sleeve, fits NMJL large-size card, 4-pack (Beryl&Kai) | Hosting | Entry | 9 | 8 | 6 | 9 | 4 | 7 | 1 | 44 | REJECT | D:card protector; Q:buyers praise fit |
| A9 | DAS Modeling Clay Air Hardening, White, 2.2 lb | Creative | Entry | 21 | 18 | 14 | 9 | 7 | 8 | 3 | 80 | RESEARCH | D:most-recommended adult-beginner air-dry clay in roundups; Q:sold by Amazon.com, but no maker page found (Office Depot listing only) so safety label unconfirmed |
| A11 | Kunitsa Co. The Reading Journal (52 reviews, green) | Paper | Entry | 19 | 16 | 13 | 9 | 8 | 8 | 4 | 77 | RESEARCH | D:The Reading Journal; Q:buyers praise quality, paper |
| A12 |  | Paper | Entry | 18 | 15 | 10 | 9 | 8 | 8 | 4 | 72 | REJECT | D:Clever Fox is a known notebook brand; Q:third-party SVDSTORE |
| Q1 | Franklin Sports X-40 Outdoor Pickleballs - USAP Approved | Sporty | Entry | 20 | 19 | 15 | 10 | 5 | 8 | 3 | 80 | APPROVED | D:widely used outdoor ball; Q:one-piece 40-hole, USAP-approved per title and roundups (check list) |
| Q2 | HEAD Ti S6 Tennis Racket | Sporty | Mid | 20 | 19 | 16 | 9 | 6 | 7 | 3 | 80 | APPROVED | D:consensus adult-beginner racquet; Q:roundups agree, buyers mixed on durability, third-party RacquetGalaxy |
| Q3 | Clover 1047/H Deep Blue Amour Crochet Hook, Size H, 5.0mm | Creative | Mid | 20 | 19 | 15 | 10 | 6 | 7 | 3 | 80 | APPROVED | D:the crochet hook she will see recommended everywhere; Q:consensus pick in roundups, buyers praise comfort |

## 10. Gaps by collection (what each lacks)
- **Paper:** no approved washi, journal or adhesive; no archival-minded pen route; no genuine ephemera source; no stationery giftable (notebook, pen, stamp set) of design quality; no sketchbook; reading journals unresolved.
- **Creative:** no approved embroidery, crochet kit, clay-sealer or watercolor brushes or paper; no hero set tying clay + paint; no flower arranging product; no knitting or sewing; no beginner kit with a recognised brand and a manufacturer page.
- **Cozy:** nothing approved. No hero throw, tea, candle or lamp with design credibility; no scent or ritual objects; puzzle brand unresolved; no reading nook items beyond a clip light.
- **Hosting:** American mahjong set hero missing; no serveware or glassware; no table linens; no tray or game-night storage; paint night lacks brushes, aprons, easels; book club has one card deck only.
- **Sporty:** no tote or racquet bag, no overgrips, no athleisure accessories, no pickleball bag or water bottle; paddles are limited to one verified maker; tennis balls need Wilson US Open verification.
- **Little Adventures:** nothing approved. No verified blanket, basket, cooler, reusable dinnerware, hiking or day-trip gear, binoculars or nature journal.

## 11. Highest-priority research list (do these first)
1. Design-led American mahjong set (YMI Little Birdie, Linda Li, Gustaria, Oh My Mahjong unmonetised): verify set contents, maker page, Amazon seller, and imagery permission. Hosting's hero is empty.
2. Winsor & Newton Cotman Sketchers' Pocket Set: read W&N page; confirm contents and certification; checks flagship candidacy.
3. NMJL 2026/2027 card: read League page; confirm sizes, four-pack, 2027 timing.
4. DAS air hardening clay: find maker page and safety labelling; pair with a brush-on varnish from a known maker.
5. Washi: mt masking tape sets (verify US retailer, ASIN, affiliate).
6. Base journal: weigh Stationery Island 120 gsm against Strathmore and others; test glue-heavy suitability (needs our own testing: INSUFFICIENT EVIDENCE today).
7. Adhesive: read 3M pages for 055 runner and glue stick; or pick a known liquid glue.
8. Pigma Micron: find sold-by-Amazon or Sakura-authorised listing.
9. Picnic blanket and a design-led cooler: roundups are weak; verify maker pages (ZAZE, Pratico, Down Under Outdoors, a premium alternative).
10. Cozy hero throw: Barefoot Dreams CozyChic versus Brooklinen, Parachute (unmonetised if needed). Luminara tapers.
11. Puzzle: Galison / Piecework / Ravensburger; pick one aesthetic hero.
12. Tennis balls: Wilson US Open; confirm Penn ASIN conflict closed.
13. Embroidery starter kit from DMC / Dimensions / Sublime Stitching.
14. Yarn: Caron Simply Soft maker page; Lion Brand Wool-Ease evidence.
15. Pickleball: confirm SLK Dauntless identity, USA Pickleball approval list for Selkirk and Franklin X-40.

## 12. Sources consulted (all 2026-11-19; mostly roundups unless stated)
selkirk.com/collections/beginner-paddles (maker); ohmymahjong.com and belleandblush.com (retail/maker listings); ymimports.com (importer); bobvila.com, hometosight.com (clay roundups); crayola.com FAQ pages; officedepot.com DAS listing; eu.winsornewton.com best-watercolour-set page (search result only, not read); parkablogs.com; mymodernmet.com; tennis-warehouse.com and tennisexpress.com (tennis); pickleball.com, pickleheads.com, pickleballcentral.com; yarn.com and sarahmaker.com (crochet); rollingstone.com, hgtv.com and others (picnic); nbcnews.com, reviewed.com (puzzles); milligram.com, findtape.com, niconeco.com (mt/Kamoi Kakoshi); dos.fl.gov and loc.gov (adhesive/archival); needlenthread.com, mymodernmet.com (scissors); apartmenttherapy.com, rd.com, domino.com, wellandgood.com (cozy).

## 13. Six-line summary
See the final message returned with this report.
