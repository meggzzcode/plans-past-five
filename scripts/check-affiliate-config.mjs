#!/usr/bin/env node
/**
 * Affiliate configuration guard. Proves the test suite does not depend on whether the Amazon
 * affiliate entry is inactive (shipped default) or activated by a buyer.
 *
 * It runs vitest twice with AFFILIATE_TEST_STATE=inactive and =active (a FAKE id is applied in
 * memory by src/test/setup.ts; no file is edited) and fails if either run fails.
 *
 *   node scripts/check-affiliate-config.mjs            full suite, both states
 *   node scripts/check-affiliate-config.mjs --quick    only the affiliate-sensitive test files
 *   node scripts/check-affiliate-config.mjs --expect-inactive
 *       also fail if src/config/affiliate.ts is not in the shipped inactive state (use on the
 *       seller's release branch only; a buyer who activates their own id must NOT pass this flag).
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));

export const SENSITIVE_FILES = [
  "src/test/affiliate.test.ts",
  "src/test/export-links.test.tsx",
  "src/test/round3-fixes.test.tsx",
  "src/test/shop.test.tsx",
  "src/test/rules.test.ts",
  "src/test/affiliate-activation-safety.test.ts",
];

/** Read the Amazon entry's configured state from source text (no TS execution needed). */
export function configuredState() {
  const src = readFileSync(path.join(root, "src/config/affiliate.ts"), "utf8");
  const i = src.indexOf("affiliateRegistry: Record<string, AffiliateEntry> = {");
  const block = i >= 0 ? src.slice(i) : "";
  const tag = /websiteTrackingId:\s*"([^"]*)"/.exec(block)?.[1] ?? "";
  const active = /\bactive:\s*true\b/.test(block);
  const approved = /approvalStatus:\s*"approved"/.test(block);
  return { tag, active, approved, inactive: !tag && !active && !approved };
}

function run(state, files) {
  const vitest = path.join(root, "node_modules", "vitest", "vitest.mjs");
  console.log(
    `\n== affiliate state: ${state} (${files.length ? files.length + " files" : "full suite"}) ==`,
  );
  const r = spawnSync(process.execPath, [vitest, "run", ...files], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, AFFILIATE_TEST_STATE: state, AFFILIATE_GUARD_CHILD: "1" },
  });
  return r.status === 0;
}

const cfg = configuredState();
console.log(
  `Configured Amazon entry: ${cfg.inactive ? "inactive (shipped default)" : `ACTIVE-LOOKING (tag "${cfg.tag}", active=${cfg.active}, approved=${cfg.approved})`}`,
);
if (args.has("--expect-inactive") && !cfg.inactive) {
  console.error(
    "FAIL: --expect-inactive but src/config/affiliate.ts has an activated Amazon entry.",
  );
  process.exit(1);
}
const files = args.has("--quick") ? SENSITIVE_FILES : [];
const results = ["inactive", "active"].map((s) => [s, run(s, files)]);
for (const [s, ok] of results) console.log(`${ok ? "PASS" : "FAIL"}  ${s}`);
process.exit(results.every(([, ok]) => ok) ? 0 : 1);
