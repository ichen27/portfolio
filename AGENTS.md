# Portfolio
Source: https://github.com/ichen27/portfolio. Development belongs on the Mac mini SSD.
Read /Volumes/SamsungSSD1/AGENTS.md and the project registry before choosing a checkout.

## Content and design
The homepage is deliberately quiet: readable type, ordinary links, concise experience, selected work.
Project content lives in lib/work.ts; app/work/[slug]/page.tsx renders static case studies.
Keep claims tied to the evidence in docs/content-evidence.md. Distinguish designs, historical experiments,
software checks, and hardware results. Internal handoff documents and private runtime data stay outside Git.
Use actual artifacts with captions. Keep model validation metrics distinct from deployment or physical performance.

## Validation and delivery
Use package.json scripts for lint, typecheck, build, and exported-site checks.
Run desktop/mobile browser checks after layout changes; inspect figures and keyboard navigation.
Use a focused branch and PR. Check the current revision, review the diff, and verify remote state after merge.
Read docs/deployment.md before publishing. A Git push alone does not confirm a production deployment.
