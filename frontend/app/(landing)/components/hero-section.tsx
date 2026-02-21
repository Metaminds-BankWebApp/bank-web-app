"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/src/components/layout";
import { LandingPageShell } from "./landing-page-shell";
import React, { useRef } from "react";

const navItems = [
  { title: "Modules", href: "#modules" },
  { title: "Why PrimeCore", href: "#about" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "Contact", href: "#support" },
] as const;

const trustedBrands = ["pingdom", "ClickUp", "monday.com"] as const;
const floatingParticles = [
  { left: "10%", top: "22%", size: "h-2 w-2", delay: 0, duration: 5.8 },
  { left: "26%", top: "68%", size: "h-1.5 w-1.5", delay: 0.6, duration: 6.5 },
  { left: "48%", top: "18%", size: "h-2.5 w-2.5", delay: 1.2, duration: 6.2 },
  { left: "64%", top: "58%", size: "h-1.5 w-1.5", delay: 0.3, duration: 5.9 },
  { left: "84%", top: "34%", size: "h-2 w-2", delay: 0.9, duration: 6.8 },
] as const;
const financeSymbols = [
  { symbol: "$", left: "12%", top: "15%", size: "text-2xl", delay: 0.1, duration: 8.5 },
  { symbol: "€", left: "35%", top: "55%", size: "text-xl", delay: 1.2, duration: 9.2 },
  { symbol: "¥", left: "55%", top: "22%", size: "text-3xl", delay: 0.5, duration: 8.8 },
  { symbol: "₿", left: "75%", top: "68%", size: "text-xl", delay: 2.1, duration: 9.6 },
  { symbol: "₹", left: "88%", top: "18%", size: "text-2xl", delay: 1.5, duration: 8.4 },
  { symbol: "£", left: "62%", top: "48%", size: "text-xl", delay: 0.8, duration: 9.1 },
  { symbol: "%", left: "22%", top: "75%", size: "text-4xl", delay: 2.5, duration: 10.2 },
  { symbol: "¢", left: "45%", top: "12%", size: "text-lg", delay: 1.8, duration: 7.9 },
  { symbol: "$", left: "92%", top: "45%", size: "text-2xl", delay: 1.1, duration: 8.7 },
  { symbol: "€", left: "8%", top: "65%", size: "text-3xl", delay: 2.3, duration: 9.5 },
  { symbol: "£", left: "28%", top: "35%", size: "text-xl", delay: 3.0, duration: 8.2 },
  { symbol: "¥", left: "5%", top: "28%", size: "text-2xl", delay: 0.3, duration: 8.9 },
  { symbol: "₿", left: "50%", top: "85%", size: "text-xl", delay: 1.7, duration: 9.8 },
  { symbol: "₹", left: "70%", top: "10%", size: "text-3xl", delay: 0.6, duration: 8.1 },
  { symbol: "%", left: "82%", top: "82%", size: "text-2xl", delay: 1.4, duration: 9.3 },
  { symbol: "¢", left: "18%", top: "42%", size: "text-xl", delay: 2.8, duration: 8.6 },
] as const;


