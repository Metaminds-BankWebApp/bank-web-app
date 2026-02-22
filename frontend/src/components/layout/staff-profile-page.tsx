"use client";

import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";
import { Lock, ShieldCheck, User } from "lucide-react";
import type { UserRole } from "@/config/site";

type StaffProfilePageProps = {
  role: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
  roleLabel: "Bank Officer" | "Admin";
};

export function StaffProfilePage({ role, roleLabel }: StaffProfilePageProps) {
  return (
    <AuthGuard requiredRole={role}>
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role={role} className="max-lg:hidden h-full" />
        <main className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7 h-full overflow-hidden">
          <BankOfficerHeader title="Profile" className="mb-6 shrink-0" roleLabel={roleLabel} role={role} />

          <div className="flex-1 overflow-y-auto min-h-0">
          <div className="mb-8 text-sm text-slate-500">
            Dashboard <span className="mx-2 text-slate-400">▶</span> <span className="font-medium text-[#3e9fd3]">Profile</span>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_1.8fr]">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-[#e2edf6] text-3xl font-bold text-[#0d3b66]">KE</div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#0d3b66]">Kamal Edirisinghe</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#3e9fd3]">{roleLabel}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-slate-500">Employee ID</span>
                  <span className="font-semibold text-[#0d3b66]">#EMP-8821</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-slate-500">Branch</span>
                  <span className="font-semibold text-[#0d3b66]">Colombo Central Branch</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-slate-500">Joined</span>
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
                    <input defaultValue="Kamal Edirisinghe" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Email</p>
                    <input defaultValue="kamal@primecore.bank" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Phone</p>
                    <input defaultValue="+94 71 982 1001" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Designation</p>
                    <input defaultValue={roleLabel} className="h-11 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500 outline-none" readOnly />
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
                  <p>Use a strong password with uppercase, lowercase, numbers, and symbols.</p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button className="rounded-full bg-[#0d3b66] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0a2e50]">Save Changes</button>
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
