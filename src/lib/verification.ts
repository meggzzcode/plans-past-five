import { site } from "@/config/site";

/** Search Console, Bing and Pinterest verification tags, only when the owner has filled them in. */
export function verificationMeta(
  integrations: {
    searchConsoleVerification: string;
    bingVerification?: string;
    pinterestVerification: string;
  } = site.integrations,
): { name: string; content: string }[] {
  const out: { name: string; content: string }[] = [];
  const g = integrations.searchConsoleVerification.trim();
  const b = (integrations.bingVerification ?? "").trim();
  const p = integrations.pinterestVerification.trim();
  if (g) out.push({ name: "google-site-verification", content: g });
  if (b) out.push({ name: "msvalidate.01", content: b });
  if (p) out.push({ name: "p:domain_verify", content: p });
  return out;
}
