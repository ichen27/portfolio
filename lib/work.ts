export type Work = {
  slug: string; title: string; area: string; status: string; summary: string;
  question: string; sections: { title: string; text: string }[];
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
  "title": "Building benchmarks for coding agents",
  "area": "Agent evaluation · Handshake AI",
  "status": "Archived evaluation results",
  "summary": "Designing reproducible coding tasks, reference solutions, and verifiers—and investigating why agents fail.",
  "question": "How do you tell a difficult coding task from a broken evaluation?",
  "finding": "Across 17 completed task records, agents solved 7 of 85 official attempts. Thirteen tasks had no solves in their five-trial evaluation.",
  "image": {
    "src": "/artifacts/handshake-distribution.svg",
    "width": 900,
    "height": 520,
    "alt": "Task distribution: 13 tasks had zero solved trials, one had one solve, three had two solves, and none had three to five solves.",
    "caption": "Figure 1. Observed solves per task in an archived sample of official five-trial evaluations. The sample contains deliberately difficult tasks from benchmark development, not a representative test of general coding ability."
  },
  "additionalFigures": [
    {
      "src": "/artifacts/handshake-tasks.svg",
      "width": 900,
      "height": 780,
      "alt": "Seventeen anonymized task results, each with five attempts. T07, T11 and T12 had two solves; T10 had one. The other thirteen tasks had zero solves.",
      "caption": "Figure 2. All 17 tasks in the exported sample. Green counts solved attempts; gray counts attempts not solved, including timeouts. IDs correspond to the downloadable data and do not imply execution order."
    }
  ],
  "evidence": {
    "label": "Recorded evaluation results",
    "summary": "Snapshot assembled October 13, 2026 from archived delivery records. One completed five-trial result per task; one incomplete record excluded.",
    "headers": [
      "Measure",
      "Result"
    ],
    "rows": [
      [
        "Completed task records",
        "17"
      ],
      [
        "Official trial attempts",
        "85"
      ],
      [
        "Solved attempts",
        "7"
      ],
      [
        "Attempts not solved",
        "78, including timeouts"
      ],
      [
        "Tasks with 0 / 1 / 2 solves",
        "13 / 1 / 3"
      ],
      [
        "Tasks with 3–5 solves",
        "0"
      ]
    ],
    "download": "/artifacts/handshake-benchmarks.json"
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
      "title": "The work",
      "text": "At Handshake AI, I build and evaluate coding-agent benchmarks. For Project Dynamo, that means turning realistic technical problems into reproducible tasks: a containerized environment, a clear output contract, a reference solution, and a verifier that can distinguish a correct result from a plausible one. The research question is whether a failed attempt reveals a limitation in the agent or a defect in the evaluation."
    },
    {
      "title": "Checking the measuring instrument",
      "text": "A reference solution should pass in the same environment used for evaluation. A no-op baseline should fail. Those checks establish basic calibration, but do not establish that a task is fair or that a verifier is complete. I also review the correspondence between instructions and tests, check whether incorrect candidates can pass, and investigate whether failures come from task semantics, ambiguous requirements, the verifier, or infrastructure."
    },
    {
      "title": "What the charts measure",
      "text": "The figures include every completed delivery record with a five-trial official result in the inspected archive: 17 records, with one incomplete record excluded. Each row contributes five attempts from its final recorded evaluation. The histogram counts tasks by observed solves: 13 at zero, one at one, and three at two. These are direct trial counts, not a pass@k probability estimate. The archive is a subset of my benchmark work, not a count of every task I have delivered."
    },
    {
      "title": "Interpreting a failed attempt",
      "text": "The 78 attempts not solved should not all be called reasoning failures. The records include timeouts, and one record classified as a valid failure also notes a near-limit timeout. I preserve the observed solved/not-solved distinction here rather than turning every unsuccessful run into evidence of a semantic limitation. During development, a suspicious failure sends the task back through diagnosis and validation."
    },
    {
      "title": "Limits and provenance",
      "text": "These tasks were deliberately selected and revised to challenge agents. The results therefore describe this development sample; they do not establish a general coding success rate, compare models under equal budgets, or isolate the effect of an agent harness. This is an archived-results snapshot rather than a fresh benchmark run or a current acceptance audit. Public artifacts contain anonymous outcome counts and source-document hashes; task prompts, hidden tests, solutions, and private repository links remain outside the export. The private source records cannot be independently verified from this page alone."
    }
  ],
  "links": [
    {
      "label": "Anonymized results (CSV)",
      "href": "/artifacts/handshake-benchmarks.csv"
    },
    {
      "label": "Task distribution figure (SVG)",
      "href": "/artifacts/handshake-distribution.svg"
    },
    {
      "label": "Per-task outcomes figure (SVG)",
      "href": "/artifacts/handshake-tasks.svg"
    },
    {
      "label": "Agent harness research questions",
      "href": "/work/agent-harnesses/"
    }
  ]
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
      {"label": "Handshake AI: benchmark methods and archived trial results", "href": "/work/handshake-benchmarks/"},
      {
        "label": "Decision-model study: method, event trace and results",
        "href": "/work/decision-models/"
      }
    ]
  },
  {
    slug: "messaging", title: "A messaging harness", area: "Agent systems", status: "Design in progress",
    summary: "Connecting conversations to the people, projects, and commitments behind them.",
    question: "Can an assistant understand what still needs a response across different conversations?",
    sections: [
      {title: "The problem", text: "A message is rarely self-contained. A request might already be resolved in another channel, a draft might rely on an outdated project detail, or a reply might acknowledge work without completing it."},
      {title: "The design", text: "I’m exploring a persistent communication service that retrieves context before prioritizing messages. It tracks unresolved commitments, records which sources are current, and prepares an editable review queue. Durable project knowledge and live conversation state have different roles."},
      {title: "The important boundary", text: "Drafting and sending are separate operations. Approval belongs to an exact draft and destination; changed context needs another check. The service must distinguish an empty inbox from missing or stale access."},
      {title: "Current state", text: "This is an architecture and adapter exploration. The diagram describes the intended workflow; it is not a claim of a completed, unattended messaging system."},
    ],
    flow: ["Messages", "Context retrieval", "Open commitments", "Draft & review", "Approved delivery"],
  },
  {
    slug: "launcher", title: "A unified launcher & MCP hub", area: "Developer tools", status: "Working software",
    summary: "One place to discover applications, inspect tools, and manage the services behind them.",
    question: "How do independently built tools become a system that is understandable to operate?",
    sections: [
      {title: "Two connected problems", text: "A growing collection of internal apps needs discovery, authentication, health checks, and a repeatable deployment path. Agents also need a consistent way to discover tools exposed by different MCP servers."},
      {title: "What I built", text: "The personal launcher uses a project registry and deployment manifests to manage app lifecycles, logs, health checks, and persistent data. A separate MCP hub aggregates tools, prompts, and resources behind one endpoint and provides a browser inspector."},
      {title: "The engineering decisions", text: "The registry describes what should exist; runtime state describes what is actually running. The hub handles eager and lazy backends, bounded restart behavior, and explicit tool-name collisions. A registered URL alone is not a successful deployment."},
      {title: "Related work at Slice", text: "I’m applying the same focus on discoverability and maintainability to Slice Consulting’s internal platform: shared applications, AI integrations, repository conventions, and continuous integration."},
    ],
    flow: ["Application registry", "Launcher", "Health & logs", "MCP hub", "Tool backends"],
  },
  {
    slug: "cad-application", title: "Building a CAD application", area: "Geometry", status: "Backend foundation",
    summary: "An editable modeling system with constrained sketches, feature history, and dependable saves.",
    question: "What must stay true when a sketch changes and every dependent feature rebuilds?",
    sections: [
      {title: "The foundation", text: "I’m building a CAD application around an original C++20 backend, using OCCT/OCAF for geometry and document operations and planeGCS for sketch constraints. The tested workflow creates a line sketch, extrudes it, adds a centered through hole, changes a dimension, and saves and reopens the result."},
      {title: "More than a viewport", text: "The work includes stable feature IDs, dependency recomputation, undo/redo, revision snapshots, STEP interchange, and a JSON-lines command supervisor. Disposable previews keep incomplete edits separate from committed document state."},
      {title: "What has been checked", text: "The foundation passed 11 native test groups and the sketch/edit/reopen/STEP fixture in Linux CI. The fixture’s maximum volume error was approximately 1.09 × 10⁻¹¹ mm³ against its reference values. These checks cover specific supported operations."},
      {title: "Still to build", text: "This milestone is a bounded headless backend. The browser modeling workflow, general topology repair, and full assemblies remain ahead. It is separate from my original-kernel experiments."},
    ],
    flow: ["Constrained sketch", "Extrude", "Through hole", "Edit & rebuild", "Save / STEP"],
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
    ]
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
    ]
  },
  {
    "slug": "decision-models",
    "title": "Do decision models improve agent reliability?",
    "area": "Agent evaluation",
    "status": "Paired pilot · October 2026",
    "summary": "A controlled comparison across 40 revision, inspection, conflict, and recovery events.",
    "question": "Does adding a decision model improve the choices made by a general agent?",
    "finding": "Both agents: 40/40 correct actions. Five incorrect advice outputs were overridden. No reliability gain in this pilot.",
    "image": {
      "src": "/artifacts/agent-decisions.svg",
      "width": 665.277031,
      "height": 305.278984,
      "alt": "Forty event outcomes for the general agent, assisted agent and decision-model advice. Both agents correct on all events; advice incorrect on five.",
      "caption": "Computed from the recorded event trace. Advice is scored against the acceptable actions at that event, not just a nominal expected action."
    },
    "evidence": {
      "label": "Recorded outcomes",
      "summary": "One paired, authored 40-event sequence. The observations are dependent; these counts are not independent trials.",
      "headers": [
        "Measure",
        "General agent",
        "Agent + Jev"
      ],
      "rows": [
        [
          "Correct executed actions",
          "40 / 40",
          "40 / 40"
        ],
        [
          "Committed Blender builds",
          "13",
          "13"
        ],
        [
          "Unsupported readiness claims",
          "0",
          "0"
        ],
        [
          "Changed provisional actions",
          "—",
          "0"
        ],
        [
          "Incorrect advice overridden",
          "—",
          "5 / 40"
        ]
      ],
      "download": "/artifacts/agent-trial.json"
    },
    "sections": [
      {
        "title": "Question & hypothesis",
        "text": "I tested whether a structured decision model could help a general agent avoid accumulated mistakes during repeated revisions. The workload included changed clearances, conflicting locked requirements, stale evidence, a missing export, recovery, inspection, and delivery."
      },
      {
        "title": "Method",
        "text": "Two agents worked through the same 40-event sequence with the same tools, authoritative structured state, and deterministic checks. The assisted arm recorded its provisional action before each live Jev call, then recorded its final action. The advisor received the task packet without the agent’s preference. The protocol and scorer were frozen before the runs."
      },
      {
        "title": "Result",
        "text": "Both arms correctly executed all 40 events and committed 13 Blender builds. Jev changed none of the agent’s provisional actions. Its five wrong recommendations occurred at E10, E19, E25, E30, and E34: it recommended building when the correct response was inspection or clarification. The agent overrode all five."
      },
      {
        "title": "What the result tells us",
        "text": "The added advisor showed no reliability benefit on this sequence. A useful harness makes that distinction observable: advice, final decisions, rejected actions, and artifact validity are separate records. A successful final artifact alone would hide the incorrect recommendations."
      },
      {
        "title": "Limitations & next experiment",
        "text": "This was one authored sequence per arm, roughly nine to ten minutes of execution, with full current state and a known geometry recipe. It did not test context compaction, multi-day work, or independent repetitions. Strong state and explicit requests may create a ceiling effect. A harder evaluation should isolate state/recovery mechanisms and include repeated runs before making a general reliability claim."
      }
    ],
    "links": [
      {
        "label": "Download the 80-event numeric record",
        "href": "/artifacts/agent-trial.json"
      },
      {
        "label": "Harness research questions",
        "href": "/work/agent-harnesses/"
      }
    ]
  },
  {
    finding: "61 logged epochs. Final validation mAP@50-95: 82.16%; no physical-gameplay claim.",
    evidence: { label: "Historical validation", summary: "Original run log, final recorded epoch. Validation results are not a fresh held-out test.", headers: ["Measure", "Recorded result"], rows: [["Logged / configured epochs", "61 / 100"], ["Precision", "98.26%"], ["Recall", "98.31%"], ["mAP@50", "99.08%"], ["mAP@50-95", "82.16%"]], download: "/artifacts/chess-training.csv" },
    slug: "vision-training", title: "Chess-piece detection model training", area: "Computer vision", status: "Training experiment",
    summary: "Fine-tuning YOLOv8s and connecting piece detections to a structured board state.",
    question: "How do image detections become a board state that downstream software can trust?",
    sections: [
      {title: "Training", text: "I fine-tuned YOLOv8s on Roboflow-100’s chess-pieces dataset, version 2, using 640-pixel images and batch size 16. The saved run configuration records CPU training with checkpoint resume. The script targets 100 epochs; the retained log contains 61."},
      {title: "Recorded results", text: "At epoch 61, validation precision was 98.26%, recall 98.31%, mAP@50 99.08%, and mAP@50–95 82.16%. The figure is generated directly from the committed training CSV. These are historical validation results, not a fresh held-out test or physical gameplay measurement."},
      {title: "The integration lesson", text: "The dataset has 13 labels, including an ambiguous uncolored bishop. A chess board needs the 12 color-specific piece classes. A high detection score does not resolve that schema mismatch: uncertain labels must be rejected, relabeled, or retrained before board serialization."},
      {title: "Project history", text: "The repository’s current version focuses on checkers with classical OpenCV perception. The training code and logs remain in the earlier chess revision linked below. The robot prototype footage belongs to the checkers work and is not evidence of this detector’s performance."},
    ],
    image: {src: "/artifacts/chess-training.svg", width: 699.59952, height: 430.873869, alt: "Validation mAP curves across the 61 logged YOLOv8s training epochs", caption: "Historical validation curves, generated from the original run log. Roboflow-100 chess-pieces v2, CC BY 4.0."},
    links: [
      {label: "Training code", href: "https://github.com/ichen27/lerobot-chess-player/blob/d91e36aeca09cfd27115dd931f4907238ab732fe/scripts/train_yolo.py"},
      {label: "Original run log", href: "https://github.com/ichen27/lerobot-chess-player/blob/d91e36aeca09cfd27115dd931f4907238ab732fe/weights/chess_pieces/results.csv"},
      {label: "Download CSV", href: "/artifacts/chess-training.csv"},
      {label: "Dataset", href: "https://universe.roboflow.com/roboflow-100/chess-pieces-mjzgj/dataset/2"},
    ],
  },
];

