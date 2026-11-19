/**
 * Validate content/ and write the generated modules. Runs as `prebuild` (so Netlify's
 * `bun run build` runs it). If anything is wrong it prints a plain-English list and exits 1, which
 * fails the build, so Netlify keeps the previous deploy live.
 *
 *   node scripts/build-content.mjs            validate and write
 *   node scripts/build-content.mjs --check    validate only, write nothing
 */
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { buildContent, ContentError } from "./content-lib.mjs";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const check = process.argv.includes("--check");

try {
  const r = buildContent(root, { write: !check });
  console.log(
    `Content OK: ${r.published.length} published and ${r.drafts.length} draft articles, ${r.images.length} images from content/.${check ? "" : " Generated files written."}`,
  );
} catch (e) {
  if (!(e instanceof ContentError)) throw e;
  console.error("\nThe website was NOT rebuilt because some content needs fixing.");
  console.error(
    "The live site is unchanged and still online. Fix the items below in Pages CMS and save again.\n",
  );
  for (const p of e.problems) console.error(`  - ${p}`);
  console.error(
    "\nTip: open the file named above and look at the field named. To undo your last edit, use GitHub history (docs/buyer/CMS-SETUP.md).\n",
  );
  process.exit(1);
}
