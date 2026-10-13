# Research revision review — October 13, 2026

User correction: Agent Queue is unrelated to the intended agent-harness research. The site must foreground research and evidence, not frontend/app development.

## Result
- Removed Agent Queue association and public image. Four evidence-backed studies lead the homepage; experience follows.
- Every featured study has a measured finding, real data-derived figure, accessible result table, and downloadable evidence. Actual geometry figure retained.
- Restored completed long-session trial and Gaussian-splat experiment evidence previously omitted from the portfolio.
- Agent-harness page identifies research questions, links the documented evaluation method, and does not claim the advisor pilot is an ablation of the harness itself. Exact current harness project remains to be identified by the user.
- Existing non-research URLs remain available, but launcher, messaging design, and CAD application notes are not featured as measured research.

## Findings resolved
- Scored advice against acceptable_actions. E17 permits build; nominal expected_action alone would falsely count a sixth wrong recommendation.
- Disclosed that splat cleanup reused the same synthetic evaluation set. No physical-accuracy or fresh-test claim.
- Published only explicit numeric projections and source hashes, excluding raw messages, source paths and personal apartment images.
- Full-resolution figure links and downloadable data work without application state.

## Verification
Lint (eight pre-existing inactive-component warnings), TypeScript, production build and export checks pass.
Fourteen exported HTML documents and 236 local link/asset references checked; ten existing study/note URLs retained.
Desktop and mobile screenshots inspected. Homepage and all four research studies tested at 320px: no horizontal overflow or broken images.
Evidence checks cover all 80 agent events, five incorrect recommendations, the E17 recovery case, all 54 geometry cases and splat counts.
No branch protection is configured on main; current CI and Vercel preview must pass before merge.

## Handshake evidence revision — October 13, 2026

Reviewed the full content/schema/template diff and all new public artifacts.
No actionable findings remain. Public records use an explicit allowlist of fields;
private task identities, repository URLs, prompts and solutions are absent.
Confirmed 17 source records, 85 trials, 7 solves and histogram 13/1/3/0/0/0.
CSV/JSON row equality, sums, unique IDs, source hashes and exported links are checked in CI.

Validation: lint (0 errors, 8 existing warnings in legacy components), TypeScript,
production build and static export checks passed. Browser checks: 1280px desktop,
390px mobile and 320px narrow viewport, no horizontal overflow or broken images.
Tab reaches the skip link. Both chart images, evidence table and artifact links render.
Screenshots: docs/media/handshake-desktop.png and handshake-mobile.png.

## Section navigation and personal copy — October 13, 2026

Reviewed the focused diff: dedicated sections, metadata, selected development entries and section-aware breadcrumbs. Existing /#work anchor retained for compatibility. No actionable findings. Lint (zero errors, eight pre-existing warnings), typecheck, build and export checks passed. Browser inspection at 1280/390/320px confirms five research entries, three development entries, About me golf copy, valid navigation targets, no horizontal overflow or broken images. Launcher breadcrumb returns to Development. Screenshots: docs/media/sections-desktop.png and sections-mobile.png.
