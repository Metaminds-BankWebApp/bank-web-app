import { Badge } from "@/src/components/ui";
import CreditLensHeader from "@/src/components/ui/Creditlens-header";
import TransactHeader from "@/src/components/ui/Transact-Header";
import LoanSenseHeader from "@/src/components/ui/loansenseheader";
import { Bell, Camera, Lock, Mail, ShieldCheck, User } from "lucide-react";

type CustomerFeatureProfilePageProps = {
  featureName: string;
  roleLabel: "Bank Customer" | "Public Customer";
};

export function CustomerFeatureProfilePage({ featureName, roleLabel }: CustomerFeatureProfilePageProps) {
  const renderFeatureHeader = () => {
    if (featureName === "CreditLens") {
      return (
        <CreditLensHeader
          title="Profile"
          subtitle={`${featureName} • ${roleLabel}`}
          name="John Doe"
          role={roleLabel}
        />
      );
    }

    if (featureName === "Transact") {
      return <TransactHeader title="Profile" subtitle={`John Doe • ${roleLabel}`} />;
    }

    if (featureName === "LoanSense") {
      return <LoanSenseHeader title="Profile" name="John Doe" role={roleLabel} />;
    }

    return (
      <header className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#0b1a3a] p-6 text-white shadow-lg md:flex-row">
        <h1 className="w-full text-2xl font-bold tracking-wide md:w-auto">Profile</h1>
        <div className="flex w-full items-center justify-end gap-6 md:w-auto">
          <div className="flex gap-4">
            <button className="relative rounded-full p-2 transition-colors hover:bg-white/10">
              <Mail size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full border border-[#0b1a3a] bg-red-500" />
            </button>
            <button className="relative rounded-full p-2 transition-colors hover:bg-white/10">
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full border border-[#0b1a3a] bg-red-500" />
            </button>
          </div>
          <div className="flex items-center gap-3 border-l border-white/20 pl-6">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200">
              <div className="h-full w-full bg-linear-to-br from-slate-400 to-slate-600" />
            </div>
            <div className="hidden text-right md:block">
              <p className="text-sm font-bold leading-none">John Doe</p>
              <p className="mt-1 text-xs text-white/70">{roleLabel}</p>
            </div>
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {renderFeatureHeader()}

        <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#e2edf6] text-3xl font-bold text-[#0d3b66]">
                JD
                <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
                  <Camera size={14} />
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#0d3b66]">John Doe</h2>
                <Badge className="mt-2 rounded-full bg-[#ecfdf5] text-[#059669] hover:bg-[#ecfdf5]">{roleLabel}</Badge>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-slate-500">Customer ID</span>
                <span className="font-semibold text-[#0d3b66]">#CUST-8821</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-slate-500">Primary Branch</span>
                <span className="font-semibold text-[#0d3b66]">Colombo Central</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-slate-500">Joined Date</span>
                <span className="font-semibold text-[#0d3b66]">Jan 12, 2021</span>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <User size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Personal Information</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Full Name</p>
                  <input defaultValue="John Doe" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Email Address</p>
                  <input defaultValue="john.doe@primecore.bank" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Phone Number</p>
                  <input defaultValue="+94 77 123 4567" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Branch</p>
                  <input defaultValue="Colombo Central Branch" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500 outline-none" readOnly />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <Lock size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Security Settings</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Current Password</p>
                  <input defaultValue="••••••••••" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">New Password</p>
                  <input placeholder="Enter new password" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Confirm Password</p>
                  <input placeholder="Repeat new password" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                <ShieldCheck size={14} className="mt-0.5" />
                <p>Password must be at least 12 characters and include uppercase, lowercase, numbers, and symbols.</p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button className="rounded-full bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0a2e50]">Save Changes</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
