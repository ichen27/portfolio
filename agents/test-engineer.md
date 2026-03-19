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
