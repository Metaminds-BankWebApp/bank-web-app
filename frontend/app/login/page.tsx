import { LoginForm } from "./login-form";
import { ModeToggle } from "@/src/components/mode-toggle";
import Image from "next/image";
import LoginImage from "@/public/login.png";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen bg-(--primecore-background) lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-[#0d3b66] lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-16">
        <div>
          <h1 className="max-w-md text-xl font-bold leading-tight text-white">
            Getting Easier
            <br />
            Pay for Any Transfer
            <br />
            <span className="text-[#4bb5f3]">with PrimeCore</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">Install iBankcare application right now!</p>
        </div>

        <div>
            <Image src={LoginImage} alt="" width={510} height={260} className="rounded-[32px] object-cover" />
        </div>

        <div className="self-end rounded-full bg-white px-8 py-4 text-xl font-bold text-[#0d3b66]">PrimeCore</div>
      </section>

      <main className="relative flex items-center justify-center bg-(--primecore-background) px-6 py-12 lg:px-16">
        <div className="absolute right-4 top-4">
          <ModeToggle />
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
