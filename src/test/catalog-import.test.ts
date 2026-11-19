import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  COLUMNS,
  checkHeader,
  decodeCsvBuffer,
  importCsv,
  parseCsv,
} from "../../scripts/import-products.mjs";
import { validateCatalogProduct, verifiedCatalog, type KnownRefs } from "@/data/catalog";
import { generatedCatalog } from "@/data/catalog.generated";
import { hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";
import { kitSlotIndex } from "@/data/kits";

/**
 * Validates the CSV importer on realistic spreadsheet output. Nothing here writes
 * src/data/catalog.generated.ts: importCsv is pure. Every row below is an INVENTED fixture.
 */
const known: KnownRefs = {
  hobbies: hobbies.map((h) => h.slug),
  collections: collections.map((c) => c.slug),
  kits: kitSlotIndex(),
  articles: ["how-to-start-junk-journaling"],
};
const NOW = new Date("2026-11-19T12:00:00Z");

type Row = Record<string, string>;
const good: Row = {
  id: "wash-tape-set",
  name: "Pastel washi tape set",
  brand: "Imaginary Co",
  category: "Washi tape",
  description: "A set of washi tape rolls.",
  asin: "B0IMAGINA1",
  amazonUrl: "",
  manufacturerUrl: "",
  altRetailerUrl: "",
  specs: "Width:15 mm|Rolls:10",
  hobbies: "junk-journaling",
  articles: "how-to-start-junk-journaling",
  collections: "creative-girl",
  kitSlots: "junk-journaling/washi-tape",
  role: "affordable",
  isEssential: "TRUE",
  audience: "Beginners",
  whySelected: "Plenty of patterns for a small set.",
  limitations: "Colors vary|Adhesive is light",
  imageSource: "",
  imageRights: "none",
  researchSources: "https://example.com/a|https://example.com/b",
  lastVerified: "2026-11-01",
  availability: "available",
  affiliateNetwork: "",
  affiliateStatus: "not-activated",
  status: "verified",
};
const quote = (v: string) => (/[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv = (rows: Row[], opts: { eol?: string; bom?: boolean; cols?: string[] } = {}) => {
  const cols = opts.cols ?? COLUMNS;
  const eol = opts.eol ?? "\n";
  return (
    (opts.bom ? "﻿" : "") +
    [cols.join(","), ...rows.map((r) => cols.map((c) => quote(r[c] ?? "")).join(","))].join(eol) +
    eol
  );
};
const run = (rows: Row[], opts?: Parameters<typeof csv>[1]) =>
  importCsv(csv(rows, opts), known, NOW);
const withRow = (o: Row): Row => ({ ...good, ...o });
const second = (o: Row = {}): Row => withRow({ id: "second-item", asin: "B0IMAGINA2", ...o });

describe("shipped data", () => {
  it("every product in the committed generated file is verified and the file has no fixture rows", () => {
    expect(generatedCatalog.length).toBeGreaterThan(0);
    for (const p of generatedCatalog) expect(validateCatalogProduct(p), p.id).toEqual([]);
    for (const p of verifiedCatalog) {
      expect(p.status, p.id).toBe("verified");
      expect(p.amazonUrl, p.id).toBe(`https://www.amazon.com/dp/${p.asin}`);
      expect(p.amazonUrl, p.id).not.toMatch(/[?#]/);
      expect(p.researchSources.length, p.id).toBeGreaterThan(0);
      expect(p.lastVerified, p.id).toBeTruthy();
    }
    expect(verifiedCatalog.some((p) => p.status !== "verified")).toBe(false);
    const src = readFileSync(path.resolve(__dirname, "../data/catalog.generated.ts"), "utf8");
    expect(src).not.toMatch(/fixture|B0IMAGINA/i);
  });
  it("the template header matches the importer's columns and has no example rows enabled", () => {
    const text = readFileSync(
      path.resolve(__dirname, "../../docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv"),
      "utf8",
    );
    const r = importCsv(text, known, NOW);
    expect(r.errors).toEqual([]);
    expect(r.products).toEqual([]);
    expect(parseCsv(text)[0]).toEqual(COLUMNS);
  });
});

describe("a clean CSV", () => {
  it("imports, derives the ordinary Amazon URL and parses lists, specs, slots and booleans", () => {
    const r = run([good]);
    expect(r.errors).toEqual([]);
    const p = r.products[0]!;
    expect(p.amazonUrl).toBe("https://www.amazon.com/dp/B0IMAGINA1");
    expect(p.specs).toEqual([
      { label: "Width", value: "15 mm" },
      { label: "Rolls", value: "10" },
    ]);
    expect(p.kitSlots).toEqual([{ kit: "junk-journaling", slot: "washi-tape" }]);
    expect(p.limitations).toEqual(["Colors vary", "Adhesive is light"]);
    expect(p.isEssential).toBe(true);
    expect(p).not.toHaveProperty("manufacturerUrl");
  });
  it("accepts header names in any letter case and a spaced header", () => {
    const cols = COLUMNS.map((c, i) => (i === 0 ? "ID" : i === 5 ? " ASIN " : c.toUpperCase()));
    const text = [cols.join(","), COLUMNS.map((c) => quote(good[c] ?? "")).join(",")].join("\n");
    expect(importCsv(text, known, NOW).errors).toEqual([]);
  });
  it("lets optional columns be left out of the header entirely", () => {
    const cols = COLUMNS.filter(
      (c) =>
        ![
          "manufacturerUrl",
          "altRetailerUrl",
          "imageSource",
          "imageRights",
          "affiliateNetwork",
        ].includes(c),
    );
    expect(run([good], { cols }).errors).toEqual([]);
  });
});

describe("spreadsheet export quirks", () => {
  it("handles a BOM, CRLF endings and a Windows-style final newline", () => {
    const r = run([good, second()], { bom: true, eol: "\r\n" });
    expect(r.errors).toEqual([]);
    expect(r.products.map((p) => p.id)).toEqual(["wash-tape-set", "second-item"]);
  });
  it("does not let a BOM corrupt the first header name", () => {
    expect(parseCsv("﻿id,name\nx,y\n")[0]).toEqual(["id", "name"]);
  });
  it("keeps commas, doubled quotes and newlines inside quoted cells", () => {
    const r = run([
      good,
      second({
        description: 'A set, with "quotes", commas\r\nand a line break.',
        whySelected: "Pipes | in free text are kept; commas, too.",
      }),
    ]);
    expect(r.errors).toEqual([]);
    expect(r.products[1]!.description).toBe('A set, with "quotes", commas\nand a line break.');
    expect(r.products[1]!.whySelected).toBe("Pipes | in free text are kept; commas, too.");
  });
  it("splits pipes only in list columns", () => {
    const r = run([second({ limitations: "One|Two|Three" })]);
    expect(r.products[0]!.limitations).toEqual(["One", "Two", "Three"]);
  });
  it("ignores trailing empty rows, comma-only rows and trailing empty columns", () => {
    const base = csv([good]).trimEnd();
    const text = base.replace("\n", ",,,\n") + "\n,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\n,,,\n \n";
    const r = importCsv(text, known, NOW);
    expect(r.errors).toEqual([]);
    expect(r.products).toHaveLength(1);
  });
  it("ignores # comment lines", () => {
    const r = importCsv("# a note\n" + csv([good]) + "# another\n", known, NOW);
    expect(r.errors).toEqual([]);
  });
  it("decodes Excel's UTF-16 'Unicode Text' and refuses .xlsx with a clear message", () => {
    const utf16 = Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(csv([good]), "utf16le")]);
    expect(importCsv(decodeCsvBuffer(utf16), known, NOW).errors).toEqual([]);
    expect(() => decodeCsvBuffer(Buffer.from([0x50, 0x4b, 3, 4]))).toThrow(/\.xlsx/);
  });
  it("explains semicolon and tab exports instead of failing every field", () => {
    const semi = importCsv(COLUMNS.join(";") + "\n" + COLUMNS.map(() => "x").join(";"), known, NOW);
    expect(semi.errors).toHaveLength(1);
    expect(semi.errors[0]).toMatch(/not comma-separated/);
    expect(checkHeader(["a\tb"]).errors[0]).toMatch(/not comma-separated/);
  });
  it("reports an unclosed quote", () => {
    const r = importCsv(csv([good]).replace("Beginners", '"Beginners'), known, NOW);
    expect(r.errors.join("\n")).toMatch(/never closed/);
  });
  it("flags a row with more cells than the header (an unquoted comma)", () => {
    const text = csv([good]).replace("A set of washi tape rolls.", "A set, of washi tape rolls.");
    const r = importCsv(text, known, NOW);
    expect(r.errors.join("\n")).toMatch(/line 2: has \d+ cells but the header has \d+ columns/);
  });
  it("flags spreadsheet-mangled dates, ASINs and invisible characters", () => {
    const r = run([
      withRow({ lastVerified: "11/5/2026" }),
      second({ asin: "123456789" }),
      withRow({ id: "third-item", asin: "B0IMAGINA​3" }),
    ]);
    const m = r.errors.join("\n");
    expect(m).toMatch(/lastVerified "11\/5\/2026" was reformatted/);
    expect(m).toMatch(/dropped a leading zero/);
    expect(m).toMatch(/invisible or non-ASCII/);
  });
});

describe("rejections carry the line number and a fixable message", () => {
  const msg = (rows: Row[]) => run(rows).errors.join("\n");
  it("bad and placeholder ASINs", () => {
    expect(msg([withRow({ asin: "B0SHORT" })])).toMatch(
      /line 2: .*invalid or placeholder ASIN "B0SHORT"/,
    );
    expect(msg([withRow({ asin: "b0imagina1" })])).toMatch(/invalid or placeholder ASIN/);
    expect(msg([withRow({ asin: "TESTASIN01" })])).toMatch(/placeholder/);
    expect(msg([withRow({ asin: "B0FIXTUR001" })])).toMatch(/ASIN/);
    expect(msg([withRow({ asin: "B0FIXTUR01" })])).toMatch(/looks like a placeholder/);
  });
  it("tracking parameters in any URL column", () => {
    expect(msg([withRow({ amazonUrl: "https://www.amazon.com/dp/B0IMAGINA1?tag=me-20" })])).toMatch(
      /tracking parameters \(tag\)/,
    );
    expect(
      msg([withRow({ amazonUrl: "https://www.amazon.com/dp/B0IMAGINA1/ref=sr_1_1?utm_source=x" })]),
    ).toMatch(/tracking parameters/);
    expect(msg([withRow({ researchSources: "https://example.com/a?utm_campaign=x" })])).toMatch(
      /researchSources entry .* tracking/,
    );
    expect(msg([withRow({ manufacturerUrl: "https://example.com/p?ref=aff" })])).toMatch(
      /manufacturerUrl has tracking/,
    );
  });
  it("a hand-typed amazonUrl that does not match the ASIN", () => {
    expect(msg([withRow({ amazonUrl: "https://www.amazon.com/dp/B0IMAGINA9" })])).toMatch(
      /amazonUrl must equal https:\/\/www.amazon.com\/dp\/B0IMAGINA1/,
    );
    expect(msg([withRow({ amazonUrl: "https://amzn.to/abc" })])).toMatch(/amazonUrl must equal/);
  });
  it("price-like, rating-like and review-count columns, even when empty", () => {
    for (const col of ["price", "Price (USD)", "rating", "reviewCount", "discount", "stock"]) {
      const r = importCsv(csv([good]).replace("\n", `,${col}\n`).replace(/\n$/, ",\n"), known, NOW);
      expect(r.errors.join("\n"), col).toMatch(
        new RegExp(`column "${col.replace(/[()]/g, ".")}" is not allowed`),
      );
    }
  });
  it("price claims written into free text", () => {
    expect(msg([withRow({ description: "Only $9 today" })])).toMatch(/price, discount or scarcity/);
    expect(msg([withRow({ whySelected: "Limited-time deal" })])).toMatch(/scarcity/);
  });
  it("unknown columns, missing required columns and duplicate columns", () => {
    expect(
      importCsv(
        csv([good]).replace("\n", ",notes\n").replace(/\n$/, ",hi\n"),
        known,
        NOW,
      ).errors.join("\n"),
    ).toMatch(/unknown column "notes"/);
    const cols = COLUMNS.filter((c) => c !== "whySelected" && c !== "asin");
    expect(run([good], { cols }).errors.join("\n")).toMatch(
      /missing required column\(s\): asin, whySelected/,
    );
    expect(
      importCsv(csv([good], { cols: [...COLUMNS, "id"] }), known, NOW).errors.join("\n"),
    ).toMatch(/column "id" appears twice/);
  });
  it("future dates, impossible dates and missing sources", () => {
    expect(msg([withRow({ lastVerified: "2027-03-01" })])).toMatch(/lastVerified is in the future/);
    expect(msg([withRow({ lastVerified: "2026-02-31" })])).toMatch(/real YYYY-MM-DD/);
    expect(msg([withRow({ lastVerified: "" })])).toMatch(/lastVerified is required/);
    expect(msg([withRow({ researchSources: "" })])).toMatch(/researchSources needs at least one/);
    expect(msg([withRow({ researchSources: "http://example.com/a" })])).toMatch(/must be https/);
    expect(msg([withRow({ researchSources: "not a url" })])).toMatch(/must be https/);
  });
  it("duplicate ids and duplicate ASINs, with the offending line", () => {
    const dupId = msg([good, second({ id: good["id"]! })]);
    expect(dupId).toMatch(/line 3: id "wash-tape-set" is already used on line 2/);
    const dupAsin = msg([good, second({ asin: good["asin"]! })]);
    expect(dupAsin).toMatch(/line 3: ASIN B0IMAGINA1 is already used on line 2/);
  });
  it("unknown hobby, collection, kit and kit slot", () => {
    const m = msg([
      withRow({
        hobbies: "junk-jouralling",
        collections: "creative-gal",
        kitSlots: "junk-journaling/glitter|nope/x",
      }),
    ]);
    expect(m).toMatch(/unknown hobby "junk-jouralling"/);
    expect(m).toMatch(/unknown collection "creative-gal"/);
    expect(m).toMatch(/kit "junk-journaling" has no slot "glitter"/);
    expect(m).toMatch(/unknown kit "nope"/);
  });
  it("only warns (does not block) on an article that does not exist yet", () => {
    const r = run([withRow({ articles: "an-article-not-written-yet" })]);
    expect(r.errors).toEqual([]);
    expect(r.warnings.join("\n")).toMatch(
      /article "an-article-not-written-yet" does not exist yet/,
    );
  });
  it("malformed specs and kitSlots entries", () => {
    const m = msg([withRow({ specs: "Width 15 mm", kitSlots: "washi-tape" })]);
    expect(m).toMatch(/specs entry "Width 15 mm" needs the form label:value/);
    expect(m).toMatch(/kitSlots entry "washi-tape" needs the form kit\/slot/);
  });
  it("role, isEssential, status and enumerations", () => {
    const m = msg([
      withRow({
        role: "bestseller",
        isEssential: "yes",
        status: "approved",
        availability: "in stock",
      }),
    ]);
    expect(m).toMatch(/role must be one of/);
    expect(m).toMatch(/isEssential must be true or false/);
    expect(m).toMatch(/status must be candidate or verified/);
    expect(m).toMatch(/availability must be/);
    expect(msg([withRow({ role: "nice-to-have", isEssential: "TRUE" })])).toMatch(
      /isEssential cannot be true/,
    );
  });
  it("affiliateUrl while not activated, and empty limitations", () => {
    expect(
      msg(
        [withRow({ affiliateStatus: "not-activated" }) as Row].map((r) => ({
          ...r,
          limitations: "",
        })),
      ),
    ).toMatch(/limitations needs at least one/);
  });
  it("example, fixture and test ids are refused so invented rows cannot ship", () => {
    for (const id of [
      "example-do-not-import",
      "fixture-washi",
      "test-fixture-x",
      "demo-1",
      "sample-1",
    ])
      expect(msg([withRow({ id })]), id).toMatch(/marks an example or test row/);
  });
  it("reports line numbers that match the file, past comments and multi-line cells", () => {
    const text =
      "# note\n" +
      COLUMNS.join(",") +
      "\n" +
      COLUMNS.map((c) => quote(c === "description" ? "two\nlines" : (good[c] ?? ""))).join(",") +
      "\n" +
      COLUMNS.map((c) =>
        quote(c === "asin" ? "BAD" : c === "id" ? "other-item" : (good[c] ?? "")),
      ).join(",") +
      "\n";
    const r = importCsv(text, known, NOW);
    expect(r.errors.join("\n")).toMatch(/line 5: other-item: invalid or placeholder ASIN "BAD"/);
  });
  it("reports every problem at once, never just the first", () => {
    const r = run([
      withRow({ asin: "bad", lastVerified: "2027-01-01" }),
      second({ researchSources: "" }),
    ]);
    expect(r.errors.length).toBeGreaterThanOrEqual(3);
  });
});
