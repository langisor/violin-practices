import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp, Check, Play, Pause, Minus, Plus } from "lucide-react";

// ---- Types -----------------------------------------------------------

interface Exercise {
  n: number;
  title: string;
  note: string;
  guide: string[];
}

interface Stage {
  id: string;
  label: string;
  range: [number, number];
  blurb: string;
}

interface Rating {
  v: number;
  label: string;
}

type ContactPoint = "near-bridge" | "middle" | "near-fingerboard";

interface LogEntry {
  tempo: string;
  contact: ContactPoint;
  rating: number;
  notes: string;
  updatedAt: string;
}

type PracticeLog = Record<number, LogEntry>;

interface Metronome {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  beat: number;
  toggle: () => void;
}

// ---- Exercise data -----------------------------------------------------

const EXERCISES: Exercise[] = [
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

const STAGES: Stage[] = [
  { id: "foundation", label: "Foundation", range: [1, 6], blurb: "Bow length & speed control" },
  { id: "direction", label: "Direction control", range: [7, 13], blurb: "Alternating vs. single-direction bow" },
  { id: "grouping", label: "Rhythmic grouping", range: [14, 24], blurb: "Short/long combinations within a phrase" },
  { id: "articulation", label: "Articulation", range: [25, 28], blurb: "Staccato and staccato–legato contrast" },
  { id: "integration", label: "Integration", range: [29, 35], blurb: "Full-bow fluency, accents, closing patterns" },
];

const RATINGS: Rating[] = [
  { v: 1, label: "Rough" },
  { v: 2, label: "Getting there" },
  { v: 3, label: "Solid" },
  { v: 4, label: "Clean" },
];

const STORAGE_KEY = "gmajor_bowing_log_v1";

// ---- Small UI atoms -----------------------------------------------------

function BowGlyph({ filled }: { filled: boolean }) {
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" className="shrink-0">
      <path
        d="M2 12 C 8 2, 26 2, 32 12"
        fill="none"
        stroke={filled ? "#C9932B" : "#5B6660"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="2" cy="12" r="1.6" fill={filled ? "#C9932B" : "#5B6660"} />
      <circle cx="32" cy="12" r="1.6" fill={filled ? "#C9932B" : "#5B6660"} />
    </svg>
  );
}

function StageProgress({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 rounded-full bg-[#2B3630] overflow-hidden">
        <div
          className="h-full bg-[#C9932B] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] tabular-nums text-[#8A9A93]">
        {done}/{total}
      </span>
    </div>
  );
}

// ---- Metronome -----------------------------------------------------------

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;
const BEATS_PER_MEASURE = 4;

function useMetronome(): Metronome {
  const [bpm, setBpm] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>(-1);

  const ctxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const currentBeatRef = useRef<number>(0);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bpmRef = useRef<number>(bpm);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  const scheduleClick = useCallback((beatNumber: number, time: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const accent = beatNumber % BEATS_PER_MEASURE === 0;
    osc.frequency.value = accent ? 1500 : 1000;
    gain.gain.setValueAtTime(accent ? 0.35 : 0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.06);

    const delayMs = (time - ctx.currentTime) * 1000;
    setTimeout(() => setBeat(beatNumber % BEATS_PER_MEASURE), Math.max(0, delayMs));
  }, []);

  const schedulerTick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
      scheduleClick(currentBeatRef.current, nextNoteTimeRef.current);
      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current += 1;
    }
    timerIdRef.current = setTimeout(schedulerTick, LOOKAHEAD_MS);
  }, [scheduleClick]);

  const start = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    currentBeatRef.current = 0;
    nextNoteTimeRef.current = ctxRef.current.currentTime + 0.05;
    setIsPlaying(true);
    schedulerTick();
  }, [schedulerTick]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setBeat(-1);
    if (timerIdRef.current) clearTimeout(timerIdRef.current);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) stop();
    else start();
  }, [isPlaying, start, stop]);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      if (ctxRef.current) ctxRef.current.close();
    };
  }, []);

  return { bpm, setBpm, isPlaying, beat, toggle };
}

