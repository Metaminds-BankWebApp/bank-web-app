"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqDashboardPage } from "@/src/components/spendiq/spendiq-dashboard-page";

export default function PublicCustomerSpendIqDashboardPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqDashboardPage spendIqRoot="/public-customer/spendiq" />
    </AuthGuard>
  );
}
