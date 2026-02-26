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
		senderAcc: "0987654322",
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
		senderAcc: "0987654323",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
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
		senderAcc: "0987654324",
		amount: "LKR 15,500.00",
		status: "failed",
		date: "2026-02-10",
		reference: "REF-20260208",
	},
]

export default function Page() {
	return (
		<div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
			<ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transaction History" name="John Deo" />

			<Card className="transact-card transact-card-hover transact-creditlens-shade creditlens-delay-1 max-w-6xl mx-auto mt-6 w-full rounded-xl p-4 sm:mt-30 sm:p-6 lg:p-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
					<div className="flex-1">
						<div className="relative max-w-md">
							<span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-(--primecore-foreground)/60">
								<Search className="w-4 h-4" />
							</span>
							<Input
								placeholder="Search for account number"
								className="pl-10 w-full"
								aria-label="Search transactions"
							/>
						</div>
					</div>

					<div className="flex w-full md:w-auto items-center gap-3">
						<Button variant="outline" size="md" className="!px-4 flex-1 md:flex-none items-center">
							<Filter className="w-4 h-4 mr-2" />
							Filter
						</Button>
						<TransactionHistoryExport records={mockData} />
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
								{mockData.slice(0, 9).map((row) => (
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
