import { LoginForm } from "./login-form";
import LoginImage from "@/public/login.png";
import { AuthShell } from "@/app/components/auth-shell";

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
      <LoginForm />
    </AuthShell>
  );
}
