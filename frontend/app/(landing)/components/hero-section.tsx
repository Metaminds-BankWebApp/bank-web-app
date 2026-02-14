import { Button } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

export function HeroSection() {
  return (
    <Section className="bg-[linear-gradient(140deg,#05253f,#063154_50%,#0a4164)] text-[#F7F6F2]">
      <PageShell>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-[#2F9D94]/45 bg-[#2F9D94]/14 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#98f2ea]">
              PrimeCore Digital Banking
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              Smarter banking experiences built for modern customers.
            </h1>
            <p className="max-w-xl text-sm text-[#d3e6f5]/85 sm:text-base">
              Manage spending, credit, transfers, and onboarding in one secure platform designed for speed, trust,
              and clarity.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button className="h-11 bg-[#2F9D94] px-6 text-[#F7F6F2] hover:bg-[#259089]">Get Started</Button>
              <Button
                variant="outline"
                className="h-11 border-[#9fc8e7]/45 bg-transparent px-6 text-[#F7F6F2] hover:bg-[#0d4469]"
              >
                View Demo
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-[#a2c8e3]/25 bg-[#0d3f62]/45 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#a2c8e3]/30 bg-[#0c3554]/80 p-4">
                <p className="text-xs uppercase tracking-wide text-[#a8cde7]">Total Balance</p>
                <p className="mt-2 text-2xl font-semibold">$142,504</p>
              </div>
              <div className="rounded-lg border border-[#a2c8e3]/30 bg-[#0c3554]/80 p-4">
                <p className="text-xs uppercase tracking-wide text-[#a8cde7]">Monthly Spend</p>
                <p className="mt-2 text-2xl font-semibold">$3,249</p>
              </div>
              <div className="rounded-lg border border-[#a2c8e3]/30 bg-[#0c3554]/80 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-[#a8cde7]">Security Score</p>
                <div className="mt-2 h-2 rounded-full bg-[#1f5678]">
                  <div className="h-2 w-[82%] rounded-full bg-[#2F9D94]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
