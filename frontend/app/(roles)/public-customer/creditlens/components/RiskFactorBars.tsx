"use client";

import React, { useEffect, useMemo, useState } from "react";

type Factor = { name: string; value: number; max: number; color?: string };

export default function RiskFactorBars({ factors }: { factors: Factor[] }) {
  const [animate, setAnimate] = useState(false);
  const [displayValues, setDisplayValues] = useState<Record<string, number>>({});

  // Init/reset display values when factors change
  useEffect(() => {
    const initial: Record<string, number> = {};
    factors.forEach((f) => (initial[f.name] = 0));
    setDisplayValues(initial);

    // reset animation then start next frame
    setAnimate(false);
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [factors]);

  // Count-up number animation (0 -> value)
  useEffect(() => {
    if (!animate) return;

    const duration = 700; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);

      const next: Record<string, number> = {};
      for (const f of factors) {
        next[f.name] = Math.round(f.value * eased);
      }
      setDisplayValues(next);

      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, factors]);

  return (
    <div className="space-y-4">
      {factors.map((f, idx) => {
        const pctRaw = (f.value / Math.max(1, f.max)) * 100;
        const pct = Math.max(0, Math.min(100, pctRaw));

        const displayedPct = animate ? pct : 0;

        // keep the bubble inside the track edges nicely
        const bubbleTransform =
          displayedPct <= 1
            ? "translateX(0%)"
            : displayedPct >= 99
            ? "translateX(-100%)"
            : "translateX(-50%)";

        // small stagger (optional)
        const delay = `${idx * 80}ms`;

        return (
          <div key={f.name} className="flex items-center gap-4">
            <div className="w-36 text-sm text-white/80">{f.name}</div>

            <div className="relative flex-1">
              {/* Track */}
              <div className="h-3.5 overflow-hidden rounded-full bg-white/85">
                {/* Fill */}
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: `${displayedPct}%`,
                    backgroundColor: f.color ?? "#38bdf8",
                    transitionDelay: delay,
                  }}
                />
              </div>

              {/* Bubble */}
              <div
                className="absolute -top-3 transition-[left] duration-700 ease-out"
                style={{
                  left: `${displayedPct}%`,
                  transform: bubbleTransform,
                  transitionDelay: delay,
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d1d5db] text-sm font-semibold text-[#0b2447] shadow-sm">
                  {displayValues[f.name] ?? 0}
                </div>
              </div>
            </div>

            <div className="w-10 text-right text-sm text-white/70">{f.max}</div>
          </div>
        );
      })}
    </div>
  );
}
