import { Badge, Card, CardContent } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

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
  return (
    <Section id="about" className="pt-8">
      <PageShell>
        <div className="mb-8 text-center">
          <Badge variant="info">Banking for the future</Badge>
          <h2 className="mt-4 text-3xl font-bold text-(--primecore-foreground) sm:text-5xl">Why Choose PrimeCore</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.slice(0, 2).map((item) => (
                <Card
                  key={item.title}
                  className={item.dark ? "border-none bg-[linear-gradient(145deg,#082b47,#0f466b)] text-white" : "bg-[#d9ecfa]"}
                >
                  <CardContent className="space-y-3 p-0">
                    <p className={item.dark ? "text-5xl font-bold text-[#001c30]" : "text-5xl font-bold text-primary"}>{item.title}</p>
                    <p className="text-base font-semibold uppercase tracking-wide">{item.subtitle}</p>
                    <p className={item.dark ? "text-sm text-[#001c30]" : "text-sm text-(--primecore-foreground)/75"}>{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-[#001c30]">
              <CardContent className="grid gap-4 p-0 sm:grid-cols-[1fr_1.1fr] sm:items-center">
                <div className="h-40 rounded-xl bg-(--primecore-surface)" />
                <div className="space-y-3">
                  <p className="text-5xl font-bold text-[#001c30]">{highlights[2].title}</p>
                  <p className="text-base font-semibold uppercase tracking-wide">{highlights[2].subtitle}</p>
                  <p className="text-sm text-[#001c30]/75">{highlights[2].text}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-(--primecore-surface)">
              <CardContent className="space-y-2 p-0">
                <p className="text-sm font-semibold">Greg Max</p>
                <p className="text-xs text-(--primecore-foreground)/70">“PrimeCore improved our decision speed instantly.”</p>
              </CardContent>
            </Card>
            <Card className="bg-(--primecore-surface)">
              <CardContent className="space-y-2 p-0">
                <p className="text-sm font-semibold">Wilton Chris</p>
                <p className="text-xs text-(--primecore-foreground)/70">“Credit profiling is now clear, automated, and consistent.”</p>
              </CardContent>
            </Card>
            <Card className="bg-(--primecore-surface)">
              <CardContent className="space-y-2 p-0">
                <p className="text-sm font-semibold">Cheri Ferri</p>
                <p className="text-xs text-(--primecore-foreground)/70">“We trust the scoring outcomes every day.”</p>
              </CardContent>
            </Card>
            <Card className="bg-(--primecore-surface)">
              <CardContent className="space-y-2 p-0">
                <p className="text-sm font-semibold">Cheri Ferri</p>
                <p className="text-xs text-(--primecore-foreground)/70">“We trust the scoring outcomes every day.”</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
