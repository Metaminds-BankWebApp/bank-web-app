"use client";

import React, { useEffect, useState } from "react";

type Factor = { name: string; value: number; max: number; color?: string };

export default function RiskFactorBars({ factors }: { factors: Factor[] }) {
  const [displayValues, setDisplayValues] = useState<Record<string, number>>({});

  useEffect(() => {
    let raf = 0;
    const duration = 700;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next: Record<string, number> = {};

      for (const factor of factors) {
        next[factor.name] = Math.round(factor.value * eased);
      }

      setDisplayValues(next);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [factors]);

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-5">
      {factors.map((factor) => {
        const currentValue = displayValues[factor.name] ?? 0;
        const displayedPct = Math.max(
          0,
          Math.min(100, (currentValue / Math.max(1, factor.max)) * 100)
        );

        const bubbleTransform =
          displayedPct <= 1
            ? "translateX(0%)"
            : displayedPct >= 99
            ? "translateX(-100%)"
            : "translateX(-50%)";

        return (
          <div key={factor.name} className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-4 lg:gap-5">
            <div className="w-28 shrink-0 break-words text-sm text-white/80 sm:w-40 sm:text-base lg:w-48 lg:text-lg">
              {factor.name}
            </div>

            <div className="relative min-w-0 flex-1">
              <div className="h-3 overflow-hidden rounded-full bg-white/85 sm:h-3.5 lg:h-4.5">
                <div
                  className="h-full rounded-full transition-[width] duration-150 ease-out"
                  style={{
                    width: `${displayedPct}%`,
                    backgroundColor: factor.color ?? "#38bdf8",
                  }}
                />
              </div>

              <div
                className="absolute -top-3 transition-[left] duration-150 ease-out"
                style={{
                  left: `${displayedPct}%`,
                  transform: bubbleTransform,
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d1d5db] text-sm font-semibold text-[#0b2447] shadow-sm sm:h-9 sm:w-9 sm:text-base lg:h-11 lg:w-11 lg:text-lg">
                  {currentValue}
                </div>
              </div>
            </div>

            <div className="w-9 shrink-0 text-right text-sm text-white/70 sm:w-10 sm:text-base lg:w-12 lg:text-lg">
              {factor.max}
            </div>
          </div>
        );
      })}
    </div>
  );
}
