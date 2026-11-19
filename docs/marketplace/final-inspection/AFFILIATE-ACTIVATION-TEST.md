# Affiliate activation test (2026-11-19)

Requirement: a buyer who activates a legitimate affiliate configuration must not see failing automated tests. The repo ships with the Amazon entry inactive; that default is unchanged.

## Method

1. Copy of the working tree in `/tmp/pp5-active` (tar, excluding node_modules, .output, .git, dist). The real repo was never built in and the importer was not run.
2. In the copy, the single `amazon` entry in `src/config/affiliate.ts` was set to approved, active, tracking id `testsite-20` (fake, well-formed), `lastVerified` set, approved methods "website content".
3. Ran full `bunx vitest run`, `tsc --noEmit`, `eslint . --quiet`, and `bun run build`.

## Before (old tests, active config): 8 failures in 5 files (709 of 717 passed)

| Test | Reason |
|---|---|
| affiliate.test.ts: ships unmonetized with no tag and no sponsored links | assumed tag "" and `isMonetized()` false |
| affiliate.test.ts: every shipped product link is a plain search link | links carried `tag=` |
| affiliate.test.ts: leaves exactUrl untouched when not live... | first assertion assumed inactive |
| affiliate.test.ts: shipped registry has no tracking ids or templates | read the shipped entry directly |
| export-links.test.tsx: "disabled" printed list markup... | "disabled" mode did nothing, so it ran live |
| round3-fixes.test.tsx: says we do not earn today... | assumed inactive disclosure first |
| rules.test.ts: Amazon links carry no affiliate tag by default | `amazonSearchUrl` tagged |
| shop.test.tsx: links are ordinary and not sponsored today | asserted plain href and "don't currently earn" |

tsc, eslint (src) and the build passed with the active config. No product code or config bug was found; `src/config/affiliate.ts` was not changed in the real repo.

## Fixes (real repo, tests and helpers only)

- `src/test/affiliate-state.ts` (helper): `setAffiliateState("inactive"|"active", tag?)`, `snapshotAffiliate`/`restoreAffiliate`, `withAffiliateState`, `withAffiliateRestore`, `configuredTag`. Fake id `testsite-20`.
- Every affiliate-sensitive test now sets the state it needs explicitly and restores it afterwards. "Shipped default" assertions became "inactive state" assertions; an "active state" counterpart was added (valid registry, every product link carries exactly one tag, Associates sentence present, "don't currently earn" absent). Disclosure assertions are derived from the state (`commissionStatement`, `AMAZON_ASSOCIATE_STATEMENT`).
- `export-links.test.tsx`: "disabled" now really disables; the banned-text pattern also includes the buyer's configured tag, so a real id can never leak into exports.
- `src/test/setup.ts`: optional `AFFILIATE_TEST_STATE=active|inactive` forces the state (fake id, in memory) before every test file.
- Guard: `scripts/check-affiliate-config.mjs` (full suite in both states; `--quick` for the sensitive files; `--expect-inactive` for the seller's release branch only) and `src/test/affiliate-config-independence.test.ts` (static check that registry-touching tests use the helper, no "shipped default" wording as a precondition, and a quick both-states run).
- `src/test/affiliate-activation-safety.test.ts`: with an active entry, unknown/malformed/unverified/held products and exports.
- Buyer steps: `docs/buyer/AFFILIATE-ACTIVATION.md` rewritten (replace id, the one entry, disclosure wording, tests, deploy, fake-ID note).

## After

| Check | Shipped (inactive) | Activated copy (fake id) |
|---|---|---|
| `vitest run` | 50 files, 735 passed | 50 files, all affiliate tests pass (one analytics failure came from a stale /tmp copy of `src/lib/analytics.ts` that another task changed after the copy; it passes in the real repo) |
| `node scripts/check-affiliate-config.mjs` (full suite forced inactive then active) | PASS / PASS (734 passed, 1 skipped child-recursion test, each state) | n/a |
| `tsc --noEmit` | pass | pass |
| `eslint . --quiet` | `src` clean; 2 prettier errors in `scripts/inventory.mjs` and `scripts/third-party-notices.mjs`, owned by other tasks, not affiliate-related | clean for src |
| `bun run build` | not run in the real repo (by rule) | pass |

## Misleading-URL checks (active entry), all in `affiliate-activation-safety.test.ts`

- Malformed or placeholder ASIN (`B0123`, lowercase, 11 chars, `EXAMPLE000`, all zeros, empty) never passes `filterVerified`, so no link is built.
- `amazonUrl` not matching its ASIN, or already carrying `?tag=`, is rejected, not re-tagged.
- Candidate, held (`hold`) and unavailable products are filtered out.
- Non-Amazon hosts are never tagged; an unparsable URL falls back to the search page only.
- Every shipped verified product resolves to `/dp/<its ASIN>` with exactly one tag.
- Existing export tests (`export-links.test.tsx`, "enabled" mode): list text, bundle JSON/code, share text, print area and clipboard contain no `tag=`, `ref`, statement or the id. All pass active.

## Other-site independence

`grep -ril paws` finds only prose in docs (TURNKEY-PLAN, IMAGE-AND-ASSET-RIGHTS, launch/DOMAIN-EMAIL-SETUP, cowork logs); the TURNKEY-PLAN and rights docs state no Paws & Passage ids or branding are used. No code, config, test or data file imports from or references that repo; the only Associates-style ids in the repo are fake test strings (`demo-20`, `testsite-20`, `first-20`, `second-20`, `me-20`). The registry ships with an empty tracking id. Note: `docs/launch/DOMAIN-EMAIL-SETUP.md` mentions Paws & Passage mailbox practice (docs only, not shared IDs); the buyer should not see that as a dependency.
