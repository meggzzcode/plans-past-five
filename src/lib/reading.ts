/**
 * Scrolls to an element by id, first opening any folded article sections (native details elements)
 * that contain it. Returns false when the id is not on the page. Used by the mini table of contents,
 * the "Skip to shopping" link and address hashes, so a link never lands inside a closed section.
 */
export function openAndScrollTo(id: string): boolean {
  if (typeof document === "undefined") return false;
  const target = document.getElementById(id);
  if (!target) return false;
  for (let el = target.parentElement; el; el = el.parentElement)
    if (el instanceof HTMLDetailsElement) el.open = true;
  target.scrollIntoView?.({ block: "start" });
  return true;
}
