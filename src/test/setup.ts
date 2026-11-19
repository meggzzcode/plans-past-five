import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// CI guard: AFFILIATE_TEST_STATE=active|inactive forces the Amazon entry into that state before
// every test file (fake id only), so the full suite can run in both states. Unset = as configured.
{
  const forced = process.env["AFFILIATE_TEST_STATE"];
  if (forced === "active" || forced === "inactive") {
    const { setAffiliateState } = await import("./affiliate-state");
    setAffiliateState(forced);
  }
}
