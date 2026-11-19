/**
 * CI guard: the suite must pass whether the Amazon entry ships inactive or a buyer has activated it.
 * Runs the affiliate-sensitive files twice (AFFILIATE_TEST_STATE=inactive / active, fake id applied
 * in memory) through scripts/check-affiliate-config.mjs, and statically checks that every test file
 * touching the registry uses the explicit-state helper. The full-suite version is
 * `node scripts/check-affiliate-config.mjs`.
 */
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const testDir = path.join(root, "src/test");
const isChild = process.env["AFFILIATE_GUARD_CHILD"] === "1";

describe("affiliate config independence", () => {
  it("every test file that mutates or asserts on the registry sets state through the helper", () => {
    const offenders: string[] = [];
    for (const f of readdirSync(testDir).filter((n) => /\.test\.tsx?$/.test(n))) {
      if (f === "affiliate-config-independence.test.ts") continue;
      const src = readFileSync(path.join(testDir, f), "utf8");
      const touches =
        /affiliateRegistry\[|affiliate\.associatesTag\s*=|\.websiteTrackingId\s*=|AMAZON_ASSOCIATE_STATEMENT|isMonetized\(|commissionStatement\(/.test(
          src,
        );
      if (touches && !src.includes("affiliate-state")) offenders.push(f);
    }
    expect(offenders).toEqual([]);
  });

  it("no test hard-codes the shipped inactive default as a precondition", () => {
    const offenders: string[] = [];
    for (const f of readdirSync(testDir).filter((n) => /\.test\.tsx?$/.test(n))) {
      if (f === "affiliate-config-independence.test.ts") continue;
      const src = readFileSync(path.join(testDir, f), "utf8");
      if (
        /shipped registry|ships unmonetized|not sponsored today|no affiliate tag by default/.test(
          src,
        )
      )
        offenders.push(f);
    }
    expect(offenders).toEqual([]);
  });

  it.skipIf(isChild)(
    "affiliate-sensitive files pass with the entry forced inactive and forced active",
    () => {
      const r = spawnSync(process.execPath, ["scripts/check-affiliate-config.mjs", "--quick"], {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, AFFILIATE_GUARD_CHILD: "1" },
      });
      const out = `${r.stdout}\n${r.stderr}`;
      expect(out, out.slice(-3000)).toMatch(/PASS\s+inactive/);
      expect(out, out.slice(-3000)).toMatch(/PASS\s+active/);
      expect(r.status, out.slice(-3000)).toBe(0);
    },
    240_000,
  );
});
