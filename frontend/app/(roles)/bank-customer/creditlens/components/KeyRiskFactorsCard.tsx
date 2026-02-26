"use client";

import React from "react";
import { AlertTriangle, CreditCard, CircleAlert, Info, TrendingDown } from "lucide-react";

export default function KeyRiskFactorsCard() {
  return (
    <div className="creditlens-card creditlens-card-hover rounded-[26px] border border-slate-200/70 bg-white/90 pt-3 pr-5 pl-5 pb-3 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)]">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Key Risk Factors</h3>
      </div>

      {/* Items */}
      <div className="mt-6 space-y-5">
        {/* 1 */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <CreditCard className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <span>High Credit Utilization</span>
                <button
                  type="button"
                  className="group relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  aria-label="Credit Utilization details"
                >
                  <Info size={12} />
                  <span
                    role="tooltip"
                    className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+0.45rem)] z-20 w-56 -translate-x-1/2 rounded-lg border border-white/20 bg-[#0b2447] p-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100"
                  >
                    <span className="block font-semibold text-white">Credit Utilization</span>
                    <span className="mt-1 block text-white/85">
                      Shows how much of your available revolving credit you are currently using.
                    </span>
                    <span className="mt-1 block text-sky-100">
                      Utilization = (Total card balances / Total credit limits) x 100
                    </span>
                  </span>
                </button>
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
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-5">
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
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <TrendingDown className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <span>Moderate Debt-to-Income</span>
                <button
                  type="button"
                  className="group relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  aria-label="Debt-to-Income details"
                >
                  <Info size={12} />
                  <span
                    role="tooltip"
                    className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+0.45rem)] z-20 w-56 -translate-x-1/2 rounded-lg border border-white/20 bg-[#0b2447] p-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100"
                  >
                    <span className="block font-semibold text-white">Debt-to-Income (DTI)</span>
                    <span className="mt-1 block text-white/85">
                      Shows how much of your monthly income goes toward debt payments.
                    </span>
                    <span className="mt-1 block text-sky-100">
                      DTI = (Total monthly debt payments / Gross monthly income) x 100
                    </span>
                  </span>
                </button>
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
