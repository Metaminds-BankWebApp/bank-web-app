"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/src/api/auth/auth.service";
import { ApiError } from "@/src/types/api-error";
import { useAuthStore } from "@/src/store";
import { Button, Input, useToast } from "@/src/components/ui";

const FIRST_NAME_REQUIRED = "First name is required.";
const FIRST_NAME_INVALID = "First name can contain letters, spaces, apostrophes and hyphens only.";
const LAST_NAME_REQUIRED = "Last name is required.";
const LAST_NAME_INVALID = "Last name can contain letters, spaces, apostrophes and hyphens only.";
const EMAIL_REQUIRED = "Email is required.";
const PHONE_REQUIRED = "Phone number is required.";
const NIC_REQUIRED = "NIC is required.";
const NIC_INVALID = "NIC must be 12 digits or 9 digits followed by V/X.";
const DOB_REQUIRED = "Date of birth is required.";
const DOB_INVALID = "Please enter a valid date of birth.";
const DOB_FUTURE = "Date of birth must be in the past.";
const DOB_AGE_LIMIT = "You must be at least 18 years old.";
const USERNAME_REQUIRED = "Username is required.";
const USERNAME_INVALID = "Username must be 4-30 characters and can contain letters, numbers, dots and underscores.";
const PROVINCE_REQUIRED = "Province is required.";
const ADDRESS_REQUIRED = "Address is required.";
const PASSWORD_REQUIRED = "Password is required.";
const CONFIRM_PASSWORD_REQUIRED = "Confirm password is required.";
const EMAIL_INVALID = "Please enter a valid email address.";
const PHONE_INVALID = "Phone number must be exactly 10 digits (numbers only).";
const PASSWORD_INVALID = "Password must be at least 10 characters and include uppercase, lowercase letters and numbers.";
const PASSWORD_MISMATCH = "Passwords do not match.";

type FieldName = "firstName" | "lastName" | "email" | "phone" | "nic" | "dateOfBirth" | "username" | "province" | "address" | "password" | "confirmPassword";
type FieldErrors = Partial<Record<FieldName, string>>;

export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const login = useAuthStore((state) => state.login);

  const [firstName, setFirstName] = useState("Demo");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("demo@primecore.app");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [username, setUsername] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const tUsername = username.trim();
    const tProvince = province.trim();
    const tAddress = address.trim();
    const nextErrors: FieldErrors = {};
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]{0,49}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nicRegex = /^(\d{12}|\d{9}[vVxX])$/;
    const usernameRegex = /^[a-zA-Z0-9._]{4,30}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!tFirstName) {
      nextErrors.firstName = FIRST_NAME_REQUIRED;
    } else if (!nameRegex.test(tFirstName)) {
      nextErrors.firstName = FIRST_NAME_INVALID;
    }

    if (!tLastName) {
      nextErrors.lastName = LAST_NAME_REQUIRED;
    } else if (!nameRegex.test(tLastName)) {
      nextErrors.lastName = LAST_NAME_INVALID;
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

    if (!tNic) {
      nextErrors.nic = NIC_REQUIRED;
    } else if (!nicRegex.test(tNic)) {
      nextErrors.nic = NIC_INVALID;
    }

    if (!dateOfBirth) {
      nextErrors.dateOfBirth = DOB_REQUIRED;
    } else {
      const parsedDob = new Date(dateOfBirth);
      if (Number.isNaN(parsedDob.getTime())) {
        nextErrors.dateOfBirth = DOB_INVALID;
      } else if (parsedDob >= today) {
        nextErrors.dateOfBirth = DOB_FUTURE;
      } else {
        const age = today.getFullYear() - parsedDob.getFullYear() - (today.getMonth() < parsedDob.getMonth() || (today.getMonth() === parsedDob.getMonth() && today.getDate() < parsedDob.getDate()) ? 1 : 0);
        if (age < 18) {
          nextErrors.dateOfBirth = DOB_AGE_LIMIT;
        }
      }
    }

    if (!tUsername) {
      nextErrors.username = USERNAME_REQUIRED;
    } else if (!usernameRegex.test(tUsername)) {
      nextErrors.username = USERNAME_INVALID;
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
      const response = await authService.register({
        firstName: tFirstName,
        lastName: tLastName,
        email: tEmail,
        password,
      });

      login(response);
      showToast({ type: "success", title: "Account created", description: "Redirecting to application form." });
      router.replace("/public-customer/application");
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="First Name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              clearFieldError("firstName");
              setFormError(null);
            }}
            error={fieldErrors.firstName}
            placeholder="Demo"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              clearFieldError("lastName");
              setFormError(null);
            }}
            error={fieldErrors.lastName}
            placeholder="User"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

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
            label="NIC"
            value={nic}
            onChange={(event) => {
              setNic(event.target.value);
              clearFieldError("nic");
              setFormError(null);
            }}
            error={fieldErrors.nic}
            placeholder="200012345678"
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(event) => {
              setDateOfBirth(event.target.value);
              clearFieldError("dateOfBirth");
              setFormError(null);
            }}
            error={fieldErrors.dateOfBirth}
            labelClassName="text-(--primecore-foreground)/70"
            className="h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) ring-offset-background"
          />
          <Input
            label="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              clearFieldError("username");
              setFormError(null);
            }}
            error={fieldErrors.username}
            placeholder="john.doe.2000"
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
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-(--primecore-foreground)/70">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  clearFieldError("confirmPassword");
                  setFormError(null);
                }}
                aria-invalid={!!fieldErrors.confirmPassword}
                className={`h-14 w-full rounded-2xl border bg-(--primecore-surface) px-3.5 pr-11 text-sm text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background ${
                  fieldErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "border-(--primecore-border)"
                }`}
                placeholder="Confirm password"
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
