/**
 * One-time converter: reads the article modules (src/content/article-*.ts and drafts.ts) and the
 * image registry (src/data/images.ts) and writes the editable data files:
 *   content/articles/<slug>.json   content/images/<key>.json
 * Output is canonical (fixed key order, 2-space indent, trailing newline), so running it twice
 * gives byte-identical files. Needs bun (it loads TypeScript):
 *
 *   bun scripts/convert-articles-to-data.mjs [--src src/content] [--data src/data] [--out content]
 *
 * Point --src/--data/--out at a scratch copy to try it without touching the real content.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join, resolve } from "node:path";
import { articleToJson, imageSchema } from "./content-lib.mjs";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return resolve(i >= 0 ? process.argv[i + 1] : join(root, d));
};
const srcDir = arg("src", "src/content");
const dataDir = arg("data", "src/data");
const outDir = arg("out", "content");

/** Every Article exported from the article modules and drafts.ts. */
export async function loadArticles(dir) {
  const found = [];
  for (const f of readdirSync(dir).filter((n) => /^article-.*\.ts$/.test(n)).sort()) {
    const mod = await import(pathToFileURL(join(dir, f)).href);
    for (const v of Object.values(mod)) if (v && typeof v === "object" && typeof v.slug === "string") found.push(v);
  }
  if (existsSync(join(dir, "drafts.ts"))) {
    const { drafts } = await import(pathToFileURL(join(dir, "drafts.ts")).href);
    // drafts.ts leaves its authoring-only `outline` list on each object; it is not article data.
    found.push(...drafts.map(({ outline: _outline, ...a }) => a));
  }
  return found;
}

/** Image records parsed from the text of images.ts (the photos are imported jpgs, so text is safer than loading it). */
export function loadImages(dir) {
  const p = join(dir, "images.ts");
  const text = readFileSync(p, "utf8");
  const files = new Map([...text.matchAll(/^import (\w+) from "@\/assets\/([^"]+)";/gm)].map((m) => [m[1], m[2]]));
  const out = [];
  for (const m of text.matchAll(/^ {2}(\w+): \{\n {4}src: (\w+),\n {4}alt: ("(?:[^"\\]|\\.)*"),\n {4}w: (\d+),\n {4}h: (\d+),\n {2}\},/gm)) {
    const file = files.get(m[2]);
    if (!file) throw new Error(`images.ts: no import found for ${m[2]}`);
    out.push({ key: m[1], file: `src/assets/${file}`, alt: JSON.parse(m[3]), w: Number(m[4]), h: Number(m[5]) });
  }
  return out;
}

if (import.meta.main ?? process.argv[1] === fileURLToPath(import.meta.url)) {
  const articles = await loadArticles(srcDir);
  const slugs = new Set();
  for (const a of articles) {
    if (slugs.has(a.slug)) throw new Error(`Duplicate slug ${a.slug}`);
    slugs.add(a.slug);
  }
  mkdirSync(join(outDir, "articles"), { recursive: true });
  for (const a of articles) writeFileSync(join(outDir, "articles", `${a.slug}.json`), articleToJson(a));
  let images = [];
  if (existsSync(join(dataDir, "images.ts"))) images = loadImages(dataDir);
  mkdirSync(join(outDir, "images"), { recursive: true });
  for (const img of images) {
    const data = imageSchema.parse(img);
    writeFileSync(join(outDir, "images", `${img.key}.json`), `${JSON.stringify(data, null, 2)}\n`);
  }
  console.log(`Converted ${articles.length} articles and ${images.length} images into ${outDir}`);
}
