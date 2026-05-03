import { FeatureLayout } from "@/src/components/layout";

/**
 * Shared layout wrapper for all bank-customer CreditLens routes.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureLayout role="BANK_CUSTOMER" feature="creditlens">
      {children}
    </FeatureLayout>
  );
}
