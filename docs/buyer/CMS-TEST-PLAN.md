# CMS real-login test plan (for Cowork and the owner)

> **NOT YET TESTED WITH A REAL LOGIN.** The CMS is configured (`.pages.yml`) and the content checks are tested, but nobody has yet signed in to Pages CMS with the owner's GitHub login, edited a real article, or pressed Netlify's Trigger deploy on this site. Do not treat it as fully operational until `docs/buyer/CMS-TEST-PLAN.md` has been run and recorded as passed.

**MANDATORY, NOT YET DONE.** Do it on a throwaway repository and a throwaway Netlify site, never on production: the exact accounts, permissions, safe-environment setup and step list are in `docs/editorial-reset/CMS-ACCEPTANCE-TEST-OWNER-ACTIONS.md`. This table is the short checklist.

Goal: prove the real workflow with the owner's GitHub login and a real Netlify project, then record the result. Use a throwaway article and image. Budget: about 6 publishes (90 of the 300 free credits; previews cost 0).

Before you start: `.pages.yml` and `netlify.toml` are on `main`, the Netlify site builds from `main`, and you have noted the live site's article count and `/sitemap.xml`. Save a copy of `content/articles/how-to-start-crocheting.json` (raw GitHub view) to diff against later.

| # | Step (exact) | Expected | Result (PASS / FAIL, note) |
|---|---|---|---|
| 1 | https://pagescms.org, Sign in with GitHub, Add a project, pick the repo, branch main | Left menu shows Articles and Images; no `.pages.yml` error | |
| 2 | Images, Add an entry. Picture name `cmsTest`. Upload a small JPG (under 400 KB). Leave Describe the photo empty, press Save | Refuses: alt is required | |
| 3 | Write alt text (20+ characters), fill source and licence, Save | GitHub shows a commit under `content/images/cmsTest.json` and the photo under `public/uploads/`. Check the JSON `file` path matches what the site expects (compare with an existing images file) | |
| 4 | Articles, Add an entry: slug `cms-test-article`, title, summary, a section, **Status Draft**, hero = `cmsTest`, search intent, angle, one paragraph block. Save | Commit appears. Filename is `cms-test-article.json` (not the title) | |
| 5 | Open the draft, edit a paragraph, add an h2 block, Save | Second commit | |
| 6 | Open `how-to-start-crocheting` in the CMS, change nothing, Save | Either no commit or an identical file. Then diff the JSON on GitHub against your saved copy: **no fields lost, no key reordering that changes meaning, no added empty fields** (`settings.content.merge: true` should keep unknown fields). Record any difference | |
| 7 | Netlify Deploys: check the top deploy | Saves in steps 3 to 6 produced **Skipped** (or no) builds, no new production deploy, live site unchanged | |
| 8 | Publish a draft check: Netlify Deploys, Trigger deploy, Deploy site | Build runs and is Published. **Record whether Trigger deploy ran or was skipped.** If skipped, edit `RELEASES.md` on GitHub with message `Release: CMS test [deploy]` | |
| 9 | Open the live site and `/sitemap.xml` | The draft is **not** visible (drafts stay private) | |
| 10 | Set `cms-test-article` to Status Published, First published on today, Facts checked today, empty "Facts still waiting", add one source with https://. Save. Publish (step 8) | Build Published | |
| 11 | Visit `/journal/cms-test-article`, check hero image, alt text (view source), sitemap entry | Live; image loads from `/uploads/` | |
| 12 | Break it on purpose: set a source URL to `www.example.com` (no https). Save. Publish | Deploy **Failed** with the plain-English message naming the file and field; live site unchanged. Fix, Save | |
| 13 | Unpublish: Status Draft, Save, Publish | Article gone from live site and sitemap | |
| 14 | Delete `cms-test-article` and `cmsTest` entries and the uploaded photo in the CMS (or GitHub). Publish once more only if you want the live site byte-identical; otherwise leave for the next normal publish | Repo clean | |
| 15 | Rollback test: Netlify Deploys, pick the deploy from before step 10, Publish deploy; then turn Auto publish back on | Live site back to the earlier state | |
| 16 | Netlify Usage | Count credits spent; compare with 15 per publish. Note whether skipped builds cost anything | |
| 17 | Site settings: change the site name, Save. Check `content/settings.json` on GitHub | Valid JSON, 2-space indent, no final newline, booleans are true/false | |
| 18 | Site settings: type `UA-1234` in the Google Analytics field, Save, build | Build **fails** with "is not a Google Analytics 4 measurement ID"; live site unchanged. Fix and Save | |
| 19 | Images: Save an upload with empty "Where it came from" or Licence | Build fails naming the file and the two fields | |
| 20 | Articles: set a linked article to Draft, Save, build | Build fails listing every link, pin or override that still points at it | |
| 21 | Record the file name Pages CMS gives a new article (title or slug) | Noted; the build does not depend on it | |
| 22 | Invite an email address with no GitHub account as a collaborator; they edit and Save | Works, or the docs are corrected | |
| 23 | Branch route (test repository only): edit on `content-edits`, open the free branch preview, press Publish site | Preview builds at 0 credits; Publish validates, merges, one production deploy of 15 credits | |
| 24 | Affiliate: in the throwaway repository only, switch tracking ON with the fake ID `testsite-20` | A product link ends `?tag=testsite-20` and the disclosure appears; switch OFF again and delete the site. Never on production, never a real ID | |

## Record
Write the outcome (date, tester, each row's result, screenshots of the Failed message and the Trigger deploy outcome, credits used) in `docs/cowork/CMS-LIVE-TEST-LOG.md`. Only if every row passes may the NOT YET TESTED banner be removed from the docs. If step 8 shows Trigger deploy is skipped, change the docs to make the `RELEASES.md` method primary. If step 6 shows lost fields, stop and report before anyone edits real articles. If steps 17 to 24 show a different format from the one recorded in `docs/editorial-reset/changes/stage2b.md`, update that note and the build tidy-up test.
