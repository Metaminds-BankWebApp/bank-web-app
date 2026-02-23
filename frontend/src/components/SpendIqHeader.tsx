"use client";

import ModuleHeader from "@/src/components/ui/module-header";

/**
 * Legacy wrapper kept for compatibility only.
 * Use ModuleHeader directly in new code.
 */
export function SpendIqHeader({ title }: { title: string }) {
  return <ModuleHeader theme="spendiq" menuMode="feature-layout" title={title} />;
}
