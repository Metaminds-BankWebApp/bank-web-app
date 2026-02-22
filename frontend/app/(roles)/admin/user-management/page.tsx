"use client";

import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AdminHeader } from "@/src/components/ui/adminheader";
import { AuthGuard } from "@/src/components/auth";
import { Pencil, Trash2, Search } from "lucide-react";

type StatusType = "Active" | "Inactive";
type CustomerType = "Bank" | "Public";

type UserData = {
  id: string;
  name: string;
  email: string;
  contact: string;
  joined: string;
  status: StatusType;
  avatar: string;
  customerType: CustomerType;
};

const userData: UserData[] = [
  {
    id: "#PC-9281",
    name: "Alexander Smith",
    email: "alex.smith@primecore.com",
    contact: "+1 (555) 123-4567",
    joined: "12 Oct 2023",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    customerType: "Bank",
  },
  {
    id: "#PC-7312",
    name: "Sarah Johnson",
    email: "s.johnson@primecore.com",
    contact: "+1 (555) 987-6543",
    joined: "05 Nov 2023",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    customerType: "Bank",
  },
  {
    id: "#PC-1044",
    name: "Michael Chen",
    email: "m.chen@primecore.com",
    contact: "+1 (555) 456-7890",
    joined: "18 Dec 2023",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    customerType: "Public",
  },
  {
    id: "#PC-5529",
    name: "Emily Davis",
    email: "e.davis@primecore.com",
    contact: "+1 (555) 234-5678",
    joined: "02 Jan 2024",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    customerType: "Bank",
  },
  {
    id: "#PC-8821",
    name: "Robert Wilson",
    email: "r.wilson@primecore.com",
    contact: "+1 (555) 876-5432",
    joined: "15 Jan 2024",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    customerType: "Public",
  },

  {
    id: "#PC-1054",
    name: "Michael Chen",
    email: "m.chen@primecore.com",
    contact: "+1 (555) 456-7890",
    joined: "18 Dec 2023",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    customerType: "Public",
  },
];

export default function UserManagementPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = userData.filter((u) => {
    if (filter === "All") return true;
    if (filter === "Bank") return u.customerType === "Bank";
    if (filter === "Public") return u.customerType === "Public";
    return true;
  }).filter((u) =>
    u.id.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Reset to first page on filter/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="ADMIN" className="hidden lg:block" />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-6">
            <AdminHeader title="User Management" />
          </div>
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">Filter by:</span>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === "All" ? "bg-[#0B3B66] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setFilter("All")}
                >
                  All Customers
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === "Bank" ? "bg-[#0B3B66] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setFilter("Bank")}
                >
                  Bank Customers
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === "Public" ? "bg-[#0B3B66] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setFilter("Public")}
                >
                  Public Customers
                </button>
              </div>
            </div>
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search Branches by ID, Joined date or Email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-transparent border-none text-sm focus:outline-none"
              />
            </div>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {["ID", "Name", "Email", "Contact Number", "Joined Date", "Customer Type", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-6 py-4 text-left font-semibold text-gray-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{u.id}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                          <span className="font-semibold text-gray-900">{u.name}</span>
                        </td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">{u.contact}</td>
                        <td className="px-6 py-4">{u.joined}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.customerType === "Bank" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {u.customerType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                              <Pencil size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition">
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
          {/* PAGINATION BAR (Like Your Screenshot) */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} customers
              </div>

              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-2 rounded-lg border text-gray-600 disabled:opacity-40"
                >
                  {"<"}
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? "bg-[#0B3B66] text-white"
                        : "border text-gray-700"
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
