import { atom } from "jotai";
import type { ProgressState } from "@/lib/types";

export const progressAtom = atom<ProgressState>({
  totalPoints: 0,
  currentStreakDays: 0,
  lastCompletedDate: null,
  completedActivityIds: [],
});

export const selectedActivityIdAtom = atom<string | null>(null);

export const lastEarnedPointsAtom = atom<number>(0);
