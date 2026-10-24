# AGENTS.md — shared rules for Claude Code and Antigravity (agy)

This file is read by BOTH Claude Code (via CLAUDE.md) and Antigravity / Gemini (agy reads
AGENTS.md from the workspace). Keep it the single source of truth for stack and conventions.

## Project
Personal portfolio for **Raja Saputera** — Frontend Engineer (React.js, Next.js, TypeScript).
Goal: get hired as a Frontend / Fullstack engineer (remote or relocation). The site must load
fast, look distinctive, and prove the claims in the CV through case studies.
Full plan: `docs/PLAN.md`. Content source of truth: `src/content/` (never hard-code CV text in components).

## Stack (do not swap without approval)
- Next.js (App Router, latest stable) + React + TypeScript (`strict: true`)
- Tailwind CSS v4 + shadcn/ui (Radix primitives) + lucide-react icons
- Motion (`motion/react`, ex Framer Motion) for animation — respect `prefers-reduced-motion`
- MDX for case studies (`src/content/projects/*.mdx`)
- next-intl for i18n: English (default) + Bahasa Indonesia
- Zod for validation, react-hook-form for the contact form, Resend for email
- Testing: Vitest + React Testing Library (unit), Playwright (e2e + a11y via @axe-core/playwright)
- Package manager: **pnpm**. Deploy: Vercel.

## Layout
```
src/
  app/[locale]/        # routes: page.tsx (home), projects/, projects/[slug]/, about/, contact/
  app/api/contact/     # route handler (Resend)
  components/ui/       # shadcn primitives (generated, don't hand-edit heavily)
  components/sections/ # Hero, Experience, Projects, Skills, Contact ...
  content/             # profile.ts, experience.ts, skills.ts, projects/*.mdx
  lib/                 # utils, mdx loader, seo helpers
  messages/            # en.json, id.json (next-intl)
tests/e2e/             # Playwright
```

## Conventions
- Server Components by default; add `"use client"` only where interaction needs it.
- Named exports for components; one component per file; file names `kebab-case.tsx`.
- Types for all content objects live in `src/content/types.ts`.
- Use `next/image` and `next/font`; no layout shift (CLS ~0).
- Accessibility: semantic HTML, visible focus, alt text, color contrast AA.
- Design tokens (colors, font, type scale) are defined in `docs/PLAN.md` §3 and live in
  `src/app/globals.css` (`@theme`). Restyle shadcn components to these tokens; never ship
  default shadcn look, gradient decorations, ALL-CAPS labels, or per-section fade-up animations.
- Content items carry two variants: `recruiter` (impact, plain language) and `engineer`
  (stack, decisions). The active view comes from `?view=` in the URL.
- No new dependencies without a stated reason in the PR/commit message.
- No secrets in code. Env vars documented in `.env.example` (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`).

## Gates (a task is done only when all pass)
```
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e      # when routes/UI changed
```
Never edit `node_modules`, mock away real dependencies, or weaken tests/lint rules to make a gate pass.
