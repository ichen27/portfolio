# Agent Workflow Structure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a comprehensive agent workflow governance structure to the portfolio project, adapted from the hoppr project, including root markdown files, agent roles, templates, CI/CD with Vercel deploy, and governance validation.

**Architecture:** Mirror hoppr's markdown-first orchestrator + specialist topology with portfolio-specific roles (frontend-ui, content, performance, test-engineer, deploy-ops). Governance enforced via CI with a validation script that checks BACKLOG.md and REQUESTS.md invariants. Full GitHub Actions pipeline: changes detection, policy validation, lint+typecheck+build, Vercel deploy on main, and a merge gate.

**Tech Stack:** Markdown governance files, Node.js governance validation script (ESM), GitHub Actions CI/CD, Vercel deployment

---

### Task 1: Create AGENTS.md

**Files:**
- Create: `AGENTS.md`

**Step 1: Create the file**

```markdown
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
```

**Step 2: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add AGENTS.md tooling guide"
```

---

### Task 2: Create BACKLOG.md (template only)

**Files:**
- Create: `BACKLOG.md`

**Step 1: Create the file**

```markdown
# BACKLOG

## Rules (for agents)
- You may only implement items where: `Status: READY` **and** `Approval: APPROVED`.
- `Status: READY` is only valid when `Approval: APPROVED`.
- Items with `Approval: REQUIRED` must be `TRIAGE` or `BLOCKED`.
- `PR` link is required before moving an item to `DONE`.
- If info is missing, convert the item to `TRIAGE` or `BLOCKED` and write a request in `REQUESTS.md`.
- One item at a time. New discoveries become new backlog items (do not expand scope mid-task).

# =========================
# ===== TEMPLATE (READ-ONLY)
# =========================

## Backlog Template
---

### NOW (READY + APPROVED)
<!-- Approved items go here -->
---
### QUEUE (TRIAGE / BLOCKED pending approval/input)
<!-- Items being shaped for approval live here -->
---
### IDEAS / FUNCTIONAL REQUIREMENTS (RAW)
<!-- One-liners only. Convert to TRIAGE when selected. -->
---
### DONE (recent)
<!-- Keep last ~10 for quick reference -->


## Work Item Template
### <TYPE>-<####> — <NAME>

Type: FEAT | BUG | DOC | REFACTOR | CHORE | PERF | SEC | DX
ID: <TYPE>-<####>
Priority: HIGH | MEDIUM | LOW
Risk: LOW | MEDIUM | HIGH

Approval: REQUIRED | APPROVED
Status: IDEA | TRIAGE | READY | DOING | BLOCKED | DONE
Blocking: <optional: what is blocking it / link to REQ-###>
PR: <required before DONE; link to PR>
Merge Commit: <optional merge sha>

Owner: AI
Created: YYYY-MM-DD
Last updated: YYYY-MM-DD

Context:
- <What's happening today / why this exists>

Simplified:
- <Plain-English summary of full scope in 1-3 bullets>

Goal (user-facing outcome):
- <What changes for the user or system>

In Scope:
- <bullet>

Out of Scope:
- <bullet>

Constraints:
- Follow existing patterns in: <file paths or modules>
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- <If needed; otherwise "None">

Acceptance Criteria:
- [ ] <testable outcome>

Implementation Notes (optional):
- Approach: <1–5 bullets>
- Edge cases: <bullets>

Files to Start Reading:
- <path A>

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS/FAIL + notes
- Typecheck: PASS/FAIL + notes
- Build: PASS/FAIL + notes
- CI Gate: PASS/FAIL + `ci / merge-gate` run link or evidence

Rollback Strategy:
- <Revert commit / feature flag / config toggle>


# =========================
# ===== LIVE BACKLOG BELOW
# =========================

---

## NOW (READY + APPROVED)

<!-- No items yet -->

---
## QUEUE (TRIAGE / BLOCKED pending approval/input)

<!-- No items yet -->

---
## IDEAS / FUNCTIONAL REQUIREMENTS (RAW)

<!-- No items yet -->

---
## DONE (recent)

<!-- No items yet -->
```

**Step 2: Commit**

```bash
git add BACKLOG.md
git commit -m "docs: add BACKLOG.md governance template"
```

---

### Task 3: Create REQUESTS.md (template only)

**Files:**
- Create: `REQUESTS.md`

**Step 1: Create the file**

```markdown
# REQUESTS.md

