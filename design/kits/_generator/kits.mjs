// Kit manifests: what goes in each premium package, cover mockup, START-HERE and usage terms text.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { site, D } from "../../printables/_generator/lib.mjs";
import { docs as hobbyDocs } from "./kit-hobby.mjs";
import { docs as weekendDocs } from "./kit-weekend.mjs";

const TERMS_NOTICE =
  "[DRAFT FOR OWNER REVIEW: plain-language starter terms, not legal advice. The owner must review and edit these, add the business name and contact details, and have a qualified professional check them before any sale.]";

export function usageTermsText(productName) {
  return `${TERMS_NOTICE}

${productName.toUpperCase()}: PERSONAL USE TERMS

What you can do
- Print these pages as many times as you like for yourself and your household.
- Print them for a small, informal gathering you host (for example, handing a worksheet to a friend at a craft night).
- Write on them, cut them up, punch holes in them, put them in a binder.
- Store the files on your own devices and back them up.

What you can't do
- Resell, share, post, upload or give away the files, in whole or in part, including as a bundle or a free download.
- Sell printed copies, or use the pages in a paid class, course, workshop or commercial product.
- Claim the designs as your own, or remove the ${site.name} name and footer.
- Use the pages as source material for AI training datasets.

Fonts and artwork
The artwork is original to ${site.name}. Fonts are open-source (SIL Open Font License) and are embedded in the PDFs.

Digital products
Because these are instant digital files, refunds and support are handled as described at checkout. [OWNER: add your refund and support policy here.]

Questions
[OWNER: add business name and contact email.]

These pages are for planning and personal enjoyment. They are not financial, health or professional advice.
`;
}

const mkStart = (name, files) => (counts) =>
  `${name.toUpperCase()}
${site.name} · ${site.tagline}

Thank you for downloading!

WHAT'S INSIDE
${counts
  .map(
    (c, i) =>
      `${String(i + 1).padStart(2, "0")}. ${c.file
        .replace(/^\d+-/, "")
        .replace(/\.pdf$/, "")
        .replace(/-/g, " ")} (${c.pages} pages)`,
  )
  .join("\n")}

HOW TO PRINT
- Open any PDF and print at 100% / "Actual size" on US Letter paper.
- Turn on "Background graphics" if your printer settings offer it, for full color.
- For the cards, thicker paper or card stock works best. Cut along the dashed lines.
- Not all printers are the same: do a test page first.
- You can also fill the pages in digitally using a PDF annotation or note-taking app.

TIPS
${files}

Please see USAGE-TERMS.txt for how you can use these files.
`;

const hobbyTips =
  "- Start with file 01 (the discovery workbook) and 02 (worksheets), then pick a hobby and use file 04 (the 30-day journal).\n- Print a month at a time from the calendar so your pages stay fresh.\n- Reprint the worksheets as often as you like for yourself.";
const weekendTips =
  "- Print the weekend planner a few pages at a time and keep it in a folder.\n- Cards work best cut into a jar of ideas to pull from.\n- Use the hosting checklists a week ahead of a gathering.";

const pageImg = (dir, name, idx) =>
  pathToFileURL(path.join(dir, `${name}-${String(idx).padStart(2, "0")}.png`)).href;

