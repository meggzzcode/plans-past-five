import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "../..");
const dir = path.join(root, "docs/buyer");
const files = readdirSync(dir).filter((f) => f.endsWith(".md"));

describe("buyer docs", () => {
  it("have no internal task jargon", () => {
    for (const f of files) {
      const t = readFileSync(path.join(dir, f), "utf8");
      expect(t, f).not.toMatch(/PENDING COWORK/);
      expect(t, f).not.toMatch(/\bCowork( task)? C\d+\b/);
    }
  });
  it("START-HERE links only to files that exist", () => {
    const t = readFileSync(path.join(dir, "START-HERE.md"), "utf8");
    for (const m of t.matchAll(/`(docs\/[A-Za-z0-9_\-./]+\.md)`/g)) {
      expect(existsSync(path.join(root, m[1]!)), m[1]).toBe(true);
    }
  });
  it("states the Associates statement and the Netlify cap", () => {
    expect(readFileSync(path.join(dir, "AMAZON-ASSOCIATES-PATH.md"), "utf8")).toMatch(
      /As an Amazon Associate I earn from qualifying purchases\./,
    );
    expect(readFileSync(path.join(dir, "NETLIFY-CREDITS-AND-RELEASES.md"), "utf8")).toMatch(
      /300 credits per month[\s\S]*15 credits per production deploy[\s\S]*20 credits per GB/,
    );
  });
});