## Purpose

This file collects ANY item where human input would improve decision quality.

The agent should log requests here whenever:
- There is ambiguity
- Multiple valid approaches exist
- A tradeoff exists
- UX behavior is unclear
- Naming or wording matters
- Scope creep is possible
- A design preference may affect direction
- Approval is needed
- Or simply when human judgment would help
- New requests should be set as OPEN
- Requests that have been responded to will be labelled as RESPONDED


### Request Status Modes

OPEN
- The agent created the request.
- Awaiting human response.

RESPONDED
- The human has filled in the HUMAN RESPONSE section.
- The agent must process the response before continuing.
- Agent must update linked item in `BACKLOG.md` (status/approval/blocking) before implementation proceeds.

DONE
- The agent processed the response.
- Backlog and/or Decisions updated accordingly.
- Request is complete.

# =========================
# ===== TEMPLATE (READ-ONLY)
# =========================

## Request Template

### <TYPE>-<####> — <NAME>

Status: [OPEN | RESPONDED | DONE]

Blocking: [YES | NO]
Related Task: <BACKLOG-ID>
Backlog Update Required: [YES | NO]
Owner: <team or person>
Due Date: YYYY-MM-DD

Context:
<What needs to be decided and why>

Options:
1) <option>
2) <option>
3) <option>

Tradeoffs:
- <option>: <pros/cons>

Recommendation:
<preferred option and reasoning>

Impact:
<what this decision affects>

Unblock Recommendation:
- Mark linked backlog item as `READY + APPROVED` immediately after response is processed.

Human Input Requested:
- <specific question>

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: <what changed>
- DECISIONS: <what changed or N/A>

---


# =========================
# ===== LIVE REQUESTS BELOW
# =========================


---

## OPEN

<!-- No open requests -->

---
## RESPONDED

<!-- No responded requests -->

---
## DONE (recent)

<!-- No completed requests -->
```

**Step 2: Commit**

```bash
git add REQUESTS.md
git commit -m "docs: add REQUESTS.md governance template"
```

---

### Task 4: Create DECISIONS.md with seeded ADRs

**Files:**
- Create: `DECISIONS.md`

**Step 1: Create the file**

```markdown
# Decisions

## 2026-02-26 - Next.js 16 with App Router (ADR-0001)
- Status: accepted
- Context: Needed a modern React framework for a portfolio site with good SEO, performance, and developer experience.
- Decision: Use Next.js 16 with the App Router for server-side rendering and file-based routing.
- Rationale:
  - App Router provides React Server Components for better performance.
  - Built-in image optimization and metadata API for SEO.
  - Strong ecosystem and deployment support (Vercel).
- Consequences:
  - Project uses `app/` directory structure with `layout.tsx` and `page.tsx` conventions.
  - Components that need interactivity must be marked with `"use client"`.
- Rollback:
  - Migrate to Pages Router or alternative framework.

## 2026-02-26 - Tailwind CSS v4 for styling (ADR-0002)
- Status: accepted
- Context: Needed a styling approach that enables rapid UI development with consistent design tokens.
- Decision: Use Tailwind CSS v4 with PostCSS integration.
- Rationale:
  - Utility-first approach enables fast iteration without context-switching to CSS files.
  - v4 provides improved performance and simplified configuration.
  - Works well with component libraries like shadcn/ui.
- Consequences:
  - Styles are applied via utility classes in JSX rather than separate CSS files.
  - `globals.css` contains Tailwind directives and custom properties.
- Rollback:
  - Replace utility classes with CSS modules or styled-components.

## 2026-02-26 - shadcn/ui component library (ADR-0003)
- Status: accepted
- Context: Needed reusable, accessible UI components without heavy library dependencies.
- Decision: Use shadcn/ui for base components (Button, Card, Badge, Tabs, ScrollArea, Separator).
- Rationale:
  - Components are copied into the project (not installed as a dependency), giving full control.
  - Built on Radix UI primitives for accessibility.
  - Consistent with Tailwind CSS styling approach.
- Consequences:
  - Components live in `components/ui/` and are project-owned.
  - Uses `class-variance-authority` for variant management and `clsx`/`tailwind-merge` for class composition.
