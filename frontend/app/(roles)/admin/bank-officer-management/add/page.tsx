"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import type { OfficerFormData, OfficerFormErrors } from "./types";
import { generateOfficerId, generateOfficerPassword, generateOfficerUsername } from "./utils";
import { isOfficerFormComplete, validateOfficerForm } from "./validation";

const BRANCH_OPTIONS = [
  "Kandy Branch",
  "Main Street Branch",
  "Downtown Branch",
  "Colombo Branch",
];

const getInitialFormData = (): OfficerFormData => ({
  officerName: "",
  officerId: generateOfficerId(),
  username: "",
  password: "",
  contact: "",
  email: "",
  assignedBranch: "",
  address: "",
  isActive: true,
});

export default function AddOfficerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<OfficerFormData>(getInitialFormData);
  const [errors, setErrors] = useState<OfficerFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const canSubmit = isOfficerFormComplete(formData) && !isSaving;

  const handleRequiredFieldChange = (
    field: keyof Pick<OfficerFormData, "officerName" | "contact" | "email" | "assignedBranch">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGenerateUsername = () => {
    if (!formData.officerName.trim()) {
      setErrors((prev) => ({ ...prev, officerName: "Officer name is required before generating username." }));
      return;
    }

    const username = generateOfficerUsername(formData.officerName, formData.officerId);
    setFormData((prev) => ({ ...prev, username }));
    setErrors((prev) => ({ ...prev, username: undefined }));
  };

  const handleGeneratePassword = () => {
    const password = generateOfficerPassword();
    setFormData((prev) => ({ ...prev, password }));
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateOfficerForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    console.log({
      ...formData,
      officerName: formData.officerName.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      assignedBranch: formData.assignedBranch.trim(),
      address: formData.address.trim(),
    });

    // Later connect to backend here
    router.push("/admin/bank-officer-management");
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
                    <label className="text-xs font-semibold uppercase text-gray-600">Officer Name</label>
                    <input
                      type="text"
                      value={formData.officerName}
                      onChange={(event) => handleRequiredFieldChange("officerName", event.target.value)}
                      placeholder="Kamal Sooriyarachchi"
                      aria-invalid={Boolean(errors.officerName)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.officerName ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.officerName ? <p className="mt-1 text-xs text-red-600">{errors.officerName}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Officer ID</label>
                    <input
                      type="text"
                      value={formData.officerId}
                      readOnly
                      className="mt-2 w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">User Name</label>
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
                        className="w-full shrink-0 whitespace-nowrap rounded-b-lg border border-gray-300 border-t-0 bg-gray-300 px-5 sm:w-auto sm:rounded-bl-none sm:rounded-r-lg sm:border-l-0 sm:border-t"
                      >
                        Create
                      </button>
                    </div>
                    {errors.username ? <p className="mt-1 text-xs text-red-600">{errors.username}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Password</label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
                      <input
                        type="text"
                        value={formData.password}
                        readOnly
                        placeholder="Click Create to generate"
                        aria-invalid={Boolean(errors.password)}
                        className={`w-full min-w-0 rounded-t-lg border px-4 py-3 sm:rounded-l-lg sm:rounded-tr-none sm:border-r-0 ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } bg-white`}
                      />
                      <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="w-full shrink-0 whitespace-nowrap rounded-b-lg border border-gray-300 border-t-0 bg-gray-300 px-5 sm:w-auto sm:rounded-bl-none sm:rounded-r-lg sm:border-l-0 sm:border-t"
                      >
                        Create
                      </button>
                    </div>
                    {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
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
                    <label className="text-xs font-semibold uppercase text-gray-600">Contact Number</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(event) => handleRequiredFieldChange("contact", event.target.value)}
                      placeholder="+94 XX XXX XXXX"
                      aria-invalid={Boolean(errors.contact)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.contact ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.contact ? <p className="mt-1 text-xs text-red-600">{errors.contact}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => handleRequiredFieldChange("email", event.target.value)}
                      placeholder="kamal@primecore.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    />
                    {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Assign Branch</label>
                    <select
                      value={formData.assignedBranch}
                      onChange={(event) => handleRequiredFieldChange("assignedBranch", event.target.value)}
                      aria-invalid={Boolean(errors.assignedBranch)}
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${
                        errors.assignedBranch ? "border-red-500" : "border-gray-300"
                      } bg-white`}
                    >
                      <option value="">Select Branch</option>
                      {BRANCH_OPTIONS.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                    {errors.assignedBranch ? <p className="mt-1 text-xs text-red-600">{errors.assignedBranch}</p> : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-600">Full Address</label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(event) => setFormData((prev) => ({ ...prev, address: event.target.value }))}
                      placeholder="Enter the complete street address and landmarks..."
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
                      Save Officer
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
