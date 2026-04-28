import apiClient, { toApiError } from "@/src/api/client";
import { BANK_CREDITLENS_ENDPOINTS } from "@/src/api/endpoints";
import type {
  BankCreditEvaluationResponse,
  BankCreditEvaluationSummaryResponse,
  CreditDashboardResponse,
  CreditInsightsResponse,
  CreditReportResponse,
  CreditTrendResponse,
} from "@/src/types/dto/bank-creditlens.dto";

export async function getCurrentBankCreditEvaluation(): Promise<BankCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      BANK_CREDITLENS_ENDPOINTS.current,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCreditDashboard(): Promise<CreditDashboardResponse> {
  try {
    const { data } = await apiClient.get<CreditDashboardResponse>(
      BANK_CREDITLENS_ENDPOINTS.dashboard,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCreditTrends(range: "6m" | "12m" = "6m"): Promise<CreditTrendResponse> {
  try {
    const { data } = await apiClient.get<CreditTrendResponse>(
      BANK_CREDITLENS_ENDPOINTS.trends,
      { params: { range } },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCreditInsights(): Promise<CreditInsightsResponse> {
  try {
    const { data } = await apiClient.get<CreditInsightsResponse>(
      BANK_CREDITLENS_ENDPOINTS.insights,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCreditReport(): Promise<CreditReportResponse> {
  try {
    const { data } = await apiClient.get<CreditReportResponse>(
      BANK_CREDITLENS_ENDPOINTS.report,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCreditEvaluationHistory(): Promise<BankCreditEvaluationSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationSummaryResponse[]>(
      BANK_CREDITLENS_ENDPOINTS.history,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCreditEvaluationById(
  bankEvaluationId: number,
): Promise<BankCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      BANK_CREDITLENS_ENDPOINTS.byId(bankEvaluationId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
