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
