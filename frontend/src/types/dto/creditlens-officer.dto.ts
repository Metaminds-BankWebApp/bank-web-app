/**
 * Legacy officer-facing CreditLens DTO definitions kept for modules that still import this path directly.
 */
export interface BankCreditAnalysisCustomerRowResponse {
  bankCustomerId: number;
  customerCode: string;
  fullName: string;
  email: string;
  phone: string;
  bankEvaluationId: number;
  totalRiskPoints: number;
  riskLevel: string;
  riskLabel: string;
  evaluationDate: string;
}

export interface BankCreditAnalysisDashboardResponse {
  totalCustomers: number;
  lowRiskCount: number;
  mediumRiskCount: number;
  highRiskCount: number;
  customers: BankCreditAnalysisCustomerRowResponse[];
}

export interface BankCreditAnalysisCustomerProfileResponse {
  bankCustomerId: number;
  userId: number;
  customerCode: string;
  fullName: string;
  nic: string;
  email: string;
  phone: string;
  status: string;
  accountNumber: string;
  accountType: string;
  accountStatus: string;
  officerId: number;
  branchId: number;
  latestBankEvaluationId: number | null;
  latestRiskPoints: number | null;
  latestRiskLevel: string | null;
  latestRiskLabel: string | null;
  latestEvaluationDate: string | null;
}

export interface CreditRiskFactorResponse {
  name: string;
  value: number;
  max: number;
}

export interface BankCreditEvaluationResponse {
  bankEvaluationId: number;
  bankCustomerId: number;
  bankRecordId: number;
  evaluatedByOfficerId: number;
  evaluationSource: string;
  remarks: string | null;
  totalRiskPoints: number;
  riskLevel: string;
  riskLabel: string;
  totalMonthlyIncome: string;
  totalMonthlyDebtPayment: string;
  totalCardLimit: string;
  totalCardOutstanding: string;
  dtiRatio: string;
  dtiBand: string;
  creditUtilizationRatio: string;
  creditUtilizationBand: string;
  activeFacilitiesCount: number;
  missedPaymentsCount: number;
  paymentHistoryPoints: number;
  dtiPoints: number;
  utilizationPoints: number;
  incomeStabilityPoints: number;
  exposurePoints: number;
  reportGenerated: boolean;
  createdAt: string;
  factors: CreditRiskFactorResponse[];
}
