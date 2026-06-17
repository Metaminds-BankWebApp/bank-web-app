import apiClient, { toApiError } from "@/src/api/client";
import type {
  BankCreditAnalysisCustomerProfileResponse,
  BankCreditAnalysisDashboardResponse,
  BankCreditEvaluationResponse,
  BankCreditEvaluationSummaryResponse,
  CreditInsightsResponse,
  CreditReportResponse,
  CreditTrendResponse,
} from "@/src/types/dto/officer-creditlens.dto";

function officerCustomerBase(bankCustomerId: number): string {
  // Keep all officer customer CreditLens routes consistent from one base path.
  return `/creditlens/officer/customers/${bankCustomerId}`;
}

export async function getOfficerCreditDashboard(): Promise<BankCreditAnalysisDashboardResponse> {
  // Portfolio-level summary shown on officer credit-analysis list page.
  try {
    const { data } = await apiClient.get<BankCreditAnalysisDashboardResponse>(
      "/creditlens/officer/dashboard",
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditCustomerProfile(
  bankCustomerId: number,
): Promise<BankCreditAnalysisCustomerProfileResponse> {
  // Identity and account context for one selected customer.
  try {
    const { data } = await apiClient.get<BankCreditAnalysisCustomerProfileResponse>(
      `${officerCustomerBase(bankCustomerId)}/profile`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditCurrentEvaluation(
  bankCustomerId: number,
): Promise<BankCreditEvaluationResponse> {
  // Latest evaluation snapshot for overview tab.
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      `${officerCustomerBase(bankCustomerId)}/current`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditEvaluationHistory(
  bankCustomerId: number,
): Promise<BankCreditEvaluationSummaryResponse[]> {
  // Historical evaluations used for trend/report month selection.
  try {
    const { data } = await apiClient.get<BankCreditEvaluationSummaryResponse[]>(
      `${officerCustomerBase(bankCustomerId)}/history`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditEvaluationById(
  bankCustomerId: number,
  bankEvaluationId: number,
): Promise<BankCreditEvaluationResponse> {
  // Fetch a single evaluation when a specific record is opened.
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      `${officerCustomerBase(bankCustomerId)}/evaluations/${bankEvaluationId}`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditTrends(
  bankCustomerId: number,
  range: "6m" | "12m" = "6m",
): Promise<CreditTrendResponse> {
  // Trend chart data for selected time window.
  try {
    const { data } = await apiClient.get<CreditTrendResponse>(
      `${officerCustomerBase(bankCustomerId)}/trends`,
      { params: { range } },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditInsights(
  bankCustomerId: number,
): Promise<CreditInsightsResponse> {
  // Insight cards (risk drivers + positive signals + tips).
  try {
    const { data } = await apiClient.get<CreditInsightsResponse>(
      `${officerCustomerBase(bankCustomerId)}/insights`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditReport(
  bankCustomerId: number,
): Promise<CreditReportResponse> {
  // Monthly report snapshots used in report tab and export flow.
  try {
    const { data } = await apiClient.get<CreditReportResponse>(
      `${officerCustomerBase(bankCustomerId)}/report`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
