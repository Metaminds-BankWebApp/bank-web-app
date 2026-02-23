import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import ModuleHeader from "@/src/components/ui/module-header";

export default function TransactSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col gap-8 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Settings" subtitle="Transact - Settings" name="Transact - Settings" />
      <div className="transact-card transact-creditlens-shade rounded-[32px] p-2 sm:p-3">
        <FeatureSettingsPage featureColorClass="bg-[#0B3E5A]" />
      </div>
    </div>
  );
}

