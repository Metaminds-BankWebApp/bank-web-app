"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { continuePublicCustomerStepOne } from "@/src/api/registration/public-customer-registration.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";

const FULL_NAME_REQUIRED = "Full name is required.";
const EMAIL_REQUIRED = "Email is required.";
const PHONE_REQUIRED = "Phone number is required.";
const CITY_REQUIRED = "City is required.";
const PROVINCE_REQUIRED = "Province is required.";
const ADDRESS_REQUIRED = "Address is required.";
const PASSWORD_REQUIRED = "Password is required.";
const CONFIRM_PASSWORD_REQUIRED = "Confirm password is required.";
const EMAIL_INVALID = "Please enter a valid email address.";
const PHONE_INVALID = "Phone number must be exactly 10 digits (numbers only).";
const PASSWORD_INVALID = "Password must be at least 10 characters and include uppercase, lowercase letters and numbers.";
const PASSWORD_MISMATCH = "Passwords do not match.";

type FieldName = "fullName" | "email" | "phone" | "city" | "province" | "address" | "password" | "confirmPassword";
type FieldErrors = Partial<Record<FieldName, string>>;

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

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
    const nextErrors: FieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

    if (!tFullName) {
      nextErrors.fullName = FULL_NAME_REQUIRED;
    }

    if (!tEmail) {
      nextErrors.email = EMAIL_REQUIRED;
    } else if (!emailRegex.test(tEmail)) {
      nextErrors.email = EMAIL_INVALID;
    }

    if (!tPhone) {
      nextErrors.phone = PHONE_REQUIRED;
    } else if (!phoneRegex.test(tPhone)) {
      nextErrors.phone = PHONE_INVALID;
    }

    if (!tCity) {
      nextErrors.city = CITY_REQUIRED;
    }

    if (!tProvince) {
      nextErrors.province = PROVINCE_REQUIRED;
    }

    if (!tAddress) {
      nextErrors.address = ADDRESS_REQUIRED;
    }

    if (!password) {
      nextErrors.password = PASSWORD_REQUIRED;
    } else if (!passwordRegex.test(password)) {
      nextErrors.password = PASSWORD_INVALID;
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = CONFIRM_PASSWORD_REQUIRED;
    } else if (password && password !== confirmPassword) {
      nextErrors.confirmPassword = PASSWORD_MISMATCH;
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setFormError(null);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

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
      setFormError(message);
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
        <Input
          label="Full Name"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
            clearFieldError("fullName");
            setFormError(null);
          }}
          error={fieldErrors.fullName}
          placeholder="John Doe"
          labelClassName="text-(--primecore-foreground)/70"
          className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
        />
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearFieldError("email");
            setFormError(null);
          }}
          error={fieldErrors.email}
          placeholder="name@example.com"
          labelClassName="text-(--primecore-foreground)/70"
          className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Phone Number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              clearFieldError("phone");
              setFormError(null);
            }}
            error={fieldErrors.phone}
            helperText="Enter a 10-digit phone number (numbers only)."
            placeholder="e.g. 7123456789"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="City"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              clearFieldError("city");
              setFormError(null);
            }}
            error={fieldErrors.city}
            placeholder="City"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Province"
            value={province}
            onChange={(event) => {
              setProvince(event.target.value);
              clearFieldError("province");
              setFormError(null);
            }}
            error={fieldErrors.province}
            placeholder="Province"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="Address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              clearFieldError("address");
              setFormError(null);
            }}
            error={fieldErrors.address}
            placeholder="Address"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        <Input label="Bank Account Number" value={bankAccount} onChange={(event) => setBankAccount(event.target.value)} placeholder="100023456789" labelClassName="text-(--primecore-foreground)/70" className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearFieldError("password");
              clearFieldError("confirmPassword");
              setFormError(null);
            }}
            error={fieldErrors.password}
            helperText="Use at least 10 characters, including uppercase, lowercase and numbers."
            placeholder="At least 10 chars, upper, lower, number"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              clearFieldError("confirmPassword");
              setFormError(null);
            }}
            error={fieldErrors.confirmPassword}
            placeholder="Confirm password"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        {formError && <p className="text-xs text-red-500 dark:text-red-400">{formError}</p>}

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
