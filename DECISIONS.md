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
