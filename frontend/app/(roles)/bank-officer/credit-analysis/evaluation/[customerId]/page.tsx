"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import ModuleHeader from "@/src/components/ui/module-header";
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
import {
  Banknote,
  Building2,
  CreditCard,
  Download,
  Landmark,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import {
  getOfficerCreditCurrentEvaluation,
  getOfficerCreditCustomerProfile,
  getOfficerCreditEvaluationHistory,
  getOfficerCreditInsights,
  getOfficerCreditReport,
  getOfficerCreditTrends,
} from "@/src/api/creditlens/officer-creditlens.service";
import { ApiError } from "@/src/types/api-error";
import { getBankCustomerFinancialRecordById } from "@/src/api/customers/bank-customer-financial.service";
import type {
  BankCreditAnalysisCustomerProfileResponse,
  BankCreditEvaluationResponse,
  BankCreditEvaluationSummaryResponse,
  CreditInsightsResponse,
  CreditReportResponse,
  CreditTrendResponse,
} from "@/src/types/dto/officer-creditlens.dto";
import type { RiskFactor } from "@/src/types/creditlens-report";
import CreditRiskGauge from "../../../../bank-customer/creditlens/components/CreditRiskGauge";
import RiskFactorBars from "../../../../bank-customer/creditlens/components/RiskFactorBars";
import CreditRiskBarChart from "../../../../bank-customer/creditlens/components/CreditRiskBarChart";
import TrendSummaryCard from "../../../../bank-customer/creditlens/components/TrendSummaryCard";
import KeyRiskFactorsCard from "../../../../bank-customer/creditlens/components/KeyRiskFactorsCard";
import PositiveBehaviorsCard from "../../../../bank-customer/creditlens/components/PositiveBehaviorsCard";
import FinancialTipsCard from "../../../../bank-customer/creditlens/components/FinancialTipsCard";
import ReportMetricCard from "../../../../bank-customer/creditlens/report/components/ReportMetricCard";
import CreditSummaryDonut from "../../../../bank-customer/creditlens/report/components/CreditSummaryDonut";
import BehaviorExposureCard from "../../../../bank-customer/creditlens/report/components/BehaviorExposureCard";
import RiskPointsBreakdown from "../../../../bank-customer/creditlens/report/components/RiskPointsBreakdown";

type TabKey = "overview" | "trends" | "credit-insights" | "reports";
type TrendRange = "6m" | "12m";
type LabelTone = "Low" | "Medium" | "High";

type OfficerReportSnapshot = {
  month: string;
  lastUpdatedIso: string;
  income: number;
  loanEmi: number;
  loanRemainingBalance: number | null;
  creditCardBalance: number;
  creditCardLimit: number;
  otherLiabilities: number;
  score: number;
  riskLabel: LabelTone;
  evaluationType: string;
  lastUpdated: string;
  missedPayments: number;
  activeFacilities: number;
  dti: number;
  utilization: number;
  dtiLabel: LabelTone;
  factors: RiskFactor[];
};

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "trends", label: "Trends" },
  { key: "credit-insights", label: "Credit Insights" },
  { key: "reports", label: "Reports" },
];

export default function CreditAnalysisEvaluationPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [trendRange, setTrendRange] = useState<TrendRange>("6m");
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [reportFileType, setReportFileType] = useState<ReportFileType>("pdf");

  const [profile, setProfile] = useState<BankCreditAnalysisCustomerProfileResponse | null>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<BankCreditEvaluationResponse | null>(null);
  const [history, setHistory] = useState<BankCreditEvaluationSummaryResponse[]>([]);
  const [isBaseLoading, setIsBaseLoading] = useState(true);
  const [baseError, setBaseError] = useState<string | null>(null);

  const [trendData, setTrendData] = useState<CreditTrendResponse | null>(null);
  const [isTrendLoading, setIsTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState<string | null>(null);

  const [insights, setInsights] = useState<CreditInsightsResponse | null>(null);
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  const [reportData, setReportData] = useState<OfficerReportSnapshot[]>([]);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const params = useParams<{ customerId: string }>();
  const searchParams = useSearchParams();
  const fallbackCustomerName = searchParams.get("name") || "Bank Customer";
  const bankCustomerId = Number(params.customerId);
  const hasValidBankCustomerId = Number.isFinite(bankCustomerId) && bankCustomerId > 0;

  useEffect(() => {
    if (!hasValidBankCustomerId) {
      setBaseError("The selected bank customer is invalid.");
      setIsBaseLoading(false);
      return;
    }

    let isActive = true;

    const loadBaseData = async () => {
      try {
        setIsBaseLoading(true);
        setBaseError(null);

        const [profileResponse, currentResponse, historyResponse] = await Promise.all([
          getOfficerCreditCustomerProfile(bankCustomerId),
          getOfficerCreditCurrentEvaluation(bankCustomerId),
          getOfficerCreditEvaluationHistory(bankCustomerId),
        ]);

        if (!isActive) {
          return;
        }

        setProfile(profileResponse);
        setCurrentEvaluation(currentResponse);
        setHistory(historyResponse);
      } catch (unknownError) {
        if (!isActive) {
          return;
        }

        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load the selected customer's CreditLens profile.";
        setBaseError(message);
      } finally {
        if (isActive) {
          setIsBaseLoading(false);
        }
      }
    };

    void loadBaseData();

    return () => {
      isActive = false;
    };
  }, [bankCustomerId, hasValidBankCustomerId]);

  useEffect(() => {
    if (!hasValidBankCustomerId || activeTab !== "trends") {
      return;
    }

    let isActive = true;

    const loadTrends = async () => {
      try {
        setIsTrendLoading(true);
        setTrendError(null);
        const response = await getOfficerCreditTrends(bankCustomerId, trendRange);

        if (isActive) {
          setTrendData(response);
        }
      } catch (unknownError) {
        if (!isActive) {
          return;
        }

        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load this customer's CreditLens trend history.";
        setTrendError(message);
      } finally {
        if (isActive) {
          setIsTrendLoading(false);
        }
      }
    };

    void loadTrends();

    return () => {
      isActive = false;
    };
  }, [activeTab, bankCustomerId, hasValidBankCustomerId, trendRange]);

  useEffect(() => {
    if (!hasValidBankCustomerId || activeTab !== "credit-insights") {
      return;
    }

    let isActive = true;

    const loadInsights = async () => {
      try {
        setIsInsightsLoading(true);
        setInsightsError(null);
        const response = await getOfficerCreditInsights(bankCustomerId);

        if (isActive) {
          setInsights(response);
        }
      } catch (unknownError) {
        if (!isActive) {
          return;
        }

        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load this customer's CreditLens insight cards.";
        setInsightsError(message);
      } finally {
        if (isActive) {
          setIsInsightsLoading(false);
        }
      }
    };

    void loadInsights();

    return () => {
      isActive = false;
    };
  }, [activeTab, bankCustomerId, hasValidBankCustomerId]);

  useEffect(() => {
    if (!hasValidBankCustomerId || activeTab !== "reports") {
      return;
    }

    let isActive = true;

    const loadReport = async () => {
      try {
        setIsReportLoading(true);
        setReportError(null);

        const report = await getOfficerCreditReport(bankCustomerId);
        const latestHistoryByMonth = buildLatestHistoryByMonth(history);
        const uniqueRecordIds = Array.from(
          new Set(Array.from(latestHistoryByMonth.values()).map((item) => item.bankRecordId)),
        );

        const financialRecordEntries = await Promise.all(
          uniqueRecordIds.map(async (bankRecordId) => {
            try {
              const record = await getBankCustomerFinancialRecordById(bankCustomerId, bankRecordId);
              return [bankRecordId, record] as const;
            } catch {
              return null;
            }
          }),
        );

        const financialRecordMap = new Map<number, { loanRemainingBalance: number }>();
        for (const entry of financialRecordEntries) {
          if (!entry) {
            continue;
          }

          const [bankRecordId, record] = entry;
          financialRecordMap.set(bankRecordId, {
            loanRemainingBalance: sumRemainingLoanBalance(record),
          });
        }

        const mappedSnapshots = mapOfficerReportSnapshots(
          report,
          latestHistoryByMonth,
          financialRecordMap,
        );

        if (!isActive) {
          return;
        }

        setReportData(mappedSnapshots);
        setSelectedMonth((currentSelectedMonth) => {
          if (currentSelectedMonth && mappedSnapshots.some((snapshot) => snapshot.month === currentSelectedMonth)) {
            return currentSelectedMonth;
          }
          return mappedSnapshots[mappedSnapshots.length - 1]?.month;
        });
      } catch (unknownError) {
        if (!isActive) {
          return;
        }

        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load this customer's CreditLens report snapshots.";
        setReportError(message);
      } finally {
        if (isActive) {
          setIsReportLoading(false);
        }
      }
    };

    void loadReport();

    return () => {
      isActive = false;
    };
  }, [activeTab, bankCustomerId, hasValidBankCustomerId, history]);

  const customerName = profile?.fullName || fallbackCustomerName;
  const historyCount = history.length;
  const latestEvaluationDate = currentEvaluation?.createdAt || profile?.latestEvaluationDate || null;
  const hasSufficientTrendHistory = (trendData?.points.length ?? 0) >= 2;

  const overviewFactors = useMemo(
    () =>
      currentEvaluation?.factors.map((factor) => ({
        name: factor.name,
        value: factor.value,
        max: factor.max,
        color: factorColor(factor.name),
      })) ?? [],
    [currentEvaluation],
  );

  const newestReportSnapshot = reportData[reportData.length - 1] ?? null;
  const currentReportSnapshot = useMemo(() => {
    if (!newestReportSnapshot) {
      return null;
    }
    if (!selectedMonth) {
      return newestReportSnapshot;
    }
    return reportData.find((snapshot) => snapshot.month === selectedMonth) ?? newestReportSnapshot;
  }, [newestReportSnapshot, reportData, selectedMonth]);

  const reportDateStamp = useMemo(
    () => new Date().toISOString().slice(0, 10).replace(/-/g, ""),
    [],
  );

  const reportFileBaseName = useMemo(() => {
    const rawMonthLabel = selectedMonth ?? currentReportSnapshot?.month ?? "creditlens-report";
    const safeMonthLabel = rawMonthLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `credit-analysis-report-${safeMonthLabel}-${reportDateStamp}`;
  }, [currentReportSnapshot?.month, reportDateStamp, selectedMonth]);

  useEffect(() => {
    let mounted = true;

    const bankCustomerId = Number(params.customerId);
    if (Number.isNaN(bankCustomerId)) {
      setBaseError("Invalid customer identifier.");
      setIsBaseLoading(false);
      return () => {
        mounted = false;
      };
    }

    const loadCustomer = async () => {
      setIsBaseLoading(true);
      setBaseError("");

      try {
        const [profileResponse, evaluationResponse] = await Promise.all([
          getOfficerCreditCustomerProfile(bankCustomerId),
          getOfficerCreditCurrentEvaluation(bankCustomerId),
        ]);

        if (!mounted) {
          return;
        }

        setProfile(profileResponse);
        setCurrentEvaluation(evaluationResponse);
      } catch (error) {
        if (!mounted) {
          return;
        }

        let message = "Unable to load customer credit analysis.";
        if (error instanceof ApiError) {
          message = error.message || message;
        } else if (error instanceof Error && error.message) {
          message = error.message;
        }

        setBaseError(message);
        setProfile(null);
        setCurrentEvaluation(null);
      } finally {
        if (mounted) {
            setIsBaseLoading(false);
          }
      }
    };

    void loadCustomer();

    return () => {
      mounted = false;
    };
  }, [params.customerId]);

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
            role="Bank Officer"
            title="Credit Analysis"
            className="mb-6"
          />

          {isBaseLoading && !currentEvaluation ? (
            <PanelStateCard
              title="Loading customer CreditLens profile"
              description="Fetching the customer's latest evaluation, financial profile, and evaluation history."
            />
          ) : baseError && !currentEvaluation ? (
            <PanelStateCard
              title="Could not load customer CreditLens data"
              description={baseError}
              tone="error"
            />
          ) : (
            <>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>Customer Code: {profile?.customerCode || `BANK-CUSTOMER-${bankCustomerId}`}</span>
                <span>Bank Customer ID: {bankCustomerId}</span>
              </div>

              <div className="mb-8 grid grid-cols-2 rounded-xl border border-white/10 bg-[#173f6d]/80 p-1 md:grid-cols-4">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-lg py-3 text-sm font-semibold transition-all ${
                      activeTab === tab.key
                        ? "bg-[#3e9fd3] text-white shadow-sm"
                        : "text-slate-200 hover:bg-[#255280] hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {activeTab === "overview" && currentEvaluation && profile ? (
                  <OverviewTab
                    customerName={customerName}
                    profile={profile}
                    evaluation={currentEvaluation}
                    historyCount={historyCount}
                    latestEvaluationDate={latestEvaluationDate}
                    factors={overviewFactors}
                  />
                ) : null}

                {activeTab === "trends" ? (
                  <CreditLensTabShell title="Credit Risk Trend" subtitle={`${trendRange === "6m" ? "6" : "12"}-Month Movement`}>
                    {isTrendLoading && !trendData ? (
                      <PanelStateCard
                        title="Loading trend history"
                        description="Building the customer's month-by-month CreditLens score trend."
                      />
                    ) : trendError && !trendData ? (
                      <PanelStateCard
                        title="Could not load trends"
                        description={trendError}
                        tone="error"
                      />
                    ) : trendData ? (
                      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-[1.45fr_0.85fr]">
                        <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                          <div className="mb-6 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                                {trendData.periodLabel}
                              </p>
                              <h4 className="mt-1 text-xl font-semibold text-white">Credit Risk Score</h4>
                            </div>
                            <Select value={trendRange} onValueChange={(value) => {
                              if (value === "6m" || value === "12m") {
                                setTrendRange(value);
                              }
                            }}>
                              <SelectTrigger className="h-9 w-[142px] border-white/20 bg-white/10 text-slate-100">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border-white/20 bg-[#14345f] text-slate-100">
                                <SelectItem value="6m">6 Months</SelectItem>
                                <SelectItem value="12m">12 Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="min-h-[320px]">
                            <CreditRiskBarChart labels={trendData.labels} values={trendData.values} />
                          </div>
                        </div>

                        <TrendSummaryCard
                          riskLabel={trendData.summary.riskLabel}
                          riskDelta={trendData.summary.riskDelta}
                          trendText={trendData.summary.trendText}
                          biggestDriver={trendData.summary.biggestDriver}
                          momentumText={trendData.summary.momentumText}
                          nextTarget={trendData.summary.nextTarget}
                          hasSufficientHistory={hasSufficientTrendHistory}
                          insufficientHistoryTitle="Not enough trend history yet"
                          insufficientHistoryDescription="At least 2 monthly evaluations are needed before CreditLens can show score movement, biggest drivers, and monthly momentum."
                        />
                      </div>
                    ) : (
                      <PanelStateCard
                        title="No trend history available yet"
                        description="Once more monthly evaluations are available, the trend line and summary will appear here."
                      />
                    )}
                  </CreditLensTabShell>
                ) : null}

                {activeTab === "credit-insights" ? (
                  <CreditLensTabShell title="Credit Insights" subtitle="Risk Drivers and Positive Signals">
                    {isInsightsLoading && !insights ? (
                      <PanelStateCard
                        title="Loading credit insights"
                        description="Preparing key risk factors, positive behaviors, and practical guidance for this customer."
                      />
                    ) : insightsError && !insights ? (
                      <PanelStateCard
                        title="Could not load insights"
                        description={insightsError}
                        tone="error"
                      />
                    ) : insights ? (
                      <div className="flex h-full flex-col gap-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                          <KeyRiskFactorsCard items={insights.keyRiskFactors} />
                          <PositiveBehaviorsCard items={insights.positiveBehaviors} />
                          <FinancialTipsCard items={insights.financialTips} />
                        </div>

                        <ActionBanner
                          title={insights.reportBannerTitle}
                          description={insights.reportBannerDescription}
                          actionLabel={insights.reportActionLabel}
                          onAction={() => setActiveTab("reports")}
                        />
                      </div>
                    ) : (
                      <PanelStateCard
                        title="No insights available yet"
                        description="Insight cards will appear once a CreditLens evaluation exists for this customer."
                      />
                    )}
                  </CreditLensTabShell>
                ) : null}

                {activeTab === "reports" ? (
                  <CreditLensTabShell title="Credit Reports" subtitle="Monthly Evaluation Snapshot">
                    {isReportLoading && !currentReportSnapshot ? (
                      <PanelStateCard
                        title="Loading report snapshots"
                        description="Preparing the customer's month-by-month CreditLens report view."
                      />
                    ) : reportError && !currentReportSnapshot ? (
                      <PanelStateCard
                        title="Could not load reports"
                        description={reportError}
                        tone="error"
                      />
                    ) : currentReportSnapshot ? (
                      <div className="flex h-full flex-col gap-6">
                        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="w-full sm:w-[220px]">
                            <Select value={selectedMonth ?? currentReportSnapshot.month} onValueChange={setSelectedMonth}>
                              <SelectTrigger className="h-10 border-white/20 bg-white/10 text-slate-100 data-[placeholder]:text-slate-300">
                                <SelectValue placeholder="Select Month" />
                              </SelectTrigger>
                              <SelectContent className="border-white/20 bg-[#14345f] text-slate-100">
                                {reportData.map((snapshot) => (
                                  <SelectItem
                                    key={snapshot.month}
                                    value={snapshot.month}
                                    className="text-slate-100 hover:bg-white/15 hover:text-white focus:bg-white/15 focus:text-white"
                                  >
                                    {snapshot.month}
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
                          <ReportMetricCard
                            title="Monthly Income"
                            value={formatCurrency(currentReportSnapshot.income)}
                            icon={<Banknote className="h-5 w-5" />}
                            tone="green"
                          />
                          <ReportMetricCard
                            title="Loan"
                            value={`EMI: ${formatCurrency(currentReportSnapshot.loanEmi)}`}
                            subValue={currentReportSnapshot.loanRemainingBalance != null
                              ? `Remaining Balance: ${formatCurrency(currentReportSnapshot.loanRemainingBalance)}`
                              : "Remaining Balance: Not available"}
                            icon={<ReceiptText className="h-5 w-5" />}
                            tone="orange"
                          />
                          <ReportMetricCard
                            title="Credit Card"
                            value={formatCurrency(currentReportSnapshot.creditCardBalance)}
                            subValue={`Limit: ${formatCurrency(currentReportSnapshot.creditCardLimit)}`}
                            icon={<CreditCard className="h-5 w-5" />}
                            tone="blue"
                          />
                          <ReportMetricCard
                            title="Other Liabilities"
                            value={formatCurrency(currentReportSnapshot.otherLiabilities)}
                            icon={<Landmark className="h-5 w-5" />}
                            tone="violet"
                          />
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1.05fr_1.05fr_1fr]">
                          <div className="creditlens-card creditlens-card-hover min-w-0 rounded-2xl bg-white/92 p-5 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)] sm:p-6 md:rounded-[26px] md:p-7">
                            <h3 className="text-center text-lg font-semibold text-slate-900 sm:text-xl">Credit Summary</h3>

                            <div className="mt-6 flex justify-center">
                              <CreditSummaryDonut
                                score={currentReportSnapshot.score}
                                riskLabel={currentReportSnapshot.riskLabel}
                              />
                            </div>

                            <div className="mt-6 border-t pt-5 text-sm text-slate-600">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span>Evaluation Type:</span>
                                <span className="font-semibold text-slate-900">
                                  {currentReportSnapshot.evaluationType}
                                </span>
                              </div>
                              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                <span>Risk Category:</span>
                                <span className="font-semibold text-amber-600">
                                  {currentReportSnapshot.riskLabel}
                                </span>
                              </div>
                              <div className="mt-5 text-center text-xs text-slate-400">
                                LAST UPDATED: {currentReportSnapshot.lastUpdated}
                              </div>
                            </div>
                          </div>

                          <BehaviorExposureCard snapshot={currentReportSnapshot} />
                          <RiskPointsBreakdown factors={currentReportSnapshot.factors} score={currentReportSnapshot.score} />
                        </div>
                      </div>
                    ) : (
                      <PanelStateCard
                        title="No report data available yet"
                        description="Monthly report snapshots will appear once the customer's CreditLens history is available."
                      />
                    )}
                  </CreditLensTabShell>
                ) : null}
              </div>
            </>
          )}
        </main>
      </div>

      {currentReportSnapshot ? (
        <ReportDownloadModal
          open={isDownloadModalOpen}
          onOpenChange={setIsDownloadModalOpen}
          fileBaseName={reportFileBaseName}
          fileType={reportFileType}
          onFileTypeChange={setReportFileType}
          monthLabel={selectedMonth ?? currentReportSnapshot.month}
          score={currentReportSnapshot.score}
          riskLabel={currentReportSnapshot.riskLabel}
        />
      ) : null}
    </AuthGuard>
  );
}

function OverviewTab({
  customerName,
  profile,
  evaluation,
  historyCount,
  latestEvaluationDate,
  factors,
}: {
  customerName: string;
  profile: BankCreditAnalysisCustomerProfileResponse;
  evaluation: BankCreditEvaluationResponse;
  historyCount: number;
  latestEvaluationDate: string | null;
  factors: Array<{
    name: string;
    value: number;
    max: number;
    color?: string;
  }>;
}) {
  return (
    <div className="flex h-full flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b1f47_0%,#0f2f63_55%,#12386f_100%)] p-6 text-white shadow-[0_12px_32px_rgba(2,12,36,0.35)] lg:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-400/20 blur-[100px]" />

        <div className="relative z-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Customer Profile</p>
              <h2 className="mt-2 text-3xl font-bold text-white">{customerName}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/10">
                  {profile.customerCode}
                </Badge>
                <Badge className="border border-white/20 bg-amber-300/15 text-amber-200 hover:bg-amber-300/15">
                  {evaluation.riskLabel}
                </Badge>
                <Badge className="border border-white/20 bg-emerald-300/15 text-emerald-200 hover:bg-emerald-300/15">
                  {profile.accountStatus}
                </Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailTile icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} />
              <DetailTile icon={<Phone className="h-4 w-4" />} label="Phone" value={profile.phone} />
              <DetailTile icon={<UserRound className="h-4 w-4" />} label="NIC" value={profile.nic} />
              <DetailTile icon={<Building2 className="h-4 w-4" />} label="Account" value={`${profile.accountType} - ${profile.accountNumber}`} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <MiniStat title="History Records" value={String(historyCount)} helper="Monthly evaluations saved" />
              <MiniStat title="Customer Status" value={profile.status} helper="Ownership verified" />
              <MiniStat title="Last Review" value={formatDate(latestEvaluationDate)} helper="Latest CreditLens run" />
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm lg:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-slate-300">Current Evaluation</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">Credit Risk Score</h3>
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-center">
                <div className="text-xs text-slate-200">Risk Level</div>
                <div className="text-sm font-semibold text-white">{evaluation.riskLabel}</div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="mx-auto h-[220px] w-full max-w-[340px]">
                <CreditRiskGauge value={evaluation.totalRiskPoints} />
                <div className="-mt-16 text-center">
                  <div className="text-5xl font-bold tracking-tight text-[#fbbf24]">{evaluation.totalRiskPoints}</div>
                  <div className="mt-1 text-base text-slate-200">{evaluation.riskLabel}</div>
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="mb-4 text-lg font-semibold text-white">Score Factors</h4>
                <RiskFactorBars factors={factors} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <OverviewMetricTile
          title="Monthly Income"
          value={formatCurrency(evaluation.totalMonthlyIncome)}
          helper="Verified bank-customer income"
          tone="green"
        />
        <OverviewMetricTile
          title="Monthly Debt Payment"
          value={formatCurrency(evaluation.totalMonthlyDebtPayment)}
          helper="Loans, card minimums, and liabilities"
          tone="orange"
        />
        <OverviewMetricTile
          title="Missed Payments"
          value={String(evaluation.missedPaymentsCount)}
          helper="Tracked in the last 12 months"
          tone="red"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="creditlens-card creditlens-card-hover rounded-2xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.35)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Credit Pressure</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Borrowing and utilization indicators</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {evaluation.dtiBand}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <OverviewBar
              label="Debt-to-Income"
              valueLabel={`${formatPercentageFromRatio(evaluation.dtiRatio)} (${evaluation.dtiPoints}/25)`}
              percentage={Math.min(100, Math.max(0, (evaluation.dtiPoints / 25) * 100))}
              colorClass="[&>div]:bg-emerald-500"
            />
            <OverviewBar
              label="Credit Utilization"
              valueLabel={`${formatPercentageFromRatio(evaluation.creditUtilizationRatio)} (${evaluation.utilizationPoints}/20)`}
              percentage={Math.min(100, Math.max(0, (evaluation.utilizationPoints / 20) * 100))}
              colorClass="[&>div]:bg-rose-500"
            />
            <OverviewBar
              label="Payment History"
              valueLabel={`${evaluation.paymentHistoryPoints}/30`}
              percentage={Math.min(100, Math.max(0, (evaluation.paymentHistoryPoints / 30) * 100))}
              colorClass="[&>div]:bg-amber-500"
            />
          </div>
        </div>

        <div className="creditlens-card creditlens-card-hover rounded-2xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.35)]">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Evaluation Notes</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Officer-side summary</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <DetailRow label="Evaluation Source" value={evaluation.evaluationSource} />
            <DetailRow label="Active Facilities" value={String(evaluation.activeFacilitiesCount)} />
            <DetailRow label="Card Outstanding" value={formatCurrency(evaluation.totalCardOutstanding)} />
            <DetailRow label="Card Limit" value={formatCurrency(evaluation.totalCardLimit)} />
            <DetailRow label="Remarks" value={evaluation.remarks || "No officer remarks recorded"} />
          </div>
        </div>
      </section>
    </div>
  );
}

function CreditLensTabShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b1f47_0%,#0f2f63_55%,#12386f_100%)] p-6 text-white shadow-[0_12px_32px_rgba(2,12,36,0.35)] lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_460px_at_100%_8%,rgba(56,189,248,0.16),transparent_65%),radial-gradient(780px_420px_at_0%_100%,rgba(59,130,246,0.14),transparent_70%)]" />
      <div className="relative z-10 flex h-full flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{subtitle}</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{title}</h3>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </section>
  );
}

function PanelStateCard({
  title,
  description,
  tone = "default",
}: {
  title: string;
  description: string;
  tone?: "default" | "error";
}) {
  const iconClass = tone === "error"
    ? "bg-rose-100 text-rose-600"
    : "bg-sky-100 text-sky-700";

  return (
    <div className="creditlens-card flex h-full min-h-[240px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-8 text-center md:rounded-[26px]">
      <div className="max-w-xl space-y-3">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}>
          <TriangleAlert className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-200">{description}</p>
      </div>
    </div>
  );
}

function ActionBanner({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="creditlens-card creditlens-card-hover relative overflow-hidden rounded-2xl border border-[#4f96c6]/35 bg-[#124b74] p-4 text-white shadow-[0_24px_46px_-30px_rgba(2,18,33,0.84)] sm:p-6 md:rounded-[26px] md:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(12,48,74,0.24)_0%,rgba(12,48,74,0.35)_58%,rgba(12,48,74,0.5)_100%)]" />
      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="text-lg font-semibold sm:text-xl md:text-2xl">{title}</div>
          <p className="mt-1 max-w-3xl text-sm text-white/85 sm:text-base">{description}</p>
        </div>

        <Button
          onClick={onAction}
          className="h-11 w-full rounded-xl bg-white px-6 text-[#0b2447] hover:bg-white/90 sm:h-12 sm:w-auto sm:shrink-0"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

function DetailTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-slate-200">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function MiniStat({
  title,
  value,
  helper,
}: {
  title: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-300">{title}</div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-300">{helper}</div>
    </div>
  );
}

