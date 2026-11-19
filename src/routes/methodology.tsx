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
        beginner would plausibly need. Where a guide names a specific product and brand, we have
        checked that product against its Amazon listing, and the product card says what the listing
        shows and what to double-check. Links go to ordinary Amazon product pages. Where we only
        describe a type of product, the button opens an Amazon search instead, and says so. Items
        sold by third-party sellers are labelled as such.
      </p>
      <h2>Manufacturer claims versus independent testing</h2>
      <p>
        Unless a page says otherwise, we have not independently tested products. Descriptions come
        from general knowledge of the hobby and, where relevant, from the manufacturer or seller.
        Those are claims, not our test results, and we do not present them as personal experience.
      </p>
      <h2>No prices, ratings or review counts</h2>
      <p>
        We show product names and brands only for products we have checked against their Amazon
        listing. We show no prices, discounts, star ratings or review counts, because they change
        often and an out-of-date figure is worse than none. Check the price, reviews, shipping and
        returns on the retailer's page before you buy.
      </p>
      <h2>Last verified dates</h2>
      <p>
        When a story's facts have been checked against sources, we record that date. Stories show
        their publication date, and a "Sources and when we checked" section at the end of the story
        lists the sources and the date the facts were last checked. We do not invent dates. If
        something is wrong, see our <Link to="/corrections">corrections policy</Link>.
      </p>
      <h2>Commercial relationships</h2>
      <p>
        We do not currently earn a commission from our shopping links. If Amazon Associates links
        are activated, the disclosure beside the links changes automatically and this page will be
        updated. That would not change what we recommend. See the{" "}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link> and our{" "}
        <Link to="/editorial-policy">editorial standards</Link>.
      </p>
    </ProsePage>
  ),
});
