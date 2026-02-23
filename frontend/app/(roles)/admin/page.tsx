"use client";

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
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { cn } from "@/src/lib/utils";

type MetricCard = {
  title: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  cardClassName: string;
  titleClassName: string;
  valueClassName: string;
  deltaClassName: string;
  iconClassName: string;
};

type GrowthBar = {
  month: string;
  back: number;
  front: number;
  active?: boolean;
};

type QuickAction = {
  label: string;
  icon: LucideIcon;
};

type ActionTone = "success" | "warning" | "info";

type AdminAction = {
  title: string;
  meta: string;
  icon: LucideIcon;
  tone: ActionTone;
};

type LoanRate = {
  title: string;
  rate: string;
  icon: LucideIcon;
};

const metricCards: MetricCard[] = [
  {
    title: "TOTAL USERS",
    value: "128.4k",
    delta: "+12%",
    icon: Users,
    cardClassName: "bg-[#0d3b66]",
    titleClassName: "text-white/70",
    valueClassName: "text-white",
    deltaClassName: "bg-white/20 text-white",
    iconClassName: "bg-white/20 text-white",
  },
  {
    title: "TOTAL BRANCHES",
    value: "42",
    delta: "+2 new",
    icon: Building2,
    cardClassName: "bg-[#446892]",
    titleClassName: "text-white/75",
    valueClassName: "text-[#0f2f52]",
    deltaClassName: "text-[#16b186]",
    iconClassName: "bg-[#4c89a5] text-[#5be0ca]",
  },
  {
    title: "TOTAL OFFICERS",
    value: "542",
    delta: "+2 new",
    icon: UserPlus,
    cardClassName: "bg-[#6f8fb6]",
    titleClassName: "text-white/80",
    valueClassName: "text-[#13365f]",
    deltaClassName: "text-[#16b186]",
    iconClassName: "bg-[#6a9bb4] text-[#44d3be]",
  },
  {
    title: "TRANSACTION",
    value: "456",
    delta: "+8.2%",
    icon: Wallet,
    cardClassName: "bg-[#9fb1c9]",
    titleClassName: "text-white/85",
    valueClassName: "text-[#15375f]",
    deltaClassName: "text-[#16b186]",
    iconClassName: "bg-[#d4dde9] text-[#f59e0b]",
  },
];

const growthData: GrowthBar[] = [
  { month: "JAN", back: 56, front: 30 },
  { month: "FEB", back: 70, front: 48 },
  { month: "MAR", back: 84, front: 62 },
  { month: "APR", back: 96, front: 100, active: true },
  { month: "MAY", back: 90, front: 72 },
  { month: "JUN", back: 76, front: 52 },
];

const quickActions: QuickAction[] = [
  { label: "NEW BRANCH", icon: Building2 },
  { label: "NEW OFFICER", icon: UserPlus },
  { label: "AUDIT LOG", icon: FileText },
  { label: "POLICY", icon: ShieldCheck },
];

const adminActions: AdminAction[] = [
  {
    title: 'Approved Branch Creation: "North Wing Capital"',
    meta: "2 hours ago • by Kamal Edirisinghe",
    icon: CheckCircle2,
    tone: "success",
  },
  {
    title: 'Flagged User Account: "ID-12451" for suspicious activity',
    meta: "5 hours ago • System Audit",
    icon: AlertTriangle,
    tone: "warning",
  },
  {
    title: "Updated System Security Protocols",
    meta: "Yesterday at 4:30 PM • Maintenance Team",
    icon: ShieldCheck,
    tone: "info",
  },
];

const loanRates: LoanRate[] = [
  { title: "Personal Loan", rate: "17%", icon: User },
  { title: "Vehicle Loan", rate: "15%", icon: Car },
  { title: "Educational Loan", rate: "12%", icon: GraduationCap },
  { title: "Housing Loan", rate: "10%", icon: Home },
];

const actionToneClass: Record<ActionTone, string> = {
  success: "bg-[#d8f4e7] text-[#1c8c69]",
  warning: "bg-[#fbefd9] text-[#d28725]",
  info: "bg-[#e6e9ff] text-[#6363d9]",
};

