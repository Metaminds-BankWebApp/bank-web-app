"use client";

import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { getAdminBranches } from "@/src/api/admin/branch.service";
import { ApiError } from "@/src/types/api-error";
import type { BranchResponse } from "@/src/types/dto/branch.dto";

type StatusType = "Active" | "Inactive" | "Maintenance";

type BranchData = {
  internalId: number;
  id: string;
  name: string;
  address: string;
  contact: string;
  officers: number;
  customers: number;
  status: StatusType;
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
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}

function toDisplayStatus(status: BranchResponse["status"]): StatusType {
  const normalized = (status ?? "").toString().trim().toUpperCase();

  if (normalized === "ACTIVE") {
    return "Active";
  }
  if (normalized === "MAINTENANCE") {
    return "Maintenance";
  }
  return "Inactive";
}

function mapApiBranch(branch: BranchResponse): BranchData {
  return {
    internalId: branch.branchId,
    id: branch.branchCode || `BR-${String(branch.branchId).padStart(4, "0")}`,
    name: branch.branchName || "-",
    address: branch.address?.trim() || "-",
    contact: branch.branchPhone?.trim() || "-",
    officers: 0,
    customers: 0,
    status: toDisplayStatus(branch.status),
  };
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
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
  }, []);

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
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "ID",
                        "Branch Name",
                        "Address",
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
                        <td className="px-6 py-10 text-center text-gray-500" colSpan={8}>
                          Loading branches...
                        </td>
                      </tr>
                    ) : loadError ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-red-600" colSpan={8}>
                          {loadError}
                        </td>
                      </tr>
                    ) : paginatedBranches.length === 0 ? (
                      <tr>
                        <td className="px-6 py-10 text-center text-gray-500" colSpan={8}>
                          No branches found.
                        </td>
                      </tr>
                    ) : (
                      paginatedBranches.map((branch) => (
                        <tr key={branch.internalId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{branch.id}</td>
                          <td className="px-6 py-4">{branch.name}</td>
                          <td className="px-6 py-4 text-gray-600">{branch.address}</td>
                          <td className="px-6 py-4">{branch.contact}</td>
                          <td className="px-6 py-4 font-semibold">{branch.officers.toLocaleString()}</td>
                          <td className="px-6 py-4 font-semibold">{branch.customers.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={branch.status} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => console.log("Edit:", branch.internalId)}
                                className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                onClick={() => console.log("Delete:", branch.internalId)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
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
      </div>
    </AuthGuard>
  );
}
