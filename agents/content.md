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
