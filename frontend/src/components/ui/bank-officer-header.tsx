"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Mail, Menu, X } from "lucide-react";
import { Sidebar } from "@/src/components/layout";
import { cn } from "@/src/lib/utils";
import type { UserRole } from "@/config/site";

type BankOfficerHeaderProps = {
  title: string;
  className?: string;
  roleLabel?: string;
  role?: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
};

export function BankOfficerHeader({
  title,
  className,
  roleLabel = "User",
  role = "BANK_OFFICER",
}: BankOfficerHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between rounded-xl bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] p-3 text-white shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <p className="text-sm font-semibold">{title}</p>
        <div className="flex items-center gap-3">
          <button className="relative text-white/80 hover:text-white" aria-label="Messages">
            <Mail size={18} />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold">
              2
            </span>
          </button>
          <button className="relative text-white/80 hover:text-white" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold">
              8
            </span>
          </button>
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white/10">
            <Image
              src="https://ui-avatars.com/api/?name=Kamal+E&background=random"
              alt="User"
              fill
              className="object-cover"
              sizes="36px"
              unoptimized
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/55"
          />
          <div className="relative h-full w-72 max-w-[85vw]">
            <Sidebar role={role} className="h-full w-full md:w-full" hideCollapse={true} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <header
        className={cn(
          "hidden lg:flex flex-col gap-4 rounded-xl bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] p-4 text-white shadow-sm md:flex-row md:items-center md:justify-between",
          className,
        )}
      >
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="relative text-white/80 hover:text-white">
              <Mail size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                2
              </span>
            </button>
            <button className="relative text-white/80 hover:text-white">
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                8
              </span>
            </button>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
              <Image
                src="https://ui-avatars.com/api/?name=Kamal+E&background=random"
                alt="User"
                fill
                className="object-cover"
                sizes="40px"
                unoptimized
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0d3b66] bg-green-500" />
            </div>
            <div className="hidden text-sm md:block">
              <p className="font-semibold leading-none">Kamal Edirisinghe</p>
              <p className="text-white/60">{roleLabel}</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}