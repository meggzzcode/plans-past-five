#!/usr/bin/env node
/**
 * Builds every downloadable PDF from editable HTML sources, using Chromium.
 *
 *   node scripts/build-printables.mjs                 regenerate HTML + render all PDFs/previews
 *   node scripts/build-printables.mjs --no-generate   render from the HTML files as they are on disk
 *                                                     (use this after hand-editing an HTML source)
 *   node scripts/build-printables.mjs --free | --kits  only the free downloads / only the premium kits
 *   node scripts/build-printables.mjs --only=<slug|kit-id>
 *
 * Free output : public/downloads/<slug>.pdf  + <slug>-preview*.png   (linked from the site)
 * Kit output  : design/kits/<kit>/dist/*.pdf + <kit>.zip, previews in design/kits/<kit>/previews/
 *               (premium files are NEVER written to public/; only marketing preview PNGs are copied
 *               to public/downloads/kit-previews/)
 * Requires: playwright (global or local) with a Chromium build, and the `zip` CLI for kit packages.
 * Fonts are local OFL files in design/printables/fonts, so the output does not need the network.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const only = (args.find((a) => a.startsWith("--only=")) || "").slice(7);
const generate = !flag("no-generate");
const doFree = !flag("kits");
const doKits = !flag("free");

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  for (const p of ["playwright", "/opt/node-tools/node_modules/playwright", "playwright-core"]) {
    try {
      return require(p);
    } catch {}
  }
  throw new Error("playwright not found. Install it (npm i -D playwright) or set NODE_PATH.");
}
const { chromium } = loadPlaywright();

const FREE_DIR = path.join(ROOT, "design/printables");
const PUBLIC_DL = path.join(ROOT, "public/downloads");
const PREVIEW_PUBLIC = path.join(PUBLIC_DL, "kit-previews");

const { makeDoc, writeFile } = await import(
  pathToFileURL(path.join(FREE_DIR, "_generator/lib.mjs"))
);

async function renderPdf(browser, htmlFile, pdfFile, shots = []) {
  const ctx = await browser.newContext({
    viewport: { width: 816, height: 1056 },
    deviceScaleFactor: 1,
  });
  const pg = await ctx.newPage();
  await pg.goto(pathToFileURL(htmlFile).href, { waitUntil: "load" });
  await pg.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(pdfFile), { recursive: true });
  await pg.pdf({
    path: pdfFile,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  const count = await pg.locator(".page").count();
  for (const { index, out } of shots) {
    if (index >= count) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.locator(".page").nth(index).screenshot({ path: out });
  }
  await ctx.close();
  return count;
}

const manifest = { free: [], kits: [] };
const browser = await chromium.launch();

if (doFree) {
  const { freeDocs } = await import(pathToFileURL(path.join(FREE_DIR, "_generator/free.mjs")));
  for (const d of freeDocs) {
    if (only && only !== d.slug) continue;
    const html = path.join(FREE_DIR, d.file);
    if (generate)
      writeFile(
        html,
        makeDoc({
          title: `${d.title} | Plans Past Five`,
          footerLabel: d.footerLabel,
          pages: d.pages,
        }),
      );
    const pdf = path.join(PUBLIC_DL, `${d.slug}.pdf`);
    const pages = await renderPdf(browser, html, pdf, [
      { index: 0, out: path.join(PUBLIC_DL, `${d.slug}-preview.png`) },
      { index: 1, out: path.join(PUBLIC_DL, `${d.slug}-preview-2.png`) },
      { index: 2, out: path.join(PUBLIC_DL, `${d.slug}-preview-3.png`) },
    ]);
    manifest.free.push({ slug: d.slug, pages, pdf: path.relative(ROOT, pdf) });
    console.log(`free  ${d.slug}.pdf  ${pages} pages`);
  }
}

if (doKits) {
  const { kits } = await import(pathToFileURL(path.join(ROOT, "design/kits/_generator/kits.mjs")));
  for (const kit of kits) {
    if (only && only !== kit.id) continue;
    const kitDir = path.join(ROOT, "design/kits", kit.id);
    const src = path.join(kitDir, "src"),
      dist = path.join(kitDir, "dist"),
      prev = path.join(kitDir, "previews");
    const all = path.join(kitDir, ".pages"); // scratch: every page as PNG for cover mockups
    fs.rmSync(dist, { recursive: true, force: true });
    fs.rmSync(all, { recursive: true, force: true });
    fs.mkdirSync(dist, { recursive: true });
    fs.mkdirSync(prev, { recursive: true });
    const counts = [];
    for (const d of kit.docs) {
      const html = path.join(src, d.file);
      if (generate)
        writeFile(
          html,
          makeDoc({
            title: `${d.title} | ${kit.title}`,
            footerLabel: d.footerLabel || d.title,
            pages: d.pages,
            cssHref: "../../../printables/brand.css",
          }),
        );
      const name = d.file.replace(/\.html$/, "");
      const shots = d.pages.map((_, i) => ({
        index: i,
        out: path.join(all, `${name}-${String(i + 1).padStart(2, "0")}.png`),
      }));
      const pages = await renderPdf(browser, html, path.join(dist, `${name}.pdf`), shots);
      counts.push({ file: `${name}.pdf`, pages });
      console.log(`kit   ${kit.id}/${name}.pdf  ${pages} pages`);
    }
    // previews: chosen pages, a contents sheet and the cover mockup
    const pickPrev = kit.previewPages || [];
    pickPrev.forEach(([docName, idx], i) => {
      const from = path.join(all, `${docName}-${String(idx).padStart(2, "0")}.png`);
      if (fs.existsSync(from)) fs.copyFileSync(from, path.join(prev, `preview-${i + 1}.png`));
    });
    const mock = kit.coverHtml({ pagesDir: all, counts });
    const mockFile = path.join(kitDir, "src/_cover.html");
    writeFile(mockFile, mock);
    const ctx = await browser.newContext({
      viewport: { width: 1600, height: 1200 },
      deviceScaleFactor: 1,
    });
    const pg = await ctx.newPage();
    await pg.goto(pathToFileURL(mockFile).href, { waitUntil: "load" });
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(prev, "cover.png") });
    await ctx.close();
    // delivery package: PDFs + a plain-text START HERE + usage terms (draft, owner must review)
    const stage = path.join(kitDir, ".stage", kit.packageName);
    fs.rmSync(path.join(kitDir, ".stage"), { recursive: true, force: true });
    fs.mkdirSync(stage, { recursive: true });
    for (const f of fs.readdirSync(dist))
      if (f.endsWith(".pdf")) fs.copyFileSync(path.join(dist, f), path.join(stage, f));
    fs.writeFileSync(path.join(stage, "START-HERE.txt"), kit.startHere(counts));
    fs.writeFileSync(path.join(stage, "USAGE-TERMS.txt"), kit.usageTerms());
    const zipFile = path.join(dist, `${kit.packageName}.zip`);
    fs.rmSync(zipFile, { force: true });
    execFileSync("zip", ["-q", "-r", "-X", zipFile, kit.packageName], {
      cwd: path.join(kitDir, ".stage"),
    });
    fs.writeFileSync(path.join(kitDir, "USAGE-TERMS.md"), kit.usageTerms());
    fs.rmSync(path.join(kitDir, ".stage"), { recursive: true, force: true });
    fs.rmSync(all, { recursive: true, force: true });
    // marketing previews only (not the files) go to the public folder
    fs.mkdirSync(PREVIEW_PUBLIC, { recursive: true });
    for (const f of fs.readdirSync(prev))
      if (f.endsWith(".png"))
        fs.copyFileSync(path.join(prev, f), path.join(PREVIEW_PUBLIC, `${kit.id}-${f}`));
    manifest.kits.push({ kit: kit.id, files: counts, zip: path.relative(ROOT, zipFile) });
  }
}

await browser.close();
console.log(JSON.stringify(manifest, null, 1));