function mockCover({ eyebrow, title, subtitle, items, previews, pagesDir, total, bg }) {
  const imgs = previews.slice(0, 4);
  const rot = [-8, 4, -3, 9],
    pos = [
      [930, 110],
      [1190, 330],
      [990, 640],
      [770, 560],
    ],
    w = 330;
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../printables/brand.css">
<style>html,body{margin:0;background:${bg}}body{width:1600px;height:1200px;position:relative;overflow:hidden;font-family:var(--sans)}
.gb{position:absolute;left:0;right:0;height:56px;background-color:var(--cream);background-image:repeating-linear-gradient(0deg,rgba(184,63,67,.4) 0 28px,transparent 28px 56px),repeating-linear-gradient(90deg,rgba(184,63,67,.4) 0 28px,transparent 28px 56px)}
.p{position:absolute;width:${w}px;box-shadow:0 14px 34px rgba(72,54,46,.32);border:1px solid rgba(72,54,46,.1);background:#fffcf8}
h1{font-family:var(--display);font-style:italic;font-weight:600;color:var(--cherry);font-size:96px;line-height:.98;letter-spacing:-.025em;margin:0}
.k{font-size:19px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--cherry)}
li{font-size:25px;margin:11px 0;list-style:none;display:flex;gap:14px;align-items:center}li:before{content:"";width:14px;height:14px;background:var(--cherry);transform:rotate(45deg);flex:none}
.badge{display:inline-block;background:var(--cherry);color:var(--cream);padding:12px 26px;border-radius:99px;font-weight:700;font-size:20px;letter-spacing:.16em;text-transform:uppercase}</style></head><body>
<div class="gb" style="top:0"></div><div class="gb" style="bottom:0"></div>
<div style="position:absolute;left:90px;top:130px;width:640px">
<div style="font-family:var(--display);color:var(--cherry);font-size:34px">plans past <b style="font-style:italic;font-size:1.45em;letter-spacing:-.04em;color:var(--cherry)">five.</b></div>
<p class="k" style="margin-top:70px">${eyebrow}</p><h1 style="margin-top:20px">${title}</h1>
<p style="font-size:26px;line-height:1.4;margin-top:26px;color:var(--espresso)">${subtitle}</p>
<ul style="padding:0;margin:30px 0 0">${items.map((i) => `<li>${i}</li>`).join("")}</ul></div>
<div style="position:absolute;left:90px;bottom:110px"><span class="badge">Printable PDF bundle · ${total} pages</span></div>
${imgs.map((src, i) => `<img class="p" src="${src}" style="left:${pos[i][0]}px;top:${pos[i][1]}px;transform:rotate(${rot[i]}deg);width:${w + (i === 1 ? 40 : 0)}px">`).join("")}
</body></html>`;
}

const hobbyPrev = [
  ["01-hobby-discovery-workbook", 1],
  ["01-hobby-discovery-workbook", 6],
  ["08-printable-activity-cards", 2],
  ["05-monthly-hobby-calendar", 4],
];
const weekPrev = [
  ["01-weekend-planner", 1],
  ["01-weekend-planner", 3],
  ["03-girls-night-activity-cards", 2],
  ["06-hosting-checklists", 2],
];
const total = (docs) => docs.reduce((n, d) => n + d.pages.length, 0);

export const kits = [
  {
    id: "hobby-era-kit",
    title: "The Plans Past Five Hobby Era Kit",
    packageName: "plans-past-five-hobby-era-kit",
    docs: hobbyDocs,
    previewPages: hobbyPrev,
    startHere: mkStart("The Plans Past Five Hobby Era Kit", hobbyTips),
    usageTerms: () => usageTermsText("The Plans Past Five Hobby Era Kit"),
    coverHtml: ({ pagesDir }) =>
      mockCover({
        eyebrow: "A printable kit",
        title: "The Hobby<br>Era Kit",
        subtitle: "Find your hobby, test it cheaply, budget for it and make it a habit.",
        items: [
          "Discovery workbook",
          "Interest worksheets",
          "Hobby budget planner",
          "30-day challenge journal",
          "Monthly calendar and project planner",
          "Reflection journal, cards and supply lists",
        ],
        previews: hobbyPrev.map(([n, i]) => pageImg(pagesDir, n, i)),
        pagesDir,
        total: total(hobbyDocs),
        bg: "#f8e5a3",
      }),
  },
  {
    id: "weekend-edit-kit",
    title: "The Weekend Edit & Girls' Night Kit",
    packageName: "plans-past-five-weekend-edit-girls-night-kit",
    docs: weekendDocs,
    previewPages: weekPrev,
    startHere: mkStart("The Weekend Edit & Girls' Night Kit", weekendTips),
    usageTerms: () => usageTermsText("The Weekend Edit & Girls' Night Kit"),
    coverHtml: ({ pagesDir }) =>
      mockCover({
        eyebrow: "A printable kit",
        title: "The Weekend<br>Edit &amp;<br>Girls' Night",
        subtitle: "Plan better weekends, solo dates and nights in with friends.",
        items: [
          "Weekend planner (8 spreads)",
          "Solo date and girls' night cards",
          "Craft night and book club planners",
          "Hosting checklists and budget sheets",
          "Seasonal bucket lists and templates",
        ],
        previews: weekPrev.map(([n, i]) => pageImg(pagesDir, n, i)),
        pagesDir,
        total: total(weekendDocs),
        bg: "#f4d4d7",
      }),
  },
];
