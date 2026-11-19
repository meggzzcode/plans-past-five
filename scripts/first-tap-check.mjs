#!/usr/bin/env node
// First-tap check: can a visitor use the planner and Tonight before the page's JavaScript has loaded,
// and does the page still work with a 4x slower CPU once it has?
//
//   bun run build && node scripts/serve-built.mjs 3000 &
//   NODE_PATH=$(npm root -g) node scripts/first-tap-check.mjs [baseUrl]
//
// Needs Playwright (global) and a Chromium: set CHROMIUM=/path/to/chrome if it is not found.
// Exit code 0 when every check passes. Lab data from one machine, not field data.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const executablePath = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome";
const results = [];
const check = (name, ok, extra = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? `  (${extra})` : ""}`);
};

const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });

/** A page whose scripts are held back until `release()` is called, as on a slow phone. */
async function heldPage(width = 390) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await ctx.newPage();
  let release;
  const gate = new Promise((r) => (release = r));
  await page.route("**/*.js", async (route) => {
    await gate;
    await route.continue();
  });
  return { page, release, ctx };
}

// 1. Planner: tap a choice and the main button before any script has run.
{
  const { page, release, ctx } = await heldPage();
  await page.goto(`${base}/make-plans`, { waitUntil: "domcontentloaded" });
  await page.getByText("Low-key", { exact: true }).click();
  await page.getByText("Cozy", { exact: true }).first().click();
  await page.getByRole("button", { name: /Plan my/ }).click();
  await page.waitForURL(/go=yes/, { waitUntil: "commit" });
  await page.getByTestId("plan-why").waitFor();
  const url = page.url();
  check("planner: before hydration the tap loads a plan with answers in the URL", /energy=low/.test(url) && /vibe=cozy/.test(url), url);
  check("planner: the plan is on the page without JavaScript", await page.getByTestId("plan-why").isVisible());
  const disabled = await page.getByRole("button", { name: /Shuffle/ }).isDisabled();
  check("planner: Shuffle shows a disabled state until hydration", disabled);
  release();
  await page.getByRole("button", { name: /Shuffle/ }).waitFor();
  await page.waitForFunction(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /Shuffle/.test(x.textContent ?? ""));
    return !!b && !b.disabled;
  });
  check("planner: Shuffle turns on once hydrated", true);
  await ctx.close();
}

// 2. Planner choices made before hydration survive hydration.
{
  const { page, release, ctx } = await heldPage();
  await page.goto(`${base}/make-plans`, { waitUntil: "domcontentloaded" });
  await page.getByText("High energy", { exact: true }).click();
  release();
  await page.waitForFunction(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /Plan my/.test(x.textContent ?? ""));
    return !!b;
  });
  await page.waitForTimeout(1500);
  const checked = await page.locator('input[name="energy"]:checked').getAttribute("value");
  check("planner: an answer ticked before hydration is still ticked after", checked === "high", String(checked));
  await ctx.close();
}

// 3. Tonight: answers before hydration travel in the URL.
{
  const { page, release, ctx } = await heldPage();
  await page.goto(`${base}/tools/tonight`, { waitUntil: "domcontentloaded" });
  await page.getByText("Bursting", { exact: true }).click();
  await page.getByRole("button", { name: /Show my 3 ideas/ }).click();
  await page.waitForURL(/e=high/, { waitUntil: "commit" });
  check("tonight: before hydration the tap loads ideas for the chosen answers", /e=high/.test(page.url()), page.url());
  release();
  await ctx.close();
}

// 4. With JavaScript and a 4x slower CPU: first tap works, no reload.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto(`${base}/make-plans`, { waitUntil: "domcontentloaded" });
  // Tap the very first thing as soon as the plan button exists, hydrated or not.
  await page.getByText("Low-key", { exact: true }).click();
  await page.getByRole("button", { name: /Plan my/ }).click();
  await page.getByTestId("plan-why").waitFor({ timeout: 15000 });
  const why = await page.getByTestId("plan-why").innerText();
  check("planner (4x CPU): first tap on a choice and on Plan gives a plan", /low-key/i.test(why), why.slice(0, 80));
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r).length;
console.log(failed ? `${failed} check(s) failed` : "All first-tap checks passed");
process.exit(failed ? 1 : 0);
