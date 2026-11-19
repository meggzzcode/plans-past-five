# Plans Past Five

A turnkey content-and-tools website for women who want hobbies, weekend plans and friendships outside work. It combines a hobby directory, a long-form journal (articles), interactive planning tools and a product shelf that is ready for affiliate links but ships unmonetized.

It is a built starter site, not a running business. This repository makes no claims about traffic, revenue or search rankings. Read `docs/buyer/START-HERE.md` first.

## What is on the site

- **Find Your Thing**: a short hobby quiz with shareable results.
- **Make Some Plans**: a weekend and weeknight itinerary planner (time, vibe, company, budget).
- **What Should I Do Tonight?**: a quick idea picker, plus a starter-budget tool.
- **Hobbies**, **The Journal**, six themed sections, **Shop Your Hobby**, search and a saved-items list ("My Plans") that lives in the visitor's own browser.
- Trust pages: About, Contact, Editorial Standards, Methodology, Corrections, Affiliate Disclosure, Privacy, Terms.

## Stack

TanStack Start (React 19, TypeScript, file-based routing), Vite, Tailwind CSS v4, Bun as the package manager. Tests run on Vitest and Testing Library. No database, accounts, payments or server secrets; the site is frontend-only.

## Quick start

```sh
bun install            # install dependencies
bun run dev            # local dev server
bunx vitest run        # tests
bunx tsc --noEmit      # typecheck
bunx eslint .          # lint
bun run build          # production build (runs the content build first)
```

## Content workflow

Articles and images are plain JSON files, so they can be edited without touching code.

1. Edit or add files in `content/articles/*.json` and `content/images/`. You can do this by hand or through Pages CMS using `.pages.yml` (setup: `docs/buyer/CMS-SETUP.md`).
2. Run `node scripts/build-content.mjs` (also `bun run content:build`). It validates the content, lists any problem in plain English, and writes the compiled files to `src/content/generated/`. The build and CI run it automatically.
3. Commit both the JSON and the generated files.

Products come from a spreadsheet: edit `docs/commerce/product-research.csv`, then run `bun run import:products docs/commerce/product-research.csv` to regenerate `src/data/catalog.generated.ts`. See `docs/buyer/PRODUCT-MANAGEMENT.md`. Brand copy lives in `src/config/site.ts`; retailer links are built only in `src/config/affiliate.ts`.

## Folder map

| Path                 | What is there                                                       |
| -------------------- | ------------------------------------------------------------------- |
| `content/`           | Article and image source files (JSON), edited by hand or Pages CMS  |
| `src/routes/`        | One file per page (TanStack file routes)                            |
| `src/components/`    | UI: layout, cards, quiz, planner, commerce, editorial               |
| `src/lib/`           | Logic for the quiz, planner, tonight tool, search, saved items, SEO |
| `src/data/`          | Hobbies, activities, categories, product catalog                    |
| `src/content/`       | Content loader plus `generated/` output (do not edit by hand)       |
| `src/config/`        | Site name and copy, affiliate link builder, trust links             |
| `src/test/`          | Automated tests                                                     |
| `scripts/`           | Content build, product import, image ingest, site health checks     |
| `docs/`              | Buyer docs, content system, commerce research, marketing plans      |
| `public/`, `design/` | Static files, brand and Pinterest pin assets                        |

## Docs

Start with `docs/buyer/START-HERE.md`, which lists the rest in reading order (business overview, architecture, hosting, affiliate setup, content and product management, maintenance, a 90-day plan). Developer notes are in `CLAUDE-HANDOFF.md` and project rules in `AGENTS.md`.

## Deploy

`netlify.toml` holds the Netlify build (it sets the Netlify Nitro preset and publishes `dist`). To protect the free plan's deploy allowance, a build runs only when the latest commit message contains the marker `[deploy]`; every other push is skipped. Deploy on purpose:

```sh
git commit --allow-empty -m "Release: what changed [deploy]"
git push
```

Details: `docs/buyer/HOSTING-AND-DEPLOYMENT.md`. CI (`.github/workflows`) runs the content build, tests, typecheck and build on every pull request.

## What is not included

- No live domain, hosting account, analytics, email list or affiliate accounts. You set these up under your own logins (`docs/buyer/ACCOUNT-DEPENDENCIES.md`).
- Affiliate links are not activated; the disclosure says links currently earn nothing.
- No traffic, revenue or ranking history.
- A working contact channel is yours to add (`docs/buyer/DOMAIN-AND-EMAIL.md`).
- Photo rights are recorded per image; check `docs/IMAGE-LICENSES.md` before publishing.
