# Troubleshooting

| Symptom | Check |
|---|---|
| CI fails at `bun install --frozen-lockfile` | `bun.lock` is out of date. Run `bun install` locally and commit `bun.lock`. |
| Tests fail on "duplicate title/description/canonical" | Two routes share metadata in `src/test/seo-trust.test.ts` terms. Give each page its own text in its `head()`. |
| Test says a sitemap path has no route file | A path in `src/lib/sitemap.ts` has no file in `src/routes`. Add the route or remove the path. |
| Draft shows up publicly | Drafts must have `status: "draft"`; only `articles` from `src/content/index.ts` is public. Never import `allArticlesIncludingDrafts` in public code. |
| Page not in Google | Confirm it is in `/sitemap.xml`, not `noindex` (hobby profiles without a guide are), and that `site.url` is the live domain. |
| Site health issue lists broken links | Open the page named in the issue; fix the href. Retailer links that block bots are advisory only. |
| Contact page has no email | Intended. Set `site.contactEmail` in `src/config/site.ts`; it appears automatically. |
| Security headers missing on pages | `public/_headers` covers static files only; see `docs/buyer/SECURITY-AND-BACKUPS.md`. |
| Local health check cannot connect | Run `bun run build`, then `node scripts/serve-built.mjs 3000`, then `bun run health:links`. |
| Build fails after editing routes | `src/routeTree.gen.ts` is generated; do not edit it by hand. Restart `bun run dev` to regenerate. |
