"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqHistoryPage } from "@/src/components/spendiq/spendiq-history-page";

export default function BankCustomerSpendIqHistoryPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqHistoryPage />
    </AuthGuard>
  );
}
