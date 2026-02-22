"use client";

import { useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { BankOfficerHeader, Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Input, Switch } from "@/src/components/ui";

export default function BankOfficerSettingsPage() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailDigestEnabled, setEmailDigestEnabled] = useState(true);
  const [kycEscalationEnabled, setKycEscalationEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeChecks, setActiveChecks] = useState({
    incomeProof: true,
    addressValidation: true,
    fraudSignals: true,
    manualReview: false,
  });

  const toggleCheck = (key: keyof typeof activeChecks) => {
    setActiveChecks((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />

        <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
          <BankOfficerHeader title="Settings" className="mb-5 shrink-0" roleLabel="Bank Officer" />

          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="mb-6 text-sm text-slate-500">
              Dashboard <span className="mx-2 text-slate-400">▶</span>
              <span className="text-[#3e9fd3] font-medium">Settings</span>
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Officer Profile & Branch Preferences</CardTitle>
                    <p className="text-sm text-slate-500">Update operational defaults used during customer verification and loan review.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Display Name" defaultValue="Kamal Edirisinghe" className="bg-white" />
                      <Input label="Branch Code" defaultValue="BR-014" className="bg-white" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Approval Limit (LKR)" defaultValue="500000" className="bg-white" />
                      <Input label="Daily Review Target" defaultValue="25" className="bg-white" />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <Button variant="outline">Discard</Button>
                      <Button className="bg-[#0d3b66] text-white hover:bg-[#0a2f52]">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Verification Checklist Controls</CardTitle>
                    <p className="text-sm text-slate-500">Choose mandatory checks before approving accounts and applications.</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={activeChecks.incomeProof} onChange={() => toggleCheck("incomeProof")} />
                        Income proof validation
                      </span>
                      <span className="text-xs font-medium text-slate-500">Required</span>
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={activeChecks.addressValidation} onChange={() => toggleCheck("addressValidation")} />
                        Address validation check
                      </span>
                      <span className="text-xs font-medium text-slate-500">Required</span>
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={activeChecks.fraudSignals} onChange={() => toggleCheck("fraudSignals")} />
                        Fraud signal scoring
                      </span>
                      <span className="text-xs font-medium text-slate-500">Recommended</span>
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={activeChecks.manualReview} onChange={() => toggleCheck("manualReview")} />
                        Manual final review by officer
                      </span>
                      <span className="text-xs font-medium text-slate-500">Optional</span>
                    </label>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">High-risk alerts</p>
                        <p className="text-xs text-slate-500">Immediate alert for risky customers</p>
                      </div>
                      <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Daily email digest</p>
                        <p className="text-xs text-slate-500">Summary of pending actions</p>
                      </div>
                      <Switch checked={emailDigestEnabled} onCheckedChange={setEmailDigestEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">KYC escalation alerts</p>
                        <p className="text-xs text-slate-500">Escalate overdue KYC cases</p>
                      </div>
                      <Switch checked={kycEscalationEnabled} onCheckedChange={setKycEscalationEnabled} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Two-factor authentication</p>
                        <p className="text-xs text-slate-500">Add OTP protection for sign-in</p>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>
                    <div className="space-y-2">
                      <Input label="Change Password" type="password" placeholder="Enter a new password" className="bg-white" />
                      <Button variant="secondary" className="w-full">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
