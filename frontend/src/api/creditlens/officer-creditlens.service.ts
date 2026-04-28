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
  return `/creditlens/officer/customers/${bankCustomerId}`;
}

export async function getOfficerCreditDashboard(): Promise<BankCreditAnalysisDashboardResponse> {
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
  try {
    const { data } = await apiClient.get<CreditReportResponse>(
      `${officerCustomerBase(bankCustomerId)}/report`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
