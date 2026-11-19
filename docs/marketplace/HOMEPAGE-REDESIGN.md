# Homepage and navigation redesign

Based on docs/marketplace/reviews (Review 1 especially). Screenshots: /tmp/claude-0/home-redesign/ (before-_, after-_).

## Heights (full-page, px)

| Page                           | 320 before | 320 after | 390 before | 390 after | 1280 before | 1280 after |
| ------------------------------ | ---------- | --------- | ---------- | --------- | ----------- | ---------- |
| Home                           | 14126      | 4729      | 13520      | 4507      | 9337        | 4062       |
| After Hours (section template) | 9645       | 7284      | 10505      | 7871      | 5379        | 3671       |

Home went from about 16 phone screens to about 5.3 (390 wide). Section pages are still tall on phones because the
article and hobby cards (Cards.tsx, owned by the UI worker) are large; the page now shows 3 articles and 6 hobbies.

## What changed

- Home: hero (one photo, one line) -> three image "start here" tiles (quiz, plan weekend, what tonight) -> six sections as an
  image grid (name + short line) -> 2-3 journal image cards -> one shop strip (4 collections, full names, matching image,
  disclosure line) -> one closing block. Quiz promoted once. No paragraph over two lines.
- Quiz count: `src/data/quiz-meta.ts` exports `QUIZ_QUESTION_COUNT` (7) and `quizCountWord()`. Home and Start Here read it.
  A test checks it equals the number of questions in hobby-finder.tsx. hobby-finder can import it later (it still says
  "Seven questions" in its own copy).
- Navigation (`src/components/layout/nav.ts`): mobile menu lists Start Here, quiz, plan builder, My Plans, all six sections
  (2-column, small icons), Hobbies, Journal, Shop. Desktop: top bar (Start Here, Make Some Plans, Hobbies, Journal, Shop)
  plus a second row with the six sections. Names come from categories.ts everywhere ("The Weekend Edit", "Table for One").
  Active state via `data-status`, Escape and route change close the menu, controls are min 44px, menu scrolls on short screens.
- Footer: Start Here moved into Explore, link columns two-up on phones, signature line no longer repeated.
- Polish: kickers 0.72 -> 0.8rem, weight 700; global brand-tint background on every `img` and fixed-ratio frames on
  all homepage images; header logo kept on one line at 320 (nowrap, slightly smaller).
- Section pages: image header with name, tagline and a one-sentence intro (intros shortened in categories.ts), then
  article cards, hobby cards (6), supplies. No wall of text.

## What was not done

- No new images. Only 14 photos exist, so some repeat (journal cards reuse After Hours / Better Together photos;
  tiles use shop flat-lays). Hero uses one photo only. Owner is sourcing more.
- Cards.tsx (hobby/article/collection cards on section pages), hobby-finder copy and the other tools are untouched.
- Section meta descriptions are now the short intros (about 70-90 chars): consider longer SEO descriptions.
- Share buttons, email capture and social links (Review 1 items 4, 5) were out of scope.
- Pre-existing lint/type errors remain in src/test/contrast.test.ts and src/data/hobbies.ts (other workers).
