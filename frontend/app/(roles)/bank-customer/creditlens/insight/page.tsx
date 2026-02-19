"use client";

import React from "react";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";

import KeyRiskFactorsCard from "../components/KeyRiskFactorsCard";
import PositiveBehaviorsCard from "../components/PositiveBehaviorsCard";
import FinancialTipsCard from "../components/FinancialTipsCard";
import FullReportBanner from "../components/FullReportBanner";

export default function InsightPage() {
  return (
    <div className="space-y-1 mt-4 ml-4 mr-4">
      <CreditLensHeader
        title="Credit Insight"
        subtitle=""
        name="Kamal Edirisinghe"
        role="Public Customer"
      />

      {/* Laptop-friendly wrapper */}
      <div className="mx-auto w-full max-w-[1180px] px-4 pb-0 pt-2 lg:px-6">
        {/* 3-column layout (matches your screenshot) */}
        <div className="grid gap-7 xl:grid-cols-3">
          <KeyRiskFactorsCard />
          <PositiveBehaviorsCard />
          <FinancialTipsCard />
        </div>

        {/* Bottom banner */}
        <FullReportBanner />
      </div>
    </div>
  );
}
