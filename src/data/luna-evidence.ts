import localSystemDiagram from "../assets/screenshots/local system diagram.png";
import type { EvidenceArtifact } from "./evidence";

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
    publicSafe: true,
  },
];
