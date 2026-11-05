import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";

export function Navigation({ showBack, onBack }: { showBack: boolean; onBack: () => void }) {
  return (
    <>
      <button
        aria-label="Home"
        onClick={onBack}
        className="neon-panel fixed left-5 top-5 z-40 rounded-full p-3 text-rose transition hover:glow-rose"
      >
        <Heart className="h-5 w-5" fill="currentColor" strokeWidth={0} />
      </button>
      <AnimatePresence>
        {showBack && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={onBack}
            className="neon-panel fixed left-20 top-5 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold tracking-[0.25em] text-ivory transition hover:glow-rose"
          >
            <ArrowLeft className="h-4 w-4" /> BACK
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
