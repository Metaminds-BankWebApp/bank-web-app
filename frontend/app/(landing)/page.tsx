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
    <div className="min-h-screen bg-(--primecore-background) text-(--primecore-foreground) overflow-x-hidden">
      <main className="space-y-12 lg:space-y-16">
        <HeroSection />
        <ModulesSection />
        <WhyChooseSection />
        <StepsSection />
        <MetricsSection />
        <CtaBannerSection />
      </main>

      <Footer className="mt-8" />
    </div>
  );
}
