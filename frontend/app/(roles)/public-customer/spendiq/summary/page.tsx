"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqSummaryPage } from "@/src/components/spendiq/spendiq-summary-page";

export default function PublicCustomerSpendIqSummaryPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqSummaryPage />
    </AuthGuard>
  );
}
