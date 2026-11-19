import type { Article } from "./types";

export const articleWatercolorPaintingForBeginners: Article = {
  slug: "watercolor-painting-for-beginners",
  title: "Watercolor Painting for Beginners: Supplies, Techniques and First Projects",
  titleItalic: "Watercolor Painting",
  dek: "A small supply list, a few techniques worth learning first, and three projects that make practice feel like painting.",
  category: "creative-corner",
  status: "draft",
  publishedAt: "",
  hero: "watercolor",
  searchIntent:
    "watercolor painting for beginners / watercolor supplies / easy watercolor projects",
  angle:
    "A calm, practice-first guide: buy little, learn water control before drawing skill, and finish three small projects that look good without being good at drawing",
  hobbies: ["watercolor-painting", "outdoor-sketching"],
  productIds: ["watercolor-sets", "watercolor-sketchbooks", "portable-watercolor"],
  sources: [
    {
      title: "ACMI: materials safety",
      url: "https://www.acmiart.org/materials-safety",
      note: "AP seal = non-toxic when used as intended; CL seal = carries health warnings",
    },
    {
      title: "CPSC: art and craft material safety",
      url: "https://www.cpsc.gov/s3fs-public/5015.pdf",
      note: "Avoid materials with lead, cadmium and other heavy metals",
    },
    {
      title: "ACMI partners: how the labeling law (LHAMA) affects you",
      url: "https://partners.acmiart.org/index.php/art-material-safety/lhama-how-does-it-affect-you",
      note: "Labeling law explained",
    },
  ],
  coworkChecks: [
    "VERIFIED 2026-11-18: ACMI AP seal means non-toxic when used as intended; CL seal means health warnings on the label - acmiart.org",
    "VERIFIED 2026-11-18: some pigments (lead, cadmium, other heavy metals) can be toxic; read labels - cpsc.gov, acmiart.org",
    "RESOLVED 2026-11-19: starter spend ($20-$50) - removed; verification found no source for prices",
    "OPEN: 'never point a brush with your mouth' has no source in the verification file; either source it or remove",
    "OPEN: no verification covered technique or materials - paper weight (300 gsm / 140 lb) and buckling, cold-press for beginners, student vs artist grade, brush sizing, taping paper, light-to-dark painting, brush care",
    "OPEN: confirm descriptions of flat wash, graded wash, wet-on-wet and wet-on-dry, and that pans need a few minutes of wetting, are accurate",
    "OPEN: 'a non-toxic claim on a specific paint' must be read off the maker's label or ACMI list per product; article makes no such claim, but the later product pass must not add one unchecked",
  ],
  related: [
    "creative-hobbies-you-can-start-at-home",
    "creative-hobby-starter-kits-worth-considering",
    "how-to-start-junk-journaling",
  ],
  body: [
    {
      type: "p",
      text: "Imagine a rainy Sunday with a mug going cold and a small pad of paper. You have no plan, only a vague wish to make something that is not an email. Watercolor is a good answer, mostly because it forgives an unplanned afternoon.",
    },
    {
      type: "p",
      text: "It also has a reputation for being fussy, which puts people off. The truth is that most of the difficulty is water, not drawing. Learn how paint and water behave and the pictures follow, even if you cannot sketch a convincing teapot.",
    },
    { type: "h2", text: "Why it is worth trying", id: "why" },
    {
      type: "p",
      text: "A small painting takes about as long as a long coffee. It suits beginners because the techniques are few and practicing them already looks pretty: a soft blue wash is a nice thing by itself. Start-up effort is modest, with a small set, one brush and decent paper. Some things are worth being a beginner at, and this is one of them.",
    },
    { type: "h2", text: "What you need", id: "need" },
    {
      type: "p",
      text: "Paper matters more than anything else. Thin paper buckles and shows every mistake, so a heavier, textured watercolor paper makes a beginner feel better at it than they are.",
    },
    {
      type: "whatYoullNeed",
      essentials: [
        "A small pan or tube set of watercolors, student grade is fine",
        "Watercolor paper or a watercolor sketchbook, heavier than ordinary sketch paper",
        "One round brush in a middling size",
        "A jar of water and a cloth or paper towel",
        "A plate or old saucer for mixing",
      ],
      optional: [
        "A second, smaller brush for details",
        "Masking tape to hold paper flat",
        "A travel set with a built-in palette",
        "A fine pen for outlines",
      ],
    },
    {
      type: "p",
      text: "**What you probably own.** A plate for mixing, a jar for water, a hairdryer for impatient moments, and a hard surface to work on. A mug that you do not drink from afterwards is handy for rinsing.",
    },
    {
      type: "p",
      text: "**What each type does for you.** A pan set is the least fuss, since you wet it and paint. A sketchbook of proper watercolor paper keeps all your practice in one place. A portable set makes painting something you can do on a park bench or at a café table, which suits a slow outdoor afternoon.",
    },
    {
      type: "saveSplurge",
      save: "A small student-grade set and a sketchbook of watercolor paper.",
      splurge:
        "Better paper first. It improves every painting more than expensive paint does. Artist-grade paints can wait.",
    },
    {
      type: "p",
      text: "Prices vary by shop and brand. Read labels before you buy: avoid materials with lead, cadmium and other heavy metals. Look for the AP seal from ACMI, which marks products certified non-toxic when used as intended; a CL seal means the product carries health warnings. Wash up after painting, and never point a brush with your mouth.",
    },
    { type: "h2", text: "Four techniques, in the order they help", id: "techniques" },
    {
      type: "item",
      n: 1,
      title: "Flat wash",
      note: "Load the brush, then pull an even stripe of color across dry paper, picking up the bead of pigment at the bottom of each stroke. This is the sky, the table, the background of nearly everything.",
    },
    {
      type: "item",
      n: 2,
      title: "Graded wash",
      note: "Start with strong color at the top and add more water as you go down, so it fades to nothing. It is the quickest way to make a sunset look deliberate.",
    },
    {
      type: "item",
      n: 3,
      title: "Wet-on-wet",
      note: "Touch color to paper that is already damp and watch it bloom. It is unpredictable and delightful, and perfect for clouds, petals and moody backgrounds.",
    },
    {
      type: "item",
      n: 4,
      title: "Wet-on-dry",
      note: "Paint onto fully dry paper for crisp edges. Use it for details once a wash has dried, like leaves on a branch or a window frame.",
    },
    {
      type: "p",
      text: "Generally, paint light to dark. Leave bare paper where you want a highlight, because getting white back later is hard.",
    },
    { type: "h2", text: "Your first evening", id: "first-session" },
    {
      type: "first30",
      steps: [
        "Tape the edges of a sheet to a board or a table if you have masking tape. It helps the paper stay flat.",
        "Wet your paints for a couple of minutes so they soften, and fill your water jar.",
        "Paint a flat wash across the top half of the page, then a graded wash below it.",
        "While it is still damp, drop in a second color and watch what it does.",
        "Let everything dry completely, then add one detail on top with the tip of the brush.",
        "Peel the tape slowly. Put the page somewhere you will see it.",
      ],
    },
    { type: "h2", text: "Three small projects that look better than they should", id: "projects" },
    {
      type: "item",
      title: "A sunset gradient",
      note: "A graded wash from warm yellow into pink and a dusty purple, with a dark strip of hills painted on top once it is dry.",
      time: "About 30 minutes",
    },
    {
      type: "item",
      title: "A wet-on-wet bouquet",
      note: "Dab blobs of color onto damp paper, then add a few green stems and leaves after it dries. The flowers are just soft shapes.",
      time: "About 40 minutes",
    },
    {
      type: "item",
      title: "A color-swatch card",
      note: "Paint a grid of small squares, mixing a new shade for each. It is practice, a reference chart and a handsome little card at once.",
      time: "About 20 minutes",
    },
    { type: "h2", text: "Common mistakes and troubleshooting", id: "troubleshooting" },
    {
      type: "item",
      title: "The paper has buckled",
      note: "Too much water on thin paper. Switch to heavier paper, tape it down, and let it dry flat under a book.",
    },
    {
      type: "item",
      title: "The colors turned muddy",
      note: "Too many colors mixed, or layers painted over damp paint. Mix two colors at most and wait for each layer to dry.",
    },
    {
      type: "item",
      title: "It looks washed out",
      note: "Watercolor dries lighter than it looks wet. Add more pigment and less water next time, and layer a second coat once it is dry.",
    },
    {
      type: "shopHobby",
      title: "Shop the hobby",
      dek: "A small set and good paper are plenty to begin.",
      productIds: ["watercolor-sets", "watercolor-sketchbooks", "portable-watercolor"],
    },
    {
      type: "tryThisWeekend",
      text: "Pocket a small set on your next walk and paint the same view twice, once quickly and once slowly. Compare the two.",
    },
    {
      type: "p",
      text: "If you would like a small ready-made box instead of loose pieces, [Creative Hobby Starter Kits That Are Actually Worth Considering](/journal/creative-hobby-starter-kits-worth-considering) explains what to look for.",
    },
    { type: "ifYouLoved", hobbies: ["outdoor-sketching", "collage-art", "calligraphy"] },
  ],
};
