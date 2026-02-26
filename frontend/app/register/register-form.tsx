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

    // Trim inputs
    const tFullName = fullName.trim();
    const tEmail = email.trim();
    const tPhone = phone.trim();
    const tCity = city.trim();
    const tProvince = province.trim();
    const tAddress = address.trim();

    // Basic required checks
    if (!tFullName) {
      setError("Full name is required.");
      return;
    }

    if (!tEmail) {
      setError("Email is required.");
      return;
    }

    if (!tPhone) {
      setError("Phone number is required.");
      return;
    }

    if (!tCity) {
      setError("City is required.");
      return;
    }

    if (!tProvince) {
      setError("Province is required.");
      return;
    }

    if (!tAddress) {
      setError("Address is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Phone: exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(tPhone)) {
      setError("Phone number must be exactly 10 digits (numbers only).");
      return;
    }

    // Password complexity: minimum 10 chars, at least one uppercase, one lowercase and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 10 characters and include uppercase, lowercase letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { firstName, lastName } = splitName(tFullName);
      const response = await authService.register({
        firstName,
        lastName,
        email: tEmail,
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
    <section className="w-full space-y-6 text-(--primecore-foreground)">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-(--primecore-foreground)">Create your account</h1>
        <p className="text-sm text-(--primecore-foreground)/70">Set up your profile to access the PrimeCore dashboard and services.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input label="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="John Doe" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        <Input label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input label="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="e.g. 7123456789" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
            <p className="mt-1 text-xs text-(--primecore-foreground)/60">Enter a 10-digit phone number (numbers only).</p>
          </div>
          <Input label="City" value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Province" value={province} onChange={(event) => setProvince(event.target.value)} placeholder="Province" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="Address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 10 chars, upper, lower, number" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
            <p className="mt-1 text-xs text-(--primecore-foreground)/60">Use at least 10 characters, including uppercase, lowercase and numbers.</p>
          </div>
          <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="mt-2 h-14 w-full rounded-2xl bg-primary text-lg font-semibold text-black hover:bg-primary/90" loading={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          After sign up, you will be redirected to complete the public customer application form.
        </p>

        <div className="space-y-2 text-center text-sm text-(--primecore-foreground)/70">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
          <p>
            Need help accessing your account?{" "}
            <Link href="/forgot-password" className="font-medium text-(--primecore-foreground) underline-offset-4 hover:underline">
              Reset password
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
