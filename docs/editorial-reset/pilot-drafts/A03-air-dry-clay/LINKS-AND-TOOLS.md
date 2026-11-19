# A03 LINKS AND TOOLS

## Internal links

Slugs come from E1-ARTICLE-INVENTORY.csv and the existing hobby routes. "Planned" means the article is not yet built; do not link until it exists.

| Link text (anchor) | Destination | Status | Placement |
|---|---|---|---|
| Air-dry clay on the hobby page | /hobbies/air-dry-clay | exists | closing / "Next" block |
| Painting your own pottery | /hobbies/pottery-painting | exists | where the guide says no kiln needed |
| Host a paint night at home | /journal/how-to-host-a-paint-night-at-home | A07, planned | after "Paint and seal" |
| Are craft kits worth it? | /journal/are-craft-kits-worth-it | A20, planned (the old creative-hobby-starter-kits-worth-considering URL will 301 here) | in "Not on the list" where the kit is mentioned |
| A whole creative Saturday | /journal/at-home-creative-weekend | A30, slug exists, to be rebuilt | closing |
| Host a craft night | /journal/how-to-host-a-craft-night | A25, slug exists | optional, closing |
| First junk-journal spread | /journal/how-to-start-junk-journaling | A02, slug exists | optional |

## Tools this article feeds

**1. Make Plans** (`/make-plans`). The route reads when, length, vibe, who, budget, home, setting and energy. Handoff: a button after the timeline.
- Button wording: "Plan your clay evening"
- Helper line: "We will pick the evening. You pick the night."
- Target: `/make-plans?when=weeknight&length=evening&vibe=creative&who=alone&home=1`
- Gap: there is no clay-specific activity id to pass as `with=`; confirm in src/data/activities.ts (the grep found only the pottery-studio activity). Do not invent one.

**2. Quiz** (`/hobby-finder`). Inbound only: the quiz result for "make something with my hands" should link here (E1). Handoff text on the quiz result: "Air-dry clay: three small pieces in one evening." Link text "Read the beginner guide". In the article, a single line near the end: "Not sure clay is your thing? Take the hobby quiz." linking to /hobby-finder.

**3. Hobby page** (`/hobbies/air-dry-clay`). Article links to it; the hobby page should link back with: "Start with the three-piece guide."

**4. Collection: The Creative Edit.** Handoff wording at the end of the shopping block: "The Creative Edit: everything for making things with your hands." Destination: the Creative Edit collection page. NOTE: the current routes carry the old `creative-corner` category and there is no confirmed Creative Edit route; the destination is unresolved (ISSUES.md).

**5. Save to My Plans / Add to my list.** Existing components. A "Add the three essentials to my list" action would need a product-id block (E2 `productEdit`), which does not yet exist.

## Inbound links wanted

A20, A07, A30 and A25 should link here; the Creative Edit collection page and the hobby page should too.
