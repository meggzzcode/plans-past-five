import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/methodology")({
  head: () =>
    seo({
      title: "How We Choose Hobbies and Products",
      description:
        "How Plans Past Five picks hobbies and starter products, what manufacturer claims mean here, and why we show no prices or ratings.",
      path: "/methodology",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How We Choose", path: "/methodology" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="How we choose"
      dek="How hobbies and starter products make it onto the site, and what our recommendations are and are not."
      tone="matcha"
    >
      <h2>Choosing hobbies</h2>
      <p>
        We include hobbies that a beginner can realistically start with limited time, a modest
        budget and no special talent. For each one we describe the rough time, cost range, space and
        company it suits, plus an easy first session. We favor variety across creative, social,
        active and quiet options so there is something for different energy levels.
      </p>
      <h2>Choosing products</h2>
      <p>
        Product ideas are starter-kit suggestions grouped by hobby. We pick product types that a
        beginner would plausibly need, and we link to a search or a listing on the retailer so you
        can compare options yourself. Buttons say which of those you are getting: a search results
        page or a specific listing.
      </p>
      <h2>Manufacturer claims versus independent testing</h2>
      <p>
        Unless a page says otherwise, we have not independently tested products. Descriptions come
        from general knowledge of the hobby and, where relevant, from the manufacturer or seller.
        Those are claims, not our test results, and we do not present them as personal experience.
      </p>
      <h2>No prices or ratings</h2>
      <p>
        We do not show prices, star ratings, brands or other details we have not verified, because
        they change often and an out-of-date figure is worse than none. Check the price, reviews and
        availability on the retailer's page before you buy.
      </p>
      <h2>Last verified dates</h2>
      <p>
        When a story's facts have been checked against sources, we record that date. Stories show
        their publication date and any update date, and we revisit them on a regular schedule. If
        something is wrong, see our <Link to="/corrections">corrections policy</Link>.
      </p>
      <h2>Commercial relationships</h2>
      <p>
        Some links may earn us a commission once affiliate programs are active. That does not change
        what we recommend. See the <Link to="/affiliate-disclosure">affiliate disclosure</Link> and
        our <Link to="/editorial-policy">editorial standards</Link>.
      </p>
    </ProsePage>
  ),
});
