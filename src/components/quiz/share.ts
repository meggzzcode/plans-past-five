/**
 * Client-side sharing for a quiz result: render the card to a PNG with <canvas> (no backend),
 * then hand it to the shared sendToGroupChat helper (src/lib/share.ts). Nothing personal is
 * in the card or the link: only the persona, three hobby names and the encoded quiz choices.
 */
import { images } from "@/data/images";
import type { Hobby } from "@/data/hobbies";
import { wrapText, type Persona } from "@/lib/finder";
import { site } from "@/config/site";

const W = 1080;
const H = 1350;
const INK = "#2a1f1d";
const CHERRY = "#b83f43";
const CREAM = "#fbf5ea";

export const firstSentence = (s: string) => s.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? s;

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const r = Math.max(w / img.width, h / img.height);
  const sw = w / r;
  const sh = h / r;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
}

/** Draws the share card and returns it as a PNG blob. */
export async function renderCardPng(persona: Persona, picks: Hobby[]): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = CHERRY;
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, W - 72, H - 72);
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = "600 30px Georgia, serif";
  ctx.fillText("M Y   H O B B Y   E R A", W / 2, 110);
  ctx.fillStyle = CHERRY;
  ctx.font = "italic 84px Georgia, serif";
  const nameLines = wrapText(persona.name, 20);
  nameLines.forEach((l, i) => ctx.fillText(l, W / 2, 215 + i * 90));
  const afterName = 215 + (nameLines.length - 1) * 90;
  ctx.fillStyle = INK;
  ctx.font = "34px Georgia, serif";
  const lines = wrapText(firstSentence(persona.line), 44).slice(0, 2);
  lines.forEach((l, i) => ctx.fillText(l, W / 2, afterName + 70 + i * 46));

  const top = afterName + 70 + lines.length * 46 + 40;
  const rowH = Math.min(250, (H - 150 - top) / Math.max(1, picks.length));
  const thumb = rowH - 24;
  for (const [i, h] of picks.slice(0, 3).entries()) {
    const y = top + i * rowH;
    const src = h.image ? images[h.image]?.src : undefined;
    const img = src ? await loadImage(src) : null;
    if (img) drawCover(ctx, img, 90, y, thumb * 1.25, thumb);
    else {
      ctx.fillStyle = "#f6dcdc";
      ctx.fillRect(90, y, thumb * 1.25, thumb);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = INK;
    ctx.font = "italic 50px Georgia, serif";
    const x = 90 + thumb * 1.25 + 36;
    wrapText(h.name, 16)
      .slice(0, 2)
      .forEach((l, k) => ctx.fillText(l, x, y + 70 + k * 56));
    ctx.fillStyle = CHERRY;
    ctx.font = "28px Georgia, serif";
    ctx.fillText(`${h.timeLabel} · ${h.costLabel}`, x, y + thumb - 16);
    ctx.textAlign = "center";
  }
  ctx.fillStyle = INK;
  ctx.font = "28px Georgia, serif";
  ctx.fillText(`${site.name} · ${site.domain}`, W / 2, H - 80);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("png failed"))), "image/png"),
  );
}

export const fileNameFor = (persona: Persona) => `my-hobby-era-${persona.key}.png`;

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
