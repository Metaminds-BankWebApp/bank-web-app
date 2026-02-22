import { FeatureLayout } from "@/src/components/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureLayout role="PUBLIC_CUSTOMER" feature="spendiq">
      {children}
    </FeatureLayout>
  );
}