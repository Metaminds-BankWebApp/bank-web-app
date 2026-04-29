import apiClient, { toApiError } from "@/src/api/client";
import { AUTH_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AuthActionResponse,
  AuthMeResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "@/src/types/dto/auth.dto";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.login, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function me(): Promise<AuthMeResponse> {
  try {
    const { data } = await apiClient.get<AuthMeResponse>(AUTH_ENDPOINTS.me);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function register(payload: RegisterRequest): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.register, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post(AUTH_ENDPOINTS.logout);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function forgotPassword(payload: ForgotPasswordRequest): Promise<AuthActionResponse> {
  try {
    const { data } = await apiClient.post<AuthActionResponse>(AUTH_ENDPOINTS.forgotPassword, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function verifyOtp(payload: VerifyOtpRequest): Promise<AuthActionResponse> {
  try {
    const { data } = await apiClient.post<AuthActionResponse>(AUTH_ENDPOINTS.verifyOtp, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function resetPassword(payload: ResetPasswordRequest): Promise<AuthActionResponse> {
  try {
    const { data } = await apiClient.post<AuthActionResponse>(AUTH_ENDPOINTS.resetPassword, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export const authService = {
  login,
  me,
  register,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
