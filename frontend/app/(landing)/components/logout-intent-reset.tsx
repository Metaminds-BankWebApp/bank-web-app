"use client";

import { useEffect } from "react";
import { LOGOUT_INTENT_KEY } from "@/src/store";

export function LogoutIntentReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(LOGOUT_INTENT_KEY);
  }, []);

  return null;
}
