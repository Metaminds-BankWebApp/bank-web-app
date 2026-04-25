"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqCategoryTransactionsPage } from "@/src/components/spendiq/spendiq-category-transactions-page";

export default function BankCustomerCategoryTransactionsPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqCategoryTransactionsPage />
    </AuthGuard>
  );
}
