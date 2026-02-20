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
    <div className="min-w-0 rounded-2xl bg-white/92 p-5 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)] sm:p-6 md:rounded-[26px] md:p-7">
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">Risk Points Breakdown</h3>

      <div className="mt-6 space-y-5">
        {factors.map((factor) => {
          const pct = Math.max(0, Math.min(100, (factor.value / Math.max(1, factor.max)) * 100));
          return (
            <div key={factor.name}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 break-words text-slate-600">- {factor.name}:</span>
                <span className="shrink-0 font-semibold text-slate-900">
                  {factor.value} / {factor.max}
                </span>
              </div>

              <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: factor.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 rounded-xl border bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        Based on our proprietary algorithm, your current score of <b>{score}</b> indicates a
        moderate probability of credit default. Improving your DTI could positively impact your
        score.
      </div>
    </div>
  );
}
