"use client"

import * as React from "react"
import { Search, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import ModuleHeader from "@/src/components/ui/module-header"
import { TransactionHistoryExport } from "@/src/components/ui/transaction-history-export"

type TransactionStatus = "success" | "failed"

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

const mockData: TransactionRecord[] = [
	{
		id: "1",
		receiverName: "Jane Doe",
		receiverAcc: "1234567890",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 25,000.00",
		status: "success",
		date: "2026-02-10",
		reference: "REF-20260210",
	},
	{
		id: "2",
		receiverName: "Acme Corp",
		receiverAcc: "1122334455",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,000.00",
		status: "failed",
		date: "2026-02-08",
		reference: "REF-20260208",
	},
	{
		id: "3",
		receiverName: "Antony",
		receiverAcc: "1122336677",
		senderName: "Johny Depp",
		senderAcc: "0987654321",
		amount: "LKR 1,000.00",
		status: "success",
		date: "2025-02-08",
		reference: "REF-20260209",
	},
	{
		id: "4",
		receiverName: "anne hathaway",
		receiverAcc: "1122664455",
		senderName: "Jenny dias",
		senderAcc: "0987654321",
		amount: "LKR 13,000.00",
		status: "failed",
		date: "2025-01-08",
		reference: "REF-20260210",
	},
	{
		id: "5",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "success",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "6",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "failed",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "7",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "success",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "8",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "success",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "9",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "failed",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "10",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "success",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "11",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "0987654321",
		amount: "LKR 15,500.00",
		status: "success",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
	{
		id: "12",
		receiverName: "deny chewan",
		receiverAcc: "1122334454",
		senderName: "John Smith",
		senderAcc: "098765432q",
		amount: "LKR 15,500.00",
		status: "failed",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
]

export default function Page() {
	const [accountQuery, setAccountQuery] = React.useState("")
	const [nameQuery, setNameQuery] = React.useState("")
	const [dateQuery, setDateQuery] = React.useState("")

	const filteredData = React.useMemo(() => {
		return mockData.filter((r) => {
			// Account filter (matches sender or receiver acc)
			const accountMatch = accountQuery.trim()
				? r.receiverAcc.includes(accountQuery.trim()) || r.senderAcc.includes(accountQuery.trim())
				: true

			// Name filter (matches sender or receiver name, case-insensitive)
			const nq = nameQuery.trim().toLowerCase()
			const nameMatch = nq ? r.receiverName.toLowerCase().includes(nq) || r.senderName.toLowerCase().includes(nq) : true

			// Date filter (exact match YYYY-MM-DD)
			const dateMatch = dateQuery ? r.date === dateQuery : true

			return accountMatch && nameMatch && dateMatch
		})
	}, [accountQuery, nameQuery, dateQuery])

	function clearFilters() {
		setAccountQuery("")
		setNameQuery("")
		setDateQuery("")
	}

	return (
		<div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
			<ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transaction History" name="John Deo" />

			<Card className="transact-card transact-card-hover bg-white transact-creditlens-shade creditlens-delay-1 max-w-6xl mx-auto mt-6 w-full rounded-xl p-4 sm:mt-30 sm:p-6 lg:p-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 flex-1">
						<div className="relative max-w-md w-full sm:w-64">
							<span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-(--primecore-foreground)/60">
								<Search className="w-4 h-4" />
							</span>
							<Input
								value={accountQuery}
								onChange={(e) => setAccountQuery(e.target.value)}
								placeholder="Search account no"
								className="pl-10 w-full"
								aria-label="Search by account number"
							/>
						</div>

						<div className="relative max-w-md w-full sm:w-64">
							<span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-(--primecore-foreground)/60">
								<Search className="w-4 h-4" />
							</span>
							<Input
								value={nameQuery}
								onChange={(e) => setNameQuery(e.target.value)}
								placeholder="Search by name"
								className="pl-10 w-full"
								aria-label="Search by name"
							/>
						</div>
					</div>

					<div className="flex w-full md:w-auto items-center gap-3">
						<input
							type="date"
							value={dateQuery}
							onChange={(e) => setDateQuery(e.target.value)}
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
									{/* Action column removed */}
								</tr>
							</thead>

							<tbody>
								{filteredData.slice(0, 9).map((row) => (
									<tr key={row.id} className="hover:bg-(--primecore-surface)/50 border-b border-(--primecore-border)">
										<td className="px-4 py-3 align-middle">{row.receiverName}</td>
										<td className="px-4 py-3 align-middle">{row.receiverAcc}</td>
										<td className="px-4 py-3 align-middle">{row.senderName}</td>
										<td className="px-4 py-3 align-middle">{row.senderAcc}</td>
										<td className="px-4 py-4 align-middle">{row.amount}</td>
										<td className="px-4 py-3 align-middle">
											<Badge variant={row.status === "success" ? "success" : "danger"}>
												{row.status === "success" ? "Success" : "Failed"}
											</Badge>
										</td>
										<td className="px-4 py-3 align-middle">{row.date}</td>
										<td className="px-4 py-3 align-middle">{row.reference}</td>
										{/* Action cell removed */}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Card>
		</div>
	)
}
