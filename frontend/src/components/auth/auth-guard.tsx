"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOGOUT_INTENT_KEY, getRoleRedirectPath, useAuthStore } from "@/src/store";
import type { UserRole } from "@/src/types/dto/auth.dto";

type AuthGuardProps = {
  requiredRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AuthGuard({ requiredRole, children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const isHydrated = useAuthStore.persist.hasHydrated();

  useEffect(() => {
    if (isHydrated) {
      return;
    }

    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      // Hydration complete, component will re-render via store subscription
    });

    void useAuthStore.persist.rehydrate();

    return () => {
      unsubscribe();
    };
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!token || !role) {
      const hasLogoutIntent =
        typeof window !== "undefined" && window.sessionStorage.getItem(LOGOUT_INTENT_KEY) === "1";

      if (hasLogoutIntent) {
        router.replace("/");
        return;
      }

      router.replace("/login");
      return;
    }

    if (role !== requiredRole) {
      router.replace(getRoleRedirectPath(role));
    }
  }, [isHydrated, token, role, requiredRole, router]);

  if (!isHydrated) {
    return fallback ?? <div className="h-40 animate-pulse rounded-xl border border-(--primecore-border) bg-(--primecore-surface-soft)" />;
  }

  if (!token || !role || role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
