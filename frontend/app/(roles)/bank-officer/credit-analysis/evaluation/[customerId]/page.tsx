"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import {
  ArrowUpRight,
  Download,
  TrendingDown,
  CreditCard,
  Wallet,
  Landmark,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Progress } from "@/src/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  ReportDownloadModal,
  type ReportFileType,
} from "@/src/components/ui/report-download-modal";
import ModuleHeader from "@/src/components/ui/module-header";

export default function CreditAnalysisEvaluationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const params = useParams<{ customerId: string }>();
  const searchParams = useSearchParams();
  const customerName = searchParams.get("name") || "Amila Silva";
  const customerId = params.customerId || "C-48292";

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-y-auto bg-[#f3f4f6] p-8 shadow-2xl lg:rounded-l-[28px] lg:p-10">
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole="BANK_OFFICER"
            sidebarHideCollapse
            mailBadge={2}
            notificationBadge={8}
            avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
            avatarStatusDot
            name="Kamal Edirisinghe"
            role="User"
            title="Credit Analysis"
            className="mb-6"
          />

          <div className="mb-2 text-sm text-slate-500">
            Dashboard <span className="mx-2 text-slate-400">▶</span> Credit Analysis <span className="mx-2 text-slate-400">▶</span>{" "}
            <span className="text-[#3e9fd3] font-medium">{customerName}</span>
          </div>
          <div className="mb-8 text-xs text-slate-500">Customer ID: {customerId}</div>

          <div className="mb-8 grid grid-cols-4 rounded-xl border border-white/10 bg-[#173f6d]/80 p-1">
            {["Overview", "Trends", "Credit Insights", "Reports"].map((tab) => {
              const key = tab.toLowerCase().replace(" ", "-");
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(key)}
                  className={`rounded-lg py-3 text-sm font-semibold transition-all ${
                    activeTab === key
                      ? "bg-[#3e9fd3] text-white shadow-sm"
                      : "text-slate-200 hover:bg-[#255280] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {activeTab === "overview" && <ModernOverview customerName={customerName} />}
            {activeTab === "trends" && <TrendsTab />}
            {activeTab === "credit-insights" && <CreditInsightsTab />}
            {activeTab === "reports" && <ReportsTab />}
          </div>
           </main>
          </div>
       

    </AuthGuard>
  );
}

function ModernOverview({ customerName }: { customerName: string }) {
  // Score constants
  const score = 55;
  const maxScore = 100;
  // Calculate needle rotation based on score (0 to 100 maps to -90 to 90 degrees)
  const rotation = (score / maxScore) * 180 - 90;

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b1f47_0%,#0f2f63_55%,#12386f_100%)] p-8 text-white shadow-[0_12px_32px_rgba(2,12,36,0.35)] lg:p-12">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-400/20 blur-[100px]"></div>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-200">Customer Profile</p>
          <h2 className="mb-6 text-3xl font-bold text-white">{customerName}</h2>
          
          <div className="inline-flex flex-col items-center rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm lg:items-start">
             <div className="mb-1 text-sm text-slate-200">Risk Category</div>
             <div className="text-2xl font-bold text-[#fbbf24] flex items-center gap-2">
               Medium Risk
               <span className="flex h-3 w-3 relative">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fbbf24]"></span>
               </span>
             </div>
             <p className="mt-3 max-w-xs text-xs text-slate-300">
                Score indicates moderate creditworthiness. Review outstanding liabilities before increasing limits.
             </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h3 className="mb-6 text-xl font-medium text-slate-100">Credit Risk Score</h3>
          
          {/* Enhanced Speedometer */}
          <div className="relative w-80 h-44 flex justify-center items-end">
            <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                  <stop offset="50%" stopColor="#fbbf24" /> {/* Yellow */}
                  <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Background Arc */}
              <path 
                d="M 20 100 A 80 80 0 0 1 180 100" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="16" 
                strokeLinecap="round" 
              />
              
              {/* Colored Gradient Arc (Masked logic simplified for gradient stroke) */}
              <path 
                d="M 20 100 A 80 80 0 0 1 180 100" 
                fill="none" 
                stroke="url(#gaugeGradient)" 
                strokeWidth="16" 
                strokeLinecap="round"
                strokeDasharray="251.2" // Circumference of semi-circle (PI * 80)
                strokeDashoffset="0"
                className="opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />

              {/* Ticks and Needle */}
              <g transform="translate(100, 100)">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => {
                  const angle = (tick / 100) * 180 - 180;
                  return (
                    <g key={tick} transform={`rotate(${angle})`}>
                      <rect x="82" y="-1" width="6" height="2" fill="#94a3b8" />
                    </g>
                  );
                })}
                
                {/* Needle */}
                <g transform={`rotate(${rotation})`} className="transition-transform duration-1000 ease-out">
                  <path d="M -12 0 L 0 -75 L 12 0 Z" fill="#00000075" />
                  <circle r="6" fill="#0d3b66" stroke="#fff" strokeWidth="2" />
                </g>
              </g>

              {/* Score Text */}
              <text x="100" y="70" textAnchor="middle" fill="#ffffff" style={{ fontSize: '32px', fontWeight: 'bold' }}>{score}</text>
              <text x="100" y="90" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Risk Score</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-x-16 gap-y-8 border-t border-white/10 pt-8 lg:grid-cols-2">
        <MetricBar label="Payment history" value={60} bubble="18" total="30" color="[&>div]:bg-[#fbbf24]" />
        <MetricBar label="DTI" value={48} bubble="12" total="25" color="[&>div]:bg-[#4ade80]" />
        <MetricBar label="Credit utilization" value={100} bubble="20" total="20" color="[&>div]:bg-[#ef4444]" />
        <MetricBar label="Income stability" value={0} bubble="0" total="15" color="" />
        <MetricBar label="Active Facilities" value={50} bubble="5" total="10" color="[&>div]:bg-[#4ade80]" />
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  bubble,
  total,
  color,
}: {
  label: string;
  value: number;
  bubble: string;
  total: string;
  color: string;
}) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-4">
      <span className="w-32 shrink-0 text-sm font-medium text-slate-200">{label}</span>
      <div className="flex-1">
        <div className="relative">
          <Progress value={clampedValue} className={`h-4 rounded-full bg-white/20 ${color}`} />
          <div
             className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#173f6d] text-xs font-bold text-white"
            style={{
              left: `clamp(0px, calc(${clampedValue}% - 1rem), calc(100% - 2rem))`,
            }}
          >
            {bubble}
          </div>
        </div>
      </div>
      <div className="flex w-16 items-center justify-end gap-1">
        <span className="text-sm text-slate-300">{total}</span>
      </div>
    </div>
  );
}

function ReportsTab() {
  const reportMonths = [
    { value: "2025-09", label: "September 2025" },
    { value: "2025-08", label: "August 2025" },
    { value: "2025-07", label: "July 2025" },
    { value: "2025-06", label: "June 2025" },
    { value: "2025-05", label: "May 2025" },
    { value: "2025-04", label: "April 2025" },
    { value: "2025-03", label: "March 2025" },
    { value: "2025-02", label: "February 2025" },
    { value: "2025-01", label: "January 2025" },
    { value: "2024-12", label: "December 2024" },
    { value: "2024-11", label: "November 2024" },
    { value: "2024-10", label: "October 2024" },
  ];
  const [selectedReportMonth, setSelectedReportMonth] = useState<string>("2025-09");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [reportFileType, setReportFileType] = useState<ReportFileType>("pdf");

  const selectedMonthLabel =
    reportMonths.find((month) => month.value === selectedReportMonth)?.label ?? reportMonths[0].label;
  const reportDateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const reportFileBaseName = `credit-analysis-report-${selectedMonthLabel
    .toLowerCase()
    .replace(/\s+/g, "-")}-${reportDateStamp}`;

  return (
    <>
      <CreditLensTabShell title="Credit Reports" subtitle="Monthly Evaluation Snapshot">
        <div className="flex h-full flex-col gap-6">
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-[220px]">
              <Select value={selectedReportMonth} onValueChange={setSelectedReportMonth}>
                <SelectTrigger className="h-10 border-white/20 bg-white/10 text-slate-100 data-[placeholder]:text-slate-300">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent className="border-white/20 bg-[#14345f] text-slate-100">
                  {reportMonths.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value}
                      className="text-slate-100 hover:bg-white/15 hover:text-white focus:bg-white/15 focus:text-white"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => setIsDownloadModalOpen(true)}
              className="h-10 w-full rounded-xl bg-[#3e9fd3] px-5 text-white hover:bg-[#3587b3] sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricStatTile
              icon={<Wallet size={18} />}
              label="Monthly Income"
              value="LKR 150,000"
              meta=""
              tone="bg-emerald-400/20 text-emerald-300 border-emerald-300/30"
            />
            <MetricStatTile
              icon={<Landmark size={18} />}
              label="Loan EMI"
              value="LKR 40,000"
              meta=""
              tone="bg-amber-400/20 text-amber-300 border-amber-300/30"
            />
            <MetricStatTile
              icon={<CreditCard size={18} />}
              label="Credit Card"
              value="LKR 180,000"
              meta="Limit: LKR 250,000"
              tone="bg-sky-400/20 text-sky-300 border-sky-300/30"
            />
            <MetricStatTile
              icon={<Building2 size={18} />}
              label="Other Liabilities"
              value="LKR 10,000"
              meta=""
              tone="bg-indigo-400/20 text-indigo-300 border-indigo-300/30"
            />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-3 rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Credit Summary</p>
              <div className="mt-6 flex flex-col items-center">
                 <div className="text-6xl font-bold text-white">55</div>
                <Badge className="mt-3 border-0 bg-amber-300/25 text-amber-200 hover:bg-amber-300/35">
                  MEDIUM
                </Badge>
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Evaluation Type:</span>
                  <span className="font-semibold text-white">Self Assessment</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Category:</span>
                  <span className="font-semibold text-amber-200">Medium</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                  <Calendar size={12} />
                  <span>Last Updated: 12 Nov 2025</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Behavior & Exposure</p>
              <div className="mt-5 space-y-5">
                <DetailRow
                  icon={<CheckCircle2 size={18} />}
                  iconClass="border border-emerald-300/35 bg-emerald-400/15 text-emerald-300"
                  label="Missed Payments"
                  value="2 in last 12 months"
                />
                <DetailRow
                  icon={<Building2 size={18} />}
                  iconClass="border border-sky-300/35 bg-sky-400/15 text-sky-300"
                  label="Active Facilities"
                  value="4 active products"
                />
                <DetailRow
                  icon={<TrendingDown size={18} />}
                  iconClass="border border-cyan-300/35 bg-cyan-400/15 text-cyan-300"
                  label="Debt-to-Income (DTI)"
                  value="39% (Medium)"
                />
                <DetailRow
                  icon={<CreditCard size={18} />}
                  iconClass="border border-rose-300/35 bg-rose-400/15 text-rose-300"
                  label="Credit Utilization"
                  value="72% (Needs attention)"
                />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Risk Points Breakdown</p>
              <div className="mt-5 flex-1 space-y-5">
                <SimpleProgress label="Payment History" value="18 / 30" percent={60} color="[&>div]:bg-amber-400" />
                <SimpleProgress label="Debt-to-Income" value="12 / 25" percent={48} color="[&>div]:bg-green-400" />
                <SimpleProgress label="Utilization" value="20 / 20" percent={100} color="[&>div]:bg-red-400" />
                <SimpleProgress label="Income Stability" value="0 / 15" percent={0} color="" />
                <SimpleProgress label="Active Facilities" value="5 / 10" percent={50} color="[&>div]:bg-green-400" />
              </div>

              <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs leading-relaxed text-slate-300">
                  Customer profile remains in medium risk. Focus on lowering utilization and improving DTI for the next review cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CreditLensTabShell>

      <ReportDownloadModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        fileBaseName={reportFileBaseName}
        fileType={reportFileType}
        onFileTypeChange={setReportFileType}
        monthLabel={selectedMonthLabel}
        score={55}
        riskLabel="Medium"
      />
    </>
  );
}

function CreditLensTabShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b1f47_0%,#0f2f63_55%,#12386f_100%)] p-6 text-white shadow-[0_12px_32px_rgba(2,12,36,0.35)] lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_460px_at_100%_8%,rgba(56,189,248,0.16),transparent_65%),radial-gradient(780px_420px_at_0%_100%,rgba(59,130,246,0.14),transparent_70%)]" />
      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{subtitle}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{title}</h3>
          </div>
          {action}
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </section>
  );
}

function MetricStatTile({
  icon,
  label,
  value,
  meta,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  meta: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg border p-2 ${tone}`}>{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-300">{meta}</p>
    </div>
  );
}

function DetailRow({
  icon,
  iconClass,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`rounded-lg p-2 ${iconClass}`}>{icon}</div>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-sm text-slate-300">{value}</p>
      </div>
    </div>
  );
}

function SimpleProgress({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-200">{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <Progress value={percent} className={`h-2 bg-white/15 ${color}`} />
    </div>
  );
}

function TrendsTab() {
  const [range, setRange] = useState<"6" | "12">("6");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const trendSeries: Record<"6" | "12", { months: string[]; values: number[] }> = {
    "6": {
      months: ["April", "May", "June", "July", "August", "September"],
      values: [80, 45, 90, 70, 60, 55],
    },
    "12": {
      months: [
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      values: [72, 69, 66, 61, 58, 54, 80, 45, 90, 70, 60, 55],
    },
  };

  const { months, values } = trendSeries[range];
  const latestScore = values[values.length - 1];

  return (
    <CreditLensTabShell title="Credit Risk Trend" subtitle={`${range}-Month Movement`}>
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Trend Line</p>
              <h4 className="mt-1 text-xl font-semibold text-white">Credit Risk Score</h4>
            </div>
            <div className="flex items-center gap-3">
              <Select value={range} onValueChange={(value) => setRange(value === "12" ? "12" : "6")}>
                <SelectTrigger className="h-8 w-28 border-white/20 bg-white/10 text-slate-100 data-[placeholder]:text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/20 bg-[#14345f] text-slate-100">
                  <SelectItem
                    value="6"
                    className="text-slate-100 hover:bg-white/15 hover:text-white focus:bg-white/15 focus:text-white"
                  >
                    6 Month
                  </SelectItem>
                  <SelectItem
                    value="12"
                    className="text-slate-100 hover:bg-white/15 hover:text-white focus:bg-white/15 focus:text-white"
                  >
                    12 Month
                  </SelectItem>
                </SelectContent>
              </Select>
               <Badge className="border border-white/20 bg-white/10 text-slate-100">Latest: {latestScore}</Badge>
            </div>
          </div>

          <div className="relative h-72">
            <div className="absolute inset-x-0 bottom-8 top-0 flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="relative border-t border-dashed border-white/20">
                  <span className="absolute -left-8 -top-2 text-[10px] text-slate-300">{val}</span>
                </div>
              ))}
            </div>

            <div key={`trend-bars-${range}`} className="absolute inset-x-0 bottom-0 top-0 flex items-end gap-2">
              {values.map((val, idx) => (
                <div
                  key={`${months[idx]}-${idx}`}
                  className="z-10 flex flex-1 flex-col items-center justify-end gap-2"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {hoveredIndex === idx && (
                    <div className="mb-1 rounded bg-white px-2 py-0.5 text-xs font-bold text-[#0a2a53]">
                      {val}
                    </div>
                  )}
                  <div
                    className={`w-full max-w-11 rounded-t-md ${
                      hoveredIndex === idx
                        ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                        : "bg-gradient-to-t from-[#7f8bff] to-[#a9b2ff]"
                    }`}
                    style={{
                      height: `${Math.max(12, val * 2.2)}px`,
                      transformOrigin: "bottom",
                      animation: `trend-bar-rise 720ms cubic-bezier(0.22,1,0.36,1) ${idx * 55}ms both`,
                    }}
                  />
                  <span
                    className="text-xs text-slate-300"
                    style={{
                      animation: `trend-label-fade 360ms ease ${idx * 55 + 260}ms both`,
                    }}
                  >
                    {months[idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
          <div className="border-b border-white/15 pb-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Trend Summary</p>
            <p className="mt-3 text-3xl font-bold text-emerald-600">-25 Risk pts</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown size={16} className="text-emerald-300" />
              Improved since {months[0]}
            </p>
          </div>

          <div className="border-b border-white/15 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Key Signals</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="rounded-lg border border-emerald-300/35 bg-emerald-400/15 p-2 text-emerald-300">
                  <BarChart3 size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Reduced DTI pressure</p>
                  <p className="text-xs text-slate-300">Primary improvement driver</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="rounded-lg border border-sky-300/35 bg-sky-400/15 p-2 text-sky-300">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Stable repayment rhythm</p>
                  <p className="text-xs text-slate-300">No sudden risk spikes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Next Target</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              Reach below 40 to enter low-risk band
              <ArrowUpRight size={14} className="text-emerald-300" />
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes trend-bar-rise {
          from {
            transform: scaleY(0.06);
            opacity: 0.35;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes trend-label-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </CreditLensTabShell>
  );
}

function CreditInsightsTab() {
  return (
    <CreditLensTabShell title="Credit Insights" subtitle="Risk Drivers and Positive Signals">
      <div className="flex h-full flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <InsightCard
            title="Key Risk Factors"
            icon={<AlertTriangle size={20} />}
            iconClass="border border-orange-300/35 bg-orange-400/15 text-orange-300"
          >
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CreditCard size={15} className="text-orange-300" />
                <p className="text-sm font-semibold text-white">High Credit Utilization</p>
              </div>
              <p className="text-xs text-slate-300">
                Current: <span className="font-semibold text-white">72%</span> (20/20 points)
              </p>
              <Badge className="mt-3 border-0 bg-red-500 text-white hover:bg-red-600">MAX RISK</Badge>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle size={15} className="text-rose-300" />
                <p className="text-sm font-semibold text-white">Missed Payments</p>
              </div>
              <p className="text-xs text-slate-300">
                5 missed payments in last 12 months (18/30 points)
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrendingDown size={15} className="text-amber-300" />
                <p className="text-sm font-semibold text-white">Moderate Debt-to-Income</p>
              </div>
              <p className="text-xs text-slate-300">
                Current DTI: <span className="font-semibold text-white">39%</span> (12/25 points)
              </p>
              <Badge className="mt-3 border-0 bg-orange-500 text-white hover:bg-orange-600">HIGH</Badge>
            </div>
          </InsightCard>

          <InsightCard
            title="Positive Behaviors"
            icon={<CheckCircle2 size={20} />}
            iconClass="border border-emerald-300/35 bg-emerald-400/15 text-emerald-300"
          >
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Stable Salaried Employment</p>
              <p className="mt-1 text-xs text-slate-300">(Permanent) - 0/15</p>
              <Badge className="mt-3 border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                VERIFIED
              </Badge>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Credit Exposure Controlled</p>
              <p className="mt-1 text-xs text-slate-300">4 active facilities, all debts up-to-date</p>
              <Badge className="mt-3 border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                HEALTHY
              </Badge>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Low DTI Direction</p>
              <p className="mt-1 text-xs text-slate-300">Maintained below 50% in recent cycles</p>
            </div>
          </InsightCard>

          <InsightCard
            title="Financial Tips"
            icon={<Lightbulb size={20} />}
            iconClass="border border-yellow-300/35 bg-yellow-400/15 text-yellow-300"
          >
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-200">
              Reduce utilization below <span className="font-semibold text-white">70%</span> to improve risk by
              <span className="font-semibold text-emerald-200"> +10 points</span>.
              <p className="mt-2 text-xs text-slate-300">
                Best target: below 40% can improve by around 20 points.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-200">
              Avoid any missed payments for the next <span className="font-semibold text-white">12 months</span>.
              <p className="mt-2 text-xs text-slate-300">
                This improves payment history factor and stability score.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-200">
              Reduce DTI below <span className="font-semibold text-white">30%</span> for better approval confidence.
            </div>
          </InsightCard>
        </div>

      </div>
    </CreditLensTabShell>
  );
}

function InsightCard({
  title,
  icon,
  iconClass,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  iconClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-lg p-2 ${iconClass}`}>{icon}</div>
         <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>
      <div className="flex flex-1 flex-col gap-3">{children}</div>
    </div>
  );
}
