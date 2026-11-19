# Article roadmap: the 30 planned articles

This supersedes earlier lists (including the outline-only entries in `src/content/drafts.ts` and the 8 outstanding drafts in `CLAUDE-HANDOFF.md`). Slugs are targets: a slug becomes final only when the article is published, because it becomes a URL (`/journal/<slug>`).

Status as of 2026-11-19, checked by listing `src/content/article-*.ts` and reading each file's `status`. Other workers are still creating article files, so **check again** (command below) before relying on this table.

```
grep -H "status:" src/content/article-*.ts
```

Status meanings: published = `status: "published"` in the article file and registered in `src/content/index.ts`. draft = file exists with `status: "draft"` (not public, not in the sitemap). NEEDS WRITING = no `article-*.ts` file exists.

Important registration note: as of this check `src/content/index.ts` imports only the four published article files plus `drafts` from `src/content/drafts.ts`. The newer `article-*.ts` draft files are not yet imported there, so they are not yet in `allArticlesIncludingDrafts`. Register each new file (add the import and put it in the `all` array) when it is ready for review; keep `status: "draft"` until it passes `docs/content/ARTICLE-QUALITY-CHECKLIST.md`. Also note `src/content/drafts.ts` still holds older outline-only entries (for example `solo-date-ideas`, `how-to-host-a-craft-night`, `low-energy-hobbies`) whose slugs collide with the newer files; resolve that duplication before registering, so one slug has one source.

Type key: CB = commercial buying guide, SB = shoppable beginner guide, IN = inspirational. See `docs/content/EDITORIAL-STRATEGY.md`.

## Creative Corner (10)

| # | Slug | Working title | Type | Status | File |
|---|---|---|---|---|---|
| 1 | how-to-start-junk-journaling | How to Start Junk Journaling: A Beginner's Guide | SB | published | `src/content/article-junk-journaling.ts` |
| 2 | junk-journaling-supplies-for-beginners (FLAGSHIP 1) | Junk Journaling Supplies for Beginners: What You Actually Need | CB | draft | `src/content/article-junk-journaling-supplies-for-beginners.ts` |
| 3 | how-to-start-air-dry-clay (FLAGSHIP 2) | How to Start Air-Dry Clay as a Hobby | SB | draft | `src/content/article-how-to-start-air-dry-clay.ts` |
| 4 | watercolor-painting-for-beginners | Watercolor Painting for Beginners: Supplies, Techniques and First Projects | CB | draft | `src/content/article-watercolor-painting-for-beginners.ts` |
| 5 | creative-hobby-starter-kits-worth-considering | Creative Hobby Starter Kits That Are Actually Worth Considering | CB | draft | `src/content/article-creative-hobby-starter-kits-worth-considering.ts` |
| 6 | how-to-start-embroidery | How to Start Embroidery: Everything a Beginner Needs | CB | draft | `src/content/article-how-to-start-embroidery.ts` |
| 7 | how-to-start-crocheting | How to Start Crocheting: A Beginner's Guide | CB | draft | `src/content/article-how-to-start-crocheting.ts` |
| 8 | how-to-start-a-reading-journal | How to Start a Reading Journal (working title) | SB | draft | `src/content/article-how-to-start-a-reading-journal.ts` |
| 9 | flower-arranging-as-a-hobby | Flower Arranging as a Hobby: How to Start at Home | SB | draft | `src/content/article-flower-arranging-as-a-hobby.ts` |
| 10 | creative-hobbies-you-can-start-at-home | 21 Creative Hobbies You Can Start at Home | IN | published | `src/content/article-creative-home.ts` |

## After Hours (5)

| # | Slug | Working title | Type | Status | File |
|---|---|---|---|---|---|
| 11 | hobbies-to-try-when-life-feels-like-work-sleep-repeat | 35 Hobbies to Try When Your Life Feels Like Work, Sleep, Repeat | IN | published | `src/content/article-35-hobbies.ts` |
| 12 | things-to-do-after-work-instead-of-scrolling | 25 Things to Do After Work Instead of Scrolling | IN | published | `src/content/article-after-work.ts` |
| 13 | low-energy-hobbies | 20 cozy low-energy hobbies (working title; check the file for the current title) | SB | draft | `src/content/article-low-energy-hobbies.ts` |
| 14 | affordable-hobbies-under-25 | Affordable hobbies under $25 (check the file for the current title) | CB | draft | `src/content/article-affordable-hobbies-under-25.ts` |
| 15 | how-to-find-a-hobby-as-an-adult | How to Find a Hobby as an Adult When You Don't Know Where to Start | IN | draft | `src/content/article-how-to-find-a-hobby-as-an-adult.ts` |

## Better Together (5)

