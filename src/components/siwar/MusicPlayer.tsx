https://github.com/midou2ab/maloukaimport { useCallback, useEffect, useRef } from "react";
import { siwar } from "@/config/siwar";

function fade(a: HTMLAudioElement, to: number, ms = 1200, done?: () => void) {
  const from = a.volume;
  const start = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / ms);
    a.volume = from + (to - from) * k;
    if (k < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

/** Attempts playback after the countdown and persists across sections. */
export function MusicPlayer({ armed, startSignal }: { armed: boolean; startSignal: number }) {
  const ref = useRef<HTMLAudioElement>(null);
  const stopTimer = useRef<number | null>(null);
  const { src, volume } = siwar.music;

  const play = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = 0;
    a.currentTime = 0;
    a.play()
      .then(() => {
        fade(a, volume);
        stopTimer.current = window.setTimeout(() => {
          if (ref.current !== a) return;
          fade(a, 0, 800, () => a.pause());
          stopTimer.current = null;
        }, 11500);
      })
      .catch(() => {});
  }, [volume]);

  useEffect(() => {
    if (armed && src) play();
    const handleUserStart = () => play();
    window.addEventListener("maloukty:play-music", handleUserStart);
    return () => {
      window.removeEventListener("maloukty:play-music", handleUserStart);
      if (stopTimer.current !== null) {
        window.clearTimeout(stopTimer.current);
        stopTimer.current = null;
      }
    };
  }, [armed, play, src, startSignal]);

  if (!src) return null;
  return <audio ref={ref} src={src} preload="auto" />;
}
