# Wave B tooling (2026-11-19)

## Fixed

- **Importer safety tests** (`src/test/catalog-import.test.ts`, run against temp copies via `--out`, plus a hash check that the real `src/data/catalog.generated.ts` is never touched): no file, `--help`, empty and header-only input, invalid input (garbage, semicolons, .xlsx), duplicate ASIN and id, missing required fields, bad status, malformed URL, invalid role, unverified product marked verified (no date or sources), incomplete (truncated) import writes nothing, `--check` writes nothing, valid import (atomic write, no temp file left).
- **Shrink guard**: a write leaving more than 30% fewer products than the current catalog is refused unless `--force`. Documented in the script header, `--help`, `PRODUCT-RESEARCH-TEMPLATE.md` and `docs/buyer/PRODUCT-CATALOG.md`. New `--out <path>` option (used by tests). The write is now temp file then rename.
- **One canonical product source**: `docs/commerce/product-research.csv`. `IMPORT-DRY-RUN.md` replaced by an OBSOLETE stub; `STARTER-KITS.md` stale status table removed; conflicting import steps in `PRODUCT-RESEARCH.md`, `AMAZON-PRODUCT-CATALOG.md`, `SHOPPABLE-ARTICLE-SYSTEM.md` and `docs/buyer/PRODUCT-MANAGEMENT.md` now point to the canonical file and the exact command.
- **Template** matches the importer: header is `COLUMNS`, one commented example row (test checks it parses), column guide in `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.md`. The importer gained one optional internal column, `notes` (read, never stored).
- **Cowork queue** `docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv`: 29 publicly shown products (status verified, live check pending) plus 17 kit candidates (status candidate, ASIN and URL blank, `notes` says what to verify). The 29 shown rows pass the importer. The 17 candidate rows fail `--check` ONLY on blank `asin`, `lastVerified` and (for 8 of them) `researchSources`; that is intentional until Cowork finds the listing. A test enforces that no other error appears. Candidate `role` "alternative" became `researched-pick`, non-slug hobbies and kit slots were moved into `notes`.
- **Publish gate** (`scripts/content-lib.mjs`): a published article must have at least one source, a `verifiedAt` date and no unresolved `coworkChecks` (a check is resolved when it starts with RESOLVED, VERIFIED, SUPPORTED, REMOVED, CORRECT AS, NOTE, DONE or CLOSED and has a date). Drafts exempt. Tests added. `docs/buyer/CMS-SETUP.md` one line updated. All 32 published articles validate.
- **Dev server**: `package.json` `dev` is `vite dev --host 127.0.0.1`; verified `bun run dev` starts and serves 200 in a /tmp copy.
- **Analytics**: `site.analytics.ga4MeasurementId` (empty). `src/lib/analytics.ts` renders the async gtag snippet in the root head only for a valid `G-XXXXXXXXXX` ID; invalid is rejected; empty loads nothing. `integrations.googleAnalyticsId` now follows it, so `track()` is configured in the same place. Privacy page sentence changes only when an ID is set. Tests in `src/test/analytics.test.ts`; line added to `docs/buyer/ANALYTICS-SETUP.md`. Checked in a /tmp copy with an ID set.

## Partly done

- Two published articles have no sources: `low-energy-hobbies` and `how-to-start-a-reading-journal`. Article files were off limits, so the gate carries a named exemption (`SOURCELESS_ALLOWED` in `content-lib.mjs`, locked to those two by a test). Add a source to each, then delete the exemption.
- A comma typed unquoted into a row is now reported with the "more cells than header" message only when the shifted last cell is non-empty (the new trailing optional `notes` column absorbs the shift). The row still fails other checks.
- `docs/commerce/AMAZON-PRODUCT-CATALOG.md` register counts were not recounted.

## Not done

- No live (browser) verification of any product: that is the Cowork queue.
- Other docs that mention `IMPORT-DRY-RUN.md` as a reference (cowork tasks, content docs) were not edited; they land on the obsolete stub.
- Production build was not run (by instruction).
