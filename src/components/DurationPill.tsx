"use client";

import type { DurationMinutes } from "@/lib/types";

interface DurationPillProps {
  durationMinutes: DurationMinutes;
  isSelected: boolean;
  onSelect: () => void;
}

export function DurationPill({
  durationMinutes,
  isSelected,
  onSelect,
}: DurationPillProps) {
  return (
    <button
      onClick={onSelect}
      className="px-4 py-2 text-sm font-semibold transition-colors min-h-[44px]"
      style={{
        borderRadius: "var(--radius-pill)",
        backgroundColor: isSelected
          ? "var(--color-primary)"
          : "var(--color-surface)",
        color: isSelected ? "#ffffff" : "var(--color-text-primary)",
        border: isSelected
          ? "2px solid var(--color-primary)"
          : "2px solid #e5e7eb",
        boxShadow: isSelected ? "none" : "var(--shadow-card)",
      }}
      aria-pressed={isSelected}
    >
      {durationMinutes} min
    </button>
  );
}
