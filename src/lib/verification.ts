import { site } from "@/config/site";

/** Search Console and Pinterest verification tags, only when the owner has filled them in. */
export function verificationMeta(
  integrations: {
    searchConsoleVerification: string;
    pinterestVerification: string;
  } = site.integrations,
): { name: string; content: string }[] {
  const out: { name: string; content: string }[] = [];
  const g = integrations.searchConsoleVerification.trim();
  const p = integrations.pinterestVerification.trim();
  if (g) out.push({ name: "google-site-verification", content: g });
  if (p) out.push({ name: "p:domain_verify", content: p });
  return out;
}
