"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
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

function normalizeRole(role: string): UserRole | null {
  const candidate = role.toUpperCase();
  if (candidate === "PUBLIC_CUSTOMER" || candidate === "BANK_CUSTOMER" || candidate === "BANK_OFFICER" || candidate === "ADMIN") {
    return candidate;
  }
  return null;
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
  const searchParams = useSearchParams();
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const force = searchParams.get("force") === "true";
    const prefilledEmail = searchParams.get("email");
    const prefilledRole = normalizeRole(searchParams.get("role") ?? "");

    setForceLogin(force);

    if (prefilledEmail) {
      setEmail(prefilledEmail.trim());
      setPassword("");
      setSelectedRole(prefilledRole ?? "PUBLIC_CUSTOMER");
    }
  }, [searchParams]);

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
      const normalizedRole = normalizeRole(response.user.role);

      if (!normalizedRole) {
        throw new ApiError({
          message: "Unsupported role returned by server.",
          code: "UNKNOWN_ERROR",
        });
      }

      const normalizedResponse: LoginResponse = {
        ...response,
        user: {
          ...response.user,
          role: normalizedRole,
        },
      };
      const redirectPath = login(normalizedResponse);

      showToast({
        type: "success",
        title: "Login successful",
        description: `Redirecting to ${toRoleLabel(normalizedRole)} dashboard.`,
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
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-(--primecore-foreground)">Welcome back</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Sign in to continue to your dashboard and account tools.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          labelClassName="text-(--primecore-foreground)/70"
          className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
        />

        <div className="space-y-1.5">
          <label htmlFor="login-password" className="text-sm font-medium text-(--primecore-foreground)/70">Password</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="h-14 w-full rounded-2xl border border-(--primecore-border) bg-(--primecore-surface) px-3.5 py-2.5 pr-12 text-sm text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end text-sm">
          <Link href="/forgot-password" className="font-medium text-[#0d3b66] underline-offset-4 hover:underline dark:text-[#7cc8ff]">
            Forgot password?
          </Link>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="login-role" className="text-sm font-medium text-(--primecore-foreground)/70">Role (demo fallback)</label>
          <select
            id="login-role"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as UserRole)}
            className="h-14 w-full rounded-2xl border border-(--primecore-border) bg-(--primecore-surface) px-4 text-sm text-(--primecore-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="mt-3 h-12 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90" loading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <div className="space-y-2 pt-1 text-center text-sm text-(--primecore-foreground)/70">
          <p>
            Need to complete 2FA?{" "}
            <Link href="/verify-otp" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Verify OTP
            </Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          Demo mode: if backend is unavailable, login continues using the selected role.
        </p>
      </form>
    </section>
  );
}
