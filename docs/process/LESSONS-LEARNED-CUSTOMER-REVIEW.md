# Lessons learned: why the first build underperformed with reviewers (2026-11-19)

Source: three independent simulated persona reviews (docs/marketplace/reviews/) and five blind round-2 reviews (docs/marketplace/reviews2/). Simulated opinions, not customer data. Make these standing steps for every future site.

## What went wrong, and the rule that fixes it
| Cause | Symptom reviewers saw | Standing rule |
|---|---|---|
| Content generated from one template | Same "Imagine..." opener, same callout ritual in every article; "this is a template" | Choose structure per article TYPE before drafting; ban stock openers; max 3 callouts per article; scan all articles side by side for repeated phrases |
| Shopping built as a compliance system first | Text-only cards, no photos, hedged recommendations ("confirm before buying"), shop felt pointless (desirability 3/10) | Write product cards as recommendations: one pick, one benefit, role label; keep disclaimers to one honest line per kit; plan for authorised photos from day one |
| Policy pages and catalog drifted | /methodology said "no brands" while cards named brands | One disclosure constant; a test that fails when policy copy and catalog behaviour disagree |
| Logic tested only on ideal inputs | Solo request returned social plan; tonight returned Saturday; totals summed maximums | Scenario-matrix tests over input combinations with invariants before shipping any tool |
| Single sources of truth missing | Costs and counts differed between pages ("36", "43", "4/5/6 essentials") | Derive counts and costs from one data source; test it |
| Internal notes leaked into reader text | Raw markdown, editor notes, "confirm before recommending" | Lint for markdown and editor phrases in published content; reviewer pass before publish |
| CSS rule for prose links overrode utilities | Invisible button text in callouts | Scope descendant colour rules away from .not-prose; contrast test |
| Images repeated and AI-looking | Same photos reused, generated faces/objects | Image inventory audit with reuse limit; commission distinct hero per article; log rights per image |
| Over-verification zeal | Plain useful advice hedged into mush | Verify safety, health, legal and hard facts; allow suggestions and typical ranges labelled as such |
| Trust basics missing | Contact says "inbox being set up"; anonymous byline; no named entity | Working contact, named publisher and corrections inbox before any listing or affiliate application |
| Editing only through code | A buyer could not add an article or image | Ship a content editor (Pages CMS) with build-time validation before listing |
| Deploys unbounded on a free host | Four deploys in 3 minutes | Deploy only on a release marker commit; budget the monthly credits |

## Reusable improvements (copy to every site)
Scenario-matrix tool tests; one disclosure constant plus a policy-vs-catalog test; contrast test for prose colour rules; content validator with plain-English build errors; saved-items export/import with strict validation; role-labelled product cards with a single best-pick; blind multi-persona review with real tasks; usability script for humans.
