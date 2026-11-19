/** Public corrections log. Add the newest entry first. Empty at launch on purpose. */
export type Correction = {
  /** YYYY-MM-DD the correction was made. */
  date: string;
  /** Site path of the page that was corrected, e.g. "/journal/some-story". */
  path: string;
  /** What was wrong. */
  was: string;
  /** What it says now. */
  now: string;
};

export const corrections: Correction[] = [];
