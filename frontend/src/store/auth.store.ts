import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LoginResponse, UserRole } from "@/src/types/dto/auth.dto";
import type { AuthMeResponse } from "@/src/types/dto/auth-me.dto";
import type { UserProfileResponse } from "@/src/types/dto/user-profile.dto";
import { authPersistence } from "@/src/store/auth.storage";

export const LOGOUT_INTENT_KEY = "logout_intent";

type AuthUser = LoginResponse["user"];

export type RoleRedirectPath = "/public-customer" | "/bank-customer" | "/bank-officer" | "/admin";

const roleRedirectMap: Record<UserRole, RoleRedirectPath> = {
  PUBLIC_CUSTOMER: "/public-customer",
  BANK_CUSTOMER: "/bank-customer",
  BANK_OFFICER: "/bank-officer",
  ADMIN: "/admin",
};

function isUserRole(value: string): value is UserRole {
  return value === "PUBLIC_CUSTOMER" || value === "BANK_CUSTOMER" || value === "BANK_OFFICER" || value === "ADMIN";
}

export function getRoleRedirectPath(role: UserRole): RoleRedirectPath {
  return roleRedirectMap[role];
}

type AuthState = {
  token: string | null;
  role: UserRole | null;
  user: AuthUser | null;
  identity: AuthMeResponse | null;
  profile: UserProfileResponse | null;
  login: (payload: LoginResponse) => RoleRedirectPath;
  setIdentity: (identity: AuthMeResponse | null) => void;
  setProfile: (profile: UserProfileResponse | null) => void;
  clearSession: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      identity: null,
      profile: null,
      login: (payload) => {
        const rawRole = payload.user.role;
        if (!isUserRole(rawRole)) {
          throw new Error(`Unsupported role returned by backend: ${rawRole}`);
        }

        const nextRole: UserRole = rawRole;

        set({
          token: payload.accessToken,
          role: nextRole,
          user: payload.user,
          identity: null,
          profile: null,
        });

        return getRoleRedirectPath(nextRole);
      },
      setIdentity: (identity) => {
        set({ identity });
      },
      setProfile: (profile) => {
        set({ profile });
      },
      clearSession: () => {
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(LOGOUT_INTENT_KEY);
        }

        set({
          token: null,
          role: null,
          user: null,
          identity: null,
          profile: null,
        });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(LOGOUT_INTENT_KEY, "1");
        }

        set({
          token: null,
          role: null,
          user: null,
          identity: null,
          profile: null,
        });
      },
    }),
    {
      name: "primecore-auth",
      storage: createJSONStorage(() => authPersistence.storage),
      partialize: (state) => ({
        token: state.token,
        role: state.role,
      }),
    },
  ),
);
