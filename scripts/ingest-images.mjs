#!/usr/bin/env node
/**
 * Ingest new images from docs/content/incoming-images/ into the site.
 *
 *   node scripts/ingest-images.mjs --check            validate docs/content/new-images.csv, write nothing
 *   node scripts/ingest-images.mjs                    validate, then ingest
 *   node scripts/ingest-images.mjs --csv path.csv     use another CSV
 *
 * For every row: validate (see scripts/ingest-images.lib.mjs), resize to at most 1600 px wide JPEG
 * (quality 82, metadata stripped) into src/assets/<kebab-key>.jpg, register the image in the
 * generated src/data/images.extra.ts, set `hero:` in the article files named in heroFor, set
 * `image:` on the hobbies named in hobbyFor (hobby slugs, src/data/hobbies.ts), and append
 * a row to docs/IMAGE-LICENSES.md. Nothing is written if any row is invalid. Re-running with the
 * same CSV changes nothing (rows already ingested are skipped).
 *
 * Image tool (nothing is added to package.json), first one found wins:
 *   1. sharp (only if you have installed it yourself: `npm i --no-save sharp`)
 *   2. python3 with Pillow (`pip install pillow`)
 *   3. ImageMagick (`magick` or `convert`, and `identify`)
 */
import { execFileSync } from "node:child_process";
import {
  appendFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { articleToJson } from "./content-lib.mjs";
import {
  kebabKey,
  MAX_WIDTH,
  parseCsv,
  parseHobbySeeds,
  setHobbyImage,
  rowsFromRecords,
  splitList,
  validateRow,
} from "./ingest-images.lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INCOMING = join(root, "docs/content/incoming-images");
const ASSETS = join(root, "src/assets");
const EXTRA = join(root, "src/data/images.extra.ts");
const LICENSES = join(root, "docs/IMAGE-LICENSES.md");
const HOBBIES = join(root, "src/data/hobbies.ts");

const args = process.argv.slice(2);
const check = args.includes("--check");
const csvIdx = args.indexOf("--csv");
const csvPath = resolve(
  csvIdx >= 0 ? (args[csvIdx + 1] ?? "") : join(root, "docs/content/new-images.csv"),
);

function die(msg) {
  console.error(`ingest-images: ${msg}`);
  process.exit(1);
}

// ---------- image backend ----------
function run(cmd, a, opts = {}) {
  return execFileSync(cmd, a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });
}
function has(cmd, a = ["--version"]) {
  try {
    run(cmd, a);
    return true;
  } catch {
    return false;
  }
}

const PY_PROBE = `
import sys, json
from PIL import Image, ImageOps
try:
    im = Image.open(sys.argv[1]); im.load(); im = ImageOps.exif_transpose(im)
    print(json.dumps({"width": im.width, "height": im.height}))
except Exception as e:
    print(json.dumps({"error": str(e)[:120]}))
`;
const PY_CONVERT = `
import sys
from PIL import Image, ImageOps
src, dst, maxw = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = ImageOps.exif_transpose(Image.open(src))
if im.mode != "RGB":
    bg = Image.new("RGB", im.size, (255, 255, 255))
    im = im.convert("RGBA"); bg.paste(im, mask=im.split()[3]); im = bg
if im.width > maxw:
    im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
print(im.width, im.height)
`;

async function pickBackend() {
  try {
    const sharp = (await import("sharp")).default;
    return {
      name: "sharp",
      async probe(f) {
        try {
          const m = await sharp(f).rotate().toBuffer({ resolveWithObject: true });
          return { width: m.info.width, height: m.info.height };
        } catch (e) {
          return { error: String(e.message).slice(0, 120) };
        }
      },
      async convert(src, dst) {
        const { info } = await sharp(src)
          .rotate()
          .flatten({ background: "#ffffff" })
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(dst);
        return { w: info.width, h: info.height };
      },
    };
  } catch {
    /* not installed */
  }
  if (has("python3", ["-I", "-c", "import PIL.Image"])) {
    return {
      name: "Pillow (python3)",
      probe(f) {
        try {
          return JSON.parse(run("python3", ["-I", "-c", PY_PROBE, f]));
        } catch (e) {
          return { error: String(e.message).slice(0, 120) };
        }
      },
      convert(src, dst) {
        const [w, h] = run("python3", ["-I", "-c", PY_CONVERT, src, dst, String(MAX_WIDTH)])
          .trim()
          .split(" ")
          .map(Number);
        return { w, h };
      },
    };
  }
  const magick = has("magick") ? ["magick"] : has("convert", ["-version"]) ? ["convert"] : null;
  if (magick && (has("identify", ["-version"]) || magick[0] === "magick")) {
    const ident = magick[0] === "magick" ? ["magick", "identify"] : ["identify"];
    return {
      name: "ImageMagick",
      probe(f) {
        try {
          const out = run(ident[0], [...ident.slice(1), "-format", "%w %h", `${f}[0]`]).trim();
          const [width, height] = out.split(" ").map(Number);
          if (!width || !height) return { error: "unreadable" };
          // honour EXIF orientation for the reported size
          const o = run(ident[0], [
            ...ident.slice(1),
            "-format",
            "%[orientation]",
            `${f}[0]`,
          ]).trim();
          return ["LeftTop", "RightTop", "RightBottom", "LeftBottom"].includes(o)
            ? { width: height, height: width }
            : { width, height };
        } catch (e) {
          return { error: String(e.message).split("\n")[0].slice(0, 120) };
        }
      },
      convert(src, dst) {
        run(magick[0], [
          ...magick.slice(1),
          `${src}[0]`,
          "-auto-orient",
          "-background",
          "white",
          "-alpha",
          "remove",
          "-strip",
          "-resize",
          `${MAX_WIDTH}x>`,
          "-quality",
          "82",
          "-interlace",
          "Plane",
          dst,
        ]);
        const [w, h] = run(ident[0], [...ident.slice(1), "-format", "%w %h", dst])
          .trim()
          .split(" ")
          .map(Number);
        return { w, h };
      },
    };
  }
  return null;
}

