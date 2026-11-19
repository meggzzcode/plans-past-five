import { it } from "vitest";
import { activities } from "@/data/activities";
import { writeFileSync } from "fs";
it("x", () => {
  const out = activities
    .filter((a) => a.at.some(([, t]) => t >= 17 * 60))
    .map(
      (a) =>
        `${a.id} ${a.energy} ${a.setting}${a.home ? " HOME" : ""} ${a.minutes}m $${a.costMin}-${a.costMax} who=${a.who.join("/")} vibes=${a.vibes.join("/")} at=${a.at.map((x) => x.map((m) => (m / 60).toFixed(1)).join("-")).join(",")} fam=${a.family}${a.advance ? " ADV" : ""}`,
    );
  writeFileSync("/tmp/claude-0/-home-user/420c3478-0e47-52f4-ba2f-d308d2b025c8/scratchpad/out.txt", out.join("\n"));
});
