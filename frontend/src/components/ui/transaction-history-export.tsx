"use client"

import * as React from "react"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import PopupModal from "@/src/components/ui/popup-modal"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select"
import { transactionService } from "@/src/api/transact/transaction.service"
import { ApiError } from "@/src/types/api-error"

type ReportRange = "currentMonth" | "last30" | "last90" | "custom"

export type TransactionHistoryRecord = {
	id: string
	receiverName: string
	receiverAcc: string
	senderName: string
	senderAcc: string
	amount: string
	status: string
	date: string
	reference: string
}

type TransactionHistoryExportProps = {
	records: TransactionHistoryRecord[]
}

const rangeLabels: Record<ReportRange, string> = {
	currentMonth: "Current month",
	last30: "Last 30 days",
	last90: "Last 90 days",
	custom: "Custom date range",
}

function formatDateInput(date: Date): string {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	return `${year}-${month}-${day}`
}

function shiftDate(days: number): string {
	const now = new Date()
	const shifted = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	shifted.setDate(shifted.getDate() + days)
	return formatDateInput(shifted)
}

function getCurrentMonthStartDate(): string {
	const now = new Date()
	return formatDateInput(new Date(now.getFullYear(), now.getMonth(), 1))
}

function resolveDateRange(
	range: ReportRange,
	customFromDate: string,
	customToDate: string
): { fromDate: string; toDate: string } {
	const today = formatDateInput(new Date())

	if (range === "currentMonth") {
		return {
			fromDate: getCurrentMonthStartDate(),
			toDate: today,
		}
	}

	if (range === "last30") {
		return {
			fromDate: shiftDate(-29),
			toDate: today,
		}
	}

	if (range === "last90") {
		return {
			fromDate: shiftDate(-89),
			toDate: today,
		}
	}

	if (!customFromDate || !customToDate) {
		throw new Error("Please select both from and to dates.")
	}

	if (customFromDate > customToDate) {
		throw new Error("From date must be before or equal to to date.")
	}

	return {
		fromDate: customFromDate,
		toDate: customToDate,
	}
}

