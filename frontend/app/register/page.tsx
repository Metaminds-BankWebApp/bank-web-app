import { RegisterForm } from "./register-form";
import RegisterImage from "@/public/register.png";
import { AuthShell } from "@/app/components/auth-shell";

export default function RegisterPage() {
  return (
    <AuthShell
      panelTitle={
        <>
          Create Your
          <br />
          PrimeCore Account
          <br />
          <span className="text-[#4bb5f3]">in Minutes</span>
        </>
      }
      panelDescription="Join a modern banking experience with smarter credit tools, real-time insights, and secure account setup."
      panelImage={RegisterImage}
      panelAlt="PrimeCore registration visual"
      modeTogglePosition="left"
    >
      <RegisterForm />
    </AuthShell>
  );
}
