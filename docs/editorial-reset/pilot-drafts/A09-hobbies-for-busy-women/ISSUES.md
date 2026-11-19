# ISSUES: A09 (every unresolved item)

## Claims and SOURCES
SOURCES: none are relied on for factual or safety claims, by design. The copy makes no health, wellbeing, statistical, safety or testing claims.
SERP source URLs (2026-11-19, WebSearch snippets only, pages not opened): https://www.essence.com/health-and-wellness/hobbies-for-women/ ; https://www.wonderbaby.org/articles/mom-hobbies ; https://goodgoodgood.co/articles/hobbies-for-women ; https://womanandhome.com/hobbies/hobbies-for-women-in-their-30s ; https://theeverygirl.com/low-energy-hobbies-to-try/ ; https://www.themuse.com/advice/examples-of-hobbies (these inform SEO.md only, not on-page claims).
Statements that a reviewer should treat as editorial judgement or site-data derived, not sourced fact:
1. "Start-up bands" (Free, under $25, under $50, varies) come from src/data/equipment.ts, which says every number is an approximate assumption. They are bands, not prices; if the owner reads "no prices" as excluding bands, delete the column and the italic budget lines. These derived bands differ from the seed `cost` in hobbies.ts for some hobbies (e.g. clay, watercolor, flowers), because `make()` overrides the seed with the equipment-derived bucket; I used the derived ones.
2. First-session lengths come from the hobby records (`minutes`/timeLabel); unverified beyond that.
3. "Crochet: our hobby pages rate this as needing a lesson or two": the record says beginner 2. The label "needs a lesson or two" is the Difficulty type text; confirm it is what the profile shows.
4. "Drying time depends on the clay and thickness, follow the pack": deliberately generic per the A03 research ("no generalised drying-time guarantees"); no number given.
5. "A racket borrowed or secondhand": equipment.ts lists it that way; no source needed but unverified as general advice.
6. Pickleball/tennis: no safety or fitness note is included (no source). Recommend the signature articles carry any sourced safety note; this page links there.
7. "Public court with open play", "check your parks page": procedural, no claim made about availability or fees.

## Data and site defects found (not edited, out of scope)
- The Mahjong hobby record's `description` reads "Digging through record store crates and listening to full albums" (a vinyl description). Wrong copy on /hobbies/mahjong.
- No hobby page for paint nights; Craft and Paint Nights maps to `craft-nights`.
- Directory filters are not URL-addressable, so A10's planned `/hobbies?energy=low` link will not work as written.
- The Energy field in hobbies.ts marks nine of the 12 as low; my three-tier grouping is an editorial judgement and conflicts with the data's field (flagged on the page). A reader could notice that Tennis is "high" and Pickleball "medium" while I group them together as "enough for company".

## Editorial gaps and risks
- Byline: "Plans Past Five editors" is a placeholder; no named author. No-testing rule is respected; nobody claims to have done any of these.
- Picnicking is tagged social-only in data; the copy says "alone with a book", an editorial addition.
- Flower Arranging, Watercolor and Picnicking sit in "under $50" per the derived bucket though their first step may cost far less; the band could look discouraging next to Junk Journaling. Consider splitting the band ("under $25" tiers) if equipment data is revised.
- Overlap with A10 (energy menu): tiers here are close to A10's three energy levels. Needs an owner call on which owns "by energy" language; risk of cannibalisation in SEO.
- Only 12 hobbies, all signature experiences. Reading and Picnicking are not "projects"; Mahjong, Craft Nights, Tennis and Pickleball skew to people she must organise or find, which may be a hard ask for a woman with no energy. A "solo, out of the house" option (museum, birdwatching, thrifting, hiking, which exist in the directory) is absent by design (signature-only) but is a real gap for the "Nothing left" tier. 
- Tone check: no banned phrases intended, no exclamation marks, zero "best". Please run a banned-phrase search.
- Length: about 1,700 words; within E1 pillar expectations (not specified there).
- Table in the preview is a column-heavy table; on phones the preview collapses it into cards; the production renderer must do the same.
- Hero and 12 object images do not exist; all slots are briefs. If AI-generated they need captions and ledger rows (E3). Alt text drafted for hero only; the other slots need alt text.
- Slug decision (short new slug vs old long slug) is an open E1 owner question.
- Quiz/Make Plans handoff wording makes no timing claim ("about a minute" and "30 seconds" avoided because not verified for this page); the page titles in routes use "30 Seconds", unverified.
- Not checked: that the heart-save control exists on journal pages; that `/journal/*` links all resolve in the production build (verified only by file presence in content/articles).
- Pinterest AI-label policy: unverified (see PINTEREST.md).
- No affiliate disclosure on the page because there are no links; if the owner later adds gear notes, the disclosure placeholder is `[Amazon-required Associate statement, wording pending verification]`.
