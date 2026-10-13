# Redesign review — October 12, 2026

Reviewed the homepage, shared case-study renderer, source content, build configuration, and export checks against the requested minimal portfolio.

- Desktop 1280px and mobile 390px screenshots inspected. Home at 320px has no horizontal overflow. Keyboard Tab reaches the skip link.
- Actual Agent Queue demo and CAD validation media inspected; synthetic/demo content is captioned. Vision chart comes from the original CSV.
- Corrected image dimensions to reserve the actual aspect ratio, relative figure wording, and the start command for static export.
- Build and exported-site validation pass: ten case studies, 211 local link/asset references, resume and training CSV.
- Lint passes with eight existing warnings in inactive legacy components. TypeScript passes. No dependency changes.
- No protected main branch was configured when inspected. CI runs on pull requests and main; merge must wait for current checks.
- Original portfolio and portfolio-preview working tree changes are preserved in their separate checkouts.
