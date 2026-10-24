import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { en } from "./en";
import { id } from "./id";

describe("content parity between en and id", () => {
  it("has the same project slugs in the same order", () => {
    const enSlugs = en.projects.map((p) => p.slug);
    const idSlugs = id.projects.map((p) => p.slug);
    expect(idSlugs).toEqual(enSlugs);
  });

  it("has the same experience length", () => {
    expect(id.experience.length).toBe(en.experience.length);
  });

  it("has the same highlights lengths per item", () => {
    en.experience.forEach((enExp, index) => {
      const idExp = id.experience[index];
      expect(idExp.highlights.recruiter.length).toBe(enExp.highlights.recruiter.length);
      expect(idExp.highlights.engineer.length).toBe(enExp.highlights.engineer.length);
    });
  });

  it("uses the same screenshots and public repos in both languages", () => {
    const shots = (c: typeof en) => c.projects.map((p) => (p.shots ?? []).map((s) => s.src));
    expect(shots(id)).toEqual(shots(en));
    expect(id.openSource.map((o) => o.repo)).toEqual(en.openSource.map((o) => o.repo));
    expect(id.profile.photo.src).toBe(en.profile.photo.src);
  });

  it("every image it references exists in /public", () => {
    const paths = [
      en.profile.photo.src,
      ...en.projects.flatMap((p) => (p.shots ?? []).map((s) => s.src)),
      ...en.openSource.flatMap((o) => (o.image ? [o.image.src] : [])),
    ];
    for (const p of paths) expect(existsSync(join(process.cwd(), "public", p)), p).toBe(true);
  });

  it("every experience.project exists as a project slug", () => {
    const projectSlugs = new Set(en.projects.map((p) => p.slug));
    for (const exp of en.experience) {
      if (exp.project) {
        expect(projectSlugs.has(exp.project)).toBe(true);
      }
    }
    for (const exp of id.experience) {
      if (exp.project) {
        expect(projectSlugs.has(exp.project)).toBe(true);
      }
    }
  });
});