- Rollback:
  - Replace with alternative component library or custom components.

## 2026-02-26 - Framer Motion for animations (ADR-0004)
- Status: accepted
- Context: Portfolio needs polished animations for hero section, project cards, and section transitions.
- Decision: Use Framer Motion v12 for declarative animations.
- Rationale:
  - Declarative API integrates cleanly with React component model.
  - `useInView` hook enables scroll-triggered animations.
  - Handles layout animations and gesture interactions.
- Consequences:
  - Animation logic is co-located with components using `motion` components.
  - Adds ~30KB to client bundle.
- Rollback:
  - Replace with CSS animations or alternative library (e.g., react-spring).

## 2026-02-26 - Dark-only theme (ADR-0005)
- Status: accepted
- Context: Portfolio site needed a visual identity decision for theming.
- Decision: Ship with dark theme only (hardcoded `className="dark"` on root HTML element).
- Rationale:
  - Simpler to maintain one polished theme than two mediocre ones.
  - Dark theme suits the developer portfolio aesthetic.
  - `next-themes` is installed for future light mode support if needed.
- Consequences:
  - All color choices assume dark background.
  - `next-themes` ThemeProvider is configured but theme toggle is not exposed.
- Rollback:
  - Expose theme toggle and add light theme color variants.

## 2026-02-26 - Single-page portfolio architecture (ADR-0006)
- Status: accepted
- Context: Portfolio content (hero, about, experience, projects, skills, contact) needed a navigation structure.
- Decision: Use a single-page layout with all sections rendered on `app/page.tsx`.
- Rationale:
  - All content fits naturally on one page with scroll navigation.
  - Simpler routing and faster perceived navigation.
  - Better for SEO as all content is on one URL.
- Consequences:
  - `app/page.tsx` imports and renders all section components sequentially.
  - No client-side routing needed between sections.
- Rollback:
  - Split sections into separate routes with shared layout.

## 2026-02-26 - Agent workflow governance model (ADR-0007)
- Status: accepted
- Context: Project lacked structured governance for agent-driven development workflows.
- Decision: Adopt markdown-first orchestrator + specialist topology adapted from the hoppr project, with portfolio-specific agent roles and CI enforcement.
- Rationale:
  - Proven structure from sibling project.
  - Standardizes task management, decision records, and quality gates.
  - CI-enforced governance prevents drift.
- Consequences:
  - New files: `AGENTS.md`, `BACKLOG.md`, `REQUESTS.md`, `DECISIONS.md`, `CHANGELOG.md`, `SKILL.md`.
  - New directories: `agents/`, `templates/`, `scripts/`, `.github/workflows/`.
  - `ci / merge-gate` becomes required check for PRs.
- Rollback:
  - Remove governance files and CI workflow; revert to ad-hoc development.
```

**Step 2: Commit**

```bash
git add DECISIONS.md
git commit -m "docs: add DECISIONS.md with initial ADRs for existing tech stack"
```

---

### Task 5: Create CHANGELOG.md

**Files:**
- Create: `CHANGELOG.md`

**Step 1: Create the file**

```markdown
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

## 0.1.0 — 2026-02-26

### Added
- Initial Next.js 16 portfolio site with App Router.
- Hero section with animated counters using Framer Motion.
- About, Experience, Skills, and Contact sections.
- Featured projects with interactive demo components (Far East AI, Kalshi, Alpaca, SkillPulse, QuantPrep).
- shadcn/ui component library (Button, Card, Badge, Tabs, ScrollArea, Separator).
- Dark-only theme with Tailwind CSS v4.
- Responsive design with mobile/desktop layouts.
```

**Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: add CHANGELOG.md with version history"
```

---

### Task 6: Create SKILL.md

**Files:**
- Create: `SKILL.md`

**Step 1: Create the file**

```markdown
# Skill Usage in This Repo

Use local skills only when task intent matches their trigger conditions.

## Available System Skills
- `skill-creator`: create or update a Codex skill package.
- `skill-installer`: install skills from curated sources or GitHub paths.

## Rules
1. Do not invoke skills for regular feature/bug/test tasks in this repo.
2. Use `skill-creator` only when the request is to design or revise a reusable Codex skill.
3. Use `skill-installer` only when the request is to discover/install skills.
4. If a skill is not needed, continue with standard `AGENTS.md` + `agents/` workflow.
```

