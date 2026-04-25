"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import {
  buildInitialFieldValues,
  buildStaffProfileView,
  extractProfileFieldErrors,
  mapProfileApiMessageToFieldErrors,
  validateNewUsername,
  validatePasswordGroup,
  validateProfileScalarField,
  type ProfileFieldErrors,
  type ProfileFieldItem,
} from "@/src/components/profile/profile-form-helpers";
import { ProfileImageUploadDialog } from "@/src/components/profile/profile-image-upload-dialog";
import { useLocalProfileImage } from "@/src/components/profile/use-local-profile-image";
import {
  getMyUserProfile,
  removeMyUserProfileImage,
  updateMyUserProfile,
  uploadMyUserProfileImage,
} from "@/src/api/profile/user-profile.service";
import { syncCurrentAuthIdentity } from "@/src/api/auth/session.service";
import { Badge, useToast } from "@/src/components/ui";
import ModuleHeader from "@/src/components/ui/module-header";
import { useAuthStore } from "@/src/store";
import { ApiError } from "@/src/types/api-error";
import type { UserProfileResponse } from "@/src/types/dto/user-profile.dto";
import { Camera, Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import type { UserRole } from "@/config/site";

type StaffRoleLabel = "Bank Officer" | "Admin";

type StaffProfilePageProps = {
  role: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
  roleLabel: StaffRoleLabel;
};

export function StaffProfilePage({ role, roleLabel }: StaffProfilePageProps) {
  const { showToast } = useToast();
  const setAuthProfile = useAuthStore((state) => state.setProfile);
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loadRequestId, setLoadRequestId] = useState(0);
  const [personalValues, setPersonalValues] = useState<Record<string, string>>({});
  const [securityValues, setSecurityValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState(false);

  const profileView = profile ? buildStaffProfileView(profile) : null;
  const displayName = profileView?.displayName ?? "Loading profile";
  const resolvedRoleLabel = profile?.roleDisplayName ?? roleLabel;
  const { profileImageSrc } = useLocalProfileImage(profile);
  const avatarSrc = profileImageSrc ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

  useEffect(() => {
    if (!profile) {
      return;
    }

    const nextView = buildStaffProfileView(profile);
    setPersonalValues(buildInitialFieldValues(nextView.personalInfo));
    setSecurityValues(buildInitialFieldValues(nextView.security));
    setFieldErrors({});
    setShowPassword({});
  }, [profile]);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const data = await getMyUserProfile();
        setProfile(data);
        setAuthProfile(data);
      } catch (unknownError) {
        const message = unknownError instanceof ApiError ? unknownError.message : "Failed to load profile.";
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [loadRequestId, setAuthProfile]);

  const updateFieldError = (fieldKey: string, errorMessage?: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (errorMessage) next[fieldKey] = errorMessage;
      else delete next[fieldKey];
      return next;
    });
  };

  const applyPasswordErrors = (nextSecurityValues: Record<string, string>) => {
    const passwordErrors = validatePasswordGroup(nextSecurityValues);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.currentPassword;
      delete next.newPassword;
      delete next.confirmPassword;
      return { ...next, ...passwordErrors };
    });
  };

  const handlePersonalChange = (field: ProfileFieldItem, value: string) => {
    if (field.readOnly) return;

    setPersonalValues((prev) => ({ ...prev, [field.key]: value }));

    if (field.key === "fullName" || field.key === "email" || field.key === "phone") {
      updateFieldError(field.key, validateProfileScalarField(field.key, value));
    }
  };

  const handleSecurityChange = (field: ProfileFieldItem, value: string) => {
    if (field.readOnly) return;

    const nextSecurityValues = { ...securityValues, [field.key]: value };
    setSecurityValues(nextSecurityValues);

    if (field.key === "newUsername") {
      updateFieldError(field.key, validateNewUsername(nextSecurityValues.currentUsername ?? "", value));
    }

    if (field.key === "currentPassword" || field.key === "newPassword" || field.key === "confirmPassword") {
      applyPasswordErrors(nextSecurityValues);
    }
  };

  const handleCancel = () => {
    if (!profile) {
      return;
    }

    const nextView = buildStaffProfileView(profile);
    setPersonalValues(buildInitialFieldValues(nextView.personalInfo));
    setSecurityValues(buildInitialFieldValues(nextView.security));
    setFieldErrors({});
    setShowPassword({});
  };

  const handleSave = async () => {
    if (!profile) {
      return;
    }

    const nextErrors: ProfileFieldErrors = {};

    const fullNameError = validateProfileScalarField("fullName", personalValues.fullName ?? "");
    if (fullNameError) nextErrors.fullName = fullNameError;

    const emailError = validateProfileScalarField("email", personalValues.email ?? "");
    if (emailError) nextErrors.email = emailError;

    const phoneError = validateProfileScalarField("phone", personalValues.phone ?? "");
    if (phoneError) nextErrors.phone = phoneError;

    const usernameError = validateNewUsername(
      securityValues.currentUsername ?? "",
      securityValues.newUsername ?? "",
    );
    if (usernameError) nextErrors.newUsername = usernameError;

    Object.assign(nextErrors, validatePasswordGroup(securityValues));
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await updateMyUserProfile({
        fullName: personalValues.fullName?.trim() ?? "",
        email: personalValues.email?.trim() ?? "",
        phone: personalValues.phone?.trim() ?? "",
        address: null,
        newUsername: securityValues.newUsername?.trim() || null,
        currentPassword: securityValues.currentPassword?.trim() || null,
        newPassword: securityValues.newPassword?.trim() || null,
        confirmPassword: securityValues.confirmPassword?.trim() || null,
      });

      setProfile(response.profile);
      setAuthProfile(response.profile);
      await syncCurrentAuthIdentity().catch(() => undefined);
      showToast({
        type: "success",
        title: "Profile updated",
        description: response.message,
      });
    } catch (unknownError) {
      const apiError = unknownError instanceof ApiError ? unknownError : null;
      const message = apiError?.message ?? "Failed to update profile.";
      const serverFieldErrors = apiError
        ? {
            ...extractProfileFieldErrors(apiError),
            ...mapProfileApiMessageToFieldErrors(message),
          }
        : {};

      if (Object.keys(serverFieldErrors).length > 0) {
        setFieldErrors((prev) => ({ ...prev, ...serverFieldErrors }));
      }

      showToast({
        type: "error",
        title: "Profile update failed",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const togglePasswordVisibility = (fieldKey: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldKey]: !prev[fieldKey] }));
  };

  const handleProfileImageUpload = async (file: File) => {
    const response = await uploadMyUserProfileImage(file);
    setProfile(response.profile);
    setAuthProfile(response.profile);
    showToast({
      type: "success",
      title: "Profile photo updated",
      description: response.message,
    });
  };

  const handleProfileImageRemove = async () => {
    const response = await removeMyUserProfileImage();
    setProfile(response.profile);
    setAuthProfile(response.profile);
    showToast({
      type: "success",
      title: "Profile photo removed",
      description: response.message,
    });
  };

  const renderContent = () => {
    if (!profileView) {
      return (
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-center">
            {isLoading ? (
              <>
                <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#0d3b66] border-r-transparent" />
                <p className="text-sm font-medium text-[#0d3b66]">Loading profile...</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-red-600">{loadError || "Unable to load profile."}</p>
                <button
                  type="button"
                  onClick={() => setLoadRequestId((current) => current + 1)}
                  className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </section>
      );
    }

    return (
      <>
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileImageDialogOpen(true)}
                  className="group relative h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-[#e2edf6] text-3xl font-bold text-[#0d3b66] shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d3b66] focus-visible:ring-offset-2"
                  aria-label="Open profile photo upload"
                >
                  {profileImageSrc ? (
                    <Image
                      src={profileImageSrc}
                      alt={`${profileView.displayName} profile photo`}
                      fill
                      sizes="80px"
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center">{profileView.initials}</span>
                  )}
                </button>
                <span className="pointer-events-none absolute -right-1 -top-1 z-10 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
                  <Camera size={14} />
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#0d3b66]">{profileView.displayName}</h2>
                <Badge className="mt-2 rounded-full bg-[#ecfdf5] text-[#059669] hover:bg-[#ecfdf5]">
                  {profileView.badgeText}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {profileView.summary.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="max-w-[60%] text-right font-semibold text-[#0d3b66]">{item.value}</span>
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
                  {profileView.personalInfo.map((field) => (
                    <div key={field.key} className={field.fullWidth ? "md:col-span-2" : undefined}>
                      <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                      <input
                        value={personalValues[field.key] ?? ""}
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        readOnly={field.readOnly}
                        disabled={isSaving && !field.readOnly}
                        onChange={(event) => handlePersonalChange(field, event.target.value)}
                        onBlur={(event) => {
                          if (field.key === "fullName" || field.key === "email" || field.key === "phone") {
                            updateFieldError(field.key, validateProfileScalarField(field.key, event.target.value));
                          }
                        }}
                        aria-invalid={Boolean(fieldErrors[field.key])}
                        className={`h-11 w-full rounded-lg border px-3 text-sm outline-none disabled:cursor-not-allowed ${
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
                  {profileView.security.map((field) => (
                    <div key={field.key} className={field.fullWidth ? "md:col-span-2" : undefined}>
                      <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                      <div className="relative">
                        <input
                          value={securityValues[field.key] ?? ""}
                          type={
                            field.type === "password"
                              ? (showPassword[field.key] ? "text" : "password")
                              : (field.type ?? "text")
                          }
                          placeholder={field.placeholder}
                          readOnly={field.readOnly}
                          disabled={isSaving && !field.readOnly}
                          onChange={(event) => handleSecurityChange(field, event.target.value)}
                          onBlur={(event) => {
                            if (field.key === "newUsername") {
                              updateFieldError(
                                field.key,
                                validateNewUsername(securityValues.currentUsername ?? "", event.target.value),
                              );
                            }
                          }}
                          aria-invalid={Boolean(fieldErrors[field.key])}
                          className={`h-11 w-full rounded-lg border px-3 text-sm outline-none disabled:cursor-not-allowed ${
                            field.readOnly ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-700"
                          } ${fieldErrors[field.key] ? "border-red-500" : "border-slate-200"} ${
                            field.type === "password" && !field.readOnly ? "pr-10" : ""
                          }`}
                        />
                        {field.type === "password" && !field.readOnly ? (
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
                disabled={isSaving}
                className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0a2e50] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </section>
        </div>
      </>
    );
  };

  return (
    <AuthGuard requiredRole={role}>
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role={role} className="relative z-10 h-full max-lg:hidden" />

        <main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7">
          <ProfileImageUploadDialog
            open={isProfileImageDialogOpen}
            onOpenChange={setIsProfileImageDialogOpen}
            currentImageSrc={profileImageSrc}
            initials={profileView?.initials ?? "NA"}
            displayName={displayName}
            onUpload={handleProfileImageUpload}
            onRemove={handleProfileImageRemove}
          />
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole={role}
            sidebarHideCollapse
            mailBadge={2}
            notificationBadge={8}
            avatarSrc={avatarSrc}
            avatarStatusDot
            name={displayName}
            role={resolvedRoleLabel}
            title="Profile"
            className="mb-6 shrink-0"
          />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="grid gap-6 xl:grid-cols-[1fr_1.8fr]">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
