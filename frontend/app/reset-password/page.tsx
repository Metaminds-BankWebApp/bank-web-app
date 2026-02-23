import RegisterImage from "@/public/register.png";
import { Suspense } from "react";
import { AuthShell } from "@/app/components/auth-shell";
import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      panelTitle={
        <>
          Set a New
          <br />
          Secure Password
          <br />
          <span className="text-[#4bb5f3]">for Your Account</span>
        </>
      }
      panelDescription="Create a strong new password to restore account access and keep your profile protected."
      panelImage={RegisterImage}
      panelAlt="Reset password visual"
      modeTogglePosition="left"
      contentSide="right"
    >
      <Suspense fallback={<div className="py-6 text-center text-sm text-(--primecore-foreground)/70">Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
