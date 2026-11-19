# M3 implementation (articles, first half)

Edited only content/articles JSON for the 14 articles in M3, then ran `node scripts/build-content.mjs`. Facts, sources, verifiedAt, coworkChecks and status are unchanged. No tests needed changing.

## Done
- Titles, titleItalic (kept as a literal substring) and deks (which are the meta description) per section 3.3: at-home-creative-weekend, cheap-weekend-adventures, creative-hobbies, starter-kits, flower-arranging, girls-night, how-to-find-a-hobby, cycling, craft-night (title), mahjong. Gym, hobbies-to-try and paint-night: dek. Kept as the report said: cozy dek/title, hobbies-to-try title.
- Shop block titles/deks per 3.5 for all 14 except mahjong (kept) and flower-arranging (no verified products). Lead products reordered: gym (pickleball and tennis sets first), cheap-weekend (binoculars first).
- Hooks: cheap-weekend sensory sentence; starter-kits new intro (the "no named kits, no hands-on testing" note kept, moved to a "A note on method" line under "Where to look"); cycling "Picture it" line after paragraph one; cycling Step 7 heading now "Build up to the bakery".
- CTAs and endings: girls-night shop block moved up to right after the "Cozy and at home" section, closing "send to the group chat" line added; same closing line added to craft-night and mahjong; hobbies-to-try quiz text tightened (button links come from the makePlan block) and links to the girls-night and mahjong articles added in the social section; how-to-find-a-hobby quiz paragraph is now a makePlan callout.
- at-home-creative-weekend: bridge line under "The shape of the weekend" linking to the supply list.
- Hero swaps using existing keys: flower-arranging shopAdventures -> picnic (flowers photo), cycling hiking -> shopAdventures, paint-night potteryNight -> watercolor.

## Skipped (needs code, new photos, catalog entries or owner decision)
- All template/component items (T1-T13, 3.1, section 4 items 1, 3-8, quick wins 3-5, 7, 11): product thumbnails and buttons, mid-article shop bridge component, disclosure line, byline, "Next up", verbs on "Loved this?", "Varies" chip, SaveButton after tryThisWeekend, og:image path, pinImage field.
- Journal index changes (dek, meta, chips, pinned lead): not article JSON.
- Flower-arranging shop block and cycling helmet/lights: no verified catalog products. Cycling products not added.
- New heroes (jug of flowers, bike by canal, paint table): need new photos. craft-night (girlsNight) and girls-night still share a hero; gym keeps hiking.
- Per-menu kit links in craft-night, byline "Updated", "Optional" wording across other sites, starter-kits named recommendation: owner decision or catalog data.
- Collection-name introductions in body copy (cross-page item): not changed.

## Notes
- Another agent edited paint-night at the same time; its dek ("One easy painting...") was kept and only the shop block title/dek and hero were applied.
- Remaining vitest failures (byte-stable check, junk-journaling intro) come from other agents' article files (trailing newline, junk journaling); eslint prettier errors are in src files not touched by M3.
