#!/usr/bin/env node
// Renders PNG exports of the brand library with Chromium (Playwright).  Usage: node design/brand/build-brand.mjs
// (SVG logos are produced separately by design/brand/tools/build-logos.py, which needs `pip install fonttools`.)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const B = path.dirname(fileURLToPath(import.meta.url));
const url = (rel, qs = "") => "file://" + path.join(B, rel) + (qs ? "?" + qs : "");
const enc = encodeURIComponent;
const browser = await chromium.launch();

async function shot(rel, qs, w, h, out, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: opts.scale || 1,
  });
  const page = await ctx.newPage();
  await page.goto(url(rel, qs));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(B, out), omitBackground: !!opts.transparent });
  await ctx.close();
  console.log("wrote", out);
}
async function svgToPng(svgRel, out, width, bg) {
  const f = path.join(B, svgRel);
  const vb = fs
    .readFileSync(f, "utf8")
    .match(/viewBox="([\d.\s-]+)"/)[1]
    .split(/\s+/)
    .map(Number);
  const height = Math.ceil((width * vb[3]) / vb[2]);
  const tmp = path.join(B, "exports", "_svgview.html");
  fs.writeFileSync(
    tmp,
    `<body style="margin:0;background:transparent"><img src="file://${f}" style="width:${width}px;height:${height}px;display:block"></body>`,
  );
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("file://" + tmp);
  await page.waitForFunction(
    () => document.images[0].complete && document.images[0].naturalWidth > 0,
  );
  await page.screenshot({ path: path.join(B, out), omitBackground: true });
  await ctx.close();
  fs.rmSync(tmp, { force: true });
  console.log("wrote", out);
}

// logos (transparent PNGs, 2000px wide for the stacked/horizontal marks, 1024 for badges)
for (const f of fs.readdirSync(path.join(B, "logos")).filter((n) => n.endsWith(".svg"))) {
  await svgToPng(
    `logos/${f}`,
    `exports/logos/${f.replace(".svg", ".png")}`,
    f.includes("monogram") ? 1024 : 2000,
  );
}
// favicons from favicon-source.svg
for (const s of [32, 48, 180, 192, 512])
  await svgToPng("favicon/favicon-source.svg", `exports/favicon/favicon-${s}.png`, s);

// social samples
await shot("social/og-image-1200x630.html", "", 1200, 630, "exports/social/og-image-1200x630.png");
await shot(
  "social/profile-avatar-1000.html",
  "",
  1000,
  1000,
  "exports/social/profile-avatar-1000.png",
);
await shot(
  "social/instagram-quote-1080.html",
  "",
  1080,
  1080,
  "exports/social/instagram-quote-1080.png",
);
await shot("social/story-1080x1920.html", "", 1080, 1920, "exports/social/story-1080x1920.png");

// 12 Pinterest board covers
const boards = [
  ["Plans Past Five", "cherry", "light", "the flagship board"],
  ["After Work Activities", "butter", "", "weeknights"],
  ["Creative Hobbies for Beginners", "straw", "", "paint, clay, thread"],
  ["Solo Date Ideas", "sunday", "", "table for one"],
  ["Weekend Activities", "butter", "", "a storyline for Saturday"],
  ["Girls' Night Ideas", "straw", "", "better together"],
  ["Junk Journaling", "cream", "", "glue, tape, tiny scraps"],
  ["Cozy Hobbies", "garden", "light", "soft and slow"],
  ["Hobby Starter Kits", "matcha", "", "start small"],
  ["Affordable Adventures", "sunday", "", "big feelings, small budget"],
  ["Printable Planners", "straw", "", "print it, pin it"],
  ["Active Hobbies", "matcha", "", "move for the joy of it"],
];
for (const [name, bg, fg, sub] of boards) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  await shot(
    "social/board-cover-1000.html",
    `title=${enc(name.replace(/^(.*)\s(\S+)$/, "$1 *$2*"))}&bg=${bg}&sub=${enc(sub)}`,
    1000,
    1000,
    `exports/board-covers/${slug}.png`,
  );
}
// article template samples
await shot(
  "article-templates/article-hero-photo-1600x900.html",
  `title=${enc("How to take yourself on a *solo coffee date*")}&kicker=${enc("Table for One")}&sub=${enc("SAMPLE text: replace with your own dek.")}`,
  1600,
  900,
  "exports/article-templates/sample-hero-photo.png",
);
await shot(
  "article-templates/article-hero-typographic-1600x900.html",
  `title=${enc("Hobbies for when life feels like *work, sleep, repeat*")}&kicker=${enc("The Journal")}&sub=${enc("SAMPLE text: replace with your own dek.")}`,
  1600,
  900,
  "exports/article-templates/sample-hero-typographic.png",
);
await shot(
  "article-templates/pull-quote-1200x630.html",
  "",
  1200,
  630,
  "exports/article-templates/sample-pull-quote.png",
);
await shot(
  "article-templates/inline-divider-1200x400.html",
  "",
  1200,
  400,
  "exports/article-templates/sample-inline-divider.png",
);
await browser.close();
