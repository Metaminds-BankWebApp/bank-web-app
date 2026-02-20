import Image from "next/image";
import Link from "next/link";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";

const navItems = [
  { title: "Modules", href: "#modules" },
  { title: "Why PrimeCore", href: "#about" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "Contact", href: "#support" },
] as const;

const trustedBrands = ["pingdom", "ClickUp", "monday.com"] as const;

export function HeroSection() {
  return (
    <Section className="pt-4 sm:pt-6">
      <LandingPageShell>
        <section className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(122deg,#08305a_0%,#0a3f6d_57%,#1f84c4_100%)] px-5 pb-8 pt-4 text-white sm:px-8 sm:pt-3 lg:px-12 lg:pb-0">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-[-20%] h-72 w-72 rounded-full bg-white/10 blur-[120px]" />
            <div className="absolute right-[-8%] top-[26%] h-72 w-72 rounded-full bg-[#66ccff]/20 blur-[110px]" />
          </div>

          <header className="relative z-20 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="inline-flex shrink-0 items-center">
              <Image
                src="/Primecore%20logo%20white%202.png"
                alt="PrimeCore Bank Digital"
                width={560}
                height={250}
                className="h-10 w-auto sm:h-13 lg:h-15"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-8 text-lg lg:flex">
              {navItems.map((item) => (
                <Link key={item.title} href={item.href} className="text-white/90 transition-colors hover:text-white">
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-xs font-semibold text-[#123456] transition-colors hover:bg-white/90 sm:h-10 sm:px-5 sm:text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-[#3ca3e4] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#3198dc] sm:h-10 sm:px-5 sm:text-sm"
              >
                Sign Up
              </Link>
            </div>
          </header>

          <nav className="relative z-20 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85 lg:hidden">
            {navItems.map((item) => (
              <Link key={item.title} href={item.href} className="transition-colors hover:text-white">
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 mt-5 grid items-end gap-6 lg:mt-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="max-w-2xl space-y-6 pb-2 sm:space-y-7 lg:-mt-4 lg:pb-6">
              <p className="mt-8 inline-flex rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-xs text-white/90 sm:text-sm">
                100K+ Accounts Opened Globally.
              </p>
                    
              <h1 className=" text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[64px]">
                Understand Your Credit. Predict Your Risk. Borrow Smarter.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/78 sm:text-lg lg:text-xl">
                PrimeCore is a credit intelligence platform that evaluates financial behavior, predicts loan
                eligibility, and helps individuals and banks make safer lending decisions.
              </p>

              <div className="flex w-full max-w-sm items-center gap-2 rounded-2xl bg-white p-2">
                <Link
                  href="/login"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-white text-lg font-semibold text-[#5b6470] transition-colors hover:bg-[#f2f7ff]"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#3ca3e4] text-lg font-semibold text-white transition-colors hover:bg-[#3198dc]"
                >
                  Sign Up
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1  text-lg font-semibold text-white/90 sm:gap-7">
                {trustedBrands.map((brand) => (
                  <span key={brand} className="text-base sm:text-lg">
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[300px] self-end sm:min-h-[420px] lg:min-h-[560px]">
              <div className="absolute bottom-0 right-0 h-[86%] w-[82%] rounded-t-[60px] bg-[linear-gradient(160deg,#2d93d1_0%,#5fc1f5_100%)]/50" />
              <Image
                src="/hero-image.png"
                alt="PrimeCore customer checking finance details on mobile"
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 1280px) 38vw, (min-width: 768px) 48vw, 88vw"
                priority
              />



              
            </div>
          </div>
        </section>
      </LandingPageShell>
    </Section>
  );
}
