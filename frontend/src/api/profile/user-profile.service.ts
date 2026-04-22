import apiClient, { toApiError } from "@/src/api/client";
import { USER_PROFILE_ENDPOINTS } from "@/src/api/endpoints";
import type {
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
} from "@/src/types/dto/user-profile.dto";

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
