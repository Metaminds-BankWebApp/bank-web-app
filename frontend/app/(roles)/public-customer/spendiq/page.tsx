"use client";

import { Card, CardContent, CardHeader } from "@/src/components/ui";
import { SpendIqHeader } from "@/src/components/SpendIqHeader";

export default function PublicCustomerSpendIQPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <SpendIqHeader title="SpendIQ – Expense Overview" />

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Total Expenses</p></CardHeader><CardContent><p className="text-4xl font-semibold">$621.75</p><p className="text-sm text-(--primecore-foreground)/65">This month</p></CardContent></Card>
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Monthly Budget</p></CardHeader><CardContent><p className="text-4xl font-semibold">$2000.00</p><p className="text-sm text-(--primecore-foreground)/65">Total allocated</p></CardContent></Card>
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Remaining Budget</p></CardHeader><CardContent><p className="text-4xl font-semibold text-emerald-600">$1378.25</p><p className="text-sm text-emerald-600">↗ Under budget</p></CardContent></Card>
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Savings Estimate</p></CardHeader><CardContent><p className="text-4xl font-semibold text-[#2563eb]">$1378.25</p><p className="text-sm text-(--primecore-foreground)/65">Potential savings</p></CardContent></Card>
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[1fr_1.1fr]">
            <Card> 
              <CardHeader><h2 className="text-2xl font-semibold">Expense by Category</h2></CardHeader>
              <CardContent><div className="h-72 rounded-2xl border border-(--primecore-border) bg-[radial-gradient(circle_at_center,_#60a5fa_0,_#60a5fa_18%,_#a855f7_18%,_#a855f7_36%,_#ec4899_36%,_#ec4899_50%,_#f59e0b_50%,_#f59e0b_69%,_#ef4444_69%,_#ef4444_84%,_#22c55e_84%,_#22c55e_100%)]" /></CardContent>
            </Card>
            <Card>
              <CardHeader><h2 className="text-2xl font-semibold">Category Budgets</h2></CardHeader>
              <CardContent className="space-y-4">
                {["Food & Dining", "Shopping", "Utilities", "Transport"].map((name, index) => (
                  <div key={name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm"><span>{name}</span><span className="text-(--primecore-foreground)/70">On Track</span></div>
                    <div className="h-2 rounded-full bg-[#e5e7eb]"><div className="h-full rounded-full bg-[#0f172a]" style={{ width: `${30 + index * 17}%` }} /></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
    </div>
  );
}

