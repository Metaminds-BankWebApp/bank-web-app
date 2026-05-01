"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { ConfirmationModal, useToast } from "@/src/components/ui";
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUserDetails,
  updateAdminUserStatus,
} from "@/src/api/admin/user-management.service";
import { ApiError } from "@/src/types/api-error";
import type {
  AdminCustomerType,
  AdminUserManagementUserResponse,
  AdminUserStatus,
} from "@/src/types/dto/admin-user-management.dto";

const usersPerPage = 5;

type InlineIconProps = {
  symbol: string;
  className?: string;
};

function InlineIcon({ symbol, className = "" }: InlineIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex select-none items-center justify-center leading-none ${className}`.trim()}
    >
      {symbol}
    </span>
  );
}

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
    return String(user.userId);
  }

  return value.startsWith("#") ? value.slice(1) : value;
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

type UserEditForm = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  status: AdminUserStatus;
};

type UserEditErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "contactNumber", string>
>;

type UserSearchField =
  | "ALL"
  | "ID"
  | "NAME"
  | "EMAIL"
  | "CONTACT"
  | "JOINED_DATE"
  | "CUSTOMER_TYPE"
  | "STATUS";

const userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const userContactRegex = /^\+?[0-9()\-.\s]{7,20}$/;
const userSearchOptions: Array<{ value: UserSearchField; label: string }> = [
  { value: "ALL", label: "All Fields" },
  { value: "ID", label: "ID" },
  { value: "NAME", label: "Name" },
  { value: "EMAIL", label: "Email" },
  { value: "CONTACT", label: "Contact Number" },
  { value: "JOINED_DATE", label: "Joined Date" },
  { value: "CUSTOMER_TYPE", label: "Customer Type" },
  { value: "STATUS", label: "Status" },
];
const userStatusKeywords = new Set(["active", "inactive", "locked"]);

function matchesUserStatus(statusLabel: string, normalizedQuery: string): boolean {
  const normalizedStatus = statusLabel.toLowerCase();
  if (userStatusKeywords.has(normalizedQuery)) {
    return normalizedStatus === normalizedQuery;
  }
  return normalizedStatus.includes(normalizedQuery);
}

export default function UserManagementPage() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<AdminCustomerType>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<UserSearchField>("ALL");
  const [users, setUsers] = useState<AdminUserManagementUserResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] =
    useState<AdminUserManagementUserResponse | null>(null);
  const [userToDelete, setUserToDelete] =
    useState<AdminUserManagementUserResponse | null>(null);
  const [editForm, setEditForm] = useState<UserEditForm>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    status: "ACTIVE",
  });
  const [editErrors, setEditErrors] = useState<UserEditErrors>({});
  const [isSavingEdit, setIsSavingEdit] = useState(false);
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
        showToast({
          type: "error",
          title: "Load failed",
          description: message,
        });
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
  }, [filter, showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchField, searchQuery]);

  const filteredUsers = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) {
      return users;
    }

    return users.filter((user) => {
      const id = resolveCustomerId(user);
      const name = user.fullName || "-";
      const email = user.email || "-";
      const contact = user.contactNumber || "-";
      const joinedDate = formatJoinedDate(user.joinedDate);
      const customerTypeLabel = getCustomerTypeLabel(user.customerType);
      const statusLabel = getStatusLabel(user.status);

      const matches = (value: string | number) =>
        String(value).toLowerCase().includes(normalized);

      if (searchField === "ALL") {
        return (
          matches(id) ||
          matches(name) ||
          matches(email) ||
          matches(contact) ||
          matches(joinedDate) ||
          matches(customerTypeLabel) ||
          matchesUserStatus(statusLabel, normalized)
        );
      }
      if (searchField === "ID") {
        return matches(id);
      }
      if (searchField === "NAME") {
        return matches(name);
      }
      if (searchField === "EMAIL") {
        return matches(email);
      }
      if (searchField === "CONTACT") {
        return matches(contact);
      }
      if (searchField === "JOINED_DATE") {
        return matches(joinedDate);
      }
      if (searchField === "CUSTOMER_TYPE") {
        return matches(customerTypeLabel);
      }
      return matchesUserStatus(statusLabel, normalized);
    });
  }, [searchField, searchQuery, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(start, start + usersPerPage);
  }, [currentPage, filteredUsers]);

  const applyUserUpdate = (updated: AdminUserManagementUserResponse) => {
    setUsers((prev) =>
      prev.map((entry) => (entry.userId === updated.userId ? updated : entry))
    );
  };

  const openEditModal = (user: AdminUserManagementUserResponse) => {
    const split = splitName(user.fullName ?? "");
    setEditingUser(user);
    setEditForm({
      firstName: split.firstName,
      lastName: split.lastName,
      email: user.email ?? "",
      contactNumber: user.contactNumber ?? "",
      status: user.status,
    });
    setEditErrors({});
  };

  const closeEditModal = () => {
    if (isSavingEdit) {
      return;
    }
    setEditingUser(null);
    setEditErrors({});
  };

  const validateUserEditForm = (formData: UserEditForm): UserEditErrors => {
    const errors: UserEditErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!userEmailRegex.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
    } else if (!userContactRegex.test(formData.contactNumber.trim())) {
      errors.contactNumber = "Contact number format is invalid.";
    }

    return errors;
  };

  const handleSaveEditedUser = async () => {
    if (!editingUser) {
      return;
    }

    const normalizedForm: UserEditForm = {
      firstName: editForm.firstName.trim(),
      lastName: editForm.lastName.trim(),
      email: editForm.email.trim().toLowerCase(),
      contactNumber: editForm.contactNumber.trim(),
      status: editForm.status,
    };

    const nextErrors = validateUserEditForm(normalizedForm);
    setEditErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSavingEdit(true);
    try {
      let updated = await updateAdminUserDetails(editingUser.userId, {
        firstName: normalizedForm.firstName,
        lastName: normalizedForm.lastName,
        email: normalizedForm.email,
        contactNumber: normalizedForm.contactNumber,
      });
      if ((updated.status || "").toUpperCase() !== normalizedForm.status) {
        updated = await updateAdminUserStatus(editingUser.userId, normalizedForm.status);
      }
      applyUserUpdate(updated);
      setEditingUser(null);
      showToast({
        type: "success",
        title: "User updated",
        description: `${updated.fullName} was updated successfully.`,
      });
    } catch (unknownError) {
      const message =
        unknownError instanceof ApiError
          ? unknownError.message
          : "Failed to update user details.";
      showToast({
        type: "error",
        title: "Update failed",
        description: message,
      });
    } finally {
      setIsSavingEdit(false);
    }
  };

  const openDeleteUserModal = (user: AdminUserManagementUserResponse) => {
    setUserToDelete(user);
  };

  const closeDeleteUserModal = () => {
    if (updatingUserId !== null) {
      return;
    }
    setUserToDelete(null);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) {
      return;
    }
    const user = userToDelete;

    setUpdatingUserId(user.userId);

    try {
      const deleted = await deleteAdminUser(user.userId);
      setUsers((prev) => prev.filter((entry) => entry.userId !== user.userId));
      showToast({
        type: "success",
        title: "User deleted",
        description: `${deleted.fullName} was permanently deleted.`,
      });
    } catch (unknownError) {
      const message =
        unknownError instanceof ApiError
          ? unknownError.message
          : "Failed to delete user permanently.";
      showToast({
        type: "error",
        title: "Delete failed",
        description: message,
      });
    } finally {
      setUpdatingUserId(null);
      setUserToDelete(null);
    }
  };

  const fromIndex =
    filteredUsers.length === 0 ? 0 : (currentPage - 1) * usersPerPage + 1;
  const toIndex =
    filteredUsers.length === 0
      ? 0
      : Math.min(currentPage * usersPerPage, filteredUsers.length);

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
              title="Customer Management"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Customer Type:</span>
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  filter === "ALL"
                    ? "bg-[#0B3B66] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFilter("ALL")}
              >
                All Customers
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  filter === "BANK"
                    ? "bg-[#0B3B66] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFilter("BANK")}
              >
                Bank Customers
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  filter === "PUBLIC"
                    ? "bg-[#0B3B66] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFilter("PUBLIC")}
              >
                Public Customers
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-1 flex-col sm:flex-row gap-3">
                <select
                  value={searchField}
                  onChange={(event) =>
                    setSearchField(event.target.value as UserSearchField)
                  }
                  className="h-12 rounded-full border border-gray-300 bg-white px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3B66]"
                >
                  {userSearchOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      Search by {option.label}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <InlineIcon
                    symbol="⌕"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    className="h-12 w-full pl-12 pr-4 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B66]"
                  />
                </div>
              </div>
              {isRefreshing ? (
                <span className="self-center text-xs text-gray-400">Refreshing...</span>
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
                                  onClick={() => openEditModal(user)}
                                  disabled={isUpdating}
                                  title="Edit user details"
                                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <InlineIcon symbol="✎" className="text-sm" />
                                </button>
                                <button
                                  onClick={() => openDeleteUserModal(user)}
                                  disabled={isUpdating}
                                  title="Delete user permanently"
                                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <InlineIcon symbol="🗑" className="text-sm" />
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
                Showing {fromIndex} to {toIndex} of {filteredUsers.length} customers
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

        {editingUser ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSavingEdit}
                title="Close"
                className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <InlineIcon symbol="✕" className="text-sm" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900">Edit User</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update user details and save your changes.
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
                        setEditErrors((prev) => ({
                          ...prev,
                          contactNumber: undefined,
                        }));
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
                  <label className="text-xs font-semibold uppercase text-gray-600">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(event) => {
                      setEditForm((prev) => ({
                        ...prev,
                        status: event.target.value as AdminUserStatus,
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
                  onClick={handleSaveEditedUser}
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
          open={Boolean(userToDelete)}
          title="Delete User"
          message={`Are you sure you want to permanently delete "${userToDelete?.fullName ?? "this user"}"? This action cannot be undone.`}
          confirmLabel="Delete User"
          isProcessing={updatingUserId === userToDelete?.userId}
          onCancel={closeDeleteUserModal}
          onConfirm={handleDeleteUser}
        />
      </div>
    </AuthGuard>
  );
}
