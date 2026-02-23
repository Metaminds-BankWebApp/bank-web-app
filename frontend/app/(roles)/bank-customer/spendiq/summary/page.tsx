import { MockFeaturePage } from "@/src/components/mock-feature-page";
import ModuleHeader from "@/src/components/ui/module-header";

export default function SpendIQSummaryPage() {
  return (
    <div className="space-y-6">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Monthly Summary" />
      <MockFeaturePage title="Monthly Summary" description="Analyze spending patterns over time." hideHeader />
    </div>
  );
}
