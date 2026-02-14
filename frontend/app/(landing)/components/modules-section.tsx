import { Badge, Card, CardContent, CardHeader } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

const modules = [
  {
    title: "CreditLens",
    text: "Track and improve credit profile with real-time analytics and guided actions.",
    variant: "dark",
  },
  {
    title: "LoanSense",
    text: "Instantly evaluate offers, eligibility and repayment options with confidence.",
    variant: "light",
  },
  {
    title: "SpendIQ",
    text: "AI-powered spending categorization and budget coaching that adapts to behavior.",
    variant: "dark",
  },
  {
    title: "Transact",
    text: "Fast, reliable payments and transfers with clear status and security checks.",
    variant: "light",
  },
] as const;

export function ModulesSection() {
  return (
    <Section id="products">
      <PageShell>
        <div className="mb-6 space-y-2">
          <Badge variant="info">Modules</Badge>
          <h2 className="text-2xl font-bold text-(--primecore-foreground) sm:text-3xl">PrimeCore platform modules</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => (
            <Card
              key={module.title}
              className={
                module.variant === "dark"
                  ? "border-[#0a466f] bg-[linear-gradient(145deg,#082b47,#0f466b)] text-[#e5f4ff]"
                  : "bg-(--primecore-surface)"
              }
            >
              <CardHeader>
                <p className="text-xs uppercase tracking-[0.12em] opacity-70">Module {index + 1}</p>
                <h3 className="text-xl font-semibold">{module.title}</h3>
              </CardHeader>
              <CardContent>
                <p className={module.variant === "dark" ? "text-[#d5eaf8]/90" : "text-(--primecore-foreground)/78"}>
                  {module.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
    </Section>
  );
}
