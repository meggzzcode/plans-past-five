import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/privacy")({
  head: () => seo({ title: "Privacy Policy", description: "How Plans Past Five handles your information.", path: "/privacy" }),
  component: () => (
    <ProsePage kicker="The fine print" title="Privacy policy" dek="Short version: we collect very little, and My Plans stays on your device." tone="sunday">
      <p><em>This is a starter policy. The site owner should review it with a qualified professional before launch, especially before enabling analytics or a newsletter.</em></p>
      <h2>What we collect</h2>
      <p>{site.name} does not have accounts or forms that collect personal information at this time. Items you save to My Plans are stored in your browser's local storage on your device and are never sent to us.</p>
      <h2>Analytics and newsletter</h2>
      <p>No analytics or newsletter tools are currently active. If they are added, this policy will be updated first, including any consent options required where you live.</p>
      <h2>Third-party links</h2>
      <p>Links to other websites, including Amazon and Pinterest, are governed by those sites' own privacy policies.</p>
      <h2>Fonts</h2>
      <p>Web fonts are loaded from Google Fonts, which may receive your IP address as part of delivering the font files.</p>
      <p>Last updated {site.legal.lastUpdated}.</p>
    </ProsePage>
  ),
});
