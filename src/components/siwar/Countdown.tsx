import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siwar } from "@/config/siwar";

export function Countdown({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(3);

  useEffect(() => {
    const t = setTimeout(() => (n > 1 ? setN(n - 1) : onDone()), n === 3 ? 2200 : 1300);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center text-center"
      exit={{ opacity: 0, scale: 1.4, filter: "blur(12px)" }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        initial={{ opacity: 0, y: 12, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="mb-10 px-6 font-display text-lg italic text-blush/80 sm:text-2xl"
      >
        {siwar.intro.teaser}
      </motion.p>
      <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
        <motion.div
          className="absolute inset-0 rounded-full border border-blush/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={n}
            initial={{ opacity: 0, scale: 2.2, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.4, filter: "blur(16px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-glow absolute font-display text-[10rem] font-light leading-none text-ivory sm:text-[14rem]"
          >
            {n}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
