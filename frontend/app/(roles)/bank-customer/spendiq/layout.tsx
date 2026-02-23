
import { FeatureLayout } from "@/src/components/layout";
import ResponsiveContainer from "@/src/components/ui/responsive-container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureLayout role="BANK_CUSTOMER" feature="spendiq">
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </FeatureLayout>
  );
}
