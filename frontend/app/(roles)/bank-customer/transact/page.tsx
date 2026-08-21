"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  ChartOptions
} from "chart.js";
import type { ScriptableContext } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import ModuleHeader from "@/src/components/ui/module-header";
import { Card } from "@/components/ui/card";
import { authService } from "@/src/api/auth/auth.service";
import { transactionService } from "@/src/api/transact/transaction.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

/* =======================
   Line Chart Config
======================= */

const DEFAULT_TIMELINE_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DEFAULT_TIMELINE_VALUES = [1500, 2200, 1800, 2900, 2400, 3100, 3800, 2500, 3900, 2800, 3500, 2100];

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#094151",
      displayColors: false,
      callbacks: { label: (c) => `LKR ${c.raw}` }
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#9ca3af", font: { size: 10 } }
    },
    y: {
      beginAtZero: true,
      grid: { color: "#f1f5f9" },
      ticks: {
        maxTicksLimit: 6,
        callback: (val) =>
          (val as number) >= 1000 ? `${(val as number) / 1000}k` : val,
      },
      border: { display: false },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  }
};

/* =======================
   Doughnut Chart Config
======================= */

const doughnutOptions: ChartOptions<"doughnut"> = {
  cutout: "75%",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#094151",
      displayColors: true,
      padding: 10,
    }
  }
};

/* =======================
   Component
======================= */

