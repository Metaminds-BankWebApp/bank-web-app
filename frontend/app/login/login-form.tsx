"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { getRoleRedirectPath, useAuthStore } from "@/src/store";
import type { LoginResponse, UserRole } from "@/src/types/dto/auth.dto";
import { Button, Input, useToast } from "@/src/components/ui";

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: "PUBLIC_CUSTOMER", label: "Public Customer" },
  { value: "BANK_CUSTOMER", label: "Bank Customer" },
  { value: "BANK_OFFICER", label: "Bank Officer" },
  { value: "ADMIN", label: "Admin" },
];

function toRoleLabel(role: UserRole): string {
  const option = roleOptions.find((item) => item.value === role);
  return option?.label ?? role;
}

function createDemoPayload(email: string, role: UserRole): LoginResponse {
  const fullName = email.includes("@") ? email.split("@")[0] : "PrimeCore User";

  return {
    accessToken: `demo-token-${Date.now()}`,
    tokenType: "Bearer",
    user: {
      id: "demo-user",
      email,
      fullName,
      role,
    },
  };
}

export function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  const [email, setEmail] = useState("demo@primecore.app");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<UserRole>("PUBLIC_CUSTOMER");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [forceLogin, setForceLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setForceLogin(params.get("force") === "true");
  }, []);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
      return;
    }

    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    void useAuthStore.persist.rehydrate();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (forceLogin) {
      return;
    }

    if (!isHydrated || !token || !role) {
      return;
    }

    router.replace(getRoleRedirectPath(role));
  }, [forceLogin, isHydrated, token, role, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      const redirectPath = login(response);

      showToast({
        type: "success",
        title: "Login successful",
        description: `Redirecting to ${toRoleLabel(response.user.role)} dashboard.`,
      });

      router.replace(redirectPath);
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;

      if (apiError && ["NETWORK_ERROR", "NOT_FOUND", "TIMEOUT"].includes(apiError.code)) {
        const demoPayload = createDemoPayload(email, selectedRole);
        const redirectPath = login(demoPayload);

        showToast({
          type: "info",
          title: "API unavailable",
          description: `Started demo session as ${toRoleLabel(selectedRole)}.`,
        });

        router.replace(redirectPath);
        return;
      }

      const message = apiError?.message ?? "Unable to login. Please try again.";
      setError(message);

      showToast({
        type: "error",
        title: "Login failed",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-xl space-y-8 text-[#1f2937]">
      <header className="space-y-2">
        <h1 className="text-2xl text-center font-bold text-[#0d3b66]">Login</h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          labelClassName="text-[#6b7280]"
          className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white"
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          labelClassName="text-[#6b7280]"
          className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white"
        />

        <div className="space-y-1.5">
          <label htmlFor="login-role" className="text-sm font-medium text-[#6b7280]">Role (demo fallback)</label>
          <select
            id="login-role"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as UserRole)}
            className="h-14 w-full rounded-2xl border border-[#d9dee5] bg-white px-4 text-sm text-[#1f2937] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F9D94] focus-visible:ring-offset-2 ring-offset-white"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="mt-3 h-12 w-full rounded-xl bg-[#0d3b66] text-xl font-semibold hover:bg-[#0b3155]" loading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-[#6b7280]">
          Back to{" "}
          <Link href="/register" className="font-medium text-[#1f2937] underline-offset-4 hover:underline">
            registration page
          </Link>
        </p>
      </form>
    </section>
  );
}
