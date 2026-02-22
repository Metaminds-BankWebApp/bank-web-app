"use client";

//import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AdminHeader } from "@/src/components/ui/adminheader";
import { AuthGuard } from "@/src/components/auth";
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";

// ==================== TYPES ====================
type StatusType = "Active" | "Maintenance";

type BranchData = {
  id: string;
  name: string;
  address: string;
  contact: string;
  officers: number;
  customers: number;
  status: StatusType;
};

// ==================== COMPONENTS ====================
function SummaryCard({
  label,
  value,
  variant = "light",
}: {
  label: string;
  value: string | number;
  variant?: "dark" | "medium" | "light";
}) {
  const classes =
    variant === "dark"
      ? "bg-[#0B3B66] text-white"
      : variant === "medium"
      ? "bg-[#1B5E9E] text-white"
      : "bg-white text-gray-800 border border-blue-200";

  return (
    <div
      className={`rounded-xl shadow-sm p-6 flex flex-col justify-between ${classes}`}
    >
      <span className="text-xs font-semibold opacity-80 tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold mt-3">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );
}

function OfficerAvatars({ count }: { count: number }) {
  const display = Math.min(3, count);
  const extra = count > 3 ? count - 3 : 0;

  

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {Array.from({ length: display }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      {extra > 0 && (
        <span className="ml-2 text-xs text-gray-500 font-medium">
          +{extra}
        </span>
      )}
    </div>
  );
}

// ==================== MOCK DATA ====================
const branchData: BranchData[] = [
  {
    id: "BR-001",
    name: "Ratnapura Branch",
    address: "123 Main Street, New York, NY",
    contact: "(555) 123-4567",
    officers: 12,
    customers: 2856,
    status: "Active",
  },
  {
    id: "BR-002",
    name: "Colombo Branch",
    address: "456 Park Avenue, New York, NY",
    contact: "(555) 234-5678",
    officers: 8,
    customers: 1945,
    status: "Active",
  },
  {
    id: "BR-003",
    name: "Kurunegala Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Active",
  },
   {
    id: "BR-004",
    name: "Galle Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Maintenance",
  }, {
    id: "BR-005",
    name: "Anuradapura Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Active",
  }, {
    id: "BR-006",
    name: "Mathara Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Active",
  }, 
  {
    id: "BR-007",
    name: "Kegalle Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Maintenance",
  }, 
  {
    id: "BR-008",
    name: "Ampara Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Active",
  }, 
  {
    id: "BR-009",
    name: "Negambo Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Maintenance",
  },
  {
    id: "BR-010",
    name: "Badulla Branch",
    address: "789 Fifth Avenue, New York, NY",
    contact: "(555) 345-6789",
    officers: 10,
    customers: 2245,
    status: "Active",
  },
];

// ==================== PAGE ====================
export default function Page() {
const [currentPage, setCurrentPage] = useState(1);
const branchesPerPage = 5; 

  const [searchQuery, setSearchQuery] = useState("");

  const filteredBranches = branchData
  .filter(
    (b) =>
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => a.id.localeCompare(b.id)); // sort by ID

const totalPages = Math.ceil(filteredBranches.length / branchesPerPage);

const paginatedBranches = filteredBranches.slice(
  (currentPage - 1) * branchesPerPage,
  currentPage * branchesPerPage
);

useEffect(() => {
  setCurrentPage(1);
}, [searchQuery]);

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar role="ADMIN" className="hidden lg:block" />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-6">
            <AdminHeader title="Branch Management" />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-6">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard label="TOTAL BRANCHES" value={48} variant="dark" />
              <SummaryCard label="ACTIVE BRANCHES" value={48} variant="medium" />
              <SummaryCard label="NO OF OFFICERS" value={546} />
              <SummaryCard label="TOTAL CUSTOMERS" value="124,596" />
            </div>

            {/* Search Section */}
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

            {/* Table */}
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
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-left font-semibold text-gray-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                   {paginatedBranches.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{b.id}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <span>🏢</span> {b.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{b.address}</td>
                        <td className="px-6 py-4">{b.contact}</td>
                        <td className="px-6 py-4">
                          <OfficerAvatars count={b.officers} />
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {b.customers.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    <button
      onClick={() => console.log("Edit:", b.id)}
      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
    >
      <Pencil size={16} />
    </button>

    <button
      onClick={() => console.log("Delete:", b.id)}
      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
    >
      <Trash2 size={16} />
    </button>
  </div>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
  
  <div className="text-sm text-gray-600">
    Showing {(currentPage - 1) * branchesPerPage + 1} to{" "}
    {Math.min(currentPage * branchesPerPage, filteredBranches.length)} of{" "}
    {filteredBranches.length} branches
  </div>

  <div className="flex items-center gap-2">

    {/* Previous */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-40"
    >
      &lt;
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
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

    {/* Next */}
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
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

