# AGENTS.md — Minimal Tooling Guide

Purpose: quick reference for what tools/resources exist in this repo and when to use them.

## Core Planning Tools
- `BACKLOG.md`: source of truth for implementation work items and status.
- `REQUESTS.md`: place to log blockers/questions requiring human input.

## Role Prompts (Specialist Tools)
Use these when routing or handoff is needed.
- `agents/orchestrator.md`: coordination and task slicing.
- `agents/frontend-ui.md`: component architecture, styling, animations, accessibility.
- `agents/content.md`: copy, SEO, structured data.
- `agents/performance.md`: Core Web Vitals, bundle size, optimization.
- `agents/test-engineer.md`: test design and verification.
- `agents/deploy-ops.md`: Vercel deployment, CI/CD, monitoring.
- `agents/HANDOFF-CONTRACT.md`: required handoff format.
- `agents/README.md`: role topology and routing rules.

## Work Templates
Use these to keep outputs consistent.
- `templates/task-brief-template.md`: define scope, assumptions, acceptance criteria.
- `templates/implementation-plan-template.md`: break work into execution steps.
- `templates/review-template.md`: structured review/findings format.
- `templates/risk-check-template.md`: risk/threat check before merge.
- `templates/pr-summary-template.md`: PR summary and evidence format.

## Runtime/Test Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Governance: `node scripts/validate-governance.mjs`

## How To Use This Guide
1. Read `BACKLOG.md` item.
2. Use the right specialist prompt(s) in `agents/`.
3. Execute checks via commands above.
4. Record blockers in `REQUESTS.md`.
