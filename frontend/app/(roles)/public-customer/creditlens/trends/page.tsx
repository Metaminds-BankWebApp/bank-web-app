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

/**
 * Public-customer CreditLens trends page with range switching and summary messaging.
 * his page uses useEffect with trendRange dependency. So every time range changes, it reloads trend data
 */
export default function TrendsPage() {
  const router = useRouter();
  const [trendRange, setTrendRange] = useState<TrendRange>("6m");
  const [trendData, setTrendData] = useState<CreditTrendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasSufficientTrendHistory = (trendData?.points.length ?? 0) >= 2;//checks whether at least 2 months exist

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
    <div className="w-full overflow-x-hidden px-1 pb-5 pt-2 sm:px-2 lg:flex lg:h-full lg:flex-col lg:px-6 lg:pb-4 lg:pt-3 xl:px-8 2xl:px-10">
      <div className="flex min-h-full flex-col gap-4 sm:gap-5 lg:h-full lg:min-h-0 lg:gap-3">
        <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Trends" />

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
          <div className="flex min-h-0 flex-1 flex-col gap-4 lg:gap-3 lg:px-2 xl:px-3">
            <div className="creditlens-stagger-2 grid min-w-0 items-stretch gap-4 lg:min-h-0 lg:flex-1 lg:auto-rows-fr xl:grid-cols-[1.85fr_1fr] xl:gap-5">
              <div className="creditlens-card creditlens-card-hover flex h-full min-w-0 flex-col rounded-2xl border border-slate-200/70 bg-white/90 px-4 pb-4 pt-4 shadow-[0_40px_80px_-35px_rgba(2,44,67,0.35)] sm:px-5 sm:pb-5 sm:pt-5 md:rounded-[26px] lg:p-4">
                <div className="min-w-0">
                  <div className="text-base text-slate-500">{trendData.periodLabel}</div>
                  <div className="mt-1 flex min-w-0 items-center gap-3">
                    <div className="whitespace-nowrap text-lg font-semibold leading-tight text-slate-900 sm:text-2xl">
                      Credit Risk History
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
                </div>

                <div className="mt-3 min-h-0 flex-1 sm:mt-4 lg:mt-3">
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

            <div className="creditlens-card creditlens-card-hover creditlens-delay-4 relative overflow-hidden rounded-2xl border border-[#66a8d0]/35 bg-[#14517c] p-4 text-white shadow-[0_24px_44px_-30px_rgba(2,18,33,0.82)] sm:p-5 md:rounded-[26px] lg:min-h-[104px] lg:p-3 xl:p-4">
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

              <div className="relative flex h-full min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-3 xl:gap-4">
                <div className="min-w-0">
                  <div className="break-words text-xl font-semibold leading-tight sm:text-2xl lg:text-xl xl:text-2xl">
                    Decrease your Credit Score
                  </div>
                  <p className="mt-2 max-w-3xl text-sm text-white/85 sm:text-base lg:text-sm xl:text-base">
                    Quick insight: view your key risk drivers and practical actions in Credit Insight.
                  </p>
                </div>

                <div className="md:shrink-0">
                  <Button
                    onClick={() => router.push("/public-customer/creditlens/insight")}
                    className="h-10 rounded-xl bg-white px-5 text-sm text-[#0b2447] hover:bg-white/90 sm:h-11 sm:px-7 sm:text-base lg:h-10 lg:px-5 lg:text-sm xl:h-11 xl:px-7 xl:text-base"
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

/**
 * Reusable empty, loading, and error state shell for the trends screen.
 */
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
