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
  // Start transfer request and receive transaction reference/OTP state.
  try {
    const { data } = await apiClient.post<TransactionInitiateResponse>(TRANSACT_ENDPOINTS.transactionsInitiate, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function verifyTransactionOtp(payload: VerifyTransactionOtpRequest): Promise<TransactionResponse> {
  // Confirm transfer after OTP is entered.
  try {
    const { data } = await apiClient.post<TransactionResponse>(TRANSACT_ENDPOINTS.transactionsVerifyOtp, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function resendTransactionOtp(payload: ResendTransactionOtpRequest): Promise<TransactionInitiateResponse> {
  // Request a fresh OTP when the original code expires or is lost.
  try {
    const { data } = await apiClient.post<TransactionInitiateResponse>(TRANSACT_ENDPOINTS.transactionsResendOtp, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getTransactionHistory(): Promise<TransactionResponse[]> {
  // Customer-side transaction timeline.
  try {
    const { data } = await apiClient.get<TransactionResponse[]>(TRANSACT_ENDPOINTS.transactionsHistory);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankOfficerTransactionHistory(): Promise<TransactionResponse[]> {
  // Officer-side transaction feed used for monitoring and review.
  try {
    const { data } = await apiClient.get<TransactionResponse[]>(TRANSACT_ENDPOINTS.bankOfficerTransactionsHistory);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export const transactionService = {
  // Single object export keeps page imports simple and consistent.
  initiateTransaction,
  verifyTransactionOtp,
  resendTransactionOtp,
  getTransactionHistory,
  getBankOfficerTransactionHistory,
};
