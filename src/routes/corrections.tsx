import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { corrections } from "@/content/corrections";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/corrections")({
  head: () =>
    seo({
      title: "Corrections",
      description:
        "How Plans Past Five handles errors, and a dated log of corrections made to our stories and pages.",
      path: "/corrections",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Corrections", path: "/corrections" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="Corrections"
      dek="We will get things wrong sometimes. Here is how we fix them, and what we have fixed."
      tone="butter"
    >
      <h2>Our policy</h2>
      <p>
        When we find or are told about a factual error, we correct the page, note the update date,
        and add an entry to the log below if the change affects what a reader would rely on. We do
        not quietly change claims after the fact.
      </p>
      <h2>Report an error</h2>
      {site.contactEmail ? (
        <p>
          Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> with the page link
          and what needs fixing.
        </p>
      ) : (
        <p>
          We do not have a public corrections inbox yet. Once the{" "}
          <Link to="/contact">contact page</Link> is live, you will be able to send corrections
          there with the page link and what needs fixing. Every correction we make is logged on this
          page with its date.
        </p>
      )}
      <h2>Corrections log</h2>
      {corrections.length === 0 ? (
        <p>No corrections yet. Any we make will be listed here with the date.</p>
      ) : (
        <ul>
          {corrections.map((c) => (
            <li key={`${c.date}-${c.path}`}>
              <strong>{c.date}</strong> · <a href={c.path}>{c.path}</a>. Was: {c.was} Now: {c.now}
            </li>
          ))}
        </ul>
      )}
    </ProsePage>
  ),
});
