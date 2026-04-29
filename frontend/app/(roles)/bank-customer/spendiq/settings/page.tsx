import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import ModuleHeader from "@/src/components/ui/module-header";

export default function BankSpendIQSettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Settings" />
      <FeatureSettingsPage featureColorClass="bg-[#0b1a3a]" />
    </div>
  );
}
