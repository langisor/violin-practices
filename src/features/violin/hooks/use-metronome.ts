import { useState, useEffect, useRef, useCallback } from "react";
import type { Metronome } from "../types";

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;
export const BEATS_PER_MEASURE = 4;

export function useMetronome(): Metronome {
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