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
