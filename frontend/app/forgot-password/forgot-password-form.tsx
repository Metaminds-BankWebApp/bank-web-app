"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await authService.forgotPassword({ email: email.trim() });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to send verification code. Please try again.";
      setError(message);
      setIsSubmitting(false);
      showToast({
        type: "error",
        title: "Request failed",
        description: message,
      });
      return;
    }

    showToast({
      type: "success",
      title: "Verification code sent",
      description: "Check your inbox for the OTP code.",
    });

    router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
    setIsSubmitting(false);
  }

  return (
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot password</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Enter your account email to receive a one-time verification code.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="h-14 rounded-2xl"
          labelClassName="text-(--primecore-foreground)/70"
        />

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold" loading={isSubmitting}>
          {isSubmitting ? "Sending code..." : "Send verification code"}
        </Button>

        <p className="text-center text-sm text-(--primecore-foreground)/70">
          Remembered your password?{" "}
          <Link href="/login" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
