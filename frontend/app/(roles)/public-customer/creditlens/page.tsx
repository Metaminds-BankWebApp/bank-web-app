import { Badge, Card, CardContent, CardHeader } from "@/src/components/ui";

export default function PublicCustomerCreditLensPage() {
  return (
    <>
          <header className="space-y-1">
            <h1 className="text-4xl font-bold text-(--primecore-foreground)">CreditLens – Credit Profile</h1>
            <p className="text-sm text-(--primecore-foreground)/65">Understand your score drivers and improvement opportunities.</p>
          </header>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Credit Score", "742", "success"],
              ["Payment History", "98%", "success"],
              ["Credit Utilization", "32%", "warning"],
              ["Active Accounts", "7", "info"],
            ].map(([title, value, variant]) => (
              <Card key={String(title)}>
                <CardHeader><p className="text-sm text-(--primecore-foreground)/70">{title}</p></CardHeader>
                <CardContent className="flex items-center justify-between"><p className="text-4xl font-semibold">{value}</p><Badge variant={variant as "success" | "warning" | "info" | "danger"}>{title === "Credit Score" ? "Good" : "Stable"}</Badge></CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader><h2 className="text-2xl font-semibold">Score Trend</h2></CardHeader>
              <CardContent><div className="h-72 rounded-2xl border border-(--primecore-border) bg-gradient-to-b from-[#60a5fa]/20 to-transparent" /></CardContent>
            </Card>
            <Card>
              <CardHeader><h2 className="text-2xl font-semibold">Improvement Tips</h2></CardHeader>
              <CardContent className="space-y-3 text-sm text-(--primecore-foreground)/80">
                <p>• Keep utilization under 30% for the next billing cycle.</p>
                <p>• Avoid multiple hard inquiries this month.</p>
                <p>• Maintain on-time payments on all active loans.</p>
                <p>• Review unused accounts and close selectively.</p>
              </CardContent>
            </Card>
          </section>
    </>
  );
}

