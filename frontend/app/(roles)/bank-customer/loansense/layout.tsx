/**
 * Shared LoanSense layout wrapper that keeps module navigation and page framing consistent across routes.
 */

import { FeatureLayout } from "@/src/components/layout";

// Shared layout wrapper for LoanSense module routes.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureLayout role="BANK_CUSTOMER" feature="loansense">
      {children}
    </FeatureLayout>
  );
}



