"use client";

import React from "react";

type Factor = { name: string; value: number; max: number; color?: string };

export default function RiskFactorBars({ factors }: { factors: Factor[] }) {
  return (
    <div className="space-y-4">
      {factors.map((f) => {
        const pctRaw = (f.value / Math.max(1, f.max)) * 100;
        const pct = Math.max(0, Math.min(100, pctRaw));

        // keep the bubble inside the track edges nicely
        const bubbleTransform =
          pct <= 1 ? "translateX(0%)" : pct >= 99 ? "translateX(-100%)" : "translateX(-50%)";

        return (
          <div key={f.name} className="flex items-center gap-4">
            <div className="w-44 text-sm text-white/80">{f.name}</div>

            <div className="relative flex-1">
              {/* Track */}
              <div className="h-3.5 rounded-full bg-white/85 overflow-hidden">
                {/* Fill */}
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: f.color ?? "#38bdf8",
                  }}
                />
              </div>

              {/* Bubble */}
              <div
                className="absolute -top-3"
                style={{ left: `${pct}%`, transform: bubbleTransform }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d1d5db] text-sm font-semibold text-[#0b2447] shadow-sm">
                  {f.value}
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
