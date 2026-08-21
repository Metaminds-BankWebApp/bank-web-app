"use client";
/**
 * Admin loan-policy management page for maintaining LoanSense eligibility rules.
 */

import React, { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { useToast } from "@/src/components/ui";
import {
  getAdminLoanPolicies,
  updateAdminLoanPolicy,
} from "@/src/api/admin/loan-policy.service";
import { ApiError } from "@/src/types/api-error";
import type {
  AdminLoanPolicyResponse,
  AdminLoanPolicyType,
  AdminLoanPolicyUpdateRequest,
} from "@/src/types/dto/admin-loan-policy.dto";

type LoanCard = {
  policyId: number;
  loanType: AdminLoanPolicyType;
  title: string;
  description: string;
  maxDbrRatio: string;
  baseInterestRate: string;
  maxTenureMonths: string;
  minAge: string;
  maxAge: string;
  maxFinancePercentage: string;
  minIncomeRequired: string;
  status: string;
  cardClassName: string;
  contentClassName: string;
  dividerClassName: string;
};

type EditableLoanPolicyField =
  | "maxDbrRatio"
  | "baseInterestRate"
  | "maxTenureMonths"
  | "minAge"
  | "maxAge"
  | "maxFinancePercentage"
  | "minIncomeRequired"
  | "status";

const loanTypeOrder: AdminLoanPolicyType[] = [
  "PERSONAL",
  "VEHICLE",
  "EDUCATION",
  "HOUSING",
];

const loanPresentationMap: Record<
  AdminLoanPolicyType,
  Omit<
    LoanCard,
    | "policyId"
    | "loanType"
    | "maxDbrRatio"
    | "baseInterestRate"
    | "maxTenureMonths"
    | "minAge"
    | "maxAge"
    | "maxFinancePercentage"
    | "minIncomeRequired"
    | "status"
  >
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

const editableFields: EditableLoanPolicyField[] = [
  "maxDbrRatio",
  "baseInterestRate",
  "maxTenureMonths",
  "minAge",
  "maxAge",
  "maxFinancePercentage",
  "minIncomeRequired",
  "status",
];

type PolicyNumberInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  step?: string;
  suffix?: string;
  helper?: string;
  disabled: boolean;
};

function PolicyNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = "1",
  suffix,
  helper,
  disabled,
}: PolicyNumberInputProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide opacity-85">
        {label}
      </span>
      <div className="flex items-center rounded-xl bg-white px-3 py-2 text-[#0B3B66] shadow-sm">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
        {suffix ? <span className="ml-2 text-sm font-semibold">{suffix}</span> : null}
      </div>
      {helper ? <span className="mt-1 block text-[11px] opacity-80">{helper}</span> : null}
    </label>
  );
}

function toEditableValue(value: number | null): string {
  return value === null ? "" : String(value);
}

function mapPolicyToCard(policy: AdminLoanPolicyResponse): LoanCard {
  const presentation = loanPresentationMap[policy.loanType];
  return {
    ...presentation,
    policyId: policy.policyId,
    loanType: policy.loanType,
    maxDbrRatio: toEditableValue(policy.maxDbrRatio),
    baseInterestRate: toEditableValue(policy.baseInterestRate),
    maxTenureMonths: toEditableValue(policy.maxTenureMonths),
    minAge: toEditableValue(policy.minAge),
    maxAge: toEditableValue(policy.maxAge),
    maxFinancePercentage: toEditableValue(policy.maxFinancePercentage),
    minIncomeRequired: toEditableValue(policy.minIncomeRequired),
    status: policy.status,
  };
}

function mapPoliciesToCards(policies: AdminLoanPolicyResponse[]): LoanCard[] {
  const policiesByType = new Map<AdminLoanPolicyType, AdminLoanPolicyResponse>();
  policies.forEach((policy) => {
    policiesByType.set(policy.loanType, policy);
  });

  return loanTypeOrder
    .map((loanType) => {
      const policy = policiesByType.get(loanType);
      return policy ? mapPolicyToCard(policy) : null;
    })
    .filter((loan): loan is LoanCard => loan !== null);
}

function cloneLoanCards(loans: LoanCard[]): LoanCard[] {
  return loans.map((loan) => ({ ...loan }));
}

function hasPolicyChanged(current: LoanCard, saved: LoanCard | undefined): boolean {
  if (!saved) {
    return true;
  }
  return editableFields.some((field) => current[field] !== saved[field]);
}

