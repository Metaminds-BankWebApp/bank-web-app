"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqHelpPage } from "@/src/components/spendiq/spendiq-help-page";

export default function BankCustomerSpendIqHelpPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqHelpPage />
    </AuthGuard>
  );
}
