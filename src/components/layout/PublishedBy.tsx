import { publisherLine } from "@/lib/publisher";

/** "Published by <name>, <address>." Renders nothing until the owner sets site.publisherName. */
export function PublishedBy({ className }: { className?: string }) {
  const p = publisherLine();
  if (!p) return null;
  return (
    <p className={className} data-testid="published-by">
      Published by{" "}
      {p.url ? (
        <a href={p.url} rel="noopener noreferrer">
          {p.label}
        </a>
      ) : (
        p.label
      )}
      {p.address ? `, ${p.address}` : ""}.
    </p>
  );
}