export default function DashboardPage() {
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
         <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />

        <main className="flex-1 flex flex-col overflow-hidden bg-[#f3f4f7] lg:rounded-l-[28px]">
          <div className="shrink-0 p-4 sm:p-6 lg:p-8">
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
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+Edirisinghe&background=0D3B66&color=fff"
            />
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
            <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
            
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8" />
            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-3xl border border-[#e3e7ee] bg-white p-5">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_220px]">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold leading-tight text-[#102f52]">Monthly User Growth</h3>
                        <p className="text-sm text-[#a3afbf]">User onboarding and retention across 6 months</p>
                      </div>
                      <button className="rounded-xl bg-[#f3f4f6] px-4 py-2 text-sm font-semibold text-[#223f5f]">
                        6 Months
                      </button>
                    </div>

                    <div className="relative mt-5 h-[220px] rounded-2xl border border-[#edf1f6] bg-[#f9fbff] px-2 pb-9 pt-5">
                      <div className="pointer-events-none absolute inset-x-2 bottom-9 top-5 flex flex-col justify-between">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div key={idx} className="border-t border-[#e7ebf2]" />
                        ))}
                      </div>

                      <div className="relative z-10 flex h-full items-end gap-2">
                        {growthData.map((bar) => (
                          <div key={bar.month} className="flex h-full flex-1 flex-col items-center justify-end">
                            <div className="relative h-[160px] w-full">
                              <div
                                className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-[#dce2ea]"
                                style={{ height: `${bar.back}%` }}
                              />
                              <div
                                className={cn(
                                  "absolute bottom-0 left-0 right-0 rounded-t-lg",
                                  bar.active ? "bg-[#0d3b66]" : "bg-[#8fa3b7]"
                                )}
                                style={{ height: `${bar.front}%` }}
                              />
                            </div>
                            <p
                              className={cn(
                                "mt-2 text-xs font-semibold tracking-wide",
                                bar.active ? "text-[#0d3b66]" : "text-[#95a4b8]"
                              )}
                            >
                              {bar.month}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="xl:border-l xl:border-[#edf1f6] xl:pl-6">
                    <h4 className="text-xl font-semibold leading-tight text-[#111111]">Customer Type</h4>

                    <div className="mt-12 space-y-4">
                      <button className="w-full rounded-full bg-[#0d3b66] py-2 text-sm font-semibold text-white">
                        ALL
                      </button>
                      <button className="w-full rounded-full border border-[#5f7fa3] bg-white py-2 text-sm font-semibold text-[#1a2c40]">
                        BANK
                      </button>
                      <button className="w-full rounded-full border border-[#5f7fa3] bg-white py-2 text-sm font-semibold text-[#1a2c40]">
                        PUBLIC
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[linear-gradient(180deg,#0b3a63_0%,#0a3157_70%,#0a4b67_100%)] p-6 text-white shadow-lg">
                <h3 className="text-xl font-semibold leading-tight">Quick Management</h3>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.label}
                        className="rounded-xl bg-[#1a4a77]/80 p-3 text-center transition hover:bg-[#205486]"
                      >
                        <Icon size={18} className="mx-auto text-[#3cd1c4]" />
                        <p className="mt-3 text-xs font-semibold tracking-wide">{action.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="rounded-3xl border border-[#e3e7ee] bg-white p-6">
                <h3 className="text-xl font-semibold leading-tight text-[#0f2f52]">Recent Admin Actions</h3>

                <div className="mt-6 space-y-5">
                  {adminActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <div key={action.title} className="flex items-start gap-4">
                        <span
                          className={cn(
                            "mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg",
                            actionToneClass[action.tone]
                          )}
                        >
                          <Icon size={16} />
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-tight text-[#1e4169]">{action.title}</p>
                          <p className="mt-1 text-sm text-[#a0adbd]">{action.meta}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-[#e3e7ee] bg-white p-6">
                <h3 className="text-xl font-semibold leading-tight text-[#0f2f52]">Current Loan Interest Rate</h3>

                <div className="mt-6 space-y-5">
                  {loanRates.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Icon size={19} className="mt-1 text-[#111111]" />
                          <div>
                            <p className="text-sm font-medium leading-tight text-[#1e4169]">{item.title}</p>
                            <p className="text-sm text-[#a4afbe]">Since 16th of September 2025</p>
                          </div>
                        </div>
                        <p className="text-xl font-semibold text-[#24486f]">{item.rate}</p>
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
