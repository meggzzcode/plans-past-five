#!/usr/bin/env node
/**
 * Build the sanitised BUYER PACKAGE: a zip of the repo tree with everything a buyer must not receive
 * left out (credentials, build output, seller-internal notes, other-business material). The rules
 * are in docs/buyer/BUYER-PACKAGE-CONTENTS.md; this script is the executable form of that list.
 *
 *   node scripts/make-buyer-package.mjs --list          dry run: print what would ship, what is excluded, and warnings
 *   node scripts/make-buyer-package.mjs                 write /tmp/plans-past-five-buyer-package-<date>.zip
 *   node scripts/make-buyer-package.mjs --out <file>    write to another path (must be under the system temp directory)
 *
 * Safety: read-only on the repo; the zip is ALWAYS written outside the repo (a path inside the repo is
 * refused); no network; no dependencies (a tiny zip writer is built in). It exits non-zero, and writes
 * nothing, if a secret-looking string is found in a file that would ship.
 */
import { crc32, deflateRawSync } from "node:zlib";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const listOnly = args.includes("--list");
const date = new Date().toISOString().slice(0, 10);
const outArg = args.includes("--out") ? args[args.indexOf("--out") + 1] : undefined;
const out = resolve(outArg ?? join(tmpdir(), `plans-past-five-buyer-package-${date}.zip`));

if (!listOnly) {
  const inRepo = out === root || out.startsWith(root + sep);
  const inTmp = out.startsWith(resolve(tmpdir()) + sep);
  if (inRepo || !inTmp) {
    console.error(`Refusing to write ${out}: the package must go to the system temp directory (${tmpdir()}), never into the repo.`);
    process.exit(2);
  }
}

/** Path prefixes (relative to the repo root, forward slashes) that never ship. */
const EXCLUDE_PREFIX = [
  ".git/", "node_modules/", "dist/", ".output/", ".netlify/", ".wrangler/", ".tanstack/", ".nitro/", ".vinxi/",
  ".lovable/", // the seller's Lovable project marker
  "docs/cowork/", // prompts and logs for the seller's browser assistant, may name accounts
  "docs/launch/", // seller's activation plan; names another business and personal accounts
  "docs/process/LESSONS-LEARNED-CUSTOMER-REVIEW.md",
  "docs/HANDLING-LOG.md", "docs/RESUME.md", "docs/TURNKEY-PLAN.md", // internal working notes; TURNKEY-PLAN names another business
  "docs/commerce/buy-plan/", "docs/commerce/kit-candidates-for-cowork.csv",
  "docs/content/incoming-images/", "docs/content/sliced-tiles/", // Canva sheets and tiles, archive only
];
/** File-name patterns that never ship, anywhere. */
const EXCLUDE_NAME = [/^\.env(\..*)?$/, /\.local$/, /\.log$/, /\.DS_Store$/, /\.zip$/, /\.bundle$/, /^\.dev\.vars$/, /\.pem$/, /\.key$/];
/** Inside docs/, only these ship. Everything else under docs/ is seller-internal (marketplace strategy, reviews, final-inspection working files, pricing). */
const DOCS_ALLOW = [
  /^docs\/buyer\//, /^docs\/commerce\//, /^docs\/content\//, /^docs\/marketing\//,
  /^docs\/BRAND-GUIDE\.md$/, /^docs\/IMAGE-LICENSES\.md$/, /^docs\/NAME-CHECK-planspastfive\.md$/,
  /^docs\/pinterest-pins\.csv$/, /^docs\/PINTEREST-90-DAY-SCHEDULE\.md$/, /^docs\/SOP-[\w-]+\.md$/,
  /^docs\/process\/AFFILIATE-EXPORT-RULE\.md$/,
  // the only seller-side marketplace files a buyer receives:
  /^docs\/marketplace\/final-inspection\/(BUYER-TAKEOVER|NEW-OWNER-QUICKSTART|RIGHTS-AND-TRANSFERABILITY)\.md$/,
];

const rel = (p) => relative(root, p).split(sep).join("/");
const included = [];
const excluded = new Map(); // reason bucket -> count
const note = (k) => excluded.set(k, (excluded.get(k) ?? 0) + 1);

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const r = rel(abs);
    const st = lstatSync(abs);
    if (st.isSymbolicLink()) { note("symbolic links"); continue; }
    const asDir = st.isDirectory() ? r + "/" : r;
    const prefix = EXCLUDE_PREFIX.find((x) => asDir === x || asDir.startsWith(x));
    if (prefix) { note(prefix); continue; }
    if (st.isDirectory()) { walk(abs); continue; }
    if (EXCLUDE_NAME.some((re) => re.test(name))) { note("secret/log/archive file names"); continue; }
    if (r.startsWith("docs/") && !DOCS_ALLOW.some((re) => re.test(r))) {
      note(r.split("/").slice(0, r.startsWith("docs/marketplace/") ? 2 : 2).join("/") + " (not on the docs allow-list)");
      continue;
    }
    included.push({ rel: r, abs, size: st.size });
  }
}
walk(root);

