# Editing images and articles without writing code

Status 2026-11-19: **there is no CMS yet.** Articles are TypeScript files and images are registered in `src/data/images.ts`. A buyer who does not code has three routes today. The fourth route, a browser editor, is a recommended build that has NOT been done.

## What works today (no CMS needed)

| Task | Easiest route today | Needs a developer? |
|---|---|---|
| Change a headline, fix a typo, edit an article | Ask Lovable in chat (the repo is Lovable-connected) or ask an AI coding assistant on the GitHub repo: "In article-x.ts change the intro to ...". Run the three checks in `CONTENT-MANAGEMENT.md` | No, but the buyer needs a Lovable or AI-assistant account |
| Add or replace images | Drop the file in `docs/content/incoming-images/`, add a row to `docs/content/new-images.csv`, run `node scripts/ingest-images.mjs --check`, then without `--check`. It resizes, registers and records the licence | Command line, one command |
| Publish a drafted article | Follow steps 1 to 5 in `CONTENT-MANAGEMENT.md` | Light code edit |
| Write a brand-new article | Copy an existing `article-*.ts` or ask an AI assistant using `docs/content/BRAND-VOICE.md` and `ARTICLE-QUALITY-CHECKLIST.md` | Light code edit |

Costs: Lovable plans are paid; nothing here requires one to RUN the site, only to edit through its chat.

## Recommended fix: a free Git-based editor (not built)

Paws & Passage already uses Pages CMS (free, edits files in the GitHub repo through a login, no server of ours). The same approach would suit Plans Past Five, but only if content moves out of TypeScript into data files a CMS can edit.

Work needed (estimate 1 to 2 days of build plus tests, plus a security review):
1. Convert articles from `article-*.ts` to Markdown or JSON files with the same fields (blocks, sources, verifiedAt), loaded at build time.
2. Move image registration to a JSON file the CMS can edit (alt text, credit, licence).
3. Add the CMS config file, with fields for the above and a validation step so a bad edit fails the build rather than the live site.
4. Keep drafts out of the public bundle (the current test in `src/test/content-registry.test.ts` must still pass).

Trade-offs: a build step that reads files must still run on the host; the buyer needs a GitHub account; the owner decision "no unnecessary backend" is respected (the CMS runs in the browser against GitHub). This is NOT done and the site must not be described to a buyer as having a CMS until it is.

## What to tell a buyer today

"Content is stored as code in a GitHub repository. Images can be added with a documented one-command pipeline. There is no browser-based editor yet. Editing is done in the repository, through Lovable chat or an AI assistant, following `docs/buyer/CONTENT-MANAGEMENT.md`."
