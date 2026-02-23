"use client";

import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { Badge } from "@/src/components/ui";
import ModuleHeader from "@/src/components/ui/module-header";
import { Camera, Lock, ShieldCheck, User } from "lucide-react";
import type { UserRole } from "@/config/site";

type StaffRoleLabel = "Bank Officer" | "Admin";

type StaffProfilePageProps = {
  role: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
  roleLabel: StaffRoleLabel;
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

type StaffProfileConfig = {
  displayName: string;
  initials: string;
  badgeText: string;
  summary: SummaryItem[];
  personalInfo: FieldItem[];
  lastLogin: string;
};

const STAFF_PROFILE_CONFIG: Record<StaffRoleLabel, StaffProfileConfig> = {
  "Bank Officer": {
    displayName: "John Doe",
    initials: "JD",
    badgeText: "BANK OFFICER",
    summary: [
      { label: "Employee ID", value: "#EMP-8821" },
      { label: "Branch Location", value: "Colombo Central" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { label: "Full Name", value: "John Doe" },
      { label: "Email Address", value: "john.doe@primecore.bank" },
      { label: "Phone Number", value: "+94 77 123 4567" },
      { label: "Branch (Read-Only)", value: "Colombo Central Branch", readOnly: true },
    ],
    lastLogin: "October 25, 2023 - 10:45 AM",
  },
  Admin: {
    displayName: "John Doe",
    initials: "JD",
    badgeText: "ADMIN",
    summary: [
      { label: "Employee ID", value: "#EMP-8821" },
      { label: "Joined Date", value: "Jan 12, 2021" },
    ],
    personalInfo: [
      { label: "Full Name", value: "John Doe" },
      { label: "Email Address", value: "john.doe@primecore.bank" },
      { label: "Phone Number", value: "+94 77 123 4567" },
    ],
    lastLogin: "October 25, 2023 - 10:45 AM",
  },
};

export function StaffProfilePage({ role, roleLabel }: StaffProfilePageProps) {
  const config = STAFF_PROFILE_CONFIG[roleLabel];

  return (
    <AuthGuard requiredRole={role}>
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role={role} className="max-lg:hidden h-full z-10 relative" />
        
        <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole={role}
            sidebarHideCollapse
            mailBadge={2}
            notificationBadge={8}
            avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
            avatarStatusDot
            name="Kamal Edirisinghe"
            role={roleLabel}
            title="Profile"
            className="mb-6 shrink-0"
          />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mb-8 text-sm text-slate-500">
              Dashboard <span className="mx-2 text-slate-400">&gt;</span>
              <span className="font-medium text-[#3e9fd3]">Profile</span>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_1.8fr]">
              <div className="space-y-6">
                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#e2edf6] text-3xl font-bold text-[#0d3b66]">
                      {config.initials}
                      <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
                        <Camera size={14} />
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#0d3b66]">{config.displayName}</h2>
                      <Badge className="mt-2 rounded-full bg-[#ecfdf5] text-[#059669] hover:bg-[#ecfdf5]">
                        {config.badgeText}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    {config.summary.map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-semibold text-[#0d3b66]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                    <ShieldCheck size={16} />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Security & Session</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-xs font-semibold uppercase text-slate-400">Last Login</p>
                    <p className="font-semibold text-[#0d3b66]">{config.lastLogin}</p>
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                    <User size={16} />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Personal Information</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {config.personalInfo.map((field) => (
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

                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2 text-[#0d3b66]">
                    <Lock size={16} />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Security Settings</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Current Password</p>
                      <input
                        defaultValue="************"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-slate-400">New Password</p>
                      <input
                        placeholder="Enter new password"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Confirm Password</p>
                      <input
                        placeholder="Repeat new password"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                    <ShieldCheck size={14} className="mt-0.5" />
                    <p>Use a strong password with uppercase, lowercase, numbers, and symbols.</p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                      Cancel
                    </button>
                    <button className="rounded-full bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0a2e50]">
                      Save Changes
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

