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
    role: UserRole;
  };
}
