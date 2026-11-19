import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * False on the server and during the first client render (the HTML a visitor sees before the page's
 * JavaScript has attached), true once React has hydrated. Use it to show a visible "getting ready"
 * state on buttons that only work with JavaScript, so a tap before hydration is never silently lost.
 * Controls that can work without it (links, GET forms) should not wait for this at all.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Class and attributes for a button that needs JavaScript: dimmed and `aria-busy` until hydrated. */
export const waitingProps = (hydrated: boolean) =>
  hydrated
    ? ({} as const)
    : ({ disabled: true, "aria-busy": true, title: "Getting ready, one moment" } as const);
