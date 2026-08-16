import { LoginForm } from "./login-form";
import LoginImage from "@/public/login.png";
import { AuthShell } from "@/app/components/auth-shell";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <AuthShell
      panelTitle={
        <>
          Smart Banking,
          <br />
          Faster Decisions
          <br />
          <span className="text-[#4bb5f3]">with PrimeCore</span>
        </>
      }
      panelDescription="Securely access your account, monitor your activity, and continue where you left off in seconds."
      panelImage={LoginImage}
      panelAlt="PrimeCore login visual"
      modeTogglePosition="right"
      contentSide="right"
    >
      <Suspense fallback={<div className="py-12 text-center text-sm text-slate-500">Loading sign in...</div>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
