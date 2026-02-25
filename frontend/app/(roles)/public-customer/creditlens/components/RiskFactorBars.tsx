"use client";

import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";

type Factor = {
  name: string;
  value: number;
  max: number;
  color?: string;
  infoTooltip?: {
    title: string;
    description: string;
    formula: string;
  };
};

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
            <div className="w-28 shrink-0 text-sm text-white/80 sm:w-40 sm:text-base lg:w-48 lg:text-lg">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="break-words">{factor.name}</span>
                {factor.infoTooltip ? (
                  <button
                    type="button"
                    className="group relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label={`${factor.infoTooltip.title} details`}
                  >
                    <Info size={12} />
                    <span
                      role="tooltip"
                      className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+0.45rem)] z-20 w-56 -translate-x-1/2 rounded-lg border border-white/20 bg-[#0b2447] p-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100"
                    >
                      <span className="block font-semibold text-white">{factor.infoTooltip.title}</span>
                      <span className="mt-1 block text-white/85">{factor.infoTooltip.description}</span>
                      <span className="mt-1 block text-sky-100">{factor.infoTooltip.formula}</span>
                    </span>
                  </button>
                ) : null}
              </div>
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
