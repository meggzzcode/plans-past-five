# PROPOSED `.pages.yml` addition: the Publish site button (not applied)

Add at the top level of `.pages.yml` (same level as `content:` and `media:`) only after the acceptance test on the throwaway repository has shown the workflow works. The syntax is from https://pagescms.org/docs/configuration/actions/ (read 2026-11-19):

```yaml
actions:
  - name: publish-site
    label: Publish site
    workflow: publish-content.yml
    ref: main
    cancelable: false
```

Notes
- `ref: main` makes GitHub run the workflow file that is on `main`, whichever branch is open in the CMS (the docs also offer `current`; use `current` only if the workflow file exists on `content-edits` too).
- The block is deliberately not in the live `.pages.yml`: an invalid key could make Pages CMS reject the whole file, which would take the article, image and settings forms away, and that cannot be checked without the owner's login.
- Also open the CMS on the `content-edits` branch (the branch picker in Pages CMS), so saves land on that branch and never on `main`.
- To remove: delete the block and the workflow file; edits then go back to `main`.
