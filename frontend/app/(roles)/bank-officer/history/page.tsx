"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  Search, 
   Download,
  ChevronLeft, 
  ChevronRight,
} from "lucide-react";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";
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
   const [searchTerm, setSearchTerm] = useState("");
   const [dateRange, setDateRange] = useState<"30days" | "60days" | "90days" | "all">("30days");
   const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "failed">("all");
   const [sortBy, setSortBy] = useState<"date-desc" | "date-asc">("date-desc");

   const visibleHistory = useMemo(() => {
      const latestDate = new Date(Math.max(...historyData.map((item) => new Date(item.date).getTime())));

      const filtered = historyData.filter((item) => {
         const text = `${item.customer.name} ${item.customer.id} ${item.actionType} ${item.performedBy}`.toLowerCase();
         const matchesSearch = searchTerm.trim().length === 0 ? true : text.includes(searchTerm.toLowerCase());

         const matchesTab =
            selectedTab === "evaluations"
               ? /credit/i.test(item.actionType)
               : selectedTab === "customer-updates"
                  ? /registration|limit increase/i.test(item.actionType)
                  : /refresh/i.test(item.actionType);

         const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter;

         const rowDate = new Date(item.date);
         const daysDifference = Math.floor((latestDate.getTime() - rowDate.getTime()) / (1000 * 60 * 60 * 24));
         const matchesDate =
            dateRange === "all"
               ? true
               : dateRange === "30days"
                  ? daysDifference <= 30
                  : dateRange === "60days"
                     ? daysDifference <= 60
                     : daysDifference <= 90;

         return matchesSearch && matchesTab && matchesStatus && matchesDate;
      });

      return [...filtered].sort((left, right) => {
         const leftDate = new Date(`${left.date} ${left.time}`).getTime();
         const rightDate = new Date(`${right.date} ${right.time}`).getTime();
         return sortBy === "date-desc" ? rightDate - leftDate : leftDate - rightDate;
      });
   }, [dateRange, searchTerm, selectedTab, sortBy, statusFilter]);

   const handleExport = () => {
      const header = ["Date", "Time", "Customer", "Customer ID", "Action Type", "Performed By", "Status"];
      const rows = visibleHistory.map((item) => [
         item.date,
         item.time,
         item.customer.name,
         item.customer.id,
         item.actionType,
         item.performedBy,
         item.status,
      ]);

      const csv = [header, ...rows]
         .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
         .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bank-officer-history-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
   };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
      <main className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7 h-full overflow-hidden">
               <BankOfficerHeader title="History" className="mb-6 shrink-0" />

          <div className="flex-1 overflow-y-auto min-h-0">
          <div className="mb-8 text-sm text-slate-500">
             Dashboard <span className="mx-2 text-slate-400">▶</span> <span className="text-[#3e9fd3] font-medium">Credit Status Analysis</span>
          </div>

          {/* Controls */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Select value={dateRange} onValueChange={(value) => setDateRange(value as "30days" | "60days" | "90days" | "all") }>
                           <SelectTrigger className="min-w-42.5 bg-white">
                              <SelectValue placeholder="Date range" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="30days">Last 30 Days</SelectItem>
                              <SelectItem value="60days">Last 60 Days</SelectItem>
                              <SelectItem value="90days">Last 90 Days</SelectItem>
                              <SelectItem value="all">All Time</SelectItem>
                           </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | "completed" | "pending" | "failed") }>
                           <SelectTrigger className="min-w-42.5 bg-white">
                              <SelectValue placeholder="Status" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                           </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date-desc" | "date-asc") }>
                           <SelectTrigger className="min-w-42.5 bg-white">
                              <SelectValue placeholder="Sort" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="date-desc">Newest First</SelectItem>
                              <SelectItem value="date-asc">Oldest First</SelectItem>
                           </SelectContent>
                        </Select>
             </div>

                   <div className="relative w-full md:w-105 flex gap-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                           placeholder="Search activity..."
                           className="pl-9 bg-slate-50 border-slate-200"
                           value={searchTerm}
                           onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <Button variant="outline" className="shrink-0" onClick={handleExport}>
                           <Download size={14} className="mr-2" /> Export
                        </Button>
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
                         <TableHead className="w-45 text-xs font-bold uppercase text-slate-500">Timestamp</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Customer</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Action Type</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Performed By</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500">Status</TableHead>
                         <TableHead className="text-right text-xs font-bold uppercase text-slate-500">Actions</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {visibleHistory.map((item) => (
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

                                 {visibleHistory.length === 0 && (
                                    <TableRow>
                                       <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                                          No activity found for the selected filters.
                                       </TableCell>
                                    </TableRow>
                                 )}
                   </TableBody>
                </Table>
             </div>

             {/* Footer / Pagination */}
             <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                           Showing <span className="font-medium text-slate-800">{visibleHistory.length === 0 ? 0 : 1}-{visibleHistory.length}</span> of <span className="font-medium text-slate-800">{visibleHistory.length}</span> activities
                        </p>
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
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
