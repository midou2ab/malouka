import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { siwar } from "@/config/siwar";

const heights = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]"];

function Photo({ src, caption, i }: { src: string; caption?: string; i: number }) {
  if (src)
    return (
      <img
        src={src}
        alt={caption ?? `Memory ${i + 1}`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  return (
    <div className="bg-night flex h-full w-full flex-col items-center justify-center gap-2">
      <Heart className="h-8 w-8 text-rose/70" fill="currentColor" strokeWidth={0} />
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground">PHOTO {i + 1}</span>
    </div>
  );
}

export function MirrorGallery() {
  const photos = siwar.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const go = useCallback(
    (d: number) => {
      setDir(d);
      setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));
    },
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, go]);

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-3 pb-16 pt-20 sm:px-5 sm:pb-24 sm:pt-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-glow text-center font-display text-3xl font-light text-ivory sm:text-5xl md:text-6xl"
      >
        Our Little Gallery
      </motion.h2>
      <p className="mt-2 px-2 text-center font-display text-base italic text-muted-foreground sm:mt-3 sm:text-lg">
        Little moments, beautiful memories, and my favorite person.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
            onClick={() => setOpen(i)}
            className="group block w-full text-left"
          >
            <div
              className={`neon-card ${heights[i % 4]} overflow-hidden shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:glow-rose`}
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <Photo {...p} i={i} />
              </div>
            </div>
            {p.caption && (
              <p className="mt-2 px-1 font-display text-base italic text-foreground/70">
                {p.caption}
              </p>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              aria-label="Close"
              className="glass absolute right-5 top-5 rounded-full p-3 text-ivory"
              onClick={() => setOpen(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous"
              className="glass absolute left-3 z-10 rounded-full p-3 text-ivory sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next"
              className="glass absolute right-3 z-10 rounded-full p-3 text-ivory sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={open}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -dir * 80, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex max-h-full flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-[4/5] h-[70vh] max-w-[88vw] overflow-hidden rounded-3xl glow-rose">
                  <Photo
                    src={photos[open]?.src ?? ""}
                    caption={photos[open]?.caption ?? ""}
                    i={open}
                  />
                </div>
                {photos[open]?.caption && (
                  <figcaption className="mt-5 font-display text-2xl italic text-blush">
                    {photos[open]?.caption}
                  </figcaption>
                )}
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
