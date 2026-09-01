import type { LunaHistoryRecord } from "./evidence";

export const lunaHistory: LunaHistoryRecord[] = [
  {
    id: "foundation",
    label: "v0.1–v0.5.5",
    eraTitle: "Foundation",
    status: "Historical",
    problem:
      "Establish a local-first assistant foundation with durable boundaries for future work.",
    change:
      "Application structure grew into persistence, governed tooling, risk controls, and an architecture freeze.",
    result:
      "LUNA reached a stable foundational boundary for the interaction work that followed.",
    learned:
      "Freezing architecture and authoring practices gave rapid early iteration a dependable endpoint.",
    deliveredScope: [
      "Application structure",
      "Persistence framework",
      "Governed tooling",
      "Risk controls",
      "Architecture freeze",
    ],
    deviation:
      "The foundation grew beyond an application baseline into governance, tooling, and persistence boundaries.",
    developmentIssues: [
      "Stability while the tool surface expanded",
      "Keeping risk controls aligned with new capabilities",
    ],
    resolutions: [
      "Architecture and development-workflow freezes",
      "Explicit persistence and governance boundaries",
    ],
    evidenceIds: [],
  },
  {
    id: "stable-core",
    label: "v0.6–v1.0",
    eraTitle: "Interaction & Stable Core",
    status: "Historical",
    problem:
      "Create the human interaction layer and a stable governed assistant core.",
    change:
      "Personas, voice, streaming, session controls, inspector functions, and cognitive-loop work converged into the v1.0 core.",
    result:
      "The interaction layer and unified core established the next stable boundary.",
    learned:
      "Interaction features and session stability have to mature together; neither is a finishing pass for the other.",
    deliveredScope: [
      "Personas and voice",
      "Streaming controls",
      "Session stability",
      "Inspector functionality",
      "Unified core",
    ],
    deviation:
      "Interaction work expanded into cognitive foundations and hardening before the stable-core boundary.",
    developmentIssues: [
      "Voice-provider integration",
      "Session stability",
      "Interaction control behavior",
    ],
    resolutions: ["Core hardening", "Unified v1.0 architecture"],
    evidenceIds: [],
  },
  {
    id: "knowledge-era",
    label: "v1.1–v1.5",
    eraTitle: "Research, Knowledge & Planning",
    status: "Historical",
    problem:
      "Extend the stable core with specialized cognition, research, knowledge, and planning.",
    change:
      "LUCID, routing, structured research, Decision Journal, Knowledge Vault, and Planner Goal Engine established clearer subsystems.",
    result:
      "Knowledge, research, decisions, and planning became distinct parts of the product architecture.",
    learned:
      "Subsystem ownership became clearer as routing, research, storage, and planning stopped behaving like one feature.",
    deliveredScope: [
      "LUCID",
      "Routing upgrades",
      "Structured research",
      "Decision Journal",
      "Knowledge Vault",
      "Planner Goal Engine",
    ],
    deviation:
      "Routing and early research integration overlapped; later Vault and Planner work clarified ownership.",
    developmentIssues: [
      "Overlapping router and research work",
      "Documentation and version drift",
    ],
    resolutions: [
      "Clearer Vault and Planner subsystem boundaries",
      "Performance hardening",
    ],
    evidenceIds: [],
  },
  {
    id: "identity-security",
    label: "v1.6–v1.7",
    eraTitle: "Identity & Security",
    status: "Released",
    problem:
      "Add multi-user identity and stronger security boundaries without abandoning the local-first model.",
    change:
      "Users, workspaces, credentials, sessions, OAuth, audit records, trust gates, and admin foundations were added and hardened.",
    result:
      "Identity moved from foundation work into a substantially hardened released boundary.",
    learned:
      "Schema authority, session revocation, and auditability have to be designed as system behavior, not authentication add-ons.",
    deliveredScope: [
      "Users and workspaces",
      "Local credentials",
      "Revocable sessions",
      "OAuth flows",
      "Security audit records",
      "Trust gates",
    ],
    deviation:
      "v1.6 established identity and deferred broader hardening; v1.7 completed that security pass.",
    developmentIssues: [
      "Import-time schema mutation",
      "OAuth state and cookie policy",
      "Inactive-user and revocation behavior",
    ],
    resolutions: [
      "Startup-time schema authority",
      "Session inventory and revocation",
      "Stronger auditability",
    ],
    evidenceIds: [],
  },
  {
    id: "governed-business",
    label: "v1.8–v1.9.5",
    eraTitle: "Governed Business & Hardening",
    status: "Released",
    problem:
      "Add useful business and execution foundations without permitting uncontrolled autonomous action.",
    change:
      "Evidence-linked analysis, proposal integrations, draft artifacts, orchestration, export, provenance, ingestion, and readiness hardening were delivered.",
    result:
      "Business capabilities reached a governed, proposal-oriented released state with stronger repository and readiness discipline.",
    learned:
      "Provenance and ownership enforcement are product requirements when generated work can become an executable proposal.",
    deliveredScope: [
      "Business Assistant",
      "Draft-only artifacts",
      "Proposal hooks",
      "Orchestration",
      "Provenance",
      "Scope enforcement",
      "Readiness hardening",
    ],
    deviation:
      "Backend-focused contracts expanded into draft services, proposal hooks, orchestration, and product composition while retaining governed semantics.",
    developmentIssues: [
      "Citation integrity",
      "Ownership boundaries",
      "Proposal deduplication",
      "Repository and CI consistency",
    ],
    resolutions: [
      "Deterministic provenance",
      "Scope enforcement",
      "v1.9.5 hardening endpoint",
    ],
    evidenceIds: [],
  },
  {
    id: "v2-closure",
    label: "v2.0",
    eraTitle: "Release Closure",
    status: "Prerelease / Release Closure",
    problem:
      "Build a route-owned v2 experience, reconcile partially integrated capability work, and prepare packaged desktop deployment.",
    change:
      "A 17-route shell and canonical workflows were integrated with migration authority, authorization hardening, desktop runtime, installer, backup/restore, documentation, and release gates.",
    result:
      "v2.0 reached internal feature and engineering completion through release closure. It remains prerelease pending final authorization and promotion.",
    learned:
      "Feature completion is not release completion. Persistent-state authority, installed behavior, lifecycle, and acceptance gates all belong to the product.",
    deliveredScope: [
      "Canonical 17-route shell",
      "Chat and settings",
      "Research and provenance",
      "Planner and business workflows",
      "Vault, ingestion, and graph",
      "Inspector, admin, and export",
      "Canonical knowledge workflows",
      "Alembic schema authority",
      "Passkeys and cookie-only browser sessions",
      "Concurrency hardening",
      "First-owner bootstrap",
      "Private desktop runtime",
      "Launcher and WebView2 host",
      "Installer",
      "Backup and restore",
      "Documentation and release pipeline",
    ],
    deviation:
      "Later work reconciled intended but backend-only or partially integrated capabilities and hardened them for release; it was not an unrelated feature train.",
    developmentIssues: [
      "Schema-authority fragmentation",
      "Crash-consistency risk",
      "Route and documentation drift",
      "Packaging and desktop lifecycle defects",
      "Incomplete end-to-end integration",
    ],
    resolutions: [
      "Migrations and locking",
      "Architecture-fitness tests",
      "Runtime contracts",
      "Installer and launcher work",
      "Acceptance validation",
    ],
    evidenceIds: ["local-system"],
    validationSnapshots: ["1,346 passed", "1,507 passed", "1,518 passed"],
  },
];
