import potteryNight from "@/assets/hero-pottery-night.jpg";
import tennis from "@/assets/tennis-golden-hour.jpg";
import junkJournal from "@/assets/junk-journal-flatlay.jpg";
import soloCafe from "@/assets/solo-cafe-date.jpg";
import picnic from "@/assets/weekend-picnic.jpg";
import watercolor from "@/assets/watercolor-evening.jpg";
import girlsNight from "@/assets/girls-night-crafts.jpg";
import hiking from "@/assets/hiking-wildflowers.jpg";
import shopPottery from "@/assets/shop-pottery-era.jpg";
import shopCreative from "@/assets/shop-creative-girl.jpg";
import shopSporty from "@/assets/shop-sporty-girl.jpg";
import shopBookish from "@/assets/shop-bookish-girl.jpg";
import shopAdventures from "@/assets/shop-little-adventures.jpg";
import shopGirlsNight from "@/assets/shop-girls-night-in.jpg";
import { extraImages } from "./images.extra";

export type Img = { src: string; alt: string; w: number; h: number };

/** The original 14 images. New ones are added by scripts/ingest-images.mjs (see images.extra.ts). */
const baseImages = {
  potteryNight: {
    src: potteryNight,
    alt: "Three friends laughing while painting cherry-covered mugs at a gingham-covered kitchen table",
    w: 1440,
    h: 1088,
  },
  tennis: {
    src: tennis,
    alt: "A woman in a red cardigan laughing on a tennis court at golden hour",
    w: 896,
    h: 1152,
  },
  junkJournal: {
    src: junkJournal,
    alt: "An open junk journal with tickets, pressed flowers and gingham washi tape on yellow linen",
    w: 1152,
    h: 896,
  },
  soloCafe: {
    src: soloCafe,
    alt: "A woman reading alone at a pink sidewalk café with a croissant and iced coffee",
    w: 896,
    h: 1152,
  },
  picnic: {
    src: picnic,
    alt: "Two friends on a red gingham picnic blanket with farmers market flowers and strawberries",
    w: 1152,
    h: 896,
  },
  watercolor: {
    src: watercolor,
    alt: "A woman painting watercolor flowers at her kitchen table in the evening, laptop closed beside her",
    w: 896,
    h: 1152,
  },
  girlsNight: {
    src: girlsNight,
    alt: "Four friends making beaded bracelets around a mahjong set on a living room table",
    w: 1152,
    h: 896,
  },
  hiking: {
    src: hiking,
    alt: "A woman with a daypack and binoculars on a wildflower hiking trail",
    w: 1152,
    h: 896,
  },
  shopPottery: {
    src: shopPottery,
    alt: "Air-dry clay, wooden sculpting tools and hand-painted little bowls",
    w: 1024,
    h: 1024,
  },
  shopCreative: {
    src: shopCreative,
    alt: "A watercolor set, sketchbook, washi tape, stickers and an embroidery hoop on pink paper",
    w: 1024,
    h: 1024,
  },
  shopSporty: {
    src: shopSporty,
    alt: "A tennis racket, balls, pickleball paddle, water bottle and canvas tote on a green court",
    w: 1024,
    h: 1024,
  },
  shopBookish: {
    src: shopBookish,
    alt: "Paperbacks, a reading journal, book light, floral book sleeve and a tiny book nook",
    w: 1024,
    h: 1024,
  },
  shopAdventures: {
    src: shopAdventures,
    alt: "A gingham picnic blanket, film camera, notebook, binoculars and market tote with flowers",
    w: 1024,
    h: 1024,
  },
  shopGirlsNight: {
    src: shopGirlsNight,
    alt: "Mahjong tiles, card games, bracelet beads and strawberry cookies on a pink gingham table",
    w: 1024,
    h: 1024,
  },
} satisfies Record<string, Img>;

/** Every image on the site is registered here with alt text. See IMAGE-LICENSES.md. */
export const images = { ...baseImages, ...extraImages } satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;
