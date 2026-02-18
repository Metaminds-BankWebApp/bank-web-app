"use client";

import CreditRiskGauge from "./components/CreditRiskGauge";
import CreditRiskTrendChart from "./components/CreditRiskTrendChart";
import RiskFactorBars from "./components/RiskFactorBars";

export default function PublicCustomerCreditLensPage() {
  // Mock data (same values as your design)
  const score = 55;
  const riskLabel = "Medium";

  const factors = [
    { name: "Payment history", value: 18, max: 30, color: "#fbbf24" }, // amber
    { name: "DTI", value: 12, max: 25, color: "#34d399" }, // green
    { name: "Credit utilization", value: 20, max: 20, color: "#ef4444" }, // red
    { name: "Income stability", value: 0, max: 15, color: "#e5e7eb" }, // gray
    { name: "Active Facilities", value: 5, max: 10, color: "#34d399" }, // green
  ];

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div className="flex items-center justify-between rounded-2xl bg-[linear-gradient(90deg,#0b2447,#09203a)] p-4 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-white/70">CreditLens — Overview</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="rounded-md bg-[rgba(255,255,255,0.06)] p-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
            <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          </div>

          <div className="relative">
            <button className="rounded-md bg-[rgba(255,255,255,0.06)] p-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
                />
              </svg>
            </button>
            <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <div className="h-8 w-8 rounded-full bg-[rgba(255,255,255,0.18)]" />
            <div className="text-sm leading-tight">
              <div className="font-medium">Kamal Edirisinghe</div>
              <div className="text-xs text-white/60">Public Customer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main big card (Gauge + Score factors in SAME card) */}
      <section className="rounded-3xl bg-[radial-gradient(circle_at_25%_20%,#0d4a6d_0%,#082a43_48%,#061f34_100%)] p-6 text-white shadow-md">
        <div className="flex items-center justify-center">
          <h3 className="text-lg font-semibold text-white/90">
            Your Credit Risk Score
          </h3>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[420px_1fr]">
          {/* Gauge */}
          <div className="flex items-center justify-center">
            <div className="relative h-[260px] w-full max-w-[420px]">
              <CreditRiskGauge value={score} />
              {/* Center text inside gauge */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-10">
                <div className="text-6xl font-extrabold tracking-tight text-[#fbbf24]">
                  {score}
                </div>
                <div className="mt-2 text-base text-white/80">{riskLabel}</div>
              </div>
            </div>
          </div>

          {/* Factors */}
          <div className="flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-white/90">Score Factors</h4>
            <div className="mt-5">
              <RiskFactorBars factors={factors} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom row (Trend + Tips) */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#0b2a44,#072033)] p-5 text-white shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold">
              Credit risk score in this last 6 months
            </h4>

            <button className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              Show All
              <span aria-hidden>↗</span>
            </button>
          </div>

          <CreditRiskTrendChart />
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0b2a44,#072033)] p-5 text-white shadow-sm">
          {/* subtle lines/pattern */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

          <div className="flex h-full flex-col justify-between">
            <div>
              <h4 className="text-xl font-semibold">
                Decrease your Credit Risk Score
              </h4>
              <p className="mt-2 text-sm text-white/70">
                Understand the key factors increasing your credit risk and how
                they affect your overall score. Follow practical steps to
                reduce liabilities, improve payment behavior, and strengthen
                your financial profile.
              </p>
            </div>

            <div className="mt-6">
              <button className="rounded-md bg-white px-4 py-2 font-medium text-[#072033] hover:bg-white/90">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


