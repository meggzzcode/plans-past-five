# Trust and format fixes (from REVIEW-2)

| # | Before | After |
|---|---|---|
| 1 | `blockText` returned "" for image, ifYouLoved, shop blocks; 220 wpm; markup counted. A 2,300-word article read "4 min". | Every block type handled (exhaustive switch), markup stripped, dek included, 200 wpm, rounded, minimum 1. New `articleWordCount`. Shop blocks count 0. ifYouLoved counts hobby slugs as words (hobby data cannot be imported without a cycle). |
| 2 | Only p/list/item note showed inline markup; tryThisWeekend, makePlan, noSpend, girlsNight, saveSplurge, first30, quote, whatYoullNeed, h2/h3, captions, item title/first printed raw `[x](/y)` / `**x**`. | All of them render through `Inline`. Test renders each block type and asserts no `](` or `**`. |
| 3 | /methodology: "We do not show prices, star ratings, brands...". | methodology and editorial-policy now say: names and brands only for products checked against the Amazon listing; no prices, discounts, ratings or review counts; links go to ordinary product pages; no commission currently, disclosure changes automatically if Associates is activated; third-party sellers labelled; products not tested; sources and last-checked shown. |
| 4 | Nothing showed `sources` / `verifiedAt`. | Collapsed `details` "Sources and when we checked" at end of article (title links, `rel="noopener noreferrer"`, optional note, "Facts last checked: Month D, YYYY"). Nothing shown with no sources. JSON-LD `dateModified` uses the latest of updatedAt/verifiedAt only if later than publishedAt (`modifiedAfterPublish` in seo.ts). |
| 5 | /corrections: "Our inbox is being set up." | Honest statement: no public inbox yet; corrections via the contact page once live; every correction logged here with date. Email shown only when `site.contactEmail` is set. about.tsx explains the single "Plans Past Five Editors" identity and points to the editorial standards page for AI disclosure. |
| 6 | /editorial-standards 404. | New route: 301 redirect to /editorial-policy, noindex, own canonical, not in sitemap. |

## Not fixed / for the lead
- **Wording mismatch (report):** `src/components/editorial/AffiliateNote.tsx` says "Links open an Amazon search", `src/components/commerce/ProductCard.tsx` ShopDisclosure says "ordinary Amazon product pages". Both are correct for what they sit beside, but a page with both blocks shows both sentences (the review's complaint). Consider one shared sentence.
- **affiliate-disclosure.tsx (lead-owned) contradicts methodology now:** it says links "currently open ordinary Amazon search results", that we "recommend product types ... rather than pushing one brand", and "We don't list prices, star ratings or reviews". It needs: some links go to checked product pages with brand names; searches only where a type is described.
- `shop.$category.tsx` line ~146 says buttons "open an ordinary Amazon search": same contradiction.
- Footer label "Editorial Standards" exists; page URL stays /editorial-policy.
- Not addressed (out of scope): prices, product photos, content repetition, template voice.
- Tests are in `src/test/trust-format.test.tsx` (tsx, because it renders components).
- `bunx eslint .` still reports prettier errors in several `src/content/article-*.ts` files being edited by content workers; not touched here. tsc, vitest (270) and vite build pass.
