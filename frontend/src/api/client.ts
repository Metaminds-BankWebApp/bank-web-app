import axios, { type AxiosError } from "axios";
import { env } from "@/config/env";
import { ApiError, type ApiErrorCode } from "@/src/types/api-error";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function resolveApiErrorCode(status?: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 400 || status === 422) return "VALIDATION_ERROR";
  if (status && status >= 500) return "SERVER_ERROR";
  return "UNKNOWN_ERROR";
}

export function toApiError(error: unknown): ApiError {
  const axiosError = error as AxiosError<Record<string, unknown>>;

  if (axiosError?.isAxiosError) {
    if (axiosError.code === "ECONNABORTED") {
      return new ApiError({
        message: "Request timed out.",
        code: "TIMEOUT",
      });
    }

    if (!axiosError.response) {
      return new ApiError({
        message: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
      });
    }

    const status = axiosError.response.status;
    const responseData = axiosError.response.data;
    const message =
      (typeof responseData?.message === "string" && responseData.message) ||
      axiosError.message ||
      "Unexpected API error.";

    return new ApiError({
      message,
      code: resolveApiErrorCode(status),
      status,
      details: responseData,
    });
  }

  if (error instanceof Error) {
    return new ApiError({
      message: error.message,
      code: "UNKNOWN_ERROR",
    });
  }

  return new ApiError({
    message: "Unknown error occurred.",
    code: "UNKNOWN_ERROR",
  });
}

export default apiClient;
