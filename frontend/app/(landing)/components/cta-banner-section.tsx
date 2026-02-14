import { Button } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

export function CtaBannerSection() {
  return (
    <Section className="pt-4">
      <PageShell>
        <div className="rounded-2xl border border-[#2F9D94]/35 bg-[linear-gradient(135deg,#0a3555,#0f4d74)] p-6 text-[#f7f6f2] sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Ready to build with PrimeCore?</h2>
              <p className="text-sm text-[#d6ebf9]/90">
                Launch secure digital banking journeys with reusable modules and role-based experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="h-11 bg-[#2F9D94] px-6 text-[#F7F6F2] hover:bg-[#258b84]">Start Free</Button>
              <Button
                variant="outline"
                className="h-11 border-[#9fc8e7]/45 bg-transparent px-6 text-[#F7F6F2] hover:bg-[#0d4469]"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
