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
    <div>
      
    </div>
  )
}
