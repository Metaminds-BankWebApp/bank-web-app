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
      showToast({ type: "success", title: "Account created", description: "Redirecting to your dashboard." });
      router.replace("/public-customer");
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
    <section className="w-full max-w-2xl space-y-6 text-[#1f2937]">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0d3b66]">Get started</h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input label="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Email or username" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
        <Input label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone Number" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
          <Input label="City" value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Province" value={province} onChange={(event) => setProvince(event.target.value)} placeholder="Province" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
          <Input label="Address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
          <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" labelClassName="text-[#6b7280]" className="h-14 rounded-2xl border-[#d9dee5] bg-white text-[#1f2937] placeholder:text-[#9ca3af] ring-offset-white" />
        </div>

        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

        <Button type="submit" className="mt-2 h-14 w-full rounded-2xl bg-[#0d3b66] text-lg font-semibold hover:bg-[#0b3155]" loading={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#1f2937] underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
