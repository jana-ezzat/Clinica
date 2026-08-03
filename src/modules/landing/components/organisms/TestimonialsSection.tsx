import { getTranslations } from "next-intl/server";
import TestimonialCard from "../molecules/TestimonialCard";
import Heading from "@/shared/components/atoms/Heading";


export default async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as {
    name: string;
    role: string;
    quote: string;
    rating: number;
  }[];

  return (
    <section id="reviews" className="ds-bg-card px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <Heading title={t("heading")} subtitle={t("subheading")} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {items.map((item, i) => (
            <TestimonialCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
