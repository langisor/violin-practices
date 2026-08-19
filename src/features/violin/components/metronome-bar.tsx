import { Play, Pause, Minus, Plus, RotateCcw, Timer } from "lucide-react";
import type { Metronome, SessionTimer } from "../types";
import { BEATS_PER_MEASURE } from "../hooks/use-metronome";
import { formatElapsed } from "../hooks/use-session-timer";

export function MetronomeBar({
  metronome,
  timer,
}: {
  metronome: Metronome;
  timer: SessionTimer;
}) {
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

      <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-[#2B3630]/70">
        <Timer size={13} className="text-[#5B6660] shrink-0" />
        <span className="font-mono text-[13px] text-[#EDE7D8] tabular-nums">
          {formatElapsed(timer.elapsedMs)}
        </span>
        <span className="text-[10px] text-[#5B6660]">session</span>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={timer.toggle}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
              timer.isRunning
                ? "bg-[#C9932B] text-[#1B2420]"
                : "bg-[#232D27] text-[#EDE7D8] border border-[#2B3630]"
            }`}
            aria-label={timer.isRunning ? "Pause session timer" : "Start session timer"}
          >
            {timer.isRunning ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
            {timer.isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={timer.reset}
            className="w-6 h-6 rounded-md flex items-center justify-center text-[#8A9A93] hover:text-[#EDE7D8] hover:bg-[#232D27]"
            aria-label="Reset session timer"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}