function FloatingSymbol({
  item,
  mouseX,
  mouseY,
}: {
  item: (typeof financeSymbols)[number];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return 0;
    const element = ref.current;
    // Calculate distance between mouse pointer (val) and symbol center
    const centerX = element.offsetLeft + element.offsetWidth / 2;
    return val - centerX;
  });

  const distanceY = useTransform(mouseY, (val: number) => {
    if (!ref.current) return 0;
    const element = ref.current;
    const centerY = element.offsetTop + element.offsetHeight / 2;
    return val - centerY;
  });

  const moveX = useTransform(distance, [-300, 300], [40, -40]);
  const moveY = useTransform(distanceY, [-300, 300], [40, -40]);

  return (
    <motion.div
      ref={ref}
      className={`absolute select-none pointer-events-none ${item.size} font-bold text-white/20`}
      style={{
        left: item.left,
        top: item.top,
        x: moveX,
        y: moveY,
      }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.delay,
        }}
      >
        {item.symbol}
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <Section className="pt-4 sm:pt-6">
      <LandingPageShell>
        <section className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(122deg,#08305a_0%,#0a3f6d_57%,#1f84c4_100%)] px-5 pb-8 pt-4 text-white sm:px-8 sm:pt-3 lg:px-12 lg:pb-0">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-[8%] top-[-20%] h-72 w-72 rounded-full bg-white/10 blur-[120px]"
              animate={{ x: [0, 18, 0], y: [0, 10, 0], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-8%] top-[26%] h-72 w-72 rounded-full bg-[#66ccff]/20 blur-[110px]"
              animate={{ x: [0, -14, 0], y: [0, -12, 0], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.div
              className="absolute -left-[20%] top-[40%] h-72 w-[70%] rounded-full bg-[linear-gradient(90deg,rgba(90,196,255,0.18)_0%,rgba(90,196,255,0)_100%)] blur-3xl"
              animate={{ x: [0, 32, 0], opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-[18%] top-[12%] h-80 w-[65%] rounded-full bg-[linear-gradient(270deg,rgba(149,225,255,0.22)_0%,rgba(149,225,255,0)_100%)] blur-3xl"
              animate={{ x: [0, -28, 0], opacity: [0.22, 0.5, 0.22] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />

            {floatingParticles.map((particle) => (
              <motion.span
                key={`${particle.left}-${particle.top}`}
                className={`absolute rounded-full bg-white/60 shadow-[0_0_12px_rgba(180,230,255,0.65)] ${particle.size}`}
                style={{ left: particle.left, top: particle.top }}
                animate={{ y: [0, -12, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.15, 1] }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}

            {financeSymbols.map((item, idx) => (
              <FloatingSymbol
                key={`${item.symbol}-${idx}`}
                item={item}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>

          <header className="relative z-20 flex flex-wrap items-center justify-between gap-5 sm:gap-6">
            <Link href="/" className="inline-flex shrink-0 items-center">
              <Image
                src="/Primecore%20logo%20white%202.png"
                alt="PrimeCore Bank Digital"
                width={560}
                height={250}
                className="h-11 w-auto sm:h-14 lg:h-16"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-8 text-lg lg:flex xl:text-xl">
              {navItems.map((item) => (
                <Link key={item.title} href={item.href} className="text-white/90 transition-colors hover:text-white">
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#123456] transition-colors hover:bg-white/90 sm:h-11 sm:px-6 sm:text-base"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#3ca3e4] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3198dc] sm:h-11 sm:px-6 sm:text-base"
              >
                Sign Up
              </Link>
            </div>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </header>

          <div
            className={`fixed inset-0 z-[90] lg:hidden ${
              isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`absolute inset-0 bg-slate-950/60 transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            <aside
              className={`absolute inset-y-0 left-0 w-[290px] max-w-[86vw] bg-[#08305a] p-5 shadow-2xl transition-transform duration-300 ease-out ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">Menu</p>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2 text-base text-white/90">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

          <div className="relative z-10 mt-5 grid items-end gap-6 lg:mt-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="max-w-2xl space-y-6 pb-2 sm:space-y-7 lg:-mt-4 lg:pb-6">
              <p className="mt-8 inline-flex rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-xs text-white/90 sm:text-sm">
                100K+ Accounts Opened Globally.
              </p>
                    
              <h1 className="text-[clamp(2.5rem,4.2vw,5.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
                Understand Your Credit. Predict Your Risk. Borrow Smarter.
              </h1>

              <p className="max-w-2xl text-[clamp(1rem,1.15vw,1.5rem)] leading-relaxed text-white/80">
                PrimeCore is a credit intelligence platform that evaluates financial behavior, predicts loan
                eligibility, and helps individuals and banks make safer lending decisions.
              </p>

              <div className="flex w-full max-w-md items-center gap-2 rounded-2xl bg-white p-2.5 sm:p-3">
                <Link
                  href="/login"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-white text-base font-semibold text-[#5b6470] transition-colors hover:bg-[#f2f7ff] sm:text-lg lg:h-14 lg:text-xl"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#3ca3e4] text-base font-semibold text-white transition-colors hover:bg-[#3198dc] sm:text-lg lg:h-14 lg:text-xl"
                >
                  Sign Up
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-lg font-semibold text-white/90 sm:gap-8 sm:text-xl">
                {trustedBrands.map((brand) => (
                  <span key={brand} className="text-lg sm:text-xl">
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
