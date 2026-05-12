"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
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
  if (match) {
    return match[1]
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) {
    return ""
  }

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, "0")
  const day = String(parsed.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function toStatus(value: string): TransactionStatus {
  const normalized = (value ?? "").trim().toUpperCase()
  if (normalized === "SUCCESS") {
    return "success"
  }
  if (normalized === "PENDING_OTP") {
    return "pending"
  }
  if (normalized === "CANCELLED") {
    return "cancelled"
  }
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

const statusMeta: Record<TransactionStatus, { label: string; variant: "success" | "warning" | "danger" | "outline" }> = {
  success: { label: "Success", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
  pending: { label: "Pending OTP", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "outline" },
}

const statusBadgeClassName = "min-w-[112px] justify-center whitespace-nowrap px-3 py-1"

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
        if (!mounted) {
          return
        }
        setRecords(transactions.map(mapTransaction))
      } catch (error) {
        if (!mounted) {
          return
        }
        let message = "Unable to load transaction history. Please try again."
        if (error instanceof ApiError) {
          message = error.message || message
        } else if (error instanceof Error && error.message) {
          message = error.message
        }
        setLoadError(message)
        setRecords([])
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadHistory()

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

      <Card className="transact-card transact-card-hover bg-white transact-creditlens-shade creditlens-delay-1 max-w-6xl mx-auto mt-6 w-full rounded-xl p-4 sm:mt-30 sm:p-6 lg:p-8">
        {loadError && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {loadError}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 flex-1">
            <div className="relative max-w-md w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-(--primecore-foreground)/60">
                <Search className="w-4 h-4" />
              </span>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search account no or name"
                className="pl-10 w-full"
                aria-label="Search by account number or name"
              />
            </div>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <input
              type="date"
              value={dateQuery}
              onChange={(event) => setDateQuery(event.target.value)}
              className="bg-transparent border rounded-md px-3 py-2 text-sm h-9"
              aria-label="Filter by date"
            />

            <Button variant="outline" size="md" className="!px-4 flex-1 md:flex-none items-center" onClick={clearFilters}>
              Clear
            </Button>

            <TransactionHistoryExport records={filteredData} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="overflow-y-auto max-h-[48vh]">
            <table className="w-full text-sm min-w-[760px]">
              <thead className="bg-(--primecore-surface-soft)">
                <tr className="text-left text-xs text-(--primecore-foreground)/80">
                  <th className="px-4 py-3">Receiver’s name</th>
                  <th className="px-4 py-3">Receiver’s acc no</th>
                  <th className="px-4 py-3">Sender’s name</th>
                  <th className="px-4 py-3">Sender’s acc no</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Reference no</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td className="px-4 py-6 text-sm text-(--primecore-foreground)/70" colSpan={8}>
                      Loading transaction history...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-sm text-(--primecore-foreground)/70" colSpan={8}>
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-(--primecore-surface)/50 border-b border-(--primecore-border)">
                      <td className="px-4 py-3 align-middle">{row.receiverName}</td>
                      <td className="px-4 py-3 align-middle">{row.receiverAcc}</td>
                      <td className="px-4 py-3 align-middle">{row.senderName}</td>
                      <td className="px-4 py-3 align-middle">{row.senderAcc}</td>
                      <td className="px-4 py-4 align-middle">{row.amount}</td>
                      <td className="px-4 py-3 align-middle">
                        <Badge className={statusBadgeClassName} variant={statusMeta[row.status].variant}>
                          {statusMeta[row.status].label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 align-middle">{row.date || "-"}</td>
                      <td className="px-4 py-3 align-middle">{row.reference}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
