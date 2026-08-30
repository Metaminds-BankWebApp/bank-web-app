"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Eye, EyeOff, Mail, RefreshCw } from "lucide-react";
import { authService } from "@/src/api/auth/auth.service";
import type { OfficerActivationResponse } from "@/src/types/dto/auth.dto";
import { ApiError } from "@/src/types/api-error";
import { Button, useToast } from "@/src/components/ui";
import {
  clearPasswordResetToken,
  getPasswordResetSessionKind,
  getPasswordResetToken,
  savePasswordResetToken,
  type PasswordResetSessionKind,
} from "@/src/lib/password-reset-session";

const BLOCKING_ACTIVATION_STATES = new Set([
  "EXPIRED",
  "RESENT",
  "PASSWORD_SET",
  "ACTIVATED",
  "RESEND_LIMIT_REACHED",
  "INVALID",
]);

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [sessionKind, setSessionKind] = useState<PasswordResetSessionKind>("PASSWORD_RESET");
  const [sessionReady, setSessionReady] = useState(false);
  const [activation, setActivation] = useState<OfficerActivationResponse | null>(null);
  const [isCheckingActivation, setIsCheckingActivation] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const activationToken = searchParams.get("activationToken")?.trim();
    if (activationToken) {
      savePasswordResetToken(activationToken, "OFFICER_ACTIVATION");
      setSessionKind("OFFICER_ACTIVATION");
      setResetToken(activationToken);
      setSessionReady(true);
      router.replace("/reset-password");
      return;
    }

    setResetToken(getPasswordResetToken());
    setSessionKind(getPasswordResetSessionKind());
    setSessionReady(true);
  }, [router, searchParams]);

  useEffect(() => {
    if (!sessionReady || !resetToken) {
      return;
    }

    let cancelled = false;
    setIsCheckingActivation(true);
    authService
      .inspectOfficerActivation({ activationToken: resetToken })
      .then((response) => {
        if (cancelled) return;
        const isActivationResponse =
          response.status !== "NOT_ACTIVATION" &&
          (response.status !== "INVALID" || sessionKind === "OFFICER_ACTIVATION");
        if (isActivationResponse) {
          setSessionKind("OFFICER_ACTIVATION");
          setActivation(response);
        }
      })
      .catch(() => {
        // A temporary status-check failure must not prevent a still-valid password submission.
      })
      .finally(() => {
        if (!cancelled) setIsCheckingActivation(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resetToken, sessionKind, sessionReady]);

  async function refreshActivationStatus() {
    if (!resetToken) return;
    try {
      const response = await authService.inspectOfficerActivation({ activationToken: resetToken });
      if (response.status !== "NOT_ACTIVATION") {
        setSessionKind("OFFICER_ACTIVATION");
        setActivation(response);
      }
    } catch {
      // Keep the original reset error when the follow-up status request also fails.
    }
  }

  async function resendActivation() {
    if (!resetToken || isResending) return;

    setError(null);
    setIsResending(true);
    try {
      const response = await authService.resendOfficerActivation({ activationToken: resetToken });
      setActivation(response);
      showToast({
        type: "success",
        title: "New activation link sent",
        description: response.message,
      });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to send a new activation link. Please try again.";
      setError(message);
      await refreshActivationStatus();
      showToast({ type: "error", title: "Resend failed", description: message });
    } finally {
      setIsResending(false);
    }
  }

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
      await authService.resetPassword({ resetToken, password, confirmPassword });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to reset password. Please try again.";
      setError(message);
      await refreshActivationStatus();
      setIsSubmitting(false);
      showToast({ type: "error", title: "Password setup failed", description: message });
      return;
    }

    showToast({
      type: "success",
      title: sessionKind === "OFFICER_ACTIVATION" ? "Password created" : "Password updated",
      description:
        sessionKind === "OFFICER_ACTIVATION"
          ? "Sign in with your new password to activate your officer account."
          : "You can now sign in with your new password.",
    });

    clearPasswordResetToken();
    router.push("/login");
    setIsSubmitting(false);
  }

  const activationBlocksForm = Boolean(
    activation && BLOCKING_ACTIVATION_STATES.has(activation.status)
  );

  if (sessionKind === "OFFICER_ACTIVATION" && isCheckingActivation && !activation) {
    return (
      <section className="w-full space-y-4 text-center text-(--primecore-foreground)">
        <RefreshCw className="mx-auto h-9 w-9 animate-spin text-primary" />
        <h1 className="text-2xl font-bold">Checking activation link</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Please wait while we securely validate your invitation.</p>
      </section>
    );
  }

  if (activation && activationBlocksForm) {
    const sent = activation.status === "RESENT";
    const completed = activation.status === "PASSWORD_SET" || activation.status === "ACTIVATED";
    const limitReached = activation.status === "RESEND_LIMIT_REACHED";
    const Icon = sent || completed ? CheckCircle2 : AlertTriangle;

    return (
      <section className="w-full space-y-6 text-center text-(--primecore-foreground)">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${sent || completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
          <Icon className="h-8 w-8" />
        </div>
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">
            {sent
              ? "Check your email"
              : completed
                ? "Password already created"
                : limitReached
                  ? "Resend limit reached"
                  : activation.status === "INVALID"
                    ? "Invalid activation link"
                    : "Activation link expired"}
          </h1>
          <p className="text-sm text-(--primecore-foreground)/70">{activation.message}</p>
        </header>

        {activation.canResend ? (
          <button
            type="button"
            onClick={() => void resendActivation()}
            disabled={isResending}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Mail className="h-4 w-4" />
            {isResending ? "Sending..." : `Send new activation link (${activation.remainingResends} remaining)`}
          </button>
        ) : null}

        {error ? <p className="text-xs text-red-500 dark:text-red-400">{error}</p> : null}

        <p className="text-sm text-(--primecore-foreground)/70">
          Return to{" "}
          <Link href="/login" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {sessionKind === "OFFICER_ACTIVATION" ? "Create your password" : "Reset password"}
        </h1>
        <p className="text-sm text-(--primecore-foreground)/70">
          {sessionKind === "OFFICER_ACTIVATION"
            ? "Create a password for your bank officer account. Your account becomes active after your first sign-in."
            : "Choose a strong new password for your account."}
        </p>
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

        {error ? <p className="text-xs text-red-500 dark:text-red-400">{error}</p> : null}

        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-base font-semibold"
          loading={isSubmitting}
          disabled={
            !sessionReady ||
            (sessionKind === "OFFICER_ACTIVATION" && isCheckingActivation)
          }
        >
          {isSubmitting ? "Saving password..." : sessionKind === "OFFICER_ACTIVATION" ? "Create password" : "Reset password"}
        </Button>

        {activation?.status === "VALID" && activation.canResend ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center text-sm text-amber-900">
            <p>Having trouble or did the request time out?</p>
            <button
              type="button"
              onClick={() => void resendActivation()}
              disabled={isResending}
              className="mt-1 font-semibold underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isResending ? "Sending..." : `Send a replacement link (${activation.remainingResends} remaining)`}
            </button>
          </div>
        ) : null}

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
