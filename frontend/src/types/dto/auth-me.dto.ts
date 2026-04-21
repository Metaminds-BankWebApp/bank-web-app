export type AuthRoleName = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER" | "BANK_OFFICER" | "ADMIN";

export interface AuthMeResponse {
  userId: number;
  email: string;
  username: string;
  fullName: string;
  roleId: number;
  roleName: AuthRoleName | string;
  bankCustomerId: number | null;
  publicCustomerId: number | null;
  officerId: number | null;
}

export type AuthOwnershipScope =
  | { roleName: "PUBLIC_CUSTOMER"; ownerId: number | null; ownerKey: "publicCustomerId" }
  | { roleName: "BANK_CUSTOMER"; ownerId: number | null; ownerKey: "bankCustomerId" }
  | { roleName: "BANK_OFFICER"; ownerId: number | null; ownerKey: "officerId" }
  | { roleName: "ADMIN"; ownerId: null; ownerKey: null }
  | { roleName: string; ownerId: number | null; ownerKey: "publicCustomerId" | "bankCustomerId" | "officerId" | null };