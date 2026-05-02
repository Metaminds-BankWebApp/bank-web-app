"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { Search } from "lucide-react";
import { useToast } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import {
  getAdminAuditLogFilters,
  getAdminAuditLogs,
} from "@/src/api/admin/audit-log.service";
import type {
  AdminAuditLogRecordResponse,
  AdminAuditTone,
} from "@/src/types/dto/admin-audit-log.dto";

type LogStatus = "Success" | "Failure" | "Policy Change";

type AuditLogRow = {
  id: number;
  date: string;
  time: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  status: LogStatus;
  details: string | null;
};

const ALL_FILTER_OPTION = "All";

function formatDateTimeParts(value: string | null): { date: string; time: string } {
  if (!value) {
    return { date: "-", time: "-" };
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return { date: value, time: "-" };
  }

  return {
    date: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsed),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(parsed),
  };
}

function mapToneToStatus(tone: AdminAuditTone): LogStatus {
  if (tone === "SUCCESS") {
    return "Success";
  }
  if (tone === "ERROR") {
    return "Failure";
  }
  return "Policy Change";
}

function toAuditLogRow(record: AdminAuditLogRecordResponse): AuditLogRow {
  const { date, time } = formatDateTimeParts(record.createdAt);
  const target =
    record.targetId?.trim() ||
    record.targetType?.trim() ||
    "-";

  return {
    id: record.actionId,
    date,
    time,
    user: record.actorName?.trim() || "System",
    role: record.actorRole?.trim() || "SYSTEM",
    action: record.title?.trim() || record.actionType,
    target,
    ip: record.ipAddress?.trim() || "-",
    status: mapToneToStatus(record.tone),
    details: record.details?.trim() || null,
  };
}

export default function AuditLogsPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(ALL_FILTER_OPTION);
  const [actionFilter, setActionFilter] = useState(ALL_FILTER_OPTION);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [logs, setLogs] = useState<AuditLogRow[]>([]);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [actionOptions, setActionOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const logsPerPage = 6;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    let mounted = true;

    const loadFilters = async () => {
      try {
        const data = await getAdminAuditLogFilters();
        if (!mounted) {
          return;
        }
        setRoleOptions(data.actorRoles ?? []);
        setActionOptions(data.actionTypes ?? []);
      } catch (error) {
        if (!mounted) {
          return;
        }
        const message =
          error instanceof ApiError
            ? error.message
            : "Failed to load audit log filter options.";
        showToast({
          type: "error",
          title: "Filter load failed",
          description: message,
        });
      }
    };

    void loadFilters();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, roleFilter, actionFilter]);

  useEffect(() => {
    let mounted = true;

    const loadAuditLogs = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminAuditLogs({
          page: currentPage,
          size: logsPerPage,
          query: debouncedSearch || undefined,
          actorRole: roleFilter === ALL_FILTER_OPTION ? undefined : roleFilter,
          actionType: actionFilter === ALL_FILTER_OPTION ? undefined : actionFilter,
        });

        if (!mounted) {
          return;
        }

        setLogs((data.records ?? []).map(toAuditLogRow));
        setTotalElements(data.totalElements ?? 0);
        setTotalPages(data.totalPages ?? 0);
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof ApiError
            ? error.message
            : "Failed to load audit logs.";
        setLogs([]);
        setTotalElements(0);
        setTotalPages(0);
        showToast({
          type: "error",
          title: "Audit logs load failed",
          description: message,
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAuditLogs();

    return () => {
      mounted = false;
    };
  }, [actionFilter, currentPage, debouncedSearch, roleFilter, showToast]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const showingFrom = useMemo(() => {
    if (totalElements === 0) {
      return 0;
    }
    return (currentPage - 1) * logsPerPage + 1;
  }, [currentPage, logsPerPage, totalElements]);

  const showingTo = useMemo(() => {
    if (totalElements === 0) {
      return 0;
    }
    return Math.min(currentPage * logsPerPage, totalElements);
  }, [currentPage, logsPerPage, totalElements]);

  const statusStyle = (status: LogStatus) => {
    if (status === "Success") {
      return "bg-green-100 text-green-700";
    }
    if (status === "Failure") {
      return "bg-red-100 text-red-600";
    }
    return "bg-blue-100 text-blue-600";
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
              title="Audit Logs"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="col-span-1 lg:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Search Logs
                </label>
                <div className="mt-2 flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search by user, action, target, details, or IP..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="bg-transparent w-full text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  className="mt-2 w-full bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={ALL_FILTER_OPTION}>{ALL_FILTER_OPTION}</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Action Type
                </label>
                <select
                  value={actionFilter}
                  onChange={(event) => setActionFilter(event.target.value)}
                  className="mt-2 w-full bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={ALL_FILTER_OPTION}>{ALL_FILTER_OPTION}</option>
                  {actionOptions.map((actionType) => (
                    <option key={actionType} value={actionType}>
                      {actionType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "Date & Time",
                        "User",
                        "Role",
                        "Action",
                        "Target",
                        "IP Address",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left font-semibold text-gray-600"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {isLoading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          Loading audit logs...
                        </td>
                      </tr>
                    ) : logs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          No audit logs found for selected filters.
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>{log.date}</div>
                            <div className="text-xs text-gray-400">{log.time}</div>
                          </td>
                          <td className="px-6 py-4">{log.user}</td>
                          <td className="px-6 py-4">{log.role}</td>
                          <td className="px-6 py-4">
                            <div>{log.action}</div>
                            {log.details ? (
                              <div className="text-xs text-gray-500 mt-1">{log.details}</div>
                            ) : null}
                          </td>
                          <td className="px-6 py-4 text-blue-600">{log.target}</td>
                          <td className="px-6 py-4 font-mono text-gray-500">{log.ip}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                                log.status
                              )}`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4">
                <div className="text-sm text-gray-500">
                  Showing {showingFrom} to {showingTo} of {totalElements} logs
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <button
                    disabled={currentPage === 1 || totalPages === 0}
                    onClick={() => setCurrentPage((previous) => Math.max(previous - 1, 1))}
                    className="px-3 py-1 border rounded-lg disabled:opacity-40"
                  >
                    {"<"}
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === page ? "bg-[#0B3B66] text-white" : "border"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    disabled={totalPages === 0 || currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((previous) =>
                        Math.min(previous + 1, Math.max(totalPages, 1))
                      )
                    }
                    className="px-3 py-1 border rounded-lg disabled:opacity-40"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
