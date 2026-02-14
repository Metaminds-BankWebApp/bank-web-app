"use client";

import {
  Car,
  Download,
  FilePlus2,
  FileText,
  GraduationCap,
  History,
  Home,
  Info,
  LayoutDashboard,
  LineChart,
  LogOut,
  PieChart,
  PlusCircle,
  Receipt,
  Send,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store";
import { ModeToggle } from "@/src/components/mode-toggle";

type FeatureKey = "spendiq" | "creditlens" | "loansense" | "transact";
type FeatureRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER";

type FeatureMeta = {
  title: string;
  hrefByRole: Record<FeatureRole, string>;
  icon: "line-chart" | "shield-check" | "file-text" | "send";
  colorClass: string;
};

type SubNavItem = {
  title: string;
  hrefSuffix: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const featureMeta: Record<FeatureKey, FeatureMeta> = {
  spendiq: {
    title: "SpendIQ",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer/spendiq",
      BANK_CUSTOMER: "/bank-customer/spendiq",
    },
    icon: "line-chart",
    colorClass: "bg-[#3e9fd3]",
  },
  creditlens: {
    title: "CreditLens",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer/creditlens",
      BANK_CUSTOMER: "/bank-customer/creditlens",
    },
    icon: "shield-check",
    colorClass: "bg-[#0d3b66]",
  },
  loansense: {
    title: "LoanSense",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer", // Not accessible, placeholder
      BANK_CUSTOMER: "/bank-customer/loansense",
    },
    icon: "file-text",
    colorClass: "bg-[#2f9d94]",
  },
  transact: {
    title: "Transact",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer", // Not accessible, placeholder
      BANK_CUSTOMER: "/bank-customer/transact",
    },
    icon: "send",
    colorClass: "bg-[#0b6d76]",
  },
};

const featureSubNav: Record<FeatureKey, SubNavItem[]> = {
  spendiq: [
    { title: "Overview", hrefSuffix: "", icon: LayoutDashboard },
    { title: "Add Expense", hrefSuffix: "/add", icon: PlusCircle },
    { title: "Expense History", hrefSuffix: "/history", icon: History },
    { title: "Monthly Summary", hrefSuffix: "/summary", icon: PieChart },
    { title: "Budget Settings", hrefSuffix: "/settings", icon: Settings },
  ],
  creditlens: [
    { title: "New Evaluation", hrefSuffix: "/new", icon: FilePlus2 },
    { title: "Evaluation History", hrefSuffix: "/history", icon: History },
    { title: "Download Report", hrefSuffix: "/report", icon: Download },
  ],
  loansense: [
    { title: "Eligibility Overview", hrefSuffix: "", icon: LayoutDashboard },
    { title: "Personal Loan", hrefSuffix: "/personal", icon: User },
    { title: "Vehicle Loan", hrefSuffix: "/vehicle", icon: Car },
    { title: "Education Loan", hrefSuffix: "/education", icon: GraduationCap },
    { title: "Interest Policy Info", hrefSuffix: "/policy", icon: Info },
  ],
  transact: [
    { title: "New Transfer", hrefSuffix: "", icon: Send },
    { title: "Transfer History", hrefSuffix: "/history", icon: History },
    { title: "Transaction Receipt", hrefSuffix: "/receipt", icon: Receipt },
  ],
};

const dashboardHrefByRole: Record<FeatureRole, string> = {
  PUBLIC_CUSTOMER: "/public-customer",
  BANK_CUSTOMER: "/bank-customer",
};

type FeatureSidebarProps = {
  role: FeatureRole;
  feature: FeatureKey;
  className?: string;
};

export function FeatureSidebar({ role, feature, className }: FeatureSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const currentMeta = featureMeta[feature];

  const renderLink = (label: string, href: string, icon: React.ComponentType<{ size?: number; className?: string }>) => {
    const Icon = icon;
    // Strict matching for Overview to avoid highlighting it for all sub-routes, 
    // BUT usually Overview is parent so it might stay highlighted.
    // However, here Overview is hrefSuffix="" -> base path. 
    // "Add Expense" is base path + /add.
    // If I use startsWith, Overview will match everything. 
    // Fix: Exact match if it's the root (unless sub-routes are physically nested in Next.js which they are).
    // Let's use exact match for base path if possible, or handle it smartly.
    // Actually, common sidebar pattern: if I am in /add, Overview is NOT active.
    // So exact match for overview, startsWith for others?
    // Simplified: pathname === href OR pathname.startsWith(`${href}/`)
    // If href is /spendiq, and pathname is /spendiq/add
    // /spendiq/add DOES start with /spendiq/.
    // So Overview would be active.
    // I need a way to distinguish.
    
    // Quick fix: Check if href implies root (ends in feature name) and current path is longer.
    const isRoot = href === featureMeta[feature].hrefByRole[role];
    const isActive = isRoot 
      ? pathname === href 
      : pathname === href || pathname.startsWith(`${href}/`);

    // Special case for "All Apps" (Back to Hub)
    const isHub = label === "All Apps";
    const isHubActive = isHub && pathname === href; // Only exact match for hub

    return (
      <Link
        key={label + href}
        href={href}
        className={cn(
          "relative flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-semibold transition-colors",
          (isHub ? isHubActive : isActive)
            ? "bg-white/25 text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:rounded-r before:bg-white"
            : "text-white/85 hover:bg-white/12",
        )}
      >
        <Icon size={18} className={cn((isHub ? isHubActive : isActive) ? "text-white" : "text-white/75")} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <aside className={cn("sticky top-0 flex h-screen w-full flex-col overflow-y-auto text-white md:w-[260px]", currentMeta.colorClass, className)}>
      <div className="flex items-center justify-between px-6 pb-8 pt-8">
        <div>
          <p className="text-2xl font-bold leading-tight tracking-tight text-white">PrimeCore</p>
          <p className="text-base font-normal text-white/70">{currentMeta.title}</p>
        </div>
        <ModeToggle className="text-white hover:bg-white/20 hover:text-white" />
      </div>

      <div className="mb-2 px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Menu</p>
      </div>
      
      <nav className="space-y-1 px-3">
        {/* Back to Hub */}
        {renderLink("All Apps", dashboardHrefByRole[role], Home)}
        
        <div className="my-2 px-3"><div className="h-px bg-white/20" /></div>

        {/* Feature Specific Tabs */}
        {featureSubNav[feature]?.map((tab) => {
           const basePath = featureMeta[feature].hrefByRole[role];
           // Remove trailing slash if any to avoid double slashes
           const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
           const href = `${cleanBase}${tab.hrefSuffix}`;
           return renderLink(tab.title, href, tab.icon);
        })}
      </nav>

      <div className="mt-auto px-3 pb-8 pt-6">
        <button
          type="button"
          onClick={() => {
            logout();
            router.replace("/login?force=true");
          }}
          className="relative flex w-full items-center gap-3 rounded-lg px-6 py-3 text-left text-sm font-semibold text-white/85 transition-colors hover:bg-white/12"
        >
          <LogOut size={18} className="text-white/75" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
