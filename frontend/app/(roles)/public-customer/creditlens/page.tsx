"use client";

import { useRouter } from "next/navigation";
import CreditRiskGauge from "./components/CreditRiskGauge";
import CreditRiskTrendChart from "./components/CreditRiskTrendChart";
import RiskFactorBars from "./components/RiskFactorBars";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";

export default function PublicCustomerCreditLensPage() {
  const router = useRouter();
  const score = 55;
  const riskLabel = "Medium";

  const factors = [
    { name: "Payment history", value: 18, max: 30, color: "#fbbf24" },
    { name: "DTI", value: 12, max: 25, color: "#34d399" },
    { name: "Credit utilization", value: 20, max: 20, color: "#ef4444" },
    { name: "Income stability", value: 0, max: 15, color: "#e5e7eb" },
    { name: "Active Facilities", value: 5, max: 10, color: "#34d399" },
  ];

  return (
    <div className="w-full overflow-x-hidden px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <div className="flex min-h-[calc(100dvh-1.25rem)] flex-col gap-4 sm:gap-5 lg:h-[calc(100dvh-2rem)] lg:min-h-0 lg:overflow-hidden">
        <CreditLensHeader title="Dashboard" subtitle="" name="John Doe" role="Public Customer" />

        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:gap-5 lg:px-2 xl:px-3">
          <section className="creditlens-card creditlens-card-hover creditlens-delay-1 relative overflow-hidden rounded-2xl border border-[#2e7eae]/35 bg-[#0b3252] px-4 pb-4 pt-3 text-white shadow-[0_24px_54px_-34px_rgba(2,18,33,0.88)] sm:px-6 sm:pb-8 sm:pt-4 md:rounded-[26px] lg:min-h-[420px] lg:flex-[1.38] lg:pb-0 xl:min-h-[480px]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "url('/creditlens-main-card-bg.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(8,37,59,0.26)_0%,rgba(8,37,59,0.45)_54%,rgba(8,37,59,0.62)_100%)]" />

          <div className="relative z-10 mt-3 grid min-w-0 gap-6 lg:mt-4 lg:h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
            <div className="flex min-w-0 flex-col items-center justify-start">
              <h3 className="text-lg font-semibold text-white/90 sm:text-xl lg:text-2xl xl:text-3xl">Your Credit Risk Score</h3>

              <div className="mt-4 relative h-[220px] w-full max-w-[360px] sm:h-[250px] sm:max-w-[420px] lg:h-[380px] xl:h-[430px] xl:max-w-[560px]">
                <CreditRiskGauge value={score} />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-10">
                  <div className="text-4xl font-extrabold tracking-tight text-[#fbbf24] sm:text-5xl lg:text-6xl xl:text-7xl">{score}</div>
                  <div className="mt-1 text-base text-white/80 sm:mt-2 sm:text-lg lg:text-xl xl:text-2xl">{riskLabel}</div>
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:flex lg:h-full lg:flex-col lg:pr-6">
              <h4 className="text-center text-lg font-semibold text-white/90 sm:text-xl lg:text-2xl xl:text-3xl">Score Factors</h4>
              <div className="mt-4 min-w-0 lg:mt-0 lg:flex lg:flex-1 lg:items-center">
                <div className="w-full min-w-0">
                  <RiskFactorBars factors={factors} />
                </div>
              </div>
            </div>
          </div>
          </section>

          <section className="creditlens-stagger-2 grid min-w-0 gap-4 md:gap-6 lg:min-h-[260px] lg:flex-[0.58] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:min-h-[290px] ">
            <div className="creditlens-card creditlens-card-hover flex h-full min-w-0 flex-col rounded-2xl border border-[#2d78ab]/30 bg-[linear-gradient(135deg,#0d3555,#082741)] p-4 text-white shadow-[0_22px_46px_-32px_rgba(3,20,34,0.85)] md:rounded-[26px] sm:p-5">
            <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
              <h4 className="min-w-0 truncate text-lg font-semibold sm:text-xl">
                Credit risk score in this last 6 months
              </h4>

              <button
                onClick={() => router.push("/public-customer/creditlens/trends")}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:text-base"
              >
                Show All
                <span aria-hidden>-&gt;</span>
              </button>
            </div>

              <div className="min-h-0 flex-1">
                <CreditRiskTrendChart />
              </div>
            </div>

            <div className="creditlens-card creditlens-card-hover relative flex h-full min-w-0 overflow-hidden rounded-2xl border border-[#3c8fbe]/35 bg-[#0c3354] p-4 text-white shadow-[0_22px_46px_-30px_rgba(2,18,33,0.85)] md:rounded-[26px] sm:p-5">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "url('/creditlens-decrease-card-bg.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(9,34,55,0.38)_0%,rgba(9,34,55,0.58)_58%,rgba(9,34,55,0.8)_100%)]" />

            <div className="relative flex h-full min-w-0 flex-col justify-between">
              <div className="min-w-0">
                <span className="inline-flex rounded-full border border-sky-200/25 bg-sky-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-sky-100">
                  Credit Insight
                </span>
                <h4 className="mt-3 break-words text-xl font-semibold leading-tight sm:text-2xl">
                  Decrease your Credit Risk Score
                </h4>
                <p className="mt-2 text-sm text-white/80 sm:text-base">
                  Understand the key factors increasing your credit risk and how they affect your
                  overall score. Follow practical steps to reduce liabilities, improve payment
                  behavior, and strengthen your financial profile.
                </p>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  onClick={() => router.push("/public-customer/creditlens/insight")}
                  className="rounded-md bg-white px-4 py-2 text-base font-medium text-[#072033] hover:bg-white/90"
                >
                  Learn More
                </button>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

