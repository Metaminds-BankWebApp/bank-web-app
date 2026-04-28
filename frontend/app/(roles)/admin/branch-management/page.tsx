"use client";

import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { ConfirmationModal, useToast } from "@/src/components/ui";
import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Search, X } from "lucide-react";
import Link from "next/link";
import {
  deleteAdminBranch,
  getAdminBranches,
  updateAdminBranch,
} from "@/src/api/admin/branch.service";
import { ApiError } from "@/src/types/api-error";
import type { BranchResponse, BranchStatus } from "@/src/types/dto/branch.dto";

type StatusType = "Active" | "Inactive" | "Maintenance";

type BranchFormData = {
  branchName: string;
  branchEmail: string;
  branchPhone: string;
  address: string;
  status: BranchStatus;
};

type BranchFormErrors = Partial<
  Record<"branchName" | "branchEmail" | "branchPhone" | "address", string>
>;

type BranchData = {
  internalId: number;
  id: string;
  name: string;
  address: string;
  email: string;
  contact: string;
  officers: number;
  customers: number;
  status: StatusType;
  statusCode: BranchStatus;
};

const branchEmailRegex = /^[a-zA-Z0-9._%+-]+@primecore\.com$/i;
const branchContactRegex =
  /^(?:070|071|072|074|075|076|077|078|011|021|023|024|025|026|027|031|032|033|034|035|036|037|038|041|045|047|051|052|054|055|057|063|065|066|067|081|091)\d{7}$/;
const branchStatusOptions: Array<{ value: BranchStatus; label: string }> = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