export const cloudflare: Work[] = [
  {
    slug: "cloudflare-metrics", title: "Professional Services business metrics", area: "Cloudflare · Summer 2026", status: "Internship project",
    summary: "A system for comparing business performance across time and customer cohorts.",
    question: "How can a business metric stay explainable all the way down to the records behind it?",
    sections: [
      {title: "The product", text: "I worked on an analytics application for Professional Services leaders, with metric cards, historical views, cohort filters, and account/opportunity drill-downs. The goal was to make the selected population consistent across every view."},
      {title: "Architecture shaped by access", text: "The project started with a Workers architecture, moved to a functional Gadget implementation while data access was constrained, and returned to Workers when the required opportunity data became available. The later design used D1 storage and Workflows for batched retrieval and ingestion."},
      {title: "The difficult part", text: "Reliable comparisons require shared metric definitions, consistent cohort scope, and explicit treatment of small samples. A configuration-driven catalog was intended to make future metrics easier to add without rebuilding the application."},
      {title: "State at handoff", text: "The core product and data architecture existed, but the complete Workers refresh path still needed end-to-end validation and production hardening. AI summaries and the fully verified metric/cohort builders remained future work. This account is based on my retrospective handoff."},
    ],
    flow: ["Business data", "Batched refresh", "Metric storage", "Cohort analysis", "Record drill-down"],
  },
  {
    slug: "cloudflare-forecasting", title: "Professional Services forecasting", area: "Cloudflare · Summer 2026", status: "Internship project",
    summary: "Historical-rate forecasts, qualitative context, and explicit human judgment.",
    question: "How do you build a useful forecast when trustworthy historical snapshots don’t exist?",
    sections: [
      {title: "A change in approach", text: "The initial plan was to train a model on historical weekly pipeline snapshots. Available stage history could not reliably reconstruct those snapshots, so I shifted toward deterministic forecasting using historical category close rates, hierarchical fallback, and smoothing."},
      {title: "The application", text: "The project evolved toward a Salesforce-native application using Lightning Web Components and Apex. The workbench separates the system-calculated forecast from the human-editable forecast. Weekly snapshots preserve what was known when a forecast was made."},
      {title: "Where the LLM belongs", text: "Language models help interpret qualitative sales context, organize evidence, and surface risks. The numerical baseline belongs to the deterministic calculation layer; the final published forecast belongs to the human reviewer."},
      {title: "State at handoff", text: "Substantial backend work and an older wired frontend existed. The preferred new interface still required complete backend wiring, verification of the weekly lifecycle and formulas, and production promotion. The handoff records those gaps rather than treating the intended architecture as fully shipped."},
    ],
    flow: ["Pipeline snapshot", "Historical rates", "Calculated baseline", "Context & human review", "Published forecast"],
  },
];
export const allWork = [...work, ...cloudflare];

export const researchWork = ["handshake-benchmarks", "decision-models", "cad-kernel", "spatial-capture", "vision-training"].map(slug => work.find(item => item.slug === slug)!);
