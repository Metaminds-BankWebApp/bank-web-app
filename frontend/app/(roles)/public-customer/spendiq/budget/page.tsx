"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqBudgetPage } from "@/src/components/spendiq/spendiq-budget-page";

export default function PublicCustomerSpendIqBudgetPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqBudgetPage />
    </AuthGuard>
  );
}
