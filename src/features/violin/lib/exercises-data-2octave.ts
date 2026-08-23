import type { Exercise } from "../types";

// G Major, 2 Octaves — same 35-position pedagogical arc as the one-octave
// sets, but the added octave means more string crossings and a longer
// scale line per stroke, so bow-distribution planning matters more here.
export const EXERCISES_2OCTAVE: Exercise[] = [
  {
    n: 1,
    title: "Long Bow",
    note: "One full slow bow per half note, across the full two-octave scale.",
    guide: [
      "Same long-bow idea as the one-octave version, but now the scale crosses all four strings twice — plan string crossings ahead of time.",
      "Keep bow speed constant even as you cross strings; a common issue is speeding up right at the crossing.",
      "If the top of the scale reaches a stretch on the E string, don't let tension creep into the bow arm as you reach it.",
    ],
  },
  {
    n: 2,
    title: "Half Bow",
    note: "Same two-octave scale, half-length bow strokes.",
    guide: [
      "Use half the bow per note, same zone throughout — the extra string crossings make consistent bow placement more demanding here than in the one-octave version.",
      "Keep the string crossing itself small and quiet; don't let it turn into an accent.",
    ],
  },
  {
    n: 3,
    title: "Long–Half, Half",
    note: "One long stroke followed by two half strokes, over two octaves.",
    guide: [
      "Pattern: down (long, full bow) → up (half) → down (half), repeating up and back down across both octaves.",
      "Because the scale line is longer, plan two or three string-crossing points in advance rather than reacting to them as they arrive.",
    ],
  },
  {
    n: 4,
    title: "Half, Half–Long",
    note: "Two half strokes followed by one long stroke, over two octaves.",
    guide: [
      "Mirror of No. 3 — half, half, then a full-bow long stroke.",
      "Keep the two half strokes evenly matched before the long stroke arrives, even across a string change.",
    ],
  },
  {
    n: 5,
    title: "Half Bow",
    note: "Mixed rhythm across two octaves, short-bow discipline.",
    guide: [
      "Rhythm shifts note to note — check note values before playing so your bow budget matches the written rhythm.",
      "Stay in the same general bow zone through the string crossings unless the rhythm forces a shift.",
    ],
  },
  {
    n: 6,
    title: "Slow, Long Bow",
    note: "Whole notes across two octaves — extended tone-control drill.",
    guide: [
      "One continuous bow per whole note, now over a longer scale — the most demanding tone drill in the set.",
      "Watch your bow distribution across string crossings; a whole note that starts on one string and needs to land cleanly after a crossing takes extra planning.",
      "Resist speeding up near the tip — the pull is stronger here since whole notes leave more time to drift.",
    ],
  },
  {
    n: 7,
    title: "Full Bow",
    note: "Alternating full bow, quarter-and-half groupings, ascending and descending two octaves.",
    guide: [
      "Full-bow alternating strokes carry the scale up through both octaves and back down.",
      "Keep tone matched between down- and up-bow, and pay extra attention right at each string crossing.",
      "Because the scale is longer, tempo drift is easier to miss — check yourself against a metronome.",
    ],
  },
  {
    n: 8,
    title: "Full Bow",
    note: "Continues the alternating full-bow pattern from No. 7, up-bow emphasis.",
    guide: [
      "Same technique as No. 7, with the bowing shifted so up-bows carry more of the phrase — make sure up-bow tone doesn't thin out over the longer line.",
    ],
  },
  {
    n: 9,
    title: "Full Bow — down only",
    note: "All down-bow, full bow length, across two octaves.",
    guide: [
      "Every note is a full-bow down-bow — lift and reset to the frog between notes, now across a longer scale with more retakes needed per pass.",
      "Keep each retake clean regardless of which string you land on next.",
    ],
  },
  {
    n: 10,
    title: "Full Bow — up only",
    note: "All up-bow, full bow length, across two octaves.",
    guide: [
      "Up-bow counterpart to No. 9 — reset to the tip between notes.",
      "This is the harder isolation of the pair; go slower here and check that string crossings don't disturb the retake.",
    ],
  },
  {
    n: 11,
    title: "Full Bow — up only, phrased",
    note: "Up-bow isolation with phrase grouping across two octaves.",
    guide: [
      "Same up-bow-only technique as No. 10, now grouped into phrases (the commas in the notation mark the breaks).",
      "Plan your retakes so they land at natural points in the phrase rather than mid-idea.",
    ],
  },
  {
    n: 12,
    title: "Full Bow — down only, phrased",
    note: "Down-bow isolation with phrase grouping across two octaves.",
    guide: [
      "Down-bow counterpart to No. 11 — same phrase-grouping challenge.",
      "Check that your tone stays even across every retake in the phrase, not just the first.",
    ],
  },
  {
    n: 13,
    title: "Full Bow",
    note: "Continues full-bow work across two octaves.",
    guide: [
      "A further full-bow pass over both octaves — use it as a consistency check after the down/up isolation work in Nos. 9–12.",
    ],
  },
  {
    n: 14,
    title: "Short Bow",
    note: "Fast even eighth notes, short strokes, across two octaves.",
    guide: [
      "Fast even eighth notes with a small portion of the bow — control comes from the wrist and fingers, not the whole arm.",
      "With twice the scale length, keep an especially close eye on evenness as you cross strings at speed.",
    ],
  },
  {
    n: 15,
    title: "Short×4 – Long",
    note: "Four short strokes into one long stroke, ascending and descending two octaves.",
    guide: [
      "Four quick short strokes lead into a sustained long stroke — down-up-down-up, then a slower resolving stroke.",
      "Don't let the short strokes rush ahead of tempo; the long stroke should feel like a release afterward.",
    ],
  },
  {
    n: 16,
    title: "Short, Short – Half",
    note: "Paired short strokes resolving to a half stroke, over two octaves.",
    guide: [
      "Two short strokes then a half-length stroke — keep the transition between bow speeds smooth even across a string crossing.",
    ],
  },
  {
    n: 17,
    title: "Half – Short, Short",
    note: "Half stroke followed by paired short strokes, over two octaves.",
    guide: [
      "Reverse of No. 16 — a half stroke first, then two matched short strokes.",
      "The half stroke sets your bow position; don't let the short strokes drift off the contact point.",
    ],
  },
  {
    n: 18,
    title: "Short, Short – Half",
    note: "Variant grouping of the same pattern, over two octaves.",
    guide: [
      "Same core pattern as No. 16 with a different phrase grouping — read the slur/comma marks carefully before playing.",
    ],
  },
  {
    n: 19,
    title: "Short×4 – Long",
    note: "Repeats the No. 15 pattern with new bow markings, over two octaves.",
    guide: [
      "Same short×4-into-long idea as No. 15 — check the bow direction marks, since this version starts on the opposite bow.",
    ],
  },
  {
    n: 20,
    title: "Long – Short×4",
    note: "Long stroke opens, then four short strokes, over two octaves.",
    guide: [
      "Reversed order from No. 15/19 — long stroke first, then four short strokes.",
      "Keep the pulse steady across the transition; don't rush into the short group right after the long note.",
    ],
  },
  {
    n: 21,
    title: "Long – Short, Short – Long",
    note: "Symmetrical long/short/long grouping, up-bow emphasis, over two octaves.",
    guide: [
      "Long, then two short, then long again — tests both bow-speed extremes in one phrase.",
      "This pass leans on up-bow strokes for the long notes — keep the tone as full as the down-bow version in No. 22.",
    ],
  },
  {
    n: 22,
    title: "Long – Short, Short – Long",
    note: "Symmetrical long/short/long grouping, down-bow emphasis, over two octaves.",
    guide: [
      "Same shape as No. 21, now with down-bow carrying the long notes.",
      "Use this pair to make the speed changes feel automatic in both bow directions.",
    ],
  },
  {
    n: 23,
    title: "Full Bow",
    note: "Alternating full bow across the full two-octave range.",
    guide: [
      "Steady alternating down-up full-bow strokes across both octaves — a fluency check after the isolation and grouping work.",
      "By now your tone should be even in both directions; use this to confirm it holds up over the longer line.",
    ],
  },
  {
    n: 24,
    title: "Short×4 – Long",
    note: "Fast group into a sustained note, over two octaves.",
    guide: [
      "Combines the short-group and long-stroke skills from earlier exercises into one flowing two-octave phrase.",
      "Keep the short notes even and the long note fully sustained with no fade at the end.",
    ],
  },
  {
    n: 25,
    title: "Full Bow Staccato",
    note: "Detached, articulated strokes across two octaves.",
    guide: [
      "Staccato dots mean each note stops cleanly on the string before the next starts — not bounced off the string.",
      "Use a small, controlled pinch and a brief stop between notes within the same bow direction.",
      "Extra string crossings here make evenness harder — slow down until each stop feels identical.",
    ],
  },
  {
    n: 26,
    title: "Full Bow Staccato – Legato",
    note: "Alternates staccato groups with smooth legato, over two octaves.",
    guide: [
      "Alternates detached staccato notes with smoothly connected legato notes in the same phrase.",
      "Exaggerate the contrast at first — very crisp staccato, very smooth legato — then even it out.",
    ],
  },
  {
    n: 27,
    title: "Full Bow Staccato",
    note: "Up-bow staccato groups across two octaves.",
    guide: [
      "Same staccato articulation as No. 25, now grouped on up-bow strokes.",
      "Up-bow staccato is harder to control — go slower here than on the down-bow version.",
    ],
  },
  {
    n: 28,
    title: "Full Bow Staccato – Legato",
    note: "Up-bow staccato into legato phrasing, over two octaves.",
    guide: [
      "Combines the up-bow staccato control from No. 27 with the staccato-to-legato contrast from No. 26.",
      "Focus on a clean transition point where staccato ends and legato begins.",
    ],
  },
  {
    n: 29,
    title: "Full Bow",
    note: "Steady alternating full-bow scale across two octaves.",
    guide: [
      "A straightforward alternating full-bow pass — use it as a relaxed check-in after the staccato work.",
      "Let the arm feel loose again after the more controlled staccato strokes.",
    ],
  },
  {
    n: 30,
    title: "Full Bow",
    note: "Continues full-bow alternation across two octaves.",
    guide: [
      "Continues the alternating full-bow pattern — treat this as a fluency and stamina check over the longer scale.",
      "Watch that tone doesn't drift as you tire through repetition.",
    ],
  },
  {
    n: 31,
    title: "Full Bow",
    note: "Extended grouped pattern spanning the full two-octave range.",
    guide: [
      "The longest grouped phrase in the set — plan bow distribution well ahead so you don't run out of bow partway through.",
      "Break the phrase into smaller mental chunks (by string or by half-octave) if it feels too long to sustain evenly in one go.",
    ],
  },
  {
    n: 32,
    title: "Full Bow",
    note: "Dotted rhythm full-bow pattern across two octaves.",
    guide: [
      "Dotted rhythms mean uneven note lengths — give the long note its full value and keep the short note crisp.",
      "Practice the rhythm alone (clapping or tapping) before adding the bow and the extra string crossings.",
    ],
  },
  {
    n: 33,
    title: "Short Bow",
    note: "Fast even short strokes across the full two-octave scale.",
    guide: [
      "Fast, even short strokes covering both octaves — this is the longest short-bow passage in the set, a real stamina test.",
      "Keep the bow near the string and the motion small; tension tends to creep in over a longer passage like this.",
    ],
  },
  {
    n: 34,
    title: "Full Bow — accented",
    note: "Marcato accents across the two-octave scale.",
    guide: [
      "Each accented note gets a strong, quick attack at the start of the stroke that then relaxes — check the score for exactly which notes carry the accent, since the pattern varies through this exercise.",
      "Use extra bow speed and a brief pressure release right at the start of the stroke, not throughout.",
      "Keep unaccented notes genuinely unaccented for contrast — over two octaves it's easy to let the accent creep into every note.",
    ],
  },
  {
    n: 35,
    title: "Full Bow",
    note: "Closing pattern across the full two-octave range, relaxed tone.",
    guide: [
      "A relaxed closing pattern — use it to cool down and confirm tone consistency across the whole two-octave range.",
      "Play it as a final check: even tone, even bow distribution, no tension in the arm or wrist from top to bottom.",
    ],
  },
];