import LoginImage from "@/public/login.png";
import { Suspense } from "react";
import { AuthShell } from "@/app/components/auth-shell";
import { OtpVerificationForm } from "./verify-otp-form";

export default function VerifyOtpPage() {
  return (
    <AuthShell
      panelTitle={
        <>
          Two-Factor
          <br />
          Verification
          <br />
          <span className="text-[#4bb5f3]">for Extra Security</span>
        </>
      }
      panelDescription="Use the one-time code sent to your email or phone to continue securely."
      panelImage={LoginImage}
      panelAlt="OTP verification visual"
      modeTogglePosition="right"
      contentSide="right"
    >
      <Suspense fallback={<div className="py-6 text-center text-sm text-(--primecore-foreground)/70">Loading OTP verification...</div>}>
        <OtpVerificationForm />
      </Suspense>
    </AuthShell>
  );
}
