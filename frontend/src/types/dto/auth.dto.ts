export type UserRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER" | "BANK_OFFICER" | "ADMIN";

export interface LoginRequest {
  identifier: string;
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
  identifier: string;
}

export interface VerifyOtpRequest {
  identifier: string;
  otp: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  password: string;
  confirmPassword: string;
}

export interface AuthActionResponse {
  message?: string;
  resetToken?: string;
}

export type OfficerActivationStatus =
  | "VALID"
  | "EXPIRED"
  | "RESENT"
  | "PASSWORD_SET"
  | "ACTIVATED"
  | "RESEND_LIMIT_REACHED"
  | "INVALID"
  | "NOT_ACTIVATION";

export interface OfficerActivationTokenRequest {
  activationToken: string;
}

export interface OfficerActivationResponse {
  status: OfficerActivationStatus;
  message: string;
  resendAttemptsUsed: number;
  remainingResends: number;
  canResend: boolean;
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
