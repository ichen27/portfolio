# Changelog

## Unreleased

### Added
- Added agent workflow governance structure adapted from hoppr project.
- Added root governance files: `AGENTS.md`, `BACKLOG.md`, `REQUESTS.md`, `DECISIONS.md`, `CHANGELOG.md`, `SKILL.md`.
- Added portfolio-specific agent roles in `agents/` (orchestrator, frontend-ui, content, performance, test-engineer, deploy-ops).
- Added handoff contract at `agents/HANDOFF-CONTRACT.md`.
- Added reusable templates in `templates/` for task briefs, implementation plans, reviews, risk checks, and PR summaries.
- Added governance validation script at `scripts/validate-governance.mjs`.
- Added CI/CD pipeline at `.github/workflows/ci.yml` with changes detection, policy validation, quality checks, Vercel deploy, and merge gate.
- Added initial architectural decision records (ADR-0001 through ADR-0007) documenting existing tech stack choices.

### Changed
- Replaced default Next.js template README with portfolio-specific project, workflow, and CI documentation.
- Converted portfolio project listings to a manifest-driven data model sourced from cloned repositories.
- Replaced hardcoded featured/other project arrays with typed manifest selectors.

### Fixed
- Removed unused imports/props and stale lint suppression in portfolio components to restore a clean lint baseline.
- Added a shared demo shell that surfaces demo mode and validation metadata for modal demos.
- Updated root lint/typecheck scoping to exclude cloned repos under `projects/` from portfolio CI checks.

## 0.1.0 — 2026-02-26

### Added
- Initial Next.js 16 portfolio site with App Router.
- Hero section with animated counters using Framer Motion.
- About, Experience, Skills, and Contact sections.
- Featured projects with interactive demo components (Far East AI, Kalshi, Alpaca, SkillPulse, QuantPrep).
- shadcn/ui component library (Button, Card, Badge, Tabs, ScrollArea, Separator).
- Dark-only theme with Tailwind CSS v4.
- Responsive design with mobile/desktop layouts.
