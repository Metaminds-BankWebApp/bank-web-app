"use client"

import * as React from "react"
import { Search } from "lucide-react"
import {
  Button,
  DataTableActionGroup,
  DataTableFilterGroup,
  DataTableFooter,
  DataTablePanel,
  DataTableStatusBadge,
  DataTableToolbar,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import ModuleHeader from "@/src/components/ui/module-header"
import { TransactionHistoryExport } from "@/src/components/ui/transaction-history-export"
import { transactionService } from "@/src/api/transact/transaction.service"
import { ApiError } from "@/src/types/api-error"
import type { TransactionResponse } from "@/src/types/dto/transact.dto"

type TransactionStatus = "success" | "failed" | "pending" | "cancelled"
type TransactionSort = "date-desc" | "date-asc" | "amount-desc" | "amount-asc" | "receiver-asc"

type TransactionRecord = {
  id: string
  receiverName: string
  receiverAcc: string
  senderName: string
  senderAcc: string
  amount: string
  status: TransactionStatus
  date: string
  reference: string
}

const amountFormatter = new Intl.NumberFormat("en-LK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function toDateOnly(value: string): string {
  const trimmed = (value ?? "").trim()
  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})/)
  if (match) return match[1]

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return ""

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, "0")
  const day = String(parsed.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function toStatus(value: string): TransactionStatus {
  const normalized = (value ?? "").trim().toUpperCase()
  if (normalized === "SUCCESS") return "success"
  if (normalized === "PENDING_OTP") return "pending"
  if (normalized === "CANCELLED") return "cancelled"
  return "failed"
}

function mapTransaction(tx: TransactionResponse): TransactionRecord {
  return {
    id: String(tx.transactionId),
    receiverName: tx.receiverName || "-",
    receiverAcc: tx.receiverAccountNo || "-",
    senderName: "You",
    senderAcc: tx.senderAccountNo || "-",
    amount: amountFormatter.format(Number(tx.amount || 0)),
    status: toStatus(tx.status),
    date: toDateOnly(tx.transactionDate),
    reference: tx.referenceNo || "-",
  }
}

const statusMeta: Record<TransactionStatus, { label: string; tone: "success" | "warning" | "danger" | "neutral" }> = {
  success: { label: "Success", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  pending: { label: "Pending OTP", tone: "warning" },
  cancelled: { label: "Cancelled", tone: "neutral" },
}

export default function Page() {
  const [records, setRecords] = React.useState<TransactionRecord[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<"all" | TransactionStatus>("all")
  const [sortBy, setSortBy] = React.useState<TransactionSort>("date-desc")
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 8

  React.useEffect(() => {
    let mounted = true

    const loadHistory = async () => {
      setIsLoading(true)
      setLoadError("")

      try {
        const transactions = await transactionService.getTransactionHistory()
        if (mounted) setRecords(transactions.map(mapTransaction))
      } catch (error) {
        if (!mounted) return

        let message = "Unable to load transaction history. Please try again."
        if (error instanceof ApiError) {
          message = error.message || message
        } else if (error instanceof Error && error.message) {
          message = error.message
        }
        setLoadError(message)
        setRecords([])
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    void loadHistory()

    return () => {
      mounted = false
    }
  }, [])

  const filteredData = React.useMemo(() => {
    const filteredRecords = records.filter((record) => {
      const normalizedSearchQuery = searchQuery.trim().toLowerCase()
      const searchMatch = normalizedSearchQuery
        ? record.receiverAcc.toLowerCase().includes(normalizedSearchQuery) ||
          record.senderAcc.toLowerCase().includes(normalizedSearchQuery) ||
          record.receiverName.toLowerCase().includes(normalizedSearchQuery) ||
          record.senderName.toLowerCase().includes(normalizedSearchQuery) ||
          record.reference.toLowerCase().includes(normalizedSearchQuery)
        : true

      const statusMatch = statusFilter === "all" || record.status === statusFilter

      return searchMatch && statusMatch
    })

    return [...filteredRecords].sort((left, right) => {
      switch (sortBy) {
        case "date-asc":
          return left.date.localeCompare(right.date)
        case "amount-desc":
          return Number(right.amount.replace(/,/g, "")) - Number(left.amount.replace(/,/g, ""))
        case "amount-asc":
          return Number(left.amount.replace(/,/g, "")) - Number(right.amount.replace(/,/g, ""))
        case "receiver-asc":
          return left.receiverName.localeCompare(right.receiverName)
        case "date-desc":
        default:
          return right.date.localeCompare(left.date)
      }
    })
  }, [records, searchQuery, sortBy, statusFilter])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy, statusFilter])

  function handlePreviousPage() {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  function clearFilters() {
    setSearchQuery("")
    setStatusFilter("all")
    setSortBy("date-desc")
  }

  const hasActiveFilters = Boolean(searchQuery.trim()) || statusFilter !== "all" || sortBy !== "date-desc"

  return (
    <div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transaction History" name="John Deo" />

      <div className="mx-auto mt-15 w-full max-w-6xl">
        <DataTableToolbar>
          <DataTableFilterGroup className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_190px_230px]">
            <div className="sm:col-span-2 xl:col-span-1">
              <label htmlFor="transaction-search" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Search transactions
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="transaction-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Receiver name, account no , or reference"
                  className="h-10 w-full border-slate-200 bg-slate-50 pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="transaction-status" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Transaction status
              </label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | TransactionStatus)}>
                <SelectTrigger id="transaction-status" className="h-10 border-slate-200 bg-slate-50">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending OTP</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="transaction-sort" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sort by
              </label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as TransactionSort)}>
                <SelectTrigger id="transaction-sort" className="h-10 border-slate-200 bg-slate-50">
                  <SelectValue placeholder="Transaction date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Transaction date: newest</SelectItem>
                  <SelectItem value="date-asc">Transaction date: oldest</SelectItem>
                  <SelectItem value="amount-desc">Amount: high to low</SelectItem>
                  <SelectItem value="amount-asc">Amount: low to high</SelectItem>
                  <SelectItem value="receiver-asc">Receiver name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DataTableFilterGroup>

          <DataTableActionGroup>
            {hasActiveFilters ? (
              <Button variant="ghost" size="md" className="h-10 px-4 text-slate-600 hover:bg-slate-100" onClick={clearFilters}>
                Clear
              </Button>
            ) : null}
            <TransactionHistoryExport records={filteredData} />
          </DataTableActionGroup>
        </DataTableToolbar>

        <DataTablePanel>
          {loadError ? (
            <div className="m-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {loadError}
            </div>
          ) : null}

          <div className="w-full" aria-label="Transaction history table">
            <Table className="min-w-[760px] table-fixed">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[13%]" />
                <col className="w-[11%]" />
                <col className="w-[13.5%]" />
                <col className="w-[10%]" />
                <col className="w-[13%]" />
                <col className="w-[8.5%]" />
                <col className="w-[19%]" />
              </colgroup>
              <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
                <TableRow>
                  <TableHead>Receiver&apos;s<br />name</TableHead>
                  <TableHead>Receiver&apos;s acc<br />no</TableHead>
                  <TableHead>Sender&apos;s<br />name</TableHead>
                  <TableHead>Sender&apos;s acc<br />no</TableHead>
                  <TableHead>Amount<br />(LKR)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference no</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell className="py-10 text-center text-sm text-slate-500" colSpan={8}>
                      Loading transaction history...
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell className="py-10 text-center text-sm text-slate-500" colSpan={8}>
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.receiverName}</TableCell>
                      <TableCell>{row.receiverAcc}</TableCell>
                      <TableCell>{row.senderName}</TableCell>
                      <TableCell>{row.senderAcc}</TableCell>
                      <TableCell className="font-semibold">{row.amount}</TableCell>
                      <TableCell>
                        <DataTableStatusBadge tone={statusMeta[row.status].tone}>
                          {statusMeta[row.status].label}
                        </DataTableStatusBadge>
                      </TableCell>
                      <TableCell>{row.date || "-"}</TableCell>
                      <TableCell>{row.reference}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <DataTableFooter>
            <div className="flex items-center justify-between w-full">
              <span>
                Showing <span className="font-semibold text-slate-800">{paginatedData.length}</span> at a time of{" "}
                <span className="font-semibold text-slate-800">{filteredData.length}</span> transactions
              </span>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    aria-label="Previous page"
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-[#3e9fd3] text-white border border-[#3e9fd3]"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </DataTableFooter>
        </DataTablePanel>
      </div>
    </div>
  )
}
