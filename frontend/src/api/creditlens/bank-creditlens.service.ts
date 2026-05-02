import axios from "axios";
import apiClient, { toApiError } from "@/src/api/client";
import { BANK_CREDITLENS_ENDPOINTS } from "@/src/api/endpoints";
import { ApiError } from "@/src/types/api-error";
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

export async function downloadBankCreditReportPdf(bankEvaluationId: number): Promise<Blob> {
  try {
    const { data } = await apiClient.get<Blob>(
      BANK_CREDITLENS_ENDPOINTS.reportPdf(bankEvaluationId),
      {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
      try {
        const parsed = JSON.parse(await error.response.data.text()) as { message?: string; [key: string]: unknown };
        const message = typeof parsed.message === "string" && parsed.message
          ? parsed.message
          : "Unable to prepare the CreditLens PDF report.";

        throw new ApiError({
          message,
          code: "UNKNOWN_ERROR",
          status: error.response.status,
          details: parsed,
        });
      } catch (blobError) {
        if (blobError instanceof ApiError) {
          throw blobError;
        }

        throw new ApiError({
          message: "Unable to prepare the CreditLens PDF report.",
          code: "UNKNOWN_ERROR",
          status: error.response.status,
        });
      }
    }

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
