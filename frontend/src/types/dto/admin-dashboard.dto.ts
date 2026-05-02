export type AdminDashboardSummaryResponse = {
  totalUsers: number;
  totalBranches: number;
  totalOfficers: number;
  totalTransactions: number;
};

export type AdminMonthlyUserGrowthPointResponse = {
  year: number;
  month: number;
  label: string;
  totalUsers: number;
  bankUsers: number;
  publicUsers: number;
};

export type AdminMonthlyUserGrowthResponse = {
  months: number;
  points: AdminMonthlyUserGrowthPointResponse[];
};

export type AdminRecentActionResponse = {
  actionId: number;
  title: string;
  details: string | null;
  actionType: string;
  targetType: string | null;
  targetId: string | null;
  tone: "SUCCESS" | "WARNING" | "INFO" | "ERROR";
  actorName: string;
  createdAt: string;
};
