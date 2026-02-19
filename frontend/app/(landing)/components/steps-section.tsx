import { Card, CardContent } from "@/src/components/ui";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const steps = [
  {
    step: "1",
    title: "Collect Financial Data",
    text: "Income, debts, credit usage, and payment history.",
  },
  {
    step: "2",
    title: "Calculate Risk Indicators",
    text: "DTI ratio, utilization rate, exposure factors, and stability.",
  },
  {
    step: "3",
    title: "Generate Score & Insights",
    text: "Risk level classification and explanation of influencing factors.",
  },
] as const;

export function StepsSection() {
  return (
    <Section className="pt-10">
      <LandingPageShell>
        <div className="rounded-2xl border border-[#0a456f] bg-[linear-gradient(145deg,#08263f,#0c3f63)] p-6 text-[#e8f4ff] sm:p-8">
          <div className="mb-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9ec5e1]">Your guide, step by step</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">From financial data to credit decisions</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {steps.map((item) => (
              <Card key={item.step} className="border-[#266286] bg-[#0f3e61]/70 text-[#e8f4ff] min-h-[220px] flex flex-col">
                <CardContent className="space-y-3 p-6 flex-1">
                  <p className="text-5xl font-bold">{item.step}</p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-[rgba(232,244,255,0.85)]">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </LandingPageShell>
    </Section>
  );
}
