/**
 * Test helper: put the Amazon affiliate entry into an explicit state for a test and restore it
 * afterwards. Tests must never depend on whatever the repo ships (inactive) or on the buyer's own
 * configuration (active, real id). The ids used here are FAKE and never real Associates ids.
 *
 * Global override for CI: AFFILIATE_TEST_STATE=active|inactive applies that state before every test
 * file (see src/test/setup.ts), so the whole suite can be run in both states
 * (scripts/check-affiliate-config.mjs). Tests that need a state still set it explicitly.
 */
import { afterEach, beforeEach } from "vitest";
import { affiliateRegistry, type AffiliateEntry } from "@/config/affiliate";

export type AffiliateState = "inactive" | "active";
export const FAKE_TAG = "testsite-20";

const amazon = (): AffiliateEntry => affiliateRegistry["amazon"]!;

/** Copy of the Amazon entry as it is right now. */
export const snapshotAffiliate = (): AffiliateEntry => ({
  ...amazon(),
  retailerHosts: [...amazon().retailerHosts],
  approvedPromotionMethods: [...amazon().approvedPromotionMethods],
});

export const restoreAffiliate = (snap: AffiliateEntry) => {
  Object.assign(amazon(), snap);
};

/** Set the Amazon entry to a fully explicit state (all fields that decide liveness). */
export function setAffiliateState(state: AffiliateState, tag = FAKE_TAG) {
  if (state === "active") {
    Object.assign(amazon(), {
      websiteTrackingId: tag,
      approvalStatus: "approved",
      active: true,
      lastVerified: "2026-01-01",
      affiliateUrlTemplate: null,
    });
  } else {
    Object.assign(amazon(), {
      websiteTrackingId: "",
      approvalStatus: "not-applied",
      active: false,
      lastVerified: null,
      affiliateUrlTemplate: null,
    });
  }
}

/** The tracking id configured before the test (the buyer's, when activated), or "". */
export const configuredTag = () => amazon().websiteTrackingId.trim();

/** Register beforeEach/afterEach that set `state` for each test and restore the original after. */
export function withAffiliateState(state: AffiliateState, tag = FAKE_TAG) {
  let snap: AffiliateEntry | null = null;
  beforeEach(() => {
    snap = snapshotAffiliate();
    setAffiliateState(state, tag);
  });
  afterEach(() => {
    if (snap) restoreAffiliate(snap);
    snap = null;
  });
}

/** Restore-only variant for files that switch state themselves inside tests. */
export function withAffiliateRestore() {
  let snap: AffiliateEntry | null = null;
  beforeEach(() => {
    snap = snapshotAffiliate();
  });
  afterEach(() => {
    if (snap) restoreAffiliate(snap);
    snap = null;
  });
}
