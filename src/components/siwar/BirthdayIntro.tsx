import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Countdown } from "./Countdown";
import { NameReveal } from "./NameReveal";
import { HeartParticles } from "./HeartParticles";

export function BirthdayIntro({
  onEnter,
  onCountdownDone,
}: {
  onEnter: () => void;
  onCountdownDone: () => void;
}) {
  const [stage, setStage] = useState<"count" | "name">("count");
  const done = useCallback(() => {
    setStage("name");
    onCountdownDone();
  }, [onCountdownDone]);

  return (
    <motion.section
      className="bg-night fixed inset-0 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
    >
      <HeartParticles hearts={stage === "name" ? 70 : 45} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]" />
      <div className="pointer-events-none absolute left-[-10%] top-[25%] h-40 w-[70%] rotate-[-24deg] bg-primary/25 blur-3xl" />
      <div className="vignette pointer-events-none absolute inset-0" />
      <AnimatePresence mode="wait">
        {stage === "count" ? (
          <Countdown key="c" onDone={done} />
        ) : (
          <NameReveal key="n" onEnter={onEnter} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
