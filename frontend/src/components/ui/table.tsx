import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm text-slate-700", className)} {...props} />
    </div>
  ),
);

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-sky-50/70 text-slate-500", className)} {...props} />
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
        "border-b border-slate-100 transition-colors hover:bg-slate-50/50",
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
        "h-11 px-4 text-left align-middle text-xs font-bold uppercase tracking-wider text-slate-500",
        className,
      )}
      {...props}
    />
  ),
);

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-3.5 align-middle text-slate-700", className)} {...props} />
  ),
);

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";
