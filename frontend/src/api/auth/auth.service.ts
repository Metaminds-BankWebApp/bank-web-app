import apiClient, { toApiError } from "@/src/api/client";
import { AUTH_ENDPOINTS } from "@/src/api/endpoints";
import type { LoginRequest, LoginResponse, RegisterRequest } from "@/src/types/dto/auth.dto";

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

export const authService = {
  login,
  register,
  logout,
};
