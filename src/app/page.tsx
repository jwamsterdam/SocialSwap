"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { ActivityCard } from "@/components/ActivityCard";
import { DurationPill } from "@/components/DurationPill";
import { PointsBadge } from "@/components/PointsBadge";
import { activities } from "@/data/activities";
import { selectedActivityIdAtom } from "@/state/progressStore";
import { useProgress } from "@/state/useProgress";
import type { DurationMinutes } from "@/lib/types";

const DURATIONS: DurationMinutes[] = [2, 5, 10];

export default function HomePage() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<DurationMinutes>(2);
  const [, setSelectedActivityId] = useAtom(selectedActivityIdAtom);
  const [progress] = useProgress();

  const filteredActivities = activities.filter(
    (a) => a.durationMinutes === selectedDuration
  );

  function handleSelectActivity(activityId: string) {
    setSelectedActivityId(activityId);
    router.push(`/activity/${activityId}`);
  }

  return (
    <main className="flex flex-col min-h-screen px-4 pt-safe">
      <div
        className="pt-6 pb-4 sticky top-0 z-10"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className="text-2xl font-black"
            style={{ color: "var(--color-primary)" }}
          >
            SocialSwap
          </h1>
          <PointsBadge
            totalPoints={progress.totalPoints}
            streakDays={progress.currentStreakDays}
          />
        </div>
        <p
          className="text-base font-medium mb-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Wat ga je doen ipv scrollen?
        </p>
        <div className="flex gap-2">
          {DURATIONS.map((duration) => (
            <DurationPill
              key={duration}
              durationMinutes={duration}
              isSelected={selectedDuration === duration}
              onSelect={() => setSelectedDuration(duration)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-8">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onSelect={() => handleSelectActivity(activity.id)}
          />
        ))}
      </div>
    </main>
  );
}