function SummaryCard({
  label,
  value,
  variant = "light",
}: {
  label: string;
  value: string | number;
  variant?: "dark" | "medium" | "soft" | "light";
}) {
  const classes =
    variant === "dark"
      ? "bg-[#0d3b66] text-white"
      : variant === "medium"
      ? "bg-[#446892] text-white"
      : variant === "soft"
      ? "bg-[#6f8fb6] text-[#13365f]"
      : "bg-[#9fb1c9] text-[#15375f]";

  const titleClass =
    variant === "dark" || variant === "medium" ? "text-white/75" : "text-[#15375f]/80";

  return (
    <div
      className={`rounded-2xl p-6 shadow-[0_16px_26px_-20px_rgba(11,43,89,0.85)] flex flex-col justify-between ${classes}`}
    >
      <span className={`text-xs font-semibold tracking-wide ${titleClass}`}>{label}</span>
      <span className="mt-3 text-2xl font-bold leading-none">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  const classes =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Inactive"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}

function toDisplayStatus(status: BranchResponse["status"]): StatusType {
  const normalized = toStatusCode(status);

  if (normalized === "ACTIVE") {
    return "Active";
  }
  if (normalized === "MAINTENANCE") {
    return "Maintenance";
  }
  return "Inactive";
}

function toStatusCode(status: BranchResponse["status"]): BranchStatus {
  const normalized = (status ?? "").toString().trim().toUpperCase();
  if (normalized === "MAINTENANCE") {
    return "MAINTENANCE";
  }
  if (normalized === "INACTIVE") {
    return "INACTIVE";
  }
  return "ACTIVE";
}

function mapApiBranch(branch: BranchResponse): BranchData {
  const statusCode = toStatusCode(branch.status);
  const officerCount =
    typeof branch.officerCount === "number" && Number.isFinite(branch.officerCount)
      ? branch.officerCount
      : 0;
  const customerCount =
    typeof branch.customerCount === "number" && Number.isFinite(branch.customerCount)
      ? branch.customerCount
      : 0;

  return {
    internalId: branch.branchId,
    id: branch.branchCode || `BR-${String(branch.branchId).padStart(4, "0")}`,
    name: branch.branchName || "-",
    address: branch.address?.trim() || "-",
    email: branch.branchEmail?.trim() || "-",
    contact: branch.branchPhone?.trim() || "-",
    officers: officerCount,
    customers: customerCount,
    status: toDisplayStatus(statusCode),
    statusCode,
  };
}

export default function Page() {
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updatingBranchId, setUpdatingBranchId] = useState<number | null>(null);
  const [editingBranch, setEditingBranch] = useState<BranchData | null>(null);
  const [branchToDelete, setBranchToDelete] = useState<BranchData | null>(null);
  const [editForm, setEditForm] = useState<BranchFormData>({
    branchName: "",
    branchEmail: "",
    branchPhone: "",
    address: "",
    status: "ACTIVE",
  });
  const [editErrors, setEditErrors] = useState<BranchFormErrors>({});
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const branchesPerPage = 5;

  useEffect(() => {
    let mounted = true;

    const loadBranches = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await getAdminBranches();
        if (!mounted) {
          return;
        }

        setBranches(data.map(mapApiBranch));
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof ApiError ? error.message : "Failed to load branches from server.";
        setLoadError(message);
        setBranches([]);
        showToast({
          type: "error",
          title: "Load failed",
          description: message,
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadBranches();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  const applyBranchUpdate = (updated: BranchResponse) => {
    setBranches((prev) =>
      prev.map((entry) =>
        entry.internalId === updated.branchId ? mapApiBranch(updated) : entry
      )
    );
  };

  const openEditModal = (branch: BranchData) => {
    setEditingBranch(branch);
    setEditForm({
      branchName: branch.name === "-" ? "" : branch.name,
      branchEmail: branch.email === "-" ? "" : branch.email,
      branchPhone: branch.contact === "-" ? "" : branch.contact,
      address: branch.address === "-" ? "" : branch.address,
      status: branch.statusCode,
    });
    setEditErrors({});
  };

  const closeEditModal = () => {
    if (isSavingEdit) {
      return;
    }
    setEditingBranch(null);
    setEditErrors({});
  };

  const validateBranchEditForm = (formData: BranchFormData): BranchFormErrors => {
    const errors: BranchFormErrors = {};

    if (!formData.branchName.trim()) {
      errors.branchName = "Branch name is required.";
    }
    if (!formData.branchPhone.trim()) {
      errors.branchPhone = "Contact number is required.";
    } else if (!branchContactRegex.test(formData.branchPhone.trim())) {
      errors.branchPhone =
        "Contact number must be 10 digits and start with a valid Sri Lankan area/mobile code.";
    }
    if (!formData.branchEmail.trim()) {
      errors.branchEmail = "Email address is required.";
    } else if (!branchEmailRegex.test(formData.branchEmail.trim())) {
      errors.branchEmail = "Email must be in the format name@primecore.com.";
    }
    if (!formData.address.trim()) {
      errors.address = "Full address is required.";
    }

    return errors;
  };

  const handleSaveEditedBranch = async () => {
    if (!editingBranch) {
      return;
    }

    const nextErrors = validateBranchEditForm(editForm);
    setEditErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSavingEdit(true);

    try {
      const updated = await updateAdminBranch(editingBranch.internalId, {
        branchName: editForm.branchName.trim(),
        branchEmail: editForm.branchEmail.trim().toLowerCase(),
        branchPhone: editForm.branchPhone.trim(),
        address: editForm.address.trim(),
        status: editForm.status,
      });
      applyBranchUpdate(updated);
      setEditingBranch(null);
      showToast({
        type: "success",
        title: "Branch updated",
        description: `${updated.branchName} was updated successfully.`,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to update branch details.";
      showToast({
        type: "error",
        title: "Update failed",
        description: message,
      });
    } finally {
      setIsSavingEdit(false);
    }
  };

  const openDeleteBranchModal = (branch: BranchData) => {
    setBranchToDelete(branch);
  };

  const closeDeleteBranchModal = () => {
    if (updatingBranchId !== null) {
      return;
    }
    setBranchToDelete(null);
  };

  const handleDeleteBranch = async () => {
    if (!branchToDelete) {
      return;
    }
    const branch = branchToDelete;

    setUpdatingBranchId(branch.internalId);
    try {
      const deleted = await deleteAdminBranch(branch.internalId);
      setBranches((prev) => prev.filter((entry) => entry.internalId !== branch.internalId));
      showToast({
        type: "success",
        title: "Branch deleted",
        description: `${deleted.branchName} was permanently deleted.`,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to delete branch permanently.";
      showToast({
        type: "error",
        title: "Delete failed",
        description: message,
      });
    } finally {
      setUpdatingBranchId(null);
      setBranchToDelete(null);
    }
  };

  const filteredBranches = useMemo(() => {
    const normalized = searchQuery.toLowerCase();

    return [...branches]
      .filter(
        (branch) =>
          branch.id.toLowerCase().includes(normalized) ||
          branch.name.toLowerCase().includes(normalized) ||
          branch.address.toLowerCase().includes(normalized)
      )
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [branches, searchQuery]);

  const totalPages = Math.ceil(filteredBranches.length / branchesPerPage);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * branchesPerPage,
    currentPage * branchesPerPage
  );

  const showingFrom =
    filteredBranches.length === 0 ? 0 : (currentPage - 1) * branchesPerPage + 1;
  const showingTo =
    filteredBranches.length === 0
      ? 0
      : Math.min(currentPage * branchesPerPage, filteredBranches.length);

  const summary = useMemo(() => {
    const activeBranches = branches.filter((branch) => branch.status === "Active").length;
    const totalOfficers = branches.reduce((sum, branch) => sum + branch.officers, 0);
    const totalCustomers = branches.reduce((sum, branch) => sum + branch.customers, 0);

    return {
      totalBranches: branches.length,
      activeBranches,
      totalOfficers,
      totalCustomers,
    };
  }, [branches]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
              title="Branch Management"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard label="TOTAL BRANCHES" value={summary.totalBranches} variant="dark" />
              <SummaryCard label="ACTIVE BRANCHES" value={summary.activeBranches} variant="medium" />
              <SummaryCard label="NO OF OFFICERS" value={summary.totalOfficers} />
              <SummaryCard label="TOTAL CUSTOMERS" value={summary.totalCustomers.toLocaleString()} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search Branches by ID, Name or Address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B66]"
                />
              </div>

              <Link href="/admin/branch-management/add">
                <button className="px-6 py-3 bg-[#0B3B66] text-white rounded-lg hover:bg-[#082d4a] transition">
                  + New Branch
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "ID",
                        "Branch Name",
                        "Address",
                        "Email Address",
                        "Contact",
                        "Officers",
                        "Customers",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {isLoading ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-gray-500" colSpan={9}>
                          Loading branches...
                        </td>
                      </tr>
                    ) : loadError ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-red-600" colSpan={9}>
                          {loadError}
                        </td>
                      </tr>
                    ) : paginatedBranches.length === 0 ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-gray-500" colSpan={9}>
                          No branches found.
                        </td>
                      </tr>
                    ) : (
                      paginatedBranches.map((branch) => {
                        const isUpdating = updatingBranchId === branch.internalId;
                        return (
                          <tr key={branch.internalId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{branch.id}</td>
                            <td className="px-6 py-4">{branch.name}</td>
                            <td className="px-6 py-4 text-gray-600">{branch.address}</td>
                            <td className="px-6 py-4">{branch.email}</td>
                            <td className="px-6 py-4">{branch.contact}</td>
                            <td className="px-6 py-4 font-semibold">{branch.officers.toLocaleString()}</td>
                            <td className="px-6 py-4 font-semibold">{branch.customers.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={branch.status} />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openEditModal(branch)}
                                  disabled={isUpdating}
                                  title="Edit branch details"
                                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  onClick={() => openDeleteBranchModal(branch)}
                                  disabled={isUpdating}
                                  title="Delete branch permanently"
                                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="text-sm text-gray-600">
                Showing {showingFrom} to {showingTo} of {filteredBranches.length} branches
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((previous) => Math.max(previous - 1, 1))}
                  disabled={currentPage === 1 || totalPages === 0}
                  className="px-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-[#0B3B66] text-white"
                          : "border text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((previous) => Math.min(previous + 1, Math.max(totalPages, 1)))
                  }
                  disabled={totalPages === 0 || currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </main>

        {editingBranch ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSavingEdit}
                title="Close"
                className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <X size={16} />
              </button>
              <h3 className="text-xl font-semibold text-gray-900">Edit Branch</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update branch details and save your changes.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase text-gray-600">Branch Name</label>
                  <input
                    type="text"
                    value={editForm.branchName}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, branchName: event.target.value }));
                      if (editErrors.branchName) {
                        setEditErrors((prev) => ({ ...prev, branchName: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.branchName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.branchName ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.branchName}</p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-600">Contact Number</label>
                  <input
                    type="text"
                    value={editForm.branchPhone}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, branchPhone: event.target.value }));
                      if (editErrors.branchPhone) {
                        setEditErrors((prev) => ({ ...prev, branchPhone: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.branchPhone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.branchPhone ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.branchPhone}</p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-600">Email Address</label>
                  <input
                    type="email"
                    value={editForm.branchEmail}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, branchEmail: event.target.value }));
                      if (editErrors.branchEmail) {
                        setEditErrors((prev) => ({ ...prev, branchEmail: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.branchEmail ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.branchEmail ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.branchEmail}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase text-gray-600">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(event) => {
                      setEditForm((prev) => ({
                        ...prev,
                        status: event.target.value as BranchStatus,
                      }));
                    }}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    {branchStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase text-gray-600">Address</label>
                  <textarea
                    rows={3}
                    value={editForm.address}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, address: event.target.value }));
                      if (editErrors.address) {
                        setEditErrors((prev) => ({ ...prev, address: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.address ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.address}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSavingEdit}
                  className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditedBranch}
                  disabled={isSavingEdit}
                  className="rounded-lg bg-[#0B3B66] px-5 py-2 text-sm font-medium text-white hover:bg-[#082d4a] disabled:opacity-50"
                >
                  {isSavingEdit ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <ConfirmationModal
          open={Boolean(branchToDelete)}
          title="Delete Branch"
          message={`Are you sure you want to permanently delete "${branchToDelete?.name ?? "this branch"}"? This action cannot be undone.`}
          confirmLabel="Delete Branch"
          isProcessing={updatingBranchId === branchToDelete?.internalId}
          onCancel={closeDeleteBranchModal}
          onConfirm={handleDeleteBranch}
        />
      </div>
    </AuthGuard>
  );
}
