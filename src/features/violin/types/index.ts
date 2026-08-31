import type { Dispatch, SetStateAction } from "react";

export interface Scale {
  id: string;
  label: string;
  description: string;
  exerciseSetId: string;
  notes: string;
}

export interface Exercise {
  n: number;
  title: string;
  note: string;
  guide: string[];
}

export interface Stage {
  id: string;
  label: string;
  range: [number, number];
  blurb: string;
}

export interface Rating {
  v: number;
  label: string;
}

export type ContactPoint = "near-bridge" | "middle" | "near-fingerboard";

export interface LogEntry {
  tempo: string;
  contact: ContactPoint;
  rating: number;
  notes: string;
  updatedAt: string;
}

// Keyed by a composite "scaleId:exerciseNumber" string so the same
// exercise set can be logged independently per scale.
export type PracticeLog = Record<string, LogEntry>;

export interface Metronome {
  bpm: number;
  setBpm: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  beat: number;
  toggle: () => void;
}

export interface SessionTimer {
  elapsedMs: number;
  isRunning: boolean;
  toggle: () => void;
  reset: () => void;
}