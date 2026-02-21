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
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";

export default function CreditAnalysisEvaluationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const params = useParams<{ customerId: string }>();
  const searchParams = useSearchParams();
  const customerName = searchParams.get("name") || "Amila Silva";
  const customerId = params.customerId || "C-48292";

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto w-full max-w-400 mx-auto">
          <BankOfficerHeader title="Credit Analysis" className="mb-6" />

          <div className="mb-2 text-sm text-slate-500">
            Dashboard <span className="mx-2 text-slate-400">▶</span> Credit Analysis <span className="mx-2 text-slate-400">▶</span>{" "}
            <span className="text-[#3e9fd3] font-medium">{customerName}</span>
          </div>
          <div className="mb-8 text-xs text-slate-500">Customer ID: {customerId}</div>

          <div className="grid grid-cols-4 bg-sky-100/50 p-1 rounded-xl mb-8">
            {["Overview", "Trends", "Credit Insights", "Reports"].map((tab) => {
              const key = tab.toLowerCase().replace(" ", "-");
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(key)}
                  className={`py-3 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === key
                      ? "bg-[#3e9fd3] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-sky-200/50"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
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
    <div className="bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] rounded-2xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <p className="text-sm text-white/70 uppercase tracking-wider font-medium mb-2">Customer Profile</p>
          <h2 className="text-3xl font-bold mb-6">{customerName}</h2>
          
          <div className="inline-flex flex-col items-center lg:items-start bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="text-sm text-white/60 mb-1">Risk Category</div>
             <div className="text-2xl font-bold text-[#fbbf24] flex items-center gap-2">
               Medium Risk
               <span className="flex h-3 w-3 relative">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fbbf24]"></span>
               </span>
             </div>
             <p className="text-xs text-white/40 mt-3 max-w-xs">
                Score indicates moderate creditworthiness. Review outstanding liabilities before increasing limits.
             </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-xl font-light opacity-90 mb-6">Credit Risk Score</h3>
          
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
                      <rect x="82" y="-1" width="6" height="2" fill="rgba(255,255,255,0.3)" />
                    </g>
                  );
                })}
                
                {/* Needle */}
                <g transform={`rotate(${rotation})`} className="transition-transform duration-1000 ease-out">
                  <path d="M -12 0 L 0 -75 L 12 0 Z" fill="#fff" />
                  <circle r="6" fill="#0d3b66" stroke="#fff" strokeWidth="2" />
                </g>
              </g>

              {/* Score Text */}
              <text x="100" y="70" textAnchor="middle" fill="white" style={{ fontSize: '32px', fontWeight: 'bold' }}>{score}</text>
              <text x="100" y="90" textAnchor="middle" fill="rgba(255,255,255,0.6)" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Risk Score</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto mt-8 border-t border-white/10 pt-8">
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
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium w-32 shrink-0 text-white/80">{label}</span>
      <div className="flex-1 flex items-center gap-3">
        <Progress value={value} className={`h-4 rounded-full bg-white/10 ${color}`} />
      </div>
      <div className="flex items-center gap-1 w-16 justify-end relative">
        <div className="absolute left-0 -translate-x-12 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border border-white/30">{bubble}</div>
        <span className="text-white/60 text-sm">{total}</span>
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Select defaultValue="nov">
          <SelectTrigger className="w-44 bg-slate-100 border-none">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oct">October 2023</SelectItem>
            <SelectItem value="nov">November 2023</SelectItem>
            <SelectItem value="dec">December 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard icon={<Wallet size={24} />} iconWrap="bg-emerald-100 text-emerald-600" label="Monthly Income" value="150,000" unit="LKR" />
        <MetricCard icon={<Landmark size={24} />} iconWrap="bg-amber-100 text-amber-600" label="Loan EMI" value="40,000" unit="LKR" valueClass="text-amber-600" />
        <MetricCard icon={<CreditCard size={24} />} iconWrap="bg-blue-100 text-blue-600" label="Credit Card" value="180,000" unit="Bal: LKR" subLabel="Limit: LKR 250,000" />
        <MetricCard icon={<Building2 size={24} />} iconWrap="bg-indigo-100 text-indigo-600" label="Other Liabilities" value="10,000" unit="LKR" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h3 className="font-bold text-lg mb-8">Credit Summary</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Risk Score</div>
            <div className="text-6xl font-bold text-[#0d3b66] mb-2">55</div>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 mb-8">MEDIUM</Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Evaluation Type:</span>
              <span className="font-semibold text-slate-800">Self Assessment</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Risk Category:</span>
              <span className="font-semibold text-amber-600">Medium</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
              <Calendar size={12} />
              <span>Last Updated: 12 Nov 2025</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
          <h3 className="font-bold text-lg mb-6">Credit Behavior & Exposure</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full border-2 border-green-500 text-green-500">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">Missed Payments</h4>
                <p className="text-slate-500 text-sm"><span className="font-bold text-slate-800">2</span> Last 12 months</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">Active Facilities</h4>
                <p className="font-bold text-slate-800 text-lg">4</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full border-2 border-emerald-500 text-emerald-500">
                <TrendingDown size={20} />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-700">Debt-to-Income (DTI)</h4>
                    <p className="font-bold text-slate-800 text-lg">39%</p>
                  </div>
                  <Badge variant="warning" className="bg-amber-100 text-amber-700">Medium</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">Credit Utilization</h4>
                <p className="font-bold text-slate-800 text-lg">72%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
          <h3 className="font-bold text-lg mb-6">Risk Points Breakdown</h3>
          <div className="space-y-6 flex-1">
            <SimpleProgress label="• Payment History:" value="18 / 30" percent={60} color="[&>div]:bg-amber-400" />
            <SimpleProgress label="• Debt-to-Income:" value="12 / 25" percent={48} color="[&>div]:bg-green-400" />
            <SimpleProgress label="• Utilization:" value="20 / 20" percent={100} color="[&>div]:bg-red-400" />
            <SimpleProgress label="• Income Stability:" value="0 / 15" percent={0} color="" />
            <SimpleProgress label="• Active Facilities:" value="5 / 10" percent={50} color="[&>div]:bg-green-400" />
          </div>

          <div className="mt-6 flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-500 leading-tight flex-1">
              Based on our proprietary algorithm, your current score of 55 indicates a moderate probability of credit default. Improving your DTI could positively impact your score.
            </p>
            <Button size="sm" className="bg-[#3e9fd3] hover:bg-[#3587b3] text-white shrink-0 h-auto py-2 px-4">
              <Download size={14} className="mr-2" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-normal opacity-80">Download</span>
                <span className="text-xs font-bold">Full Report</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  iconWrap,
  label,
  value,
  unit,
  subLabel,
  valueClass,
}: {
  icon: React.ReactNode;
  iconWrap: string;
  label: string;
  value: string;
  unit: string;
  subLabel?: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${iconWrap}`}>{icon}</div>
        <span className="font-semibold text-slate-600">{label}</span>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-slate-400 font-bold uppercase">{unit}</span>
          <span className={`text-2xl font-bold text-slate-800 ${valueClass || ""}`}>{value}</span>
        </div>
        {subLabel && <div className="text-[10px] text-slate-400">{subLabel}</div>}
      </div>
    </div>
  );
}

