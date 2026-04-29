export type AdminCustomerType = "ALL" | "BANK" | "PUBLIC";

export type AdminUserStatus = "ACTIVE" | "INACTIVE" | "LOCKED";

export interface AdminUserManagementUserResponse {
  userId: number;
  customerId: string;
  fullName: string;
  email: string;
  contactNumber: string;
  joinedDate: string | null;
  customerType: Exclude<AdminCustomerType, "ALL">;
  status: AdminUserStatus;
  avatarUrl: string;
}

export interface AdminUserManagementUpdateRequest {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}
