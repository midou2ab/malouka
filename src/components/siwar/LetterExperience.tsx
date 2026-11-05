import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siwar } from "@/config/siwar";

export function LetterExperience() {
  const [stage, setStage] = useState(0); // 0 sealed, 1 seal breaks, 2 flap opens, 3 letter out

  useEffect(() => {
    const ts = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2300),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  const L = siwar.letter;

  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-3 py-20 sm:px-5 sm:py-24">
      {stage < 3 && (
        <motion.div
          className="relative aspect-[3/2] w-full max-w-md"
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 900 }}
        >
          <div className="paper absolute inset-0 rounded-md" />
          <motion.div
            className="absolute inset-x-0 top-0 h-[60%] origin-top"
            animate={{ rotateX: stage >= 2 ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="paper h-full w-full"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-[52%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wine shadow-xl"
            animate={stage >= 1 ? { scale: [1, 1.2, 0], rotate: 40, opacity: 0 } : { scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Heart className="h-7 w-7 text-rose" fill="currentColor" strokeWidth={0} />
          </motion.div>
        </motion.div>
      )}

      {stage >= 3 && (
        <motion.article
          initial={{ opacity: 0, y: 160, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="paper relative w-full rounded-sm px-5 py-9 text-ink shadow-[0_0_50px_rgba(255,45,120,0.35)] sm:px-16 sm:py-16"
        >
          <Heart
            className="absolute right-6 top-6 h-5 w-5 text-rose/60"
            fill="currentColor"
            strokeWidth={0}
          />
          <Heart
            className="absolute bottom-6 left-6 h-4 w-4 text-rose/40"
            fill="currentColor"
            strokeWidth={0}
          />
          <motion.div
            initial="h"
            animate="s"
            variants={{ s: { transition: { staggerChildren: 0.5, delayChildren: 0.8 } } }}
            className="font-script text-2xl leading-relaxed sm:text-4xl"
          >
            {[L.greeting, ...L.paragraphs].map((p, i) => (
              <motion.p
                key={i}
                variants={{
                  h: { opacity: 0, y: 10 },
                  s: { opacity: 1, y: 0, transition: { duration: 1 } },
                }}
                className="mb-6"
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              variants={{ h: { opacity: 0 }, s: { opacity: 1, transition: { duration: 1 } } }}
              className="mt-10 text-right"
            >
              {L.closing}
              <br />
              <span className="text-wine">{L.signature}</span>
            </motion.p>
          </motion.div>
        </motion.article>
      )}
    </div>
  );
}
