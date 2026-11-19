# Stage 2c change record: approved publishing workflow (content branch, preview, deliberate publish, rollback)

Branch: `worktree-agent-afdd2a7a4f973c78d` (fast-forwarded to `editorial-reset` at `101e08b`, then 3 commits). Nothing pushed, nothing deployed, no secret or real ID entered, affiliate state untouched. The `products` collection and navigation were not touched. Restore any batch with `git revert <sha>`.

## What changed
| Change | Files | Restore |
|---|---|---|
| Publish workflow (manual dispatch only, main only, `contents: write`, no secrets, no third-party actions, path guard: only `content/` and `public/uploads/`, merge locally, `build-content.mjs --check` then 8 content-integrity test files, push `main` only after all pass, merge message carries `[deploy]`, then level `content-edits`) | `.github/workflows/publish-content.yml` | revert the batch-1 commit |
| `actions:` block (Publish site button) and header comments | `.pages.yml` (only the header comment and a new top-level `actions:` before `content:`) | same |
| Invariant tests (parse workflows and `.pages.yml`, triggers, permissions, no actions or secrets, no expression inside `run:`, marker equals netlify.toml, push order, path guard and undo logic run for real in scratch git repos) | `src/test/publish-workflow.test.ts` (uses `js-yaml`, which comes with ESLint; not added to package.json) | same |
| Undo last publish workflow (GitHub has no Revert button for a merge that is not a pull request, so a point-and-click revert is provided; no marker unless ticked) | `.github/workflows/undo-last-publish.yml` | revert the batch-2 commit |
| Buyer guide | `docs/buyer/PUBLISH-AND-ROLLBACK.md` | same |
| Contradictions fixed (Trigger deploy as primary method, "proposed, not active", "Revert on GitHub commit page") | `README.md`, `docs/buyer/{CMS-SETUP,CMS-TEST-PLAN,EDITING-WITHOUT-CODE,NETLIFY-CREDITS-AND-RELEASES,HOSTING-AND-DEPLOYMENT,CONTENT-MANAGEMENT,START-HERE}.md`, recommendation, acceptance-test owner actions (copy step removed, rollback step, rows 23 to 28), `proposed/` files marked superseded | revert the batch-3 commit |
| `netlify.toml` comments only (rule unchanged); `scripts/check-netlify-ignore.sh` has 11 cases (publish merge builds, undo commit skips) | `netlify.toml`, `scripts/check-netlify-ignore.sh` | same |

## Pages CMS documentation relied on (read 2026-11-19)
https://pagescms.org/docs/configuration/actions/: action keys `name`, `label`, `workflow` (file in `.github/workflows/`), `ref` (docs list only `current`; the payload example shows `main`), `scope` (collection only), `cancelable` (default true), `confirm` (`title`, `message`, `button`), `fields`; the workflow needs `workflow_dispatch` with an input named `payload` (string); Actions must be enabled. https://pagescms.org/docs/configuration/: `.pages.yml` is read "per repository and per branch"; top-level keys `media`, `content`, `components`, `settings`, `actions`. NOT claimed: that `ref: main` is accepted by the hosted app (the docs show `current` only; `main` appears in the payload example). If the first press fails on `ref`, change it to `current`, which requires `publish-content.yml` to exist on `content-edits` (it does, because the branch starts from `main` and is levelled after each publish); the workflow's own `github.ref == refs/heads/main` guard would then refuse it, so the guard and `ref` must be changed together.

## Design decisions
- No third-party action (not even `actions/checkout`): its commit SHA could not be verified offline, so git and npm (already on the runner) do the work; bun is installed from the official `bun` npm package at the version used here (1.4.4).
- Untrusted-branch safety: path guard (content and uploads only, no symlinks) runs before any package install; the token is passed only to the clone/fetch and push steps, never to install or test steps; no payload, branch name or commit text is interpolated into shell.
- Tests chosen as "content integrity" (not the full suite, which has load-sensitive timeouts): build-content, content-registry, image-ledger, images, settings, links, related, pins. Production build still validates again on Netlify.

## Verification (this worktree)
tsc clean; eslint clean; vitest 789 tests pass; `node scripts/build-content.mjs` OK (32 published, 2 drafts, 14 images); `bash scripts/check-netlify-ignore.sh` 11/11 PASS; production build `NITRO_PRESET=netlify bun run build` in a /tmp copy succeeds. The workflows themselves have NOT run on GitHub (no access): validated by YAML parse, the invariant tests and by running the guard and undo shell steps against scratch git repositories.

## Residual unknowns
Skipped-build cost; whether Trigger deploy honours the ignore rule; whether Pages CMS can edit a non-default branch and shows the button there; whether `ref: main` is accepted; `GITHUB_TOKEN` push to `main` needing "Read and write" workflow permission and no branch protection; Netlify build coalescing.