**Step 2: Commit**

```bash
git add SKILL.md
git commit -m "docs: add SKILL.md for skill usage guidance"
```

---

### Task 7: Create agents/ directory — README.md and HANDOFF-CONTRACT.md

**Files:**
- Create: `agents/README.md`
- Create: `agents/HANDOFF-CONTRACT.md`

**Step 1: Create agents/README.md**

```markdown
# Agent Topology

This repository uses a core orchestrator plus specialists.

## Canonical Policy Location
Process gates, task-mode rules, required evidence, and the canonical workflow lifecycle are defined in `AGENTS.md`.
Use this file for role definitions and routing only.

Cross-role merge rule: all tasks (including docs-only) merge by PR with required check `ci / merge-gate`.

## Roles
- `orchestrator`: intake, risk classification, delegation, synthesis, readiness.
- `frontend-ui`: component architecture, styling, animations, responsive design, accessibility.
- `content`: copy, SEO metadata, project descriptions, structured data.
- `performance`: Core Web Vitals, bundle size, image optimization, lazy loading.
- `test-engineer`: test coverage strategy and regression risk control.
- `deploy-ops`: Vercel deployment, CI/CD, environment config, monitoring.

## Routing Decision Tree
1. Start with `orchestrator` for every non-trivial task.
2. Add `frontend-ui` for component/styling/animation/layout/accessibility changes.
3. Add `content` for copy/SEO/metadata/structured-data changes.
4. Add `performance` for bundle size/Core Web Vitals/image optimization/lazy loading changes.
5. Add `test-engineer` whenever behavior changes or bug fixes are involved.
6. Add `deploy-ops` when changes affect deployment, CI, environment config, or monitoring.

## Routing Examples
### Example A: Add a new project card with animation
- Route: `orchestrator` + `frontend-ui` + `content` + `test-engineer`
- Reason: new component with styling, copy, and behavior to test.

### Example B: Optimize page load performance
- Route: `orchestrator` + `performance` + `frontend-ui` + `test-engineer`
- Reason: bundle/loading changes affecting UI and measurable metrics.

### Example C: Set up staging deployment
- Route: `orchestrator` + `deploy-ops`
- Reason: infrastructure/config change with no runtime behavior impact.

## Single-Agent Case
Use only `orchestrator` for docs-only tasks that do not change runtime behavior.
```

**Step 2: Create agents/HANDOFF-CONTRACT.md**

```markdown
# Handoff Contract v1

All specialist outputs must follow this schema.

## Required Sections
### Scope
- What was analyzed or changed.

### Assumptions
- Explicit assumptions. Use `None` if empty.

### Files Touched
- Repo-relative paths.
- Include line references when relevant.

### Behavioral Changes
- External behavior changes.
- Visual/layout changes.
- SEO/metadata changes.

### Risks
- Known failure modes and confidence level.
- Accessibility risks and mitigations.
- Performance risks and mitigations.

### Tests
- Added/updated tests.
- Commands run and outcomes.
- Explicitly state if tests were not run.

### Rollout / Rollback Notes
- Required config changes.
- Safe rollback behavior.

## Output Rules
- Findings first when performing review tasks.
- No ambiguous language for acceptance criteria.
- If blocked, identify the blocker and propose 2-3 options with a recommendation.
```

**Step 3: Commit**

```bash
git add agents/README.md agents/HANDOFF-CONTRACT.md
git commit -m "docs: add agent topology and handoff contract"
```

---

### Task 8: Create agent role files

**Files:**
- Create: `agents/orchestrator.md`
- Create: `agents/frontend-ui.md`
- Create: `agents/content.md`
- Create: `agents/performance.md`
- Create: `agents/test-engineer.md`
- Create: `agents/deploy-ops.md`

**Step 1: Create agents/orchestrator.md**

