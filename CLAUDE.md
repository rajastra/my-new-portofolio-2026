# CLAUDE.md

@AGENTS.md

## Role split: Claude conducts, Antigravity (agy / Gemini) executes
Claude owns: requirements, design direction, architecture, content writing, the hard 20%,
reviewing diffs, and running gates. agy does bulk, mechanical work — **only above break-even**.

### Delegate to agy (via `antigravity-delegate` subagent or `/antigravity:delegate`)
- Initial scaffold: Next.js + Tailwind + shadcn + next-intl + Vitest/Playwright config.
- Generating many similar files: shadcn components, section skeletons, `messages/id.json` translation from `en.json`.
- Exhaustive tests for components/content loaders Claude already specified.
- Whole test-covered features ≥ ~200 lines: `/antigravity:handoff --dir . --tests <files> "<req>"`.
- Web research (design references, library comparisons): `/antigravity:research`.
- Second-opinion review before a release: `/antigravity:review`.

### Do NOT delegate
- Small edits, one-file fixes, copywriting, visual/design judgement, CV-claim wording.

### How
- Always pass `--dir D:/Coding/new-portofolio` so agy reads AGENTS.md and the real files.
- Default tier `flash`; use `--tier pro` only for tricky reasoning or cross-checks.
- Batch: one big, precise spec beats many small round-trips. Ask for a DIGEST back.
- Run write delegations on a git branch; review `git diff`, not the whole tree.

### Verify (non-negotiable)
Never trust agy's "done/green". Re-run the gates from AGENTS.md myself in a clean state and
check that it didn't touch `node_modules`, lockfile, lint/test config to force a pass.

### Windows note
Native Windows (Git Bash) can hang headless agy (upstream issue #6); the wrapper has a timeout.
If delegations hang repeatedly, run them from WSL with the repo on the Linux filesystem.
