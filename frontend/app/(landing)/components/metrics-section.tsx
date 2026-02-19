import { Badge } from "@/src/components/ui";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const metrics = [
  { value: "2%", label: "Interest on savings accounts." },
  { value: "$500M+", label: "Transactions processed every month." },
  { value: "10+", label: "Countries served proudly." },
] as const;

export function MetricsSection() {
  return (
    <Section className="pb-8 pt-10">
      <LandingPageShell className="text-center">
        <Badge variant="info" className="mx-auto">
          Our statistics
        </Badge>

        <h2 className="mt-6 text-3xl font-semibold text-(--primecore-foreground)">Banking that works for you.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-(--primecore-foreground)/70 sm:text-base">
          Powering smarter credit decisions through instant risk evaluation, a structured rule-based scoring model,
          multi-role banking support, and secure data handling to ensure reliable, fast, and trustworthy financial
          assessments.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.value} className="space-y-1">
              <p className="text-4xl font-bold text-primary">{metric.value}</p>
              <p className="text-sm font-medium text-(--primecore-foreground)/80">{metric.label}</p>
            </div>
          ))}
        </div>
      </LandingPageShell>
    </Section>
  );
}
