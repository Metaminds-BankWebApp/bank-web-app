"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
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

export default function LoanSenseDashboardPage() {
  const { showToast } = useToast();
  const [evaluation, setEvaluation] = useState<LoanSenseEvaluationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

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

  const policyLimitPercent = useMemo(() => {
    if (!evaluation || evaluation.monthlyIncome <= 0) {
      return 0;
    }
    return (evaluation.maxAllowedEmi / evaluation.monthlyIncome) * 100;
  }, [evaluation]);

  const dbrProgress = useMemo(() => {
    if (!evaluation || policyLimitPercent <= 0) {
      return 0;
    }
    return Math.min(100, (evaluation.dbr * 100 * 100) / policyLimitPercent);
  }, [evaluation, policyLimitPercent]);

  return (
    <main className="flex min-h-screen flex-col gap-6 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="LoanSense Dashboard" />
      <div>
        <p className="text-sm opacity-80 mt-2">
          Your personalized loan insights and recommendations
        </p>
      </div>

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
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-lg font-bold text-slate-900">Loan Eligibility Overview</h2>
            <p className="text-sm text-slate-500">
              Your comprehensive loan eligibility assessment based on current financial data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="loansense-card loansense-card-hover rounded-2xl border border-[#0B3B66]/30 bg-[linear-gradient(150deg,#0B3B66_0%,#0a2f51_100%)] p-6 text-white shadow-[0_20px_44px_-32px_rgba(3,16,36,0.8)] h-32 flex flex-col justify-between">
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

            <div className="loansense-card loansense-card-hover rounded-2xl border border-[#2f5c8f]/35 bg-[linear-gradient(150deg,#2f5c8f_0%,#21486f_100%)] p-6 text-white shadow-[0_20px_44px_-32px_rgba(3,16,36,0.7)] h-32 flex flex-col justify-between">
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

            <div className="loansense-card loansense-card-hover loansense-creditlens-shade bg-[#e0f7fa] text-[#0d3b66] p-6 rounded-2xl h-32 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium opacity-80">Max Affordable EMI</span>
                <TrendingUp size={18} className="text-[#0d3b66]/40" />
              </div>
              <div>
                <span className="text-sm font-bold opacity-60">
                  {formatCurrency(evaluation.availableEmiCapacity)}
                </span>
              </div>
            </div>

            <div className="loansense-card loansense-card-hover loansense-creditlens-shade bg-[#eef2ff] text-[#0d3b66] p-6 rounded-2xl h-32 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium opacity-80">Last Evaluation</span>
                <Calendar size={18} className="text-[#0d3b66]/40" />
              </div>
              <div>
                <span className="text-sm font-semibold opacity-80">
                  {formatDate(evaluation.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-4">Loan Categories</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {orderedLoanOptions.map((option) => (
                <Link key={option.loanResultId} href={loanTypePathMap[option.loanType]} className="block">
                  <div className="loansense-card loansense-card-hover loansense-creditlens-shade rounded-xl p-6 flex flex-col md:flex-row justify-between items-center transition-shadow cursor-pointer group">
                    <div className="w-full md:w-auto mb-4 md:mb-0">
                      <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-[#0d3b66] transition-colors">
                        {option.loanTypeLabel}
                      </h4>
                      <p className="text-sm text-slate-500 mb-3">{option.decisionReason}</p>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(
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
                    <div className="text-right w-full md:w-auto">
                      <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wide">
                        Max Loan Amount
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[#0d3b66]">
                        <span className="text-lg font-bold">
                          {formatCurrency(option.recommendedMaxAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex ml-6 text-slate-300">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="loansense-card loansense-card-hover loansense-creditlens-shade rounded-2xl p-6 h-fit">
              <h3 className="text-lg font-bold text-slate-800 mb-8">Affordability Indicators</h3>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Monthly Income</span>
                    <span className="text-slate-900">{formatCurrency(evaluation.monthlyIncome)}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Total Monthly Debt Obligations</span>
                    <span className="text-slate-900">{formatCurrency(evaluation.tmdo)}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>DBR Percentage</span>
                    <span className="text-slate-900 font-bold">{formatPercentage(evaluation.dbr)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${dbrProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Policy limit {policyLimitPercent.toFixed(1)}%
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-slate-600">Available EMI Capacity</span>
                    <span className="text-lg font-bold text-emerald-600">
                      {formatCurrency(evaluation.availableEmiCapacity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCalculationModalOpen(true)}
                  className="w-full mt-6 bg-[#2c5282] hover:bg-[#1e3a5f] text-white text-sm font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/10"
                >
                  How is this calculated?
                </button>
                <button
                  onClick={() => setIsRecommendationModalOpen(true)}
                  className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/10"
                >
                  How Can I Improve My Eligibility?
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {evaluation && isCalculationModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCalculationModalOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative loansense-creditlens-shade w-[92%] max-w-2xl rounded-2xl p-8 z-10"
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold text-[#0d3b66]">
                How Your Loan Eligibility Is Calculated
              </h2>
              <button
                onClick={() => setIsCalculationModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition text-lg"
              >
                x
              </button>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
              <div className="bg-slate-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-slate-800 mb-2">
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

              <div className="bg-slate-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-slate-800 mb-2">
                  2. Determine Your Debt Burden Ratio (DBR)
                </h3>
                <p>
                  DBR shows what percentage of your income is currently used to repay debts.
                </p>
                <p className="mt-2 font-medium text-slate-800">DBR = TMDO / Monthly Income</p>
                <p className="mt-2">Current DBR: {formatPercentage(evaluation.dbr)}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-slate-800 mb-2">3. Apply Bank Policy Limit</h3>
                <p>
                  The bank allows only a fixed portion of your income to be used for total
                  debt repayments.
                </p>
                <p className="mt-2 font-medium text-slate-800">
                  Max Allowed EMI = Monthly Income x DBR Policy Limit
                </p>
                <p className="mt-2">
                  Current Max Allowed EMI: {formatCurrency(evaluation.maxAllowedEmi)}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-slate-800 mb-2">
                  4. Calculate Available EMI Capacity
                </h3>
                <p>This is the additional monthly repayment amount you can safely afford.</p>
                <p className="mt-2 font-medium text-slate-800">
                  Available EMI = Max Allowed EMI - TMDO
                </p>
                <p className="mt-2">
                  Current Available EMI: {formatCurrency(evaluation.availableEmiCapacity)}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-slate-800 mb-2">
                  5. Apply Credit Risk Adjustment
                </h3>
                <p>
                  Your credit risk level determines how much of the calculated amount the
                  bank is willing to approve.
                </p>
                <p className="mt-2 font-medium text-slate-800">
                  Final Loan Amount = Available EMI x Tenure x Risk Multiplier
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium">
                  In summary, your eligibility is determined by your income, existing
                  financial commitments, bank policy limits, and your credit risk profile.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t pt-4">
              <button
                onClick={() => setIsCalculationModalOpen(false)}
                className="bg-[#0d3b66] hover:bg-[#082d4a] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
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
            onClick={() => setIsRecommendationModalOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative loansense-creditlens-shade w-[92%] max-w-2xl rounded-2xl p-8 z-10"
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold text-[#0d3b66]">
                Personalized Eligibility Improvement Plan
              </h2>
              <button
                onClick={() => setIsRecommendationModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition text-lg"
              >
                x
              </button>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
              <div
                className={`rounded-lg p-4 font-semibold ${getStatusSummaryClass(
                  evaluation.overallStatus
                )}`}
              >
                {getStatusMessage(evaluation.overallStatus)}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-700 mb-2">
                  If Eligible:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Maintain timely repayments on all existing loans.</li>
                  <li>Avoid increasing new debt commitments.</li>
                  <li>Keep your DBR below the policy limit.</li>
                  <li>Maintain a stable income record.</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  If Not Eligible:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Reduce total monthly debt obligations below policy limits.</li>
                  <li>Improve your credit profile with on-time repayments.</li>
                  <li>Ensure stable income for 3-6 months.</li>
                  <li>Avoid additional borrowing until DBR improves.</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-semibold text-amber-700 mb-2">
                  If Partially Eligible:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Reduce existing loan commitments to lower your DBR.</li>
                  <li>Improve repayment consistency for better risk assessment.</li>
                  <li>Increase savings or provide stronger documentation.</li>
                  <li>Consider lower EMI plans to improve approval probability.</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-medium">
                  Improving these areas can increase your eligibility score and unlock
                  higher loan amounts in future evaluations.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t pt-4">
              <button
                onClick={() => setIsRecommendationModalOpen(false)}
                className="bg-[#0d3b66] hover:bg-[#082d4a] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
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
