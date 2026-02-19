"use client";

import { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  Bell, 
  Mail, 
  Search, 
  Calendar, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  FileText
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const historyData = [
  {
    id: 1,
    date: "Oct 25, 2023",
    time: "10:45 AM",
    customer: { name: "Amila Silva", id: "#C-48292", avatar: "AS", color: "bg-blue-100 text-blue-600" },
    actionType: "Credit Re-evaluation",
    performedBy: "Officer John Doe",
    status: "completed",
  },
  {
    id: 2,
    date: "Oct 25, 2023",
    time: "10:45 AM",
    customer: { name: "Amila Silva", id: "#C-48292", avatar: "AS", color: "bg-blue-100 text-blue-600" },
    actionType: "Credit Re-evaluation",
    performedBy: "Officer John Doe",
    status: "completed",
  },
  {
    id: 3,
    date: "Oct 25, 2023",
    time: "09:15 AM",
    customer: { name: "Kasun Perera", id: "#C-48301", avatar: "KP", color: "bg-amber-100 text-amber-600" },
    actionType: "New Registration",
    performedBy: "Officer Sarah Jenkins",
    status: "pending",
  },
  {
    id: 4,
    date: "Oct 24, 2023",
    time: "04:30 PM",
    customer: { name: "Ruwan Fernando", id: "#C-48315", avatar: "RF", color: "bg-red-100 text-red-600" },
    actionType: "Limit Increase Request",
    performedBy: "Officer John Doe",
    status: "failed",
  },
  {
    id: 5,
    date: "Oct 24, 2023",
    time: "04:30 PM",
    customer: { name: "Ruwan Fernando", id: "#C-48315", avatar: "RF", color: "bg-red-100 text-red-600" },
    actionType: "Limit Increase Request",
    performedBy: "Officer John Doe",
    status: "failed",
  },
  {
    id: 6,
    date: "Oct 24, 2023",
    time: "11:05 AM",
    customer: { name: "Malani Jayasinghe", id: "#C-48322", avatar: "MJ", color: "bg-purple-100 text-purple-600" },
    actionType: "Credit Scoring Refresh",
    performedBy: "System (Auto)",
    status: "completed",
  },
];

export default function HistoryPage() {
  const [selectedTab, setSelectedTab] = useState("evaluations");

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto w-full max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] p-4 text-white shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">History</h1>
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

          <div className="mb-8 text-sm text-slate-500">
             Dashboard <span className="mx-2 text-slate-400">▶</span> <span className="text-[#3e9fd3] font-medium">Credit Status Analysis</span>
          </div>

          {/* Controls */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white min-w-[240px]">
                   <Calendar size={16} className="text-slate-400" />
                   <span className="text-xs text-slate-500 font-bold uppercase mr-2">Date Range</span>
                   <span className="text-sm text-slate-700 font-medium">Oct 01, 2023 - Oct 31, 2023</span>
                </div>
                
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white min-w-[200px]">
                   <Filter size={16} className="text-slate-400" />
                   <span className="text-xs text-slate-500 font-bold uppercase mr-2">Risk Category</span>
                   <span className="text-sm text-slate-700 font-medium">All Categories</span>
                </div>
             </div>

             <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input placeholder="Search activity..." className="pl-9 bg-slate-50 border-slate-200" />
             </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             {/* Tabs */}
             <div className="border-b border-slate-100 flex p-2 bg-slate-50/50 gap-2">
                {[
                  { id: "evaluations", label: "Evaluations" }, 
                  { id: "customer-updates", label: "Customer Updates" }, 
                  { id: "financial-updates", label: "Financial Data Updates" }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            selectedTab === tab.id 
                            ? "bg-white text-[#0d3b66] shadow-sm border border-slate-200" 
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
             </div>

             {/* Table */}
             <div className="overflow-x-auto">
                <Table>
                   <TableHeader className="bg-slate-50">
                      <TableRow>
                         <TableHead className="w-[180px] text-xs font-bold uppercase text-slate-500">Timestamp</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Customer</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Action Type</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Performed By</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Status</TableHead>
                         <TableHead className="text-right text-xs font-bold uppercase text-slate-500">Actions</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {historyData.map((item) => (
                         <TableRow key={item.id} className="hover:bg-slate-50/50">
                            <TableCell className="font-medium text-slate-700">
                               <div className="flex flex-col">
                                  <span>{item.date}</span>
                                  <span className="text-xs text-slate-400 font-normal">{item.time}</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.customer.color}`}>
                                     {item.customer.avatar}
                                  </div>
                                  <div>
                                     <p className="font-medium text-slate-800">{item.customer.name}</p>
                                     <p className="text-xs text-slate-400">ID: {item.customer.id}</p>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell className="font-semibold text-slate-700">
                               {item.actionType}
                            </TableCell>
                            <TableCell className="text-slate-600">
                               {item.performedBy}
                            </TableCell>
                            <TableCell>
                               <Badge variant="outline" className={`
                                  ${item.status === "completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : ""}
                                  ${item.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100" : ""}
                                  ${item.status === "failed" ? "bg-red-50 text-red-600 border-red-100" : ""}
                               `}>
                                  {item.status.toUpperCase()}
                               </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                               <Button variant="ghost" size="sm" className="bg-slate-100 hover:bg-slate-200 text-slate-700 h-8 text-xs font-medium">
                                  View Details
                               </Button>
                            </TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </div>

             {/* Footer / Pagination */}
             <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing <span className="font-medium text-slate-800">1-10</span> of <span className="font-medium text-slate-800">428</span> activities</p>
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="icon" className="h-8 w-8 bg-white" disabled><ChevronLeft size={14} /></Button>
                   <Button size="icon" className="h-8 w-8 bg-[#3e9fd3] hover:bg-[#328ab8] text-white text-xs">1</Button>
                   <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-xs hover:bg-slate-50">2</Button>
                   <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-xs hover:bg-slate-50">3</Button>
                   <span className="text-slate-400 text-xs">...</span>
                   <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-xs hover:bg-slate-50">43</Button>
                   <Button variant="outline" size="icon" className="h-8 w-8 bg-white"><ChevronRight size={14} /></Button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
