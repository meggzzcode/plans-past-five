import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { changelog, firstChanged, lastChanged, LAUNCH_NOTE } from "@/content/changelog";
import { ProsePage } from "@/components/pages/ProsePage";

const longDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const Route = createFileRoute("/changelog")({
  head: () =>
    seo({
      title: "What changed",
      description: `${LAUNCH_NOTE}. A dated list of what has really changed on ${site.name}, in plain English.`,
      path: "/changelog",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "What changed", path: "/changelog" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "What changed",
          url: `${site.url}/changelog`,
          datePublished: firstChanged(),
          dateModified: lastChanged(),
        },
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="What changed"
      dek="A dated list of real changes to the site. Nothing here is backdated."
      tone="butter"
    >
      <p>
        <strong>{LAUNCH_NOTE}.</strong> The site is new: the earliest entry below is its first day.
        We list only changes that really happened, on the day they happened.
      </p>
      <p>
        Last updated <time dateTime={lastChanged()}>{longDate(lastChanged())}</time>.
      </p>
      {changelog.map((day) => (
        <section key={day.date}>
          <h2>
            <time dateTime={day.date}>{longDate(day.date)}</time>
          </h2>
          <ul>
            {day.changes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      ))}
    </ProsePage>
  ),
});