function SimpleProgress({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>
      <Progress value={percent} className={`h-2 bg-slate-100 ${color}`} />
    </div>
  );
}

function TrendsTab() {
  const chartData = [25, 30, 80, 48, 65, 55];
  const months = ["April", "May", "June", "July", "August", "September"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-slate-500">6 Month Only</p>
            <h3 className="text-xl font-bold text-slate-800">Credit Risk Score</h3>
          </div>
          <Button variant="outline" size="sm" className="text-slate-500">Month</Button>
        </div>

        <div className="h-72 flex items-end justify-between gap-4 px-4 relative">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-4">
            {[100, 75, 50, 25, 0].map((val) => (
              <div key={val} className="w-full border-t border-dashed border-slate-200 flex items-center">
                <span className="text-[10px] text-slate-400 -translate-x-8 absolute">{val}</span>
              </div>
            ))}
          </div>

          {chartData.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 z-10 w-full group relative">
              {idx === 5 && (
                <div className="absolute -top-8 bg-[#0d3b66] text-white text-xs font-bold px-2 py-1 rounded animate-bounce">
                  60
                </div>
              )}
              <div
                className={`w-full max-w-10 rounded-t-lg transition-all hover:opacity-80 ${idx === 4 ? "bg-emerald-400" : "bg-purple-400"}`}
                style={{ height: `${val * 3}px` }}
              ></div>
              <span className="text-xs text-slate-500 font-medium">{months[idx]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Trend Summary</h3>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
            <div className="text-3xl font-bold text-green-600 mb-1">-25 Risk pts</div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="text-green-600">▲</span> Improved since April
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-green-100 text-green-700 rounded">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Biggest Driver</p>
                <p className="text-sm font-semibold text-slate-700">Reduced DTI pressure</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-blue-100 text-blue-700 rounded">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Risk Stability</p>
                <p className="text-sm font-semibold text-slate-700">No sudden risk spikes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-2">Next Target</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Below 40</span>
            <ArrowUpRight size={14} />
            <span className="font-medium text-slate-800">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreditInsightsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-slate-200 shadow-sm h-full">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-orange-100 text-orange-600 p-3 rounded-full w-fit mb-2">
            <AlertTriangle size={24} />
          </div>
          <CardTitle className="text-lg">Key Risk Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={16} className="text-orange-500" />
              <h4 className="font-bold text-slate-800 text-sm">High Credit Utilization</h4>
            </div>
            <p className="text-xs text-slate-500 mb-3">Current: <span className="font-bold text-slate-800">72%</span> (20/20 points)</p>
            <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 text-[10px] uppercase font-bold px-2 py-0.5">Max Risk</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm h-full">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-blue-100 text-blue-600 p-3 rounded-full w-fit mb-2">
            <CheckCircle2 size={24} />
          </div>
          <CardTitle className="text-lg">Positive Behaviors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <CheckCircle2 size={10} />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Stable Salaried Employment</h4>
            </div>
            <p className="text-xs text-slate-500 mb-3">(Permanent) — 0/15</p>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 text-[10px] uppercase font-bold px-2 py-0.5">
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm h-full">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-yellow-100 text-yellow-600 p-3 rounded-full w-fit mb-2">
            <Lightbulb size={24} />
          </div>
          <CardTitle className="text-lg">Financial Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex gap-4">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Reduce credit utilization below <span className="font-bold text-slate-800">70%</span> to drop risk by <span className="font-bold text-emerald-600">~10 points</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}