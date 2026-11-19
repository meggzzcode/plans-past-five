import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ga4Scripts, validGa4Id } from "@/lib/analytics";
import { site } from "@/config/site";

describe("GA4 snippet", () => {
  it("follows the owner setting: no third-party script when empty, one loader for that id when set", () => {
    const id = site.analytics.ga4MeasurementId;
    if (id === "") {
      expect(ga4Scripts()).toEqual([]);
      expect(validGa4Id()).toBe("");
    } else {
      expect(validGa4Id()).toBe(id);
      expect(ga4Scripts()[0]?.src).toContain(`id=${id}`);
    }
  });
  it("renders the async gtag loader and config for a valid ID", () => {
    const s = ga4Scripts("G-ABC123XYZ9");
    expect(s[0]).toEqual({
      src: "https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ9",
      async: true,
    });
    expect(s[1]?.children).toContain("gtag('config','G-ABC123XYZ9')");
  });
  it("rejects invalid IDs, including injection attempts", () => {
    for (const bad of [
      "UA-12345-1",
      "g-abc123xyz9",
      "G-",
      "G-SHORT",
      "G-ABC123XYZ9');alert(1);//",
      "https://x.com/a.js",
      "GTM-ABCDEFG",
    ])
      expect(ga4Scripts(bad), bad).toEqual([]);
  });
});

describe("GA4 snippet behaviour", () => {
  const snippet = () => ga4Scripts("G-TEST123456")[1]!.children!;
  const runIn = (win: Record<string, unknown>, times: number) => {
    for (let i = 0; i < times; i++) new Function("window", `with(window){${snippet()}}`)(win);
  };

  it("defines window.gtag and sends js + config exactly once, even if re-run on navigation", () => {
    const win: Record<string, unknown> = {};
    runIn(win, 3);
    const dl = win["dataLayer"] as ArrayLike<unknown>[];
    expect(typeof win["gtag"]).toBe("function");
    expect(dl.map((a) => a[0])).toEqual(["js", "config"]);
    expect(dl[1]![1]).toBe("G-TEST123456");
  });

  it("puts no page data or user data in the snippet, and one loader plus one inline script", () => {
    const s = ga4Scripts("G-TEST123456");
    expect(s).toHaveLength(2);
    expect(s.filter((x) => x.src)).toHaveLength(1);
    expect(snippet()).not.toMatch(/localStorage|document\.|location|cookie|email/i);
  });

  it("trims whitespace and rejects non-strings safely", () => {
    expect(validGa4Id("  G-TEST123456 ")).toBe("G-TEST123456");
    expect(validGa4Id(undefined as never)).toBe("");
    expect(validGa4Id(null as never)).toBe("");
    expect(validGa4Id("G-ABC123XYZ9\n<script>")).toBe("");
  });
});

describe("one analytics setting", () => {
  it("integrations.googleAnalyticsId follows analytics.ga4MeasurementId", () => {
    expect(site.integrations.googleAnalyticsId).toBe(site.analytics.ga4MeasurementId);
  });

  it("no source file assigns googleAnalyticsId or hard-codes a GA ID", () => {
    const files: string[] = [];
    const walk = (d: string) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(ts|tsx)$/.test(f) && !p.includes(`${join("src", "test")}`)) files.push(p);
      }
    };
    walk(join(process.cwd(), "src"));
    for (const f of files) {
      const t = readFileSync(f, "utf8");
      if (!f.endsWith(join("config", "site.ts")))
        expect(t, f).not.toMatch(/googleAnalyticsId\s*[:=]/);
      expect(t, f).not.toMatch(/["'`]G-[A-Z0-9]{8,12}["'`]/);
    }
  });

  it("the root head and privacy page both use the validated loader", () => {
    const root = readFileSync(join(process.cwd(), "src/routes/__root.tsx"), "utf8");
    const priv = readFileSync(join(process.cwd(), "src/routes/privacy.tsx"), "utf8");
    expect(root).toContain("...ga4Scripts()");
    expect(priv).toContain("validGa4Id()");
    expect(priv).toMatch(/uses Google Analytics/);
    expect(priv).toMatch(/do not set analytics cookies/);
  });
});
