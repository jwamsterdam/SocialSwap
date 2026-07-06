import { describe, it, expect } from "vitest";
import { computeUpdatedStreak } from "../streak";

describe("computeUpdatedStreak", () => {
  const today = new Date("2026-07-06T10:00:00Z");
  const todayStr = "2026-07-06";
  const yesterdayStr = "2026-07-05";
  const twoDaysAgoStr = "2026-07-04";

  it("starts a new streak of 1 when no previous completion", () => {
    const result = computeUpdatedStreak(null, today, 0);
    expect(result.currentStreakDays).toBe(1);
    expect(result.lastCompletedDate).toBe(todayStr);
  });

  it("increments streak to 2 when last completed yesterday", () => {
    const result = computeUpdatedStreak(yesterdayStr, today, 1);
    expect(result.currentStreakDays).toBe(2);
    expect(result.lastCompletedDate).toBe(todayStr);
  });

  it("increments from a multi-day streak when last completed yesterday", () => {
    const result = computeUpdatedStreak(yesterdayStr, today, 5);
    expect(result.currentStreakDays).toBe(6);
    expect(result.lastCompletedDate).toBe(todayStr);
  });

  it("resets streak to 1 when last completed two days ago", () => {
    const result = computeUpdatedStreak(twoDaysAgoStr, today, 4);
    expect(result.currentStreakDays).toBe(1);
    expect(result.lastCompletedDate).toBe(todayStr);
  });

  it("keeps streak unchanged when last completed today already", () => {
    const result = computeUpdatedStreak(todayStr, today, 3);
    expect(result.currentStreakDays).toBe(3);
    expect(result.lastCompletedDate).toBe(todayStr);
  });

  it("returns at least 1 when last completed today with streak 0", () => {
    const result = computeUpdatedStreak(todayStr, today, 0);
    expect(result.currentStreakDays).toBe(1);
  });
});
