"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import {
  getPublicCreditEvaluationHistory,
  getPublicCreditReport,
  downloadPublicCreditReportPdf,
} from "@/src/api/creditlens/public-creditlens.service";
import {
  getMyPublicCustomerProfile,
  getPublicCustomerFinancialRecordById,
} from "@/src/api/customers/public-customer-financial.service";
import { useToast } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import type { CreditReportResponse } from "@/src/types/dto/public-creditlens.dto";
import ReportMetricCard from "./components/ReportMetricCard";
import CreditSummaryDonut from "./components/CreditSummaryDonut";
import BehaviorExposureCard from "./components/BehaviorExposureCard";
import RiskPointsBreakdown from "./components/RiskPointsBreakdown";

type LabelTone = "Low" | "Medium" | "High";

type ReportSnapshot = {
  evaluationId: number;
  month: string;
  income: number;
  loanEmi: number;
  loanRemainingBalance: number | null;
  creditCardBalance: number;
  creditCardLimit: number;
  otherLiabilities: number;
  score: number;
  riskLabel: LabelTone;
  evaluationType: string;
  lastUpdated: string;
  missedPayments: number;
  activeFacilities: number;
  dti: number;
  utilization: number;
  dtiLabel: LabelTone;
  factors: RiskFactor[];
};

/**
 * Public-customer CreditLens report page.
 * It combines monthly report snapshots, additional financial-record details, and export actions.
 */
