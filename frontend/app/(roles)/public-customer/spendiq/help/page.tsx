"use client";

import { AuthGuard } from "@/src/components/auth";
import { FeatureHelpSupportPage } from "@/src/components/support/feature-help-support-page";

export default function PublicCustomerSpendIqHelpPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <FeatureHelpSupportPage feature="SpendIQ" role="Public Customer" />
    </AuthGuard>
  );
}
