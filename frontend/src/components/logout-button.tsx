"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { authService } from "@/src/api/auth/auth.service";
import { useAuthStore } from "@/src/store";

export function LogoutButton({ className, variant }: { className?: string; variant?: "primary" | "secondary" | "outline" | "ghost" }) {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Local logout should still happen even if backend call fails.
    } finally {
      logout();
      window.location.replace("/");
    }
  };

  return (
    <Button
      variant={variant ?? "ghost"}
      onClick={handleLogout}
      className={`gap-2 text-muted-foreground hover:text-destructive ${className}`}
    >
      <LogOut className="h-4 w-4" />
      Log out
    </Button>
  );
}
