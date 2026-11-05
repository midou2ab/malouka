import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siwar } from "@/config/siwar";

const burst = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2;
  const r = 180 + (i % 4) * 70;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, s: 12 + (i % 5) * 6, d: (i % 6) * 0.03 };
});

export function NameReveal({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative z-10 flex w-[min(92vw,900px)] flex-col items-center px-6 text-center">
      {burst.map((b, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/3 text-rose"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: b.x, y: b.y, scale: [0, 1.2, 0.6], opacity: [1, 1, 0] }}
          transition={{ duration: 2, delay: b.d, ease: "easeOut" }}
        >
          <Heart fill="currentColor" strokeWidth={0} style={{ width: b.s, height: b.s }} />
        </motion.span>
      ))}

      <motion.h1
        initial={{ opacity: 0, scale: 0.85, letterSpacing: "0.6em", filter: "blur(18px)" }}
        animate={{ opacity: 1, scale: 1, letterSpacing: "0.12em", filter: "blur(0px)" }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="text-glow font-sans text-[13vw] font-black leading-none tracking-[0.06em] text-ivory sm:text-[10rem] md:text-[12rem]"
      >
        {siwar.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="mt-4 font-script text-4xl text-blush sm:text-6xl"
      >
        {siwar.intro.greeting}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 1.2 }}
        className="mt-6 max-w-xl font-display text-lg italic leading-relaxed text-foreground/75 sm:text-2xl"
      >
        {siwar.intro.message}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onEnter}
        className="neon-button group relative mt-12 overflow-hidden rounded-full px-8 py-4 text-xs font-semibold tracking-[0.3em] text-ivory transition-shadow duration-500 hover:glow-rose sm:text-sm"
      >
        <span className="absolute inset-0 bg-primary/20 transition-colors duration-500 group-hover:bg-primary/50" />
        <span className="anim-shine absolute inset-y-0 left-0 w-1/3 bg-ivory/20 blur-md" />
        <span className="relative">{siwar.intro.button}</span>
      </motion.button>
    </div>
  );
}
