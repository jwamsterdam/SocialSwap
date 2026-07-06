export function computeUpdatedStreak(
  lastCompletedDate: string | null,
  now: Date,
  currentStreakDays: number = 0
): { currentStreakDays: number; lastCompletedDate: string } {
  const todayStr = now.toISOString().slice(0, 10);

  if (lastCompletedDate === todayStr) {
    return {
      currentStreakDays: Math.max(currentStreakDays, 1),
      lastCompletedDate: todayStr,
    };
  }

  if (lastCompletedDate !== null) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (lastCompletedDate === yesterdayStr) {
      return {
        currentStreakDays: currentStreakDays + 1,
        lastCompletedDate: todayStr,
      };
    }
  }

  return { currentStreakDays: 1, lastCompletedDate: todayStr };
}
