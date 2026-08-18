"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";
import { savePasswordResetToken } from "@/src/lib/password-reset-session";

export function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(60);
  const [error, setError] = useState<string | null>(null);

  const identifier = searchParams.get("identifier") ?? "";
  const deliveryTarget = useMemo(() => {
    if (!identifier.includes("@")) {
      return "your registered email address";
    }

    const [name, domain] = identifier.split("@");
    const prefix = name.slice(0, 2);
    return `${prefix}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
  }, [identifier]);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timeout = window.setTimeout(() => setResendSeconds((current) => current - 1), 1_000);
    return () => window.clearTimeout(timeout);
  }, [resendSeconds]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim().length !== 6 || !/^\d{6}$/.test(otp.trim())) {
      setError("Enter the 6-digit OTP code.");
      return;
    }

    if (!identifier) {
      setError("Missing account context. Restart from forgot password.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    let resetToken = "";
    try {
      const response = await authService.verifyOtp({
        identifier,
        otp: otp.trim(),
      });
      resetToken = response.resetToken ?? "";
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to verify OTP. Please try again.";
      setError(message);
      setIsSubmitting(false);
      showToast({
        type: "error",
        title: "Verification failed",
        description: message,
      });
      return;
    }

    showToast({
      type: "success",
      title: "OTP verified",
      description: "You can now set a new password.",
    });

    if (!resetToken) {
      setError("OTP verified, but reset token was missing. Please request a new code.");
      setIsSubmitting(false);
      showToast({
        type: "error",
        title: "Reset token missing",
        description: "Please request a new OTP and try again.",
      });
      return;
    }

    savePasswordResetToken(resetToken);
    router.push("/reset-password");
    setIsSubmitting(false);
  }

  async function resendOtp() {
    if (!identifier || resendSeconds > 0 || isResending) return;

    setError(null);
    setIsResending(true);
    try {
      await authService.forgotPassword({ identifier });
      setResendSeconds(60);
      showToast({
        type: "success",
        title: "Verification code requested",
        description: "If an active account matches those details, a new code has been sent to its registered email.",
      });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to request a new code. Please try again.";
      setError(message);
      showToast({ type: "error", title: "Resend failed", description: message });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify OTP</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Enter the 6-digit code sent to {deliveryTarget}.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="One-Time Password"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
          placeholder="123456"
          className="h-14 rounded-2xl text-center text-xl tracking-[0.4em]"
          labelClassName="text-(--primecore-foreground)/70"
        />

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold" loading={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify code"}
        </Button>

        <div className="space-y-2 text-center text-sm text-(--primecore-foreground)/70">
          <p>
            Didn&apos;t receive a code?{" "}
            <button
              type="button"
              onClick={() => void resendOtp()}
              disabled={!identifier || resendSeconds > 0 || isResending}
              className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending ? "Sending..." : resendSeconds > 0 ? `Resend in ${resendSeconds}s` : "Resend OTP"}
            </button>
          </p>
          <p>
            Back to{" "}
            <Link href="/login" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
