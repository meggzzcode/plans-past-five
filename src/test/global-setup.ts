/**
 * Runs once before the whole suite. It runs the same content build that `bun run build` runs
 * (validate content/, write the generated modules and public files), so the tests always see
 * generated files that match the content on disk. Without this, an owner's valid edit in Pages CMS
 * made the tests fail until they remembered to run a separate command.
 */
import path from "node:path";
// @ts-expect-error plain .mjs helper without type declarations
import { buildContent, ContentError } from "../../scripts/content-lib.mjs";

export default function setup() {
  const root = path.resolve(__dirname, "../..");
  try {
    buildContent(root, { write: true });
  } catch (e) {
    if (e instanceof ContentError)
      throw new Error(
        `The content needs fixing before the tests can run:\n  - ${(e as { problems: string[] }).problems.join("\n  - ")}`,
      );
    throw e;
  }
}
