import { motion } from "framer-motion";
import { Heart, Film } from "lucide-react";
import { siwar } from "@/config/siwar";

export function HeartMemory() {
  const { src, poster, title, caption } = siwar.video;
  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-3 py-20 text-center sm:px-5 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-glow max-w-full px-2 font-display text-3xl font-light text-ivory sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="neon-panel mt-7 w-full overflow-hidden rounded-2xl p-1.5 sm:mt-10 sm:rounded-3xl sm:p-3"
      >
        {src ? (
          <video
            src={src}
            poster={poster || undefined}
            controls
            autoPlay
            loop
            playsInline
            className="aspect-video w-full rounded-xl bg-background object-contain sm:rounded-2xl"
          />
        ) : (
          <div className="bg-night relative flex aspect-video w-full flex-col items-center justify-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-16 w-16 text-rose" fill="currentColor" strokeWidth={0} />
            </motion.div>
            <p className="flex items-center gap-2 text-sm tracking-widest text-muted-foreground">
              <Film className="h-4 w-4" /> OUR VIDEO WILL PLAY HERE
            </p>
          </div>
        )}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-6 max-w-xl px-3 font-display text-lg italic text-foreground/75 sm:mt-8 sm:text-xl"
      >
        {caption}
      </motion.p>
    </div>
  );
}
