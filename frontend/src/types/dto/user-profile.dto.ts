export type UserProfileRoleName = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER" | "BANK_OFFICER" | "ADMIN";

export interface UserProfileSummaryItemResponse {
  label: string;
  value: string;
}

export interface UserProfileResponse {
  userId: number;
  roleName: UserProfileRoleName | string;
  roleDisplayName: string;
  badgeText: string;
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  username: string;
  nic: string;
  dob: string | null;
  address: string | null;
  profilePictureUrl: string | null;
  status: string;
  joinedDate: string;
  customerCode: string | null;
  employeeCode: string | null;
  accountNumber: string | null;
  branchName: string | null;
  branchLocation: string | null;
  summaryItems: UserProfileSummaryItemResponse[];
}

export interface UserProfileUpdateRequest {
  fullName: string;
  email: string;
  phone: string;
  address?: string | null;
  newUsername?: string | null;
  currentPassword?: string | null;
  newPassword?: string | null;
  confirmPassword?: string | null;
}

export interface UserProfileUpdateResponse {
  message: string;
  profile: UserProfileResponse;
}
