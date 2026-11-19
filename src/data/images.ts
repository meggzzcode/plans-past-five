import { extraImages } from "./images.extra";
import { generatedImages } from "./images.generated";

export type Img = { src: string; alt: string; w: number; h: number };

/**
 * Every image on the site is registered with alt text. See IMAGE-LICENSES.md.
 * The pictures live in content/images/*.json (edited in Pages CMS, Images section);
 * scripts/build-content.mjs turns them into ./images.generated.ts before every build.
 * ./images.extra.ts is the older command-line importer (scripts/ingest-images.mjs).
 */
export const images = { ...generatedImages, ...extraImages } satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;
