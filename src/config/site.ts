import settingsJson from "../../content/settings.json";

/**
 * OWNER SETTINGS live in content/settings.json (edited in Pages CMS > Site settings, validated with
 * plain-English messages by `node scripts/build-content.mjs`, which runs before every build). This
 * file only reads them; everything else below is fixed brand copy. Public values only: never put a
 * password, API key or private token in settings.
 */
export type OwnerSettings = {
  siteName: string;
  tagline: string;
  siteUrl: string;
  contactEmail: string;
  ga4MeasurementId: string;
  searchConsoleVerification: string;
  bingVerification: string;
  pinterestVerification: string;
  amazonTrackingId: string;
  amazonMarketplace: string;
  amazonTrackingEnabled: boolean;
  amazonLastVerified: string;
};
const text = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
const raw = settingsJson as Record<string, unknown>;
/** Defensive read (the build has already validated the file; a bad value here is never trusted). */
export const ownerSettings: OwnerSettings = {
  siteName: text(raw["siteName"], "Plans Past Five") || "Plans Past Five",
  tagline: text(raw["tagline"]),
  siteUrl: text(raw["siteUrl"]).replace(/\/+$/, ""),
  contactEmail: text(raw["contactEmail"]),
  ga4MeasurementId: text(raw["ga4MeasurementId"]),
  searchConsoleVerification: text(raw["searchConsoleVerification"]),
  bingVerification: text(raw["bingVerification"]),
  pinterestVerification: text(raw["pinterestVerification"]),
  amazonTrackingId: text(raw["amazonTrackingId"]),
  amazonMarketplace: text(raw["amazonMarketplace"], "amazon.com") || "amazon.com",
  amazonTrackingEnabled: raw["amazonTrackingEnabled"] === true,
  amazonLastVerified: text(raw["amazonLastVerified"]),
};

const hostOf = (u: string) => {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
};

/** Analytics: the ONE place it is configured is content/settings.json (empty = no analytics). */
const analytics = { ga4MeasurementId: ownerSettings.ga4MeasurementId };

/** Central brand + site settings. Edit here; every page reads from this file. */
export const site = {
  name: ownerSettings.siteName,
  domain: hostOf(ownerSettings.siteUrl).replace(/^www\./, ""),
  url: ownerSettings.siteUrl,
  tagline: ownerSettings.tagline,
  slogan: "For the plot, not the paycheck.",
  signature: "Professionally off duty.",
  mission: "Helping women fall in love with the life they live outside of work.",
  philosophy: "Your career can be a big part of your life without being your whole life.",
  description:
    "Creative hobbies, cute weekend plans, solo dates, new friendships and little adventures for women building a life they love outside of work.",
  contactEmail: ownerSettings.contactEmail,
  editorialByline: `The ${ownerSettings.siteName} Editors`,
  social: {
    pinterest: "", // e.g. https://pinterest.com/planspastfive
    instagram: "",
    tiktok: "",
  },
  legal: {
    ownerName: "", // legal business name, set by owner
    jurisdiction: "",
    lastUpdated: "2026-11-19",
  },
  /**
   * Who publishes the site. All four stay empty until the owner chooses (see
   * docs/buyer/PUBLISHER-SETUP.md). While empty, no "Published by" line is shown anywhere.
   * Only src/lib/publisher.ts reads these, so the wording is identical on every page.
   */
  publisherName: "", // the owner's name, a business name/DBA, or a registered company name
  publisherEntityType: "", // free text, e.g. "sole proprietor", "DBA", "LLC"; optional
  publisherAddress: "", // a real postal, PO box or registered-agent address; optional
  publisherUrl: "", // https:// link to the publisher's own page; optional
  analytics,
  integrations: {
    newsletter: { enabled: false, provider: "" as "" | "kit" | "mailerlite", formAction: "" },
    googleAnalyticsId: analytics.ga4MeasurementId, // follows analytics.ga4MeasurementId; do not set separately
    searchConsoleVerification: ownerSettings.searchConsoleVerification,
    bingVerification: ownerSettings.bingVerification,
    pinterestVerification: ownerSettings.pinterestVerification,
  },
} as const;

export const phrases = [
  "Professionally off duty.",
  "More hobbies. Fewer meetings.",
  "Sorry, I have plans past five.",
  "Being good at it is completely optional.",
  "Let's give Saturday a storyline.",
  "Your calendar deserves more than meetings.",
  "In my hobby era.",
  "No experience, just enthusiasm.",
  "Make plans with yourself.",
  "Do it for the plot.",
  "Your free time doesn't need a performance review.",
  "Some things are worth being a beginner at.",
] as const;
