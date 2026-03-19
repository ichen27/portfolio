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
