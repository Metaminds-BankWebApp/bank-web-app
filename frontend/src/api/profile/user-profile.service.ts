import apiClient, { toApiError } from "@/src/api/client";
import { USER_PROFILE_ENDPOINTS } from "@/src/api/endpoints";
import { env } from "@/config/env";
import type {
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
} from "@/src/types/dto/user-profile.dto";

const ABSOLUTE_URL_REGEX = /^(?:https?:)?\/\//i;
const DATA_URL_REGEX = /^data:/i;

function resolveBackendOrigin(): string {
  const apiBaseUrl = env.apiBaseUrl.trim();

  if (!apiBaseUrl) {
    return "";
  }

  try {
    const url = new URL(apiBaseUrl);
    const pathname = url.pathname.replace(/\/+$/, "");
    url.pathname = pathname.endsWith("/api") ? (pathname.slice(0, -4) || "/") : (pathname || "/");
    return url.toString().replace(/\/$/, "");
  } catch {
    return apiBaseUrl.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  }
}

export function resolveUserProfileImageUrl(imageUrl?: string | null): string | null {
  const normalized = imageUrl?.trim() ?? "";
  if (!normalized) {
    return null;
  }

  if (ABSOLUTE_URL_REGEX.test(normalized) || DATA_URL_REGEX.test(normalized)) {
    return normalized;
  }

  const backendOrigin = resolveBackendOrigin();
  if (!backendOrigin) {
    return normalized;
  }

  return normalized.startsWith("/") ? `${backendOrigin}${normalized}` : `${backendOrigin}/${normalized}`;
}

export async function getMyUserProfile(): Promise<UserProfileResponse> {
  try {
    const { data } = await apiClient.get<UserProfileResponse>(USER_PROFILE_ENDPOINTS.current);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateMyUserProfile(
  payload: UserProfileUpdateRequest,
): Promise<UserProfileUpdateResponse> {
  try {
    const { data } = await apiClient.put<UserProfileUpdateResponse>(
      USER_PROFILE_ENDPOINTS.update,
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function uploadMyUserProfileImage(file: File): Promise<UserProfileUpdateResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post<UserProfileUpdateResponse>(
      USER_PROFILE_ENDPOINTS.imageUpload,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function removeMyUserProfileImage(): Promise<UserProfileUpdateResponse> {
  try {
    const { data } = await apiClient.delete<UserProfileUpdateResponse>(USER_PROFILE_ENDPOINTS.imageDelete);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
