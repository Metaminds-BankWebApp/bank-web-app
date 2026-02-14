import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-xl border border-(--primecore-border) bg-(--primecore-surface)">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-[#eef2f4] dark:bg-[#2F9D94]/16", className)} {...props} />
  ),
);

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(
  ({ className, ...props }, ref) =>
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />,
);

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-(--primecore-border) transition-colors hover:bg-[#f4f8f9] dark:hover:bg-[#2F9D94]/12",
        className,
      )}
      {...props}
    />
  ),
);

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-[0.08em] text-(--primecore-foreground)/75",
        className,
      )}
      {...props}
    />
  ),
);

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-3 align-middle text-(--primecore-foreground)", className)} {...props} />
  ),
);

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";
