"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqBudgetPage } from "@/src/components/spendiq/spendiq-budget-page";

export default function BankCustomerSpendIqBudgetPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqBudgetPage />
    </AuthGuard>
  );
}
