import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import SpendIQHeader from "@/src/components/ui/spendiq-header";

export default function PublicSpendIQSettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
      <SpendIQHeader title="Settings" />
      <FeatureSettingsPage featureColorClass="bg-[#0b1a3a]" />
    </div>
  );
}
