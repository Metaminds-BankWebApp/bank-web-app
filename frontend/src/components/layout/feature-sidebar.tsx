"use client";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
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
  Receipt,
  Grid
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store";

export type FeatureKey = "spendiq" | "creditlens" | "loansense" | "transact";
export type FeatureRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER";

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

export const featureMeta: Record<FeatureKey, FeatureMeta> = {
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
      PUBLIC_CUSTOMER: "/public-customer/loansense",
      BANK_CUSTOMER: "/bank-customer/loansense",
    },
    colorClass: "bg-[#0d3b66]", // Strong Blue
  },
  transact: {
    title: "PrimeCore",
    subtitle: "Transact",
    hrefByRole: {
      PUBLIC_CUSTOMER: "/public-customer/transact",
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
          { title: "Add Expense", href: `${base}/add`, icon: Receipt },
          { title: "Expenses History", href: `${base}/history`, icon: FileText },
          { title: "Category Analysis", href: `${base}/category`, icon: UserPlus }, // Following prompt, icon name might be placeholder
          { title: "Budget Management", href: `${base}/budget`, icon: Wallet },
          { title: "Profile", href: `${base}/profile`, icon: User },
          { title: "Settings", href: `${base}/settings`, icon: Settings },
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
  onNavigate?: () => void;
};

export function FeatureSidebar({ role, feature, className, onNavigate }: FeatureSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) {
      setTimeout(() => setIsCollapsed(JSON.parse(saved)), 0);
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  const currentMeta = featureMeta[feature];
  const sections = getFeatureLinks(feature, role);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen flex-col overflow-y-auto text-white transition-all duration-300 shadow-xl z-50",
        currentMeta.colorClass,
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className={cn("flex flex-col items-center", isCollapsed ? "py-6 gap-6" : "px-6 py-8 md:py-10")}>
        <div className={cn("w-full flex items-center justify-between", isCollapsed && "flex-col gap-6")}>
          {isCollapsed ? (
             <button
               onClick={toggleCollapse}
               className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
               title="Expand Sidebar"
             >
               <ArrowRightFromLine size={20} />
             </button>
          ) : (
            <div className="flex-1">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white mb-1">
                {currentMeta.title}
              </h1>
              <p className="text-sm font-medium text-white/70 tracking-wide">{currentMeta.subtitle}</p>
            </div>
          )}


          {isCollapsed && (
             <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
               PC
             </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6">

        {/* All Apps Link */}
        <div className="mb-6">
           <Link
             href={dashboardHrefByRole[role]}
             onClick={onNavigate}
             className={cn(
               "flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg",
               isCollapsed && "justify-center px-2"
             )}
           >
             <Grid size={18} />
             {!isCollapsed && <span>All Apps</span>}
           </Link>
        </div>

        {/* Feature Sections */}
        {sections.map((section, idx) => (
           <div key={idx} className="space-y-2">
              {section.label && !isCollapsed && (
                <div className="px-4 mb-2">
                   <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">{section.label}</p>
                </div>
              )}
              <div className="space-y-1">
                 {section.items.map((item, itemIdx) => {
                    const isDashboard = item.href === currentMeta.hrefByRole[role];
                    const isActive = isDashboard 
                      ? pathname === item.href 
                      : pathname.startsWith(item.href);

                    const Icon = item.icon;

                    return (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-white/10 text-white shadow-sm backdrop-blur-sm"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                          isCollapsed && "justify-center px-2"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <Icon size={18} className={cn(isActive ? "text-white" : "text-white/70")} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    );
                 })}
              </div>
           </div>
        ))}

        {/* Other Section */}
        <div className="space-y-2 pt-4 border-t border-white/10 mt-4">
           {!isCollapsed && (
             <div className="px-4 mb-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Other</p>
             </div>
           )}
           <div className="space-y-1">
              <Link
                href={`${currentMeta.hrefByRole[role]}/help`}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  pathname.startsWith(`${currentMeta.hrefByRole[role]}/help`)
                    ? "bg-white/10 text-white shadow-sm backdrop-blur-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? "Help & Support" : undefined}
              >
                  <HelpCircle size={18} className={cn(pathname.startsWith(`${currentMeta.hrefByRole[role]}/help`) ? "text-white" : "text-white/70")} />
                  {!isCollapsed && <span>Help & Support</span>}
              </Link>
              <Link
                href={`${currentMeta.hrefByRole[role]}/settings`}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  pathname.startsWith(`${currentMeta.hrefByRole[role]}/settings`)
                    ? "bg-white/10 text-white shadow-sm backdrop-blur-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? "Settings" : undefined}
              >
                  <Settings size={18} className={cn(pathname.startsWith(`${currentMeta.hrefByRole[role]}/settings`) ? "text-white" : "text-white/70")} />
                  {!isCollapsed && <span>Settings</span>}
              </Link>
           </div>
        </div>

      </nav>

      {/* Footer / Logout */}
      <div className={cn("mt-auto px-6 pb-4 pt-4", isCollapsed && "px-2")}>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            logout();
            router.replace("/login?force=true");
          }}
          className={cn(
            "flex w-full items-center gap-3 text-left text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg",
            isCollapsed && "justify-center px-2"
          )}
          title={isCollapsed ? "Log Out" : undefined}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}

