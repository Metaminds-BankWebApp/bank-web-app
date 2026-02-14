import { Card, CardContent } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

const steps = [
  {
    step: "01",
    title: "Create Account",
    text: "Sign up in minutes with secure onboarding and identity checks.",
  },
  {
    step: "02",
    title: "Connect & Verify",
    text: "Link funding sources and verify profile details in one flow.",
  },
  {
    step: "03",
    title: "Manage & Grow",
    text: "Use PrimeCore modules to transact, save and optimize spending.",
  },
] as const;

export function StepsSection() {
  return (
    <Section>
      <PageShell>
        <div className="rounded-2xl border border-[#0a456f] bg-[linear-gradient(145deg,#08263f,#0c3f63)] p-6 text-[#e8f4ff] sm:p-8">
          <div className="mb-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9ec5e1]">How it works</p>
            <h2 className="text-2xl font-bold sm:text-3xl">Get started in 3 simple steps</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <Card key={item.step} className="border-[#266286] bg-[#0f3e61]/70 text-[#e8f4ff]">
                <CardContent className="space-y-3 p-0">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#96bee0]">STEP {item.step}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[#d3e6f5]/88">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
