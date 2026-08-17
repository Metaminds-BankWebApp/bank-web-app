"use client";

import { AuthGuard } from "@/src/components/auth";
import { FeatureHelpSupportPage } from "@/src/components/support/feature-help-support-page";

export default function BankCustomerSpendIqHelpPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <FeatureHelpSupportPage feature="SpendIQ" role="Bank Customer" />
    </AuthGuard>
  );
}
