# Final fixes (share, chips, technical QA, contact)

No new features. Scope unchanged. Nothing committed. Checks at the end: prettier on `src` code files only (never content JSON), `bunx eslint . --quiet` clean, `bunx tsc --noEmit` clean, `bunx vitest run` 55 files / 752 tests passing (was 737). Checked with Playwright at 390 and 1280 px: no horizontal overflow on the planner result, Tonight, article, hobby page, shop collection, saved, contact and 404.

## Fixed

1. **Share consistency.**
   - One helper, `sendToGroupChat` in `src/lib/share.ts`, now behind every send/share button. It tries `navigator.share` (title, text, canonical URL, and the quiz card PNG where the browser allows files), and otherwise copies the text. A closed share sheet does not trigger a copy. `textIncludesUrl` stops a plan's link being repeated when copied.
   - One component, `src/components/share/ShareActions.tsx`, renders the buttons: "Send to the group chat" and "Copy link" (or "Copy my list" / "Copy list" where there is no link). On copy the button itself reads "Copied" with a check mark and a status line says "Copied. Paste it in the chat." (2.5 s). Buttons wait for hydration like the other JS-only buttons.
   - Surfaces now using it: planner result, Tonight, saved plan and saved hobby, saved/shopping list, quiz result, article, hobby page (via `ShareButtons`, which keeps its Pin it button), and the "Shop your hobby" list block.
   - Shopping-list shares carry the existing export-safe text (our own page link, no Amazon URLs). No calendar anywhere (tested).
   - Removed the old copy-only / share-only code in `PlanResult`, `tools.tonight`, `saved`, `ShopMyHobby`, `quiz/share.ts`.
   - Tests: `src/test/share-surfaces.test.tsx` runs the same contract with `navigator.share` present (title/text/canonical URL sent, nothing copied) and absent (text copied, "Copied" shown on the button and status line, no Amazon URL, no calendar) for article/hobby, planner, Tonight, shopping list and quiz result. It also guards that no file calls `navigator.share(` outside `lib/share.ts`.
2. **Dollar chips in articles.** Grepped every string in `content/articles/*.json` for `$`. The only hits are `coworkChecks` notes that record the earlier removal of those chips, and one body line in the 35-hobbies roundup ("Give yourself $15 and a challenge", advice for a thrift trip, not a chip or a claim). Nothing to replace, no content JSON was edited, no content rebuild needed. (Other `$` text such as planner budget labels is UI, not article chips, and was left alone.)
3. **Technical QA.**
   - Shop collection pages: the starter kit and "Start here" list heading is now an `h2` (same classes, so same look) with `h3` group headings, via a `headingAs` prop on `StarterKit` / `ShopMyHobby` and `subheadingAs` on `ShopSections`. Article and hobby placements keep `h3`/`h4`. Verified no skipped levels on all eight collection pages and a hobby page.
   - 404: new catch-all route `src/routes/$.tsx` gives unknown URLs the title "Page not found | Plans Past Five" and `noindex, follow`. Status stays 404. The 404 markup moved to `src/components/layout/NotFound.tsx` unchanged.
   - Long titles: pages over 65 characters (with brand suffix) went from 70 to 1 (66). New `ARTICLE_META_TITLES` in `src/lib/seo.ts` shortens the `<title>` of 22 articles only; H1, dek and slugs are unchanged. Hobby title template is now "How to Start X: What to Buy"; shop collections "Name: Shop Your Hobby"; and the shop index, hobby budget, start-here, journal index, tonight and home titles were trimmed. All still unique (existing seo tests) plus `src/test/meta-titles.test.ts`.
4. **Contact page.** Now `src/components/pages/ContactPage.tsx` with one structure in both states: "How to reach us" (address as a `mailto:` link, or the honest "inbox isn't open yet, and we won't show an address until it is"), then "Corrections" (mailto with subject "Correction" when set, or "once the inbox opens... to the address above"), then brands. No form, no address shown when unset. `src/test/contact-reach.test.tsx` mocks `@/config/site` with a fake `contactEmail` and asserts the address, mailto link and corrections link appear with no placeholder text, and that the empty state has no mailto, form or `@`. Release gate: `node scripts/check-affiliate-config.mjs --expect-contact` fails on an empty `contactEmail`; tests only warn (unchanged). Note `site.contactEmail` is currently set to `hello@planspastfive.com` in the repo, so the live path is the one that renders today; the mailbox round trip is still an owner task.
5. **Free-plan gear wording:** left as is.

## Partly

- **404 title on missing slugs** (`/hobbies/zzz`, `/journal/zzz`, `/shop/zzz`): these still show the generic site title and no robots tag in the HTML. TanStack does not run `head()` after a loader throws `notFound()`, so their existing "not found" head branches never apply. Status is 404 so search engines do not index them, but the title is not unique. Fixing it means restructuring those loaders, which is out of scope.
- **Copy of full plan text:** the planner, Tonight and saved-plan "Copy" buttons now copy the link ("Copy link"); the full plan text is still what "Send to the group chat" shares or copies. Previously there was a separate "Copy plan" / "Copy as text" button. This is the cost of one consistent label set.
- One title is 66 characters ("How to Start Junk Journaling: A Beginner's Guide | Plans Past Five"); left as within "about 65".

## Not done

- No new release script was added; the contact gate is a flag on the existing `check-affiliate-config.mjs` release check.
- No live mailbox test, no real-device test of the native share sheet (only the browser API paths are tested).
