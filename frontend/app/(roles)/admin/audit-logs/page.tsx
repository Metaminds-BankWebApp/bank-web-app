"use client";
/**
 * Admin audit-log page with filters, concise action rows, and paginated results.
 */

import React, { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { Search } from "lucide-react";
import { DataTablePagination, useToast } from "@/src/components/ui";
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
  status: LogStatus;
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

const TARGET_LABELS: Record<string, string> = {
	BANK_OFFICER: "Bank officer",
	BENEFICIARY: "Beneficiary",
	BRANCH: "Branch",
	CUSTOMER: "Customer",
	EVALUATION: "Credit evaluation",
	FINANCIAL_APPLICATION: "Financial application",
	FINANCIAL_RECORD: "Financial information",
	LOAN_POLICY: "Loan policy",
	PROFILE: "Profile",
	SUPPORT_REQUEST: "Support request",
	TRANSACTION: "Transfer",
	USER: "User",
};

function toTitleCase(value: string): string {
	return value
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean)
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}

function toTargetLabel(value: string | null | undefined): string {
	const normalizedValue = value?.trim().toUpperCase() ?? "";
	if (!normalizedValue) {
		return "";
	}

	return TARGET_LABELS[normalizedValue] ?? toTitleCase(normalizedValue.replace(/[_-]+/g, " "));
}

function withFailureState(successLabel: string, failureLabel: string, actionType: string): string {
	return actionType.endsWith("_FAILED") ? failureLabel : successLabel;
}

function toActionLabel(actionType: string | null | undefined, fallbackTitle?: string | null): string {
	const normalizedActionType = actionType?.trim().toUpperCase() ?? "";
	if (!normalizedActionType) {
		return fallbackTitle?.trim() || "Action recorded";
	}

	const baseActionType = normalizedActionType.replace(/_FAILED$/, "");
	const directActions: Record<string, [string, string]> = {
		LOGIN: ["Signed in", "Sign-in failed"],
		LOGOUT: ["Signed out", "Sign-out failed"],
		INITIATE_TRANSACTION: ["Initiated transfer", "Transfer initiation failed"],
		CONFIRM_TRANSACTION: ["Confirmed transfer", "Transfer confirmation failed"],
		SUBMIT_FINANCIAL_APPLICATION: [
			"Submitted financial application",
			"Financial application submission failed",
		],
	};
	const directAction = directActions[baseActionType];
	if (directAction) {
		return withFailureState(directAction[0], directAction[1], normalizedActionType);
	}

	const prefixedAction = baseActionType.match(/^(POST|PUT|PATCH|DELETE)_(.+)$/);
	const semanticAction = baseActionType.match(/^(CREATE|UPDATE|DELETE)_(.+)$/);
	const completedAction = baseActionType.match(/^(.+)_(CREATED|UPDATED|DELETED)$/);
	const draftCreatedAction = baseActionType.match(/^(.+)_DRAFT_CREATED$/);
	const statusChangedAction = baseActionType.match(/^(.+)_STATUS_CHANGED$/);

	let verb: "create" | "update" | "delete" | null = null;
	let targetType = "";
	if (prefixedAction) {
		verb = prefixedAction[1] === "POST" ? "create" : prefixedAction[1] === "DELETE" ? "delete" : "update";
		targetType = prefixedAction[2];
	} else if (semanticAction) {
		verb = semanticAction[1].toLowerCase() as "create" | "update" | "delete";
		targetType = semanticAction[2];
	} else if (completedAction) {
		verb = completedAction[2].slice(0, -1).toLowerCase() as "create" | "update" | "delete";
		targetType = completedAction[1];
	}

	if (verb) {
		const targetLabel = toTargetLabel(targetType) || "record";
		if (targetType === "PROFILE" && verb === "create") {
			return withFailureState("Updated profile", "Failed to update profile", normalizedActionType);
		}
		const labels = {
			create: [`Created ${targetLabel}`, `Failed to create ${targetLabel}`],
			update: [`Updated ${targetLabel}`, `Failed to update ${targetLabel}`],
			delete: [`Deleted ${targetLabel}`, `Failed to delete ${targetLabel}`],
		};
		return withFailureState(labels[verb][0], labels[verb][1], normalizedActionType);
	}

	if (draftCreatedAction) {
		const targetLabel = toTargetLabel(draftCreatedAction[1]) || "record";
		return withFailureState(`Saved ${targetLabel} draft`, `Failed to save ${targetLabel} draft`, normalizedActionType);
	}

	if (statusChangedAction) {
		const targetLabel = toTargetLabel(statusChangedAction[1]) || "record";
		return withFailureState(`Changed ${targetLabel} status`, `Failed to change ${targetLabel} status`, normalizedActionType);
	}

	return fallbackTitle?.trim() || toTitleCase(baseActionType.replace(/[_-]+/g, " "));
}

