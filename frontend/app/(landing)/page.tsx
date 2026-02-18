import { Footer } from "@/src/components/layout";
import {
  CtaBannerSection,
  HeroSection,
  MetricsSection,
  ModulesSection,
  StepsSection,
} from "./components";
import { WhyChooseSection } from "./components/why-choose-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--primecore-background) text-(--primecore-foreground)">
      <main>
        <HeroSection />
        <ModulesSection />
        <WhyChooseSection />
        <StepsSection />
        <MetricsSection />
        <CtaBannerSection />
      </main>
      <Footer className="mt-4" />
    </div>
  );
}
