import { site } from "@/config/site";

/** A GA4 measurement ID looks like G-ABC123XYZ9 (G- then 8 to 12 capitals or digits). */
export const GA4_ID = /^G-[A-Z0-9]{8,12}$/;

/** The configured ID when it is valid, otherwise "" (an invalid ID is rejected, never rendered). */
export function validGa4Id(id: string = site.analytics.ga4MeasurementId): string {
  const v = String(id ?? "").trim();
  return GA4_ID.test(v) ? v : "";
}

/**
 * Head scripts for the standard GA4 gtag snippet. Empty array unless a valid ID is set, so with the
 * default settings no third-party script is requested. The ID is validated before it is put in code.
 */
export function ga4Scripts(
  id: string = site.analytics.ga4MeasurementId,
): { src?: string; async?: boolean; children?: string }[] {
  const v = validGa4Id(id);
  if (!v) return [];
  return [
    { src: `https://www.googletagmanager.com/gtag/js?id=${v}`, async: true },
    {
      // Idempotent: the router re-runs head scripts on client navigation, and a second
      // gtag('config') would send an extra page_view each time. The flag makes it run once.
      children: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};if(!window.__ppfGa4){window.__ppfGa4=1;gtag('js',new Date());gtag('config','${v}');}`,
    },
  ];
}
