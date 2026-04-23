"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { createAdminBranch } from "@/src/api/admin/branch.service";
import { ApiError } from "@/src/types/api-error";
import type { BranchFormData, BranchFormErrors, BranchStatus } from "./types";
import { isBranchFormComplete, validateBranchForm } from "./validation";

const statusOptions: Array<{ value: BranchStatus; label: string }> = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

const getInitialFormData = (): BranchFormData => ({
  branchName: "",
  contact: "",
  email: "",
  address: "",
  status: "ACTIVE",
});

export default function AddBranchPage() {
  const [formData, setFormData] = useState<BranchFormData>(getInitialFormData);
  const [errors, setErrors] = useState<BranchFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const canSubmit = isBranchFormComplete(formData) && !isSaving;

  const handleRequiredFieldChange = (
    field: keyof Pick<BranchFormData, "branchName" | "contact" | "email" | "address">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateBranchForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    const payload = {
      branchName: formData.branchName.trim(),
      branchEmail: formData.email.trim(),
      branchPhone: formData.contact.trim(),
      address: formData.address.trim(),
      status: formData.status,
    };

    try {
      const data = await createAdminBranch(payload);

      alert(`Branch created successfully. Branch ID: ${data.branchCode}`);
      router.push("/admin/branch-management");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
          ? error.message
          : "Something went wrong while creating the branch.";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />

        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl p-3 sm:p-5 lg:p-7">
          <div className="shrink-0 mb-5">
            <ModuleHeader
              theme="staff"
              menuMode="sidebar-overlay"
              sidebarRole="ADMIN"
              mailBadge={2}
              notificationBadge={8}
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
              avatarStatusDot
              name="Kamal Edirisinghe"
              role="Admin"
              title="Branch Management / Add Branch"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-10">
            <div className="mb-6 text-sm text-gray-500">
              <Link href="/admin/branch-management" className="hover:text-[#0B3B66] font-medium">
                Branch Management
              </Link>{" "}
              / <span className="text-gray-800 font-semibold">Add Branch</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100 text-[#0B3B66]">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Branch Information</h2>
                <p className="text-sm text-gray-500">
                  Configure the primary details for the new bank branch.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                  <div>
                    <label className="block text-xs font-semibold mb-2">BRANCH NAME</label>
                    <input
                      type="text"
                      value={formData.branchName}
                      onChange={(e) => handleRequiredFieldChange("branchName", e.target.value)}
                      placeholder="Colombo Branch"
                      aria-invalid={Boolean(errors.branchName)}
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        errors.branchName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.branchName ? (
                      <p className="mt-1 text-xs text-red-600">{errors.branchName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">BRANCH ID</label>
                    <input
                      type="text"
                      value="Auto-generated by system"
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">TOTAL CUSTOMERS</label>
                    <input
                      type="text"
                      value="0"
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">TOTAL OFFICERS</label>
                    <input
                      type="text"
                      value="0"
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                  <div>
                    <label className="block text-xs font-semibold mb-2">CONTACT NUMBER</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleRequiredFieldChange("contact", e.target.value)}
                      placeholder="+94 XX XXX XXXX"
                      aria-invalid={Boolean(errors.contact)}
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        errors.contact ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.contact ? (
                      <p className="mt-1 text-xs text-red-600">{errors.contact}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleRequiredFieldChange("email", e.target.value)}
                      placeholder="branch@primecore.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email ? (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">FULL ADDRESS</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleRequiredFieldChange("address", e.target.value)}
                      placeholder="Enter the complete street address and landmarks..."
                      rows={4}
                      aria-invalid={Boolean(errors.address)}
                      className={`w-full px-4 py-3 rounded-lg border text-sm resize-none ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address ? (
                      <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">BRANCH STATUS</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as BranchStatus,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Link href="/admin/branch-management">
                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </Link>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`px-6 py-3 rounded-lg text-white transition ${
                    canSubmit
                      ? "bg-[#0B3B66] hover:bg-[#082d4a]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Branch"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
