# Quiz redesign (Find Your Thing)

## Before and after

Before: seven fixed questions, text buttons, state in memory plus sessionStorage, a persona chosen mostly by the top hobby category, a confident persona card shown above a "nothing fits" box, an SVG "Save card", a long text results page.

After: up to six one-tap picture/icon questions, adaptive; the whole state is in the URL; a short, image-led result page.

Flow (`src/lib/quiz-flow.ts`): craving, energy, company, where, time, budget.
- Friendship craving implies "with friends": company is skipped.
- A later option is only offered if at least 3 hobbies still fit the earlier answers (so no option contradicts an earlier one; low energy drops high-energy hobbies, "at home" drops outdoor-only ones, "free" drops paid ones). If only one option survives it is chosen for the reader and the question is skipped.
- The old "learning curve" question and the confusing "Indoors, home or out" option are gone (seven became six; the max is `QUIZ_QUESTION_COUNT = 6`, the longest path).
- Changing an earlier answer re-asks the later ones. Progress dots show the questions this reader will see.

URL: `/hobby-finder?q=4&a=re.me.sc`. `q` is the 1-based question (7 = results); `a` is positional two-letter choice codes (no personal data). Refresh, browser Back/Forward and shared links all work; a URL asking for a skipped or unreachable step is corrected in place. Results open straight from `?q=7&a=...` (or `a=` alone).

Persona (`personaFor`): uses craving, company, energy and where. Relaxation with friends gives Social Butterfly (Cozy when energy is low); movement gives Sporty (Little Adventurer when outdoors and not high energy); relaxation solo and low energy gives Slow Living; etc. All eight are reachable through the real flow (tested).

Results page (`src/components/quiz/ResultsView.tsx`): persona image and one-line description, your answers as tappable chips, three image cards (existing images, or a tinted tile for image-less hobbies) each with time, cost label, energy chips and one first-step line. Primary: "Plan my weekend with this" (same planner hand-off). Secondary: "Share my result" (Web Share with the PNG when the browser allows files, else copies the link); "Save as image" (PNG drawn on a canvas, client-side) and "Copy link". Starter pieces sit in a collapsed "Shop the starter pieces" (ShopMyHobby, renders nothing without verified products).

Weak matches: with fewer than three exact fits the page opens with "Only N fit every answer" / "Nothing fits every answer", no persona headline and no share, then the exact fits ("Fits everything") plus the nearest matches ("Nearly", with the one thing each breaks) and a button to change the one answer to loosen. The viability rule makes this state unreachable through the UI today; it is the safety net if hobby data changes.

## Reviewer findings addressed
(a) persona ignoring craving+company: fixed. (b) contradictory confident card above "nothing fits": fixed (weak state described above, and the old "Hobbies that suit you" chips are removed). (c) refresh/Back reset: fixed via URL. (d) six vs seven: constant is now 6 = maximum, quiz copy says "Up to six". (e) SVG card: PNG plus Share/Copy link. (f) shareable URL: done. Also: "Indoors, home or out" and "Something different" wording replaced; Museum "low energy" for "Let's go" no longer appears because low-energy hobbies are not special-cased and results are energy-checked by the existing rule.

## Not done / notes
- `src/routes/index.tsx` and `start-here.tsx` still print `${quizCountWord()} quick questions` ("Six quick questions"). Truthful only as a maximum; `quizUpToWord()` ("up to six") is exported for them to use.
- `FallbackTile` in Cards.tsx is not exported, so the result cards use a matching tile of their own (`data-fallback-tile`); swap if it is exported later.
- `src/lib/quiz-steps.ts` is now only used for `parseQuizStep`; its sessionStorage helpers are unused by the quiz (still unit tested).
- The old `personaCardSvg` stays in finder.ts (tested) but is no longer shown.
- Homepage test for the count now compares against `QUIZ_ORDER.length` instead of grepping hobby-finder.
- No test of the canvas/share code (needs a browser); checked by hand only in flow (screenshots in /tmp/claude-0/quiz-redesign/).
- The "no free option for this combination" case hides "Nothing" at the budget question (e.g. creativity with friends), by design.
