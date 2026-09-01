import type { LunaHistoryRecord } from "./evidence";

export const lunaHistory: LunaHistoryRecord[] = [
  {
    id: "foundation",
    label: "v0.1–v0.5.5",
    eraTitle: "Foundation",
    status: "Historical",
    problem:
      "Establish a modular, local-first assistant foundation capable of safely growing beyond basic conversation.",
    change:
      "The scope grew from a basic modular agent into a governed local tool platform.",
    result:
      "A stable governed base for later interaction and reasoning systems.",
    learned:
      "Extensibility needs explicit authority and safety boundaries before capability growth.",
    deliveredScope: [
      "Core local agent/API and persistence foundations",
      "Authentication and application-stability infrastructure",
      "Governed tool execution with sandboxing, approvals, capability controls, and auditability",
    ],
    deviation:
      "The foundation expanded from conversation into persistence, protected routes, settings, prompts, uploads, and governed tool execution.",
    developmentIssues: [
      "Tool authority and side-effect risk",
      "Persistence and session stability",
      "Need for explicit architecture boundaries before broader expansion",
    ],
    resolutions: [
      "Centralized tool registry and risk taxonomy",
      "Workspace sandbox, approval loop, and audit logging",
      "v0.5.5 architecture and authoring freeze",
    ],
    metrics: { productionLoc: 3383, testLoc: 575, pytestCollected: null },
  },
  {
    id: "stable-core",
    label: "v0.6–v1.0",
    eraTitle: "Interaction & Stable Core",
    status: "Historical",
    problem:
      "Transform LUNA from an architecture-focused foundation into a stable interactive text-and-voice system.",
    change:
      "Voice integration and cognitive interaction increased the need for fallback behavior and runtime stabilization.",
    result:
      "A stable interactive core supporting text, voice, and governed reasoning workflows.",
    learned:
      "Optional rich interaction should degrade gracefully without destabilizing the core.",
    deliveredScope: [
      "Interactive personas, streaming controls, and inspection workflows",
      "Speech capture, transcription, synthesis, playback, and voice profiles",
      "LUCID/cognitive-loop work and sustained core hardening",
    ],
    deviation:
      "Interaction work expanded into voice and cognitive systems that required stronger fallback and stability behavior.",
    developmentIssues: [
      "Optional voice-engine dependencies",
      "Voice sidecar and session reliability",
      "Performance and release stability",
    ],
    resolutions: [
      "Optional voice isolation and fallback behavior",
      "Hardened sessions, streaming, CI, and runtime paths",
      "Stable v1.0 core endpoint",
    ],
    metrics: { productionLoc: 11695, testLoc: 2560, pytestCollected: 179 },
  },
  {
    id: "knowledge-era",
    label: "v1.1–v1.5",
    eraTitle: "Research, Knowledge & Planning",
    status: "Historical",
    problem:
      "Extend LUNA from interaction into structured research and higher-order reasoning workflows.",
    change:
      "Research routing expanded into durable knowledge organization and explicit goal planning.",
    result: "LUNA gained durable research, knowledge, and planning subsystems.",
    learned:
      "Research becomes reusable only when evidence, knowledge, and planned action have explicit boundaries.",
    deliveredScope: [
      "Structured research and research journaling",
      "Knowledge Vault",
      "Planner Goal Engine and proposal-oriented planning",
      "Research, knowledge, and planning workspaces",
    ],
    deviation:
      "Research routing grew into distinct Vault and Planner ownership boundaries.",
    developmentIssues: [
      "Evidence and provenance structure",
      "Coordination across Research, Vault, and planning",
      "Continued subsystem hardening",
    ],
    resolutions: [
      "Structured research artifacts and journals",
      "Dedicated Vault organization and inspection",
      "Proposal-first Planner Goal Engine",
    ],
    metrics: { productionLoc: 37263, testLoc: 16631, pytestCollected: 891 },
  },
  {
    id: "identity-security",
    label: "v1.6–v1.7",
    eraTitle: "Identity & Security",
    status: "Released",
    problem:
      "Add multi-user identity, workspace scope, onboarding, and secure account access.",
    change:
      "Basic identity work broadened into formal security and administrative hardening.",
    result:
      "LUNA moved from primarily local identity assumptions to hardened multi-user access control.",
    learned:
      "Identity is not complete until tenancy, session lifecycle, auditability, and administrative authority are distinct.",
    deliveredScope: [
      "Users, workspaces, memberships, and scoped sessions",
      "Password and configurable OAuth authentication",
      "Session revocation, signed OAuth state, and authentication audit records",
      "Durable platform administration separated from workspace ownership",
    ],
    deviation:
      "Identity expanded into explicit tenancy, session-lifecycle, audit, and platform-administration boundaries.",
    developmentIssues: [
      "OAuth trust boundaries",
      "Session revocation and cache safety",
      "Ambiguity between ownership and platform administration",
    ],
    resolutions: [
      "Signed state and explicit scope gates",
      "Revocable sessions and append-only authentication audits",
      "Separate platform-admin authority and routes",
    ],
    metrics: { productionLoc: 42137, testLoc: 19129, pytestCollected: 1038 },
  },
  {
    id: "governed-business",
    label: "v1.8–v1.9.5",
    eraTitle: "Governed Business & Hardening",
    status: "Released",
    problem:
      "Extend LUNA into evidence-aware business analysis and governed revenue-oriented planning without unsafe autonomous execution.",
    change:
      "The scope remained deliberately backend-first and emphasized governance over autonomous execution.",
    result:
      "Governed business and revenue-planning primitives ready for later operator-facing integration.",
    learned:
      "Business automation should begin with reviewable evidence-backed proposals rather than hidden side effects.",
    deliveredScope: [
      "Evidence-linked Business Assistant analysis",
      "Typed revenue, site, workflow, and automation drafts",
      "Proposal-only orchestration across Planner and Vault",
      "Provenance, citation, deduplication, export, and readiness hardening",
    ],
    deviation:
      "The era intentionally prioritized governed backend contracts rather than a full customer-facing interface.",
    developmentIssues: [
      "Provenance and citation integrity",
      "Tenant and authentication scope regressions",
      "Duplicate outputs and accidental side effects",
      "Stable export and ingestion boundaries",
    ],
    resolutions: [
      "Typed evidence-linked artifacts",
      "Proposal-only gates and scope regression tests",
      "Deterministic provenance, deduplication, and stable JSON seams",
    ],
    metrics: { productionLoc: 47227, testLoc: 21087, pytestCollected: 1136 },
  },
  {
    id: "v2-closure",
    label: "v2.0",
    eraTitle: "Release Closure / Prerelease",
    status: "Prerelease / Release Closure",
    problem:
      "Reconcile accumulated v1.x capabilities into a coherent, installable, operator-facing product and close release-critical architecture gaps.",
    change:
      "v2 became an integration and productization release rather than a new collection of backend subsystems.",
    result:
      "A committed v2 prerelease with integrated UI and Windows packaging, still awaiting a formal tag and final release decision.",
    learned:
      "Release closure is primarily the work of reconciling authority, lifecycle, interfaces, and packaging—not relabeling inherited features as new.",
    deliveredScope: [
      "Canonical v2 application shell and route inventory",
      "End-to-end UI integration of inherited Research, Knowledge, Planning, Business, LUCID, ingestion, and graph systems",
      "Authoritative schema, runtime, storage, concurrency, and crash-consistency behavior",
      "Cookie-only sessions, passkeys, first-owner bootstrap, and account/admin hardening",
      "Windows launcher, WebView2 host, private runtime, installer, backup/restore, and release-acceptance pipeline",
    ],
    deviation:
      "The release focused on integrating and hardening inherited systems instead of presenting them as new v2 subsystems.",
    developmentIssues: [
      "Architectural drift and duplicate authority",
      "Previously backend-only capabilities",
      "Installed-runtime and desktop lifecycle failures",
      "Concurrency and schema consistency",
      "Authentication and onboarding suitable for packaged use",
    ],
    resolutions: [
      "Canonical route and API ownership",
      "Alembic-only schema authority and atomic locking",
      "Operator-facing workflow reconciliation",
      "Supervised launcher, native host, installer, and release validation",
      "Browser-session and bootstrap redesign",
    ],
    metrics: { productionLoc: 75798, testLoc: 32642, pytestCollected: 1899 },
    checkpointVersion: "2.0.0.dev0",
    metricsNote: "Pytest shows collected test cases for this checkpoint.",
  },
];
