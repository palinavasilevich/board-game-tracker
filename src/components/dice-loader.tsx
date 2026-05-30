"use client";

import { useState, useEffect } from "react";

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[30, 30], [50, 50], [70, 70]],
  4: [[30, 28], [70, 28], [30, 72], [70, 72]],
  5: [[30, 28], [70, 28], [50, 50], [30, 72], [70, 72]],
  6: [[30, 22], [70, 22], [30, 50], [70, 50], [30, 78], [70, 78]],
};

function DieFace({
  n,
  faceTransform,
}: {
  n: 1 | 2 | 3 | 4 | 5 | 6;
  faceTransform: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: faceTransform,
        backfaceVisibility: "hidden",
      }}
      className="rounded-xl border border-border bg-popover text-popover-foreground shadow-lg flex items-center justify-center"
    >
      <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 fill-current">
        {PIPS[n].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={9} />
        ))}
      </svg>
    </div>
  );
}

const SIZE = 100;
const H = SIZE / 2;

const FACES: { n: 1 | 2 | 3 | 4 | 5 | 6; transform: string }[] = [
  { n: 1, transform: `translateZ(${H}px)` },
  { n: 6, transform: `rotateY(180deg) translateZ(${H}px)` },
  { n: 2, transform: `rotateY(90deg) translateZ(${H}px)` },
  { n: 5, transform: `rotateY(-90deg) translateZ(${H}px)` },
  { n: 3, transform: `rotateX(90deg) translateZ(${H}px)` },
  { n: 4, transform: `rotateX(-90deg) translateZ(${H}px)` },
];

export function DiceLoader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setPhase("fade"), 1800);
    const t2 = setTimeout(() => setPhase("gone"), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted || phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background"
      style={{
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.7s ease-out",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      <div style={{ perspective: "500px", width: SIZE, height: SIZE }}>
        <div
          style={{
            width: SIZE,
            height: SIZE,
            position: "relative",
            transformStyle: "preserve-3d",
            animation: "dice-roll 2s ease-out forwards",
          }}
        >
          {FACES.map(({ n, transform }) => (
            <DieFace key={n} n={n} faceTransform={transform} />
          ))}
        </div>
      </div>

      <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-muted-foreground">
        Board Game Tracker
      </p>
    </div>
  );
}
