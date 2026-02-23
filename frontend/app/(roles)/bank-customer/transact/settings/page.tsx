import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import ModuleHeader from "@/src/components/ui/module-header";

export default function TransactSettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Settings" subtitle="Transact - Settings" name="Transact - Settings" />
      <FeatureSettingsPage featureColorClass="bg-[#0B3E5A]" />
    </div>
  );
}


