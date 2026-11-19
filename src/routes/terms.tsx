import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { commissionStatement } from "@/config/affiliate";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms of Use",
      description:
        "Plain-English ground rules for using Plans Past Five: personal use, sharing and pinning welcome, ideas not advice.",
      path: "/terms",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="Terms of use"
      dek="The ground rules for using this site and its free resources."
      tone="butter"
    >
      <h2>Content</h2>
      <p>
        Stories, images and design on {site.name} are provided for personal, non-commercial use.
        Please don't republish them without permission. Sharing links and pinning pages is very
        welcome.
      </p>
      <h2>Ideas, not instructions</h2>
      <p>
        Our activity and hobby suggestions are general ideas. Use your judgment about safety, local
        conditions, opening hours and costs, and check details with any venue before you go.
      </p>
      <h2>Links and affiliate relationships</h2>
      <p>
        We link to third-party sites. {commissionStatement().long} We do not control
        those sites and are not responsible for their content, prices, products or policies.
      </p>
      <h2>No warranty</h2>
      <p>
        The site is provided as is. We make reasonable efforts to keep information accurate, but we
        do not guarantee it is complete or current, and we are not liable for decisions you make
        based on it. Hobbies are not medical or mental-health treatment.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms; the date below shows the latest version. Last updated{" "}
        {site.legal.lastUpdated}.
      </p>
    </ProsePage>
  ),
});
