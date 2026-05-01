"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { useToast } from "@/src/components/ui";
import {
  getAdminLoanPolicies,
  updateAdminLoanPolicyInterestRates,
} from "@/src/api/admin/loan-policy.service";
import { ApiError } from "@/src/types/api-error";
import type {
  AdminLoanPolicyResponse,
  AdminLoanPolicyType,
} from "@/src/types/dto/admin-loan-policy.dto";

type LoanCard = {
  policyId: number;
  loanType: AdminLoanPolicyType;
  title: string;
  description: string;
  rate: number;
  cardClassName: string;
  contentClassName: string;
  dividerClassName: string;
};

const loanTypeOrder: AdminLoanPolicyType[] = [
  "PERSONAL",
  "VEHICLE",
  "EDUCATION",
  "HOUSING",
];

const loanPresentationMap: Record<
  AdminLoanPolicyType,
  Omit<LoanCard, "policyId" | "loanType" | "rate">
> = {
  PERSONAL: {
    title: "Personal Loan",
    description: "Flexible personal financing for day-to-day needs.",
    cardClassName: "bg-[#0d3b66]",
    contentClassName: "text-white",
    dividerClassName: "bg-white/30",
  },
  VEHICLE: {
    title: "Vehicle Loan",
    description: "Auto financing with competitive repayment terms.",
    cardClassName: "bg-[#446892]",
    contentClassName: "text-white",
    dividerClassName: "bg-white/30",
  },
  EDUCATION: {
    title: "Educational Loan",
    description: "Loan support for tuition and educational expenses.",
    cardClassName: "bg-[#6f8fb6]",
    contentClassName: "text-white",
    dividerClassName: "bg-white/30",
  },
  HOUSING: {
    title: "Housing Loan",
    description: "Home ownership financing with long-term plans.",
    cardClassName: "bg-[#9fb1c9]",
    contentClassName: "text-[#15375f]",
    dividerClassName: "bg-[#15375f]/30",
  },
};

function normalizeRate(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Number(Math.min(100, Math.max(0, value)).toFixed(2));
}

function cloneLoanCards(loans: LoanCard[]): LoanCard[] {
  return loans.map((loan) => ({ ...loan }));
}

function mapPoliciesToCards(policies: AdminLoanPolicyResponse[]): LoanCard[] {
  const policiesByType = new Map<AdminLoanPolicyType, AdminLoanPolicyResponse>();
  policies.forEach((policy) => {
    policiesByType.set(policy.loanType, policy);
  });

  return loanTypeOrder
    .map((loanType) => {
      const policy = policiesByType.get(loanType);
      if (!policy) {
        return null;
      }

      const presentation = loanPresentationMap[loanType];
      return {
        policyId: policy.policyId,
        loanType,
        title: presentation.title,
        description: presentation.description,
        rate: normalizeRate(Number(policy.baseInterestRate)),
        cardClassName: presentation.cardClassName,
        contentClassName: presentation.contentClassName,
        dividerClassName: presentation.dividerClassName,
      };
    })
    .filter((loan): loan is LoanCard => loan !== null);
}

