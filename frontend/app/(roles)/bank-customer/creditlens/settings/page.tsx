import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import CreditlensHeader from "@/src/components/ui/Creditlens-header";

export default function CreditLensSettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
      <CreditlensHeader title="Settings" subtitle="CreditLens - Settings" />
      <FeatureSettingsPage featureColorClass="bg-[#0a234c]" />
    </div>
  );
}