function parseRequiredNumber(
  value: string,
  label: string,
  min: number,
  max: number | null,
  wholeNumber = false
): number {
  const parsed = Number(value);
  if (
    value.trim() === "" ||
    !Number.isFinite(parsed) ||
    parsed < min ||
    (max !== null && parsed > max)
  ) {
    throw new Error(max === null ? `${label} must be at least ${min}.` : `${label} must be between ${min} and ${max}.`);
  }
  if (wholeNumber && !Number.isInteger(parsed)) {
    throw new Error(`${label} must be a whole number.`);
  }
  return parsed;
}

function parseOptionalNumber(value: string, label: string, min: number, max: number | null): number | null {
  if (value.trim() === "") {
    return null;
  }
  return parseRequiredNumber(value, label, min, max);
}

function buildPolicyUpdateRequest(loan: LoanCard): AdminLoanPolicyUpdateRequest {
  const minAge = parseRequiredNumber(loan.minAge, "Minimum age", 18, null, true);
  const maxAge = parseRequiredNumber(loan.maxAge, "Maximum age", 18, null, true);
  if (maxAge < minAge) {
    throw new Error("Maximum age must be greater than or equal to minimum age.");
  }
  if (loan.status !== "ACTIVE" && loan.status !== "INACTIVE") {
    throw new Error("Policy status must be Active or Inactive.");
  }

  return {
    loanType: loan.loanType,
    maxDbrRatio: parseRequiredNumber(loan.maxDbrRatio, "Maximum DBR ratio", 0.0001, 1),
    baseInterestRate: parseRequiredNumber(loan.baseInterestRate, "Base interest rate", 0, 100),
    maxTenureMonths: parseRequiredNumber(loan.maxTenureMonths, "Maximum tenure", 1, null, true),
    minAge,
    maxAge,
    maxFinancePercentage: parseOptionalNumber(
      loan.maxFinancePercentage,
      "Maximum finance percentage",
      0,
      100
    ),
    minIncomeRequired: parseOptionalNumber(
      loan.minIncomeRequired,
      "Minimum monthly income",
      0,
      null
    ),
    status: loan.status,
  };
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }
  return fallback;
}

