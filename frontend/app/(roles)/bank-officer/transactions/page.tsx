"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  Search, 
  Download,
  Filter,
  TrendingUp,
  Clock,
  AlertTriangle,
  MoreVertical
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const transactions = [
  {
    id: "#TXN-882910",
    date: "Oct 26, 2023",
    time: "14:22:10",
    recipientSender: {
        name: "Commercial Bank",
        detail: "(S. Perera)",
        description: "" // For displaying consistent structure
    },
    category: "Transfer",
    amount: "45,000.00",
    status: "success",
  },
  {
    id: "#TXN-882905",
    date: "Oct 26, 2023",
    time: "12:05:45",
    recipientSender: {
        name: "Unknown Merchant",
        detail: "(Overseas)",
        description: ""
    },
    category: "Payment",
    amount: "120,500.00",
    status: "flagged",
  },
  {
    id: "#TXN-882898",
    date: "Oct 26, 2023",
    time: "09:15:22",
    recipientSender: {
        name: "ATM Withdrawal",
        detail: "(Kandy)",
        description: ""
    },
    category: "Withdrawal",
    amount: "5,000.00",
    status: "success",
  },
  {
    id: "#TXN-882855",
    date: "Oct 25, 2023",
    time: "18:30:00",
    recipientSender: {
        name: "Nawala Supermarket",
        detail: "",
        description: ""
    },
    category: "Payment",
    amount: "12,450.00",
    status: "pending",
  },
  {
    id: "#TXN-882855",
    date: "Oct 25, 2023",
    time: "18:30:00",
    recipientSender: {
        name: "Nawala Supermarket",
        detail: "",
        description: ""
    },
    category: "Payment",
    amount: "12,450.00",
    status: "pending",
  },
];

