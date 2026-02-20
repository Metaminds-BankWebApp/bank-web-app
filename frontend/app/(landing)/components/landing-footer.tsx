import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { LandingPageShell } from "./landing-page-shell";

const footerColumns = [
  {
    title: "Modules",
    links: [
      { title: "CreditLens", href: "/public-customer/creditlens" },
      { title: "LoanSense", href: "/bank-customer/loansense" },
      { title: "SpendIQ", href: "/bank-customer/spendiq" },
      { title: "Transact", href: "/bank-customer/transact" },
    ],
  },
  {
    title: "User Roles",
    links: [
      { title: "Public Customer", href: "/register" },
      { title: "Bank Customer", href: "/register" },
      { title: "Bank Officer", href: "/register" },
      { title: "Admin", href: "/register" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Documentation", href: "#how-it-works" },
      { title: "FAQ", href: "#support" },
      { title: "Help & Support", href: "#support" },
      { title: "System Overview", href: "#about" },
    ],
  },
  {
    title: "About",
    links: [
      { title: "About PrimeCore", href: "#about" },
      { title: "Terms of Use", href: "#support" },
      { title: "Security & Privacy", href: "#support" },
      { title: "Contact Us", href: "#support" },
    ],
  },
] as const;

const socials = [
  { label: "Facebook", href: "/", icon: Facebook },
  { label: "Instagram", href: "/", icon: Instagram },
  { label: "X", href: "/", icon: Twitter },
  { label: "LinkedIn", href: "/", icon: Linkedin },
] as const;

export function LandingFooter() {
  return (
    <footer id="support" className="pb-6">
      <LandingPageShell>
        <section className="rounded-2xl border border-[#bfd5e6] bg-[#d8e9f5] px-6 py-8 text-center text-[#123356] sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr_0.75fr]">
            <div className="flex flex-col items-center space-y-5">
              <Link href="/" className="inline-flex">
                <Image
                  src="/Primecore%20logo%20dark%20blue%202.png"
                  alt="PrimeCore Bank Digital"
                  width={420}
                  height={200}
                  className="h-15 w-auto sm:h-18 lg:h-20"
                />
              </Link>
              <p className="max-w-sm text-sm text-[#315677] sm:text-base">Banking for the future.</p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#a7c6dd] bg-white px-5 text-sm font-semibold text-[#123456] transition-colors hover:bg-[#f3f9ff]"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-[#3ca3e4] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3198dc]"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((group) => (
                <div key={group.title} className="text-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1d4365]">{group.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {group.links.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} className="text-sm text-[#315677] transition-colors hover:text-[#123456]">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1d4365]">Follow Us On</h3>
              <div className="mt-3 flex items-center justify-center gap-2">
                {socials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#a7c6dd] bg-white text-[#235780] transition-colors hover:bg-[#ecf6ff]"
                    >
                      <Icon size={16} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#b9d0e2] pt-4 text-center text-xs text-[#466887]">
            (c) PrimeCore 2026. All rights reserved.
          </div>
        </section>
      </LandingPageShell>
    </footer>
  );
}
