# Agent Workflow Structure for Portfolio

**Date:** 2026-02-26
**Status:** Approved

## Summary

Add a comprehensive agent workflow governance structure to the portfolio project, adapted from the hoppr project. This includes root markdown governance files, portfolio-specific agent roles, reusable work templates, a CI/CD pipeline with governance validation and Vercel auto-deploy, and a governance enforcement script.

## Root Markdown Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Quick reference for tools, role prompts, work templates, runtime commands |
| `BACKLOG.md` | Source of truth for work items — template structure only |
| `REQUESTS.md` | Blocker/question log requiring human input — template only |
| `DECISIONS.md` | ADR log — seeded with existing tech stack decisions |
| `CHANGELOG.md` | Version history — initialized with existing commits |
| `SKILL.md` | Instructions for using system skills |

## Agent Roles (`agents/`)

| Role | File | Focus |
|------|------|-------|
| Orchestrator | `orchestrator.md` | Task classification, specialist routing, quality gates |
| Frontend-UI | `frontend-ui.md` | Component architecture, styling, animations, responsive design, accessibility |
| Content | `content.md` | Copy, SEO metadata, project descriptions, structured data |
| Performance | `performance.md` | Core Web Vitals, bundle size, image optimization, lazy loading |
| Test Engineer | `test-engineer.md` | Unit/integration/e2e test coverage, visual regression |
| Deploy-Ops | `deploy-ops.md` | Vercel deployment, CI/CD, environment config, monitoring |

Supporting files:
- `agents/README.md` — agent topology and routing decision tree
- `agents/HANDOFF-CONTRACT.md` — required output schema for specialist handoffs

## Templates (`templates/`)

1. `task-brief-template.md` — scope, goal, non-goals, risk, acceptance criteria
2. `implementation-plan-template.md` — proposed changes, impact, test plan, rollout
3. `review-template.md` — findings-first format with severity levels
4. `risk-check-template.md` — change summary, potential risks, recommendation
5. `pr-summary-template.md` — backlog traceability, summary, changes, testing

## CI/CD (`.github/workflows/ci.yml`)

Pipeline stages:
1. **Changes Detection** — classify docs-only vs code changes
2. **Policy Validation** — run `scripts/validate-governance.mjs`
3. **Quality** — lint + typecheck + build
4. **Deploy** — auto-deploy to Vercel on merge to main
5. **Merge Gate** — aggregates all checks

## DECISIONS.md Seeded ADRs

- ADR-0001: Next.js 16 with App Router
- ADR-0002: Tailwind CSS v4 for styling
- ADR-0003: shadcn/ui component library
- ADR-0004: Framer Motion for animations
- ADR-0005: Dark-only theme
- ADR-0006: Single-page portfolio architecture
- ADR-0007: Agent workflow governance model

## Approach

Faithful adaptation of the hoppr agent workflow structure with portfolio-specific agent roles, full CI enforcement, and Vercel auto-deploy. Same governance model and quality gates, adapted for a Next.js frontend portfolio project.
