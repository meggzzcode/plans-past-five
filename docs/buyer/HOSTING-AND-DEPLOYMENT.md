# Hosting and deployment

**Hosting has not been chosen.** The repo does not show a production host, a deployed URL or a hosting account, and none is claimed here. This page lists what the repo needs and the generic options. Costs and free-tier limits are not stated because they were not verified (PENDING COWORK).

## What the repo needs (checked 2026-11-19)

- Build: `bun install --frozen-lockfile`, then `bun run build` (`vite build`). CI runs the same steps (`.github/workflows/ci.yml`).
- Output: the build writes `.output/`. Observed in `.output/nitro.json` and `.output/server/wrangler.json`: Nitro preset `cloudflare-module`, server entry `server/index.mjs`, static files in `public`, compatibility flag `nodejs_compat`, and a static-assets binding. This was also seen by another worker (`docs/buyer/SEO-GUIDE.md`). So the site is **server-rendered**: there is no pre-rendered `index.html` in `.output/public`. A host must run the Worker (or an equivalent server entry), or you must change the Nitro preset.
- Runtime needs: HTTP request handling by the server entry (`src/server.ts` wraps the SSR entry and renders an error page on failures). No database, no environment variables, no secrets. The repo uses `VITE_*` injection from its config but none is required for the site to work (verify with a clean build in your environment).
- Static assets: `public/` (robots.txt, `_headers`, pins, favicons).
- Headers: `public/_headers` sets `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` for hosts that read it; server-rendered HTML needs the same headers set in server code or host config (`docs/buyer/SECURITY-AND-BACKUPS.md`).
- HTTPS and a domain: required before `site.url`, canonicals and the sitemap are correct (`docs/buyer/SEO-GUIDE.md`).

## Local verification before any deploy

```
bun run build
node scripts/serve-built.mjs 3000
curl http://localhost:3000/
bun run health:links
```

## Options (generic; verify current terms yourself)

| Option | Fit | Notes to verify |
|---|---|---|
| Cloudflare Workers with static assets | Matches the current build preset (`npx wrangler --cwd ./ deploy` is printed in `.output/nitro.json`) | Needs your own Cloudflare account and a project name. The generated config name in `.output/server/wrangler.json` comes from the seller's Lovable project; set your own name. Free tier and limits: PENDING COWORK |
| Lovable hosting/publish | Repo is already connected to Lovable and syncs commits | Depends on the seller's Lovable account and workspace; not transferable by default. Check Lovable's current project-transfer and publishing terms (PENDING COWORK) |
| Other Node or edge hosts that run a Nitro server | Would need switching the Nitro preset (for example to a Node server) in config | Requires a code change and re-testing; keep `vite.config.ts` notes in mind (do not add duplicate plugins) |
| Static export | Not currently supported | The site relies on SSR output; a static export would be a separate engineering task |

Do not pick a host because of this table; compare current pricing and terms from each provider yourself.

## Deploy checklist

1. Choose host; create your own account with two-factor authentication.
2. Connect the repository (your own GitHub copy; see `docs/buyer/TRANSFER-CHECKLIST.md`).
3. Build command `bun run build`; confirm the output the host expects.
4. Attach the domain and confirm HTTPS (`docs/buyer/DOMAIN-AND-EMAIL.md`).
5. Set `site.url` in `src/config/site.ts` to the final origin; update the `Sitemap:` line in `public/robots.txt`.
6. Verify headers with `curl -I https://yourdomain/` and `curl -I https://yourdomain/favicon.svg`.
7. Load `/`, an article, `/shop`, `/sitemap.xml`; run the site-health workflow once.
8. Add HSTS only after HTTPS is confirmed for the final domain.
9. Record the host, account owner and renewal terms in your own password manager (not the repo).

## Rollback and backups

Git is the backup (`docs/buyer/SECURITY-AND-BACKUPS.md`). Redeploy a previous commit if a release breaks; do not rewrite published history if the repo remains connected to Lovable.

## PENDING COWORK

1. Which host options currently support Nitro `cloudflare-module` output without code changes, and with what free-plan limits? (Official docs, dated.)
2. Can a Lovable project be transferred or exported to a buyer's account, and how? (Official Lovable docs.)

## Netlify deploy budget (added 2026-11-19)

Netlify's free plan has a monthly credit allowance (about 20 production deploys). `netlify.toml` therefore skips every build unless the latest commit message contains the deploy marker (square brackets around the word deploy). To publish: make a commit whose message ends with that marker and push it to the production branch, for example `git commit --allow-empty -m "Release: new articles [deploy]"`. Batch several edits into one release. Content saved through a CMS commits without the marker, so it will NOT go live until a release commit is pushed or you trigger a deploy by hand in Netlify (Deploys, Trigger deploy). Check Netlify's usage page monthly. Whether a skipped build costs credits has not been confirmed (Cowork to check).
