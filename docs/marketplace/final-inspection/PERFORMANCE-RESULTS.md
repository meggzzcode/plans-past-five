# Performance results (local lab data, NOT field data)

All numbers: Lighthouse 13.6 (simulated throttling: 150 ms RTT, 1.6 Mbps, 4x CPU mobile; desktop preset) against `scripts/serve-built.mjs` builds in a scratch copy, headless Chromium 1243 (Playwright build), plus Playwright runs with applied (CDP) throttling. Host: 4 CPUs, shared with other agents (load average 0.5 to 13 during the work), Node 22.23.5, Bun 1.4.4. Medians with [min-max], n=5 unless stated. These are lab numbers; live verification on the real host is assigned to Cowork.

## 1. Baseline (original code, plain serve-built.mjs, load 5-13)
| Page | Score | LCP s | FCP s | CLS |
|---|---|---|---|---|
| Home desktop | 91 [87-98] | 1.96 [1.18-2.44] | 0.52 | 0 |
| Home mobile | 86 [73-87] | 3.99 [3.91-13.36] | 1.81 | 0 |
| Article mobile | 75 [73-84] | 6.45 [4.09-8.48] | 2.14 | 0 |
| Article desktop | 98 [94-99] | 1.00 [0.82-1.64] | 0.62 | 0 |
| /shop mobile | 98 [97-98] | 1.96 | 1.96 | 0 |
| /hobby-finder mobile | 72 [67-73] | 13.25 [10.05-14.32] | 1.84 | 0 to 0.08 |

## 2. Root causes
- Desktop home 56-64 / LCP 6.5-10.8 s was NOT reproduced: desktop scored 87-98 here (LCP 1.2-2.4 s). Best explanation: CPU contention in the shared lab (the hero element render delay swings 200-500 ms with load) plus an uncompressed server. Treat the earlier desktop figure as environment noise.
- LCP element on home (desktop and mobile) is the hero `<img>`. It is already well set up: 960w copy, srcset/sizes, preload with imagesrcset, fetchpriority=high, eager, no lazy. The huge original is only used at DPR above about 1.9. TTFB of SSR is 12-30 ms locally.
- Mobile simulated LCP is bandwidth contention on a 1.6 Mbps link: JS 221 KB (brotli), fonts about 400 KB (Fraunces 270 KB with SOFT/WONK axes, Caveat 75, DM Sans 62), hero, and lazy card images (1024-1152 px originals of 150-200 KB shown at 100-180 px). Render-blocking Google Fonts CSS costs about 840 ms of FCP (sim).
- Entry chunk `index-*.js` is 780 KB (226 KB brotli): it contains all published article text (published.json 359 KB), hobbies, catalog and products, so every page ships all article text. Fix needs a code-split of src/content (out of scope; recommended next step).
- serve-built.mjs has no compression or caching. A gzip/brotli + cache proxy cut mobile FCP 1.81 to 1.46 s and article mobile score 75 to 88; so part of the gap is the test server, not the site. Real hosts compress.
- No third-party scripts (GA4 is off without an id). Lighthouse loads all lazy images at the end (full-page screenshot); that is a lab artefact.
- Wordmark uses Fraunces SOFT/WONK axes, so those axes cannot be dropped to shrink the font.

## 3. Changes ported to the real repo (variant T)
- `src/routes/index.tsx`: hero srcset adds a 640w copy (55 KB; was 960w 118 KB as smallest); 13 home card images get 480w copies (about 35 KB each instead of 150-200 KB) via srcset/sizes. Originals stay as fallback.
- New files `public/lcp/hero-pottery-night-640.jpg` and 13 `public/lcp/*-480.jpg`; ledger rows added to `docs/content/IMAGE-LICENCE-LEDGER.md`.
- Tried and NOT ported: self-hosted fonts with inline @font-face (variant F). Applied-throttling FCP and LCP improved, but Lighthouse simulated article mobile got worse (score 88 to 77, LCP 3.8 to 6.3 s) and lab CLS showed 0.07 (the same font-swap shift of 0.047 already exists on the original under applied throttling). Preloading the fonts did not change CLS. Needs a decision; not low-risk.

## 4. Before/after (same HEAD, interleaved, gzip+cache proxy, n=5)
| Page | Before score / LCP | After (T) score / LCP |
|---|---|---|
| Home mobile | 87 [77-90] / 3.56 s [3.28-6.07] | 98 [84-99] / 2.19 s [1.68-4.39] |
| Home desktop | 98 / 1.11 s | 99 / 0.91 s |
| Article mobile (unchanged page) | 88 / 3.82 s | 88 / 3.80 s |
| Article desktop (unchanged) | 100 / 0.79 s | 100 / 0.79 s |
| /shop mobile (n=1) | 100 / 1.46 s | 100 / 1.45 s |

Applied throttling (Playwright, mobile, n=5, original vs T): home LCP 4.30 s to 1.43 s, transfer 1574 KB to 896 KB; desktop LCP 484 ms to 252 ms, 1950 KB to 972 KB. Mobile simulated LCP is bimodal (about 3.5 or 6 s between identical runs), so use the spread, not one run.

## 5. Remaining, and who owns it
- Environment: shared-CPU noise and the uncompressed test server; verify on the live host (Cowork) with compression, HTTP caching and keep-alive.
- Site, not done: split article/catalog data out of the 780 KB entry chunk; article hero is a full-size 1152 px original; /hobby-finder LCP is a lazy 1152 px image shown at 160 px (lab 10-14 s sim); font strategy (self-host with preload) needs a decision on the CLS trade-off.
