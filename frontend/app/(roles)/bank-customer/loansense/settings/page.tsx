import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import ModuleHeader from "@/src/components/ui/module-header";

export default function LoanSenseSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col gap-8 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="Settings" />
      <div className="loansense-card loansense-creditlens-shade rounded-[32px] p-2 sm:p-3">
        <FeatureSettingsPage featureColorClass="bg-[#0d3b66]" />
      </div>
    </div>
  );
}
