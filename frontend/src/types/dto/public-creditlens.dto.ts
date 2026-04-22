export interface CreditInfoTooltipResponse {
  title: string;
  description: string;
  formula: string;
}

export interface CreditRiskFactorResponse {
  name: string;
  value: number;
  max: number;
}

export interface SelfCreditEvaluationResponse {
  selfEvaluationId: number;
  publicCustomerId: number;
  publicRecordId: number;
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

export interface SelfCreditEvaluationSummaryResponse {
  selfEvaluationId: number;
  publicCustomerId: number;
  publicRecordId: number;
  totalRiskPoints: number;
  riskLevel: string;
  riskLabel: string;
  createdAt: string;
}

export interface CreditDashboardFactorResponse {
  name: string;
  value: number;
  max: number;
  colorHex: string;
  infoTooltip?: CreditInfoTooltipResponse | null;
}

export interface CreditTrendPointResponse {
  monthKey: string;
  monthLabel: string;
  score: number;
  evaluationDate: string;
}

export interface CreditTrendSummaryResponse {
  riskLabel: string;
  riskDelta: number;
  trendText: string;
  biggestDriver: string;
  momentumText: string;
  nextTarget: string;
  direction: string;
}

export interface CreditTrendResponse {
  periodKey: string;
  periodLabel: string;
  labels: string[];
  values: number[];
  points: CreditTrendPointResponse[];
  summary: CreditTrendSummaryResponse;
}

export interface CreditDashboardResponse {
  evaluationId: number;
  score: number;
  riskLevel: string;
  riskLabel: string;
  createdAt: string;
  factors: CreditDashboardFactorResponse[];
  recentTrend: CreditTrendResponse;
  insightTitle: string;
  insightDescription: string;
  insightActionLabel: string;
}

export interface CreditInsightItemResponse {
  title: string;
  description: string;
  detail: string;
  badgeText: string;
  badgeTone: string;
  iconKey: string;
  infoTooltip?: CreditInfoTooltipResponse | null;
}

export interface CreditInsightsResponse {
  keyRiskFactors: CreditInsightItemResponse[];
  positiveBehaviors: CreditInsightItemResponse[];
  financialTips: CreditInsightItemResponse[];
  reportBannerTitle: string;
  reportBannerDescription: string;
  reportActionLabel: string;
}

export interface CreditReportSnapshotResponse {
  evaluationId: number;
  monthLabel: string;
  income: number;
  loanEmi: number;
  creditCardBalance: number;
  creditCardLimit: number;
  otherLiabilities: number;
  score: number;
  riskLabel: string;
  evaluationType: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  missedPayments: number;
  activeFacilities: number;
  dtiPercentage: number;
  utilizationPercentage: number;
  dtiLabel: string;
  factors: CreditRiskFactorResponse[];
}

export interface CreditReportResponse {
  customerType: string;
  evaluationType: string;
  generatedAt: string;
  snapshots: CreditReportSnapshotResponse[];
}
