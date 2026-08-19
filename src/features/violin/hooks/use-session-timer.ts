import { useState, useEffect, useRef, useCallback } from "react";
import type { SessionTimer } from "../types";

export function useSessionTimer(): SessionTimer {
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startedAtRef = useRef<number>(0);
  const baseElapsedRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setElapsedMs(baseElapsedRef.current + (Date.now() - startedAtRef.current));
  }, []);

  const toggle = useCallback(() => {
    setIsRunning((running) => {
      if (running) {
        baseElapsedRef.current += Date.now() - startedAtRef.current;
        if (intervalRef.current) clearInterval(intervalRef.current);
        return false;
      }
      startedAtRef.current = Date.now();
      intervalRef.current = setInterval(tick, 250);
      return true;
    });
  }, [tick]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    baseElapsedRef.current = 0;
    startedAtRef.current = Date.now();
    setElapsedMs(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { elapsedMs, isRunning, toggle, reset };
}

export function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}