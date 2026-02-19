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
    <div className="space-y-3 mt-4 ml-4 mr-4 ">
      {/* Page header bar (reuse your existing header component if you already made it) */}
      
      <CreditLensHeader
        title="Trends"
        subtitle=""
        name="John Doe"
        role="Public Customer"
      />

      {/* Content wrapper – keeps it laptop-friendly */}
      <div className="mx-auto w-full max-w-[1180px] px-4 pb-0 pt-1 lg:px-6">
        <div className="grid items-start gap-7 xl:grid-cols-[1.8fr_1fr]">
          {/* Left: chart card */}
<div className="self-start rounded-[26px] border border-slate-200/70 bg-white/90 pt-5 pl-5 pr-5 pb-9 shadow-[0_40px_80px_-35px_rgba(2,44,67,0.35)]">
  <div className="flex items-start justify-between">
    <div>
      <div className="text-sm text-slate-500">6 Month Only</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">
        Credit Risk Score
      </div>
    </div>

    <Button
      variant="outline"
      className="rounded-full border-slate-300 bg-white px-6"
    >
      Month
    </Button>
  </div>

  <div className="mt-4">
    <CreditRiskBarChart />
  </div>
</div>


          {/* Right: summary card */}
          <TrendSummaryCard />
        </div>

        {/* Bottom promo card */}
        <div className="mt-4 rounded-[26px] bg-[linear-gradient(135deg,#0b3a5a,#0a6ea5)] p-7 text-white shadow-lg">
  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
    {/* Left text */}
    <div className="min-w-0">
      <div className="text-2xl font-semibold">Decrease your Credit Score</div>
      <p className="mt-2 max-w-3xl text-sm text-white/85">
        Understand the key factors increasing your credit risk and how they affect your overall
        score. Follow practical steps to reduce liabilities, improve payment behavior, and
        strengthen your financial profile.
      </p>
    </div>

    {/* Right button */}
    <div className="md:shrink-0">
      <Button 
        onClick={() => router.push("/public-customer/creditlens/insight")}
        className="rounded-xl bg-white px-8 py-6 text-[#0b2447] hover:bg-white/90"
      >
        Learn More
      </Button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
