import { useState, useEffect, useMemo } from "react";
import type { PracticeLog, LogEntry } from "../types";
import { EXERCISE_SETS } from "../lib/exercise-sets";
import { STAGES, STORAGE_KEY } from "../lib/stages-data";
import { SCALES, logKey } from "../lib/scales-data";
import { useMetronome } from "../hooks/use-metronome";
import { useSessionTimer } from "../hooks/use-session-timer";
import { StageProgress } from "../components/stage-progress";
import { MetronomeBar } from "./metronome-bar";
import { ExerciseRow } from "./exercise-row";

export default function ViolinPracticeTracker() {
  const [log, setLog] = useState<PracticeLog>({});
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeScale, setActiveScale] = useState<string>(SCALES[0].id);
  const [activeStage, setActiveStage] = useState<string>("foundation");
  const [loading, setLoading] = useState<boolean>(true);
  const metronome = useMetronome();
  const sessionTimer = useSessionTimer();

  useEffect(() => {
    (async () => {
      try {
        const value = window.localStorage.getItem(STORAGE_KEY);
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
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // best-effort; state already updated locally
    }
  };

  const handleSave = (n: number, data: LogEntry) => {
    persist({ ...log, [logKey(activeScale, n)]: data });
  };

  const currentScale = SCALES.find((s) => s.id === activeScale)!;
  const activeExercises = EXERCISE_SETS[currentScale.exerciseSetId];

  const stageExercises = useMemo(() => {
    const stage = STAGES.find((s) => s.id === activeStage)!;
    return activeExercises.filter(
      (e) => e.n >= stage.range[0] && e.n <= stage.range[1]
    );
  }, [activeStage, activeExercises]);

  const doneInScale = useMemo(
    () => activeExercises.filter((e) => log[logKey(activeScale, e.n)]).length,
    [log, activeScale, activeExercises]
  );

  const currentStage = STAGES.find((s) => s.id === activeStage)!;

  return (
    <div className="min-h-screen bg-[#1B2420] font-sans">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#C9932B] font-mono mb-1">
            {currentScale.label} · {currentScale.description}
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

          {/* Scale selector */}
          <div className="flex gap-1.5 mt-4 flex-wrap">
            {SCALES.map((s) => {
              const active = activeScale === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveScale(s.id);
                    setActiveStage("foundation");
                    setOpenId(null);
                  }}
                  className={`flex-1 min-w-[70px] text-center py-1.5 rounded-md text-[12px] font-medium border transition-colors ${
                    active
                      ? "border-[#C9932B] bg-[#232D27] text-[#EDE7D8]"
                      : "border-[#2B3630] text-[#8A9A93] hover:border-[#5B6660]"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#2B3630] pt-4">
            <span className="text-[12px] text-[#8A9A93]">
              {currentScale.label} progress
            </span>
            <StageProgress done={doneInScale} total={activeExercises.length} />
          </div>
        </div>

        <MetronomeBar metronome={metronome} timer={sessionTimer} />

        {/* Stage tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-1 -mx-1 px-1 scrollbar-none">
          {STAGES.map((s) => {
            const doneInStage = activeExercises.filter(
              (e) =>
                e.n >= s.range[0] &&
                e.n <= s.range[1] &&
                log[logKey(activeScale, e.n)]
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
                key={`${activeScale}-${ex.n}`}
                ex={ex}
                entry={log[logKey(activeScale, ex.n)]}
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