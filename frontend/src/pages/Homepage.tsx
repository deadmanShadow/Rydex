import AppPromo from "@/components/modules/homepage/AppPromo";
import HeroSection from "@/components/modules/homepage/HeroSection";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import PublicStats from "@/components/modules/homepage/PublicStats";
import ServiceHighlights from "@/components/modules/homepage/ServiceHighlights";
import Testimonials from "@/components/modules/homepage/Testimonials";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <PublicStats />
      <ServiceHighlights />
      <HowItWorks />
      <Testimonials />
      <AppPromo />
    </div>
  );
}
