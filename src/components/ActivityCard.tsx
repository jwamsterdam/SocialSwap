"use client";

import type { ActivityDefinition } from "@/lib/types";

interface ActivityCardProps {
  activity: ActivityDefinition;
  onSelect: () => void;
}

export function ActivityCard({ activity, onSelect }: ActivityCardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left flex items-center gap-4 p-4 transition-transform active:scale-[0.98]"
      style={{
        minHeight: "60px",
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid #f3f4f6",
      }}
    >
      <span className="text-3xl" role="img" aria-label={activity.title}>
        {activity.emoji}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-base leading-snug"
          style={{ color: "var(--color-text-primary)" }}
        >
          {activity.title}
        </p>
        <p
          className="text-sm mt-0.5 leading-snug line-clamp-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {activity.description}
        </p>
      </div>
      <span
        className="shrink-0 text-xs font-bold px-2 py-1 rounded-full"
        style={{
          backgroundColor: "var(--color-primary-light)",
          color: "var(--color-primary)",
        }}
      >
        +{activity.pointValue}
      </span>
    </button>
  );
}
