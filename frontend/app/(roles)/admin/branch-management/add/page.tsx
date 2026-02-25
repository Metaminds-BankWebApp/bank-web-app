"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import type { BranchFormData, BranchFormErrors } from "./types";
import { generateBranchId } from "./utils";
import { isBranchFormComplete, validateBranchForm } from "./validation";

const getInitialFormData = (): BranchFormData => ({
  branchName: "",
  branchId: generateBranchId(),
  customers: "0",
  officers: "0",
  contact: "",
  email: "",
  address: "",
  isActive: true,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateBranchForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    console.log({
      ...formData,
      branchName: formData.branchName.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
    });

    // Later connect to backend here
    router.push("/admin/branch-management");
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        {/* Sidebar */}
         <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl p-3 sm:p-5 lg:p-7">
          {/* Header */}
          <div className="shrink-0 mb-5">
            <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="ADMIN" mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Admin" title="Branch Management / Add Branch" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-10">

            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
              <Link
                href="/admin/branch-management"
                className="hover:text-[#0B3B66] font-medium"
              >
                Branch Management
              </Link>{" "}
              / <span className="text-gray-800 font-semibold">Add Branch</span>
            </div>

            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100 text-[#0B3B66]">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Branch Information
                </h2>
                <p className="text-sm text-gray-500">
                  Configure the primary details for the new bank branch.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      BRANCH NAME
                    </label>
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
                    <label className="block text-xs font-semibold mb-2">
                      BRANCH ID
                    </label>
                    <input
                      type="text"
                      value={formData.branchId}
                      placeholder="BR-001"
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      TOTAL CUSTOMERS
                    </label>
                    <input
                      type="text"
                      value={formData.customers}
                      placeholder="200"
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      TOTAL OFFICERS
                    </label>
                    <input
                      type="text"
                      value={formData.officers}
                      placeholder="15"
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  

                </div>

                {/* Right Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      CONTACT NUMBER
                    </label>
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
                    <label className="block text-xs font-semibold mb-2">
                      EMAIL ADDRESS
                    </label>
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
                    <label className="block text-xs font-semibold mb-2">
                      FULL ADDRESS
                    </label>
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
                    <label className="block text-xs font-semibold mb-2">
                      BRANCH STATUS
                    </label>

                    <div className="flex items-center justify-between px-4 py-3 border rounded-lg">
                      <span className="text-sm">
                        {formData.isActive ? "Active" : "Maintenance"}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
                        }
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                          formData.isActive ? "bg-[#0B3B66]" : "bg-gray-400"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                            formData.isActive ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </div>
                </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button type="button"
                    onClick={() =>
                      router.push("/admin/branch-management")
                    }
                    className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`px-6 py-3 rounded-lg w-full sm:w-auto ${
                      canSubmit
                        ? "bg-[#0B3B66] text-white hover:bg-[#082d4a]"
                        : "bg-[#0B3B66]/50 text-white cursor-not-allowed"
                    }`}
                  >
                    Save Branch
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
