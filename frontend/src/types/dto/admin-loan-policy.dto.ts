export type AdminLoanPolicyType = "PERSONAL" | "VEHICLE" | "EDUCATION" | "HOUSING";

export type AdminLoanPolicyStatus = "ACTIVE" | "INACTIVE";

export interface AdminLoanPolicyResponse {
  policyId: number;
  loanType: AdminLoanPolicyType;
  loanTypeLabel: string;
  maxDbrRatio: number;
  baseInterestRate: number;
  maxTenureMonths: number;
  minAge: number;
  maxAge: number;
  maxFinancePercentage: number | null;
  minIncomeRequired: number | null;
  status: AdminLoanPolicyStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AdminLoanPolicyInterestRateUpdateItem {
  policyId: number;
  baseInterestRate: number;
}

export interface AdminBulkLoanPolicyInterestRateUpdateRequest {
  policies: AdminLoanPolicyInterestRateUpdateItem[];
}
