"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqHelpPage } from "@/src/components/spendiq/spendiq-help-page";

export default function PublicCustomerSpendIqHelpPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqHelpPage />
    </AuthGuard>
  );
}