export default function TransactDashboard() {
  const [bankCustomerId, setBankCustomerId] = useState<number | null>(null);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [totalTransactions, setTotalTransactions] = useState<number | null>(null);
  const [totalSent, setTotalSent] = useState<number | null>(null);
  const [totalReceived, setTotalReceived] = useState<number | null>(null);
  const [timelineLabels, setTimelineLabels] = useState<string[]>(DEFAULT_TIMELINE_LABELS);
  const [timelineValues, setTimelineValues] = useState<number[]>(DEFAULT_TIMELINE_VALUES);
  const [statusSummary, setStatusSummary] = useState({
    successCount: 0,
    failedCount: 0,
    pendingOtpCount: 0,
    cancelledCount: 0,
  });
  const [otpSummary, setOtpSummary] = useState({
    sentCount: 0,
    verifiedCount: 0,
    expiredCount: 0,
    failedCount: 0,
  });
  const [savedBeneficiaries, setSavedBeneficiaries] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const resolveLoggedInCustomer = async () => {
      try {
        const me = await authService.me();
        if (isCancelled) {
          return;
        }

        if (!me.bankCustomerId) {
          throw new Error("Bank customer profile was not found for the logged-in user.");
        }

        setBankCustomerId(me.bankCustomerId);
        setBalanceError("");
      } catch (error) {
        if (isCancelled) {
          return;
        }
        const message = error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "Unable to resolve logged-in bank customer.";
        setBalanceError(message);
        setIsBalanceLoading(false);
      }
    };

    void resolveLoggedInCustomer();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!bankCustomerId) {
      return;
    }

    let isCancelled = false;

    const loadDashboardCards = async (showLoading: boolean) => {
      try {
        if (showLoading) {
          setIsBalanceLoading(true);
        }

        const data = await transactionService.getDashboardSummary();
        if (isCancelled) {
          return;
        }

        const parsedBalance = Number(data.currentBalance);
        const parsedTotalTransactions = Number(data.totalTransactions);
        const parsedTotalSent = Number(data.totalSent);
        const parsedTotalReceived = Number(data.totalReceived);

        const nextTimelineLabels = Array.isArray(data.timeline?.labels) && data.timeline.labels.length > 0
          ? data.timeline.labels
          : DEFAULT_TIMELINE_LABELS;
        const rawTimelineValues = Array.isArray(data.timeline?.values) && data.timeline.values.length > 0
          ? data.timeline.values
          : DEFAULT_TIMELINE_VALUES;
        const parsedTimelineValues = rawTimelineValues.map((value) => {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? parsed : 0;
        });
        const timelineSize = Math.min(nextTimelineLabels.length, parsedTimelineValues.length);

        setCurrentBalance(Number.isFinite(parsedBalance) ? parsedBalance : 0);
        setTotalTransactions(Number.isFinite(parsedTotalTransactions) ? parsedTotalTransactions : 0);
        setTotalSent(Number.isFinite(parsedTotalSent) ? parsedTotalSent : 0);
        setTotalReceived(Number.isFinite(parsedTotalReceived) ? parsedTotalReceived : 0);
        setTimelineLabels(nextTimelineLabels.slice(0, timelineSize));
        setTimelineValues(parsedTimelineValues.slice(0, timelineSize));
        setStatusSummary({
          successCount: Number(data.transactionStatus?.successCount ?? 0),
          failedCount: Number(data.transactionStatus?.failedCount ?? 0),
          pendingOtpCount: Number(data.transactionStatus?.pendingOtpCount ?? 0),
          cancelledCount: Number(data.transactionStatus?.cancelledCount ?? 0),
        });
        setOtpSummary({
          sentCount: Number(data.otpStatus?.sentCount ?? 0),
          verifiedCount: Number(data.otpStatus?.verifiedCount ?? 0),
          expiredCount: Number(data.otpStatus?.expiredCount ?? 0),
          failedCount: Number(data.otpStatus?.failedCount ?? 0),
        });
        setSavedBeneficiaries(Number(data.savedBeneficiaries ?? 0));
        setAccountNumber((data.accountNumber ?? "").trim());
        setBalanceError("");
      } catch (error) {
        if (isCancelled) {
          return;
        }
        const message = error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "Unable to load dashboard card data.";
        setBalanceError(message);
      } finally {
        if (!isCancelled) {
          setIsBalanceLoading(false);
        }
      }
    };

    void loadDashboardCards(true);
    const refreshIntervalId = window.setInterval(() => {
      void loadDashboardCards(false);
    }, 15000);

    return () => {
      isCancelled = true;
      window.clearInterval(refreshIntervalId);
    };
  }, [bankCustomerId]);

  const formattedCurrentBalance = useMemo(() => {
    if (currentBalance === null) {
      return "--";
    }
    return new Intl.NumberFormat("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(currentBalance);
  }, [currentBalance]);

  const formattedTotalTransactions = useMemo(() => {
    if (totalTransactions === null) {
      return "--";
    }
    return new Intl.NumberFormat("en-LK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalTransactions);
  }, [totalTransactions]);

  const formattedTotalSent = useMemo(() => {
    if (totalSent === null) {
      return "--";
    }
    return new Intl.NumberFormat("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalSent);
  }, [totalSent]);

  const formattedTotalReceived = useMemo(() => {
    if (totalReceived === null) {
      return "--";
    }
    return new Intl.NumberFormat("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalReceived);
  }, [totalReceived]);

  const lineChartData = useMemo(() => ({
    labels: timelineLabels,
    datasets: [
      {
        fill: true,
        label: "Transactions",
        data: timelineValues,
        borderColor: "#0e4f62",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx as CanvasRenderingContext2D;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(14,79,98,0.5)");
          gradient.addColorStop(1, "rgba(14,79,98,0.0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  }), [timelineLabels, timelineValues]);

  const doughnutData = useMemo(() => ({
    labels: ["Success", "Failed", "Pending OTP", "Cancelled"],
    datasets: [
      {
        data: [
          Math.max(0, statusSummary.successCount),
          Math.max(0, statusSummary.failedCount),
          Math.max(0, statusSummary.pendingOtpCount),
          Math.max(0, statusSummary.cancelledCount),
        ],
        backgroundColor: ["#399FD8", "#0B3E5A", "#0e4f62", "#7dd3fc"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }), [statusSummary.cancelledCount, statusSummary.failedCount, statusSummary.pendingOtpCount, statusSummary.successCount]);

  const currentBalanceNote = balanceError
    ? balanceError
    : accountNumber
      ? `A/C ${accountNumber}`
      : "Your linked account";

  const statsCards = [
    {
      title: "Current Balance",
      amount: isBalanceLoading ? "--" : formattedCurrentBalance,
      variant: "dark",
      note: currentBalanceNote,
      noteIsError: balanceError.length > 0,
      live: true,
      showCurrencyPrefix: true,
    },
    {
      title: "Total Sent",
      amount: isBalanceLoading ? "--" : formattedTotalSent,
      variant: "light",
      note: "",
      live: true,
      showCurrencyPrefix: true,
    },
    {
      title: "Total Received",
      amount: isBalanceLoading ? "--" : formattedTotalReceived,
      variant: "light",
      note: "",
      live: true,
      showCurrencyPrefix: true,
    },
    {
      title: "Total Transactions",
      amount: isBalanceLoading ? "--" : formattedTotalTransactions,
      variant: "light",
      note: "",
      live: true,
      showCurrencyPrefix: false,
    },
  ];

  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="bg-transparent px-4 py-4 sm:px-8 sm:py-6">
        <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Dashboard"  name="John Deo" />

        <section className=" max-w-full mx-auto mt-8">

          <Card className="transact-card transact-creditlens-shade creditlens-delay-1 w-full rounded-xl p-6 sm:p-8 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">

            {/* =======================
                Stats Section
            ======================= */}
            <div className="creditlens-stagger-4 mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">

              {statsCards.map((item, index) => (
                <div
                  key={index}
                  className={`transact-card transact-card-hover rounded-2xl p-4 sm:p-6 min-h-[120px] sm:min-h-[150px] flex flex-col justify-between ${
                    item.variant === "dark"
                      ? "border border-[#061e3d]/25 bg-[linear-gradient(150deg,#061e3d_0%,#0a3046_100%)] text-white shadow-[0_20px_44px_-32px_rgba(2,18,33,0.78)]"
                      : "border border-cyan-200 bg-cyan-50 text-[#0e4f62] shadow-[0_20px_44px_-32px_rgba(14,79,98,0.3)]"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm font-medium opacity-90">
                        {item.title}
                      </span>
                      {item.live ? (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                            item.variant === "dark"
                              ? "border-emerald-300/60 bg-emerald-400/15 text-emerald-100"
                              : "border-emerald-300 bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          Live
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 text-left sm:text-right">
                    {item.showCurrencyPrefix ? (
                      <span className="text-xs opacity-70 block sm:inline sm:mr-1">LKR</span>
                    ) : null}
                    <span className="text-2xl sm:text-3xl font-bold block sm:inline">
                      {item.amount}
                    </span>
                    {item.note ? (
                      <p
                        className={`mt-2 text-xs ${
                          item.variant === "dark"
                            ? item.noteIsError
                              ? "text-red-200"
                              : "text-slate-200/80"
                            : item.noteIsError
                              ? "text-red-600"
                              : "text-slate-500"
                        }`}
                      >
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* =======================
                Charts Section
            ======================= */}
            <div className="creditlens-stagger-2 mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">

              {/* Line Chart */}
              <div className="transact-card transact-card-hover transact-creditlens-shade md:col-span-2 lg:col-span-2 rounded-3xl p-5 sm:p-8">
                <h2 className="text-lg font-bold text-[#0e4f62] mb-6">
                  Transaction Timeline
                </h2>

                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px]">
                  <Line options={lineOptions} data={lineChartData} />
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className="transact-card transact-card-hover transact-creditlens-shade flex flex-col items-center rounded-3xl p-5 sm:p-8">
                <h2 className="w-full text-left text-lg font-bold text-[#0e4f62] mb-6">
                  Transaction Status
                </h2>

                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl sm:text-3xl font-bold text-[#0e4f62]">
                      {formattedTotalTransactions}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Transactions
                    </span>
                  </div>
                </div>

                <div className="w-full mt-10 grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Success", value: statusSummary.successCount, color: "bg-[#399FD8]" },
                    { label: "Failed", value: statusSummary.failedCount, color: "bg-[#0B3E5A]" },
                    { label: "Pending OTP", value: statusSummary.pendingOtpCount, color: "bg-[#0e4f62]" },
                    { label: "Cancelled", value: statusSummary.cancelledCount, color: "bg-sky-300" },
                  ].map((status) => (
                    <div key={status.label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                      <span className="flex items-center gap-2 font-medium text-[#0e4f62]">
                        <span className={`h-2.5 w-2.5 rounded-full ${status.color}`} />
                        {status.label}
                      </span>
                      <span className="font-semibold text-slate-600">{status.value}</span>
                    </div>
                  ))}
                  <div className="col-span-2 flex justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <span className="font-medium text-[#0e4f62]">Saved Beneficiaries</span>
                    <span className="font-semibold text-slate-600">{savedBeneficiaries}</span>
                  </div>
                  <div className="col-span-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                    OTP logs: Sent {otpSummary.sentCount} | Verified {otpSummary.verifiedCount} | Expired {otpSummary.expiredCount} | Failed {otpSummary.failedCount}
                  </div>
                </div>
              </div>

            </div>

          </Card>

        </section>
      </div>
    </AuthGuard>
  );
}
