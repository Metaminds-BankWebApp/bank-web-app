import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const metrics = [
  { value: "2%", label: "Interest on savings accounts." },
  { value: "$500M+", label: "Transactions processed every month." },
  { value: "10+", label: "Countries served proudly." },
] as const;

export function MetricsSection() {
  return (
    <Section className="pt-8 sm:pt-10">
      <LandingPageShell className="text-center">
        <span className="inline-flex rounded-full border border-[#d2deea] bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#4c6f91] sm:text-sm">
          Our Statistics
        </span>

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