| # | Slug | Working title | Type | Status | File |
|---|---|---|---|---|---|
| 16 | how-to-host-a-mahjong-night (FLAGSHIP 3) | How to Host a Mahjong Night: A Beginner's Guide | CB | draft | `src/content/article-how-to-host-a-mahjong-night.ts` |
| 17 | how-to-host-a-craft-night | How to Host a Craft Night With Friends | CB | draft | `src/content/article-how-to-host-a-craft-night.ts` |
| 18 | how-to-host-a-paint-night-at-home | How to Host a Paint Night at Home (working title) | CB | draft | `src/content/article-how-to-host-a-paint-night-at-home.ts` |
| 19 | girls-night-ideas-that-arent-drinks | Girls' night ideas that aren't drinks (check the file for the current title) | IN | draft | `src/content/article-girls-night-ideas-that-arent-drinks.ts` |
| 20 | how-to-start-a-book-club | How to Start a Book Club With Friends | SB | draft | `src/content/article-how-to-start-a-book-club.ts` |

## The Weekend Edit (4)

| # | Slug | Working title | Type | Status | File |
|---|---|---|---|---|---|
| 21 | how-to-plan-a-perfect-picnic | How to Plan a Perfect Picnic: Activities, Food and Essentials | SB | draft | `src/content/article-how-to-plan-a-perfect-picnic.ts` |
| 22 | at-home-creative-weekend | A Complete Guide to Planning an At-Home Creative Weekend | CB | draft | `src/content/article-at-home-creative-weekend.ts` |
| 23 | things-to-do-on-the-weekend | Things to do on the weekend (check the file for the current title) | IN | draft | `src/content/article-things-to-do-on-the-weekend.ts` |
| 24 | cheap-weekend-adventures | Cheap weekend adventures (check the file for the current title) | IN | draft | `src/content/article-cheap-weekend-adventures.ts` |

## Table for One (3)

| # | Slug | Working title | Type | Status | File |
|---|---|---|---|---|---|
| 25 | solo-date-ideas | Solo date ideas (check the file for the current title) | SB | draft | `src/content/article-solo-date-ideas.ts` |
| 26 | cozy-solo-dates-at-home | Cozy solo dates at home (check the file for the current title) | SB | draft | `src/content/article-cozy-solo-dates-at-home.ts` |
| 27 | how-to-plan-a-solo-saturday | How to Plan a Solo Saturday You'll Actually Look Forward To | IN | draft | `src/content/article-how-to-plan-a-solo-saturday.ts` |

## A Little Movement (3)

| # | Slug | Working title | Type | Status | File |
|---|---|---|---|---|---|
| 28 | pickleball-for-beginners | Pickleball for Beginners (working title) | CB | draft | `src/content/article-pickleball-for-beginners.ts` |
| 29 | how-to-start-playing-tennis-as-an-adult | How to Start Playing Tennis as an Adult (working title) | CB | draft | `src/content/article-how-to-start-playing-tennis-as-an-adult.ts` |
| 30 | active-hobbies-for-women-who-dont-love-the-gym | Active Hobbies for Women Who Don't Love the Gym (working title) | SB | draft | `src/content/article-active-hobbies-for-women-who-dont-love-the-gym.ts` |

## Tally at time of writing (2026-11-19, re-checked at the end of the session)

- Published: 4 (rows 1, 10, 11, 12).
- Draft files present: 26 (every other row).
- NEEDS WRITING: 0. Other workers created the last five files (reading journal, paint night, pickleball, tennis, active hobbies) while this page was being written.
- 4 + 26 + 0 = 30. Check again: files are still changing, and a file existing does not mean it is reviewed or ready.

## Drafts outside the 30

Two extras fall outside the 30 and move to the buyer backlog (`docs/buyer/CONTENT-ROADMAP.md`):

| Slug | Status at time of writing |
|---|---|
| how-to-take-yourself-on-a-solo-coffee-shop-date | draft file exists: `src/content/article-how-to-take-yourself-on-a-solo-coffee-shop-date.ts` |
| how-to-get-into-recreational-cycling-as-an-adult | draft file exists: `src/content/article-how-to-get-into-recreational-cycling-as-an-adult.ts` |

Keep these out of the 30-article scope count. If published, they are a bonus, not a substitute for a roadmap row.

## Dependencies between rows

- Rows 2, 3, 16 are flagships: finish first.
- Row 5 (starter kits) depends on `docs/commerce/STARTER-KITS.md` kits being researched.
- Rows 28 and 29 need safety and rules sources (`coworkChecks`), such as local court rules and equipment guidance from official governing bodies; PENDING COWORK to identify and verify the sources.
- Nothing is published until `docs/content/ARTICLE-QUALITY-CHECKLIST.md` passes; see `docs/SOP-publish-article.md`.