function MetronomeBar({ metronome }: { metronome: Metronome }) {
  const { bpm, setBpm, isPlaying, beat, toggle } = metronome;

  const clampBpm = (v: number) => Math.min(240, Math.max(30, v));

  return (
    <div className="sticky top-0 z-10 -mx-4 px-4 py-3 mb-5 bg-[#1B2420]/95 backdrop-blur border-b border-[#2B3630]">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isPlaying
              ? "bg-[#C9932B] text-[#1B2420]"
              : "bg-[#232D27] text-[#EDE7D8] border border-[#2B3630]"
          }`}
          aria-label={isPlaying ? "Stop metronome" : "Start metronome"}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setBpm((b) => clampBpm(b - 1))}
            className="w-6 h-6 rounded-md flex items-center justify-center text-[#8A9A93] hover:text-[#EDE7D8] hover:bg-[#232D27]"
            aria-label="Decrease tempo"
          >
            <Minus size={12} />
          </button>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(clampBpm(Number(e.target.value) || 60))}
            className="w-12 bg-transparent text-center font-mono text-[15px] text-[#EDE7D8] tabular-nums focus:outline-none"
          />
          <button
            onClick={() => setBpm((b) => clampBpm(b + 1))}
            className="w-6 h-6 rounded-md flex items-center justify-center text-[#8A9A93] hover:text-[#EDE7D8] hover:bg-[#232D27]"
            aria-label="Increase tempo"
          >
            <Plus size={12} />
          </button>
          <span className="text-[10px] text-[#5B6660] ml-0.5">bpm</span>
        </div>

        <div className="flex gap-1 ml-1">
          {Array.from({ length: BEATS_PER_MEASURE }).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-75 ${
                beat === i
                  ? i === 0
                    ? "bg-[#C9932B]"
                    : "bg-[#EDE7D8]"
                  : "bg-[#2B3630]"
              }`}
            />
          ))}
        </div>

        <input
          type="range"
          min={30}
          max={240}
          value={bpm}
          onChange={(e) => setBpm(clampBpm(Number(e.target.value)))}
          className="flex-1 accent-[#C9932B] h-1"
        />
      </div>
    </div>
  );
}

// ---- Exercise row -----------------------------------------------------

interface ExerciseRowProps {
  ex: Exercise;
  entry: LogEntry | undefined;
  onSave: (n: number, data: LogEntry) => void;
  open: boolean;
  onToggle: () => void;
  metronome: Metronome;
}

