"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqAddPage } from "@/src/components/spendiq/spendiq-add-page";

export default function BankCustomerSpendIqAddPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqAddPage />
    </AuthGuard>
  );
}
