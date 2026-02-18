import Image from "next/image";
import { Button } from "@/src/components/ui";
import { PageShell, Section } from "@/src/components/layout";

export function CtaBannerSection() {
  return (
    <Section className="pt-8">
      <PageShell>
        <div className="relative overflow-hidden rounded-2xl border border-[#2F9D94]/35 bg-[linear-gradient(135deg,#0a3555,#0f4d74)] px-6 py-8 text-[#f7f6f2] sm:px-10 sm:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                We are PrimeCore
              </p>
              <h2 className="max-w-lg text-3xl font-bold leading-tight sm:text-5xl">Ready to understand your credit profile?</h2>
              <p className="max-w-lg text-sm text-[#d6ebf9]/90 sm:text-base">
                Make informed financial decisions with reliable credit insights and eligibility analysis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="h-11 bg-primary px-6 text-white hover:bg-primary/90">Check My Credit Risk</Button>
                <Button variant="outline" className="h-11 border-white/45 bg-white px-6 text-(--primecore-foreground) hover:bg-white/90">
                  Explore Features
                </Button>
              </div>
            </div>

            <div className="relative min-h-60">
              <Image
                src="/register.png"
                alt="PrimeCore customer"
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 1024px) 36vw, 90vw"
              />
            </div>
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
