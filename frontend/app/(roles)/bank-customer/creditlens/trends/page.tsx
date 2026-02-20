"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CreditRiskBarChart from "../components/CreditRiskBarChart";
import TrendSummaryCard from "../components/TrendSummaryCard";
import { Button } from "@/src/components/ui/button";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";

export default function TrendsPage() {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-hidden px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <div className="flex min-h-[calc(100dvh-1.25rem)] flex-col gap-4 sm:gap-5 lg:min-h-[calc(100dvh-2rem)]">
        <CreditLensHeader title="Trends" subtitle="" name="John Doe" role="Bank Customer" />

        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:px-2 xl:px-3">
          <div className="grid min-w-0 items-stretch gap-4 md:gap-6 lg:min-h-0 lg:flex-[1.15] xl:grid-cols-[1.85fr_1fr] xl:gap-7">
            <div className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200/70 bg-white/90 px-4 pb-5 pt-4 shadow-[0_40px_80px_-35px_rgba(2,44,67,0.35)] sm:px-5 sm:pb-7 sm:pt-5 md:rounded-[26px]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base text-slate-500">6 Month Only</div>
                  <div className="mt-1 truncate text-xl font-semibold text-slate-900 sm:text-2xl">
                    Credit Risk Score
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="h-11 shrink-0 rounded-full border-slate-300 bg-white px-5 text-base sm:px-6"
                >
                  Month
                </Button>
              </div>

              <div className="mt-4 min-h-0 flex-1">
                <CreditRiskBarChart />
              </div>
            </div>

            <div className="min-h-0">
              <TrendSummaryCard />
            </div>
          </div>

          <div className="rounded-2xl bg-[linear-gradient(135deg,#0b3a5a,#0a6ea5)] p-4 text-white shadow-lg sm:p-5 md:rounded-[26px] md:p-6 lg:min-h-[165px]">
            <div className="flex h-full min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                  onClick={() => router.push("/bank-customer/creditlens/insight")}
                  className="h-11 rounded-xl bg-white px-6 text-base text-[#0b2447] hover:bg-white/90 sm:h-12 sm:px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
