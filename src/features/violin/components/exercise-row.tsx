import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check, Play } from "lucide-react";
import type { Exercise, LogEntry, ContactPoint, Metronome } from "../types";
import { RATINGS } from "../lib/stages-data";
import { BowGlyph } from "./bow-glyph";

interface ExerciseRowProps {
  ex: Exercise;
  entry: LogEntry | undefined;
  onSave: (n: number, data: LogEntry) => void;
  open: boolean;
  onToggle: () => void;
  metronome: Metronome;
}

export function ExerciseRow({ ex, entry, onSave, open, onToggle, metronome }: ExerciseRowProps) {
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