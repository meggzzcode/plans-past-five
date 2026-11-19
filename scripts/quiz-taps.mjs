#!/usr/bin/env node
// Counts the taps from the home page to a product button through the hobby quiz.
//
//   node scripts/serve-built.mjs 5972 &        (after `bun run build`)
//   NODE_PATH=$(npm root -g) node scripts/quiz-taps.mjs http://127.0.0.1:5972
//
// A "tap" is a click that changes what the visitor sees. The journey is: home -> "Find a Hobby" ->
// one tap per question that is asked (the quiz skips what earlier answers imply) -> on the result,
// the product's own button. The final tap on the Amazon button is counted but not performed (the
// link target is read, not opened). Lab data from one machine. Set CHROMIUM if Chrome is elsewhere.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const executablePath =
  process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome";

// Each path is the option index to tap on every question that is asked (clamped to what is offered).
const paths = [
  { name: "creative, low energy, solo, cheap", picks: [0, 0, 0, 1] },
  { name: "creative, medium energy, friends, flexible", picks: [0, 1, 1, 3] },
  { name: "relaxation, low energy, solo, under $25", picks: [1, 0, 0, 1] },
  { name: "friendship, medium energy, any, under $50", picks: [3, 1, 2, 2] },
];

const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
const rows = [];
for (const p of paths) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  let taps = 0;
  await page.locator('main a[href="/hobby-finder"]').first().click();
  taps++;
  await page.waitForURL(/hobby-finder/);
  let asked = 0;
  for (let guard = 0; guard < 10; guard++) {
    await page.waitForSelector('main button[aria-pressed], [aria-label^="Your answers"]');
    if ((await page.locator('[aria-label^="Your answers"]').count()) > 0) break; // results
    const options = page.locator("main button[aria-pressed]");
    const n = await options.count();
    const idx = Math.min(p.picks[asked] ?? 0, n - 1);
    await options.nth(idx).click();
    taps++;
    asked++;
    await page.waitForTimeout(400);
  }
  await page.waitForLoadState("networkidle");
  // Result page: a product button is either already on the page, or behind the "starter list" tap.
  const buy = page.locator('main a[href*="amazon."]');
  const starter = page.getByRole("link", { name: /starter list/i });
  const result = { name: p.name, questions: asked, tapsToResult: taps };
  result.productOnResultWithoutTap = (await buy.count()) > 0 && (await starter.count()) === 0;
  if ((await starter.count()) > 0) {
    await starter.first().click();
    taps++;
    result.extraTap = "Get my starter list";
  }
  result.productButton = (await buy.count()) > 0;
  result.tapsToProductButtonClick = result.productButton ? taps + 1 : null;
  result.url = page.url().replace(base, "");
  rows.push(result);
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(rows, null, 2));
