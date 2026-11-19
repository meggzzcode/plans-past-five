# Fresh-clone reproduction log

**HISTORICAL record, dated 2026-11-19, from an earlier commit.** The counts below describe that run and are out of date: current counts are in `docs/buyer/INVENTORY.md`.

Date: 2026-11-19. Purpose: show that the repository, exported without `node_modules`, `.output`, `dist`, `.wrangler` or `.git`, installs, tests, type-checks, lints and builds. Re-run it yourself before relying on it; numbers drift.

## How the export was made
- Base commit `d3b1ea5` plus the working tree of 2026-11-19 (tracked and untracked files that are not git-ignored: `git ls-files -co --exclude-standard`), copied into an empty folder. The repo was not committed at that moment, so a plain `git archive HEAD` would have left out the day's last edits. To redo it on a clean commit: `git archive HEAD | tar -x -C /tmp/fresh`.
- Tools: Bun 1.4.4, Node v22.23.5, Linux. The Bun package cache was warm, so the install time says nothing about a cold install. The network is only needed for a cold install.

## Results (each command run once in the export)
| Step | Command | Result |
|---|---|---|
| Install | `bun install --frozen-lockfile` | OK: 520 packages installed, lockfile unchanged |
| Tests | `bunx vitest run` | OK: 44 test files, 641 tests passed, about 22 s |
| Types | `bunx tsc --noEmit` | OK: no errors |
| Lint | `bunx eslint . --quiet` | 3 formatting errors, all in `src/test/_scratch/s.test.ts` (a throwaway scratch test left by another job that day). No other file reported. Delete that folder and the lint is clean |
| Build | `bun run build` (runs `node scripts/build-content.mjs` first) | OK: "Content OK: 27 published and 7 draft articles, 14 images from content/" at the time of this log (today the same command reports 32 published and 2 draft); client, server and Netlify-preset bundles built; output in `.output` |

## What this does not show
- It does not show the site is live: nothing is deployed.
- It does not show a Lighthouse or field-speed result.
- It does not show a cold install on your network, or that dependencies stay available.
- The lint failure above is real and was not hidden; it is a file that should not ship.

## Commands to repeat
```
mkdir /tmp/fresh && git archive HEAD | tar -x -C /tmp/fresh && cd /tmp/fresh
bun install --frozen-lockfile
bunx vitest run
bunx tsc --noEmit
bunx eslint . --quiet
bun run build
```
