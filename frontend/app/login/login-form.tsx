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

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [forceLogin, setForceLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const force = searchParams.get("force") === "true";
    const prefilledIdentifier = searchParams.get("email");

    setForceLogin(force);

    if (prefilledIdentifier) {
      setIdentifier(prefilledIdentifier.trim());
      setPassword("");
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

    if (!identifier.trim() || !password) {
      setError("Email address or username and password are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await authService.login({ identifier: identifier.trim(), password });
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
          label="Email Address or Username"
          type="text"
          autoComplete="username"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="name@example.com or username"
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

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button
          type="submit"
          className="mt-3 h-12 w-full rounded-xl bg-[#3e9fd3] text-base font-semibold text-white hover:bg-[#2c8ac0]"
          loading={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <div className="pt-1 text-center text-sm text-(--primecore-foreground)/70">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </div>

      </form>
    </section>
  );
}