export function TransactionHistoryExport({ records }: TransactionHistoryExportProps) {
	const [isReportModalOpen, setIsReportModalOpen] = React.useState(false)
	const [reportRange, setReportRange] = React.useState<ReportRange>("currentMonth")
	const [customFromDate, setCustomFromDate] = React.useState("")
	const [customToDate, setCustomToDate] = React.useState("")
	const [isDownloading, setIsDownloading] = React.useState(false)
	const [downloadError, setDownloadError] = React.useState("")

	const reportDateStamp = React.useMemo(() => {
		return new Date().toISOString().slice(0, 10).replace(/-/g, "")
	}, [])

	const previewFileName = React.useMemo(() => {
		return `transaction-statement-${reportRange}-${reportDateStamp}.pdf`
	}, [reportDateStamp, reportRange])

	const handleDownloadReport = React.useCallback(async () => {
		setDownloadError("")
		setIsDownloading(true)

		try {
			const dateRange = resolveDateRange(reportRange, customFromDate, customToDate)
			const result = await transactionService.downloadTransactionHistoryReport(dateRange)

			const blobUrl = URL.createObjectURL(result.blob)
			const anchor = document.createElement("a")
			anchor.href = blobUrl
			anchor.download = result.fileName
			document.body.appendChild(anchor)
			anchor.click()
			anchor.remove()
			URL.revokeObjectURL(blobUrl)
			setIsReportModalOpen(false)
		} catch (error) {
			let message = "Failed to download PDF report. Please try again."
			if (error instanceof ApiError) {
				message = error.message || message
			} else if (error instanceof Error && error.message) {
				message = error.message
			}
			setDownloadError(message)
		} finally {
			setIsDownloading(false)
		}
	}, [customFromDate, customToDate, reportRange])

	return (
		<>
			<Button
				variant="outline"
				size="md"
				className="!px-4 flex-1 md:flex-none items-center border-[#0B3E5A] bg-[#0B3E5A] text-white hover:border-[#0e4f62] hover:bg-[#0e4f62] hover:text-white"
				onClick={() => setIsReportModalOpen(true)}
			>
				<Download className="w-4 h-4 mr-2" />
				Download PDF Report
			</Button>

			<PopupModal
				open={isReportModalOpen}
				onOpenChange={setIsReportModalOpen}
				title="Download Transaction Statement"
				description="Generate official PDF statement using the bank report template."
				footer={
					<>
						<Button variant="outline" onClick={() => setIsReportModalOpen(false)} className="text-slate-700">
							Cancel
						</Button>
						<Button
							onClick={handleDownloadReport}
							disabled={isDownloading}
							className="border-[#0B3E5A] bg-[#0B3E5A] text-white hover:border-[#0e4f62] hover:bg-[#0e4f62] hover:text-white disabled:opacity-60"
						>
							<Download className="h-4 w-4" />
							{isDownloading ? "Downloading..." : "Download PDF Report"}
						</Button>
					</>
				}
				>
					<div className="space-y-4">
						<div className="rounded-xl border border-[#9ec4de] bg-[#eaf4fa] px-3 py-2">
							<p className="text-xs text-[#0e4f62]">Statement file format</p>
							<p className="mt-1 text-sm font-semibold text-[#0B3E5A]">PDF only</p>
						</div>

						<div className="rounded-xl border border-[#b8d3e6] bg-[#f5fbff] px-3 py-3">
							<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0e4f62]">Date range</p>
							<Select value={reportRange} onValueChange={(value) => setReportRange(value as ReportRange)}>
								<SelectTrigger className="text-black bg-white">
									<SelectValue placeholder="Select report range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="currentMonth">{rangeLabels.currentMonth}</SelectItem>
								<SelectItem value="last30">{rangeLabels.last30}</SelectItem>
								<SelectItem value="last90">{rangeLabels.last90}</SelectItem>
								<SelectItem value="custom">{rangeLabels.custom}</SelectItem>
							</SelectContent>
						</Select>

							{reportRange === "custom" && (
								<div className="mt-3 grid gap-3 sm:grid-cols-2">
									<div>
										<p className="mb-1 text-xs font-medium text-[#0e4f62]">From date</p>
										<input
											type="date"
											value={customFromDate}
										onChange={(event) => setCustomFromDate(event.target.value)}
										className="h-10 w-full rounded-md border border-[#d8d8d8] bg-white px-3 text-sm text-black"
									/>
									</div>
									<div>
										<p className="mb-1 text-xs font-medium text-[#0e4f62]">To date</p>
										<input
											type="date"
											value={customToDate}
										onChange={(event) => setCustomToDate(event.target.value)}
										className="h-10 w-full rounded-md border border-[#d8d8d8] bg-white px-3 text-sm text-black"
									/>
								</div>
							</div>
							)}
						</div>

						<div className="rounded-xl border border-[#b8d3e6] bg-[#f0f8fe] p-4 text-[#353535]">
							<div className="flex items-start justify-between gap-2">
								<div>
									<p className="text-xs uppercase tracking-[0.11em] text-[#0e4f62]">Statement Preview</p>
									<p className="mt-1 text-sm font-semibold text-[#1f1f1f]">Transaction History PDF</p>
								</div>
								<div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#8ebddd] bg-[#399FD8] text-white">
									<FileText className="h-4 w-4" />
								</div>
							</div>

							<div className="mt-3 rounded-lg border border-[#d4e5f1] bg-white px-3 py-2">
								<p className="text-xs text-[#6f6f6f]">System generated file name</p>
								<p className="mt-1 break-all text-sm font-medium text-[#1e1e1e]">{previewFileName}</p>
							</div>

							<div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
								<div className="rounded-md border border-[#b9d5e8] bg-[#eaf4fa] px-3 py-2">
									<p className="text-[11px] uppercase tracking-wide text-[#0e4f62]">Report range</p>
									<p className="mt-1 text-xs font-semibold text-[#0B3E5A]">{rangeLabels[reportRange]}</p>
								</div>
								<div className="rounded-md border border-[#b9d5e8] bg-[#edf7fc] px-3 py-2">
									<p className="text-[11px] uppercase tracking-wide text-[#6f6f6f]">Transactions</p>
									<p className="mt-1 text-xs font-semibold text-[#333333]">
										{records.length} record{records.length === 1 ? "" : "s"} loaded
								</p>
							</div>
						</div>
					</div>

					{downloadError && (
						<div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
							{downloadError}
						</div>
					)}
				</div>
			</PopupModal>
		</>
	)
}
