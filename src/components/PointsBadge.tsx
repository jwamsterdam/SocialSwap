"use client";

interface PointsBadgeProps {
  totalPoints: number;
  streakDays: number;
}

export function PointsBadge({ totalPoints, streakDays }: PointsBadgeProps) {
  return (
    <div className="flex gap-3 items-center">
      <span
        className="text-sm font-semibold px-3 py-1 rounded-full"
        style={{
          backgroundColor: "var(--color-primary-light)",
          color: "var(--color-primary)",
        }}
      >
        ⚡ {totalPoints} pts
      </span>
      {streakDays > 0 && (
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: "#fee2e2",
            color: "var(--color-streak)",
          }}
        >
          🔥 {streakDays} {streakDays === 1 ? "dag" : "dagen"}
        </span>
      )}
    </div>
  );
}
