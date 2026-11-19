#!/usr/bin/env node
// Renders every pin in design/pins/pins.mjs to public/pins/<id>.(png|jpg) at 1000x1500 with Chromium (Playwright),
// writes the HTML sources to design/pins/html/, a manifest, and docs/pinterest-pins.csv.
//
// Usage:  node scripts/build-pins.mjs [--no-render] [--only=<id-substring>] [--start=2027-01-04]
// Needs:  playwright + a Chromium (already installed in this workspace). Fonts are local files in design/brand/fonts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { articles, extras, BOARDS } from "../design/pins/pins.mjs";
import { render } from "../design/pins/templates.mjs";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HTML_DIR = path.join(ROOT, "design/pins/html");
const OUT_DIR = path.join(ROOT, "public/pins");
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const START = args.start || "2027-01-04"; // PLACEHOLDER launch date: replace with your real start date
const PHOTO_TEMPLATES = new Set(["cover", "editorial"]); // exported as JPG (photographic); the rest as PNG

// ---------------------------------------------------------------- assemble the catalogue
const strip = (s = "") => s.replace(/\*/g, "");
const pins = [];
const slugKey = (s) => s.replace(/[^a-z0-9]+/g, "-");

articles.forEach((a, ai) => {
  [...a.pins, ...(a.extra || [])].forEach((p, k) => {
    pins.push({
      ...p,
      id: `${String(ai + 1).padStart(2, "0")}-${a.short}-${k + 1}-${p.t}`,
      group: a.slug,
      groupIdx: ai,
      variantIdx: k,
      kind: "article",
      dest: `/journal/${a.slug}`,
      campaign: a.slug,
      board: p.board || a.board,
      kw: a.kw,
      status: a.status,
      articleStatus: a.status,
    });
  });
});
extras.forEach((e, ei) => {
  e.pins.forEach((p, k) => {
    pins.push({
      ...p,
      id: `${String(articles.length + ei + 1).padStart(2, "0")}-${e.short}-${k + 1}-${p.t}`,
      group: e.campaign,
      groupIdx: articles.length + ei,
      variantIdx: k,
      kind: e.kind,
      dest: e.dest,
      campaign: e.campaign,
      board: p.board || e.board,
      kw: e.kw,
      status: e.status,
    });
  });
});

// ---------------------------------------------------------------- 90-day schedule
// Month 1 (days 1-30) uses ONLY pins whose destination is live today (published articles, quiz, planner, shop).
// Days 31-90 carry the pins for pages that are still drafts or not yet built; those dates are EARLIEST dates and move
// back if the page is not published yet. Within each phase the 1st / 2nd / 3rd creative approach per destination go out in
// rounds, so repeats of one destination are spread apart and never posted back to back.
const isLive = (p) => p.status === "published";
const weave = (list) => {
  const art = list.filter((p) => p.kind === "article");
  const ext = list.filter((p) => p.kind !== "article");
  const rounds = [0, 1, 2].map((r) =>
    art.filter((p) => p.variantIdx === r).sort((a, b) => a.groupIdx - b.groupIdx),
  );
  const main = rounds.flat();
  const extOrdered = [0, 1, 2].flatMap((r) => ext.filter((p) => p.variantIdx === r));
  const out = [];
  const step = main.length / (extOrdered.length + 1);
  let mi = 0;
  extOrdered.forEach((x, j) => {
    const upto = Math.round((j + 1) * step);
    while (mi < upto) out.push(main[mi++]);
    out.push(x);
  });
  while (mi < main.length) out.push(main[mi++]);
  return out;
};
const live = weave(pins.filter(isLive));
const hold = weave(pins.filter((p) => !isLive(p)));
const addDays = (iso, d) => {
  const t = new Date(iso + "T00:00:00Z");
  t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};
