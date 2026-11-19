# SOP: checking affiliate links

Links are built only in `src/config/affiliate.ts`. Monthly or after any change:
1. With `associatesTag` set, open five product buttons. The URL should carry the tag and the link should have `rel="sponsored"`.
2. The button must match its destination: "Search on Amazon" for search URLs, "View on Amazon" only when `exactUrl` is a verified listing.
3. Do not add prices, ratings, brands or ASINs unless verified at the source.
4. Confirm `/affiliate-disclosure` and the Privacy page's affiliate-cookie paragraph still match what is active.
