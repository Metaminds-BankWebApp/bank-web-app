"use client";

import { useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { Badge } from "@/src/components/ui";
import ModuleHeader from "@/src/components/ui/module-header";
import { Camera, Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import type { UserRole } from "@/config/site";

type StaffRoleLabel = "Bank Officer" | "Admin";

type StaffProfilePageProps = {
  role: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
  roleLabel: StaffRoleLabel;
};

type SummaryItem = {
  label: string;
  value: string;
};

type FieldItem = {
  key: string;
  label: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
  type?: "text" | "email" | "tel" | "password";
};

type StaffProfileConfig = {
  displayName: string;
  initials: string;
  badgeText: string;
  summary: SummaryItem[];
  personalInfo: FieldItem[];
  security: FieldItem[];
};

const STAFF_PROFILE_CONFIG: Record<StaffRoleLabel, StaffProfileConfig> = {
  "Bank Officer": {
    displayName: "John Doe",
    initials: "JD",
    badgeText: "BANK OFFICER",
    summary: [
      { label: "Employee ID", value: "#EMP-8821" },
      { label: "Branch Location", value: "Colombo Central" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { key: "fullName", label: "Full Name", value: "John Doe" },
      { key: "email", label: "Email Address", value: "john.doe@primecore.bank", type: "email" },
      { key: "phone", label: "Phone Number", value: "+94 77 123 4567", type: "tel" },
      { key: "branch", label: "Branch (Read-Only)", value: "Colombo Central Branch", readOnly: true },
      { key: "nic", label: "NIC", value: "972346682V", readOnly: true },
    ],
    security: [
      { key: "currentUsername", label: "Current Username", value: "JohnDoeBO1", readOnly: true, fullWidth: true },
      { key: "newUsername", label: "New Username", placeholder: "Enter new username", fullWidth: true },
      { key: "currentPassword", label: "Current Password", placeholder: "Enter current password", fullWidth: true, type: "password" },
      { key: "newPassword", label: "New Password", placeholder: "Enter new password", type: "password" },
      { key: "confirmPassword", label: "Confirm Password", placeholder: "Repeat new password", type: "password" },
    ],
  },
  Admin: {
    displayName: "John Doe",
    initials: "JD",
    badgeText: "ADMIN",
    summary: [
      { label: "Employee ID", value: "#EMP-8821" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { key: "fullName", label: "Full Name", value: "John Doe" },
      { key: "email", label: "Email Address", value: "john.doe@primecore.bank", type: "email" },
      { key: "phone", label: "Phone Number", value: "+94 77 123 4567", type: "tel" },
    ],
    security: [
      { key: "currentUsername", label: "Current Username", value: "JohnDoeAD1", readOnly: true, fullWidth: true },
      { key: "newUsername", label: "New Username", placeholder: "Enter new username", fullWidth: true },
      { key: "currentPassword", label: "Current Password", placeholder: "Enter current password", fullWidth: true, type: "password" },
      { key: "newPassword", label: "New Password", placeholder: "Enter new password", type: "password" },
      { key: "confirmPassword", label: "Confirm Password", placeholder: "Repeat new password", type: "password" },
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

function validateStaffScalarField(key: string, rawValue: string): string | undefined {
  const value = rawValue.trim();

  if (key === "fullName") {
    if (!value) return "Full name is required.";
    if (!FULL_NAME_REGEX.test(value)) return "Full name can contain letters and spaces only.";
  }

  if (key === "email") {
    if (!value) return "Email address is required.";
    if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
  }

  if (key === "phone") {
    const digitsOnly = value.replace(/\D/g, "");
    if (!value) return "Phone number is required.";
    if (!PHONE_ALLOWED_REGEX.test(value)) return "Use only digits, spaces, +, -, or parentheses.";
    if (digitsOnly.length < 10 || digitsOnly.length > 15) return "Phone number must be 10 to 15 digits.";
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
  if (!hasPasswordIntent) return {};

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

export function StaffProfilePage({ role, roleLabel }: StaffProfilePageProps) {
  const config = STAFF_PROFILE_CONFIG[roleLabel];
  const enableStaffValidation = roleLabel === "Bank Officer" || roleLabel === "Admin";
  const [personalValues, setPersonalValues] = useState<Record<string, string>>(() =>
    buildInitialFieldValues(config.personalInfo)
  );
  const [securityValues, setSecurityValues] = useState<Record<string, string>>(() =>
    buildInitialFieldValues(config.security)
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const updateFieldError = (fieldKey: string, errorMessage?: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (errorMessage) next[fieldKey] = errorMessage;
      else delete next[fieldKey];
      return next;
    });
  };

  const applyPasswordErrors = (nextSecurityValues: Record<string, string>) => {
    if (!enableStaffValidation) return;

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

    if (field.key === "fullName") {
      updateFieldError(field.key, validateStaffScalarField(field.key, value));
      return;
    }

    if (!enableStaffValidation) return;

    if (field.key === "email" || field.key === "phone") {
      updateFieldError(field.key, validateStaffScalarField(field.key, value));
    }
  };

  const handleSecurityChange = (field: FieldItem, value: string) => {
    if (field.readOnly) return;

    const nextSecurityValues = { ...securityValues, [field.key]: value };
    setSecurityValues(nextSecurityValues);
    if (!enableStaffValidation) return;

    if (field.key === "newUsername") {
      updateFieldError(field.key, validateNewUsername(nextSecurityValues.currentUsername ?? "", value));
    }

    if (field.key === "currentPassword" || field.key === "newPassword" || field.key === "confirmPassword") {
      applyPasswordErrors(nextSecurityValues);
    }
  };

  const handleCancel = () => {
    setPersonalValues(buildInitialFieldValues(config.personalInfo));
    setSecurityValues(buildInitialFieldValues(config.security));
    setFieldErrors({});
    setShowPassword({});
  };

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};

    const fullNameError = validateStaffScalarField("fullName", personalValues.fullName ?? "");
    if (fullNameError) nextErrors.fullName = fullNameError;

    if (!enableStaffValidation) {
      setFieldErrors(nextErrors);
      return;
    }

    const emailError = validateStaffScalarField("email", personalValues.email ?? "");
    if (emailError) nextErrors.email = emailError;
    const phoneError = validateStaffScalarField("phone", personalValues.phone ?? "");
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

  return (
    <AuthGuard requiredRole={role}>
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role={role} className="relative z-10 h-full max-lg:hidden" />

        <main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7">
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole={role}
            sidebarHideCollapse
            mailBadge={2}
            notificationBadge={8}
            avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
            avatarStatusDot
            name="Kamal Edirisinghe"
            role={roleLabel}
            title="Profile"
            className="mb-6 shrink-0"
          />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="grid gap-6 xl:grid-cols-[1fr_1.8fr]">
              <div className="space-y-6">
                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#e2edf6] text-3xl font-bold text-[#0d3b66]">
                      {config.initials}
                      <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
                        <Camera size={14} />
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#0d3b66]">{config.displayName}</h2>
                      <Badge className="mt-2 rounded-full bg-[#ecfdf5] text-[#059669] hover:bg-[#ecfdf5]">
                        {config.badgeText}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    {config.summary.map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-semibold text-[#0d3b66]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="space-y-5">
                    <section className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5">
                      <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                        <User size={16} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Personal Information</h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {config.personalInfo.map((field) => (
                          <div key={field.key} className={field.fullWidth ? "md:col-span-2" : undefined}>
                            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                            <input
                              value={personalValues[field.key] ?? ""}
                              type={field.type ?? "text"}
                              placeholder={field.placeholder}
                              readOnly={field.readOnly}
                              onChange={(event) => handlePersonalChange(field, event.target.value)}
                              onBlur={(event) => {
                                if (field.key === "fullName") {
                                  updateFieldError(field.key, validateStaffScalarField(field.key, event.target.value));
                                  return;
                                }
                                if (enableStaffValidation && (field.key === "email" || field.key === "phone")) {
                                  updateFieldError(field.key, validateStaffScalarField(field.key, event.target.value));
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

                    <section className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5">
                      <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                        <Lock size={16} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Security Settings</h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {config.security.map((field) => (
                          <div key={field.key} className={field.fullWidth ? "md:col-span-2" : undefined}>
                            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                            <div className="relative">
                              <input
                                value={securityValues[field.key] ?? ""}
                                type={
                                  enableStaffValidation && field.type === "password"
                                    ? showPassword[field.key]
                                      ? "text"
                                      : "password"
                                    : (field.type ?? "text")
                                }
                                placeholder={field.placeholder}
                                readOnly={field.readOnly}
                                onChange={(event) => handleSecurityChange(field, event.target.value)}
                                onBlur={(event) => {
                                  if (!enableStaffValidation) return;
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
                                  enableStaffValidation && field.type === "password" && !field.readOnly ? "pr-10" : ""
                                }`}
                              />
                              {enableStaffValidation && field.type === "password" && !field.readOnly ? (
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
                    </section>
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
        </main>
      </div>
    </AuthGuard>
  );
}
