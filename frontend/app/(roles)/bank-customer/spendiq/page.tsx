import { Badge, Card, CardContent, CardHeader } from "@/src/components/ui";

export default function BankCustomerSpendIQPage() {
  return (
    <>
      <header className="space-y-1">
        <h1 className="text-4xl font-bold text-(--primecore-foreground)">SpendIQ – Expense Overview</h1>
        <p className="text-sm text-(--primecore-foreground)/65">Track and manage your personal spending.</p>
      </header>

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
              <CardHeader><h2 className="text-2xl font-semibold">Budget Usage by Category</h2></CardHeader>
              <CardContent className="space-y-4">
                {[
                  ["Food & Dining", "156.75 / 400.00", "w-[39%]"],
                  ["Transportation", "30.00 / 150.00", "w-[20%]"],
                  ["Shopping", "120.00 / 300.00", "w-[40%]"],
                  ["Entertainment", "50.00 / 200.00", "w-[25%]"],
                  ["Utilities", "200.00 / 250.00", "w-[80%]"],
                  ["Healthcare", "65.00 / 100.00", "w-[65%]"],
                ].map(([name, value, width]) => (
                  <div key={String(name)} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span>{name}</span>
                      <span className="text-(--primecore-foreground)/70">{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e5e7eb]"><div className={"h-full rounded-full bg-[#0f172a] " + width} /></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="mt-6">
            <Card>
              <CardHeader><h2 className="text-2xl font-semibold">Recent Expenses</h2></CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["Food & Dining", "Lunch at downtown cafe", "$45.50", "Card"],
                  ["Shopping", "New running shoes", "$120.00", "Online"],
                  ["Transportation", "Weekly metro pass", "$30.00", "Cash"],
                ].map(([title, desc, amount, tag]) => (
                  <div key={String(title)} className="flex items-center justify-between rounded-xl bg-(--primecore-surface-soft) px-4 py-3">
                    <div>
                      <p className="font-medium">{title} <Badge className="ml-2" variant="info">{tag}</Badge></p>
                      <p className="text-sm text-(--primecore-foreground)/65">{desc}</p>
                    </div>
                    <p className="text-2xl font-semibold">{amount}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
    </>
  );
}