// ---------- repo state ----------
function baseKeys() {
  // Base images now live one per file in content/images/<key>.json (edited in Pages CMS).
  const dir = join(root, "content/images");
  if (!existsSync(dir)) die("could not find content/images (the image data files)");
  return new Set(
    readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, "")),
  );
}

/** Parse entries from the generated file: [{key, file, alt, w, h}] */
function readExtra() {
  if (!existsSync(EXTRA)) return [];
  const text = readFileSync(EXTRA, "utf8");
  const out = [];
  const re =
    /^ {2}(\w+): \{\n {4}src: \w+,\n {4}alt: ("(?:[^"\\]|\\.)*"),\n {4}w: (\d+),\n {4}h: (\d+),\n {2}\},$/gm;
  for (const m of text.matchAll(re))
    out.push({
      key: m[1],
      alt: JSON.parse(m[2]),
      w: +m[3],
      h: +m[4],
      file: `${kebabKey(m[1])}.jpg`,
    });
  return out;
}

function writeExtra(entries) {
  const imports = entries.map((e) => `import ${e.key}Src from "@/assets/${e.file}";`).join("\n");
  const body = entries
    .map(
      (e) =>
        `  ${e.key}: {\n    src: ${e.key}Src,\n    alt: ${JSON.stringify(e.alt)},\n    w: ${e.w},\n    h: ${e.h},\n  },`,
    )
    .join("\n");
  const text = `// GENERATED by scripts/ingest-images.mjs from docs/content/new-images.csv. Do not edit by hand:
// re-run the script (it keeps existing entries and never duplicates). Sources and licences are
// recorded in docs/IMAGE-LICENSES.md. Merged into \`images\` by src/data/images.ts.
${imports ? `${imports}\n` : ""}import type { Img } from "./images";

export const extraImages = {${body ? `\n${body}\n` : ""}} satisfies Record<string, Img>;
`;
  writeFileSync(EXTRA, text);
}

function articleFiles() {
  const map = new Map();
  const dir = join(root, "content/articles");
  if (existsSync(dir))
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".json")))
      map.set(f.slice(0, -5), join(dir, f));
  return map;
}

// ---------- main ----------
if (!existsSync(csvPath)) {
  die(
    `${csvPath} not found. Copy docs/content/new-images.template.csv to docs/content/new-images.csv and fill it in.`,
  );
}
let rows;
try {
  rows = rowsFromRecords(parseCsv(readFileSync(csvPath, "utf8")));
} catch (e) {
  die(`${csvPath}: ${e.message}`);
}
if (!rows.length) die("the CSV has a header but no rows (the example row is commented out with #)");

const backend = await pickBackend();
if (!backend) {
  die(
    "no image tool found. Install one of: Pillow (`pip install pillow`), ImageMagick, or sharp (`npm i --no-save sharp`).",
  );
}

const base = baseKeys();
const extra = readExtra();
const ingested = new Map(extra.map((e) => [e.key, e]));
const articles = articleFiles();
const knownSlugs = new Set(articles.keys());
const hobbies = new Map(parseHobbySeeds(readFileSync(HOBBIES, "utf8")).map((h) => [h.slug, h.image]));
const seen = new Set();
let problems = 0;
const plan = [];

