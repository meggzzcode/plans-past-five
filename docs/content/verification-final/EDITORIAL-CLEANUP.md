# Editorial cleanup (2026-11-19)

One line per article. Files edited only through `articleToJson`; `node scripts/build-content.mjs` OK (32 published, 2 draft). Make Some Plans callouts now remain in 6 articles: solo-saturday, solo-coffee-shop-date, picnic, things-to-do-on-the-weekend, things-to-do-after-work, paint-night.

- active-hobbies-for-women-who-dont-love-the-gym: 12 generic "Varies" cost chips replaced with text-backed guidance ("Often free" etc.) or removed.
- cheap-weekend-adventures: 24 "Varies" chips replaced or removed; "free bird-ID app" reworded; opener no longer repeats the bakery-bag image.
- cozy-solo-dates-at-home: 9 "Varies" chips replaced or removed.
- creative-hobbies-you-can-start-at-home: 4 chips fixed; pottery food-safety line now the shared conservative statement.
- creative-hobby-starter-kits-worth-considering: 5 "Varies" chips removed; pottery wording aligned.
- girls-night-ideas-that-arent-drinks: 20 chips replaced or removed; social "send this to the group chat" closer kept.
- hobbies-to-try-when-life-feels-like-work-sleep-repeat: quiz callout turned into a plain paragraph; "Golden-hour" varied; quiz length not overstated.
- how-to-find-a-hobby-as-an-adult: quiz callout now plain paragraph; "seven-question" corrected to "up to six".
- how-to-get-into-recreational-cycling-as-an-adult: "Picture it:" opener removed and folded into the next paragraph.
- how-to-host-a-craft-night: closer reworded (still social); pottery food-safety line aligned.
- how-to-host-a-mahjong-night: shop heading and dek now say the picks are American-style; other versions pointed to a set made for them.
- how-to-host-a-paint-night-at-home: "Picture it:" opener replaced; shop heading and dek describe canvases and brushes (not a "group kit"); callout reworded and moved after the timeline.
- how-to-plan-a-solo-saturday: callout reworded and moved to the end of the Thursday section; "have more" plural fixed.
- how-to-start-a-book-club: Make Some Plans callout replaced with a social group-chat closer; shop block matches its heading.
- how-to-start-a-reading-journal: callout replaced by a question closer; sources added (LA County Library example), verifiedAt 2026-11-19, removed from the source-exemption list.
- how-to-start-junk-journaling: shop heading and dek match the seven products shown; callout removed.
- junk-journaling-supplies-for-beginners: shop dek no longer promises a sticker set; callout removed.
- low-energy-hobbies: shop block now matches what renders (embroidery kit, scissors); 7 chips fixed; callout replaced by a short nudge; "have more" plural; plant-care and tiredness wording now match UW-Madison Extension and NHS; sources added, verifiedAt 2026-11-19, removed from the source-exemption list.
- pickleball-for-beginners: callout replaced by a question closer.
- solo-date-ideas: 16 chips fixed; callout removed (closing paragraph still links the planner); "have more" plural.
- things-to-do-after-work-instead-of-scrolling: 3 chips fixed; "golden-hour" title varied; callout reworded and moved above the shop block.
- things-to-do-on-the-weekend: 15 chips fixed.
- how-to-start-playing-tennis-as-an-adult: "Golden-hour" varied; callout replaced by a question closer.
- src/data/hobbies.ts (Pottery Painting): first session, five-step first week (what to ask the studio, what to bring, thin coats, display-only unless food safe), supplies and optional list expanded; no prices or venues added; "porcelain paint" and "get a mug" claims removed.

## Source gate
Removed `SOURCELESS_ALLOWED` from `scripts/content-lib.mjs` and the test that locked it in `src/test/build-content.test.ts`. Sources read directly 2026-11-19: lacountylibrary.org/ebooks-audiobooks, hort.extension.wisc.edu/articles/houseplant-care/, nhs.uk/symptoms/tiredness-and-fatigue/. Not sourced, kept as editorial suggestions: "stop if anything hurts", two-minute setup, reading-journal layouts.

## Not changed (outside ownership)
- "More in The Pottery Era" label under the paint-night shop block comes from the canvases' home collection in the catalog/shop code.
- `src/data/products.ts` ceramic-painting-kits `lookFor` still says "Kits that say food-safe once baked": should read "Kits that state clearly whether the finished piece is food safe".
- /shop/girls-night-in paint-and-sip wording; planner "Order or pick up a kit ahead" step.
