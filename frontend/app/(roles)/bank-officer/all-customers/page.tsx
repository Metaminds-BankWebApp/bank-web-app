"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal 
} from "lucide-react";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/src/components/ui/select";

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
   const [activeRisk, setActiveRisk] = useState<"all" | Customer["riskLevel"]>("all");
   const [statusFilter, setStatusFilter] = useState<"all" | Customer["status"]>("all");
   const [sortBy, setSortBy] = useState<
      "updated-desc" | "updated-asc" | "score-desc" | "score-asc" | "name-asc" | "name-desc"
   >("updated-desc");
   const [showFilters, setShowFilters] = useState(false);

   const riskCounts = useMemo(() => {
      return {
         all: customers.length,
         LOW: customers.filter((customer) => customer.riskLevel === "LOW").length,
         MEDIUM: customers.filter((customer) => customer.riskLevel === "MEDIUM").length,
         HIGH: customers.filter((customer) => customer.riskLevel === "HIGH").length,
      };
   }, []);

   const visibleCustomers = useMemo(() => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const filtered = customers.filter((customer) => {
         const matchesSearch =
            normalizedSearch.length === 0
               ? true
               : `${customer.id} ${customer.name} ${customer.nic} ${customer.email} ${customer.phone}`
                     .toLowerCase()
                     .includes(normalizedSearch);
         const matchesRisk = activeRisk === "all" ? true : customer.riskLevel === activeRisk;
         const matchesStatus = statusFilter === "all" ? true : customer.status === statusFilter;

         return matchesSearch && matchesRisk && matchesStatus;
      });

      return [...filtered].sort((left, right) => {
         switch (sortBy) {
            case "updated-asc":
               return new Date(left.lastUpdated).getTime() - new Date(right.lastUpdated).getTime();
            case "updated-desc":
               return new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime();
            case "score-asc":
               return left.creditScore - right.creditScore;
            case "score-desc":
               return right.creditScore - left.creditScore;
            case "name-asc":
               return left.name.localeCompare(right.name);
            case "name-desc":
               return right.name.localeCompare(left.name);
            default:
               return 0;
         }
      });
   }, [activeRisk, searchTerm, sortBy, statusFilter]);

   const handleExport = () => {
      const header = [
         "Customer ID",
         "Name",
         "NIC",
         "Email",
         "Phone",
         "Risk Level",
         "Credit Score",
         "Status",
         "Last Updated",
      ];

      const rows = visibleCustomers.map((customer) => [
         customer.id,
         customer.name,
         customer.nic,
         customer.email,
         customer.phone,
         customer.riskLevel,
         customer.creditScore.toString(),
         customer.status,
         customer.lastUpdated,
      ]);

      const csv = [header, ...rows]
         .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
         .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bank-officer-customers-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
   };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
        <main className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7 h-full overflow-hidden">
               <BankOfficerHeader title="All Customers" className="mb-6 shrink-0" />

          <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl shadow-sm border border-slate-200">
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
                   <Button
                      variant="outline"
                      className="gap-2 text-slate-600 border-slate-200"
                      onClick={() => setShowFilters((previous) => !previous)}
                   >
                      <Filter size={16} /> {showFilters ? "Hide Filters" : "Filter"}
                   </Button>
                   <Button variant="outline" className="gap-2 text-slate-600 border-slate-200" onClick={handleExport}>
                      <Download size={16} /> Export
                   </Button>
                    <Link href="/bank-officer/add-customer">
                      <Button className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white">
                          <Plus size={16} /> New Customer
                      </Button>
                   </Link>
                </div>
             </div>

                   {showFilters && (
                      <div className="px-6 pb-4 grid grid-cols-1 gap-3 border-b border-slate-100 md:grid-cols-3">
                         <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | Customer["status"])}>
                            <SelectTrigger className="bg-slate-50 border-slate-200">
                               <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="all">All Statuses</SelectItem>
                               <SelectItem value="ACTIVE">Active</SelectItem>
                               <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                         </Select>

                         <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                            <SelectTrigger className="bg-slate-50 border-slate-200">
                               <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="updated-desc">Newest Updated</SelectItem>
                               <SelectItem value="updated-asc">Oldest Updated</SelectItem>
                               <SelectItem value="score-desc">Credit Score: High to Low</SelectItem>
                               <SelectItem value="score-asc">Credit Score: Low to High</SelectItem>
                               <SelectItem value="name-asc">Name: A to Z</SelectItem>
                               <SelectItem value="name-desc">Name: Z to A</SelectItem>
                            </SelectContent>
                         </Select>

                         <Button
                            variant="outline"
                            className="border-slate-200 text-slate-600"
                            onClick={() => {
                               setSearchTerm("");
                               setStatusFilter("all");
                               setActiveRisk("all");
                               setSortBy("updated-desc");
                            }}
                         >
                            Reset Filters
                         </Button>
                      </div>
                   )}

             {/* Status Tabs */}
             <div className="px-6 py-4 flex gap-3 overflow-x-auto">
                         <Badge
                            className={`px-4 py-1.5 cursor-pointer ${activeRisk === "all" ? "bg-[#0d3b66] text-white hover:bg-[#0a2e50]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                            onClick={() => setActiveRisk("all")}
                         >
                            All ({riskCounts.all})
                         </Badge>
                         <Badge
                            variant="success"
                            className={`px-4 py-1.5 cursor-pointer ${activeRisk === "LOW" ? "bg-green-200 text-green-800" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                            onClick={() => setActiveRisk("LOW")}
                         >
                            Low Risk ({riskCounts.LOW})
                         </Badge>
                         <Badge
                            variant="warning"
                            className={`px-4 py-1.5 cursor-pointer ${activeRisk === "MEDIUM" ? "bg-amber-200 text-amber-800" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}
                            onClick={() => setActiveRisk("MEDIUM")}
                         >
                            Medium Risk ({riskCounts.MEDIUM})
                         </Badge>
                         <Badge
                            variant="danger"
                            className={`px-4 py-1.5 cursor-pointer ${activeRisk === "HIGH" ? "bg-red-200 text-red-800" : "bg-red-100 text-red-700 hover:bg-red-200"}`}
                            onClick={() => setActiveRisk("HIGH")}
                         >
                            High Risk ({riskCounts.HIGH})
                         </Badge>
             </div>

             {/* Table Container */}
             <div className="flex-1 overflow-auto min-h-0">
             <Table>
                <TableHeader className="bg-slate-50/50 sticky top-0 z-10">
                   <TableRow>
                      <TableHead className="w-12.5 pl-6"><Checkbox /></TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer ID</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">NIC</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credit Score</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</TableHead>
                      <TableHead className="w-12.5"></TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {visibleCustomers.map((customer, index) => (
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

                            {visibleCustomers.length === 0 && (
                               <TableRow>
                                  <TableCell colSpan={10} className="py-10 text-center text-sm text-slate-500">
                                     No customers found for the selected filters.
                                  </TableCell>
                               </TableRow>
                            )}
                </TableBody>
             </Table>
             </div>

             {/* Footer / Pagination */}
             <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30 rounded-b-xl shrink-0">
                         <span>
                            Showing <span className="font-bold text-slate-700">{visibleCustomers.length === 0 ? 0 : 1}-{visibleCustomers.length}</span> of <span className="font-bold text-slate-700">{visibleCustomers.length}</span>
                         </span>
                 
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
