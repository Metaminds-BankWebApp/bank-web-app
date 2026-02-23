"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { useAuthStore } from "@/src/store";
import { Button, Input, useToast } from "@/src/components/ui";

function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "PrimeCore", lastName: "User" };
  }

  const [firstName, ...rest] = trimmed.split(/\s+/);
  return { firstName, lastName: rest.join(" ") || "User" };
}

export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const login = useAuthStore((state) => state.login);

  const [fullName, setFullName] = useState("Demo User");
  const [email, setEmail] = useState("demo@primecore.app");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName || !email || !password) {
      setError("Full name, email, and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { firstName, lastName } = splitName(fullName);
      const response = await authService.register({
        firstName,
        lastName,
        email,
        password,
      });

      login(response);
      showToast({ type: "success", title: "Account created", description: "Redirecting to application form." });
      router.replace("/public-customer/application");
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Unable to register. Please try again.";
      setError(message);
      showToast({ type: "error", title: "Registration failed", description: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-2xl space-y-6 text-(--primecore-foreground)">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-(--primecore-foreground)">Get started</h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input label="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Email or username" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        <Input label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone Number" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="City" value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Province" value={province} onChange={(event) => setProvince(event.target.value)} placeholder="Province" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="Address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="mt-2 h-14 w-full rounded-2xl bg-primary text-lg font-semibold text-white hover:bg-primary/90" loading={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-(--primecore-foreground)/70">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
