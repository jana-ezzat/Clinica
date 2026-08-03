import TestimonialCard from "@/modules/landing/components/molecules/TestimonialCard";
import FeaturesSection from "@/modules/landing/components/organisms/FeaturesSection";
import Header from "@/modules/landing/components/organisms/Header";
import HeroSection from "@/modules/landing/components/organisms/HeroSection";
import TestimonialsSection from "@/modules/landing/components/organisms/TestimonialsSection";

export default function page() {
  return (
    <div>
    <Header />
    <HeroSection />
    <FeaturesSection />
    <TestimonialsSection />
    </div>
  );
}
