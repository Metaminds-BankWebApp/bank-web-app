"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
};

type ToastInput = Omit<ToastItem, "id">;

type ToastContextValue = {
  toasts: ToastItem[];
  showToast: (toast: ToastInput) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

const typeStyles: Record<ToastType, string> = {
  success: "border-(--toast-success-border) bg-(--toast-success-bg) text-(--toast-success-text)",
  error: "border-(--toast-danger-border) bg-(--toast-danger-bg) text-(--toast-danger-text)",
  info: "border-(--toast-info-border) bg-(--toast-info-bg) text-(--toast-info-text)",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = React.useCallback((toast: ToastInput) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...toast }]);

    window.setTimeout(() => {
      dismissToast(id);
    }, 3500);
  }, [dismissToast]);

  const value = React.useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-60 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-xl border border-l-4 px-4 py-3 shadow-[0_10px_24px_-20px_rgba(2,14,28,0.45)] backdrop-blur",
              typeStyles[toast.type],
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description && <p className="mt-1 text-xs opacity-90">{toast.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded p-1 text-xs opacity-75 transition-opacity hover:opacity-100"
                aria-label="Dismiss toast"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
