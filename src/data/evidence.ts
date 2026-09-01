import type { ImageMetadata } from "astro";

export interface EvidenceAnnotation {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
}

export interface EvidenceArtifact {
  id: string;
  slot: string;
  title: string;
  artifactType: string;
  project: string;
  description: string;
  state: "current" | "historical" | "architecture" | "planned";
  image?: ImageMetadata;
  alt?: string;
  what: string;
  problem: string;
  decision: string;
  result?: string;
  concepts: string[];
  href?: string;
  hrefLabel?: string;
  annotations?: EvidenceAnnotation[];
  publicSafe: boolean;
  layout?: "wide" | "tall" | "standard";
}

export interface LunaHistoryRecord {
  id: string;
  label: string;
  eraTitle: string;
  problem: string;
  change: string;
  result: string;
  learned?: string;
  status: string;
  deliveredScope: string[];
  deviation: string;
  developmentIssues: string[];
  resolutions: string[];
  evidenceIds: string[];
  metrics: {
    productionLoc: number;
    testLoc: number;
    pytestCollected: number | null;
  };
  checkpointVersion?: string;
  metricsNote?: string;
}
