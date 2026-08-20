import type { Scale } from "../types";

export const SCALES: Scale[] = [
  { id: "g-major", label: "G Major", description: "1 Octave (low)" },
  { id: "c-major", label: "C Major", description: "1 Octave" },
  { id: "f-major", label: "F Major", description: "1 Octave" },
];

// The 35-exercise bowing pattern set is identical across keys (same
// titles, same bow markings — just transposed), so exercises are stored
// once and logged per scale using this composite key.
export function logKey(scaleId: string, n: number): string {
  return `${scaleId}:${n}`;
}