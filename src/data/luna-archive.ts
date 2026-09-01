import localSystemDiagram from "../assets/screenshots/local system diagram.png";
import type { EvidenceArtifact, LunaArchiveFolder } from "./evidence";

export const lunaArtifacts: EvidenceArtifact[] = [
  {
    id: "local-system",
    slot: "A-01",
    title: "Local system overview",
    artifactType: "Architecture",
    project: "LUNA",
    description: "A public-safe view of LUNA's local-first product direction.",
    state: "architecture",
    image: localSystemDiagram,
    alt: "LUNA local system diagram showing the user, LUNA, knowledge and work, local data, and optional external services.",
    what: "A simplified view of how the user, LUNA, retained knowledge, and local data relate at the product level.",
    problem:
      "Useful personal context needs durable ownership without forcing every important part of the experience into a remote black box.",
    decision:
      "The public diagram explains boundaries and user control without exposing private implementation structure.",
    result:
      "The product direction stays understandable to nontechnical visitors while still showing the engineering boundary that matters most.",
    concepts: [
      "Local-first design",
      "User ownership",
      "Governed action",
      "Architecture",
    ],
    href: "/luna#archive",
    hrefLabel: "Return to the archive",
    publicSafe: true,
    layout: "wide",
  },
];

export const lunaFolders: LunaArchiveFolder[] = [
  {
    id: "system",
    label: "System",
    description: "Current workspace and product surfaces.",
    artifactIds: [],
  },
  {
    id: "knowledge",
    label: "Knowledge & Memory",
    description: "Vault, graph, context, and provenance evidence.",
    artifactIds: [],
  },
  {
    id: "governance",
    label: "Decisions & Governance",
    description: "Decision history, approvals, and visible execution.",
    artifactIds: [],
  },
  {
    id: "planning",
    label: "Planning & Tools",
    description: "Goals, research, workflows, and controlled tools.",
    artifactIds: [],
  },
  {
    id: "architecture",
    label: "Architecture",
    description: "Public-safe diagrams and engineering evidence.",
    artifactIds: ["local-system"],
  },
  {
    id: "development",
    label: "Development Archive",
    description: "Historical interfaces, roadmaps, and development records.",
    artifactIds: [],
  },
];
