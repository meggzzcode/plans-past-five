# Repository visibility

**Not legal or security advice. No visibility change is made by this note, and none should be made without the owner's explicit authorisation.**

## What happened

The repository was made **public so that audits could read it** (security, performance, analytics and content reviews). Whether it is public at any given moment is a setting on the code host, not something the files show; check the repository's Settings page rather than trusting this sentence.

## Recommendation

1. **After the audits are finished, make the repository private**, until it is handed to a buyer. A for-sale codebase, its draft listing and its internal review notes do not need to be public, and the code carries no open-source licence (`docs/buyer/LICENCE-STATUS.md`).
2. **Changing visibility does not remove existing copies.** Anything already public may have been cloned, forked, archived or indexed by third parties and search engines. Forks of a public repository keep their own copies and history; the host may detach or delete forks in specific ways, but you cannot recall a copy someone else holds. Treat everything that was ever public as permanently disclosed.
3. **Before and after any change**, run a secrets check over the full history (the pattern scan in `docs/marketplace/SECURITY-AUDIT.md` found no credentials on 2026-11-19; repeat it, because history is part of what was public). If a credential was ever committed, rotate it; making the repo private does not make it safe.
4. **Do not rewrite history to hide things** unless the owner decides to; the repository is connected to a Lovable project whose notice in `AGENTS.md` forbids rewriting pushed history.
5. **Keep the internal review and negotiation notes out of the buyer package** whatever the visibility (`docs/buyer/BUYER-PACKAGE-CONTENTS.md`).
6. For the sale itself, give the buyer access by **repository transfer or by a sanitised export** (`scripts/make-buyer-package.mjs`), not by leaving a public link.

## Who decides

The owner. An assistant or reviewer must not change visibility, collaborators or branch protection without the owner's authorisation in writing.
