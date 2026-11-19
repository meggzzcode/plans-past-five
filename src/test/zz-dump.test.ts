import { activities } from "@/data/activities";
import { test } from "vitest";
test("dump", () => {
  for (const a of activities) console.log(a.id.padEnd(18), a.who.join(",").padEnd(28), a.cost.padEnd(8), a.costMax, a.advance?"ADV":"", a.setting, a.minutes, "|", a.text, "|", a.prep, "|", a.supplies.join("; "));
});
