"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";
import { clearPasswordResetToken, getPasswordResetToken } from "@/src/lib/password-reset-session";

export function ResetPasswordForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setResetToken(getPasswordResetToken());
  }, []);

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
      setError("Missing reset session. Restart from forgot password.");
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
        <Input
          label="New Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter new password"
          className="h-14 rounded-2xl"
          labelClassName="text-(--primecore-foreground)/70"
        />

        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm new password"
          className="h-14 rounded-2xl"
          labelClassName="text-(--primecore-foreground)/70"
        />

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
