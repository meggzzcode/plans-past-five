// Renders PRESENTATION.html to PRESENTATION.pdf (US Letter landscape, backgrounds on).
// Usage: node docs/marketplace/presentation/render-pdf.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const { chromium } = createRequire(import.meta.url)("playwright");
const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(dir, "PRESENTATION.html")).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
// Overflow check: report any slide whose content spills past its box.
const over = await page.evaluate(() =>
  [...document.querySelectorAll(".slide")].flatMap((s, i) => {
    const r = s.getBoundingClientRect();
    return [...s.querySelectorAll(".body, .body *, .foot")]
      .filter((e) => {
        const b = e.getBoundingClientRect();
        return b.bottom > r.bottom - 2 || b.right > r.right + 1;
      })
      .slice(0, 3)
      .map(
        (e) =>
          `slide ${i + 1}: ${e.tagName}.${e.className} bottom ${Math.round(e.getBoundingClientRect().bottom - r.bottom)}`,
      );
  }),
);
console.log(over.length ? "OVERFLOW:\n" + over.join("\n") : "no overflow detected");
await page.pdf({
  path: path.join(dir, "PRESENTATION.pdf"),
  width: "11in",
  height: "8.5in",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
