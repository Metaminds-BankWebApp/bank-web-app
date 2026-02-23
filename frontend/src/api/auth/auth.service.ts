import apiClient, { toApiError } from "@/src/api/client";
import { AUTH_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AuthActionResponse,
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

export async function register(payload: RegisterRequest): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.register, payload);
    return data;
  } catch (error) {
    // Fallback to mock if API is unreachable (for demo purposes)
    console.warn("Registration API failed, using mock response", error);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    
    return {
      accessToken: "mock-jwt-token-" + Math.random().toString(36).substring(2),
      user: {
        id: "mock-user-id",
        email: payload.email,
        fullName: `${payload.firstName} ${payload.lastName}`,
        role: "PUBLIC_CUSTOMER",
      }
    };
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
    const apiError = toApiError(error);

    if (["NETWORK_ERROR", "TIMEOUT", "NOT_FOUND"].includes(apiError.code)) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { message: "Mock OTP sent." };
    }

    throw apiError;
  }
}

export async function verifyOtp(payload: VerifyOtpRequest): Promise<AuthActionResponse> {
  try {
    const { data } = await apiClient.post<AuthActionResponse>(AUTH_ENDPOINTS.verifyOtp, payload);
    return data;
  } catch (error) {
    const apiError = toApiError(error);

    if (["NETWORK_ERROR", "TIMEOUT", "NOT_FOUND"].includes(apiError.code)) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { message: "Mock OTP verified." };
    }

    throw apiError;
  }
}

export async function resetPassword(payload: ResetPasswordRequest): Promise<AuthActionResponse> {
  try {
    const { data } = await apiClient.post<AuthActionResponse>(AUTH_ENDPOINTS.resetPassword, payload);
    return data;
  } catch (error) {
    const apiError = toApiError(error);

    if (["NETWORK_ERROR", "TIMEOUT", "NOT_FOUND"].includes(apiError.code)) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { message: "Mock password reset complete." };
    }

    throw apiError;
  }
}

export const authService = {
  login,
  register,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