live.forEach((p, i) => {
  p.day = Math.floor((i * 30) / live.length) + 1;
});
hold.forEach((p, i) => {
  p.day = 31 + Math.floor((i * 60) / hold.length);
});
const seq = [...live, ...hold];
const N = seq.length;
seq.forEach((p) => {
  p.date = addDays(START, p.day - 1);
  p.publish_status = p.status === "published" ? "published-article" : "hold-until-published";
  p.ext = PHOTO_TEMPLATES.has(p.t) ? "jpg" : "png";
  p.file = `${p.id}.${p.ext}`;
});
pins.length = 0;
pins.push(...seq);

// ---------------------------------------------------------------- checks on catalogue
const problems = [];
for (const p of pins) {
  if (!BOARDS.includes(p.board)) problems.push(`${p.id}: board "${p.board}" not in allowed list`);
  if ((p.title || "").length > 100) problems.push(`${p.id}: title ${p.title.length} chars (>100)`);
  if ((p.desc || "").length > 500)
    problems.push(`${p.id}: description ${p.desc.length} chars (>500)`);
  if (!p.title || !p.desc || !p.concept) problems.push(`${p.id}: missing title/desc/concept`);
}
const seenTitles = new Set();
for (const p of pins) {
  if (seenTitles.has(p.title)) problems.push(`${p.id}: duplicate pin title`);
  seenTitles.add(p.title);
}

