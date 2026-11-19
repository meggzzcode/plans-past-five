import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { site } from "@/config/site";
import { Route } from "@/routes/__root";

const root = path.resolve(__dirname, "../..");
const manifest = JSON.parse(
  readFileSync(path.join(root, "public/manifest.webmanifest"), "utf8"),
) as Record<string, unknown> & { icons: { src: string; sizes: string; type: string }[] };
const palette = JSON.parse(
  readFileSync(path.join(root, "design/brand/palette/palette.json"), "utf8"),
) as {
  colors: { token: string; hex: string }[];
};
const hex = (t: string) => palette.colors.find((c) => c.token === t)!.hex.toLowerCase();

describe("web app manifest", () => {
  it("has the fields installability needs, from site settings and the brand palette", () => {
    expect(manifest["name"]).toBe(site.name);
    expect(manifest["short_name"]).toBe(site.name);
    expect(manifest["description"]).toBe(site.description);
    expect(manifest["start_url"]).toBe("/");
    expect(manifest["display"]).toBe("standalone");
    expect(String(manifest["theme_color"]).toLowerCase()).toBe(hex("cherry"));
    expect(String(manifest["background_color"]).toLowerCase()).toBe(hex("cream"));
    expect(manifest["prefer_related_applications"]).toBeUndefined();
  });
  it("lists real 192 and 512 PNG icons", () => {
    for (const size of [192, 512]) {
      const icon = manifest.icons.find((i) => i.sizes === `${size}x${size}`)!;
      expect(icon.type).toBe("image/png");
      const file = path.join(root, "public", icon.src);
      expect(existsSync(file), icon.src).toBe(true);
      const b = readFileSync(file);
      expect([b.readUInt32BE(16), b.readUInt32BE(20)]).toEqual([size, size]);
    }
    for (const i of manifest.icons)
      expect(existsSync(path.join(root, "public", i.src)), i.src).toBe(true);
  });
  it("shortcuts point at real routes", () => {
    const routes = readdirSync(path.join(root, "src/routes")).join(" ");
    for (const s of manifest["shortcuts"] as { url: string }[]) {
      const f = s.url.replace(/^\//, "").replace(/\//g, ".");
      expect(routes, s.url).toContain(f);
    }
  });
  it("the root head links the manifest and touch icon, and keeps theme-color from the palette", () => {
    const head = Route.options.head!({} as never) as {
      links: { rel: string; href?: string }[];
      meta: { name?: string; content?: string }[];
    };
    expect(head.links).toContainEqual({ rel: "manifest", href: "/manifest.webmanifest" });
    const touch = head.links.find((l) => l.rel === "apple-touch-icon")!;
    expect(existsSync(path.join(root, "public", touch.href!))).toBe(true);
    expect(head.meta.find((m) => m.name === "theme-color")!.content!.toLowerCase()).toBe(
      hex("cherry"),
    );
  });
  it("adds no service worker and no new Vite plugin", () => {
    expect(existsSync(path.join(root, "public/sw.js"))).toBe(false);
    expect(existsSync(path.join(root, "public/service-worker.js"))).toBe(false);
    const pkg = readFileSync(path.join(root, "package.json"), "utf8");
    expect(pkg).not.toMatch(/vite-plugin-pwa|workbox/);
    const src = readFileSync(path.join(root, "src/routes/__root.tsx"), "utf8");
    expect(src).not.toMatch(/serviceWorker/);
  });
});
