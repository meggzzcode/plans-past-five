/* eslint-disable @typescript-eslint/no-explicit-any -- parsed YAML/config is untyped by nature */
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

// js-yaml comes with ESLint (a dev dependency of a dev dependency); it is only used to read two config files.
const require = createRequire(import.meta.url);
const yaml = require("js-yaml") as { load: (s: string) => any };

const repo = path.resolve(__dirname, "../..");
const read = (p: string) => readFileSync(path.join(repo, p), "utf8");
const workflowText = read(".github/workflows/publish-content.yml");
const wf = yaml.load(workflowText);
const pages = yaml.load(read(".pages.yml"));
const netlify = read("netlify.toml");

// Every `run:` script and `env:`/`with:` value in the workflow, to scan for hazards.
const steps: any[] = wf.jobs.publish.steps;
const runScripts = steps.map((s) => String(s.run ?? "")).join("\n");

describe("publish workflow (.github/workflows/publish-content.yml)", () => {
  it("parses and is a manual (workflow_dispatch) workflow only", () => {
    const on = wf.on;
    expect(Object.keys(on)).toEqual(["workflow_dispatch"]);
    expect(on.workflow_dispatch.inputs.payload.type).toBe("string");
    // Manual runs by hand must work, so the Pages CMS payload cannot be a required input.
    expect(on.workflow_dispatch.inputs.payload.required).toBe(false);
  });

  it("never uses the dangerous triggers and only runs on main", () => {
    const code = workflowText.replace(/^\s*#.*$/gm, "");
    expect(code).not.toMatch(/pull_request|\bpush:|issue_comment|workflow_run/);
    expect(wf.jobs.publish.if).toContain("github.event_name == 'workflow_dispatch'");
    expect(wf.jobs.publish.if).toContain("github.ref == 'refs/heads/main'");
  });

  it("has least-privilege permissions: none at the top, contents: write on the one job", () => {
    expect(wf.permissions).toEqual({});
    expect(wf.jobs.publish.permissions).toEqual({ contents: "write" });
    expect(Object.keys(wf.jobs)).toEqual(["publish"]);
  });

  it("uses no third-party actions and no secrets", () => {
    for (const s of steps) expect(s.uses, `step "${s.name}"`).toBeUndefined();
    expect(workflowText).not.toMatch(/secrets\./);
    // only the built-in token
    expect([...workflowText.matchAll(/\$\{\{\s*([^}]+?)\s*\}\}/g)].map((m) => m[1]).sort()).toEqual(
      ["github.token", "github.token", "github.repository"].sort(),
    );
  });

  it("puts nothing untrusted inside a shell command", () => {
    // Expressions appear only in `env:` blocks (read by the shell as variables), never in `run:`.
    expect(runScripts).not.toMatch(/\$\{\{/);
    expect(runScripts).not.toMatch(
      /github\.event|github\.head_ref|inputs\.payload|\.commits|github\.actor/,
    );
    expect(workflowText).not.toMatch(/github\.event\.(inputs|head_commit|pull_request)/);
    // branches are fixed in the file
    expect(runScripts).toContain("origin/content-edits");
  });

  it("serialises runs and has a timeout", () => {
    expect(wf.concurrency).toEqual({ group: "publish-content", "cancel-in-progress": false });
    expect(wf.jobs.publish["timeout-minutes"]).toBeGreaterThan(0);
  });

  it("validates before it pushes, and pushes only after every check", () => {
    const names = steps.map((s) => String(s.name));
    const idx = (re: RegExp) => names.findIndex((n) => re.test(n));
    const guard = idx(/content only/i);
    const merge = idx(/Merge the edits/i);
    const build = idx(/Check all the content/i);
    const tests = idx(/integrity tests/i);
    const push = idx(/Publish \(push main\)/i);
    expect([guard, merge, build, tests, push].every((i) => i >= 0)).toBe(true);
    expect(guard).toBeLessThan(merge);
    expect(merge).toBeLessThan(build);
    expect(build).toBeLessThan(tests);
    expect(tests).toBeLessThan(push);
    expect(String(steps[build].run)).toContain("node scripts/build-content.mjs --check");
    expect(String(steps[tests].run)).toContain("vitest run");
    // the token is handed only to the two steps that talk to GitHub
    const withToken = steps.filter((s) => s.env?.GH_TOKEN).map((s) => s.name);
    expect(withToken).toHaveLength(2);
    // exactly one push to main, and it is the last thing that changes anything
    expect(runScripts.match(/push origin HEAD:refs\/heads\/main/g)).toHaveLength(1);
    // failures speak plain English and promise that nothing changed
    expect(runScripts).toMatch(/Nothing published::.*Pages CMS/);
    expect(runScripts).toMatch(/live site is unchanged/);
  });

  it("refuses edit branches that change anything but content and uploads", () => {
    expect(runScripts).toContain("content/*|public/uploads/*");
  });

  it("the release marker in the merge commit equals the one netlify.toml requires", () => {
    const marker = /grep -q '\\\[([a-z-]+)\\\]'/.exec(netlify)?.[1];
    expect(marker).toBe("deploy");
    const msg = /git merge --no-ff origin\/content-edits -m "([^"]+)"/.exec(runScripts)?.[1];
    expect(msg).toBeTruthy();
    expect(msg).toContain(`[${marker}]`);
  });

  it("netlify.toml keeps previews building and production deliberate", () => {
    expect(netlify).toMatch(/case "\$CONTEXT" in deploy-preview\|branch-deploy\) exit 1;; esac/);
    expect(netlify).toMatch(/! git log -1 --pretty=%B HEAD \| grep -q '\\\[deploy\\\]'/);
  });
});

