import apiClient, { toApiError } from "@/src/api/client";
import { TRANSACT_ENDPOINTS } from "@/src/api/endpoints";
import type {
  CurrentBalanceResponse,
  CreateTransactionRequest,
  ResendTransactionOtpRequest,
  TransactDashboardSummaryResponse,
  TransactionInitiateResponse,
  TransactionResponse,
  VerifyTransactionOtpRequest,
} from "@/src/types/dto/transact.dto";

type DownloadTransactionHistoryReportParams = {
  fromDate?: string;
  toDate?: string;
};

type DownloadTransactionHistoryReportResult = {
  fileName: string;
  blob: Blob;
};

function resolveFileNameFromContentDisposition(contentDisposition?: string): string {
  if (!contentDisposition) {
    return "transaction-statement.pdf";
  }

  const utfMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch?.[1]) {
    return decodeURIComponent(utfMatch[1]);
  }

  const quotedMatch = contentDisposition.match(/filename="([^"]+)"/i);
  if (quotedMatch?.[1]) {
    return quotedMatch[1];
  }

  const plainMatch = contentDisposition.match(/filename=([^;]+)/i);
  if (plainMatch?.[1]) {
    return plainMatch[1].trim();
  }

  return "transaction-statement.pdf";
}

export async function getCurrentBalance(): Promise<CurrentBalanceResponse> {
  try {
    const { data } = await apiClient.get<CurrentBalanceResponse>(TRANSACT_ENDPOINTS.dashboardCurrentBalance);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getDashboardSummary(): Promise<TransactDashboardSummaryResponse> {
  try {
    const { data } = await apiClient.get<TransactDashboardSummaryResponse>(TRANSACT_ENDPOINTS.dashboardSummary);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function initiateTransaction(payload: CreateTransactionRequest): Promise<TransactionInitiateResponse> {
  try {
    const { data } = await apiClient.post<TransactionInitiateResponse>(TRANSACT_ENDPOINTS.transactionsInitiate, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function verifyTransactionOtp(payload: VerifyTransactionOtpRequest): Promise<TransactionResponse> {
  try {
    const { data } = await apiClient.post<TransactionResponse>(TRANSACT_ENDPOINTS.transactionsVerifyOtp, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function resendTransactionOtp(payload: ResendTransactionOtpRequest): Promise<TransactionInitiateResponse> {
  try {
    const { data } = await apiClient.post<TransactionInitiateResponse>(TRANSACT_ENDPOINTS.transactionsResendOtp, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getTransactionHistory(): Promise<TransactionResponse[]> {
  try {
    const { data } = await apiClient.get<TransactionResponse[]>(TRANSACT_ENDPOINTS.transactionsHistory);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankOfficerTransactionHistory(): Promise<TransactionResponse[]> {
  try {
    const { data } = await apiClient.get<TransactionResponse[]>(TRANSACT_ENDPOINTS.bankOfficerTransactionsHistory);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function downloadTransactionHistoryReport(
  params: DownloadTransactionHistoryReportParams,
): Promise<DownloadTransactionHistoryReportResult> {
  try {
    const { data, headers } = await apiClient.get<Blob>(TRANSACT_ENDPOINTS.transactionsHistoryReport, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
      params: {
        fromDate: params.fromDate,
        toDate: params.toDate,
      },
    });

    const contentDisposition = headers["content-disposition"] as string | undefined;
    return {
      fileName: resolveFileNameFromContentDisposition(contentDisposition),
      blob: data,
    };
  } catch (error) {
    throw toApiError(error);
  }
}

export const transactionService = {
  getCurrentBalance,
  getDashboardSummary,
  initiateTransaction,
  verifyTransactionOtp,
  resendTransactionOtp,
  getTransactionHistory,
  getBankOfficerTransactionHistory,
  downloadTransactionHistoryReport,
};
