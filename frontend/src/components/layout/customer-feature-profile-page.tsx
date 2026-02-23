import { Badge } from "@/src/components/ui";
import ModuleHeader from "@/src/components/ui/module-header";
import { Camera, Lock, ShieldCheck, User } from "lucide-react";

type CustomerRoleLabel = "Bank Customer" | "Public Customer";

type CustomerFeatureProfilePageProps = {
  featureName: string;
  roleLabel: CustomerRoleLabel;
};

type SummaryItem = {
  label: string;
  value: string;
};

type FieldItem = {
  label: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
};

type RoleProfileConfig = {
  badgeText: string;
  summary: SummaryItem[];
  personalInfo: FieldItem[];
  security: FieldItem[];
};

const ROLE_PROFILE_CONFIG: Record<CustomerRoleLabel, RoleProfileConfig> = {
  "Public Customer": {
    badgeText: "PUBLIC CUSTOMER",
    summary: [
      { label: "User ID", value: "PC-8821" },
      { label: "Address", value: "Colombo Central" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { label: "Full Name", value: "John Doe" },
      { label: "Email Address", value: "john.doe@primecore.bank" },
      { label: "Phone Number", value: "+94 77 123 4567" },
      { label: "Address", value: "Colombo Central" },
      { label: "NIC", value: "972346682V" },
      { label: "DOB", value: "11-09-1997" },
    ],
    security: [
      { label: "Current Username", value: "JohnDoePC1", readOnly: true, fullWidth: true },
      { label: "New Username", placeholder: "Enter new username", fullWidth: true },
      { label: "Current Password", value: "************", fullWidth: true },
      { label: "New Password", placeholder: "Enter new password" },
      { label: "Confirm Password", placeholder: "Repeat new password" },
    ],
  },
  "Bank Customer": {
    badgeText: "BANK CUSTOMER",
    summary: [
      { label: "User ID", value: "CU-8821" },
      { label: "Branch Location", value: "Colombo Central" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { label: "Full Name", value: "John Doe" },
      { label: "Email Address", value: "john.doe@primecore.bank" },
      { label: "Phone Number", value: "+94 77 123 4567" },
      { label: "Branch (Read-Only)", value: "Colombo Central Branch", readOnly: true },
      { label: "NIC", value: "972346682V" },
    ],
    security: [
      { label: "Current Username", value: "JohnDoeBC1", readOnly: true, fullWidth: true },
      { label: "New Username", placeholder: "Enter new username", fullWidth: true },
      { label: "Current Password", value: "************", fullWidth: true },
      { label: "New Password", placeholder: "Enter new password" },
      { label: "Confirm Password", placeholder: "Repeat new password" },
    ],
  },
};

export function CustomerFeatureProfilePage({ featureName, roleLabel }: CustomerFeatureProfilePageProps) {
  const isCreditLens = featureName === "CreditLens";
  const isTransact = featureName === "Transact";
  const isLoanSense = featureName === "LoanSense";
  const profileConfig = ROLE_PROFILE_CONFIG[roleLabel];
  const sectionClassName = isTransact
    ? "transact-card transact-card-hover transact-creditlens-shade rounded-2xl p-6"
    : isLoanSense
    ? "loansense-card loansense-card-hover loansense-creditlens-shade rounded-2xl p-6"
    : "rounded-2xl border border-slate-100 bg-white p-6 shadow-sm";

  const renderFeatureHeader = () => {
    if (featureName === "CreditLens") {
      return <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Profile" subtitle="" name="John Doe" role={roleLabel} />;
    }

    if (featureName === "Transact") {
      return (
        <ModuleHeader
          theme="transact"
          menuMode="feature-layout"
          role="Bank Customer"
          title="Profile"
          subtitle={`John Doe - ${roleLabel}`}
          name={`John Doe - ${roleLabel}`}
        />
      );
    }

    if (featureName === "LoanSense") {
      return <ModuleHeader theme="loansense" menuMode="feature-layout" title="Profile" />;
    }

    if (featureName === "SpendIQ") {
      return <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Profile" />;
    }

    return <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Profile" subtitle="" name="John Doe" role={roleLabel} />;
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isTransact || isLoanSense ? "bg-transparent" : "bg-[#f3f4f6]"}`}>
      {renderFeatureHeader()}

      <div className="mx-auto my-auto w-full max-h-full max-w-7xl space-y-6 sm:mt-20">
        

        <div className={isCreditLens ? "grid gap-6 lg:px-2 xl:grid-cols-[1fr_1.6fr] xl:px-3" : "grid gap-6 xl:grid-cols-[1fr_1.6fr]"}>
          <div className="space-y-6">
            <section className={sectionClassName}>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#e2edf6] text-3xl font-bold text-[#0d3b66]">
                  JD
                  <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
                    <Camera size={14} />
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#0d3b66]">John Doe</h2>
                  <Badge className="mt-2 rounded-full bg-[#ecfdf5] text-[#059669] hover:bg-[#ecfdf5]">{profileConfig.badgeText}</Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {profileConfig.summary.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-semibold text-[#0d3b66]">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClassName}>
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <ShieldCheck size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Security & Session</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-slate-500">Last Login</span>
                  <span className="font-semibold text-[#0d3b66]">October 25, 2023 - 10:45 AM</span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className={sectionClassName}>
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <User size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Personal Information</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {profileConfig.personalInfo.map((field) => (
                  <div key={field.label} className={field.fullWidth ? "md:col-span-2" : undefined}>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                    <input
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      className={`h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none ${field.readOnly ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-700"}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClassName}>
              <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                <Lock size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Security Settings</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {profileConfig.security.map((field) => (
                  <div key={field.label} className={field.fullWidth ? "md:col-span-2" : undefined}>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                    <input
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      className={`h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none ${field.readOnly ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-700"}`}
                    />
                  </div>
                ))}
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


