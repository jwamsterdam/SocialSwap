"use client";

import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { DopamineBlast } from "@/components/DopamineBlast";
import { lastEarnedPointsAtom } from "@/state/progressStore";

export default function CompletePage() {
  const router = useRouter();
  const pointsEarned = useAtomValue(lastEarnedPointsAtom);

  function handleContinue() {
    router.push("/");
  }

  return <DopamineBlast pointsEarned={pointsEarned} onContinue={handleContinue} />;
}
