# Task 01 — Sections, case study page, contact, translation, tests

Read `AGENTS.md` and `docs/PLAN.md` §3 first. Follow existing patterns in
`src/components/sections/hero.tsx`, `src/components/ui/*`, `src/components/layout/*`.
Package manager is **npm** (not pnpm). Do NOT add or remove dependencies.

## Files you must NOT modify
`src/app/globals.css`, `src/components/sections/hero.tsx`, `src/components/view/*`,
`src/components/layout/*`, `src/components/ui/*`, `src/content/en.ts`, `src/content/types.ts`,
`src/i18n/*`, `next.config.ts`, `package.json`, `package-lock.json`, any config file, `node_modules`.
You MAY add keys to both `src/messages/en.json` and `src/messages/id.json` (always both, same keys).

## Patterns to follow
- Server components; get strings with `getTranslations({ locale, namespace })` (always pass `locale`).
- Audience-specific content: `<Only view="recruiter">…</Only>` / `<Only view="engineer">…</Only>`.
- Wrap each home section in `<Section id title intro>` from `src/components/ui/section.tsx`.
- Internal links: `Link` from `@/i18n/navigation`. Dates: `formatMonth` from `@/lib/utils`.
- Colors only via tokens: `paper`, `paper-raised`, `ink`, `slate`, `rule`, `jade`, `jade-soft`, `marigold`.
- Design bans: no card grids with shadows, no gradients, no ALL-CAPS labels, no middle-dot `·`
  separators (use commas), no `→` in link text, no mono font for labels, no entrance animations.
- Lists are lists (`ul`/`ol`/`dl`); rows are separated by `border-t border-rule`.

## 1. `src/components/sections/project-list.tsx`
`export async function ProjectList({ locale, projects }: { locale: Locale; projects: Project[] })`
- `<Section id="projects" title={t("projects.title")} intro={t("projects.intro")}>`.
- `<ul>` of rows. Each row: title as `Link` to `/projects/{slug}` (whole row clickable via
  `after:absolute after:inset-0` on the link, row `relative`; title turns `text-jade` on row hover),
  `client, period` in `text-slate`, `summary.recruiter` in `<Only view="recruiter">`,
  `summary.engineer` in `<Only view="engineer">`, and when `metrics.length` a `<dl>` inline
  (value `font-semibold text-ink`, label `text-slate`). If `confidential`, a small `text-sm text-slate`
  line with `t("projects.confidential")`.

## 2. `src/components/sections/experience-timeline.tsx`
`export async function ExperienceTimeline({ locale, experience }: { locale: Locale; experience: Experience[] })`
- `<Section id="experience">`, `<ol>` (chronological, newest first as given).
- Row grid on md: dates column (3 cols) `formatMonth(start) – formatMonth(end) | t("experience.present")`,
  content column: `role` (font-semibold), `company, place` (slate).
  Recruiter: `summary.recruiter` + `<ul>` of `highlights.recruiter`.
  Engineer: `summary.engineer` + `<ul>` of `highlights.engineer` + stack as comma-separated `text-slate` line.
  If `project`: `Link` to `/projects/{project}` labelled `t("experience.caseStudy")`.

## 3. `src/components/sections/skills.tsx`
`export async function Skills({ locale, skills, education })`
- `<Section id="skills">`. Skills as `<dl>` (`dt` group name, `dd` items joined with ", ").
- Then `<h3>` `t("skills.education")` and education list: program, school, `start – end` via formatMonth, optional note.

## 4. Contact
- `src/lib/contact-schema.ts`: zod v4 schema `contactSchema` = `{ name: string min 1 max 100 (trim),
  email: email, message: string min 20 max 5000, company: string optional (honeypot) }`,
  export `type ContactInput`. Error messages are keys: `"errorName" | "errorEmail" | "errorMessage"`.
- `src/components/sections/contact.tsx` (server): `<Section id="contact">` with intro, renders form.
- `src/components/sections/contact-form.tsx` (client): react-hook-form + `@hookform/resolvers/zod`,
  `useTranslations("contact")`. Labelled inputs (visible labels above fields, `min-h-11`, border
  `border-ink/25`, bg `paper-raised`, rounded-md). Errors under each field in a `<p id>` linked via
  `aria-describedby`, `aria-invalid`. Hidden honeypot field `company` (visually hidden, `tabIndex={-1}`,
  `autoComplete="off"`). Submit button uses `buttonClass("primary")`; text `send` / `sending`.
  On success replace the form with `<p role="status">{t("sent")}</p>`. On failure show
  `<p role="alert">{t("errorServer", { email })}</p>`. Props: `{ email: string }`.
