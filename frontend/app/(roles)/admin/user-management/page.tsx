"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { Pencil, Search, Trash2 } from "lucide-react";
import {
  getAdminUsers,
  updateAdminUserStatus,
} from "@/src/api/admin/user-management.service";
import { ApiError } from "@/src/types/api-error";
import type {
  AdminCustomerType,
  AdminUserManagementUserResponse,
  AdminUserStatus,
} from "@/src/types/dto/admin-user-management.dto";

const usersPerPage = 5;

function formatJoinedDate(value: string | null): string {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function getStatusLabel(status: AdminUserStatus): string {
  if (status === "ACTIVE") {
    return "Active";
  }
  if (status === "INACTIVE") {
    return "Inactive";
  }
  return "Locked";
}

function getCustomerTypeLabel(
  customerType: AdminUserManagementUserResponse["customerType"]
): string {
  return customerType === "BANK" ? "Bank" : "Public";
}

function resolveAvatar(user: AdminUserManagementUserResponse): string {
  if (user.avatarUrl?.trim()) {
    return user.avatarUrl;
  }

  const fallbackName = user.fullName?.trim() || "User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fallbackName
  )}&background=0B3B66&color=ffffff`;
}

function resolveCustomerId(user: AdminUserManagementUserResponse): string {
  const value = user.customerId?.trim();
  if (!value) {
    return `#${user.userId}`;
  }

  return value.startsWith("#") ? value : `#${value}`;
}

export default function UserManagementPage() {
  const [filter, setFilter] = useState<AdminCustomerType>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<AdminUserManagementUserResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const hasLoadedOnceRef = useRef(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [searchInput]);

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      setError(null);
      if (hasLoadedOnceRef.current) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const data = await getAdminUsers({
          customerType: filter,
          search: searchQuery || undefined,
        });

        if (!mounted) {
          return;
        }

        setUsers(data);
      } catch (unknownError) {
        if (!mounted) {
          return;
        }

        const message =
          unknownError instanceof ApiError
            ? unknownError.message
            : "Failed to load users.";
        setUsers([]);
        setError(message);
      } finally {
        if (mounted) {
          hasLoadedOnceRef.current = true;
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    void loadUsers();

    return () => {
      mounted = false;
    };
  }, [filter, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(users.length / usersPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return users.slice(start, start + usersPerPage);
  }, [currentPage, users]);

  const handleToggleStatus = async (user: AdminUserManagementUserResponse) => {
    const nextStatus: AdminUserStatus =
      user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    setUpdatingUserId(user.userId);

    try {
      const updated = await updateAdminUserStatus(user.userId, nextStatus);
      setUsers((prev) =>
        prev.map((entry) =>
          entry.userId === updated.userId ? updated : entry
        )
      );
    } catch (unknownError) {
      const message =
        unknownError instanceof ApiError
          ? unknownError.message
          : "Failed to update user status.";
      alert(message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleLockUser = async (user: AdminUserManagementUserResponse) => {
    if (user.status === "LOCKED") {
      return;
    }

    const confirmed = window.confirm(
      `Lock user "${user.fullName}"? This action can be reversed later by setting ACTIVE or INACTIVE status.`
    );

    if (!confirmed) {
      return;
    }

    setUpdatingUserId(user.userId);

    try {
      const updated = await updateAdminUserStatus(user.userId, "LOCKED");
      setUsers((prev) =>
        prev.map((entry) =>
          entry.userId === updated.userId ? updated : entry
        )
      );
    } catch (unknownError) {
      const message =
        unknownError instanceof ApiError
          ? unknownError.message
          : "Failed to lock user.";
      alert(message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const fromIndex = users.length === 0 ? 0 : (currentPage - 1) * usersPerPage + 1;
  const toIndex =
    users.length === 0 ? 0 : Math.min(currentPage * usersPerPage, users.length);

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
              title="User Management"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">Filter by:</span>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    filter === "ALL"
                      ? "bg-[#0B3B66] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setFilter("ALL")}
                >
                  All Customers
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    filter === "BANK"
                      ? "bg-[#0B3B66] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setFilter("BANK")}
                >
                  Bank Customers
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    filter === "PUBLIC"
                      ? "bg-[#0B3B66] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setFilter("PUBLIC")}
                >
                  Public Customers
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search users by ID, name, email, contact, or status..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="w-full bg-transparent border-none text-sm focus:outline-none"
              />
              {isRefreshing ? (
                <span className="ml-3 text-xs text-gray-400">Refreshing...</span>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "ID",
                        "Name",
                        "Email",
                        "Contact Number",
                        "Joined Date",
                        "Customer Type",
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
                        <td
                          colSpan={8}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          Loading users...
                        </td>
                      </tr>
                    ) : paginatedUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No users found for the selected filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((user) => {
                        const isUpdating = updatingUserId === user.userId;

                        return (
                          <tr key={user.userId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">
                              {resolveCustomerId(user)}
                            </td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <img
                                src={resolveAvatar(user)}
                                alt={user.fullName}
                                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                              />
                              <span className="font-semibold text-gray-900">
                                {user.fullName || "-"}
                              </span>
                            </td>
                            <td className="px-6 py-4">{user.email || "-"}</td>
                            <td className="px-6 py-4">
                              {user.contactNumber || "-"}
                            </td>
                            <td className="px-6 py-4">
                              {formatJoinedDate(user.joinedDate)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  user.customerType === "BANK"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {getCustomerTypeLabel(user.customerType)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                  user.status === "ACTIVE"
                                    ? "bg-green-100 text-green-700"
                                    : user.status === "INACTIVE"
                                    ? "bg-gray-200 text-gray-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {getStatusLabel(user.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleToggleStatus(user)}
                                  disabled={isUpdating || user.status === "LOCKED"}
                                  title={
                                    user.status === "ACTIVE"
                                      ? "Set inactive"
                                      : "Set active"
                                  }
                                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() => handleLockUser(user)}
                                  disabled={isUpdating || user.status === "LOCKED"}
                                  title="Lock user"
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

            <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {fromIndex} to {toIndex} of {users.length} customers
              </div>

              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-2 rounded-lg border text-gray-600 disabled:opacity-40"
                >
                  {"<"}
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-[#0B3B66] text-white"
                        : "border text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-3 py-2 rounded-lg border text-gray-600 disabled:opacity-40"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

