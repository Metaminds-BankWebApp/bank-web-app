"use client";

import React from "react";
import { BadgeCheck, CheckCircle2 } from "lucide-react";

export default function PositiveBehaviorsCard() {
  return (
    <div className="creditlens-card creditlens-card-hover rounded-[26px] border border-slate-200/70 bg-white/90 pt-3 pr-5 pl-5 pb-3 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)]">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <BadgeCheck className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Positive Behaviors</h3>
      </div>

      <div className="mt-6 space-y-5">
        {/* 1 */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">
                Stable Salaried Employment
              </div>
              <div className="mt-1 text-xs text-slate-500">(Permanent) — 0/15</div>

              <div className="mt-3 inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                ✓ VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">
                Credit Exposure is Controlled
              </div>
              <div className="mt-1 text-xs text-slate-500">(4 active facilities)</div>

              <div className="mt-3 inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                ◆ ALL DEBTS UP-TO-DATE
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">
                Low Debt–to–Income (DTI)
              </div>
              <div className="mt-1 text-xs text-slate-500">Below 50%</div>

              <div className="mt-3 inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                HIGH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
