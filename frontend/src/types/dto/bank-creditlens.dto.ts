import type { CreditRiskFactorResponse } from "@/src/types/dto/public-creditlens.dto";

/**
 * Bank-customer CreditLens DTO contracts.
 * This file reuses the shared customer-facing dashboard/report types and adds
 * the bank-specific evaluation identifiers returned by the backend.
 */
export type {
  CreditInfoTooltipResponse,
  CreditRiskFactorResponse,
  CreditDashboardFactorResponse,
  CreditTrendPointResponse,
  CreditTrendSummaryResponse,
  CreditTrendResponse,
  CreditDashboardResponse,
  CreditInsightItemResponse,
  CreditInsightsResponse,
  CreditReportSnapshotResponse,
  CreditReportResponse,
} from "@/src/types/dto/public-creditlens.dto";

export interface BankCreditEvaluationResponse {
  bankEvaluationId: number;
  bankCustomerId: number;
  bankRecordId: number;
  evaluatedByOfficerId: number;
  evaluationSource: string;
  remarks?: string | null;
  totalRiskPoints: number;
  riskLevel: string;
  riskLabel: string;
  totalMonthlyIncome: number;
  totalMonthlyDebtPayment: number;
  totalCardLimit: number;
  totalCardOutstanding: number;
  dtiRatio: number;
  dtiBand: string;
  creditUtilizationRatio: number;
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

export interface BankCreditEvaluationSummaryResponse {
  bankEvaluationId: number;
  bankCustomerId: number;
  bankRecordId: number;
  evaluatedByOfficerId: number;
  evaluationSource: string;
  totalRiskPoints: number;
  riskLevel: string;
  riskLabel: string;
  createdAt: string;
}
