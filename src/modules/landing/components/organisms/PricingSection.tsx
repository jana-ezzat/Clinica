import Heading from "@/shared/components/atoms/Heading";
import { getTranslations } from "next-intl/server";
import BillingToggle from "../molecules/BillingToggle";
import PricingCard from "../molecules/PricingCard";


export default async function PricingSection() {
  const t = await getTranslations("pricing");
  const plans = t.raw("plans") as {
    key: string;
    name: string;
    price: string;
    popular: boolean;
    features: string[];
    cta: string;
  }[];

  return (
    <section id="pricing" className="ds-bg-grey px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <Heading title={t("heading")} subtitle={t("subheading")} />

        <div className="flex justify-center mb-10">
          <BillingToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.key}
              name={plan.name}
              price={plan.price}
              currency={t("currency")}
              features={plan.features}
              popular={plan.popular}
              popularLabel={t("popularBadge")}
              cta={plan.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