// ---------------------------------------------------------------- contrast sanity for theme pairs (WCAG)
const hex = (h) =>
  [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
const lum = (h) => {
  const [r, g, b] = hex(h);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const C = {
  cherry: "#B83F43",
  cream: "#FFF8EF",
  butter: "#F8E5A3",
  straw: "#F4D4D7",
  garden: "#394D3C",
  ink: "#292722",
  matcha: "#B5C19C",
  sunday: "#C9DDEC",
  white: "#FFFCF8",
};
const themeSpec = {
  cherry: ["cherry", "cream", "butter"],
  butter: ["butter", "ink", "cherry"],
  straw: ["straw", "ink", "cherry"],
  garden: ["garden", "cream", "butter"],
  cream: ["cream", "ink", "cherry"],
  sunday: ["sunday", "ink", "cherry"],
  matcha: ["matcha", "ink", "garden"],
};
console.log(
  "Theme contrast (bg/fg body text, bg/accent emphasised headline text; AA body 4.5, large 3):",
);
for (const [k, [bg, fg, acc]] of Object.entries(themeSpec))
  console.log(
    `  ${k.padEnd(7)} body ${ratio(C[bg], C[fg]).toFixed(1)}  accent ${ratio(C[bg], C[acc]).toFixed(1)}`,
  );

// ---------------------------------------------------------------- render
fs.mkdirSync(HTML_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
const selected = args.only ? pins.filter((p) => p.id.includes(args.only)) : pins;
for (const p of selected) fs.writeFileSync(path.join(HTML_DIR, `${p.id}.html`), render(p));

const overflow = [];
if (!args["no-render"]) {
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1000, height: 1500 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  for (const p of selected) {
    await page.goto("file://" + path.join(HTML_DIR, `${p.id}.html`));
    await page.waitForFunction(() => document.body.dataset.fitted === "1", null, {
      timeout: 15000,
    });
    const report = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll(".chk").forEach((el) => {
        const mh = +el.dataset.maxh;
        const bad1 = mh ? el.firstElementChild.offsetHeight > mh + 1 : window.__over(el);
        if (bad1)
          bad.push(
            `${el.className.split(" ")[0]} overflows (box ${el.clientWidth}x${el.clientHeight}, font ${el.dataset.size || "?"}px)`,
          );
      });
      const rail = document.querySelector(".rail");
      if (rail) {
        const last = rail.lastElementChild.getBoundingClientRect();
        const first = rail.firstElementChild.getBoundingClientRect();
        let prev = null;
        rail.querySelectorAll(".st").forEach((s) => {
          const r = s.getBoundingClientRect();
          if (prev && r.top < prev - 1) bad.push("steps overlap");
          prev = r.bottom;
        });
        if (last.bottom > 1300) bad.push(`steps end at ${Math.round(last.bottom)}px`);
      }
      if ([...document.fonts].some((f) => f.status === "error"))
        bad.push("a custom font failed to load");
      const sizes = [...document.querySelectorAll(".fit")]
        .map((e) => +e.dataset.size)
        .filter(Boolean);
      return { bad, minFit: sizes.length ? Math.min(...sizes) : null };
    });
    p.minFit = report.minFit;
    if (report.bad.length) overflow.push(`${p.id}: ${report.bad.join("; ")}`);
    const out = path.join(OUT_DIR, p.file);
    if (p.ext === "jpg") await page.screenshot({ path: out, type: "jpeg", quality: 90 });
    else await page.screenshot({ path: out, type: "png" });
    for (const other of ["png", "jpg"])
      if (other !== p.ext) fs.rmSync(path.join(OUT_DIR, `${p.id}.${other}`), { force: true });
  }
  await browser.close();
}

// ---------------------------------------------------------------- CSV + manifest (always from the full catalogue)
const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const utm = (p) => `utm_source=pinterest&utm_medium=social&utm_campaign=${p.campaign}`;
const cols = [
  "file",
  "title",
  "description",
  "destination_url",
  "tracked_url",
  "board",
  "keywords",
  "creative_concept",
  "template",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "day",
  "suggested_date",
  "publish_status",
  "destination_type",
  "alt_text",
  "verify_before_posting",
];
const rows = [...pins]
  .sort((a, b) => a.day - b.day || a.id.localeCompare(b.id))
  .map((p) => {
    const verify =
      p.publish_status === "hold-until-published"
        ? p.kind === "tool"
          ? "Do not post until the tool page is live and works as the pin describes."
          : "Do not post until the article is published and its claims are verified; confirm the pin copy matches the final article."
        : p.kind === "shop"
          ? "Pin copy is generic. Re-check after products are verified; add affiliate disclosure wording once monetized."
          : "Confirm pin copy still matches the live page.";
    return [
      `public/pins/${p.file}`,
      p.title,
      p.desc,
      `{SITE_URL}${p.dest}`,
      `{SITE_URL}${p.dest}?${utm(p)}&utm_content=${p.id}`,
      p.board,
      p.kw.join("; "),
      p.concept,
      p.t,
      "pinterest",
      "social",
      p.campaign,
      p.id,
      p.day,
      p.date,
      p.publish_status,
      p.kind,
      `Pinterest pin: ${strip(p.headline || p.quote || p.title)}. Plans Past Five.`,
      verify,
    ]
      .map(q)
      .join(",");
  });
fs.writeFileSync(
  path.join(ROOT, "docs/pinterest-pins.csv"),
  cols.join(",") + "\n" + rows.join("\n") + "\n",
);
fs.writeFileSync(
  path.join(ROOT, "design/pins/manifest.json"),
  JSON.stringify(
    pins.map(
      ({
        id,
        file,
        t,
        theme,
        variant,
        board,
        dest,
        day,
        date,
        publish_status,
        kind,
        img,
        minFit,
      }) => ({
        id,
        file,
        template: t,
        variant: variant || null,
        theme,
        board,
        destination: dest,
        day,
        date,
        publish_status,
        kind,
        image: img || null,
        minFitFontPx: minFit ?? null,
      }),
    ),
    null,
    2,
  ),
);

const byTpl = {};
pins.forEach((p) => (byTpl[p.t] = (byTpl[p.t] || 0) + 1));
console.log(`\n${pins.length} pins (${START} placeholder start).`, byTpl);
console.log(
  "hold-until-published:",
  pins.filter((p) => p.publish_status !== "published-article").length,
  " published:",
  pins.filter((p) => p.publish_status === "published-article").length,
);
if (problems.length) console.log("\nCATALOGUE PROBLEMS:\n" + problems.join("\n"));
if (overflow.length) console.log("\nOVERFLOW:\n" + overflow.join("\n"));
else if (!args["no-render"]) console.log("\nNo overflow flagged by automated checks.");
