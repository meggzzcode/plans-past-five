import { site } from "@/config/site";

export type PublisherConfig = {
  publisherName: string;
  publisherEntityType: string;
  publisherAddress: string;
  publisherUrl: string;
};

export type PublisherLine = {
  /** Full sentence, e.g. "Published by Name (LLC), 1 Street, City." */
  text: string;
  name: string;
  /** Name plus optional entity type, without the leading "Published by". */
  label: string;
  address: string;
  url: string;
};

/**
 * The single source for the "Published by" wording (footer, About, Contact, Terms, Privacy).
 * Returns null until the owner has set a publisher name, so nothing is shown (and nothing is
 * invented) while the config is empty. Never add a fallback name here.
 */
export function publisherLine(cfg: PublisherConfig = site): PublisherLine | null {
  const name = cfg.publisherName.trim();
  if (!name) return null;
  const type = cfg.publisherEntityType.trim();
  const address = cfg.publisherAddress.trim();
  const url = /^https:\/\//.test(cfg.publisherUrl.trim()) ? cfg.publisherUrl.trim() : "";
  const label = type ? `${name} (${type})` : name;
  const text = `Published by ${label}${address ? `, ${address}` : ""}.`;
  return { text, name, label, address, url };
}