// ---- checks on what would ship ----
const TEXT = /\.(md|mjs|js|ts|tsx|json|yml|yaml|toml|csv|css|html|txt|svg|py|sh|d\.mts|webmanifest)$|^(\.gitignore|\.prettierrc|\.prettierignore|_headers|robots\.txt)$/;
const SECRET = [
  /gh[pousr]_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{30,}/, /sk-[A-Za-z0-9]{32,}/, /AKIA[0-9A-Z]{16}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /xox[baprs]-[A-Za-z0-9-]{20,}/, /AIza[0-9A-Za-z_-]{35}/,
  /(api[_-]?key|secret|token|password)["']?\s*[:=]\s*["'][A-Za-z0-9_\-/+=]{20,}["']/i,
];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const EMAIL_OK = /@(planspastfive\.com|example\.(com|org)|users\.noreply\.github\.com|anthropic\.com)$|^(hello|partnerships|subscriptions|support|info)@/i;
const secrets = [];
const emails = new Map();
const shippedSet = new Set(included.map((f) => f.rel));
const dangling = new Map();
for (const f of included) {
  if (!TEXT.test(f.rel.split("/").pop()) || f.size > 3_000_000) continue;
  const t = readFileSync(f.abs, "utf8");
  for (const re of SECRET) if (re.test(t)) secrets.push(`${f.rel} matches ${re}`);
  for (const m of t.match(EMAIL) ?? []) if (!EMAIL_OK.test(m)) emails.set(`${f.rel}: ${m}`, 1);
  if (f.rel.endsWith(".md")) {
    for (const m of t.matchAll(/`((?:docs|scripts|src|content|design|public)\/[A-Za-z0-9_\-./]+\.(?:md|csv|mjs|json|ts|tsx))`/g)) {
      const p = m[1];
      if (!shippedSet.has(p) && !/[*<>{}]/.test(p)) {
        const key = `${f.rel} -> ${p}`;
        if (existsSync(join(root, p))) dangling.set(key, "excluded from the package");
      }
    }
  }
}

const total = included.reduce((n, f) => n + f.size, 0);
const mb = (n) => (n / 1048576).toFixed(1);
console.log(`Buyer package (${date}): ${included.length} files, ${mb(total)} MB before compression.`);
console.log("\nExcluded (count by rule):");
for (const [k, v] of [...excluded.entries()].sort()) console.log(`  ${String(v).padStart(5)}  ${k}`);
if (secrets.length) console.log("\nSECRET-LIKE STRINGS FOUND (package NOT written):\n  " + secrets.join("\n  "));
if (emails.size) console.log("\nEmail addresses in shipped files (review for personal data):\n  " + [...emails.keys()].join("\n  "));
if (dangling.size) {
  console.log(`\nReferences from shipped docs to files that are NOT in the package (${dangling.size}); fix the doc or accept the gap:`);
  for (const k of [...dangling.keys()].slice(0, 60)) console.log("  " + k);
  if (dangling.size > 60) console.log(`  ... and ${dangling.size - 60} more`);
}
if (listOnly) {
  console.log("\nShipped top-level entries:");
  const tops = new Map();
  for (const f of included) { const k = f.rel.includes("/") ? f.rel.split("/").slice(0, f.rel.startsWith("docs/") ? 2 : 1).join("/") + "/" : f.rel; tops.set(k, (tops.get(k) ?? 0) + 1); }
  for (const [k, v] of [...tops.entries()].sort()) console.log(`  ${String(v).padStart(5)}  ${k}`);
  console.log(`\nDry run only (--list): nothing written. Would write ${out}`);
  process.exit(secrets.length ? 1 : 0);
}
if (secrets.length) process.exit(1);

// ---- minimal zip writer (deflate, no dependencies) ----
const chunks = [];
const central = [];
let offset = 0;
const dosTime = (() => { const d = new Date(); return [((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xffff, (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff]; })();
for (const f of included.sort((a, b) => a.rel.localeCompare(b.rel))) {
  const data = readFileSync(f.abs);
  const comp = deflateRawSync(data);
  const useComp = comp.length < data.length;
  const body = useComp ? comp : data;
  const name = Buffer.from(f.rel);
  const crc = crc32(data) >>> 0;
  const lh = Buffer.alloc(30);
  lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
  lh.writeUInt16LE(useComp ? 8 : 0, 8); lh.writeUInt16LE(dosTime[0], 10); lh.writeUInt16LE(dosTime[1], 12);
  lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(body.length, 18); lh.writeUInt32LE(data.length, 22);
  lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
  chunks.push(lh, name, body);
  const ch = Buffer.alloc(46);
  ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(0x031e, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8);
  ch.writeUInt16LE(useComp ? 8 : 0, 10); ch.writeUInt16LE(dosTime[0], 12); ch.writeUInt16LE(dosTime[1], 14);
  ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(body.length, 20); ch.writeUInt32LE(data.length, 24);
  ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE(0o100644 << 16 >>> 0, 38); ch.writeUInt32LE(offset, 42);
  central.push(ch, name);
  offset += lh.length + name.length + body.length;
}
const cdSize = central.reduce((n, b) => n + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(included.length, 8); end.writeUInt16LE(included.length, 10);
end.writeUInt32LE(cdSize, 12); end.writeUInt32LE(offset, 16);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, Buffer.concat([...chunks, ...central, end]));
console.log(`\nWrote ${out} (${mb(Buffer.concat([...chunks, ...central, end]).length)} MB zipped, ${included.length} files).`);
