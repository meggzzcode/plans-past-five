// Captures genuine screenshots of the running site (no mocks).
// Usage: node scripts/capture-screenshots.mjs http://127.0.0.1:5299 [outDir]
// Start the dev server first: bunx vite dev --host 127.0.0.1 --port 5299
// Writes JPEGs (first 3600 / 4800 CSS px of each page) plus capture-report.json (captured / not captured) into outDir.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const base = (process.argv[2] || "http://127.0.0.1:5299").replace(/\/$/, "");
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(
  process.argv[3] || path.join(here, "../docs/marketplace/presentation/screenshots"),
);
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const plannerUrl =
  "/make-plans?when=saturday&length=full-day&vibe=creative&who=friend&budget=under50&setting=any&energy=medium&seed=3";

// Each step: name, path, optional `act(page, vp)` run after load, optional fullPage flag.
const shots = [
  { name: "home", path: "/" },
  { name: "category-after-hours", path: "/after-hours" },
  { name: "category-weekend-edit", path: "/weekends" },
  { name: "category-table-for-one", path: "/solo-dates" },
  { name: "category-better-together", path: "/better-together" },
  { name: "category-creative-corner", path: "/creative-corner" },
  { name: "category-a-little-movement", path: "/movement" },
  { name: "journal-index", path: "/journal" },
  { name: "article-junk-journaling", path: "/journal/how-to-start-junk-journaling" },
  { name: "hobby-directory", path: "/hobbies" },
  { name: "hobby-profile", path: "/hobbies/pottery-painting" },
  {
    name: "quiz-in-progress",
    path: "/hobby-finder",
    act: async (page) => {
      for (let i = 0; i < 3; i++) await clickFirstOption(page);
    },
  },
  {
    name: "quiz-result",
    path: "/hobby-finder",
    act: async (page) => {
      for (let i = 0; i < 7; i++) {
        if (!(await clickFirstOption(page))) break;
      }
      await page.getByRole("heading", { level: 1 }).first().waitFor();
    },
  },
  { name: "planner-itinerary", path: plannerUrl },
  { name: "tool-hobby-budget", path: "/tools/hobby-budget" },
  {
    name: "tool-tonight",
    path: "/tools/tonight",
    act: async (page) => {
      // pick one option per group so a result is shown for chosen answers
      const groups = page.locator("fieldset");
      const n = await groups.count();
      for (let i = 0; i < n; i++) {
        await groups.nth(i).locator("button").first().click();
      }
      await page
        .getByText("Idea 1")
        .first()
        .waitFor({ timeout: 5000 })
        .catch(() => {});
    },
  },
  { name: "shop-index", path: "/shop" },
  { name: "shop-collection", path: "/shop/pottery-era" },
  { name: "printables-index", path: "/printables" },
  { name: "printable-detail", path: "/printables/hobby-era-tracker" },
  { name: "editorial-policy", path: "/editorial-policy" },
  { name: "methodology", path: "/methodology" },
  { name: "corrections", path: "/corrections" },
  { name: "affiliate-disclosure", path: "/affiliate-disclosure" },
];

async function clickFirstOption(page) {
  const btn = page.locator("main button[aria-pressed]").first();
  if (!(await btn.count())) return false;
  await btn.click();
  await page.waitForTimeout(250);
  return true;
}

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page
    .evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      // trigger lazy images, then return to top
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
      await Promise.all(
        [...document.images].map((i) =>
          i.complete ? 1 : new Promise((r) => ((i.onload = i.onerror = r), setTimeout(r, 3000))),
        ),
      );
    })
    .catch(() => {});
  await page.waitForTimeout(300);
}

// Full page, but capped in height so very long pages (home, article) stay a sensible file size.
// JPEG q86 at deviceScaleFactor 2 keeps the folder small enough to commit.
const MAX_CSS_HEIGHT = { desktop: 3600, mobile: 4800 };
async function shoot(page, file, vpName) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vp = VIEWPORTS[vpName];
  await page.screenshot({
    path: path.join(outDir, file),
    type: "jpeg",
    quality: 86,
    fullPage: true,
    clip: { x: 0, y: 0, width: vp.width, height: Math.min(h, MAX_CSS_HEIGHT[vpName]) },
  });
}

const report = { base, date: new Date().toISOString(), captured: [], notCaptured: [] };
const browser = await chromium.launch();

for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  const run = async (name, fn) => {
    const file = `${name}-${vpName}.jpg`;
    try {
      await fn(file);
      report.captured.push(file);
      console.log("ok  ", file);
    } catch (e) {
      report.notCaptured.push({ file, reason: String(e.message || e).split("\n")[0] });
      console.log("FAIL", file, String(e.message || e).split("\n")[0]);
    }
  };

  for (const s of shots) {
    await run(s.name, async (file) => {
      const res = await page.goto(base + s.path, { waitUntil: "domcontentloaded" });
      if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status()} for ${s.path}`);
      await settle(page);
      if (s.act) {
        await s.act(page, vpName);
        await settle(page);
      }
      await shoot(page, file, vpName);
    });
  }

  // My Plans: save an item through the UI first (article page save button), then open /saved.
  await run("my-plans-saved", async (file) => {
    await page.goto(base + "/hobbies/pottery-painting", { waitUntil: "domcontentloaded" });
    await settle(page);
    const save = page.getByRole("button", { name: /^Save .* to My Plans$/ }).first();
    if (!(await save.count())) throw new Error("no Save to My Plans button found on hobby page");
    await save.click();
    await page.waitForTimeout(300);
    await page.goto(base + "/saved", { waitUntil: "domcontentloaded" });
    await settle(page);
    const empty = await page.getByText(/nothing (saved|here)|empty/i).count();
    if (empty && !(await page.getByRole("button", { name: /remove/i }).count()))
      throw new Error("My Plans still empty after saving");
    await shoot(page, file, vpName);
  });

  // Planner: also record the viewport-only first fold of the form (no itinerary) is NOT taken; itinerary only.
  await ctx.close();
}

await browser.close();
writeFileSync(path.join(outDir, "capture-report.json"), JSON.stringify(report, null, 2));
console.log(`\n${report.captured.length} captured, ${report.notCaptured.length} not captured`);
if (report.notCaptured.length) process.exitCode = 1;
