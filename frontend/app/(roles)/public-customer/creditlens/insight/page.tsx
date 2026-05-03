"use client";

import React, { useEffect, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { getPublicCreditInsights } from "@/src/api/creditlens/public-creditlens.service";
import type { CreditInsightsResponse } from "@/src/types/dto/public-creditlens.dto";
import KeyRiskFactorsCard from "../components/KeyRiskFactorsCard";
import PositiveBehaviorsCard from "../components/PositiveBehaviorsCard";
import FinancialTipsCard from "../components/FinancialTipsCard";
import FullReportBanner from "../components/FullReportBanner";

/**
 * Public-customer CreditLens insight page that groups risk drivers, positive signals, and next steps.
 */
export default function InsightPage() {
  const [insights, setInsights] = useState<CreditInsightsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInsights = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPublicCreditInsights();
      setInsights(response);
    } catch (unknownError) {
      const message = unknownError instanceof Error
        ? unknownError.message
        : "Unable to load your CreditLens insights.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadInsights();
  }, []);

  return (
    <div className="w-full min-h-[calc(100dvh-1.25rem)] space-y-4 overflow-x-hidden px-1 pt-2 sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader
        theme="creditlens"
        menuMode="feature-layout"
        title="Credit Insight"
        subtitle=""
        name="Kamal Edirisinghe"
        role="Public Customer"
      />

      <div className="pb-0 pt-1 sm:pt-2 lg:px-2 xl:px-3">
        {isLoading && !insights ? (
          <StateCard
            title="Loading credit insights"
            description="Building your latest risk factors, positive behaviors, and action tips."
          />
        ) : error && !insights ? (
          <StateCard
            title="Could not load insights"
            description={error}
            actionLabel="Try Again"
            onAction={() => void loadInsights()}
          />
        ) : insights ? (
          <>
            <div className="creditlens-stagger-3 grid min-w-0 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7">
              <KeyRiskFactorsCard items={insights.keyRiskFactors} />
              <PositiveBehaviorsCard items={insights.positiveBehaviors} />
              <FinancialTipsCard items={insights.financialTips} />
            </div>

            <FullReportBanner
              title={insights.reportBannerTitle}
              description={insights.reportBannerDescription}
              actionLabel={insights.reportActionLabel}
            />
          </>
        ) : (
          <StateCard
            title="No insights available yet"
            description="Generate a CreditLens evaluation first to unlock your insight cards."
          />
        )}
      </div>
    </div>
  );
}

/**
 * Reusable empty, loading, and error state shell for the insight page.
 */
function StateCard({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="creditlens-card rounded-2xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-[0_20px_55px_-35px_rgba(2,44,67,0.35)] md:rounded-[26px]">
      <div className="mx-auto max-w-xl space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        {actionLabel && onAction ? (
          <Button onClick={onAction} className="mt-2 rounded-xl bg-[#14517c] px-5 text-white hover:bg-[#103f61]">
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