```markdown
# Role: Orchestrator

## Mission
Deliver ship-safe velocity by turning ambiguous tasks into decision-complete implementation and review work.

## Responsibilities
1. Classify task and risk.
2. Select specialist set from `agents/README.md`.
3. Create concise task briefs using `templates/task-brief-template.md`.
4. Synthesize specialist output and resolve conflicts.
5. Enforce quality/test gates from `AGENTS.md`.
6. Enforce PR-first delivery gates: branch workflow, `ci / merge-gate`, approvals, and squash merge.

## Task Classification
- `micro-fix`: typo, single-line change, no behavior impact.
- `small-fix`: localized code path, low risk.
- `feature`: additive behavior in one or more components.
- `cross-cutting`: multiple subsystems or docs+code+ops impact.
- `docs-only`: behavior unchanged.

## Required Checklist
- Backlog execution gate validated (`READY + APPROVED`).
- Required CI check identity validated (`ci / merge-gate`).
- Lint passes: `npm run lint`.
- Build passes: `npm run build`.

## Output Contract
Produce final output with:
- summary,
- key changes,
- test evidence,
- residual risks,
- rollout/rollback note (if relevant).
```

**Step 2: Create agents/frontend-ui.md**

```markdown
# Role: Frontend UI Specialist

## Focus
Component architecture, styling, animations, responsive design, and accessibility.

## Source of Truth
- `components/` directory structure and existing patterns
- `components/ui/` for shadcn/ui base components
- `app/page.tsx` for section composition

## Guardrails
- Preserve existing component API and prop contracts.
- Maintain responsive behavior across mobile/desktop breakpoints.
- Ensure WCAG 2.1 AA accessibility compliance.
- Keep Framer Motion animations performant (no layout thrashing).
- Follow shadcn/ui patterns for new base components.

## Required Checks
- Visual consistency with existing design language.
- Responsive layout at mobile (375px), tablet (768px), and desktop (1280px).
- Keyboard navigation and screen reader compatibility.
- No hydration mismatches between server and client.

## Deliverable
Return results using `agents/HANDOFF-CONTRACT.md`.
```

**Step 3: Create agents/content.md**

```markdown
# Role: Content Specialist

## Focus
Copy, SEO metadata, project descriptions, and structured data.

## Source of Truth
- `app/layout.tsx` for root metadata
- Component files for inline copy
- `public/` for static assets referenced in metadata

## Guardrails
- Maintain consistent tone and voice across all sections.
- Ensure meta titles are under 60 characters and descriptions under 160 characters.
- Use semantic HTML elements for content structure.
- Keep project descriptions accurate and up-to-date.

## Required Checks
- Open Graph and Twitter Card metadata present and valid.
- No broken links in project descriptions or contact info.
- Structured data (JSON-LD) validates against schema.org.
- Content renders correctly without JavaScript (SSR).

## Deliverable
Return results using `agents/HANDOFF-CONTRACT.md`.
```

**Step 4: Create agents/performance.md**

```markdown
# Role: Performance Specialist

## Focus
Core Web Vitals, bundle size, image optimization, and lazy loading.

## Source of Truth
- `next.config.ts` for Next.js optimization settings
- `app/layout.tsx` for font loading and global scripts
- `components/` for client-side bundle impact

## Guardrails
- Keep First Contentful Paint under 1.5s on 3G.
- Keep Largest Contentful Paint under 2.5s.
- Keep Cumulative Layout Shift under 0.1.
- Minimize client-side JavaScript (`"use client"` only when needed).
- Use Next.js Image component for all images.

## Required Checks
- Bundle size impact of changes (check with `npm run build`).
- No unnecessary `"use client"` directives.
- Images optimized and properly sized.
- Fonts loaded with `next/font` for zero layout shift.

## Deliverable
Return results using `agents/HANDOFF-CONTRACT.md`.
```

**Step 5: Create agents/test-engineer.md**

```markdown
# Role: Test Engineer

## Focus
Convert behavior changes into meaningful test coverage and regression checks.

## Source of Truth
- Existing component files in `components/`
- `app/` directory for page-level behavior

## Guardrails
- Tests must prove changed behavior, edge cases, and failure paths.
- Prefer deterministic tests and explicit assertions.
- Do not claim test execution that did not happen.

## Required Checks
- Happy path + edge path + failure path coverage.
- Visual regression for layout/style changes when relevant.
- Accessibility testing (keyboard nav, screen reader).
- CI command alignment (`npm run build` passes).

## Deliverable
Return results using `agents/HANDOFF-CONTRACT.md`.
```

