"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import {
  AlertTriangle,
  Clock,
  Download,
  Filter,
  Search,
  TrendingUp,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { transactionService } from "@/src/api/transact/transaction.service";
import { ApiError } from "@/src/types/api-error";
import type { TransactionResponse } from "@/src/types/dto/transact.dto";

type TransactionStatus = "success" | "failed" | "pending";

type TransactionRow = {
  id: string;
  dateLabel: string;
  timeLabel: string;
  dateKey: string;
  timestamp: number;
  referenceNo: string;
  recipientSender: {
    name: string;
    detail: string;
  };
  category: "Transfer";
  amountLabel: string;
  amountValue: number;
  status: TransactionStatus;
  remark: string;
  senderAccountNo: string;
  receiverAccountNo: string;
  rawStatus: string;
};

const amountFormatter = new Intl.NumberFormat("en-LK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatDateParts(value: string): { dateLabel: string; timeLabel: string; dateKey: string; timestamp: number } {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return {
      dateLabel: "-",
      timeLabel: "-",
      dateKey: "",
      timestamp: 0,
    };
  }

  return {
    dateLabel: parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    timeLabel: parsed.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    dateKey: `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`,
    timestamp: parsed.getTime(),
  };
}

function toStatus(value: string): TransactionStatus {
  const normalized = (value ?? "").trim().toUpperCase();
  if (normalized === "SUCCESS") {
    return "success";
  }
  if (normalized === "PENDING_OTP") {
    return "pending";
  }
  return "failed";
}

function mapTransaction(tx: TransactionResponse): TransactionRow {
  const dateParts = formatDateParts(tx.transactionDate);
  return {
    id: tx.referenceNo || String(tx.transactionId),
    dateLabel: dateParts.dateLabel,
    timeLabel: dateParts.timeLabel,
    dateKey: dateParts.dateKey,
    timestamp: dateParts.timestamp,
    referenceNo: tx.referenceNo || "-",
    recipientSender: {
      name: tx.receiverName || "-",
      detail: tx.receiverAccountNo ? `(${tx.receiverAccountNo})` : "",
    },
    category: "Transfer",
    amountLabel: amountFormatter.format(Number(tx.amount || 0)),
    amountValue: Number(tx.amount || 0),
    status: toStatus(tx.status),
    remark: tx.remark || "-",
    senderAccountNo: tx.senderAccountNo || "-",
    receiverAccountNo: tx.receiverAccountNo || "-",
    rawStatus: tx.status || "-",
  };
}

