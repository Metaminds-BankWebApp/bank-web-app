import {
  CtaBannerSection,
  HeroSection,
  LandingFooter,
  MetricsSection,
  ModulesSection,
  StepsSection,
} from "./components";
import { WhyChooseSection } from "./components/why-choose-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--primecore-background) text-(--primecore-foreground) overflow-x-hidden">
      <div className="min-[1700px]:mx-auto min-[1700px]:w-[calc(100%/1.08)] min-[1700px]:origin-top min-[1700px]:scale-[1.08]">
        <main className="space-y-12 lg:space-y-16">
          <HeroSection />
          <div className="space-y-12 lg:mx-[70px] lg:space-y-16">
            <ModulesSection />
            <WhyChooseSection />
          </div>

          <StepsSection />
          <MetricsSection />
          <CtaBannerSection />
        </main>

        <LandingFooter />
      </div>
    </div>
  );
}
