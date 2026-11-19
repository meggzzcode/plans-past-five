import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Owner decision (2026-11-19): we only promote things we can monetise through Amazon. Published
// content and UI must not send readers to other retailers or affiliate programs. Sources (citations)
// are separate and allowed; Pinterest share, Google Maps search and our own domain are not retail.
const repo = path.resolve(__dirname, "../..");
const ALLOWED_HOST =
  /(^|\.)(amazon\.com|planspastfive\.com|pinterest\.com|google\.com|googletagmanager\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|schema\.org|w3\.org|netlify\.app|github\.com|pagescms\.org)$/i;

function urlsIn(text: string): string[] {
  return [...text.matchAll(/https?:\/\/[^\s"'`)<>\]\\]+/g)].map((m) => m[0]);
}
function host(u: string): string {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
}

describe("only Amazon is promoted", () => {
  it("published article bodies (not sources) link only to Amazon or our own domain", () => {
    const dir = path.join(repo, "content/articles");
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
      const a = JSON.parse(readFileSync(path.join(dir, f), "utf8"));
      if (a.status !== "published") continue;
      const { sources: _s, coworkChecks: _c, ...rest } = a;
      for (const u of urlsIn(JSON.stringify(rest))) {
        expect(host(u), `${f}: ${u}`).toMatch(ALLOWED_HOST);
      }
    }
  });
  it("route and component source never links to another retailer", () => {
    const walk = (d: string): string[] =>
      readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
      );
    const files = [
      ...walk(path.join(repo, "src/routes")),
      ...walk(path.join(repo, "src/components")),
    ].filter((f) => /\.(ts|tsx)$/.test(f));
    const retailers =
      /(etsy|walmart|target|michaels|joann|hobbylobby|ebay|shopify|temu|aliexpress|bestbuy|shareasale|impact\.com|awin|cj\.com|rakuten|skimlinks|redirectingat)/i;
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      for (const u of urlsIn(text)) expect(u, `${f}`).not.toMatch(retailers);
    }
  });
});
