"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FeatureSidebar, featureMeta } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import creditLensBackground from "@/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png";

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
  headerPortalElement: HTMLDivElement | null;
};

// Context used to control the mobile sidebar state from nested components.
// Components can call `useFeatureLayout()` to open/close the sidebar.
const FeatureLayoutContext = createContext<FeatureLayoutContextValue | null>(null);

/**
 * Hook to access the layout context.
 *
 * Returns the `FeatureLayoutContextValue` object or `null` if used outside
 * of a `FeatureLayout` provider. Consumers can use `openMobileSidebar`,
 * `closeMobileSidebar` and read `isMobileSidebarOpen`.
 */
export function useFeatureLayout() {
  return useContext(FeatureLayoutContext);
}

/**
 * Layout component that wraps feature screens (e.g. CreditLens, Transact).
 *
 * Responsibilities:
 * - Enforce the required `role` via `AuthGuard`.
 * - Render the `FeatureSidebar` for desktop and a slide-in mobile sidebar.
 * - Provide a context that lets nested components toggle the mobile sidebar.
 * - Apply feature-specific surface styles and optional background images.
 *
 * Props:
 * - `children`: page content rendered in the main area.
 * - `role`: required user role for the enclosed routes (enforced by `AuthGuard`).
 * - `feature`: feature key to determine sidebar and surface styling.
 */
export function FeatureLayout({ children, role, feature }: FeatureLayoutProps) {
  // Local UI state to track whether the mobile sidebar is visible.
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [headerPortalElement, setHeaderPortalElement] = useState<HTMLDivElement | null>(null);

  // Shorthand booleans to pick styling and background for specific features.
  const isCreditLens = feature === "creditlens";
  const isTransact = feature === "transact";
  const isLoanSense = feature === "loansense";

  // Close the mobile sidebar when the user presses Escape. The effect
  // subscribes on mount and cleans up on unmount.
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  // Memoize the context value so consumers don't re-render unnecessarily.
  const contextValue = useMemo<FeatureLayoutContextValue>(
    () => ({
      openMobileSidebar: () => setIsMobileSidebarOpen(true),
      closeMobileSidebar: () => setIsMobileSidebarOpen(false),
      isMobileSidebarOpen,
      headerPortalElement,
    }),
    [headerPortalElement, isMobileSidebarOpen]
  );

  return (
    <AuthGuard requiredRole={role}>
      <FeatureLayoutContext.Provider value={contextValue}>
        <div className={cn("flex h-screen overflow-hidden", featureMeta[feature]?.colorClass)}>
          {/* Desktop sidebar (hidden on small screens) */}
          <FeatureSidebar role={role} feature={feature} className="hidden lg:flex" />

          {/*
            Mobile sidebar overlay:
            - A full-screen overlay captures clicks to close the menu.
            - The sliding panel contains the sidebar and a close button.
          */}
          <div
            className={cn(
              "fixed inset-0 z-[70] lg:hidden",
              isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            {/* Backdrop: fades in when the menu opens. */}
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileSidebarOpen(false)}
              className={cn(
                "absolute inset-0 bg-slate-950/50 transition-opacity",
                isMobileSidebarOpen ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Sliding panel that animates in/out from the left. */}
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
              {/* Small close button in the panel header. */}
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

          {/*
            Main content area:
            - Applies different background colors/rounded corners per feature.
            - For CreditLens, we also apply a decorative background image.
          */}
          <main
            className={cn(
              "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-none",
              isCreditLens
                ? "bg-[#e9eff7] lg:rounded-l-[32px]"
                : isTransact
                ? "transact-surface-shade bg-[#f8fcff] lg:rounded-l-[28px]"
                : isLoanSense
                ? "loansense-surface-shade bg-[#f7f9ff] lg:rounded-l-[28px]"
                : "bg-(--primecore-surface) lg:rounded-l-[28px]"
            )}
            style={
              isCreditLens
                ? {
                    backgroundImage: `url("${creditLensBackground.src}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                  }
                : undefined
            }
          >
            <div
              ref={setHeaderPortalElement}
              className="shrink-0 px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10 [&:empty]:hidden"
            />
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 lg:p-0">
              {children}
            </div>
          </main>
        </div>
      </FeatureLayoutContext.Provider>
    </AuthGuard>
  );
}