**Step 6: Create agents/deploy-ops.md**

```markdown
# Role: Deploy & Ops Specialist

## Focus
Vercel deployment, CI/CD pipeline, environment configuration, and monitoring.

## Source of Truth
- `.github/workflows/ci.yml` for CI pipeline
- `next.config.ts` for build configuration
- `package.json` for scripts and dependencies
- `scripts/validate-governance.mjs` for governance enforcement

## Guardrails
- CI must pass before merge (enforce `ci / merge-gate`).
- Governance validation must run on every push.
- Vercel deploy only on merge to main.
- No secrets in repository (use GitHub Secrets / Vercel env vars).

## Required Checks
- CI pipeline runs successfully for code changes.
- Governance validation passes for all changes.
- Build succeeds on Vercel (no build errors).
- Environment variables documented and configured.

## Deliverable
Return results using `agents/HANDOFF-CONTRACT.md`.
```

**Step 7: Commit**

```bash
git add agents/orchestrator.md agents/frontend-ui.md agents/content.md agents/performance.md agents/test-engineer.md agents/deploy-ops.md
git commit -m "docs: add portfolio-specific agent role definitions"
```

---

### Task 9: Create templates/ directory

**Files:**
- Create: `templates/task-brief-template.md`
- Create: `templates/implementation-plan-template.md`
- Create: `templates/review-template.md`
- Create: `templates/risk-check-template.md`
- Create: `templates/pr-summary-template.md`

**Step 1: Create templates/task-brief-template.md**

```markdown
# Task Brief Template

## Goal
-

## Non-Goals
-

## Backlog Item
- ID:
- Current Status/Approval:

## Task Mode
- `micro-fix | small-fix | feature | cross-cutting | docs-only`

## Gate Level
- `light | standard | strict`

## Risk Level
- `low | medium | high`

## Constraints
- Accessibility:
- Backward compatibility:
- Performance:
- Dependency constraints:

## Relevant Docs
-

## Acceptance Criteria
1.
2.
3.

## Required Specialists
-

## PR / Merge Gate
- PR required: `YES`
- Required CI check: `ci / merge-gate`
- Expected merge method: `squash`

## Required Evidence
- Commands/tests that must be run:
- `ci / merge-gate` evidence source (link or run metadata):
- Risks that must be evaluated:
- Rollback details required?:
```

**Step 2: Create templates/implementation-plan-template.md**

```markdown
# Implementation Plan Template

## Scope Summary
-

## Proposed Changes
1.
2.
3.

## Component Impact
-

## Visual/Layout Impact
-

## Docs Impacted
-

## Performance Impact
- Bundle size:
- Core Web Vitals:

## Risks and Mitigations
-

## Test Plan
- Unit:
- Integration:
- Visual/manual:

## Rollout / Rollback Impact
- Config:
- Rollout steps:
- Rollback steps:
```

**Step 3: Create templates/review-template.md**

```markdown
# Review Template (Findings First)

## Findings
1. Severity: `high | medium | low`
   - File:
   - Impact:
   - Why it matters:
   - Recommended fix:
   - Test gap:

## Contract and Risk Assessment
- Component API impact:
- Accessibility impact:
- Performance impact:
- Rollback risk:

## Open Questions / Assumptions
-

## Change Summary
-

## Commands Run
-
```

**Step 4: Create templates/risk-check-template.md**

```markdown
# Risk Check Template

## Change Summary
-

## Potential Risks
1.
2.

## Accessibility Impact
- WCAG compliance:
- Keyboard navigation:
- Screen reader:

## Performance Impact
- Bundle size:
- Core Web Vitals:
- Loading behavior:

## Operational Impact
- Config:
- Deployment:
- Rollback behavior:

## Recommendation
-
```

**Step 5: Create templates/pr-summary-template.md**

```markdown
# PR Summary Template

## Backlog / Request Traceability
- Backlog ID:
- Related Request(s):

## Summary
-

## Context
- Issue:
- Current vs desired behavior:

## Changes
-

## Testing
- Commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Required check:
  - `ci / merge-gate`: PASS/FAIL + link
- Review evidence:
  - Approval(s):
  - Unresolved review comments: YES/NO

## Rollout / Ops
- Config:
- Deployment:
- Monitoring:
- Rollback:

## Emergency (only if PR has `emergency` label)
- Incident:
- Risk:
- Rollback:
- Follow-up:
```

