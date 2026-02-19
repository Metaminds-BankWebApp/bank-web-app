import { Badge, Card, CardContent } from "@/src/components/ui";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const highlights = [
  {
    title: "100K+",
    subtitle: "Data-driven decisions",
    text: "Uses income, liabilities, payment behavior, and exposure data.",
    dark: false,
  },
  {
    title: "1000K+",
    subtitle: "Instant assessments",
    text: "Generate credit scores and eligibility results in seconds.",
    dark: true,
  },
  {
    title: "24/7",
    subtitle: "Risk-based evaluation",
    text: "Identifies low, medium, and high credit risk profiles.",
    dark: false,
  },
] as const;

export function WhyChooseSection() {
  const tiles = [
    ...highlights,
    {
      title: "Trusted Partners",
      subtitle: "Enterprise-ready",
      text: "Secure, auditable workflows and integrations for large institutions.",
      dark: false,
    },
  ] as const;

  return (
    <Section id="about" className="pt-10">
      <LandingPageShell>
        <div className="mb-6 text-center">
          <Badge variant="info">Banking for the future</Badge>
          <h2 className="mt-4 text-3xl font-bold text-(--primecore-foreground) sm:text-5xl">Why Choose PrimeCore</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((item) => (
            <Card
              key={item.title}
              className={`${item.dark ? "border-none bg-[linear-gradient(145deg,#082b47,#0f466b)] text-white" : "bg-(--primecore-surface)"} min-h-[180px] flex flex-col justify-between p-6`}
            >
              <CardContent className="space-y-3 p-0">
                <p className={item.dark ? "text-4xl font-bold text-white" : "text-4xl font-bold text-primary"}>{item.title}</p>
                <p className="text-base font-semibold uppercase tracking-wide">{item.subtitle}</p>
                <p className={item.dark ? "text-sm text-white/85" : "text-sm text-(--primecore-foreground)/75"}>{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="bg-(--primecore-surface)">
            <CardContent className="space-y-2 p-4">
              <p className="text-sm font-semibold">Greg Max</p>
              <p className="text-xs text-(--primecore-foreground)/70">"PrimeCore improved our decision speed instantly."</p>
            </CardContent>
          </Card>
          <Card className="bg-(--primecore-surface)">
            <CardContent className="space-y-2 p-4">
              <p className="text-sm font-semibold">Wilton Chris</p>
              <p className="text-xs text-(--primecore-foreground)/70">"Credit profiling is now clear, automated, and consistent."</p>
            </CardContent>
          </Card>
        </div>
      </LandingPageShell>
    </Section>
  );
}
