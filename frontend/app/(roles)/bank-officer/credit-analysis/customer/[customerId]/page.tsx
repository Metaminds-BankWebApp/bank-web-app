"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { UserRound, Phone, Mail as MailIcon, Landmark, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";

export default function CreditAnalysisCustomerPage() {
  const params = useParams<{ customerId: string }>();
  const searchParams = useSearchParams();
  const customerName = searchParams.get("name") || "Amila Silva";
  const customerId = params.customerId || "C-48292";

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto w-full max-w-400 mx-auto">
          <BankOfficerHeader title="Customer Profile" className="mb-6" />

          <div className="mb-8 text-sm text-slate-500">
            Dashboard <span className="mx-2 text-slate-400">▶</span> Credit Analysis <span className="mx-2 text-slate-400">▶</span>{" "}
            <span className="text-[#3e9fd3] font-medium">Customer Details</span>
          </div>

          <div className="mb-6">
            <Button variant="outline" className="gap-2" onClick={() => history.back()}>
              <ArrowLeft size={16} /> Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 border-slate-200 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-sky-100 text-sky-700 font-bold text-2xl flex items-center justify-center mb-4">
                  {customerName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-slate-800">{customerName}</h2>
                <p className="text-sm text-slate-500 mt-1">ID: {customerId}</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoRow icon={<UserRound size={16} />} label="Full Name" value={customerName} />
                <InfoRow icon={<MailIcon size={16} />} label="Email" value="amila.silva@example.com" />
                <InfoRow icon={<Phone size={16} />} label="Phone" value="+94 77 123 4567" />
                <InfoRow icon={<Landmark size={16} />} label="Primary Account" value="Savings • **** 4521" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
      <div className="text-slate-500">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
