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
    <Section id="products" className="pt-10">
      <PageShell>
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="info">Banking for the future</Badge>
            <h2 className="text-3xl font-bold text-(--primecore-foreground) sm:text-5xl sm:leading-tight">
              Digital banking built around you
            </h2>
          </div>
          <p className="max-w-xs text-sm text-(--primecore-foreground)/65">
            Powerful modules designed to improve financial awareness and decision-making.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((module, index) => (
            <Card
              key={module.title}
              className={
                module.variant === "dark"
                  ? "relative border-none bg-[linear-gradient(145deg,#082b47,#0f466b)] text-[#001c30]"
                  : "relative border-(--primecore-border) bg-(--primecore-surface)"
              }
            >
              <div className="absolute -top-4 left-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-(--primecore-border) bg-(--primecore-surface) text-xl text-primary">
                ◉
              </div>
              <CardHeader className="pt-10">
                <p className="text-xs uppercase tracking-[0.12em] opacity-70">Module {index + 1}</p>
                <h3 className="text-3xl font-semibold">{module.title}</h3>
              </CardHeader>
              <CardContent>
                <p className={module.variant === "dark" ? "text-[#001c30]/90" : "text-(--primecore-foreground)/78"}>
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
