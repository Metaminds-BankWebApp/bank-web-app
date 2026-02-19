import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LoginResponse, UserRole } from "@/src/types/dto/auth.dto";
import { authPersistence } from "@/src/store/auth.storage";

type AuthUser = LoginResponse["user"];

export type RoleRedirectPath = "/public-customer/application" | "/bank-customer" | "/bank-officer" | "/admin";

const roleRedirectMap: Record<UserRole, RoleRedirectPath> = {
  PUBLIC_CUSTOMER: "/public-customer/application",
  BANK_CUSTOMER: "/bank-customer",
  BANK_OFFICER: "/bank-officer",
  ADMIN: "/admin",
};

export function getRoleRedirectPath(role: UserRole): RoleRedirectPath {
  return roleRedirectMap[role];
}

type AuthState = {
  token: string | null;
  role: UserRole | null;
  user: AuthUser | null;
  login: (payload: LoginResponse) => RoleRedirectPath;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      login: (payload) => {
        const nextRole = payload.user.role;

        set({
          token: payload.accessToken,
          role: nextRole,
          user: payload.user,
        });

        return getRoleRedirectPath(nextRole);
      },
      logout: () => {
        set({
          token: null,
          role: null,
          user: null,
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
