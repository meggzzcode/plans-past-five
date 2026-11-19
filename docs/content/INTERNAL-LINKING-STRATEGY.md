# Internal linking strategy

Built from the real routes in `src/routes/` and the slugs in `docs/content/ARTICLE-ROADMAP.md`. Articles live at `/journal/<slug>`. Linking exists to help a reader take the next step, not to push authority around. If a link does not help a person reading that sentence, leave it out.

## How links are produced today

- Inline: write `[text](/journal/slug)` inside any `p`, `item` or list text in an article file (supported by the inline renderer; see `CLAUDE-HANDOFF.md`).
- Computed: `relatedArticles()` in `src/content/index.ts` scores other published articles by shared hobbies (x2) plus same category (x1) and shows up to three. Add `related: ["slug"]` in an article for hand-picked extras.
- Block inserts: `ifYouLoved` (hobby profile cards), `shopHobby` and `starterKit` (product cards), `makePlan` (planner CTA).
- Drafts never appear in any public link, list or sitemap: only published articles are public (`articles` in `src/content/index.ts`). Do not link to a draft slug from a published article; it would 404 until publishing. Check before publishing: every `/journal/...` target must be published.

## Hub and spoke map

Hubs are the six section pages plus the shop and tools. Each hub links to its articles through the category listing; each spoke article links back to its hub and to one or two sibling spokes.

| Hub (route) | Spokes (article slugs) | Natural cross-hub links |
|---|---|---|
| `/creative-corner` | how-to-start-junk-journaling, junk-journaling-supplies-for-beginners, how-to-start-air-dry-clay, watercolor-painting-for-beginners, creative-hobby-starter-kits-worth-considering, how-to-start-embroidery, how-to-start-crocheting, how-to-start-a-reading-journal, flower-arranging-as-a-hobby, creative-hobbies-you-can-start-at-home | `/shop/creative-girl`, `/shop/pottery-era`, `/shop/bookish-girl` |
| `/after-hours` | hobbies-to-try-when-life-feels-like-work-sleep-repeat, things-to-do-after-work-instead-of-scrolling, low-energy-hobbies, affordable-hobbies-under-25, how-to-find-a-hobby-as-an-adult | `/hobby-finder`, `/tools/hobby-budget`, `/tools/tonight` |
| `/better-together` | how-to-host-a-mahjong-night, how-to-host-a-craft-night, how-to-host-a-paint-night-at-home, girls-night-ideas-that-arent-drinks, how-to-start-a-book-club | `/shop/girls-night-in`, `/shop/bookish-girl` |
| `/weekends` | how-to-plan-a-perfect-picnic, at-home-creative-weekend, things-to-do-on-the-weekend, cheap-weekend-adventures | `/make-plans`, `/shop/little-adventures` |
| `/solo-dates` | solo-date-ideas, cozy-solo-dates-at-home, how-to-plan-a-solo-saturday | `/make-plans` |
| `/movement` | pickleball-for-beginners, how-to-start-playing-tennis-as-an-adult, active-hobbies-for-women-who-dont-love-the-gym | `/shop/sporty-girl` |

Shop collection slugs come from `CollectionSlug` in `src/data/products.ts`: pottery-era, creative-girl, sporty-girl, girls-night-in, bookish-girl, little-adventures, journaling-era, cozy-after-hours. Hobby profile pages are `/hobbies/<slug>`; they are noindexed until a published article covers the hobby (`isHobbyIndexable` in `src/data/hobbies.ts`), so linking a published guide to its hobby profile helps readers and unlocks indexing through the `hobbies` field.

## Pillar relationships (flagships)

- **junk-journaling-supplies-for-beginners** (flagship 1) is the buying companion to **how-to-start-junk-journaling**. Link both ways: the how-to says "here is the full supply list" at the point a reader asks what to buy; the supplies guide says "new to this? start with the how-to".
- **how-to-start-air-dry-clay** (flagship 2) links to how-to-start-embroidery or watercolor-painting-for-beginners only where painting or finishing is mentioned (painting dried clay), and to `/shop/pottery-era`.
- **how-to-host-a-mahjong-night** (flagship 3) links to how-to-host-a-craft-night and girls-night-ideas-that-arent-drinks as other ways to host, and to how-to-start-a-book-club as another recurring group.
- **creative-hobby-starter-kits-worth-considering** links down to each how-to it mentions and receives links from them wherever a reader might ask "is a kit worth it?".

## Cluster suggestions (not mandates)

| Reader question | Path |
|---|---|
| "I don't have a hobby" | how-to-find-a-hobby-as-an-adult to hobbies-to-try-when-life-feels-like-work-sleep-repeat to `/hobby-finder` |
| "I'm tired after work" | things-to-do-after-work-instead-of-scrolling to low-energy-hobbies |
| "I want to start something creative, cheaply" | affordable-hobbies-under-25 to creative-hobbies-you-can-start-at-home to a specific how-to |
| "Plan my weekend" | things-to-do-on-the-weekend to at-home-creative-weekend or how-to-plan-a-perfect-picnic |
| "I'd like to go out alone" | solo-date-ideas to how-to-plan-a-solo-saturday (and the buyer-backlog coffee shop date article if published) |
| "I want to move more, gently" | active-hobbies-for-women-who-dont-love-the-gym to pickleball-for-beginners or how-to-start-playing-tennis-as-an-adult |

## Rules

1. **Reader first.** Add a link only where the sentence naturally raises the question the target answers. No "you may also like" stuffing at paragraph ends.
2. **No forced links.** Do not link two articles just because they share a category, and do not shoehorn a keyword into anchor text. A good article may have two internal links or twelve.
3. **Descriptive anchors.** "the full supply list for junk journaling", not "click here" or an exact-match keyword repeated.
4. **One link per target per section.** Do not repeat the same link back to back.
5. **No links to unpublished work.** Verify the target is `status: "published"` (and appears in `/sitemap.xml` after deploy).
6. **Hobby profile links** only where the profile adds something (supplies, difficulty, related hobbies), and only for hobbies with a published guide.
7. **Product links are not internal links.** They follow the affiliate rules (`docs/buyer/AFFILIATE-ACTIVATION.md`) and show disclosure; internal links never carry tracking parameters.
8. **Update both ends.** When publishing a spoke, add its inbound link from the hub-adjacent articles that should point to it, and check `relatedArticles()` output.
9. **Retire gracefully.** If a slug changes, update every inline link; the weekly link check (`docs/buyer/WEEKLY-MAINTENANCE.md`) flags broken internal links.

## Audit routine

After each publish: run the link check (`bun run build`, `node scripts/serve-built.mjs 3000`, `bun run health:links`), and read the article's "related reading" block to confirm the three suggestions make sense. Orphans (published articles no other page links to) should get at least one natural inbound link or be reconsidered.
