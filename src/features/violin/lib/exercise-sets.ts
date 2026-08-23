import type { Exercise } from "../types";
import { EXERCISES } from "./exercises-data";
import { EXERCISES_2OCTAVE } from "./exercises-data-2octave";

export const EXERCISE_SETS: Record<string, Exercise[]> = {
  "one-octave": EXERCISES,
  "two-octave": EXERCISES_2OCTAVE,
};