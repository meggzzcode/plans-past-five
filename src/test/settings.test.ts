import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs helper without type declarations
import * as lib from "../../scripts/content-lib.mjs";
import { site } from "@/config/site";
import { affiliate } from "@/config/affiliate";
import { snapshotAffiliate } from "./affiliate-state";

const repo = path.resolve(__dirname, "../..");
const real = JSON.parse(readFileSync(path.join(repo, "content/settings.json"), "utf8"));
const check = (patch: Record<string, unknown>) =>
  (lib.validateSettings({ ...real, ...patch }).problems as string[]).join("\n");

describe("owner settings (content/settings.json)", () => {
  it("the shipped file is valid", () => {
    expect(lib.validateSettings(real).problems).toEqual([]);
  });
  it("site.ts and the affiliate registry follow the file, whatever the values are", () => {
    expect(site.name).toBe(real.siteName.trim());
    expect(site.tagline).toBe(real.tagline.trim());
    expect(site.contactEmail).toBe(real.contactEmail.trim());
    expect(site.analytics.ga4MeasurementId).toBe(real.ga4MeasurementId.trim());
    expect(site.integrations.searchConsoleVerification).toBe(real.searchConsoleVerification.trim());
    expect(site.integrations.bingVerification).toBe(real.bingVerification.trim());
    expect(site.integrations.pinterestVerification).toBe(real.pinterestVerification.trim());
    expect(site.url).toBe(real.siteUrl.trim().replace(/\/+$/, ""));
    const on =
      real.amazonTrackingEnabled === true && real.amazonTrackingId && real.amazonLastVerified;
    // Tracking is live only when the owner switched it on (with an id and a date); otherwise OFF.
    // (The suite may force a state through AFFILIATE_TEST_STATE; that is applied after this import.)
    if (!process.env["AFFILIATE_TEST_STATE"]) {
      expect(snapshotAffiliate().active).toBe(Boolean(on));
      expect(snapshotAffiliate().websiteTrackingId).toBe(on ? real.amazonTrackingId.trim() : "");
      expect(affiliate.marketplace).toBe(`https://www.${real.amazonMarketplace}`);
    }
  });
  it("accepts a tag with the switch off (site code only goes live with switch, id and date)", () => {
    expect(check({ amazonTrackingId: "mystore-20", amazonTrackingEnabled: false })).toBe("");
  });
  it("explains a bad email in plain English", () => {
    expect(check({ contactEmail: "hello@" })).toMatch(
      /contactEmail": is not an email address\. Write it like hello@yourdomain\.com/,
    );
    expect(check({ contactEmail: "" })).toBe("");
  });
  it("explains a malformed GA4 id and accepts a valid one or empty", () => {
    for (const bad of ["UA-12345-1", "g-abc123xyz9", "G-", "GTM-ABCDEFG", "G-ABC123XYZ9');x//"])
      expect(check({ ga4MeasurementId: bad }), bad).toMatch(
        /not a Google Analytics 4 measurement ID.*G-ABC123XYZ9/,
      );
    expect(check({ ga4MeasurementId: "G-ABC123XYZ9" })).toBe("");
    expect(check({ ga4MeasurementId: "" })).toBe("");
  });
  it("explains a bad Amazon tag and requires id and date when switched on", () => {
    expect(check({ amazonTrackingId: "my store" })).toMatch(/not an Amazon Associates tracking ID/);
    expect(check({ amazonTrackingEnabled: true, amazonTrackingId: "" })).toMatch(
      /switched on but there is no tracking ID/,
    );
    expect(
      check({
        amazonTrackingEnabled: true,
        amazonTrackingId: "mystore-20",
        amazonLastVerified: "",
      }),
    ).toMatch(/amazonLastVerified/);
    expect(
      check({
        amazonTrackingEnabled: true,
        amazonTrackingId: "mystore-20",
        amazonLastVerified: "2026-11-19",
      }),
    ).toBe("");
  });
  it("supports only the Amazon.com (United States) marketplace for now", () => {
    expect(check({ amazonMarketplace: "amazon.co.uk" })).toMatch(/must be "amazon.com"/);
  });
  it("accepts only the bare verification code, not a pasted meta tag", () => {
    expect(
      check({ searchConsoleVerification: '<meta name="google-site-verification" content="abc">' }),
    ).toMatch(/paste only the code/);
    expect(check({ pinterestVerification: "abcDEF1234567890" })).toBe("");
  });
  it("rejects an empty site name, a site address with a path, and unknown keys", () => {
    expect(check({ siteName: "  " })).toMatch(/site name must not be empty/);
    expect(check({ siteUrl: "http://example.com" })).toMatch(/starting with https/);
    expect(check({ siteUrl: "https://example.com/blog" })).toMatch(/nothing after the domain/);
    expect(check({ siteUrl: "https://example.com/" })).toBe("");
    expect(check({ apiKey: "sk-123" })).toMatch(/unknown setting/);
  });
  it("keeps the manifest name and the robots sitemap line in step with the settings", () => {
    const m = JSON.parse(readFileSync(path.join(repo, "public/manifest.webmanifest"), "utf8"));
    expect(m.name).toBe(site.name);
    expect(m.short_name).toBe(site.name);
    expect(readFileSync(path.join(repo, "public/robots.txt"), "utf8")).toContain(
      `Sitemap: ${site.url}/sitemap.xml`,
    );
  });
});
