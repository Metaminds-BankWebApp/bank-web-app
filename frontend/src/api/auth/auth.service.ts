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

export const authService = {
  login,
  register,
  logout,
};
