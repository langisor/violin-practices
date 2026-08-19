import type { Exercise } from "../types";

export const EXERCISES: Exercise[] = [
  {
    n: 1,
    title: "Long Bow",
    note: "One full slow bow per half note, all down-bow direction.",
    guide: [
      "Draw the entire bow (frog to tip) over each half note — think slow and full, not fast.",
      "Keep speed, pressure, and contact point identical from start to finish of the stroke.",
      "Lift and reset to the frog between notes rather than alternating direction.",
    ],
  },
  {
    n: 2,
    title: "Half Bow",
    note: "Same scale, half-length bow strokes.",
    guide: [
      "Use only half the bow's length per note — pick one zone (e.g. lower half) and stay there.",
      "A shorter stroke needs slightly more focused arm control to avoid sounding rushed or thin.",
      "Keep the same tone quality you'd use on a full bow, just over less distance.",
    ],
  },
  {
    n: 3,
    title: "Long–Half, Half",
    note: "One long stroke followed by two half strokes.",
    guide: [
      "Pattern: down (long, full bow) → up (half) → down (half), then repeat.",
      "The long stroke must move faster to cover full bow length in the same time value as a half stroke.",
      "Plan bow placement ahead — know where you'll be on the bow before you start each note.",
    ],
  },
  {
    n: 4,
    title: "Half, Half–Long",
    note: "Two half strokes followed by one long stroke.",
    guide: [
      "Pattern: down (half) → up (half) → down (long, full bow), then repeat.",
      "Mirror of No. 3 — practice both so you're comfortable stretching the bow speed either direction.",
      "Keep the two half strokes matched in tone before the long stroke arrives.",
    ],
  },
  {
    n: 5,
    title: "Half Bow",
    note: "Mixed rhythm, short-bow discipline.",
    guide: [
      "Rhythm varies note to note, so your bow-length budget changes with it — check note values before playing.",
      "Stay in the same general bow zone throughout unless the rhythm forces a shift.",
      "Prioritize clean string crossings over speed.",
    ],
  },
  {
    n: 6,
    title: "Slow, Long Bow",
    note: "Whole notes — one bow per measure, ultimate tone drill.",
    guide: [
      "One continuous bow per whole note — the slowest, most demanding tone-control exercise in the set.",
      "Watch for a natural urge to speed up near the tip, where the bow feels lighter — resist it.",
      "Keep pressure and contact point constant; use your ear to catch any thinning or scratchiness.",
    ],
  },
  {
    n: 7,
    title: "Full Bow",
    note: "Alternating down/up, quarter notes, full bow length.",
    guide: [
      "Alternate down-up-down-up, using the entire bow on every quarter note.",
      "Bow speed increases noticeably compared to No. 1 — the same distance now happens faster.",
      "Match the tone of your up-bow to your down-bow; up-bows tend to sound thinner if you're not careful.",
    ],
  },
  {
    n: 8,
    title: "Full Bow",
    note: "Consecutive same-direction strokes — clean retakes.",
    guide: [
      "Several strokes in a row go the same direction, so you lift and reset the bow between them.",
      "The retake itself should be silent — no bump, scratch, or accent when the bow lands back on the string.",
      "Practice the retake motion slowly in the air before adding it back to the string.",
    ],
  },
  {
    n: 9,
    title: "Full Bow — down only",
    note: "All down-bow, reset to frog between notes.",
    guide: [
      "Every note is a full-bow down-bow — draw frog to tip, lift, reset at the frog, repeat.",
      "Isolating down-bow retakes builds control you'll need constantly in real playing.",
      "Keep the retake fast and quiet so it doesn't interrupt the rhythmic pulse.",
    ],
  },
  {
    n: 10,
    title: "Full Bow — up only",
    note: "All up-bow, reset to tip between notes.",
    guide: [
      "Every note is a full-bow up-bow — draw tip to frog, lift, reset at the tip, repeat.",
      "Up-bow retakes are usually the harder of the pair since there's less natural arm weight — go slowly.",
      "Aim for the same tone strength as the down-bow-only version in No. 9.",
    ],
  },
  {
    n: 11,
    title: "Full Bow — up only",
    note: "Up-bow with phrase grouping.",
    guide: [
      "Same up-bow-only isolation as No. 10, but now grouped into phrases (marked by the commas).",
      "Within a phrase, plan your retakes so they don't disturb the musical line.",
      "Breathe or pause naturally at the phrase break, not mid-phrase.",
    ],
  },
  {
    n: 12,
    title: "Full Bow — down only",
    note: "Down-bow with phrase grouping.",
    guide: [
      "Down-bow counterpart to No. 11 — same phrase-grouping challenge, down-bow only.",
      "Focus on keeping tone identical across every retake in the phrase, not just the first one.",
    ],
  },
  {
    n: 13,
    title: "Full Bow — down only",
    note: "Extended down-bow stamina passage.",
    guide: [
      "A longer down-bow-only passage — this is a consistency test after isolating the skill in 9 and 12.",
      "Check: does your 10th retake sound as clean as your 1st? If not, slow the tempo and rebuild evenness.",
    ],
  },
  {
    n: 14,
    title: "Short Bow",
    note: "Fast even eighth notes, short strokes.",
    guide: [
      "Fast, even eighth notes using a small portion of the bow — control comes from the wrist and fingers, not the whole arm.",
      "Keep the bow close to the string between strokes rather than lifting.",
      "Even spacing matters more than speed — a metronome is very useful here.",
    ],
  },
  {
    n: 15,
    title: "Short×4 – Long",
    note: "Four short strokes into one long stroke.",
    guide: [
      "Four quick short strokes lead into one sustained long stroke — down-up-down-up, then a slower resolving stroke.",
      "Don't let the short strokes rush ahead of tempo; they should feel light, not frantic.",
      "The long stroke should feel like a release after the busier short strokes.",
    ],
  },
  {
    n: 16,
    title: "Short, Short – Half",
    note: "Paired short strokes resolving to a half stroke.",
    guide: [
      "Two short strokes, then a half-length stroke — practice the transition between the two bow speeds smoothly.",
      "Keep the short strokes paired rhythmically even (not one longer than the other).",
    ],
  },
  {
    n: 17,
    title: "Half – Short, Short",
    note: "Half stroke followed by paired short strokes.",
    guide: [
      "Reverse of No. 16 — a half stroke first, then two matched short strokes.",
      "The half stroke sets your bow position for the string; don't let the short strokes drift off the intended contact point.",
    ],
  },
  {
    n: 18,
    title: "Short, Short – Half",
    note: "Variant grouping of the same pattern.",
    guide: [
      "Same core pattern as No. 16, with a different phrase grouping in the notation — read the slur/comma marks carefully.",
      "Use this as a check that the pattern is secure regardless of how it's grouped.",
    ],
  },
  {
    n: 19,
    title: "Short×4 – Long",
    note: "Repeats pattern of No. 15 with new bowing marks.",
    guide: [
      "Same short×4-into-long idea as No. 15, now starting up-bow — check the bow marks before you start.",
      "Keep the short strokes light and close to the string.",
    ],
  },
  {
    n: 20,
    title: "Long – Short×4",
    note: "Long stroke opens, then four short strokes.",
    guide: [
      "Now the long stroke comes first, followed by four short strokes — the reverse order from No. 15/19.",
      "Resist rushing into the short strokes right after the long one; keep the pulse steady across the transition.",
    ],
  },
  {
    n: 21,
    title: "Long – Short, Short – Long",
    note: "Symmetrical long/short/long grouping.",
    guide: [
      "Long, then two short, then long again — a symmetrical shape that tests both bow-speed extremes in one phrase.",
      "Think of the pattern as slow-fast-fast-slow, keeping tone consistent through every speed change.",
    ],
  },
  {
    n: 22,
    title: "Long – Short, Short – Long",
    note: "Continues symmetrical grouping.",
    guide: [
      "Same long-short-short-long shape as No. 21, reinforcing the pattern with new bow markings.",
      "Use this repetition to make the speed changes feel automatic rather than planned.",
    ],
  },
  {
    n: 23,
    title: "Full Bow",
    note: "Alternating full bow across the octave.",
    guide: [
      "Steady alternating down-up full-bow strokes across the whole octave scale.",
      "By this point your down/up tone should already sound matched — use this as a fluency check.",
    ],
  },
  {
    n: 24,
    title: "Short×4 – Long",
    note: "Fast group into sustained note.",
    guide: [
      "Combines the short-group and long-stroke skills from earlier exercises into one flowing phrase.",
      "Keep the short notes even and the long note fully sustained — no fading at the end.",
    ],
  },
  {
    n: 25,
    title: "Full Bow Staccato",
    note: "Detached, articulated strokes, same direction groups.",
    guide: [
      "Staccato dots mean each note is stopped cleanly on the string before the next one starts — not bounced off the string.",
      "Use a small, controlled pinch of pressure and a brief stop between notes within the same bow direction.",
      "Keep the stops even; the goal is crisp articulation, not accents.",
    ],
  },
  {
    n: 26,
    title: "Full Bow Staccato – Legato",
    note: "Alternates staccato groups with smooth legato.",
    guide: [
      "Alternates between detached staccato notes and smoothly connected legato notes in the same phrase.",
      "Exaggerate the contrast at first — make staccato very crisp and legato very smooth — then even it out.",
    ],
  },
  {
    n: 27,
    title: "Full Bow Staccato",
    note: "Up-bow staccato groups.",
    guide: [
      "Same staccato articulation as No. 25, now grouped on up-bow strokes.",
      "Up-bow staccato is typically harder to control — go slower here than you would on down-bow staccato.",
    ],
  },
  {
    n: 28,
    title: "Full Bow Staccato – Legato",
    note: "Up-bow staccato into legato phrasing.",
    guide: [
      "Combines up-bow staccato control from No. 27 with the staccato-to-legato contrast from No. 26.",
      "Focus on a clean transition point where staccato ends and legato begins.",
    ],
  },
  {
    n: 29,
    title: "Full Bow",
    note: "Steady alternating full-bow scale.",
    guide: [
      "A straightforward alternating full-bow scale — use it as a relaxed check-in after the staccato work.",
      "Let the arm feel loose again after the more controlled staccato strokes.",
    ],
  },
  {
    n: 30,
    title: "Full Bow",
    note: "Continues full-bow alternation.",
    guide: [
      "Continues the alternating full-bow pattern — treat this as a fluency and stamina check.",
      "Watch that tone doesn't drift as you tire through repetition.",
    ],
  },
  {
    n: 31,
    title: "Full Bow",
    note: "Extended grouped pattern, longer phrase.",
    guide: [
      "A longer phrase with grouped bowing — plan bow distribution ahead so you don't run out of bow mid-phrase.",
      "Break the phrase into smaller chunks mentally if it feels long to sustain evenly.",
    ],
  },
  {
    n: 32,
    title: "Full Bow",
    note: "Dotted rhythm full-bow pattern.",
    guide: [
      "Dotted rhythms mean uneven note lengths — give the long note its full value and keep the short note crisp.",
      "Practice the rhythm alone (clapping or tapping) before adding the bow if the dotted feel is unclear.",
    ],
  },
  {
    n: 33,
    title: "Short Bow",
    note: "Fast even short strokes, both directions.",
    guide: [
      "Fast, even short strokes alternating direction — similar to No. 14 but now covering both bow directions equally.",
      "Keep the bow near the string and let the motion stay small and controlled, not tense.",
    ],
  },
  {
    n: 34,
    title: "Full Bow — accented",
    note: "Marcato accents on each down-bow.",
    guide: [
      "Each down-bow gets a marcato accent — a strong, quick attack at the start of the stroke that then relaxes.",
      "Use extra bow speed and a brief pressure release right at the start of the stroke, not throughout.",
      "Keep the up-bows even and unaccented for contrast.",
    ],
  },
  {
    n: 35,
    title: "Full Bow",
    note: "Closing scale pattern, relaxed tone.",
    guide: [
      "A relaxed closing pattern — use it to cool down and confirm tone consistency across the whole octave.",
      "Play it as a final check: even tone, even bow distribution, no tension in the arm or wrist.",
    ],
  },
];