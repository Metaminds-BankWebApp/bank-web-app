import { Card, CardContent, CardHeader } from "@/src/components/ui";

export default function BankCustomerTransactPage() {
  return (
    <>
      <header className="space-y-2">
        <h1 className="text-5xl font-bold text-[#0b6d76]">Overview</h1>
      </header>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {["Current Balance", "Total Transactions", "Total Sent", "Total Received"].map((title, index) => (
              <Card key={title} className={index < 2 ? "bg-[#0b6d76] text-white" : ""}>
                <CardHeader>
                  <p className="text-sm font-medium opacity-90">{title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-semibold tracking-tight">{index === 3 ? "12,000" : "5,000"}</p>
                  <p className={index < 2 ? "text-sm text-[#7bffd6]" : "text-sm text-emerald-600"}>↗ {index % 2 === 0 ? "10.6" : "3.6"}%</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-8 grid gap-4 xl:grid-cols-[2fr_1fr]">
            <Card>
              <CardHeader>
                <h2 className="text-3xl font-semibold text-[#0b6d76]">Transaction Timeline</h2>
                <p className="text-sm text-(--primecore-foreground)/65">Transactions 2026 • 12.7k this year</p>
              </CardHeader>
              <CardContent>
                <div className="h-72 rounded-2xl border border-(--primecore-border) bg-gradient-to-b from-[#0b6d76]/20 to-transparent" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Sales Goal</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end justify-between">
                  <p className="text-sm text-(--primecore-foreground)/70">Remaining</p>
                  <p className="text-4xl font-bold">$7,600</p>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-[#dde4ef]"><div className="h-full w-[72%] rounded-full bg-[#0b6d76]" /></div>
                <div className="text-center text-sm text-(--primecore-foreground)/75">Sales: $24,400</div>
              </CardContent>
            </Card>
          </section>
    </>
  );
}