function toBriefAction(record: AdminAuditLogRecordResponse): string {
	return toActionLabel(record.actionType, record.title);
}

function toTarget(record: AdminAuditLogRecordResponse): string {
	const targetLabel = toTargetLabel(record.targetType);
	const targetId = record.targetId?.trim() ?? "";
	if (targetLabel && targetId) {
		return `${targetLabel} #${targetId}`;
	}
	return targetLabel || (targetId ? `Record #${targetId}` : "-");
}

function toAuditLogRow(record: AdminAuditLogRecordResponse): AuditLogRow {
  const { date, time } = formatDateTimeParts(record.createdAt);
	return {
    id: record.actionId,
    date,
    time,
    user: record.actorName?.trim() || "System",
    role: record.actorRole?.trim() || "SYSTEM",
    action: toBriefAction(record),
		target: toTarget(record),
    status: mapToneToStatus(record.tone),
  };
}

// Main component for browsing, filtering, and paging audit logs.
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

    // Loads data required by this view and updates local state.
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

    // Loads data required by this view and updates local state.
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

  // Builds derived UI values from API data to keep rendering simple.
  const showingFrom = useMemo(() => {
    if (totalElements === 0) {
      return 0;
    }
    return (currentPage - 1) * logsPerPage + 1;
  }, [currentPage, logsPerPage, totalElements]);

  // Builds derived UI values from API data to keep rendering simple.
  const showingTo = useMemo(() => {
    if (totalElements === 0) {
      return 0;
    }
    return Math.min(currentPage * logsPerPage, totalElements);
  }, [currentPage, logsPerPage, totalElements]);

  const statusStyle = (status: LogStatus) => {
    if (status === "Success") {
      return "border border-emerald-100 bg-emerald-50 text-emerald-600";
    }
    if (status === "Failure") {
      return "border border-red-100 bg-red-50 text-red-600";
    }
    return "border border-blue-100 bg-blue-50 text-blue-600";
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
            <div className="primecore-table-toolbar flex-col items-stretch lg:flex-row">
              <div className="col-span-1 lg:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Search Logs
                </label>
                <div className="mt-2 flex items-center rounded-lg bg-slate-50 px-3 py-2">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search by date, status, user, action, target, or details..."
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
                  className="mt-2 w-full rounded-lg bg-slate-50 px-3 py-2 text-sm"
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
                  className="mt-2 w-full rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  <option value={ALL_FILTER_OPTION}>{ALL_FILTER_OPTION}</option>
						{actionOptions.map((actionType) => (
							<option key={actionType} value={actionType}>
								{toActionLabel(actionType)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="primecore-table-shell">
              <div className="overflow-x-auto">
                <table className="primecore-data-table w-full min-w-[1000px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "Date & Time",
                        "User",
                        "Role",
                        "Action",
                        "Target",
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
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          Loading audit logs...
                        </td>
                      </tr>
                    ) : logs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
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
                          </td>
                          <td className="px-6 py-4 text-blue-600">{log.target}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex min-w-[7.75rem] justify-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyle(
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

              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4">
                <div className="text-sm text-gray-500">
                  Showing {showingFrom} to {showingTo} of {totalElements} logs
                </div>

                <DataTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-3 sm:mt-0" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
