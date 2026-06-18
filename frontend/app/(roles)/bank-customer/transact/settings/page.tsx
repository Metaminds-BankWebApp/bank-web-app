import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import ModuleHeader from "@/src/components/ui/module-header";

// Transact feature settings entry page for bank customers.
export default function TransactSettingsPage() {
  return (
    // Page shell and spacing for the settings module.
    <div className="flex min-h-screen flex-col gap-8 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      {/* Shared transact module header. */}
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Settings" subtitle="Transact - Settings" name="Transact - Settings" />

      {/* Styled container for feature-level settings content. */}
      <div className="transact-card transact-creditlens-shade rounded-[32px] p-2 sm:p-3">
        <FeatureSettingsPage featureColorClass="bg-[#0B3E5A]" />
      </div>
    </div>
  );
}
