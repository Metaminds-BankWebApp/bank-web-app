import { Badge, Card, CardContent } from "@/src/components/ui";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

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
      <LandingPageShell>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
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

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module, index) => (
            <Card
              key={module.title}
              className={`relative flex flex-col ${module.variant === "dark" ? "border-none bg-[linear-gradient(145deg,#082b47,#0f466b)] text-white" : "border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground)"} p-6`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-16 w-16 rounded-xl flex items-center justify-center border border-(--primecore-border) bg-(--primecore-surface) text-xl text-primary">
                  ◉
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.12em] opacity-70">Module {index + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{module.title}</h3>
                </div>
              </div>

              <CardContent className="mt-4 flex-1">
                <p className={module.variant === "dark" ? "text-white/90" : "text-(--primecore-foreground)/78"}>
                  {module.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </LandingPageShell>
    </Section>
  );
}
