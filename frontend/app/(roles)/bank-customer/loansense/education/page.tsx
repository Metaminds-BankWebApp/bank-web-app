import React from "react";
import LoanSenseHeader from "@/src/components/ui/loansenseheader";

type SummaryCardProps = {
	label: string;
	value: React.ReactNode;
	variant?: "dark" | "light";
};
function SummaryCard({ label, value, variant = "light" }: SummaryCardProps) {
	return (
		<div
			className={`rounded-xl shadow-md p-6 flex flex-col justify-between h-full ${
				variant === "dark" ? "bg-[#0B3B66] text-white" : "bg-white text-gray-800"
			}`}
		>
			<div className="text-sm font-medium opacity-90">{label}</div>
			<div className="mt-4 text-xl font-semibold">{value}</div>
		</div>
	);
}
type BreakdownRowProps = {
	label: string;
	value: string;
	tone?: "neutral" | "negative" | "positive" | "highlight";
};
function BreakdownRow({ label, value, tone = "neutral" }: BreakdownRowProps) {
	const valueClass =
		tone === "negative"
	? "text-red-600"
	: tone === "positive"
	? "text-green-700 font-semibold"
	: tone === "highlight"
	? "text-green-800 font-semibold"
	: "text-gray-800";
	return (
		<div className="flex justify-between items-center py-2">
			<div className="text-sm text-gray-600">{label}</div>
			<div className={`text-sm ${valueClass}`}>{value}</div>
		</div>
	);
}
function Badge({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "blue" | "red" }) {
	const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
	const classes =
		color === "green" ? "bg-green-100 text-green-800" : color === "red" ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-800";
	return <span className={`${base} ${classes}`}>{children}</span>;
}
export default function Page() {
	const dbR = 16.7; // Debt Burden Ratio
	const policyLimit = 40; // %
	const progress = Math.min(100, (dbR / policyLimit) * 100);

	return (
		
		<main className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
			  

			{/* Header */}
			<LoanSenseHeader title="Education Loan" />
			<div><p className="text-sm opacity-80 mt-2">Explore your education loan eligibility and affordability insights</p></div>

			{/* Eligibility Summary */}
			<section className="rounded-xl bg-white p-6 shadow-md">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">Eligibility Summary</h2>
					<div>
						<Badge>Eligible</Badge>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<SummaryCard label="Max Eligible Amount" value="LKR 5,900,000" variant="dark" />
					<SummaryCard label="Recommended Tenure" value="36–84 months" variant="dark" />
					<SummaryCard label="Estimated EMI Range" value="LKR (50,000 – 88,000)" variant="light" />
					<SummaryCard label="Interest" value="12.0%" variant="light" />
				</div>
			</section>

			{/* Main two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left: Affordability Breakdown (span 2 cols on lg) */}
				<div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-md">
					<h3 className="text-lg font-semibold mb-4">Affordability Breakdown</h3>

					<div className="space-y-1">
						<BreakdownRow label="Monthly Income" value="LKR 280,000" />
						<BreakdownRow label="Existing Loan EMIs" value="- LKR 45,000" tone="negative" />
						<BreakdownRow label="Credit Card Minimum Payment" value="- LKR 5,000" tone="negative" />
						<BreakdownRow label="Leasing / Hire Purchase Payment" value="- LKR 5,000" tone="negative" />
						<hr className="my-2 border-t border-gray-100" />
						<BreakdownRow label="Total Monthly Debt Obligations (TMDO)" value="LKR 25,000" />
						<BreakdownRow label="Max Allowed EMI (40% of income)" value="LKR 60,000" />

						<div className="mt-4 rounded-lg p-4 bg-green-50 border border-green-100">
							<BreakdownRow label="Available EMI Capacity" value="LKR 50,000" tone="highlight" />
						</div>

						<div className="mt-6">
							<div className="flex items-center justify-between mb-2">
								<div className="text-sm font-medium">Debt Burden Ratio (DBR)</div>
								<div className="text-sm font-semibold">{dbR}%</div>
							</div>

							{/* Progress Bar */}
							<div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
								<div
									className="h-4 bg-green-500"
									style={{ width: `${progress}%` }}
									role="progressbar"
									aria-valuenow={progress}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>

							<div className="flex items-center justify-between mt-2 text-xs text-gray-500">
								<div>Policy Limit</div>
								<div>{policyLimit}%</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right: Risk Adjustment */}
				<div className="rounded-xl bg-white p-6 shadow-md">
					<h3 className="text-lg font-semibold mb-4">Risk Adjustment</h3>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-600">Applied Risk Level</div>
							<Badge>Low Risk</Badge>
						</div>

						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-600">Multiplier</div>
							<div className="text-sm font-semibold">1x</div>
						</div>

						<div className="mt-2 rounded-lg bg-sky-50 p-4 border border-sky-100 text-sm text-sky-800">
							Your excellent credit history and consistent repayment record qualify you for the maximum loan amount without any risk-based reduction.
						</div>
					</div>
				</div>
			</div>
			 

		</main>
	);
}
