import type { ActivityDefinition, PointsEarnedResult } from "./types";

export function calculatePointsEarned(
  activity: ActivityDefinition,
  streakDays: number
): PointsEarnedResult {
  const basePoints = activity.pointValue;

  let streakMultiplier: number;
  if (streakDays >= 7) {
    streakMultiplier = 1.5;
  } else if (streakDays >= 3) {
    streakMultiplier = 1.25;
  } else {
    streakMultiplier = 1.0;
  }

  const totalEarned = Math.round(basePoints * streakMultiplier);

  return { basePoints, streakMultiplier, totalEarned };
}
