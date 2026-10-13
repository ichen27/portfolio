export type Work = {
  slug: string; title: string; area: string; status: string; summary: string;
  question: string; context?: string; sections: { title: string; text: string }[];
  links?: { label: string; href: string }[];
  image?: { src: string; width: number; height: number; alt: string; caption: string };
  additionalFigures?: NonNullable<Work["image"]>[];
  flow?: string[];
  finding?: string;
  evidence?: { label: string; summary: string; headers: string[]; rows: string[][]; download: string };
};

export const work: Work[] = [
  {
    "slug": "handshake-benchmarks",
    "title": "What makes a coding problem hard for a model?",
    "area": "Agent evaluation · Handshake AI",
    "status": "Archived evaluation results",
    "summary": "Comparing ways to challenge coding agents: finite rules, competing evidence, scope boundaries, and archive-specific inference.",
    "question": "Which problem structures fool a model into producing a plausible but wrong solution?",
    "finding": "Finite rule and convention tasks stayed at 2/2 solved in the selected local probes. Scope-conflict and archive-inference revisions reduced observed solves to 0/5 and 3/10.",
    "image": {
      "src": "/artifacts/handshake-methods.svg",
      "width": 1000,
      "height": 500,
      "alt": "Local redesign comparisons: finite rules 2/2 to 2/2; CAD conventions 2/2 to 2/2; evidence scopes 2/2 to 0/5; archive inference 2/2 to 3/10.",
      "caption": "Local method comparisons selected from the difficulty ledger. Counts compare earlier and revised task versions, not randomized ablations. The ML inference result uses the later fairness-corrected task."
    },
    "additionalFigures": [
      {
        "src": "/artifacts/handshake-categories.svg",
        "width": 1000,
        "height": 650,
        "alt": "Official solve rates across eleven problem categories, with solved attempts, total attempts and task counts labeled.",
        "caption": "A separate view of official evaluations: 17 final task records across 11 categories. Small, unequal category samples and unnormalized model settings prevent a general ranking of domain difficulty."
      }
    ],
    "evidence": {
      "label": "Difficulty methods: what changed?",
      "summary": "Historical local probes. Lower solve counts after revision suggest useful difficulty to investigate; they do not isolate the effect of a single method.",
      "headers": [
        "Method / domain",
        "Earlier → revised",
        "Observed lesson"
      ],
      "rows": [
        [
          "Finite rule enumeration · Formal verification",
          "2/2 → 2/2",
          "Still easy: a fully specified bounded search remained directly implementable."
        ],
        [
          "Named convention profiles · CAD / fabrication",
          "2/2 → 2/2",
          "Still easy: fresh agents implemented the finite profile space even when old solutions failed."
        ],
        [
          "Competing evidence scopes · Version control",
          "2/2 → 0/5",
          "Harder locally: plausible global processing violated an explicit scope boundary."
        ],
        [
          "Archive-specific inference · ML / replay auditing",
          "2/2 → 3/10",
          "Harder locally after removing an undisclosed tie-break. The fair revision is reported, not the earlier 0/10."
        ]
      ],
      "download": "/artifacts/handshake-methods.json"
    },
    "flow": [
      "Task & environment",
      "Reference / no-op checks",
      "Verifier review",
      "Agent trials",
      "Failure analysis"
    ],
    "sections": [
      {
        "title": "Easy to describe does not mean hard to solve",
        "text": "A dense specification can look difficult to a person while reducing to a small search or interpreter that an agent implements directly. In the selected formal-verification and CAD probes, adding role distinctions or convention rules still produced 2/2 fresh solves. Making an old candidate fail was not sufficient: fresh agents adapted."
      },
      {
        "title": "Where the harder problems came from",
        "text": "The more promising methods made the agent determine which evidence applied, preserve scope boundaries, or infer behavior from the current archive instead of copying the visible example. A version-control redesign moved from 2/2 to 0/5 local solves. An ML replay-auditing task moved from 2/2 to 3/10 after a fairness correction. Several requirements changed between versions, so these are development observations rather than causal effect estimates."
      },
      {
        "title": "Compare local probes with official evaluations",
        "text": "Local and official agents sometimes behaved differently. One analytics task had 0/5 local solves but 2/2 official solves on the recorded ledger architecture. That disagreement changed the development process: local runs diagnose failure mechanisms, while official evaluations measure the submitted task under that pipeline. The category chart keeps those official results separate from local redesign probes."
      },
      {
        "title": "A failed model is only useful evidence if the task is fair",
        "text": "Some apparent difficulty came from an unstated tie-break or an ambiguous test. Those defects need repair, not credit as successful model failures. I use reference/no-op checks, verifier review and candidate regrading to distinguish a semantic miss from an evaluation defect. Timeouts remain unsuccessful attempts in the category chart, but are not automatically called reasoning failures."
      },
      {
        "title": "What this research is building toward",
        "text": "The aim is a reusable taxonomy of failure-inducing problem structures, backed by examples of methods that worked and methods that did not. The current artifacts compare four selected local redesigns and every completed five-trial record in the inspected archive, spanning 11 official categories. A stronger comparison would hold model, budget and task variants fixed while varying the method, then repeat on new tasks. Private prompts, hidden tests and solutions remain outside the public data."
      }
    ],
    "links": [
      {
        "label": "Method comparison data",
        "href": "/artifacts/handshake-methods.json"
      },
      {
        "label": "Official category and task data",
        "href": "/artifacts/handshake-benchmarks.json"
      },
      {
        "label": "Official task data (CSV)",
        "href": "/artifacts/handshake-benchmarks.csv"
      }
    ],
    "context": "I design adversarial coding tasks at Handshake AI to expose model failure modes. The goal is to find problems that are difficult for the right reason: a solver must reconcile evidence and apply the stated rules, rather than succeed by reproducing a familiar pattern. Comparing failed and successful difficulty methods is the useful result."
  },
  {
    "slug": "agent-harnesses",
    "title": "Agent harness research",
    "area": "Agent systems",
    "status": "Research direction",
    "summary": "Studying how state, tool feedback, and recovery rules shape an agent’s behavior.",
    "question": "Which parts of the surrounding system make an agent more reliable?",
    "sections": [
      {
        "title": "Research focus",
        "text": "I’m interested in how an agent’s environment affects its behavior: what state is available, how tool results are checked, how stale evidence is detected, and how execution recovers after a failure. The question is whether these choices improve task outcomes under a controlled evaluation."
      },
      {
        "title": "An existing evaluation method",
        "text": "The decision-model study linked below uses a frozen 40-event sequence, the same authoritative state and deterministic checks in both arms, and separate records for provisional choices, advice, and executed actions. It provides an example of the evaluation machinery behind this work."
      },
      {
        "title": "Open question",
        "text": "That experiment changes access to decision-model advice; it does not isolate the contribution of the harness itself. Measuring harness improvements requires comparisons that vary state handling, tool feedback, or recovery while holding the task and model fixed."
      }
    ],
    "links": [
      {
        "label": "Handshake AI: benchmark methods and archived trial results",
        "href": "/work/handshake-benchmarks/"
      },
      {
        "label": "Decision-model study: method, event trace and results",
        "href": "/work/decision-models/"
      }
    ]
  },
  {
    "slug": "messaging",
    "title": "Personal Inbox & Dot",
    "area": "Agent systems",
    "status": "Implemented inbox · broader service in design",
    "summary": "A searchable communications workspace and the foundation for a context-aware messaging service.",
    "question": "How can an assistant track unresolved commitments across conversations?",
    "sections": [
      {
        "title": "What exists",
        "text": "The inbox stores searchable conversation snapshots and review states such as Needs reply, Waiting and Done. Outlook, Gmail, GroupMe and Instagram ingestion paths have different connection requirements. Snapshot imports are labeled, and source freshness must be checked before claiming current coverage."
      },
      {
        "title": "What makes it difficult",
        "text": "Incoming and outgoing history must reconcile across channels without duplicating messages or losing review state. An unanswered message may already be resolved elsewhere; a successful sync does not by itself identify the remaining obligation. The implementation separates ingestion, stored messages and review choices."
      },
      {
        "title": "The larger Dot service",
        "text": "The intended next layer retrieves people, projects and prior commitments before proposing an editable response. Sending requires approval of the exact content and destination. The broader contextual drafting and delivery workflow remains a design direction; the implemented inbox does not send messages."
      }
    ],
    "flow": [
      "Source connectors",
      "Message store",
      "Search & review",
      "Context retrieval",
      "Draft approval"
    ],
    "context": "Personal Inbox is the implemented read-only communications layer. Dot is the broader design for retrieving relationship and project context, identifying open commitments, and preparing replies for review."
  },
  {
    "slug": "launcher",
    "title": "Launchpad & MCP Hub",
    "area": "Developer tools",
    "status": "Working software",
    "summary": "A private home for running applications and discovering agent tools, with service controls, health checks and shared MCP access.",
    "question": "How do independently built tools become a system that is understandable to operate?",
    "sections": [
      {
        "title": "Two connected problems",
        "text": "A growing collection of internal apps needs discovery, authentication, health checks, and a repeatable deployment path. Agents also need a consistent way to discover tools exposed by different MCP servers."
      },
      {
        "title": "What I built",
        "text": "The personal launcher uses a project registry and deployment manifests to manage app lifecycles, logs, health checks, and persistent data. A separate MCP hub aggregates tools, prompts, and resources behind one endpoint and provides a browser inspector."
      },
      {
        "title": "The engineering decisions",
        "text": "The registry describes what should exist; runtime state describes what is actually running. The hub handles eager and lazy backends, bounded restart behavior, and explicit tool-name collisions. A registered URL alone is not a successful deployment."
      },
      {
        "title": "Related work at Slice",
        "text": "I’m applying the same focus on discoverability and maintainability to Slice Consulting’s internal platform: shared applications, AI integrations, repository conventions, and continuous integration."
      }
    ],
    "flow": [
      "Application registry",
      "Launcher",
      "Health & logs",
      "MCP hub",
      "Tool backends"
    ]
  },
  {
    "slug": "cad-application",
    "title": "Building a CAD application",
    "area": "Geometry",
    "status": "Backend foundation",
    "summary": "An editable modeling system with constrained sketches, feature history, and dependable saves.",
    "question": "What must stay true when a sketch changes and every dependent feature rebuilds?",
    "sections": [
      {
        "title": "The foundation",
        "text": "I’m building a CAD application around an original C++20 backend, using OCCT/OCAF for geometry and document operations and planeGCS for sketch constraints. The tested workflow creates a line sketch, extrudes it, adds a centered through hole, changes a dimension, and saves and reopens the result."
      },
      {
        "title": "More than a viewport",
        "text": "The work includes stable feature IDs, dependency recomputation, undo/redo, revision snapshots, STEP interchange, and a JSON-lines command supervisor. Disposable previews keep incomplete edits separate from committed document state."
      },
      {
        "title": "What has been checked",
        "text": "The foundation passed 11 native test groups and the sketch/edit/reopen/STEP fixture in Linux CI. The fixture’s maximum volume error was approximately 1.09 × 10⁻¹¹ mm³ against its reference values. These checks cover specific supported operations."
      },
      {
        "title": "Still to build",
        "text": "This milestone is a bounded headless backend. The browser modeling workflow, general topology repair, and full assemblies remain ahead. It is separate from my original-kernel experiments."
      }
    ],
    "flow": [
      "Constrained sketch",
      "Extrude",
      "Through hole",
      "Edit & rebuild",
      "Save / STEP"
    ]
  },
  {
    "slug": "cad-kernel",
    "title": "Validating a shared geometry boundary",
    "area": "Computational geometry",
    "status": "Research prototype · October 2026",
    "summary": "Comparing an original boundary representation with an independent geometry engine.",
    "question": "Can exact planar geometry and analytic curved boundaries share a reliable topology model?",
    "finding": "54 OCCT comparisons passed. Maximum volume difference: 2.73 × 10⁻¹² mm³ across the tested cases.",
    "image": {
      "src": "/artifacts/shared-topology.png",
      "width": 2100,
      "height": 812,
      "alt": "Actual planar and curved solids with a common topology model, alongside a rejected open boundary.",
      "caption": "Actual experiment output: exact planar model, analytic curved model, and a deliberately invalid open boundary. OCCT tessellation is used for display."
    },
    "evidence": {
      "label": "Independent comparison",
      "summary": "Measured across 54 specific geometry cases; the downloadable record includes every workflow and its errors.",
      "headers": [
        "Measure",
        "Recorded result"
      ],
      "rows": [
        [
          "Cases passing comparison",
          "54 / 54"
        ],
        [
          "Surface samples",
          "16,045"
        ],
        [
          "Maximum area difference",
          "6.82 × 10⁻¹³ mm²"
        ],
        [
          "Maximum volume difference",
          "2.73 × 10⁻¹² mm³"
        ],
        [
          "Maximum sampled surface distance",
          "4.02 × 10⁻¹⁵ mm"
        ]
      ],
      "download": "/artifacts/geometry-validation.json"
    },
    "sections": [
      {
        "title": "Research question",
        "text": "I’m building original geometry algorithms alongside a CAD application. The problem here is a shared representation: exact planar geometry and analytic curved surfaces need to agree on vertices, directed edge uses, loops, faces, and connected shells."
      },
      {
        "title": "Method",
        "text": "The validator checks loop closure, orientation, opposite edge uses, connected vertex links, and shell topology. Planar rational values remain exact; curved boundaries use an explicit tolerance. I compare converted shapes against OCCT for validity, shell count, area, signed volume, and sampled surface distance."
      },
      {
        "title": "Result",
        "text": "All 54 recorded comparisons passed. The figure includes an intentionally missing face to show why plausible appearance is insufficient: an open shell must be rejected even if most of the rendered object looks correct. The full per-case results are available below."
      },
      {
        "title": "Limits of the evidence",
        "text": "Finite surface samples and matching shell counts do not prove global geometric equivalence. Mixed-backend Booleans, general self-intersection detection, shell nesting, and persistent face naming remain open. These results support this bounded representation, not a claim of a production-ready general CAD kernel."
      }
    ],
    "links": [
      {
        "label": "Download all 54 comparison records",
        "href": "/artifacts/geometry-validation.json"
      },
      {
        "label": "Full-resolution geometry figure",
        "href": "/artifacts/shared-topology.png"
      }
    ],
    "context": "An editable CAD system needs more than plausible-looking solids: faces, edges and volumes must remain consistent after operations. My longer-term goal is an original geometry kernel. These experiments progress from planar solids through curved boundaries to a shared topology model, using OCCT as an independent comparison rather than trusting rendered images."
  },
  {
    "slug": "spatial-capture",
    "title": "Distilling a textured mesh into Gaussian splats",
    "area": "3D representation",
    "status": "Training experiment · October 2026",
    "summary": "Measuring how well a trained splat reproduces synthetic views of an apartment mesh.",
    "question": "How faithfully can Gaussian splats reproduce a captured space represented by a textured mesh?",
    "finding": "After scene-specific cleanup: 34.60 dB PSNR and 0.9718 SSIM on the same 12 synthetic evaluation views.",
    "image": {
      "src": "/artifacts/splat-evaluation.svg",
      "width": 593.3975,
      "height": 291.602109,
      "alt": "Recorded PSNR and SSIM at four training checkpoints, with a separately marked post-cleanup evaluation.",
      "caption": "Measured fidelity to rendered mesh views. The cleanup result reuses the same evaluation views; it is not a new held-out test or a measure of real-world geometric accuracy."
    },
    "evidence": {
      "label": "Training & evaluation",
      "summary": "Brush optimized an SH-degree-zero representation from rendered views of the existing repaired textured mesh.",
      "headers": [
        "Measure",
        "Recorded result"
      ],
      "rows": [
        [
          "Training / evaluation views",
          "576 / 12"
        ],
        [
          "Image resolution",
          "768 × 576"
        ],
        [
          "Optimization steps",
          "16,000"
        ],
        [
          "Before cleanup: PSNR / SSIM",
          "32.25 dB / 0.9610"
        ],
        [
          "After cleanup: PSNR / SSIM",
          "34.60 dB / 0.9718"
        ],
        [
          "Unstable splats removed",
          "1,122 of 1,499,999"
        ]
      ],
      "download": "/artifacts/splat-training.json"
    },
    "sections": [
      {
        "title": "The larger reconstruction pipeline",
        "text": "Earlier apartment trials compared 48 RGB images processed with predicted depth against 357 RGB-D frames fused with supplied camera poses. Photo-only output recovered recognizable room structure but warped surfaces; depth-assisted output was more coherent. Different inputs and view counts prevent a controlled algorithm comparison. The Gaussian-splat experiment below starts from a textured mesh and asks how well a compact learned representation can reproduce its views. It is one stage toward a walkthrough, not proof that listing photos alone recover measured architecture."
      },
      {
        "title": "Research question",
        "text": "Property walkthroughs need representations that remain useful as the camera moves. This experiment isolates representation fidelity: starting with a textured apartment mesh, can a trained Gaussian splat reproduce its rendered appearance at other viewpoints? It is mesh-to-splat distillation, not reconstruction from the original camera photographs."
      },
      {
        "title": "Method",
        "text": "I rendered 576 calibrated images from 48 interior positions, with 12 directions per position. Twelve additional views used different camera positions and directions. Brush trained for 16,000 steps from 300,000 area-weighted surface samples, with a 1.5-million-splat ceiling and SH degree zero for baked, view-independent textures."
      },
      {
        "title": "Failure analysis & cleanup",
        "text": "The raw result contained colored haze from a small number of exploded Gaussian footprints. Removing splats with a maximum sigma above 0.5 scene units removed 1,122 splats and left 1,498,877. A final evaluation/export pass improved the recorded PSNR from 32.25 to 34.60 dB and SSIM from 0.9610 to 0.9718."
      },
      {
        "title": "Interpretation",
        "text": "The measurements describe reproduction of this source mesh on these synthetic views. They do not establish physical dimensions, recovery of missing scan detail, or quality against real photographs. The scene-specific threshold was assessed using the same evaluation set, so the cleaned score is not an untouched test-set estimate."
      },
      {
        "title": "Next experiment",
        "text": "The next useful comparison is a fresh set of withheld camera paths, with quality assessed along the walkthrough rather than at a single favorable viewpoint. Camera calibration and coverage should be evaluated separately from the representation and cleanup procedure."
      }
    ],
    "links": [
      {
        "label": "Download checkpoint metrics and cleanup counts",
        "href": "/artifacts/splat-training.json"
      },
      {
        "label": "Full-resolution evaluation figure",
        "href": "/artifacts/splat-evaluation.svg"
      }
    ],
    "context": "I’m exploring how ordinary room captures could become navigable real-estate walkthroughs for CuseSublets. That involves several different problems: recovering geometry, preserving appearance and making the result useful to a viewer. This study tests appearance representation from a known mesh; separate photo-only and depth-assisted trials investigate the earlier reconstruction step."
  },
  {
    "slug": "decision-models",
    "title": "Where do decision models help an agent?",
    "area": "Agent evaluation",
    "status": "10-use-case benchmark · October 2026",
    "summary": "Comparing general LLMs and a decision-model hybrid across retrieval, tool routing, arithmetic, classification, and other tasks.",
    "question": "When should an agent use a specialized decision model instead of another general-model call?",
    "finding": "In a 60-run synthetic benchmark, Decisions + Astra completed 20/20 tasks at 22% lower estimated cost than Astra. Gains concentrated in bounded choices; many file-based tasks still needed Astra.",
    "image": {
      "src": "/artifacts/decision-use-cases.svg",
      "width": 1000,
      "height": 670,
      "alt": "Mean runtime for Astra, Luna and Decisions plus Astra across ten use cases. Hybrid is quickest for classification, routing, constraint choices and arithmetic, but not for file search.",
      "caption": "Ten synthetic use cases × two repetitions × three policies. Timing covers all calls and execution inside the bounded runtime. The hybrid includes Astra planning/completion; it is not a standalone decision-model arm."
    },
    "evidence": {
      "label": "Compare the use cases",
      "summary": "Each cell: correct completions / attempts · mean seconds · mean estimated USD. Two repetitions per use case and policy; all failures retained.",
      "headers": [
        "Use case",
        "Astra",
        "Luna",
        "Decisions + Astra"
      ],
      "rows": [
        [
          "Retrieval",
          "2/2 · 4.84s · $0.013990",
          "2/2 · 2.76s · $0.000156",
          "2/2 · 4.47s · $0.014066"
        ],
        [
          "Multi-hop retrieval",
          "2/2 · 5.71s · $0.023115",
          "2/2 · 3.81s · $0.000259",
          "2/2 · 5.66s · $0.016106"
        ],
        [
          "Conflicting evidence",
          "2/2 · 4.07s · $0.015655",
          "2/2 · 2.97s · $0.000170",
          "2/2 · 4.07s · $0.015709"
        ],
        [
          "File search",
          "2/2 · 3.59s · $0.014530",
          "2/2 · 3.32s · $0.000157",
          "2/2 · 4.66s · $0.014610"
        ],
        [
          "Arithmetic",
          "2/2 · 3.56s · $0.008930",
          "2/2 · 2.71s · $0.000097",
          "2/2 · 1.83s · $0.004723"
        ],
        [
          "Classification",
          "2/2 · 1.63s · $0.004890",
          "2/2 · 1.00s · $0.000056",
          "2/2 · 0.20s · $0.000026"
        ],
        [
          "Tool routing",
          "2/2 · 1.59s · $0.005140",
          "2/2 · 0.99s · $0.000059",
          "2/2 · 0.23s · $0.000028"
        ],
        [
          "Abstention",
          "2/2 · 3.67s · $0.014190",
          "2/2 · 3.66s · $0.000156",
          "2/2 · 4.07s · $0.014271"
        ],
        [
          "Untrusted content",
          "2/2 · 3.95s · $0.013690",
          "1/2 · 2.84s · $0.000126",
          "2/2 · 4.18s · $0.013770"
        ],
        [
          "Constraint reasoning",
          "2/2 · 1.65s · $0.005550",
          "2/2 · 1.37s · $0.000071",
          "2/2 · 0.11s · $0.000033"
        ]
      ],
      "download": "/artifacts/decision-runtime.json"
    },
    "sections": [
      {
        "title": "The comparison",
        "text": "All three policies used the same synthetic fixtures, registered tools and deterministic task-specific graders. The 60 runs used counterbalanced sequential order, with fresh in-process state per run. Astra and Luna were general-model policies; the hybrid used code-generated candidates, Decisions for bounded choices, and Astra for planning or completion when needed."
      },
      {
        "title": "Where the hybrid helped",
        "text": "Classification averaged 0.20 seconds with the hybrid versus 1.63 with Astra; tool routing averaged 0.23 versus 1.59 seconds. Constraint reasoning and arithmetic also benefited. These tasks gave the runtime bounded choices or exact tools, allowing it to avoid some general-model work."
      },
      {
        "title": "Where extra selection became overhead",
        "text": "File search averaged 4.66 seconds with the hybrid versus 3.59 with Astra. Retrieval and conflicting-evidence cases had little cost advantage because planning and final composition still required a general model. Across all hybrid runs, Astra handled 26 of 36 steps. The hybrid made 60 model requests in total versus Astra’s 36; a faster selector does not guarantee a faster pipeline."
      },
      {
        "title": "Correctness, cost and the cheaper baseline",
        "text": "Astra and the hybrid each passed 20/20 runs; Luna passed 19/20. Estimated totals were $0.239360, $0.186686 and $0.002614 respectively. The hybrid reduced total elapsed time by 14% relative to Astra, but its median task was slower: 4.00 versus 3.53 seconds. Luna’s one failure was malformed execution JSON before a tool ran, not compliance with an injected instruction. These results favor routing by use case rather than claiming one policy wins everywhere."
      },
      {
        "title": "Other experiments in this research program",
        "text": "A separate 28-case CAD workflow replay compared keyword rules (21/28 accepted labels), Jev decision-model selections (27/28), and a general-agent baseline (28/28). No geometry action executed in that replay, and baseline latency/cost were unavailable. In a separate paired 40-event CAD revision session, the general agent and general agent plus decision model both chose accepted actions on all 40 events; five incorrect model selections were overridden. These studies test selection and recovery, rather than the ten-use-case runtime’s end-to-end completion metric."
      },
      {
        "title": "What the evidence supports next",
        "text": "The working hypothesis is that decision models are useful at well-defined choice points, while general LLMs remain necessary for open-ended planning. The benchmark is only two repetitions of each easy synthetic case, with no standalone Decisions-only arm, no controlled browser/repository execution, and uncontrolled provider caching. The next useful test is held-out tasks and fault recovery, measuring cost per correct completion and unnecessary calls under a fixed budget. The 22% saving is a result for this task mix, not a universal efficiency claim."
      }
    ],
    "links": [
      {
        "label": "All 60 runtime measurements (CSV)",
        "href": "/artifacts/decision-runtime.csv"
      },
      {
        "label": "Runtime data and methodology (JSON)",
        "href": "/artifacts/decision-runtime.json"
      },
      {"label": "Separate 28-case CAD selection replay", "href": "/artifacts/decision-cad-replay.json"},
      {
        "label": "Separate 40-event CAD pilot trace",
        "href": "/artifacts/agent-trial.json"
      },
      {
        "label": "Separate 40-event CAD pilot figure",
        "href": "/artifacts/agent-decisions.svg"
      }
    ],
    "context": "A decision model can select a bounded action from supplied evidence, while a general LLM plans, generates arguments and composes answers. I’m testing where that division improves the whole system: correct completion, elapsed time and cost across different use cases—not just the speed of the selector.",
    "additionalFigures": [
      {
        "src": "/artifacts/decision-cost.svg",
        "width": 1000,
        "height": 670,
        "alt": "Mean estimated cost by use case for Astra, Luna and Decisions plus Astra, plotted on a logarithmic dollar axis.",
        "caption": "Recorded cost estimates for the complete runtime, including fallback calls. Luna was substantially cheaper overall; the hybrid advantage over Astra depended on the use case. These are historical estimates, not invoices or current pricing."
      }
    ]
  },
  {
    "finding": "61 logged epochs. Final validation mAP@50-95: 82.16%; no physical-gameplay claim.",
    "evidence": {
      "label": "Historical validation",
      "summary": "Original run log, final recorded epoch. Validation results are not a fresh held-out test.",
      "headers": [
        "Measure",
        "Recorded result"
      ],
      "rows": [
        [
          "Logged / configured epochs",
          "61 / 100"
        ],
        [
          "Precision",
          "98.26%"
        ],
        [
          "Recall",
          "98.31%"
        ],
        [
          "mAP@50",
          "99.08%"
        ],
        [
          "mAP@50-95",
          "82.16%"
        ]
      ],
      "download": "/artifacts/chess-training.csv"
    },
    "slug": "vision-training",
    "title": "Chess-piece detection model training",
    "area": "Computer vision",
    "status": "Training experiment",
    "summary": "Fine-tuning YOLOv8s and connecting piece detections to a structured board state.",
    "question": "How do image detections become a board state that downstream software can trust?",
    "sections": [
      {
        "title": "Training",
        "text": "I fine-tuned YOLOv8s on Roboflow-100’s chess-pieces dataset, version 2, using 640-pixel images and batch size 16. The saved run configuration records CPU training with checkpoint resume. The script targets 100 epochs; the retained log contains 61."
      },
      {
        "title": "Recorded results",
        "text": "At epoch 61, validation precision was 98.26%, recall 98.31%, mAP@50 99.08%, and mAP@50–95 82.16%. The figure is generated directly from the committed training CSV. These are historical validation results, not a fresh held-out test or physical gameplay measurement."
      },
      {
        "title": "The integration lesson",
        "text": "The dataset has 13 labels, including an ambiguous uncolored bishop. A chess board needs the 12 color-specific piece classes. A high detection score does not resolve that schema mismatch: uncertain labels must be rejected, relabeled, or retrained before board serialization."
      },
      {
        "title": "Project history",
        "text": "The repository’s current version focuses on checkers with classical OpenCV perception. The training code and logs remain in the earlier chess revision linked below. The robot prototype footage belongs to the checkers work and is not evidence of this detector’s performance."
      }
    ],
    "image": {
      "src": "/artifacts/chess-training.svg",
      "width": 699.59952,
      "height": 430.873869,
      "alt": "Validation mAP curves across the 61 logged YOLOv8s training epochs",
      "caption": "Historical validation curves, generated from the original run log. Roboflow-100 chess-pieces v2, CC BY 4.0."
    },
    "links": [
      {
        "label": "Training code",
        "href": "https://github.com/ichen27/lerobot-chess-player/blob/d91e36aeca09cfd27115dd931f4907238ab732fe/scripts/train_yolo.py"
      },
      {
        "label": "Original run log",
        "href": "https://github.com/ichen27/lerobot-chess-player/blob/d91e36aeca09cfd27115dd931f4907238ab732fe/weights/chess_pieces/results.csv"
      },
      {
        "label": "Download CSV",
        "href": "/artifacts/chess-training.csv"
      },
      {
        "label": "Dataset",
        "href": "https://universe.roboflow.com/roboflow-100/chess-pieces-mjzgj/dataset/2"
      }
    ],
    "context": "For a robot to act on a physical board, it first needs to turn camera pixels into a trustworthy board state. This work trains the piece-detection stage and maps detections toward structured board coordinates. The learning curves show perception-model behavior; robot motion, occlusion handling and complete games are separate evaluation problems."
  },
  {
    "slug": "clearflow",
    "title": "ClearFlow",
    "area": "Native macOS · Speech",
    "status": "Open-source application",
    "summary": "A native dictation app with self-hosted speech recognition, editable shortcuts and text insertion.",
    "question": "How can dictation feel immediate while keeping its infrastructure under the user’s control?",
    "sections": [
      {
        "title": "The application",
        "text": "ClearFlow combines a native macOS recording interface, shortcut capture, transcription history and automatic text insertion. Its default speech service uses local MLX Whisper; a user-owned Cloudflare backend is optional."
      },
      {
        "title": "The engineering",
        "text": "The work includes microphone and Accessibility permission handling, persistent shortcut configuration, local service setup and portable distribution. Fn/Globe support adds key-state handling beyond a conventional modifier shortcut."
      },
      {
        "title": "Current scope",
        "text": "The public project includes source and downloadable releases. The screenshot uses sample text. Distribution and automated checks do not substitute for testing microphone capture and insertion under a particular Mac’s permissions and shortcut conflicts."
      }
    ],
    "image": {
      "src": "/artifacts/clearflow.png",
      "width": 1120,
      "height": 780,
      "alt": "ClearFlow native dictation interface with sample transcript and dictionary controls.",
      "caption": "Actual ClearFlow interface using synthetic demonstration text."
    },
    "links": [
      {
        "label": "Source and releases",
        "href": "https://github.com/ichen27/clearflow"
      }
    ]
  },
  {
    "slug": "cusesublets",
    "title": "CuseSublets",
    "area": "Housing · Marketplace",
    "status": "Active development",
    "summary": "A Syracuse-first housing marketplace connecting subletters and seekers through listings, requests, matching and conversations.",
    "question": "How can students find a suitable sublet and understand which parts of an offer they can trust?",
    "sections": [
      {
        "title": "The product",
        "text": "CuseSublets brings together map and catalog discovery, seeker requests, two-way matching, messaging and an administrative review workspace. The product has evolved toward a social discovery experience rather than only a listings catalog."
      },
      {
        "title": "The system",
        "text": "Cloudflare Workers serves the application and API, with D1 for records and R2 for listing media and protected review documents. Identity verification and lease verification are separate claims; offers and reservation states need explicit lifecycle rules."
      },
      {
        "title": "Connected research",
        "text": "The 3D reconstruction work explores whether richer room walkthroughs could make remote housing decisions easier. That research remains a separate prototype; it is not represented as a finished capture feature in the marketplace."
      }
    ],
    "links": [
      {
        "label": "3D reconstruction research",
        "href": "/work/spatial-capture/"
      }
    ]
  },
  {
    "slug": "restaurant-ordering",
    "title": "Far East / Restaurant Call Agent",
    "area": "Voice agents · Restaurant operations",
    "status": "Working demo · integration in progress",
    "summary": "Phone ordering, menu validation and a kitchen queue, built around the interruptions I saw in my parents’ restaurant.",
    "question": "How does a spoken order become something the kitchen can reliably act on?",
    "sections": [
      {
        "title": "Why I built it",
        "text": "My parents built their restaurant from the ground up. I wanted to use what I was learning to help with the work that interrupts the counter and kitchen: taking an order, checking it against the menu, and handing it to staff clearly."
      },
      {
        "title": "The implementation",
        "text": "The project connects voice-agent integration, menu validation and a real-time staff order board. The newer Far East work adds a customer ordering site and a tablet-oriented kitchen board."
      },
      {
        "title": "What the demo shows",
        "text": "The public demo uses scripted calls and synthetic customers to exercise the order workflow without live phone credentials. Live provider setup and restaurant acceptance are separate gates; a successful sample call is not a verified real customer order."
      }
    ],
    "image": {
      "src": "/artifacts/restaurant-ordering.png",
      "width": 1536,
      "height": 1084,
      "alt": "Restaurant Call Agent demonstration with synthetic orders and a kitchen order board.",
      "caption": "Actual application demo with synthetic customers and scripted calls."
    },
    "links": [
      {
        "label": "Source and runnable demo",
        "href": "https://github.com/ichen27/restaurant-call-agent"
      }
    ]
  },
  {
    "slug": "knowledge-base",
    "title": "Enterprise Knowledge Base",
    "area": "Knowledge systems · MCP",
    "status": "Open-source application",
    "summary": "A Markdown workspace with source-grounded search, linked notes and scoped access for coding assistants.",
    "question": "How can people and agents use the same knowledge without losing its sources?",
    "sections": [
      {
        "title": "The product",
        "text": "The workspace grew out of a consulting-team knowledge system. It combines a Markdown editor, private and shared spaces, deterministic ranked search, a relationship graph, CLI access and MCP tools over the same files."
      },
      {
        "title": "The system",
        "text": "Markdown remains the durable source. Search results retain source paths and line references; concurrent edits use version checks. Graph links help discovery, while inferred relationships remain distinct from verified facts."
      },
      {
        "title": "Try the work",
        "text": "The public repository includes an isolated demo with fictional engineering decisions, architecture notes and incident runbooks. It can be explored without importing private organizational records."
      }
    ],
    "links": [
      {
        "label": "Source and demo guide",
        "href": "https://github.com/ichen27/enterprise-knowledge-base-system"
      }
    ]
  },
  {
    "slug": "walkthroughs",
    "title": "3D walkthrough prototypes",
    "area": "3D tools · Real estate",
    "status": "Research prototype",
    "summary": "An inspection viewer for reconstructed rooms, connecting phone-capture experiments to a possible housing walkthrough workflow.",
    "question": "What does a reconstructed room need before it is useful to someone choosing a home?",
    "sections": [
      {
        "title": "The prototype",
        "text": "The apartment viewer supports orbiting, clipping, inspecting interiors and downloading reconstructed surface models. It provides a place to compare outputs against source captures and examine holes or distorted surfaces."
      },
      {
        "title": "The product direction",
        "text": "A listing walkthrough needs navigable space, coherent surfaces and honest handling of missing information. Reconstruction and Gaussian-splat research feed this prototype, but visual plausibility does not establish a measured floor plan."
      },
      {
        "title": "Current boundary",
        "text": "The prototype is separate from CuseSublets production features. Research datasets and personal room captures have different privacy and licensing constraints, so the portfolio publishes measured figures rather than private interiors."
      }
    ],
    "links": [
      {
        "label": "Reconstruction and splat study",
        "href": "/work/spatial-capture/"
      }
    ]
  }
];

