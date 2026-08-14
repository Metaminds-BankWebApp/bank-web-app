"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CreditRiskGauge from "./components/CreditRiskGauge";
import CreditRiskTrendChart from "./components/CreditRiskTrendChart";
import RiskFactorBars from "./components/RiskFactorBars";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { getPublicCreditDashboard } from "@/src/api/creditlens/public-creditlens.service";
import { getCreditLensRiskScoreTextClass } from "@/src/lib/creditlens-risk";
import type { CreditDashboardResponse } from "@/src/types/dto/public-creditlens.dto";

/**
 * Public-customer CreditLens dashboard landing page.
 */
export default function PublicCustomerCreditLensPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<CreditDashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loads CreditLens dashboard data from the backend.
  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPublicCreditDashboard();
      setDashboard(response);
    } catch (unknownError) {
      const message = unknownError instanceof Error
        ? unknownError.message
        : "Unable to load your CreditLens dashboard.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  // Memoizes dashboard factors for stable rendering.
  const factors = useMemo(
    () =>
      dashboard?.factors.map((factor) => ({
        name: factor.name,
        value: factor.value,
        max: factor.max,
        color: factor.colorHex,
        infoTooltip: factor.infoTooltip ?? undefined,
      })) ?? [],
    [dashboard],
  );

  return (
    <div className="w-full overflow-x-hidden px-1 pt-2 sm:px-2 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <div className="flex min-h-full flex-col gap-4 pb-4 sm:gap-5 lg:h-full lg:min-h-0">
        <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Dashboard" />

        {isLoading && !dashboard ? (
          <StateCard
            title="Loading CreditLens dashboard"
            description="Pulling your latest credit evaluation, score factors, and recent trend."
          />
        ) : error && !dashboard ? (
          <StateCard
            title="Could not load CreditLens"
            description={error}
            actionLabel="Try Again"
            onAction={() => void loadDashboard()}
          />
        ) : dashboard ? (
          <div className="flex min-h-0 flex-col gap-4 lg:px-2 xl:px-3">
            <section className="creditlens-card creditlens-card-hover creditlens-delay-1 relative overflow-hidden rounded-2xl border border-[#66a8d0]/35 bg-[#14517c] px-4 pb-4 pt-3 text-white shadow-[0_24px_44px_-30px_rgba(2,18,33,0.82)] sm:px-6 sm:pb-8 sm:pt-4 md:rounded-[26px] lg:min-h-[340px] lg:pb-3 xl:min-h-[370px]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "url('/creditlens-main-card-bg.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,56,87,0.18)_0%,rgba(14,56,87,0.28)_56%,rgba(14,56,87,0.4)_100%)]" />

              <div className="relative z-10 mt-3 grid min-w-0 gap-5 lg:mt-2 lg:h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 xl:gap-8">
                <div className="flex min-w-0 flex-col items-center justify-start">
                  <h3 className="text-lg font-semibold text-white/90 sm:text-xl lg:text-2xl">Your Credit Risk Score</h3>

                  <div className="relative mt-3 h-[220px] w-full max-w-[360px] sm:h-[250px] sm:max-w-[420px] lg:h-[300px] lg:max-w-[440px] xl:h-[330px] xl:max-w-[500px]">
                    <CreditRiskGauge value={dashboard.score} riskLabel={dashboard.riskLabel} />

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-8 lg:pb-7">
                      <div className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl ${getCreditLensRiskScoreTextClass(dashboard.riskLabel)}`}>
                        {dashboard.score}
                      </div>
                      <div className="mt-1 text-base text-white/80 sm:mt-2 sm:text-lg xl:text-xl">
                        {dashboard.riskLabel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 lg:flex lg:h-full lg:flex-col lg:pr-2 xl:pr-4">
                  <h4 className="text-center text-lg font-semibold text-white/90 sm:text-xl lg:text-2xl">Score Factors</h4>
                  <div className="mt-4 min-w-0 lg:mt-0 lg:flex lg:flex-1 lg:items-center">
                    <div className="w-full min-w-0">
                      <RiskFactorBars factors={factors} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="creditlens-stagger-2 grid min-w-0 gap-4 lg:min-h-[230px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:min-h-[250px]">
              <div className="creditlens-card creditlens-card-hover flex h-full min-w-0 flex-col rounded-2xl border border-[#2d78ab]/30 bg-[linear-gradient(135deg,#0d3555,#082741)] p-4 text-white shadow-[0_22px_46px_-32px_rgba(3,20,34,0.85)] md:rounded-[26px] sm:p-5 lg:p-4">
                <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
                  <h4 className="min-w-0 truncate text-lg font-semibold sm:text-xl">
                    Credit risk score in this last 6 months
                  </h4>

                  <Button
                    variant="ghost"
                    onClick={() => router.push("/public-customer/creditlens/trends")}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:text-base"
                  >
                    Show All
                    <span aria-hidden>-&gt;</span>
                  </Button>
                </div>

                <div className="min-h-0 flex-1">
                  <CreditRiskTrendChart
                    labels={dashboard.recentTrend.labels}
                    values={dashboard.recentTrend.values}
                  />
                </div>
              </div>

              <div className="creditlens-card creditlens-card-hover relative flex h-full min-w-0 overflow-hidden rounded-2xl border border-[#66a8d0]/35 bg-[#14517c] p-4 text-white shadow-[0_24px_44px_-30px_rgba(2,18,33,0.82)] md:rounded-[26px] sm:p-5 lg:p-4">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: "url('/creditlens-decrease-card-bg.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,56,87,0.18)_0%,rgba(14,56,87,0.28)_56%,rgba(14,56,87,0.4)_100%)]" />

                <div className="relative flex h-full min-w-0 flex-col justify-center gap-5 sm:gap-6 lg:gap-5">
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full border border-sky-200/25 bg-sky-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-sky-100">
                      Credit Insight
                    </span>
                    <h4 className="mt-3 break-words text-xl font-semibold leading-tight sm:text-2xl">
                      {dashboard.insightTitle}
                    </h4>
                    <p className="mt-2 text-sm text-white/80 sm:text-base">
                      {dashboard.insightDescription}
                    </p>
                  </div>

                  <div>
                    <Button
                      onClick={() => router.push("/public-customer/creditlens/insight")}
                      className="rounded-md bg-white px-4 py-2 text-base font-medium text-[#072033] hover:bg-white/90"
                    >
                      {dashboard.insightActionLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <StateCard
            title="No CreditLens data yet"
            description="Submit your financial application to generate your first CreditLens evaluation."
          />
        )}
      </div>
    </div>
  );
}

/**
 * Reusable empty, loading, and error state shell for the dashboard.
 */
function StateCard({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 lg:px-2 xl:px-3">
      <div className="creditlens-card flex w-full items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-[0_20px_55px_-35px_rgba(2,44,67,0.35)] md:rounded-[26px]">
        <div className="max-w-xl space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
          {actionLabel && onAction ? (
            <Button onClick={onAction} className="mt-2 rounded-xl bg-[#14517c] px-5 text-white hover:bg-[#103f61]">
              {actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
