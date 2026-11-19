#!/usr/bin/env node
/**
 * Rewrite article JSON files in the exact canonical format the repo expects.
 *
 *   node scripts/format-article.mjs content/articles/my-article.json [more files...]
 *
 * Why: src/test/build-content.test.ts ("is byte-stable") fails if an article file is not written
 * exactly the way scripts/content-lib.mjs writes it (key order, indentation, trailing newline).
 * Hand-edited or generated JSON usually differs. This validates the file with the same rules as
 * the build, then rewrites it canonically. It never changes the content, and it refuses (and
 * writes nothing) if the article is invalid. Pages CMS saves are not affected.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { articleToJson } from "./content-lib.mjs";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/format-article.mjs content/articles/<slug>.json [...]");
  process.exit(2);
}
let failed = false;
for (const f of files) {
  try {
    const text = articleToJson(JSON.parse(readFileSync(f, "utf8")));
    writeFileSync(f, text);
    console.log(`formatted ${f}`);
  } catch (e) {
    failed = true;
    const issues = e?.issues?.map((i) => `${i.path.join(" > ")}: ${i.message}`) ?? [String(e)];
    console.error(`NOT written ${f}:\n  - ${issues.join("\n  - ")}`);
  }
}
process.exit(failed ? 1 : 0);
