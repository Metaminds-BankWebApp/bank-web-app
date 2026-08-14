"use client";

import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Activity, BarChart3, Target, TrendingUp } from "lucide-react";

type Props = {
  riskLabel?: string;
  riskDelta?: number;
  trendText?: string;
  biggestDriver?: string;
  momentumText?: string;
  nextTarget?: string;
  hasSufficientHistory?: boolean;
  insufficientHistoryTitle?: string;
  insufficientHistoryDescription?: string;
};

/**
 * Narrative summary card that explains the direction and quality of the recent CreditLens trend.
 */
export default function TrendSummaryCard({
  riskLabel = "Moderate Risk",
  riskDelta = -25,
  trendText = "Improved since April",
  biggestDriver = "Reduced DTI pressure",
  momentumText = "Average drop of 5 risk pts per month",
  nextTarget = "33 or below to Low Risk",
  hasSufficientHistory = true,
  insufficientHistoryTitle = "Not enough trend history yet",
  insufficientHistoryDescription = "At least 2 monthly evaluations are needed before CreditLens can show score movement, biggest drivers, and monthly momentum.",
}: Props) {
  const deltaColor = riskDelta <= 0 ? "text-emerald-600" : "text-rose-600";
  const deltaSign = riskDelta > 0 ? "+" : "";
  const trendColor = riskDelta <= 0 ? "text-emerald-700" : "text-rose-700";

  return (
    <Card className="creditlens-card creditlens-card-hover h-full min-w-0 rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)] md:rounded-[26px]">
      <CardContent className="flex h-full flex-col p-4 sm:p-5 lg:p-3 xl:p-4">
        {hasSufficientHistory ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl lg:text-lg xl:text-xl">Trend Summary</h3>
              <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800 hover:bg-emerald-100 lg:px-2.5 lg:py-0.5 lg:text-xs xl:px-3">
                {riskLabel}
              </Badge>
            </div>

            <div className="mt-3 rounded-2xl bg-slate-50 p-3 sm:p-5 lg:p-2.5 xl:p-3">
              <div className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-3xl xl:text-4xl ${deltaColor}`}>
                {deltaSign}
                {riskDelta} <span className="text-2xl font-bold sm:text-3xl lg:text-xl xl:text-2xl">Risk pts</span>
              </div>
              <div className={`mt-2 flex items-center gap-2 text-base font-medium lg:text-sm ${trendColor}`}>
                <TrendingUp size={16} />
                {trendText}
              </div>
            </div>

            <div className="mt-3 space-y-2 sm:space-y-3 lg:space-y-2">
              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4 lg:p-2.5 xl:p-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 lg:h-8 lg:w-8 xl:h-9 xl:w-9">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900 lg:text-sm xl:text-base">Biggest Driver</div>
                  <div className="text-sm text-slate-500">{biggestDriver}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4 lg:p-2.5 xl:p-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-700 lg:h-8 lg:w-8 xl:h-9 xl:w-9">
                  <Activity size={18} />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900 lg:text-sm xl:text-base">Monthly Momentum</div>
                  <div className="text-sm text-slate-500">{momentumText}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4 lg:p-2.5 xl:p-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700 lg:h-8 lg:w-8 xl:h-9 xl:w-9">
                  <Target size={18} />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900 lg:text-sm xl:text-base">Next Target</div>
                  <div className="text-sm text-slate-500">{nextTarget}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl lg:text-lg xl:text-xl">Trend Summary</h3>
            <div className="mt-5 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6 sm:p-7 lg:mt-4 lg:p-4 xl:p-5">
              <div className="text-lg font-semibold text-slate-900">{insufficientHistoryTitle}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {insufficientHistoryDescription}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