function OverviewMetricTile({
  title,
  value,
  helper,
  tone,
}: {
  title: string;
  value: string;
  helper: string;
  tone: "green" | "orange" | "red";
}) {
  const toneClass = tone === "green"
    ? "border-emerald-200 bg-emerald-50/70 text-emerald-700"
    : tone === "orange"
      ? "border-amber-200 bg-amber-50/70 text-amber-700"
      : "border-rose-200 bg-rose-50/70 text-rose-700";

  return (
    <div className={`creditlens-card creditlens-card-hover rounded-2xl border bg-white/92 p-5 shadow-[0_16px_50px_-40px_rgba(2,44,67,0.45)] ${toneClass}`}>
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="mt-2 text-xs">{helper}</div>
    </div>
  );
}

function OverviewBar({
  label,
  valueLabel,
  percentage,
  colorClass,
}: {
  label: string;
  valueLabel: string;
  percentage: number;
  colorClass: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-white">{label}</span>
        <span className="text-slate-200">{valueLabel}</span>
      </div>
      <Progress value={percentage} className={`h-3 bg-white/15 ${colorClass}`} />
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3 text-sm last:border-b-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className="max-w-[65%] text-right font-medium text-slate-900">{value}</span>
    </div>
  );
}

function buildLatestHistoryByMonth(
  history: BankCreditEvaluationSummaryResponse[],
): Map<string, BankCreditEvaluationSummaryResponse> {
  const entries = new Map<string, BankCreditEvaluationSummaryResponse>();

  for (const item of history) {
    const monthKey = toMonthKey(item.createdAt);
    const existing = entries.get(monthKey);

    if (!existing || Date.parse(item.createdAt) > Date.parse(existing.createdAt)) {
      entries.set(monthKey, item);
    }
  }

  return entries;
}

