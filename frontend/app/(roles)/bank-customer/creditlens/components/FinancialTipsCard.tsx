"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

export default function FinancialTipsCard() {
  return (
    <div className="creditlens-card creditlens-card-hover rounded-[26px] border border-slate-200/70 bg-white/90 pt-3 pr-5 pl-5 pb-3 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)]">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Lightbulb className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Financial Tips</h3>
      </div>

      <div className="mt-6">
        <div className="h-px w-full bg-slate-200/80" />
      </div>

      <div className="mt-6 space-y-6 text-sm text-slate-700">
        <div className="flex gap-3">
          <div className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
          <div>
            Reduce credit utilization below{" "}
            <span className="font-semibold text-slate-900">70%</span> to drop risk by{" "}
            <span className="font-semibold text-emerald-600">+10 points</span>.
            <div className="mt-2 text-xs text-slate-500">
              (Best target, below 40% to drop by{" "}
              <span className="font-semibold text-slate-700">~20 points</span>)
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200/80" />

        <div className="flex gap-3">
          <div className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
          <div>
            Avoid any missed payments for the next{" "}
            <span className="font-semibold text-slate-900">12 months</span>.
            <div className="mt-2 text-xs text-slate-500">
              (This can reduce Payment History points significantly)
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200/80" />

        <div className="flex gap-3">
          <div className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
          <div>
            Try to reduce DTI below{" "}
            <span className="font-semibold text-slate-900">30%</span>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200/80" />
      </div>
    </div>
  );
}
