"use client";

import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { BarChart3, ShieldCheck, Target, TrendingUp } from "lucide-react";

export default function TrendSummaryCard() {
  return (
    <Card className="self-start rounded-[26px] border border-slate-200/70 bg-white/90 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)]">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Trend Summary</h3>
          <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800 hover:bg-emerald-100">
            Moderate Risk
          </Badge>
        </div>

        {/* Score box (smaller) */}
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="text-3xl font-extrabold tracking-tight text-emerald-600">
            -25 <span className="text-xl font-bold">Risk pts</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
            <TrendingUp size={14} />
            Improved since April
          </div>
        </div>

        {/* Insight tiles (smaller + less spacing) */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <BarChart3 size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900">Biggest Driver</div>
              <div className="text-[11px] text-slate-500">Reduced DTI pressure</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-blue-700">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900">Risk Stability</div>
              <div className="text-[11px] text-slate-500">No sudden risk spikes</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Target size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900">Next Target</div>
              <div className="text-[11px] text-slate-500">Below 40 → Low Risk</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
