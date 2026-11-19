import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { Link } from "@tanstack/react-router";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy",
      description: "How Plans Past Five handles your information.",
      path: "/privacy",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="Privacy policy"
      dek="Short version: we collect very little, and My Plans stays on your device."
      tone="sunday"
    >
      <h2>What we collect</h2>
      <p>
        {site.name} does not have accounts or forms that collect personal information at this time.
        Items you save to My Plans are stored in your browser's local storage on your device and are
        never sent to us.
      </p>
      <h2>Saved items (local storage)</h2>
      <p>
        My Plans uses your browser's local storage to remember what you save. It stays on your
        device, we cannot see it, and you can clear it any time by clearing site data in your
        browser.
      </p>
      <h2>Analytics and newsletter</h2>
      <p>
        No analytics, tracking or newsletter tools are currently active, and we do not set analytics
        cookies. The site is built so that analytics or a newsletter signup can be added later. If
        that happens, this policy will be updated first, including any consent options required
        where you live.
      </p>
      <h2>Affiliate links and cookies</h2>
      <p>
        Some links to retailers such as Amazon may become affiliate links. When you click one, the
        retailer may set its own cookies to record that you came from us, so we can earn a small
        commission at no extra cost to you. Those cookies are set by the retailer, under its own
        privacy policy, not by us. See the{" "}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
      <h2>Third-party links</h2>
      <p>
        Links to other websites, including Amazon and Pinterest, are governed by those sites' own
        privacy policies.
      </p>
      <h2>Fonts</h2>
      <p>
        Web fonts are loaded from Google Fonts, which may receive your IP address as part of
        delivering the font files.
      </p>
      {site.contactEmail ? (
        <>
          <h2>Contact</h2>
          <p>
            Questions about privacy: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            .
          </p>
        </>
      ) : null}
      <p>Last updated {site.legal.lastUpdated}.</p>
    </ProsePage>
  ),
});
