import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const steps = [
  {
    step: "1",
    title: "Collect Financial Data",
    text: "Income, debts, credit usage, and payment history are structured into an analysis-ready profile.",
  },
  {
    step: "2",
    title: "Calculate Risk Indicators",
    text: "DTI ratio, utilization trends, exposure factors, and repayment stability are measured instantly.",
  },
  {
    step: "3",
    title: "Generate Score & Insights",
    text: "A clear score with confidence indicators explains the strongest factors influencing eligibility.",
  },
] as const;

export function StepsSection() {
  return (
    <Section id="how-it-works" className="pt-8 sm:pt-10 min-h-[68svh] lg:min-h-[74svh]">
      <LandingPageShell>
        <section className="rounded-2xl border border-[#16537d] bg-[linear-gradient(125deg,#082f56_0%,#0b3f6b_58%,#1a79bb_100%)] p-6 text-white sm:p-9">
          <div className="mb-6 space-y-3">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
              Your Guide, Step by Step
            </span>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              From Financial Data to Credit Decisions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <article key={item.step} className="rounded-2xl border border-white/15 bg-white/8 p-6 pb-16 backdrop-blur-sm">
                <p className="text-6xl font-semibold text-[#9fd8ff]">{item.step}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/85">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </LandingPageShell>
    </Section>
  );
}
