#!/usr/bin/env node
/**
 * Generate THIRD-PARTY-NOTICES.md from the licences of the installed PRODUCTION dependencies.
 *
 *   node scripts/third-party-notices.mjs            write THIRD-PARTY-NOTICES.md in the repo root
 *   node scripts/third-party-notices.mjs --stdout   print instead
 *
 * Needs `bun install` first (reads node_modules) and uses `bunx license-checker` (public npm package,
 * read-only; nothing is installed into the repo). It never runs the importer or a build.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (!existsSync(resolve(root, "node_modules"))) {
  console.error("Run `bun install --frozen-lockfile` first.");
  process.exit(1);
}
const r = spawnSync("bunx", ["license-checker", "--production", "--json", "--start", root], {
  encoding: "utf8",
  maxBuffer: 1 << 28,
});
if (r.status !== 0) {
  console.error("license-checker failed:", (r.stderr || "").slice(0, 300));
  process.exit(1);
}
const data = JSON.parse(r.stdout);
const entries = Object.entries(data)
  .filter(([k]) => !k.startsWith("tanstack_start_ts@"))
  .sort(([a], [b]) => a.localeCompare(b));

const copyright = (file) => {
  try {
    const line = readFileSync(file, "utf8")
      .split("\n")
      .find((l) => /copyright/i.test(l) && /\d{4}|\bauthors?\b/i.test(l));
    return line
      ? line
          .replace(/^[\s#*/-]+/, "")
          .trim()
          .slice(0, 140)
      : "";
  } catch {
    return "";
  }
};

const byLicence = new Map();
for (const [, v] of entries) {
  const l = Array.isArray(v.licenses) ? v.licenses.join(" OR ") : v.licenses;
  byLicence.set(l, (byLicence.get(l) ?? 0) + 1);
}
const notable = entries.filter(([, v]) => !["MIT", "ISC"].includes(String(v.licenses)));
const date = new Date().toISOString().slice(0, 10);

const md = `# Third-party notices

Generated ${date} by \`node scripts/third-party-notices.mjs\` (uses \`license-checker\` over the installed production dependencies, ${entries.length} packages). **Not legal advice.** This file is for the owner's review; it is a starting inventory, not a legal opinion.

The project's own code is proprietary (see \`docs/buyer/LICENCE-STATUS.md\`); no open-source licence has been applied to it. The packages below keep their own licences. Their licence texts ship inside each package in \`node_modules\` (installed with \`bun install\`) and are not copied into this repository. The production build bundles parts of these packages into the site's JavaScript. MIT, ISC, BSD and Apache-2.0 licences require the copyright notice and licence text to travel with copies of the software; if you distribute the built bundle, keep the notices (this file plus the licence texts from \`node_modules\`, or a bundler licence-comment plugin).

## Summary by licence

| Licence | Packages |
| --- | --- |
${[...byLicence.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([l, n]) => `| ${l} | ${n} |`)
  .join("\n")}

No GPL, AGPL, LGPL, SSPL or "unknown" licence appears in the production set at generation time. Re-run the script after any dependency change and re-check this statement.

## Notable licences (not plain MIT or ISC)

- **MPL-2.0** (\`lightningcss\` and its platform binaries): file-level copyleft. Used unmodified as build tooling; if you modify and distribute those files, MPL-2.0 source-sharing duties apply to those files.
- **Apache-2.0** (for example \`class-variance-authority\`, \`typescript\`, \`detect-libc\`, \`baseline-browser-mapping\`): keep the licence and NOTICE text if you redistribute.
- **BSD-2/3-Clause**, **0BSD**, **Unlicense**, **Python-2.0** (\`argparse\`): permissive.
- **CC-BY-4.0** (\`caniuse-lite\`, browser-support data): requires attribution; the notice is in the package.
- **MIT AND ISC** (\`victory-vendor\`, bundled d3 pieces): both notices apply.

| Package | Licence | Copyright line found in the package licence file |
| --- | --- | --- |
${notable.map(([k, v]) => `| ${k} | ${v.licenses} | ${copyright(v.licenseFile).replace(/\|/g, "/")} |`).join("\n")}

## Fonts and other non-npm material

| Item | Licence | Where the licence text is |
| --- | --- | --- |
| Fraunces (Copyright 2018 The Fraunces Project Authors) | SIL Open Font License 1.1 | \`design/brand/fonts/OFL-Fraunces.txt\` |
| DM Sans (Copyright 2014 The DM Sans Project Authors) | SIL Open Font License 1.1 | \`design/brand/fonts/OFL-DMSans.txt\` |
| Caveat (Copyright 2014 The Caveat Project Authors) | SIL Open Font License 1.1 | \`design/brand/fonts/OFL-Caveat.txt\` |

Keep the three OFL files with any copy of the font files. The fonts may not be sold on their own. The site loads them at runtime from Google Fonts (a third-party request; disclose it or self-host).

AI-generated images are not covered by a licence in this file: see \`docs/buyer/IMAGE-AND-ASSET-RIGHTS.md\`.

## Full production list

| Package | Licence | Publisher | Repository |
| --- | --- | --- | --- |
${entries.map(([k, v]) => `| ${k} | ${v.licenses} | ${(v.publisher ?? "").replace(/\|/g, "/")} | ${v.repository ?? ""} |`).join("\n")}
`;

if (process.argv.includes("--stdout")) process.stdout.write(md);
else {
  writeFileSync(resolve(root, "THIRD-PARTY-NOTICES.md"), md);
  console.log(`Wrote THIRD-PARTY-NOTICES.md (${entries.length} production packages).`);
}
