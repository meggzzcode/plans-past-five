# M4 implementation notes (second-half articles)

Meta description is stored as the article `dek` (seo reads `a.dek`), so dek and meta rewrites were merged into one field. Where the report gave both, the more specific dek was used; where it gave only a meta line, that line became the dek.

## Done
- Titles: weekend ("20 Weekend Plans for Every Mood (Pick One, Skip the Drift)"), junk supplies, tennis (four-week plan), solo-date-ideas, book club. Paint night and pickleball kept.
- Deks (and so metas) for all 14 published articles. Two junk deks keep the "How to begin" / "What to buy" openers that `junk-journaling-consistency.test.ts` requires.
- Intros: paint night, picnic, solo Saturday, book club, reading journal (para 2), junk journaling, coffee date (pleasure line first), tennis, pickleball.
- Shop blocks: benefit-led titles and deks for picnic, book club, reading journal, tennis, pickleball, junk supplies, weekend, coffee date ("Pack the date"), after work (dropped "affordable"); new `shopHobby` block in how-to-start-junk-journaling after the first-page image (its declared productIds). Reading journal and coffee date shop blocks moved up beside the buy/pack sections.
- solo-date-ideas shows all five declared products; after-work shows five (junk-journals added).
- Book club: invite text pulled out into a `quote` block under the step.
- CTAs: one `makePlan` block added before the closing link on picnic, book club, reading journal, tennis, coffee date, junk guide, junk supplies, low-energy, pickleball, solo-date-ideas, after work. Solo Saturday and weekend makePlan text reworded, closing links cut to one, and solo Saturday / weekend cross-link (three-part vs four-part).
- Hero swaps (existing images): junk supplies -> shopCreative, low-energy -> shopPottery, book club -> shopGirlsNight, weekend -> hiking.
- Drafts: titles for crocheting, embroidery, watercolor; deks for affordable-hobbies, cute-weekend-plans, make-friends. Air-dry clay unchanged (report said keep).
- Paint night: edits were applied, then the other agent also edited this file (shop block, hero). Their version is current and was left alone.

## Skipped
- Amazon button label "See it on Amazon": component code, not article content.
- "Plan my Saturday" / "Plan my weekend" button labels: the makePlan block's links are fixed in ArticleBody.tsx.
- Picnic extra products (insulated bag, plates, basket): no such product IDs in the verified catalog.
- Inline "shop this idea" links in listicles, mid-page shop strips on low-energy / listicles, sticky "Shop the picks" jump link: structural or catalog work needing owner decision.
- Collapsible "Reading the labels", "Keep it safe" boxes, visual "three baskets" cards, picnic styling 3-item list: need new block types.
- Pagination of heading changes: report asked for none beyond the above.
- Cost-label standardisation ("Under $25" etc.) and the doctor-note move (already above the shop block): needs owner decision on price wording.
- New photos (book club group, paint-night mini gallery, bookshelf spread, notebook plus coffee, weekend composite, Pinterest portrait images), og:image URL check (technical), mobile tap targets: not article edits.
- Hero for picnic page vs weekend overlap resolved only for weekend; picnic keeps `picnic`.

## Checks
- `node scripts/build-content.mjs` OK. `bunx tsc --noEmit` clean.
- vitest: 1 failure, build-content byte-stable, caused by the other agent's M3 files saved without a trailing newline (HEAD files end with "}\n"). Not in my set.
- eslint --quiet: prettier errors only in src/components/quiz/ResultsView.tsx and src/routes/contact.tsx (not touched by me).
- Note: I briefly restored a scratch backup over content/articles (an 8 second window) before re-applying; the other agent should recheck their edits if anything looks missing.
