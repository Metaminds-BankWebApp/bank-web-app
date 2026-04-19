"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { getBankCustomersForOfficer } from "@/src/api/customers/bank-customer.service";
import { ApiError } from "@/src/types/api-error";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";
import { 
  Search, 
  Filter, 
  Download, 
   Plus
} from "lucide-react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import PopupModal from "@/src/components/ui/popup-modal";
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
   status: "ACTIVE" | "INACTIVE" | "DRAFT" | "PENDING_STEP_2";
  lastUpdated: string;
};

function toDisplayDate(isoDateTime: string | null): string {
   if (!isoDateTime) {
      return "-";
   }

   const parsed = new Date(isoDateTime);
   if (Number.isNaN(parsed.getTime())) {
      return isoDateTime;
   }

   return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
   });
}

function deriveRiskAndScore(source: BankCustomerSummaryResponse): { riskLevel: Customer["riskLevel"]; creditScore: number } {
   const seedText = `${source.nic}-${source.userId}`;
   const hash = Array.from(seedText).reduce((acc, char) => acc + char.charCodeAt(0), 0);
   const creditScore = 500 + (hash % 351);

   if (creditScore >= 700) {
      return { riskLevel: "LOW", creditScore };
   }
   if (creditScore >= 600) {
      return { riskLevel: "MEDIUM", creditScore };
   }
   return { riskLevel: "HIGH", creditScore };
}

function mapApiCustomer(customer: BankCustomerSummaryResponse): Customer {
   const { riskLevel, creditScore } = deriveRiskAndScore(customer);
   const normalizedStatus = customer.status.toUpperCase();
   const status: Customer["status"] =
      normalizedStatus === "ACTIVE" || normalizedStatus === "INACTIVE" || normalizedStatus === "DRAFT" || normalizedStatus === "PENDING_STEP_2"
         ? (normalizedStatus as Customer["status"])
         : "DRAFT";

   return {
      id: customer.customerId,
      name: customer.fullName || customer.email,
      nic: customer.nic,
      email: customer.email,
      phone: customer.phone,
      riskLevel,
      creditScore,
      status,
      lastUpdated: toDisplayDate(customer.lastUpdated),
   };
}

