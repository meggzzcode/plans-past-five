/** Central brand + site settings. Edit here; every page reads from this file. */
export const site = {
  name: "Plans Past Five",
  domain: "planspastfive.com",
  url: "https://planspastfive.com", // update after the domain is connected
  tagline: "Making a life, not just a living.",
  slogan: "For the plot, not the paycheck.",
  signature: "Professionally off duty.",
  mission: "Helping women fall in love with the life they live outside of work.",
  philosophy: "Your career can be a big part of your life without being your whole life.",
  description:
    "Creative hobbies, cute weekend plans, solo dates, new friendships and little adventures for women building a life they love outside of work.",
  contactEmail: "", // set by owner; contact page hides the address until filled in
  editorialByline: "The Plans Past Five Editors",
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
  integrations: {
    newsletter: { enabled: false, provider: "" as "" | "kit" | "mailerlite", formAction: "" },
    googleAnalyticsId: "",
    searchConsoleVerification: "",
    pinterestVerification: "",
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
