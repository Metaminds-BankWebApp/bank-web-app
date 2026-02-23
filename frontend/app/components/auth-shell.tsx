import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ModeToggle } from "@/src/components/mode-toggle";

type AuthShellProps = {
  children: ReactNode;
  panelTitle: ReactNode;
  panelDescription: string;
  panelImage: StaticImageData;
  panelAlt: string;
  panelBadge?: string;
  modeTogglePosition?: "left" | "right";
  contentSide?: "left" | "right";
};

export function AuthShell({
  children,
  panelTitle,
  panelDescription,
  panelImage,
  panelAlt,
  panelBadge = "PrimeCore",
  modeTogglePosition = "right",
  contentSide = "left",
}: AuthShellProps) {
  return (
    <div className="grid min-h-screen bg-(--primecore-background) lg:grid-cols-[1.05fr_0.95fr]">
      <section
        className={`relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-14 lg:py-16 ${contentSide === "right" ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className={`absolute top-4 ${modeTogglePosition === "left" ? "left-4" : "right-4"}`}>
          <ModeToggle />
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-(--primecore-border) bg-(--primecore-surface)/95 p-6 shadow-[0_25px_45px_-35px_rgba(6,49,84,0.65)] backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </section>

      <section
        className={`relative hidden overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-16 ${contentSide === "right" ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />

        <div className="relative z-10">
          <h1 className="max-w-lg text-3xl font-bold leading-tight text-white">{panelTitle}</h1>
          <p className="mt-4 max-w-md text-base text-white/80">{panelDescription}</p>
        </div>

        <div className="relative z-10 mt-8">
          <Image src={panelImage} alt={panelAlt} width={560} height={300} className="rounded-[28px] border border-white/10 object-cover" priority />
        </div>

        <div className="relative z-10 self-end rounded-full border border-white/25 bg-white px-7 py-3 text-lg font-bold text-[#0d3b66]">
          {panelBadge}
        </div>
      </section>
    </div>
  );
}
