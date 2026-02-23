import LoginImage from "@/public/login.png";
import { AuthShell } from "@/app/components/auth-shell";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      panelTitle={
        <>
          Recover Account
          <br />
          Access Securely
          <br />
          <span className="text-[#4bb5f3]">with PrimeCore</span>
        </>
      }
      panelDescription="Enter your email and we will guide you through secure verification and password recovery."
      panelImage={LoginImage}
      panelAlt="Forgot password visual"
      modeTogglePosition="right"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
