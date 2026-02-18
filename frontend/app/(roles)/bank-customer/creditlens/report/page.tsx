"use client";

import React, { useMemo, useState } from "react";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";
import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import ReportMetricCard from "./components/ReportMetricCard";
import CreditSummaryDonut from "./components/CreditSummaryDonut";
import BehaviorExposureCard from "./components/BehaviorExposureCard";
import RiskPointsBreakdown from "./components/RiskPointsBreakdown";

import { Banknote, ReceiptText, CreditCard, Landmark } from "lucide-react";

type Factor = { name: string; value: number; max: number; color: string };

type ReportSnapshot = {
  month: string;

  income: number;
  loanEmi: number;
  creditCardBalance: number;
  creditCardLimit: number;
  otherLiabilities: number;

  score: number;
  riskLabel: "Low" | "Medium" | "High";
  evaluationType: string;
  lastUpdated: string;

  missedPayments: number;
  activeFacilities: number;
  dti: number; // %
  utilization: number; // %
  dtiLabel: "Low" | "Medium" | "High";

  factors: Factor[];
};

export default function ReportPage() {

  const handleDownload = () => {
  console.log("Download Full Report clicked:", selectedMonth);
};

  // ✅ same 6 months style you used before (you can change later to dynamic)
  const snapshots: ReportSnapshot[] = useMemo(
    () => [
      {
        month: "April",
        income: 150000,
        loanEmi: 40000,
        creditCardBalance: 180000,
        creditCardLimit: 250000,
        otherLiabilities: 10000,
        score: 55,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 39,
        utilization: 72,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30, color: "#f59e0b" },
          { name: "Debt-to-Income", value: 12, max: 25, color: "#22c55e" },
          { name: "Utilization", value: 20, max: 20, color: "#ef4444" },
          { name: "Income Stability", value: 0, max: 15, color: "#22c55e" },
          { name: "Active Facilities", value: 5, max: 10, color: "#22c55e" },
        ],
      },
      // Keep same structure for the rest (dummy variations)
      {
        month: "May",
        income: 145000,
        loanEmi: 38000,
        creditCardBalance: 160000,
        creditCardLimit: 250000,
        otherLiabilities: 12000,
        score: 58,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 37,
        utilization: 68,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30, color: "#f59e0b" },
          { name: "Debt-to-Income", value: 13, max: 25, color: "#22c55e" },
          { name: "Utilization", value: 19, max: 20, color: "#ef4444" },
          { name: "Income Stability", value: 2, max: 15, color: "#22c55e" },
          { name: "Active Facilities", value: 5, max: 10, color: "#22c55e" },
        ],
      },
      {
        month: "June",
        income: 155000,
        loanEmi: 42000,
        creditCardBalance: 190000,
        creditCardLimit: 250000,
        otherLiabilities: 9000,
        score: 52,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2025",
        missedPayments: 3,
        activeFacilities: 5,
        dti: 41,
        utilization: 76,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 17, max: 30, color: "#f59e0b" },
          { name: "Debt-to-Income", value: 12, max: 25, color: "#22c55e" },
          { name: "Utilization", value: 20, max: 20, color: "#ef4444" },
          { name: "Income Stability", value: 0, max: 15, color: "#22c55e" },
          { name: "Active Facilities", value: 6, max: 10, color: "#22c55e" },
        ],
      },
      {
        month: "July",
        income: 150000,
        loanEmi: 40000,
        creditCardBalance: 175000,
        creditCardLimit: 250000,
        otherLiabilities: 10000,
        score: 56,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 39,
        utilization: 70,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30, color: "#f59e0b" },
          { name: "Debt-to-Income", value: 12, max: 25, color: "#22c55e" },
          { name: "Utilization", value: 20, max: 20, color: "#ef4444" },
          { name: "Income Stability", value: 0, max: 15, color: "#22c55e" },
          { name: "Active Facilities", value: 5, max: 10, color: "#22c55e" },
        ],
      },
      {
        month: "August",
        income: 150000,
        loanEmi: 40000,
        creditCardBalance: 180000,
        creditCardLimit: 250000,
        otherLiabilities: 10000,
        score: 55,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 39,
        utilization: 72,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30, color: "#f59e0b" },
          { name: "Debt-to-Income", value: 12, max: 25, color: "#22c55e" },
          { name: "Utilization", value: 20, max: 20, color: "#ef4444" },
          { name: "Income Stability", value: 0, max: 15, color: "#22c55e" },
          { name: "Active Facilities", value: 5, max: 10, color: "#22c55e" },
        ],
      },
      {
        month: "September",
        income: 148000,
        loanEmi: 39000,
        creditCardBalance: 170000,
        creditCardLimit: 250000,
        otherLiabilities: 11000,
        score: 57,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 38,
        utilization: 69,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30, color: "#f59e0b" },
          { name: "Debt-to-Income", value: 12, max: 25, color: "#22c55e" },
          { name: "Utilization", value: 19, max: 20, color: "#ef4444" },
          { name: "Income Stability", value: 1, max: 15, color: "#22c55e" },
          { name: "Active Facilities", value: 5, max: 10, color: "#22c55e" },
        ],
      },
    ],
    []
  );

  const months = snapshots.map((s) => s.month);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);



  const current = useMemo(() => {
  if (!selectedMonth) return snapshots[0]; // or snapshots[snapshots.length - 1]
  return snapshots.find((s) => s.month === selectedMonth) ?? snapshots[0];
  }, [selectedMonth, snapshots]);


  return (
    <div className="space-y-1 mt-3 ml-4 mr-4">
      <CreditLensHeader
        title="Report"
        subtitle=""
        name="Kamal Edirisinghe"
        role="Public Customer"
      />

      <div className="mx-auto w-full max-w-[1180px] px-4 pb-8 pt-1 lg:px-6">
        {/* Month dropdown (top-right like screenshot) */}
        {/* Top actions row: Download (left) + Month dropdown (right) */}
<div className="mt-2 flex items-center justify-between gap-3">
  {/* Left: Month dropdown */}
  <div className="w-[190px]">
    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
      <SelectTrigger className="h-10 rounded-xl bg-white/90">
        <SelectValue placeholder="Select Month" />
      </SelectTrigger>
      <SelectContent>
        {months.map((m) => (
          <SelectItem key={m} value={m}>
            {m}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  {/* Right: Download button */}
  <Button
    onClick={handleDownload}
    className="h-10 rounded-xl bg-sky-500 px-5 text-white hover:bg-sky-600"
  >
    <Download className="mr-2 h-4 w-4" />
    Download Full Report
  </Button>
</div>



        {/* Top 4 cards */}
        <div className="mt-4 grid gap-4 lg:grid-cols-4">
          <ReportMetricCard
            title="Monthly Income"
            value={`LKR ${current.income.toLocaleString()}`}
            icon={<Banknote className="h-5 w-5" />}
            tone="green"
          />

          <ReportMetricCard
            title="Loan EMI"
            value={`LKR ${current.loanEmi.toLocaleString()}`}
            icon={<ReceiptText className="h-5 w-5" />}
            tone="orange"
          />

          <ReportMetricCard
            title="Credit Card"
            value={`LKR ${current.creditCardBalance.toLocaleString()}`}
            subValue={`Limit: LKR ${current.creditCardLimit.toLocaleString()}`}
            icon={<CreditCard className="h-5 w-5" />}
            tone="blue"
          />

          <ReportMetricCard
            title="Other Liabilities"
            value={`LKR ${current.otherLiabilities.toLocaleString()}`}
            icon={<Landmark className="h-5 w-5" />}
            tone="violet"
          />
        </div>

        {/* 3 big cards row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1.05fr_1fr]">
          {/* Credit Summary */}
          <div className="rounded-[26px] bg-white/92 p-7 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)]">
            <h3 className="text-center text-xl font-semibold text-slate-900">
              Credit Summary
            </h3>

            <div className="mt-6 flex justify-center">
              <CreditSummaryDonut score={current.score} riskLabel={current.riskLabel} />
            </div>

            <div className="mt-6 border-t pt-5 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Evaluation Type:</span>
                <span className="font-semibold text-slate-900">{current.evaluationType}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span>Risk Category:</span>
                <span className="font-semibold text-amber-600">{current.riskLabel}</span>
              </div>

              <div className="mt-5 text-center text-xs text-slate-400">
                LAST UPDATED: {current.lastUpdated}
              </div>
            </div>
          </div>

          {/* Credit Behavior & Exposure */}
          <BehaviorExposureCard snapshot={current} />

          {/* Risk Points Breakdown */}
          <RiskPointsBreakdown factors={current.factors} score={current.score} />
        </div>

        {/* Bottom footnote */}
        <div className="mt-6 text-center text-xs text-slate-400">
          This report is generated based on user provided financial data and system rules.
          <div className="mt-1">© 2024 PrimeCore CreditLens. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
