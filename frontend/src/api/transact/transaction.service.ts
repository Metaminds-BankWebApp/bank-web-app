import apiClient, { toApiError } from "@/src/api/client";
import { TRANSACT_ENDPOINTS } from "@/src/api/endpoints";
import type {
  CreateTransactionRequest,
  ResendTransactionOtpRequest,
  TransactionInitiateResponse,
  TransactionResponse,
  VerifyTransactionOtpRequest,
} from "@/src/types/dto/transact.dto";

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

export const transactionService = {
  initiateTransaction,
  verifyTransactionOtp,
  resendTransactionOtp,
  getTransactionHistory,
};
