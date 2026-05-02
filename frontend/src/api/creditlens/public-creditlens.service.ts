import axios from "axios";
import apiClient, { toApiError } from "@/src/api/client";
import { PUBLIC_CREDITLENS_ENDPOINTS } from "@/src/api/endpoints";
import { ApiError } from "@/src/types/api-error";
import type {
  CreditDashboardResponse,
  CreditInsightsResponse,
  CreditReportResponse,
  CreditTrendResponse,
  SelfCreditEvaluationResponse,
  SelfCreditEvaluationSummaryResponse,
} from "@/src/types/dto/public-creditlens.dto";

export async function createPublicCreditEvaluation(): Promise<SelfCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.post<SelfCreditEvaluationResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.createEvaluation,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getCurrentPublicCreditEvaluation(): Promise<SelfCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<SelfCreditEvaluationResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.current,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCreditDashboard(): Promise<CreditDashboardResponse> {
  try {
    const { data } = await apiClient.get<CreditDashboardResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.dashboard,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCreditTrends(range: "6m" | "12m" = "6m"): Promise<CreditTrendResponse> {
  try {
    const { data } = await apiClient.get<CreditTrendResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.trends,
      { params: { range } },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCreditInsights(): Promise<CreditInsightsResponse> {
  try {
    const { data } = await apiClient.get<CreditInsightsResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.insights,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCreditReport(): Promise<CreditReportResponse> {
  try {
    const { data } = await apiClient.get<CreditReportResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.report,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function downloadPublicCreditReportPdf(selfEvaluationId: number): Promise<Blob> {
  try {
    const { data } = await apiClient.get<Blob>(
      PUBLIC_CREDITLENS_ENDPOINTS.reportPdf(selfEvaluationId),
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

export async function getPublicCreditEvaluationHistory(): Promise<SelfCreditEvaluationSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<SelfCreditEvaluationSummaryResponse[]>(
      PUBLIC_CREDITLENS_ENDPOINTS.history,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCreditEvaluationById(
  selfEvaluationId: number,
): Promise<SelfCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<SelfCreditEvaluationResponse>(
      PUBLIC_CREDITLENS_ENDPOINTS.byId(selfEvaluationId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
