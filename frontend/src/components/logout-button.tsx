"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { useAuthStore } from "@/src/store";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout} 
      className={`gap-2 text-muted-foreground hover:text-destructive ${className}`}
    >
      <LogOut className="h-4 w-4" />
      Log out
    </Button>
  );
}
