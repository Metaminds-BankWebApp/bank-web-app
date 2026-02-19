"use client";

import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { BarChart3, ShieldCheck, Target, TrendingUp } from "lucide-react";

export default function TrendSummaryCard() {
  return (
    <Card className="h-full min-w-0 rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)] md:rounded-[26px]">
      <CardContent className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">Trend Summary</h3>
          <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800 hover:bg-emerald-100">
            Moderate Risk
          </Badge>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4 sm:p-5">
          <div className="text-4xl font-extrabold tracking-tight text-emerald-600 sm:text-5xl">
            -25 <span className="text-2xl font-bold sm:text-3xl">Risk pts</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-base font-medium text-emerald-700">
            <TrendingUp size={16} />
            Improved since April
          </div>
        </div>

        <div className="mt-4 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <BarChart3 size={18} />
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900">Biggest Driver</div>
              <div className="text-sm text-slate-500">Reduced DTI pressure</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-700">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900">Risk Stability</div>
              <div className="text-sm text-slate-500">No sudden risk spikes</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Target size={18} />
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900">Next Target</div>
              <div className="text-sm text-slate-500">Below 40 to Low Risk</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
