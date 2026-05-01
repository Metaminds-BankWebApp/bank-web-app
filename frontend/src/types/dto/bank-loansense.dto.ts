export type LoanSenseEligibilityStatus =
  | "ELIGIBLE"
  | "PARTIALLY_ELIGIBLE"
  | "NOT_ELIGIBLE";

export type LoanSenseLoanType = "PERSONAL" | "VEHICLE" | "EDUCATION" | "HOUSING";

export interface LoanSenseLoanOptionResponse {
  loanResultId: number;
  loanType: LoanSenseLoanType;
  loanTypeKey: string;
  loanTypeLabel: string;
  eligibilityStatus: LoanSenseEligibilityStatus;
  eligibilityLabel: string;
  recommendedMaxAmount: number;
  estimatedEmi: number;
  interestRate: number | null;
  tenureMonths: number | null;
  tenureLabel: string;
  customerAge: number;
  decisionReason: string;
  createdAt: string | null;
}

export interface LoanSenseEvaluationResponse {
  loansenseEvaluationId: number;
  bankCustomerId: number;
  bankRecordId: number;
  bankEvaluationId: number;
  monthlyIncome: number;
  totalExistingLoanEmi: number;
  leasingHirePurchasePayment: number;
  creditCardOutstanding: number;
  creditCardLimit: number;
  creditCardMinPayment: number;
  missedPaymentsCount: number;
  tmdo: number;
  dbr: number;
  maxAllowedEmi: number;
  availableEmiCapacity: number;
  riskLevel: string;
  riskLabel: string;
  riskMultiplier: number;
  overallStatus: LoanSenseEligibilityStatus;
  overallStatusLabel: string;
  remarks: string;
  createdAt: string | null;
  loanOptions: LoanSenseLoanOptionResponse[];
}

export interface LoanSenseHistoryItemResponse {
  loansenseEvaluationId: number;
  loanResultId: number;
  evaluationMonthLabel: string;
  evaluationDate: string | null;
  loanType: LoanSenseLoanType;
  loanTypeKey: string;
  loanTypeLabel: string;
  eligibilityStatus: LoanSenseEligibilityStatus;
  eligibilityLabel: string;
  recommendedMaxAmount: number;
  tenureMonths: number | null;
  tenureLabel: string;
  riskLevel: string;
  riskLabel: string;
}

export interface LoanTypeDetailResponse {
  loansenseEvaluationId: number;
  loanResultId: number;
  loanType: LoanSenseLoanType;
  loanTypeKey: string;
  loanTypeLabel: string;
  eligibilityStatus: LoanSenseEligibilityStatus;
  eligibilityLabel: string;
  recommendedMaxAmount: number;
  estimatedEmi: number;
  interestRate: number | null;
  policyMinTenureMonths: number | null;
  policyMaxTenureMonths: number | null;
  tenureLabel: string;
  customerAge: number;
  monthlyIncome: number;
  totalExistingLoanEmi: number;
  creditCardMinPayment: number;
  leasingHirePurchasePayment: number;
  tmdo: number;
  dbr: number;
  policyMaxDbrRatio: number | null;
  maxAllowedEmi: number;
  availableEmiCapacity: number;
  riskLevel: string;
  riskLabel: string;
  riskMultiplier: number;
  riskAdjustmentDescription: string | null;
  policyMinIncomeRequired: number | null;
  policyMinAge: number | null;
  policyMaxAge: number | null;
  decisionReason: string;
  createdAt: string | null;
}

export interface LoanSenseLoanInputRequest {
  loanType: LoanSenseLoanType;
  assetValue?: number;
}

export interface CreateLoanSenseEvaluationRequest {
  loans?: LoanSenseLoanInputRequest[];
}