describe(".pages.yml publish button", () => {
  const publish = (pages.actions ?? []).find((a: any) => a.name === "publish-site");

  it("declares one Publish site action wired to the workflow file", () => {
    expect(publish).toBeTruthy();
    expect(publish.label).toBe("Publish site");
    expect(publish.workflow).toBe("publish-content.yml");
    expect(publish.ref).toBe("main");
    expect(
      readFileSync(path.join(repo, ".github/workflows", publish.workflow), "utf8"),
    ).toBeTruthy();
  });

  it("uses only keys documented at pagescms.org/docs/configuration/actions", () => {
    const documented = [
      "name",
      "label",
      "workflow",
      "ref",
      "scope",
      "cancelable",
      "confirm",
      "fields",
    ];
    for (const a of pages.actions)
      expect(Object.keys(a).filter((k) => !documented.includes(k))).toEqual([]);
    expect(Object.keys(publish.confirm).sort()).toEqual(["button", "message", "title"]);
  });

  it("keeps the other CMS config intact", () => {
    expect(pages.settings.content.merge).toBe(true);
    expect(pages.content.map((c: any) => c.name)).toEqual(
      expect.arrayContaining(["articles", "images"]),
    );
  });
});

describe("workflow guard logic, run for real in a scratch git repo", () => {
  // Extracts the guard step's shell and runs it, so the plain-English refusal is exercised, not just read.
  const guardStep = steps.find((s) => /content only/i.test(String(s.name)));
  const git = (cwd: string, ...a: string[]) =>
    execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...a], {
      cwd,
      encoding: "utf8",
    });
  const runGuard = (touch: Record<string, string>) => {
    const dir = mkdtempSync(path.join(tmpdir(), "ppf-guard-"));
    try {
      git(dir, "init", "-q", "-b", "main");
      mkdirSync(path.join(dir, "content"));
      writeFileSync(path.join(dir, "content/a.json"), "{}");
      git(dir, "add", "-A");
      git(dir, "commit", "-q", "-m", "base");
      git(dir, "update-ref", "refs/remotes/origin/main", "HEAD");
      git(dir, "checkout", "-q", "-b", "edits");
      for (const [f, body] of Object.entries(touch)) {
        mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
        writeFileSync(path.join(dir, f), body);
      }
      git(dir, "add", "-A");
      git(dir, "commit", "-q", "-m", "edit");
      git(dir, "update-ref", "refs/remotes/origin/content-edits", "HEAD");
      try {
        const out = execFileSync("bash", ["-c", String(guardStep.run)], {
          cwd: dir,
          encoding: "utf8",
        });
        return { code: 0, out };
      } catch (e: any) {
        return { code: e.status as number, out: String(e.stdout) };
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };

  it("allows content and uploads", () => {
    expect(runGuard({ "content/a.json": '{"x":1}', "public/uploads/p.jpg": "x" }).code).toBe(0);
  });
  it("refuses code, workflow or config changes, even odd file names", () => {
    for (const f of [
      "src/app.ts",
      ".github/workflows/x.yml",
      "netlify.toml",
      "x",
      "scripts/$(id).sh",
    ]) {
      const r = runGuard({ [f]: "x" });
      expect(r.code, f).toBe(1);
      expect(r.out).toContain("Nothing published");
    }
  });
});

describe("undo-last-publish workflow (.github/workflows/undo-last-publish.yml)", () => {
  const text = read(".github/workflows/undo-last-publish.yml");
  const u = yaml.load(text);
  const usteps: any[] = u.jobs.undo.steps;

  it("is manual, main-only, least-privilege, action-free and secret-free", () => {
    expect(Object.keys(u.on)).toEqual(["workflow_dispatch"]);
    expect(u.jobs.undo.if).toContain("github.ref == 'refs/heads/main'");
    expect(u.permissions).toEqual({});
    expect(u.jobs.undo.permissions).toEqual({ contents: "write" });
    for (const s of usteps) expect(s.uses).toBeUndefined();
    expect(text).not.toMatch(/secrets\./);
    expect(usteps.map((s) => String(s.run ?? "")).join("\n")).not.toMatch(/\$\{\{/);
    // shares the publish lock so the two never run at once
    expect(u.concurrency.group).toBe("publish-content");
    // never touches content-edits
    expect(text.replace(/^\s*#.*$/gm, "")).not.toMatch(/push origin [^\n]*content-edits/);
  });

  it("really undoes a publish merge, and only carries the release marker when asked", () => {
    const step = usteps.find((s) => /Undo the newest publish/i.test(String(s.name)));
    for (const deploy of ["false", "true"]) {
      const dir = mkdtempSync(path.join(tmpdir(), "ppf-undo-"));
      try {
        const g = (...a: string[]) =>
          execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...a], {
            cwd: dir,
            encoding: "utf8",
          });
        g("init", "-q", "-b", "main");
        writeFileSync(path.join(dir, "a.json"), "1");
        g("add", "-A");
        g("commit", "-q", "-m", "base");
        g("checkout", "-q", "-b", "content-edits");
        writeFileSync(path.join(dir, "a.json"), "2");
        g("commit", "-q", "-am", "edit");
        g("checkout", "-q", "main");
        g("merge", "--no-ff", "content-edits", "-m", "Publish: content edits [deploy]");
        execFileSync("bash", ["-c", String(step.run)], {
          cwd: dir,
          encoding: "utf8",
          env: { ...process.env, WANT_DEPLOY: deploy },
        });
        expect(readFileSync(path.join(dir, "a.json"), "utf8")).toBe("1");
        const msg = g("log", "-1", "--format=%B");
        expect(msg.includes("[deploy]")).toBe(deploy === "true");
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    }
  });
});
