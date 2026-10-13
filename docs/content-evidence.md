# Research evidence — October 13, 2026

The user explicitly rejected associating Agent Queue with agent-harness research. Its copy and public screenshot are removed. Research with measured evidence leads the homepage; experience follows. Launcher, messaging architecture and CAD application notes remain accessible at their existing URLs but are not featured research results.

## Featured studies

- Agent decision-making: existing deal-toy-designs/experiments/long_session_trial/results/analysis.json. `prepare-research.py` publishes an explicit numeric projection, excluding raw conversation, job internals and private runtime paths. Records retain acceptable action sets: E17 accepts build even though the nominal expected_action field says deliver. Five wrong advice outputs, not six. One paired 40-event sequence, no harness ablation, compaction test or general reliability claim.
- Geometry: fusion-recreation/experiments/2026-10-12-shared-topology/topology-comparison.json, all 54 rows and the actual shared-topology.png figure. Per-case topology, area/volume and sample-distance evidence; no global equivalence claim.
- Gaussian splats: apartment-3d-lab runtime output/san-francisco-trained/training-report.json, numeric-only extract. 576 training views, 12 synthetic evaluation views, four checkpoints and scene-specific cleanup. Same evaluation views reused after cleanup; no fresh test-set or physical-accuracy claim. Personal apartment imagery and full model are not copied into this site.
- Chess detector: unchanged historical 61-epoch CSV from lerobot-chess-player d91e36aeca09cfd27115dd931f4907238ab732fe. Dataset: Roboflow-100 chess-pieces-mjzgj v2, CC BY 4.0. Historical validation, not robot gameplay.

Original source filenames and SHA-256 hashes accompany numeric extracts. `scripts/render-research.py` draws the published agent and splat figures from those extracts; no interpolated observations or invented runs. `scripts/render-training.py` draws the detector curves. Figures are clickable for full-resolution inspection.

## Other material
Experience and resume retain the user-provided September CV. Cloudflare writeups derive from the supplied handoffs; full internal documents are not published. The exact active harness project was requested for clarification. The harness page now describes research questions and explicitly distinguishes the existing advice experiment from a future controlled test of the harness itself.

## Handshake benchmark evidence — October 13, 2026

Added /work/handshake-benchmarks/ as the first featured study. Source: private
Dynamo context-directory *delivery-record.json files, inspected on the mini.
Inclusion rule: phase=complete, official.pass_at_5.total=5. All 17 matching
records included; one incomplete record excluded. No selection by outcome.
17 tasks, 85 trials, 7 solves, 78 not solved; histogram [13,1,3,0,0,0].
This is a subset of archived work, not the total authored/accepted task count.

scripts/prepare-handshake.py accepts the private context directory as an argument.
Only anonymous IDs, numeric outcome counts and source-file SHA-256 digests are exported.
Task identities, prompts, hidden tests, solutions, private URLs and raw comments are excluded.
CSV and JSON contain identical rows. scripts/render-handshake.py regenerates both SVG
figures solely from the public JSON with matplotlib. Figure typography remains SVG text.

Important interpretation: not-solved includes timeouts. Three records explicitly
identify an in-progress timeout, and another calls all failures valid while its
summary notes a near-limit timeout. Do not relabel all 78 as semantic failures.
The chart intentionally uses solved/not-solved only. No model ranking, matched
budget claim, generalized success-rate claim or harness-causality claim is made.
Observed solves out of five are not a pass@k probability estimate.

Read-only attempts to re-read the 17 source PRs with the current gh identity
returned repository-not-found. This publication therefore cites archived records,
not live acceptance or current remote state. Public hashes preserve provenance
but do not make the private source documents independently reproducible.

## Portfolio sections — October 13, 2026

User requested dedicated Research, Development and About me sections. Existing five research studies retain their evidence. Development lists the launcher/MCP hub, CAD application and messaging harness, preserving documented maturity labels. Cloudflare work stays linked from experience. The personal copy is directly user-supplied: loves golf, began in 2024, reached a 15 handicap two years later. No extra hobbies or personal claims were inferred from private notes.
