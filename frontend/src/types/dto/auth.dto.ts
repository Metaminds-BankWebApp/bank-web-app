export type UserRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER" | "BANK_OFFICER" | "ADMIN";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole | string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetToken: string;
  password: string;
  confirmPassword: string;
}

export interface AuthActionResponse {
  message?: string;
  resetToken?: string;
}

export interface AuthMeResponse {
  userId: number;
  email: string;
  username: string;
  fullName: string;
  roleId: number;
  roleName: UserRole | string;
  bankCustomerId: number | null;
  publicCustomerId: number | null;
  officerId: number | null;
}
