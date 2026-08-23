"use client";
/**
 * LoanSense overview page for bank customers, showing overall eligibility, risk indicators, and loan-category recommendations.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CarFront,
  Calendar,
  CheckCircle2,
  GraduationCap,
  HandCoins,
  House,
  TrendingUp,
} from "lucide-react";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import { getCurrentLoanSenseEvaluation } from "@/src/api/loansense/bank-loansense.service";
import type {
  LoanSenseEligibilityStatus,
  LoanSenseEvaluationResponse,
  LoanSenseLoanOptionResponse,
  LoanSenseLoanType,
} from "@/src/types/dto/bank-loansense.dto";

const loanTypePathMap: Record<LoanSenseLoanType, string> = {
  PERSONAL: "/bank-customer/loansense/personal",
  VEHICLE: "/bank-customer/loansense/vehicle",
  EDUCATION: "/bank-customer/loansense/education",
  HOUSING: "/bank-customer/loansense/housing",
};

const loanTypeOrder: LoanSenseLoanType[] = [
  "PERSONAL",
  "VEHICLE",
  "EDUCATION",
  "HOUSING",
];

function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `LKR ${value.toLocaleString("en-LK", {
    maximumFractionDigits: 0,
  })}`;
}

function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${(value * 100).toFixed(1)}%`;
}

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "-";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function getStatusBadgeClass(status: LoanSenseEligibilityStatus): string {
  if (status === "ELIGIBLE") {
    return "text-emerald-500 bg-emerald-50";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "text-amber-500 bg-amber-50";
  }
  return "text-red-500 bg-red-50";
}

function getStatusPillClass(status: LoanSenseEligibilityStatus): string {
  if (status === "ELIGIBLE") {
    return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "bg-amber-500/20 text-amber-200 border border-amber-500/30";
  }
  return "bg-red-500/20 text-red-200 border border-red-500/30";
}

function getStatusIcon(status: LoanSenseEligibilityStatus) {
  if (status === "ELIGIBLE") {
    return <CheckCircle2 size={12} />;
  }
  return <AlertCircle size={12} />;
}

function getStatusMessage(status: LoanSenseEligibilityStatus): string {
  if (status === "ELIGIBLE") {
    return "Overall Status: You are currently eligible.";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "Overall Status: You are partially eligible.";
  }
  return "Overall Status: You are currently not eligible.";
}

function getStatusSummaryClass(status: LoanSenseEligibilityStatus): string {
  if (status === "ELIGIBLE") {
    return "bg-emerald-50 border border-emerald-200 text-emerald-700";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "bg-amber-50 border border-amber-200 text-amber-700";
  }
  return "bg-red-50 border border-red-200 text-red-700";
}

function getLoanCategoryIcon(loanType: LoanSenseLoanType) {
  const iconProps = { size: 20, strokeWidth: 1.8 };

  if (loanType === "PERSONAL") {
    return <HandCoins {...iconProps} />;
  }
  if (loanType === "VEHICLE") {
    return <CarFront {...iconProps} />;
  }
  if (loanType === "EDUCATION") {
    return <GraduationCap {...iconProps} />;
  }
  return <House {...iconProps} />;
}

function getLoanCategoryAccent(loanType: LoanSenseLoanType): string {
  if (loanType === "PERSONAL") {
    return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-200";
  }
  if (loanType === "VEHICLE") {
    return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/25 dark:bg-violet-400/10 dark:text-violet-200";
  }
  if (loanType === "EDUCATION") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200";
  }
  return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200";
}

// Main dashboard component showing overall and per-loan eligibility insights.
export default function LoanSenseDashboardPage() {
  const { showToast } = useToast();
  const [evaluation, setEvaluation] = useState<LoanSenseEvaluationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);

  const openCalculationModal = () => {
    setIsRecommendationModalOpen(false);
    setIsCalculationModalOpen(true);
  };

  const openRecommendationModal = () => {
    setIsCalculationModalOpen(false);
    setIsRecommendationModalOpen(true);
  };

  const closeModal = () => {
    setIsCalculationModalOpen(false);
    setIsRecommendationModalOpen(false);
  };

  useEffect(() => {
    let mounted = true;

    // Loads data required by this view and updates local state.
    const loadEvaluation = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCurrentLoanSenseEvaluation();
        if (!mounted) {
          return;
        }
        setEvaluation(data);
      } catch (unknownError) {
        if (!mounted) {
          return;
        }
        const message =
          unknownError instanceof ApiError
            ? unknownError.message
            : "Failed to load LoanSense dashboard.";
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

    void loadEvaluation();
    return () => {
      mounted = false;
    };
  }, [showToast]);

  // Builds derived UI values from API data to keep rendering simple.
  const orderedLoanOptions = useMemo(() => {
    if (!evaluation) {
      return [] as LoanSenseLoanOptionResponse[];
    }

    const optionMap = new Map<LoanSenseLoanType, LoanSenseLoanOptionResponse>();
    evaluation.loanOptions.forEach((option) => {
      optionMap.set(option.loanType, option);
    });

    return loanTypeOrder
      .map((loanType) => optionMap.get(loanType))
      .filter((option): option is LoanSenseLoanOptionResponse => Boolean(option));
  }, [evaluation]);

  return (
    <main className="flex min-h-screen flex-col gap-6 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="LoanSense Dashboard" />
      

      {error && !evaluation ? (
        <div className="loansense-card loansense-creditlens-shade rounded-xl p-6 text-red-700 border border-red-200 bg-red-50">
          {error}
        </div>
      ) : null}

      {isLoading && !evaluation ? (
        <div className="loansense-card loansense-creditlens-shade rounded-xl p-6 text-slate-600">
          Loading LoanSense dashboard...
        </div>
      ) : null}

      {evaluation ? (
        <div>
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Loan Eligibility Overview</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                A summary of your current borrowing capacity and financial position.
              </p>
            </div>
          
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="loansense-card loansense-card-hover flex min-h-[120px] flex-col justify-between rounded-2xl border border-[#0B3B66]/30 bg-[linear-gradient(150deg,#0B3B66_0%,#0a2f51_100%)] p-5 text-white shadow-[0_20px_44px_-32px_rgba(3,16,36,0.8)]">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium opacity-90">Overall Eligibility</span>
                <CheckCircle2 size={18} className="text-emerald-400" />
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusPillClass(
                    evaluation.overallStatus
                  )}`}
                >
                  {getStatusIcon(evaluation.overallStatus)}
                  {evaluation.overallStatusLabel}
                </span>
              </div>
            </div>

            <div className="loansense-card loansense-card-hover flex min-h-[120px] flex-col justify-between rounded-2xl border border-[#2f5c8f]/35 bg-[linear-gradient(150deg,#2f5c8f_0%,#21486f_100%)] p-5 text-white shadow-[0_20px_44px_-32px_rgba(3,16,36,0.7)]">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium opacity-90">Credit Risk Level</span>
                <TrendingUp size={18} className="text-white/60" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {evaluation.riskLabel}
                </span>
              </div>
            </div>

            <div className="loansense-card loansense-card-hover loansense-creditlens-shade flex min-h-[120px] flex-col justify-between rounded-2xl p-5 text-[#0d3b66]">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium opacity-80">Current Debt Burden Ratio</span>
                <TrendingUp size={18} className="text-[#0d3b66]/40" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight">
                  {formatPercentage(evaluation.dbr)}
                </span>
                <p className="mt-1 text-xs font-medium opacity-60">of monthly income committed</p>
              </div>
            </div>

            <div className="loansense-card loansense-card-hover loansense-creditlens-shade flex min-h-[120px] flex-col justify-between rounded-2xl p-5 text-[#0d3b66]">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium opacity-80">Last Evaluation</span>
                <Calendar size={18} className="text-[#0d3b66]/40" />
              </div>
              <div>
                <span className="text-base font-bold">
                  {formatDate(evaluation.createdAt)}
                </span>
                <p className="mt-1 text-xs font-medium opacity-60">based on the latest data</p>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Loan Categories</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Explore recommendations tailored to each lending category.
              </p>
            </div>
           
          </div>

          <div
            className={`grid grid-cols-1 gap-6 ${
              isCalculationModalOpen || isRecommendationModalOpen
                ? ""
                : "xl:grid-cols-[minmax(0,1fr)_20rem]"
            }`}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {orderedLoanOptions.map((option) => (
                <Link
                  key={option.loanResultId}
                  href={loanTypePathMap[option.loanType]}
                  className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c5282] focus-visible:ring-offset-2"
                >
                  <div className="loansense-card loansense-card-hover loansense-creditlens-shade flex h-full min-h-[258px] flex-col rounded-2xl p-5 transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${getLoanCategoryAccent(option.loanType)}`}>
                        {getLoanCategoryIcon(option.loanType)}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${getStatusBadgeClass(
                          option.eligibilityStatus
                        )}`}
                      >
                        {option.eligibilityStatus === "ELIGIBLE" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <AlertCircle size={12} />
                        )}
                        {option.eligibilityLabel}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-[#0d3b66] dark:text-slate-100 dark:group-hover:text-blue-300">
                        {option.loanTypeLabel}
                      </h4>
                      <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-300">
                        {option.decisionReason}
                      </p>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-200/80 py-3 text-xs dark:border-slate-500/35">
                     
                      <div className="col-span-2 flex items-center justify-between gap-3">
                        <dt className="font-medium text-slate-500 dark:text-slate-300">Policy DBR limit</dt>
                        <dd className="mt-1 font-bold text-slate-800 dark:text-slate-100">
                          {formatPercentage(option.policyMaxDbrRatio)}
                        </dd>
                      </div>
                      <div className="col-span-2 flex items-center justify-between gap-3">
                        <dt className="font-medium text-slate-500 dark:text-slate-300">Available monthly EMI</dt>
                        <dd className="font-bold text-[#0d3b66] dark:text-blue-300">
                          {formatCurrency(option.availableEmiCapacity)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-300">
                          Recommended maximum
                        </p>
                        <p className="mt-1 text-lg font-bold text-[#0d3b66] dark:text-blue-300">
                          {formatCurrency(option.recommendedMaxAmount)}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2c5282] transition-transform group-hover:translate-x-1 dark:text-blue-300">
                        View details <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {!isCalculationModalOpen && !isRecommendationModalOpen ? (
              <aside className="loansense-card loansense-card-hover loansense-creditlens-shade h-fit rounded-2xl p-5 xl:sticky xl:top-6">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Shared Financial Inputs</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">
                  The financial details used for each recommendation.
                </p>
              </div>

              <div className="space-y-5">
                <dl className="divide-y divide-slate-200/80 rounded-xl border border-slate-200/80 bg-white/45 px-4 dark:divide-slate-500/35 dark:border-slate-500/35 dark:bg-slate-950/10">
                  <div className="flex justify-between gap-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-300">
                    <span>Monthly Income</span>
                    <span className="text-right text-slate-900 dark:text-slate-100">{formatCurrency(evaluation.monthlyIncome)}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-300">
                    <span>Total Monthly Debt Obligations</span>
                    <span className="text-right text-slate-900 dark:text-slate-100">{formatCurrency(evaluation.tmdo)}</span>
                  </div>
                </dl>

                <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-900">
                  <p className="font-semibold">Current DBR: {formatPercentage(evaluation.dbr)}</p>
                  <p className="mt-1 text-xs leading-5">
                    Monthly income and debt obligations are shared. Each loan applies its own
                    DBR limit, tenure, income, age, funding, and interest-rate policy to these inputs.
                  </p>
                </div>

                <div className="grid gap-3 pt-1">
                  <button
                    onClick={openCalculationModal}
                    className="w-full rounded-lg bg-[#2c5282] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition-colors hover:bg-[#1e3a5f]"
                  >
                    How is this calculated?
                  </button>
                  <button
                    onClick={openRecommendationModal}
                    className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition-colors hover:bg-emerald-700"
                  >
                    Improve my eligibility
                  </button>
                </div>
              </div>
              </aside>
            ) : null}
          </div>
        </div>
      ) : null}

      {evaluation && isCalculationModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="loan-guidance-title"
            className="relative loansense-creditlens-shade z-10 w-[92%] max-w-2xl rounded-2xl p-8"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <div>
                <h2 id="loan-guidance-title" className="text-xl font-semibold text-[#0d3b66]">How Your Loan Eligibility Is Calculated</h2>
                <p className="hidden mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Understand how your financial information and loan policies are used.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close loan guidance"
                onClick={closeModal}
                className="text-lg text-slate-400 transition hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="LoanSense information">
              <button
                type="button"
                role="tab"
                aria-selected="true"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#0d3b66] shadow-sm"
              >
                How is this calculated?
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                onClick={openRecommendationModal}
                className="rounded-md px-3 py-2 text-sm font-semibold text-slate-500 transition hover:text-[#0d3b66]"
              >
                Improve my eligibility
              </button>
            </div>

            <div className="max-h-[65vh] space-y-6 overflow-y-auto pr-2 text-sm leading-relaxed text-slate-700">
                <div className="hidden space-y-5">
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-100">
                    Your eligibility combines income, current debt obligations, each loan&apos;s policy limit, and your credit-risk assessment.
                  </div>

                  <ol className="grid gap-3 sm:grid-cols-2">
                    <li className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                      <span className="text-xs font-bold text-[#2c5282] dark:text-blue-300">01</span>
                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">Measure monthly debt</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">We total your existing loan EMIs, leasing payments, and credit-card minimum payments.</p>
                      <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">Current TMDO: {formatCurrency(evaluation.tmdo)}</p>
                    </li>
                    <li className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                      <span className="text-xs font-bold text-[#2c5282] dark:text-blue-300">02</span>
                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">Calculate your DBR</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">DBR shows the portion of your monthly income already committed to debt repayment.</p>
                      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white">DBR = TMDO ÷ Monthly Income</p>
                    </li>
                    <li className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                      <span className="text-xs font-bold text-[#2c5282] dark:text-blue-300">03</span>
                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">Apply loan policy</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">Each category has its own permitted DBR, tenure, income, age, funding, and interest-rate policy.</p>
                    </li>
                    <li className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                      <span className="text-xs font-bold text-[#2c5282] dark:text-blue-300">04</span>
                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">Recommend a loan amount</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">Available EMI capacity, policy rules, and risk factors determine the amount we can recommend.</p>
                    </li>
                  </ol>

                  <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">Loan-by-loan policy reference</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {orderedLoanOptions.map((option) => (
                        <div key={option.loanResultId} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{option.loanTypeLabel}</h4>
                            <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${getStatusBadgeClass(option.eligibilityStatus)}`}>
                              {option.eligibilityLabel}
                            </span>
                          </div>
                          <dl className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                            <div className="flex justify-between gap-3"><dt>Policy DBR limit</dt><dd className="font-bold text-slate-900 dark:text-white">{formatPercentage(option.policyMaxDbrRatio)}</dd></div>
                            <div className="flex justify-between gap-3"><dt>Available EMI</dt><dd className="font-bold text-slate-900 dark:text-white">{formatCurrency(option.availableEmiCapacity)}</dd></div>
                          </dl>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-slate-50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-800">
                    1. Calculate Total Monthly Debt Obligations (TMDO)
                  </h3>
                  <p>
                    We calculate how much you already pay each month for existing financial
                    commitments.
                  </p>
                  <p className="mt-2 font-medium text-slate-800">
                    TMDO = Loan EMIs + Leasing Payments + Credit Card Minimum Payments
                  </p>
                  <p className="mt-2">Current TMDO: {formatCurrency(evaluation.tmdo)}</p>
                </div>

                <div className="rounded-lg border bg-slate-50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-800">
                    2. Determine Your Debt Burden Ratio (DBR)
                  </h3>
                  <p>
                    DBR shows what percentage of your income is currently used to repay debts.
                  </p>
                  <p className="mt-2 font-medium text-slate-800">DBR = TMDO / Monthly Income</p>
                  <p className="mt-2">Current DBR: {formatPercentage(evaluation.dbr)}</p>
                </div>

                <div className="rounded-lg border bg-slate-50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-800">3. Apply the Policy for Each Loan</h3>
                  <p>
                    Every loan uses its own DBR limit. Personal, Vehicle, Education, and Housing
                    loans can therefore have different allowed EMI amounts.
                  </p>
                  <p className="mt-2 font-medium text-slate-800">
                    Loan Max Allowed EMI = Monthly Income x That Loan&apos;s DBR Policy Limit
                  </p>
                </div>

                <div className="rounded-lg border bg-slate-50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-800">
                    4. Calculate Loan-specific Available EMI Capacity
                  </h3>
                  <p>
                    The same debt obligations are compared with each loan&apos;s allowed EMI amount.
                    This capacity can be different for every loan type.
                  </p>
                  <p className="mt-2 font-medium text-slate-800">
                    Loan Available EMI = Loan Max Allowed EMI - TMDO
                  </p>
                </div>

                <div className="rounded-lg border bg-slate-50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-800">
                    5. Calculate the Loan Recommendation and Status
                  </h3>
                  <p>
                    Each loan then applies its tenure, interest rate, risk multiplier, age,
                    minimum-income, asset-finance, and repayment-history rules.
                  </p>
                  <p className="mt-2 font-medium text-slate-800">
                    Final Loan Amount = Loan Available EMI x Loan Tenure x Risk Multiplier
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {orderedLoanOptions.map((option) => (
                    <div key={option.loanResultId} className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-slate-800">{option.loanTypeLabel}</h3>
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(option.eligibilityStatus)}`}>
                          {option.eligibilityLabel}
                        </span>
                      </div>
                      <dl className="mt-3 space-y-1 text-xs text-slate-600">
                        <div className="flex justify-between gap-3">
                          <dt>DBR limit</dt>
                          <dd className="font-semibold text-slate-800">{formatPercentage(option.policyMaxDbrRatio)}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt>Max allowed EMI</dt>
                          <dd className="font-semibold text-slate-800">{formatCurrency(option.maxAllowedEmi)}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt>Available EMI</dt>
                          <dd className="font-semibold text-slate-800">{formatCurrency(option.availableEmiCapacity)}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-900">
                    In summary, your eligibility is determined by your income, existing financial
                    commitments, bank policy limits, and your credit risk profile.
                  </p>
                </div>
            </div>

            <div className="mt-8 flex justify-end border-t pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#082d4a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {evaluation && isRecommendationModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative loansense-creditlens-shade z-10 w-[92%] max-w-2xl rounded-2xl p-8"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-semibold text-[#0d3b66]">
                Personalized Eligibility Improvement Plan
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-lg text-slate-400 transition hover:text-slate-700"
              >
                x
              </button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="LoanSense information">
              <button
                type="button"
                role="tab"
                aria-selected="false"
                onClick={openCalculationModal}
                className="rounded-md px-3 py-2 text-sm font-semibold text-slate-500 transition hover:text-[#0d3b66]"
              >
                How is this calculated?
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="true"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#0d3b66] shadow-sm"
              >
                Improve my eligibility
              </button>
            </div>

            <div className="max-h-[65vh] space-y-6 overflow-y-auto pr-2 text-sm leading-relaxed text-slate-700">
              <div className={`rounded-lg p-4 font-semibold ${getStatusSummaryClass(evaluation.overallStatus)}`}>
                {getStatusMessage(evaluation.overallStatus)}
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="mb-2 font-semibold text-emerald-700">If Eligible:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Maintain timely repayments on all existing loans.</li>
                  <li>Avoid increasing new debt commitments.</li>
                  <li>Keep your DBR below the policy limit.</li>
                  <li>Maintain a stable income record.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="mb-2 font-semibold text-red-700">If Not Eligible:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Reduce total monthly debt obligations below policy limits.</li>
                  <li>Improve your credit profile with on-time repayments.</li>
                  <li>Ensure stable income for 3-6 months.</li>
                  <li>Avoid additional borrowing until DBR improves.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="mb-2 font-semibold text-amber-700">If Partially Eligible:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Reduce existing loan commitments to lower your DBR.</li>
                  <li>Improve repayment consistency for better risk assessment.</li>
                  <li>Increase savings or provide stronger documentation.</li>
                  <li>Consider lower EMI plans to improve approval probability.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="font-medium text-blue-900">
                  Improving these areas can increase your eligibility score and unlock higher
                  loan amounts in future evaluations.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#082d4a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}


