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
    <div>
      
    </div>
  )
}
