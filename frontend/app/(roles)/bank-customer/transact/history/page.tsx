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
import ModuleHeader from "@/src/components/ui/module-header"
import { TransactionHistoryExport } from "@/src/components/ui/transaction-history-export"
import { transactionService } from "@/src/api/transact/transaction.service"
import { ApiError } from "@/src/types/api-error"
import type { TransactionResponse } from "@/src/types/dto/transact.dto"

type TransactionStatus = "success" | "failed" | "pending" | "cancelled"

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
    amount: `LKR ${amountFormatter.format(Number(tx.amount || 0))}`,
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
  const [dateQuery, setDateQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState("")

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
    return records.filter((record) => {
      const normalizedSearchQuery = searchQuery.trim().toLowerCase()
      const searchMatch = normalizedSearchQuery
        ? record.receiverAcc.toLowerCase().includes(normalizedSearchQuery) ||
          record.senderAcc.toLowerCase().includes(normalizedSearchQuery) ||
          record.receiverName.toLowerCase().includes(normalizedSearchQuery) ||
          record.senderName.toLowerCase().includes(normalizedSearchQuery)
        : true

      const dateMatch = dateQuery ? record.date === dateQuery : true

      return searchMatch && dateMatch
    })
  }, [records, searchQuery, dateQuery])

  function clearFilters() {
    setSearchQuery("")
    setDateQuery("")
  }

  return (
    <div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transaction History" name="John Deo" />

      <div className="mx-auto mt-15 w-full max-w-6xl">
        <DataTableToolbar>
          <DataTableFilterGroup className="flex-1">
            <div className="relative w-full sm:max-w-xs">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search account no or name"
                className="h-10 w-full rounded-lg border-slate-200 bg-slate-50/70 pl-10"
                aria-label="Search by account number or name"
              />
            </div>

            <input
              type="date"
              value={dateQuery}
              onChange={(event) => setDateQuery(event.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
              aria-label="Filter by date"
            />
          </DataTableFilterGroup>

          <DataTableActionGroup>
            <Button variant="outline" size="md" className="h-10 rounded-lg border-slate-200 bg-white px-4 text-slate-600" onClick={clearFilters}>
              Clear
            </Button>
            <TransactionHistoryExport records={filteredData} />
          </DataTableActionGroup>
        </DataTableToolbar>

        <DataTablePanel>
          {loadError ? (
            <div className="m-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {loadError}
            </div>
          ) : null}

          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead>Receiver&apos;s name</TableHead>
                <TableHead>Receiver&apos;s acc no</TableHead>
                <TableHead>Sender&apos;s name</TableHead>
                <TableHead>Sender&apos;s acc no</TableHead>
                <TableHead>Amount</TableHead>
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
                filteredData.map((row) => (
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

          <DataTableFooter>
            <span>
              Showing <span className="font-semibold text-slate-800">{filteredData.length === 0 ? 0 : 1}-{filteredData.length}</span> of{" "}
              <span className="font-semibold text-slate-800">{filteredData.length}</span> transactions
            </span>
          </DataTableFooter>
        </DataTablePanel>
      </div>
    </div>
  )
}
