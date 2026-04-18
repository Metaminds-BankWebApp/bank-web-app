"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { continuePublicCustomerStepOne } from "@/src/api/registration/public-customer-registration.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";

export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState("Demo");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("demo@primecore.app");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Trim inputs
    const tFirstName = firstName.trim();
    const tLastName = lastName.trim();
    const tEmail = email.trim();
    const tPhone = phone.trim();
    const tNic = nic.trim();
    const tDob = dob.trim();
    const tUsername = username.trim();
    const tBankAccount = bankAccount.trim();
    const tProvince = province.trim();
    const tAddress = address.trim();

    // Basic required checks
    if (!tFirstName) {
      setError("First name is required.");
      return;
    }

    if (!tLastName) {
      setError("Last name is required.");
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

    if (!tNic) {
      setError("NIC is required.");
      return;
    }

    if (!tDob) {
      setError("Date of birth is required.");
      return;
    }

    if (!tUsername) {
      setError("Username is required.");
      return;
    }

    if (!tBankAccount) {
      setError("Bank account number is required.");
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

    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    if (!nicRegex.test(tNic)) {
      setError("Please enter a valid NIC.");
      return;
    }

    if (tUsername.length < 4) {
      setError("Username must be at least 4 characters.");
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
      await continuePublicCustomerStepOne({
        firstName: tFirstName,
        lastName: tLastName,
        nic: tNic,
        dob: tDob,
        email: tEmail,
        mobile: tPhone,
        province: tProvince,
        address: tAddress,
        username: tUsername,
        password,
        confirmPassword,
        bankAccount: tBankAccount,
      });

      showToast({
        type: "success",
        title: "Account created",
        description: "Your registration step one is saved. Please sign in.",
      });
      router.replace("/login");
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="John" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Doe" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>
        <Input label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input label="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="e.g. 7123456789" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
            <p className="mt-1 text-xs text-(--primecore-foreground)/60">Enter a 10-digit phone number (numbers only).</p>
          </div>
          <Input label="NIC" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="200012345678" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Date of Birth" type="date" value={dob} onChange={(event) => setDob(event.target.value)} labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="Username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="john.doe.2000" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Province" value={province} onChange={(event) => setProvince(event.target.value)} placeholder="Province" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
          <Input label="Address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />
        </div>

        <Input label="Bank Account Number" value={bankAccount} onChange={(event) => setBankAccount(event.target.value)} placeholder="100023456789" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />

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
