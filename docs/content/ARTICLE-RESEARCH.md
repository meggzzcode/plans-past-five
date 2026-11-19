# Article research briefs

Each article gets a research brief before it is written or published. The briefs themselves are Cowork plus lead-editor work (live web research with the owner's logins); nothing in this repo has been researched live yet. This page holds the template and the index.

Rules (from `docs/TURNKEY-PLAN.md`): no invented experiences, experts, testing, prices, ratings, ASINs, volumes or traffic. Anything needing live research is labeled PENDING COWORK with the exact question.

Where a finished brief lives: one file per article at `docs/content/research/<slug>.md` (folder not created yet; create it when the first brief is written). Facts that survive into the article go into the article's `sources` and `coworkChecks` fields (`src/content/types.ts`), and the date goes into `verifiedAt`.

## Brief template (copy this block)

```
# Research brief: <slug>

Working title:
Category / type (CB, SB, IN):
Status: NOT STARTED | IN PROGRESS | READY FOR WRITING | WRITTEN | VERIFIED
Owner:   Date started:   Date finished:

## 1. Reader
Who is she, what does she already own, how much time and money does she have?

## 2. Search intent
Primary keyword candidate:
Secondary candidates:
Intent (informational / commercial / mixed):
Evidence of demand: PENDING COWORK (autocomplete, Trends, Pinterest suggestions, Search Console once live). Record the date and what you saw; do not paste volumes you did not see.
SERP snapshot: PENDING COWORK (what the top results cover, their format, gaps). No competitor claims without a dated source.

## 3. What a complete answer includes
Bullet list of the questions the article must answer.

## 4. Claims to verify (becomes coworkChecks)
| Claim | Why it needs a source | Source URL | Checked on | Result |
|---|---|---|---|---|

## 5. Safety, rules, accessibility
Anything about fire, tools, sharp objects, materials, venues, rules of play, physical effort. Cite official sources.

## 6. Products and roles
| Role label | Product type | Existing product id (src/data/products.ts) or NEW | Verification status |
|---|---|---|---|
Role labels: the essentials, researched beginner pick, the affordable option, the complete starter kit, the aesthetic upgrade, the nice-to-have extra, the upgrade for later. See docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md.
Probably already own:
Skippable:

## 7. First-hand knowledge
Does the owner actually have this experience? If not, write "none" and the article must not imply any.

## 8. Internal links
Hub:   Spokes:   Tool:   Hobby profile(s):
Only links that serve the reader (docs/content/INTERNAL-LINKING-STRATEGY.md).

## 9. Distribution
Pinterest concepts (search / aspirational / practical): see docs/marketing/PINTEREST-STRATEGY.md
Seasonal note (qualitative, guess unless sourced):

## 10. Open questions for the owner
```

## Index of briefs

All NOT STARTED as of 2026-11-19. Slugs match `docs/content/ARTICLE-ROADMAP.md`.

| # | Slug | Brief status | Notes |
|---|---|---|---|
| 1 | how-to-start-junk-journaling | NOT STARTED | Published already; brief should audit its claims retroactively |
| 2 | junk-journaling-supplies-for-beginners | NOT STARTED | Flagship |
| 3 | how-to-start-air-dry-clay | NOT STARTED | Flagship; check material safety and drying claims |
| 4 | watercolor-painting-for-beginners | NOT STARTED | |
| 5 | creative-hobby-starter-kits-worth-considering | NOT STARTED | Depends on `docs/commerce/STARTER-KITS.md` |
| 6 | how-to-start-embroidery | NOT STARTED | |
| 7 | how-to-start-crocheting | NOT STARTED | |
| 8 | how-to-start-a-reading-journal | NOT STARTED | Draft file exists |
| 9 | flower-arranging-as-a-hobby | NOT STARTED | Cost and seasonal-availability claims need sources |
| 10 | creative-hobbies-you-can-start-at-home | NOT STARTED | Published already; audit |
| 11 | hobbies-to-try-when-life-feels-like-work-sleep-repeat | NOT STARTED | Published already; audit |
| 12 | things-to-do-after-work-instead-of-scrolling | NOT STARTED | Published already; audit |
| 13 | low-energy-hobbies | NOT STARTED | |
| 14 | affordable-hobbies-under-25 | NOT STARTED | Every dollar figure needs a source or must be phrased as a range with assumptions |
| 15 | how-to-find-a-hobby-as-an-adult | NOT STARTED | |
| 16 | how-to-host-a-mahjong-night | NOT STARTED | Flagship; rules and set variations need an authoritative source |
| 17 | how-to-host-a-craft-night | NOT STARTED | |
| 18 | how-to-host-a-paint-night-at-home | NOT STARTED | Draft file exists |
| 19 | girls-night-ideas-that-arent-drinks | NOT STARTED | |
| 20 | how-to-start-a-book-club | NOT STARTED | |
| 21 | how-to-plan-a-perfect-picnic | NOT STARTED | Food-safety claims need an official source |
| 22 | at-home-creative-weekend | NOT STARTED | |
| 23 | things-to-do-on-the-weekend | NOT STARTED | |
| 24 | cheap-weekend-adventures | NOT STARTED | No real places, events or prices unless verified |
| 25 | solo-date-ideas | NOT STARTED | |
| 26 | cozy-solo-dates-at-home | NOT STARTED | |
| 27 | how-to-plan-a-solo-saturday | NOT STARTED | |
| 28 | pickleball-for-beginners | NOT STARTED | Draft file exists; rules and equipment from the governing body |
| 29 | how-to-start-playing-tennis-as-an-adult | NOT STARTED | Draft file exists |
| 30 | active-hobbies-for-women-who-dont-love-the-gym | NOT STARTED | Draft file exists; no medical or fitness-outcome claims |

## Standing PENDING COWORK questions (apply to every brief)

1. What do Google autocomplete, People Also Ask and Pinterest search suggestions show for the primary keyword today? (Record the date.)
2. Who ranks on page one in the US today, and what format are they? (Describe; do not name competitors in published copy.)
3. Which claims in the draft have an official or primary source? List them with URLs.
4. Is each named product type still sold, and does a verified listing exist for any product we want to link? (`docs/commerce/PRODUCT-RESEARCH.md`)
