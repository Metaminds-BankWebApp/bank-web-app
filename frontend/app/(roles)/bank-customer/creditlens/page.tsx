import { Badge, Card, CardContent, CardHeader } from "@/src/components/ui";

export default function BankCustomerCreditLensPage() {
  return (
    <>
      <header className="space-y-1">
        <h1 className="text-4xl font-bold text-(--primecore-foreground)">CreditLens – Portfolio Risk Dashboard</h1>
        <p className="text-sm text-(--primecore-foreground)/65">Monitor customer credit health and trend changes.</p>
      </header>

          <section className="mt-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Average credit score trend</h2>
              </CardHeader>
              <CardContent>
                <div className="h-80 rounded-2xl border border-(--primecore-border) bg-gradient-to-b from-[#60a5fa]/20 to-transparent" />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {[
                ["Low Risk Customers", "5,000", "success", "+1.5%"],
                ["Medium Risk Customers", "12,000", "info", "+3.6%"],
                ["High Risk Customers", "5,000", "danger", "-1.5%"],
              ].map(([title, value, variant, delta]) => (
                <Card key={String(title)}>
                  <CardHeader><p className="text-sm text-(--primecore-foreground)/70">{title}</p></CardHeader>
                  <CardContent className="flex items-center justify-between"><p className="text-5xl font-semibold">{value}</p><Badge variant={variant as "success" | "warning" | "info" | "danger"}>{delta}</Badge></CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <Card className="bg-[linear-gradient(135deg,#3e9fd3,#1e40af,#0d3b66)] text-white">
              <CardHeader><h2 className="text-4xl font-bold text-(--primecore-navy)">Credit Improvement Campaign</h2></CardHeader>
              <CardContent>
                <p className="text-sm text-(--primecore-navy)">Target high-risk segments with timely reminders and personalized lending guidance.</p>
              </CardContent>
            </Card>
          </section>
    </>
  );
}
