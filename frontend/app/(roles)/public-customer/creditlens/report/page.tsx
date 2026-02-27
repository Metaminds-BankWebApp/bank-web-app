"use client";

import React, { useMemo, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Download, Banknote, ReceiptText, CreditCard, Landmark } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  ReportDownloadModal,
  type ReportFileType,
} from "@/src/components/ui/report-download-modal";
import type { RiskFactor } from "@/src/types/creditlens-report";
import ReportMetricCard from "./components/ReportMetricCard";
import CreditSummaryDonut from "./components/CreditSummaryDonut";
import BehaviorExposureCard from "./components/BehaviorExposureCard";
import RiskPointsBreakdown from "./components/RiskPointsBreakdown";

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
  factors: RiskFactor[]
};

export default function ReportPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [reportFileType, setReportFileType] = useState<ReportFileType>("pdf");

  const snapshots: ReportSnapshot[] = useMemo(
    () => [
      {
        month: "October 2024",
        income: 138000,
        loanEmi: 42500,
        creditCardBalance: 205000,
        creditCardLimit: 250000,
        otherLiabilities: 15000,
        score: 60,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 OCT 2024",
        missedPayments: 5,
        activeFacilities: 7,
        dti: 20,
        utilization: 22,
        dtiLabel: "Low",
        factors: [
          { name: "Payment History", value: 24, max: 30 },
          { name: "Debt-to-Income", value: 6, max: 25},
          { name: "Utilization", value: 6, max: 20},
          { name: "Income Stability", value: 14, max: 15},
          { name: "Active Facilities", value: 10, max: 10},
        ],
      },
      {
        month: "November 2024",
        income: 140000,
        loanEmi: 42000,
        creditCardBalance: 200000,
        creditCardLimit: 250000,
        otherLiabilities: 14500,
        score: 78,
        riskLabel: "High",
        evaluationType: "Self Assessment",
        lastUpdated: "12 NOV 2024",
        missedPayments: 5,
        activeFacilities: 7,
        dti: 44,
        utilization: 80,
        dtiLabel: "High",
        factors: [
          { name: "Payment History", value: 23, max: 30 },
          { name: "Debt-to-Income", value: 14, max: 25 },
          { name: "Utilization", value: 19, max: 20 },
          { name: "Income Stability", value: 13, max: 15 },
          { name: "Active Facilities", value: 9, max: 10 },
        ],
      },
      {
        month: "December 2024",
        income: 142000,
        loanEmi: 41800,
        creditCardBalance: 194000,
        creditCardLimit: 250000,
        otherLiabilities: 13800,
        score: 74,
        riskLabel: "High",
        evaluationType: "Self Assessment",
        lastUpdated: "12 DEC 2024",
        missedPayments: 4,
        activeFacilities: 6,
        dti: 43,
        utilization: 78,
        dtiLabel: "High",
        factors: [
          { name: "Payment History", value: 22, max: 30 },
          { name: "Debt-to-Income", value: 13, max: 25 },
          { name: "Utilization", value: 19, max: 20 },
          { name: "Income Stability", value: 12, max: 15 },
          { name: "Active Facilities", value: 8, max: 10 },
        ],
      },
      {
        month: "January 2025",
        income: 144000,
        loanEmi: 41000,
        creditCardBalance: 188000,
        creditCardLimit: 250000,
        otherLiabilities: 13000,
        score: 69,
        riskLabel: "High",
        evaluationType: "Self Assessment",
        lastUpdated: "12 JAN 2025",
        missedPayments: 4,
        activeFacilities: 6,
        dti: 41,
        utilization: 75,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 20, max: 30 },
          { name: "Debt-to-Income", value: 13, max: 25 },
          { name: "Utilization", value: 18, max: 20 },
          { name: "Income Stability", value: 10, max: 15 },
          { name: "Active Facilities", value: 8, max: 10 },
        ],
      },
      {
        month: "February 2025",
        income: 145000,
        loanEmi: 40500,
        creditCardBalance: 183000,
        creditCardLimit: 250000,
        otherLiabilities: 12500,
        score: 64,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 FEB 2025",
        missedPayments: 3,
        activeFacilities: 5,
        dti: 40,
        utilization: 73,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 19, max: 30 },
          { name: "Debt-to-Income", value: 12, max: 25 },
          { name: "Utilization", value: 17, max: 20 },
          { name: "Income Stability", value: 9, max: 15 },
          { name: "Active Facilities", value: 7, max: 10 },
        ],
      },
      {
        month: "March 2025",
        income: 147000,
        loanEmi: 40200,
        creditCardBalance: 179000,
        creditCardLimit: 250000,
        otherLiabilities: 11800,
        score: 61,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 MAR 2025",
        missedPayments: 3,
        activeFacilities: 5,
        dti: 39,
        utilization: 72,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30 },
          { name: "Debt-to-Income", value: 12, max: 25 },
          { name: "Utilization", value: 16, max: 20 },
          { name: "Income Stability", value: 8, max: 15 },
          { name: "Active Facilities", value: 7, max: 10 },
        ],
      },
      {
        month: "April 2025",
        income: 148000,
        loanEmi: 40000,
        creditCardBalance: 176000,
        creditCardLimit: 250000,
        otherLiabilities: 11200,
        score: 58,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 APR 2025",
        missedPayments: 2,
        activeFacilities: 5,
        dti: 38,
        utilization: 70,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 17, max: 30 },
          { name: "Debt-to-Income", value: 11, max: 25 },
          { name: "Utilization", value: 16, max: 20 },
          { name: "Income Stability", value: 7, max: 15 },
          { name: "Active Facilities", value: 7, max: 10 },
        ],
      },
      {
        month: "May 2025",
        income: 149000,
        loanEmi: 39800,
        creditCardBalance: 174000,
        creditCardLimit: 250000,
        otherLiabilities: 10800,
        score: 56,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 MAY 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 38,
        utilization: 69,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 17, max: 30 },
          { name: "Debt-to-Income", value: 11, max: 25 },
          { name: "Utilization", value: 15, max: 20 },
          { name: "Income Stability", value: 7, max: 15 },
          { name: "Active Facilities", value: 6, max: 10 },
        ],
      },
      {
        month: "June 2025",
        income: 150000,
        loanEmi: 39700,
        creditCardBalance: 172000,
        creditCardLimit: 250000,
        otherLiabilities: 10600,
        score: 60,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 JUN 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 37,
        utilization: 69,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30 },
          { name: "Debt-to-Income", value: 12, max: 25 },
          { name: "Utilization", value: 16, max: 20 },
          { name: "Income Stability", value: 8, max: 15 },
          { name: "Active Facilities", value: 6, max: 10 },
        ],
      },
      {
        month: "July 2025",
        income: 149000,
        loanEmi: 39500,
        creditCardBalance: 171000,
        creditCardLimit: 250000,
        otherLiabilities: 10800,
        score: 57,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 JUL 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 38,
        utilization: 68,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 17, max: 30 },
          { name: "Debt-to-Income", value: 11, max: 25 },
          { name: "Utilization", value: 16, max: 20 },
          { name: "Income Stability", value: 7, max: 15 },
          { name: "Active Facilities", value: 6, max: 10 },
        ],
      },
      {
        month: "August 2025",
        income: 148500,
        loanEmi: 39200,
        creditCardBalance: 170500,
        creditCardLimit: 250000,
        otherLiabilities: 10900,
        score: 56,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 AUG 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 39,
        utilization: 68,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 17, max: 30 },
          { name: "Debt-to-Income", value: 11, max: 25 },
          { name: "Utilization", value: 15, max: 20 },
          { name: "Income Stability", value: 7, max: 15 },
          { name: "Active Facilities", value: 6, max: 10 },
        ],
      },
      {
        month: "September 2025",
        income: 148000,
        loanEmi: 39000,
        creditCardBalance: 170000,
        creditCardLimit: 250000,
        otherLiabilities: 11000,
        score: 55,
        riskLabel: "Medium",
        evaluationType: "Self Assessment",
        lastUpdated: "12 SEP 2025",
        missedPayments: 2,
        activeFacilities: 4,
        dti: 39,
        utilization: 68,
        dtiLabel: "Medium",
        factors: [
          { name: "Payment History", value: 18, max: 30 },
          { name: "Debt-to-Income", value: 7, max: 25 },
          { name: "Utilization", value: 20, max: 20 },
          { name: "Income Stability", value: 5, max: 15 },
          { name: "Active Facilities", value: 5, max: 10 },
        ],
      },
    ],
    []
  );

  const months = snapshots.map((s) => s.month);
  const newestSnapshot = snapshots[snapshots.length - 1] ?? snapshots[0];
  const newestMonth = newestSnapshot?.month;

  const current = useMemo(() => {
    if (!selectedMonth) return newestSnapshot;
    return snapshots.find((s) => s.month === selectedMonth) ?? newestSnapshot;
  }, [newestSnapshot, selectedMonth, snapshots]);

  const reportDateStamp = useMemo(() => {
    return new Date().toISOString().slice(0, 10).replace(/-/g, "");
  }, []);

  const reportFileBaseName = useMemo(() => {
    const monthName = selectedMonth ?? current.month;
    const monthSlug = monthName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `creditlens-report-${monthSlug}-${reportDateStamp}`;
  }, [current.month, reportDateStamp, selectedMonth]);

  const handleDownload = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="w-full min-h-[calc(100dvh-1.25rem)] space-y-4 overflow-x-hidden px-1 pt-2 sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Report" subtitle="" name="Kamal Edirisinghe" role="Public Customer" />

      <div className="pb-6 pt-1 sm:pb-8 lg:px-2 xl:px-3">
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-[220px]">
            <Select value={selectedMonth ?? newestMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-10 rounded-xl bg-white/90">
                <SelectValue placeholder="Select Month & Year" />
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

        <div className="creditlens-stagger-4 mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="creditlens-stagger-3 mt-6 grid min-w-0 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1.05fr_1.05fr_1fr]">
          <div className="creditlens-card creditlens-card-hover min-w-0 rounded-2xl bg-white/92 p-5 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)] sm:p-6 md:rounded-[26px] md:p-7">
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

      <ReportDownloadModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        fileBaseName={reportFileBaseName}
        fileType={reportFileType}
        onFileTypeChange={setReportFileType}
        monthLabel={selectedMonth ?? current.month}
        score={current.score}
        riskLabel={current.riskLabel}
      />
    </div>
  );
}



