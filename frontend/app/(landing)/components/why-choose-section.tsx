import { Card, CardContent } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

const stats = [
  { label: "Active Users", value: "1.2M+" },
  { label: "Monthly Transactions", value: "58M" },
  { label: "Avg. Uptime", value: "99.98%" },
  { label: "Countries", value: "18" },
] as const;

export function WhyChooseSection() {
  return (
    <Section id="about" className="bg-(--primecore-surface-soft)">
      <PageShell>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-(--primecore-foreground) sm:text-3xl">Why choose PrimeCore?</h2>
            <p className="max-w-xl text-(--primecore-foreground)/75">
              Built with bank-grade security, fast workflows, and intuitive customer journeys that reduce friction for
              both users and teams.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((item) => (
                <Card key={item.label} className="bg-(--primecore-surface)">
                  <CardContent className="space-y-1 p-0">
                    <p className="text-xl font-bold text-(--primecore-foreground)">{item.value}</p>
                    <p className="text-xs uppercase tracking-wide text-(--primecore-foreground)/65">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="h-44 rounded-xl border border-(--primecore-border) bg-(--primecore-surface) p-4">
              <div className="h-full rounded-lg border border-dashed border-(--primecore-border) bg-(--primecore-surface-soft)" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-28 rounded-xl border border-(--primecore-border) bg-(--primecore-surface-soft)" />
              <div className="h-28 rounded-xl border border-(--primecore-border) bg-(--primecore-surface-soft)" />
            </div>
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
