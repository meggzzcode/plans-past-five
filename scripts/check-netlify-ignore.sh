#!/usr/bin/env bash
# Tests the Netlify `ignore` rule from netlify.toml in a scratch git repo.
# Exit code 0 from the rule = SKIP the build; 1 = BUILD. Usage: bash scripts/check-netlify-ignore.sh
set -u
root="$(cd "$(dirname "$0")/.." && pwd)"
rule="$(grep -E '^\s*ignore\s*=' "$root/netlify.toml" | sed -E 's/^[^=]*=\s*"(.*)"\s*$/\1/; s/\\\\/\\/g')"
[ -n "$rule" ] || { echo "no ignore rule found"; exit 2; }
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
cd "$tmp" && git init -q && git config user.email t@t && git config user.name t
fail=0
check() { # name, message, expected (SKIP|BUILD)
  git commit -q --allow-empty -m "$2"
  bash -c "$rule"; rc=$?
  got=$([ $rc -eq 0 ] && echo SKIP || echo BUILD)
  [ "$got" = "$3" ] && echo "PASS  $1 -> $got" || { echo "FAIL  $1 -> $got (wanted $3)"; fail=1; }
}
check "CMS save (no marker)"            "content(update): content/articles/x.json" SKIP
check "CMS save, new image"             "content(create): public/uploads/a.jpg" SKIP
check "Docs-only commit"                "docs: reword CMS-SETUP" SKIP
check "Release commit with marker"      "Release: new article [deploy]" BUILD
check "Marker in the last line only"    $'content(update): x\n\nRelease [deploy]' BUILD
check "Marker misspelled"               "Release: new article [deplo]" SKIP
echo "rule: $rule"
exit $fail
