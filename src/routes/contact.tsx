import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { Link } from "@tanstack/react-router";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact",
      description:
        "Story ideas, corrections and partnership questions for Plans Past Five, and how we handle each.",
      path: "/contact",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="Contact"
      title="Say hello."
      italic="hello."
      dek="Story ideas, corrections, partnership questions or just a hobby you think we should write about."
      tone="sunday"
    >
      {site.contactEmail ? (
        <p>
          Email us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We read
          everything, though we can't always reply individually.
        </p>
      ) : (
        <p>
          Our public inbox isn't open yet, and we won't show an address until it is. When it opens,
          it will appear here. Until then, take the <Link to="/hobby-finder">hobby quiz</Link>,
          build a plan on <Link to="/make-plans">Make Some Plans</Link> or keep ideas in{" "}
          <Link to="/saved">My Plans</Link>. None of it needs an account.
        </p>
      )}
      <h2>Corrections</h2>
      <p>
        If something in a story is wrong or out of date, we want to know. Please include the page
        link and what needs fixing. See our <Link to="/corrections">corrections policy</Link>.
      </p>
      <h2>Brands and partnerships</h2>
      <p>
        We don't accept payment for editorial coverage. See our{" "}
        <Link to="/editorial-policy">editorial standards</Link> for how we choose what to recommend.
      </p>
    </ProsePage>
  ),
});
