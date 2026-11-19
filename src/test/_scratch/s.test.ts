import { it } from "vitest";
import { makePlan, ENERGIES, type PlanInput, type When, type Length } from "@/lib/planner";
import { writeFileSync } from "fs";
it("x", () => {
  const out: string[] = [];
  let bad = 0,
    total = 0;
  const whens: [When, Length][] = [
    ["weeknight", "few-hours"],
    ["evening", "few-hours"],
    ["weeknight", "evening"],
    ["saturday", "half-day"],
    ["saturday", "full-day"],
    ["weekend", "few-hours"],
  ];
  for (const [when, length] of whens)
    for (const vibe of ["cozy", "relaxing", "creative", "active", "outdoorsy", "social", "adventurous"] as const)
      for (const who of ["alone", "friend", "partner", "group"] as const)
        for (const budget of ["free", "under25", "under50"] as const) {
          const base: PlanInput = { when, length, vibe, who, budget, atHome: false, setting: "any", energy: "any" };
          const plans = ENERGIES.map((e) => makePlan({ ...base, energy: e }, 0));
          const keys = plans.map((p) => p.ids.join(","));
          total++;
          if (new Set(keys).size !== 4 || plans.some((p) => p.filled === 0)) {
            bad++;
            out.push(`${when}/${length} ${vibe} ${who} ${budget}: ${keys.map((k, i) => ENERGIES[i] + "=" + k).join("  ")}`);
          }
        }
  writeFileSync(
    "/tmp/claude-0/-home-user/420c3478-0e47-52f4-ba2f-d308d2b025c8/scratchpad/out.txt",
    `bad ${bad}/${total}\n` + out.join("\n"),
  );
});
