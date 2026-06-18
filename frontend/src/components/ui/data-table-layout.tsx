import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

type DataTableStatusTone = "success" | "warning" | "danger" | "neutral" | "info";

const statusToneClasses: Record<DataTableStatusTone, string> = {
  success: "border-emerald-100 bg-emerald-50 text-emerald-600",
  warning: "border-amber-100 bg-amber-50 text-amber-600",
  danger: "border-red-100 bg-red-50 text-red-600",
  neutral: "border-slate-200 bg-slate-100 text-slate-600",
  info: "border-blue-100 bg-blue-50 text-blue-600",
};

export function DataTableToolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "creditlens-card creditlens-card-hover mb-6 flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between",
        className,
      )}
      {...props}
    />
  );
}

export function DataTableFilterGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex w-full flex-col gap-4 md:w-auto md:flex-row md:flex-wrap md:items-center", className)} {...props} />;
}

export function DataTableActionGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:w-auto", className)} {...props} />;
}

export function DataTablePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "creditlens-card creditlens-card-hover overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function DataTableTabs({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50/50 p-2", className)}
      {...props}
    />
  );
}

type DataTableTabButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function DataTableTabButton({ active, className, ...props }: DataTableTabButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-9 shrink-0 rounded-lg px-4 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700",
        active && "border border-slate-200 bg-white text-[#0d3b66] shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function DataTableFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    />
  );
}

export function DataTableStatusBadge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: DataTableStatusTone }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[7.5rem] items-center justify-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
        statusToneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}

type DataTablePaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
};

export function DataTablePagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onPrevious,
  onNext,
  className,
}: DataTablePaginationProps) {
  const hasPages = totalPages > 0;
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const isFirstPage = !hasPages || safeCurrentPage <= 1;
  const isLastPage = !hasPages || safeCurrentPage >= safeTotalPages;

  const pageItems = React.useMemo<Array<number | "ellipsis">>(() => {
    if (!hasPages) {
      return [];
    }

    if (safeTotalPages <= 5) {
      return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, "ellipsis", safeTotalPages];
    }

    if (safeCurrentPage >= safeTotalPages - 2) {
      return [1, "ellipsis", safeTotalPages - 2, safeTotalPages - 1, safeTotalPages];
    }

    return [1, "ellipsis", safeCurrentPage, "ellipsis", safeTotalPages];
  }, [hasPages, safeCurrentPage, safeTotalPages]);

  const handlePrevious = () => {
    if (isFirstPage) {
      return;
    }

    if (onPrevious) {
      onPrevious();
      return;
    }

    onPageChange?.(safeCurrentPage - 1);
  };

  const handleNext = () => {
    if (isLastPage) {
      return;
    }

    if (onNext) {
      onNext();
      return;
    }

    onPageChange?.(safeCurrentPage + 1);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        disabled={isFirstPage}
        onClick={handlePrevious}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="inline-flex h-8 w-8 items-center justify-center text-xs text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange?.(item)}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50",
              safeCurrentPage === item && "border-[#3e9fd3] bg-[#3e9fd3] text-white hover:bg-[#328ab8]",
            )}
            aria-current={safeCurrentPage === item ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={isLastPage}
        onClick={handleNext}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
