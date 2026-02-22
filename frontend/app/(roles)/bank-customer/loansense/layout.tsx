
import { FeatureLayout } from "@/src/components/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureLayout role="BANK_CUSTOMER" feature="loansense">
      {children}
    </FeatureLayout>
  );
}

