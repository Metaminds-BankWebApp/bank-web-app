import Image from "next/image";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const commentCards = [
  { src: "/Comment-landingpage/comment%201.png", alt: "Customer review from Greg Max", width: 339, height: 121 },
  { src: "/Comment-landingpage/comment%202.png", alt: "Customer review from Welton Chris", width: 361, height: 141 },
  { src: "/Comment-landingpage/comment%203.png", alt: "Customer review from Charl Femi", width: 408, height: 155 },
] as const;

export function WhyChooseSection() {
  return (
    <Section id="about" className="pt-8 sm:pt-10">
      <LandingPageShell>
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-[32px] border border-[#b9c3cd] bg-white px-5 py-2.5 text-[#74808d] sm:gap-4 sm:px-6 sm:py-3">
            <Image
              src="/primecore%20logo%20only%20blue.png"
              alt="PrimeCore icon"
              width={44}
              height={44}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="text-sm font-medium sm:text-lg">Banking for the Future</span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold text-[#1a2632] sm:text-5xl">Why Choose PrimeCore</h2>
        </div>

        <div className="mt-8 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl bg-[#c8dce9] p-7 sm:p-8">
              <p className="text-6xl font-semibold text-[#3797d4]">100K+</p>
              <h3 className="mt-5 text-3xl font-semibold text-[#1f2f3f]">Data-Driven Decisions</h3>
              <p className="mt-5 max-w-md text-2xl leading-relaxed text-[#2c3e52]">
                Uses income, liabilities, payment behavior, and exposure data.
              </p>
            </article>

            <article className="relative overflow-visible rounded-2xl bg-[#083963] p-7 text-white sm:p-8 lg:pr-44">
              <p className="text-6xl font-semibold">1000K+</p>
              <h3 className="mt-5 text-3xl font-semibold">Instant Assessments</h3>
              <p className="mt-5 max-w-md text-2xl leading-relaxed text-white/90">
                Generate credit scores and eligibility results in seconds.
              </p>

              <div className="mt-4 flex justify-end lg:hidden">
                <Image
                  src="/instant%20assesment.png"
                  alt="Instant assessment illustration"
                  width={357}
                  height={450}
                  className="h-auto w-32 sm:w-40"
                />
              </div>

              <Image
                src="/instant%20assesment.png"
                alt="Instant assessment illustration"
                width={357}
                height={450}
                className="pointer-events-none absolute -right-7 -top-24 hidden h-auto w-44 lg:block xl:w-52"
              />
            </article>
          </div>

          <article className="relative rounded-2xl bg-[#c8dce9] p-5 sm:p-6 lg:pr-80">
            <div className="grid items-center gap-6 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
              <div className="relative mx-auto w-full max-w-[360px]">
                <Image
                  src="/24%207%20work.png"
                  alt="24/7 support and risk evaluation illustration"
                  width={577}
                  height={324}
                  className="h-auto w-full"
                />
              </div>

              <div>
                <p className="text-6xl font-semibold text-[#3797d4]">24/7</p>
                <h3 className="mt-3 text-3xl font-semibold text-[#1f2f3f]">Risk-Based Evaluation</h3>
                <p className="mt-4 max-w-lg text-2xl leading-relaxed text-[#2c3e52]">
                  Identifies low, medium, and high credit risk profiles.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
              {commentCards.map((item) => (
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full rounded-xl shadow-[0_12px_22px_-18px_rgba(8,30,54,0.45)]"
                />
              ))}
            </div>

            <div className="pointer-events-none absolute -right-6 -top-10 hidden lg:flex lg:flex-col lg:gap-4 xl:-right-12">
              <Image
                src={commentCards[0].src}
                alt={commentCards[0].alt}
                width={commentCards[0].width}
                height={commentCards[0].height}
                className="h-auto w-[250px] rounded-xl shadow-[0_16px_25px_-20px_rgba(8,30,54,0.5)] xl:w-[290px]"
              />
              <Image
                src={commentCards[1].src}
                alt={commentCards[1].alt}
                width={commentCards[1].width}
                height={commentCards[1].height}
                className="ml-[-80px] h-auto w-[260px] rounded-xl shadow-[0_16px_25px_-20px_rgba(8,30,54,0.5)] xl:w-[310px]"
              />
              <Image
                src={commentCards[2].src}
                alt={commentCards[2].alt}
                width={commentCards[2].width}
                height={commentCards[2].height}
                className="h-auto w-[280px] rounded-xl shadow-[0_16px_25px_-20px_rgba(8,30,54,0.5)] xl:w-[330px]"
              />
            </div>
          </article>
        </div>
      </LandingPageShell>
    </Section>
  );
}