rows.forEach((row, i) => {
  const path = join(INCOMING, row.file || "\0");
  const fileExists = !!row.file && existsSync(path);
  const info = fileExists ? backend.probe(path) : null;
  const errors = validateRow(row, {
    baseKeys: base,
    ingestedKeys: ingested,
    seenKeys: seen,
    fileExists,
    info,
    knownSlugs,
    hobbies,
  });
  // a row already ingested no longer needs its source file
  const already = ingested.has(row.key) && ingested.get(row.key).alt === row.alt;
  const real = already ? errors.filter((e) => !/^file /.test(e)) : errors;
  if (real.length) {
    problems += real.length;
    console.error(`Row ${i + 2} (${row.key || "no key"}):`);
    for (const e of real) console.error(`  - ${e}`);
  } else plan.push({ row, already, path });
});

if (problems) {
  console.error(`\n${problems} problem(s) in ${rows.length} row(s). Nothing was written.`);
  process.exit(1);
}

console.log(`Image tool: ${backend.name}`);
if (check) {
  for (const p of plan)
    console.log(
      `  ok  ${p.row.key} <- ${p.row.file}${p.already ? " (already ingested, would only re-check heroes and licence rows)" : ""}`,
    );
  console.log(`\n--check: ${plan.length} row(s) valid. Nothing was written.`);
  process.exit(0);
}

mkdirSync(ASSETS, { recursive: true });
const summary = [];
const entries = [...extra];
let licenseText = existsSync(LICENSES) ? readFileSync(LICENSES, "utf8") : "";

for (const { row, already, path } of plan) {
  const file = `${kebabKey(row.key)}.jpg`;
  let note = "unchanged";
  if (!already) {
    const dims = await backend.convert(path, join(ASSETS, file));
    entries.push({ key: row.key, file, alt: row.alt, w: dims.w, h: dims.h });
    note = `new ${dims.w}x${dims.h}`;
  }
  const hobbyList = splitList(row.hobbyFor);
  if (hobbyList.length) {
    let text = readFileSync(HOBBIES, "utf8");
    for (const slug of hobbyList) text = setHobbyImage(text, slug, row.key);
    writeFileSync(HOBBIES, text);
  }
  const heroes = [];
  for (const slug of splitList(row.heroFor)) {
    const f = articles.get(slug);
    const data = JSON.parse(readFileSync(f, "utf8"));
    if (typeof data.hero !== "string") die(`${f} has no "hero" field`);
    if (data.hero !== row.key) writeFileSync(f, articleToJson({ ...data, hero: row.key }));
    heroes.push(slug);
  }
  if (!licenseText.includes(`\`${row.key}\``)) {
    if (!licenseText.includes("<!-- sourced-images -->")) {
      licenseText +=
        `\n\n## Sourced images (added by scripts/ingest-images.mjs)\n\n<!-- sourced-images -->\n` +
        `These images were sourced from the places named below (not generated by the original Lovable batch above). Each row records the source, creator, licence terms as read on the licence page, and the date. AI-generated images are labelled as such. Licence terms are recorded, not interpreted: transferability to a buyer is unverified (see Cowork task C10).\n\n` +
        `| Key | File | Source | Creator | Source URL | Licence (terms and URL) | Date sourced | Hero of | Notes |\n|---|---|---|---|---|---|---|---|---|\n`;
    }
    const cell = (s) => (s || "").replace(/\|/g, "/").replace(/\n/g, " ");
    licenseText += `| \`${row.key}\` | src/assets/${file} | ${cell(row.source)} | ${cell(row.creator)} | ${cell(row.sourceUrl)} | ${cell(row.licenseName)} (${cell(row.licenseUrl)}) | ${cell(row.dateSourced)} | ${cell([row.heroFor, row.hobbyFor && `hobby: ${row.hobbyFor}`].filter(Boolean).join("; ")) || "-"} | ${cell(row.notes) || "-"} |\n`;
  }
  summary.push({ key: row.key, file, note, heroes, hobbies: hobbyList, pinFor: row.pinFor });
}
if (licenseText) writeFileSync(LICENSES, licenseText.replace(/\n*$/, "\n"));
if (entries.length !== extra.length || !existsSync(EXTRA)) writeExtra(entries);

console.log("\nIngest summary:");
for (const s of summary) {
  console.log(`  ${s.key}: src/assets/${s.file} (${s.note})`);
  if (s.heroes.length) console.log(`    hero of: ${s.heroes.join(", ")}`);
  if (s.hobbies.length) console.log(`    hobby image for: ${s.hobbies.join(", ")}`);
  if (s.pinFor) console.log(`    pinFor (apply by hand in the pin data): ${s.pinFor}`);
}
console.log(
  "\nNext: run `bunx prettier --write src/data/images.extra.ts`, then `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build`, and review the diff. If pins use these photos run `node scripts/build-pins.mjs`.",
);
