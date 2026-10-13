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

## Research comparisons and dedicated pages — October 13, 2026

Supersedes the count-only Handshake presentation and the 40-event decision pilot as the featured evidence.

Handshake: official categories are projected directly from the same 17 private delivery records, with 11 categories, 85 attempts and 7 solves. Four local redesign comparisons are curated from the Dynamo difficulty-methods ledger, whose SHA and per-entry hashes are recorded in handshake-methods.json. M1 formal verification: 2/2 to 2/2; M2 CAD conventions: 2/2 to 2/2; M3 competing evidence scopes: 2/2 to 0/5; M4 archive-specific ML inference: 2/2 to the later fairness-corrected 3/10. Do not substitute the earlier unfair 0/10 or pool local and official observations. Different sample sizes, settings and task revisions prevent causal or model-ranking claims. The separate analytics example (local 0/5 versus official 2/2) comes from the explicit analytics profile ledger entry. Public artifacts omit task identities, prompts, hidden tests and solutions.

Decision runtime: the inspected mcp-hub runtime-v2 evaluation from October 12 contains ten synthetic families × two repetitions × three policies. Numeric fields only are projected from runs.jsonl by prepare-runtime.py. Summary totals are checked against all 60 rows. Same fixtures and deterministic graders, counterbalanced sequential order, all in-runtime calls counted. Astra 20/20, Luna 19/20, hybrid 20/20; estimated USD 0.239360, 0.002614, 0.1866858. Hybrid uses Astra on 26/36 steps; no standalone Decisions-only arm. Reported cost estimates are historical, not current pricing. No generic "advice" labels in the featured page or original pilot figure.

Separate CAD selection replay: original precision-pilot summary supplies 28 cases, rules 21/28, Jev 27/28, independent current-agent baseline 28/28. Only scores, source hash, scope and limitations are published in decision-cad-replay.json. C04 has a defensible alternative; no executed geometry or baseline timing is claimed. The original 40-event paired pilot remains linked as distinct evidence.

Development: canonical registered project READMEs and vault design notes establish ClearFlow, CuseSublets, Far East / Restaurant Call Agent, Personal Inbox / Dot, Launchpad / MCP Hub, CAD, walkthrough prototypes and Enterprise Knowledge Base. ClearFlow and restaurant images are existing public demo screenshots with synthetic content, inspected before copying. No private inbox or apartment photos were copied. Dot's broader approval/drafting service is a design; the implemented inbox is read-only. The marketplace integration of 3D capture is not claimed.

Geometry, reconstruction and vision now explain their role in larger research programs before showing bounded experiments. Apartment context uses the repo's documented 48 RGB versus 357 RGB-D trials and explicitly distinguishes unmatched inputs from a controlled algorithm comparison.

Navigation is now four separate routes, using normal accessible links and aria-current: /research/, /development/, /experience/, /about/. Root mirrors Research. Work pages retain their URLs and return to the appropriate section page.
