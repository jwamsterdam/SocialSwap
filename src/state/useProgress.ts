"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { progressAtom } from "./progressStore";
import type { ProgressState } from "@/lib/types";

const STORAGE_KEY = "socialswap_progress";

export function useProgress(): [
  ProgressState,
  (partial: Partial<ProgressState>) => void,
] {
  const [progress, setProgress] = useAtom(progressAtom);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setProgress((prev) => ({ ...prev, ...(parsed as Partial<ProgressState>) }));
        }
      }
    } catch {
      // localStorage unavailable or corrupt — start fresh
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // localStorage unavailable — silently skip
    }
  }, [progress]);

  function updateProgress(partial: Partial<ProgressState>) {
    setProgress((prev) => ({ ...prev, ...partial }));
  }

  return [progress, updateProgress];
}
