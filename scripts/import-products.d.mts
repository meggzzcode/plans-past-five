import type { CatalogProduct, KnownRefs } from "../src/data/catalog-rules";

export const COLUMNS: string[];
export const RESERVED_ID_PREFIXES: string[];
export function decodeCsvBuffer(buf: Buffer): string;
export function parseCsv(
  text: string,
): string[][] & { lines: number[]; unterminatedQuoteLine?: number };
export function checkHeader(rawHeader: string[]): { header: string[]; errors: string[] };
export function rowToProduct(header: string[], cells: string[], issues?: string[]): CatalogProduct;
export function importCsv(
  text: string,
  known?: KnownRefs | null,
  now?: Date,
): { products: CatalogProduct[]; errors: string[]; warnings: string[] };
export function toSourceRecord(p: CatalogProduct): Record<string, unknown>;
