import { describe, it, expect } from "vitest";
import { calculatePointsEarned } from "../points";
import type { ActivityDefinition } from "../types";

const activity2min: ActivityDefinition = {
  id: "test-2",
  title: "Test",
  description: "Test activity",
  emoji: "🧪",
  durationMinutes: 2,
  category: "movement",
  pointValue: 10,
};

const activity5min: ActivityDefinition = {
  id: "test-5",
  title: "Test 5",
  description: "Test activity 5 min",
  emoji: "🧪",
  durationMinutes: 5,
  category: "breath",
  pointValue: 25,
};

const activity10min: ActivityDefinition = {
  id: "test-10",
  title: "Test 10",
  description: "Test activity 10 min",
  emoji: "🧪",
  durationMinutes: 10,
  category: "creative",
  pointValue: 50,
};

describe("calculatePointsEarned", () => {
  describe("1.0x multiplier (streak 1-2 days)", () => {
    it("applies 1.0x for streak day 1", () => {
      const result = calculatePointsEarned(activity2min, 1);
      expect(result.streakMultiplier).toBe(1.0);
      expect(result.basePoints).toBe(10);
      expect(result.totalEarned).toBe(10);
    });

    it("applies 1.0x for streak day 2", () => {
      const result = calculatePointsEarned(activity5min, 2);
      expect(result.streakMultiplier).toBe(1.0);
      expect(result.totalEarned).toBe(25);
    });
  });

  describe("1.25x multiplier (streak 3-6 days)", () => {
    it("applies 1.25x for streak day 3", () => {
      const result = calculatePointsEarned(activity2min, 3);
      expect(result.streakMultiplier).toBe(1.25);
      expect(result.totalEarned).toBe(13);
    });

    it("applies 1.25x for streak day 6", () => {
      const result = calculatePointsEarned(activity10min, 6);
      expect(result.streakMultiplier).toBe(1.25);
      expect(result.totalEarned).toBe(63);
    });
  });

  describe("1.5x multiplier (streak 7+ days)", () => {
    it("applies 1.5x for streak day 7", () => {
      const result = calculatePointsEarned(activity10min, 7);
      expect(result.streakMultiplier).toBe(1.5);
      expect(result.totalEarned).toBe(75);
    });

    it("applies 1.5x for streak day 30", () => {
      const result = calculatePointsEarned(activity5min, 30);
      expect(result.streakMultiplier).toBe(1.5);
      expect(result.totalEarned).toBe(38);
    });
  });

  it("returns correct basePoints regardless of streak", () => {
    const result = calculatePointsEarned(activity10min, 1);
    expect(result.basePoints).toBe(50);
  });
});
