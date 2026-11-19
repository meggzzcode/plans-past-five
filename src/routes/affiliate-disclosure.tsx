import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import {
  AMAZON_ASSOCIATE_STATEMENT,
  AMAZON_PROGRAM_STATEMENT,
  affiliateRegistry,
  isEntryLive,
  isMonetized,
  liveEntries,
} from "@/config/affiliate";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () =>
    seo({
      title: "Affiliate Disclosure",
      description: "How shopping links work on Plans Past Five.",
      path: "/affiliate-disclosure",
    }),
  component: () => {
    const amazonLive = isEntryLive(affiliateRegistry["amazon"]);
    return (
      <ProsePage
        kicker="The fine print"
        title="Affiliate disclosure"
        dek="Plain-English details about our shopping links."
        tone="butter"
      >
        {isMonetized() ? (
          <>
            {amazonLive && (
              <p>
                {site.name} {AMAZON_PROGRAM_STATEMENT} {AMAZON_ASSOCIATE_STATEMENT} We earn at no
                extra cost to you.
              </p>
            )}
            {liveEntries()
              .filter((e) => e.id !== "amazon")
              .map((e) => (
                <p key={e.id}>
                  Some links go to {e.retailer} through the {e.network} affiliate program. If you
                  buy through them we may earn a commission at no extra cost to you.
                </p>
              ))}
          </>
        ) : (
          <p>
            Our shopping links currently open ordinary Amazon search results so you can compare
            options yourself. {site.name} does not currently earn a commission from these links. If
            that changes, this page and the notes beside our links will be updated before any
            commission links go live.
          </p>
        )}
        <h2>How we recommend things</h2>
        <ul>
          <li>
            We recommend product <strong>types</strong> (like "a beginner watercolor set") and
            explain what to look for, rather than pushing one brand.
          </li>
          <li>
            We don't list prices, star ratings or reviews, because those change and we haven't
            independently tested the products.
          </li>
          <li>
            Buttons say exactly where they go: "Browse options on Amazon" means a search page, not a
            specific product.
          </li>
          <li>We always mention when you don't need to buy anything at all.</li>
        </ul>
        <p>Last updated {site.legal.lastUpdated}.</p>
      </ProsePage>
    );
  },
});
