import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { printables } from "@/data/printables";
import { digitalProducts } from "@/data/digital-products";

const root = path.resolve(__dirname, "../..");
const pub = (p: string) => path.join(root, "public", p);
const pdfPages = (file: string) =>
  (fs.readFileSync(file, "latin1").match(/\/Type\s*\/Page(?![a-zA-Z])/g) || []).length;

describe("free printables", () => {
  it("has six printables with unique slugs", () => {
    expect(printables).toHaveLength(6);
    expect(new Set(printables.map((p) => p.slug)).size).toBe(6);
  });

  for (const p of printables) {
    it(`${p.slug}: PDF exists, is a US Letter PDF with the stated page count`, () => {
      const file = pub(p.pdf);
      expect(fs.existsSync(file)).toBe(true);
      const buf = fs.readFileSync(file);
      expect(buf.subarray(0, 5).toString()).toBe("%PDF-");
      expect(buf.length).toBeGreaterThan(20_000);
      expect(pdfPages(file)).toBe(p.pageCount);
      expect(fs.readFileSync(file, "latin1")).toMatch(
        /\/MediaBox\s*\[\s*0\s+0\s+612(\.0+)?\s+792(\.0+)?\s*\]/,
      );
      expect(p.pages).toContain(`${p.pageCount} pages`);
    });

    it(`${p.slug}: has preview images and an editable source`, () => {
      expect(p.previews.length).toBeGreaterThan(0);
      for (const img of p.previews) {
        expect(fs.existsSync(pub(img)), img).toBe(true);
        expect(fs.readFileSync(pub(img)).subarray(1, 4).toString()).toBe("PNG");
      }
    });
  }

  it("has an HTML source for every printable", () => {
    const sources = fs
      .readdirSync(path.join(root, "design/printables"))
      .filter((f) => f.endsWith(".html"));
    expect(sources.length).toBeGreaterThanOrEqual(printables.length);
  });
});

describe("premium kits", () => {
  for (const k of digitalProducts) {
    it(`${k.id}: package, files, previews and terms exist; not for sale; price is only a recommendation`, () => {
      expect(k.status).toBe("prepared-not-for-sale");
      expect(k.termsStatus).toBe("needs-owner-review");
      expect(k.priceRecommendation.isLivePrice).toBe(false);
      expect(fs.existsSync(path.join(root, k.packagePath))).toBe(true);
      expect(fs.existsSync(path.join(root, k.coverImage))).toBe(true);
      expect(fs.existsSync(path.join(root, k.termsPath))).toBe(true);
      for (const img of k.previewImages)
        expect(fs.existsSync(path.join(root, img)), img).toBe(true);
      for (const f of k.files) {
        const file = path.join(root, "design/kits", k.id, "dist", f.file);
        expect(fs.existsSync(file), f.file).toBe(true);
        expect(pdfPages(file), f.file).toBe(f.pages);
      }
    });
  }

  it("premium files are not inside public/", () => {
    const walk = (dir: string): string[] =>
      fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
        );
    const names = new Set(digitalProducts.flatMap((k) => k.files.map((f) => f.file)));
    const premiumZips = digitalProducts.map((k) => path.basename(k.packagePath));
    const bad = walk(path.join(root, "public")).filter((f) => {
      const b = path.basename(f);
      const free = printables.some((p) => pub(p.pdf) === f);
      return (
        !free &&
        (premiumZips.includes(b) || (b.endsWith(".pdf") && names.has(b)) || b.endsWith(".zip"))
      );
    });
    expect(bad).toEqual([]);
  });

  it("no public route, component, data file or sitemap references premium kit files", () => {
    const walk = (dir: string): string[] =>
      fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
        );
    const src = walk(path.join(root, "src")).filter(
      (f) =>
        /\.(ts|tsx)$/.test(f) &&
        !f.includes("routeTree.gen") &&
        !f.includes(`${path.sep}test${path.sep}`) &&
        !f.endsWith("digital-products.ts"),
    );
    const needles = [
      "digital-products",
      "design/kits",
      "hobby-era-kit/dist",
      "weekend-edit-kit/dist",
      "plans-past-five-hobby-era-kit",
      "plans-past-five-weekend-edit-girls-night-kit",
      ".zip",
      ...digitalProducts.flatMap((k) => k.files.map((f) => f.file)),
    ];
    const hits: string[] = [];
    for (const f of src) {
      const text = fs.readFileSync(f, "utf8");
      for (const n of needles) if (text.includes(n)) hits.push(`${path.relative(root, f)} -> ${n}`);
    }
    expect(hits).toEqual([]);
  });
});
