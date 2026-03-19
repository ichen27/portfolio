# Ivan Chen Portfolio

A single-page portfolio built with Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and shadcn/ui.

## Stack
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui components

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server (port 3001):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3001`.

## Quality Checks
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Governance validation: `node scripts/validate-governance.mjs`

## Governance Workflow
This repo uses a markdown-first workflow for agent and human collaboration.

- `BACKLOG.md`: source of truth for work items and status.
- `REQUESTS.md`: blockers, tradeoffs, and human-input requests.
- `DECISIONS.md`: ADR log.
- `CHANGELOG.md`: release/change history.
- `AGENTS.md`: operating guide and command reference.

Only items marked `Status: READY` and `Approval: APPROVED` should be implemented.

## CI/CD
GitHub Actions workflow: `.github/workflows/ci.yml`

Pipeline stages:
- Changes detection (docs-only vs code)
- Governance policy validation
- Quality checks (lint, typecheck, build)
- Vercel deploy on `main`
- Required merge gate: `ci / merge-gate`
