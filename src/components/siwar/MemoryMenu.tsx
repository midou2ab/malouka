import { motion } from "framer-motion";
import heartImg from "@/assets/heart.png";
import mirrorImg from "@/assets/mirror.png";
import envelopeImg from "@/assets/envelope.png";
import { siwar } from "@/config/siwar";

export type Section = "heart" | "mirror" | "letter";

const objects: {
  id: Section;
  img: string;
  label: string;
  desc: string;
  glow: string;
  float: number;
}[] = [
  {
    id: "heart",
    img: heartImg,
    label: "OUR MEMORIES",
    desc: "Every little moment with you is worth keeping.",
    glow: "bg-primary/50",
    float: 0,
  },
  {
    id: "mirror",
    img: mirrorImg,
    label: "OUR LITTLE GALLERY",
    desc: "Little moments, beautiful memories, and my favorite person.",
    glow: "bg-blush/35",
    float: 0.8,
  },
  {
    id: "letter",
    img: envelopeImg,
    label: "A LETTER FOR YOU",
    desc: "Some things are too beautiful to leave unsaid.",
    glow: "bg-gold/30",
    float: 1.6,
  },
];

export function MemoryMenu({ onOpen }: { onOpen: (s: Section) => void }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-3 pb-14 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="max-w-[95vw] font-display text-3xl font-light text-ivory sm:text-5xl md:text-6xl"
      >
        {siwar.menu.title.split(siwar.name)[0]}
        <span className="text-glow italic text-blush">{siwar.name}</span>
        {siwar.menu.title.split(siwar.name)[1]}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-3 max-w-lg px-2 font-display text-base italic text-muted-foreground sm:mt-4 sm:text-xl"
      >
        {siwar.menu.subtitle}
      </motion.p>

      <div className="neon-panel mt-8 grid w-full grid-cols-1 gap-3 rounded-2xl p-2.5 sm:mt-12 sm:gap-4 sm:rounded-3xl sm:p-6 md:grid-cols-3">
        {objects.map((o, i) => (
          <motion.button
            key={o.id}
            onClick={() => onOpen(o.id)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="neon-card group flex min-h-[18rem] flex-col items-center justify-between p-4 outline-none transition-transform duration-500 hover:-translate-y-2 sm:min-h-[22rem] sm:p-5"
          >
            <div className="relative flex h-36 w-full items-center justify-center sm:h-56">
              <div
                className={`absolute inset-10 rounded-full ${o.glow} blur-3xl transition-all duration-700 group-hover:inset-4 group-hover:opacity-100`}
              />
              <motion.img
                src={o.img}
                alt={o.label}
                width={1024}
                height={1024}
                animate={{ y: [0, -14, 0], rotate: o.id === "heart" ? [0, 0, 0] : [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: o.float }}
                className="relative h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
              />
              {o.id === "mirror" && (
                <div className="pointer-events-none absolute left-[38%] top-[14%] h-[34%] w-[24%] overflow-hidden rounded-[50%]">
                  <span className="anim-shine absolute inset-y-[-50%] left-0 w-1/3 bg-ivory/50 blur-sm" />
                </div>
              )}
              {o.id === "heart" && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.06, 1, 1.04, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </div>
            <span className="mt-4 text-xs font-semibold tracking-[0.22em] text-blush">
              {String(i + 1).padStart(2, "0")} &nbsp; {o.label}
            </span>
            <span className="mt-2 max-w-[16rem] font-display text-base italic text-foreground/70 transition-colors group-hover:text-ivory sm:mt-3 sm:text-lg">
              {o.desc}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
