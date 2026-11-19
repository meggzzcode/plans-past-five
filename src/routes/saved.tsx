import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useSaved, type SavedKind } from "@/lib/saved";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/editorial/Section";
import { Star, Bow } from "@/components/brand/Doodles";

export const Route = createFileRoute("/saved")({
  head: () => seo({ title: "My Plans", description: "Your saved hobbies, stories, plans and shop picks, stored privately on this device.", path: "/saved", noindex: true }),
  component: Saved,
});

const labels: Record<SavedKind, string> = { plan: "Plans", hobby: "Hobbies", article: "Stories", "solo-date": "Solo dates", product: "Shop picks" };

function Saved() {
  const { items, ready, remove, clear } = useSaved();
  const kinds = (Object.keys(labels) as SavedKind[]).filter((k) => items.some((i) => i.kind === k));
  return (
    <>
      <PageHero kicker="My Plans" title="Penciled in." italic="Penciled" dek="Everything you've saved, in one place. Saved items live in this browser only. They aren't synced between devices, and clearing your browser data will remove them." tone="butter" />
      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8">
        {!ready ? null : items.length === 0 ? (
          <div className="paper relative mx-auto max-w-xl p-10 text-center">
            <Bow className="absolute -top-5 left-1/2 h-10 w-14 -translate-x-1/2 text-cherry" />
            <p className="font-display text-3xl italic">Nothing on the calendar yet? Let's fix that.</p>
            <p className="mt-3 text-muted-foreground">Tap the bookmark on any hobby, story, shop pick or plan to keep it here.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/hobby-finder" className="bg-cherry px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink">Find Your Thing</Link>
              <Link to="/make-plans" className="border-2 border-cherry px-5 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream">Let's Make Plans</Link>
            </div>
          </div>
        ) : (
          <>
            {kinds.map((k) => (
              <div key={k} className="mb-12">
                <h2 className="flex items-center gap-2 text-3xl italic"><Star className="h-4 w-4 text-cherry" />{labels[k]}</h2>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {items.filter((i) => i.kind === k).map((i) => (
                    <li key={i.key} className="flex items-start justify-between gap-4 py-4">
                      <div>
                        <a href={i.href} className="font-display text-xl text-ink hover:text-cherry">{i.title}</a>
                        {i.note && <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{i.note}</p>}
                      </div>
                      <button onClick={() => remove(i.key)} className="shrink-0 p-1 text-muted-foreground hover:text-cherry" aria-label={`Remove ${i.title}`}><X className="h-5 w-5" /></button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={() => { if (confirm("Remove everything from My Plans on this device?")) clear(); }} className="text-sm font-semibold text-cherry underline">Clear all</button>
          </>
        )}
      </section>
    </>
  );
}
