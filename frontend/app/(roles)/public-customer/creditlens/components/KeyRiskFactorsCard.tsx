"use client";

import React from "react";
import { AlertTriangle, CreditCard, CircleAlert } from "lucide-react";

export default function KeyRiskFactorsCard() {
  return (
    <div className="creditlens-card creditlens-card-hover min-w-0 rounded-2xl border border-slate-200/70 bg-white/90 px-4 pb-4 pt-3 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)] sm:px-5 sm:pb-3 md:rounded-[26px]">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">Key Risk Factors</h3>
      </div>

      {/* Items */}
      <div className="mt-6 space-y-5">
        {/* 1 */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <CreditCard className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">
                High Credit Utilization
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Current: <span className="font-semibold text-slate-900">72%</span>{" "}
                (20/20 points)
              </div>

              <div className="mt-3 inline-flex rounded-lg bg-red-500 px-4 py-1 text-xs font-semibold text-white">
                MAX RISK
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <CircleAlert className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">Missed Payments</div>
              <div className="mt-1 text-sm text-slate-600">
                5 missed payments in last 12 months (18/30 points)
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <div className="h-5 w-5 rounded-sm border border-amber-300/70 bg-amber-200/40" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">
                Moderate Debt–to–Income
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Current: <span className="font-semibold text-slate-900">39%</span>{" "}
                (12/25 points)
              </div>

              <div className="mt-3 inline-flex rounded-lg bg-orange-500 px-4 py-1 text-xs font-semibold text-white">
                HIGH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
