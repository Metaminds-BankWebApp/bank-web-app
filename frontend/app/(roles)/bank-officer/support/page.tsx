import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { FeatureHelpSupportPage } from "@/src/components/support/feature-help-support-page";

export default function BankOfficerSupportPage() {
  return <AuthGuard requiredRole="BANK_OFFICER"><div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]"><Sidebar role="BANK_OFFICER" className="h-full max-lg:hidden" /><main className="flex-1 overflow-y-auto bg-[#f3f4f6] lg:rounded-l-[28px]"><FeatureHelpSupportPage feature="Banking Operations" role="Bank Officer" staffLayout /></main></div></AuthGuard>;
}
