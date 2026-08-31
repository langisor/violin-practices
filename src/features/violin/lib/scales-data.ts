import type { Scale } from "../types";

export const SCALES: Scale[] = [
  { id: "g-major", label: "G Major", description: "1 Octave (low)", exerciseSetId: "one-octave" },
  { id: "c-major", label: "C Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "d-major", label: "D Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "f-major", label: "F Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "bb-major", label: "Bb Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "eb-major", label: "Eb Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "a-major", label: "A Major", description: "1 Octave", exerciseSetId: "one-octave" },
  { id: "g-major-2oct", label: "G Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave" },
  { id: "a-major-2oct", label: "A Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave" },
  { id: "bb-major-2oct", label: "Bb Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave" },
];

// G Major, C Major, D Major, F Major, Bb Major, Eb Major, and A Major share the same one-octave bowing-pattern
// set (same titles, same bow markings — just transposed), so they all
// point at exerciseSetId "one-octave". The two-octave G Major, A Major, and Bb Major sheets have
// genuinely different patterns in several spots, so they get their own set.
// Exercises are stored once per set and logged per scale using this
// composite key.
export function logKey(scaleId: string, n: number): string {
  return `${scaleId}:${n}`;
}