export const cloudflare: Work[] = [
  {
    "slug": "cloudflare-metrics",
    "title": "Professional Services business metrics",
    "area": "Cloudflare · Summer 2026",
    "status": "Internship project",
    "summary": "A system for comparing business performance across time and customer cohorts.",
    "question": "How can a business metric stay explainable all the way down to the records behind it?",
    "sections": [
      {
        "title": "The product",
        "text": "I worked on an analytics application for Professional Services leaders, with metric cards, historical views, cohort filters, and account/opportunity drill-downs. The goal was to make the selected population consistent across every view."
      },
      {
        "title": "Architecture shaped by access",
        "text": "The project started with a Workers architecture, moved to a functional Gadget implementation while data access was constrained, and returned to Workers when the required opportunity data became available. The later design used D1 storage and Workflows for batched retrieval and ingestion."
      },
      {
        "title": "The difficult part",
        "text": "Reliable comparisons require shared metric definitions, consistent cohort scope, and explicit treatment of small samples. A configuration-driven catalog was intended to make future metrics easier to add without rebuilding the application."
      },
      {
        "title": "State at handoff",
        "text": "The core product and data architecture existed, but the complete Workers refresh path still needed end-to-end validation and production hardening. AI summaries and the fully verified metric/cohort builders remained future work. This account is based on my retrospective handoff."
      }
    ],
    "flow": [
      "Business data",
      "Batched refresh",
      "Metric storage",
      "Cohort analysis",
      "Record drill-down"
    ]
  },
  {
    "slug": "cloudflare-forecasting",
    "title": "Professional Services forecasting",
    "area": "Cloudflare · Summer 2026",
    "status": "Internship project",
    "summary": "Historical-rate forecasts, qualitative context, and explicit human judgment.",
    "question": "How do you build a useful forecast when trustworthy historical snapshots don’t exist?",
    "sections": [
      {
        "title": "A change in approach",
        "text": "The initial plan was to train a model on historical weekly pipeline snapshots. Available stage history could not reliably reconstruct those snapshots, so I shifted toward deterministic forecasting using historical category close rates, hierarchical fallback, and smoothing."
      },
      {
        "title": "The application",
        "text": "The project evolved toward a Salesforce-native application using Lightning Web Components and Apex. The workbench separates the system-calculated forecast from the human-editable forecast. Weekly snapshots preserve what was known when a forecast was made."
      },
      {
        "title": "Where the LLM belongs",
        "text": "Language models help interpret qualitative sales context, organize evidence, and surface risks. The numerical baseline belongs to the deterministic calculation layer; the final published forecast belongs to the human reviewer."
      },
      {
        "title": "State at handoff",
        "text": "Substantial backend work and an older wired frontend existed. The preferred new interface still required complete backend wiring, verification of the weekly lifecycle and formulas, and production promotion. The handoff records those gaps rather than treating the intended architecture as fully shipped."
      }
    ],
    "flow": [
      "Pipeline snapshot",
      "Historical rates",
      "Calculated baseline",
      "Context & human review",
      "Published forecast"
    ]
  }
];
export const allWork = [...work, ...cloudflare];
export const researchWork = ["handshake-benchmarks","decision-models","cad-kernel","spatial-capture","vision-training"].map(slug => work.find(item => item.slug === slug)!);
export const developmentWork = ["clearflow","cusesublets","restaurant-ordering","messaging","launcher","cad-application","walkthroughs","knowledge-base"].map(slug => work.find(item => item.slug === slug)!);
