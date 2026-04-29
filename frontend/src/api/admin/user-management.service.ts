import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AdminCustomerType,
  AdminUserManagementUpdateRequest,
  AdminUserManagementUserResponse,
  AdminUserStatus,
} from "@/src/types/dto/admin-user-management.dto";

export async function getAdminUsers(params?: {
  customerType?: AdminCustomerType;
  search?: string;
}): Promise<AdminUserManagementUserResponse[]> {
  try {
    const { data } = await apiClient.get<AdminUserManagementUserResponse[]>(
      ADMIN_ENDPOINTS.users,
      {
        params: {
          customerType: params?.customerType ?? "ALL",
          search: params?.search?.trim() || undefined,
        },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateAdminUserStatus(
  userId: number,
  status: AdminUserStatus
): Promise<AdminUserManagementUserResponse> {
  try {
    const { data } = await apiClient.patch<AdminUserManagementUserResponse>(
      `${ADMIN_ENDPOINTS.users}/${userId}/status`,
      null,
      {
        params: { status },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateAdminUserDetails(
  userId: number,
  payload: AdminUserManagementUpdateRequest
): Promise<AdminUserManagementUserResponse> {
  try {
    const { data } = await apiClient.put<AdminUserManagementUserResponse>(
      `${ADMIN_ENDPOINTS.users}/${userId}`,
      payload
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteAdminUser(
  userId: number
): Promise<AdminUserManagementUserResponse> {
  try {
    const { data } = await apiClient.delete<AdminUserManagementUserResponse>(
      `${ADMIN_ENDPOINTS.users}/${userId}`
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
