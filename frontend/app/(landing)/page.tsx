import { Footer, Navbar } from "@/src/components/layout";
import {
  CtaBannerSection,
  HeroSection,
  ModulesSection,
  StepsSection,
  WhyChooseSection,
} from "./components";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--primecore-background)">
      <Navbar />
      <main>
        landing page
         <HeroSection />
        <ModulesSection />
        <WhyChooseSection />
        <StepsSection />
        <CtaBannerSection /> 
      </main>
      <Footer />
    </div>
  );
}
