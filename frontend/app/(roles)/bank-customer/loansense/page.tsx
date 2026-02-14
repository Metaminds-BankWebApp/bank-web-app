import { Badge, Card, CardContent, CardHeader } from "@/src/components/ui";

export default function BankCustomerLoanSensePage() {
  return (
    <>
      <header className="space-y-1">
        <h1 className="text-4xl font-bold text-(--primecore-foreground)">LoanSense – Loan Eligibility Overview</h1>
        <p className="text-sm text-(--primecore-foreground)/65">View available loan categories and affordability indicators.</p>
      </header>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Overall Eligibility</p></CardHeader><CardContent><Badge variant="success">Eligible</Badge></CardContent></Card>
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Credit Risk Level</p></CardHeader><CardContent><Badge variant="success">Low Risk</Badge></CardContent></Card>
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Max Affordable EMI</p></CardHeader><CardContent><p className="text-4xl font-semibold">₹45,000</p></CardContent></Card>
            <Card><CardHeader><p className="text-sm text-(--primecore-foreground)/70">Last Evaluation</p></CardHeader><CardContent><p className="text-xl font-medium">February 8, 2026</p></CardContent></Card>
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {[
                ["Personal Loan", "Flexible personal financing for your needs", "₹1,500,000", "success", "Eligible"],
                ["Vehicle Loan", "Finance your dream vehicle", "₹2,000,000", "success", "Eligible"],
                ["Education Loan", "Invest in your education and future", "₹800,000", "warning", "Partially Eligible"],
              ].map(([title, text, amount, variant, status]) => (
                <Card key={String(title)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">{title}</h2>
                      <span className="text-2xl text-(--primecore-foreground)/40">→</span>
                    </div>
                    <p className="text-sm text-(--primecore-foreground)/65">{text}</p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Badge variant={variant as "success" | "warning" | "info" | "danger"}>{status}</Badge>
                    <p className="text-3xl font-semibold">{amount}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader><h2 className="text-2xl font-semibold">Affordability Indicators</h2></CardHeader>
              <CardContent className="space-y-5">
                {[
                  ["Monthly Income", "₹150,000", "w-full", "bg-[#2563eb]"],
                  ["Total Monthly Debt Obligations", "₹25,000", "w-[16%]", "bg-[#f97316]"],
                  ["DBR Percentage", "16.7%", "w-[16.7%]", "bg-[#22c55e]"],
                ].map(([label, value, width, color]) => (
                  <div key={String(label)} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm"><span>{label}</span><span className="font-semibold">{value}</span></div>
                    <div className="h-2 rounded-full bg-[#e5e7eb]"><div className={"h-full rounded-full " + color + " " + width} /></div>
                  </div>
                ))}
                <div className="pt-2 text-right text-3xl font-semibold text-[#16a34a]">₹50,000</div>
              </CardContent>
            </Card>
          </section>
    </>
  );
}
