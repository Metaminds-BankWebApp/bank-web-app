import Image from "next/image";
import { Button } from "@/src/components/ui";
import { Navbar, Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

export function HeroSection() {
  return (
    <Section className="pt-6 sm:pt-8">
      <LandingPageShell>
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#072c49,#0a4e75)] px-6 py-8 text-white sm:px-10 sm:py-12">
          <Navbar className="absolute left-0 top-0 w-full [&>div]:px-6 [&>div]:sm:px-10 [&>div]:lg:px-10" />
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-6 pb-6 lg:pb-0 max-w-xl">
              <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                100% AI-powered credit analytics
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Understand your credit. <span className="block">Predict your risk. Borrow smarter.</span>
              </h1>
              <p className="text-sm text-white/85 sm:text-base">
                PrimeCore is a credit intelligence platform that evaluates financial behavior, predicts loan
                eligibility, and helps individuals and banks make safer lending decisions.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-6">
                <Button className="h-11 bg-white px-6 text-(--primecore-foreground) hover:bg-white/90">Get Started</Button>
                <Button variant="primary" className="h-11 px-6">
                  Sign Up
                </Button>
              </div>
              <p className="text-xs font-medium tracking-wide text-white/75">Trusted by Pingdom, ClickUp, Monday.com</p>
            </div>

            <div className="relative min-h-[300px] lg:min-h-[420px] self-end">
              <div className="absolute bottom-0 right-0 h-[92%] w-[92%] rounded-t-[42px] bg-[linear-gradient(155deg,#1781c4,#5dbef1)]/30" />
              <Image
                src="/hero-image.png"
                alt="PrimeCore user"
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
              />
              <div className="absolute left-4 top-8 rounded-lg border border-white/35 bg-white px-3 py-2 text-(--primecore-foreground) shadow-sm sm:left-auto sm:right-6 sm:top-20">
                <p className="text-[11px] font-semibold">100K+ Active users</p>
              </div>
              <div className="absolute bottom-12 left-4 rounded-lg border border-white/35 bg-white px-3 py-2 text-(--primecore-foreground) shadow-sm">
                <p className="text-[11px] font-semibold">Payment received +$5,890</p>
              </div>
            </div>
          </div>
        </div>
      </LandingPageShell>
    </Section>
  );
}

