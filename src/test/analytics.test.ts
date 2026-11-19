import { describe, expect, it } from "vitest";
import { ga4Scripts, validGa4Id } from "@/lib/analytics";
import { site } from "@/config/site";

describe("GA4 snippet", () => {
  it("is empty by default: no third-party script", () => {
    expect(site.analytics.ga4MeasurementId).toBe("");
    expect(ga4Scripts()).toEqual([]);
    expect(validGa4Id()).toBe("");
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
