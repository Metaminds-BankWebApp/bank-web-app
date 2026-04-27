"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Search } from "lucide-react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import {
  getAdminBankOfficers,
  type AdminBankOfficerSummaryResponse,
  type AdminBankOfficerStatus,
  updateAdminBankOfficerStatus,
} from "@/src/api/admin/bank-officer.service";
import { ApiError } from "@/src/types/api-error";

type StatusType = "Active" | "Inactive" | "Locked" | "Pending";

type OfficerData = {
  userId: number;
  id: string;
  name: string;
  branch: string;
  email: string;
  contact: string;
  assigned: string;
  status: StatusType;
  createdAt: string | null;
};

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

function mapApiOfficer(officer: AdminBankOfficerSummaryResponse): OfficerData {
  return {
    userId: officer.userId,
    id: officer.employeeCode?.trim() || "-",
    name: officer.fullName?.trim() || officer.email || `User ${officer.userId}`,
    branch: officer.branchName?.trim() || "-",
    email: officer.email || "-",
    contact: officer.phone?.trim() || "-",
    assigned: toDisplayDate(officer.lastUpdated),
    status: toDisplayStatus(officer.status || ""),
    createdAt: officer.createdAt,
  };
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [officers, setOfficers] = useState<OfficerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const officersPerPage = 5;

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const loadOfficers = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await getAdminBankOfficers();
        if (!mounted) {
          return;
        }

        setOfficers(data.map(mapApiOfficer));
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof ApiError ? error.message : "Failed to load bank officers from server.";
        setLoadError(message);
        setOfficers([]);
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
  }, []);

  const applyOfficerUpdate = (updated: AdminBankOfficerSummaryResponse) => {
    setOfficers((prev) =>
      prev.map((entry) =>
        entry.userId === updated.userId ? mapApiOfficer(updated) : entry
      )
    );
  };

  const handleToggleActive = async (officer: OfficerData) => {
    const nextStatus: AdminBankOfficerStatus =
      officer.status === "Active" ? "INACTIVE" : "ACTIVE";

    setUpdatingUserId(officer.userId);

    try {
      const updated = await updateAdminBankOfficerStatus(officer.userId, nextStatus);
      applyOfficerUpdate(updated);
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to update officer status.";
      alert(message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleToggleLock = async (officer: OfficerData) => {
    const nextStatus: AdminBankOfficerStatus =
      officer.status === "Locked" ? "ACTIVE" : "LOCKED";

    setUpdatingUserId(officer.userId);

    try {
      const updated = await updateAdminBankOfficerStatus(officer.userId, nextStatus);
      applyOfficerUpdate(updated);
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to update lock status.";
      alert(message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const filteredOfficers = useMemo(() => {
    const normalized = searchQuery.toLowerCase();

    return [...officers]
      .filter(
        (officer) =>
          officer.id.toLowerCase().includes(normalized) ||
          officer.name.toLowerCase().includes(normalized) ||
          officer.email.toLowerCase().includes(normalized)
      )
      .sort((left, right) => left.id.localeCompare(right.id));
  }, [officers, searchQuery]);

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
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search Officers by ID, Name or Email..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B66]"
                />
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
                                  onClick={() => handleToggleActive(officer)}
                                  disabled={isUpdating}
                                  title={officer.status === "Active" ? "Set Inactive" : "Set Active"}
                                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  onClick={() => handleToggleLock(officer)}
                                  disabled={isUpdating}
                                  title={officer.status === "Locked" ? "Unlock Officer" : "Lock Officer"}
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
      </div>
    </AuthGuard>
  );
}