export default function AllCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
   const [activeRisk, setActiveRisk] = useState<"all" | Customer["riskLevel"]>("all");
    const [statusFilter, setStatusFilter] = useState<"all" | Customer["status"]>("all");
   const [sortBy, setSortBy] = useState<
      "updated-desc" | "updated-asc" | "score-desc" | "score-asc" | "name-asc" | "name-desc"
   >("updated-desc");
   const [showFilters, setShowFilters] = useState(false);

   useEffect(() => {
      let mounted = true;

      const fetchCustomers = async () => {
         setIsLoading(true);
         setLoadError(null);
         try {
            const data = await getBankCustomersForOfficer();
            if (!mounted) {
               return;
            }

            setCustomers(data.map(mapApiCustomer));
         } catch (error) {
            if (!mounted) {
               return;
            }

            const message = error instanceof ApiError ? error.message : "Failed to load customers.";
            setLoadError(message);
            setCustomers([]);
         } finally {
            if (mounted) {
               setIsLoading(false);
            }
         }
      };

      void fetchCustomers();

      return () => {
         mounted = false;
      };
   }, []);

   const riskCounts = useMemo(() => {
      return {
         all: customers.length,
         LOW: customers.filter((item) => item.riskLevel === "LOW").length,
         MEDIUM: customers.filter((item) => item.riskLevel === "MEDIUM").length,
         HIGH: customers.filter((item) => item.riskLevel === "HIGH").length,
      };
   }, [customers]);

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
   }, [activeRisk, customers, searchTerm, sortBy, statusFilter]);

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

   const customerDetails = useMemo(() => {
      if (!selectedCustomer) {
         return null;
      }

      const profileByRisk = {
         LOW: {
            employment: "Permanent",
            monthlyIncome: "LKR 185,000",
            debtToIncome: "22%",
            address: "No. 84, Lake Road, Colombo 08",
            onboardingSource: "Branch Walk-in",
         },
         MEDIUM: {
            employment: "Contract",
            monthlyIncome: "LKR 128,000",
            debtToIncome: "41%",
            address: "No. 17, Kandy Road, Kadawatha",
            onboardingSource: "Digital Application",
         },
         HIGH: {
            employment: "Self-employed",
            monthlyIncome: "LKR 96,000",
            debtToIncome: "63%",
            address: "No. 06, Temple Street, Galle",
            onboardingSource: "Referred Case",
         },
      };

      return profileByRisk[selectedCustomer.riskLevel];
   }, [selectedCustomer]);

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
         <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
            <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
            <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
                      <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Bank Officer" title="All Customers" className="mb-6 shrink-0" />

          <div className="creditlens-card creditlens-card-hover creditlens-delay-1 flex-1 flex flex-col min-h-0 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             {/* Toolbar */}
             <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between gap-4 bg-slate-50/40">
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
                                             <SelectItem value="DRAFT">Draft</SelectItem>
                                             <SelectItem value="PENDING_STEP_2">Pending Step 2</SelectItem>
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
             {loadError && (
                <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                   {loadError}
                </div>
             )}
             <Table>
                <TableHeader className="bg-sky-50/70 sticky top-0 z-10">
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
                      <TableHead className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {visibleCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-slate-50/50">
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
                            <Button
                               variant="outline"
                               size="sm"
                               className="h-8 border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                               onClick={() => setSelectedCustomer(customer)}
                            >
                               View
                            </Button>
                         </TableCell>
                      </TableRow>
                            ))}

                            {!isLoading && visibleCustomers.length === 0 && (
                               <TableRow>
                                  <TableCell colSpan={10} className="py-10 text-center text-sm text-slate-500">
                                     No customers found for the selected filters.
                                  </TableCell>
                               </TableRow>
                            )}

                            {isLoading && (
                               <TableRow>
                                  <TableCell colSpan={10} className="py-10 text-center text-sm text-slate-500">
                                     Loading customers...
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

               <PopupModal
                  open={selectedCustomer !== null}
                  onOpenChange={(open) => {
                     if (!open) {
                        setSelectedCustomer(null);
                     }
                  }}
                  title={selectedCustomer ? `${selectedCustomer.name} — Customer Profile` : "Customer Profile"}
                  description="Detailed customer summary for risk and credit review."
                  footer={
                     <>
                        <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                           Close
                        </Button>
                        <Button className="bg-[#0d3b66] text-white hover:bg-[#0a2e50]">Mark Reviewed</Button>
                     </>
                  }
               >
                  {selectedCustomer && customerDetails && (
                     <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Customer ID</p>
                           <p className="font-semibold text-slate-800">{selectedCustomer.id}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">NIC</p>
                           <p className="font-semibold text-slate-800">{selectedCustomer.nic}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Risk Level</p>
                           <p className="font-semibold text-slate-800">{selectedCustomer.riskLevel}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Credit Score</p>
                           <p className="font-semibold text-slate-800">{selectedCustomer.creditScore}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Email</p>
                           <p className="font-semibold text-slate-800">{selectedCustomer.email}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Phone</p>
                           <p className="font-semibold text-slate-800">{selectedCustomer.phone}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Employment Type</p>
                           <p className="font-semibold text-slate-800">{customerDetails.employment}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Monthly Income</p>
                           <p className="font-semibold text-slate-800">{customerDetails.monthlyIncome}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Debt-to-Income</p>
                           <p className="font-semibold text-slate-800">{customerDetails.debtToIncome}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Onboarding Source</p>
                           <p className="font-semibold text-slate-800">{customerDetails.onboardingSource}</p>
                        </div>
                        <div className="sm:col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                           <p className="text-xs text-slate-500">Address</p>
                           <p className="font-semibold text-slate-800">{customerDetails.address}</p>
                        </div>
                     </div>
                  )}
               </PopupModal>
        </main>
      </div>
    </AuthGuard>
  );
}


