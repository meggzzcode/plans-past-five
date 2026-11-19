import { afterAll, describe, expect, it } from "vitest";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import path from "node:path";
import {
  COLUMNS,
  checkHeader,
  decodeCsvBuffer,
  importCsv,
  parseCsv,
} from "../../scripts/import-products.mjs";
import {
  filterVerified,
  validateCatalogProduct,
  verifiedCatalog,
  type KnownRefs,
} from "@/data/catalog";
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
  it("the template header is the importer's columns, has no enabled rows, and its example row parses", () => {
    const text = readFileSync(
      path.resolve(__dirname, "../../docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv"),
      "utf8",
    );
    const r = importCsv(text, known, NOW);
    expect(r.errors).toEqual([]);
    expect(r.products).toEqual([]);
    expect(parseCsv(text)[0]).toEqual(COLUMNS);
    // The commented example row has one value per column and is refused only for its example- id.
    const example = text.split("\n").find((l) => l.startsWith("# FAKE EXAMPLE ROW"))!;
    const row = example.replace(/^# FAKE EXAMPLE ROW[^:]*: /, "");
    const e = importCsv(COLUMNS.join(",") + "\n" + row, known, NOW);
    expect(parseCsv(row)[0]).toHaveLength(COLUMNS.length);
    expect(e.errors.join("\n")).toMatch(/marks an example or test row/);
    expect(e.errors).toHaveLength(1);
  });
  it("the Cowork verification queue uses the same schema; only intentionally blank fields fail", () => {
    const text = readFileSync(
      path.resolve(__dirname, "../../docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv"),
      "utf8",
    );
    expect(parseCsv(text)[0]).toEqual(COLUMNS);
    const rows = parseCsv(text).slice(1);
    const live = rows.filter((r) => r[COLUMNS.indexOf("status")] === "verified");
    expect(live.length).toBe(verifiedCatalog.length);
    const r = importCsv(text, known, new Date("2026-11-19T12:00:00Z"));
    // Every error is a blank asin, lastVerified or researchSources on a status-candidate kit row.
    for (const m of r.errors)
      expect(m, m).toMatch(
        /invalid or placeholder ASIN ""|lastVerified is required|researchSources needs at least one/,
      );
    const verifiedIds = new Set(live.map((x) => x[0]));
    for (const m of r.errors)
      expect(verifiedIds.has(m.replace(/^line \d+: ([^:]+):.*/, "$1")), m).toBe(false);
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
    const text = csv([{ ...good, notes: "n" }]).replace(
      "A set of washi tape rolls.",
      "A set, of washi tape rolls.",
    );
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
        csv([good]).replace("\n", ",memo\n").replace(/\n$/, ",hi\n"),
        known,
        NOW,
      ).errors.join("\n"),
    ).toMatch(/unknown column "memo"/);
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

describe("importer safety (CLI against temp copies)", () => {
  const repo = path.resolve(__dirname, "../..");
  const script = path.join(repo, "scripts/import-products.mjs");
  const realProducts = path.join(repo, "content/products");
  const snapshot = (d: string) =>
    readdirSync(d)
      .sort()
      .map((f) => `${f}\n${readFileSync(path.join(d, f), "utf8")}`)
      .join("\n");
  const hash = (d: string) => createHash("sha256").update(snapshot(d)).digest("hex");
  const realBefore = hash(realProducts);
  const dirs: string[] = [];
  const workdir = () => {
    const d = mkdtempSync(path.join(tmpdir(), "import-"));
    dirs.push(d);
    // The "current products": a copy of the real folder, so no-overwrite behaviour is realistic.
    cpSync(realProducts, path.join(d, "products"), { recursive: true });
    return d;
  };
  afterAll(() => {
    dirs.forEach((d) => rmSync(d, { recursive: true, force: true }));
    // Nothing in this block may ever touch the real product files.
    expect(hash(realProducts)).toBe(realBefore);
  });
  const cli = (dir: string, args: string[]) => {
    const r = spawnSync("bun", [script, ...args, "--out", path.join(dir, "products")], {
      cwd: dir,
      encoding: "utf8",
    });
    return { code: r.status, out: `${r.stdout}${r.stderr}` };
  };
  const put = (dir: string, text: string, name = "in.csv") => {
    const f = path.join(dir, name);
    writeFileSync(f, text);
    return f;
  };
  const current = (dir: string) => snapshot(path.join(dir, "products"));
  /** A run that must fail and leave the current catalog byte-for-byte unchanged. */
  const refuses = (rows: Row[] | string, pattern: RegExp, extra: string[] = []) => {
    const dir = workdir();
    const before = current(dir);
    const f = put(dir, typeof rows === "string" ? rows : csv(rows));
    const r = cli(dir, [f, ...extra]);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(pattern);
    expect(r.out).toMatch(/Nothing was written|NOT overwritten|catalog was NOT/);
    expect(current(dir)).toBe(before);
    expect(readdirSync(path.join(dir, "products")).some((n) => n.includes(".tmp"))).toBe(false);
    return r.out;
  };
  const NEW = (o: Row = {}): Row => withRow({ lastVerified: "2026-01-02", ...o });

  it("no file: refuses to write and says what to run", () => {
    const dir = workdir();
    const before = current(dir);
    const r = cli(dir, []);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/no CSV file given/);
    expect(current(dir)).toBe(before);
  });
  it("a missing file path is refused", () => {
    const dir = workdir();
    const before = current(dir);
    const r = cli(dir, [path.join(dir, "nope.csv")]);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/file not found/);
    expect(current(dir)).toBe(before);
  });
  it("--help prints usage, documents --check and --update, and writes nothing", () => {
    const dir = workdir();
    const before = current(dir);
    const r = cli(dir, ["--help"]);
    expect(r.code).toBe(0);
    expect(r.out).toMatch(/Usage: bun run import:products/);
    expect(r.out).toMatch(/--check/);
    expect(r.out).toMatch(/--update/);
    expect(current(dir)).toBe(before);
  });
  it("empty input and header-only input never overwrite the catalog", () => {
    refuses("", /no header row/);
    refuses("   \n\n", /no header row/);
    refuses(csv([]), /no product rows/);
  });
  it("invalid input: garbage, semicolons and .xlsx are refused", () => {
    refuses("this is not a csv at all", /single column|not comma-separated/);
    refuses(COLUMNS.join(";") + "\n" + COLUMNS.map(() => "x").join(";"), /not comma-separated/);
    const dir = workdir();
    const before = current(dir);
    const f = path.join(dir, "book.csv");
    writeFileSync(f, Buffer.from([0x50, 0x4b, 3, 4, 0, 0]));
    const r = cli(dir, [f]);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/\.xlsx/);
    expect(current(dir)).toBe(before);
  });
  it("duplicate ASIN and duplicate id", () => {
    refuses([NEW(), NEW({ id: "second-item" })], /ASIN B0IMAGINA1 is already used on line 2/);
    refuses([NEW(), NEW({ asin: "B0IMAGINA2" })], /id "wash-tape-set" is already used/);
  });
  it("missing required fields", () => {
    refuses([NEW({ name: "", whySelected: "", limitations: "" })], /name is required|whySelected/);
    const cols = COLUMNS.filter((c) => c !== "asin");
    refuses(csv([NEW()], { cols }), /missing required column\(s\): asin/);
  });
  it("incorrect verification status", () => {
    refuses([NEW({ status: "approved" })], /status must be candidate or verified/);
  });
  it("malformed URLs", () => {
    refuses([NEW({ researchSources: "not a url" })], /must be https/);
    refuses([NEW({ manufacturerUrl: "ftp://x.example/p" })], /manufacturerUrl/);
    refuses([NEW({ amazonUrl: "https://amzn.to/abc" })], /amazonUrl must equal/);
  });
  it("invalid product role", () => {
    refuses([NEW({ role: "bestseller" })], /role must be one of/);
  });
  it("an unverified product cannot be marked verified: no check date or sources is refused", () => {
    refuses([NEW({ status: "verified", lastVerified: "" })], /lastVerified is required/);
    refuses(
      [NEW({ status: "verified", researchSources: "" })],
      /researchSources needs at least one/,
    );
    // A candidate imports fine but is never shown publicly.
    const r = run([NEW({ status: "candidate" })]);
    expect(r.errors).toEqual([]);
    expect(filterVerified(r.products, NOW)).toEqual([]);
    // Held products are not shown either, even when verified.
    const held = run([NEW({ hold: "audience fit" })]);
    expect(filterVerified(held.products, NOW)).toEqual([]);
  });
  it("an incomplete import (good row then a truncated row) writes nothing, not even the good row", () => {
    const dir = workdir();
    const before = current(dir);
    const full = csv([NEW(), NEW({ id: "second-item", asin: "B0IMAGINA2" })]);
    const truncated = full.slice(0, full.length - 120);
    const r = cli(dir, [put(dir, truncated), "--force"]);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/Nothing was written/);
    expect(current(dir)).toBe(before);
    expect(current(dir)).not.toMatch(/wash-tape-set/);
  });
  it("--check validates and writes nothing, even for a good file", () => {
    const dir = workdir();
    const before = current(dir);
    const r = cli(dir, [put(dir, csv([NEW()])), "--check"]);
    expect(r.code).toBe(0);
    expect(r.out).toMatch(/OK: 1 products .* Nothing was written/);
    expect(current(dir)).toBe(before);
  });
  it("a valid import writes one file per new product, atomically, with no temp file left", () => {
    const dir = workdir();
    const f = put(dir, csv([NEW(), NEW({ id: "second-item", asin: "B0IMAGINA2" })]));
    const r = cli(dir, [f]);
    expect(r.code, r.out).toBe(0);
    const one = JSON.parse(readFileSync(path.join(dir, "products/wash-tape-set.json"), "utf8"));
    expect(one.id).toBe("wash-tape-set");
    expect(existsSync(path.join(dir, "products/second-item.json"))).toBe(true);
    expect(readdirSync(path.join(dir, "products")).some((n) => n.includes(".tmp"))).toBe(false);
  });
  it("never overwrites an existing product file unless --update is given, and never deletes", () => {
    const dir = workdir();
    const f = put(dir, csv([NEW()]));
    expect(cli(dir, [f]).code).toBe(0);
    const before = current(dir);
    const again = cli(dir, [put(dir, csv([NEW({ name: "A different name" })]), "b.csv")]);
    expect(again.code).toBe(0);
    expect(again.out).toMatch(/skipped 1 that already exist/);
    expect(current(dir)).toBe(before);
    const forced = cli(dir, [
      put(dir, csv([NEW({ name: "A different name" })]), "c.csv"),
      "--update",
    ]);
    expect(forced.code).toBe(0);
    expect(current(dir)).toMatch(/A different name/);
    // a small CSV never removes the other products
    expect(readdirSync(path.join(dir, "products")).length).toBeGreaterThanOrEqual(67);
  });
  it("a held row becomes status held with its reason", () => {
    const dir = workdir();
    const r = cli(dir, [put(dir, csv([NEW({ hold: "audience fit" })]))]);
    expect(r.code, r.out).toBe(0);
    const one = JSON.parse(readFileSync(path.join(dir, "products/wash-tape-set.json"), "utf8"));
    expect(one.status).toBe("held");
    expect(one.statusReason).toBe("audience fit");
    expect(one.hold).toBeUndefined();
  });
  it("the real product files were not touched by these tests", () => {
    expect(hash(realProducts)).toBe(realBefore);
  });
});
