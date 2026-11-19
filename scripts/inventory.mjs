#!/usr/bin/env node
/**
 * Compute the REAL counts from the repo and write docs/buyer/INVENTORY.md.
 *
 *   node scripts/inventory.mjs               count everything, run the test suite in a /tmp copy, write the file
 *   node scripts/inventory.mjs --no-tests    skip the test run (the tests line says "not run")
 *   node scripts/inventory.mjs --stdout      print instead of writing
 *
 * Safe by design: it only READS the repo and writes ONE file (docs/buyer/INVENTORY.md). The test run
 * happens in a throwaway copy under the system temp directory, never in the repo. It never runs the
 * product importer. The data modules are TypeScript, so under Node this script re-runs itself with Bun.
 * Every other doc points here instead of repeating numbers that go stale.
 */
import { spawnSync, execSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

if (!process.versions.bun) {
  const r = spawnSync("bun", [fileURLToPath(import.meta.url), ...args], { stdio: "inherit" });
  if (r.error) {
    console.error("This script needs Bun (it imports the TypeScript data files). Install Bun, then re-run.");
    process.exit(1);
  }
  process.exit(r.status ?? 1);
}

const at = (p) => join(root, p);
const countFiles = (dir, re = /./) =>
  existsSync(at(dir)) ? readdirSync(at(dir)).filter((f) => re.test(f) && statSync(at(join(dir, f))).isFile()).length : 0;
const sh = (c) => {
  try {
    return execSync(c, { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
};

const { articles: published, articleWordCount } = await import(at("src/content/index.ts"));
const drafts = JSON.parse(readFileSync(at("src/content/generated/drafts.json"), "utf8"));
const { hobbies } = await import(at("src/data/hobbies.ts"));
const { catalog, verifiedCatalog } = await import(at("src/data/catalog.ts"));
const { kits, fillKit, isFullKit } = await import(at("src/data/kits.ts"));
const { collections, products: legacyProducts } = await import(at("src/data/products.ts"));
const { sitemapPaths } = await import(at("src/lib/sitemap.ts"));
const { pinFiles } = await import(at("src/data/pins.ts"));
const { images } = await import(at("src/data/images.ts"));

const wordsOf = (list) => list.reduce((n, a) => n + articleWordCount(a), 0);
const verified = catalog.filter((p) => p.status === "verified");
const held = catalog.filter((p) => p.hold);
const candidates = catalog.filter((p) => p.status === "candidate");
const kitRows = kits.map((k) => {
  const filled = fillKit(k, verifiedCatalog);
  return { id: k.id, picks: filled.length, full: isFullKit(filled, k) };
});
const routeFiles = readdirSync(at("src/routes")).filter((f) => f.endsWith(".tsx") && !f.startsWith("__"));
const pinCount = countFiles("public/pins", /\.(jpe?g|png)$/i);
const pinCsvRows = Math.max(0, readFileSync(at("docs/pinterest-pins.csv"), "utf8").trim().split("\n").length - 1);

// Tests: run vitest with the JSON reporter in a throwaway copy of the repo under the temp dir.
let tests = "not run (use `node scripts/inventory.mjs` without --no-tests)";
if (!args.includes("--no-tests")) {
  const tmp = mkdtempSync(join(tmpdir(), "ppf-inventory-"));
  try {
    cpSync(root, tmp, {
      recursive: true,
      filter: (src) => !/[\\/](node_modules|dist|\.output|\.netlify|\.git)([\\/]|$)/.test(src.slice(root.length)),
    });
    symlinkSync(at("node_modules"), join(tmp, "node_modules"));
    const r = spawnSync("bunx", ["vitest", "run", "--reporter=json"], { cwd: tmp, encoding: "utf8", maxBuffer: 1 << 28 });
    const out = r.stdout ?? "";
    const json = JSON.parse(out.slice(out.indexOf("{")));
    tests = `${json.numPassedTests} passed, ${json.numFailedTests} failed, ${json.numTotalTests} total, in ${json.numTotalTestSuites === undefined ? "?" : json.testResults.length} files`;
  } catch (e) {
    tests = `test run failed to produce a result (${String(e.message).slice(0, 80)})`;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

const commit = sh("git rev-parse --short HEAD") || "unknown";
const dirty = sh("git status --porcelain") ? " (working tree has uncommitted changes)" : "";
const date = new Date().toISOString().slice(0, 10);
const fontFiles = countFiles("design/brand/fonts", /\.ttf$/i);
const logoFiles = countFiles("design/brand/logos", /\.svg$/i);

const md = `# Inventory (generated)

Generated ${date} from commit \`${commit}\`${dirty} by \`node scripts/inventory.mjs\`. **Do not edit by hand.** Re-run the script and every other document should point here instead of repeating these numbers. If this file is older than the last content change, re-run it.

## Content

| Item | Count |
| --- | --- |
| Published articles | ${published.length} (${wordsOf(published).toLocaleString("en-US")} words incl. dek, per \`articleWordCount\`) |
| Draft articles (never public) | ${drafts.length} (${wordsOf(drafts).toLocaleString("en-US")} words) |
| Hobbies | ${hobbies.length}; ${hobbies.filter((h) => h.image).length} have an image; ${hobbies.filter((h) => published.some((a) => a.hobbies?.includes?.(h.slug))).length} are covered by a published guide |
| Shop collections | ${collections.length} |
| Collection kits | ${kits.length}; complete (render as a kit): ${kitRows.filter((k) => k.full).length} (${kitRows.filter((k) => k.full).map((k) => k.id).join(", ") || "none"}); incomplete: ${kitRows.filter((k) => !k.full).length} |
| Legacy shop records (\`src/data/products.ts\`, search-link style, not researched) | ${legacyProducts.length} |

## Products (researched catalog, \`src/data/catalog.generated.ts\`)

| Item | Count |
| --- | --- |
| Records in total | ${catalog.length} |
| Verified | ${verified.length} |
| Candidates (never shown) | ${candidates.length} |
| On editorial hold | ${held.length} |
| Shown publicly (verified, not held, available, valid today) | ${verifiedCatalog.length} |

## Assets

| Item | Count |
| --- | --- |
| Pinterest pin images in \`public/pins\` | ${pinCount} (${Object.keys(pinFiles).length} pages have pins; ${pinCsvRows} rows in \`docs/pinterest-pins.csv\`) |
| Image keys used by the site (\`src/data/images*.ts\`) | ${Object.keys(images).length} |
| Image files in \`src/assets\` | ${countFiles("src/assets", /\.(jpe?g|png|webp|svg)$/i)} |
| Article image files in \`content/images\` | ${countFiles("content/images")} |
| Logo SVGs (\`design/brand/logos\`) | ${logoFiles} |
| Font files (\`design/brand/fonts\`, SIL OFL) | ${fontFiles} (Fraunces, DM Sans, Caveat) |

## Site

| Item | Count |
| --- | --- |
| Route files in \`src/routes\` | ${routeFiles.length} |
| Pages in the sitemap (\`/sitemap.xml\`, built from \`src/lib/sitemap.ts\`) | ${sitemapPaths().length} |
| Test result (\`bunx vitest run\`, run in a temporary copy) | ${tests} |
| Test files | ${countFiles("src/test", /\.test\.tsx?$/)} |
| Docs in \`docs/buyer\` | ${countFiles("docs/buyer", /\.md$/)} |

## Notes

- "Shown" depends on today's date (records past their verification window can drop out), so it can change without any edit.
- Words are counted with the same function the reading-time label uses.
- Nothing here is a traffic, revenue or ranking number. There are none.
`;

if (args.includes("--stdout")) process.stdout.write(md);
else {
  writeFileSync(at("docs/buyer/INVENTORY.md"), md);
  console.log(`Wrote docs/buyer/INVENTORY.md (commit ${commit}, ${date}).`);
  console.log(md.split("\n").filter((l) => l.startsWith("| ") && !l.startsWith("| Item") && !l.startsWith("| ---")).join("\n"));
}