- `src/app/api/contact/route.ts`: `POST` — parse JSON, `contactSchema.safeParse`; invalid → 400
  `{ error: "invalid" }`; honeypot filled → 200 `{ ok: true }` without sending; missing
  `RESEND_API_KEY` or `CONTACT_TO_EMAIL` → 503 `{ error: "not_configured" }`; else
  `new Resend(key).emails.send({ from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
  to, replyTo: email, subject: "Portfolio message from {name}", text })`; Resend error → 502.

## 5. Case study page `src/app/[locale]/projects/[slug]/page.tsx`
- `generateStaticParams` returns every project slug (locale comes from the parent layout).
- `generateMetadata`: title = project.title, description = summary.recruiter.
- Unknown slug → `notFound()`. Call `setRequestLocale(locale)`.
- Layout (max-w-6xl container, same gutters as Hero): back `Link` to `/#projects`
  (`t("project.back")`), `h1` title, `client, period`, metrics `<dl>`, then
  Recruiter block: h2 problem / role / outcome (ul). Engineer block: h2 architecture (ul),
  decisions (each h3 + p; skip heading if empty), stack. Confidential note. `links` if any.
  Text column max `65ch`.
- `src/app/[locale]/not-found.tsx`: short message + link home (add `notFound.title`, `notFound.home`
  keys to both message files).

## 6. Home composition — edit `src/app/[locale]/page.tsx`
Order: `Hero`, `ProjectList`, `ExperienceTimeline`, `Skills`, `Contact`.

## 7. SEO
- `src/app/sitemap.ts`: `/`, `/id`, and `/projects/{slug}` + `/id/projects/{slug}` using `SITE_URL`.
- `src/app/robots.ts`: allow all, sitemap URL.
- `src/app/[locale]/opengraph-image.tsx`: `ImageResponse` 1200×630, background `#F2F4F3`,
  name + headline in `#16202B`, a 12px left bar in `#0F5C4D`. Use `getContent(locale)`.
  Export `generateStaticParams` returning both locales if required by the build.

## 8. Indonesian content — rewrite `src/content/id.ts`
Full natural Bahasa Indonesia translation of `src/content/en.ts`, exported as `export const id: Content`.
Identical shape: same slugs, same array lengths and order. Keep company names, product names and
tech terms (React, REST API, state, …) in English. `cv` link stays the same. Keep `// REVIEW` comments.

## 9. Tests (Vitest + RTL, files next to source as `*.test.ts(x)`)
- `src/lib/utils.test.ts`: `formatMonth("2023-05","en")` → "May 2023", id → contains "Mei".
- `src/lib/contact-schema.test.ts`: valid input passes; short message, bad email, empty name fail.
- `src/content/content.test.ts`: en and id have same project slugs, same experience length, same
  highlights lengths per item; every `experience.project` exists as a project slug.
- `src/components/view/view-switcher.test.tsx`: renders two radios; clicking "Engineer" sets
  `document.documentElement.dataset.view === "engineer"`, `aria-checked`, and `?view=engineer` in
  `location.search`; ArrowRight toggles.
- `src/app/api/contact/route.test.ts`: mock `resend` with `vi.mock`; invalid body → 400;
  honeypot → 200 and no send; missing env → 503; valid → 200 and `send` called with `replyTo`.
- `tests/e2e/home.spec.ts` (Playwright, do not run it): recruiter text visible / engineer hidden by
  default; click Engineer → engineer text visible and URL has `view=engineer`; `/?view=engineer`
  loads engineer view; `/id` has `<html lang="id">`; case study page `/projects/school-erp` opens;
  `@axe-core/playwright` finds no `serious`/`critical` violations on `/` and the case study;
  submitting the empty contact form shows the three field errors.

## Done when
`npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass. Do not weaken
lint/ts/test config, do not mock app code to force a pass, do not touch `node_modules`.
Reply with a DIGEST: files created/changed, gate results, anything you could not do.
