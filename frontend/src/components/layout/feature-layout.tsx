"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FeatureSidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

type FeatureRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER";
type FeatureKey = "spendiq" | "creditlens" | "loansense" | "transact";

type FeatureLayoutProps = {
  children: React.ReactNode;
  role: FeatureRole;
  feature: FeatureKey;
};

type FeatureLayoutContextValue = {
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
};

const FeatureLayoutContext = createContext<FeatureLayoutContextValue | null>(null);

export function useFeatureLayout() {
  return useContext(FeatureLayoutContext);
}

export function FeatureLayout({ children, role, feature }: FeatureLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const contextValue = useMemo<FeatureLayoutContextValue>(
    () => ({
      openMobileSidebar: () => setIsMobileSidebarOpen(true),
      closeMobileSidebar: () => setIsMobileSidebarOpen(false),
      isMobileSidebarOpen,
    }),
    [isMobileSidebarOpen]
  );

  return (
    <AuthGuard requiredRole={role}>
      <FeatureLayoutContext.Provider value={contextValue}>
        <div className="flex h-screen overflow-hidden">
          <FeatureSidebar role={role} feature={feature} className="hidden lg:flex" />

          <div
            className={cn(
              "fixed inset-0 z-[70] lg:hidden",
              isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileSidebarOpen(false)}
              className={cn(
                "absolute inset-0 bg-slate-950/50 transition-opacity",
                isMobileSidebarOpen ? "opacity-100" : "opacity-0"
              )}
            />

            <div
              className={cn(
                "absolute inset-y-0 left-0 max-w-[85vw] transition-transform duration-300 ease-out",
                isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <FeatureSidebar
                role={role}
                feature={feature}
                onNavigate={() => setIsMobileSidebarOpen(false)}
                className="flex !h-full !w-[280px] !max-w-[85vw] !static"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto rounded-none bg-(--primecore-surface) p-3 sm:p-4 lg:rounded-l-[28px] lg:p-0">
            {children}
          </main>
        </div>
      </FeatureLayoutContext.Provider>
    </AuthGuard>
  );
}