export default function ReportPage() {
  const { showToast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [reportFileType, setReportFileType] = useState<ReportFileType>("pdf");
  const [isDownloadingReport, setIsDownloadingReport] = useState(false);
  const [snapshots, setSnapshots] = useState<ReportSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadReport = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const report = await getPublicCreditReport();
        const mappedSnapshots = await mapReportSnapshots(report);

        if (isActive) {
          setSnapshots(mappedSnapshots);
        }
      } catch (unknownError) {
        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load your CreditLens report.";
        if (isActive) {
          setError(message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadReport();

    return () => {
      isActive = false;
    };
  }, []);

  const months = snapshots.map((snapshot) => snapshot.month);
  const newestSnapshot = snapshots[snapshots.length - 1] ?? null;
  const newestMonth = newestSnapshot?.month;

  const current = useMemo(() => {
    if (!newestSnapshot) {
      return null;
    }
    if (!selectedMonth) {
      return newestSnapshot;
    }
    return snapshots.find((snapshot) => snapshot.month === selectedMonth) ?? newestSnapshot;
  }, [newestSnapshot, selectedMonth, snapshots]);

  const reportDateStamp = useMemo(() => {
    return new Date().toISOString().slice(0, 10).replace(/-/g, "");
  }, []);

  const reportFileBaseName = useMemo(() => {
    const monthName = (selectedMonth ?? current?.month ?? "report")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `creditlens-report-${monthName}-${reportDateStamp}`;
  }, [current?.month, reportDateStamp, selectedMonth]);

  const handleDownload = () => {
    setIsDownloadModalOpen(true);
  };

  const handleConfirmDownload = async ({ fullFileName }: { fileType: ReportFileType; fullFileName: string }) => {
    if (!current) {
      return;
    }

    try {
      setIsDownloadingReport(true);
      const blob = await downloadPublicCreditReportPdf(current.evaluationId);
      downloadBlob(fullFileName, blob);
      setIsDownloadModalOpen(false);
      showToast({
        type: "success",
        title: "Report downloaded",
        description: fullFileName,
      });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError
        ? unknownError
        : new ApiError({
          message: unknownError instanceof Error
            ? unknownError.message
            : "Unable to prepare your CreditLens PDF report.",
          code: "UNKNOWN_ERROR",
        });

      showToast({
        type: "error",
        title: "Download failed",
        description: apiError.message,
      });
    } finally {
      setIsDownloadingReport(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100dvh-1.25rem)] space-y-4 overflow-x-hidden px-1 pt-2 sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Report" subtitle="" name="Kamal Edirisinghe" role="Public Customer" />

      {isLoading && !current ? (
        <StateCard
          title="Loading report"
          description="Preparing your monthly CreditLens snapshots and detailed breakdown."
        />
      ) : error && !current ? (
        <StateCard
          title="Could not load report"
          description={error}
        />
      ) : current ? (
        <>
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
                Download PDF Report
              </Button>
            </div>

            <div className="creditlens-stagger-4 mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ReportMetricCard
                title="Monthly Income"
                value={formatCurrency(current.income)}
                icon={<Banknote className="h-5 w-5" />}
                tone="green"
              />

              <ReportMetricCard
                title="Loan"
                value={`EMI: ${formatCurrency(current.loanEmi)}`}
                subValue={current.loanRemainingBalance != null
                  ? `Remaining Balance: ${formatCurrency(current.loanRemainingBalance)}`
                  : "Remaining Balance: Not available"}
                icon={<ReceiptText className="h-5 w-5" />}
                tone="orange"
              />

              <ReportMetricCard
                title="Credit Card"
                value={formatCurrency(current.creditCardBalance)}
                subValue={`Limit: ${formatCurrency(current.creditCardLimit)}`}
                icon={<CreditCard className="h-5 w-5" />}
                tone="blue"
              />

              <ReportMetricCard
                title="Other Liabilities"
                value={formatCurrency(current.otherLiabilities)}
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
            supportedFileTypes={["pdf"]}
            isDownloading={isDownloadingReport}
            onDownload={handleConfirmDownload}
            monthLabel={selectedMonth ?? current.month}
            score={current.score}
            riskLabel={current.riskLabel}
          />
        </>
      ) : (
        <StateCard
          title="No report data yet"
          description="Generate a CreditLens evaluation first to unlock your report snapshots."
        />
      )}
    </div>
  );
}

async function mapReportSnapshots(report: CreditReportResponse): Promise<ReportSnapshot[]> {
  const remainingBalanceByEvaluationId = await loadRemainingBalances(report);

  return report.snapshots.map((snapshot) => ({
    evaluationId: snapshot.evaluationId,
    month: snapshot.monthLabel,
    income: snapshot.income,
    loanEmi: snapshot.loanEmi,
    loanRemainingBalance: remainingBalanceByEvaluationId.get(snapshot.evaluationId) ?? null,
    creditCardBalance: snapshot.creditCardBalance,
    creditCardLimit: snapshot.creditCardLimit,
    otherLiabilities: snapshot.otherLiabilities,
    score: snapshot.score,
    riskLabel: normalizeLabel(snapshot.riskLabel),
    evaluationType: snapshot.evaluationType,
    lastUpdated: snapshot.lastUpdatedLabel,
    missedPayments: snapshot.missedPayments,
    activeFacilities: snapshot.activeFacilities,
    dti: roundMetric(snapshot.dtiPercentage),
    utilization: roundMetric(snapshot.utilizationPercentage),
    dtiLabel: normalizeLabel(snapshot.dtiLabel),
    factors: snapshot.factors.map((factor) => ({
      name: factor.name,
      value: factor.value,
      max: factor.max,
    })),
  }));
}

async function loadRemainingBalances(report: CreditReportResponse): Promise<Map<number, number | null>> {
  try {
    const [profile, evaluationHistory] = await Promise.all([
      getMyPublicCustomerProfile(),
      getPublicCreditEvaluationHistory(),
    ]);

    const recordIdByEvaluationId = new Map(
      evaluationHistory.map((item) => [item.selfEvaluationId, item.publicRecordId]),
    );

    const uniqueRecordIds = Array.from(
      new Set(
        report.snapshots
          .map((snapshot) => recordIdByEvaluationId.get(snapshot.evaluationId))
          .filter((recordId): recordId is number => typeof recordId === "number"),
      ),
    );

    const records = await Promise.all(
      uniqueRecordIds.map((recordId) =>
        getPublicCustomerFinancialRecordById(profile.publicCustomerId, recordId),
      ),
    );

    const remainingBalanceByRecordId = new Map(
      records.map((record) => [
        record.recordId,
        record.loans.reduce((sum, loan) => sum + loan.remainingBalance, 0),
      ]),
    );

    return new Map(
      report.snapshots.map((snapshot) => {
        const recordId = recordIdByEvaluationId.get(snapshot.evaluationId);
        return [
          snapshot.evaluationId,
          typeof recordId === "number" ? (remainingBalanceByRecordId.get(recordId) ?? null) : null,
        ];
      }),
    );
  } catch {
    return new Map();
  }
}

function normalizeLabel(value?: string): LabelTone {
  const normalized = (value ?? "").trim().toLowerCase();
  if (normalized === "low") {
    return "Low";
  }
  if (normalized === "high") {
    return "High";
  }
  return "Medium";
}

function roundMetric(value: number): number {
  return Number(value.toFixed(1));
}

function formatCurrency(value: number): string {
  return `LKR ${value.toLocaleString()}`;
}

function downloadBlob(filename: string, blob: Blob) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}

/**
 * Reusable empty, loading, and error state shell for the report page.
 */
function StateCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pb-6 pt-1 sm:pb-8 lg:px-2 xl:px-3">
      <div className="creditlens-card rounded-2xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-[0_20px_55px_-35px_rgba(2,44,67,0.35)] md:rounded-[26px]">
        <div className="mx-auto max-w-xl space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
