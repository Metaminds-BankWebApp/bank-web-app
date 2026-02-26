"use client"

import * as React from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import PopupModal from "@/src/components/ui/popup-modal"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select"

type TransactionStatus = "success" | "failed"
type ReportFileType = "csv" | "json" | "txt" | "pdf"
type ReportRange = "last7" | "last30" | "yearToDate"
type ReportStatusFilter = "all" | TransactionStatus

export type TransactionHistoryRecord = {
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

type TransactionHistoryExportProps = {
	records: TransactionHistoryRecord[]
}

const reportColumns: Array<{ key: keyof TransactionHistoryRecord; label: string }> = [
	{ key: "receiverName", label: "Receiver Name" },
	{ key: "receiverAcc", label: "Receiver Account Number" },
	{ key: "senderName", label: "Sender Name" },
	{ key: "senderAcc", label: "Sender Account Number" },
	{ key: "amount", label: "Amount" },
	{ key: "status", label: "Status" },
	{ key: "date", label: "Date" },
	{ key: "reference", label: "Reference Number" },
]

const reportRangeLabels: Record<ReportRange, string> = {
	last7: "Last 7 days",
	last30: "Last 30 days",
	yearToDate: "Year to date",
}

const reportStatusLabels: Record<ReportStatusFilter, string> = {
	all: "All transactions",
	success: "Success only",
	failed: "Failed only",
}

const reportFileTypeMeta: Record<ReportFileType, { label: string; extension: string; mimeType: string }> = {
	csv: { label: "CSV", extension: "csv", mimeType: "text/csv;charset=utf-8;" },
	json: { label: "JSON", extension: "json", mimeType: "application/json;charset=utf-8;" },
	txt: { label: "Text", extension: "txt", mimeType: "text/plain;charset=utf-8;" },
	pdf: { label: "PDF", extension: "pdf", mimeType: "application/pdf" },
}

const parseDate = (value: string) => {
	const [year, month, day] = value.split("-").map(Number)
	return new Date(year, month - 1, day)
}

const getRangeStartDate = (range: ReportRange) => {
	const today = new Date()
	const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

	if (range === "last7") {
		startDate.setDate(startDate.getDate() - 7)
		return startDate
	}

	if (range === "last30") {
		startDate.setDate(startDate.getDate() - 30)
		return startDate
	}

	return new Date(today.getFullYear(), 0, 1)
}

const csvEscape = (value: string) => `"${value.replace(/"/g, '""')}"`

const buildCsv = (rows: TransactionHistoryRecord[]) => {
	const headerLine = reportColumns.map((column) => csvEscape(column.label)).join(",")
	const rowLines = rows.map((row) => {
		return reportColumns.map((column) => csvEscape(String(row[column.key]))).join(",")
	})

	return [headerLine, ...rowLines].join("\n")
}

const buildText = (rows: TransactionHistoryRecord[]) => {
	const lines = rows.map((row, index) => {
		return `${index + 1}. ${row.date} | ${row.reference} | ${row.senderName} -> ${row.receiverName} | ${row.amount} | ${row.status}`
	})

	return lines.join("\n")
}

const normalizePdfText = (value: string) => value.replace(/[^\x20-\x7E]/g, "?")

const escapePdfText = (value: string) => normalizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")

const wrapPdfLine = (line: string, maxChars: number) => {
	if (line.length <= maxChars) {
		return [line]
	}

	const words = line.split(" ")
	const wrapped: string[] = []
	let current = ""

	words.forEach((word) => {
		const next = current ? `${current} ${word}` : word
		if (next.length <= maxChars) {
			current = next
			return
		}

		if (current) {
			wrapped.push(current)
		}

		if (word.length > maxChars) {
			for (let index = 0; index < word.length; index += maxChars) {
				wrapped.push(word.slice(index, index + maxChars))
			}
			current = ""
			return
		}

		current = word
	})

	if (current) {
		wrapped.push(current)
	}

	return wrapped
}

const buildPdf = (
	rows: TransactionHistoryRecord[],
	options: { rangeLabel: string; statusLabel: string; generatedOn: string }
) => {
	const headerLines = [
		"Transaction History Report",
		`Generated on: ${options.generatedOn}`,
		`Range: ${options.rangeLabel}`,
		`Status: ${options.statusLabel}`,
		`Records: ${rows.length}`,
		"",
		"Date | Reference | Sender -> Receiver | Amount | Status",
	]

	const dataLines = rows.map((row, index) => {
		return `${index + 1}. ${row.date} | ${row.reference} | ${row.senderName} -> ${row.receiverName} | ${row.amount} | ${row.status}`
	})

	const allLines = [...headerLines, ...dataLines]
	const wrappedLines = allLines.flatMap((line) => wrapPdfLine(line, 96))

	const pageHeight = 842
	const startY = 800
	const bottomPadding = 40
	const lineHeight = 14
	const maxLinesPerPage = Math.max(1, Math.floor((startY - bottomPadding) / lineHeight))

	const pageChunks: string[][] = []
	for (let index = 0; index < wrappedLines.length; index += maxLinesPerPage) {
		pageChunks.push(wrappedLines.slice(index, index + maxLinesPerPage))
	}

	if (pageChunks.length === 0) {
		pageChunks.push(["Transaction History Report", "No records available for the selected filters."])
	}

	const pageCount = pageChunks.length
	const objects: Array<{ number: number; content: string }> = []
	objects.push({
		number: 1,
		content: "<< /Type /Catalog /Pages 2 0 R >>",
	})

	const firstPageObject = 3
	const fontObject = firstPageObject + pageCount * 2
	const pageRefs = Array.from({ length: pageCount }, (_, index) => `${firstPageObject + index * 2} 0 R`).join(" ")

	objects.push({
		number: 2,
		content: `<< /Type /Pages /Kids [${pageRefs}] /Count ${pageCount} >>`,
	})

	pageChunks.forEach((lines, index) => {
		const pageObject = firstPageObject + index * 2
		const contentObject = pageObject + 1
		const safeLines = lines.map((line) => escapePdfText(line))
		const streamLines = [
			"BT",
			"/F1 10 Tf",
			"40 800 Td",
			...safeLines.map((line, lineIndex) =>
				lineIndex === 0 ? `(${line}) Tj` : `0 -${lineHeight} Td (${line}) Tj`
			),
			"ET",
		]
		const stream = streamLines.join("\n")
		const streamLength = new TextEncoder().encode(stream).length

		objects.push({
			number: pageObject,
			content: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 ${pageHeight}] /Resources << /Font << /F1 ${fontObject} 0 R >> >> /Contents ${contentObject} 0 R >>`,
		})

		objects.push({
			number: contentObject,
			content: `<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`,
		})
	})

	objects.push({
		number: fontObject,
		content: "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
	})

	let pdf = "%PDF-1.4\n"
	const offsets: number[] = [0]

	objects.forEach((object) => {
		offsets[object.number] = pdf.length
		pdf += `${object.number} 0 obj\n${object.content}\nendobj\n`
	})

	const xrefStart = pdf.length
	pdf += `xref\n0 ${objects.length + 1}\n`
	pdf += "0000000000 65535 f \n"

	for (let objectNumber = 1; objectNumber <= objects.length; objectNumber += 1) {
		const offset = String(offsets[objectNumber]).padStart(10, "0")
		pdf += `${offset} 00000 n \n`
	}

	pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

	return pdf
}

export function TransactionHistoryExport({ records }: TransactionHistoryExportProps) {
	const [isReportModalOpen, setIsReportModalOpen] = React.useState(false)
	const [reportRange, setReportRange] = React.useState<ReportRange>("last30")
	const [reportStatusFilter, setReportStatusFilter] = React.useState<ReportStatusFilter>("all")
	const [reportFileType, setReportFileType] = React.useState<ReportFileType>("csv")

	const filteredRecords = React.useMemo(() => {
		const rangeStartDate = getRangeStartDate(reportRange)

		return records.filter((row) => {
			const rowDate = parseDate(row.date)
			const matchesRange = rowDate >= rangeStartDate
			const matchesStatus = reportStatusFilter === "all" || row.status === reportStatusFilter
			return matchesRange && matchesStatus
		})
	}, [records, reportRange, reportStatusFilter])

	const reportDateStamp = React.useMemo(() => {
		return new Date().toISOString().slice(0, 10).replace(/-/g, "")
	}, [])

	const downloadFileName = React.useMemo(() => {
		const extension = reportFileTypeMeta[reportFileType].extension
		return `transaction-history-${reportRange}-${reportDateStamp}.${extension}`
	}, [reportDateStamp, reportFileType, reportRange])

	const handleDownloadReport = React.useCallback(() => {
		const fileMeta = reportFileTypeMeta[reportFileType]
		let blob: Blob

		if (reportFileType === "pdf") {
			const pdfContent = buildPdf(filteredRecords, {
				rangeLabel: reportRangeLabels[reportRange],
				statusLabel: reportStatusLabels[reportStatusFilter],
				generatedOn: new Date().toLocaleString(),
			})
			blob = new Blob([pdfContent], { type: fileMeta.mimeType })
		} else {
			let content = ""

			if (reportFileType === "csv") {
				content = buildCsv(filteredRecords)
			} else if (reportFileType === "json") {
				content = JSON.stringify(filteredRecords, null, 2)
			} else {
				content = buildText(filteredRecords)
			}

			blob = new Blob([content], { type: fileMeta.mimeType })
		}

		const blobUrl = URL.createObjectURL(blob)
		const anchor = document.createElement("a")
		anchor.href = blobUrl
		anchor.download = downloadFileName
		document.body.appendChild(anchor)
		anchor.click()
		anchor.remove()
		URL.revokeObjectURL(blobUrl)
		setIsReportModalOpen(false)
	}, [downloadFileName, filteredRecords, reportFileType, reportRange, reportStatusFilter])

	return (
		<>
			<Button
				variant="outline"
				size="md"
				className="!px-4 flex-1 md:flex-none items-center border-[#0B3E5A] bg-[#0B3E5A] text-white hover:border-[#0e4f62] hover:bg-[#0e4f62] hover:text-white"
				onClick={() => setIsReportModalOpen(true)}
			>
				<Download className="w-4 h-4 mr-2" />
				Export
			</Button>

			<PopupModal
				open={isReportModalOpen}
				onOpenChange={setIsReportModalOpen}
				title="Download Transaction Report"
				description="Select the range, status, and file type to export your report."
				footer={
					<>
						<Button variant="outline" onClick={() => setIsReportModalOpen(false)} className="text-white">
							Cancel
						</Button>
						<Button
							onClick={handleDownloadReport}
							className="border-[#0B3E5A] bg-[#0B3E5A] text-white hover:border-[#0e4f62] hover:bg-[#0e4f62] hover:text-white"
						>
							<Download className="h-4 w-4" />
							Download
						</Button>
					</>
				}
			>
				<div className="space-y-4">
					<div className="rounded-xl border border-[#0B3E5A]/20 bg-[#e0f7fa] px-3 py-2">
						<p className="text-xs text-[#0e4f62]/80">System generated file name</p>
						<p className="mt-1 break-all text-sm font-medium text-[#0B3E5A]">{downloadFileName}</p>
					</div>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<div>
							<p className="mb-2 text-xs font-medium uppercase tracking-wide  text-white text-(--primecore-foreground)/70">Report range</p>
							<Select value={reportRange} onValueChange={(value) => setReportRange(value as ReportRange)}>
								<SelectTrigger className="text-black">
									<SelectValue className="text-black" placeholder="Select report range" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="last7">{reportRangeLabels.last7}</SelectItem>
									<SelectItem value="last30">{reportRangeLabels.last30}</SelectItem>
									<SelectItem value="yearToDate">{reportRangeLabels.yearToDate}</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<p className="mb-2 text-xs font-medium uppercase tracking-wide  text-white text-(--primecore-foreground)/70">Status</p>
							<Select value={reportStatusFilter} onValueChange={(value) => setReportStatusFilter(value as ReportStatusFilter)}>
								<SelectTrigger className="text-black">
									<SelectValue className="text-black"	 placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All transactions</SelectItem>
									<SelectItem value="success">Success only</SelectItem>
									<SelectItem value="failed">Failed only</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div>
						<p className="mb-2 text-xs font-medium uppercase tracking-wide  text-white text-(--primecore-foreground)/70">File type</p>
						<Select value={reportFileType} onValueChange={(value) => setReportFileType(value as ReportFileType)}>
							<SelectTrigger className="text-black">
								<SelectValue className="text-black"	 placeholder="Select file type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="csv">{reportFileTypeMeta.csv.label}</SelectItem>
								<SelectItem value="json">{reportFileTypeMeta.json.label}</SelectItem>
								<SelectItem value="txt">{reportFileTypeMeta.txt.label}</SelectItem>
								<SelectItem value="pdf">{reportFileTypeMeta.pdf.label}</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="rounded-2xl border border-[#0B3E5A]/20 bg-[linear-gradient(140deg,#0B3E5A_0%,#0e4f62_58%,#399FD8_100%)] p-4 text-white shadow-[0_16px_40px_-26px_rgba(11,62,90,0.85)]">
						<p className="text-xs uppercase tracking-[0.11em] text-white/80">Report Preview</p>
						<p className="mt-1 text-base font-semibold">Transaction History Report</p>

						<div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
							<div className="rounded-lg bg-white/12 px-3 py-2">
								<p className="text-[11px] uppercase tracking-wide text-white/75">Range</p>
								<p className="mt-1 text-xs font-medium">{reportRangeLabels[reportRange]}</p>
							</div>
							<div className="rounded-lg bg-white/12 px-3 py-2">
								<p className="text-[11px] uppercase tracking-wide text-white/75">Status</p>
								<p className="mt-1 text-xs font-medium">{reportStatusLabels[reportStatusFilter]}</p>
							</div>
							<div className="rounded-lg bg-white/12 px-3 py-2">
								<p className="text-[11px] uppercase tracking-wide text-white/75">Format</p>
								<p className="mt-1 text-xs font-medium">{reportFileTypeMeta[reportFileType].label}</p>
							</div>
						</div>

						<div className="mt-3 rounded-lg bg-[#e0f7fa] px-3 py-2 text-[#0B3E5A]">
							<p className="text-xs font-semibold">
								{filteredRecords.length} transaction{filteredRecords.length === 1 ? "" : "s"} will be included in this report.
							</p>
						</div>
					</div>
				</div>
			</PopupModal>
		</>
	)
}
