"use client";

import { useEffect } from "react";
import { Download, FileText, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export type ReportFileType = "pdf" | "excel" | "word";

type ReportDownloadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileBaseName: string;
  fileType: ReportFileType;
  onFileTypeChange: (value: ReportFileType) => void;
  monthLabel: string;
  score: number;
  riskLabel: "Low" | "Medium" | "High";
};

const fileTypeMeta: Record<ReportFileType, { label: string; extension: string; note: string }> = {
  pdf: { label: "PDF", extension: "pdf", note: "Best for sharing and print-ready reports." },
  excel: { label: "Excel", extension: "xlsx", note: "Best for data review and edits in spreadsheets." },
  word: { label: "Word", extension: "docx", note: "Best for document comments and annotations." },
};

export function ReportDownloadModal({
  open,
  onOpenChange,
  fileBaseName,
  fileType,
  onFileTypeChange,
  monthLabel,
  score,
  riskLabel,
}: ReportDownloadModalProps) {
  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  const selectedMeta = fileTypeMeta[fileType];
  const fullFileName = `${fileBaseName}.${selectedMeta.extension}`;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close report download modal"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-[#052540]/65 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[26px] border border-sky-200/20 bg-[linear-gradient(145deg,#08345a_0%,#0a4675_55%,#0d568f_100%)] p-5 text-white shadow-[0_30px_80px_-40px_rgba(2,18,33,0.85)] sm:p-6"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#76d5ff]/20 blur-[90px]" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold sm:text-2xl">Prepare CreditLens Report</h3>
            <p className="mt-1 text-sm text-sky-100/80">Choose format and review filename before download.</p>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-100/80">
                System Generated File Name
              </p>
              <p className="mt-2 break-all text-sm font-medium leading-relaxed text-white sm:text-base">{fullFileName}</p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-sky-100/80">
                Select File Type
              </label>
              <Select value={fileType} onValueChange={(value) => onFileTypeChange(value as ReportFileType)}>
                <SelectTrigger className="h-11 rounded-xl border-white/25 bg-white/15 text-left text-white focus:ring-sky-200/50">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="border-white/20 bg-[#0e4877] text-white">
                  <SelectItem value="pdf" className="hover:bg-white/10 focus:bg-white/10">
                    PDF
                  </SelectItem>
                  <SelectItem value="excel" className="hover:bg-white/10 focus:bg-white/10">
                    Excel
                  </SelectItem>
                  <SelectItem value="word" className="hover:bg-white/10 focus:bg-white/10">
                    Word
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-sky-100/75">{selectedMeta.note}</p>
            </div>

            <div className="rounded-xl border border-white/20 bg-slate-950/20 px-3 py-2 text-xs text-sky-100/85">
              Frontend preview only. Real file generation can be connected later.
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-100/80">File Preview</p>

            <div className="mt-3 min-h-[220px] rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                  {selectedMeta.label}
                </span>
              </div>

              <p className="mt-3 break-all text-sm font-semibold leading-relaxed">{fullFileName}</p>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Report Month</span>
                  <span className="font-medium text-slate-800">{monthLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Credit Score</span>
                  <span className="font-medium text-slate-800">{score}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risk Category</span>
                  <span className="font-medium text-slate-800">{riskLabel}</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-3">
                <div className="h-2 w-4/5 rounded bg-slate-200" />
                <div className="mt-2 h-2 w-2/3 rounded bg-slate-200" />
                <div className="mt-2 h-2 w-3/4 rounded bg-slate-200" />
                <div className="mt-3 h-14 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/35 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              console.log("Prepare report file:", fullFileName);
              onOpenChange(false);
            }}
            className="bg-sky-300 text-[#05233a] hover:bg-sky-200"
          >
            <Download className="h-4 w-4" />
            Prepare File
          </Button>
        </div>
      </div>
    </div>
  );
}
