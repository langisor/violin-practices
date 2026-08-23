import type { Scale } from "../types";

export const SCALES: Scale[] = [
  { id: "g-major", label: "G Major", description: "1 Octave (low)", exerciseSetId: "one-octave" },
  { id: "c-major", label: "C Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "f-major", label: "F Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "g-major-2oct", label: "G Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave" },
];

// G Major, C Major, and F Major share the same one-octave bowing-pattern
// set (same titles, same bow markings — just transposed), so they all
// point at exerciseSetId "one-octave". The two-octave G Major sheet has
// genuinely different patterns in several spots, so it gets its own set.
// Exercises are stored once per set and logged per scale using this
// composite key.
export function logKey(scaleId: string, n: number): string {
  return `${scaleId}:${n}`;
}