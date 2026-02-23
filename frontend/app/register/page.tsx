import { RegisterForm } from "./register-form";
import { ModeToggle } from "@/src/components/mode-toggle";
import Image from "next/image";
import RegisterImage from "@/public/register.png";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen bg-(--primecore-background) lg:grid-cols-2">
      <main className="relative flex items-center justify-center bg-(--primecore-background) px-6 py-12 lg:px-16">
        <div className="absolute left-4 top-4">
          <ModeToggle />
        </div>
        <RegisterForm />
      </main>

      <section className="relative hidden overflow-hidden bg-[#0d3b66] lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-16">
        <div>
          <h1 className="max-w-md text-xl font-bold leading-tight text-white">
            <span className="text-[#4bb5f3]">Our Members</span> are
            <br />
            Around the World
          </h1>
          <p className="mt-4 text-lg text-white/80">Over 10,000 investors join us monthly</p>
        </div>

        <div className="flex justify-center">
          <Image src={RegisterImage} alt="" width={500} height={250} className="rounded-3xl" />
        </div>

        <div className="self-end rounded-full bg-white px-8 py-4 text-xl font-bold text-[#0d3b66]">PrimeCore</div>
      </section>
    </div>
  );
}
