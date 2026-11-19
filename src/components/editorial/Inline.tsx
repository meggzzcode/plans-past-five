import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

/** Renders **bold** and [label](/internal-path) inside editorial strings. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const b = p.match(/^\*\*(.+)\*\*$/);
        if (b) return <strong key={i}>{b[1]}</strong>;
        const l = p.match(/^\[(.+)\]\((.+)\)$/);
        if (l) {
          const href = l[2] ?? "/";
          return href.startsWith("/") ? (
            <Link key={i} to={href}>
              {l[1]}
            </Link>
          ) : (
            <a key={i} href={href} rel="noopener">
              {l[1]}
            </a>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
