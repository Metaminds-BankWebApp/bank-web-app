"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  Bell, 
  Mail, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal 
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Checkbox } from "@/src/components/ui/checkbox";

type Customer = {
  id: string;
  name: string;
  nic: string;
  email: string;
  phone: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  creditScore: number;
  status: "ACTIVE" | "INACTIVE";
  lastUpdated: string;
};

const customers: Customer[] = [
  {
    id: "#C-48292",
    name: "Amila Silva",
    nic: "199204502844",
    email: "amila.s@email.com",
    phone: "+94 77 123 4567",
    riskLevel: "LOW",
    creditScore: 742,
    status: "ACTIVE",
    lastUpdated: "Oct 24, 2023",
  },
  {
    id: "#C-48301",
    name: "Kasun Perera",
    nic: "198512304955",
    email: "kasun.p@email.com",
    phone: "+94 71 987 6543",
    riskLevel: "MEDIUM",
    creditScore: 615,
    status: "ACTIVE",
    lastUpdated: "Oct 22, 2023",
  },
  {
    id: "#C-48315",
    name: "Ruwan Fernando",
    nic: "197800293848",
    email: "ruwan.f@email.com",
    phone: "+94 72 334 5566",
    riskLevel: "HIGH",
    creditScore: 490,
    status: "INACTIVE",
    lastUpdated: "Oct 20, 2023",
  },
  {
    id: "#C-48322",
    name: "Malani Jayasinghe",
    nic: "199555678122",
    email: "m.jaya@email.com",
    phone: "+94 77 888 2233",
    riskLevel: "LOW",
    creditScore: 810,
    status: "ACTIVE",
    lastUpdated: "Oct 19, 2023",
  },
  {
    id: "#C-48322",
    name: "Malani Jayasinghe",
    nic: "199555678122",
    email: "m.jaya@email.com",
    phone: "+94 77 888 2233",
    riskLevel: "LOW",
    creditScore: 810,
    status: "ACTIVE",
    lastUpdated: "Oct 19, 2023",
  },
   {
    id: "#C-48322",
    name: "Malani Jayasinghe",
    nic: "199555678122",
    email: "m.jaya@email.com",
    phone: "+94 77 888 2233",
    riskLevel: "LOW",
    creditScore: 810,
    status: "ACTIVE",
    lastUpdated: "Oct 19, 2023",
  },
];

export default function AllCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
          {/* Header */}
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] p-4 text-white shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">All Customers</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button className="relative text-white/80 hover:text-white">
                  <Mail size={20} />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">2</span>
                </button>
                <button className="relative text-white/80 hover:text-white">
                  <Bell size={20} />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">8</span>
                </button>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
                  <img src="https://ui-avatars.com/api/?name=Kamal+E&background=random" alt="User" className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0d3b66] bg-green-500"></div>
                </div>
                <div className="hidden text-sm md:block">
                  <p className="font-semibold leading-none">Kamal Edirisinghe</p>
                  <p className="text-white/60">User</p>
                </div>
              </div>
            </div>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
             {/* Toolbar */}
             <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between gap-4">
                <div className="relative max-w-sm flex-1">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                   <Input 
                      placeholder="Search by ID, name, NIC..." 
                      className="pl-10 bg-slate-50 border-slate-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                
                <div className="flex items-center gap-3">
                   <Button variant="outline" className="gap-2 text-slate-600 border-slate-200">
                      <Filter size={16} /> Filter
                   </Button>
                   <Button variant="outline" className="gap-2 text-slate-600 border-slate-200">
                      <Download size={16} /> Export
                   </Button>
                    <Link href="/bank-officer/add-customer">
                      <Button className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white">
                          <Plus size={16} /> New Customer
                      </Button>
                   </Link>
                </div>
             </div>

             {/* Status Tabs */}
             <div className="px-6 py-4 flex gap-3 overflow-x-auto">
                 <Badge className="bg-[#0d3b66] hover:bg-[#0a2e50] text-white px-4 py-1.5 cursor-pointer">All (2,450)</Badge>
                 <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-1.5 cursor-pointer">Low Risk (1,820)</Badge>
                 <Badge variant="warning" className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-4 py-1.5 cursor-pointer">Medium Risk (420)</Badge>
                 <Badge variant="danger" className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-1.5 cursor-pointer">High Risk (210)</Badge>
             </div>

             {/* Table */}
             <Table>
                <TableHeader className="bg-slate-50/50">
                   <TableRow>
                      <TableHead className="w-[50px] pl-6"><Checkbox /></TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer ID</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">NIC</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credit Score</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {customers.map((customer, index) => (
                      <TableRow key={index} className="hover:bg-slate-50/50">
                         <TableCell className="pl-6"><Checkbox /></TableCell>
                         <TableCell className="font-semibold text-slate-700">{customer.id}</TableCell>
                         <TableCell>
                            <div className="flex items-center gap-3">
                               <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                  {customer.name.substring(0, 2).toUpperCase()}
                               </div>
                               <span className="font-medium text-slate-700">{customer.name}</span>
                            </div>
                         </TableCell>
                         <TableCell className="text-slate-600 font-mono text-xs">{customer.nic}</TableCell>
                         <TableCell>
                            <div className="flex flex-col text-xs">
                               <span className="font-medium text-slate-700">{customer.email}</span>
                               <span className="text-slate-500">{customer.phone}</span>
                            </div>
                         </TableCell>
                         <TableCell>
                            <Badge className={
                               customer.riskLevel === "LOW" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                               customer.riskLevel === "MEDIUM" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                               "bg-red-100 text-red-700 hover:bg-red-100"
                            }>
                               {customer.riskLevel}
                            </Badge>
                         </TableCell>
                         <TableCell className="font-bold text-slate-700">{customer.creditScore}</TableCell>
                         <TableCell>
                            <div className="flex items-center gap-2">
                               <div className={`h-2 w-2 rounded-full ${customer.status === "ACTIVE" ? "bg-green-500" : "bg-slate-300"}`} />
                               <span className="text-xs font-semibold text-slate-600">{customer.status}</span>
                            </div>
                         </TableCell>
                         <TableCell className="text-xs text-slate-500">{customer.lastUpdated}</TableCell>
                         <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                               <MoreHorizontal size={16} />
                            </Button>
                         </TableCell>
                      </TableRow>
                   ))}
                </TableBody>
             </Table>

             {/* Footer / Pagination */}
             <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30 rounded-b-xl">
                 <span>Showing <span className="font-bold text-slate-700">1-10</span> of <span className="font-bold text-slate-700">2,450</span></span>
                 
                 <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-slate-500"><span className="sr-only">Previous</span>&lt;</Button>
                    <Button variant="primary" size="sm" className="h-8 w-8 p-0 bg-[#3e9fd3]">1</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-slate-500">2</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-slate-500">3</Button>
                    <span className="flex items-center justify-center h-8 w-8 text-slate-400">...</span>
                    <Button variant="outline" size="sm" className="h-8 w-auto px-2 text-slate-500">245</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-slate-500"><span className="sr-only">Next</span>&gt;</Button>
                 </div>
             </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
