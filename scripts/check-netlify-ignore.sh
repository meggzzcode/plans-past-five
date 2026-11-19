#!/usr/bin/env bash
# Tests the Netlify `ignore` rule from netlify.toml in a scratch git repo.
# Exit code 0 from the rule = SKIP the build; 1 = BUILD. Usage: bash scripts/check-netlify-ignore.sh
# Netlify sets CONTEXT to production, deploy-preview or branch-deploy; the cases below set it the same way.
set -u
root="$(cd "$(dirname "$0")/.." && pwd)"
rule="$(node -e '
  const t = require("fs").readFileSync(process.argv[1], "utf8");
  const m = /^\s*ignore\s*=\s*(?:\x27\x27\x27\n?([\s\S]*?)\x27\x27\x27|"((?:[^"\\]|\\.)*)")\s*$/m.exec(t);
  if (!m) process.exit(0);
  process.stdout.write(m[1] !== undefined ? m[1] : m[2].replace(/\\\\/g, "\\").replace(/\\"/g, "\""));
' "$root/netlify.toml")"
[ -n "$rule" ] || { echo "no ignore rule found"; exit 2; }
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
cd "$tmp" && git init -q && git config user.email t@t && git config user.name t
fail=0
check() { # name, message, expected (SKIP|BUILD), context ("" = unset)
  git commit -q --allow-empty -m "$2"
  if [ -n "${4:-}" ]; then CONTEXT="$4" bash -c "$rule"; rc=$?; else env -u CONTEXT bash -c "$rule"; rc=$?; fi
  got=$([ $rc -eq 0 ] && echo SKIP || echo BUILD)
  [ "$got" = "$3" ] && echo "PASS  $1 -> $got" || { echo "FAIL  $1 -> $got (wanted $3)"; fail=1; }
}
check "CMS save (no marker)"            "content(update): content/articles/x.json" SKIP production
check "CMS save, new image"             "content(create): public/uploads/a.jpg" SKIP production
check "Docs-only commit"                "docs: reword CMS-SETUP" SKIP production
check "Release commit with marker"      "Release: new article [deploy]" BUILD production
check "Marker in the last line only"    $'content(update): x\n\nRelease [deploy]' BUILD production
check "Marker misspelled"               "Release: new article [deplo]" SKIP production
check "Context unset behaves like production (no marker)" "content(update): y" SKIP ""
check "Deploy Preview builds without a marker (0 credits)" "content(update): z" BUILD deploy-preview
check "Branch deploy builds without a marker (0 credits)"  "content(update): w" BUILD branch-deploy
echo "rule:"; echo "$rule"
exit $fail