function mapOfficerReportSnapshots(
  report: CreditReportResponse,
  latestHistoryByMonth: Map<string, BankCreditEvaluationSummaryResponse>,
  financialRecordMap: Map<number, { loanRemainingBalance: number }>,
): OfficerReportSnapshot[] {
  return report.snapshots
    .map((snapshot) => {
      const monthKey = toMonthKey(snapshot.lastUpdated);
      const historyEntry = latestHistoryByMonth.get(monthKey);
      const financialRecord = historyEntry
        ? financialRecordMap.get(historyEntry.bankRecordId)
        : undefined;

      return {
        month: snapshot.monthLabel,
        lastUpdatedIso: snapshot.lastUpdated,
        income: snapshot.income,
        loanEmi: snapshot.loanEmi,
        loanRemainingBalance: financialRecord?.loanRemainingBalance ?? null,
        creditCardBalance: snapshot.creditCardBalance,
        creditCardLimit: snapshot.creditCardLimit,
        otherLiabilities: snapshot.otherLiabilities,
        score: snapshot.score,
        riskLabel: normalizeLabel(snapshot.riskLabel),
        evaluationType: snapshot.evaluationType || report.evaluationType,
        lastUpdated: snapshot.lastUpdatedLabel,
        missedPayments: snapshot.missedPayments,
        activeFacilities: snapshot.activeFacilities,
        dti: roundMetric(snapshot.dtiPercentage),
        utilization: roundMetric(snapshot.utilizationPercentage),
        dtiLabel: normalizeLabel(snapshot.dtiLabel),
        factors: snapshot.factors.map((factor) => ({
          name: factor.name,
          value: factor.value,
          max: factor.max,
        })),
      };
    })
    .sort((left, right) => Date.parse(left.lastUpdatedIso) - Date.parse(right.lastUpdatedIso));
}

function sumRemainingLoanBalance(record: {
  loans: Array<{
    remainingBalance: number;
  }>;
}) {
  return record.loans.reduce((total, loan) => total + loan.remainingBalance, 0);
}

function normalizeLabel(value?: string): LabelTone {
  const normalized = (value ?? "").trim().toLowerCase();

  if (normalized.includes("low")) {
    return "Low";
  }
  if (normalized.includes("high")) {
    return "High";
  }
  return "Medium";
}

function roundMetric(value: number): number {
  return Number(value.toFixed(1));
}

function formatCurrency(value: number): string {
  return `LKR ${value.toLocaleString()}`;
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPercentageFromRatio(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function toMonthKey(value: string): string {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}`;
  }

  return value.slice(0, 7);
}

function factorColor(name: string): string {
  const normalized = name.toLowerCase();

  if (normalized.includes("payment")) {
    return "#f59e0b";
  }
  if (normalized.includes("utilization")) {
    return "#ef4444";
  }
  if (normalized.includes("income")) {
    return "#38bdf8";
  }
  if (normalized.includes("facilities") || normalized.includes("exposure")) {
    return "#22c55e";
  }
  return "#4ade80";
}
