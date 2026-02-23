"use client";

import React from "react";


type Factor = { name: string; value: number; max: number; color: string };

export default function RiskPointsBreakdown({
  factors,
  score,
}: {
  factors: Factor[];
  score: number;
}) {
  return (
    <div className="creditlens-card creditlens-card-hover rounded-[26px] bg-white/92 p-7 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)]">
      <h3 className="text-lg font-semibold text-slate-900">Risk Points Breakdown</h3>

      <div className="mt-6 space-y-5">
        {factors.map((f) => {
          const pct = Math.max(0, Math.min(100, (f.value / Math.max(1, f.max)) * 100));
          return (
            <div key={f.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">• {f.name}:</span>
                <span className="font-semibold text-slate-900">
                  {f.value} / {f.max}
                </span>
              </div>

              <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: f.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* bottom area like screenshot */}
      <div className="mt-7 rounded-xl border bg-slate-50 p-4 text-xs text-slate-500 leading-relaxed">
  Based on our proprietary algorithm, your current score of <b>{score}</b> indicates a
  moderate probability of credit default. Improving your DTI could positively impact your
  score.
</div>
    </div>
  );
}
