"use client";

import React, { useState, useMemo } from "react";
import { Sidebar } from "@/src/components/layout";
import { AdminHeader } from "@/src/components/ui/adminheader";
import { AuthGuard } from "@/src/components/auth";
import { Search } from "lucide-react";

type LogStatus = "Success" | "Failure" | "Policy Change";

type AuditLog = {
  id: number;
  date: string;
  time: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  status: LogStatus;
};

const auditData: AuditLog[] = [
  {
    id: 1,
    date: "Oct 24, 2023",
    time: "14:32:01",
    user: "Alex Morgan",
    role: "Admin",
    action: "Update Permissions",
    target: "Marketing API Key",
    ip: "192.168.1.124",
    status: "Policy Change",
  },
  {
    id: 2,
    date: "Oct 24, 2023",
    time: "13:15:44",
    user: "James Chen",
    role: "Bank Customer",
    action: "User Login",
    target: "-",
    ip: "45.22.108.9",
    status: "Success",
  },
  {
    id: 3,
    date: "Oct 24, 2023",
    time: "12:10:29",
    user: "Rita Walsh",
    role: "Customer",
    action: "Download Report",
    target: "Q3 Financials.pdf",
    ip: "102.43.12.77",
    status: "Success",
  },
  {
    id: 4,
    date: "Oct 23, 2023",
    time: "22:45:10",
    user: "Alex Morgan",
    role: "Admin",
    action: "Update Policy",
    target: "Two-Factor Auth",
    ip: "192.168.1.124",
    status: "Policy Change",
  },
  {
    id: 5,
    date: "Oct 23, 2023",
    time: "18:12:05",
    user: "Tom Hardy",
    role: "Public Customer",
    action: "User Login",
    target: "-",
    ip: "77.102.44.11",
    status: "Failure",
  },
  {
    id: 6,
    date: "Oct 23, 2023",
    time: "15:55:12",
    user: "Emma Lee",
    role: "Admin",
    action: "System Backup",
    target: "Core DB v12",
    ip: "12.22.4.99",
    status: "Success",
  },
];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 6;

  const filteredLogs = useMemo(() => {
    return auditData
      .filter((log) =>
        roleFilter === "All" ? true : log.role === roleFilter
      )
      .filter((log) =>
        actionFilter === "All" ? true : log.action === actionFilter
      )
      .filter((log) =>
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.target.toLowerCase().includes(search.toLowerCase())
      );
  }, [search, roleFilter, actionFilter]);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const statusStyle = (status: LogStatus) => {
    if (status === "Success")
      return "bg-green-100 text-green-700";
    if (status === "Failure")
      return "bg-red-100 text-red-600";
    return "bg-blue-100 text-blue-600";
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="ADMIN" className="hidden lg:block" />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-4 pb-6">
            <AdminHeader title="Audit Logs" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-6">

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Search */}
              <div className="col-span-1 lg:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Search Logs
                </label>
                <div className="mt-2 flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search by user, action, target..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent w-full text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="mt-2 w-full bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <option>All</option>
                  <option>Admin</option>
                  <option>Bank Customer</option>
                  <option>Customer</option>
                  <option>Public Customer</option>
                </select>
              </div>

              {/* Action Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Action Type
                </label>
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="mt-2 w-full bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <option>All</option>
                  <option>User Login</option>
                  <option>Update Policy</option>
                  <option>System Backup</option>
                  <option>Download Report</option>
                </select>
              </div>
            </div>

            {/* TABLE */}
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
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-left font-semibold text-gray-600"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>{log.date}</div>
                          <div className="text-xs text-gray-400">{log.time}</div>
                        </td>
                        <td className="px-6 py-4">{log.user}</td>
                        <td className="px-6 py-4">{log.role}</td>
                        <td className="px-6 py-4">{log.action}</td>
                        <td className="px-6 py-4 text-blue-600 underline cursor-pointer">
                          {log.target}
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-500">
                          {log.ip}
                        </td>
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
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * logsPerPage + 1} to{" "}
                  {Math.min(currentPage * logsPerPage, filteredLogs.length)} of{" "}
                  {filteredLogs.length} logs
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-3 py-1 border rounded-lg disabled:opacity-40"
                  >
                    {"<"}
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === i + 1
                          ? "bg-[#0B3B66] text-white"
                          : "border"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
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