function ExerciseRow({ ex, entry, onSave, open, onToggle, metronome }: ExerciseRowProps) {
  const [tempo, setTempo] = useState<string>(entry?.tempo ?? "");
  const [contact, setContact] = useState<ContactPoint>(entry?.contact ?? "middle");
  const [rating, setRating] = useState<number>(entry?.rating ?? 0);
  const [notes, setNotes] = useState<string>(entry?.notes ?? "");
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setTempo(entry?.tempo ?? "");
    setContact(entry?.contact ?? "middle");
    setRating(entry?.rating ?? 0);
    setNotes(entry?.notes ?? "");
  }, [entry, ex.n]);

  const handleSave = () => {
    onSave(ex.n, {
      tempo,
      contact,
      rating,
      notes,
      updatedAt: new Date().toISOString(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  const logged = !!entry;

  return (
    <div className="border-b border-[#2B3630] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 py-3 px-1 text-left group"
      >
        <span
          className={`font-mono text-xs w-7 shrink-0 tabular-nums ${
            logged ? "text-[#C9932B]" : "text-[#5B6660]"
          }`}
        >
          {String(ex.n).padStart(2, "0")}
        </span>
        <BowGlyph filled={logged} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[#EDE7D8] text-[15px] font-medium truncate">
              {ex.title}
            </span>
            {logged && entry && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#8A9A93]">
                <Check size={11} className="text-[#C9932B]" />
                {RATINGS.find((r) => r.v === entry.rating)?.label}
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#8A9A93] truncate">{ex.note}</p>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-[#5B6660] shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-[#5B6660] shrink-0" />
        )}
      </button>

      {open && (
        <div className="pb-4 px-1 pl-10 space-y-3">
          <div className="bg-[#1B2420] border border-[#2B3630] rounded-lg px-3 py-2.5">
            <span className="text-[10px] tracking-[0.12em] uppercase text-[#C9932B] font-mono block mb-1.5">
              Quick guide
            </span>
            <ul className="space-y-1">
              {ex.guide.map((tip, i) => (
                <li
                  key={i}
                  className="text-[12.5px] text-[#C7CEC9] leading-snug flex gap-1.5"
                >
                  <span className="text-[#5B6660] shrink-0">·</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[11px] text-[#8A9A93] block mb-1">
                Tempo (BPM)
              </span>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  inputMode="numeric"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  placeholder="e.g. 60"
                  className="w-full bg-[#1B2420] border border-[#2B3630] rounded-md px-2.5 py-1.5 text-sm text-[#EDE7D8] placeholder:text-[#5B6660] focus:outline-none focus:border-[#C9932B]"
                />
                {tempo && (
                  <button
                    type="button"
                    onClick={() => {
                      metronome.setBpm(
                        Math.min(240, Math.max(30, Number(tempo) || 60))
                      );
                      if (!metronome.isPlaying) metronome.toggle();
                    }}
                    title="Set metronome to this tempo and start"
                    className="shrink-0 px-2 rounded-md border border-[#2B3630] text-[#8A9A93] hover:text-[#C9932B] hover:border-[#C9932B] transition-colors"
                  >
                    <Play size={13} />
                  </button>
                )}
              </div>
            </label>
            <label className="block">
              <span className="text-[11px] text-[#8A9A93] block mb-1">
                Contact point
              </span>
              <select
                value={contact}
                onChange={(e) => setContact(e.target.value as ContactPoint)}
                className="w-full bg-[#1B2420] border border-[#2B3630] rounded-md px-2.5 py-1.5 text-sm text-[#EDE7D8] focus:outline-none focus:border-[#C9932B]"
              >
                <option value="near-bridge">Near bridge</option>
                <option value="middle">Between bridge & fingerboard</option>
                <option value="near-fingerboard">Near fingerboard</option>
              </select>
            </label>
          </div>

          <div>
            <span className="text-[11px] text-[#8A9A93] block mb-1">
              Tone quality
            </span>
            <div className="flex gap-1.5">
              {RATINGS.map((r) => (
                <button
                  key={r.v}
                  onClick={() => setRating(r.v)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    rating === r.v
                      ? "bg-[#C9932B] border-[#C9932B] text-[#1B2420] font-medium"
                      : "border-[#2B3630] text-[#8A9A93] hover:border-[#5B6660]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-[11px] text-[#8A9A93] block mb-1">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="What to fix next time..."
              className="w-full bg-[#1B2420] border border-[#2B3630] rounded-md px-2.5 py-1.5 text-sm text-[#EDE7D8] placeholder:text-[#5B6660] focus:outline-none focus:border-[#C9932B] resize-none"
            />
          </label>

          <button
            onClick={handleSave}
            className="text-[12px] px-3 py-1.5 rounded-md bg-[#C9932B] text-[#1B2420] font-medium hover:bg-[#DBA53E] transition-colors"
          >
            {saved ? "Saved ✓" : "Save entry"}
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Main app -----------------------------------------------------------

export default function ViolinPracticeTracker() {
  const [log, setLog] = useState<PracticeLog>({});
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<string>("foundation");
  const [loading, setLoading] = useState<boolean>(true);
  const metronome = useMetronome();

  useEffect(() => {
    (async () => {
      try {
        const value = localStorage.getItem(STORAGE_KEY);
        if (value) setLog(JSON.parse(value) as PracticeLog);
      } catch {
        // no existing data
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (next: PracticeLog) => {
    setLog(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // best-effort; state already updated locally
    }
  };

  const handleSave = (n: number, data: LogEntry) => {
    persist({ ...log, [n]: data });
  };

  const stageExercises = useMemo(() => {
    const stage = STAGES.find((s) => s.id === activeStage)!;
    return EXERCISES.filter(
      (e) => e.n >= stage.range[0] && e.n <= stage.range[1]
    );
  }, [activeStage]);

  const totalDone = Object.keys(log).length;
  const currentStage = STAGES.find((s) => s.id === activeStage)!;

  return (
    <div className="min-h-screen bg-[#1B2420] font-sans">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#C9932B] font-mono mb-1">
            G Major · One Octave (low)
          </p>
          <h1
            className="text-[28px] leading-tight text-[#EDE7D8]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Bowing Study Log
          </h1>
          <p className="text-[13px] text-[#8A9A93] mt-1.5">
            35 bow-control exercises on a single scale · after M. Kravchuk
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-[#2B3630] pt-4">
            <span className="text-[12px] text-[#8A9A93]">Overall progress</span>
            <StageProgress done={totalDone} total={EXERCISES.length} />
          </div>
        </div>

        <MetronomeBar metronome={metronome} />

        {/* Stage tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-1 -mx-1 px-1 scrollbar-none">
          {STAGES.map((s) => {
            const doneInStage = EXERCISES.filter(
              (e) => e.n >= s.range[0] && e.n <= s.range[1] && log[e.n]
            ).length;
            const totalInStage = s.range[1] - s.range[0] + 1;
            const active = activeStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStage(s.id);
                  setOpenId(null);
                }}
                className={`shrink-0 text-left px-3 py-2 rounded-lg border transition-colors ${
                  active
                    ? "border-[#C9932B] bg-[#232D27]"
                    : "border-[#2B3630] hover:border-[#5B6660]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[12px] font-medium ${
                      active ? "text-[#EDE7D8]" : "text-[#8A9A93]"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-[#5B6660] font-mono tabular-nums">
                    {doneInStage}/{totalInStage}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-[#5B6660] mb-4 px-1">
          {currentStage.blurb} · No. {currentStage.range[0]}–{currentStage.range[1]}
        </p>

        {/* Exercise list */}
        <div className="bg-[#20281F]/40 border border-[#2B3630] rounded-xl px-3">
          {loading ? (
            <p className="text-center text-[#5B6660] text-sm py-8">
              Loading log…
            </p>
          ) : (
            stageExercises.map((ex) => (
              <ExerciseRow
                key={ex.n}
                ex={ex}
                entry={log[ex.n]}
                open={openId === ex.n}
                onToggle={() => setOpenId(openId === ex.n ? null : ex.n)}
                onSave={handleSave}
                metronome={metronome}
              />
            ))
          )}
        </div>

        <p className="text-[11px] text-[#5B6660] text-center mt-6">
          Your log is saved on this device and updates as you practice.
        </p>
      </div>
    </div>
  );
}