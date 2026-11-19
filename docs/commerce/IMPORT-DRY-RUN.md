# OBSOLETE: product import dry run

Superseded 2026-11-19. Canonical product source: `docs/commerce/product-research.csv`. Validate with `bun run import:products docs/commerce/product-research.csv --check`; import with `bun run import:products docs/commerce/product-research.csv`. Column guide: `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.md`. The fixture-based dry run this page described is no longer how the catalog is imported; importer safety is covered by `src/test/catalog-import.test.ts`.
