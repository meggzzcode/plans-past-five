# Release handover: Plans Past Five

Status: **CODE COMPLETE: READY FOR COWORK** (the business is NOT yet complete: see FINAL-VERDICT.md and the sale blockers).

## Release identification
- Repository: https://github.com/meggzzcode/plans-past-five
- Release branch: `claude/vibrant-dirac-amdf7r`; `main` is updated to this release commit only after the final gates (see "Merge status").
- **Tested release candidate: `a8ee2f7`** (gates below were run on exactly this commit; later commits on the branch are documentation-only or the narrow fixes listed under "After a8ee2f7").
- Node 22 and Bun 1.4.x were used for the tested build (versions are not pinned in the repo; see BUYER-TAKEOVER.md).

## Gates run on `a8ee2f7` (actual results, 2026-11-19)
| Gate | Result |
|---|---|
| `bunx eslint .` | 0 errors, 17 warnings (existing UI-library warnings) |
| `bunx tsc --noEmit` | clean |
| `bunx vitest run` | 51 files, 737 tests passed, 0 failed |
| `bun run build` (default preset) | success |
| `NITRO_PRESET=netlify bun run build` | success |
| `bun audit` | 0 vulnerabilities (20 before the tested security patch) |
| Affiliate guard `node scripts/check-affiliate-config.mjs` | PASS inactive, PASS active (fake test ID) |
| Link check (earlier build) | 98 sitemap pages, 112 internal links, no internal failures; external 403s are bot blocking; one dead source removed |
| Secret scan (tree and 116-commit history) | nothing found (gitleaks and trufflehog were not installable) |
| Buyer takeover from a clean export | 13 of 14 steps passed; analytics partly (now configurable) |
| Browser QA | 98 pages at 320, 390 and 1280, keyboard-only checks, corrupted storage, invalid imports (see TECHNICAL-QA.md) |
| Performance | local lab data only; see PERFORMANCE-RESULTS.md (live host to be verified by Cowork) |

Simulated reviewer results are in CUSTOMER-REVIEW-SUMMARY.md and BUYER-REVIEW-SUMMARY.md (AI sentiment, not customer data).

## Deployment procedure (not yet performed on the domain)
1. Production branch in Netlify = `main`; previews off; site private until the owner approves public.
2. A build runs only when the latest commit message carries the release marker (see `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`). Budget about 8 deploys a month (15 credits each, 300 a month free).
3. One release deploy, with the owner's go. Then verify headers, sitemap, HTTPS and the key journeys (Cowork workstream H).
4. CMS: edits are "Saved"; publishing is a separate step (Netlify Deploys, Trigger deploy, or a `RELEASES.md` marker commit). Not yet tested with a real login (workstream G).

## Rollback
Netlify: Deploys, choose an earlier successful deploy, Publish deploy. Code: `git revert` the release commit on `main` and push a marker commit. Content-only backup: `git bundle` of the repo (tested: restored and rebuilt in 7 seconds in the takeover test).

## What is NOT done and who owns it
See `docs/cowork/COWORK-FINAL-PACK.md` (all external verification), `docs/cowork/OWNER-ACTIONS.md` (purchases, logins, approvals, price, support terms, listing), and FINAL-VERDICT.md (exact sale blockers).

## Merge status
Recorded at the bottom of this file after the merge (see "Merge record").

## After a8ee2f7
Narrow follow-up fixes (share consistency, dollar chips, heading levels, 404 title, long meta titles, contact page test) and the re-run of the blind reviews on the new build are recorded in `FINAL-FIXES.md` and the updated review summaries. The final tested commit is named in the Merge record.