**Step 6: Commit**

```bash
git add templates/
git commit -m "docs: add reusable work templates for briefs, plans, reviews, risks, and PRs"
```

---

### Task 10: Create governance validation script

**Files:**
- Create: `scripts/validate-governance.mjs`

**Step 1: Create the script**

```javascript
#!/usr/bin/env node

import { readFileSync } from "node:fs";

function fail(message) {
  console.error(`governance validation failed: ${message}`);
  process.exit(1);
}

function parseBacklogItems(content) {
  const items = [];
  const lines = content.split("\n");
  let current = null;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (current) {
        items.push(current);
      }
      current = {
        title: line.replace(/^###\s+/, "").trim(),
        status: null,
        approval: null
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const statusMatch = line.match(/^Status:\s*(.+)\s*$/);
    if (statusMatch) {
      current.status = statusMatch[1].trim();
      continue;
    }

    const approvalMatch = line.match(/^Approval:\s*(.+)\s*$/);
    if (approvalMatch) {
      current.approval = approvalMatch[1].trim();
    }
  }

  if (current) {
    items.push(current);
  }
  return items;
}

const backlogContent = readFileSync("BACKLOG.md", "utf8");
const requestsContent = readFileSync("REQUESTS.md", "utf8");

if (backlogContent.includes("READY but not approved")) {
  fail("BACKLOG.md contains contradictory phrase 'READY but not approved'.");
}

if (!requestsContent.includes("RESPONDED")) {
  fail("REQUESTS.md is missing required status heading 'RESPONDED'.");
}

const items = parseBacklogItems(backlogContent);
for (const item of items) {
  if (item.status === "READY" && item.approval === "REQUIRED") {
    fail(`${item.title} uses invalid state READY + REQUIRED.`);
  }
}

console.log(`governance validation passed (${items.length} backlog entries checked).`);
```

**Step 2: Test the script**

Run: `node scripts/validate-governance.mjs`
Expected: `governance validation passed (0 backlog entries checked).`

**Step 3: Commit**

```bash
git add scripts/validate-governance.mjs
git commit -m "ci: add governance validation script"
```

---

### Task 11: Add validate:governance npm script

**Files:**
- Modify: `package.json`

**Step 1: Add the script to package.json**

Add `"validate:governance": "node scripts/validate-governance.mjs"` to the scripts section.

**Step 2: Test**

Run: `npm run validate:governance`
Expected: `governance validation passed (0 backlog entries checked).`

**Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add validate:governance npm script"
```

---

### Task 12: Create CI/CD pipeline

**Files:**
- Create: `.github/workflows/ci.yml`

**Step 1: Create the workflow file**

```yaml
name: ci

on:
  push:
    branches: ["**"]
  pull_request:

