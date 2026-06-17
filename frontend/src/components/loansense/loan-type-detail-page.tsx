"use client";

import { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import { getLoanSenseLoanTypeDetail } from "@/src/api/loansense/bank-loansense.service";
import type { LoanSenseLoanType, LoanTypeDetailResponse } from "@/src/types/dto/bank-loansense.dto";

type LoanTypeDetailPageProps = {
  loanType: LoanSenseLoanType;
  title: string;
  subtitle: string;
};

function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `LKR ${value.toLocaleString("en-LK", {
    maximumFractionDigits: 0,
  })}`;
}

function formatRate(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${value.toFixed(2)}%`;
}

function formatDbr(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${(value * 100).toFixed(1)}%`;
}

function statusBadgeClass(status: string): string {
  if (status === "ELIGIBLE") {
    return "bg-green-100 text-green-800";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "bg-yellow-100 text-yellow-800";
  }
  return "bg-red-100 text-red-700";
}

function SummaryCard({
  label,
  value,
  variant = "light",
}: {
  label: string;
  value: string;
  variant?: "dark" | "light";
}) {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col justify-between h-full ${
        variant === "dark"
          ? "loansense-card loansense-card-hover border border-[#0B3B66]/30 bg-[linear-gradient(150deg,#0B3B66_0%,#0a2f51_100%)] text-white shadow-[0_20px_44px_-32px_rgba(3,16,36,0.8)]"
          : "loansense-card loansense-card-hover loansense-creditlens-shade text-gray-800"
      }`}
    >
      <div className="text-sm font-medium opacity-90">{label}</div>
      <div className="mt-4 text-xl font-semibold">{value}</div>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "negative" | "highlight";
}) {
  const valueClass =
    tone === "negative"
      ? "text-red-600"
      : tone === "highlight"
      ? "text-green-800 font-semibold"
      : "text-gray-800";
  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-sm text-gray-600">{label}</div>
      <div className={`text-sm ${valueClass}`}>{value}</div>
    </div>
  );
}

export default function LoanTypeDetailPage({
  loanType,
  title,
  subtitle,
}: LoanTypeDetailPageProps) {
  const { showToast } = useToast();
  const [detail, setDetail] = useState<LoanTypeDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLoanSenseLoanTypeDetail(loanType);
        if (!mounted) {
          return;
        }
        setDetail(data);
      } catch (unknownError) {
        if (!mounted) {
          return;
        }
        const message =
          unknownError instanceof ApiError
            ? unknownError.message
            : "Failed to load loan details.";
        setError(message);
        showToast({
          type: "error",
          title: "LoanSense load failed",
          description: message,
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();
    return () => {
      mounted = false;
    };
  }, [loanType, showToast]);

  const policyLimitPercent = useMemo(() => {
    if (!detail || detail.monthlyIncome <= 0) {
      return 0;
    }
    return (detail.maxAllowedEmi / detail.monthlyIncome) * 100;
  }, [detail]);

  const dbrProgress = useMemo(() => {
    if (!detail || policyLimitPercent <= 0) {
      return 0;
    }
    return Math.min(100, (detail.dbr * 100 * 100) / policyLimitPercent);
  }, [detail, policyLimitPercent]);

  return (
    <main className="flex min-h-screen flex-col gap-6 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title={title} />
      <div>
        <p className="text-sm opacity-80 mt-2">{subtitle}</p>
      </div>

      {error && !detail ? (
        <div className="loansense-card loansense-creditlens-shade rounded-xl p-6 text-red-700 border border-red-200 bg-red-50">
          {error}
        </div>
      ) : null}

      {isLoading && !detail ? (
        <div className="loansense-card loansense-creditlens-shade rounded-xl p-6 text-slate-600">
          Loading loan details...
        </div>
      ) : null}

      {detail ? (
        <>
          <section className="loansense-card loansense-creditlens-shade rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Eligibility Summary</h2>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(
                  detail.eligibilityStatus
                )}`}
              >
                {detail.eligibilityLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                label="Max Eligible Amount"
                value={formatCurrency(detail.recommendedMaxAmount)}
                variant="dark"
              />
              <SummaryCard label="Recommended Tenure" value={detail.tenureLabel || "-"} variant="dark" />
              <SummaryCard
                label="Estimated EMI"
                value={formatCurrency(detail.estimatedEmi)}
                variant="light"
              />
              <SummaryCard label="Interest" value={formatRate(detail.interestRate)} variant="light" />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="loansense-card loansense-card-hover loansense-creditlens-shade lg:col-span-2 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Affordability Breakdown</h3>

              <div className="space-y-1">
                <BreakdownRow label="Monthly Income" value={formatCurrency(detail.monthlyIncome)} />
                <BreakdownRow
                  label="Existing Loan EMIs"
                  value={`- ${formatCurrency(detail.totalExistingLoanEmi)}`}
                  tone="negative"
                />
                <BreakdownRow
                  label="Credit Card Minimum Payment"
                  value={`- ${formatCurrency(detail.creditCardMinPayment)}`}
                  tone="negative"
                />
                <BreakdownRow
                  label="Leasing / Hire Purchase Payment"
                  value={`- ${formatCurrency(detail.leasingHirePurchasePayment)}`}
                  tone="negative"
                />
                <hr className="my-2 border-t border-gray-100" />
                <BreakdownRow
                  label="Total Monthly Debt Obligations (TMDO)"
                  value={formatCurrency(detail.tmdo)}
                />
                <BreakdownRow
                  label={`Max Allowed EMI (${policyLimitPercent.toFixed(1)}% of income)`}
                  value={formatCurrency(detail.maxAllowedEmi)}
                />

                <div className="mt-4 rounded-lg p-4 bg-green-50 border border-green-100">
                  <BreakdownRow
                    label="Available EMI Capacity"
                    value={formatCurrency(detail.availableEmiCapacity)}
                    tone="highlight"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Debt Burden Ratio (DBR)</div>
                    <div className="text-sm font-semibold">{formatDbr(detail.dbr)}</div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className="h-4 bg-green-500" style={{ width: `${dbrProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="loansense-card loansense-card-hover loansense-creditlens-shade rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Adjustment</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Applied Risk Level</div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">
                    {detail.riskLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Multiplier</div>
                  <div className="text-sm font-semibold">{detail.riskMultiplier}x</div>
                </div>

                <div className="mt-2 rounded-lg bg-sky-50 p-4 border border-sky-100 text-sm text-sky-800">
                  {detail.riskAdjustmentDescription || detail.decisionReason}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
