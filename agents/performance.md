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
