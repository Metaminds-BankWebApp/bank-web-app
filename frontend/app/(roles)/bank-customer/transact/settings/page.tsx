import { FeatureSettingsPage } from "@/src/components/feature-settings-page";
import TransactHeader from "@/src/components/ui/Transact-Header";

export default function TransactSettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
      <TransactHeader title="Settings" subtitle="Transact - Settings" />
      <FeatureSettingsPage featureColorClass="bg-[#0B3E5A]" />
    </div>
  );
}