export default function PolicyManagementPage() {
  const { showToast } = useToast();
  const [loans, setLoans] = useState<LoanCard[]>([]);
  const [savedLoans, setSavedLoans] = useState<LoanCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadPolicies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAdminLoanPolicies();
        if (!mounted) {
          return;
        }

        const mapped = mapPoliciesToCards(data);
        setLoans(mapped);
        setSavedLoans(cloneLoanCards(mapped));

        if (mapped.length === 0) {
          showToast({
            type: "info",
            title: "No policies found",
            description: "No loan policies are available to configure yet.",
          });
        }
      } catch (unknownError) {
        if (!mounted) {
          return;
        }

        const message =
          unknownError instanceof ApiError
            ? unknownError.message
            : "Failed to load loan policies.";
        setError(message);
        setLoans([]);
        setSavedLoans([]);
        showToast({
          type: "error",
          title: "Load failed",
          description: message,
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadPolicies();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  const hasUnsavedChanges = useMemo(() => {
    if (loans.length !== savedLoans.length) {
      return true;
    }

    const savedRates = new Map(savedLoans.map((loan) => [loan.policyId, loan.rate]));
    return loans.some((loan) => savedRates.get(loan.policyId) !== loan.rate);
  }, [loans, savedLoans]);

  const handleRateChange = (policyId: number, value: string) => {
    const parsed = Number(value);
    const safeRate = normalizeRate(parsed);

    setLoans((prev) =>
      prev.map((loan) =>
        loan.policyId === policyId ? { ...loan, rate: safeRate } : loan
      )
    );
  };

  const handleSave = async () => {
    if (!hasUnsavedChanges) {
      showToast({
        type: "info",
        title: "No changes to save",
        description: "Update an interest rate before saving.",
      });
      return;
    }

    setIsSaving(true);
    try {
      const updatedPolicies = await updateAdminLoanPolicyInterestRates({
        policies: loans.map((loan) => ({
          policyId: loan.policyId,
          baseInterestRate: loan.rate,
        })),
      });

      const mapped = mapPoliciesToCards(updatedPolicies);
      setLoans(mapped);
      setSavedLoans(cloneLoanCards(mapped));
      showToast({
        type: "success",
        title: "Loan policies updated",
        description: "Interest rates were saved successfully.",
      });
    } catch (unknownError) {
      const message =
        unknownError instanceof ApiError
          ? unknownError.message
          : "Failed to save loan policy changes.";
      showToast({
        type: "error",
        title: "Save failed",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!hasUnsavedChanges) {
      showToast({
        type: "info",
        title: "No changes to discard",
        description: "All values are already up to date.",
      });
      return;
    }

    setLoans(cloneLoanCards(savedLoans));
    showToast({
      type: "info",
      title: "Changes discarded",
      description: "Unsaved interest-rate changes were canceled.",
    });
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />

        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl p-3 sm:p-5 lg:p-7">
          {/* Header */}
          <div className="shrink-0 mb-5">
            <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="ADMIN" mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Admin" title="Loan Interest Policy Management" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-5">

            <h2 className="text-2xl font-bold text-[#1e1b4b]">
              LOAN TYPE AND INTEREST RATE
            </h2>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center text-gray-500">
                Loading loan policies...
              </div>
            ) : loans.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center text-gray-500">
                No loan policies found.
              </div>
            ) : (
              loans.map((loan) => (
                <div
                  key={loan.policyId}
                  className={`flex flex-col lg:flex-row justify-between items-center rounded-xl px-6 py-5 transition ${loan.cardClassName} ${loan.contentClassName}`}
                >
                  <div className="flex-1 pr-8">
                    <h3 className="text-xl font-semibold mb-3">{loan.title}</h3>
                    <p className="text-sm opacity-90 max-w-2xl">{loan.description}</p>
                  </div>

                  <div className={`hidden lg:block w-px h-20 mx-6 ${loan.dividerClassName}`}></div>

                  <div className="flex flex-col items-center gap-3 mt-6 lg:mt-0">
                    <span className="text-xs tracking-widest opacity-80">
                      INTEREST RATE
                    </span>

                    <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-2 shadow-md">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={loan.rate}
                        onChange={(event) =>
                          handleRateChange(loan.policyId, event.target.value)
                        }
                        disabled={isSaving}
                        className="w-20 text-center text-lg font-bold text-[#0B3B66] focus:outline-none disabled:opacity-60"
                      />
                      <span className="text-lg font-bold text-[#0B3B66]">%</span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-6 pt-4">
              <button
                onClick={handleSave}
                disabled={isLoading || isSaving || loans.length === 0 || !hasUnsavedChanges}
                className="min-w-[160px] px-8 py-3 rounded-full bg-[#0B3B66] text-white font-semibold text-sm hover:bg-[#082d4a] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "SAVING..." : "SAVE"}
              </button>

              <button
                onClick={handleCancel}
                disabled={isLoading || isSaving || loans.length === 0}
                className="min-w-[160px] px-8 py-3 rounded-full border border-[#0B3B66] text-[#0B3B66] font-semibold text-sm hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                CANCEL
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
