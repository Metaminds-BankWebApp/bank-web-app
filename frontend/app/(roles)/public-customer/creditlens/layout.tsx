
import { FeatureLayout } from "@/src/components/layout";

/**
 * Shared layout wrapper for all public-customer CreditLens routes.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureLayout role="PUBLIC_CUSTOMER" feature="creditlens">
      {children}
    </FeatureLayout>
  );
}
