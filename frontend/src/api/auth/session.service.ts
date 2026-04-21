import apiClient, { toApiError } from "@/src/api/client";
import { AUTH_ENDPOINTS } from "@/src/api/endpoints";
import type { AuthMeResponse, AuthOwnershipScope } from "@/src/types/dto/auth-me.dto";
import { useAuthStore } from "@/src/store";

export async function getCurrentAuthIdentity(): Promise<AuthMeResponse> {
  try {
    const { data } = await apiClient.get<AuthMeResponse>(AUTH_ENDPOINTS.me);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function syncCurrentAuthIdentity(): Promise<AuthMeResponse> {
  const identity = await getCurrentAuthIdentity();
  useAuthStore.getState().setIdentity(identity);
  return identity;
}

export function resolveAuthOwnershipScope(identity: AuthMeResponse): AuthOwnershipScope {
  switch (identity.roleName) {
    case "PUBLIC_CUSTOMER":
      return { roleName: "PUBLIC_CUSTOMER", ownerId: identity.publicCustomerId, ownerKey: "publicCustomerId" };
    case "BANK_CUSTOMER":
      return { roleName: "BANK_CUSTOMER", ownerId: identity.bankCustomerId, ownerKey: "bankCustomerId" };
    case "BANK_OFFICER":
      return { roleName: "BANK_OFFICER", ownerId: identity.officerId, ownerKey: "officerId" };
    case "ADMIN":
      return { roleName: "ADMIN", ownerId: null, ownerKey: null };
    default:
      return {
        roleName: identity.roleName,
        ownerId: identity.publicCustomerId ?? identity.bankCustomerId ?? identity.officerId,
        ownerKey: identity.publicCustomerId
          ? "publicCustomerId"
          : identity.bankCustomerId
            ? "bankCustomerId"
            : identity.officerId
              ? "officerId"
              : null,
      };
  }
}

export function requireResolvedOwnerId(identity: AuthMeResponse): number {
  const ownershipScope = resolveAuthOwnershipScope(identity);
  if (ownershipScope.ownerId == null) {
    throw new Error(`No ownership id available for role ${identity.roleName}.`);
  }

  return ownershipScope.ownerId;
}