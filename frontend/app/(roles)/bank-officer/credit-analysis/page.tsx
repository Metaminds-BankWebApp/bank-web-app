"use client";

import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  Bell, 
  Mail, 
  Search, 
  Filter,
  ArrowUpRight,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp
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

const customerData = [
  { id: "#C-48292", name: "Amila Silva", score: 82, risk: "low", date: "Oct 24, 2023", initials: "AS", color: "bg-cyan-100 text-cyan-600" },
  { id: "#C-48293", name: "Kasun Perera", score: 65, risk: "medium", date: "Oct 24, 2023", initials: "KP", color: "bg-amber-100 text-amber-600" },
  { id: "#C-48294", name: "Ruwan Fernando", score: 45, risk: "high", date: "Oct 23, 2023", initials: "RF", color: "bg-red-100 text-red-600" },
  { id: "#C-48295", name: "Malani Jayasinghe", score: 90, risk: "low", date: "Oct 23, 2023", initials: "MJ", color: "bg-purple-100 text-purple-600" },
  { id: "#C-48296", name: "Sunil Gunawardena", score: 72, risk: "medium", date: "Oct 22, 2023", initials: "SG", color: "bg-blue-100 text-blue-600" },
  { id: "#C-48297", name: "Nimali Perera", score: 88, risk: "low", date: "Oct 22, 2023", initials: "NP", color: "bg-emerald-100 text-emerald-600" },
  { id: "#C-48298", name: "Chathura De Silva", score: 55, risk: "medium", date: "Oct 21, 2023", initials: "CD", color: "bg-indigo-100 text-indigo-600" },
  { id: "#C-48299", name: "Dilshan Bandara", score: 32, risk: "high", date: "Oct 21, 2023", initials: "DB", color: "bg-rose-100 text-rose-600" },
];

export default function CreditAnalysisPage() {
  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto w-full max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-[#0d3b66] p-4 text-white shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">Credit Analysis</h1>
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
             Dashboard <span className="mx-2 text-slate-400">▶</span> <span className="text-[#3e9fd3] font-medium">Credit Analysis</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             <div className="bg-[#0d3b66] text-white p-6 rounded-xl shadow-lg shadow-blue-900/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <TrendingUp size={64} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Total Customers</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold">2,450</span>
                   <span className="text-sm font-medium text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ArrowUpRight size={12} /> +2.5%
                   </span>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Low Risk</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-slate-800">1,820</span>
                   <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ArrowUpRight size={12} /> +1.2%
                   </span>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Medium Risk</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-slate-800">420</span>
                   <span className="text-sm font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <TrendingDown size={12} /> -0.8%
                   </span>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">High Risk</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-slate-800">210</span>
                   <span className="text-sm font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ArrowUpRight size={12} /> +4.1%
                   </span>
                </div>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             
             {/* Controls Toolbar */}
             <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                <div className="relative w-full md:w-[400px]">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <Input placeholder="Search by ID or name" className="pl-10 h-10 bg-white border-slate-200" />
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                   <Button variant="outline" className="gap-2 bg-white h-10 text-slate-600 border-slate-200 hover:bg-slate-50">
                      <Filter size={16} /> Filter
                   </Button>
                   <Button variant="outline" className="gap-2 bg-white h-10 text-slate-600 border-slate-200 hover:bg-slate-50">
                      <Download size={16} /> Export
                   </Button>
                </div>
             </div>

             {/* Tab Categories */}
             <div className="flex gap-2 p-2 bg-slate-50/50 border-b border-slate-100">
                {["All Customers", "Low Risk", "Medium Risk", "High Risk"].map((tab, idx) => (
                   <button 
                      key={tab}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                         idx === 0 
                         ? "bg-white text-[#0d3b66] shadow-sm ring-1 ring-slate-200" 
                         : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      }`}
                   >
                      {tab}
                   </button>
                ))}
             </div>

             {/* Table */}
             <div className="overflow-x-auto">
                <Table>
                   <TableHeader className="bg-slate-50/80">
                      <TableRow>
                         <TableHead className="w-[120px] text-xs font-bold uppercase text-slate-500 tracking-wider">Customer ID</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Customer Name</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Credit Score</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Risk Badge</TableHead>
                         <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Evaluation Date</TableHead>
                         <TableHead className="text-right text-xs font-bold uppercase text-slate-500 tracking-wider">Actions</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {customerData.map((customer) => (
                         <TableRow key={customer.id} className="group hover:bg-slate-50/80 transition-colors">
                            <TableCell className="font-medium text-slate-600">
                               {customer.id}
                            </TableCell>
                            <TableCell>
                               <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${customer.color}`}>
                                     {customer.initials}
                                  </div>
                                  <span className="font-medium text-slate-800 group-hover:text-[#3e9fd3] transition-colors">{customer.name}</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                     customer.score >= 80 ? "bg-emerald-500" : customer.score >= 60 ? "bg-amber-500" : "bg-red-500"
                                  }`} />
                                  <span className="font-bold text-slate-700">{customer.score}/100</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <Badge className={`uppercase tracking-wider font-bold text-[10px] px-2 py-0.5 border-0 ${
                                  customer.risk === "low" 
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                                  : customer.risk === "medium" 
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                               }`}>
                                  {customer.risk} Risk
                               </Badge>
                            </TableCell>
                            <TableCell className="text-slate-500 text-sm">
                               {customer.date}
                            </TableCell>
                            <TableCell className="text-right">
                               <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="outline" className="h-8 text-xs font-medium bg-white text-slate-600 border-slate-200 hover:border-[#3e9fd3] hover:text-[#3e9fd3]">
                                     View Evaluation
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 text-xs font-medium bg-white text-slate-600 border-slate-200 hover:border-[#3e9fd3] hover:text-[#3e9fd3]">
                                     View Customer
                                  </Button>
                               </div>
                            </TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </div>

             {/* Footer Pagination */}
             <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-800">1-10</span> of 2,450</p>
                <div className="flex items-center gap-2">
                   <Button size="icon" variant="outline" className="w-8 h-8" disabled>
                      <ChevronLeft size={16} className="text-slate-400" />
                   </Button>
                   {[1, 2, 3].map(page => (
                      <Button 
                         key={page} 
                         size="icon" 
                         variant="outline" 
                         className={`w-8 h-8 text-xs ${page === 1 ? "bg-[#3e9fd3] hover:bg-[#328ab8]" : "text-slate-600"}`}
                      >
                         {page}
                      </Button>
                   ))}
                   <span className="text-slate-400 px-1">...</span>
                   <Button size="icon" variant="outline" className="w-8 h-8 text-xs text-slate-600">245</Button>
                   <Button size="icon" variant="outline" className="w-8 h-8">
                      <ChevronRight size={16} className="text-slate-600" />
                   </Button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}