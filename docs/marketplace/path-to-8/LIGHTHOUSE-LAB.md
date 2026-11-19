# Lighthouse lab run (lab data, not field data)

Run 2026-11-19 on the production build (`bun run build`, served by `node scripts/serve-built.mjs 3000`), Lighthouse 12.2.1 against Chromium 1243 headless, simulated throttling (Lighthouse default mobile profile; "desktop" uses its desktop profile). One sandbox machine, three runs each. These are lab numbers from a simulated connection. They are NOT field data and say nothing certain about real visitors. Google Fonts load from the live internet in this run.

| Page | Performance score (3 runs) | LCP s | FCP s | CLS | TBT ms |
|---|---|---|---|---|---|
| Home, mobile emulation | 86, 86, 86 | 3.9, 3.9, 3.9 | 2.1 | 0 to 0.003 | 0 |
| Home, desktop | 64, 64, 56 | 6.5, 6.5, 10.8 (outlier) | 2.1 to 4.5 | 0.003 | 0 |
| Article (solo-date-ideas), mobile | 84 to 85 | 3.6 | 2.9 | 0.063 to 0.064 | 0 |

What changed for the home page: only the hero image is eager and high priority; it has explicit width and height inside a fixed 4:3 frame; a 960px copy (`public/lcp/hero-pottery-night-960.jpg`, 118 KB, was 244 KB at 1440px) is offered through `srcset` and a `preload` hint with `imagesrcset`; every other image stays lazy.

Not fixed / open:
- Desktop home LCP (6.5 s lab) is still slow; I did not find the cause in this pass. Likely suspects: render-blocking Google Fonts stylesheet and the 1440px fallback. Not verified.
- Article CLS about 0.064 (under the 0.1 "good" line) probably comes from long sections folding on phones after hydration. Not measured before the change, so no before/after claim.
- No before-change baseline was captured, so no improvement figure is claimed.
