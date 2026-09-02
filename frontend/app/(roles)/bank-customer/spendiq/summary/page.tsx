"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqSummaryPage } from "@/src/components/spendiq/spendiq-summary-page";

export default function BankCustomerSpendIqSummaryPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqSummaryPage />
    </AuthGuard>
  );
}
