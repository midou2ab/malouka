import { useMemo } from "react";
import { Heart } from "lucide-react";
import { useHydrated } from "@/components/siwar/useHydrated";

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/** Falling hearts + twinkling glow particles. */
export function HeartParticles({
  hearts = 40,
  sparkles = 50,
  mode = "fall",
}: {
  hearts?: number;
  sparkles?: number;
  mode?: "fall" | "rise";
}) {
  const hydrated = useHydrated();
  const items = useMemo(
    () =>
      Array.from({ length: hearts }, (_, i) => ({
        left: rand(i + 1) * 100,
        size: 8 + rand(i + 2) * 22,
        dur: 9 + rand(i + 3) * 14,
        delay: -rand(i + 4) * 20,
        opacity: 0.25 + rand(i + 5) * 0.6,
        drift: (rand(i + 6) - 0.5) * 160,
        spin: (rand(i + 7) - 0.5) * 720,
        blur: rand(i + 8) > 0.75 ? 2 : 0,
      })),
    [hearts],
  );
  const dots = useMemo(
    () =>
      Array.from({ length: sparkles }, (_, i) => ({
        left: rand(i + 100) * 100,
        top: rand(i + 200) * 100,
        size: 1 + rand(i + 300) * 3,
        dur: 2 + rand(i + 400) * 4,
        delay: -rand(i + 500) * 5,
      })),
    [sparkles],
  );
  if (!hydrated) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={`d${i}`}
          className="anim-twinkle absolute rounded-full bg-blush"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            boxShadow: "0 0 8px var(--blush)",
          }}
        />
      ))}
      {items.map((h, i) => (
        <span
          key={`h${i}`}
          className={`${mode === "fall" ? "anim-fall top-0" : "anim-rise bottom-[-5vh]"} absolute`}
          style={
            {
              left: `${h.left}%`,
              animationDuration: `${h.dur}s`,
              animationDelay: `${h.delay}s`,
              opacity: mode === "fall" ? h.opacity : undefined,
              filter: h.blur ? `blur(${h.blur}px)` : undefined,
              "--drift": `${h.drift}px`,
              "--spin": `${h.spin}deg`,
              "--o": h.opacity,
            } as React.CSSProperties
          }
        >
          <Heart
            className={i % 3 === 0 ? "text-blush" : "text-rose"}
            fill="currentColor"
            strokeWidth={0}
            style={{ width: h.size, height: h.size }}
          />
        </span>
      ))}
    </div>
  );
}
