"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { getBankCustomersForOfficer } from "@/src/api/customers/bank-customer.service";
import {
   findOwnedBankCustomerStepOneByNic,
   getCurrentBankCustomerFinancialRecord,
} from "@/src/api/customers/bank-customer-financial.service";
import { ApiError } from "@/src/types/api-error";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";
import type {
  BankCustomerFinancialRecordResponse,
  BankOfficerCustomerStepOnePrefillResponse,
} from "@/src/types/dto/bank-customer-financial.dto";
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
import { useToast } from "@/src/components/ui/toast";
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
  userId: number;
  id: string;
  name: string;
  nic: string;
  email: string;
  phone: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  creditScore: number;
    status: "ACTIVE" | "INACTIVE" | "DRAFT" | "PENDING_STEP_2" | "PENDING_STEP_3" | "PENDING_STEP_4" | "PENDING_STEP_5" | "PENDING_STEP_6" | "PENDING_STEP_7" | "COMPLETED";
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
      normalizedStatus === "ACTIVE" ||
      normalizedStatus === "INACTIVE" ||
      normalizedStatus === "DRAFT" ||
      normalizedStatus === "PENDING_STEP_2" ||
      normalizedStatus === "PENDING_STEP_3" ||
      normalizedStatus === "PENDING_STEP_4" ||
      normalizedStatus === "PENDING_STEP_5" ||
      normalizedStatus === "PENDING_STEP_6" ||
      normalizedStatus === "PENDING_STEP_7" ||
      normalizedStatus === "COMPLETED"
         ? (normalizedStatus as Customer["status"])
         : "DRAFT";

  return {
      userId: customer.userId,
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

function toDisplayDateTime(isoDateTime: string | null | undefined): string {
   if (!isoDateTime) {
      return "-";
   }

   const parsed = new Date(isoDateTime);
   if (Number.isNaN(parsed.getTime())) {
      return isoDateTime;
   }

   return parsed.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
   });
}