// Main component for viewing and updating LoanSense product policies.
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
        const message = getErrorMessage(unknownError, "Failed to load loan policies.");
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
    const savedPolicies = new Map(savedLoans.map((loan) => [loan.policyId, loan]));
    return loans.some((loan) => hasPolicyChanged(loan, savedPolicies.get(loan.policyId)));
  }, [loans, savedLoans]);

  const handleFieldChange = (policyId: number, field: EditableLoanPolicyField, value: string) => {
    setLoans((currentLoans) =>
      currentLoans.map((loan) => (loan.policyId === policyId ? { ...loan, [field]: value } : loan))
    );
  };

  const handleSave = async () => {
    const savedPolicies = new Map(savedLoans.map((loan) => [loan.policyId, loan]));
    const changedLoans = loans.filter((loan) => hasPolicyChanged(loan, savedPolicies.get(loan.policyId)));
    if (changedLoans.length === 0) {
      return;
    }

    let policyUpdates: Array<{ policyId: number; payload: AdminLoanPolicyUpdateRequest }>;
    try {
      policyUpdates = changedLoans.map((loan) => ({
        policyId: loan.policyId,
        payload: buildPolicyUpdateRequest(loan),
      }));
    } catch (unknownError) {
      const message = getErrorMessage(unknownError, "Check the policy values and try again.");
      setError(message);
      showToast({ type: "error", title: "Invalid policy values", description: message });
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const updatedPolicies = await Promise.all(
        policyUpdates.map(({ policyId, payload }) => updateAdminLoanPolicy(policyId, payload))
      );
      const updatedCardsById = new Map(
        updatedPolicies.map((policy) => [policy.policyId, mapPolicyToCard(policy)])
      );
      const updatedCards = loans.map((loan) => updatedCardsById.get(loan.policyId) ?? loan);
      setLoans(updatedCards);
      setSavedLoans(cloneLoanCards(updatedCards));
      showToast({
        type: "success",
        title: "Loan policies updated",
        description:
          "LoanSense will apply the revised policy when it next generates an eligibility evaluation.",
      });
    } catch (unknownError) {
      const message = getErrorMessage(unknownError, "Failed to save loan policy changes.");
      setError(message);
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
    setLoans(cloneLoanCards(savedLoans));
    setError(null);
    showToast({
      type: "info",
      title: "Changes discarded",
      description: "Unsaved policy changes were canceled.",
    });
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role="ADMIN" className="relative z-10 h-full max-lg:hidden" />

        <main className="flex flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7">
          <div className="mb-5 shrink-0">
            <ModuleHeader
              theme="staff"
              menuMode="sidebar-overlay"
              sidebarRole="ADMIN"
              mailBadge={2}
              notificationBadge={8}
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
              avatarStatusDot
              name="Kamal Edirisinghe"
              role="Admin"
              title="Loan Policy Management"
            />
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-2 pb-10 sm:px-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1e1b4b]">LoanSense Policy Settings</h2>
              <p className="mt-1 text-sm text-slate-600">
                Configure the affordability, age, income, tenure, funding, and interest rules for each loan product.
              </p>
            </div>

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
                <section
                  key={loan.policyId}
                  className={`rounded-xl px-5 py-5 shadow-sm sm:px-6 ${loan.cardClassName} ${loan.contentClassName}`}
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{loan.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm opacity-90">{loan.description}</p>
                    </div>

                    <label className="w-full lg:w-44">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide opacity-85">Status</span>
                      <select
                        value={loan.status}
                        onChange={(event) => handleFieldChange(loan.policyId, "status", event.target.value)}
                        disabled={isSaving}
                        className="w-full rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#0B3B66] shadow-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </label>
                  </div>

                  <div className={`my-5 h-px ${loan.dividerClassName}`} />

                  <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
                    <PolicyNumberInput
                      label="Max DBR ratio"
                      value={loan.maxDbrRatio}
                      onChange={(value) => handleFieldChange(loan.policyId, "maxDbrRatio", value)}
                      min="0.0001"
                      max="1"
                      step="0.0001"
                      helper="0.40 means 40%"
                      disabled={isSaving}
                    />
                    <PolicyNumberInput
                      label="Interest rate"
                      value={loan.baseInterestRate}
                      onChange={(value) => handleFieldChange(loan.policyId, "baseInterestRate", value)}
                      min="0"
                      max="100"
                      step="0.01"
                      suffix="%"
                      disabled={isSaving}
                    />
                    <PolicyNumberInput
                      label="Maximum tenure"
                      value={loan.maxTenureMonths}
                      onChange={(value) => handleFieldChange(loan.policyId, "maxTenureMonths", value)}
                      min="1"
                      step="1"
                      suffix="months"
                      disabled={isSaving}
                    />
                    <PolicyNumberInput
                      label="Minimum monthly income"
                      value={loan.minIncomeRequired}
                      onChange={(value) => handleFieldChange(loan.policyId, "minIncomeRequired", value)}
                      min="0"
                      step="0.01"
                      helper="Leave blank for no threshold"
                      disabled={isSaving}
                    />
                    <PolicyNumberInput
                      label="Minimum age"
                      value={loan.minAge}
                      onChange={(value) => handleFieldChange(loan.policyId, "minAge", value)}
                      min="18"
                      step="1"
                      suffix="years"
                      disabled={isSaving}
                    />
                    <PolicyNumberInput
                      label="Maximum age"
                      value={loan.maxAge}
                      onChange={(value) => handleFieldChange(loan.policyId, "maxAge", value)}
                      min="18"
                      step="1"
                      suffix="years"
                      disabled={isSaving}
                    />
                    <PolicyNumberInput
                      label="Maximum finance"
                      value={loan.maxFinancePercentage}
                      onChange={(value) => handleFieldChange(loan.policyId, "maxFinancePercentage", value)}
                      min="0"
                      max="100"
                      step="0.01"
                      suffix="%"
                      helper="Asset-value cap; leave blank for none"
                      disabled={isSaving}
                    />
                  </div>
                </section>
              ))
            )}

            <div className="flex flex-col justify-end gap-3 pt-2 sm:flex-row">
              <button
                onClick={handleCancel}
                disabled={isLoading || isSaving || !hasUnsavedChanges}
                className="min-w-[160px] rounded-full border border-[#0B3B66] px-8 py-3 text-sm font-semibold text-[#0B3B66] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={() => void handleSave()}
                disabled={isLoading || isSaving || loans.length === 0 || !hasUnsavedChanges}
                className="min-w-[160px] rounded-full bg-[#0B3B66] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#082d4a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save policies"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
