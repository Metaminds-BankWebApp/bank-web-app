"use client";

import React, { useMemo, useState } from "react";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";
import { Button } from "@/src/components/ui/button";
import { Download, Banknote, ReceiptText, CreditCard, Landmark } from "lucide-react";
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
  dti: number;
  utilization: number;
  dtiLabel: "Low" | "Medium" | "High";
  factors: Factor[];
};

export default function ReportPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);

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

  const current = useMemo(() => {
    if (!selectedMonth) return snapshots[0];
    return snapshots.find((s) => s.month === selectedMonth) ?? snapshots[0];
  }, [selectedMonth, snapshots]);

  const handleDownload = () => {
    console.log("Download Full Report clicked:", selectedMonth);
  };

  return (
    <div className="w-full min-h-[calc(100dvh-1.25rem)] space-y-4 overflow-x-hidden px-1 pt-2 sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <CreditLensHeader title="Report" subtitle="" name="Kamal Edirisinghe" role="Public Customer" />

      <div className="pb-6 pt-1 sm:pb-8 lg:px-2 xl:px-3">
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-[190px]">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-10 rounded-xl bg-white/90">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDownload}
            className="h-10 w-full rounded-xl bg-sky-500 px-5 text-white hover:bg-sky-600 sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
        </div>

        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1.05fr_1.05fr_1fr]">
          <div className="min-w-0 rounded-2xl bg-white/92 p-5 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)] sm:p-6 md:rounded-[26px] md:p-7">
            <h3 className="text-center text-lg font-semibold text-slate-900 sm:text-xl">Credit Summary</h3>

            <div className="mt-6 flex justify-center">
              <CreditSummaryDonut score={current.score} riskLabel={current.riskLabel} />
            </div>

            <div className="mt-6 border-t pt-5 text-sm text-slate-600">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>Evaluation Type:</span>
                <span className="font-semibold text-slate-900">{current.evaluationType}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span>Risk Category:</span>
                <span className="font-semibold text-amber-600">{current.riskLabel}</span>
              </div>

              <div className="mt-5 text-center text-xs text-slate-400">LAST UPDATED: {current.lastUpdated}</div>
            </div>
          </div>

          <BehaviorExposureCard snapshot={current} />

          <RiskPointsBreakdown factors={current.factors} score={current.score} />
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          This report is generated based on user provided financial data and system rules.
          <div className="mt-1">© 2024 PrimeCore CreditLens. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
