import {
  CtaBannerSection,
  FadeInSection,
  HeroSection,
  LandingFooter,
  LandingBackground,
  MetricsSection,
  ModulesSection,
  StepsSection,
} from "./components";
import { WhyChooseSection } from "./components/why-choose-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--primecore-background) text-(--primecore-foreground) overflow-x-hidden relative">
      <LandingBackground />
      <main className="space-y-10 sm:space-y-12 lg:space-y-16 relative z-10">
        <HeroSection />
        <div className="space-y-10 sm:space-y-12 lg:mx-17.5 lg:space-y-16">
          <FadeInSection>
            <ModulesSection />
          </FadeInSection>
          <FadeInSection delay={0.04}>
            <WhyChooseSection />
          </FadeInSection>
        </div>

        <FadeInSection>
          <StepsSection />
        </FadeInSection>

        <FadeInSection>
          <MetricsSection />
        </FadeInSection>

        <FadeInSection>
          <CtaBannerSection />
        </FadeInSection>
      </main>

      <LandingFooter />
    </div>
  );
}
