import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import ModuleHeader from "@/src/components/ui/module-header";

export default function PublicSpendIQSettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Settings" />
      <FeatureSettingsPage featureColorClass="bg-[#0b1a3a]" />
    </div>
  );
}

