"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Search, X } from "lucide-react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { ConfirmationModal, useToast } from "@/src/components/ui";
import { getAdminBranches } from "@/src/api/admin/branch.service";
import {
  getAdminBankOfficers,
  updateAdminBankOfficer,
  type AdminBankOfficerUpdateRequest,
  type AdminBankOfficerSummaryResponse,
  type AdminBankOfficerStatus,
  deleteAdminBankOfficer,
  updateAdminBankOfficerStatus,
} from "@/src/api/admin/bank-officer.service";
import { ApiError } from "@/src/types/api-error";
import type { BranchResponse } from "@/src/types/dto/branch.dto";

type StatusType = "Active" | "Inactive" | "Locked" | "Pending";

type OfficerData = {
  userId: number;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  branchId: number | null;
  branch: string;
  email: string;
  contact: string;
  assigned: string;
  status: StatusType;
  createdAt: string | null;
};

type OfficerSearchField =
  | "ALL"
  | "ID"
  | "NAME"
  | "BRANCH"
  | "EMAIL"
  | "CONTACT"
  | "ASSIGNED"
  | "STATUS";

type OfficerEditErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "contactNumber" | "branchId", string>
>;

type OfficerEditForm = AdminBankOfficerUpdateRequest & {
  status: AdminBankOfficerStatus;
};

const officerEmailRegex = /^[a-zA-Z0-9._%+-]+@primecore\.com$/i;
const officerContactRegex = /^(?:070|071|072|074|075|076|077|078)\d{7}$/;
const officerSearchOptions: Array<{ value: OfficerSearchField; label: string }> = [
  { value: "ALL", label: "All Fields" },
  { value: "ID", label: "ID" },
  { value: "NAME", label: "Officer Name" },
  { value: "BRANCH", label: "Branch" },
  { value: "EMAIL", label: "Email" },
  { value: "CONTACT", label: "Contact" },
  { value: "ASSIGNED", label: "Assigned Date" },
  { value: "STATUS", label: "Status" },
];
const officerStatusKeywords = new Set(["active", "inactive", "locked", "pending"]);

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
      : status === "Locked"
      ? "bg-slate-200 text-slate-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}

