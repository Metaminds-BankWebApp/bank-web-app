"use client";
/**
 * Admin add-officer page for sending a secure officer activation invitation.
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui";
import { getAdminBranches } from "@/src/api/admin/branch.service";
import {
  generateAdminBankOfficerUsername,
} from "@/src/api/admin/bank-officer.service";
import { registerBankOfficer } from "@/src/api/registration/bank-officer-registration.service";
import { useAuthStore } from "@/src/store";
import { ApiError } from "@/src/types/api-error";
import type { BranchResponse } from "@/src/types/dto/branch.dto";
import type { OfficerFormData, OfficerFormErrors } from "./types";
import {
  isOfficerFormComplete,
  SRI_LANKA_PROVINCES,
  validateOfficerForm,
} from "./validation";

type DobPart = "year" | "month" | "day";

const currentYear = new Date().getFullYear();
const latestOfficerBirthYear = currentYear - 18;
const officerBirthYears = Array.from(
  { length: latestOfficerBirthYear - (currentYear - 100) + 1 },
  (_, index) => String(latestOfficerBirthYear - index)
);
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function getDaysInMonth(year: string, month: string): number {
  if (!year || !month) {
    return 31;
  }
  return new Date(Number(year), Number(month), 0).getDate();
}

const getInitialFormData = (): OfficerFormData => ({
  firstName: "",
  lastName: "",
  nic: "",
  dob: "",
  province: "",
  username: "",
  contact: "",
  email: "",
  assignedBranch: "",
  address: "",
  isActive: true,
});

const BACKEND_FIELD_TO_FORM_FIELD: Record<string, keyof OfficerFormErrors> = {
  firstName: "firstName",
  lastName: "lastName",
  nic: "nic",
  dob: "dob",
  province: "province",
  mobile: "contact",
  contact: "contact",
  email: "email",
  branchId: "assignedBranch",
  assignedBranch: "assignedBranch",
  username: "username",
};

function extractOfficerFieldErrors(apiError: ApiError): OfficerFormErrors {
  const details = apiError.details as { fieldErrors?: unknown } | undefined;
  const rawFieldErrors = details?.fieldErrors;

  if (!rawFieldErrors || typeof rawFieldErrors !== "object") {
    return {};
  }

  const source = rawFieldErrors as Record<string, unknown>;
  const result: OfficerFormErrors = {};

  for (const [backendField, value] of Object.entries(source)) {
    if (typeof value !== "string" || !value.trim()) {
      continue;
    }

    const mappedField = BACKEND_FIELD_TO_FORM_FIELD[backendField];
    if (mappedField) {
      result[mappedField] = value;
    }
  }

  return result;
}

function mapApiMessageToOfficerField(message: string): OfficerFormErrors {
  const normalized = message.trim().toLowerCase();
  if (!normalized) {
    return {};
  }

  if (normalized.includes("first name")) return { firstName: message };
  if (normalized.includes("last name")) return { lastName: message };
  if (normalized.includes("nic")) return { nic: message };
  if (normalized.includes("date of birth") || normalized.includes("dob")) return { dob: message };
  if (normalized.includes("contact number") || normalized.includes("mobile")) return { contact: message };
  if (normalized.includes("email")) return { email: message };
  if (normalized.includes("province")) return { province: message };
  if (normalized.includes("branch")) return { assignedBranch: message };
  if (normalized.includes("username")) return { username: message };
  return {};
}

// Form page for registering a new bank officer.
export default function AddOfficerPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const loggedInUser = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState<OfficerFormData>(getInitialFormData);
  const [dobParts, setDobParts] = useState({ year: "", month: "", day: "" });
  const [errors, setErrors] = useState<OfficerFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);
  const [branchLoadError, setBranchLoadError] = useState<string | null>(null);
  const [isGeneratingUsername, setIsGeneratingUsername] = useState(false);
  const canSubmit = isOfficerFormComplete(formData) && !isSaving;

  useEffect(() => {
    let mounted = true;

    // Loads data required by this view and updates local state.
    const loadBranches = async () => {
      setIsLoadingBranches(true);
      setBranchLoadError(null);

      try {
        const data = await getAdminBranches();
        if (!mounted) {
          return;
        }

        setBranches(
          data.filter((branch) => {
            const status = branch.status?.trim().toUpperCase();
            return status === "ACTIVE" || status === "MAINTENANCE";
          })
        );
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof ApiError ? error.message : "Failed to load branches.";
        setBranches([]);
        setBranchLoadError(message);
      } finally {
        if (mounted) {
          setIsLoadingBranches(false);
        }
      }
    };

    void loadBranches();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRequiredFieldChange = (
    field: keyof Pick<
      OfficerFormData,
      "firstName" | "lastName" | "nic" | "dob" | "province" | "contact" | "email" | "assignedBranch"
    >,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDobPartChange = (part: DobPart, value: string) => {
    const nextParts = { ...dobParts, [part]: value };
    const maximumDay = getDaysInMonth(nextParts.year, nextParts.month);

    if (nextParts.day && Number(nextParts.day) > maximumDay) {
      nextParts.day = "";
    }

    setDobParts(nextParts);
    handleRequiredFieldChange(
      "dob",
      nextParts.year && nextParts.month && nextParts.day
        ? `${nextParts.year}-${nextParts.month}-${nextParts.day}`
        : ""
    );
  };

  const availableDobDays = getDaysInMonth(dobParts.year, dobParts.month);

  const handleGenerateUsername = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrors((prev) => ({
        ...prev,
        firstName: !formData.firstName.trim()
          ? "First name is required before generating username."
          : prev.firstName,
        lastName: !formData.lastName.trim()
          ? "Last name is required before generating username."
          : prev.lastName,
      }));
      return;
    }

    setIsGeneratingUsername(true);
    try {
      const response = await generateAdminBankOfficerUsername(
        formData.firstName.trim(),
        formData.lastName.trim()
      );
      setFormData((prev) => ({ ...prev, username: response.username }));
      setErrors((prev) => ({
        ...prev,
        firstName: undefined,
        lastName: undefined,
        username: undefined,
      }));
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to generate username.";
      setErrors((prev) => ({ ...prev, username: message }));
    } finally {
      setIsGeneratingUsername(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateOfficerForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const parsedBranchId = Number(formData.assignedBranch);
    if (Number.isNaN(parsedBranchId) || parsedBranchId <= 0) {
      setErrors((prev) => ({ ...prev, assignedBranch: "Please select a valid branch." }));
      return;
    }

    setIsSaving(true);

    const parsedAdminUserId = Number(loggedInUser?.id);

    try {
      await registerBankOfficer({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        nic: formData.nic.trim(),
        dob: formData.dob.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.contact.trim(),
        province: formData.province.trim(),
        address: formData.address.trim(),
        username: formData.username.trim(),
        branchId: parsedBranchId,
        createdByAdminUserId: Number.isNaN(parsedAdminUserId) ? undefined : parsedAdminUserId,
      });

      showToast({
        type: "success",
        title: "Officer created",
        description: "An activation invitation was sent. The officer will set their own password.",
      });
      router.push("/admin/bank-officer-management");
    } catch (error) {
      if (error instanceof ApiError) {
        const backendFieldErrors = extractOfficerFieldErrors(error);
        if (Object.keys(backendFieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...backendFieldErrors }));
          return;
        }

        const messageMappedErrors = mapApiMessageToOfficerField(error.message);
        if (Object.keys(messageMappedErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...messageMappedErrors }));
          return;
        }

        showToast({
          type: "error",
          title: "Create failed",
          description: error.message,
        });
        return;
      }

      const message =
        error instanceof Error ? error.message : "Failed to create bank officer.";
      showToast({
        type: "error",
        title: "Create failed",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7">
          <div className="shrink-0 mb-5">
            <ModuleHeader
              theme="staff"
              menuMode="sidebar-overlay"
              sidebarRole="ADMIN"
              sidebarHideCollapse
              mailBadge={2}
              notificationBadge={8}
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
              avatarStatusDot
              name="Kamal Edirisinghe"
              role="Admin"
              title="Bank Officer Management / Add Officer"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-6 sm:px-4 lg:px-8 lg:pb-12">
            <div className="mb-6 flex flex-wrap items-center text-sm">
              <button
                type="button"
                onClick={() => router.push("/admin/bank-officer-management")}
                className="text-gray-500 hover:text-[#0B3B66]"
              >
                Bank Officer Management
              </button>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-semibold text-gray-800">Add Officer</span>
            </div>

            <div className="mb-8">
              <h2 className="flex items-center gap-3 text-xl font-bold text-[#0B3B66]">
                <span className="rounded-lg bg-blue-100 p-2 text-[#0B3B66]">
                  <Building2 size={18} />
                </span>
                Bank Officer Information
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Configure the primary details for the new bank officer.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <div className="min-w-0 flex-1 space-y-6 rounded-2xl bg-[#e9eef5] p-4 sm:p-6 lg:p-8">
                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> First Name <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(event) => handleRequiredFieldChange("firstName", event.target.value)}
                      placeholder="Kamal"
                      aria-invalid={Boolean(errors.firstName)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.firstName ? <p className="mt-1 text-xs text-red-600">{errors.firstName}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> Last Name <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(event) => handleRequiredFieldChange("lastName", event.target.value)}
                      placeholder="Sooriyarachchi"
                      aria-invalid={Boolean(errors.lastName)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.lastName ? <p className="mt-1 text-xs text-red-600">{errors.lastName}</p> : null}
                  </div>

                  

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> User Name <span className="text-red-600">*</span></label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
                      <input
                        type="text"
                        value={formData.username}
                        readOnly
                        placeholder="Click Create to generate"
                        aria-invalid={Boolean(errors.username)}
                        className={`w-full min-w-0 rounded-t-lg border px-4 py-3 sm:rounded-l-lg sm:rounded-tr-none sm:border-r-0 ${
                          errors.username ? "border-red-500" : "border-gray-300"
                        } bg-white`}
                      />
                      <button
                        type="button"
                        onClick={handleGenerateUsername}
                        disabled={isGeneratingUsername}
                        className="w-full shrink-0 whitespace-nowrap rounded-b-lg border border-gray-300 border-t-0 bg-gray-300 px-5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:rounded-bl-none sm:rounded-r-lg sm:border-l-0 sm:border-t"
                      >
                        {isGeneratingUsername ? "Creating..." : "Create"}
                      </button>
                    </div>
                    {errors.username ? <p className="mt-1 text-xs text-red-600">{errors.username}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> NIC Number <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      value={formData.nic}
                      onChange={(event) => handleRequiredFieldChange("nic", event.target.value)}
                      placeholder="200012345678"
                      aria-invalid={Boolean(errors.nic)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.nic ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.nic ? <p className="mt-1 text-xs text-red-600">{errors.nic}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Officer Status</label>
                    <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3">
                      <span>{formData.isActive ? "Active" : "Inactive"}</span>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                        className={`h-6 w-12 rounded-full p-1 transition ${formData.isActive ? "bg-[#0B3B66]" : "bg-gray-400"}`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full bg-white shadow-md transition ${formData.isActive ? "translate-x-6" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-6 rounded-2xl bg-[#e9eef5] p-4 sm:p-6 lg:p-8">
                  

                  <div>
                    <label id="officer-dob-label" className="text-xs font-semibold uppercase text-gray-600">
                      Date of Birth <span className="text-red-600">*</span>
                    </label>
                    <div
                      className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.35fr_1fr]"
                      role="group"
                      aria-labelledby="officer-dob-label"
                    >
                      <select
                        value={dobParts.year}
                        onChange={(event) => handleDobPartChange("year", event.target.value)}
                        aria-label="Birth year"
                        aria-invalid={Boolean(errors.dob)}
                        autoComplete="bday-year"
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm ${
                          errors.dob ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Year</option>
                        {officerBirthYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>

                      <select
                        value={dobParts.month}
                        onChange={(event) => handleDobPartChange("month", event.target.value)}
                        aria-label="Birth month"
                        aria-invalid={Boolean(errors.dob)}
                        autoComplete="bday-month"
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm ${
                          errors.dob ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>

                      <select
                        value={dobParts.day}
                        onChange={(event) => handleDobPartChange("day", event.target.value)}
                        aria-label="Birth day"
                        aria-invalid={Boolean(errors.dob)}
                        autoComplete="bday-day"
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm ${
                          errors.dob ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Day</option>
                        {Array.from({ length: availableDobDays }, (_, index) => {
                          const day = String(index + 1).padStart(2, "0");
                          return <option key={day} value={day}>{day}</option>;
                        })}
                      </select>
                    </div>
                    
                    {errors.dob ? <p className="mt-1 text-xs text-red-600">{errors.dob}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> Province <span className="text-red-600">*</span></label>
                    <select
                      value={formData.province}
                      onChange={(event) => handleRequiredFieldChange("province", event.target.value)}
                      aria-invalid={Boolean(errors.province)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.province ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    >
                      <option value="">Select Province</option>
                      {SRI_LANKA_PROVINCES.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                    {errors.province ? <p className="mt-1 text-xs text-red-600">{errors.province}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> Contact Number <span className="text-red-600">*</span></label>
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(event) => handleRequiredFieldChange("contact", event.target.value)}
                      placeholder="0771234567"
                      aria-invalid={Boolean(errors.contact)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.contact ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.contact ? <p className="mt-1 text-xs text-red-600">{errors.contact}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> Email Address <span className="text-red-600">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => handleRequiredFieldChange("email", event.target.value)}
                      placeholder="kamal@gmail.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600"> Assign Branch <span className="text-red-600">*</span></label>
                    <select
                      value={formData.assignedBranch}
                      onChange={(event) => handleRequiredFieldChange("assignedBranch", event.target.value)}
                      aria-invalid={Boolean(errors.assignedBranch)}
                      disabled={isLoadingBranches}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.assignedBranch ? "border-red-500" : "border-gray-300"
                      } bg-white disabled:bg-gray-100 disabled:text-gray-500`}
                    >
                      <option value="">
                        {isLoadingBranches ? "Loading branches..." : "Select Branch"}
                      </option>
                      {branches.map((branch) => (
                        <option key={branch.branchId} value={String(branch.branchId)}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                    {errors.assignedBranch ? (
                      <p className="mt-1 text-xs text-red-600">{errors.assignedBranch}</p>
                    ) : null}
                    {!errors.assignedBranch && branchLoadError ? (
                      <p className="mt-1 text-xs text-red-600">{branchLoadError}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Full Address (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(event) => setFormData((prev) => ({ ...prev, address: event.target.value }))}
                      placeholder="Enter the street address and landmarks (optional)..."
                      className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
                    />
                  </div>

                  <div className="flex flex-col justify-end gap-4 pt-6 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/bank-officer-management")}
                      className="w-full rounded-lg bg-gray-200 px-6 py-3 hover:bg-gray-300 sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`w-full rounded-lg px-6 py-3 sm:w-auto ${
                        canSubmit
                          ? "bg-[#0B3B66] text-white hover:bg-[#082d4a]"
                          : "cursor-not-allowed bg-[#0B3B66]/50 text-white"
                      }`}
                    >
                      {isSaving ? "Sending invitation..." : "Create & send activation"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