jobs:
  changes:
    name: changes
    runs-on: ubuntu-latest
    outputs:
      docs_only: ${{ steps.classify.outputs.docs_only }}
    steps:
      - uses: actions/checkout@v4
      - id: classify
        env:
          EVENT_NAME: ${{ github.event_name }}
          BASE_SHA: ${{ github.event.pull_request.base.sha }}
          BEFORE_SHA: ${{ github.event.before }}
        run: |
          set -eu
          if [ "$EVENT_NAME" = "pull_request" ]; then
            base_ref="$BASE_SHA"
          else
            base_ref="$BEFORE_SHA"
          fi

          if [ -z "${base_ref:-}" ] || [ "$base_ref" = "0000000000000000000000000000000000000000" ]; then
            echo "docs_only=false" >> "$GITHUB_OUTPUT"
            exit 0
          fi

          git fetch --no-tags --prune --depth=1 origin "$base_ref"
          changed_files="$(git diff --name-only "$base_ref"...HEAD)"
          if [ -z "$changed_files" ]; then
            echo "docs_only=true" >> "$GITHUB_OUTPUT"
            exit 0
          fi

          docs_only=true
          for file in $changed_files; do
            case "$file" in
              *.md|docs/*|agents/*|templates/*)
                ;;
              *)
                docs_only=false
                break
                ;;
            esac
          done
          echo "docs_only=$docs_only" >> "$GITHUB_OUTPUT"

  policy-validate:
    name: policy-validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node scripts/validate-governance.mjs
      - name: Enforce emergency PR metadata
        if: github.event_name == 'pull_request' && contains(github.event.pull_request.labels.*.name, 'emergency')
        env:
          PR_BODY: ${{ github.event.pull_request.body }}
        run: |
          set -eu
          body="$(printf '%s\n' "$PR_BODY")"
          echo "$body" | grep -q "## Emergency" || { echo "Missing '## Emergency' section"; exit 1; }
          echo "$body" | grep -q "Incident:" || { echo "Missing 'Incident:' field"; exit 1; }
          echo "$body" | grep -q "Risk:" || { echo "Missing 'Risk:' field"; exit 1; }
          echo "$body" | grep -q "Rollback:" || { echo "Missing 'Rollback:' field"; exit 1; }
          echo "$body" | grep -q "Follow-up:" || { echo "Missing 'Follow-up:' field"; exit 1; }

  quality:
    name: quality
    needs: [changes]
    if: needs.changes.outputs.docs_only != 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci || npm install
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build

  deploy:
    name: deploy
    needs: [quality, policy-validate]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci || npm install
      - run: npm install -g vercel
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

  merge-gate:
    name: merge-gate
    needs: [changes, policy-validate, quality]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Validate upstream job results
        env:
          DOCS_ONLY: ${{ needs.changes.outputs.docs_only }}
          POLICY_VALIDATE: ${{ needs.policy-validate.result }}
          QUALITY: ${{ needs.quality.result }}
        run: |
          set -eu

          if [ "$POLICY_VALIDATE" != "success" ]; then
            echo "policy-validate must pass. Got: $POLICY_VALIDATE"
            exit 1
          fi

          if [ "$DOCS_ONLY" = "true" ]; then
            if [ "$QUALITY" != "skipped" ]; then
              echo "Expected quality job to be skipped for docs-only changes."
              echo "quality=$QUALITY"
              exit 1
            fi
            exit 0
          fi

          if [ "$QUALITY" != "success" ]; then
            echo "quality must pass for non-docs changes. Got: $QUALITY"
            exit 1
          fi
```

**Step 2: Commit**

```bash
mkdir -p .github/workflows
git add .github/workflows/ci.yml
git commit -m "ci: add full CI/CD pipeline with governance validation, quality checks, Vercel deploy, and merge gate"
```

---

### Task 13: Update .gitignore for scripts directory

**Files:**
- Modify: `.gitignore` (verify `scripts/` is not ignored)

**Step 1: Check .gitignore**

Read `.gitignore` and verify that `scripts/` is not accidentally excluded. If it is, remove the exclusion.

**Step 2: Commit (only if changes needed)**

```bash
git add .gitignore
git commit -m "chore: ensure scripts directory is not gitignored"
```

---

### Task 14: Final verification

**Step 1: Run governance validation**

Run: `npm run validate:governance`
Expected: `governance validation passed (0 backlog entries checked).`

**Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

**Step 3: Run build**

Run: `npm run build`
Expected: PASS

**Step 4: Verify file structure**

Run: `find . -path ./node_modules -prune -o -path ./.git -prune -o -path ./.next -prune -o \( -name "*.md" -o -name "*.mjs" -o -name "*.yml" \) -print | sort`

Expected output should include:
```
./AGENTS.md
./BACKLOG.md
./CHANGELOG.md
./DECISIONS.md
./REQUESTS.md
./SKILL.md
./agents/HANDOFF-CONTRACT.md
./agents/README.md
./agents/content.md
./agents/deploy-ops.md
./agents/frontend-ui.md
./agents/orchestrator.md
./agents/performance.md
./agents/test-engineer.md
./templates/task-brief-template.md
./templates/implementation-plan-template.md
./templates/review-template.md
./templates/risk-check-template.md
./templates/pr-summary-template.md
./scripts/validate-governance.mjs
./.github/workflows/ci.yml
./docs/plans/2026-02-26-agent-workflow-structure-design.md
./docs/plans/2026-02-26-agent-workflow-structure.md
```

**Step 5: Final commit for design docs**

```bash
git add docs/
git commit -m "docs: add design docs for agent workflow structure"
```
