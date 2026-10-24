# AGENTS.md — shared rules for Claude Code and Antigravity (agy)

This file is read by BOTH Claude Code (via CLAUDE.md) and Antigravity / Gemini (agy reads
AGENTS.md from the workspace). Keep it the single source of truth for stack and conventions.

## Project
Personal portfolio for **Raja Saputera** — Frontend Engineer (React.js, Next.js, TypeScript).
Goal: get hired as a Frontend / Fullstack engineer (remote or relocation). The site must load
fast, look distinctive, and prove the claims in the CV through case studies.
Full plan: `docs/PLAN.md`. Content source of truth: `src/content/` (never hard-code CV text in components).

## Stack (do not swap without approval)
- Next.js 16 (App Router, `cacheComponents`) + React 19 + TypeScript (`strict: true`)
- Tailwind CSS v4 with our own small components in `src/components/ui` (no shadcn) + lucide-react icons
- Motion: CSS plus one small observer (`reveal-observer.tsx`): masked headline lines on load, `.reveal` parts that rise once,
  `.press` feedback, `.drift` on the big screenshot. Hidden states only under `html.js` + motion allowed.
- Content: typed TypeScript data in `src/content/{en,id}.ts` (no MDX), images in `public/`
- next-intl for i18n: English (default) + Bahasa Indonesia; next-themes for dark mode
- Zod for validation, react-hook-form for the contact form, Resend for email
- Testing: Vitest + React Testing Library (unit), Playwright (e2e + a11y via @axe-core/playwright)
- Package manager: **npm**. Deploy: Vercel.

## Layout
```
src/
  app/[locale]/        # page.tsx (home), projects/[slug]/ (case studies), opengraph-image, not-found
  app/api/contact/     # route handler (Resend)
  components/ui/       # Only (per-view content), ButtonLink (one square button shape)
  components/view/     # role view switcher + pre-paint script
  components/sections/ # Hero (waterline), WorkLedger, PictureBand, TwoNumbers, CareerTable, About, Contact
  components/work/     # ShotGallery (case study screenshots)
  content/             # types.ts, en.ts, id.ts (same shape; content.test.ts checks parity)
  messages/            # en.json, id.json (UI strings, same keys)
public/work/           # screenshots; public/photo/ portrait; public/cv/ CV PDF
scripts/               # capture-screens.mjs, login-session.mjs, explore-links.mjs
tests/e2e/             # Playwright
```

## Screenshots of client work
Capture with `scripts/capture-screens.mjs` (see `scripts/screens-*.json`). Never ship screens
with personal or financial data (names, student IDs, VA numbers, salaries, invoices).
Login sessions live in `.auth/` (gitignored) and must never be committed.

## Conventions
- Server Components by default; add `"use client"` only where interaction needs it.
- Named exports for components; one component per file; file names `kebab-case.tsx`.
- Types for all content objects live in `src/content/types.ts`.
- Use `next/image` and `next/font`; no layout shift (CLS ~0).
- Accessibility: semantic HTML, visible focus, alt text, color contrast AA.
- Design direction: taste-skill "Type and nothing else" (`.taste-skill/direction.json`, see PLAN.md §3).
  Gate: `node <taste-skill>/scripts/inspect.mjs <url>` must report 0 FAIL on home and case studies.
- Design tokens (colors, font, five type steps) are defined in `docs/PLAN.md` §3 and live in
  `src/app/globals.css` (`@theme`). Use only these tokens; never ship card grids with shadows,
  gradient decorations, ALL-CAPS labels, hairline dividers, or one identical fade pasted on every
  block (reveals are staggered per part instead). Touch targets ≥ 44px.
- Content items carry two variants: `recruiter` (impact, plain language) and `engineer`
  (stack, decisions). The active view comes from `?view=` in the URL.
- No new dependencies without a stated reason in the PR/commit message.
- No secrets in code. Env vars documented in `.env.example` (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`).

## Gates (a task is done only when all pass)
```
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e      # when routes/UI changed
```
Never edit `node_modules`, mock away real dependencies, or weaken tests/lint rules to make a gate pass.