function toDisplayDate(isoDateTime: string | null): string {
  if (!isoDateTime) {
    return "-";
  }

  const parsed = new Date(isoDateTime);
  if (Number.isNaN(parsed.getTime())) {
    return isoDateTime;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function toDisplayStatus(status: string): StatusType {
  const normalized = status.trim().toUpperCase();

  if (normalized === "ACTIVE") {
    return "Active";
  }
  if (normalized === "INACTIVE") {
    return "Inactive";
  }
  if (normalized === "LOCKED") {
    return "Locked";
  }
  return "Pending";
}

function toStatusCode(status: StatusType): AdminBankOfficerStatus {
  if (status === "Locked") {
    return "LOCKED";
  }
  if (status === "Inactive") {
    return "INACTIVE";
  }
  return "ACTIVE";
}

function matchesOfficerStatus(status: StatusType, normalizedQuery: string): boolean {
  const normalizedStatus = status.toLowerCase();
  if (officerStatusKeywords.has(normalizedQuery)) {
    return normalizedStatus === normalizedQuery;
  }
  return normalizedStatus.includes(normalizedQuery);
}

function isRecentDate(isoDateTime: string | null, days: number): boolean {
  if (!isoDateTime) {
    return false;
  }

  const timestamp = new Date(isoDateTime).getTime();
  if (Number.isNaN(timestamp)) {
    return false;
  }

  const dayInMs = 24 * 60 * 60 * 1000;
  return Date.now() - timestamp <= days * dayInMs;
}

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "NA";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function mapApiOfficer(officer: AdminBankOfficerSummaryResponse): OfficerData {
  const split = splitName(officer.fullName?.trim() || "");
  return {
    userId: officer.userId,
    id: officer.employeeCode?.trim() || "-",
    firstName: split.firstName,
    lastName: split.lastName,
    name: officer.fullName?.trim() || officer.email || `User ${officer.userId}`,
    branchId: officer.branchId ?? null,
    branch: officer.branchName?.trim() || "-",
    email: officer.email || "-",
    contact: officer.phone?.trim() || "-",
    assigned: toDisplayDate(officer.lastUpdated),
    status: toDisplayStatus(officer.status || ""),
    createdAt: officer.createdAt,
  };
}

export default function Page() {
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<OfficerSearchField>("ALL");
  const [officers, setOfficers] = useState<OfficerData[]>([]);
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const [editingOfficer, setEditingOfficer] = useState<OfficerData | null>(null);
  const [officerToDelete, setOfficerToDelete] = useState<OfficerData | null>(null);
  const [editForm, setEditForm] = useState<OfficerEditForm>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    branchId: 0,
    status: "ACTIVE",
  });
  const [editErrors, setEditErrors] = useState<OfficerEditErrors>({});
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const officersPerPage = 5;

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const loadOfficers = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [officerData, branchData] = await Promise.all([
          getAdminBankOfficers(),
          getAdminBranches(),
        ]);
        if (!mounted) {
          return;
        }

        setOfficers(officerData.map(mapApiOfficer));
        setBranches(branchData);
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof ApiError ? error.message : "Failed to load bank officers from server.";
        setLoadError(message);
        setOfficers([]);
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

    void loadOfficers();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  const applyOfficerUpdate = (updated: AdminBankOfficerSummaryResponse) => {
    setOfficers((prev) =>
      prev.map((entry) =>
        entry.userId === updated.userId ? mapApiOfficer(updated) : entry
      )
    );
  };

  const openDeleteOfficerModal = (officer: OfficerData) => {
    setOfficerToDelete(officer);
  };

  const closeDeleteOfficerModal = () => {
    if (updatingUserId !== null) {
      return;
    }
    setOfficerToDelete(null);
  };

  const handleDeleteOfficer = async () => {
    if (!officerToDelete) {
      return;
    }
    const officer = officerToDelete;

    setUpdatingUserId(officer.userId);
    try {
      const deleted = await deleteAdminBankOfficer(officer.userId);
      setOfficers((prev) => prev.filter((entry) => entry.userId !== officer.userId));
      showToast({
        type: "success",
        title: "Officer deleted",
        description: `${deleted.fullName} was permanently deleted.`,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to delete officer permanently.";
      showToast({
        type: "error",
        title: "Delete failed",
        description: message,
      });
    } finally {
      setUpdatingUserId(null);
      setOfficerToDelete(null);
    }
  };

  const openEditModal = (officer: OfficerData) => {
    setEditingOfficer(officer);
    setEditForm({
      firstName: officer.firstName,
      lastName: officer.lastName,
      email: officer.email === "-" ? "" : officer.email,
      contactNumber: officer.contact === "-" ? "" : officer.contact,
      branchId: officer.branchId ?? 0,
      status: toStatusCode(officer.status),
    });
    setEditErrors({});
  };

  const closeEditModal = () => {
    if (isSavingEdit) {
      return;
    }
    setEditingOfficer(null);
    setEditErrors({});
  };

  const validateOfficerEditForm = (
    payload: AdminBankOfficerUpdateRequest
  ): OfficerEditErrors => {
    const errors: OfficerEditErrors = {};
    if (!payload.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!payload.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!payload.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!officerEmailRegex.test(payload.email.trim())) {
      errors.email = "Email must be in the format name@primecore.com.";
    }
    if (!payload.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
    } else if (!officerContactRegex.test(payload.contactNumber.trim())) {
      errors.contactNumber =
        "Contact number must be 10 digits and start with 070, 071, 072, 074, 075, 076, 077, or 078.";
    }
    if (!Number.isFinite(payload.branchId) || payload.branchId <= 0) {
      errors.branchId = "Please select a branch.";
    }
    return errors;
  };

  const handleSaveEditedOfficer = async () => {
    if (!editingOfficer) {
      return;
    }

    const normalizedPayload: AdminBankOfficerUpdateRequest = {
      firstName: editForm.firstName.trim(),
      lastName: editForm.lastName.trim(),
      email: editForm.email.trim().toLowerCase(),
      contactNumber: editForm.contactNumber.trim(),
      branchId: Number(editForm.branchId),
    };
    const nextStatus = editForm.status;

    const nextErrors = validateOfficerEditForm(normalizedPayload);
    setEditErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSavingEdit(true);
    try {
      let updated = await updateAdminBankOfficer(
        editingOfficer.userId,
        normalizedPayload
      );
      if ((updated.status || "").toUpperCase() !== nextStatus) {
        updated = await updateAdminBankOfficerStatus(editingOfficer.userId, nextStatus);
      }
      applyOfficerUpdate(updated);
      setEditingOfficer(null);
      showToast({
        type: "success",
        title: "Officer updated",
        description: `${updated.fullName} was updated successfully.`,
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to update bank officer details.";
      showToast({
        type: "error",
        title: "Update failed",
        description: message,
      });
    } finally {
      setIsSavingEdit(false);
    }
  };

  const filteredOfficers = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    if (!normalized) {
      return officers;
    }

    return officers.filter((officer) => {
      const matches = (value: string | number) =>
        String(value).toLowerCase().includes(normalized);

      if (searchField === "ALL") {
        return (
          matches(officer.id) ||
          matches(officer.name) ||
          matches(officer.branch) ||
          matches(officer.email) ||
          matches(officer.contact) ||
          matches(officer.assigned) ||
          matchesOfficerStatus(officer.status, normalized)
        );
      }
      if (searchField === "ID") {
        return matches(officer.id);
      }
      if (searchField === "NAME") {
        return matches(officer.name);
      }
      if (searchField === "BRANCH") {
        return matches(officer.branch);
      }
      if (searchField === "EMAIL") {
        return matches(officer.email);
      }
      if (searchField === "CONTACT") {
        return matches(officer.contact);
      }
      if (searchField === "ASSIGNED") {
        return matches(officer.assigned);
      }
      return matchesOfficerStatus(officer.status, normalized);
    });
  }, [officers, searchField, searchQuery]);

  const totalPages = Math.ceil(filteredOfficers.length / officersPerPage);
  const paginatedOfficers = filteredOfficers.slice(
    (currentPage - 1) * officersPerPage,
    currentPage * officersPerPage
  );

  const showingFrom =
    filteredOfficers.length === 0 ? 0 : (currentPage - 1) * officersPerPage + 1;
  const showingTo =
    filteredOfficers.length === 0 ? 0 : Math.min(currentPage * officersPerPage, filteredOfficers.length);

  const summary = useMemo(() => {
    const activeCount = officers.filter((officer) => officer.status === "Active").length;
    const inactiveCount = officers.filter((officer) => officer.status === "Inactive").length;
    const recentCount = officers.filter((officer) => isRecentDate(officer.createdAt, 7)).length;

    return {
      totalOfficers: officers.length,
      activeCount,
      inactiveCount,
      recentCount,
    };
  }, [officers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchField]);

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
              title="Bank Officer Management"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard label="TOTAL OFFICERS" value={summary.totalOfficers} variant="dark" />
              <SummaryCard label="ACTIVE OFFICERS" value={summary.activeCount} variant="medium" />
              <SummaryCard label="INACTIVE OFFICERS" value={summary.inactiveCount} />
              <SummaryCard label="NEWLY ADDED OFFICERS" value={summary.recentCount} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-1 flex-col sm:flex-row gap-3">
                <select
                  value={searchField}
                  onChange={(event) =>
                    setSearchField(event.target.value as OfficerSearchField)
                  }
                  className="h-12 rounded-full border border-gray-300 bg-white px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3B66]"
                >
                  {officerSearchOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      Search by {option.label}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search officers..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-12 w-full pl-12 pr-4 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B66]"
                  />
                </div>
              </div>

              <button
                onClick={() => router.push("/admin/bank-officer-management/add")}
                className="px-6 py-3 bg-[#0B3B66] text-white rounded-lg hover:bg-[#082d4a] transition"
              >
                + New Officer
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "ID",
                        "Officer Name",
                        "Branch",
                        "Email Address",
                        "Contact",
                        "Assigned",
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
                        <td className="px-6 py-10 text-center text-gray-500" colSpan={8}>
                          Loading officers...
                        </td>
                      </tr>
                    ) : loadError ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-red-600" colSpan={8}>
                          {loadError}
                        </td>
                      </tr>
                    ) : paginatedOfficers.length === 0 ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-gray-500" colSpan={8}>
                          No officers found.
                        </td>
                      </tr>
                    ) : (
                      paginatedOfficers.map((officer) => {
                        const isUpdating = updatingUserId === officer.userId;

                        return (
                          <tr key={officer.userId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{officer.id}</td>
                            <td className="px-6 py-4 flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-base font-semibold text-[#0B3B66] border border-gray-300">
                                {getInitials(officer.name)}
                              </div>
                              <span className="font-semibold text-gray-900">{officer.name}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{officer.branch}</td>
                            <td className="px-6 py-4">{officer.email}</td>
                            <td className="px-6 py-4">{officer.contact}</td>
                            <td className="px-6 py-4">{officer.assigned}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={officer.status} />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openEditModal(officer)}
                                  disabled={isUpdating}
                                  title="Edit officer details"
                                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  onClick={() => openDeleteOfficerModal(officer)}
                                  disabled={isUpdating}
                                  title="Delete officer permanently"
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
                Showing {showingFrom} to {showingTo} of {filteredOfficers.length} officers
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

        {editingOfficer ? (
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
              <h3 className="text-xl font-semibold text-gray-900">Edit Officer</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update officer details and save your changes.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-600">First Name</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, firstName: event.target.value }));
                      if (editErrors.firstName) {
                        setEditErrors((prev) => ({ ...prev, firstName: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.firstName ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.firstName}</p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-600">Last Name</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, lastName: event.target.value }));
                      if (editErrors.lastName) {
                        setEditErrors((prev) => ({ ...prev, lastName: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.lastName ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.lastName}</p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-600">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, email: event.target.value }));
                      if (editErrors.email) {
                        setEditErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.email ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-600">Contact Number</label>
                  <input
                    type="text"
                    value={editForm.contactNumber}
                    onChange={(event) => {
                      setEditForm((prev) => ({
                        ...prev,
                        contactNumber: event.target.value,
                      }));
                      if (editErrors.contactNumber) {
                        setEditErrors((prev) => ({ ...prev, contactNumber: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.contactNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editErrors.contactNumber ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.contactNumber}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase text-gray-600">Assigned Branch</label>
                  <select
                    value={String(editForm.branchId)}
                    onChange={(event) => {
                      setEditForm((prev) => ({
                        ...prev,
                        branchId: Number(event.target.value),
                      }));
                      if (editErrors.branchId) {
                        setEditErrors((prev) => ({ ...prev, branchId: undefined }));
                      }
                    }}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
                      editErrors.branchId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="0">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.branchId} value={branch.branchId}>
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                  {editErrors.branchId ? (
                    <p className="mt-1 text-xs text-red-600">{editErrors.branchId}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase text-gray-600">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(event) => {
                      setEditForm((prev) => ({
                        ...prev,
                        status: event.target.value as AdminBankOfficerStatus,
                      }));
                    }}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="LOCKED">Locked</option>
                  </select>
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
                  onClick={handleSaveEditedOfficer}
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
          open={Boolean(officerToDelete)}
          title="Delete Officer"
          message={`Are you sure you want to permanently delete "${officerToDelete?.name ?? "this officer"}"? This action cannot be undone.`}
          confirmLabel="Delete Officer"
          isProcessing={updatingUserId === officerToDelete?.userId}
          onCancel={closeDeleteOfficerModal}
          onConfirm={handleDeleteOfficer}
        />
      </div>
    </AuthGuard>
  );
}
