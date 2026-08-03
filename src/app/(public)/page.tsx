import BillingToggle from "@/modules/landing/components/molecules/BillingToggle";
import TestimonialCard from "@/modules/landing/components/molecules/TestimonialCard";
import FAQSection from "@/modules/landing/components/organisms/FAQSection";
import FeaturesSection from "@/modules/landing/components/organisms/FeaturesSection";
import Header from "@/modules/landing/components/organisms/Header";
import HeroSection from "@/modules/landing/components/organisms/HeroSection";
import PricingSection from "@/modules/landing/components/organisms/PricingSection";
import TestimonialsSection from "@/modules/landing/components/organisms/TestimonialsSection";

export default function page() {
  return (
    <div>
    <Header />
    <HeroSection />
    <FeaturesSection />
    <TestimonialsSection />
    <PricingSection />
    <FAQSection />
    </div>
  );
}
