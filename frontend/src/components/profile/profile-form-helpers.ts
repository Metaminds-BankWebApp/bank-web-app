import type { ApiError } from "@/src/types/api-error";
import type { UserProfileResponse } from "@/src/types/dto/user-profile.dto";

export type SummaryItem = {
  label: string;
  value: string;
};

export type ProfileFieldItem = {
  key: string;
  label: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
  type?: "text" | "email" | "tel" | "password";
};

export type ProfileFieldErrors = Record<string, string>;

export type ProfileViewConfig = {
  displayName: string;
  initials: string;
  badgeText: string;
  summary: SummaryItem[];
  personalInfo: ProfileFieldItem[];
  security: ProfileFieldItem[];
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_ALLOWED_REGEX = /^\+?[0-9()\s-]+$/;
const FULL_NAME_REGEX = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

export function buildInitialFieldValues(fields: ProfileFieldItem[]): Record<string, string> {
  return fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = field.value ?? "";
    return acc;
  }, {});
}

export function fallbackProfileValue(value?: string | null, fallback = "-"): string {
  const normalized = value?.trim() ?? "";
  return normalized || fallback;
}

export function formatProfileDate(value?: string | null): string {
  const normalized = value?.trim() ?? "";
  if (!normalized) {
    return "-";
  }

  const parsed = new Date(`${normalized}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return normalized;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function validateProfileScalarField(
  key: string,
  rawValue: string,
  options?: { requireAddress?: boolean },
): string | undefined {
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

  if (key === "address" && options?.requireAddress) {
    if (!value) return "Address is required for public customer profiles.";
  }

  return undefined;
}

export function validateNewUsername(currentUsername: string, newUsername: string): string | undefined {
  const current = currentUsername.trim();
  const next = newUsername.trim();

  if (!next) return undefined;
  if (next.length < 4) return "New username must be at least 4 characters long.";
  if (next.toLowerCase() === current.toLowerCase()) {
    return "New username must be different from current username.";
  }

  return undefined;
}

export function validatePasswordGroup(values: Record<string, string>): ProfileFieldErrors {
  const currentPassword = values.currentPassword?.trim() ?? "";
  const newPassword = values.newPassword?.trim() ?? "";
  const confirmPassword = values.confirmPassword?.trim() ?? "";

  const hasPasswordIntent = Boolean(currentPassword || newPassword || confirmPassword);
  if (!hasPasswordIntent) {
    return {};
  }

  const errors: ProfileFieldErrors = {};

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

export function extractProfileFieldErrors(error: ApiError): ProfileFieldErrors {
  const details = error.details as { fieldErrors?: unknown } | undefined;
  const rawFieldErrors = details?.fieldErrors;
  if (!rawFieldErrors || typeof rawFieldErrors !== "object") {
    return {};
  }

  const source = rawFieldErrors as Record<string, unknown>;
  const result: ProfileFieldErrors = {};

  for (const [key, value] of Object.entries(source)) {
    if (typeof value !== "string" || !value.trim()) {
      continue;
    }

    if (key === "username") {
      result.newUsername = value;
      continue;
    }

    result[key] = value;
  }

  return result;
}

export function mapProfileApiMessageToFieldErrors(message: string): ProfileFieldErrors {
  const normalized = message.trim().toLowerCase();
  if (!normalized) {
    return {};
  }

  if (normalized.includes("full name")) return { fullName: message };
  if (normalized.includes("email")) return { email: message };
  if (normalized.includes("phone")) return { phone: message };
  if (normalized.includes("address")) return { address: message };
  if (normalized.includes("username")) return { newUsername: message };
  if (normalized.includes("current password")) return { currentPassword: message };
  if (normalized.includes("new password")) return { newPassword: message };
  if (normalized.includes("confirm password")) return { confirmPassword: message };

  return {};
}

function buildSummaryItems(profile: UserProfileResponse): SummaryItem[] {
  return profile.summaryItems.map((item) => ({
    label: item.label,
    value: item.label.toLowerCase().includes("date")
      ? formatProfileDate(item.value)
      : fallbackProfileValue(item.value),
  }));
}

function buildSecurityFields(username: string): ProfileFieldItem[] {
  return [
    {
      key: "currentUsername",
      label: "Current Username",
      value: username,
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
    },
    {
      key: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
      type: "password",
    },
    {
      key: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Repeat new password",
      type: "password",
    },
  ];
}

function buildDisplayName(profile: UserProfileResponse): string {
  return fallbackProfileValue(profile.fullName, profile.roleDisplayName || "User");
}

function buildInitials(profile: UserProfileResponse): string {
  return fallbackProfileValue(profile.initials, "NA");
}

function buildBadgeText(profile: UserProfileResponse): string {
  return fallbackProfileValue(
    profile.badgeText,
    profile.roleDisplayName ? profile.roleDisplayName.toUpperCase() : "USER",
  );
}

export function buildCustomerProfileView(profile: UserProfileResponse): ProfileViewConfig {
  const common = {
    displayName: buildDisplayName(profile),
    initials: buildInitials(profile),
    badgeText: buildBadgeText(profile),
    summary: buildSummaryItems(profile),
    security: buildSecurityFields(fallbackProfileValue(profile.username, "-")),
  };

  if (profile.roleName === "BANK_CUSTOMER") {
    return {
      ...common,
      personalInfo: [
        { key: "fullName", label: "Full Name", value: fallbackProfileValue(profile.fullName, "") },
        {
          key: "email",
          label: "Email Address",
          value: fallbackProfileValue(profile.email, ""),
          type: "email",
        },
        {
          key: "phone",
          label: "Phone Number",
          value: fallbackProfileValue(profile.phone, ""),
          type: "tel",
        },
        {
          key: "accountNumber",
          label: "Account Number",
          value: fallbackProfileValue(profile.accountNumber),
          readOnly: true,
        },
        {
          key: "branch",
          label: "Branch (Read-Only)",
          value: fallbackProfileValue(profile.branchName),
          readOnly: true,
        },
        { key: "nic", label: "NIC", value: fallbackProfileValue(profile.nic), readOnly: true },
        { key: "dob", label: "DOB", value: formatProfileDate(profile.dob), readOnly: true },
      ],
    };
  }

  return {
    ...common,
    personalInfo: [
      { key: "fullName", label: "Full Name", value: fallbackProfileValue(profile.fullName, "") },
      {
        key: "email",
        label: "Email Address",
        value: fallbackProfileValue(profile.email, ""),
        type: "email",
      },
      {
        key: "phone",
        label: "Phone Number",
        value: fallbackProfileValue(profile.phone, ""),
        type: "tel",
      },
      { key: "address", label: "Address", value: fallbackProfileValue(profile.address, "") },
      { key: "nic", label: "NIC", value: fallbackProfileValue(profile.nic), readOnly: true },
      { key: "dob", label: "DOB", value: formatProfileDate(profile.dob), readOnly: true },
    ],
  };
}

export function buildStaffProfileView(profile: UserProfileResponse): ProfileViewConfig {
  const common = {
    displayName: buildDisplayName(profile),
    initials: buildInitials(profile),
    badgeText: buildBadgeText(profile),
    summary: buildSummaryItems(profile),
    security: buildSecurityFields(fallbackProfileValue(profile.username, "-")),
  };

  if (profile.roleName === "ADMIN") {
    return {
      ...common,
      personalInfo: [
        { key: "fullName", label: "Full Name", value: fallbackProfileValue(profile.fullName, "") },
        {
          key: "email",
          label: "Email Address",
          value: fallbackProfileValue(profile.email, ""),
          type: "email",
        },
        {
          key: "phone",
          label: "Phone Number",
          value: fallbackProfileValue(profile.phone, ""),
          type: "tel",
        },
      ],
    };
  }

  return {
    ...common,
    personalInfo: [
      { key: "fullName", label: "Full Name", value: fallbackProfileValue(profile.fullName, "") },
      {
        key: "email",
        label: "Email Address",
        value: fallbackProfileValue(profile.email, ""),
        type: "email",
      },
      {
        key: "phone",
        label: "Phone Number",
        value: fallbackProfileValue(profile.phone, ""),
        type: "tel",
      },
      {
        key: "branch",
        label: "Branch (Read-Only)",
        value: fallbackProfileValue(profile.branchName),
        readOnly: true,
      },
      { key: "nic", label: "NIC", value: fallbackProfileValue(profile.nic), readOnly: true },
    ],
  };
}
