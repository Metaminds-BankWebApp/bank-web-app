"use client";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Car,
  CheckCircle2,
  FileText,
  GraduationCap,
  Home,
  ShieldCheck,
  User,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { useToast } from "@/src/components/ui";
import ModuleHeader from "@/src/components/ui/module-header";
import { cn } from "@/src/lib/utils";
import { getAdminDashboardSummary } from "@/src/api/admin/dashboard.service";
import { getAdminLoanPolicies } from "@/src/api/admin/loan-policy.service";
import { ApiError } from "@/src/types/api-error";
import type { AdminDashboardSummaryResponse } from "@/src/types/dto/admin-dashboard.dto";
import type {
  AdminLoanPolicyResponse,
  AdminLoanPolicyType,
} from "@/src/types/dto/admin-loan-policy.dto";

type MetricCard = {
  key: keyof AdminDashboardSummaryResponse;
  title: string;
  icon: LucideIcon;
  cardClassName: string;
  titleClassName: string;
  valueClassName: string;
  deltaClassName: string;
  iconClassName: string;
};

type QuickAction = {
  label: string;
  icon: LucideIcon;
  href: string;
};


type ActionTone = "success" | "warning" | "info";

type AdminAction = {
  title: string;
  meta: string;
  icon: LucideIcon;
  tone: ActionTone;
};

type LoanRate = {
  loanType: AdminLoanPolicyType;
  title: string;
  rate: string;
  sinceLabel: string;
  icon: LucideIcon;
};

const metricCardConfig: MetricCard[] = [
  {
    key: "totalUsers",
    title: "TOTAL USERS",
    icon: Users,
    cardClassName: "bg-[#0d3b66]",
    titleClassName: "text-white/70",
    valueClassName: "text-white",
    deltaClassName: "bg-white/20 text-white",
    iconClassName: "bg-white/20 text-white",
  },
  {
    key: "totalBranches",
    title: "TOTAL BRANCHES",
    icon: Building2,
    cardClassName: "bg-[#446892]",
    titleClassName: "text-white/75",
    valueClassName: "text-[#0f2f52]",
    deltaClassName: "text-[#16b186]",
    iconClassName: "bg-[#4c89a5] text-[#5be0ca]",
  },
  {
    key: "totalOfficers",
    title: "TOTAL OFFICERS",
    icon: UserPlus,
    cardClassName: "bg-[#6f8fb6]",
    titleClassName: "text-white/80",
    valueClassName: "text-[#13365f]",
    deltaClassName: "text-[#16b186]",
    iconClassName: "bg-[#6a9bb4] text-[#44d3be]",
  },
  {
    key: "totalTransactions",
    title: "TRANSACTION",
    icon: Wallet,
    cardClassName: "bg-[#9fb1c9]",
    titleClassName: "text-white/85",
    valueClassName: "text-[#15375f]",
    deltaClassName: "text-[#16b186]",
    iconClassName: "bg-[#d4dde9] text-[#f59e0b]",
  },
];

const quickActions: QuickAction[] = [
  { label: "NEW BRANCH", icon: Building2, href: "/admin/branch-management/add" },
  { label: "NEW OFFICER", icon: UserPlus, href: "/admin/bank-officer-management/add" },
  { label: "AUDIT LOG", icon: FileText, href: "/admin/audit-logs" },
  { label: "POLICY", icon: ShieldCheck, href: "/admin/policy-management" },
];

const adminActions: AdminAction[] = [
  {
    title: 'Approved Branch Creation: "North Wing Capital"',
    meta: "2 hours ago â€¢ by Kamal Edirisinghe",
    icon: CheckCircle2,
    tone: "success",
  },
  {
    title: 'Flagged User Account: "ID-12451" for suspicious activity',
    meta: "5 hours ago â€¢ System Audit",
    icon: AlertTriangle,
    tone: "warning",
  },
  {
    title: "Updated System Security Protocols",
    meta: "Yesterday at 4:30 PM â€¢ Maintenance Team",
    icon: ShieldCheck,
    tone: "info",
  },
];

const loanTypeOrder: AdminLoanPolicyType[] = [
  "PERSONAL",
  "VEHICLE",
  "EDUCATION",
  "HOUSING",
];

const loanTypeTitleMap: Record<AdminLoanPolicyType, string> = {
  PERSONAL: "Personal Loan",
  VEHICLE: "Vehicle Loan",
  EDUCATION: "Educational Loan",
  HOUSING: "Housing Loan",
};

