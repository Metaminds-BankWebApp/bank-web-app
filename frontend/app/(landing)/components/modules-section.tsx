import { CircleDollarSign, Landmark, ScanSearch, Wallet } from "lucide-react";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const modules = [
  {
    title: "CreditLens",
    text: "Analyze borrower risk and improve decision accuracy with reliable data signals.",
    icon: ScanSearch,
    dark: true,
  },
  {
    title: "LoanSense",
    text: "Review loan dynamics and repayment behavior to understand lending outcomes.",
    icon: CircleDollarSign,
    dark: false,
  },
  {
    title: "SpendIQ",
    text: "Track spending movement and transaction patterns for stronger money visibility.",
    icon: Wallet,
    dark: true,
  },
  {
    title: "Transact",
    text: "Run secure payments and transfers with status tracking and audit consistency.",
    icon: Landmark,
    dark: false,
  },
] as const;

export function ModulesSection() {
  return (
    <Section id="modules" className="pt-8 sm:pt-10">
      <LandingPageShell>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-[#d2deea] bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#4c6f91] sm:text-sm">
              Banking for the Future
            </span>
            <h2 className="max-w-xl text-4xl font-semibold leading-tight text-[#0f2238] sm:text-5xl">
              Digital Banking Built Around You
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#4f6379] sm:text-base">
            Four powerful modules designed to improve financial awareness and risk-aware decision making.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`relative rounded-2xl border px-6 pb-7 pt-14 ${
                  item.dark
                    ? "border-[#0f4068] bg-[linear-gradient(145deg,#073158_0%,#0d4a74_100%)] text-white"
                    : "border-[#c9dceb] bg-white text-[#12263d]"
                }`}
              >
                <div className="absolute left-6 top-0 -translate-y-1/2 rounded-2xl border border-[#c9dceb] bg-white p-3 shadow-[0_12px_24px_-18px_rgba(12,58,95,0.55)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f3fb] text-[#1f6ea4]">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                </div>

                <h3 className="text-3xl font-semibold">{item.title}</h3>
                <p className={`mt-4 text-base leading-relaxed ${item.dark ? "text-white/85" : "text-[#4f6379]"}`}>
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </LandingPageShell>
    </Section>
  );
}
