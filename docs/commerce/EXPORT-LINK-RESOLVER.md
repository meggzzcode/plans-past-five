# Export link resolver

## What changed
- New `src/lib/export-links.ts`: `exportLinkFor(product)` returns the ordinary https://www.amazon.com/dp/<ASIN> (no params); `exportPageUrl(hobby?)` returns our canonical hobby or shop page. The module does not import the affiliate registry.
- Decision: shopping-list copy, print, and the /saved share text now contain product names and brands plus one link back to our page, and no Amazon URL at all (safest against the offline-use rule). `exportLinkFor` is available for any caller needing a plain URL.
- `buildListText` (src/lib/shoplist.ts) lost its resolver and Associate-statement logic; it takes an optional `pageUrl`. The print area in `ShopMyHobby.tsx` shows names plus the page link, no statement.
- Saved-list JSON and PPF1 code were already clean (ids and same-site paths only); now covered by tests. `saved-share.ts` already used canonical site links.
- On-site "See it on Amazon" buttons (ProductCard, saved page) still use `resolveProductLink`.

## Tests
`src/test/export-links.test.tsx`, run with the registry disabled and enabled (restored after each test): on-site link tagged only when enabled; copy text, printed markup, JSON, PPF1 code and share text never match tag=, ref=, linkCode, Associate; statement only beside on-site links; internal-phrase scan of every shipped product card. `src/test/shop.test.tsx` expectations updated.

## Not done
Splitting `limitations` and `researchSources` out of the client catalog module was not done: they are read by validators and the generated catalog, and the split risks product cards. They are not rendered (tested), only bundled.
