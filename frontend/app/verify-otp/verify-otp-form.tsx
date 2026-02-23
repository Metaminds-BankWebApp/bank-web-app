"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";

export function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maskedEmail = useMemo(() => {
    const rawEmail = searchParams.get("email") ?? "your email";
    if (!rawEmail.includes("@")) {
      return rawEmail;
    }

    const [name, domain] = rawEmail.split("@");
    const prefix = name.slice(0, 2);
    return `${prefix}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim().length !== 6 || !/^\d{6}$/.test(otp.trim())) {
      setError("Enter the 6-digit OTP code.");
      return;
    }

    const rawEmail = searchParams.get("email") ?? "";
    if (!rawEmail) {
      setError("Missing email context. Restart from forgot password.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await authService.verifyOtp({
        email: rawEmail,
        otp: otp.trim(),
      });
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

    router.push(`/reset-password?email=${encodeURIComponent(rawEmail)}`);
    setIsSubmitting(false);
  }

  return (
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify OTP</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Enter the 6-digit code sent to {maskedEmail}.</p>
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
            <Link href="/forgot-password" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Resend OTP
            </Link>
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
