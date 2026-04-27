export type {
  BankCreditEvaluationResponse,
  BankCreditEvaluationSummaryResponse,
  CreditInfoTooltipResponse,
  CreditRiskFactorResponse,
  CreditTrendPointResponse,
  CreditTrendSummaryResponse,
  CreditTrendResponse,
  CreditInsightItemResponse,
  CreditInsightsResponse,
  CreditReportSnapshotResponse,
  CreditReportResponse,
} from "@/src/types/dto/bank-creditlens.dto";

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
  latestBankEvaluationId?: number | null;
  latestRiskPoints?: number | null;
  latestRiskLevel?: string | null;
  latestRiskLabel?: string | null;
  latestEvaluationDate?: string | null;
}