const loanTypeIconMap: Record<AdminLoanPolicyType, LucideIcon> = {
  PERSONAL: User,
  VEHICLE: Car,
  EDUCATION: GraduationCap,
  HOUSING: Home,
};

function formatInterestRate(value: number): string {
  if (Number.isNaN(value)) {
    return "-";
  }

  const hasFraction = Math.abs(value % 1) > 0;
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  })}%`;
}

function formatPolicySinceDate(createdAt: string | null, updatedAt: string | null): string {
  const source = createdAt ?? updatedAt;
  if (!source) {
    return "Since -";
  }

  const parsed = new Date(source);
  if (Number.isNaN(parsed.getTime())) {
    return `Since ${source}`;
  }

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);

  return `Since ${formatted}`;
}

function mapLoanPoliciesToRates(policies: AdminLoanPolicyResponse[]): LoanRate[] {
  const policyMap = new Map<AdminLoanPolicyType, AdminLoanPolicyResponse>();
  policies.forEach((policy) => {
    policyMap.set(policy.loanType, policy);
  });

  return loanTypeOrder.map((loanType) => {
    const policy = policyMap.get(loanType);
    return {
      loanType,
      title: loanTypeTitleMap[loanType],
      rate: policy ? formatInterestRate(Number(policy.baseInterestRate)) : "-",
      sinceLabel: policy ? formatPolicySinceDate(policy.createdAt, policy.updatedAt) : "Since -",
      icon: loanTypeIconMap[loanType],
    };
  });
}

const actionToneClass: Record<ActionTone, string> = {
  success: "bg-[#d8f4e7] text-[#1c8c69]",
  warning: "bg-[#fbefd9] text-[#d28725]",
  info: "bg-[#e6e9ff] text-[#6363d9]",
};

export default function DashboardPage() {
  const { showToast } = useToast();
  const [customerType, setCustomerType] = useState<"ALL" | "BANK" | "PUBLIC">("ALL");
  const [dashboardSummary, setDashboardSummary] = useState<AdminDashboardSummaryResponse | null>(
    null
  );
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [loanRates, setLoanRates] = useState<LoanRate[]>(() =>
    mapLoanPoliciesToRates([])
  );
  const [isLoanRatesLoading, setIsLoanRatesLoading] = useState(true);
  const customerTypes: Array<"ALL" | "BANK" | "PUBLIC"> = ["ALL", "BANK", "PUBLIC"];

  useEffect(() => {
    let mounted = true;

    const loadDashboardSummary = async () => {
      setIsSummaryLoading(true);
      try {
        const data = await getAdminDashboardSummary();
        if (!mounted) {
          return;
        }
        setDashboardSummary(data);
      } catch (error) {
        if (!mounted) {
          return;
        }
        const message =
          error instanceof ApiError
            ? error.message
            : "Failed to load admin dashboard summary.";
        showToast({
          type: "error",
          title: "Dashboard load failed",
          description: message,
        });
      } finally {
        if (mounted) {
          setIsSummaryLoading(false);
        }
      }
    };

    void loadDashboardSummary();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  useEffect(() => {
    let mounted = true;

    const loadLoanPolicies = async () => {
      setIsLoanRatesLoading(true);
      try {
        const data = await getAdminLoanPolicies();
        if (!mounted) {
          return;
        }
        setLoanRates(mapLoanPoliciesToRates(data));
      } catch (error) {
        if (!mounted) {
          return;
        }
        const message =
          error instanceof ApiError
            ? error.message
            : "Failed to load loan policy interest rates.";
        showToast({
          type: "error",
          title: "Loan rate load failed",
          description: message,
        });
        setLoanRates(mapLoanPoliciesToRates([]));
      } finally {
        if (mounted) {
          setIsLoanRatesLoading(false);
        }
      }
    };

    void loadLoanPolicies();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  const metricCards = useMemo(
    () =>
      metricCardConfig.map((card) => {
        const rawValue = dashboardSummary?.[card.key];
        const value = isSummaryLoading
          ? "..."
          : typeof rawValue === "number"
          ? rawValue.toLocaleString()
          : "-";

        return {
          ...card,
          value,
          delta: isSummaryLoading ? "Syncing..." : "Live",
        };
      }),
    [dashboardSummary, isSummaryLoading]
  );

  const chartValues = {
    ALL: [30, 48, 62, 100, 72, 52],
    BANK: [20, 35, 50, 80, 60, 40],
    PUBLIC: [10, 25, 40, 60, 50, 30],
  };

  const chartData = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    datasets: [
      {
        label: "Users",
        data: chartValues[customerType],
        backgroundColor: ["#8fa3b7", "#8fa3b7", "#8fa3b7", "#0d3b66", "#8fa3b7", "#8fa3b7"],
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0d3b66",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            return `Users: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#95a4b8" },
      },
      y: {
        grid: { color: "#e7ebf2" },
        ticks: { display: false },
      },
    },
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex flex-col lg:flex-row h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        {/* Sidebar: hidden on mobile, visible on lg+ */}
        <Sidebar role="ADMIN" className="max-lg:hidden  h-full z-10 relative" />

        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl p-2 sm:p-4 md:p-6 lg:p-7">
          <div className="shrink-0 mb-5">
            <ModuleHeader
              title="Dashboard"
              theme="staff"
              menuMode="sidebar-overlay"
              sidebarRole="ADMIN"
              sidebarHideCollapse
              mailBadge={2}
              notificationBadge={8}
              name="Kamal Edirisinghe"
              role="Admin"
              avatarStatusDot
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
            />
          </div>
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-8">
            {/* Metric Cards: responsive grid */}
            <section className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className={cn(
                      "rounded-2xl p-4 shadow-[0_16px_26px_-20px_rgba(11,43,89,0.85)]",
                      card.cardClassName
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                          card.iconClassName
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <ArrowUpRight size={16} className="text-white/45" />
                    </div>
                    <p className={cn("mt-8 text-xs font-semibold tracking-wide", card.titleClassName)}>
                      {card.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className={cn("text-2xl font-bold leading-none", card.valueClassName)}>{card.value}</p>
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", card.deltaClassName)}>
                        {card.delta}
                      </span>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Monthly User Growth & Quick Management: responsive grid */}
            <section className="mt-6 grid gap-6 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-3xl border border-[#e3e7ee] bg-white p-4 sm:p-5">
                <div className="grid gap-6 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px]">
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold leading-tight text-[#102f52]">Monthly User Growth</h3>
                        <p className="text-xs sm:text-sm text-[#a3afbf]">User onboarding and retention across 6 months</p>
                      </div>
                      <button className="rounded-xl bg-[#f3f4f6] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#223f5f]">
                        6 Months
                      </button>
                    </div>
                    <div className="relative mt-5 h-[180px] sm:h-[220px] rounded-2xl border border-[#edf1f6] bg-[#f9fbff] p-2 sm:p-4 overflow-x-auto">
                      <Bar data={chartData} options={chartOptions} />
                    </div>
                  </div>
                  <div className="xl:border-l xl:border-[#edf1f6] xl:pl-6">
                    <h4 className="text-lg sm:text-xl font-semibold leading-tight text-[#111111]">Customer Type</h4>
                    <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
                      {customerTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setCustomerType(type)}
                          className={cn(
                            "w-full rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition",
                            customerType === type
                              ? "bg-[#0d3b66] text-white"
                              : "border border-[#5f7fa3] bg-white text-[#1a2c40]"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-[linear-gradient(180deg,#0b3a63_0%,#0a3157_70%,#0a4b67_100%)] p-4 sm:p-6 text-white shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold leading-tight">Quick Access</h3>
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="rounded-xl bg-[#1a4a77]/80 p-2 sm:p-3 text-center transition hover:bg-[#205486]"
                      >
                        <Icon size={18} className="mx-auto text-[#3cd1c4]" />
                        <p className="mt-2 sm:mt-3 text-xs font-semibold tracking-wide">{action.label}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Recent Admin Actions & Loan Rates: responsive grid */}
            <section className="mt-6 grid gap-6 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="rounded-3xl border border-[#e3e7ee] bg-white p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold leading-tight text-[#0f2f52]">Recent Admin Actions - within 6 hours</h3>
                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                  {adminActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <div key={action.title} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <span
                          className={cn(
                            "mt-1 inline-flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-lg",
                            actionToneClass[action.tone]
                          )}
                        >
                          <Icon size={16} />
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-medium leading-tight text-[#1e4169]">{action.title}</p>
                          <p className="mt-1 text-xs sm:text-sm text-[#a0adbd]">{action.meta}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-3xl border border-[#e3e7ee] bg-white p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold leading-tight text-[#0f2f52]">Current Loan Interest Rate</h3>
                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                  {loanRates.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.loanType} className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Icon size={19} className="mt-1 text-[#111111]" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium leading-tight text-[#1e4169]">{item.title}</p>
                            <p className="text-xs sm:text-sm text-[#a4afbe]">
                              {isLoanRatesLoading ? "Syncing..." : item.sinceLabel}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg sm:text-xl font-semibold text-[#24486f]">
                          {isLoanRatesLoading ? "..." : item.rate}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

