"use client";

import { motion } from "framer-motion";

interface TimerRingProps {
  totalSeconds: number;
  secondsRemaining: number;
}

const RADIUS = 80;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE_WIDTH) * 2;

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function TimerRing({ totalSeconds, secondsRemaining }: TimerRingProps) {
  const progress = totalSeconds > 0 ? secondsRemaining / totalSeconds : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex items-center justify-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Resterende tijd: ${formatTime(secondsRemaining)}`}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-primary-light)"
          strokeWidth={STROKE_WIDTH}
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
        <text
          x={SIZE / 2}
          y={SIZE / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="28"
          fontWeight="700"
          fill="var(--color-text-primary)"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {formatTime(secondsRemaining)}
        </text>
      </svg>
    </div>
  );
}
