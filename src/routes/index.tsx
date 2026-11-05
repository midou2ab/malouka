import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BirthdayIntro } from "@/components/siwar/BirthdayIntro";
import { MemoryMenu, type Section } from "@/components/siwar/MemoryMenu";
import { HeartMemory } from "@/components/siwar/HeartMemory";
import { MirrorGallery } from "@/components/siwar/MirrorGallery";
import { LetterExperience } from "@/components/siwar/LetterExperience";
import { MusicPlayer } from "@/components/siwar/MusicPlayer";
import { Navigation } from "@/components/siwar/Navigation";
import { HeartParticles } from "@/components/siwar/HeartParticles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "maloukty" },
      {
        name: "description",
        content: "A little universe made just for Maloukty, on her birthday.",
      },
      { property: "og:title", content: "MALOUKTY — A Birthday Made With Love ❤️" },
      {
        property: "og:description",
        content: "A little universe made just for Maloukty, on her birthday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function HeartCursor() {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const last = useRef(0);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let id = 0;
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 70) return;
      last.current = now;
      const h = { id: id++, x: e.clientX, y: e.clientY };
      setTrail((t) => [...t.slice(-10), h]);
      setTimeout(() => setTrail((t) => t.filter((p) => p.id !== h.id)), 900);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {trail.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-sm text-rose"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0.9, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -30, scale: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

function Index() {
  const [entered, setEntered] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicStartSignal, setMusicStartSignal] = useState(0);
  const [section, setSection] = useState<Section | null>(null);

  const open = (s: Section | null) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen">
      <MusicPlayer armed={musicStarted} startSignal={musicStartSignal} />
      <HeartCursor />
      <AnimatePresence mode="wait">
        {!entered ? (
          <BirthdayIntro
            key="intro"
            onEnter={() => {
              window.dispatchEvent(new Event("maloukty:play-music"));
              setEntered(true);
              setMusicStarted(true);
            }}
            onCountdownDone={() => {
              setMusicStarted(true);
              setMusicStartSignal((signal) => signal + 1);
            }}
          />
        ) : (
          <motion.div
            key="world"
            className="bg-room relative min-h-screen overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="fixed inset-0">
              <HeartParticles hearts={18} sparkles={40} mode="rise" />
            </div>
            <Navigation showBack={section !== null} onBack={() => open(null)} />
            <AnimatePresence mode="wait">
              <motion.div
                key={section ?? "menu"}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.7 }}
              >
                {section === null && <MemoryMenu onOpen={open} />}
                {section === "heart" && <HeartMemory />}
                {section === "mirror" && <MirrorGallery />}
                {section === "letter" && <LetterExperience />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
