import Image from "next/image";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const metrics = [
  { value: "2%", label: "Interest on savings accounts." },
  { value: "$500M+", label: "Transactions processed every month." },
  { value: "10+", label: "Countries served proudly." },
] as const;

export function MetricsSection() {
  return (
    <Section className="pt-8 sm:pt-10 min-h-[64svh] lg:min-h-[70svh]">
      <LandingPageShell className="text-center">
        <div className="inline-flex items-center gap-3 rounded-4xl border border-[#b9c3cd] bg-white px-5 py-2.5 text-[#74808d] sm:gap-4 sm:px-6 sm:py-3">
          <Image
            src="/primecore%20logo%20only%20blue.png"
            alt="PrimeCore icon"
            width={44}
            height={44}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <span className="text-sm font-medium sm:text-lg">Our Statistics</span>
        </div>

        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold text-[#0f2238] sm:text-5xl">
          Banking That Works for You.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#4f6379]">
          Powering smarter credit decisions through transparent scoring, multi-role workflows, and secure financial
          data processing for reliable, fast assessments.
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
          {metrics.map((item) => (
            <div key={item.value} className="space-y-2">
              <p className="text-5xl font-semibold text-[#2f86bf]">{item.value}</p>
              <p className="text-base text-[#2a3f56]">{item.label}</p>
            </div>
          ))}
        </div>
      </LandingPageShell>
    </Section>
  );
}
