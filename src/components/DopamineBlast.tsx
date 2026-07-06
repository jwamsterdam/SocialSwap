"use client";

import { motion, useReducedMotion } from "framer-motion";

interface DopamineBlastProps {
  pointsEarned: number;
  onContinue: () => void;
}

const PARTICLE_EMOJIS = ["⭐", "✨", "🎉", "💫", "🌟", "🎊", "💥"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: PARTICLE_EMOJIS[i % PARTICLE_EMOJIS.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotate: Math.random() * 360,
    scale: 0.8 + Math.random() * 0.8,
  }));
}

const PARTICLES = buildParticles(18);

export function DopamineBlast({ pointsEarned, onContinue }: DopamineBlastProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary) 0%, #9b6dff 50%, var(--color-accent) 100%)",
      }}
    >
      {!shouldReduceMotion &&
        PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none select-none text-2xl"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0, y: 40, rotate: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [40, -20, -60, -120],
              rotate: particle.rotate,
              scale: [0, particle.scale, particle.scale, 0],
            }}
            transition={{
              duration: 2.5,
              delay: particle.id * 0.08,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}

      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <p className="text-white text-lg font-semibold opacity-90 mb-2">
            Goed gedaan!
          </p>
          <div
            className="rounded-2xl px-8 py-4"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <motion.p
              className="text-7xl font-black text-white"
              initial={shouldReduceMotion ? false : { scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
            >
              +{pointsEarned}
            </motion.p>
            <p className="text-white text-base font-semibold opacity-90 mt-1">
              punten verdiend
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={onContinue}
          className="mt-4 px-8 py-4 text-base font-bold rounded-full min-h-[52px]"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-primary)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.96 }}
        >
          Nog een activiteit!
        </motion.button>
      </div>
    </div>
  );
}
