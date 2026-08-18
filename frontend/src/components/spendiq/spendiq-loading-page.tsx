import { Skeleton } from "@/src/components/ui/skeleton";

/**
 * Route-level placeholder used while any SpendIQ screen is being loaded.
 * It deliberately mirrors the shared SpendIQ shell so it works for dashboard,
 * data-entry, analysis, and account-related tabs alike.
 */
export function SpendIqLoadingPage() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading SpendIQ"
      className="min-h-full space-y-6 bg-gradient-to-br from-[#f0f4ff] to-[#e6ecf9] p-4 sm:p-6 dark:from-slate-950 dark:to-slate-900"
    >
      <span className="sr-only">Loading SpendIQ content</span>

      <div className="flex min-h-16 items-center justify-between gap-4 rounded-xl bg-[linear-gradient(90deg,#0b1a3a,#0a234c)] px-4 shadow-sm sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg bg-white/20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-white/25 sm:w-52" />
            <Skeleton className="h-3 w-20 bg-white/15" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="hidden h-9 w-28 bg-white/20 md:block" />
          <Skeleton className="h-8 w-8 rounded-full bg-white/25" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-6 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm xl:col-span-3 dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="mx-auto h-56 w-56 rounded-full sm:h-64 sm:w-64" />
        </div>

        <div className="space-y-6 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm xl:col-span-2 dark:border-slate-700 dark:bg-slate-900/70">
          <Skeleton className="h-4 w-36" />
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between gap-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
        <Skeleton className="h-4 w-36" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