function getTransactionDetails(transaction: TransactionRow) {
  const referenceNote =
    transaction.status === "failed"
      ? transaction.remark && transaction.remark !== "-"
        ? transaction.remark
        : "Transaction was not completed successfully."
      : transaction.status === "pending"
        ? "Awaiting OTP verification or settlement confirmation."
        : transaction.remark && transaction.remark !== "-"
          ? transaction.remark
          : "Transaction completed successfully."

  return {
    channel: "Transfer API",
    referenceNote,
    fee: transaction.amountValue > 0 ? "LKR 120.00" : "LKR 0.00",
    approvedBy: transaction.status === "failed" ? "Pending Review" : "Auto-approved",
  };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRow | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<"30days" | "60days" | "90days" | "all">("30days");
  const [typeFilter, setTypeFilter] = useState<"all" | "transfer">("all");
  const [amountFilter, setAmountFilter] = useState<"any" | "low" | "high">("any");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadTransactions = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const history = await transactionService.getBankOfficerTransactionHistory();
        if (!mounted) {
          return;
        }
        setTransactions(history.map(mapTransaction));
      } catch (error) {
        if (!mounted) {
          return;
        }

        let message = "Unable to load transaction history from the transact API.";
        if (error instanceof ApiError) {
          message = error.message || message;
        } else if (error instanceof Error && error.message) {
          message = error.message;
        }

        setLoadError(message);
        setTransactions([]);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadTransactions();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleTransactions = useMemo(() => {
    if (transactions.length === 0) {
      return [];
    }

    const latestTimestamp = Math.max(...transactions.map((transaction) => transaction.timestamp));

    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        searchTerm.trim().length === 0
          ? true
          : `${transaction.id} ${transaction.referenceNo} ${transaction.recipientSender.name} ${transaction.senderAccountNo} ${transaction.receiverAccountNo} ${transaction.remark}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

      const daysDifference = Math.floor((latestTimestamp - transaction.timestamp) / (1000 * 60 * 60 * 24));
      const matchesDate =
        dateRange === "all"
          ? true
          : dateRange === "30days"
            ? daysDifference <= 30
            : dateRange === "60days"
              ? daysDifference <= 60
              : daysDifference <= 90;

      const matchesType = typeFilter === "all" ? true : transaction.category.toLowerCase() === typeFilter;
      const matchesAmount = amountFilter === "any" ? true : amountFilter === "low" ? transaction.amountValue <= 50000 : transaction.amountValue > 50000;

      return matchesSearch && matchesDate && matchesType && matchesAmount;
    });

    return [...filtered].sort((left, right) => {
      switch (sortBy) {
        case "date-asc":
          return left.timestamp - right.timestamp;
        case "date-desc":
          return right.timestamp - left.timestamp;
        case "amount-asc":
          return left.amountValue - right.amountValue;
        case "amount-desc":
          return right.amountValue - left.amountValue;
        default:
          return 0;
      }
    });
  }, [amountFilter, dateRange, searchTerm, sortBy, transactions, typeFilter]);

  const summary = useMemo(() => {
    const totalVolume = transactions.reduce((sum, transaction) => sum + transaction.amountValue, 0);
    const pendingTransfers = transactions.filter((transaction) => transaction.status === "pending").length;
    const suspiciousAlerts = transactions.filter((transaction) => transaction.status === "failed").length;
    const monthlyAvg = transactions.length > 0 ? totalVolume / transactions.length : 0;

    return {
      totalVolume,
      pendingTransfers,
      suspiciousAlerts,
      monthlyAvg,
      totalChangeLabel: transactions.length > 0 ? `${transactions.length} live transactions` : "No live transactions",
    };
  }, [transactions]);

  const handleExport = () => {
    const header = ["Date", "Time", "Reference No", "Receiver Name", "Sender Account", "Receiver Account", "Remark", "Amount (LKR)", "Status"];
    const rows = visibleTransactions.map((transaction) => [
      transaction.dateLabel,
      transaction.timeLabel,
      transaction.referenceNo,
      transaction.recipientSender.name,
      transaction.senderAccountNo,
      transaction.receiverAccountNo,
      transaction.remark,
      transaction.amountLabel,
      transaction.rawStatus,
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

  const totalVolumeLabel = amountFormatter.format(summary.totalVolume);
  const monthlyAvgLabel = amountFormatter.format(summary.monthlyAvg);

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
        <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole="BANK_OFFICER"
            sidebarHideCollapse
            mailBadge={2}
            notificationBadge={8}
            avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
            avatarStatusDot
            name="Kamal Edirisinghe"
            role="Bank Officer"
            title="Transactions"
            className="mb-6 shrink-0"
          />

          <div className="flex-1 overflow-y-auto min-h-0">
            {loadError && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {loadError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 shrink-0 creditlens-stagger-4">
              <div className="creditlens-card creditlens-card-hover bg-[#0d3b66] p-6 rounded-xl shadow-lg relative overflow-hidden text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Total Volume (LKR)</p>
                <h2 className="text-3xl font-bold mb-2">{totalVolumeLabel}</h2>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <TrendingUp size={12} /> {summary.totalChangeLabel}
                </div>
              </div>

              <div className="creditlens-card creditlens-card-hover bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pending Transfers</p>
                <h2 className="text-3xl font-bold text-[#0d3b66] mb-2">{summary.pendingTransfers}</h2>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                  <Clock size={12} /> Live transact history
                </div>
              </div>

              <div className="creditlens-card creditlens-card-hover bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Suspicious Alerts</p>
                <h2 className="text-3xl font-bold text-red-600 mb-2">{String(summary.suspiciousAlerts).padStart(2, "0")}</h2>
                <div className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 w-fit px-2 py-0.5 rounded">
                  <AlertTriangle size={12} /> Review Required
                </div>
              </div>

              <div className="creditlens-card creditlens-card-hover bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Monthly Avg</p>
                <h2 className="text-3xl font-bold text-[#0d3b66] mb-2">{monthlyAvgLabel}</h2>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                  <Clock size={12} /> Based on live transfer history
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mb-6">
              <Button className="bg-[#0d3b66] hover:bg-[#0a2e50] text-white" onClick={handleExport} disabled={visibleTransactions.length === 0}>
                <Download size={16} className="mr-2" /> Export Statement
              </Button>
            </div>

            <div className="creditlens-card creditlens-card-hover creditlens-delay-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 shrink-0">
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
                    <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as "all" | "transfer") }>
                      <SelectTrigger className="w-35 h-9 bg-slate-50 border-slate-200 text-xs font-medium">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
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

            <div className="creditlens-card creditlens-card-hover creditlens-delay-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader className="bg-sky-50/70 sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent border-b border-slate-100">
                      <TableHead className="w-37.5 text-xs font-bold uppercase text-slate-500 tracking-wider">Date/Time</TableHead>
                      <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Reference No</TableHead>
                      <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Receiver/Sender</TableHead>
                      <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Category</TableHead>
                      <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Amount (LKR)</TableHead>
                      <TableHead className="text-xs font-bold uppercase text-slate-500 tracking-wider">Status</TableHead>
                      <TableHead className="text-right text-xs font-bold uppercase text-slate-500 tracking-wider">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                          Loading live transact history...
                        </TableCell>
                      </TableRow>
                    ) : visibleTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                          No transactions found for the selected filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      visibleTransactions.map((txn) => (
                        <TableRow key={txn.referenceNo} className={`hover:bg-slate-50/50 ${txn.status === "failed" ? "bg-amber-50/30" : ""}`}>
                          <TableCell className="py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-700 text-xs">{txn.dateLabel}</span>
                              <span className="text-[10px] text-slate-400">{txn.timeLabel}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-500 font-medium">{txn.referenceNo}</TableCell>
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
                          <TableCell className="font-bold text-slate-800">{txn.amountLabel}</TableCell>
                          <TableCell>
                            {txn.status === "success" && (
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 uppercase text-[10px] font-bold tracking-wider">
                                Success
                              </Badge>
                            )}
                            {txn.status === "failed" && (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 uppercase text-[10px] font-bold tracking-wider gap-1">
                                <AlertTriangle size={10} /> Review
                              </Badge>
                            )}
                            {txn.status === "pending" && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 uppercase text-[10px] font-bold tracking-wider">
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                              onClick={() => setSelectedTransaction(txn)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <PopupModal
              open={selectedTransaction !== null}
              onOpenChange={(open) => {
                if (!open) {
                  setSelectedTransaction(null);
                }
              }}
              title={selectedTransaction ? `${selectedTransaction.referenceNo} — Transaction Details` : "Transaction Details"}
              description="Detailed transaction metadata from the transact API."
              footer={
                <Button variant="outline" onClick={() => setSelectedTransaction(null)}>
                  Close
                </Button>
              }
            >
              {selectedTransaction && (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Date & Time</p>
                      <p className="font-semibold text-slate-800">
                        {selectedTransaction.dateLabel} · {selectedTransaction.timeLabel}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Status</p>
                      <p className="font-semibold uppercase text-slate-800">{selectedTransaction.rawStatus}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Receiver</p>
                      <p className="font-semibold text-slate-800">
                        {selectedTransaction.recipientSender.name} {selectedTransaction.recipientSender.detail}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Amount</p>
                      <p className="font-semibold text-slate-800">LKR {selectedTransaction.amountLabel}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Sender Account</p>
                      <p className="font-semibold text-slate-800">{selectedTransaction.senderAccountNo}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Reference No</p>
                      <p className="font-semibold text-slate-800">{selectedTransaction.referenceNo}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Category</p>
                      <p className="font-semibold text-slate-800">{selectedTransaction.category}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Approval</p>
                      <p className="font-semibold text-slate-800">{getTransactionDetails(selectedTransaction).approvedBy}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Risk & Processing Notes</p>
                    <p className="mt-1 text-sm text-slate-700">{getTransactionDetails(selectedTransaction).referenceNote}</p>
                  </div>
                </div>
              )}
            </PopupModal>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
