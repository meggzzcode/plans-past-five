import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "../..");

describe("image licence ledger", () => {
  const ledger = readFileSync(path.join(root, "docs/content/IMAGE-LICENCE-LEDGER.md"), "utf8");
  const files = readdirSync(path.join(root, "src/assets")).filter((f) =>
    /\.(jpe?g|png|webp)$/i.test(f),
  );
  it("has a row for every image file in src/assets", () => {
    for (const f of files) expect(ledger, f).toContain(`| ${f} |`);
  });
  it("carries the handover statement", () => {
    expect(ledger).toMatch(/AI-generated; no exclusivity or registrable copyright promised/);
  });
});