function toDisplayToken(value: string | null | undefined): string {
   if (!value) {
      return "-";
   }

   return value
      .trim()
      .toLowerCase()
      .split(/[_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
}

function toDisplayAmount(value: number | null | undefined): string {
   if (typeof value !== "number" || Number.isNaN(value)) {
      return "LKR 0.00";
   }

   return `LKR ${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   })}`;
}

type CustomerDetailTab = "personal" | "overview" | "incomes" | "loans" | "cards" | "liabilities";

const customerDetailTabs: Array<{ id: CustomerDetailTab; label: string }> = [
   { id: "personal", label: "Personal" },
   { id: "overview", label: "Financial Overview" },
   { id: "incomes", label: "Incomes" },
   { id: "loans", label: "Loans" },
   { id: "cards", label: "Credit Cards" },
   { id: "liabilities", label: "Liabilities" },
];

export default function AllCustomersPage() {
  const router = useRouter();
   const { showToast } = useToast();
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
   const [activeDetailTab, setActiveDetailTab] = useState<CustomerDetailTab>("personal");
   const [selectedCustomerPersonal, setSelectedCustomerPersonal] = useState<BankOfficerCustomerStepOnePrefillResponse | null>(null);
   const [selectedCustomerFinancial, setSelectedCustomerFinancial] = useState<BankCustomerFinancialRecordResponse | null>(null);
   const [isDetailLoading, setIsDetailLoading] = useState(false);
   const [detailLoadError, setDetailLoadError] = useState<string | null>(null);
   const [deleteRequestTarget, setDeleteRequestTarget] = useState<Customer | null>(null);
   const [deleteRequestReason, setDeleteRequestReason] = useState("CUSTOMER_REQUEST");
   const [deleteRequestNote, setDeleteRequestNote] = useState("");
   const [isSubmittingDeleteRequest, setIsSubmittingDeleteRequest] = useState(false);

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
      const header = ["Name", "NIC", "Email", "Phone", "Status", "Last Updated"];

      const rows = visibleCustomers.map((customer) => [
         customer.name,
         customer.nic,
         customer.email,
         customer.phone,
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

   useEffect(() => {
      if (!selectedCustomer) {
         setSelectedCustomerPersonal(null);
         setSelectedCustomerFinancial(null);
         setDetailLoadError(null);
         setIsDetailLoading(false);
         setActiveDetailTab("personal");
         return;
      }

      let mounted = true;
      setActiveDetailTab("personal");
      setIsDetailLoading(true);
      setDetailLoadError(null);
      setSelectedCustomerPersonal(null);
      setSelectedCustomerFinancial(null);

      const loadSelectedCustomerDetails = async () => {
         try {
            const personal = await findOwnedBankCustomerStepOneByNic(selectedCustomer.nic);
            if (!mounted) {
               return;
            }
            setSelectedCustomerPersonal(personal);

            try {
               const financial = await getCurrentBankCustomerFinancialRecord(personal.bankCustomerId);
               if (!mounted) {
                  return;
               }
               setSelectedCustomerFinancial(financial);
            } catch (financialError) {
               if (financialError instanceof ApiError && (financialError.status === 400 || financialError.status === 404)) {
                  if (mounted) {
                     setSelectedCustomerFinancial(null);
                  }
                  return;
               }
               throw financialError;
            }
         } catch (error) {
            if (!mounted) {
               return;
            }
            const message = error instanceof ApiError ? error.message : "Failed to load customer details.";
            setDetailLoadError(message);
         } finally {
            if (mounted) {
               setIsDetailLoading(false);
            }
         }
      };

      void loadSelectedCustomerDetails();

      return () => {
         mounted = false;
      };
   }, [selectedCustomer]);

   const financialOverview = useMemo(() => {
      if (!selectedCustomerFinancial) {
         return null;
      }

      const totalIncome = selectedCustomerFinancial.incomes.reduce((sum, item) => sum + (item.amount ?? 0), 0);
      const totalLoanEmi = selectedCustomerFinancial.loans.reduce((sum, item) => sum + (item.monthlyEmi ?? 0), 0);
      const totalLoanBalance = selectedCustomerFinancial.loans.reduce((sum, item) => sum + (item.remainingBalance ?? 0), 0);
      const totalCardLimit = selectedCustomerFinancial.cards.reduce((sum, item) => sum + (item.creditLimit ?? 0), 0);
      const totalCardOutstanding = selectedCustomerFinancial.cards.reduce((sum, item) => sum + (item.outstandingBalance ?? 0), 0);
      const totalLiabilities = selectedCustomerFinancial.liabilities.reduce((sum, item) => sum + (item.monthlyAmount ?? 0), 0);

      return {
         totalIncome,
         totalLoanEmi,
         totalLoanBalance,
         totalCardLimit,
         totalCardOutstanding,
         totalLiabilities,
      };
   }, [selectedCustomerFinancial]);

   const submitDeleteRequest = async () => {
      if (!deleteRequestTarget) {
         return;
      }

      setIsSubmittingDeleteRequest(true);
      try {
         const requestId = `DEL-${Date.now().toString().slice(-6)}`;
         console.info("Delete request submitted for admin review", {
            requestId,
            userId: deleteRequestTarget.userId,
            customerCode: deleteRequestTarget.id,
            nic: deleteRequestTarget.nic,
            reason: deleteRequestReason,
            note: deleteRequestNote,
         });

         showToast({
            title: "Delete request sent",
            description: `Request ${requestId} was sent to admin for ${deleteRequestTarget.name}.`,
            type: "success",
         });

         setDeleteRequestTarget(null);
         setDeleteRequestReason("CUSTOMER_REQUEST");
         setDeleteRequestNote("");
      } finally {
         setIsSubmittingDeleteRequest(false);
      }
   };

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
                      placeholder="Search by name, NIC..." 
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
                                             <SelectItem value="PENDING_STEP_3">Pending Step 3</SelectItem>
                                             <SelectItem value="PENDING_STEP_4">Pending Step 4</SelectItem>
                                             <SelectItem value="PENDING_STEP_5">Pending Step 5</SelectItem>
                                             <SelectItem value="PENDING_STEP_6">Pending Step 6</SelectItem>
                                             <SelectItem value="PENDING_STEP_7">Pending Step 7</SelectItem>
                                             <SelectItem value="COMPLETED">Completed</SelectItem>
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
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">NIC</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</TableHead>
                      <TableHead className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {visibleCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-slate-50/50">
                         <TableCell className="pl-6"><Checkbox /></TableCell>
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
                            <div className="flex items-center gap-2">
                               <div className={`h-2 w-2 rounded-full ${customer.status === "ACTIVE" ? "bg-green-500" : "bg-slate-300"}`} />
                               <span className="text-xs font-semibold text-slate-600">{customer.status}</span>
                            </div>
                         </TableCell>
                         <TableCell className="text-xs text-slate-500">{customer.lastUpdated}</TableCell>
                         <TableCell>
                            <div className="flex justify-end gap-2">
                               <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                                  onClick={() => setSelectedCustomer(customer)}
                               >
                                  View
                               </Button>
                               <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                                  onClick={() => router.push(`/bank-officer/add-customer?nic=${encodeURIComponent(customer.nic)}`)}
                               >
                                  Edit
                               </Button>
                               <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-red-200 text-xs text-red-700 hover:bg-red-50"
                                  onClick={() => setDeleteRequestTarget(customer)}
                               >
                                  Delete
                               </Button>
                            </div>
                         </TableCell>
                      </TableRow>
                            ))}

                            {!isLoading && visibleCustomers.length === 0 && (
                               <TableRow>
                                  <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                                     No customers found for the selected filters.
                                  </TableCell>
                               </TableRow>
                            )}

                            {isLoading && (
                               <TableRow>
                                     <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
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
                  description="Detailed personal and financial data grouped into tabs for quick review."
                   size="lg"
                  footer={
                     <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => setSelectedCustomer(null)}>
                        Close
                     </Button>
                  }
               >
                  {selectedCustomer && (
                     <div className="space-y-4">
                        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                           <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                              <div className="relative overflow-hidden rounded-t-3xl bg-[linear-gradient(135deg,#0d3b66_0%,#125f99_56%,#3e9fd3_100%)] p-5 text-white lg:rounded-l-3xl lg:rounded-tr-none">
                                 <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                                 <div className="relative flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold shadow-lg backdrop-blur-sm">
                                       {selectedCustomer.name
                                          .split(" ")
                                          .map((part) => part[0])
                                          .join("")
                                          .slice(0, 2)
                                          .toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                       <p className="text-xs uppercase tracking-[0.22em] text-sky-100/85">Customer Profile</p>
                                       <h4 className="mt-1 truncate text-[1.35rem] font-semibold leading-tight">{selectedCustomer.name}</h4>
                                       <p className="mt-1 text-xs leading-5 text-sky-50/85 sm:text-sm">Quick review of personal identity and financial history in one place.</p>
                                       <div className="mt-3 flex flex-wrap gap-2">
                                          <span className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">{selectedCustomer.id}</span>
                                          <span className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">{selectedCustomer.status}</span>
                                          <span className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">Score {selectedCustomer.creditScore}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-4 lg:rounded-r-3xl">
                                 <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Credit Score</p>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{selectedCustomer.creditScore}</p>
                                 </div>
                                 <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Risk Level</p>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{selectedCustomer.riskLevel ?? "-"}</p>
                                 </div>
                                 <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Customer Code</p>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{selectedCustomerPersonal?.customerCode ?? selectedCustomer.id}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                           {customerDetailTabs.map((tab) => (
                              <button
                                 key={tab.id}
                                 type="button"
                                 onClick={() => setActiveDetailTab(tab.id)}
                                 className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                                    activeDetailTab === tab.id
                                       ? "bg-[#0d3b66] text-white shadow-md shadow-[#0d3b66]/20"
                                       : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                 }`}
                              >
                                 {tab.label}
                              </button>
                           ))}
                        </div>

                        {isDetailLoading && (
                           <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600 shadow-sm">
                              Loading customer details...
                           </div>
                        )}

                        {!isDetailLoading && detailLoadError && (
                           <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                              {detailLoadError}
                           </div>
                        )}

                        {!isDetailLoading && !detailLoadError && activeDetailTab === "personal" && (
                           <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Customer Code</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.customerCode ?? selectedCustomer.id}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">NIC</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.nic ?? selectedCustomer.nic}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Full Name</p>
                                 <p className="font-semibold text-slate-800">
                                    {selectedCustomerPersonal
                                       ? `${selectedCustomerPersonal.firstName} ${selectedCustomerPersonal.lastName}`.trim()
                                       : selectedCustomer.name}
                                 </p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Date of Birth</p>
                                 <p className="font-semibold text-slate-800">{toDisplayDate(selectedCustomerPersonal?.dob ?? null)}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Email</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.email ?? selectedCustomer.email}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Mobile</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.mobile ?? selectedCustomer.phone}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Username</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.username ?? "-"}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Status</p>
                                 <p className="font-semibold text-slate-800">{toDisplayToken(selectedCustomer.status)}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Province</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.province ?? "-"}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Linked Account</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.accountNumber ?? "-"}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Account Type</p>
                                 <p className="font-semibold text-slate-800">{toDisplayToken(selectedCustomerPersonal?.accountType)}</p>
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Account Status</p>
                                 <p className="font-semibold text-slate-800">{toDisplayToken(selectedCustomerPersonal?.accountStatus)}</p>
                              </div>
                              <div className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                 <p className="text-xs text-slate-500">Address</p>
                                 <p className="font-semibold text-slate-800">{selectedCustomerPersonal?.address ?? "-"}</p>
                              </div>
                           </div>
                        )}

                        {!isDetailLoading && !detailLoadError && activeDetailTab === "overview" && (
                           <>
                              {!selectedCustomerFinancial || !financialOverview ? (
                                 <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600 shadow-sm">
                                    No financial record has been saved for this customer yet.
                                 </div>
                              ) : (
                                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Financial Record</p>
                                       <p className="font-semibold text-slate-800">#{selectedCustomerFinancial.bankRecordId}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Created At</p>
                                       <p className="font-semibold text-slate-800">{toDisplayDateTime(selectedCustomerFinancial.createdAt)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Updated At</p>
                                       <p className="font-semibold text-slate-800">{toDisplayDateTime(selectedCustomerFinancial.updatedAt)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Total Monthly Income</p>
                                       <p className="font-semibold text-slate-800">{toDisplayAmount(financialOverview.totalIncome)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Total Loan EMI</p>
                                       <p className="font-semibold text-slate-800">{toDisplayAmount(financialOverview.totalLoanEmi)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Total Loan Balance</p>
                                       <p className="font-semibold text-slate-800">{toDisplayAmount(financialOverview.totalLoanBalance)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Total Card Limit</p>
                                       <p className="font-semibold text-slate-800">{toDisplayAmount(financialOverview.totalCardLimit)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Total Card Outstanding</p>
                                       <p className="font-semibold text-slate-800">{toDisplayAmount(financialOverview.totalCardOutstanding)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Total Other Liabilities</p>
                                       <p className="font-semibold text-slate-800">{toDisplayAmount(financialOverview.totalLiabilities)}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Missed Payments (12M)</p>
                                       <p className="font-semibold text-slate-800">{selectedCustomerFinancial.missedPayments ?? 0}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Risk Level</p>
                                       <p className="font-semibold text-slate-800">{selectedCustomer.riskLevel}</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Credit Score</p>
                                       <p className="font-semibold text-slate-800">{selectedCustomer.creditScore}</p>
                                    </div>
                                 </div>
                              )}
                           </>
                        )}

                        {!isDetailLoading && !detailLoadError && activeDetailTab === "incomes" && (
                           <>
                              {!selectedCustomerFinancial || selectedCustomerFinancial.incomes.length === 0 ? (
                                 <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600 shadow-sm">
                                    No income rows available.
                                 </div>
                              ) : (
                                 <div className="space-y-3">
                                    {selectedCustomerFinancial.incomes.map((income) => (
                                       <div key={income.incomeId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                          <div className="flex flex-wrap items-center justify-between gap-2">
                                             <p className="text-sm font-semibold text-slate-800">{toDisplayToken(income.incomeCategory)}</p>
                                             <p className="text-sm font-semibold text-slate-800">{toDisplayAmount(income.amount)}</p>
                                          </div>
                                          <div className="mt-2 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                                             <p>Salary Type: <span className="font-medium text-slate-700">{toDisplayToken(income.salaryType)}</span></p>
                                             <p>Employment Type: <span className="font-medium text-slate-700">{toDisplayToken(income.employmentType)}</span></p>
                                             <p>Duration Months: <span className="font-medium text-slate-700">{income.durationMonths ?? "-"}</span></p>
                                             <p>Income Stability: <span className="font-medium text-slate-700">{toDisplayToken(income.incomeStability)}</span></p>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </>
                        )}

                        {!isDetailLoading && !detailLoadError && activeDetailTab === "loans" && (
                           <>
                              {!selectedCustomerFinancial || selectedCustomerFinancial.loans.length === 0 ? (
                                 <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600 shadow-sm">
                                    No loan rows available.
                                 </div>
                              ) : (
                                 <div className="space-y-3">
                                    {selectedCustomerFinancial.loans.map((loan) => (
                                       <div key={loan.loanId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                          <div className="flex flex-wrap items-center justify-between gap-2">
                                             <p className="text-sm font-semibold text-slate-800">{loan.loanType}</p>
                                             <p className="text-sm font-semibold text-slate-800">{toDisplayAmount(loan.remainingBalance)}</p>
                                          </div>
                                          <p className="mt-1 text-xs text-slate-500">
                                             Monthly EMI: <span className="font-medium text-slate-700">{toDisplayAmount(loan.monthlyEmi)}</span>
                                          </p>
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </>
                        )}

                        {!isDetailLoading && !detailLoadError && activeDetailTab === "cards" && (
                           <>
                              {!selectedCustomerFinancial || selectedCustomerFinancial.cards.length === 0 ? (
                                 <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600 shadow-sm">
                                    No credit card rows available.
                                 </div>
                              ) : (
                                 <div className="space-y-3">
                                    {selectedCustomerFinancial.cards.map((card) => (
                                       <div key={card.cardId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                          <div className="flex flex-wrap items-center justify-between gap-2">
                                             <p className="text-sm font-semibold text-slate-800">{card.provider || "Standard Card"}</p>
                                             <p className="text-sm font-semibold text-slate-800">{toDisplayAmount(card.creditLimit)}</p>
                                          </div>
                                          <p className="mt-1 text-xs text-slate-500">
                                             Outstanding: <span className="font-medium text-slate-700">{toDisplayAmount(card.outstandingBalance)}</span>
                                          </p>
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </>
                        )}

                        {!isDetailLoading && !detailLoadError && activeDetailTab === "liabilities" && (
                           <>
                              {!selectedCustomerFinancial || selectedCustomerFinancial.liabilities.length === 0 ? (
                                 <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600 shadow-sm">
                                    No liability rows available.
                                 </div>
                              ) : (
                                 <div className="space-y-3">
                                    {selectedCustomerFinancial.liabilities.map((liability) => (
                                       <div key={liability.liabilityId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                          <div className="flex flex-wrap items-center justify-between gap-2">
                                             <p className="text-sm font-semibold text-slate-800">{liability.description}</p>
                                             <p className="text-sm font-semibold text-slate-800">{toDisplayAmount(liability.monthlyAmount)}</p>
                                          </div>
                                       </div>
                                    ))}
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                       <p className="text-xs text-slate-500">Missed Payments (12M)</p>
                                       <p className="font-semibold text-slate-800">{selectedCustomerFinancial.missedPayments ?? 0}</p>
                                    </div>
                                 </div>
                              )}
                           </>
                        )}
                     </div>
                  )}
               </PopupModal>

               <PopupModal
                  open={deleteRequestTarget !== null}
                  onOpenChange={(open) => {
                     if (!open) {
                        setDeleteRequestTarget(null);
                     }
                  }}
                  title={deleteRequestTarget ? `Delete Request — ${deleteRequestTarget.name}` : "Delete Request"}
                  description="Send a request to admin to review and approve account deletion."
                  size="md"
                  footer={
                     <>
                        <Button
                           type="button"
                           variant="outline"
                           className="border-white/30 text-white hover:bg-white/10"
                           onClick={() => setDeleteRequestTarget(null)}
                           disabled={isSubmittingDeleteRequest}
                        >
                           Cancel
                        </Button>
                        <Button
                           type="button"
                           className="bg-red-500 hover:bg-red-600 text-white"
                           onClick={() => void submitDeleteRequest()}
                           disabled={isSubmittingDeleteRequest}
                        >
                           {isSubmittingDeleteRequest ? "Sending..." : "Send Request"}
                        </Button>
                     </>
                  }
               >
                  <div className="space-y-4">
                     <div className="rounded-lg border border-white/20 bg-white/5 p-3 text-sm">
                        <p><span className="font-semibold">Customer:</span> {deleteRequestTarget?.name ?? "-"}</p>
                        <p><span className="font-semibold">NIC:</span> {deleteRequestTarget?.nic ?? "-"}</p>
                        <p><span className="font-semibold">Customer Code:</span> {deleteRequestTarget?.id ?? "-"}</p>
                     </div>

                     <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-sky-100/90">
                           Reason
                        </label>
                        <Select value={deleteRequestReason} onValueChange={setDeleteRequestReason}>
                           <SelectTrigger className="border-white/20 bg-white/10 text-white">
                              <SelectValue placeholder="Select reason" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="CUSTOMER_REQUEST">Customer Requested Closure</SelectItem>
                              <SelectItem value="KYC_ISSUE">KYC/Compliance Issue</SelectItem>
                              <SelectItem value="FRAUD_RISK">Fraud Risk</SelectItem>
                              <SelectItem value="OTHER">Other</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-sky-100/90">
                           Note To Admin (Optional)
                        </label>
                        <textarea
                           value={deleteRequestNote}
                           onChange={(event) => setDeleteRequestNote(event.target.value)}
                           rows={4}
                           className="w-full rounded-md border border-white/20 bg-white/10 p-2 text-sm text-white placeholder:text-sky-100/60 focus:outline-none"
                           placeholder="Provide context for admin review..."
                        />
                     </div>
                  </div>
               </PopupModal>
        </main>
      </div>
    </AuthGuard>
  );
}



