"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { registerPublicCustomer } from "@/src/api/registration/public-customer-registration.service";
import { ApiError } from "@/src/types/api-error";
import { Button, Input, useToast } from "@/src/components/ui";

type RegisterField = "firstName" | "lastName" | "email" | "phone" | "nic" | "dob" | "username" | "province" | "address" | "password" | "confirmPassword";
type RegisterFieldErrors = Partial<Record<RegisterField, string>>;
type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  dob: string;
  username: string;
  province: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const REGISTER_FIELDS: RegisterField[] = ["firstName", "lastName", "email", "phone", "nic", "dob", "username", "province", "address", "password", "confirmPassword"];

function extractRegisterFieldErrors(apiError: ApiError): RegisterFieldErrors {
  const details = apiError.details as { fieldErrors?: unknown } | undefined;
  const rawFieldErrors = details?.fieldErrors;
  if (!rawFieldErrors || typeof rawFieldErrors !== "object") {
    return {};
  }

  const source = rawFieldErrors as Record<string, unknown>;
  const result: RegisterFieldErrors = {};

  for (const field of REGISTER_FIELDS) {
    if (typeof source[field] === "string") {
      result[field] = source[field];
    }
  }

  return result;
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
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});

  function clearFieldError(field: RegisterField) {
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function getCurrentValues(): RegisterFormValues {
    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      nic: nic.trim(),
      dob: dob.trim(),
      username: username.trim(),
      province: province.trim(),
      address: address.trim(),
      password,
      confirmPassword,
    };
  }

  function validateField(field: RegisterField, values: RegisterFormValues): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

    switch (field) {
      case "firstName":
        return values.firstName ? null : "First name is required.";
      case "lastName":
        return values.lastName ? null : "Last name is required.";
      case "email":
        if (!values.email) return "Email is required.";
        return emailRegex.test(values.email) ? null : "Please enter a valid email address.";
      case "phone":
        if (!values.phone) return "Phone number is required.";
        return phoneRegex.test(values.phone) ? null : "Phone number must be exactly 10 digits (numbers only).";
      case "nic":
        if (!values.nic) return "NIC is required.";
        return nicRegex.test(values.nic) ? null : "Please enter a valid NIC.";
      case "dob":
        if (!values.dob) return "Date of birth is required.";
        {
          const birthDate = new Date(values.dob);
          if (Number.isNaN(birthDate.getTime())) {
            return "Please enter a valid date of birth.";
          }

          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age -= 1;
          }

          return age >= 18 ? null : "Age must be 18 or older.";
        }
      case "username":
        if (!values.username) return "Username is required.";
        return values.username.length >= 4 ? null : "Username must be at least 4 characters.";
      case "province":
        return values.province ? null : "Province is required.";
      case "address":
        return values.address ? null : "Address is required.";
      case "password":
        if (!values.password) return "Password is required.";
        return passwordRegex.test(values.password) ? null : "Password must be at least 10 characters and include uppercase, lowercase letters and numbers.";
      case "confirmPassword":
        if (!values.confirmPassword) return "Confirm password is required.";
        return values.password === values.confirmPassword ? null : "Passwords do not match.";
      default:
        return null;
    }
  }

  function validateSingleField(field: RegisterField) {
    const values = getCurrentValues();
    const message = validateField(field, values);

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) {
        next[field] = message;
      } else {
        delete next[field];
      }
      return next;
    });
  }

  function validateAllFields(values: RegisterFormValues): RegisterFieldErrors {
    const nextErrors: RegisterFieldErrors = {};
    for (const field of REGISTER_FIELDS) {
      const message = validateField(field, values);
      if (message) {
        nextErrors[field] = message;
      }
    }
    return nextErrors;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = getCurrentValues();
    const nextErrors = validateAllFields(values);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      await registerPublicCustomer({
        firstName: values.firstName,
        lastName: values.lastName,
        nic: values.nic,
        dob: values.dob,
        email: values.email,
        mobile: values.phone,
        bankAccount: Number(values.phone),
        province: values.province,
        address: values.address,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      showToast({
        type: "success",
        title: "Account created",
        description: "Your registration step one is saved. Please sign in.",
      });
      router.replace("/login");
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      if (apiError) {
        setFieldErrors(extractRegisterFieldErrors(apiError));
      }
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
          <Input
            label="First Name"
            value={firstName}
            error={fieldErrors.firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              clearFieldError("firstName");
              setError(null);
            }}
            onBlur={() => validateSingleField("firstName")}
            placeholder="John"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="Last Name"
            value={lastName}
            error={fieldErrors.lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              clearFieldError("lastName");
              setError(null);
            }}
            onBlur={() => validateSingleField("lastName")}
            placeholder="Doe"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>
        <Input
          label="Email Address"
          type="email"
          value={email}
          error={fieldErrors.email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearFieldError("email");
            setError(null);
          }}
          onBlur={() => validateSingleField("email")}
          placeholder="name@example.com"
          labelClassName="text-(--primecore-foreground)/70"
          className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input
              label="Phone Number"
              value={phone}
              error={fieldErrors.phone}
              onChange={(event) => {
                setPhone(event.target.value);
                clearFieldError("phone");
                setError(null);
              }}
              onBlur={() => validateSingleField("phone")}
              helperText="Enter a 10-digit phone number (numbers only)."
              placeholder="e.g. 7123456789"
              labelClassName="text-(--primecore-foreground)/70"
              className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
            />
          </div>
          <Input
            label="NIC"
            value={nic}
            error={fieldErrors.nic}
            onChange={(event) => {
              setNic(event.target.value);
              clearFieldError("nic");
              setError(null);
            }}
            onBlur={() => validateSingleField("nic")}
            placeholder="200012345678"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Date of Birth"
            type="date"
            value={dob}
            error={fieldErrors.dob}
            onChange={(event) => {
              setDob(event.target.value);
              clearFieldError("dob");
              setError(null);
            }}
            onBlur={() => validateSingleField("dob")}
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="Username"
            value={username}
            error={fieldErrors.username}
            onChange={(event) => {
              setUsername(event.target.value);
              clearFieldError("username");
              setError(null);
            }}
            onBlur={() => validateSingleField("username")}
            placeholder="john.doe.2000"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Province"
            value={province}
            error={fieldErrors.province}
            onChange={(event) => {
              setProvince(event.target.value);
              clearFieldError("province");
              setError(null);
            }}
            onBlur={() => validateSingleField("province")}
            placeholder="Province"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="Address"
            value={address}
            error={fieldErrors.address}
            onChange={(event) => {
              setAddress(event.target.value);
              clearFieldError("address");
              setError(null);
            }}
            onBlur={() => validateSingleField("address")}
            placeholder="Address"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              error={fieldErrors.password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearFieldError("password");
                clearFieldError("confirmPassword");
                setError(null);
              }}
              onBlur={() => validateSingleField("password")}
              helperText="Use at least 10 characters, including uppercase, lowercase and numbers."
              placeholder="At least 10 chars, upper, lower, number"
              labelClassName="text-(--primecore-foreground)/70"
              className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-(--primecore-foreground)/70">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  clearFieldError("confirmPassword");
                  setError(null);
                }}
                onBlur={() => validateSingleField("confirmPassword")}
                aria-invalid={!!fieldErrors.confirmPassword}
                placeholder="Confirm password"
                className={`h-14 w-full rounded-2xl border bg-(--primecore-surface) px-3.5 pr-11 text-sm text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background ${
                  fieldErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "border-(--primecore-border)"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--primecore-foreground)/60 hover:text-(--primecore-foreground)"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors.confirmPassword}</p>}
          </div>
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
