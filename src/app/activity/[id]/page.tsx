"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { use } from "react";
import { TimerRing } from "@/components/TimerRing";
import { getActivityById } from "@/data/activities";
import { computeUpdatedStreak } from "@/lib/streak";
import { calculatePointsEarned } from "@/lib/points";
import { progressAtom, lastEarnedPointsAtom } from "@/state/progressStore";
import { useProgress } from "@/state/useProgress";

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function ActivityPage({ params }: PageParams) {
  const { id } = use(params);
  const router = useRouter();
  const activity = getActivityById(id);
  const totalSeconds = (activity?.durationMinutes ?? 2) * 60;

  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress] = useProgress();
  const [, setProgress] = useAtom(progressAtom);
  const [, setLastEarnedPoints] = useAtom(lastEarnedPointsAtom);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (secondsRemaining === 0 && activity) {
      const updated = computeUpdatedStreak(
        progress.lastCompletedDate,
        new Date(),
        progress.currentStreakDays
      );
      const earned = calculatePointsEarned(activity, updated.currentStreakDays);
      setLastEarnedPoints(earned.totalEarned);
      setProgress((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + earned.totalEarned,
        currentStreakDays: updated.currentStreakDays,
        lastCompletedDate: updated.lastCompletedDate,
        completedActivityIds: [...prev.completedActivityIds, activity.id],
      }));
      router.push("/complete");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining]);

  if (!activity) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center px-4">
        <p style={{ color: "var(--color-text-secondary)" }}>
          Activiteit niet gevonden.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-3 rounded-full font-semibold"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#ffffff",
          }}
        >
          Terug naar huis
        </button>
      </main>
    );
  }

  function handleStop() {
    setIsRunning(false);
    router.push("/");
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-6 gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-6xl" role="img" aria-label={activity.title}>
          {activity.emoji}
        </span>
        <h1
          className="text-2xl font-black"
          style={{ color: "var(--color-text-primary)" }}
        >
          {activity.title}
        </h1>
        <p
          className="text-base max-w-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {activity.description}
        </p>
      </div>

      <TimerRing
        totalSeconds={totalSeconds}
        secondsRemaining={secondsRemaining}
      />

      <button
        onClick={handleStop}
        className="px-8 py-3 text-sm font-semibold rounded-full min-h-[48px]"
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-secondary)",
          border: "2px solid #e5e7eb",
          boxShadow: "var(--shadow-card)",
        }}
      >
        Stop
      </button>
    </main>
  );
}
