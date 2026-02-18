"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleHelp,
  FileText,
  History,
  Inbox,
  LayoutDashboard,
  LineChart,
  LogOut,
  Send,
  Settings,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { type SidebarItem, type UserRole, getSidebarRoleConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store";
import { ModeToggle } from "@/src/components/mode-toggle";

const iconMap: Record<SidebarItem["icon"], ComponentType<{ size?: number; className?: string }>> = {
  "layout-dashboard": LayoutDashboard,
  wallet: Wallet,
  send: Send,
  "line-chart": LineChart,
  "shield-check": ShieldCheck,
  users: Users,
  "file-text": FileText,
  settings: Settings,
  history: History,
  inbox: Inbox,
  user: User,
  "help-circle": CircleHelp,
  "log-out": LogOut,
};

type SidebarProps = {
  role: UserRole;
  className?: string;
};

export function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const roleConfig = getSidebarRoleConfig(role);
  const activeHref = roleConfig.items
    .filter((item) => item.icon !== "log-out")
    .map((item) => item.href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];

  const generalItems = roleConfig.items.filter((item) => item.section === "general");
  const otherItems = roleConfig.items.filter((item) => item.section === "other");
  const accountItems = roleConfig.items.filter((item) => item.section === "account");

  const renderItem = (item: SidebarItem) => {
    const Icon = iconMap[item.icon];
    const isLogout = item.icon === "log-out";
    const isActive = !isLogout && item.href === activeHref;

    if (isLogout) {
      return (
        <button
          key={item.title}
          type="button"
          onClick={() => {
            logout();
            router.replace("/login?force=true");
          }}
          className="relative flex w-full items-center gap-3 rounded-lg px-6 py-3 text-left text-sm font-semibold text-white/90 transition-colors hover:bg-white/12"
        >
          <Icon size={18} className="text-white/75" />
          <span>{item.title}</span>
        </button>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.href}
        className={cn(
          "relative flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-semibold transition-colors",
          isActive
            ? "bg-white/25 text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:rounded-r before:bg-white"
            : "text-white/85 hover:bg-white/12",
        )}
      >
        <Icon size={18} className={cn(isActive ? "text-white" : "text-white/75")} />
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen w-full flex-col overflow-y-auto text-white md:w-65",
        "bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]",
        className,
      )}
    >
      <div className="flex items-center justify-between px-6 pb-8 pt-8">
        <div>
          <p className="text-2xl font-bold leading-tight tracking-tight text-white">PrimeCore</p>
          <p className="text-base font-normal text-white/70">{roleConfig.appName}</p>
        </div>
        <ModeToggle className="text-white hover:bg-white/20 hover:text-white" />
      </div>

      <div className="mb-2 px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">General</p>
      </div>
      <nav className="mb-8 space-y-1 px-3">{generalItems.map((item) => renderItem(item))}</nav>

      {otherItems.length > 0 && (
        <div className="mb-auto">
          <div className="mb-2 px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Other</p>
          </div>
          <nav className="space-y-1 px-3">{otherItems.map((item) => renderItem(item))}</nav>
        </div>
      )}

      {accountItems.length > 0 && (
        <div className="mt-auto px-3 pb-8 pt-4">
          <nav className="space-y-1">{accountItems.map((item) => renderItem(item))}</nav>
        </div>
      )}
    </aside>
  );
}
