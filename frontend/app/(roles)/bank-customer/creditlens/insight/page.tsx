"use client";

import React from "react";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";

import KeyRiskFactorsCard from "../components/KeyRiskFactorsCard";
import PositiveBehaviorsCard from "../components/PositiveBehaviorsCard";
import FinancialTipsCard from "../components/FinancialTipsCard";
import FullReportBanner from "../components/FullReportBanner";

export default function InsightPage() {
  return (
    <div className="w-full min-h-[calc(100dvh-1.25rem)] space-y-4 overflow-x-hidden px-1 pt-2 sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <CreditLensHeader
        title="Credit Insight"
        subtitle=""
        name="Kamal Edirisinghe"
        role="Bank Customer"
      />

      <div className="pb-0 pt-1 sm:pt-2 lg:px-2 xl:px-3">
        <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7">
          <KeyRiskFactorsCard />
          <PositiveBehaviorsCard />
          <FinancialTipsCard />
        </div>

        <FullReportBanner />
      </div>
    </div>
  );
}
