import Image from "next/image";
import Link from "next/link";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

export function CtaBannerSection() {
  return (
    <Section className="pb-8 pt-8 sm:pt-10">
      <LandingPageShell>
        <section className="relative overflow-hidden rounded-2xl border border-[#16537d] bg-[linear-gradient(125deg,#082f56_0%,#0a3f6b_57%,#1a79bb_100%)] px-6 pt-8 pb-0 text-white sm:px-10 sm:pt-8 pb-0">
          <div className="pointer-events-none absolute -right-10 top-[-20%] h-72 w-72 rounded-full bg-[#6bcfff]/20 blur-[110px]" />

          <div className="relative z-10 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="max-w-xl space-y-4 pb-10 pt-6 sm:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-white/90">
                <Image
                  src="/primecore%20logo%20only%20white.png"
                  alt="PrimeCore icon"
                  width={28}
                  height={28}
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
                <span className="text-xs font-semibold tracking-wide sm:text-sm">We Are PrimeCore</span>
              </div>
              <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">Ready to Understand Your Credit Profile?</h2>
              <p className="text-base leading-relaxed text-white/85">
                Make informed financial decisions with reliable credit insights and instant eligibility analysis.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#123456] transition-colors hover:bg-white/90"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#3ca3e4] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3198dc]"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-visible sm:min-h-[360px] lg:-mt-10 lg:min-h-[430px]">
              <Image
                src="/cta-banner%20landing%20page%20image.png"
                alt="PrimeCore customer ready to start credit journey"
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 1024px) 38vw, 86vw"
              />
            </div>
          </div>
        </section>
      </LandingPageShell>
    </Section>
  );
}
