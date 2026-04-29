"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqDashboardPage } from "@/src/components/spendiq/spendiq-dashboard-page";

export default function BankCustomerSpendIqDashboardPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqDashboardPage spendIqRoot="/bank-customer/spendiq" />
    </AuthGuard>
  );
}
