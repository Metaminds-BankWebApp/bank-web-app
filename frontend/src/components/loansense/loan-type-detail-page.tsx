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

function formatMaximumTenure(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `Up to ${value} months`;
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

function DecisionCheck({
  label,
  value,
  outcome,
}: {
  label: string;
  value: string;
  outcome: "pass" | "caution" | "fail" | "neutral";
}) {
  const tone = {
    pass: "border-emerald-100 bg-emerald-50 text-emerald-800",
    caution: "border-amber-100 bg-amber-50 text-amber-800",
    fail: "border-red-100 bg-red-50 text-red-800",
    neutral: "border-slate-200 bg-slate-50 text-slate-700",
  }[outcome];

  return (
    <div className={`rounded-lg border p-3 ${tone}`}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function decisionSummary(status: string): string {
  if (status === "ELIGIBLE") {
    return "All required policy checks passed and LoanSense generated a recommendation for this loan .";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "Required policy checks passed, but one or more caution conditions make this recommendation more conservative.";
  }
  return "At least one required policy check failed, so LoanSense cannot recommend this loan at the moment.";
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
    if (!detail) {
      return 0;
    }
    if (detail.policyMaxDbrRatio !== null) {
      return detail.policyMaxDbrRatio * 100;
    }
    if (detail.monthlyIncome <= 0) {
      return 0;
    }
    return (detail.maxAllowedEmi / detail.monthlyIncome) * 100;
  }, [detail]);

  const dbrProgress = useMemo(() => {
    if (!detail) {
      return 0;
    }
    return Math.min(100, detail.dbr * 100);
  }, [detail]);

  const policyLimitPosition = Math.min(100, policyLimitPercent);

  const hasProductEmiCapacity = (detail?.availableEmiCapacity ?? 0) > 0;
  const isDbrWithinPolicy =
    !detail || detail.policyMaxDbrRatio === null || detail.dbr <= detail.policyMaxDbrRatio;
  const isAgeWithinPolicy =
    !detail ||
    detail.policyMinAge === null ||
    detail.policyMaxAge === null ||
    (detail.customerAge >= detail.policyMinAge && detail.customerAge <= detail.policyMaxAge);
  const meetsIncomeThreshold =
    !detail ||
    detail.policyMinIncomeRequired === null ||
    detail.monthlyIncome >= detail.policyMinIncomeRequired;

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
              <SummaryCard
                label="Maximum Repayment Tenure"
                value={formatMaximumTenure(detail.tenureMonths)}
                variant="dark"
              />
              <SummaryCard
                label="Available EMI for this loan"
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
                  label={`Product Max Allowed EMI (${policyLimitPercent.toFixed(1)}% of income)`}
                  value={formatCurrency(detail.maxAllowedEmi)}
                />

                <div className={`mt-4 rounded-lg border p-4 ${hasProductEmiCapacity ? "border-green-100 bg-green-50" : "border-red-100 bg-red-50"}`}>
                  <BreakdownRow
                    label="Available EMI Capacity for This Loan"
                    value={formatCurrency(detail.availableEmiCapacity)}
                    tone={hasProductEmiCapacity ? "highlight" : "negative"}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Debt Burden Ratio (DBR)</div>
                    <div className="text-sm font-semibold">{formatDbr(detail.dbr)}</div>
                  </div>
                  <div className="relative h-4 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-4 rounded-full ${isDbrWithinPolicy ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${dbrProgress}%` }}
                    />
                    {detail.policyMaxDbrRatio !== null ? (
                      <div
                        className="absolute -top-1 h-6 w-0.5 rounded-full bg-slate-700"
                        style={{ left: `${policyLimitPosition}%` }}
                        title={`Policy limit: ${formatDbr(detail.policyMaxDbrRatio)}`}
                      />
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className={isDbrWithinPolicy ? "text-green-700" : "text-red-700"}>
                      Current DBR: {formatDbr(detail.dbr)}
                    </span>
                    <span className="text-slate-600">
                      Policy limit: {formatDbr(detail.policyMaxDbrRatio)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    The bar shows the actual percentage of monthly income used for debt. The vertical marker shows this loan&apos;s policy limit.
                  </p>
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

          <section className="loansense-card loansense-card-hover loansense-creditlens-shade rounded-xl p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-lg font-semibold">How this loan decision was made</h3>
                <p className="mt-1 text-sm text-gray-600">{decisionSummary(detail.eligibilityStatus)}</p>
              </div>
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${statusBadgeClass(
                  detail.eligibilityStatus
                )}`}
              >
                {detail.eligibilityLabel}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DecisionCheck
                label="Policy status"
                value={detail.policyStatus === "ACTIVE" ? "Active" : "Not active"}
                outcome={detail.policyStatus === "ACTIVE" ? "pass" : "fail"}
              />
              <DecisionCheck
                label="DBR rule"
                value={`Current ${formatDbr(detail.dbr)} / Limit ${formatDbr(detail.policyMaxDbrRatio)}`}
                outcome={isDbrWithinPolicy ? "pass" : "fail"}
              />
              <DecisionCheck
                label="EMI capacity"
                value={hasProductEmiCapacity ? "Capacity available" : "No capacity available"}
                outcome={hasProductEmiCapacity ? "pass" : "fail"}
              />
              <DecisionCheck
                label="Age rule"
                value={
                  detail.policyMinAge === null || detail.policyMaxAge === null
                    ? "Policy not available"
                    : `Age ${detail.customerAge} / Allowed ${detail.policyMinAge}-${detail.policyMaxAge}`
                }
                outcome={isAgeWithinPolicy ? "pass" : "fail"}
              />
              <DecisionCheck
                label="Income rule"
                value={
                  detail.policyMinIncomeRequired === null
                    ? "No minimum income"
                    : `Income ${formatCurrency(detail.monthlyIncome)} / Minimum ${formatCurrency(detail.policyMinIncomeRequired)}`
                }
                outcome={meetsIncomeThreshold ? "pass" : "caution"}
              />
              <DecisionCheck
                label="Credit risk"
                value={`${detail.riskLabel} (${detail.riskMultiplier}x multiplier)`}
                outcome={detail.riskLevel === "HIGH" ? "caution" : "pass"}
              />
              <DecisionCheck
                label="Repayment history"
                value={`${detail.missedPaymentsCount} missed payment${detail.missedPaymentsCount === 1 ? "" : "s"}`}
                outcome={detail.missedPaymentsCount >= 3 ? "caution" : "pass"}
              />
              <DecisionCheck
                label="Asset finance cap"
                value={
                  detail.policyMaxFinancePercentage === null
                    ? "No asset-value cap"
                    : detail.assetValue === null
                    ? `${detail.policyMaxFinancePercentage}% cap; asset value not provided`
                    : `${detail.policyMaxFinancePercentage}% of ${formatCurrency(detail.assetValue)}`
                }
                outcome={
                  detail.loanType === "VEHICLE" && detail.assetValue === null
                    ? "caution"
                    : "neutral"
                }
              />
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <span className="font-semibold text-slate-800">Decision reason: </span>
              {detail.decisionReason}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
