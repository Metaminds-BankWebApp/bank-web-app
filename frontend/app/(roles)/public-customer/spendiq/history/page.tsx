"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqHistoryPage } from "@/src/components/spendiq/spendiq-history-page";

export default function PublicCustomerSpendIqHistoryPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqHistoryPage />
    </AuthGuard>
  );
}
