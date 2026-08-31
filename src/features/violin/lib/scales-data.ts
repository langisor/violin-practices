import type { Scale } from "../types";

export const SCALES: Scale[] = [
  { id: "g-major", label: "G Major", description: "1 Octave (low)", exerciseSetId: "one-octave", notes: "G - A - B - C - D - E - F# - G" },
  { id: "c-major", label: "C Major", description: "1 Octave", exerciseSetId: "one-octave", notes: "C - D - E - F - G - A - B - C" },
  { id: "d-major", label: "D Major", description: "1 Octave", exerciseSetId: "one-octave", notes: "D - E - F# - G - A - B - C# - D" },
  { id: "f-major", label: "F Major", description: "1 Octave", exerciseSetId: "one-octave", notes: "F - G - A - Bb - C - D - E - F" },
  { id: "bb-major", label: "Bb Major", description: "1 Octave", exerciseSetId: "one-octave", notes: "Bb - C - D - Eb - F - G - A - Bb" },
  { id: "eb-major", label: "Eb Major", description: "1 Octave", exerciseSetId: "one-octave", notes: "Eb - F - G - Ab - Bb - C - D - Eb" },
  { id: "a-major", label: "A Major", description: "1 Octave", exerciseSetId: "one-octave", notes: "A - B - C# - D - E - F# - G# - A" },
  { id: "g-major-2oct", label: "G Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave", notes: "G - A - B - C - D - E - F# - G - A - B - C - D - E - F# - G" },
  { id: "a-major-2oct", label: "A Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave", notes: "A - B - C# - D - E - F# - G# - A - B - C# - D - E - F# - G# - A" },
  { id: "bb-major-2oct", label: "Bb Major (2 Oct.)", description: "2 Octaves", exerciseSetId: "two-octave", notes: "Bb - C - D - Eb - F - G - A - Bb - C - D - Eb - F - G - A - Bb" },
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

// Get the PDF filename for a given scale ID
export function getPdfFilename(scaleId: string): string {
  const pdfMap: Record<string, string> = {
    "g-major": "G-Major-1-Octavelow-Full-Score.pdf",
    "c-major": "C-Major-1-Octave-Full-Score.pdf",
    "d-major": "D-Major-1-Octave-Full-Score.pdf",
    "f-major": "F-Major-1-Octave-Full-Score.pdf",
    "bb-major": "Bb-Major-1-Octave-Full-Score.pdf",
    "eb-major": "Eb-Major-1-Octave-Full-Score.pdf",
    "a-major": "A-Major-1-Octave-Full-Score.pdf",
    "g-major-2oct": "G-Major-2-Octave-Full-Score.pdf",
    "a-major-2oct": "A-Major-2-Octave-Full-Score.pdf",
    "bb-major-2oct": "Bb-Major-2-Octave-Full-Score.pdf",
  };
  return pdfMap[scaleId] || "";
}