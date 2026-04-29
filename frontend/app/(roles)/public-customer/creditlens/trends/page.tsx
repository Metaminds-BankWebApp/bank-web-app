"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreditRiskBarChart from "../components/CreditRiskBarChart";
import TrendSummaryCard from "../components/TrendSummaryCard";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import ModuleHeader from "@/src/components/ui/module-header";
import trendsDecreaseBg from "../image/creditlens-trends-decrease-bg.svg";
import { getPublicCreditTrends } from "@/src/api/creditlens/public-creditlens.service";
import type { CreditTrendResponse } from "@/src/types/dto/public-creditlens.dto";

type TrendRange = "6m" | "12m";

export default function TrendsPage() {
  const router = useRouter();
  const [trendRange, setTrendRange] = useState<TrendRange>("6m");
  const [trendData, setTrendData] = useState<CreditTrendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasSufficientTrendHistory = (trendData?.points.length ?? 0) >= 2;

  useEffect(() => {
    let isActive = true;

    const loadTrends = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPublicCreditTrends(trendRange);
        if (isActive) {
          setTrendData(response);
        }
      } catch (unknownError) {
        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load your CreditLens trends.";
        if (isActive) {
          setError(message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadTrends();

    return () => {
      isActive = false;
    };
  }, [trendRange]);

  return (
    <div className="w-full overflow-x-hidden px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <div className="flex min-h-[calc(100dvh-1.25rem)] flex-col gap-4 sm:gap-5 lg:h-[calc(100dvh-2rem)] lg:min-h-0 lg:overflow-hidden">
        <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Trends" subtitle="" name="John Doe" role="Public Customer" />

        {isLoading && !trendData ? (
          <StateCard
            title="Loading trend history"
            description="Fetching your CreditLens month-by-month score movement."
          />
        ) : error && !trendData ? (
          <StateCard
            title="Could not load trends"
            description={error}
          />
        ) : trendData ? (
          <div className="flex min-h-0 flex-1 flex-col gap-4 lg:px-2 xl:px-3">
            <div className="creditlens-stagger-2 grid min-w-0 items-stretch gap-4 md:gap-6 lg:min-h-0 lg:flex-[1.15] xl:grid-cols-[1.85fr_1fr] xl:gap-7">
              <div className="creditlens-card creditlens-card-hover flex h-full min-w-0 flex-col rounded-2xl border border-slate-200/70 bg-white/90 px-4 pb-5 pt-4 shadow-[0_40px_80px_-35px_rgba(2,44,67,0.35)] sm:px-5 sm:pb-7 sm:pt-5 md:rounded-[26px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base text-slate-500">{trendData.periodLabel}</div>
                    <div className="mt-1 truncate text-xl font-semibold text-slate-900 sm:text-2xl">
                      Credit Risk Score
                    </div>
                  </div>

                  <Select
                    value={trendRange}
                    onValueChange={(value) => {
                      if (value === "6m" || value === "12m") {
                        setTrendRange(value);
                      }
                    }}
                  >
                    <SelectTrigger className="h-11 w-[142px] shrink-0 rounded-full border-slate-300 bg-white px-5 text-base sm:px-6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="12m">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 min-h-0 flex-1">
                  <CreditRiskBarChart labels={trendData.labels} values={trendData.values} />
                </div>
              </div>

              <div className="min-h-0">
                <TrendSummaryCard
                  riskLabel={trendData.summary.riskLabel}
                  riskDelta={trendData.summary.riskDelta}
                  trendText={trendData.summary.trendText}
                  biggestDriver={trendData.summary.biggestDriver}
                  momentumText={trendData.summary.momentumText}
                  nextTarget={trendData.summary.nextTarget}
                  hasSufficientHistory={hasSufficientTrendHistory}
                  insufficientHistoryTitle="Not enough trend history yet"
                  insufficientHistoryDescription="At least 2 monthly evaluations are needed before CreditLens can show score movement, biggest drivers, and monthly momentum."
                />
              </div>
            </div>

            <div className="creditlens-card creditlens-card-hover creditlens-delay-4 relative overflow-hidden rounded-2xl border border-[#66a8d0]/35 bg-[#14517c] p-4 text-white shadow-[0_24px_44px_-30px_rgba(2,18,33,0.82)] sm:p-5 md:rounded-[26px] md:p-6 lg:min-h-[165px]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `url("${trendsDecreaseBg.src}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,56,87,0.18)_0%,rgba(14,56,87,0.28)_56%,rgba(14,56,87,0.4)_100%)]" />

              <div className="relative flex h-full min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="break-words text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
                    Decrease your Credit Score
                  </div>
                  <p className="mt-2 max-w-3xl text-sm text-white/85 sm:text-base">
                    Quick insight: view your key risk drivers and practical actions in Credit Insight.
                  </p>
                </div>

                <div className="md:shrink-0">
                  <Button
                    onClick={() => router.push("/public-customer/creditlens/insight")}
                    className="h-11 rounded-xl bg-white px-6 text-base text-[#0b2447] hover:bg-white/90 sm:h-12 sm:px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <StateCard
            title="No trend data yet"
            description="Generate a CreditLens evaluation first to see score movement over time."
          />
        )}
      </div>
    </div>
  );
}

function StateCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 lg:px-2 xl:px-3">
      <div className="creditlens-card flex w-full items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-[0_20px_55px_-35px_rgba(2,44,67,0.35)] md:rounded-[26px]">
        <div className="max-w-xl space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
