"use client";

import {
  ArrowRightLeft,
  Banknote,
  Car,
  FileClock,
  FileText,
  GraduationCap,
  HelpCircle,
  History,
  Home,
  Lightbulb,
  LogOut,
  Settings,
  TrendingUp,
  User,
  UserPlus,
  Wallet,
  Grid
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store";

type FeatureKey = "spendiq" | "creditlens" | "loansense" | "transact";
type FeatureRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER";

type FeatureMeta = {
  title: string;
  hrefByRole: Record<FeatureRole, string>;
  subtitle?: string;
  colorClass: string;
};

type SubNavItem = {
  title: string;
  href: string; // Changed from hrefSuffix for clarity, or construct it
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type SidebarSection = {
  label?: string;
  items: SubNavItem[];
};

const featureMeta: Record<FeatureKey, FeatureMeta> = {
  spendiq: {
    title: "PrimeCore",
    subtitle: "SpendIQ",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer/spendiq",
      BANK_CUSTOMER: "/bank-customer/spendiq",
    },
    colorClass: "bg-[#0b1a3a]", // Dark Navy
  },
  creditlens: {
    title: "PrimeCore",
    subtitle: "CreditLens",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer/creditlens",
      BANK_CUSTOMER: "/bank-customer/creditlens",
    },
    colorClass: "bg-[#0a234c]", // Slightly lighter/teal navy
  },
  loansense: {
    title: "PrimeCore",
    subtitle: "LoanSense",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer",
      BANK_CUSTOMER: "/bank-customer/loansense",
    },
    colorClass: "bg-[#0d3b66]", // Strong Blue
  },
  transact: {
    title: "PrimeCore",
    subtitle: "Transact",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer",
      BANK_CUSTOMER: "/bank-customer/transact",
    },
    colorClass: "bg-[#0B3E5A]", 
  },
};

// Helper to build links
const getFeatureLinks = (feature: FeatureKey, role: FeatureRole): SidebarSection[] => {
  const base = featureMeta[feature].hrefByRole[role];
  
  if (feature === "spendiq") {
    return [
      {
        label: "General",
        items: [
          { title: "Dashboard", href: base, icon: Home },
          { title: "Expenses History", href: `${base}/history`, icon: FileText },
          { title: "Category Analysis", href: `${base}/analysis`, icon: UserPlus }, // Following prompt, icon name might be placeholder
          { title: "Budget Management", href: `${base}/budget`, icon: Wallet },
          { title: "Profile", href: `${base}/profile`, icon: User },
        ]
      }
    ];
  }
  
  if (feature === "creditlens") {
    return [
      {
        label: "General",
        items: [
          { title: "Dashboard", href: base, icon: Home },
          { title: "Trend Analysis", href: `${base}/trends`, icon: TrendingUp },
          { title: "Credit Insight", href: `${base}/insight`, icon: Lightbulb },
          { title: "Reports", href: `${base}/report`, icon: FileText },
          { title: "Profile", href: `${base}/profile`, icon: User },
        ]
      }
    ];
  }

  if (feature === "loansense") {
    return [
      {
        label: "General",
        items: [
          { title: "Dashboard", href: base, icon: Home },
          { title: "Personal Loan", href: `${base}/personal`, icon: Banknote },
          { title: "Vehicle Loan", href: `${base}/vehicle`, icon: Car },
          { title: "Educational Loan", href: `${base}/education`, icon: GraduationCap },
          { title: "Housing Loan", href: `${base}/housing`, icon: Home }, // Using existing route logic if possible, or new
          { title: "Loan Eligibility History", href: `${base}/history`, icon: History },
          { title: "Profile", href: `${base}/profile`, icon: User },
        ]
      }
    ];
  }

  if (feature === "transact") {
    return [
      {
        label: "General",
        items: [
          { title: "Dashboard", href: base, icon: Home },
          { title: "Transfer", href: `${base}/transfer`, icon: ArrowRightLeft },
          { title: "Add Beneficiary", href: `${base}/beneficiary`, icon: UserPlus },
          { title: "Transaction History", href: `${base}/history`, icon: FileClock },
          { title: "Profile", href: `${base}/profile`, icon: User },
        ]
      }
    ];
  }

  return [];
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
  const sections = getFeatureLinks(feature, role);

  return (
    <aside 
      className={cn(
        "sticky top-0 h-screen w-64 flex-col overflow-y-auto text-white transition-all duration-300 shadow-xl z-50", 
        currentMeta.colorClass,
        className
      )}
    >
      {/* Brand Header */}
      <div className="px-8 py-8 md:py-10">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white mb-1">
          {currentMeta.title}
        </h1>
        <p className="text-sm font-medium text-white/70 tracking-wide">{currentMeta.subtitle}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6">
        
        {/* All Apps Link */}
        <div className="mb-6">
           <Link 
             href={dashboardHrefByRole[role]}
             className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
           >
             <Grid size={18} />
             <span>All Apps</span>
           </Link>
        </div>

        {/* Feature Sections */}
        {sections.map((section, idx) => (
           <div key={idx} className="space-y-2">
              {section.label && (
                <div className="px-4 mb-2">
                   <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">{section.label}</p>
                </div>
              )}
              <div className="space-y-1">
                 {section.items.map((tab) => {
                    const isActive = tab.href === currentMeta.hrefByRole[role] 
                      ? pathname === tab.href 
                      : pathname.startsWith(tab.href);
                      
                    return (
                      <Link
                        key={tab.title + tab.href}
                        href={tab.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-white/10 text-white shadow-sm backdrop-blur-sm"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <tab.icon size={18} className={cn(isActive ? "text-white" : "text-white/70")} />
                        <span>{tab.title}</span>
                      </Link>
                    );
                 })}
              </div>
           </div>
        ))}

        {/* Other Section */}
        <div className="space-y-2 pt-4">
           <div className="px-4 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Other</p>
           </div>
           <div className="space-y-1">
              <Link href="/help" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all">
                  <HelpCircle size={18} className="text-white/70" />
                  <span>Help & Support</span>
              </Link>
              <Link href="/settings" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all">
                  <Settings size={18} className="text-white/70" />
                  <span>Setting</span>
              </Link>
           </div>
        </div>

      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto px-6 pb-4 pt-4">
        <button
          type="button"
          onClick={() => {
            logout();
            router.replace("/login?force=true");
          }}
          className="flex w-full items-center gap-3 text-left text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

