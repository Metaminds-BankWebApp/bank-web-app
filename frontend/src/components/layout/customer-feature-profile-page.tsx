"use client";

import { useState } from "react";
import { Badge } from "@/src/components/ui";
import ModuleHeader from "@/src/components/ui/module-header";
import { Camera, Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";

type CustomerRoleLabel = "Bank Customer" | "Public Customer";

type CustomerFeatureProfilePageProps = {
  featureName: string;
  roleLabel: CustomerRoleLabel;
};

type SummaryItem = {
  label: string;
  value: string;
};

type FieldValidation = "email" | "phone" | "username" | "password" | "confirmPassword";

type FieldItem = {
  key: string;
  label: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
  type?: "text" | "email" | "tel" | "password";
  validate?: FieldValidation;
};

type RoleProfileConfig = {
  badgeText: string;
  summary: SummaryItem[];
  personalInfo: FieldItem[];
  security: FieldItem[];
};

const ROLE_PROFILE_CONFIG: Record<CustomerRoleLabel, RoleProfileConfig> = {
  "Public Customer": {
    badgeText: "PUBLIC CUSTOMER",
    summary: [
      { label: "User ID", value: "PC-8821" },
      { label: "Address", value: "Colombo Central" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { key: "fullName", label: "Full Name", value: "John Doe" },
      {
        key: "email",
        label: "Email Address",
        value: "john.doe@primecore.bank",
        type: "email",
        validate: "email",
      },
      {
        key: "phone",
        label: "Phone Number",
        value: "+94 77 123 4567",
        type: "tel",
        validate: "phone",
      },
      { key: "address", label: "Address", value: "Colombo Central" },
      { key: "nic", label: "NIC", value: "972346682V", readOnly: true },
      { key: "dob", label: "DOB", value: "11-09-1997", readOnly: true },
    ],
    security: [
      {
        key: "currentUsername",
        label: "Current Username",
        value: "JohnDoePC1",
        readOnly: true,
        fullWidth: true,
      },
      {
        key: "newUsername",
        label: "New Username",
        placeholder: "Enter new username",
        fullWidth: true,
      },
      {
        key: "currentPassword",
        label: "Current Password",
        placeholder: "Enter current password",
        fullWidth: true,
        type: "password",
        validate: "password",
      },
      {
        key: "newPassword",
        label: "New Password",
        placeholder: "Enter new password",
        type: "password",
        validate: "password",
      },
      {
        key: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Repeat new password",
        type: "password",
        validate: "confirmPassword",
      },
    ],
  },
  "Bank Customer": {
    badgeText: "BANK CUSTOMER",
    summary: [
      { label: "User ID", value: "CU-8821" },
      { label: "Branch Location", value: "Colombo Central" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { key: "fullName", label: "Full Name", value: "John Doe" },
      {
        key: "email",
        label: "Email Address",
        value: "john.doe@primecore.bank",
        type: "email",
        validate: "email",
      },
      {
        key: "phone",
        label: "Phone Number",
        value: "+94 77 123 4567",
        type: "tel",
        validate: "phone",
      },
      { key: "accountNumber", label: "Account Number", value: "012345678901", readOnly: true },
      { key: "branch", label: "Branch (Read-Only)", value: "Colombo Central Branch", readOnly: true },
      { key: "nic", label: "NIC", value: "972346682V", readOnly: true },
    ],
    security: [
      {
        key: "currentUsername",
        label: "Current Username",
        value: "JohnDoeBC1",
        readOnly: true,
        fullWidth: true,
      },
      { key: "newUsername", label: "New Username", placeholder: "Enter new username", fullWidth: true },
      {
        key: "currentPassword",
        label: "Current Password",
        placeholder: "Enter current password",
        fullWidth: true,
        type: "password",
        validate: "password",
      },
      {
        key: "newPassword",
        label: "New Password",
        placeholder: "Enter new password",
        type: "password",
        validate: "password",
      },
      {
        key: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Repeat new password",
        type: "password",
        validate: "confirmPassword",
      },
    ],
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_ALLOWED_REGEX = /^\+?[0-9()\s-]+$/;
const FULL_NAME_REGEX = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

function buildInitialFieldValues(fields: FieldItem[]): Record<string, string> {
  return fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = field.value ?? "";
    return acc;
  }, {});
}

function validatePublicScalarField(key: string, rawValue: string): string | undefined {
  const value = rawValue.trim();

  if (key === "fullName") {
    if (!value) return "Full name is required.";
    if (!FULL_NAME_REGEX.test(value)) return "Full name can contain letters and spaces only.";
    return undefined;
  }

  if (key === "email") {
    if (!value) return "Email address is required.";
    if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
    return undefined;
  }

  if (key === "phone") {
    const digitsOnly = value.replace(/\D/g, "");
    if (!value) return "Phone number is required.";
    if (!PHONE_ALLOWED_REGEX.test(value)) return "Use only digits, spaces, +, -, or parentheses.";
    if (digitsOnly.length < 10 || digitsOnly.length > 15) return "Phone number must be 10 to 15 digits.";
    return undefined;
  }

  return undefined;
}

function validateNewUsername(currentUsername: string, newUsername: string): string | undefined {
  const current = currentUsername.trim();
  const next = newUsername.trim();

  if (!next) return undefined;
  if (next.toLowerCase() === current.toLowerCase()) {
    return "New username must be different from current username.";
  }

  return undefined;
}

function validatePasswordGroup(values: Record<string, string>): Record<string, string> {
  const currentPassword = values.currentPassword?.trim() ?? "";
  const newPassword = values.newPassword?.trim() ?? "";
  const confirmPassword = values.confirmPassword?.trim() ?? "";

  const hasPasswordIntent = Boolean(currentPassword || newPassword || confirmPassword);
  if (!hasPasswordIntent) {
    return {};
  }

  const errors: Record<string, string> = {};

  if (!currentPassword) {
    errors.currentPassword = "Current password is required to change password.";
  }

  if (!newPassword) {
    errors.newPassword = "New password is required.";
  } else if (!PASSWORD_REGEX.test(newPassword)) {
    errors.newPassword = "Use 10+ chars with uppercase, lowercase, and number.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your new password.";
  } else if (newPassword && confirmPassword !== newPassword) {
    errors.confirmPassword = "Confirm password does not match.";
  }

  return errors;
}

export function CustomerFeatureProfilePage({ featureName, roleLabel }: CustomerFeatureProfilePageProps) {
  const isCreditLens = featureName === "CreditLens";
  const isTransact = featureName === "Transact";
  const isLoanSense = featureName === "LoanSense";
  const enableCustomerValidation = roleLabel === "Public Customer" || roleLabel === "Bank Customer";
  const profileConfig = ROLE_PROFILE_CONFIG[roleLabel];
  const [personalValues, setPersonalValues] = useState<Record<string, string>>(() =>
    buildInitialFieldValues(profileConfig.personalInfo)
  );
  const [securityValues, setSecurityValues] = useState<Record<string, string>>(() =>
    buildInitialFieldValues(profileConfig.security)
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const sectionClassName = isTransact
    ? "transact-card transact-card-hover transact-creditlens-shade rounded-2xl p-6"
    : isLoanSense
    ? "loansense-card loansense-card-hover loansense-creditlens-shade rounded-2xl p-6"
    : "rounded-2xl border border-slate-100 bg-white p-6 shadow-sm";

  const updateFieldError = (fieldKey: string, errorMessage?: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (errorMessage) {
        next[fieldKey] = errorMessage;
      } else {
        delete next[fieldKey];
      }
      return next;
    });
  };

  const applyPasswordErrors = (nextSecurityValues: Record<string, string>) => {
    if (!enableCustomerValidation) return;

    const passwordErrors = validatePasswordGroup(nextSecurityValues);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.currentPassword;
      delete next.newPassword;
      delete next.confirmPassword;
      return { ...next, ...passwordErrors };
    });
  };

  const handlePersonalChange = (field: FieldItem, value: string) => {
    if (field.readOnly) return;

    setPersonalValues((prev) => ({ ...prev, [field.key]: value }));

    if (!enableCustomerValidation) return;

    if (field.key === "fullName" || field.key === "email" || field.key === "phone") {
      updateFieldError(field.key, validatePublicScalarField(field.key, value));
    }
  };

  const handleSecurityChange = (field: FieldItem, value: string) => {
    if (field.readOnly) return;

    const nextSecurityValues = { ...securityValues, [field.key]: value };
    setSecurityValues(nextSecurityValues);

    if (!enableCustomerValidation) return;

    if (field.key === "newUsername") {
      updateFieldError(field.key, validateNewUsername(nextSecurityValues.currentUsername ?? "", value));
    }

    if (field.key === "currentPassword" || field.key === "newPassword" || field.key === "confirmPassword") {
      applyPasswordErrors(nextSecurityValues);
    }
  };

  const handleCancel = () => {
    setPersonalValues(buildInitialFieldValues(profileConfig.personalInfo));
    setSecurityValues(buildInitialFieldValues(profileConfig.security));
    setFieldErrors({});
    setShowPassword({});
  };

  const handleSave = () => {
    if (!enableCustomerValidation) return;

    const nextErrors: Record<string, string> = {};

    const fullNameError = validatePublicScalarField("fullName", personalValues.fullName ?? "");
    if (fullNameError) nextErrors.fullName = fullNameError;

    const emailError = validatePublicScalarField("email", personalValues.email ?? "");
    if (emailError) nextErrors.email = emailError;

    const phoneError = validatePublicScalarField("phone", personalValues.phone ?? "");
    if (phoneError) nextErrors.phone = phoneError;

    const usernameError = validateNewUsername(
      securityValues.currentUsername ?? "",
      securityValues.newUsername ?? ""
    );
    if (usernameError) nextErrors.newUsername = usernameError;

    Object.assign(nextErrors, validatePasswordGroup(securityValues));
    setFieldErrors(nextErrors);
  };

  const togglePasswordVisibility = (fieldKey: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldKey]: !prev[fieldKey] }));
  };

  const renderFeatureHeader = () => {
    if (featureName === "CreditLens") {
      return <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Profile" subtitle="" name="John Doe" role={roleLabel} />;
    }

    if (featureName === "Transact") {
      return (
        <ModuleHeader
          theme="transact"
          menuMode="feature-layout"
          role="Bank Customer"
          title="Profile"
          subtitle={`John Doe - ${roleLabel}`}
          name={`John Doe - ${roleLabel}`}
        />
      );
    }

    if (featureName === "LoanSense") {
      return <ModuleHeader theme="loansense" menuMode="feature-layout" title="Profile" />;
    }

    if (featureName === "SpendIQ") {
      return <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Profile" />;
    }

    return <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Profile" subtitle="" name="John Doe" role={roleLabel} />;
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isTransact || isLoanSense ? "bg-transparent" : "bg-[#f3f4f6]"}`}>
      {renderFeatureHeader()}

      <div className="mx-auto my-auto w-full max-h-full max-w-7xl space-y-6 sm:mt-20">
        

        <div className={isCreditLens ? "grid gap-6 lg:px-2 xl:grid-cols-[1fr_1.6fr] xl:px-3" : "grid gap-6 xl:grid-cols-[1fr_1.6fr]"}>
          <div className="space-y-6">
            <section className={sectionClassName}>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#e2edf6] text-3xl font-bold text-[#0d3b66]">
                  JD
                  <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
                    <Camera size={14} />
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#0d3b66]">John Doe</h2>
                  <Badge className="mt-2 rounded-full bg-[#ecfdf5] text-[#059669] hover:bg-[#ecfdf5]">{profileConfig.badgeText}</Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {profileConfig.summary.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-semibold text-[#0d3b66]">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClassName}>
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <ShieldCheck size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Security & Session</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-slate-500">Last Login</span>
                  <span className="font-semibold text-[#0d3b66]">October 25, 2023 - 10:45 AM</span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className={sectionClassName}>
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <User size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Personal Information</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {profileConfig.personalInfo.map((field) => (
                  <div key={field.label} className={field.fullWidth ? "md:col-span-2" : undefined}>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                    <input
                      value={personalValues[field.key] ?? ""}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      onChange={(event) => handlePersonalChange(field, event.target.value)}
                      onBlur={(event) => {
                        if (
                          enableCustomerValidation &&
                          (field.key === "fullName" || field.key === "email" || field.key === "phone")
                        ) {
                          updateFieldError(field.key, validatePublicScalarField(field.key, event.target.value));
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors[field.key])}
                      className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
                        field.readOnly ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-700"
                      } ${fieldErrors[field.key] ? "border-red-500" : "border-slate-200"}`}
                    />
                    {fieldErrors[field.key] ? (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors[field.key]}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClassName}>
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <Lock size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Security Settings</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {profileConfig.security.map((field) => (
                  <div key={field.label} className={field.fullWidth ? "md:col-span-2" : undefined}>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                    <div className="relative">
                      <input
                        value={securityValues[field.key] ?? ""}
                        type={
                          enableCustomerValidation && field.type === "password"
                            ? showPassword[field.key]
                              ? "text"
                              : "password"
                            : (field.type ?? "text")
                        }
                        placeholder={field.placeholder}
                        readOnly={field.readOnly}
                        onChange={(event) => handleSecurityChange(field, event.target.value)}
                        onBlur={(event) => {
                          if (!enableCustomerValidation) return;
                          if (field.key === "newUsername") {
                            updateFieldError(
                              field.key,
                              validateNewUsername(securityValues.currentUsername ?? "", event.target.value)
                            );
                          }
                        }}
                        aria-invalid={Boolean(fieldErrors[field.key])}
                        className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
                          field.readOnly ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-700"
                        } ${fieldErrors[field.key] ? "border-red-500" : "border-slate-200"} ${
                          enableCustomerValidation && field.type === "password" && !field.readOnly ? "pr-10" : ""
                        }`}
                      />
                      {enableCustomerValidation && field.type === "password" && !field.readOnly ? (
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(field.key)}
                          className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-slate-500 hover:text-slate-700"
                          aria-label={showPassword[field.key] ? "Hide password" : "Show password"}
                        >
                          {showPassword[field.key] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      ) : null}
                    </div>
                    {fieldErrors[field.key] ? (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors[field.key]}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                <ShieldCheck size={14} className="mt-0.5" />
                <p>Password must be at least 10 characters and include uppercase, lowercase, and numbers.</p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0a2e50]"
                >
                  Save Changes
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


