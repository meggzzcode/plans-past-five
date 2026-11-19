import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { commissionStatement } from "@/config/affiliate";
import { site } from "@/config/site";
import { validGa4Id } from "@/lib/analytics";
import { Link } from "@tanstack/react-router";
import { ProsePage } from "@/components/pages/ProsePage";
import { PublishedBy } from "@/components/layout/PublishedBy";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy",
      description: `What ${site.name} collects (very little), what stays on your device, and how to clear it.`,
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
      <h2>Your town or postcode (optional)</h2>
      <p>
        If you type a town or postcode to get "near you" search links, it is kept in your browser's
        local storage on your device only. We never receive it. It is used only to build a Google
        Maps search link that opens in a new tab, so Google sees it only if you open that link. We
        do not use your device's location. Calendar files are made in your browser and are not
        uploaded.
      </p>
      <h2>Analytics and newsletter</h2>
      <p>
        {validGa4Id()
          ? "This site uses Google Analytics to count visits and see which pages are read. Google may set cookies or identifiers in your browser for this."
          : "No analytics, tracking or newsletter tools are currently active, and we do not set analytics cookies. The site is built so that analytics or a newsletter signup can be added later. If that happens, this policy will be updated first, including any consent options required where you live."}
      </p>
      <h2>Affiliate links and cookies</h2>
      <p>
        {commissionStatement().live
          ? "Some links to retailers such as Amazon are affiliate links. When you click one, the retailer may set its own cookies to record that you came from us. "
          : "Our links to retailers such as Amazon are ordinary links today. If they become affiliate links, the retailer may set its own cookies when you click one, to record that you came from us. "}
        {commissionStatement().long} Those cookies are set by the retailer, under its own privacy
        policy, not by us. See the <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
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
      <PublishedBy />
      <p>Last updated {site.legal.lastUpdated}.</p>
    </ProsePage>
  ),
});
