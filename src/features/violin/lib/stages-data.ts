import type { Stage, Rating } from "../types";

export const STAGES: Stage[] = [
  { id: "foundation", label: "Foundation", range: [1, 6], blurb: "Bow length & speed control" },
  { id: "direction", label: "Direction control", range: [7, 13], blurb: "Alternating vs. single-direction bow" },
  { id: "grouping", label: "Rhythmic grouping", range: [14, 24], blurb: "Short/long combinations within a phrase" },
  { id: "articulation", label: "Articulation", range: [25, 28], blurb: "Staccato and staccato–legato contrast" },
  { id: "integration", label: "Integration", range: [29, 35], blurb: "Full-bow fluency, accents, closing patterns" },
];

export const RATINGS: Rating[] = [
  { v: 1, label: "Rough" },
  { v: 2, label: "Getting there" },
  { v: 3, label: "Solid" },
  { v: 4, label: "Clean" },
];

export const STORAGE_KEY = "gmajor_bowing_log_v1";