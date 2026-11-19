# M1 implemented (home, brand, nav, footer, Start Here, About, 404)

## Done
- Home meta title/description rewritten; home now passes an og:image (hero postcard, absolute URL via `absoluteUrl`).
- Hero: new subhead, cherry primary CTA "Find your thing", text link "or plan this weekend", microcopy "A few quick questions. No account needed." (dropped the "two minutes" claim: quiz is adaptive, time unverified). Hero image narrower on phone so CTA is above the fold.
- Journey tiles: payoff-led taglines; Find Your Thing is visually dominant (cherry ring + "Start here" kicker).
- Home re-sequenced: hero, journeys, season, shop teaser, six sections, journal, closing (shop moved up).
- Season strip cards: added verb "See what you need".
- Shop teaser: heading "Everything you need for try number one", one-line "Opens on Amazon", dek + "See the starter list" on every tile, link "See the starter lists", gingham top border. Disclosure still config-driven via AffiliateNote (not hardcoded).
- Sections heading "Pick your kind of plans past five"; journal "Ideas worth stealing" / "More ideas".
- Closing: new line plus real "Find your thing" button and "or start here".
- Header: desktop nav reordered (Make Some Plans, Shop Your Hobby, Hobbies, The Journal; Start Here stays in menu/footer); mobile menu leads with a full-width Find Your Thing button, groups renamed "Start here" / "Browse by mood" / "More" (Tonight and My Plans demoted to More).
- Footer: Find your thing button; columns renamed Plans / Try it / About the site; Start Here moved to Try it.
- 404: Find Your Thing is the solid button, Back home outline, text links to Make Some Plans and Shop Your Hobby.
- /start-here: rebuilt as three image cards with buttons (adds "Already know your hobby?"), "Rather just look around?" as six picture tiles, "Save as you go" (no account), new meta + og:image.
- /about: new opener, merged "How we work" (AI disclosure still points to Editorial Standards; "no single named author" kept), end CTA, Caveat caption, new meta + og:image.

## Skipped
- Dedicated 1200x630 brand OG card and per-section OG templates: needs new design asset (Canva/Cowork). Hero/girlsNight photo used as interim og:image. Default og fallback inside `seo()` not added (file outside ownership).
- New journey/shop-tile photography (outcome flat-lays), season-card thumbnails, 404 illustration: need photos/art.
- Featured starter-kit home module and Pinterest "Save" prompts: bigger moves, left for a later pass (product data has no verified items to feature without owner choice).
- Shortened homepage disclosure text: kept the config-driven AffiliateNote (component not owned; wording must follow `shopDisclosureSentences`).
- Merging "Six ways" into a scroller: kept as grid; page now leads with shop before it.
- Footer "Contact"/publisher items, contact email, named publisher: owner decisions.
- site.ts text unchanged (hierarchy of brand lines kept; no edits needed).

## Verification
prettier on touched files, eslint on touched files clean, tsc clean, vitest 523 pass (one About assertion preserved by keeping "no single named author" wording), Playwright at 390 and 1280: no horizontal overflow, no page errors on /, /start-here, /about, /404.
