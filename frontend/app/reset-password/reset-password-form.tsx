"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { Button, useToast } from "@/src/components/ui";
import { clearPasswordResetToken, getPasswordResetToken, savePasswordResetToken } from "@/src/lib/password-reset-session";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const activationToken = searchParams.get("activationToken")?.trim();
    if (activationToken) {
      savePasswordResetToken(activationToken);
      router.replace("/reset-password");
      setResetToken(activationToken);
      return;
    }
    setResetToken(getPasswordResetToken());
  }, [router, searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,255}$/.test(password)) {
      setError("Password must be at least 10 characters and include uppercase, lowercase, and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      setError("This activation or reset session is missing or has expired. Request a new link.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await authService.resetPassword({
        resetToken,
        password,
        confirmPassword,
      });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to reset password. Please try again.";
      setError(message);
      setIsSubmitting(false);
      showToast({
        type: "error",
        title: "Reset failed",
        description: message,
      });
      return;
    }

    showToast({
      type: "success",
      title: "Password updated",
      description: "You can now sign in with your new password.",
    });

    clearPasswordResetToken();
    router.push("/login");
    setIsSubmitting(false);
  }

  return (
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset password</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Choose a strong new password for your account.</p>
        <p className="text-xs text-(--primecore-foreground)/60">Use at least 10 characters with uppercase, lowercase, and a number.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="reset-password" className="text-sm font-medium text-(--primecore-foreground)/70">New Password</label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
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

        <div className="space-y-1.5">
          <label htmlFor="reset-confirm-password" className="text-sm font-medium text-(--primecore-foreground)/70">Confirm Password</label>
          <div className="relative">
            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="h-14 w-full rounded-2xl border border-(--primecore-border) bg-(--primecore-surface) px-3.5 py-2.5 pr-12 text-sm text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold" loading={isSubmitting}>
          {isSubmitting ? "Updating password..." : "Reset password"}
        </Button>

        <p className="text-center text-sm text-(--primecore-foreground)/70">
          Return to{" "}
          <Link href="/login" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
