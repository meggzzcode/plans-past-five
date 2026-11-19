// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { HTML_SECURITY_HEADERS, withSecurityHeaders } from "@/lib/security-headers";
import { verificationMeta } from "@/lib/verification";
import { track, cleanParams } from "@/lib/track";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { StarterKit } from "@/components/commerce/StarterKit";
import { collections } from "@/data/products";
import { collectionGuide } from "@/lib/collection-guide";
import { site } from "@/config/site";

afterEach(() => vi.restoreAllMocks());

describe("HTML security headers", () => {
  it("sets exactly the three headers on HTML and keeps status and body", async () => {
    const res = withSecurityHeaders(
      new Response("<p>hi</p>", {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8" },
      }),
    );
    expect(Object.keys(HTML_SECURITY_HEADERS).sort()).toEqual([
      "Permissions-Policy",
      "Referrer-Policy",
      "X-Content-Type-Options",
    ]);
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("permissions-policy")).toBe(
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    );
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    for (const h of ["content-security-policy", "strict-transport-security", "x-frame-options"])
      expect(res.headers.get(h)).toBeNull();
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("<p>hi</p>");
  });
  it("leaves non-HTML responses alone and survives immutable headers", async () => {
    const json = new Response("{}", { headers: { "content-type": "application/json" } });
    expect(withSecurityHeaders(json).headers.get("referrer-policy")).toBeNull();
    const xml = new Response("<urlset/>", { headers: { "content-type": "application/xml" } });
    expect(withSecurityHeaders(xml).headers.get("x-content-type-options")).toBe("nosniff");
    expect(withSecurityHeaders(xml).headers.get("referrer-policy")).toBeNull();
    const frozen = new Response("x", { headers: { "content-type": "text/html" } });
    Object.defineProperty(frozen.headers, "set", {
      value: () => {
        throw new TypeError("immutable");
      },
    });
    const out = withSecurityHeaders(frozen);
    expect(out.headers.get("x-content-type-options")).toBe("nosniff");
  });
});

describe("verification meta tags", () => {
  it("renders exactly the tags whose settings are filled in (none when all are empty)", () => {
    const i = site.integrations;
    const filled = [
      i.searchConsoleVerification,
      i.bingVerification,
      i.pinterestVerification,
    ].filter((v) => v.trim() !== "");
    expect(verificationMeta()).toHaveLength(filled.length);
  });
  it("renders each tag only when its field is non-empty", () => {
    expect(
      verificationMeta({
        searchConsoleVerification: "",
        bingVerification: "bing1",
        pinterestVerification: "",
      }),
    ).toEqual([{ name: "msvalidate.01", content: "bing1" }]);
    expect(
      verificationMeta({ searchConsoleVerification: "abc", pinterestVerification: "" }),
    ).toEqual([{ name: "google-site-verification", content: "abc" }]);
    expect(
      verificationMeta({ searchConsoleVerification: "", pinterestVerification: " xyz " }),
    ).toEqual([{ name: "p:domain_verify", content: "xyz" }]);
  });
});

describe("tracking calls", () => {
  it("never throws when gtag is absent or analytics is off", () => {
    delete (window as unknown as { gtag?: unknown }).gtag;
    expect(() => track("quiz_complete", { persona: "creative" })).not.toThrow();
    expect(() => track("planner_use", { when: "saturday", length: "full-day" })).not.toThrow();
  });
  it("allow-lists the new params and drops everything else", () => {
    expect(
      cleanParams({
        persona: "cozy",
        when: "friday",
        length: "evening",
        name: "Ada",
        email: "a@b.c",
      }),
    ).toEqual({ persona: "cozy", when: "friday", length: "evening" });
  });
});

describe("empty-catalog parity", () => {
  it("ShopMyHobby and StarterKit render nothing with an empty catalog", () => {
    expect(
      renderToStaticMarkup(createElement(ShopMyHobby, { hobby: "junk-journaling", catalog: [] })),
    ).toBe("");
    expect(
      renderToStaticMarkup(
        createElement(ShopMyHobby, { collection: "creative-girl", catalog: [] }),
      ),
    ).toBe("");
    expect(
      renderToStaticMarkup(createElement(StarterKit, { kit: "junk-journaling", catalog: [] })),
    ).toBe("");
  });
});

describe("collections as editorial pages", () => {
  it("has the eight requested collections", () => {
    expect(collections.map((c) => c.slug).sort()).toEqual(
      [
        "pottery-era",
        "creative-girl",
        "sporty-girl",
        "bookish-girl",
        "little-adventures",
        "girls-night-in",
        "journaling-era",
        "cozy-after-hours",
      ].sort(),
    );
  });
  it("every collection yields real guide content from existing records", () => {
    for (const c of collections) {
      const g = collectionGuide(c.slug);
      expect(g.hobbies.length, c.slug).toBeGreaterThan(0);
      expect(g.essentials.length, c.slug).toBeGreaterThan(0);
    }
  });
});
