export type Work = {
  slug: string; title: string; area: string; status: string; summary: string;
  question: string; sections: { title: string; text: string }[];
  links?: { label: string; href: string }[];
  image?: { src: string; width: number; height: number; alt: string; caption: string };
  flow?: string[];
};

export const work: Work[] = [
  {
    slug: "agent-harnesses", title: "Agent harnesses", area: "Agent systems", status: "Working software",
    summary: "Keeping coding agents observable and recoverable across long-running sessions.",
    question: "How do you know when an agent needs attention—and safely help it continue?",
    sections: [
      {title: "The problem", text: "An agent can be waiting for a decision, disconnected, or sitting at a shell prompt. Treating all three states as the same creates a dangerous interface: a message intended for the agent can become a shell command."},
      {title: "What I built", text: "Agent Queue is a session inbox with durable snapshots, explicit reconnect states, monitor acknowledgements, and bounded command delivery. Delivery checks the foreground process, the current prompt, and the screen revision before sending text."},
      {title: "What I learned", text: "The useful part of a harness is the behavior around the model: what it observes, what it remembers, when it waits, and how it recovers. One review caught an exited-agent shell-prompt case; another caught a state-replacement race. Both became regression tests."},
      {title: "Evidence and limits", text: "The release was checked with 59 Python tests and five browser tests. The pictured interface is the actual browser demo with synthetic session output. It demonstrates the interaction, not real agent outcomes. The process check and terminal write are still not atomic."},
    ],
    image: {src: "/artifacts/agent-queue.png", width: 1440, height: 1024, alt: "Agent Queue demo interface with synthetic agent sessions", caption: "Actual Agent Queue demo UI. Session contents are synthetic."},
    links: [{label: "Source & demo", href: "https://github.com/ichen27/agent-queue"}],
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
    slug: "cad-kernel", title: "Building a geometry kernel", area: "Geometry", status: "Research prototype",
    summary: "Representing and validating solid boundaries, with independent geometry checks.",
    question: "How can separate geometry engines agree on what makes a solid valid?",
    sections: [
      {title: "The research", text: "Alongside the CAD application, I’m experimenting with original geometry algorithms. Exact planar geometry and analytic curved boundaries now share a representation of vertices, edges, directed edge uses, faces, loops, and shells."},
      {title: "What makes this difficult", text: "A shape can look correct while its boundary is invalid. The validator checks loop closure, orientation, opposite edge uses, connected vertex links, and shell topology. Curved boundaries use an explicit tolerance while planar rational values remain exact."},
      {title: "An independent check", text: "The shared-topology milestone passed 54 OCCT comparisons covering validity, connected shells, area, and signed volume. Maximum area error was 6.82 × 10⁻¹³ mm² and volume error was 2.73 × 10⁻¹² mm³. Sampling does not establish global geometric equivalence."},
      {title: "Current limits", text: "Mixed-backend Booleans, general self-intersection detection, shell nesting, and persistent face naming remain open. The application still uses OCCT; this research is not a replacement for a general-purpose production kernel."},
    ],
    image: {src: "/artifacts/shared-topology.png", width: 2100, height: 812, alt: "Rendered examples from the shared analytic boundary and topology validation experiment", caption: "Actual geometry generated by the shared-topology experiment, including a deliberately invalid boundary."},
  },
  {
    slug: "spatial-capture", title: "3D reconstruction for property walkthroughs", area: "Spatial computing", status: "Exploration",
    summary: "Exploring how phone captures and Gaussian splats can make spaces easier to inspect remotely.",
    question: "What makes a reconstruction useful across an entire apartment, rather than one good camera angle?",
    sections: [
      {title: "The goal", text: "I’m exploring navigable property walkthroughs as part of my housing-product work. The challenge spans capture coverage, camera calibration, reconstruction, and a viewer that makes missing information apparent."},
      {title: "Experiments so far", text: "The work includes phone-capture infrastructure, point-cloud and mesh inspection, and a Gaussian-splat training experiment using views rendered from an apartment mesh. That last experiment is mesh-to-splat distillation; it is not reconstruction from phone photographs."},
      {title: "What I’m checking", text: "Matched source and reconstructed viewpoints are more useful than a single impressive render. Holes, distorted furniture, unseen surfaces, and weak coverage need to be evaluated room by room and along the walkthrough path."},
      {title: "Current limits", text: "Whole-apartment quality and reliable physical-phone capture remain under evaluation. I’m keeping that distinction visible before describing the pipeline as ready for real-estate use."},
    ],
    flow: ["Capture / source views", "Camera calibration", "Reconstruction", "Matched-view review"],
  },
  {
    slug: "decision-models", title: "Decision models + language models", area: "Evaluation", status: "Ongoing experiments",
    summary: "Testing whether a separate decision model improves an agent’s choices—and when it doesn’t.",
    question: "Does adding a decision model help, or just add another model call?",
    sections: [
      {title: "The experiment", text: "I’m comparing deterministic rules, a general agent, and a structured decision model on bounded CAD workflow decisions. In a paired trial, the general agent first makes a provisional choice, receives decision-model advice, and then records its final action."},
      {title: "The initial result", text: "On 28 frozen decisions, rules scored 21/28, the decision model 27/28, and the blind general agent 28/28. In a separate four-task paired trial, both the plain and assisted agents completed 4/4. The decision model agreed with all nine provisional choices and the assisted run took longer."},
      {title: "What that means", text: "The initial trial did not show an improvement from adding advice. Agreement is not the same as added value, and these small task sets do not support a general conclusion about agent reliability."},
      {title: "The next question", text: "The more interesting direction is whether cheap routine decisions can be handled by a structured model, with ambiguous cases escalated to a general model. Longer-session work also asks about drift, recovery, and calibration. Deterministic checks retain final authority."},
    ],
  },
  {
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
