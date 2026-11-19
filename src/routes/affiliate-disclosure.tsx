import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import {
  SHOP_LINK_FACTS,
  AMAZON_PROGRAM_STATEMENT,
  commissionStatement,
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
      description:
        "How our shopping links work: ordinary Amazon links, no prices shown, and a plain-English note on whether we earn anything from them.",
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
                {site.name} {AMAZON_PROGRAM_STATEMENT} {commissionStatement().long} Next to each
                Amazon link we show Amazon's required statement.
              </p>
            )}
            {liveEntries()
              .filter((e) => e.id !== "amazon")
              .map((e) => (
                <p key={e.id}>
                  Some links go to {e.retailer} through the {e.network} affiliate program.{" "}
                  {commissionStatement().long}
                </p>
              ))}
            <p>{SHOP_LINK_FACTS.neutral}</p>
          </>
        ) : (
          <p>Our shopping links are ordinary Amazon links. {commissionStatement().long}</p>
        )}
        <h2>What the buttons do</h2>
        <ul>
          <li>
            <strong>"See it on Amazon"</strong> opens the Amazon page of a named product we checked.
            That is the kind of link in our starter kits and shopping lists.
          </li>
          <li>
            <strong>"Find ... on Amazon"</strong> (for example "Find beginner rackets on Amazon")
            opens an Amazon search. We use it where we only describe a type of product ("what to
            look for").
          </li>
          <li>
            We show no prices, star ratings or review counts. Amazon or the seller sets price,
            shipping and returns.
          </li>
        </ul>
        <h2>How we recommend things</h2>
        <ul>
          <li>
            We name a product only after checking its listing, and we say why it made the list. We
            have not tested products ourselves unless a page says so.
          </li>
          <li>Whether we earn a commission never changes which products we pick.</li>
          <li>We always mention when you don't need to buy anything at all.</li>
        </ul>
        <p>Last updated {site.legal.lastUpdated}.</p>
      </ProsePage>
    );
  },
});