export default function TransactionsPage() {
   const [searchTerm, setSearchTerm] = useState("");
   const [dateRange, setDateRange] = useState<"30days" | "60days" | "90days" | "all">("30days");
   const [typeFilter, setTypeFilter] = useState<"all" | "transfer" | "payment" | "withdrawal">("all");
   const [amountFilter, setAmountFilter] = useState<"any" | "low" | "high">("any");
   const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

   const visibleTransactions = useMemo(() => {
      const latestDate = new Date(
         Math.max(...transactions.map((transaction) => new Date(transaction.date).getTime())),
      );

      const filtered = transactions.filter((transaction) => {
         const amount = Number(transaction.amount.replace(/,/g, ""));
         const transactionDate = new Date(transaction.date);
         const daysDifference = Math.floor((latestDate.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

         const matchesSearch =
            searchTerm.trim().length === 0
               ? true
               : `${transaction.id} ${transaction.recipientSender.name} ${transaction.category}`
                     .toLowerCase()
                     .includes(searchTerm.toLowerCase());

         const matchesDate =
            dateRange === "all"
               ? true
               : dateRange === "30days"
                  ? daysDifference <= 30
                  : dateRange === "60days"
                     ? daysDifference <= 60
                     : daysDifference <= 90;

         const matchesType = typeFilter === "all" ? true : transaction.category.toLowerCase() === typeFilter;
         const matchesAmount = amountFilter === "any" ? true : amountFilter === "low" ? amount <= 50000 : amount > 50000;

         return matchesSearch && matchesDate && matchesType && matchesAmount;
      });

      return [...filtered].sort((left, right) => {
         const leftAmount = Number(left.amount.replace(/,/g, ""));
         const rightAmount = Number(right.amount.replace(/,/g, ""));
         const leftDate = new Date(`${left.date} ${left.time}`).getTime();
         const rightDate = new Date(`${right.date} ${right.time}`).getTime();

         switch (sortBy) {
            case "date-asc":
               return leftDate - rightDate;
            case "date-desc":
               return rightDate - leftDate;
            case "amount-asc":
               return leftAmount - rightAmount;
            case "amount-desc":
               return rightAmount - leftAmount;
            default:
               return 0;
         }
      });
   }, [amountFilter, dateRange, searchTerm, sortBy, typeFilter]);

   const handleExport = () => {
      const header = ["Date", "Time", "Transaction ID", "Recipient/Sender", "Category", "Amount (LKR)", "Status"];
      const rows = visibleTransactions.map((transaction) => [
         transaction.date,
         transaction.time,
         transaction.id,
         `${transaction.recipientSender.name} ${transaction.recipientSender.detail}`.trim(),
         transaction.category,
         transaction.amount,
         transaction.status,
      ]);

      const csv = [header, ...rows]
         .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
         .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bank-officer-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
   };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
      <main className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7 h-full overflow-hidden">
             <BankOfficerHeader title="Transactions" className="mb-6 shrink-0" />

             <div className="flex-1 overflow-y-auto min-h-0">
          <div className="mb-8 text-sm text-slate-500">
             Dashboard <span className="mx-2 text-slate-400">▶</span> <span className="text-[#3e9fd3] font-medium">Transactions</span>
          </div>

          <div className="flex items-center justify-end mb-6">
             <Button className="bg-[#0d3b66] hover:bg-[#0a2e50] text-white" onClick={handleExport}>
                <Download size={16} className="mr-2" /> Export Statement
             </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 shrink-0">
             <div className="bg-[#0d3b66] p-6 rounded-xl shadow-lg relative overflow-hidden text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Total Volume (LKR)</p>
                <h2 className="text-3xl font-bold mb-2">2,482,900</h2>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                   <TrendingUp size={12} /> 12.5% vs Last Month
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pending Transfers</p>
                <h2 className="text-3xl font-bold text-[#0d3b66] mb-2">14</h2>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                   <Clock size={12} /> Est. processing: 2h
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Suspicious Alerts</p>
                <h2 className="text-3xl font-bold text-red-600 mb-2">03</h2>
                <div className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 w-fit px-2 py-0.5 rounded">
                   <AlertTriangle size={12} /> Action Required
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Monthly Avg</p>
                <h2 className="text-3xl font-bold text-[#0d3b66] mb-2">827,633</h2>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                   <Clock size={12} /> Based on last 6 months
                </div>
             </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 shrink-0">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4 relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <Input
                     placeholder="Search transactions..."
                     className="pl-9 bg-slate-50 border-slate-200 h-10"
                     value={searchTerm}
                     onChange={(event) => setSearchTerm(event.target.value)}
                   />
                </div>
                
                <div className="md:col-span-8 flex flex-wrap gap-4 items-center">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Date:</span>
                      <Select value={dateRange} onValueChange={(value) => setDateRange(value as "30days" | "60days" | "90days" | "all") }>
                         <SelectTrigger className="w-35 h-9 bg-slate-50 border-slate-200 text-xs font-medium">
                            <SelectValue placeholder="Period" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="60days">Last 60 Days</SelectItem>
                            <SelectItem value="90days">Last 90 Days</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>

                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Type:</span>
                      <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as "all" | "transfer" | "payment" | "withdrawal") }>
                         <SelectTrigger className="w-35 h-9 bg-slate-50 border-slate-200 text-xs font-medium">
                            <SelectValue placeholder="Type" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                            <SelectItem value="payment">Payment</SelectItem>
                            <SelectItem value="withdrawal">Withdrawal</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>

                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Amount:</span>
                      <Select value={amountFilter} onValueChange={(value) => setAmountFilter(value as "any" | "low" | "high") }>
                         <SelectTrigger className="w-35 h-9 bg-slate-50 border-slate-200 text-xs font-medium">
                            <SelectValue placeholder="Range" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="any">Any Range</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>

                            <div className="flex items-center gap-2">
                               <span className="text-xs font-bold text-slate-400 uppercase">Sort:</span>
                               <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date-desc" | "date-asc" | "amount-desc" | "amount-asc") }>
                                  <SelectTrigger className="w-40 h-9 bg-slate-50 border-slate-200 text-xs font-medium">
                                     <SelectValue placeholder="Sort" />
                                  </SelectTrigger>
                                  <SelectContent>
                                     <SelectItem value="date-desc">Newest First</SelectItem>
                                     <SelectItem value="date-asc">Oldest First</SelectItem>
                                     <SelectItem value="amount-desc">Amount High to Low</SelectItem>
                                     <SelectItem value="amount-asc">Amount Low to High</SelectItem>
                                  </SelectContent>
                               </Select>
                            </div>

                            <Button
                               variant="outline"
                               className="h-9 gap-2 text-slate-600 border-slate-200"
                               onClick={() => {
                                  setSearchTerm("");
                                  setDateRange("30days");
                                  setTypeFilter("all");
                                  setAmountFilter("any");
                                  setSortBy("date-desc");
                               }}
                            >
                               <Filter size={14} /> Reset
                            </Button>
                </div>
             </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col min-h-0">
             <div className="flex-1 overflow-auto">
             <Table>
               <TableHeader className="bg-slate-50/80 sticky top-0 z-10">
                 <TableRow className="hover:bg-transparent border-b border-slate-100">
                   <TableHead className="w-37.5 text-xs font-bold uppercase text-slate-500 tracking-wider">Date/Time</TableHead>
                   <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Transaction ID</TableHead>
                   <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Recipient/Sender</TableHead>
                   <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Category</TableHead>
                   <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Amount (LKR)</TableHead>
                   <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Status</TableHead>
                   <TableHead className="text-right text-xs font-bold uppercase text-slate-500 tracking-wider">Action</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                         {visibleTransactions.map((txn, index) => (
                   <TableRow key={index} className={`hover:bg-slate-50/50 ${txn.status === "flagged" ? "bg-amber-50/30" : ""}`}>
                     <TableCell className="py-4">
                        <div className="flex flex-col">
                           <span className="font-semibold text-slate-700 text-xs">{txn.date}</span>
                           <span className="text-[10px] text-slate-400">{txn.time}</span>
                        </div>
                     </TableCell>
                     <TableCell className="text-xs text-slate-500 font-medium">{txn.id}</TableCell>
                     <TableCell>
                        <div className="flex flex-col">
                           <span className="font-semibold text-slate-800 text-sm">{txn.recipientSender.name}</span>
                           <span className="text-xs text-slate-500 font-medium">{txn.recipientSender.detail}</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 uppercase text-[10px] font-bold tracking-wider rounded">
                           {txn.category}
                        </Badge>
                     </TableCell>
                     <TableCell className="font-bold text-slate-800">
                        {txn.amount}
                     </TableCell>
                     <TableCell>
                        {txn.status === "success" && (
                           <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 uppercase text-[10px] font-bold tracking-wider">Success</Badge>
                        )}
                        {txn.status === "flagged" && (
                           <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 uppercase text-[10px] font-bold tracking-wider gap-1">
                              <AlertTriangle size={10} /> Flagged
                           </Badge>
                        )}
                        {txn.status === "pending" && (
                           <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 uppercase text-[10px] font-bold tracking-wider">Pending</Badge>
                        )}
                     </TableCell>
                     <TableCell className="text-right">
                        {txn.status === "flagged" ? (
                           <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white h-7 text-xs font-bold shadow-sm shadow-amber-200">
                              Review
                           </Button>
                        ) : (
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreVertical size={16} />
                           </Button>
                        )}
                     </TableCell>
                   </TableRow>
                         ))}

                         {visibleTransactions.length === 0 && (
                            <TableRow>
                               <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                                  No transactions found for the selected filters.
                               </TableCell>
                            </TableRow>
                         )}
               </TableBody>
             </Table>
             </div>
          </div>
        </div>
        </main>
      </div>
    </AuthGuard>
  );
}