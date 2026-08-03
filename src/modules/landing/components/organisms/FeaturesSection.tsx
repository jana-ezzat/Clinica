import { getTranslations } from "next-intl/server";
import { Calendar, Users, FileText, ChartLine } from "@/assets/icons/icons";
import Heading from "@/shared/components/atoms/Heading";
import FeatureCard from "../molecules/FeatureCard";


const ICONS = {
  appointments: Calendar,
  patientFiles: Users,
  invoices: FileText,
  reports: ChartLine,
} as const;

export default async function FeaturesSection() {
  const t = await getTranslations("features");
  const items = t.raw("items") as {
    key: keyof typeof ICONS;
    title: string;
    description: string;
  }[];

  return (
    <section id="features" className="ds-bg-grey px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <Heading title={t("heading")} subtitle={t("subheading")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {items.map((item) => {
            const Icon = ICONS[item.key];
            return (
              <FeatureCard
                key={item.key}
                icon={<Icon size={24} className="ds-text-primary" />}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
