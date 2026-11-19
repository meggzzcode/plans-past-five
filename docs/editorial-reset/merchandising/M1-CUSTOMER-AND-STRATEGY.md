# M1: Customer understanding and merchandising strategy

Author role: head of merchandising and creative director. Written 2026-11-19 on branch `editorial-reset`. Governed by PLAN.md section 000 (Premium Product Curation and Merchandising Standard). Nothing here is approved; it is for owner review before any commitment to the full catalog or library.

Labels used throughout: **RESEARCH-SUPPORTED** (source URL and date given; the source's own limits noted) and **ASSUMPTION** (editorial judgement, to be tested). No statistic below is invented. Where a figure comes from an opt-in poll, a vendor, or a secondary summary, that is said. I read search summaries and one primary page (Pinterest newsroom); I did not read paywalled reports (Mintel, SFIA full report, Everygirl media kit). Anything that depends on those is flagged.

Current shape inspected (not as authority): 66 catalog records in `docs/commerce/product-research.csv` tagged to the OLD collections (`journaling-era`, `pottery-era`, `girls-night-in`, `creative-girl`); 8 kits in `src/data/kits.ts`; `categories.ts` still has the old six sections (After Hours, The Weekend Edit, Solo Dates, Better Together, Creative Corner, Movement). The catalog is concentrated in junk journaling, air-dry clay, mahjong, watercolor, embroidery, crochet, with thin coverage of reading, flowers, picnic, pickleball, tennis, puzzles. Almost every record is an Amazon listing, "verified" only against listings, with `Manufacturer page not yet checked` common. Under the Standard none of it is approved.

---

## PART 1. THE CUSTOMER

### 1.1 Working portrait (synthesis; the portrait itself is an ASSUMPTION built from the labelled evidence below)

"Maya", working title only, not a persona to publish. Late 20s to mid 40s (ASSUMPTION, see 1.2), works a desk or screen-heavy job, earns enough to spend small amounts without agonising but is not buying luxury; her free time is thin and feels low-quality (scrolling). She suspects she has no "thing" outside work, wants one that is pretty, low-pressure and not another obligation. She saves ideas on Pinterest and Instagram long before she buys. She buys the small, beautiful version of a thing first; she is afraid of looking silly as a beginner and of buying a pile of supplies she abandons. She shops both for herself ("treat myself") and as a gifter for friends. She distrusts obvious affiliate lists.

### 1.2 Who she is: age, life stage, income

| Insight | Label | Source / note |
|---|---|---|
| Craft participation in the US is broad: Mintel's 2025 report says 71% of consumers identify as crafters, predominantly women and younger Gen Z and Millennials. | RESEARCH-SUPPORTED | Mintel US Arts and Crafts Consumer Market Report 2025, https://store.mintel.com/report/us-arts-and-crafts-consumer-market-report-2025 (accessed 2026-11-19; seen via listing summary, full report paywalled) |
| Younger crafters have less discretionary income than older crafters but still spend on materials and projects (Craft Industry Alliance president, quoted). | RESEARCH-SUPPORTED (quote, secondary) | https://www.uschamber.com/co/good-company/launch-pad/stress-fuels-crafts-market (undated in result) |
| Pickleball: women were about 42.9% of US participants in 2025, up from 38.6% in 2020 (SFIA); players total 24.3 million in 2025. Teens and young adults 13-24 have the highest participation rate. | RESEARCH-SUPPORTED | https://sfia.org/research/u-s-pickleball-participation/ and https://sfia.org/?p=10456 (2025 data, accessed 2026-11-19; I saw search summaries, not the full report) |
| Anthropologie, our closest aesthetic proxy, has long targeted women about 30 to 45 (URBN 2011 annual report as quoted in a student compilation), with an estimated audience average age of 36 (third-party, methodology undisclosed). Brand has since pushed toward late 20s to early 40s. | RESEARCH-SUPPORTED but OLD and secondary | https://www.slideshare.net/donnajames55/companyanthropologie-consumer-profile-1-demdocx (2011 data); https://therobinreport.com/?p=10618; https://www.retailtouchpoints.com/?p=133964. Treat as direction only. |
| The Everygirl (proxy for "career woman wanting a better life"): a third-party analytics profile estimates 62% female, with 18-24 largest (34%), 25-34 26%, 35-44 17%. Everygirl's own media kit figures were not found. | RESEARCH-SUPPORTED, LOW CONFIDENCE (third-party estimate) | https://prowly.com/profiles/outlets/the-everygirl (accessed 2026-11-19) |
| Our core is 25 to 45 with the centre of gravity around 28 to 40. | ASSUMPTION | Triangulated from the above and the "after work / after 5" brand promise; test with first-party data once analytics are on. |
| Household income skews comfortable but not wealthy; she buys in modest bands and "worthwhile upgrades" selectively. Anthropologie's $150k-$200k household figure (Mental Floss, undated) is NOT our customer. | ASSUMPTION | The Anthropologie income figure is https://www.mentalfloss.com/culture/fashion-beauty/18-stylish-facts-about-anthropologie , cited only to show it is a different, higher tier. |

### 1.3 Time, motivation and what stops her

| Insight | Label | Source / note |
|---|---|---|
| 89% of US adults say they have a hobby; when asked why they spend less time than they would like, the top answers were family responsibilities, then work responsibilities. | RESEARCH-SUPPORTED (online poll vendor; date not shown in result) | CivicScience, https://civicscience.com/how-americans-are-redefining-free-time-through-budget-friendly-hobbies/ |
| 63% of 1,000 American adults wish they had more time for hobbies. | RESEARCH-SUPPORTED (opt-in survey vendor) | AYTM, https://aytm.com/blog/daily-survey-results/hobbies-survey (undated in result) |
| Average hobby spend about $98 a month on a favourite hobby; 55.1% say their favourite hobby is too expensive for newcomers. | RESEARCH-SUPPORTED (Self Financial survey of 1,059 adults, October 2024; commercial, not representative-grade) | https://self.inc/info/spend-favorite-hobbies |
| Women's free time is thinner and lower quality: US women have about 13% less free time than men and spend twice the time on childcare and housework (Gender Equity Policy Institute, as cited in a commentary piece). | RESEARCH-SUPPORTED (secondary citation; verify at source before publishing) | https://www.openaccessgovernment.org/why-are-hobbies-so-important-and-why-are-women-being-left-out-of-them/182811/ |
| UK poll (Oct 2025, 2,000 adults): 46% of women want to take up physical activity but are held back; barriers named were cost, lack of suitable spaces, and equipment designed for men. UK, sport only. | RESEARCH-SUPPORTED (UK, indicative for Sporty Edit only) | https://www.joe.co.uk/news/nearly-half-of-women-want-to-take-up-a-sport-but-theres-something-holding-them-back-509702 |
| Fear of being bad at it, perfectionism, guilt about spending time and money on oneself, and lack of time/money/resources are the recurring barriers in practitioner commentary. | RESEARCH-SUPPORTED (qualitative, practitioner; not a measured survey) | Adler University, https://www.adler.edu/news/why-starting-a-hobby-as-an-adult-can-feel-so-hard-and-why-you-should-embrace-beginnerhood/ ; Axios Finish Line 2022, https://www.axios.com/2022/07/26/axios-finish-line-do-things-youre-bad-at-hobbies |
| Motivations for taking up crafts and analog hobbies: stress relief, moving away from always-on feeds, finding free time more satisfying, tangible hands-on results. | RESEARCH-SUPPORTED | Pinterest Hobbies Trend Report 2026, dated 2026-08-25, https://newsroom.pinterest.com/news/2026-pinterest-hobbies-trend-report/ (primary, but Pinterest has a commercial interest) |
| 51% of Gen Z say having a hobby contributes to their joy; eight in 10 monthly Pinterest users say Pinterest motivates them to try new things; more than a quarter of Gen Z and Millennial users rediscovered handwriting or letter-sending. | RESEARCH-SUPPORTED (vendor-published) | same Pinterest page (the handwriting figure is from the wider Pinterest coverage, https://www.jckonline.com/editorial-article/pinterest-hobbies-report-26/ ; two Pinterest sources phrase it slightly differently) |
| Pinterest names "Casual Crafter" (beginner-friendly crafts, miniatures, pottery), "Handmade Hacker" (zines, journaling), "Backyard Botanist" (pressed flowers, nature sketching, field journals), "Home Café Engineering", "Curated Clutter" among 2026 hobby trends; it notes some crafts look high-effort yet need no full studio. | RESEARCH-SUPPORTED | same page, accessed 2026-11-19 |
| Mahjong has revived among US women (commentary cites women about 35 to 40; Yelp searches up sharply) but I found no national participation survey. | RESEARCH-SUPPORTED as a trend only; NO participation figure | https://www.deseret.com/lifestyle/2026/08/15/women-are-obsessed-with-mahjong-america/ and https://www.opb.org/article/2026/07/09/uo-professor-shares-history-of-mahjong/ (the 4,500% Yelp figure is from one interview; treat as anecdotal, do not quote) |
| She wants a result she can show or use (a finished mug, a journal spread, a hosted evening), not only "to relax". | ASSUMPTION | Consistent with Pinterest "tangible results"; untested for our audience. |
| Her biggest purchase fear is buying the wrong things and being left with a pile; she wants someone to say what to buy first and what to skip. | RESEARCH-SUPPORTED (qualitative) + ASSUMPTION about intensity | Reddit-derived summaries and practitioner posts advise low-commitment starts, upgrading after a few weeks, and warn of overbuying clay/glaze/beads: https://www.buzzfeed.com/jennaguillaume/expensive-hobbies ; https://pingwish.com/discover/best-starter-hobbies-for-adults ; https://thismonthscraft.com/blogs/news/how-to-start-a-new-hobby-as-an-adult-without-wasting-money-on-supplies-you-ll-never-use (secondary; I did not read the Reddit threads directly, so this is lower confidence than it looks) |
| Kits and bundled materials help her stick with a craft because they remove tool and quantity guesswork. | RESEARCH-SUPPORTED (single-writer accounts) | https://politeadjacent.blogspot.com/2025/10/explore-crafty-hobbies-without-overspending.html (Oct 2025) |

### 1.4 Aesthetic

- Warm, tactile, slightly nostalgic, considered rather than loud: handwriting, paper, pressed flowers, ceramics, soft textiles. **RESEARCH-SUPPORTED as direction** (Pinterest 2026 hobby themes above; nostalgia: nearly one in four Pinterest users globally say they do more nostalgic activities, same Pinterest coverage). Specific palette preferences (soft neutrals with one saturated accent; natural light; matte over glossy) are an **ASSUMPTION** based on the Anthropologie/Everygirl visual vocabulary; those brands position as curated, bohemian, individualist (https://www.mentalfloss.com/culture/fashion-beauty/18-stylish-facts-about-anthropologie , secondary, older). We must observe their positioning only; copy no assets or text.
- She rejects the "pink and sparkly girly" cliché and the clip-art craft look. **ASSUMPTION.**
- Credibility reads as: named brands she recognises or discovers as "a find", real hands, honest limits, no "must-have". **ASSUMPTION** (consistent with BRAND-VOICE rules).

### 1.5 Spending and shopping behaviour

| Insight | Label | Source / note |
|---|---|---|
| About 22% of Americans (Mintel 2017) usually buy themselves gifts on holidays; a secondary report says 27% of millennials (unconfirmed on Mintel's page). Women drive gifting for others (Mintel: women drive 83% of birthday and 76% of holiday gifting). | RESEARCH-SUPPORTED but DATED (2017) and the millennial figure UNCONFIRMED | https://www.mintel.com/press-centre/nearly-one-quarter-of-americans-buy-themselves-gifts-on-holidays |
| 65% of Canadian women say they self-gift versus 57% of men; men spend more per treat. Canada, not US. | RESEARCH-SUPPORTED (non-US, indicative only) | https://www.wealthprofessional.ca/news/industry-news/women-are-more-likely-to-treat-themselves-but-men-spend-more/305986 |
| Women prefer craft retailers and discount stores over home improvement stores; social media is a top source of craft inspiration after friends and family; cost-consciousness matters most among women and crafters 55+. | RESEARCH-SUPPORTED (Mintel 2025, via summary) | https://www.mintel.com/insights/consumer-research/arts-and-crafts-industry-trends/ |
| Pinterest users plan with high intent: Pinterest-published data say 93% of Pinners use the platform to plan or make purchases (2016) and 96% of top searches are unbranded (2023 sponsored report). | RESEARCH-SUPPORTED but VENDOR-PUBLISHED and OLD | https://www.socialmediatoday.com/news/pinterest-releases-new-data-on-how-the-platform-influences-purchase-behavio/518828 ; https://www.retaildive.com/spons/from-inspiration-to-purchase-high-action-holiday-shoppers-dial-up-spend-on/717097 |
| COUNTER-EVIDENCE: an independent 2023 Modern Retail/Attest survey of 1,000 US consumers found 44% never buy via Pinterest and 27% do so infrequently. So Pinterest is an inspiration and saving channel, not a checkout. | RESEARCH-SUPPORTED (independent, 2023) | https://www.modernretail.co/technology/modern-retail-x-attest-research-u-s-users-arent-convinced-pinterest-is-a-shopping-app/ |
| She "saves, waits, then buys the small thing"; first purchase is a modest entry item, with upgrade only after she sticks with it. | ASSUMPTION (aligned with qualitative advice above) | Test via first-party click data. |
| "Treat myself" and "value" are both true at different moments: value for consumables and trying a new hobby; treat for the one beautiful object (a vase, a journal, a set of tiles). | ASSUMPTION | This is the basis of the price-band logic in Part 2. |
| She buys giftables for friends in her circle, especially for friends who have just started the same hobby, hosts, birthdays. | ASSUMPTION (gifting dominance by women is supported by Mintel above; the specific hobby-gift behaviour is not) | |

### 1.6 Frustrations, aspirations

- **Frustrations** (ASSUMPTION unless noted): "best of" lists that all link the same Amazon items; stock photos that show nothing about the product; pages that read like ads; kits with 300 pieces she will not use (the catalog itself contains one: a 304-piece embroidery kit); being unable to tell what is essential. The "too many supplies" fear is RESEARCH-SUPPORTED (qualitative; see 1.3).
- **Aspirations** (ASSUMPTION, consistent with Pinterest motivations): an evening that feels like hers; a shelf, desk or table that looks like she has a life; a friend group with a ritual (mahjong night, craft night); something she can make or do and be quietly proud of; a weekend that is not errands.
- **Why it sticks or does not** (ASSUMPTION): she continues if the first session is easy, the result looks good, and there is a next small step; she quits if setup is heavy, mess is unmanageable, or she has to leave the house with kit.

### 1.7 Confidence and gaps

Strongest evidence: hobby time/money/fear barriers (several independent polls but commercial), pickleball women share (SFIA), Pinterest 2026 hobby themes. Weakest: age/income of OUR audience; mahjong size; Pinterest-to-purchase conversion; gifting specifics. First-party data (analytics, outbound click categories, save/heart usage on My Plans, quiz answers) should replace assumptions once tracking is authorised. I recommend the owner or Cowork pulls the Mintel arts and crafts report and the SFIA 2026 pickleball report through legitimate access to firm up 1.2 and 1.5.

---

## PART 2. MERCHANDISING STRATEGY BY COLLECTION

Conventions. **Price bands** (no prices shown to readers): Entry (a low-risk try), Considered (a solid everyday product), Treat (a beautiful or durable object she keeps). Band cut-offs are an internal ASSUMPTION to be set after pricing research and are not displayed. **Affiliate potential** is qualitative; I have no revenue data and invent none. **Evergreen** = still relevant in three years. **Maintenance** = ongoing editorial/link burden for the buyer. Experiences are the twelve in PLAN.md section 0; where the PLAN has two lists (two different twelve) I use the section 0 list (Craft and Paint Nights, Picnicking, Tennis in; Puzzles and Scrapbooking out of the twelve). The sources of "current shape" per collection reflect the catalog.

Common to all collections: every product earns its place on the desirability test; each collection page presents "the complete little set", never a grid of everything; no unmonetised-vs-monetised distinction visible in layout beyond honest labelling (Part 3).

### 2.1 The Paper Edit

- **Customer moment:** Tuesday 7pm, laptop shut, wanting a quiet screen-free hour; or Sunday afternoon with a pile of ticket stubs and photos.
- **Purchase motivation:** to make something personal and pretty with low skill needed ("Casual Crafter", "Handmade Hacker", handwriting revival: RESEARCH-SUPPORTED per Pinterest 2026). Journaling as a ritual: ASSUMPTION.
- **Hero product concept:** one beautiful lay-flat journal that is robust to glue and ephemera (a "worthy page-holder"). Candidate class, not product. Existing catalog journals are 100 gsm and the record notes glue-heavy pages will warp; paper weight/glue-tolerance is the key research question.
- **Beginner kit concept:** "The First Spread": journal, photo-safe adhesive (tape runner or glue stick), one washi set in a cohesive palette, one fine pen, a small ephemera pack. Five items, one decision each.
- **Essentials:** journal, adhesive, scissors, one pen. **Entry point:** a modest notebook and tape runner. **Worthwhile upgrade:** better paper (heavier, glue-tolerant), a quality set of fine liners, a cutting mat/small trimmer. **Accessories:** washi, stickers, stamps, a storage pouch. **Giftable:** a "journal and tape" pairing in a coherent palette, a pen-and-paper-pairing, a letter-writing set (pen pals/letter sending is a Pinterest 2026 signal, RESEARCH-SUPPORTED).
- **Replenishables:** adhesive, pens, washi, paper packs. Highest repeat rate of the six (ASSUMPTION).
- **Price band:** mostly Entry and Considered; one Treat object (the journal itself or a fountain-pen style set).
- **Repeat purchase:** strong; consumables refill every few months (ASSUMPTION).
- **Affiliate potential:** broad Amazon availability, small basket sizes, frequent replenishment; qualitatively good volume, low per-item value. Non-Amazon: indie stationery brands and paper shops often have better product but may lack a program (leave unmonetised where superior).
- **Evergreen:** high. **Maintenance:** low-medium (listings churn quickly for washi/ephemera; stick to named staples).
- **Signature experiences:** Junk Journaling (flagship). Scrapbooking is consolidated here per PLAN. Possibly Reading (reading journal) as a cross-link.
- **Visual merchandising concept:** a desk-top flat-lay, overhead, natural light, warm paper tones; products grouped as spreads, not as category rows. Naming: "The First Spread", "The Ink and Paper Pairing", "Pages Worth Keeping". Product cards feel like **stationery-shop swatch cards**: large photo, one line on why it earns a place, one honest limit, a small "pairs with" line. No star ratings, no price, no "best seller". Different from Amazon: curated sets that tell a project story; whitespace; named reasons; things grouped by what you are making, not by product category.
- **Why she wants it:** it looks like a life she wants; each set is small, finished and giftable; the risk is low and the result is visible within the evening.

### 2.2 The Creative Edit

- **Moment:** Saturday morning at the table with coffee, wanting to make something with her hands that is not social media.
- **Motivation:** tangible result and gentle skill growth (watercolor, air-dry clay, embroidery, crochet). Pinterest 2026 "Casual Crafter" (beginner-friendly crafts, pottery) is RESEARCH-SUPPORTED. Fear of being bad: RESEARCH-SUPPORTED (qualitative); so the kit must make a first success likely.
- **Hero:** a "first project in a box" per medium: an air-dry clay set with a tool and sealer for a ring dish; a good watercolor pan set; an embroidery starter with a hoop and a pattern; a crochet hook-and-yarn pairing for one project (a scarf or a small bag).
- **Beginner kit:** one kit per medium, scoped to ONE project, not a general kit. The catalog's 304-piece embroidery kit and 51-piece hook sets are, in my judgement, the wrong shape (too many pieces) ; the right shape is fewer, better, compatible items. This is an ASSUMPTION to be checked against product research.
- **Essentials/entry/upgrade/accessories:** per medium; entry = modest student-grade; upgrade = artist-grade paper/paints, quality scissors (embroidery) or better yarn. **Giftable:** a "start-a-craft" gift set with a finished project card; a quality pair of embroidery scissors; a handsome yarn bundle. **Replenishables:** clay, paint, yarn, thread, paper, brushes (wear).
- **Price band:** Entry for tries; Considered for paper/paint upgrades; Treat for brushes/scissors she keeps.
- **Repeat:** strong (consumables + upgrades). **Affiliate:** broad Amazon availability and many direct brands (Arches, Stork-style scissors manufacturers, yarn brands); qualitatively strong volume across mediums.
- **Evergreen:** high. **Maintenance:** medium (many SKUs; variant and kit churn).
- **Signature experiences:** Air-Dry Clay, Watercolor, Embroidery, Crochet; Craft and Paint Nights has a hosting overlap (shared with 2.4).
- **Visual concept:** layered table scenes with hands at work, one medium per "studio shelf"; cards grouped by project stage (Start, Grow, Keep). Names: "Your First Ring Dish", "A Small Watercolor Set". Cards feel like **a studio shelf label**: product, what it is for in this project, a 2-line "what to know". Different from Amazon: project-shaped, not category-shaped; a maximum of five products per project.
- **Why she wants it:** she sees the finished object and a calm route to it; no studio needed (RESEARCH-SUPPORTED as a Pinterest observation).

### 2.3 The Cozy Edit (UNDERDEVELOPED; weakest evidence)

- **Moment:** Friday night in, blanket and a long evening; or Sunday reset.
- **Motivation:** comfort and atmosphere; "reduce stress, find free time more satisfying" (Pinterest 2026, RESEARCH-SUPPORTED); reading and puzzles as screen-free options. Reading is a Pinterest-flagged broader trend (RESEARCH-SUPPORTED, lightly).
- **Hero concept:** a "reading corner" anchor: a quality throw plus a good reading light (the catalog has a book light and a sherpa throw; unverified for quality) OR a beautiful puzzle with a mat. I do not yet have a hero I can defend.
- **Beginner kit:** "The Reading Evening" (light, throw, tea, reading journal). Risk: it is mostly commodity items with little differentiation and a bundle of impulse buys.
- **Essentials/entry/upgrade:** light, throw, mug/tea; upgrade: a better throw (natural fibre), a good reading lamp. **Giftable:** reading-journal-and-tea sets; strong gifting category (ASSUMPTION). **Replenishables:** tea, candles (flameless candles are in catalog; needs safety/product check), puzzle refills.
- **Price band:** Entry and Considered; the Treat object is the throw.
- **Repeat:** medium (tea, candles). **Affiliate:** very high availability on Amazon, low differentiation; non-Amazon (linen, ceramics, independent candle makers) would be superior but sub-scale and mostly unmonetised. Qualitatively: moderate volume, low editorial moat.
- **Evergreen:** high (seasonal peak autumn/winter). **Maintenance:** medium-high (commodity listings churn; candle/heater/electrical items carry safety checks; avoid heated products or anything fire-related unless fully verified).
- **Experiences:** Reading, Puzzles (investigate only; PLAN keeps puzzles as a discovery hobby).
- **Visual concept:** low warm light, textiles, hands holding mugs; grouped by "evening" not category; names "The Reading Evening", "A Quiet Table for One". Cards feel like **a cosy-shop shelf talker**. Differentiation from Amazon is hard here, which is the commercial and editorial risk.
- **Why she wants it:** the feeling of a good evening in. But a commodity grid would not earn trust.
- **Status:** NOT READY to launch (see Part 4).

### 2.4 The Hosting Edit

- **Moment:** she is hosting four friends for mahjong on Friday; or organising a craft and paint night.
- **Motivation:** connection and ritual; mahjong revival among US women is RESEARCH-SUPPORTED as a trend (journalism) but not quantified. Craft nights: ASSUMPTION (social, low-skill, decorative).
- **Hero:** a complete, handsome mahjong set (case, tiles, racks, pushers) with this year's card (the annual National Mah Jongg League card, which the catalog already lists). Need to verify the card is current and legitimate for the year.
- **Beginner kit:** "Mahjong Night": set, card x4, mat, bowls for snacks. Catalog has candidate sets in the Considered band and a table cover; strong starting shape but unverified quality. Craft/paint night kit: canvases, brushes, paint, aprons, shared table cover.
- **Essentials/entry/upgrade/accessories:** set (the big decision); entry: a basic set; upgrade: a beautiful set (tile quality, case); accessories: mat, card sleeves, tile-wiping cloth, bowls, serving pieces. **Giftable:** a hostess gift (a card-and-sleeve set, a mat, a snack-bowl set); a set for a friend who is starting. **Replenishables:** annual cards (a built-in annual repeat purchase, ASSUMPTION about frequency; the card is updated yearly by the league, verify), paint, napkins.
- **Price band:** Considered and Treat (the set is the highest-priced single item in the whole shop; real stakes for trust).
- **Repeat:** the annual card is a genuine recurring purchase; hosting consumables.
- **Affiliate:** the set is a higher-value single item; qualitatively the best per-sale value of the six; the annual card repurchase. Direct-from-brand mahjong makers (a few design-led brands exist) may offer a superior set without a program; consider unmonetised.
- **Evergreen:** medium-high; trend risk if mahjong fades (ASSUMPTION). **Maintenance:** medium (set variants, card editions each year; safety for any electrical items).
- **Experiences:** Mahjong (flagship), Craft and Paint Nights; Picnicking could cross-sell here for outdoor hosting.
- **Visual concept:** a set table from above, flowers, hands mid-game; grouped by "the table you set". Names: "The Mahjong Table", "The Paint Night Table". Cards feel like **a place setting card**: what it is, why it is at this table, what it pairs with. Different from Amazon: occasion-first, shown as a styled table, every item justified.
- **Why she wants it:** it solves the question "how do I host and look like I know what I am doing".

### 2.5 The Sporty Edit (UNDERDEVELOPED)

- **Moment:** a Saturday morning at the local court; a friend invites her to pickleball and she has no idea what to wear or buy.
- **Motivation:** social movement; pickleball is a growth sport with a rising women's share (RESEARCH-SUPPORTED: 42.9% women, 2025, SFIA). Barriers for women include cost, space and gear designed for men (UK poll; RESEARCH-SUPPORTED, UK only).
- **Hero:** a decent beginner pickleball paddle pair or a well-regarded tennis racquet. Catalog offers a generic paddle set and a 27-inch racquet whose size and sports-category suitability must be checked; I do not trust these as heroes.
- **Beginner kit:** "Your First Court Day": paddle(s) and balls, water bottle, small bag. Tennis: racquet sized correctly and balls.
- **Essentials/upgrade/accessories:** paddle, balls, shoes (court shoes matter; do not make health claims), bag, overgrip, visor. **Giftable:** a pair of paddles in a good bag for a friend starting. **Replenishables:** balls, overgrips.
- **Price band:** Entry for sets; Considered for a real paddle/racquet; Treat for a premium pair.
- **Repeat:** balls and grips (moderate).
- **Affiliate:** sports gear has strong Amazon availability and specialist retailers; higher basket value for racquets/paddles; but heavy brand-direct competition and rapid product turnover.
- **Evergreen:** pickleball is a trend (SFIA reports growth; one source suggests leveling off, https://www.thedinkpickleball.com/report-is-u-s-pickleball-participation-leveling-off/ ), tennis is evergreen. **Maintenance:** medium-high (equipment-body certifications, e.g. USA Pickleball approved list, change; sizing and safety guidance; must not give injury or health claims).
- **Experiences:** Pickleball, Tennis.
- **Visual concept:** court-side light, women in ordinary clothes (not elite athletes), grouped by "first day on court". Names: "The First Court Day". Cards: **a sports-shop fitting card** with sizing note and "who it suits" line. Different from Amazon: reassures a beginner, avoids spec overload.
- **Why she wants it:** it lowers the "I do not know what to buy and I will look silly" barrier.
- **Status:** CONDITIONAL; needs genuine specialist-retailer research (see Part 4).

### 2.6 The Little Adventures Edit (UNDERDEVELOPED)

- **Moment:** a free Saturday and an itch for something that is not errands; a picnic in the park, a day trip.
- **Motivation:** small escapes and a "storyline" weekend; picnicking is ASSUMED popular among our audience; no sourced participation data.
- **Hero:** a beautiful, properly packable picnic blanket (insulated base, folds small). The catalog has a waterproof blanket and cooler bag, unverified for quality.
- **Beginner kit:** "The Picnic Basket": blanket, cooler bag, reusable set, a small flask; keep to what actually travels well. Others: a day pack, a notebook, binoculars for a "field journal" nod to Pinterest's Backyard Botanist (RESEARCH-SUPPORTED as a trend).
- **Essentials/upgrade/accessories:** blanket, cooler, tote; upgrade a good insulated bag; accessories: reusable cutlery, napkins. **Giftable:** a picnic set for a couple/friend. **Replenishables:** few (low repeat).
- **Price band:** Entry to Considered; Treat only for a design-led blanket.
- **Repeat:** low. **Affiliate:** high availability, mid-value baskets, but a commodity category with big brand and retailer competition; qualitatively moderate. **Evergreen:** seasonal (spring-summer peak). **Maintenance:** medium (seasonal listings; safety for cooler/food use; no unverified claims about keeping food safe).
- **Experiences:** Picnicking.
- **Visual concept:** golden-hour outdoor scene, a basket packed with intention; grouped by "pack it": names "The Picnic Basket". Cards: **a packing-list tag**. Different from Amazon: a packing story rather than a category grid.
- **Why she wants it:** it makes a modest outing feel like an event.
- **Status:** NOT READY (weakest repeat purchase, thin catalog, strongest competition from general retail).

### 2.7 Experiences allocation (twelve signature experiences)

| Experience | Home collection | Cross-sell |
|---|---|---|
| Junk Journaling | Paper | Creative |
| Air-Dry Clay | Creative | Hosting (clay night) |
| Watercolor | Creative | Paper |
| Embroidery | Creative | Cozy |
| Crochet | Creative | Cozy |
| Reading | Cozy | Paper (reading journal) |
| Flower Arranging | Creative (the catalog tags it Creative; vases and snips) | Hosting (table flowers) |
| Mahjong | Hosting | |
| Craft and Paint Nights | Hosting | Creative |
| Picnicking | Little Adventures | Hosting |
| Pickleball | Sporty | |
| Tennis | Sporty | |

Observation: the Creative Edit carries five of twelve experiences and is the commercial core; Cozy and Little Adventures carry one each. That asymmetry is itself a finding.

---

## PART 3. RULES

### 3.1 Amazon versus non-Amazon

1. **Best product first, monetisation second.** Build the candidate set (3 to 5 where credible), score per Standard (80 shortlist, 90 flagship), then determine the link. Never swap a better product for a lesser one because it earns.
2. **Candidate sources:** manufacturer, specialist retailers, independent brands, lifestyle retailers, Amazon. Compare across sources and across customer discussions; research cannot rely on Amazon listing text alone (the catalog's own "Manufacturer page not yet checked" flag shows this).
3. **Link types (to be built in the Stage 2a product model; owner-visible):** (a) `amazon-affiliate-ready` (tracking off until authorised); (b) `editorial-unmonetised` (manufacturer or retailer link, no commission). A build test allows only declared link types and hosts. No non-Amazon affiliate network without owner approval (per PLAN).
4. **When unmonetised wins:** when the superior product is available only direct or via a retailer without a program, or when the Amazon listing is unreliable (third-party sellers, variants, counterfeit risk). The page does not hide this.
5. **When Amazon wins:** same product, same variant, reliable seller, and shipping the beginner can easily use.
6. **Tie-break:** if two products are within a few points on score and one has a link we can monetise, choose the monetised one (ASSUMPTION; this is the only place revenue decides, and it must be a genuine tie).
7. **No inventory of impulse extras.** Revenue helps prioritise collections; it does not enter product scoring.

### 3.2 Honest labelling

- Sitewide disclosure must not claim that every link earns commission. Proposed wording (ASSUMPTION; legal review needed): "Some links are affiliate links; we may earn a commission at no cost to you. Where we recommend something that does not pay us, we say so." Amazon requires its Associate statement near affiliate links ("As an Amazon Associate I earn from qualifying purchases", per its own help page https://affiliate-program.amazon.com/help/node/topic/GPXFHVYZMTGPUMPE ; verify the current Operating Agreement, updated policies page 2026-04-14, https://affiliate-program.amazon.com/help/operating/policies). Keep wording consistent with `AMAZON-DISCLOSURE.md` and the owner's compliance review.
- Per-card label for unmonetised picks: a quiet "Editor's pick, link does not earn us a commission" tag. Per-card label for Amazon links: the standard link-level disclosure when active.
- Never label products "tested by us" unless true; use "we researched" language. No fabricated ratings, reviews, prices, historical prices.
- Limits shown: each card carries one honest limit from the record's `limitations` field.

### 3.3 Product record (from the Standard; required fields)

exact name and brand; manufacturer information (URL, model, country where relevant); verified retailer listing and variant; ASIN (where applicable and verified); specifications; included components; alternatives considered (3 to 5, with why not chosen); research evidence (sources with dates, including customer discussions); selection rationale; limitations; internal score (broken into the seven weighted criteria) with date; price positioning (band only); affiliate availability (program, network, status); permitted imagery (source, rights, credit); last verification date; replacement candidate. Plus: link type; collection and experience tags; role (hero, essential, entry, upgrade, accessory, giftable, replenishable); kit slot; desirability-test answers (eight); safety/compatibility notes. Existing CSV already holds many of these; **missing today: alternatives considered, score breakdown, link type, price band, replacement candidate**.

---

## PART 4. PRIORITISED RESEARCH SHORTLIST

Ordering logic: first where (a) the customer need is strongest and evidence supports it, (b) the existing catalog is closest to usable, (c) the pilot articles need it, (d) commercial potential is real. Revenue never beats integrity.

### Wave 1 (research first)

1. **Mahjong (Hosting).** Highest per-sale value, strongest trend evidence of any (journalism-level), annual card repurchase, a pilot article is dedicated to it. Research: 3 to 5 complete sets (include design-led direct brands), the current-year card, mat, accessories. Integrity risk: set quality is hard to verify from listings; do not feature a set on the strength of Amazon descriptions alone.
2. **Junk Journaling and The Paper Edit.** Closest to a finished catalog, highest repeat, a pilot article. Research: glue-tolerant journals (the existing 100 gsm journal's limitation is a red flag), adhesives, a washi curated set, ephemera. Integrity risk: generic "vintage ephemera" and unbranded paper packs may be low quality or have unclear rights.
3. **Air-Dry Clay (Creative).** Pilot article; catalog has clay, tools, paints, sealer. Research: clay formulation and drying behaviour (cracking), sealer suitability, a tool set intended for adults (the catalog's tools are labelled for children 8+, a mismatch with her aesthetic). Integrity risk: safety claims on clay and sealers (food contact, spray ventilation).

### Wave 2

4. **Watercolor, Embroidery, Crochet (Creative).** Medium catalog coverage; research one-project kits and the "fewer, better" rule. Specialist retailers matter most here (art-supply and needlework brands). 
5. **Flower Arranging.** Desirable, photographic, a good fit with Hosting and Creative; the catalog has snips, vases, kenzan. Research a coherent small set; the PLAN notes the flower article has no shopping.
6. **Craft and Paint Night kit (Hosting).** Reuses brushes, canvas, paint from the catalog; quality of canvases and paints needs checking.

### Wave 3 (research only after Waves 1 and 2; may not launch)

7. **Pickleball and Tennis (Sporty).** Growth evidence is real but product risk is high (certification, sizing, injury claims); research via specialist and brand sources; do not accept generic sets as heroes.
8. **Reading and Puzzles (Cozy).** Research a defensible hero first (a lamp or a beautiful puzzle) before launching anything.
9. **Picnicking (Little Adventures).** Lowest repeat and heavy commodity competition; research one hero blanket and one cooler.

### Which collections are too weak to launch yet

- **The Little Adventures Edit: too weak.** One experience, low repeat, commodity products, no sourced participation data, thin verified catalog. Hold; fold a "Picnic" feature into The Hosting Edit until proven.
- **The Cozy Edit: too weak.** No defensible hero; items are commodity; high impulse risk. Hold until a hero is researched; reading journals and book-clubs content can live in The Paper Edit meanwhile.
- **The Sporty Edit: launch only if research finds credible specialist heroes.** The market evidence is good (SFIA) but the current catalog items are generic. Conditional.
- **Ready to launch first, subject to research:** The Paper Edit, The Creative Edit, The Hosting Edit (if the mahjong hero is credible).
- Consequence to flag for owner: PLAN's navigation and shop expect six collections; launching three or four strong ones is consistent with "never publish empty or weak collections" and with the Standard's "small and exceptional beats large and mediocre".

### Re-evaluation of the 66-record catalog (recommended classification approach)

None approved by prior verification. Provisional triage (ASSUMPTION, from reading names and notes only; not a verdict): Research further: most records. Likely Replace or Reject candidates: generic, unbranded scrapbook paper packs; a 304-piece embroidery kit; children's clay tools; a set of 51 crochet hooks (too many pieces); generic tennis racquet with ball sets; table cover as a mahjong mat (check). Likely Flagship candidates after research: a branded glue/adhesive staple (Scotch, with the maker-page confirmation already recorded), Pigma Micron and Staedtler pens, Arches paper, Stork scissors, 'NMJL' cards. Everything above needs the full process.

### Open owner decisions

1. Accept three launch collections (Paper, Creative, Hosting) with Sporty conditional, Cozy and Little Adventures held.
2. Approve the two link types and honest tag wording (needs legal review).
3. Approve sourcing the Mintel and SFIA reports (or equivalent) to firm up audience assumptions.
4. Confirm the twelve experiences list (PLAN has two versions).
