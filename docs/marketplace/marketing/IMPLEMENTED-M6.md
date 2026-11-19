# M6 implemented (tools, trust, SEO)

## Done
- seo(): default og:image/twitter:image (bundled potteryNight asset) for every indexable page without its own; noindex pages skip it. Verified in the built SSR output: `https://planspastfive.com/assets/hero-pottery-night-<hash>.jpg` (not /src/assets), file exists in .output/public/assets. Quiz, planner, Tonight and Budget also set their own images. New test in seo-trust.test.ts.
- Meta titles and descriptions rewritten and unique: quiz (capitalisation bug fixed; keeps "up to six" because the quiz is adaptive), planner, Tonight, Budget, Search, Contact, Privacy, Terms, Affiliate disclosure, Editorial Standards, Methodology.
- Quiz result: full persona line, "Tonight, try:" (no line clamp), per-card "What you'll need" (to /hobbies/slug#kit), starter list always open (no details) with heading "Your starter list for X", primary "Get my starter list" when verified products exist (else planner stays primary), "Send this to the group chat", clearer weak-match heading and footnote.
- Planner: new subhead, "Plan my evening" / "Plan my weekend" button, result scrolls into view (guarded), sentence-case result title, "Grab what you need for X" shop blocks, always-visible Shop Your Hobby hand-off, shorter disclaimer.
- Tonight: "What you'll need", "Make it a whole plan", shorter intro. Budget: "See options" instead of collection names (name kept for screen readers), primary "See the starter kit for X", plus Shop Your Hobby and plan links. Saved: shopping list first, "What should I do tonight?" in the empty state.
- Trust: Editorial Standards dek, "Why you can trust the picks" box, commercial-independence rewrite (still states no commission today); Methodology "The short version" box; Contact/Corrections wording (no email shown, honest "inbox isn't open yet", links to quiz/plans); contact now says "editorial standards".
- Pins: quiz, planner, Tonight descriptions rewritten and "(Some links may be affiliate links.)" removed from the starter-kit pin, in design/pins/pins.mjs and docs/pinterest-pins.csv (UTM and boards untouched).

## Checks
prettier, tsc clean. eslint: only errors in files not mine (commerce/ProductTile.tsx, catalog.generated.ts). vitest: failures only in shop.test.tsx (commerce, in flux by another agent) and build-content byte-stability (article JSON); all seo, quiz, planner, tonight, tool-scenario tests pass. Playwright at 390 and 1280: no horizontal overflow, no page errors.

## Skipped (owner decision or assets)
- Real contact/corrections mailbox (site.contactEmail), named publisher/entity.
- Photos on result cards and Tonight cards, per-hobby photography, persona OG images and dynamic persona head().
- WebApplication/ItemList JSON-LD, search thumbnails, sticky mobile CTA, planner form regrouping, energy/budget label alignment across tools (touches logic/labels in lib).
- Pin alt_text rewrites (need image-literal descriptions), title rebalancing toward tools, hold-until-published confirmation.
- Affiliate "live" wording and SOP checklist (live copy already driven by constants).
