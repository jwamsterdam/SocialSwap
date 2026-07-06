export type DurationMinutes = 2 | 5 | 10;

export interface ActivityDefinition {
  id: string;
  title: string;
  description: string;
  emoji: string;
  durationMinutes: DurationMinutes;
  category: "movement" | "breath" | "creative" | "social" | "sensory";
  pointValue: number;
}

export interface ProgressState {
  totalPoints: number;
  currentStreakDays: number;
  lastCompletedDate: string | null;
  completedActivityIds: string[];
}

export interface PointsEarnedResult {
  basePoints: number;
  streakMultiplier: number;
  totalEarned: number;
}
