"use client";

import { useRouter } from "next/navigation";
import CreditRiskGauge from "./components/CreditRiskGauge";
import CreditRiskTrendChart from "./components/CreditRiskTrendChart";
import RiskFactorBars from "./components/RiskFactorBars";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";

export default function PublicCustomerCreditLensPage() {
  const router = useRouter();

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
    <div className="space-y-3 mt-4 ml-4 mr-4">
      <CreditLensHeader
        title="Dashboard"
        subtitle=""
        name="John Doe"
        role="Public Customer"
      />


      {/* Main big card (Gauge + Score factors in SAME card) */}
      <section className="rounded-3xl bg-[radial-gradient(circle_at_25%_20%,#0d4a6d_0%,#082a43_48%,#061f34_100%)] pt-1 pb-0 pr-4 pl-4 text-white shadow-md mr-4 ml-4">
        

        <div className="mt-6 grid gap-10 lg:grid-cols-[550px_1fr]">
  {/* LEFT: Score */}
  <div className="flex flex-col items-center justify-center">
    <h3 className=" text-lg font-semibold text-white/90">
      Your Credit Risk Score
    </h3>

    <div className="relative h-[260px] w-full max-w-[420px]">
      <CreditRiskGauge value={score} />

      {/* Center text inside gauge */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-10">
        <div className="text-4xl font-extrabold tracking-tight text-[#fbbf24]">
          {score}
        </div>
        <div className="mt-2 text-base text-white/80">{riskLabel}</div>
      </div>
    </div>
  </div>

  {/* RIGHT: Score Factors */}
  <div className="flex flex-col justify-center pr-10">
    <h4 className="mb-3 text-center text-lg font-semibold text-white/90">
      Score Factors
    </h4>

    <div className="mt-2">
      <RiskFactorBars factors={factors} />
    </div>
  </div>
</div>

      </section>

      {/* Bottom row (Trend + Tips) */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mr-4 ml-4">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#0b2a44,#072033)] p-4 text-white shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold">
              Credit risk score in this last 6 months
            </h4>

            <button 
              onClick={() => router.push("/public-customer/creditlens/trends")}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              Show All
              <span aria-hidden>↗</span>
            </button>
          </div>

          <CreditRiskTrendChart />
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0b2a44,#072033)] p-4 text-white shadow-sm">
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
              <button 
                onClick={() => router.push("/public-customer/creditlens/insight")}
                className="rounded-md bg-white px-4 py-2 font-medium text-[#072033] hover:bg-white/90"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


